window.DamageCalculator = (() => {
  function clamp(value, min, max) {
    return Math.min(Math.max(Number(value) || 0, min), max);
  }

  function collectAutomaticEffects(character, skill, applyAfterEffects) {
    const activeEffects = [...(character.passiveEffects || [])];
    const deferredEffects = [];

    (skill.effects || []).forEach((effect) => {
      if (effect.timing === "current" || applyAfterEffects) {
        activeEffects.push(effect);
      } else {
        deferredEffects.push(effect);
      }
    });

    return { activeEffects, deferredEffects };
  }

  function summarizeEffects({ character, skill, applyAfterEffects }) {
    const { activeEffects, deferredEffects } = collectAutomaticEffects(character, skill, applyAfterEffects);
    const summary = {
      attackBuff: 0,
      damageBonus: 0,
      defenseDebuff: 0,
      capBonus: 0,
      labels: [],
      deferredLabels: deferredEffects.map((effect) => effect.label)
    };

    activeEffects.forEach((effect) => {
      if (effect.type === "attackBuff" && effect.target === skill.attackStat) {
        summary.attackBuff += Number(effect.value) || 0;
        summary.labels.push(effect.label);
      }

      if (effect.type === "weaponDamage" && effect.target === skill.weaponType) {
        summary.damageBonus += Number(effect.value) || 0;
        summary.labels.push(effect.label);
      }

      if (effect.type === "elementDamage" && (effect.target === "all" || effect.target === skill.element)) {
        summary.damageBonus += Number(effect.value) || 0;
        summary.labels.push(effect.label);
      }

      if (effect.type === "defenseDebuff") {
        const matchesDefense =
          (skill.attackStat === "patk" && effect.target === "pdef") ||
          (skill.attackStat === "eatk" && effect.target === "edef");
        if (matchesDefense) {
          summary.defenseDebuff += Number(effect.value) || 0;
          summary.labels.push(effect.label);
        }
      }

      if (effect.type === "capBonus") {
        summary.capBonus += Number(effect.value) || 0;
        summary.labels.push(effect.label);
      }
    });

    return summary;
  }

  function calculate(input) {
    const { character, skill, enemy } = input;
    const boostLevel = clamp(input.boostLevel, 0, 3);
    const automatic = summarizeEffects({
      character,
      skill,
      applyAfterEffects: Boolean(input.applyAfterEffects)
    });

    const manualAttackBuff = clamp(input.attackBuff, 0, 300);
    const manualDamageBonus = clamp(input.damageBonus, 0, 300);
    const manualDefenseDebuff = clamp(input.defenseDebuff, 0, 100);
    const attackBuff = clamp(manualAttackBuff + automatic.attackBuff, 0, 300);
    const damageBonus = clamp(manualDamageBonus + automatic.damageBonus, 0, 300);
    const defenseDebuff = clamp(manualDefenseDebuff + automatic.defenseDebuff, 0, 100);
    const randomMultiplier = Number(input.randomMultiplier) || 1;

    const baseAttack = skill.attackStat === "patk" ? character.patk : character.eatk;
    const adjustment = skill.attackStat === "patk" ? Number(input.patkAdjustment || 0) : Number(input.eatkAdjustment || 0);
    const attack = Math.max(1, baseAttack + adjustment);
    const buffedAttack = attack * (1 + attackBuff / 100);

    const baseDefense = skill.attackStat === "patk" ? enemy.pdef : enemy.edef;
    const effectiveDefense = Math.max(0, baseDefense * (1 - defenseDebuff / 100));
    const power = skill.boostPower?.[boostLevel] ?? skill.power;

    const weaknessMultiplier = input.isWeakness ? 1.3 : 1;
    const breakMultiplier = input.isBroken ? 2 : 1;
    const damageBonusMultiplier = 1 + damageBonus / 100;

    // 初期版の仮計算式。実ゲーム式を確定後、この部分だけ差し替え可能。
    const attackDefenseTerm = Math.max(1, buffedAttack - effectiveDefense * 0.5);
    const rawDamagePerHit = attackDefenseTerm
      * (power / 100)
      * weaknessMultiplier
      * breakMultiplier
      * damageBonusMultiplier
      * randomMultiplier;

    const baseCap = character.baseDamageCap || 99999;
    const manualCap = Math.max(0, Number(input.capBonus || 0));
    const capBonus = manualCap + automatic.capBonus;
    const damageCap = Math.floor((baseCap + capBonus) * (skill.capMultiplier || 1));

    const hitDamages = Array.from({ length: skill.hits }, () => Math.min(Math.floor(rawDamagePerHit), damageCap));
    const totalDamage = hitDamages.reduce((sum, value) => sum + value, 0);

    return {
      characterName: character.name,
      skillName: skill.name,
      attackType: skill.attackStat === "patk" ? "物理" : "属性",
      attack: Math.floor(attack),
      buffedAttack: Math.floor(buffedAttack),
      defense: Math.floor(baseDefense),
      effectiveDefense: Math.floor(effectiveDefense),
      power,
      hits: skill.hits,
      damageCap,
      rawDamagePerHit: Math.floor(rawDamagePerHit),
      damagePerHit: hitDamages[0] || 0,
      hitDamages,
      totalDamage,
      reachedCap: rawDamagePerHit >= damageCap,
      killTurns: totalDamage > 0 ? Math.ceil(enemy.hp / totalDamage) : null,
      isWeakness: Boolean(input.isWeakness),
      isBroken: Boolean(input.isBroken),
      boostLevel,
      manualAttackBuff,
      manualDamageBonus,
      manualDefenseDebuff,
      automaticAttackBuff: automatic.attackBuff,
      automaticDamageBonus: automatic.damageBonus,
      automaticDefenseDebuff: automatic.defenseDebuff,
      automaticCapBonus: automatic.capBonus,
      totalAttackBuff: attackBuff,
      totalDamageBonus: damageBonus,
      totalDefenseDebuff: defenseDebuff,
      activeEffectLabels: automatic.labels,
      deferredEffectLabels: automatic.deferredLabels
    };
  }

  function findBestForCharacter({ character, skills, commonInput }) {
    let best = null;

    skills.forEach((skill) => {
      for (let boostLevel = 0; boostLevel <= 3; boostLevel += 1) {
        const result = calculate({
          ...commonInput,
          character,
          skill,
          boostLevel
        });

        if (!best || result.totalDamage > best.totalDamage) {
          best = result;
        }
      }
    });

    return best;
  }

  return { calculate, findBestForCharacter, summarizeEffects };
})();

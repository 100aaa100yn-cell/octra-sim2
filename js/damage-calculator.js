window.DamageCalculator = (() => {
  const FRAME_CAP = 30;

  function clamp(value, min, max) {
    return Math.min(Math.max(Number(value) || 0, min), max);
  }

  function collectAutomaticEffects(character, skill, applyAfterEffects) {
    const activeEffects = (character.passiveEffects || []).map((effect) => ({ ...effect, frame: effect.frame || "support" }));
    const deferredEffects = [];

    (skill.effects || []).forEach((effect) => {
      const framedEffect = { ...effect, frame: effect.frame || "battle" };
      if (effect.timing === "current" || effect.timing === "conditional" || applyAfterEffects) activeEffects.push(framedEffect);
      else deferredEffects.push(framedEffect);
    });
    return { activeEffects, deferredEffects };
  }

  function summarizeEffects({ character, skill, applyAfterEffects }) {
    const { activeEffects, deferredEffects } = collectAutomaticEffects(character, skill, applyAfterEffects);
    const summary = {
      battleAttackBuff: 0, supportAttackBuff: 0,
      battleDamageBonus: 0, supportDamageBonus: 0,
      defenseDebuff: 0, capBonus: 0, labels: [],
      deferredLabels: deferredEffects.map((effect) => effect.label)
    };

    activeEffects.forEach((effect) => {
      const frame = effect.frame === "battle" ? "battle" : "support";
      if (effect.type === "attackBuff" && effect.target === skill.attackStat) summary[`${frame}AttackBuff`] += Number(effect.value) || 0;
      const damageMatches =
        (effect.type === "weaponDamage" && effect.target === skill.weaponType) ||
        (effect.type === "elementDamage" && (effect.target === "all" || effect.target === (skill.damageElement || skill.element)));
      if (damageMatches) summary[`${frame}DamageBonus`] += Number(effect.value) || 0;
      if (effect.type === "defenseDebuff") {
        const matchesDefense = (skill.attackStat === "patk" && effect.target === "pdef") || (skill.attackStat === "eatk" && effect.target === "edef");
        if (matchesDefense) summary.defenseDebuff += Number(effect.value) || 0;
      }
      if (effect.type === "capBonus") summary.capBonus += Number(effect.value) || 0;
      summary.labels.push(effect.label);
    });
    return summary;
  }

  function createHitDamages(rawDamagePerHit, damageCap, hits) {
    return Array.from({ length: hits }, () => Math.min(Math.floor(rawDamagePerHit), damageCap));
  }

  function calculate(input) {
    const { character, skill, enemy } = input;
    const boostLevel = clamp(input.boostLevel, 0, 3);
    if (skill.category && skill.category !== "attack") {
      return {
        nonDamage: true,
        characterName: character.name,
        skillName: skill.name,
        categoryLabel: skill.category === "heal" ? "回復" : "補助",
        sp: skill.sp,
        boostLevel,
        effectLabels: (skill.effects || []).filter(effect => !effect.requiredBoostLevel || boostLevel >= effect.requiredBoostLevel).map(effect => effect.label)
      };
    }
    const automatic = summarizeEffects({ character, skill, applyAfterEffects: Boolean(input.applyAfterEffects) });

    const manualBattleAttackBuff = clamp(input.battleAttackBuff, 0, FRAME_CAP);
    const manualSupportAttackBuff = clamp(input.supportAttackBuff, 0, FRAME_CAP);
    const manualBattleDamageBonus = clamp(input.battleDamageBonus, 0, FRAME_CAP);
    const manualSupportDamageBonus = clamp(input.supportDamageBonus, 0, FRAME_CAP);
    const manualDefenseDebuff = clamp(input.defenseDebuff, 0, FRAME_CAP);

    const battleAttackBuff = clamp(manualBattleAttackBuff + automatic.battleAttackBuff, 0, FRAME_CAP);
    const supportAttackBuff = clamp(manualSupportAttackBuff + automatic.supportAttackBuff, 0, FRAME_CAP);
    const battleDamageBonus = clamp(manualBattleDamageBonus + automatic.battleDamageBonus, 0, FRAME_CAP);
    const supportDamageBonus = clamp(manualSupportDamageBonus + automatic.supportDamageBonus, 0, FRAME_CAP);
    const defenseDebuff = clamp(manualDefenseDebuff + automatic.defenseDebuff, 0, FRAME_CAP);

    const randomMultiplier = clamp(input.randomMultiplier || 1, 0.98, 1.02);
    const levelMultiplier = Math.max(0.01, Number(input.levelMultiplier) || 1);
    const criticalMultiplier = input.isCritical ? 1.25 : 1;

    const baseAttack = skill.attackStat === "patk" ? character.patk : character.eatk;
    const adjustment = skill.attackStat === "patk" ? Number(input.patkAdjustment || 0) : Number(input.eatkAdjustment || 0);
    const attack = Math.max(1, baseAttack + adjustment);
    const correctedAttack = attack * (1 + battleAttackBuff / 100) * (1 + supportAttackBuff / 100);

    const baseDefense = skill.attackStat === "patk" ? enemy.pdef : enemy.edef;
    const defenseCorrection = 1 - defenseDebuff / 100;
    const effectiveDefense = Math.max(0, baseDefense * defenseCorrection);
    const power = skill.boostPower?.[boostLevel] ?? skill.power;
    const abilityPowerMultiplier = power / 100;

    const weaknessMultiplier = input.isWeakness ? 1.3 : 1;
    const breakMultiplier = input.isBroken ? 2 : 1;
    const battleDamageMultiplier = 1 + battleDamageBonus / 100;
    const supportDamageMultiplier = 1 + supportDamageBonus / 100;

    const attackDefenseTerm = Math.max(1, correctedAttack - (baseDefense / 2) * defenseCorrection);
    const commonMultipliers = abilityPowerMultiplier * levelMultiplier * weaknessMultiplier * breakMultiplier * criticalMultiplier * battleDamageMultiplier * supportDamageMultiplier * randomMultiplier;
    const rawDamagePerHit = attackDefenseTerm * commonMultipliers;

    const baseCap = character.baseDamageCap || 99999;
    const manualCap = Math.max(0, Number(input.capBonus || 0));
    const skillCapBonus = Math.max(0, Number(skill.skillCapBonus || 0));
    const capBonus = manualCap + automatic.capBonus + skillCapBonus;
    const damageCap = Math.floor((baseCap + capBonus) * (skill.capMultiplier || 1));

    const firstActivationHits = createHitDamages(rawDamagePerHit, damageCap, skill.hits);
    const firstActivationDamage = firstActivationHits.reduce((sum, value) => sum + value, 0);
    const firstActivationRawDamage = rawDamagePerHit * skill.hits;

    const initialShield = Math.max(0, Number(enemy.shield || 0));
    const canDamageShield = !input.isBroken && (input.isWeakness || skill.shieldRules?.weaknessIndependent);
    const shieldPerHit = 1 + Math.max(0, Number(skill.shieldRules?.bonusPerHit || 0));
    const shieldDamage = canDamageShield ? skill.hits * shieldPerHit : 0;
    const remainingShield = Math.max(0, initialShield - shieldDamage);
    const brokeByThisSkill = !input.isBroken && initialShield > 0 && remainingShield === 0;
    const repeat = skill.repeat;
    const repeatTriggered = Boolean(repeat && boostLevel === Number(repeat.requiredBoostLevel ?? 3) && (input.isBroken || (repeat.includeBreakByThisSkill && brokeByThisSkill)));

    const repeatBreakMultiplier = repeatTriggered ? 2 : 0;
    const repeatRawDamagePerHit = repeatTriggered
      ? attackDefenseTerm * abilityPowerMultiplier * levelMultiplier * weaknessMultiplier * repeatBreakMultiplier * criticalMultiplier * battleDamageMultiplier * supportDamageMultiplier * randomMultiplier
      : 0;
    const repeatedHitDamages = repeatTriggered ? createHitDamages(repeatRawDamagePerHit, damageCap, skill.hits) : [];
    const repeatedActivationDamage = repeatedHitDamages.reduce((sum, value) => sum + value, 0);
    const repeatedActivationRawDamage = repeatRawDamagePerHit * skill.hits;

    const followUpHits = skill.followUp ? Number(skill.followUp.hitsByBoost?.[boostLevel] || 0) : 0;
    const followUpPowerMultiplier = skill.followUp ? Number(skill.followUp.power || 0) / 100 : 0;
    const followUpRawDamagePerHit = skill.followUp
      ? attackDefenseTerm * followUpPowerMultiplier * levelMultiplier * weaknessMultiplier * breakMultiplier * criticalMultiplier * battleDamageMultiplier * supportDamageMultiplier * randomMultiplier
      : 0;
    const followUpHitDamages = followUpHits ? createHitDamages(followUpRawDamagePerHit, damageCap, followUpHits) : [];
    const followUpDamage = followUpHitDamages.reduce((sum, value) => sum + value, 0);
    const followUpRawDamage = followUpRawDamagePerHit * followUpHits;

    const hitDamages = [...firstActivationHits, ...repeatedHitDamages, ...followUpHitDamages];
    const totalDamage = firstActivationDamage + repeatedActivationDamage + followUpDamage;
    const totalRawDamage = firstActivationRawDamage + repeatedActivationRawDamage + followUpRawDamage;

    // 基準：同じ攻撃値・威力・レベル補正、補正カテゴリなし、乱数平均、再発動なし。
    const baselineAttackDefenseTerm = Math.max(1, attack - baseDefense / 2);
    const baselineRawDamagePerHit = baselineAttackDefenseTerm * abilityPowerMultiplier * levelMultiplier;
    const baselineFollowUpRawPerHit = skill.followUp ? baselineAttackDefenseTerm * followUpPowerMultiplier * levelMultiplier : 0;
    const baselineRawDamage = baselineRawDamagePerHit * skill.hits + baselineFollowUpRawPerHit * followUpHits;
    const baselineHitDamages = createHitDamages(baselineRawDamagePerHit, damageCap, skill.hits);
    const baselineFollowUpHits = followUpHits ? createHitDamages(baselineFollowUpRawPerHit, damageCap, followUpHits) : [];
    const baselineDamage = [...baselineHitDamages, ...baselineFollowUpHits].reduce((sum, value) => sum + value, 0);

    const damageMultiplier = baselineRawDamage > 0 ? totalRawDamage / baselineRawDamage : 0;
    const effectiveDamageMultiplier = baselineDamage > 0 ? totalDamage / baselineDamage : 0;
    const averageDamagePerHit = hitDamages.length ? Math.floor(totalDamage / hitDamages.length) : 0;

    return {
      characterName: character.name, skillName: skill.name,
      attackType: skill.attackStat === "patk" ? "物理" : "属性",
      attack: Math.floor(attack), correctedAttack: Math.floor(correctedAttack),
      defense: Math.floor(baseDefense), effectiveDefense: Math.floor(effectiveDefense), defenseCorrection,
      power, abilityPowerMultiplier, levelMultiplier, hits: skill.hits, totalHits: hitDamages.length,
      activationCount: repeatTriggered ? 2 : 1, repeatTriggered,
      firstActivationDamage, repeatedActivationDamage, followUpDamage, followUpHits,
      initialShield, remainingShield, brokeByThisSkill, shieldDamage,
      damageCap, rawDamagePerHit: Math.floor(rawDamagePerHit), damagePerHit: hitDamages[0] || 0,
      hitDamages, totalDamage, totalRawDamage: Math.floor(totalRawDamage), baselineDamage,
      baselineRawDamage: Math.floor(baselineRawDamage), damageMultiplier, effectiveDamageMultiplier, averageDamagePerHit,
      weaknessMultiplier, breakMultiplier, criticalMultiplier, battleDamageMultiplier, supportDamageMultiplier, randomMultiplier,
      reachedCap: rawDamagePerHit >= damageCap || repeatRawDamagePerHit >= damageCap || followUpRawDamagePerHit >= damageCap,
      killTurns: totalDamage > 0 ? Math.ceil(enemy.hp / totalDamage) : null,
      isWeakness: Boolean(input.isWeakness), isBroken: Boolean(input.isBroken), isCritical: Boolean(input.isCritical), boostLevel,
      manualBattleAttackBuff, manualSupportAttackBuff, manualBattleDamageBonus, manualSupportDamageBonus, manualDefenseDebuff,
      automaticBattleAttackBuff: automatic.battleAttackBuff, automaticSupportAttackBuff: automatic.supportAttackBuff,
      automaticBattleDamageBonus: automatic.battleDamageBonus, automaticSupportDamageBonus: automatic.supportDamageBonus,
      automaticDefenseDebuff: automatic.defenseDebuff, automaticCapBonus: automatic.capBonus + skillCapBonus,
      totalBattleAttackBuff: battleAttackBuff, totalSupportAttackBuff: supportAttackBuff,
      totalBattleDamageBonus: battleDamageBonus, totalSupportDamageBonus: supportDamageBonus,
      totalDefenseDebuff: defenseDebuff, activeEffectLabels: automatic.labels, deferredEffectLabels: automatic.deferredLabels
    };
  }

  function findBestForCharacter({ character, skills, commonInput }) {
    let best = null;
    skills.filter((skill) => !skill.category || skill.category === "attack").forEach((skill) => {
      for (let boostLevel = 0; boostLevel <= 3; boostLevel += 1) {
        const result = calculate({ ...commonInput, character, skill, boostLevel });
        if (!best || result.totalDamage > best.totalDamage) best = result;
      }
    });
    return best;
  }
  return { calculate, findBestForCharacter, summarizeEffects };
})();

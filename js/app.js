(() => {
  const defaultParty = ["yuna", "tidus", "rikku", "yuna", "tidus", "rikku", "yuna", "tidus"];
  let selectedIndex = 0;
  const partySlots = defaultParty.map((characterId, index) => ({ index, characterId }));

  const $ = (id) => document.getElementById(id);
  const numberValue = (id) => Number($(id).value || 0);

  document.addEventListener("DOMContentLoaded", () => {
    renderParty();
    updateAttackPanel();
    $("calculate-button").addEventListener("click", calculateSelectedSkill);
    $("find-best-button").addEventListener("click", findBestSkill);
    $("skill-selector").addEventListener("change", updateEffectPanels);
    $("boost-selector").addEventListener("change", updateEffectPanels);
    $("apply-after-effects").addEventListener("change", updateEffectPanels);
  });

  function renderParty() {
    const front = $("front-party");
    const back = $("back-party");
    front.innerHTML = "";
    back.innerHTML = "";

    partySlots.forEach((slot) => {
      const isFront = slot.index < 4;
      const card = document.createElement("div");
      card.className = `char-card ${isFront ? "front" : "back"} ${slot.index === selectedIndex ? "selected" : ""}`;
      card.addEventListener("click", () => selectSlot(slot.index));

      const label = document.createElement("div");
      label.className = "slot-label";
      label.textContent = `第${(slot.index % 4) + 1}列・${isFront ? "前衛" : "後衛"}`;

      const selector = document.createElement("select");
      Object.values(window.CHARACTERS).forEach((character) => {
        const option = document.createElement("option");
        option.value = character.id;
        option.textContent = character.name;
        option.selected = character.id === slot.characterId;
        selector.appendChild(option);
      });
      selector.addEventListener("click", (event) => event.stopPropagation());
      selector.addEventListener("change", (event) => {
        slot.characterId = event.target.value;
        selectedIndex = slot.index;
        renderParty();
        updateAttackPanel();
      });

      const character = window.CHARACTERS[slot.characterId];
      const summary = document.createElement("div");
      summary.className = "char-summary";
      const passiveText = (character.passiveEffects || []).map((effect) => effect.label).join(" / ") || "なし";
      summary.innerHTML = `職業：${character.job}<br>物攻：${character.patk.toLocaleString()}<br>属攻：${character.eatk.toLocaleString()}<br><span class="mini-effect">固有：${passiveText}</span>`;

      card.append(label, selector, summary);
      (isFront ? front : back).appendChild(card);
    });
  }

  function selectSlot(index) {
    selectedIndex = index;
    renderParty();
    updateAttackPanel();
  }

  function updateAttackPanel() {
    const character = getSelectedCharacter();
    $("selected-character-name").textContent = character.name;

    const selector = $("skill-selector");
    selector.innerHTML = "";
    character.skillIds.forEach((skillId) => {
      const skill = window.SKILLS[skillId];
      const option = document.createElement("option");
      option.value = skill.id;
      const typePrefix = skill.abilityType === "ultimate" ? "【必殺技】" : skill.abilityType === "ex" ? "【EX】" : "";
      option.textContent = skill.category === "attack"
        ? `${typePrefix}${skill.name}（威力${skill.power} × ${skill.hits}）`
        : `${typePrefix}${skill.name}（${skill.category === "heal" ? "回復" : "補助"}${skill.sp != null ? ` / SP${skill.sp}` : ""}）`;
      selector.appendChild(option);
    });
    updateEffectPanels();
  }


  function getDuration(effect, boostLevel) {
    if (effect.duration == null) return null;
    if (typeof effect.duration === "number") return effect.duration;
    return effect.duration[boostLevel] ?? effect.duration[String(boostLevel)] ?? null;
  }

  function formatTiming(timing) {
    if (timing === "after") return "行動後";
    if (timing === "conditional") return "条件成立時";
    return "即時";
  }

  function renderEffectList(containerId, effects, emptyText, boostLevel = 0) {
    const container = $(containerId);
    if (!effects || effects.length === 0) {
      container.innerHTML = `<span class="effect-empty">${emptyText}</span>`;
      return;
    }

    container.innerHTML = effects.map((effect) => {
      const timing = effect.timing === "after"
        ? '<span class="timing-badge">行動後</span>'
        : effect.timing === "conditional"
          ? '<span class="timing-badge conditional">条件</span>'
          : '';
      const duration = getDuration(effect, boostLevel);
      const durationBadge = duration == null
        ? ''
        : `<span class="duration-badge">${duration}ターン</span>`;
      return `<div class="effect-chip">${effect.label}${timing}${durationBadge}</div>`;
    }).join("");
  }

  function renderSkillDetail(skill, boostLevel) {
    const panel = $("skill-detail-panel");
    if (!skill) { panel.innerHTML = ""; return; }

    const boostNames = skill.boostLabels || ["BP0", "BP1", "BP2", "BP MAX"];
    const categoryBase = skill.category === "heal" ? "回復" : skill.category === "support" ? "補助" : "攻撃";
    const categoryLabel = skill.abilityType === "ultimate" ? `${categoryBase}・必殺技` : skill.abilityType === "ex" ? `${categoryBase}・EXアビリティ` : categoryBase;
    const targetLabels = {
      singleEnemy:"敵単体", allEnemies:"敵全体", singleAlly:"味方単体",
      frontAllies:"味方前衛全体", allAllies:"味方前後衛全体"
    };
    const targetText = targetLabels[skill.target] || "—";

    let boostRows = "";
    if (skill.category === "attack") {
      boostRows = boostNames.map((name, level) => {
        const value = skill.boostPower?.[level] ?? skill.power;
        return `<div class="boost-cell ${level === boostLevel ? "active" : ""}"><span>${name}</span><strong>威力${value}</strong></div>`;
      }).join("");
    } else if (skill.boostHealPower) {
      boostRows = boostNames.map((name, level) => `<div class="boost-cell ${level === boostLevel ? "active" : ""}"><span>${name}</span><strong>効力${skill.boostHealPower[level]}</strong></div>`).join("");
    } else if (skill.boostHealPercent) {
      boostRows = boostNames.map((name, level) => `<div class="boost-cell ${level === boostLevel ? "active" : ""}"><span>${name}</span><strong>${skill.boostHealPercent[level]}%</strong></div>`).join("");
    }

    const effectsHtml = (skill.effects || []).length ? skill.effects.map((effect, index) => {
      const durationCells = [0,1,2,3].map((level) => {
        const duration = getDuration(effect, level);
        return `<div class="duration-cell ${level === boostLevel ? "active" : ""}"><span>${boostNames[level]}</span><strong>${duration == null ? "—" : `${duration}T`}</strong></div>`;
      }).join("");
      const current = getDuration(effect, boostLevel);
      return `<article class="effect-detail-card">
        <div class="effect-detail-title"><span class="effect-number">${index+1}</span>${effect.label}</div>
        <div class="effect-meta">対象：${effect.targetLabel || "—"} / 発動：${formatTiming(effect.timing)}</div>
        <div class="duration-grid">${durationCells}</div>
        ${current == null ? '<div class="current-duration no-duration">継続ターンなし（即時・常時・条件効果）</div>' : `<div class="current-duration">現在のBPでは <strong>${current}ターン</strong></div>`}
      </article>`;
    }).join("") : '<div class="effect-empty detail-empty">追加効果・継続効果なし</div>';

    const ignoreTexts = [];
    if (skill.ignoreEffects?.perfectEvasion) ignoreTexts.push("完全回避無視");
    if (skill.ignoreEffects?.perfectGuard) ignoreTexts.push("完全防御無視");
    if (skill.ignoreEffects?.pdefUp) ignoreTexts.push("物防アップ無視");
    if (skill.ignoreEffects?.edefUp) ignoreTexts.push("属防アップ無視");
    if (skill.ignoreEffects?.damageReduction) ignoreTexts.push("ダメージ減少無視");
    const weaknessText = (skill.weaknessTypes || [skill.damageElement || skill.element].filter(Boolean)).join("・") || "—";
    const notes = (skill.notes || []).map(note => `<li>${note}</li>`).join("");
    const follow = skill.followUp ? `<div class="skill-rule-line"><strong>追撃：</strong>威力${skill.followUp.power} / BP${boostLevel === 3 ? "MAX" : boostLevel}で${skill.followUp.hitsByBoost[boostLevel]}回 / ${targetLabels[skill.followUp.target] || "敵"}</div>` : "";

    panel.innerHTML = `
      <div class="skill-summary-grid">
        <div><span>分類</span><strong>${categoryLabel}</strong></div>
        <div><span>${skill.abilityType === "ultimate" ? "必殺技Lv" : "消費SP"}</span><strong>${skill.abilityType === "ultimate" ? (skill.levelLabel || "—") : (skill.sp ?? "—")}</strong></div>
        <div><span>対象</span><strong>${targetText}</strong></div>
        <div><span>属性・Hit</span><strong>${skill.category === "attack" ? `${skill.damageElement || skill.element || "無属性"} / ${skill.hits}回` : "—"}</strong></div>
      </div>
      ${boostRows ? `<h4>BP別${skill.category === "attack" ? "威力" : "効果量"}</h4><div class="boost-grid">${boostRows}</div>` : ""}
      ${skill.category === "attack" ? `<div class="skill-rule-line"><strong>弱点判定：</strong>${weaknessText}</div>` : ""}
      ${skill.shieldRules?.weaknessIndependent ? `<div class="skill-rule-line"><strong>シールド：</strong>弱点外でも削る${skill.shieldRules.bonusPerHit ? ` / 1Hitごとに追加+${skill.shieldRules.bonusPerHit}` : ""}</div>` : ""}
      ${skill.skillCapBonus ? `<div class="skill-rule-line"><strong>固有上限：</strong>1Hit上限+${skill.skillCapBonus.toLocaleString()}</div>` : ""}
      ${ignoreTexts.length ? `<div class="skill-rule-line"><strong>無視効果：</strong>${ignoreTexts.join("・")}</div>` : ""}
      ${skill.summon ? `<div class="skill-rule-line"><strong>召喚獣：</strong>${skill.summon}（他の召喚獣を解除）</div>` : ""}
      ${follow}
      ${skill.repeat ? '<div class="skill-rule-line repeat-rule"><strong>再発動：</strong>BP MAX＋ブレイク中（この技でブレイクした場合を含む・SP消費なし）</div>' : ""}
      ${skill.activationPosition === "back" ? '<div class="skill-rule-line"><strong>発動位置：</strong>後衛</div>' : ""}
      ${skill.minTurn ? `<div class="skill-rule-line"><strong>使用条件：</strong>${skill.minTurn}ターン目以降</div>` : ""}
      ${skill.bpCosts ? `<div class="skill-rule-line"><strong>BP消費：</strong>${Object.values(skill.bpCosts).join(" / ")}</div>` : ""}
      ${skill.useLimit ? `<div class="skill-rule-line"><strong>使用制限：</strong>戦闘中${skill.useLimit}回</div>` : ""}
      <h4>効果と継続ターン</h4>
      <div class="effect-detail-list">${effectsHtml}</div>
      ${notes ? `<h4>注意事項</h4><ul class="skill-notes">${notes}</ul>` : ""}
    `;
  }

  function updateEffectPanels() {
    const character = getSelectedCharacter();
    const skill = window.SKILLS[$("skill-selector").value];
    const boostLevel = numberValue("boost-selector");
    renderEffectList("character-effects", character.passiveEffects || [], "固有効果なし", boostLevel);
    renderEffectList("skill-effects", skill?.effects || [], "追加効果なし", boostLevel);
    renderSkillDetail(skill, boostLevel);
  }

  function getSelectedCharacter() {
    return window.CHARACTERS[partySlots[selectedIndex].characterId];
  }

  function getCommonInput() {
    return {
      enemy: {
        hp: Math.max(1, numberValue("enemy-hp")),
        pdef: Math.max(0, numberValue("enemy-pdef")),
        edef: Math.max(0, numberValue("enemy-edef")),
        shield: Math.max(0, numberValue("enemy-shield"))
      },
      patkAdjustment: numberValue("patk-adjustment"),
      eatkAdjustment: numberValue("eatk-adjustment"),
      battleAttackBuff: numberValue("battle-attack-buff"),
      supportAttackBuff: numberValue("support-attack-buff"),
      battleDamageBonus: numberValue("battle-damage-bonus"),
      supportDamageBonus: numberValue("support-damage-bonus"),
      levelMultiplier: numberValue("level-multiplier"),
      isCritical: $("is-critical").checked,
      capBonus: numberValue("cap-bonus"),
      defenseDebuff: numberValue("defense-debuff"),
      randomMultiplier: numberValue("random-selector"),
      isWeakness: $("is-weakness").checked,
      isBroken: $("is-broken").checked,
      applyAfterEffects: $("apply-after-effects").checked,
      currentTurn: Math.max(1, numberValue("current-turn"))
    };
  }

  function calculateSelectedSkill() {
    const character = getSelectedCharacter();
    const skill = window.SKILLS[$("skill-selector").value];
    const result = window.DamageCalculator.calculate({
      ...getCommonInput(),
      character,
      skill,
      boostLevel: numberValue("boost-selector")
    });
    renderResult(result, false);
  }

  function findBestSkill() {
    const character = getSelectedCharacter();
    const skills = character.skillIds.map((id) => window.SKILLS[id]);
    const result = window.DamageCalculator.findBestForCharacter({
      character,
      skills,
      commonInput: getCommonInput()
    });
    renderResult(result, true);
  }

  function renderResult(result, isBestSearch) {
    if (result.invalidCondition) {
      $("damage-result").innerHTML = `<div class="result-warn"><strong>${result.characterName} / ${result.skillName}</strong></div><div>${result.message}</div>`;
      return;
    }
    if (result.nonDamage) {
      $("damage-result").innerHTML = `
        <div class="result-good">${result.characterName} / ${result.skillName}</div>
        <div><strong>分類：</strong>${result.categoryLabel}</div>
        ${result.activationPosition ? `<div><strong>発動位置：</strong>${result.activationPosition}</div>` : ""}
        ${result.levelLabel ? `<div><strong>必殺技Lv：</strong>${result.levelLabel}</div>` : ""}
        <div><strong>消費SP：</strong>${result.sp ?? "—"}</div>
        <div><strong>BP：</strong>${result.boostLevel === 3 ? "MAX" : result.boostLevel}</div>
        <div class="applied-effects"><strong>効果：</strong>${result.effectLabels.join(" / ") || "詳細パネルを確認してください"}</div>
        <hr><div>このアビリティは攻撃ではないため、ダメージ倍率は計算しません。</div>`;
      return;
    }
    const mainHitCount = result.hits;
    const repeatHitCount = result.repeatTriggered ? result.hits : 0;
    const hitItems = result.hitDamages.map((damage, index) => {
      let activation = "1回目";
      let hitNumber = index + 1;
      if (index >= mainHitCount + repeatHitCount) {
        activation = "召喚追撃";
        hitNumber = index - mainHitCount - repeatHitCount + 1;
      } else if (index >= mainHitCount) {
        activation = "再発動";
        hitNumber = index - mainHitCount + 1;
      }
      return `<li>${activation} ${hitNumber}ヒット目：${damage.toLocaleString()}</li>`;
    }).join("");

    const repeatHtml = result.repeatTriggered
      ? `<div class="repeat-result"><strong>再発動あり</strong>：${result.firstActivationDamage.toLocaleString()} + ${result.repeatedActivationDamage.toLocaleString()}</div>`
      : `<div>再発動：なし</div>`;

    const specialHtml = result.skillName.includes("アルテマ")
      ? `<div class="special-details">
          <strong>アルテマ特殊判定</strong><br>
          ダメージ属性：火 / 弱点判定：火・氷・雷・風・光・闇<br>
          完全回避・完全防御：無視<br>
          開始シールド：${result.initialShield} → 攻撃後：${result.remainingShield}<br>
          この技でブレイク：${result.brokeByThisSkill ? "はい" : "いいえ"}<br>
          発動回数：${result.activationCount}回 / 合計ヒット：${result.totalHits}回
        </div>`
      : "";

    $("damage-result").innerHTML = `
      ${isBestSearch ? '<div class="result-good">最大候補を自動検索しました</div>' : ""}
      <div class="damage-multiplier-card">
        <span class="damage-multiplier-label">ダメージ倍率</span>
        <strong class="damage-multiplier">×${result.damageMultiplier.toFixed(2)}</strong>
        <small>補正カテゴリなし・乱数平均・再発動なしを1.00倍（上限適用前）</small>
      </div>
      <div>${result.characterName} / ${result.skillName}</div>
      <div>ブースト：${result.boostLabel || (result.boostLevel === 3 ? "MAX" : result.boostLevel)}</div>
      <div>攻撃種別：${result.attackType}</div>
      <div>補正攻撃力：${result.attack.toLocaleString()} → ${result.correctedAttack.toLocaleString()}</div>
      <div>攻撃バフ・バトアビ枠：手動${result.manualBattleAttackBuff}% + 自動${result.automaticBattleAttackBuff}% → 適用${result.totalBattleAttackBuff}%（上限30%）</div>
      <div>攻撃バフ・サポ/装備枠：手動${result.manualSupportAttackBuff}% + 自動${result.automaticSupportAttackBuff}% → 適用${result.totalSupportAttackBuff}%（上限30%）</div>
      <div>ダメージUP・バトアビ枠：手動${result.manualBattleDamageBonus}% + 自動${result.automaticBattleDamageBonus}% → 適用${result.totalBattleDamageBonus}%（上限30%）</div>
      <div>ダメージUP・サポ/装備枠：手動${result.manualSupportDamageBonus}% + 自動${result.automaticSupportDamageBonus}% → 適用${result.totalSupportDamageBonus}%（上限30%）</div>
      <div>敵防御：${result.defense.toLocaleString()} → ${result.effectiveDefense.toLocaleString()}</div>
      <div>防御デバフ：手動${result.manualDefenseDebuff}% + 自動${result.automaticDefenseDebuff}% → 適用${result.totalDefenseDebuff}%（上限30%）</div>
      <div>威力：${result.power} × ${result.hits}ヒット</div>
      <div>弱点：${result.isWeakness ? "あり" : "なし"} / 開始時ブレイク：${result.isBroken ? "あり" : "なし"}</div>
      ${repeatHtml}
      ${specialHtml}
      <div>自動上限加算：+${result.automaticCapBonus.toLocaleString()}</div>
      <div>1ヒット上限：${result.damageCap.toLocaleString()}</div>
      <div class="applied-effects"><strong>自動適用：</strong>${result.activeEffectLabels.length ? result.activeEffectLabels.join(" / ") : "なし"}</div>
      ${result.deferredEffectLabels.length ? `<div class="deferred-effects"><strong>今回未適用（行動後）：</strong>${result.deferredEffectLabels.join(" / ")}</div>` : ""}
      <div>上限判定：<span class="${result.reachedCap ? "result-warn" : "result-good"}">${result.reachedCap ? "到達" : "未到達"}</span></div>
      <hr>
      ${result.followUpHits ? `<div class="repeat-result"><strong>召喚追撃</strong>：${result.followUpDamage.toLocaleString()} damage / ${result.followUpHits}Hit</div>` : ""}
      <div class="result-total">${result.totalDamage.toLocaleString()} damage</div>
      <div>1Hit平均：${result.averageDamagePerHit.toLocaleString()}</div>
      <div>総Hit数：${result.totalHits.toLocaleString()}Hit</div>
      <div>基準ダメージ（上限後）：${result.baselineDamage.toLocaleString()}</div>
      <div>上限込み実効倍率：×${result.effectiveDamageMultiplier.toFixed(2)}</div>
      <div>倍率内訳：威力×${result.abilityPowerMultiplier.toFixed(2)} / レベル×${result.levelMultiplier.toFixed(2)} / 弱点×${result.weaknessMultiplier.toFixed(2)} / ブレイク×${result.breakMultiplier.toFixed(2)} / 会心×${result.criticalMultiplier.toFixed(2)} / バトアビダメUP×${result.battleDamageMultiplier.toFixed(2)} / サポ・装備ダメUP×${result.supportDamageMultiplier.toFixed(2)} / 乱数×${result.randomMultiplier.toFixed(2)}${result.repeatTriggered ? " / 再発動込み" : ""}</div>
      <div>同条件の理論撃破回数：${result.killTurns?.toLocaleString() ?? "-"}回</div>
      <ul class="hit-list">${hitItems}</ul>
    `;
  }})();

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
      option.textContent = `${skill.name}（威力${skill.power} × ${skill.hits}）`;
      selector.appendChild(option);
    });
    updateEffectPanels();
  }


  function renderEffectList(containerId, effects, emptyText) {
    const container = $(containerId);
    if (!effects || effects.length === 0) {
      container.innerHTML = `<span class="effect-empty">${emptyText}</span>`;
      return;
    }

    container.innerHTML = effects.map((effect) => {
      const timing = effect.timing === "after" ? '<span class="timing-badge">行動後</span>' : '';
      return `<div class="effect-chip">${effect.label}${timing}</div>`;
    }).join("");
  }

  function updateEffectPanels() {
    const character = getSelectedCharacter();
    const skill = window.SKILLS[$("skill-selector").value];
    renderEffectList("character-effects", character.passiveEffects || [], "固有効果なし");
    renderEffectList("skill-effects", skill?.effects || [], "追加効果なし");
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
      attackBuff: numberValue("attack-buff"),
      damageBonus: numberValue("damage-bonus"),
      capBonus: numberValue("cap-bonus"),
      defenseDebuff: numberValue("defense-debuff"),
      randomMultiplier: numberValue("random-selector"),
      isWeakness: $("is-weakness").checked,
      isBroken: $("is-broken").checked,
      applyAfterEffects: $("apply-after-effects").checked
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
    const hitItems = result.hitDamages
      .map((damage, index) => {
        const activation = index < result.hits ? "1回目" : "再発動";
        const hitNumber = (index % result.hits) + 1;
        return `<li>${activation} ${hitNumber}ヒット目：${damage.toLocaleString()}</li>`;
      })
      .join("");

    const repeatHtml = result.repeatTriggered
      ? `<div class="repeat-result"><strong>再発動あり</strong>：${result.firstActivationDamage.toLocaleString()} + ${result.repeatedActivationDamage.toLocaleString()}</div>`
      : `<div>再発動：なし</div>`;

    const specialHtml = result.skillName.includes("バハムート")
      ? `<div class="special-details">
          <strong>バハムート特殊判定</strong><br>
          ダメージ属性：火 / 弱点判定：火・氷・雷・風・光・闇<br>
          完全回避・完全防御：無視<br>
          開始シールド：${result.initialShield} → 攻撃後：${result.remainingShield}<br>
          この技でブレイク：${result.brokeByThisSkill ? "はい" : "いいえ"}<br>
          発動回数：${result.activationCount}回 / 合計ヒット：${result.totalHits}回
        </div>`
      : "";

    $("damage-result").innerHTML = `
      ${isBestSearch ? '<div class="result-good">最大候補を自動検索しました</div>' : ""}
      <div>${result.characterName} / ${result.skillName}</div>
      <div>ブースト：${result.boostLevel === 3 ? "MAX" : result.boostLevel}</div>
      <div>攻撃種別：${result.attackType}</div>
      <div>使用攻撃値：${result.attack.toLocaleString()} → ${result.buffedAttack.toLocaleString()}</div>
      <div>攻撃バフ：手動${result.manualAttackBuff}% + 自動${result.automaticAttackBuff}% = ${result.totalAttackBuff}%</div>
      <div>ダメージアップ：手動${result.manualDamageBonus}% + 自動${result.automaticDamageBonus}% = ${result.totalDamageBonus}%</div>
      <div>敵防御：${result.defense.toLocaleString()} → ${result.effectiveDefense.toLocaleString()}</div>
      <div>防御デバフ：手動${result.manualDefenseDebuff}% + 自動${result.automaticDefenseDebuff}% = ${result.totalDefenseDebuff}%</div>
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
      <div class="result-total">${result.totalDamage.toLocaleString()} damage</div>
      <div>同条件の理論撃破回数：${result.killTurns?.toLocaleString() ?? "-"}回</div>
      <ul class="hit-list">${hitItems}</ul>
    `;
  }})();

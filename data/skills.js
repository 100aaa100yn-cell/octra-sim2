window.SKILLS = {
  yuna_valefor: {
    id: "yuna_valefor", characterId: "yuna", name: "風 召喚：ヴァルファーレ",
    attackStat: "eatk", element: "wind", weaponType: null, power: 65, hits: 3,
    boostPower: {0: 65, 1: 75, 2: 90, 3: 110}, capMultiplier: 1,
    effects: [
      { type: "followUp", value: 1, timing: "after", label: "行動後に風追撃を付与（表示のみ）" }
    ]
  },
  yuna_ray: {
    id: "yuna_ray", characterId: "yuna", name: "励声の光線",
    attackStat: "eatk", element: "light", weaponType: null, power: 45, hits: 4,
    boostPower: {0: 45, 1: 55, 2: 70, 3: 90}, capMultiplier: 1,
    effects: [
      { type: "attackBuff", target: "eatk", value: 15, timing: "after", label: "自身に属攻アップ15%" }
    ]
  },
  yuna_bahamut: {
    id: "yuna_bahamut", characterId: "yuna", name: "極召喚：バハムート",
    attackStat: "eatk", element: "fire", damageElement: "fire", weaponType: null,
    power: 105, hits: 4, target: "allEnemies",
    boostPower: {0: 105, 1: 115, 2: 150, 3: 200}, capMultiplier: 1,
    weaknessTypes: ["fire", "ice", "lightning", "wind", "light", "dark"],
    ignoreEffects: { perfectEvasion: true, perfectGuard: true },
    repeat: {
      type: "repeatSameSkill",
      maxRepeats: 1,
      consumeSp: false,
      requiredBoostLevel: 3,
      requiresAnyBrokenEnemy: true,
      includeBreakByThisSkill: true
    },
    effects: [
      { type: "multiWeakness", timing: "current", label: "火・氷・雷・風・光・闇弱点を突ける（計算属性は火）" },
      { type: "ignoreDefenseEffects", timing: "current", label: "完全回避・完全防御を無視" },
      { type: "repeatSameSkill", timing: "conditional", label: "BP MAX＋ブレイク時に同じ攻撃を再発動（この技でブレイクした場合も含む）" }
    ]
  },
  yuna_special: {
    id: "yuna_special", characterId: "yuna", name: "異送り",
    attackStat: "eatk", element: "light", weaponType: null, power: 500, hits: 1,
    boostPower: {0: 500, 1: 500, 2: 500, 3: 500}, capMultiplier: 1,
    effects: [
      { type: "attackBuff", target: "eatk", value: 20, timing: "after", label: "味方全体に属攻アップ20%" },
      { type: "capBonus", value: 100000, timing: "after", label: "味方全体にダメージ上限+100,000" }
    ]
  },
  tidus_spiral: {
    id: "tidus_spiral", characterId: "tidus", name: "スパイラルカット",
    attackStat: "patk", element: "water", weaponType: "sword", power: 260, hits: 1,
    boostPower: {0: 260, 1: 310, 2: 390, 3: 500}, capMultiplier: 1,
    effects: []
  },
  tidus_assault: {
    id: "tidus_assault", characterId: "tidus", name: "チャージ＆アサルト",
    attackStat: "patk", element: "water", weaponType: "sword", power: 45, hits: 5,
    boostPower: {0: 45, 1: 55, 2: 65, 3: 80}, capMultiplier: 1,
    effects: [
      { type: "attackBuff", target: "patk", value: 15, timing: "after", label: "自身に物攻アップ15%" }
    ]
  },
  tidus_blitz: {
    id: "tidus_blitz", characterId: "tidus", name: "エースオブザブリッツ",
    attackStat: "patk", element: "water", weaponType: "sword", power: 85, hits: 9,
    boostPower: {0: 85, 1: 95, 2: 110, 3: 130}, capMultiplier: 1,
    effects: []
  },
  tidus_special: {
    id: "tidus_special", characterId: "tidus", name: "エナジーレイン",
    attackStat: "patk", element: "water", weaponType: "sword", power: 440, hits: 1,
    boostPower: {0: 440, 1: 440, 2: 440, 3: 440}, capMultiplier: 1,
    effects: []
  },
  rikku_drive: {
    id: "rikku_drive", characterId: "rikku", name: "ドライブパスカット",
    attackStat: "patk", element: "none", weaponType: "dagger", power: 55, hits: 4,
    boostPower: {0: 55, 1: 65, 2: 80, 3: 100}, capMultiplier: 1,
    effects: [
      { type: "defenseDebuff", target: "pdef", value: 15, timing: "after", label: "敵に物防ダウン15%" }
    ]
  },
  rikku_nine_lives: {
    id: "rikku_nine_lives", characterId: "rikku", name: "ナインライヴス",
    attackStat: "patk", element: "none", weaponType: "dagger", power: 30, hits: 9,
    boostPower: {0: 30, 1: 38, 2: 48, 3: 60}, capMultiplier: 1,
    effects: []
  }
};

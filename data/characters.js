window.CHARACTERS = {
  yuna: {
    id: "yuna",
    name: "ユウナ",
    job: "神官",
    patk: 210,
    eatk: 510,
    baseDamageCap: 99999,
    skillIds: ["yuna_cure", "yuna_esuna", "yuna_valefor", "yuna_pray", "yuna_ixion", "yuna_holy", "yuna_blessing", "yuna_anima", "yuna_ultima", "yuna_calm_prayer"],
    passiveEffects: [
      { type: "elementResistance", targets: ["fire", "ice"], value: 10, label: "火・氷耐性強化：自身の火・氷耐性10%アップ" },
      { type: "elementResistance", targets: ["lightning", "wind"], value: 10, label: "雷・風耐性強化：自身の雷・風耐性10%アップ" },
      { type: "elementResistance", targets: ["light", "dark"], value: 10, label: "光・闇耐性強化：自身の光・闇耐性10%アップ" },
      { type: "capBonus", value: 10000, label: "ダメージ上限アップ+10,000" },
      { type: "capBonus", value: 20000, label: "ダメージ上限アップ+20,000" }
    ]
  },
  tidus: {
    id: "tidus",
    name: "ティーダ",
    job: "剣士",
    patk: 535,
    eatk: 180,
    baseDamageCap: 99999,
    skillIds: ["tidus_spiral", "tidus_assault", "tidus_blitz", "tidus_special"],
    passiveEffects: [
      { type: "elementDamage", target: "water", value: 30, label: "水属性ダメージアップ30%" },
      { type: "capBonus", value: 50000, label: "ダメージ上限+50,000" }
    ]
  },
  rikku: {
    id: "rikku",
    name: "リュック",
    job: "盗賊",
    patk: 495,
    eatk: 230,
    baseDamageCap: 99999,
    skillIds: ["rikku_drive", "rikku_nine_lives"],
    passiveEffects: [
      { type: "weaponDamage", target: "dagger", value: 10, label: "短剣ダメージアップ10%" },
      { type: "capBonus", value: 30000, label: "ダメージ上限+30,000" }
    ]
  }
};

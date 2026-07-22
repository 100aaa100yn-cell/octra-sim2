window.CHARACTERS = {
  yuna: {
    id: "yuna",
    name: "ユウナ",
    job: "神官",
    patk: 210,
    eatk: 510,
    baseDamageCap: 99999,
    skillIds: ["yuna_cure", "yuna_esuna", "yuna_valefor", "yuna_pray", "yuna_ixion", "yuna_holy", "yuna_blessing", "yuna_anima", "yuna_ultima", "yuna_calm_prayer", "yuna_otherworld_sending", "yuna_bahamut_ex"],
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
  },
  olberic: {
    id:"olberic", name:"オルベリク", job:"剣士", patk:549, eatk:337, baseDamageCap:99999,
    skillIds:["olberic_cross","olberic_thousand_spears","olberic_mighty_sword","olberic_swift_sword","olberic_ultimate","olberic_ex"],
    passiveEffects:[
      {type:"weaponDamage",target:"sword",value:30,label:"剛剣の構え：剣攻撃ダメージアップ30%"},
      {type:"conditionalCapBonus",condition:"敵ブレイク中",value:50000,label:"剛剣の騎士：敵ブレイク中、物攻15%・ダメージ上限+50,000"},
      {type:"elementResistance",targets:["lightning","wind"],value:10,label:"雷・風耐性10%アップ"},
      {type:"capBonus",value:10000,label:"ダメージ上限アップ+10,000"},
      {type:"capBonus",value:20000,label:"ダメージ上限アップ+20,000"}
    ]
  },
  lars: {
    id:"lars", name:"ラース", job:"剣士", patk:534, eatk:357, baseDamageCap:99999,
    skillIds:["lars_raging_five","lars_instant_slash","lars_crushing_sword","lars_wind_god","lars_ultimate","lars_ex"],
    passiveEffects:[
      {type:"weaponDamage",target:"sword",value:15,label:"烈剣の構え：剣攻撃ダメージアップ15%"},
      {type:"attackBuff",target:"patk",value:15,label:"烈剣の構え・進化：物攻アップ15%"},
      {type:"criticalDamage",value:15,label:"クリティカル時ダメージアップ15%"},
      {type:"capBonus",value:30000,label:"烈剣の構え・進化：ダメージ上限+30,000"},
      {type:"capBonus",value:10000,label:"ダメージ上限アップ+10,000"},
      {type:"capBonus",value:20000,label:"ダメージ上限アップ+20,000"}
    ]
  },
  kouren: {
    id:"kouren", name:"コウレン", job:"剣士", patk:499, eatk:427, baseDamageCap:99999,
    skillIds:["kouren_peacock","kouren_secret","kouren_first_blade","kouren_return_blade","kouren_ultimate","kouren_ex"],
    passiveEffects:[
      {type:"conditionalWeaponDamage",condition:"HP満タン",target:"sword",value:30,label:"白刃の閃き：HP満タン時、剣攻撃ダメージアップ30%"},
      {type:"conditionalCapBonus",condition:"HP満タン",value:100000,label:"白刃の閃き：HP満タン時、ダメージ上限+100,000"},
      {type:"elementResistance",targets:["light","dark"],value:10,label:"光・闇耐性10%アップ"},
      {type:"capBonus",value:10000,label:"ダメージ上限アップ+10,000"},
      {type:"capBonus",value:20000,label:"ダメージ上限アップ+20,000"}
    ]
  },
  edea: {
    id:"edea", name:"イデア", job:"剣士", patk:504, eatk:362, baseDamageCap:99999,
    skillIds:["edea_triple","edea_miracle","edea_heavens_gate","edea_hack_slash","edea_ultimate","edea_ex"],
    passiveEffects:[
      {type:"weaknessDamage",value:20,label:"弱点威力強化Ⅲ：弱点攻撃時ダメージアップ20%"},
      {type:"elementResistance",targets:["fire","ice"],value:10,label:"火・氷耐性10%アップ"}
    ]
  },
  eliza: {
    id:"eliza", name:"エリザ", job:"剣士", patk:474, eatk:437, baseDamageCap:99999,
    skillIds:["eliza_triple_light","eliza_holy_light","eliza_four_dazzle","eliza_holy_sword","eliza_ultimate","eliza_ex"],
    passiveEffects:[
      {type:"elementDamage",target:"light",value:30,label:"光属性強化Ⅴ：光属性ダメージアップ30%"},
      {type:"conditionalAttackBuff",condition:"HP満タン",target:"eatk",value:20,label:"全快時属攻強化：HP満タン時、前衛と後衛の属攻20%アップ"},
      {type:"conditionalFinalDamage",condition:"HP満タン",value:50,label:"信頼の絆：聖火の剣・聖火の秘剣・聖火の神剣の最終ダメージ+50%"},
      {type:"elementResistance",targets:["light","dark"],value:10,label:"光・闇耐性10%アップ"},
      {type:"capBonus",value:10000,label:"ダメージ上限アップ+10,000"},
      {type:"capBonus",value:20000,label:"ダメージ上限アップ+20,000"}
    ]
  }
};

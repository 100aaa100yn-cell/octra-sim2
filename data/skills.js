window.SKILLS = {
  yuna_cure: {
    id: "yuna_cure", characterId: "yuna", name: "ケアル（単体）", category: "heal", sp: 24,
    target: "singleAlly", healPower: 160, boostHealPower: {0:160,1:180,2:220,3:280},
    effects: [{type:"heal", timing:"current", targetLabel:"味方単体", label:"HP回復"}]
  },
  yuna_esuna: {
    id: "yuna_esuna", characterId: "yuna", name: "エスナ", category: "support", sp: 15,
    target: "singleAlly", boostTargetAtMax: "frontAllies",
    effects: [
      {type:"statusCure", timing:"current", targetLabel:"味方単体（BP MAX時は前衛全体）", label:"状態異常を回復（一部除く）"},
      {type:"statusImmunity", timing:"current", targetLabel:"味方単体（BP MAX時は前衛全体）", label:"状態異常無効化（一部除く）", duration:{0:1,1:2,2:3,3:4}}
    ]
  },
  yuna_valefor: {
    id:"yuna_valefor", characterId:"yuna", name:"召喚：ヴァルファーレ", category:"attack", sp:107,
    attackStat:"eatk", element:"wind", damageElement:"wind", power:25, hits:3, target:"allEnemies",
    boostPower:{0:25,1:35,2:45,3:60}, capMultiplier:1,
    shieldRules:{weaknessIndependent:true, bonusPerHit:1}, summon:"ヴァルファーレ",
    followUp:{target:"allEnemies", attackStat:"eatk", element:"wind", power:25, hitsByBoost:{0:1,1:2,2:3,3:4}, weaknessIndependent:true,
      effects:[{type:"defenseDebuff", targets:["pdef","edef"], value:10, duration:2, label:"物防・属防ダウン10%（2ターン）"}]},
    effects:[
      {type:"shieldBreak", timing:"current", targetLabel:"敵全体", label:"弱点以外でもシールドを削り、シールドダメージ+1"},
      {type:"summon", timing:"after", targetLabel:"自身とバディ", label:"召喚獣ヴァルファーレを付与（他の召喚獣を解除）"},
      {type:"followUp", timing:"after", targetLabel:"敵全体", label:"行動後に風追撃（威力25・BPにより1〜4回・1行動につき1回）"},
      {type:"defenseDebuff", timing:"after", targetLabel:"敵全体", label:"追撃時に物防・属防ダウン10%", duration:2}
    ], notes:["このアビリティ使用後にも追撃","ユウナ戦闘不能時に解除","ブレイク復帰行動前の敵はブレイク不可"]
  },
  yuna_pray: {
    id:"yuna_pray", characterId:"yuna", name:"祈る", category:"heal", sp:80, target:"frontAllies", boostTargetAtMax:"allAllies",
    healPower:65, boostHealPower:{0:65,1:85,2:115,3:155},
    effects:[
      {type:"heal", timing:"current", targetLabel:"味方前衛全体（BP MAX時は前後衛全体）", label:"HP回復"},
      {type:"elementDamage", target:"all", frame:"battle", value:30, timing:"current", targetLabel:"味方前衛全体（BP MAX時は前後衛全体）", label:"属性ダメージアップ30%", duration:2}
    ]
  },
  yuna_ixion: {
    id:"yuna_ixion", characterId:"yuna", name:"召喚：イクシオン", category:"attack", sp:84,
    attackStat:"eatk", element:"lightning", damageElement:"lightning", power:20, hits:6, target:"allEnemies",
    boostPower:{0:20,1:25,2:30,3:35}, capMultiplier:1, summon:"イクシオン",
    ignoreEffects:{perfectEvasion:true},
    followUp:{target:"singleEnemy", attackStat:"eatk", element:"lightning", power:65, hitsByBoost:{0:3,1:4,2:5,3:6}, ignoreEffects:{perfectEvasion:true},
      effects:[{type:"attackDebuff", targets:["patk","eatk"], value:10, duration:2, label:"物攻・属攻ダウン10%（2ターン）"}]},
    effects:[
      {type:"ignoreDefenseEffects", timing:"current", targetLabel:"敵全体", label:"完全回避を無視"},
      {type:"summon", timing:"after", targetLabel:"自身とバディ", label:"召喚獣イクシオンを付与（他の召喚獣を解除）"},
      {type:"followUp", timing:"after", targetLabel:"選択中の敵単体", label:"行動後に雷追撃（威力65・BPにより3〜6回・1行動につき1回）"},
      {type:"attackDebuff", timing:"after", targetLabel:"敵単体", label:"追撃時に物攻・属攻ダウン10%", duration:2}
    ], notes:["このアビリティ使用後にも追撃","ユウナ戦闘不能時に解除","ブレイク復帰行動前の敵はブレイク不可"]
  },
  yuna_holy: {
    id:"yuna_holy", characterId:"yuna", name:"ホーリー", category:"attack", sp:91,
    attackStat:"eatk", element:"light", damageElement:"light", power:85, hits:4, target:"singleEnemy",
    boostPower:{0:85,1:95,2:105,3:130}, capMultiplier:1,
    effects:[
      {type:"defenseDebuff", target:"edef", frame:"battle", value:30, timing:"after", targetLabel:"敵単体", label:"属防ダウン30%", duration:2},
      {type:"debuffCapUp", target:"edef", value:50, timing:"after", targetLabel:"敵単体", label:"バトアビ属防ダウン上限を50%に変更", duration:2}
    ]
  },
  yuna_blessing: {
    id:"yuna_blessing", characterId:"yuna", name:"祈り子の加護", category:"support", sp:135,
    target:"frontAllies", boostTargetAtMax:"allAllies",
    effects:[
      {type:"regen", value:140, timing:"current", targetLabel:"味方前衛全体（BP MAX時は前後衛全体）", label:"HP自動回復（効力140）", duration:{0:2,1:3,2:4,3:5}},
      {type:"attackBuff", target:"patk", frame:"battle", value:30, timing:"current", targetLabel:"味方前衛全体（BP MAX時は前後衛全体）", label:"物攻アップ30%", duration:{0:2,1:3,2:4,3:5}},
      {type:"attackBuff", target:"eatk", frame:"battle", value:30, timing:"current", targetLabel:"味方前衛全体（BP MAX時は前後衛全体）", label:"属攻アップ30%", duration:{0:2,1:3,2:4,3:5}},
      {type:"barrier", valuePercent:10, timing:"current", targetLabel:"味方前衛全体（BP MAX時は前後衛全体）", label:"使用者最大HP10%のHPバリア（重複不可）"},
      {type:"ultimateGauge", value:50, timing:"current", requiredBoostLevel:3, targetLabel:"味方前後衛全体", label:"BP MAX時：必殺技ゲージ+50%"}
    ]
  },
  yuna_anima: {
    id:"yuna_anima", characterId:"yuna", name:"召喚：アニマ", category:"attack", sp:240,
    attackStat:"eatk", element:"dark", damageElement:"dark", power:180, hits:4, target:"allEnemies",
    boostPower:{0:180,1:205,2:245,3:300}, capMultiplier:1, skillCapBonus:200000, summon:"アニマ",
    ignoreEffects:{pdefUp:true,edefUp:true,damageReduction:true},
    followUp:{target:"singleEnemy", attackStat:"eatk", element:"dark", power:300, hitsByBoost:{0:1,1:2,2:3,3:4}, ignoreEffects:{pdefUp:true,edefUp:true,damageReduction:true}},
    effects:[
      {type:"skillCapDisplay", value:200000, timing:"current", targetLabel:"このアビリティ", label:"このアビリティのダメージ上限+200,000"},
      {type:"ignoreDefenseEffects", timing:"current", targetLabel:"敵全体", label:"物防・属防アップとダメージ減少を無視"},
      {type:"summon", timing:"after", targetLabel:"自身とバディ", label:"召喚獣アニマを付与（他の召喚獣を解除）"},
      {type:"followUp", timing:"after", targetLabel:"選択中の敵単体", label:"行動後に闇追撃（威力300・BPにより1〜4回・1行動につき1回）"}
    ], notes:["このアビリティ使用後にも追撃","ユウナ戦闘不能時に解除","ブレイク復帰行動前の敵はブレイク不可"]
  },
  yuna_ultima: {
    id:"yuna_ultima", characterId:"yuna", name:"アルテマ", category:"attack", sp:400,
    attackStat:"eatk", element:"fire", damageElement:"fire", power:105, hits:4, target:"allEnemies",
    boostPower:{0:105,1:115,2:150,3:200}, capMultiplier:1,
    weaknessTypes:["fire","ice","lightning","wind","light","dark"],
    ignoreEffects:{perfectEvasion:true,perfectGuard:true},
    repeat:{type:"repeatSameSkill",maxRepeats:1,consumeSp:false,requiredBoostLevel:3,requiresAnyBrokenEnemy:true,includeBreakByThisSkill:true},
    effects:[
      {type:"multiWeakness", timing:"current", targetLabel:"敵全体", label:"火・氷・雷・風・光・闇弱点を突ける（ダメージ計算は火）"},
      {type:"ignoreDefenseEffects", timing:"current", targetLabel:"敵全体", label:"完全回避・完全防御を無視"},
      {type:"repeatSameSkill", timing:"conditional", targetLabel:"自身", label:"BP MAX＋ブレイク中に再発動（この技でブレイクした場合も含む・SP消費なし）"}
    ]
  },
  yuna_calm_prayer: {
    id:"yuna_calm_prayer", characterId:"yuna", name:"ナギ節の祈り", category:"heal", sp:240, target:"allAllies", useLimit:2,
    healPercent:25, boostHealPercent:{0:25,1:50,2:75,3:100},
    effects:[
      {type:"percentHeal", timing:"current", targetLabel:"味方前後衛全体", label:"最大HPの25〜100%を回復"},
      {type:"autoRevive", timing:"after", targetLabel:"味方前後衛全体", label:"戦闘不能時に即時自動復活（回復量25〜100%・重複時回数増加なし）"}
    ], notes:["戦闘中2回のみ使用可能","灯火強化前（Lv.1）は最大HP25%の自動復活のみ"]
  },


  yuna_otherworld_sending: {
    id:"yuna_otherworld_sending", characterId:"yuna", name:"異界送り", category:"support", abilityType:"ultimate",
    levelLabel:"Lv.MAX", activationPosition:"back", target:"selfAndAllies",
    effects:[
      {type:"specialState", timing:"current", targetLabel:"自身", label:"特殊効果『異界送り』を付与（7ターン／長いターン数で上書き）", duration:7},
      {type:"spStock", timing:"current", targetLabel:"自身とバディ", label:"SPストックを付与（使用者最大SPの100%・重複不可）"},
      {type:"regen", value:150, timing:"current", targetLabel:"自身とバディ", label:"HP自動回復（効力150）", duration:4},
      {type:"bpRecoveryUp", value:2, timing:"current", targetLabel:"自身とバディ", label:"BP回復量2アップ", duration:4},
      {type:"elementDamage", target:"all", frame:"battle", value:20, timing:"current", targetLabel:"味方前後衛全体", label:"属性ダメージアップ20%", duration:3},
      {type:"capBonus", value:100000, timing:"current", targetLabel:"味方前後衛全体", label:"ダメージ上限アップ+100,000", duration:3}
    ],
    specialState:{name:"異界送り", duration:7, unlocks:"マスター召喚・OD", allSummonsAvailable:true, summonReuseTurnZero:true},
    notes:["後衛から発動","『異界送り』中は呼び出している召喚獣にかかわらず全てのマスター召喚・ODが使用可能","マスター召喚・ODの再使用Turnが0になる"]
  },
  yuna_bahamut_ex: {
    id:"yuna_bahamut_ex", characterId:"yuna", name:"召喚：バハムート", category:"attack", abilityType:"ex", useLimit:4,
    attackStat:"eatk", element:"fire", damageElement:"fire", power:180, hits:6, target:"allEnemies",
    boostPower:{0:180,1:205,2:300,3:525}, boostLabels:["通常","Lv.2（BP1）","Lv.4（BP3）","Lv.6 MAX（BP5）"],
    bpCosts:{0:0,1:1,2:3,3:5}, minTurn:3, capMultiplier:1, summon:"バハムート",
    followUp:{target:"allEnemies", attackStat:"eatk", element:"fire", power:250, hitsByBoost:{0:1,1:2,2:3,3:4}},
    effects:[
      {type:"summon", timing:"after", targetLabel:"自身とバディ", label:"召喚獣バハムートを付与（他の召喚獣を解除）"},
      {type:"followUp", timing:"after", targetLabel:"敵全体", label:"行動後に火追撃（威力250・ブーストLvにより1〜4回・1行動につき1回）"}
    ],
    notes:["使用条件：3ターン目以降","戦闘中4回まで使用可能","このアビリティ使用後にも追撃","ユウナ戦闘不能時に召喚獣効果を解除","ブレイク復帰行動前の敵はブレイク不可","BP3以上消費で追撃回数は最大"]
  },

  tidus_spiral:{id:"tidus_spiral",characterId:"tidus",name:"スパイラルカット",category:"attack",attackStat:"patk",element:"water",weaponType:"sword",power:260,hits:1,boostPower:{0:260,1:310,2:390,3:500},capMultiplier:1,effects:[]},
  tidus_assault:{id:"tidus_assault",characterId:"tidus",name:"チャージ＆アサルト",category:"attack",attackStat:"patk",element:"water",weaponType:"sword",power:45,hits:5,boostPower:{0:45,1:55,2:65,3:80},capMultiplier:1,effects:[{type:"attackBuff",target:"patk",targetLabel:"自身",value:15,timing:"after",label:"自身に物攻アップ15%",duration:{0:2,1:3,2:4,3:5}}]},
  tidus_blitz:{id:"tidus_blitz",characterId:"tidus",name:"エースオブザブリッツ",category:"attack",attackStat:"patk",element:"water",weaponType:"sword",power:85,hits:9,boostPower:{0:85,1:95,2:110,3:130},capMultiplier:1,effects:[]},
  tidus_special:{id:"tidus_special",characterId:"tidus",name:"エナジーレイン",category:"attack",attackStat:"patk",element:"water",weaponType:"sword",power:440,hits:1,boostPower:{0:440,1:440,2:440,3:440},capMultiplier:1,effects:[]},
  rikku_drive:{id:"rikku_drive",characterId:"rikku",name:"ドライブパスカット",category:"attack",attackStat:"patk",element:"none",weaponType:"dagger",power:55,hits:4,boostPower:{0:55,1:65,2:80,3:100},capMultiplier:1,effects:[{type:"defenseDebuff",target:"pdef",targetLabel:"敵単体",value:15,timing:"after",label:"敵に物防ダウン15%",duration:{0:2,1:3,2:4,3:5}}]},
  rikku_nine_lives:{id:"rikku_nine_lives",characterId:"rikku",name:"ナインライヴス",category:"attack",attackStat:"patk",element:"none",weaponType:"dagger",power:30,hits:9,boostPower:{0:30,1:38,2:48,3:60},capMultiplier:1,effects:[]}
};

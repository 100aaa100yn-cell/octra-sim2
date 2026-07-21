window.SKILLS = {
  yuna_cure_single: {
    id: "yuna_cure_single", characterId: "yuna", name: "ケアル（単体）", actionType: "heal",
    spCost: 24, target: "singleAlly", healPotencyByBoost: {0:160,1:180,2:220,3:280},
    effects: [{ type:"heal", targetLabel:"味方単体", timing:"current", label:"味方単体のHPを回復", duration:null }]
  },
  yuna_esuna: {
    id: "yuna_esuna", characterId: "yuna", name: "エスナ", actionType: "support",
    spCost: 15, targetByBoost: {0:"singleAlly",1:"singleAlly",2:"singleAlly",3:"frontRowAllies"},
    effects: [
      { type:"removeStatusAilments", targetLabel:"味方単体（BP MAX時は前衛全体）", timing:"current", label:"状態異常を回復（一部除く）", duration:null },
      { type:"statusAilmentImmunity", targetLabel:"味方単体（BP MAX時は前衛全体）", timing:"current", label:"状態異常無効化を付与（一部除く）", duration:{0:1,1:2,2:3,3:4} }
    ]
  },
  yuna_summon_valefor: {
    id:"yuna_summon_valefor", characterId:"yuna", name:"召喚：ヴァルファーレ", actionType:"attack",
    spCost:107, attackStat:"eatk", element:"wind", damageElement:"wind", target:"allEnemies", hits:3,
    power:25, boostPower:{0:25,1:35,2:45,3:60}, capMultiplier:1,
    shieldDamage:{worksWithoutWeakness:true, amountPerHit:2},
    summon:{type:"valefor", label:"召喚獣ヴァルファーレ", replaceOtherSummons:true, applyTo:["self","buddy"], removeOnOwnerDeath:true},
    followUp:{name:"ヴァルファーレ追撃", target:"allEnemies", element:"wind", power:25, hitsByBoost:{0:1,1:2,2:3,3:4}, worksWithoutWeakness:true,
      effects:[{label:"物防・属防ダウン10%",duration:2}]},
    effects:[
      {type:"shieldDamage",targetLabel:"敵全体",timing:"current",label:"弱点外でもシールドを削り、1ヒットあたりのシールドダメージ+1",duration:null},
      {type:"summon",targetLabel:"自身とバディ",timing:"after",label:"召喚獣ヴァルファーレを付与（他の召喚獣を解除）",duration:null},
      {type:"followUp",targetLabel:"敵全体",timing:"after",label:"行動後に風属性追撃（威力25／BPに応じて1～4回）",duration:null},
      {type:"defenseDebuff",targetLabel:"敵全体",timing:"after",label:"追撃時に物防・属防ダウン10%",duration:2}
    ]
  },
  yuna_pray: {
    id:"yuna_pray", characterId:"yuna", name:"祈る", actionType:"healAndSupport", spCost:80,
    targetByBoost:{0:"frontRowAllies",1:"frontRowAllies",2:"frontRowAllies",3:"allPartyMembers"},
    healPotencyByBoost:{0:65,1:85,2:115,3:155},
    effects:[
      {type:"heal",targetLabel:"味方前衛全体（BP MAX時は前後衛全体）",timing:"current",label:"HPを回復",duration:null},
      {type:"elementDamage",target:"all",value:30,targetLabel:"味方前衛全体（BP MAX時は前後衛全体）",timing:"after",label:"全属性ダメージアップ30%",duration:2}
    ]
  },
  yuna_summon_ixion: {
    id:"yuna_summon_ixion", characterId:"yuna", name:"召喚：イクシオン", actionType:"attack", spCost:84,
    attackStat:"eatk", element:"lightning", damageElement:"lightning", target:"allEnemies", hits:6,
    power:20, boostPower:{0:20,1:25,2:30,3:35}, capMultiplier:1, ignoreEffects:{perfectEvasion:true},
    summon:{type:"ixion",label:"召喚獣イクシオン",replaceOtherSummons:true,applyTo:["self","buddy"],removeOnOwnerDeath:true},
    followUp:{name:"イクシオン追撃",target:"selectedEnemy",element:"lightning",power:65,hitsByBoost:{0:3,1:4,2:5,3:6},ignoreEffects:{perfectEvasion:true},effects:[{label:"物攻・属攻ダウン10%",duration:2}]},
    effects:[
      {type:"ignore",targetLabel:"敵全体",timing:"current",label:"完全回避を無視",duration:null},
      {type:"summon",targetLabel:"自身とバディ",timing:"after",label:"召喚獣イクシオンを付与（他の召喚獣を解除）",duration:null},
      {type:"followUp",targetLabel:"選択中の敵単体",timing:"after",label:"行動後に雷属性追撃（威力65／BPに応じて3～6回）",duration:null},
      {type:"attackDebuff",targetLabel:"敵単体",timing:"after",label:"追撃時に物攻・属攻ダウン10%",duration:2}
    ]
  },
  yuna_holy: {
    id:"yuna_holy", characterId:"yuna", name:"ホーリー", actionType:"attack", spCost:91,
    attackStat:"eatk", element:"light", damageElement:"light", target:"singleEnemy", hits:4,
    power:85, boostPower:{0:85,1:95,2:105,3:130}, capMultiplier:1,
    effects:[
      {type:"defenseDebuff",target:"edef",value:30,targetLabel:"敵単体",timing:"after",label:"属防ダウン30%",duration:2},
      {type:"debuffCapUp",targetLabel:"敵単体",timing:"after",label:"バトアビによる属防ダウン上限を50%に変更",duration:2}
    ]
  },
  yuna_fayth_blessing: {
    id:"yuna_fayth_blessing", characterId:"yuna", name:"祈り子の加護", actionType:"support", spCost:135,
    targetByBoost:{0:"frontRowAllies",1:"frontRowAllies",2:"frontRowAllies",3:"allPartyMembers"},
    effects:[
      {type:"hpRegen",potency:140,targetLabel:"味方前衛全体（BP MAX時は前後衛全体）",timing:"after",label:"HP自動回復（効力140）",duration:{0:2,1:3,2:4,3:5}},
      {type:"attackBuff",target:"patk",value:30,targetLabel:"味方前衛全体（BP MAX時は前後衛全体）",timing:"after",label:"物攻アップ30%",duration:{0:2,1:3,2:4,3:5}},
      {type:"attackBuff",target:"eatk",value:30,targetLabel:"味方前衛全体（BP MAX時は前後衛全体）",timing:"after",label:"属攻アップ30%",duration:{0:2,1:3,2:4,3:5}},
      {type:"hpBarrier",value:10,targetLabel:"味方前衛全体（BP MAX時は前後衛全体）",timing:"after",label:"使用者の最大HP10%分のHPバリア（重複不可）",duration:null},
      {type:"ultimateGauge",value:50,targetLabel:"味方前後衛全体",timing:"conditional",label:"BP MAX時、必殺技ゲージを50.0%増加",duration:null}
    ]
  },
  yuna_summon_anima: {
    id:"yuna_summon_anima", characterId:"yuna", name:"召喚：アニマ", actionType:"attack", spCost:240,
    attackStat:"eatk", element:"dark", damageElement:"dark", target:"allEnemies", hits:4,
    power:180, boostPower:{0:180,1:205,2:245,3:300}, capMultiplier:1, skillCapBonus:200000,
    ignoreEffects:{physicalDefenseUp:true,elementalDefenseUp:true,damageReduction:true},
    summon:{type:"anima",label:"召喚獣アニマ",replaceOtherSummons:true,applyTo:["self","buddy"],removeOnOwnerDeath:true},
    followUp:{name:"アニマ追撃",target:"selectedEnemy",element:"dark",power:300,hitsByBoost:{0:1,1:2,2:3,3:4},ignoreEffects:{physicalDefenseUp:true,elementalDefenseUp:true,damageReduction:true}},
    effects:[
      {type:"capBonus",value:200000,targetLabel:"このアビリティ",timing:"current",label:"ダメージ上限+200,000",duration:null},
      {type:"ignore",targetLabel:"敵全体",timing:"current",label:"物防・属防アップとダメージ減少効果を無視",duration:null},
      {type:"summon",targetLabel:"自身とバディ",timing:"after",label:"召喚獣アニマを付与（他の召喚獣を解除）",duration:null},
      {type:"followUp",targetLabel:"選択中の敵単体",timing:"after",label:"行動後に闇属性追撃（威力300／BPに応じて1～4回）",duration:null}
    ]
  },
  yuna_ultima: {
    id:"yuna_ultima", characterId:"yuna", name:"アルテマ", actionType:"attack", spCost:400,
    attackStat:"eatk", element:"fire", damageElement:"fire", target:"allEnemies", hits:4,
    power:105, boostPower:{0:105,1:115,2:150,3:200}, capMultiplier:1,
    weaknessTypes:["fire","ice","lightning","wind","light","dark"],
    ignoreEffects:{perfectEvasion:true,perfectGuard:true},
    repeat:{type:"repeatSameSkill",maxRepeats:1,consumeSp:false,requiredBoostLevel:3,requiresAnyBrokenEnemy:true,includeBreakByThisSkill:true},
    effects:[
      {type:"multiWeakness",timing:"current",targetLabel:"敵全体",label:"火・氷・雷・風・光・闇弱点を突ける（計算属性は火）",duration:null},
      {type:"ignoreDefenseEffects",timing:"current",targetLabel:"敵全体",label:"完全回避・完全防御を無視",duration:null},
      {type:"repeatSameSkill",timing:"conditional",targetLabel:"自身",label:"BP MAX＋ブレイク時にアルテマを再発動（この技でブレイクした場合も含む）",duration:null}
    ]
  },
  yuna_calm_prayer: {
    id:"yuna_calm_prayer", characterId:"yuna", name:"ナギ節の祈り", actionType:"healAndSupport", spCost:240,
    target:"allPartyMembers", battleUseLimit:2, healMaxHpPercentByBoost:{0:25,1:50,2:75,3:100},
    effects:[
      {type:"percentHeal",targetLabel:"味方前後衛全体",timing:"current",label:"最大HPの25/50/75/100%を回復",duration:null},
      {type:"autoRevive",targetLabel:"味方前後衛全体",timing:"after",label:"自動復活を付与（復活時の回復量もBPに応じて25/50/75/100%）",duration:null},
      {type:"useLimit",targetLabel:"自身",timing:"conditional",label:"戦闘中2回のみ使用可能",duration:null},
      {type:"torchBeforeUpgrade",targetLabel:"味方前後衛全体",timing:"conditional",label:"灯火強化前は即時回復なし／自動復活25%のみ",duration:null}
    ]
  },

  tidus_spiral:{id:"tidus_spiral",characterId:"tidus",name:"スパイラルカット",actionType:"attack",attackStat:"patk",element:"water",weaponType:"sword",power:260,hits:1,boostPower:{0:260,1:310,2:390,3:500},capMultiplier:1,effects:[]},
  tidus_assault:{id:"tidus_assault",characterId:"tidus",name:"チャージ＆アサルト",actionType:"attack",attackStat:"patk",element:"water",weaponType:"sword",power:45,hits:5,boostPower:{0:45,1:55,2:65,3:80},capMultiplier:1,effects:[{type:"attackBuff",target:"patk",targetLabel:"自身",value:15,timing:"after",label:"自身に物攻アップ15%",duration:{0:2,1:3,2:4,3:5}}]},
  tidus_blitz:{id:"tidus_blitz",characterId:"tidus",name:"エースオブザブリッツ",actionType:"attack",attackStat:"patk",element:"water",weaponType:"sword",power:85,hits:9,boostPower:{0:85,1:95,2:110,3:130},capMultiplier:1,effects:[]},
  tidus_special:{id:"tidus_special",characterId:"tidus",name:"エナジーレイン",actionType:"attack",attackStat:"patk",element:"water",weaponType:"sword",power:440,hits:1,boostPower:{0:440,1:440,2:440,3:440},capMultiplier:1,effects:[]},
  rikku_drive:{id:"rikku_drive",characterId:"rikku",name:"ドライブパスカット",actionType:"attack",attackStat:"patk",element:"none",weaponType:"dagger",power:55,hits:4,boostPower:{0:55,1:65,2:80,3:100},capMultiplier:1,effects:[{type:"defenseDebuff",target:"pdef",targetLabel:"敵単体",value:15,timing:"after",label:"敵に物防ダウン15%",duration:{0:2,1:3,2:4,3:5}}]},
  rikku_nine_lives:{id:"rikku_nine_lives",characterId:"rikku",name:"ナインライヴス",actionType:"attack",attackStat:"patk",element:"none",weaponType:"dagger",power:30,hits:9,boostPower:{0:30,1:38,2:48,3:60},capMultiplier:1,effects:[]}
};

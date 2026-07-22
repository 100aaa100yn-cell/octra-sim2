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
  rikku_nine_lives:{id:"rikku_nine_lives",characterId:"rikku",name:"ナインライヴス",category:"attack",attackStat:"patk",element:"none",weaponType:"dagger",power:30,hits:9,boostPower:{0:30,1:38,2:48,3:60},capMultiplier:1,effects:[]},
  olberic_cross:{id:"olberic_cross",characterId:"olberic",name:"十文字斬り",category:"attack",sp:32,attackStat:"patk",weaponType:"sword",element:"none",power:230,hits:1,target:"singleEnemy",boostPower:{0:230,1:260,2:300,3:400},effects:[]},
  olberic_thousand_spears:{id:"olberic_thousand_spears",characterId:"olberic",name:"千本槍（最大5Hit計算）",category:"attack",sp:48,attackStat:"patk",weaponType:"spear",element:"none",power:65,hits:5,target:"randomEnemies",boostPower:{0:65,1:75,2:85,3:110},effects:[],notes:["実際の攻撃回数は3〜5回。最大ダメージ計算では5回として扱う"]},
  olberic_mighty_sword:{id:"olberic_mighty_sword",characterId:"olberic",name:"剛剣",category:"attack",sp:45,attackStat:"patk",weaponType:"sword",element:"none",power:290,hits:1,target:"singleEnemy",boostPower:{0:290,1:320,2:380,3:500},effects:[]},
  olberic_swift_sword:{id:"olberic_swift_sword",characterId:"olberic",name:"剛迅剣",category:"attack",sp:20,attackStat:"patk",weaponType:"sword",element:"none",power:170,hits:1,target:"singleEnemy",boostPower:{0:170,1:200,2:240,3:350},repeat:{type:"repeatSameSkill",maxRepeats:1,consumeSp:false,requiredBoostLevel:3},effects:[{type:"repeatSameSkill",timing:"conditional",targetLabel:"自身",label:"BP MAX時：効果を再発動（SP消費なし）"}]},
  olberic_ultimate:{id:"olberic_ultimate",characterId:"olberic",name:"真剛剣",category:"attack",abilityType:"ultimate",attackStat:"patk",weaponType:"sword",element:"none",power:750,hits:1,target:"singleEnemy",boostPower:{0:750,1:750,2:750,3:750},skillCapBonus:100000,effects:[{type:"skillCapDisplay",value:100000,timing:"current",targetLabel:"この必殺技",label:"ダメージ上限+100,000"}]},
  olberic_ex:{id:"olberic_ex",characterId:"olberic",name:"至剛剣",category:"attack",abilityType:"ex",useLimit:2,attackStat:"patk",weaponType:"sword",element:"none",power:530,hits:1,target:"singleEnemy",boostPower:{0:530,1:560,2:700,3:900},effects:[],notes:["使用条件：自身の必殺技を1回以上使用"]},

  lars_raging_five:{id:"lars_raging_five",characterId:"lars",name:"乱烈斬",category:"attack",sp:56,attackStat:"patk",weaponType:"sword",element:"none",power:55,hits:5,target:"randomEnemies",boostPower:{0:55,1:65,2:75,3:100},effects:[]},
  lars_instant_slash:{id:"lars_instant_slash",characterId:"lars",name:"瞬烈斬",category:"attack",sp:62,attackStat:"patk",weaponType:"sword",element:"none",power:65,hits:4,target:"singleEnemy",boostPower:{0:65,1:75,2:85,3:110},hitsByBoost:{0:4,1:4,2:4,3:6},effects:[],notes:["BP MAX時は6回攻撃"]},
  lars_crushing_sword:{id:"lars_crushing_sword",characterId:"lars",name:"烈砕剣",category:"attack",sp:54,attackStat:"patk",weaponType:"sword",element:"none",power:80,hits:3,target:"allEnemies",boostPower:{0:80,1:90,2:105,3:130},effects:[]},
  lars_wind_god:{id:"lars_wind_god",characterId:"lars",name:"風神斬り",category:"attack",sp:51,attackStat:"eatk",element:"wind",power:85,hits:3,target:"randomEnemies",boostPower:{0:85,1:95,2:110,3:140},effects:[{type:"resistanceDebuff",target:"wind",value:15,timing:"after",targetLabel:"攻撃対象",label:"攻撃毎に風耐性ダウン15%",duration:2}]},
  lars_ultimate:{id:"lars_ultimate",characterId:"lars",name:"真烈剣",category:"attack",abilityType:"ultimate",attackStat:"patk",weaponType:"sword",element:"none",power:655,hits:1,target:"singleEnemy",boostPower:{0:655,1:655,2:655,3:655},skillCapBonus:100000,effects:[{type:"defenseDebuff",target:"pdef",value:15,timing:"after",targetLabel:"敵単体",label:"物防ダウン15%",duration:2},{type:"skillCapDisplay",value:100000,timing:"current",targetLabel:"この必殺技",label:"ダメージ上限+100,000"}],notes:["ターン中、素早く行動"]},
  lars_ex:{id:"lars_ex",characterId:"lars",name:"烈神連斬",category:"attack",abilityType:"ex",useLimit:1,attackStat:"patk",weaponType:"sword",element:"none",power:5,hits:10,target:"singleEnemy",boostPower:{0:5,1:5,2:5,3:5},effects:[],notes:["使用条件：自身の必殺技を1回以上使用"]},

  kouren_peacock:{id:"kouren_peacock",characterId:"kouren",name:"孔雀連刃",category:"attack",sp:62,attackStat:"patk",weaponType:"sword",element:"none",power:85,hits:4,target:"randomEnemies",boostPower:{0:85,1:95,2:105,3:130},effects:[]},
  kouren_secret:{id:"kouren_secret",characterId:"kouren",name:"秘剣・無拍斬",category:"attack",sp:50,attackStat:"patk",weaponType:"sword",element:"none",power:290,hits:1,target:"singleEnemy",boostPower:{0:290,1:340,2:380,3:500},skillCapBonus:100000,conditionalPowerMultiplier:{condition:"対象が未行動",value:2},effects:[{type:"skillCapDisplay",value:100000,timing:"current",targetLabel:"このアビリティ",label:"ダメージ上限+100,000"}],notes:["対象が未行動時、威力2倍。条件倍率は詳細表示のみで、現行計算では手動倍率調整が必要"]},
  kouren_first_blade:{id:"kouren_first_blade",characterId:"kouren",name:"壱の太刀",category:"attack",sp:40,attackStat:"patk",weaponType:"sword",element:"none",power:260,hits:1,target:"singleEnemy",boostPower:{0:260,1:260,2:300,3:400},effects:[{type:"bpRecovery",value:1,timing:"after",targetLabel:"自身",label:"BPを1回復"}]},
  kouren_return_blade:{id:"kouren_return_blade",characterId:"kouren",name:"返し刀",category:"support",sp:40,target:"self",effects:[{type:"doubleCast",timing:"current",targetLabel:"自身",label:"攻撃アビリティを2回発動（2ターン・追加分SPなし）",duration:2},{type:"guaranteedCritical",timing:"current",targetLabel:"自身",label:"必ずクリティカル",duration:{0:3,1:4,2:5,3:6}},{type:"criticalMultiplier",value:1.5,timing:"current",targetLabel:"自身",label:"クリティカル倍率を1.5倍に変更",duration:3}]},
  kouren_ultimate:{id:"kouren_ultimate",characterId:"kouren",name:"終の太刀",category:"attack",abilityType:"ultimate",attackStat:"patk",weaponType:"sword",element:"none",power:655,hits:1,target:"singleEnemy",boostPower:{0:655,1:655,2:655,3:655},skillCapBonus:100000,effects:[{type:"skillCapDisplay",value:100000,timing:"current",targetLabel:"この必殺技",label:"ダメージ上限+100,000"},{type:"bpRecovery",value:2,timing:"after",targetLabel:"自身",label:"BPを2回復"}]},
  kouren_ex:{id:"kouren_ex",characterId:"kouren",name:"孔雀耀刃（最大8Hit計算）",category:"attack",abilityType:"ex",useLimit:3,attackStat:"patk",weaponType:"sword",element:"none",power:45,hits:8,target:"singleEnemy",boostPower:{0:45,1:55,2:65,3:90},weaknessTypes:["sword","light"],effects:[],notes:["対象シールド4以上なら4回追撃し最大8Hit","使用条件：自身がHP満タン"]},

  edea_triple:{id:"edea_triple",characterId:"edea",name:"三連渾身斬り",category:"attack",sp:42,attackStat:"patk",weaponType:"sword",element:"none",power:85,hits:3,target:"singleEnemy",boostPower:{0:85,1:95,2:110,3:140},effects:[]},
  edea_miracle:{id:"edea_miracle",characterId:"edea",name:"奇跡の太刀",category:"attack",sp:32,attackStat:"patk",weaponType:"sword",element:"none",power:230,hits:1,target:"singleEnemy",boostPower:{0:230,1:260,2:300,3:400},effects:[{type:"selfHeal",value:180,timing:"after",targetLabel:"自身",label:"HP回復（効力180）"}]},
  edea_heavens_gate:{id:"edea_heavens_gate",characterId:"edea",name:"ヘブンズゲート",category:"attack",sp:42,attackStat:"eatk",element:"light",power:150,hits:2,target:"randomEnemies",boostPower:{0:150,1:120,2:105,3:120},hitsByBoost:{0:2,1:3,2:4,3:5},effects:[]},
  edea_hack_slash:{id:"edea_hack_slash",characterId:"edea",name:"ハックスラッシュ",category:"attack",sp:55,attackStat:"patk",weaponType:"sword",element:"none",power:260,hits:1,target:"singleEnemy",boostPower:{0:260,1:290,2:340,3:450},effects:[{type:"maxHpBuff",value:30,timing:"after",targetLabel:"自身",label:"最大HPアップ30%",duration:2}]},
  edea_ultimate:{id:"edea_ultimate",characterId:"edea",name:"月に叢雲花に風",category:"support",abilityType:"ultimate",target:"self",effects:[{type:"counter",power:200,attackStat:"patk",weaponType:"sword",timing:"after",targetLabel:"物理攻撃者",label:"物理攻撃に剣反撃（威力200）",duration:4},{type:"defenseBuff",targets:["pdef","edef"],value:30,timing:"current",targetLabel:"自身",label:"物防・属防アップ30%",duration:4},{type:"barrier",valuePercent:50,timing:"conditional",targetLabel:"自身",label:"200%発動時：最大HP50%のHPバリア"}]},
  edea_ex:{id:"edea_ex",characterId:"edea",name:"四天王剣",category:"attack",abilityType:"ex",useLimit:4,attackStat:"patk",weaponType:"sword",element:"none",power:100,hits:4,target:"singleEnemy",boostPower:{0:100,1:110,2:120,3:145},effects:[{type:"defenseDebuff",target:"pdef",value:15,timing:"after",targetLabel:"敵単体",label:"物防ダウン15%",duration:2}],notes:["使用条件：自身が攻撃を受けた回数が5回以上"]},

  eliza_triple_light:{id:"eliza_triple_light",characterId:"eliza",name:"三連光殺",category:"attack",sp:42,attackStat:"eatk",element:"light",power:85,hits:3,target:"singleEnemy",boostPower:{0:85,1:95,2:110,3:140},effects:[]},
  eliza_holy_light:{id:"eliza_holy_light",characterId:"eliza",name:"聖火の光",category:"attack",sp:38,attackStat:"eatk",element:"light",power:260,hits:1,target:"singleEnemy",boostPower:{0:260,1:290,2:340,3:450},effects:[{type:"attackBuff",target:"eatk",frame:"battle",value:20,timing:"after",targetLabel:"自身",label:"属攻アップ20%",duration:2}]},
  eliza_four_dazzle:{id:"eliza_four_dazzle",characterId:"eliza",name:"四連眩暈光殺閃",category:"attack",sp:70,attackStat:"eatk",element:"light",power:80,hits:4,target:"allEnemies",boostPower:{0:80,1:90,2:105,3:130},effects:[{type:"status",status:"眩暈",timing:"after",targetLabel:"敵全体",label:"眩暈を付与",duration:2}]},
  eliza_holy_sword:{id:"eliza_holy_sword",characterId:"eliza",name:"聖火の剣（剣＋光・BP MAX）",category:"attack",sp:26,attackStat:"eatk",element:"light",power:90,hits:6,target:"singleEnemy",boostPower:{0:160,1:175,2:200,3:90},effects:[],notes:["剣物理＋光属性の複合技。BP MAX時は各3回＝計6Hit。現行計算では属攻・光側を代表値として計算"]},
  eliza_ultimate:{id:"eliza_ultimate",characterId:"eliza",name:"聖火の神剣（剣＋光）",category:"attack",abilityType:"ultimate",attackStat:"eatk",element:"light",power:415,hits:2,target:"allEnemies",boostPower:{0:415,1:415,2:415,3:415},effects:[],notes:["剣物理1回＋光属性1回。現行計算では属攻・光側を代表値として2Hit計算"]},
  eliza_ex:{id:"eliza_ex",characterId:"eliza",name:"聖火の秘剣（最大5回×剣＋光）",category:"attack",abilityType:"ex",useLimit:2,attackStat:"eatk",element:"light",power:115,hits:2,target:"allEnemies",boostPower:{0:115,1:135,2:155,3:180},hitsByBoost:{0:2,1:6,2:8,3:10},effects:[{type:"weaknessGrant",targets:["sword","light"],uses:{0:2,1:3,2:4,3:5},timing:"before",targetLabel:"敵全体",label:"剣・光弱点を付与"}],notes:["使用条件：4ターン目以降","各回で剣物理＋光属性。BPにより3/4/5回となり、最大10Hitとして計算"]}
};

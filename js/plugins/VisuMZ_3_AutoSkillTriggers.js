//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x50bd=['STRUCT','isGuard','isAllDead','FRIENDS\x20ONLY','length','on%1Certain','Ally','call','TARGET','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','indexOf','Enemy','processOnBattleWinAutoSkillTriggers','UrHAO','push','ARRAYJSON','exit','skills','Game_Unit_onBattleStart','udCkB','isPhysical','uVUNT','rWXQP','canUse','onBattleStart','_forcedBattlers','toUpperCase','on%1Attack','isAlive','on%1Element%2','Game_BattlerBase_addNewState','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','checkBattleEnd','VyyeD','trim','forceAction','Settings','CreateNotetag','on%2Element%1','CreateNotetags','Game_Action_isValid','getAutoSkillTriggerSTypes','ARRAYSTRUCT','onAllActionsEnd','ARRAYFUNC','Game_Battler_onBattleStart','LnjQq','_autoSkillTrigger','XGKBO','damage','ENEMY','processAutoSkillTrigger','clearDeathAutoSkillTrigger','opponentsUnit','forceAutoSkillTrigger','max','map','on%2SType%1','filter','on%1Guard','(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)','MlSXR','isActor','STR','constructor','on%1Item','includes','VisuMZ_1_BattleCore','(?:ATTACK\x20%1|STRIKE\x20%1)','_targets','KeRxh','replace','BattleManager_checkBattleEnd','EQELJ','Game_Action_clear','(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)','Game_BattlerBase_revive','elementId','applyAutoSkillTriggers','_deathAutoSkillTriggerActive','_actions','OPPONENTS','isAutoSkillTrigger','QvOLF','format','dnakZ','hcsUX','User','PeJcC','(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)','attackElements','isValid','_onBattleWinAutoSkillTriggerOn','FUNC','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','getElementNameFromID','on%1Magical','KqdmM','isItem','isSceneBattle','hfsJI','parse','FriendsOnly','Scene_Boot_onDatabaseLoaded','AutoSkillTriggers','deathStateId','status','on%1SType%2','friendsUnit','item','note','Friends','setAutoSkillTrigger','uSrbw','skillTypes','IUIXY','cxGsw','performAutoSkillTriggers','Opponents','getAutoSkillTriggerElements','aliveMembers','match','ConvertParams','stypeId','checkDeathAutoSkillTriggerRemoval','Game_BattlerBase_isImmortal','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isImmortal','occasion','USER','ntDpz','BQXDU','shuaq','name','parameters','addNewState','onBattleWin','getSkillTypeNameFromID','subject','bzMqX','mNDAs','VisuMZ_1_SkillsStatesCore','(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)','version','some','description','on%1Physical','prototype','clear','revive','onDatabaseLoaded','Game_Action_applyGlobal','processAutoSkillTriggers','processDeathAutoSkillTriggerEffects','_deathAutoSkillTriggerPerformed','hasDeathAutoSkillTrigger','elements','VisuMZ_1_ElementStatusCore','bHUfX','RegExp','Target','stripNameTextCodes','FRIENDS','ARRAYSTR','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ONDEATH','applyGlobal','xQXHk'];(function(_0x4f357a,_0x50bd20){const _0x234881=function(_0x2f1f59){while(--_0x2f1f59){_0x4f357a['push'](_0x4f357a['shift']());}};_0x234881(++_0x50bd20);}(_0x50bd,0x9d));const _0x2348=function(_0x4f357a,_0x50bd20){_0x4f357a=_0x4f357a-0x0;let _0x234881=_0x50bd[_0x4f357a];return _0x234881;};const _0x4ff3b4=_0x2348;var label=_0x4ff3b4('0x73'),tier=tier||0x0,dependencies=[_0x4ff3b4('0x4e')],pluginData=$plugins['filter'](function(_0x2f61b6){const _0x3f7c19=_0x4ff3b4;return _0x2f61b6[_0x3f7c19('0x75')]&&_0x2f61b6[_0x3f7c19('0x9c')][_0x3f7c19('0x4d')]('['+label+']');})[0x0];VisuMZ[label][_0x4ff3b4('0x2f')]=VisuMZ[label]['Settings']||{},VisuMZ[_0x4ff3b4('0x85')]=function(_0xab0103,_0x50b6c9){const _0x691051=_0x4ff3b4;for(const _0x3f1727 in _0x50b6c9){if(_0x691051('0x48')===_0x691051('0x6f')){function _0x4219d0(){const _0x2e1587=_0x691051;this['performAutoSkillTriggers'](_0xc2945c,_0x2e1587('0x3'));if(_0x2a521f['isActor']()===_0x1ab885[_0x2e1587('0x49')]())this[_0x2e1587('0x80')](_0x3f9101,'Ally');else _0x2664ff[_0x2e1587('0x49')]()!==_0x43d796[_0x2e1587('0x49')]()&&this[_0x2e1587('0x80')](_0xc665b3,_0x2e1587('0x16'));}}else{if(_0x3f1727[_0x691051('0x84')](/(.*):(.*)/i)){if(_0x691051('0x8e')!==_0x691051('0x8e')){function _0x111f25(){const _0x485e4e=_0x691051;_0x5f207f[_0x485e4e('0x73')][_0x485e4e('0xa2')][_0x485e4e('0x12')](this),this[_0x485e4e('0x59')]();}}else{const _0x9767c0=String(RegExp['$1']),_0x4bf9bf=String(RegExp['$2'])['toUpperCase']()[_0x691051('0x2d')]();let _0x591ca4,_0x2b8aa7,_0x376a63;switch(_0x4bf9bf){case'NUM':_0x591ca4=_0x50b6c9[_0x3f1727]!==''?Number(_0x50b6c9[_0x3f1727]):0x0;break;case'ARRAYNUM':_0x2b8aa7=_0x50b6c9[_0x3f1727]!==''?JSON[_0x691051('0x70')](_0x50b6c9[_0x3f1727]):[],_0x591ca4=_0x2b8aa7[_0x691051('0x43')](_0x33bc2e=>Number(_0x33bc2e));break;case'EVAL':_0x591ca4=_0x50b6c9[_0x3f1727]!==''?eval(_0x50b6c9[_0x3f1727]):null;break;case'ARRAYEVAL':_0x2b8aa7=_0x50b6c9[_0x3f1727]!==''?JSON['parse'](_0x50b6c9[_0x3f1727]):[],_0x591ca4=_0x2b8aa7['map'](_0x19ad5f=>eval(_0x19ad5f));break;case'JSON':_0x591ca4=_0x50b6c9[_0x3f1727]!==''?JSON[_0x691051('0x70')](_0x50b6c9[_0x3f1727]):'';break;case _0x691051('0x1a'):_0x2b8aa7=_0x50b6c9[_0x3f1727]!==''?JSON['parse'](_0x50b6c9[_0x3f1727]):[],_0x591ca4=_0x2b8aa7['map'](_0x529f85=>JSON[_0x691051('0x70')](_0x529f85));break;case _0x691051('0x68'):_0x591ca4=_0x50b6c9[_0x3f1727]!==''?new Function(JSON[_0x691051('0x70')](_0x50b6c9[_0x3f1727])):new Function('return\x200');break;case _0x691051('0x37'):_0x2b8aa7=_0x50b6c9[_0x3f1727]!==''?JSON[_0x691051('0x70')](_0x50b6c9[_0x3f1727]):[],_0x591ca4=_0x2b8aa7['map'](_0x24191b=>new Function(JSON[_0x691051('0x70')](_0x24191b)));break;case _0x691051('0x4a'):_0x591ca4=_0x50b6c9[_0x3f1727]!==''?String(_0x50b6c9[_0x3f1727]):'';break;case _0x691051('0x6'):_0x2b8aa7=_0x50b6c9[_0x3f1727]!==''?JSON[_0x691051('0x70')](_0x50b6c9[_0x3f1727]):[],_0x591ca4=_0x2b8aa7[_0x691051('0x43')](_0x398c83=>String(_0x398c83));break;case _0x691051('0xb'):_0x376a63=_0x50b6c9[_0x3f1727]!==''?JSON['parse'](_0x50b6c9[_0x3f1727]):{},_0x591ca4=VisuMZ[_0x691051('0x85')]({},_0x376a63);break;case _0x691051('0x35'):_0x2b8aa7=_0x50b6c9[_0x3f1727]!==''?JSON[_0x691051('0x70')](_0x50b6c9[_0x3f1727]):[],_0x591ca4=_0x2b8aa7[_0x691051('0x43')](_0x2b36b5=>VisuMZ[_0x691051('0x85')]({},JSON['parse'](_0x2b36b5)));break;default:continue;}_0xab0103[_0x9767c0]=_0x591ca4;}}}}return _0xab0103;},(_0x1ecd1b=>{const _0x168192=_0x4ff3b4,_0x68fa6a=_0x1ecd1b[_0x168192('0x90')];for(const _0xd19347 of dependencies){if('DzllX'==='DzllX'){if(!Imported[_0xd19347]){alert(_0x168192('0x89')[_0x168192('0x5f')](_0x68fa6a,_0xd19347)),SceneManager[_0x168192('0x1b')]();break;}}else{function _0x3f92d5(){const _0x4a5825=_0x168192;_0x24dab6[_0x4a5825('0x19')](this[_0x4a5825('0x78')]()['stypeId']);}}}const _0x19a820=_0x1ecd1b[_0x168192('0x9c')];if(_0x19a820[_0x168192('0x84')](/\[Version[ ](.*?)\]/i)){const _0x29940a=Number(RegExp['$1']);_0x29940a!==VisuMZ[label][_0x168192('0x9a')]&&(alert(_0x168192('0x7')[_0x168192('0x5f')](_0x68fa6a,_0x29940a)),SceneManager['exit']());}if(_0x19a820[_0x168192('0x84')](/\[Tier[ ](\d+)\]/i)){const _0x2367ac=Number(RegExp['$1']);if(_0x2367ac<tier){if(_0x168192('0x3b')!==_0x168192('0x96'))alert(_0x168192('0x2a')[_0x168192('0x5f')](_0x68fa6a,_0x2367ac,tier)),SceneManager[_0x168192('0x1b')]();else{function _0x4c6c1e(){const _0x14b583=_0x168192;this[_0x14b583('0x2e')](_0x4b83cf,-0x2);if(!this['_actions'])return;const _0x3f88e0=this[_0x14b583('0x5b')][this['_actions']['length']-0x1];_0x3f88e0['setAutoSkillTrigger'](!![]);}}}else{if(_0x168192('0x18')!==_0x168192('0x8d'))tier=Math[_0x168192('0x42')](_0x2367ac,tier);else{function _0x47f7ce(){const _0xbb6aa2=_0x168192;if(_0x1bb5c1===this[_0xbb6aa2('0x74')]()&&this[_0xbb6aa2('0xa6')]())return this[_0xbb6aa2('0xa4')]();_0x368b9d['AutoSkillTriggers'][_0xbb6aa2('0x29')]['call'](this,_0x105bb6);}}}}VisuMZ[_0x168192('0x85')](VisuMZ[label][_0x168192('0x2f')],_0x1ecd1b[_0x168192('0x91')]);})(pluginData),VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0x72')]=Scene_Boot[_0x4ff3b4('0x9e')]['onDatabaseLoaded'],Scene_Boot[_0x4ff3b4('0x9e')][_0x4ff3b4('0xa1')]=function(){const _0x3568c3=_0x4ff3b4;VisuMZ['AutoSkillTriggers'][_0x3568c3('0x72')]['call'](this),this['process_VisuMZ_AutoSkillTriggers_Notetags']();},Scene_Boot[_0x4ff3b4('0x9e')]['process_VisuMZ_AutoSkillTriggers_Notetags']=function(){const _0xc8df6e=_0x4ff3b4;VisuMZ[_0xc8df6e('0x73')][_0xc8df6e('0x32')]();},VisuMZ['AutoSkillTriggers'][_0x4ff3b4('0x2')]={},VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0x32')]=function(){const _0x1e778a=_0x4ff3b4;let _0x185261=[[_0x1e778a('0x62'),_0x1e778a('0x8c')],[_0x1e778a('0x3'),_0x1e778a('0x13')],[_0x1e778a('0x11'),'ALLY'],[_0x1e778a('0x16'),_0x1e778a('0x3d')],[_0x1e778a('0x7a'),_0x1e778a('0x5')],['FriendsOnly',_0x1e778a('0xe')],['Opponents',_0x1e778a('0x5c')]],_0x3fbc6d=[[_0x1e778a('0x23'),_0x1e778a('0x14')],['onBattleWin','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)'],['onDeath',_0x1e778a('0x56')]];for(const _0x94f309 of _0x185261){if(_0x1e778a('0x51')!==_0x1e778a('0x51')){function _0x35c819(){const _0x35845b=_0x1e778a;_0x2adf0a=[this[_0x35845b('0x78')]()[_0x35845b('0x3c')]['elementId']];}}else{if(!_0x94f309)continue;_0x3fbc6d[_0x1e778a('0x19')]([_0x1e778a('0x26')[_0x1e778a('0x5f')](_0x94f309[0x0]),_0x1e778a('0x4f')[_0x1e778a('0x5f')](_0x94f309[0x1])]),_0x3fbc6d[_0x1e778a('0x19')]([_0x1e778a('0x46')[_0x1e778a('0x5f')](_0x94f309[0x0]),'(?:GUARD\x20%1|GUARD\x20%1)'[_0x1e778a('0x5f')](_0x94f309[0x1])]),_0x3fbc6d[_0x1e778a('0x19')]([_0x1e778a('0x4c')[_0x1e778a('0x5f')](_0x94f309[0x0]),'(?:ITEM\x20%1|ITEM\x20%1)'[_0x1e778a('0x5f')](_0x94f309[0x1])]),_0x3fbc6d[_0x1e778a('0x19')]([_0x1e778a('0x9d')[_0x1e778a('0x5f')](_0x94f309[0x0]),'(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)'[_0x1e778a('0x5f')](_0x94f309[0x1])]),_0x3fbc6d[_0x1e778a('0x19')]([_0x1e778a('0x6b')[_0x1e778a('0x5f')](_0x94f309[0x0]),_0x1e778a('0x99')[_0x1e778a('0x5f')](_0x94f309[0x1])]),_0x3fbc6d[_0x1e778a('0x19')]([_0x1e778a('0x10')[_0x1e778a('0x5f')](_0x94f309[0x0]),_0x1e778a('0x47')[_0x1e778a('0x5f')](_0x94f309[0x1])]);}}for(const _0x3f63c3 of $dataSystem[_0x1e778a('0x7d')]){if(!_0x3f63c3)continue;let _0x1d0466=DataManager[_0x1e778a('0x4')](_0x3f63c3);for(const _0x2f5cee of _0x185261){if(!_0x2f5cee)continue;_0x3fbc6d[_0x1e778a('0x19')]([_0x1e778a('0x44')[_0x1e778a('0x5f')](_0x1d0466[_0x1e778a('0x52')](/[ ]/gi,''),_0x2f5cee[0x0]),_0x1e778a('0x69')['format'](_0x1d0466,_0x2f5cee[0x1])]);}}for(const _0x1eadb3 of $dataSystem[_0x1e778a('0xa7')]){if(_0x1e778a('0x5e')===_0x1e778a('0x60')){function _0x23d52a(){const _0x2ff2de=_0x1e778a,_0x554df1=_0x34ba00(_0x413fb2['$1']);_0x554df1<_0x2d24f3?(_0x2a7ed1(_0x2ff2de('0x2a')['format'](_0x56171b,_0x554df1,_0x2561a0)),_0x1f2169[_0x2ff2de('0x1b')]()):_0x3276ae=_0x33d12b[_0x2ff2de('0x42')](_0x554df1,_0x189a47);}}else{if(!_0x1eadb3)continue;let _0x40c19e=DataManager[_0x1e778a('0x4')](_0x1eadb3);for(const _0x12f718 of _0x185261){if(!_0x12f718)continue;_0x3fbc6d[_0x1e778a('0x19')]([_0x1e778a('0x31')[_0x1e778a('0x5f')](_0x40c19e['replace'](/[ ]/gi,''),_0x12f718[0x0]),_0x1e778a('0x64')[_0x1e778a('0x5f')](_0x40c19e,_0x12f718[0x1])]);}}}for(const _0x39792a of _0x3fbc6d){this[_0x1e778a('0x30')](_0x39792a[0x0],_0x39792a[0x1]);}},VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0x30')]=function(_0x56d497,_0x461899){const _0x3355cb=_0x4ff3b4;_0x56d497=_0x56d497[_0x3355cb('0x25')]()[_0x3355cb('0x2d')]();const _0x2c23eb='<AUTO\x20TRIGGER:[\x20]%1>'[_0x3355cb('0x5f')](_0x461899);VisuMZ[_0x3355cb('0x73')][_0x3355cb('0x2')][_0x56d497]=new RegExp(_0x2c23eb,'i');},DataManager[_0x4ff3b4('0x94')]=function(_0x371d40){const _0x4d4f0b=_0x4ff3b4;return this['stripNameTextCodes']($dataSystem[_0x4d4f0b('0x7d')][_0x371d40]);},DataManager[_0x4ff3b4('0x4')]=function(_0xfb9b2b){const _0x551294=_0x4ff3b4;if(!_0xfb9b2b)return'';return _0xfb9b2b=_0xfb9b2b[_0x551294('0x52')](/\\V\[(\d+)\]/gi,''),_0xfb9b2b=_0xfb9b2b['replace'](/\\I\[(\d+)\]/gi,''),_0xfb9b2b=_0xfb9b2b[_0x551294('0x52')](/\\C\[(\d+)\]/gi,''),_0xfb9b2b=_0xfb9b2b[_0x551294('0x52')](/\\N\[(\d+)\]/gi,''),_0xfb9b2b=_0xfb9b2b[_0x551294('0x52')](/\\P\[(\d+)\]/gi,''),(_0xfb9b2b||'')[_0x551294('0x25')]()[_0x551294('0x2d')]();},DataManager['getElementNameFromID']=function(_0x551af3){const _0x58c64c=_0x4ff3b4;return this['stripNameTextCodes']($dataSystem[_0x58c64c('0xa7')][_0x551af3]);},VisuMZ['AutoSkillTriggers']['BattleManager_checkBattleEnd']=BattleManager[_0x4ff3b4('0x2b')],BattleManager[_0x4ff3b4('0x2b')]=function(){const _0x2dc277=_0x4ff3b4;if($gameTroop[_0x2dc277('0xd')]())$gameParty[_0x2dc277('0x17')]();if(this[_0x2dc277('0x24')]['length']>0x0)return![];return VisuMZ[_0x2dc277('0x73')]['BattleManager_checkBattleEnd'][_0x2dc277('0x12')](this);},VisuMZ['AutoSkillTriggers'][_0x4ff3b4('0x55')]=Game_Action['prototype']['clear'],Game_Action[_0x4ff3b4('0x9e')][_0x4ff3b4('0x9f')]=function(){const _0x238b5c=_0x4ff3b4;VisuMZ[_0x238b5c('0x73')]['Game_Action_clear'][_0x238b5c('0x12')](this),this['setAutoSkillTrigger'](![]);},Game_Action[_0x4ff3b4('0x9e')][_0x4ff3b4('0x7b')]=function(_0x50e523){this['_autoSkillTrigger']=_0x50e523;},Game_Action[_0x4ff3b4('0x9e')][_0x4ff3b4('0x5d')]=function(){const _0x335ec4=_0x4ff3b4;return!!this[_0x335ec4('0x3a')];},VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0x33')]=Game_Action[_0x4ff3b4('0x9e')]['isValid'],Game_Action[_0x4ff3b4('0x9e')][_0x4ff3b4('0x66')]=function(){const _0x59844d=_0x4ff3b4;let _0x1b08ce=VisuMZ[_0x59844d('0x73')][_0x59844d('0x33')][_0x59844d('0x12')](this),_0x555089=this['item']()?this[_0x59844d('0x78')]()[_0x59844d('0x8b')]:-0x1;if(this[_0x59844d('0x78')]()&&this[_0x59844d('0x5d')]())return this['item']()[_0x59844d('0x8b')]=0x0,_0x1b08ce=_0x1b08ce&&this[_0x59844d('0x95')]()[_0x59844d('0x22')](this[_0x59844d('0x78')]()),this[_0x59844d('0x78')]()[_0x59844d('0x8b')]=_0x555089,_0x1b08ce;else{if(_0x59844d('0xa')===_0x59844d('0x21')){function _0x3a2873(){const _0x6eea23=_0x59844d;return _0x4bdf6d[_0x6eea23('0x75')]&&_0x1416f3[_0x6eea23('0x9c')][_0x6eea23('0x4d')]('['+_0x1853e9+']');}}else return _0x1b08ce;}},VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0xa2')]=Game_Action[_0x4ff3b4('0x9e')][_0x4ff3b4('0x9')],Game_Action[_0x4ff3b4('0x9e')][_0x4ff3b4('0x9')]=function(){const _0x245e35=_0x4ff3b4;VisuMZ[_0x245e35('0x73')][_0x245e35('0xa2')]['call'](this),this[_0x245e35('0x59')]();},Game_Action[_0x4ff3b4('0x9e')][_0x4ff3b4('0x34')]=function(){const _0x259ec3=_0x4ff3b4;if(!this['isSkill']())return[];let _0x3868d0=[];return Imported[_0x259ec3('0x98')]?_0x3868d0=DataManager['getSkillTypes'](this[_0x259ec3('0x78')]()):_0x3868d0[_0x259ec3('0x19')](this['item']()[_0x259ec3('0x86')]),_0x3868d0[_0x259ec3('0x43')](_0x3c0c9d=>DataManager[_0x259ec3('0x94')](_0x3c0c9d));},Game_Action['prototype']['getAutoSkillTriggerElements']=function(){const _0x286388=_0x4ff3b4;let _0x3a497c=[];if(Imported[_0x286388('0x0')])_0x3a497c=this['elements']();else{if(this[_0x286388('0x78')]()[_0x286388('0x3c')]['elementId']<0x0){if(_0x286388('0x7e')!==_0x286388('0x8f')){const _0x50c010=this['subject']();_0x3a497c=_0x50c010[_0x286388('0x65')]();}else{function _0x23f502(){const _0x5995b7=_0x286388;if(!_0x3a7b2f)return'';return _0x536d73=_0x291ae1['replace'](/\\V\[(\d+)\]/gi,''),_0x3d0020=_0x2b3777[_0x5995b7('0x52')](/\\I\[(\d+)\]/gi,''),_0x190c8d=_0x2255d2[_0x5995b7('0x52')](/\\C\[(\d+)\]/gi,''),_0x59f6b2=_0x17d970[_0x5995b7('0x52')](/\\N\[(\d+)\]/gi,''),_0x7a216f=_0x54a9f2[_0x5995b7('0x52')](/\\P\[(\d+)\]/gi,''),(_0x22761c||'')[_0x5995b7('0x25')]()[_0x5995b7('0x2d')]();}}}else _0x3a497c=[this[_0x286388('0x78')]()[_0x286388('0x3c')][_0x286388('0x58')]];}return _0x3a497c['map'](_0x91146a=>DataManager[_0x286388('0x6a')](_0x91146a));},Game_Action[_0x4ff3b4('0x9e')][_0x4ff3b4('0x59')]=function(){const _0x58d1ef=_0x4ff3b4;if(!SceneManager['isSceneBattle']())return;if(!this['item']())return;if(this[_0x58d1ef('0x78')]()[_0x58d1ef('0x79')][_0x58d1ef('0x84')](/<NO AUTO SKILL TRIGGER>/i))return;if(this[_0x58d1ef('0x78')]()[_0x58d1ef('0x79')][_0x58d1ef('0x84')](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x5c1d4b=this['subject'](),_0x39a9af=BattleManager[_0x58d1ef('0x50')][_0x58d1ef('0x45')]((_0x22eb95,_0x23c070,_0x5674c9)=>_0x5674c9[_0x58d1ef('0x15')](_0x22eb95)===_0x23c070),_0x2dc75b=_0x5c1d4b[_0x58d1ef('0x77')]()[_0x58d1ef('0x83')](),_0x4e7626=_0x5c1d4b[_0x58d1ef('0x40')]()[_0x58d1ef('0x83')]();this['performAutoSkillTriggers'](_0x5c1d4b,_0x58d1ef('0x62'));for(const _0x1b4e0b of _0x39a9af){if(_0x58d1ef('0x6c')==='vUIKf'){function _0x36296c(){const _0x4606aa=_0x58d1ef;return this[_0x4606aa('0x78')]()[_0x4606aa('0x8b')]=0x0,_0x4e2658=_0x2421a6&&this['subject']()[_0x4606aa('0x22')](this[_0x4606aa('0x78')]()),this['item']()[_0x4606aa('0x8b')]=_0x58ee7e,_0x494386;}}else{this['performAutoSkillTriggers'](_0x1b4e0b,_0x58d1ef('0x3'));if(_0x1b4e0b[_0x58d1ef('0x49')]()===_0x5c1d4b['isActor']())this[_0x58d1ef('0x80')](_0x1b4e0b,'Ally');else{if(_0x1b4e0b[_0x58d1ef('0x49')]()!==_0x5c1d4b['isActor']()){if(_0x58d1ef('0x39')!==_0x58d1ef('0x61'))this['performAutoSkillTriggers'](_0x1b4e0b,'Enemy');else{function _0x582924(){const _0x31e415=_0x58d1ef;if(this[_0x31e415('0xa5')])return![];const _0x32f399=_0x474e17[_0x31e415('0x73')][_0x31e415('0x2')][_0x31e415('0x8')];return this[_0x31e415('0x1c')]()[_0x31e415('0x9b')](_0x4f0bce=>_0x4f0bce&&_0x4f0bce['note']['match'](_0x32f399));}}}}}}for(const _0x3a422e of _0x2dc75b){this[_0x58d1ef('0x80')](_0x3a422e,'Friends'),_0x3a422e!==_0x5c1d4b&&this[_0x58d1ef('0x80')](_0x3a422e,_0x58d1ef('0x71'));}for(const _0x4c2a34 of _0x4e7626){this[_0x58d1ef('0x80')](_0x4c2a34,_0x58d1ef('0x81'));}},Game_Action['prototype'][_0x4ff3b4('0x80')]=function(_0x156444,_0x3ec3a5){const _0x59d3e4=_0x4ff3b4;if(!_0x156444)return;if(this['isAttack']())_0x156444[_0x59d3e4('0x3e')]('on%1Attack'['format'](_0x3ec3a5));if(this[_0x59d3e4('0xc')]())_0x156444[_0x59d3e4('0x3e')](_0x59d3e4('0x46')[_0x59d3e4('0x5f')](_0x3ec3a5));if(this[_0x59d3e4('0x6d')]())_0x156444[_0x59d3e4('0x3e')](_0x59d3e4('0x4c')[_0x59d3e4('0x5f')](_0x3ec3a5));if(this[_0x59d3e4('0x1f')]())_0x156444[_0x59d3e4('0x3e')]('on%1Physical'[_0x59d3e4('0x5f')](_0x3ec3a5));if(this['isMagical']())_0x156444[_0x59d3e4('0x3e')](_0x59d3e4('0x6b')['format'](_0x3ec3a5));if(this['isCertainHit']())_0x156444[_0x59d3e4('0x3e')](_0x59d3e4('0x10')['format'](_0x3ec3a5));const _0xd2f823=this[_0x59d3e4('0x34')]();for(let _0x128a71 of _0xd2f823){if(!_0x128a71)continue;_0x128a71=_0x128a71['replace'](/[ ]/gi,''),_0x156444['processAutoSkillTrigger'](_0x59d3e4('0x76')['format'](_0x3ec3a5,_0x128a71));}const _0x2ec7db=this[_0x59d3e4('0x82')]();for(let _0x19ed91 of _0x2ec7db){if(_0x59d3e4('0x97')===_0x59d3e4('0x1e')){function _0x4494da(){const _0x5ab2d0=_0x59d3e4;if(_0x42a035[_0x5ab2d0('0xd')]())_0x6c8f8d['processOnBattleWinAutoSkillTriggers']();if(this['_forcedBattlers'][_0x5ab2d0('0xf')]>0x0)return![];return _0x1e1b2b[_0x5ab2d0('0x73')][_0x5ab2d0('0x53')][_0x5ab2d0('0x12')](this);}}else{if(!_0x19ed91)continue;_0x19ed91=_0x19ed91['replace'](/[ ]/gi,''),_0x156444['processAutoSkillTrigger'](_0x59d3e4('0x28')[_0x59d3e4('0x5f')](_0x3ec3a5,_0x19ed91));}}},VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0x29')]=Game_BattlerBase['prototype'][_0x4ff3b4('0x92')],Game_BattlerBase[_0x4ff3b4('0x9e')][_0x4ff3b4('0x92')]=function(_0x43a577){const _0x48e9d6=_0x4ff3b4;if(_0x43a577===this[_0x48e9d6('0x74')]()&&this[_0x48e9d6('0xa6')]()){if(_0x48e9d6('0x20')!==_0x48e9d6('0x20')){function _0x5d525e(){const _0x45d954=_0x48e9d6;if(this['_onBattleWinAutoSkillTriggerOn'])return;this[_0x45d954('0x67')]=!![],this['processAutoSkillTriggers']('onBattleWin');}}else return this['processDeathAutoSkillTriggerEffects']();}VisuMZ[_0x48e9d6('0x73')]['Game_BattlerBase_addNewState'][_0x48e9d6('0x12')](this,_0x43a577);},Game_BattlerBase[_0x4ff3b4('0x9e')][_0x4ff3b4('0xa6')]=function(){const _0x265b89=_0x4ff3b4;if(this[_0x265b89('0xa5')])return![];const _0x57ca07=VisuMZ['AutoSkillTriggers']['RegExp']['ONDEATH'];return this[_0x265b89('0x1c')]()['some'](_0x25736b=>_0x25736b&&_0x25736b[_0x265b89('0x79')][_0x265b89('0x84')](_0x57ca07));},VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0x88')]=Game_BattlerBase[_0x4ff3b4('0x9e')][_0x4ff3b4('0x8a')],Game_BattlerBase[_0x4ff3b4('0x9e')]['isImmortal']=function(){const _0x4e5a94=_0x4ff3b4;if(this[_0x4e5a94('0x5a')])return!![];return VisuMZ['AutoSkillTriggers'][_0x4e5a94('0x88')][_0x4e5a94('0x12')](this);},Game_Battler[_0x4ff3b4('0x9e')]['processAutoSkillTrigger']=function(_0x301c99){const _0x1d65dc=_0x4ff3b4;if(!SceneManager[_0x1d65dc('0x6e')]())return;const _0x417204=VisuMZ[_0x1d65dc('0x73')]['RegExp'][_0x301c99[_0x1d65dc('0x25')]()[_0x1d65dc('0x2d')]()];if(!_0x417204)return;for(const _0x28ca5f of this[_0x1d65dc('0x1c')]()){if(_0x1d65dc('0x7f')===_0x1d65dc('0x1')){function _0x4bb2a8(){return _0xe20f26;}}else{if(!_0x28ca5f)continue;if(_0x28ca5f[_0x1d65dc('0x79')][_0x1d65dc('0x84')](_0x417204)){if(_0x1d65dc('0x2c')!==_0x1d65dc('0x63'))this['forceAutoSkillTrigger'](_0x28ca5f['id']),BattleManager[_0x1d65dc('0x2e')](this);else{function _0x56fe84(){const _0x5f50fc=_0x1d65dc;_0x3d3fd6('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5f50fc('0x5f')](_0xb42dbd,_0x42efeb)),_0x36b595['exit']();}}}}}},Game_Battler[_0x4ff3b4('0x9e')]['forceAutoSkillTrigger']=function(_0x5d71c7){const _0x4acca2=_0x4ff3b4;this[_0x4acca2('0x2e')](_0x5d71c7,-0x2);if(!this[_0x4acca2('0x5b')])return;const _0x5a78db=this[_0x4acca2('0x5b')][this[_0x4acca2('0x5b')][_0x4acca2('0xf')]-0x1];_0x5a78db[_0x4acca2('0x7b')](!![]);},VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0x38')]=Game_Battler[_0x4ff3b4('0x9e')]['onBattleStart'],Game_Battler['prototype'][_0x4ff3b4('0x23')]=function(_0x4e28e5){const _0x1f0e98=_0x4ff3b4;VisuMZ['AutoSkillTriggers'][_0x1f0e98('0x38')][_0x1f0e98('0x12')](this,_0x4e28e5),this[_0x1f0e98('0x3e')](_0x1f0e98('0x23')),this[_0x1f0e98('0x3f')]();},VisuMZ[_0x4ff3b4('0x73')][_0x4ff3b4('0x57')]=Game_BattlerBase['prototype'][_0x4ff3b4('0xa0')],Game_BattlerBase[_0x4ff3b4('0x9e')][_0x4ff3b4('0xa0')]=function(){const _0x4e7b03=_0x4ff3b4;VisuMZ[_0x4e7b03('0x73')][_0x4e7b03('0x57')][_0x4e7b03('0x12')](this),this[_0x4e7b03('0x3f')]();},Game_Battler['prototype'][_0x4ff3b4('0x3f')]=function(){const _0x24a745=_0x4ff3b4;this[_0x24a745('0x5a')]=![],this['_deathAutoSkillTriggerPerformed']=![];},Game_Battler[_0x4ff3b4('0x9e')][_0x4ff3b4('0xa4')]=function(){const _0x508ffb=_0x4ff3b4;this['_deathAutoSkillTriggerActive']=!![],this[_0x508ffb('0x3e')]('onDeath');};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x4ff3b4('0x9e')][_0x4ff3b4('0x36')];Game_Battler[_0x4ff3b4('0x9e')][_0x4ff3b4('0x36')]=function(){const _0x47d5a1=_0x4ff3b4;_Game_Battler_onAllActionsEnd_[_0x47d5a1('0x12')](this),this[_0x47d5a1('0x87')]();},Game_Battler[_0x4ff3b4('0x9e')]['checkDeathAutoSkillTriggerRemoval']=function(){const _0x74cb2a=_0x4ff3b4;if(!this[_0x74cb2a('0x5a')])return;if(this[_0x74cb2a('0xa5')])return;const _0x4053d0=BattleManager['_forcedBattlers'];for(const _0x5f0b04 of _0x4053d0){if(_0x74cb2a('0x7c')===_0x74cb2a('0x7c')){if(!_0x5f0b04)continue;if(_0x5f0b04[0x0]===this)return;}else{function _0x208372(){const _0xb563a8=_0x74cb2a;this[_0xb563a8('0x41')](_0xcea1fc['id']),_0x2fad96[_0xb563a8('0x2e')](this);}}}this['_deathAutoSkillTriggerActive']=![],this[_0x74cb2a('0xa5')]=!![],this['refresh']();if(this[_0x74cb2a('0x27')]())this[_0x74cb2a('0x3f')]();},VisuMZ['AutoSkillTriggers'][_0x4ff3b4('0x1d')]=Game_Unit['prototype'][_0x4ff3b4('0x23')],Game_Unit['prototype'][_0x4ff3b4('0x23')]=function(_0x281877){const _0x7e4e2a=_0x4ff3b4;VisuMZ['AutoSkillTriggers'][_0x7e4e2a('0x1d')][_0x7e4e2a('0x12')](this,_0x281877);if(this[_0x7e4e2a('0x4b')]===Game_Party)this[_0x7e4e2a('0x67')]=![];},Game_Unit[_0x4ff3b4('0x9e')][_0x4ff3b4('0xa3')]=function(_0x3da455,_0x93185){const _0x5649fb=_0x4ff3b4;_0x93185=_0x93185||null;const _0x5e10ca=this[_0x5649fb('0x83')]()[_0x5649fb('0x45')](_0xeb2366=>_0xeb2366!==_0x93185);for(const _0x5c0c41 of _0x5e10ca){if(_0x5649fb('0x54')!==_0x5649fb('0x54')){function _0x2ceab8(){const _0x42506f=_0x5649fb;_0xa70a0[_0x42506f('0x73')][_0x42506f('0x38')][_0x42506f('0x12')](this,_0x26f144),this[_0x42506f('0x3e')]('onBattleStart'),this[_0x42506f('0x3f')]();}}else{if(!_0x5c0c41)continue;_0x5c0c41[_0x5649fb('0x3e')](_0x3da455);}}},Game_Party[_0x4ff3b4('0x9e')]['processOnBattleWinAutoSkillTriggers']=function(){const _0x54ac5d=_0x4ff3b4;if(this['_onBattleWinAutoSkillTriggerOn'])return;this[_0x54ac5d('0x67')]=!![],this[_0x54ac5d('0xa3')](_0x54ac5d('0x93'));};
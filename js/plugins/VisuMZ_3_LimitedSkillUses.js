//=============================================================================
// VisuStella MZ - Limited Skill Uses
// VisuMZ_3_LimitedSkillUses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LimitedSkillUses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LimitedSkillUses = VisuMZ.LimitedSkillUses || {};
VisuMZ.LimitedSkillUses.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [LimitedSkillUses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Limited_Skill_Uses_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables you to set a limited amount of times certain skills (or
 * all skills) can be used per battle or ever. This adds a different type of
 * skill currency and balance mechanic in limiting the amount of times a skill
 * can be used without directly having to alter MP, TP, or the like.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Determine globally or individually how many skill uses a battler can use
 *   per battle (does not apply to basic attack and guard skills).
 * * Determine how many uses are restored per battle.
 * * Use notetag effects to alter the amount of uses a user or target has
 *   globally, for specific skill types, or for specific individual skills.
 * * Adjust how the limited uses are displayed in-game.
 * * Equipment, class types, states, etc. can all affect the maximum quantity
 *   of uses for skills, too.
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
 * * VisuMZ_1_SkillsStatesCore
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
 * === Basic Limited Use-Related Notetags ===
 * 
 * ---
 *
 * <Limited Uses: x>
 *
 * - Used for: Skill Notetags
 * - Sets the limited use maximum base amount for this skill.
 * - This value will override the Plugin Parameter settings for a base value if
 *   "All Skills Limited?" is turned on.
 * - Replace 'x' with a number value representing the base maximum uses this
 *   skill can have.
 *
 * ---
 *
 * <Unlimited Use>
 *
 * - Used for: Skill Notetags
 * - If the Plugin Parameter "All Skills Limited?" is turned on, this will
 *   disable limited uses for this skill, allowing it to be used in unlimited
 *   amounts independent of the Limited Use base.
 *
 * ---
 * 
 * === Use Recovery-Related Notetags ===
 * 
 * ---
 *
 * <Victory Uses Recover: x>
 * <Escape Uses Recover: x>
 * <Defeat Uses Recover: x>
 * <After Battle Uses Recover: x>
 *
 * - Used for: Skill Notetags
 * - Determines how many limited uses are recovered at the end of each battle
 *   depending on the result.
 *   - Victory notetag variant requires winning the battle.
 *   - Escape notetag variant requires escaping the battle.
 *   - Defeat notetag variant requires losing the battle.
 *   - After Battle notetag variant applies to all cases.
 * - Replace 'x' with how many uses are restored upon completing a battle.
 *
 * ---
 *
 * <Bypass Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This prevents the skill from recovering all uses with the "Recover All"
 *   event command.
 *
 * ---
 *
 * <Allow Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This allows the skill to recover all uses with the "Recover All" event
 *   command when the "Recover All?" plugin parameter is disabled.
 *
 * ---
 * 
 * === Use Alteration-Related Notetags ===
 * 
 * ---
 *
 * <User Global Uses: +x>
 * <User Global Uses: -x>
 *
 * <User SType id Uses: +x>
 * <User SType id Uses: -x>
 * <User SType name Uses: +x>
 * <User SType name Uses: -x>
 *
 * <User Skill id Uses: +x>
 * <User Skill id Uses: -x>
 * <User Skill name Uses: +x>
 * <User Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's user.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *   - Skill notetag viarant effects a specific matching skill.
 * - Replace 'id' with the ID of the skill type.
 * - Replace 'name' with the name of the skill type (without text codes).
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 *
 * <Target Global Uses: +x>
 * <Target Global Uses: -x>
 *
 * <Target SType id Uses: +x>
 * <Target SType id Uses: -x>
 * <Target SType name Uses: +x>
 * <Target SType name Uses: -x>
 *
 * <Target Skill id Uses: +x>
 * <Target Skill id Uses: -x>
 * <Target Skill name Uses: +x>
 * <Target Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's target.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 * 
 * === Trait Based-Related Notetags ===
 * 
 * ---
 *
 * <Gloal Use Max: +x>
 * <Gloal Use Max: -x>
 * 
 * <SType id Use Max: +x>
 * <SType id Use Max: -x>
 * <SType name Use Max: +x>
 * <SType name Use Max: -x>
 * 
 * <Skill id Use Max: +x>
 * <Skill id Use Max: -x>
 * <Skill name Use Max: +x>
 * <Skill name Use Max: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the maximum limited uses for all skills, skills of a particular
 *   type, or individual skills.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - Replace 'x' with the amount to adjust the maximum uses by. Positive values
 *   increase the maximum uses while negative values decrease them.
 *   - These will be hard capped by the settings found in the Plugin Parmeters.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Limited Skill Uses.
 *
 * ---
 *
 * General
 * 
 *   Limited Use Icon:
 *   - Icon used for representing Limited Uses in the cost.
 * 
 *   Cost Format:
 *   - Format for Limited Use cost display.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Empty Format:
 *   - Format for Limited Use cost display when empty.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Cost Position Front?:
 *   - Put the Limited Uses at the front of skill/item costs?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanical settings regarding Limited Skill Uses.
 *
 * ---
 *
 * All Limited
 * 
 *   All Skills Limited?:
 *   - Make all skills have limited uses?
 *   - Does not apply to basic attack and guard.
 * 
 *     Default Max:
 *     - If all skills are limited, what is the default maximum uses?
 *
 * ---
 *
 * Hard Caps
 * 
 *   Maximum:
 *   - What is the maximum hardcap for limited uses?
 * 
 *   Minimum:
 *   - What is the minimum hardcap for limited uses?
 *
 * ---
 *
 * Recovery
 * 
 *   Battle Victory:
 *   - How many uses for each skill does a victory restore by default?
 * 
 *   Battle Escape:
 *   - How many uses for each skill does an escape restore by default?
 * 
 *   Battle Defeat:
 *   - How many uses for each skill does a defeat restore by default?
 * 
 *   Recover All?:
 *   - Does the "Recover All" command restore Limited Skill Uses?
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
 * Version 1.01: March 26, 2021
 * * Compatibility Update!
 * ** Skill type limited uses now affect all skill types with skills that have
 *    multiple skill types declared through the Skills and States Core.
 * 
 * Version 1.00 Official Release Date: March 10, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableLimitedSkillUsesMenu
 * @text System: Enable LimitedSkillUses in Menu?
 * @desc Enables/disables LimitedSkillUses menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables LimitedSkillUses menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowLimitedSkillUsesMenu
 * @text System: Show LimitedSkillUses in Menu?
 * @desc Shows/hides LimitedSkillUses menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides LimitedSkillUses menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param LimitedSkillUses
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding Limited Skill Uses.
 * @default {"Icon:num":"160","CostFmt:str":"\\FS[22]\\C[8]%1/%2\\C[0]","EmptyFmt:str":"\\FS[22]\\C[8]Empty\\C[0]","CostPosition:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanical settings regarding Limited Skill Uses.
 * @default {"AllLimited":"","AllLimited:eval":"false","DefaultMax:num":"2","HardCaps":"","Maximum:num":"100","Minimum:num":"1","Recovery":"","BattleVictory:num":"10","BattleEscape:num":"5","BattleDefeat:num":"5","RecoverAll:eval":"true"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Icon:num
 * @text Limited Use Icon
 * @desc Icon used for representing Limited Uses in the cost.
 * @default 160
 *
 * @param CostFmt:str
 * @text Cost Format
 * @desc Format for Limited Use cost display.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]%1/%2\C[0]
 *
 * @param EmptyFmt:str
 * @text Empty Format
 * @desc Format for Limited Use cost display when empty.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]Empty\C[0]
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the Limited Uses at the front of skill/item costs?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param AllLimited
 * @text All Limited
 *
 * @param AllLimited:eval
 * @text All Skills Limited?
 * @parent AllLimited
 * @type boolean
 * @on Limited
 * @off Normal
 * @desc Make all skills have limited uses?
 * Does not apply to basic attack and guard.
 * @default false
 *
 * @param DefaultMax:num
 * @text Default Max
 * @parent AllLimited:eval
 * @type number
 * @min 1
 * @desc If all skills are limited, what is the default maximum uses?
 * @default 2
 *
 * @param HardCaps
 * @text Hard Caps
 *
 * @param Maximum:num
 * @text Maximum
 * @parent HardCaps
 * @type number
 * @desc What is the maximum hardcap for limited uses?
 * @default 100
 *
 * @param Minimum:num
 * @text Minimum
 * @parent HardCaps
 * @type number
 * @desc What is the minimum hardcap for limited uses?
 * @default 1
 *
 * @param Recovery
 *
 * @param BattleVictory:num
 * @text Battle Victory
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a victory restore by default?
 * @default 10
 *
 * @param BattleEscape:num
 * @text Battle Escape
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does an escape restore by default?
 * @default 5
 *
 * @param BattleDefeat:num
 * @text Battle Defeat
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a defeat restore by default?
 * @default 5
 *
 * @param RecoverAll:eval
 * @text Recover All?
 * @parent Recovery
 * @type boolean
 * @on Recovers
 * @off Does Not
 * @desc Does the "Recover All" command restore Limited Skill Uses?
 * @default true
 *
 */
//=============================================================================

const _0x234b=['map','skillCostSeparator','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','traitObjects','format','655862KcnUTF','canRecoverAllLimitedSkillUses','CostFmt','RecoverVictory','_skillIDs','note','LIMITED_SKILL_USE_HARDCAP_MIN','BattleEscape','paySkillCost','LIMITED_SKILL_USE_ALL_LIMITED','recoverLimitedSkillUsesBattle','651009OnMPkX','UserSkillLimitedUses','endBattleRecoveryLimitedSkillUses','prototype','applyLimitedSkillUsesUserEffect','RecoverEscape','UserGlobalLimitedUses','allMembers','TargetSTypeLimitedUses','skillLimitedUseTimes','FUNC','Game_BattlerBase_refresh','_cache_SkillLimitedUseMax','_inBattle','Window_Base_makeAdditionalSkillCostText','paySkillLimitedUse','ARRAYJSON','BattleVictory','max','match','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','getStypeIdWithName','18eNekrj','makeAdditionalCostTextLimitedSkillUses','limitedUseIcon','description','alterLimitedSkillUses','RegExp','item','STR','SkillLimitedUses','EVAL','setSkillLimitedUseTimes','name','BypassRecoverAll','RecoverAll','recoverAll','LIMITED_SKILL_USE_HARDCAP_MAX','LIMITED_SKILL_USE_BASE','guardSkillId','status','Maximum','LIMITED_SKILL_USE_RECOVERY','toUpperCase','victory','Game_Action_applyItemUserEffect','GlobalLimitedUses','LimitedSkillUses','isSkillLimitedUse','defeat','_skillLimitedUseTimes','ARRAYSTR','CostPosition','test','Settings','parameters','applyItemUserEffect','skillLimitedUseMax','Mechanics','isAttackOrGuardSkill','Game_BattlerBase_meetsSkillConditions','STRUCT','LimitedUse','meetsSkillConditions','\x5cI[%1]','344465irzbMe','Game_BattlerBase_recoverAll','ARRAYFUNC','getSkillIdWithName','skills','return\x200','AllLimited','34327BnONat','156537NEilwl','UserSTypeLimitedUses','includes','RecoverDefeat','TargetGlobalLimitedUses','TargetSkillLimitedUses','exit','subject','makeAdditionalSkillCostText','ConvertParams','testItemEffect','recoverAllLimitedSkillUses','escape','trim','LIMITED_SKILL_USE_RECOVER_ALL','refresh','call','JSON','STypeLimitedUses','2EzRSPz','recoverLimitedSkillUses','VisuMZ_1_SkillsStatesCore','limitedUseFmt','replace','BattleManager_endBattle','NUM','ARRAYSTRUCT','calcSkillLimitedUseMax','skillTypes','_stypeIDs','336315RVAqzl','General','Game_Action_testItemEffect','84090zVbvUP','attackSkillId','version','parse','limitedUseEmptyFmt'];const _0x2982=function(_0x3345e2,_0x1da08f){_0x3345e2=_0x3345e2-0x157;let _0x234bbc=_0x234b[_0x3345e2];return _0x234bbc;};const _0x3dfbf1=_0x2982;(function(_0x340152,_0x5b00a7){const _0x4c3b1c=_0x2982;while(!![]){try{const _0x2c8cba=parseInt(_0x4c3b1c(0x167))*parseInt(_0x4c3b1c(0x199))+-parseInt(_0x4c3b1c(0x1c5))+parseInt(_0x4c3b1c(0x1ad))*-parseInt(_0x4c3b1c(0x1b8))+parseInt(_0x4c3b1c(0x19a))+parseInt(_0x4c3b1c(0x1d0))+parseInt(_0x4c3b1c(0x192))+-parseInt(_0x4c3b1c(0x1bb));if(_0x2c8cba===_0x5b00a7)break;else _0x340152['push'](_0x340152['shift']());}catch(_0x4731d2){_0x340152['push'](_0x340152['shift']());}}}(_0x234b,0x573c3));var label='LimitedSkillUses',tier=tier||0x0,dependencies=[_0x3dfbf1(0x1af)],pluginData=$plugins['filter'](function(_0x28bd70){const _0x341a49=_0x3dfbf1;return _0x28bd70[_0x341a49(0x179)]&&_0x28bd70[_0x341a49(0x16a)][_0x341a49(0x19c)]('['+label+']');})[0x0];VisuMZ[label][_0x3dfbf1(0x187)]=VisuMZ[label][_0x3dfbf1(0x187)]||{},VisuMZ[_0x3dfbf1(0x1a3)]=function(_0x338eeb,_0x505b98){const _0x190867=_0x3dfbf1;for(const _0x1bfb5e in _0x505b98){if(_0x1bfb5e['match'](/(.*):(.*)/i)){const _0x1f95e9=String(RegExp['$1']),_0x5ca1ce=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x5bdb9d,_0x515be7,_0x4e43cb;switch(_0x5ca1ce){case _0x190867(0x1b3):_0x5bdb9d=_0x505b98[_0x1bfb5e]!==''?Number(_0x505b98[_0x1bfb5e]):0x0;break;case'ARRAYNUM':_0x515be7=_0x505b98[_0x1bfb5e]!==''?JSON['parse'](_0x505b98[_0x1bfb5e]):[],_0x5bdb9d=_0x515be7[_0x190867(0x1c0)](_0x9f873b=>Number(_0x9f873b));break;case _0x190867(0x170):_0x5bdb9d=_0x505b98[_0x1bfb5e]!==''?eval(_0x505b98[_0x1bfb5e]):null;break;case'ARRAYEVAL':_0x515be7=_0x505b98[_0x1bfb5e]!==''?JSON[_0x190867(0x1be)](_0x505b98[_0x1bfb5e]):[],_0x5bdb9d=_0x515be7[_0x190867(0x1c0)](_0x64ebfa=>eval(_0x64ebfa));break;case _0x190867(0x1ab):_0x5bdb9d=_0x505b98[_0x1bfb5e]!==''?JSON[_0x190867(0x1be)](_0x505b98[_0x1bfb5e]):'';break;case _0x190867(0x161):_0x515be7=_0x505b98[_0x1bfb5e]!==''?JSON[_0x190867(0x1be)](_0x505b98[_0x1bfb5e]):[],_0x5bdb9d=_0x515be7[_0x190867(0x1c0)](_0x11f550=>JSON[_0x190867(0x1be)](_0x11f550));break;case _0x190867(0x15b):_0x5bdb9d=_0x505b98[_0x1bfb5e]!==''?new Function(JSON[_0x190867(0x1be)](_0x505b98[_0x1bfb5e])):new Function(_0x190867(0x197));break;case _0x190867(0x194):_0x515be7=_0x505b98[_0x1bfb5e]!==''?JSON[_0x190867(0x1be)](_0x505b98[_0x1bfb5e]):[],_0x5bdb9d=_0x515be7[_0x190867(0x1c0)](_0x391246=>new Function(JSON['parse'](_0x391246)));break;case _0x190867(0x16e):_0x5bdb9d=_0x505b98[_0x1bfb5e]!==''?String(_0x505b98[_0x1bfb5e]):'';break;case _0x190867(0x184):_0x515be7=_0x505b98[_0x1bfb5e]!==''?JSON[_0x190867(0x1be)](_0x505b98[_0x1bfb5e]):[],_0x5bdb9d=_0x515be7[_0x190867(0x1c0)](_0x2f7e90=>String(_0x2f7e90));break;case _0x190867(0x18e):_0x4e43cb=_0x505b98[_0x1bfb5e]!==''?JSON[_0x190867(0x1be)](_0x505b98[_0x1bfb5e]):{},_0x5bdb9d=VisuMZ[_0x190867(0x1a3)]({},_0x4e43cb);break;case _0x190867(0x1b4):_0x515be7=_0x505b98[_0x1bfb5e]!==''?JSON['parse'](_0x505b98[_0x1bfb5e]):[],_0x5bdb9d=_0x515be7['map'](_0x3916de=>VisuMZ[_0x190867(0x1a3)]({},JSON['parse'](_0x3916de)));break;default:continue;}_0x338eeb[_0x1f95e9]=_0x5bdb9d;}}return _0x338eeb;},(_0x153f9a=>{const _0x5bd7a2=_0x3dfbf1,_0x465818=_0x153f9a[_0x5bd7a2(0x172)];for(const _0x1aed27 of dependencies){if(!Imported[_0x1aed27]){alert(_0x5bd7a2(0x1c2)[_0x5bd7a2(0x1c4)](_0x465818,_0x1aed27)),SceneManager[_0x5bd7a2(0x1a0)]();break;}}const _0x110ab5=_0x153f9a[_0x5bd7a2(0x16a)];if(_0x110ab5[_0x5bd7a2(0x164)](/\[Version[ ](.*?)\]/i)){const _0x5971a2=Number(RegExp['$1']);_0x5971a2!==VisuMZ[label][_0x5bd7a2(0x1bd)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x465818,_0x5971a2)),SceneManager[_0x5bd7a2(0x1a0)]());}if(_0x110ab5[_0x5bd7a2(0x164)](/\[Tier[ ](\d+)\]/i)){const _0x188398=Number(RegExp['$1']);_0x188398<tier?(alert(_0x5bd7a2(0x165)['format'](_0x465818,_0x188398,tier)),SceneManager['exit']()):tier=Math[_0x5bd7a2(0x163)](_0x188398,tier);}VisuMZ[_0x5bd7a2(0x1a3)](VisuMZ[label][_0x5bd7a2(0x187)],_0x153f9a[_0x5bd7a2(0x188)]);})(pluginData),VisuMZ[_0x3dfbf1(0x180)]['RegExp']={'LimitedUse':/<(?:LIMIT|LIMITED) (?:USE|USES):[ ](\d+)>/i,'UnlimitedUse':/<UNLIMITED (?:USE|USES)>/i,'RecoverVictory':/<(?:VICTORY|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverEscape':/<(?:ESCAPE|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverDefeat':/<(?:DEFEAT|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'BypassRecoverAll':/<BYPASS RECOVER ALL USES>/i,'AllowRecoverAll':/<ALLOW RECOVER ALL USES>/i,'UserGlobalLimitedUses':/<USER GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSTypeLimitedUses':/<USER STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSkillLimitedUses':/<USER SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetGlobalLimitedUses':/<TARGET GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSTypeLimitedUses':/<TARGET STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSkillLimitedUses':/<TARGET SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'GlobalLimitedUses':/<GLOBAL USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/i,'STypeLimitedUses':/<STYPE[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi,'SkillLimitedUses':/<SKILL[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi},DataManager[_0x3dfbf1(0x195)]=function(_0x2211de){const _0x292a8a=_0x3dfbf1;_0x2211de=_0x2211de['toUpperCase']()[_0x292a8a(0x1a7)](),this[_0x292a8a(0x1c9)]=this[_0x292a8a(0x1c9)]||{};if(this['_skillIDs'][_0x2211de])return this[_0x292a8a(0x1c9)][_0x2211de];for(const _0x393bb9 of $dataSkills){if(!_0x393bb9)continue;this['_skillIDs'][_0x393bb9['name'][_0x292a8a(0x17c)]()['trim']()]=_0x393bb9['id'];}return this['_skillIDs'][_0x2211de]||0x0;},DataManager[_0x3dfbf1(0x166)]=function(_0x146d8d){const _0x520752=_0x3dfbf1;_0x146d8d=_0x146d8d[_0x520752(0x17c)]()[_0x520752(0x1a7)](),this[_0x520752(0x1b7)]=this[_0x520752(0x1b7)]||{};if(this[_0x520752(0x1b7)][_0x146d8d])return this[_0x520752(0x1b7)][_0x146d8d];for(let _0x41270c=0x1;_0x41270c<0x64;_0x41270c++){if(!$dataSystem['skillTypes'][_0x41270c])continue;let _0x143dda=$dataSystem[_0x520752(0x1b6)][_0x41270c][_0x520752(0x17c)]()[_0x520752(0x1a7)]();_0x143dda=_0x143dda['replace'](/\x1I\[(\d+)\]/gi,''),_0x143dda=_0x143dda[_0x520752(0x1b1)](/\\I\[(\d+)\]/gi,''),this[_0x520752(0x1b7)][_0x143dda]=_0x41270c;}return this[_0x520752(0x1b7)][_0x146d8d]||0x0;},DataManager[_0x3dfbf1(0x181)]=function(_0x51bd1f){const _0xfbdcc2=_0x3dfbf1;if(!_0x51bd1f)return![];const _0x3a1fda=VisuMZ[_0xfbdcc2(0x180)][_0xfbdcc2(0x16c)],_0xb3abdc=_0x51bd1f[_0xfbdcc2(0x1ca)];if(_0xb3abdc['match'](_0x3a1fda[_0xfbdcc2(0x18f)]))return!![];else{if(_0xb3abdc['match'](_0x3a1fda['UnlimitedUse']))return![];}return Game_BattlerBase['LIMITED_SKILL_USE_ALL_LIMITED'];},DataManager[_0x3dfbf1(0x1c6)]=function(_0x27f224){const _0x470cea=_0x3dfbf1;if(!_0x27f224)return![];const _0x36f076=VisuMZ[_0x470cea(0x180)]['RegExp'],_0x4bef1b=_0x27f224['note'];if(Game_BattlerBase[_0x470cea(0x1a8)]){if(_0x4bef1b['match'](_0x36f076[_0x470cea(0x173)]))return![];return!![];}else{if(_0x4bef1b[_0x470cea(0x164)](_0x36f076['AllowRecoverAll']))return!![];return![];}},ImageManager[_0x3dfbf1(0x169)]=VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x187)]['General']['Icon'],TextManager[_0x3dfbf1(0x1b0)]=VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x187)][_0x3dfbf1(0x1b9)][_0x3dfbf1(0x1c7)],TextManager[_0x3dfbf1(0x1bf)]=VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x187)]['General']['EmptyFmt'],VisuMZ['LimitedSkillUses'][_0x3dfbf1(0x1b2)]=BattleManager['endBattle'],BattleManager['endBattle']=function(_0x2220b9){const _0x166a48=_0x3dfbf1;VisuMZ[_0x166a48(0x180)]['BattleManager_endBattle'][_0x166a48(0x1aa)](this,_0x2220b9),$gameParty[_0x166a48(0x1ae)](_0x2220b9);},VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x17e)]=Game_Action[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x189)],Game_Action['prototype'][_0x3dfbf1(0x189)]=function(_0x1d3ba8){const _0x109085=_0x3dfbf1;VisuMZ['LimitedSkillUses'][_0x109085(0x17e)]['call'](this,_0x1d3ba8),this[_0x109085(0x1d4)](_0x1d3ba8);},Game_Action[_0x3dfbf1(0x1d3)]['applyLimitedSkillUsesUserEffect']=function(_0x56864b){const _0x448fa5=_0x3dfbf1;if(!this[_0x448fa5(0x16d)]())return;const _0x234432=VisuMZ['LimitedSkillUses'][_0x448fa5(0x16c)];if(this[_0x448fa5(0x1a1)]()){const _0x6beb25=_0x234432[_0x448fa5(0x157)],_0x4e8447=_0x234432['UserSTypeLimitedUses'],_0x3e8b17=_0x234432[_0x448fa5(0x1d1)];this['subject']()[_0x448fa5(0x16b)](this[_0x448fa5(0x16d)](),_0x6beb25,_0x4e8447,_0x3e8b17);}if(_0x56864b){const _0x208e29=_0x234432[_0x448fa5(0x19e)],_0x14758b=_0x234432[_0x448fa5(0x159)],_0x1d09eb=_0x234432[_0x448fa5(0x19f)];_0x56864b['alterLimitedSkillUses'](this[_0x448fa5(0x16d)](),_0x208e29,_0x14758b,_0x1d09eb);}},VisuMZ['LimitedSkillUses'][_0x3dfbf1(0x1ba)]=Game_Action[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1a4)],Game_Action[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1a4)]=function(_0x4d70ac,_0x24ad14){const _0x5b4e8b=_0x3dfbf1,_0x2869f4=VisuMZ[_0x5b4e8b(0x180)][_0x5b4e8b(0x16c)],_0x33d262=this[_0x5b4e8b(0x16d)]()[_0x5b4e8b(0x1ca)],_0x182c68=[_0x5b4e8b(0x157),_0x5b4e8b(0x19b),_0x5b4e8b(0x1d1),_0x5b4e8b(0x19e),'TargetSTypeLimitedUses',_0x5b4e8b(0x19f)];for(const _0x2f5e1e of _0x182c68){if(_0x33d262[_0x5b4e8b(0x164)](_0x2869f4[_0x2f5e1e]))return!![];}return VisuMZ[_0x5b4e8b(0x180)][_0x5b4e8b(0x1ba)][_0x5b4e8b(0x1aa)](this,_0x4d70ac,_0x24ad14);},Game_BattlerBase[_0x3dfbf1(0x1ce)]=VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x187)][_0x3dfbf1(0x18b)][_0x3dfbf1(0x198)],Game_BattlerBase['LIMITED_SKILL_USE_BASE']=VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x187)][_0x3dfbf1(0x18b)]['DefaultMax'],Game_BattlerBase[_0x3dfbf1(0x176)]=VisuMZ['LimitedSkillUses']['Settings']['Mechanics'][_0x3dfbf1(0x17a)],Game_BattlerBase[_0x3dfbf1(0x1cb)]=VisuMZ[_0x3dfbf1(0x180)]['Settings'][_0x3dfbf1(0x18b)]['Minimum'],Game_BattlerBase[_0x3dfbf1(0x1a8)]=VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x187)][_0x3dfbf1(0x18b)][_0x3dfbf1(0x174)],VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x18d)]=Game_BattlerBase['prototype'][_0x3dfbf1(0x190)],Game_BattlerBase['prototype'][_0x3dfbf1(0x190)]=function(_0xaa589c){const _0x2726f7=_0x3dfbf1;if(DataManager[_0x2726f7(0x181)](_0xaa589c)&&!this[_0x2726f7(0x18c)](_0xaa589c)){const _0x586c40=this[_0x2726f7(0x18a)](_0xaa589c['id']),_0x5304a2=this[_0x2726f7(0x15a)](_0xaa589c['id']);if(_0x5304a2>=_0x586c40)return![];}return VisuMZ[_0x2726f7(0x180)][_0x2726f7(0x18d)][_0x2726f7(0x1aa)](this,_0xaa589c);},Game_BattlerBase[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x18c)]=function(_0x160362){const _0x3de5bc=_0x3dfbf1;if(!_0x160362)return![];return _0x160362['id']===this[_0x3de5bc(0x1bc)]()||_0x160362['id']===this[_0x3de5bc(0x178)]();},VisuMZ['LimitedSkillUses'][_0x3dfbf1(0x15c)]=Game_BattlerBase[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1a9)],Game_BattlerBase[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1a9)]=function(){const _0x4ca77c=_0x3dfbf1;this[_0x4ca77c(0x15d)]={},VisuMZ[_0x4ca77c(0x180)][_0x4ca77c(0x15c)][_0x4ca77c(0x1aa)](this);},VisuMZ['LimitedSkillUses']['Game_BattlerBase_paySkillCost']=Game_BattlerBase['prototype'][_0x3dfbf1(0x1cd)],Game_BattlerBase[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1cd)]=function(_0x22c47e){const _0x342594=_0x3dfbf1;VisuMZ[_0x342594(0x180)]['Game_BattlerBase_paySkillCost'][_0x342594(0x1aa)](this,_0x22c47e),DataManager['isSkillLimitedUse'](_0x22c47e)&&!this['isAttackOrGuardSkill'](_0x22c47e)&&this[_0x342594(0x160)](_0x22c47e['id'],0x1);},Game_BattlerBase[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x18a)]=function(_0x3bc84a){const _0x569e75=_0x3dfbf1;this['_cache_SkillLimitedUseMax']=this[_0x569e75(0x15d)]||{};if(this[_0x569e75(0x15d)][_0x3bc84a])return this[_0x569e75(0x15d)][_0x3bc84a];return this[_0x569e75(0x15d)][_0x3bc84a]=this['calcSkillLimitedUseMax'](_0x3bc84a),this[_0x569e75(0x15d)][_0x3bc84a];},Game_BattlerBase[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1b5)]=function(_0x188db1){const _0x18dc78=_0x3dfbf1,_0x2a8240=$dataSkills[_0x188db1];if(!_0x2a8240)return 0x0;const _0x1fff9b=VisuMZ[_0x18dc78(0x180)]['RegExp'],_0x58b82e=_0x2a8240[_0x18dc78(0x1ca)];let _0x2c28cd=Game_BattlerBase[_0x18dc78(0x177)];_0x58b82e[_0x18dc78(0x164)](_0x1fff9b['LimitedUse'])&&(_0x2c28cd=Number(RegExp['$1']));const _0x6fc0f1=this[_0x18dc78(0x1c3)]();for(const _0x541df9 of _0x6fc0f1){if(!_0x541df9)continue;_0x541df9[_0x18dc78(0x1ca)]['match'](_0x1fff9b[_0x18dc78(0x17f)])&&(_0x2c28cd+=Number(RegExp['$1']));const _0x210539=_0x541df9[_0x18dc78(0x1ca)][_0x18dc78(0x164)](_0x1fff9b['STypeLimitedUses']);if(_0x210539)for(const _0x2a2c38 of _0x210539){if(!_0x2a2c38)continue;_0x2a2c38[_0x18dc78(0x164)](_0x1fff9b[_0x18dc78(0x1ac)]);let _0x17aad0=String(RegExp['$1']);const _0x59c660=Number(RegExp['$2']);_0x17aad0=(String(_0x17aad0)||'')[_0x18dc78(0x1a7)]();const _0x389cdd=/^\d+$/[_0x18dc78(0x186)](_0x17aad0),_0x2c9dbb=_0x389cdd?Number(_0x17aad0):DataManager['getStypeIdWithName'](_0x17aad0);if(_0x2c9dbb===_0x2a8240['stypeId'])_0x2c28cd+=_0x59c660;}const _0x12c9f0=_0x541df9[_0x18dc78(0x1ca)]['match'](_0x1fff9b[_0x18dc78(0x16f)]);if(_0x12c9f0)for(const _0x10eee2 of _0x12c9f0){if(!_0x10eee2)continue;_0x10eee2['match'](_0x1fff9b[_0x18dc78(0x16f)]);let _0x288827=String(RegExp['$1']);const _0x34ac5a=Number(RegExp['$2']);_0x288827=(String(_0x288827)||'')[_0x18dc78(0x1a7)]();const _0x2fad33=/^\d+$/['test'](_0x288827),_0x1ec17d=_0x2fad33?Number(_0x288827):DataManager['getSkillIdWithName'](_0x288827);if(_0x1ec17d===_0x188db1)_0x2c28cd+=_0x34ac5a;}}_0x2c28cd=_0x2c28cd||0x0;const _0x17ec9c=Game_BattlerBase[_0x18dc78(0x1cb)],_0x58ddab=Game_BattlerBase[_0x18dc78(0x176)];return _0x2c28cd['clamp'](_0x17ec9c,_0x58ddab);},Game_BattlerBase['prototype'][_0x3dfbf1(0x15a)]=function(_0x43fa00){const _0x42e897=_0x3dfbf1,_0x37ebfa=this[_0x42e897(0x18a)](_0x43fa00);this['_skillLimitedUseTimes']=this[_0x42e897(0x183)]||{};if(this[_0x42e897(0x183)][_0x43fa00])return this[_0x42e897(0x183)][_0x43fa00];return this['_skillLimitedUseTimes'][_0x43fa00]=0x0,Math[_0x42e897(0x163)](0x0,this['_skillLimitedUseTimes'][_0x43fa00]);},Game_BattlerBase[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x160)]=function(_0x20718a,_0x285ee3){const _0x16a099=_0x3dfbf1;_0x285ee3=_0x285ee3||0x0,this[_0x16a099(0x183)]=this['_skillLimitedUseTimes']||{},this[_0x16a099(0x183)][_0x20718a]=this[_0x16a099(0x183)][_0x20718a]||0x0,this[_0x16a099(0x183)][_0x20718a]+=_0x285ee3,this['_skillLimitedUseTimes'][_0x20718a]=Math[_0x16a099(0x163)](0x0,this['_skillLimitedUseTimes'][_0x20718a]);},Game_BattlerBase[_0x3dfbf1(0x1d3)]['setSkillLimitedUseTimes']=function(_0x5d4ef1,_0xe10363){const _0x57577a=_0x3dfbf1;_0xe10363=_0xe10363||0x0,this[_0x57577a(0x183)]=this[_0x57577a(0x183)]||{},this['_skillLimitedUseTimes'][_0x5d4ef1]=this[_0x57577a(0x183)][_0x5d4ef1]||0x0,this[_0x57577a(0x183)][_0x5d4ef1]=_0xe10363,this[_0x57577a(0x183)][_0x5d4ef1]=Math[_0x57577a(0x163)](0x0,this[_0x57577a(0x183)][_0x5d4ef1]);},VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x193)]=Game_BattlerBase[_0x3dfbf1(0x1d3)]['recoverAll'],Game_BattlerBase[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x175)]=function(){const _0xaed60c=_0x3dfbf1;VisuMZ['LimitedSkillUses'][_0xaed60c(0x193)][_0xaed60c(0x1aa)](this),this[_0xaed60c(0x1a5)]();},Game_BattlerBase[_0x3dfbf1(0x1d3)]['recoverAllLimitedSkillUses']=function(){const _0x76fab=_0x3dfbf1;this[_0x76fab(0x183)]=this[_0x76fab(0x183)]||{};for(const _0x28cd88 in this[_0x76fab(0x183)]){if(!this[_0x76fab(0x183)][_0x28cd88])continue;const _0x6703e2=Number(_0x28cd88)||0x0,_0x2f3a46=$dataSkills[_0x6703e2];if(!_0x2f3a46)continue;DataManager[_0x76fab(0x1c6)](_0x2f3a46)&&this[_0x76fab(0x171)](_0x6703e2,0x0);}},Game_Battler[_0x3dfbf1(0x17b)]={'victory':VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x187)][_0x3dfbf1(0x18b)][_0x3dfbf1(0x162)],'escape':VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x187)]['Mechanics'][_0x3dfbf1(0x1cc)],'defeat':VisuMZ['LimitedSkillUses'][_0x3dfbf1(0x187)][_0x3dfbf1(0x18b)]['BattleDefeat']},Game_Battler[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1cf)]=function(_0x477f10){const _0x53243c=_0x3dfbf1;for(const _0x54c73f of this[_0x53243c(0x196)]()){this[_0x53243c(0x1d2)](_0x54c73f,_0x477f10);}},Game_Battler['prototype'][_0x3dfbf1(0x1d2)]=function(_0x4485b4,_0x9a148b){const _0x26e3be=_0x3dfbf1;if(!_0x4485b4)return;if(!DataManager['isSkillLimitedUse'](_0x4485b4))return;const _0x377093=VisuMZ[_0x26e3be(0x180)][_0x26e3be(0x16c)],_0x16cfc0=_0x4485b4[_0x26e3be(0x1ca)];let _0xc7946d=0x0;if(_0x9a148b===0x0)_0x16cfc0[_0x26e3be(0x164)](_0x377093[_0x26e3be(0x1c8)])?_0xc7946d=Number(RegExp['$1']):_0xc7946d=Game_Battler[_0x26e3be(0x17b)][_0x26e3be(0x17d)];else _0x9a148b===0x1?_0x16cfc0[_0x26e3be(0x164)](_0x377093[_0x26e3be(0x1d5)])?_0xc7946d=Number(RegExp['$1']):_0xc7946d=Game_Battler[_0x26e3be(0x17b)][_0x26e3be(0x1a6)]:_0x16cfc0[_0x26e3be(0x164)](_0x377093[_0x26e3be(0x19d)])?_0xc7946d=Number(RegExp['$1']):_0xc7946d=Game_Battler[_0x26e3be(0x17b)][_0x26e3be(0x182)];this[_0x26e3be(0x160)](_0x4485b4['id'],-_0xc7946d);},Game_Battler[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x16b)]=function(_0x36ca37,_0x7d2449,_0x5e5c50,_0x3e752e){const _0x30c1c3=_0x3dfbf1;for(const _0x308dae of this['skills']()){if(!_0x308dae)continue;if(!DataManager[_0x30c1c3(0x181)](_0x308dae))continue;if(this[_0x30c1c3(0x18c)](_0x308dae))continue;const _0x3c36c4=_0x36ca37[_0x30c1c3(0x1ca)];let _0x3740b7=0x0;_0x3c36c4[_0x30c1c3(0x164)](_0x7d2449)&&(_0x3740b7+=Number(RegExp['$1'])||0x0);const _0x10b8dd=_0x3c36c4[_0x30c1c3(0x164)](_0x5e5c50);if(_0x10b8dd)for(const _0x21b8cb of _0x10b8dd){if(!_0x21b8cb)continue;_0x21b8cb['match'](_0x5e5c50);let _0x37cdb7=String(RegExp['$1']);const _0x334a65=Number(RegExp['$2']);_0x37cdb7=(String(_0x37cdb7)||'')[_0x30c1c3(0x1a7)]();const _0x3f7ab0=/^\d+$/[_0x30c1c3(0x186)](_0x37cdb7),_0x166720=_0x3f7ab0?Number(_0x37cdb7):DataManager[_0x30c1c3(0x166)](_0x37cdb7),_0x26f857=DataManager['getSkillTypes'](_0x308dae)||[_0x308dae['stypeId']];if(_0x26f857[_0x30c1c3(0x19c)](_0x166720))_0x3740b7+=_0x334a65;}const _0x144152=_0x3c36c4[_0x30c1c3(0x164)](_0x3e752e);if(_0x144152)for(const _0x2f1aa5 of _0x144152){if(!_0x2f1aa5)continue;_0x2f1aa5[_0x30c1c3(0x164)](_0x3e752e);let _0x2bd0ba=String(RegExp['$1']);const _0x11c594=Number(RegExp['$2']);_0x2bd0ba=(String(_0x2bd0ba)||'')[_0x30c1c3(0x1a7)]();const _0x5f5b52=/^\d+$/[_0x30c1c3(0x186)](_0x2bd0ba),_0x4d2bed=_0x5f5b52?Number(_0x2bd0ba):DataManager[_0x30c1c3(0x195)](_0x2bd0ba);if(_0x4d2bed===_0x308dae['id'])_0x3740b7+=_0x11c594;}this[_0x30c1c3(0x160)](_0x308dae['id'],-_0x3740b7);}},Game_Party[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1ae)]=function(_0x58d244){const _0x206d83=_0x3dfbf1,_0x48c38a=this[_0x206d83(0x15e)];this[_0x206d83(0x15e)]=![];for(const _0x296642 of this[_0x206d83(0x158)]()){if(!_0x296642)continue;_0x296642[_0x206d83(0x1cf)](_0x58d244);}this[_0x206d83(0x15e)]=_0x48c38a;},VisuMZ[_0x3dfbf1(0x180)][_0x3dfbf1(0x15f)]=Window_Base[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1a2)],Window_Base[_0x3dfbf1(0x1d3)][_0x3dfbf1(0x1a2)]=function(_0x368d98,_0xda8c7a,_0x1d0466){const _0x47c9dc=_0x3dfbf1;return _0x1d0466=VisuMZ[_0x47c9dc(0x180)][_0x47c9dc(0x15f)][_0x47c9dc(0x1aa)](this,_0x368d98,_0xda8c7a,_0x1d0466),_0x1d0466=this[_0x47c9dc(0x168)](_0x368d98,_0xda8c7a,_0x1d0466),_0x1d0466;},Window_Base[_0x3dfbf1(0x1d3)]['makeAdditionalCostTextLimitedSkillUses']=function(_0x57e0c8,_0x448b56,_0x3d0a59){const _0x30869a=_0x3dfbf1;if(!_0x57e0c8)return _0x3d0a59;if(!_0x448b56)return _0x3d0a59;if(!DataManager[_0x30869a(0x181)](_0x448b56))return _0x3d0a59;if(_0x57e0c8[_0x30869a(0x18c)](_0x448b56))return _0x3d0a59;const _0x3d85a4=VisuMZ[_0x30869a(0x180)][_0x30869a(0x187)]['General'][_0x30869a(0x185)],_0x3a2e99=_0x57e0c8['skillLimitedUseMax'](_0x448b56['id']),_0x2bf3e7=_0x57e0c8['skillLimitedUseTimes'](_0x448b56['id']),_0x152e90=Math[_0x30869a(0x163)](0x0,_0x3a2e99-_0x2bf3e7),_0x3b4c8c=_0x30869a(0x191)[_0x30869a(0x1c4)](ImageManager[_0x30869a(0x169)]),_0x24217a=_0x152e90>0x0?TextManager['limitedUseFmt']:TextManager[_0x30869a(0x1bf)];let _0x5adc6c=_0x24217a[_0x30869a(0x1c4)](_0x152e90,_0x3a2e99,_0x2bf3e7,_0x3b4c8c);if(_0x3d0a59==='')_0x3d0a59+=_0x5adc6c;else _0x3d85a4?_0x3d0a59=_0x5adc6c+this[_0x30869a(0x1c1)]()+_0x3d0a59:_0x3d0a59=_0x3d0a59+this['skillCostSeparator']()+_0x5adc6c;return _0x3d0a59;};
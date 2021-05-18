//=============================================================================
// VisuStella MZ - State Tooltips
// VisuMZ_3_StateTooltips.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StateTooltips = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StateTooltips = VisuMZ.StateTooltips || {};
VisuMZ.StateTooltips.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.00] [StateTooltips]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/State_Tooltips_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_MessageCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a tooltip window in battle (and other scenes) whenever the
 * player's mouse cursor is hovered over specific areas of the screen. The
 * tooltip window will display a list of the states, buffs, and debuffs the
 * hovered battler has along with a description of the entities and their
 * remaining duration.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Tooltip window displays when hovering over battlers and specific windows
 *   to display their states, buffs, and debuffs.
 * * Adjust the text format in which information is displayed inside the
 *   tooltip window.
 * * Modify the descriptions for states, buffs, and debuffs to your liking.
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
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_MessageCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_2_PartySystem
 * 
 * VisuMZ_2_ClassChangeSystem
 *
 * These plugins have scenes that also support tooltips if this plugin is also
 * installed while those are active in your game's project.
 *
 * ---
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
 * === Description-Related Notetags ===
 * 
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: State Notetags
 * - Assigns a help description for the state.
 * - Replace 'text' with text you want displayed for the tooltip window.
 * - This best works with one line.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the plugin's Plugin Parameters.
 * - Insert %1 into the help description to show any data that would otherwise
 *   be shown as the state display, such as Absorption Barrier count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * General settings for the State Tooltips Window.
 *
 * ---
 *
 * Appearance
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * Vocabulary settings for the State Tooltips Window.
 *
 * ---
 *
 * General
 * 
 *   Default Description:
 *   - This is the default description that appears for a state without a
 *     declared description. %1 - State's Name
 *   - Can use text codes.
 *
 * ---
 *
 * Entries
 * 
 *   State Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Description, %4 - Duration, %5 - State Color
 * 
 *   Buff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Buff Color
 * 
 *   Debuff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * 
 *   Replace Whites?:
 *   - If state, buff, debuff names are white, replace them?
 * 
 *     Replacement Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Action End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Turn End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Passive Text:
 *   - Can use text codes.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Choose which windows to enable tooltip support for.
 *
 * ---
 *
 * Settings
 * 
 *   Window_BattleStatus:
 *   Window_ClassStatus:
 *   Window_EquipStatus:
 *   Window_MenuActor:
 *   Window_MenuStatus:
 *   Window_PartyStatus:
 *   Window_SkillStatus:
 *   Window_Status:
 *   - Enable State Tooltips for this window?
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
 * Version 1.00 Official Release Date: February 24, 2021
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
 * @param StateTooltips
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc General settings for the State Tooltips Window.
 * @default {"Appearance":"","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+0","OffsetY:num":"+0"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc Vocabulary settings for the State Tooltips Window.
 * @default {"General":"","HelpDescription:json":"\"-\"","Entries":"","StateFmt:str":"\\C[%5]%1%2:\\C[0] %3 %4","BuffFmt:str":"\\C[%5]%1%2:\\C[0] Increases unit's %2 to \\C[%5]%3%\\C[0] %4","DebuffFmt:str":"\\C[%5]%1%2:\\C[0] Decreases unit's %2 to \\C[%5]%3%\\C[0] %4","ReplaceWhite:eval":"true","WhiteReplaceColor:str":"5","Turns":"","ActionsFmt:str":"\\C[6](Actions \\C[%2]%1\\C[6])\\C[0]","TurnsFmt:str":"\\C[5](Turns \\C[%2]%1\\C[5])\\C[0]","PassiveText:str":"\\C[4](Passive)\\C[0]"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Choose which windows to enable tooltip support for.
 * @default {"Window_BattleStatus:eval":"true","Window_ClassStatus:eval":"true","Window_EquipStatus:eval":"true","Window_MenuActor:eval":"true","Window_MenuStatus:eval":"true","Window_PartyStatus:eval":"true","Window_SkillStatus:eval":"true","Window_Status:eval":"true"}
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
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Vocab Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param HelpDescription:json
 * @text Default Description
 * @parent General
 * @type note
 * @desc This is the default description that appears for a state
 * without a declared description. %1 - State's Name
 * @default "-"
 * 
 * @param Entries
 *
 * @param StateFmt:str
 * @text State Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Description, %4 - Duration, %5 - State Color
 * @default \C[%5]%1%2:\C[0] %3 %4
 *
 * @param BuffFmt:str
 * @text Buff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Buff Color
 * @default \C[%5]%1%2:\C[0] Increases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param DebuffFmt:str
 * @text Debuff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * @default \C[%5]%1%2:\C[0] Decreases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param ReplaceWhite:eval
 * @text Replace Whites?
 * @parent Entries
 * @type boolean
 * @on Replace
 * @off Don't Replace
 * @desc If state, buff, debuff names are white, replace them?
 * @default true
 *
 * @param WhiteReplaceColor:str
 * @text Replacement Color
 * @parent ReplaceWhite:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 5
 * 
 * @param Turns
 * @text Turns Remaining
 *
 * @param ActionsFmt:str
 * @text Action End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[6](Actions \C[%2]%1\C[6])\C[0]
 *
 * @param TurnsFmt:str
 * @text Turn End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[5](Turns \C[%2]%1\C[5])\C[0]
 *
 * @param PassiveText:str
 * @text Passive Text
 * @parent Turns
 * @desc Can use text codes.
 * @default \C[4](Passive)\C[0]
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_BattleStatus:eval
 * @text Window_BattleStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_ClassStatus:eval
 * @text Window_ClassStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_EquipStatus:eval
 * @text Window_EquipStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuActor:eval
 * @text Window_MenuActor
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuStatus:eval
 * @text Window_MenuStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_PartyStatus:eval
 * @text Window_PartyStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_SkillStatus:eval
 * @text Window_SkillStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_Status:eval
 * @text Window_Status
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 */
//=============================================================================

const _0x2a52=['%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','317smkmlH','parse','167riBcLo','NUM','refresh','push','STR','WINDOW_SCALE','createWindowLayer','Parse_Notetags_Description','ARRAYSTR','HEXCOLOR','hide','clear','show','_actorCommandWindow','visible','createContents','ARRAYNUM','updateDeath','Sprite_Clickable_onMouseExit','REPLACE_WHITE','isOpen','BUFF_FMT','includes','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','toUpperCase','call','autoRemovalTiming','setupStateTurnText','active','contains','\x5cI[%1]','ActionsFmt','clampPosition','MOUSE_OFFSET_Y','Tooltip','requestRefresh','_buffs','onMouseEnter','ConvertParams','ACTIONS_FMT','hitIndex','isStateTooltipTouched','trim','982566kzKFTD','addChild','name','_stateTooltipWindow','isStateTooltipHovered','applyInverse','ParseAllNotetags','actor','83MElODM','setBattler','getColor','iconIndex','78530hqkmTl','battler','resizeWindow','onMouseEnterStateTooltips','_requestRefresh','HelpDescription','targetOpacity','onMouseExit','DEBUFF_FMT','param','onMouseExitStateTooltips','touchX','EVAL','StateFmt','TURNS_FMT','VisuMZ_2_PartySystem','replaceHexColors','1543gilkGI','VisuMZ_1_BattleCore','process_VisuMZ_StateTooltips','resetFontSettings','stateTurns','isMouseHovered','_scene','status','constructor','Sprite_Battler_onMouseEnter','format','processTouchStateTooltips','isBuffAffected','loadSystem','NONWHITE_COLOR','ARRAYSTRUCT','1455gSjuZu','drawing','hitTest','replace','floor','Settings','backOpacity','TurnsFmt','ARRAYJSON','height','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','StateTooltips','buffIconIndex','length','Sprite_Clickable_onMouseEnter','updatePosition','states','debuffColor','worldTransform','1298nLXucz','setupStateText','ParseStateNotetags','Vocab','_battler','MOUSE_OFFSET_X','isSceneBattle','isColorLocked','padding','JSON','initialize','VisuMZ_2_ClassChangeSystem','openTouchStateTooltips','obtainEscapeString','isDead','parameters','#%1','prototype','getStateDisplay','isStateTooltipEnabled','currentTooltipBattler','_actor','STATE_FMT','WINDOW_SKIN_OPACITY','_text','processEscapeCharacter','buffColor','baseTextRect','createStateTooltipWindow','_itemWindow','setupBuffText','map','return\x200','isBuffOrDebuffAffected','stateColor','max','exit','Window','ffffff','touchY','width','open','onDatabaseLoaded','WindowSkin','RegExp','clamp','WhiteReplaceColor','Scene_Base_createWindowLayer','match','OffsetY','203351aJFijw','closeTouchStateTooltips','ReplaceWhite','ARRAYEVAL','Window_Selectable_processTouch','_skillWindow','windowskin','Scene_Boot_onDatabaseLoaded','setStateTooltipBattler','round','processTouch','itemPadding','opacity','WindowOpacity','STRUCT','updateBackOpacity','paramBuffRate','changeTextColor','update','setupBuffTurnText','_cache_StateTooltips','scale','setupText','description','getStateTooltipBattler','refreshStateTooltipBattler','drawTextEx','PASSIVE_TEXT','109842jbbyWT','loadWindowskin'];const _0x4608=function(_0x7df1f4,_0x5cb14f){_0x7df1f4=_0x7df1f4-0x81;let _0x2a52ab=_0x2a52[_0x7df1f4];return _0x2a52ab;};const _0x5201fe=_0x4608;(function(_0x2da086,_0x4ee669){const _0x139c22=_0x4608;while(!![]){try{const _0x15f6f2=-parseInt(_0x139c22(0x8d))*-parseInt(_0x139c22(0x103))+-parseInt(_0x139c22(0xe2))+parseInt(_0x139c22(0xfe))+parseInt(_0x139c22(0x12e))+parseInt(_0x139c22(0x101))*-parseInt(_0x139c22(0x9d))+-parseInt(_0x139c22(0x13a))+parseInt(_0x139c22(0x136))*-parseInt(_0x139c22(0xb0));if(_0x15f6f2===_0x4ee669)break;else _0x2da086['push'](_0x2da086['shift']());}catch(_0x2a9520){_0x2da086['push'](_0x2da086['shift']());}}}(_0x2a52,0x79e27));var label=_0x5201fe(0xa8),tier=tier||0x0,dependencies=[_0x5201fe(0x8e)],pluginData=$plugins['filter'](function(_0x578913){const _0xad9162=_0x5201fe;return _0x578913[_0xad9162(0x94)]&&_0x578913[_0xad9162(0xf9)][_0xad9162(0x119)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5201fe(0xa2)]||{},VisuMZ['ConvertParams']=function(_0x2d6b80,_0x510360){const _0x1797cc=_0x5201fe;for(const _0x2c62d5 in _0x510360){if(_0x2c62d5[_0x1797cc(0xe0)](/(.*):(.*)/i)){const _0x5ccf0d=String(RegExp['$1']),_0x4781b5=String(RegExp['$2'])[_0x1797cc(0x11b)]()[_0x1797cc(0x12d)]();let _0x2530b1,_0x58f46b,_0x2851ad;switch(_0x4781b5){case _0x1797cc(0x104):_0x2530b1=_0x510360[_0x2c62d5]!==''?Number(_0x510360[_0x2c62d5]):0x0;break;case _0x1797cc(0x113):_0x58f46b=_0x510360[_0x2c62d5]!==''?JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5]):[],_0x2530b1=_0x58f46b[_0x1797cc(0xcf)](_0x25810c=>Number(_0x25810c));break;case _0x1797cc(0x88):_0x2530b1=_0x510360[_0x2c62d5]!==''?eval(_0x510360[_0x2c62d5]):null;break;case _0x1797cc(0xe5):_0x58f46b=_0x510360[_0x2c62d5]!==''?JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5]):[],_0x2530b1=_0x58f46b[_0x1797cc(0xcf)](_0x53f96b=>eval(_0x53f96b));break;case _0x1797cc(0xb9):_0x2530b1=_0x510360[_0x2c62d5]!==''?JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5]):'';break;case _0x1797cc(0xa5):_0x58f46b=_0x510360[_0x2c62d5]!==''?JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5]):[],_0x2530b1=_0x58f46b[_0x1797cc(0xcf)](_0x300e10=>JSON[_0x1797cc(0x102)](_0x300e10));break;case'FUNC':_0x2530b1=_0x510360[_0x2c62d5]!==''?new Function(JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5])):new Function(_0x1797cc(0xd0));break;case'ARRAYFUNC':_0x58f46b=_0x510360[_0x2c62d5]!==''?JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5]):[],_0x2530b1=_0x58f46b[_0x1797cc(0xcf)](_0x2172de=>new Function(JSON[_0x1797cc(0x102)](_0x2172de)));break;case _0x1797cc(0x107):_0x2530b1=_0x510360[_0x2c62d5]!==''?String(_0x510360[_0x2c62d5]):'';break;case _0x1797cc(0x10b):_0x58f46b=_0x510360[_0x2c62d5]!==''?JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5]):[],_0x2530b1=_0x58f46b[_0x1797cc(0xcf)](_0x217021=>String(_0x217021));break;case _0x1797cc(0xf0):_0x2851ad=_0x510360[_0x2c62d5]!==''?JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5]):{},_0x2530b1=VisuMZ['ConvertParams']({},_0x2851ad);break;case _0x1797cc(0x9c):_0x58f46b=_0x510360[_0x2c62d5]!==''?JSON[_0x1797cc(0x102)](_0x510360[_0x2c62d5]):[],_0x2530b1=_0x58f46b[_0x1797cc(0xcf)](_0x404ab6=>VisuMZ['ConvertParams']({},JSON['parse'](_0x404ab6)));break;default:continue;}_0x2d6b80[_0x5ccf0d]=_0x2530b1;}}return _0x2d6b80;},(_0x3c8866=>{const _0x242ef2=_0x5201fe,_0x20bde8=_0x3c8866['name'];for(const _0x394c07 of dependencies){if(!Imported[_0x394c07]){alert(_0x242ef2(0xa7)['format'](_0x20bde8,_0x394c07)),SceneManager[_0x242ef2(0xd4)]();break;}}const _0x41a413=_0x3c8866['description'];if(_0x41a413[_0x242ef2(0xe0)](/\[Version[ ](.*?)\]/i)){const _0x4a9c63=Number(RegExp['$1']);_0x4a9c63!==VisuMZ[label]['version']&&(alert(_0x242ef2(0x11a)[_0x242ef2(0x97)](_0x20bde8,_0x4a9c63)),SceneManager[_0x242ef2(0xd4)]());}if(_0x41a413[_0x242ef2(0xe0)](/\[Tier[ ](\d+)\]/i)){const _0x24f72a=Number(RegExp['$1']);_0x24f72a<tier?(alert(_0x242ef2(0x100)['format'](_0x20bde8,_0x24f72a,tier)),SceneManager[_0x242ef2(0xd4)]()):tier=Math[_0x242ef2(0xd3)](_0x24f72a,tier);}VisuMZ[_0x242ef2(0x129)](VisuMZ[label][_0x242ef2(0xa2)],_0x3c8866[_0x242ef2(0xbf)]);})(pluginData),VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xdc)]={'HelpDescription':/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i},VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xe9)]=Scene_Boot['prototype'][_0x5201fe(0xda)],Scene_Boot[_0x5201fe(0xc1)][_0x5201fe(0xda)]=function(){const _0x449c56=_0x5201fe;VisuMZ[_0x449c56(0xa8)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_StateTooltips']();},Scene_Boot[_0x5201fe(0xc1)][_0x5201fe(0x8f)]=function(){this['process_VisuMZ_StateTooltips_Notetags']();},Scene_Boot['prototype']['process_VisuMZ_StateTooltips_Notetags']=function(){const _0x455856=_0x5201fe;if(VisuMZ[_0x455856(0x134)])return;for(const _0x4df8a0 of $dataStates){if(!_0x4df8a0)continue;VisuMZ[_0x455856(0xa8)]['Parse_Notetags_Description'](_0x4df8a0);}},VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xb2)]=VisuMZ[_0x5201fe(0xb2)],VisuMZ[_0x5201fe(0xb2)]=function(_0xc79201){const _0x1a75c3=_0x5201fe;VisuMZ[_0x1a75c3(0xa8)][_0x1a75c3(0xb2)][_0x1a75c3(0x11c)](this,_0xc79201),VisuMZ[_0x1a75c3(0xa8)][_0x1a75c3(0x10a)](_0xc79201);},VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0x10a)]=function(_0x148cb8){const _0x1d4959=_0x5201fe;_0x148cb8[_0x1d4959(0xf9)]=VisuMZ[_0x1d4959(0xa8)]['Settings'][_0x1d4959(0xb3)][_0x1d4959(0x81)];const _0xee2515=VisuMZ[_0x1d4959(0xa8)][_0x1d4959(0xdc)],_0x560be9=_0x148cb8['note'];_0x560be9[_0x1d4959(0xe0)](_0xee2515['HelpDescription'])&&(_0x148cb8[_0x1d4959(0xf9)]=String(RegExp['$1'])['trim']());},ColorManager[_0x5201fe(0x138)]=function(_0xaacf0e){const _0x54d189=_0x5201fe;return _0xaacf0e=String(_0xaacf0e),_0xaacf0e[_0x54d189(0xe0)](/#(.*)/i)?_0x54d189(0xc0)[_0x54d189(0x97)](String(RegExp['$1'])):this['textColor'](Number(_0xaacf0e));},SceneManager[_0x5201fe(0xb6)]=function(){const _0x31993b=_0x5201fe;return this[_0x31993b(0x93)]&&this[_0x31993b(0x93)][_0x31993b(0x95)]===Scene_Battle;},SceneManager['currentTooltipBattler']=function(){const _0x469cbe=_0x5201fe,_0x385687=SceneManager[_0x469cbe(0x93)][_0x469cbe(0x131)];if(!_0x385687)return null;return _0x385687[_0x469cbe(0xb4)];},SceneManager[_0x5201fe(0xea)]=function(_0x1a73c6){const _0x24ed67=_0x5201fe;if(_0x1a73c6&&!_0x1a73c6['isAppeared']())return;if(_0x1a73c6&&_0x1a73c6[_0x24ed67(0xbe)]())return;const _0x4fef19=SceneManager[_0x24ed67(0x93)][_0x24ed67(0x131)];if(!_0x4fef19)return;_0x4fef19[_0x24ed67(0x137)](_0x1a73c6);},SceneManager[_0x5201fe(0xfb)]=function(_0x38050c){const _0x18fd5f=_0x5201fe;if(_0x38050c&&!_0x38050c['isAppeared']())return;const _0x367def=SceneManager[_0x18fd5f(0x93)]['_stateTooltipWindow'];if(!_0x367def)return;if(_0x367def[_0x18fd5f(0xb4)]!==_0x38050c)return;_0x367def[_0x18fd5f(0x126)]();},VisuMZ['StateTooltips']['Game_Battler_refresh']=Game_Battler['prototype']['refresh'],Game_Battler['prototype'][_0x5201fe(0x105)]=function(){const _0x434108=_0x5201fe;VisuMZ[_0x434108(0xa8)]['Game_Battler_refresh'][_0x434108(0x11c)](this),SceneManager[_0x434108(0xfb)](this);},VisuMZ[_0x5201fe(0xa8)]['Scene_Base_createWindowLayer']=Scene_Base['prototype'][_0x5201fe(0x109)],Scene_Base[_0x5201fe(0xc1)][_0x5201fe(0x109)]=function(){const _0x2a63b5=_0x5201fe;VisuMZ[_0x2a63b5(0xa8)][_0x2a63b5(0xdf)][_0x2a63b5(0x11c)](this),this[_0x2a63b5(0xcc)]();},Scene_Base[_0x5201fe(0xc1)][_0x5201fe(0xcc)]=function(){const _0x3ff9ae=_0x5201fe;this['_stateTooltipWindow']=new Window_StateTooltip(),this[_0x3ff9ae(0x12f)](this[_0x3ff9ae(0x131)]);},VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xab)]=Sprite_Clickable[_0x5201fe(0xc1)][_0x5201fe(0x128)],Sprite_Clickable[_0x5201fe(0xc1)][_0x5201fe(0x128)]=function(){const _0x30173a=_0x5201fe;VisuMZ[_0x30173a(0xa8)][_0x30173a(0xab)]['call'](this),this[_0x30173a(0x13d)]();},VisuMZ['StateTooltips'][_0x5201fe(0x115)]=Sprite_Clickable[_0x5201fe(0xc1)][_0x5201fe(0x83)],Sprite_Clickable[_0x5201fe(0xc1)]['onMouseExit']=function(){const _0x23cc4c=_0x5201fe;VisuMZ[_0x23cc4c(0xa8)][_0x23cc4c(0x115)]['call'](this),this[_0x23cc4c(0x86)]();},Sprite_Clickable['prototype'][_0x5201fe(0x13d)]=function(){const _0x37b51e=_0x5201fe;this[_0x37b51e(0xea)]();},Sprite_Clickable[_0x5201fe(0xc1)][_0x5201fe(0x86)]=function(){const _0x5a187e=_0x5201fe,_0x5a06f6=this[_0x5a187e(0xfa)]();_0x5a06f6&&SceneManager[_0x5a187e(0xc4)]()===_0x5a06f6&&SceneManager['setStateTooltipBattler'](null);},Sprite_Clickable[_0x5201fe(0xc1)][_0x5201fe(0xea)]=function(){const _0x2d1692=_0x5201fe,_0x9c37ca=this[_0x2d1692(0xfa)]();_0x9c37ca&&SceneManager[_0x2d1692(0xea)](_0x9c37ca);},Sprite_Clickable[_0x5201fe(0xc1)][_0x5201fe(0xfa)]=function(){return null;},VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0x96)]=Sprite_Battler[_0x5201fe(0xc1)][_0x5201fe(0x128)],Sprite_Battler[_0x5201fe(0xc1)][_0x5201fe(0x128)]=function(){const _0x1cd24a=_0x5201fe;VisuMZ[_0x1cd24a(0xa8)]['Sprite_Battler_onMouseEnter'][_0x1cd24a(0x11c)](this),this[_0x1cd24a(0xea)]();},Sprite_Battler[_0x5201fe(0xc1)][_0x5201fe(0xfa)]=function(){const _0x54e533=_0x5201fe;return this[_0x54e533(0xb4)];},Window_Base[_0x5201fe(0xc1)][_0x5201fe(0x92)]=function(){const _0x1aa58e=_0x5201fe,_0x16c5cb=new Point(TouchInput['x'],TouchInput['y']),_0x1a99eb=this[_0x1aa58e(0xaf)][_0x1aa58e(0x133)](_0x16c5cb);return this['dimensionRect']()[_0x1aa58e(0x120)](_0x1a99eb['x'],_0x1a99eb['y']);},Window_Base['prototype']['dimensionRect']=function(){const _0x4a7a38=_0x5201fe;return new Rectangle(0x0,0x0,this[_0x4a7a38(0xd8)],this['height']);},VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xe6)]=Window_Selectable['prototype']['processTouch'],Window_Selectable['prototype'][_0x5201fe(0xec)]=function(){const _0x28af09=_0x5201fe;VisuMZ[_0x28af09(0xa8)][_0x28af09(0xe6)][_0x28af09(0x11c)](this);if(this[_0x28af09(0x95)][_0x28af09(0x130)][_0x28af09(0xe0)](/Debug/i))return;this[_0x28af09(0x98)]();},Window_Selectable['prototype'][_0x5201fe(0x98)]=function(){const _0x75b71f=_0x5201fe;if(!this[_0x75b71f(0xc3)]())return;this[_0x75b71f(0xf6)]=this['_cache_StateTooltips']||{};if(!this['isOpen']()){this['_cache_StateTooltips'][_0x75b71f(0xd9)]&&this[_0x75b71f(0xe3)]();return;}else this[_0x75b71f(0xf6)][_0x75b71f(0xd9)]=!![];if(!this[_0x75b71f(0x111)]){this['_cache_StateTooltips'][_0x75b71f(0x111)]&&this[_0x75b71f(0xe3)]();return;}else this['_cache_StateTooltips'][_0x75b71f(0x111)]=!![];(this[_0x75b71f(0xf6)]['x']!==this['x']||this[_0x75b71f(0xf6)]['y']!==this['y']||this[_0x75b71f(0xf6)]['touchX']!==TouchInput['x']||this[_0x75b71f(0xf6)][_0x75b71f(0x87)]!==TouchInput['y'])&&(this[_0x75b71f(0xf6)]['x']=this['x'],this[_0x75b71f(0xf6)]['y']=this['y'],this[_0x75b71f(0xf6)]['touchX']=TouchInput['x'],this['_cache_StateTooltips'][_0x75b71f(0xd7)]=TouchInput['y'],this[_0x75b71f(0x12c)]()?(this[_0x75b71f(0xf6)][_0x75b71f(0x9f)]=!![],this[_0x75b71f(0xbc)]()):this['_cache_StateTooltips'][_0x75b71f(0x9f)]&&this[_0x75b71f(0xe3)]());},Window_Selectable[_0x5201fe(0xc1)][_0x5201fe(0xc3)]=function(){const _0x5caa34=_0x5201fe;return VisuMZ[_0x5caa34(0xa8)]['Settings'][_0x5caa34(0xd5)][this['constructor'][_0x5caa34(0x130)]];},Window_Selectable['prototype'][_0x5201fe(0x12c)]=function(){const _0x6bd5b9=_0x5201fe;return this[_0x6bd5b9(0x12b)]()>=0x0;},Window_Selectable['prototype']['isStateTooltipHovered']=function(){const _0x585fde=_0x5201fe,_0x1b0620=new Point(TouchInput['x'],TouchInput['y']),_0x16ad75=this[_0x585fde(0xaf)][_0x585fde(0x133)](_0x1b0620),_0x5470a4=new Rectangle(0x0,0x0,this[_0x585fde(0xd8)],this[_0x585fde(0xa6)]);return _0x5470a4[_0x585fde(0x120)](_0x16ad75['x'],_0x16ad75['y']);},Window_Selectable[_0x5201fe(0xc1)][_0x5201fe(0xbc)]=function(){const _0x2b1769=_0x5201fe,_0x3af1bf=this['getStateTooltipBattler']();_0x3af1bf?(this[_0x2b1769(0xf6)][_0x2b1769(0x13b)]=_0x3af1bf,SceneManager[_0x2b1769(0xea)](_0x3af1bf)):this[_0x2b1769(0xe3)]();},Window_Selectable[_0x5201fe(0xc1)][_0x5201fe(0xfa)]=function(){return null;},Window_Selectable[_0x5201fe(0xc1)][_0x5201fe(0xe3)]=function(){const _0x5bf2d2=_0x5201fe;this[_0x5bf2d2(0xf6)][_0x5bf2d2(0xd9)]=![],this[_0x5bf2d2(0xf6)][_0x5bf2d2(0x111)]=![],this[_0x5bf2d2(0xf6)][_0x5bf2d2(0x9f)]=![],this[_0x5bf2d2(0xf6)]['battler']&&(SceneManager['setStateTooltipBattler'](null),this[_0x5bf2d2(0xf6)]['battler']=null);},Window_MenuStatus['prototype'][_0x5201fe(0xfa)]=function(){const _0x107249=_0x5201fe,_0x4d7b5e=this[_0x107249(0x12b)](),_0x2dfea0=this[_0x107249(0x135)](_0x4d7b5e);return _0x2dfea0;},Window_SkillStatus[_0x5201fe(0xc1)][_0x5201fe(0x12c)]=function(){const _0x47fca6=_0x5201fe;return this[_0x47fca6(0x132)]();},Window_SkillStatus[_0x5201fe(0xc1)]['getStateTooltipBattler']=function(){return this['_actor'];},Window_EquipStatus['prototype'][_0x5201fe(0x12c)]=function(){return this['isStateTooltipHovered']();},Window_EquipStatus['prototype'][_0x5201fe(0xfa)]=function(){const _0x3c6b0f=_0x5201fe;return this[_0x3c6b0f(0xc5)];},Window_Status[_0x5201fe(0xc1)][_0x5201fe(0x12c)]=function(){const _0x4ef3bc=_0x5201fe;return this[_0x4ef3bc(0x132)]();},Window_Status[_0x5201fe(0xc1)][_0x5201fe(0xfa)]=function(){const _0x251969=_0x5201fe;return this[_0x251969(0xc5)];},Window_BattleStatus[_0x5201fe(0xc1)][_0x5201fe(0xfa)]=function(){const _0x2a247c=this['hitIndex'](),_0x524641=this['actor'](_0x2a247c);return _0x524641;};Imported[_0x5201fe(0xbb)]&&(Window_ClassStatus[_0x5201fe(0xc1)][_0x5201fe(0x12c)]=function(){return this['isStateTooltipHovered']();},Window_ClassStatus['prototype'][_0x5201fe(0xfa)]=function(){const _0xed2f95=_0x5201fe;return this[_0xed2f95(0xc5)];});;Imported[_0x5201fe(0x8b)]&&(Window_PartyStatus[_0x5201fe(0xc1)]['isStateTooltipTouched']=function(){const _0x14ed05=_0x5201fe;return this[_0x14ed05(0x132)]();},Window_PartyStatus[_0x5201fe(0xc1)][_0x5201fe(0xfa)]=function(){return this['_actor'];});;function Window_StateTooltip(){const _0xa1c57d=_0x5201fe;this[_0xa1c57d(0xba)](...arguments);}Window_StateTooltip[_0x5201fe(0xc1)]=Object['create'](Window_Base[_0x5201fe(0xc1)]),Window_StateTooltip['prototype'][_0x5201fe(0x95)]=Window_StateTooltip,Window_StateTooltip[_0x5201fe(0x108)]=VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xa2)][_0x5201fe(0x125)]['Scale'],Window_StateTooltip['WINDOW_SKIN_FILENAME']=VisuMZ['StateTooltips'][_0x5201fe(0xa2)]['Tooltip'][_0x5201fe(0xdb)],Window_StateTooltip['WINDOW_SKIN_OPACITY']=VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xa2)]['Tooltip'][_0x5201fe(0xef)],Window_StateTooltip['STATE_FMT']=VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xa2)]['Vocab'][_0x5201fe(0x89)],Window_StateTooltip[_0x5201fe(0x118)]=VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xa2)]['Vocab']['BuffFmt'],Window_StateTooltip[_0x5201fe(0x84)]=VisuMZ[_0x5201fe(0xa8)]['Settings'][_0x5201fe(0xb3)]['DebuffFmt'],Window_StateTooltip[_0x5201fe(0x12a)]=VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xa2)][_0x5201fe(0xb3)][_0x5201fe(0x122)],Window_StateTooltip['TURNS_FMT']=VisuMZ[_0x5201fe(0xa8)]['Settings'][_0x5201fe(0xb3)][_0x5201fe(0xa4)],Window_StateTooltip['PASSIVE_TEXT']=VisuMZ[_0x5201fe(0xa8)]['Settings'][_0x5201fe(0xb3)]['PassiveText'],Window_StateTooltip[_0x5201fe(0x116)]=VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xa2)][_0x5201fe(0xb3)][_0x5201fe(0xe4)],Window_StateTooltip[_0x5201fe(0x9b)]=VisuMZ[_0x5201fe(0xa8)][_0x5201fe(0xa2)][_0x5201fe(0xb3)][_0x5201fe(0xde)],Window_StateTooltip[_0x5201fe(0xb5)]=VisuMZ['StateTooltips'][_0x5201fe(0xa2)]['Tooltip']['OffsetX'],Window_StateTooltip[_0x5201fe(0x124)]=VisuMZ['StateTooltips'][_0x5201fe(0xa2)][_0x5201fe(0x125)][_0x5201fe(0xe1)],Window_StateTooltip[_0x5201fe(0xc1)][_0x5201fe(0xba)]=function(){const _0x484f92=_0x5201fe,_0x71ebc5=new Rectangle(0x0,0x0,Graphics[_0x484f92(0xd8)],Graphics[_0x484f92(0xa6)]);Window_Base['prototype'][_0x484f92(0xba)]['call'](this,_0x71ebc5),this[_0x484f92(0xf7)]['x']=this[_0x484f92(0xf7)]['y']=Window_StateTooltip['WINDOW_SCALE'],this['hide'](),this[_0x484f92(0xb4)]=null;},Window_StateTooltip[_0x5201fe(0xc1)][_0x5201fe(0xff)]=function(){const _0x54afca=_0x5201fe;this[_0x54afca(0xe8)]=ImageManager[_0x54afca(0x9a)](Window_StateTooltip['WINDOW_SKIN_FILENAME']);},Window_StateTooltip[_0x5201fe(0xc1)][_0x5201fe(0xf1)]=function(){const _0x493abe=_0x5201fe;this[_0x493abe(0xa3)]=Window_StateTooltip[_0x493abe(0xc7)];},Window_StateTooltip[_0x5201fe(0xc1)][_0x5201fe(0x137)]=function(_0x7fcae0){const _0x5ca2ad=_0x5201fe;if(this[_0x5ca2ad(0xb4)]===_0x7fcae0)return;this[_0x5ca2ad(0xb4)]=_0x7fcae0,this[_0x5ca2ad(0xb4)]?this[_0x5ca2ad(0x105)]():this[_0x5ca2ad(0x10d)]();},Window_StateTooltip[_0x5201fe(0xc1)][_0x5201fe(0x105)]=function(){const _0x59910d=_0x5201fe;this['contents'][_0x59910d(0x10e)](),this['setupText']();if(this[_0x59910d(0xc8)][_0x59910d(0xaa)]>0x0){this[_0x59910d(0x13c)]();const _0x183d28=this[_0x59910d(0xcb)]();this[_0x59910d(0xfc)](this[_0x59910d(0xc8)],_0x183d28['x'],_0x183d28['y'],_0x183d28[_0x59910d(0xd8)]),this[_0x59910d(0x10f)]();}else this['hide']();},Window_StateTooltip[_0x5201fe(0xc1)][_0x5201fe(0xf8)]=function(){const _0x15f2ff=_0x5201fe;this[_0x15f2ff(0xc8)]='';if(!this['_battler'])return;this[_0x15f2ff(0xb1)](),this[_0x15f2ff(0xce)](),this[_0x15f2ff(0x8c)](),this[_0x15f2ff(0xc8)]=this['_text']['trim']();},Window_StateTooltip['prototype'][_0x5201fe(0xb1)]=function(){const _0x5738a0=_0x5201fe,_0x718e3e=Window_StateTooltip[_0x5738a0(0xc6)],_0x14dd4e=this[_0x5738a0(0xb4)][_0x5738a0(0xad)]();for(const _0x7fa6 of _0x14dd4e){if(!_0x7fa6)continue;if(!_0x7fa6[_0x5738a0(0x130)][_0x5738a0(0x12d)]())continue;if(_0x7fa6[_0x5738a0(0x130)][_0x5738a0(0xe0)](/-----/i))continue;if(_0x7fa6[_0x5738a0(0x139)]<=0x0)continue;const _0x511557=_0x5738a0(0x121)[_0x5738a0(0x97)](_0x7fa6[_0x5738a0(0x139)]),_0x1160e6=_0x7fa6['name']['trim'](),_0x4a2875=_0x7fa6[_0x5738a0(0xf9)][_0x5738a0(0x97)](this[_0x5738a0(0xb4)][_0x5738a0(0xc2)](_0x7fa6['id'])),_0x15aa2f=this['setupStateTurnText'](_0x7fa6),_0x5c0e21=ColorManager['stateColor'](_0x7fa6),_0xf1e029=_0x718e3e[_0x5738a0(0x97)](_0x511557,_0x1160e6,_0x4a2875,_0x15aa2f,_0x5c0e21)[_0x5738a0(0x12d)]();_0xf1e029&&(this[_0x5738a0(0xc8)]+=_0xf1e029+'\x0a');}},Window_StateTooltip['prototype'][_0x5201fe(0x11e)]=function(_0x1102aa){const _0x4e320a=_0x5201fe;if(_0x1102aa[_0x4e320a(0x11d)]===0x0)return'';if(this[_0x4e320a(0xb4)]['passiveStates']()[_0x4e320a(0x119)](_0x1102aa))return Window_StateTooltip[_0x4e320a(0xfd)];let _0x480d31=_0x1102aa[_0x4e320a(0x11d)]===0x1?Window_StateTooltip[_0x4e320a(0x12a)]:Window_StateTooltip[_0x4e320a(0x8a)];const _0x30ea07=this['_battler'][_0x4e320a(0x91)](_0x1102aa['id'])||0x0,_0x2914d3=ColorManager[_0x4e320a(0xd2)](_0x1102aa);return _0x480d31[_0x4e320a(0x97)](_0x30ea07,_0x2914d3)[_0x4e320a(0x12d)]();},Window_StateTooltip['prototype'][_0x5201fe(0xce)]=function(){const _0x1c2e95=_0x5201fe,_0x1d7018=Window_StateTooltip[_0x1c2e95(0x118)],_0x19da83=Window_StateTooltip['DEBUFF_FMT'];for(let _0xffde83=0x0;_0xffde83<0x8;_0xffde83++){if(!this[_0x1c2e95(0xb4)][_0x1c2e95(0xd1)](_0xffde83))continue;const _0x519217=this['_battler']['isBuffAffected'](_0xffde83),_0x24733b=_0x519217?_0x1d7018:_0x19da83,_0x292c1e=this[_0x1c2e95(0xb4)][_0x1c2e95(0xa9)](this[_0x1c2e95(0xb4)][_0x1c2e95(0x127)][_0xffde83],_0xffde83),_0x5eb79d=_0x1c2e95(0x121)['format'](_0x292c1e),_0xf5f258=TextManager[_0x1c2e95(0x85)](_0xffde83),_0x3c854e=Math[_0x1c2e95(0xa1)](this[_0x1c2e95(0xb4)][_0x1c2e95(0xf2)](_0xffde83)*0x64),_0x2307a1=this[_0x1c2e95(0xf5)](_0xffde83),_0x5149cb=_0x519217?ColorManager[_0x1c2e95(0xca)]():ColorManager['debuffColor'](),_0xee0fa4=_0x24733b[_0x1c2e95(0x97)](_0x5eb79d,_0xf5f258,_0x3c854e,_0x2307a1,_0x5149cb)[_0x1c2e95(0x12d)]();_0xee0fa4&&(this['_text']+=_0xee0fa4+'\x0a');}},Window_StateTooltip[_0x5201fe(0xc1)]['setupBuffTurnText']=function(_0x177323){const _0x4c378f=_0x5201fe,_0x73360=Window_StateTooltip[_0x4c378f(0x8a)],_0x383242=this[_0x4c378f(0xb4)]['buffTurns'](_0x177323),_0xb5d877=this[_0x4c378f(0xb4)][_0x4c378f(0x99)](_0x177323),_0x529e75=_0xb5d877?ColorManager[_0x4c378f(0xca)]():ColorManager[_0x4c378f(0xae)]();return _0x73360[_0x4c378f(0x97)](_0x383242,_0x529e75)[_0x4c378f(0x12d)]();},Window_StateTooltip[_0x5201fe(0xc1)]['replaceHexColors']=function(){const _0x489c15=_0x5201fe,_0x161ee3=/\\C\[#(.*?)\]/g;this[_0x489c15(0xc8)]=this[_0x489c15(0xc8)][_0x489c15(0xa0)](_0x161ee3,(_0x31f98d,_0x3d6ed0)=>{const _0x5b73a9=_0x489c15;if(_0x3d6ed0===_0x5b73a9(0xd6)){const _0x186542=ColorManager[_0x5b73a9(0x138)](Window_StateTooltip[_0x5b73a9(0x9b)]);_0x3d6ed0=_0x186542['replace'](/#/g,'');}return'\x5cHEXCOLOR<#%1>'[_0x5b73a9(0x97)](_0x3d6ed0);});},Window_StateTooltip[_0x5201fe(0xc1)]['processEscapeCharacter']=function(_0x362871,_0x12745a){const _0x17fc72=_0x5201fe;switch(_0x362871){case _0x17fc72(0x10c):const _0x54c8f2=this[_0x17fc72(0xbd)](_0x12745a);!this[_0x17fc72(0xb7)]()&&_0x12745a[_0x17fc72(0x9e)]&&this[_0x17fc72(0xf3)](_0x54c8f2);break;default:Window_Base[_0x17fc72(0xc1)][_0x17fc72(0xc9)][_0x17fc72(0x11c)](this,_0x362871,_0x12745a);}},Window_StateTooltip['prototype'][_0x5201fe(0x13c)]=function(){const _0x23dd88=_0x5201fe,_0x3a040e=this['textSizeEx'](this[_0x23dd88(0xc8)]);this[_0x23dd88(0xd8)]=_0x3a040e[_0x23dd88(0xd8)]+(this[_0x23dd88(0xed)]()+this[_0x23dd88(0xb8)])*0x2,this[_0x23dd88(0xa6)]=_0x3a040e[_0x23dd88(0xa6)]+this[_0x23dd88(0xb8)]*0x2,this[_0x23dd88(0x112)](),this[_0x23dd88(0x90)]();},Window_StateTooltip[_0x5201fe(0xc1)][_0x5201fe(0xf4)]=function(){const _0x1dfac1=_0x5201fe;Window_Base[_0x1dfac1(0xc1)][_0x1dfac1(0xf4)][_0x1dfac1(0x11c)](this),this[_0x1dfac1(0x13e)]&&(this['_requestRefresh']=![],this[_0x1dfac1(0x105)]()),this[_0x1dfac1(0xac)](),this[_0x1dfac1(0x114)](),this['updateOpacity']();},Window_StateTooltip[_0x5201fe(0xc1)][_0x5201fe(0x126)]=function(){const _0xf2ad84=_0x5201fe;this[_0xf2ad84(0x13e)]=!![];},Window_StateTooltip['prototype'][_0x5201fe(0xac)]=function(){const _0x4fa24d=_0x5201fe;if(!this[_0x4fa24d(0x111)])return;this['x']=TouchInput['x']+Window_StateTooltip[_0x4fa24d(0xb5)],this['y']=TouchInput['y']+Window_StateTooltip[_0x4fa24d(0x124)],this[_0x4fa24d(0x123)]();},Window_StateTooltip[_0x5201fe(0xc1)]['clampPosition']=function(){const _0x6bbc37=_0x5201fe,_0x2b8922=this[_0x6bbc37(0xd8)]*(Window_StateTooltip[_0x6bbc37(0x108)]||0.01),_0x5c484a=this[_0x6bbc37(0xa6)]*(Window_StateTooltip[_0x6bbc37(0x108)]||0.01);this['x']=Math[_0x6bbc37(0xeb)](this['x'][_0x6bbc37(0xdd)](0x0,Graphics['width']-_0x2b8922)),this['y']=Math['round'](this['y'][_0x6bbc37(0xdd)](0x0,Graphics[_0x6bbc37(0xa6)]-_0x5c484a));},Window_StateTooltip[_0x5201fe(0xc1)]['updateDeath']=function(){const _0x57939d=_0x5201fe;this[_0x57939d(0xb4)]&&this[_0x57939d(0xb4)]['isDead']()&&this[_0x57939d(0x137)](null);},Window_StateTooltip[_0x5201fe(0xc1)]['updateOpacity']=function(){const _0xe9f1c5=_0x5201fe,_0x417473=this[_0xe9f1c5(0x82)]();this[_0xe9f1c5(0xee)]=this['contentsOpacity']=_0x417473;},Window_StateTooltip['prototype']['targetOpacity']=function(){const _0x399536=_0x5201fe;if(SceneManager[_0x399536(0xb6)]()){const _0x36ba9b=[];_0x36ba9b[_0x399536(0x106)](SceneManager[_0x399536(0x93)][_0x399536(0x110)]),_0x36ba9b[_0x399536(0x106)](SceneManager[_0x399536(0x93)][_0x399536(0xcd)]),_0x36ba9b[_0x399536(0x106)](SceneManager[_0x399536(0x93)][_0x399536(0xe7)]);for(const _0x1d560b of _0x36ba9b){if(_0x1d560b&&_0x1d560b[_0x399536(0x117)]()&&_0x1d560b[_0x399536(0x11f)]&&_0x1d560b['isMouseHovered']())return 0x0;}}return 0xff;};
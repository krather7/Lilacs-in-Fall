//=============================================================================
// VisuStella MZ - Life State Effects
// VisuMZ_3_LifeStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LifeStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LifeStateEffects = VisuMZ.LifeStateEffects || {};
VisuMZ.LifeStateEffects.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.00] [LifeStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Life_State_Effects_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Life State Effects plugin allow for trait objects and/or states to
 * create specific, though, commonly used effects found in many traditional
 * JRPG's, such as Auto Life, Doom, and Guts. These mechanical effects add a
 * whole new layer of strategy when it comes to status effects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Auto Life effect, which is a state effect that recovers a percentage of
 *   the user's HP and disappears upon triggering.
 * * Curse effect, which prevents HP, MP, and/or TP recovery.
 * * Doom effect, which is a state effect that will kill the affected battler
 *   once the state's timer wears off and expires.
 * * Fragile effect, which causes any time a user receives HP damage from a
 *   direct action, that user will instantly lose all HP.
 * * Guts, which prevents HP from dropping below 1, unless the battler's HP is
 *   at 1, itself.
 * * Undead, which causes normal HP healing to inflict damage instead, instant
 *   death effects to fully restore HP, and Drain effects to be inverted.
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
 * - VisuMZ_1_SkillsStatesCore
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
 * === State-Only Effects ===
 * 
 * ---
 *
 * <Auto Life: x%>
 *
 * - Used for: State Notetags
 * - When the affected battler dies with this state present, this state will
 *   automatically remove itself (and any other states with <Auto Life: x%>) to
 *   restore that much HP% for the battler.
 * - Replace 'x' with a number representing that percentage of HP to heal the
 *   battler upon dying.
 *
 * ---
 *
 * <Doom>
 *
 * - Used for: State Notetags
 * - When this state expires naturally (without direct removal), kill the
 *   affected battler.
 *
 * ---
 * 
 * === Trait-Object Effects ===
 * 
 * ---
 *
 * <Curse HP>
 * <Curse MP>
 * <Curse TP>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the affected battler from being able to recover HP, MP, and/or TP
 *   depending on which notetag is being used.
 *
 * ---
 *
 * <Fragile>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If a battler affected by <Fragile> receives a direct attack and takes any
 *   HP damage (as opposed to event command damage or regeneration damage),
 *   then instantly kill the affected battler.
 *
 * ---
 *
 * <Guts>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This will prevent the battler from taking any fatal damage and leaves them
 *   with only 1 HP. However, if the battler has 1 HP and receives damage, then
 *   the battler will actually die.
 *
 * ---
 *
 * <Undead>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If the battler receives HP Healing, it receives damage instead.
 * - If the battler is a target of an instant death skill or item, then the
 *   battler will recover full HP.
 * - If the battler is the target of an HP Drain action, then the battler will
 *   drain HP from the attacker instead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Effect Settings
 * ============================================================================
 * 
 * Auto-Life Settings
 * Curse Settings
 * Doom Settings
 * Fragile Settings
 * Guts Settings
 * Undead Settings
 *
 * When certain effects trigger, you can have an animation play (if the
 * VisuStella MZ Core Engine is also installed) and/or a popup appear, too.
 * Each of the six effects provided by this plugin have animation and popup
 * effects that can be adjusted.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
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
 * Version 1.00: October 7, 2020
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
 * @param LifeStateEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoLife:struct
 * @text Auto Life Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Auto Life effect.
 * @default {"Animation":"","AnimationID:num":"50","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"AUTOLIFE","TextColor:str":"0","FlashColor:eval":"[0, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Curse:struct
 * @text Curse Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Curse effect.
 * @default {"Animation":"","AnimationID:num":"54","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"CURSE","TextColor:str":"0","FlashColor:eval":"[0, 0, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Doom:struct
 * @text Doom Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Doom effect.
 * @default {"Animation":"","AnimationID:num":"65","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"DOOM","TextColor:str":"0","FlashColor:eval":"[128, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Fragile:struct
 * @text Fragile Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Fragile effect.
 * @default {"Animation":"","AnimationID:num":"60","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"FRAGILE","TextColor:str":"0","FlashColor:eval":"[255, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Guts:struct
 * @text Guts Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Guts effect.
 * @default {"Animation":"","AnimationID:num":"51","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"GUTS","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Undead:struct
 * @text Undead Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Undead effect.
 * @default {"Animation":"","AnimationID:num":"58","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNDEAD","TextColor:str":"0","FlashColor:eval":"[128, 128, 128, 160]","FlashDuration:num":"60"}
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default TEXT
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x5a7a=['Mute','nUiPJ','cIRIP','noHealHp','FUNC','_cache','parse','concat','noHealMp','clamp','Game_Battler_addState','Game_BattlerBase_eraseState','isDrain','dead','Game_Action_itemEffectAddNormalState','FlashColor','ARRAYSTR','requestFauxAnimation','KFONt','makeDeepCopy','_motion','onLifeStateDoomEffect','guts','Guts','ARRAYEVAL','LifeStateEffects_CurseHp','hpAffected','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','description','skills','RegExp','match','map','doom','format','onLifeStateEffect','Game_Action_executeHpDamage','ARRAYSTRUCT','AutoLife','checkCacheKey','AnimationID','dataId','requestMotion','LifeStateEffects','Fragile','Game_Action_executeDamage','STR','gdtom','PopupText','Mirror','yRGXS','FlashDuration','_allowUndeadHpHeal','LifeStateEffects_Guts','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','hasLifeStateUndeadEffect','parameters','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','addNewState','TextColor','ceil','Game_BattlerBase_setHp','removeState','itemEffectAddAttackState','call','LifeStateEffects_Undead','hasLifeStateCurseMpEffect','max','states','startDamagePopup','NUM','Settings','traitObjects','prototype','STRUCT','Game_Battler_removeStatesAuto','OpEHd','gainMp','hasLifeStateFragileEffect','removeStatesAuto','isSceneBattle','onLifeStateAutoLifeEffect','Undead','status','isHpEffect','ConvertParams','gainTp','_removeStatesAutoInEffect','VisuMZ_0_CoreEngine','undead','hasLifeStateCurseTpEffect','EVAL','mhp','Curse','name','exit','performCollapse','VisuMZ_1_BattleCore','Doom','Game_Battler_gainHpCurse','addState','_result','reduce','hasLifeStateGutsEffect','setHp','executeHpDamage','Game_Battler_gainMpCurse','some','note','ARRAYFUNC','deathStateId','ARRAYNUM','hasLifeStateAutoLifeEffect','wHBUi','LifeStateEffects_CurseMp','hasLifeStateCurseHpEffect','autoLife','ARRAYJSON','trim','executeDamage','rLdPc','gainHp','clearResult','subject','LifeStateEffects_Fragile','itemEffectAddNormalState','version','Game_Battler_gainTp','ZdTOw','Game_BattlerBase_addNewState'];(function(_0x10f451,_0x5a7adf){const _0x384a75=function(_0x4db97b){while(--_0x4db97b){_0x10f451['push'](_0x10f451['shift']());}};_0x384a75(++_0x5a7adf);}(_0x5a7a,0xab));const _0x384a=function(_0x10f451,_0x5a7adf){_0x10f451=_0x10f451-0x0;let _0x384a75=_0x5a7a[_0x10f451];return _0x384a75;};var label=_0x384a('0x2'),tier=tier||0x0,dependencies=[_0x384a('0x38'),'VisuMZ_1_SkillsStatesCore'],pluginData=$plugins['filter'](function(_0x4472df){return _0x4472df[_0x384a('0x2a')]&&_0x4472df[_0x384a('0x75')]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x384a('0x1e')]||{},VisuMZ[_0x384a('0x2c')]=function(_0x139aaa,_0xe7dcf9){for(const _0x3a5392 in _0xe7dcf9){if(_0x3a5392[_0x384a('0x78')](/(.*):(.*)/i)){if(_0x384a('0x4f')===_0x384a('0x4f')){const _0x395ca2=String(RegExp['$1']),_0x2b0c91=String(RegExp['$2'])['toUpperCase']()[_0x384a('0x4d')]();let _0x18856c,_0x537535,_0x12d25f;switch(_0x2b0c91){case _0x384a('0x1d'):_0x18856c=_0xe7dcf9[_0x3a5392]!==''?Number(_0xe7dcf9[_0x3a5392]):0x0;break;case _0x384a('0x46'):_0x537535=_0xe7dcf9[_0x3a5392]!==''?JSON[_0x384a('0x5f')](_0xe7dcf9[_0x3a5392]):[],_0x18856c=_0x537535['map'](_0x411f35=>Number(_0x411f35));break;case _0x384a('0x32'):_0x18856c=_0xe7dcf9[_0x3a5392]!==''?eval(_0xe7dcf9[_0x3a5392]):null;break;case _0x384a('0x71'):_0x537535=_0xe7dcf9[_0x3a5392]!==''?JSON[_0x384a('0x5f')](_0xe7dcf9[_0x3a5392]):[],_0x18856c=_0x537535[_0x384a('0x79')](_0xe4ed57=>eval(_0xe4ed57));break;case'JSON':_0x18856c=_0xe7dcf9[_0x3a5392]!==''?JSON[_0x384a('0x5f')](_0xe7dcf9[_0x3a5392]):'';break;case _0x384a('0x4c'):_0x537535=_0xe7dcf9[_0x3a5392]!==''?JSON[_0x384a('0x5f')](_0xe7dcf9[_0x3a5392]):[],_0x18856c=_0x537535['map'](_0xe77899=>JSON[_0x384a('0x5f')](_0xe77899));break;case _0x384a('0x5d'):_0x18856c=_0xe7dcf9[_0x3a5392]!==''?new Function(JSON['parse'](_0xe7dcf9[_0x3a5392])):new Function('return\x200');break;case _0x384a('0x44'):_0x537535=_0xe7dcf9[_0x3a5392]!==''?JSON[_0x384a('0x5f')](_0xe7dcf9[_0x3a5392]):[],_0x18856c=_0x537535[_0x384a('0x79')](_0xfd1995=>new Function(JSON[_0x384a('0x5f')](_0xfd1995)));break;case _0x384a('0x5'):_0x18856c=_0xe7dcf9[_0x3a5392]!==''?String(_0xe7dcf9[_0x3a5392]):'';break;case _0x384a('0x69'):_0x537535=_0xe7dcf9[_0x3a5392]!==''?JSON[_0x384a('0x5f')](_0xe7dcf9[_0x3a5392]):[],_0x18856c=_0x537535[_0x384a('0x79')](_0x5917f2=>String(_0x5917f2));break;case _0x384a('0x21'):_0x12d25f=_0xe7dcf9[_0x3a5392]!==''?JSON[_0x384a('0x5f')](_0xe7dcf9[_0x3a5392]):{},_0x18856c=VisuMZ[_0x384a('0x2c')]({},_0x12d25f);break;case _0x384a('0x7e'):_0x537535=_0xe7dcf9[_0x3a5392]!==''?JSON[_0x384a('0x5f')](_0xe7dcf9[_0x3a5392]):[],_0x18856c=_0x537535[_0x384a('0x79')](_0x4ed803=>VisuMZ[_0x384a('0x2c')]({},JSON['parse'](_0x4ed803)));break;default:continue;}_0x139aaa[_0x395ca2]=_0x18856c;}else{function _0x1c04c1(){const _0x16457d=_0x2e6974(_0x1337b1['$1']);_0x16457d!==_0x324f8d[_0x297403][_0x384a('0x55')]&&(_0x2e7bb6(_0x384a('0x74')[_0x384a('0x7b')](_0xa01912,_0x16457d)),_0x5a90a8['exit']());}}}}return _0x139aaa;},(_0x58645a=>{const _0x2f0433=_0x58645a[_0x384a('0x35')];for(const _0x3f33ab of dependencies){if(!Imported[_0x3f33ab]){alert(_0x384a('0xd')[_0x384a('0x7b')](_0x2f0433,_0x3f33ab)),SceneManager[_0x384a('0x36')]();break;}}const _0x18d39c=_0x58645a[_0x384a('0x75')];if(_0x18d39c[_0x384a('0x78')](/\[Version[ ](.*?)\]/i)){const _0x30635d=Number(RegExp['$1']);_0x30635d!==VisuMZ[label][_0x384a('0x55')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x384a('0x7b')](_0x2f0433,_0x30635d)),SceneManager[_0x384a('0x36')]());}if(_0x18d39c[_0x384a('0x78')](/\[Tier[ ](\d+)\]/i)){const _0x50f3f7=Number(RegExp['$1']);_0x50f3f7<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x384a('0x7b')](_0x2f0433,_0x50f3f7,tier)),SceneManager['exit']()):tier=Math[_0x384a('0x1a')](_0x50f3f7,tier);}VisuMZ[_0x384a('0x2c')](VisuMZ[label]['Settings'],_0x58645a[_0x384a('0xf')]);})(pluginData),VisuMZ[_0x384a('0x2')][_0x384a('0x77')]={'guts':/<(?:GUTS)>/i,'undead':/<(?:UNDEAD|ZOMBIE|DAMAGE FROM HEALING)>/i,'fragile':/<(?:FRAGILE|ONE HIT KILL|DEATH ON HP DAMAGE)>/i,'noHealHp':/<(?:CANNOT HEAL HP|CANNOT RECOVER HP|CURSE HP)>/i,'noHealMp':/<(?:CANNOT HEAL MP|CANNOT RECOVER MP|CURSE MP)>/i,'noHealTp':/<(?:CANNOT HEAL TP|CANNOT RECOVER TP|CURSE TP)>/i,'autoLife':/<(?:AUTOLIFE|AUTO LIFE):[ ](\d+)([%％])>/i,'doom':/<(?:DOOM|DEATH SENTENCE)>/i},Game_Battler[_0x384a('0x20')][_0x384a('0x7c')]=function(_0x52d19b){if(!SceneManager['isSceneBattle']())return![];const _0x2266ac=VisuMZ[_0x384a('0x2')][_0x384a('0x1e')][_0x52d19b];if(!_0x2266ac)return;if(Imported[_0x384a('0x2f')]&&_0x2266ac[_0x384a('0x81')]>0x0){if(_0x384a('0x6')===_0x384a('0x48')){function _0x21b4b1(){this[_0x384a('0x3e')]()&&_0x1aa0a0<=0x0&&(this[_0x384a('0x7c')]('Guts'),_0x11920f=0x1),_0x418905['LifeStateEffects'][_0x384a('0x14')][_0x384a('0x17')](this,_0x99299e);}}else{const _0x44c3e2=[this],_0x4d0ea5=_0x2266ac[_0x384a('0x81')],_0x51cfa2=_0x2266ac[_0x384a('0x8')],_0x3fc3af=_0x2266ac[_0x384a('0x59')];$gameTemp[_0x384a('0x6a')](_0x44c3e2,_0x4d0ea5,_0x51cfa2,_0x3fc3af);}}if(_0x2266ac[_0x384a('0x7')]!==''){if(_0x384a('0x23')===_0x384a('0x23')){const _0x29222e={'textColor':_0x2266ac[_0x384a('0x12')],'flashColor':_0x2266ac[_0x384a('0x68')],'flashDuration':_0x2266ac[_0x384a('0xa')]};this['setupTextPopup'](_0x2266ac[_0x384a('0x7')],_0x29222e);}else{function _0x1d5642(){if(this[_0x384a('0xb')])return![];const _0x2f8577=_0x384a('0x18');if(this['checkCacheKey'](_0x2f8577))return this[_0x384a('0x5e')][_0x2f8577];const _0xfeda2d=this[_0x384a('0x1f')]()[_0x384a('0x60')](this[_0x384a('0x76')]());return this[_0x384a('0x5e')][_0x2f8577]=_0xfeda2d[_0x384a('0x42')](_0x5e43ba=>_0x5e43ba&&_0x5e43ba[_0x384a('0x43')][_0x384a('0x78')](_0x24cb0e[_0x384a('0x2')][_0x384a('0x77')][_0x384a('0x30')])),this[_0x384a('0x5e')][_0x2f8577];}}}},Game_BattlerBase[_0x384a('0x20')][_0x384a('0x47')]=function(){if(!SceneManager[_0x384a('0x27')]())return![];const _0x3d4c98='LifeStateEffects_AutoLife';if(this[_0x384a('0x80')](_0x3d4c98))return this[_0x384a('0x5e')][_0x3d4c98];const _0x200ecd=this[_0x384a('0x1f')]()[_0x384a('0x60')](this[_0x384a('0x76')]());return this[_0x384a('0x5e')][_0x3d4c98]=_0x200ecd[_0x384a('0x42')](_0x4fa1eb=>_0x4fa1eb&&_0x4fa1eb[_0x384a('0x43')][_0x384a('0x78')](VisuMZ['LifeStateEffects'][_0x384a('0x77')][_0x384a('0x4b')])),this['_cache'][_0x3d4c98];},VisuMZ['LifeStateEffects'][_0x384a('0x58')]=Game_BattlerBase[_0x384a('0x20')][_0x384a('0x11')],Game_BattlerBase[_0x384a('0x20')][_0x384a('0x11')]=function(_0x3efe35){_0x3efe35===this[_0x384a('0x45')]()&&this[_0x384a('0x47')]()?this[_0x384a('0x28')]():VisuMZ[_0x384a('0x2')][_0x384a('0x58')][_0x384a('0x17')](this,_0x3efe35);},Game_Battler['prototype'][_0x384a('0x28')]=function(){const _0x6fd6c2=JsonEx[_0x384a('0x6c')](this[_0x384a('0x3c')]),_0x1fcc3a=VisuMZ[_0x384a('0x2')][_0x384a('0x77')][_0x384a('0x4b')];let _0x316548=this[_0x384a('0x1b')]()[_0x384a('0x79')](_0x3c3c58=>_0x3c3c58&&_0x3c3c58[_0x384a('0x43')]['match'](_0x1fcc3a)?Number(RegExp['$1'])*0.01:0x0);const _0x22eeac=_0x316548[_0x384a('0x3d')]((_0x48ba94,_0x1d7e82)=>_0x48ba94+_0x1d7e82,0x0);let _0x250730=Math[_0x384a('0x13')](_0x22eeac*this[_0x384a('0x33')]);_0x250730=_0x250730[_0x384a('0x62')](0x0,this[_0x384a('0x33')]);if(_0x250730<=0x0)return;this[_0x384a('0x3f')](_0x250730),this[_0x384a('0x51')](),this[_0x384a('0x3c')]['hpDamage']=-_0x250730,this[_0x384a('0x3c')][_0x384a('0x73')]=!![],this[_0x384a('0x1c')]();for(const _0x24c421 of this[_0x384a('0x1b')]()){if('nKVEU'!==_0x384a('0x9')){if(!_0x24c421)continue;_0x24c421['note'][_0x384a('0x78')](_0x1fcc3a)&&this[_0x384a('0x15')](_0x24c421['id']);}else{function _0x2d6fc1(){const _0x28baee=_0x5cc4eb(_0x2c4611['$1']);_0x28baee<_0x225990?(_0x214e26(_0x384a('0x10')[_0x384a('0x7b')](_0x224bde,_0x28baee,_0x19b4b3)),_0x5c73c7[_0x384a('0x36')]()):_0x3e88b7=_0x4d39a5[_0x384a('0x1a')](_0x28baee,_0x515d8b);}}}this[_0x384a('0x7c')](_0x384a('0x7f')),this['_result']=_0x6fd6c2;},VisuMZ[_0x384a('0x2')][_0x384a('0x22')]=Game_Battler[_0x384a('0x20')][_0x384a('0x26')],Game_Battler[_0x384a('0x20')][_0x384a('0x26')]=function(_0x5e934e){this[_0x384a('0x2e')]=!![],VisuMZ[_0x384a('0x2')][_0x384a('0x22')]['call'](this,_0x5e934e),this['_removeStatesAutoInEffect']=undefined;},VisuMZ[_0x384a('0x2')][_0x384a('0x64')]=Game_BattlerBase[_0x384a('0x20')]['eraseState'],Game_BattlerBase['prototype']['eraseState']=function(_0x426e9b){VisuMZ[_0x384a('0x2')]['Game_BattlerBase_eraseState']['call'](this,_0x426e9b);const _0x2e0fcb=$dataStates[_0x426e9b];this['_removeStatesAutoInEffect']&&_0x2e0fcb&&_0x2e0fcb[_0x384a('0x43')][_0x384a('0x78')](VisuMZ['LifeStateEffects'][_0x384a('0x77')][_0x384a('0x7a')])&&this[_0x384a('0x6e')]();},Game_Battler['prototype'][_0x384a('0x6e')]=function(){this[_0x384a('0x3f')](0x0),this['refresh']();if(!this['isDead']())return;this[_0x384a('0x7c')](_0x384a('0x39')),this[_0x384a('0x37')](),this[_0x384a('0x1')](_0x384a('0x66'));const _0x345edb=this['battler']();if(_0x345edb){if(_0x384a('0x57')!==_0x384a('0x57')){function _0x3b622f(){this['_removeStatesAutoInEffect']=!![],_0x4981e2[_0x384a('0x2')][_0x384a('0x22')][_0x384a('0x17')](this,_0xfebf53),this[_0x384a('0x2e')]=_0x20415f;}}else _0x345edb[_0x384a('0x6d')]=_0x384a('0x66');}},Game_BattlerBase[_0x384a('0x20')][_0x384a('0x25')]=function(){if(!SceneManager[_0x384a('0x27')]())return![];const _0x4d9e13=_0x384a('0x53');if(this[_0x384a('0x80')](_0x4d9e13))return this[_0x384a('0x5e')][_0x4d9e13];const _0x3bfcc8=this[_0x384a('0x1f')]()[_0x384a('0x60')](this[_0x384a('0x76')]());return this['_cache'][_0x4d9e13]=_0x3bfcc8[_0x384a('0x42')](_0x372518=>_0x372518&&_0x372518[_0x384a('0x43')][_0x384a('0x78')](VisuMZ['LifeStateEffects'][_0x384a('0x77')]['fragile'])),this[_0x384a('0x5e')][_0x4d9e13];},VisuMZ[_0x384a('0x2')][_0x384a('0x7d')]=Game_Action[_0x384a('0x20')]['executeHpDamage'],Game_Action[_0x384a('0x20')][_0x384a('0x40')]=function(_0x4108f5,_0x24a6a6){VisuMZ[_0x384a('0x2')][_0x384a('0x7d')]['call'](this,_0x4108f5,_0x24a6a6),_0x24a6a6>0x0&&_0x4108f5[_0x384a('0x25')]()&&(_0x4108f5[_0x384a('0x3f')](0x0),_0x4108f5[_0x384a('0x7c')](_0x384a('0x3')));},Game_BattlerBase['prototype'][_0x384a('0x3e')]=function(){if(!SceneManager[_0x384a('0x27')]())return![];if(this['hp']<=0x1)return![];const _0x3c7263=_0x384a('0xc');if(this[_0x384a('0x80')](_0x3c7263))return this[_0x384a('0x5e')][_0x3c7263];const _0x100ec3=this['traitObjects']()[_0x384a('0x60')](this[_0x384a('0x76')]());return this[_0x384a('0x5e')][_0x3c7263]=_0x100ec3[_0x384a('0x42')](_0x47b64c=>_0x47b64c&&_0x47b64c[_0x384a('0x43')][_0x384a('0x78')](VisuMZ[_0x384a('0x2')][_0x384a('0x77')][_0x384a('0x6f')])),this[_0x384a('0x5e')][_0x3c7263];},VisuMZ[_0x384a('0x2')]['Game_BattlerBase_setHp']=Game_BattlerBase[_0x384a('0x20')][_0x384a('0x3f')],Game_BattlerBase[_0x384a('0x20')][_0x384a('0x3f')]=function(_0x2656c0){this[_0x384a('0x3e')]()&&_0x2656c0<=0x0&&(this[_0x384a('0x7c')](_0x384a('0x70')),_0x2656c0=0x1),VisuMZ[_0x384a('0x2')]['Game_BattlerBase_setHp'][_0x384a('0x17')](this,_0x2656c0);},Game_BattlerBase[_0x384a('0x20')][_0x384a('0xe')]=function(){if(this[_0x384a('0xb')])return![];const _0x26020e='LifeStateEffects_Undead';if(this[_0x384a('0x80')](_0x26020e))return this[_0x384a('0x5e')][_0x26020e];const _0x448a81=this['traitObjects']()[_0x384a('0x60')](this[_0x384a('0x76')]());return this[_0x384a('0x5e')][_0x26020e]=_0x448a81[_0x384a('0x42')](_0x3ac08=>_0x3ac08&&_0x3ac08[_0x384a('0x43')]['match'](VisuMZ[_0x384a('0x2')]['RegExp'][_0x384a('0x30')])),this[_0x384a('0x5e')][_0x26020e];},VisuMZ['LifeStateEffects']['Game_Battler_gainHp']=Game_Battler[_0x384a('0x20')][_0x384a('0x50')],Game_Battler[_0x384a('0x20')][_0x384a('0x50')]=function(_0x14ee55){this[_0x384a('0xe')]()&&_0x14ee55>0x0&&(_0x14ee55*=-0x1,this[_0x384a('0x7c')](_0x384a('0x29'))),VisuMZ[_0x384a('0x2')]['Game_Battler_gainHp']['call'](this,_0x14ee55);},VisuMZ[_0x384a('0x2')][_0x384a('0x4')]=Game_Action[_0x384a('0x20')][_0x384a('0x4e')],Game_Action['prototype'][_0x384a('0x4e')]=function(_0x31654a,_0x501c24){this[_0x384a('0x65')]()&&this[_0x384a('0x2b')]()&&_0x501c24>0x0&&(this[_0x384a('0x52')]()[_0x384a('0xe')]()&&(this[_0x384a('0x52')]()['_allowUndeadHpHeal']=!![]),_0x31654a['hasLifeStateUndeadEffect']()&&(_0x501c24*=-0x1,_0x31654a[_0x384a('0xb')]=!![],_0x31654a['onLifeStateEffect'](_0x384a('0x29')))),VisuMZ['LifeStateEffects'][_0x384a('0x4')][_0x384a('0x17')](this,_0x31654a,_0x501c24),_0x31654a[_0x384a('0xb')]=undefined,this[_0x384a('0x52')]()[_0x384a('0xb')]=undefined;},VisuMZ['LifeStateEffects']['Game_Action_itemEffectAddAttackState']=Game_Action[_0x384a('0x20')]['itemEffectAddAttackState'],Game_Action[_0x384a('0x20')][_0x384a('0x16')]=function(_0x2f52c7,_0x54f14f){_0x2f52c7[_0x384a('0xe')]()&&(_0x2f52c7[_0x384a('0xb')]=!![]),VisuMZ[_0x384a('0x2')]['Game_Action_itemEffectAddAttackState'][_0x384a('0x17')](this,_0x2f52c7,_0x54f14f),_0x2f52c7[_0x384a('0xb')]=undefined;},VisuMZ[_0x384a('0x2')][_0x384a('0x63')]=Game_Battler['prototype'][_0x384a('0x3b')],Game_Battler[_0x384a('0x20')]['addState']=function(_0x1c0fd8){if(_0x1c0fd8===this[_0x384a('0x45')]()&&this[_0x384a('0xb')]){if(_0x384a('0x5b')!==_0x384a('0x5b')){function _0x55eca7(){_0x2cc36a>0x0&&this[_0x384a('0x4a')]()&&(_0x23eea0=0x0,this[_0x384a('0x7c')](_0x384a('0x34'))),_0xd9ccbf[_0x384a('0x2')][_0x384a('0x3a')]['call'](this,_0x509389);}}else this[_0x384a('0x50')](this[_0x384a('0x33')]),this['onLifeStateEffect'](_0x384a('0x29'));}else{if('KFONt'!==_0x384a('0x6b')){function _0x6e24a2(){const _0x37b625=[this],_0x250af8=_0x21d3fe[_0x384a('0x81')],_0x33f22a=_0x57edb5['Mirror'],_0x3bb4ad=_0x2f252a[_0x384a('0x59')];_0x2540d8[_0x384a('0x6a')](_0x37b625,_0x250af8,_0x33f22a,_0x3bb4ad);}}else VisuMZ[_0x384a('0x2')][_0x384a('0x63')][_0x384a('0x17')](this,_0x1c0fd8);}},VisuMZ[_0x384a('0x2')][_0x384a('0x67')]=Game_Action[_0x384a('0x20')][_0x384a('0x54')],Game_Action[_0x384a('0x20')][_0x384a('0x54')]=function(_0x2aedee,_0x14062b){_0x14062b[_0x384a('0x0')]===_0x2aedee[_0x384a('0x45')]()&&_0x2aedee['hasLifeStateUndeadEffect']()?(_0x2aedee[_0x384a('0xb')]=!![],_0x2aedee['gainHp'](_0x2aedee[_0x384a('0x33')]),_0x2aedee['_allowUndeadHpHeal']=undefined,_0x2aedee[_0x384a('0x7c')](_0x384a('0x29'))):VisuMZ[_0x384a('0x2')]['Game_Action_itemEffectAddNormalState']['call'](this,_0x2aedee,_0x14062b);},Game_BattlerBase[_0x384a('0x20')][_0x384a('0x4a')]=function(){const _0xd49bc7=_0x384a('0x72');if(this['checkCacheKey'](_0xd49bc7))return this['_cache'][_0xd49bc7];const _0x41cc19=this[_0x384a('0x1f')]()[_0x384a('0x60')](this[_0x384a('0x76')]());return this['_cache'][_0xd49bc7]=_0x41cc19['some'](_0x565869=>_0x565869&&_0x565869[_0x384a('0x43')][_0x384a('0x78')](VisuMZ['LifeStateEffects'][_0x384a('0x77')][_0x384a('0x5c')])),this['_cache'][_0xd49bc7];},Game_BattlerBase[_0x384a('0x20')]['hasLifeStateCurseMpEffect']=function(){const _0x58cbfb=_0x384a('0x49');if(this[_0x384a('0x80')](_0x58cbfb))return this[_0x384a('0x5e')][_0x58cbfb];const _0x4a1385=this[_0x384a('0x1f')]()[_0x384a('0x60')](this['skills']());return this[_0x384a('0x5e')][_0x58cbfb]=_0x4a1385[_0x384a('0x42')](_0x19d3fb=>_0x19d3fb&&_0x19d3fb['note'][_0x384a('0x78')](VisuMZ[_0x384a('0x2')]['RegExp'][_0x384a('0x61')])),this['_cache'][_0x58cbfb];},Game_BattlerBase[_0x384a('0x20')][_0x384a('0x31')]=function(){const _0x4303c5='LifeStateEffects_CurseTp';if(this[_0x384a('0x80')](_0x4303c5))return this[_0x384a('0x5e')][_0x4303c5];const _0x16049c=this[_0x384a('0x1f')]()[_0x384a('0x60')](this[_0x384a('0x76')]());return this[_0x384a('0x5e')][_0x4303c5]=_0x16049c[_0x384a('0x42')](_0x326813=>_0x326813&&_0x326813[_0x384a('0x43')][_0x384a('0x78')](VisuMZ[_0x384a('0x2')][_0x384a('0x77')]['noHealTp'])),this[_0x384a('0x5e')][_0x4303c5];},VisuMZ[_0x384a('0x2')][_0x384a('0x3a')]=Game_Battler[_0x384a('0x20')][_0x384a('0x50')],Game_Battler['prototype'][_0x384a('0x50')]=function(_0x50a174){_0x50a174>0x0&&this[_0x384a('0x4a')]()&&(_0x50a174=0x0,this[_0x384a('0x7c')](_0x384a('0x34'))),VisuMZ[_0x384a('0x2')][_0x384a('0x3a')][_0x384a('0x17')](this,_0x50a174);},VisuMZ[_0x384a('0x2')][_0x384a('0x41')]=Game_Battler[_0x384a('0x20')][_0x384a('0x24')],Game_Battler[_0x384a('0x20')][_0x384a('0x24')]=function(_0x2467b7){_0x2467b7>0x0&&this[_0x384a('0x19')]()&&(_0x2467b7=0x0,this[_0x384a('0x7c')](_0x384a('0x34'))),VisuMZ['LifeStateEffects'][_0x384a('0x41')][_0x384a('0x17')](this,_0x2467b7);},VisuMZ['LifeStateEffects'][_0x384a('0x56')]=Game_Battler[_0x384a('0x20')][_0x384a('0x2d')],Game_Battler[_0x384a('0x20')][_0x384a('0x2d')]=function(_0xb9ce9c){if(_0xb9ce9c>0x0&&this[_0x384a('0x31')]()){if(_0x384a('0x5a')!==_0x384a('0x5a')){function _0x53a968(){this[_0x384a('0x65')]()&&this[_0x384a('0x2b')]()&&_0x46d670>0x0&&(this[_0x384a('0x52')]()['hasLifeStateUndeadEffect']()&&(this[_0x384a('0x52')]()[_0x384a('0xb')]=!![]),_0x2bd427[_0x384a('0xe')]()&&(_0x44ebfc*=-0x1,_0xb2cbe9[_0x384a('0xb')]=!![],_0x417bee[_0x384a('0x7c')]('Undead'))),_0x26e11d['LifeStateEffects']['Game_Action_executeDamage'][_0x384a('0x17')](this,_0xe1c2cc,_0x4c59b0),_0x53e69d[_0x384a('0xb')]=_0x2cd170,this[_0x384a('0x52')]()['_allowUndeadHpHeal']=_0x42c75a;}}else _0xb9ce9c=0x0,this[_0x384a('0x7c')]('Curse');}VisuMZ[_0x384a('0x2')][_0x384a('0x56')][_0x384a('0x17')](this,_0xb9ce9c);};
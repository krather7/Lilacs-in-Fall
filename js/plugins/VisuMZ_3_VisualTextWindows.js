//=============================================================================
// VisuStella MZ - Visual Text Windows
// VisuMZ_3_VisualTextWindows.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualTextWindows = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualTextWindows = VisuMZ.VisualTextWindows || {};
VisuMZ.VisualTextWindows.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [VisualTextWindows]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Text_Window_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * Ever wanted to create an instruction window on the screen while the player
 * is exploring or an informative window detailing what the player needs to do
 * while on certain parts of the map or during a particular phase of battle?
 *
 * This plugin grants you the ability to create a text-filled window and put it
 * on the screen without the need for a "Show Text" event. The Visual Text
 * Window will linger on the screen. It will update and/or remove itself when
 * commanded.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Place an unlimited amount of custom text Visual Text Windows anywhere on
 *   the screen for the battle and map scenes.
 * * Supports text codes.
 * * Autosize the width and height of the Visual Text Windows to fit the text
 *   you've inserted into them to make them appear clean and polished.
 * * Alter and refresh them midway through gameplay when needed.
 * * Remove them instantly or wait until after they've closed on demand.
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
 * * VisuMZ_1_MessageCore
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
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Text Window Plugin Commands ===
 * 
 * ---
 *
 * Text Window: Add/Change Settings
 * - Adds a newly created visual text window to the scene.
 * - Or changes an existing one with new settings.
 * 
 *   Required:
 *
 *     ID:
 *     - What is the ID of this Visual Text Window to be added/changed?
 *
 *     Text:
 *     - What text would you like to display here?
 *     - Text codes can be used.
 *
 *     Customized Settings:
 * 
 *       Coordinates:
 *
 *         X:
 *         Y:
 *         - What is the X/Y coordinates of this window?
 *         - You may use JavaScript code.
 *
 *         Width:
 *         Height:
 *         - What is the width/height of this window?
 *         - You may use JavaScript code. Type 'auto' to auto-size it.
 * 
 *       Alignment:
 *
 *         Horizontal:
 *         - Window alignment based on the X coordinate?
 *         - This is NOT text alignment.
 *           - left
 *           - center
 *           - right
 *
 *         Vertical:
 *         - Window alignment based on the Y coordinate?
 *         - This is NOT text alignment.
 *           - top
 *           - middle
 *           - bottom
 * 
 *       Appear:
 * 
 *         Auto-Color?
 *         - Enable Auto-Color for this Visual Text Window?
 *
 *         Type:
 *         - How does this window appear on the screen if it was closed before?
 *           - Instant - Window appears instantly
 *           - Open - Window opens up
 * 
 *       Background:
 *
 *         Type:
 *         - Select background type for this window.
 *           - Window
 *           - Dim
 *           - Transparent
 *
 *         Opacity:
 *         - What is this window's background opacity level?
 *         - You may use JavaScript code.
 *
 * ---
 *
 * Text Window: Refresh
 * - Refreshes target Visual Text Window(s) on the screen.
 *
 *   ID(s):
 *   - Refresh which Visual Text Window(s)?
 *
 * ---
 *
 * Text Window: Remove
 * - Remove target Visual Text Window(s) and its settings.
 *
 *   ID(s):
 *   - Remove which Visual Text Window(s)?
 *
 *   Removal Type:
 *   - How does this window disappear from the screen upon removal?
 *     - Instant - Window disappears instantly
 *     - Close - Window closes, then removes itself
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * There is only one Plugin Parameter setting for this plugin. The Layer
 * Position plugin parameter determines whether the Visual Text Windows appear
 * below the main scene's windows or above them.
 * 
 * The recommended setting is to have them appear below the main scene's
 * windows as to not obscure any important information.
 * 
 * If you decide to change them to the above position, be wary of how you
 * position your Visual Text Windows.
 *
 * ---
 *
 * Settings
 * 
 *   Layer Position:
 *   - Position the Visual Text Window layer above the scene's main windows or
 *     below them?
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
 * Version 1.01: March 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command option added by Yanfly:
 * *** "Text Window: Add/Change Settings" Customize Settings command now has
 *     a new option: Auto-Color?
 * **** This option allows you to enable/disable auto-color for this specific
 *      Visual Text Window.
 * 
 * Version 1.00 Official Release Date: March 3, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AddChangeVisualTextWindow
 * @text Text Window: Add/Change Settings
 * @desc Adds a newly created visual text window to the scene.
 * Or changes an existing one with new settings.
 * 
 * @arm Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this Visual Text Window to be added/changed?
 * @default 1
 *
 * @arg text:json
 * @text Text
 * @parent Required
 * @type note
 * @desc What text would you like to display here?
 * Text codes can be used.
 * @default "Hello World"
 *
 * @arg Customize:struct
 * @text Customized Settings
 * @type struct<Customize>
 * @desc Customized settings regarding this Visual Text Window.
 * @default {"Coordinates":"","x:str":"0","y:str":"0","width:str":"auto","height:str":"auto","Alignment":"","alignX:str":"left","alignY:str":"top","Appear":"","appearType:str":"open","Background":"","bgType:num":"0","opacity:eval":"192"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RefreshVisualTextWindow
 * @text Text Window: Refresh
 * @desc Refreshes target Visual Text Window(s) on the screen.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Refresh which Visual Text Window(s)?
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RemoveVisualTextWindow
 * @text Text Window: Remove
 * @desc Remove target Visual Text Window(s) and its settings.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which Visual Text Window(s)?
 * @default ["1"]
 *
 * @arg closeType:str
 * @text Removal Type
 * @type select
 * @option Instant - Window disappears instantly
 * @value instant
 * @option Close - Window closes, then removes itself
 * @value close
 * @desc How does this window disappear from the screen upon removal?
 * @default close
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
 * @param VisualTextWindows
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param VisualTextLayerPosition:str
 * @text Layer Position
 * @type select
 * @option above
 * @option below
 * @desc Position the Visual Text Window layer above the
 * scene's main windows or below them?
 * @default below
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
 * Customized Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Customize:
 * 
 * @param Coordinates
 *
 * @param x:str
 * @text X
 * @parent Coordinates
 * @desc What is the X coordinate of this window?
 * You may use JavaScript code.
 * @default 0
 *
 * @param y:str
 * @text Y
 * @parent Coordinates
 * @desc What is the Y coordinate of this window?
 * You may use JavaScript code.
 * @default 0
 *
 * @param width:str
 * @text Width
 * @parent Coordinates
 * @desc What is the width of this window? You may use JavaScript code. Type 'auto' to auto-size its width.
 * @default auto
 *
 * @param height:str
 * @text Height
 * @parent Coordinates
 * @desc What is the height of this window? You may use JavaScript code. Type 'auto' to auto-size its height.
 * @default auto
 * 
 * @param Alignment
 *
 * @param alignX:str
 * @text Horizontal
 * @parent Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Window alignment based on the X coordinate?
 * This is NOT text alignment.
 * @default left
 *
 * @param alignY:str
 * @text Vertical
 * @parent Alignment
 * @type combo
 * @option top
 * @option middle
 * @option bottom
 * @desc Window alignment based on the Y coordinate?
 * This is NOT text alignment.
 * @default top
 * 
 * @param Appear
 *
 * @param autoColor:eval
 * @text Auto-Color?
 * @parent Appear
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Auto-Color for this Visual Text Window?
 * @default false
 *
 * @param appearType:str
 * @text Type
 * @parent Appear
 * @type select
 * @option Instant - Window appears instantly
 * @value instant
 * @option Open - Window opens up
 * @value open
 * @desc How does this window appear on the screen if it was closed before?
 * @default open
 * 
 * @param Background
 *
 * @param bgType:num
 * @text Type
 * @parent Background
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Background
 * @desc What is this window's background opacity level?
 * You may use JavaScript code.
 * @default 192
 *
 */
//=============================================================================

const _0x3d2b=['10QTGUEL','below','2cVKxiq','closeType','appearType','alertVisualTextWordWrapAuto','getVisualTextWindowSettingForID','_visualTextWindowContainer','backOpacity','VisualTextWindows','resetWordWrap','setVisualTextWindowSettingForID','call','create','Game_System_initialize','opacity','301522KrAjPI','round','53777lYWBYP','_id','openness','Settings','move','calcAutoTextSize','return\x200','JSON','refreshVisualTextWindows','153tVzXkY','RefreshVisualTextWindow','createContents','40405FVQaZX','match','calcWindowHeight','initVisualTextWindowsMainMenu','open','map','name','parent','exit','includes','canShowVisualTextWindows','refreshDimmerBitmap','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_visualTextWindowLayer','removeVisualTextWindow','top','removeChild','VisuMZ_1_MessageCore','trim','176132nZDorv','toUpperCase','819NSErxP','textSizeEx','FUNC','text','ARRAYSTR','fillRect','settings','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_closing','updateBackgroundDimmer','createVisualTextWindows','fittingHeight','VisualTextLayerPosition','hasOwnProperty','selfRemoval','createVisualTextWindow','format','center','TemplateSettings','bottom','version','ARRAYFUNC','alignX','sortVisualTextWindows','529215mfUpou','status','makeDeepCopy','ConvertParams','Scene_Base_createWindowLayer','parse','_visualTextWindows','itemPadding','isSceneMap','isPlaytest','children','registerCommand','alignY','170404cgTjzB','_visualTextWindowCalc','updateNewVisualTextWindow','close','parameters','_dimmerSprite','refresh','toLowerCase','updateClose','isClosed','isSceneBattle','resize','height','addChild','filter','bitmap','isClosing','setBackgroundType','bgType','windowPadding','sort','NUM','WARNING:\x20Wordwrap\x20does\x20not\x20work\x20with\x20Visual\x20Text\x20Window\x20autosize!','getAllVisualTextWindowSettings','setFrame','AddChangeVisualTextWindow','auto','list','left','_scene','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updateSettings','max','createWindowLayer','initialize','battle','ARRAYEVAL','removeVisualTextWindows','createVisualTextWindowLayer','width','middle','description','calcWindowRect','prototype','constructor','innerWidth'];const _0x22e7=function(_0x4b6856,_0x6580a){_0x4b6856=_0x4b6856-0x1f0;let _0x3d2b60=_0x3d2b[_0x4b6856];return _0x3d2b60;};const _0x1a9db3=_0x22e7;(function(_0x432cb9,_0x6a2236){const _0x297ee6=_0x22e7;while(!![]){try{const _0x2bc831=-parseInt(_0x297ee6(0x22c))+-parseInt(_0x297ee6(0x23a))*parseInt(_0x297ee6(0x21c))+parseInt(_0x297ee6(0x274))+parseInt(_0x297ee6(0x24d))*parseInt(_0x297ee6(0x21e))+parseInt(_0x297ee6(0x22e))+parseInt(_0x297ee6(0x267))+parseInt(_0x297ee6(0x237))*-parseInt(_0x297ee6(0x24f));if(_0x2bc831===_0x6a2236)break;else _0x432cb9['push'](_0x432cb9['shift']());}catch(_0x55474e){_0x432cb9['push'](_0x432cb9['shift']());}}}(_0x3d2b,0x4315d));var label='VisualTextWindows',tier=tier||0x0,dependencies=[_0x1a9db3(0x24b)],pluginData=$plugins[_0x1a9db3(0x1fc)](function(_0x422d06){const _0x5183ca=_0x1a9db3;return _0x422d06[_0x5183ca(0x268)]&&_0x422d06[_0x5183ca(0x217)][_0x5183ca(0x243)]('['+label+']');})[0x0];VisuMZ[label][_0x1a9db3(0x231)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1a9db3(0x26a)]=function(_0x5ea029,_0xf7def){const _0xd68f6d=_0x1a9db3;for(const _0x177546 in _0xf7def){if(_0x177546['match'](/(.*):(.*)/i)){const _0x30498e=String(RegExp['$1']),_0x48648e=String(RegExp['$2'])[_0xd68f6d(0x24e)]()[_0xd68f6d(0x24c)]();let _0x147637,_0x159b59,_0x43fa2a;switch(_0x48648e){case _0xd68f6d(0x203):_0x147637=_0xf7def[_0x177546]!==''?Number(_0xf7def[_0x177546]):0x0;break;case'ARRAYNUM':_0x159b59=_0xf7def[_0x177546]!==''?JSON['parse'](_0xf7def[_0x177546]):[],_0x147637=_0x159b59[_0xd68f6d(0x23f)](_0x154616=>Number(_0x154616));break;case'EVAL':_0x147637=_0xf7def[_0x177546]!==''?eval(_0xf7def[_0x177546]):null;break;case _0xd68f6d(0x212):_0x159b59=_0xf7def[_0x177546]!==''?JSON['parse'](_0xf7def[_0x177546]):[],_0x147637=_0x159b59['map'](_0x3bc8d6=>eval(_0x3bc8d6));break;case _0xd68f6d(0x235):_0x147637=_0xf7def[_0x177546]!==''?JSON[_0xd68f6d(0x26c)](_0xf7def[_0x177546]):'';break;case'ARRAYJSON':_0x159b59=_0xf7def[_0x177546]!==''?JSON[_0xd68f6d(0x26c)](_0xf7def[_0x177546]):[],_0x147637=_0x159b59[_0xd68f6d(0x23f)](_0x3e0888=>JSON['parse'](_0x3e0888));break;case _0xd68f6d(0x251):_0x147637=_0xf7def[_0x177546]!==''?new Function(JSON['parse'](_0xf7def[_0x177546])):new Function(_0xd68f6d(0x234));break;case _0xd68f6d(0x264):_0x159b59=_0xf7def[_0x177546]!==''?JSON[_0xd68f6d(0x26c)](_0xf7def[_0x177546]):[],_0x147637=_0x159b59['map'](_0x6b13a9=>new Function(JSON['parse'](_0x6b13a9)));break;case'STR':_0x147637=_0xf7def[_0x177546]!==''?String(_0xf7def[_0x177546]):'';break;case _0xd68f6d(0x253):_0x159b59=_0xf7def[_0x177546]!==''?JSON[_0xd68f6d(0x26c)](_0xf7def[_0x177546]):[],_0x147637=_0x159b59[_0xd68f6d(0x23f)](_0x4db80b=>String(_0x4db80b));break;case'STRUCT':_0x43fa2a=_0xf7def[_0x177546]!==''?JSON[_0xd68f6d(0x26c)](_0xf7def[_0x177546]):{},_0x147637=VisuMZ[_0xd68f6d(0x26a)]({},_0x43fa2a);break;case'ARRAYSTRUCT':_0x159b59=_0xf7def[_0x177546]!==''?JSON[_0xd68f6d(0x26c)](_0xf7def[_0x177546]):[],_0x147637=_0x159b59[_0xd68f6d(0x23f)](_0x5512f2=>VisuMZ[_0xd68f6d(0x26a)]({},JSON[_0xd68f6d(0x26c)](_0x5512f2)));break;default:continue;}_0x5ea029[_0x30498e]=_0x147637;}}return _0x5ea029;},(_0x62f1=>{const _0x1edfbf=_0x1a9db3,_0x5548ba=_0x62f1[_0x1edfbf(0x240)];for(const _0x55a302 of dependencies){if(!Imported[_0x55a302]){alert(_0x1edfbf(0x256)[_0x1edfbf(0x25f)](_0x5548ba,_0x55a302)),SceneManager[_0x1edfbf(0x242)]();break;}}const _0x28e40e=_0x62f1['description'];if(_0x28e40e[_0x1edfbf(0x23b)](/\[Version[ ](.*?)\]/i)){const _0x1310b2=Number(RegExp['$1']);_0x1310b2!==VisuMZ[label][_0x1edfbf(0x263)]&&(alert(_0x1edfbf(0x20c)[_0x1edfbf(0x25f)](_0x5548ba,_0x1310b2)),SceneManager[_0x1edfbf(0x242)]());}if(_0x28e40e[_0x1edfbf(0x23b)](/\[Tier[ ](\d+)\]/i)){const _0x45f1d2=Number(RegExp['$1']);_0x45f1d2<tier?(alert(_0x1edfbf(0x246)[_0x1edfbf(0x25f)](_0x5548ba,_0x45f1d2,tier)),SceneManager[_0x1edfbf(0x242)]()):tier=Math[_0x1edfbf(0x20e)](_0x45f1d2,tier);}VisuMZ[_0x1edfbf(0x26a)](VisuMZ[label]['Settings'],_0x62f1[_0x1edfbf(0x1f2)]);})(pluginData),VisuMZ[_0x1a9db3(0x225)][_0x1a9db3(0x261)]=function(){const _0x5c9395=_0x1a9db3;return{'id':0x0,'text':'','x':'0','y':'0','width':_0x5c9395(0x208),'height':_0x5c9395(0x208),'alignX':_0x5c9395(0x20a),'alignY':_0x5c9395(0x249),'appearType':_0x5c9395(0x23e),'bgType':0x0,'opacity':0xc0};},PluginManager[_0x1a9db3(0x272)](pluginData[_0x1a9db3(0x240)],_0x1a9db3(0x207),_0x398af3=>{const _0xc70265=_0x1a9db3;VisuMZ['ConvertParams'](_0x398af3,_0x398af3);if(_0x398af3['id']<=0x0)return;let _0x3248ed=JsonEx[_0xc70265(0x269)](_0x398af3['Customize']);if(!_0x3248ed[_0xc70265(0x25c)](_0xc70265(0x215)))_0x3248ed=VisuMZ['VisualTextWindows'][_0xc70265(0x261)]();_0x3248ed['id']=_0x398af3['id'],_0x3248ed[_0xc70265(0x252)]=_0x398af3['text'],$gameSystem[_0xc70265(0x227)](_0x3248ed);}),PluginManager[_0x1a9db3(0x272)](pluginData[_0x1a9db3(0x240)],_0x1a9db3(0x238),_0x14c1fb=>{const _0x42109c=_0x1a9db3;VisuMZ['ConvertParams'](_0x14c1fb,_0x14c1fb);const _0x439b76=_0x14c1fb[_0x42109c(0x209)]||[];SceneManager['_scene']['refreshVisualTextWindows']&&SceneManager[_0x42109c(0x20b)]['refreshVisualTextWindows'](_0x439b76);}),PluginManager[_0x1a9db3(0x272)](pluginData[_0x1a9db3(0x240)],'RemoveVisualTextWindow',_0x1c7560=>{const _0x2744df=_0x1a9db3;VisuMZ[_0x2744df(0x26a)](_0x1c7560,_0x1c7560);const _0x3288f5=_0x1c7560['list']||[],_0x4402e9=_0x1c7560[_0x2744df(0x21f)];for(const _0x2009aa of _0x3288f5){$gameSystem[_0x2744df(0x248)](_0x2009aa);}SceneManager[_0x2744df(0x20b)][_0x2744df(0x213)]&&SceneManager['_scene'][_0x2744df(0x213)](_0x3288f5,_0x4402e9);}),SceneManager[_0x1a9db3(0x1f8)]=function(){const _0x2ed080=_0x1a9db3;return this['_scene']&&this[_0x2ed080(0x20b)][_0x2ed080(0x21a)]===Scene_Battle;},SceneManager[_0x1a9db3(0x26f)]=function(){const _0x2a7e80=_0x1a9db3;return this['_scene']&&this['_scene'][_0x2a7e80(0x21a)]===Scene_Map;},VisuMZ[_0x1a9db3(0x225)]['Game_System_initialize']=Game_System[_0x1a9db3(0x219)][_0x1a9db3(0x210)],Game_System[_0x1a9db3(0x219)][_0x1a9db3(0x210)]=function(){const _0x4047e8=_0x1a9db3;VisuMZ['VisualTextWindows'][_0x4047e8(0x22a)][_0x4047e8(0x228)](this),this[_0x4047e8(0x23d)]();},Game_System[_0x1a9db3(0x219)][_0x1a9db3(0x23d)]=function(){const _0x12b9a0=_0x1a9db3;this[_0x12b9a0(0x26d)]={'battle':[null],'map':[null]};},Game_System[_0x1a9db3(0x219)][_0x1a9db3(0x205)]=function(){const _0x597f74=_0x1a9db3;this['_visualTextWindows']===undefined&&this[_0x597f74(0x23d)]();if(SceneManager[_0x597f74(0x1f8)]())return this[_0x597f74(0x26d)][_0x597f74(0x211)][_0x597f74(0x1fc)](_0x2e197c=>!!_0x2e197c);else return SceneManager['isSceneMap']()?this[_0x597f74(0x26d)]['map']['filter'](_0x2919fe=>!!_0x2919fe):[];},Game_System[_0x1a9db3(0x219)][_0x1a9db3(0x222)]=function(_0x5923d8){const _0x5544e9=_0x1a9db3;this[_0x5544e9(0x26d)]===undefined&&this[_0x5544e9(0x23d)]();if(SceneManager['isSceneBattle']())return this[_0x5544e9(0x26d)]['battle'][_0x5923d8];else return SceneManager[_0x5544e9(0x26f)]()?this[_0x5544e9(0x26d)]['map'][_0x5923d8]:null;},Game_System[_0x1a9db3(0x219)][_0x1a9db3(0x227)]=function(_0x9bd506){const _0x58220d=_0x1a9db3;this[_0x58220d(0x26d)]===undefined&&this[_0x58220d(0x23d)]();if(!_0x9bd506['id'])return;if(_0x9bd506['id']<=0x0)return;const _0x156fcb=_0x9bd506['id'];if(SceneManager[_0x58220d(0x1f8)]())this[_0x58220d(0x26d)][_0x58220d(0x211)][_0x156fcb]=_0x9bd506;else SceneManager[_0x58220d(0x26f)]()&&(this['_visualTextWindows'][_0x58220d(0x23f)][_0x156fcb]=_0x9bd506);const _0xc28d2f=SceneManager[_0x58220d(0x20b)];_0xc28d2f&&_0xc28d2f[_0x58220d(0x244)]()&&_0xc28d2f[_0x58220d(0x1f0)](_0x156fcb);},Game_System['prototype'][_0x1a9db3(0x248)]=function(_0x5da7ae){const _0x3553f9=_0x1a9db3;this[_0x3553f9(0x26d)]===undefined&&this[_0x3553f9(0x23d)]();if(_0x5da7ae<=0x0)return;if(SceneManager[_0x3553f9(0x1f8)]())delete this['_visualTextWindows']['battle'][_0x5da7ae];else SceneManager['isSceneMap']()&&delete this[_0x3553f9(0x26d)][_0x3553f9(0x23f)][_0x5da7ae];},VisuMZ[_0x1a9db3(0x225)]['Scene_Base_createWindowLayer']=Scene_Base[_0x1a9db3(0x219)][_0x1a9db3(0x20f)],Scene_Base['prototype'][_0x1a9db3(0x20f)]=function(){const _0xbb16d8=_0x1a9db3,_0x42cdfd=VisuMZ[_0xbb16d8(0x225)]['Settings'][_0xbb16d8(0x25b)];if(_0x42cdfd===_0xbb16d8(0x21d))this[_0xbb16d8(0x214)]();VisuMZ[_0xbb16d8(0x225)][_0xbb16d8(0x26b)]['call'](this);if(_0x42cdfd==='above')this[_0xbb16d8(0x214)]();},Scene_Base['prototype']['createVisualTextWindowLayer']=function(){},Scene_Base['prototype'][_0x1a9db3(0x244)]=function(){return![];},Scene_Message[_0x1a9db3(0x219)][_0x1a9db3(0x214)]=function(){const _0x52474d=_0x1a9db3;Scene_Base[_0x52474d(0x219)]['createVisualTextWindowLayer'][_0x52474d(0x228)](this);const _0x1c39f0=new Rectangle(0x0,0x0,0x0,0x0);this[_0x52474d(0x275)]=new Window_Base(_0x1c39f0),this[_0x52474d(0x223)]=[],this[_0x52474d(0x247)]=new Sprite(),this[_0x52474d(0x1fb)](this[_0x52474d(0x247)]),this[_0x52474d(0x259)](),this[_0x52474d(0x266)]();},Scene_Message[_0x1a9db3(0x219)][_0x1a9db3(0x244)]=function(){return!![];},Scene_Message[_0x1a9db3(0x219)]['createVisualTextWindows']=function(){const _0x503fbc=_0x1a9db3,_0x59c214=$gameSystem[_0x503fbc(0x205)]();for(const _0x4e86ab of _0x59c214){if(!_0x4e86ab)continue;this[_0x503fbc(0x25e)](_0x4e86ab['id']);}},Scene_Message['prototype'][_0x1a9db3(0x25e)]=function(_0x1cfc2b){const _0x4f874f=_0x1a9db3,_0x49b290=new Window_VisualText(_0x1cfc2b);this[_0x4f874f(0x247)][_0x4f874f(0x1fb)](_0x49b290),this[_0x4f874f(0x223)][_0x1cfc2b]=_0x49b290;},Scene_Message[_0x1a9db3(0x219)]['sortVisualTextWindows']=function(){const _0x5d4c2d=_0x1a9db3;this[_0x5d4c2d(0x247)][_0x5d4c2d(0x271)][_0x5d4c2d(0x202)]((_0x8a298f,_0x382f51)=>_0x8a298f['_id']-_0x382f51[_0x5d4c2d(0x22f)]);},Scene_Message['prototype'][_0x1a9db3(0x1f0)]=function(_0x295f30){const _0x30e4c6=_0x1a9db3;this[_0x30e4c6(0x223)][_0x295f30]?this[_0x30e4c6(0x223)][_0x295f30]['updateSettings']():(this['createVisualTextWindow'](_0x295f30),this[_0x30e4c6(0x266)]());},Scene_Message['prototype'][_0x1a9db3(0x236)]=function(_0x16d62f){const _0x1154ea=_0x1a9db3;for(const _0x3e16e7 of _0x16d62f){const _0x520c81=this[_0x1154ea(0x223)][_0x3e16e7];_0x520c81&&_0x520c81[_0x1154ea(0x20d)]();}},Scene_Message[_0x1a9db3(0x219)]['removeVisualTextWindows']=function(_0x253041,_0x48a3b0){const _0x58857a=_0x1a9db3;for(const _0x1e0c56 of _0x253041){const _0x43d7e5=this[_0x58857a(0x223)][_0x1e0c56];_0x43d7e5&&(_0x43d7e5['selfRemoval'](_0x48a3b0),delete this[_0x58857a(0x223)][_0x1e0c56]);}};function Window_VisualText(){this['initialize'](...arguments);}Window_VisualText['prototype']=Object[_0x1a9db3(0x229)](Window_Base[_0x1a9db3(0x219)]),Window_VisualText['prototype'][_0x1a9db3(0x21a)]=Window_VisualText,Window_VisualText['prototype']['initialize']=function(_0x5210e7){const _0x4cab0b=_0x1a9db3;this['_id']=_0x5210e7,Window_Base['prototype'][_0x4cab0b(0x210)]['call'](this,new Rectangle(0x0,0x0,0x0,0x0)),this[_0x4cab0b(0x230)]=0x0,this[_0x4cab0b(0x20d)]();},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x255)]=function(){const _0x1944e7=_0x1a9db3;return $gameSystem[_0x1944e7(0x222)](this['_id']);},Window_VisualText[_0x1a9db3(0x219)]['isAutoColorAffected']=function(){const _0x1e330c=_0x1a9db3;return this[_0x1e330c(0x255)]()['autoColor'];},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x23c)]=function(_0x3214b7,_0x193a2f){const _0x5d6221=_0x1a9db3;return _0x193a2f?Window_Selectable[_0x5d6221(0x219)][_0x5d6221(0x25a)](_0x3214b7):Window_Base[_0x5d6221(0x219)][_0x5d6221(0x25a)](_0x3214b7);},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x218)]=function(){const _0x2a9f56=_0x1a9db3,_0xe6ff2e=JsonEx['makeDeepCopy'](this[_0x2a9f56(0x255)]()),_0xfbdcaf=_0xe6ff2e['text'][_0x2a9f56(0x23b)](/<WORDWRAP>/i),_0x493f56=this['calcAutoTextSize']();let _0x339301=0x0,_0x13828b=0x0,_0x138d85=0x0,_0x3c4b3f=0x0;_0xe6ff2e[_0x2a9f56(0x215)][_0x2a9f56(0x1f5)]()[_0x2a9f56(0x24c)]()==='auto'?(_0x138d85=_0xfbdcaf?Graphics[_0x2a9f56(0x215)]:_0x493f56[_0x2a9f56(0x215)],_0xfbdcaf&&!$gameTemp[_0x2a9f56(0x221)]&&($gameTemp[_0x2a9f56(0x221)]=!![],$gameTemp[_0x2a9f56(0x270)]()&&alert(_0x2a9f56(0x204)))):_0x138d85=eval(_0xe6ff2e[_0x2a9f56(0x215)]);_0xe6ff2e[_0x2a9f56(0x1fa)][_0x2a9f56(0x1f5)]()[_0x2a9f56(0x24c)]()===_0x2a9f56(0x208)?(_0x3c4b3f=_0xfbdcaf?Graphics['height']:_0x493f56['height'],_0xfbdcaf&&!$gameTemp[_0x2a9f56(0x221)]&&($gameTemp[_0x2a9f56(0x221)]=!![],$gameTemp[_0x2a9f56(0x270)]()&&alert(_0x2a9f56(0x204)))):_0x3c4b3f=eval(_0xe6ff2e['height']);_0x339301=Math[_0x2a9f56(0x22d)](eval(_0xe6ff2e['x'])||0x0),_0x13828b=Math[_0x2a9f56(0x22d)](eval(_0xe6ff2e['y'])||0x0),_0x138d85=Math[_0x2a9f56(0x22d)](_0x138d85||0x0),_0x3c4b3f=Math[_0x2a9f56(0x22d)](_0x3c4b3f||0x0);if(_0xe6ff2e['alignX']===_0x2a9f56(0x260))_0x339301-=Math['round'](_0x138d85/0x2);else _0xe6ff2e[_0x2a9f56(0x265)]==='right'&&(_0x339301-=_0x138d85);if(_0xe6ff2e[_0x2a9f56(0x273)]===_0x2a9f56(0x216))_0x13828b-=Math['round'](_0x3c4b3f/0x2);else _0xe6ff2e['alignY']===_0x2a9f56(0x262)&&(_0x13828b-=_0x3c4b3f);const _0x36529c=new Rectangle(_0x339301,_0x13828b,_0x138d85,_0x3c4b3f);return _0x36529c;},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x233)]=function(){const _0x5d63a3=_0x1a9db3,_0x408d88=SceneManager[_0x5d63a3(0x20b)][_0x5d63a3(0x275)];_0x408d88[_0x5d63a3(0x226)]();const _0x126428=JsonEx[_0x5d63a3(0x269)](this[_0x5d63a3(0x255)]()),_0x1242fb=_0x408d88[_0x5d63a3(0x250)](_0x126428[_0x5d63a3(0x252)][_0x5d63a3(0x24c)]());return _0x1242fb[_0x5d63a3(0x215)]+=(this[_0x5d63a3(0x26e)]()+$gameSystem[_0x5d63a3(0x201)]())*0x2,_0x1242fb[_0x5d63a3(0x1fa)]+=$gameSystem['windowPadding']()*0x2,_0x1242fb;},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x20d)]=function(){const _0x18cd68=_0x1a9db3,_0x529367=this['calcWindowRect']();this[_0x18cd68(0x232)](_0x529367['x'],_0x529367['y'],_0x529367[_0x18cd68(0x215)],_0x529367[_0x18cd68(0x1fa)]);const _0x23130b=this[_0x18cd68(0x255)]();this['opacity']=_0x23130b[_0x18cd68(0x22b)],this[_0x18cd68(0x224)]=_0x23130b[_0x18cd68(0x22b)],this[_0x18cd68(0x1ff)](_0x23130b[_0x18cd68(0x200)]);if(this[_0x18cd68(0x1f3)])this[_0x18cd68(0x1f3)][_0x18cd68(0x22b)]=_0x23130b[_0x18cd68(0x22b)];this['refresh'](),this['openness']<0xff&&!this[_0x18cd68(0x1fe)]()&&(_0x23130b[_0x18cd68(0x220)]===_0x18cd68(0x23e)?this['open']():this[_0x18cd68(0x230)]=0xff);},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x1f4)]=function(){const _0x11c81f=_0x1a9db3;this[_0x11c81f(0x239)]();const _0x17dd37=this[_0x11c81f(0x255)]();if(!_0x17dd37)return;const _0x4f0bcd=this[_0x11c81f(0x21b)]-this['itemPadding']()*0x2;this['drawTextEx'](_0x17dd37['text'],this[_0x11c81f(0x26e)](),0x0,_0x4f0bcd);},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x245)]=function(){const _0x51d5d8=_0x1a9db3;if(this[_0x51d5d8(0x1f3)]){const _0x5a2d0f=this[_0x51d5d8(0x1f3)][_0x51d5d8(0x1fd)],_0x37479f=this[_0x51d5d8(0x215)],_0x4fd084=this[_0x51d5d8(0x1fa)],_0x38aed4=ColorManager['dimColor1']();_0x5a2d0f[_0x51d5d8(0x1f9)](_0x37479f,_0x4fd084),_0x5a2d0f[_0x51d5d8(0x254)](0x0,0x0,_0x37479f,_0x4fd084,_0x38aed4),this[_0x51d5d8(0x1f3)][_0x51d5d8(0x206)](0x0,0x0,_0x37479f,_0x4fd084);}},Window_VisualText['prototype'][_0x1a9db3(0x258)]=function(){},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x25d)]=function(_0xc9064f){const _0x8f57bb=_0x1a9db3;_0xc9064f==='instant'&&(this[_0x8f57bb(0x230)]=0x1),this[_0x8f57bb(0x1f1)]();},Window_VisualText[_0x1a9db3(0x219)][_0x1a9db3(0x1f6)]=function(){const _0x58e60a=_0x1a9db3;this[_0x58e60a(0x257)]&&(this['openness']-=0x20,this[_0x58e60a(0x1f7)]()&&(this['_closing']=![],this['completeRemoval']()));},Window_VisualText[_0x1a9db3(0x219)]['completeRemoval']=function(){const _0x35e5e0=_0x1a9db3;if(!this['parent'])return;this[_0x35e5e0(0x241)][_0x35e5e0(0x24a)](this);};
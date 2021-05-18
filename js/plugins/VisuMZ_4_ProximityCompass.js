//=============================================================================
// VisuStella MZ - Proximity Compass
// VisuMZ_4_ProximityCompass.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ProximityCompass = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ProximityCompass = VisuMZ.ProximityCompass || {};
VisuMZ.ProximityCompass.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [ProximityCompass]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Proximity_Compass_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that adds a compass to the map screen, marking
 * the position of nearby events and the directions of far away events. Events
 * are represented by icons from the icon set. This can be used to help the
 * player locate objectives, points of interests, NPCs, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Places a compass on the main map screen.
 * * Said compass will show the marked events on it with icons.
 * * Marked events will move around the compass relative to the player's
 *   current position on the map.
 * * Fade out marked events that are too far from the player's location.
 * * The compass can be turned on/off in the Options menu.
 * * The compass can also be resized in the Options menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * ---
 * 
 * === Proximity Compass Notetags and Comment Tags ===
 * 
 * ---
 *
 * <Hide Compass>
 *
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the compass to show.
 *
 * ---
 *
 * <Compass Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will assign an icon to the event or the event's page.
 * - Replace 'x' with a number representing the icon index you wish for this
 *   event or event page to appear as in the Proximity Compass.
 *
 * ---
 *
 * <Compass Proximity: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear on the compass if the player is within range.
 * - Replace 'x' with the number of tiles the player must be within range of
 *   this event or event page in order to appear in the Proximity Compass.
 *
 * ---
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
 * Compass: Show/Hide Proximity Compass
 * - Show or hide the Proximity Compass.
 * - Does not bypass user settings.
 *
 *   Setting:
 *   - Show or hide the Proximity Compass.
 *   - Does not bypass user settings.
 *
 * ---
 *
 * Compass: Change Player Icon
 * - Change the player icon to a different icon.
 *
 *   Icon Index:
 *   - This is the icon you wish to change the player icon to.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * Default settings used for the Proximity Compass.
 *
 * ---
 *
 * Default
 * 
 *   Show by Default:
 *   - Show the Proximity Compass by default?
 * 
 *   Proximity Range:
 *   - Default range from the player to be shown on the Proximity Compass.
 * 
 *   Player Icon:
 *   - Icon used for the player to show on the Proximity Compass.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compass Settings
 * ============================================================================
 *
 * Compass settings used for the Proximity Compass.
 *
 * ---
 *
 * Position
 * 
 *   Center X:
 *   - Code used to calculate the X position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 * 
 *   Center Y:
 *   - Code used to calculate the Y position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 *
 * ---
 *
 * Contents
 * 
 *   Filename:
 *   - The picture used for the compass' frame.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Radius:
 *   - Radius of the Proximity Compass in pixels.
 * 
 *   Tile Scale:
 *   - The scale used to calculate the distance of a tile relative to the
 *     distance on the compass
 * 
 *   Back Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Back Opacity:
 *   - Sets the opacity of the back color.
 *
 * ---
 *
 * Fading
 * 
 *   Compass Fade Speed:
 *   - Fade speed of the compass when toggled on/off.
 *   - Lower is slower. Higher is faster.
 * 
 *   Icon Fade Speed:
 *   - Fade speed of the icons when out of range.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Hiding
 * 
 *   Hide During Messages:
 *   - If true, hide compass whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide compass whenever an event is running.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for the Proximity Compass.
 *
 * ---
 *
 * Options
 * 
 *   Add Show Option?:
 *   - Add the 'Show Compass' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Size Option?:
 *   - Add the 'Compass Size' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
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
 * Version 1.00: October 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassVisibility
 * @text Compass: Show/Hide Proximity Compass
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 *
 * @arg value:eval
 * @text Setting
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassPlayerIcon
 * @text Compass: Change Player Icon
 * @desc Change the player icon to a different icon.
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @desc This is the icon you wish to change the player icon to.
 * @default 82
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
 * @param ProximityCompass
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Default:struct
 * @text Default Settings
 * @type struct<Default>
 * @desc Default settings used for the Proximity Compass.
 * @default {"Show:eval":"true","Proximity:num":"1000","PlayerIcon:num":"82"}
 *
 * @param Compass:struct
 * @text Compass Settings
 * @type struct<Compass>
 * @desc Compass settings used for the Proximity Compass.
 * @default {"Position":"","CenterX:str":"Graphics.width - 128 * ConfigManager.compassSize / 100","CenterY:str":"Graphics.height - 128 * ConfigManager.compassSize / 100","Contents":"","Filename:str":"","Radius:num":"100","TileScale:num":"0.25","BackColor:str":"#000000","BackOpacity:num":"200","Fading":"","CompassFadeSpeed:num":"16","IconFadeSpeed:num":"16","Hiding":"","HideMessage:eval":"false","HideEvents:eval":"false"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for the Proximity Compass.
 * @default {"AddShowOption:eval":"true","ShowName:str":"Show Compass","AddSizeOption:eval":"true","SizeName:str":"Compass Size","AdjustRect:eval":"true"}
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
 * Default Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Show:eval
 * @text Show by Default
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Proximity Compass by default?
 * @default true
 *
 * @param Proximity:num
 * @text Proximity Range
 * @type Number
 * @min 1
 * @max 1000
 * @desc Default range from the player to be shown on the Proximity Compass.
 * @default 1000
 *
 * @param PlayerIcon:num
 * @text Player Icon
 * @desc Icon used for the player to show on the Proximity Compass.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Compass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compass:
 *
 * @param Position
 *
 * @param CenterX:str
 * @text Center X
 * @parent Position
 * @desc Code used to calculate the X position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.width - 128 * ConfigManager.compassSize / 100
 *
 * @param CenterY:str
 * @text Center Y
 * @parent Position
 * @desc Code used to calculate the Y position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.height - 128 * ConfigManager.compassSize / 100
 *
 * @param Contents
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc The picture used for the compass' frame.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param Radius:num
 * @text Radius
 * @parent Contents
 * @type Number
 * @min 1
 * @desc Radius of the Proximity Compass in pixels.
 * @default 100
 *
 * @param TileScale:num
 * @text Tile Scale
 * @parent Contents
 * @desc The scale used to calculate the distance of a tile relative to the distance on the compass
 * @default 0.25
 *
 * @param BackColor:str
 * @text Back Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #000000
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the back color.
 * @default 200
 *
 * @param Fading
 *
 * @param CompassFadeSpeed:num
 * @text Compass Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the compass when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param IconFadeSpeed:num
 * @text Icon Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the icons when out of range.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Hiding
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever a message is being displayed.
 * @default false
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever an event is running.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddShowOption:eval
 * @text Add Show Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Compass' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Compass
 *
 * @param AddSizeOption:eval
 * @text Add Size Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Compass Size' option to the Options menu?
 * @default true
 *
 * @param SizeName:str
 * @text Option Name
 * @parent AddSizeOption:eval
 * @desc Command name of the option.
 * @default Compass Size
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 */
//=============================================================================

const _0x4eae=['_realY','Show','deltaX','maxCommands','isSceneMap','Game_Event_setupPageSettings','exit','paintOpacity','checkProximityCompassStringTags','clamp','refresh','setupPageSettings','pjrIC','loadSystem','round','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','LBFlk','isShowProximityCompass','iconIndex','setPlayerCompassIcon','ARRAYSTR','_showProximityCompass','XwvQo','hnqgR','addGeneralOptions','max','_ProximityCompassFrameSprite','addProximityCompassSizeCommand','jLXKB','AddShowOption','prototype','_playerCompassIcon','Scene_Map_createSpriteset','CSoDR','return\x200','AddSizeOption','BackOpacity','description','applyData','setInitialOpacity','includes','drawCircle','registerCommand','createSpriteset','iconHeight','setupProximityCompassNotetags','PEieM','JSON','isBusy','constructor','CompassVisibility','update','changeProximityCompassSize','hideCompass','ConfigManager_makeData','trim','loadPicture','_character','tileHeight','HideMessage','ARRAYNUM','zbmJb','TileScale','vhgRs','setShowProximityCompass','showCompass','Filename','Nboud','loadBitmap','call','Options','Window_Options_isVolumeSymbol','qgXgN','blendMode','SrSVE','format','tafzx','CenterX','event','_emptyBitmap','length','ConfigManager_applyData','anchor','atan2','Game_Event_clearPageSettings','EVAL','dEmoL','createCharacters','setupProximityCompassEffects','PlayerIcon','setupProximityCompassCommentTags','floor','Compass','create','createFrame','CPDsp','changeValue','isVolumeSymbol','Game_Event_refresh','lsXwN','YKYWP','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','lMpdh','isEventOverloaded','iconWidth','CenterY','jbFHo','ConvertParams','changeVolume','clearPageSettings','initProximityCompassEffects','sqrt','getConfigValue','opacity','addCommand','PtQer','code','compassSize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','HideEvents','contains','_compassIconIndex','IconFadeSpeed','value','Game_System_initialize','TLVcU','match','isCloseToCompassScreenPosition','IconSet','push','zzEaB','Window_Options_changeVolume','cos','VhNUe','parameters','Default','Window_Options_addGeneralOptions','qjjrc','apply','CompassFadeSpeed','_ProximityCompassBackgroundSprite','GRcKc','IrNys','JxGRG','Settings','events','addChild','hpfYk','ORaKf','updatePosition','screenY','bitmap','Scene_Options_maxCommands','_characterSprites','abs','scale','Radius','version','status','FUNC','initialize','STRUCT','_iconIndex','parse','note','ARRAYFUNC','setFrame','_scene','createSprites','yjHRH','addProximityCompassCommands','filter','SizeName','isShow','map','_compassProximity','_realX','ProximityCompass','_eventOverload','QtIQI','makeData','sin','page','updateOpacity','isEventRunning','MQUUa','initializeProximityCompass','createBackground','NUM','MytQB','name'];(function(_0x362a56,_0x4eaefa){const _0x5f34c8=function(_0x1efd7e){while(--_0x1efd7e){_0x362a56['push'](_0x362a56['shift']());}};_0x5f34c8(++_0x4eaefa);}(_0x4eae,0x199));const _0x5f34=function(_0x362a56,_0x4eaefa){_0x362a56=_0x362a56-0x0;let _0x5f34c8=_0x4eae[_0x362a56];return _0x5f34c8;};const _0x45f186=_0x5f34;var label=_0x45f186('0x96'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x45f186('0x90')](function(_0x5cdab2){const _0x413d7f=_0x45f186;return _0x5cdab2[_0x413d7f('0x83')]&&_0x5cdab2[_0x413d7f('0xa')][_0x413d7f('0xd')]('['+label+']');})[0x0];VisuMZ[label][_0x45f186('0x75')]=VisuMZ[label][_0x45f186('0x75')]||{},VisuMZ[_0x45f186('0x50')]=function(_0x229ca9,_0x58668b){const _0x44df2e=_0x45f186;for(const _0x4fdbc5 in _0x58668b){if(_0x4fdbc5[_0x44df2e('0x63')](/(.*):(.*)/i)){const _0x3dd38b=String(RegExp['$1']),_0x138710=String(RegExp['$2'])['toUpperCase']()[_0x44df2e('0x1c')]();let _0x1a8992,_0x26a879,_0xad98f3;switch(_0x138710){case _0x44df2e('0xa1'):_0x1a8992=_0x58668b[_0x4fdbc5]!==''?Number(_0x58668b[_0x4fdbc5]):0x0;break;case _0x44df2e('0x21'):_0x26a879=_0x58668b[_0x4fdbc5]!==''?JSON['parse'](_0x58668b[_0x4fdbc5]):[],_0x1a8992=_0x26a879[_0x44df2e('0x93')](_0xb635fe=>Number(_0xb635fe));break;case _0x44df2e('0x3a'):_0x1a8992=_0x58668b[_0x4fdbc5]!==''?eval(_0x58668b[_0x4fdbc5]):null;break;case'ARRAYEVAL':_0x26a879=_0x58668b[_0x4fdbc5]!==''?JSON['parse'](_0x58668b[_0x4fdbc5]):[],_0x1a8992=_0x26a879[_0x44df2e('0x93')](_0x57338a=>eval(_0x57338a));break;case _0x44df2e('0x14'):_0x1a8992=_0x58668b[_0x4fdbc5]!==''?JSON[_0x44df2e('0x88')](_0x58668b[_0x4fdbc5]):'';break;case'ARRAYJSON':_0x26a879=_0x58668b[_0x4fdbc5]!==''?JSON['parse'](_0x58668b[_0x4fdbc5]):[],_0x1a8992=_0x26a879[_0x44df2e('0x93')](_0x3707f3=>JSON[_0x44df2e('0x88')](_0x3707f3));break;case _0x44df2e('0x84'):_0x1a8992=_0x58668b[_0x4fdbc5]!==''?new Function(JSON['parse'](_0x58668b[_0x4fdbc5])):new Function(_0x44df2e('0x7'));break;case _0x44df2e('0x8a'):_0x26a879=_0x58668b[_0x4fdbc5]!==''?JSON[_0x44df2e('0x88')](_0x58668b[_0x4fdbc5]):[],_0x1a8992=_0x26a879[_0x44df2e('0x93')](_0x2c4267=>new Function(JSON[_0x44df2e('0x88')](_0x2c4267)));break;case'STR':_0x1a8992=_0x58668b[_0x4fdbc5]!==''?String(_0x58668b[_0x4fdbc5]):'';break;case _0x44df2e('0xb8'):_0x26a879=_0x58668b[_0x4fdbc5]!==''?JSON[_0x44df2e('0x88')](_0x58668b[_0x4fdbc5]):[],_0x1a8992=_0x26a879[_0x44df2e('0x93')](_0x20f648=>String(_0x20f648));break;case _0x44df2e('0x86'):_0xad98f3=_0x58668b[_0x4fdbc5]!==''?JSON[_0x44df2e('0x88')](_0x58668b[_0x4fdbc5]):{},_0x1a8992=VisuMZ[_0x44df2e('0x50')]({},_0xad98f3);break;case'ARRAYSTRUCT':_0x26a879=_0x58668b[_0x4fdbc5]!==''?JSON[_0x44df2e('0x88')](_0x58668b[_0x4fdbc5]):[],_0x1a8992=_0x26a879[_0x44df2e('0x93')](_0x85f271=>VisuMZ[_0x44df2e('0x50')]({},JSON[_0x44df2e('0x88')](_0x85f271)));break;default:continue;}_0x229ca9[_0x3dd38b]=_0x1a8992;}}return _0x229ca9;},(_0x260d68=>{const _0x37f0e7=_0x45f186,_0x58034d=_0x260d68[_0x37f0e7('0xa3')];for(const _0x378be3 of dependencies){if(!Imported[_0x378be3]){alert(_0x37f0e7('0x4a')[_0x37f0e7('0x30')](_0x58034d,_0x378be3)),SceneManager['exit']();break;}}const _0x14e0b=_0x260d68[_0x37f0e7('0xa')];if(_0x14e0b[_0x37f0e7('0x63')](/\[Version[ ](.*?)\]/i)){const _0x1d9270=Number(RegExp['$1']);_0x1d9270!==VisuMZ[label][_0x37f0e7('0x82')]&&(alert(_0x37f0e7('0xb3')[_0x37f0e7('0x30')](_0x58034d,_0x1d9270)),SceneManager['exit']());}if(_0x14e0b[_0x37f0e7('0x63')](/\[Tier[ ](\d+)\]/i)){if(_0x37f0e7('0x3b')==='dEmoL'){const _0x1a1447=Number(RegExp['$1']);if(_0x1a1447<tier)alert(_0x37f0e7('0x5b')['format'](_0x58034d,_0x1a1447,tier)),SceneManager[_0x37f0e7('0xaa')]();else{if(_0x37f0e7('0xb0')===_0x37f0e7('0xb0'))tier=Math[_0x37f0e7('0xbd')](_0x1a1447,tier);else{function _0xd6ee3e(){const _0x4f6c61=_0x37f0e7;this[_0x4f6c61('0x9f')]();}}}}else{function _0x3f3e4c(){const _0x458d4d=_0x37f0e7,_0x135797=this[_0x458d4d('0x33')]()[_0x458d4d('0x89')];if(_0x135797==='')return;this[_0x458d4d('0xac')](_0x135797);}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x37f0e7('0x75')],_0x260d68[_0x37f0e7('0x6b')]);})(pluginData),PluginManager[_0x45f186('0xf')](pluginData['name'],_0x45f186('0x17'),_0x264c74=>{const _0x297e25=_0x45f186;VisuMZ[_0x297e25('0x50')](_0x264c74,_0x264c74);const _0x58c9d1=_0x264c74[_0x297e25('0x60')];$gameSystem[_0x297e25('0x25')](_0x58c9d1);}),PluginManager[_0x45f186('0xf')](pluginData[_0x45f186('0xa3')],'CompassPlayerIcon',_0x2751a4=>{const _0x261f98=_0x45f186;VisuMZ[_0x261f98('0x50')](_0x2751a4,_0x2751a4);const _0x363b3b=_0x2751a4[_0x261f98('0xb6')];$gameSystem[_0x261f98('0xb7')](_0x363b3b);}),ConfigManager[_0x45f186('0x26')]=!![],ConfigManager[_0x45f186('0x5a')]=0x64,VisuMZ[_0x45f186('0x96')][_0x45f186('0x1b')]=ConfigManager[_0x45f186('0x99')],ConfigManager[_0x45f186('0x99')]=function(){const _0x4ca9ff=_0x45f186,_0x396b96=VisuMZ['ProximityCompass'][_0x4ca9ff('0x1b')][_0x4ca9ff('0x2a')](this);return _0x396b96[_0x4ca9ff('0x26')]=this[_0x4ca9ff('0x26')],_0x396b96['compassSize']=this[_0x4ca9ff('0x5a')],_0x396b96;},VisuMZ[_0x45f186('0x96')]['ConfigManager_applyData']=ConfigManager[_0x45f186('0xb')],ConfigManager['applyData']=function(_0x1d8999){const _0x4afa6e=_0x45f186;VisuMZ['ProximityCompass'][_0x4afa6e('0x36')][_0x4afa6e('0x2a')](this,_0x1d8999),_0x4afa6e('0x26')in _0x1d8999?this[_0x4afa6e('0x26')]=_0x1d8999[_0x4afa6e('0x26')]:this[_0x4afa6e('0x26')]=ConfigManager[_0x4afa6e('0x26')],'compassSize'in _0x1d8999?this[_0x4afa6e('0x5a')]=_0x1d8999['compassSize']:this['compassSize']=ConfigManager[_0x4afa6e('0x5a')];},SceneManager[_0x45f186('0xa8')]=function(){const _0x299a52=_0x45f186;return this[_0x299a52('0x8c')]&&this[_0x299a52('0x8c')]['constructor']===Scene_Map;},TextManager[_0x45f186('0x26')]=VisuMZ[_0x45f186('0x96')]['Settings']['Options']['ShowName'],TextManager[_0x45f186('0x5a')]=VisuMZ[_0x45f186('0x96')][_0x45f186('0x75')][_0x45f186('0x2b')][_0x45f186('0x91')],VisuMZ[_0x45f186('0x96')][_0x45f186('0x61')]=Game_System[_0x45f186('0x3')]['initialize'],Game_System['prototype']['initialize']=function(){const _0x1c7db7=_0x45f186;VisuMZ[_0x1c7db7('0x96')][_0x1c7db7('0x61')]['call'](this),this['initializeProximityCompass']();},Game_System['prototype'][_0x45f186('0x9f')]=function(){const _0x4df2ab=_0x45f186;this[_0x4df2ab('0xb9')]=VisuMZ[_0x4df2ab('0x96')]['Settings'][_0x4df2ab('0x6c')][_0x4df2ab('0xa5')],this[_0x4df2ab('0x4')]=VisuMZ[_0x4df2ab('0x96')][_0x4df2ab('0x75')][_0x4df2ab('0x6c')][_0x4df2ab('0x3e')];},Game_System[_0x45f186('0x3')][_0x45f186('0xb5')]=function(){const _0x455fad=_0x45f186;if(this[_0x455fad('0xb9')]===undefined){if(_0x455fad('0xba')==='XwvQo')this[_0x455fad('0x9f')]();else{function _0x1d8fd4(){const _0x5c38c1=_0x455fad;if([0x6c,0x198][_0x5c38c1('0xd')](_0x5ac86d[_0x5c38c1('0x59')])){if(_0x235163!=='')_0xbf46c0+='\x0a';_0x4eb01e+=_0x575722[_0x5c38c1('0x6b')][0x0];}}}}return this[_0x455fad('0xb9')];},Game_System['prototype']['setShowProximityCompass']=function(_0x5b2cc7){const _0x287a9e=_0x45f186;this[_0x287a9e('0xb9')]===undefined&&this[_0x287a9e('0x9f')](),this[_0x287a9e('0xb9')]=_0x5b2cc7;},Game_System[_0x45f186('0x3')]['getPlayerCompassIcon']=function(){const _0x358b99=_0x45f186;if(this[_0x358b99('0x4')]===undefined){if(_0x358b99('0x6a')!==_0x358b99('0x6a')){function _0x1286cb(){const _0x782b6=_0x358b99,_0x13a843=_0x40379a[_0x782b6('0x26')],_0x331279='showCompass';this[_0x782b6('0x57')](_0x13a843,_0x331279);}}else this[_0x358b99('0x9f')]();}return this[_0x358b99('0x4')];},Game_System['prototype'][_0x45f186('0xb7')]=function(_0x405a6e){const _0x30afa7=_0x45f186;if(this[_0x30afa7('0x4')]===undefined){if(_0x30afa7('0x73')!==_0x30afa7('0x49'))this[_0x30afa7('0x9f')]();else{function _0x4aa9ac(){const _0x18c520=_0x30afa7;return this[_0x18c520('0x4')]===_0x5a8e70&&this[_0x18c520('0x9f')](),this[_0x18c520('0x4')];}}}this[_0x30afa7('0x4')]=_0x405a6e;},Game_Map[_0x45f186('0x3')][_0x45f186('0x4c')]=function(){const _0x2b555f=_0x45f186;return this[_0x2b555f('0x97')];},Game_Map[_0x45f186('0x3')][_0x45f186('0x1a')]=function(){const _0x59c1be=_0x45f186;if(!ConfigManager['showCompass']){if(_0x59c1be('0x98')===_0x59c1be('0x6')){function _0x239e5e(){const _0xd65787=_0x59c1be;this[_0xd65787('0x5a')]=_0x4153d1[_0xd65787('0x5a')];}}else return!![];}else{if(!!$dataMap&&!!$dataMap['note'])return $dataMap[_0x59c1be('0x89')][_0x59c1be('0x63')](/<HIDE COMPASS>/i);else{if(_0x59c1be('0xbb')===_0x59c1be('0xbb'))return![];else{function _0x254bb4(){const _0x1dfef3=_0x59c1be;_0x5ac934[_0x1dfef3('0x3')][_0x1dfef3('0x18')]['call'](this),this['updateOpacity']();}}}}},Game_Player[_0x45f186('0x3')][_0x45f186('0x64')]=function(){const _0x1e311b=_0x45f186;if(!SceneManager[_0x1e311b('0xa8')]())return![];const _0x3097d8=SceneManager[_0x1e311b('0x8c')]['_ProximityCompassSprite'];if(!_0x3097d8)return![];const _0x587a58=_0x3097d8['x'],_0x307b79=_0x3097d8['y'],_0x238fcd=VisuMZ[_0x1e311b('0x96')][_0x1e311b('0x75')][_0x1e311b('0x41')][_0x1e311b('0x81')]||0x1,_0x461c87=_0x3097d8[_0x1e311b('0x80')]['x'],_0x1b6b7e=new Rectangle(_0x587a58-_0x238fcd*_0x461c87,_0x307b79-_0x238fcd*_0x461c87,_0x238fcd*_0x461c87*0x2+$gameMap['tileWidth']()/0x2,_0x238fcd*_0x461c87*0x2+$gameMap[_0x1e311b('0x1f')]()/0x2);return _0x1b6b7e[_0x1e311b('0x5d')](this['screenX'](),this[_0x1e311b('0x7b')]());},VisuMZ[_0x45f186('0x96')][_0x45f186('0x47')]=Game_Event['prototype'][_0x45f186('0xae')],Game_Event['prototype']['refresh']=function(){const _0x42241e=_0x45f186;VisuMZ['ProximityCompass'][_0x42241e('0x47')][_0x42241e('0x2a')](this),this['setupProximityCompassEffects']();},VisuMZ['ProximityCompass'][_0x45f186('0x39')]=Game_Event[_0x45f186('0x3')][_0x45f186('0x52')],Game_Event[_0x45f186('0x3')]['clearPageSettings']=function(){const _0x6c13fe=_0x45f186;VisuMZ[_0x6c13fe('0x96')]['Game_Event_clearPageSettings'][_0x6c13fe('0x2a')](this),this[_0x6c13fe('0x53')]();},VisuMZ[_0x45f186('0x96')][_0x45f186('0xa9')]=Game_Event[_0x45f186('0x3')][_0x45f186('0xaf')],Game_Event[_0x45f186('0x3')]['setupPageSettings']=function(){const _0x34e7a7=_0x45f186;VisuMZ['ProximityCompass'][_0x34e7a7('0xa9')]['call'](this),this[_0x34e7a7('0x3d')]();},Game_Event['prototype'][_0x45f186('0x3d')]=function(){const _0x353a2b=_0x45f186;this['initProximityCompassEffects'](),this[_0x353a2b('0x12')](),this['setupProximityCompassCommentTags']();},Game_Event[_0x45f186('0x3')]['setupProximityCompassNotetags']=function(){const _0x394372=_0x45f186,_0x152066=this[_0x394372('0x33')]()[_0x394372('0x89')];if(_0x152066==='')return;this[_0x394372('0xac')](_0x152066);},Game_Event[_0x45f186('0x3')][_0x45f186('0x3f')]=function(){const _0x41084f=_0x45f186;if(!this[_0x41084f('0x9b')]())return;const _0x57289e=this['list']();let _0x26149d='';for(const _0x5c2b51 of _0x57289e){if(_0x41084f('0x24')===_0x41084f('0x74')){function _0x1f0010(){const _0x537173=_0x41084f,_0x50afd5=_0x51e867(_0x4b64af['$1']);_0x50afd5<_0x5df654?(_0x5e802c(_0x537173('0x5b')[_0x537173('0x30')](_0x45138c,_0x50afd5,_0x212883)),_0x30fac3[_0x537173('0xaa')]()):_0x4388d5=_0x9e7829[_0x537173('0xbd')](_0x50afd5,_0xa592dc);}}else{if([0x6c,0x198][_0x41084f('0xd')](_0x5c2b51[_0x41084f('0x59')])){if(_0x41084f('0x72')===_0x41084f('0x67')){function _0x355004(){const _0x4525a1=_0x41084f;this[_0x4525a1('0xa0')](),this[_0x4525a1('0x43')](),this[_0x4525a1('0x3c')](),this['update']();}}else{if(_0x26149d!=='')_0x26149d+='\x0a';_0x26149d+=_0x5c2b51[_0x41084f('0x6b')][0x0];}}}}this['checkProximityCompassStringTags'](_0x26149d);},Game_Event[_0x45f186('0x3')][_0x45f186('0x53')]=function(){const _0x182998=_0x45f186;this[_0x182998('0x5e')]=0x0,this[_0x182998('0x94')]=VisuMZ[_0x182998('0x96')][_0x182998('0x75')][_0x182998('0x6c')]['Proximity'];},Game_Event['prototype']['checkProximityCompassStringTags']=function(_0x1fb7d2){const _0x24def2=_0x45f186;if(_0x1fb7d2[_0x24def2('0x63')](/<COMPASS ICON: (\d+)>/i)){if(_0x24def2('0x78')===_0x24def2('0xb4')){function _0x2914a0(){const _0x893dc9=_0x24def2;this[_0x893dc9('0x56')]+=_0x52952b;}}else this[_0x24def2('0x5e')]=parseInt(RegExp['$1']);}_0x1fb7d2[_0x24def2('0x63')](/<COMPASS PROXIMITY: (\d+)>/i)&&(this[_0x24def2('0x94')]=parseInt(RegExp['$1']));},VisuMZ['ProximityCompass'][_0x45f186('0x5')]=Scene_Map[_0x45f186('0x3')][_0x45f186('0x10')],Scene_Map['prototype'][_0x45f186('0x10')]=function(){const _0x459f75=_0x45f186;VisuMZ[_0x459f75('0x96')][_0x459f75('0x5')][_0x459f75('0x2a')](this),this['createProximityCompass']();},Scene_Map[_0x45f186('0x3')]['createProximityCompass']=function(){const _0x3df41b=_0x45f186;if(this[_0x3df41b('0x16')]!==Scene_Map)return;this['_ProximityCompassSprite']=new Sprite_ProximityCompass(),this[_0x3df41b('0x77')](this['_ProximityCompassSprite']);},VisuMZ[_0x45f186('0x96')][_0x45f186('0x7d')]=Scene_Options[_0x45f186('0x3')]['maxCommands'],Scene_Options['prototype'][_0x45f186('0xa7')]=function(){const _0x4b5397=_0x45f186;let _0x262929=VisuMZ[_0x4b5397('0x96')]['Scene_Options_maxCommands'][_0x4b5397('0x2a')](this);const _0x569caf=VisuMZ['ProximityCompass'][_0x4b5397('0x75')][_0x4b5397('0x2b')];if(_0x569caf['AdjustRect']){if(_0x569caf[_0x4b5397('0x2')])_0x262929++;if(_0x569caf[_0x4b5397('0x8')])_0x262929++;}return _0x262929;};function Sprite_ProximityCompass(){const _0x401da6=_0x45f186;this[_0x401da6('0x85')][_0x401da6('0x6f')](this,arguments);}Sprite_ProximityCompass[_0x45f186('0x3')]=Object[_0x45f186('0x42')](Sprite_Clickable['prototype']),Sprite_ProximityCompass[_0x45f186('0x3')][_0x45f186('0x16')]=Sprite_ProximityCompass,Sprite_ProximityCompass[_0x45f186('0x3')][_0x45f186('0x85')]=function(){const _0x5de017=_0x45f186;Sprite_Clickable[_0x5de017('0x3')]['initialize'][_0x5de017('0x2a')](this),this[_0x5de017('0x8d')](),this['x']=eval(VisuMZ[_0x5de017('0x96')][_0x5de017('0x75')]['Compass'][_0x5de017('0x32')]),this['y']=eval(VisuMZ[_0x5de017('0x96')][_0x5de017('0x75')]['Compass'][_0x5de017('0x4e')]),this[_0x5de017('0x37')]['x']=0.5,this[_0x5de017('0x37')]['y']=0.5,this[_0x5de017('0x2e')]=0x2,!this['isShow']()&&(this[_0x5de017('0x56')]=0x0),this[_0x5de017('0x80')]['x']=ConfigManager[_0x5de017('0x5a')]*0.01,this['scale']['y']=ConfigManager[_0x5de017('0x5a')]*0.01;},Sprite_ProximityCompass[_0x45f186('0x3')]['createSprites']=function(){const _0x308ccb=_0x45f186;this[_0x308ccb('0xa0')](),this['createFrame'](),this[_0x308ccb('0x3c')](),this['update']();},Sprite_ProximityCompass['prototype'][_0x45f186('0xa0')]=function(){const _0x5ad5b1=_0x45f186;this[_0x5ad5b1('0x71')]=new Sprite(),this[_0x5ad5b1('0x77')](this[_0x5ad5b1('0x71')]),this[_0x5ad5b1('0x71')][_0x5ad5b1('0x37')]['x']=0.5,this['_ProximityCompassBackgroundSprite'][_0x5ad5b1('0x37')]['y']=0.5;const _0x23d8b7=VisuMZ[_0x5ad5b1('0x96')][_0x5ad5b1('0x75')]['Compass'],_0x1c87b7=_0x23d8b7[_0x5ad5b1('0x81')];var _0x2b6f16=_0x1c87b7*0x2,_0xd0d4ed=_0x1c87b7*0x2,_0x379acd=_0x23d8b7['BackColor'];const _0xa3f60b=new Bitmap(_0x2b6f16,_0xd0d4ed);_0xa3f60b[_0x5ad5b1('0xab')]=_0x23d8b7[_0x5ad5b1('0x9')],_0xa3f60b[_0x5ad5b1('0xe')](_0x2b6f16/0x2,_0xd0d4ed/0x2,_0x2b6f16/0x2,_0x379acd),this[_0x5ad5b1('0x71')][_0x5ad5b1('0x7c')]=_0xa3f60b;},Sprite_ProximityCompass[_0x45f186('0x3')]['createFrame']=function(){const _0x3f7758=_0x45f186;this[_0x3f7758('0xbe')]=new Sprite(),this['addChild'](this[_0x3f7758('0xbe')]),this[_0x3f7758('0xbe')][_0x3f7758('0x37')]['x']=0.5,this[_0x3f7758('0xbe')]['anchor']['y']=0.5;const _0x414f6f=VisuMZ[_0x3f7758('0x96')][_0x3f7758('0x75')][_0x3f7758('0x41')][_0x3f7758('0x27')];if(_0x414f6f)this['_ProximityCompassFrameSprite'][_0x3f7758('0x7c')]=ImageManager[_0x3f7758('0x1d')](_0x414f6f);else{if(_0x3f7758('0x28')!==_0x3f7758('0x28')){function _0x3c4b91(){const _0x153f81=_0x3f7758;if(!this[_0x153f81('0x9b')]())return;const _0x422f3a=this['list']();let _0x421b00='';for(const _0x236762 of _0x422f3a){if([0x6c,0x198]['includes'](_0x236762['code'])){if(_0x421b00!=='')_0x421b00+='\x0a';_0x421b00+=_0x236762[_0x153f81('0x6b')][0x0];}}this['checkProximityCompassStringTags'](_0x421b00);}}else this[_0x3f7758('0xbe')][_0x3f7758('0x7c')]=ImageManager[_0x3f7758('0x34')];}},Sprite_ProximityCompass[_0x45f186('0x3')][_0x45f186('0x3c')]=function(){const _0x2021eb=_0x45f186;this[_0x2021eb('0x7e')]=[],$gameMap[_0x2021eb('0x76')]()['forEach'](function(_0x41e811){const _0x563943=_0x2021eb;this[_0x563943('0x7e')][_0x563943('0x66')](new Sprite_CompassIcon(_0x41e811));},this),this['_characterSprites'][_0x2021eb('0x66')](new Sprite_CompassIcon($gamePlayer));for(var _0x4494b3=0x0;_0x4494b3<this[_0x2021eb('0x7e')][_0x2021eb('0x35')];_0x4494b3++){this[_0x2021eb('0x77')](this[_0x2021eb('0x7e')][_0x4494b3]);}},Sprite_ProximityCompass[_0x45f186('0x3')][_0x45f186('0x18')]=function(){const _0x58406a=_0x45f186;Sprite_Clickable[_0x58406a('0x3')]['update'][_0x58406a('0x2a')](this),this[_0x58406a('0x9c')]();},Sprite_ProximityCompass[_0x45f186('0x3')][_0x45f186('0x9c')]=function(){const _0x502e2d=_0x45f186,_0x420c02=VisuMZ[_0x502e2d('0x96')]['Settings'][_0x502e2d('0x41')]['CompassFadeSpeed'];if(this[_0x502e2d('0x92')]()){if(_0x502e2d('0x22')===_0x502e2d('0xa2')){function _0x115b92(){const _0x6bd036=_0x502e2d;var _0x2e8169=this['_character'][_0x6bd036('0x94')],_0x23db91=_0x4f9c8a[_0x6bd036('0xa6')](this[_0x6bd036('0x1e')][_0x6bd036('0x95')],_0x2e1ccf[_0x6bd036('0x95')]),_0x292142=_0x181a73[_0x6bd036('0xa6')](this['_character'][_0x6bd036('0xa4')],_0xa26ccb[_0x6bd036('0xa4')]);const _0x573d92=_0x26acff[_0x6bd036('0x96')][_0x6bd036('0x75')]['Compass'][_0x6bd036('0x5f')];_0x2e8169>=_0x4b08c8['abs'](_0x23db91)+_0x4a3f44[_0x6bd036('0x7f')](_0x292142)?this[_0x6bd036('0x56')]+=_0x573d92:this[_0x6bd036('0x56')]-=_0x573d92;}}else this[_0x502e2d('0x56')]+=_0x420c02;}else this['opacity']-=_0x420c02;},Sprite_ProximityCompass[_0x45f186('0x3')][_0x45f186('0x92')]=function(){const _0x241842=_0x45f186,_0x810040=VisuMZ['ProximityCompass'][_0x241842('0x75')]['Compass'];if($gameMap[_0x241842('0x1a')]())return![];else{if(_0x810040[_0x241842('0x20')]&&$gameMessage[_0x241842('0x15')]()){if(_0x241842('0x2d')!=='FzVCl')return![];else{function _0x180967(){const _0x52237f=_0x241842;if(_0x27ed35!=='')_0x6f8a5f+='\x0a';_0x329aed+=_0x4232d1[_0x52237f('0x6b')][0x0];}}}else{if(_0x810040[_0x241842('0x5c')]&&$gameMap[_0x241842('0x9d')]())return![];else return $gamePlayer[_0x241842('0x64')]()?![]:$gameSystem[_0x241842('0xb5')]();}}};function Sprite_CompassIcon(){const _0x495a62=_0x45f186;this[_0x495a62('0x85')]['apply'](this,arguments);}Sprite_CompassIcon[_0x45f186('0x3')]=Object[_0x45f186('0x42')](Sprite[_0x45f186('0x3')]),Sprite_CompassIcon[_0x45f186('0x3')][_0x45f186('0x16')]=Sprite_CompassIcon,Sprite_CompassIcon[_0x45f186('0x3')][_0x45f186('0x85')]=function(_0x591df1){const _0x100e65=_0x45f186;this[_0x100e65('0x1e')]=_0x591df1,this[_0x100e65('0x87')]=0x0,Sprite[_0x100e65('0x3')][_0x100e65('0x85')][_0x100e65('0x2a')](this),this[_0x100e65('0x37')]['x']=0.5,this[_0x100e65('0x37')]['y']=0.5,this[_0x100e65('0x29')]();var _0x229b0d=0x1/(ConfigManager['compassSize']*0.01);this[_0x100e65('0x80')]['x']=_0x229b0d,this[_0x100e65('0x80')]['y']=_0x229b0d,this[_0x100e65('0xc')]();},Sprite_CompassIcon[_0x45f186('0x3')][_0x45f186('0x29')]=function(){const _0x81aa98=_0x45f186;this[_0x81aa98('0x7c')]=ImageManager[_0x81aa98('0xb1')](_0x81aa98('0x65'));},Sprite_CompassIcon[_0x45f186('0x3')][_0x45f186('0xc')]=function(){const _0x5160e0=_0x45f186;if(this['_character']===$gamePlayer){if(_0x5160e0('0x44')===_0x5160e0('0x44'))this[_0x5160e0('0x56')]=0xff;else{function _0x3192d6(){const _0x311648=_0x5160e0;this[_0x311648('0x8b')](0x0,0x0,0x0,0x0);}}}else{var _0x3e33e7=this[_0x5160e0('0x1e')]['_compassProximity'],_0x1017df=$gameMap['deltaX'](this['_character'][_0x5160e0('0x95')],$gamePlayer[_0x5160e0('0x95')]),_0x4f40d5=$gameMap[_0x5160e0('0xa6')](this[_0x5160e0('0x1e')][_0x5160e0('0xa4')],$gamePlayer[_0x5160e0('0xa4')]);if(_0x3e33e7>=Math[_0x5160e0('0x7f')](_0x1017df)+Math[_0x5160e0('0x7f')](_0x4f40d5)){if(_0x5160e0('0x79')!==_0x5160e0('0x79')){function _0x2b7b6f(){const _0x387a3a=_0x5160e0;return _0x1c75fa[_0x387a3a('0xb5')]();}}else this[_0x5160e0('0x56')]=0xff;}else{if('TLVcU'!==_0x5160e0('0x62')){function _0x4b3120(){const _0x20f6bb=_0x5160e0;_0x1bc615(_0x20f6bb('0xb3')[_0x20f6bb('0x30')](_0x473aac,_0x27623a)),_0x616e35['exit']();}}else this[_0x5160e0('0x56')]=0x0;}}},Sprite_CompassIcon[_0x45f186('0x3')][_0x45f186('0x18')]=function(){const _0x2345c7=_0x45f186;Sprite[_0x2345c7('0x3')]['update'][_0x2345c7('0x2a')](this),this['updateOpacity'](),this['updateFrame'](),this[_0x2345c7('0x7a')]();},Sprite_CompassIcon[_0x45f186('0x3')][_0x45f186('0x9c')]=function(){const _0x196083=_0x45f186;if(this[_0x196083('0x1e')]===$gamePlayer){if('lMpdh'!==_0x196083('0x4b')){function _0x260e4e(){const _0x15bd75=_0x196083;this[_0x15bd75('0x87')]=_0x223782['getPlayerCompassIcon']();}}else this[_0x196083('0x56')]=0xff;}else{var _0x458ccb=this[_0x196083('0x1e')][_0x196083('0x94')],_0x1af294=$gameMap[_0x196083('0xa6')](this[_0x196083('0x1e')][_0x196083('0x95')],$gamePlayer[_0x196083('0x95')]),_0x42f1db=$gameMap['deltaX'](this[_0x196083('0x1e')][_0x196083('0xa4')],$gamePlayer[_0x196083('0xa4')]);const _0x1543f4=VisuMZ[_0x196083('0x96')][_0x196083('0x75')][_0x196083('0x41')][_0x196083('0x5f')];if(_0x458ccb>=Math['abs'](_0x1af294)+Math['abs'](_0x42f1db)){if(_0x196083('0x48')===_0x196083('0x58')){function _0x3ab1dd(){const _0xae75cb=_0x196083;this[_0xae75cb('0xb9')]===_0x4bd8d3&&this[_0xae75cb('0x9f')](),this[_0xae75cb('0xb9')]=_0x81a39b;}}else this[_0x196083('0x56')]+=_0x1543f4;}else this['opacity']-=_0x1543f4;}},Sprite_CompassIcon['prototype']['updateFrame']=function(){const _0x13a383=_0x45f186;if(this[_0x13a383('0x1e')]===$gamePlayer){if('IoYfl'!==_0x13a383('0x4f'))this['_iconIndex']=$gameSystem['getPlayerCompassIcon']();else{function _0x3d653f(){const _0x4de921=_0x13a383;this[_0x4de921('0x77')](this['_characterSprites'][_0x1a2336]);}}}else this[_0x13a383('0x87')]=this[_0x13a383('0x1e')][_0x13a383('0x5e')];if(this[_0x13a383('0x87')]===0x0){if('aDXus'===_0x13a383('0x2f')){function _0x3c1a3e(){const _0x4c4d9b=_0x13a383,_0x5699da=_0x5f5451[_0x4c4d9b('0x96')]['Settings'][_0x4c4d9b('0x41')][_0x4c4d9b('0x70')];this[_0x4c4d9b('0x92')]()?this[_0x4c4d9b('0x56')]+=_0x5699da:this[_0x4c4d9b('0x56')]-=_0x5699da;}}else this['setFrame'](0x0,0x0,0x0,0x0);}else{var _0x3982c0=ImageManager[_0x13a383('0x4d')],_0x1c69b5=ImageManager[_0x13a383('0x11')],_0x2bce55=this[_0x13a383('0x87')]%0x10*_0x3982c0,_0x4248e0=Math[_0x13a383('0x40')](this[_0x13a383('0x87')]/0x10)*_0x1c69b5;this[_0x13a383('0x8b')](_0x2bce55,_0x4248e0,_0x3982c0,_0x1c69b5);}},Sprite_CompassIcon[_0x45f186('0x3')][_0x45f186('0x7a')]=function(){const _0x52415c=_0x45f186,_0x3d28cf=VisuMZ[_0x52415c('0x96')][_0x52415c('0x75')][_0x52415c('0x41')];var _0x36d399=_0x3d28cf['Radius'],_0x4169a7=_0x3d28cf[_0x52415c('0x23')]*$gameMap['tileWidth'](),_0x4fef7c=$gameMap[_0x52415c('0xa6')](this['_character']['_realX'],$gamePlayer['_realX'])*_0x4169a7,_0x2fc688=$gameMap[_0x52415c('0xa6')](this['_character'][_0x52415c('0xa4')],$gamePlayer[_0x52415c('0xa4')])*_0x4169a7,_0x52837e=Math[_0x52415c('0x54')](_0x4fef7c*_0x4fef7c+_0x2fc688*_0x2fc688);if(_0x52837e<_0x36d399){if(_0x52415c('0x31')!==_0x52415c('0x1'))this['x']=Math['round'](_0x4fef7c),this['y']=Math['round'](_0x2fc688);else{function _0x3ed1c7(){const _0x2e5fee=_0x52415c;this['_ProximityCompassBackgroundSprite']=new _0x439a2e(),this[_0x2e5fee('0x77')](this[_0x2e5fee('0x71')]),this[_0x2e5fee('0x71')]['anchor']['x']=0.5,this['_ProximityCompassBackgroundSprite'][_0x2e5fee('0x37')]['y']=0.5;const _0x36069c=_0x17564f[_0x2e5fee('0x96')][_0x2e5fee('0x75')][_0x2e5fee('0x41')],_0x5e0d96=_0x36069c[_0x2e5fee('0x81')];var _0x15bb6d=_0x5e0d96*0x2,_0x2ab742=_0x5e0d96*0x2,_0x2f716a=_0x36069c['BackColor'];const _0x10edde=new _0x296d9f(_0x15bb6d,_0x2ab742);_0x10edde[_0x2e5fee('0xab')]=_0x36069c['BackOpacity'],_0x10edde['drawCircle'](_0x15bb6d/0x2,_0x2ab742/0x2,_0x15bb6d/0x2,_0x2f716a),this[_0x2e5fee('0x71')][_0x2e5fee('0x7c')]=_0x10edde;}}}else{if(_0x52415c('0x8e')!=='zlkdZ'){var _0x3d4fd1=Math[_0x52415c('0x38')](_0x2fc688,_0x4fef7c);this['x']=Math[_0x52415c('0xb2')](_0x36d399*Math[_0x52415c('0x69')](_0x3d4fd1)),this['y']=Math['round'](_0x36d399*Math[_0x52415c('0x9a')](_0x3d4fd1));}else{function _0x12bd09(){const _0x4da3a6=_0x52415c;this[_0x4da3a6('0x45')](_0x5159cf,_0x55faf2[_0x4da3a6('0xad')](0x32,0x64));}}}},VisuMZ[_0x45f186('0x96')][_0x45f186('0x6d')]=Window_Options['prototype'][_0x45f186('0xbc')],Window_Options['prototype'][_0x45f186('0xbc')]=function(){const _0x4261bb=_0x45f186;VisuMZ['ProximityCompass'][_0x4261bb('0x6d')][_0x4261bb('0x2a')](this),this['addProximityCompassCommands']();},Window_Options[_0x45f186('0x3')][_0x45f186('0x8f')]=function(){const _0x34f8ce=_0x45f186;VisuMZ[_0x34f8ce('0x96')][_0x34f8ce('0x75')]['Options'][_0x34f8ce('0x2')]&&this['addShowProximityCompassCommand'](),VisuMZ[_0x34f8ce('0x96')]['Settings'][_0x34f8ce('0x2b')][_0x34f8ce('0x8')]&&this[_0x34f8ce('0x0')]();},Window_Options[_0x45f186('0x3')]['addShowProximityCompassCommand']=function(){const _0x509293=_0x45f186,_0x551804=TextManager['showCompass'],_0x39c1e8='showCompass';this[_0x509293('0x57')](_0x551804,_0x39c1e8);},Window_Options[_0x45f186('0x3')][_0x45f186('0x0')]=function(){const _0x22ce6d=TextManager['compassSize'],_0x388eea='compassSize';this['addCommand'](_0x22ce6d,_0x388eea);},VisuMZ[_0x45f186('0x96')]['Window_Options_isVolumeSymbol']=Window_Options['prototype'][_0x45f186('0x46')],Window_Options['prototype'][_0x45f186('0x46')]=function(_0x2245e7){const _0x5f3cf8=_0x45f186;return _0x2245e7===_0x5f3cf8('0x5a')?!![]:VisuMZ[_0x5f3cf8('0x96')][_0x5f3cf8('0x2c')][_0x5f3cf8('0x2a')](this,_0x2245e7);},VisuMZ['ProximityCompass'][_0x45f186('0x68')]=Window_Options[_0x45f186('0x3')]['changeVolume'],Window_Options['prototype'][_0x45f186('0x51')]=function(_0x4162e6,_0x467c44,_0x289da5){const _0x45df8c=_0x45f186;_0x4162e6==='compassSize'?this[_0x45df8c('0x19')](_0x4162e6,_0x467c44,_0x289da5):VisuMZ[_0x45df8c('0x96')][_0x45df8c('0x68')][_0x45df8c('0x2a')](this,_0x4162e6,_0x467c44,_0x289da5);},Window_Options[_0x45f186('0x3')][_0x45f186('0x19')]=function(_0x49cea5,_0x5ae46b,_0xd04a6e){const _0x1645cb=_0x45f186,_0x2b4942=this[_0x1645cb('0x55')](_0x49cea5),_0x4d804c=0xa,_0xc04668=_0x2b4942+(_0x5ae46b?_0x4d804c:-_0x4d804c);if(_0xc04668>0x64&&_0xd04a6e){if(_0x1645cb('0x6e')===_0x1645cb('0x9e')){function _0x143cff(){const _0x138778=_0x1645cb;return this[_0x138778('0xb9')]===_0x383f7a&&this[_0x138778('0x9f')](),this['_showProximityCompass'];}}else this[_0x1645cb('0x45')](_0x49cea5,0x32);}else{if(_0x1645cb('0x13')!==_0x1645cb('0x13')){function _0x3b0b21(){const _0x340905=_0x1645cb;this['x']=_0x921e59[_0x340905('0xb2')](_0xc3529d),this['y']=_0x42cde9['round'](_0x29a3ee);}}else this[_0x1645cb('0x45')](_0x49cea5,_0xc04668[_0x1645cb('0xad')](0x32,0x64));}};
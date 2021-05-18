//=============================================================================
// VisuStella MZ - Animated Pictures
// VisuMZ_X_AnimatedPictures.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_AnimatedPictures = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AnimatedPictures = VisuMZ.AnimatedPictures || {};
VisuMZ.AnimatedPictures.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [AnimatedPictures]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Animated_Pictures_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that gives functionality to Show Picture
 * events to display animated pictures. Animated pictures are shown in a sprite
 * sheet format. There are looping controls and speed controls that can be used
 * with these animated pictures.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to make pictures animated as long as they follow the
 *   animated cell format.
 * * Control the looping properties and speed of the animated picture through
 *   the usage of plugin commands.
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
 * Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures folder.
 * The filename must be named with the following format:
 *
 * filename[ANI][HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Parrot[ANI][3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated pictures.
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
 * Animated Picture: Change Properties
 * - Changes the properties used for the animated picture.
 *
 *   Picture ID:
 *   - Select which Picture ID to affect.
 *
 *   Loop?:
 *   - Animated pictures will loop back to beginning once it reaches the
 *     last frame.
 *
 *   Wait Frames:
 *   - Number of frames to wait before moving to next picture cell.
 *
 * ---
 *
 * ============================================================================
 * Good Practices
 * ============================================================================
 *
 * Animated pictures, if used incorrectly, can bog down the game client. Here
 * are some good practices that you can follow when making animated pictures
 * to make them run more smoothly in-game.
 *
 * ---
 *
 * 1. Use animated pictures sparingly if possible. RPG Maker MZ's cache has a
 * limited size to it, which means the more animated pictures you use, the
 * faster it will fill up. And the faster it fills up, the more it needs to be
 * emptied to allow other assets in your game to load at all.
 *
 * ---
 *
 * 2. If you do use animated pictures, trim down as much empty space as
 * possible and keep picture cells to a minimum size to reduce bloating
 * the cache.
 *
 * ---
 *
 * 3. If it is practical, make your sprite sheet cells work towards a power of
 * 2 (ie: sizes of 32x32, 64x64, 128x128, 256x256, etc). Bitmaps render best
 * when it works in this cell range. This is not necessary, but it is a thing
 * to keep in mind.
 *
 * ---
 *
 * 4. Limit the amount of colors used in the animated picture to reduce the
 * filesize of the image and reduce the strain on the cache. Use more flat
 * colors instead of gradients. These work better for the engine.
 *
 * ---
 *
 * 5. When you are done using the animated picture, use the Erase Picture
 * command to clear the picture from use. This will stop the animation frame
 * calculating and reduce strain on your game.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters are the only ones available with this plugin. These
 * adjust the default settings of animated pictures. If you wish to change how
 * some animated pictures behave from others, 
 *
 * ---
 *
 * Defaults
 * 
 *   Default Loop?:
 *   - Animated pictures will loop back to beginning by default once it reaches
 *     the last frame.
 * 
 *   Default Wait Frames:
 *   - Default number of frames to wait before moving to next picture cell.
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
 * Version 1.00: October 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeProperties
 * @text Animated Picture: Change Properties
 * @desc Changes the properties used for the animated picture.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to affect.
 * @default 1
 *
 * @arg Loop:eval
 * @text Loop?
 * @parent PictureID:num
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Animated pictures will loop back to beginning once it reaches the last frame.
 * @default true
 *
 * @arg WaitFrames:num
 * @text Wait Frames
 * @parent PictureID:num
 * @type number
 * @max 1
 * @desc Number of frames to wait before moving to next picture cell.
 * @default 4
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
 * @param AnimatedPictures
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Loop:eval
 * @text Default Loop?
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Animated pictures will loop back to beginning by default once it reaches the last frame.
 * @default true
 *
 * @param WaitFrames:num
 * @text Default Wait Frames
 * @desc Default number of frames to wait before moving to next picture cell.
 * @default 4
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
//=============================================================================

const _0x4f77=['resetFrame','prototype','ARRAYEVAL','call','setFrame','_animationHorzCells','getAnimatedPictureWaitFrames','nsKdB','RFjhx','_animationMaxCells','initialize','QFaxI','_isAnimatedPicture','ARRAYJSON','match','animationWaitFrames','_pictureName','tWuBK','gMvXV','isAnimatedPictureLooping','chJuN','parameters','ARRAYSTR','format','Sprite_Picture_loadBitmap','floor','QQZUk','name','initAnimatedPictureSettings','_animationVertCells','toUpperCase','DruZe','Sprite_Picture_update','JSON','VQDWg','return\x200','_animatedPictureLoop','height','version','updateAnimatedPictureFrame','map','Loop','_animationIndex','filter','parse','STR','setAnimatedPictureLooping','visible','NUM','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','update','Settings','loadBitmap','exit','max','setAnimatedPictureWaitFrames','FUNC','isAnimatedPicture','initAnimatedPicture','isAnimationLooping','_animationCount','updateAnimatedPictureCount','includes','uuYbV','bind','HpfwW','realPictureId','ConvertParams','width','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','trim','WaitFrames','description','EVAL','bjDww','registerCommand','bitmap','jbDDr','_animatedPictureWait','setupAnimatedPictureData','_pictureId','PictureID','ARRAYNUM','AnimatedPictures'];(function(_0x3a8716,_0x4f773a){const _0x3519c0=function(_0xf89e5d){while(--_0xf89e5d){_0x3a8716['push'](_0x3a8716['shift']());}};_0x3519c0(++_0x4f773a);}(_0x4f77,0x9c));const _0x3519=function(_0x3a8716,_0x4f773a){_0x3a8716=_0x3a8716-0x0;let _0x3519c0=_0x4f77[_0x3a8716];return _0x3519c0;};const _0x150b83=_0x3519;var label=_0x150b83('0xb'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x150b83('0x37')](function(_0x109d52){const _0x549afd=_0x150b83;return _0x109d52['status']&&_0x109d52[_0x549afd('0x0')][_0x549afd('0x4a')]('['+label+']');})[0x0];VisuMZ[label][_0x150b83('0x3f')]=VisuMZ[label][_0x150b83('0x3f')]||{},VisuMZ['ConvertParams']=function(_0x2d1f7c,_0x36f676){const _0x1bb505=_0x150b83;for(const _0x1ea886 in _0x36f676){if(_0x1ea886['match'](/(.*):(.*)/i)){if(_0x1bb505('0x26')!==_0x1bb505('0x26')){function _0x364063(){const _0xf39a3=_0x1bb505;this['_animationCount']=0x0,this[_0xf39a3('0x36')]+=0x1,this['_animationIndex']>=this[_0xf39a3('0x15')]&&(this[_0xf39a3('0x47')]()?this[_0xf39a3('0x36')]=0x0:this[_0xf39a3('0x36')]=this['_animationMaxCells']-0x1),this[_0xf39a3('0x33')]();}}else{const _0x452d90=String(RegExp['$1']),_0x31a285=String(RegExp['$2'])[_0x1bb505('0x2a')]()[_0x1bb505('0x52')]();let _0x4d7603,_0x347b53,_0x41154a;switch(_0x31a285){case _0x1bb505('0x3c'):_0x4d7603=_0x36f676[_0x1ea886]!==''?Number(_0x36f676[_0x1ea886]):0x0;break;case _0x1bb505('0xa'):_0x347b53=_0x36f676[_0x1ea886]!==''?JSON[_0x1bb505('0x38')](_0x36f676[_0x1ea886]):[],_0x4d7603=_0x347b53[_0x1bb505('0x34')](_0x3aeb42=>Number(_0x3aeb42));break;case _0x1bb505('0x1'):_0x4d7603=_0x36f676[_0x1ea886]!==''?eval(_0x36f676[_0x1ea886]):null;break;case _0x1bb505('0xe'):_0x347b53=_0x36f676[_0x1ea886]!==''?JSON['parse'](_0x36f676[_0x1ea886]):[],_0x4d7603=_0x347b53['map'](_0x2a910f=>eval(_0x2a910f));break;case _0x1bb505('0x2d'):_0x4d7603=_0x36f676[_0x1ea886]!==''?JSON[_0x1bb505('0x38')](_0x36f676[_0x1ea886]):'';break;case _0x1bb505('0x19'):_0x347b53=_0x36f676[_0x1ea886]!==''?JSON[_0x1bb505('0x38')](_0x36f676[_0x1ea886]):[],_0x4d7603=_0x347b53['map'](_0x20fdbe=>JSON[_0x1bb505('0x38')](_0x20fdbe));break;case _0x1bb505('0x44'):_0x4d7603=_0x36f676[_0x1ea886]!==''?new Function(JSON[_0x1bb505('0x38')](_0x36f676[_0x1ea886])):new Function(_0x1bb505('0x2f'));break;case'ARRAYFUNC':_0x347b53=_0x36f676[_0x1ea886]!==''?JSON[_0x1bb505('0x38')](_0x36f676[_0x1ea886]):[],_0x4d7603=_0x347b53[_0x1bb505('0x34')](_0x5cce04=>new Function(JSON[_0x1bb505('0x38')](_0x5cce04)));break;case _0x1bb505('0x39'):_0x4d7603=_0x36f676[_0x1ea886]!==''?String(_0x36f676[_0x1ea886]):'';break;case _0x1bb505('0x22'):_0x347b53=_0x36f676[_0x1ea886]!==''?JSON[_0x1bb505('0x38')](_0x36f676[_0x1ea886]):[],_0x4d7603=_0x347b53['map'](_0xf906f4=>String(_0xf906f4));break;case'STRUCT':_0x41154a=_0x36f676[_0x1ea886]!==''?JSON['parse'](_0x36f676[_0x1ea886]):{},_0x4d7603=VisuMZ[_0x1bb505('0x4f')]({},_0x41154a);break;case'ARRAYSTRUCT':_0x347b53=_0x36f676[_0x1ea886]!==''?JSON['parse'](_0x36f676[_0x1ea886]):[],_0x4d7603=_0x347b53[_0x1bb505('0x34')](_0x2423f4=>VisuMZ[_0x1bb505('0x4f')]({},JSON['parse'](_0x2423f4)));break;default:continue;}_0x2d1f7c[_0x452d90]=_0x4d7603;}}}return _0x2d1f7c;},(_0xfe6c8=>{const _0x4263d5=_0x150b83,_0x417fed=_0xfe6c8[_0x4263d5('0x27')];for(const _0x193715 of dependencies){if(!Imported[_0x193715]){alert(_0x4263d5('0x51')[_0x4263d5('0x23')](_0x417fed,_0x193715)),SceneManager[_0x4263d5('0x41')]();break;}}const _0x4f6a36=_0xfe6c8[_0x4263d5('0x0')];if(_0x4f6a36[_0x4263d5('0x1a')](/\[Version[ ](.*?)\]/i)){const _0x263068=Number(RegExp['$1']);_0x263068!==VisuMZ[label][_0x4263d5('0x32')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x417fed,_0x263068)),SceneManager['exit']());}if(_0x4f6a36[_0x4263d5('0x1a')](/\[Tier[ ](\d+)\]/i)){if(_0x4263d5('0x2b')!==_0x4263d5('0x2')){const _0x2e0d7a=Number(RegExp['$1']);if(_0x2e0d7a<tier){if(_0x4263d5('0x1d')===_0x4263d5('0x1d'))alert(_0x4263d5('0x3d')[_0x4263d5('0x23')](_0x417fed,_0x2e0d7a,tier)),SceneManager[_0x4263d5('0x41')]();else{function _0xe240c8(){this['initAnimatedPictureSettings']();}}}else{if(_0x4263d5('0x13')!==_0x4263d5('0x13')){function _0x280eb1(){const _0x396bf7=_0x4263d5;this[_0x396bf7('0x28')]();}}else tier=Math['max'](_0x2e0d7a,tier);}}else{function _0x2111df(){const _0x4ec732=_0x4263d5;_0x4b2e69['ConvertParams'](_0x23024c,_0x1e512a);const _0x907dc3=_0x57f335[_0x4ec732('0x9')],_0x16d6d6=_0x414ee5[_0x4ec732('0x35')],_0x8b0a9a=_0x4aa56f[_0x4ec732('0x53')];_0x1e983e[_0x4ec732('0x3a')](_0x907dc3,_0x16d6d6),_0x193ffa[_0x4ec732('0x43')](_0x907dc3,_0x8b0a9a);}}}VisuMZ[_0x4263d5('0x4f')](VisuMZ[label][_0x4263d5('0x3f')],_0xfe6c8[_0x4263d5('0x21')]);})(pluginData),PluginManager[_0x150b83('0x3')](pluginData[_0x150b83('0x27')],'ChangeProperties',_0x1e609d=>{const _0x10f8c6=_0x150b83;VisuMZ[_0x10f8c6('0x4f')](_0x1e609d,_0x1e609d);const _0xdcefe2=_0x1e609d[_0x10f8c6('0x9')],_0x395652=_0x1e609d[_0x10f8c6('0x35')],_0x5c7f11=_0x1e609d[_0x10f8c6('0x53')];$gameScreen[_0x10f8c6('0x3a')](_0xdcefe2,_0x395652),$gameScreen['setAnimatedPictureWaitFrames'](_0xdcefe2,_0x5c7f11);}),VisuMZ[_0x150b83('0xb')]['Game_Screen_initialize']=Game_Screen['prototype'][_0x150b83('0x16')],Game_Screen[_0x150b83('0xd')][_0x150b83('0x16')]=function(){const _0x27e8fb=_0x150b83;VisuMZ[_0x27e8fb('0xb')]['Game_Screen_initialize'][_0x27e8fb('0xf')](this),this['initAnimatedPictureSettings']();},Game_Screen[_0x150b83('0xd')]['initAnimatedPictureSettings']=function(){const _0xc4880f=_0x150b83;this[_0xc4880f('0x30')]=[],this[_0xc4880f('0x6')]=[];},Game_Screen[_0x150b83('0xd')][_0x150b83('0x1f')]=function(_0xf4f2c){const _0x43784b=_0x150b83;if(this[_0x43784b('0x30')]===undefined){if(_0x43784b('0x17')!==_0x43784b('0x4d'))this['initAnimatedPictureSettings']();else{function _0x48917a(){const _0x4dbe31=_0x43784b;this[_0x4dbe31('0x6')]===_0x302e3c&&this[_0x4dbe31('0x28')]();const _0x1266f9=this[_0x4dbe31('0x4e')](_0x3b8fec);this[_0x4dbe31('0x6')][_0x1266f9]=_0x472b1c;}}}const _0x221737=this[_0x43784b('0x4e')](_0xf4f2c);if(this[_0x43784b('0x30')][_0x221737]===undefined){if(_0x43784b('0x2e')!==_0x43784b('0x2e')){function _0x88fd83(){const _0x36a08b=_0x43784b;this[_0x36a08b('0x18')]=![],this['_animationHorzCells']=0x1,this['_animationVertCells']=0x1,this[_0x36a08b('0x15')]=0x1;}}else this[_0x43784b('0x30')][_0x221737]=VisuMZ['AnimatedPictures'][_0x43784b('0x3f')][_0x43784b('0x35')];}return this[_0x43784b('0x30')][_0x221737];},Game_Screen[_0x150b83('0xd')][_0x150b83('0x3a')]=function(_0x3529ed,_0x520b35){const _0x436835=_0x150b83;this[_0x436835('0x30')]===undefined&&this[_0x436835('0x28')]();const _0x52c1ab=this[_0x436835('0x4e')](_0x3529ed);this[_0x436835('0x30')][_0x52c1ab]=_0x520b35;},Game_Screen[_0x150b83('0xd')]['getAnimatedPictureWaitFrames']=function(_0x2ccacb){const _0x10aef6=_0x150b83;if(this[_0x10aef6('0x6')]===undefined){if(_0x10aef6('0x1e')==='xhbsP'){function _0x386895(){const _0x3eff38=_0x10aef6;this[_0x3eff38('0x4')]['addLoadListener'](this[_0x3eff38('0x33')][_0x3eff38('0x4c')](this));}}else this[_0x10aef6('0x28')]();}const _0x53beb6=this[_0x10aef6('0x4e')](_0x2ccacb);return this[_0x10aef6('0x6')][_0x53beb6]===undefined&&(this[_0x10aef6('0x6')][_0x53beb6]=VisuMZ[_0x10aef6('0xb')]['Settings']['WaitFrames']),this[_0x10aef6('0x6')][_0x53beb6];},Game_Screen[_0x150b83('0xd')][_0x150b83('0x43')]=function(_0x1baf95,_0x347192){const _0x252c94=_0x150b83;this[_0x252c94('0x6')]===undefined&&this[_0x252c94('0x28')]();const _0x288980=this[_0x252c94('0x4e')](_0x1baf95);this[_0x252c94('0x6')][_0x288980]=_0x347192;},VisuMZ[_0x150b83('0xb')]['Sprite_Picture_initialize']=Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x16')],Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x16')]=function(_0x2b3683){const _0x1a624f=_0x150b83;this['initAnimatedPicture'](),VisuMZ[_0x1a624f('0xb')]['Sprite_Picture_initialize'][_0x1a624f('0xf')](this,_0x2b3683);},Sprite_Picture[_0x150b83('0xd')]['initAnimatedPicture']=function(){const _0x30c130=_0x150b83;this['_isAnimatedPicture']=![],this['_animationHorzCells']=0x1,this[_0x30c130('0x29')]=0x1,this[_0x30c130('0x15')]=0x1,this['_animationCount']=0x0,this['_animationIndex']=0x0;},Sprite_Picture[_0x150b83('0xd')]['isAnimatedPicture']=function(){const _0x3b762d=_0x150b83;if(this['_isAnimatedPicture']===undefined)this['initAnimatedPicture']();return this[_0x3b762d('0x18')];},VisuMZ['AnimatedPictures'][_0x150b83('0x24')]=Sprite_Picture[_0x150b83('0xd')]['loadBitmap'],Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x40')]=function(){const _0x18844e=_0x150b83;this[_0x18844e('0x7')](),VisuMZ[_0x18844e('0xb')]['Sprite_Picture_loadBitmap'][_0x18844e('0xf')](this);if(this[_0x18844e('0x45')]())this[_0x18844e('0x4')]['addLoadListener'](this[_0x18844e('0x33')]['bind'](this));else{if(_0x18844e('0x20')==='chJuN')this[_0x18844e('0x4')]['addLoadListener'](this[_0x18844e('0xc')]['bind'](this));else{function _0x1751bf(){const _0x3a9545=_0x18844e;this[_0x3a9545('0x49')]();}}}},Sprite_Picture[_0x150b83('0xd')][_0x150b83('0xc')]=function(){const _0x30e222=_0x150b83;this[_0x30e222('0x10')](0x0,0x0,this[_0x30e222('0x4')]['width'],this[_0x30e222('0x4')][_0x30e222('0x31')]);},Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x7')]=function(){const _0x247128=_0x150b83;this[_0x247128('0x1c')][_0x247128('0x1a')](/\[ANI\]\[(\d+)x(\d+)\]/i)?(this[_0x247128('0x18')]=!![],this['_animationHorzCells']=Math[_0x247128('0x42')](0x1,parseInt(RegExp['$1'])),this[_0x247128('0x29')]=Math[_0x247128('0x42')](0x1,parseInt(RegExp['$2'])),this[_0x247128('0x15')]=this[_0x247128('0x11')]*this[_0x247128('0x29')]):(this[_0x247128('0x18')]=![],this[_0x247128('0x11')]=0x1,this[_0x247128('0x29')]=0x1,this['_animationMaxCells']=0x1),this[_0x247128('0x48')]=0x0,this['_animationIndex']=0x0;},VisuMZ[_0x150b83('0xb')][_0x150b83('0x2c')]=Sprite_Picture['prototype'][_0x150b83('0x3e')],Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x3e')]=function(){const _0x46ec5f=_0x150b83;VisuMZ['AnimatedPictures']['Sprite_Picture_update'][_0x46ec5f('0xf')](this);if(this[_0x46ec5f('0x3b')]&&this[_0x46ec5f('0x45')]()){if('RFjhx'!==_0x46ec5f('0x14')){function _0x268baa(){const _0x52db9c=_0x46ec5f;this['_animatedPictureWait']===_0x3a5191&&this[_0x52db9c('0x28')]();const _0x5ca647=this[_0x52db9c('0x4e')](_0x172485);return this[_0x52db9c('0x6')][_0x5ca647]===_0x1f97b5&&(this[_0x52db9c('0x6')][_0x5ca647]=_0x45f43f[_0x52db9c('0xb')]['Settings'][_0x52db9c('0x53')]),this[_0x52db9c('0x6')][_0x5ca647];}}else this[_0x46ec5f('0x49')]();}},Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x49')]=function(){const _0x53a195=_0x150b83;this[_0x53a195('0x48')]+=0x1;if(this[_0x53a195('0x48')]>=this['animationWaitFrames']()){this[_0x53a195('0x48')]=0x0,this['_animationIndex']+=0x1;if(this['_animationIndex']>=this[_0x53a195('0x15')]){if('uuYbV'===_0x53a195('0x4b')){if(this[_0x53a195('0x47')]())this[_0x53a195('0x36')]=0x0;else{if('jbDDr'!==_0x53a195('0x5')){function _0x3f13f3(){const _0x3bde74=_0x53a195;this[_0x3bde74('0x46')](),_0x31fa8c[_0x3bde74('0xb')]['Sprite_Picture_initialize'][_0x3bde74('0xf')](this,_0x4e8bd8);}}else this[_0x53a195('0x36')]=this[_0x53a195('0x15')]-0x1;}}else{function _0x48a958(){const _0x54a730=_0x53a195;this[_0x54a730('0x10')](0x0,0x0,this[_0x54a730('0x4')]['width'],this['bitmap'][_0x54a730('0x31')]);}}}this['updateAnimatedPictureFrame']();}},Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x33')]=function(){const _0xf825b=_0x150b83,_0x11b4cb=this[_0xf825b('0x4')][_0xf825b('0x50')]/this['_animationHorzCells'],_0x10ede5=this[_0xf825b('0x4')]['height']/this[_0xf825b('0x29')],_0x6a6834=this[_0xf825b('0x36')]%this[_0xf825b('0x11')]*_0x11b4cb,_0x17ef4e=Math[_0xf825b('0x25')](this[_0xf825b('0x36')]/this[_0xf825b('0x11')])*_0x10ede5;this[_0xf825b('0x10')](_0x6a6834,_0x17ef4e,_0x11b4cb,_0x10ede5);},Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x47')]=function(){const _0x58e693=_0x150b83;return $gameScreen[_0x58e693('0x1f')](this[_0x58e693('0x8')]);},Sprite_Picture[_0x150b83('0xd')][_0x150b83('0x1b')]=function(){const _0x23b86f=_0x150b83;return $gameScreen[_0x23b86f('0x12')](this[_0x23b86f('0x8')]);};
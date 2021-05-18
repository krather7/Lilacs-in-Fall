//=============================================================================
// VisuStella MZ - Weapon Animation
// VisuMZ_3_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_WeaponAnimation = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponAnimation = VisuMZ.WeaponAnimation || {};
VisuMZ.WeaponAnimation.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [WeaponAnimation]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Animation_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to give your swords different images despite being the same
 * sword type? Or how about your axes? Or any weapon? Now you can! On top of
 * that, you can even use custom images to accomplish this.
 * 
 * This plugin allows you to go past the standard weapon images and even using
 * custom images.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select different weapon animation from the weapon sprite sheets.
 * * Use custom images for weapon animations.
 * * Allow weapons to have their own unique weapon animation sprites.
 * * Customize hues and motions for the weapon animations.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Sprite_Weapon loadBitmap function Change
 * 
 * Due to how this plugin works, loading bitmaps for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the bitmap data will be loaded differently to
 * accommodate the differences in file structure.
 *
 * ---
 * 
 * Sprite_Weapon updateFrame function Change
 * 
 * Due to how this plugin works, updating frames for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the frame data will be setup differently to
 * accommodate the differences in file structure.
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
 * === Weapon Image-Related Notetags ===
 * 
 * ---
 *
 * <Weapon Image: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a numeric type.
 * - Replace 'x' with a number representing the weapon image's ID.
 * - You'll get an image from "img/system/" folder's weapon sheets.
 * - Each sheet contains 12 weapon images. If you wish to load a weapon from
 *   the first sheet, it'll be within 1-12.
 * - If you wish to load a weapon from the second sheet, it'll be within 13-24,
 *   and so on.
 * - The weapon sheets increase in increments of 12, which means that if you
 *   wish to load a weapon from weapon sheet 50, x will be between 589 to 600.
 *
 *   By default, these are the number values associated with each:
 * 
 *   1 - Dagger   7 - Long Bow  13 - Mace       19 - Slingshot  25 - Book
 *   2 - Sword    8 - Crossbow  14 - Rod        20 - Shotgun    26 - Custom
 *   3 - Flail    9 - Gun       15 - Club       21 - Rifle      27 - Custom
 *   4 - Axe     10 - Claw      16 - Chain      22 - Chainsaw   28 - Custom
 *   5 - Whip    11 - Glove     17 - Sword#2    23 - Railgun    29 - Custom
 *   6 - Staff   12 - Spear     18 - Iron Pipe  24 - Stun Rod   30 - Custom
 *
 * ---
 *
 * <Weapon Image: filename>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a unique file.
 * - Replace 'filename' with the name of the file found in the "img/weapons/"
 *   folder (or whichever folder you've set it to in the plugin parameters).
 * - This is case sensitive.
 * - Do not include the file extension.
 * 
 *   Example:
 * 
 *   <Weapon Image: Beam Sword>
 *
 * ---
 *
 * <Weapon Motion: thrust>
 * <Weapon Motion: swing>
 * <Weapon Motion: missile>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Forces the weapon to play a specific motion when attacking.
 * - If this is not defined, the played motion will be the custom motion
 *   declared in the plugin parameters.
 * - You can also replace the motion type with the following:
 * 
 *   walk     wait     chant     guard     damage     evade
 *   thrust   swing    missile   skill     spell      item
 *   escape   victory  dying     abnormal  sleep      dead
 *
 * ---
 *
 * <Weapon Hue: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Changes the hue of the custom weapon image.
 * - Replace 'x' with a hue number between 0 and 255.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * There's a couple of plugin parameters that can be adjusted for this plugin.
 *
 * ---
 *
 * General
 * 
 *   Image Filepath:
 *   - The filepath used for custom weapon images folder.
 *   - This defaults to "img/weapons/"
 * 
 *   Default Motion:
 *   - Default motion used for custom weapon images.
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
 * Version 1.04: February 12, 2021
 * * Bug Fixes!
 * ** Freeze frame now supports enemy custom weapon images. Fix made by Irina.
 * 
 * Version 1.03: January 29, 2021
 * * Bug Fixes!
 * ** Basic weapon animations should now show the proper weapon image.
 *    Fix made by Olivia.
 * ** Freeze frame now supports custom non-attack animations. Fix by Olivia.
 * 
 * Version 1.02: January 22, 2021
 * * Compatibility Update
 * ** Plugin is now compatible with Battle Core's Freeze Motion.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** If battlers with custom weapon animations perform an Action Sequence with
 *    "Show Weapon" set to false, they will no longer force the attack motion.
 *    Fix made by Yanfly.
 *
 * Version 1.00: November 25, 2020
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
 * @param WeaponAnimation
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param filepath:str
 * @text Image Filepath
 * @desc The filepath used for custom weapon images folder.
 * @default img/weapons/
 *
 * @param motion:str
 * @text Default Motion
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Default motion used for custom weapon images.
 * @default swing
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

const _0x4df7=['loadBitmapCustomWeapon','Settings','_cache','_subject','createCustomWeaponGraphicFromObj','_pattern','ImageStr','Game_Battler_freezeMotion','1183133yFeUVM','263Tmiukg','floor','loadWeapon','ConvertParams','status','version','description','weaponImageId','name','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','startWeaponAnimation','includes','hue','ImageNum','filter','filepath','VisuMZ_1_BattleCore','toUpperCase','_freezeMotionData','786765fhIbZa','ARRAYJSON','1401625NlwmjY','1727101KNwRHb','setHue','ARRAYNUM','initMembers','Game_BattlerBase_initMembers','_weaponImageId','69VpAAJs','format','1281498NVbzpV','loadBitmap','parse','Sprite_Weapon_updateFrame','isCustomWeaponGraphic','requestMotion','ARRAYFUNC','startAction','freezeMotion','_uniqueStartWeaponAnimation','updateFrameCustomWeaponGraphic','number','Game_BattlerBase_refresh','traitObjects','Sprite_Weapon_loadBitmap','EVAL','note','return\x200','weapons','setFrame','height','toLowerCase','JSON','clamp','motion','swing','map','bitmap','createCustomWeaponGraphic','Hue','ARRAYSTR','WeaponAnimation','width','exit','refresh','_customFrames','isActor','customWeaponGraphic','call','parameters','max','Weapons','BattleManager_startAction','RegExp','1KNEbdP','enemy','trim','FUNC','loadSystem','prototype','21851izPNiB','ARRAYEVAL','5169iQqchR','checkCacheKey','match','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ARRAYSTRUCT','preloadCustomWeaponImage'];const _0x1cec=function(_0x4d6150,_0x58e6ef){_0x4d6150=_0x4d6150-0xc3;let _0x4df715=_0x4df7[_0x4d6150];return _0x4df715;};const _0x50939a=_0x1cec;(function(_0xd57dc5,_0xb550a6){const _0x312d18=_0x1cec;while(!![]){try{const _0x4ab956=parseInt(_0x312d18(0xed))+parseInt(_0x312d18(0xf6))*-parseInt(_0x312d18(0xc9))+parseInt(_0x312d18(0xf0))+parseInt(_0x312d18(0xda))*parseInt(_0x312d18(0xcb))+parseInt(_0x312d18(0xd9))*parseInt(_0x312d18(0xc3))+-parseInt(_0x312d18(0xef))+-parseInt(_0x312d18(0xf8));if(_0x4ab956===_0xb550a6)break;else _0xd57dc5['push'](_0xd57dc5['shift']());}catch(_0x1db54e){_0xd57dc5['push'](_0xd57dc5['shift']());}}}(_0x4df7,0xd3544));var label=_0x50939a(0x117),tier=tier||0x0,dependencies=[_0x50939a(0xea)],pluginData=$plugins[_0x50939a(0xe8)](function(_0x534f25){const _0x98cc77=_0x50939a;return _0x534f25[_0x98cc77(0xde)]&&_0x534f25[_0x98cc77(0xe0)][_0x98cc77(0xe5)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x50939a(0xd2)]||{},VisuMZ[_0x50939a(0xdd)]=function(_0x40f96b,_0xc5b880){const _0x236e8d=_0x50939a;for(const _0x2709a8 in _0xc5b880){if(_0x2709a8[_0x236e8d(0xcd)](/(.*):(.*)/i)){const _0x24e65f=String(RegExp['$1']),_0x15cd8=String(RegExp['$2'])[_0x236e8d(0xeb)]()[_0x236e8d(0xc5)]();let _0x396cb9,_0x5bece5,_0x529c58;switch(_0x15cd8){case'NUM':_0x396cb9=_0xc5b880[_0x2709a8]!==''?Number(_0xc5b880[_0x2709a8]):0x0;break;case _0x236e8d(0xf2):_0x5bece5=_0xc5b880[_0x2709a8]!==''?JSON['parse'](_0xc5b880[_0x2709a8]):[],_0x396cb9=_0x5bece5[_0x236e8d(0x112)](_0x37fc38=>Number(_0x37fc38));break;case _0x236e8d(0x107):_0x396cb9=_0xc5b880[_0x2709a8]!==''?eval(_0xc5b880[_0x2709a8]):null;break;case _0x236e8d(0xca):_0x5bece5=_0xc5b880[_0x2709a8]!==''?JSON[_0x236e8d(0xfa)](_0xc5b880[_0x2709a8]):[],_0x396cb9=_0x5bece5[_0x236e8d(0x112)](_0x3fd4bd=>eval(_0x3fd4bd));break;case _0x236e8d(0x10e):_0x396cb9=_0xc5b880[_0x2709a8]!==''?JSON['parse'](_0xc5b880[_0x2709a8]):'';break;case _0x236e8d(0xee):_0x5bece5=_0xc5b880[_0x2709a8]!==''?JSON[_0x236e8d(0xfa)](_0xc5b880[_0x2709a8]):[],_0x396cb9=_0x5bece5[_0x236e8d(0x112)](_0x590410=>JSON['parse'](_0x590410));break;case _0x236e8d(0xc6):_0x396cb9=_0xc5b880[_0x2709a8]!==''?new Function(JSON['parse'](_0xc5b880[_0x2709a8])):new Function(_0x236e8d(0x109));break;case _0x236e8d(0xfe):_0x5bece5=_0xc5b880[_0x2709a8]!==''?JSON[_0x236e8d(0xfa)](_0xc5b880[_0x2709a8]):[],_0x396cb9=_0x5bece5[_0x236e8d(0x112)](_0x538c0b=>new Function(JSON[_0x236e8d(0xfa)](_0x538c0b)));break;case'STR':_0x396cb9=_0xc5b880[_0x2709a8]!==''?String(_0xc5b880[_0x2709a8]):'';break;case _0x236e8d(0x116):_0x5bece5=_0xc5b880[_0x2709a8]!==''?JSON[_0x236e8d(0xfa)](_0xc5b880[_0x2709a8]):[],_0x396cb9=_0x5bece5[_0x236e8d(0x112)](_0x2ae89c=>String(_0x2ae89c));break;case'STRUCT':_0x529c58=_0xc5b880[_0x2709a8]!==''?JSON[_0x236e8d(0xfa)](_0xc5b880[_0x2709a8]):{},_0x396cb9=VisuMZ[_0x236e8d(0xdd)]({},_0x529c58);break;case _0x236e8d(0xcf):_0x5bece5=_0xc5b880[_0x2709a8]!==''?JSON['parse'](_0xc5b880[_0x2709a8]):[],_0x396cb9=_0x5bece5['map'](_0xc08bf=>VisuMZ['ConvertParams']({},JSON[_0x236e8d(0xfa)](_0xc08bf)));break;default:continue;}_0x40f96b[_0x24e65f]=_0x396cb9;}}return _0x40f96b;},(_0x4b9383=>{const _0x5c9c72=_0x50939a,_0x1572ef=_0x4b9383['name'];for(const _0x6be787 of dependencies){if(!Imported[_0x6be787]){alert(_0x5c9c72(0xe3)[_0x5c9c72(0xf7)](_0x1572ef,_0x6be787)),SceneManager[_0x5c9c72(0x119)]();break;}}const _0x50433c=_0x4b9383[_0x5c9c72(0xe0)];if(_0x50433c[_0x5c9c72(0xcd)](/\[Version[ ](.*?)\]/i)){const _0x180187=Number(RegExp['$1']);_0x180187!==VisuMZ[label][_0x5c9c72(0xdf)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5c9c72(0xf7)](_0x1572ef,_0x180187)),SceneManager[_0x5c9c72(0x119)]());}if(_0x50433c[_0x5c9c72(0xcd)](/\[Tier[ ](\d+)\]/i)){const _0x1ae644=Number(RegExp['$1']);_0x1ae644<tier?(alert(_0x5c9c72(0xce)[_0x5c9c72(0xf7)](_0x1572ef,_0x1ae644,tier)),SceneManager[_0x5c9c72(0x119)]()):tier=Math[_0x5c9c72(0x120)](_0x1ae644,tier);}VisuMZ[_0x5c9c72(0xdd)](VisuMZ[label][_0x5c9c72(0xd2)],_0x4b9383[_0x5c9c72(0x11f)]);})(pluginData),VisuMZ[_0x50939a(0x117)][_0x50939a(0x123)]={'ImageNum':/<WEAPON IMAGE:[ ](\d+)>/i,'ImageStr':/<WEAPON IMAGE:[ ](.*)>/i,'Hue':/<WEAPON HUE:[ ](\d+)>/i,'Motion':/<WEAPON MOTION:[ ](.*)>/i},ImageManager['loadWeapon']=function(_0x5c54fb){const _0x5d8036=_0x50939a,_0xe7087f=VisuMZ[_0x5d8036(0x117)][_0x5d8036(0xd2)][_0x5d8036(0xe9)];return this['loadBitmap'](_0xe7087f,_0x5c54fb);},VisuMZ[_0x50939a(0x117)][_0x50939a(0x122)]=BattleManager[_0x50939a(0xff)],BattleManager[_0x50939a(0xff)]=function(){const _0xc4e26f=_0x50939a;VisuMZ[_0xc4e26f(0x117)][_0xc4e26f(0x122)][_0xc4e26f(0x11e)](this),this[_0xc4e26f(0xd4)]&&this[_0xc4e26f(0xd4)][_0xc4e26f(0xd0)]();},VisuMZ[_0x50939a(0x117)][_0x50939a(0xf4)]=Game_BattlerBase[_0x50939a(0xc8)][_0x50939a(0xf3)],Game_BattlerBase['prototype']['initMembers']=function(){const _0x48a696=_0x50939a;this[_0x48a696(0xd3)]={},VisuMZ[_0x48a696(0x117)][_0x48a696(0xf4)][_0x48a696(0x11e)](this);},VisuMZ['WeaponAnimation'][_0x50939a(0x104)]=Game_BattlerBase[_0x50939a(0xc8)][_0x50939a(0x11a)],Game_BattlerBase[_0x50939a(0xc8)][_0x50939a(0x11a)]=function(){const _0x4fd48e=_0x50939a;this[_0x4fd48e(0xd3)]={},VisuMZ['WeaponAnimation'][_0x4fd48e(0x104)][_0x4fd48e(0x11e)](this);},Game_BattlerBase[_0x50939a(0xc8)][_0x50939a(0xcc)]=function(_0x16cce8){const _0x37cdb0=_0x50939a;return this['_cache']=this[_0x37cdb0(0xd3)]||{},this['_cache'][_0x16cce8]!==undefined;},Game_BattlerBase[_0x50939a(0xc8)][_0x50939a(0x11d)]=function(){const _0x3e428b=_0x50939a;let _0x395887='customWeaponGraphic';if(this[_0x3e428b(0xcc)](_0x395887))return this[_0x3e428b(0xd3)][_0x395887];return this[_0x3e428b(0xd3)][_0x395887]=this['createCustomWeaponGraphic'](),this[_0x3e428b(0xd3)][_0x395887];},Game_BattlerBase[_0x50939a(0xc8)][_0x50939a(0x114)]=function(){const _0x2533f9=_0x50939a;for(const _0xaab948 of this[_0x2533f9(0x105)]()){if(!_0xaab948)continue;const _0x14a869=this[_0x2533f9(0xd5)](_0xaab948);if(_0x14a869['name']!==0x0)return{'name':_0x14a869[_0x2533f9(0xe2)],'hue':_0x14a869[_0x2533f9(0xe6)],'motion':_0x14a869[_0x2533f9(0x110)]};}return 0x0;},Game_BattlerBase[_0x50939a(0xc8)][_0x50939a(0xd5)]=function(_0x3d3ffa){const _0x25d8de=_0x50939a,_0x5b2f4d=VisuMZ['WeaponAnimation'][_0x25d8de(0x123)];let _0xf637e=0x0,_0x503254=0x0,_0x2d08d3=VisuMZ[_0x25d8de(0x117)]['Settings']['motion'];const _0xc29926=_0x3d3ffa[_0x25d8de(0x108)];if(_0xc29926[_0x25d8de(0xcd)](_0x5b2f4d[_0x25d8de(0xe7)]))_0xf637e=Number(RegExp['$1'])||0x1;else _0xc29926[_0x25d8de(0xcd)](_0x5b2f4d[_0x25d8de(0xd7)])&&(_0xf637e=String(RegExp['$1']));return _0xc29926[_0x25d8de(0xcd)](_0x5b2f4d[_0x25d8de(0x115)])&&(_0x503254=Number(RegExp['$1'])[_0x25d8de(0x10f)](0x0,0xff)),_0xc29926[_0x25d8de(0xcd)](_0x5b2f4d['Motion'])&&(_0x2d08d3=String(RegExp['$1'])[_0x25d8de(0x10d)]()[_0x25d8de(0xc5)]()),{'name':_0xf637e,'hue':_0x503254,'motion':_0x2d08d3};},VisuMZ[_0x50939a(0x117)]['Game_Battler_startWeaponAnimation']=Game_Battler[_0x50939a(0xc8)]['startWeaponAnimation'],Game_Battler[_0x50939a(0xc8)][_0x50939a(0xe4)]=function(_0x40b2bb){const _0x16dbc7=_0x50939a;if(this[_0x16dbc7(0x101)])return;let _0x205dd3=![];this[_0x16dbc7(0x11d)]()&&_0x40b2bb>0x0&&(_0x40b2bb=this[_0x16dbc7(0x11d)](),_0x205dd3=!![]);VisuMZ[_0x16dbc7(0x117)]['Game_Battler_startWeaponAnimation'][_0x16dbc7(0x11e)](this,_0x40b2bb);if(!_0x205dd3)return;if(_0x40b2bb===0x0)return;this[_0x16dbc7(0x101)]=!![],this[_0x16dbc7(0xfd)](_0x40b2bb[_0x16dbc7(0x110)]||_0x16dbc7(0x111)),this[_0x16dbc7(0x101)]=![];},Game_Battler[_0x50939a(0xc8)][_0x50939a(0xd0)]=function(){const _0x160489=_0x50939a;if(!this[_0x160489(0x11d)]())return;const _0x2852e0=this['customWeaponGraphic']();if(typeof _0x2852e0[_0x160489(0xe2)]===_0x160489(0x103)){const _0x34ace2=Math[_0x160489(0xdb)]((_0x2852e0[_0x160489(0xe2)]-0x1)/0xc)+0x1;ImageManager[_0x160489(0xc7)](_0x160489(0x121)+_0x34ace2);}else ImageManager[_0x160489(0xdc)](_0x2852e0[_0x160489(0xe2)]);},VisuMZ[_0x50939a(0x117)][_0x50939a(0xd8)]=Game_Battler[_0x50939a(0xc8)]['freezeMotion'],Game_Battler[_0x50939a(0xc8)][_0x50939a(0x100)]=function(_0x2a647a,_0x5a9f84,_0x1fe2b1){const _0x12e90a=_0x50939a;VisuMZ[_0x12e90a(0x117)]['Game_Battler_freezeMotion'][_0x12e90a(0x11e)](this,_0x2a647a,_0x5a9f84,_0x1fe2b1);let _0x2737e3=0x0;_0x2a647a['match'](/ATTACK[ ](\d+)/i)&&(_0x2737e3=Number(RegExp['$1']),_0x2737e3--);if(this[_0x12e90a(0x11c)]()){const _0x16e645=this[_0x12e90a(0x10a)](),_0x20f630=_0x16e645[_0x2737e3]||null,_0x4e6270=this[_0x12e90a(0xd5)](_0x20f630);_0x4e6270[_0x12e90a(0xe2)]!==0x0&&(_0x2a647a[_0x12e90a(0xcd)](/ATTACK/i)&&(this[_0x12e90a(0xec)]['motionType']=_0x4e6270['motion']),this[_0x12e90a(0xec)][_0x12e90a(0xe1)]=_0x4e6270[_0x12e90a(0xe2)]);}else{if(this['isEnemy']()){const _0x102601=this[_0x12e90a(0xd5)](this[_0x12e90a(0xc4)]());_0x102601[_0x12e90a(0xe2)]!==0x0&&(_0x2a647a[_0x12e90a(0xcd)](/ATTACK/i)&&(this[_0x12e90a(0xec)]['motionType']=_0x102601[_0x12e90a(0x110)]),this[_0x12e90a(0xec)]['weaponImageId']=_0x102601['name']);}}},Sprite_Weapon[_0x50939a(0xc8)]['isCustomWeaponGraphic']=function(){const _0x4a4cc8=_0x50939a;return typeof this[_0x4a4cc8(0xf5)]!==_0x4a4cc8(0x103);},VisuMZ['WeaponAnimation'][_0x50939a(0x106)]=Sprite_Weapon[_0x50939a(0xc8)][_0x50939a(0xf9)],Sprite_Weapon[_0x50939a(0xc8)]['loadBitmap']=function(){const _0xb048ff=_0x50939a;this['isCustomWeaponGraphic']()?this[_0xb048ff(0xd1)]():(this['_customFrames']=![],VisuMZ[_0xb048ff(0x117)][_0xb048ff(0x106)][_0xb048ff(0x11e)](this),this['setHue'](0x0));},Sprite_Weapon[_0x50939a(0xc8)][_0x50939a(0xd1)]=function(){const _0x14792d=_0x50939a;if(typeof this[_0x14792d(0xf5)]['name']==='number'){const _0x14d66b=Math['floor']((this[_0x14792d(0xf5)]['name']-0x1)/0xc)+0x1;_0x14d66b>=0x1?this[_0x14792d(0x113)]=ImageManager[_0x14792d(0xc7)](_0x14792d(0x121)+_0x14d66b):this['bitmap']=ImageManager[_0x14792d(0xc7)]('');}else{this[_0x14792d(0x11b)]=!![];const _0x262759=this[_0x14792d(0xf5)][_0x14792d(0xe2)]?this[_0x14792d(0xf5)]['name']:this[_0x14792d(0xf5)];this[_0x14792d(0x113)]=ImageManager['loadWeapon'](_0x262759||'');}this[_0x14792d(0xf1)](this[_0x14792d(0xf5)][_0x14792d(0xe6)]||0x0);},VisuMZ[_0x50939a(0x117)]['Sprite_Weapon_updateFrame']=Sprite_Weapon[_0x50939a(0xc8)]['updateFrame'],Sprite_Weapon[_0x50939a(0xc8)]['updateFrame']=function(){const _0x4b1aa1=_0x50939a;this[_0x4b1aa1(0xfc)]()?this['updateFrameCustomWeaponGraphic']():VisuMZ[_0x4b1aa1(0x117)][_0x4b1aa1(0xfb)]['call'](this);},Sprite_Weapon['prototype'][_0x50939a(0x102)]=function(){const _0x2d17c7=_0x50939a;if(typeof this['_weaponImageId'][_0x2d17c7(0xe2)]===_0x2d17c7(0x103)){const _0x2fab47=(this[_0x2d17c7(0xf5)][_0x2d17c7(0xe2)]-0x1)%0xc,_0x2ec3ed=0x60,_0x14d032=0x40,_0x373c01=(Math['floor'](_0x2fab47/0x6)*0x3+this['_pattern'])*_0x2ec3ed,_0x54640c=Math[_0x2d17c7(0xdb)](_0x2fab47%0x6)*_0x14d032;this[_0x2d17c7(0x10b)](_0x373c01,_0x54640c,_0x2ec3ed,_0x14d032);}else{const _0x22f274=Math[_0x2d17c7(0xdb)](this[_0x2d17c7(0x113)][_0x2d17c7(0x118)]/0x3),_0x8ba90f=this[_0x2d17c7(0x113)][_0x2d17c7(0x10c)],_0x4a1d0b=this[_0x2d17c7(0xd6)]*_0x22f274,_0x18f928=0x0;this[_0x2d17c7(0x10b)](_0x4a1d0b,_0x18f928,_0x22f274,_0x8ba90f);}};
//=============================================================================
// VisuStella MZ - Action Sequence Camera
// VisuMZ_3_ActSeqCamera.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqCamera = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqCamera = VisuMZ.ActSeqCamera || {};
VisuMZ.ActSeqCamera.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [ActSeqCamera]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Camera_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds new Action Sequences functions to the VisuStella MZ
 * Battle Core plugin to give you, the game dev, control over the battle camera
 * and zoom functions.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Attach the camera to a specific point on the screen.
 * * Attach the camera to a specific target(s) on the screen.
 * * Pan the camera to be off center using the offset functions.
 * * Remove camera clamping to let the camera go out of bounds.
 * * Set the camera zoom level as you want.
 * * Tilt the camera by adjust the angle.
 * * New Options added to let the player turn on/off the battle camera.
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
 * - VisuMZ_0_CoreEngine
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Spriteset Position Rewrite
 *
 * - The Spriteset_Battle function for updatePosition needed to be rewritten in
 * order to allow all the new features and functions added by the battle camera
 * and zoom.
 * 
 * - Camera tricks like zooming, panning, and tilting will be reset during the
 * input phase to ensure the player is able to see the whole battlefield.
 * 
 * - The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 *
 * ---
 * 
 * === Action Sequences - Angle (Camera) ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Camera Control ===
 *
 * These Action Sequences are battle camera-related.
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 * 
 * === Action Sequences - Skew (Camera) ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Zoom (Camera) ===
 *
 * These Action Sequences are zoom-related.
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * These plugin parameters add a new options command in order to let the player
 * decide if they want the battle camera ON or OFF.
 * 
 * The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Battle Camera options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Options Name:
 *   - Command name of the option.
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
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Damage offsets are now corrected and in line with the latest Battle Core
 *    version.
 *
 * Version 1.00: September 23, 2020
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
 * @param ActSeqCamera
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Options:struct
 * @text Options Menu
 * @type struct<Options>
 * @desc Settings for the Options Menu
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","OptionsName:str":"Battle Camera"}
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
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Battle Camera options to the Options menu?
 * @default true
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
 * @param OptionsName:str
 * @text Options Name
 * @parent Options
 * @desc Command name of the option.
 * @default Battle Camera
 *
 */
//=============================================================================

const _0x514a=['DLebU','getBattleZoom','parameters','DvBUp','updatePositionShake','addGeneralOptions','anchor','width','ARRAYJSON','cameraOffsetX','ARRAYEVAL','pjOdA','maHep','skewDuration','ARRAYFUNC','Settings','damageOffsetX','clearCameraFocusTargets','includes','updateBattleZoom','zoomWholeDuration','setBattleCameraPoint','applyEasing','cameraOffsetDuration','ARRAYSTR','Window_Options_addGeneralOptions','STR','STRUCT','xsNbv','caRIA','cameraDurationWhole','wEuGG','EZYly','applyAnchorsForTiltEffect','cameraX','screenWidth','parse','ZMjMe','LgwZz','reduce','battleCameraData','advanced','battler','OZOLZ','screenHeight','max','length','skewY','oniCt','battleCamera','cameraFocusTarget','addBattleCameraCommand','zoomScaleTarget','scale','ConfigManager_makeData','AdjustRect','angle','EVAL','return\x200','cameraFocusTargetsY','filter','update','BInwh','boxHeight','skewTargetX','ARRAYNUM','makeData','angleDuration','description','GvHgL','cameraOffsetDurationWhole','damageOffsetY','updatePositionSkew','angleEasing','jiIen','updateBattleCamera','skewEasing','eAvcP','maxCommands','Scene_Options_maxCommands','skewX','cameraOffsetXTarget','prototype','skew','cameraOffsetYTarget','updatePositionCoreEngine','shake','VFnax','initialBattleCameraSettings','updatePositionAngle','zoomScale','isSceneBattle','map','ActSeqCamera','exit','Game_Screen_clear','addBattleCameraCommands','updateBattleAngle','_oldCamera','NUM','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ceil','clamp','getBattleCameraClamp','updatePositionCameraRoamNew','round','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','cameraYTarget','applyData','cameraEasing','cameraDuration','_battleCamera','setCameraFocusTargets','KOEik','boxWidth','syODK','cameraFocusTargetsX','isInputting','getBattleAngle','zoomDuration','updatePositionCamera','ConfigManager_applyData','updatePositionCameraRoamOld','VisuMZ_1_BattleCore','VXosc','JSON','angleTarget','AddOption','cameraClamp','call','clear','setBattleCameraOffset','InOutSine','setup','height','updatePositionZoom','SFzTW','mQgrn','clearBattleCamera','ConvertParams','cameraFocusTargets','Sprite_Battler_damageOffsetY','cameraOffsetY','updatePosition','format','setBattleZoom','battleCameraOption','Options','cameraXTarget','BattleManager_setup','Linear','updateBattleCameraOffset','indexOf','match','ApplyEasing','createLowerLayer','VisuMZ_0_CoreEngine','wHfQN','cameraY','skewTargetY','angleWholeDuration','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','zoomEasing','_cameraFocusTargets','setBattleCameraTargets','IdiOJ','_baseSprite'];(function(_0x430a0f,_0x514af8){const _0x5d3443=function(_0x3ba222){while(--_0x3ba222){_0x430a0f['push'](_0x430a0f['shift']());}};_0x5d3443(++_0x514af8);}(_0x514a,0xa9));const _0x5d34=function(_0x430a0f,_0x514af8){_0x430a0f=_0x430a0f-0x0;let _0x5d3443=_0x514a[_0x430a0f];return _0x5d3443;};const _0x13e261=_0x5d34;var label=_0x13e261('0x5b'),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x13e261('0x79')],pluginData=$plugins['filter'](function(_0x42b1f9){const _0x14e5fb=_0x13e261;return _0x42b1f9['status']&&_0x42b1f9[_0x14e5fb('0x42')][_0x14e5fb('0x10')]('['+label+']');})[0x0];VisuMZ[label][_0x13e261('0xd')]=VisuMZ[label]['Settings']||{},VisuMZ[_0x13e261('0x89')]=function(_0x47b8b6,_0x20151c){const _0x4bf8a8=_0x13e261;for(const _0x3f8f4e in _0x20151c){if(_0x4bf8a8('0x23')!=='ZMjMe'){function _0x595e62(){const _0x1332d2=_0x4bf8a8;if(!_0x2fee42[_0x1332d2('0x2f')])return 0x0;if(_0x5b29c7['isInputting']())return 0x0;return _0x53416c[_0x1332d2('0x26')]()[_0x1332d2('0x36')];}}else{if(_0x3f8f4e['match'](/(.*):(.*)/i)){if(_0x4bf8a8('0x6f')===_0x4bf8a8('0x6f')){const _0x4b7eed=String(RegExp['$1']),_0xca8e0=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x1f3140,_0x4985af,_0x305347;switch(_0xca8e0){case _0x4bf8a8('0x61'):_0x1f3140=_0x20151c[_0x3f8f4e]!==''?Number(_0x20151c[_0x3f8f4e]):0x0;break;case _0x4bf8a8('0x3f'):_0x4985af=_0x20151c[_0x3f8f4e]!==''?JSON[_0x4bf8a8('0x22')](_0x20151c[_0x3f8f4e]):[],_0x1f3140=_0x4985af['map'](_0x390b35=>Number(_0x390b35));break;case _0x4bf8a8('0x37'):_0x1f3140=_0x20151c[_0x3f8f4e]!==''?eval(_0x20151c[_0x3f8f4e]):null;break;case _0x4bf8a8('0x8'):_0x4985af=_0x20151c[_0x3f8f4e]!==''?JSON['parse'](_0x20151c[_0x3f8f4e]):[],_0x1f3140=_0x4985af[_0x4bf8a8('0x5a')](_0x5d2671=>eval(_0x5d2671));break;case _0x4bf8a8('0x7b'):_0x1f3140=_0x20151c[_0x3f8f4e]!==''?JSON[_0x4bf8a8('0x22')](_0x20151c[_0x3f8f4e]):'';break;case _0x4bf8a8('0x6'):_0x4985af=_0x20151c[_0x3f8f4e]!==''?JSON[_0x4bf8a8('0x22')](_0x20151c[_0x3f8f4e]):[],_0x1f3140=_0x4985af[_0x4bf8a8('0x5a')](_0x2e455d=>JSON[_0x4bf8a8('0x22')](_0x2e455d));break;case'FUNC':_0x1f3140=_0x20151c[_0x3f8f4e]!==''?new Function(JSON[_0x4bf8a8('0x22')](_0x20151c[_0x3f8f4e])):new Function(_0x4bf8a8('0x38'));break;case _0x4bf8a8('0xc'):_0x4985af=_0x20151c[_0x3f8f4e]!==''?JSON['parse'](_0x20151c[_0x3f8f4e]):[],_0x1f3140=_0x4985af[_0x4bf8a8('0x5a')](_0x447d66=>new Function(JSON[_0x4bf8a8('0x22')](_0x447d66)));break;case _0x4bf8a8('0x18'):_0x1f3140=_0x20151c[_0x3f8f4e]!==''?String(_0x20151c[_0x3f8f4e]):'';break;case _0x4bf8a8('0x16'):_0x4985af=_0x20151c[_0x3f8f4e]!==''?JSON[_0x4bf8a8('0x22')](_0x20151c[_0x3f8f4e]):[],_0x1f3140=_0x4985af[_0x4bf8a8('0x5a')](_0xdf2378=>String(_0xdf2378));break;case _0x4bf8a8('0x19'):_0x305347=_0x20151c[_0x3f8f4e]!==''?JSON[_0x4bf8a8('0x22')](_0x20151c[_0x3f8f4e]):{},_0x1f3140=VisuMZ['ConvertParams']({},_0x305347);break;case'ARRAYSTRUCT':_0x4985af=_0x20151c[_0x3f8f4e]!==''?JSON[_0x4bf8a8('0x22')](_0x20151c[_0x3f8f4e]):[],_0x1f3140=_0x4985af['map'](_0x470851=>VisuMZ[_0x4bf8a8('0x89')]({},JSON[_0x4bf8a8('0x22')](_0x470851)));break;default:continue;}_0x47b8b6[_0x4b7eed]=_0x1f3140;}else{function _0x4fdf8b(){const _0x54b14f=_0x4bf8a8;this['x']+=_0x4d70ac[_0x54b14f('0x67')](_0x484849['shake']()),_0x3839ad[_0x54b14f('0x9a')]&&this[_0x54b14f('0x53')]&&this['updatePositionCoreEngine']();}}}}}return _0x47b8b6;},(_0x33d4fb=>{const _0x10d418=_0x13e261,_0x15be71=_0x33d4fb['name'];for(const _0x77c2a8 of dependencies){if(!Imported[_0x77c2a8]){if(_0x10d418('0x7a')===_0x10d418('0xa3')){function _0x4e2a7f(){const _0x2190d1=_0x10d418;_0xeacf83[_0x2190d1('0x20')]=_0x306129[_0x2190d1('0x92')],_0x5589b3[_0x2190d1('0x9c')]=_0x4781f3[_0x2190d1('0x69')];}}else{alert(_0x10d418('0x9f')[_0x10d418('0x8e')](_0x15be71,_0x77c2a8)),SceneManager[_0x10d418('0x5c')]();break;}}}const _0x248d85=_0x33d4fb[_0x10d418('0x42')];if(_0x248d85[_0x10d418('0x97')](/\[Version[ ](.*?)\]/i)){const _0x519a24=Number(RegExp['$1']);if(_0x519a24!==VisuMZ[label]['version']){if(_0x10d418('0xa5')!==_0x10d418('0xa5')){function _0x14991f(){const _0x16c4ad=_0x10d418,_0x2e65ba=_0x1ccb59[_0x16c4ad('0x26')]();let _0x11ce7e=this[_0x16c4ad('0x65')](),_0x5b3ffa=this['getBattleZoom'](),_0x4e7dd1=-(_0x2e65ba['cameraX']+_0x2e65ba[_0x16c4ad('0x7')])+_0x5e01ea['width'];_0x4e7dd1-=(0x1-_0x5b3ffa)*(_0x59a321['width']/0x2-_0x2e65ba[_0x16c4ad('0x20')]-_0x2e65ba[_0x16c4ad('0x7')]);let _0x4788df=-(_0x2e65ba[_0x16c4ad('0x9c')]+_0x2e65ba[_0x16c4ad('0x8c')])+_0x3807d1[_0x16c4ad('0x84')];if(_0x11ce7e){if(_0x5b3ffa>=0x1){const _0x4afaca=_0x56b59a[_0x16c4ad('0x5')]-_0x9402fe[_0x16c4ad('0x5')]/0x2*_0x5b3ffa,_0x35f56d=_0x549ba6[_0x16c4ad('0x5')]/0x2*_0x5b3ffa;_0x4e7dd1=_0x4e7dd1[_0x16c4ad('0x64')](_0x4afaca,_0x35f56d);const _0x2b4575=_0x17c23c[_0x16c4ad('0x84')]-_0x1cd68f['height']/0x2*_0x5b3ffa,_0x1e0fa2=_0x3066a2[_0x16c4ad('0x84')]/0x2*_0x5b3ffa;_0x4788df=_0x4788df[_0x16c4ad('0x64')](_0x2b4575,_0x1e0fa2);}else _0x5b3ffa<0x1&&(_0x4e7dd1=_0x13ed3e[_0x16c4ad('0x5')]/0x2,_0x4788df=_0x5c38a6['height']/0x2);}this['x']=_0x4b5c97[_0x16c4ad('0x67')](_0x4e7dd1),this['y']=_0x43113a[_0x16c4ad('0x67')](_0x4788df);}}else alert(_0x10d418('0x62')['format'](_0x15be71,_0x519a24)),SceneManager[_0x10d418('0x5c')]();}}if(_0x248d85[_0x10d418('0x97')](/\[Tier[ ](\d+)\]/i)){const _0x2cec2f=Number(RegExp['$1']);_0x2cec2f<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x10d418('0x8e')](_0x15be71,_0x2cec2f,tier)),SceneManager[_0x10d418('0x5c')]()):tier=Math[_0x10d418('0x2b')](_0x2cec2f,tier);}VisuMZ[_0x10d418('0x89')](VisuMZ[label][_0x10d418('0xd')],_0x33d4fb[_0x10d418('0x0')]);})(pluginData),ConfigManager[_0x13e261('0x2f')]=!![],VisuMZ[_0x13e261('0x5b')][_0x13e261('0x34')]=ConfigManager[_0x13e261('0x40')],ConfigManager['makeData']=function(){const _0x2584b8=_0x13e261,_0x202a43=VisuMZ[_0x2584b8('0x5b')][_0x2584b8('0x34')][_0x2584b8('0x7f')](this);return _0x202a43[_0x2584b8('0x2f')]=this[_0x2584b8('0x2f')],_0x202a43;},VisuMZ[_0x13e261('0x5b')]['ConfigManager_applyData']=ConfigManager[_0x13e261('0x6a')],ConfigManager[_0x13e261('0x6a')]=function(_0x484253){const _0x93562c=_0x13e261;VisuMZ['ActSeqCamera'][_0x93562c('0x77')][_0x93562c('0x7f')](this,_0x484253);if(_0x93562c('0x2f')in _0x484253)this[_0x93562c('0x2f')]=_0x484253['battleCamera'];else{if(_0x93562c('0x9b')!==_0x93562c('0x9b')){function _0x3b37ca(){const _0x2bf5fe=_0x93562c;_0x31b1e1[_0x2bf5fe('0x92')]=_0x30fd9d['cameraFocusTargetsX'](),_0xce92a1[_0x2bf5fe('0x69')]=_0x1fff79[_0x2bf5fe('0x39')]();}}else this[_0x93562c('0x2f')]=!![];}},TextManager['battleCameraOption']=VisuMZ[_0x13e261('0x5b')][_0x13e261('0xd')]['Options']['OptionsName'],VisuMZ['ActSeqCamera']['BattleManager_setup']=BattleManager[_0x13e261('0x83')],BattleManager['setup']=function(_0xdbdc59,_0x15a5a9,_0x2fd375){const _0x49716a=_0x13e261;VisuMZ[_0x49716a('0x5b')][_0x49716a('0x93')][_0x49716a('0x7f')](this,_0xdbdc59,_0x15a5a9,_0x2fd375),this[_0x49716a('0xf')]();},BattleManager['clearCameraFocusTargets']=function(){const _0x5b26d2=_0x13e261;this[_0x5b26d2('0xa1')]=[];},BattleManager[_0x13e261('0x8a')]=function(){const _0x4aafc0=_0x13e261;if(this[_0x4aafc0('0xa1')]===undefined)this[_0x4aafc0('0xf')]();return this['_cameraFocusTargets'];},BattleManager[_0x13e261('0x6e')]=function(_0x19045e){const _0x2653cc=_0x13e261;this[_0x2653cc('0xa1')]=_0x19045e[_0x2653cc('0x3a')]((_0x512dfe,_0x35e151,_0x6d2182)=>_0x6d2182[_0x2653cc('0x96')](_0x512dfe)===_0x35e151);},BattleManager['cameraFocusTargetsX']=function(){const _0x232390=_0x13e261,_0x52b237=this[_0x232390('0x8a')]();if(_0x52b237['length']<=0x0)return Math[_0x232390('0x67')](Graphics[_0x232390('0x5')]/0x2);let _0x479d19=_0x52b237[_0x232390('0x25')]((_0x931cca,_0x3e8ebf)=>_0x931cca+=_0x3e8ebf['battler']()['x'],0x0)/_0x52b237['length'];return _0x479d19+=Math[_0x232390('0x67')]((Graphics[_0x232390('0x5')]-Graphics[_0x232390('0x70')])/0x2),_0x479d19;},BattleManager[_0x13e261('0x39')]=function(){const _0x6706a7=_0x13e261,_0x13b8cd=this[_0x6706a7('0x8a')]();if(_0x13b8cd[_0x6706a7('0x2c')]<=0x0)return Math[_0x6706a7('0x67')](Graphics[_0x6706a7('0x84')]/0x2);let _0x40c866=_0x13b8cd[_0x6706a7('0x25')]((_0x63fbcb,_0x759530)=>_0x63fbcb+=_0x759530['battler']()['y']-Math[_0x6706a7('0x67')](_0x759530[_0x6706a7('0x28')]()[_0x6706a7('0x84')]/0x2),0x0)/_0x13b8cd[_0x6706a7('0x2c')];return _0x40c866+=Math[_0x6706a7('0x67')]((Graphics['height']-Graphics[_0x6706a7('0x3d')])/0x2),_0x40c866;},VisuMZ[_0x13e261('0x5b')][_0x13e261('0x5d')]=Game_Screen[_0x13e261('0x50')][_0x13e261('0x80')],Game_Screen['prototype']['clear']=function(){const _0x289c94=_0x13e261;VisuMZ[_0x289c94('0x5b')][_0x289c94('0x5d')][_0x289c94('0x7f')](this),this[_0x289c94('0x88')]();},Game_Screen['prototype'][_0x13e261('0x88')]=function(){const _0x23f009=_0x13e261;this[_0x23f009('0x6d')]=this[_0x23f009('0x56')]();},Game_Screen[_0x13e261('0x50')][_0x13e261('0x56')]=function(){const _0x37925b=_0x13e261,_0x27ce1c=$dataSystem[_0x37925b('0x27')][_0x37925b('0x21')],_0x374b5f=$dataSystem[_0x37925b('0x27')][_0x37925b('0x2a')];return{'angle':0x0,'angleTarget':0x0,'angleDuration':0x0,'angleWholeDuration':0x0,'angleEasing':_0x37925b('0x82'),'cameraFocusTarget':![],'cameraX':Math[_0x37925b('0x67')](_0x27ce1c/0x2),'cameraY':Math[_0x37925b('0x67')](_0x374b5f/0x2),'cameraXTarget':Math[_0x37925b('0x67')](_0x27ce1c/0x2),'cameraYTarget':Math[_0x37925b('0x67')](_0x374b5f/0x2),'cameraDuration':0x0,'cameraDurationWhole':0x0,'cameraEasing':_0x37925b('0x82'),'cameraClamp':!![],'cameraOffsetX':0x0,'cameraOffsetY':0x0,'cameraOffsetXTarget':0x0,'cameraOffsetYTarget':0x0,'cameraOffsetDuration':0x0,'cameraOffsetDurationWhole':0x0,'cameraOffsetEasing':_0x37925b('0x82'),'skewX':0x0,'skewTargetX':0x0,'skewY':0x0,'skewTargetY':0x0,'skewDuration':0x0,'skewWholeDuration':0x0,'skewEasing':_0x37925b('0x82'),'zoomScale':0x1,'zoomScaleTarget':0x1,'zoomDuration':0x0,'zoomWholeDuration':0x0,'zoomEasing':_0x37925b('0x82')};},Game_Screen[_0x13e261('0x50')][_0x13e261('0x26')]=function(){const _0x3f799f=_0x13e261;if(this[_0x3f799f('0x6d')]===undefined)this[_0x3f799f('0x88')]();if(!ConfigManager[_0x3f799f('0x2f')])return this[_0x3f799f('0x56')]();return this[_0x3f799f('0x6d')];},VisuMZ['ActSeqCamera']['Game_Screen_update']=Game_Screen[_0x13e261('0x50')][_0x13e261('0x3b')],Game_Screen[_0x13e261('0x50')]['update']=function(){const _0x4545db=_0x13e261;VisuMZ[_0x4545db('0x5b')]['Game_Screen_update'][_0x4545db('0x7f')](this),this[_0x4545db('0x5f')](),this[_0x4545db('0x49')](),this[_0x4545db('0x95')](),this['updateBattleSkew'](),this[_0x4545db('0x11')]();},Game_Screen[_0x13e261('0x50')]['setBattleAngle']=function(_0xd34876,_0x5332d7,_0x17d652){const _0x3b2725=_0x13e261,_0x22db68=this['battleCameraData']();_0x22db68[_0x3b2725('0x7c')]=-_0xd34876,_0x22db68[_0x3b2725('0x41')]=_0x5332d7,_0x22db68[_0x3b2725('0x9e')]=_0x5332d7,_0x22db68['angleEasing']=_0x17d652;},Game_Screen[_0x13e261('0x50')][_0x13e261('0x5f')]=function(){const _0x4dfc25=_0x13e261;if(!SceneManager['isSceneBattle']())return;const _0x4ee256=this[_0x4dfc25('0x26')](),_0x49f9a1=_0x4ee256[_0x4dfc25('0x41')],_0x5d120e=_0x4ee256[_0x4dfc25('0x9e')],_0x1cc88e=_0x4ee256[_0x4dfc25('0x47')];_0x49f9a1>0x0?(_0x4ee256['angle']=this['applyEasing'](_0x4ee256[_0x4dfc25('0x36')],_0x4ee256[_0x4dfc25('0x7c')],_0x49f9a1,_0x5d120e,_0x1cc88e),_0x4ee256[_0x4dfc25('0x41')]--):_0x4ee256[_0x4dfc25('0x36')]=_0x4ee256[_0x4dfc25('0x7c')];},Game_Screen['prototype'][_0x13e261('0x13')]=function(_0xfa0da5,_0x5d5752,_0x96c254,_0x3a61bb){const _0x4fe74f=_0x13e261,_0x479cbf=this[_0x4fe74f('0x26')]();_0x479cbf[_0x4fe74f('0x30')]=![],_0x479cbf[_0x4fe74f('0x92')]=Math['round'](_0xfa0da5),_0x479cbf[_0x4fe74f('0x69')]=Math[_0x4fe74f('0x67')](_0x5d5752),_0x479cbf['cameraDuration']=_0x96c254,_0x479cbf[_0x4fe74f('0x1c')]=_0x96c254,_0x479cbf[_0x4fe74f('0x6b')]=_0x3a61bb;},Game_Screen['prototype'][_0x13e261('0xa2')]=function(_0x7abfc9,_0x3ba3cd,_0x1a664e){const _0xb90e50=_0x13e261;if(_0x7abfc9['length']<=0x0)return;const _0x51bb50=this[_0xb90e50('0x26')]();_0x51bb50[_0xb90e50('0x30')]=!![],BattleManager[_0xb90e50('0x6e')](_0x7abfc9),_0x51bb50[_0xb90e50('0x6c')]=_0x3ba3cd,_0x51bb50['cameraDurationWhole']=_0x3ba3cd,_0x51bb50[_0xb90e50('0x6b')]=_0x1a664e;},Game_Screen[_0x13e261('0x50')][_0x13e261('0x49')]=function(){const _0x3540d8=_0x13e261;if(!SceneManager['isSceneBattle']())return;const _0x50a351=this[_0x3540d8('0x26')](),_0x45dc35=_0x50a351['cameraDuration'],_0x4b9c28=_0x50a351[_0x3540d8('0x1c')],_0x4efdb1=_0x50a351[_0x3540d8('0x6b')];if(_0x50a351['cameraFocusTarget']){if(_0x3540d8('0x43')!=='nnGcl')_0x50a351[_0x3540d8('0x92')]=BattleManager[_0x3540d8('0x72')](),_0x50a351[_0x3540d8('0x69')]=BattleManager['cameraFocusTargetsY']();else{function _0x2ea6ce(){this['updatePositionCoreEngine']();}}}if(_0x45dc35>0x0)_0x50a351[_0x3540d8('0x20')]=this[_0x3540d8('0x14')](_0x50a351[_0x3540d8('0x20')],_0x50a351[_0x3540d8('0x92')],_0x45dc35,_0x4b9c28,_0x4efdb1),_0x50a351[_0x3540d8('0x9c')]=this[_0x3540d8('0x14')](_0x50a351[_0x3540d8('0x9c')],_0x50a351['cameraYTarget'],_0x45dc35,_0x4b9c28,_0x4efdb1),_0x50a351['cameraDuration']--;else{if('maHep'===_0x3540d8('0xa'))_0x50a351['cameraX']=_0x50a351[_0x3540d8('0x92')],_0x50a351[_0x3540d8('0x9c')]=_0x50a351['cameraYTarget'];else{function _0x5db384(){const _0x2f5983=_0x3540d8,_0x31cc9=this['battleCameraData']();_0x31cc9[_0x2f5983('0x32')]=_0x3d3102,_0x31cc9[_0x2f5983('0x75')]=_0x15eddb,_0x31cc9['zoomWholeDuration']=_0x4d0f88,_0x31cc9[_0x2f5983('0xa0')]=_0x13a489;}}}},Game_Screen['prototype'][_0x13e261('0x81')]=function(_0x5900d8,_0x18ef22,_0x336697,_0x516999){const _0x3d31f5=_0x13e261,_0xefa452=this[_0x3d31f5('0x26')]();_0xefa452[_0x3d31f5('0x4f')]=Math['round'](_0x5900d8),_0xefa452[_0x3d31f5('0x52')]=Math[_0x3d31f5('0x67')](_0x18ef22),_0xefa452[_0x3d31f5('0x15')]=_0x336697,_0xefa452[_0x3d31f5('0x44')]=_0x336697,_0xefa452['cameraOffsetEasing']=_0x516999;},Game_Screen[_0x13e261('0x50')][_0x13e261('0x95')]=function(){const _0x553957=_0x13e261;if(!SceneManager['isSceneBattle']())return;const _0x4587eb=this[_0x553957('0x26')](),_0x16cd1b=_0x4587eb[_0x553957('0x15')],_0x3c3a1f=_0x4587eb[_0x553957('0x44')],_0x41208f=_0x4587eb['cameraOffsetEasing'];if(_0x16cd1b>0x0){if(_0x553957('0x24')!==_0x553957('0x1d'))_0x4587eb['cameraOffsetX']=this[_0x553957('0x14')](_0x4587eb['cameraOffsetX'],_0x4587eb[_0x553957('0x4f')],_0x16cd1b,_0x3c3a1f,_0x41208f),_0x4587eb[_0x553957('0x8c')]=this['applyEasing'](_0x4587eb[_0x553957('0x8c')],_0x4587eb['cameraOffsetYTarget'],_0x16cd1b,_0x3c3a1f,_0x41208f),_0x4587eb[_0x553957('0x15')]--;else{function _0x46359a(){const _0x54ed2e=_0x553957,_0x484a55=_0x2a804d[_0x54ed2e('0x98')]((_0x22355a-_0x440ad8)/_0x1dd66b,_0x59f587||_0x54ed2e('0x94')),_0x315fa3=_0x17d5d0[_0x54ed2e('0x98')]((_0x41f6bf-_0x41787b+0x1)/_0x1630c8,_0x79fe9d||_0x54ed2e('0x94')),_0x52bfd7=(_0x51f969-_0x1dca68*_0x484a55)/(0x1-_0x484a55);return _0x52bfd7+(_0x23929b-_0x52bfd7)*_0x315fa3;}}}else{if('ORSxG'==='UVprE'){function _0xb30961(){const _0x36b3b1=_0x553957;if(!_0x1097cd['battleCamera'])return!![];if(_0x5a1797['isInputting']())return!![];return _0x5ad556[_0x36b3b1('0x26')]()[_0x36b3b1('0x7e')];}}else _0x4587eb[_0x553957('0x7')]=_0x4587eb['cameraOffsetXTarget'],_0x4587eb['cameraOffsetY']=_0x4587eb[_0x553957('0x52')];}},Game_Screen[_0x13e261('0x50')]['setBattleSkew']=function(_0x8763,_0x48048d,_0x5322d0,_0x93cdf6){const _0x268612=_0x13e261,_0x3e0349=this['battleCameraData']();_0x3e0349[_0x268612('0x3e')]=_0x8763,_0x3e0349[_0x268612('0x9d')]=_0x48048d,_0x3e0349['skewDuration']=_0x5322d0,_0x3e0349['skewWholeDuration']=_0x5322d0,_0x3e0349[_0x268612('0x4a')]=_0x93cdf6;},Game_Screen[_0x13e261('0x50')]['updateBattleSkew']=function(){const _0x3e06d6=_0x13e261;if(!SceneManager[_0x3e06d6('0x59')]())return;const _0x850e0f=this[_0x3e06d6('0x26')](),_0xe57576=_0x850e0f[_0x3e06d6('0xb')],_0x281a72=_0x850e0f['skewWholeDuration'],_0x11fa37=_0x850e0f[_0x3e06d6('0x4a')];if(_0xe57576>0x0){if(_0x3e06d6('0x1b')!==_0x3e06d6('0x55'))_0x850e0f[_0x3e06d6('0x4e')]=this['applyEasing'](_0x850e0f[_0x3e06d6('0x4e')],_0x850e0f[_0x3e06d6('0x3e')],_0xe57576,_0x281a72,_0x11fa37),_0x850e0f[_0x3e06d6('0x2d')]=this[_0x3e06d6('0x14')](_0x850e0f['skewY'],_0x850e0f[_0x3e06d6('0x9d')],_0xe57576,_0x281a72,_0x11fa37),_0x850e0f[_0x3e06d6('0xb')]--;else{function _0x3659af(){const _0x16b126=_0x3e06d6,_0x250d6f=this['getBattleZoom']();this[_0x16b126('0x33')]['x']=this[_0x16b126('0x33')]['y']=_0x250d6f;}}}else{if(_0x3e06d6('0x3c')!==_0x3e06d6('0x1e'))_0x850e0f[_0x3e06d6('0x4e')]=_0x850e0f[_0x3e06d6('0x3e')],_0x850e0f[_0x3e06d6('0x2d')]=_0x850e0f['skewTargetY'];else{function _0x1dfb4e(){const _0x4aa327=_0x3e06d6;_0x317812(_0x4aa327('0x68')[_0x4aa327('0x8e')](_0x57e011,_0x2189f2,_0x1a3184)),_0x5e46ad[_0x4aa327('0x5c')]();}}}},Game_Screen['prototype'][_0x13e261('0x8f')]=function(_0x164670,_0x4ec722,_0x5b1761){const _0x23f4ad=_0x13e261,_0x4a4b5b=this[_0x23f4ad('0x26')]();_0x4a4b5b[_0x23f4ad('0x32')]=_0x164670,_0x4a4b5b['zoomDuration']=_0x4ec722,_0x4a4b5b[_0x23f4ad('0x12')]=_0x4ec722,_0x4a4b5b[_0x23f4ad('0xa0')]=_0x5b1761;},Game_Screen[_0x13e261('0x50')]['updateBattleZoom']=function(){const _0x5afb24=_0x13e261;if(!SceneManager[_0x5afb24('0x59')]())return;const _0x581ff2=this[_0x5afb24('0x26')](),_0x175b08=_0x581ff2[_0x5afb24('0x75')],_0x430d92=_0x581ff2[_0x5afb24('0x12')],_0x409216=_0x581ff2['zoomEasing'];if(_0x175b08>0x0){if(_0x5afb24('0x9')===_0x5afb24('0x9'))_0x581ff2[_0x5afb24('0x58')]=this[_0x5afb24('0x14')](_0x581ff2['zoomScale'],_0x581ff2['zoomScaleTarget'],_0x175b08,_0x430d92,_0x409216),_0x581ff2[_0x5afb24('0x75')]--;else{function _0x17b466(){const _0x570c7f=_0x5afb24;if(!_0x5d571d[_0x570c7f('0x59')]())return;const _0x18e538=this[_0x570c7f('0x26')](),_0x584ffe=_0x18e538[_0x570c7f('0x41')],_0x4dca2b=_0x18e538['angleWholeDuration'],_0x37bcad=_0x18e538[_0x570c7f('0x47')];_0x584ffe>0x0?(_0x18e538[_0x570c7f('0x36')]=this['applyEasing'](_0x18e538[_0x570c7f('0x36')],_0x18e538[_0x570c7f('0x7c')],_0x584ffe,_0x4dca2b,_0x37bcad),_0x18e538['angleDuration']--):_0x18e538[_0x570c7f('0x36')]=_0x18e538[_0x570c7f('0x7c')];}}}else{if(_0x5afb24('0x4b')===_0x5afb24('0x4b'))_0x581ff2[_0x5afb24('0x58')]=_0x581ff2[_0x5afb24('0x32')];else{function _0x525a48(){const _0x3d2257=_0x5afb24,_0x43477d=_0x49459c(_0x159830['$1']);_0x43477d<_0x3c22f5?(_0x51f53a(_0x3d2257('0x68')[_0x3d2257('0x8e')](_0x4d9e2c,_0x43477d,_0x577e2a)),_0x74fd8b[_0x3d2257('0x5c')]()):_0x2deb55=_0x40e2ae[_0x3d2257('0x2b')](_0x43477d,_0x8a2532);}}}},Game_Screen[_0x13e261('0x50')][_0x13e261('0x14')]=function(_0x15aeb9,_0x2bf1d6,_0x4c27a2,_0x5959d8,_0x1fb8fa){const _0x406e64=_0x13e261,_0x2626c8=VisuMZ['ApplyEasing']((_0x5959d8-_0x4c27a2)/_0x5959d8,_0x1fb8fa||_0x406e64('0x94')),_0x8d6251=VisuMZ[_0x406e64('0x98')]((_0x5959d8-_0x4c27a2+0x1)/_0x5959d8,_0x1fb8fa||_0x406e64('0x94')),_0x34db23=(_0x15aeb9-_0x2bf1d6*_0x2626c8)/(0x1-_0x2626c8);return _0x34db23+(_0x2bf1d6-_0x34db23)*_0x8d6251;},VisuMZ['ActSeqCamera'][_0x13e261('0x4d')]=Scene_Options['prototype'][_0x13e261('0x4c')],Scene_Options['prototype'][_0x13e261('0x4c')]=function(){const _0x4a4abf=_0x13e261;let _0x51f493=VisuMZ[_0x4a4abf('0x5b')][_0x4a4abf('0x4d')][_0x4a4abf('0x7f')](this);const _0x3d79b6=VisuMZ['ActSeqCamera'][_0x4a4abf('0xd')];if(_0x3d79b6[_0x4a4abf('0x91')][_0x4a4abf('0x7d')]&&_0x3d79b6[_0x4a4abf('0x91')][_0x4a4abf('0x35')])_0x51f493++;return _0x51f493;},VisuMZ[_0x13e261('0x5b')]['Sprite_Battler_damageOffsetX']=Sprite_Battler[_0x13e261('0x50')][_0x13e261('0xe')],Sprite_Battler['prototype'][_0x13e261('0xe')]=function(){const _0x33caac=_0x13e261;let _0x99f40a=VisuMZ[_0x33caac('0x5b')]['Sprite_Battler_damageOffsetX']['call'](this);return _0x99f40a+=Math[_0x33caac('0x67')]((Graphics[_0x33caac('0x5')]-Graphics['boxWidth'])/0x2),_0x99f40a;},VisuMZ['ActSeqCamera'][_0x13e261('0x8b')]=Sprite_Battler[_0x13e261('0x50')][_0x13e261('0x45')],Sprite_Battler['prototype'][_0x13e261('0x45')]=function(){const _0x1f0a1f=_0x13e261;let _0x2e680b=VisuMZ['ActSeqCamera']['Sprite_Battler_damageOffsetY'][_0x1f0a1f('0x7f')](this);return _0x2e680b+=Math['round']((Graphics[_0x1f0a1f('0x84')]-Graphics['boxHeight'])/0x2),_0x2e680b;},VisuMZ[_0x13e261('0x5b')]['Spriteset_Battle_createLowerLayer']=Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x99')],Spriteset_Battle['prototype'][_0x13e261('0x99')]=function(){const _0x36fb52=_0x13e261;VisuMZ['ActSeqCamera']['Spriteset_Battle_createLowerLayer'][_0x36fb52('0x7f')](this),this[_0x36fb52('0x1f')]();},Spriteset_Battle['prototype']['applyAnchorsForTiltEffect']=function(){const _0x2ffc0b=_0x13e261;if(Spriteset_Battle[_0x2ffc0b('0x60')])return;const _0x3539ae=-Math[_0x2ffc0b('0x63')](Graphics['width']/0x2),_0x4df958=-Math['ceil'](Graphics[_0x2ffc0b('0x84')]/0x2);this[_0x2ffc0b('0x4')]['x']=0.5,this[_0x2ffc0b('0x4')]['y']=0.5;const _0x3ef348=[this[_0x2ffc0b('0xa4')],this['_damageContainer']];for(const _0x219827 of _0x3ef348){if(!_0x219827)continue;_0x219827['x']=_0x3539ae,_0x219827['y']=_0x4df958;}},Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x8d')]=function(){const _0x12a8b0=_0x13e261;this[_0x12a8b0('0x57')](),this[_0x12a8b0('0x46')](),this['updatePositionZoom'](),this[_0x12a8b0('0x76')](),this['updatePositionShake']();},Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x57')]=function(){const _0xd31613=_0x13e261,_0x3b1d5b=this[_0xd31613('0x74')]();this['angle']=_0x3b1d5b;},Spriteset_Battle[_0x13e261('0x50')]['getBattleAngle']=function(){const _0x3d7a06=_0x13e261;if(!ConfigManager['battleCamera'])return 0x0;if(BattleManager['isInputting']())return 0x0;return $gameScreen[_0x3d7a06('0x26')]()['angle'];},Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x46')]=function(){const _0x35dbfd=_0x13e261;if(BattleManager[_0x35dbfd('0x73')]()||!ConfigManager['battleCamera']){if(_0x35dbfd('0x71')!==_0x35dbfd('0x71')){function _0x188343(){const _0x5ea2a1=_0x35dbfd;_0x51deac[_0x5ea2a1('0x5b')][_0x5ea2a1('0x77')][_0x5ea2a1('0x7f')](this,_0x215f23),'battleCamera'in _0x1015eb?this[_0x5ea2a1('0x2f')]=_0x4ec18d[_0x5ea2a1('0x2f')]:this[_0x5ea2a1('0x2f')]=!![];}}else this[_0x35dbfd('0x51')]['x']=0x0,this[_0x35dbfd('0x51')]['y']=0x0;}else{const _0x34204b=$gameScreen[_0x35dbfd('0x26')]();this[_0x35dbfd('0x51')]['x']=_0x34204b[_0x35dbfd('0x4e')],this[_0x35dbfd('0x51')]['y']=_0x34204b[_0x35dbfd('0x2d')];}},Spriteset_Battle['prototype'][_0x13e261('0x85')]=function(){const _0x5b10d5=_0x13e261,_0x761e4e=this[_0x5b10d5('0xa6')]();this['scale']['x']=this[_0x5b10d5('0x33')]['y']=_0x761e4e;},Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0xa6')]=function(){const _0x295c49=_0x13e261;if(!ConfigManager[_0x295c49('0x2f')])return 0x1;if(BattleManager[_0x295c49('0x73')]())return 0x1;return $gameScreen['battleCameraData']()[_0x295c49('0x58')];},Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x76')]=function(){const _0x1c908d=_0x13e261;if(BattleManager[_0x1c908d('0x73')]()||!ConfigManager[_0x1c908d('0x2f')]){if('skGKh'===_0x1c908d('0x29')){function _0x402e6d(){const _0x553750=_0x1c908d;this['x']=_0x1762c8[_0x553750('0x67')](_0x1beb3e),this['y']=_0x278b08[_0x553750('0x67')](_0x574819);}}else this['updatePositionCameraNeutral']();}else{if(Spriteset_Battle[_0x1c908d('0x60')]){if(_0x1c908d('0x48')===_0x1c908d('0x2e')){function _0x51c2d3(){const _0x6c6c49=_0x1c908d;_0x259b28[_0x6c6c49('0x36')]=_0x130c72[_0x6c6c49('0x7c')];}}else this[_0x1c908d('0x78')]();}else{if(_0x1c908d('0x86')!==_0x1c908d('0x1'))this[_0x1c908d('0x66')]();else{function _0x57c041(){const _0x1db4b7=_0x1c908d;this[_0x1db4b7('0x78')]();}}}}},Spriteset_Battle[_0x13e261('0x50')]['updatePositionCameraNeutral']=function(){const _0x17e972=_0x13e261;if(Spriteset_Battle[_0x17e972('0x60')])return;this['x']=Math[_0x17e972('0x63')](Graphics[_0x17e972('0x5')]/0x2),this['y']=Math[_0x17e972('0x63')](Graphics[_0x17e972('0x84')]/0x2);},Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x78')]=function(){const _0x7c9dba=_0x13e261,_0x23101f=$gameScreen[_0x7c9dba('0x26')](),_0x280661=this[_0x7c9dba('0x65')](),_0xde1c64=this[_0x7c9dba('0xa6')]();let _0x19924b=-(_0x23101f[_0x7c9dba('0x20')]+_0x23101f[_0x7c9dba('0x7')])*_0xde1c64+Graphics[_0x7c9dba('0x5')]/0x2,_0x755654=-(_0x23101f[_0x7c9dba('0x9c')]+_0x23101f[_0x7c9dba('0x8c')])*_0xde1c64+Graphics[_0x7c9dba('0x84')]/0x2;if(_0x280661&&_0xde1c64>=0x1){if('TPKDP'!=='TPKDP'){function _0x5e16a2(){const _0x1821f9=_0x7c9dba;this[_0x1821f9('0x57')](),this[_0x1821f9('0x46')](),this[_0x1821f9('0x85')](),this[_0x1821f9('0x76')](),this[_0x1821f9('0x2')]();}}else{const _0x91177a=-Graphics['width']*_0xde1c64+Graphics[_0x7c9dba('0x5')]/0x2,_0x1c0bc7=-Graphics[_0x7c9dba('0x84')]*_0xde1c64+Graphics['height']/0x2;this['x']=Math[_0x7c9dba('0x67')](_0x19924b['clamp'](_0x91177a,0x0)),this['y']=Math[_0x7c9dba('0x67')](_0x755654[_0x7c9dba('0x64')](_0x1c0bc7,0x0));}}else _0x280661&&_0xde1c64<0x1?(this['x']=Math['round']((Graphics[_0x7c9dba('0x5')]-Graphics[_0x7c9dba('0x5')]*_0xde1c64)/0x2),this['y']=Math[_0x7c9dba('0x67')]((Graphics['height']-Graphics[_0x7c9dba('0x84')]*_0xde1c64)/0x2)):(this['x']=Math[_0x7c9dba('0x67')](_0x19924b),this['y']=Math[_0x7c9dba('0x67')](_0x755654));},Spriteset_Battle['_oldCamera']=![],Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x66')]=function(){const _0x5d1c03=_0x13e261,_0x3a49db=$gameScreen[_0x5d1c03('0x26')]();let _0x251170=this['getBattleCameraClamp'](),_0x255d84=this['getBattleZoom'](),_0x5228e7=-(_0x3a49db['cameraX']+_0x3a49db[_0x5d1c03('0x7')])+Graphics[_0x5d1c03('0x5')];_0x5228e7-=(0x1-_0x255d84)*(Graphics[_0x5d1c03('0x5')]/0x2-_0x3a49db[_0x5d1c03('0x20')]-_0x3a49db[_0x5d1c03('0x7')]);let _0x3cd6e3=-(_0x3a49db[_0x5d1c03('0x9c')]+_0x3a49db[_0x5d1c03('0x8c')])+Graphics[_0x5d1c03('0x84')];if(_0x251170){if(_0x255d84>=0x1){const _0xb70eb0=Graphics[_0x5d1c03('0x5')]-Graphics[_0x5d1c03('0x5')]/0x2*_0x255d84,_0x5034a9=Graphics[_0x5d1c03('0x5')]/0x2*_0x255d84;_0x5228e7=_0x5228e7[_0x5d1c03('0x64')](_0xb70eb0,_0x5034a9);const _0x266cff=Graphics[_0x5d1c03('0x84')]-Graphics[_0x5d1c03('0x84')]/0x2*_0x255d84,_0x27ff17=Graphics[_0x5d1c03('0x84')]/0x2*_0x255d84;_0x3cd6e3=_0x3cd6e3[_0x5d1c03('0x64')](_0x266cff,_0x27ff17);}else _0x255d84<0x1&&(_0x5228e7=Graphics[_0x5d1c03('0x5')]/0x2,_0x3cd6e3=Graphics[_0x5d1c03('0x84')]/0x2);}this['x']=Math[_0x5d1c03('0x67')](_0x5228e7),this['y']=Math[_0x5d1c03('0x67')](_0x3cd6e3);},Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x65')]=function(){const _0x463d30=_0x13e261;if(!ConfigManager[_0x463d30('0x2f')])return!![];if(BattleManager[_0x463d30('0x73')]())return!![];return $gameScreen[_0x463d30('0x26')]()[_0x463d30('0x7e')];},Spriteset_Battle[_0x13e261('0x50')][_0x13e261('0x2')]=function(){const _0x21479a=_0x13e261;this['x']+=Math[_0x21479a('0x67')]($gameScreen[_0x21479a('0x54')]()),Imported[_0x21479a('0x9a')]&&this[_0x21479a('0x53')]&&this[_0x21479a('0x53')]();},VisuMZ[_0x13e261('0x5b')][_0x13e261('0x17')]=Window_Options[_0x13e261('0x50')]['addGeneralOptions'],Window_Options[_0x13e261('0x50')][_0x13e261('0x3')]=function(){const _0x2a62f2=_0x13e261;VisuMZ[_0x2a62f2('0x5b')][_0x2a62f2('0x17')]['call'](this),this[_0x2a62f2('0x5e')]();},Window_Options['prototype'][_0x13e261('0x5e')]=function(){const _0x17d266=_0x13e261;if(VisuMZ['ActSeqCamera']['Settings'][_0x17d266('0x91')][_0x17d266('0x7d')]){if(_0x17d266('0x87')!==_0x17d266('0x1a'))this[_0x17d266('0x31')]();else{function _0x597e66(){const _0x51548d=_0x17d266;_0x318da2[_0x51548d('0x60')]?this[_0x51548d('0x78')]():this[_0x51548d('0x66')]();}}}},Window_Options[_0x13e261('0x50')][_0x13e261('0x31')]=function(){const _0x45ae0c=_0x13e261,_0x553027=TextManager[_0x45ae0c('0x90')],_0x499b56=_0x45ae0c('0x2f');this['addCommand'](_0x553027,_0x499b56);};
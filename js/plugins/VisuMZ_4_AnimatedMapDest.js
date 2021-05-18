//=============================================================================
// VisuStella MZ - Animated Map Destination
// VisuMZ_4_AnimatedMapDest.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_AnimatedMapDest = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AnimatedMapDest = VisuMZ.AnimatedMapDest || {};
VisuMZ.AnimatedMapDest.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [AnimatedMapDest]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Animated_Map_Destination_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * When the player clicks on the map, the player sets a destination for the
 * player character to move to. This destination is, by default, marked with a
 * white square sprite that flashes over and over. This aesthetic does not
 * necessarily fit every type of game project so this plugin will allow you to
 * customize it.
 *
 * You can change the way the square sprite looks, change it into a circle, use
 * an image file, or even use an animation file. There are various properties
 * for each of these settings, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Change the animated map destination sprite into a graphic of your choice
 *   ranging from squares, circles, images, and animations.
 * * Change the colors used for square and circle sprites.
 * * Select a custom image used for the image sprites.
 * * Or use an animation from the database of your choice.
 * * Change the scale and rotation speed of the map destination sprite.
 * * Be able to control these settings mid-game.
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
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Alter Destination Type
 * - Alter the destination animation type.
 *
 *   Sprite Type:
 *   - Change the sprite type to this.
 *   - None - No effect
 *   - Animation - Uses an animation from the database
 *   - Circle - Drawn circle effect
 *   - Image - Uses a custom image from img/system/
 *   - Square - Default box-like effect
 *
 * ---
 *
 * System: Change Animation Settings
 * - Change settings used for a 'Animation' Sprite Type.
 * 
 *   Animation ID:
 *   - Select an animation to play.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation played?
 * 
 *   Mute SFX?:
 *   - Mute any sound effects played by the animation?
 *
 * ---
 *
 * System: Change Circle Settings
 * - Change settings used for a 'Circle' Sprite Type.
 * 
 *   Hex Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Opacity Multiplier:
 *   - Alter the opacity of the sprite as it animates.
 * 
 *   Scale Multiplier:
 *   - Increase the size of this sprite by a scale.
 *   - Use a value of 1.0 for 100% scale.
 *
 * ---
 *
 * System: Change Image Settings
 * - Change settings used for a 'Image' Sprite Type.
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as the sprite's bitmap.
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Opacity Multiplier:
 *   - Alter the opacity of the sprite as it animates.
 * 
 *   Rotate Speed:
 *   - Rotation speed for the sprite.
 *   - Use 0 for no rotation.
 * 
 *   Scale Multiplier:
 *   - Increase the size of this sprite by a scale.
 *   - Use a value of 1.0 for 100% scale.
 *
 * ---
 *
 * System: Change Square Settings
 * - Change settings used for a 'Square' Sprite Type.
 * 
 *   Hex Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Opacity Multiplier:
 *   - Alter the opacity of the sprite as it animates.
 * 
 *   Rotate Speed:
 *   - Rotation speed for the sprite.
 *   - Use 0 for no rotation.
 * 
 *   Scale Multiplier:
 *   - Increase the size of this sprite by a scale.
 *   - Use a value of 1.0 for 100% scale.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These plugin parameters allow you to adjust how the animated map destination
 * sprite appears in-game.
 *
 * ---
 *
 * Sprite Type
 * 
 *   None - No effect
 *   Square - Default box-like effect
 *   Circle - Drawn circle effect
 *   Image - Uses a custom image from img/system/
 *   Animation - Uses an animation from the database
 *   - This is the type of animated map destination used in-game.
 *
 * ---
 *
 * Animation Settings
 * - Settings used for a 'Animation' Sprite Type.
 * 
 *   Animation ID:
 *   - Select an animation to play.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation played?
 * 
 *   Mute SFX?:
 *   - Mute any sound effects played by the animation?
 *
 * ---
 *
 * Circle Settings
 * - Settings used for a 'Circle' Sprite Type.
 * 
 *   Hex Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Opacity Multiplier:
 *   - Alter the opacity of the sprite as it animates.
 * 
 *   Scale Multiplier:
 *   - Increase the size of this sprite by a scale.
 *   - Use a value of 1.0 for 100% scale.
 *
 * ---
 *
 * Image Settings
 * - Settings used for a 'Image' Sprite Type.
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as the sprite's bitmap.
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Opacity Multiplier:
 *   - Alter the opacity of the sprite as it animates.
 * 
 *   Rotate Speed:
 *   - Rotation speed for the sprite.
 *   - Use 0 for no rotation.
 * 
 *   Scale Multiplier:
 *   - Increase the size of this sprite by a scale.
 *   - Use a value of 1.0 for 100% scale.
 *
 * ---
 *
 * Square Settings
 * - Settings used for a 'Square' Sprite Type.
 * 
 *   Hex Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Opacity Multiplier:
 *   - Alter the opacity of the sprite as it animates.
 * 
 *   Rotate Speed:
 *   - Rotation speed for the sprite.
 *   - Use 0 for no rotation.
 * 
 *   Scale Multiplier:
 *   - Increase the size of this sprite by a scale.
 *   - Use a value of 1.0 for 100% scale.
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
 * Version 1.01: October 11, 2020
 * * Bug Fixes!
 * ** Image style will no longer be removed from cache upon changing scenes.
 *    Fix made by Yanfly.
 *
 * Version 1.00: October 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DestinationType
 * @text System: Alter Destination Type
 * @desc Alter the destination animation type.
 *
 * @arg SpriteType:str
 * @text Sprite Type
 * @type select
 * @option None - No effect
 * @value none
 * @option Animation - Uses an animation from the database
 * @value animation
 * @option Circle - Drawn circle effect
 * @value circle
 * @option Image - Uses a custom image from img/system/
 * @value image
 * @option Square - Default box-like effect
 * @value square
 * @desc Change the sprite type to this.
 * @default animation
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SetSettingsAnimation
 * @text System: Change Animation Settings
 * @desc Change settings used for a 'Animation' Sprite Type.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select an animation to play.
 * @default 12
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation played?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute SFX?
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute any sound effects played by the animation?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SetSettingsCircle
 * @text System: Change Circle Settings
 * @desc Change settings used for a 'Circle' Sprite Type.
 *
 * @arg HexColor:str
 * @text Hex Color
 * @desc Use #rrggbb for a hex color.
 * @default #ffffff
 *
 * @arg BlendMode:num
 * @text Blend Mode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @arg OpacityMultiplier:num
 * @text Opacity Multiplier
 * @desc Alter the opacity of the sprite as it animates.
 * @default 1.0
 *
 * @arg ScaleMultiplier:num
 * @text Scale Multiplier
 * @desc Increase the size of this sprite by a scale.
 * Use a value of 1.0 for 100% scale.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SetSettingsImage
 * @text System: Change Image Settings
 * @desc Change settings used for a 'Image' Sprite Type.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/system/
 * @desc Select an image from img/system/ to use as the sprite's bitmap.
 * @default 
 *
 * @arg BlendMode:num
 * @text Blend Mode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @arg OpacityMultiplier:num
 * @text Opacity Multiplier
 * @desc Alter the opacity of the sprite as it animates.
 * @default 2.0
 *
 * @arg RotateSpeed:num
 * @text Rotate Speed
 * @desc Rotation speed for the sprite.
 * Use 0 for no rotation.
 * @default 0.1
 *
 * @arg ScaleMultiplier:num
 * @text Scale Multiplier
 * @desc Increase the size of this sprite by a scale.
 * Use a value of 1.0 for 100% scale.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SetSettingsSquare
 * @text System: Change Square Settings
 * @desc Change settings used for a 'Square' Sprite Type.
 *
 * @arg HexColor:str
 * @text Hex Color
 * @desc Use #rrggbb for a hex color.
 * @default #ffffff
 *
 * @arg BlendMode:num
 * @text Blend Mode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @arg OpacityMultiplier:num
 * @text Opacity Multiplier
 * @desc Alter the opacity of the sprite as it animates.
 * @default 1.0
 *
 * @arg RotateSpeed:num
 * @text Rotate Speed
 * @desc Rotation speed for the sprite.
 * Use 0 for no rotation.
 * @default 0.1
 *
 * @arg ScaleMultiplier:num
 * @text Scale Multiplier
 * @desc Increase the size of this sprite by a scale.
 * Use a value of 1.0 for 100% scale.
 * @default 1.0
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
 * @param AnimatedMapDest
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SpriteType:str
 * @text Sprite Type
 * @type select
 * @option None - No effect
 * @value none
 * @option Animation - Uses an animation from the database
 * @value animation
 * @option Circle - Drawn circle effect
 * @value circle
 * @option Image - Uses a custom image from img/system/
 * @value image
 * @option Square - Default box-like effect
 * @value square
 * @desc This is the type of animated map destination used in-game.
 * @default animation
 *
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @parent SpriteType:str
 * @desc Settings used for an 'Animation' Sprite Type.
 * @default {"AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"true"}
 *
 * @param Circle:struct
 * @text Circle Settings
 * @type struct<Circle>
 * @parent SpriteType:str
 * @desc Settings used for a 'Circle' Sprite Type.
 * @default {"HexColor:str":"#ffffff","BlendMode:num":"1","OpacityMultiplier:num":"1.0","ScaleMultiplier:num":"1.0"}
 *
 * @param Image:struct
 * @text Image Settings
 * @type struct<Image>
 * @parent SpriteType:str
 * @desc Settings used for an 'Image' Sprite Type.
 * @default {"Filename:str":"","BlendMode:num":"1","OpacityMultiplier:num":"2.0","RotateSpeed:num":"0.1","ScaleMultiplier:num":"1.0"}
 *
 * @param Square:struct
 * @text Square Settings
 * @type struct<Square>
 * @parent SpriteType:str
 * @desc Settings used for a 'Square' Sprite Type.
 * @default {"HexColor:str":"#ffffff","BlendMode:num":"1","OpacityMultiplier:num":"1.0","RotateSpeed:num":"0.1","ScaleMultiplier:num":"1.0"}
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
 * Square Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Square:
 *
 * @param HexColor:str
 * @text Hex Color
 * @desc Use #rrggbb for a hex color.
 * @default #ffffff
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param OpacityMultiplier:num
 * @text Opacity Multiplier
 * @desc Alter the opacity of the sprite as it animates.
 * @default 1.0
 *
 * @param RotateSpeed:num
 * @text Rotate Speed
 * @desc Rotation speed for the sprite.
 * Use 0 for no rotation.
 * @default 0.1
 *
 * @param ScaleMultiplier:num
 * @text Scale Multiplier
 * @desc Increase the size of this sprite by a scale.
 * Use a value of 1.0 for 100% scale.
 * @default 1.0
 *
 */
/* ----------------------------------------------------------------------------
 * Circle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Circle:
 *
 * @param HexColor:str
 * @text Hex Color
 * @desc Use #rrggbb for a hex color.
 * @default #ffffff
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param OpacityMultiplier:num
 * @text Opacity Multiplier
 * @desc Alter the opacity of the sprite as it animates.
 * @default 1.0
 *
 * @param ScaleMultiplier:num
 * @text Scale Multiplier
 * @desc Increase the size of this sprite by a scale.
 * Use a value of 1.0 for 100% scale.
 * @default 1.0
 *
 */
/* ----------------------------------------------------------------------------
 * Image Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Image:
 *
 * @param Filename:str
 * @text Filename
 * @type file
 * @dir img/system/
 * @desc Select an image from img/system/ to use as the sprite's bitmap.
 * @default 
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param OpacityMultiplier:num
 * @text Opacity Multiplier
 * @desc Alter the opacity of the sprite as it animates.
 * @default 2.0
 *
 * @param RotateSpeed:num
 * @text Rotate Speed
 * @desc Rotation speed for the sprite.
 * Use 0 for no rotation.
 * @default 0.1
 *
 * @param ScaleMultiplier:num
 * @text Scale Multiplier
 * @desc Increase the size of this sprite by a scale.
 * Use a value of 1.0 for 100% scale.
 * @default 1.0
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select an animation to play.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation?
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation played?
 * @default false
 *
 * @param Mute:eval
 * @text Mute SFX?
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute any sound effects played by the animation?
 * @default true
 *
 */
//=============================================================================

const _0x4654=['targets','processDestinationAnimationRequests','animationShouldMirror','cBjOn','filter','isMVAnimation','UpdateDestinationSprite','createEmptyBitmap','processSoundTimings','STR','none','format','removeDestinationAnimation','map','_spriteset','irstn','SetSettingsAnimation','zczkD','setup','PEics','max','createCircleBitmap','rotation','createDefaults','createImageBitmap','shift','ARRAYSTRUCT','SetSettingsImage','updateDestinationAnimations','scale','drawCircle','length','isDestinationAnimationPlaying','uDdbH','volume','LLYVk','_imageFilename','circle','Game_System_initialize','ARRAYEVAL','animationNextDelay','remove','AnimatedMapDest','toLowerCase','SetSettingsCircle','JSON','includes','_destinationAnimationSprites','removeChild','ScaleMultiplier','registerCommand','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','WwKDe','SetSettingsSquare','NUM','DOBEM','setMute','retrieveDestinationAnimation','makeDeepCopy','updateAnimationType','updateRotation','addChild','ILTJA','isSceneMap','Settings','_AnimatedMapDest','ARRAYFUNC','Sprite_Destination_updateAnimation','gVMYi','_muteSound','Square','isPlaying','Animation','AnimationID','createDestinationAnimationSprite','image','mirror','match','tileWidth','constructor','bitmap','updateAnimation','rotationSpeed','Sprite_AnimationMV_processTimingData','Spriteset_Base_update','_effectsContainer','animationId','_scene','parse','createSquareBitmap','startAnimation','zJCDA','Mute','toUpperCase','swvwB','SpriteType','Spriteset_Base_destroy','Image','update','removeAllDestinationAnimations','Filename','scaleMultiplier','processTimingData','endAnimation','parameters','BlendMode','name','_destinationAnimationQueue','RotateSpeed','status','Game_Temp_initialize','getAnimatedMapDestinationSettings','exit','requestDestinationAnimation','return\x200','ARRAYJSON','AzCIe','OpacityMultiplier','STRUCT','EVAL','ARRAYNUM','destroy','anchor','isAnimationForEach','CgUUI','createBitmap','ARRAYSTR','updateOpacity','call','ConvertParams','description','Buagp','initialize','version','trim','Mirror','blendMode','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','initAnimatedMapDest','opacityMultiplier','XuSIA','Spriteset_Base_initialize','push','createDestinationAnimationQueue','Sprite_Animation_processSoundTimings','Circle','FUNC','createAnimationBitmap','HexColor','OCQce','loadSystem','MapDest','targetObjects','createDestinationAnimation','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','tileHeight','square','DkXfu','opacity','prototype'];(function(_0xd0bfb0,_0x4654b0){const _0x575a0b=function(_0xd8ba8){while(--_0xd8ba8){_0xd0bfb0['push'](_0xd0bfb0['shift']());}};_0x575a0b(++_0x4654b0);}(_0x4654,0xec));const _0x575a=function(_0xd0bfb0,_0x4654b0){_0xd0bfb0=_0xd0bfb0-0x0;let _0x575a0b=_0x4654[_0xd0bfb0];return _0x575a0b;};const _0x116c20=_0x575a;var label='AnimatedMapDest',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x116c20('0x58')](function(_0x59bd40){const _0x1954e4=_0x116c20;return _0x59bd40[_0x1954e4('0x21')]&&_0x59bd40[_0x1954e4('0x36')][_0x1954e4('0x82')]('['+label+']');})[0x0];VisuMZ[label][_0x116c20('0x94')]=VisuMZ[label]['Settings']||{},VisuMZ[_0x116c20('0x35')]=function(_0x591d79,_0x3814de){const _0x2504ac=_0x116c20;for(const _0x8bc950 in _0x3814de){if(_0x2504ac('0x75')!==_0x2504ac('0x40')){if(_0x8bc950[_0x2504ac('0x1')](/(.*):(.*)/i)){if(_0x2504ac('0x63')===_0x2504ac('0x63')){const _0x143f9b=String(RegExp['$1']),_0x2e1af3=String(RegExp['$2'])[_0x2504ac('0x11')]()[_0x2504ac('0x3a')]();let _0x2f2237,_0x97d556,_0x3d8de1;switch(_0x2e1af3){case _0x2504ac('0x8a'):_0x2f2237=_0x3814de[_0x8bc950]!==''?Number(_0x3814de[_0x8bc950]):0x0;break;case _0x2504ac('0x2c'):_0x97d556=_0x3814de[_0x8bc950]!==''?JSON[_0x2504ac('0xc')](_0x3814de[_0x8bc950]):[],_0x2f2237=_0x97d556['map'](_0x1cbf1b=>Number(_0x1cbf1b));break;case _0x2504ac('0x2b'):_0x2f2237=_0x3814de[_0x8bc950]!==''?eval(_0x3814de[_0x8bc950]):null;break;case _0x2504ac('0x7b'):_0x97d556=_0x3814de[_0x8bc950]!==''?JSON[_0x2504ac('0xc')](_0x3814de[_0x8bc950]):[],_0x2f2237=_0x97d556['map'](_0x468905=>eval(_0x468905));break;case _0x2504ac('0x81'):_0x2f2237=_0x3814de[_0x8bc950]!==''?JSON['parse'](_0x3814de[_0x8bc950]):'';break;case _0x2504ac('0x27'):_0x97d556=_0x3814de[_0x8bc950]!==''?JSON[_0x2504ac('0xc')](_0x3814de[_0x8bc950]):[],_0x2f2237=_0x97d556[_0x2504ac('0x61')](_0x4da9eb=>JSON[_0x2504ac('0xc')](_0x4da9eb));break;case _0x2504ac('0x46'):_0x2f2237=_0x3814de[_0x8bc950]!==''?new Function(JSON['parse'](_0x3814de[_0x8bc950])):new Function(_0x2504ac('0x26'));break;case _0x2504ac('0x96'):_0x97d556=_0x3814de[_0x8bc950]!==''?JSON[_0x2504ac('0xc')](_0x3814de[_0x8bc950]):[],_0x2f2237=_0x97d556[_0x2504ac('0x61')](_0x4b0957=>new Function(JSON[_0x2504ac('0xc')](_0x4b0957)));break;case _0x2504ac('0x5d'):_0x2f2237=_0x3814de[_0x8bc950]!==''?String(_0x3814de[_0x8bc950]):'';break;case _0x2504ac('0x32'):_0x97d556=_0x3814de[_0x8bc950]!==''?JSON[_0x2504ac('0xc')](_0x3814de[_0x8bc950]):[],_0x2f2237=_0x97d556['map'](_0x488f42=>String(_0x488f42));break;case _0x2504ac('0x2a'):_0x3d8de1=_0x3814de[_0x8bc950]!==''?JSON[_0x2504ac('0xc')](_0x3814de[_0x8bc950]):{},_0x2f2237=VisuMZ[_0x2504ac('0x35')]({},_0x3d8de1);break;case _0x2504ac('0x6e'):_0x97d556=_0x3814de[_0x8bc950]!==''?JSON[_0x2504ac('0xc')](_0x3814de[_0x8bc950]):[],_0x2f2237=_0x97d556[_0x2504ac('0x61')](_0xff48fe=>VisuMZ['ConvertParams']({},JSON['parse'](_0xff48fe)));break;default:continue;}_0x591d79[_0x143f9b]=_0x2f2237;}else{function _0x510c14(){for(const _0x45723b of this['_destinationAnimationSprites']){this['removeDestinationAnimation'](_0x45723b);}}}}}else{function _0x2d3a8e(){const _0x463db4=_0x2504ac;_0x5e87a1[_0x463db4('0x7e')]['Sprite_Destination_updateAnimation'][_0x463db4('0x34')](this),this[_0x463db4('0x33')](),this['updateScale'](),this['updateRotation']();}}}return _0x591d79;},(_0x46bfd0=>{const _0x26abd2=_0x116c20,_0x5b4085=_0x46bfd0[_0x26abd2('0x1e')];for(const _0x48eeb4 of dependencies){if(!Imported[_0x48eeb4]){if('swvwB'!==_0x26abd2('0x12')){function _0x3d42aa(){this['updateAnimationType']();}}else{alert(_0x26abd2('0x4e')['format'](_0x5b4085,_0x48eeb4)),SceneManager[_0x26abd2('0x24')]();break;}}}const _0x4ce440=_0x46bfd0['description'];if(_0x4ce440[_0x26abd2('0x1')](/\[Version[ ](.*?)\]/i)){const _0x22da8d=Number(RegExp['$1']);if(_0x22da8d!==VisuMZ[label][_0x26abd2('0x39')]){if(_0x26abd2('0x65')===_0x26abd2('0x98')){function _0x39a814(){const _0x2116d7=_0x26abd2,_0x54851f=_0x2e82a7(_0x2b10b2['$1']);_0x54851f<_0x18af53?(_0x5afe9e(_0x2116d7('0x3d')[_0x2116d7('0x5f')](_0xb1746f,_0x54851f,_0x306b69)),_0x38cb16[_0x2116d7('0x24')]()):_0x46008a=_0x54d5f5[_0x2116d7('0x68')](_0x54851f,_0x4cdbc6);}}else alert(_0x26abd2('0x87')[_0x26abd2('0x5f')](_0x5b4085,_0x22da8d)),SceneManager[_0x26abd2('0x24')]();}}if(_0x4ce440[_0x26abd2('0x1')](/\[Tier[ ](\d+)\]/i)){const _0x4e414e=Number(RegExp['$1']);if(_0x4e414e<tier){if(_0x26abd2('0x30')===_0x26abd2('0x30'))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x26abd2('0x5f')](_0x5b4085,_0x4e414e,tier)),SceneManager[_0x26abd2('0x24')]();else{function _0x40ebb3(){const _0x426502=_0x26abd2,_0x1b8486=_0x1babe5[_0x426502('0xb')][_0x426502('0x62')];if(_0x1b8486[_0x426502('0x74')]())return;const _0x621fca=_0x22a8d9['getAnimatedMapDestinationSettings']()['Animation'];_0x574902[_0x426502('0x25')]([this],_0x621fca[_0x426502('0x9d')],_0x621fca[_0x426502('0x3b')],_0x621fca[_0x426502('0x10')]);}}}else tier=Math[_0x26abd2('0x68')](_0x4e414e,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x26abd2('0x94')],_0x46bfd0[_0x26abd2('0x1c')]);})(pluginData),PluginManager[_0x116c20('0x86')](pluginData['name'],'DestinationType',_0x32b3b6=>{const _0x3b6b87=_0x116c20;VisuMZ[_0x3b6b87('0x35')](_0x32b3b6,_0x32b3b6);const _0x5799b4=$gameSystem[_0x3b6b87('0x23')]();_0x5799b4[_0x3b6b87('0x13')]=_0x32b3b6[_0x3b6b87('0x13')],VisuMZ['AnimatedMapDest'][_0x3b6b87('0x5a')]();}),PluginManager[_0x116c20('0x86')](pluginData[_0x116c20('0x1e')],_0x116c20('0x89'),_0x7cf7a2=>{const _0x44474c=_0x116c20;VisuMZ['ConvertParams'](_0x7cf7a2,_0x7cf7a2);const _0x3eb465=$gameSystem[_0x44474c('0x23')]();_0x3eb465[_0x44474c('0x9a')]=JsonEx[_0x44474c('0x8e')](_0x7cf7a2),VisuMZ[_0x44474c('0x7e')][_0x44474c('0x5a')]();}),PluginManager[_0x116c20('0x86')](pluginData[_0x116c20('0x1e')],_0x116c20('0x80'),_0x34bb23=>{const _0x5a415b=_0x116c20;VisuMZ[_0x5a415b('0x35')](_0x34bb23,_0x34bb23);const _0xb4f160=$gameSystem[_0x5a415b('0x23')]();_0xb4f160[_0x5a415b('0x45')]=JsonEx['makeDeepCopy'](_0x34bb23),VisuMZ[_0x5a415b('0x7e')]['UpdateDestinationSprite']();}),PluginManager[_0x116c20('0x86')](pluginData[_0x116c20('0x1e')],_0x116c20('0x6f'),_0x41c31f=>{const _0x3148f0=_0x116c20;VisuMZ[_0x3148f0('0x35')](_0x41c31f,_0x41c31f);const _0x137fff=$gameSystem[_0x3148f0('0x23')]();_0x137fff[_0x3148f0('0x15')]=JsonEx['makeDeepCopy'](_0x41c31f),VisuMZ[_0x3148f0('0x7e')][_0x3148f0('0x5a')]();}),PluginManager[_0x116c20('0x86')](pluginData[_0x116c20('0x1e')],_0x116c20('0x64'),_0x3f5603=>{const _0x3108f6=_0x116c20;VisuMZ['ConvertParams'](_0x3f5603,_0x3f5603);const _0x4d3d4a=$gameSystem[_0x3108f6('0x23')]();_0x4d3d4a[_0x3108f6('0x9c')]=JsonEx[_0x3108f6('0x8e')](_0x3f5603),VisuMZ[_0x3108f6('0x7e')][_0x3108f6('0x5a')]();}),VisuMZ[_0x116c20('0x7e')][_0x116c20('0x5a')]=function(){const _0x23e565=_0x116c20;if(!SceneManager[_0x23e565('0x93')]())return;const _0x2756aa=SceneManager[_0x23e565('0xb')];if(!_0x2756aa)return;const _0xef508a=_0x2756aa[_0x23e565('0x62')];if(!_0xef508a)return;const _0x544ea0=_0xef508a['_destinationSprite'];if(!_0x544ea0)return;_0x544ea0[_0x23e565('0x31')]();},SceneManager['isSceneMap']=function(){const _0x5c59bb=_0x116c20;return this[_0x5c59bb('0xb')]&&this[_0x5c59bb('0xb')][_0x5c59bb('0x3')]===Scene_Map;},VisuMZ['AnimatedMapDest']['Game_Temp_initialize']=Game_Temp[_0x116c20('0x53')][_0x116c20('0x38')],Game_Temp[_0x116c20('0x53')][_0x116c20('0x38')]=function(){const _0x321972=_0x116c20;VisuMZ['AnimatedMapDest'][_0x321972('0x22')][_0x321972('0x34')](this),this[_0x321972('0x43')]();},Game_Temp[_0x116c20('0x53')][_0x116c20('0x43')]=function(){const _0x3a430e=_0x116c20;this[_0x3a430e('0x1f')]=[];},Game_Temp[_0x116c20('0x53')][_0x116c20('0x25')]=function(_0x1ab44b,_0xbdff9f,_0x64c9c7,_0x54674e){const _0x5eee6f=_0x116c20;_0x64c9c7=_0x64c9c7||![],_0x54674e=_0x54674e||![];if($dataAnimations[_0xbdff9f]){const _0x526db4={'targets':_0x1ab44b,'animationId':_0xbdff9f,'mirror':_0x64c9c7,'mute':_0x54674e};this[_0x5eee6f('0x1f')][_0x5eee6f('0x42')](_0x526db4);for(const _0x573bbc of _0x1ab44b){if(_0x573bbc[_0x5eee6f('0xe')]){if('lfmCy'==='lfmCy')_0x573bbc[_0x5eee6f('0xe')]();else{function _0x198f1b(){const _0x2c9c86=_0x5eee6f;_0x512ec6[_0x2c9c86('0x7e')][_0x2c9c86('0x41')][_0x2c9c86('0x34')](this),this['_destinationAnimationSprites']=[];}}}}}},Game_Temp[_0x116c20('0x53')][_0x116c20('0x8d')]=function(){const _0x10717d=_0x116c20;return this['_destinationAnimationQueue'][_0x10717d('0x6d')]();},VisuMZ[_0x116c20('0x7e')][_0x116c20('0x7a')]=Game_System[_0x116c20('0x53')][_0x116c20('0x38')],Game_System[_0x116c20('0x53')][_0x116c20('0x38')]=function(){const _0x54f874=_0x116c20;VisuMZ[_0x54f874('0x7e')][_0x54f874('0x7a')][_0x54f874('0x34')](this),this[_0x54f874('0x3e')]();},Game_System[_0x116c20('0x53')]['initAnimatedMapDest']=function(){const _0x38b3df=_0x116c20,_0x15f39b=VisuMZ['AnimatedMapDest']['Settings'];this[_0x38b3df('0x95')]=JsonEx[_0x38b3df('0x8e')](_0x15f39b);},Game_System['prototype']['getAnimatedMapDestinationSettings']=function(){const _0x567396=_0x116c20;if(this['_AnimatedMapDest']===undefined)this[_0x567396('0x3e')]();return this[_0x567396('0x95')];},Sprite_Animation[_0x116c20('0x53')][_0x116c20('0x8c')]=function(_0x4ab2fb){this['_muteSound']=_0x4ab2fb;},VisuMZ[_0x116c20('0x7e')][_0x116c20('0x44')]=Sprite_Animation[_0x116c20('0x53')][_0x116c20('0x5c')],Sprite_Animation[_0x116c20('0x53')][_0x116c20('0x5c')]=function(){const _0x5942c5=_0x116c20;if(this['_muteSound'])return;VisuMZ[_0x5942c5('0x7e')][_0x5942c5('0x44')][_0x5942c5('0x34')](this);},Sprite_AnimationMV[_0x116c20('0x53')][_0x116c20('0x8c')]=function(_0x56c528){this['_muteSound']=_0x56c528;},VisuMZ[_0x116c20('0x7e')]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV['prototype'][_0x116c20('0x1a')],Sprite_AnimationMV[_0x116c20('0x53')][_0x116c20('0x1a')]=function(_0x57ae33){const _0x127c8=_0x116c20;this[_0x127c8('0x99')]&&(_0x57ae33=JsonEx['makeDeepCopy'](_0x57ae33),_0x57ae33['se'][_0x127c8('0x76')]=0x0),VisuMZ['AnimatedMapDest'][_0x127c8('0x7')]['call'](this,_0x57ae33);},Sprite_Destination[_0x116c20('0x78')]=_0x116c20('0x4b'),Sprite_Destination[_0x116c20('0x53')][_0x116c20('0x31')]=function(){const _0x4bb8f6=_0x116c20;this['createDefaults']();const _0x450143=$gameSystem[_0x4bb8f6('0x23')]();switch(_0x450143['SpriteType'][_0x4bb8f6('0x7f')]()){case _0x4bb8f6('0x5e'):this[_0x4bb8f6('0x5b')]();break;case _0x4bb8f6('0x50'):this[_0x4bb8f6('0xd')]();break;case _0x4bb8f6('0x79'):this[_0x4bb8f6('0x69')]();break;case _0x4bb8f6('0x9f'):this['createImageBitmap']();break;case'animation':this[_0x4bb8f6('0x47')]();break;default:this['createSquareBitmap']();break;}},Sprite_Destination[_0x116c20('0x53')][_0x116c20('0x6b')]=function(){const _0xc92bf4=_0x116c20;this[_0xc92bf4('0x3c')]=0x0,this[_0xc92bf4('0x3f')]=0x1,this[_0xc92bf4('0x6')]=0x0,this[_0xc92bf4('0x19')]=0x1,this[_0xc92bf4('0x2e')]['x']=0.5,this[_0xc92bf4('0x2e')]['y']=0.5;},Sprite_Destination[_0x116c20('0x53')]['createEmptyBitmap']=function(){const _0x5ee7f8=_0x116c20,_0x15883d=$gameMap[_0x5ee7f8('0x2')](),_0x5e30a3=$gameMap['tileHeight']();this[_0x5ee7f8('0x4')]=new Bitmap(_0x15883d,_0x5e30a3);},Sprite_Destination[_0x116c20('0x53')][_0x116c20('0xd')]=function(){const _0x44b473=_0x116c20,_0x5580da=$gameSystem[_0x44b473('0x23')]()['Square'],_0x3ff455=$gameMap[_0x44b473('0x2')](),_0x5bffdf=$gameMap[_0x44b473('0x4f')](),_0xbc677a=_0x5580da[_0x44b473('0x48')];this['bitmap']=new Bitmap(_0x3ff455,_0x5bffdf),this['bitmap']['fillAll'](_0xbc677a),this[_0x44b473('0x3c')]=_0x5580da[_0x44b473('0x1d')],this[_0x44b473('0x3f')]=_0x5580da[_0x44b473('0x29')],this[_0x44b473('0x6')]=_0x5580da[_0x44b473('0x20')],this[_0x44b473('0x19')]=_0x5580da[_0x44b473('0x85')];},Sprite_Destination[_0x116c20('0x53')][_0x116c20('0x69')]=function(){const _0x516db6=_0x116c20,_0x286d4d=$gameSystem[_0x516db6('0x23')]()[_0x516db6('0x45')],_0x5ed663=$gameMap[_0x516db6('0x2')](),_0x78d492=$gameMap['tileHeight'](),_0x47774b=_0x286d4d['HexColor'];this['bitmap']=new Bitmap(_0x5ed663,_0x78d492),this[_0x516db6('0x4')][_0x516db6('0x72')](_0x5ed663/0x2,_0x78d492/0x2,_0x5ed663/0x2,_0x47774b),this[_0x516db6('0x3c')]=_0x286d4d[_0x516db6('0x1d')],this[_0x516db6('0x3f')]=_0x286d4d[_0x516db6('0x29')],this[_0x516db6('0x19')]=_0x286d4d['ScaleMultiplier'];},Sprite_Destination[_0x116c20('0x53')][_0x116c20('0x6c')]=function(){const _0x32c148=_0x116c20;if($gameSystem[_0x32c148('0x23')]()[_0x32c148('0x15')]['Filename'][_0x32c148('0x73')]<=0x0)return this['createSquareBitmap']();const _0x33f026=$gameSystem['getAnimatedMapDestinationSettings']()[_0x32c148('0x15')];this[_0x32c148('0x4')]=ImageManager[_0x32c148('0x4a')](_0x33f026[_0x32c148('0x18')]),this[_0x32c148('0x3c')]=_0x33f026[_0x32c148('0x1d')],this[_0x32c148('0x3f')]=_0x33f026['OpacityMultiplier'],this[_0x32c148('0x6')]=_0x33f026[_0x32c148('0x20')],this[_0x32c148('0x19')]=_0x33f026[_0x32c148('0x85')];},Sprite_Destination['prototype']['createAnimationBitmap']=function(){const _0x88fac2=_0x116c20,_0x25b092=$gameMap[_0x88fac2('0x2')](),_0x532b78=$gameMap[_0x88fac2('0x4f')]();this[_0x88fac2('0x4')]=new Bitmap(_0x25b092,_0x532b78);},VisuMZ['AnimatedMapDest'][_0x116c20('0x97')]=Sprite_Destination[_0x116c20('0x53')][_0x116c20('0x5')],Sprite_Destination[_0x116c20('0x53')]['updateAnimation']=function(){const _0x2ef01a=_0x116c20,_0x328f12=$gameSystem[_0x2ef01a('0x23')]();if(_0x328f12['SpriteType']['toLowerCase']()==='animation'){if(_0x2ef01a('0x88')===_0x2ef01a('0x49')){function _0x5a2c8b(){const _0x39a9d8=_0x2ef01a,_0x1efe05=_0x3ba9e9[_0x39a9d8('0x23')]()[_0x39a9d8('0x45')],_0x462758=_0x3893b4[_0x39a9d8('0x2')](),_0x343a19=_0x573aba['tileHeight'](),_0x16a6a5=_0x1efe05[_0x39a9d8('0x48')];this[_0x39a9d8('0x4')]=new _0xc0e006(_0x462758,_0x343a19),this[_0x39a9d8('0x4')][_0x39a9d8('0x72')](_0x462758/0x2,_0x343a19/0x2,_0x462758/0x2,_0x16a6a5),this[_0x39a9d8('0x3c')]=_0x1efe05['BlendMode'],this[_0x39a9d8('0x3f')]=_0x1efe05[_0x39a9d8('0x29')],this[_0x39a9d8('0x19')]=_0x1efe05[_0x39a9d8('0x85')];}}else this[_0x2ef01a('0x8f')]();}else{if(_0x2ef01a('0x28')==='AzCIe')VisuMZ[_0x2ef01a('0x7e')][_0x2ef01a('0x97')][_0x2ef01a('0x34')](this),this[_0x2ef01a('0x33')](),this['updateScale'](),this[_0x2ef01a('0x90')]();else{function _0x4e5911(){const _0x413f41=_0x2ef01a;_0xd8a518[_0x413f41('0x7e')]['Game_System_initialize'][_0x413f41('0x34')](this),this[_0x413f41('0x3e')]();}}}},Sprite_Destination[_0x116c20('0x53')][_0x116c20('0x8f')]=function(){const _0x382b50=_0x116c20,_0x11d4a4=SceneManager[_0x382b50('0xb')][_0x382b50('0x62')];if(_0x11d4a4[_0x382b50('0x74')]())return;const _0x8da8cc=$gameSystem[_0x382b50('0x23')]()[_0x382b50('0x9c')];$gameTemp[_0x382b50('0x25')]([this],_0x8da8cc[_0x382b50('0x9d')],_0x8da8cc[_0x382b50('0x3b')],_0x8da8cc[_0x382b50('0x10')]);},Sprite_Destination[_0x116c20('0x53')][_0x116c20('0x33')]=function(){const _0x166c74=_0x116c20;this['opacity']*=this[_0x166c74('0x3f')]||0x1;},Sprite_Destination[_0x116c20('0x53')]['updateScale']=function(){const _0x553d49=_0x116c20;this['scale']['x']*=this['scaleMultiplier']||0x1,this[_0x553d49('0x71')]['y']=this[_0x553d49('0x71')]['x'];},Sprite_Destination[_0x116c20('0x53')]['updateRotation']=function(){const _0x457aaf=_0x116c20;this[_0x457aaf('0x6a')]+=this[_0x457aaf('0x6')]||0x0;},Sprite_Destination[_0x116c20('0x53')]['destroy']=function(_0x15ad8b){const _0x1dffc4=_0x116c20,_0x1cc8fc=$gameSystem['getAnimatedMapDestinationSettings']();if(_0x1cc8fc['SpriteType'][_0x1dffc4('0x7f')]()!==_0x1dffc4('0x9f')){if(_0x1dffc4('0x51')===_0x1dffc4('0x51'))this[_0x1dffc4('0x4')]&&this[_0x1dffc4('0x4')][_0x1dffc4('0x2d')]();else{function _0x3f61e6(){const _0x2ea13c=_0x1dffc4;_0x117c6e[_0x2ea13c('0x7e')][_0x2ea13c('0x22')][_0x2ea13c('0x34')](this),this['createDestinationAnimationQueue']();}}}Sprite['prototype'][_0x1dffc4('0x2d')][_0x1dffc4('0x34')](this,_0x15ad8b);},VisuMZ[_0x116c20('0x7e')]['Spriteset_Base_initialize']=Spriteset_Base[_0x116c20('0x53')]['initialize'],Spriteset_Base[_0x116c20('0x53')]['initialize']=function(){const _0x4376e5=_0x116c20;VisuMZ[_0x4376e5('0x7e')]['Spriteset_Base_initialize'][_0x4376e5('0x34')](this),this['_destinationAnimationSprites']=[];},VisuMZ[_0x116c20('0x7e')][_0x116c20('0x14')]=Spriteset_Base[_0x116c20('0x53')][_0x116c20('0x2d')],Spriteset_Base[_0x116c20('0x53')][_0x116c20('0x2d')]=function(_0x34f7a6){const _0x314204=_0x116c20;this[_0x314204('0x17')](),VisuMZ[_0x314204('0x7e')]['Spriteset_Base_destroy'][_0x314204('0x34')](this,_0x34f7a6);},VisuMZ[_0x116c20('0x7e')][_0x116c20('0x8')]=Spriteset_Base[_0x116c20('0x53')]['update'],Spriteset_Base['prototype'][_0x116c20('0x16')]=function(){const _0x26d3de=_0x116c20;VisuMZ['AnimatedMapDest']['Spriteset_Base_update']['call'](this),this[_0x26d3de('0x70')]();},Spriteset_Base[_0x116c20('0x53')][_0x116c20('0x70')]=function(){const _0x3b1b0a=_0x116c20;for(const _0x276838 of this['_destinationAnimationSprites']){if(_0x3b1b0a('0x37')!==_0x3b1b0a('0x77')){if(!_0x276838[_0x3b1b0a('0x9b')]()){if(_0x3b1b0a('0x57')===_0x3b1b0a('0x57'))this[_0x3b1b0a('0x60')](_0x276838);else{function _0x88f7ed(){const _0x387715=_0x3b1b0a;this[_0x387715('0x60')](_0x19133b);}}}}else{function _0x2765b9(){const _0x5e2461=_0x3b1b0a;_0x226d4e[_0x5e2461('0x35')](_0x5a0ce8,_0x2844b7);const _0x4b732b=_0x2dcb52[_0x5e2461('0x23')]();_0x4b732b[_0x5e2461('0x13')]=_0x460802[_0x5e2461('0x13')],_0x56fab3[_0x5e2461('0x7e')][_0x5e2461('0x5a')]();}}}this['processDestinationAnimationRequests']();},Spriteset_Base[_0x116c20('0x53')][_0x116c20('0x55')]=function(){const _0x34a923=_0x116c20;for(;;){const _0x521b62=$gameTemp[_0x34a923('0x8d')]();if(_0x521b62)this['createDestinationAnimation'](_0x521b62);else break;}},Spriteset_Base[_0x116c20('0x53')][_0x116c20('0x4d')]=function(_0x76b80c){const _0x5bb30b=_0x116c20,_0x1609a7=$dataAnimations[_0x76b80c[_0x5bb30b('0xa')]],_0x4bcbc6=_0x76b80c[_0x5bb30b('0x54')],_0x4bf5f4=_0x76b80c[_0x5bb30b('0x0')],_0x1bead1=_0x76b80c['mute'];let _0x3c71c7=this['animationBaseDelay']();const _0x476ece=this[_0x5bb30b('0x7c')]();if(this[_0x5bb30b('0x2f')](_0x1609a7))for(const _0x400055 of _0x4bcbc6){this['createDestinationAnimationSprite']([_0x400055],_0x1609a7,_0x4bf5f4,_0x3c71c7,_0x1bead1),_0x3c71c7+=_0x476ece;}else{if(_0x5bb30b('0x92')===_0x5bb30b('0x8b')){function _0x39af78(){const _0x2e8a3d=_0x5bb30b;for(const _0x3f4a76 of _0x58068c){this[_0x2e8a3d('0x9e')]([_0x3f4a76],_0xc06fd6,_0x415a37,_0x3c8f3d,_0x22938f),_0x284253+=_0x311bad;}}}else this[_0x5bb30b('0x9e')](_0x4bcbc6,_0x1609a7,_0x4bf5f4,_0x3c71c7);}},Spriteset_Base[_0x116c20('0x53')][_0x116c20('0x9e')]=function(_0x5aa53d,_0x105038,_0xdc0af1,_0x1cc529,_0x2bb86d){const _0x23b09d=_0x116c20,_0x21966a=this[_0x23b09d('0x59')](_0x105038),_0x200bed=new(_0x21966a?Sprite_AnimationMV:Sprite_Animation)(),_0x414361=_0x5aa53d;if(this[_0x23b09d('0x56')](_0x5aa53d[0x0])){if(_0x23b09d('0xf')!==_0x23b09d('0xf')){function _0x42fcc9(){const _0x4bef79=_0x23b09d;_0x4d66f9[_0x4bef79('0x35')](_0x4f283a,_0x454815);const _0x5eff75=_0x1872ad[_0x4bef79('0x23')]();_0x5eff75['Circle']=_0xbc3bd0[_0x4bef79('0x8e')](_0x26bedf),_0x3d135e['AnimatedMapDest'][_0x4bef79('0x5a')]();}}else _0xdc0af1=!_0xdc0af1;}_0x200bed[_0x23b09d('0x4c')]=_0x5aa53d,_0x200bed[_0x23b09d('0x66')](_0x414361,_0x105038,_0xdc0af1,_0x1cc529),_0x200bed[_0x23b09d('0x8c')](_0x2bb86d),this[_0x23b09d('0x9')][_0x23b09d('0x91')](_0x200bed),this[_0x23b09d('0x83')][_0x23b09d('0x42')](_0x200bed);},Spriteset_Base['prototype']['removeDestinationAnimation']=function(_0x2d7fdf){const _0x1bd4d7=_0x116c20;this['_destinationAnimationSprites'][_0x1bd4d7('0x7d')](_0x2d7fdf),this[_0x1bd4d7('0x9')][_0x1bd4d7('0x84')](_0x2d7fdf);for(const _0x1aad29 of _0x2d7fdf['targetObjects']){if(_0x1bd4d7('0x67')!=='PEics'){function _0x3d594a(){const _0x590eed=_0x1bd4d7;this[_0x590eed('0x52')]*=this[_0x590eed('0x3f')]||0x1;}}else _0x1aad29[_0x1bd4d7('0x1b')]&&_0x1aad29[_0x1bd4d7('0x1b')]();}_0x2d7fdf[_0x1bd4d7('0x2d')]();},Spriteset_Base[_0x116c20('0x53')][_0x116c20('0x17')]=function(){const _0xbf98d4=_0x116c20;for(const _0x4cde3e of this[_0xbf98d4('0x83')]){this[_0xbf98d4('0x60')](_0x4cde3e);}},Spriteset_Base[_0x116c20('0x53')][_0x116c20('0x74')]=function(){const _0x3c250d=_0x116c20;return this['_destinationAnimationSprites'][_0x3c250d('0x73')]>0x0;};
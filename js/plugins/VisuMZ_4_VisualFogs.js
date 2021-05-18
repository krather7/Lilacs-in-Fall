//=============================================================================
// VisuStella MZ - Visual Fogs
// VisuMZ_4_VisualFogs.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualFogs = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualFogs = VisuMZ.VisualFogs || {};
VisuMZ.VisualFogs.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [VisualFogs]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Fogs_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Fogs are a handy feature long removed from RPG Maker since RPG Maker XP.
 * This plugin reintroduces them back into RPG Maker MZ. Fogs function similar
 * to parallaxes, except rather than being under the tile map, fogs appear
 * above the tile map and the characters. This plugin gives you an unlimited
 * amount of fogs to apply to each map alongside many controls to make the fogs
 * appear more vivid.
 * 
 * A restricted fog area system is also added to this plugin to make fogs
 * appear only within certain regions and/or terrain tags. This way, you can
 * utilize parallaxes as masked layers for obscured sections of the map.
 * 
 * Sometimes, fogs may be too intrusive to the player's visibility. A vignette
 * feature has been added to make fogs appear only on the borders or certain
 * sides of the screen. This way, fogs can still add to the atmosphere without
 * obscuring too much of the visible screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove fogs through map notetags.
 * * Lots of customization options for each of the fogs.
 * * Limit where fogs can be displayed on the map through regions and/or
 *   terrain tags to obscure parts of the map.
 * * Use vignettes to obscure sides of the screen without affecting the center.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove fogs as needed.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Fogs
 * 
 * Fogs are not an inherent feature for the map editor. They need to be added
 * through map notetags or Plugin Commands.
 * 
 * Each of the fogs added through this plugin's notetags and/or commands are
 * assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that fog when needed.
 * 
 * When fogs are created, they appear above the tile map and characters, but
 * below the weather. This means they are created between the two layers when
 * the map's sprites are generated.
 * 
 * Fogs will behave very similar to parallaxes in how they move about the
 * screen. This means that if a fog is set to looping, it will loop in
 * accordance to the screen's display coordinates. This is to maintain
 * consistency with how the RPG Maker MZ engine behaves.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a fog to appear for the whole entire foreground and want
 * to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the fog. Those parts will be little squares each,
 * equal to the size of a tile. They have soft borders due to blurring options.
 * The foggy tiles will be slightly larger than normal due to spill values.
 * 
 * You may notice that some tiles don't blur well when they are towards the
 * right and bottom sides of the screen when the blur values are higher than
 * normal. This is a known issue with Pixi JS's filters and there's not much
 * the VisuStella team can do about it. Instead, what we recommend is that you
 * use a fog vignette on an upper layer to mask the bleeding issue.
 * 
 * Each fog layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Fog layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Vignettes
 * 
 * If you don't want fogs to obscure the whole screen, use a vignette to make
 * them appear only at the sides of the screen. You can use custom vignette
 * masks or rendered ones provided by this plugin.
 * 
 * If you decide to make a custom vignette mask, create them similar to regular
 * image masks. This means that white areas of the masking image will be the
 * parts of the screen where the fog appears while the black areas of the image
 * will hide the fog. You can use gradients to make the vignette mask appear
 * more smooth.
 * 
 * Vignettes cannot be used with region and terrain tags. This is because the
 * region and terrain tag tiles move alongside the screen while vignettes are
 * always locked onto the borders of the screen. However, if you wish to use
 * both, just apply two different fog layers instead.
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
 * === Fog-Related Notetags ===
 * 
 * ---
 *
 * <Fog id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Fog id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular fog layer for this map by default.
 * - Replace 'id' with a number value to assign to the fog.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no fog will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a fog found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 * 
 * -=-=- Optional Properties -=-=-
 * 
 * Replace the 'optional property' segment of the notetags above with any of
 * the text below to acquire their effects. You can add/remove as many of the
 * optional properties as you need.
 * 
 * ---
 * 
 * Horz Scroll: x
 * Vert Scroll: y
 * 
 * - This enables horizontal or vertical scrolling for the fog.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the fog to only scroll when the map scrolls.
 * - This has the same effect as naming a fog with "!" in front of
 *   its filename.
 * - If the filename used for this fog has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the fog.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * 
 * ---
 * 
 * Blend Mode: Normal
 * Blend Mode: Additive
 * Blend Mode: Multiply
 * Blend Mode: Screen
 * 
 * - Sets the blend mode for the icon on the fog.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the fog to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   fog each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the fog.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Tile Blur: x
 * 
 * - Determines how soft the borders are around the revealed fog tiles.
 * - Use larger numbers to blur them more.
 * - Use a value of zero to remove any blur.
 * 
 * ---
 * 
 * Tile Spill: x
 * 
 * - Determines how much larger to make the revealed fog tiles.
 * - Use larger numbers to spill more and make the tiles larger.
 * - Use a value of zero to not spill at all and use the exact tile sizes.
 * 
 * ---
 * 
 * Vignette: type
 * 
 * - Makes the fog appear along the edge of the screen rather than the entire
 *   visible game screen.
 * - Replace 'type' with any of the following:
 *   - Border
 *   - Horizontal
 *   - Vertical
 *   - Upper
 *   - Lower
 *   - Left
 *   - Right
 * 
 * ---
 * 
 * Custom Vignette: filename
 * 
 * - Allows you to use a custom parallax image as a vignette.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a vignette found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Custom vignettes are used as masks.
 *   - White areas on the image determine the visible parts of the fog.
 *   - Black areas on the image determine the invisible parts of the fog.
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
 * === Fog Plugin Commands ===
 * 
 * ---
 *
 * Fog: Add/Change Settings
 * - Add/Change settings for target fog.
 * - Does not alter the map editor's fog.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this fog to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the fog?
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 * 
 *       Map Lock?:
 *       - Lock the fog to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the fog horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the fog vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this fog?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the fog?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this fog's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the motion trail?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 * 
 *       Tile Blur:
 *       - What's the blur level you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *       Tile Spill:
 *       - What's the spill amount you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *     Vignette:
 *
 *       Type:
 *       - What vignette do you want to use for this fog?
 *       - This will override location settings.
 * 
 *       Custom:
 *       - Do you wish to use a custom vignette instead?
 *       - Automatically changes the type to "Custom".
 *
 * ---
 * 
 * Fog: Fade Opacity
 * - Fades the target fog(s) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which fog(s)?
 *   - Cannot target the map editor's fog.
 * 
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 * 
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 * 
 * ---
 *
 * Fog: Remove
 * - Removes target fog(s).
 *
 *   ID(s):
 *   - Remove which fog(s)?
 *   - Cannot remove the map editor's fog.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * The below are the default settings when it comes to creating fogs through
 * map notetags.
 *
 * ---
 *
 * Defaults
 * 
 *   Fog Opacity:
 *   - What is the default fog opacity level for map notetags?
 * 
 *   Blend Mode:
 *   - What is the default fog blend mode for map notetags?
 *     - Normal
 *     - Additive
 *     - Multiply
 *     - Screen
 * 
 *   Tile Blur:
 *   - What is the default fog tile blur intensity for map notetags?
 * 
 *   Tile Spill:
 *   - What is the default fog tile spill amount for map notetags?
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
 * Version 1.00 Official Release Date: March 5, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogAddChangeSettings
 * @text Fog: Add/Change Settings
 * @desc Add/Change settings for target fog.
 * Does not alter the map editor's fog.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this fog to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the fog?
 * @default >>>ATTENTION<<<
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Fogs.
 * @default {"Scrolling":"","_fogZero:eval":"false","_fogLoopX:eval":"false","_fogSx:eval":"+0","_fogLoopY:eval":"false","_fogSy:eval":"+0","Appearance":"","opacity:eval":"200","blendMode:eval":"1","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]","maskBlur:eval":"10","maskSpill:eval":"10","Vignette":"","vignette:str":"None","vignetteFilename:str":""}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogFadeOpacity
 * @text Fog: Fade Opacity
 * @desc Fades the target fog(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which fog(s)?
 * Cannot target the map editor's fog.
 * @default ["1"]
 *
 * @arg targetOpacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg opacityDuration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogRemove
 * @text Fog: Remove
 * @desc Removes target fog(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which fog(s)?
 * Cannot remove the map editor's fog.
 * @default ["1"]
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
 * @param VisualFogs
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Defaults
 *
 * @param FogOpacity:num
 * @text Fog Opacity
 * @parent Defaults
 * @type number
 * @max 255
 * @desc What is the default fog opacity level for map notetags?
 * @default 200
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Defaults
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What is the default fog blend mode for map notetags?
 * @default 1
 *
 * @param MaskBlur:num
 * @text Tile Blur
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile blur intensity for map notetags?
 * @default 10
 *
 * @param MaskSpill:num
 * @text Tile Spill
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile spill amount for map notetags?
 * @default 10
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
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Scrolling
 * 
 * @param _fogZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the fog to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _fogLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSx:eval
 * @text Scroll:
 * @parent _fogLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _fogLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSy:eval
 * @text Scroll:
 * @parent _fogLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this fog?
 * You may use JavaScript code.
 * @default 200
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the fog?
 * You may use JavaScript code.
 * @default 1
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this fog's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Location
 *
 * @param maskRegions:arraynum
 * @text Regions
 * @parent Location
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskBlur:eval
 * @text Tile Blur
 * @parent Location
 * @desc What's the blur level you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 *
 * @param maskSpill:eval
 * @text Tile Spill
 * @parent Location
 * @desc What's the spill amount you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 * 
 * @param Vignette
 *
 * @param vignette:str
 * @text Type
 * @parent Vignette
 * @type select
 * @option None
 * @option Border
 * @option Horizontal
 * @option Vertical
 * @option Upper
 * @option Lower
 * @option Left
 * @option Right
 * @desc What vignette do you want to use for this fog?
 * This will override location settings.
 * @default None
 *
 * @param vignetteFilename:str
 * @text Custom
 * @parent Vignette
 * @type file
 * @dir img/parallaxes/
 * @desc Do you wish to use a custom vignette instead?
 * Automatically changes the type to "Custom".
 * @default 
 *
 */
//=============================================================================

const _0x2b00=['_fogName','blur','updateMask','Game_Map_scrollUp','regionId','screenTileY','rgba(0,\x200,\x200,\x200)','getFogVignette_border','_spriteset','createFogLayers','DEFAULT_FOG_BLEND_MODE','horizontal','_scene','sortVisualFogs','_displayX','sort','vertical','maskTerrainTags','split','1wpLcQt','>>>ATTENTION<<<','_fogContainer','clone','bind','Game_Map_scrollDown','map','RegExp','name','MaskTerrainTags','toLowerCase','fillRect','scrollLeft','#ffffff','hueShift','terrainTag','push','MULTIPLY','equals','Game_Map_updateParallax','height','loadBitmap','_fogY','addChild','targetOpacity','_baseSprite','none','ARRAYSTRUCT','24489xbRPaM','indexOf','scrollRight','TemplateSettings','custom','colorTone','round','FUNC','move','left','createMaskTileBitmap','getFogVignette','ceil','Game_Map_scrollLeft','tileHeight','filters','updateOpacity','Hue','max','border','match','updateVisualFogSettings','createMaskBitmap','EVAL','getFogVignette_left','createWeather','MaskRegions','setDisplayPos','settings','getFogVignette_empty','return\x200','floor','OpacityFlat','filename','_id','_fogX','HueShift','getFogVignette_horizontal','updateHue','createNewFogLayer','scrollUp','empty','_blurFilter','bitmap','call','ARRAYJSON','isLoopHorizontal','findTargetVisualFog','loadParallax','getFogVignette_vertical','find','getVisualFogOx','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createFogContainer','449173ObKbJk','status','makeDeepCopy','HorzLoop','maskBlur','BlurFilter','format','getFogVignette_lower','origin','MaskBlur','OpacityRate','getVisualFogs','gradientFillRect','updateVisualFogLayer','getFogVignette_right','vignette','removeChild','hasOwnProperty','DEFAULT_FOG_OPACITY','blendMode','trim','2358501RGQxxS','getVisualFogOy','FogOpacity','STR','opacity','ADDITIVE','_displayY','parameters','exit','isSceneMap','CreateLayerData','_fogSx','drawMaskTile','width','clamp','updateParallax','ARRAYEVAL','note','opacityDuration','scrollDown','_fogLoopY','_fogVignettes','maskSpill','displayX','ARRAYNUM','hue','_colorFilter','62529ukfhCb','_fogSy','list','children','description','includes','_hue','Game_Map_setup','DEFAULT_FOG_TILE_BLUR','_colorTone','_visualFogSettings','623982esCZkN','create','loadCustomVignette','filter','getFogVignette_upper','FogAddChangeSettings','End','maskRegions','prototype','update','Optional','Filename','_maskSprite','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setup','_updateColorFilter','Start','705288QxdBuG','loadTemplateVignette','upper','tileWidth','ARRAYFUNC','right','addLoadListener','registerCommand','VertLoop','removeVisualFogLayer','Settings','FogRemove','Spriteset_Map_createWeather','MaskSpill','DEFAULT_FOG_TILE_SPILL','mask','19775NzpqBE','lower','setupVisualFogs','initialize','updateTone','version','VisualFogs','getVisualFogSettings','screenTileX','constructor','_createColorFilter','_fogLoopX','Game_Map_scrollRight','setColorTone','_fogZero','isLoopVertical','updateBlendMode','updateOrigin','parse','ConvertParams','NORMAL','vignetteFilename','removeVisualFog','createMaskSprite','setHue','JSON','length'];const _0x5929=function(_0x34fc83,_0xad3522){_0x34fc83=_0x34fc83-0xe5;let _0x2b003c=_0x2b00[_0x34fc83];return _0x2b003c;};const _0x37eb95=_0x5929;(function(_0x1ef89b,_0x106830){const _0x59c160=_0x5929;while(!![]){try{const _0x45b801=-parseInt(_0x59c160(0x1ba))+-parseInt(_0x59c160(0x10e))+-parseInt(_0x59c160(0x13a))+parseInt(_0x59c160(0x184))+-parseInt(_0x59c160(0x119))+-parseInt(_0x59c160(0x12a))+-parseInt(_0x59c160(0x168))*-parseInt(_0x59c160(0xf3));if(_0x45b801===_0x106830)break;else _0x1ef89b['push'](_0x1ef89b['shift']());}catch(_0x3460a8){_0x1ef89b['push'](_0x1ef89b['shift']());}}}(_0x2b00,0x7f803));var label=_0x37eb95(0x140),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x2608b8){const _0x3a2438=_0x37eb95;return _0x2608b8[_0x3a2438(0x1bb)]&&_0x2608b8[_0x3a2438(0x112)][_0x3a2438(0x113)]('['+label+']');})[0x0];VisuMZ[label][_0x37eb95(0x134)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x37eb95(0x14d)]=function(_0x268d87,_0x1041e3){const _0xb5567a=_0x37eb95;for(const _0x3b5784 in _0x1041e3){if(_0x3b5784['match'](/(.*):(.*)/i)){const _0x3ab957=String(RegExp['$1']),_0x54903d=String(RegExp['$2'])['toUpperCase']()[_0xb5567a(0xf2)]();let _0x37c79e,_0x419114,_0x319e41;switch(_0x54903d){case'NUM':_0x37c79e=_0x1041e3[_0x3b5784]!==''?Number(_0x1041e3[_0x3b5784]):0x0;break;case _0xb5567a(0x10b):_0x419114=_0x1041e3[_0x3b5784]!==''?JSON['parse'](_0x1041e3[_0x3b5784]):[],_0x37c79e=_0x419114[_0xb5567a(0x16e)](_0x5bbf43=>Number(_0x5bbf43));break;case _0xb5567a(0x19b):_0x37c79e=_0x1041e3[_0x3b5784]!==''?eval(_0x1041e3[_0x3b5784]):null;break;case _0xb5567a(0x103):_0x419114=_0x1041e3[_0x3b5784]!==''?JSON[_0xb5567a(0x14c)](_0x1041e3[_0x3b5784]):[],_0x37c79e=_0x419114[_0xb5567a(0x16e)](_0x4ecafb=>eval(_0x4ecafb));break;case _0xb5567a(0x153):_0x37c79e=_0x1041e3[_0x3b5784]!==''?JSON[_0xb5567a(0x14c)](_0x1041e3[_0x3b5784]):'';break;case _0xb5567a(0x1b1):_0x419114=_0x1041e3[_0x3b5784]!==''?JSON[_0xb5567a(0x14c)](_0x1041e3[_0x3b5784]):[],_0x37c79e=_0x419114['map'](_0x1927aa=>JSON[_0xb5567a(0x14c)](_0x1927aa));break;case _0xb5567a(0x18b):_0x37c79e=_0x1041e3[_0x3b5784]!==''?new Function(JSON[_0xb5567a(0x14c)](_0x1041e3[_0x3b5784])):new Function(_0xb5567a(0x1a2));break;case _0xb5567a(0x12e):_0x419114=_0x1041e3[_0x3b5784]!==''?JSON[_0xb5567a(0x14c)](_0x1041e3[_0x3b5784]):[],_0x37c79e=_0x419114[_0xb5567a(0x16e)](_0x5583ba=>new Function(JSON[_0xb5567a(0x14c)](_0x5583ba)));break;case _0xb5567a(0xf6):_0x37c79e=_0x1041e3[_0x3b5784]!==''?String(_0x1041e3[_0x3b5784]):'';break;case'ARRAYSTR':_0x419114=_0x1041e3[_0x3b5784]!==''?JSON[_0xb5567a(0x14c)](_0x1041e3[_0x3b5784]):[],_0x37c79e=_0x419114[_0xb5567a(0x16e)](_0x5cfbad=>String(_0x5cfbad));break;case'STRUCT':_0x319e41=_0x1041e3[_0x3b5784]!==''?JSON[_0xb5567a(0x14c)](_0x1041e3[_0x3b5784]):{},_0x37c79e=VisuMZ[_0xb5567a(0x14d)]({},_0x319e41);break;case _0xb5567a(0x183):_0x419114=_0x1041e3[_0x3b5784]!==''?JSON['parse'](_0x1041e3[_0x3b5784]):[],_0x37c79e=_0x419114[_0xb5567a(0x16e)](_0x4343ff=>VisuMZ['ConvertParams']({},JSON[_0xb5567a(0x14c)](_0x4343ff)));break;default:continue;}_0x268d87[_0x3ab957]=_0x37c79e;}}return _0x268d87;},(_0x4ca401=>{const _0x27ca07=_0x37eb95,_0x5d22a9=_0x4ca401['name'];for(const _0x320b68 of dependencies){if(!Imported[_0x320b68]){alert(_0x27ca07(0x1b8)['format'](_0x5d22a9,_0x320b68)),SceneManager[_0x27ca07(0xfb)]();break;}}const _0x56c015=_0x4ca401[_0x27ca07(0x112)];if(_0x56c015[_0x27ca07(0x198)](/\[Version[ ](.*?)\]/i)){const _0x520e5e=Number(RegExp['$1']);_0x520e5e!==VisuMZ[label][_0x27ca07(0x13f)]&&(alert(_0x27ca07(0x126)[_0x27ca07(0x1c0)](_0x5d22a9,_0x520e5e)),SceneManager[_0x27ca07(0xfb)]());}if(_0x56c015['match'](/\[Tier[ ](\d+)\]/i)){const _0x220aa9=Number(RegExp['$1']);_0x220aa9<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x27ca07(0x1c0)](_0x5d22a9,_0x220aa9,tier)),SceneManager[_0x27ca07(0xfb)]()):tier=Math[_0x27ca07(0x196)](_0x220aa9,tier);}VisuMZ[_0x27ca07(0x14d)](VisuMZ[label][_0x27ca07(0x134)],_0x4ca401[_0x27ca07(0xfa)]);})(pluginData),VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x187)]=function(){const _0x1fa9f7=_0x37eb95;return{'id':0x0,'filename':'','_fogZero':![],'_fogLoopX':![],'_fogLoopY':![],'_fogSx':0x0,'_fogSy':0x0,'_fogX':0x0,'_fogY':0x0,'opacity':Game_Map[_0x1fa9f7(0xf0)],'targetOpacity':Game_Map[_0x1fa9f7(0xf0)],'opacityDuration':0x0,'blendMode':Game_Map[_0x1fa9f7(0x15f)],'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[],'maskBlur':Game_Map[_0x1fa9f7(0x116)],'maskSpill':Game_Map[_0x1fa9f7(0x138)],'vignette':_0x1fa9f7(0x182),'vignetteFilename':''};},PluginManager[_0x37eb95(0x131)](pluginData['name'],_0x37eb95(0x11e),_0x3aa38c=>{const _0x56092c=_0x37eb95;VisuMZ[_0x56092c(0x14d)](_0x3aa38c,_0x3aa38c);if(_0x3aa38c['id']<=0x0)return;if(_0x3aa38c[_0x56092c(0x1a5)]===''||_0x3aa38c[_0x56092c(0x1a5)]===_0x56092c(0x169))return;let _0xbf5139=JsonEx[_0x56092c(0x1bc)](_0x3aa38c[_0x56092c(0x123)]);if(!_0xbf5139[_0x56092c(0xef)]('maskRegions'))_0xbf5139=VisuMZ['VisualFogs']['TemplateSettings']();_0xbf5139[_0x56092c(0x1a5)]=_0x3aa38c[_0x56092c(0x1a5)],_0xbf5139['id']=_0x3aa38c['id'];while(_0xbf5139[_0x56092c(0x189)][_0x56092c(0x154)]<0x4){_0xbf5139[_0x56092c(0x189)][_0x56092c(0x178)](0x0);}_0xbf5139[_0x56092c(0x1a7)]=0x0,_0xbf5139['_fogY']=0x0,_0xbf5139['targetOpacity']=_0x3aa38c[_0x56092c(0xf7)],_0xbf5139[_0x56092c(0x105)]=0x0,_0xbf5139['vignette']=_0xbf5139['vignette']||_0x56092c(0x182),_0xbf5139[_0x56092c(0xed)]=_0xbf5139[_0x56092c(0xed)]['toLowerCase']()['trim'](),_0xbf5139[_0x56092c(0x14f)]!==''&&(_0xbf5139[_0x56092c(0xed)]='custom'),$gameMap['addChangeVisualFog'](_0xbf5139);}),PluginManager['registerCommand'](pluginData['name'],'FogFadeOpacity',_0x22ab54=>{const _0x5334cd=_0x37eb95;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x5334cd(0x14d)](_0x22ab54,_0x22ab54);const _0x1bad78=_0x22ab54[_0x5334cd(0x110)];for(const _0x104066 of _0x1bad78){const _0x3dd7d0=$gameMap[_0x5334cd(0x141)](_0x104066);if(!_0x3dd7d0)continue;_0x3dd7d0[_0x5334cd(0x180)]=_0x22ab54[_0x5334cd(0x180)]||0x0,_0x3dd7d0[_0x5334cd(0x105)]=_0x22ab54[_0x5334cd(0x105)]||0x0,_0x3dd7d0[_0x5334cd(0x105)]<=0x0&&(_0x3dd7d0[_0x5334cd(0xf7)]=_0x3dd7d0[_0x5334cd(0x180)]);}}),PluginManager[_0x37eb95(0x131)](pluginData[_0x37eb95(0x170)],_0x37eb95(0x135),_0x4d0c93=>{const _0x331301=_0x37eb95;if(!SceneManager[_0x331301(0xfc)]())return;VisuMZ['ConvertParams'](_0x4d0c93,_0x4d0c93);const _0x44807a=_0x4d0c93['list'];for(const _0x26c51b of _0x44807a){$gameMap[_0x331301(0x150)](_0x26c51b);}}),VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x16f)]={'Start':/<(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'MaskBlur':/(?:TILE BLUR|BLUR):[ ](.*)/i,'MaskSpill':/(?:TILE SPILL|SPILL):[ ](.*)/i,'CustomVignette':/CUSTOM (?:VIGNETTE|OVERLAY):[ ](.*)/i,'PremadeVignette':/(?:VIGNETTE|OVERLAY):[ ](.*)/i},ImageManager[_0x37eb95(0x18f)]=function(_0x20b35e){const _0x363aeb=_0x37eb95;if(!_0x20b35e)return this[_0x363aeb(0x1a1)]();this[_0x363aeb(0x108)]=this['_fogVignettes']||{},_0x20b35e=_0x20b35e[_0x363aeb(0x172)]()['trim']();const _0x808f5c='getFogVignette_%1'['format'](_0x20b35e);if(this['_fogVignettes'][_0x20b35e])return this[_0x363aeb(0x108)][_0x20b35e];else return this[_0x808f5c]?this[_0x808f5c]():this['getFogVignette_empty']();},ImageManager[_0x37eb95(0x1a1)]=function(){const _0x3cea02=_0x37eb95;if(this[_0x3cea02(0x108)][_0x3cea02(0x1ad)])return this['_fogVignettes']['empty'];const _0x2058f5=new Bitmap(Graphics[_0x3cea02(0x100)],Graphics[_0x3cea02(0x17c)]);return this['_fogVignettes']=this[_0x3cea02(0x108)]||{},this['_fogVignettes'][_0x3cea02(0x1ad)]=_0x2058f5,_0x2058f5;},ImageManager[_0x37eb95(0x11d)]=function(){const _0x9b2050=_0x37eb95,_0x48351a=new Bitmap(Graphics[_0x9b2050(0x100)],Graphics[_0x9b2050(0x17c)]),_0x23938b=_0x9b2050(0x15b),_0x5db751='#ffffff';return _0x48351a[_0x9b2050(0xea)](0x0,0x0,Graphics[_0x9b2050(0x100)],Math['ceil'](Graphics[_0x9b2050(0x17c)]/0x3),_0x5db751,_0x23938b,!![]),this[_0x9b2050(0x108)]=this['_fogVignettes']||{},this[_0x9b2050(0x108)][_0x9b2050(0x12c)]=_0x48351a,_0x48351a;},ImageManager[_0x37eb95(0xe5)]=function(){const _0x4e6d26=_0x37eb95,_0x3e93f9=new Bitmap(Graphics[_0x4e6d26(0x100)],Graphics[_0x4e6d26(0x17c)]),_0x2f03f3=_0x4e6d26(0x15b),_0x550fe8=_0x4e6d26(0x175);return _0x3e93f9[_0x4e6d26(0xea)](0x0,Math[_0x4e6d26(0x190)](Graphics[_0x4e6d26(0x17c)]*0x2/0x3),Graphics[_0x4e6d26(0x100)],Math[_0x4e6d26(0x190)](Graphics[_0x4e6d26(0x17c)]/0x3),_0x2f03f3,_0x550fe8,!![]),this[_0x4e6d26(0x108)]=this['_fogVignettes']||{},this[_0x4e6d26(0x108)][_0x4e6d26(0x13b)]=_0x3e93f9,_0x3e93f9;},ImageManager[_0x37eb95(0x1a9)]=function(){const _0x534fbc=_0x37eb95,_0x107ff1=new Bitmap(Graphics[_0x534fbc(0x100)],Graphics[_0x534fbc(0x17c)]),_0x3d7e78=_0x534fbc(0x15b),_0x23c926=_0x534fbc(0x175);return _0x107ff1['gradientFillRect'](0x0,0x0,Graphics[_0x534fbc(0x100)],Math[_0x534fbc(0x190)](Graphics[_0x534fbc(0x17c)]/0x3),_0x23c926,_0x3d7e78,!![]),_0x107ff1[_0x534fbc(0xea)](0x0,Math[_0x534fbc(0x190)](Graphics[_0x534fbc(0x17c)]*0x2/0x3),Graphics[_0x534fbc(0x100)],Math[_0x534fbc(0x190)](Graphics[_0x534fbc(0x17c)]/0x3),_0x3d7e78,_0x23c926,!![]),this[_0x534fbc(0x108)]=this[_0x534fbc(0x108)]||{},this['_fogVignettes'][_0x534fbc(0x160)]=_0x107ff1,_0x107ff1;},ImageManager[_0x37eb95(0x19c)]=function(){const _0x5d9af1=_0x37eb95,_0x495d61=new Bitmap(Graphics[_0x5d9af1(0x100)],Graphics[_0x5d9af1(0x17c)]),_0x256d99=_0x5d9af1(0x15b),_0x479198=_0x5d9af1(0x175);return _0x495d61[_0x5d9af1(0xea)](0x0,0x0,Math[_0x5d9af1(0x190)](Graphics[_0x5d9af1(0x100)]/0x3),Graphics['height'],_0x479198,_0x256d99,![]),this[_0x5d9af1(0x108)]=this[_0x5d9af1(0x108)]||{},this[_0x5d9af1(0x108)][_0x5d9af1(0x18d)]=_0x495d61,_0x495d61;},ImageManager[_0x37eb95(0xec)]=function(){const _0x3a94f5=_0x37eb95,_0x4c2e9a=new Bitmap(Graphics[_0x3a94f5(0x100)],Graphics[_0x3a94f5(0x17c)]),_0x5130fe=_0x3a94f5(0x15b),_0x25d851='#ffffff';return _0x4c2e9a['gradientFillRect'](Math[_0x3a94f5(0x190)](Graphics['width']*0x2/0x3),0x0,Math['ceil'](Graphics[_0x3a94f5(0x100)]/0x3),Graphics[_0x3a94f5(0x17c)],_0x5130fe,_0x25d851,![]),this[_0x3a94f5(0x108)]=this[_0x3a94f5(0x108)]||{},this[_0x3a94f5(0x108)][_0x3a94f5(0x12f)]=_0x4c2e9a,_0x4c2e9a;},ImageManager[_0x37eb95(0x1b5)]=function(){const _0x3ae1ab=_0x37eb95,_0x5509fc=new Bitmap(Graphics[_0x3ae1ab(0x100)],Graphics[_0x3ae1ab(0x17c)]),_0xba486=_0x3ae1ab(0x15b),_0x3526b6=_0x3ae1ab(0x175);return _0x5509fc[_0x3ae1ab(0xea)](0x0,0x0,Math[_0x3ae1ab(0x190)](Graphics[_0x3ae1ab(0x100)]/0x3),Graphics[_0x3ae1ab(0x17c)],_0x3526b6,_0xba486,![]),_0x5509fc[_0x3ae1ab(0xea)](Math[_0x3ae1ab(0x190)](Graphics['width']*0x2/0x3),0x0,Math[_0x3ae1ab(0x190)](Graphics[_0x3ae1ab(0x100)]/0x3),Graphics[_0x3ae1ab(0x17c)],_0xba486,_0x3526b6,![]),this[_0x3ae1ab(0x108)]=this[_0x3ae1ab(0x108)]||{},this[_0x3ae1ab(0x108)][_0x3ae1ab(0x165)]=_0x5509fc,_0x5509fc;},ImageManager[_0x37eb95(0x15c)]=function(){const _0x4da097=_0x37eb95,_0x35555d=new Bitmap(Graphics['width'],Graphics[_0x4da097(0x17c)]),_0x379d44='rgba(0,\x200,\x200,\x200)',_0x201d5e=_0x4da097(0x175);return _0x35555d[_0x4da097(0xea)](0x0,0x0,Graphics[_0x4da097(0x100)],Math['ceil'](Graphics[_0x4da097(0x17c)]/0x3),_0x201d5e,_0x379d44,!![]),_0x35555d['gradientFillRect'](0x0,Math[_0x4da097(0x190)](Graphics[_0x4da097(0x17c)]*0x2/0x3),Graphics[_0x4da097(0x100)],Math[_0x4da097(0x190)](Graphics[_0x4da097(0x17c)]/0x3),_0x379d44,_0x201d5e,!![]),_0x35555d['gradientFillRect'](0x0,0x0,Math['ceil'](Graphics['width']/0x3),Graphics[_0x4da097(0x17c)],_0x201d5e,_0x379d44,![]),_0x35555d[_0x4da097(0xea)](Math[_0x4da097(0x190)](Graphics['width']*0x2/0x3),0x0,Math['ceil'](Graphics[_0x4da097(0x100)]/0x3),Graphics[_0x4da097(0x17c)],_0x379d44,_0x201d5e,![]),this['_fogVignettes']=this[_0x4da097(0x108)]||{},this[_0x4da097(0x108)][_0x4da097(0x197)]=_0x35555d,_0x35555d;},SceneManager[_0x37eb95(0xfc)]=function(){const _0x42e012=_0x37eb95;return this['_scene']&&this[_0x42e012(0x161)]['constructor']===Scene_Map;},VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x115)]=Game_Map[_0x37eb95(0x121)][_0x37eb95(0x127)],Game_Map['prototype'][_0x37eb95(0x127)]=function(_0x5ae7da){const _0xcb7e30=_0x37eb95;VisuMZ['VisualFogs'][_0xcb7e30(0x115)][_0xcb7e30(0x1b0)](this,_0x5ae7da),this[_0xcb7e30(0x13c)]();},Game_Map[_0x37eb95(0xf0)]=VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x134)][_0x37eb95(0xf5)],Game_Map[_0x37eb95(0x15f)]=VisuMZ['VisualFogs']['Settings']['BlendMode'],Game_Map['DEFAULT_FOG_TILE_BLUR']=VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x134)][_0x37eb95(0xe7)],Game_Map[_0x37eb95(0x138)]=VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x134)][_0x37eb95(0x137)],Game_Map['prototype'][_0x37eb95(0x13c)]=function(){const _0x3f7704=_0x37eb95;this[_0x3f7704(0x118)]=[null];if(!$dataMap)return;const _0x1dd504=VisuMZ[_0x3f7704(0x140)][_0x3f7704(0xfd)]();for(const _0x54a4b6 of _0x1dd504){if(!_0x54a4b6)continue;this['_visualFogSettings'][_0x54a4b6['id']]=_0x54a4b6;}},VisuMZ[_0x37eb95(0x140)][_0x37eb95(0xfd)]=function(){const _0xf38383=_0x37eb95;if(!$dataMap)return[];const _0x554c8a=[],_0x501c35=VisuMZ[_0xf38383(0x140)]['TemplateSettings']();if(!$dataMap['note'])return[];const _0x248d1f=VisuMZ[_0xf38383(0x140)][_0xf38383(0x16f)],_0x43d094=$dataMap[_0xf38383(0x104)]['split'](/[\r\n]+/);let _0x3493cc=JsonEx['makeDeepCopy'](_0x501c35);for(const _0x30cade of _0x43d094){if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x129)]))_0x3493cc['id']=Number(RegExp['$1']);else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x11f)])){const _0x3f7135=Number(RegExp['$1']);if(_0x3f7135>0x0&&_0x3f7135===_0x3493cc['id']&&_0x3493cc[_0xf38383(0x1a5)]!=='')_0x554c8a[_0xf38383(0x178)](_0x3493cc);_0x3493cc=JsonEx['makeDeepCopy'](_0x501c35);}else{if(_0x3493cc['id']<=0x0)continue;}}if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x124)]))_0x3493cc[_0xf38383(0x1a5)]=String(RegExp['$1'])[_0xf38383(0xf2)](),_0x3493cc['filename']['charAt'](0x0)==='!'&&(_0x3493cc[_0xf38383(0x148)]=!![]);else{if(_0x30cade['match'](_0x248d1f[_0xf38383(0x1bd)]))_0x3493cc[_0xf38383(0x145)]=!![],_0x3493cc[_0xf38383(0xfe)]=Number(RegExp['$1'])||0x0;else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x132)]))_0x3493cc[_0xf38383(0x107)]=!![],_0x3493cc[_0xf38383(0x10f)]=Number(RegExp['$1'])||0x0;else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f['ScrollLock']))_0x3493cc['_fogZero']=!![];else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0xe8)])){const _0x498696=Number(RegExp['$1'])*0.01;_0x3493cc[_0xf38383(0xf7)]=Math[_0xf38383(0x18a)](_0x498696*0xff)[_0xf38383(0x101)](0x0,0xff);}else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x1a4)]))_0x3493cc[_0xf38383(0xf7)]=Number(RegExp['$1'])[_0xf38383(0x101)](0x0,0xff);else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f['BlendMode'])){const _0x2837d7=String(RegExp['$1'])['toUpperCase']()[_0xf38383(0xf2)](),_0x2b9657=[_0xf38383(0x14e),_0xf38383(0xf8),_0xf38383(0x179),'SCREEN'];_0x3493cc['blendMode']=_0x2b9657[_0xf38383(0x185)](_0x2837d7)[_0xf38383(0x101)](0x0,0x3);}else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x195)]))_0x3493cc[_0xf38383(0x10c)]=Number(RegExp['$1'])[_0xf38383(0x101)](0x0,0x168);else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x1a8)]))_0x3493cc[_0xf38383(0x176)]=Number(RegExp['$1'])||0x0;else{if(_0x30cade['match'](_0x248d1f['Tone'])){const _0xfc5364=String(RegExp['$1'])['split'](',')[_0xf38383(0x16e)](_0x553018=>Number(_0x553018)||0x0);while(_0xfc5364[_0xf38383(0x154)]<0x4)_0xfc5364[_0xf38383(0x178)](0x0);_0x3493cc[_0xf38383(0x189)]=_0xfc5364;}else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x19e)])){const _0x571748=String(RegExp['$1'])[_0xf38383(0x167)](',')[_0xf38383(0x16e)](_0x44dc06=>Number(_0x44dc06)||0x1);_0x3493cc['maskRegions']=_0x571748;}else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f[_0xf38383(0x171)])){const _0x237ca2=String(RegExp['$1'])['split'](',')[_0xf38383(0x16e)](_0x23dd37=>Number(_0x23dd37)||0x1);_0x3493cc[_0xf38383(0x166)]=_0x237ca2;}else{if(_0x30cade['match'](_0x248d1f[_0xf38383(0xe7)]))_0x3493cc[_0xf38383(0x1be)]=Math['max'](Number(RegExp['$1'])||0x0,0x0);else{if(_0x30cade['match'](_0x248d1f[_0xf38383(0x137)]))_0x3493cc[_0xf38383(0x109)]=Math[_0xf38383(0x196)](Number(RegExp['$1'])||0x0,0x0);else{if(_0x30cade[_0xf38383(0x198)](_0x248d1f['CustomVignette']))_0x3493cc['vignetteFilename']=(String(RegExp['$1'])||'')['trim'](),_0x3493cc['vignette']=_0xf38383(0x188);else _0x30cade[_0xf38383(0x198)](_0x248d1f['PremadeVignette'])&&(_0x3493cc[_0xf38383(0xed)]=(String(RegExp['$1'])||'')[_0xf38383(0x172)]());}}}}}}}}}}}}}}}return _0x554c8a;},Game_Map[_0x37eb95(0x121)]['getVisualFogs']=function(){const _0x1c13ad=_0x37eb95;return this['_visualFogSettings'][_0x1c13ad(0x11c)](_0x818609=>!!_0x818609);},Game_Map['prototype'][_0x37eb95(0x141)]=function(_0x135a29){return this['_visualFogSettings'][_0x135a29]||null;},Game_Map[_0x37eb95(0x121)][_0x37eb95(0x1b7)]=function(_0x30ba00){const _0x30c1c8=_0x37eb95,_0x3a7445=this[_0x30c1c8(0x141)](_0x30ba00);if(_0x3a7445[_0x30c1c8(0x148)])return _0x3a7445[_0x30c1c8(0x1a7)]*this[_0x30c1c8(0x12d)]();else return _0x3a7445[_0x30c1c8(0x145)]?_0x3a7445[_0x30c1c8(0x1a7)]*this[_0x30c1c8(0x12d)]()/0x2:0x0;},Game_Map[_0x37eb95(0x121)][_0x37eb95(0xf4)]=function(_0x76e273){const _0x3ad61d=_0x37eb95,_0x4177ab=this['getVisualFogSettings'](_0x76e273);if(_0x4177ab['_fogZero'])return _0x4177ab['_fogY']*this[_0x3ad61d(0x192)]();else return _0x4177ab[_0x3ad61d(0x107)]?_0x4177ab[_0x3ad61d(0x17e)]*this[_0x3ad61d(0x192)]()/0x2:0x0;},Game_Map['prototype'][_0x37eb95(0x150)]=function(_0x15b8f0){const _0xc0f925=_0x37eb95;if(!this[_0xc0f925(0x118)][_0x15b8f0])return;this[_0xc0f925(0x118)][_0x15b8f0]=null;const _0x1db5ed=SceneManager[_0xc0f925(0x161)][_0xc0f925(0x15d)];_0x1db5ed&&_0x1db5ed[_0xc0f925(0x133)](_0x15b8f0);},Game_Map[_0x37eb95(0x121)]['addChangeVisualFog']=function(_0x3f3df1){const _0xab0221=_0x37eb95,_0x7a650d=_0x3f3df1['id'];let _0x3be0d3=![];if(this['_visualFogSettings'][_0x7a650d]){const _0x2de74d=this[_0xab0221(0x118)][_0x7a650d];if(!_0x2de74d[_0xab0221(0x120)][_0xab0221(0x17a)](_0x3f3df1[_0xab0221(0x120)]))_0x3be0d3=!![];else{if(!_0x2de74d[_0xab0221(0x166)][_0xab0221(0x17a)](_0x3f3df1[_0xab0221(0x166)]))_0x3be0d3=!![];else _0x2de74d['vignette']!==_0xab0221(0x182)&&(_0x3be0d3=!![]);}}this[_0xab0221(0x118)][_0x7a650d]=_0x3f3df1;const _0x10b3cf=SceneManager[_0xab0221(0x161)][_0xab0221(0x15d)];_0x10b3cf&&_0x10b3cf[_0xab0221(0xeb)](_0x7a650d,_0x3be0d3);},VisuMZ[_0x37eb95(0x140)]['Game_Map_setDisplayPos']=Game_Map[_0x37eb95(0x121)][_0x37eb95(0x19f)],Game_Map[_0x37eb95(0x121)][_0x37eb95(0x19f)]=function(_0x29ae23,_0x342390){const _0x202756=_0x37eb95;VisuMZ['VisualFogs']['Game_Map_setDisplayPos'][_0x202756(0x1b0)](this,_0x29ae23,_0x342390);for(const _0x4e3c9c of this[_0x202756(0xe9)]()){if(!_0x4e3c9c)continue;this[_0x202756(0x1b2)]()?_0x4e3c9c[_0x202756(0x1a7)]=_0x29ae23:_0x4e3c9c[_0x202756(0x1a7)]=this['_displayX'],this['isLoopVertical']()?_0x4e3c9c[_0x202756(0x17e)]=_0x342390:_0x4e3c9c[_0x202756(0x17e)]=this[_0x202756(0xf9)];}},VisuMZ['VisualFogs'][_0x37eb95(0x191)]=Game_Map[_0x37eb95(0x121)][_0x37eb95(0x174)],Game_Map['prototype'][_0x37eb95(0x174)]=function(_0x2c8607){const _0x5b8c1e=_0x37eb95,_0x267078=this[_0x5b8c1e(0x163)];VisuMZ[_0x5b8c1e(0x140)][_0x5b8c1e(0x191)][_0x5b8c1e(0x1b0)](this,_0x2c8607);for(const _0x3aa2b9 of this['getVisualFogs']()){if(!_0x3aa2b9)continue;if(this[_0x5b8c1e(0x1b2)]())_0x3aa2b9[_0x5b8c1e(0x145)]&&(_0x3aa2b9[_0x5b8c1e(0x1a7)]-=_0x2c8607);else this[_0x5b8c1e(0x100)]()>=this['screenTileX']()&&(_0x3aa2b9[_0x5b8c1e(0x1a7)]+=this[_0x5b8c1e(0x163)]-_0x267078);}},VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x146)]=Game_Map[_0x37eb95(0x121)][_0x37eb95(0x186)],Game_Map[_0x37eb95(0x121)]['scrollRight']=function(_0x310174){const _0x24bd54=_0x37eb95,_0x4cb6ff=this[_0x24bd54(0x163)];VisuMZ['VisualFogs'][_0x24bd54(0x146)]['call'](this,_0x310174);for(const _0x24b5ae of this[_0x24bd54(0xe9)]()){if(!_0x24b5ae)continue;if(this[_0x24bd54(0x1b2)]())_0x24b5ae[_0x24bd54(0x145)]&&(_0x24b5ae[_0x24bd54(0x1a7)]+=_0x310174);else this[_0x24bd54(0x100)]()>=this[_0x24bd54(0x142)]()&&(_0x24b5ae[_0x24bd54(0x1a7)]+=this['_displayX']-_0x4cb6ff);}},VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x16d)]=Game_Map['prototype'][_0x37eb95(0x106)],Game_Map[_0x37eb95(0x121)][_0x37eb95(0x106)]=function(_0x319b81){const _0xc315a1=_0x37eb95,_0x38189c=this[_0xc315a1(0xf9)];VisuMZ[_0xc315a1(0x140)][_0xc315a1(0x16d)][_0xc315a1(0x1b0)](this,_0x319b81);for(const _0xe51df3 of this[_0xc315a1(0xe9)]()){if(!_0xe51df3)continue;if(this[_0xc315a1(0x149)]())_0xe51df3[_0xc315a1(0x107)]&&(_0xe51df3[_0xc315a1(0x17e)]+=_0x319b81);else this[_0xc315a1(0x17c)]()>=this[_0xc315a1(0x15a)]()&&(_0xe51df3[_0xc315a1(0x17e)]+=this[_0xc315a1(0xf9)]-_0x38189c);}},VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x158)]=Game_Map['prototype'][_0x37eb95(0x1ac)],Game_Map[_0x37eb95(0x121)]['scrollUp']=function(_0x369c16){const _0x42f63d=_0x37eb95,_0x2d42a5=this[_0x42f63d(0xf9)];VisuMZ[_0x42f63d(0x140)]['Game_Map_scrollUp'][_0x42f63d(0x1b0)](this,_0x369c16);for(const _0x41de39 of this[_0x42f63d(0xe9)]()){if(!_0x41de39)continue;if(this[_0x42f63d(0x149)]())_0x41de39['_fogLoopY']&&(_0x41de39[_0x42f63d(0x17e)]-=_0x369c16);else this['height']()>=this['screenTileY']()&&(_0x41de39[_0x42f63d(0x17e)]+=this[_0x42f63d(0xf9)]-_0x2d42a5);}},VisuMZ[_0x37eb95(0x140)]['Game_Map_updateParallax']=Game_Map[_0x37eb95(0x121)][_0x37eb95(0x102)],Game_Map[_0x37eb95(0x121)][_0x37eb95(0x102)]=function(){const _0xc829f9=_0x37eb95;VisuMZ[_0xc829f9(0x140)][_0xc829f9(0x17b)][_0xc829f9(0x1b0)](this);for(const _0x3b5d8a of this[_0xc829f9(0xe9)]()){if(!_0x3b5d8a)continue;this['updateVisualFogSettings'](_0x3b5d8a);}},Game_Map['prototype'][_0x37eb95(0x199)]=function(_0x562bdd){const _0x5acf6a=_0x37eb95;_0x562bdd[_0x5acf6a(0x145)]&&(_0x562bdd[_0x5acf6a(0x1a7)]+=_0x562bdd[_0x5acf6a(0xfe)]/this['tileWidth']()/0x2);_0x562bdd[_0x5acf6a(0x107)]&&(_0x562bdd['_fogY']+=_0x562bdd[_0x5acf6a(0x10f)]/this[_0x5acf6a(0x192)]()/0x2);_0x562bdd['hue']+=_0x562bdd[_0x5acf6a(0x176)];if(_0x562bdd[_0x5acf6a(0x105)]>0x0){const _0x1ffeb8=_0x562bdd[_0x5acf6a(0x105)];_0x562bdd[_0x5acf6a(0xf7)]=(_0x562bdd[_0x5acf6a(0xf7)]*(_0x1ffeb8-0x1)+_0x562bdd['targetOpacity'])/_0x1ffeb8,_0x562bdd[_0x5acf6a(0x105)]--;}};function Sprite_VisualFog(){const _0x2d8ddb=_0x37eb95;this[_0x2d8ddb(0x13d)](...arguments);}Sprite_VisualFog[_0x37eb95(0x121)]=Object[_0x37eb95(0x11a)](TilingSprite[_0x37eb95(0x121)]),Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x143)]=Sprite_VisualFog,Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x13d)]=function(_0x268444){const _0x20168a=_0x37eb95;this[_0x20168a(0x1a6)]=_0x268444,TilingSprite[_0x20168a(0x121)][_0x20168a(0x13d)][_0x20168a(0x1b0)](this),this[_0x20168a(0x144)](),this[_0x20168a(0x17d)](),this['bitmap'][_0x20168a(0x130)](this[_0x20168a(0x151)][_0x20168a(0x16c)](this));},Sprite_VisualFog[_0x37eb95(0x121)]['settings']=function(){const _0x4342cc=_0x37eb95;return $gameMap[_0x4342cc(0x141)](this[_0x4342cc(0x1a6)]);},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x144)]=function(){const _0x21b8c7=_0x37eb95;this['_hue']=0x0,this['_colorTone']=[0x0,0x0,0x0,0x0],this[_0x21b8c7(0x10d)]=new ColorFilter(),!this['filters']&&(this[_0x21b8c7(0x193)]=[]),this['filters'][_0x21b8c7(0x178)](this[_0x21b8c7(0x10d)]);},Sprite_VisualFog['prototype'][_0x37eb95(0x128)]=function(){const _0x1c073a=_0x37eb95;!this['_colorFilter']&&this[_0x1c073a(0x144)](),this[_0x1c073a(0x10d)][_0x1c073a(0x152)](this[_0x1c073a(0x114)]),this[_0x1c073a(0x10d)][_0x1c073a(0x147)](this[_0x1c073a(0x117)]);},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x17d)]=function(){const _0xbdcb79=_0x37eb95;this[_0xbdcb79(0x155)]=this[_0xbdcb79(0x1a0)]()[_0xbdcb79(0x1a5)],this[_0xbdcb79(0x1af)]=ImageManager[_0xbdcb79(0x1b4)](this[_0xbdcb79(0x155)]);},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x151)]=function(){const _0x2e1c18=_0x37eb95;this[_0x2e1c18(0x125)]=new Sprite(),this[_0x2e1c18(0x19a)]();},Sprite_VisualFog['prototype'][_0x37eb95(0x19a)]=function(){const _0xe36d7d=_0x37eb95;this['_maskSprite'][_0xe36d7d(0x1af)]&&this['removeChild'](this['_maskSprite']);this[_0xe36d7d(0x139)]=undefined;const _0xc1acf4=this['settings']()[_0xe36d7d(0x120)],_0x1232df=this[_0xe36d7d(0x1a0)]()['maskTerrainTags'];if(this[_0xe36d7d(0x1a0)]()[_0xe36d7d(0xed)]===_0xe36d7d(0x188))this[_0xe36d7d(0x11b)]();else{if(this[_0xe36d7d(0x1a0)]()[_0xe36d7d(0xed)]!==_0xe36d7d(0x182))this[_0xe36d7d(0x12b)]();else(_0xc1acf4[_0xe36d7d(0x154)]>0x0||_0x1232df[_0xe36d7d(0x154)]>0x0)&&this[_0xe36d7d(0x18e)]();}},Sprite_VisualFog['prototype'][_0x37eb95(0x11b)]=function(){const _0x2f5f09=_0x37eb95,_0x5981ed=this[_0x2f5f09(0x1a0)]()[_0x2f5f09(0x14f)];this['_maskSprite'][_0x2f5f09(0x1af)]=ImageManager[_0x2f5f09(0x1b4)](_0x5981ed),this[_0x2f5f09(0x139)]=this['_maskSprite'],this[_0x2f5f09(0x17f)](this['_maskSprite']);},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x12b)]=function(){const _0x3e30ef=_0x37eb95,_0x24d7e5=this[_0x3e30ef(0x1a0)]()[_0x3e30ef(0xed)];this[_0x3e30ef(0x125)]['bitmap']=ImageManager[_0x3e30ef(0x18f)](_0x24d7e5),this[_0x3e30ef(0x139)]=this['_maskSprite'],this[_0x3e30ef(0x17f)](this[_0x3e30ef(0x125)]);},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x18e)]=function(){const _0x5dfdbd=_0x37eb95,_0x3b9ef4=this['settings']()['maskRegions'],_0x5f168a=this['settings']()[_0x5dfdbd(0x166)];if(_0x3b9ef4[_0x5dfdbd(0x154)]<=0x0&&_0x5f168a['length']<=0x0)return;if($gameMap[_0x5dfdbd(0x1b2)]()||$gameMap[_0x5dfdbd(0x149)]())return;const _0x3fd613=$gameMap[_0x5dfdbd(0x100)](),_0x3c20c7=$gameMap[_0x5dfdbd(0x17c)](),_0x453207=$gameMap[_0x5dfdbd(0x12d)](),_0x3911c1=$gameMap[_0x5dfdbd(0x192)](),_0xd98e94=this['settings']()[_0x5dfdbd(0x109)],_0x2ea59b=_0x453207+_0xd98e94*0x2,_0x127403=_0x3911c1+_0xd98e94*0x2;this[_0x5dfdbd(0x125)][_0x5dfdbd(0x1af)]=new Bitmap(_0x3fd613*_0x453207,_0x3c20c7*_0x3911c1);for(let _0x211a23=0x0;_0x211a23<_0x3fd613;_0x211a23++){for(let _0x2d5dce=0x0;_0x2d5dce<_0x3c20c7;_0x2d5dce++){(_0x3b9ef4[_0x5dfdbd(0x113)]($gameMap[_0x5dfdbd(0x159)](_0x211a23,_0x2d5dce))||_0x5f168a[_0x5dfdbd(0x113)]($gameMap[_0x5dfdbd(0x177)](_0x211a23,_0x2d5dce)))&&this[_0x5dfdbd(0x125)][_0x5dfdbd(0x1af)][_0x5dfdbd(0x173)](_0x211a23*_0x453207-_0xd98e94,_0x2d5dce*_0x3911c1-_0xd98e94,_0x2ea59b,_0x127403,'#ffffff');}}this['filters']=[];!!PIXI[_0x5dfdbd(0x193)][_0x5dfdbd(0x1bf)]&&!this[_0x5dfdbd(0x1ae)]&&(this[_0x5dfdbd(0x1ae)]=new PIXI[(_0x5dfdbd(0x193))][(_0x5dfdbd(0x1bf))](clamp=!![]));if(this['_blurFilter']){const _0x3a9dd1=this['settings']()[_0x5dfdbd(0x1be)];this[_0x5dfdbd(0x1ae)][_0x5dfdbd(0x156)]=_0x3a9dd1||0.01,this[_0x5dfdbd(0x193)]=[this[_0x5dfdbd(0x1ae)]];}this[_0x5dfdbd(0x139)]=this[_0x5dfdbd(0x125)],this['addChild'](this[_0x5dfdbd(0x125)]);},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0xff)]=function(_0x2faae4,_0x2b9572){},Sprite_VisualFog[_0x37eb95(0x121)]['update']=function(){const _0x49f75a=_0x37eb95;TilingSprite[_0x49f75a(0x121)][_0x49f75a(0x122)][_0x49f75a(0x1b0)](this);if(!this[_0x49f75a(0x1af)])return;this[_0x49f75a(0x194)](),this[_0x49f75a(0x14b)](),this[_0x49f75a(0x14a)](),this['updateHue'](),this[_0x49f75a(0x13e)](),this[_0x49f75a(0x157)]();},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x194)]=function(){const _0x4e7c88=_0x37eb95;this[_0x4e7c88(0xf7)]=this[_0x4e7c88(0x1a0)]()[_0x4e7c88(0xf7)];},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x14b)]=function(){const _0x11d707=_0x37eb95;this[_0x11d707(0xe6)]['x']=$gameMap[_0x11d707(0x1b7)](this[_0x11d707(0x1a6)]),this[_0x11d707(0xe6)]['y']=$gameMap[_0x11d707(0xf4)](this['_id']);},Sprite_VisualFog['prototype'][_0x37eb95(0x14a)]=function(){const _0x36d42e=_0x37eb95;this[_0x36d42e(0xf1)]=this['settings']()[_0x36d42e(0xf1)];},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x1aa)]=function(){const _0x59a8ae=_0x37eb95;this['setHue'](this[_0x59a8ae(0x1a0)]()[_0x59a8ae(0x10c)]);},Sprite_VisualFog['prototype'][_0x37eb95(0x152)]=function(_0x13b369){const _0x3c6df4=_0x37eb95;this['_hue']!==Number(_0x13b369)&&(this[_0x3c6df4(0x114)]=Number(_0x13b369),this[_0x3c6df4(0x128)]());},Sprite_VisualFog['prototype'][_0x37eb95(0x13e)]=function(){const _0x99a3=_0x37eb95;this[_0x99a3(0x147)](this[_0x99a3(0x1a0)]()[_0x99a3(0x189)]);},Sprite_VisualFog[_0x37eb95(0x121)][_0x37eb95(0x147)]=function(_0x2c77c6){const _0x437314=_0x37eb95;if(!(_0x2c77c6 instanceof Array))throw new Error('Argument\x20must\x20be\x20an\x20array');!this['_colorTone']['equals'](_0x2c77c6)&&(this['_colorTone']=_0x2c77c6[_0x437314(0x16b)](),this[_0x437314(0x128)]());},Sprite_VisualFog['prototype'][_0x37eb95(0x157)]=function(){const _0x125731=_0x37eb95;if(!this[_0x125731(0x139)])return;this[_0x125731(0x1a0)]()['vignette']!=='none'?(this[_0x125731(0x125)]['x']=0x0,this[_0x125731(0x125)]['y']=0x0):(this[_0x125731(0x125)]['x']=Math[_0x125731(0x1a3)](-$gameMap[_0x125731(0x10a)]()*$gameMap[_0x125731(0x12d)]()),this[_0x125731(0x125)]['y']=Math[_0x125731(0x1a3)](-$gameMap['displayY']()*$gameMap[_0x125731(0x192)]()));},VisuMZ[_0x37eb95(0x140)][_0x37eb95(0x136)]=Spriteset_Map[_0x37eb95(0x121)][_0x37eb95(0x19d)],Spriteset_Map[_0x37eb95(0x121)][_0x37eb95(0x19d)]=function(){const _0x2db0eb=_0x37eb95;this[_0x2db0eb(0x1b9)](),this[_0x2db0eb(0x15e)](),this[_0x2db0eb(0x162)](),VisuMZ[_0x2db0eb(0x140)]['Spriteset_Map_createWeather'][_0x2db0eb(0x1b0)](this);},Spriteset_Map['prototype'][_0x37eb95(0x1b9)]=function(){const _0x3935d7=_0x37eb95;this[_0x3935d7(0x16a)]=new Sprite(),this[_0x3935d7(0x181)]['addChild'](this['_fogContainer']),this['_fogDataRef']=[null];},Spriteset_Map[_0x37eb95(0x121)]['createFogLayers']=function(){const _0x3cb8bd=_0x37eb95,_0x5f256e=$gameMap[_0x3cb8bd(0xe9)]();for(const _0xba0cc7 of _0x5f256e){if(!_0xba0cc7)continue;this[_0x3cb8bd(0x1ab)](_0xba0cc7);}},Spriteset_Map['prototype'][_0x37eb95(0x1ab)]=function(_0x1549c3){const _0x125ba5=_0x37eb95;if(!_0x1549c3)return;const _0x59608f=new Sprite_VisualFog(_0x1549c3['id']);_0x59608f[_0x125ba5(0x18c)](0x0,0x0,Graphics['width'],Graphics[_0x125ba5(0x17c)]),this['_fogContainer'][_0x125ba5(0x17f)](_0x59608f);},Spriteset_Map['prototype'][_0x37eb95(0x162)]=function(){const _0x42c9f0=_0x37eb95;this[_0x42c9f0(0x16a)]['children'][_0x42c9f0(0x164)]((_0x1e335b,_0x7c7add)=>_0x1e335b[_0x42c9f0(0x1a6)]-_0x7c7add[_0x42c9f0(0x1a6)]);},Spriteset_Map[_0x37eb95(0x121)]['findTargetVisualFog']=function(_0x1ca286){const _0x37f676=_0x37eb95;return this[_0x37f676(0x16a)][_0x37f676(0x111)][_0x37f676(0x1b6)](_0x1987a2=>_0x1987a2['_id']===_0x1ca286);},Spriteset_Map['prototype'][_0x37eb95(0x133)]=function(_0x3a247d){const _0x3c26a2=_0x37eb95,_0x4f47b3=this['findTargetVisualFog'](_0x3a247d);_0x4f47b3&&this[_0x3c26a2(0x16a)][_0x3c26a2(0xee)](_0x4f47b3);},Spriteset_Map[_0x37eb95(0x121)][_0x37eb95(0xeb)]=function(_0x5819ed,_0x4f6413){const _0x3461d9=_0x37eb95,_0x59329f=this[_0x3461d9(0x1b3)](_0x5819ed);!_0x59329f?(this[_0x3461d9(0x1ab)]($gameMap[_0x3461d9(0x141)](_0x5819ed)),this[_0x3461d9(0x162)]()):(_0x59329f[_0x3461d9(0x17d)](),_0x4f6413&&_0x59329f['bitmap']['addLoadListener'](_0x59329f[_0x3461d9(0x19a)][_0x3461d9(0x16c)](_0x59329f)));};
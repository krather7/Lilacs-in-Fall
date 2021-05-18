//=============================================================================
// VisuStella MZ - Visual Parallaxes
// VisuMZ_4_VisualParallaxes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualParallaxes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualParallaxes = VisuMZ.VisualParallaxes || {};
VisuMZ.VisualParallaxes.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [VisualParallaxes]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Parallaxes_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ only allows each map to have one parallax. Such a
 * limit makes it difficult to create different layers of objects to portray
 * distance and the like. This plugin will remedy that by allowing you to add
 * an unlimited amount of parallaxes per map alongside many controls to make
 * the parallaxes more vivid.
 * 
 * A restricted parallax area system is also added to this plugin to make
 * parallaxes appear only within certain regions and/or terrain tags. This way,
 * you can utilize parallaxes as masked layers for water surfaces and the like.
 * 
 * To make the most out of this, with the tilesets are formatted properly,
 * reflective water and reflective solid surfaces are also new effects added
 * through this plugin. Water effects will show ripples while reflective solid
 * surfaces are static.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove parallaxes through map notetags.
 * * Lots of customization options for each of the parallaxes.
 * * Limit where parallaxes can be displayed on the map through regions and/or
 *   terrain tags.
 * * Create reflective surfaces for water and solid ground as long as the
 *   tilesets have been formatted properly.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove parallaxes as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Recommended Plugin List ------
 *
 * * Pixi JS Filters*
 *
 * This plugin recommends the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You can use this plugin without
 * it, but there will be features missing.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
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
 * Parallaxes
 * 
 * The map editor's inherent parallax will remain untouched and unable to
 * utilize the extra features provided by this plugin. However, you can just
 * simply create a new parallax layer over it and hide it from view if needed.
 * 
 * Each of the parallaxes added through this plugin's notetags and/or commands
 * are assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that parallax when needed.
 * 
 * The new parallaxes are created on a separate layer from the map editor's
 * parallax and isn't included with the new parallaxes. Layers with higher ID's
 * will appear above layers with lower ID's.
 * 
 * However, other than that, all of the new parallaxes follow the same rules as
 * the map editor's parallax. This means that they will not appear above the
 * tile map and require transparent tiles to be seen. They will also scroll the
 * same way the original parallax does to provide consistency.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a parallax to appear for the whole entire background and
 * want to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the parallax. Those parts will be little squares each,
 * equal to the size of a tile. They have hard borders and do not have any
 * smoothing options in order to display the parallax tiles accurately.
 * 
 * Each parallax layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Parallax layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Reflections
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * By default, water-based reflections are assigned the Terrain Tag 1 and solid
 * ground reflections are assigned the Terrain Tag 2. In order to make water
 * tiles show water reflections, you need to mark their tiles in the database's
 * tilesets with 1's. To mark reflective ground surfaces, mark them with 2's.
 * If the tiles are not tagged properly, the reflections will not be shown.
 * 
 * In the Plugin Parameters and notetags, you can decide if the reflections
 * will appear above the parallaxes or below them. By default, they will appear
 * above them. However, if you change them to appear below the parallaxes, then
 * pay attention to the opacity level of the parallaxes. If the parallaxes are
 * too opaque, you will barely see the reflection.
 * 
 * Once again, both water and ground tiles need to be semi-transparent or fully
 * transparent in order for reflections to be seen.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
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
 * Pixi JS Filters
 *
 * If the game project has Pixi JS Filters installed, then water reflections
 * will have a ripple effect. This is based off the Pixi JS ReflectionFilter
 * and will follow their rules. There are a couple of settings that can be
 * adjusted to customize the reflective properties.
 * 
 * Boundary: Vertical position of the reflection point, default is 50% (middle)
 * smaller numbers produce a larger reflection, larger numbers produce a
 * smaller reflection. This also means that reflections closer to the edges
 * will also have a different visual ripple effect than those towards the
 * middle of the reflection.
 * 
 * Amplitude: Starting and ending amplitude of waves allows you to control the
 * intensity of the reflection ripples. Use larger numbers for more intensity.
 * You have control over the values for the start and end values.
 * 
 * Wavelength: Starting and ending wavelength values determine the size of the
 * ripples for the reflection filter. Use larger numbers for larger wave sizes.
 * You have control over the values for the start and end values.
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
 * === Parallax-Related Notetags ===
 * 
 * ---
 *
 * <Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular parallax layer for this map by default.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 *
 * <Water Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Water Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a water-based parallax layer for this map by default.
 *   - This will utilize the water reflection properties and will only appear
 *     on water-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Solid Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Solid Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a solid-based parallax layer for this map by default.
 *   - This will utilize the solid reflection properties and will only appear
 *     on solid-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
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
 * - This enables horizontal or vertical scrolling for the parallax.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the parallax to only scroll when the map scrolls.
 * - This has the same effect as naming a parallax with "!" in front of
 *   its filename.
 * - If the filename used for this parallax has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the parallax.
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
 * - Sets the blend mode for the icon on the parallax.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the parallax to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   parallax each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the parallax.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * === Event Reflection-Related Notetags ===
 * 
 * ---
 *
 * <No Reflection>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will cause the event to not show any reflection on reflective tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * === Reflection-Related Notetags ===
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * ---
 *
 * <Water Reflection Region: id>
 * <Water Reflection Regions: id, id, id>
 *
 * <Solid Reflection Region: id>
 * <Solid Reflection Regions: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the region ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Water Reflection Terrain Tag: id>
 * <Water Reflection Terrain Tags: id, id, id>
 *
 * <Solid Reflection Terrain Tag: id>
 * <Solid Reflection Terrain Tags: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the terrain tag ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain Tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * <No Reflections>
 * 
 * - Used for: Map Notetags
 * - Disable water and map reflections on the current map.
 * 
 * ---
 *
 * <Water Reflection Top>
 * <Water Reflection Bottom>
 *
 * <Solid Reflection Top>
 * <Solid Reflection Bottom>
 *
 * - Used for: Map Notetags
 * - This will put the reflection layer either above all of the newly added
 *   parallaxes or below them.
 *   - If placed below, the reflection layer will not appear below the map
 *     editor's parallax layer.
 *   - If you change them to appear below the parallaxes, then pay attention to
 *     the opacity level of the parallaxes. If the parallaxes are too opaque,
 *     you will barely see the reflection.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Blur: x>
 * 
 * <Solid Reflection Blur: x>
 *
 * - Used for: Map Notetags
 * - Changes how much the water/solid tiles will blur the reflection for
 *   this map.
 * - Replace 'x' with a decimal Number value. Use a number between 0 and 1 for
 *   the best results.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Opacity: x>
 * <Water Reflection Opacity: x%>
 * 
 * <Solid Reflection Opacity: x>
 * <Solid Reflection Opacity: x%>
 *
 * - Used for: Map Notetags
 * - Changes the opacity level of the tile's reflection.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 * 
 * <Water Reflection Boundary: x>
 *
 * <Water Reflection Amplitude: start, end>
 * 
 * <Water Reflection Wavelength: start, end>
 *
 * - Used for: Map Notetags
 * - Requires Pixi JS Filters installed for the game project.
 * - These settings adjust the water reflection's ripple intensity.
 * - Replace Boundary's 'x' with a number value between 0 and 1.
 *   - Vertical position of the reflection point, default is 50% (middle)
 *     smaller numbers produce a larger reflection, larger numbers produce a
 *     smaller reflection. This also means that reflections closer to the edges
 *     will also have a different visual ripple effect than those towards the
 *     middle of the reflection.
 * - Replace Amplitude's 'start' and 'end' with number values representing how
 *   much to alter the intensity by.
 *   - Starting and ending amplitude of waves allows you to control the
 *     intensity of the reflection ripples.
 *   - Use larger numbers for more intensity.
 * - Replace Wavelength's 'start' and 'end' with number values representing the
 *   wave size.
 *   - Starting and ending wavelength values determine the size of the ripples
 *     for the reflection filter.
 *   - Use larger numbers for larger wave sizes.
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
 * === Parallax Plugin Commands ===
 * 
 * ---
 *
 * Parallax: Add/Change Settings
 * - Add/Change settings for target parallax.
 * - Does not alter the map editor's parallax.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this parallax to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the parallax?
 *
 *     Type:
 *     - What kind of parallax is this going to be?
 *     - Normal
 *     - Water
 *     - Solid
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 *
 *       Map Lock?:
 *       - Lock the parallax to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the parallax horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the parallax vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this parallax?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the parallax?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this parallax's hue?
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
 *       - Which regions will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 * ---
 * 
 * Parallax: Fade Opacity
 * - Fades the target parallax(es) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which parallax(es)?
 *   - Cannot target the map editor's parallax.
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
 * Parallax: Remove
 * - Removes target parallax(es).
 *
 *   ID(s):
 *   - Remove which parallax(es)?
 *   - Cannot remove the map editor's parallax.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Water Reflection Settings
 * ============================================================================
 *
 * These are the default settings for water-based reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
 * 
 *   Water Boundary:
 *   - At which point is the water boundary?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Amplitude Start:
 *   - What should be the starting amplitude value?
 * 
 *   Amplitude End:
 *   - What should be the ending amplitude value?
 * 
 *   Wavelength Start:
 *   - What should be the starting wavelength value?
 * 
 *   Wavelength End:
 *   - What should be the ending wavelength value?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Solid Reflection Settings
 * ============================================================================
 *
 * These are the default settings for solid ground reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
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
 * Version 1.00 Official Release Date: March 12, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxAddChangeSettings
 * @text Parallax: Add/Change Settings
 * @desc Add/Change settings for target parallax.
 * Does not alter the map editor's parallax.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this parallax to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the parallax?
 * @default >>>ATTENTION<<<
 *
 * @arg type:str
 * @text Type
 * @parent Required
 * @type select
 * @option Normal
 * @value normal
 * @option Water
 * @value water
 * @option Solid
 * @value solid
 * @desc What kind of parallax is this going to be?
 * @default normal
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Parallaxes.
 * @default {"Scrolling":"","_parallaxZero:eval":"false","_parallaxLoopX:eval":"false","_parallaxSx:eval":"+0","_parallaxLoopY:eval":"false","_parallaxSy:eval":"+0","Appearance":"","opacity:eval":"255","blendMode:eval":"0","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxFadeOpacity
 * @text Parallax: Fade Opacity
 * @desc Fades the target parallax(es) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which parallax(es)?
 * Cannot target the map editor's parallax.
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
 * @command ParallaxRemove
 * @text Parallax: Remove
 * @desc Removes target parallax(es).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which parallax(es)?
 * Cannot remove the map editor's parallax.
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
 * @param VisualParallaxes
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WaterReflect:struct
 * @text Water Reflection Settings
 * @type struct<WaterReflect>
 * @desc These are the default settings for water-based reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"1\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128","Boundary:num":"0.1","AmpStart:num":"2","AmpEnd:num":"4","WaveStart:num":"4","WaveEnd:num":"16"}
 *
 * @param SolidReflect:struct
 * @text Solid Reflection Settings
 * @type struct<SolidReflect>
 * @desc These are the default settings for solid ground reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"2\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128"}
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
 * Water Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WaterReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["1"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place water reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 * @param Boundary:num
 * @text Water Boundary
 * @parent Appearance
 * @desc At which point is the water boundary?
 * Use a decimal number between 0 and 1.
 * @default 0.1
 *
 * @param AmpStart:num
 * @text Amplitude Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting amplitude value?
 * @default 2
 *
 * @param AmpEnd:num
 * @text Amplitude End
 * @parent Appearance
 * @type number
 * @desc What should be the ending amplitude value?
 * @default 4
 *
 * @param WaveStart:num
 * @text Wavelength Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting wavelength value?
 * @default 4
 *
 * @param WaveEnd:num
 * @text Wavelength End
 * @parent Appearance
 * @type number
 * @desc What should be the ending wavelength value?
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Solid Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SolidReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["2"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place solid reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
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
 * @param _parallaxZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the parallax to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _parallaxLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSx:eval
 * @text Scroll:
 * @parent _parallaxLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _parallaxLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSy:eval
 * @text Scroll:
 * @parent _parallaxLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this parallax?
 * You may use JavaScript code.
 * @default 255
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
 * @desc What kind of blend mode do you wish to apply to the parallax?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this parallax's hue?
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
 * @desc Which regions will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 */
//=============================================================================

const _0x43f9=['note','DEFAULT_SOLID_REFLECTION_REGIONS','tileWidth','initVisualParallaxesEffects','_spriteset','event','AmpStart','_parallaxSy','_baseSprite','name','floor','clearPageSettings','_parallaxDataRef','WaterOpacityRate','getSolidReflectionOpacity','WaterAmplitude','scrollLeft','ADDITIVE','filename','refresh','DEFAULT_SOLID_REFLECTION_FILTER_BLUR','setupPageSettings','setupVisualParallaxesCommentTags','_hue','VertLoop','Spriteset_Map_createCharacters','Game_Map_setup','update','isLoopHorizontal','trim','_reflectFilter','2Zdgezm','findTargetVisualParallax','Spriteset_Map_update','SCREEN','getWaterReflectionTerrainTags','getVisualParallaxOy','ARRAYSTR','VisualParallaxes','Game_Map_setDisplayPos','RegExp','vehicles','DEFAULT_WATER_REFLECTION_FILTER_BLUR','water','22721shOesU','Hue','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','bitmap','updateOrigin','max','hasOwnProperty','makeDeepCopy','JSON','Opacity','EVAL','DEFAULT_WATER_REFLECTION_TERRAINTAGS','ARRAYJSON','Game_Map_scrollUp','_scene','HorzLoop','getSolidReflectionBlur','addChangeVisualParallax','clone','initialize','sortVisualParallaxes','getWaterReflectionBlur','createNewParallaxLayer','Game_Event_setupPageSettings','constructor','create','416414zHZRIy','format','BlendMode','map','OpacityFlat','_parallaxZero','_blurFilter','scale','toUpperCase','sort','blendMode','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createParallax','maskTerrainTags','getVisualParallaxSettings','599672acFRcj','_parallaxY','getWaterReflectionOpacity','1008735PoKEAj','origin','screenTileY','getSolidReflectionTop','1061419iuIlHi','createWaterReflectionMask','BlurFilter','setup','SolidRegions','createMaskBitmap','_displayY','removeVisualParallaxLayer','_updateColorFilter','settings','wasolidter','TemplateSettings','screenTileX','children','SolidBottom','createParallaxLayers','setDisplayPos','WaterTerrainTags','events','2jgIGaW','match','clamp','createCharacterReflections','_solidReflectLayer','ARRAYNUM','Blur','updateBlendMode','move','scrollDown','followers','Game_Map_updateParallax','_parallaxName','Game_Map_scrollDown','push','parse','round','updateWaterReflections','DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY','list','scrollRight','TerrainTags','STRUCT','WaterOpacityFlat','getVisualParallaxOx','addChild','DEFAULT_WATER_REFLECTION_FILTER_TOP','Settings','getWaterReflectionWavelength','createParallaxContainer','HueShift','SolidReflect','updateSolidReflections','hueShift','length','opacity','MULTIPLY','displayX','createWaterReflectionLayer','updateParallax','DEFAULT_WATER_REFLECTION_FILTER_OPACITY','ARRAYFUNC','Boundary','WaterReflect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','page','getSolidReflectionRegions','getSolidReflectionTerrainTags','loadParallax','prototype','NoReflection','DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH','updateMask','createReflectionMask','_reflection','_parallaxContainer','updateOpacity','filters','WaterRegions','_displayX','updateTone','loadBitmap','_parallaxSx','getWaterReflectionRegions','exit','registerCommand','84639ELVDij','includes','setupVisualParallaxesEffects','_parallaxLoopY','DEFAULT_SOLID_REFLECTION_TERRAINTAGS','OpacityRate','DEFAULT_SOLID_REFLECTION_FILTER_TOP','#ffffff','DEFAULT_WATER_REFLECTION_REGIONS','ParallaxAddChangeSettings','1ozRxmc','maskRegions','code','updateVisualParallaxLayer','_mask','removeChild','mask','SolidTop','colorTone','removeVisualParallax','description','displayY','setHue','version','tileHeight','isSceneMap','scrollUp','_maskSprite','Game_Map_scrollLeft','updateVisualParallaxSettings','_visualParallaxSettings','Game_Map_scrollRight','isLoopVertical','checkVisualParallaxesStringTags','bind','Game_Event_clearPageSettings','status','targetOpacity','ConvertParams','ARRAYSTRUCT','_waterReflectLayer','_parallaxLoopX','_createColorFilter','height','opacityDuration','_id','setupVisualParallaxes','width','DEFAULT_SOLID_REFLECTION_FILTER_OPACITY','noReflections','DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE','hue','equals','Regions','call','split','createMaskSprite','getVisualParallaxes','getWaterReflectionBoundary','1311778NfuWwF','find','_parallaxX','Spriteset_Map_createParallax','reverseData','createSolidReflectionLayer','remove','Game_Event_refresh','addLoadListener','getWaterReflectionTop','_colorTone','_noReflection','_colorFilter','parameters','filter','fillRect','getWaterReflectionAmplitude','type','terrainTag','setColorTone','updateHue','Argument\x20must\x20be\x20an\x20array','setupVisualParallaxesNotetags','Tone','CreateLayerData','SolidTerrainTags','regionId'];const _0xb424=function(_0x328151,_0x303a55){_0x328151=_0x328151-0xc3;let _0x43f980=_0x43f9[_0x328151];return _0x43f980;};const _0x84ed91=_0xb424;(function(_0x4cc685,_0x55ef38){const _0x1051ea=_0xb424;while(!![]){try{const _0x58b471=parseInt(_0x1051ea(0x13a))*-parseInt(_0x1051ea(0x12d))+parseInt(_0x1051ea(0x17d))*-parseInt(_0x1051ea(0x154))+parseInt(_0x1051ea(0x16a))+-parseInt(_0x1051ea(0x1bf))*-parseInt(_0x1051ea(0x1c9))+parseInt(_0x1051ea(0x166))+parseInt(_0x1051ea(0x163))+-parseInt(_0x1051ea(0xf3));if(_0x58b471===_0x55ef38)break;else _0x4cc685['push'](_0x4cc685['shift']());}catch(_0x50fba0){_0x4cc685['push'](_0x4cc685['shift']());}}}(_0x43f9,0x89cc1));var label=_0x84ed91(0x134),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x84ed91(0x101)](function(_0x5c168a){const _0x55881e=_0x84ed91;return _0x5c168a[_0x55881e(0xdc)]&&_0x5c168a[_0x55881e(0xcc)][_0x55881e(0x1c0)]('['+label+']');})[0x0];VisuMZ[label][_0x84ed91(0x198)]=VisuMZ[label][_0x84ed91(0x198)]||{},VisuMZ[_0x84ed91(0xde)]=function(_0x4d2bf6,_0x23bb4a){const _0x25453a=_0x84ed91;for(const _0x3e97d2 in _0x23bb4a){if(_0x3e97d2['match'](/(.*):(.*)/i)){const _0x3a5e4d=String(RegExp['$1']),_0x3d55a5=String(RegExp['$2'])[_0x25453a(0x15c)]()['trim']();let _0x51ba44,_0x2d1bdf,_0x4ccd68;switch(_0x3d55a5){case'NUM':_0x51ba44=_0x23bb4a[_0x3e97d2]!==''?Number(_0x23bb4a[_0x3e97d2]):0x0;break;case _0x25453a(0x182):_0x2d1bdf=_0x23bb4a[_0x3e97d2]!==''?JSON['parse'](_0x23bb4a[_0x3e97d2]):[],_0x51ba44=_0x2d1bdf[_0x25453a(0x157)](_0x290db6=>Number(_0x290db6));break;case _0x25453a(0x144):_0x51ba44=_0x23bb4a[_0x3e97d2]!==''?eval(_0x23bb4a[_0x3e97d2]):null;break;case'ARRAYEVAL':_0x2d1bdf=_0x23bb4a[_0x3e97d2]!==''?JSON[_0x25453a(0x18c)](_0x23bb4a[_0x3e97d2]):[],_0x51ba44=_0x2d1bdf['map'](_0x352042=>eval(_0x352042));break;case _0x25453a(0x142):_0x51ba44=_0x23bb4a[_0x3e97d2]!==''?JSON[_0x25453a(0x18c)](_0x23bb4a[_0x3e97d2]):'';break;case _0x25453a(0x146):_0x2d1bdf=_0x23bb4a[_0x3e97d2]!==''?JSON['parse'](_0x23bb4a[_0x3e97d2]):[],_0x51ba44=_0x2d1bdf[_0x25453a(0x157)](_0x57fafc=>JSON[_0x25453a(0x18c)](_0x57fafc));break;case'FUNC':_0x51ba44=_0x23bb4a[_0x3e97d2]!==''?new Function(JSON['parse'](_0x23bb4a[_0x3e97d2])):new Function('return\x200');break;case _0x25453a(0x1a6):_0x2d1bdf=_0x23bb4a[_0x3e97d2]!==''?JSON[_0x25453a(0x18c)](_0x23bb4a[_0x3e97d2]):[],_0x51ba44=_0x2d1bdf[_0x25453a(0x157)](_0x2438e3=>new Function(JSON[_0x25453a(0x18c)](_0x2438e3)));break;case'STR':_0x51ba44=_0x23bb4a[_0x3e97d2]!==''?String(_0x23bb4a[_0x3e97d2]):'';break;case _0x25453a(0x133):_0x2d1bdf=_0x23bb4a[_0x3e97d2]!==''?JSON['parse'](_0x23bb4a[_0x3e97d2]):[],_0x51ba44=_0x2d1bdf[_0x25453a(0x157)](_0x32aecb=>String(_0x32aecb));break;case _0x25453a(0x193):_0x4ccd68=_0x23bb4a[_0x3e97d2]!==''?JSON[_0x25453a(0x18c)](_0x23bb4a[_0x3e97d2]):{},_0x51ba44=VisuMZ[_0x25453a(0xde)]({},_0x4ccd68);break;case _0x25453a(0xdf):_0x2d1bdf=_0x23bb4a[_0x3e97d2]!==''?JSON['parse'](_0x23bb4a[_0x3e97d2]):[],_0x51ba44=_0x2d1bdf['map'](_0x3ec558=>VisuMZ[_0x25453a(0xde)]({},JSON[_0x25453a(0x18c)](_0x3ec558)));break;default:continue;}_0x4d2bf6[_0x3a5e4d]=_0x51ba44;}}return _0x4d2bf6;},(_0x2ba9b3=>{const _0x3f86de=_0x84ed91,_0xd8dc7d=_0x2ba9b3[_0x3f86de(0x117)];for(const _0x584a1a of dependencies){if(!Imported[_0x584a1a]){alert(_0x3f86de(0x1a9)[_0x3f86de(0x155)](_0xd8dc7d,_0x584a1a)),SceneManager[_0x3f86de(0x1bd)]();break;}}const _0x44d41b=_0x2ba9b3[_0x3f86de(0xcc)];if(_0x44d41b[_0x3f86de(0x17e)](/\[Version[ ](.*?)\]/i)){const _0x3a9c86=Number(RegExp['$1']);_0x3a9c86!==VisuMZ[label][_0x3f86de(0xcf)]&&(alert(_0x3f86de(0x15f)['format'](_0xd8dc7d,_0x3a9c86)),SceneManager['exit']());}if(_0x44d41b[_0x3f86de(0x17e)](/\[Tier[ ](\d+)\]/i)){const _0x13f866=Number(RegExp['$1']);_0x13f866<tier?(alert(_0x3f86de(0x13c)['format'](_0xd8dc7d,_0x13f866,tier)),SceneManager['exit']()):tier=Math[_0x3f86de(0x13f)](_0x13f866,tier);}VisuMZ[_0x3f86de(0xde)](VisuMZ[label]['Settings'],_0x2ba9b3['parameters']);})(pluginData),VisuMZ[_0x84ed91(0x134)]['TemplateSettings']=function(){return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};},PluginManager['registerCommand'](pluginData['name'],_0x84ed91(0x1c8),_0x41a420=>{const _0x24f914=_0x84ed91;VisuMZ['ConvertParams'](_0x41a420,_0x41a420);if(_0x41a420['id']<=0x0)return;if(_0x41a420[_0x24f914(0x120)]===''||_0x41a420[_0x24f914(0x120)]==='>>>ATTENTION<<<')return;let _0x29dc21=JsonEx[_0x24f914(0x141)](_0x41a420['Optional']);if(!_0x29dc21[_0x24f914(0x140)]('maskRegions'))_0x29dc21=VisuMZ[_0x24f914(0x134)][_0x24f914(0x175)]();_0x29dc21['filename']=_0x41a420[_0x24f914(0x120)],_0x29dc21['id']=_0x41a420['id'];_0x41a420['type']===_0x24f914(0x139)&&(_0x29dc21[_0x24f914(0xc3)][_0x24f914(0x19f)]<=0x0&&(_0x29dc21[_0x24f914(0xc3)]=JsonEx[_0x24f914(0x141)]($gameMap['getWaterReflectionRegions']())),_0x29dc21[_0x24f914(0x161)][_0x24f914(0x19f)]<=0x0&&(_0x29dc21[_0x24f914(0x161)]=JsonEx[_0x24f914(0x141)]($gameMap[_0x24f914(0x131)]())));_0x41a420[_0x24f914(0x104)]===_0x24f914(0x174)&&(_0x29dc21[_0x24f914(0xc3)][_0x24f914(0x19f)]<=0x0&&(_0x29dc21['maskRegions']=JsonEx[_0x24f914(0x141)]($gameMap['getSolidReflectionRegions']())),_0x29dc21[_0x24f914(0x161)][_0x24f914(0x19f)]<=0x0&&(_0x29dc21[_0x24f914(0x161)]=JsonEx[_0x24f914(0x141)]($gameMap[_0x24f914(0x1ac)]())));while(_0x29dc21[_0x24f914(0xca)]['length']<0x4){_0x29dc21['colorTone'][_0x24f914(0x18b)](0x0);}_0x29dc21['_parallaxX']=0x0,_0x29dc21[_0x24f914(0x164)]=0x0,_0x29dc21['targetOpacity']=_0x41a420[_0x24f914(0x1a0)],_0x29dc21[_0x24f914(0xe4)]=0x0,$gameMap[_0x24f914(0x14b)](_0x29dc21);}),PluginManager[_0x84ed91(0x1be)](pluginData[_0x84ed91(0x117)],'ParallaxFadeOpacity',_0x4a0bca=>{const _0x4e55d1=_0x84ed91;if(!SceneManager['isSceneMap']())return;VisuMZ['ConvertParams'](_0x4a0bca,_0x4a0bca);const _0x3eed6a=_0x4a0bca[_0x4e55d1(0x190)];for(const _0x409a80 of _0x3eed6a){const _0x2b80d5=$gameMap['getVisualParallaxSettings'](_0x409a80);if(!_0x2b80d5)continue;_0x2b80d5[_0x4e55d1(0xdd)]=_0x4a0bca['targetOpacity']||0x0,_0x2b80d5['opacityDuration']=_0x4a0bca[_0x4e55d1(0xe4)]||0x0,_0x2b80d5[_0x4e55d1(0xe4)]<=0x0&&(_0x2b80d5[_0x4e55d1(0x1a0)]=_0x2b80d5[_0x4e55d1(0xdd)]);}}),PluginManager[_0x84ed91(0x1be)](pluginData[_0x84ed91(0x117)],'ParallaxRemove',_0x396d40=>{const _0x5b46a8=_0x84ed91;if(!SceneManager[_0x5b46a8(0xd1)]())return;VisuMZ['ConvertParams'](_0x396d40,_0x396d40);const _0x4baf28=_0x396d40[_0x5b46a8(0x190)];for(const _0x4ea145 of _0x4baf28){$gameMap[_0x5b46a8(0xcb)](_0x4ea145);}}),VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x136)]={'Start':/<(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'WaterRegions':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'WaterTerrainTags':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'WaterTop':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TOP>/i,'WaterBottom':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOTTOM>/i,'WaterBlur':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BLUR:[ ](.*)>/i,'WaterOpacityRate':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'WaterOpacityFlat':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)>/i,'WaterBoundary':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOUNDARY:[ ](.*)>/i,'WaterAmplitude':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:AMP|AMPLITUDE):[ ](.*)>/i,'WaterWavelength':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:WAVE|WAVELENGTH):[ ](.*)>/i,'SolidRegions':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'SolidTerrainTags':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'SolidTop':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TOP>/i,'SolidBottom':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BOTTOM>/i,'SolidBlur':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BLUR:[ ](.*)>/i,'SolidOpacityRate':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'SolidOpacityFlat':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)>/i,'NoReflection':/<NO (?:REFLECT|REFLECTION|REFLECTIONS)>/i},SceneManager['isSceneMap']=function(){const _0x430aae=_0x84ed91;return this[_0x430aae(0x148)]&&this[_0x430aae(0x148)]['constructor']===Scene_Map;},VisuMZ['VisualParallaxes']['Game_Map_setup']=Game_Map[_0x84ed91(0x1ae)]['setup'],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x16d)]=function(_0x222a88){const _0x4a01ab=_0x84ed91;VisuMZ['VisualParallaxes'][_0x4a01ab(0x128)][_0x4a01ab(0xee)](this,_0x222a88),this[_0x4a01ab(0xe6)]();},Game_Map[_0x84ed91(0x1c7)]=VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)][_0x84ed91(0x1a8)][_0x84ed91(0xed)],Game_Map[_0x84ed91(0x145)]=VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)]['WaterReflect'][_0x84ed91(0x192)],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0xe9)]=function(){const _0x3d6c1c=_0x84ed91;if(DataManager['isEventTest']())return!![];if(this[_0x3d6c1c(0x12a)]()||this['isLoopVertical']())return!![];const _0x1c11f1=VisuMZ[_0x3d6c1c(0x134)][_0x3d6c1c(0x136)],_0x1dc1f8=$dataMap['note']||'';return _0x1dc1f8[_0x3d6c1c(0x17e)](_0x1c11f1[_0x3d6c1c(0x1af)])?!![]:![];},Game_Map['prototype']['getWaterReflectionRegions']=function(){const _0xfe7915=_0x84ed91,_0x3175a6=VisuMZ[_0xfe7915(0x134)][_0xfe7915(0x136)],_0x257f02=$dataMap['note']||'';if(_0x257f02[_0xfe7915(0x17e)](_0x3175a6[_0xfe7915(0x1b7)]))return String(RegExp['$1'])[_0xfe7915(0xef)](',')[_0xfe7915(0x157)](_0x268732=>Number(_0x268732)||0x1)['remove'](0x0);return JsonEx[_0xfe7915(0x141)](Game_Map[_0xfe7915(0x1c7)])[_0xfe7915(0xf9)](0x0);},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x131)]=function(){const _0x3f46ca=_0x84ed91,_0x7a757d=VisuMZ[_0x3f46ca(0x134)][_0x3f46ca(0x136)],_0x2250fd=$dataMap[_0x3f46ca(0x10e)]||'';if(_0x2250fd['match'](_0x7a757d[_0x3f46ca(0x17b)]))return String(RegExp['$1'])[_0x3f46ca(0xef)](',')[_0x3f46ca(0x157)](_0x4bdc13=>Number(_0x4bdc13)||0x1)[_0x3f46ca(0xf9)](0x0);return JsonEx['makeDeepCopy'](Game_Map[_0x3f46ca(0x145)])['remove'](0x0);},Game_Map[_0x84ed91(0x197)]=VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)]['WaterReflect']['Top'],Game_Map[_0x84ed91(0x138)]=VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)][_0x84ed91(0x1a8)]['Blur'],Game_Map[_0x84ed91(0x1a5)]=VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)][_0x84ed91(0x1a8)][_0x84ed91(0x143)],Game_Map[_0x84ed91(0x18f)]=VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)][_0x84ed91(0x1a8)][_0x84ed91(0x1a7)],Game_Map[_0x84ed91(0xea)]=[VisuMZ['VisualParallaxes']['Settings']['WaterReflect'][_0x84ed91(0x114)],VisuMZ[_0x84ed91(0x134)]['Settings'][_0x84ed91(0x1a8)]['AmpEnd']],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH']=[VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)]['WaterReflect']['WaveStart'],VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)][_0x84ed91(0x1a8)]['WaveEnd']],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0xfc)]=function(){const _0x4759d6=_0x84ed91,_0x45b94d=VisuMZ['VisualParallaxes'][_0x4759d6(0x136)],_0x2a9c9b=$dataMap[_0x4759d6(0x10e)]||'';if(_0x2a9c9b[_0x4759d6(0x17e)](_0x45b94d['WaterTop']))return!![];else{if(_0x2a9c9b[_0x4759d6(0x17e)](_0x45b94d['WaterBottom']))return![];}return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_TOP'];},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x14f)]=function(){const _0x19d6f3=_0x84ed91,_0x3e5170=VisuMZ[_0x19d6f3(0x134)][_0x19d6f3(0x136)],_0x19a6b7=$dataMap[_0x19d6f3(0x10e)]||'';if(_0x19a6b7[_0x19d6f3(0x17e)](_0x3e5170['WaterBlur']))return Math[_0x19d6f3(0x13f)](0x0,Number(RegExp['$1'])||0x0);return Game_Map[_0x19d6f3(0x138)];},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x165)]=function(){const _0x5ea8da=_0x84ed91,_0x30e270=VisuMZ['VisualParallaxes'][_0x5ea8da(0x136)],_0x3e1567=$dataMap[_0x5ea8da(0x10e)]||'';if(_0x3e1567[_0x5ea8da(0x17e)](_0x30e270[_0x5ea8da(0x11b)]))return Math[_0x5ea8da(0x18d)]((Number(RegExp['$1'])||0x0)*0.01*0xff)['clamp'](0x0,0xff);else{if(_0x3e1567[_0x5ea8da(0x17e)](_0x30e270[_0x5ea8da(0x194)]))return(Number(RegExp['$1'])||0x0)[_0x5ea8da(0x17f)](0x0,0xff);}return Game_Map[_0x5ea8da(0xe8)];},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0xf2)]=function(){const _0x53ee5d=_0x84ed91,_0x5e43e3=VisuMZ[_0x53ee5d(0x134)][_0x53ee5d(0x136)],_0x3ddc51=$dataMap[_0x53ee5d(0x10e)]||'';if(_0x3ddc51[_0x53ee5d(0x17e)](_0x5e43e3['WaterBoundary']))return(Number(RegExp['$1'])||0x0)['clamp'](0x0,0x1);return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY'];},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x103)]=function(){const _0x55208d=_0x84ed91,_0xbc3263=VisuMZ[_0x55208d(0x134)]['RegExp'],_0x3a9e86=$dataMap[_0x55208d(0x10e)]||'';if(_0x3a9e86['match'](_0xbc3263[_0x55208d(0x11d)])){const _0x353e0b=String(RegExp['$1'])[_0x55208d(0xef)](',')[_0x55208d(0x157)](_0xda3a6a=>Number(_0xda3a6a)||0x0);if(_0x353e0b[_0x55208d(0x19f)]<=0x1)_0x353e0b[0x1]=_0x353e0b[0x0];}return JsonEx[_0x55208d(0x141)](Game_Map[_0x55208d(0xea)])['remove'](0x0);},Game_Map[_0x84ed91(0x1ae)]['getWaterReflectionWavelength']=function(){const _0x15aa9a=_0x84ed91,_0x25f762=VisuMZ[_0x15aa9a(0x134)][_0x15aa9a(0x136)],_0x2f22c4=$dataMap['note']||'';if(_0x2f22c4[_0x15aa9a(0x17e)](_0x25f762[_0x15aa9a(0x11d)])){const _0xcd4022=String(RegExp['$1'])[_0x15aa9a(0xef)](',')[_0x15aa9a(0x157)](_0x4d7dd0=>Number(_0x4d7dd0)||0x0);if(_0xcd4022[_0x15aa9a(0x19f)]<=0x1)_0xcd4022[0x1]=_0xcd4022[0x0];}return JsonEx['makeDeepCopy'](Game_Map[_0x15aa9a(0x1b0)])[_0x15aa9a(0xf9)](0x0);},Game_Map[_0x84ed91(0x10f)]=VisuMZ['VisualParallaxes'][_0x84ed91(0x198)][_0x84ed91(0x19c)][_0x84ed91(0xed)],Game_Map[_0x84ed91(0x1c3)]=VisuMZ[_0x84ed91(0x134)]['Settings'][_0x84ed91(0x19c)]['TerrainTags'],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x1ab)]=function(){const _0x2d8c6=_0x84ed91,_0x1108d0=VisuMZ['VisualParallaxes'][_0x2d8c6(0x136)],_0x5e7427=$dataMap[_0x2d8c6(0x10e)]||'';if(_0x5e7427['match'](_0x1108d0[_0x2d8c6(0x16e)]))return String(RegExp['$1'])[_0x2d8c6(0xef)](',')[_0x2d8c6(0x157)](_0x1a239e=>Number(_0x1a239e)||0x1)[_0x2d8c6(0xf9)](0x0);return JsonEx[_0x2d8c6(0x141)](Game_Map[_0x2d8c6(0x10f)])[_0x2d8c6(0xf9)](0x0);},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x1ac)]=function(){const _0x1079cb=_0x84ed91,_0x2732a9=VisuMZ[_0x1079cb(0x134)][_0x1079cb(0x136)],_0xd57009=$dataMap['note']||'';if(_0xd57009[_0x1079cb(0x17e)](_0x2732a9[_0x1079cb(0x10c)]))return String(RegExp['$1'])[_0x1079cb(0xef)](',')['map'](_0x483111=>Number(_0x483111)||0x1)[_0x1079cb(0xf9)](0x0);return JsonEx[_0x1079cb(0x141)](Game_Map[_0x1079cb(0x1c3)])['remove'](0x0);},Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_TOP']=VisuMZ[_0x84ed91(0x134)]['Settings'][_0x84ed91(0x19c)]['Top'],Game_Map[_0x84ed91(0x122)]=VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x198)][_0x84ed91(0x19c)][_0x84ed91(0x183)],Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_OPACITY']=VisuMZ[_0x84ed91(0x134)]['Settings'][_0x84ed91(0x19c)][_0x84ed91(0x143)],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x169)]=function(){const _0x4bbfe0=_0x84ed91,_0xac98d7=VisuMZ[_0x4bbfe0(0x134)][_0x4bbfe0(0x136)],_0x2acdf1=$dataMap[_0x4bbfe0(0x10e)]||'';if(_0x2acdf1['match'](_0xac98d7[_0x4bbfe0(0xc9)]))return!![];else{if(_0x2acdf1[_0x4bbfe0(0x17e)](_0xac98d7[_0x4bbfe0(0x178)]))return![];}return Game_Map[_0x4bbfe0(0x1c5)];},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x14a)]=function(){const _0x53ae1f=_0x84ed91,_0x382b04=VisuMZ['VisualParallaxes'][_0x53ae1f(0x136)],_0x53cf03=$dataMap[_0x53ae1f(0x10e)]||'';if(_0x53cf03[_0x53ae1f(0x17e)](_0x382b04['SolidBlur']))return Math[_0x53ae1f(0x13f)](0x0,Number(RegExp['$1'])||0x0);return Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_BLUR'];},Game_Map['prototype'][_0x84ed91(0x11c)]=function(){const _0x287804=_0x84ed91,_0x316d28=VisuMZ[_0x287804(0x134)][_0x287804(0x136)],_0x12ee0f=$dataMap[_0x287804(0x10e)]||'';if(_0x12ee0f[_0x287804(0x17e)](_0x316d28['SolidOpacityRate']))return Math[_0x287804(0x18d)]((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x287804(0x17f)](0x0,0xff);else{if(_0x12ee0f[_0x287804(0x17e)](_0x316d28['SolidOpacityFlat']))return(Number(RegExp['$1'])||0x0)[_0x287804(0x17f)](0x0,0xff);}return Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_OPACITY'];},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0xe6)]=function(){const _0x243151=_0x84ed91;this[_0x243151(0xd6)]=[null];if(!$dataMap)return;const _0x8a7ad6=VisuMZ[_0x243151(0x134)]['CreateLayerData']();for(const _0x11a360 of _0x8a7ad6){if(!_0x11a360)continue;this[_0x243151(0xd6)][_0x11a360['id']]=_0x11a360;}},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x10b)]=function(){const _0x2695a4=_0x84ed91;if(!$dataMap)return[];const _0x1044ee=[],_0x3e5cba=VisuMZ[_0x2695a4(0x134)]['TemplateSettings']();if(!$dataMap[_0x2695a4(0x10e)])return[];const _0x208cf7=VisuMZ[_0x2695a4(0x134)][_0x2695a4(0x136)],_0x1220e7=$dataMap[_0x2695a4(0x10e)][_0x2695a4(0xef)](/[\r\n]+/);let _0x33ff46=JsonEx[_0x2695a4(0x141)](_0x3e5cba);for(const _0x38ffd1 of _0x1220e7){if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7['Start'])){_0x33ff46['id']=Number(RegExp['$1']);if(_0x38ffd1[_0x2695a4(0x17e)](/WATER/i))_0x33ff46[_0x2695a4(0xc3)]=JsonEx[_0x2695a4(0x141)]($gameMap[_0x2695a4(0x1bc)]()),_0x33ff46['maskTerrainTags']=JsonEx[_0x2695a4(0x141)]($gameMap[_0x2695a4(0x131)]());else _0x38ffd1[_0x2695a4(0x17e)](/SOLID/i)&&(_0x33ff46[_0x2695a4(0xc3)]=JsonEx[_0x2695a4(0x141)]($gameMap[_0x2695a4(0x1ab)]()),_0x33ff46['maskTerrainTags']=JsonEx[_0x2695a4(0x141)]($gameMap[_0x2695a4(0x1ac)]()));}else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7['End'])){const _0x268d2d=Number(RegExp['$1']);if(_0x268d2d>0x0&&_0x268d2d===_0x33ff46['id']&&_0x33ff46[_0x2695a4(0x120)]!=='')_0x1044ee['push'](_0x33ff46);_0x33ff46=JsonEx[_0x2695a4(0x141)](_0x3e5cba);}else{if(_0x33ff46['id']<=0x0)continue;}}if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7['Filename']))_0x33ff46[_0x2695a4(0x120)]=String(RegExp['$1'])[_0x2695a4(0x12b)](),_0x33ff46[_0x2695a4(0x120)]['charAt'](0x0)==='!'&&(_0x33ff46[_0x2695a4(0x159)]=!![]);else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7[_0x2695a4(0x149)]))_0x33ff46['_parallaxLoopX']=!![],_0x33ff46[_0x2695a4(0x1bb)]=Number(RegExp['$1'])||0x0;else{if(_0x38ffd1['match'](_0x208cf7[_0x2695a4(0x126)]))_0x33ff46[_0x2695a4(0x1c2)]=!![],_0x33ff46[_0x2695a4(0x115)]=Number(RegExp['$1'])||0x0;else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7['ScrollLock']))_0x33ff46[_0x2695a4(0x159)]=!![];else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7[_0x2695a4(0x1c4)])){const _0x2b645c=Number(RegExp['$1'])*0.01;_0x33ff46[_0x2695a4(0x1a0)]=Math[_0x2695a4(0x18d)](_0x2b645c*0xff)[_0x2695a4(0x17f)](0x0,0xff);}else{if(_0x38ffd1['match'](_0x208cf7[_0x2695a4(0x158)]))_0x33ff46[_0x2695a4(0x1a0)]=Number(RegExp['$1'])[_0x2695a4(0x17f)](0x0,0xff);else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7[_0x2695a4(0x156)])){const _0xfc0c2c=String(RegExp['$1'])[_0x2695a4(0x15c)]()['trim'](),_0x3ac547=['NORMAL',_0x2695a4(0x11f),_0x2695a4(0x1a1),_0x2695a4(0x130)];_0x33ff46[_0x2695a4(0x15e)]=_0x3ac547['indexOf'](_0xfc0c2c)['clamp'](0x0,0x3);}else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7[_0x2695a4(0x13b)]))_0x33ff46[_0x2695a4(0xeb)]=Number(RegExp['$1'])[_0x2695a4(0x17f)](0x0,0x168);else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7[_0x2695a4(0x19b)]))_0x33ff46[_0x2695a4(0x19e)]=Number(RegExp['$1'])||0x0;else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7[_0x2695a4(0x10a)])){const _0x4f22bf=String(RegExp['$1'])['split'](',')['map'](_0x1d42a6=>Number(_0x1d42a6)||0x0);while(_0x4f22bf[_0x2695a4(0x19f)]<0x4)_0x4f22bf['push'](0x0);_0x33ff46[_0x2695a4(0xca)]=_0x4f22bf;}else{if(_0x38ffd1[_0x2695a4(0x17e)](_0x208cf7['MaskRegions'])){const _0x3cdf46=String(RegExp['$1'])[_0x2695a4(0xef)](',')[_0x2695a4(0x157)](_0x3b42cc=>Number(_0x3b42cc)||0x1);_0x33ff46[_0x2695a4(0xc3)]=_0x3cdf46;}else{if(_0x38ffd1['match'](_0x208cf7['MaskTerrainTags'])){const _0x4f1491=String(RegExp['$1'])[_0x2695a4(0xef)](',')[_0x2695a4(0x157)](_0x28e0d4=>Number(_0x28e0d4)||0x1);_0x33ff46[_0x2695a4(0x161)]=_0x4f1491;}}}}}}}}}}}}}return _0x1044ee;},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0xf1)]=function(){const _0x5e79a7=_0x84ed91;return this[_0x5e79a7(0xd6)][_0x5e79a7(0x101)](_0x12b501=>!!_0x12b501);},Game_Map['prototype']['getVisualParallaxSettings']=function(_0x5065db){const _0x3cd112=_0x84ed91;return this[_0x3cd112(0xd6)][_0x5065db]||null;},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x195)]=function(_0x458ee6){const _0x56a9b2=_0x84ed91,_0x133829=this[_0x56a9b2(0x162)](_0x458ee6);if(_0x133829[_0x56a9b2(0x159)])return _0x133829[_0x56a9b2(0xf5)]*this[_0x56a9b2(0x110)]();else return _0x133829[_0x56a9b2(0xe1)]?_0x133829[_0x56a9b2(0xf5)]*this[_0x56a9b2(0x110)]()/0x2:0x0;},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x132)]=function(_0x8c7efd){const _0x15335c=_0x84ed91,_0x3dc01e=this['getVisualParallaxSettings'](_0x8c7efd);if(_0x3dc01e['_parallaxZero'])return _0x3dc01e[_0x15335c(0x164)]*this[_0x15335c(0xd0)]();else return _0x3dc01e[_0x15335c(0x1c2)]?_0x3dc01e[_0x15335c(0x164)]*this[_0x15335c(0xd0)]()/0x2:0x0;},Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0xcb)]=function(_0x12edaa){const _0x1fbe6c=_0x84ed91;if(!this['_visualParallaxSettings'][_0x12edaa])return;this['_visualParallaxSettings'][_0x12edaa]=null;const _0x5e8d00=SceneManager['_scene'][_0x1fbe6c(0x112)];_0x5e8d00&&_0x5e8d00[_0x1fbe6c(0x171)](_0x12edaa);},Game_Map[_0x84ed91(0x1ae)]['addChangeVisualParallax']=function(_0x37a00e){const _0x5f50c0=_0x84ed91,_0xdd1c8f=_0x37a00e['id'];let _0x5c8dd6=![];if(this['_visualParallaxSettings'][_0xdd1c8f]){const _0x20909b=this[_0x5f50c0(0xd6)][_0xdd1c8f];if(!_0x20909b[_0x5f50c0(0xc3)][_0x5f50c0(0xec)](_0x37a00e[_0x5f50c0(0xc3)]))_0x5c8dd6=!![];else!_0x20909b[_0x5f50c0(0x161)]['equals'](_0x37a00e[_0x5f50c0(0x161)])&&(_0x5c8dd6=!![]);}this[_0x5f50c0(0xd6)][_0xdd1c8f]=_0x37a00e;const _0x48a7b7=SceneManager[_0x5f50c0(0x148)][_0x5f50c0(0x112)];_0x48a7b7&&_0x48a7b7[_0x5f50c0(0xc5)](_0xdd1c8f,_0x5c8dd6);},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x135)]=Game_Map[_0x84ed91(0x1ae)]['setDisplayPos'],Game_Map['prototype'][_0x84ed91(0x17a)]=function(_0x19dab1,_0x3ee406){const _0xa78c3b=_0x84ed91;VisuMZ[_0xa78c3b(0x134)][_0xa78c3b(0x135)][_0xa78c3b(0xee)](this,_0x19dab1,_0x3ee406);for(const _0x5f020c of this[_0xa78c3b(0xf1)]()){if(!_0x5f020c)continue;this['isLoopHorizontal']()?_0x5f020c['_parallaxX']=_0x19dab1:_0x5f020c[_0xa78c3b(0xf5)]=this[_0xa78c3b(0x1b8)],this[_0xa78c3b(0xd8)]()?_0x5f020c[_0xa78c3b(0x164)]=_0x3ee406:_0x5f020c[_0xa78c3b(0x164)]=this[_0xa78c3b(0x170)];}},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0xd4)]=Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x11e)],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x11e)]=function(_0x4fb8fd){const _0x4dfab7=_0x84ed91,_0x116565=this[_0x4dfab7(0x1b8)];VisuMZ['VisualParallaxes'][_0x4dfab7(0xd4)][_0x4dfab7(0xee)](this,_0x4fb8fd);for(const _0x3ef1ea of this[_0x4dfab7(0xf1)]()){if(!_0x3ef1ea)continue;if(this['isLoopHorizontal']())_0x3ef1ea['_parallaxLoopX']&&(_0x3ef1ea[_0x4dfab7(0xf5)]-=_0x4fb8fd);else this[_0x4dfab7(0xe7)]()>=this['screenTileX']()&&(_0x3ef1ea[_0x4dfab7(0xf5)]+=this[_0x4dfab7(0x1b8)]-_0x116565);}},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0xd7)]=Game_Map['prototype'][_0x84ed91(0x191)],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x191)]=function(_0x8a1089){const _0x2a8396=_0x84ed91,_0x5284e5=this[_0x2a8396(0x1b8)];VisuMZ[_0x2a8396(0x134)][_0x2a8396(0xd7)]['call'](this,_0x8a1089);for(const _0x5cec60 of this['getVisualParallaxes']()){if(!_0x5cec60)continue;if(this['isLoopHorizontal']())_0x5cec60[_0x2a8396(0xe1)]&&(_0x5cec60[_0x2a8396(0xf5)]+=_0x8a1089);else this[_0x2a8396(0xe7)]()>=this[_0x2a8396(0x176)]()&&(_0x5cec60[_0x2a8396(0xf5)]+=this[_0x2a8396(0x1b8)]-_0x5284e5);}},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x18a)]=Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x186)],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x186)]=function(_0x4d17ff){const _0x3a335d=_0x84ed91,_0x2296e4=this[_0x3a335d(0x170)];VisuMZ[_0x3a335d(0x134)][_0x3a335d(0x18a)][_0x3a335d(0xee)](this,_0x4d17ff);for(const _0x4d499e of this[_0x3a335d(0xf1)]()){if(!_0x4d499e)continue;if(this[_0x3a335d(0xd8)]())_0x4d499e[_0x3a335d(0x1c2)]&&(_0x4d499e[_0x3a335d(0x164)]+=_0x4d17ff);else this['height']()>=this[_0x3a335d(0x168)]()&&(_0x4d499e['_parallaxY']+=this[_0x3a335d(0x170)]-_0x2296e4);}},VisuMZ['VisualParallaxes']['Game_Map_scrollUp']=Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0xd2)],Game_Map['prototype'][_0x84ed91(0xd2)]=function(_0x1f0f28){const _0x55291f=_0x84ed91,_0x3b114c=this[_0x55291f(0x170)];VisuMZ['VisualParallaxes'][_0x55291f(0x147)][_0x55291f(0xee)](this,_0x1f0f28);for(const _0x48f1a2 of this[_0x55291f(0xf1)]()){if(!_0x48f1a2)continue;if(this['isLoopVertical']())_0x48f1a2[_0x55291f(0x1c2)]&&(_0x48f1a2[_0x55291f(0x164)]-=_0x1f0f28);else this[_0x55291f(0xe3)]()>=this[_0x55291f(0x168)]()&&(_0x48f1a2[_0x55291f(0x164)]+=this['_displayY']-_0x3b114c);}},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x188)]=Game_Map['prototype'][_0x84ed91(0x1a4)],Game_Map[_0x84ed91(0x1ae)][_0x84ed91(0x1a4)]=function(){const _0x334dc7=_0x84ed91;VisuMZ[_0x334dc7(0x134)][_0x334dc7(0x188)][_0x334dc7(0xee)](this);for(const _0x1ae97e of this[_0x334dc7(0xf1)]()){if(!_0x1ae97e)continue;this[_0x334dc7(0xd5)](_0x1ae97e);}},Game_Map['prototype'][_0x84ed91(0xd5)]=function(_0x50d17c){const _0x475e61=_0x84ed91;_0x50d17c[_0x475e61(0xe1)]&&(_0x50d17c[_0x475e61(0xf5)]+=_0x50d17c[_0x475e61(0x1bb)]/this['tileWidth']()/0x2);_0x50d17c[_0x475e61(0x1c2)]&&(_0x50d17c[_0x475e61(0x164)]+=_0x50d17c['_parallaxSy']/this[_0x475e61(0xd0)]()/0x2);_0x50d17c['hue']+=_0x50d17c['hueShift'];if(_0x50d17c[_0x475e61(0xe4)]>0x0){const _0x1ca772=_0x50d17c[_0x475e61(0xe4)];_0x50d17c[_0x475e61(0x1a0)]=(_0x50d17c[_0x475e61(0x1a0)]*(_0x1ca772-0x1)+_0x50d17c['targetOpacity'])/_0x1ca772,_0x50d17c[_0x475e61(0xe4)]--;}},VisuMZ[_0x84ed91(0x134)]['Game_Event_refresh']=Game_Event[_0x84ed91(0x1ae)][_0x84ed91(0x121)],Game_Event[_0x84ed91(0x1ae)][_0x84ed91(0x121)]=function(){const _0x33f874=_0x84ed91;VisuMZ['VisualParallaxes'][_0x33f874(0xfa)]['call'](this),this[_0x33f874(0x1c1)]();},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0xdb)]=Game_Event['prototype'][_0x84ed91(0x119)],Game_Event['prototype'][_0x84ed91(0x119)]=function(){const _0x4efc81=_0x84ed91;VisuMZ[_0x4efc81(0x134)]['Game_Event_clearPageSettings'][_0x4efc81(0xee)](this),this[_0x4efc81(0x111)]();},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x151)]=Game_Event[_0x84ed91(0x1ae)]['setupPageSettings'],Game_Event[_0x84ed91(0x1ae)][_0x84ed91(0x123)]=function(){const _0x1a5164=_0x84ed91;VisuMZ['VisualParallaxes'][_0x1a5164(0x151)][_0x1a5164(0xee)](this),this[_0x1a5164(0x1c1)]();},Game_Event[_0x84ed91(0x1ae)][_0x84ed91(0x1c1)]=function(){const _0x128e92=_0x84ed91;if(!this['event']())return;this[_0x128e92(0x111)](),this[_0x128e92(0x109)](),this[_0x128e92(0x124)]();},Game_Event[_0x84ed91(0x1ae)][_0x84ed91(0x109)]=function(){const _0x26baf0=_0x84ed91,_0x5a7892=this[_0x26baf0(0x113)]()['note'];if(_0x5a7892==='')return;this['checkVisualParallaxesStringTags'](_0x5a7892);},Game_Event[_0x84ed91(0x1ae)][_0x84ed91(0x124)]=function(){const _0x395263=_0x84ed91;if(!this[_0x395263(0x1aa)]())return;const _0x2cdf73=this[_0x395263(0x190)]();let _0x2ad5e4='';for(const _0x506af2 of _0x2cdf73){if([0x6c,0x198][_0x395263(0x1c0)](_0x506af2[_0x395263(0xc4)])){if(_0x2ad5e4!=='')_0x2ad5e4+='\x0a';_0x2ad5e4+=_0x506af2[_0x395263(0x100)][0x0];}}this[_0x395263(0xd9)](_0x2ad5e4);},Game_Event[_0x84ed91(0x1ae)][_0x84ed91(0x111)]=function(){this['_noReflection']=![];},Game_Event[_0x84ed91(0x1ae)][_0x84ed91(0xd9)]=function(_0x16beda){const _0x1020b8=_0x84ed91,_0xa1701f=VisuMZ[_0x1020b8(0x134)][_0x1020b8(0x136)];_0x16beda[_0x1020b8(0x17e)](_0xa1701f[_0x1020b8(0x1af)])&&(this[_0x1020b8(0xfe)]=!![]);};function Sprite_VisualParallax(){const _0xbde049=_0x84ed91;this[_0xbde049(0x14d)](...arguments);}Sprite_VisualParallax[_0x84ed91(0x1ae)]=Object[_0x84ed91(0x153)](TilingSprite['prototype']),Sprite_VisualParallax['prototype'][_0x84ed91(0x152)]=Sprite_VisualParallax,Sprite_VisualParallax[_0x84ed91(0x1ae)][_0x84ed91(0x14d)]=function(_0x219aff){const _0x722506=_0x84ed91;this[_0x722506(0xe5)]=_0x219aff,TilingSprite['prototype'][_0x722506(0x14d)][_0x722506(0xee)](this),this[_0x722506(0xe2)](),this[_0x722506(0x1ba)](),this['bitmap'][_0x722506(0xfb)](this[_0x722506(0xf0)][_0x722506(0xda)](this));},Sprite_VisualParallax[_0x84ed91(0x1ae)]['settings']=function(){const _0x304eba=_0x84ed91;return $gameMap[_0x304eba(0x162)](this[_0x304eba(0xe5)]);},Sprite_VisualParallax['prototype']['_createColorFilter']=function(){const _0x5c9170=_0x84ed91;this[_0x5c9170(0x125)]=0x0,this[_0x5c9170(0xfd)]=[0x0,0x0,0x0,0x0],this[_0x5c9170(0xff)]=new ColorFilter(),!this[_0x5c9170(0x1b6)]&&(this['filters']=[]),this[_0x5c9170(0x1b6)][_0x5c9170(0x18b)](this['_colorFilter']);},Sprite_VisualParallax[_0x84ed91(0x1ae)]['_updateColorFilter']=function(){const _0x4df628=_0x84ed91;!this[_0x4df628(0xff)]&&this['_createColorFilter'](),this['_colorFilter']['setHue'](this[_0x4df628(0x125)]),this['_colorFilter'][_0x4df628(0x106)](this[_0x4df628(0xfd)]);},Sprite_VisualParallax['prototype'][_0x84ed91(0x1ba)]=function(){const _0x1395df=_0x84ed91;this[_0x1395df(0x189)]=this['settings']()['filename'],this[_0x1395df(0x13d)]=ImageManager[_0x1395df(0x1ad)](this['_parallaxName']);},Sprite_VisualParallax['prototype'][_0x84ed91(0xf0)]=function(){const _0x4d5667=_0x84ed91;this[_0x4d5667(0xd3)]=new Sprite(),this['createMaskBitmap']();},Sprite_VisualParallax[_0x84ed91(0x1ae)][_0x84ed91(0x16f)]=function(){const _0x200ac9=_0x84ed91;this['_maskSprite']['bitmap']&&(this['_maskSprite'][_0x200ac9(0x13d)]['destroy'](),this[_0x200ac9(0xc7)](this[_0x200ac9(0xd3)]));this[_0x200ac9(0xc8)]=undefined;const _0x4d1d44=this['settings']()['maskRegions'],_0x2bfe13=this[_0x200ac9(0x173)]()[_0x200ac9(0x161)];if(_0x4d1d44['length']<=0x0&&_0x2bfe13[_0x200ac9(0x19f)]<=0x0)return;if($gameMap[_0x200ac9(0x12a)]()||$gameMap['isLoopVertical']())return;const _0x4e5f39=$gameMap[_0x200ac9(0xe7)](),_0x5091ef=$gameMap[_0x200ac9(0xe3)](),_0xd93a61=$gameMap[_0x200ac9(0x110)](),_0xb43841=$gameMap[_0x200ac9(0xd0)]();this['_maskSprite'][_0x200ac9(0x13d)]=new Bitmap(_0x4e5f39*_0xd93a61,_0x5091ef*_0xb43841);for(let _0x38d799=0x0;_0x38d799<_0x4e5f39;_0x38d799++){for(let _0x58efed=0x0;_0x58efed<_0x5091ef;_0x58efed++){(_0x4d1d44[_0x200ac9(0x1c0)]($gameMap['regionId'](_0x38d799,_0x58efed))||_0x2bfe13[_0x200ac9(0x1c0)]($gameMap['terrainTag'](_0x38d799,_0x58efed)))&&this[_0x200ac9(0xd3)][_0x200ac9(0x13d)][_0x200ac9(0x102)](_0x38d799*_0xd93a61,_0x58efed*_0xb43841,_0xd93a61,_0xb43841,_0x200ac9(0x1c6));}}this[_0x200ac9(0xc8)]=this['_maskSprite'],this[_0x200ac9(0x196)](this[_0x200ac9(0xd3)]);},Sprite_VisualParallax[_0x84ed91(0x1ae)][_0x84ed91(0x129)]=function(){const _0x426ed2=_0x84ed91;TilingSprite[_0x426ed2(0x1ae)][_0x426ed2(0x129)][_0x426ed2(0xee)](this);if(!this['bitmap'])return;this['updateOpacity'](),this[_0x426ed2(0x13e)](),this[_0x426ed2(0x184)](),this['updateHue'](),this[_0x426ed2(0x1b9)](),this[_0x426ed2(0x1b1)]();},Sprite_VisualParallax[_0x84ed91(0x1ae)][_0x84ed91(0x1b5)]=function(){const _0x430b58=_0x84ed91;this[_0x430b58(0x1a0)]=this['settings']()[_0x430b58(0x1a0)];},Sprite_VisualParallax['prototype'][_0x84ed91(0x13e)]=function(){const _0x12263b=_0x84ed91;this[_0x12263b(0x167)]['x']=$gameMap[_0x12263b(0x195)](this[_0x12263b(0xe5)]),this['origin']['y']=$gameMap[_0x12263b(0x132)](this[_0x12263b(0xe5)]);},Sprite_VisualParallax[_0x84ed91(0x1ae)][_0x84ed91(0x184)]=function(){const _0x3b9f74=_0x84ed91;this[_0x3b9f74(0x15e)]=this[_0x3b9f74(0x173)]()[_0x3b9f74(0x15e)];},Sprite_VisualParallax[_0x84ed91(0x1ae)][_0x84ed91(0x107)]=function(){const _0x141016=_0x84ed91;this[_0x141016(0xce)](this[_0x141016(0x173)]()['hue']);},Sprite_VisualParallax[_0x84ed91(0x1ae)]['setHue']=function(_0x29046b){const _0xb3721d=_0x84ed91;this[_0xb3721d(0x125)]!==Number(_0x29046b)&&(this[_0xb3721d(0x125)]=Number(_0x29046b),this[_0xb3721d(0x172)]());},Sprite_VisualParallax[_0x84ed91(0x1ae)][_0x84ed91(0x1b9)]=function(){const _0x136c04=_0x84ed91;this['setColorTone'](this[_0x136c04(0x173)]()[_0x136c04(0xca)]);},Sprite_VisualParallax[_0x84ed91(0x1ae)][_0x84ed91(0x106)]=function(_0x2ad277){const _0x6bb18d=_0x84ed91;if(!(_0x2ad277 instanceof Array))throw new Error(_0x6bb18d(0x108));!this[_0x6bb18d(0xfd)][_0x6bb18d(0xec)](_0x2ad277)&&(this[_0x6bb18d(0xfd)]=_0x2ad277[_0x6bb18d(0x14c)](),this['_updateColorFilter']());},Sprite_VisualParallax[_0x84ed91(0x1ae)]['updateMask']=function(){const _0x34ce5d=_0x84ed91;if(!this[_0x34ce5d(0xc8)])return;this[_0x34ce5d(0xd3)]['x']=Math[_0x34ce5d(0x118)](-$gameMap['displayX']()*$gameMap[_0x34ce5d(0x110)]()),this[_0x34ce5d(0xd3)]['y']=Math[_0x34ce5d(0x118)](-$gameMap[_0x34ce5d(0xcd)]()*$gameMap[_0x34ce5d(0xd0)]());},VisuMZ['VisualParallaxes'][_0x84ed91(0xf6)]=Spriteset_Map[_0x84ed91(0x1ae)]['createParallax'],Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0x160)]=function(){const _0x4f4686=_0x84ed91;VisuMZ[_0x4f4686(0x134)][_0x4f4686(0xf6)][_0x4f4686(0xee)](this);if(!$gameMap[_0x4f4686(0xfc)]())this[_0x4f4686(0x1a3)]();if(!$gameMap[_0x4f4686(0x1ab)]())this['createSolidReflectionLayer']();this['createParallaxContainer'](),this[_0x4f4686(0x179)](),this[_0x4f4686(0x14e)]();if($gameMap[_0x4f4686(0xfc)]())this['createWaterReflectionLayer']();if($gameMap[_0x4f4686(0x1ab)]())this[_0x4f4686(0xf8)]();},Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0x1a3)]=function(){const _0x2dd5e8=_0x84ed91;if(!PIXI['filters'])return;if($gameMap[_0x2dd5e8(0x12a)]()||$gameMap['isLoopVertical']())return;if($gameMap[_0x2dd5e8(0xe9)]())return;this[_0x2dd5e8(0xe0)]=new Sprite(),this[_0x2dd5e8(0x116)][_0x2dd5e8(0x196)](this[_0x2dd5e8(0xe0)]),this[_0x2dd5e8(0xe0)][_0x2dd5e8(0x1b6)]=[],this[_0x2dd5e8(0xe0)][_0x2dd5e8(0x1a0)]=$gameMap[_0x2dd5e8(0x165)](),!!PIXI[_0x2dd5e8(0x1b6)]['ReflectionFilter']&&(this['_waterReflectLayer']['_reflectFilter']=new PIXI[(_0x2dd5e8(0x1b6))]['ReflectionFilter']({'boundary':$gameMap[_0x2dd5e8(0xf2)](),'amplitude':$gameMap[_0x2dd5e8(0x103)](),'waveLength':$gameMap[_0x2dd5e8(0x199)](),'mirror':![]})),!!PIXI[_0x2dd5e8(0x1b6)][_0x2dd5e8(0x16c)]&&(this[_0x2dd5e8(0xe0)]['_blurFilter']=new PIXI['filters'][(_0x2dd5e8(0x16c))]($gameMap[_0x2dd5e8(0x14f)]()),this[_0x2dd5e8(0xe0)][_0x2dd5e8(0x1b6)][_0x2dd5e8(0x18b)](this['_waterReflectLayer']['_blurFilter'])),this[_0x2dd5e8(0x16b)]();},Spriteset_Map['prototype'][_0x84ed91(0x16b)]=function(){const _0x36bab9=_0x84ed91,_0x427e57=$gameMap[_0x36bab9(0x1bc)](),_0x205a10=$gameMap[_0x36bab9(0x131)](),_0x1061b2=this['createReflectionMask'](_0x427e57,_0x205a10);_0x1061b2&&(this[_0x36bab9(0x196)](_0x1061b2),this['_waterReflectLayer']['mask']=_0x1061b2);},Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0xf8)]=function(){const _0x2d847a=_0x84ed91;if(!PIXI[_0x2d847a(0x1b6)])return;if($gameMap[_0x2d847a(0x12a)]()||$gameMap['isLoopVertical']())return;if($gameMap['noReflections']())return;this[_0x2d847a(0x181)]=new Sprite(),this[_0x2d847a(0x116)][_0x2d847a(0x196)](this[_0x2d847a(0x181)]),this[_0x2d847a(0x181)][_0x2d847a(0x1b6)]=[],this[_0x2d847a(0x181)]['opacity']=$gameMap['getSolidReflectionOpacity'](),!!PIXI[_0x2d847a(0x1b6)][_0x2d847a(0x16c)]&&(this[_0x2d847a(0x181)][_0x2d847a(0x15a)]=new PIXI['filters']['BlurFilter']($gameMap[_0x2d847a(0x14a)]()),this[_0x2d847a(0x181)][_0x2d847a(0x1b6)][_0x2d847a(0x18b)](this[_0x2d847a(0x181)][_0x2d847a(0x15a)])),this['createSolidReflectionMask']();},Spriteset_Map[_0x84ed91(0x1ae)]['createSolidReflectionMask']=function(){const _0x3f4359=_0x84ed91,_0x3a1283=$gameMap[_0x3f4359(0x1ab)](),_0x34fac2=$gameMap[_0x3f4359(0x1ac)](),_0x6d99d6=this['createReflectionMask'](_0x3a1283,_0x34fac2);_0x6d99d6&&(this[_0x3f4359(0x196)](_0x6d99d6),this['_solidReflectLayer'][_0x3f4359(0xc8)]=_0x6d99d6);},Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0x1b2)]=function(_0x565d21,_0x134ceb){const _0x1f2eac=_0x84ed91;if(_0x565d21['length']<=0x0&&_0x134ceb[_0x1f2eac(0x19f)]<=0x0)return null;const _0x1271cf=$gameMap[_0x1f2eac(0xe7)](),_0x3ddb51=$gameMap[_0x1f2eac(0xe3)](),_0x2f1b6e=$gameMap[_0x1f2eac(0x110)](),_0x13ed59=$gameMap[_0x1f2eac(0xd0)](),_0x38befb=0x0,_0x152885=_0x38befb*0x2,_0x3715de=new Sprite();_0x3715de[_0x1f2eac(0x13d)]=new Bitmap(_0x1271cf*_0x2f1b6e,_0x3ddb51*_0x13ed59);for(let _0x5aa805=0x0;_0x5aa805<_0x1271cf;_0x5aa805++){for(let _0x1b0fc2=0x0;_0x1b0fc2<_0x3ddb51;_0x1b0fc2++){(_0x565d21[_0x1f2eac(0x1c0)]($gameMap[_0x1f2eac(0x10d)](_0x5aa805,_0x1b0fc2))||_0x134ceb[_0x1f2eac(0x1c0)]($gameMap[_0x1f2eac(0x105)](_0x5aa805,_0x1b0fc2)))&&_0x3715de[_0x1f2eac(0x13d)][_0x1f2eac(0x102)](_0x5aa805*_0x2f1b6e+_0x38befb,_0x1b0fc2*_0x13ed59+_0x38befb,_0x2f1b6e-_0x152885,_0x13ed59-_0x152885,_0x1f2eac(0x1c6));}}return _0x3715de;},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x127)]=Spriteset_Map[_0x84ed91(0x1ae)]['createCharacters'],Spriteset_Map[_0x84ed91(0x1ae)]['createCharacters']=function(){const _0x56e1c6=_0x84ed91;VisuMZ[_0x56e1c6(0x134)]['Spriteset_Map_createCharacters'][_0x56e1c6(0xee)](this),this[_0x56e1c6(0x180)]();},Spriteset_Map[_0x84ed91(0x1ae)]['createCharacterReflections']=function(){const _0xc3546b=_0x84ed91;if($gameMap[_0xc3546b(0xe9)]())return;const _0xd653a3=[],_0x3435f4=[];for(const _0x394cff of $gameMap[_0xc3546b(0x17c)]()){if(_0x394cff['_noReflection'])continue;_0xd653a3['push'](new Sprite_Character(_0x394cff)),_0x3435f4[_0xc3546b(0x18b)](new Sprite_Character(_0x394cff));}for(const _0x5a34d8 of $gameMap[_0xc3546b(0x137)]()){_0xd653a3[_0xc3546b(0x18b)](new Sprite_Character(_0x5a34d8)),_0x3435f4[_0xc3546b(0x18b)](new Sprite_Character(_0x5a34d8));}for(const _0x5a4cb1 of $gamePlayer[_0xc3546b(0x187)]()[_0xc3546b(0xf7)]()){_0xd653a3[_0xc3546b(0x18b)](new Sprite_Character(_0x5a4cb1)),_0x3435f4[_0xc3546b(0x18b)](new Sprite_Character(_0x5a4cb1));}_0xd653a3[_0xc3546b(0x18b)](new Sprite_Character($gamePlayer)),_0x3435f4[_0xc3546b(0x18b)](new Sprite_Character($gamePlayer));if(this[_0xc3546b(0xe0)])for(const _0x5c3b64 of _0xd653a3){_0x5c3b64['_reflection']=!![],this['_waterReflectLayer'][_0xc3546b(0x196)](_0x5c3b64),_0x5c3b64[_0xc3546b(0x15b)]['y']=-0.85,_0x5c3b64[_0xc3546b(0x1b6)]=_0x5c3b64[_0xc3546b(0x1b6)]||[],_0x5c3b64[_0xc3546b(0x1b6)][_0xc3546b(0x18b)](this[_0xc3546b(0xe0)][_0xc3546b(0x12c)]);}if(this[_0xc3546b(0x181)])for(const _0x2f16e6 of _0x3435f4){_0x2f16e6[_0xc3546b(0x1b3)]=!![],this[_0xc3546b(0x181)][_0xc3546b(0x196)](_0x2f16e6),_0x2f16e6[_0xc3546b(0x15b)]['y']=-0.85;}},VisuMZ[_0x84ed91(0x134)][_0x84ed91(0x12f)]=Spriteset_Map[_0x84ed91(0x1ae)]['update'],Spriteset_Map['prototype'][_0x84ed91(0x129)]=function(){const _0x287791=_0x84ed91;VisuMZ[_0x287791(0x134)][_0x287791(0x12f)][_0x287791(0xee)](this),this[_0x287791(0x18e)](),this[_0x287791(0x19d)]();},Spriteset_Map[_0x84ed91(0x1ae)]['updateWaterReflections']=function(){const _0x206f75=_0x84ed91;if(!this['_waterReflectLayer'])return;this[_0x206f75(0xe0)][_0x206f75(0x12c)]&&(this['_waterReflectLayer'][_0x206f75(0x12c)]['time']+=0.05);const _0x2ebd79=this[_0x206f75(0xe0)][_0x206f75(0xc6)];_0x2ebd79&&(_0x2ebd79['x']=Math[_0x206f75(0x118)](-$gameMap['displayX']()*$gameMap[_0x206f75(0x110)]()),_0x2ebd79['y']=Math[_0x206f75(0x118)](-$gameMap[_0x206f75(0xcd)]()*$gameMap[_0x206f75(0xd0)]()));},Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0x19d)]=function(){const _0x4247d7=_0x84ed91;if(!this[_0x4247d7(0x181)])return;const _0x583eb9=this[_0x4247d7(0x181)][_0x4247d7(0xc6)];_0x583eb9&&(_0x583eb9['x']=Math['floor'](-$gameMap[_0x4247d7(0x1a2)]()*$gameMap[_0x4247d7(0x110)]()),_0x583eb9['y']=Math[_0x4247d7(0x118)](-$gameMap['displayY']()*$gameMap[_0x4247d7(0xd0)]()));},Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0x19a)]=function(){const _0x2da02a=_0x84ed91;this[_0x2da02a(0x1b4)]=new Sprite(),this[_0x2da02a(0x116)]['addChild'](this[_0x2da02a(0x1b4)]),this[_0x2da02a(0x11a)]=[null];},Spriteset_Map['prototype'][_0x84ed91(0x179)]=function(){const _0x49ea2b=_0x84ed91,_0x4cae8e=$gameMap[_0x49ea2b(0xf1)]();for(const _0x13145e of _0x4cae8e){if(!_0x13145e)continue;this[_0x49ea2b(0x150)](_0x13145e);}},Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0x150)]=function(_0x43e154){const _0x4386e7=_0x84ed91;if(!_0x43e154)return;const _0x4b91c0=new Sprite_VisualParallax(_0x43e154['id']);_0x4b91c0[_0x4386e7(0x185)](0x0,0x0,Graphics[_0x4386e7(0xe7)],Graphics[_0x4386e7(0xe3)]),this['_parallaxContainer'][_0x4386e7(0x196)](_0x4b91c0);},Spriteset_Map[_0x84ed91(0x1ae)]['sortVisualParallaxes']=function(){const _0x5efcab=_0x84ed91;this[_0x5efcab(0x1b4)][_0x5efcab(0x177)][_0x5efcab(0x15d)]((_0x666f94,_0x2d166b)=>_0x666f94[_0x5efcab(0xe5)]-_0x2d166b['_id']);},Spriteset_Map['prototype'][_0x84ed91(0x12e)]=function(_0x22d6be){const _0x3f1b8d=_0x84ed91;return this['_parallaxContainer'][_0x3f1b8d(0x177)][_0x3f1b8d(0xf4)](_0x4bfac6=>_0x4bfac6[_0x3f1b8d(0xe5)]===_0x22d6be);},Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0x171)]=function(_0x1e6af0){const _0xd037d5=_0x84ed91,_0x35812b=this[_0xd037d5(0x12e)](_0x1e6af0);_0x35812b&&this[_0xd037d5(0x1b4)][_0xd037d5(0xc7)](_0x35812b);},Spriteset_Map[_0x84ed91(0x1ae)][_0x84ed91(0xc5)]=function(_0x1803c8,_0x516bd6){const _0x5b3b40=_0x84ed91,_0x42d012=this[_0x5b3b40(0x12e)](_0x1803c8);!_0x42d012?(this[_0x5b3b40(0x150)]($gameMap[_0x5b3b40(0x162)](_0x1803c8)),this[_0x5b3b40(0x14e)]()):(_0x42d012[_0x5b3b40(0x1ba)](),_0x516bd6&&_0x42d012[_0x5b3b40(0x13d)][_0x5b3b40(0xfb)](_0x42d012[_0x5b3b40(0x16f)][_0x5b3b40(0xda)](_0x42d012)));};
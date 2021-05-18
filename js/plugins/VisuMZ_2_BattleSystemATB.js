//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.03] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
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
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Enemy Notetags
 * - Changes the marker graphic used for the enemy (actors do not apply) to a
 *   specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
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
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
 * @default true
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
 * @param BattleSystemATB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"false","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default false
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
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
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Marker Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 1
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x24a5=['drawText','cast','createBackgroundSprite','YzEfr','TpbCastTimeJS','updateBattleContainerOrder','MarkerOffset','Options','face','qiowr','InterruptFlashColor','actor','min','EnemyBattlerDrawLetter','IconIndex','MarkerSize','changeSvActorGraphicBitmap','addChild','full','EVAL','uKSEA','wytVh','createBorderSprite','default%1','%1BgColor2','parse','_tpbChargeTime','BorderThickness','loadSystem','top','_blendColor','Sprite_Gauge_currentValue','_skinSprite','_onRestrictBypassAtbReset','createStateIconSprite','isTpb','setBattler','createJS','BattlerRelativeSpeedJS','QCSOL','_letter','XEzjJ','sort','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updatePositionOffset','createBattlerSprites','ShowMarkerArrow','MzNKp','EnemyBattlerFontFace','ShowMarkerBg','ARRAYEVAL','setAtbCastTime','After','TpbBaseSpeedCalcJS','loadSvActor','reduce','GaugeSplit','isBattleSystemATBFieldGaugeVisible','eSbpQ','format','battleUIOffsetX','status','Aggro','gaugeColor1','_fieldAtbGaugeGraphicType','ARRAYNUM','Game_Battler_tpbAcceleration','atbInterrupt','updateAtbGaugeSpritePosition','Scene_Battle_createAllWindows','UGEEM','FastRate','addBattleSystemATBCommands','_tpbCastTime','hasSvBattler','requestFauxAnimation','atbSpeed','%1BgColor1','InterruptTextColor','rSLKn','cast2','InterruptMute','battlerName','clearTpbChargeTime','_backgroundSprite','fillRect','mqsFP','subject','EvIif','initBattleSystemATB','_graphicType','width','OffsetY','_fieldGaugeATB_Container','changeFaceGraphicBitmap','pixPm','setupArrowSprite','ckAXD','%1SystemBg','createAtbGaugeSprite','match','_horz','rnDRi','_plural','BattleManager_isActiveTpb','icon','Game_Battler_tpbSpeed','getColor','fieldAtbGraphicFaceIndex','Game_Battler_tpbRelativeSpeed','FieldGaugeClearEnemyGraphic','placeGauge','GjIzX','VisuMZ_1_BattleCore','EwEHx','AnchorY','FieldGauge','createEnemySprites','charging','iconWidth','parameters','_graphicEnemy','initTpbChargeTimeATB','DisplayOffsetX','traitObjects','setItem','tpbAcceleration','includes','OffsetX','Sprite_Gauge_currentMaxValue','VisuMZ_0_CoreEngine','gEOKi','applyGlobal','_graphicFaceName','createBattlerSprite','applyTpbPenalty','UiygZ','wmcjQ','ConfigManager_applyData','isAttack','_graphicHue','loadWindowskin','textColor','Sprite_Gauge_gaugeColor1','atbActive','ZByHp','svBattlerName','enemy','GaugeSystemSkin','_atbGaugeSprite','createBattlerContainer','_scene','visible','Rkhxh','Game_Action_applyItemUserEffect','Game_Battler_applyTpbPenalty','clearFieldAtbGraphics','UWGqk','isSideView','gqLBk','StunsResetGauge','EnemyBattlerFaceIndex','EnemyBattlerIcon','isHidden','battleUIOffsetY','VisibleGauge','left','Game_Action_applyGlobal','createFieldAtbGraphicFaceIndex','floor','JSON','return\x200','TpbSpeedCalcJS','item','NmjBt','updateGraphicHue','battlerHue','IconSet','_helpWindow','Scene_Boot_onDatabaseLoaded','speed','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','InterruptMirror','faceIndex','_fieldAtbGaugeFaceName','#000000','currentValue','length','atbColor','lbVjs','ctGaugeColor1','tpbSpeed','children','getChildIndex','updateGraphic','gaugeHeight','Name','InterruptFlashDuration','create','wHLys','_subject','_arrowSprite','Game_Battler_tpbRequiredCastTime','_battler','removeChild','createFieldAtbGraphicFaceName','_fieldGaugeATB','#%1','tpbRelativeSpeed','MKiYi','exit','EscapeFailPenalty','height','tpbChargeTime','Sprite_Enemy_createStateIconSprite','_statusType','RepositionTopHelpX','vzDVd','(?:GAUGE|TIME|SPEED)','isATB','applyItemUserEffect','DisplayOffsetY','ConvertParams','isAtbCastingState','cast%1','createFieldAtbGraphicIconIndex','QGvwY','applyItemBattleSystemATBUserEffect','targetPositionOnGauge','fFQnb','tpbRequiredCastTime','setHue','setText','hYUBV','opacity','isSceneBattle','FaceIndex','_graphicFaceIndex','casting','Xvwgq','isAtbChargingState','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','kjszW','EnemyBattlerType','gaugeColor2','initBattleSystemCTB','FUNC','BKOUD','bottom','atbAcceleration','InitialGaugeJS','slow%1','GaugeDirection','setAtbChargeTime','update','gaugeBackColor','Armor-%1-%2','iuJvR','clear','createGaugeSprite','name','ShowEnemyGauge','call','isActiveTpb','ShowActorGauge','ARRAYJSON','process_VisuMZ_BattleSystemATB_CreateRegExp','STR','_atbAfterSpeed','slow','setAtbAfterSpeed','_graphicSprite','isRestricted','note','paramRate','currentMaxValue','fontFace','onRestrict','ARRAYSTR','checkAggroControlSystemOffsetYAdjustment','Settings','setupTextPopup','setBlendColor','_homeX','GaugeThick','prototype','_atbFieldGaugeVisible','WMkpw','ZCtfg','RepositionTopForHelp','Actor','BattleSystemATB','NgYeg','Window_Options_addGeneralOptions','removeCurrentAction','onAtbInterrupt','applyGlobalBattleSystemATBEffects','UseFieldGauge','addBattleSystemATBShowGaugeCommand','FaceName','round','atbCurrentMaxValue','createFieldGaugeATB','isDead','compareBattlerSprites','createKeyJS','_fieldAtbGaugeFaceIndex','attackSpeed','createAllWindows','QNiqU','maxCommands','zkyoV','fieldAtbGraphicFaceName','Gauge','filter','skills','updateSelectionEffect','GaugeLengthHorz','Scale','bMKFL','atbCurrentValue','VzIOf','GaugeLengthVert','right','members','applyData','changeEnemyGraphicBitmap','faceName','anchor','fontSize','changeAtbChargeTime','_unit','maxBattleMembers','fieldAtbGraphicType','calcWindowHeight','Game_Battler_initTpbChargeTime','_graphicSv','_windowLayer','currentAction','toUpperCase','_letterSprite','ekGsk','sjHoS','setupAtbGaugeSprite','makeDeepCopy','setupBattleSystemATBColors','EjQrA','stop%1','boxWidth','svactor','gOZhh','createFieldGaugeSkin','createArrowSprite','setFrame','clearRect','AdjustRect','qsBwg','Item-%1-%2','_fieldAtbGaugeIconIndex','TGvwM','setBattleSystemATBFieldGaugeVisible','RegExp','TeiIB','onDatabaseLoaded','jVsjw','_battlerContainer','addChildAt','DisplayPosition','_graphicIconIndex','concat','atbStopped','State-%1-%2','setAtbGraphicIconIndex','initialize','drawGaugeBitmap','AXAgY','Game_Battler_tpbBaseSpeed','Sprite_Battler_updateMain','_forcing','Enemy','EnemyBattlerFontSize','updateMain','AggroControlSystem','Weapon-%1-%2','Window_StatusBase_placeGauge','Sprite_Actor_createStateSprite','%1Side','ConfigManager_makeData','max','_index','Charge','Class-%1-%2','changeAtbCastTime','Actors','updatePositionOnGauge','AnchorX','createStateSprite','setHomeLocation','IXXuB','process_VisuMZ_BattleSystemATB_JS_Notetags','AddOption','_gaugeSprite','scale','updateVisibility','Sprite_Battler_setBattler','Game_Battler_clearTpbChargeTime','ARRAYSTRUCT','fieldAtbGraphicIconIndex','FieldGaugeActorIcon','SlowRate','iconHeight','loadFace','Game_Battler_onRestrict','trim','ShowStatusGauge','tpbBaseSpeed','XIsgB','changeIconGraphicBitmap','battler','Scene_Options_maxCommands','EHZAa','processUpdateGraphic','showVisualAtbGauge','mainFontFace','canMove','TpbAccelerationJS','constructor','RepositionTopHelpY','%1BorderColor','ShowMarkerBorder','clamp','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','faceHeight','RGRsw','map','isEnemy','createLetterSprite','atbGaugeColor','blt','DrawGauge','Game_System_initialize','createGaugeBitmap','setup','Cast','BattleCore','fast','makeData','SystemFieldGaugeVisibility','applyATBPenalty','createChildren','visualAtbGauge','bind','time','updateOpacity','mainSprite','ColorManager_loadWindowskin','addLoadListener','EnemyBattlerFaceName','Mechanics','loadSvEnemy','description','createFieldAtbGraphicType','Enemies','initTpbChargeTime','isActor','ceil','Window_Help_setItem','%1SystemBorder','getAtbCastTimeRate','tIpxt','InterruptText','jnPbG','gradientFillRect','mxLXc','FieldGaugeEnemyIcon','registerCommand','createGraphicSprite','_tpbState','boxHeight','targetOpacity','_homeY','updateLetter','initMembers','KyxTN','isGaugeHorizontal','aggroGauge','ActorBattlerType','wWZbD','bitmap','_atbColors'];(function(_0x5353a2,_0x24a583){const _0x2ca6ee=function(_0xe2bcdb){while(--_0xe2bcdb){_0x5353a2['push'](_0x5353a2['shift']());}};_0x2ca6ee(++_0x24a583);}(_0x24a5,0xb9));const _0x2ca6=function(_0x5353a2,_0x24a583){_0x5353a2=_0x5353a2-0x0;let _0x2ca6ee=_0x24a5[_0x5353a2];return _0x2ca6ee;};const _0x4d8ff4=_0x2ca6;var label=_0x4d8ff4('0x6a'),tier=tier||0x0,dependencies=[_0x4d8ff4('0x1a2')],pluginData=$plugins[_0x4d8ff4('0x81')](function(_0x310800){const _0x4b66e3=_0x4d8ff4;return _0x310800[_0x4b66e3('0x16e')]&&_0x310800[_0x4b66e3('0x113')][_0x4b66e3('0x1b0')]('['+label+']');})[0x0];VisuMZ[label][_0x4d8ff4('0x5f')]=VisuMZ[label][_0x4d8ff4('0x5f')]||{},VisuMZ[_0x4d8ff4('0x25')]=function(_0x30f926,_0x113fae){const _0x321471=_0x4d8ff4;for(const _0x2d687e in _0x113fae){if(_0x2d687e[_0x321471('0x195')](/(.*):(.*)/i)){if(_0x321471('0x189')!==_0x321471('0x134')){const _0x46dce4=String(RegExp['$1']),_0x2a1524=String(RegExp['$2'])[_0x321471('0x9a')]()[_0x321471('0xe4')]();let _0x4ef880,_0x10f062,_0x59ece3;switch(_0x2a1524){case'NUM':_0x4ef880=_0x113fae[_0x2d687e]!==''?Number(_0x113fae[_0x2d687e]):0x0;break;case _0x321471('0x172'):_0x10f062=_0x113fae[_0x2d687e]!==''?JSON[_0x321471('0x14a')](_0x113fae[_0x2d687e]):[],_0x4ef880=_0x10f062[_0x321471('0xf9')](_0x4876c4=>Number(_0x4876c4));break;case _0x321471('0x144'):_0x4ef880=_0x113fae[_0x2d687e]!==''?eval(_0x113fae[_0x2d687e]):null;break;case _0x321471('0x163'):_0x10f062=_0x113fae[_0x2d687e]!==''?JSON[_0x321471('0x14a')](_0x113fae[_0x2d687e]):[],_0x4ef880=_0x10f062[_0x321471('0xf9')](_0x53c6cd=>eval(_0x53c6cd));break;case _0x321471('0x1db'):_0x4ef880=_0x113fae[_0x2d687e]!==''?JSON[_0x321471('0x14a')](_0x113fae[_0x2d687e]):'';break;case _0x321471('0x50'):_0x10f062=_0x113fae[_0x2d687e]!==''?JSON[_0x321471('0x14a')](_0x113fae[_0x2d687e]):[],_0x4ef880=_0x10f062['map'](_0x4ac4bb=>JSON[_0x321471('0x14a')](_0x4ac4bb));break;case _0x321471('0x3d'):_0x4ef880=_0x113fae[_0x2d687e]!==''?new Function(JSON[_0x321471('0x14a')](_0x113fae[_0x2d687e])):new Function(_0x321471('0x1dc'));break;case'ARRAYFUNC':_0x10f062=_0x113fae[_0x2d687e]!==''?JSON[_0x321471('0x14a')](_0x113fae[_0x2d687e]):[],_0x4ef880=_0x10f062[_0x321471('0xf9')](_0x2f537c=>new Function(JSON[_0x321471('0x14a')](_0x2f537c)));break;case _0x321471('0x52'):_0x4ef880=_0x113fae[_0x2d687e]!==''?String(_0x113fae[_0x2d687e]):'';break;case _0x321471('0x5d'):_0x10f062=_0x113fae[_0x2d687e]!==''?JSON[_0x321471('0x14a')](_0x113fae[_0x2d687e]):[],_0x4ef880=_0x10f062['map'](_0x1bfa48=>String(_0x1bfa48));break;case'STRUCT':_0x59ece3=_0x113fae[_0x2d687e]!==''?JSON['parse'](_0x113fae[_0x2d687e]):{},_0x4ef880=VisuMZ['ConvertParams']({},_0x59ece3);break;case _0x321471('0xdd'):_0x10f062=_0x113fae[_0x2d687e]!==''?JSON['parse'](_0x113fae[_0x2d687e]):[],_0x4ef880=_0x10f062[_0x321471('0xf9')](_0xbe8827=>VisuMZ[_0x321471('0x25')]({},JSON[_0x321471('0x14a')](_0xbe8827)));break;default:continue;}_0x30f926[_0x46dce4]=_0x4ef880;}else{function _0x95a534(){const _0x2c172b=_0x321471;if(this[_0x2c172b('0x1e')]==='time')return this[_0x2c172b('0xfc')](0x1);return _0x3ea31e[_0x2c172b('0x6a')][_0x2c172b('0x1c0')][_0x2c172b('0x4d')](this);}}}}return _0x30f926;},(_0x2c9a44=>{const _0x37bb8f=_0x4d8ff4,_0xfb8e20=_0x2c9a44[_0x37bb8f('0x4b')];for(const _0x59f75c of dependencies){if(!Imported[_0x59f75c]){alert(_0x37bb8f('0xf6')[_0x37bb8f('0x16c')](_0xfb8e20,_0x59f75c)),SceneManager[_0x37bb8f('0x19')]();break;}}const _0xa34d35=_0x2c9a44[_0x37bb8f('0x113')];if(_0xa34d35['match'](/\[Version[ ](.*?)\]/i)){if(_0x37bb8f('0x145')==='FUDqw'){function _0x1ed7d2(){const _0x42cc27=_0x37bb8f;this['x']=this[_0x42cc27('0x62')],this['y']=this['_homeY'];}}else{const _0x3d1f0c=Number(RegExp['$1']);if(_0x3d1f0c!==VisuMZ[label]['version']){if(_0x37bb8f('0x3e')===_0x37bb8f('0x160')){function _0x1000ba(){const _0x2a7602=_0x37bb8f,_0xf6a2ae=_0x47ed39[_0x2a7602('0x8b')](),_0x43596=_0xf6a2ae[_0x2a7602('0x2')];for(let _0x5828c7=0x0;_0x5828c7<_0x43596;_0x5828c7++){this['createBattlerSprite'](_0x5828c7,_0x2dd478);}}}else alert(_0x37bb8f('0x38')[_0x37bb8f('0x16c')](_0xfb8e20,_0x3d1f0c)),SceneManager[_0x37bb8f('0x19')]();}}}if(_0xa34d35['match'](/\[Tier[ ](\d+)\]/i)){const _0x3805c6=Number(RegExp['$1']);_0x3805c6<tier?(alert(_0x37bb8f('0x15c')[_0x37bb8f('0x16c')](_0xfb8e20,_0x3805c6,tier)),SceneManager['exit']()):tier=Math['max'](_0x3805c6,tier);}VisuMZ[_0x37bb8f('0x25')](VisuMZ[label]['Settings'],_0x2c9a44[_0x37bb8f('0x1a9')]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x4d8ff4('0x4b')],_0x4d8ff4('0xdf'),_0x4498ba=>{const _0x54dcb1=_0x4d8ff4;VisuMZ[_0x54dcb1('0x25')](_0x4498ba,_0x4498ba);const _0xa4439=_0x4498ba[_0x54dcb1('0xd0')],_0x1f1c22=_0x4498ba['IconIndex'];for(const _0x312bd6 of _0xa4439){if(_0x54dcb1('0x88')!==_0x54dcb1('0x88')){function _0x5937ad(){const _0x1be1f3=_0x54dcb1;if(!_0x1dd5e0[_0x1be1f3('0x5f')][_0x1be1f3('0xf4')])return;const _0x255c1e=_0xd8167a[_0x1be1f3('0x5f')],_0x58748d=this[_0x1be1f3('0x92')]===_0x40851c?_0x1be1f3('0x69'):_0x1be1f3('0xc2'),_0x114594=_0x1be1f3('0x11a')['format'](_0x58748d),_0x445bf9=new _0x409032();_0x445bf9[_0x1be1f3('0x8f')]['x']=this[_0x1be1f3('0x8f')]['x'],_0x445bf9[_0x1be1f3('0x8f')]['y']=this[_0x1be1f3('0x8f')]['y'];if(_0x255c1e[_0x114594])_0x445bf9['bitmap']=_0x1627be[_0x1be1f3('0x14d')](_0x255c1e[_0x114594]);else{let _0x5a2c3a=_0x255c1e[_0x1be1f3('0x140')],_0x219154=_0x255c1e[_0x1be1f3('0x14c')];_0x445bf9[_0x1be1f3('0x12f')]=new _0x1486f2(_0x5a2c3a,_0x5a2c3a);const _0x33bbcf='#000000',_0x3abd87=_0x59b227[_0x1be1f3('0x19c')](_0x255c1e[_0x1be1f3('0xf3')[_0x1be1f3('0x16c')](_0x58748d)]);_0x445bf9[_0x1be1f3('0x12f')][_0x1be1f3('0x186')](0x0,0x0,_0x5a2c3a,_0x5a2c3a,_0x33bbcf),_0x5a2c3a-=0x2,_0x445bf9[_0x1be1f3('0x12f')][_0x1be1f3('0x186')](0x1,0x1,_0x5a2c3a,_0x5a2c3a,_0x3abd87),_0x5a2c3a-=_0x219154*0x2,_0x445bf9[_0x1be1f3('0x12f')][_0x1be1f3('0x186')](0x1+_0x219154,0x1+_0x219154,_0x5a2c3a,_0x5a2c3a,_0x33bbcf),_0x5a2c3a-=0x2,_0x219154+=0x1,_0x445bf9['bitmap']['clearRect'](0x1+_0x219154,0x1+_0x219154,_0x5a2c3a,_0x5a2c3a);}this[_0x1be1f3('0x185')]=_0x445bf9,this['addChild'](this[_0x1be1f3('0x185')]);}}else{const _0x83cad6=$gameActors[_0x54dcb1('0x13c')](_0x312bd6);if(!_0x83cad6)continue;_0x83cad6['_fieldAtbGaugeGraphicType']=_0x54dcb1('0x19a'),_0x83cad6['_fieldAtbGaugeIconIndex']=_0x1f1c22;}}}),PluginManager['registerCommand'](pluginData[_0x4d8ff4('0x4b')],'FieldGaugeClearActorGraphic',_0x19f1ab=>{const _0x5427d7=_0x4d8ff4;VisuMZ[_0x5427d7('0x25')](_0x19f1ab,_0x19f1ab);const _0x4bcbd0=_0x19f1ab[_0x5427d7('0xd0')];for(const _0x5573e9 of _0x4bcbd0){if(_0x5427d7('0x29')!==_0x5427d7('0x29')){function _0x16b4a4(){const _0x7d18b1=_0x5427d7;let _0x3f62ce=_0x4748e0[_0x7d18b1('0x6a')][_0x7d18b1('0x5f')][_0x7d18b1('0x111')][_0x7d18b1('0xf0')]['call'](this,this);if(_0x51717c&&_0x18e36e[_0x7d18b1('0x17d')]!==_0x136c4a){const _0x59e6e2=_0x146026['atbSpeed']-0x3;if(_0x59e6e2>0x0)return _0x3f62ce*(_0x59e6e2*0x2);else{if(_0x59e6e2<0x0)return _0x3f62ce*(0x1/(_0x59e6e2*-0x2));}}return _0x3f62ce;}}else{const _0x33ad42=$gameActors[_0x5427d7('0x13c')](_0x5573e9);if(!_0x33ad42)continue;_0x33ad42[_0x5427d7('0x1cd')]();}}}),PluginManager['registerCommand'](pluginData[_0x4d8ff4('0x4b')],_0x4d8ff4('0x121'),_0x380210=>{const _0x26721e=_0x4d8ff4;VisuMZ[_0x26721e('0x25')](_0x380210,_0x380210);const _0x136867=_0x380210[_0x26721e('0x115')],_0x208fe3=_0x380210[_0x26721e('0x13f')];for(const _0x25c8d8 of _0x136867){const _0x23b0bc=$gameTroop[_0x26721e('0x8b')]()[_0x25c8d8];if(!_0x23b0bc)continue;_0x23b0bc[_0x26721e('0x171')]=_0x26721e('0x19a'),_0x23b0bc[_0x26721e('0xad')]=_0x208fe3;}}),PluginManager['registerCommand'](pluginData[_0x4d8ff4('0x4b')],'FieldGaugeEnemyFace',_0x8410e3=>{const _0x9b5cfd=_0x4d8ff4;VisuMZ['ConvertParams'](_0x8410e3,_0x8410e3);const _0x4f316a=_0x8410e3['Enemies'],_0x18d17c=_0x8410e3[_0x9b5cfd('0x72')],_0x212135=_0x8410e3[_0x9b5cfd('0x33')];for(const _0x25fb43 of _0x4f316a){const _0x5174eb=$gameTroop['members']()[_0x25fb43];if(!_0x5174eb)continue;_0x5174eb[_0x9b5cfd('0x171')]=_0x9b5cfd('0x139'),_0x5174eb['_fieldAtbGaugeFaceName']=_0x18d17c,_0x5174eb[_0x9b5cfd('0x79')]=_0x25fb43;}}),PluginManager[_0x4d8ff4('0x122')](pluginData[_0x4d8ff4('0x4b')],_0x4d8ff4('0x19f'),_0x1038e7=>{const _0x39b444=_0x4d8ff4;VisuMZ[_0x39b444('0x25')](_0x1038e7,_0x1038e7);const _0x53dcf6=_0x1038e7[_0x39b444('0x115')];for(const _0xdc4613 of _0x53dcf6){if(_0x39b444('0x1a1')!==_0x39b444('0x1a1')){function _0x53eb96(){const _0x431954=_0x39b444;return _0x14fa5b[_0x431954('0x6a')][_0x431954('0x5f')][_0x431954('0x111')]['TpbBaseSpeedCalcJS'][_0x431954('0x4d')](this,this);}}else{const _0x49eeae=$gameTroop[_0x39b444('0x8b')]()[_0xdc4613];if(!_0x49eeae)continue;_0x49eeae[_0x39b444('0x1cd')]();}}}),PluginManager['registerCommand'](pluginData['name'],_0x4d8ff4('0x106'),_0x16b0d9=>{const _0x50087b=_0x4d8ff4;VisuMZ[_0x50087b('0x25')](_0x16b0d9,_0x16b0d9);const _0x6cbe6=_0x16b0d9['Visible'];$gameSystem[_0x50087b('0xaf')](_0x6cbe6);}),VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x1e4')]=Scene_Boot['prototype'][_0x4d8ff4('0xb2')],Scene_Boot[_0x4d8ff4('0x64')][_0x4d8ff4('0xb2')]=function(){const _0x36a395=_0x4d8ff4;VisuMZ[_0x36a395('0x6a')][_0x36a395('0x1e4')]['call'](this),this['process_VisuMZ_BattleSystemATB_CreateRegExp'](),this['process_VisuMZ_BattleSystemATB_JS_Notetags']();},VisuMZ[_0x4d8ff4('0x6a')]['RegExp']={},Scene_Boot[_0x4d8ff4('0x64')][_0x4d8ff4('0x51')]=function(){const _0x4dcda0=_0x4d8ff4,_0x1634d0=VisuMZ[_0x4dcda0('0x103')][_0x4dcda0('0xb0')],_0x12261d='<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>',_0x1a3dff=[_0x4dcda0('0xcd'),_0x4dcda0('0x102'),'After'];for(const _0x5471fc of _0x1a3dff){const _0x195d43=_0x12261d[_0x4dcda0('0x16c')](_0x5471fc['toUpperCase']()[_0x4dcda0('0xe4')](),'(?:ATB|TPB)',_0x4dcda0('0x21')),_0x1f3ccc=new RegExp(_0x195d43,'i');VisuMZ[_0x4dcda0('0x6a')][_0x4dcda0('0xb0')][_0x5471fc]=_0x1f3ccc;}},Scene_Boot[_0x4d8ff4('0x64')][_0x4d8ff4('0xd6')]=function(){const _0x1ee153=_0x4d8ff4,_0x1a9b3b=$dataSkills[_0x1ee153('0xb8')]($dataItems),_0x562c8d=[_0x1ee153('0xcd'),'Cast',_0x1ee153('0x165')];for(const _0x5a147b of _0x1a9b3b){if(!_0x5a147b)continue;for(const _0xbb5bbc of _0x562c8d){VisuMZ[_0x1ee153('0x6a')][_0x1ee153('0x156')](_0x5a147b,_0xbb5bbc);}}},VisuMZ[_0x4d8ff4('0x6a')]['JS']={},VisuMZ['BattleSystemATB']['createJS']=function(_0x128ae7,_0x1e96e4){const _0x15e08c=_0x4d8ff4,_0x3c0085=_0x128ae7[_0x15e08c('0x58')];if(_0x3c0085[_0x15e08c('0x195')](VisuMZ[_0x15e08c('0x6a')][_0x15e08c('0xb0')][_0x1e96e4])){if('ikYnF'!=='ikYnF'){function _0xdbf4f5(){const _0x345752=_0x15e08c;return this['_tpbState']===_0x345752('0x1a7');}}else{const _0x43055d=String(RegExp['$1']),_0x126e4b=_0x15e08c('0x1e6')[_0x15e08c('0x16c')](_0x43055d,_0x1e96e4),_0x21fd52=VisuMZ[_0x15e08c('0x6a')][_0x15e08c('0x78')](_0x128ae7,_0x1e96e4);VisuMZ['BattleSystemATB']['JS'][_0x21fd52]=new Function(_0x126e4b);}}},VisuMZ['BattleSystemATB'][_0x4d8ff4('0x78')]=function(_0x22330a,_0x509b82){const _0x2cd2b8=_0x4d8ff4;let _0xa5a9b5='';if($dataActors['includes'](_0x22330a))_0xa5a9b5='Actor-%1-%2'[_0x2cd2b8('0x16c')](_0x22330a['id'],_0x509b82);if($dataClasses[_0x2cd2b8('0x1b0')](_0x22330a))_0xa5a9b5=_0x2cd2b8('0xce')[_0x2cd2b8('0x16c')](_0x22330a['id'],_0x509b82);if($dataSkills[_0x2cd2b8('0x1b0')](_0x22330a))_0xa5a9b5='Skill-%1-%2'['format'](_0x22330a['id'],_0x509b82);if($dataItems[_0x2cd2b8('0x1b0')](_0x22330a))_0xa5a9b5=_0x2cd2b8('0xac')[_0x2cd2b8('0x16c')](_0x22330a['id'],_0x509b82);if($dataWeapons['includes'](_0x22330a))_0xa5a9b5=_0x2cd2b8('0xc6')[_0x2cd2b8('0x16c')](_0x22330a['id'],_0x509b82);if($dataArmors[_0x2cd2b8('0x1b0')](_0x22330a))_0xa5a9b5=_0x2cd2b8('0x47')[_0x2cd2b8('0x16c')](_0x22330a['id'],_0x509b82);if($dataEnemies[_0x2cd2b8('0x1b0')](_0x22330a))_0xa5a9b5='Enemy-%1-%2'['format'](_0x22330a['id'],_0x509b82);if($dataStates[_0x2cd2b8('0x1b0')](_0x22330a))_0xa5a9b5=_0x2cd2b8('0xba')[_0x2cd2b8('0x16c')](_0x22330a['id'],_0x509b82);return _0xa5a9b5;},ConfigManager['visualAtbGauge']=!![],VisuMZ['BattleSystemATB'][_0x4d8ff4('0xca')]=ConfigManager[_0x4d8ff4('0x105')],ConfigManager['makeData']=function(){const _0x38f64c=_0x4d8ff4,_0x1c37a2=VisuMZ[_0x38f64c('0x6a')]['ConfigManager_makeData']['call'](this);return _0x1c37a2['visualAtbGauge']=this['visualAtbGauge'],_0x1c37a2;},VisuMZ['BattleSystemATB'][_0x4d8ff4('0x1bb')]=ConfigManager[_0x4d8ff4('0x8c')],ConfigManager['applyData']=function(_0x31a776){const _0x152f91=_0x4d8ff4;VisuMZ[_0x152f91('0x6a')][_0x152f91('0x1bb')][_0x152f91('0x4d')](this,_0x31a776),'visualAtbGauge'in _0x31a776?this[_0x152f91('0x109')]=_0x31a776[_0x152f91('0x109')]:this[_0x152f91('0x109')]=!![];},TextManager[_0x4d8ff4('0x109')]=VisuMZ['BattleSystemATB'][_0x4d8ff4('0x5f')]['Options'][_0x4d8ff4('0xb')],VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x10e')]=ColorManager[_0x4d8ff4('0x1be')],ColorManager[_0x4d8ff4('0x1be')]=function(){const _0x478042=_0x4d8ff4;VisuMZ['BattleSystemATB']['ColorManager_loadWindowskin']['call'](this),this['_windowskin']['addLoadListener'](this[_0x478042('0xa0')][_0x478042('0x10a')](this));},ColorManager[_0x4d8ff4('0x19c')]=function(_0x40720d){const _0x211073=_0x4d8ff4;return _0x40720d[_0x211073('0x195')](/#(.*)/i)?'#%1'[_0x211073('0x16c')](String(RegExp['$1'])):this[_0x211073('0x1bf')](Number(_0x40720d));},ColorManager['setupBattleSystemATBColors']=function(){const _0x51271c=_0x4d8ff4,_0x4b0923=['default',_0x51271c('0x143'),_0x51271c('0x132'),_0x51271c('0x104'),_0x51271c('0x54'),'stop'],_0x12de9e=VisuMZ[_0x51271c('0x6a')][_0x51271c('0x5f')]['Color'];this[_0x51271c('0x130')]={};for(const _0xf0eb17 of _0x4b0923){if(_0x51271c('0x66')!==_0x51271c('0x66')){function _0x29cfd1(){const _0x3ae44b=_0x51271c;return _0x26555f[_0x3ae44b('0xcb')](this[_0x3ae44b('0x12')]['_tpbCastTime'],0x0);}}else for(let _0xf4e44e=0x1;_0xf4e44e<=0x2;_0xf4e44e++){if(_0x51271c('0x158')!==_0x51271c('0x158')){function _0x52f857(){const _0x1b9a7b=_0x51271c,_0x2fe91d=_0x590ac6[_0x1b9a7b('0x5f')],_0x25f22c=this[_0x1b9a7b('0x12b')](),_0x2a26ab=_0x25f22c?_0x2fe91d[_0x1b9a7b('0x84')]:_0x2fe91d['GaugeThick'],_0x3064e5=_0x25f22c?_0x2fe91d[_0x1b9a7b('0x63')]:_0x2fe91d['GaugeLengthVert'];this['_gaugeSprite'][_0x1b9a7b('0x12f')]=new _0xf3ed77(_0x2a26ab,_0x3064e5),this[_0x1b9a7b('0xbd')](),this[_0x1b9a7b('0xd8')]['x']=_0x313067[_0x1b9a7b('0x118')](_0x2a26ab/-0x2),this['_gaugeSprite']['y']=_0x2e6450[_0x1b9a7b('0x118')](_0x3064e5/-0x2);}}else{const _0x25816f=_0xf0eb17+_0xf4e44e;this['_atbColors'][_0x25816f]=this['getColor'](_0x12de9e[_0x25816f]);}}}},ColorManager[_0x4d8ff4('0x3')]=function(_0x43fb69){const _0x47e1f7=_0x4d8ff4;if(this[_0x47e1f7('0x130')]===undefined)this['setupBattleSystemATBColors']();return this[_0x47e1f7('0x130')][_0x43fb69]||_0x47e1f7('0x0');},SceneManager['isSceneBattle']=function(){const _0x2de484=_0x4d8ff4;return this[_0x2de484('0x1c8')]&&this[_0x2de484('0x1c8')][_0x2de484('0xf1')]===Scene_Battle;},BattleManager['isATB']=function(){const _0x4c00ea=_0x4d8ff4;if(Imported['VisuMZ_2_BattleSystemCTB']&&this['isCTB']())return![];return this[_0x4c00ea('0x154')]();},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x199')]=BattleManager[_0x4d8ff4('0x4e')],BattleManager[_0x4d8ff4('0x4e')]=function(){const _0x3b52dc=_0x4d8ff4;if(!this[_0x3b52dc('0x154')]())return![];else{if(ConfigManager&&ConfigManager[_0x3b52dc('0x1c1')]!==undefined)return ConfigManager[_0x3b52dc('0x1c1')];else{if(_0x3b52dc('0x1b4')===_0x3b52dc('0x1b4'))return VisuMZ['BattleSystemATB']['BattleManager_isActiveTpb'][_0x3b52dc('0x4d')](this);else{function _0x18b83a(){const _0x25000a=_0x3b52dc;_0x23f644(_0x25000a('0x38')[_0x25000a('0x16c')](_0x3db2f7,_0x290729)),_0x4331e6['exit']();}}}}},VisuMZ['BattleSystemATB'][_0x4d8ff4('0xff')]=Game_System[_0x4d8ff4('0x64')][_0x4d8ff4('0xbc')],Game_System['prototype'][_0x4d8ff4('0xbc')]=function(){const _0x4dcdd2=_0x4d8ff4;VisuMZ[_0x4dcdd2('0x6a')][_0x4dcdd2('0xff')][_0x4dcdd2('0x4d')](this),this[_0x4dcdd2('0x18a')]();},Game_System[_0x4d8ff4('0x64')][_0x4d8ff4('0x18a')]=function(){const _0x4fe99a=_0x4d8ff4;this[_0x4fe99a('0x65')]=!![];},Game_System[_0x4d8ff4('0x64')][_0x4d8ff4('0x16a')]=function(){const _0x234835=_0x4d8ff4;if(this[_0x234835('0x65')]===undefined){if(_0x234835('0x1ce')!==_0x234835('0xeb'))this[_0x234835('0x3c')]();else{function _0x472a26(){const _0x36c33f=_0x234835;this[_0x36c33f('0x133')](),this[_0x36c33f('0x123')](),this['createBorderSprite'](),this[_0x36c33f('0xfb')](),this[_0x36c33f('0xa7')](),this[_0x36c33f('0xd1')](!![]);}}}return this[_0x234835('0x65')];},Game_System[_0x4d8ff4('0x64')][_0x4d8ff4('0xaf')]=function(_0x3bada2){const _0x3a9104=_0x4d8ff4;if(this[_0x3a9104('0x65')]===undefined){if(_0x3a9104('0x190')==='pixPm')this[_0x3a9104('0x3c')]();else{function _0xc8a042(){const _0x374536=_0x3a9104;_0x284f18[_0x374536('0xcf')](_0x46e1ef(_0x498cc5['$1'])*0.01);}}}this[_0x3a9104('0x65')]=_0x3bada2;},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x1cb')]=Game_Action['prototype'][_0x4d8ff4('0x23')],Game_Action[_0x4d8ff4('0x64')]['applyItemUserEffect']=function(_0x4f2d81){const _0x298fcb=_0x4d8ff4;VisuMZ[_0x298fcb('0x6a')][_0x298fcb('0x1cb')][_0x298fcb('0x4d')](this,_0x4f2d81),this['applyBattleSystemATBUserEffect'](_0x4f2d81);},Game_Action[_0x4d8ff4('0x64')]['applyBattleSystemATBUserEffect']=function(_0x2a7a97){const _0x223df3=_0x4d8ff4;if(!SceneManager[_0x223df3('0x32')]())return;if(!BattleManager[_0x223df3('0x22')]())return;if(this[_0x223df3('0x1de')]())this[_0x223df3('0x2a')](_0x2a7a97);},Game_Action[_0x4d8ff4('0x64')]['applyItemBattleSystemATBUserEffect']=function(_0xdfe74a){const _0x4ffa92=_0x4d8ff4,_0x11af60=this['item']()[_0x4ffa92('0x58')];if(_0xdfe74a[_0x4ffa92('0x37')]()){const _0x2c69de=VisuMZ[_0x4ffa92('0x6a')][_0x4ffa92('0x78')](this['item'](),_0x4ffa92('0xcd'));if(VisuMZ[_0x4ffa92('0x6a')]['JS'][_0x2c69de]){const _0x1e1462=VisuMZ[_0x4ffa92('0x6a')]['JS'][_0x2c69de][_0x4ffa92('0x4d')](this,this[_0x4ffa92('0x188')](),_0xdfe74a);_0xdfe74a[_0x4ffa92('0x44')](_0x1e1462);}_0x11af60[_0x4ffa92('0x195')](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0xdfe74a[_0x4ffa92('0x44')](Number(RegExp['$1'])*0.01),_0x11af60[_0x4ffa92('0x195')](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0xdfe74a['changeAtbChargeTime'](Number(RegExp['$1'])*0.01);}else{if(_0xdfe74a['isAtbCastingState']()){const _0x449889=VisuMZ[_0x4ffa92('0x6a')][_0x4ffa92('0x78')](this['item'](),_0x4ffa92('0x102'));if(VisuMZ['BattleSystemATB']['JS'][_0x449889]){if(_0x4ffa92('0xb1')===_0x4ffa92('0xb1')){const _0x26da9b=VisuMZ[_0x4ffa92('0x6a')]['JS'][_0x449889][_0x4ffa92('0x4d')](this,this[_0x4ffa92('0x188')](),_0xdfe74a);_0xdfe74a[_0x4ffa92('0x164')](_0x26da9b);}else{function _0x3b70cf(){const _0x3751a9=_0x4ffa92;this[_0x3751a9('0x1ab')](_0x5983fd);}}}if(_0x11af60['match'](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x4ffa92('0xa1')!==_0x4ffa92('0xd5'))_0xdfe74a[_0x4ffa92('0x164')](Number(RegExp['$1'])*0.01);else{function _0x4c6bbc(){const _0x15cba2=_0x4ffa92,_0x16c6dd=_0x146e33['maxBattleMembers']();for(let _0x244114=0x0;_0x244114<_0x16c6dd;_0x244114++){this[_0x15cba2('0x1b7')](_0x244114,_0x39039f);}}}}_0x11af60[_0x4ffa92('0x195')](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0xdfe74a[_0x4ffa92('0xcf')](Number(RegExp['$1'])*0.01);if(_0x11af60[_0x4ffa92('0x195')](/<(?:ATB|TPB) INTERRUPT>/i)){if('NHHjk'!==_0x4ffa92('0x12a'))_0xdfe74a[_0x4ffa92('0x174')]();else{function _0x58fccc(){const _0x72ebe5=_0x4ffa92;return _0x5afcb1[_0x72ebe5('0x8b')]()[this[_0x72ebe5('0xcc')]];}}}}}},VisuMZ['BattleSystemATB'][_0x4d8ff4('0x1d8')]=Game_Action['prototype']['applyGlobal'],Game_Action[_0x4d8ff4('0x64')][_0x4d8ff4('0x1b5')]=function(){const _0x2c318c=_0x4d8ff4;VisuMZ[_0x2c318c('0x6a')][_0x2c318c('0x1d8')][_0x2c318c('0x4d')](this),this[_0x2c318c('0x6f')]();},Game_Action[_0x4d8ff4('0x64')][_0x4d8ff4('0x6f')]=function(){const _0x13aa73=_0x4d8ff4;if(!this[_0x13aa73('0x1de')]())return;if(!BattleManager['isATB']())return;const _0x3554bd=this['item']()[_0x13aa73('0x58')];let _0x5ed571=0x0;this[_0x13aa73('0xc1')]&&(_0x5ed571=this[_0x13aa73('0x188')]()[_0x13aa73('0x14b')]);const _0x4cd4d2=VisuMZ[_0x13aa73('0x6a')][_0x13aa73('0x78')](this[_0x13aa73('0x1de')](),_0x13aa73('0x165'));VisuMZ[_0x13aa73('0x6a')]['JS'][_0x4cd4d2]&&(_0x5ed571+=VisuMZ[_0x13aa73('0x6a')]['JS'][_0x4cd4d2][_0x13aa73('0x4d')](this,this['subject'](),this[_0x13aa73('0x188')]()));let _0x4aa30d=this[_0x13aa73('0x1de')]()[_0x13aa73('0x1e5')]>0x0?this[_0x13aa73('0x1de')]()['speed']:0x0;if(this[_0x13aa73('0x1bc')]())_0x4aa30d+=this[_0x13aa73('0x188')]()[_0x13aa73('0x7a')]();_0x5ed571+=(_0x4aa30d/0xfa0)[_0x13aa73('0xf5')](0x0,0x1);this[_0x13aa73('0x1de')]()[_0x13aa73('0x58')][_0x13aa73('0x195')](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x5ed571+=Number(RegExp['$1'])*0.01);const _0x135a21=this['subject']()['traitObjects']()['concat'](this[_0x13aa73('0x188')]()[_0x13aa73('0x82')]()),_0x53ab60=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x31e8c2=_0x135a21[_0x13aa73('0xf9')](_0x227858=>_0x227858&&_0x227858[_0x13aa73('0x58')][_0x13aa73('0x195')](_0x53ab60)?Number(RegExp['$1'])*0.01:0x0);_0x5ed571=_0x31e8c2[_0x13aa73('0x168')]((_0x3f035f,_0x58061d)=>_0x3f035f+_0x58061d,_0x5ed571),this[_0x13aa73('0x188')]()[_0x13aa73('0x55')](_0x5ed571);},Game_BattlerBase['prototype'][_0x4d8ff4('0x44')]=function(_0x6f0e77){const _0x1cb454=_0x4d8ff4;this[_0x1cb454('0x14b')]=_0x6f0e77[_0x1cb454('0xf5')](0x0,0x1);},Game_BattlerBase[_0x4d8ff4('0x64')][_0x4d8ff4('0x91')]=function(_0x1132c5){const _0x627c33=_0x4d8ff4;this[_0x627c33('0x44')](this[_0x627c33('0x14b')]+_0x1132c5);},Game_BattlerBase[_0x4d8ff4('0x64')][_0x4d8ff4('0x164')]=function(_0xd6c8fb){const _0x171294=_0x4d8ff4,_0x2a8e3a=this[_0x171294('0x2d')]();this[_0x171294('0x17a')]=(_0x2a8e3a*_0xd6c8fb)['clamp'](0x0,_0x2a8e3a);},Game_BattlerBase[_0x4d8ff4('0x64')][_0x4d8ff4('0xcf')]=function(_0x3eb1d4){const _0x29b73c=_0x4d8ff4,_0x5608d0=this[_0x29b73c('0x2d')](),_0x370da1=_0x5608d0*_0x3eb1d4;this['_tpbCastTime']=(this['_tpbCastTime']+_0x370da1)[_0x29b73c('0xf5')](0x0,_0x5608d0);},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x96')]=Game_Battler['prototype'][_0x4d8ff4('0x116')],Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x116')]=function(_0x2ce144){const _0x15ddcf=_0x4d8ff4;if(BattleManager['isATB']()){if('inAUh'===_0x15ddcf('0x13a')){function _0x110c1f(){const _0x198229=_0x15ddcf;return this[_0x198229('0x26')]()?this[_0x198229('0x17a')]/this[_0x198229('0x2d')]():0x0;}}else this['initTpbChargeTimeATB'](_0x2ce144);}else VisuMZ['BattleSystemATB'][_0x15ddcf('0x96')][_0x15ddcf('0x4d')](this,_0x2ce144);},Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x1ab')]=function(_0x452dba){const _0x3c09fe=_0x4d8ff4,_0x41c59b=VisuMZ[_0x3c09fe('0x6a')][_0x3c09fe('0x5f')][_0x3c09fe('0x111')];let _0x1c94ae=this['tpbRelativeSpeed']()*eval(_0x41c59b[_0x3c09fe('0x41')]);const _0x4c1211=this['traitObjects']()[_0x3c09fe('0xb8')](this['skills']()),_0x2c5eb9=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x5b7e65=_0x4c1211['map'](_0x560d7f=>_0x560d7f&&_0x560d7f[_0x3c09fe('0x58')]['match'](_0x2c5eb9)?Number(RegExp['$1'])*0.01:0x0);_0x1c94ae=_0x5b7e65[_0x3c09fe('0x168')]((_0x3e0813,_0x5da5a1)=>_0x3e0813+_0x5da5a1,_0x1c94ae),this[_0x3c09fe('0x124')]='charging',this[_0x3c09fe('0x14b')]=(_0x452dba?0x1:_0x1c94ae)['clamp'](0x0,0x1);if(this[_0x3c09fe('0x57')]()){if('fdpdu'==='pDwuj'){function _0xa9dd06(){const _0x53102b=_0x3c09fe;_0x38748c=_0x1a709e-0x1,_0xbee51b=_0x465741-0x3-_0x5c003b,_0x185c0c['gradientFillRect'](0x2+_0x1574d9,0x1,_0x57676c,_0x2408a6-0x2,_0x43697d,_0x5d0a63,![]),_0x38d2e3[_0x53102b('0x11f')](0x1,0x1,_0x556dd5,_0x58596d-0x2,_0x83782b,_0x4768ff,![]);}}else this['_tpbChargeTime']=0x0;}},Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x37')]=function(){const _0x214a0a=_0x4d8ff4;return this[_0x214a0a('0x124')]===_0x214a0a('0x1a7');},Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x26')]=function(){const _0x2d46c4=_0x4d8ff4;return this[_0x2d46c4('0x124')]===_0x2d46c4('0x35')&&this['currentAction']()&&this[_0x2d46c4('0x99')]()[_0x2d46c4('0x1de')]()&&this[_0x2d46c4('0x99')]()[_0x2d46c4('0x1de')]()[_0x2d46c4('0x1e5')]<0x0;},Game_BattlerBase[_0x4d8ff4('0x64')][_0x4d8ff4('0x11b')]=function(){const _0x35fb63=_0x4d8ff4;return this[_0x35fb63('0x26')]()?this[_0x35fb63('0x17a')]/this[_0x35fb63('0x2d')]():0x0;},Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0xb9')]=function(){const _0x2c7ce2=_0x4d8ff4;return!this[_0x2c7ce2('0xef')]();},Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x55')]=function(_0x471dc7){const _0x130d08=_0x4d8ff4;this[_0x130d08('0x53')]=_0x471dc7;},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0xdc')]=Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x184')],Game_Battler[_0x4d8ff4('0x64')]['clearTpbChargeTime']=function(){const _0x4ef685=_0x4d8ff4;if(this[_0x4ef685('0x152')])return;VisuMZ['BattleSystemATB'][_0x4ef685('0xdc')][_0x4ef685('0x4d')](this),this[_0x4ef685('0x14b')]+=this[_0x4ef685('0x53')]||0x0;},Game_Battler[_0x4d8ff4('0x64')]['atbInterrupt']=function(){const _0x1dde05=_0x4d8ff4;if(!this['isAtbCastingState']())return;if(!this[_0x1dde05('0x99')]())return;if(!this['currentAction']()['item']())return;if(this[_0x1dde05('0x99')]()[_0x1dde05('0x1de')]()[_0x1dde05('0x58')][_0x1dde05('0x195')](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x1dde05('0x6d')](),this[_0x1dde05('0x184')](),this[_0x1dde05('0x17a')]=0x0,this[_0x1dde05('0x6e')]();},Game_Battler['prototype'][_0x4d8ff4('0x6e')]=function(){const _0x3a7585=_0x4d8ff4,_0x41a87b=VisuMZ[_0x3a7585('0x6a')][_0x3a7585('0x5f')]['Interrupt'];if(Imported[_0x3a7585('0x1b3')]){const _0x37f3b9=_0x41a87b['InterruptAnimationID'],_0x370dfc=_0x41a87b[_0x3a7585('0x1e7')],_0x1c7920=_0x41a87b[_0x3a7585('0x182')];$gameTemp[_0x3a7585('0x17c')]([this],_0x37f3b9,_0x370dfc,_0x1c7920);}if(this[_0x3a7585('0xe9')]()&&_0x41a87b['InterruptText'][_0x3a7585('0x2')]>0x0){if('eSbpQ'!==_0x3a7585('0x16b')){function _0x2e0c88(){const _0x34f35b=_0x3a7585;return _0x57dffc[_0x34f35b('0x22')]()?_0x43d449[_0x34f35b('0x6a')][_0x34f35b('0x5f')][_0x34f35b('0x111')]['BattlerRelativeSpeedJS']['call'](this,this):_0x5023a3['BattleSystemATB'][_0x34f35b('0x19e')][_0x34f35b('0x4d')](this);}}else{const _0x53b37b=_0x41a87b[_0x3a7585('0x11d')],_0x4f714d={'textColor':ColorManager['getColor'](_0x41a87b[_0x3a7585('0x17f')]),'flashColor':_0x41a87b[_0x3a7585('0x13b')],'flashDuration':_0x41a87b[_0x3a7585('0xc')]};this[_0x3a7585('0x60')](_0x53b37b,_0x4f714d);}}},VisuMZ['BattleSystemATB'][_0x4d8ff4('0xe3')]=Game_Battler['prototype'][_0x4d8ff4('0x5c')],Game_Battler['prototype'][_0x4d8ff4('0x5c')]=function(){const _0x24fc5e=_0x4d8ff4;if(!VisuMZ[_0x24fc5e('0x6a')][_0x24fc5e('0x5f')][_0x24fc5e('0x111')][_0x24fc5e('0x1d1')]){if('Aabkp'===_0x24fc5e('0x120')){function _0x1ee8ed(){const _0x2f7fe5=_0x24fc5e,_0x25d57c=_0x2c182b[_0x2f7fe5('0x5f')];if(_0x25d57c[_0x2f7fe5('0xb6')]!==_0x2f7fe5('0x14e'))return;if(!_0x25d57c[_0x2f7fe5('0x68')])return;const _0xb5c0b6=_0x1fc270[_0x2f7fe5('0x1c8')][_0x2f7fe5('0x1e3')];if(!_0xb5c0b6)return;_0xb5c0b6[_0x2f7fe5('0x1c9')]?(this['x']=this[_0x2f7fe5('0x62')]+(_0x25d57c[_0x2f7fe5('0x1f')]||0x0),this['y']=this[_0x2f7fe5('0x127')]+(_0x25d57c[_0x2f7fe5('0xf2')]||0x0)):(this['x']=this[_0x2f7fe5('0x62')],this['y']=this[_0x2f7fe5('0x127')]);const _0x191a8b=_0x1b9c40[_0x2f7fe5('0x1c8')][_0x2f7fe5('0x98')];this['x']+=_0x191a8b['x'],this['y']+=_0x191a8b['y'];}}else this[_0x24fc5e('0x152')]=BattleManager[_0x24fc5e('0x22')]();}VisuMZ[_0x24fc5e('0x6a')]['Game_Battler_onRestrict'][_0x24fc5e('0x4d')](this),this['_onRestrictBypassAtbReset']=undefined;},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x1cc')]=Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x1b8')],Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x1b8')]=function(){const _0x3059d5=_0x4d8ff4;if(BattleManager['isATB']()){if('jUdAD'===_0x3059d5('0x9d')){function _0x4bb0d5(){const _0x3965e6=_0x3059d5;return _0x1c5f75[_0x3965e6('0xcb')](this[_0x3965e6('0x12')][_0x3965e6('0x2d')](),0x1);}}else this['applyATBPenalty']();}else VisuMZ[_0x3059d5('0x6a')][_0x3059d5('0x1cc')][_0x3059d5('0x4d')](this);},Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x107')]=function(){const _0x594896=_0x4d8ff4;this['_tpbState']='charging',this[_0x594896('0x14b')]+=VisuMZ['BattleSystemATB'][_0x594896('0x5f')]['Mechanics'][_0x594896('0x1a')]||0x0;},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x19b')]=Game_Battler['prototype'][_0x4d8ff4('0x6')],Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x6')]=function(){const _0x2ac524=_0x4d8ff4;return BattleManager[_0x2ac524('0x22')]()?VisuMZ[_0x2ac524('0x6a')]['Settings'][_0x2ac524('0x111')]['TpbSpeedCalcJS'][_0x2ac524('0x4d')](this,this):VisuMZ[_0x2ac524('0x6a')][_0x2ac524('0x19b')][_0x2ac524('0x4d')](this);},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0xbf')]=Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0xe6')],Game_Battler[_0x4d8ff4('0x64')]['tpbBaseSpeed']=function(){const _0x27fe5a=_0x4d8ff4;return BattleManager['isATB']()?VisuMZ[_0x27fe5a('0x6a')][_0x27fe5a('0x5f')][_0x27fe5a('0x111')][_0x27fe5a('0x166')]['call'](this,this):VisuMZ[_0x27fe5a('0x6a')][_0x27fe5a('0xbf')][_0x27fe5a('0x4d')](this);},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x19e')]=Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x17')],Game_Battler['prototype'][_0x4d8ff4('0x17')]=function(){const _0x1b35a2=_0x4d8ff4;if(BattleManager[_0x1b35a2('0x22')]()){if('CxpOt'!=='kBJEd')return VisuMZ[_0x1b35a2('0x6a')][_0x1b35a2('0x5f')]['Mechanics'][_0x1b35a2('0x157')]['call'](this,this);else{function _0x42f439(){const _0x2d082a=_0x1b35a2;_0x1c41c2+=this[_0x2d082a('0x12')][_0x2d082a('0x16d')]();}}}else{if(_0x1b35a2('0x20')!==_0x1b35a2('0x20')){function _0x47b26d(){_0x4db8e9=_0x5ec161*_0x1b8905;}}else return VisuMZ[_0x1b35a2('0x6a')]['Game_Battler_tpbRelativeSpeed'][_0x1b35a2('0x4d')](this);}},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x173')]=Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x1af')],Game_Battler[_0x4d8ff4('0x64')]['tpbAcceleration']=function(){const _0x584d6b=_0x4d8ff4;return BattleManager['isATB']()?this[_0x584d6b('0x40')]():VisuMZ['BattleSystemATB'][_0x584d6b('0x173')][_0x584d6b('0x4d')](this);},Game_Battler[_0x4d8ff4('0x64')]['atbAcceleration']=function(){const _0xe24d42=_0x4d8ff4;let _0x3dac3e=VisuMZ['BattleSystemATB'][_0xe24d42('0x5f')][_0xe24d42('0x111')][_0xe24d42('0xf0')]['call'](this,this);if(ConfigManager&&ConfigManager[_0xe24d42('0x17d')]!==undefined){const _0x187fb7=ConfigManager[_0xe24d42('0x17d')]-0x3;if(_0x187fb7>0x0){if('LsZVg'!==_0xe24d42('0x6b'))return _0x3dac3e*(_0x187fb7*0x2);else{function _0x2deb96(){const _0x1f32ff=_0xe24d42;for(let _0xcd6733=0x1;_0xcd6733<=0x2;_0xcd6733++){const _0x8ffc53=_0x41f426+_0xcd6733;this['_atbColors'][_0x8ffc53]=this[_0x1f32ff('0x19c')](_0x10f590[_0x8ffc53]);}}}}else{if(_0x187fb7<0x0)return _0x3dac3e*(0x1/(_0x187fb7*-0x2));}}return _0x3dac3e;},VisuMZ['BattleSystemATB']['Game_Battler_tpbRequiredCastTime']=Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x2d')],Game_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x2d')]=function(){const _0x38ad4d=_0x4d8ff4;if(BattleManager[_0x38ad4d('0x22')]())return VisuMZ[_0x38ad4d('0x6a')][_0x38ad4d('0x5f')][_0x38ad4d('0x111')][_0x38ad4d('0x135')]['call'](this,this);else{if('LhTDU'!=='geKBk')return VisuMZ[_0x38ad4d('0x6a')][_0x38ad4d('0x11')][_0x38ad4d('0x4d')](this);else{function _0x419439(){const _0xb8490f=_0x38ad4d;if(this['y']>_0x3a9276)this['y']=_0xe656a8['max'](_0x4e1d31,this['y']-_0x548b2d);if(this['y']<_0x24a5d)this['y']=_0x355a42[_0xb8490f('0x13d')](_0x49adfc,this['y']+_0x55c92a);}}}},VisuMZ[_0x4d8ff4('0x6a')]['Scene_Options_maxCommands']=Scene_Options[_0x4d8ff4('0x64')][_0x4d8ff4('0x7d')],Scene_Options[_0x4d8ff4('0x64')][_0x4d8ff4('0x7d')]=function(){const _0x8eb593=_0x4d8ff4;let _0x775fe4=VisuMZ[_0x8eb593('0x6a')][_0x8eb593('0xea')][_0x8eb593('0x4d')](this);const _0x4864ad=VisuMZ[_0x8eb593('0x6a')][_0x8eb593('0x5f')];if(_0x4864ad[_0x8eb593('0x138')][_0x8eb593('0xd7')]&&_0x4864ad[_0x8eb593('0x138')][_0x8eb593('0xaa')]&&BattleManager['isATB']())_0x775fe4++;return _0x775fe4;},Sprite_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x194')]=function(){const _0x1657fa=_0x4d8ff4;if(!BattleManager[_0x1657fa('0x22')]())return;if(!ConfigManager[_0x1657fa('0x109')])return;const _0x3414bb=VisuMZ[_0x1657fa('0x6a')][_0x1657fa('0x5f')]['Gauge'],_0x360777=new Sprite_Gauge();_0x360777['anchor']['x']=_0x3414bb[_0x1657fa('0xd2')],_0x360777[_0x1657fa('0x8f')]['y']=_0x3414bb['AnchorY'],_0x360777[_0x1657fa('0xd9')]['x']=_0x360777[_0x1657fa('0xd9')]['y']=_0x3414bb[_0x1657fa('0x85')],this[_0x1657fa('0x1c6')]=_0x360777,this[_0x1657fa('0x142')](this[_0x1657fa('0x1c6')]);},VisuMZ['BattleSystemATB'][_0x4d8ff4('0xdb')]=Sprite_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x155')],Sprite_Battler[_0x4d8ff4('0x64')]['setBattler']=function(_0x1838f0){const _0x5ec449=_0x4d8ff4;VisuMZ[_0x5ec449('0x6a')][_0x5ec449('0xdb')]['call'](this,_0x1838f0),this[_0x5ec449('0x9e')](_0x1838f0);},Sprite_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x9e')]=function(_0x3cdff0){const _0x445b17=_0x4d8ff4;if(!_0x3cdff0)return;if(!this[_0x445b17('0x1c6')])return;if(_0x3cdff0[_0x445b17('0x117')]()){}else{if(_0x3cdff0['isEnemy']()){if('qlFSu'!=='xzwMT'){if(this[_0x445b17('0xf1')]===Sprite_Enemy&&_0x3cdff0['hasSvBattler']())return;if(this[_0x445b17('0xf1')]===Sprite_SvEnemy&&!_0x3cdff0[_0x445b17('0x17b')]())return;}else{function _0x405fab(){const _0x499774=_0x445b17,_0x371a45=_0x494a71[_0x499774('0x5f')],_0xdbc993=this[_0x499774('0xe9')](),_0x11f8a7=this[_0x499774('0x12b')](),_0x54792f=this[_0x499774('0xd8')][_0x499774('0x12f')]['width'],_0x4c1124=this[_0x499774('0xd8')][_0x499774('0x12f')][_0x499774('0x1b')],_0x16ee5d=_0x371a45[_0x499774('0x169')][_0x499774('0xf5')](0x0,0x1),_0x2c8b5e=_0x371a45[_0x499774('0x43')];let _0x2c803c=_0xdbc993[_0x499774('0x1c')]()*_0x16ee5d;_0x2c803c+=(0x1-_0x16ee5d)*_0xdbc993['getAtbCastTimeRate']();if(_0xdbc993===_0x26548c['_subject'])_0x2c803c=0x1;if(!_0x2c8b5e)_0x2c803c=0x1-_0x2c803c;let _0x1f7e1f=0x0;if(_0x11f8a7)_0x1f7e1f=_0x2c803c*_0x54792f;else!_0x11f8a7&&(_0x1f7e1f=_0x2c803c*_0x4c1124);return _0x1bef81[_0x499774('0x73')](_0x1f7e1f);}}}}this['_atbGaugeSprite'][_0x445b17('0x101')](_0x3cdff0,'time');},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0xc0')]=Sprite_Battler['prototype'][_0x4d8ff4('0xc4')],Sprite_Battler[_0x4d8ff4('0x64')]['updateMain']=function(){const _0x5e686e=_0x4d8ff4;VisuMZ[_0x5e686e('0x6a')][_0x5e686e('0xc0')][_0x5e686e('0x4d')](this),this[_0x5e686e('0x175')]();},Sprite_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x175')]=function(){const _0x247aae=_0x4d8ff4;if(!this['_battler'])return;if(!this['_atbGaugeSprite'])return;const _0x2e6de1=VisuMZ[_0x247aae('0x6a')][_0x247aae('0x5f')][_0x247aae('0x80')],_0x307625=this[_0x247aae('0x1c6')];let _0x3f4600=_0x2e6de1['OffsetX'];if(this[_0x247aae('0x12')][_0x247aae('0x16d')]){if(_0x247aae('0x197')===_0x247aae('0x1d0')){function _0x4adfd2(){const _0x4558ee=_0x247aae;_0x2771f3[_0x4558ee('0x64')][_0x4558ee('0x45')][_0x4558ee('0x4d')](this),this[_0x4558ee('0x10c')](),this['updatePositionOffset'](),this[_0x4558ee('0xd1')](),this[_0x4558ee('0x9')](),this[_0x4558ee('0x1e0')](),this['updateLetter'](),this[_0x4558ee('0x83')]();}}else _0x3f4600+=this['_battler'][_0x247aae('0x16d')]();}let _0x58501c=_0x2e6de1[_0x247aae('0x18d')];this[_0x247aae('0x12')][_0x247aae('0x1d5')]&&(_0x58501c+=this[_0x247aae('0x12')]['battleUIOffsetY']());_0x307625['x']=_0x3f4600,_0x307625['y']=-this[_0x247aae('0x1b')]+_0x58501c;if(this[_0x247aae('0x12')][_0x247aae('0xfa')]()){if('rSLKn'!==_0x247aae('0x180')){function _0x427a9d(){const _0x5b7a0c=_0x247aae;if(!this[_0x5b7a0c('0x1de')]())return;if(!_0x35e727[_0x5b7a0c('0x22')]())return;const _0x452a9c=this[_0x5b7a0c('0x1de')]()['note'];let _0x4427d3=0x0;this[_0x5b7a0c('0xc1')]&&(_0x4427d3=this['subject']()[_0x5b7a0c('0x14b')]);const _0x332475=_0x11a3bc[_0x5b7a0c('0x6a')][_0x5b7a0c('0x78')](this[_0x5b7a0c('0x1de')](),_0x5b7a0c('0x165'));_0x22bd76[_0x5b7a0c('0x6a')]['JS'][_0x332475]&&(_0x4427d3+=_0x566e88[_0x5b7a0c('0x6a')]['JS'][_0x332475][_0x5b7a0c('0x4d')](this,this[_0x5b7a0c('0x188')](),this[_0x5b7a0c('0x188')]()));let _0xbb5461=this['item']()[_0x5b7a0c('0x1e5')]>0x0?this['item']()[_0x5b7a0c('0x1e5')]:0x0;if(this[_0x5b7a0c('0x1bc')]())_0xbb5461+=this[_0x5b7a0c('0x188')]()[_0x5b7a0c('0x7a')]();_0x4427d3+=(_0xbb5461/0xfa0)[_0x5b7a0c('0xf5')](0x0,0x1);this[_0x5b7a0c('0x1de')]()[_0x5b7a0c('0x58')][_0x5b7a0c('0x195')](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x4427d3+=_0x399d4a(_0x228fce['$1'])*0.01);const _0x124155=this[_0x5b7a0c('0x188')]()[_0x5b7a0c('0x1ad')]()[_0x5b7a0c('0xb8')](this[_0x5b7a0c('0x188')]()[_0x5b7a0c('0x82')]()),_0x4405ae=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x476616=_0x124155[_0x5b7a0c('0xf9')](_0x242efc=>_0x242efc&&_0x242efc[_0x5b7a0c('0x58')][_0x5b7a0c('0x195')](_0x4405ae)?_0x41acbb(_0x1ca490['$1'])*0.01:0x0);_0x4427d3=_0x476616[_0x5b7a0c('0x168')]((_0x1f11f1,_0x1302b0)=>_0x1f11f1+_0x1302b0,_0x4427d3),this[_0x5b7a0c('0x188')]()[_0x5b7a0c('0x55')](_0x4427d3);}}else this[_0x247aae('0x12')]['enemy']()['note'][_0x247aae('0x195')](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x307625[_0x247aae('0x1c9')]=![]);}if(this[_0x247aae('0x5e')]()){if(_0x247aae('0x11e')===_0x247aae('0xe')){function _0x166c3c(){const _0x54bcfe=_0x247aae;_0x2aeabf+=this[_0x54bcfe('0x12')][_0x54bcfe('0x1d5')]();}}else _0x307625['y']+=_0x307625[_0x247aae('0xa')]()*_0x2e6de1[_0x247aae('0x85')]-0x1;}this[_0x247aae('0xd9')]['x']<0x0&&(_0x307625[_0x247aae('0xd9')]['x']=-Math['abs'](_0x307625[_0x247aae('0xd9')]['x']));},Sprite_Battler[_0x4d8ff4('0x64')][_0x4d8ff4('0x5e')]=function(){const _0x418740=_0x4d8ff4;if(!Imported['VisuMZ_2_AggroControlSystem'])return![];if(this[_0x418740('0x12')]&&this[_0x418740('0x12')]['isEnemy']())return![];const _0x35d159=VisuMZ[_0x418740('0xc5')]['Settings'][_0x418740('0x16f')];if(!_0x35d159[_0x418740('0x1d6')])return![];if(!ConfigManager[_0x418740('0x12c')])return![];const _0x5ea96d=VisuMZ[_0x418740('0x6a')][_0x418740('0x5f')]['Gauge'];return _0x35d159[_0x418740('0x85')]===_0x5ea96d[_0x418740('0x85')]&&_0x35d159['AnchorX']===_0x5ea96d[_0x418740('0xd2')]&&_0x35d159['AnchorY']===_0x5ea96d[_0x418740('0x1a4')]&&_0x35d159[_0x418740('0x1b1')]===_0x5ea96d['OffsetX']&&_0x35d159[_0x418740('0x18d')]===_0x5ea96d[_0x418740('0x18d')]&&!![];},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0xc8')]=Sprite_Actor[_0x4d8ff4('0x64')][_0x4d8ff4('0xd3')],Sprite_Actor[_0x4d8ff4('0x64')][_0x4d8ff4('0xd3')]=function(){const _0x2ca151=_0x4d8ff4;VisuMZ[_0x2ca151('0x6a')][_0x2ca151('0xc8')][_0x2ca151('0x4d')](this),VisuMZ[_0x2ca151('0x6a')]['Settings']['Gauge'][_0x2ca151('0x4f')]&&this[_0x2ca151('0x194')]();},VisuMZ['BattleSystemATB'][_0x4d8ff4('0x1d')]=Sprite_Enemy[_0x4d8ff4('0x64')][_0x4d8ff4('0x153')],Sprite_Enemy[_0x4d8ff4('0x64')][_0x4d8ff4('0x153')]=function(){const _0x3061df=_0x4d8ff4;VisuMZ[_0x3061df('0x6a')][_0x3061df('0x5f')][_0x3061df('0x80')][_0x3061df('0x4c')]&&this[_0x3061df('0x194')](),VisuMZ['BattleSystemATB']['Sprite_Enemy_createStateIconSprite'][_0x3061df('0x4d')](this);},VisuMZ['BattleSystemATB']['Sprite_Gauge_gaugeColor1']=Sprite_Gauge[_0x4d8ff4('0x64')][_0x4d8ff4('0x170')],Sprite_Gauge[_0x4d8ff4('0x64')]['gaugeColor1']=function(){const _0x3bd3ef=_0x4d8ff4;if(this[_0x3bd3ef('0x1e')]===_0x3bd3ef('0x10b'))return this[_0x3bd3ef('0xfc')](0x1);return VisuMZ['BattleSystemATB']['Sprite_Gauge_gaugeColor1'][_0x3bd3ef('0x4d')](this);},VisuMZ[_0x4d8ff4('0x6a')]['Sprite_Gauge_gaugeColor2']=Sprite_Gauge[_0x4d8ff4('0x64')][_0x4d8ff4('0x3b')],Sprite_Gauge[_0x4d8ff4('0x64')][_0x4d8ff4('0x3b')]=function(){const _0x3c4033=_0x4d8ff4;if(this[_0x3c4033('0x1e')]===_0x3c4033('0x10b'))return this[_0x3c4033('0xfc')](0x2);return VisuMZ[_0x3c4033('0x6a')]['Sprite_Gauge_gaugeColor2'][_0x3c4033('0x4d')](this);},Sprite_Gauge['prototype'][_0x4d8ff4('0xfc')]=function(_0x59883e){const _0x2335ed=_0x4d8ff4;if(!this[_0x2335ed('0x12')])return ColorManager[_0x2335ed('0x3')](_0x2335ed('0x148')[_0x2335ed('0x16c')](_0x59883e));if(this['_battler'][_0x2335ed('0xb9')]())return ColorManager[_0x2335ed('0x3')](_0x2335ed('0xa2')['format'](_0x59883e));if(this[_0x2335ed('0x12')][_0x2335ed('0x26')]())return ColorManager['atbColor'](_0x2335ed('0x27')[_0x2335ed('0x16c')](_0x59883e));if(this['gaugeRate']()>=0x1)return ColorManager['atbColor']('full%1'[_0x2335ed('0x16c')](_0x59883e));const _0x25e9bd=VisuMZ[_0x2335ed('0x6a')][_0x2335ed('0x5f')][_0x2335ed('0x80')],_0x69996b=this[_0x2335ed('0x12')][_0x2335ed('0x59')](0x6)*this[_0x2335ed('0x12')]['paramBuffRate'](0x6);if(_0x69996b<=_0x25e9bd[_0x2335ed('0xe0')])return ColorManager['atbColor'](_0x2335ed('0x42')[_0x2335ed('0x16c')](_0x59883e));if(_0x69996b>=_0x25e9bd[_0x2335ed('0x178')])return ColorManager[_0x2335ed('0x3')]('fast%1'['format'](_0x59883e));return ColorManager['atbColor'](_0x2335ed('0x148')['format'](_0x59883e));},VisuMZ['BattleSystemATB']['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype'][_0x4d8ff4('0x1')],Sprite_Gauge[_0x4d8ff4('0x64')][_0x4d8ff4('0x1')]=function(){const _0xefa818=_0x4d8ff4;if(this[_0xefa818('0x12')]&&this[_0xefa818('0x1e')]===_0xefa818('0x10b'))return this[_0xefa818('0x87')]();return VisuMZ['BattleSystemATB'][_0xefa818('0x150')][_0xefa818('0x4d')](this);},Sprite_Gauge['prototype'][_0x4d8ff4('0x87')]=function(){const _0x55f80d=_0x4d8ff4;return this[_0x55f80d('0x12')][_0x55f80d('0x26')]()?Math[_0x55f80d('0xcb')](this[_0x55f80d('0x12')][_0x55f80d('0x17a')],0x0):VisuMZ['BattleSystemATB']['Sprite_Gauge_currentValue'][_0x55f80d('0x4d')](this);},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x1b2')]=Sprite_Gauge[_0x4d8ff4('0x64')][_0x4d8ff4('0x5a')],Sprite_Gauge[_0x4d8ff4('0x64')][_0x4d8ff4('0x5a')]=function(){const _0x4170e6=_0x4d8ff4;if(this[_0x4170e6('0x12')]&&this[_0x4170e6('0x1e')]===_0x4170e6('0x10b'))return this[_0x4170e6('0x74')]();return VisuMZ[_0x4170e6('0x6a')][_0x4170e6('0x1b2')]['call'](this);},Sprite_Gauge[_0x4d8ff4('0x64')]['atbCurrentMaxValue']=function(){const _0x38433a=_0x4d8ff4;return this['_battler'][_0x38433a('0x26')]()?Math[_0x38433a('0xcb')](this['_battler'][_0x38433a('0x2d')](),0x1):VisuMZ[_0x38433a('0x6a')][_0x38433a('0x1b2')][_0x38433a('0x4d')](this);},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x119')]=Window_Help[_0x4d8ff4('0x64')][_0x4d8ff4('0x1ae')],Window_Help[_0x4d8ff4('0x64')][_0x4d8ff4('0x1ae')]=function(_0xa5f97b){const _0x2e4149=_0x4d8ff4;BattleManager[_0x2e4149('0x22')]()&&_0xa5f97b&&_0xa5f97b[_0x2e4149('0x58')]&&_0xa5f97b[_0x2e4149('0x58')]['match'](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x2e4149('0x2f')](String(RegExp['$1'])):VisuMZ[_0x2e4149('0x6a')][_0x2e4149('0x119')][_0x2e4149('0x4d')](this,_0xa5f97b);},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0xc7')]=Window_StatusBase[_0x4d8ff4('0x64')][_0x4d8ff4('0x1a0')],Window_StatusBase[_0x4d8ff4('0x64')][_0x4d8ff4('0x1a0')]=function(_0x22ad1d,_0x30a55a,_0x2bbb2e,_0x302c1a){const _0x1791f0=_0x4d8ff4;if(!this['showVisualAtbGauge'](_0x30a55a))return;VisuMZ[_0x1791f0('0x6a')]['Window_StatusBase_placeGauge']['call'](this,_0x22ad1d,_0x30a55a,_0x2bbb2e,_0x302c1a);},Window_StatusBase[_0x4d8ff4('0x64')][_0x4d8ff4('0xed')]=function(_0xbd1b7e){const _0x3ba971=_0x4d8ff4;if(_0xbd1b7e!==_0x3ba971('0x10b'))return!![];if(this[_0x3ba971('0xf1')]!==Window_BattleStatus)return![];if(!BattleManager['isATB']())return![];if(!ConfigManager[_0x3ba971('0x109')])return![];return VisuMZ[_0x3ba971('0x6a')][_0x3ba971('0x5f')][_0x3ba971('0x80')][_0x3ba971('0xe5')];},VisuMZ['BattleSystemATB'][_0x4d8ff4('0x6c')]=Window_Options[_0x4d8ff4('0x64')]['addGeneralOptions'],Window_Options[_0x4d8ff4('0x64')]['addGeneralOptions']=function(){const _0x3ef8b4=_0x4d8ff4;VisuMZ[_0x3ef8b4('0x6a')]['Window_Options_addGeneralOptions'][_0x3ef8b4('0x4d')](this),this[_0x3ef8b4('0x179')]();},Window_Options[_0x4d8ff4('0x64')]['addBattleSystemATBCommands']=function(){const _0x5416ef=_0x4d8ff4;if(!BattleManager['isATB']())return;VisuMZ['BattleSystemATB'][_0x5416ef('0x5f')]['Options'][_0x5416ef('0xd7')]&&this['addBattleSystemATBShowGaugeCommand']();},Window_Options[_0x4d8ff4('0x64')]['addBattleSystemATBShowGaugeCommand']=function(){const _0x2b8e91=_0x4d8ff4,_0x4381b4=TextManager[_0x2b8e91('0x109')],_0x42d031=_0x2b8e91('0x109');this['addCommand'](_0x4381b4,_0x42d031);},Game_BattlerBase[_0x4d8ff4('0x64')]['clearFieldAtbGraphics']=function(){const _0x432c66=_0x4d8ff4;delete this[_0x432c66('0x171')],delete this[_0x432c66('0x1e9')],delete this[_0x432c66('0x79')],delete this[_0x432c66('0xad')];},Game_BattlerBase['prototype']['fieldAtbGraphicType']=function(){const _0xad6ba3=_0x4d8ff4;return this[_0xad6ba3('0x171')]===undefined&&(this[_0xad6ba3('0x171')]=this[_0xad6ba3('0x114')]()),this['_fieldAtbGaugeGraphicType'];},Game_BattlerBase['prototype'][_0x4d8ff4('0x114')]=function(){const _0x5ef432=_0x4d8ff4;return Sprite_FieldGaugeATB[_0x5ef432('0x5f')][_0x5ef432('0x3a')];},Game_BattlerBase[_0x4d8ff4('0x64')]['fieldAtbGraphicFaceName']=function(){const _0x1cf8fc=_0x4d8ff4;return this[_0x1cf8fc('0x1e9')]===undefined&&(this[_0x1cf8fc('0x1e9')]=this[_0x1cf8fc('0x14')]()),this[_0x1cf8fc('0x1e9')];},Game_BattlerBase[_0x4d8ff4('0x64')][_0x4d8ff4('0x14')]=function(){const _0x163cee=_0x4d8ff4;return Sprite_FieldGaugeATB[_0x163cee('0x5f')][_0x163cee('0x110')];},Game_BattlerBase[_0x4d8ff4('0x64')][_0x4d8ff4('0x19d')]=function(){const _0x274232=_0x4d8ff4;return this[_0x274232('0x79')]===undefined&&(this[_0x274232('0x79')]=this[_0x274232('0x1d9')]()),this[_0x274232('0x79')];},Game_BattlerBase['prototype'][_0x4d8ff4('0x1d9')]=function(){const _0xbeca60=_0x4d8ff4;return Sprite_FieldGaugeATB[_0xbeca60('0x5f')][_0xbeca60('0x1d2')];},Game_BattlerBase['prototype'][_0x4d8ff4('0xde')]=function(){const _0x4180af=_0x4d8ff4;return this['_fieldAtbGaugeIconIndex']===undefined&&(this[_0x4180af('0xad')]=this[_0x4180af('0x28')]()),this[_0x4180af('0xad')];},Game_BattlerBase['prototype'][_0x4d8ff4('0x28')]=function(){const _0x270970=_0x4d8ff4;return Sprite_FieldGaugeATB[_0x270970('0x5f')][_0x270970('0x1d3')];},Game_BattlerBase[_0x4d8ff4('0x64')][_0x4d8ff4('0xbb')]=function(_0x12563e){const _0x42294d=_0x4d8ff4;this[_0x42294d('0xad')]=_0x12563e;},Game_Actor[_0x4d8ff4('0x64')][_0x4d8ff4('0x114')]=function(){const _0x307022=_0x4d8ff4,_0x12a224=this[_0x307022('0x13c')]()['note'];if(_0x12a224[_0x307022('0x195')](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x307022('0x19a');return Sprite_FieldGaugeATB[_0x307022('0x5f')][_0x307022('0x12d')];},Game_Actor[_0x4d8ff4('0x64')][_0x4d8ff4('0x7f')]=function(){const _0x2a2e28=_0x4d8ff4;return this[_0x2a2e28('0x8e')]();},Game_Actor[_0x4d8ff4('0x64')][_0x4d8ff4('0x19d')]=function(){const _0x238373=_0x4d8ff4;return this[_0x238373('0x1e8')]();},Game_Actor[_0x4d8ff4('0x64')][_0x4d8ff4('0x28')]=function(){const _0x2aaa63=_0x4d8ff4,_0x5b1f6d=this[_0x2aaa63('0x13c')]()[_0x2aaa63('0x58')];if(_0x5b1f6d[_0x2aaa63('0x195')](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)){if('qsBwg'!==_0x2aaa63('0xab')){function _0x2d5ccd(){const _0x417bad=_0x2aaa63;this[_0x417bad('0xb4')]&&this[_0x417bad('0xd8')][_0x417bad('0x13')](this[_0x417bad('0xb4')]),this[_0x417bad('0xb4')]=new _0x83250(),this[_0x417bad('0xd8')][_0x417bad('0x142')](this['_battlerContainer']),this[_0x417bad('0x15e')]();}}else return Number(RegExp['$1']);}return Sprite_FieldGaugeATB[_0x2aaa63('0x5f')]['ActorBattlerIcon'];},Game_Enemy['prototype'][_0x4d8ff4('0x114')]=function(){const _0x186c2e=_0x4d8ff4,_0x2a8f85=this['enemy']()[_0x186c2e('0x58')];if(_0x2a8f85[_0x186c2e('0x195')](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x2a8f85[_0x186c2e('0x195')](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x186c2e('0x19a');}return Sprite_FieldGaugeATB[_0x186c2e('0x5f')]['EnemyBattlerType'];},Game_Enemy[_0x4d8ff4('0x64')][_0x4d8ff4('0x14')]=function(){const _0x460b47=_0x4d8ff4,_0x1c2852=this['enemy']()[_0x460b47('0x58')];if(_0x1c2852[_0x460b47('0x195')](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x460b47('0x1b9')===_0x460b47('0x1b9'))return String(RegExp['$1']);else{function _0x388b6c(){const _0x4ca838=_0x460b47;this[_0x4ca838('0x31')]=_0x56a27e['min'](_0x36c22f,this[_0x4ca838('0x31')]+_0x157834);}}}return Sprite_FieldGaugeATB[_0x460b47('0x5f')][_0x460b47('0x110')];},Game_Enemy[_0x4d8ff4('0x64')]['createFieldAtbGraphicFaceIndex']=function(){const _0x212072=_0x4d8ff4,_0x2aa90d=this['enemy']()['note'];if(_0x2aa90d['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x212072('0xa5')===_0x212072('0xa5'))return Number(RegExp['$2']);else{function _0x1daf7d(){const _0xd3c0ae=_0x212072;return this[_0xd3c0ae('0xec')]();}}}return Sprite_FieldGaugeATB[_0x212072('0x5f')][_0x212072('0x1d2')];},Game_Enemy[_0x4d8ff4('0x64')][_0x4d8ff4('0x28')]=function(){const _0x1080d3=_0x4d8ff4,_0x4da515=this['enemy']()[_0x1080d3('0x58')];if(_0x4da515['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)){if(_0x1080d3('0x7c')==='RQLEr'){function _0x4e39b9(){const _0x24085a=_0x1080d3;_0x13e64d[_0x24085a('0x6a')][_0x24085a('0x6c')][_0x24085a('0x4d')](this),this[_0x24085a('0x179')]();}}else return Number(RegExp['$1']);}return Sprite_FieldGaugeATB[_0x1080d3('0x5f')]['EnemyBattlerIcon'];},VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x176')]=Scene_Battle[_0x4d8ff4('0x64')][_0x4d8ff4('0x7b')],Scene_Battle[_0x4d8ff4('0x64')][_0x4d8ff4('0x7b')]=function(){const _0x14b8e0=_0x4d8ff4;this[_0x14b8e0('0x75')](),VisuMZ[_0x14b8e0('0x6a')][_0x14b8e0('0x176')][_0x14b8e0('0x4d')](this);},Scene_Battle[_0x4d8ff4('0x64')][_0x4d8ff4('0x75')]=function(){const _0x4bc76c=_0x4d8ff4;if(!BattleManager[_0x4bc76c('0x22')]())return;if(!Sprite_FieldGaugeATB[_0x4bc76c('0x5f')][_0x4bc76c('0x70')])return;if(!ConfigManager[_0x4bc76c('0x109')])return;this[_0x4bc76c('0x18e')]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x1e6bd9=this[_0x4bc76c('0x8')](this[_0x4bc76c('0x98')]);this[_0x4bc76c('0xb5')](this[_0x4bc76c('0x18e')],_0x1e6bd9),this['_fieldGaugeATB']=new Sprite_FieldGaugeATB(),this[_0x4bc76c('0x18e')][_0x4bc76c('0x142')](this[_0x4bc76c('0x15')]);};function Sprite_FieldGaugeATB(){const _0x2a9fb8=_0x4d8ff4;this[_0x2a9fb8('0xbc')](...arguments);}Sprite_FieldGaugeATB['prototype']=Object[_0x4d8ff4('0xd')](Sprite['prototype']),Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0xf1')]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB['Settings']=JsonEx[_0x4d8ff4('0x9f')](VisuMZ[_0x4d8ff4('0x6a')][_0x4d8ff4('0x5f')][_0x4d8ff4('0x1a5')]),Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0xbc')]=function(){const _0x35f040=_0x4d8ff4;Sprite['prototype']['initialize'][_0x35f040('0x4d')](this),this['initMembers'](),this[_0x35f040('0xd4')](),this[_0x35f040('0x108')]();},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x129')]=function(){const _0x2268a6=_0x4d8ff4;this[_0x2268a6('0x8f')]['x']=0.5,this[_0x2268a6('0x8f')]['y']=0.5;},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x12b')]=function(){const _0xfb511c=_0x4d8ff4;if(this[_0xfb511c('0x196')]!==undefined)return this[_0xfb511c('0x196')];const _0xe2ecd2=Sprite_FieldGaugeATB[_0xfb511c('0x5f')][_0xfb511c('0xb6')];return this[_0xfb511c('0x196')]=[_0xfb511c('0x14e'),_0xfb511c('0x3f')][_0xfb511c('0x1b0')](_0xe2ecd2),this[_0xfb511c('0x196')];},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0xd4')]=function(){const _0x5e90d2=_0x4d8ff4,_0x1b1214=Sprite_FieldGaugeATB[_0x5e90d2('0x5f')][_0x5e90d2('0xb6')]['toLowerCase']()[_0x5e90d2('0xe4')](),_0x4cc53f=Math[_0x5e90d2('0x73')](SceneManager[_0x5e90d2('0x1c8')][_0x5e90d2('0x95')](4.5,!![]));this[_0x5e90d2('0x62')]=0x0,this['_homeY']=0x0;switch(_0x1b1214){case'top':this[_0x5e90d2('0x62')]=Math[_0x5e90d2('0x73')](Graphics[_0x5e90d2('0xa3')]*0.5),this[_0x5e90d2('0x127')]=0x60;break;case _0x5e90d2('0x3f'):this['_homeX']=Math[_0x5e90d2('0x73')](Graphics['boxWidth']*0.5),this[_0x5e90d2('0x127')]=Graphics[_0x5e90d2('0x125')]-_0x4cc53f;break;case _0x5e90d2('0x1d7'):this[_0x5e90d2('0x62')]=0x50,this[_0x5e90d2('0x127')]=Math[_0x5e90d2('0x73')]((Graphics['boxHeight']-_0x4cc53f)/0x2);break;case _0x5e90d2('0x8a'):this['_homeX']=Graphics[_0x5e90d2('0xa3')]-0x50,this[_0x5e90d2('0x127')]=Math[_0x5e90d2('0x73')]((Graphics['boxHeight']-_0x4cc53f)/0x2);break;}this[_0x5e90d2('0x62')]+=Sprite_FieldGaugeATB['Settings'][_0x5e90d2('0x1ac')]||0x0,this['_homeY']+=Sprite_FieldGaugeATB[_0x5e90d2('0x5f')][_0x5e90d2('0x24')]||0x0,this['x']=this[_0x5e90d2('0x62')],this['y']=this[_0x5e90d2('0x127')];},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x108')]=function(){const _0x5b8116=_0x4d8ff4;this[_0x5b8116('0xa6')](),this[_0x5b8116('0x4a')](),this['createBattlerContainer']();},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0xa6')]=function(){const _0x4b2b1c=_0x4d8ff4;this[_0x4b2b1c('0x151')]=new Sprite(),this[_0x4b2b1c('0x151')][_0x4b2b1c('0x8f')]['x']=0.5,this['_skinSprite'][_0x4b2b1c('0x8f')]['y']=0.5,this['addChild'](this[_0x4b2b1c('0x151')]);const _0x35bfdc=Sprite_FieldGaugeATB[_0x4b2b1c('0x5f')][_0x4b2b1c('0x1c5')];if(_0x35bfdc)this[_0x4b2b1c('0x151')][_0x4b2b1c('0x12f')]=ImageManager['loadSystem'](_0x35bfdc);},Sprite_FieldGaugeATB['prototype'][_0x4d8ff4('0x4a')]=function(){const _0x59db34=_0x4d8ff4;this[_0x59db34('0xd8')]=new Sprite(),this[_0x59db34('0x142')](this[_0x59db34('0xd8')]),this[_0x59db34('0x100')]();},Sprite_FieldGaugeATB['prototype'][_0x4d8ff4('0x100')]=function(){const _0x4ab9ce=_0x4d8ff4,_0x56f065=Sprite_FieldGaugeATB[_0x4ab9ce('0x5f')],_0x4007bd=this[_0x4ab9ce('0x12b')](),_0x5af74c=_0x4007bd?_0x56f065[_0x4ab9ce('0x84')]:_0x56f065[_0x4ab9ce('0x63')],_0x24838e=_0x4007bd?_0x56f065['GaugeThick']:_0x56f065[_0x4ab9ce('0x89')];this['_gaugeSprite'][_0x4ab9ce('0x12f')]=new Bitmap(_0x5af74c,_0x24838e),this[_0x4ab9ce('0xbd')](),this['_gaugeSprite']['x']=Math[_0x4ab9ce('0x118')](_0x5af74c/-0x2),this[_0x4ab9ce('0xd8')]['y']=Math[_0x4ab9ce('0x118')](_0x24838e/-0x2);},Sprite_FieldGaugeATB['prototype'][_0x4d8ff4('0xbd')]=function(){const _0x27f216=_0x4d8ff4;if(!Sprite_FieldGaugeATB[_0x27f216('0x5f')][_0x27f216('0xfe')])return;const _0x1fc7e1=Sprite_FieldGaugeATB[_0x27f216('0x5f')],_0x125ec6=this[_0x27f216('0xd8')]['bitmap'],_0x160587=_0x125ec6[_0x27f216('0x18c')],_0x33b41e=_0x125ec6[_0x27f216('0x1b')],_0x15b150=ColorManager[_0x27f216('0x46')](),_0x591c07=ColorManager[_0x27f216('0x5')](),_0x36d06b=ColorManager['ctGaugeColor2'](),_0x29726a=ColorManager[_0x27f216('0x3')]('cast1'),_0x4a5355=ColorManager[_0x27f216('0x3')](_0x27f216('0x181')),_0x300698=this[_0x27f216('0x12b')](),_0x36b5fb=_0x1fc7e1[_0x27f216('0x43')],_0x50eb53=_0x1fc7e1['GaugeSplit'][_0x27f216('0xf5')](0x0,0x1),_0x56f5a2=Math[_0x27f216('0x118')](((_0x300698?_0x160587:_0x33b41e)-0x2)*_0x50eb53);_0x125ec6[_0x27f216('0x186')](0x0,0x0,_0x160587,_0x33b41e,_0x15b150);let _0x5a0682=0x0,_0x98c371=0x0,_0x27e806=0x0,_0xcbb9c1=0x0;if(_0x300698&&_0x36b5fb){if(_0x27f216('0x86')===_0x27f216('0x86'))_0x5a0682=_0x56f5a2-0x1,_0x27e806=_0x160587-0x3-_0x5a0682,_0x125ec6[_0x27f216('0x11f')](0x1,0x1,_0x5a0682,_0x33b41e-0x2,_0x591c07,_0x36d06b,![]),_0x125ec6[_0x27f216('0x11f')](0x2+_0x5a0682,0x1,_0x27e806,_0x33b41e-0x2,_0x29726a,_0x4a5355,![]);else{function _0x28c35f(){const _0x15aa91=_0x27f216;if(!this[_0x15aa91('0xed')](_0x56ed7b))return;_0x110cc5[_0x15aa91('0x6a')][_0x15aa91('0xc7')]['call'](this,_0x423fdf,_0x4096b4,_0x332be5,_0x3ce4a3);}}}else{if(_0x300698&&!_0x36b5fb)_0x5a0682=_0x56f5a2-0x1,_0x27e806=_0x160587-0x3-_0x5a0682,_0x125ec6['gradientFillRect'](0x2+_0x27e806,0x1,_0x5a0682,_0x33b41e-0x2,_0x591c07,_0x36d06b,![]),_0x125ec6[_0x27f216('0x11f')](0x1,0x1,_0x27e806,_0x33b41e-0x2,_0x29726a,_0x4a5355,![]);else{if(!_0x300698&&_0x36b5fb){if(_0x27f216('0x146')==='wytVh')_0x98c371=_0x56f5a2-0x1,_0xcbb9c1=_0x33b41e-0x3-_0x98c371,_0x125ec6[_0x27f216('0x11f')](0x1,0x1,_0x160587-0x2,_0x98c371,_0x591c07,_0x36d06b,!![]),_0x125ec6[_0x27f216('0x11f')](0x1,0x2+_0x98c371,_0x160587-0x2,_0xcbb9c1,_0x29726a,_0x4a5355,!![]);else{function _0x530ac0(){const _0x46a7a7=_0x27f216,_0x2bdd4d=this[_0x46a7a7('0xe9')]();if(!_0x2bdd4d)return;const _0x2724fa=_0x2bdd4d['battler']();if(!_0x2724fa)return;const _0x33b98f=_0x2724fa[_0x46a7a7('0x10d')]();if(!_0x33b98f)return;this['setBlendColor'](_0x33b98f[_0x46a7a7('0x14f')]);}}}else{if(!_0x300698&&!_0x36b5fb){if(_0x27f216('0x12e')===_0x27f216('0x48')){function _0x42e4e8(){const _0x2cefe5=_0x27f216;_0x1257e8[_0x2cefe5('0x6a')][_0x2cefe5('0xc8')][_0x2cefe5('0x4d')](this),_0x3c2ff4[_0x2cefe5('0x6a')][_0x2cefe5('0x5f')]['Gauge']['ShowActorGauge']&&this['createAtbGaugeSprite']();}}else _0x98c371=_0x56f5a2-0x1,_0xcbb9c1=_0x33b41e-0x3-_0x98c371,_0x125ec6[_0x27f216('0x11f')](0x1,0x2+_0xcbb9c1,_0x160587-0x2,_0x98c371,_0x591c07,_0x36d06b,!![]),_0x125ec6[_0x27f216('0x11f')](0x1,0x1,_0x160587-0x2,_0xcbb9c1,_0x29726a,_0x4a5355,!![]);}}}}},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x1c7')]=function(){const _0x4fa7ad=_0x4d8ff4;this[_0x4fa7ad('0xb4')]&&this['_gaugeSprite'][_0x4fa7ad('0x13')](this[_0x4fa7ad('0xb4')]),this[_0x4fa7ad('0xb4')]=new Sprite(),this[_0x4fa7ad('0xd8')][_0x4fa7ad('0x142')](this[_0x4fa7ad('0xb4')]),this['createBattlerSprites']();},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')]['createBattlerSprites']=function(){this['createEnemySprites'](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x1a6')]=function(){const _0x1a4d93=_0x4d8ff4,_0x1fe116=$gameTroop[_0x1a4d93('0x8b')](),_0x40e53f=_0x1fe116['length'];for(let _0x5b6dba=0x0;_0x5b6dba<_0x40e53f;_0x5b6dba++){if(_0x1a4d93('0x1ba')!==_0x1a4d93('0x1ba')){function _0x323209(){const _0xec10b7=_0x1a4d93;this['_tpbChargeTime']=_0x3c20d0[_0xec10b7('0xf5')](0x0,0x1);}}else this['createBattlerSprite'](_0x5b6dba,$gameTroop);}},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')]['createActorSprites']=function(){const _0x8bb45c=_0x4d8ff4,_0x1b31e7=$gameParty[_0x8bb45c('0x93')]();for(let _0x186fd0=0x0;_0x186fd0<_0x1b31e7;_0x186fd0++){this[_0x8bb45c('0x1b7')](_0x186fd0,$gameParty);}},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x1b7')]=function(_0x5788a8,_0x36ef8c){const _0x487e1f=_0x4d8ff4,_0x55878c=new Sprite_FieldMarkerATB(_0x5788a8,_0x36ef8c,this[_0x487e1f('0xd8')]);this[_0x487e1f('0xb4')][_0x487e1f('0x142')](_0x55878c);},Sprite_FieldGaugeATB['prototype'][_0x4d8ff4('0x45')]=function(){const _0x2d3e62=_0x4d8ff4;Sprite[_0x2d3e62('0x64')][_0x2d3e62('0x45')][_0x2d3e62('0x4d')](this),this['updatePosition'](),this[_0x2d3e62('0x136')](),this[_0x2d3e62('0xda')]();},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')]['updatePosition']=function(){const _0x31f03a=_0x4d8ff4,_0x4a26ab=Sprite_FieldGaugeATB[_0x31f03a('0x5f')];if(_0x4a26ab['DisplayPosition']!=='top')return;if(!_0x4a26ab[_0x31f03a('0x68')])return;const _0x282844=SceneManager['_scene'][_0x31f03a('0x1e3')];if(!_0x282844)return;_0x282844['visible']?(this['x']=this[_0x31f03a('0x62')]+(_0x4a26ab['RepositionTopHelpX']||0x0),this['y']=this[_0x31f03a('0x127')]+(_0x4a26ab[_0x31f03a('0xf2')]||0x0)):(this['x']=this['_homeX'],this['y']=this[_0x31f03a('0x127')]);const _0x495580=SceneManager[_0x31f03a('0x1c8')][_0x31f03a('0x98')];this['x']+=_0x495580['x'],this['y']+=_0x495580['y'];},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x136')]=function(){const _0x188431=_0x4d8ff4;if(!this[_0x188431('0xb4')])return;const _0xb727a5=this['_battlerContainer'][_0x188431('0x7')];if(!_0xb727a5)return;_0xb727a5[_0x188431('0x15b')](this[_0x188431('0x77')][_0x188431('0x10a')](this));},Sprite_FieldGaugeATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x77')]=function(_0x4de839,_0x1549e4){const _0x73c990=_0x4d8ff4,_0x2216b2=this[_0x73c990('0x12b')](),_0x409e1c=Sprite_FieldGaugeATB[_0x73c990('0x5f')][_0x73c990('0x43')];if(_0x2216b2&&_0x409e1c){if(_0x73c990('0x1c2')!==_0x73c990('0x1c2')){function _0x591680(){const _0x4d721a=_0x73c990;this[_0x4d721a('0x3c')]();}}else return _0x4de839['x']-_0x1549e4['x'];}else{if(_0x2216b2&&!_0x409e1c)return _0x1549e4['x']-_0x4de839['x'];else{if(!_0x2216b2&&_0x409e1c)return _0x4de839['y']-_0x1549e4['y'];else{if(!_0x2216b2&&!_0x409e1c)return _0x1549e4['y']-_0x4de839['y'];}}}},Sprite_FieldGaugeATB['prototype'][_0x4d8ff4('0xda')]=function(){const _0x5d19bb=_0x4d8ff4;this[_0x5d19bb('0x1c9')]=$gameSystem[_0x5d19bb('0x16a')]();};function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}Sprite_FieldMarkerATB['prototype']=Object[_0x4d8ff4('0xd')](Sprite[_0x4d8ff4('0x64')]),Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0xf1')]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0xbc')]=function(_0x482484,_0x1bcc62,_0xc7ce2a){const _0x5672cb=_0x4d8ff4;this[_0x5672cb('0xcc')]=_0x482484,this[_0x5672cb('0x92')]=_0x1bcc62,this[_0x5672cb('0xd8')]=_0xc7ce2a,Sprite[_0x5672cb('0x64')][_0x5672cb('0xbc')]['call'](this),this[_0x5672cb('0x129')](),this[_0x5672cb('0x108')](),this[_0x5672cb('0x31')]=this[_0x5672cb('0x126')]();},Sprite_FieldMarkerATB['prototype']['initMembers']=function(){const _0x418041=_0x4d8ff4;this[_0x418041('0x8f')]['x']=0.5,this[_0x418041('0x8f')]['y']=0.5;},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x108')]=function(){const _0x2042db=_0x4d8ff4;this['createBackgroundSprite'](),this['createGraphicSprite'](),this['createBorderSprite'](),this[_0x2042db('0xfb')](),this[_0x2042db('0xa7')](),this['updatePositionOnGauge'](!![]);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')]['createBackgroundSprite']=function(){const _0x59948a=_0x4d8ff4;if(!Sprite_FieldGaugeATB[_0x59948a('0x5f')][_0x59948a('0x162')])return;const _0x4cf879=Sprite_FieldGaugeATB[_0x59948a('0x5f')],_0x46ffde=this[_0x59948a('0x92')]===$gameParty?_0x59948a('0x69'):_0x59948a('0xc2'),_0x3fcc37=_0x59948a('0x193')[_0x59948a('0x16c')](_0x46ffde),_0x1445e8=new Sprite();_0x1445e8[_0x59948a('0x8f')]['x']=this[_0x59948a('0x8f')]['x'],_0x1445e8['anchor']['y']=this[_0x59948a('0x8f')]['y'];if(_0x4cf879[_0x3fcc37])_0x1445e8[_0x59948a('0x12f')]=ImageManager[_0x59948a('0x14d')](_0x4cf879[_0x3fcc37]);else{const _0x45e5f1=_0x4cf879[_0x59948a('0x140')];_0x1445e8[_0x59948a('0x12f')]=new Bitmap(_0x45e5f1,_0x45e5f1);const _0x210422=ColorManager[_0x59948a('0x19c')](_0x4cf879[_0x59948a('0x17e')[_0x59948a('0x16c')](_0x46ffde)]),_0x3740c3=ColorManager[_0x59948a('0x19c')](_0x4cf879[_0x59948a('0x149')['format'](_0x46ffde)]);_0x1445e8[_0x59948a('0x12f')][_0x59948a('0x11f')](0x0,0x0,_0x45e5f1,_0x45e5f1,_0x210422,_0x3740c3,!![]);}this[_0x59948a('0x185')]=_0x1445e8,this[_0x59948a('0x142')](this['_backgroundSprite']);},Sprite_FieldMarkerATB['prototype'][_0x4d8ff4('0x123')]=function(){const _0x56e1bd=_0x4d8ff4,_0x20eae7=new Sprite();_0x20eae7['anchor']['x']=this[_0x56e1bd('0x8f')]['x'],_0x20eae7[_0x56e1bd('0x8f')]['y']=this['anchor']['y'],this[_0x56e1bd('0x56')]=_0x20eae7,this[_0x56e1bd('0x142')](this[_0x56e1bd('0x56')]),this[_0x56e1bd('0xec')]();},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x147')]=function(){const _0x3d2a85=_0x4d8ff4;if(!Sprite_FieldGaugeATB[_0x3d2a85('0x5f')][_0x3d2a85('0xf4')])return;const _0x2ba9ab=Sprite_FieldGaugeATB[_0x3d2a85('0x5f')],_0x285ffb=this[_0x3d2a85('0x92')]===$gameParty?_0x3d2a85('0x69'):'Enemy',_0x28072c=_0x3d2a85('0x11a')[_0x3d2a85('0x16c')](_0x285ffb),_0x43db7a=new Sprite();_0x43db7a[_0x3d2a85('0x8f')]['x']=this[_0x3d2a85('0x8f')]['x'],_0x43db7a[_0x3d2a85('0x8f')]['y']=this['anchor']['y'];if(_0x2ba9ab[_0x28072c])_0x43db7a[_0x3d2a85('0x12f')]=ImageManager[_0x3d2a85('0x14d')](_0x2ba9ab[_0x28072c]);else{let _0x1d4b69=_0x2ba9ab['MarkerSize'],_0x2a69e3=_0x2ba9ab['BorderThickness'];_0x43db7a[_0x3d2a85('0x12f')]=new Bitmap(_0x1d4b69,_0x1d4b69);const _0x4d8bc8=_0x3d2a85('0x0'),_0x31bb4e=ColorManager['getColor'](_0x2ba9ab[_0x3d2a85('0xf3')[_0x3d2a85('0x16c')](_0x285ffb)]);_0x43db7a[_0x3d2a85('0x12f')][_0x3d2a85('0x186')](0x0,0x0,_0x1d4b69,_0x1d4b69,_0x4d8bc8),_0x1d4b69-=0x2,_0x43db7a['bitmap'][_0x3d2a85('0x186')](0x1,0x1,_0x1d4b69,_0x1d4b69,_0x31bb4e),_0x1d4b69-=_0x2a69e3*0x2,_0x43db7a['bitmap']['fillRect'](0x1+_0x2a69e3,0x1+_0x2a69e3,_0x1d4b69,_0x1d4b69,_0x4d8bc8),_0x1d4b69-=0x2,_0x2a69e3+=0x1,_0x43db7a[_0x3d2a85('0x12f')][_0x3d2a85('0xa9')](0x1+_0x2a69e3,0x1+_0x2a69e3,_0x1d4b69,_0x1d4b69);}this[_0x3d2a85('0x185')]=_0x43db7a,this[_0x3d2a85('0x142')](this['_backgroundSprite']);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0xfb')]=function(){const _0x3d2c13=_0x4d8ff4,_0x5dea61=Sprite_FieldGaugeATB[_0x3d2c13('0x5f')];if(!_0x5dea61[_0x3d2c13('0x13e')])return;if(this['_unit']===$gameParty)return;const _0x8cf38a=_0x5dea61[_0x3d2c13('0x140')],_0xff681c=new Sprite();_0xff681c['anchor']['x']=this['anchor']['x'],_0xff681c['anchor']['y']=this[_0x3d2c13('0x8f')]['y'],_0xff681c[_0x3d2c13('0x12f')]=new Bitmap(_0x8cf38a,_0x8cf38a),this[_0x3d2c13('0x9b')]=_0xff681c,this[_0x3d2c13('0x142')](this['_letterSprite']);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0xa7')]=function(){const _0xe1f2b2=_0x4d8ff4,_0x418916=Sprite_FieldGaugeATB[_0xe1f2b2('0x5f')];if(!_0x418916[_0xe1f2b2('0x15f')])return;const _0xede829=new Sprite();_0xede829['anchor']['x']=this[_0xe1f2b2('0x8f')]['x'],_0xede829['anchor']['y']=this[_0xe1f2b2('0x8f')]['y'],this[_0xe1f2b2('0x191')](_0xede829),this[_0xe1f2b2('0x10')]=_0xede829,this[_0xe1f2b2('0x142')](this['_arrowSprite']);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')]['setupArrowSprite']=function(_0x1125d4){const _0xfe8ea2=_0x4d8ff4,_0x2b1a4a=Sprite_FieldGaugeATB[_0xfe8ea2('0x5f')],_0xdec361=_0x2b1a4a[_0xfe8ea2('0x140')],_0x227591=Math[_0xfe8ea2('0x73')](_0xdec361/0x2),_0x2c481d=this[_0xfe8ea2('0x12b')](),_0x46e1a7=this['_unit']===$gameParty?_0xfe8ea2('0x69'):_0xfe8ea2('0xc2'),_0x5cc2c5=_0x2b1a4a[_0xfe8ea2('0xc9')[_0xfe8ea2('0x16c')](_0x46e1a7)];_0x1125d4[_0xfe8ea2('0x12f')]=ImageManager[_0xfe8ea2('0x14d')](_0x2b1a4a['MarkerArrowWindowSkin']);const _0x21f391=0x18,_0x9891af=_0x21f391/0x2,_0x1d3c73=0x60+_0x21f391,_0x239216=0x0+_0x21f391;if(_0x2c481d&&_0x5cc2c5){if(_0xfe8ea2('0x1df')!==_0xfe8ea2('0x1df')){function _0x10f4fe(){const _0x3cc866=_0xfe8ea2;_0x46a593['isATB']()?this['applyATBPenalty']():_0x27d1a8[_0x3cc866('0x6a')][_0x3cc866('0x1cc')][_0x3cc866('0x4d')](this);}}else _0x1125d4[_0xfe8ea2('0xa8')](_0x1d3c73+_0x9891af,_0x239216+_0x9891af+_0x21f391,_0x21f391,_0x9891af),_0x1125d4['y']+=_0x227591,_0x1125d4[_0xfe8ea2('0x8f')]['y']=0x0;}else{if(_0x2c481d&&!_0x5cc2c5)_0x1125d4[_0xfe8ea2('0xa8')](_0x1d3c73+_0x9891af,_0x239216,_0x21f391,_0x9891af),_0x1125d4['y']-=_0x227591,_0x1125d4[_0xfe8ea2('0x8f')]['y']=0x1;else{if(!_0x2c481d&&_0x5cc2c5){if(_0xfe8ea2('0x11c')===_0xfe8ea2('0x11c'))_0x1125d4[_0xfe8ea2('0xa8')](_0x1d3c73,_0x239216+_0x9891af,_0x9891af,_0x21f391),_0x1125d4['x']-=Math[_0xfe8ea2('0x118')](_0x227591*1.75),_0x1125d4[_0xfe8ea2('0x8f')]['x']=0x0;else{function _0x5c6870(){const _0x4488c9=_0xfe8ea2;return _0x3c9774[_0x4488c9('0x22')]()?this['atbAcceleration']():_0x46b24c[_0x4488c9('0x6a')]['Game_Battler_tpbAcceleration']['call'](this);}}}else!_0x2c481d&&!_0x5cc2c5&&(_0x1125d4[_0xfe8ea2('0xa8')](_0x1d3c73+_0x21f391+_0x9891af,_0x239216+_0x9891af,_0x9891af,_0x21f391),_0x1125d4['x']+=Math['ceil'](_0x227591*1.75),_0x1125d4[_0xfe8ea2('0x8f')]['x']=0x1);}}},Sprite_FieldMarkerATB['prototype'][_0x4d8ff4('0xe9')]=function(){const _0x2275cb=_0x4d8ff4;if(this[_0x2275cb('0x92')]===$gameParty)return $gameParty['battleMembers']()[this[_0x2275cb('0xcc')]];else{if(_0x2275cb('0x1ca')!==_0x2275cb('0x1ca')){function _0x3354d0(){const _0x6281b4=_0x2275cb;return _0x57243f['BattleSystemATB'][_0x6281b4('0x5f')]['Mechanics'][_0x6281b4('0x1dd')]['call'](this,this);}}else return $gameTroop['members']()[this[_0x2275cb('0xcc')]];}},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x45')]=function(){const _0x1c79e1=_0x4d8ff4;Sprite[_0x1c79e1('0x64')][_0x1c79e1('0x45')][_0x1c79e1('0x4d')](this),this['updateOpacity'](),this[_0x1c79e1('0x15d')](),this['updatePositionOnGauge'](),this['updateGraphic'](),this[_0x1c79e1('0x1e0')](),this[_0x1c79e1('0x128')](),this[_0x1c79e1('0x83')]();},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x10c')]=function(){const _0x50fc71=_0x4d8ff4,_0x521b33=this['targetOpacity'](),_0x43d1a6=Sprite_FieldGaugeATB['Settings']['OpacityRate'];if(this[_0x50fc71('0x31')]>_0x521b33)this[_0x50fc71('0x31')]=Math[_0x50fc71('0xcb')](_0x521b33,this['opacity']-_0x43d1a6);else{if(this['opacity']<_0x521b33){if('hdjIu'!==_0x50fc71('0xe7'))this[_0x50fc71('0x31')]=Math[_0x50fc71('0x13d')](_0x521b33,this[_0x50fc71('0x31')]+_0x43d1a6);else{function _0x91de09(){const _0x1d26eb=_0x50fc71;if(!this[_0x1d26eb('0x9b')])return;const _0x577cdd=this[_0x1d26eb('0xe9')]();if(!_0x577cdd)return;if(this['_letter']===_0x577cdd[_0x1d26eb('0x159')]&&this[_0x1d26eb('0x198')]===_0x577cdd[_0x1d26eb('0x198')])return;this[_0x1d26eb('0x159')]=_0x577cdd[_0x1d26eb('0x159')],this[_0x1d26eb('0x198')]=_0x577cdd[_0x1d26eb('0x198')];const _0x4f13df=_0x321c2e[_0x1d26eb('0x5f')],_0x5e6482=_0x4f13df[_0x1d26eb('0x140')],_0x3f2900=_0x1538f1[_0x1d26eb('0x1da')](_0x5e6482/0x2),_0x12c117=this['_letterSprite'][_0x1d26eb('0x12f')];_0x12c117[_0x1d26eb('0x49')]();if(!this[_0x1d26eb('0x198')])return;_0x12c117[_0x1d26eb('0x5b')]=_0x4f13df['EnemyBattlerFontFace']||_0x64a986[_0x1d26eb('0xee')](),_0x12c117[_0x1d26eb('0x90')]=_0x4f13df[_0x1d26eb('0xc3')]||0x10,_0x12c117[_0x1d26eb('0x131')](this[_0x1d26eb('0x159')],0x2,_0x3f2900,_0x5e6482-0x4,_0x3f2900-0x2,_0x1d26eb('0x8a'));}}}}},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')]['targetOpacity']=function(){const _0x10a51b=_0x4d8ff4,_0x5145c1=this[_0x10a51b('0xe9')]();if(!_0x5145c1)return 0x0;if(_0x5145c1[_0x10a51b('0x1d4')]())return 0x0;if(_0x5145c1[_0x10a51b('0x76')]())return 0x0;return 0xff;},Sprite_FieldMarkerATB['prototype'][_0x4d8ff4('0x12b')]=function(){const _0x553d48=_0x4d8ff4;if(this['_horz']!==undefined)return this[_0x553d48('0x196')];const _0x336e0b=Sprite_FieldGaugeATB[_0x553d48('0x5f')][_0x553d48('0xb6')];return this[_0x553d48('0x196')]=[_0x553d48('0x14e'),_0x553d48('0x3f')][_0x553d48('0x1b0')](_0x336e0b),this[_0x553d48('0x196')];},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x15d')]=function(){const _0x521d25=_0x4d8ff4,_0x4bfa7c=Sprite_FieldGaugeATB[_0x521d25('0x5f')],_0x157b7d=this[_0x521d25('0x12b')](),_0x40cb34=this[_0x521d25('0x92')]===$gameParty?_0x521d25('0x69'):_0x521d25('0xc2'),_0x590563=_0x4bfa7c[_0x521d25('0x137')],_0x67bae2=_0x4bfa7c[_0x521d25('0xc9')[_0x521d25('0x16c')](_0x40cb34)];if(_0x157b7d){if(_0x521d25('0x18')!==_0x521d25('0x30'))this['y']=_0x4bfa7c['GaugeThick']/0x2,this['y']+=_0x67bae2?-_0x590563:_0x590563;else{function _0x47066b(){const _0x9cfd23=_0x521d25;_0xb51ea8[_0x9cfd23('0xa8')](_0x53f4d6+_0x357c5e,_0x52cbba+_0x52c7f7+_0x30a0c3,_0x1c5816,_0x49f3ad),_0x3b0e1e['y']+=_0x44c7ee,_0x41acfd[_0x9cfd23('0x8f')]['y']=0x0;}}}else this['x']=_0x4bfa7c['GaugeThick']/0x2,this['x']+=_0x67bae2?_0x590563:-_0x590563;},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')]['updatePositionOnGauge']=function(_0x1ed7bb){const _0xf57c42=_0x4d8ff4,_0x3441c0=this[_0xf57c42('0xe9')]();if(!_0x3441c0)return;const _0xaef169=Sprite_FieldGaugeATB[_0xf57c42('0x5f')],_0xdd9de7=this[_0xf57c42('0x12b')](),_0x5e68fa=this[_0xf57c42('0x2b')](),_0xe2f1b=_0x1ed7bb?Infinity:_0xaef169['MarkerSpeed'];if(_0xdd9de7&&this['x']!==_0x5e68fa){if('jVsjw'===_0xf57c42('0xb3')){if(this['x']>_0x5e68fa)this['x']=Math[_0xf57c42('0xcb')](_0x5e68fa,this['x']-_0xe2f1b);if(this['x']<_0x5e68fa)this['x']=Math[_0xf57c42('0x13d')](_0x5e68fa,this['x']+_0xe2f1b);}else{function _0x5f5854(){const _0x111b8e=_0xf57c42;return _0x36e42d[_0x111b8e('0x195')](/#(.*)/i)?'#%1'[_0x111b8e('0x16c')](_0x221d1b(_0x29ce1d['$1'])):this[_0x111b8e('0x1bf')](_0x3bad9b(_0x507a8b));}}}else{if(!_0xdd9de7&&this['x']!==_0x5e68fa){if(_0xf57c42('0x4')!==_0xf57c42('0x4')){function _0x595a72(){const _0x3ebd80=_0xf57c42;return _0x3ebd80('0x16')['format'](_0x4da453(_0x34587a['$1']));}}else{if(this['y']>_0x5e68fa)this['y']=Math[_0xf57c42('0xcb')](_0x5e68fa,this['y']-_0xe2f1b);if(this['y']<_0x5e68fa)this['y']=Math[_0xf57c42('0x13d')](_0x5e68fa,this['y']+_0xe2f1b);}}}},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x2b')]=function(){const _0x43d615=_0x4d8ff4,_0x39dd46=Sprite_FieldGaugeATB[_0x43d615('0x5f')],_0x5e54eb=this[_0x43d615('0xe9')](),_0x3f24f8=this[_0x43d615('0x12b')](),_0xe43f45=this[_0x43d615('0xd8')][_0x43d615('0x12f')]['width'],_0xe413d2=this[_0x43d615('0xd8')][_0x43d615('0x12f')][_0x43d615('0x1b')],_0x9430a3=_0x39dd46[_0x43d615('0x169')][_0x43d615('0xf5')](0x0,0x1),_0x503a59=_0x39dd46['GaugeDirection'];let _0x3ba340=_0x5e54eb[_0x43d615('0x1c')]()*_0x9430a3;_0x3ba340+=(0x1-_0x9430a3)*_0x5e54eb['getAtbCastTimeRate']();if(_0x5e54eb===BattleManager[_0x43d615('0xf')])_0x3ba340=0x1;if(!_0x503a59)_0x3ba340=0x1-_0x3ba340;let _0x930eef=0x0;if(_0x3f24f8){if(_0x43d615('0x9c')==='rtaDc'){function _0x4dc42b(){const _0x2c2b70=_0x43d615;return _0x3e9661['Settings'][_0x2c2b70('0x110')];}}else _0x930eef=_0x3ba340*_0xe43f45;}else!_0x3f24f8&&(_0x930eef=_0x3ba340*_0xe413d2);return Math[_0x43d615('0x73')](_0x930eef);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x9')]=function(){const _0x1382f1=_0x4d8ff4,_0x1afe1d=this['battler']();if(!_0x1afe1d)return;const _0x438671=Sprite_FieldGaugeATB[_0x1382f1('0x5f')],_0x402cee=this[_0x1382f1('0x92')]===$gameParty?_0x1382f1('0x69'):'Enemy';let _0x5a4089=_0x1afe1d[_0x1382f1('0x94')]();if(_0x1afe1d['isActor']()&&_0x5a4089===_0x1382f1('0x1c4'))_0x5a4089=_0x1382f1('0x139');else _0x1afe1d['isEnemy']()&&_0x5a4089===_0x1382f1('0xa4')&&(_0x5a4089=_0x1382f1('0x1c4'));if(this[_0x1382f1('0x18b')]!==_0x5a4089){if(_0x1382f1('0x177')===_0x1382f1('0x39')){function _0x3f08d4(){const _0x48712e=_0x1382f1;if(this[_0x48712e('0x196')]!==_0x130821)return this[_0x48712e('0x196')];const _0x3cd062=_0x46b0ac[_0x48712e('0x5f')][_0x48712e('0xb6')];return this[_0x48712e('0x196')]=[_0x48712e('0x14e'),'bottom'][_0x48712e('0x1b0')](_0x3cd062),this[_0x48712e('0x196')];}}else return this[_0x1382f1('0xec')]();}switch(this[_0x1382f1('0x18b')]){case _0x1382f1('0x139'):if(this[_0x1382f1('0x1b6')]!==_0x1afe1d[_0x1382f1('0x7f')]()){if(_0x1382f1('0x192')!=='ckAXD'){function _0x19757d(){const _0x384947=_0x1382f1,_0x4f62dd=this[_0x384947('0x126')](),_0x457a98=_0x136650['Settings']['OpacityRate'];if(this[_0x384947('0x31')]>_0x4f62dd)this[_0x384947('0x31')]=_0x487977[_0x384947('0xcb')](_0x4f62dd,this[_0x384947('0x31')]-_0x457a98);else this[_0x384947('0x31')]<_0x4f62dd&&(this['opacity']=_0x591c50[_0x384947('0x13d')](_0x4f62dd,this['opacity']+_0x457a98));}}else return this[_0x1382f1('0xec')]();}if(this[_0x1382f1('0x34')]!==_0x1afe1d['fieldAtbGraphicFaceIndex']()){if(_0x1382f1('0x67')==='Eetlq'){function _0x1d5c03(){this['_atbAfterSpeed']=_0x1a7adb;}}else return this[_0x1382f1('0xec')]();}break;case _0x1382f1('0x19a'):if(this[_0x1382f1('0xb7')]!==_0x1afe1d[_0x1382f1('0xde')]()){if('VgCnz'==='aXild'){function _0x7405a6(){const _0x55fea8=_0x1382f1,_0x529525=this[_0x55fea8('0x1c4')]()[_0x55fea8('0x58')];if(_0x529525[_0x55fea8('0x195')](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x82081(_0x30cb07['$2']);return _0x3a2bcb[_0x55fea8('0x5f')][_0x55fea8('0x1d2')];}}else return this['processUpdateGraphic']();}break;case _0x1382f1('0x1c4'):if(_0x1afe1d[_0x1382f1('0x17b')]()){if(this['_graphicSv']!==_0x1afe1d[_0x1382f1('0x1c3')]())return this[_0x1382f1('0xec')]();}else{if(this['_graphicEnemy']!==_0x1afe1d[_0x1382f1('0x183')]()){if(_0x1382f1('0x36')!==_0x1382f1('0x36')){function _0x2266d0(){const _0xa75890=_0x1382f1;_0x4f24c4[_0xa75890('0x44')](_0xbede88(_0x4c7827['$1'])*0.01);}}else return this[_0x1382f1('0xec')]();}}break;case _0x1382f1('0xa4'):if(_0x1afe1d[_0x1382f1('0x117')]()){if('kbdvl'===_0x1382f1('0xae')){function _0x2fac2a(){const _0x2428a4=_0x1382f1;return this[_0x2428a4('0xec')]();}}else{if(this[_0x1382f1('0x97')]!==_0x1afe1d[_0x1382f1('0x183')]())return this[_0x1382f1('0xec')]();}}else{if(this[_0x1382f1('0x1aa')]!==_0x1afe1d['battlerName']()){if(_0x1382f1('0x187')==='ThOZt'){function _0x490075(){_0x521ba4['ConvertParams'](_0x39957a,_0x4aa2de);const _0xf17c9b=_0x2cb484['Visible'];_0x591da2['setBattleSystemATBFieldGaugeVisible'](_0xf17c9b);}}else return this[_0x1382f1('0xec')]();}}break;}},Sprite_FieldMarkerATB['prototype']['processUpdateGraphic']=function(){const _0x4f00b6=_0x4d8ff4,_0x37d42a=this[_0x4f00b6('0xe9')]();if(!_0x37d42a)return;this[_0x4f00b6('0x18b')]=_0x37d42a['fieldAtbGraphicType']();if(_0x37d42a[_0x4f00b6('0x117')]()&&this[_0x4f00b6('0x18b')]===_0x4f00b6('0x1c4')){if(_0x4f00b6('0xbe')===_0x4f00b6('0x1a3')){function _0xb9f4fe(){const _0x1bf878=_0x4f00b6;_0x4825bf[_0x1bf878('0x1c9')]=![];}}else this[_0x4f00b6('0x18b')]=_0x4f00b6('0x139');}else{if(_0x37d42a[_0x4f00b6('0xfa')]()&&this[_0x4f00b6('0x18b')]===_0x4f00b6('0xa4')){if(_0x4f00b6('0x7e')!==_0x4f00b6('0x2c'))this[_0x4f00b6('0x18b')]=_0x4f00b6('0x1c4');else{function _0x108167(){const _0x522dfa=_0x4f00b6;this[_0x522dfa('0x71')]();}}}}let _0x1d960e;switch(this['_graphicType']){case _0x4f00b6('0x139'):this[_0x4f00b6('0x1b6')]=_0x37d42a['fieldAtbGraphicFaceName'](),this[_0x4f00b6('0x34')]=_0x37d42a[_0x4f00b6('0x19d')](),_0x1d960e=ImageManager[_0x4f00b6('0xe2')](this['_graphicFaceName']),_0x1d960e[_0x4f00b6('0x10f')](this[_0x4f00b6('0x18f')][_0x4f00b6('0x10a')](this,_0x1d960e));break;case _0x4f00b6('0x19a'):this['_graphicIconIndex']=_0x37d42a[_0x4f00b6('0xde')](),_0x1d960e=ImageManager['loadSystem'](_0x4f00b6('0x1e2')),_0x1d960e[_0x4f00b6('0x10f')](this[_0x4f00b6('0xe8')]['bind'](this,_0x1d960e));break;case'enemy':if(_0x37d42a[_0x4f00b6('0x17b')]()){if(_0x4f00b6('0xf8')!==_0x4f00b6('0xf8')){function _0x122373(){const _0x4d39d6=_0x4f00b6;this[_0x4d39d6('0x194')]();}}else this[_0x4f00b6('0x97')]=_0x37d42a['svBattlerName'](),_0x1d960e=ImageManager[_0x4f00b6('0x167')](this[_0x4f00b6('0x97')]),_0x1d960e['addLoadListener'](this[_0x4f00b6('0x141')][_0x4f00b6('0x10a')](this,_0x1d960e));}else{if($gameSystem[_0x4f00b6('0x1cf')]())this[_0x4f00b6('0x1aa')]=_0x37d42a[_0x4f00b6('0x183')](),_0x1d960e=ImageManager[_0x4f00b6('0x112')](this[_0x4f00b6('0x1aa')]),_0x1d960e[_0x4f00b6('0x10f')](this[_0x4f00b6('0x8d')][_0x4f00b6('0x10a')](this,_0x1d960e));else{if(_0x4f00b6('0x15a')!==_0x4f00b6('0x15a')){function _0x19fd73(){const _0xd21c89=_0x4f00b6,_0x3e9d6f=_0x2212d1(_0x531683['$1']),_0x3e75bd=_0xd21c89('0x1e6')[_0xd21c89('0x16c')](_0x3e9d6f,_0xe231e4),_0x4547bd=_0x5d8dc5['BattleSystemATB'][_0xd21c89('0x78')](_0xb1921a,_0x5260a5);_0x250369[_0xd21c89('0x6a')]['JS'][_0x4547bd]=new _0x32f90c(_0x3e75bd);}}else this[_0x4f00b6('0x1aa')]=_0x37d42a[_0x4f00b6('0x183')](),_0x1d960e=ImageManager['loadEnemy'](this[_0x4f00b6('0x1aa')]),_0x1d960e[_0x4f00b6('0x10f')](this['changeEnemyGraphicBitmap'][_0x4f00b6('0x10a')](this,_0x1d960e));}}break;case _0x4f00b6('0xa4'):this[_0x4f00b6('0x97')]=_0x37d42a[_0x4f00b6('0x183')](),_0x1d960e=ImageManager[_0x4f00b6('0x167')](this[_0x4f00b6('0x97')]),_0x1d960e[_0x4f00b6('0x10f')](this[_0x4f00b6('0x141')][_0x4f00b6('0x10a')](this,_0x1d960e));break;}},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')]['changeFaceGraphicBitmap']=function(_0x26cf0c){const _0x25e0a2=_0x4d8ff4,_0x1c887d=Sprite_FieldGaugeATB['Settings'],_0x39c61b=_0x1c887d[_0x25e0a2('0x140')],_0x174511=this['_graphicFaceIndex'];this[_0x25e0a2('0x56')][_0x25e0a2('0x12f')]=new Bitmap(_0x39c61b,_0x39c61b);const _0x1e0e7f=this[_0x25e0a2('0x56')][_0x25e0a2('0x12f')],_0x3727ef=ImageManager['faceWidth'],_0x349557=ImageManager['faceHeight'],_0x311373=ImageManager['faceWidth'],_0x53c807=ImageManager[_0x25e0a2('0xf7')],_0x27e752=_0x174511%0x4*_0x3727ef+(_0x3727ef-_0x311373)/0x2,_0x1b6fcc=Math[_0x25e0a2('0x1da')](_0x174511/0x4)*_0x349557+(_0x349557-_0x53c807)/0x2;_0x1e0e7f[_0x25e0a2('0xfd')](_0x26cf0c,_0x27e752,_0x1b6fcc,_0x311373,_0x53c807,0x0,0x0,_0x39c61b,_0x39c61b);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')]['changeIconGraphicBitmap']=function(_0x1a5c77){const _0xcd4536=_0x4d8ff4,_0x35e33a=Sprite_FieldGaugeATB[_0xcd4536('0x5f')],_0x512370=_0x35e33a[_0xcd4536('0x140')],_0x3fc8e1=this[_0xcd4536('0xb7')];this[_0xcd4536('0x56')][_0xcd4536('0x12f')]=new Bitmap(_0x512370,_0x512370);const _0x2df94c=this[_0xcd4536('0x56')][_0xcd4536('0x12f')],_0x5f1a5c=ImageManager[_0xcd4536('0x1a8')],_0x5ef042=ImageManager[_0xcd4536('0xe1')],_0x1d2d6c=_0x3fc8e1%0x10*_0x5f1a5c,_0x1afb76=Math[_0xcd4536('0x1da')](_0x3fc8e1/0x10)*_0x5ef042;_0x2df94c[_0xcd4536('0xfd')](_0x1a5c77,_0x1d2d6c,_0x1afb76,_0x5f1a5c,_0x5ef042,0x0,0x0,_0x512370,_0x512370);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x141')]=function(_0x4748bb){const _0x5ac94b=_0x4d8ff4,_0x511082=Sprite_FieldGaugeATB[_0x5ac94b('0x5f')],_0x3be5e2=_0x511082[_0x5ac94b('0x140')];this[_0x5ac94b('0x56')][_0x5ac94b('0x12f')]=new Bitmap(_0x3be5e2,_0x3be5e2);const _0x2a45e4=this[_0x5ac94b('0x56')][_0x5ac94b('0x12f')],_0x2c4e8e=0x9,_0x45d32e=0x6,_0x4404dd=_0x4748bb[_0x5ac94b('0x18c')]/_0x2c4e8e,_0x1fe43a=_0x4748bb['height']/_0x45d32e,_0x598fe1=Math[_0x5ac94b('0x13d')](0x1,_0x3be5e2/_0x4404dd,_0x3be5e2/_0x1fe43a),_0x62fdef=_0x4404dd*_0x598fe1,_0x5e4763=_0x1fe43a*_0x598fe1,_0x320af8=Math[_0x5ac94b('0x73')]((_0x3be5e2-_0x62fdef)/0x2),_0x48f88b=Math[_0x5ac94b('0x73')]((_0x3be5e2-_0x5e4763)/0x2);_0x2a45e4['blt'](_0x4748bb,0x0,0x0,_0x4404dd,_0x1fe43a,_0x320af8,_0x48f88b,_0x62fdef,_0x5e4763);},Sprite_FieldMarkerATB['prototype'][_0x4d8ff4('0x8d')]=function(_0xbbb815){const _0x66636e=_0x4d8ff4,_0x29a551=Sprite_FieldGaugeATB['Settings'],_0x37fc06=_0x29a551[_0x66636e('0x140')];this[_0x66636e('0x56')][_0x66636e('0x12f')]=new Bitmap(_0x37fc06,_0x37fc06);const _0x42e96d=this[_0x66636e('0x56')]['bitmap'],_0x57d5d3=Math[_0x66636e('0x13d')](0x1,_0x37fc06/_0xbbb815[_0x66636e('0x18c')],_0x37fc06/_0xbbb815[_0x66636e('0x1b')]),_0x670370=_0xbbb815[_0x66636e('0x18c')]*_0x57d5d3,_0x381523=_0xbbb815[_0x66636e('0x1b')]*_0x57d5d3,_0x363ea9=Math[_0x66636e('0x73')]((_0x37fc06-_0x670370)/0x2),_0x4ff0b4=Math[_0x66636e('0x73')]((_0x37fc06-_0x381523)/0x2);_0x42e96d['blt'](_0xbbb815,0x0,0x0,_0xbbb815[_0x66636e('0x18c')],_0xbbb815[_0x66636e('0x1b')],_0x363ea9,_0x4ff0b4,_0x670370,_0x381523);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x1e0')]=function(){const _0x248d27=_0x4d8ff4,_0x248a56=this[_0x248d27('0xe9')]();if(!_0x248a56)return;if(!_0x248a56[_0x248d27('0xfa')]())return;if(this['_graphicHue']===_0x248a56['battlerHue']())return;this[_0x248d27('0x1bd')]=_0x248a56[_0x248d27('0x1e1')]();if(_0x248a56[_0x248d27('0x17b')]())this['_graphicHue']=0x0;this[_0x248d27('0x56')][_0x248d27('0x2e')](this[_0x248d27('0x1bd')]);},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')]['updateLetter']=function(){const _0x2c590f=_0x4d8ff4;if(!this[_0x2c590f('0x9b')])return;const _0xce33db=this[_0x2c590f('0xe9')]();if(!_0xce33db)return;if(this[_0x2c590f('0x159')]===_0xce33db[_0x2c590f('0x159')]&&this[_0x2c590f('0x198')]===_0xce33db[_0x2c590f('0x198')])return;this[_0x2c590f('0x159')]=_0xce33db[_0x2c590f('0x159')],this['_plural']=_0xce33db['_plural'];const _0x4865a8=Sprite_FieldGaugeATB[_0x2c590f('0x5f')],_0x48e812=_0x4865a8['MarkerSize'],_0x36497f=Math[_0x2c590f('0x1da')](_0x48e812/0x2),_0x4057f3=this[_0x2c590f('0x9b')][_0x2c590f('0x12f')];_0x4057f3[_0x2c590f('0x49')]();if(!this[_0x2c590f('0x198')])return;_0x4057f3[_0x2c590f('0x5b')]=_0x4865a8[_0x2c590f('0x161')]||$gameSystem[_0x2c590f('0xee')](),_0x4057f3[_0x2c590f('0x90')]=_0x4865a8[_0x2c590f('0xc3')]||0x10,_0x4057f3['drawText'](this[_0x2c590f('0x159')],0x2,_0x36497f,_0x48e812-0x4,_0x36497f-0x2,'right');},Sprite_FieldMarkerATB[_0x4d8ff4('0x64')][_0x4d8ff4('0x83')]=function(){const _0x5b5b18=_0x4d8ff4,_0x165103=this['battler']();if(!_0x165103)return;const _0xd278ea=_0x165103[_0x5b5b18('0xe9')]();if(!_0xd278ea)return;const _0x5f5bd9=_0xd278ea['mainSprite']();if(!_0x5f5bd9)return;this[_0x5b5b18('0x61')](_0x5f5bd9[_0x5b5b18('0x14f')]);};
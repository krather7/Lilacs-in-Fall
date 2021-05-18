//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
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
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Turn Order Display
 * 
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
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
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Enemy Notetags
 * - Changes the slot graphic used for the enemy (actors do not apply) to a
 *   specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
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
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
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
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
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
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
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
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
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
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
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
 * Slot Sprites
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
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
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
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
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
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
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
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
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
 * @command SystemTurnOrderVisibility
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
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
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
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
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
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
 * @text Slot Sprites
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
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
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
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
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
 * @default 19
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
 * @default 19
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
 */
//=============================================================================

const _0x3ee1=['loadSystem','_autoBattle','initialize','getNextSubject','isPassCTB','applyGlobalBattleSystemCTBEffects','%1FlashDuration','getCtbCastTimeRate','STRUCT','clearTpbChargeTime','faceWidth','toUpperCase','EVAL','Mechanics','DisplayPosition','_graphicSv','aQxgB','return\x200','containerPosition','face','odKVm','bind','battlerHue','opacity','hasSvBattler','prototype','qlytJ','TurnOrderCTBGraphicFaceIndex','BattleManager_initMembers','postEndActionCTB','_graphicHue','Armor-%1-%2','HIYNQ','CTB','changeSvActorGraphicBitmap','gOedY','SubjectDistance','_positionTargetX','max','faceName','skills','svactor','checkPosition','fillRect','enemy','EnemyBattlerFaceName','BattleManager_battleSys','updatePosition','traitObjects','Nzpca','#000000','svBattlerName','IconSet','Scene_Boot_onDatabaseLoaded','VyISZ','ticksLeft','CSCNO','ehAPU','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_graphicFaceName','battler','createBackgroundSprite','isHorz','format','center','_index','_graphicFaceIndex','actor','isCtbCastingState','registerCommand','bottom','defaultPosition','isAlive','updateBattleContainerOrder','%1TextColor','updateAllTpbBattlersCTB','MFPFI','_logWindow','ARRAYEVAL','_actionBattlers','processUpdateGraphic','Game_Battler_tpbAcceleration','updateAllTpbBattlers','KvLXY','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','RuTKA','setText','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','dTDDX','WuQet','allBattleMembers','initTpbChargeTimeCTB','_ctbTurnOrderGraphicType','createTurnOrderCTBGraphicType','updateTpb','initMembers','placeGauge','updateTpbChargeTime','%1AnimationID','getBattleSystem','SpriteThin','ePIBD','JSON','_isAlive','createTurnOrderCTBGraphicIconIndex','onDatabaseLoaded','requestFauxAnimation','_ctbNeedsPartyCommand','TotalVertSprites','startFade','fSTsR','width','initBattleSystemCTB','getCurrentTurnOrderPositionCTB','removeCurrentAction','lLeUH','faceHeight','nbrFq','some','_graphicType','children','updateTurnOrder','anchor','Game_Battler_onRestrict','maxBattleMembers','ZSVYF','create','gradientFillRect','xddTW','_blendColor','applyTpbPenalty','VcKcI','isActiveTpb','Game_Action_applyItemUserEffect','loadSvEnemy','ctbTicksToGoal','Game_Battler_updateTpbChargeTime','BattleManager_updateTurn','ready','push','startAction','processTurn','DisplayOffsetY','RegExp','MAX_SAFE_INTEGER','Game_Battler_tpbSpeed','_position','ScreenBuffer','isBattleSystemCTBTurnOrderVisible','roJXV','applyBattleSystemCTBUserEffect','createTurnOrderCTBGraphicFaceIndex','updateTpbBattler','TurnOrderCTBGraphicFaceName','Effect','note','_backgroundSprite','isDead','_statusWindow','TTQYl','BattleSystemCTB','usQjR','repositionLogWindowCTB','bitmapHeight','tDwQr','YAGor','_tpbCastTime','ceil','ShowMarkerBg','IconIndex','fontSize','Game_Battler_initTpbChargeTime','QEeVx','(?:GAUGE|TIME|SPEED)','FUNC','AEyHK','%1Mute','compareBattlerSprites','update','updateTurn','Cast','setTurnOrderCTB','TpbCastTimeJS','iYDdA','Actor','version','VnLFJ','EnemyBattlerIcon','SpriteLength','_positionTargetY','Actors','isCtbChargingState','State-%1-%2','lWqbi','endAction','createAllWindows','isEnemy','TpbSpeedCalcJS','XCOwo','ActorBattlerType','BattleManager_updateAllTpbBattlers','setCtbAfterSpeed','Delay','Actor-%1-%2','indexOf','createRateJS','ctbTicksToGoalAddedCastTime','iconHeight','updateGraphic','ConvertParams','_tpbState','checkOpacity','_isAppeared','_positionDuration','pxGcD','Enemy-%1-%2','updateLetter','setCTBGraphicIconIndex','trim','top','Enemies','createOrderJS','concat','exit','Scene_Battle_createAllWindows','NpFOO','isSideView','XiSvN','Game_Battler_updateTpbCastTime','min','VisuMZ_0_CoreEngine','applyCTBPenalty','_graphicEnemy','isAnyBattlerReadyCTB','processTurnCTB','wpgXp','_ctbTurnOrderFaceName','isActor','mUfQr','tpbAcceleration','includes','right','find','Game_Battler_tpbRequiredCastTime','mainSprite','JwIMx','requestMotionRefresh','updateTurnOrderCTB','clear','Skill-%1-%2','changeIconGraphicBitmap','pmPMm','updateSelectionEffect','call','tpbRequiredCastTime','name','SystemTurnOrderVisibility','OzLEc','round','_graphicIconIndex','process_VisuMZ_BattleSystemCTB_CreateRegExp','processTurnOrderChangeCTB','After','tpbRelativeSpeed','addChild','windowRect','createBorderSprite','BDgby','isInputting','ARRAYSTR','parameters','_onRestrictBypassCtbReset','isAttack','setBattleSystemCTBTurnOrderVisible','Game_BattlerBase_appear','filter','battleSys','process_VisuMZ_BattleSystemCTB_JS_Notetags','reduce','updateTurnCTB','%1FlashColor','BattlerRelativeSpeedJS','fpAAN','XgQKx','ARRAYNUM','updateTpbCastTimeCTB','_isBattleOver','_ctbAfterSpeed','prepare','_ctbTurnOrderWindow','loadSvActor','%1\x20%2\x20%3','Game_Battler_clearTpbChargeTime','RepositionTopForHelp','MIN_SAFE_INTEGER','updateGraphicHue','sWCuB','BorderThickness','Window_Help_setItem','turn','UpdateFrames','Lkiqx','Game_Battler_tpbRelativeSpeed','cAkFG','TpbAccelerationJS','Window_StatusBase_placeGauge','tpbSpeed','aliveMembers','updatePadding','lspGV','rotateCTBSprites','clearTurnOrderCTBGraphics','setHue','opLCi','Order','Exmsl','_turnOrderInnerSprite','setCtbChargeTime','subject','createInitialPositions','_fadeTarget','Visible','addLoadListener','battlerName','DisplayOffsetX','floor','createKeyJS','_ctbTurnOrderVisible','BattleManager_endAction','TurnOrderCTBGraphicIconIndex','fontFace','drawText','TpbBaseSpeedCalcJS','preEndActionCTB','_turnOrderContainer','startBattle','CtbTurnOrderActorIcon','onRestrict','updateTpbCastTime','urYsI','canMove','Game_Battler_tpbBaseSpeed','MEPWf','RepositionTopHelpY','Item-%1-%2','REgev','applyItemUserEffect','_phase','visible','_homeX','setItem','match','createBattlerSprites','speed','_fadeDuration','RCCjb','constructor','bitmap','KLnGH','changeCtbCastTime','setCtbCastTime','UWHiy','padding','EnemyBattlerType','FaceName','EnemyBattlerFaceIndex','map','ecHow','setBlendColor','STR','Yybje','_ctbTurnOrderIconIndex','isSceneBattle','iconWidth','changeFaceGraphicBitmap','CtbTurnOrderEnemyFace','onTpbCharged','casting','appear','RepositionTopHelpX','containerWindow','ARRAYFUNC','loadEnemy','icon','getColor','Game_Battler_applyTpbPenalty','JyhGR','%1PopupText','startActorInput','numActions','ZZwAn','OrderDirection','_tpbChargeTime','initTpbChargeTime','YeuKQ','parse','DZSdu','bitmapWidth','ARRAYJSON','isCTB','item','hsFBh','isTpb','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Enemy','TurnOrderCTBGraphicType','setupTextPopup','_subject','Charge','applyGlobal','InitialGaugeJS','updateVisibility','%1BorderColor','updateOpacity','uLJzz','EnemyBattlerFontSize','_helpWindow','ActorBattlerIcon','members','charging','length','blt','_scene','%1BgColor2','BattleManager_startBattle','PMFPP','PUOVI','_ctbTurnOrderFaceIndex','%1BgColor1','Game_System_initialize','DxQYy','UfUEq','description','clearRect','sort','rotateCTBSprite','rotateDupeNumber','FHuPP','TFsVa','height','status','(?:CTB)','_letter','_plural','changeEnemyGraphicBitmap','isValid','EnemyBattlerDrawLetter','createLetterSprite','CtbTurnOrderClearActorGraphic','changeCtbChargeTime','_letterSprite','_homeY','Settings','qKWOy','getChildIndex','nCnzC','CtbTurnOrderEnemyIcon','createTurnOrderCTBGraphicFaceName','hide','_graphicSprite','currentAction','isAppeared','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','jOgel','BattleManager_isActiveTpb','_unit','%1SystemBorder','tpbBaseSpeed','kQWDY','_dupe','ctbStopped','createGraphicSprite','createChildren','yXfbp','applyItemBattleSystemCTBUserEffect','changeTurnOrderByCTB','Svegj','Game_BattlerBase_hide','TotalHorzSprites','Weapon-%1-%2','Rush','onCtbOrderChange'];(function(_0x10ff7a,_0x3ee167){const _0x4e7646=function(_0x3cadfb){while(--_0x3cadfb){_0x10ff7a['push'](_0x10ff7a['shift']());}};_0x4e7646(++_0x3ee167);}(_0x3ee1,0x67));const _0x4e76=function(_0x10ff7a,_0x3ee167){_0x10ff7a=_0x10ff7a-0x0;let _0x4e7646=_0x3ee1[_0x10ff7a];return _0x4e7646;};const _0x4d175e=_0x4e76;var label=_0x4d175e('0x39'),tier=tier||0x0,dependencies=[_0x4d175e('0x7f'),'VisuMZ_1_BattleCore'],pluginData=$plugins[_0x4d175e('0xac')](function(_0x207a1e){const _0x414f3b=_0x4d175e;return _0x207a1e[_0x414f3b('0x151')]&&_0x207a1e[_0x414f3b('0x149')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4d175e('0x15d')]=VisuMZ[label][_0x4d175e('0x15d')]||{},VisuMZ[_0x4d175e('0x6a')]=function(_0x62a55b,_0xa54999){const _0x1259f7=_0x4d175e;for(const _0x207e77 in _0xa54999){if(_0x1259f7('0x168')!==_0x1259f7('0x3d')){if(_0x207e77[_0x1259f7('0xf8')](/(.*):(.*)/i)){const _0x3681a2=String(RegExp['$1']),_0x592462=String(RegExp['$2'])[_0x1259f7('0x186')]()['trim']();let _0x22f6e4,_0xdabd0b,_0x1bf23c;switch(_0x592462){case'NUM':_0x22f6e4=_0xa54999[_0x207e77]!==''?Number(_0xa54999[_0x207e77]):0x0;break;case _0x1259f7('0xb5'):_0xdabd0b=_0xa54999[_0x207e77]!==''?JSON[_0x1259f7('0x124')](_0xa54999[_0x207e77]):[],_0x22f6e4=_0xdabd0b[_0x1259f7('0x107')](_0x5b6dd1=>Number(_0x5b6dd1));break;case _0x1259f7('0x187'):_0x22f6e4=_0xa54999[_0x207e77]!==''?eval(_0xa54999[_0x207e77]):null;break;case _0x1259f7('0x1c9'):_0xdabd0b=_0xa54999[_0x207e77]!==''?JSON['parse'](_0xa54999[_0x207e77]):[],_0x22f6e4=_0xdabd0b[_0x1259f7('0x107')](_0x4de7cb=>eval(_0x4de7cb));break;case _0x1259f7('0x1e1'):_0x22f6e4=_0xa54999[_0x207e77]!==''?JSON[_0x1259f7('0x124')](_0xa54999[_0x207e77]):'';break;case _0x1259f7('0x127'):_0xdabd0b=_0xa54999[_0x207e77]!==''?JSON['parse'](_0xa54999[_0x207e77]):[],_0x22f6e4=_0xdabd0b['map'](_0x37e26f=>JSON[_0x1259f7('0x124')](_0x37e26f));break;case _0x1259f7('0x47'):_0x22f6e4=_0xa54999[_0x207e77]!==''?new Function(JSON['parse'](_0xa54999[_0x207e77])):new Function(_0x1259f7('0x18c'));break;case _0x1259f7('0x116'):_0xdabd0b=_0xa54999[_0x207e77]!==''?JSON[_0x1259f7('0x124')](_0xa54999[_0x207e77]):[],_0x22f6e4=_0xdabd0b[_0x1259f7('0x107')](_0x5e7f2b=>new Function(JSON[_0x1259f7('0x124')](_0x5e7f2b)));break;case _0x1259f7('0x10a'):_0x22f6e4=_0xa54999[_0x207e77]!==''?String(_0xa54999[_0x207e77]):'';break;case _0x1259f7('0xa6'):_0xdabd0b=_0xa54999[_0x207e77]!==''?JSON[_0x1259f7('0x124')](_0xa54999[_0x207e77]):[],_0x22f6e4=_0xdabd0b[_0x1259f7('0x107')](_0x2b1931=>String(_0x2b1931));break;case _0x1259f7('0x183'):_0x1bf23c=_0xa54999[_0x207e77]!==''?JSON[_0x1259f7('0x124')](_0xa54999[_0x207e77]):{},_0x22f6e4=VisuMZ[_0x1259f7('0x6a')]({},_0x1bf23c);break;case'ARRAYSTRUCT':_0xdabd0b=_0xa54999[_0x207e77]!==''?JSON[_0x1259f7('0x124')](_0xa54999[_0x207e77]):[],_0x22f6e4=_0xdabd0b[_0x1259f7('0x107')](_0x15701d=>VisuMZ[_0x1259f7('0x6a')]({},JSON[_0x1259f7('0x124')](_0x15701d)));break;default:continue;}_0x62a55b[_0x3681a2]=_0x22f6e4;}}else{function _0x31da71(){const _0x335a1b=_0x1259f7;if(_0x1c558a['isCTB']()&&_0x2b4528==='time')return;_0x314b5e[_0x335a1b('0x39')][_0x335a1b('0xca')]['call'](this,_0x3fec8b,_0x30be3a,_0x223dd8,_0x583d42);}}}return _0x62a55b;},(_0x4b3663=>{const _0x446d83=_0x4d175e,_0x5b4c17=_0x4b3663['name'];for(const _0x2a6719 of dependencies){if(_0x446d83('0xc8')==='LbfhB'){function _0x5b7948(){const _0x98181e=_0x446d83;this[_0x98181e('0x1da')](_0x5da335,_0x5be317,_0xad2cff),_0x4ed1a7[_0x98181e('0x194')][_0x98181e('0x17d')][_0x98181e('0x96')](this),this['createChildren']();}}else{if(!Imported[_0x2a6719]){alert(_0x446d83('0x12c')[_0x446d83('0x1ba')](_0x5b4c17,_0x2a6719)),SceneManager[_0x446d83('0x78')]();break;}}}const _0x38a1e9=_0x4b3663[_0x446d83('0x149')];if(_0x38a1e9['match'](/\[Version[ ](.*?)\]/i)){if(_0x446d83('0xf2')===_0x446d83('0xf2')){const _0x35fe2b=Number(RegExp['$1']);_0x35fe2b!==VisuMZ[label][_0x446d83('0x52')]&&(alert(_0x446d83('0x1b5')[_0x446d83('0x1ba')](_0x5b4c17,_0x35fe2b)),SceneManager[_0x446d83('0x78')]());}else{function _0x1c0695(){const _0x593026=_0x446d83;let _0xf1916d=_0xb080b2['BattleSystemCTB']['Settings'][_0x593026('0x188')][_0x593026('0xc9')]['call'](this,this);const _0x5b0a5d=0x0;return _0xf1916d+_0x5b0a5d;}}}if(_0x38a1e9['match'](/\[Tier[ ](\d+)\]/i)){const _0x3fee77=Number(RegExp['$1']);if(_0x3fee77<tier)alert(_0x446d83('0x167')[_0x446d83('0x1ba')](_0x5b4c17,_0x3fee77,tier)),SceneManager[_0x446d83('0x78')]();else{if(_0x446d83('0x16d')!==_0x446d83('0x7c'))tier=Math['max'](_0x3fee77,tier);else{function _0x211248(){const _0x2cd79d=_0x446d83,_0xab8ab1=this[_0x2cd79d('0x6e')];this['x']=(this['x']*(_0xab8ab1-0x1)+this['_positionTargetX'])/_0xab8ab1,this['y']=(this['y']*(_0xab8ab1-0x1)+this[_0x2cd79d('0x56')])/_0xab8ab1,this[_0x2cd79d('0x6e')]--;}}}}VisuMZ[_0x446d83('0x6a')](VisuMZ[label][_0x446d83('0x15d')],_0x4b3663[_0x446d83('0xa7')]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x4d175e('0x98')],_0x4d175e('0xe9'),_0x40b788=>{const _0x2f04d4=_0x4d175e;VisuMZ[_0x2f04d4('0x6a')](_0x40b788,_0x40b788);const _0x2b9427=_0x40b788[_0x2f04d4('0x57')],_0x42c4a3=_0x40b788['IconIndex'];for(const _0x1a70c8 of _0x2b9427){const _0x15c32b=$gameActors['actor'](_0x1a70c8);if(!_0x15c32b)continue;_0x15c32b['_ctbTurnOrderGraphicType']=_0x2f04d4('0x118'),_0x15c32b[_0x2f04d4('0x10c')]=_0x42c4a3;}}),PluginManager['registerCommand'](pluginData[_0x4d175e('0x98')],_0x4d175e('0x159'),_0x2d8208=>{const _0x4c7ad1=_0x4d175e;VisuMZ[_0x4c7ad1('0x6a')](_0x2d8208,_0x2d8208);const _0x2d7db6=_0x2d8208[_0x4c7ad1('0x57')];for(const _0xdbd36c of _0x2d7db6){const _0x131466=$gameActors[_0x4c7ad1('0x1be')](_0xdbd36c);if(!_0x131466)continue;_0x131466[_0x4c7ad1('0xd0')]();}}),PluginManager[_0x4d175e('0x1c0')](pluginData[_0x4d175e('0x98')],_0x4d175e('0x161'),_0x25bff6=>{const _0x5a588d=_0x4d175e;VisuMZ[_0x5a588d('0x6a')](_0x25bff6,_0x25bff6);const _0x30b5bb=_0x25bff6[_0x5a588d('0x75')],_0x4b1186=_0x25bff6[_0x5a588d('0x42')];for(const _0x398d15 of _0x30b5bb){const _0x9710e9=$gameTroop[_0x5a588d('0x13b')]()[_0x398d15];if(!_0x9710e9)continue;_0x9710e9[_0x5a588d('0x1d7')]='icon',_0x9710e9['_ctbTurnOrderIconIndex']=_0x4b1186;}}),PluginManager['registerCommand'](pluginData[_0x4d175e('0x98')],_0x4d175e('0x110'),_0x35b4db=>{const _0x57f238=_0x4d175e;VisuMZ[_0x57f238('0x6a')](_0x35b4db,_0x35b4db);const _0x2f66ec=_0x35b4db['Enemies'],_0x5b587b=_0x35b4db[_0x57f238('0x105')],_0x1a2a60=_0x35b4db['FaceIndex'];for(const _0x197745 of _0x2f66ec){const _0x490c2b=$gameTroop[_0x57f238('0x13b')]()[_0x197745];if(!_0x490c2b)continue;_0x490c2b[_0x57f238('0x1d7')]=_0x57f238('0x18e'),_0x490c2b[_0x57f238('0x85')]=_0x5b587b,_0x490c2b[_0x57f238('0x144')]=_0x197745;}}),PluginManager['registerCommand'](pluginData[_0x4d175e('0x98')],'CtbTurnOrderClearEnemyGraphic',_0x2963e9=>{const _0x4f61e0=_0x4d175e;VisuMZ[_0x4f61e0('0x6a')](_0x2963e9,_0x2963e9);const _0x43ca0e=_0x2963e9[_0x4f61e0('0x75')];for(const _0x51380c of _0x43ca0e){if(_0x4f61e0('0x175')!==_0x4f61e0('0x3e')){const _0x1ed4dd=$gameTroop['members']()[_0x51380c];if(!_0x1ed4dd)continue;_0x1ed4dd[_0x4f61e0('0xd0')]();}else{function _0x5ed074(){const _0xd0bcde=_0x4f61e0;_0x59774f=_0x24f35d[_0xd0bcde('0x1a1')](_0x412a30,_0x8b439d);}}}}),PluginManager[_0x4d175e('0x1c0')](pluginData[_0x4d175e('0x98')],_0x4d175e('0x99'),_0x4ab185=>{const _0x3d73f5=_0x4d175e;VisuMZ['ConvertParams'](_0x4ab185,_0x4ab185);const _0x540b3e=_0x4ab185[_0x3d73f5('0xda')];$gameSystem[_0x3d73f5('0xaa')](_0x540b3e);}),VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x1b0')]=Scene_Boot['prototype'][_0x4d175e('0x2')],Scene_Boot[_0x4d175e('0x194')][_0x4d175e('0x2')]=function(){const _0x2e8d7b=_0x4d175e;VisuMZ['BattleSystemCTB'][_0x2e8d7b('0x1b0')][_0x2e8d7b('0x96')](this),this[_0x2e8d7b('0x9d')](),this['process_VisuMZ_BattleSystemCTB_JS_Notetags']();},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x28')]={},Scene_Boot[_0x4d175e('0x194')][_0x4d175e('0x9d')]=function(){const _0x188fcc=_0x4d175e,_0x2bcc5e=VisuMZ['BattleSystemCTB'][_0x188fcc('0x28')],_0x4d0d45=_0x188fcc('0x1cf'),_0x3e6cce=[_0x188fcc('0x131'),_0x188fcc('0x4d'),'After'];for(const _0x5cd02b of _0x3e6cce){const _0x384721=_0x4d0d45['format'](_0x5cd02b[_0x188fcc('0x186')]()[_0x188fcc('0x73')](),_0x188fcc('0x152'),'(?:GAUGE|TIME|SPEED)'),_0x202336=new RegExp(_0x384721,'i');VisuMZ[_0x188fcc('0x39')][_0x188fcc('0x28')][_0x5cd02b]=_0x202336;}VisuMZ[_0x188fcc('0x39')][_0x188fcc('0x28')]['OrderJS']=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot['prototype'][_0x4d175e('0xae')]=function(){const _0x1994d0=_0x4d175e,_0x3c97b3=$dataSkills[_0x1994d0('0x77')]($dataItems),_0x42bee0=[_0x1994d0('0x131'),_0x1994d0('0x4d'),_0x1994d0('0x9f')];for(const _0x53de91 of _0x3c97b3){if(_0x1994d0('0xb4')==='XgQKx'){if(!_0x53de91)continue;for(const _0x23ee12 of _0x42bee0){if(_0x1994d0('0x9a')!==_0x1994d0('0x9a')){function _0x45ecf1(){return _0x30a2af(_0x26936f['$1']);}}else VisuMZ[_0x1994d0('0x39')][_0x1994d0('0x66')](_0x53de91,_0x23ee12);}VisuMZ['BattleSystemCTB'][_0x1994d0('0x76')](_0x53de91,_0x1994d0('0xd3'));}else{function _0x54a611(){const _0x3e84f0=_0x1994d0;this[_0x3e84f0('0x6b')]===_0x3e84f0('0x13c')&&(this[_0x3e84f0('0x121')]+=this[_0x3e84f0('0x88')](),this['_tpbChargeTime']>=0x1&&this[_0x3e84f0('0x111')]());}}}},VisuMZ[_0x4d175e('0x39')]['JS']={},VisuMZ['BattleSystemCTB']['createRateJS']=function(_0x44dafa,_0x15a163){const _0x1cad27=_0x4d175e,_0x10dad6=_0x44dafa['note'];if(_0x10dad6[_0x1cad27('0xf8')](VisuMZ[_0x1cad27('0x39')]['RegExp'][_0x15a163])){const _0x45babc=String(RegExp['$1']),_0x4bd3e1=_0x1cad27('0x1d2')[_0x1cad27('0x1ba')](_0x45babc,_0x15a163),_0x5f30c9=VisuMZ[_0x1cad27('0x39')]['createKeyJS'](_0x44dafa,_0x15a163);VisuMZ[_0x1cad27('0x39')]['JS'][_0x5f30c9]=new Function(_0x4bd3e1);}},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x76')]=function(_0x204c40,_0x3b102d){const _0x77a223=_0x4d175e,_0x30f3d2=_0x204c40[_0x77a223('0x34')];if(_0x30f3d2['match'](VisuMZ['BattleSystemCTB']['RegExp']['OrderJS'])){const _0x4038ce=String(RegExp['$1']),_0xda76f2='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x77a223('0x1ba')](_0x4038ce,_0x3b102d),_0x3f5c3d=VisuMZ[_0x77a223('0x39')][_0x77a223('0xdf')](_0x204c40,_0x3b102d);VisuMZ[_0x77a223('0x39')]['JS'][_0x3f5c3d]=new Function(_0xda76f2);}},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0xdf')]=function(_0x2437b8,_0x23d223){const _0x3412f6=_0x4d175e;let _0x16f81b='';if($dataActors[_0x3412f6('0x89')](_0x2437b8))_0x16f81b=_0x3412f6('0x64')[_0x3412f6('0x1ba')](_0x2437b8['id'],_0x23d223);if($dataClasses[_0x3412f6('0x89')](_0x2437b8))_0x16f81b='Class-%1-%2'['format'](_0x2437b8['id'],_0x23d223);if($dataSkills[_0x3412f6('0x89')](_0x2437b8))_0x16f81b=_0x3412f6('0x92')[_0x3412f6('0x1ba')](_0x2437b8['id'],_0x23d223);if($dataItems[_0x3412f6('0x89')](_0x2437b8))_0x16f81b=_0x3412f6('0xf1')[_0x3412f6('0x1ba')](_0x2437b8['id'],_0x23d223);if($dataWeapons[_0x3412f6('0x89')](_0x2437b8))_0x16f81b=_0x3412f6('0x178')[_0x3412f6('0x1ba')](_0x2437b8['id'],_0x23d223);if($dataArmors[_0x3412f6('0x89')](_0x2437b8))_0x16f81b=_0x3412f6('0x19a')[_0x3412f6('0x1ba')](_0x2437b8['id'],_0x23d223);if($dataEnemies[_0x3412f6('0x89')](_0x2437b8))_0x16f81b=_0x3412f6('0x70')[_0x3412f6('0x1ba')](_0x2437b8['id'],_0x23d223);if($dataStates['includes'](_0x2437b8))_0x16f81b=_0x3412f6('0x59')[_0x3412f6('0x1ba')](_0x2437b8['id'],_0x23d223);return _0x16f81b;},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x197')]=BattleManager['initMembers'],BattleManager[_0x4d175e('0x1da')]=function(){const _0x1a3dba=_0x4d175e;VisuMZ['BattleSystemCTB'][_0x1a3dba('0x197')][_0x1a3dba('0x96')](this),this[_0x1a3dba('0x4')]=!![];},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x1a9')]=BattleManager[_0x4d175e('0xad')],BattleManager['battleSys']=function(){const _0x1257e1=_0x4d175e;if(this['isCTB']())return _0x1257e1('0x19c');return VisuMZ[_0x1257e1('0x39')][_0x1257e1('0x1a9')][_0x1257e1('0x96')](this);},BattleManager[_0x4d175e('0x128')]=function(){const _0x568622=_0x4d175e;return $gameSystem[_0x568622('0x1de')]()===_0x568622('0x19c');},VisuMZ[_0x4d175e('0x39')]['BattleManager_isTpb']=BattleManager[_0x4d175e('0x12b')],BattleManager[_0x4d175e('0x12b')]=function(){const _0x1beb27=_0x4d175e;if(this['isCTB']())return!![];return VisuMZ['BattleSystemCTB']['BattleManager_isTpb'][_0x1beb27('0x96')](this);},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x169')]=BattleManager['isActiveTpb'],BattleManager[_0x4d175e('0x1d')]=function(){const _0x38976f=_0x4d175e;if(this[_0x38976f('0x128')]())return![];return VisuMZ[_0x38976f('0x39')]['BattleManager_isActiveTpb'][_0x38976f('0x96')](this);},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x22')]=BattleManager[_0x4d175e('0x4c')],BattleManager[_0x4d175e('0x4c')]=function(_0x58bff1){const _0x70d7a6=_0x4d175e;if(this['isCTB']())this[_0x70d7a6('0xb0')](_0x58bff1);else{if('idiRw'!=='sKiYz')VisuMZ[_0x70d7a6('0x39')][_0x70d7a6('0x22')]['call'](this,_0x58bff1);else{function _0x314f94(){const _0x1c598f=_0x70d7a6,_0x50eea0=this[_0x1c598f('0x1be')]()[_0x1c598f('0x34')];if(_0x50eea0[_0x1c598f('0xf8')](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x1c65ec(_0x100974['$1']);return _0x4d6d4a['Settings'][_0x1c598f('0x13a')];}}}},BattleManager[_0x4d175e('0xb0')]=function(_0x4ab61e){const _0x2ed269=_0x4d175e;$gameParty[_0x2ed269('0x8f')]();for(;;){if(this[_0x2ed269('0x82')]()){if(_0x2ed269('0x19b')===_0x2ed269('0x11b')){function _0x5993fd(){const _0x38676a=_0x2ed269;this[_0x38676a('0xfe')]=new _0x20c7e6(0x48,0x24);const _0x35f929=this[_0x38676a('0x1b7')]()?this[_0x38676a('0x1b7')]()[_0x38676a('0x98')]():'%1\x20%2\x20%3'['format'](this[_0x38676a('0x16a')],this[_0x38676a('0x1bc')],this[_0x38676a('0x16e')]);this[_0x38676a('0xfe')][_0x38676a('0xe4')](_0x35f929,0x0,0x0,0x48,0x24,_0x38676a('0x1bb'));}}else break;}_0x4ab61e&&this[_0x2ed269('0x1d9')](),!this[_0x2ed269('0x130')]&&(this[_0x2ed269('0x130')]=this[_0x2ed269('0x17e')]()),this[_0x2ed269('0x130')]&&(this['processTurn'](),this[_0x2ed269('0x90')]());}},VisuMZ['BattleSystemCTB']['BattleManager_processTurn']=BattleManager[_0x4d175e('0x26')],BattleManager[_0x4d175e('0x26')]=function(){const _0x594141=_0x4d175e;if(this[_0x594141('0x128')]()){if(_0x594141('0xc6')==='Lkiqx')this[_0x594141('0x83')]();else{function _0x346170(){const _0x9c1154=_0x594141;return _0x24374c[_0x9c1154('0x15d')][_0x9c1154('0x177')]*0x14;}}}else VisuMZ[_0x594141('0x39')]['BattleManager_processTurn'][_0x594141('0x96')](this);},BattleManager[_0x4d175e('0x83')]=function(){const _0x8d512b=_0x4d175e,_0x399692=this[_0x8d512b('0x130')],_0x75da19=_0x399692['currentAction']();_0x75da19?(_0x75da19[_0x8d512b('0xb9')](),_0x75da19[_0x8d512b('0x156')]()?(this[_0x8d512b('0x25')](),_0x399692[_0x8d512b('0xb')]()):(_0x399692[_0x8d512b('0xb')](),_0x399692[_0x8d512b('0x62')](0x0),this['endAction'](),this[_0x8d512b('0x130')]=null)):(_0x399692[_0x8d512b('0x62')](0x0),this[_0x8d512b('0x5b')](),this[_0x8d512b('0x130')]=null);},BattleManager['isAnyBattlerReadyCTB']=function(){const _0x40e367=_0x4d175e;if(this[_0x40e367('0x130')])return!![];if(this[_0x40e367('0xf4')]!==_0x40e367('0xc4'))return!![];if(this[_0x40e367('0xa5')]())return!![];if(this[_0x40e367('0x17c')])return![];const _0x3e94fa=this[_0x40e367('0x1d5')]()[_0x40e367('0xac')](_0x597668=>_0x597668&&_0x597668[_0x40e367('0x166')]());return _0x3e94fa[_0x40e367('0xf')](_0x3c9f7f=>_0x3c9f7f[_0x40e367('0x17f')]());},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x17f')]=function(){if(this['isTpbCharged']())return!![];if(this['isTpbReady']())return!![];if(this['isActing']())return!![];return![];},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x61')]=BattleManager[_0x4d175e('0x1cd')],BattleManager[_0x4d175e('0x1cd')]=function(){const _0x1a24a8=_0x4d175e;if(this[_0x1a24a8('0x128')]()){if(_0x1a24a8('0x1d4')!==_0x1a24a8('0x1c7'))this[_0x1a24a8('0x1c6')]();else{function _0x163427(){const _0x49ed43=_0x1a24a8;if(this[_0x49ed43('0x128')]())return![];return _0xc95892[_0x49ed43('0x39')]['BattleManager_isActiveTpb'][_0x49ed43('0x96')](this);}}}else VisuMZ['BattleSystemCTB'][_0x1a24a8('0x61')][_0x1a24a8('0x96')](this);},BattleManager[_0x4d175e('0x1c6')]=function(){const _0x3faf8c=_0x4d175e,_0x4ad886=this[_0x3faf8c('0x1d5')]();_0x4ad886[_0x3faf8c('0x14b')]((_0x229c82,_0x32b0b5)=>{const _0x15d293=_0x3faf8c;return _0x229c82[_0x15d293('0x20')](0x1)-_0x32b0b5[_0x15d293('0x20')](0x1);});for(const _0x37d0dd of _0x4ad886){this[_0x3faf8c('0x31')](_0x37d0dd);}},VisuMZ[_0x4d175e('0x39')]['BattleManager_startBattle']=BattleManager[_0x4d175e('0xe8')],BattleManager['startBattle']=function(){const _0x553ac5=_0x4d175e;VisuMZ[_0x553ac5('0x39')][_0x553ac5('0x141')][_0x553ac5('0x96')](this),this[_0x553ac5('0x90')](!![]);},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0xe1')]=BattleManager[_0x4d175e('0x5b')],BattleManager[_0x4d175e('0x5b')]=function(){const _0x290776=_0x4d175e;this[_0x290776('0xe6')](),VisuMZ[_0x290776('0x39')]['BattleManager_endAction']['call'](this),this['postEndActionCTB']();},BattleManager[_0x4d175e('0xe6')]=function(){const _0x74e2fb=_0x4d175e;if(!this['isCTB']())return;if(this[_0x74e2fb('0x130')]&&this[_0x74e2fb('0x130')][_0x74e2fb('0x11e')]()<=0x0){if('karkF'===_0x74e2fb('0x5a')){function _0x44238e(){const _0x20c3ec=_0x74e2fb;let _0x19d2a1=this[_0x20c3ec('0x126')](),_0x15a1f3=this[_0x20c3ec('0x3c')](),_0x25d120=_0x1949d2[_0x20c3ec('0xc2')];_0x17979a[_0x20c3ec('0xfe')]=new _0x472715(_0x19d2a1,_0x15a1f3);const _0xf24305=_0x20c3ec('0x1ad'),_0x16a180=_0xb46d67['getColor'](_0x202bd4[_0x20c3ec('0x135')['format'](_0xc004fe)]);_0x6e29ca['bitmap'][_0x20c3ec('0x1a6')](0x0,0x0,_0x19d2a1,_0x15a1f3,_0xf24305),_0x19d2a1-=0x2,_0x15a1f3-=0x2,_0x226b7f[_0x20c3ec('0xfe')]['fillRect'](0x1,0x1,_0x19d2a1,_0x15a1f3,_0x16a180),_0x19d2a1-=_0x25d120*0x2,_0x15a1f3-=_0x25d120*0x2,_0x497c09['bitmap'][_0x20c3ec('0x1a6')](0x1+_0x25d120,0x1+_0x25d120,_0x19d2a1,_0x15a1f3,_0xf24305),_0x19d2a1-=0x2,_0x15a1f3-=0x2,_0x25d120+=0x1,_0x19fb99[_0x20c3ec('0xfe')]['clearRect'](0x1+_0x25d120,0x1+_0x25d120,_0x19d2a1,_0x15a1f3);}}else this['rotateCTBSprites']();}},BattleManager[_0x4d175e('0x198')]=function(){const _0x58982a=_0x4d175e;if(!this[_0x58982a('0x128')]())return;this[_0x58982a('0x90')]();if(this[_0x58982a('0x130')]){if(_0x58982a('0x2e')!==_0x58982a('0x2e')){function _0x2dd163(){const _0x33c6e1=_0x58982a;return _0x5b6ba5[_0x33c6e1('0x39')][_0x33c6e1('0xc7')][_0x33c6e1('0x96')](this);}}else this[_0x58982a('0x26')]();}},VisuMZ[_0x4d175e('0x39')]['BattleManager_startActorInput']=BattleManager[_0x4d175e('0x11d')],BattleManager[_0x4d175e('0x11d')]=function(){const _0x162285=_0x4d175e;this['updateTurnOrderCTB'](),VisuMZ[_0x162285('0x39')]['BattleManager_startActorInput'][_0x162285('0x96')](this);},BattleManager['updateTurnOrderCTB']=function(_0x3a6a46){const _0x3c5f41=_0x4d175e;if(!this[_0x3c5f41('0x128')]())return;const _0x5a26bd=SceneManager['_scene'][_0x3c5f41('0xba')];if(!_0x5a26bd)return;_0x5a26bd[_0x3c5f41('0x12')](_0x3a6a46);},BattleManager[_0x4d175e('0xcf')]=function(){const _0x18d721=_0x4d175e;if(!this[_0x18d721('0x128')]())return;const _0x2c06f6=SceneManager[_0x18d721('0x13f')]['_ctbTurnOrderWindow'];if(!_0x2c06f6)return;_0x2c06f6[_0x18d721('0x14c')](this['_subject']);},VisuMZ[_0x4d175e('0x39')]['Game_System_initialize']=Game_System['prototype'][_0x4d175e('0x17d')],Game_System[_0x4d175e('0x194')]['initialize']=function(){const _0x16e8ec=_0x4d175e;VisuMZ['BattleSystemCTB'][_0x16e8ec('0x146')][_0x16e8ec('0x96')](this),this[_0x16e8ec('0x9')]();},Game_System[_0x4d175e('0x194')][_0x4d175e('0x9')]=function(){const _0x18eaa2=_0x4d175e;this[_0x18eaa2('0xe0')]=!![];},Game_System['prototype'][_0x4d175e('0x2d')]=function(){const _0x5ae018=_0x4d175e;return this[_0x5ae018('0xe0')]===undefined&&this[_0x5ae018('0x9')](),this[_0x5ae018('0xe0')];},Game_System[_0x4d175e('0x194')][_0x4d175e('0xaa')]=function(_0x2ff9b0){const _0x260b74=_0x4d175e;if(this['_ctbTurnOrderVisible']===undefined){if(_0x260b74('0x1d0')==='ZzmLj'){function _0x198353(){const _0x47b62d=_0x260b74;if(_0x2e9027['isCTB']()){let _0x20c8ee=_0x25c4b6[_0x47b62d('0x39')][_0x47b62d('0x15d')][_0x47b62d('0x188')][_0x47b62d('0xc9')][_0x47b62d('0x96')](this,this);const _0x69e8d6=0x0;return _0x20c8ee+_0x69e8d6;}else return _0x278b61['BattleSystemCTB'][_0x47b62d('0x1cc')]['call'](this);}}else this[_0x260b74('0x9')]();}this[_0x260b74('0xe0')]=_0x2ff9b0;},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x1e')]=Game_Action[_0x4d175e('0x194')]['applyItemUserEffect'],Game_Action['prototype'][_0x4d175e('0xf3')]=function(_0x60d3b3){const _0xb151f2=_0x4d175e;VisuMZ[_0xb151f2('0x39')][_0xb151f2('0x1e')]['call'](this,_0x60d3b3),this['applyBattleSystemCTBUserEffect'](_0x60d3b3);},Game_Action[_0x4d175e('0x194')][_0x4d175e('0x2f')]=function(_0x354771){const _0x125b64=_0x4d175e;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x125b64('0x128')]())return;if(this[_0x125b64('0x129')]())this[_0x125b64('0x173')](_0x354771);},Game_Action['prototype'][_0x4d175e('0x173')]=function(_0x55707d){const _0x2d2ba8=_0x4d175e,_0x2babbc=this['item']()['note'];if(_0x55707d[_0x2d2ba8('0x58')]()){const _0x2c9d90=VisuMZ[_0x2d2ba8('0x39')]['createKeyJS'](this[_0x2d2ba8('0x129')](),_0x2d2ba8('0x131'));if(VisuMZ[_0x2d2ba8('0x39')]['JS'][_0x2c9d90]){const _0x36f818=VisuMZ['BattleSystemCTB']['JS'][_0x2c9d90][_0x2d2ba8('0x96')](this,this[_0x2d2ba8('0xd7')](),_0x55707d);_0x55707d[_0x2d2ba8('0xd6')](_0x36f818);}_0x2babbc[_0x2d2ba8('0xf8')](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x55707d[_0x2d2ba8('0xd6')](Number(RegExp['$1'])*0.01),_0x2babbc[_0x2d2ba8('0xf8')](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x55707d[_0x2d2ba8('0x15a')](Number(RegExp['$1'])*0.01);}else{if(_0x55707d[_0x2d2ba8('0x1bf')]()){if(_0x2d2ba8('0x53')===_0x2d2ba8('0x53')){const _0x4873e9=VisuMZ[_0x2d2ba8('0x39')]['createKeyJS'](this[_0x2d2ba8('0x129')](),_0x2d2ba8('0x4d'));if(VisuMZ[_0x2d2ba8('0x39')]['JS'][_0x4873e9]){if(_0x2d2ba8('0x172')!==_0x2d2ba8('0x172')){function _0x53a4f7(){const _0x26ca4e=_0x2d2ba8,_0x3388e3=this[_0x26ca4e('0x1b7')]();if(!_0x3388e3)return;if(this[_0x26ca4e('0x0')]===_0x3388e3[_0x26ca4e('0x1c3')]()&&this[_0x26ca4e('0x6d')]===_0x3388e3[_0x26ca4e('0x166')]())return;this[_0x26ca4e('0x0')]=_0x3388e3['isAlive'](),this[_0x26ca4e('0x6d')]===_0x3388e3[_0x26ca4e('0x166')]();let _0x4356e9=this[_0x26ca4e('0x0')]&&this['_isAppeared']?0xff:0x0;this['startFade'](_0x4356e9);}}else{const _0x3a371c=VisuMZ[_0x2d2ba8('0x39')]['JS'][_0x4873e9][_0x2d2ba8('0x96')](this,this[_0x2d2ba8('0xd7')](),_0x55707d);_0x55707d[_0x2d2ba8('0x101')](_0x3a371c);}}if(_0x2babbc['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x2d2ba8('0x16')===_0x2d2ba8('0xec')){function _0x341174(){const _0x426d31=_0x2d2ba8,_0x105f4b=this[_0x426d31('0x1b7')]();if(!_0x105f4b)return;if(!_0x105f4b[_0x426d31('0x5d')]())return;if(this[_0x426d31('0x199')]===_0x105f4b[_0x426d31('0x191')]())return;this[_0x426d31('0x199')]=_0x105f4b[_0x426d31('0x191')]();if(_0x105f4b[_0x426d31('0x193')]())this[_0x426d31('0x199')]=0x0;this[_0x426d31('0x164')][_0x426d31('0xd1')](this[_0x426d31('0x199')]);}}else _0x55707d[_0x2d2ba8('0x101')](Number(RegExp['$1'])*0.01);}if(_0x2babbc[_0x2d2ba8('0xf8')](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x2d2ba8('0x148')===_0x2d2ba8('0x148'))_0x55707d['changeCtbCastTime'](Number(RegExp['$1'])*0.01);else{function _0x5c0397(){const _0x33d69f=_0x2d2ba8;return _0x2eb186[_0x33d69f('0x39')]['Settings'][_0x33d69f('0x188')]['BattlerRelativeSpeedJS'][_0x33d69f('0x96')](this,this);}}}}else{function _0x53bcbe(){this['updateTpbCastTimeCTB']();}}}}const _0x37db94=VisuMZ[_0x2d2ba8('0x39')]['createKeyJS'](this[_0x2d2ba8('0x129')](),_0x2d2ba8('0xd3'));if(VisuMZ[_0x2d2ba8('0x39')]['JS'][_0x37db94]){if(_0x2d2ba8('0x1d3')===_0x2d2ba8('0x1d3')){const _0x1b252d=VisuMZ[_0x2d2ba8('0x39')]['JS'][_0x37db94][_0x2d2ba8('0x96')](this,this['subject'](),_0x55707d);_0x55707d[_0x2d2ba8('0x4e')](_0x1b252d);}else{function _0x1ebed4(){const _0x88b4f6=_0x2d2ba8;let _0x236115='';if(_0x13277b[_0x88b4f6('0x89')](_0x271406))_0x236115=_0x88b4f6('0x64')[_0x88b4f6('0x1ba')](_0x3a2d97['id'],_0x2b387a);if(_0x5e898b[_0x88b4f6('0x89')](_0x40d4d7))_0x236115='Class-%1-%2'[_0x88b4f6('0x1ba')](_0x2baf31['id'],_0x56bdaf);if(_0x8624f9[_0x88b4f6('0x89')](_0x31f6ac))_0x236115=_0x88b4f6('0x92')['format'](_0x36ae0d['id'],_0x2b10b0);if(_0x58ab8f[_0x88b4f6('0x89')](_0x5c45b2))_0x236115='Item-%1-%2'[_0x88b4f6('0x1ba')](_0x4a54eb['id'],_0xc39962);if(_0x3c3360['includes'](_0x142917))_0x236115=_0x88b4f6('0x178')[_0x88b4f6('0x1ba')](_0x4bcc59['id'],_0x25bf3c);if(_0x3369d1['includes'](_0x1dc4a9))_0x236115=_0x88b4f6('0x19a')['format'](_0x3d4582['id'],_0x359c88);if(_0x3d7fcb[_0x88b4f6('0x89')](_0x41e4c3))_0x236115=_0x88b4f6('0x70')[_0x88b4f6('0x1ba')](_0x49ac67['id'],_0xc43290);if(_0x2816c7[_0x88b4f6('0x89')](_0x254214))_0x236115=_0x88b4f6('0x59')[_0x88b4f6('0x1ba')](_0x3fd6d5['id'],_0x308689);return _0x236115;}}}if(_0x2babbc[_0x2d2ba8('0xf8')](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)){if(_0x2d2ba8('0x14f')!=='TFsVa'){function _0x21ab85(){const _0x342a4e=_0x2d2ba8;this[_0x342a4e('0x121')]=_0x211924;}}else _0x55707d[_0x2d2ba8('0x4e')](Number(RegExp['$1']));}if(_0x2babbc[_0x2d2ba8('0xf8')](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)){if(_0x2d2ba8('0x50')!=='iYDdA'){function _0x11b025(){const _0x367679=_0x2d2ba8;return this['_ctbTurnOrderVisible']===_0x55a16c&&this[_0x367679('0x9')](),this['_ctbTurnOrderVisible'];}}else _0x55707d[_0x2d2ba8('0x174')](Number(RegExp['$1']));}},VisuMZ[_0x4d175e('0x39')]['Game_Action_applyGlobal']=Game_Action['prototype']['applyGlobal'],Game_Action['prototype'][_0x4d175e('0x132')]=function(){const _0x27d847=_0x4d175e;VisuMZ[_0x27d847('0x39')]['Game_Action_applyGlobal'][_0x27d847('0x96')](this),this[_0x27d847('0x180')]();},Game_Action[_0x4d175e('0x194')][_0x4d175e('0x180')]=function(){const _0x4c1324=_0x4d175e;if(!this['item']())return;if(!BattleManager['isCTB']())return;const _0xac9f6d=this[_0x4c1324('0x129')]()[_0x4c1324('0x34')];let _0x53e2ba=0x0;this['_forcing']&&(_0x53e2ba=this[_0x4c1324('0xd7')]()[_0x4c1324('0x121')]);const _0x1f4e0=VisuMZ['BattleSystemCTB'][_0x4c1324('0xdf')](this[_0x4c1324('0x129')](),_0x4c1324('0x9f'));VisuMZ[_0x4c1324('0x39')]['JS'][_0x1f4e0]&&(_0x53e2ba+=VisuMZ[_0x4c1324('0x39')]['JS'][_0x1f4e0][_0x4c1324('0x96')](this,this[_0x4c1324('0xd7')](),this['subject']()));let _0x3ce92a=this[_0x4c1324('0x129')]()[_0x4c1324('0xfa')]>0x0?this[_0x4c1324('0x129')]()[_0x4c1324('0xfa')]:0x0;if(this[_0x4c1324('0xa9')]())_0x3ce92a+=this[_0x4c1324('0xd7')]()['attackSpeed']();_0x53e2ba+=(_0x3ce92a/0xfa0)['clamp'](0x0,0x1);if(this[_0x4c1324('0x129')]()[_0x4c1324('0x34')][_0x4c1324('0xf8')](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x4c1324('0xb3')===_0x4c1324('0x1e0')){function _0x216de7(){return _0x17cf66['y']-_0x1b172b['y'];}}else _0x53e2ba+=Number(RegExp['$1'])*0.01;}const _0x2537b9=this['subject']()['traitObjects']()['concat'](this[_0x4c1324('0xd7')]()[_0x4c1324('0x1a3')]()),_0x31a572=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x54df6c=_0x2537b9[_0x4c1324('0x107')](_0x4ca348=>_0x4ca348&&_0x4ca348[_0x4c1324('0x34')][_0x4c1324('0xf8')](_0x31a572)?Number(RegExp['$1'])*0.01:0x0);_0x53e2ba=_0x54df6c[_0x4c1324('0xaf')]((_0x12ffa2,_0x29d86b)=>_0x12ffa2+_0x29d86b,_0x53e2ba),this[_0x4c1324('0xd7')]()[_0x4c1324('0x62')](_0x53e2ba);},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0xd6')]=function(_0x494885){this['_tpbChargeTime']=_0x494885;},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x15a')]=function(_0xa1c64){const _0x2a2549=_0x4d175e;this[_0x2a2549('0xd6')](this[_0x2a2549('0x121')]+_0xa1c64);},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x101')]=function(_0x4b7eac){const _0x28ba59=_0x4d175e,_0x3e90c5=this[_0x28ba59('0x97')]();this[_0x28ba59('0x3f')]=_0x3e90c5*_0x4b7eac;},Game_BattlerBase['prototype'][_0x4d175e('0x100')]=function(_0x47c225){const _0x3af7a9=_0x4d175e,_0x509810=this['tpbRequiredCastTime'](),_0x11713e=_0x509810*_0x47c225;this[_0x3af7a9('0x3f')]=this[_0x3af7a9('0x3f')]+_0x11713e;},VisuMZ[_0x4d175e('0x39')]['Game_BattlerBase_appear']=Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x113')],Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x113')]=function(){const _0x3d82b5=_0x4d175e;VisuMZ[_0x3d82b5('0x39')][_0x3d82b5('0xab')]['call'](this),BattleManager['updateTurnOrderCTB']();},VisuMZ[_0x4d175e('0x39')]['Game_BattlerBase_hide']=Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x163')],Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x163')]=function(){const _0x4ea163=_0x4d175e;VisuMZ['BattleSystemCTB'][_0x4ea163('0x176')]['call'](this),BattleManager[_0x4ea163('0x90')]();},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0xd0')]=function(){const _0x379679=_0x4d175e;delete this[_0x379679('0x1d7')],delete this['_ctbTurnOrderFaceName'],delete this[_0x379679('0x144')],delete this[_0x379679('0x10c')];},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x12e')]=function(){const _0x58cb6c=_0x4d175e;if(this[_0x58cb6c('0x1d7')]===undefined){if('HZJsK'!=='HZJsK'){function _0x33370c(){const _0x55fb1b=_0x58cb6c;this['x']=this[_0x55fb1b('0xf6')],this['y']=this['_homeY'];}}else this[_0x58cb6c('0x1d7')]=this[_0x58cb6c('0x1d8')]();}return this['_ctbTurnOrderGraphicType'];},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x1d8')]=function(){const _0x48aa4f=_0x4d175e;return Window_CTB_TurnOrder['Settings'][_0x48aa4f('0x104')];},Game_BattlerBase['prototype'][_0x4d175e('0x32')]=function(){const _0x3edc47=_0x4d175e;if(this[_0x3edc47('0x85')]===undefined){if(_0x3edc47('0x18b')!==_0x3edc47('0xd4'))this['_ctbTurnOrderFaceName']=this[_0x3edc47('0x162')]();else{function _0x1d4569(){return _0x2a497d(_0xfac1fb['$2']);}}}return this[_0x3edc47('0x85')];},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x162')]=function(){const _0x3e20b7=_0x4d175e;return Window_CTB_TurnOrder[_0x3e20b7('0x15d')][_0x3e20b7('0x1a8')];},Game_BattlerBase['prototype']['TurnOrderCTBGraphicFaceIndex']=function(){const _0x4c3be2=_0x4d175e;return this['_ctbTurnOrderFaceIndex']===undefined&&(this[_0x4c3be2('0x144')]=this[_0x4c3be2('0x30')]()),this['_ctbTurnOrderFaceIndex'];},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x30')]=function(){const _0x5cbca2=_0x4d175e;return Window_CTB_TurnOrder[_0x5cbca2('0x15d')][_0x5cbca2('0x106')];},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0xe2')]=function(){const _0x4d54f6=_0x4d175e;if(this[_0x4d54f6('0x10c')]===undefined){if(_0x4d54f6('0x108')===_0x4d54f6('0x147')){function _0x5a94d8(){const _0x5ad5bb=_0x4d54f6;if(this[_0x5ad5bb('0x18a')]!==_0x40756d['svBattlerName']())return this[_0x5ad5bb('0x1cb')]();}}else this[_0x4d54f6('0x10c')]=this[_0x4d54f6('0x1')]();}return this[_0x4d54f6('0x10c')];},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x1')]=function(){const _0xadfbdd=_0x4d175e;return Window_CTB_TurnOrder[_0xadfbdd('0x15d')][_0xadfbdd('0x54')];},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x72')]=function(_0x21a6f9){const _0x394949=_0x4d175e;this[_0x394949('0x10c')]=_0x21a6f9;},Game_BattlerBase['prototype'][_0x4d175e('0x20')]=function(_0x42c324,_0x32f5e8){const _0x34c6b3=_0x4d175e;if(this[_0x34c6b3('0x36')]())return Number[_0x34c6b3('0x29')];if(!this['isAppeared']())return Number[_0x34c6b3('0x29')];if(_0x42c324===0x1&&!_0x32f5e8){if(_0x34c6b3('0x48')==='xwMRi'){function _0x48fcc2(){const _0x292448=_0x34c6b3,_0x1d75d9=_0x3f26d3[_0x292448('0x39')]['createKeyJS'](this[_0x292448('0x129')](),_0x292448('0x131'));if(_0x929fc9['BattleSystemCTB']['JS'][_0x1d75d9]){const _0x5d3203=_0x33a863[_0x292448('0x39')]['JS'][_0x1d75d9][_0x292448('0x96')](this,this[_0x292448('0xd7')](),_0x7848e4);_0x242581['setCtbChargeTime'](_0x5d3203);}_0x363e6d['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x1e6f38['setCtbChargeTime'](_0x520a77(_0x727c06['$1'])*0.01),_0x5d6c04[_0x292448('0xf8')](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x480dde['changeCtbChargeTime'](_0x1d91a3(_0x1cdb43['$1'])*0.01);}}else{if(this===BattleManager['_subject'])return Number[_0x34c6b3('0xbf')]/0xa;if(this===BattleManager['actor']())return Number[_0x34c6b3('0xbf')]/0xa;if(BattleManager[_0x34c6b3('0x1ca')]&&BattleManager[_0x34c6b3('0x1ca')]['includes'](this)){if(_0x34c6b3('0xe')!==_0x34c6b3('0xe')){function _0x134da4(){return this['processUpdateGraphic']();}}else{let _0x48390f=Number[_0x34c6b3('0xbf')]/0x1388;return _0x48390f+=BattleManager['_actionBattlers'][_0x34c6b3('0x65')](this)*0x5,_0x48390f;}}}}return _0x42c324-=this['tpbChargeTime'](),_0x42c324/=this[_0x34c6b3('0x88')](),_0x42c324+=this[_0x34c6b3('0x67')](),_0x42c324;},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x67')]=function(){const _0x10a942=_0x4d175e;return this[_0x10a942('0x6b')]===_0x10a942('0x112')?(this[_0x10a942('0x97')]()-this[_0x10a942('0x3f')])/this[_0x10a942('0x88')]():0x0;},VisuMZ['BattleSystemCTB'][_0x4d175e('0x44')]=Game_Battler[_0x4d175e('0x194')]['initTpbChargeTime'],Game_Battler['prototype'][_0x4d175e('0x122')]=function(_0x179182){const _0x45f609=_0x4d175e;BattleManager[_0x45f609('0x128')]()?this[_0x45f609('0x1d6')](_0x179182):VisuMZ[_0x45f609('0x39')][_0x45f609('0x44')]['call'](this,_0x179182);},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x1d6')]=function(_0x4a6591){const _0x468453=_0x4d175e,_0x8acb40=VisuMZ[_0x468453('0x39')][_0x468453('0x15d')][_0x468453('0x188')];let _0x36fd74=this[_0x468453('0xa0')]()*eval(_0x8acb40[_0x468453('0x133')]);const _0x5d7fc7=this[_0x468453('0x1ab')]()[_0x468453('0x77')](this[_0x468453('0x1a3')]()),_0x273719=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0xe2e0b0=_0x5d7fc7[_0x468453('0x107')](_0x23ad8e=>_0x23ad8e&&_0x23ad8e[_0x468453('0x34')]['match'](_0x273719)?Number(RegExp['$1'])*0.01:0x0);_0x36fd74=_0xe2e0b0['reduce']((_0x553b6a,_0x19b07f)=>_0x553b6a+_0x19b07f,_0x36fd74),this['_tpbState']=_0x468453('0x13c'),this['_tpbChargeTime']=(_0x4a6591?0x1:_0x36fd74)['clamp'](0x0,0x1),this['isRestricted']()&&(this[_0x468453('0x121')]=0x0);},Game_Battler['prototype'][_0x4d175e('0x58')]=function(){const _0xe27dbb=_0x4d175e;return this[_0xe27dbb('0x6b')]===_0xe27dbb('0x13c');},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x1bf')]=function(){const _0x2b180d=_0x4d175e;return this[_0x2b180d('0x6b')]===_0x2b180d('0x112')&&this[_0x2b180d('0x165')]()&&this[_0x2b180d('0x165')]()[_0x2b180d('0x129')]()&&this['currentAction']()[_0x2b180d('0x129')]()[_0x2b180d('0xfa')]<0x0;},Game_BattlerBase[_0x4d175e('0x194')][_0x4d175e('0x182')]=function(){const _0x1e1dd4=_0x4d175e;if(this[_0x1e1dd4('0x1bf')]())return this[_0x1e1dd4('0x3f')]/this[_0x1e1dd4('0x97')]();else{if(_0x1e1dd4('0x11f')===_0x1e1dd4('0x84')){function _0x5679fc(){const _0x3acd8c=_0x1e1dd4,_0x50c52f=this[_0x3acd8c('0x126')](),_0x211a12=this[_0x3acd8c('0x3c')]();_0x5876fe[_0x3acd8c('0xfe')]=new _0x452fcf(_0x50c52f,_0x211a12);const _0x500a66=_0x1d9773[_0x3acd8c('0x119')](_0x6dfdd4[_0x3acd8c('0x145')[_0x3acd8c('0x1ba')](_0x8dc525)]),_0x11f460=_0x1c7b10[_0x3acd8c('0x119')](_0x29857e['%1BgColor2'[_0x3acd8c('0x1ba')](_0x35dab8)]);_0x10a085['bitmap'][_0x3acd8c('0x18')](0x0,0x0,_0x50c52f,_0x211a12,_0x500a66,_0x11f460,!![]);}}else return 0x0;}},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x16f')]=function(){const _0x5aef95=_0x4d175e;return!this[_0x5aef95('0xed')]();},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x62')]=function(_0x3a04eb){this['_ctbAfterSpeed']=_0x3a04eb;},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x14')]=Game_Battler[_0x4d175e('0x194')][_0x4d175e('0xea')],Game_Battler[_0x4d175e('0x194')][_0x4d175e('0xea')]=function(){const _0x291f0e=_0x4d175e;this[_0x291f0e('0xa8')]=BattleManager[_0x291f0e('0x128')](),VisuMZ[_0x291f0e('0x39')][_0x291f0e('0x14')][_0x291f0e('0x96')](this),this[_0x291f0e('0xa8')]=undefined;},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0xbd')]=Game_Battler['prototype']['clearTpbChargeTime'],Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x184')]=function(){const _0x1292d=_0x4d175e;BattleManager['isCTB']()?this['clearTpbChargeTimeCTB']():VisuMZ[_0x1292d('0x39')][_0x1292d('0xbd')][_0x1292d('0x96')](this);},Game_Battler['prototype']['clearTpbChargeTimeCTB']=function(){const _0x1e1e78=_0x4d175e;if(this['_onRestrictBypassCtbReset'])return;this[_0x1e1e78('0x6b')]=_0x1e1e78('0x13c'),this[_0x1e1e78('0x121')]-=0x1,this[_0x1e1e78('0x121')]+=this[_0x1e1e78('0xb8')]||0x0;},VisuMZ[_0x4d175e('0x39')]['Game_Battler_applyTpbPenalty']=Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x1b')],Game_Battler[_0x4d175e('0x194')]['applyTpbPenalty']=function(){const _0x9a8090=_0x4d175e;BattleManager['isCTB']()?this[_0x9a8090('0x80')]():VisuMZ[_0x9a8090('0x39')][_0x9a8090('0x11a')][_0x9a8090('0x96')](this);},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x80')]=function(){const _0x5d4917=_0x4d175e;this[_0x5d4917('0x6b')]='charging',this[_0x5d4917('0x121')]+=VisuMZ[_0x5d4917('0x39')]['Settings'][_0x5d4917('0x188')]['EscapeFailPenalty']||0x0;},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x2a')]=Game_Battler[_0x4d175e('0x194')][_0x4d175e('0xcb')],Game_Battler[_0x4d175e('0x194')][_0x4d175e('0xcb')]=function(){const _0x5c38de=_0x4d175e;if(BattleManager['isCTB']())return VisuMZ[_0x5c38de('0x39')][_0x5c38de('0x15d')][_0x5c38de('0x188')][_0x5c38de('0x5e')][_0x5c38de('0x96')](this,this);else{if(_0x5c38de('0xc1')!==_0x5c38de('0x6f'))return VisuMZ[_0x5c38de('0x39')][_0x5c38de('0x2a')]['call'](this);else{function _0x171c1a(){const _0x340ce5=_0x5c38de;return _0x35211b[_0x340ce5('0x128')]()?_0x1c7d85[_0x340ce5('0x39')][_0x340ce5('0x15d')][_0x340ce5('0x188')][_0x340ce5('0x5e')][_0x340ce5('0x96')](this,this):_0xe254e4[_0x340ce5('0x39')][_0x340ce5('0x2a')][_0x340ce5('0x96')](this);}}}},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0xee')]=Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x16c')],Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x16c')]=function(){const _0x50db89=_0x4d175e;return BattleManager[_0x50db89('0x128')]()?VisuMZ[_0x50db89('0x39')][_0x50db89('0x15d')][_0x50db89('0x188')][_0x50db89('0xe5')][_0x50db89('0x96')](this,this):VisuMZ['BattleSystemCTB'][_0x50db89('0xee')][_0x50db89('0x96')](this);},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0xc7')]=Game_Battler[_0x4d175e('0x194')]['tpbRelativeSpeed'],Game_Battler['prototype']['tpbRelativeSpeed']=function(){const _0x225464=_0x4d175e;if(BattleManager['isCTB']()){if(_0x225464('0x12a')===_0x225464('0x12a'))return VisuMZ[_0x225464('0x39')][_0x225464('0x15d')]['Mechanics'][_0x225464('0xb2')][_0x225464('0x96')](this,this);else{function _0x5c9987(){const _0x36fc42=_0x225464,_0x4a9d13=_0x114a44[_0x36fc42('0x39')][_0x36fc42('0x15d')][_0x36fc42('0x33')],_0x439b36=_0x460b51>0x0?_0x36fc42('0x63'):'Rush';if(_0x4a9d13[_0x36fc42('0x1dd')[_0x36fc42('0x1ba')](_0x439b36)]){const _0x3082e5=_0x4a9d13['%1AnimationID'[_0x36fc42('0x1ba')](_0x439b36)],_0x4504f7=_0x4a9d13['%1Mirror'['format'](_0x439b36)],_0x1f05a6=_0x4a9d13['%1Mute'[_0x36fc42('0x1ba')](_0x439b36)];_0x228065[_0x36fc42('0x3')]([this],_0x3082e5,_0x4504f7,_0x1f05a6);}if(this[_0x36fc42('0x1b7')]()&&_0x4a9d13[_0x36fc42('0x11c')[_0x36fc42('0x1ba')](_0x439b36)][_0x36fc42('0x13d')]>0x0){const _0x1f8ebc=_0x4a9d13[_0x36fc42('0x11c')[_0x36fc42('0x1ba')](_0x439b36)],_0x3148c5={'textColor':_0x56281e['getColor'](_0x4a9d13[_0x36fc42('0x1c5')['format'](_0x439b36)]),'flashColor':_0x4a9d13[_0x36fc42('0xb1')[_0x36fc42('0x1ba')](_0x439b36)],'flashDuration':_0x4a9d13[_0x36fc42('0x181')[_0x36fc42('0x1ba')](_0x439b36)]};this[_0x36fc42('0x12f')](_0x1f8ebc,_0x3148c5);}}}}else{if(_0x225464('0x1ac')!=='MDfvK')return VisuMZ[_0x225464('0x39')]['Game_Battler_tpbRelativeSpeed'][_0x225464('0x96')](this);else{function _0x580b10(){const _0xe24441=_0x225464;this[_0xe24441('0x10')]=_0xe24441('0x18e');}}}},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x1cc')]=Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x88')],Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x88')]=function(){const _0x30257c=_0x4d175e;if(BattleManager[_0x30257c('0x128')]()){let _0x5f4511=VisuMZ[_0x30257c('0x39')][_0x30257c('0x15d')][_0x30257c('0x188')][_0x30257c('0xc9')][_0x30257c('0x96')](this,this);const _0x39b07e=0x0;return _0x5f4511+_0x39b07e;}else{if('pmPMm'===_0x30257c('0x94'))return VisuMZ['BattleSystemCTB']['Game_Battler_tpbAcceleration'][_0x30257c('0x96')](this);else{function _0x2b1dd9(){const _0x1a21c3=_0x30257c;return _0x346722[_0x1a21c3('0x39')]['Game_Battler_tpbAcceleration']['call'](this);}}}},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x8c')]=Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x97')],Game_Battler['prototype'][_0x4d175e('0x97')]=function(){const _0x1f0738=_0x4d175e;return BattleManager[_0x1f0738('0x128')]()?VisuMZ[_0x1f0738('0x39')]['Settings'][_0x1f0738('0x188')][_0x1f0738('0x4f')]['call'](this,this):VisuMZ[_0x1f0738('0x39')][_0x1f0738('0x8c')][_0x1f0738('0x96')](this);},Game_Battler['prototype'][_0x4d175e('0xa')]=function(){const _0x872b6c=_0x4d175e,_0x3c49d7=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x3c49d7)return-0x1;const _0x1eaa48=_0x3c49d7[_0x872b6c('0xe7')];if(!_0x1eaa48)return-0x1;const _0x2dd2d4=_0x1eaa48[_0x872b6c('0x8b')](_0x391c4f=>_0x391c4f['battler']()===this);return _0x1eaa48[_0x872b6c('0x65')](_0x2dd2d4);},Game_Battler['prototype'][_0x4d175e('0x174')]=function(_0x2d23d7){const _0x9b3cfa=_0x4d175e;if(!BattleManager['isCTB']())return;if(!SceneManager[_0x9b3cfa('0x10d')]())return;if(this===BattleManager[_0x9b3cfa('0x1be')]())return;if(this===BattleManager['_subject'])return;const _0x5df4b4=this[_0x9b3cfa('0xa')]();if(_0x5df4b4<0x0)return;this[_0x9b3cfa('0x4e')](_0x5df4b4+_0x2d23d7);},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x4e')]=function(_0x5588f8){const _0x25bad0=_0x4d175e;if(!BattleManager[_0x25bad0('0x128')]())return;if(!SceneManager[_0x25bad0('0x10d')]())return;if(this===BattleManager['actor']())return;if(this===BattleManager[_0x25bad0('0x130')])return;_0x5588f8=Math[_0x25bad0('0x1a1')](_0x5588f8,0x1),this[_0x25bad0('0x9e')](_0x5588f8);},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x9e')]=function(_0x3da9c6){const _0x8f5c04=_0x4d175e;if(!BattleManager['isCTB']())return;if(!SceneManager[_0x8f5c04('0x10d')]())return;if(this===BattleManager[_0x8f5c04('0x1be')]())return;if(this===BattleManager['_subject'])return;const _0x293f68=SceneManager[_0x8f5c04('0x13f')][_0x8f5c04('0xba')];if(!_0x293f68)return;const _0x4e51c1=_0x293f68[_0x8f5c04('0xe7')];if(!_0x4e51c1)return;const _0x7ac104=this['getCurrentTurnOrderPositionCTB']();_0x7ac104!==_0x3da9c6&&this[_0x8f5c04('0x17a')](_0x3da9c6-_0x7ac104);let _0x1c4a39=_0x3da9c6,_0x1c3149=_0x3da9c6;_0x7ac104>_0x3da9c6?_0x1c4a39-=0x1:_0x1c3149+=0x1;const _0x2a3d49=_0x4e51c1[_0x1c4a39][_0x8f5c04('0x1b2')](!![]),_0x5b87de=_0x4e51c1[_0x1c3149]['ticksLeft'](!![]),_0x190667=(_0x2a3d49+_0x5b87de)/0x2;let _0x21d974=_0x190667*this[_0x8f5c04('0x88')]();if(this[_0x8f5c04('0x6b')]===_0x8f5c04('0x13c'))this[_0x8f5c04('0x121')]=0x1-_0x21d974;else{if(this[_0x8f5c04('0x6b')]===_0x8f5c04('0x112')){if(_0x8f5c04('0x45')===_0x8f5c04('0x143')){function _0x4c438a(){const _0x5c9441=_0x8f5c04,_0x4236bb=_0x4083d5['Settings'];if(_0x4236bb[_0x5c9441('0x189')]!==_0x5c9441('0x74'))return;if(!_0x4236bb[_0x5c9441('0xbe')])return;const _0x1fd6ce=_0x3f71a9[_0x5c9441('0x13f')]['_helpWindow'];if(!_0x1fd6ce)return;_0x1fd6ce['visible']?(this['x']=this[_0x5c9441('0xf6')]+(_0x4236bb['RepositionTopHelpX']||0x0),this['y']=this[_0x5c9441('0x15c')]+(_0x4236bb['RepositionTopHelpY']||0x0)):(this['x']=this[_0x5c9441('0xf6')],this['y']=this[_0x5c9441('0x15c')]);const _0x59d175=_0x368dae[_0x5c9441('0x13f')]['_windowLayer'];this['x']+=_0x59d175['x'],this['y']+=_0x59d175['y'];}}else this[_0x8f5c04('0x3f')]=this['tpbRequiredCastTime']()-_0x21d974;}}BattleManager[_0x8f5c04('0x1ca')]=[],BattleManager[_0x8f5c04('0x90')]();},Game_Battler['prototype']['onCtbOrderChange']=function(_0x4112d3){const _0x3cc4aa=_0x4d175e,_0x3f25c6=VisuMZ[_0x3cc4aa('0x39')][_0x3cc4aa('0x15d')][_0x3cc4aa('0x33')],_0x43ec84=_0x4112d3>0x0?_0x3cc4aa('0x63'):_0x3cc4aa('0x179');if(_0x3f25c6['%1AnimationID'[_0x3cc4aa('0x1ba')](_0x43ec84)]){if('BDgby'===_0x3cc4aa('0xa4')){const _0x34a71d=_0x3f25c6[_0x3cc4aa('0x1dd')['format'](_0x43ec84)],_0x88c28b=_0x3f25c6['%1Mirror'[_0x3cc4aa('0x1ba')](_0x43ec84)],_0x26c91f=_0x3f25c6[_0x3cc4aa('0x49')['format'](_0x43ec84)];$gameTemp[_0x3cc4aa('0x3')]([this],_0x34a71d,_0x88c28b,_0x26c91f);}else{function _0x46f76e(){const _0x53a761=_0x3cc4aa,_0x5e0d63=_0x27cfe5(_0x1da19a['$1']),_0x5a8ced='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x53a761('0x1ba')](_0x5e0d63,_0x91e2cf),_0xe206a2=_0x7b22a['BattleSystemCTB'][_0x53a761('0xdf')](_0xb11fc0,_0x4d413c);_0x233d70[_0x53a761('0x39')]['JS'][_0xe206a2]=new _0x5c9af7(_0x5a8ced);}}}if(this[_0x3cc4aa('0x1b7')]()&&_0x3f25c6[_0x3cc4aa('0x11c')[_0x3cc4aa('0x1ba')](_0x43ec84)][_0x3cc4aa('0x13d')]>0x0){if(_0x3cc4aa('0x8e')!==_0x3cc4aa('0x1b1')){const _0x1ddaca=_0x3f25c6['%1PopupText'[_0x3cc4aa('0x1ba')](_0x43ec84)],_0x1a0301={'textColor':ColorManager[_0x3cc4aa('0x119')](_0x3f25c6[_0x3cc4aa('0x1c5')['format'](_0x43ec84)]),'flashColor':_0x3f25c6[_0x3cc4aa('0xb1')[_0x3cc4aa('0x1ba')](_0x43ec84)],'flashDuration':_0x3f25c6[_0x3cc4aa('0x181')['format'](_0x43ec84)]};this['setupTextPopup'](_0x1ddaca,_0x1a0301);}else{function _0x4f2b56(){const _0x5838fe=_0x3cc4aa;if(!this[_0x5838fe('0x128')]())return;this['updateTurnOrderCTB'](),this[_0x5838fe('0x130')]&&this[_0x5838fe('0x26')]();}}}},VisuMZ[_0x4d175e('0x39')]['Game_Battler_updateTpbChargeTime']=Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x1dc')],Game_Battler[_0x4d175e('0x194')][_0x4d175e('0x1dc')]=function(){const _0x4514c7=_0x4d175e;BattleManager['isCTB']()?this['updateTpbChargeTimeCTB']():VisuMZ['BattleSystemCTB'][_0x4514c7('0x21')]['call'](this);},Game_Battler[_0x4d175e('0x194')]['updateTpbChargeTimeCTB']=function(){const _0xac0afd=_0x4d175e;this[_0xac0afd('0x6b')]===_0xac0afd('0x13c')&&(this['_tpbChargeTime']+=this[_0xac0afd('0x88')](),this['_tpbChargeTime']>=0x1&&this['onTpbCharged']());},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x7d')]=Game_Battler['prototype'][_0x4d175e('0xeb')],Game_Battler[_0x4d175e('0x194')][_0x4d175e('0xeb')]=function(){const _0x2b02e0=_0x4d175e;if(BattleManager[_0x2b02e0('0x128')]()){if('uLJzz'===_0x2b02e0('0x137'))this['updateTpbCastTimeCTB']();else{function _0x154823(){const _0x3b4b79=_0x2b02e0,_0x428fd0=this['battler']();if(!_0x428fd0)return _0x4a8a28[_0x3b4b79('0x29')];const _0x409d6e=0x1*(this[_0x3b4b79('0x16e')]+0x1);return _0x428fd0[_0x3b4b79('0x20')](_0x409d6e,_0x2c9072);}}}else{if(_0x2b02e0('0x5f')===_0x2b02e0('0x5f'))VisuMZ[_0x2b02e0('0x39')][_0x2b02e0('0x7d')]['call'](this);else{function _0x3646c9(){const _0x2ec8cf=_0x2b02e0;_0x24712f=this[_0x2ec8cf('0xd7')]()[_0x2ec8cf('0x121')];}}}},Game_Battler[_0x4d175e('0x194')][_0x4d175e('0xb6')]=function(){const _0x580ac4=_0x4d175e;this['_tpbState']===_0x580ac4('0x112')&&(this[_0x580ac4('0x3f')]+=this['tpbAcceleration'](),this[_0x580ac4('0x3f')]>=this['tpbRequiredCastTime']()&&(this[_0x580ac4('0x6b')]=_0x580ac4('0x23')));},Game_Actor['prototype']['createTurnOrderCTBGraphicType']=function(){const _0x3188a2=_0x4d175e,_0x48da78=this[_0x3188a2('0x1be')]()[_0x3188a2('0x34')];if(_0x48da78[_0x3188a2('0xf8')](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x3188a2('0xce')===_0x3188a2('0xfc')){function _0x19694e(){const _0x11b944=_0x3188a2;this[_0x11b944('0x17d')](...arguments);}}else return _0x3188a2('0x118');}return Window_CTB_TurnOrder[_0x3188a2('0x15d')][_0x3188a2('0x60')];},Game_Actor[_0x4d175e('0x194')][_0x4d175e('0x32')]=function(){const _0xd362a0=_0x4d175e;return this[_0xd362a0('0x1a2')]();},Game_Actor[_0x4d175e('0x194')][_0x4d175e('0x196')]=function(){return this['faceIndex']();},Game_Actor['prototype']['createTurnOrderCTBGraphicIconIndex']=function(){const _0x1f9083=_0x4d175e,_0x4581d6=this['actor']()[_0x1f9083('0x34')];if(_0x4581d6[_0x1f9083('0xf8')](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder['Settings'][_0x1f9083('0x13a')];},Game_Enemy[_0x4d175e('0x194')][_0x4d175e('0x1d8')]=function(){const _0x25460d=_0x4d175e,_0x3e8fb7=this[_0x25460d('0x1a7')]()[_0x25460d('0x34')];if(_0x3e8fb7[_0x25460d('0xf8')](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x25460d('0x125')===_0x25460d('0x3a')){function _0x14f569(){const _0x13c204=_0x25460d;_0x114db4[_0x13c204('0xd6')](_0x125122(_0x23adf9['$1'])*0.01);}}else return _0x25460d('0x18e');}else{if(_0x3e8fb7[_0x25460d('0xf8')](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_CTB_TurnOrder[_0x25460d('0x15d')]['EnemyBattlerType'];},Game_Enemy[_0x4d175e('0x194')][_0x4d175e('0x162')]=function(){const _0x504c75=_0x4d175e,_0x2b6ffe=this[_0x504c75('0x1a7')]()[_0x504c75('0x34')];if(_0x2b6ffe[_0x504c75('0xf8')](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('MEPWf'!==_0x504c75('0xef')){function _0x104852(){const _0x8963ac=_0x504c75;return _0x21085f[_0x8963ac('0x1b2')]()-_0x23d07c[_0x8963ac('0x1b2')]();}}else return String(RegExp['$1']);}return Window_CTB_TurnOrder[_0x504c75('0x15d')][_0x504c75('0x1a8')];},Game_Enemy[_0x4d175e('0x194')][_0x4d175e('0x30')]=function(){const _0x144c90=_0x4d175e,_0x274668=this['enemy']()[_0x144c90('0x34')];if(_0x274668[_0x144c90('0xf8')](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x144c90('0x38')===_0x144c90('0x38'))return Number(RegExp['$2']);else{function _0x25c4fd(){const _0x2047c6=_0x144c90;for(let _0x42caa2=0x0;_0x42caa2<_0x2aecdf;_0x42caa2++){const _0x1bf8a4=new _0x1c90de(_0x5c4990,_0x5227d9,_0x42caa2);this[_0x2047c6('0xd5')]['addChild'](_0x1bf8a4),this[_0x2047c6('0xe7')][_0x2047c6('0x24')](_0x1bf8a4);}}}}return Window_CTB_TurnOrder[_0x144c90('0x15d')][_0x144c90('0x106')];},Game_Enemy[_0x4d175e('0x194')]['createTurnOrderCTBGraphicIconIndex']=function(){const _0x3c9ee8=_0x4d175e,_0x3d291c=this[_0x3c9ee8('0x1a7')]()[_0x3c9ee8('0x34')];if(_0x3d291c['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x3c9ee8('0x87')===_0x3c9ee8('0x87'))return Number(RegExp['$1']);else{function _0x42f18c(){const _0xf0cf3b=_0x3c9ee8;if(this['_fadeDuration']>0x0)return;if(this[_0xf0cf3b('0x6e')]>0x0){const _0xf266db=this[_0xf0cf3b('0x6e')];this['x']=(this['x']*(_0xf266db-0x1)+this[_0xf0cf3b('0x1a0')])/_0xf266db,this['y']=(this['y']*(_0xf266db-0x1)+this[_0xf0cf3b('0x56')])/_0xf266db,this['_positionDuration']--;}this[_0xf0cf3b('0x6e')]<=0x0&&(this['x']=this['_positionTargetX'],this['y']=this[_0xf0cf3b('0x56')]);}}}return Window_CTB_TurnOrder[_0x3c9ee8('0x15d')][_0x3c9ee8('0x54')];},VisuMZ['BattleSystemCTB'][_0x4d175e('0x79')]=Scene_Battle[_0x4d175e('0x194')][_0x4d175e('0x5c')],Scene_Battle['prototype']['createAllWindows']=function(){const _0x1e0786=_0x4d175e;VisuMZ['BattleSystemCTB'][_0x1e0786('0x79')]['call'](this),this['createCTBTurnOrderWindow']();},Scene_Battle[_0x4d175e('0x194')]['createCTBTurnOrderWindow']=function(){const _0x3c8365=_0x4d175e;if(!BattleManager[_0x3c8365('0x128')]())return;this[_0x3c8365('0xba')]=new Window_CTB_TurnOrder();const _0x5e700b=this[_0x3c8365('0x15f')](this['_windowLayer']);this['addChildAt'](this[_0x3c8365('0xba')],_0x5e700b),this['repositionLogWindowCTB'](),BattleManager[_0x3c8365('0x90')](!![]);},Scene_Battle[_0x4d175e('0x194')][_0x4d175e('0x3b')]=function(){const _0x3a159f=_0x4d175e,_0x2cae78=Window_CTB_TurnOrder[_0x3a159f('0x15d')];if(_0x2cae78[_0x3a159f('0x189')]!==_0x3a159f('0x74'))return;if(!_0x2cae78['RepositionLogWindow'])return;if(!this['_logWindow'])return;const _0x4dbc5a=this[_0x3a159f('0xba')]['y']-Math[_0x3a159f('0x9b')]((Graphics['height']-Graphics['boxHeight'])/0x2),_0x37c2fb=_0x4dbc5a+this[_0x3a159f('0xba')][_0x3a159f('0x150')];this[_0x3a159f('0x1c8')]['y']=_0x37c2fb+_0x2cae78['ScreenBuffer'];};function Sprite_CTB_TurnOrder_Battler(){const _0x11bf2b=_0x4d175e;this[_0x11bf2b('0x17d')](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')]=Object[_0x4d175e('0x17')](Sprite['prototype']),Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')]['constructor']=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x17d')]=function(_0x3f5694,_0x11dd08,_0x52f445){const _0x536859=_0x4d175e;this[_0x536859('0x1da')](_0x3f5694,_0x11dd08,_0x52f445),Sprite[_0x536859('0x194')][_0x536859('0x17d')][_0x536859('0x96')](this),this[_0x536859('0x171')]();},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x1da')]=function(_0x282a58,_0x2cac74,_0x2ff9aa){const _0x10dbc3=_0x4d175e;this[_0x10dbc3('0x16a')]=_0x282a58,this[_0x10dbc3('0x1bc')]=_0x2cac74,this[_0x10dbc3('0x16e')]=_0x2ff9aa;const _0x1813a6=Window_CTB_TurnOrder[_0x10dbc3('0x15d')],_0x12c4a0=this[_0x10dbc3('0x1b9')](),_0x31cde9=this[_0x10dbc3('0x1c2')]();this['_positionDuration']=0x0,this[_0x10dbc3('0x1a0')]=_0x12c4a0?_0x1813a6[_0x10dbc3('0x1df')]*_0x31cde9:0x0,this[_0x10dbc3('0x56')]=_0x12c4a0?0x0:_0x1813a6[_0x10dbc3('0x1df')]*_0x31cde9,this['_fadeDuration']=0x0,this[_0x10dbc3('0xd9')]=0xff,this[_0x10dbc3('0x0')]=!![],this[_0x10dbc3('0x6d')]=!![];},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x171')]=function(){const _0x334975=_0x4d175e;this[_0x334975('0xd8')](),this[_0x334975('0x1b8')](),this['createGraphicSprite'](),this[_0x334975('0xa3')](),this[_0x334975('0x158')]();},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0xd8')]=function(){const _0xdbb2ab=_0x4d175e;this['x']=this[_0xdbb2ab('0x1a0')],this['y']=this[_0xdbb2ab('0x56')];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x4d175e('0x1b9')]=function(){const _0x3ab3ed=_0x4d175e,_0x43e6e3=Window_CTB_TurnOrder[_0x3ab3ed('0x15d')],_0x1c11b8=['top','bottom'][_0x3ab3ed('0x89')](_0x43e6e3[_0x3ab3ed('0x189')]);return _0x1c11b8;},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x126')]=function(){const _0x50a43a=_0x4d175e,_0x159220=Window_CTB_TurnOrder[_0x50a43a('0x15d')];return this[_0x50a43a('0x1b9')]()?_0x159220['SpriteThin']:_0x159220[_0x50a43a('0x55')];},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x3c')]=function(){const _0x53574d=_0x4d175e,_0x44916e=Window_CTB_TurnOrder[_0x53574d('0x15d')];return this[_0x53574d('0x1b9')]()?_0x44916e[_0x53574d('0x55')]:_0x44916e[_0x53574d('0x1df')];},Sprite_CTB_TurnOrder_Battler['prototype']['createTestBitmap']=function(){const _0x40f29d=_0x4d175e;this[_0x40f29d('0xfe')]=new Bitmap(0x48,0x24);const _0x332368=this['battler']()?this[_0x40f29d('0x1b7')]()[_0x40f29d('0x98')]():_0x40f29d('0xbc')[_0x40f29d('0x1ba')](this['_unit'],this[_0x40f29d('0x1bc')],this[_0x40f29d('0x16e')]);this[_0x40f29d('0xfe')][_0x40f29d('0xe4')](_0x332368,0x0,0x0,0x48,0x24,'center');},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x1b8')]=function(){const _0x4edf7e=_0x4d175e;if(!Window_CTB_TurnOrder[_0x4edf7e('0x15d')][_0x4edf7e('0x41')])return;const _0x5a2928=Window_CTB_TurnOrder['Settings'],_0x264c47=this['_unit']===$gameParty?_0x4edf7e('0x51'):_0x4edf7e('0x12d'),_0x4eb219='%1SystemBg'['format'](_0x264c47),_0x3f356d=new Sprite();_0x3f356d['anchor']['x']=this[_0x4edf7e('0x13')]['x'],_0x3f356d[_0x4edf7e('0x13')]['y']=this[_0x4edf7e('0x13')]['y'];if(_0x5a2928[_0x4eb219]){if('zFsfq'===_0x4edf7e('0x195')){function _0x5c67ec(){const _0x20a2d9=_0x4edf7e,_0x46d66c=_0x45ce96[_0x20a2d9('0x15d')],_0x39b9f7=['top',_0x20a2d9('0x1c1')][_0x20a2d9('0x89')](_0x46d66c[_0x20a2d9('0x189')]);return _0x39b9f7;}}else _0x3f356d['bitmap']=ImageManager['loadSystem'](_0x5a2928[_0x4eb219]);}else{if(_0x4edf7e('0x18f')!==_0x4edf7e('0x7')){const _0x1f177c=this[_0x4edf7e('0x126')](),_0x39e941=this[_0x4edf7e('0x3c')]();_0x3f356d[_0x4edf7e('0xfe')]=new Bitmap(_0x1f177c,_0x39e941);const _0x726033=ColorManager[_0x4edf7e('0x119')](_0x5a2928[_0x4edf7e('0x145')[_0x4edf7e('0x1ba')](_0x264c47)]),_0x2a7ca0=ColorManager[_0x4edf7e('0x119')](_0x5a2928[_0x4edf7e('0x140')[_0x4edf7e('0x1ba')](_0x264c47)]);_0x3f356d[_0x4edf7e('0xfe')][_0x4edf7e('0x18')](0x0,0x0,_0x1f177c,_0x39e941,_0x726033,_0x2a7ca0,!![]);}else{function _0x5c49fd(){const _0x9db1f0=_0x4edf7e;_0x51a37a[_0x9db1f0('0x39')]['Game_Battler_clearTpbChargeTime'][_0x9db1f0('0x96')](this);}}}this[_0x4edf7e('0x35')]=_0x3f356d,this['addChild'](this[_0x4edf7e('0x35')]);},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x170')]=function(){const _0xcc0051=_0x4d175e,_0x3a8518=new Sprite();_0x3a8518[_0xcc0051('0x13')]['x']=this[_0xcc0051('0x13')]['x'],_0x3a8518[_0xcc0051('0x13')]['y']=this[_0xcc0051('0x13')]['y'],this[_0xcc0051('0x164')]=_0x3a8518,this[_0xcc0051('0xa1')](this[_0xcc0051('0x164')]),this[_0xcc0051('0x1cb')]();},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0xa3')]=function(){const _0x5e9edc=_0x4d175e;if(!Window_CTB_TurnOrder[_0x5e9edc('0x15d')]['ShowMarkerBorder'])return;const _0x266d85=Window_CTB_TurnOrder[_0x5e9edc('0x15d')],_0x55377b=this[_0x5e9edc('0x16a')]===$gameParty?'Actor':'Enemy',_0xe7fca5=_0x5e9edc('0x16b')['format'](_0x55377b),_0x45b265=new Sprite();_0x45b265[_0x5e9edc('0x13')]['x']=this['anchor']['x'],_0x45b265[_0x5e9edc('0x13')]['y']=this[_0x5e9edc('0x13')]['y'];if(_0x266d85[_0xe7fca5])_0x45b265[_0x5e9edc('0xfe')]=ImageManager[_0x5e9edc('0x17b')](_0x266d85[_0xe7fca5]);else{let _0x13d300=this['bitmapWidth'](),_0x549779=this['bitmapHeight'](),_0x1faf60=_0x266d85[_0x5e9edc('0xc2')];_0x45b265[_0x5e9edc('0xfe')]=new Bitmap(_0x13d300,_0x549779);const _0xc2479a=_0x5e9edc('0x1ad'),_0x1d6957=ColorManager[_0x5e9edc('0x119')](_0x266d85[_0x5e9edc('0x135')[_0x5e9edc('0x1ba')](_0x55377b)]);_0x45b265[_0x5e9edc('0xfe')]['fillRect'](0x0,0x0,_0x13d300,_0x549779,_0xc2479a),_0x13d300-=0x2,_0x549779-=0x2,_0x45b265[_0x5e9edc('0xfe')][_0x5e9edc('0x1a6')](0x1,0x1,_0x13d300,_0x549779,_0x1d6957),_0x13d300-=_0x1faf60*0x2,_0x549779-=_0x1faf60*0x2,_0x45b265['bitmap'][_0x5e9edc('0x1a6')](0x1+_0x1faf60,0x1+_0x1faf60,_0x13d300,_0x549779,_0xc2479a),_0x13d300-=0x2,_0x549779-=0x2,_0x1faf60+=0x1,_0x45b265[_0x5e9edc('0xfe')][_0x5e9edc('0x14a')](0x1+_0x1faf60,0x1+_0x1faf60,_0x13d300,_0x549779);}this[_0x5e9edc('0x35')]=_0x45b265,this[_0x5e9edc('0xa1')](this[_0x5e9edc('0x35')]);},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x158')]=function(){const _0x4a93bd=_0x4d175e,_0x4d4091=Window_CTB_TurnOrder['Settings'];if(!_0x4d4091[_0x4a93bd('0x157')])return;if(this[_0x4a93bd('0x16a')]===$gameParty)return;const _0x359d19=this[_0x4a93bd('0x126')](),_0x4ed8f4=this[_0x4a93bd('0x3c')](),_0x1c6f86=new Sprite();_0x1c6f86[_0x4a93bd('0x13')]['x']=this[_0x4a93bd('0x13')]['x'],_0x1c6f86[_0x4a93bd('0x13')]['y']=this[_0x4a93bd('0x13')]['y'],_0x1c6f86[_0x4a93bd('0xfe')]=new Bitmap(_0x359d19,_0x4ed8f4),this[_0x4a93bd('0x15b')]=_0x1c6f86,this['addChild'](this[_0x4a93bd('0x15b')]);},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x1b7')]=function(){const _0x11b373=_0x4d175e;return this[_0x11b373('0x16a')]?this[_0x11b373('0x16a')][_0x11b373('0x13b')]()[this[_0x11b373('0x1bc')]]:null;},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x1b2')]=function(_0x26ee26){const _0x621bab=_0x4d175e,_0x4e72dd=this[_0x621bab('0x1b7')]();if(!_0x4e72dd)return Number['MAX_SAFE_INTEGER'];const _0x16d67c=0x1*(this[_0x621bab('0x16e')]+0x1);return _0x4e72dd['ctbTicksToGoal'](_0x16d67c,_0x26ee26);},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x4b')]=function(){const _0x510dcf=_0x4d175e;Sprite[_0x510dcf('0x194')][_0x510dcf('0x4b')][_0x510dcf('0x96')](this),this['checkPosition'](),this['updatePosition'](),this[_0x510dcf('0x6c')](),this[_0x510dcf('0x136')](),this[_0x510dcf('0x69')](),this[_0x510dcf('0xc0')](),this[_0x510dcf('0x71')](),this[_0x510dcf('0x95')]();},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x1a5')]=function(){const _0x18604e=_0x4d175e,_0x245be5=this[_0x18604e('0x18d')]();if(this['_position']===_0x245be5)return;this[_0x18604e('0x2b')]=_0x245be5;const _0x4b8d53=Window_CTB_TurnOrder[_0x18604e('0x15d')],_0xc72f96=this['isHorz'](),_0x1128f9=_0x4b8d53[_0x18604e('0x120')],_0x1f49d3=_0x4b8d53[_0x18604e('0x19f')],_0xdda0df=SceneManager[_0x18604e('0x13f')][_0x18604e('0xba')];if(!_0xdda0df)return;this[_0x18604e('0x6e')]=_0x4b8d53[_0x18604e('0xc5')],this[_0x18604e('0x1a0')]=_0xc72f96?_0x4b8d53[_0x18604e('0x1df')]*_0x245be5:0x0,this[_0x18604e('0x56')]=_0xc72f96?0x0:_0x4b8d53[_0x18604e('0x1df')]*_0x245be5;if(_0x245be5>0x0){if('gOedY'!==_0x18604e('0x19e')){function _0x83d105(){const _0x3d39d9=_0x18604e;let _0x1102c1=_0x43b82c[_0x3d39d9('0xbf')]/0x1388;return _0x1102c1+=_0x1e749b['_actionBattlers']['indexOf'](this)*0x5,_0x1102c1;}}else this['_positionTargetX']+=_0xc72f96?_0x1f49d3:0x0,this['_positionTargetY']+=_0xc72f96?0x0:_0x1f49d3;}if(_0x1128f9){if(_0x18604e('0x123')!==_0x18604e('0x123')){function _0x2acf60(){_0x162512['changeCtbCastTime'](_0x5ca1db(_0x3ea8ba['$1'])*0.01);}}else this[_0x18604e('0x1a0')]=_0xc72f96?_0xdda0df[_0x18604e('0x8')]-this['_positionTargetX']-_0x4b8d53['SpriteThin']:0x0;}else this['_positionTargetY']=_0xc72f96?0x0:_0xdda0df['height']-this[_0x18604e('0x56')]-_0x4b8d53[_0x18604e('0x1df')];},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x1aa')]=function(){const _0x2bffd9=_0x4d175e;if(this['_fadeDuration']>0x0)return;if(this[_0x2bffd9('0x6e')]>0x0){const _0x219338=this['_positionDuration'];this['x']=(this['x']*(_0x219338-0x1)+this[_0x2bffd9('0x1a0')])/_0x219338,this['y']=(this['y']*(_0x219338-0x1)+this[_0x2bffd9('0x56')])/_0x219338,this[_0x2bffd9('0x6e')]--;}if(this[_0x2bffd9('0x6e')]<=0x0){if(_0x2bffd9('0xd2')===_0x2bffd9('0xd2'))this['x']=this[_0x2bffd9('0x1a0')],this['y']=this[_0x2bffd9('0x56')];else{function _0x2a0a7e(){const _0x2b87d1=_0x2bffd9;if(!_0x3a5fd8[_0x2b87d1('0x10d')]())return;if(!_0x28e700[_0x2b87d1('0x128')]())return;if(this[_0x2b87d1('0x129')]())this[_0x2b87d1('0x173')](_0x16dfc4);}}}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x4d175e('0x1c2')]=function(){const _0x4e8b66=_0x4d175e;return Window_CTB_TurnOrder[_0x4e8b66('0x15d')][_0x4e8b66('0x177')]*0x14;},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x115')]=function(){const _0x135292=_0x4d175e;return SceneManager[_0x135292('0x13f')][_0x135292('0xba')];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x4d175e('0x18d')]=function(){const _0x1fb0e6=_0x4d175e;if(!this['containerWindow']())return this[_0x1fb0e6('0x1c2')]();const _0x4e95dd=this['containerWindow']()[_0x1fb0e6('0xe7')];return _0x4e95dd['indexOf'](this);},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x14d')]=function(){const _0x177e31=_0x4d175e,_0x5cabe7=Window_CTB_TurnOrder[_0x177e31('0x15d')],_0x453c4e=this[_0x177e31('0x1b9')](),_0x4a5a3f=_0x453c4e?_0x5cabe7[_0x177e31('0x177')]:_0x5cabe7[_0x177e31('0x5')];this[_0x177e31('0x16e')]-=0x1;if(this['_dupe']<0x0){if('CwRIr'!=='YZoij')this[_0x177e31('0x16e')]=_0x4a5a3f-0x1,this[_0x177e31('0x6')](0x0);else{function _0x4330f3(){const _0x42c9f8=_0x177e31,_0x47b1d3=this[_0x42c9f8('0xa2')]();this[_0x42c9f8('0xf6')]=_0x47b1d3['x'],this[_0x42c9f8('0x15c')]=_0x47b1d3['y'],_0x1a7693[_0x42c9f8('0x194')][_0x42c9f8('0x17d')][_0x42c9f8('0x96')](this,_0x47b1d3),this[_0x42c9f8('0xf9')](),this[_0x42c9f8('0x134')](),this[_0x42c9f8('0x192')]=0x0;}}}},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x6')]=function(_0x39cc2b){const _0x301191=_0x4d175e,_0x4d0675=Window_CTB_TurnOrder[_0x301191('0x15d')];this[_0x301191('0xfb')]=_0x4d0675[_0x301191('0xc5')],this['_fadeTarget']=_0x39cc2b;},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x6c')]=function(){const _0x16d7db=_0x4d175e,_0xe42164=this[_0x16d7db('0x1b7')]();if(!_0xe42164)return;if(this[_0x16d7db('0x0')]===_0xe42164[_0x16d7db('0x1c3')]()&&this[_0x16d7db('0x6d')]===_0xe42164[_0x16d7db('0x166')]())return;this[_0x16d7db('0x0')]=_0xe42164[_0x16d7db('0x1c3')](),this[_0x16d7db('0x6d')]===_0xe42164[_0x16d7db('0x166')]();let _0x36ecfe=this[_0x16d7db('0x0')]&&this[_0x16d7db('0x6d')]?0xff:0x0;this[_0x16d7db('0x6')](_0x36ecfe);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x4d175e('0x136')]=function(){const _0x328ec9=_0x4d175e;if(this['_fadeDuration']>0x0){const _0x47397e=this[_0x328ec9('0xfb')];this[_0x328ec9('0x192')]=(this[_0x328ec9('0x192')]*(_0x47397e-0x1)+this[_0x328ec9('0xd9')])/_0x47397e,this['_fadeDuration']--,this[_0x328ec9('0xfb')]<=0x0&&(this['checkPosition'](),this[_0x328ec9('0x6e')]=0x0,this[_0x328ec9('0x1aa')](),this[_0x328ec9('0x192')]=this[_0x328ec9('0xd9')]);}if(this['_isBattleOver'])return;($gameTroop[_0x328ec9('0xcc')]()[_0x328ec9('0x13d')]<=0x0||$gameParty[_0x328ec9('0xcc')]()[_0x328ec9('0x13d')]<=0x0)&&(this[_0x328ec9('0xb7')]=!![],this['startFade'](0x0));},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x69')]=function(){const _0x13c0c1=_0x4d175e,_0x37aae3=this['battler']();if(!_0x37aae3)return;const _0x17e9f0=Window_CTB_TurnOrder[_0x13c0c1('0x15d')],_0xaeb2b8=this['_unit']===$gameParty?_0x13c0c1('0x51'):_0x13c0c1('0x12d');let _0x32713b=_0x37aae3['TurnOrderCTBGraphicType']();if(_0x37aae3[_0x13c0c1('0x86')]()&&_0x32713b==='enemy'){if('bpwkJ'!==_0x13c0c1('0x14e'))_0x32713b=_0x13c0c1('0x18e');else{function _0x4d5f21(){const _0x2b47f8=_0x13c0c1;_0x18d210[_0x2b47f8('0x39')]['Window_Help_setItem'][_0x2b47f8('0x96')](this,_0x340d60);}}}else _0x37aae3[_0x13c0c1('0x5d')]()&&_0x32713b===_0x13c0c1('0x1a4')&&(_0x32713b='enemy');if(this[_0x13c0c1('0x10')]!==_0x32713b)return this['processUpdateGraphic']();switch(this['_graphicType']){case _0x13c0c1('0x18e'):if(this[_0x13c0c1('0x1b6')]!==_0x37aae3[_0x13c0c1('0x32')]())return this[_0x13c0c1('0x1cb')]();if(this['_graphicFaceIndex']!==_0x37aae3[_0x13c0c1('0x196')]())return this['processUpdateGraphic']();break;case _0x13c0c1('0x118'):if(this[_0x13c0c1('0x9c')]!==_0x37aae3['TurnOrderCTBGraphicIconIndex']())return this['processUpdateGraphic']();break;case _0x13c0c1('0x1a7'):if(_0x37aae3[_0x13c0c1('0x193')]()){if('HbxUI'!=='ZzirY'){if(this[_0x13c0c1('0x18a')]!==_0x37aae3[_0x13c0c1('0x1ae')]()){if(_0x13c0c1('0x142')!=='PMFPP'){function _0x48ec3b(){const _0x551e83=_0x13c0c1;if(!this[_0x551e83('0x128')]())return;const _0x251ebe=_0x3b1830['_scene'][_0x551e83('0xba')];if(!_0x251ebe)return;_0x251ebe['updateTurnOrder'](_0x117b93);}}else return this['processUpdateGraphic']();}}else{function _0x7afd71(){const _0x160dd5=_0x13c0c1;this[_0x160dd5('0x10')]='enemy';}}}else{if(this[_0x13c0c1('0x81')]!==_0x37aae3[_0x13c0c1('0xdc')]()){if(_0x13c0c1('0x1b4')===_0x13c0c1('0x102')){function _0x4d5686(){const _0x13867b=_0x13c0c1;return this['_ctbTurnOrderFaceName']===_0x24eb1b&&(this[_0x13867b('0x85')]=this['createTurnOrderCTBGraphicFaceName']()),this[_0x13867b('0x85')];}}else return this[_0x13c0c1('0x1cb')]();}}break;case _0x13c0c1('0x1a4'):if(_0x37aae3[_0x13c0c1('0x86')]()){if(this[_0x13c0c1('0x18a')]!==_0x37aae3[_0x13c0c1('0xdc')]()){if(_0x13c0c1('0x1b3')!==_0x13c0c1('0xff'))return this[_0x13c0c1('0x1cb')]();else{function _0x5075ad(){const _0x5d2620=_0x13c0c1;this[_0x5d2620('0x10c')]=this['createTurnOrderCTBGraphicIconIndex']();}}}}else{if(this[_0x13c0c1('0x81')]!==_0x37aae3[_0x13c0c1('0xdc')]()){if(_0x13c0c1('0x1c')==='VcKcI')return this[_0x13c0c1('0x1cb')]();else{function _0x3c9a77(){const _0x294bc6=_0x13c0c1;return this[_0x294bc6('0x6b')]===_0x294bc6('0x112')&&this[_0x294bc6('0x165')]()&&this[_0x294bc6('0x165')]()['item']()&&this[_0x294bc6('0x165')]()['item']()['speed']<0x0;}}}}break;}},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x1cb')]=function(){const _0x25f53c=_0x4d175e,_0x268efd=this[_0x25f53c('0x1b7')]();if(!_0x268efd)return;this[_0x25f53c('0x10')]=_0x268efd['TurnOrderCTBGraphicType']();if(_0x268efd[_0x25f53c('0x86')]()&&this[_0x25f53c('0x10')]===_0x25f53c('0x1a7'))this['_graphicType']='face';else{if(_0x268efd[_0x25f53c('0x5d')]()&&this[_0x25f53c('0x10')]===_0x25f53c('0x1a4')){if(_0x25f53c('0x10b')!==_0x25f53c('0x10b')){function _0x3c3bc7(){return this['faceName']();}}else this[_0x25f53c('0x10')]='enemy';}}let _0xa8973f;switch(this[_0x25f53c('0x10')]){case'face':this['_graphicFaceName']=_0x268efd[_0x25f53c('0x32')](),this[_0x25f53c('0x1bd')]=_0x268efd[_0x25f53c('0x196')](),_0xa8973f=ImageManager['loadFace'](this[_0x25f53c('0x1b6')]),_0xa8973f['addLoadListener'](this[_0x25f53c('0x10f')]['bind'](this,_0xa8973f));break;case _0x25f53c('0x118'):this[_0x25f53c('0x9c')]=_0x268efd['createTurnOrderCTBGraphicIconIndex'](),_0xa8973f=ImageManager[_0x25f53c('0x17b')](_0x25f53c('0x1af')),_0xa8973f['addLoadListener'](this[_0x25f53c('0x93')][_0x25f53c('0x190')](this,_0xa8973f));break;case _0x25f53c('0x1a7'):if(_0x268efd['hasSvBattler']()){if('yompZ'!==_0x25f53c('0xc'))this['_graphicSv']=_0x268efd['svBattlerName'](),_0xa8973f=ImageManager[_0x25f53c('0xbb')](this['_graphicSv']),_0xa8973f[_0x25f53c('0xdb')](this['changeSvActorGraphicBitmap'][_0x25f53c('0x190')](this,_0xa8973f));else{function _0x1e3ed5(){const _0x410e35=_0x25f53c;this[_0x410e35('0x3f')]+=this[_0x410e35('0x88')](),this[_0x410e35('0x3f')]>=this[_0x410e35('0x97')]()&&(this[_0x410e35('0x6b')]=_0x410e35('0x23'));}}}else $gameSystem[_0x25f53c('0x7b')]()?(this[_0x25f53c('0x81')]=_0x268efd[_0x25f53c('0xdc')](),_0xa8973f=ImageManager[_0x25f53c('0x1f')](this['_graphicEnemy']),_0xa8973f[_0x25f53c('0xdb')](this['changeEnemyGraphicBitmap'][_0x25f53c('0x190')](this,_0xa8973f))):(this[_0x25f53c('0x81')]=_0x268efd['battlerName'](),_0xa8973f=ImageManager[_0x25f53c('0x117')](this[_0x25f53c('0x81')]),_0xa8973f[_0x25f53c('0xdb')](this[_0x25f53c('0x155')]['bind'](this,_0xa8973f)));break;case _0x25f53c('0x1a4'):this[_0x25f53c('0x18a')]=_0x268efd['battlerName'](),_0xa8973f=ImageManager['loadSvActor'](this[_0x25f53c('0x18a')]),_0xa8973f[_0x25f53c('0xdb')](this['changeSvActorGraphicBitmap'][_0x25f53c('0x190')](this,_0xa8973f));break;}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x4d175e('0x10f')]=function(_0x4280c7){const _0x55768a=_0x4d175e,_0x282c26=this['_graphicFaceIndex'],_0xa66a9e=this[_0x55768a('0x126')](),_0x8bea4c=this['bitmapHeight'](),_0x49ac39=Math['max'](_0xa66a9e,_0x8bea4c);this[_0x55768a('0x164')][_0x55768a('0xfe')]=new Bitmap(_0xa66a9e,_0x8bea4c);const _0x376293=this[_0x55768a('0x164')][_0x55768a('0xfe')],_0x1ef028=ImageManager[_0x55768a('0x185')],_0x33a63d=ImageManager[_0x55768a('0xd')],_0x15c3ac=_0x49ac39/Math[_0x55768a('0x1a1')](_0x1ef028,_0x33a63d),_0x7b95bb=ImageManager[_0x55768a('0x185')],_0x2b594e=ImageManager[_0x55768a('0xd')],_0x58883a=_0x282c26%0x4*_0x1ef028+(_0x1ef028-_0x7b95bb)/0x2,_0xbf2c26=Math[_0x55768a('0xde')](_0x282c26/0x4)*_0x33a63d+(_0x33a63d-_0x2b594e)/0x2,_0x4fd961=(_0xa66a9e-_0x1ef028*_0x15c3ac)/0x2,_0x54cd72=(_0x8bea4c-_0x33a63d*_0x15c3ac)/0x2;_0x376293[_0x55768a('0x13e')](_0x4280c7,_0x58883a,_0xbf2c26,_0x7b95bb,_0x2b594e,_0x4fd961,_0x54cd72,_0x49ac39,_0x49ac39);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x4d175e('0x93')]=function(_0x5e6f3b){const _0x575225=_0x4d175e,_0x44d7a5=this[_0x575225('0x9c')],_0x585a34=this[_0x575225('0x126')](),_0x14633a=this[_0x575225('0x3c')]();this[_0x575225('0x164')][_0x575225('0xfe')]=new Bitmap(_0x585a34,_0x14633a);const _0x5adc48=this[_0x575225('0x164')][_0x575225('0xfe')],_0x32f017=ImageManager[_0x575225('0x10e')],_0x5cd1e7=ImageManager[_0x575225('0x68')],_0x260adb=Math[_0x575225('0x7e')](_0x32f017,_0x5cd1e7,_0x585a34,_0x14633a),_0x31e210=_0x44d7a5%0x10*_0x32f017,_0x24832e=Math[_0x575225('0xde')](_0x44d7a5/0x10)*_0x5cd1e7,_0x180115=Math['floor'](Math[_0x575225('0x1a1')](_0x585a34-_0x260adb,0x0)/0x2),_0x1fa4a3=Math['floor'](Math[_0x575225('0x1a1')](_0x14633a-_0x260adb,0x0)/0x2);_0x5adc48[_0x575225('0x13e')](_0x5e6f3b,_0x31e210,_0x24832e,_0x32f017,_0x5cd1e7,_0x180115,_0x1fa4a3,_0x260adb,_0x260adb);},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x19d')]=function(_0x2d1acc){const _0x250814=_0x4d175e,_0x2407ff=this[_0x250814('0x126')](),_0x1ae920=this[_0x250814('0x3c')](),_0x4ec676=Math[_0x250814('0x7e')](_0x2407ff,_0x1ae920);this[_0x250814('0x164')][_0x250814('0xfe')]=new Bitmap(_0x2407ff,_0x1ae920);const _0x4425eb=this['_graphicSprite'][_0x250814('0xfe')],_0x1b0586=0x9,_0x42dc05=0x6,_0x3b74f1=_0x2d1acc[_0x250814('0x8')]/_0x1b0586,_0x3f6202=_0x2d1acc[_0x250814('0x150')]/_0x42dc05,_0xc58710=Math['min'](0x1,_0x4ec676/_0x3b74f1,_0x4ec676/_0x3f6202),_0x57ad75=_0x3b74f1*_0xc58710,_0x39e517=_0x3f6202*_0xc58710,_0x597849=Math[_0x250814('0x9b')]((_0x2407ff-_0x57ad75)/0x2),_0x5bb699=Math[_0x250814('0x9b')]((_0x1ae920-_0x39e517)/0x2);_0x4425eb[_0x250814('0x13e')](_0x2d1acc,0x0,0x0,_0x3b74f1,_0x3f6202,_0x597849,_0x5bb699,_0x57ad75,_0x39e517);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x4d175e('0x155')]=function(_0x3684b8){const _0x577c9c=_0x4d175e,_0x2900cf=Window_CTB_TurnOrder['Settings'],_0x43f01f=this[_0x577c9c('0x126')](),_0x3d591e=this[_0x577c9c('0x3c')](),_0x3c94c9=Math[_0x577c9c('0x7e')](_0x43f01f,_0x3d591e);this[_0x577c9c('0x164')][_0x577c9c('0xfe')]=new Bitmap(_0x43f01f,_0x3d591e);const _0x50d4b0=this[_0x577c9c('0x164')][_0x577c9c('0xfe')],_0x19a81f=Math['min'](0x1,_0x3c94c9/_0x3684b8['width'],_0x3c94c9/_0x3684b8[_0x577c9c('0x150')]),_0x416da9=_0x3684b8['width']*_0x19a81f,_0x51b3a8=_0x3684b8[_0x577c9c('0x150')]*_0x19a81f,_0x650bf2=Math['round']((_0x43f01f-_0x416da9)/0x2),_0x29c962=Math[_0x577c9c('0x9b')]((_0x3d591e-_0x51b3a8)/0x2);_0x50d4b0['blt'](_0x3684b8,0x0,0x0,_0x3684b8[_0x577c9c('0x8')],_0x3684b8['height'],_0x650bf2,_0x29c962,_0x416da9,_0x51b3a8);},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')]['updateGraphicHue']=function(){const _0x38e4bb=_0x4d175e,_0x2f246c=this[_0x38e4bb('0x1b7')]();if(!_0x2f246c)return;if(!_0x2f246c[_0x38e4bb('0x5d')]())return;if(this[_0x38e4bb('0x199')]===_0x2f246c[_0x38e4bb('0x191')]())return;this[_0x38e4bb('0x199')]=_0x2f246c[_0x38e4bb('0x191')]();if(_0x2f246c[_0x38e4bb('0x193')]())this[_0x38e4bb('0x199')]=0x0;this['_graphicSprite'][_0x38e4bb('0xd1')](this[_0x38e4bb('0x199')]);},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x71')]=function(){const _0xac7089=_0x4d175e;if(!this[_0xac7089('0x15b')])return;const _0x447df4=this[_0xac7089('0x1b7')]();if(!_0x447df4)return;if(this[_0xac7089('0x153')]===_0x447df4[_0xac7089('0x153')]&&this[_0xac7089('0x154')]===_0x447df4[_0xac7089('0x154')])return;this[_0xac7089('0x153')]=_0x447df4[_0xac7089('0x153')],this['_plural']=_0x447df4[_0xac7089('0x154')];const _0x24a0cb=Window_CTB_TurnOrder['Settings'],_0x56252c=this[_0xac7089('0x1b9')](),_0x848803=this['bitmapWidth'](),_0x198357=this['bitmapHeight'](),_0x334f1f=this[_0xac7089('0x15b')][_0xac7089('0xfe')];_0x334f1f[_0xac7089('0x91')]();if(!this[_0xac7089('0x154')])return;_0x334f1f[_0xac7089('0xe3')]=_0x24a0cb['EnemyBattlerFontFace']||$gameSystem['mainFontFace'](),_0x334f1f[_0xac7089('0x43')]=_0x24a0cb[_0xac7089('0x138')]||0x10,_0x56252c?_0x334f1f['drawText'](this[_0xac7089('0x153')]['trim'](),0x0,_0x198357/0x2,_0x848803,_0x198357/0x2,_0xac7089('0x1bb')):_0x334f1f[_0xac7089('0xe4')](this[_0xac7089('0x153')][_0xac7089('0x73')](),0x0,0x2,_0x848803-0x8,_0x198357-0x4,'right');},Sprite_CTB_TurnOrder_Battler[_0x4d175e('0x194')][_0x4d175e('0x95')]=function(){const _0x3bd6a6=_0x4d175e,_0x574eec=this['battler']();if(!_0x574eec)return;const _0x4f9f9f=_0x574eec[_0x3bd6a6('0x1b7')]();if(!_0x4f9f9f)return;const _0x119747=_0x4f9f9f[_0x3bd6a6('0x8d')]();if(!_0x119747)return;this[_0x3bd6a6('0x109')](_0x119747[_0x3bd6a6('0x1a')]);},VisuMZ[_0x4d175e('0x39')][_0x4d175e('0xc3')]=Window_Help[_0x4d175e('0x194')]['setItem'],Window_Help['prototype'][_0x4d175e('0xf7')]=function(_0x1de445){const _0x5ccf7b=_0x4d175e;BattleManager[_0x5ccf7b('0x128')]()&&_0x1de445&&_0x1de445[_0x5ccf7b('0x34')]&&_0x1de445[_0x5ccf7b('0x34')]['match'](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this[_0x5ccf7b('0x1d1')](String(RegExp['$1'])):VisuMZ[_0x5ccf7b('0x39')]['Window_Help_setItem'][_0x5ccf7b('0x96')](this,_0x1de445);},VisuMZ['BattleSystemCTB'][_0x4d175e('0xca')]=Window_StatusBase[_0x4d175e('0x194')][_0x4d175e('0x1db')],Window_StatusBase[_0x4d175e('0x194')]['placeGauge']=function(_0xdca16b,_0xfcb2a4,_0x51b36c,_0xef0ad6){const _0x4365da=_0x4d175e;if(BattleManager[_0x4365da('0x128')]()&&_0xfcb2a4==='time')return;VisuMZ[_0x4365da('0x39')][_0x4365da('0xca')]['call'](this,_0xdca16b,_0xfcb2a4,_0x51b36c,_0xef0ad6);};function Window_CTB_TurnOrder(){const _0x54e132=_0x4d175e;this[_0x54e132('0x17d')](...arguments);}Window_CTB_TurnOrder[_0x4d175e('0x194')]=Object[_0x4d175e('0x17')](Window_Base[_0x4d175e('0x194')]),Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0xfd')]=Window_CTB_TurnOrder,Window_CTB_TurnOrder[_0x4d175e('0x15d')]=VisuMZ[_0x4d175e('0x39')][_0x4d175e('0x15d')]['TurnOrder'],Window_CTB_TurnOrder['prototype'][_0x4d175e('0x17d')]=function(){const _0x4b6178=_0x4d175e,_0x9c7bbb=this[_0x4b6178('0xa2')]();this['_homeX']=_0x9c7bbb['x'],this[_0x4b6178('0x15c')]=_0x9c7bbb['y'],Window_Base['prototype'][_0x4b6178('0x17d')]['call'](this,_0x9c7bbb),this[_0x4b6178('0xf9')](),this[_0x4b6178('0x134')](),this[_0x4b6178('0x192')]=0x0;},Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0xa2')]=function(){const _0x3e32d3=_0x4d175e,_0x16c52a=Window_CTB_TurnOrder['Settings'],_0x41bce1=SceneManager[_0x3e32d3('0x13f')][_0x3e32d3('0x37')][_0x3e32d3('0x150')],_0x29fe04=SceneManager[_0x3e32d3('0x13f')][_0x3e32d3('0x139')][_0x3e32d3('0x150')],_0xe9efa=_0x16c52a[_0x3e32d3('0x19f')];let _0xd14d22=0x0,_0x1279ab=0x0,_0x5b9534=0x0,_0x3ddbaa=0x0;switch(_0x16c52a[_0x3e32d3('0x189')]){case _0x3e32d3('0x74'):_0xd14d22=_0x16c52a['SpriteThin']*_0x16c52a['TotalHorzSprites']+_0xe9efa,_0x1279ab=_0x16c52a[_0x3e32d3('0x55')],_0x5b9534=Math[_0x3e32d3('0x40')]((Graphics[_0x3e32d3('0x8')]-_0xd14d22)/0x2),_0x3ddbaa=_0x16c52a[_0x3e32d3('0x2c')];break;case'bottom':_0xd14d22=_0x16c52a['SpriteThin']*_0x16c52a[_0x3e32d3('0x177')]+_0xe9efa,_0x1279ab=_0x16c52a[_0x3e32d3('0x55')],_0x5b9534=Math[_0x3e32d3('0x40')]((Graphics[_0x3e32d3('0x8')]-_0xd14d22)/0x2),_0x3ddbaa=Graphics[_0x3e32d3('0x150')]-_0x41bce1-_0x1279ab-_0x16c52a[_0x3e32d3('0x2c')];break;case'left':_0xd14d22=_0x16c52a[_0x3e32d3('0x55')],_0x1279ab=_0x16c52a[_0x3e32d3('0x1df')]*_0x16c52a[_0x3e32d3('0x5')]+_0xe9efa,_0x5b9534=_0x16c52a[_0x3e32d3('0x2c')],_0x3ddbaa=Math[_0x3e32d3('0x40')]((Graphics[_0x3e32d3('0x150')]-_0x41bce1+_0x29fe04-_0x1279ab)/0x2);break;case _0x3e32d3('0x8a'):_0xd14d22=_0x16c52a[_0x3e32d3('0x55')],_0x1279ab=_0x16c52a['SpriteThin']*_0x16c52a['TotalVertSprites']+_0xe9efa,_0x5b9534=Graphics[_0x3e32d3('0x8')]-_0xd14d22-_0x16c52a['ScreenBuffer'],_0x3ddbaa=Math[_0x3e32d3('0x40')]((Graphics[_0x3e32d3('0x150')]-_0x41bce1+_0x29fe04-_0x1279ab)/0x2);break;}return _0x5b9534+=_0x16c52a[_0x3e32d3('0xdd')],_0x3ddbaa+=_0x16c52a[_0x3e32d3('0x27')],new Rectangle(_0x5b9534,_0x3ddbaa,_0xd14d22,_0x1279ab);},Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0xcd')]=function(){const _0x8bddf4=_0x4d175e;this[_0x8bddf4('0x103')]=0x0;},Window_CTB_TurnOrder['prototype'][_0x4d175e('0x1b9')]=function(){const _0x219d82=_0x4d175e,_0x28e2c9=Window_CTB_TurnOrder['Settings'],_0x4d2bce=[_0x219d82('0x74'),_0x219d82('0x1c1')][_0x219d82('0x89')](_0x28e2c9['DisplayPosition']);return _0x4d2bce;},Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0xf9')]=function(){const _0x15a3e5=_0x4d175e,_0x565740=Window_CTB_TurnOrder[_0x15a3e5('0x15d')],_0x390198=this[_0x15a3e5('0x1b9')](),_0x75ef72=_0x390198?_0x565740[_0x15a3e5('0x177')]:_0x565740['TotalVertSprites'];this[_0x15a3e5('0xd5')]=new Sprite(),this['addInnerChild'](this[_0x15a3e5('0xd5')]),this['_turnOrderContainer']=[];for(let _0xe3617f=0x0;_0xe3617f<$gameParty[_0x15a3e5('0x15')]();_0xe3617f++){for(let _0x38f9d8=0x0;_0x38f9d8<_0x75ef72;_0x38f9d8++){if('Tvkal'!=='Tvkal'){function _0x4819dc(){const _0x4b2bdf=_0x15a3e5,_0x48d5d1=_0x2ec4bb['%1PopupText'[_0x4b2bdf('0x1ba')](_0x5918bb)],_0x12adf4={'textColor':_0x6277ec[_0x4b2bdf('0x119')](_0x2c559f[_0x4b2bdf('0x1c5')[_0x4b2bdf('0x1ba')](_0x533f2d)]),'flashColor':_0x3d374c['%1FlashColor'[_0x4b2bdf('0x1ba')](_0x44994f)],'flashDuration':_0x33b891[_0x4b2bdf('0x181')[_0x4b2bdf('0x1ba')](_0x5e85ca)]};this['setupTextPopup'](_0x48d5d1,_0x12adf4);}}else{const _0x50b749=new Sprite_CTB_TurnOrder_Battler($gameParty,_0xe3617f,_0x38f9d8);this[_0x15a3e5('0xd5')][_0x15a3e5('0xa1')](_0x50b749),this[_0x15a3e5('0xe7')][_0x15a3e5('0x24')](_0x50b749);}}}for(let _0x465f29=0x0;_0x465f29<0x8;_0x465f29++){for(let _0x2470fb=0x0;_0x2470fb<_0x75ef72;_0x2470fb++){if(_0x15a3e5('0x1ce')==='dzAhJ'){function _0x22a707(){const _0x3382c1=_0x15a3e5,_0x17809=_0x53b8d3['format'](_0x11303f[_0x3382c1('0x186')]()[_0x3382c1('0x73')](),_0x3382c1('0x152'),_0x3382c1('0x46')),_0x1fb078=new _0x31059c(_0x17809,'i');_0x5ef7ba[_0x3382c1('0x39')][_0x3382c1('0x28')][_0x13a144]=_0x1fb078;}}else{const _0x2300fb=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x465f29,_0x2470fb);this[_0x15a3e5('0xd5')][_0x15a3e5('0xa1')](_0x2300fb),this[_0x15a3e5('0xe7')][_0x15a3e5('0x24')](_0x2300fb);}}}},Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0x4b')]=function(){const _0x2806ce=_0x4d175e;Window_Base['prototype'][_0x2806ce('0x4b')][_0x2806ce('0x96')](this),this[_0x2806ce('0x1aa')](),this[_0x2806ce('0x1c4')](),this[_0x2806ce('0x134')]();},Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0x1aa')]=function(){const _0x585ce2=_0x4d175e,_0x324564=Window_CTB_TurnOrder['Settings'];if(_0x324564[_0x585ce2('0x189')]!=='top')return;if(!_0x324564[_0x585ce2('0xbe')])return;const _0x2d7530=SceneManager[_0x585ce2('0x13f')][_0x585ce2('0x139')];if(!_0x2d7530)return;if(_0x2d7530[_0x585ce2('0xf5')])this['x']=this[_0x585ce2('0xf6')]+(_0x324564[_0x585ce2('0x114')]||0x0),this['y']=this[_0x585ce2('0x15c')]+(_0x324564[_0x585ce2('0xf0')]||0x0);else{if(_0x585ce2('0x15e')===_0x585ce2('0x19')){function _0xcce682(){const _0x293726=_0x585ce2;_0x4af099=_0x293726('0x18e');}}else this['x']=this[_0x585ce2('0xf6')],this['y']=this[_0x585ce2('0x15c')];}const _0x4576ff=SceneManager[_0x585ce2('0x13f')]['_windowLayer'];this['x']+=_0x4576ff['x'],this['y']+=_0x4576ff['y'];},Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0x1c4')]=function(){const _0x503bff=_0x4d175e;if(!this['_turnOrderInnerSprite'])return;const _0x552ca8=this[_0x503bff('0xd5')]['children'];if(!_0x552ca8)return;_0x552ca8[_0x503bff('0x14b')](this['compareBattlerSprites'][_0x503bff('0x190')](this));},Window_CTB_TurnOrder[_0x4d175e('0x194')]['compareBattlerSprites']=function(_0x461fa3,_0x447e81){const _0x4d706f=_0x4d175e,_0x3beee4=this[_0x4d706f('0x1b9')](),_0x569e50=Window_CTB_TurnOrder[_0x4d706f('0x15d')]['OrderDirection'];if(_0x3beee4&&!_0x569e50){if(_0x4d706f('0x7a')!==_0x4d706f('0x7a')){function _0x297e12(){const _0x5708ab=_0x4d706f;_0x3530a4[_0x5708ab('0x39')][_0x5708ab('0x66')](_0x1314fe,_0x3c233b);}}else return _0x461fa3['x']-_0x447e81['x'];}else{if(_0x3beee4&&_0x569e50)return _0x447e81['x']-_0x461fa3['x'];else{if(!_0x3beee4&&_0x569e50)return _0x461fa3['y']-_0x447e81['y'];else{if(!_0x3beee4&&!_0x569e50){if('ArhKo'==='zgXcH'){function _0x1a0ab0(){const _0x34a952=_0x4d706f;if(!this[_0x34a952('0xd5')])return;const _0x42e86e=this[_0x34a952('0xd5')][_0x34a952('0x11')];if(!_0x42e86e)return;_0x42e86e['sort'](this[_0x34a952('0x4a')][_0x34a952('0x190')](this));}}else return _0x447e81['y']-_0x461fa3['y'];}}}}},Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0x134')]=function(){const _0x30212a=_0x4d175e;this[_0x30212a('0xf5')]=$gameSystem[_0x30212a('0x2d')]();},Window_CTB_TurnOrder[_0x4d175e('0x194')]['updateTurnOrder']=function(_0x2c8050){const _0x215fa2=_0x4d175e;this[_0x215fa2('0xe7')]['sort']((_0x273fc8,_0x32df4d)=>{if('uCKUb'==='xqHew'){function _0x13f227(){const _0x41e2fc=_0x4e76;if(!this['isCTB']())return;this[_0x41e2fc('0x130')]&&this[_0x41e2fc('0x130')]['numActions']()<=0x0&&this['rotateCTBSprites']();}}else return _0x273fc8['ticksLeft']()-_0x32df4d['ticksLeft']();});if(!_0x2c8050)return;for(const _0x121f72 of this['_turnOrderContainer']){if(_0x215fa2('0x160')!=='nCnzC'){function _0xa57282(){const _0x11c618=_0x215fa2;this['_tpbChargeTime']+=this['tpbAcceleration'](),this['_tpbChargeTime']>=0x1&&this[_0x11c618('0x111')]();}}else{if(!_0x121f72)continue;_0x121f72[_0x215fa2('0x4b')](),_0x121f72[_0x215fa2('0x6e')]=0x0;}}},Window_CTB_TurnOrder[_0x4d175e('0x194')][_0x4d175e('0x14c')]=function(_0x1f3c26){const _0x297471=_0x4d175e;for(const _0x3a6d35 of this['_turnOrderContainer']){if(!_0x3a6d35)continue;if(_0x3a6d35[_0x297471('0x1b7')]()!==_0x1f3c26)continue;_0x3a6d35[_0x297471('0x14d')]();}};
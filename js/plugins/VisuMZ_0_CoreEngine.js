//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.08] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * - Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * - If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 *
 * Move Picture, Origin Differences
 *
 * - If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
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
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB wait: Time Progress Battle (Wait)
 *     - -
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Outline Color:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @max 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @max 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @max 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @max 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"2","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindoheighteight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = ImageManager.faceHeight + padding * 2;\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - (height + inputWindoheighteight + 8)) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height + 8;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param BreakExperimental1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Experimental Parameters
 * @default Use at your own risk!!!
 *
 * @param BreakExperimental2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFromt(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Outline Color
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2;\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x23a5=['render','adjustSprite','INOUTCIRC','updatePosition','Bitmap_resize','_drawTextOutline','createFauxAnimation','updateOpacity','_optionsWindow','CommandWidth','Plus','helpAreaHeight','SideView','OpenConsole','TextManager_param','setLastPluginCommandInterpreter','wwmXM','_buyWindow','_profileWindow','CustomParamIcons','_goldWindow','HYPHEN_MINUS','Script\x20Call\x20Error','result','CustomParamNames','_forcedBattleSys','MenuLayout','NUM','END','Power','worldTransform','isEnemy','NEAREST','_repositioned','Rate2','ARRAYJSON','_targetOffsetX','_lastPluginCommandInterpreter','loadWindowskin','ONE','animationShouldMirror','updateKeyText','makeDocumentTitle','sAadh','ParamChange','isMenuButtonAssistEnabled','hpGaugeColor2','setSideView','gaugeRate','processCursorMove','setActorHome','setupCoreEngine','KEEP','NUM_LOCK','openURL','CLOSE_PAREN','ColorTPCost','EnableJS','focus','Sprite_Battler_startMove','_tempActor','isPlaying','FLBru','OUTCIRC','MAX_GL_TEXTURES','nextLevelExp','Sprite_destroy','sqrt','SideButtons','stop','IconParam5','resetBattleSystem','CTB','PBiTb','VOLUME_DOWN','buttonAssistWindowButtonRect','_baseTexture','OPEN_PAREN','Enemy','Scene_Item_create','buttonAssistKey4','qfYuK','battlebacks1','loaeR','INOUTQUAD','actor','_changingClass','ForceNoPlayTest','zkYov','_isPlaytest','vkEsD','%2%1%3','gameTitle','MRF','FDR','EndingID','QoL','Linear','initButtonHidden','TAB','IKmXB','TGR','canUse','SnapshotOpacity','menuShowButton','initVisuMZCoreEngine','IciAp','DrawItemBackgroundJS','cursorUp','Settings','_itemWindow','hit','bWtJj','GUyTB','Scene_Equip_create','printError','DummyRect','endAnimation','addWindow','refreshDimmerBitmap','onPress','NewGameBoot','touchUI','UbdER','isSideButtonLayout','isExpGaugeDrawn','traitObjects','vertJS','Scene_Boot_updateDocumentTitle','DimColor2','LINEAR','padding','ColSpacing','hGnpn','tpColor','buttonAssistText%1','tDdJb','RizCD','isNextScene','OKWLO','WIN_OEM_RESET','text','ydLdS','NameMenu','Game_Screen_initialize','processTouchModernControls','DfARk','SHIFT','Conditional\x20Branch\x20Script\x20Error','Tmhbb','gaugeLineHeight','Flat','Window_Base_drawText','destroy','DOWN','areButtonsOutsideMainUI','NCRiz','catchException','_paramPlus','areTileShadowsHidden','ButtonFadeSpeed','HELP','MainMenu','bitmap','TPB\x20ACTIVE','horzJS','DefaultStyle','getInputMultiButtonStrings','createChildSprite','aHeKZ','IconParam7','Scene_Skill_create','Spriteset_Base_updatePosition','setActorHomeRepositioned','includes','targetSpritePosition','([\x5c+\x5c-]\x5cd+)([%％])>','addChild','clearForcedGameTroopSettingsCoreEngine','CTRL','AxzkM','Padding','mhp','CustomParamAbb','onEscapeSuccess','NONCONVERT','szpBe','process_VisuMZ_CoreEngine_CustomParameters','SParamVocab8','RepositionEnemies','jSXUJ','XParamVocab6','centerSprite','system','toLocaleString','terms','fillRect','OPEN_CURLY_BRACKET','DisplayedParams','LESS_THAN','CNT','ShowDevTools','picture','zDOYh','value','CommandList','isMapScrollLinked','F20','FbSvG','createDigits','playEscape','layoutSettings','_shakePower','fillStyle','kxcvh','buttonAssistOffset1','showFauxAnimations','pendingColor','_stored_tpGaugeColor2','JUNJA','GMyCC','initialBattleSystem','statusEquipWindowRect','mainAreaHeight','_stored_hpGaugeColor2','inputWindowRect','targetContentsOpacity','integer','onMouseEnter','movePageButtonSideButtonLayout','_movementDuration','targetScaleX','updateTransform','toUpperCase','drawCurrencyValue','targetBackOpacity','retrieveFauxAnimation','XjPWZ','CRI','Game_Temp_initialize','isUseModernControls','removeAllFauxAnimations','onMouseExit','setMainFontSize','ColorPowerDown','GhpAu','FontSmoothing','getButtonAssistLocation','F11','TimeProgress','_playtestF7Looping','currentLevelExp','prototype','_pressed','Flat2','CEV','sparamPlusJS','_stored_deathColor','contents','_effectsContainer','StartID','IMsdI','Graphics','IconXParam6','TmkQj','isRepeated','xparamPlus2','menu','save','WIN_OEM_FJ_ROYA','_defaultStretchMode','buttonAssistKey1','isClickEnabled','WIN_OEM_ENLW','WIN_OEM_FJ_MASSHOU','mainAreaHeightSideButtonLayout','IconSParam5','loadSystemImages','textWidth','ActorBgType','itemPadding','Param','advanced','_digitGrouping','_forcedTroopView','command357','Bitmap_fillRect','sTBvK','nw.gui','UZZQs','ModernControls','up2','nickname','currentValue','ttcOs','updatePictureAntiZoom','ShopMenu','updateMove','params','ProfileRect','BgType','create','Sprite_Animation_processSoundTimings','INQUART','initBasic','Spriteset_Battle_createEnemies','Graphics_centerElement','OUTSINE','Window_Base_initialize','_destroyInternalTextures','outbounce','LUK','Window_Selectable_processCursorMove','pixelated','NUMPAD5','BgFilename2','Bitmap_gradientFillRect','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','markCoreEngineModified','tileHeight','gold','updatePlayTestF7','translucentOpacity','FnMrl','Window','_bitmap','process_VisuMZ_CoreEngine_RegExp','isBottomButtonMode','isPlaytest','AMFiL','Game_Interpreter_command355','WIN_OEM_PA3','BgFilename1','bIDWC','BottomHelp','Game_Actor_paramBase','GoldChange','tileWidth','ConvertNumberToString','Game_Troop_setup','anchorCoreEasing','qdTed','cygBB','WcRun','SEMICOLON','WIN_OEM_ATTN','LHYIE','StatusRect','itemHitImprovedAccuracy','wLfcc','boxWidth','reserveCommonEvent','buttonAssistOffset4','clearRect','F23','setClickHandler','TextStr','HRG','buttonAssistOffset5','FunctionName','_digitGroupingEx','Scene_Base_createWindowLayer','_buttonAssistWindow','XParamVocab5','QimSy','status','log','playCursorSound','drawCurrentParam','text%1','IconSParam6','updatePositionCoreEngineShakeOriginal','Scene_MenuBase_createBackground','#%1','mpGaugeColor2','PetQv','Scene_Map_updateMainMultiply','BasicParameterFormula','Window_ShopSell_isEnabled','Version','WIN_OEM_AUTO','F7key','updateOrigin','animations','statusWindowRect','Game_Map_setup','ColorTPGauge1','context','move','playMiss','Bitmap_drawTextOutline','IconSParam1','CreateBattleSystemID','isEnabled','NjMTf','AasGL','INOUTQUINT','hqjBG','Game_Picture_move','Plus1','DIVIDE','reservePlayTestNewGameCommonEvent','createButtonAssistWindow','ARRAYSTR','INELASTIC','iconWidth','expRate','Plus2','drawRightArrow','_internalTextures','changeTextColor','IconXParam5','buttonAssistWindowRect','targetOpacity','Scene_Options_create','sv_actors','MAX_SAFE_INTEGER','_CoreEngineSettings','setWindowPadding','Sprite_Button_updateOpacity','Bitmap_drawCircle','isTpb','NumberRect','_isWindow','IconSParam8','isWindowMaskingEnabled','SystemSetSideView','_hp','lNLdT','Scene_MenuBase_mainAreaTop','drawParamText','renderNoMask','flush','currentExp','levelUpRecovery','cursorLeft','FadeSpeed','OUTEXPO','isTriggered','Sprite_Button_initialize','vxDsR','Sprite_Actor_setActorHome','CLOSE_CURLY_BRACKET','BattleSystem','updateFauxAnimations','BACK_SLASH','_dummyWindow','GoldFontSize','VHKqO','PJGxz','maxItems','LevelUpFullMp','Abbreviation','FkLvG','xparamRate1','numberWindowRect','SParamVocab4','createFauxAnimationSprite','_stored_tpGaugeColor1','makeFontBigger','framebuffer','meVolume','drawGameVersion','AWjQY','processMoveCommand','MCR','RXBOR','MINUS','_offsetY','_encounterCount','Window_Selectable_processTouch','ListBgType','KANA','textSizeEx','openingSpeed','Bitmap_strokeRect','processSoundTimings','setGuard','process_VisuMZ_CoreEngine_Actor_Notetags','qfpvJ','xparamFlatJS','mute','isKeyItem','_playTestFastMode','process_VisuMZ_CoreEngine_Notetags','sparamPlus1','IconXParam9','Gold','GRD','catchUnknownError','EQUAL','command355','checkSmartEventCollision','titles2','iwCAX','setHandler','_stored_expGaugeColor2','title','SELECT','usableSkills','GoldOverlap','battlebacks2','ApplyEasing','xXRgV','BottomButtons','ColorMaxLvGauge2','COMMA','BackOpacity','GOrCV','attackSkillId','createCustomBackgroundImages','IconSParam2','traitsPi','_stored_mpGaugeColor1','INBOUNCE','map','expGaugeColor1','zHDhQ','IconXParam1','DigitGroupingStandardText','ZOOM','evade','IconSParam7','floor','drawIcon','Tilemap_addShadow','NUMPAD3','_pictureContainer','_coreEasing','iBRAz','sZnTg','INOUTSINE','setFrame','XParamVocab2','EnableMasking','ColorCTGauge1','cWxLx','_centerElementCoreEngine','_shakeSpeed','_offsetX','Layer','batch','BaseTexture','itemBackColor2','buttonAssistWindowSideRect','drawItem','F19','HANJA','NmCQZ','RightMenus','ParamArrow','fadeSpeed','buttonAssistKey5','iKKhe','YbvZX','ItemHeight','isItem','KeyItemProtect','top','sparamRateJS','asin','_mp','MAXMP','ColorTPGauge2','Location','currentClass','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','pagedown','JJJoT','processFauxAnimationRequests','INSERT','_blank','MZyfK','createWindowLayer','ActorMPColor','center','background','tIHtz','buttonAssistOffset%1','_animation','ctrlKey','IconParam0','BoxMargin','performEscape','RfbiO','process_VisuMZ_CoreEngine_Functions','original','gradientFillRect','destroyCoreEngineMarkedBitmaps','skillId','ProfileBgType','random','Bitmap_clearRect','initMembers','SParamVocab7','_dimmerSprite','sellWindowRect','bQvyk','update','oZBWD','sv_enemies','GyAfZ','CodeJS','IconSParam9','description','TextCodeClassNames','MPzcg','VisuMZ_1_OptionsCore','_movementWholeDuration','repositionEnemiesByResolution','skipBranch','SkillTypeRect','maxGold','Title','setupButtonImage','ShowButtons','match','SLASH','initCoreEngineScreenShake','LevelUpFullHp','cursorPageup','paramPlus','setMoveEasingType','Spriteset_Base_destroy','CONVERT','shift','stencilOp','win32','DXWAq','pageup','_stored_mpCostColor','F17','Game_Interpreter_command122','pggKB','show','F14','determineSideButtonLayoutValid','JQBSu','crisisColor','animationNextDelay','XASmJ','INQUAD','_sellWindow','hideButtonFromView','encounterStepsMinimum','buttonAreaHeight','_editWindow','wpGHx','<JS\x20%1\x20%2:[\x20](.*)>','duration','call','popScene','ColorNormal','buttonY','setAnchor','drawIconBySize','_categoryWindow','_inputWindow','numberShowButton','EIaHZ','SceneManager_onKeyDown','backOpacity','_colorCache','xparamPlus','reduce','getBattleSystem','SellBgType','Rate1','IconParam3','ALT','_commandWindow','XDobG','commandWindowRect','DigitGroupingGaugeSprites','isDying','subjectHitRate','startNormalGame','Sprite_Picture_updateOrigin','note','EXSEL','TPB\x20WAIT','FWWpM','Game_Actor_changeClass','NumberBgType','maxLvGaugeColor2','SystemSetBattleSystem','MenuBg','buttonAssistKey2','NPbcp','WIN_ICO_00','consumeItem','PreserveNumbers','Scene_MenuBase_mainAreaHeight','GoldBgType','updatePositionCoreEngine','createCommandWindow','EISU','requestFauxAnimation','xyUqn','ItemBackColor2','TextCodeNicknames','Scene_Name_create','YNnPV','Scene_Battle_update','buttonAssistSwitch','toLowerCase','rwWFp','makeCoreEngineCommandList','cXRBN','(\x5cd+)>','stretch','skills','editWindowRect','remove','moveCancelButtonSideButtonLayout','forceOutOfPlaytest','moveRelativeToResolutionChange','VisuMZ_2_BattleSystemCTB','ATTN','_statusParamsWindow','Game_Picture_x','showDevTools','_targetOffsetY','blockWidth','Control\x20Variables\x20Script\x20Error','fontSize','isMaskingEnabled','stypeId','pow','damageColor','_fauxAnimationQueue','qOLui','anchor','XParameterFormula','calcEasing','SceneManager_initialize','DEF','GRudy','originalJS','hpColor','_addShadow','clearCachedKeys','paramBaseAboveLevel99','round','ColorMPCost','mainAreaTopSideButtonLayout','ColorHPGauge2','transform','PGDN','QSlcX','normal','DimColor1','itemSuccessRate','start','ShowItemBackground','CrisisRate','ScreenShake','ColorDeath','XParamVocab8','ColorMaxLvGauge1','_statusEquipWindow','Game_Actor_levelUp','WIN_OEM_CLEAR','_targetAnchor','MDF','BtRPb','PictureFilename','FontSize','image-rendering','EQUALS','Window_Gold_refresh','Key%1','OptionsRect','parallaxes','isHovered','mpGaugeColor1','length','_actorWindow','buttonAssistOffset2','sparamFlat1','Flat1','CategoryBgType','xvGgX','YBDxC','lineHeight','_coreEngineShakeStyle','PRINTSCREEN','lxvIZ','commandWindowRows','updateBackOpacity','Sprite_AnimationMV_processTimingData','maxLevel','SParamVocab9','erasePicture','vertical','createEnemies','ImprovedAccuracySystem','addCommand','AGI','ActorRect','_stored_powerDownColor','_pageupButton','Scene_Status_create','isSideView','isPhysical','WIN_OEM_PA1','levelUp','GyggP','KeyUnlisted','paramRateJS','powerUpColor','paramRate2','isFauxAnimationPlaying','ItemMenu','HCDqh','IconParam1','ZGhDt','_stored_gaugeBackColor','WaPpJ','SlotRect','IconXParam3','fillText','_fauxAnimationSprites','Scene_MenuBase_helpAreaTop','Game_Action_itemEva','setEnemyAction','smallParamFontSize','WIN_ICO_CLEAR','mpColor','useDigitGroupingEx','SParameterFormula','setupValueFont','MAT','NUMPAD8','randomJS','sparamPlus','_cache','getInputButtonString','atbActive','cursorRight','process_VisuMZ_CoreEngine_Enemy_Notetags','iconHeight','slotWindowRect','tpGaugeColor2','TRG','DELETE','Bitmap_drawText','drawActorLevel','loadTitle1','HelpRect','PictureEraseAll','useDigitGrouping','Window_Base_update','cancel','ONE_MINUS_SRC_ALPHA','Window_Base_textSizeEx','_sideButtonLayout','OUTBACK','ColorManager_loadWindowskin','GoldIcon','_stored_maxLvGaugeColor2','members','exp','GJzAU','getLastPluginCommandInterpreter','itemLineRect','VaiJQ','format','vbmpP','Game_Party_consumeItem','setup','isOptionValid','inbounce','opacity','_CoreEngine_Cache_textSizeEx','drawTextEx','Max','SellRect','refresh','BACKSPACE','open','down2','WocZG','ATK','push','process_VisuMZ_CoreEngine_jsQuickFunctions','toFixed','SmartEventCollisionPriority','Graphics_printError','abs','eXXkb','createMenuButton','NUMPAD6','IconParam2','PLAY','isBusy','EVAL','Window_StatusBase_drawActorLevel','StatusParamsBgType','_statusWindow','COLON','UxSlK','MAXHP','isNwjs','parse','sparamFlat2','xparamRate2','param','SParamVocab6','style','_screenY','_customModified','helpWindowRect','categoryWindowRect','itemBackColor1','PHakR','setSize','none','STENCIL_TEST','isCollidedWithEvents','YkNWD','maxLvGaugeColor1','REPLACE','_commandList','rightArrowWidth','adjustBoxSize','OUTBOUNCE','ListRect','JSON','CustomParamType','stringKeyMap','getColor','drawText','AccuracyBoost','NEiaW','Speed','isReleased','mainAreaTop','removeChild','GameEnd','AMPERSAND','loadSystem','ACCEPT','WIN_OEM_JUMP','EditBgType','TILDE','keyCode','akAmG','performMiss','_stored_normalColor','nfrae','optSideView','MODECHANGE','windowPadding','Subtitle','setCoreEngineUpdateWindowBg','IWpLj','wholeDuration','EXR','PA1','Game_Picture_initBasic','_actor','CommandBgType','DamageColor','repositionCancelButtonSideButtonLayout','GCvoX','setSideButtonLayout','playTestF7','LpPWA','processTimingData','ItemRect','registerCommand','Scene_Map_createMenuButton','updateMainMultiply','_stored_hpGaugeColor1','volume','ItemPadding','openness','uYzMF','zEfdM','AutoStretch','%1%2','INOUTQUART','PHA','ExtJS','xNLqC','Sprite_Gauge_currentValue','isMVAnimation','replace','battleSystem','resetTextColor','isMagical','setTargetAnchor','XParamVocab7','VOLUME_UP','_isButtonHidden','StatusBgType','isClosed','altKey','isActor','DTB','checkCacheKey','OutlineColor','WIN_OEM_PA2','CoreEngine','boxHeight','xjORP','xdg-open','DummyBgType','_pagedownButton','_context','drawGameSubtitle','index','onDatabaseLoaded','Game_Picture_calcEasing','StatusEquipRect','maxBattleMembers','IconXParam0','targetX','NewGameCommonEvent','RepositionActors','button','QUOTE','HIT','Game_BattlerBase_initMembers','profileWindowRect','Scene_Menu_create','CJOui','expGaugeColor2','getColorDataFromPluginParameters','onButtonImageLoad','hbKyo','scale','applyForcedGameTroopSettingsCoreEngine','VgMjn','itemEva','itemWindowRect','WIN_OEM_FJ_LOYA','command122','CwRvH','TitlePicButtons','_stored_systemColor','mainFontSize','applyCoreEasing','NUMPAD1','gMgxC','makeEncounterCount','XParamVocab9','WindowLayer_render','setBackgroundOpacity','INCIRC','sparamFlatJS','loadPicture','INQUINT','DATABASE','isGameActive','drawActorClass','rdosv','catchLoadError','SCALE_MODES','mirror','qLJIx','F21','requestMotion','WJgRx','clearZoom','Window_Base_createTextState','paramMaxJS','setBattleSystem','XParamVocab0','buttonAssistText1','createCustomParameter','createFauxAnimationQueue','CfEjm','Game_System_initialize','ParamMax','Icon','areButtonsHidden','blt','DigitGroupingLocale','buttonAssistText3','aeIrr','isBeingTouched','systemColor','makeCommandList','gaugeBackColor','end','_anchor','bgmVolume','_numberWindow','drawCircle','isBottomHelpMode','Game_Picture_updateMove','ColorExpGauge2','SParamVocab1','EREOF','Scene_Boot_startNormalGame','ShowJS','Scene_Battle_createCancelButton','F15','createTextState','paramValueByName','titleCommandWindow','buttonAssistOk','Game_BattlerBase_refresh','animationBaseDelay','LvExpGauge','DbXVN','itemHeight','aKBfp','UaaHs','guardSkillId','hcQJp','dimColor1','OptionsMenu','osGOL','0.00','_backSprite2','SlotBgType','SParamVocab5','eva','bind','TranslucentOpacity','textColor','ZERO','qsanJ','VtpSK','bOhFV','PGUP','drawParamName','INOUTBACK','Graphics_defaultStretchMode','processCursorHomeEndTrigger','EditRect','contentsOpacity','Game_Event_isCollidedWithEvents','SParamVocab0','BattleManager_processEscape','PIPE','VjUfW','displayY','dqHUP','DLkDn','IconSParam3','optionsWindowRect','ARRAYNUM','startMove','GroupDigits','WsMcg','CThTX','setupNewGame','addLoadListener','INSINE','updatePadding','JloeI','IconSParam0','Window_Selectable_cursorDown','zUPud','KcugJ','_shakeDuration','process_VisuMZ_CoreEngine_Settings','DDPzj','jZPeT','processCursorMoveModernControls','rPKFK','makeInputButtonString','RIGHT','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','vucAy','defineProperty','loadGameImagesCoreEngine','startAnimation','changeClass','isFullDocumentTitle','outlineColor','Enable','Game_Picture_y','DOLLAR','visible','Scene_MenuBase_createCancelButton','OKpAO','MZfNG','xdLhn','_moveEasingType','PERIOD','STRUCT','exit','buttonAssistCancel','parseForcedGameTroopSettingsCoreEngine','LoadMenu','NUMPAD4','img/%1/','UAepS','animationId','QKQbH','tpCostColor','number','helpAreaTop','shake','wait','RequireFocus','_skillTypeWindow','onKeyDown','VtxKI','subtitle','Spriteset_Base_update','platform','CategoryRect','right','goldWindowRect','GetParamIcon','clone','_screenX','ErZgS','playTestF6','cursorDown','Game_Character_processMoveCommand','BWPbA','IfLZb','makeDeepCopy','PRESERVCONVERSION(%1)','AntiZoomPictures','drawNewParam','Sprite_Gauge_gaugeRate','valueOutlineWidth','createBackground','equips','OIXpW','SwitchActorText','drawGameTitle','initCoreEngine','_listWindow','CallHandlerJS','MEV','CRSEL','ColorHPGauge1','SPACE','WIN_OEM_FJ_TOUROKU','setEasingType','subject','HASH','OUTQUART','INOUTELASTIC','xScrollLinkedOffset','pop','_menuButton','F13','enemy','left','ItemBgType','en-US','down','jqNDD','onMoveEnd','PDR','xparamRateJS','SParamVocab2','REC','bIPAh','GoldRect','(\x5cd+)([%％])>','type','height','createPageButtons','OPEN_BRACKET','_duration','keyMapper','currencyUnit','imageSmoothingEnabled','MDR','_storedStack','vWBbC','INCUBIC','MRG','name','Untitled','updatePositionCoreEngineShakeHorz','Bitmap_blt','max','Symbol','xlDyi','_data','MULTIPLY','TCR','_hideTileShadows','sparamFlatBonus','sparam','destroyed','cqFAu','isPressed','ctGaugeColor2','Type','version','URL','getCustomBackgroundSettings','uiAreaHeight','LEFT','scaleMode','ConvertParams','mainCommandWidth','RegExp','SkillMenu','updatePositionCoreEngineShakeRand','helpAreaBottom','DOUBLE_QUOTE','removeFauxAnimation','clamp','getCoreEngineScreenShakeStyle','Rate','_helpWindow','enable','pictureId','IconXParam2','initialize','setupCoreEasing','TlhQE','randomInt','ItemStyle','XParamVocab4','width','ActorHPColor','_muteSound','IsIAg','Dbifg','wlRGc','Koesq','RevertPreserveNumbers','isMaxLevel','kooLj','paramY','buttonAssistKey%1','HelpBgType','mainAreaBottom','DigitGroupingExText','_coreEasingType','ctGaugeColor1','Color','_windowLayer','SceneManager_isGameActive','paramFlat','filter','PictureEasingType','isHandled','apply','normalColor','_spriteset','smoothSelect','oJtSV','buttonAssistText5','clearStencil','drawGauge','xparamFlat2','powerDownColor','xparam','IconXParam4','DigitGroupingDamageSprites','setCoreEngineScreenShakeStyle','isAlive','resetFontSettings','strokeRect','lMlcv','calcCoreEasing','buttonAssistOffset3','INOUTBOUNCE','F22','Game_Interpreter_PluginCommand','LkHLd','updatePositionCoreEngineShakeVert','updateMain','PERCENT','ButtonAssist','home','drawSegment','stencilFunc','yScrollLinkedOffset','parameters','processTouch','Scene_MenuBase_createPageButtons','eventsXyNt','OnLoadJS','setBackgroundType','isNormalPriority','hide','tab','Scene_Map_initialize','_cancelButton','_drawTextShadow','coESG','missed','updateClose','font-smooth','_stored_pendingColor','actorWindowRect','drawValue','targetScaleY','tJYik','SystemSetFontSize','encounterStep','isAnimationForEach','isSmartEventCollisionOn','applyEasing','setMute','hDamu','HOME','NoTileShadows','_stored_mpGaugeColor2','Game_Interpreter_command111','targetEvaRate','scaleSprite','_hovered','IconSet','Scene_Unlisted','ParamName','Spriteset_Base_initialize','PLUS','createJsQuickFunction','lKPxp','tfytw','ARRAYSTRUCT','cufjX','drawActorExpGauge','Window_Selectable_drawBackgroundRect','Scene_Boot_loadSystemImages','command111','_centerElement','constructor','CONTEXT_MENU','paramPlusJS','GREATER_THAN','clear','min','ColorPowerUp','Scene_Shop_create','MultiKeyFmt','initialLevel','SFlmh','sparamRate','_scene','updateCoreEasing','pictureButtons','terminate','PixelateImageRendering','PositionJS','ADD','startAutoNewGame','CommandRect','_mapNameWindow','moveMenuButtonSideButtonLayout','LineHeight','Game_Action_updateLastTarget','test','cursorPagedown','F24','sin','disable','seVolume','drawBackgroundRect','retreat','initCoreEasing','_clickHandler','isItemStyle','trim','option','F16','RBoXS','getBackgroundOpacity','targetY','F18','gJYsz','ColorMPGauge1','_opening','inBattle','targetObjects','skillTypes','toString','level','onClick','paramX','SLEEP','zmviH','Game_Picture_show','snapForBackground','createCancelButton','paramName','itypeId','xparamFlatBonus','paramchangeTextColor','RowSpacing','wFAcJ','BGCIU','<%1\x20%2:[\x20]','Total','EVA','getLevel','targets','helpAreaTopSideButtonLayout','ImgLoad','goto','ColorMPGauge2','WIN_OEM_BACKTAB','PictureEraseRange','ENTER','dimColor2','LuRJU','hpGaugeColor1','SEPARATOR','TitleCommandList','_buttonType','isOpen','NUMPAD2','Scene_Boot_onDatabaseLoaded','successRate','_stored_expGaugeColor1','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','gainGold','updateAnchor','ZaPTc','forceStencil','bTwFl','ARRAYEVAL','itemHit','drawAllParams','FontShadows','bgsVolume','child_process','XParamVocab1','gaugeHeight','_backSprite1','OS_KEY','TextJS','characters','PuQep','paramMax','_stored_crisisColor','isActiveTpb'];(function(_0x139a37,_0x23a5da){const _0x2633a3=function(_0x2aedde){while(--_0x2aedde){_0x139a37['push'](_0x139a37['shift']());}};_0x2633a3(++_0x23a5da);}(_0x23a5,0xc1));const _0x2633=function(_0x139a37,_0x23a5da){_0x139a37=_0x139a37-0x0;let _0x2633a3=_0x23a5[_0x139a37];return _0x2633a3;};const _0x3d8782=_0x2633;var label=_0x3d8782('0x32b'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3d8782('0x47b')](function(_0x3ce662){const _0x2a117a=_0x3d8782;return _0x3ce662[_0x2a117a('0xac')]&&_0x3ce662[_0x2a117a('0x19b')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3d8782('0x5ab')]=VisuMZ[label]['Settings']||{},VisuMZ[_0x3d8782('0x451')]=function(_0x587538,_0x5ec6f6){const _0x2c3f2a=_0x3d8782;for(const _0x4a820f in _0x5ec6f6){if(_0x4a820f[_0x2c3f2a('0x1a7')](/(.*):(.*)/i)){if(_0x2c3f2a('0x32d')!==_0x2c3f2a('0x32d')){function _0x35153e(){return _0x5377ac['layoutSettings']['CommandRect']['call'](this);}}else{const _0x295587=String(RegExp['$1']),_0x3489f0=String(RegExp['$2'])[_0x2c3f2a('0x28')]()[_0x2c3f2a('0x4f4')]();let _0x42bd18,_0x431e3d,_0x4d10f3;switch(_0x3489f0){case _0x2c3f2a('0x559'):_0x42bd18=_0x5ec6f6[_0x4a820f]!==''?Number(_0x5ec6f6[_0x4a820f]):0x0;break;case _0x2c3f2a('0x3b8'):_0x431e3d=_0x5ec6f6[_0x4a820f]!==''?JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f]):[],_0x42bd18=_0x431e3d[_0x2c3f2a('0x142')](_0xd69ef0=>Number(_0xd69ef0));break;case _0x2c3f2a('0x2bf'):_0x42bd18=_0x5ec6f6[_0x4a820f]!==''?eval(_0x5ec6f6[_0x4a820f]):null;break;case _0x2c3f2a('0x52e'):_0x431e3d=_0x5ec6f6[_0x4a820f]!==''?JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f]):[],_0x42bd18=_0x431e3d['map'](_0x108d7f=>eval(_0x108d7f));break;case _0x2c3f2a('0x2df'):_0x42bd18=_0x5ec6f6[_0x4a820f]!==''?JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f]):'';break;case _0x2c3f2a('0x561'):_0x431e3d=_0x5ec6f6[_0x4a820f]!==''?JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f]):[],_0x42bd18=_0x431e3d[_0x2c3f2a('0x142')](_0x1598fa=>JSON['parse'](_0x1598fa));break;case'FUNC':_0x42bd18=_0x5ec6f6[_0x4a820f]!==''?new Function(JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f])):new Function('return\x200');break;case'ARRAYFUNC':_0x431e3d=_0x5ec6f6[_0x4a820f]!==''?JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f]):[],_0x42bd18=_0x431e3d['map'](_0x47fef4=>new Function(JSON[_0x2c3f2a('0x2c7')](_0x47fef4)));break;case'STR':_0x42bd18=_0x5ec6f6[_0x4a820f]!==''?String(_0x5ec6f6[_0x4a820f]):'';break;case _0x2c3f2a('0xd2'):_0x431e3d=_0x5ec6f6[_0x4a820f]!==''?JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f]):[],_0x42bd18=_0x431e3d[_0x2c3f2a('0x142')](_0x1bd8cb=>String(_0x1bd8cb));break;case _0x2c3f2a('0x3e0'):_0x4d10f3=_0x5ec6f6[_0x4a820f]!==''?JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f]):{},_0x587538[_0x295587]={},VisuMZ[_0x2c3f2a('0x451')](_0x587538[_0x295587],_0x4d10f3);continue;case _0x2c3f2a('0x4c9'):_0x431e3d=_0x5ec6f6[_0x4a820f]!==''?JSON[_0x2c3f2a('0x2c7')](_0x5ec6f6[_0x4a820f]):[],_0x42bd18=_0x431e3d[_0x2c3f2a('0x142')](_0x346a66=>VisuMZ['ConvertParams']({},JSON[_0x2c3f2a('0x2c7')](_0x346a66)));break;default:continue;}_0x587538[_0x295587]=_0x42bd18;}}}return _0x587538;},(_0x17d785=>{const _0x223944=_0x3d8782,_0x32b438=_0x17d785[_0x223944('0x439')];for(const _0x2aa7ea of dependencies){if(_0x223944('0x29e')!==_0x223944('0x29e')){function _0x42b6a4(){const _0x458527=_0x223944;this[_0x458527('0x2c2')][_0x458527('0x4a3')](_0x36ab18[_0x458527('0x12')][_0x458527('0x323')]);}}else{if(!Imported[_0x2aa7ea]){if(_0x223944('0x196')===_0x223944('0x196')){alert(_0x223944('0x175')[_0x223944('0x2a2')](_0x32b438,_0x2aa7ea)),SceneManager[_0x223944('0x3e1')]();break;}else{function _0x5ae5a6(){const _0x5f10d0=_0x223944;return _0x593e89[_0x5f10d0('0x32b')]['Sprite_Gauge_gaugeRate']['call'](this)[_0x5f10d0('0x459')](0x0,0x1);}}}}}const _0x2f858f=_0x17d785['description'];if(_0x2f858f[_0x223944('0x1a7')](/\[Version[ ](.*?)\]/i)){const _0x500499=Number(RegExp['$1']);if(_0x500499!==VisuMZ[label]['version']){if(_0x223944('0x266')!=='cbrmQ')alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x223944('0x2a2')](_0x32b438,_0x500499)),SceneManager[_0x223944('0x3e1')]();else{function _0x34d49d(){const _0x4b5725=_0x223944;this[_0x4b5725('0x310')]+=this['openingSpeed'](),this[_0x4b5725('0x523')]()&&(this[_0x4b5725('0x4fd')]=![]);}}}}if(_0x2f858f[_0x223944('0x1a7')](/\[Tier[ ](\d+)\]/i)){const _0x20cf51=Number(RegExp['$1']);if(_0x20cf51<tier){if(_0x223944('0x3c8')!==_0x223944('0x51e'))alert(_0x223944('0x528')[_0x223944('0x2a2')](_0x32b438,_0x20cf51,tier)),SceneManager[_0x223944('0x3e1')]();else{function _0x32df1c(){const _0x1f67d0=_0x223944;_0x1351e1[_0x1f67d0('0x32b')][_0x1f67d0('0xe2')][_0x1f67d0('0x1c9')](this);}}}else tier=Math[_0x223944('0x43d')](_0x20cf51,tier);}VisuMZ[_0x223944('0x451')](VisuMZ[label][_0x223944('0x5ab')],_0x17d785[_0x223944('0x49e')]);})(pluginData),PluginManager[_0x3d8782('0x30a')](pluginData[_0x3d8782('0x439')],'OpenURL',_0x1754c3=>{const _0x5b5b3f=_0x3d8782;VisuMZ['ConvertParams'](_0x1754c3,_0x1754c3);const _0x1e1dae=_0x1754c3[_0x5b5b3f('0x44c')];VisuMZ['openURL'](_0x1e1dae);}),PluginManager[_0x3d8782('0x30a')](pluginData[_0x3d8782('0x439')],_0x3d8782('0x8f'),_0x28059b=>{const _0xd86797=_0x3d8782;VisuMZ[_0xd86797('0x451')](_0x28059b,_0x28059b);const _0x196b53=_0x28059b[_0xd86797('0xb')]||0x0;$gameParty[_0xd86797('0x529')](_0x196b53);}),PluginManager['registerCommand'](pluginData[_0x3d8782('0x439')],_0x3d8782('0x47c'),_0x1e7e0d=>{const _0x30c390=_0x3d8782;VisuMZ[_0x30c390('0x451')](_0x1e7e0d,_0x1e7e0d);const _0x3d58ee=_0x1e7e0d[_0x30c390('0x45e')]||0x1,_0x2f2cb7=_0x1e7e0d['easingType']||_0x30c390('0x59f'),_0x4e25fb=$gameScreen[_0x30c390('0x9')](_0x3d58ee);if(_0x4e25fb){if(_0x30c390('0x1f9')===_0x30c390('0x1f9'))_0x4e25fb[_0x30c390('0x415')](_0x2f2cb7);else{function _0x1f1ca8(){const _0x471847=_0x30c390;return _0x2719d8[_0x471847('0x32b')]['Settings'][_0x471847('0x477')][_0x471847('0x467')][_0x471847('0x1c9')](this,_0x98e6c3);}}}}),PluginManager[_0x3d8782('0x30a')](pluginData['name'],_0x3d8782('0x291'),_0x598e59=>{const _0x1e06e9=_0x3d8782;for(let _0x1fa301=0x1;_0x1fa301<=0x64;_0x1fa301++){$gameScreen[_0x1e06e9('0x258')](_0x1fa301);}}),PluginManager['registerCommand'](pluginData['name'],_0x3d8782('0x51b'),_0x4e0da4=>{const _0x5ebe7b=_0x3d8782;VisuMZ[_0x5ebe7b('0x451')](_0x4e0da4,_0x4e0da4);const _0x572f9e=Math['min'](_0x4e0da4['StartID'],_0x4e0da4['EndingID']),_0x37a107=Math[_0x5ebe7b('0x43d')](_0x4e0da4[_0x5ebe7b('0x43')],_0x4e0da4[_0x5ebe7b('0x59d')]);for(let _0x4618a1=_0x572f9e;_0x4618a1<=_0x37a107;_0x4618a1++){$gameScreen[_0x5ebe7b('0x258')](_0x4618a1);}}),PluginManager['registerCommand'](pluginData['name'],'ScreenShake',_0x370c50=>{const _0x128705=_0x3d8782;VisuMZ['ConvertParams'](_0x370c50,_0x370c50);const _0x2163d1=_0x370c50[_0x128705('0x44a')]||_0x128705('0x18e'),_0x5d76b0=_0x370c50[_0x128705('0x55b')][_0x128705('0x459')](0x1,0x9),_0x5253e0=_0x370c50[_0x128705('0x2e6')][_0x128705('0x459')](0x1,0x9),_0x237822=_0x370c50['Duration']||0x1,_0x370081=_0x370c50['Wait'];$gameScreen[_0x128705('0x48b')](_0x2163d1),$gameScreen['startShake'](_0x5d76b0,_0x5253e0,_0x237822);if(_0x370081){if(_0x128705('0x4b2')!==_0x128705('0x4b2')){function _0x5fef17(){return!![];}}else{const _0x1bd86d=$gameTemp['getLastPluginCommandInterpreter']();if(_0x1bd86d)_0x1bd86d[_0x128705('0x3ee')](_0x237822);}}}),PluginManager[_0x3d8782('0x30a')](pluginData[_0x3d8782('0x439')],_0x3d8782('0x4b3'),_0x24de15=>{const _0x5db001=_0x3d8782;VisuMZ[_0x5db001('0x451')](_0x24de15,_0x24de15);const _0x3a5dbf=_0x24de15[_0x5db001('0x4f5')]||0x1;$gameSystem['setMainFontSize'](_0x3a5dbf);}),PluginManager[_0x3d8782('0x30a')](pluginData[_0x3d8782('0x439')],_0x3d8782('0xe9'),_0xcf60a7=>{const _0x179c13=_0x3d8782;if($gameParty[_0x179c13('0x4fe')]())return;VisuMZ['ConvertParams'](_0xcf60a7,_0xcf60a7);const _0x463a04=_0xcf60a7[_0x179c13('0x4f5')];if(_0x463a04[_0x179c13('0x1a7')](/Front/i))$gameSystem[_0x179c13('0x56d')](![]);else{if(_0x463a04[_0x179c13('0x1a7')](/Side/i))$gameSystem['setSideView'](!![]);else{if(_0x179c13('0x3c5')===_0x179c13('0x3c5'))$gameSystem[_0x179c13('0x56d')](!$gameSystem[_0x179c13('0x262')]());else{function _0x3e26ca(){const _0x2a4f75=_0x179c13;return _0x168f26[_0x2a4f75('0x32b')][_0x2a4f75('0x5ab')]['UI']['LvExpGauge'];}}}}}),PluginManager[_0x3d8782('0x30a')](pluginData[_0x3d8782('0x439')],_0x3d8782('0x1ec'),_0x2d37fd=>{const _0x3ba39c=_0x3d8782;if($gameParty[_0x3ba39c('0x4fe')]())return;VisuMZ[_0x3ba39c('0x451')](_0x2d37fd,_0x2d37fd);const _0x23560d=_0x2d37fd[_0x3ba39c('0x4f5')][_0x3ba39c('0x28')]()[_0x3ba39c('0x4f4')](),_0x38153e=VisuMZ[_0x3ba39c('0x32b')]['CreateBattleSystemID'](_0x23560d);$gameSystem[_0x3ba39c('0x36b')](_0x38153e);}),VisuMZ[_0x3d8782('0x32b')]['CreateBattleSystemID']=function(_0x3c7b09){const _0x39a22c=_0x3d8782;_0x3c7b09=_0x3c7b09||_0x39a22c('0x35d'),_0x3c7b09=String(_0x3c7b09)[_0x39a22c('0x28')]()[_0x39a22c('0x4f4')]();switch(_0x3c7b09){case _0x39a22c('0x327'):return 0x0;case _0x39a22c('0x5e2'):Imported[_0x39a22c('0x19e')]&&(ConfigManager[_0x39a22c('0x285')]=!![]);return 0x1;case _0x39a22c('0x1e7'):if(Imported[_0x39a22c('0x19e')]){if('FjiJR'===_0x39a22c('0x2b1')){function _0x1b3522(){const _0x4e0ee0=_0x39a22c;let _0xeb0d41=this[_0x4e0ee0('0x333')]();const _0x306347=this['maxItems'](),_0x24b793=this['maxCols']();if(this[_0x4e0ee0('0x2f')]()&&(_0xeb0d41<_0x306347||_0x4884c7&&_0x24b793===0x1)){_0xeb0d41+=_0x24b793;if(_0xeb0d41>=_0x306347)_0xeb0d41=_0x306347-0x1;this['smoothSelect'](_0xeb0d41);}else!this[_0x4e0ee0('0x2f')]()&&((_0xeb0d41<_0x306347-_0x24b793||_0x29aeea&&_0x24b793===0x1)&&this[_0x4e0ee0('0x481')]((_0xeb0d41+_0x24b793)%_0x306347));}}else ConfigManager[_0x39a22c('0x285')]=![];}return 0x2;case'CTB':if(Imported[_0x39a22c('0x20c')]){if(_0x39a22c('0x1b')!==_0x39a22c('0x150'))return _0x39a22c('0x586');else{function _0x5b2ae0(){const _0x52282f=_0x39a22c;this[_0x52282f('0x45c')]&&this[_0x52282f('0x45c')][_0x52282f('0x4a3')](_0x2681de[_0x52282f('0x12')][_0x52282f('0x472')]),this['_listWindow']&&this[_0x52282f('0x40e')][_0x52282f('0x4a3')](_0x395316[_0x52282f('0x12')][_0x52282f('0x116')]);}}}break;}return $dataSystem[_0x39a22c('0x31c')];},PluginManager[_0x3d8782('0x30a')](pluginData['name'],'SystemSetWindowPadding',_0x10d0ea=>{const _0x5bdab8=_0x3d8782;VisuMZ[_0x5bdab8('0x451')](_0x10d0ea,_0x10d0ea);const _0x269f2=_0x10d0ea[_0x5bdab8('0x4f5')]||0x1;$gameSystem[_0x5bdab8('0xe1')](_0x269f2);}),VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x525')]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot['prototype'][_0x3d8782('0x334')]=function(){const _0x29dbd2=_0x3d8782;VisuMZ[_0x29dbd2('0x32b')][_0x29dbd2('0x525')][_0x29dbd2('0x1c9')](this),this[_0x29dbd2('0x85')](),this[_0x29dbd2('0x123')](),this[_0x29dbd2('0x3c7')](),this[_0x29dbd2('0x188')](),this[_0x29dbd2('0x5f9')]();},VisuMZ[_0x3d8782('0x32b')]['RegExp']={},Scene_Boot[_0x3d8782('0x3b')][_0x3d8782('0x85')]=function(){const _0x4491a8=_0x3d8782,_0x3accc8=[_0x4491a8('0x2c5'),_0x4491a8('0x171'),_0x4491a8('0x2b2'),_0x4491a8('0x21f'),_0x4491a8('0x27f'),'MDF',_0x4491a8('0x25d'),_0x4491a8('0x76')],_0x287852=[_0x4491a8('0x33e'),_0x4491a8('0x513'),_0x4491a8('0x2d'),_0x4491a8('0x3e'),'MEV','MRF','CNT',_0x4491a8('0xa4'),'MRG',_0x4491a8('0x28b')],_0xe7ba86=[_0x4491a8('0x5a3'),_0x4491a8('0x127'),_0x4491a8('0x428'),_0x4491a8('0x316'),_0x4491a8('0x110'),_0x4491a8('0x442'),_0x4491a8('0x425'),_0x4491a8('0x434'),_0x4491a8('0x59c'),_0x4491a8('0x2fd')],_0x383acc=[_0x3accc8,_0x287852,_0xe7ba86],_0x49efe6=['Plus',_0x4491a8('0xce'),_0x4491a8('0xd6'),_0x4491a8('0x2ab'),_0x4491a8('0x45b'),_0x4491a8('0x1da'),_0x4491a8('0x560'),_0x4491a8('0x5d5'),'Flat1',_0x4491a8('0x3d')];for(const _0x4b7112 of _0x383acc){if('SplyA'===_0x4491a8('0x2d2')){function _0x3d26c1(){const _0x2f5c09=_0x4491a8;_0x52c87b[_0x2f5c09('0x5b3')]&&_0x727d86[_0x2f5c09('0x5b3')]();}}else{let _0x209554='';if(_0x4b7112===_0x3accc8)_0x209554=_0x4491a8('0x2ca');if(_0x4b7112===_0x287852)_0x209554=_0x4491a8('0x488');if(_0x4b7112===_0xe7ba86)_0x209554=_0x4491a8('0x445');for(const _0x844f0 of _0x49efe6){if(_0x4491a8('0x220')===_0x4491a8('0x392')){function _0x4d4eab(){const _0x180a53=_0x4491a8;this[_0x180a53('0x4ea')]();}}else{let _0x2280b1=_0x4491a8('0x314')[_0x4491a8('0x2a2')](_0x209554,_0x844f0);VisuMZ['CoreEngine'][_0x4491a8('0x453')][_0x2280b1]=[],VisuMZ[_0x4491a8('0x32b')]['RegExp'][_0x2280b1+'JS']=[];let _0x57373a=_0x4491a8('0x511');if([_0x4491a8('0x548'),_0x4491a8('0x5d5')][_0x4491a8('0x5ec')](_0x844f0)){if('UaaHs'!==_0x4491a8('0x395')){function _0x384618(){const _0x55795f=_0x4491a8;this[_0x55795f('0x45c')][_0x55795f('0x4a3')](_0x27e895[_0x55795f('0x12')]['HelpBgType']);}}else _0x57373a+='([\x5c+\x5c-]\x5cd+)>';}else{if([_0x4491a8('0xce'),_0x4491a8('0x24b')]['includes'](_0x844f0)){if('deYlY'==='tiZlg'){function _0x551491(){_0x9da190+=_0x352386(_0x129795);}}else _0x57373a+=_0x4491a8('0x5ee');}else{if([_0x4491a8('0xd6'),_0x4491a8('0x3d')][_0x4491a8('0x5ec')](_0x844f0)){if(_0x4491a8('0x1b8')===_0x4491a8('0x1b8'))_0x57373a+=_0x4491a8('0x7c');else{function _0x3b66d6(){const _0x1d4743=_0x4491a8;_0x28cf30[_0x1d4743('0x3b')]['terminate'][_0x1d4743('0x1c9')](this),!_0x110cf7['isNextScene'](_0x504f2e)&&(this[_0x1d4743('0x480')][_0x1d4743('0x195')](),this[_0x1d4743('0x4e5')][_0x1d4743('0x4a5')](),this['_windowLayer'][_0x1d4743('0x3d9')]=![],_0x285442[_0x1d4743('0x508')]()),_0x3481eb[_0x1d4743('0x368')]();}}}else{if(_0x844f0==='Max')_0x57373a+=_0x4491a8('0x204');else{if(_0x844f0===_0x4491a8('0x1da'))_0x57373a+=_0x4491a8('0x42b');else _0x844f0===_0x4491a8('0x560')&&(_0x57373a+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x549614 of _0x4b7112){let _0x5609f7=_0x844f0[_0x4491a8('0x31b')](/[\d+]/g,'')['toUpperCase']();const _0x41c7ec=_0x57373a[_0x4491a8('0x2a2')](_0x549614,_0x5609f7);VisuMZ[_0x4491a8('0x32b')][_0x4491a8('0x453')][_0x2280b1]['push'](new RegExp(_0x41c7ec,'i'));const _0x604a13=_0x4491a8('0x1c7')[_0x4491a8('0x2a2')](_0x549614,_0x5609f7);VisuMZ[_0x4491a8('0x32b')][_0x4491a8('0x453')][_0x2280b1+'JS']['push'](new RegExp(_0x604a13,'i'));}}}}}},Scene_Boot[_0x3d8782('0x3b')]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x136f59=_0x3d8782;this[_0x136f59('0x11d')](),this['process_VisuMZ_CoreEngine_Class_Notetags'](),this[_0x136f59('0x287')]();},Scene_Boot[_0x3d8782('0x3b')]['process_VisuMZ_CoreEngine_Actor_Notetags']=function(){const _0x577b4c=_0x3d8782;for(const _0x19e8ad of $dataActors){if(_0x577b4c('0x598')===_0x577b4c('0x304')){function _0x23ea5b(){const _0x4583b1=_0x577b4c;if(this[_0x4583b1('0x192')]){const _0x1089d4=this[_0x4583b1('0x192')][_0x4583b1('0x5e1')],_0x4e9773=this['width'],_0x323f59=this['height'],_0x3ab1b8=this['padding'],_0x18f7b4=_0xc0caa3[_0x4583b1('0x398')](),_0x535c4a=_0xbd723b[_0x4583b1('0x51d')]();_0x1089d4['resize'](_0x4e9773,_0x323f59),_0x1089d4[_0x4583b1('0x18a')](0x0,0x0,_0x4e9773,_0x3ab1b8,_0x535c4a,_0x18f7b4,!![]),_0x1089d4['fillRect'](0x0,_0x3ab1b8,_0x4e9773,_0x323f59-_0x3ab1b8*0x2,_0x18f7b4),_0x1089d4[_0x4583b1('0x18a')](0x0,_0x323f59-_0x3ab1b8,_0x4e9773,_0x3ab1b8,_0x18f7b4,_0x535c4a,!![]),this[_0x4583b1('0x192')][_0x4583b1('0x153')](0x0,0x0,_0x4e9773,_0x323f59);}}}else{if(!_0x19e8ad)continue;const _0x3811a9=_0x19e8ad['note'];if(_0x3811a9[_0x577b4c('0x1a7')](/<MAX LEVEL:[ ](\d+)>/i)){if('DMLot'!==_0x577b4c('0x312')){_0x19e8ad[_0x577b4c('0x256')]=Number(RegExp['$1']);if(_0x19e8ad['maxLevel']===0x0)_0x19e8ad[_0x577b4c('0x256')]=Number[_0x577b4c('0xdf')];}else{function _0x559af0(){const _0x476f43=_0x577b4c;return _0x579252[_0x476f43('0x5bd')][_0x476f43('0x1c9')](this);}}}if(_0x3811a9[_0x577b4c('0x1a7')](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x577b4c('0x26f')==='ZGhDt')_0x19e8ad['initialLevel']=Math[_0x577b4c('0x4d5')](Number(RegExp['$1']),_0x19e8ad[_0x577b4c('0x256')]);else{function _0x41d29c(){const _0x2072e5=_0x577b4c;return _0x4d1558['CoreEngine'][_0x2072e5('0x54c')][_0x2072e5('0x1c9')](this,_0x561c98);}}}}}},Scene_Boot[_0x3d8782('0x3b')]['process_VisuMZ_CoreEngine_Class_Notetags']=function(){const _0x4361f6=_0x3d8782;for(const _0x5ac438 of $dataActors){if('rbnTB'==='tPruh'){function _0x32f2b2(){const _0x271ff9=_0x2633;this[_0x271ff9('0x21b')]['x']=_0x1fc9d6[_0x271ff9('0x21b')]()['x'],this['anchor']['y']=_0xb96ead[_0x271ff9('0x21b')]()['y'];}}else{if(!_0x5ac438)continue;const _0x1aee64=_0x5ac438[_0x4361f6('0x1e5')];if(_0x5ac438['learnings'])for(const _0xf1a361 of _0x5ac438['learnings']){if(_0x4361f6('0x46b')!==_0x4361f6('0x2e5')){if(_0xf1a361[_0x4361f6('0x1e5')]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)){if('gJYsz'!==_0x4361f6('0x4fb')){function _0x49906c(){const _0x3cb3fc=_0x4361f6;return this[_0x3cb3fc('0x37e')];}}else _0xf1a361[_0x4361f6('0x502')]=Math['max'](Number(RegExp['$1']),0x1);}}else{function _0x163163(){const _0x59fbf6=_0x4361f6;this[_0x59fbf6('0x52a')](),_0x13f5f0[_0x59fbf6('0x32b')]['Game_Picture_updateMove'][_0x59fbf6('0x1c9')](this);}}}}}},Scene_Boot['prototype'][_0x3d8782('0x287')]=function(){const _0xd76c72=_0x3d8782;for(const _0x4707e7 of $dataEnemies){if(!_0x4707e7)continue;_0x4707e7[_0xd76c72('0x502')]=0x1;const _0x2eed3c=_0x4707e7[_0xd76c72('0x1e5')];if(_0x2eed3c['match'](/<LEVEL:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x502')]=Number(RegExp['$1']);if(_0x2eed3c['match'](/<MAXHP:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x69')][0x0]=Number(RegExp['$1']);if(_0x2eed3c[_0xd76c72('0x1a7')](/<MAXMP:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x69')][0x1]=Number(RegExp['$1']);if(_0x2eed3c['match'](/<ATK:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x69')][0x2]=Number(RegExp['$1']);if(_0x2eed3c[_0xd76c72('0x1a7')](/<DEF:[ ](\d+)>/i))_0x4707e7['params'][0x3]=Number(RegExp['$1']);if(_0x2eed3c[_0xd76c72('0x1a7')](/<MAT:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x69')][0x4]=Number(RegExp['$1']);if(_0x2eed3c[_0xd76c72('0x1a7')](/<MDF:[ ](\d+)>/i))_0x4707e7['params'][0x5]=Number(RegExp['$1']);if(_0x2eed3c[_0xd76c72('0x1a7')](/<AGI:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x69')][0x6]=Number(RegExp['$1']);if(_0x2eed3c['match'](/<LUK:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x69')][0x7]=Number(RegExp['$1']);if(_0x2eed3c[_0xd76c72('0x1a7')](/<EXP:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x29d')]=Number(RegExp['$1']);if(_0x2eed3c['match'](/<GOLD:[ ](\d+)>/i))_0x4707e7[_0xd76c72('0x7f')]=Number(RegExp['$1']);}},Scene_Boot[_0x3d8782('0x3b')]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x1c5a15=_0x3d8782;VisuMZ[_0x1c5a15('0x32b')][_0x1c5a15('0x5ab')][_0x1c5a15('0x59e')][_0x1c5a15('0x54b')]&&VisuMZ[_0x1c5a15('0x8')](!![]),VisuMZ[_0x1c5a15('0x32b')]['Settings']['QoL']['ModernControls']&&(Input[_0x1c5a15('0x431')][0x23]=_0x1c5a15('0x37d'),Input[_0x1c5a15('0x431')][0x24]=_0x1c5a15('0x49a'));},Scene_Boot[_0x3d8782('0x3b')][_0x3d8782('0x188')]=function(){const _0x26bfb=_0x3d8782;this[_0x26bfb('0x2b4')]();},Scene_Boot[_0x3d8782('0x3b')][_0x3d8782('0x2b4')]=function(){const _0x55eac1=_0x3d8782,_0x3237bf=VisuMZ[_0x55eac1('0x32b')][_0x55eac1('0x5ab')]['jsQuickFunc'];for(const _0x2602d5 of _0x3237bf){if('RSROR'==='EBFho'){function _0x415e80(){const _0x2510f2=_0x55eac1;return _0x3e0b55['CoreEngine'][_0x2510f2('0x5ab')]['ButtonAssist'][_0x2510f2('0x173')];}}else{const _0x513b43=_0x2602d5[_0x55eac1('0xa6')][_0x55eac1('0x31b')](/[ ]/g,''),_0x10e085=_0x2602d5[_0x55eac1('0x199')];VisuMZ['CoreEngine'][_0x55eac1('0x4c6')](_0x513b43,_0x10e085);}}},VisuMZ['CoreEngine'][_0x3d8782('0x4c6')]=function(_0x3728cc,_0x4a9cd7){const _0x189fbf=_0x3d8782;if(!!window[_0x3728cc]){if($gameTemp[_0x189fbf('0x87')]())console[_0x189fbf('0xad')](_0x189fbf('0x3ce')['format'](_0x3728cc));}const _0x3a7178='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x189fbf('0x2a2')](_0x3728cc,_0x4a9cd7);window[_0x3728cc]=new Function(_0x3a7178);},Scene_Boot[_0x3d8782('0x3b')][_0x3d8782('0x5f9')]=function(){const _0x290677=_0x3d8782,_0x572f75=VisuMZ[_0x290677('0x32b')]['Settings']['CustomParam'];if(!_0x572f75)return;for(const _0x668c2e of _0x572f75){if(!_0x668c2e)continue;VisuMZ[_0x290677('0x32b')][_0x290677('0x36e')](_0x668c2e);}},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x556')]={},VisuMZ[_0x3d8782('0x32b')]['CustomParamIcons']={},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x2e0')]={},VisuMZ['CoreEngine'][_0x3d8782('0x5f5')]={},VisuMZ[_0x3d8782('0x32b')]['createCustomParameter']=function(_0xf6ec){const _0x161216=_0x3d8782,_0x36ac0c=_0xf6ec[_0x161216('0x103')],_0x2f42ed=_0xf6ec[_0x161216('0x4c3')],_0xf67793=_0xf6ec[_0x161216('0x373')],_0x553545=_0xf6ec[_0x161216('0x44a')],_0x6f67aa=new Function(_0xf6ec['ValueJS']);VisuMZ[_0x161216('0x32b')]['CustomParamNames'][_0x36ac0c[_0x161216('0x28')]()[_0x161216('0x4f4')]()]=_0x2f42ed,VisuMZ['CoreEngine']['CustomParamIcons'][_0x36ac0c[_0x161216('0x28')]()['trim']()]=_0xf67793,VisuMZ[_0x161216('0x32b')]['CustomParamType'][_0x36ac0c[_0x161216('0x28')]()[_0x161216('0x4f4')]()]=_0x553545,VisuMZ[_0x161216('0x32b')][_0x161216('0x5f5')][_0x36ac0c[_0x161216('0x28')]()['trim']()]=_0x36ac0c,Object[_0x161216('0x3d0')](Game_BattlerBase['prototype'],_0x36ac0c,{'get'(){const _0xe6c20d=_0x161216;if(_0xe6c20d('0x94')!==_0xe6c20d('0x94')){function _0x3489ff(){const _0x1d8091=_0xe6c20d;if(this[_0x1d8091('0x502')]>0x63)return this[_0x1d8091('0x225')](_0x3d3177);return _0x30cc16[_0x1d8091('0x32b')][_0x1d8091('0x8e')][_0x1d8091('0x1c9')](this,_0x494031);}}else{const _0x3a332a=_0x6f67aa[_0xe6c20d('0x1c9')](this);return _0x553545===_0xe6c20d('0x22')?Math['round'](_0x3a332a):_0x3a332a;}}});},VisuMZ[_0x3d8782('0x32b')]['Graphics_defaultStretchMode']=Graphics[_0x3d8782('0x4d')],Graphics[_0x3d8782('0x4d')]=function(){const _0x1587a8=_0x3d8782;switch(VisuMZ[_0x1587a8('0x32b')]['Settings'][_0x1587a8('0x59e')][_0x1587a8('0x313')]){case _0x1587a8('0x205'):return!![];case _0x1587a8('0x22d'):return![];default:return VisuMZ[_0x1587a8('0x32b')][_0x1587a8('0x3aa')][_0x1587a8('0x1c9')](this);}},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x2b7')]=Graphics[_0x3d8782('0x5b1')],Graphics[_0x3d8782('0x5b1')]=function(_0x4bf486,_0x404016,_0x3f57ec=null){const _0x14f546=_0x3d8782;VisuMZ[_0x14f546('0x32b')][_0x14f546('0x2b7')][_0x14f546('0x1c9')](this,_0x4bf486,_0x404016,_0x3f57ec),VisuMZ[_0x14f546('0x8')](![]);},VisuMZ['CoreEngine'][_0x3d8782('0x71')]=Graphics[_0x3d8782('0x4cf')],Graphics[_0x3d8782('0x4cf')]=function(_0x509356){const _0x49a973=_0x3d8782;VisuMZ[_0x49a973('0x32b')][_0x49a973('0x71')][_0x49a973('0x1c9')](this,_0x509356),this[_0x49a973('0x158')](_0x509356);},Graphics[_0x3d8782('0x158')]=function(_0x227914){const _0x214d14=_0x3d8782;VisuMZ[_0x214d14('0x32b')][_0x214d14('0x5ab')][_0x214d14('0x59e')][_0x214d14('0x35')]&&(_0x227914['style'][_0x214d14('0x4ad')]=_0x214d14('0x2d4')),VisuMZ[_0x214d14('0x32b')]['Settings'][_0x214d14('0x59e')][_0x214d14('0x4e0')]&&(_0x227914[_0x214d14('0x2cc')][_0x214d14('0x23f')]='pixelated');},Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x7d')]=function(){const _0x429d80=_0x3d8782;this[_0x429d80('0x2ce')]=!![];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x580')]=Sprite[_0x3d8782('0x3b')][_0x3d8782('0x5d7')],Sprite[_0x3d8782('0x3b')][_0x3d8782('0x5d7')]=function(){const _0x2ca1cf=_0x3d8782;VisuMZ[_0x2ca1cf('0x32b')]['Sprite_destroy'][_0x2ca1cf('0x1c9')](this),this[_0x2ca1cf('0x18b')]();},Sprite['prototype']['destroyCoreEngineMarkedBitmaps']=function(){const _0x45ab6a=_0x3d8782;if(!this[_0x45ab6a('0x5e1')])return;if(!this[_0x45ab6a('0x5e1')][_0x45ab6a('0x2ce')])return;this[_0x45ab6a('0x5e1')][_0x45ab6a('0x58a')]&&!this[_0x45ab6a('0x84')][_0x45ab6a('0x58a')]['destroyed']&&this[_0x45ab6a('0x5e1')][_0x45ab6a('0x5d7')]();},VisuMZ['CoreEngine'][_0x3d8782('0x542')]=Bitmap[_0x3d8782('0x3b')]['resize'],Bitmap[_0x3d8782('0x3b')]['resize']=function(_0x38a8bc,_0x57c2d0){const _0x3b0f55=_0x3d8782;VisuMZ[_0x3b0f55('0x32b')][_0x3b0f55('0x542')]['call'](this,_0x38a8bc,_0x57c2d0),this[_0x3b0f55('0x7d')]();},VisuMZ['CoreEngine'][_0x3d8782('0x43c')]=Bitmap['prototype'][_0x3d8782('0x375')],Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x375')]=function(_0xfe2038,_0x2687e0,_0x4d5740,_0x1129a0,_0x2843e2,_0x391fd7,_0x42b50d,_0x3972df,_0x573f1d){const _0x32f374=_0x3d8782;VisuMZ['CoreEngine']['Bitmap_blt'][_0x32f374('0x1c9')](this,_0xfe2038,_0x2687e0,_0x4d5740,_0x1129a0,_0x2843e2,_0x391fd7,_0x42b50d,_0x3972df,_0x573f1d),this[_0x32f374('0x7d')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x18f')]=Bitmap[_0x3d8782('0x3b')][_0x3d8782('0xa0')],Bitmap[_0x3d8782('0x3b')][_0x3d8782('0xa0')]=function(_0x4c6b8e,_0x5ba112,_0x4d34ed,_0x440a87){const _0x3905fe=_0x3d8782;VisuMZ[_0x3905fe('0x32b')]['Bitmap_clearRect'][_0x3905fe('0x1c9')](this,_0x4c6b8e,_0x5ba112,_0x4d34ed,_0x440a87),this['markCoreEngineModified']();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5d')]=Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x3')],Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x3')]=function(_0x2b50d4,_0x70822f,_0x5b496d,_0x1cc802,_0x268e55){const _0x1acf80=_0x3d8782;VisuMZ[_0x1acf80('0x32b')]['Bitmap_fillRect'][_0x1acf80('0x1c9')](this,_0x2b50d4,_0x70822f,_0x5b496d,_0x1cc802,_0x268e55),this[_0x1acf80('0x7d')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x11a')]=Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x48e')],Bitmap['prototype'][_0x3d8782('0x48e')]=function(_0x52c7a6,_0x120ba2,_0x1bbcc4,_0x3ccf32,_0xa154){const _0x51ba2e=_0x3d8782;VisuMZ['CoreEngine'][_0x51ba2e('0x11a')][_0x51ba2e('0x1c9')](this,_0x52c7a6,_0x120ba2,_0x1bbcc4,_0x3ccf32,_0xa154),this[_0x51ba2e('0x7d')]();},VisuMZ['CoreEngine'][_0x3d8782('0x7b')]=Bitmap[_0x3d8782('0x3b')]['gradientFillRect'],Bitmap[_0x3d8782('0x3b')]['gradientFillRect']=function(_0x2bb2e2,_0x311a34,_0x480313,_0x71825f,_0x4c6b28,_0x3c87b4,_0x59f174){const _0xb3cdd3=_0x3d8782;VisuMZ['CoreEngine'][_0xb3cdd3('0x7b')]['call'](this,_0x2bb2e2,_0x311a34,_0x480313,_0x71825f,_0x4c6b28,_0x3c87b4,_0x59f174),this[_0xb3cdd3('0x7d')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0xe3')]=Bitmap['prototype'][_0x3d8782('0x381')],Bitmap['prototype'][_0x3d8782('0x381')]=function(_0x13725c,_0x202c34,_0x3f2d8a,_0xcc9b7b){const _0x36a47d=_0x3d8782;VisuMZ['CoreEngine']['Bitmap_drawCircle'][_0x36a47d('0x1c9')](this,_0x13725c,_0x202c34,_0x3f2d8a,_0xcc9b7b),this[_0x36a47d('0x7d')]();},VisuMZ['CoreEngine'][_0x3d8782('0x28d')]=Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x2e3')],Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x2e3')]=function(_0x236376,_0x161fae,_0x19b9bf,_0x2fa293,_0x2bbb14,_0x470c84){const _0x3d9d0a=_0x3d8782;VisuMZ[_0x3d9d0a('0x32b')][_0x3d9d0a('0x28d')]['call'](this,_0x236376,_0x161fae,_0x19b9bf,_0x2fa293,_0x2bbb14,_0x470c84),this[_0x3d9d0a('0x7d')]();},VisuMZ['CoreEngine'][_0x3d8782('0xc5')]=Bitmap[_0x3d8782('0x3b')]['_drawTextOutline'],Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x543')]=function(_0x57ce54,_0x31ef4d,_0x285e5b,_0x1992f7){const _0x51c9f7=_0x3d8782;if(VisuMZ[_0x51c9f7('0x32b')][_0x51c9f7('0x5ab')][_0x51c9f7('0x59e')][_0x51c9f7('0x531')]){if(_0x51c9f7('0xc9')==='NjMTf')this[_0x51c9f7('0x4a9')](_0x57ce54,_0x31ef4d,_0x285e5b,_0x1992f7);else{function _0x196e37(){const _0x34c498=_0x51c9f7;_0x398348['CoreEngine']['Settings'][_0x34c498('0x59e')][_0x34c498('0x35')]&&(_0x3079be['style'][_0x34c498('0x4ad')]=_0x34c498('0x2d4')),_0x4d2ad1['CoreEngine'][_0x34c498('0x5ab')][_0x34c498('0x59e')][_0x34c498('0x4e0')]&&(_0xb43683[_0x34c498('0x2cc')]['image-rendering']=_0x34c498('0x78'));}}}else{if('EIaHZ'!==_0x51c9f7('0x1d2')){function _0x4a9fd5(){const _0x2f5e34=_0x51c9f7;_0x523084[_0x2f5e34('0x87')]()&&(_0x40a4e1['log'](_0x2f5e34('0x554')),_0x2173cb[_0x2f5e34('0xad')](_0xb21909));}}else VisuMZ[_0x51c9f7('0x32b')][_0x51c9f7('0xc5')][_0x51c9f7('0x1c9')](this,_0x57ce54,_0x31ef4d,_0x285e5b,_0x1992f7);}},Bitmap[_0x3d8782('0x3b')][_0x3d8782('0x4a9')]=function(_0x368446,_0x407fe6,_0x1b1a0c,_0x2470a0){const _0x2e6580=_0x3d8782,_0x7e3ce0=this[_0x2e6580('0xc2')];_0x7e3ce0[_0x2e6580('0x14')]=this['outlineColor'],_0x7e3ce0[_0x2e6580('0x274')](_0x368446,_0x407fe6+0x2,_0x1b1a0c+0x2,_0x2470a0);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x14c')]=Tilemap[_0x3d8782('0x3b')][_0x3d8782('0x223')],Tilemap[_0x3d8782('0x3b')][_0x3d8782('0x223')]=function(_0x43b511,_0x31170a,_0x927b23,_0x1e11d1){const _0x1e63ab=_0x3d8782;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0x1e63ab('0x32b')][_0x1e63ab('0x14c')][_0x1e63ab('0x1c9')](this,_0x43b511,_0x31170a,_0x927b23,_0x1e11d1);},Tilemap['Renderer'][_0x3d8782('0x3b')]['_createInternalTextures']=function(){const _0xc7ab74=_0x3d8782;this[_0xc7ab74('0x74')]();for(let _0x39436d=0x0;_0x39436d<Tilemap[_0xc7ab74('0x15b')][_0xc7ab74('0x57e')];_0x39436d++){if('tfytw'===_0xc7ab74('0x4c8')){const _0x23bb3b=new PIXI[(_0xc7ab74('0x15d'))]();_0x23bb3b[_0xc7ab74('0x2d3')](0x800,0x800),VisuMZ['CoreEngine'][_0xc7ab74('0x5ab')][_0xc7ab74('0x59e')][_0xc7ab74('0x4e0')]&&(_0x23bb3b[_0xc7ab74('0x450')]=PIXI['SCALE_MODES'][_0xc7ab74('0x55e')]),this[_0xc7ab74('0xd8')][_0xc7ab74('0x2b3')](_0x23bb3b);}else{function _0x1c3d03(){const _0x51b833=_0xc7ab74;_0x573e2a['CoreEngine'][_0x51b833('0x89')][_0x51b833('0x1c9')](this);}}}},WindowLayer['prototype'][_0x3d8782('0x215')]=function(){const _0x25c331=_0x3d8782;if(SceneManager&&SceneManager['_scene']){if('EAXZg'!=='EAXZg'){function _0x402d64(){const _0x5043ca=_0x2633;return _0x2fab8e[_0x5043ca('0x32b')]['Settings'][_0x5043ca('0x83')][_0x5043ca('0x5c2')];}}else return SceneManager[_0x25c331('0x4dc')][_0x25c331('0xe8')]();}else return!![];},VisuMZ[_0x3d8782('0x32b')]['WindowLayer_render']=WindowLayer[_0x3d8782('0x3b')][_0x3d8782('0x53e')],WindowLayer['prototype'][_0x3d8782('0x53e')]=function render(_0x4ff830){const _0x13a0f0=_0x3d8782;this[_0x13a0f0('0x215')]()?VisuMZ[_0x13a0f0('0x32b')][_0x13a0f0('0x357')]['call'](this,_0x4ff830):this[_0x13a0f0('0xee')](_0x4ff830);},WindowLayer[_0x3d8782('0x3b')][_0x3d8782('0xee')]=function render(_0x25c5ff){const _0x5e4699=_0x3d8782;if(!this[_0x5e4699('0x3d9')])return;const _0xa370c8=new PIXI[(_0x5e4699('0x45'))](),_0x529381=_0x25c5ff['gl'],_0x55d13e=this['children'][_0x5e4699('0x3fa')]();_0x25c5ff[_0x5e4699('0x10b')][_0x5e4699('0x52c')](),_0xa370c8[_0x5e4699('0x22a')]=this['transform'],_0x25c5ff['batch'][_0x5e4699('0xef')](),_0x529381[_0x5e4699('0x45d')](_0x529381[_0x5e4699('0x2d5')]);while(_0x55d13e[_0x5e4699('0x247')]>0x0){const _0x179d07=_0x55d13e['shift']();_0x179d07[_0x5e4699('0xe6')]&&_0x179d07[_0x5e4699('0x3d9')]&&_0x179d07[_0x5e4699('0x310')]>0x0&&(_0x529381['stencilFunc'](_0x529381[_0x5e4699('0x129')],0x0,~0x0),_0x529381[_0x5e4699('0x1b1')](_0x529381[_0x5e4699('0x572')],_0x529381[_0x5e4699('0x572')],_0x529381[_0x5e4699('0x572')]),_0x179d07[_0x5e4699('0x53e')](_0x25c5ff),_0x25c5ff[_0x5e4699('0x15c')][_0x5e4699('0xef')](),_0xa370c8[_0x5e4699('0x4d4')](),_0x529381[_0x5e4699('0x49c')](_0x529381['ALWAYS'],0x1,~0x0),_0x529381[_0x5e4699('0x1b1')](_0x529381[_0x5e4699('0x2d9')],_0x529381[_0x5e4699('0x2d9')],_0x529381[_0x5e4699('0x2d9')]),_0x529381['blendFunc'](_0x529381[_0x5e4699('0x3a3')],_0x529381[_0x5e4699('0x565')]),_0xa370c8['render'](_0x25c5ff),_0x25c5ff['batch']['flush'](),_0x529381['blendFunc'](_0x529381[_0x5e4699('0x565')],_0x529381[_0x5e4699('0x295')]));}_0x529381[_0x5e4699('0x4ed')](_0x529381[_0x5e4699('0x2d5')]),_0x529381[_0x5e4699('0x4d4')](_0x529381['STENCIL_BUFFER_BIT']),_0x529381[_0x5e4699('0x484')](0x0),_0x25c5ff['batch'][_0x5e4699('0xef')]();for(const _0x432f68 of this['children']){if(!_0x432f68[_0x5e4699('0xe6')]&&_0x432f68[_0x5e4699('0x3d9')]){if(_0x5e4699('0xca')!=='HPogl')_0x432f68[_0x5e4699('0x53e')](_0x25c5ff);else{function _0x177f88(){return'';}}}}_0x25c5ff[_0x5e4699('0x15c')]['flush']();},DataManager[_0x3d8782('0x121')]=function(_0x11f0da){const _0x2c177d=_0x3d8782;return this['isItem'](_0x11f0da)&&_0x11f0da[_0x2c177d('0x50b')]===0x2;},VisuMZ[_0x3d8782('0x32b')]['DataManager_setupNewGame']=DataManager['setupNewGame'],DataManager[_0x3d8782('0x3bd')]=function(){const _0x5bdca9=_0x3d8782;VisuMZ[_0x5bdca9('0x32b')]['DataManager_setupNewGame'][_0x5bdca9('0x1c9')](this),this['reservePlayTestNewGameCommonEvent']();},DataManager[_0x3d8782('0xd0')]=function(){const _0x4321d6=_0x3d8782;if($gameTemp[_0x4321d6('0x87')]()){const _0x140e91=VisuMZ[_0x4321d6('0x32b')]['Settings'][_0x4321d6('0x59e')][_0x4321d6('0x33a')];if(_0x140e91>0x0)$gameTemp[_0x4321d6('0x9e')](_0x140e91);}},TextManager[_0x3d8782('0x2e1')]=['','','','CANCEL','','',_0x3d8782('0x5df'),'',_0x3d8782('0x2ae'),_0x3d8782('0x5a1'),'','','CLEAR',_0x3d8782('0x51c'),'ENTER_SPECIAL','',_0x3d8782('0x5d1'),_0x3d8782('0x5f1'),_0x3d8782('0x1dc'),'PAUSE','CAPSLOCK',_0x3d8782('0x117'),_0x3d8782('0x1f7'),_0x3d8782('0x1a'),'FINAL',_0x3d8782('0x162'),'','ESC',_0x3d8782('0x1af'),_0x3d8782('0x5f7'),_0x3d8782('0x2ed'),_0x3d8782('0x2f7'),_0x3d8782('0x413'),_0x3d8782('0x3a7'),_0x3d8782('0x22b'),_0x3d8782('0x55a'),_0x3d8782('0x4ba'),_0x3d8782('0x44f'),'UP',_0x3d8782('0x3cd'),_0x3d8782('0x5d8'),_0x3d8782('0x131'),'PRINT','EXECUTE',_0x3d8782('0x251'),_0x3d8782('0x179'),_0x3d8782('0x28c'),'','0','1','2','3','4','5','6','7','8','9',_0x3d8782('0x2c3'),_0x3d8782('0x97'),_0x3d8782('0x6'),_0x3d8782('0x240'),_0x3d8782('0x4d3'),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x3d8782('0x537'),'',_0x3d8782('0x4d1'),'',_0x3d8782('0x505'),'NUMPAD0',_0x3d8782('0x353'),_0x3d8782('0x524'),_0x3d8782('0x14d'),_0x3d8782('0x3e5'),_0x3d8782('0x79'),_0x3d8782('0x2bb'),'NUMPAD7',_0x3d8782('0x280'),'NUMPAD9',_0x3d8782('0x441'),_0x3d8782('0x4e2'),_0x3d8782('0x520'),'SUBTRACT','DECIMAL',_0x3d8782('0xcf'),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x3d8782('0x37'),'F12',_0x3d8782('0x41d'),_0x3d8782('0x1ba'),_0x3d8782('0x38a'),_0x3d8782('0x4f6'),_0x3d8782('0x1b6'),_0x3d8782('0x4fa'),_0x3d8782('0x161'),_0x3d8782('0xe'),_0x3d8782('0x365'),_0x3d8782('0x493'),_0x3d8782('0xa1'),_0x3d8782('0x4eb'),'','','','','','','','',_0x3d8782('0x573'),'SCROLL_LOCK','WIN_OEM_FJ_JISHO',_0x3d8782('0x51'),_0x3d8782('0x414'),_0x3d8782('0x34c'),_0x3d8782('0x4c'),'','','','','','','','','','CIRCUMFLEX','EXCLAMATION',_0x3d8782('0x457'),_0x3d8782('0x417'),_0x3d8782('0x3d8'),_0x3d8782('0x498'),_0x3d8782('0x2eb'),'UNDERSCORE',_0x3d8782('0x58b'),_0x3d8782('0x575'),'ASTERISK',_0x3d8782('0x4c5'),_0x3d8782('0x3b1'),_0x3d8782('0x553'),_0x3d8782('0x4'),_0x3d8782('0xf9'),_0x3d8782('0x2f0'),'','','','','VOLUME_MUTE',_0x3d8782('0x588'),_0x3d8782('0x321'),'','',_0x3d8782('0x97'),'EQUALS',_0x3d8782('0x139'),_0x3d8782('0x112'),_0x3d8782('0x3df'),_0x3d8782('0x1a8'),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x3d8782('0x42f'),_0x3d8782('0xfc'),'CLOSE_BRACKET',_0x3d8782('0x33d'),'','META','ALTGR','','WIN_ICO_HELP',_0x3d8782('0x1f0'),'',_0x3d8782('0x27a'),'','',_0x3d8782('0x5ca'),_0x3d8782('0x2ee'),_0x3d8782('0x264'),_0x3d8782('0x32a'),_0x3d8782('0x8a'),'WIN_OEM_WSCTRL','WIN_OEM_CUSEL',_0x3d8782('0x98'),'WIN_OEM_FINISH','WIN_OEM_COPY',_0x3d8782('0xbb'),_0x3d8782('0x50'),_0x3d8782('0x51a'),_0x3d8782('0x20d'),_0x3d8782('0x411'),_0x3d8782('0x1e6'),_0x3d8782('0x386'),_0x3d8782('0x2bd'),_0x3d8782('0x147'),'',_0x3d8782('0x2fe'),_0x3d8782('0x239'),''],TextManager[_0x3d8782('0x38e')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x499')]['OkText'],TextManager[_0x3d8782('0x3e2')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x499')]['CancelText'],TextManager[_0x3d8782('0x1ff')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x499')][_0x3d8782('0x40b')],VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x54c')]=TextManager[_0x3d8782('0x2ca')],TextManager['param']=function(_0x51e7ef){const _0x566f12=_0x3d8782;if(typeof _0x51e7ef===_0x566f12('0x3eb'))return VisuMZ[_0x566f12('0x32b')][_0x566f12('0x54c')][_0x566f12('0x1c9')](this,_0x51e7ef);else{if(_0x566f12('0x2a3')!==_0x566f12('0x2a3')){function _0x3e0aba(){const _0x4fb924=_0x566f12,_0xd4003e=_0x12482c[_0x4fb924('0x4b4')]();this[_0x4fb924('0x114')]=_0x4d20b5[_0x4fb924('0x463')](_0xd4003e)+_0xb41e7d[_0x4fb924('0x463')](_0xd4003e)+this[_0x4fb924('0x1c3')]();}}else return this[_0x566f12('0x50a')](_0x51e7ef);}},TextManager[_0x3d8782('0x50a')]=function(_0x335d25){const _0x1b0472=_0x3d8782;_0x335d25=String(_0x335d25||'')[_0x1b0472('0x28')]();const _0x5a485b=VisuMZ[_0x1b0472('0x32b')][_0x1b0472('0x5ab')][_0x1b0472('0x58')];if(_0x335d25===_0x1b0472('0x2c5'))return $dataSystem[_0x1b0472('0x2')]['params'][0x0];if(_0x335d25===_0x1b0472('0x171'))return $dataSystem[_0x1b0472('0x2')]['params'][0x1];if(_0x335d25===_0x1b0472('0x2b2'))return $dataSystem[_0x1b0472('0x2')]['params'][0x2];if(_0x335d25===_0x1b0472('0x21f'))return $dataSystem[_0x1b0472('0x2')]['params'][0x3];if(_0x335d25===_0x1b0472('0x27f'))return $dataSystem[_0x1b0472('0x2')][_0x1b0472('0x69')][0x4];if(_0x335d25===_0x1b0472('0x23b'))return $dataSystem[_0x1b0472('0x2')][_0x1b0472('0x69')][0x5];if(_0x335d25==='AGI')return $dataSystem['terms']['params'][0x6];if(_0x335d25===_0x1b0472('0x76'))return $dataSystem[_0x1b0472('0x2')]['params'][0x7];if(_0x335d25===_0x1b0472('0x33e'))return _0x5a485b[_0x1b0472('0x36c')];if(_0x335d25==='EVA')return _0x5a485b[_0x1b0472('0x534')];if(_0x335d25===_0x1b0472('0x2d'))return _0x5a485b[_0x1b0472('0x154')];if(_0x335d25==='CEV')return _0x5a485b['XParamVocab3'];if(_0x335d25==='MEV')return _0x5a485b[_0x1b0472('0x465')];if(_0x335d25===_0x1b0472('0x59b'))return _0x5a485b[_0x1b0472('0xaa')];if(_0x335d25==='CNT')return _0x5a485b[_0x1b0472('0x5fd')];if(_0x335d25==='HRG')return _0x5a485b[_0x1b0472('0x320')];if(_0x335d25===_0x1b0472('0x438'))return _0x5a485b[_0x1b0472('0x235')];if(_0x335d25===_0x1b0472('0x28b'))return _0x5a485b[_0x1b0472('0x356')];if(_0x335d25===_0x1b0472('0x5a3'))return _0x5a485b[_0x1b0472('0x3af')];if(_0x335d25==='GRD')return _0x5a485b[_0x1b0472('0x385')];if(_0x335d25===_0x1b0472('0x428'))return _0x5a485b[_0x1b0472('0x427')];if(_0x335d25===_0x1b0472('0x316'))return _0x5a485b['SParamVocab3'];if(_0x335d25===_0x1b0472('0x110'))return _0x5a485b[_0x1b0472('0x107')];if(_0x335d25==='TCR')return _0x5a485b[_0x1b0472('0x39e')];if(_0x335d25===_0x1b0472('0x425'))return _0x5a485b[_0x1b0472('0x2cb')];if(_0x335d25===_0x1b0472('0x434'))return _0x5a485b[_0x1b0472('0x191')];if(_0x335d25===_0x1b0472('0x59c'))return _0x5a485b[_0x1b0472('0x5fa')];if(_0x335d25===_0x1b0472('0x2fd'))return _0x5a485b[_0x1b0472('0x257')];if(VisuMZ[_0x1b0472('0x32b')][_0x1b0472('0x556')][_0x335d25])return VisuMZ[_0x1b0472('0x32b')][_0x1b0472('0x556')][_0x335d25];return'';},TextManager[_0x3d8782('0x284')]=function(_0x37099c){const _0x4a316b=_0x3d8782;if(_0x37099c===_0x4a316b('0x294'))_0x37099c='escape';let _0x3d34b7=[];for(let _0x9eda5c in Input[_0x4a316b('0x431')]){_0x9eda5c=Number(_0x9eda5c);if(_0x9eda5c>=0x60&&_0x9eda5c<=0x69)continue;if([0x12,0x20]['includes'](_0x9eda5c))continue;_0x37099c===Input[_0x4a316b('0x431')][_0x9eda5c]&&_0x3d34b7[_0x4a316b('0x2b3')](_0x9eda5c);}for(let _0x15df3b=0x0;_0x15df3b<_0x3d34b7[_0x4a316b('0x247')];_0x15df3b++){_0x3d34b7[_0x15df3b]=TextManager[_0x4a316b('0x2e1')][_0x3d34b7[_0x15df3b]];}return this[_0x4a316b('0x3cc')](_0x3d34b7);},TextManager[_0x3d8782('0x3cc')]=function(_0x48dcbd){const _0x1f4c5d=_0x3d8782,_0x1b54de=VisuMZ[_0x1f4c5d('0x32b')][_0x1f4c5d('0x5ab')][_0x1f4c5d('0x499')],_0xa242a2=_0x1b54de[_0x1f4c5d('0x267')],_0x1b9a5a=_0x48dcbd[_0x1f4c5d('0x41b')](),_0x46bfbf=_0x1f4c5d('0x242')[_0x1f4c5d('0x2a2')](_0x1b9a5a);return _0x1b54de[_0x46bfbf]?_0x1b54de[_0x46bfbf]:_0xa242a2[_0x1f4c5d('0x2a2')](_0x1b9a5a);},TextManager[_0x3d8782('0x5e5')]=function(_0x378a0e,_0x2bb653){const _0x59ef4e=_0x3d8782,_0x1cd460=VisuMZ[_0x59ef4e('0x32b')]['Settings'][_0x59ef4e('0x499')],_0x3e9e15=_0x1cd460[_0x59ef4e('0x4d8')],_0x4c602c=this['getInputButtonString'](_0x378a0e),_0x221ae1=this[_0x59ef4e('0x284')](_0x2bb653);return _0x3e9e15[_0x59ef4e('0x2a2')](_0x4c602c,_0x221ae1);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x299')]=ColorManager[_0x3d8782('0x564')],ColorManager[_0x3d8782('0x564')]=function(){const _0x5c2381=_0x3d8782;VisuMZ[_0x5c2381('0x32b')]['ColorManager_loadWindowskin'][_0x5c2381('0x1c9')](this),this['_colorCache']=this[_0x5c2381('0x1d5')]||{};},ColorManager[_0x3d8782('0x344')]=function(_0x1884bd,_0x489655){const _0x4e6156=_0x3d8782;_0x489655=String(_0x489655),this[_0x4e6156('0x1d5')]=this[_0x4e6156('0x1d5')]||{};if(_0x489655['match'](/#(.*)/i))this[_0x4e6156('0x1d5')][_0x1884bd]='#%1'[_0x4e6156('0x2a2')](String(RegExp['$1']));else{if(_0x4e6156('0x157')==='cWxLx')this['_colorCache'][_0x1884bd]=this[_0x4e6156('0x3a2')](Number(_0x489655));else{function _0x2ddd29(){const _0x5f250b=_0x4e6156;return this[_0x5f250b('0x9b')](_0x3e74f7);}}}return this[_0x4e6156('0x1d5')][_0x1884bd];},ColorManager[_0x3d8782('0x2e2')]=function(_0xd2092a){const _0x555655=_0x3d8782;if(_0xd2092a[_0x555655('0x1a7')](/#(.*)/i))return _0x555655('0xb4')['format'](String(RegExp['$1']));else{if('LUYAJ'!=='LUYAJ'){function _0x4c1de2(){const _0x358d77=_0x555655,_0x293998='_stored_normalColor';this['_colorCache']=this[_0x358d77('0x1d5')]||{};if(this[_0x358d77('0x1d5')][_0x293998])return this['_colorCache'][_0x293998];const _0x4d990f=_0x15bcd8[_0x358d77('0x32b')][_0x358d77('0x5ab')][_0x358d77('0x477')][_0x358d77('0x1cb')];return this[_0x358d77('0x344')](_0x293998,_0x4d990f);}}else return this[_0x555655('0x3a2')](Number(_0xd2092a));}},ColorManager[_0x3d8782('0x224')]=function(){const _0x57861a=_0x3d8782;this[_0x57861a('0x1d5')]={};},ColorManager[_0x3d8782('0x47f')]=function(){const _0x9a785d=_0x3d8782,_0x52f4df=_0x9a785d('0x2f4');this['_colorCache']=this[_0x9a785d('0x1d5')]||{};if(this[_0x9a785d('0x1d5')][_0x52f4df])return this['_colorCache'][_0x52f4df];const _0x158051=VisuMZ[_0x9a785d('0x32b')]['Settings'][_0x9a785d('0x477')]['ColorNormal'];return this[_0x9a785d('0x344')](_0x52f4df,_0x158051);},ColorManager['systemColor']=function(){const _0x98b8f1=_0x3d8782,_0x20f1e4=_0x98b8f1('0x350');this[_0x98b8f1('0x1d5')]=this[_0x98b8f1('0x1d5')]||{};if(this[_0x98b8f1('0x1d5')][_0x20f1e4])return this['_colorCache'][_0x20f1e4];const _0xbdf81a=VisuMZ['CoreEngine']['Settings']['Color']['ColorSystem'];return this[_0x98b8f1('0x344')](_0x20f1e4,_0xbdf81a);},ColorManager[_0x3d8782('0x1bd')]=function(){const _0x14da54=_0x3d8782,_0x98e325='_stored_crisisColor';this[_0x14da54('0x1d5')]=this['_colorCache']||{};if(this[_0x14da54('0x1d5')][_0x98e325])return this['_colorCache'][_0x98e325];const _0x2209dd=VisuMZ[_0x14da54('0x32b')][_0x14da54('0x5ab')][_0x14da54('0x477')]['ColorCrisis'];return this[_0x14da54('0x344')](_0x98e325,_0x2209dd);},ColorManager['deathColor']=function(){const _0x308edd=_0x3d8782,_0x45813a=_0x308edd('0x40');this['_colorCache']=this[_0x308edd('0x1d5')]||{};if(this[_0x308edd('0x1d5')][_0x45813a])return this[_0x308edd('0x1d5')][_0x45813a];const _0x971e7d=VisuMZ[_0x308edd('0x32b')][_0x308edd('0x5ab')]['Color'][_0x308edd('0x234')];return this['getColorDataFromPluginParameters'](_0x45813a,_0x971e7d);},ColorManager[_0x3d8782('0x37c')]=function(){const _0x1b0646=_0x3d8782,_0x479c8a=_0x1b0646('0x270');this[_0x1b0646('0x1d5')]=this[_0x1b0646('0x1d5')]||{};if(this['_colorCache'][_0x479c8a])return this[_0x1b0646('0x1d5')][_0x479c8a];const _0x587bc6=VisuMZ[_0x1b0646('0x32b')]['Settings'][_0x1b0646('0x477')]['ColorGaugeBack'];return this[_0x1b0646('0x344')](_0x479c8a,_0x587bc6);},ColorManager[_0x3d8782('0x51f')]=function(){const _0x333a43=_0x3d8782,_0x4f39c8=_0x333a43('0x30d');this[_0x333a43('0x1d5')]=this['_colorCache']||{};if(this[_0x333a43('0x1d5')][_0x4f39c8])return this[_0x333a43('0x1d5')][_0x4f39c8];const _0x1e2225=VisuMZ[_0x333a43('0x32b')][_0x333a43('0x5ab')][_0x333a43('0x477')][_0x333a43('0x412')];return this['getColorDataFromPluginParameters'](_0x4f39c8,_0x1e2225);},ColorManager[_0x3d8782('0x56c')]=function(){const _0x470ee3=_0x3d8782,_0xac8dfd=_0x470ee3('0x1f');this['_colorCache']=this[_0x470ee3('0x1d5')]||{};if(this['_colorCache'][_0xac8dfd])return this[_0x470ee3('0x1d5')][_0xac8dfd];const _0x37cd90=VisuMZ[_0x470ee3('0x32b')][_0x470ee3('0x5ab')][_0x470ee3('0x477')][_0x470ee3('0x229')];return this[_0x470ee3('0x344')](_0xac8dfd,_0x37cd90);},ColorManager[_0x3d8782('0x246')]=function(){const _0x5c6d9a=_0x3d8782,_0x129ea5=_0x5c6d9a('0x140');this[_0x5c6d9a('0x1d5')]=this[_0x5c6d9a('0x1d5')]||{};if(this[_0x5c6d9a('0x1d5')][_0x129ea5])return this[_0x5c6d9a('0x1d5')][_0x129ea5];const _0x2aee8c=VisuMZ[_0x5c6d9a('0x32b')]['Settings'][_0x5c6d9a('0x477')][_0x5c6d9a('0x4fc')];return this[_0x5c6d9a('0x344')](_0x129ea5,_0x2aee8c);},ColorManager[_0x3d8782('0xb5')]=function(){const _0xc4412=_0x3d8782,_0x231638=_0xc4412('0x4bc');this[_0xc4412('0x1d5')]=this[_0xc4412('0x1d5')]||{};if(this['_colorCache'][_0x231638])return this[_0xc4412('0x1d5')][_0x231638];const _0x257f43=VisuMZ['CoreEngine'][_0xc4412('0x5ab')]['Color'][_0xc4412('0x519')];return this[_0xc4412('0x344')](_0x231638,_0x257f43);},ColorManager['mpCostColor']=function(){const _0x25e2c2=_0x3d8782,_0x750f7c=_0x25e2c2('0x1b5');this[_0x25e2c2('0x1d5')]=this[_0x25e2c2('0x1d5')]||{};if(this[_0x25e2c2('0x1d5')][_0x750f7c])return this['_colorCache'][_0x750f7c];const _0x372327=VisuMZ[_0x25e2c2('0x32b')][_0x25e2c2('0x5ab')][_0x25e2c2('0x477')][_0x25e2c2('0x227')];return this[_0x25e2c2('0x344')](_0x750f7c,_0x372327);},ColorManager[_0x3d8782('0x269')]=function(){const _0x492404=_0x3d8782,_0x5bfc82='_stored_powerUpColor';this[_0x492404('0x1d5')]=this[_0x492404('0x1d5')]||{};if(this[_0x492404('0x1d5')][_0x5bfc82])return this[_0x492404('0x1d5')][_0x5bfc82];const _0x25e29a=VisuMZ[_0x492404('0x32b')][_0x492404('0x5ab')][_0x492404('0x477')][_0x492404('0x4d6')];return this[_0x492404('0x344')](_0x5bfc82,_0x25e29a);},ColorManager[_0x3d8782('0x487')]=function(){const _0x4b0157=_0x3d8782,_0x3739a3=_0x4b0157('0x25f');this['_colorCache']=this['_colorCache']||{};if(this[_0x4b0157('0x1d5')][_0x3739a3])return this[_0x4b0157('0x1d5')][_0x3739a3];const _0x2ac258=VisuMZ[_0x4b0157('0x32b')][_0x4b0157('0x5ab')][_0x4b0157('0x477')][_0x4b0157('0x33')];return this[_0x4b0157('0x344')](_0x3739a3,_0x2ac258);},ColorManager[_0x3d8782('0x476')]=function(){const _0x4b8e05=_0x3d8782,_0x49f6bc='_stored_ctGaugeColor1';this[_0x4b8e05('0x1d5')]=this[_0x4b8e05('0x1d5')]||{};if(this['_colorCache'][_0x49f6bc])return this[_0x4b8e05('0x1d5')][_0x49f6bc];const _0x22048f=VisuMZ[_0x4b8e05('0x32b')][_0x4b8e05('0x5ab')][_0x4b8e05('0x477')][_0x4b8e05('0x156')];return this[_0x4b8e05('0x344')](_0x49f6bc,_0x22048f);},ColorManager[_0x3d8782('0x449')]=function(){const _0x5f32e8=_0x3d8782,_0xb1b061='_stored_ctGaugeColor2';this[_0x5f32e8('0x1d5')]=this[_0x5f32e8('0x1d5')]||{};if(this[_0x5f32e8('0x1d5')][_0xb1b061])return this[_0x5f32e8('0x1d5')][_0xb1b061];const _0x4c2f7e=VisuMZ[_0x5f32e8('0x32b')][_0x5f32e8('0x5ab')][_0x5f32e8('0x477')]['ColorCTGauge2'];return this[_0x5f32e8('0x344')](_0xb1b061,_0x4c2f7e);},ColorManager['tpGaugeColor1']=function(){const _0x426512=_0x3d8782,_0x117e5a=_0x426512('0x109');this['_colorCache']=this[_0x426512('0x1d5')]||{};if(this[_0x426512('0x1d5')][_0x117e5a])return this[_0x426512('0x1d5')][_0x117e5a];const _0x398248=VisuMZ['CoreEngine'][_0x426512('0x5ab')][_0x426512('0x477')][_0x426512('0xc1')];return this[_0x426512('0x344')](_0x117e5a,_0x398248);},ColorManager[_0x3d8782('0x28a')]=function(){const _0x10efa1=_0x3d8782,_0x3b4d58=_0x10efa1('0x19');this['_colorCache']=this[_0x10efa1('0x1d5')]||{};if(this[_0x10efa1('0x1d5')][_0x3b4d58])return this[_0x10efa1('0x1d5')][_0x3b4d58];const _0x1fa61e=VisuMZ[_0x10efa1('0x32b')][_0x10efa1('0x5ab')][_0x10efa1('0x477')][_0x10efa1('0x172')];return this[_0x10efa1('0x344')](_0x3b4d58,_0x1fa61e);},ColorManager[_0x3d8782('0x3ea')]=function(){const _0x5c3881=_0x3d8782,_0x4eb23f='_stored_tpCostColor';this[_0x5c3881('0x1d5')]=this[_0x5c3881('0x1d5')]||{};if(this['_colorCache'][_0x4eb23f])return this[_0x5c3881('0x1d5')][_0x4eb23f];const _0x9d2c46=VisuMZ[_0x5c3881('0x32b')][_0x5c3881('0x5ab')][_0x5c3881('0x477')][_0x5c3881('0x576')];return this[_0x5c3881('0x344')](_0x4eb23f,_0x9d2c46);},ColorManager[_0x3d8782('0x18')]=function(){const _0x28f71e=_0x3d8782,_0x3f8c5=_0x28f71e('0x4ae');this['_colorCache']=this[_0x28f71e('0x1d5')]||{};if(this[_0x28f71e('0x1d5')][_0x3f8c5])return this[_0x28f71e('0x1d5')][_0x3f8c5];const _0x4c6baf=VisuMZ['CoreEngine'][_0x28f71e('0x5ab')][_0x28f71e('0x477')][_0x28f71e('0x576')];return this[_0x28f71e('0x344')](_0x3f8c5,_0x4c6baf);},ColorManager[_0x3d8782('0x143')]=function(){const _0x4e2ea8=_0x3d8782,_0x4fe7aa=_0x4e2ea8('0x527');this[_0x4e2ea8('0x1d5')]=this[_0x4e2ea8('0x1d5')]||{};if(this[_0x4e2ea8('0x1d5')][_0x4fe7aa])return this['_colorCache'][_0x4fe7aa];const _0x5bfc20=VisuMZ[_0x4e2ea8('0x32b')][_0x4e2ea8('0x5ab')]['Color']['ColorExpGauge1'];return this['getColorDataFromPluginParameters'](_0x4fe7aa,_0x5bfc20);},ColorManager[_0x3d8782('0x343')]=function(){const _0x112478=_0x3d8782,_0x1391d3=_0x112478('0x12f');this[_0x112478('0x1d5')]=this['_colorCache']||{};if(this['_colorCache'][_0x1391d3])return this[_0x112478('0x1d5')][_0x1391d3];const _0x5aa964=VisuMZ[_0x112478('0x32b')]['Settings']['Color'][_0x112478('0x384')];return this[_0x112478('0x344')](_0x1391d3,_0x5aa964);},ColorManager[_0x3d8782('0x2d8')]=function(){const _0x2ae8c0=_0x3d8782,_0xee3f29='_stored_maxLvGaugeColor1';this[_0x2ae8c0('0x1d5')]=this[_0x2ae8c0('0x1d5')]||{};if(this[_0x2ae8c0('0x1d5')][_0xee3f29])return this[_0x2ae8c0('0x1d5')][_0xee3f29];const _0x490ab2=VisuMZ[_0x2ae8c0('0x32b')][_0x2ae8c0('0x5ab')][_0x2ae8c0('0x477')][_0x2ae8c0('0x236')];return this[_0x2ae8c0('0x344')](_0xee3f29,_0x490ab2);},ColorManager[_0x3d8782('0x1eb')]=function(){const _0x389212=_0x3d8782,_0x4a14b6=_0x389212('0x29b');this[_0x389212('0x1d5')]=this[_0x389212('0x1d5')]||{};if(this[_0x389212('0x1d5')][_0x4a14b6])return this[_0x389212('0x1d5')][_0x4a14b6];const _0x10968b=VisuMZ[_0x389212('0x32b')][_0x389212('0x5ab')][_0x389212('0x477')][_0x389212('0x138')];return this[_0x389212('0x344')](_0x4a14b6,_0x10968b);},ColorManager[_0x3d8782('0x222')]=function(_0x2b4707){const _0x2a2642=_0x3d8782;return VisuMZ[_0x2a2642('0x32b')][_0x2a2642('0x5ab')][_0x2a2642('0x477')][_0x2a2642('0x467')][_0x2a2642('0x1c9')](this,_0x2b4707);},ColorManager[_0x3d8782('0x27b')]=function(_0x5631e2){const _0x54571b=_0x3d8782;return VisuMZ[_0x54571b('0x32b')]['Settings'][_0x54571b('0x477')][_0x54571b('0x17d')][_0x54571b('0x1c9')](this,_0x5631e2);},ColorManager[_0x3d8782('0x5c4')]=function(_0x1a3e3f){const _0x4a718a=_0x3d8782;return VisuMZ[_0x4a718a('0x32b')][_0x4a718a('0x5ab')]['Color']['ActorTPColor'][_0x4a718a('0x1c9')](this,_0x1a3e3f);},ColorManager[_0x3d8782('0x50d')]=function(_0x3b53a9){const _0x246d05=_0x3d8782;return VisuMZ[_0x246d05('0x32b')][_0x246d05('0x5ab')][_0x246d05('0x477')][_0x246d05('0x56a')][_0x246d05('0x1c9')](this,_0x3b53a9);},ColorManager[_0x3d8782('0x218')]=function(_0xf67da9){const _0x5c6522=_0x3d8782;return VisuMZ[_0x5c6522('0x32b')][_0x5c6522('0x5ab')]['Color'][_0x5c6522('0x302')][_0x5c6522('0x1c9')](this,_0xf67da9);},ColorManager[_0x3d8782('0x3d5')]=function(){const _0x25ed79=_0x3d8782;return VisuMZ[_0x25ed79('0x32b')][_0x25ed79('0x5ab')][_0x25ed79('0x477')][_0x25ed79('0x329')];},ColorManager[_0x3d8782('0x398')]=function(){const _0x451c2e=_0x3d8782;return VisuMZ[_0x451c2e('0x32b')][_0x451c2e('0x5ab')]['Color'][_0x451c2e('0x22e')];},ColorManager[_0x3d8782('0x51d')]=function(){const _0xe740c3=_0x3d8782;return VisuMZ[_0xe740c3('0x32b')][_0xe740c3('0x5ab')][_0xe740c3('0x477')][_0xe740c3('0x5bf')];},ColorManager[_0x3d8782('0x2d1')]=function(){const _0x2b902d=_0x3d8782;return VisuMZ[_0x2b902d('0x32b')][_0x2b902d('0x5ab')][_0x2b902d('0x477')]['ItemBackColor1'];},ColorManager[_0x3d8782('0x15e')]=function(){const _0x4cb9e0=_0x3d8782;return VisuMZ['CoreEngine']['Settings'][_0x4cb9e0('0x477')][_0x4cb9e0('0x1fa')];},SceneManager[_0x3d8782('0x435')]=[],VisuMZ[_0x3d8782('0x32b')]['SceneManager_initialize']=SceneManager[_0x3d8782('0x460')],SceneManager[_0x3d8782('0x460')]=function(){const _0x176b57=_0x3d8782;VisuMZ[_0x176b57('0x32b')][_0x176b57('0x21e')][_0x176b57('0x1c9')](this),this[_0x176b57('0x5a7')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x1d3')]=SceneManager['onKeyDown'],SceneManager[_0x3d8782('0x3f1')]=function(_0x265c2b){const _0x262d68=_0x3d8782;if($gameTemp)this['onKeyDownKeysF6F7'](_0x265c2b);VisuMZ[_0x262d68('0x32b')]['SceneManager_onKeyDown'][_0x262d68('0x1c9')](this,_0x265c2b);},SceneManager['onKeyDownKeysF6F7']=function(_0x115dc6){const _0x2b7c6a=_0x3d8782;if(!_0x115dc6[_0x2b7c6a('0x183')]&&!_0x115dc6[_0x2b7c6a('0x325')])switch(_0x115dc6[_0x2b7c6a('0x2f1')]){case 0x75:this[_0x2b7c6a('0x3fd')]();break;case 0x76:this[_0x2b7c6a('0x306')]();break;}},SceneManager[_0x3d8782('0x3fd')]=function(){const _0x18efe1=_0x3d8782;if($gameTemp[_0x18efe1('0x87')]()&&VisuMZ[_0x18efe1('0x32b')]['Settings']['QoL']['F6key']){if(ConfigManager[_0x18efe1('0x4ee')]!==0x0){if('xlDyi'!==_0x18efe1('0x43f')){function _0x501ac3(){const _0x1606f2=_0x18efe1;this[_0x1606f2('0x4a8')]['x']=_0x395683[_0x1606f2('0x9d')]+0x4;}}else ConfigManager[_0x18efe1('0x37f')]=0x0,ConfigManager[_0x18efe1('0x532')]=0x0,ConfigManager[_0x18efe1('0x10c')]=0x0,ConfigManager['seVolume']=0x0;}else ConfigManager[_0x18efe1('0x37f')]=0x64,ConfigManager[_0x18efe1('0x532')]=0x64,ConfigManager[_0x18efe1('0x10c')]=0x64,ConfigManager[_0x18efe1('0x4ee')]=0x64;ConfigManager[_0x18efe1('0x4b')]();if(this[_0x18efe1('0x4dc')][_0x18efe1('0x4d0')]===Scene_Options){if(this[_0x18efe1('0x4dc')][_0x18efe1('0x546')])this[_0x18efe1('0x4dc')][_0x18efe1('0x546')][_0x18efe1('0x2ad')]();if(this[_0x18efe1('0x4dc')]['_listWindow'])this[_0x18efe1('0x4dc')][_0x18efe1('0x40e')][_0x18efe1('0x2ad')]();}}},SceneManager[_0x3d8782('0x306')]=function(){const _0xb046de=_0x3d8782;if($gameTemp[_0xb046de('0x87')]()&&VisuMZ[_0xb046de('0x32b')]['Settings'][_0xb046de('0x59e')][_0xb046de('0xbc')]){if(_0xb046de('0x82')===_0xb046de('0x82'))$gameTemp['_playTestFastMode']=!$gameTemp[_0xb046de('0x122')];else{function _0x138d7a(){const _0x231789=_0xb046de;return _0x5e9f05[_0x231789('0x32b')][_0x231789('0xec')][_0x231789('0x1c9')](this);}}}},SceneManager[_0x3d8782('0x5a7')]=function(){const _0x460063=_0x3d8782;this[_0x460063('0x297')]=![],this['_hideButtons']=!VisuMZ[_0x460063('0x32b')]['Settings']['UI'][_0x460063('0x1a6')];},SceneManager[_0x3d8782('0x305')]=function(_0x21c638){const _0x124d2e=_0x3d8782;VisuMZ[_0x124d2e('0x32b')][_0x124d2e('0x5ab')]['UI'][_0x124d2e('0x582')]&&(this[_0x124d2e('0x297')]=_0x21c638);},SceneManager[_0x3d8782('0x5ba')]=function(){const _0x12be9e=_0x3d8782;return this[_0x12be9e('0x297')];},SceneManager[_0x3d8782('0x374')]=function(){return this['_hideButtons'];},SceneManager[_0x3d8782('0x5d9')]=function(){const _0xeb170a=_0x3d8782;return this[_0xeb170a('0x374')]()||this[_0xeb170a('0x5ba')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x479')]=SceneManager[_0x3d8782('0x35e')],SceneManager['isGameActive']=function(){const _0x4e0580=_0x3d8782;if(VisuMZ[_0x4e0580('0x32b')]['Settings'][_0x4e0580('0x59e')][_0x4e0580('0x3ef')]){if(_0x4e0580('0x5e7')!=='HBtnS')return VisuMZ[_0x4e0580('0x32b')][_0x4e0580('0x479')]['call'](this);else{function _0x2d8bf4(){const _0x2623df=_0x4e0580;this[_0x2623df('0x2aa')](_0x343fc8[_0x2623df('0x174')]()[_0x2623df('0x439')],_0x32132e,_0x32e887,_0x41f871);}}}else return!![];},SceneManager[_0x3d8782('0x5db')]=function(_0x3e5209){const _0x554b18=_0x3d8782;if(_0x3e5209 instanceof Error)this['catchNormalError'](_0x3e5209);else{if(_0x3e5209 instanceof Array&&_0x3e5209[0x0]==='LoadError'){if(_0x554b18('0x3b5')!==_0x554b18('0x3b5')){function _0x530073(){return 0x0;}}else this[_0x554b18('0x361')](_0x3e5209);}else{if('OKWLO'===_0x554b18('0x5c9'))this[_0x554b18('0x128')](_0x3e5209);else{function _0x9806e7(){const _0x330028=_0x554b18;_0x1d6e72[_0x330028('0x32b')][_0x330028('0xb3')][_0x330028('0x1c9')](this),this[_0x330028('0x358')](this[_0x330028('0x4f8')]()),this[_0x330028('0x13d')]();}}}}this[_0x554b18('0x583')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x3b0')]=BattleManager['processEscape'],BattleManager['processEscape']=function(){const _0x3a0c7b=_0x3d8782;if(VisuMZ[_0x3a0c7b('0x32b')]['Settings']['QoL']['EscapeAlways']){if(_0x3a0c7b('0x88')===_0x3a0c7b('0x88'))this['processAlwaysEscape']();else{function _0x46c339(){const _0x2e3828=_0x3a0c7b;this[_0x2e3828('0x20e')][_0x2e3828('0x4a3')](_0x5910df[_0x2e3828('0x12')][_0x2e3828('0x2c1')]);}}}else return VisuMZ[_0x3a0c7b('0x32b')][_0x3a0c7b('0x3b0')][_0x3a0c7b('0x1c9')](this);},BattleManager['processAlwaysEscape']=function(){const _0x2ff080=_0x3d8782;return $gameParty[_0x2ff080('0x186')](),SoundManager[_0x2ff080('0x11')](),this[_0x2ff080('0x5f6')](),!![];},BattleManager[_0x3d8782('0xe4')]=function(){const _0x60adf8=_0x3d8782;return $gameSystem[_0x60adf8('0x1d8')]()>=0x1;},BattleManager[_0x3d8782('0x53d')]=function(){const _0x52f3d6=_0x3d8782;return $gameSystem[_0x52f3d6('0x1d8')]()===0x1;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x2e')]=Game_Temp['prototype'][_0x3d8782('0x460')],Game_Temp['prototype'][_0x3d8782('0x460')]=function(){const _0x35d650=_0x3d8782;VisuMZ[_0x35d650('0x32b')][_0x35d650('0x2e')]['call'](this),this[_0x35d650('0x20a')](),this[_0x35d650('0x36f')]();},Game_Temp[_0x3d8782('0x3b')][_0x3d8782('0x20a')]=function(){const _0x4dc25b=_0x3d8782;if(VisuMZ[_0x4dc25b('0x32b')][_0x4dc25b('0x5ab')][_0x4dc25b('0x59e')]['ForceNoPlayTest']){if(_0x4dc25b('0x1de')===_0x4dc25b('0x1de'))this[_0x4dc25b('0x597')]=![];else{function _0x320422(){const _0x5e22e8=_0x4dc25b,_0x470bea=_0x5e22e8('0x1b5');this[_0x5e22e8('0x1d5')]=this['_colorCache']||{};if(this['_colorCache'][_0x470bea])return this['_colorCache'][_0x470bea];const _0x5e3897=_0x3044a1[_0x5e22e8('0x32b')][_0x5e22e8('0x5ab')][_0x5e22e8('0x477')]['ColorMPCost'];return this[_0x5e22e8('0x344')](_0x470bea,_0x5e3897);}}}},Game_Temp[_0x3d8782('0x3b')][_0x3d8782('0x36f')]=function(){const _0x4c89d7=_0x3d8782;this[_0x4c89d7('0x219')]=[];},Game_Temp[_0x3d8782('0x3b')][_0x3d8782('0x1f8')]=function(_0x4787cc,_0x50a3de,_0x4074d5,_0x42c6d5){const _0x397b24=_0x3d8782;if(!this[_0x397b24('0x17')]())return;_0x4074d5=_0x4074d5||![],_0x42c6d5=_0x42c6d5||![];if($dataAnimations[_0x50a3de]){if(_0x397b24('0x5c7')!=='RizCD'){function _0x481add(){const _0x5165a3=_0x397b24;if(_0xd19550[_0x5165a3('0x32b')][_0x5165a3('0x5ab')]['UI'][_0x5165a3('0x582')]){const _0x403646=_0xe8953f[_0x5165a3('0x466')]-_0x5b0c7a[_0x5165a3('0x9d')]-_0x4e5c7c[_0x5165a3('0x32b')][_0x5165a3('0x5ab')]['UI'][_0x5165a3('0x185')]*0x2,_0xf9e692=_0x52153f['prototype'][_0x5165a3('0x212')][_0x5165a3('0x1c9')](this)*0x4;if(_0x403646>=_0xf9e692)_0x413cfc[_0x5165a3('0x305')](!![]);}}}else{const _0xd12517={'targets':_0x4787cc,'animationId':_0x50a3de,'mirror':_0x4074d5,'mute':_0x42c6d5};this[_0x397b24('0x219')][_0x397b24('0x2b3')](_0xd12517);for(const _0x543570 of _0x4787cc){if(_0x397b24('0x104')===_0x397b24('0x100')){function _0x2aa8c8(){const _0xdd6cb5=_0x397b24;return _0x1d809a['CoreEngine'][_0xdd6cb5('0x5ab')][_0xdd6cb5('0x59e')][_0xdd6cb5('0x2b6')];}}else{if(_0x543570['startAnimation']){if(_0x397b24('0x401')!==_0x397b24('0x1bf'))_0x543570[_0x397b24('0x3d2')]();else{function _0x6e6eb3(){this['setSkill'](_0x31bbc6);}}}}}}}},Game_Temp['prototype'][_0x3d8782('0x17')]=function(){return!![];},Game_Temp[_0x3d8782('0x3b')][_0x3d8782('0x2b')]=function(){const _0x211bd6=_0x3d8782;return this[_0x211bd6('0x219')]['shift']();},Game_Temp[_0x3d8782('0x3b')][_0x3d8782('0x54d')]=function(_0x2ef558){const _0x1fdb99=_0x3d8782;this[_0x1fdb99('0x563')]=_0x2ef558;},Game_Temp['prototype'][_0x3d8782('0x29f')]=function(){const _0x112aad=_0x3d8782;return this[_0x112aad('0x563')];},Game_Temp[_0x3d8782('0x3b')][_0x3d8782('0x5f0')]=function(){const _0x44e755=_0x3d8782;this[_0x44e755('0x5b')]=undefined,this[_0x44e755('0x557')]=undefined;},Game_Temp[_0x3d8782('0x3b')]['applyForcedGameTroopSettingsCoreEngine']=function(_0x53af77){const _0x3ef507=_0x3d8782;$gameMap&&$dataMap&&$dataMap[_0x3ef507('0x1e5')]&&this[_0x3ef507('0x3e3')]($dataMap['note']);const _0x31ab75=$dataTroops[_0x53af77];if(_0x31ab75){if(_0x3ef507('0x163')==='NmCQZ')this['parseForcedGameTroopSettingsCoreEngine'](_0x31ab75[_0x3ef507('0x439')]);else{function _0x2f31d1(){const _0x1804c4=_0x3ef507;this['_destroyInternalTextures']();for(let _0x7b5cb6=0x0;_0x7b5cb6<_0x1b2e9c[_0x1804c4('0x15b')]['MAX_GL_TEXTURES'];_0x7b5cb6++){const _0x4da1b6=new _0x2f0797[(_0x1804c4('0x15d'))]();_0x4da1b6[_0x1804c4('0x2d3')](0x800,0x800),_0x45e365[_0x1804c4('0x32b')]['Settings'][_0x1804c4('0x59e')][_0x1804c4('0x4e0')]&&(_0x4da1b6[_0x1804c4('0x450')]=_0x4b22af[_0x1804c4('0x362')]['NEAREST']),this[_0x1804c4('0xd8')][_0x1804c4('0x2b3')](_0x4da1b6);}}}}},Game_Temp['prototype'][_0x3d8782('0x3e3')]=function(_0x1978b0){const _0xb462b9=_0x3d8782;if(!_0x1978b0)return;if(_0x1978b0[_0xb462b9('0x1a7')](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0xb462b9('0x5b')]='FV';else{if(_0x1978b0['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x1978b0[_0xb462b9('0x1a7')](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x24565d=String(RegExp['$1']);if(_0x24565d[_0xb462b9('0x1a7')](/(?:FRONTVIEW|FRONT VIEW|FV)/i)){if('QEGhF'==='QEGhF')this[_0xb462b9('0x5b')]='FV';else{function _0x1ff36f(){const _0x42651c=_0xb462b9;return _0x260075[_0x42651c('0x3e2')];}}}else _0x24565d[_0xb462b9('0x1a7')](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0xb462b9('0x5b')]='SV');}}}if(_0x1978b0[_0xb462b9('0x1a7')](/<(?:DTB)>/i))this[_0xb462b9('0x557')]=0x0;else{if(_0x1978b0[_0xb462b9('0x1a7')](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x1978b0[_0xb462b9('0x1a7')](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0xb462b9('0x557')]=0x2;else{if(_0x1978b0[_0xb462b9('0x1a7')](/<(?:CTB)>/i))Imported[_0xb462b9('0x20c')]&&(this[_0xb462b9('0x557')]='CTB');else{if(_0x1978b0[_0xb462b9('0x1a7')](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x5d4e88=String(RegExp['$1']);if(_0x5d4e88[_0xb462b9('0x1a7')](/DTB/i))this[_0xb462b9('0x557')]=0x0;else{if(_0x5d4e88[_0xb462b9('0x1a7')](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0xb462b9('0x557')]=0x1;else{if(_0x5d4e88[_0xb462b9('0x1a7')](/(?:TPB|ATB)[ ]WAIT/i))this[_0xb462b9('0x557')]=0x2;else _0x5d4e88[_0xb462b9('0x1a7')](/CTB/i)&&(Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0xb462b9('0x557')]=_0xb462b9('0x586')));}}}}}}}},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x371')]=Game_System[_0x3d8782('0x3b')][_0x3d8782('0x460')],Game_System[_0x3d8782('0x3b')][_0x3d8782('0x460')]=function(){const _0x301357=_0x3d8782;VisuMZ[_0x301357('0x32b')][_0x301357('0x371')][_0x301357('0x1c9')](this),this[_0x301357('0x40d')]();},Game_System[_0x3d8782('0x3b')]['initCoreEngine']=function(){const _0x10f835=_0x3d8782;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x10f835('0x2f6')],'BattleSystem':this[_0x10f835('0x1c')](),'FontSize':$dataSystem['advanced'][_0x10f835('0x214')],'Padding':0xc};},Game_System['prototype']['isSideView']=function(){const _0x476930=_0x3d8782;if($gameTemp[_0x476930('0x5b')]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV'){if(_0x476930('0x429')===_0x476930('0x3e7')){function _0x13bf14(){const _0xdb6e6d=_0x476930;this[_0xdb6e6d('0x2e3')](_0x3ec5f8,_0x231248,_0x28b68f,_0x3353ff,_0xdb6e6d('0x3f7'));}}else return![];}}if(this['_CoreEngineSettings']===undefined)this[_0x476930('0x40d')]();if(this[_0x476930('0xe0')]['SideView']===undefined)this[_0x476930('0x40d')]();return this[_0x476930('0xe0')][_0x476930('0x54a')];},Game_System[_0x3d8782('0x3b')][_0x3d8782('0x56d')]=function(_0x35f2f3){const _0x3307e5=_0x3d8782;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x3307e5('0xe0')]['SideView']===undefined)this[_0x3307e5('0x40d')]();this[_0x3307e5('0xe0')][_0x3307e5('0x54a')]=_0x35f2f3;},Game_System['prototype'][_0x3d8782('0x585')]=function(){const _0x5ca426=_0x3d8782;if(this['_CoreEngineSettings']===undefined)this[_0x5ca426('0x40d')]();this[_0x5ca426('0xe0')]['BattleSystem']=this[_0x5ca426('0x1c')]();},Game_System[_0x3d8782('0x3b')][_0x3d8782('0x1c')]=function(){const _0x4edec6=_0x3d8782,_0x59a114=(VisuMZ[_0x4edec6('0x32b')][_0x4edec6('0x5ab')][_0x4edec6('0xfa')]||_0x4edec6('0x35d'))[_0x4edec6('0x28')]()['trim']();return VisuMZ[_0x4edec6('0x32b')][_0x4edec6('0xc7')](_0x59a114);},Game_System[_0x3d8782('0x3b')][_0x3d8782('0x1d8')]=function(){const _0x10115b=_0x3d8782;if($gameTemp[_0x10115b('0x557')]!==undefined)return $gameTemp[_0x10115b('0x557')];if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x10115b('0xe0')]['BattleSystem']===undefined)this[_0x10115b('0x585')]();return this[_0x10115b('0xe0')][_0x10115b('0xfa')];},Game_System[_0x3d8782('0x3b')]['setBattleSystem']=function(_0x948646){const _0x1c8e4c=_0x3d8782;if(this['_CoreEngineSettings']===undefined)this[_0x1c8e4c('0x40d')]();if(this[_0x1c8e4c('0xe0')][_0x1c8e4c('0xfa')]===undefined)this[_0x1c8e4c('0x585')]();this[_0x1c8e4c('0xe0')][_0x1c8e4c('0xfa')]=_0x948646;},Game_System['prototype'][_0x3d8782('0x351')]=function(){const _0x45d01c=_0x3d8782;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x45d01c('0xe0')][_0x45d01c('0x23e')]===undefined)this['initCoreEngine']();return this[_0x45d01c('0xe0')][_0x45d01c('0x23e')];},Game_System[_0x3d8782('0x3b')][_0x3d8782('0x32')]=function(_0x1f3e94){const _0x56e6b3=_0x3d8782;if(this[_0x56e6b3('0xe0')]===undefined)this[_0x56e6b3('0x40d')]();if(this[_0x56e6b3('0xe0')][_0x56e6b3('0x38')]===undefined)this[_0x56e6b3('0x40d')]();this[_0x56e6b3('0xe0')][_0x56e6b3('0x23e')]=_0x1f3e94;},Game_System[_0x3d8782('0x3b')][_0x3d8782('0x2f8')]=function(){const _0x2123cf=_0x3d8782;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x2123cf('0xe0')]['Padding']===undefined)this[_0x2123cf('0x40d')]();return this['_CoreEngineSettings'][_0x2123cf('0x5f3')];},Game_System['prototype'][_0x3d8782('0xe1')]=function(_0x2c7675){const _0x52796b=_0x3d8782;if(this[_0x52796b('0xe0')]===undefined)this['initCoreEngine']();if(this[_0x52796b('0xe0')][_0x52796b('0x38')]===undefined)this['initCoreEngine']();this[_0x52796b('0xe0')][_0x52796b('0x5f3')]=_0x2c7675;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ce')]=Game_Screen[_0x3d8782('0x3b')][_0x3d8782('0x460')],Game_Screen[_0x3d8782('0x3b')][_0x3d8782('0x460')]=function(){const _0x4c0db3=_0x3d8782;VisuMZ[_0x4c0db3('0x32b')][_0x4c0db3('0x5ce')][_0x4c0db3('0x1c9')](this),this['initCoreEngineScreenShake']();},Game_Screen['prototype'][_0x3d8782('0x1a9')]=function(){const _0x4e1afd=_0x3d8782,_0x4eb005=VisuMZ[_0x4e1afd('0x32b')][_0x4e1afd('0x5ab')][_0x4e1afd('0x233')];this[_0x4e1afd('0x250')]=_0x4eb005?.[_0x4e1afd('0x5e4')]||_0x4e1afd('0x18e');},Game_Screen[_0x3d8782('0x3b')]['getCoreEngineScreenShakeStyle']=function(){const _0x40b741=_0x3d8782;if(this[_0x40b741('0x250')]===undefined)this[_0x40b741('0x1a9')]();return this[_0x40b741('0x250')];},Game_Screen['prototype']['setCoreEngineScreenShakeStyle']=function(_0x38bb86){const _0x3fed24=_0x3d8782;if(this['_coreEngineShakeStyle']===undefined)this[_0x3fed24('0x1a9')]();this[_0x3fed24('0x250')]=_0x38bb86[_0x3fed24('0x200')]()[_0x3fed24('0x4f4')]();},Game_Picture['prototype'][_0x3d8782('0xd')]=function(){const _0x25beca=_0x3d8782;if($gameParty[_0x25beca('0x4fe')]())return![];return this[_0x25beca('0x439')]()&&this['name']()['charAt'](0x0)==='!';},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x20f')]=Game_Picture[_0x3d8782('0x3b')]['x'],Game_Picture['prototype']['x']=function(){const _0x19dc9b=_0x3d8782;if(this[_0x19dc9b('0xd')]()){if(_0x19dc9b('0x394')===_0x19dc9b('0x22c')){function _0x386257(){const _0x45f216=_0x19dc9b;this[_0x45f216('0x45c')][_0x45f216('0x4a3')](_0x34d3a5[_0x45f216('0x12')][_0x45f216('0x472')]);}}else return this[_0x19dc9b('0x41a')]();}else return VisuMZ[_0x19dc9b('0x32b')][_0x19dc9b('0x20f')]['call'](this);},Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x41a')]=function(){const _0x164a92=_0x3d8782,_0x223873=$gameMap['displayX']()*$gameMap[_0x164a92('0x90')]();return this['_x']-_0x223873;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x3d7')]=Game_Picture[_0x3d8782('0x3b')]['y'],Game_Picture[_0x3d8782('0x3b')]['y']=function(){const _0x5f027a=_0x3d8782;if(this[_0x5f027a('0xd')]()){if(_0x5f027a('0x5ae')==='bWtJj')return this[_0x5f027a('0x49d')]();else{function _0x2b808f(){const _0x4b7f62=_0x5f027a;_0x1b1371['CoreEngine'][_0x4b7f62('0x4a0')][_0x4b7f62('0x1c9')](this),_0x456697[_0x4b7f62('0x5ba')]()&&this['movePageButtonSideButtonLayout']();}}}else{if('zHDhQ'===_0x5f027a('0x144'))return VisuMZ[_0x5f027a('0x32b')][_0x5f027a('0x3d7')][_0x5f027a('0x1c9')](this);else{function _0x5f5019(){const _0x4fcbbe=_0x5f027a,_0xbabb90=_0x162d7d+(this[_0x4fcbbe('0x24f')]()-_0x37b0bb[_0x4fcbbe('0x288')])/0x2;this[_0x4fcbbe('0x14b')](_0x334a18,_0x5ddbb0+(_0xc015e0-_0x133351[_0x4fcbbe('0xd4')]),_0xbabb90),_0x46f960-=_0x57476d['iconWidth']+0x4;}}}},Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x49d')]=function(){const _0xd73f3d=_0x3d8782,_0x4d163f=$gameMap[_0xd73f3d('0x3b3')]()*$gameMap[_0xd73f3d('0x7e')]();return this['_y']-_0x4d163f;},Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x415')]=function(_0x5b7878){const _0x1a2d3d=_0x3d8782;this[_0x1a2d3d('0x475')]=_0x5b7878;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x335')]=Game_Picture['prototype']['calcEasing'],Game_Picture['prototype'][_0x3d8782('0x21d')]=function(_0xedc660){const _0x4a66b0=_0x3d8782;return this[_0x4a66b0('0x475')]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x4a66b0('0x5ec')](this[_0x4a66b0('0x475')])?VisuMZ[_0x4a66b0('0x32b')][_0x4a66b0('0x335')][_0x4a66b0('0x1c9')](this,_0xedc660):VisuMZ[_0x4a66b0('0x135')](_0xedc660,this[_0x4a66b0('0x475')]);},VisuMZ[_0x3d8782('0x32b')]['Game_Action_itemHit']=Game_Action[_0x3d8782('0x3b')]['itemHit'],Game_Action[_0x3d8782('0x3b')][_0x3d8782('0x52f')]=function(_0x582b6d){const _0x1d8fe7=_0x3d8782;if(VisuMZ[_0x1d8fe7('0x32b')][_0x1d8fe7('0x5ab')][_0x1d8fe7('0x59e')][_0x1d8fe7('0x25b')]){if(_0x1d8fe7('0x469')!==_0x1d8fe7('0xf'))return this[_0x1d8fe7('0x9b')](_0x582b6d);else{function _0x300128(){const _0x5a98af=_0x1d8fe7;this['smoothSelect'](_0x237abc[_0x5a98af('0x4d5')](this['index'](),0x0));}}}else{if('UxSlK'===_0x1d8fe7('0x2c4'))return VisuMZ[_0x1d8fe7('0x32b')]['Game_Action_itemHit'][_0x1d8fe7('0x1c9')](this,_0x582b6d);else{function _0x18f2d8(){const _0x16ca3a=_0x1d8fe7;_0x13fbf7[_0x16ca3a('0x122')]=!_0x1b5018[_0x16ca3a('0x122')];}}}},Game_Action[_0x3d8782('0x3b')]['itemHitImprovedAccuracy']=function(_0x5c239b){const _0x186969=_0x3d8782,_0x4f0cc2=this[_0x186969('0x22f')](_0x5c239b),_0x4d5e48=this[_0x186969('0x1e2')](_0x5c239b),_0x38a42a=this['targetEvaRate'](_0x5c239b);return _0x4f0cc2*(_0x4d5e48-_0x38a42a);},VisuMZ['CoreEngine'][_0x3d8782('0x277')]=Game_Action[_0x3d8782('0x3b')][_0x3d8782('0x34a')],Game_Action['prototype'][_0x3d8782('0x34a')]=function(_0x4d4c5d){const _0x200021=_0x3d8782;if(VisuMZ[_0x200021('0x32b')]['Settings']['QoL'][_0x200021('0x25b')])return 0x0;else{if(_0x200021('0x346')===_0x200021('0x346'))return VisuMZ['CoreEngine'][_0x200021('0x277')]['call'](this,_0x4d4c5d);else{function _0x545ccc(){const _0x1aaa07=_0x200021;if(!this[_0x1aaa07('0x5e1')])return;if(!this['bitmap'][_0x1aaa07('0x2ce')])return;this[_0x1aaa07('0x5e1')][_0x1aaa07('0x58a')]&&!this[_0x1aaa07('0x84')][_0x1aaa07('0x58a')][_0x1aaa07('0x446')]&&this[_0x1aaa07('0x5e1')]['destroy']();}}}},Game_Action['prototype'][_0x3d8782('0x22f')]=function(_0x2c341a){const _0x297a60=_0x3d8782;return this['item']()[_0x297a60('0x526')]*0.01;},Game_Action[_0x3d8782('0x3b')][_0x3d8782('0x1e2')]=function(_0x31b300){const _0x55cd66=_0x3d8782;if(VisuMZ[_0x55cd66('0x32b')][_0x55cd66('0x5ab')][_0x55cd66('0x59e')][_0x55cd66('0x2e4')]&&this[_0x55cd66('0x16b')]())return 0x1;if(this[_0x55cd66('0x263')]()){if(_0x55cd66('0x360')!=='rdosv'){function _0x2be752(){const _0x437348=_0x55cd66;return this['_fauxAnimationQueue'][_0x437348('0x1b0')]();}}else{if(VisuMZ['CoreEngine'][_0x55cd66('0x5ab')][_0x55cd66('0x59e')]['AccuracyBoost']&&this[_0x55cd66('0x416')]()['isActor']()){if(_0x55cd66('0x5fc')!==_0x55cd66('0x5fc')){function _0xecf68f(){const _0x49226b=_0x55cd66;this[_0x49226b('0x3b9')](0x4b0,0x0,0x78);}}else return this[_0x55cd66('0x416')]()['hit']+0.05;}else{if(_0x55cd66('0x169')!==_0x55cd66('0x39a'))return this[_0x55cd66('0x416')]()[_0x55cd66('0x5ad')];else{function _0x5be3b7(){const _0x3ecdf1=_0x55cd66;_0x42db73[_0x3ecdf1('0x3b')][_0x3ecdf1('0x195')]['call'](this),this['updateKeyText']();}}}}}else{if('sHkIJ'===_0x55cd66('0x1e8')){function _0x1d7b18(){const _0xdf4531=_0x55cd66;this[_0xdf4531('0x4fd')]&&(this[_0xdf4531('0x310')]+=this['openingSpeed'](),this['isOpen']()&&(this[_0xdf4531('0x4fd')]=![]));}}else return 0x1;}},Game_Action[_0x3d8782('0x3b')][_0x3d8782('0x4be')]=function(_0xbf9063){const _0x580c37=_0x3d8782;if(this['subject']()[_0x580c37('0x326')]()===_0xbf9063[_0x580c37('0x326')]())return 0x0;if(this[_0x580c37('0x263')]()){if('tneFp'!==_0x580c37('0x447'))return VisuMZ[_0x580c37('0x32b')][_0x580c37('0x5ab')][_0x580c37('0x59e')][_0x580c37('0x2e4')]&&_0xbf9063[_0x580c37('0x55d')]()?_0xbf9063[_0x580c37('0x39f')]-0.05:_0xbf9063[_0x580c37('0x39f')];else{function _0x4ee112(){const _0x5405b7=_0x580c37,_0x3fb5ff=this[_0x5405b7('0x5e6')](_0x555654,_0x5165e2);_0x3fb5ff['bitmap'][_0x5405b7('0x2e3')](_0x1ad30f[_0x5327e6],0x0,0x0,_0x4eb197,_0x38ab89,_0x5405b7('0x17e')),_0x3fb5ff['x']=(_0x5c254c-(_0x397c06[_0x5405b7('0x247')]-0x1)/0x2)*_0x2b00b1,_0x3fb5ff['dy']=-_0x57c5b4;}}}else return this[_0x580c37('0x31e')]()?_0xbf9063['mev']:0x0;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x4e8')]=Game_Action[_0x3d8782('0x3b')]['updateLastTarget'],Game_Action[_0x3d8782('0x3b')]['updateLastTarget']=function(_0x5a91dc){const _0x1906f7=_0x3d8782;VisuMZ[_0x1906f7('0x32b')][_0x1906f7('0x4e8')][_0x1906f7('0x1c9')](this,_0x5a91dc);if(VisuMZ[_0x1906f7('0x32b')]['Settings'][_0x1906f7('0x59e')][_0x1906f7('0x25b')])return;const _0x3ce737=_0x5a91dc[_0x1906f7('0x555')]();_0x3ce737[_0x1906f7('0x4ab')]&&(0x1-this['itemEva'](_0x5a91dc)>this['itemHit'](_0x5a91dc)&&(_0x3ce737['missed']=![],_0x3ce737['evaded']=!![]));},VisuMZ['CoreEngine'][_0x3d8782('0x33f')]=Game_BattlerBase['prototype'][_0x3d8782('0x190')],Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x190')]=function(){const _0xd0304d=_0x3d8782;this[_0xd0304d('0x283')]={},VisuMZ[_0xd0304d('0x32b')]['Game_BattlerBase_initMembers'][_0xd0304d('0x1c9')](this);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x38f')]=Game_BattlerBase['prototype'][_0x3d8782('0x2ad')],Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x2ad')]=function(){const _0x3e02a3=_0x3d8782;this[_0x3e02a3('0x283')]={},VisuMZ[_0x3e02a3('0x32b')][_0x3e02a3('0x38f')][_0x3e02a3('0x1c9')](this);},Game_BattlerBase['prototype'][_0x3d8782('0x328')]=function(_0x55bef4){const _0x3bb320=_0x3d8782;return this[_0x3bb320('0x283')]=this[_0x3bb320('0x283')]||{},this[_0x3bb320('0x283')][_0x55bef4]!==undefined;},Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x1ac')]=function(_0x36a984){const _0x2c2f23=_0x3d8782,_0x128674=(_0x511935,_0x1d8f51)=>{const _0x1d4a00=_0x2633;if(_0x1d4a00('0x17b')!==_0x1d4a00('0x17b')){function _0x4d6dcc(){const _0x2f2cac=_0x1d4a00;return _0x3a912d[_0x2f2cac('0x284')](_0x2f2cac('0x1b0'));}}else{if(!_0x1d8f51)return _0x511935;if(_0x1d8f51[_0x1d4a00('0x1e5')][_0x1d4a00('0x1a7')](VisuMZ['CoreEngine']['RegExp'][_0x1d4a00('0x1ac')][_0x36a984])){var _0x573a1c=Number(RegExp['$1']);_0x511935+=_0x573a1c;}if(_0x1d8f51['note'][_0x1d4a00('0x1a7')](VisuMZ['CoreEngine']['RegExp'][_0x1d4a00('0x4d2')][_0x36a984])){var _0x49eebd=String(RegExp['$1']);try{_0x511935+=eval(_0x49eebd);}catch(_0x42fbcc){if($gameTemp[_0x1d4a00('0x87')]())console[_0x1d4a00('0xad')](_0x42fbcc);}}return _0x511935;}};return this[_0x2c2f23('0x5bc')]()[_0x2c2f23('0x1d7')](_0x128674,this[_0x2c2f23('0x5dc')][_0x36a984]);},Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x53b')]=function(_0x18b676){const _0x138795=_0x3d8782;var _0x392d2e='Basic'+(this['isActor']()?'Actor':_0x138795('0x58c'))+_0x138795('0x372')+_0x18b676;if(this[_0x138795('0x328')](_0x392d2e))return this['_cache'][_0x392d2e];this[_0x138795('0x283')][_0x392d2e]=eval(VisuMZ['CoreEngine']['Settings'][_0x138795('0x58')][_0x392d2e]);const _0x55fdd9=(_0x146efc,_0x2fbd02)=>{const _0x17c519=_0x138795;if(_0x17c519('0x5d0')===_0x17c519('0x5a2')){function _0x4ac0b5(){const _0x32d49d=_0x17c519;if(!this['_coreEasing'])return;this['x']=this[_0x32d49d('0x14f')][_0x32d49d('0x339')],this['y']=this[_0x32d49d('0x14f')][_0x32d49d('0x4f9')],this[_0x32d49d('0x347')]['x']=this[_0x32d49d('0x14f')][_0x32d49d('0x26')],this[_0x32d49d('0x347')]['y']=this[_0x32d49d('0x14f')][_0x32d49d('0x4b1')],this['opacity']=this[_0x32d49d('0x14f')][_0x32d49d('0xdc')],this['backOpacity']=this['_coreEasing'][_0x32d49d('0x2a')],this['contentsOpacity']=this[_0x32d49d('0x14f')]['targetContentsOpacity'],this[_0x32d49d('0x461')](_0xe3611e,_0x75d06a,this['x'],this['y'],this['scale']['x'],this[_0x32d49d('0x347')]['y'],this[_0x32d49d('0x2a8')],this[_0x32d49d('0x1d4')],this[_0x32d49d('0x3ad')]);}}else{if(!_0x2fbd02)return _0x146efc;if(_0x2fbd02[_0x17c519('0x1e5')][_0x17c519('0x1a7')](VisuMZ['CoreEngine']['RegExp'][_0x17c519('0x53b')][_0x18b676])){var _0x2a195d=Number(RegExp['$1']);if(_0x2a195d===0x0)_0x2a195d=Number[_0x17c519('0xdf')];_0x146efc=Math['max'](_0x146efc,_0x2a195d);}if(_0x2fbd02[_0x17c519('0x1e5')]['match'](VisuMZ[_0x17c519('0x32b')][_0x17c519('0x453')][_0x17c519('0x36a')][_0x18b676])){var _0x3257a9=String(RegExp['$1']);try{if(_0x17c519('0x5f8')!==_0x17c519('0x19d'))_0x146efc=Math[_0x17c519('0x43d')](_0x146efc,Number(eval(_0x3257a9)));else{function _0x244c69(){const _0x4a1b1b=_0x17c519;return _0x45aabb[_0x4a1b1b('0x32b')][_0x4a1b1b('0x5ab')]['UI'][_0x4a1b1b('0x164')];}}}catch(_0x6e9944){if($gameTemp[_0x17c519('0x87')]())console[_0x17c519('0xad')](_0x6e9944);}}return _0x146efc;}};if(this[_0x138795('0x283')][_0x392d2e]===0x0)this[_0x138795('0x283')][_0x392d2e]=Number[_0x138795('0xdf')];return this[_0x138795('0x283')][_0x392d2e]=this[_0x138795('0x5bc')]()[_0x138795('0x1d7')](_0x55fdd9,this[_0x138795('0x283')][_0x392d2e]),this['_cache'][_0x392d2e];},Game_BattlerBase['prototype']['paramRate']=function(_0xb0620e){const _0x3faceb=_0x3d8782,_0x1fcd85=this[_0x3faceb('0x13f')](Game_BattlerBase['TRAIT_PARAM'],_0xb0620e),_0x5a7d31=(_0x100e9e,_0x99d452)=>{const _0x1a528d=_0x3faceb;if(_0x1a528d('0x201')==='poqLY'){function _0x461222(){const _0x145862=_0x1a528d;this[_0x145862('0x3fe')](_0x3e49d1[_0x145862('0xf5')](_0x145862('0x422')));}}else{if(!_0x99d452)return _0x100e9e;if(_0x99d452[_0x1a528d('0x1e5')][_0x1a528d('0x1a7')](VisuMZ[_0x1a528d('0x32b')][_0x1a528d('0x453')]['paramRate1'][_0xb0620e])){if('bIDWC'===_0x1a528d('0x8c')){var _0xb3e8b5=Number(RegExp['$1'])/0x64;_0x100e9e*=_0xb3e8b5;}else{function _0x56390a(){const _0x5da714=_0x1a528d;this[_0x5da714('0x2e3')](_0x447cf1[_0x5da714('0x32b')][_0x5da714('0x5ab')]['Gold'][_0x5da714('0x133')],_0x5f4303,_0x34c679,_0x3bf03d,'right');}}}if(_0x99d452[_0x1a528d('0x1e5')][_0x1a528d('0x1a7')](VisuMZ[_0x1a528d('0x32b')][_0x1a528d('0x453')][_0x1a528d('0x26a')][_0xb0620e])){var _0xb3e8b5=Number(RegExp['$1']);_0x100e9e*=_0xb3e8b5;}if(_0x99d452[_0x1a528d('0x1e5')][_0x1a528d('0x1a7')](VisuMZ[_0x1a528d('0x32b')][_0x1a528d('0x453')][_0x1a528d('0x268')][_0xb0620e])){if(_0x1a528d('0xf7')!==_0x1a528d('0x3c9')){var _0xfaddd1=String(RegExp['$1']);try{_0x100e9e*=eval(_0xfaddd1);}catch(_0x1f3718){if($gameTemp[_0x1a528d('0x87')]())console[_0x1a528d('0xad')](_0x1f3718);}}else{function _0x55d535(){var _0x19b459=_0x2f6255(_0x2a3d17['$1'])/0x64;_0x507130+=_0x19b459;}}}return _0x100e9e;}};return this[_0x3faceb('0x5bc')]()[_0x3faceb('0x1d7')](_0x5a7d31,_0x1fcd85);},Game_BattlerBase['prototype']['paramFlatBonus']=function(_0x3906e0){const _0x593bfa=_0x3d8782,_0x36028a=(_0x2739e1,_0x28e911)=>{const _0x293fc7=_0x2633;if(!_0x28e911)return _0x2739e1;if(_0x28e911[_0x293fc7('0x1e5')][_0x293fc7('0x1a7')](VisuMZ['CoreEngine']['RegExp'][_0x293fc7('0x47a')][_0x3906e0])){if(_0x293fc7('0x495')!==_0x293fc7('0x495')){function _0x302fcd(){return _0x5e1fda;}}else{var _0x1b52f5=Number(RegExp['$1']);_0x2739e1+=_0x1b52f5;}}if(_0x28e911[_0x293fc7('0x1e5')][_0x293fc7('0x1a7')](VisuMZ[_0x293fc7('0x32b')]['RegExp']['paramFlatJS'][_0x3906e0])){if(_0x293fc7('0x24e')==='mniEY'){function _0x9809fb(){const _0x22cb48=_0x293fc7;this[_0x22cb48('0x24')]();}}else{var _0x46962=String(RegExp['$1']);try{_0x2739e1+=eval(_0x46962);}catch(_0x12e556){if($gameTemp['isPlaytest']())console[_0x293fc7('0xad')](_0x12e556);}}}return _0x2739e1;};return this[_0x593bfa('0x5bc')]()[_0x593bfa('0x1d7')](_0x36028a,0x0);},Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x2ca')]=function(_0x347d7b){const _0x5a3fe2=_0x3d8782;let _0x414764=_0x5a3fe2('0x2ca')+_0x347d7b+_0x5a3fe2('0x512');if(this[_0x5a3fe2('0x328')](_0x414764))return this[_0x5a3fe2('0x283')][_0x414764];return this['_cache'][_0x414764]=Math[_0x5a3fe2('0x226')](VisuMZ[_0x5a3fe2('0x32b')][_0x5a3fe2('0x5ab')][_0x5a3fe2('0x58')][_0x5a3fe2('0xb8')][_0x5a3fe2('0x1c9')](this,_0x347d7b)),this[_0x5a3fe2('0x283')][_0x414764];},Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x1d6')]=function(_0x12bd3d){const _0x5a23e2=_0x3d8782,_0x1bd88d=(_0x4d7837,_0x16b426)=>{const _0x494987=_0x2633;if(!_0x16b426)return _0x4d7837;if(_0x16b426[_0x494987('0x1e5')]['match'](VisuMZ[_0x494987('0x32b')][_0x494987('0x453')]['xparamPlus1'][_0x12bd3d])){var _0x356792=Number(RegExp['$1'])/0x64;_0x4d7837+=_0x356792;}if(_0x16b426['note'][_0x494987('0x1a7')](VisuMZ['CoreEngine'][_0x494987('0x453')][_0x494987('0x49')][_0x12bd3d])){var _0x356792=Number(RegExp['$1']);_0x4d7837+=_0x356792;}if(_0x16b426['note'][_0x494987('0x1a7')](VisuMZ[_0x494987('0x32b')]['RegExp']['xparamPlusJS'][_0x12bd3d])){if(_0x494987('0x3f2')!==_0x494987('0x3f2')){function _0x5d9cf2(){const _0x1055b1=_0x494987;this[_0x1055b1('0x3de')]=_0x14eb44;}}else{var _0x3ffe90=String(RegExp['$1']);try{if('bTwFl'===_0x494987('0x52d'))_0x4d7837+=eval(_0x3ffe90);else{function _0x26b5f2(){const _0x1ae6c0=_0x494987;_0x126dc1[_0x1ae6c0('0x448')](_0x1ae6c0('0x1b0'))?this[_0x1ae6c0('0x4ea')]():this['cursorDown'](_0x478054[_0x1ae6c0('0xf5')](_0x1ae6c0('0x422')));}}}catch(_0x52b966){if('YkNWD'!==_0x494987('0x2d7')){function _0x4214d3(){const _0x100001=_0x494987,_0x5b900e=this[_0x100001('0x31a')](_0x56f4c8),_0x39bfe5=new(_0x5b900e?_0x57a849:_0x18598e)(),_0x224568=this['makeTargetSprites'](_0x37a85a);this[_0x100001('0x566')](_0x4b4019[0x0])&&(_0x3060cc=!_0x46f338),_0x39bfe5[_0x100001('0x4ff')]=_0x350013,_0x39bfe5['setup'](_0x224568,_0x18a16d,_0x3b8f19,_0x5c7cb3),_0x39bfe5[_0x100001('0x4b8')](_0x4f7a18),this['_effectsContainer']['addChild'](_0x39bfe5),this[_0x100001('0x275')]['push'](_0x39bfe5);}}else{if($gameTemp['isPlaytest']())console['log'](_0x52b966);}}}}return _0x4d7837;};return this[_0x5a23e2('0x5bc')]()[_0x5a23e2('0x1d7')](_0x1bd88d,0x0);},Game_BattlerBase[_0x3d8782('0x3b')]['xparamRate']=function(_0x3dbfdb){const _0x28a69f=_0x3d8782,_0x12fdc4=(_0x41f8c3,_0x5365a6)=>{const _0x1df930=_0x2633;if(!_0x5365a6)return _0x41f8c3;if(_0x5365a6[_0x1df930('0x1e5')][_0x1df930('0x1a7')](VisuMZ['CoreEngine'][_0x1df930('0x453')][_0x1df930('0x105')][_0x3dbfdb])){if('sAadh'===_0x1df930('0x569')){var _0x70cb90=Number(RegExp['$1'])/0x64;_0x41f8c3*=_0x70cb90;}else{function _0x4796b7(){const _0x4c19f8=_0x1df930;_0x4a5848+=_0x18444f[_0x4c19f8('0x3b')]['lineHeight']();}}}if(_0x5365a6[_0x1df930('0x1e5')][_0x1df930('0x1a7')](VisuMZ[_0x1df930('0x32b')][_0x1df930('0x453')][_0x1df930('0x2c9')][_0x3dbfdb])){if(_0x1df930('0x151')===_0x1df930('0x151')){var _0x70cb90=Number(RegExp['$1']);_0x41f8c3*=_0x70cb90;}else{function _0xc77970(){const _0x3ab332=_0x1df930;this[_0x3ab332('0x260')]['x']=-0x1*(this[_0x3ab332('0x260')]['width']+this[_0x3ab332('0x330')][_0x3ab332('0x466')]+0x8),this[_0x3ab332('0x330')]['x']=-0x1*(this['_pagedownButton'][_0x3ab332('0x466')]+0x4);}}}if(_0x5365a6[_0x1df930('0x1e5')]['match'](VisuMZ[_0x1df930('0x32b')]['RegExp'][_0x1df930('0x426')][_0x3dbfdb])){var _0x5b5eee=String(RegExp['$1']);try{_0x41f8c3*=eval(_0x5b5eee);}catch(_0x36ff8f){if($gameTemp[_0x1df930('0x87')]())console[_0x1df930('0xad')](_0x36ff8f);}}return _0x41f8c3;};return this['traitObjects']()[_0x28a69f('0x1d7')](_0x12fdc4,0x1);},Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x50c')]=function(_0x317329){const _0x9704f9=_0x3d8782,_0x54f6f4=(_0x54006d,_0x192f94)=>{const _0x1341fb=_0x2633;if(_0x1341fb('0x9c')==='wLfcc'){if(!_0x192f94)return _0x54006d;if(_0x192f94[_0x1341fb('0x1e5')][_0x1341fb('0x1a7')](VisuMZ[_0x1341fb('0x32b')][_0x1341fb('0x453')]['xparamFlat1'][_0x317329])){if(_0x1341fb('0x1bc')===_0x1341fb('0x1bc')){var _0x1cb813=Number(RegExp['$1'])/0x64;_0x54006d+=_0x1cb813;}else{function _0x1ce851(){const _0x499f52=_0x1341fb,_0x4af750=this[_0x499f52('0x1df')]();this['_commandWindow']=new _0x4f9bdb(_0x4af750),this[_0x499f52('0x1dd')][_0x499f52('0x12e')](_0x499f52('0x294'),this[_0x499f52('0x1ca')]['bind'](this)),this[_0x499f52('0x5b4')](this['_commandWindow']),this[_0x499f52('0x1dd')][_0x499f52('0x4a3')](_0x3edd13[_0x499f52('0x12')][_0x499f52('0x301')]);}}}if(_0x192f94['note']['match'](VisuMZ[_0x1341fb('0x32b')][_0x1341fb('0x453')][_0x1341fb('0x486')][_0x317329])){if(_0x1341fb('0x44')!==_0x1341fb('0x44')){function _0xf50191(){const _0x12d0d9=_0x1341fb;for(_0x56d4ff of _0x25c4c5[_0x12d0d9('0x29c')]()){_0x26a841[_0x12d0d9('0x20b')]();}}}else{var _0x1cb813=Number(RegExp['$1']);_0x54006d+=_0x1cb813;}}if(_0x192f94['note'][_0x1341fb('0x1a7')](VisuMZ['CoreEngine']['RegExp'][_0x1341fb('0x11f')][_0x317329])){var _0x30b288=String(RegExp['$1']);try{_0x54006d+=eval(_0x30b288);}catch(_0x3463ae){if($gameTemp[_0x1341fb('0x87')]())console[_0x1341fb('0xad')](_0x3463ae);}}return _0x54006d;}else{function _0x105982(){const _0x950008=_0x1341fb;_0x342c63['prototype'][_0x950008('0x460')][_0x950008('0x1c9')](this),this[_0x950008('0x440')]=_0x43eb45,this[_0x950008('0x4f2')]=null,this['setup']();}}};return this[_0x9704f9('0x5bc')]()[_0x9704f9('0x1d7')](_0x54f6f4,0x0);},Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x488')]=function(_0x1cca9e){const _0x7d41b5=_0x3d8782;let _0x45d7b5=_0x7d41b5('0x488')+_0x1cca9e+_0x7d41b5('0x512');if(this[_0x7d41b5('0x328')](_0x45d7b5))return this[_0x7d41b5('0x283')][_0x45d7b5];return this[_0x7d41b5('0x283')][_0x45d7b5]=VisuMZ[_0x7d41b5('0x32b')][_0x7d41b5('0x5ab')]['Param'][_0x7d41b5('0x21c')][_0x7d41b5('0x1c9')](this,_0x1cca9e),this[_0x7d41b5('0x283')][_0x45d7b5];},Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x282')]=function(_0xa54e7b){const _0x4a953c=_0x3d8782,_0x4a7ffd=(_0x2d8b01,_0x3d4af0)=>{const _0x5321e9=_0x2633;if(!_0x3d4af0)return _0x2d8b01;if(_0x3d4af0['note'][_0x5321e9('0x1a7')](VisuMZ[_0x5321e9('0x32b')][_0x5321e9('0x453')][_0x5321e9('0x124')][_0xa54e7b])){var _0x550db6=Number(RegExp['$1'])/0x64;_0x2d8b01+=_0x550db6;}if(_0x3d4af0[_0x5321e9('0x1e5')][_0x5321e9('0x1a7')](VisuMZ[_0x5321e9('0x32b')][_0x5321e9('0x453')]['sparamPlus2'][_0xa54e7b])){var _0x550db6=Number(RegExp['$1']);_0x2d8b01+=_0x550db6;}if(_0x3d4af0[_0x5321e9('0x1e5')][_0x5321e9('0x1a7')](VisuMZ[_0x5321e9('0x32b')]['RegExp'][_0x5321e9('0x3f')][_0xa54e7b])){var _0x35e5e8=String(RegExp['$1']);try{if(_0x5321e9('0x3a6')===_0x5321e9('0x3a6'))_0x2d8b01+=eval(_0x35e5e8);else{function _0x1b2e0e(){_0x25b2b3*=_0x4d1313(_0x839c83);}}}catch(_0x360ca8){if(_0x5321e9('0x194')===_0x5321e9('0x47')){function _0x2aa39a(){const _0x411333=_0x5321e9;_0x36383c['CoreEngine'][_0x411333('0xc0')][_0x411333('0x1c9')](this,_0x39414b),this[_0x411333('0x571')](_0x10376c);}}else{if($gameTemp[_0x5321e9('0x87')]())console[_0x5321e9('0xad')](_0x360ca8);}}}return _0x2d8b01;};return this[_0x4a953c('0x5bc')]()['reduce'](_0x4a7ffd,0x0);},Game_BattlerBase['prototype'][_0x3d8782('0x4db')]=function(_0x503555){const _0x59ffda=_0x3d8782,_0x47f546=(_0x4b36b9,_0x7fe532)=>{const _0x38244d=_0x2633;if(!_0x7fe532)return _0x4b36b9;if(_0x7fe532[_0x38244d('0x1e5')][_0x38244d('0x1a7')](VisuMZ['CoreEngine'][_0x38244d('0x453')]['sparamRate1'][_0x503555])){if(_0x38244d('0x591')!=='iGKFR'){var _0x2b548d=Number(RegExp['$1'])/0x64;_0x4b36b9*=_0x2b548d;}else{function _0x430de3(){const _0x1066f6=_0x38244d;return _0x598a25[_0x1066f6('0x12')][_0x1066f6('0x42a')][_0x1066f6('0x1c9')](this);}}}if(_0x7fe532['note']['match'](VisuMZ['CoreEngine']['RegExp']['sparamRate2'][_0x503555])){var _0x2b548d=Number(RegExp['$1']);_0x4b36b9*=_0x2b548d;}if(_0x7fe532[_0x38244d('0x1e5')]['match'](VisuMZ[_0x38244d('0x32b')][_0x38244d('0x453')][_0x38244d('0x16e')][_0x503555])){var _0x2e5c1f=String(RegExp['$1']);try{_0x4b36b9*=eval(_0x2e5c1f);}catch(_0x55fd4e){if('RXBOR'!==_0x38244d('0x111')){function _0x150e4f(){const _0x4d960b=_0x38244d;this[_0x4d960b('0x1d4')]=_0x31e8b7[_0x4d960b('0x32b')][_0x4d960b('0x5ab')]['Window']['BackOpacity'];}}else{if($gameTemp[_0x38244d('0x87')]())console['log'](_0x55fd4e);}}}return _0x4b36b9;};return this[_0x59ffda('0x5bc')]()[_0x59ffda('0x1d7')](_0x47f546,0x1);},Game_BattlerBase[_0x3d8782('0x3b')][_0x3d8782('0x444')]=function(_0x2caf59){const _0x14e7e8=_0x3d8782,_0x40b48=(_0x42c90f,_0x2f60c3)=>{const _0x342662=_0x2633;if(!_0x2f60c3)return _0x42c90f;if(_0x2f60c3[_0x342662('0x1e5')][_0x342662('0x1a7')](VisuMZ[_0x342662('0x32b')][_0x342662('0x453')][_0x342662('0x24a')][_0x2caf59])){if('xLwiL'===_0x342662('0x2f2')){function _0x462846(){const _0x7975a2=_0x342662;this[_0x7975a2('0x361')](_0x5c11fe);}}else{var _0x482aaa=Number(RegExp['$1'])/0x64;_0x42c90f+=_0x482aaa;}}if(_0x2f60c3[_0x342662('0x1e5')][_0x342662('0x1a7')](VisuMZ[_0x342662('0x32b')][_0x342662('0x453')][_0x342662('0x2c8')][_0x2caf59])){if(_0x342662('0x46f')!==_0x342662('0x311')){var _0x482aaa=Number(RegExp['$1']);_0x42c90f+=_0x482aaa;}else{function _0x194733(){const _0xb269e9=_0x342662;_0x45a402['CoreEngine'][_0xb269e9('0x5ab')][_0xb269e9('0x59e')][_0xb269e9('0x595')]&&(this[_0xb269e9('0x597')]=![]);}}}if(_0x2f60c3['note'][_0x342662('0x1a7')](VisuMZ['CoreEngine'][_0x342662('0x453')][_0x342662('0x35a')][_0x2caf59])){var _0x50cd47=String(RegExp['$1']);try{_0x42c90f+=eval(_0x50cd47);}catch(_0x20f060){if($gameTemp[_0x342662('0x87')]())console[_0x342662('0xad')](_0x20f060);}}return _0x42c90f;};return this['traitObjects']()[_0x14e7e8('0x1d7')](_0x40b48,0x0);},Game_BattlerBase['prototype'][_0x3d8782('0x445')]=function(_0x411ed6){const _0x125313=_0x3d8782;let _0x1cc2d8='sparam'+_0x411ed6+_0x125313('0x512');if(this['checkCacheKey'](_0x1cc2d8))return this[_0x125313('0x283')][_0x1cc2d8];return this['_cache'][_0x1cc2d8]=VisuMZ[_0x125313('0x32b')][_0x125313('0x5ab')][_0x125313('0x58')][_0x125313('0x27d')][_0x125313('0x1c9')](this,_0x411ed6),this[_0x125313('0x283')][_0x1cc2d8];},Game_BattlerBase[_0x3d8782('0x3b')]['paramValueByName']=function(_0x4c9a19,_0x5381ce){const _0xc81f78=_0x3d8782;if(typeof paramId===_0xc81f78('0x3eb'))return this['param'](_0x4c9a19);_0x4c9a19=String(_0x4c9a19||'')[_0xc81f78('0x28')]();if(_0x4c9a19==='MAXHP')return this[_0xc81f78('0x2ca')](0x0);if(_0x4c9a19===_0xc81f78('0x171'))return this[_0xc81f78('0x2ca')](0x1);if(_0x4c9a19===_0xc81f78('0x2b2'))return this['param'](0x2);if(_0x4c9a19===_0xc81f78('0x21f'))return this['param'](0x3);if(_0x4c9a19===_0xc81f78('0x27f'))return this['param'](0x4);if(_0x4c9a19==='MDF')return this[_0xc81f78('0x2ca')](0x5);if(_0x4c9a19===_0xc81f78('0x25d'))return this['param'](0x6);if(_0x4c9a19===_0xc81f78('0x76'))return this['param'](0x7);if(_0x4c9a19===_0xc81f78('0x33e'))return _0x5381ce?String(Math['round'](this[_0xc81f78('0x488')](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x4c9a19===_0xc81f78('0x513'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x488')](0x1)*0x64))+'%':this[_0xc81f78('0x488')](0x1);if(_0x4c9a19==='CRI')return _0x5381ce?String(Math[_0xc81f78('0x226')](this['xparam'](0x2)*0x64))+'%':this[_0xc81f78('0x488')](0x2);if(_0x4c9a19===_0xc81f78('0x3e'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this['xparam'](0x3)*0x64))+'%':this[_0xc81f78('0x488')](0x3);if(_0x4c9a19===_0xc81f78('0x410'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x488')](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x4c9a19===_0xc81f78('0x59b'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x488')](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x4c9a19==='CNT')return _0x5381ce?String(Math['round'](this[_0xc81f78('0x488')](0x6)*0x64))+'%':this[_0xc81f78('0x488')](0x6);if(_0x4c9a19===_0xc81f78('0xa4'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x488')](0x7)*0x64))+'%':this[_0xc81f78('0x488')](0x7);if(_0x4c9a19==='MRG')return _0x5381ce?String(Math['round'](this['xparam'](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x4c9a19===_0xc81f78('0x28b'))return _0x5381ce?String(Math['round'](this[_0xc81f78('0x488')](0x9)*0x64))+'%':this[_0xc81f78('0x488')](0x9);if(_0x4c9a19===_0xc81f78('0x5a3'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x0)*0x64))+'%':this[_0xc81f78('0x445')](0x0);if(_0x4c9a19===_0xc81f78('0x127'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x1)*0x64))+'%':this[_0xc81f78('0x445')](0x1);if(_0x4c9a19==='REC')return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x2)*0x64))+'%':this[_0xc81f78('0x445')](0x2);if(_0x4c9a19===_0xc81f78('0x316'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x3)*0x64))+'%':this[_0xc81f78('0x445')](0x3);if(_0x4c9a19===_0xc81f78('0x110'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x4)*0x64))+'%':this[_0xc81f78('0x445')](0x4);if(_0x4c9a19==='TCR')return _0x5381ce?String(Math['round'](this['sparam'](0x5)*0x64))+'%':this[_0xc81f78('0x445')](0x5);if(_0x4c9a19===_0xc81f78('0x425'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x6)*0x64))+'%':this[_0xc81f78('0x445')](0x6);if(_0x4c9a19===_0xc81f78('0x434'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x4c9a19===_0xc81f78('0x59c'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x8)*0x64))+'%':this[_0xc81f78('0x445')](0x8);if(_0x4c9a19===_0xc81f78('0x2fd'))return _0x5381ce?String(Math[_0xc81f78('0x226')](this[_0xc81f78('0x445')](0x9)*0x64))+'%':this[_0xc81f78('0x445')](0x9);if(VisuMZ[_0xc81f78('0x32b')]['CustomParamAbb'][_0x4c9a19]){const _0x5b779a=VisuMZ[_0xc81f78('0x32b')]['CustomParamAbb'][_0x4c9a19],_0x570386=this[_0x5b779a];if(VisuMZ['CoreEngine'][_0xc81f78('0x2e0')][_0x4c9a19]===_0xc81f78('0x22'))return _0x570386;else{if(_0xc81f78('0x436')!==_0xc81f78('0x436')){function _0xdcf1e9(){const _0x56d41a=_0xc81f78;if(_0x215b5a[_0x56d41a('0x87')]())_0x41d727[_0x56d41a('0xad')](_0x56d41a('0x3ce')['format'](_0x2ccf3f));}}else return _0x5381ce?String(Math['round'](_0x570386*0x64))+'%':_0x570386;}}return'';},Game_BattlerBase['prototype'][_0x3d8782('0x1e1')]=function(){const _0x34743f=_0x3d8782;return this[_0x34743f('0x48c')]()&&this[_0x34743f('0xea')]<this[_0x34743f('0x5f4')]*VisuMZ[_0x34743f('0x32b')][_0x34743f('0x5ab')]['Param'][_0x34743f('0x232')];},Game_Battler[_0x3d8782('0x3b')][_0x3d8782('0x2f3')]=function(){const _0x191cd8=_0x3d8782;SoundManager[_0x191cd8('0xc4')](),this[_0x191cd8('0x366')](_0x191cd8('0x148'));},VisuMZ['CoreEngine']['Game_Actor_paramBase']=Game_Actor[_0x3d8782('0x3b')]['paramBase'],Game_Actor[_0x3d8782('0x3b')]['paramBase']=function(_0x3689d9){const _0x8fdedb=_0x3d8782;if(this[_0x8fdedb('0x502')]>0x63)return this['paramBaseAboveLevel99'](_0x3689d9);return VisuMZ[_0x8fdedb('0x32b')][_0x8fdedb('0x8e')]['call'](this,_0x3689d9);},Game_Actor[_0x3d8782('0x3b')][_0x3d8782('0x225')]=function(_0x52cd67){const _0x45d0d7=_0x3d8782,_0x512c44=this[_0x45d0d7('0x174')]()['params'][_0x52cd67][0x63],_0x7c2e81=this[_0x45d0d7('0x174')]()[_0x45d0d7('0x69')][_0x52cd67][0x62];return _0x512c44+(_0x512c44-_0x7c2e81)*(this[_0x45d0d7('0x502')]-0x63);},VisuMZ['CoreEngine']['Game_Actor_changeClass']=Game_Actor['prototype']['changeClass'],Game_Actor[_0x3d8782('0x3b')][_0x3d8782('0x3d3')]=function(_0x45a510,_0x5b0190){const _0x545a59=_0x3d8782;$gameTemp[_0x545a59('0x594')]=!![],VisuMZ['CoreEngine'][_0x545a59('0x1e9')][_0x545a59('0x1c9')](this,_0x45a510,_0x5b0190),$gameTemp[_0x545a59('0x594')]=undefined;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x238')]=Game_Actor[_0x3d8782('0x3b')][_0x3d8782('0x265')],Game_Actor[_0x3d8782('0x3b')][_0x3d8782('0x265')]=function(){const _0x229bab=_0x3d8782;VisuMZ['CoreEngine'][_0x229bab('0x238')]['call'](this);if(!$gameTemp['_changingClass'])this[_0x229bab('0xf1')]();},Game_Actor['prototype'][_0x3d8782('0xf1')]=function(){const _0x46d438=_0x3d8782;this[_0x46d438('0x283')]={};if(VisuMZ['CoreEngine'][_0x46d438('0x5ab')]['QoL'][_0x46d438('0x1aa')])this[_0x46d438('0xea')]=this[_0x46d438('0x5f4')];if(VisuMZ['CoreEngine'][_0x46d438('0x5ab')][_0x46d438('0x59e')][_0x46d438('0x102')])this[_0x46d438('0x170')]=this['mmp'];},Game_Actor[_0x3d8782('0x3b')][_0x3d8782('0xd5')]=function(){const _0x599e66=_0x3d8782;if(this[_0x599e66('0x46e')]())return 0x1;const _0x48cc13=this[_0x599e66('0x57f')]()-this[_0x599e66('0x3a')](),_0x546ce4=this[_0x599e66('0xf0')]()-this[_0x599e66('0x3a')]();return(_0x546ce4/_0x48cc13)[_0x599e66('0x459')](0x0,0x1);},Game_Actor['prototype'][_0x3d8782('0x5bc')]=function(){const _0x78fb90=_0x3d8782,_0x27f7de=Game_Battler[_0x78fb90('0x3b')]['traitObjects'][_0x78fb90('0x1c9')](this);for(const _0xd6572e of this[_0x78fb90('0x409')]()){if(_0xd6572e){if(_0x78fb90('0x3dc')==='roEQl'){function _0x35d455(){const _0x56933d=_0x78fb90;for(const _0x5194c7 of _0x47d43f[_0x56933d('0x2da')]){if(_0x5194c7[_0x56933d('0x388')][_0x56933d('0x1c9')](this)){const _0x3abac5=_0x5194c7[_0x56933d('0x43e')];let _0xce9cd1=_0x5194c7[_0x56933d('0xa3')];if(['',_0x56933d('0x43a')]['includes'](_0xce9cd1))_0xce9cd1=_0x5194c7['TextJS']['call'](this);const _0x3f2197=_0x5194c7[_0x56933d('0x577')][_0x56933d('0x1c9')](this),_0x390335=_0x5194c7[_0x56933d('0x317')]['call'](this);this[_0x56933d('0x25c')](_0xce9cd1,_0x3abac5,_0x3f2197,_0x390335),this[_0x56933d('0x12e')](_0x3abac5,_0x5194c7['CallHandlerJS']['bind'](this,_0x390335));}}}}else _0x27f7de[_0x78fb90('0x2b3')](_0xd6572e);}}return _0x27f7de[_0x78fb90('0x2b3')](this[_0x78fb90('0x174')](),this[_0x78fb90('0x593')]()),_0x27f7de;},Object[_0x3d8782('0x3d0')](Game_Enemy[_0x3d8782('0x3b')],_0x3d8782('0x502'),{'get':function(){const _0x47f8bf=_0x3d8782;return this[_0x47f8bf('0x514')]();},'configurable':!![]}),Game_Enemy[_0x3d8782('0x3b')]['getLevel']=function(){const _0x3c52e0=_0x3d8782;return this[_0x3c52e0('0x41e')]()[_0x3c52e0('0x502')];},Game_Enemy[_0x3d8782('0x3b')]['moveRelativeToResolutionChange']=function(){const _0x36e3bf=_0x3d8782;!this[_0x36e3bf('0x55f')]&&(this['_screenY']+=Math[_0x36e3bf('0x226')]((Graphics[_0x36e3bf('0x42d')]-0x270)/0x2),this[_0x36e3bf('0x2cd')]-=Math[_0x36e3bf('0x14a')]((Graphics[_0x36e3bf('0x42d')]-Graphics['boxHeight'])/0x2),$gameSystem['isSideView']()?this[_0x36e3bf('0x3fb')]-=Math[_0x36e3bf('0x14a')]((Graphics[_0x36e3bf('0x466')]-Graphics[_0x36e3bf('0x9d')])/0x2):this['_screenX']+=Math['round']((Graphics['boxWidth']-0x330)/0x2)),this[_0x36e3bf('0x55f')]=!![];},Game_Party[_0x3d8782('0x3b')][_0x3d8782('0x1a3')]=function(){const _0x4f0fed=_0x3d8782;return VisuMZ[_0x4f0fed('0x32b')][_0x4f0fed('0x5ab')][_0x4f0fed('0x126')]['GoldMax'];},VisuMZ[_0x3d8782('0x32b')]['Game_Party_consumeItem']=Game_Party[_0x3d8782('0x3b')][_0x3d8782('0x1f1')],Game_Party['prototype'][_0x3d8782('0x1f1')]=function(_0xc89eae){const _0x15da65=_0x3d8782;if(VisuMZ[_0x15da65('0x32b')][_0x15da65('0x5ab')][_0x15da65('0x59e')][_0x15da65('0x16c')]&&DataManager[_0x15da65('0x121')](_0xc89eae))return;VisuMZ[_0x15da65('0x32b')][_0x15da65('0x2a4')][_0x15da65('0x1c9')](this,_0xc89eae);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x92')]=Game_Troop[_0x3d8782('0x3b')]['setup'],Game_Troop[_0x3d8782('0x3b')][_0x3d8782('0x2a5')]=function(_0x3c2a97){const _0x957f28=_0x3d8782;$gameTemp[_0x957f28('0x5f0')](),$gameTemp[_0x957f28('0x348')](_0x3c2a97),VisuMZ[_0x957f28('0x32b')][_0x957f28('0x92')]['call'](this,_0x3c2a97);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0xc0')]=Game_Map[_0x3d8782('0x3b')]['setup'],Game_Map[_0x3d8782('0x3b')]['setup']=function(_0x52565e){const _0x4e4240=_0x3d8782;VisuMZ[_0x4e4240('0x32b')][_0x4e4240('0xc0')]['call'](this,_0x52565e),this[_0x4e4240('0x571')](_0x52565e);},Game_Map[_0x3d8782('0x3b')][_0x3d8782('0x571')]=function(){const _0x1a21df=_0x3d8782;this['_hideTileShadows']=VisuMZ[_0x1a21df('0x32b')][_0x1a21df('0x5ab')][_0x1a21df('0x59e')][_0x1a21df('0x4bb')]||![];if($dataMap&&$dataMap[_0x1a21df('0x1e5')]){if(_0x1a21df('0x52b')==='ZaPTc'){if($dataMap[_0x1a21df('0x1e5')][_0x1a21df('0x1a7')](/<SHOW TILE SHADOWS>/i))this[_0x1a21df('0x443')]=![];if($dataMap[_0x1a21df('0x1e5')]['match'](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}else{function _0x391868(){const _0x49b9f4=_0x1a21df;var _0x1e6278=_0x56829e(_0x49b9f4('0x5f'))[_0x49b9f4('0x83')]['get']();_0x5aba0c[_0x49b9f4('0x210')]();if(_0xd94ed1)_0x2564d8(_0x1e6278[_0x49b9f4('0x578')][_0x49b9f4('0x3a0')](_0x1e6278),0x190);}}}},Game_Map[_0x3d8782('0x3b')][_0x3d8782('0x5dd')]=function(){const _0x2d0447=_0x3d8782;if(this[_0x2d0447('0x443')]===undefined)this[_0x2d0447('0x571')]();return this['_hideTileShadows'];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x3ff')]=Game_Character[_0x3d8782('0x3b')]['processMoveCommand'],Game_Character[_0x3d8782('0x3b')][_0x3d8782('0x10f')]=function(_0xf01ab8){const _0x3b1698=_0x3d8782;try{VisuMZ[_0x3b1698('0x32b')][_0x3b1698('0x3ff')][_0x3b1698('0x1c9')](this,_0xf01ab8);}catch(_0x29b1c8){if(_0x3b1698('0x46a')!==_0x3b1698('0x46a')){function _0x4d8397(){const _0x28f9d7=_0x3b1698,_0x5e4152=_0x7ac022[_0x28f9d7('0x63')]()[_0x28f9d7('0x31b')](/\\I\[(\d+)\]/gi,'');this[_0x28f9d7('0x2e3')](_0x59e961[_0x28f9d7('0x63')](),_0x1ece97,_0x304113,_0x40d871);}}else{if($gameTemp[_0x3b1698('0x87')]())console[_0x3b1698('0xad')](_0x29b1c8);}}},Game_Player['prototype'][_0x3d8782('0x355')]=function(){const _0x3bb375=_0x3d8782,_0x330d5e=$gameMap['encounterStep']();this[_0x3bb375('0x114')]=Math[_0x3bb375('0x463')](_0x330d5e)+Math[_0x3bb375('0x463')](_0x330d5e)+this[_0x3bb375('0x1c3')]();},Game_Player[_0x3d8782('0x3b')][_0x3d8782('0x1c3')]=function(){const _0x49f2ae=_0x3d8782;if($dataMap&&$dataMap[_0x49f2ae('0x1e5')]&&$dataMap[_0x49f2ae('0x1e5')]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if('OKpAO'===_0x49f2ae('0x3db'))return Number(RegExp['$1']);else{function _0x521653(){const _0x2362c8=_0x49f2ae;return this[_0x2362c8('0x382')]()?this[_0x2362c8('0x473')]():0x0;}}}else return VisuMZ[_0x49f2ae('0x32b')][_0x49f2ae('0x5ab')]['QoL']['EncounterRateMinimum'];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x3ae')]=Game_Event[_0x3d8782('0x3b')]['isCollidedWithEvents'],Game_Event[_0x3d8782('0x3b')][_0x3d8782('0x2d6')]=function(_0x52c93a,_0x16e6fd){const _0x40ea23=_0x3d8782;if(this[_0x40ea23('0x4b6')]())return this[_0x40ea23('0x12b')](_0x52c93a,_0x16e6fd);else{if(_0x40ea23('0x271')===_0x40ea23('0x271'))return VisuMZ[_0x40ea23('0x32b')]['Game_Event_isCollidedWithEvents']['call'](this,_0x52c93a,_0x16e6fd);else{function _0x4f9995(){const _0x2d95ce=_0x40ea23,_0x106b56=_0x593ae1[_0x2d95ce('0x174')]()[_0x2d95ce('0x439')][_0x2d95ce('0x31b')](/\\I\[(\d+)\]/gi,'');this[_0x2d95ce('0x2e3')](_0x106b56,_0x9f8242,_0x44e38e,_0x3f57a1);}}}},Game_Event[_0x3d8782('0x3b')]['isSmartEventCollisionOn']=function(){const _0x3d67f9=_0x3d8782;return VisuMZ[_0x3d67f9('0x32b')]['Settings'][_0x3d67f9('0x59e')][_0x3d67f9('0x2b6')];},Game_Event[_0x3d8782('0x3b')][_0x3d8782('0x12b')]=function(_0x3e24e0,_0x174869){const _0x4a1f3a=_0x3d8782;if(!this[_0x4a1f3a('0x4a4')]())return![];else{if('hRHSb'==='RTyQC'){function _0x3f6747(){const _0x1a12e3=_0x4a1f3a;this[_0x1a12e3('0x458')](_0x47ac8d);}}else{const _0x416a15=$gameMap[_0x4a1f3a('0x4a1')](_0x3e24e0,_0x174869)['filter'](_0x5179f0=>_0x5179f0['isNormalPriority']());return _0x416a15[_0x4a1f3a('0x247')]>0x0;}}},VisuMZ['CoreEngine']['Game_Interpreter_command111']=Game_Interpreter[_0x3d8782('0x3b')][_0x3d8782('0x4ce')],Game_Interpreter[_0x3d8782('0x3b')][_0x3d8782('0x4ce')]=function(_0x1311fb){const _0x908102=_0x3d8782;try{VisuMZ[_0x908102('0x32b')]['Game_Interpreter_command111'][_0x908102('0x1c9')](this,_0x1311fb);}catch(_0x3d2239){if($gameTemp[_0x908102('0x87')]()){if(_0x908102('0x3c1')===_0x908102('0x3c1'))console[_0x908102('0xad')](_0x908102('0x5d2')),console[_0x908102('0xad')](_0x3d2239);else{function _0x111a13(){const _0x592a8b=_0x908102;if(this['_coreEngineShakeStyle']===_0x56d493)this[_0x592a8b('0x1a9')]();this[_0x592a8b('0x250')]=_0x360339[_0x592a8b('0x200')]()[_0x592a8b('0x4f4')]();}}}this['skipBranch']();}return!![];},VisuMZ['CoreEngine'][_0x3d8782('0x1b7')]=Game_Interpreter['prototype'][_0x3d8782('0x34d')],Game_Interpreter[_0x3d8782('0x3b')]['command122']=function(_0x2ab87b){const _0x3f43b1=_0x3d8782;try{if(_0x3f43b1('0x48f')!==_0x3f43b1('0xcc'))VisuMZ['CoreEngine'][_0x3f43b1('0x1b7')][_0x3f43b1('0x1c9')](this,_0x2ab87b);else{function _0x35f638(){const _0x38dc44=_0x3f43b1;return _0x121d15[_0x38dc44('0x32b')][_0x38dc44('0x551')][_0x595712]||0x0;}}}catch(_0x17e020){$gameTemp[_0x3f43b1('0x87')]()&&(console['log'](_0x3f43b1('0x213')),console[_0x3f43b1('0xad')](_0x17e020));}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter[_0x3d8782('0x3b')][_0x3d8782('0x12a')],Game_Interpreter[_0x3d8782('0x3b')][_0x3d8782('0x12a')]=function(){const _0x4a8ce0=_0x3d8782;try{VisuMZ[_0x4a8ce0('0x32b')][_0x4a8ce0('0x89')][_0x4a8ce0('0x1c9')](this);}catch(_0x47c9b8){if(_0x4a8ce0('0x136')===_0x4a8ce0('0x136')){if($gameTemp[_0x4a8ce0('0x87')]()){if(_0x4a8ce0('0x3c4')==='zUPud')console[_0x4a8ce0('0xad')]('Script\x20Call\x20Error'),console['log'](_0x47c9b8);else{function _0x179733(){const _0x2bb89e=_0x4a8ce0;_0x2de69b[_0x2bb89e('0x32b')]['Sprite_Button_initialize'][_0x2bb89e('0x1c9')](this,_0x4da156),this['initButtonHidden']();}}}}else{function _0x1d0cdc(){const _0x566737=_0x4a8ce0;this[_0x566737('0x4a8')]['y']=_0x4fa6bd[_0x566737('0x32c')]-this[_0x566737('0x1c4')]();}}}return!![];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x494')]=Game_Interpreter['prototype'][_0x3d8782('0x5c')],Game_Interpreter[_0x3d8782('0x3b')][_0x3d8782('0x5c')]=function(_0x1b26bf){const _0x3b4b79=_0x3d8782;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x3b4b79('0x32b')]['Game_Interpreter_PluginCommand']['call'](this,_0x1b26bf);},Scene_Base[_0x3d8782('0x3b')]['fadeSpeed']=function(){const _0x29e371=_0x3d8782;return VisuMZ[_0x29e371('0x32b')][_0x29e371('0x5ab')]['UI'][_0x29e371('0xf3')];},Scene_Base[_0x3d8782('0x3b')]['isBottomHelpMode']=function(){const _0x4f7888=_0x3d8782;return VisuMZ[_0x4f7888('0x32b')]['Settings']['UI'][_0x4f7888('0x8d')];},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x86')]=function(){const _0x223e43=_0x3d8782;return VisuMZ[_0x223e43('0x32b')][_0x223e43('0x5ab')]['UI'][_0x223e43('0x137')];},Scene_Base[_0x3d8782('0x3b')]['isRightInputMode']=function(){const _0x2d3210=_0x3d8782;return VisuMZ[_0x2d3210('0x32b')][_0x2d3210('0x5ab')]['UI']['RightMenus'];},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x452')]=function(){const _0x324a99=_0x3d8782;return VisuMZ[_0x324a99('0x32b')][_0x324a99('0x5ab')]['UI'][_0x324a99('0x547')];},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x1c4')]=function(){const _0x4ee1d5=_0x3d8782;return VisuMZ[_0x4ee1d5('0x32b')][_0x4ee1d5('0x5ab')]['UI']['ButtonHeight'];},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0xe8')]=function(){const _0x3c5f30=_0x3d8782;return VisuMZ[_0x3c5f30('0x32b')][_0x3c5f30('0x5ab')]['Window'][_0x3c5f30('0x155')];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0xa8')]=Scene_Base[_0x3d8782('0x3b')]['createWindowLayer'],Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x17c')]=function(){const _0x785eb6=_0x3d8782;VisuMZ[_0x785eb6('0x32b')]['Scene_Base_createWindowLayer'][_0x785eb6('0x1c9')](this),this[_0x785eb6('0xd1')]();},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0xd1')]=function(){},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x4e')]=function(){const _0x5d38b7=_0x3d8782;return TextManager[_0x5d38b7('0x5e5')]('pageup','pagedown');},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x1ee')]=function(){const _0x134d85=_0x3d8782;return TextManager[_0x134d85('0x284')](_0x134d85('0x4a6'));},Scene_Base[_0x3d8782('0x3b')]['buttonAssistKey3']=function(){const _0x132a3a=_0x3d8782;return TextManager[_0x132a3a('0x284')]('shift');},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x58e')]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x167')]=function(){const _0x2d3f6e=_0x3d8782;return TextManager[_0x2d3f6e('0x284')](_0x2d3f6e('0x294'));},Scene_Base['prototype'][_0x3d8782('0x36d')]=function(){const _0x478ba3=_0x3d8782;return this['_pageupButton']&&this['_pageupButton'][_0x478ba3('0x3d9')]?TextManager[_0x478ba3('0x1ff')]:'';},Scene_Base[_0x3d8782('0x3b')]['buttonAssistText2']=function(){return'';},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x377')]=function(){return'';},Scene_Base[_0x3d8782('0x3b')]['buttonAssistText4']=function(){const _0x3685a1=_0x3d8782;return TextManager[_0x3685a1('0x38e')];},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x483')]=function(){const _0x34fa2c=_0x3d8782;return TextManager[_0x34fa2c('0x3e2')];},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x16')]=function(){return 0x0;},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x249')]=function(){return 0x0;},Scene_Base['prototype'][_0x3d8782('0x491')]=function(){return 0x0;},Scene_Base[_0x3d8782('0x3b')][_0x3d8782('0x9f')]=function(){return 0x0;},Scene_Base['prototype'][_0x3d8782('0xa5')]=function(){return 0x0;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x4cd')]=Scene_Boot['prototype'][_0x3d8782('0x54')],Scene_Boot['prototype'][_0x3d8782('0x54')]=function(){const _0x3f666c=_0x3d8782;VisuMZ[_0x3f666c('0x32b')]['Scene_Boot_loadSystemImages']['call'](this),this[_0x3f666c('0x3d1')]();},Scene_Boot['prototype'][_0x3d8782('0x3d1')]=function(){const _0x358c1a=_0x3d8782,_0x3cedb3=[_0x358c1a('0xbe'),_0x358c1a('0x590'),_0x358c1a('0x134'),_0x358c1a('0x539'),'enemies','faces',_0x358c1a('0x244'),'pictures',_0x358c1a('0xde'),_0x358c1a('0x197'),_0x358c1a('0x0'),'tilesets','titles1',_0x358c1a('0x12c')];for(const _0x11e5a2 of _0x3cedb3){const _0x580ed7=VisuMZ[_0x358c1a('0x32b')]['Settings'][_0x358c1a('0x517')][_0x11e5a2],_0x557465=_0x358c1a('0x3e6')[_0x358c1a('0x2a2')](_0x11e5a2);for(const _0x7260ff of _0x580ed7){if(_0x358c1a('0xff')===_0x358c1a('0xff'))ImageManager['loadBitmap'](_0x557465,_0x7260ff);else{function _0xe6c0a0(){const _0x27c2f4=_0x358c1a;_0x515267[_0x27c2f4('0x32b')][_0x27c2f4('0x5ab')][_0x27c2f4('0x558')][_0x27c2f4('0x1a4')][_0x27c2f4('0x10d')]['call'](this);}}}}},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x387')]=Scene_Boot[_0x3d8782('0x3b')][_0x3d8782('0x1e3')],Scene_Boot[_0x3d8782('0x3b')][_0x3d8782('0x1e3')]=function(){const _0x26048b=_0x3d8782;Utils[_0x26048b('0x2a6')]('test')&&VisuMZ[_0x26048b('0x32b')]['Settings']['QoL'][_0x26048b('0x5b7')]?this[_0x26048b('0x4e3')]():VisuMZ[_0x26048b('0x32b')][_0x26048b('0x387')][_0x26048b('0x1c9')](this);},Scene_Boot[_0x3d8782('0x3b')][_0x3d8782('0x4e3')]=function(){const _0x259c77=_0x3d8782;DataManager[_0x259c77('0x3bd')](),SceneManager[_0x259c77('0x518')](Scene_Map);},Scene_Boot['prototype'][_0x3d8782('0x2dc')]=function(){const _0x27997a=_0x3d8782,_0x42247e=$dataSystem[_0x27997a('0x59')]['uiAreaWidth'],_0x5db586=$dataSystem['advanced'][_0x27997a('0x44e')],_0x29aeca=VisuMZ[_0x27997a('0x32b')][_0x27997a('0x5ab')]['UI'][_0x27997a('0x185')];Graphics[_0x27997a('0x9d')]=_0x42247e-_0x29aeca*0x2,Graphics[_0x27997a('0x32c')]=_0x5db586-_0x29aeca*0x2,this[_0x27997a('0x1bb')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5be')]=Scene_Boot[_0x3d8782('0x3b')]['updateDocumentTitle'],Scene_Boot[_0x3d8782('0x3b')]['updateDocumentTitle']=function(){const _0x89253b=_0x3d8782;if(this[_0x89253b('0x3d4')]())this[_0x89253b('0x568')]();else{if(_0x89253b('0x596')===_0x89253b('0x596'))VisuMZ['CoreEngine'][_0x89253b('0x5be')]['call'](this);else{function _0x470c91(){const _0x9e2c2b=_0x89253b,_0x2c7321=_0x3b7e6b['ApplyEasing']((_0xd423fb-_0x1578d5)/_0x4a99eb,_0x18b494||_0x9e2c2b('0x59f')),_0x4b8bb0=_0x4ef9b8[_0x9e2c2b('0x135')]((_0x2ae943-_0xa81802+0x1)/_0x187e2c,_0x369c79||'Linear'),_0x29f8bc=(_0x3aefd9-_0x2140f4*_0x2c7321)/(0x1-_0x2c7321);return _0x29f8bc+(_0x241b41-_0x29f8bc)*_0x4b8bb0;}}}},Scene_Boot[_0x3d8782('0x3b')]['isFullDocumentTitle']=function(){const _0x5c35e6=_0x3d8782;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x5c35e6('0x3f3')]===_0x5c35e6('0x2f9'))return![];if(Scene_Title[_0x5c35e6('0x44b')]==='')return![];if(Scene_Title[_0x5c35e6('0x44b')]===_0x5c35e6('0x39b'))return![];return!![];},Scene_Boot[_0x3d8782('0x3b')][_0x3d8782('0x568')]=function(){const _0x35945b=_0x3d8782,_0x5edca2=$dataSystem[_0x35945b('0x59a')],_0x5c3e6e=Scene_Title[_0x35945b('0x3f3')]||'',_0x47bc13=Scene_Title['version']||'',_0x56ce92=VisuMZ[_0x35945b('0x32b')][_0x35945b('0x5ab')][_0x35945b('0x558')][_0x35945b('0x1a4')]['DocumentTitleFmt'],_0x50c59b=_0x56ce92['format'](_0x5edca2,_0x5c3e6e,_0x47bc13);document[_0x35945b('0x130')]=_0x50c59b;},Scene_Boot[_0x3d8782('0x3b')]['determineSideButtonLayoutValid']=function(){const _0xd8f265=_0x3d8782;if(VisuMZ['CoreEngine'][_0xd8f265('0x5ab')]['UI'][_0xd8f265('0x582')]){if(_0xd8f265('0x3e9')!==_0xd8f265('0xeb')){const _0x29a6ba=Graphics[_0xd8f265('0x466')]-Graphics[_0xd8f265('0x9d')]-VisuMZ[_0xd8f265('0x32b')]['Settings']['UI']['BoxMargin']*0x2,_0x5dcb2b=Sprite_Button[_0xd8f265('0x3b')][_0xd8f265('0x212')][_0xd8f265('0x1c9')](this)*0x4;if(_0x29a6ba>=_0x5dcb2b)SceneManager[_0xd8f265('0x305')](!![]);}else{function _0x33b271(){const _0x32f9eb=_0xd8f265;let _0x5aa4c3=_0x49aceb[_0x32f9eb('0x32b')][_0x32f9eb('0x319')][_0x32f9eb('0x1c9')](this);return _0x5aa4c3;}}}},Scene_Title[_0x3d8782('0x3f3')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')]['MenuLayout'][_0x3d8782('0x1a4')][_0x3d8782('0x2f9')],Scene_Title[_0x3d8782('0x44b')]=VisuMZ['CoreEngine'][_0x3d8782('0x5ab')]['MenuLayout']['Title'][_0x3d8782('0xba')],Scene_Title['pictureButtons']=VisuMZ[_0x3d8782('0x32b')]['Settings'][_0x3d8782('0x34f')],VisuMZ[_0x3d8782('0x32b')]['Scene_Title_drawGameTitle']=Scene_Title[_0x3d8782('0x3b')][_0x3d8782('0x40c')],Scene_Title['prototype'][_0x3d8782('0x40c')]=function(){const _0x3774fc=_0x3d8782;VisuMZ[_0x3774fc('0x32b')][_0x3774fc('0x5ab')]['MenuLayout'][_0x3774fc('0x1a4')][_0x3774fc('0x40c')][_0x3774fc('0x1c9')](this);if(Scene_Title[_0x3774fc('0x3f3')]!==''&&Scene_Title[_0x3774fc('0x3f3')]!==_0x3774fc('0x2f9'))this['drawGameSubtitle']();if(Scene_Title[_0x3774fc('0x44b')]!==''&&Scene_Title[_0x3774fc('0x44b')]!==_0x3774fc('0x39b'))this[_0x3774fc('0x10d')]();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0x4c2de6=_0x3d8782;VisuMZ['CoreEngine']['Settings'][_0x4c2de6('0x558')][_0x4c2de6('0x1a4')][_0x4c2de6('0x332')][_0x4c2de6('0x1c9')](this);},Scene_Title[_0x3d8782('0x3b')][_0x3d8782('0x10d')]=function(){const _0x1c8837=_0x3d8782;VisuMZ['CoreEngine'][_0x1c8837('0x5ab')][_0x1c8837('0x558')]['Title'][_0x1c8837('0x10d')][_0x1c8837('0x1c9')](this);},Scene_Title[_0x3d8782('0x3b')][_0x3d8782('0x1f6')]=function(){const _0x13293e=_0x3d8782;this['createTitleButtons']();const _0x34d1d5=$dataSystem[_0x13293e('0x38d')][_0x13293e('0x17f')],_0x2a99eb=this[_0x13293e('0x1df')]();this[_0x13293e('0x1dd')]=new Window_TitleCommand(_0x2a99eb),this[_0x13293e('0x1dd')]['setBackgroundType'](_0x34d1d5);const _0x45dc48=this[_0x13293e('0x1df')]();this[_0x13293e('0x1dd')]['move'](_0x45dc48['x'],_0x45dc48['y'],_0x45dc48['width'],_0x45dc48['height']),this['addWindow'](this[_0x13293e('0x1dd')]);},Scene_Title[_0x3d8782('0x3b')][_0x3d8782('0x253')]=function(){const _0x126bb9=_0x3d8782;if(this[_0x126bb9('0x1dd')])return this[_0x126bb9('0x1dd')]['maxItems']();else{if('kGGVZ'!=='uneig')return VisuMZ[_0x126bb9('0x32b')][_0x126bb9('0x5ab')][_0x126bb9('0x521')][_0x126bb9('0x247')];else{function _0x442119(){const _0x314049=_0x126bb9;this['_slotWindow']['setBackgroundType'](_0x474896['layoutSettings'][_0x314049('0x39d')]);}}}},Scene_Title['prototype'][_0x3d8782('0x1df')]=function(){const _0x40baa2=_0x3d8782;return VisuMZ['CoreEngine'][_0x40baa2('0x5ab')][_0x40baa2('0x558')][_0x40baa2('0x1a4')]['CommandRect'][_0x40baa2('0x1c9')](this);},Scene_Title[_0x3d8782('0x3b')]['createTitleButtons']=function(){const _0x1f9cf4=_0x3d8782;for(const _0x5b59fa of Scene_Title[_0x1f9cf4('0x4de')]){const _0x3cfb71=new Sprite_TitlePictureButton(_0x5b59fa);this[_0x1f9cf4('0x5ef')](_0x3cfb71);}},VisuMZ['CoreEngine'][_0x3d8782('0x4a7')]=Scene_Map['prototype'][_0x3d8782('0x460')],Scene_Map[_0x3d8782('0x3b')][_0x3d8782('0x460')]=function(){const _0x6ccd63=_0x3d8782;VisuMZ[_0x6ccd63('0x32b')][_0x6ccd63('0x4a7')][_0x6ccd63('0x1c9')](this),$gameTemp[_0x6ccd63('0x5f0')]();},VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply']=Scene_Map[_0x3d8782('0x3b')][_0x3d8782('0x30c')],Scene_Map['prototype'][_0x3d8782('0x30c')]=function(){const _0xac218c=_0x3d8782;VisuMZ['CoreEngine'][_0xac218c('0xb7')][_0xac218c('0x1c9')](this);if($gameTemp[_0xac218c('0x122')]&&!$gameMessage['isBusy']())this[_0xac218c('0x497')]();},Scene_Map[_0x3d8782('0x3b')][_0x3d8782('0x4df')]=function(){const _0x48f94d=_0x3d8782;Scene_Message[_0x48f94d('0x3b')][_0x48f94d('0x4df')][_0x48f94d('0x1c9')](this),!SceneManager[_0x48f94d('0x5c8')](Scene_Battle)&&(this[_0x48f94d('0x480')]['update'](),this[_0x48f94d('0x4e5')][_0x48f94d('0x4a5')](),this[_0x48f94d('0x478')][_0x48f94d('0x3d9')]=![],SceneManager[_0x48f94d('0x508')]()),$gameScreen[_0x48f94d('0x368')]();},VisuMZ[_0x3d8782('0x32b')]['Scene_Map_createMenuButton']=Scene_Map['prototype'][_0x3d8782('0x2ba')],Scene_Map[_0x3d8782('0x3b')][_0x3d8782('0x2ba')]=function(){const _0x352939=_0x3d8782;VisuMZ['CoreEngine'][_0x352939('0x30b')]['call'](this),SceneManager['isSideButtonLayout']()&&this[_0x352939('0x4e6')]();},Scene_Map[_0x3d8782('0x3b')][_0x3d8782('0x4e6')]=function(){const _0x3a034e=_0x3d8782;this[_0x3a034e('0x41c')]['x']=Graphics[_0x3a034e('0x9d')]+0x4;},VisuMZ[_0x3d8782('0x32b')]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x3ec')],Scene_MenuBase[_0x3d8782('0x3b')]['helpAreaTop']=function(){const _0x6ee9b2=_0x3d8782;let _0x15a708=0x0;return SceneManager[_0x6ee9b2('0x5d9')]()?_0x15a708=this[_0x6ee9b2('0x516')]():_0x15a708=VisuMZ[_0x6ee9b2('0x32b')]['Scene_MenuBase_helpAreaTop'][_0x6ee9b2('0x1c9')](this),this[_0x6ee9b2('0x56b')]()&&this[_0x6ee9b2('0x36')]()==='top'&&(_0x15a708+=Window_ButtonAssist[_0x6ee9b2('0x3b')][_0x6ee9b2('0x24f')]()),_0x15a708;},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x516')]=function(){const _0x5852c5=_0x3d8782;return this[_0x5852c5('0x382')]()?this[_0x5852c5('0x473')]():0x0;},VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x2e8')],Scene_MenuBase['prototype']['mainAreaTop']=function(){const _0x39c847=_0x3d8782;return SceneManager['areButtonsOutsideMainUI']()?this[_0x39c847('0x228')]():VisuMZ[_0x39c847('0x32b')]['Scene_MenuBase_mainAreaTop'][_0x39c847('0x1c9')](this);},Scene_MenuBase[_0x3d8782('0x3b')]['mainAreaTopSideButtonLayout']=function(){const _0x4608ad=_0x3d8782;if(!this[_0x4608ad('0x382')]())return this[_0x4608ad('0x456')]();else{if(_0x4608ad('0x318')!==_0x4608ad('0x318')){function _0x265830(){const _0x577305=_0x4608ad;this[_0x577305('0x1d0')][_0x577305('0x4a3')](_0x2e51e3[_0x577305('0x12')]['InputBgType']);}}else return 0x0;}},VisuMZ[_0x3d8782('0x32b')]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x3d8782('0x3b')]['mainAreaHeight'],Scene_MenuBase['prototype'][_0x3d8782('0x1e')]=function(){const _0x4a4196=_0x3d8782;let _0x1c8805=0x0;if(SceneManager[_0x4a4196('0x5d9')]())_0x1c8805=this[_0x4a4196('0x52')]();else{if(_0x4a4196('0x1ef')!==_0x4a4196('0xab'))_0x1c8805=VisuMZ[_0x4a4196('0x32b')][_0x4a4196('0x1f3')][_0x4a4196('0x1c9')](this);else{function _0x3b06a8(){const _0x186826=_0x4a4196;this[_0x186826('0x4d4')]();}}}if(this[_0x4a4196('0x56b')]()&&this['getButtonAssistLocation']()!==_0x4a4196('0x33c')){if(_0x4a4196('0x5d3')!=='KcWVd')_0x1c8805-=Window_ButtonAssist[_0x4a4196('0x3b')]['lineHeight']();else{function _0x11fefb(){const _0x1bf67b=_0x4a4196,_0x2c5786=new _0x429820(_0x437ee7);this[_0x1bf67b('0x5ef')](_0x2c5786);}}}return _0x1c8805;},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x52')]=function(){const _0x17d326=_0x3d8782;return Graphics[_0x17d326('0x32c')]-this[_0x17d326('0x549')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0xb3')]=Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x408')],Scene_MenuBase['prototype']['createBackground']=function(){const _0x4f1d3c=_0x3d8782;VisuMZ[_0x4f1d3c('0x32b')][_0x4f1d3c('0xb3')][_0x4f1d3c('0x1c9')](this),this[_0x4f1d3c('0x358')](this[_0x4f1d3c('0x4f8')]()),this[_0x4f1d3c('0x13d')]();},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x4f8')]=function(){const _0x588c9e=_0x3d8782,_0x5f31ea=String(this[_0x588c9e('0x4d0')][_0x588c9e('0x439')]),_0x5455fb=this[_0x588c9e('0x44d')](_0x5f31ea);if(_0x5455fb)return _0x5455fb[_0x588c9e('0x5a5')];else{if('wMrgF'!=='mxIdw')return 0xc0;else{function _0x5ced49(){const _0x39fdc1=_0x588c9e;this[_0x39fdc1('0x3c')]=!![],this[_0x39fdc1('0x5b6')]();}}}},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x13d')]=function(){const _0x1fe160=_0x3d8782,_0xba1304=String(this[_0x1fe160('0x4d0')][_0x1fe160('0x439')]),_0x539c38=this['getCustomBackgroundSettings'](_0xba1304);_0x539c38&&(_0x539c38[_0x1fe160('0x8b')]!==''||_0x539c38[_0x1fe160('0x7a')]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x1fe160('0x28f')](_0x539c38[_0x1fe160('0x8b')])),this[_0x1fe160('0x39c')]=new Sprite(ImageManager['loadTitle2'](_0x539c38[_0x1fe160('0x7a')])),this[_0x1fe160('0x5ef')](this[_0x1fe160('0x536')]),this['addChild'](this[_0x1fe160('0x39c')]),this[_0x1fe160('0x536')][_0x1fe160('0x5e1')][_0x1fe160('0x3be')](this[_0x1fe160('0x53f')][_0x1fe160('0x3a0')](this,this[_0x1fe160('0x536')])),this['_backSprite2'][_0x1fe160('0x5e1')][_0x1fe160('0x3be')](this['adjustSprite']['bind'](this,this[_0x1fe160('0x39c')])));},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x44d')]=function(_0x17cd5e){const _0x1175e4=_0x3d8782;return VisuMZ[_0x1175e4('0x32b')][_0x1175e4('0x5ab')][_0x1175e4('0x1ed')][_0x17cd5e]||VisuMZ[_0x1175e4('0x32b')][_0x1175e4('0x5ab')][_0x1175e4('0x1ed')][_0x1175e4('0x4c2')];},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x53f')]=function(_0x345033){const _0x375752=_0x3d8782;this[_0x375752('0x4bf')](_0x345033),this[_0x375752('0x5fe')](_0x345033);},VisuMZ[_0x3d8782('0x32b')]['Scene_MenuBase_createCancelButton']=Scene_MenuBase['prototype'][_0x3d8782('0x509')],Scene_MenuBase['prototype'][_0x3d8782('0x509')]=function(){const _0x3d91bd=_0x3d8782;VisuMZ[_0x3d91bd('0x32b')][_0x3d91bd('0x3da')]['call'](this),SceneManager[_0x3d91bd('0x5ba')]()&&this[_0x3d91bd('0x209')]();},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x209')]=function(){const _0x571505=_0x3d8782;this[_0x571505('0x4a8')]['x']=Graphics[_0x571505('0x9d')]+0x4;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x4a0')]=Scene_MenuBase['prototype']['createPageButtons'],Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x42e')]=function(){const _0x51f0aa=_0x3d8782;VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons'][_0x51f0aa('0x1c9')](this),SceneManager[_0x51f0aa('0x5ba')]()&&this[_0x51f0aa('0x24')]();},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x24')]=function(){const _0x36d25f=_0x3d8782;this[_0x36d25f('0x260')]['x']=-0x1*(this[_0x36d25f('0x260')]['width']+this[_0x36d25f('0x330')][_0x36d25f('0x466')]+0x8),this[_0x36d25f('0x330')]['x']=-0x1*(this[_0x36d25f('0x330')][_0x36d25f('0x466')]+0x4);},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x56b')]=function(){const _0x1eea09=_0x3d8782;return VisuMZ[_0x1eea09('0x32b')][_0x1eea09('0x5ab')][_0x1eea09('0x499')][_0x1eea09('0x3d6')];},Scene_MenuBase['prototype'][_0x3d8782('0x36')]=function(){const _0x13fa8b=_0x3d8782;if(SceneManager[_0x13fa8b('0x5ba')]()||SceneManager[_0x13fa8b('0x374')]())return VisuMZ[_0x13fa8b('0x32b')]['Settings']['ButtonAssist'][_0x13fa8b('0x173')];else{if(_0x13fa8b('0x342')===_0x13fa8b('0x23c')){function _0x2f7c07(){const _0x8c37c4=_0x13fa8b;return this['_commandWindow']?this[_0x8c37c4('0x1dd')][_0x8c37c4('0x101')]():_0x7acb28[_0x8c37c4('0x32b')]['Settings']['TitleCommandList'][_0x8c37c4('0x247')];}}else return _0x13fa8b('0x33c');}},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0xd1')]=function(){const _0x598f32=_0x3d8782;if(!this[_0x598f32('0x56b')]())return;const _0x444221=this[_0x598f32('0xdb')]();this[_0x598f32('0xa9')]=new Window_ButtonAssist(_0x444221),this[_0x598f32('0x5b4')](this['_buttonAssistWindow']);},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0xdb')]=function(){const _0x1df0ee=_0x3d8782;if(this['getButtonAssistLocation']()===_0x1df0ee('0x33c')){if(_0x1df0ee('0x397')!==_0x1df0ee('0x397')){function _0x24364a(){const _0x2af9d9=_0x1df0ee;this[_0x2af9d9('0x1ce')](_0x21301d,_0x4bf55f,_0x425952,this[_0x2af9d9('0x5d4')]()),_0x51dfce-=this[_0x2af9d9('0x5d4')]()+0x2,_0x50ec0e+=this[_0x2af9d9('0x5d4')]()+0x2;}}else return this['buttonAssistWindowButtonRect']();}else{if(_0x1df0ee('0x4da')!==_0x1df0ee('0x2c'))return this[_0x1df0ee('0x15f')]();else{function _0x18bf92(){const _0x1b1691=_0x1df0ee,_0xfee3f1=this[_0x1b1691('0x2a0')](_0x27b29f),_0x4501c2=_0x586c25[_0x1b1691('0x32b')][_0x1b1691('0x5ab')]['Param'][_0x1b1691('0x5')][_0x372121],_0x205b96=_0x2e651d[_0x1b1691('0x2ca')](_0x4501c2),_0xc6c4dc=this['_actor'][_0x1b1691('0x38c')](_0x4501c2,!![]);this[_0x1b1691('0xed')](_0xfee3f1['x'],_0xfee3f1['y'],0xa0,_0x4501c2,![]),this['resetTextColor'](),this[_0x1b1691('0x2e3')](_0xc6c4dc,_0xfee3f1['x']+0xa0,_0xfee3f1['y'],0x3c,_0x1b1691('0x3f7'));}}}},Scene_MenuBase['prototype'][_0x3d8782('0x589')]=function(){const _0x1ce588=_0x3d8782,_0x97af0d=ConfigManager[_0x1ce588('0x5b8')]?(Sprite_Button[_0x1ce588('0x3b')]['blockWidth']()+0x6)*0x2:0x0,_0x3a7d32=this[_0x1ce588('0x1cc')](),_0x1c10a3=Graphics[_0x1ce588('0x9d')]-_0x97af0d*0x2,_0x1b3f49=this[_0x1ce588('0x1c4')]();return new Rectangle(_0x97af0d,_0x3a7d32,_0x1c10a3,_0x1b3f49);},Scene_MenuBase[_0x3d8782('0x3b')][_0x3d8782('0x15f')]=function(){const _0x4dd91c=_0x3d8782,_0x1ba523=Graphics['boxWidth'],_0x24f607=Window_ButtonAssist['prototype'][_0x4dd91c('0x24f')](),_0x42578a=0x0;let _0x2d1131=0x0;if(this['getButtonAssistLocation']()===_0x4dd91c('0x16d')){if(_0x4dd91c('0x34')===_0x4dd91c('0x34'))_0x2d1131=0x0;else{function _0x58fd07(){var _0x1d6a40=_0x1eb053(_0x171651['$1'])/0x64;_0x5415af*=_0x1d6a40;}}}else _0x2d1131=Graphics[_0x4dd91c('0x32c')]-_0x24f607;return new Rectangle(_0x42578a,_0x2d1131,_0x1ba523,_0x24f607);},Scene_Menu[_0x3d8782('0x12')]=VisuMZ['CoreEngine'][_0x3d8782('0x5ab')][_0x3d8782('0x558')][_0x3d8782('0x5e0')],VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x341')]=Scene_Menu[_0x3d8782('0x3b')]['create'],Scene_Menu[_0x3d8782('0x3b')][_0x3d8782('0x6c')]=function(){const _0x58f275=_0x3d8782;VisuMZ[_0x58f275('0x32b')]['Scene_Menu_create']['call'](this),this[_0x58f275('0x2fa')]();},Scene_Menu[_0x3d8782('0x3b')][_0x3d8782('0x2fa')]=function(){const _0x1d178a=_0x3d8782;if(this['_commandWindow']){if('eEKMQ'===_0x1d178a('0x252')){function _0x3902f4(){const _0xd8d9f3=_0x1d178a;this[_0xd8d9f3('0x48d')](),this[_0xd8d9f3('0x41')]['clear'](),this[_0xd8d9f3('0x41')][_0xd8d9f3('0x214')]=_0x370ddf['CoreEngine'][_0xd8d9f3('0x5ab')][_0xd8d9f3('0x126')]['GoldFontSize'];const _0x7c48cf=_0x31a734['CoreEngine'][_0xd8d9f3('0x5ab')]['Gold']['GoldIcon'],_0x2ec58e=this[_0xd8d9f3('0x2a0')](0x0);if(_0x7c48cf>0x0){const _0x164e57=_0x2ec58e['y']+(this[_0xd8d9f3('0x24f')]()-_0xcac193['iconHeight'])/0x2;this[_0xd8d9f3('0x14b')](_0x7c48cf,_0x2ec58e['x'],_0x164e57);const _0x554a68=_0x280ca6[_0xd8d9f3('0xd4')]+0x4;_0x2ec58e['x']+=_0x554a68,_0x2ec58e[_0xd8d9f3('0x466')]-=_0x554a68;}this[_0xd8d9f3('0xd9')](_0x49c7a1[_0xd8d9f3('0x37a')]()),this[_0xd8d9f3('0x2e3')](this[_0xd8d9f3('0x432')](),_0x2ec58e['x'],_0x2ec58e['y'],_0x2ec58e[_0xd8d9f3('0x466')],_0xd8d9f3('0x41f'));const _0x6f2bff=this[_0xd8d9f3('0x55')](this[_0xd8d9f3('0x432')]())+0x6;;_0x2ec58e['x']+=_0x6f2bff,_0x2ec58e[_0xd8d9f3('0x466')]-=_0x6f2bff,this[_0xd8d9f3('0x31d')]();const _0x5516e3=this['value'](),_0x1cdd3c=this[_0xd8d9f3('0x55')](this[_0xd8d9f3('0x5a')]?_0x4e3f1f['GroupDigits'](this['value']()):this[_0xd8d9f3('0xb')]());_0x1cdd3c>_0x2ec58e['width']?this[_0xd8d9f3('0x2e3')](_0x5d3d00[_0xd8d9f3('0x32b')][_0xd8d9f3('0x5ab')][_0xd8d9f3('0x126')]['GoldOverlap'],_0x2ec58e['x'],_0x2ec58e['y'],_0x2ec58e['width'],_0xd8d9f3('0x3f7')):this[_0xd8d9f3('0x2e3')](this['value'](),_0x2ec58e['x'],_0x2ec58e['y'],_0x2ec58e['width'],_0xd8d9f3('0x3f7')),this[_0xd8d9f3('0x48d')]();}}else this[_0x1d178a('0x1dd')][_0x1d178a('0x4a3')](Scene_Menu[_0x1d178a('0x12')][_0x1d178a('0x301')]);}this[_0x1d178a('0x552')]&&this['_goldWindow'][_0x1d178a('0x4a3')](Scene_Menu[_0x1d178a('0x12')][_0x1d178a('0x1f4')]);if(this[_0x1d178a('0x2c2')]){if(_0x1d178a('0x3bc')!=='YTLsz')this['_statusWindow'][_0x1d178a('0x4a3')](Scene_Menu[_0x1d178a('0x12')][_0x1d178a('0x323')]);else{function _0x5dba15(){return _0x2e1f58['buttonAssistSwitch'];}}}},Scene_Menu[_0x3d8782('0x3b')][_0x3d8782('0x1df')]=function(){const _0x250bc9=_0x3d8782;return Scene_Menu[_0x250bc9('0x12')][_0x250bc9('0x4e4')]['call'](this);},Scene_Menu[_0x3d8782('0x3b')]['goldWindowRect']=function(){const _0xcea584=_0x3d8782;return Scene_Menu[_0xcea584('0x12')][_0xcea584('0x42a')][_0xcea584('0x1c9')](this);},Scene_Menu['prototype'][_0x3d8782('0xbf')]=function(){const _0x2161e4=_0x3d8782;return Scene_Menu['layoutSettings']['StatusRect'][_0x2161e4('0x1c9')](this);},Scene_Item['layoutSettings']=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')][_0x3d8782('0x26c')],VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x58d')]=Scene_Item['prototype'][_0x3d8782('0x6c')],Scene_Item[_0x3d8782('0x3b')][_0x3d8782('0x6c')]=function(){const _0x410607=_0x3d8782;VisuMZ[_0x410607('0x32b')][_0x410607('0x58d')][_0x410607('0x1c9')](this),this[_0x410607('0x2fa')]();},Scene_Item[_0x3d8782('0x3b')]['setCoreEngineUpdateWindowBg']=function(){const _0xa07e94=_0x3d8782;if(this[_0xa07e94('0x45c')]){if('Xoeaq'!==_0xa07e94('0x1c6'))this[_0xa07e94('0x45c')][_0xa07e94('0x4a3')](Scene_Item[_0xa07e94('0x12')][_0xa07e94('0x472')]);else{function _0x146cb1(){const _0x36a9f2=_0xa07e94;this[_0x36a9f2('0x39')]=!![],this[_0x36a9f2('0x195')](),this['_playtestF7Looping']=![];}}}this[_0xa07e94('0x1cf')]&&this[_0xa07e94('0x1cf')]['setBackgroundType'](Scene_Item['layoutSettings'][_0xa07e94('0x24c')]);this[_0xa07e94('0x5ac')]&&this[_0xa07e94('0x5ac')][_0xa07e94('0x4a3')](Scene_Item[_0xa07e94('0x12')][_0xa07e94('0x420')]);if(this[_0xa07e94('0x248')]){if(_0xa07e94('0x24d')===_0xa07e94('0x2f5')){function _0xe622c9(){const _0x57311c=_0xa07e94;if(_0x1f68a0[_0x57311c('0x87')]())_0x59938b[_0x57311c('0xad')](_0x54a47e);}}else this[_0xa07e94('0x248')][_0xa07e94('0x4a3')](Scene_Item[_0xa07e94('0x12')][_0xa07e94('0x56')]);}},Scene_Item[_0x3d8782('0x3b')][_0x3d8782('0x2cf')]=function(){const _0x28ee1e=_0x3d8782;return Scene_Item['layoutSettings'][_0x28ee1e('0x290')]['call'](this);},Scene_Item[_0x3d8782('0x3b')][_0x3d8782('0x2d0')]=function(){const _0x1f23c5=_0x3d8782;return Scene_Item[_0x1f23c5('0x12')][_0x1f23c5('0x3f6')][_0x1f23c5('0x1c9')](this);},Scene_Item[_0x3d8782('0x3b')]['itemWindowRect']=function(){const _0x8375f4=_0x3d8782;return Scene_Item[_0x8375f4('0x12')]['ItemRect']['call'](this);},Scene_Item[_0x3d8782('0x3b')][_0x3d8782('0x4af')]=function(){const _0x454e2e=_0x3d8782;return Scene_Item[_0x454e2e('0x12')][_0x454e2e('0x25e')]['call'](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')][_0x3d8782('0x454')],VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5e9')]=Scene_Skill[_0x3d8782('0x3b')][_0x3d8782('0x6c')],Scene_Skill[_0x3d8782('0x3b')][_0x3d8782('0x6c')]=function(){const _0x29f7f0=_0x3d8782;VisuMZ['CoreEngine']['Scene_Skill_create'][_0x29f7f0('0x1c9')](this),this[_0x29f7f0('0x2fa')]();},Scene_Skill[_0x3d8782('0x3b')][_0x3d8782('0x2fa')]=function(){const _0x5542b5=_0x3d8782;this[_0x5542b5('0x45c')]&&this[_0x5542b5('0x45c')][_0x5542b5('0x4a3')](Scene_Skill[_0x5542b5('0x12')][_0x5542b5('0x472')]);this[_0x5542b5('0x3f0')]&&this['_skillTypeWindow'][_0x5542b5('0x4a3')](Scene_Skill['layoutSettings']['SkillTypeBgType']);this[_0x5542b5('0x2c2')]&&this[_0x5542b5('0x2c2')]['setBackgroundType'](Scene_Skill['layoutSettings']['StatusBgType']);if(this['_itemWindow']){if('cygBB'!==_0x5542b5('0x95')){function _0xb13ff0(){const _0x276518=_0x5542b5;_0x377f9f[_0x276518('0x32b')][_0x276518('0xb7')][_0x276518('0x1c9')](this);if(_0x47cc5c[_0x276518('0x122')]&&!_0x4bbfda[_0x276518('0x2be')]())this[_0x276518('0x497')]();}}else this[_0x5542b5('0x5ac')][_0x5542b5('0x4a3')](Scene_Skill[_0x5542b5('0x12')][_0x5542b5('0x420')]);}if(this[_0x5542b5('0x248')]){if('PBiTb'===_0x5542b5('0x587'))this[_0x5542b5('0x248')][_0x5542b5('0x4a3')](Scene_Skill[_0x5542b5('0x12')]['ActorBgType']);else{function _0x19e0d6(){const _0x575936=_0x5542b5;return _0x426f6e[_0x575936('0x284')](_0x575936('0x294'));}}}},Scene_Skill[_0x3d8782('0x3b')][_0x3d8782('0x2cf')]=function(){const _0x176bbd=_0x3d8782;return Scene_Skill[_0x176bbd('0x12')]['HelpRect'][_0x176bbd('0x1c9')](this);},Scene_Skill[_0x3d8782('0x3b')]['skillTypeWindowRect']=function(){const _0x1fd380=_0x3d8782;return Scene_Skill['layoutSettings'][_0x1fd380('0x1a2')][_0x1fd380('0x1c9')](this);},Scene_Skill['prototype'][_0x3d8782('0xbf')]=function(){const _0x5607a0=_0x3d8782;return Scene_Skill[_0x5607a0('0x12')][_0x5607a0('0x9a')][_0x5607a0('0x1c9')](this);},Scene_Skill[_0x3d8782('0x3b')][_0x3d8782('0x34b')]=function(){const _0x4a193a=_0x3d8782;return Scene_Skill[_0x4a193a('0x12')][_0x4a193a('0x309')][_0x4a193a('0x1c9')](this);},Scene_Skill[_0x3d8782('0x3b')]['actorWindowRect']=function(){const _0x16f1ef=_0x3d8782;return Scene_Skill[_0x16f1ef('0x12')][_0x16f1ef('0x25e')]['call'](this);},Scene_Equip[_0x3d8782('0x12')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')]['EquipMenu'],VisuMZ[_0x3d8782('0x32b')]['Scene_Equip_create']=Scene_Equip[_0x3d8782('0x3b')][_0x3d8782('0x6c')],Scene_Equip[_0x3d8782('0x3b')]['create']=function(){const _0x5da8e1=_0x3d8782;VisuMZ[_0x5da8e1('0x32b')][_0x5da8e1('0x5b0')][_0x5da8e1('0x1c9')](this),this[_0x5da8e1('0x2fa')]();},Scene_Equip['prototype'][_0x3d8782('0x2fa')]=function(){const _0x43dbdb=_0x3d8782;this[_0x43dbdb('0x45c')]&&this['_helpWindow'][_0x43dbdb('0x4a3')](Scene_Equip['layoutSettings'][_0x43dbdb('0x472')]);if(this[_0x43dbdb('0x2c2')]){if('nlVcU'==='nlVcU')this[_0x43dbdb('0x2c2')][_0x43dbdb('0x4a3')](Scene_Equip['layoutSettings'][_0x43dbdb('0x323')]);else{function _0x2925c7(){const _0x4d06b0=_0x43dbdb;this[_0x4d06b0('0x4e6')]();}}}this[_0x43dbdb('0x1dd')]&&this[_0x43dbdb('0x1dd')][_0x43dbdb('0x4a3')](Scene_Equip[_0x43dbdb('0x12')][_0x43dbdb('0x301')]);this['_slotWindow']&&this['_slotWindow'][_0x43dbdb('0x4a3')](Scene_Equip[_0x43dbdb('0x12')][_0x43dbdb('0x39d')]);if(this[_0x43dbdb('0x5ac')]){if('MdLnq'===_0x43dbdb('0x1fd')){function _0x15a19d(){const _0x2a93e0=_0x43dbdb;_0x233a83[_0x2a93e0('0x56d')](![]);}}else this['_itemWindow'][_0x43dbdb('0x4a3')](Scene_Equip['layoutSettings'][_0x43dbdb('0x420')]);}},Scene_Equip[_0x3d8782('0x3b')][_0x3d8782('0x2cf')]=function(){const _0x4eebd9=_0x3d8782;return Scene_Equip[_0x4eebd9('0x12')][_0x4eebd9('0x290')][_0x4eebd9('0x1c9')](this);},Scene_Equip[_0x3d8782('0x3b')][_0x3d8782('0xbf')]=function(){const _0xd3fca6=_0x3d8782;return Scene_Equip[_0xd3fca6('0x12')][_0xd3fca6('0x9a')][_0xd3fca6('0x1c9')](this);},Scene_Equip[_0x3d8782('0x3b')][_0x3d8782('0x1df')]=function(){const _0x5146e1=_0x3d8782;return Scene_Equip[_0x5146e1('0x12')][_0x5146e1('0x4e4')][_0x5146e1('0x1c9')](this);},Scene_Equip['prototype'][_0x3d8782('0x289')]=function(){const _0x552d53=_0x3d8782;return Scene_Equip[_0x552d53('0x12')][_0x552d53('0x272')]['call'](this);},Scene_Equip[_0x3d8782('0x3b')][_0x3d8782('0x34b')]=function(){const _0x5a041f=_0x3d8782;return Scene_Equip['layoutSettings'][_0x5a041f('0x309')][_0x5a041f('0x1c9')](this);},Scene_Status['layoutSettings']=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')]['StatusMenu'],VisuMZ['CoreEngine'][_0x3d8782('0x261')]=Scene_Status[_0x3d8782('0x3b')]['create'],Scene_Status[_0x3d8782('0x3b')][_0x3d8782('0x6c')]=function(){const _0x565ece=_0x3d8782;VisuMZ[_0x565ece('0x32b')][_0x565ece('0x261')][_0x565ece('0x1c9')](this),this[_0x565ece('0x2fa')]();},Scene_Status['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x1d8359=_0x3d8782;if(this[_0x1d8359('0x550')]){if(_0x1d8359('0x5c6')===_0x1d8359('0x482')){function _0x17ced0(){const _0x20193b=_0x1d8359,_0x37e058=_0x20193b('0x53c');this[_0x20193b('0x1d5')]=this[_0x20193b('0x1d5')]||{};if(this['_colorCache'][_0x37e058])return this[_0x20193b('0x1d5')][_0x37e058];const _0x51ca93=_0x550a94[_0x20193b('0x32b')][_0x20193b('0x5ab')][_0x20193b('0x477')]['ColorCrisis'];return this[_0x20193b('0x344')](_0x37e058,_0x51ca93);}}else this[_0x1d8359('0x550')][_0x1d8359('0x4a3')](Scene_Status[_0x1d8359('0x12')][_0x1d8359('0x18d')]);}this[_0x1d8359('0x2c2')]&&this['_statusWindow'][_0x1d8359('0x4a3')](Scene_Status['layoutSettings'][_0x1d8359('0x323')]);if(this['_statusParamsWindow']){if('WFwWE'!==_0x1d8359('0x364'))this[_0x1d8359('0x20e')][_0x1d8359('0x4a3')](Scene_Status[_0x1d8359('0x12')][_0x1d8359('0x2c1')]);else{function _0x43a2a0(){const _0x23d0f8=_0x1d8359;_0x2c22fb[_0x23d0f8('0x32b')]['Bitmap_clearRect'][_0x23d0f8('0x1c9')](this,_0x2d426a,_0x35bd50,_0x1b110f,_0x12d758),this[_0x23d0f8('0x7d')]();}}}if(this[_0x1d8359('0x237')]){if(_0x1d8359('0x3cf')!=='vucAy'){function _0x352356(){const _0x255e9f=_0x1d8359;_0x336d75[_0x255e9f('0x5a9')][_0x255e9f('0x1c9')](this,_0x155890);}}else this[_0x1d8359('0x237')][_0x1d8359('0x4a3')](Scene_Status['layoutSettings']['StatusEquipBgType']);}},Scene_Status[_0x3d8782('0x3b')][_0x3d8782('0x340')]=function(){const _0x52598d=_0x3d8782;return Scene_Status[_0x52598d('0x12')][_0x52598d('0x6a')]['call'](this);},Scene_Status['prototype'][_0x3d8782('0xbf')]=function(){const _0x469a76=_0x3d8782;return Scene_Status[_0x469a76('0x12')]['StatusRect'][_0x469a76('0x1c9')](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){return Scene_Status['layoutSettings']['StatusParamsRect']['call'](this);},Scene_Status[_0x3d8782('0x3b')][_0x3d8782('0x1d')]=function(){const _0x3dc166=_0x3d8782;return Scene_Status['layoutSettings'][_0x3dc166('0x336')]['call'](this);},Scene_Options['layoutSettings']=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')][_0x3d8782('0x399')],VisuMZ[_0x3d8782('0x32b')]['Scene_Options_create']=Scene_Options[_0x3d8782('0x3b')][_0x3d8782('0x6c')],Scene_Options[_0x3d8782('0x3b')][_0x3d8782('0x6c')]=function(){const _0x3531b2=_0x3d8782;VisuMZ[_0x3531b2('0x32b')][_0x3531b2('0xdd')][_0x3531b2('0x1c9')](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x24cf35=_0x3d8782;this[_0x24cf35('0x546')]&&this[_0x24cf35('0x546')][_0x24cf35('0x4a3')](Scene_Options[_0x24cf35('0x12')]['OptionsBgType']);},Scene_Options[_0x3d8782('0x3b')][_0x3d8782('0x3b7')]=function(){const _0x39bb97=_0x3d8782;return Scene_Options[_0x39bb97('0x12')][_0x39bb97('0x243')][_0x39bb97('0x1c9')](this);},Scene_Save[_0x3d8782('0x12')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')]['SaveMenu'],Scene_Save['prototype']['create']=function(){const _0x4bd6da=_0x3d8782;Scene_File[_0x4bd6da('0x3b')]['create'][_0x4bd6da('0x1c9')](this),this[_0x4bd6da('0x2fa')]();},Scene_Save[_0x3d8782('0x3b')][_0x3d8782('0x2fa')]=function(){const _0x31c05b=_0x3d8782;if(this['_helpWindow']){if(_0x31c05b('0x3cb')===_0x31c05b('0x40a')){function _0xad6650(){const _0xec90dc=_0x31c05b;this[_0xec90dc('0x37e')]=_0xa9b061,this[_0xec90dc('0x23a')]=_0x24f105[_0xec90dc('0x402')](this[_0xec90dc('0x37e')]);}}else this[_0x31c05b('0x45c')]['setBackgroundType'](Scene_Save['layoutSettings'][_0x31c05b('0x472')]);}if(this[_0x31c05b('0x40e')]){if(_0x31c05b('0x46c')===_0x31c05b('0x65')){function _0x217a51(){const _0x520688=_0x31c05b;return this[_0x520688('0x563')];}}else this['_listWindow'][_0x31c05b('0x4a3')](Scene_Save[_0x31c05b('0x12')][_0x31c05b('0x116')]);}},Scene_Save[_0x3d8782('0x3b')][_0x3d8782('0x2cf')]=function(){const _0x46402d=_0x3d8782;return Scene_Save[_0x46402d('0x12')]['HelpRect'][_0x46402d('0x1c9')](this);},Scene_Save['prototype']['listWindowRect']=function(){const _0x4b75ca=_0x3d8782;return Scene_Save['layoutSettings'][_0x4b75ca('0x2de')][_0x4b75ca('0x1c9')](this);},Scene_Load[_0x3d8782('0x12')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')][_0x3d8782('0x3e4')],Scene_Load[_0x3d8782('0x3b')][_0x3d8782('0x6c')]=function(){const _0x3b739e=_0x3d8782;Scene_File[_0x3b739e('0x3b')][_0x3b739e('0x6c')][_0x3b739e('0x1c9')](this),this[_0x3b739e('0x2fa')]();},Scene_Load[_0x3d8782('0x3b')][_0x3d8782('0x2fa')]=function(){const _0x176ab0=_0x3d8782;this['_helpWindow']&&this[_0x176ab0('0x45c')]['setBackgroundType'](Scene_Load[_0x176ab0('0x12')][_0x176ab0('0x472')]);if(this['_listWindow']){if(_0x176ab0('0x5c3')!==_0x176ab0('0x53a'))this['_listWindow']['setBackgroundType'](Scene_Load[_0x176ab0('0x12')][_0x176ab0('0x116')]);else{function _0x5a07e3(){return _0x4cfae8;}}}},Scene_Load[_0x3d8782('0x3b')][_0x3d8782('0x2cf')]=function(){const _0x4491bd=_0x3d8782;return Scene_Load[_0x4491bd('0x12')][_0x4491bd('0x290')][_0x4491bd('0x1c9')](this);},Scene_Load[_0x3d8782('0x3b')]['listWindowRect']=function(){const _0x278ad5=_0x3d8782;return Scene_Load[_0x278ad5('0x12')][_0x278ad5('0x2de')][_0x278ad5('0x1c9')](this);},Scene_GameEnd[_0x3d8782('0x12')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')][_0x3d8782('0x2ea')],VisuMZ['CoreEngine']['Scene_GameEnd_createBackground']=Scene_GameEnd['prototype'][_0x3d8782('0x408')],Scene_GameEnd[_0x3d8782('0x3b')][_0x3d8782('0x408')]=function(){const _0xf5e015=_0x3d8782;Scene_MenuBase[_0xf5e015('0x3b')][_0xf5e015('0x408')]['call'](this);},Scene_GameEnd[_0x3d8782('0x3b')][_0x3d8782('0x1f6')]=function(){const _0xc41c08=_0x3d8782,_0x40537a=this[_0xc41c08('0x1df')]();this[_0xc41c08('0x1dd')]=new Window_GameEnd(_0x40537a),this[_0xc41c08('0x1dd')]['setHandler'](_0xc41c08('0x294'),this[_0xc41c08('0x1ca')][_0xc41c08('0x3a0')](this)),this[_0xc41c08('0x5b4')](this[_0xc41c08('0x1dd')]),this['_commandWindow'][_0xc41c08('0x4a3')](Scene_GameEnd[_0xc41c08('0x12')]['CommandBgType']);},Scene_GameEnd[_0x3d8782('0x3b')][_0x3d8782('0x1df')]=function(){const _0x305d17=_0x3d8782;return Scene_GameEnd[_0x305d17('0x12')][_0x305d17('0x4e4')]['call'](this);},Scene_Shop[_0x3d8782('0x12')]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x3d8782('0x67')],VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x4d7')]=Scene_Shop[_0x3d8782('0x3b')]['create'],Scene_Shop[_0x3d8782('0x3b')][_0x3d8782('0x6c')]=function(){const _0x4ba965=_0x3d8782;VisuMZ[_0x4ba965('0x32b')][_0x4ba965('0x4d7')][_0x4ba965('0x1c9')](this),this[_0x4ba965('0x2fa')]();},Scene_Shop[_0x3d8782('0x3b')][_0x3d8782('0x2fa')]=function(){const _0x3bf61e=_0x3d8782;this[_0x3bf61e('0x45c')]&&this[_0x3bf61e('0x45c')]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x3bf61e('0x472')]);this[_0x3bf61e('0x552')]&&this['_goldWindow'][_0x3bf61e('0x4a3')](Scene_Shop['layoutSettings']['GoldBgType']);this['_commandWindow']&&this[_0x3bf61e('0x1dd')][_0x3bf61e('0x4a3')](Scene_Shop[_0x3bf61e('0x12')][_0x3bf61e('0x301')]);if(this['_dummyWindow']){if(_0x3bf61e('0xb6')===_0x3bf61e('0xb6'))this[_0x3bf61e('0xfd')][_0x3bf61e('0x4a3')](Scene_Shop[_0x3bf61e('0x12')][_0x3bf61e('0x32f')]);else{function _0x2ff102(){const _0xd7cbee=_0x3bf61e;this[_0xd7cbee('0x5b')]='SV';}}}this[_0x3bf61e('0x380')]&&this[_0x3bf61e('0x380')]['setBackgroundType'](Scene_Shop[_0x3bf61e('0x12')][_0x3bf61e('0x1ea')]),this[_0x3bf61e('0x2c2')]&&this[_0x3bf61e('0x2c2')][_0x3bf61e('0x4a3')](Scene_Shop[_0x3bf61e('0x12')][_0x3bf61e('0x323')]),this[_0x3bf61e('0x54f')]&&this[_0x3bf61e('0x54f')]['setBackgroundType'](Scene_Shop[_0x3bf61e('0x12')]['BuyBgType']),this[_0x3bf61e('0x1cf')]&&this[_0x3bf61e('0x1cf')][_0x3bf61e('0x4a3')](Scene_Shop[_0x3bf61e('0x12')]['CategoryBgType']),this[_0x3bf61e('0x1c1')]&&this[_0x3bf61e('0x1c1')][_0x3bf61e('0x4a3')](Scene_Shop[_0x3bf61e('0x12')][_0x3bf61e('0x1d9')]);},Scene_Shop['prototype']['helpWindowRect']=function(){const _0x10cb7e=_0x3d8782;return Scene_Shop[_0x10cb7e('0x12')][_0x10cb7e('0x290')][_0x10cb7e('0x1c9')](this);},Scene_Shop[_0x3d8782('0x3b')][_0x3d8782('0x3f8')]=function(){const _0x39e742=_0x3d8782;return Scene_Shop[_0x39e742('0x12')][_0x39e742('0x42a')]['call'](this);},Scene_Shop['prototype']['commandWindowRect']=function(){const _0x4f6b79=_0x3d8782;return Scene_Shop[_0x4f6b79('0x12')][_0x4f6b79('0x4e4')][_0x4f6b79('0x1c9')](this);},Scene_Shop[_0x3d8782('0x3b')]['dummyWindowRect']=function(){const _0x31deb1=_0x3d8782;return Scene_Shop[_0x31deb1('0x12')][_0x31deb1('0x5b2')]['call'](this);},Scene_Shop[_0x3d8782('0x3b')][_0x3d8782('0x106')]=function(){const _0x4bd6bf=_0x3d8782;return Scene_Shop[_0x4bd6bf('0x12')][_0x4bd6bf('0xe5')][_0x4bd6bf('0x1c9')](this);},Scene_Shop['prototype']['statusWindowRect']=function(){const _0x5e71ea=_0x3d8782;return Scene_Shop[_0x5e71ea('0x12')][_0x5e71ea('0x9a')][_0x5e71ea('0x1c9')](this);},Scene_Shop['prototype']['buyWindowRect']=function(){const _0x557131=_0x3d8782;return Scene_Shop[_0x557131('0x12')]['BuyRect'][_0x557131('0x1c9')](this);},Scene_Shop[_0x3d8782('0x3b')][_0x3d8782('0x2d0')]=function(){const _0x3fbd3d=_0x3d8782;return Scene_Shop[_0x3fbd3d('0x12')][_0x3fbd3d('0x3f6')][_0x3fbd3d('0x1c9')](this);},Scene_Shop[_0x3d8782('0x3b')][_0x3d8782('0x193')]=function(){const _0x5b2343=_0x3d8782;return Scene_Shop['layoutSettings'][_0x5b2343('0x2ac')][_0x5b2343('0x1c9')](this);},Scene_Name[_0x3d8782('0x12')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')][_0x3d8782('0x558')][_0x3d8782('0x5cd')],VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x1fc')]=Scene_Name['prototype'][_0x3d8782('0x6c')],Scene_Name[_0x3d8782('0x3b')][_0x3d8782('0x6c')]=function(){const _0x9ede58=_0x3d8782;VisuMZ['CoreEngine'][_0x9ede58('0x1fc')]['call'](this),this[_0x9ede58('0x2fa')]();},Scene_Name[_0x3d8782('0x3b')][_0x3d8782('0x2fa')]=function(){const _0x53ebfb=_0x3d8782;if(this[_0x53ebfb('0x1c5')]){if(_0x53ebfb('0x354')===_0x53ebfb('0x5e')){function _0x431a96(){return![];}}else this[_0x53ebfb('0x1c5')][_0x53ebfb('0x4a3')](Scene_Name['layoutSettings'][_0x53ebfb('0x2ef')]);}if(this[_0x53ebfb('0x1d0')]){if(_0x53ebfb('0x180')!==_0x53ebfb('0x180')){function _0x5b95ff(){const _0x15441b=_0x53ebfb;return _0x55a622[_0x15441b('0x12')][_0x15441b('0x9a')][_0x15441b('0x1c9')](this);}}else this[_0x53ebfb('0x1d0')][_0x53ebfb('0x4a3')](Scene_Name[_0x53ebfb('0x12')]['InputBgType']);}},Scene_Name[_0x3d8782('0x3b')]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x3d8782('0x3b')][_0x3d8782('0x207')]=function(){const _0x25c2a7=_0x3d8782;return Scene_Name[_0x25c2a7('0x12')][_0x25c2a7('0x3ac')][_0x25c2a7('0x1c9')](this);},Scene_Name[_0x3d8782('0x3b')][_0x3d8782('0x20')]=function(){const _0x1fc23b=_0x3d8782;return Scene_Name[_0x1fc23b('0x12')]['InputRect'][_0x1fc23b('0x1c9')](this);},VisuMZ[_0x3d8782('0x32b')]['Scene_Battle_update']=Scene_Battle[_0x3d8782('0x3b')][_0x3d8782('0x195')],Scene_Battle[_0x3d8782('0x3b')][_0x3d8782('0x195')]=function(){const _0xc24c49=_0x3d8782;VisuMZ[_0xc24c49('0x32b')][_0xc24c49('0x1fe')]['call'](this);if($gameTemp[_0xc24c49('0x122')])this['updatePlayTestF7']();},Scene_Battle[_0x3d8782('0x3b')][_0x3d8782('0x80')]=function(){const _0x529bcc=_0x3d8782;!BattleManager['isInputting']()&&!this[_0x529bcc('0x39')]&&!$gameMessage[_0x529bcc('0x2be')]()&&(this['_playtestF7Looping']=!![],this['update'](),this[_0x529bcc('0x39')]=![]);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x389')]=Scene_Battle[_0x3d8782('0x3b')]['createCancelButton'],Scene_Battle[_0x3d8782('0x3b')][_0x3d8782('0x509')]=function(){const _0x4e2b84=_0x3d8782;VisuMZ[_0x4e2b84('0x32b')][_0x4e2b84('0x389')]['call'](this),SceneManager['isSideButtonLayout']()&&this['repositionCancelButtonSideButtonLayout']();},Scene_Battle['prototype'][_0x3d8782('0x303')]=function(){const _0x307da5=_0x3d8782;this[_0x307da5('0x4a8')]['x']=Graphics[_0x307da5('0x9d')]+0x4;if(this[_0x307da5('0x86')]()){if('lKPxp'===_0x307da5('0x4c7'))this[_0x307da5('0x4a8')]['y']=Graphics[_0x307da5('0x32c')]-this['buttonAreaHeight']();else{function _0x46801b(){const _0x41be83=_0x307da5;this['contents'][_0x41be83('0x214')]+=0x6;}}}else this[_0x307da5('0x4a8')]['y']=0x0;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0xf6')]=Sprite_Button[_0x3d8782('0x3b')][_0x3d8782('0x460')],Sprite_Button[_0x3d8782('0x3b')][_0x3d8782('0x460')]=function(_0x212ec7){const _0x5e8987=_0x3d8782;VisuMZ[_0x5e8987('0x32b')][_0x5e8987('0xf6')][_0x5e8987('0x1c9')](this,_0x212ec7),this[_0x5e8987('0x5a0')]();},Sprite_Button[_0x3d8782('0x3b')][_0x3d8782('0x5a0')]=function(){const _0x15d731=_0x3d8782,_0x410c6c=VisuMZ[_0x15d731('0x32b')][_0x15d731('0x5ab')]['UI'];this[_0x15d731('0x322')]=![];switch(this[_0x15d731('0x522')]){case _0x15d731('0x294'):this['_isButtonHidden']=!_0x410c6c['cancelShowButton'];break;case _0x15d731('0x1b4'):case _0x15d731('0x176'):this['_isButtonHidden']=!_0x410c6c['pagedownShowButton'];break;case _0x15d731('0x422'):case'up':case _0x15d731('0x2b0'):case _0x15d731('0x62'):case'ok':this[_0x15d731('0x322')]=!_0x410c6c[_0x15d731('0x1d1')];break;case _0x15d731('0x4a'):this[_0x15d731('0x322')]=!_0x410c6c[_0x15d731('0x5a6')];break;}},VisuMZ['CoreEngine'][_0x3d8782('0xe2')]=Sprite_Button[_0x3d8782('0x3b')][_0x3d8782('0x545')],Sprite_Button[_0x3d8782('0x3b')][_0x3d8782('0x545')]=function(){const _0x4b031f=_0x3d8782;SceneManager[_0x4b031f('0x374')]()||this['_isButtonHidden']?this[_0x4b031f('0x1c2')]():VisuMZ[_0x4b031f('0x32b')][_0x4b031f('0xe2')]['call'](this);},Sprite_Button[_0x3d8782('0x3b')][_0x3d8782('0x1c2')]=function(){const _0xcc88b0=_0x3d8782;this[_0xcc88b0('0x3d9')]=![],this[_0xcc88b0('0x2a8')]=0x0,this['x']=Graphics[_0xcc88b0('0x466')]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x579')]=Sprite_Battler['prototype'][_0x3d8782('0x3b9')],Sprite_Battler[_0x3d8782('0x3b')]['startMove']=function(_0x68472a,_0x523fad,_0x16c979){const _0x3664e0=_0x3d8782;if(this[_0x3664e0('0x562')]!==_0x68472a||this[_0x3664e0('0x211')]!==_0x523fad){if(_0x3664e0('0x423')!==_0x3664e0('0x423')){function _0x3e9859(){const _0x4e6486=_0x3664e0;_0x1f3c59[_0x4e6486('0x3b')][_0x4e6486('0x6c')][_0x4e6486('0x1c9')](this),this[_0x4e6486('0x2fa')]();}}else this['setMoveEasingType']('Linear'),this[_0x3664e0('0x19f')]=_0x16c979;}VisuMZ[_0x3664e0('0x32b')][_0x3664e0('0x579')]['call'](this,_0x68472a,_0x523fad,_0x16c979);},Sprite_Battler['prototype'][_0x3d8782('0x1ad')]=function(_0x3f0ced){const _0x47beb1=_0x3d8782;this[_0x47beb1('0x3de')]=_0x3f0ced;},Sprite_Battler[_0x3d8782('0x3b')]['updateMove']=function(){const _0x3fe6f6=_0x3d8782;if(this['_movementDuration']<=0x0)return;const _0x3764c1=this[_0x3fe6f6('0x25')],_0x5a1706=this[_0x3fe6f6('0x19f')],_0x241750=this['_moveEasingType'];this[_0x3fe6f6('0x15a')]=this[_0x3fe6f6('0x4b7')](this[_0x3fe6f6('0x15a')],this[_0x3fe6f6('0x562')],_0x3764c1,_0x5a1706,_0x241750),this[_0x3fe6f6('0x113')]=this[_0x3fe6f6('0x4b7')](this[_0x3fe6f6('0x113')],this[_0x3fe6f6('0x211')],_0x3764c1,_0x5a1706,_0x241750),this[_0x3fe6f6('0x25')]--;if(this[_0x3fe6f6('0x25')]<=0x0)this[_0x3fe6f6('0x424')]();},Sprite_Battler[_0x3d8782('0x3b')][_0x3d8782('0x4b7')]=function(_0x82e33c,_0xef40f,_0x5663cd,_0x42507d,_0x4f384f){const _0x5b5d62=_0x3d8782,_0x5dd9fa=VisuMZ['ApplyEasing']((_0x42507d-_0x5663cd)/_0x42507d,_0x4f384f||_0x5b5d62('0x59f')),_0x20330c=VisuMZ['ApplyEasing']((_0x42507d-_0x5663cd+0x1)/_0x42507d,_0x4f384f||'Linear'),_0x2d56d3=(_0x82e33c-_0xef40f*_0x5dd9fa)/(0x1-_0x5dd9fa);return _0x2d56d3+(_0xef40f-_0x2d56d3)*_0x20330c;},VisuMZ['CoreEngine'][_0x3d8782('0xf8')]=Sprite_Actor[_0x3d8782('0x3b')][_0x3d8782('0x570')],Sprite_Actor[_0x3d8782('0x3b')][_0x3d8782('0x570')]=function(_0x5cd4d5){const _0x501f8b=_0x3d8782;if(VisuMZ[_0x501f8b('0x32b')][_0x501f8b('0x5ab')]['UI'][_0x501f8b('0x33b')])this[_0x501f8b('0x5eb')](_0x5cd4d5);else{if('wSCCH'!=='iDdAp')VisuMZ[_0x501f8b('0x32b')][_0x501f8b('0xf8')][_0x501f8b('0x1c9')](this,_0x5cd4d5);else{function _0x177a12(){const _0x39b760=_0x501f8b;this[_0x39b760('0xe0')]={'SideView':_0x4109c6['optSideView'],'BattleSystem':this[_0x39b760('0x1c')](),'FontSize':_0x2fd7f5['advanced'][_0x39b760('0x214')],'Padding':0xc};}}}},Sprite_Actor['prototype']['setActorHomeRepositioned']=function(_0x23e3c2){const _0x9fcb11=_0x3d8782;let _0x18473b=Math[_0x9fcb11('0x226')](Graphics[_0x9fcb11('0x466')]/0x2+0xc0);_0x18473b-=Math[_0x9fcb11('0x14a')]((Graphics['width']-Graphics['boxWidth'])/0x2),_0x18473b+=_0x23e3c2*0x20;let _0x4b452e=Graphics['height']-0xc8-$gameParty[_0x9fcb11('0x337')]()*0x30;_0x4b452e-=Math[_0x9fcb11('0x14a')]((Graphics[_0x9fcb11('0x42d')]-Graphics[_0x9fcb11('0x32c')])/0x2),_0x4b452e+=_0x23e3c2*0x30,this['setHome'](_0x18473b,_0x4b452e);},Sprite_Actor[_0x3d8782('0x3b')][_0x3d8782('0x4f0')]=function(){const _0x4b36e2=_0x3d8782;this[_0x4b36e2('0x3b9')](0x4b0,0x0,0x78);},Sprite_Animation[_0x3d8782('0x3b')][_0x3d8782('0x4b8')]=function(_0x204774){const _0x5e1197=_0x3d8782;this[_0x5e1197('0x468')]=_0x204774;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x6d')]=Sprite_Animation[_0x3d8782('0x3b')]['processSoundTimings'],Sprite_Animation[_0x3d8782('0x3b')][_0x3d8782('0x11b')]=function(){const _0x5bc4f9=_0x3d8782;if(this[_0x5bc4f9('0x468')])return;VisuMZ[_0x5bc4f9('0x32b')]['Sprite_Animation_processSoundTimings'][_0x5bc4f9('0x1c9')](this);},Sprite_Animation[_0x3d8782('0x3b')][_0x3d8782('0x5ed')]=function(_0x39852a){const _0x1bb3e7=_0x3d8782,_0x568133=this[_0x1bb3e7('0x182')]['name'];let _0x496c6b=0x0,_0x357030=-_0x39852a['height']/0x2;;if(_0x568133[_0x1bb3e7('0x1a7')](/<(?:HEAD|HEADER|TOP)>/i))_0x357030=-_0x39852a[_0x1bb3e7('0x42d')];if(_0x568133[_0x1bb3e7('0x1a7')](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x357030=0x0;if(_0x568133[_0x1bb3e7('0x1a7')](/<(?:LEFT)>/i))_0x496c6b=-_0x39852a[_0x1bb3e7('0x466')]/0x2;if(_0x568133[_0x1bb3e7('0x1a7')](/<(?:RIGHT)>/i))_0x357030=_0x39852a[_0x1bb3e7('0x466')]/0x2;if(_0x568133[_0x1bb3e7('0x1a7')](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x496c6b=Number(RegExp['$1'])*_0x39852a[_0x1bb3e7('0x466')];if(_0x568133[_0x1bb3e7('0x1a7')](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x1bb3e7('0x26d')===_0x1bb3e7('0x26d'))_0x357030=(0x1-Number(RegExp['$1']))*-_0x39852a[_0x1bb3e7('0x42d')];else{function _0x3133ca(){const _0x420444=_0x1bb3e7,_0x995c58=_0x4eb8f3[_0x420444('0x4a1')](_0xb9780f,_0x590caf)['filter'](_0xff0fc7=>_0xff0fc7['isNormalPriority']());return _0x995c58[_0x420444('0x247')]>0x0;}}}_0x568133['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x496c6b=Number(RegExp['$1'])*_0x39852a[_0x1bb3e7('0x466')],_0x357030=(0x1-Number(RegExp['$2']))*-_0x39852a[_0x1bb3e7('0x42d')]);if(_0x568133[_0x1bb3e7('0x1a7')](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x496c6b+=Number(RegExp['$1']);if(_0x568133[_0x1bb3e7('0x1a7')](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x357030+=Number(RegExp['$1']);_0x568133[_0x1bb3e7('0x1a7')](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x496c6b+=Number(RegExp['$1']),_0x357030+=Number(RegExp['$2']));const _0x477e6c=new Point(_0x496c6b,_0x357030);return _0x39852a[_0x1bb3e7('0x27')](),_0x39852a[_0x1bb3e7('0x55c')][_0x1bb3e7('0x47e')](_0x477e6c);},Sprite_AnimationMV[_0x3d8782('0x3b')][_0x3d8782('0x4b8')]=function(_0x4a3caf){const _0x48de57=_0x3d8782;this[_0x48de57('0x468')]=_0x4a3caf;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x255')]=Sprite_AnimationMV[_0x3d8782('0x3b')][_0x3d8782('0x308')],Sprite_AnimationMV[_0x3d8782('0x3b')][_0x3d8782('0x308')]=function(_0x2e1b7e){const _0x1425e6=_0x3d8782;this['_muteSound']&&(_0x2e1b7e=JsonEx['makeDeepCopy'](_0x2e1b7e),_0x2e1b7e['se'][_0x1425e6('0x30e')]=0x0),VisuMZ[_0x1425e6('0x32b')][_0x1425e6('0x255')][_0x1425e6('0x1c9')](this,_0x2e1b7e);},Sprite_Damage[_0x3d8782('0x3b')][_0x3d8782('0x10')]=function(_0x4b6f7e){const _0x5acf92=_0x3d8782;let _0x30ab79=Math[_0x5acf92('0x2b8')](_0x4b6f7e)[_0x5acf92('0x501')]();if(this[_0x5acf92('0x292')]()){if(_0x5acf92('0x3a4')!==_0x5acf92('0x3a4')){function _0x2ac18c(){const _0x1d9672=_0x5acf92;_0x1249d4[_0x1d9672('0x256')]=_0x4757a4(_0x37feb5['$1']);if(_0x4791e6[_0x1d9672('0x256')]===0x0)_0x10e1f7[_0x1d9672('0x256')]=_0x551e39[_0x1d9672('0xdf')];}}else _0x30ab79=VisuMZ[_0x5acf92('0x3ba')](_0x30ab79);}const _0x5eade5=this[_0x5acf92('0x214')](),_0x46bee9=Math['floor'](_0x5eade5*0.75);for(let _0x2f2f4c=0x0;_0x2f2f4c<_0x30ab79[_0x5acf92('0x247')];_0x2f2f4c++){if(_0x5acf92('0x96')===_0x5acf92('0x5b9')){function _0x2e94c8(){const _0x4cac0d=_0x5acf92;_0x3bba1e[_0x4cac0d('0x32b')][_0x4cac0d('0x5be')][_0x4cac0d('0x1c9')](this);}}else{const _0x1dbe7a=this[_0x5acf92('0x5e6')](_0x46bee9,_0x5eade5);_0x1dbe7a[_0x5acf92('0x5e1')][_0x5acf92('0x2e3')](_0x30ab79[_0x2f2f4c],0x0,0x0,_0x46bee9,_0x5eade5,_0x5acf92('0x17e')),_0x1dbe7a['x']=(_0x2f2f4c-(_0x30ab79[_0x5acf92('0x247')]-0x1)/0x2)*_0x46bee9,_0x1dbe7a['dy']=-_0x2f2f4c;}}},Sprite_Damage[_0x3d8782('0x3b')][_0x3d8782('0x292')]=function(){const _0x4222c8=_0x3d8782;return VisuMZ['CoreEngine'][_0x4222c8('0x5ab')][_0x4222c8('0x59e')][_0x4222c8('0x48a')];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x406')]=Sprite_Gauge[_0x3d8782('0x3b')]['gaugeRate'],Sprite_Gauge['prototype'][_0x3d8782('0x56e')]=function(){const _0x92bdad=_0x3d8782;return VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate'][_0x92bdad('0x1c9')](this)[_0x92bdad('0x459')](0x0,0x1);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x319')]=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge[_0x3d8782('0x3b')][_0x3d8782('0x64')]=function(){const _0x5c8465=_0x3d8782;let _0x544cd3=VisuMZ['CoreEngine'][_0x5c8465('0x319')][_0x5c8465('0x1c9')](this);return _0x544cd3;},Sprite_Gauge['prototype'][_0x3d8782('0x4b0')]=function(){const _0x17d97a=_0x3d8782;let _0x18c467=this[_0x17d97a('0x64')]();this[_0x17d97a('0x292')]()&&(_0x18c467=VisuMZ['GroupDigits'](_0x18c467));const _0x5c1b1a=this['bitmapWidth']()-0x1,_0x126219=this['bitmapHeight']();this[_0x17d97a('0x27e')](),this[_0x17d97a('0x5e1')][_0x17d97a('0x2e3')](_0x18c467,0x0,0x0,_0x5c1b1a,_0x126219,_0x17d97a('0x3f7'));},Sprite_Gauge[_0x3d8782('0x3b')][_0x3d8782('0x407')]=function(){return 0x3;},Sprite_Gauge['prototype']['useDigitGrouping']=function(){const _0x2779ee=_0x3d8782;return VisuMZ[_0x2779ee('0x32b')][_0x2779ee('0x5ab')]['QoL'][_0x2779ee('0x1e0')];};function Sprite_TitlePictureButton(){const _0x26100b=_0x3d8782;this[_0x26100b('0x460')](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x3d8782('0x6c')](Sprite_Clickable[_0x3d8782('0x3b')]),Sprite_TitlePictureButton[_0x3d8782('0x3b')][_0x3d8782('0x4d0')]=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype']['initialize']=function(_0x54d60d){const _0x12cab2=_0x3d8782;Sprite_Clickable[_0x12cab2('0x3b')]['initialize'][_0x12cab2('0x1c9')](this),this[_0x12cab2('0x440')]=_0x54d60d,this[_0x12cab2('0x4f2')]=null,this[_0x12cab2('0x2a5')]();},Sprite_TitlePictureButton['prototype'][_0x3d8782('0x2a5')]=function(){const _0x1e91c4=_0x3d8782;this['x']=Graphics[_0x1e91c4('0x466')],this['y']=Graphics[_0x1e91c4('0x42d')],this[_0x1e91c4('0x3d9')]=![],this[_0x1e91c4('0x1a5')]();},Sprite_TitlePictureButton[_0x3d8782('0x3b')]['setupButtonImage']=function(){const _0x3c7874=_0x3d8782;this['bitmap']=ImageManager[_0x3c7874('0x35b')](this[_0x3c7874('0x440')][_0x3c7874('0x23d')]),this[_0x3c7874('0x5e1')][_0x3c7874('0x3be')](this[_0x3c7874('0x345')][_0x3c7874('0x3a0')](this));},Sprite_TitlePictureButton[_0x3d8782('0x3b')][_0x3d8782('0x345')]=function(){const _0x493f29=_0x3d8782;this['_data'][_0x493f29('0x4a2')][_0x493f29('0x1c9')](this),this[_0x493f29('0x440')][_0x493f29('0x4e1')][_0x493f29('0x1c9')](this),this[_0x493f29('0xa2')](this['_data'][_0x493f29('0x40f')][_0x493f29('0x3a0')](this));},Sprite_TitlePictureButton['prototype'][_0x3d8782('0x195')]=function(){const _0x4d1101=_0x3d8782;Sprite_Clickable[_0x4d1101('0x3b')]['update'][_0x4d1101('0x1c9')](this),this[_0x4d1101('0x545')](),this[_0x4d1101('0x49f')]();},Sprite_TitlePictureButton['prototype'][_0x3d8782('0x166')]=function(){const _0x505187=_0x3d8782;return VisuMZ['CoreEngine'][_0x505187('0x5ab')][_0x505187('0x558')][_0x505187('0x1a4')][_0x505187('0x5de')];},Sprite_TitlePictureButton['prototype']['updateOpacity']=function(){const _0x4465c2=_0x3d8782;this[_0x4465c2('0x3c')]?this['opacity']=0xff:(this[_0x4465c2('0x2a8')]+=this[_0x4465c2('0x3d9')]?this[_0x4465c2('0x166')]():-0x1*this[_0x4465c2('0x166')](),this[_0x4465c2('0x2a8')]=Math[_0x4465c2('0x4d5')](0xc0,this['opacity']));},Sprite_TitlePictureButton['prototype'][_0x3d8782('0xa2')]=function(_0xb37745){const _0x29e829=_0x3d8782;this[_0x29e829('0x4f2')]=_0xb37745;},Sprite_TitlePictureButton[_0x3d8782('0x3b')]['onClick']=function(){const _0x134b3d=_0x3d8782;this[_0x134b3d('0x4f2')]&&this[_0x134b3d('0x4f2')]();},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x4c4')]=Spriteset_Base['prototype'][_0x3d8782('0x460')],Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x460')]=function(){const _0x56e01d=_0x3d8782;VisuMZ[_0x56e01d('0x32b')]['Spriteset_Base_initialize'][_0x56e01d('0x1c9')](this),this[_0x56e01d('0x275')]=[];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x1ae')]=Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x5d7')],Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x5d7')]=function(_0x40c206){const _0x29a0be=_0x3d8782;this[_0x29a0be('0x30')](),VisuMZ[_0x29a0be('0x32b')][_0x29a0be('0x1ae')][_0x29a0be('0x1c9')](this,_0x40c206);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x3f4')]=Spriteset_Base['prototype'][_0x3d8782('0x195')],Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x195')]=function(){const _0xcbf566=_0x3d8782;VisuMZ['CoreEngine']['Spriteset_Base_update']['call'](this),this[_0xcbf566('0x66')](),this['updateFauxAnimations']();},Spriteset_Base['prototype'][_0x3d8782('0x66')]=function(){const _0x3524da=_0x3d8782;if(!VisuMZ[_0x3524da('0x32b')][_0x3524da('0x5ab')][_0x3524da('0x59e')][_0x3524da('0x404')])return;this['scale']['x']!==0x0&&(this[_0x3524da('0x14e')]['scale']['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this['scale']['x'])),this[_0x3524da('0x347')]['y']!==0x0&&(this[_0x3524da('0x14e')]['scale']['y']=0x1/this[_0x3524da('0x347')]['y'],this[_0x3524da('0x14e')]['y']=-(this['y']/this[_0x3524da('0x347')]['y']));},Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0xfb')]=function(){const _0x5484e9=_0x3d8782;for(const _0x5c5a28 of this[_0x5484e9('0x275')]){!_0x5c5a28[_0x5484e9('0x57b')]()&&this[_0x5484e9('0x458')](_0x5c5a28);}this[_0x5484e9('0x178')]();},Spriteset_Base['prototype'][_0x3d8782('0x178')]=function(){const _0x1ae047=_0x3d8782;for(;;){if(_0x1ae047('0x3b2')==='AfyfV'){function _0x2b834f(){_0x3ba1eb['render'](_0x5aeadc);}}else{const _0x5d7ee5=$gameTemp[_0x1ae047('0x2b')]();if(_0x5d7ee5)this[_0x1ae047('0x544')](_0x5d7ee5);else break;}}},Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x544')]=function(_0x13e682){const _0x1830c9=_0x3d8782,_0x4322eb=$dataAnimations[_0x13e682[_0x1830c9('0x3e8')]],_0x21d1c6=_0x13e682[_0x1830c9('0x515')],_0x2c4559=_0x13e682[_0x1830c9('0x363')],_0x222ed3=_0x13e682[_0x1830c9('0x120')];let _0x3d513c=this['animationBaseDelay']();const _0x8afcf6=this[_0x1830c9('0x1be')]();if(this['isAnimationForEach'](_0x4322eb)){if('Vvguq'!==_0x1830c9('0x187'))for(const _0x397a84 of _0x21d1c6){this[_0x1830c9('0x108')]([_0x397a84],_0x4322eb,_0x2c4559,_0x3d513c,_0x222ed3),_0x3d513c+=_0x8afcf6;}else{function _0x2480bd(){const _0x184b98=_0x1830c9;this[_0x184b98('0x557')]=0x2;}}}else{if(_0x1830c9('0xa')===_0x1830c9('0x57c')){function _0x4158fd(){const _0x108fe2=_0x1830c9;return _0x5bfbc1[_0x108fe2('0x12')][_0x108fe2('0x2de')][_0x108fe2('0x1c9')](this);}}else this[_0x1830c9('0x108')](_0x21d1c6,_0x4322eb,_0x2c4559,_0x3d513c,_0x222ed3);}},Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x108')]=function(_0x709c3b,_0x4563b0,_0x457462,_0x5565b2,_0x5d98f9){const _0x14e17c=_0x3d8782,_0x4b8417=this[_0x14e17c('0x31a')](_0x4563b0),_0x3dd501=new(_0x4b8417?Sprite_AnimationMV:Sprite_Animation)(),_0x577107=this['makeTargetSprites'](_0x709c3b);this[_0x14e17c('0x566')](_0x709c3b[0x0])&&(_0x457462=!_0x457462),_0x3dd501[_0x14e17c('0x4ff')]=_0x709c3b,_0x3dd501[_0x14e17c('0x2a5')](_0x577107,_0x4563b0,_0x457462,_0x5565b2),_0x3dd501['setMute'](_0x5d98f9),this[_0x14e17c('0x42')][_0x14e17c('0x5ef')](_0x3dd501),this[_0x14e17c('0x275')][_0x14e17c('0x2b3')](_0x3dd501);},Spriteset_Base['prototype'][_0x3d8782('0x458')]=function(_0x3e8fbf){const _0x29192c=_0x3d8782;this[_0x29192c('0x275')][_0x29192c('0x208')](_0x3e8fbf),this[_0x29192c('0x42')][_0x29192c('0x2e9')](_0x3e8fbf);for(const _0x1e5537 of _0x3e8fbf[_0x29192c('0x4ff')]){_0x1e5537[_0x29192c('0x5b3')]&&_0x1e5537[_0x29192c('0x5b3')]();}_0x3e8fbf['destroy']();},Spriteset_Base['prototype'][_0x3d8782('0x30')]=function(){const _0x3ec65=_0x3d8782;for(const _0x188aed of this[_0x3ec65('0x275')]){this[_0x3ec65('0x458')](_0x188aed);}},Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x26b')]=function(){const _0x39bafb=_0x3d8782;return this[_0x39bafb('0x275')][_0x39bafb('0x247')]>0x0;},VisuMZ['CoreEngine']['Spriteset_Base_updatePosition']=Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x541')],Spriteset_Base['prototype'][_0x3d8782('0x541')]=function(){const _0x4a56bf=_0x3d8782;VisuMZ[_0x4a56bf('0x32b')][_0x4a56bf('0x5ea')]['call'](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x1f5')]=function(){const _0x252a14=_0x3d8782;if(!$gameScreen)return;if($gameScreen[_0x252a14('0x3c6')]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x252a14('0x3ed')]());const _0x254b7d=$gameScreen[_0x252a14('0x45a')]();switch($gameScreen[_0x252a14('0x45a')]()){case _0x252a14('0x189'):this[_0x252a14('0xb2')]();break;case'horizontal':this[_0x252a14('0x43b')]();break;case _0x252a14('0x259'):this[_0x252a14('0x496')]();break;default:this[_0x252a14('0x455')]();break;}},Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0xb2')]=function(){const _0x162eba=_0x3d8782,_0x359bca=VisuMZ[_0x162eba('0x32b')][_0x162eba('0x5ab')][_0x162eba('0x233')];if(_0x359bca&&_0x359bca[_0x162eba('0x221')])return _0x359bca[_0x162eba('0x221')][_0x162eba('0x1c9')](this);this['x']+=Math[_0x162eba('0x226')]($gameScreen['shake']());},Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x455')]=function(){const _0x185b5d=_0x3d8782,_0x4657e2=VisuMZ[_0x185b5d('0x32b')]['Settings'][_0x185b5d('0x233')];if(_0x4657e2&&_0x4657e2[_0x185b5d('0x281')]){if(_0x185b5d('0x4aa')===_0x185b5d('0x4aa'))return _0x4657e2[_0x185b5d('0x281')][_0x185b5d('0x1c9')](this);else{function _0x4778f4(){const _0x4afe0a=_0x185b5d;if(!this['isNormalPriority']())return![];else{const _0x13a9cc=_0x5bd65b[_0x4afe0a('0x4a1')](_0x4cbc92,_0x23f4fa)['filter'](_0x333f52=>_0x333f52[_0x4afe0a('0x4a4')]());return _0x13a9cc[_0x4afe0a('0x247')]>0x0;}}}}const _0x20f4a7=$gameScreen['_shakePower']*0.75,_0x2d88a6=$gameScreen['_shakeSpeed']*0.6,_0x44ac40=$gameScreen[_0x185b5d('0x3c6')];this['x']+=Math[_0x185b5d('0x226')](Math['randomInt'](_0x20f4a7)-Math[_0x185b5d('0x463')](_0x2d88a6))*(Math[_0x185b5d('0x4d5')](_0x44ac40,0x1e)*0.5),this['y']+=Math[_0x185b5d('0x226')](Math['randomInt'](_0x20f4a7)-Math['randomInt'](_0x2d88a6))*(Math['min'](_0x44ac40,0x1e)*0.5);},Spriteset_Base[_0x3d8782('0x3b')][_0x3d8782('0x43b')]=function(){const _0x2a1204=_0x3d8782,_0x2c2919=VisuMZ[_0x2a1204('0x32b')]['Settings'][_0x2a1204('0x233')];if(_0x2c2919&&_0x2c2919[_0x2a1204('0x5e3')])return _0x2c2919['horzJS'][_0x2a1204('0x1c9')](this);const _0x23bd24=$gameScreen[_0x2a1204('0x13')]*0.75,_0x45e8a1=$gameScreen[_0x2a1204('0x159')]*0.6,_0x572df9=$gameScreen[_0x2a1204('0x3c6')];this['x']+=Math[_0x2a1204('0x226')](Math[_0x2a1204('0x463')](_0x23bd24)-Math[_0x2a1204('0x463')](_0x45e8a1))*(Math[_0x2a1204('0x4d5')](_0x572df9,0x1e)*0.5);},Spriteset_Base['prototype'][_0x3d8782('0x496')]=function(){const _0x50bb10=_0x3d8782,_0x3c96ae=VisuMZ[_0x50bb10('0x32b')][_0x50bb10('0x5ab')][_0x50bb10('0x233')];if(_0x3c96ae&&_0x3c96ae['vertJS']){if(_0x50bb10('0x462')==='TlhQE')return _0x3c96ae[_0x50bb10('0x5bd')]['call'](this);else{function _0x34cab6(){const _0x9e3fb4=_0x50bb10;return this[_0x9e3fb4('0x206')]()[_0x9e3fb4('0x47b')](_0x24acda=>this['canUse'](_0x24acda)&&this[_0x9e3fb4('0x500')]()[_0x9e3fb4('0x5ec')](_0x24acda[_0x9e3fb4('0x216')]));}}}const _0x2c17f0=$gameScreen[_0x50bb10('0x13')]*0.75,_0x9393b0=$gameScreen[_0x50bb10('0x159')]*0.6,_0x51fc1f=$gameScreen[_0x50bb10('0x3c6')];this['y']+=Math[_0x50bb10('0x226')](Math[_0x50bb10('0x463')](_0x2c17f0)-Math[_0x50bb10('0x463')](_0x9393b0))*(Math[_0x50bb10('0x4d5')](_0x51fc1f,0x1e)*0.5);},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x70')]=Spriteset_Battle['prototype'][_0x3d8782('0x25a')],Spriteset_Battle[_0x3d8782('0x3b')][_0x3d8782('0x25a')]=function(){const _0x445e4e=_0x3d8782;VisuMZ[_0x445e4e('0x32b')][_0x445e4e('0x5ab')]['UI'][_0x445e4e('0x5fb')]&&this['repositionEnemiesByResolution'](),VisuMZ[_0x445e4e('0x32b')][_0x445e4e('0x70')][_0x445e4e('0x1c9')](this);},Spriteset_Battle[_0x3d8782('0x3b')][_0x3d8782('0x1a0')]=function(){const _0x12f579=_0x3d8782;for(member of $gameTroop[_0x12f579('0x29c')]()){if(_0x12f579('0x177')!==_0x12f579('0x50f'))member[_0x12f579('0x20b')]();else{function _0x5a2aa9(){const _0x28dba0=_0x12f579;_0x305e6b[_0x28dba0('0x4d9')]=_0x185929[_0x28dba0('0x4d5')](_0x3be950(_0x2630de['$1']),_0x34a8c2[_0x28dba0('0x256')]);}}}},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x73')]=Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x460')],Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x460')]=function(_0x489291){const _0x53bd54=_0x3d8782;this['initDigitGrouping'](),VisuMZ[_0x53bd54('0x32b')][_0x53bd54('0x73')][_0x53bd54('0x1c9')](this,_0x489291),this['initCoreEasing']();},Window_Base[_0x3d8782('0x3b')]['initDigitGrouping']=function(){const _0x3413a6=_0x3d8782;this[_0x3413a6('0x5a')]=VisuMZ[_0x3413a6('0x32b')][_0x3413a6('0x5ab')][_0x3413a6('0x59e')][_0x3413a6('0x146')],this[_0x3413a6('0xa7')]=VisuMZ[_0x3413a6('0x32b')][_0x3413a6('0x5ab')][_0x3413a6('0x59e')][_0x3413a6('0x474')];},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x24f')]=function(){const _0x1dc816=_0x3d8782;return VisuMZ[_0x1dc816('0x32b')][_0x1dc816('0x5ab')][_0x1dc816('0x83')][_0x1dc816('0x4e7')];},Window_Base['prototype'][_0x3d8782('0x57')]=function(){const _0x2de553=_0x3d8782;return VisuMZ[_0x2de553('0x32b')][_0x2de553('0x5ab')]['Window'][_0x2de553('0x30f')];},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x254')]=function(){const _0xbc9456=_0x3d8782;this['backOpacity']=VisuMZ[_0xbc9456('0x32b')][_0xbc9456('0x5ab')]['Window'][_0xbc9456('0x13a')];},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x81')]=function(){const _0x3618a=_0x3d8782;return VisuMZ[_0x3618a('0x32b')][_0x3618a('0x5ab')][_0x3618a('0x83')][_0x3618a('0x3a1')];},Window_Base[_0x3d8782('0x3b')]['openingSpeed']=function(){const _0x175265=_0x3d8782;return VisuMZ['CoreEngine'][_0x175265('0x5ab')]['Window']['OpenSpeed'];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x293')]=Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x195')],Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x195')]=function(){const _0x414e4a=_0x3d8782;VisuMZ[_0x414e4a('0x32b')][_0x414e4a('0x293')][_0x414e4a('0x1c9')](this),this[_0x414e4a('0x4dd')]();},Window_Base['prototype']['updateOpen']=function(){const _0x5dc641=_0x3d8782;this['_opening']&&(this['openness']+=this[_0x5dc641('0x119')](),this['isOpen']()&&(this[_0x5dc641('0x4fd')]=![]));},Window_Base['prototype'][_0x3d8782('0x4ac')]=function(){const _0x3e1fad=_0x3d8782;if(this['_closing']){if(_0x3e1fad('0x3a5')!==_0x3e1fad('0x3a5')){function _0x1ad652(){const _0x59744b=_0x3e1fad;try{_0x51b701[_0x59744b('0x32b')][_0x59744b('0x4bd')][_0x59744b('0x1c9')](this,_0x46e8b7);}catch(_0x591f35){_0x401d65[_0x59744b('0x87')]()&&(_0x2bf24d[_0x59744b('0xad')]('Conditional\x20Branch\x20Script\x20Error'),_0x13e493[_0x59744b('0xad')](_0x591f35)),this[_0x59744b('0x1a1')]();}return!![];}}else this[_0x3e1fad('0x310')]-=this[_0x3e1fad('0x119')](),this[_0x3e1fad('0x324')]()&&(this['_closing']=![]);}},VisuMZ[_0x3d8782('0x32b')]['Window_Base_drawText']=Window_Base['prototype'][_0x3d8782('0x2e3')],Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x2e3')]=function(_0x1fd126,_0x5aa256,_0x517537,_0x345c0c,_0x25c672){const _0x2ebdce=_0x3d8782;if(this[_0x2ebdce('0x292')]())_0x1fd126=VisuMZ['GroupDigits'](_0x1fd126);VisuMZ['CoreEngine'][_0x2ebdce('0x5d6')]['call'](this,_0x1fd126,_0x5aa256,_0x517537,_0x345c0c,_0x25c672);},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x292')]=function(){return this['_digitGrouping'];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x369')]=Window_Base[_0x3d8782('0x3b')]['createTextState'],Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x38b')]=function(_0x322f51,_0x57ccc5,_0x3f6288,_0x17b6dd){const _0x35c13d=_0x3d8782;var _0x2311ac=VisuMZ[_0x35c13d('0x32b')][_0x35c13d('0x369')][_0x35c13d('0x1c9')](this,_0x322f51,_0x57ccc5,_0x3f6288,_0x17b6dd);if(this[_0x35c13d('0x27c')]())_0x2311ac[_0x35c13d('0x5cb')]=VisuMZ[_0x35c13d('0x3ba')](_0x2311ac[_0x35c13d('0x5cb')]);return _0x2311ac;},Window_Base['prototype'][_0x3d8782('0x27c')]=function(){const _0x1f0e56=_0x3d8782;return this[_0x1f0e56('0xa7')];},Window_Base[_0x3d8782('0x3b')]['enableDigitGrouping']=function(_0x13cec2){this['_digitGrouping']=_0x13cec2;},Window_Base[_0x3d8782('0x3b')]['enableDigitGroupingEx']=function(_0x15ffe9){this['_digitGroupingEx']=_0x15ffe9;},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x296')]=Window_Base['prototype']['textSizeEx'],Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x118')]=function(_0x3fa86f){const _0x21a6f8=_0x3d8782;return this[_0x21a6f8('0x2a9')]=this[_0x21a6f8('0x2a9')]||{},!this[_0x21a6f8('0x2a9')][_0x3fa86f]&&(this['_CoreEngine_Cache_textSizeEx'][_0x3fa86f]=VisuMZ['CoreEngine']['Window_Base_textSizeEx'][_0x21a6f8('0x1c9')](this,_0x3fa86f)),this['_CoreEngine_Cache_textSizeEx'][_0x3fa86f];},Window_Base['prototype'][_0x3d8782('0x4f1')]=function(){const _0x3ded88=_0x3d8782;this[_0x3ded88('0x14f')]={'duration':0x0,'wholeDuration':0x0,'type':_0x3ded88('0x5c0'),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x3ded88('0x347')]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x3ded88('0x1d4')],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x3d8782('0x3b')]['updateCoreEasing']=function(){const _0x339871=_0x3d8782;if(!this[_0x339871('0x14f')])return;if(this['_coreEasing']['duration']<=0x0)return;this['x']=this[_0x339871('0x352')](this['x'],this['_coreEasing'][_0x339871('0x339')]),this['y']=this['applyCoreEasing'](this['y'],this[_0x339871('0x14f')][_0x339871('0x4f9')]),this['scale']['x']=this[_0x339871('0x352')](this[_0x339871('0x347')]['x'],this[_0x339871('0x14f')][_0x339871('0x26')]),this[_0x339871('0x347')]['y']=this[_0x339871('0x352')](this[_0x339871('0x347')]['y'],this['_coreEasing'][_0x339871('0x4b1')]),this['opacity']=this[_0x339871('0x352')](this[_0x339871('0x2a8')],this[_0x339871('0x14f')][_0x339871('0xdc')]),this['backOpacity']=this['applyCoreEasing'](this[_0x339871('0x1d4')],this[_0x339871('0x14f')][_0x339871('0x2a')]),this['contentsOpacity']=this[_0x339871('0x352')](this[_0x339871('0x3ad')],this[_0x339871('0x14f')][_0x339871('0x21')]),this[_0x339871('0x14f')][_0x339871('0x1c8')]--;},Window_Base['prototype'][_0x3d8782('0x352')]=function(_0x55f12c,_0x4409be){const _0x1cffc7=_0x3d8782;if(!this[_0x1cffc7('0x14f')])return _0x4409be;const _0x31dd18=this['_coreEasing'][_0x1cffc7('0x1c8')],_0x11753c=this['_coreEasing'][_0x1cffc7('0x2fc')],_0x8dcd60=this[_0x1cffc7('0x490')]((_0x11753c-_0x31dd18)/_0x11753c),_0x53aeb6=this['calcCoreEasing']((_0x11753c-_0x31dd18+0x1)/_0x11753c),_0x12cda7=(_0x55f12c-_0x4409be*_0x8dcd60)/(0x1-_0x8dcd60);return _0x12cda7+(_0x4409be-_0x12cda7)*_0x53aeb6;},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x490')]=function(_0x49bb5d){const _0x55092d=_0x3d8782;if(!this[_0x55092d('0x14f')])return _0x49bb5d;return VisuMZ[_0x55092d('0x135')](_0x49bb5d,this['_coreEasing'][_0x55092d('0x42c')]||_0x55092d('0x5c0'));},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x93')]=function(_0x37ae14,_0x4660bc){const _0x3c4244=_0x3d8782;if(!this['_coreEasing'])return;this['x']=this[_0x3c4244('0x14f')][_0x3c4244('0x339')],this['y']=this[_0x3c4244('0x14f')][_0x3c4244('0x4f9')],this[_0x3c4244('0x347')]['x']=this[_0x3c4244('0x14f')][_0x3c4244('0x26')],this[_0x3c4244('0x347')]['y']=this[_0x3c4244('0x14f')]['targetScaleY'],this[_0x3c4244('0x2a8')]=this['_coreEasing']['targetOpacity'],this[_0x3c4244('0x1d4')]=this['_coreEasing'][_0x3c4244('0x2a')],this[_0x3c4244('0x3ad')]=this[_0x3c4244('0x14f')][_0x3c4244('0x21')],this[_0x3c4244('0x461')](_0x37ae14,_0x4660bc,this['x'],this['y'],this[_0x3c4244('0x347')]['x'],this[_0x3c4244('0x347')]['y'],this[_0x3c4244('0x2a8')],this['backOpacity'],this[_0x3c4244('0x3ad')]);},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x461')]=function(_0x1b10de,_0x4cb2d0,_0x2860dd,_0x8b0930,_0x49c043,_0x59cc07,_0x56dabc,_0x519aaf,_0x36b266){this['_coreEasing']={'duration':_0x1b10de,'wholeDuration':_0x1b10de,'type':_0x4cb2d0,'targetX':_0x2860dd,'targetY':_0x8b0930,'targetScaleX':_0x49c043,'targetScaleY':_0x59cc07,'targetOpacity':_0x56dabc,'targetBackOpacity':_0x519aaf,'targetContentsOpacity':_0x36b266};},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x29')]=function(_0x581ab4,_0x580517,_0x17aa56,_0x226c47,_0x213473){const _0x767503=_0x3d8782;this['resetFontSettings'](),this[_0x767503('0x41')][_0x767503('0x214')]=VisuMZ['CoreEngine'][_0x767503('0x5ab')][_0x767503('0x126')][_0x767503('0xfe')];const _0x28c6e1=VisuMZ['CoreEngine'][_0x767503('0x5ab')][_0x767503('0x126')]['GoldIcon'];if(_0x28c6e1>0x0&&_0x580517===TextManager[_0x767503('0x432')]){const _0x37f54e=_0x226c47+(this[_0x767503('0x24f')]()-ImageManager[_0x767503('0x288')])/0x2;this[_0x767503('0x14b')](_0x28c6e1,_0x17aa56+(_0x213473-ImageManager[_0x767503('0xd4')]),_0x37f54e),_0x213473-=ImageManager[_0x767503('0xd4')]+0x4;}else{if(_0x767503('0x400')===_0x767503('0x2fb')){function _0x7a7e39(){for(const _0x55c670 of this['_fauxAnimationSprites']){this['removeFauxAnimation'](_0x55c670);}}}else this[_0x767503('0xd9')](ColorManager['systemColor']()),this[_0x767503('0x2e3')](_0x580517,_0x17aa56,_0x226c47,_0x213473,_0x767503('0x3f7')),_0x213473-=this[_0x767503('0x55')](_0x580517)+0x6;}this[_0x767503('0x31d')]();const _0x3a8269=this[_0x767503('0x55')](this[_0x767503('0x5a')]?VisuMZ['GroupDigits'](_0x581ab4):_0x581ab4);if(_0x3a8269>_0x213473){if('SteQF'!==_0x767503('0x34e'))this[_0x767503('0x2e3')](VisuMZ[_0x767503('0x32b')]['Settings']['Gold'][_0x767503('0x133')],_0x17aa56,_0x226c47,_0x213473,_0x767503('0x3f7'));else{function _0x3021c1(){const _0x3c2195=_0x767503;this[_0x3c2195('0x14b')](_0x13423e,_0x548ebc+0x2,_0x56f816+0x2),_0x404c88-=_0x593418[_0x3c2195('0xd4')]+0x4,_0x5ef346+=_0x3ad037[_0x3c2195('0xd4')]+0x4;}}}else{if(_0x767503('0x54e')===_0x767503('0x54e'))this[_0x767503('0x2e3')](_0x581ab4,_0x17aa56,_0x226c47,_0x213473,'right');else{function _0x3c56e5(){var _0x5c7e5b=_0x1cf580(_0x1c43f1['$1'])/0x64;_0x16494c+=_0x5c7e5b;}}}this[_0x767503('0x48d')]();},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x1ce')]=function(_0x47d960,_0x326734,_0x306988,_0x5a7334,_0x193db5){const _0x12d9d1=_0x3d8782,_0x488b60=ImageManager[_0x12d9d1('0x2ec')](_0x12d9d1('0x4c1')),_0x37c2c5=ImageManager[_0x12d9d1('0xd4')],_0x112c3b=ImageManager[_0x12d9d1('0x288')],_0x3559a2=_0x47d960%0x10*_0x37c2c5,_0x21984f=Math[_0x12d9d1('0x14a')](_0x47d960/0x10)*_0x112c3b,_0x25d82b=_0x5a7334,_0x287c0d=_0x5a7334;this[_0x12d9d1('0x41')]['_context'][_0x12d9d1('0x433')]=_0x193db5,this[_0x12d9d1('0x41')][_0x12d9d1('0x375')](_0x488b60,_0x3559a2,_0x21984f,_0x37c2c5,_0x112c3b,_0x326734,_0x306988,_0x25d82b,_0x287c0d),this[_0x12d9d1('0x41')][_0x12d9d1('0x331')][_0x12d9d1('0x433')]=!![];},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x485')]=function(_0x300bcf,_0x3c86ff,_0x104e09,_0x109a26,_0x139c72,_0xafaecd){const _0x3223bc=_0x3d8782,_0x300e90=Math[_0x3223bc('0x14a')]((_0x104e09-0x2)*_0x109a26),_0xe1e286=Sprite_Gauge['prototype'][_0x3223bc('0x535')]['call'](this),_0xd92e5e=_0x3c86ff+this[_0x3223bc('0x24f')]()-_0xe1e286-0x2;this[_0x3223bc('0x41')]['fillRect'](_0x300bcf,_0xd92e5e,_0x104e09,_0xe1e286,ColorManager[_0x3223bc('0x37c')]()),this[_0x3223bc('0x41')]['gradientFillRect'](_0x300bcf+0x1,_0xd92e5e+0x1,_0x300e90,_0xe1e286-0x2,_0x139c72,_0xafaecd);},Window_Selectable['prototype'][_0x3d8782('0x3fe')]=function(_0x2c0fea){const _0x31bb01=_0x3d8782;let _0x4fd69e=this[_0x31bb01('0x333')]();const _0x99e702=this[_0x31bb01('0x101')](),_0x3e799c=this['maxCols']();if(this['isUseModernControls']()&&(_0x4fd69e<_0x99e702||_0x2c0fea&&_0x3e799c===0x1)){if('ZUPey'!=='ilWnb'){_0x4fd69e+=_0x3e799c;if(_0x4fd69e>=_0x99e702)_0x4fd69e=_0x99e702-0x1;this[_0x31bb01('0x481')](_0x4fd69e);}else{function _0x19fbf6(){const _0x56a598=_0x31bb01;_0x45a4b0[_0x56a598('0x32b')][_0x56a598('0x2ff')][_0x56a598('0x1c9')](this),this[_0x56a598('0x37e')]={'x':0x0,'y':0x0},this[_0x56a598('0x23a')]={'x':0x0,'y':0x0};}}}else!this[_0x31bb01('0x2f')]()&&((_0x4fd69e<_0x99e702-_0x3e799c||_0x2c0fea&&_0x3e799c===0x1)&&this[_0x31bb01('0x481')]((_0x4fd69e+_0x3e799c)%_0x99e702));},Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x2f')]=function(){const _0x242182=_0x3d8782;return VisuMZ['CoreEngine'][_0x242182('0x5ab')]['QoL'][_0x242182('0x61')];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x77')]=Window_Selectable[_0x3d8782('0x3b')]['processCursorMove'],Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x56f')]=function(){const _0x45b1ff=_0x3d8782;this[_0x45b1ff('0x2f')]()?(this[_0x45b1ff('0x3ca')](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x45b1ff('0x32b')][_0x45b1ff('0x77')][_0x45b1ff('0x1c9')](this);},Window_Selectable['prototype'][_0x3d8782('0x3ca')]=function(){const _0x3aa086=_0x3d8782;if(this['isCursorMovable']()){if(_0x3aa086('0x3b4')===_0x3aa086('0x3b4')){const _0x212443=this[_0x3aa086('0x333')]();if(Input[_0x3aa086('0x48')]('down')){if(Input[_0x3aa086('0x448')]('shift'))this['cursorPagedown']();else{if(_0x3aa086('0x58f')!==_0x3aa086('0x58f')){function _0x48ca7b(){const _0x4a6ebc=_0x3aa086;this[_0x4a6ebc('0x5b')]='SV';}}else this['cursorDown'](Input['isTriggered'](_0x3aa086('0x422')));}}Input['isRepeated']('up')&&(Input['isPressed'](_0x3aa086('0x1b0'))?this[_0x3aa086('0x1ab')]():this[_0x3aa086('0x5aa')](Input['isTriggered']('up')));Input[_0x3aa086('0x48')](_0x3aa086('0x3f7'))&&this[_0x3aa086('0x286')](Input[_0x3aa086('0xf5')](_0x3aa086('0x3f7')));Input[_0x3aa086('0x48')](_0x3aa086('0x41f'))&&this[_0x3aa086('0xf2')](Input['isTriggered'](_0x3aa086('0x41f')));!this['isHandled']('pagedown')&&Input[_0x3aa086('0x48')](_0x3aa086('0x176'))&&this['cursorPagedown']();if(!this[_0x3aa086('0x47d')]('pageup')&&Input[_0x3aa086('0x48')](_0x3aa086('0x1b4'))){if(_0x3aa086('0x1b3')===_0x3aa086('0x349')){function _0x46e015(){var _0x34ea5b=_0x2dcad8(_0x49bd4d['$1'])/0x64;_0x51637a*=_0x34ea5b;}}else this[_0x3aa086('0x1ab')]();}this[_0x3aa086('0x333')]()!==_0x212443&&this[_0x3aa086('0xae')]();}else{function _0x29c3bf(){const _0x50abc4=_0x3aa086;return this[_0x50abc4('0x475')]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x50abc4('0x5ec')](this[_0x50abc4('0x475')])?_0x319cdc[_0x50abc4('0x32b')][_0x50abc4('0x335')]['call'](this,_0xa4c162):_0x55ee56[_0x50abc4('0x135')](_0x240e51,this['_coreEasingType']);}}}},VisuMZ['CoreEngine'][_0x3d8782('0x3c3')]=Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x3fe')],Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x3fe')]=function(_0x1eaae6){const _0x46c247=_0x3d8782;if(this['isUseModernControls']()&&_0x1eaae6&&this['maxCols']()===0x1&&this['index']()===this['maxItems']()-0x1)this['smoothSelect'](0x0);else{if(_0x46c247('0x5f2')===_0x46c247('0x5f2'))VisuMZ[_0x46c247('0x32b')][_0x46c247('0x3c3')][_0x46c247('0x1c9')](this,_0x1eaae6);else{function _0x493ff7(){this['makeDocumentTitle']();}}}},Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x3ab')]=function(){const _0x382e34=_0x3d8782;if(this['isCursorMovable']()){const _0x55185e=this[_0x382e34('0x333')]();if(Input['isTriggered'](_0x382e34('0x49a'))){if('UIVRo'!==_0x382e34('0x12d'))this[_0x382e34('0x481')](Math[_0x382e34('0x4d5')](this[_0x382e34('0x333')](),0x0));else{function _0x40fd89(){const _0xacc54f=_0x382e34;_0x3f9d14[_0xacc54f('0x32b')][_0xacc54f('0x7b')][_0xacc54f('0x1c9')](this,_0x107516,_0x286853,_0x2e25b0,_0x255806,_0x81f872,_0xdba4d,_0x220668),this[_0xacc54f('0x7d')]();}}}Input[_0x382e34('0xf5')](_0x382e34('0x37d'))&&this[_0x382e34('0x481')](Math['max'](this[_0x382e34('0x333')](),this[_0x382e34('0x101')]()-0x1));if(this[_0x382e34('0x333')]()!==_0x55185e){if(_0x382e34('0x307')!==_0x382e34('0x5da'))this[_0x382e34('0xae')]();else{function _0x73af99(){const _0x525801=_0x382e34;return _0x5dfc37[_0x525801('0x12')][_0x525801('0x290')][_0x525801('0x1c9')](this);}}}}},VisuMZ['CoreEngine']['Window_Selectable_processTouch']=Window_Selectable['prototype'][_0x3d8782('0x49f')],Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x49f')]=function(){const _0x58a50a=_0x3d8782;this['isUseModernControls']()?this[_0x58a50a('0x5cf')]():VisuMZ[_0x58a50a('0x32b')][_0x58a50a('0x115')][_0x58a50a('0x1c9')](this);},Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x5cf')]=function(){const _0x114057=_0x3d8782;VisuMZ[_0x114057('0x32b')]['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x3d8782('0x3b')]['colSpacing']=function(){const _0x4dbedd=_0x3d8782;return VisuMZ[_0x4dbedd('0x32b')][_0x4dbedd('0x5ab')][_0x4dbedd('0x83')]['ColSpacing'];},Window_Selectable[_0x3d8782('0x3b')]['rowSpacing']=function(){const _0x77e119=_0x3d8782;return VisuMZ[_0x77e119('0x32b')][_0x77e119('0x5ab')][_0x77e119('0x83')][_0x77e119('0x50e')];},Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x393')]=function(){const _0x232327=_0x3d8782;return Window_Scrollable[_0x232327('0x3b')][_0x232327('0x393')][_0x232327('0x1c9')](this)+VisuMZ[_0x232327('0x32b')][_0x232327('0x5ab')]['Window'][_0x232327('0x16a')];;},VisuMZ[_0x3d8782('0x32b')]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x3d8782('0x3b')]['drawBackgroundRect'],Window_Selectable[_0x3d8782('0x3b')][_0x3d8782('0x4ef')]=function(_0x50441f){const _0x15ce23=_0x3d8782,_0x475646=VisuMZ[_0x15ce23('0x32b')]['Settings'][_0x15ce23('0x83')];if(_0x475646[_0x15ce23('0x231')]===![])return;if(_0x475646['DrawItemBackgroundJS'])_0x475646[_0x15ce23('0x5a9')]['call'](this,_0x50441f);else{if(_0x15ce23('0x198')===_0x15ce23('0x198'))VisuMZ[_0x15ce23('0x32b')][_0x15ce23('0x4cc')]['call'](this,_0x50441f);else{function _0x54ae30(){var _0x2f84a2=_0x182af6(_0x105d7c['$1']);_0xc1b2ba+=_0x2f84a2;}}}},VisuMZ[_0x3d8782('0x32b')]['Window_Gold_refresh']=Window_Gold[_0x3d8782('0x3b')][_0x3d8782('0x2ad')],Window_Gold[_0x3d8782('0x3b')][_0x3d8782('0x2ad')]=function(){const _0x3c234e=_0x3d8782;this[_0x3c234e('0x4f3')]()?this['drawGoldItemStyle']():VisuMZ[_0x3c234e('0x32b')][_0x3c234e('0x241')][_0x3c234e('0x1c9')](this);},Window_Gold[_0x3d8782('0x3b')]['isItemStyle']=function(){const _0x2f9106=_0x3d8782;if(TextManager[_0x2f9106('0x432')]!==this[_0x2f9106('0x432')]())return![];return VisuMZ['CoreEngine'][_0x2f9106('0x5ab')][_0x2f9106('0x126')][_0x2f9106('0x464')];},Window_Gold['prototype']['drawGoldItemStyle']=function(){const _0x1b813a=_0x3d8782;this[_0x1b813a('0x48d')](),this[_0x1b813a('0x41')][_0x1b813a('0x4d4')](),this[_0x1b813a('0x41')][_0x1b813a('0x214')]=VisuMZ['CoreEngine']['Settings'][_0x1b813a('0x126')][_0x1b813a('0xfe')];const _0x1ebb00=VisuMZ[_0x1b813a('0x32b')][_0x1b813a('0x5ab')][_0x1b813a('0x126')][_0x1b813a('0x29a')],_0x2c203d=this['itemLineRect'](0x0);if(_0x1ebb00>0x0){const _0x2c7994=_0x2c203d['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x1ebb00,_0x2c203d['x'],_0x2c7994);const _0x1415bc=ImageManager[_0x1b813a('0xd4')]+0x4;_0x2c203d['x']+=_0x1415bc,_0x2c203d[_0x1b813a('0x466')]-=_0x1415bc;}this[_0x1b813a('0xd9')](ColorManager[_0x1b813a('0x37a')]()),this[_0x1b813a('0x2e3')](this[_0x1b813a('0x432')](),_0x2c203d['x'],_0x2c203d['y'],_0x2c203d['width'],_0x1b813a('0x41f'));const _0x1a3904=this[_0x1b813a('0x55')](this[_0x1b813a('0x432')]())+0x6;;_0x2c203d['x']+=_0x1a3904,_0x2c203d[_0x1b813a('0x466')]-=_0x1a3904,this[_0x1b813a('0x31d')]();const _0x5cc219=this[_0x1b813a('0xb')](),_0x2f3702=this['textWidth'](this['_digitGrouping']?VisuMZ['GroupDigits'](this[_0x1b813a('0xb')]()):this[_0x1b813a('0xb')]());if(_0x2f3702>_0x2c203d[_0x1b813a('0x466')]){if(_0x1b813a('0x11e')!==_0x1b813a('0x11e')){function _0x58c236(){return!![];}}else this[_0x1b813a('0x2e3')](VisuMZ[_0x1b813a('0x32b')][_0x1b813a('0x5ab')][_0x1b813a('0x126')][_0x1b813a('0x133')],_0x2c203d['x'],_0x2c203d['y'],_0x2c203d[_0x1b813a('0x466')],_0x1b813a('0x3f7'));}else this[_0x1b813a('0x2e3')](this['value'](),_0x2c203d['x'],_0x2c203d['y'],_0x2c203d[_0x1b813a('0x466')],_0x1b813a('0x3f7'));this['resetFontSettings']();},Window_StatusBase['prototype'][_0x3d8782('0xed')]=function(_0xb9fc6d,_0x5b2387,_0x46b35d,_0x113c83,_0x2e45cb){const _0x3caa4d=_0x3d8782;_0x113c83=String(_0x113c83||'')['toUpperCase']();if(VisuMZ[_0x3caa4d('0x32b')][_0x3caa4d('0x5ab')][_0x3caa4d('0x58')]['DrawIcons']){const _0x443db2=VisuMZ[_0x3caa4d('0x3f9')](_0x113c83);_0x2e45cb?(this[_0x3caa4d('0x1ce')](_0x443db2,_0xb9fc6d,_0x5b2387,this['gaugeLineHeight']()),_0x46b35d-=this[_0x3caa4d('0x5d4')]()+0x2,_0xb9fc6d+=this['gaugeLineHeight']()+0x2):(this[_0x3caa4d('0x14b')](_0x443db2,_0xb9fc6d+0x2,_0x5b2387+0x2),_0x46b35d-=ImageManager[_0x3caa4d('0xd4')]+0x4,_0xb9fc6d+=ImageManager[_0x3caa4d('0xd4')]+0x4);}const _0x3e039b=TextManager['param'](_0x113c83);this[_0x3caa4d('0x48d')](),this[_0x3caa4d('0xd9')](ColorManager[_0x3caa4d('0x37a')]()),_0x2e45cb?(this[_0x3caa4d('0x41')]['fontSize']=this[_0x3caa4d('0x279')](),this['contents'][_0x3caa4d('0x2e3')](_0x3e039b,_0xb9fc6d,_0x5b2387,_0x46b35d,this[_0x3caa4d('0x5d4')](),_0x3caa4d('0x41f'))):this['drawText'](_0x3e039b,_0xb9fc6d,_0x5b2387,_0x46b35d),this[_0x3caa4d('0x48d')]();},Window_StatusBase[_0x3d8782('0x3b')][_0x3d8782('0x279')]=function(){const _0x4a6b08=_0x3d8782;return $gameSystem[_0x4a6b08('0x351')]()-0x8;},Window_StatusBase[_0x3d8782('0x3b')][_0x3d8782('0x35f')]=function(_0x3fe451,_0x8cc33b,_0x177d62,_0x59944e){const _0x1c3a60=_0x3d8782;_0x59944e=_0x59944e||0xa8,this[_0x1c3a60('0x31d')]();if(VisuMZ[_0x1c3a60('0x32b')]['Settings']['UI'][_0x1c3a60('0x19c')])this['drawTextEx'](_0x3fe451[_0x1c3a60('0x174')]()[_0x1c3a60('0x439')],_0x8cc33b,_0x177d62,_0x59944e);else{const _0x467b88=_0x3fe451[_0x1c3a60('0x174')]()[_0x1c3a60('0x439')]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x1c3a60('0x2e3')](_0x467b88,_0x8cc33b,_0x177d62,_0x59944e);}},Window_StatusBase['prototype']['drawActorNickname']=function(_0x1cdbcb,_0x3d2e2c,_0x3e28a8,_0x105983){const _0x101f1f=_0x3d8782;_0x105983=_0x105983||0x10e,this['resetTextColor']();if(VisuMZ['CoreEngine'][_0x101f1f('0x5ab')]['UI'][_0x101f1f('0x1fb')])this[_0x101f1f('0x2aa')](_0x1cdbcb[_0x101f1f('0x63')](),_0x3d2e2c,_0x3e28a8,_0x105983);else{const _0x193a2d=_0x1cdbcb[_0x101f1f('0x63')]()[_0x101f1f('0x31b')](/\\I\[(\d+)\]/gi,'');this[_0x101f1f('0x2e3')](_0x1cdbcb[_0x101f1f('0x63')](),_0x3d2e2c,_0x3e28a8,_0x105983);}},VisuMZ['CoreEngine'][_0x3d8782('0x2c0')]=Window_StatusBase[_0x3d8782('0x3b')][_0x3d8782('0x28e')],Window_StatusBase[_0x3d8782('0x3b')][_0x3d8782('0x28e')]=function(_0xb8448d,_0x45f0ce,_0x59ac0d){const _0x3c967d=_0x3d8782;if(this[_0x3c967d('0x5bb')]())this[_0x3c967d('0x4cb')](_0xb8448d,_0x45f0ce,_0x59ac0d);VisuMZ[_0x3c967d('0x32b')][_0x3c967d('0x2c0')][_0x3c967d('0x1c9')](this,_0xb8448d,_0x45f0ce,_0x59ac0d);},Window_StatusBase['prototype'][_0x3d8782('0x5bb')]=function(){const _0x16fe6e=_0x3d8782;return VisuMZ[_0x16fe6e('0x32b')][_0x16fe6e('0x5ab')]['UI'][_0x16fe6e('0x391')];},Window_StatusBase[_0x3d8782('0x3b')][_0x3d8782('0x4cb')]=function(_0x3a95d6,_0x47c6f6,_0x2d413b){const _0xfbdb5e=_0x3d8782;if(!_0x3a95d6)return;if(!_0x3a95d6['isActor']())return;const _0x4451a5=0x80,_0x2cbd84=_0x3a95d6['expRate']();let _0x57ea43=ColorManager[_0xfbdb5e('0x143')](),_0x4bbf42=ColorManager[_0xfbdb5e('0x343')]();_0x2cbd84>=0x1&&(_0x57ea43=ColorManager['maxLvGaugeColor1'](),_0x4bbf42=ColorManager[_0xfbdb5e('0x1eb')]()),this['drawGauge'](_0x47c6f6,_0x2d413b,_0x4451a5,_0x2cbd84,_0x57ea43,_0x4bbf42);},Window_EquipStatus[_0x3d8782('0x3b')][_0x3d8782('0x530')]=function(){const _0x5a46b4=_0x3d8782;let _0x493088=0x0;for(const _0x4401c0 of VisuMZ[_0x5a46b4('0x32b')][_0x5a46b4('0x5ab')][_0x5a46b4('0x58')]['DisplayedParams']){const _0x3ebe9b=this[_0x5a46b4('0x57')](),_0x2af259=this[_0x5a46b4('0x470')](_0x493088);this['drawItem'](_0x3ebe9b,_0x2af259,_0x4401c0),_0x493088++;}},Window_EquipStatus[_0x3d8782('0x3b')][_0x3d8782('0x3a8')]=function(_0x3e8389,_0x2bb623,_0x3644d0){const _0x360e75=_0x3d8782,_0x1554a9=this[_0x360e75('0x504')]()-this[_0x360e75('0x57')]()*0x2;this[_0x360e75('0xed')](_0x3e8389,_0x2bb623,_0x1554a9,_0x3644d0,![]);},Window_EquipStatus[_0x3d8782('0x3b')][_0x3d8782('0xaf')]=function(_0x20d4f8,_0x128846,_0x64e20f){const _0x26d046=_0x3d8782,_0x4e200b=this['paramWidth']();this['resetTextColor'](),this['drawText'](this[_0x26d046('0x300')][_0x26d046('0x38c')](_0x64e20f,!![]),_0x20d4f8,_0x128846,_0x4e200b,_0x26d046('0x3f7'));},Window_EquipStatus['prototype'][_0x3d8782('0xd7')]=function(_0x4e9d73,_0x3c2c44){const _0x5f219e=_0x3d8782,_0x24efb5=this[_0x5f219e('0x2db')]();this[_0x5f219e('0xd9')](ColorManager['systemColor']());const _0x28bade=VisuMZ[_0x5f219e('0x32b')][_0x5f219e('0x5ab')]['UI'][_0x5f219e('0x165')];this[_0x5f219e('0x2e3')](_0x28bade,_0x4e9d73,_0x3c2c44,_0x24efb5,_0x5f219e('0x17e'));},Window_EquipStatus[_0x3d8782('0x3b')][_0x3d8782('0x405')]=function(_0x4f7c52,_0x54c9d0,_0x4a2a0d){const _0x2f0edc=_0x3d8782,_0x3e7d8e=this['paramWidth'](),_0x610b97=this[_0x2f0edc('0x57a')][_0x2f0edc('0x38c')](_0x4a2a0d),_0xca5ab=_0x610b97-this[_0x2f0edc('0x300')]['paramValueByName'](_0x4a2a0d);this[_0x2f0edc('0xd9')](ColorManager[_0x2f0edc('0x50d')](_0xca5ab)),this[_0x2f0edc('0x2e3')](VisuMZ[_0x2f0edc('0x91')](_0x610b97,0x0),_0x4f7c52,_0x54c9d0,_0x3e7d8e,'right');},Window_StatusParams['prototype'][_0x3d8782('0x101')]=function(){const _0x260e8c=_0x3d8782;return VisuMZ[_0x260e8c('0x32b')][_0x260e8c('0x5ab')][_0x260e8c('0x58')]['DisplayedParams'][_0x260e8c('0x247')];},Window_StatusParams['prototype'][_0x3d8782('0x160')]=function(_0x2701da){const _0x4e41d2=_0x3d8782,_0x5ae031=this[_0x4e41d2('0x2a0')](_0x2701da),_0x57fdea=VisuMZ[_0x4e41d2('0x32b')][_0x4e41d2('0x5ab')][_0x4e41d2('0x58')][_0x4e41d2('0x5')][_0x2701da],_0x11dbfb=TextManager['param'](_0x57fdea),_0x58ff6c=this[_0x4e41d2('0x300')][_0x4e41d2('0x38c')](_0x57fdea,!![]);this[_0x4e41d2('0xed')](_0x5ae031['x'],_0x5ae031['y'],0xa0,_0x57fdea,![]),this[_0x4e41d2('0x31d')](),this[_0x4e41d2('0x2e3')](_0x58ff6c,_0x5ae031['x']+0xa0,_0x5ae031['y'],0x3c,_0x4e41d2('0x3f7'));},VisuMZ['CoreEngine'][_0x3d8782('0xb9')]=Window_ShopSell['prototype'][_0x3d8782('0xc8')],Window_ShopSell[_0x3d8782('0x3b')][_0x3d8782('0xc8')]=function(_0x5b052c){const _0x1ebdb3=_0x3d8782;return VisuMZ[_0x1ebdb3('0x32b')][_0x1ebdb3('0x5ab')][_0x1ebdb3('0x59e')][_0x1ebdb3('0x16c')]&&DataManager[_0x1ebdb3('0x121')](_0x5b052c)?![]:VisuMZ[_0x1ebdb3('0x32b')][_0x1ebdb3('0xb9')][_0x1ebdb3('0x1c9')](this,_0x5b052c);},Window_NumberInput['prototype'][_0x3d8782('0x2f')]=function(){return![];},Window_TitleCommand[_0x3d8782('0x2da')]=VisuMZ[_0x3d8782('0x32b')]['Settings'][_0x3d8782('0x521')],Window_TitleCommand[_0x3d8782('0x3b')][_0x3d8782('0x37b')]=function(){const _0x4358d0=_0x3d8782;this[_0x4358d0('0x202')]();},Window_TitleCommand[_0x3d8782('0x3b')][_0x3d8782('0x202')]=function(){const _0x19c35e=_0x3d8782;for(const _0x418556 of Window_TitleCommand['_commandList']){if(_0x19c35e('0x3dd')!==_0x19c35e('0x367')){if(_0x418556['ShowJS'][_0x19c35e('0x1c9')](this)){const _0x32c6de=_0x418556[_0x19c35e('0x43e')];let _0x58e13e=_0x418556['TextStr'];if(['',_0x19c35e('0x43a')][_0x19c35e('0x5ec')](_0x58e13e))_0x58e13e=_0x418556[_0x19c35e('0x538')]['call'](this);const _0x2cfb66=_0x418556[_0x19c35e('0x577')][_0x19c35e('0x1c9')](this),_0x4fd0d2=_0x418556[_0x19c35e('0x317')]['call'](this);this[_0x19c35e('0x25c')](_0x58e13e,_0x32c6de,_0x2cfb66,_0x4fd0d2),this['setHandler'](_0x32c6de,_0x418556['CallHandlerJS'][_0x19c35e('0x3a0')](this,_0x4fd0d2));}}else{function _0x4fa402(){const _0x24302b=_0x19c35e;_0x54d09f[_0x24302b('0x32b')][_0x24302b('0x1e4')][_0x24302b('0x1c9')](this);}}}},Window_GameEnd[_0x3d8782('0x2da')]=VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x5ab')]['MenuLayout'][_0x3d8782('0x2ea')][_0x3d8782('0xc')],Window_GameEnd['prototype']['makeCommandList']=function(){const _0x196c11=_0x3d8782;this[_0x196c11('0x202')]();},Window_GameEnd[_0x3d8782('0x3b')][_0x3d8782('0x202')]=function(){const _0x529f3c=_0x3d8782;for(const _0x374684 of Window_GameEnd['_commandList']){if(_0x374684['ShowJS'][_0x529f3c('0x1c9')](this)){const _0x3514c0=_0x374684[_0x529f3c('0x43e')];let _0x3401cb=_0x374684['TextStr'];if(['',_0x529f3c('0x43a')][_0x529f3c('0x5ec')](_0x3401cb))_0x3401cb=_0x374684[_0x529f3c('0x538')]['call'](this);const _0x37ddc1=_0x374684[_0x529f3c('0x577')][_0x529f3c('0x1c9')](this),_0x69fa94=_0x374684[_0x529f3c('0x317')][_0x529f3c('0x1c9')](this);this['addCommand'](_0x3401cb,_0x3514c0,_0x37ddc1,_0x69fa94),this[_0x529f3c('0x12e')](_0x3514c0,_0x374684[_0x529f3c('0x40f')][_0x529f3c('0x3a0')](this,_0x69fa94));}}};function Window_ButtonAssist(){const _0xf76881=_0x3d8782;this[_0xf76881('0x460')](...arguments);}Window_ButtonAssist[_0x3d8782('0x3b')]=Object[_0x3d8782('0x6c')](Window_Base[_0x3d8782('0x3b')]),Window_ButtonAssist[_0x3d8782('0x3b')][_0x3d8782('0x4d0')]=Window_ButtonAssist,Window_ButtonAssist[_0x3d8782('0x3b')]['initialize']=function(_0x5e4c88){const _0xabf9a=_0x3d8782;this[_0xabf9a('0x440')]={},Window_Base[_0xabf9a('0x3b')][_0xabf9a('0x460')]['call'](this,_0x5e4c88),this[_0xabf9a('0x4a3')](VisuMZ[_0xabf9a('0x32b')][_0xabf9a('0x5ab')]['ButtonAssist'][_0xabf9a('0x6b')]||0x0),this[_0xabf9a('0x2ad')]();},Window_ButtonAssist['prototype'][_0x3d8782('0x10a')]=function(){const _0x2db257=_0x3d8782;this['contents'][_0x2db257('0x214')]<=0x60&&(this['contents']['fontSize']+=0x6);},Window_ButtonAssist[_0x3d8782('0x3b')]['makeFontSmaller']=function(){const _0x55787a=_0x3d8782;this[_0x55787a('0x41')][_0x55787a('0x214')]>=0x18&&(this[_0x55787a('0x41')]['fontSize']-=0x6);},Window_ButtonAssist[_0x3d8782('0x3b')][_0x3d8782('0x195')]=function(){const _0x1db159=_0x3d8782;Window_Base['prototype'][_0x1db159('0x195')][_0x1db159('0x1c9')](this),this[_0x1db159('0x567')]();},Window_ButtonAssist['prototype'][_0x3d8782('0x3c0')]=function(){const _0x557c40=_0x3d8782;this[_0x557c40('0x5c1')]=SceneManager[_0x557c40('0x4dc')][_0x557c40('0x36')]()!==_0x557c40('0x33c')?0x0:0x8;},Window_ButtonAssist[_0x3d8782('0x3b')]['updateKeyText']=function(){const _0x1761bc=_0x3d8782,_0x382ea8=SceneManager['_scene'];for(let _0x5eda10=0x1;_0x5eda10<=0x5;_0x5eda10++){if('KwsGg'===_0x1761bc('0x2b9')){function _0x38d307(){const _0x57ebe8=_0x1761bc;return _0x14bfdf['CoreEngine'][_0x57ebe8('0x5ab')][_0x57ebe8('0x59e')][_0x57ebe8('0x2e4')]&&_0x3925e4[_0x57ebe8('0x55d')]()?_0x6c64de['eva']-0.05:_0x25fd77['eva'];}}else{if(this[_0x1761bc('0x440')]['key%1'['format'](_0x5eda10)]!==_0x382ea8[_0x1761bc('0x471')[_0x1761bc('0x2a2')](_0x5eda10)]()){if(_0x1761bc('0x5af')!==_0x1761bc('0x5af')){function _0xf29741(){const _0x121cc6=_0x1761bc;return this[_0x121cc6('0x15f')]();}}else return this[_0x1761bc('0x2ad')]();}if(this[_0x1761bc('0x440')][_0x1761bc('0xb0')['format'](_0x5eda10)]!==_0x382ea8[_0x1761bc('0x5c5')[_0x1761bc('0x2a2')](_0x5eda10)]()){if(_0x1761bc('0x15')!==_0x1761bc('0x15')){function _0x51e70b(){const _0x3edfc4=_0x1761bc;if(!this[_0x3edfc4('0x17')]())return;_0x4de57a=_0x544d0b||![],_0x3f5781=_0x5df9eb||![];if(_0x2672f1[_0x1f2f3f]){const _0x5d70dc={'targets':_0xa1b2b7,'animationId':_0x3bbbac,'mirror':_0x4f990b,'mute':_0x1989e5};this[_0x3edfc4('0x219')][_0x3edfc4('0x2b3')](_0x5d70dc);for(const _0x441ccb of _0x37a619){_0x441ccb[_0x3edfc4('0x3d2')]&&_0x441ccb[_0x3edfc4('0x3d2')]();}}}}else return this['refresh']();}}}},Window_ButtonAssist['prototype'][_0x3d8782('0x2ad')]=function(){const _0x25360b=_0x3d8782;this[_0x25360b('0x41')][_0x25360b('0x4d4')]();for(let _0x18c0d6=0x1;_0x18c0d6<=0x5;_0x18c0d6++){if(_0x25360b('0x5cc')!==_0x25360b('0x4ca'))this[_0x25360b('0x49b')](_0x18c0d6);else{function _0x108e00(){const _0x364de9=_0x25360b;if(this[_0x364de9('0x5bb')]())this[_0x364de9('0x4cb')](_0x5d1bbe,_0xe57b5b,_0x109a99);_0x30d617[_0x364de9('0x32b')][_0x364de9('0x2c0')]['call'](this,_0x4ead6d,_0xc77407,_0x1cc714);}}}},Window_ButtonAssist[_0x3d8782('0x3b')]['drawSegment']=function(_0x43c795){const _0x2bb262=_0x3d8782,_0xeadbdb=this['innerWidth']/0x5,_0x125486=SceneManager[_0x2bb262('0x4dc')],_0x2307b0=_0x125486['buttonAssistKey%1'[_0x2bb262('0x2a2')](_0x43c795)](),_0x21d3d5=_0x125486['buttonAssistText%1'[_0x2bb262('0x2a2')](_0x43c795)]();this[_0x2bb262('0x440')]['key%1'['format'](_0x43c795)]=_0x2307b0,this[_0x2bb262('0x440')][_0x2bb262('0xb0')['format'](_0x43c795)]=_0x21d3d5;if(_0x2307b0==='')return;if(_0x21d3d5==='')return;const _0x1ad11b=_0x125486[_0x2bb262('0x181')[_0x2bb262('0x2a2')](_0x43c795)](),_0x525bd5=this[_0x2bb262('0x57')](),_0x322835=_0xeadbdb*(_0x43c795-0x1)+_0x525bd5+_0x1ad11b,_0x229753=VisuMZ[_0x2bb262('0x32b')][_0x2bb262('0x5ab')]['ButtonAssist']['TextFmt'];this[_0x2bb262('0x2aa')](_0x229753[_0x2bb262('0x2a2')](_0x2307b0,_0x21d3d5),_0x322835,0x0,_0xeadbdb-_0x525bd5*0x2);},VisuMZ[_0x3d8782('0x8')]=function(_0xc1167d){const _0x26efb4=_0x3d8782;if(Utils['isOptionValid'](_0x26efb4('0x4e9'))){var _0x27593f=require(_0x26efb4('0x5f'))[_0x26efb4('0x83')]['get']();SceneManager[_0x26efb4('0x210')]();if(_0xc1167d)setTimeout(_0x27593f[_0x26efb4('0x578')][_0x26efb4('0x3a0')](_0x27593f),0x190);}},VisuMZ[_0x3d8782('0x135')]=function(_0x37e7d2,_0x31cf1d){const _0x143556=_0x3d8782;_0x31cf1d=_0x31cf1d[_0x143556('0x28')]();var _0x2076cd=1.70158,_0x353e64=0.7;switch(_0x31cf1d){case'LINEAR':return _0x37e7d2;case _0x143556('0x3bf'):return-0x1*Math['cos'](_0x37e7d2*(Math['PI']/0x2))+0x1;case _0x143556('0x72'):return Math['sin'](_0x37e7d2*(Math['PI']/0x2));case _0x143556('0x152'):return-0.5*(Math['cos'](Math['PI']*_0x37e7d2)-0x1);case _0x143556('0x1c0'):return _0x37e7d2*_0x37e7d2;case'OUTQUAD':return _0x37e7d2*(0x2-_0x37e7d2);case _0x143556('0x592'):return _0x37e7d2<0.5?0x2*_0x37e7d2*_0x37e7d2:-0x1+(0x4-0x2*_0x37e7d2)*_0x37e7d2;case _0x143556('0x437'):return _0x37e7d2*_0x37e7d2*_0x37e7d2;case'OUTCUBIC':var _0x127445=_0x37e7d2-0x1;return _0x127445*_0x127445*_0x127445+0x1;case'INOUTCUBIC':return _0x37e7d2<0.5?0x4*_0x37e7d2*_0x37e7d2*_0x37e7d2:(_0x37e7d2-0x1)*(0x2*_0x37e7d2-0x2)*(0x2*_0x37e7d2-0x2)+0x1;case _0x143556('0x6e'):return _0x37e7d2*_0x37e7d2*_0x37e7d2*_0x37e7d2;case _0x143556('0x418'):var _0x127445=_0x37e7d2-0x1;return 0x1-_0x127445*_0x127445*_0x127445*_0x127445;case _0x143556('0x315'):var _0x127445=_0x37e7d2-0x1;return _0x37e7d2<0.5?0x8*_0x37e7d2*_0x37e7d2*_0x37e7d2*_0x37e7d2:0x1-0x8*_0x127445*_0x127445*_0x127445*_0x127445;case _0x143556('0x35c'):return _0x37e7d2*_0x37e7d2*_0x37e7d2*_0x37e7d2*_0x37e7d2;case'OUTQUINT':var _0x127445=_0x37e7d2-0x1;return 0x1+_0x127445*_0x127445*_0x127445*_0x127445*_0x127445;case _0x143556('0xcb'):var _0x127445=_0x37e7d2-0x1;return _0x37e7d2<0.5?0x10*_0x37e7d2*_0x37e7d2*_0x37e7d2*_0x37e7d2*_0x37e7d2:0x1+0x10*_0x127445*_0x127445*_0x127445*_0x127445*_0x127445;case'INEXPO':if(_0x37e7d2===0x0){if(_0x143556('0x21a')===_0x143556('0x21a'))return 0x0;else{function _0x284af7(){const _0xafb5e8=_0x143556;return _0x23faa7[_0xafb5e8('0x32b')][_0xafb5e8('0x479')][_0xafb5e8('0x1c9')](this);}}}return Math['pow'](0x2,0xa*(_0x37e7d2-0x1));case _0x143556('0xf4'):if(_0x37e7d2===0x1)return 0x1;return-Math[_0x143556('0x217')](0x2,-0xa*_0x37e7d2)+0x1;case'INOUTEXPO':if(_0x37e7d2===0x0||_0x37e7d2===0x1)return _0x37e7d2;var _0x49e0eb=_0x37e7d2*0x2,_0x17665b=_0x49e0eb-0x1;if(_0x49e0eb<0x1){if(_0x143556('0x203')===_0x143556('0x203'))return 0.5*Math['pow'](0x2,0xa*_0x17665b);else{function _0x428ca0(){const _0x2df4d4=_0x143556,_0x508731=_0x2079b2['y']+(this[_0x2df4d4('0x24f')]()-_0x2ab2fd[_0x2df4d4('0x288')])/0x2;this[_0x2df4d4('0x14b')](_0x135629,_0x37b98a['x'],_0x508731);const _0x3fd1dc=_0x56f601['iconWidth']+0x4;_0x300ac4['x']+=_0x3fd1dc,_0x5cbaa4[_0x2df4d4('0x466')]-=_0x3fd1dc;}}}return 0.5*(-Math[_0x143556('0x217')](0x2,-0xa*_0x17665b)+0x2);case _0x143556('0x359'):var _0x49e0eb=_0x37e7d2/0x1;return-0x1*(Math[_0x143556('0x581')](0x1-_0x49e0eb*_0x37e7d2)-0x1);case _0x143556('0x57d'):var _0x127445=_0x37e7d2-0x1;return Math[_0x143556('0x581')](0x1-_0x127445*_0x127445);case _0x143556('0x540'):var _0x49e0eb=_0x37e7d2*0x2,_0x17665b=_0x49e0eb-0x2;if(_0x49e0eb<0x1)return-0.5*(Math[_0x143556('0x581')](0x1-_0x49e0eb*_0x49e0eb)-0x1);return 0.5*(Math['sqrt'](0x1-_0x17665b*_0x17665b)+0x1);case'INBACK':return _0x37e7d2*_0x37e7d2*((_0x2076cd+0x1)*_0x37e7d2-_0x2076cd);case _0x143556('0x298'):var _0x49e0eb=_0x37e7d2/0x1-0x1;return _0x49e0eb*_0x49e0eb*((_0x2076cd+0x1)*_0x49e0eb+_0x2076cd)+0x1;break;case _0x143556('0x3a9'):var _0x49e0eb=_0x37e7d2*0x2,_0x5bb8a9=_0x49e0eb-0x2,_0x3c20f0=_0x2076cd*1.525;if(_0x49e0eb<0x1)return 0.5*_0x49e0eb*_0x49e0eb*((_0x3c20f0+0x1)*_0x49e0eb-_0x3c20f0);return 0.5*(_0x5bb8a9*_0x5bb8a9*((_0x3c20f0+0x1)*_0x5bb8a9+_0x3c20f0)+0x2);case _0x143556('0xd3'):if(_0x37e7d2===0x0||_0x37e7d2===0x1){if(_0x143556('0x370')!==_0x143556('0x370')){function _0x28192c(){const _0x324f90=_0x143556;if(_0x10a41c[_0x324f90('0x87')]())_0x5de52f[_0x324f90('0xad')](_0x579543);}}else return _0x37e7d2;}var _0x49e0eb=_0x37e7d2/0x1,_0x17665b=_0x49e0eb-0x1,_0x1161a2=0x1-_0x353e64,_0x3c20f0=_0x1161a2/(0x2*Math['PI'])*Math[_0x143556('0x16f')](0x1);return-(Math[_0x143556('0x217')](0x2,0xa*_0x17665b)*Math['sin']((_0x17665b-_0x3c20f0)*(0x2*Math['PI'])/_0x1161a2));case'OUTELASTIC':var _0x1161a2=0x1-_0x353e64,_0x49e0eb=_0x37e7d2*0x2;if(_0x37e7d2===0x0||_0x37e7d2===0x1)return _0x37e7d2;var _0x3c20f0=_0x1161a2/(0x2*Math['PI'])*Math[_0x143556('0x16f')](0x1);return Math[_0x143556('0x217')](0x2,-0xa*_0x49e0eb)*Math[_0x143556('0x4ec')]((_0x49e0eb-_0x3c20f0)*(0x2*Math['PI'])/_0x1161a2)+0x1;case _0x143556('0x419'):var _0x1161a2=0x1-_0x353e64;if(_0x37e7d2===0x0||_0x37e7d2===0x1)return _0x37e7d2;var _0x49e0eb=_0x37e7d2*0x2,_0x17665b=_0x49e0eb-0x1,_0x3c20f0=_0x1161a2/(0x2*Math['PI'])*Math[_0x143556('0x16f')](0x1);if(_0x49e0eb<0x1)return-0.5*(Math[_0x143556('0x217')](0x2,0xa*_0x17665b)*Math[_0x143556('0x4ec')]((_0x17665b-_0x3c20f0)*(0x2*Math['PI'])/_0x1161a2));return Math['pow'](0x2,-0xa*_0x17665b)*Math[_0x143556('0x4ec')]((_0x17665b-_0x3c20f0)*(0x2*Math['PI'])/_0x1161a2)*0.5+0x1;case _0x143556('0x2dd'):var _0x49e0eb=_0x37e7d2/0x1;if(_0x49e0eb<0x1/2.75)return 7.5625*_0x49e0eb*_0x49e0eb;else{if(_0x49e0eb<0x2/2.75){var _0x5bb8a9=_0x49e0eb-1.5/2.75;return 7.5625*_0x5bb8a9*_0x5bb8a9+0.75;}else{if(_0x49e0eb<2.5/2.75){if(_0x143556('0x378')===_0x143556('0x378')){var _0x5bb8a9=_0x49e0eb-2.25/2.75;return 7.5625*_0x5bb8a9*_0x5bb8a9+0.9375;}else{function _0x1e3d40(){const _0x1c5bb9=_0x143556;return this[_0x1c5bb9('0x48c')]()&&this['_hp']<this[_0x1c5bb9('0x5f4')]*_0xa9d76c[_0x1c5bb9('0x32b')]['Settings'][_0x1c5bb9('0x58')][_0x1c5bb9('0x232')];}}}else{var _0x5bb8a9=_0x49e0eb-2.625/2.75;return 7.5625*_0x5bb8a9*_0x5bb8a9+0.984375;}}}case _0x143556('0x141'):var _0x2d323e=0x1-VisuMZ[_0x143556('0x135')](0x1-_0x37e7d2,_0x143556('0x75'));return _0x2d323e;case _0x143556('0x492'):if(_0x37e7d2<0.5)var _0x2d323e=VisuMZ[_0x143556('0x135')](_0x37e7d2*0x2,_0x143556('0x2a7'))*0.5;else{if(_0x143556('0x168')==='iKKhe')var _0x2d323e=VisuMZ[_0x143556('0x135')](_0x37e7d2*0x2-0x1,_0x143556('0x75'))*0.5+0.5;else{function _0xf50f43(){this['setActorHomeRepositioned'](_0x508d4a);}}}return _0x2d323e;default:return _0x37e7d2;}},VisuMZ['GetParamIcon']=function(_0x460d80){const _0x50086a=_0x3d8782;_0x460d80=String(_0x460d80)[_0x50086a('0x28')]();const _0x14350f=VisuMZ[_0x50086a('0x32b')][_0x50086a('0x5ab')][_0x50086a('0x58')];if(_0x460d80===_0x50086a('0x2c5'))return _0x14350f[_0x50086a('0x184')];if(_0x460d80==='MAXMP')return _0x14350f[_0x50086a('0x26e')];if(_0x460d80==='ATK')return _0x14350f[_0x50086a('0x2bc')];if(_0x460d80==='DEF')return _0x14350f[_0x50086a('0x1db')];if(_0x460d80===_0x50086a('0x27f'))return _0x14350f['IconParam4'];if(_0x460d80==='MDF')return _0x14350f[_0x50086a('0x584')];if(_0x460d80==='AGI')return _0x14350f['IconParam6'];if(_0x460d80===_0x50086a('0x76'))return _0x14350f[_0x50086a('0x5e8')];if(_0x460d80===_0x50086a('0x33e'))return _0x14350f[_0x50086a('0x338')];if(_0x460d80===_0x50086a('0x513'))return _0x14350f[_0x50086a('0x145')];if(_0x460d80===_0x50086a('0x2d'))return _0x14350f[_0x50086a('0x45f')];if(_0x460d80===_0x50086a('0x3e'))return _0x14350f[_0x50086a('0x273')];if(_0x460d80==='MEV')return _0x14350f[_0x50086a('0x489')];if(_0x460d80==='MRF')return _0x14350f[_0x50086a('0xda')];if(_0x460d80===_0x50086a('0x7'))return _0x14350f[_0x50086a('0x46')];if(_0x460d80===_0x50086a('0xa4'))return _0x14350f['IconXParam7'];if(_0x460d80===_0x50086a('0x438'))return _0x14350f['IconXParam8'];if(_0x460d80===_0x50086a('0x28b'))return _0x14350f[_0x50086a('0x125')];if(_0x460d80===_0x50086a('0x5a3'))return _0x14350f[_0x50086a('0x3c2')];if(_0x460d80==='GRD')return _0x14350f[_0x50086a('0xc6')];if(_0x460d80===_0x50086a('0x428'))return _0x14350f[_0x50086a('0x13e')];if(_0x460d80===_0x50086a('0x316'))return _0x14350f[_0x50086a('0x3b6')];if(_0x460d80===_0x50086a('0x110'))return _0x14350f['IconSParam4'];if(_0x460d80===_0x50086a('0x442'))return _0x14350f[_0x50086a('0x53')];if(_0x460d80==='PDR')return _0x14350f[_0x50086a('0xb1')];if(_0x460d80===_0x50086a('0x434'))return _0x14350f[_0x50086a('0x149')];if(_0x460d80===_0x50086a('0x59c'))return _0x14350f[_0x50086a('0xe7')];if(_0x460d80==='EXR')return _0x14350f[_0x50086a('0x19a')];if(VisuMZ[_0x50086a('0x32b')]['CustomParamIcons'][_0x460d80])return VisuMZ[_0x50086a('0x32b')][_0x50086a('0x551')][_0x460d80]||0x0;return 0x0;},VisuMZ[_0x3d8782('0x91')]=function(_0x3ee982,_0x31841a){const _0x2a63be=_0x3d8782;if(_0x3ee982%0x1===0x0)return _0x3ee982;return _0x31841a=_0x31841a||0x0,String((_0x3ee982*0x64)[_0x2a63be('0x2b5')](_0x31841a))+'%';},VisuMZ[_0x3d8782('0x3ba')]=function(_0x451a40){const _0x19d94d=_0x3d8782;_0x451a40=String(_0x451a40);if(!_0x451a40)return _0x451a40;if(typeof _0x451a40!=='string')return _0x451a40;const _0x4050d6=VisuMZ[_0x19d94d('0x32b')]['Settings'][_0x19d94d('0x59e')][_0x19d94d('0x376')]||_0x19d94d('0x421'),_0x5b4557={'maximumFractionDigits':0x6};_0x451a40=_0x451a40['replace'](/\[(.*?)\]/g,(_0x290f61,_0x16238a)=>{const _0x105780=_0x19d94d;if(_0x105780('0x506')===_0x105780('0x506'))return VisuMZ[_0x105780('0x1f2')](_0x16238a,'[',']');else{function _0x1a16d3(){const _0x59525d=_0x105780;this[_0x59525d('0x4c0')]&&this[_0x59525d('0x31')](),this[_0x59525d('0x3c')]=![],this['_hovered']=![];}}}),_0x451a40=_0x451a40['replace'](/<(.*?)>/g,(_0x208f3d,_0x1da5ab)=>{const _0x4d7c7d=_0x19d94d;if(_0x4d7c7d('0x10e')!==_0x4d7c7d('0x10e')){function _0x8dfb78(){const _0x33d08e=_0x4d7c7d,_0x42751a=_0x9ec29b['CoreEngine'][_0x33d08e('0x5ab')][_0x33d08e('0x233')];if(_0x42751a&&_0x42751a[_0x33d08e('0x221')])return _0x42751a[_0x33d08e('0x221')][_0x33d08e('0x1c9')](this);this['x']+=_0x31713a[_0x33d08e('0x226')](_0x20d2e8['shake']());}}else return VisuMZ[_0x4d7c7d('0x1f2')](_0x1da5ab,'<','>');}),_0x451a40=_0x451a40[_0x19d94d('0x31b')](/\{\{(.*?)\}\}/g,(_0x4d5b85,_0x12c95c)=>{const _0x4f29e7=_0x19d94d;return VisuMZ[_0x4f29e7('0x1f2')](_0x12c95c,'','');}),_0x451a40=_0x451a40['replace'](/(\d+\.?\d*)/g,(_0x1a5433,_0x109d24)=>{const _0x375c71=_0x19d94d;let _0x4edd3a=_0x109d24;if(_0x4edd3a[0x0]==='0')return _0x4edd3a;if(_0x4edd3a[_0x4edd3a['length']-0x1]==='.')return Number(_0x4edd3a)[_0x375c71('0x1')](_0x4050d6,_0x5b4557)+'.';else{if(_0x4edd3a[_0x4edd3a[_0x375c71('0x247')]-0x1]===',')return Number(_0x4edd3a)['toLocaleString'](_0x4050d6,_0x5b4557)+',';else{if(_0x375c71('0x13b')!=='ZEhYo')return Number(_0x4edd3a)[_0x375c71('0x1')](_0x4050d6,_0x5b4557);else{function _0xd47540(){const _0x394a03=_0x375c71;this[_0x394a03('0xae')]();}}}}});let _0x126f7d=0x3;while(_0x126f7d--){_0x451a40=VisuMZ[_0x19d94d('0x46d')](_0x451a40);}return _0x451a40;},VisuMZ[_0x3d8782('0x1f2')]=function(_0x47cc,_0x160b76,_0x81e008){const _0x5167b9=_0x3d8782;return _0x47cc=_0x47cc[_0x5167b9('0x31b')](/(\d)/gi,(_0x23ba17,_0x5e08e6)=>_0x5167b9('0x403')[_0x5167b9('0x2a2')](Number(_0x5e08e6))),_0x5167b9('0x599')[_0x5167b9('0x2a2')](_0x47cc,_0x160b76,_0x81e008);},VisuMZ[_0x3d8782('0x46d')]=function(_0x215f23){return _0x215f23=_0x215f23['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x2be430,_0x20f242)=>Number(parseInt(_0x20f242))),_0x215f23;},VisuMZ[_0x3d8782('0x574')]=function(_0x49119f){const _0x17fc27=_0x3d8782;SoundManager['playOk']();if(!Utils[_0x17fc27('0x2c6')]()){if(_0x17fc27('0x2a1')===_0x17fc27('0x2a1')){const _0x5ef2de=window[_0x17fc27('0x2af')](_0x49119f,_0x17fc27('0x17a'));}else{function _0x390646(){const _0x108a36=_0x17fc27;if(this['_CoreEngineSettings']===_0x2a5d2c)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x108a36('0x23e')]===_0x340f74)this[_0x108a36('0x40d')]();return this['_CoreEngineSettings']['FontSize'];}}}else{const _0x7fd7e1=process[_0x17fc27('0x3f5')]=='darwin'?_0x17fc27('0x2af'):process[_0x17fc27('0x3f5')]==_0x17fc27('0x1b2')?_0x17fc27('0x230'):_0x17fc27('0x32e');require(_0x17fc27('0x533'))['exec'](_0x7fd7e1+'\x20'+_0x49119f);}},Sprite_Clickable[_0x3d8782('0x3b')][_0x3d8782('0x49f')]=function(){const _0xebc11e=_0x3d8782;if(this[_0xebc11e('0x4f')]()){if(_0xebc11e('0x99')===_0xebc11e('0x99')){if(this[_0xebc11e('0x379')]()){!this[_0xebc11e('0x4c0')]&&TouchInput[_0xebc11e('0x245')]()&&(this[_0xebc11e('0x4c0')]=!![],this[_0xebc11e('0x23')]());if(TouchInput[_0xebc11e('0xf5')]()){if(_0xebc11e('0x3fc')!==_0xebc11e('0x3bb'))this[_0xebc11e('0x3c')]=!![],this[_0xebc11e('0x5b6')]();else{function _0x3e20b0(){const _0x450014=_0xebc11e;_0x36855f=_0x5c77f7[_0x450014('0x32b')][_0x450014('0x276')][_0x450014('0x1c9')](this);}}}}else this['_hovered']&&this['onMouseExit'](),this[_0xebc11e('0x3c')]=![],this[_0xebc11e('0x4c0')]=![];this[_0xebc11e('0x3c')]&&TouchInput[_0xebc11e('0x2e7')]()&&(this[_0xebc11e('0x3c')]=![],this[_0xebc11e('0x503')]());}else{function _0x3d5cd9(){const _0x5f4eec=_0xebc11e;this[_0x5f4eec('0x31')]();}}}else{if(_0xebc11e('0x510')!=='zJgQp')this[_0xebc11e('0x3c')]=![],this[_0xebc11e('0x4c0')]=![];else{function _0x49c79a(){const _0x4d5703=_0xebc11e;_0x502921[_0x4d5703('0x32b')][_0x4d5703('0x238')]['call'](this);if(!_0x569c92['_changingClass'])this[_0x4d5703('0xf1')]();}}}},Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x21b')]=function(){const _0x1938cc=_0x3d8782;return this[_0x1938cc('0x37e')];},VisuMZ[_0x3d8782('0x32b')][_0x3d8782('0x2ff')]=Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x6f')],Game_Picture['prototype'][_0x3d8782('0x6f')]=function(){const _0x3ad0d0=_0x3d8782;VisuMZ[_0x3ad0d0('0x32b')]['Game_Picture_initBasic'][_0x3ad0d0('0x1c9')](this),this[_0x3ad0d0('0x37e')]={'x':0x0,'y':0x0},this[_0x3ad0d0('0x23a')]={'x':0x0,'y':0x0};},VisuMZ[_0x3d8782('0x32b')]['Game_Picture_updateMove']=Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x68')],Game_Picture['prototype'][_0x3d8782('0x68')]=function(){const _0x52e194=_0x3d8782;this['updateAnchor'](),VisuMZ[_0x52e194('0x32b')][_0x52e194('0x383')][_0x52e194('0x1c9')](this);},VisuMZ[_0x3d8782('0x32b')]['Game_Picture_show']=Game_Picture['prototype'][_0x3d8782('0x1b9')],Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x1b9')]=function(_0x3af10f,_0xe0293f,_0x4b6192,_0x2c51b1,_0x3889e2,_0x4c2b62,_0x17d85c,_0x3794f5){const _0x5d35e5=_0x3d8782;VisuMZ[_0x5d35e5('0x32b')][_0x5d35e5('0x507')][_0x5d35e5('0x1c9')](this,_0x3af10f,_0xe0293f,_0x4b6192,_0x2c51b1,_0x3889e2,_0x4c2b62,_0x17d85c,_0x3794f5),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0xe0293f]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x3d8782('0xcd')]=Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0xc3')],Game_Picture['prototype'][_0x3d8782('0xc3')]=function(_0x4fe5cd,_0x21adb4,_0x5e3feb,_0x14a38f,_0x786c45,_0x29a0d5,_0x27a074,_0xcdc20f,_0x575232){const _0xb0163e=_0x3d8782;VisuMZ[_0xb0163e('0x32b')][_0xb0163e('0xcd')]['call'](this,_0x4fe5cd,_0x21adb4,_0x5e3feb,_0x14a38f,_0x786c45,_0x29a0d5,_0x27a074,_0xcdc20f,_0x575232),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4fe5cd]||{'x':0x0,'y':0x0});},Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x52a')]=function(){const _0x1f2083=_0x3d8782;this[_0x1f2083('0x430')]>0x0&&(this[_0x1f2083('0x37e')]['x']=this['applyEasing'](this[_0x1f2083('0x37e')]['x'],this[_0x1f2083('0x23a')]['x']),this[_0x1f2083('0x37e')]['y']=this[_0x1f2083('0x4b7')](this['_anchor']['y'],this[_0x1f2083('0x23a')]['y']));},Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x1cd')]=function(_0x35da6d){const _0x58c77a=_0x3d8782;this['_anchor']=_0x35da6d,this['_targetAnchor']=JsonEx[_0x58c77a('0x402')](this[_0x58c77a('0x37e')]);},Game_Picture[_0x3d8782('0x3b')][_0x3d8782('0x31f')]=function(_0xfd9d2c){this['_targetAnchor']=_0xfd9d2c;},VisuMZ['CoreEngine'][_0x3d8782('0x1e4')]=Sprite_Picture['prototype'][_0x3d8782('0xbd')],Sprite_Picture[_0x3d8782('0x3b')][_0x3d8782('0xbd')]=function(){const _0x8212fd=_0x3d8782,_0x244e1a=this[_0x8212fd('0x9')]();if(!_0x244e1a[_0x8212fd('0x21b')]())VisuMZ[_0x8212fd('0x32b')][_0x8212fd('0x1e4')]['call'](this);else{if(_0x8212fd('0x5a8')===_0x8212fd('0x60')){function _0x3b3088(){const _0x278756=_0x8212fd;this[_0x278756('0x5cf')]();}}else this['anchor']['x']=_0x244e1a[_0x8212fd('0x21b')]()['x'],this[_0x8212fd('0x21b')]['y']=_0x244e1a['anchor']()['y'];}},Game_Action['prototype'][_0x3d8782('0x278')]=function(_0x393fd7){const _0x4261cc=_0x3d8782;if(_0x393fd7){const _0x1f65b0=_0x393fd7[_0x4261cc('0x18c')];if(_0x1f65b0===0x1&&this[_0x4261cc('0x416')]()[_0x4261cc('0x13c')]()!==0x1){if(_0x4261cc('0x4f7')!==_0x4261cc('0x4f7')){function _0x497399(){return _0x1638b8;}}else this['setAttack']();}else{if(_0x1f65b0===0x2&&this['subject']()[_0x4261cc('0x396')]()!==0x2){if(_0x4261cc('0x4b9')===_0x4261cc('0x4b9'))this[_0x4261cc('0x11c')]();else{function _0x512809(){const _0x4304ba=_0x4261cc,_0x48ae82=_0x1d2a30[_0x18bf2d[_0x4304ba('0x3e8')]],_0x10c21b=_0x3cc699[_0x4304ba('0x515')],_0x216e30=_0x26146a[_0x4304ba('0x363')],_0x19c8af=_0x22525f['mute'];let _0x2af24e=this[_0x4304ba('0x390')]();const _0xcc1715=this['animationNextDelay']();if(this[_0x4304ba('0x4b5')](_0x48ae82))for(const _0x5ce6ae of _0x10c21b){this[_0x4304ba('0x108')]([_0x5ce6ae],_0x48ae82,_0x216e30,_0x2af24e,_0x19c8af),_0x2af24e+=_0xcc1715;}else this['createFauxAnimationSprite'](_0x10c21b,_0x48ae82,_0x216e30,_0x2af24e,_0x19c8af);}}}else this['setSkill'](_0x1f65b0);}}else this['clear']();},Game_Actor[_0x3d8782('0x3b')][_0x3d8782('0x132')]=function(){const _0x264dac=_0x3d8782;return this[_0x264dac('0x206')]()[_0x264dac('0x47b')](_0x1ba2d9=>this[_0x264dac('0x5a4')](_0x1ba2d9)&&this['skillTypes']()[_0x264dac('0x5ec')](_0x1ba2d9[_0x264dac('0x216')]));},Window_Base[_0x3d8782('0x3b')][_0x3d8782('0x5b5')]=function(){const _0xec99fc=_0x3d8782;if(this[_0xec99fc('0x192')]){const _0xf75e01=this[_0xec99fc('0x192')][_0xec99fc('0x5e1')],_0x1a075c=this[_0xec99fc('0x466')],_0xe12b2b=this[_0xec99fc('0x42d')],_0x54a89b=this[_0xec99fc('0x5c1')],_0x39e51d=ColorManager[_0xec99fc('0x398')](),_0x1ef9ee=ColorManager['dimColor2']();_0xf75e01['resize'](_0x1a075c,_0xe12b2b),_0xf75e01[_0xec99fc('0x18a')](0x0,0x0,_0x1a075c,_0x54a89b,_0x1ef9ee,_0x39e51d,!![]),_0xf75e01['fillRect'](0x0,_0x54a89b,_0x1a075c,_0xe12b2b-_0x54a89b*0x2,_0x39e51d),_0xf75e01[_0xec99fc('0x18a')](0x0,_0xe12b2b-_0x54a89b,_0x1a075c,_0x54a89b,_0x39e51d,_0x1ef9ee,!![]),this[_0xec99fc('0x192')][_0xec99fc('0x153')](0x0,0x0,_0x1a075c,_0xe12b2b);}};
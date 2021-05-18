//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.04] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 *
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x3ddc=['#%1','setupSkillsStatesCore','DqVve','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','skillCostSeparator','meetsPassiveStateConditionSwitches','stateColor','bQeQI','commandNameWindowCenter','uIXoG','VisuMZ_1_ItemsEquipsCore','setup','DataOffsetX','LuxVi','clearStatesWithStateRetain','Name','XFKvb','recover\x20all','Game_BattlerBase_eraseState','getColor','SkillsStatesCore','QgJbv','right','tSeop','auPxJ','TNLEM','onEraseDebuff','tpCost','initMembersSkillsStatesCore','resetFontSettings','Csije','isMaxBuffAffected','isUseSkillsStatesCoreUpdatedLayout','cXivg','Game_BattlerBase_refresh','index','MunAv','cLjJZ','length','windowPadding','format','convertTargetToStateOriginKey','Rkasc','skillMpCost','isStateAffected','_stored_state-%1-color','user','buffTurns','_animationIndex','skillTpCost','onAddDebuffGlobalJS','Game_BattlerBase_initMembers','text','fontBold','max','value','createItemWindow','GGBix','auto','stateExpireJS','setStatusWindow','CmdStyle','eDwOn','ALeSV','JSON','VisuMZ_0_CoreEngine','fillRect','Game_BattlerBase_states','PCrti','process_VisuMZ_SkillsStatesCore_Skill_Notetags','skillTypeWindowRect','DEDpJ','outlineColor','Game_Battler_addBuff','drawFullGauge','eraseState','IconStypeNorm','iconIndex','addWindow','htmgk','mainAreaTop','buffColor','Game_BattlerBase_clearStates','decreaseBuff','checkShowHideSkillNotetags','onEraseDebuffGlobalJS','isBuffOrDebuffAffected','_stateIDs','createCommandNameWindow','XCOSc','boxWidth','Param','fCzgo','lHysW','note','stateTpSlipDamageJS','onEraseBuffJS','pfdcu','STR','updateHelp','Game_BattlerBase_recoverAll','stateHpSlipHealJS','_stateMaxTurns','_stored_debuffColor','ReapplyRules','Scene_Skill_createItemWindow','ynMrw','_skills','Window_SkillStatus_refresh','QmMbY','addPassiveStates','ARRAYSTR','Game_BattlerBase_meetsSkillConditions','hasState','description','gaugeRate','uvCnH','checkSkillTypeMatch','mainAreaHeight','PayJS','_costSettings','untitled','isPlaytest','textColor','QydxA','_actor','TurnOffsetX','applyStateCategoryRemovalEffects','Game_Action_applyItemUserEffect','changeTextColor','onRegenerateCustomStateDamageOverTime','keys','Window_SkillList_includes','buttonAssistText1','iconWidth','xzZNx','commandNameWindowDrawBackground','createAllSkillCostText','drawActorIconsAllTurnCounters','applyDebuffTurnManipulationEffects','RhTXq','zsxyQ','onAddState','ListWindowCols','updateCommandNameWindow','none','Game_Unit_isAllDead','statesByCategory','KHRen','<member-%1>','process_VisuMZ_SkillsStatesCore_State_ApplyRemoveLeaveJS','clearStateData','trim','Window_StatusBase_drawActorIcons','ShowTurns','MiQDJ','getCurrentStateOriginKey','gainMp','refresh','INUVk','item','mainFontSize','_cache','canClearState','zFGns','JXaZn','_currentActor','pZQmY','Window_StatusBase_placeGauge','EGfBG','addPassiveStatesTraitSets','_result','qIVkV','currentMaxValueSkillsStatesCore','fontFace','onsGi','Scene_Boot_onDatabaseLoaded','setItem','createTurnDisplaySprite','GaugeMaxJS','_stypeIDs','zmwTq','MAXMP','Scene_Skill_itemWindowRect','ShowData','ARRAYFUNC','Game_Battler_regenerateAll','lSFOQ','gejIJ','active','VisuMZ_1_MainMenuCore','Scene_Skill_skillTypeWindowRect','lwhzd','isAllDead','lpAWL','stateHpSlipDamageJS','onExpireDebuffGlobalJS','itemWindowRectSkillsStatesCore','LayoutStyle','_stored_buffColor','drawSkillCost','fontSize','mpCost','checkShowHideSwitchNotetags','updateTurnDisplaySprite','usableSkills','IVirB','drawIcon','skill','learnSkill','xcphy','drawItemStyleIcon','isLearnedSkill','hBMZp','TextJS','frameCount','categories','Game_Battler_addState','onExpireBuffGlobalJS','onEraseBuff','zXbgI','death','uiMenuStyle','log','paySkillCost','currentClass','TurnFontSize','skills','BattleHiddenSkillTypes','redraw','vTqwN','addBuff','getStypeIdWithName','Window_SkillList_maxCols','Hewqg','States','ColorNeutral','placeGauge','currentMaxValue','TurnOffsetY','RAQLp','isBuffExpired','wmjYf','center','Buffs','hPohk','getStateRetainType','uZwCE','_scene','Game_BattlerBase_eraseBuff','stateMaximumTurns','setBuffTurns','AIqtc','drawExtendedParameter','Sprite_Gauge_redraw','drawActorStateTurns','ColorPositive','updateFrame','OjKKg','nJPqI','process_VisuMZ_SkillsStatesCore_State_SlipEffectJS','removeStatesAuto','_skillTypeWindow','izXDE','adjustItemWidthByShopStatus','bBGRY','normalColor','mJDKc','getColorDataFromPluginParameters','meetsStateCondition','aliveMembers','hasSkill','isActor','DpQnX','itemLineRect','pKZXi','WnckS','addStateTurns','DataFontSize','frUkQ','NUM','MDF','onExpireStateGlobalJS','width','rtoyq','StackDebuffMax','checkShowHideJS','\x5cI[%1]%2','ColorDebuff','filter','commandName','setStypeId','MAXHP','number','owJKY','groupDefeat','getSkillIdWithName','_turnDisplaySprite','_statusWindow','retrieveStateColor','stateTurns','HfYGv','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','XotCs','convertPassiveStates','Game_BattlerBase_skillTpCost','AJlqb','debuffColor','EkEdc','gpPLQ','Costs','includes','onAddBuffJS','VisuMZ_1_ElementStatusCore','kJFnH','meetsSkillConditionsGlobalJS','Sprite_Gauge_gaugeRate','maxItems','opacity','ZWyjr','_skillIDs','getStateOriginByKey','OQqNx','hjlLv','PassiveStates','onAddStateMakeCustomSlipValues','Sprite_Gauge_initMembers','UXZUa','lineHeight','priority','onAddBuff','CDxWH','commandStyle','isPassiveStateStackable','ceil','ZDVzE','increaseBuff','JJJtS','nwboq','StackBuffMax','drawText','gainSilentTp','onExpireBuffJS','ColorBuff','DEF','makeCommandName','onEraseStateGlobalJS','HiddenSkillTypes','reset','CalcJS','_currentTroopUniqueID','LJMCN','itemWindowRect','drawItemStyleIconText','anchor','FUNC','success','maxCols','PpTtL','IZIOY','ydmeZ','ignore','rgba(0,\x200,\x200,\x201)','regenerateAllSkillsStatesCore','helpWindowRectSkillsStatesCore','addDebuffTurns','actions','RyjHi','status','applyStateTurnManipulationEffects','clearStateDisplay','toLowerCase','innerWidth','fJnyd','_shopStatusWindow','iAocy','add','_stateData','STRUCT','ATK','passiveStates','UYmvS','meetsPassiveStateConditionJS','Global','equips','getCurrentStateActiveUser','SkillMenuStatusRect','drawActorStateData','magicSkills','updatedLayoutStyle','EnableLayout','Scene_Skill_helpWindowRect','exit','die','setStateOrigin','skillId','_buffTurns','mainCommandWidth','stateId','_categoryWindow','overwriteBuffTurns','getStateOrigin','stateMpSlipDamageJS','JqeaP','QvSmM','AGI','isRightInputMode','skillEnableJS','AsfPo','setStateData','buffIconIndex','POSITIVE','ARRAYEVAL','drawActorBuffTurns','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','split','kVtuC','checkShowHideNotetags','addPassiveStatesByPluginParameters','checkShowHideBattleNotetags','replace','Game_BattlerBase_die','slipMp','NEGATIVE','QDckG','onAddBuffGlobalJS','SkillSceneAdjustSkillList','process_VisuMZ_SkillsStatesCore_State_Category','CmdTextAlign','process_VisuMZ_SkillsStatesCore_Skill_Cost','meetsSkillConditions','canPaySkillCost','FFwnh','EVAL','jEOgh','round','onAddStateCustomJS','constructor','useDigitGrouping','huHrk','Window_SkillList_setActor','meetsSkillConditionsEnableJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onExpireStateCustomJS','process_VisuMZ_SkillsStatesCore_State_PassiveJS','isBuffAffected','rjHjL','Game_BattlerBase_decreaseBuff','passiveStateObjects','ZLnat','isBottomHelpMode','skillTypeWindowRectSkillsStatesCore','onEraseDebuffJS','EOJeN','tnLYM','initMembers','Game_BattlerBase_buffIconIndex','RrMJf','uiInputPosition','greater','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','return\x200','helpWindowRect','isStateExpired','_buffs','slipTp','canUse','currentValueSkillsStatesCore','<troop-%1>','checkSkillConditionsSwitchNotetags','Game_BattlerBase_increaseBuff','shopStatusWindowRectSkillsStatesCore','Omwxo','onEraseBuffGlobalJS','hUpoB','RDtVV','_stateTurns','onAddStateJS','dHDlz','onDatabaseLoaded','currentDisplayedValue','ARRAYNUM','Sprite_StateIcon_loadBitmap','Game_Actor_skillTypes','removeBuff','JuvvJ','isUseModernControls','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','initialize','PnmzV','OWDTV','KSRIJ','WWafH','Bgrcd','MaxTurns','Settings','onExpireState','drawItem','Xwgvr','changeOutlineColor','eyZUR','GPGrm','stateMpSlipHealJS','makeCurrentTroopUniqueID','onExpireStateJS','createShopStatusWindow','Sprite_Gauge_setup','removeState','rgCOr','ySsCS','buttonAssistSwitch','addPassiveStatesFromOtherPlugins','rKOgh','Sprite_Gauge_currentMaxValue','contents','name','setStateTurns','Window_SkillType_initialize','onRemoveState','UpIdU','clearStates','onAddStateGlobalJS','addDebuff','isDebuffAffected','statusWindowRectSkillsStatesCore','removeBuffsAuto','callUpdateHelp','actorId','getStateIdWithName','IconStypeMagic','hkclG','concat','iniCw','_stateOrigin','textSizeEx','Game_Actor_forgetSkill','meetsPassiveStateGlobalConditionJS','isGroupDefeatStateAffected','sort','convertGaugeTypeSkillsStatesCore','WVzQA','egXgs','clearStateOrigin','currentValue','calcWindowHeight','indexOf','paramValueByName','ptvrY','SkillConditionJS','Skills','MultiplierJS','OxNdO','isCommandEnabled','damage','statePassiveConditionJS','Scene_Skill_statusWindowRect','YvFmi','Window_SkillList_updateHelp','EQrbT','statusWindowRect','placeExactGauge','forgetSkill','createSkillCostText','DKKIk','parameters','prototype','IWHNW','actor','states','HrlBh','yBbyp','setPassiveStateSlipDamageJS','GbAWV','buff','uiHelpPosition','removeStatesByCategory','call','onAddDebuffJS','yWeom','resetTextColor','qhKYZ','addBuffTurns','resetStateCounts','Game_BattlerBase_skillMpCost','stateEraseJS','qeJyL','ofShN','_subject','uzgmk','_stypeId','iconText','ovTpk','drawExtendedSkillsStatesCoreStatus','LUK','getStateReapplyRulings','_stateRetainType','isAlive','qsjUS','pWRkE','_colorCache','paramBuffRate','map','YOEYr','floor','Game_BattlerBase_overwriteBuffTurns','eraseBuff','heal','setActor','zqIBn','_itemWindow','process_VisuMZ_SkillsStatesCore_State_Notetags','Game_Troop_setup','CanPayJS','FZMnf','stateTpSlipHealJS','onEraseStateCustomJS','dOnoA','applySkillsStatesCoreEffects','makeAdditionalSkillCostText','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','shopStatusWindowRect','DisplayedParams','iconHeight','ColorNegative','stImO','%1%','itemAt','Game_Battler_addDebuff','AsaCH','checkSkillConditionsNotetags','setDebuffTurns','allIcons','kCoaR','clear','applyItemUserEffect','ConvertParams','isMaxDebuffAffected','changePaintOpacity','icon','addPassiveStatesByNotetag','VLcRB','XiODN','rQOmn','match','getStateData','OHxBR','drawActorIcons','kJaTq','slipHp','qOZhy','skillTypes','stateAddJS','<enemy-%1>','nUQpk','KvbKx','DataOffsetY','onExpireBuff','wSZrT','onAddDebuff','PyvLD','ZACjn','shopStatusWidth','commandStyleCheck','FFItR','YEGXF','_stateDisplay','enemyId','<actor-%1>','buffLength','_battler','allowCreateShopStatusWindow','ExRHj','PLhqM','state','rrfYy','gaugeBackColor','parse','drawActorBuffRates','getCurrentTroopUniqueID','smhCW','Sprite_Gauge_currentValue','addState','drawTextEx','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_BattlerBase_resetStateCounts','GroupDigits','clamp','height','clearStateRetainType','checkCacheKey','isSkillUsableForAutoBattle','ARRAYSTRUCT','meetsPassiveStateConditions','Actor','isSkillCostShown','RYsRT','gTAwu','CKmiv','isPartyAllAffectedByGroupDefeatStates','cGPbJ','onExpireDebuff','Game_Actor_learnSkill','SvoJa','inBattle','jtpdz','OQQWn','redrawSkillsStatesCore','yXBSb','RpOIF','gaugeLineHeight','skillVisibleJS','addChild','process_VisuMZ_SkillsStatesCore_Notetags','raple','Sprite_StateIcon_updateFrame','stateData','scrollTo','irfDK','ewiFg','setStateRetainType','CkqTU','bitmap','commandNameWindowDrawText','GaugeCurrentJS','%1\x20%2\x20%3','ANtsv','push','makeSuccess','innerHeight','itemTextAlign','Enemy','autoRemovalTiming','CoreEngine','statusWidth','toUpperCase','recoverAll','PassiveConditionJS','_commandNameWindow','applyBuffTurnManipulationEffects','getSkillTypes'];(function(_0x10c1f3,_0x3ddca5){const _0x5b9353=function(_0x2b2c25){while(--_0x2b2c25){_0x10c1f3['push'](_0x10c1f3['shift']());}};_0x5b9353(++_0x3ddca5);}(_0x3ddc,0xa3));const _0x5b93=function(_0x10c1f3,_0x3ddca5){_0x10c1f3=_0x10c1f3-0x0;let _0x5b9353=_0x3ddc[_0x10c1f3];return _0x5b9353;};const _0x493af9=_0x5b93;var label=_0x493af9('0x255'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x493af9('0x7e')](function(_0x5ae6ca){const _0x486082=_0x493af9;return _0x5ae6ca[_0x486082('0xcd')]&&_0x5ae6ca['description'][_0x486082('0x94')]('['+label+']');})[0x0];VisuMZ[label][_0x493af9('0x14c')]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x574988,_0x12afcb){const _0x11db3f=_0x493af9;for(const _0x47e352 in _0x12afcb){if('NdLQC'==='NdLQC'){if(_0x47e352[_0x11db3f('0x1e0')](/(.*):(.*)/i)){if(_0x11db3f('0x2b')===_0x11db3f('0x2b')){const _0xa70f7f=String(RegExp['$1']),_0x33e884=String(RegExp['$2'])[_0x11db3f('0x23b')]()[_0x11db3f('0x2d9')]();let _0x1fe29f,_0x39264d,_0x48cd7e;switch(_0x33e884){case _0x11db3f('0x75'):_0x1fe29f=_0x12afcb[_0x47e352]!==''?Number(_0x12afcb[_0x47e352]):0x0;break;case _0x11db3f('0x13e'):_0x39264d=_0x12afcb[_0x47e352]!==''?JSON[_0x11db3f('0x201')](_0x12afcb[_0x47e352]):[],_0x1fe29f=_0x39264d[_0x11db3f('0x1b6')](_0x3bfc20=>Number(_0x3bfc20));break;case _0x11db3f('0x10e'):_0x1fe29f=_0x12afcb[_0x47e352]!==''?eval(_0x12afcb[_0x47e352]):null;break;case _0x11db3f('0xf9'):_0x39264d=_0x12afcb[_0x47e352]!==''?JSON[_0x11db3f('0x201')](_0x12afcb[_0x47e352]):[],_0x1fe29f=_0x39264d[_0x11db3f('0x1b6')](_0x2b5f36=>eval(_0x2b5f36));break;case _0x11db3f('0x281'):_0x1fe29f=_0x12afcb[_0x47e352]!==''?JSON[_0x11db3f('0x201')](_0x12afcb[_0x47e352]):'';break;case'ARRAYJSON':_0x39264d=_0x12afcb[_0x47e352]!==''?JSON[_0x11db3f('0x201')](_0x12afcb[_0x47e352]):[],_0x1fe29f=_0x39264d['map'](_0x3b37e6=>JSON[_0x11db3f('0x201')](_0x3b37e6));break;case _0x11db3f('0xc0'):_0x1fe29f=_0x12afcb[_0x47e352]!==''?new Function(JSON[_0x11db3f('0x201')](_0x12afcb[_0x47e352])):new Function(_0x11db3f('0x12a'));break;case _0x11db3f('0x16'):_0x39264d=_0x12afcb[_0x47e352]!==''?JSON[_0x11db3f('0x201')](_0x12afcb[_0x47e352]):[],_0x1fe29f=_0x39264d[_0x11db3f('0x1b6')](_0x1ac5c3=>new Function(JSON[_0x11db3f('0x201')](_0x1ac5c3)));break;case _0x11db3f('0x2a3'):_0x1fe29f=_0x12afcb[_0x47e352]!==''?String(_0x12afcb[_0x47e352]):'';break;case _0x11db3f('0x2b0'):_0x39264d=_0x12afcb[_0x47e352]!==''?JSON[_0x11db3f('0x201')](_0x12afcb[_0x47e352]):[],_0x1fe29f=_0x39264d[_0x11db3f('0x1b6')](_0x30472f=>String(_0x30472f));break;case _0x11db3f('0xd7'):_0x48cd7e=_0x12afcb[_0x47e352]!==''?JSON['parse'](_0x12afcb[_0x47e352]):{},_0x574988[_0xa70f7f]={},VisuMZ[_0x11db3f('0x1d8')](_0x574988[_0xa70f7f],_0x48cd7e);continue;case _0x11db3f('0x210'):_0x39264d=_0x12afcb[_0x47e352]!==''?JSON[_0x11db3f('0x201')](_0x12afcb[_0x47e352]):[],_0x1fe29f=_0x39264d[_0x11db3f('0x1b6')](_0x1e71dc=>VisuMZ['ConvertParams']({},JSON[_0x11db3f('0x201')](_0x1e71dc)));break;default:continue;}_0x574988[_0xa70f7f]=_0x1fe29f;}else{function _0x27ec6d(){const _0x37baf5=_0x11db3f;if(typeof _0x30ce6d!==_0x37baf5('0x82'))_0x58583d=_0x543c80['id'];return this[_0x37baf5('0x1f6')]=this[_0x37baf5('0x1f6')]||{},this['_stateDisplay'][_0x26c77a]===_0x698f0b&&(this[_0x37baf5('0x1f6')][_0x218100]=''),this['_stateDisplay'][_0x39d377];}}}}else{function _0x501abb(){const _0x4196c4=_0x11db3f;if(this['_stypeId']===_0x166d29)return;this['_stypeId']=_0x3864db,this['refresh'](),this[_0x4196c4('0x229')](0x0,0x0),this[_0x4196c4('0x87')]&&this[_0x4196c4('0x87')][_0x4196c4('0x112')]===_0x1c6bba&&this[_0x4196c4('0x87')][_0x4196c4('0xe')](this[_0x4196c4('0x1cf')](0x0));}}}return _0x574988;},(_0x2b7dd2=>{const _0x188257=_0x493af9,_0x519f68=_0x2b7dd2[_0x188257('0x160')];for(const _0xe8659e of dependencies){if(!Imported[_0xe8659e]){alert(_0x188257('0x1c8')[_0x188257('0x269')](_0x519f68,_0xe8659e)),SceneManager[_0x188257('0xe5')]();break;}}const _0x1c8295=_0x2b7dd2[_0x188257('0x2b3')];if(_0x1c8295[_0x188257('0x1e0')](/\[Version[ ](.*?)\]/i)){const _0x5ba421=Number(RegExp['$1']);if(_0x5ba421!==VisuMZ[label]['version']){if(_0x188257('0x1a1')!==_0x188257('0x1a1')){function _0x55a03b(){const _0x2190d0=_0x188257,_0x351f6a=_0x46dc7a['parse']('['+_0x2a333b['$1'][_0x2190d0('0x1e0')](/\d+/g)+']');for(const _0xfc8583 of _0x351f6a){if(!_0xa5bee5[_0x2190d0('0x278')](_0xfc8583))return![];}return!![];}}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x188257('0x269')](_0x519f68,_0x5ba421)),SceneManager[_0x188257('0xe5')]();}}if(_0x1c8295[_0x188257('0x1e0')](/\[Tier[ ](\d+)\]/i)){if(_0x188257('0x9')!==_0x188257('0xf1')){const _0x5e6bbe=Number(RegExp['$1']);_0x5e6bbe<tier?(alert(_0x188257('0xfb')[_0x188257('0x269')](_0x519f68,_0x5e6bbe,tier)),SceneManager[_0x188257('0xe5')]()):tier=Math[_0x188257('0x277')](_0x5e6bbe,tier);}else{function _0x5f292b(){const _0x7f2aaa=_0x188257;return _0x42b559[_0x7f2aaa('0x282')]&&_0x18bb0d[_0x7f2aaa('0x192')][_0x7f2aaa('0x143')][_0x7f2aaa('0x19d')](this);}}}VisuMZ[_0x188257('0x1d8')](VisuMZ[label][_0x188257('0x14c')],_0x2b7dd2[_0x188257('0x191')]);})(pluginData),VisuMZ[_0x493af9('0x255')]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x493af9('0x192')][_0x493af9('0x13c')],Scene_Boot[_0x493af9('0x192')][_0x493af9('0x13c')]=function(){const _0x4e771a=_0x493af9;VisuMZ[_0x4e771a('0x255')][_0x4e771a('0xd')][_0x4e771a('0x19d')](this),this[_0x4e771a('0x225')]();},Scene_Boot['prototype'][_0x493af9('0x225')]=function(){const _0xfa68ff=_0x493af9;this[_0xfa68ff('0x286')](),this[_0xfa68ff('0x1bf')]();},Scene_Boot[_0x493af9('0x192')][_0x493af9('0x286')]=function(){const _0x1e1df9=_0x493af9;for(const _0x53b390 of $dataSkills){if(_0x1e1df9('0x251')!==_0x1e1df9('0x251')){function _0x3a7684(){this['onExpireStateCustomJS'](_0xd568f9);}}else{if(!_0x53b390)continue;this[_0x1e1df9('0x10a')](_0x53b390),this['process_VisuMZ_SkillsStatesCore_Skill_JS'](_0x53b390);}}},Scene_Boot[_0x493af9('0x192')][_0x493af9('0x10a')]=function(_0x5cd9ad){const _0x3b3337=_0x493af9,_0x394f8f=_0x5cd9ad['note'];if(_0x394f8f[_0x3b3337('0x1e0')](/<MP COST:[ ](\d+)>/i)){if(_0x3b3337('0x1')!==_0x3b3337('0x29a'))_0x5cd9ad[_0x3b3337('0x27')]=Number(RegExp['$1']);else{function _0x248c36(){const _0x3a983b=_0x3b3337;let _0x17f747=this['currentValue']();return _0x27186a['VisuMZ_0_CoreEngine']&&this[_0x3a983b('0x113')]()&&(_0x17f747=_0x66d1bd[_0x3a983b('0x20a')](_0x17f747)),_0x17f747;}}}_0x394f8f[_0x3b3337('0x1e0')](/<TP COST:[ ](\d+)>/i)&&(_0x5cd9ad[_0x3b3337('0x25c')]=Number(RegExp['$1']));},VisuMZ[_0x493af9('0x255')][_0x493af9('0xf4')]={},VisuMZ[_0x493af9('0x255')][_0x493af9('0x223')]={},Scene_Boot[_0x493af9('0x192')]['process_VisuMZ_SkillsStatesCore_Skill_JS']=function(_0x50b75e){const _0x1517a9=_0x493af9,_0xb1a331=_0x50b75e[_0x1517a9('0x29f')];if(_0xb1a331['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x1c9633=String(RegExp['$1']),_0x55eb92=_0x1517a9('0x244')[_0x1517a9('0x269')](_0x1c9633);VisuMZ[_0x1517a9('0x255')]['skillEnableJS'][_0x50b75e['id']]=new Function(_0x1517a9('0x2d'),_0x55eb92);}if(_0xb1a331[_0x1517a9('0x1e0')](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x1517a9('0x9f')!==_0x1517a9('0x1ee')){const _0xaecbab=String(RegExp['$1']),_0x3dbd28=_0x1517a9('0x208')[_0x1517a9('0x269')](_0xaecbab);VisuMZ[_0x1517a9('0x255')][_0x1517a9('0x223')][_0x50b75e['id']]=new Function(_0x1517a9('0x2d'),_0x3dbd28);}else{function _0x4525e4(){const _0x192feb=_0x1517a9,_0x44cb0e=_0x1f1ec4[_0x192feb('0x255')][_0x192feb('0x1e8')];if(_0x44cb0e[_0x4a01d6])_0x44cb0e[_0x4b066b][_0x192feb('0x19d')](this,_0x10da59);}}}},Scene_Boot['prototype'][_0x493af9('0x1bf')]=function(){const _0xaf1f6d=_0x493af9;for(const _0x3fa48d of $dataStates){if(_0xaf1f6d('0x70')!==_0xaf1f6d('0x70')){function _0x50f00c(){const _0x31ceff=_0xaf1f6d,_0x4bd38c=_0x15600b(_0x31f8e9['$1']),_0x7ab89=_0x1ae52d['format'](_0x4bd38c);_0x8f2d1e[_0x31ceff('0x255')][_0x31ceff('0x27c')][_0x426ee4['id']]=new _0x42d4af(_0x31ceff('0xeb'),_0x7ab89);}}else{if(!_0x3fa48d)continue;this[_0xaf1f6d('0x108')](_0x3fa48d),this[_0xaf1f6d('0x119')](_0x3fa48d),this[_0xaf1f6d('0x61')](_0x3fa48d),this[_0xaf1f6d('0x2d7')](_0x3fa48d);}}},Scene_Boot[_0x493af9('0x192')][_0x493af9('0x108')]=function(_0x52e6a1){const _0x3b79da=_0x493af9;_0x52e6a1[_0x3b79da('0x35')]=['ALL','ANY'];const _0x54b23b=_0x52e6a1['note'],_0x3b736c=_0x54b23b['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x3b736c)for(const _0x3f3866 of _0x3b736c){if('uzgmk'===_0x3b79da('0x1a9')){_0x3f3866[_0x3b79da('0x1e0')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x42e88d=String(RegExp['$1'])[_0x3b79da('0x23b')]()[_0x3b79da('0x2d9')]()[_0x3b79da('0xfc')](',');for(const _0x5bcbb7 of _0x42e88d){_0x52e6a1[_0x3b79da('0x35')][_0x3b79da('0x233')](_0x5bcbb7[_0x3b79da('0x2d9')]());}}else{function _0x3b4af5(){const _0x45c9aa=_0x3b79da;if(!_0x3cdfc6[_0x45c9aa('0x278')](_0x3dfb56))return![];}}}if(_0x54b23b[_0x3b79da('0x1e0')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x12001d=RegExp['$1'][_0x3b79da('0xfc')](/[\r\n]+/);for(const _0x1f25dc of _0x12001d){if(_0x3b79da('0x43')!==_0x3b79da('0x43')){function _0x3392ce(){const _0x471622=_0x3b79da;this[_0x471622('0x156')]();}}else _0x52e6a1[_0x3b79da('0x35')]['push'](_0x1f25dc[_0x3b79da('0x23b')]()['trim']());}}_0x54b23b[_0x3b79da('0x1e0')](/<POSITIVE STATE>/i)&&_0x52e6a1[_0x3b79da('0x35')][_0x3b79da('0x233')](_0x3b79da('0xf8'));if(_0x54b23b[_0x3b79da('0x1e0')](/<NEGATIVE STATE>/i)){if(_0x3b79da('0xc3')===_0x3b79da('0xc3'))_0x52e6a1[_0x3b79da('0x35')][_0x3b79da('0x233')](_0x3b79da('0x104'));else{function _0x2dad75(){const _0x8a62a0=_0x3b79da;return _0x2fdcfc[_0x8a62a0('0x255')][_0x8a62a0('0x14c')]['PassiveStates'][_0x8a62a0('0x23d')]['call'](this,_0x5d1989);}}}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x187')]={},Scene_Boot[_0x493af9('0x192')][_0x493af9('0x119')]=function(_0x5a1faa){const _0x3ea75d=_0x493af9,_0x21ef2c=_0x5a1faa[_0x3ea75d('0x29f')];if(_0x21ef2c['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if(_0x3ea75d('0x135')!==_0x3ea75d('0x135')){function _0x4e4718(){const _0x523f23=_0x3ea75d,_0x561d2f=_0x2374bb[_0x523f23('0x201')]('['+_0x4426a1['$1'][_0x523f23('0x1e0')](/\d+/g)+']');for(const _0x5e4874 of _0x561d2f){if(this[_0x523f23('0x2be')][_0x523f23('0x6c')](_0x5e4874))return![];}return!![];}}else{const _0x76a744=String(RegExp['$1']),_0x429283=_0x3ea75d('0x117')[_0x3ea75d('0x269')](_0x76a744);VisuMZ[_0x3ea75d('0x255')][_0x3ea75d('0x187')][_0x5a1faa['id']]=new Function(_0x3ea75d('0x1fe'),_0x429283);}}},VisuMZ[_0x493af9('0x255')]['stateHpSlipDamageJS']={},VisuMZ[_0x493af9('0x255')]['stateHpSlipHealJS']={},VisuMZ[_0x493af9('0x255')][_0x493af9('0xef')]={},VisuMZ[_0x493af9('0x255')]['stateMpSlipHealJS']={},VisuMZ[_0x493af9('0x255')][_0x493af9('0x2a0')]={},VisuMZ['SkillsStatesCore']['stateTpSlipHealJS']={},Scene_Boot['prototype'][_0x493af9('0x61')]=function(_0x239585){const _0xcf8ec1=_0x493af9,_0x22061a=_0x239585[_0xcf8ec1('0x29f')],_0x2046d2=_0xcf8ec1('0x144');if(_0x22061a[_0xcf8ec1('0x1e0')](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if(_0xcf8ec1('0x1cd')!==_0xcf8ec1('0x1cd')){function _0x207de0(){const _0x96bb6b=_0xcf8ec1,_0x12678c=_0x521167[_0x96bb6b('0x29f')];_0x12678c[_0x96bb6b('0x1e0')](/<MP COST:[ ](\d+)>/i)&&(_0x3dc9e1['mpCost']=_0x300d53(_0x59f66e['$1'])),_0x12678c[_0x96bb6b('0x1e0')](/<TP COST:[ ](\d+)>/i)&&(_0x290c8f[_0x96bb6b('0x25c')]=_0x515c35(_0x38d195['$1']));}}else{const _0x114487=String(RegExp['$1']),_0x2b15c0=_0x2046d2[_0xcf8ec1('0x269')](_0x114487,_0xcf8ec1('0x186'),-0x1,_0xcf8ec1('0x1e5'));VisuMZ[_0xcf8ec1('0x255')][_0xcf8ec1('0x20')][_0x239585['id']]=new Function(_0xcf8ec1('0xeb'),_0x2b15c0);}}else{if(_0x22061a['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0xfa1474=String(RegExp['$1']),_0xf76b25=_0x2046d2[_0xcf8ec1('0x269')](_0xfa1474,_0xcf8ec1('0x1bb'),0x1,_0xcf8ec1('0x1e5'));VisuMZ[_0xcf8ec1('0x255')][_0xcf8ec1('0x2a6')][_0x239585['id']]=new Function(_0xcf8ec1('0xeb'),_0xf76b25);}}if(_0x22061a[_0xcf8ec1('0x1e0')](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if(_0xcf8ec1('0x180')!==_0xcf8ec1('0x180')){function _0x258181(){const _0x4bc23c=_0xcf8ec1;this[_0x4bc23c('0x2d8')](_0x853dff),this[_0x4bc23c('0xcf')](_0x35e136),this[_0x4bc23c('0x17b')](_0x4051c8);}}else{const _0x2120d7=String(RegExp['$1']),_0x43dc4e=_0x2046d2[_0xcf8ec1('0x269')](_0x2120d7,'damage',-0x1,_0xcf8ec1('0x103'));VisuMZ[_0xcf8ec1('0x255')]['stateMpSlipDamageJS'][_0x239585['id']]=new Function(_0xcf8ec1('0xeb'),_0x43dc4e);}}else{if(_0x22061a[_0xcf8ec1('0x1e0')](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0xcf8ec1('0x1fd')===_0xcf8ec1('0x6')){function _0x1a7ea4(){if(!_0x5bab56['value'](_0x50e586))return!![];}}else{const _0x185a91=String(RegExp['$1']),_0x4ca892=_0x2046d2[_0xcf8ec1('0x269')](_0x185a91,_0xcf8ec1('0x1bb'),0x1,'slipMp');VisuMZ['SkillsStatesCore'][_0xcf8ec1('0x153')][_0x239585['id']]=new Function(_0xcf8ec1('0xeb'),_0x4ca892);}}}if(_0x22061a[_0xcf8ec1('0x1e0')](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x366436=String(RegExp['$1']),_0x3bfc7b=_0x2046d2[_0xcf8ec1('0x269')](_0x366436,'damage',-0x1,_0xcf8ec1('0x12e'));VisuMZ[_0xcf8ec1('0x255')][_0xcf8ec1('0x2a0')][_0x239585['id']]=new Function(_0xcf8ec1('0xeb'),_0x3bfc7b);}else{if(_0x22061a[_0xcf8ec1('0x1e0')](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x17ce9a=String(RegExp['$1']),_0x22a809=_0x2046d2[_0xcf8ec1('0x269')](_0x17ce9a,'heal',0x1,_0xcf8ec1('0x12e'));VisuMZ['SkillsStatesCore'][_0xcf8ec1('0x1c3')][_0x239585['id']]=new Function(_0xcf8ec1('0xeb'),_0x22a809);}}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x1e8')]={},VisuMZ[_0x493af9('0x255')][_0x493af9('0x1a5')]={},VisuMZ[_0x493af9('0x255')]['stateExpireJS']={},Scene_Boot['prototype'][_0x493af9('0x2d7')]=function(_0x55353b){const _0x4b7abb=_0x493af9,_0x307da0=_0x55353b[_0x4b7abb('0x29f')],_0x232dc3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x307da0[_0x4b7abb('0x1e0')](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if(_0x4b7abb('0x266')===_0x4b7abb('0xda')){function _0x2d504b(){const _0x20725b=_0x4b7abb;try{_0x3eeb61[_0x20725b('0x255')][_0x20725b('0x14c')][_0x20725b('0x48')]['onExpireStateJS']['call'](this,_0x3c75a3);}catch(_0x17ffb6){if(_0xe44ffd[_0x20725b('0x2bb')]())_0x100c78[_0x20725b('0x3c')](_0x17ffb6);}}}else{const _0x46a197=String(RegExp['$1']),_0x8b8501=_0x232dc3[_0x4b7abb('0x269')](_0x46a197);VisuMZ[_0x4b7abb('0x255')][_0x4b7abb('0x1e8')][_0x55353b['id']]=new Function('stateId',_0x8b8501);}}if(_0x307da0[_0x4b7abb('0x1e0')](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x3d40c4=String(RegExp['$1']),_0x291e2b=_0x232dc3['format'](_0x3d40c4);VisuMZ[_0x4b7abb('0x255')][_0x4b7abb('0x1a5')][_0x55353b['id']]=new Function(_0x4b7abb('0xeb'),_0x291e2b);}if(_0x307da0[_0x4b7abb('0x1e0')](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if('TPfqc'===_0x4b7abb('0xfd')){function _0x4ffa96(){const _0x4e4809=_0x4b7abb;return _0x3dab02[_0x4e4809('0xcd')]&&_0x2d7272[_0x4e4809('0x2b3')][_0x4e4809('0x94')]('['+_0x377f9f+']');}}else{const _0x5bfdf5=String(RegExp['$1']),_0x319f0a=_0x232dc3[_0x4b7abb('0x269')](_0x5bfdf5);VisuMZ['SkillsStatesCore']['stateExpireJS'][_0x55353b['id']]=new Function(_0x4b7abb('0xeb'),_0x319f0a);}}},DataManager[_0x493af9('0x240')]=function(_0x5e2d89){const _0x713d62=_0x493af9;this['_stypeIDs']=this[_0x713d62('0x11')]||{};if(this[_0x713d62('0x11')][_0x5e2d89['id']])return this[_0x713d62('0x11')][_0x5e2d89['id']];this['_stypeIDs'][_0x5e2d89['id']]=[_0x5e2d89['stypeId']];if(_0x5e2d89[_0x713d62('0x29f')][_0x713d62('0x1e0')](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x713d62('0x220')!==_0x713d62('0x21e')){const _0x3cfef8=JSON['parse']('['+RegExp['$1'][_0x713d62('0x1e0')](/\d+/g)+']');this[_0x713d62('0x11')][_0x5e2d89['id']]=this['_stypeIDs'][_0x5e2d89['id']][_0x713d62('0x170')](_0x3cfef8);}else{function _0x12f787(){const _0x283793=_0x713d62;if(_0x473e77[_0x283793('0x96')])this[_0x283793('0x7')]();}}}else{if(_0x5e2d89[_0x713d62('0x29f')]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0xcf2e01=RegExp['$1'][_0x713d62('0xfc')](',');for(const _0x4fc127 of _0xcf2e01){const _0x20cd7b=DataManager['getStypeIdWithName'](_0x4fc127);if(_0x20cd7b)this[_0x713d62('0x11')][_0x5e2d89['id']][_0x713d62('0x233')](_0x20cd7b);}}}return this[_0x713d62('0x11')][_0x5e2d89['id']];},DataManager[_0x493af9('0x45')]=function(_0x2adc9b){const _0xf6676c=_0x493af9;_0x2adc9b=_0x2adc9b[_0xf6676c('0x23b')]()[_0xf6676c('0x2d9')](),this[_0xf6676c('0x11')]=this[_0xf6676c('0x11')]||{};if(this[_0xf6676c('0x11')][_0x2adc9b])return this[_0xf6676c('0x11')][_0x2adc9b];for(let _0x421c40=0x1;_0x421c40<0x64;_0x421c40++){if(_0xf6676c('0x1d1')===_0xf6676c('0x1e6')){function _0x4f82c9(){const _0x3c4771=_0xf6676c;_0xf79eb3+=this[_0x3c4771('0x89')](_0x347b4e),this[_0x3c4771('0x161')](_0x842124,_0x3a0942);}}else{if(!$dataSystem[_0xf6676c('0x1e7')][_0x421c40])continue;let _0x468448=$dataSystem[_0xf6676c('0x1e7')][_0x421c40][_0xf6676c('0x23b')]()['trim']();_0x468448=_0x468448['replace'](/\x1I\[(\d+)\]/gi,''),_0x468448=_0x468448[_0xf6676c('0x101')](/\\I\[(\d+)\]/gi,''),this[_0xf6676c('0x11')][_0x468448]=_0x421c40;}}return this['_stypeIDs'][_0x2adc9b]||0x0;},DataManager['getSkillIdWithName']=function(_0x2202b2){const _0xbaa286=_0x493af9;_0x2202b2=_0x2202b2['toUpperCase']()[_0xbaa286('0x2d9')](),this[_0xbaa286('0x9d')]=this[_0xbaa286('0x9d')]||{};if(this[_0xbaa286('0x9d')][_0x2202b2])return this['_skillIDs'][_0x2202b2];for(const _0xb8612f of $dataSkills){if('AsfPo'===_0xbaa286('0xf5')){if(!_0xb8612f)continue;this[_0xbaa286('0x9d')][_0xb8612f['name']['toUpperCase']()[_0xbaa286('0x2d9')]()]=_0xb8612f['id'];}else{function _0x6f2179(){const _0x1b8692=_0xbaa286;_0x136d95[_0x1b8692('0x255')][_0x1b8692('0x14c')][_0x1b8692('0x51')][_0x1b8692('0xb3')]['call'](this,_0x26e6ef);}}}return this['_skillIDs'][_0x2202b2]||0x0;},DataManager[_0x493af9('0x16d')]=function(_0x54b486){const _0x14144c=_0x493af9;_0x54b486=_0x54b486[_0x14144c('0x23b')]()[_0x14144c('0x2d9')](),this[_0x14144c('0x298')]=this[_0x14144c('0x298')]||{};if(this[_0x14144c('0x298')][_0x54b486])return this[_0x14144c('0x298')][_0x54b486];for(const _0x10d6f8 of $dataStates){if(!_0x10d6f8)continue;this[_0x14144c('0x298')][_0x10d6f8[_0x14144c('0x160')]['toUpperCase']()[_0x14144c('0x2d9')]()]=_0x10d6f8['id'];}return this[_0x14144c('0x298')][_0x54b486]||0x0;},DataManager[_0x493af9('0x57')]=function(_0x390309){const _0x163cc2=_0x493af9;this[_0x163cc2('0x2a7')]=this[_0x163cc2('0x2a7')]||{};if(this[_0x163cc2('0x2a7')][_0x390309])return this['_stateMaxTurns'][_0x390309];return $dataStates[_0x390309]['note'][_0x163cc2('0x1e0')](/<MAX TURNS:[ ](\d+)>/i)?this[_0x163cc2('0x2a7')][_0x390309]=Number(RegExp['$1']):this['_stateMaxTurns'][_0x390309]=VisuMZ[_0x163cc2('0x255')]['Settings'][_0x163cc2('0x48')][_0x163cc2('0x14b')],this['_stateMaxTurns'][_0x390309];},ColorManager[_0x493af9('0x69')]=function(_0x215e06,_0x101897){const _0x126b11=_0x493af9;_0x101897=String(_0x101897),this[_0x126b11('0x1b4')]=this[_0x126b11('0x1b4')]||{};if(_0x101897[_0x126b11('0x1e0')](/#(.*)/i)){if(_0x126b11('0x5f')!==_0x126b11('0xc5'))this[_0x126b11('0x1b4')][_0x215e06]=_0x126b11('0x241')[_0x126b11('0x269')](String(RegExp['$1']));else{function _0x542534(){const _0x250083=_0x126b11;for(const _0xc15f8 of _0x55e641){_0xc15f8['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x291692=_0x4c6a51[_0x250083('0x17e')](_0x4723fc(_0x5d42ae['$1'])[_0x250083('0x23b')]()),_0x210298=_0x44dcb8(_0x547cd9['$2']);_0x291692>=0x0&&(_0x5fb4c[_0x250083('0x1d3')](_0x291692,_0x210298),this[_0x250083('0x234')](_0x107ac8));}}}}else this[_0x126b11('0x1b4')][_0x215e06]=this[_0x126b11('0x2bc')](Number(_0x101897));return this['_colorCache'][_0x215e06];},ColorManager[_0x493af9('0x254')]=function(_0x1c0250){const _0x33552c=_0x493af9;return _0x1c0250=String(_0x1c0250),_0x1c0250[_0x33552c('0x1e0')](/#(.*)/i)?_0x33552c('0x241')[_0x33552c('0x269')](String(RegExp['$1'])):this[_0x33552c('0x2bc')](Number(_0x1c0250));},ColorManager[_0x493af9('0x247')]=function(_0x22ab3e){const _0x436002=_0x493af9;if(typeof _0x22ab3e===_0x436002('0x82'))_0x22ab3e=$dataStates[_0x22ab3e];const _0x4839e1=_0x436002('0x26e')[_0x436002('0x269')](_0x22ab3e['id']);this[_0x436002('0x1b4')]=this['_colorCache']||{};if(this[_0x436002('0x1b4')][_0x4839e1])return this[_0x436002('0x1b4')][_0x4839e1];const _0x1ef9b7=this['retrieveStateColor'](_0x22ab3e);return this[_0x436002('0x69')](_0x4839e1,_0x1ef9b7);},ColorManager[_0x493af9('0x88')]=function(_0x4d226e){const _0x264a92=_0x493af9,_0x5c0402=_0x4d226e['note'];if(_0x5c0402[_0x264a92('0x1e0')](/<TURN COLOR:[ ](.*)>/i)){if(_0x264a92('0x1d')==='DguoN'){function _0x19b560(){const _0x41d2d0=_0x264a92;_0x1e77dd[_0x41d2d0('0x255')][_0x41d2d0('0x14c')][_0x41d2d0('0x48')][_0x41d2d0('0x155')][_0x41d2d0('0x19d')](this,_0x1e26d9);}}else return String(RegExp['$1']);}else{if(_0x5c0402[_0x264a92('0x1e0')](/<POSITIVE STATE>/i)){if(_0x264a92('0x248')===_0x264a92('0x8f')){function _0x51f7a2(){const _0x48fde4=_0x264a92,_0x3b34cf=_0x18c2b0['$1'][_0x48fde4('0xfc')](',');for(const _0x237d44 of _0x3b34cf){const _0x82ee77=_0x5a4b9e[_0x48fde4('0x45')](_0x237d44);if(_0x82ee77)this[_0x48fde4('0x11')][_0x22aa61['id']][_0x48fde4('0x233')](_0x82ee77);}}}else return VisuMZ['SkillsStatesCore'][_0x264a92('0x14c')][_0x264a92('0x48')][_0x264a92('0x5d')];}else{if(_0x5c0402[_0x264a92('0x1e0')](/<NEGATIVE STATE>/i))return VisuMZ[_0x264a92('0x255')][_0x264a92('0x14c')][_0x264a92('0x48')]['ColorNegative'];else{if(_0x264a92('0x14f')!==_0x264a92('0x14f')){function _0x427bea(){const _0x567f0b=_0x264a92;this[_0x567f0b('0x158')](_0x97c882['id']),this[_0x567f0b('0x14d')](_0x2f62c1['id']),this[_0x567f0b('0x77')](_0x56e76c['id']);}}else return VisuMZ['SkillsStatesCore']['Settings'][_0x264a92('0x48')][_0x264a92('0x49')];}}}},ColorManager[_0x493af9('0x292')]=function(){const _0x3ae20a=_0x493af9,_0x5aa018=_0x3ae20a('0x24');this[_0x3ae20a('0x1b4')]=this[_0x3ae20a('0x1b4')]||{};if(this['_colorCache'][_0x5aa018])return this[_0x3ae20a('0x1b4')][_0x5aa018];const _0x31da10=VisuMZ[_0x3ae20a('0x255')][_0x3ae20a('0x14c')][_0x3ae20a('0x51')][_0x3ae20a('0xb4')];return this[_0x3ae20a('0x69')](_0x5aa018,_0x31da10);},ColorManager[_0x493af9('0x90')]=function(){const _0xe9353d=_0x493af9,_0x1b83ab=_0xe9353d('0x2a8');this[_0xe9353d('0x1b4')]=this[_0xe9353d('0x1b4')]||{};if(this['_colorCache'][_0x1b83ab])return this[_0xe9353d('0x1b4')][_0x1b83ab];const _0x123441=VisuMZ['SkillsStatesCore'][_0xe9353d('0x14c')][_0xe9353d('0x51')][_0xe9353d('0x7d')];return this[_0xe9353d('0x69')](_0x1b83ab,_0x123441);},VisuMZ['SkillsStatesCore'][_0x493af9('0x2c1')]=Game_Action[_0x493af9('0x192')][_0x493af9('0x1d7')],Game_Action[_0x493af9('0x192')][_0x493af9('0x1d7')]=function(_0x2d022e){const _0x502802=_0x493af9;VisuMZ['SkillsStatesCore'][_0x502802('0x2c1')]['call'](this,_0x2d022e),this[_0x502802('0x1c6')](_0x2d022e);},Game_Action[_0x493af9('0x192')][_0x493af9('0x1c6')]=function(_0x1365e3){const _0x12a987=_0x493af9;this[_0x12a987('0x2c0')](_0x1365e3),this[_0x12a987('0xce')](_0x1365e3),this[_0x12a987('0x23f')](_0x1365e3),this[_0x12a987('0x2cc')](_0x1365e3);},Game_Action[_0x493af9('0x192')][_0x493af9('0x2c0')]=function(_0x6b1d6a){const _0x3b029b=_0x493af9;if(_0x6b1d6a[_0x3b029b('0x195')]()['length']<=0x0)return;const _0x98aa1a=this[_0x3b029b('0x2e1')]()[_0x3b029b('0x29f')],_0x5b5ca9=_0x98aa1a['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x5b5ca9){if(_0x3b029b('0x146')!=='PnmzV'){function _0x127ba9(){const _0x5ccdb0=_0x3b029b,_0x3fc796=_0x78384f[_0x5ccdb0('0x239')][_0x5ccdb0('0x14c')][_0x5ccdb0('0x29c')]['DisplayedParams'],_0xd4827b=_0xe90b84[_0x5ccdb0('0x1b8')](_0x405903/0x2)-0x18;let _0x202fd9=_0x327368,_0x653c50=_0x38f3da[_0x5ccdb0('0x1b8')]((this[_0x5ccdb0('0x235')]-_0x1519c0[_0x5ccdb0('0xab')](_0x3fc796[_0x5ccdb0('0x267')]/0x2)*_0x54ddc3)/0x2),_0x5d0ff7=0x0;for(const _0x27b00b of _0x3fc796){this[_0x5ccdb0('0x5a')](_0x202fd9,_0x653c50,_0xd4827b,_0x27b00b),_0x5d0ff7++,_0x5d0ff7%0x2===0x0?(_0x202fd9=_0x39c5bb,_0x653c50+=_0x11be6d):_0x202fd9+=_0xd4827b+0x18;}}}else for(const _0xbaee of _0x5b5ca9){_0xbaee[_0x3b029b('0x1e0')](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x363090=String(RegExp['$1']),_0x29748c=Number(RegExp['$2']);_0x6b1d6a['removeStatesByCategory'](_0x363090,_0x29748c);}}},Game_Action[_0x493af9('0x192')][_0x493af9('0xce')]=function(_0x2f9446){const _0xb34cda=_0x493af9,_0x3e6fc3=this[_0xb34cda('0x2e1')]()[_0xb34cda('0x29f')],_0x526da9=_0x3e6fc3['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x526da9){if(_0xb34cda('0x15d')==='rKOgh')for(const _0x47f7c7 of _0x526da9){let _0x6cf664=0x0,_0x5aa699=0x0;if(_0x47f7c7[_0xb34cda('0x1e0')](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0xb34cda('0x21d')===_0xb34cda('0x21d'))_0x6cf664=Number(RegExp['$1']),_0x5aa699=Number(RegExp['$2']);else{function _0x342fb7(){const _0x53f2c5=_0xb34cda;if(_0x5db5d8[_0x53f2c5('0x250')][_0x53f2c5('0x23b')]()==='MP')return _0x1b2067['CalcJS'][_0x53f2c5('0x19d')](this,_0x29ba0c);}}}else{if(_0x47f7c7[_0xb34cda('0x1e0')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)){if('KFvvO'!=='KFvvO'){function _0x266e23(){const _0x5d6778=_0xb34cda;_0x2c6c42[_0x5d6778('0x192')][_0x5d6778('0x163')][_0x5d6778('0x19d')](this,_0x63aab2),this[_0x5d6778('0x1c4')](_0x3c6958),this[_0x5d6778('0xb7')](_0x57316a);}}else _0x6cf664=DataManager[_0xb34cda('0x16d')](RegExp['$1']),_0x5aa699=Number(RegExp['$2']);}}_0x2f9446[_0xb34cda('0x161')](_0x6cf664,_0x5aa699),this[_0xb34cda('0x234')](_0x2f9446);}else{function _0x22a01b(){const _0x4ff259=_0xb34cda;return this[_0x4ff259('0x261')]()?this['shopStatusWindowRectSkillsStatesCore']():_0x55e683['SkillsStatesCore'][_0x4ff259('0x14c')][_0x4ff259('0x182')][_0x4ff259('0xdf')]['call'](this);}}}const _0x18246b=_0x3e6fc3[_0xb34cda('0x1e0')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x18246b)for(const _0xb2259a of _0x18246b){let _0x324915=0x0,_0x131a19=0x0;if(_0xb2259a[_0xb34cda('0x1e0')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x324915=Number(RegExp['$1']),_0x131a19=Number(RegExp['$2']);else _0xb2259a[_0xb34cda('0x1e0')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x324915=DataManager[_0xb34cda('0x16d')](RegExp['$1']),_0x131a19=Number(RegExp['$2']));_0x2f9446[_0xb34cda('0x72')](_0x324915,_0x131a19),this[_0xb34cda('0x234')](_0x2f9446);}},Game_Action[_0x493af9('0x192')][_0x493af9('0x23f')]=function(_0x38d1c9){const _0x3854c4=_0x493af9,_0x4b88f4=[_0x3854c4('0x81'),_0x3854c4('0x13'),_0x3854c4('0xd8'),_0x3854c4('0xb5'),'MAT',_0x3854c4('0x76'),_0x3854c4('0xf2'),_0x3854c4('0x1ae')],_0xbeb6d0=this['item']()['note'],_0x16096e=_0xbeb6d0['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x16096e){if(_0x3854c4('0x64')!=='JBDzl')for(const _0x396812 of _0x16096e){if(_0x3854c4('0x1b2')===_0x3854c4('0x1b2')){_0x396812[_0x3854c4('0x1e0')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x35ec4e=_0x4b88f4[_0x3854c4('0x17e')](String(RegExp['$1'])[_0x3854c4('0x23b')]()),_0x316c2b=Number(RegExp['$2']);if(_0x35ec4e>=0x0){if(_0x3854c4('0x147')===_0x3854c4('0x2ce')){function _0x2a14be(){const _0xb8625b=_0x3854c4;if(_0x31936b[_0xb8625b('0x267')]>0x0)_0x50a4f6+=this[_0xb8625b('0x245')]();_0x1ec0f4+=_0x30d579(_0x2b62aa['$1']);}}else _0x38d1c9[_0x3854c4('0x58')](_0x35ec4e,_0x316c2b),this[_0x3854c4('0x234')](_0x38d1c9);}}else{function _0x161415(){_0x873698=_0x148b0c,_0x8f0031+=_0x141e3e;}}}else{function _0x560a41(){const _0x40f2e4=_0x3854c4;_0xbd4af7[_0x40f2e4('0x192')]['isRightInputMode'][_0x40f2e4('0x19d')](this);}}}const _0x1e5a3d=_0xbeb6d0[_0x3854c4('0x1e0')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1e5a3d)for(const _0x3eb1e2 of _0x16096e){_0x3eb1e2[_0x3854c4('0x1e0')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x22d892=_0x4b88f4[_0x3854c4('0x17e')](String(RegExp['$1'])[_0x3854c4('0x23b')]()),_0x46d56f=Number(RegExp['$2']);_0x22d892>=0x0&&(_0x38d1c9[_0x3854c4('0x1a2')](_0x22d892,_0x46d56f),this[_0x3854c4('0x234')](_0x38d1c9));}},Game_Action[_0x493af9('0x192')][_0x493af9('0x2cc')]=function(_0x3c05a3){const _0x28b2d2=_0x493af9,_0x8d52a0=[_0x28b2d2('0x81'),_0x28b2d2('0x13'),_0x28b2d2('0xd8'),_0x28b2d2('0xb5'),'MAT',_0x28b2d2('0x76'),_0x28b2d2('0xf2'),'LUK'],_0x3be2fa=this['item']()[_0x28b2d2('0x29f')],_0x912f88=_0x3be2fa[_0x28b2d2('0x1e0')](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x912f88){if(_0x28b2d2('0x2bd')!=='QydxA'){function _0x1064a1(){const _0x21ccff=_0x28b2d2;return _0x21ccff('0x1f8')[_0x21ccff('0x269')](_0x26f506[_0x21ccff('0x16c')]());}}else for(const _0x5b6d53 of _0x912f88){_0x5b6d53['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x30017c=_0x8d52a0[_0x28b2d2('0x17e')](String(RegExp['$1'])['toUpperCase']()),_0x2c4630=Number(RegExp['$2']);_0x30017c>=0x0&&(_0x3c05a3[_0x28b2d2('0x1d3')](_0x30017c,_0x2c4630),this[_0x28b2d2('0x234')](_0x3c05a3));}}const _0x4a2a42=_0x3be2fa[_0x28b2d2('0x1e0')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4a2a42)for(const _0xf137b1 of _0x912f88){_0xf137b1[_0x28b2d2('0x1e0')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0xe45930=_0x8d52a0[_0x28b2d2('0x17e')](String(RegExp['$1'])['toUpperCase']()),_0x4d341f=Number(RegExp['$2']);_0xe45930>=0x0&&(_0x3c05a3[_0x28b2d2('0xca')](_0xe45930,_0x4d341f),this[_0x28b2d2('0x234')](_0x3c05a3));}},VisuMZ[_0x493af9('0x255')]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x124')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x124')]=function(){const _0x429f33=_0x493af9;this['_cache']={},this[_0x429f33('0x25d')](),VisuMZ[_0x429f33('0x255')][_0x429f33('0x274')]['call'](this);},Game_BattlerBase['prototype'][_0x493af9('0x25d')]=function(){const _0x27e06b=_0x493af9;this[_0x27e06b('0x1b0')]='',this[_0x27e06b('0xd6')]={},this['_stateDisplay']={},this[_0x27e06b('0x172')]={};},Game_BattlerBase['prototype'][_0x493af9('0x20e')]=function(_0x12839a){const _0x1a10c8=_0x493af9;return this[_0x1a10c8('0x2e3')]=this['_cache']||{},this[_0x1a10c8('0x2e3')][_0x12839a]!==undefined;},VisuMZ[_0x493af9('0x255')]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x493af9('0x192')]['refresh'],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x2df')]=function(){const _0x5a825f=_0x493af9;this[_0x5a825f('0x2e3')]={},VisuMZ[_0x5a825f('0x255')][_0x5a825f('0x263')][_0x5a825f('0x19d')](this);},VisuMZ['SkillsStatesCore'][_0x493af9('0x253')]=Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x28c')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x28c')]=function(_0xdb7b1){const _0x2f3247=_0x493af9;let _0x35d0b7=this[_0x2f3247('0x26d')](_0xdb7b1);VisuMZ['SkillsStatesCore'][_0x2f3247('0x253')][_0x2f3247('0x19d')](this,_0xdb7b1);if(_0x35d0b7&&!this[_0x2f3247('0x26d')](_0xdb7b1))this['onRemoveState'](_0xdb7b1);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x163')]=function(_0x5bca11){const _0x19ddad=_0x493af9;this[_0x19ddad('0x2d8')](_0x5bca11),this[_0x19ddad('0xcf')](_0x5bca11),this['clearStateOrigin'](_0x5bca11);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x209')]=Game_BattlerBase[_0x493af9('0x192')]['resetStateCounts'],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1a3')]=function(_0x6cd2fe){const _0x53cae9=_0x493af9,_0x596572=$dataStates[_0x6cd2fe],_0x54ce34=this[_0x53cae9('0x89')](_0x6cd2fe),_0x2c18a8=this[_0x53cae9('0x1af')](_0x596572)['toLowerCase']()[_0x53cae9('0x2d9')]();switch(_0x2c18a8){case _0x53cae9('0xc6'):if(_0x54ce34<=0x0)VisuMZ['SkillsStatesCore'][_0x53cae9('0x209')][_0x53cae9('0x19d')](this,_0x6cd2fe);break;case'reset':VisuMZ[_0x53cae9('0x255')][_0x53cae9('0x209')][_0x53cae9('0x19d')](this,_0x6cd2fe);break;case'greater':VisuMZ['SkillsStatesCore'][_0x53cae9('0x209')][_0x53cae9('0x19d')](this,_0x6cd2fe),this[_0x53cae9('0x139')][_0x6cd2fe]=Math[_0x53cae9('0x277')](this[_0x53cae9('0x139')][_0x6cd2fe],_0x54ce34);break;case _0x53cae9('0xd5'):VisuMZ[_0x53cae9('0x255')][_0x53cae9('0x209')][_0x53cae9('0x19d')](this,_0x6cd2fe),this['_stateTurns'][_0x6cd2fe]+=_0x54ce34;break;default:VisuMZ[_0x53cae9('0x255')][_0x53cae9('0x209')][_0x53cae9('0x19d')](this,_0x6cd2fe);break;}},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1af')]=function(_0x16490f){const _0x536558=_0x493af9,_0x21ea17=_0x16490f[_0x536558('0x29f')];if(_0x21ea17[_0x536558('0x1e0')](/<REAPPLY RULES:[ ](.*)>/i)){if(_0x536558('0x1ea')===_0x536558('0x12')){function _0x5d0725(){const _0x41741e=_0x536558;return _0x1f4923[_0x41741e('0x255')][_0x41741e('0xe4')][_0x41741e('0x19d')](this);}}else return String(RegExp['$1']);}else{if(_0x536558('0x142')===_0x536558('0x290')){function _0x25fe56(){const _0x4f1f1a=_0x536558;return this[_0x4f1f1a('0xe2')]()['match'](/RIGHT/i);}}else return VisuMZ[_0x536558('0x255')][_0x536558('0x14c')][_0x536558('0x48')][_0x536558('0x2a9')];}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x1b9')]=Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xed')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xed')]=function(_0x4da677,_0x21ce2b){const _0x438c10=_0x493af9,_0x233c16=VisuMZ[_0x438c10('0x255')][_0x438c10('0x14c')]['Buffs'][_0x438c10('0x2a9')],_0x1c2a66=this[_0x438c10('0x270')](_0x4da677);switch(_0x233c16){case _0x438c10('0xc6'):if(_0x1c2a66<=0x0)this[_0x438c10('0xe9')][_0x4da677]=_0x21ce2b;break;case _0x438c10('0xb9'):this[_0x438c10('0xe9')][_0x4da677]=_0x21ce2b;break;case _0x438c10('0x128'):this['_buffTurns'][_0x4da677]=Math['max'](_0x1c2a66,_0x21ce2b);break;case _0x438c10('0xd5'):this[_0x438c10('0xe9')][_0x4da677]+=_0x21ce2b;break;default:VisuMZ['SkillsStatesCore'][_0x438c10('0x1b9')][_0x438c10('0x19d')](this,_0x4da677,_0x21ce2b);break;}const _0x53df9b=VisuMZ[_0x438c10('0x255')]['Settings'][_0x438c10('0x51')][_0x438c10('0x14b')];this['_buffTurns'][_0x4da677]=this['_buffTurns'][_0x4da677][_0x438c10('0x20b')](0x0,_0x53df9b);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x176')]=function(){const _0x1a7e7c=_0x493af9;if(this['_cache'][_0x1a7e7c('0x84')]!==undefined)return this[_0x1a7e7c('0x2e3')]['groupDefeat'];this[_0x1a7e7c('0x2e3')][_0x1a7e7c('0x84')]=![];const _0xbbcd19=this[_0x1a7e7c('0x195')]();for(const _0x157862 of _0xbbcd19){if(!_0x157862)continue;if(_0x157862[_0x1a7e7c('0x29f')]['match'](/<GROUP DEFEAT>/i)){this[_0x1a7e7c('0x2e3')][_0x1a7e7c('0x84')]=!![];break;}}return this[_0x1a7e7c('0x2e3')][_0x1a7e7c('0x84')];},VisuMZ[_0x493af9('0x255')][_0x493af9('0x293')]=Game_BattlerBase['prototype'][_0x493af9('0x165')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x165')]=function(){const _0x42b797=_0x493af9;this[_0x42b797('0x53')]()!==''?this['clearStatesWithStateRetain']():(VisuMZ[_0x42b797('0x255')]['Game_BattlerBase_clearStates'][_0x42b797('0x19d')](this),this['initMembersSkillsStatesCore']());},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x24f')]=function(){const _0x401578=_0x493af9,_0x1dec1d=this[_0x401578('0x195')]();for(const _0x22c266 of _0x1dec1d){if(_0x22c266&&this[_0x401578('0x0')](_0x22c266))this[_0x401578('0x28c')](_0x22c266['id']);}this[_0x401578('0x2e3')]={};},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x0')]=function(_0xf9e049){const _0xfc2c1d=_0x493af9,_0xc4fb0f=this[_0xfc2c1d('0x53')]();if(_0xc4fb0f!==''){const _0x2836be=_0xf9e049[_0xfc2c1d('0x29f')];if(_0xc4fb0f===_0xfc2c1d('0x3a')&&_0x2836be[_0xfc2c1d('0x1e0')](/<NO DEATH CLEAR>/i))return![];if(_0xc4fb0f===_0xfc2c1d('0x252')&&_0x2836be[_0xfc2c1d('0x1e0')](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0xfc2c1d('0x26d')](_0xf9e049['id']);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x53')]=function(){const _0x579689=_0x493af9;return this[_0x579689('0x1b0')];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x22c')]=function(_0x531c5f){const _0x5ebca1=_0x493af9;this[_0x5ebca1('0x1b0')]=_0x531c5f;},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x20d')]=function(){this['_stateRetainType']='';},VisuMZ[_0x493af9('0x255')][_0x493af9('0x102')]=Game_BattlerBase[_0x493af9('0x192')]['die'],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xe6')]=function(){const _0x5eafee=_0x493af9;this[_0x5eafee('0x22c')](_0x5eafee('0x3a')),VisuMZ[_0x5eafee('0x255')]['Game_BattlerBase_die'][_0x5eafee('0x19d')](this),this['clearStateRetainType']();},VisuMZ[_0x493af9('0x255')][_0x493af9('0x2a5')]=Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x23c')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x23c')]=function(){const _0x16d505=_0x493af9;this[_0x16d505('0x22c')](_0x16d505('0x252')),VisuMZ[_0x16d505('0x255')]['Game_BattlerBase_recoverAll'][_0x16d505('0x19d')](this),this['clearStateRetainType']();},Game_BattlerBase['prototype'][_0x493af9('0x10c')]=function(_0x1543ab){const _0x54770c=_0x493af9;for(settings of VisuMZ[_0x54770c('0x255')][_0x54770c('0x14c')][_0x54770c('0x93')]){const _0x11ef4a=settings[_0x54770c('0xba')][_0x54770c('0x19d')](this,_0x1543ab);if(!settings[_0x54770c('0x1c1')][_0x54770c('0x19d')](this,_0x1543ab,_0x11ef4a))return![];}return!![];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x3d')]=function(_0x24b8c2){const _0x2d0c9a=_0x493af9;for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x2d0c9a('0x93')]){const _0x5174c3=settings[_0x2d0c9a('0xba')][_0x2d0c9a('0x19d')](this,_0x24b8c2);settings[_0x2d0c9a('0x2b8')][_0x2d0c9a('0x19d')](this,_0x24b8c2,_0x5174c3);}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x2b1')]=Game_BattlerBase[_0x493af9('0x192')]['meetsSkillConditions'],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x10b')]=function(_0x5c6497){const _0x44cb97=_0x493af9;if(!_0x5c6497)return![];if(!VisuMZ[_0x44cb97('0x255')][_0x44cb97('0x2b1')][_0x44cb97('0x19d')](this,_0x5c6497))return![];if(!this[_0x44cb97('0x1d2')](_0x5c6497))return![];if(!this['meetsSkillConditionsEnableJS'](_0x5c6497))return![];if(!this[_0x44cb97('0x98')](_0x5c6497))return![];return!![];},Game_BattlerBase['prototype'][_0x493af9('0x1d2')]=function(_0x41aa18){const _0x376613=_0x493af9;if(!this[_0x376613('0x132')](_0x41aa18))return![];return!![];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x132')]=function(_0x108031){const _0xd1b099=_0x493af9,_0x36cdc4=_0x108031['note'];if(_0x36cdc4[_0xd1b099('0x1e0')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd1b099('0x199')===_0xd1b099('0x199')){const _0x4510f6=JSON[_0xd1b099('0x201')]('['+RegExp['$1'][_0xd1b099('0x1e0')](/\d+/g)+']');for(const _0x4ac745 of _0x4510f6){if(_0xd1b099('0x60')==='nPJjC'){function _0x4a8fa2(){const _0x49f383=_0xd1b099;return _0x20e672[_0x49f383('0x255')][_0x49f383('0x46')][_0x49f383('0x19d')](this);}}else{if(!$gameSwitches[_0xd1b099('0x278')](_0x4ac745))return![];}}return!![];}else{function _0x277db(){const _0x3224c9=_0xd1b099;return _0x4ce9c4[_0x39ad9c['id']][_0x3224c9('0x19d')](this,_0x199d1b);}}}if(_0x36cdc4['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd1b099('0x2c8')===_0xd1b099('0x2c8')){const _0x5a3f70=JSON[_0xd1b099('0x201')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2ebdbf of _0x5a3f70){if(!$gameSwitches[_0xd1b099('0x278')](_0x2ebdbf))return![];}return!![];}else{function _0x573e69(){const _0x301552=_0xd1b099,_0x59acb4=_0x1542e1[_0x301552('0x29f')],_0x430d28=_0x27301e['SkillsStatesCore'][_0x301552('0x223')];return _0x430d28[_0x204def['id']]?_0x430d28[_0x19602d['id']][_0x301552('0x19d')](this,_0x3a0b05):!![];}}}if(_0x36cdc4[_0xd1b099('0x1e0')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5499e0=JSON['parse']('['+RegExp['$1'][_0xd1b099('0x1e0')](/\d+/g)+']');for(const _0x160559 of _0x5499e0){if(_0xd1b099('0x171')!==_0xd1b099('0x171')){function _0x48f2c9(){return _0x49ab37['uiInputPosition'];}}else{if($gameSwitches['value'](_0x160559))return!![];}}return![];}if(_0x36cdc4[_0xd1b099('0x1e0')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd1b099('0x10f')!==_0xd1b099('0x1b7')){const _0x897752=JSON[_0xd1b099('0x201')]('['+RegExp['$1'][_0xd1b099('0x1e0')](/\d+/g)+']');for(const _0x467877 of _0x897752){if(_0xd1b099('0x190')===_0xd1b099('0x190')){if(!$gameSwitches['value'](_0x467877))return!![];}else{function _0x1b3eab(){const _0x464b91=_0xd1b099,_0x53e421=_0x225da6[_0x464b91('0x29f')],_0x389476=_0x464b91('0x8b');if(_0x53e421[_0x464b91('0x1e0')](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0xc75a08=_0x18bf13(_0x4f6cba['$1']),_0x3d1348=_0x389476['format'](_0xc75a08);_0x294fe5[_0x464b91('0x255')]['stateAddJS'][_0x2cb6b1['id']]=new _0x36ab23('stateId',_0x3d1348);}if(_0x53e421[_0x464b91('0x1e0')](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x543a0e=_0x25e660(_0x4014f4['$1']),_0x3fd000=_0x389476[_0x464b91('0x269')](_0x543a0e);_0x3fbb8b['SkillsStatesCore'][_0x464b91('0x1a5')][_0x4ef66a['id']]=new _0x12ad2e(_0x464b91('0xeb'),_0x3fd000);}if(_0x53e421[_0x464b91('0x1e0')](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x34ccf5=_0x87416c(_0x180832['$1']),_0x34b5df=_0x389476['format'](_0x34ccf5);_0x30c5b3[_0x464b91('0x255')][_0x464b91('0x27c')][_0x4fe919['id']]=new _0xccb154('stateId',_0x34b5df);}}}}return![];}else{function _0x32ba5b(){const _0x35dd51=_0xd1b099;_0x14b0db[_0x286f6e][_0x36c56a][_0x35dd51('0x19d')](this,_0x217dca);}}}if(_0x36cdc4['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ad29e=JSON[_0xd1b099('0x201')]('['+RegExp['$1'][_0xd1b099('0x1e0')](/\d+/g)+']');for(const _0x3c6045 of _0x3ad29e){if(!$gameSwitches[_0xd1b099('0x278')](_0x3c6045))return!![];}return![];}if(_0x36cdc4[_0xd1b099('0x1e0')](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd1b099('0x243')!==_0xd1b099('0x74')){const _0x5cc414=JSON[_0xd1b099('0x201')]('['+RegExp['$1'][_0xd1b099('0x1e0')](/\d+/g)+']');for(const _0x3da52d of _0x5cc414){if(_0xd1b099('0x16f')==='hkclG'){if($gameSwitches[_0xd1b099('0x278')](_0x3da52d))return![];}else{function _0x29fd34(){const _0x4314df=_0xd1b099,_0x46dcc4=_0x41546e[_0x4314df('0x201')]('['+_0x3be7e7['$1'][_0x4314df('0x1e0')](/\d+/g)+']');for(const _0x8cd6f9 of _0x46dcc4){if(!this[_0x4314df('0x2be')]['hasSkill'](_0x8cd6f9))return![];}return!![];}}}return!![];}else{function _0x415be3(){const _0x2df937=_0xd1b099;if(_0x48db3c&&this['canClearState'](_0x9d3ff6))this[_0x2df937('0x28c')](_0x3fed78['id']);}}}return!![];},Game_BattlerBase['prototype'][_0x493af9('0x116')]=function(_0x4fb21a){const _0x163d0d=_0x493af9,_0x2f7e59=_0x4fb21a[_0x163d0d('0x29f')],_0x4ef9ae=VisuMZ[_0x163d0d('0x255')]['skillEnableJS'];if(_0x4ef9ae[_0x4fb21a['id']]){if(_0x163d0d('0x39')!==_0x163d0d('0x151'))return _0x4ef9ae[_0x4fb21a['id']][_0x163d0d('0x19d')](this,_0x4fb21a);else{function _0x29b66d(){const _0x4860b9=_0x163d0d,_0x503d55=_0x3e003c[_0x4860b9('0x29f')];return _0x503d55[_0x4860b9('0x1e0')](/<REAPPLY RULES:[ ](.*)>/i)?_0x5b05a4(_0x3b1cd7['$1']):_0x3105d3[_0x4860b9('0x255')]['Settings'][_0x4860b9('0x48')][_0x4860b9('0x2a9')];}}}else{if(_0x163d0d('0x18')!==_0x163d0d('0x18')){function _0x534403(){const _0x38d0bd=_0x163d0d;if(!this[_0x38d0bd('0x2be')][_0x38d0bd('0x31')](_0x505fb6))return!![];}}else return!![];}},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x98')]=function(_0x59d504){const _0x341d30=_0x493af9;return VisuMZ[_0x341d30('0x255')][_0x341d30('0x14c')][_0x341d30('0x182')][_0x341d30('0x181')][_0x341d30('0x19d')](this,_0x59d504);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x1a4')]=Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x26c')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x26c')]=function(_0x469d4d){const _0x5dc32a=_0x493af9;for(settings of VisuMZ['SkillsStatesCore'][_0x5dc32a('0x14c')][_0x5dc32a('0x93')]){if(_0x5dc32a('0x8a')===_0x5dc32a('0x27f')){function _0x47e4e6(){return![];}}else{if(settings[_0x5dc32a('0x250')][_0x5dc32a('0x23b')]()==='MP'){if(_0x5dc32a('0x258')===_0x5dc32a('0x258'))return settings[_0x5dc32a('0xba')][_0x5dc32a('0x19d')](this,_0x469d4d);else{function _0x535edb(){const _0x599d8a=_0x5dc32a;return this[_0x599d8a('0x169')]();}}}}}return VisuMZ[_0x5dc32a('0x255')][_0x5dc32a('0x1a4')][_0x5dc32a('0x19d')](this,_0x469d4d);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x8e')]=Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x272')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x272')]=function(_0x5d6b5d){const _0x1a7918=_0x493af9;for(settings of VisuMZ['SkillsStatesCore']['Settings']['Costs']){if(settings[_0x1a7918('0x250')][_0x1a7918('0x23b')]()==='TP')return settings[_0x1a7918('0xba')][_0x1a7918('0x19d')](this,_0x5d6b5d);}return VisuMZ['SkillsStatesCore'][_0x1a7918('0x8e')][_0x1a7918('0x19d')](this,_0x5d6b5d);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x2b2')]=function(_0x281899){const _0x4bc448=_0x493af9;if(typeof _0x281899===_0x4bc448('0x82'))_0x281899=$dataStates[_0x281899];return this[_0x4bc448('0x195')]()['includes'](_0x281899);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x284')]=Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x195')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x195')]=function(){const _0x2c040b=_0x493af9;let _0x3dc8d6=VisuMZ[_0x2c040b('0x255')][_0x2c040b('0x284')][_0x2c040b('0x19d')](this);return this[_0x2c040b('0x2af')](_0x3dc8d6),_0x3dc8d6;},Game_BattlerBase['prototype'][_0x493af9('0x2af')]=function(_0x719efb){const _0x2f1a9e=_0x493af9,_0x794e7=this['passiveStates']();for(state of _0x794e7){if(_0x2f1a9e('0x226')===_0x2f1a9e('0x226')){if(!state)continue;if(!this[_0x2f1a9e('0xaa')](state)&&_0x719efb['includes'](state))continue;_0x719efb[_0x2f1a9e('0x233')](state);}else{function _0xdd4874(){const _0x3934fd=_0x2f1a9e;if(typeof _0x100a32!=='number')_0x536039=_0x19e447['id'];const _0x3ad266=this[_0x3934fd('0x228')](_0x549f2b);_0x3ad266[_0x55692b]=_0x5b60e7;}}}if(_0x794e7[_0x2f1a9e('0x267')]>0x0){if(_0x2f1a9e('0x214')!==_0x2f1a9e('0x214')){function _0x51c56c(){const _0x37abee=_0x2f1a9e,_0xbc1c6a=_0x41a2f6['boxWidth']-this[_0x37abee('0x1f2')](),_0x30e415=this[_0x37abee('0x2b7')]()-this[_0x37abee('0x87')][_0x37abee('0x20c')],_0x29db3d=this['isRightInputMode']()?_0x38256b['boxWidth']-_0xbc1c6a:0x0,_0x209665=this[_0x37abee('0x87')]['y']+this[_0x37abee('0x87')][_0x37abee('0x20c')];return new _0x4c8303(_0x29db3d,_0x209665,_0xbc1c6a,_0x30e415);}}else _0x719efb[_0x2f1a9e('0x177')]((_0x3db823,_0x10ba6e)=>{const _0x28e70b=_0x2f1a9e,_0x1b7410=_0x3db823[_0x28e70b('0xa6')],_0x8589e8=_0x10ba6e['priority'];if(_0x1b7410!==_0x8589e8)return _0x8589e8-_0x1b7410;return _0x3db823-_0x10ba6e;});}},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xaa')]=function(_0x49ec56){const _0x51d0a0=_0x493af9;return _0x49ec56[_0x51d0a0('0x29f')][_0x51d0a0('0x1e0')](/<PASSIVE STACKABLE>/i);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x8d')]=function(){const _0x60affb=_0x493af9,_0x19ce95=[];for(const _0x471a57 of this[_0x60affb('0x2e3')]['passiveStates']){if(_0x60affb('0x122')==='EOJeN'){const _0x44c788=$dataStates[_0x471a57];if(!_0x44c788)continue;if(!this[_0x60affb('0x211')](_0x44c788))continue;_0x19ce95[_0x60affb('0x233')](_0x44c788);}else{function _0x3108d5(){const _0x598c0f=_0x60affb;_0x124290[_0x598c0f('0x1d3')](_0x4a8e7f,_0x314e1d),this[_0x598c0f('0x234')](_0x2447ba);}}}return _0x19ce95;},Game_BattlerBase['prototype'][_0x493af9('0x211')]=function(_0x13e436){const _0x2d7810=_0x493af9;if(!this[_0x2d7810('0x246')](_0x13e436))return![];if(!this[_0x2d7810('0xdb')](_0x13e436))return![];if(!this[_0x2d7810('0x175')](_0x13e436))return![];return!![];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x246')]=function(_0x410146){const _0x184178=_0x493af9,_0x3e7cb6=_0x410146[_0x184178('0x29f')];if(_0x3e7cb6[_0x184178('0x1e0')](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x22bfcc=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x34afd0 of _0x22bfcc){if(!$gameSwitches['value'](_0x34afd0))return![];}return!![];}if(_0x3e7cb6[_0x184178('0x1e0')](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5426f8=JSON[_0x184178('0x201')]('['+RegExp['$1'][_0x184178('0x1e0')](/\d+/g)+']');for(const _0x50a71f of _0x5426f8){if(!$gameSwitches[_0x184178('0x278')](_0x50a71f))return![];}return!![];}if(_0x3e7cb6[_0x184178('0x1e0')](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x184178('0x1ff')!==_0x184178('0x159')){const _0x52b0db=JSON[_0x184178('0x201')]('['+RegExp['$1'][_0x184178('0x1e0')](/\d+/g)+']');for(const _0x2391a4 of _0x52b0db){if(_0x184178('0x29e')===_0x184178('0x137')){function _0x464396(){const _0x3895b6=_0x184178;if(this[_0x3895b6('0x20e')]('passiveStates'))return this['convertPassiveStates']();return this[_0x3895b6('0x2e3')][_0x3895b6('0xd9')]=[],this[_0x3895b6('0x15c')](),this['addPassiveStatesByNotetag'](),this[_0x3895b6('0xff')](),this[_0x3895b6('0x8d')]();}}else{if($gameSwitches['value'](_0x2391a4))return!![];}}return![];}else{function _0x3ae8fb(){return!![];}}}if(_0x3e7cb6[_0x184178('0x1e0')](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x573f3a=JSON[_0x184178('0x201')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3ccd67 of _0x573f3a){if('IWHNW'!==_0x184178('0x193')){function _0x50aa81(){const _0x4e84eb=_0x184178,_0x3909fb=this['aliveMembers']();for(const _0x241bca of _0x3909fb){if(!_0x241bca[_0x4e84eb('0x176')]())return![];}return!![];}}else{if(!$gameSwitches[_0x184178('0x278')](_0x3ccd67))return!![];}}return![];}if(_0x3e7cb6[_0x184178('0x1e0')](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x184178('0x218')!==_0x184178('0x218')){function _0x2e2c32(){const _0x52db74=_0x184178,_0xf02a5a=_0x52db74('0x2a8');this[_0x52db74('0x1b4')]=this[_0x52db74('0x1b4')]||{};if(this[_0x52db74('0x1b4')][_0xf02a5a])return this[_0x52db74('0x1b4')][_0xf02a5a];const _0x4cf3fe=_0x438bce[_0x52db74('0x255')][_0x52db74('0x14c')][_0x52db74('0x51')][_0x52db74('0x7d')];return this[_0x52db74('0x69')](_0xf02a5a,_0x4cf3fe);}}else{const _0xce2af2=JSON[_0x184178('0x201')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2eb38c of _0xce2af2){if(_0x184178('0xa8')===_0x184178('0xa8')){if(!$gameSwitches[_0x184178('0x278')](_0x2eb38c))return!![];}else{function _0x2e006a(){return 0x0;}}}return![];}}if(_0x3e7cb6[_0x184178('0x1e0')](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28ea60=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x24ce59 of _0x28ea60){if($gameSwitches['value'](_0x24ce59))return![];}return!![];}return!![];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xdb')]=function(_0x464af5){const _0x4b2a0c=_0x493af9,_0x32df48=VisuMZ['SkillsStatesCore'][_0x4b2a0c('0x187')];if(_0x32df48[_0x464af5['id']]&&!_0x32df48[_0x464af5['id']][_0x4b2a0c('0x19d')](this,_0x464af5))return![];return!![];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x175')]=function(_0x28bf14){const _0xfcead2=_0x493af9;return VisuMZ[_0xfcead2('0x255')][_0xfcead2('0x14c')][_0xfcead2('0xa1')][_0xfcead2('0x23d')]['call'](this,_0x28bf14);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xd9')]=function(){const _0x9aa586=_0x493af9;if(this[_0x9aa586('0x20e')](_0x9aa586('0xd9')))return this[_0x9aa586('0x8d')]();return this[_0x9aa586('0x2e3')][_0x9aa586('0xd9')]=[],this[_0x9aa586('0x15c')](),this[_0x9aa586('0x1dc')](),this[_0x9aa586('0xff')](),this[_0x9aa586('0x8d')]();},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x15c')]=function(){const _0x2a1e49=_0x493af9;if(Imported['VisuMZ_1_ElementStatusCore'])this[_0x2a1e49('0x7')]();},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x11d')]=function(){return[];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1dc')]=function(){const _0x3a5504=_0x493af9,_0x39b619=this[_0x3a5504('0x11d')]();for(const _0x26e51b of _0x39b619){if(!_0x26e51b)continue;const _0x443c2a=_0x26e51b[_0x3a5504('0x29f')][_0x3a5504('0x1e0')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x443c2a)for(const _0xfbe06b of _0x443c2a){_0xfbe06b[_0x3a5504('0x1e0')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x10e84f=RegExp['$1'];if(_0x10e84f[_0x3a5504('0x1e0')](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x3a5504('0x66')!==_0x3a5504('0x232')){const _0x525961=JSON[_0x3a5504('0x201')]('['+RegExp['$1'][_0x3a5504('0x1e0')](/\d+/g)+']');this[_0x3a5504('0x2e3')][_0x3a5504('0xd9')]=this[_0x3a5504('0x2e3')][_0x3a5504('0xd9')][_0x3a5504('0x170')](_0x525961);}else{function _0x2730f8(){const _0x3d13c2=_0x3a5504;this[_0x3d13c2('0x11a')](_0xd1c8ed)&&(_0x363d02+=this[_0x3d13c2('0x270')](_0x10a774),this[_0x3d13c2('0x161')](_0x4cfb0,_0x235b01));}}}else{const _0x170197=_0x10e84f[_0x3a5504('0xfc')](',');for(const _0x57ee24 of _0x170197){if(_0x3a5504('0x1b3')==='owcfP'){function _0x4a6a88(){return!![];}}else{const _0x1a4308=DataManager[_0x3a5504('0x16d')](_0x57ee24);if(_0x1a4308)this['_cache'][_0x3a5504('0xd9')][_0x3a5504('0x233')](_0x1a4308);}}}}}},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xff')]=function(){const _0x32b5a5=_0x493af9,_0x298ee2=VisuMZ[_0x32b5a5('0x255')][_0x32b5a5('0x14c')]['PassiveStates'][_0x32b5a5('0xdc')];this[_0x32b5a5('0x2e3')][_0x32b5a5('0xd9')]=this[_0x32b5a5('0x2e3')]['passiveStates']['concat'](_0x298ee2);},Game_BattlerBase['prototype'][_0x493af9('0x89')]=function(_0x2f485e){const _0x2f39c3=_0x493af9;if(typeof _0x2f485e!==_0x2f39c3('0x82'))_0x2f485e=_0x2f485e['id'];return this[_0x2f39c3('0x139')][_0x2f485e]||0x0;},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x161')]=function(_0x4028bc,_0x9af8ab){const _0x2314f2=_0x493af9;if(typeof _0x4028bc!==_0x2314f2('0x82'))_0x4028bc=_0x4028bc['id'];if(this[_0x2314f2('0x26d')](_0x4028bc)){if('Rkasc'!==_0x2314f2('0x26b')){function _0x1ca09a(){const _0x215440=_0x2314f2,_0xfd18ac=_0x542ec4(_0x499086['$1']),_0x45a508=_0x172da2[_0x215440('0x269')](_0xfd18ac,'heal',0x1,_0x215440('0x12e'));_0x565810[_0x215440('0x255')][_0x215440('0x1c3')][_0x5c4646['id']]=new _0x39ae73('stateId',_0x45a508);}}else{const _0x42f279=DataManager['stateMaximumTurns'](_0x4028bc);this['_stateTurns'][_0x4028bc]=_0x9af8ab[_0x2314f2('0x20b')](0x0,_0x42f279);if(this[_0x2314f2('0x139')][_0x4028bc]<=0x0)this[_0x2314f2('0x158')](_0x4028bc);}}},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x72')]=function(_0x41374e,_0x37c103){const _0x4a7eee=_0x493af9;if(typeof _0x41374e!==_0x4a7eee('0x82'))_0x41374e=_0x41374e['id'];if(this[_0x4a7eee('0x26d')](_0x41374e)){if(_0x4a7eee('0x13b')!==_0x4a7eee('0x29d'))_0x37c103+=this['stateTurns'](_0x41374e),this['setStateTurns'](_0x41374e,_0x37c103);else{function _0x5667a0(){const _0x570018=_0x4a7eee;this[_0x570018('0x30')](_0x4238d6);}}}},VisuMZ[_0x493af9('0x255')]['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x493af9('0x192')]['eraseBuff'],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1ba')]=function(_0x1526c7){const _0x3d6394=_0x493af9,_0x1bd6d1=this[_0x3d6394('0x12d')][_0x1526c7];VisuMZ[_0x3d6394('0x255')][_0x3d6394('0x56')]['call'](this,_0x1526c7);if(_0x1bd6d1>0x0)this[_0x3d6394('0x38')](_0x1526c7);if(_0x1bd6d1<0x0)this[_0x3d6394('0x25b')](_0x1526c7);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_increaseBuff']=Game_BattlerBase['prototype'][_0x493af9('0xad')],Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xad')]=function(_0x1ef97e){const _0x80685b=_0x493af9;VisuMZ[_0x80685b('0x255')][_0x80685b('0x133')][_0x80685b('0x19d')](this,_0x1ef97e);if(!this['isBuffOrDebuffAffected'](_0x1ef97e))this[_0x80685b('0x1ba')](_0x1ef97e);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x11c')]=Game_BattlerBase['prototype']['decreaseBuff'],Game_BattlerBase['prototype'][_0x493af9('0x294')]=function(_0x4ff238){const _0x7f657d=_0x493af9;VisuMZ[_0x7f657d('0x255')][_0x7f657d('0x11c')]['call'](this,_0x4ff238);if(!this[_0x7f657d('0x297')](_0x4ff238))this[_0x7f657d('0x1ba')](_0x4ff238);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x38')]=function(_0x393bf7){},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x25b')]=function(_0x9b51a6){},Game_BattlerBase['prototype'][_0x493af9('0x260')]=function(_0x492fdd){const _0x490047=_0x493af9;return this[_0x490047('0x12d')][_0x492fdd]===VisuMZ[_0x490047('0x255')][_0x490047('0x14c')][_0x490047('0x51')][_0x490047('0xb0')];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1d9')]=function(_0x21193f){const _0x37b5ae=_0x493af9;return this[_0x37b5ae('0x12d')][_0x21193f]===-VisuMZ[_0x37b5ae('0x255')]['Settings'][_0x37b5ae('0x51')][_0x37b5ae('0x7a')];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xf7')],Game_BattlerBase[_0x493af9('0x192')]['buffIconIndex']=function(_0x12a3e6,_0x1493c2){const _0x4bddaf=_0x493af9;return _0x12a3e6=_0x12a3e6[_0x4bddaf('0x20b')](-0x2,0x2),VisuMZ[_0x4bddaf('0x255')]['Game_BattlerBase_buffIconIndex'][_0x4bddaf('0x19d')](this,_0x12a3e6,_0x1493c2);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1b5')]=function(_0x3be763){const _0x845834=_0x493af9,_0x1879d1=this[_0x845834('0x12d')][_0x3be763];return VisuMZ[_0x845834('0x255')][_0x845834('0x14c')][_0x845834('0x51')][_0x845834('0x183')][_0x845834('0x19d')](this,_0x3be763,_0x1879d1);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x270')]=function(_0x1a62a2){const _0x57db7c=_0x493af9;return this[_0x57db7c('0xe9')][_0x1a62a2]||0x0;},Game_BattlerBase[_0x493af9('0x192')]['debuffTurns']=function(_0x12832f){const _0x523c7f=_0x493af9;return this[_0x523c7f('0x270')](_0x12832f);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x58')]=function(_0x5bdf90,_0x4432c0){const _0x496cf1=_0x493af9;if(this[_0x496cf1('0x11a')](_0x5bdf90)){const _0x4a8788=VisuMZ[_0x496cf1('0x255')][_0x496cf1('0x14c')][_0x496cf1('0x51')]['MaxTurns'];this[_0x496cf1('0xe9')][_0x5bdf90]=_0x4432c0['clamp'](0x0,_0x4a8788);}},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1a2')]=function(_0x32b0ed,_0x47ef40){const _0x4c5073=_0x493af9;if(this[_0x4c5073('0x11a')](_0x32b0ed)){if('hBMZp'!==_0x4c5073('0x32')){function _0x1abf6e(){const _0xe3b068=_0x4c5073;_0x23c270[_0xe3b068('0x255')][_0xe3b068('0x18a')][_0xe3b068('0x19d')](this),this[_0xe3b068('0x87')]&&this[_0xe3b068('0x87')][_0xe3b068('0x112')]===_0x4e7e3c&&this[_0xe3b068('0x87')][_0xe3b068('0xe')](this['item']());}}else _0x47ef40+=this[_0x4c5073('0x270')](stateId),this[_0x4c5073('0x161')](_0x32b0ed,_0x47ef40);}},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1d3')]=function(_0x410f8d,_0x1d6c4d){const _0x56dd64=_0x493af9;if(this[_0x56dd64('0x168')](_0x410f8d)){if(_0x56dd64('0x138')!==_0x56dd64('0x138')){function _0x2ef541(){const _0x2bd076=_0x56dd64;_0x20fe3b(_0x2bd076('0x129')[_0x2bd076('0x269')](_0x1470bd,_0x4ec094)),_0x13bdd2[_0x2bd076('0xe5')]();}}else{const _0x15254d=VisuMZ[_0x56dd64('0x255')][_0x56dd64('0x14c')][_0x56dd64('0x51')][_0x56dd64('0x14b')];this[_0x56dd64('0xe9')][_0x410f8d]=_0x1d6c4d['clamp'](0x0,_0x15254d);}}},Game_BattlerBase['prototype'][_0x493af9('0xca')]=function(_0x35220e,_0xb44af6){const _0x2a4778=_0x493af9;if(this['isDebuffAffected'](_0x35220e)){if(_0x2a4778('0x164')===_0x2a4778('0x164'))_0xb44af6+=this[_0x2a4778('0x270')](stateId),this[_0x2a4778('0x161')](_0x35220e,_0xb44af6);else{function _0x7c2530(){const _0x47bbf8=_0x2a4778;if(!this[_0x47bbf8('0x2be')][_0x47bbf8('0x6c')](_0x427f70))return![];}}}},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x228')]=function(_0x379ed8){const _0x536a78=_0x493af9;if(typeof _0x379ed8!==_0x536a78('0x82'))_0x379ed8=_0x379ed8['id'];return this['_stateData']=this[_0x536a78('0xd6')]||{},this[_0x536a78('0xd6')][_0x379ed8]=this[_0x536a78('0xd6')][_0x379ed8]||{},this[_0x536a78('0xd6')][_0x379ed8];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x1e1')]=function(_0x33c2b2,_0x38944a){const _0x44bacc=_0x493af9;if(typeof _0x33c2b2!==_0x44bacc('0x82'))_0x33c2b2=_0x33c2b2['id'];const _0x37b327=this['stateData'](_0x33c2b2);return _0x37b327[_0x38944a];},Game_BattlerBase['prototype'][_0x493af9('0xf6')]=function(_0x23456c,_0x585ab2,_0x4c0b69){const _0xf1f9a0=_0x493af9;if(typeof _0x23456c!==_0xf1f9a0('0x82'))_0x23456c=_0x23456c['id'];const _0x9d9990=this['stateData'](_0x23456c);_0x9d9990[_0x585ab2]=_0x4c0b69;},Game_BattlerBase['prototype'][_0x493af9('0x2d8')]=function(_0x501bb6){const _0x31f1ba=_0x493af9;if(typeof _0x501bb6!==_0x31f1ba('0x82'))_0x501bb6=_0x501bb6['id'];this['_stateData']=this[_0x31f1ba('0xd6')]||{},this[_0x31f1ba('0xd6')][_0x501bb6]={};},Game_BattlerBase[_0x493af9('0x192')]['getStateDisplay']=function(_0xb26578){const _0x550469=_0x493af9;if(typeof _0xb26578!==_0x550469('0x82'))_0xb26578=_0xb26578['id'];return this[_0x550469('0x1f6')]=this[_0x550469('0x1f6')]||{},this[_0x550469('0x1f6')][_0xb26578]===undefined&&(this[_0x550469('0x1f6')][_0xb26578]=''),this[_0x550469('0x1f6')][_0xb26578];},Game_BattlerBase[_0x493af9('0x192')]['setStateDisplay']=function(_0x5bf0f4,_0x235544){const _0x4aa95a=_0x493af9;if(typeof _0x5bf0f4!==_0x4aa95a('0x82'))_0x5bf0f4=_0x5bf0f4['id'];this[_0x4aa95a('0x1f6')]=this[_0x4aa95a('0x1f6')]||{},this['_stateDisplay'][_0x5bf0f4]=_0x235544;},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xcf')]=function(_0xf51134){const _0x32b222=_0x493af9;if(typeof _0xf51134!==_0x32b222('0x82'))_0xf51134=_0xf51134['id'];this[_0x32b222('0x1f6')]=this['_stateDisplay']||{},this[_0x32b222('0x1f6')][_0xf51134]='';},Game_BattlerBase['prototype'][_0x493af9('0xee')]=function(_0x352344){const _0xa14db0=_0x493af9;if(typeof _0x352344!==_0xa14db0('0x82'))_0x352344=_0x352344['id'];this[_0xa14db0('0x172')]=this[_0xa14db0('0x172')]||{},this['_stateOrigin'][_0x352344]=this['_stateOrigin'][_0x352344]||_0xa14db0('0x26f');const _0x42947c=this[_0xa14db0('0x172')][_0x352344];return this['getStateOriginByKey'](_0x42947c);},Game_BattlerBase[_0x493af9('0x192')]['setStateOrigin']=function(_0x26514c,_0x15d5ce){const _0x40f67c=_0x493af9;this[_0x40f67c('0x172')]=this[_0x40f67c('0x172')]||{};const _0x4e7315=_0x15d5ce?this[_0x40f67c('0x26a')](_0x15d5ce):this[_0x40f67c('0x2dd')]();this[_0x40f67c('0x172')][_0x26514c]=_0x4e7315;},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x17b')]=function(_0x44a716){const _0x5505b3=_0x493af9;this[_0x5505b3('0x172')]=this[_0x5505b3('0x172')]||{},delete this[_0x5505b3('0x172')][_0x44a716];},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x2dd')]=function(){const _0xc53c62=_0x493af9,_0x2e6647=this[_0xc53c62('0xde')]();return this[_0xc53c62('0x26a')](_0x2e6647);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0xde')]=function(){const _0x62a07b=_0x493af9;if($gameParty['inBattle']()){if(BattleManager[_0x62a07b('0x1a8')])return BattleManager['_subject'];else{if(BattleManager[_0x62a07b('0x3')])return BattleManager[_0x62a07b('0x3')];}}else{const _0x4bf3a1=SceneManager[_0x62a07b('0x55')];if(![Scene_Map,Scene_Item][_0x62a07b('0x94')](_0x4bf3a1[_0x62a07b('0x112')]))return $gameParty['menuActor']();}return this;},Game_BattlerBase['prototype'][_0x493af9('0x26a')]=function(_0x304616){const _0x255763=_0x493af9;if(!_0x304616)return _0x255763('0x26f');if(_0x304616[_0x255763('0x6d')]())return _0x255763('0x1f8')[_0x255763('0x269')](_0x304616['actorId']());else{const _0x78e6ee=_0x255763('0x1e9')[_0x255763('0x269')](_0x304616[_0x255763('0x1f7')]()),_0x39ca93=_0x255763('0x2d6')[_0x255763('0x269')](_0x304616[_0x255763('0x264')]()),_0x208f6a=_0x255763('0x131')[_0x255763('0x269')]($gameTroop[_0x255763('0x203')]());return _0x255763('0x231')[_0x255763('0x269')](_0x78e6ee,_0x39ca93,_0x208f6a);}return _0x255763('0x26f');},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x9e')]=function(_0x242659){const _0x20c7a8=_0x493af9;if(_0x242659==='user')return this;else{if(_0x242659[_0x20c7a8('0x1e0')](/<actor-(\d+)>/i)){if(_0x20c7a8('0x1e2')!=='ZJJTI')return $gameActors[_0x20c7a8('0x194')](Number(RegExp['$1']));else{function _0x21dc56(){const _0x2bfdf5=_0x20c7a8,_0x416634=_0x59c33c[_0x2bfdf5('0x255')][_0x2bfdf5('0x14c')][_0x2bfdf5('0x93')][_0x2bfdf5('0x7e')](_0x853b5b=>_0x853b5b[_0x2bfdf5('0x250')][_0x2bfdf5('0x23b')]()===_0x19b75f['toUpperCase']());_0x416634[_0x2bfdf5('0x267')]>=0x1?this[_0x2bfdf5('0x2b9')]=_0x416634[0x0]:this[_0x2bfdf5('0x2b9')]=null;}}}else{if(_0x20c7a8('0x123')===_0x20c7a8('0x123')){if($gameParty[_0x20c7a8('0x21c')]()&&_0x242659['match'](/<troop-(\d+)>/i)){const _0xa01971=Number(RegExp['$1']);if(_0xa01971===$gameTroop[_0x20c7a8('0x203')]()){if(_0x242659[_0x20c7a8('0x1e0')](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x242659[_0x20c7a8('0x1e0')](/<enemy-(\d+)>/i)){if(_0x20c7a8('0x216')!=='kvpGo')return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);else{function _0x96aee1(){const _0x20545d=_0x20c7a8;if(_0x505d66[_0x20545d('0x2bb')]())_0x4d6b02[_0x20545d('0x3c')](_0x2c2f5f);}}}}else{function _0x4360ca(){const _0x232690=_0x20c7a8;let _0x2f93af=_0x54912c[_0x232690('0x1e7')][_0x54feb6];if(_0x2f93af[_0x232690('0x1e0')](/\\I\[(\d+)\]/i))return _0x2f93af;if(this[_0x232690('0xa9')]()===_0x232690('0x275'))return _0x2f93af;const _0x4ded40=_0x158e0f[_0x232690('0x255')]['Settings'][_0x232690('0x182')],_0x388460=_0x13c306[_0x232690('0xe1')][_0x232690('0x94')](_0x5efa9f),_0x30ba31=_0x388460?_0x4ded40[_0x232690('0x16e')]:_0x4ded40[_0x232690('0x28d')];return _0x232690('0x7c')[_0x232690('0x269')](_0x30ba31,_0x2f93af);}}}}return this;},VisuMZ[_0x493af9('0x255')][_0x493af9('0x36')]=Game_Battler[_0x493af9('0x192')][_0x493af9('0x206')],Game_Battler[_0x493af9('0x192')][_0x493af9('0x206')]=function(_0x34f9e6){const _0x41b0fe=_0x493af9;VisuMZ[_0x41b0fe('0x255')][_0x41b0fe('0x36')][_0x41b0fe('0x19d')](this,_0x34f9e6);if(this[_0x41b0fe('0x2b2')]($dataStates[_0x34f9e6])){this[_0x41b0fe('0x2cf')](_0x34f9e6);;}},Game_Battler['prototype'][_0x493af9('0x2cf')]=function(_0x397264){const _0x1fc710=_0x493af9;this[_0x1fc710('0xe7')](_0x397264),this[_0x1fc710('0xa2')](_0x397264),this[_0x1fc710('0x111')](_0x397264),this['onAddStateGlobalJS'](_0x397264);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x163')]=function(_0x5d7198){const _0x35180e=_0x493af9;Game_BattlerBase['prototype'][_0x35180e('0x163')][_0x35180e('0x19d')](this,_0x5d7198),this[_0x35180e('0x1c4')](_0x5d7198),this[_0x35180e('0xb7')](_0x5d7198);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x62')]=function(_0x117a1c){const _0x31a564=_0x493af9;for(const _0x27cce4 of this[_0x31a564('0x195')]()){this[_0x31a564('0x12c')](_0x27cce4['id'])&&_0x27cce4[_0x31a564('0x238')]===_0x117a1c&&(this[_0x31a564('0x158')](_0x27cce4['id']),this[_0x31a564('0x14d')](_0x27cce4['id']),this[_0x31a564('0x77')](_0x27cce4['id']));}},Game_Battler[_0x493af9('0x192')][_0x493af9('0x14d')]=function(_0x30fb99){const _0x2aa9c7=_0x493af9;this[_0x2aa9c7('0x118')](_0x30fb99);},Game_Battler['prototype'][_0x493af9('0x111')]=function(_0x142072){const _0x17d08d=_0x493af9,_0x11d27f=VisuMZ[_0x17d08d('0x255')]['stateAddJS'];if(_0x11d27f[_0x142072])_0x11d27f[_0x142072][_0x17d08d('0x19d')](this,_0x142072);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x1c4')]=function(_0x13f4fd){const _0x5a5c0d=_0x493af9,_0x57f761=VisuMZ[_0x5a5c0d('0x255')][_0x5a5c0d('0x1a5')];if(_0x57f761[_0x13f4fd])_0x57f761[_0x13f4fd][_0x5a5c0d('0x19d')](this,_0x13f4fd);},Game_Battler[_0x493af9('0x192')]['onExpireStateCustomJS']=function(_0x141f9e){const _0x40a52a=_0x493af9,_0x57cc49=VisuMZ[_0x40a52a('0x255')]['stateExpireJS'];if(_0x57cc49[_0x141f9e])_0x57cc49[_0x141f9e]['call'](this,_0x141f9e);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x166')]=function(_0x5d3261){const _0x1ed134=_0x493af9;try{VisuMZ[_0x1ed134('0x255')][_0x1ed134('0x14c')][_0x1ed134('0x48')][_0x1ed134('0x13a')][_0x1ed134('0x19d')](this,_0x5d3261);}catch(_0x20adc4){if($gameTemp[_0x1ed134('0x2bb')]())console[_0x1ed134('0x3c')](_0x20adc4);}},Game_Battler[_0x493af9('0x192')][_0x493af9('0xb7')]=function(_0x123721){const _0x5dedb3=_0x493af9;try{VisuMZ[_0x5dedb3('0x255')][_0x5dedb3('0x14c')][_0x5dedb3('0x48')]['onEraseStateJS'][_0x5dedb3('0x19d')](this,_0x123721);}catch(_0x5d8683){if(_0x5dedb3('0x47')==='Hewqg'){if($gameTemp['isPlaytest']())console['log'](_0x5d8683);}else{function _0x19a5a7(){const _0x47cc27=_0x5dedb3;return this[_0x47cc27('0x130')]();}}}},Game_Battler[_0x493af9('0x192')][_0x493af9('0x77')]=function(_0x520a7d){const _0x410a63=_0x493af9;try{VisuMZ['SkillsStatesCore'][_0x410a63('0x14c')][_0x410a63('0x48')][_0x410a63('0x155')][_0x410a63('0x19d')](this,_0x520a7d);}catch(_0x5f58c1){if(_0x410a63('0xd4')===_0x410a63('0xd4')){if($gameTemp['isPlaytest']())console[_0x410a63('0x3c')](_0x5f58c1);}else{function _0x39e1ee(){const _0x45ca68=_0x410a63;return this[_0x45ca68('0x2b9')][_0x45ca68('0x230')][_0x45ca68('0x19d')](this[_0x45ca68('0x1fa')]);}}}},Game_Battler[_0x493af9('0x192')][_0x493af9('0x2d4')]=function(_0x470de4){const _0x430b1f=_0x493af9;return _0x470de4=_0x470de4[_0x430b1f('0x23b')]()[_0x430b1f('0x2d9')](),this[_0x430b1f('0x195')]()[_0x430b1f('0x7e')](_0x504b22=>_0x504b22[_0x430b1f('0x35')]['includes'](_0x470de4));},Game_Battler[_0x493af9('0x192')][_0x493af9('0x19c')]=function(_0x1f9027,_0x2d3862){const _0x34e269=_0x493af9;_0x1f9027=_0x1f9027[_0x34e269('0x23b')]()[_0x34e269('0x2d9')](),_0x2d3862=_0x2d3862||0x0;const _0x58f321=this[_0x34e269('0x2d4')](_0x1f9027);for(state of _0x58f321){if(_0x2d3862<=0x0)return;this[_0x34e269('0x158')](state['id']),this[_0x34e269('0x8')]['success']=!![],_0x2d3862--;}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x28a')]=Game_Battler[_0x493af9('0x192')][_0x493af9('0x44')],Game_Battler['prototype'][_0x493af9('0x44')]=function(_0x401365,_0xf86fba){const _0x3d0887=_0x493af9;VisuMZ[_0x3d0887('0x255')][_0x3d0887('0x28a')]['call'](this,_0x401365,_0xf86fba);if(this[_0x3d0887('0x11a')](_0x401365)){if(_0x3d0887('0x10d')!==_0x3d0887('0x1a6'))this[_0x3d0887('0xa7')](_0x401365,_0xf86fba);else{function _0x3e487e(){const _0x3e68d3=_0x3d0887;this[_0x3e68d3('0x2b9')]=_0x40e6be[0x0];}}}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x1d0')]=Game_Battler[_0x493af9('0x192')][_0x493af9('0x167')],Game_Battler['prototype'][_0x493af9('0x167')]=function(_0x594bc2,_0x1a2af8){const _0x2723b5=_0x493af9;VisuMZ[_0x2723b5('0x255')][_0x2723b5('0x1d0')][_0x2723b5('0x19d')](this,_0x594bc2,_0x1a2af8);if(this[_0x2723b5('0x168')](_0x594bc2)){if('rtoyq'!==_0x2723b5('0x79')){function _0x29ab97(){const _0xf1eecb=_0x2723b5;this[_0xf1eecb('0x1b0')]='';}}else this[_0x2723b5('0x1ef')](_0x594bc2,_0x1a2af8);}},Game_Battler[_0x493af9('0x192')][_0x493af9('0x16a')]=function(){const _0x3d1e15=_0x493af9;for(let _0x5a1db5=0x0;_0x5a1db5<this[_0x3d1e15('0x1f9')]();_0x5a1db5++){if(this[_0x3d1e15('0x4e')](_0x5a1db5)){const _0x50b2ec=this[_0x3d1e15('0x12d')][_0x5a1db5];this[_0x3d1e15('0x141')](_0x5a1db5);if(_0x50b2ec>0x0)this['onExpireBuff'](_0x5a1db5);if(_0x50b2ec<0x0)this[_0x3d1e15('0x219')](_0x5a1db5);}}},Game_Battler['prototype'][_0x493af9('0xa7')]=function(_0x2f23d3,_0x87144b){const _0x5a668f=_0x493af9;this[_0x5a668f('0x106')](_0x2f23d3,_0x87144b);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x1ef')]=function(_0xdff946,_0x59692d){const _0x3d7686=_0x493af9;this[_0x3d7686('0x273')](_0xdff946,_0x59692d);},Game_Battler['prototype']['onEraseBuff']=function(_0x7983e){const _0x59615d=_0x493af9;Game_BattlerBase['prototype'][_0x59615d('0x38')][_0x59615d('0x19d')](this,_0x7983e),this[_0x59615d('0x136')](_0x7983e);},Game_Battler['prototype']['onEraseDebuff']=function(_0x14a70b){const _0x5940fb=_0x493af9;Game_BattlerBase[_0x5940fb('0x192')]['onEraseDebuff'][_0x5940fb('0x19d')](this,_0x14a70b),this[_0x5940fb('0x296')](_0x14a70b);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x1ed')]=function(_0x5eb168){const _0x115676=_0x493af9;this[_0x115676('0x37')](_0x5eb168);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x219')]=function(_0x1e9ba1){const _0x2ca56d=_0x493af9;this[_0x2ca56d('0x21')](_0x1e9ba1);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x106')]=function(_0xb85ceb,_0x34be3a){const _0x433de6=_0x493af9;VisuMZ[_0x433de6('0x255')][_0x433de6('0x14c')][_0x433de6('0x51')][_0x433de6('0x95')][_0x433de6('0x19d')](this,_0xb85ceb,_0x34be3a);},Game_Battler['prototype'][_0x493af9('0x273')]=function(_0x21140e,_0x47d3c1){const _0x7b82fc=_0x493af9;VisuMZ[_0x7b82fc('0x255')][_0x7b82fc('0x14c')][_0x7b82fc('0x51')][_0x7b82fc('0x19e')][_0x7b82fc('0x19d')](this,_0x21140e,_0x47d3c1);},Game_BattlerBase[_0x493af9('0x192')][_0x493af9('0x136')]=function(_0x78cce0){const _0xb64bd9=_0x493af9;VisuMZ[_0xb64bd9('0x255')]['Settings'][_0xb64bd9('0x51')][_0xb64bd9('0x2a1')]['call'](this,_0x78cce0);},Game_BattlerBase[_0x493af9('0x192')]['onEraseDebuffGlobalJS']=function(_0x5ac1e5){const _0x57c4d9=_0x493af9;VisuMZ['SkillsStatesCore'][_0x57c4d9('0x14c')]['Buffs'][_0x57c4d9('0x121')][_0x57c4d9('0x19d')](this,_0x5ac1e5);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x37')]=function(_0x1970da){const _0x4a04db=_0x493af9;VisuMZ[_0x4a04db('0x255')][_0x4a04db('0x14c')][_0x4a04db('0x51')][_0x4a04db('0xb3')][_0x4a04db('0x19d')](this,_0x1970da);},Game_Battler[_0x493af9('0x192')][_0x493af9('0x21')]=function(_0x34c055){const _0x37d9f8=_0x493af9;VisuMZ[_0x37d9f8('0x255')][_0x37d9f8('0x14c')][_0x37d9f8('0x51')]['onExpireDebuffJS'][_0x37d9f8('0x19d')](this,_0x34c055);},Game_Battler['prototype'][_0x493af9('0xa2')]=function(_0x52a911){const _0x26825c=_0x493af9,_0xd37fb=VisuMZ[_0x26825c('0x255')],_0x6f874f=['stateHpSlipDamageJS',_0x26825c('0x2a6'),_0x26825c('0xef'),_0x26825c('0x153'),_0x26825c('0x2a0'),_0x26825c('0x1c3')];for(const _0xe70f74 of _0x6f874f){if(_0xd37fb[_0xe70f74][_0x52a911]){if('UasQX'===_0x26825c('0x196')){function _0x3a6437(){const _0xbc7d1f=_0x26825c;this[_0xbc7d1f('0x1b0')]=_0x1658d5;}}else _0xd37fb[_0xe70f74][_0x52a911][_0x26825c('0x19d')](this,_0x52a911);}}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x17')]=Game_Battler[_0x493af9('0x192')]['regenerateAll'],Game_Battler[_0x493af9('0x192')]['regenerateAll']=function(){const _0x359cd8=_0x493af9;VisuMZ['SkillsStatesCore'][_0x359cd8('0x17')]['call'](this),this[_0x359cd8('0x198')](),this[_0x359cd8('0xc8')]();},Game_Battler[_0x493af9('0x192')][_0x493af9('0x198')]=function(){const _0x43b2ee=_0x493af9;for(const _0x510926 of this[_0x43b2ee('0xd9')]()){if('QDckG'===_0x43b2ee('0x105')){if(!_0x510926)continue;this[_0x43b2ee('0xa2')](_0x510926['id']);}else{function _0x1a91df(){return![];}}}},Game_Battler[_0x493af9('0x192')][_0x493af9('0xc8')]=function(){const _0x5ccf02=_0x493af9;if(!this[_0x5ccf02('0x1b1')]())return;const _0x29eb43=this['states']();for(const _0x1d8354 of _0x29eb43){if(!_0x1d8354)continue;this[_0x5ccf02('0x2c3')](_0x1d8354);}},Game_Battler['prototype'][_0x493af9('0x2c3')]=function(_0x4de179){const _0x224267=_0x493af9,_0x530cd6=this[_0x224267('0x1e1')](_0x4de179['id'],_0x224267('0x1e5'))||0x0,_0x3576b7=-this['maxSlipDamage'](),_0xd3df6a=Math[_0x224267('0x277')](_0x530cd6,_0x3576b7);if(_0xd3df6a!==0x0)this['gainHp'](_0xd3df6a);const _0x202e88=this[_0x224267('0x1e1')](_0x4de179['id'],_0x224267('0x103'))||0x0;if(_0x202e88!==0x0)this[_0x224267('0x2de')](_0x202e88);const _0x12cb04=this[_0x224267('0x1e1')](_0x4de179['id'],_0x224267('0x12e'))||0x0;if(_0x12cb04!==0x0)this[_0x224267('0xb2')](_0x202e88);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x140')]=Game_Actor[_0x493af9('0x192')][_0x493af9('0x1e7')],Game_Actor[_0x493af9('0x192')][_0x493af9('0x1e7')]=function(){const _0x3509f0=_0x493af9,_0x4c1ba7=VisuMZ[_0x3509f0('0x255')][_0x3509f0('0x140')][_0x3509f0('0x19d')](this),_0xdb67f0=VisuMZ['SkillsStatesCore'][_0x3509f0('0x14c')][_0x3509f0('0x182')];let _0x28678b=_0xdb67f0[_0x3509f0('0xb8')];if($gameParty[_0x3509f0('0x21c')]()){if('onsGi'===_0x3509f0('0xc'))_0x28678b=_0x28678b[_0x3509f0('0x170')](_0xdb67f0[_0x3509f0('0x41')]);else{function _0x3cb303(){const _0x420f05=_0x3509f0,_0x58c081=_0x432ff6[_0x420f05('0x201')]('['+_0x356273['$1'][_0x420f05('0x1e0')](/\d+/g)+']');for(const _0x28ccfb of _0x58c081){if(!_0x11b213[_0x420f05('0x278')](_0x28ccfb))return!![];}return![];}}}return _0x4c1ba7[_0x3509f0('0x7e')](_0xbc3b5d=>!_0x28678b[_0x3509f0('0x94')](_0xbc3b5d));},Game_Actor['prototype'][_0x493af9('0x2a')]=function(){const _0x2979cd=_0x493af9;return this[_0x2979cd('0x40')]()[_0x2979cd('0x7e')](_0x27cf30=>this[_0x2979cd('0x20f')](_0x27cf30));},Game_Actor[_0x493af9('0x192')][_0x493af9('0x20f')]=function(_0x187aec){const _0x277767=_0x493af9;if(!this[_0x277767('0x12f')](_0x187aec))return![];const _0x5e2d24=this[_0x277767('0x1e7')](),_0xe46f86=DataManager[_0x277767('0x240')](_0x187aec),_0x1b37bb=_0x5e2d24['filter'](_0x2834de=>_0xe46f86['includes'](_0x2834de));return _0x1b37bb[_0x277767('0x267')]>0x0;},Game_Actor[_0x493af9('0x192')][_0x493af9('0x11d')]=function(){const _0x1cbb37=_0x493af9;let _0x504ee6=[this[_0x1cbb37('0x194')](),this[_0x1cbb37('0x3e')]()];_0x504ee6=_0x504ee6[_0x1cbb37('0x170')](this[_0x1cbb37('0xdd')]()[_0x1cbb37('0x7e')](_0x47d37f=>_0x47d37f));for(const _0x17f3f7 of this[_0x1cbb37('0x2ac')]){const _0x74a891=$dataSkills[_0x17f3f7];if(_0x74a891)_0x504ee6['push'](_0x74a891);}return _0x504ee6;},Game_Actor[_0x493af9('0x192')][_0x493af9('0xff')]=function(){const _0x5eefbf=_0x493af9;Game_Battler[_0x5eefbf('0x192')][_0x5eefbf('0xff')][_0x5eefbf('0x19d')](this);const _0x5d7c40=VisuMZ[_0x5eefbf('0x255')][_0x5eefbf('0x14c')]['PassiveStates'][_0x5eefbf('0x212')];this[_0x5eefbf('0x2e3')][_0x5eefbf('0xd9')]=this[_0x5eefbf('0x2e3')][_0x5eefbf('0xd9')][_0x5eefbf('0x170')](_0x5d7c40);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x21a')]=Game_Actor[_0x493af9('0x192')][_0x493af9('0x2e')],Game_Actor['prototype'][_0x493af9('0x2e')]=function(_0x12b4ad){const _0x5dc1ae=_0x493af9;VisuMZ[_0x5dc1ae('0x255')][_0x5dc1ae('0x21a')][_0x5dc1ae('0x19d')](this,_0x12b4ad),this[_0x5dc1ae('0x2e3')]={};},VisuMZ[_0x493af9('0x255')][_0x493af9('0x174')]=Game_Actor[_0x493af9('0x192')][_0x493af9('0x18e')],Game_Actor[_0x493af9('0x192')][_0x493af9('0x18e')]=function(_0x203e7c){const _0x326669=_0x493af9;VisuMZ['SkillsStatesCore'][_0x326669('0x174')][_0x326669('0x19d')](this,_0x203e7c),this[_0x326669('0x2e3')]={};},Game_Enemy[_0x493af9('0x192')][_0x493af9('0x11d')]=function(){const _0xf6511a=_0x493af9;let _0x2b7af5=[this['enemy']()];return _0x2b7af5[_0xf6511a('0x170')](this[_0xf6511a('0x40')]());},Game_Enemy['prototype']['addPassiveStatesByPluginParameters']=function(){const _0x438278=_0x493af9;Game_Battler[_0x438278('0x192')][_0x438278('0xff')][_0x438278('0x19d')](this);const _0x3c7138=VisuMZ[_0x438278('0x255')][_0x438278('0x14c')]['PassiveStates'][_0x438278('0x237')];this[_0x438278('0x2e3')][_0x438278('0xd9')]=this['_cache'][_0x438278('0xd9')]['concat'](_0x3c7138);},Game_Enemy[_0x493af9('0x192')]['skills']=function(){const _0x4cef3f=_0x493af9,_0x2a19e0=[];for(const _0x46eb6d of this['enemy']()[_0x4cef3f('0xcb')]){if(_0x4cef3f('0x1fc')==='ExRHj'){const _0x43c170=$dataSkills[_0x46eb6d[_0x4cef3f('0xe8')]];if(_0x43c170&&!_0x2a19e0[_0x4cef3f('0x94')](_0x43c170))_0x2a19e0[_0x4cef3f('0x233')](_0x43c170);}else{function _0x180a19(){const _0x4710a9=_0x4cef3f;if(typeof _0xe34f49!==_0x4710a9('0x82'))_0x8cdcbf=_0x5719c4['id'];if(this[_0x4710a9('0x26d')](_0x3da953)){const _0x33f846=_0x47ddfd[_0x4710a9('0x57')](_0x49a0a8);this[_0x4710a9('0x139')][_0x261d90]=_0x5191b3['clamp'](0x0,_0x33f846);if(this[_0x4710a9('0x139')][_0x32aa2f]<=0x0)this[_0x4710a9('0x158')](_0x3894e9);}}}}return _0x2a19e0;},Game_Enemy[_0x493af9('0x192')][_0x493af9('0x6a')]=function(_0x4b606b){return this['hasState']($dataStates[_0x4b606b]);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x2d3')]=Game_Unit['prototype'][_0x493af9('0x1e')],Game_Unit[_0x493af9('0x192')]['isAllDead']=function(){const _0x2d6d92=_0x493af9;if(this[_0x2d6d92('0x217')]())return!![];return VisuMZ['SkillsStatesCore'][_0x2d6d92('0x2d3')][_0x2d6d92('0x19d')](this);},Game_Unit['prototype'][_0x493af9('0x217')]=function(){const _0x52eb70=_0x493af9,_0x432d87=this[_0x52eb70('0x6b')]();for(const _0x5e08b5 of _0x432d87){if(_0x52eb70('0x21b')==='sKgkf'){function _0x18c333(){const _0xa9641f=_0x52eb70;return _0x36a67a[_0xa9641f('0x255')]['Settings']['Skills'][_0xa9641f('0x109')];}}else{if(!_0x5e08b5[_0x52eb70('0x176')]())return![];}}return!![];},VisuMZ[_0x493af9('0x255')]['Game_Troop_setup']=Game_Troop['prototype'][_0x493af9('0x24c')],Game_Troop[_0x493af9('0x192')][_0x493af9('0x24c')]=function(_0xdddc28){const _0x255fe4=_0x493af9;VisuMZ[_0x255fe4('0x255')][_0x255fe4('0x1c0')][_0x255fe4('0x19d')](this,_0xdddc28),this[_0x255fe4('0x154')]();},Game_Troop[_0x493af9('0x192')][_0x493af9('0x154')]=function(){const _0x156d7d=_0x493af9;this['_currentTroopUniqueID']=Graphics[_0x156d7d('0x34')];},Game_Troop[_0x493af9('0x192')][_0x493af9('0x203')]=function(){const _0x2f545c=_0x493af9;return this[_0x2f545c('0xbb')]=this[_0x2f545c('0xbb')]||Graphics[_0x2f545c('0x34')],this[_0x2f545c('0xbb')];},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x11f')]=function(){const _0x504aed=_0x493af9;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x504aed('0x19b')]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x504aed('0x261')]())return this[_0x504aed('0xe2')]()[_0x504aed('0x1e0')](/LOWER/i);else Scene_ItemBase[_0x504aed('0x192')][_0x504aed('0xf3')][_0x504aed('0x19d')](this);}},Scene_Skill['prototype'][_0x493af9('0xf3')]=function(){const _0x57feaa=_0x493af9;if(ConfigManager[_0x57feaa('0x3b')]&&ConfigManager[_0x57feaa('0x127')]!==undefined){if(_0x57feaa('0x22b')!==_0x57feaa('0x22b')){function _0x7144e4(){const _0x24312a=_0x57feaa,_0x4e0786=_0x2989a4['x']+_0x137c74[_0x24312a('0x1b8')]((_0x4523a5[_0x24312a('0x78')]-_0x2f93fc)/0x2);this[_0x24312a('0x207')](_0x1dc119,_0x4e0786,_0x24675f['y'],_0x54981e);}}else return ConfigManager[_0x57feaa('0x127')];}else{if(this[_0x57feaa('0x261')]()){if(_0x57feaa('0x265')!==_0x57feaa('0x265')){function _0x5b2490(){const _0x40a9b9=_0x57feaa;this[_0x40a9b9('0x7f')](_0x18fdd5)[_0x40a9b9('0x1e0')](/\\I\[(\d+)\]/i);const _0x797cf=_0x1347dc(_0x57ee94['$1'])||0x0,_0x15f707=this[_0x40a9b9('0x6f')](_0x17425b),_0x1b90eb=_0x15f707['x']+_0x2c3201[_0x40a9b9('0x1b8')]((_0x15f707[_0x40a9b9('0x78')]-_0x5d0083[_0x40a9b9('0x2c7')])/0x2),_0x43a352=_0x15f707['y']+(_0x15f707[_0x40a9b9('0x20c')]-_0x53d253[_0x40a9b9('0x1cb')])/0x2;this[_0x40a9b9('0x2c')](_0x797cf,_0x1b90eb,_0x43a352);}}else return this[_0x57feaa('0xe2')]()[_0x57feaa('0x1e0')](/RIGHT/i);}else Scene_ItemBase[_0x57feaa('0x192')][_0x57feaa('0xf3')][_0x57feaa('0x19d')](this);}},Scene_Skill['prototype'][_0x493af9('0xe2')]=function(){const _0xa60561=_0x493af9;return VisuMZ[_0xa60561('0x255')][_0xa60561('0x14c')][_0xa60561('0x182')][_0xa60561('0x23')];},Scene_Skill[_0x493af9('0x192')]['isUseModernControls']=function(){const _0x3b6787=_0x493af9;return this['_categoryWindow']&&this[_0x3b6787('0xec')][_0x3b6787('0x143')]();},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x261')]=function(){const _0x34321f=_0x493af9;return VisuMZ[_0x34321f('0x255')][_0x34321f('0x14c')][_0x34321f('0x182')][_0x34321f('0xe3')];},VisuMZ[_0x493af9('0x255')][_0x493af9('0xe4')]=Scene_Skill[_0x493af9('0x192')][_0x493af9('0x12b')],Scene_Skill[_0x493af9('0x192')][_0x493af9('0x12b')]=function(){const _0x302416=_0x493af9;if(this[_0x302416('0x261')]()){if(_0x302416('0x1ac')!=='ovTpk'){function _0x33639b(){const _0x410748=_0x302416;this[_0x410748('0x87')]['setItem'](this[_0x410748('0x1cf')](0x0));}}else return this[_0x302416('0xc9')]();}else return VisuMZ[_0x302416('0x255')][_0x302416('0xe4')][_0x302416('0x19d')](this);},Scene_Skill[_0x493af9('0x192')][_0x493af9('0xc9')]=function(){const _0xd2d138=_0x493af9,_0x5280ee=0x0,_0x2368a5=this['helpAreaTop'](),_0x431997=Graphics[_0xd2d138('0x29b')],_0x281dc2=this['helpAreaHeight']();return new Rectangle(_0x5280ee,_0x2368a5,_0x431997,_0x281dc2);},VisuMZ['SkillsStatesCore'][_0x493af9('0x1c')]=Scene_Skill[_0x493af9('0x192')][_0x493af9('0x287')],Scene_Skill[_0x493af9('0x192')][_0x493af9('0x287')]=function(){const _0x3db9d3=_0x493af9;if(this[_0x3db9d3('0x261')]()){if(_0x3db9d3('0x2dc')!==_0x3db9d3('0x2dc')){function _0x510d40(){const _0xcdf6e6=_0x3db9d3;return this[_0xcdf6e6('0x134')]();}}else return this[_0x3db9d3('0x120')]();}else return VisuMZ[_0x3db9d3('0x255')][_0x3db9d3('0x1c')]['call'](this);},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x120')]=function(){const _0x1bbc32=_0x493af9,_0x2886ed=this[_0x1bbc32('0xea')](),_0x4128ef=this[_0x1bbc32('0x17d')](0x3,!![]),_0x1604c3=this[_0x1bbc32('0xf3')]()?Graphics[_0x1bbc32('0x29b')]-_0x2886ed:0x0,_0x2c6d62=this[_0x1bbc32('0x291')]();return new Rectangle(_0x1604c3,_0x2c6d62,_0x2886ed,_0x4128ef);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x188')]=Scene_Skill[_0x493af9('0x192')][_0x493af9('0x18c')],Scene_Skill[_0x493af9('0x192')][_0x493af9('0x18c')]=function(){const _0x4b5fa1=_0x493af9;return this[_0x4b5fa1('0x261')]()?this['statusWindowRectSkillsStatesCore']():VisuMZ[_0x4b5fa1('0x255')][_0x4b5fa1('0x188')][_0x4b5fa1('0x19d')](this);},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x169')]=function(){const _0x53929f=_0x493af9,_0x7c8a2=Graphics[_0x53929f('0x29b')]-this['mainCommandWidth'](),_0x3edade=this['_skillTypeWindow'][_0x53929f('0x20c')],_0x9eb8c3=this['isRightInputMode']()?0x0:Graphics[_0x53929f('0x29b')]-_0x7c8a2,_0x210de1=this[_0x53929f('0x291')]();return new Rectangle(_0x9eb8c3,_0x210de1,_0x7c8a2,_0x3edade);},VisuMZ[_0x493af9('0x255')]['Scene_Skill_createItemWindow']=Scene_Skill['prototype'][_0x493af9('0x279')],Scene_Skill[_0x493af9('0x192')][_0x493af9('0x279')]=function(){const _0x2d76de=_0x493af9;VisuMZ[_0x2d76de('0x255')][_0x2d76de('0x2aa')][_0x2d76de('0x19d')](this);if(this['allowCreateShopStatusWindow']()){if(_0x2d76de('0x1de')!==_0x2d76de('0x1de')){function _0xa1cb86(){const _0xe6c676=_0x2d76de;this[_0xe6c676('0x2b9')]=null;}}else this[_0x2d76de('0x156')]();}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x14')]=Scene_Skill[_0x493af9('0x192')][_0x493af9('0xbd')],Scene_Skill[_0x493af9('0x192')]['itemWindowRect']=function(){const _0x24f2cb=_0x493af9;if(this[_0x24f2cb('0x261')]()){if('egXgs'!==_0x24f2cb('0x17a')){function _0x4f9959(){const _0x217084=_0x24f2cb;return this[_0x217084('0x261')]()?this['helpWindowRectSkillsStatesCore']():_0x123294[_0x217084('0x255')][_0x217084('0xe4')][_0x217084('0x19d')](this);}}else return this['itemWindowRectSkillsStatesCore']();}else{const _0x540d80=VisuMZ[_0x24f2cb('0x255')][_0x24f2cb('0x14')][_0x24f2cb('0x19d')](this);if(this[_0x24f2cb('0x1fb')]()&&this[_0x24f2cb('0x65')]()){if(_0x24f2cb('0x68')===_0x24f2cb('0x4f')){function _0x1b1c66(){const _0x1e8ea2=_0x24f2cb;if(typeof _0x597e4a!==_0x1e8ea2('0x82'))_0xf6cbf8=_0x269079['id'];const _0x5c8ddb=this[_0x1e8ea2('0x228')](_0x9ca06a);return _0x5c8ddb[_0x1a3d9f];}}else _0x540d80[_0x24f2cb('0x78')]-=this[_0x24f2cb('0x1f2')]();}return _0x540d80;}},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x22')]=function(){const _0x231c08=_0x493af9,_0x455c9d=Graphics[_0x231c08('0x29b')]-this[_0x231c08('0x1f2')](),_0x365e22=this['mainAreaHeight']()-this[_0x231c08('0x87')]['height'],_0x3260f1=this[_0x231c08('0xf3')]()?Graphics[_0x231c08('0x29b')]-_0x455c9d:0x0,_0x2ce742=this[_0x231c08('0x87')]['y']+this['_statusWindow'][_0x231c08('0x20c')];return new Rectangle(_0x3260f1,_0x2ce742,_0x455c9d,_0x365e22);},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x1fb')]=function(){const _0x1f1a6c=_0x493af9;if(!Imported[_0x1f1a6c('0x24b')])return![];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return!![];else{if(_0x1f1a6c('0x221')!==_0x1f1a6c('0x221')){function _0x4f4e75(){const _0x32f8ba=_0x1f1a6c;return _0x2a0586=_0x29bbc5(_0x3f26e7),this[_0x32f8ba('0x1b4')]=this[_0x32f8ba('0x1b4')]||{},_0x56b81c[_0x32f8ba('0x1e0')](/#(.*)/i)?this[_0x32f8ba('0x1b4')][_0x193154]=_0x32f8ba('0x241')[_0x32f8ba('0x269')](_0x2a75ad(_0x1af73d['$1'])):this[_0x32f8ba('0x1b4')][_0x4d8218]=this[_0x32f8ba('0x2bc')](_0x2c6894(_0x57422c)),this['_colorCache'][_0x3fa069];}}else return VisuMZ['SkillsStatesCore'][_0x1f1a6c('0x14c')][_0x1f1a6c('0x182')]['ShowShopStatus'];}}},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x65')]=function(){const _0x254aeb=_0x493af9;return VisuMZ[_0x254aeb('0x255')][_0x254aeb('0x14c')][_0x254aeb('0x182')][_0x254aeb('0x107')];},Scene_Skill[_0x493af9('0x192')]['createShopStatusWindow']=function(){const _0x58c09e=_0x493af9,_0x507c53=this[_0x58c09e('0x1c9')]();this[_0x58c09e('0xd3')]=new Window_ShopStatus(_0x507c53),this[_0x58c09e('0x28f')](this[_0x58c09e('0xd3')]),this[_0x58c09e('0x1be')][_0x58c09e('0x27d')](this[_0x58c09e('0xd3')]);},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x1c9')]=function(){const _0xda9557=_0x493af9;if(this[_0xda9557('0x261')]()){if(_0xda9557('0x4d')===_0xda9557('0x4d'))return this[_0xda9557('0x134')]();else{function _0x342a61(){const _0x300e7f=_0xda9557;return this[_0x300e7f('0xbb')]=this['_currentTroopUniqueID']||_0x19c844[_0x300e7f('0x34')],this[_0x300e7f('0xbb')];}}}else{if(_0xda9557('0x1dd')===_0xda9557('0x54')){function _0x30eca7(){const _0x541f21=_0xda9557,_0x2aaf51=new _0x3d5f9d(0x0,0x0,_0x559998[_0x541f21('0x78')],_0x5c2773[_0x541f21('0x20c')]);this[_0x541f21('0x23e')]=new _0x3a7e19(_0x2aaf51),this[_0x541f21('0x23e')][_0x541f21('0x9b')]=0x0,this[_0x541f21('0x224')](this[_0x541f21('0x23e')]),this[_0x541f21('0x2d1')]();}}else return VisuMZ[_0xda9557('0x255')][_0xda9557('0x14c')][_0xda9557('0x182')]['SkillMenuStatusRect'][_0xda9557('0x19d')](this);}},Scene_Skill[_0x493af9('0x192')][_0x493af9('0x134')]=function(){const _0x1e1b1c=_0x493af9,_0x386140=this['shopStatusWidth'](),_0x33ea29=this[_0x1e1b1c('0x1be')][_0x1e1b1c('0x20c')],_0x1460a9=this['isRightInputMode']()?0x0:Graphics[_0x1e1b1c('0x29b')]-this[_0x1e1b1c('0x1f2')](),_0x39416e=this['_itemWindow']['y'];return new Rectangle(_0x1460a9,_0x39416e,_0x386140,_0x33ea29);},Scene_Skill[_0x493af9('0x192')]['shopStatusWidth']=function(){const _0x494e88=_0x493af9;if(Imported[_0x494e88('0x24b')])return Scene_Shop[_0x494e88('0x192')][_0x494e88('0x23a')]();else{if(_0x494e88('0x259')===_0x494e88('0x259'))return 0x0;else{function _0x2f9b44(){return new _0x57abc3(_0x583ccf(_0x52966f['$1']),-0x1f4,-0x1f4);}}}},Scene_Skill['prototype'][_0x493af9('0x2c6')]=function(){const _0x2e8792=_0x493af9;return this[_0x2e8792('0x63')]&&this[_0x2e8792('0x63')][_0x2e8792('0x1a')]?TextManager[_0x2e8792('0x15b')]:'';},VisuMZ['SkillsStatesCore'][_0x493af9('0xa3')]=Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x124')],Sprite_Gauge['prototype'][_0x493af9('0x124')]=function(){const _0x535643=_0x493af9;VisuMZ[_0x535643('0x255')][_0x535643('0xa3')][_0x535643('0x19d')](this),this['_costSettings']=null;},VisuMZ[_0x493af9('0x255')][_0x493af9('0x157')]=Sprite_Gauge[_0x493af9('0x192')]['setup'],Sprite_Gauge['prototype']['setup']=function(_0x1182c5,_0x5cecef){const _0x160495=_0x493af9;this[_0x160495('0x242')](_0x1182c5,_0x5cecef),_0x5cecef=_0x5cecef[_0x160495('0xd0')](),VisuMZ['SkillsStatesCore'][_0x160495('0x157')][_0x160495('0x19d')](this,_0x1182c5,_0x5cecef);},Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x242')]=function(_0x31a752,_0x5d8b14){const _0x360f96=_0x493af9,_0x50cf54=VisuMZ[_0x360f96('0x255')][_0x360f96('0x14c')]['Costs'][_0x360f96('0x7e')](_0x370c38=>_0x370c38['Name'][_0x360f96('0x23b')]()===_0x5d8b14[_0x360f96('0x23b')]());if(_0x50cf54[_0x360f96('0x267')]>=0x1)this['_costSettings']=_0x50cf54[0x0];else{if(_0x360f96('0x14a')!==_0x360f96('0x1df'))this['_costSettings']=null;else{function _0x8a057a(){const _0x34006f=_0x360f96;if(this[_0x34006f('0x2be')]['isLearnedSkill'](_0x58ebaa))return!![];}}}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x205')]=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge['prototype']['currentValue']=function(){const _0x44bd1f=_0x493af9;if(this[_0x44bd1f('0x1fa')]&&this['_costSettings']){if(_0x44bd1f('0x184')===_0x44bd1f('0x83')){function _0x2c0e24(){const _0x26778c=_0x44bd1f;if(!_0xf7328d[_0x26778c('0x278')](_0x48e2df))return![];}}else return this[_0x44bd1f('0x130')]();}else{if(_0x44bd1f('0x1a7')===_0x44bd1f('0x114')){function _0x34e470(){const _0x599aca=_0x44bd1f;this[_0x599aca('0x168')](_0x159bee)&&(_0xaabb1b+=this[_0x599aca('0x270')](_0x22fb3d),this[_0x599aca('0x161')](_0x3c4b8b,_0x1bd6bb));}}else return VisuMZ[_0x44bd1f('0x255')]['Sprite_Gauge_currentValue'][_0x44bd1f('0x19d')](this);}},Sprite_Gauge['prototype'][_0x493af9('0x130')]=function(){const _0x465963=_0x493af9;return this[_0x465963('0x2b9')][_0x465963('0x230')]['call'](this[_0x465963('0x1fa')]);},VisuMZ['SkillsStatesCore'][_0x493af9('0x15e')]=Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x4b')],Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x4b')]=function(){const _0xd4c870=_0x493af9;if(this[_0xd4c870('0x1fa')]&&this[_0xd4c870('0x2b9')]){if(_0xd4c870('0x22d')===_0xd4c870('0x22d'))return this[_0xd4c870('0xa')]();else{function _0x35783f(){const _0x5458a8=_0xd4c870;if(!_0x2b5812[_0x5458a8('0x176')]())return![];}}}else return VisuMZ[_0xd4c870('0x255')]['Sprite_Gauge_currentMaxValue'][_0xd4c870('0x19d')](this);},Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0xa')]=function(){const _0x440598=_0x493af9;return this[_0x440598('0x2b9')][_0x440598('0x10')]['call'](this[_0x440598('0x1fa')]);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x99')]=Sprite_Gauge['prototype'][_0x493af9('0x2b4')],Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x2b4')]=function(){const _0x4f99ab=_0x493af9,_0x1335de=VisuMZ[_0x4f99ab('0x255')][_0x4f99ab('0x99')][_0x4f99ab('0x19d')](this);return _0x1335de[_0x4f99ab('0x20b')](0x0,0x1);},VisuMZ['SkillsStatesCore'][_0x493af9('0x5b')]=Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x42')],Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x42')]=function(){const _0x4046e1=_0x493af9;if(this[_0x4046e1('0x1fa')]&&this[_0x4046e1('0x2b9')])this[_0x4046e1('0x22e')][_0x4046e1('0x1d6')](),this[_0x4046e1('0x21f')]();else{if(_0x4046e1('0x1c5')===_0x4046e1('0x1eb')){function _0x49428a(){const _0x4e45ad=_0x4046e1;if(!_0x1f31de)return;_0x4607f0[_0x4e45ad('0x192')][_0x4e45ad('0x1e3')][_0x4e45ad('0x19d')](this,_0xfbe107,_0x39b751,_0x174e6d,_0x12635c);}}else VisuMZ[_0x4046e1('0x255')][_0x4046e1('0x5b')][_0x4046e1('0x19d')](this);}},Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x13d')]=function(){const _0x59cadb=_0x493af9;let _0x1b4863=this[_0x59cadb('0x17c')]();return Imported[_0x59cadb('0x282')]&&this[_0x59cadb('0x113')]()&&(_0x1b4863=VisuMZ[_0x59cadb('0x20a')](_0x1b4863)),_0x1b4863;},Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x21f')]=function(){const _0x4e111d=_0x493af9;this[_0x4e111d('0x2b9')]['GaugeDrawJS']['call'](this);},Sprite_Gauge[_0x493af9('0x192')][_0x493af9('0x28b')]=function(_0x4cad7a,_0x51b597,_0x1a0218,_0x1d5161,_0x3e4b68,_0x2c13ae){const _0x1b7601=_0x493af9,_0x10b9e9=this[_0x1b7601('0x2b4')](),_0x25ba9e=Math[_0x1b7601('0x1b8')]((_0x3e4b68-0x2)*_0x10b9e9),_0x3320e9=_0x2c13ae-0x2,_0x515faf=this[_0x1b7601('0x200')]();this[_0x1b7601('0x22e')][_0x1b7601('0x283')](_0x1a0218,_0x1d5161,_0x3e4b68,_0x2c13ae,_0x515faf),this[_0x1b7601('0x22e')]['gradientFillRect'](_0x1a0218+0x1,_0x1d5161+0x1,_0x25ba9e,_0x3320e9,_0x4cad7a,_0x51b597);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x13f')]=Sprite_StateIcon[_0x493af9('0x192')]['loadBitmap'],Sprite_StateIcon[_0x493af9('0x192')]['loadBitmap']=function(){const _0x2d4ea3=_0x493af9;VisuMZ[_0x2d4ea3('0x255')][_0x2d4ea3('0x13f')][_0x2d4ea3('0x19d')](this),this[_0x2d4ea3('0xf')]();},Sprite_StateIcon[_0x493af9('0x192')]['createTurnDisplaySprite']=function(){const _0x3d8606=_0x493af9,_0x2ea76d=Window_Base[_0x3d8606('0x192')][_0x3d8606('0xa5')]();this['_turnDisplaySprite']=new Sprite(),this[_0x3d8606('0x86')][_0x3d8606('0x22e')]=new Bitmap(ImageManager['iconWidth'],_0x2ea76d),this[_0x3d8606('0x86')]['anchor']['x']=this[_0x3d8606('0xbf')]['x'],this[_0x3d8606('0x86')][_0x3d8606('0xbf')]['y']=this[_0x3d8606('0xbf')]['y'],this[_0x3d8606('0x224')](this[_0x3d8606('0x86')]),this['contents']=this[_0x3d8606('0x86')]['bitmap'];},VisuMZ[_0x493af9('0x255')][_0x493af9('0x227')]=Sprite_StateIcon['prototype']['updateFrame'],Sprite_StateIcon[_0x493af9('0x192')][_0x493af9('0x5e')]=function(){const _0x18b577=_0x493af9;VisuMZ[_0x18b577('0x255')][_0x18b577('0x227')][_0x18b577('0x19d')](this),this[_0x18b577('0x29')]();},Sprite_StateIcon['prototype'][_0x493af9('0xb1')]=function(_0x455290,_0x17d14a,_0x4cff81,_0xaf535b,_0x6b6d54){const _0x24df92=_0x493af9;this[_0x24df92('0x15f')][_0x24df92('0xb1')](_0x455290,_0x17d14a,_0x4cff81,_0xaf535b,this[_0x24df92('0x15f')][_0x24df92('0x20c')],_0x6b6d54);},Sprite_StateIcon[_0x493af9('0x192')]['updateTurnDisplaySprite']=function(){const _0xb8f4e9=_0x493af9;this['resetFontSettings'](),this[_0xb8f4e9('0x15f')]['clear']();const _0x34bc17=this['_battler'];if(!_0x34bc17)return;const _0x5672e9=_0x34bc17[_0xb8f4e9('0x195')]()[_0xb8f4e9('0x7e')](_0x3e011c=>_0x3e011c[_0xb8f4e9('0x28e')]>0x0),_0x3b7960=[...Array(0x8)[_0xb8f4e9('0x2c4')]()][_0xb8f4e9('0x7e')](_0x589e02=>_0x34bc17[_0xb8f4e9('0x19a')](_0x589e02)!==0x0),_0x7e60bd=this['_animationIndex'],_0x5a04a6=_0x5672e9[_0x7e60bd];if(_0x5a04a6)Window_Base[_0xb8f4e9('0x192')][_0xb8f4e9('0x5c')]['call'](this,_0x34bc17,_0x5a04a6,0x0,0x0),Window_Base[_0xb8f4e9('0x192')][_0xb8f4e9('0xe0')][_0xb8f4e9('0x19d')](this,_0x34bc17,_0x5a04a6,0x0,0x0);else{const _0x494236=_0x3b7960[_0x7e60bd-_0x5672e9[_0xb8f4e9('0x267')]];if(!_0x494236)return;Window_Base[_0xb8f4e9('0x192')]['drawActorBuffTurns'][_0xb8f4e9('0x19d')](this,_0x34bc17,_0x494236,0x0,0x0),Window_Base[_0xb8f4e9('0x192')]['drawActorBuffRates']['call'](this,_0x34bc17,_0x494236,0x0,0x0);}},Sprite_StateIcon[_0x493af9('0x192')][_0x493af9('0x25e')]=function(){const _0x458eba=_0x493af9;this['contents'][_0x458eba('0xb')]=$gameSystem['mainFontFace'](),this[_0x458eba('0x15f')][_0x458eba('0x26')]=$gameSystem[_0x458eba('0x2e2')](),this[_0x458eba('0x1a0')]();},Sprite_StateIcon[_0x493af9('0x192')][_0x493af9('0x1a0')]=function(){const _0x25e302=_0x493af9;this[_0x25e302('0x2c2')](ColorManager[_0x25e302('0x67')]()),this[_0x25e302('0x150')](ColorManager[_0x25e302('0x289')]());},Sprite_StateIcon[_0x493af9('0x192')][_0x493af9('0x2c2')]=function(_0x2ef0f2){const _0x1b0c17=_0x493af9;this[_0x1b0c17('0x15f')][_0x1b0c17('0x2bc')]=_0x2ef0f2;},Sprite_StateIcon['prototype'][_0x493af9('0x150')]=function(_0x19b951){const _0x375329=_0x493af9;this[_0x375329('0x15f')]['outlineColor']=_0x19b951;},Window_Base[_0x493af9('0x192')][_0x493af9('0x25')]=function(_0x437e7d,_0x2a38be,_0x13a53c,_0x133122,_0x70cb3c){const _0x3a0642=_0x493af9,_0x47d27f=this[_0x3a0642('0x2ca')](_0x437e7d,_0x2a38be),_0x3c4265=this[_0x3a0642('0x173')](_0x47d27f,_0x13a53c,_0x133122,_0x70cb3c),_0x3dc208=_0x13a53c+_0x70cb3c-_0x3c4265[_0x3a0642('0x78')];this[_0x3a0642('0x207')](_0x47d27f,_0x3dc208,_0x133122,_0x70cb3c),this[_0x3a0642('0x25e')]();},Window_Base[_0x493af9('0x192')]['createAllSkillCostText']=function(_0x1ad657,_0x4f52b3){const _0x3e97fa=_0x493af9;let _0x53dbf7='';for(settings of VisuMZ[_0x3e97fa('0x255')][_0x3e97fa('0x14c')][_0x3e97fa('0x93')]){if(!this[_0x3e97fa('0x213')](_0x1ad657,_0x4f52b3,settings))continue;if(_0x53dbf7[_0x3e97fa('0x267')]>0x0)_0x53dbf7+=this['skillCostSeparator']();_0x53dbf7+=this[_0x3e97fa('0x18f')](_0x1ad657,_0x4f52b3,settings);}_0x53dbf7=this[_0x3e97fa('0x1c7')](_0x1ad657,_0x4f52b3,_0x53dbf7);if(_0x4f52b3[_0x3e97fa('0x29f')][_0x3e97fa('0x1e0')](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if('FZMnf'!==_0x3e97fa('0x1c2')){function _0x627816(){const _0x252670=_0x3e97fa;this[_0x252670('0x25e')](),this['contents'][_0x252670('0x1d6')]();const _0x5f143b=this[_0x252670('0x1fa')];if(!_0x5f143b)return;const _0x10e934=_0x5f143b[_0x252670('0x195')]()[_0x252670('0x7e')](_0x4391ff=>_0x4391ff[_0x252670('0x28e')]>0x0),_0x3ec8b8=[..._0x1a0264(0x8)[_0x252670('0x2c4')]()][_0x252670('0x7e')](_0x288fd1=>_0x5f143b[_0x252670('0x19a')](_0x288fd1)!==0x0),_0x58cf8a=this[_0x252670('0x271')],_0x3ee8a2=_0x10e934[_0x58cf8a];if(_0x3ee8a2)_0x47899c['prototype'][_0x252670('0x5c')][_0x252670('0x19d')](this,_0x5f143b,_0x3ee8a2,0x0,0x0),_0x27bbac[_0x252670('0x192')]['drawActorStateData']['call'](this,_0x5f143b,_0x3ee8a2,0x0,0x0);else{const _0x27441e=_0x3ec8b8[_0x58cf8a-_0x10e934[_0x252670('0x267')]];if(!_0x27441e)return;_0x5a26f3[_0x252670('0x192')][_0x252670('0xfa')]['call'](this,_0x5f143b,_0x27441e,0x0,0x0),_0x3876c5['prototype'][_0x252670('0x202')][_0x252670('0x19d')](this,_0x5f143b,_0x27441e,0x0,0x0);}}}else{if(_0x53dbf7[_0x3e97fa('0x267')]>0x0)_0x53dbf7+=this[_0x3e97fa('0x245')]();_0x53dbf7+=String(RegExp['$1']);}}return _0x53dbf7;},Window_Base[_0x493af9('0x192')][_0x493af9('0x1c7')]=function(_0x2f8455,_0x35280c,_0x445243){return _0x445243;},Window_Base[_0x493af9('0x192')][_0x493af9('0x213')]=function(_0x2f8ad3,_0x498e57,_0x3962d5){const _0xf8a040=_0x493af9,_0x3a13b8=_0x3962d5[_0xf8a040('0xba')][_0xf8a040('0x19d')](_0x2f8ad3,_0x498e57);return _0x3962d5['ShowJS'][_0xf8a040('0x19d')](_0x2f8ad3,_0x498e57,_0x3a13b8,_0x3962d5);},Window_Base[_0x493af9('0x192')][_0x493af9('0x18f')]=function(_0x224903,_0x459005,_0x497395){const _0x4c3018=_0x493af9,_0x17e428=_0x497395[_0x4c3018('0xba')][_0x4c3018('0x19d')](_0x224903,_0x459005);return _0x497395[_0x4c3018('0x33')][_0x4c3018('0x19d')](_0x224903,_0x459005,_0x17e428,_0x497395);},Window_Base[_0x493af9('0x192')][_0x493af9('0x245')]=function(){return'\x20';},Window_Base[_0x493af9('0x192')]['drawActorIcons']=function(_0x51d406,_0x4c3936,_0x59e61e,_0x44107e){const _0x40c1bf=_0x493af9;if(!_0x51d406)return;VisuMZ[_0x40c1bf('0x255')][_0x40c1bf('0x2da')][_0x40c1bf('0x19d')](this,_0x51d406,_0x4c3936,_0x59e61e,_0x44107e),this['drawActorIconsAllTurnCounters'](_0x51d406,_0x4c3936,_0x59e61e,_0x44107e);},Window_Base[_0x493af9('0x192')][_0x493af9('0x2cb')]=function(_0x4b4427,_0xd22e09,_0x17193b,_0x3c7548){const _0xa4340c=_0x493af9;_0x3c7548=_0x3c7548||0x90;const _0x416e39=ImageManager['iconWidth'],_0x2eecdd=_0x4b4427[_0xa4340c('0x1d4')]()['slice'](0x0,Math[_0xa4340c('0x1b8')](_0x3c7548/_0x416e39)),_0x3fe3ad=_0x4b4427[_0xa4340c('0x195')]()[_0xa4340c('0x7e')](_0x2f826d=>_0x2f826d['iconIndex']>0x0),_0x40305c=[...Array(0x8)['keys']()][_0xa4340c('0x7e')](_0x46f300=>_0x4b4427['buff'](_0x46f300)!==0x0),_0x59096d=[];let _0x437360=_0xd22e09;for(let _0x28e1a1=0x0;_0x28e1a1<_0x2eecdd[_0xa4340c('0x267')];_0x28e1a1++){this['resetFontSettings']();const _0x2a9639=_0x3fe3ad[_0x28e1a1];if(_0x2a9639)!_0x59096d[_0xa4340c('0x94')](_0x2a9639)&&this[_0xa4340c('0x5c')](_0x4b4427,_0x2a9639,_0x437360,_0x17193b),this['drawActorStateData'](_0x4b4427,_0x2a9639,_0x437360,_0x17193b),_0x59096d[_0xa4340c('0x233')](_0x2a9639);else{const _0x425c4c=_0x40305c[_0x28e1a1-_0x3fe3ad[_0xa4340c('0x267')]];this[_0xa4340c('0xfa')](_0x4b4427,_0x425c4c,_0x437360,_0x17193b),this[_0xa4340c('0x202')](_0x4b4427,_0x425c4c,_0x437360,_0x17193b);}_0x437360+=_0x416e39;}},Window_Base[_0x493af9('0x192')][_0x493af9('0x5c')]=function(_0x18b135,_0x23241b,_0x31d948,_0x1b3894){const _0x48e192=_0x493af9;if(!VisuMZ[_0x48e192('0x255')][_0x48e192('0x14c')]['States'][_0x48e192('0x2db')])return;if(!_0x18b135['isStateAffected'](_0x23241b['id']))return;if(_0x23241b['autoRemovalTiming']===0x0)return;if(_0x23241b[_0x48e192('0x29f')][_0x48e192('0x1e0')](/<HIDE STATE TURNS>/i))return;const _0x4d4961=_0x18b135[_0x48e192('0x89')](_0x23241b['id']),_0x2fb5c2=ImageManager[_0x48e192('0x2c7')],_0x2b8981=ColorManager[_0x48e192('0x247')](_0x23241b);this['changeTextColor'](_0x2b8981),this[_0x48e192('0x150')]('rgba(0,\x200,\x200,\x201)'),this[_0x48e192('0x15f')][_0x48e192('0x276')]=!![],this[_0x48e192('0x15f')][_0x48e192('0x26')]=VisuMZ[_0x48e192('0x255')][_0x48e192('0x14c')][_0x48e192('0x48')]['TurnFontSize'],_0x31d948+=VisuMZ[_0x48e192('0x255')]['Settings'][_0x48e192('0x48')][_0x48e192('0x2bf')],_0x1b3894+=VisuMZ[_0x48e192('0x255')][_0x48e192('0x14c')][_0x48e192('0x48')][_0x48e192('0x4c')],this[_0x48e192('0xb1')](_0x4d4961,_0x31d948,_0x1b3894,_0x2fb5c2,_0x48e192('0x257')),this[_0x48e192('0x15f')]['fontBold']=![],this['resetFontSettings']();},Window_Base[_0x493af9('0x192')][_0x493af9('0xe0')]=function(_0x42ebec,_0x579cc3,_0x4621da,_0x3789a6){const _0x5df497=_0x493af9;if(!VisuMZ[_0x5df497('0x255')]['Settings']['States'][_0x5df497('0x15')])return;const _0x120f39=ImageManager[_0x5df497('0x2c7')],_0x5cfc15=ImageManager[_0x5df497('0x1cb')]/0x2,_0x2f57a6=ColorManager[_0x5df497('0x67')]();this['changeTextColor'](_0x2f57a6),this[_0x5df497('0x150')](_0x5df497('0xc7')),this['contents'][_0x5df497('0x276')]=!![],this[_0x5df497('0x15f')][_0x5df497('0x26')]=VisuMZ[_0x5df497('0x255')][_0x5df497('0x14c')]['States'][_0x5df497('0x73')],_0x4621da+=VisuMZ[_0x5df497('0x255')][_0x5df497('0x14c')][_0x5df497('0x48')][_0x5df497('0x24d')],_0x3789a6+=VisuMZ[_0x5df497('0x255')][_0x5df497('0x14c')][_0x5df497('0x48')]['DataOffsetY'];const _0x3fadbf=String(_0x42ebec['getStateDisplay'](_0x579cc3['id']));this[_0x5df497('0xb1')](_0x3fadbf,_0x4621da,_0x3789a6,_0x120f39,_0x5df497('0x50')),this[_0x5df497('0x15f')][_0x5df497('0x276')]=![],this[_0x5df497('0x25e')]();},Window_Base[_0x493af9('0x192')]['drawActorBuffTurns']=function(_0x3d3f5f,_0x2d9dd2,_0x3c2e01,_0x318863){const _0x4c30a3=_0x493af9;if(!VisuMZ[_0x4c30a3('0x255')][_0x4c30a3('0x14c')][_0x4c30a3('0x51')][_0x4c30a3('0x2db')])return;const _0x166b63=_0x3d3f5f[_0x4c30a3('0x19a')](_0x2d9dd2);if(_0x166b63===0x0)return;const _0x5f163f=_0x3d3f5f['buffTurns'](_0x2d9dd2),_0x36f7a5=ImageManager[_0x4c30a3('0x2c7')],_0x205b34=_0x166b63>0x0?ColorManager[_0x4c30a3('0x292')]():ColorManager[_0x4c30a3('0x90')]();this[_0x4c30a3('0x2c2')](_0x205b34),this[_0x4c30a3('0x150')]('rgba(0,\x200,\x200,\x201)'),this[_0x4c30a3('0x15f')][_0x4c30a3('0x276')]=!![],this['contents'][_0x4c30a3('0x26')]=VisuMZ[_0x4c30a3('0x255')]['Settings'][_0x4c30a3('0x51')][_0x4c30a3('0x3f')],_0x3c2e01+=VisuMZ[_0x4c30a3('0x255')][_0x4c30a3('0x14c')][_0x4c30a3('0x51')][_0x4c30a3('0x2bf')],_0x318863+=VisuMZ[_0x4c30a3('0x255')][_0x4c30a3('0x14c')][_0x4c30a3('0x51')][_0x4c30a3('0x4c')],this[_0x4c30a3('0xb1')](_0x5f163f,_0x3c2e01,_0x318863,_0x36f7a5,'right'),this[_0x4c30a3('0x15f')][_0x4c30a3('0x276')]=![],this[_0x4c30a3('0x25e')]();},Window_Base['prototype'][_0x493af9('0x202')]=function(_0x1f9dd6,_0x202ab0,_0x2161cf,_0x26ce16){const _0x37d2b1=_0x493af9;if(!VisuMZ[_0x37d2b1('0x255')][_0x37d2b1('0x14c')]['Buffs'][_0x37d2b1('0x15')])return;const _0x4d8054=_0x1f9dd6[_0x37d2b1('0x1b5')](_0x202ab0),_0x15019a=_0x1f9dd6[_0x37d2b1('0x19a')](_0x202ab0),_0x3952f8=ImageManager[_0x37d2b1('0x2c7')],_0x4fb20d=ImageManager[_0x37d2b1('0x1cb')]/0x2,_0x4d1df1=_0x15019a>0x0?ColorManager[_0x37d2b1('0x292')]():ColorManager[_0x37d2b1('0x90')]();this[_0x37d2b1('0x2c2')](_0x4d1df1),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x37d2b1('0x15f')]['fontBold']=!![],this[_0x37d2b1('0x15f')]['fontSize']=VisuMZ[_0x37d2b1('0x255')][_0x37d2b1('0x14c')][_0x37d2b1('0x51')][_0x37d2b1('0x73')],_0x2161cf+=VisuMZ[_0x37d2b1('0x255')][_0x37d2b1('0x14c')][_0x37d2b1('0x51')]['DataOffsetX'],_0x26ce16+=VisuMZ['SkillsStatesCore'][_0x37d2b1('0x14c')][_0x37d2b1('0x51')][_0x37d2b1('0x1ec')];const _0x22aaf1=_0x37d2b1('0x1ce')[_0x37d2b1('0x269')](Math[_0x37d2b1('0x110')](_0x4d8054*0x64));this[_0x37d2b1('0xb1')](_0x22aaf1,_0x2161cf,_0x26ce16,_0x3952f8,'center'),this[_0x37d2b1('0x15f')]['fontBold']=![],this[_0x37d2b1('0x25e')]();},VisuMZ[_0x493af9('0x255')][_0x493af9('0x5')]=Window_StatusBase[_0x493af9('0x192')][_0x493af9('0x4a')],Window_StatusBase[_0x493af9('0x192')]['placeGauge']=function(_0x228a3d,_0x56fa4a,_0x31c3db,_0x22d454){const _0x2f13e2=_0x493af9;if(_0x228a3d['isActor']())_0x56fa4a=this['convertGaugeTypeSkillsStatesCore'](_0x228a3d,_0x56fa4a);this[_0x2f13e2('0x18d')](_0x228a3d,_0x56fa4a,_0x31c3db,_0x22d454);},Window_StatusBase[_0x493af9('0x192')][_0x493af9('0x18d')]=function(_0x14f060,_0x5a7025,_0x11400a,_0x46dc98){const _0x895c10=_0x493af9;if([_0x895c10('0x2d2'),_0x895c10('0x2ba')]['includes'](_0x5a7025[_0x895c10('0xd0')]()))return;VisuMZ[_0x895c10('0x255')][_0x895c10('0x5')][_0x895c10('0x19d')](this,_0x14f060,_0x5a7025,_0x11400a,_0x46dc98);},Window_StatusBase[_0x493af9('0x192')][_0x493af9('0x178')]=function(_0x42c51e,_0x23a7d6){const _0x1ca628=_0x493af9,_0x468079=_0x42c51e[_0x1ca628('0x3e')]()[_0x1ca628('0x29f')];if(_0x23a7d6==='hp'&&_0x468079[_0x1ca628('0x1e0')](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x23a7d6==='mp'&&_0x468079['match'](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x1ca628('0x71')===_0x1ca628('0x2b5')){function _0x4c2d63(){const _0x9962a7=_0x1ca628;this[_0x9962a7('0x273')](_0x4642af,_0xcec63e);}}else return String(RegExp['$1']);}else{if(_0x23a7d6==='tp'&&_0x468079['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)){if(_0x1ca628('0x19')!==_0x1ca628('0x2e0'))return String(RegExp['$1']);else{function _0xf946ea(){const _0x2e4836=_0x1ca628,_0x4b7580=_0x5e12ff[_0x2e4836('0x201')]('['+_0x218b79['$1'][_0x2e4836('0x1e0')](/\d+/g)+']');for(const _0x24df24 of _0x4b7580){if(this[_0x2e4836('0x2be')][_0x2e4836('0x31')](_0x24df24))return![];}return!![];}}}else{if('ynMrw'!==_0x1ca628('0x2ab')){function _0x2c0a94(){const _0x54e3af=_0x1ca628;for(_0x1b3d2b of _0x2972fb[_0x54e3af('0x255')][_0x54e3af('0x14c')][_0x54e3af('0x93')]){if(_0x50080e['Name']['toUpperCase']()==='MP')return _0x309edf[_0x54e3af('0xba')][_0x54e3af('0x19d')](this,_0x43a010);}return _0x50a705['SkillsStatesCore'][_0x54e3af('0x1a4')]['call'](this,_0x9e3bf4);}}else return _0x23a7d6;}}}},VisuMZ[_0x493af9('0x255')][_0x493af9('0x2da')]=Window_StatusBase[_0x493af9('0x192')][_0x493af9('0x1e3')],Window_StatusBase['prototype'][_0x493af9('0x1e3')]=function(_0x2f24cf,_0x29cb3a,_0xeafc18,_0x3e826f){const _0x12a79a=_0x493af9;if(!_0x2f24cf)return;Window_Base[_0x12a79a('0x192')][_0x12a79a('0x1e3')]['call'](this,_0x2f24cf,_0x29cb3a,_0xeafc18,_0x3e826f);},VisuMZ[_0x493af9('0x255')][_0x493af9('0x162')]=Window_SkillType['prototype'][_0x493af9('0x145')],Window_SkillType['prototype'][_0x493af9('0x145')]=function(_0x5465a1){const _0xaf8100=_0x493af9;VisuMZ[_0xaf8100('0x255')]['Window_SkillType_initialize'][_0xaf8100('0x19d')](this,_0x5465a1),this['createCommandNameWindow'](_0x5465a1);},Window_SkillType[_0x493af9('0x192')][_0x493af9('0x299')]=function(_0x5204d4){const _0x2b1cc6=_0x493af9,_0x314337=new Rectangle(0x0,0x0,_0x5204d4['width'],_0x5204d4[_0x2b1cc6('0x20c')]);this[_0x2b1cc6('0x23e')]=new Window_Base(_0x314337),this[_0x2b1cc6('0x23e')][_0x2b1cc6('0x9b')]=0x0,this[_0x2b1cc6('0x224')](this[_0x2b1cc6('0x23e')]),this[_0x2b1cc6('0x2d1')]();},Window_SkillType['prototype'][_0x493af9('0x16b')]=function(){const _0x3f5e25=_0x493af9;Window_Command[_0x3f5e25('0x192')]['callUpdateHelp'][_0x3f5e25('0x19d')](this);if(this[_0x3f5e25('0x23e')])this['updateCommandNameWindow']();},Window_SkillType['prototype'][_0x493af9('0x2d1')]=function(){const _0x29423e=_0x493af9,_0x19ab09=this['_commandNameWindow'];_0x19ab09['contents'][_0x29423e('0x1d6')]();const _0x3d246d=this[_0x29423e('0x1f3')](this[_0x29423e('0x264')]());if(_0x3d246d===_0x29423e('0x1db')&&this['maxItems']()>0x0){const _0x38e01b=this[_0x29423e('0x6f')](this[_0x29423e('0x264')]());let _0xce9507=this[_0x29423e('0x7f')](this[_0x29423e('0x264')]());_0xce9507=_0xce9507[_0x29423e('0x101')](/\\I\[(\d+)\]/gi,''),_0x19ab09[_0x29423e('0x25e')](),this['commandNameWindowDrawBackground'](_0xce9507,_0x38e01b),this[_0x29423e('0x22f')](_0xce9507,_0x38e01b),this['commandNameWindowCenter'](_0xce9507,_0x38e01b);}},Window_SkillType['prototype'][_0x493af9('0x2c9')]=function(_0x5ed2a6,_0x5779da){},Window_SkillType['prototype'][_0x493af9('0x22f')]=function(_0x504a87,_0x4579ac){const _0x226806=_0x493af9,_0x404271=this[_0x226806('0x23e')];_0x404271[_0x226806('0xb1')](_0x504a87,0x0,_0x4579ac['y'],_0x404271[_0x226806('0xd1')],'center');},Window_SkillType[_0x493af9('0x192')][_0x493af9('0x249')]=function(_0x15ac23,_0x1e20db){const _0x49ebed=_0x493af9,_0xe2a75d=this['_commandNameWindow'],_0x1371f8=$gameSystem[_0x49ebed('0x268')](),_0x26e2af=_0x1e20db['x']+Math[_0x49ebed('0x1b8')](_0x1e20db[_0x49ebed('0x78')]/0x2)+_0x1371f8;_0xe2a75d['x']=_0xe2a75d[_0x49ebed('0x78')]/-0x2+_0x26e2af,_0xe2a75d['y']=Math[_0x49ebed('0x1b8')](_0x1e20db[_0x49ebed('0x20c')]/0x2);},Window_SkillType[_0x493af9('0x192')]['isUseModernControls']=function(){const _0x5c88fa=_0x493af9;return Imported[_0x5c88fa('0x282')]&&Window_Command[_0x5c88fa('0x192')][_0x5c88fa('0x143')][_0x5c88fa('0x19d')](this);},Window_SkillType[_0x493af9('0x192')]['makeCommandList']=function(){const _0x3c9cda=_0x493af9;if(!this[_0x3c9cda('0x2be')])return;const _0x5ef75c=this[_0x3c9cda('0x2be')][_0x3c9cda('0x1e7')]();for(const _0x477503 of _0x5ef75c){if(_0x3c9cda('0x1f1')!==_0x3c9cda('0x1f1')){function _0x1a0797(){const _0x1c32e3=_0x3c9cda;return _0x525cf9['SkillsStatesCore'][_0x1c32e3('0x14c')][_0x1c32e3('0x48')][_0x1c32e3('0x1cc')];}}else{const _0x32708e=this[_0x3c9cda('0xb6')](_0x477503);this['addCommand'](_0x32708e,_0x3c9cda('0x2d'),!![],_0x477503);}}},Window_SkillType[_0x493af9('0x192')][_0x493af9('0xb6')]=function(_0x4735c8){const _0x55ecf2=_0x493af9;let _0x44749b=$dataSystem[_0x55ecf2('0x1e7')][_0x4735c8];if(_0x44749b[_0x55ecf2('0x1e0')](/\\I\[(\d+)\]/i))return _0x44749b;if(this['commandStyle']()===_0x55ecf2('0x275'))return _0x44749b;const _0x4665c5=VisuMZ[_0x55ecf2('0x255')][_0x55ecf2('0x14c')][_0x55ecf2('0x182')],_0x53151c=$dataSystem['magicSkills'][_0x55ecf2('0x94')](_0x4735c8),_0x23a92b=_0x53151c?_0x4665c5['IconStypeMagic']:_0x4665c5[_0x55ecf2('0x28d')];return'\x5cI[%1]%2'[_0x55ecf2('0x269')](_0x23a92b,_0x44749b);},Window_SkillType[_0x493af9('0x192')][_0x493af9('0x236')]=function(){const _0x211f11=_0x493af9;return VisuMZ[_0x211f11('0x255')][_0x211f11('0x14c')][_0x211f11('0x182')][_0x211f11('0x109')];},Window_SkillType['prototype'][_0x493af9('0x14e')]=function(_0x507c00){const _0x310226=_0x493af9,_0x5074cb=this[_0x310226('0x1f3')](_0x507c00);if(_0x5074cb===_0x310226('0x1ab')){if(_0x310226('0x179')!==_0x310226('0xa0'))this[_0x310226('0xbe')](_0x507c00);else{function _0x1ccecd(){const _0x154905=_0x310226,_0x47b981=_0x42feef[_0x154905('0x201')]('['+_0x32e38c['$1'][_0x154905('0x1e0')](/\d+/g)+']');for(const _0x802f6d of _0x47b981){if(!this['_actor'][_0x154905('0x6c')](_0x802f6d))return![];}return!![];}}}else _0x5074cb===_0x310226('0x1db')?this[_0x310226('0x30')](_0x507c00):Window_Command[_0x310226('0x192')][_0x310226('0x14e')][_0x310226('0x19d')](this,_0x507c00);},Window_SkillType[_0x493af9('0x192')][_0x493af9('0xa9')]=function(){const _0xc88a3a=_0x493af9;return VisuMZ[_0xc88a3a('0x255')][_0xc88a3a('0x14c')]['Skills'][_0xc88a3a('0x27e')];},Window_SkillType[_0x493af9('0x192')][_0x493af9('0x1f3')]=function(_0x52f300){const _0x2bfd6a=_0x493af9;if(_0x52f300<0x0)return _0x2bfd6a('0x275');const _0x36e158=this['commandStyle']();if(_0x36e158!==_0x2bfd6a('0x27b'))return _0x36e158;else{if(this[_0x2bfd6a('0x9a')]()>0x0){const _0x1444fe=this['commandName'](_0x52f300);if(_0x1444fe[_0x2bfd6a('0x1e0')](/\\I\[(\d+)\]/i)){const _0x4000dd=this['itemLineRect'](_0x52f300),_0x37de10=this[_0x2bfd6a('0x173')](_0x1444fe)[_0x2bfd6a('0x78')];return _0x37de10<=_0x4000dd['width']?_0x2bfd6a('0x1ab'):_0x2bfd6a('0x1db');}}}return _0x2bfd6a('0x275');},Window_SkillType[_0x493af9('0x192')][_0x493af9('0xbe')]=function(_0x35b780){const _0x3ccc5e=_0x493af9,_0x41d723=this[_0x3ccc5e('0x6f')](_0x35b780),_0x310642=this['commandName'](_0x35b780),_0x50eaf3=this[_0x3ccc5e('0x173')](_0x310642)[_0x3ccc5e('0x78')];this[_0x3ccc5e('0x1da')](this[_0x3ccc5e('0x185')](_0x35b780));const _0x314143=this[_0x3ccc5e('0x236')]();if(_0x314143===_0x3ccc5e('0x257')){if(_0x3ccc5e('0x1f5')===_0x3ccc5e('0x189')){function _0x2894e6(){const _0x2bf977=_0x3ccc5e;if(!_0x3e4101[_0x2bf977('0x278')](_0x269088))return![];}}else this[_0x3ccc5e('0x207')](_0x310642,_0x41d723['x']+_0x41d723[_0x3ccc5e('0x78')]-_0x50eaf3,_0x41d723['y'],_0x50eaf3);}else{if(_0x314143===_0x3ccc5e('0x50')){if(_0x3ccc5e('0x215')===_0x3ccc5e('0x2a2')){function _0x4e7e0a(){return _0x169d64(_0x2eca6b['$1']);}}else{const _0x502669=_0x41d723['x']+Math[_0x3ccc5e('0x1b8')]((_0x41d723[_0x3ccc5e('0x78')]-_0x50eaf3)/0x2);this['drawTextEx'](_0x310642,_0x502669,_0x41d723['y'],_0x50eaf3);}}else this[_0x3ccc5e('0x207')](_0x310642,_0x41d723['x'],_0x41d723['y'],_0x50eaf3);}},Window_SkillType[_0x493af9('0x192')][_0x493af9('0x30')]=function(_0x91187d){const _0x540987=_0x493af9;this[_0x540987('0x7f')](_0x91187d)[_0x540987('0x1e0')](/\\I\[(\d+)\]/i);const _0x48a80b=Number(RegExp['$1'])||0x0,_0x1c5347=this['itemLineRect'](_0x91187d),_0x2f9747=_0x1c5347['x']+Math['floor']((_0x1c5347[_0x540987('0x78')]-ImageManager[_0x540987('0x2c7')])/0x2),_0x40028c=_0x1c5347['y']+(_0x1c5347[_0x540987('0x20c')]-ImageManager['iconHeight'])/0x2;this[_0x540987('0x2c')](_0x48a80b,_0x2f9747,_0x40028c);},VisuMZ[_0x493af9('0x255')]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x493af9('0x192')][_0x493af9('0x2df')],Window_SkillStatus[_0x493af9('0x192')][_0x493af9('0x2df')]=function(){const _0x4b14c7=_0x493af9;VisuMZ[_0x4b14c7('0x255')][_0x4b14c7('0x2ad')][_0x4b14c7('0x19d')](this);if(this[_0x4b14c7('0x2be')])this[_0x4b14c7('0x1ad')]();},Window_SkillStatus[_0x493af9('0x192')][_0x493af9('0x1ad')]=function(){const _0x255be8=_0x493af9;if(!Imported[_0x255be8('0x282')])return;if(!Imported[_0x255be8('0x1b')])return;const _0x4880aa=this[_0x255be8('0x222')]();let _0x5134aa=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x3c8377=this[_0x255be8('0xd1')]-_0x5134aa-0x2;if(_0x3c8377>=0x12c){if('Caigl'!==_0x255be8('0x18b')){const _0x3eda2b=VisuMZ['CoreEngine'][_0x255be8('0x14c')][_0x255be8('0x29c')][_0x255be8('0x1ca')],_0x24b493=Math[_0x255be8('0x1b8')](_0x3c8377/0x2)-0x18;let _0x3620ba=_0x5134aa,_0x39f3a5=Math[_0x255be8('0x1b8')]((this['innerHeight']-Math['ceil'](_0x3eda2b['length']/0x2)*_0x4880aa)/0x2),_0x141f2b=0x0;for(const _0x439433 of _0x3eda2b){if(_0x255be8('0x149')===_0x255be8('0x2f')){function _0x4aa699(){_0x1ca00c['addBuffTurns'](_0x5a5037,_0xd25868),this['makeSuccess'](_0x24c4c4);}}else{this[_0x255be8('0x5a')](_0x3620ba,_0x39f3a5,_0x24b493,_0x439433),_0x141f2b++;if(_0x141f2b%0x2===0x0){if(_0x255be8('0x1f0')===_0x255be8('0x11b')){function _0x353727(){const _0x267866=_0x255be8,_0x329ee4=_0x3715e5['stateMaximumTurns'](_0x4ce99d);this[_0x267866('0x139')][_0x4e8e28]=_0x45dde6[_0x267866('0x20b')](0x0,_0x329ee4);if(this[_0x267866('0x139')][_0x33f581]<=0x0)this[_0x267866('0x158')](_0x171bc1);}}else _0x3620ba=_0x5134aa,_0x39f3a5+=_0x4880aa;}else _0x3620ba+=_0x24b493+0x18;}}}else{function _0xb224a4(){const _0x233e71=_0x255be8;this[_0x233e71('0xa7')](_0x1a9966,_0x317ba4);}}}this[_0x255be8('0x25e')]();},Window_SkillStatus[_0x493af9('0x192')][_0x493af9('0x5a')]=function(_0x37d2ae,_0x3c4f7b,_0x2327ac,_0x28ec8e){const _0x32d224=_0x493af9,_0x5be5e3=this[_0x32d224('0x222')]();this[_0x32d224('0x25e')](),this['drawParamText'](_0x37d2ae,_0x3c4f7b,_0x2327ac,_0x28ec8e,!![]),this[_0x32d224('0x1a0')](),this[_0x32d224('0x15f')][_0x32d224('0x26')]-=0x8;const _0x55810f=this['_actor'][_0x32d224('0x17f')](_0x28ec8e,!![]);this[_0x32d224('0x15f')][_0x32d224('0xb1')](_0x55810f,_0x37d2ae,_0x3c4f7b,_0x2327ac,_0x5be5e3,'right');},VisuMZ[_0x493af9('0x255')][_0x493af9('0x2c5')]=Window_SkillList[_0x493af9('0x192')][_0x493af9('0x94')],Window_SkillList[_0x493af9('0x192')][_0x493af9('0x94')]=function(_0x2de8f6){return this['includesSkillsStatesCore'](_0x2de8f6);},VisuMZ[_0x493af9('0x255')]['Window_SkillList_maxCols']=Window_SkillList[_0x493af9('0x192')][_0x493af9('0xc2')],Window_SkillList[_0x493af9('0x192')][_0x493af9('0xc2')]=function(){const _0x31bde0=_0x493af9;if(SceneManager[_0x31bde0('0x55')][_0x31bde0('0x112')]===Scene_Battle){if(_0x31bde0('0xcc')==='fCiyI'){function _0x1a1c4a(){const _0x59afd8=_0x31bde0;return _0x381e71['SkillsStatesCore'][_0x59afd8('0x14c')][_0x59afd8('0x48')][_0x59afd8('0x5d')];}}else return VisuMZ[_0x31bde0('0x255')][_0x31bde0('0x46')]['call'](this);}else return VisuMZ[_0x31bde0('0x255')][_0x31bde0('0x14c')]['Skills'][_0x31bde0('0x2d0')];},VisuMZ['SkillsStatesCore'][_0x493af9('0x115')]=Window_SkillList[_0x493af9('0x192')][_0x493af9('0x1bc')],Window_SkillList[_0x493af9('0x192')][_0x493af9('0x1bc')]=function(_0x25ab83){const _0x5db5a9=_0x493af9,_0x3a3c8a=this['_actor']!==_0x25ab83;VisuMZ[_0x5db5a9('0x255')][_0x5db5a9('0x115')][_0x5db5a9('0x19d')](this,_0x25ab83),_0x3a3c8a&&(this[_0x5db5a9('0x87')]&&this[_0x5db5a9('0x87')][_0x5db5a9('0x112')]===Window_ShopStatus&&this[_0x5db5a9('0x87')][_0x5db5a9('0xe')](this[_0x5db5a9('0x1cf')](0x0)));},Window_SkillList['prototype'][_0x493af9('0x80')]=function(_0x5b6d80){const _0x1d7691=_0x493af9;if(this[_0x1d7691('0x1aa')]===_0x5b6d80)return;this[_0x1d7691('0x1aa')]=_0x5b6d80,this['refresh'](),this[_0x1d7691('0x229')](0x0,0x0);if(this[_0x1d7691('0x87')]&&this['_statusWindow'][_0x1d7691('0x112')]===Window_ShopStatus){if('Csije'!==_0x1d7691('0x25f')){function _0x29a5e4(){const _0xa2c9a0=_0x1d7691,_0x5417ba=this[_0xa2c9a0('0x2ca')](_0x2be181,_0x5b2387),_0x44135f=this[_0xa2c9a0('0x173')](_0x5417ba,_0x510173,_0x1c68d4,_0x13e22c),_0x6f2a7a=_0x412ce0+_0x46ee0e-_0x44135f['width'];this[_0xa2c9a0('0x207')](_0x5417ba,_0x6f2a7a,_0x5b3416,_0x1fa219),this['resetFontSettings']();}}else this[_0x1d7691('0x87')][_0x1d7691('0xe')](this[_0x1d7691('0x1cf')](0x0));}},Window_SkillList[_0x493af9('0x192')]['includesSkillsStatesCore']=function(_0x1be8c1){const _0x95adca=_0x493af9;if(!_0x1be8c1)return VisuMZ['SkillsStatesCore'][_0x95adca('0x2c5')][_0x95adca('0x19d')](this,_0x1be8c1);if(!this['checkSkillTypeMatch'](_0x1be8c1))return![];if(!this['checkShowHideNotetags'](_0x1be8c1))return![];if(!this[_0x95adca('0x7b')](_0x1be8c1))return![];return!![];},Window_SkillList[_0x493af9('0x192')][_0x493af9('0x2b6')]=function(_0x3522f7){return DataManager['getSkillTypes'](_0x3522f7)['includes'](this['_stypeId']);},Window_SkillList[_0x493af9('0x192')][_0x493af9('0xfe')]=function(_0x2700b9){const _0x2f735a=_0x493af9;if(!this[_0x2f735a('0x100')](_0x2700b9))return![];if(!this[_0x2f735a('0x28')](_0x2700b9))return![];if(!this[_0x2f735a('0x295')](_0x2700b9))return![];return!![];},Window_SkillList[_0x493af9('0x192')][_0x493af9('0x100')]=function(_0x49f452){const _0x294d6f=_0x493af9,_0x623ead=_0x49f452['note'];if(_0x623ead[_0x294d6f('0x1e0')](/<HIDE IN BATTLE>/i)&&$gameParty[_0x294d6f('0x21c')]())return![];else{if(_0x623ead['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x294d6f('0x21c')]()){if(_0x294d6f('0x2cd')===_0x294d6f('0x280')){function _0x3c3e62(){const _0x8f909d=_0x294d6f,_0xd45f70=_0x5a8606[_0x8f909d('0xba')][_0x8f909d('0x19d')](_0x50f179,_0x3a0d61);return _0x492d41[_0x8f909d('0x33')][_0x8f909d('0x19d')](_0xf3208d,_0x2eb237,_0xd45f70,_0x5a641d);}}else return![];}else return!![];}},Window_SkillList[_0x493af9('0x192')][_0x493af9('0x28')]=function(_0x29363a){const _0x2961dd=_0x493af9,_0x47f3f9=_0x29363a['note'];if(_0x47f3f9[_0x2961dd('0x1e0')](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('EftMO'==='EftMO'){const _0x37f92c=JSON[_0x2961dd('0x201')]('['+RegExp['$1'][_0x2961dd('0x1e0')](/\d+/g)+']');for(const _0x44e1cb of _0x37f92c){if(_0x2961dd('0x24e')===_0x2961dd('0x148')){function _0x527292(){const _0x45129f=_0x2961dd;_0x887a0a[_0x45129f('0x255')][_0x45129f('0x17')][_0x45129f('0x19d')](this),this[_0x45129f('0x198')](),this[_0x45129f('0xc8')]();}}else{if(!$gameSwitches['value'](_0x44e1cb))return![];}}return!![];}else{function _0x354bd0(){const _0x494413=_0x2961dd;if(!_0x2a8adb[_0x494413('0x255')][_0x494413('0x14c')][_0x494413('0x51')][_0x494413('0x2db')])return;const _0x43aeec=_0x91e554[_0x494413('0x19a')](_0x42dd36);if(_0x43aeec===0x0)return;const _0x4f3554=_0x5e4495['buffTurns'](_0x33a893),_0x3d9aad=_0x36acc5[_0x494413('0x2c7')],_0x155970=_0x43aeec>0x0?_0x241d1d['buffColor']():_0x52197c[_0x494413('0x90')]();this[_0x494413('0x2c2')](_0x155970),this[_0x494413('0x150')](_0x494413('0xc7')),this['contents'][_0x494413('0x276')]=!![],this[_0x494413('0x15f')][_0x494413('0x26')]=_0x181f02[_0x494413('0x255')][_0x494413('0x14c')][_0x494413('0x51')][_0x494413('0x3f')],_0x271978+=_0x51e1f1[_0x494413('0x255')][_0x494413('0x14c')][_0x494413('0x51')][_0x494413('0x2bf')],_0x36b3a1+=_0x43281b[_0x494413('0x255')][_0x494413('0x14c')][_0x494413('0x51')][_0x494413('0x4c')],this[_0x494413('0xb1')](_0x4f3554,_0x21bef0,_0x15500e,_0x3d9aad,'right'),this[_0x494413('0x15f')][_0x494413('0x276')]=![],this[_0x494413('0x25e')]();}}}if(_0x47f3f9[_0x2961dd('0x1e0')](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2961dd('0x92')!==_0x2961dd('0x92')){function _0x2dff26(){const _0x14ab68=_0x2961dd;_0x15ddc6[_0x14ab68('0x192')][_0x14ab68('0x5c')][_0x14ab68('0x19d')](this,_0x3de007,_0x361f37,0x0,0x0),_0x4f40dc[_0x14ab68('0x192')][_0x14ab68('0xe0')][_0x14ab68('0x19d')](this,_0x42c0ec,_0x525cad,0x0,0x0);}}else{const _0x58c342=JSON['parse']('['+RegExp['$1'][_0x2961dd('0x1e0')](/\d+/g)+']');for(const _0x416972 of _0x58c342){if(_0x2961dd('0xaf')!==_0x2961dd('0xaf')){function _0x1eecaa(){const _0x1ff1ea=_0x2961dd;return _0x5ce65e[_0x1ff1ea('0x255')]['Settings'][_0x1ff1ea('0x182')]['ListWindowCols'];}}else{if(!$gameSwitches[_0x2961dd('0x278')](_0x416972))return![];}}return!![];}}if(_0x47f3f9[_0x2961dd('0x1e0')](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3717ae=JSON[_0x2961dd('0x201')]('['+RegExp['$1'][_0x2961dd('0x1e0')](/\d+/g)+']');for(const _0x183680 of _0x3717ae){if(_0x2961dd('0x91')===_0x2961dd('0x2d5')){function _0x2460ad(){const _0x5ddf7f=_0x2961dd,_0x4e9f45=_0x1ccdd5['SkillsStatesCore'][_0x5ddf7f('0x14c')]['Buffs'][_0x5ddf7f('0x14b')];this[_0x5ddf7f('0xe9')][_0x238919]=_0x4fc422[_0x5ddf7f('0x20b')](0x0,_0x4e9f45);}}else{if($gameSwitches[_0x2961dd('0x278')](_0x183680))return!![];}}return![];}if(_0x47f3f9[_0x2961dd('0x1e0')](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2961dd('0x256')===_0x2961dd('0xbc')){function _0x57df4c(){const _0x5ceffa=_0x2961dd;this[_0x5ceffa('0x172')]=this['_stateOrigin']||{};const _0x29d5cc=_0x495d2b?this[_0x5ceffa('0x26a')](_0x56a9b7):this[_0x5ceffa('0x2dd')]();this['_stateOrigin'][_0x198e0a]=_0x29d5cc;}}else{const _0x227c8d=JSON[_0x2961dd('0x201')]('['+RegExp['$1'][_0x2961dd('0x1e0')](/\d+/g)+']');for(const _0x1eebf7 of _0x227c8d){if(!$gameSwitches['value'](_0x1eebf7))return!![];}return![];}}if(_0x47f3f9[_0x2961dd('0x1e0')](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2961dd('0x262')===_0x2961dd('0x262')){const _0x1b6298=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3eaa51 of _0x1b6298){if(!$gameSwitches[_0x2961dd('0x278')](_0x3eaa51))return!![];}return![];}else{function _0x19195e(){const _0x21a84f=_0x2961dd,_0x59e465=_0x32d6a4[_0x21a84f('0x255')][_0x21a84f('0x140')][_0x21a84f('0x19d')](this),_0x2c1c7c=_0x39f5cb['SkillsStatesCore'][_0x21a84f('0x14c')][_0x21a84f('0x182')];let _0x29e834=_0x2c1c7c[_0x21a84f('0xb8')];return _0x5ab07a['inBattle']()&&(_0x29e834=_0x29e834[_0x21a84f('0x170')](_0x2c1c7c['BattleHiddenSkillTypes'])),_0x59e465['filter'](_0x1141d3=>!_0x29e834[_0x21a84f('0x94')](_0x1141d3));}}}if(_0x47f3f9[_0x2961dd('0x1e0')](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x51b599=JSON[_0x2961dd('0x201')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x6b1175 of _0x51b599){if($gameSwitches['value'](_0x6b1175))return![];}return!![];}return!![];},Window_SkillList[_0x493af9('0x192')][_0x493af9('0x295')]=function(_0x45d5d5){const _0xb825a0=_0x493af9,_0x17641d=_0x45d5d5[_0xb825a0('0x29f')];if(_0x17641d['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x227630=JSON[_0xb825a0('0x201')]('['+RegExp['$1'][_0xb825a0('0x1e0')](/\d+/g)+']');for(const _0x3717c2 of _0x227630){if(!this[_0xb825a0('0x2be')][_0xb825a0('0x31')](_0x3717c2))return![];}return!![];}else{if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xb825a0('0xd2')!==_0xb825a0('0xd2')){function _0x3279bf(){const _0x1410bd=_0xb825a0,_0x41095a=_0x14cede(_0x4c7721['$1']),_0x55913a=_0x482efb['format'](_0x41095a,_0x1410bd('0x186'),-0x1,_0x1410bd('0x12e'));_0x369589[_0x1410bd('0x255')][_0x1410bd('0x2a0')][_0x183c65['id']]=new _0xa7b5be('stateId',_0x55913a);}}else{const _0x49d180=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0x3ac176 of _0x49d180){if(_0xb825a0('0x9c')===_0xb825a0('0x9c')){const _0x150c12=DataManager['getSkillIdWithName'](_0x150c12);if(!_0x150c12)continue;if(!this[_0xb825a0('0x2be')][_0xb825a0('0x31')](_0x150c12))return![];}else{function _0x3655ac(){const _0xe428e6=_0xb825a0;if(_0x142fd6[_0xe428e6('0x1a8')])return _0x7ea737[_0xe428e6('0x1a8')];else{if(_0x3987f9[_0xe428e6('0x3')])return _0x1615c2[_0xe428e6('0x3')];}}}}return!![];}}}if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3849c1=JSON[_0xb825a0('0x201')]('['+RegExp['$1'][_0xb825a0('0x1e0')](/\d+/g)+']');for(const _0x1e5e39 of _0x3849c1){if(_0xb825a0('0x11e')!==_0xb825a0('0x11e')){function _0x55a5bb(){const _0x54c705=_0xb825a0;_0xff7227[_0x54c705('0x192')][_0x54c705('0x25b')][_0x54c705('0x19d')](this,_0x608f3),this[_0x54c705('0x296')](_0x5e48f3);}}else{if(!this[_0xb825a0('0x2be')][_0xb825a0('0x31')](_0x1e5e39))return![];}}return!![];}else{if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x7592e5=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0xeb4927 of _0x7592e5){const _0x48a2df=DataManager[_0xb825a0('0x85')](_0x48a2df);if(!_0x48a2df)continue;if(!this[_0xb825a0('0x2be')][_0xb825a0('0x31')](_0x48a2df))return![];}return!![];}}if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb825a0('0x27a')!=='GGBix'){function _0x2734ce(){const _0x1430ea=_0xb825a0;_0x3bb7c7[_0x1430ea('0x1e0')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x4e4087=_0x253b7c['$1'];if(_0x4e4087[_0x1430ea('0x1e0')](/(\d+(?:\s*,\s*\d+)*)/i)){const _0xbac17f=_0x32c5ce[_0x1430ea('0x201')]('['+_0x4519ed['$1'][_0x1430ea('0x1e0')](/\d+/g)+']');this[_0x1430ea('0x2e3')]['passiveStates']=this[_0x1430ea('0x2e3')][_0x1430ea('0xd9')][_0x1430ea('0x170')](_0xbac17f);}else{const _0x357fb8=_0x4e4087[_0x1430ea('0xfc')](',');for(const _0x56d3a6 of _0x357fb8){const _0xf7fa2c=_0x54776b['getStateIdWithName'](_0x56d3a6);if(_0xf7fa2c)this[_0x1430ea('0x2e3')]['passiveStates'][_0x1430ea('0x233')](_0xf7fa2c);}}}}else{const _0x436744=JSON[_0xb825a0('0x201')]('['+RegExp['$1'][_0xb825a0('0x1e0')](/\d+/g)+']');for(const _0x465111 of _0x436744){if(this['_actor']['isLearnedSkill'](_0x465111))return!![];}return![];}}else{if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x572b40=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0xd40ce9 of _0x572b40){if(_0xb825a0('0x197')===_0xb825a0('0x1e4')){function _0x104138(){const _0x2389df=_0xb825a0,_0x5073b3=_0xabc299[_0x1baefd-_0x353099['length']];this[_0x2389df('0xfa')](_0x3249e4,_0x5073b3,_0x5b5ec5,_0x4c6897),this[_0x2389df('0x202')](_0x237e87,_0x5073b3,_0x342a86,_0x296d1f);}}else{const _0x1cb9d1=DataManager[_0xb825a0('0x85')](_0x1cb9d1);if(!_0x1cb9d1)continue;if(this[_0xb825a0('0x2be')][_0xb825a0('0x31')](_0x1cb9d1))return!![];}}return![];}}if(_0x17641d['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5af0b7=JSON[_0xb825a0('0x201')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x314a75 of _0x5af0b7){if(!this[_0xb825a0('0x2be')]['isLearnedSkill'](_0x314a75))return!![];}return![];}else{if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x33ea2b=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0x20bebd of _0x33ea2b){const _0xe83ca=DataManager[_0xb825a0('0x85')](_0xe83ca);if(!_0xe83ca)continue;if(!this[_0xb825a0('0x2be')][_0xb825a0('0x31')](_0xe83ca))return!![];}return![];}}if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb825a0('0x2')===_0xb825a0('0x8c')){function _0x309e84(){if(!_0x1e2d95['value'](_0x2acc8b))return!![];}}else{const _0x25e4cb=JSON['parse']('['+RegExp['$1'][_0xb825a0('0x1e0')](/\d+/g)+']');for(const _0x5d3360 of _0x25e4cb){if(!this[_0xb825a0('0x2be')][_0xb825a0('0x31')](_0x5d3360))return!![];}return![];}}else{if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xb825a0('0x152')!==_0xb825a0('0xae')){const _0x257101=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0x5f2444 of _0x257101){const _0x2a9593=DataManager[_0xb825a0('0x85')](_0x2a9593);if(!_0x2a9593)continue;if(!this[_0xb825a0('0x2be')]['isLearnedSkill'](_0x2a9593))return!![];}return![];}else{function _0x323bee(){const _0x2d05c2=_0xb825a0;return _0x2d05c2('0x1db');}}}}if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb825a0('0xc4')===_0xb825a0('0x4')){function _0x1a910b(){const _0x373c36=_0xb825a0;if(_0x357eed<=0x0)return;this[_0x373c36('0x158')](_0x5a337b['id']),this[_0x373c36('0x8')][_0x373c36('0xc1')]=!![],_0x5f0765--;}}else{const _0x187376=JSON[_0xb825a0('0x201')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x52c52d of _0x187376){if(_0xb825a0('0x288')===_0xb825a0('0x204')){function _0x4feff3(){const _0x20233a=_0xb825a0;for(const _0xd7ff9f of _0x4fbcf4){let _0x1c6ef5=0x0,_0x2577a8=0x0;if(_0xd7ff9f[_0x20233a('0x1e0')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x1c6ef5=_0x5739bd(_0x50b015['$1']),_0x2577a8=_0x25e69e(_0x39dd47['$2']);else _0xd7ff9f[_0x20233a('0x1e0')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x1c6ef5=_0x55cca9[_0x20233a('0x16d')](_0x15e2c8['$1']),_0x2577a8=_0x3aed44(_0x47b190['$2']));_0x51d375['addStateTurns'](_0x1c6ef5,_0x2577a8),this[_0x20233a('0x234')](_0x230a0d);}}}else{if(this[_0xb825a0('0x2be')][_0xb825a0('0x31')](_0x52c52d))return![];}}return!![];}}else{if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xb825a0('0x15a')===_0xb825a0('0x22a')){function _0x5d1faa(){const _0x37b503=_0xb825a0;_0x35c363[_0x1d2412][_0x54c467]&&_0x348cbb[_0x31d87e][_0x3dc451][_0x37b503('0x19d')](this,_0x2161c0);}}else{const _0x217047=RegExp['$1']['split'](',');for(const _0x389544 of _0x217047){if('DpQnX'===_0xb825a0('0x6e')){const _0x55a8d6=DataManager[_0xb825a0('0x85')](_0x55a8d6);if(!_0x55a8d6)continue;if(this['_actor']['isLearnedSkill'](_0x55a8d6))return![];}else{function _0x25022b(){const _0x1b6bc7=_0xb825a0;_0x1df375[_0x1b6bc7('0x255')][_0x1b6bc7('0x21a')][_0x1b6bc7('0x19d')](this,_0x4e9b88),this[_0x1b6bc7('0x2e3')]={};}}}return!![];}}}if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x469c0e=JSON[_0xb825a0('0x201')]('['+RegExp['$1'][_0xb825a0('0x1e0')](/\d+/g)+']');for(const _0x56794d of _0x469c0e){if(_0xb825a0('0xa4')!==_0xb825a0('0xa4')){function _0x4b1f59(){const _0x368419=_0xb825a0;if(!this[_0x368419('0x2be')]['hasSkill'](_0x2184ac))return!![];}}else{if(!this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x56794d))return![];}}return!![];}else{if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x374abc=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0x39ed11 of _0x374abc){if(_0xb825a0('0x1bd')!==_0xb825a0('0x1bd')){function _0x5a7046(){const _0x384e30=_0xb825a0;this['isStateExpired'](_0x585e74['id'])&&_0x18fe34[_0x384e30('0x238')]===_0x49432a&&(this[_0x384e30('0x158')](_0x255a2c['id']),this[_0x384e30('0x14d')](_0x25297a['id']),this[_0x384e30('0x77')](_0x127f8e['id']));}}else{const _0x3f6cec=DataManager[_0xb825a0('0x85')](_0x3f6cec);if(!_0x3f6cec)continue;if(!this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x3f6cec))return![];}}return!![];}}if(_0x17641d['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x570d30=JSON[_0xb825a0('0x201')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x59f305 of _0x570d30){if(!this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x59f305))return![];}return!![];}else{if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5ae7cf=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0x408e63 of _0x5ae7cf){const _0x18953f=DataManager[_0xb825a0('0x85')](_0x18953f);if(!_0x18953f)continue;if(!this['_actor'][_0xb825a0('0x6c')](_0x18953f))return![];}return!![];}}if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b4fe2=JSON[_0xb825a0('0x201')]('['+RegExp['$1'][_0xb825a0('0x1e0')](/\d+/g)+']');for(const _0x1fbdcc of _0x1b4fe2){if(this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x1fbdcc))return!![];}return![];}else{if(_0x17641d[_0xb825a0('0x1e0')](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x45a5bf=RegExp['$1']['split'](',');for(const _0x350e63 of _0x45a5bf){const _0x6256e0=DataManager[_0xb825a0('0x85')](_0x6256e0);if(!_0x6256e0)continue;if(this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x6256e0))return!![];}return![];}}if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb825a0('0x52')!=='BYgDY'){const _0x3de219=JSON['parse']('['+RegExp['$1'][_0xb825a0('0x1e0')](/\d+/g)+']');for(const _0xa2532f of _0x3de219){if(_0xb825a0('0x1d5')===_0xb825a0('0x285')){function _0x55da26(){const _0x222d06=_0xb825a0;this[_0x222d06('0x87')]=_0x33d00a,this[_0x222d06('0x16b')]();}}else{if(!this[_0xb825a0('0x2be')]['hasSkill'](_0xa2532f))return!![];}}return![];}else{function _0x4ac048(){const _0xa6b30c=_0xb825a0;_0x4880f7[_0xa6b30c('0x58')](_0x22def5,_0x3d2e09),this[_0xa6b30c('0x234')](_0x3415cd);}}}else{if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2518fc=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0xd89358 of _0x2518fc){const _0xa9176a=DataManager[_0xb825a0('0x85')](_0xa9176a);if(!_0xa9176a)continue;if(!this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0xa9176a))return!![];}return![];}}if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb825a0('0x97')===_0xb825a0('0x19f')){function _0x3aacd1(){const _0x121adb=_0xb825a0;for(_0x3da24a of _0x21be0c[_0x121adb('0x255')][_0x121adb('0x14c')]['Costs']){if(_0xa85111[_0x121adb('0x250')]['toUpperCase']()==='TP')return _0x2bc99e[_0x121adb('0xba')][_0x121adb('0x19d')](this,_0x14c525);}return _0x59733e[_0x121adb('0x255')][_0x121adb('0x8e')][_0x121adb('0x19d')](this,_0x9e9adb);}}else{const _0x47b7c1=JSON[_0xb825a0('0x201')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x9150fb of _0x47b7c1){if('gNxuq'===_0xb825a0('0x25a')){function _0xca5724(){const _0x3e1d4f=_0xb825a0;return _0x43a015['SkillsStatesCore'][_0x3e1d4f('0x14c')][_0x3e1d4f('0x182')][_0x3e1d4f('0x27e')];}}else{if(!this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x9150fb))return!![];}}return![];}}else{if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xb825a0('0x24a')!==_0xb825a0('0x24a')){function _0x3e2956(){const _0x3ddc14=_0xb825a0,_0x2ef17d=_0x53433d[_0x3ddc14('0x201')]('['+_0x40a6ad['$1'][_0x3ddc14('0x1e0')](/\d+/g)+']');for(const _0x303a6b of _0x2ef17d){if(!this[_0x3ddc14('0x2be')][_0x3ddc14('0x6c')](_0x303a6b))return!![];}return![];}}else{const _0x1ea989=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0x2cc66c of _0x1ea989){const _0x6ab3f8=DataManager[_0xb825a0('0x85')](_0x6ab3f8);if(!_0x6ab3f8)continue;if(!this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x6ab3f8))return!![];}return![];}}}if(_0x17641d['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('JqeaP'===_0xb825a0('0xf0')){const _0x1f6af7=JSON['parse']('['+RegExp['$1'][_0xb825a0('0x1e0')](/\d+/g)+']');for(const _0x4ecc36 of _0x1f6af7){if(_0xb825a0('0xac')!==_0xb825a0('0x1f4')){if(this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x4ecc36))return![];}else{function _0x57349b(){const _0xa6bd59=_0xb825a0;_0x5b9e33[_0xa6bd59('0x192')][_0xa6bd59('0xff')][_0xa6bd59('0x19d')](this);const _0x43d8b5=_0x44a9d5[_0xa6bd59('0x255')][_0xa6bd59('0x14c')][_0xa6bd59('0xa1')][_0xa6bd59('0x212')];this[_0xa6bd59('0x2e3')][_0xa6bd59('0xd9')]=this[_0xa6bd59('0x2e3')][_0xa6bd59('0xd9')][_0xa6bd59('0x170')](_0x43d8b5);}}}return!![];}else{function _0x4c4ead(){const _0x1b678f=_0xb825a0;_0x49ed21[_0x1b678f('0x192')]['drawSkillCost'][_0x1b678f('0x19d')](this,this[_0x1b678f('0x2be')],_0x39a5c2,_0x6bab1a,_0x5bb227,_0xbfe029);}}}else{if(_0x17641d[_0xb825a0('0x1e0')](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x18d7de=RegExp['$1'][_0xb825a0('0xfc')](',');for(const _0x365a89 of _0x18d7de){const _0x3cbf6b=DataManager[_0xb825a0('0x85')](_0x3cbf6b);if(!_0x3cbf6b)continue;if(this[_0xb825a0('0x2be')][_0xb825a0('0x6c')](_0x3cbf6b))return![];}return!![];}}return!![];},Window_SkillList[_0x493af9('0x192')][_0x493af9('0x7b')]=function(_0x504bc5){const _0xe10caa=_0x493af9,_0x39823f=_0x504bc5[_0xe10caa('0x29f')],_0x1eb1cf=VisuMZ[_0xe10caa('0x255')][_0xe10caa('0x223')];if(_0x1eb1cf[_0x504bc5['id']]){if(_0xe10caa('0x59')!==_0xe10caa('0x126'))return _0x1eb1cf[_0x504bc5['id']][_0xe10caa('0x19d')](this,_0x504bc5);else{function _0x37f7e4(){const _0x12c290=_0xe10caa;if(!_0x13c820[_0x12c290('0x278')](_0x5abdd3))return![];}}}else return!![];},Window_SkillList[_0x493af9('0x192')]['drawSkillCost']=function(_0x115453,_0x9cf9d4,_0x2595d4,_0x2e0012){const _0x31f097=_0x493af9;Window_Base[_0x31f097('0x192')][_0x31f097('0x25')]['call'](this,this['_actor'],_0x115453,_0x9cf9d4,_0x2595d4,_0x2e0012);},Window_SkillList[_0x493af9('0x192')][_0x493af9('0x27d')]=function(_0x286251){const _0x40730d=_0x493af9;this['_statusWindow']=_0x286251,this[_0x40730d('0x16b')]();},VisuMZ[_0x493af9('0x255')][_0x493af9('0x18a')]=Window_SkillList[_0x493af9('0x192')][_0x493af9('0x2a4')],Window_SkillList[_0x493af9('0x192')]['updateHelp']=function(){const _0x31f219=_0x493af9;VisuMZ[_0x31f219('0x255')][_0x31f219('0x18a')][_0x31f219('0x19d')](this);if(this[_0x31f219('0x87')]&&this[_0x31f219('0x87')][_0x31f219('0x112')]===Window_ShopStatus){if(_0x31f219('0x2ae')!==_0x31f219('0x1f'))this[_0x31f219('0x87')][_0x31f219('0xe')](this['item']());else{function _0x27b61a(){const _0x211b8f=_0x31f219;return _0x399561=_0x7b33c4[_0x211b8f('0x20b')](-0x2,0x2),_0x172efe[_0x211b8f('0x255')][_0x211b8f('0x125')][_0x211b8f('0x19d')](this,_0x49bd04,_0x3accc1);}}}};
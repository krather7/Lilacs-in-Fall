//=============================================================================
// VisuStella MZ - Skill Cooldowns
// VisuMZ_3_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SkillCooldowns = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillCooldowns = VisuMZ.SkillCooldowns || {};
VisuMZ.SkillCooldowns.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [SkillCooldowns]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Cooldowns_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Cooldowns are a mechanic added by the game to prevent repeated skill
 * usage (or as some gamers call it, skill spamming). Upon usage in battle, a
 * skill with a cooldown will become unselectable for a duration of time set by
 * either notetags and/or Plugin Commands. This duration would have to pass in
 * order for the skill to become usable once again.
 *
 * Skill Warmups are another addition by this plugin. Skills with warmups will
 * start the battle unusable until a certain duration has passed. This can help
 * prevent strong skills from being used from the very start of battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add cooldowns and warmups to skills.
 * * Control the way they're displayed in game through the Plugin Parameters.
 * * Create trait object effects that alter the finalized values of cooldowns
 *   and warmups applied to skills.
 * * Create action effects that alter the existing durations of cooldowns and
 *   warmups applied to skills.
 * * Create cooldowns for skills that are linked to other skills, skill types,
 *   and/or affect all skills globally.
 * * Plugin Commands that let you alter cooldowns and warmups as you like.
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
 * - VisuMZ_1_SkillsStatesCore
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
 * New Mechanics: Cooldowns and Warmups
 * ============================================================================
 *
 * This section will explain the key points behind cooldowns and warmups.
 *
 * ---
 *
 * Cooldowns:
 *
 * - At the start and end of battle, any and all cooldowns are cleared.
 * - Cooldowns are applied upon usage only during battle.
 * - Upon usage, skills can affect the cooldowns of an entire skill type or all
 *   of a unit's skills at once.
 *
 * ---
 *
 * Warmups:
 *
 * - Upon the start of battle, Warmups will be applied to affected skills.
 * - Upon the end of battle, any and all warmups are cleared.
 * - If the unit in battle has an advantageous start (ie. preemptive strike),
 *   then the warmup duration can be reduced. This value can be changed in the
 *   plugin parameters.
 *
 * ---
 * 
 * Both Cooldowns and Warmups:
 *
 * - While a skill is on CD/WU, it cannot be used.
 * - CD/WU are updated once per turn for each unit.
 * - CD/WU cannot be applied to Attack and Guard skills.
 * - CD/WU cannot be applied to skills with the <Bypass CD/WU> notetag.
 * - CD/WU can be affected by notetag traits found in various database objects.
 * - CD/WU can be altered by skills and items with notetag effects.
 * - CD/WU have a maximum duration that can be set in the Plugin Parameters.
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
 * === Skill-Only Notetags ===
 *
 * The following notetags are used for skills and are related to setting the
 * primary uses of Cooldowns and Warmups.
 *
 * ---
 *
 * <Bypass Cooldowns>
 * <Bypass Warmups>
 *
 * - Used for: Skill Notetags
 * - Lets the skill bypass cooldowns and/or warmups.
 *
 * ---
 *
 * <Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Skill id Cooldown: x>
 * <Skill name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause listed skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown: x>
 * <Stype name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills with the skill type to gain a cooldown
 *   upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Warmup: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a warmup upon the start of battle.
 * - Replace 'x' with the number of turns to set the warmup to.
 *
 * ---
 *
 * === JavaScript Notetags: Skill-Only ===
 *
 * The following are notetags made for users with JavaScript knowledge to give
 * skills dynamic cooldown or warmup durations.
 *
 * ---
 *
 * <JS Cooldown>
 *  code
 *  code
 *  turns = code
 * </JS Cooldown>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base cooldown
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 *
 * ---
 * 
 * <JS On Cooldown Update>
 *  code
 *  code
 *  code
 * </JS On Cooldown Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 * 
 * ---
 * 
 * <JS On Cooldown Ready>
 *  code
 *  code
 *  code
 * </JS On Cooldown Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * <JS Warmup>
 *  code
 *  code
 *  turns = code
 * </JS Warmup>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base warmup
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 *
 * ---
 * 
 * <JS On Warmup Update>
 *  code
 *  code
 *  code
 * </JS On Warmup Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 * 
 * ---
 * 
 * <JS On Warmup Ready>
 *  code
 *  code
 *  code
 * </JS On Warmup Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * === Cooldown/Warmup Notetag Traits ===
 *
 * These Notetag Traits help modify the finalized value of a cooldown/warmup.
 * The final cooldown/warmup duration is calculated by the following formula:
 * 
 * (base + plus) * rate + flat
 *
 * The base value is the amount calculated through the <Cooldown: x> and
 * <Warmup: x> notetags found in the section above.
 *
 * ---
 *
 * <Skill id Cooldown Plus: +x>
 * <Skill id Cooldown Plus: -x>
 *
 * <Skill name Cooldown Plus: +x>
 * <Skill name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Rate: x%>
 * <Skill id Cooldown Rate: x.x>
 *
 * <Skill name Cooldown Rate: x%>
 * <Skill name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Flat: +x>
 * <Skill id Cooldown Flat: -x>
 *
 * <Skill name Cooldown Flat: +x>
 * <Skill name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown Plus: +x>
 * <Stype id Cooldown Plus: -x>
 *
 * <Stype name Cooldown Plus: +x>
 * <Stype name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Rate: x%>
 * <Stype id Cooldown Rate: x.x>
 *
 * <Stype name Cooldown Rate: x%>
 * <Stype name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Flat: +x>
 * <Stype id Cooldown Flat: -x>
 *
 * <Stype name Cooldown Flat: +x>
 * <Stype name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown Plus: +x>
 * <Global Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Rate: x%>
 * <Global Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Flat: +x>
 * <Global Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Skill id Warmup Plus: +x>
 * <Skill id Warmup Plus: -x>
 *
 * <Skill name Warmup Plus: +x>
 * <Skill name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Rate: x%>
 * <Skill id Warmup Rate: x.x>
 *
 * <Skill name Warmup Rate: x%>
 * <Skill name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Flat: +x>
 * <Skill id Warmup Flat: -x>
 *
 * <Skill name Warmup Flat: +x>
 * <Skill name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Warmup Plus: +x>
 * <Stype id Warmup Plus: -x>
 *
 * <Stype name Warmup Plus: +x>
 * <Stype name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Rate: x%>
 * <Stype id Warmup Rate: x.x>
 *
 * <Stype name Warmup Rate: x%>
 * <Stype name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Flat: +x>
 * <Stype id Warmup Flat: -x>
 *
 * <Stype name Warmup Flat: +x>
 * <Stype name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Warmup Plus: +x>
 * <Global Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Warmup Rate: x%>
 * <Global Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Warmup Flat: +x>
 * <Global Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * === Cooldown/Warmup Notetag Actions ===
 *
 * The following notetags are actively altering effects that target cooldowns
 * and/or warmups. Cooldown effects may be applied at any moment through these
 * while warmup effects will only affect skills on warmup currently.
 *
 * ---
 *
 * <Clear User Cooldowns>
 * <Clear Target Cooldowns>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all cooldowns for the user/target.
 *
 * ---
 *
 * <Clear User Warmups>
 * <Clear Target Warmups>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all warmups for the user/target.
 *
 * ---
 *
 * <User Skill id Cooldown: +x>
 * <User Skill id Cooldown: -x>
 *
 * <User Skill name Cooldown: +x>
 * <User Skill name Cooldown: -x>
 *
 * <Target Skill id Cooldown: +x>
 * <Target Skill id Cooldown: -x>
 *
 * <Target Skill name Cooldown: +x>
 * <Target Skill name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <User Stype id Cooldown: +x>
 * <User Stype id Cooldown: -x>
 *
 * <User Stype name Cooldown: +x>
 * <User Stype name Cooldown: -x>
 *
 * <Target Stype id Cooldown: +x>
 * <Target Stype id Cooldown: -x>
 *
 * <Target Stype name Cooldown: +x>
 * <Target Stype name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <User Global Cooldown: +x>
 * <User Global Cooldown: -x>
 *
 * <Target Global Cooldown: +x>
 * <Target Global Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 *
 * ---
 *
 * <User Skill id Warmup: +x>
 * <User Skill id Warmup: -x>
 *
 * <User Skill name Warmup: +x>
 * <User Skill name Warmup: -x>
 *
 * <Target Skill id Warmup: +x>
 * <Target Skill id Warmup: -x>
 *
 * <Target Skill name Warmup: +x>
 * <Target Skill name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Stype id Warmup: +x>
 * <User Stype id Warmup: -x>
 *
 * <User Stype name Warmup: +x>
 * <User Stype name Warmup: -x>
 *
 * <Target Stype id Warmup: +x>
 * <Target Stype id Warmup: -x>
 *
 * <Target Stype name Warmup: +x>
 * <Target Stype name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Global Warmup: +x>
 * <User Global Warmup: -x>
 *
 * <Target Global Warmup: +x>
 * <Target Global Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
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
 * Actor: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cooldown Settings
 * ============================================================================
 *
 * These are the general settings pertaining to cooldowns in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Cooldowns.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Cooldowns.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Cooldowns.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Cooldowns?:
 *   - Display Skill Cooldowns?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Cooldowns.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Max Cooldown:
 *   - Maximum turns that cooldowns can be.
 * 
 *   JS: On Cooldown Update:
 *   - Code ran when a skill's cooldown updates.
 * 
 *   JS: On Cooldown Ready:
 *   - Code ran when a skill's cooldown reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Warmup Settings
 * ============================================================================
 *
 * These are the general settings pertaining to warmups in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Warmups.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Warmups.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Warmups.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Warmups?:
 *   - Display Skill Warmups?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Warmups.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Preemptive Bonus:
 *   - How many turns should be dropped off Warmups on a Preemptive attack?
 * 
 *   Max Warmup:
 *   - Maximum turns that warmups can be.
 * 
 *   JS: On Warmup Update:
 *   - Code ran when a skill's warmup updates.
 * 
 *   JS: On Warmup Ready:
 *   - Code ran when a skill's warmup reaches 0.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Global and SType Cooldown modifiers should not cause crashes with
 *    specific numbers. Fix made by Yanfly.
 *
 * Version 1.00: September 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSkillCooldown
 * @text Actor: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorStypeCooldown
 * @text Actor: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlobalCooldown
 * @text Actor: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySkillCooldown
 * @text Enemy: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyStypeCooldown
 * @text Enemy: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlobalCooldown
 * @text Enemy: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
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
 * @param SkillCooldowns
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Cooldown:struct
 * @text Skill Cooldowns
 * @type struct<Cooldown>
 * @desc Adjust cooldown settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Ready in %1T%2","Mechanics":"","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Warmup:struct
 * @text Skill Warmups
 * @type struct<Warmup>
 * @desc Adjust warmup settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Prepared in %1T%2","Mechanics":"","Preemptive:num":"10","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
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
 * Cooldown Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cooldown:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Cooldowns.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Cooldowns.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Cooldowns.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Cooldowns?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Cooldowns?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Cooldowns.
 * %1 - Turns, %2 - Icon
 * @default Ready in %1T%2
 *
 * @param Mechanics
 *
 * @param MaxTurns:num
 * @text Max Cooldown
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that cooldowns can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Cooldown Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Cooldown Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Warmup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Warmup:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Warmups.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Warmups.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Warmups.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Warmups?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Warmups?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Warmups.
 * %1 - Turns, %2 - Icon
 * @default Prepared in %1T%2
 *
 * @param Mechanics
 *
 * @param Preemptive:num
 * @text Preemptive Bonus
 * @parent Mechanics
 * @type number
 * @min 0
 * @desc How many turns should be dropped off Warmups on a Preemptive attack?
 * @default 10
 *
 * @param MaxTurns:num
 * @text Max Warmup
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that warmups can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Warmup Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Warmup Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
//=============================================================================

const _0x53e6=['KHukb','NUM','applyCDWUnotetagsRate','hUyZk','EGwDZ','rawWarmup','AUmEd','dycVM','YzcdJ','isBypassWarmups','<GLOBAL\x20%1\x20%2:[\x20]([\x5c+\x5c-]\x5cd+)>','bxEUQ','drawSkillCost','process_VisuMZ_SkillsStatesCore_Skill_JS','WARMUP','_skillWarmups','QfbcX','ActorGlobalCooldown','<GLOBAL\x20%1\x20%2:[\x20]%3>','applyClearCooldownEffects','\x5cI[%1]','aLhqC','FontSize','applyStypeCooldowns','dqYZR','initSkillCooldowns','call','applyChangeWarmupEffects','onWarmupUpdate','zqZXh','cooldownJS','GFsRy','RATE','subject','areSkillWarmupsReady','EVAL','description','skills','BattleManager_startAction','TextFmt','MShEr','VisuMZ_1_MessageCore','ceil','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','getSkillIdWithName','sHTOz','OnUpdateJS','pMeNq','Game_Battler_onBattleEnd','ActorStypeCooldown','format','RmPdC','applyChangeGlobalCooldownEffects','ConvertParams','textSizeEx','ARRAYSTRUCT','prepareSkillWarmups','eYYBh','initMembers','Global_%1_%2','addCooldown','Game_BattlerBase_paySkillCost','PiDuP','HKKjp','UfyAX','FontColor','clamp','vihmK','members','item','LsgYB','nKpXg','toUpperCase','ffaSB','qLzBP','version','Cooldown','\x5cC[%1]','IFImJ','onCooldownUpdateJS','Show','\x5cFS[%1]','PLUS','Skill_%1_%2_%3','Bmxml','rfKdh','updateWarmups','setCooldown','gtVzH','JbCeJ','prepareUpdateSkillCooldowns','paySkillCost','fJdbx','Scene_Boot_process_VisuMZ_SkillsStatesCore_Skill_JS','ARRAYNUM','<SKILL\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','Warmup','drawSkillCooldown','max','warmup','map','bNXXm','ActorSkillCooldown','_subject','Cnwny','parse','Stype_%1_%2_%3','LmNbW','HgdMF','applyCDWUmodifiers','eahnJ','Game_Action_applyItemUserEffect','traitObjects','reduce','guardSkillId','applyWarmup','warmupJS','geLHg','RDOqJ','XecGK','ROPbh','Step2','PDDMI','wzPPL','QVLCN','Icon','Step1','applyCDWUnotetagsFlat','replace','attackSkillId','applyChangeStypeCooldownEffects','AwRGI','onCooldownReady','tJrUS','CuWHI','onWarmupUpdateJS','_updatedSkillCooldowns','XhHkw','WAIT','\x5cHexColor<%1>','iPXGH','wTrss','RwtlC','mGkvp','onCooldownUpdate','match','jOQUr','YFkvl','<STYPE\x20%1\x20%2\x20%3:[\x20]%4>','resetFontSettings','tVypa','applyCooldown','ACfMm','clearCooldowns','(\x5cd+\x5c.?\x5cd+)','updateCooldowns','notetag3','prototype','onWarmupReady','YqIHA','phkpr','notetag1','Game_BattlerBase_meetsSkillConditions','addWarmup','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','aSccJ','LZqud','ENuWQ','applySkillCooldownEffects','RegExp','onBattleEnd','IYQpr','return\x200','Game_Battler_onBattleStart','JrFNU','Settings','SkillCooldowns','name','exit','ydKGQ','drawSkillWarmup','XRhfy','STR','note','actor','getSkillTypes','TlNaB','inBattle','_skillCooldowns','Window_Base_drawSkillCost','cooldown','Game_BattlerBase_initMembers','<SKILL\x20%1\x20%2\x20%3:[\x20]%4>','applyItemUserEffect','notetag2','isBypassCooldowns','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','status','Step3','<STYPE\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','DmdoG','applyChangeStypeWarmupEffects','PegwA','onWarmupReadyJS','COOLDOWN','ZGosk','SWUIv','yaKFL','onCooldownReadyJS','OperateValues','startAction','OnReadyJS','qJWNV','drawTextEx','ARRAYFUNC','skillTypes','VisuMZ_1_SkillsStatesCore','clearWarmups','FLAT','trim','applyChangeCooldownEffects','onBattleStart','JbNYn','includes','filter','EnemyStypeCooldown','oPicS','Step4','applyGlobalCooldowns','sLoXC','notetag4','applyChangeGlobalWarmupEffects','IZoqA','paySkillCooldown','MaxTurns','Preemptive','ARRAYSTR','AqghO','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','registerCommand','Game_Battler_onTurnEnd','rXwil','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onTurnEnd'];(function(_0x42684d,_0x53e602){const _0x219174=function(_0x1033b2){while(--_0x1033b2){_0x42684d['push'](_0x42684d['shift']());}};_0x219174(++_0x53e602);}(_0x53e6,0xf2));const _0x2191=function(_0x42684d,_0x53e602){_0x42684d=_0x42684d-0x0;let _0x219174=_0x53e6[_0x42684d];return _0x219174;};const _0x19deae=_0x2191;var label=_0x19deae('0xb2'),tier=tier||0x0,dependencies=[_0x19deae('0xda')],pluginData=$plugins[_0x19deae('0xe2')](function(_0x120ee7){const _0x2e7d48=_0x19deae;return _0x120ee7[_0x2e7d48('0xc7')]&&_0x120ee7[_0x2e7d48('0x26')][_0x2e7d48('0xe1')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x19deae('0xb1')]||{},VisuMZ[_0x19deae('0x37')]=function(_0xbe7828,_0x34e468){const _0x19185a=_0x19deae;for(const _0x43bd4 in _0x34e468){if(_0x19185a('0x67')===_0x19185a('0x67')){if(_0x43bd4[_0x19185a('0x93')](/(.*):(.*)/i)){if(_0x19185a('0xe7')===_0x19185a('0xe7')){const _0x38feaa=String(RegExp['$1']),_0x501777=String(RegExp['$2'])[_0x19185a('0x4a')]()['trim']();let _0x49eff7,_0x2708b9,_0x5eff96;switch(_0x501777){case _0x19185a('0x3'):_0x49eff7=_0x34e468[_0x43bd4]!==''?Number(_0x34e468[_0x43bd4]):0x0;break;case _0x19185a('0x60'):_0x2708b9=_0x34e468[_0x43bd4]!==''?JSON[_0x19185a('0x6b')](_0x34e468[_0x43bd4]):[],_0x49eff7=_0x2708b9[_0x19185a('0x66')](_0x231015=>Number(_0x231015));break;case _0x19185a('0x25'):_0x49eff7=_0x34e468[_0x43bd4]!==''?eval(_0x34e468[_0x43bd4]):null;break;case'ARRAYEVAL':_0x2708b9=_0x34e468[_0x43bd4]!==''?JSON[_0x19185a('0x6b')](_0x34e468[_0x43bd4]):[],_0x49eff7=_0x2708b9[_0x19185a('0x66')](_0x42a799=>eval(_0x42a799));break;case'JSON':_0x49eff7=_0x34e468[_0x43bd4]!==''?JSON[_0x19185a('0x6b')](_0x34e468[_0x43bd4]):'';break;case'ARRAYJSON':_0x2708b9=_0x34e468[_0x43bd4]!==''?JSON[_0x19185a('0x6b')](_0x34e468[_0x43bd4]):[],_0x49eff7=_0x2708b9[_0x19185a('0x66')](_0x1dc8bb=>JSON[_0x19185a('0x6b')](_0x1dc8bb));break;case'FUNC':_0x49eff7=_0x34e468[_0x43bd4]!==''?new Function(JSON['parse'](_0x34e468[_0x43bd4])):new Function(_0x19185a('0xae'));break;case _0x19185a('0xd8'):_0x2708b9=_0x34e468[_0x43bd4]!==''?JSON[_0x19185a('0x6b')](_0x34e468[_0x43bd4]):[],_0x49eff7=_0x2708b9[_0x19185a('0x66')](_0x4f7f16=>new Function(JSON[_0x19185a('0x6b')](_0x4f7f16)));break;case _0x19185a('0xb8'):_0x49eff7=_0x34e468[_0x43bd4]!==''?String(_0x34e468[_0x43bd4]):'';break;case _0x19185a('0xee'):_0x2708b9=_0x34e468[_0x43bd4]!==''?JSON['parse'](_0x34e468[_0x43bd4]):[],_0x49eff7=_0x2708b9[_0x19185a('0x66')](_0x34b788=>String(_0x34b788));break;case'STRUCT':_0x5eff96=_0x34e468[_0x43bd4]!==''?JSON[_0x19185a('0x6b')](_0x34e468[_0x43bd4]):{},_0x49eff7=VisuMZ[_0x19185a('0x37')]({},_0x5eff96);break;case _0x19185a('0x39'):_0x2708b9=_0x34e468[_0x43bd4]!==''?JSON[_0x19185a('0x6b')](_0x34e468[_0x43bd4]):[],_0x49eff7=_0x2708b9['map'](_0x10c177=>VisuMZ[_0x19185a('0x37')]({},JSON[_0x19185a('0x6b')](_0x10c177)));break;default:continue;}_0xbe7828[_0x38feaa]=_0x49eff7;}else{function _0x201b21(){this['applyCooldown'](_0x837c77['id'],_0x2342b3);}}}}else{function _0x49e8d5(){var _0x1aeae9=_0x2189bb(_0x175335['$1'])/0x64;_0x1992c9*=_0x1aeae9;}}}return _0xbe7828;},(_0x1b1cab=>{const _0x532da2=_0x19deae,_0x29395d=_0x1b1cab[_0x532da2('0xb3')];for(const _0x3c63ab of dependencies){if(_0x532da2('0x41')===_0x532da2('0x41')){if(!Imported[_0x3c63ab]){if(_0x532da2('0xb7')!==_0x532da2('0xb7')){function _0x3c2e58(){_0x330b6b=_0x49ffbc(_0x59ef53['$1']),_0x493d64=_0x2b7bea(_0xe1b3ef['$2']);}}else{alert(_0x532da2('0x2d')[_0x532da2('0x34')](_0x29395d,_0x3c63ab)),SceneManager[_0x532da2('0xb4')]();break;}}}else{function _0x5315ea(){const _0x5b1afd=_0x532da2;for(const _0x593a11 of _0x44df0a){let _0x533bcc=0x0,_0x420b2a=0x0;if(_0x593a11[_0x5b1afd('0x93')](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x533bcc=_0x124824(_0x2b80d3['$1']),_0x420b2a=_0xc950e9(_0x48cab7['$2']);else _0x593a11[_0x5b1afd('0x93')](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x533bcc=_0x118347['getStypeIdWithName'](_0x3058a4['$1']),_0x420b2a=_0x5844f6(_0x543c02['$2']));this[_0x5b1afd('0x19')](_0x533bcc,_0x420b2a);}}}}const _0x5b30c0=_0x1b1cab[_0x532da2('0x26')];if(_0x5b30c0[_0x532da2('0x93')](/\[Version[ ](.*?)\]/i)){if(_0x532da2('0xef')===_0x532da2('0xbc')){function _0x24e07b(){const _0x92f52=_0x532da2;for(const _0x54f5b6 of this[_0x92f52('0x27')]()){_0x54f5b6&&this[_0x92f52('0x99')](_0x54f5b6['id'],_0x4b2e21);}}}else{const _0x5e0320=Number(RegExp['$1']);_0x5e0320!==VisuMZ[label][_0x532da2('0x4d')]&&(alert(_0x532da2('0xa6')['format'](_0x29395d,_0x5e0320)),SceneManager[_0x532da2('0xb4')]());}}if(_0x5b30c0['match'](/\[Tier[ ](\d+)\]/i)){const _0x8aaa54=Number(RegExp['$1']);if(_0x8aaa54<tier){if(_0x532da2('0x90')!==_0x532da2('0x90')){function _0x50f7b0(){_0x4ec22a=_0x5daa8d['getSkillIdWithName'](_0x53b4c9['$1']),_0xefb64c=_0x269d8d(_0x1f5dfb['$2']);}}else alert(_0x532da2('0xc6')[_0x532da2('0x34')](_0x29395d,_0x8aaa54,tier)),SceneManager[_0x532da2('0xb4')]();}else{if('cLrkX'!=='EeLKF')tier=Math[_0x532da2('0x64')](_0x8aaa54,tier);else{function _0x139890(){var _0x50dd51=_0x269276(_0x45f603['$1']);_0x22a01c*=_0x50dd51;}}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x532da2('0xb1')],_0x1b1cab['parameters']);})(pluginData),VisuMZ['OperateValues']=function(_0x324012,_0x201318,_0x32ca3b){switch(_0x32ca3b){case'=':return _0x201318;break;case'+':return _0x324012+_0x201318;break;case'-':return _0x324012-_0x201318;break;case'*':return _0x324012*_0x201318;break;case'/':return _0x324012/_0x201318;break;case'%':return _0x324012%_0x201318;break;}return _0x324012;},PluginManager[_0x19deae('0xf1')](pluginData['name'],_0x19deae('0x68'),_0x413ad6=>{const _0x481b7a=_0x19deae;if(!$gameParty[_0x481b7a('0xbd')]())return;VisuMZ['ConvertParams'](_0x413ad6,_0x413ad6);const _0x410a9b=_0x413ad6[_0x481b7a('0x80')],_0x1adac2=_0x413ad6[_0x481b7a('0x7b')],_0xed10e5=_0x413ad6[_0x481b7a('0xc8')],_0x2c4820=_0x413ad6[_0x481b7a('0xe5')];for(const _0x29f3cf of _0x410a9b){if('wzPPL'!==_0x481b7a('0x7d')){function _0x5831c0(){const _0x7c4ee4=_0x481b7a;_0x2eae9e[_0x7c4ee4('0xb2')][_0x7c4ee4('0x89')][_0x5d345d][_0x7c4ee4('0x1c')](this,_0x1de89e);}}else{const _0x555588=$gameActors[_0x481b7a('0xba')](_0x29f3cf);if(!_0x555588)continue;for(const _0x1a3c7b of _0x1adac2){let _0x2ccae8=_0x555588[_0x481b7a('0xc0')](_0x1a3c7b);_0x2ccae8=VisuMZ[_0x481b7a('0xd3')](_0x2ccae8,_0x2c4820,_0xed10e5),_0x555588['setCooldown'](_0x1a3c7b,_0x2ccae8);}}}}),PluginManager[_0x19deae('0xf1')](pluginData[_0x19deae('0xb3')],_0x19deae('0x33'),_0x170302=>{const _0x486d1a=_0x19deae;if(!$gameParty[_0x486d1a('0xbd')]())return;VisuMZ[_0x486d1a('0x37')](_0x170302,_0x170302);const _0x2bab26=_0x170302[_0x486d1a('0x80')],_0x239cf3=_0x170302['Step2'],_0x5fc2ea=_0x170302[_0x486d1a('0xc8')],_0x33cb8f=_0x170302[_0x486d1a('0xe5')];for(const _0x386744 of _0x2bab26){const _0x5cd4e9=$gameActors[_0x486d1a('0xba')](_0x386744);if(!_0x5cd4e9)continue;for(const _0x3c7474 of _0x239cf3){if(_0x486d1a('0x42')!==_0x486d1a('0x42')){function _0x31362e(){const _0x1377fb=_0x486d1a;if(this[_0x1377fb('0xbe')]===_0x2c10c9)this[_0x1377fb('0x1b')]();this[_0x1377fb('0xbe')][_0x1eb188]=this[_0x1377fb('0xbe')][_0x33a6a3]||0x0,this['setCooldown'](_0x1bcb7b,this[_0x1377fb('0xbe')][_0x1d4b6c]+_0x586c73);}}else for(const _0x3a7dfb of _0x5cd4e9['skills']()){if(!_0x3a7dfb)continue;if(!DataManager[_0x486d1a('0xbb')](_0x3a7dfb)[_0x486d1a('0xe1')](_0x3c7474))continue;const _0x15bfc4=_0x3a7dfb['id'];let _0x250602=_0x5cd4e9[_0x486d1a('0xc0')](_0x15bfc4);_0x250602=VisuMZ[_0x486d1a('0xd3')](_0x250602,_0x33cb8f,_0x5fc2ea),_0x5cd4e9['setCooldown'](_0x15bfc4,_0x250602);}}}}),PluginManager[_0x19deae('0xf1')](pluginData[_0x19deae('0xb3')],_0x19deae('0x13'),_0x499eb2=>{const _0x41c28f=_0x19deae;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x499eb2,_0x499eb2);const _0x287db9=_0x499eb2['Step1'],_0x1bb764=_0x499eb2[_0x41c28f('0x7b')],_0x1c8e90=_0x499eb2[_0x41c28f('0xc8')];for(const _0x3de582 of _0x287db9){if('ENuWQ'===_0x41c28f('0xa9')){const _0x42a680=$gameActors[_0x41c28f('0xba')](_0x3de582);if(!_0x42a680)continue;for(const _0x1bba0d of _0x42a680[_0x41c28f('0x27')]()){if(_0x41c28f('0x77')===_0x41c28f('0x77')){if(!_0x1bba0d)continue;const _0x320d9a=_0x1bba0d['id'];let _0x5148a2=_0x42a680[_0x41c28f('0xc0')](_0x320d9a);_0x5148a2=VisuMZ[_0x41c28f('0xd3')](_0x5148a2,_0x1c8e90,_0x1bb764),_0x42a680[_0x41c28f('0x59')](_0x320d9a,_0x5148a2);}else{function _0x156687(){const _0x295134=_0x41c28f,_0x3155d1=_0x358592[_0x295134('0xbb')](_0x420a4b);_0x3155d1['includes'](_0x593018)&&this['subject']()['addCooldown'](_0x242ab2['id'],_0x28eb40);}}}}else{function _0x497942(){const _0x5f35ae=_0x41c28f;_0x5524d5[_0x5f35ae('0xb2')]['Game_Battler_onBattleStart']['call'](this,_0x5195d0),this[_0x5f35ae('0x9b')](),this['clearWarmups'](),this[_0x5f35ae('0x3a')](_0x4e543b);}}}}),PluginManager[_0x19deae('0xf1')](pluginData[_0x19deae('0xb3')],'EnemySkillCooldown',_0x26e4c1=>{const _0x4bff46=_0x19deae;if(!$gameParty[_0x4bff46('0xbd')]())return;VisuMZ['ConvertParams'](_0x26e4c1,_0x26e4c1);const _0x1ea343=_0x26e4c1[_0x4bff46('0x80')],_0x1d7be=_0x26e4c1['Step2'],_0x45cc6a=_0x26e4c1['Step3'],_0x3f6df8=_0x26e4c1[_0x4bff46('0xe5')];for(const _0xd513c8 of _0x1ea343){const _0x2c15b9=$gameTroop[_0x4bff46('0x46')]()[_0xd513c8];if(!_0x2c15b9)continue;for(const _0x1a5d47 of _0x1d7be){if(_0x4bff46('0x5')==='hUyZk'){let _0x3216c2=_0x2c15b9[_0x4bff46('0xc0')](_0x1a5d47);_0x3216c2=VisuMZ[_0x4bff46('0xd3')](_0x3216c2,_0x3f6df8,_0x45cc6a),_0x2c15b9[_0x4bff46('0x59')](_0x1a5d47,_0x3216c2);}else{function _0x30e7ae(){const _0x311c67=_0x4bff46;for(const _0x4027b5 of _0x1e6069){let _0x54d464=0x0,_0x1174e1=0x0;if(_0x4027b5[_0x311c67('0x93')](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x54d464=_0x7d7c05(_0x4fdd80['$1']),_0x1174e1=_0x5ac642(_0x470feb['$2']);else _0x4027b5['match'](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x54d464=_0x2460e8['getSkillIdWithName'](_0x5e3523['$1']),_0x1174e1=_0x567ff3(_0x273af1['$2']));_0x2bf8d2[_0x311c67('0xa5')](_0x54d464,_0x1174e1);}}}}}}),PluginManager[_0x19deae('0xf1')](pluginData['name'],_0x19deae('0xe3'),_0x112f7e=>{const _0x1771cf=_0x19deae;if(!$gameParty['inBattle']())return;VisuMZ[_0x1771cf('0x37')](_0x112f7e,_0x112f7e);const _0x427808=_0x112f7e[_0x1771cf('0x80')],_0x14886b=_0x112f7e['Step2'],_0x16abd8=_0x112f7e[_0x1771cf('0xc8')],_0x58760c=_0x112f7e[_0x1771cf('0xe5')];for(const _0x375f12 of _0x427808){if(_0x1771cf('0x4b')===_0x1771cf('0x4b')){const _0x205db2=$gameTroop[_0x1771cf('0x46')]()[_0x375f12];if(!_0x205db2)continue;for(const _0x38a437 of _0x14886b){for(const _0x4812d7 of _0x205db2['skills']()){if(_0x1771cf('0x91')===_0x1771cf('0xca')){function _0x336df8(){const _0x26a5e5=_0x1771cf;if(this['_skillWarmups']===_0x2893df)this[_0x26a5e5('0x1b')]();if(this[_0x26a5e5('0xb')](_0x5b8e4b))return;_0x300ef4=_0xe1d486[_0x26a5e5('0x2c')](_0x3de5b7),_0x123e98=_0x1452d0[_0x26a5e5('0x44')](0x0,_0x9056b1['SkillCooldowns'][_0x26a5e5('0xb1')][_0x26a5e5('0x62')][_0x26a5e5('0xec')]);const _0x206968=this[_0x26a5e5('0x7')](_0xb56ff1);;this[_0x26a5e5('0x11')][_0x266463]=_0xbd5ad;if(this[_0x26a5e5('0x11')][_0x5a4087]<=0x0){if(_0x206968>0x0)this[_0x26a5e5('0xa0')](_0x1c341e);delete this[_0x26a5e5('0x11')][_0x1f5648];}}}else{if(!_0x4812d7)continue;if(!DataManager[_0x1771cf('0xbb')](_0x4812d7)['includes'](_0x38a437))continue;const _0x10c8b3=_0x4812d7['id'];let _0x3a46f6=_0x205db2[_0x1771cf('0xc0')](_0x10c8b3);_0x3a46f6=VisuMZ['OperateValues'](_0x3a46f6,_0x58760c,_0x16abd8),_0x205db2[_0x1771cf('0x59')](_0x10c8b3,_0x3a46f6);}}}}else{function _0x370f21(){_0x570776=_0x576263['getSkillIdWithName'](_0x334c62['$1']),_0x521f99=_0x515dd2(_0x1a4020['$2']);}}}}),PluginManager[_0x19deae('0xf1')](pluginData[_0x19deae('0xb3')],'EnemyGlobalCooldown',_0x169304=>{const _0x257811=_0x19deae;if(!$gameParty[_0x257811('0xbd')]())return;VisuMZ[_0x257811('0x37')](_0x169304,_0x169304);const _0x400529=_0x169304[_0x257811('0x80')],_0x1c6a15=_0x169304[_0x257811('0x7b')],_0x22bab9=_0x169304[_0x257811('0xc8')];for(const _0x49ee19 of _0x400529){const _0x28f7c1=$gameTroop['members']()[_0x49ee19];if(!_0x28f7c1)continue;for(const _0xda81b4 of _0x28f7c1[_0x257811('0x27')]()){if(!_0xda81b4)continue;const _0x295f4d=_0xda81b4['id'];let _0x333791=_0x28f7c1[_0x257811('0xc0')](_0x295f4d);_0x333791=VisuMZ[_0x257811('0xd3')](_0x333791,_0x22bab9,_0x1c6a15),_0x28f7c1[_0x257811('0x59')](_0x295f4d,_0x333791);}}}),VisuMZ['SkillCooldowns'][_0x19deae('0x20')]={},VisuMZ[_0x19deae('0xb2')][_0x19deae('0x76')]={},VisuMZ['SkillCooldowns']['onCooldownUpdateJS']={},VisuMZ[_0x19deae('0xb2')][_0x19deae('0x89')]={},VisuMZ[_0x19deae('0xb2')][_0x19deae('0xd2')]={},VisuMZ[_0x19deae('0xb2')][_0x19deae('0xcd')]={},VisuMZ[_0x19deae('0xb2')][_0x19deae('0x5f')]=Scene_Boot[_0x19deae('0x9f')]['process_VisuMZ_SkillsStatesCore_Skill_JS'],Scene_Boot['prototype'][_0x19deae('0xf')]=function(_0x30c21b){const _0x3004ef=_0x19deae;VisuMZ['SkillCooldowns'][_0x3004ef('0x5f')][_0x3004ef('0x1c')](this,_0x30c21b);const _0x5336c1=_0x30c21b['note'],_0x258fc0='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20',_0x25df26=_0x3004ef('0xf0');if(_0x5336c1[_0x3004ef('0x93')](/<JS (?:COOLDOWN|COOLDOWNS)>\s*([\s\S]*)\s*<\/JS (?:COOLDOWN|COOLDOWNS)>/i)){const _0x1ec4fd=String(RegExp['$1']),_0x38d3c7='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x1ec4fd);VisuMZ[_0x3004ef('0xb2')][_0x3004ef('0x20')][_0x30c21b['id']]=new Function(_0x38d3c7);}if(_0x5336c1[_0x3004ef('0x93')](/<JS (?:WARMUP|WARMUPS)>\s*([\s\S]*)\s*<\/JS (?:WARMUP|WARMUPS)>/i)){const _0x581476=String(RegExp['$1']),_0x521331=_0x3004ef('0x0')['format'](_0x581476);VisuMZ[_0x3004ef('0xb2')][_0x3004ef('0x76')][_0x30c21b['id']]=new Function(_0x521331);}if(_0x5336c1['match'](/<JS ON COOLDOWN UPDATE>\s*([\s\S]*)\s*<\/JS ON COOLDOWN UPDATE>/i)){if(_0x3004ef('0xa1')!==_0x3004ef('0xa1')){function _0x517bf7(){const _0xfdd62e=_0x3004ef;_0x271b74[_0xfdd62e('0xb2')][_0xfdd62e('0x51')][_0x782f1b][_0xfdd62e('0x1c')](this,_0x2fb7d9);}}else{const _0x3e9f9d=String(RegExp['$1']),_0x2ea4f2=_0x258fc0[_0x3004ef('0x34')](_0x3e9f9d);VisuMZ['SkillCooldowns'][_0x3004ef('0x51')][_0x30c21b['id']]=new Function(_0x2ea4f2);}}if(_0x5336c1['match'](/<JS ON WARMUP UPDATE>\s*([\s\S]*)\s*<\/JS ON WARMUP UPDATE>/i)){const _0x5dc2fe=String(RegExp['$1']),_0x5572fb=_0x25df26['format'](_0x5dc2fe);VisuMZ[_0x3004ef('0xb2')]['onWarmupUpdateJS'][_0x30c21b['id']]=new Function(_0x5572fb);}if(_0x5336c1[_0x3004ef('0x93')](/<JS ON COOLDOWN READY>\s*([\s\S]*)\s*<\/JS ON COOLDOWN READY>/i)){if(_0x3004ef('0x9a')!=='QFFDK'){const _0x23382a=String(RegExp['$1']),_0xcbd9ca=_0x258fc0['format'](_0x23382a);VisuMZ['SkillCooldowns'][_0x3004ef('0xd2')][_0x30c21b['id']]=new Function(_0xcbd9ca);}else{function _0x6e93c0(){const _0x20f77c=_0x3004ef;_0x4f5efb=this[_0x20f77c('0x6f')](_0x5eef3f,_0x4a3431,_0x20f77c('0x10')),this['setWarmup'](_0x315fc0,_0x498aa0[_0x20f77c('0x64')](_0x255b67,this[_0x20f77c('0x65')](_0x196372)));}}}if(_0x5336c1['match'](/<JS ON WARMUP READY>\s*([\s\S]*)\s*<\/JS ON WARMUP READY>/i)){if(_0x3004ef('0xea')==='IZoqA'){const _0x21b121=String(RegExp['$1']),_0x46b1a1=_0x25df26[_0x3004ef('0x34')](_0x21b121);VisuMZ[_0x3004ef('0xb2')][_0x3004ef('0xcd')][_0x30c21b['id']]=new Function(_0x46b1a1);}else{function _0x5007d3(){const _0x571ea7=_0x3004ef;_0x125d07+=_0x571ea7('0x4f')[_0x571ea7('0x34')](_0x132ca1);}}}},VisuMZ[_0x19deae('0xb2')]['BattleManager_startAction']=BattleManager['startAction'],BattleManager[_0x19deae('0xd4')]=function(){const _0x129d33=_0x19deae;this[_0x129d33('0x69')][_0x129d33('0x5c')](),VisuMZ['SkillCooldowns'][_0x129d33('0x28')]['call'](this);},VisuMZ['SkillCooldowns'][_0x19deae('0x71')]=Game_Action[_0x19deae('0x9f')][_0x19deae('0xc3')],Game_Action[_0x19deae('0x9f')][_0x19deae('0xc3')]=function(_0x4f7e23){const _0x3fe8ba=_0x19deae;VisuMZ[_0x3fe8ba('0xb2')][_0x3fe8ba('0x71')][_0x3fe8ba('0x1c')](this,_0x4f7e23),this[_0x3fe8ba('0xaa')](_0x4f7e23);},Game_Action[_0x19deae('0x9f')][_0x19deae('0xaa')]=function(_0x14401b){const _0x1d69ad=_0x19deae;this[_0x1d69ad('0x15')](_0x14401b),this['applyChangeCooldownEffects'](_0x14401b),this[_0x1d69ad('0x84')](_0x14401b),this[_0x1d69ad('0x36')](_0x14401b),this[_0x1d69ad('0x1d')](_0x14401b),this['applyChangeStypeWarmupEffects'](_0x14401b),this['applyChangeGlobalWarmupEffects'](_0x14401b);},Game_Action[_0x19deae('0x9f')][_0x19deae('0x15')]=function(_0x58bec7){const _0x472945=_0x19deae,_0x3f2e04=this[_0x472945('0x47')]()['note'];_0x3f2e04[_0x472945('0x93')](/<CLEAR USER COOLDOWNS>/i)&&this[_0x472945('0x23')]()['clearCooldowns'](),_0x3f2e04['match'](/<CLEAR TARGET COOLDOWNS>/i)&&_0x58bec7[_0x472945('0x9b')](),_0x3f2e04[_0x472945('0x93')](/<CLEAR USER WARMUPS>/i)&&this[_0x472945('0x23')]()[_0x472945('0xdb')](),_0x3f2e04[_0x472945('0x93')](/<CLEAR TARGET WARMUPS>/i)&&_0x58bec7['clearWarmups']();},Game_Action[_0x19deae('0x9f')][_0x19deae('0xde')]=function(_0xdc9ad6){const _0x16d315=_0x19deae,_0x3102ab=this[_0x16d315('0x47')]()[_0x16d315('0xb9')],_0x33e9bc=_0x3102ab[_0x16d315('0x93')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x33e9bc){if(_0x16d315('0x57')!==_0x16d315('0x57')){function _0xa51e61(){const _0x130eef=_0x16d315,_0xee90df=_0x2cde8d(_0x554d45['$1']);this[_0x130eef('0xe6')](_0xee90df);}}else for(const _0x34b2f7 of _0x33e9bc){let _0x266bca=0x0,_0x52b130=0x0;if(_0x34b2f7[_0x16d315('0x93')](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x16d315('0x4c')!==_0x16d315('0xd1'))_0x266bca=Number(RegExp['$1']),_0x52b130=Number(RegExp['$2']);else{function _0x49b60b(){_0x238b7e=_0x59c46e(_0x3a7173['$1']),_0x5f4444=_0x53269e(_0x26f70c['$2']);}}}else _0x34b2f7[_0x16d315('0x93')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x266bca=DataManager['getSkillIdWithName'](RegExp['$1']),_0x52b130=Number(RegExp['$2']));this[_0x16d315('0x23')]()[_0x16d315('0x3e')](_0x266bca,_0x52b130);}}const _0x5f56e6=_0x3102ab[_0x16d315('0x93')](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x5f56e6)for(const _0xe46de9 of _0x5f56e6){if(_0x16d315('0xcf')!==_0x16d315('0x17')){let _0x46d6c3=0x0,_0x1cc3ed=0x0;if(_0xe46de9[_0x16d315('0x93')](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x16d315('0xb0')!==_0x16d315('0xb0')){function _0x150a93(){const _0x47f4ae=_0x16d315;if(this[_0x47f4ae('0x11')]===_0x3afd88)this[_0x47f4ae('0x1b')]();if(this[_0x47f4ae('0xb')]())return 0x0;return this['_skillWarmups'][_0x10a3dc]||0x0;}}else _0x46d6c3=Number(RegExp['$1']),_0x1cc3ed=Number(RegExp['$2']);}else _0xe46de9[_0x16d315('0x93')](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x46d6c3=DataManager[_0x16d315('0x2e')](RegExp['$1']),_0x1cc3ed=Number(RegExp['$2']));_0xdc9ad6[_0x16d315('0x3e')](_0x46d6c3,_0x1cc3ed);}else{function _0x55ee3f(){const _0x326732=_0x16d315;for(const _0x2fe003 of _0x486828){let _0x365afb=0x0,_0x22b798=0x0;if(_0x2fe003[_0x326732('0x93')](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x365afb=_0x22e001(_0x9a088e['$1']),_0x22b798=_0x41c07b(_0x2973ea['$2']);else _0x2fe003[_0x326732('0x93')](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x365afb=_0x4003f6[_0x326732('0x2e')](_0x31b71e['$1']),_0x22b798=_0xe49df9(_0x22c267['$2']));this[_0x326732('0x23')]()[_0x326732('0xa5')](_0x365afb,_0x22b798);}}}}},Game_Action[_0x19deae('0x9f')][_0x19deae('0x84')]=function(_0x59447d){const _0x2f7cc9=_0x19deae,_0x1dc5f1=this[_0x2f7cc9('0x47')]()['note'],_0x50bd57=_0x1dc5f1[_0x2f7cc9('0x93')](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x50bd57){if(_0x2f7cc9('0x40')!==_0x2f7cc9('0x40')){function _0x3657ab(){const _0x1eb4d8=_0x2f7cc9;_0x279e81=_0x8fce57[_0x1eb4d8('0x2e')](_0x43034c['$1']),_0x2fe9c8=_0x5d545b(_0x26afa6['$2']);}}else for(const _0x29cf18 of _0x50bd57){if(_0x2f7cc9('0x6e')===_0x2f7cc9('0xd0')){function _0x236957(){const _0x4c68f6=_0x2f7cc9;this[_0x4c68f6('0x99')](_0x22430d['id'],_0x133383);}}else{let _0x11f2d7=0x0,_0xb97b45=0x0;if(_0x29cf18[_0x2f7cc9('0x93')](/<USER STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x2f7cc9('0x6d')==='FvGGg'){function _0x41c99e(){const _0x37298e=_0x2f7cc9;this['_updatedSkillCooldowns']=![],_0x244dd8[_0x37298e('0xb2')]['Game_Battler_onTurnEnd'][_0x37298e('0x1c')](this);}}else _0x11f2d7=Number(RegExp['$1']),_0xb97b45=Number(RegExp['$2']);}else{if(_0x29cf18[_0x2f7cc9('0x93')](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x2f7cc9('0x5e')===_0x2f7cc9('0x5e'))_0x11f2d7=DataManager['getSkillIdWithName'](RegExp['$1']),_0xb97b45=Number(RegExp['$2']);else{function _0x51623c(){const _0x431475=_0x2f7cc9;_0x4c503c('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x44c8a9,_0x5f31db)),_0x3f6ae3[_0x431475('0xb4')]();}}}}for(const _0x23cb0d of this[_0x2f7cc9('0x23')]()[_0x2f7cc9('0x27')]()){if(_0x23cb0d){const _0x26c3c2=DataManager[_0x2f7cc9('0xbb')](_0x23cb0d);_0x26c3c2[_0x2f7cc9('0xe1')](_0x11f2d7)&&this[_0x2f7cc9('0x23')]()[_0x2f7cc9('0x3e')](_0x23cb0d['id'],_0xb97b45);}}}}}const _0xb2ce01=_0x1dc5f1[_0x2f7cc9('0x93')](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0xb2ce01)for(const _0x5b9079 of _0xb2ce01){let _0xc0ed03=0x0,_0x3bedbd=0x0;if(_0x5b9079[_0x2f7cc9('0x93')](/<TARGET STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0xc0ed03=Number(RegExp['$1']),_0x3bedbd=Number(RegExp['$2']);else _0x5b9079[_0x2f7cc9('0x93')](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0xc0ed03=DataManager[_0x2f7cc9('0x2e')](RegExp['$1']),_0x3bedbd=Number(RegExp['$2']));for(const _0x436098 of _0x59447d['skills']()){if(_0x436098){const _0x4dfcf0=DataManager[_0x2f7cc9('0xbb')](_0x436098);if(_0x4dfcf0[_0x2f7cc9('0xe1')](_0xc0ed03)){if(_0x2f7cc9('0x5b')!==_0x2f7cc9('0xd6'))_0x59447d[_0x2f7cc9('0x3e')](_0x436098['id'],_0x3bedbd);else{function _0x59c63f(){const _0x28d81a=_0x2f7cc9,_0x2f91cc=_0x4a4bf9['SkillCooldowns'][_0x28d81a('0xb1')];if(_0x2f91cc[_0x28d81a('0x62')][_0x28d81a('0x52')]&&_0x19e870[_0x28d81a('0x7')](_0x2d1382['id'])>0x0)this[_0x28d81a('0xb6')](_0x4d6268,_0x41e782,_0x1e5879,_0x48e6eb,_0x3503c2);else _0x2f91cc[_0x28d81a('0x4e')][_0x28d81a('0x52')]&&_0x4cba37[_0x28d81a('0xc0')](_0x33a02d['id'])>0x0?this[_0x28d81a('0x63')](_0x2c8bc9,_0xb8a3c6,_0x19070f,_0x351917,_0x2ecb97):_0x564870[_0x28d81a('0xb2')][_0x28d81a('0xbf')][_0x28d81a('0x1c')](this,_0x3048b3,_0x5d7843,_0x2be62d,_0x4fea2c,_0x3bcb65);}}}}}}},Game_Action[_0x19deae('0x9f')][_0x19deae('0x36')]=function(_0x548544){const _0x62cc9=_0x19deae,_0x6beaea=this['item']()[_0x62cc9('0xb9')];if(_0x6beaea[_0x62cc9('0x93')](/<USER GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){const _0x1118f2=Number(RegExp['$1']);for(const _0x5d77dd of this[_0x62cc9('0x23')]()[_0x62cc9('0x27')]()){if(_0x62cc9('0xad')===_0x62cc9('0x12')){function _0x4626da(){const _0xf5eb5d=_0x62cc9;return this[_0xf5eb5d('0x7')](_0x24d600['id'])<=0x0;}}else _0x5d77dd&&this['subject']()[_0x62cc9('0x3e')](_0x5d77dd['id'],_0x1118f2);}}if(_0x6beaea['match'](/<TARGET GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x62cc9('0x8f')!=='wTrss'){function _0x85dc07(){const _0x39dbae=_0x62cc9;_0x188d65=_0xa1edac[_0x39dbae('0x2e')](_0x159643['$1']),_0x257759=_0x1e0440(_0xd1569e['$2']);}}else{const _0x1774ca=Number(RegExp['$1']);for(const _0x13cb5d of _0x548544[_0x62cc9('0x27')]()){if(_0x13cb5d){if(_0x62cc9('0x49')==='WMXus'){function _0x3e4cb2(){const _0x2e4bba=_0x62cc9,_0x10c363=_0x2e4bba('0x6c')[_0x2e4bba('0x34')](_0x410e82,_0xb217f,_0x5ed52d);if(_0x8f9ae2[_0x2e4bba('0x93')](_0x341858[_0x10c363][_0x2e4bba('0xa3')])){var _0x30d00b=_0xbaa92e(_0x5eba0a['$1']);_0x586117+=_0x30d00b;}if(_0x242c48[_0x2e4bba('0x93')](_0x2aa2fe[_0x10c363][_0x2e4bba('0xc4')])){var _0x30d00b=_0xec6ee1(_0x2cc3fc['$1']);_0x5f2932+=_0x30d00b;}}}else _0x548544[_0x62cc9('0x3e')](_0x13cb5d['id'],_0x1774ca);}}}}},Game_Action[_0x19deae('0x9f')]['applyChangeWarmupEffects']=function(_0x147e93){const _0x17c612=_0x19deae,_0x643b2=this['item']()[_0x17c612('0xb9')],_0x3fa4bc=_0x643b2['match'](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x3fa4bc)for(const _0x5a75b0 of _0x3fa4bc){if('YFkvl'===_0x17c612('0x95')){let _0x4f39c7=0x0,_0x23c7e4=0x0;if(_0x5a75b0['match'](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x4f39c7=Number(RegExp['$1']),_0x23c7e4=Number(RegExp['$2']);else _0x5a75b0[_0x17c612('0x93')](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x4f39c7=DataManager[_0x17c612('0x2e')](RegExp['$1']),_0x23c7e4=Number(RegExp['$2']));this[_0x17c612('0x23')]()['addWarmup'](_0x4f39c7,_0x23c7e4);}else{function _0x437030(){_0x103f02=_0x5be3fb['getSkillIdWithName'](_0x36f015['$1']),_0x4cf183=_0x452dd8(_0x6cd199['$2']);}}}const _0x2158ba=_0x643b2[_0x17c612('0x93')](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x2158ba){if(_0x17c612('0xe4')!==_0x17c612('0x31'))for(const _0x523b7b of _0x2158ba){let _0x298f4e=0x0,_0x3f70b5=0x0;if(_0x523b7b[_0x17c612('0x93')](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x17c612('0x5a')==='ajyPC'){function _0x20ef8b(){const _0x5e8ebe=_0x17c612;_0x5a204b['SkillCooldowns'][_0x5e8ebe('0x3f')][_0x5e8ebe('0x1c')](this,_0x10360b),this['paySkillCooldown'](_0x24400e);}}else _0x298f4e=Number(RegExp['$1']),_0x3f70b5=Number(RegExp['$2']);}else _0x523b7b[_0x17c612('0x93')](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x298f4e=DataManager['getSkillIdWithName'](RegExp['$1']),_0x3f70b5=Number(RegExp['$2']));_0x147e93[_0x17c612('0xa5')](_0x298f4e,_0x3f70b5);}else{function _0x4fa564(){const _0x42e9ab=_0x17c612;for(const _0x16394d of _0x57f123){let _0x1c0a74=0x0,_0x5ad0ca=0x0;if(_0x16394d[_0x42e9ab('0x93')](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x1c0a74=_0x3f0857(_0x248ef7['$1']),_0x5ad0ca=_0xfedd55(_0x3eaeba['$2']);else _0x16394d[_0x42e9ab('0x93')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x1c0a74=_0x2ffa4d[_0x42e9ab('0x2e')](_0x2dc1eb['$1']),_0x5ad0ca=_0x45baa9(_0x305937['$2']));this[_0x42e9ab('0x23')]()[_0x42e9ab('0x3e')](_0x1c0a74,_0x5ad0ca);}}}}},Game_Action[_0x19deae('0x9f')][_0x19deae('0xcb')]=function(_0x1f360f){const _0x23fc43=_0x19deae,_0x10e893=this[_0x23fc43('0x47')]()[_0x23fc43('0xb9')],_0x440dda=_0x10e893[_0x23fc43('0x93')](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x440dda)for(const _0x4ffc5e of _0x440dda){if(_0x23fc43('0x56')!==_0x23fc43('0x85')){let _0x573c8a=0x0,_0x4c8566=0x0;if(_0x4ffc5e[_0x23fc43('0x93')](/<USER STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x573c8a=Number(RegExp['$1']),_0x4c8566=Number(RegExp['$2']);else _0x4ffc5e[_0x23fc43('0x93')](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x573c8a=DataManager[_0x23fc43('0x2e')](RegExp['$1']),_0x4c8566=Number(RegExp['$2']));for(const _0x37fab9 of this[_0x23fc43('0x23')]()[_0x23fc43('0x27')]()){if(_0x37fab9){const _0x1613fc=DataManager['getSkillTypes'](_0x37fab9);if(_0x1613fc['includes'](_0x573c8a)){if(_0x23fc43('0x3b')===_0x23fc43('0x8b')){function _0x2c46a2(){const _0x256afa=_0x23fc43;if(!_0x23a5b6[_0x256afa('0xbd')]())return;const _0x22615a=_0x2b2b29[_0x256afa('0xb2')][_0x256afa('0xb1')][_0x256afa('0x4e')];if(_0x22615a[_0x256afa('0x30')])_0x22615a[_0x256afa('0x30')][_0x256afa('0x1c')](this,_0x37dae5);_0x471f44[_0x256afa('0xb2')][_0x256afa('0x51')][_0x3f3415]&&_0x37e1e7['SkillCooldowns']['onCooldownUpdateJS'][_0x5efb9d]['call'](this,_0x1b0315);}}else this[_0x23fc43('0x23')]()[_0x23fc43('0xa5')](_0x37fab9['id'],_0x4c8566);}}}}else{function _0x52edb2(){const _0xdadb5c=_0x23fc43;_0x382422=this['applyCDWUmodifiers'](_0x138cd3,_0x116c3d,_0xdadb5c('0xce')),this[_0xdadb5c('0x59')](_0x57669f,_0x40bfc6['max'](_0x5ab1c5,this[_0xdadb5c('0xc0')](_0x74a6f6)));}}}const _0x3d5647=_0x10e893['match'](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x3d5647)for(const _0xc954da of _0x3d5647){if('YBzXG'!==_0x23fc43('0xd')){let _0x3e501b=0x0,_0x564492=0x0;if(_0xc954da[_0x23fc43('0x93')](/<TARGET STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x3e501b=Number(RegExp['$1']),_0x564492=Number(RegExp['$2']);else _0xc954da[_0x23fc43('0x93')](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x3e501b=DataManager[_0x23fc43('0x2e')](RegExp['$1']),_0x564492=Number(RegExp['$2']));for(const _0x348693 of _0x1f360f[_0x23fc43('0x27')]()){if(_0x348693){const _0x2daf29=DataManager[_0x23fc43('0xbb')](_0x348693);_0x2daf29[_0x23fc43('0xe1')](_0x3e501b)&&_0x1f360f['addWarmup'](_0x348693['id'],_0x564492);}}}else{function _0x2b5596(){const _0x47523c=_0x23fc43;if(!_0x1f7053['inBattle']())return;const _0x1fef65=_0x2de2ee[_0x47523c('0xb2')][_0x47523c('0xb1')]['Warmup'];if(_0x1fef65[_0x47523c('0xd5')])_0x1fef65[_0x47523c('0xd5')][_0x47523c('0x1c')](this,_0x5969c6);}}}},Game_Action[_0x19deae('0x9f')][_0x19deae('0xe9')]=function(_0x5926cc){const _0x3f34fa=_0x19deae,_0x15b824=this[_0x3f34fa('0x47')]()[_0x3f34fa('0xb9')];if(_0x15b824[_0x3f34fa('0x93')](/<USER GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0xf7424d=Number(RegExp['$1']);for(const _0x3beb69 of this[_0x3f34fa('0x23')]()['skills']()){if(_0x3beb69){if(_0x3f34fa('0x87')!==_0x3f34fa('0x87')){function _0x15dbf5(){var _0x5e5fdb=_0x2752d9(_0x2f4e33['$1'])/0x64;_0x3c0580*=_0x5e5fdb;}}else this[_0x3f34fa('0x23')]()[_0x3f34fa('0xa5')](_0x3beb69['id'],_0xf7424d);}}}if(_0x15b824[_0x3f34fa('0x93')](/<TARGET GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x4a3f46=Number(RegExp['$1']);for(const _0x2ed9d3 of _0x5926cc[_0x3f34fa('0x27')]()){if(_0x2ed9d3){if('tDYXs'!==_0x3f34fa('0x7a'))_0x5926cc[_0x3f34fa('0xa5')](_0x2ed9d3['id'],_0x4a3f46);else{function _0x164a03(){const _0x8706f8=_0x3f34fa;_0x5f4ee7[_0x8706f8('0xb2')][_0x8706f8('0xc1')][_0x8706f8('0x1c')](this),this[_0x8706f8('0x1b')]();}}}}}},VisuMZ['SkillCooldowns'][_0x19deae('0xc1')]=Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x3c')],Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x3c')]=function(){const _0xa3861f=_0x19deae;VisuMZ[_0xa3861f('0xb2')][_0xa3861f('0xc1')]['call'](this),this['initSkillCooldowns']();},Game_BattlerBase['prototype']['initSkillCooldowns']=function(){const _0x5eb29a=_0x19deae;this[_0x5eb29a('0x9b')](),this[_0x5eb29a('0xdb')]();},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x9b')]=function(){const _0x527d13=_0x19deae;this[_0x527d13('0xbe')]={};},Game_BattlerBase['prototype']['cooldown']=function(_0x1d24db){const _0x53d5c4=_0x19deae;if(this[_0x53d5c4('0xbe')]===undefined)this[_0x53d5c4('0x1b')]();if(this[_0x53d5c4('0xc5')]())return 0x0;return this[_0x53d5c4('0xbe')][_0x1d24db]||0x0;},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0xc5')]=function(_0x2f7a79){const _0x30e7fc=_0x19deae;if(!$gameParty['inBattle']())return!![];if(this[_0x30e7fc('0x83')]()===_0x2f7a79)return!![];if(this[_0x30e7fc('0x74')]()===_0x2f7a79)return!![];const _0x58f95d=$dataSkills[_0x2f7a79];if(_0x58f95d&&_0x58f95d[_0x30e7fc('0xb9')][_0x30e7fc('0x93')](/<BYPASS COOLDOWNS>/i))return!![];if(_0x58f95d&&_0x58f95d[_0x30e7fc('0xb3')][_0x30e7fc('0x4a')]()===_0x30e7fc('0x8c'))return!![];return![];},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x92')]=function(_0xa7b75a){const _0x24a6eb=_0x19deae;if(!$gameParty['inBattle']())return;const _0x385e18=VisuMZ[_0x24a6eb('0xb2')][_0x24a6eb('0xb1')][_0x24a6eb('0x4e')];if(_0x385e18[_0x24a6eb('0x30')])_0x385e18[_0x24a6eb('0x30')]['call'](this,_0xa7b75a);if(VisuMZ[_0x24a6eb('0xb2')][_0x24a6eb('0x51')][_0xa7b75a]){if(_0x24a6eb('0x21')!==_0x24a6eb('0x94'))VisuMZ[_0x24a6eb('0xb2')][_0x24a6eb('0x51')][_0xa7b75a][_0x24a6eb('0x1c')](this,_0xa7b75a);else{function _0x3cf08c(){const _0x1bd75d=_0x24a6eb,_0x5ac3bd=_0xee223e(_0x2574aa['$1']),_0x4bc879=_0xcd7e26[_0x1bd75d('0x34')](_0x5ac3bd);_0x33e214['SkillCooldowns'][_0x1bd75d('0xcd')][_0x439af2['id']]=new _0x1727a3(_0x4bc879);}}}},Game_BattlerBase[_0x19deae('0x9f')]['onCooldownReady']=function(_0x5716d2){const _0x5e5782=_0x19deae;if(!$gameParty[_0x5e5782('0xbd')]())return;const _0x18c2dc=VisuMZ['SkillCooldowns'][_0x5e5782('0xb1')][_0x5e5782('0x4e')];if(_0x18c2dc[_0x5e5782('0xd5')])_0x18c2dc[_0x5e5782('0xd5')][_0x5e5782('0x1c')](this,_0x5716d2);VisuMZ[_0x5e5782('0xb2')]['onCooldownReadyJS'][_0x5716d2]&&VisuMZ[_0x5e5782('0xb2')]['onCooldownReadyJS'][_0x5716d2]['call'](this,_0x5716d2);},Game_BattlerBase['prototype'][_0x19deae('0x59')]=function(_0x307048,_0x288f4c){const _0x3b063f=_0x19deae;if(this[_0x3b063f('0xbe')]===undefined)this[_0x3b063f('0x1b')]();if(this[_0x3b063f('0xc5')](_0x307048))return;_0x288f4c=Math[_0x3b063f('0x2c')](_0x288f4c),_0x288f4c=_0x288f4c['clamp'](0x0,VisuMZ[_0x3b063f('0xb2')][_0x3b063f('0xb1')]['Cooldown'][_0x3b063f('0xec')]);const _0x1763fb=this[_0x3b063f('0xc0')](_0x307048);;this[_0x3b063f('0xbe')][_0x307048]=_0x288f4c;if(this['_skillCooldowns'][_0x307048]<=0x0){if(_0x1763fb>0x0)this[_0x3b063f('0x86')](_0x307048);delete this['_skillCooldowns'][_0x307048];}},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x3e')]=function(_0x4635f1,_0x183e7d){const _0x48360e=_0x19deae;if(this[_0x48360e('0xbe')]===undefined)this[_0x48360e('0x1b')]();this[_0x48360e('0xbe')][_0x4635f1]=this[_0x48360e('0xbe')][_0x4635f1]||0x0,this[_0x48360e('0x59')](_0x4635f1,this[_0x48360e('0xbe')][_0x4635f1]+_0x183e7d);},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x99')]=function(_0xa6903d,_0x5ecd75){const _0x45e522=_0x19deae;_0x5ecd75=this[_0x45e522('0x6f')](_0xa6903d,_0x5ecd75,_0x45e522('0xce')),this['setCooldown'](_0xa6903d,Math[_0x45e522('0x64')](_0x5ecd75,this[_0x45e522('0xc0')](_0xa6903d)));},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x19')]=function(_0x52ee61,_0x41dd06){const _0x3d6b06=_0x19deae;for(const _0x1b4e47 of this[_0x3d6b06('0x27')]()){if('MQDnv'==='vStVe'){function _0x385074(){_0xe9e338['clearWarmups']();}}else{if(_0x1b4e47){const _0x25a822=DataManager[_0x3d6b06('0xbb')](_0x1b4e47);if(_0x25a822[_0x3d6b06('0xe1')](_0x52ee61)){if(_0x3d6b06('0xcc')!==_0x3d6b06('0xcc')){function _0x4c5645(){const _0x372def=_0x3d6b06;return _0x112fe8[_0x372def('0xc7')]&&_0x355596[_0x372def('0x26')][_0x372def('0xe1')]('['+_0x5184dd+']');}}else this['applyCooldown'](_0x1b4e47['id'],_0x41dd06);}}}}},Game_BattlerBase[_0x19deae('0x9f')]['applyGlobalCooldowns']=function(_0x4db9e0){const _0x9531fb=_0x19deae;for(const _0x757a7d of this[_0x9531fb('0x27')]()){if(_0x757a7d){if(_0x9531fb('0xb5')!==_0x9531fb('0xb5')){function _0x2a9d50(){const _0xc6b8f0=_0x9531fb;if(this['attackSkillId']()===_0x586974)return!![];if(this['guardSkillId']()===_0x391387)return!![];const _0x49c992=_0x2d9db7[_0x37ba38];if(_0x49c992&&_0x49c992[_0xc6b8f0('0xb9')][_0xc6b8f0('0x93')](/<BYPASS WARMUPS>/i))return!![];if(_0x49c992&&_0x49c992[_0xc6b8f0('0xb3')][_0xc6b8f0('0x4a')]()===_0xc6b8f0('0x8c'))return!![];return![];}}else this[_0x9531fb('0x99')](_0x757a7d['id'],_0x4db9e0);}}},Game_BattlerBase['prototype'][_0x19deae('0x9d')]=function(_0xc8dbaf){const _0x5d5d53=_0x19deae;_0xc8dbaf=_0xc8dbaf||0x1;for(const _0x1a663c in this['_skillCooldowns']){const _0x1b1ae5=this[_0x5d5d53('0xbe')][_0x1a663c]||0x0;this[_0x5d5d53('0xbe')][_0x1a663c]-=_0xc8dbaf,this[_0x5d5d53('0x92')](_0x1a663c);if(this[_0x5d5d53('0xbe')][_0x1a663c]<=0x0){if(_0x5d5d53('0xa')==='unrny'){function _0x1d2de7(){const _0x5e69f9=_0x5d5d53;this[_0x5e69f9('0x99')](_0x513437['id'],_0x444595);}}else{if(_0x1b1ae5>0x0)this[_0x5d5d53('0x86')](_0x1a663c);delete this[_0x5d5d53('0xbe')][_0x1a663c];}}}},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0xdb')]=function(){const _0x53ab99=_0x19deae;this[_0x53ab99('0x11')]={};},Game_BattlerBase['prototype'][_0x19deae('0x65')]=function(_0x134325){const _0x4a5ac5=_0x19deae;return this[_0x4a5ac5('0x7')](_0x134325)+this[_0x4a5ac5('0xc0')](_0x134325);},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x7')]=function(_0x92dce5){const _0x2d2685=_0x19deae;if(this[_0x2d2685('0x11')]===undefined)this[_0x2d2685('0x1b')]();if(this[_0x2d2685('0xb')]())return 0x0;return this[_0x2d2685('0x11')][_0x92dce5]||0x0;},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0xb')]=function(_0x428873){const _0x331c0e=_0x19deae;if(this[_0x331c0e('0x83')]()===_0x428873)return!![];if(this[_0x331c0e('0x74')]()===_0x428873)return!![];const _0x344237=$dataSkills[_0x428873];if(_0x344237&&_0x344237[_0x331c0e('0xb9')][_0x331c0e('0x93')](/<BYPASS WARMUPS>/i))return!![];if(_0x344237&&_0x344237[_0x331c0e('0xb3')][_0x331c0e('0x4a')]()===_0x331c0e('0x8c'))return!![];return![];},Game_BattlerBase['prototype'][_0x19deae('0x1e')]=function(_0x321842){const _0x2aa0e2=_0x19deae;if(!$gameParty[_0x2aa0e2('0xbd')]())return;const _0x2c544c=VisuMZ[_0x2aa0e2('0xb2')][_0x2aa0e2('0xb1')][_0x2aa0e2('0x62')];if(_0x2c544c[_0x2aa0e2('0x30')])_0x2c544c[_0x2aa0e2('0x30')][_0x2aa0e2('0x1c')](this,_0x321842);if(VisuMZ[_0x2aa0e2('0xb2')][_0x2aa0e2('0x89')][_0x321842]){if(_0x2aa0e2('0xe0')!==_0x2aa0e2('0xe0')){function _0x287705(){const _0x155bba=_0x2aa0e2;_0x529232+=_0x155bba('0x8d')[_0x155bba('0x34')](_0x2ab254(_0x55a7bf['$1']));}}else VisuMZ[_0x2aa0e2('0xb2')][_0x2aa0e2('0x89')][_0x321842][_0x2aa0e2('0x1c')](this,_0x321842);}},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0xa0')]=function(_0x5c4af0){const _0x56beb6=_0x19deae;if(!$gameParty['inBattle']())return;const _0x500359=VisuMZ['SkillCooldowns'][_0x56beb6('0xb1')][_0x56beb6('0x62')];if(_0x500359[_0x56beb6('0xd5')])_0x500359[_0x56beb6('0xd5')][_0x56beb6('0x1c')](this,_0x5c4af0);},Game_BattlerBase[_0x19deae('0x9f')]['setWarmup']=function(_0x6ad077,_0x27ea60){const _0x249e58=_0x19deae;if(this[_0x249e58('0x11')]===undefined)this['initSkillCooldowns']();if(this['isBypassWarmups'](_0x6ad077))return;_0x27ea60=Math[_0x249e58('0x2c')](_0x27ea60),_0x27ea60=_0x27ea60[_0x249e58('0x44')](0x0,VisuMZ['SkillCooldowns'][_0x249e58('0xb1')][_0x249e58('0x62')][_0x249e58('0xec')]);const _0x24dc5e=this[_0x249e58('0x7')](_0x6ad077);;this['_skillWarmups'][_0x6ad077]=_0x27ea60;if(this[_0x249e58('0x11')][_0x6ad077]<=0x0){if(_0x24dc5e>0x0)this['onWarmupReady'](_0x6ad077);delete this[_0x249e58('0x11')][_0x6ad077];}},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0xa5')]=function(_0xae967a,_0x3a44bf){const _0x21341e=_0x19deae;if(this[_0x21341e('0x11')]===undefined)this[_0x21341e('0x1b')]();this[_0x21341e('0x11')][_0xae967a]=this[_0x21341e('0x11')][_0xae967a]||0x0;if(this[_0x21341e('0x65')](_0xae967a)<=0x0)return;this['setWarmup'](_0xae967a,this[_0x21341e('0x11')][_0xae967a]+_0x3a44bf);},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x75')]=function(_0x508e6a,_0x2ccd36){const _0x2ba3e1=_0x19deae;_0x2ccd36=this[_0x2ba3e1('0x6f')](_0x508e6a,_0x2ccd36,'WARMUP'),this['setWarmup'](_0x508e6a,Math['max'](_0x2ccd36,this[_0x2ba3e1('0x65')](_0x508e6a)));},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x58')]=function(_0x34185f){const _0x5714ae=_0x19deae;_0x34185f=_0x34185f||0x1;for(const _0x59976f in this[_0x5714ae('0x11')]){const _0x2481c=this['_skillWarmups'][_0x59976f]||0x0;this['_skillWarmups'][_0x59976f]-=_0x34185f;if(this[_0x5714ae('0x11')][_0x59976f]<=0x0){if(_0x2481c>0x0)this[_0x5714ae('0xa0')](_0x59976f);delete this[_0x5714ae('0x11')][_0x59976f];}}},VisuMZ[_0x19deae('0xb2')][_0x19deae('0xa4')]=Game_BattlerBase['prototype']['meetsSkillConditions'],Game_BattlerBase['prototype']['meetsSkillConditions']=function(_0x42b368){const _0x36a86f=_0x19deae;if(!VisuMZ['SkillCooldowns'][_0x36a86f('0xa4')]['call'](this,_0x42b368))return![];if(!this['areSkillWarmupsReady'](_0x42b368))return![];if(!this['areSkillCooldownsReady'](_0x42b368))return![];return!![];},Game_BattlerBase['prototype'][_0x19deae('0x24')]=function(_0x388b12){const _0x39597c=_0x19deae;return this[_0x39597c('0x7')](_0x388b12['id'])<=0x0;},Game_BattlerBase[_0x19deae('0x9f')]['areSkillCooldownsReady']=function(_0x2c8a06){const _0x4588d4=_0x19deae;return this[_0x4588d4('0xc0')](_0x2c8a06['id'])<=0x0;},VisuMZ[_0x19deae('0xb2')][_0x19deae('0x3f')]=Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x5d')],Game_BattlerBase[_0x19deae('0x9f')]['paySkillCost']=function(_0x899fda){const _0x17e9d7=_0x19deae;VisuMZ[_0x17e9d7('0xb2')][_0x17e9d7('0x3f')][_0x17e9d7('0x1c')](this,_0x899fda),this[_0x17e9d7('0xeb')](_0x899fda);},Game_BattlerBase[_0x19deae('0x9f')]['paySkillCooldown']=function(_0x229bc8){const _0xaea8c6=_0x19deae;if(!$gameParty[_0xaea8c6('0xbd')]())return;const _0x46d90d=_0x229bc8[_0xaea8c6('0xb9')];_0x46d90d['match'](/<COOLDOWN:[ ](\d+)>/i)&&this[_0xaea8c6('0x99')](_0x229bc8['id'],Number(RegExp['$1']));VisuMZ['SkillCooldowns'][_0xaea8c6('0x20')][_0x229bc8['id']]&&VisuMZ['SkillCooldowns']['cooldownJS'][_0x229bc8['id']][_0xaea8c6('0x1c')](this,_0x229bc8);const _0x15086e=_0x46d90d[_0xaea8c6('0x93')](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x15086e){if(_0xaea8c6('0x35')===_0xaea8c6('0x35'))for(const _0x503b31 of _0x15086e){let _0x2c42ad=0x0,_0x50fc96=0x0;if(_0x503b31[_0xaea8c6('0x93')](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x2c42ad=Number(RegExp['$1']),_0x50fc96=Number(RegExp['$2']);else{if(_0x503b31[_0xaea8c6('0x93')](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)){if('jjUDy'!==_0xaea8c6('0x1a'))_0x2c42ad=DataManager['getSkillIdWithName'](RegExp['$1']),_0x50fc96=Number(RegExp['$2']);else{function _0x58da05(){const _0x43b0c1=_0xaea8c6;this[_0x43b0c1('0x99')](_0x43c402['id'],_0x3bf75e(_0x1c45dd['$1']));}}}}const _0x2311bc=$dataSkills[_0x2c42ad];_0x2311bc&&this[_0xaea8c6('0x99')](_0x2311bc['id'],_0x50fc96);}else{function _0x971bdf(){const _0x967328=_0xaea8c6;if(_0xca0660>0x0)this[_0x967328('0xa0')](_0x31f2c5);delete this[_0x967328('0x11')][_0x1e10b9];}}}const _0x189d57=_0x46d90d[_0xaea8c6('0x93')](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x189d57){if('USXPv'===_0xaea8c6('0xa8')){function _0x3ac796(){const _0x589229=_0xaea8c6;let _0x3a30d8=0x0,_0x26f640=0x0;if(_0x5efcf2[_0x589229('0x93')](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x3a30d8=_0x58990d(_0x28fc27['$1']),_0x26f640=_0x2ceca3(_0x194597['$2']);else _0x145476[_0x589229('0x93')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x3a30d8=_0x50b2ee[_0x589229('0x2e')](_0x473bff['$1']),_0x26f640=_0x541b41(_0x280a3a['$2']));this[_0x589229('0x23')]()[_0x589229('0x3e')](_0x3a30d8,_0x26f640);}}else for(const _0x2c922b of _0x189d57){if('sIsSo'!==_0xaea8c6('0x79')){let _0xfb3e6e=0x0,_0x2c1dcd=0x0;if(_0x2c922b[_0xaea8c6('0x93')](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0xfb3e6e=Number(RegExp['$1']),_0x2c1dcd=Number(RegExp['$2']);else _0x2c922b[_0xaea8c6('0x93')](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0xfb3e6e=DataManager['getStypeIdWithName'](RegExp['$1']),_0x2c1dcd=Number(RegExp['$2']));this[_0xaea8c6('0x19')](_0xfb3e6e,_0x2c1dcd);}else{function _0x42e33d(){const _0x5dd65d=_0xaea8c6;this[_0x5dd65d('0x75')](_0x3731db,_0x1cc5fc(_0x1b8892['$1']));}}}}if(_0x46d90d[_0xaea8c6('0x93')](/<GLOBAL COOLDOWN:[ ](\d+)>/i)){if(_0xaea8c6('0x7c')==='PDDMI'){const _0x361ca6=Number(RegExp['$1']);this[_0xaea8c6('0xe6')](_0x361ca6);}else{function _0xa2bfda(){var _0x37ae45=_0xaacbde(_0x509116['$1']);_0x1fc527*=_0x37ae45;}}}},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x6f')]=function(_0x3dd5a0,_0x42f79f,_0x482f88){const _0x1f3312=_0x19deae,_0x587414=$dataSkills[_0x3dd5a0];if(!_0x587414)return _0x42f79f;const _0x4b297d=this[_0x1f3312('0x81')](_0x587414,_0x482f88,_0x1f3312('0x54')),_0x1eb080=this[_0x1f3312('0x4')](_0x587414,_0x482f88,_0x1f3312('0x22')),_0x11c914=this[_0x1f3312('0x81')](_0x587414,_0x482f88,_0x1f3312('0xdc'));return Math[_0x1f3312('0x2c')]((_0x42f79f+_0x4b297d)*_0x1eb080+_0x11c914);},VisuMZ[_0x19deae('0xb2')][_0x19deae('0xab')]={},Game_BattlerBase[_0x19deae('0x9f')][_0x19deae('0x81')]=function(_0x105a9d,_0x4fdbb0,_0x24fbf8){const _0x52ad06=_0x19deae,_0x12a1c6=_0x105a9d['id'],_0x45d4f8=_0x105a9d[_0x52ad06('0xb3')][_0x52ad06('0xdd')](),_0x31ee83=VisuMZ['SkillCooldowns'][_0x52ad06('0xab')],_0x2dfda9=_0x52ad06('0x55')[_0x52ad06('0x34')](_0x12a1c6,_0x4fdbb0,_0x24fbf8);_0x31ee83[_0x2dfda9]=_0x31ee83[_0x2dfda9]||{};const _0x57d9d=_0x52ad06('0x61');_0x31ee83[_0x2dfda9][_0x52ad06('0xa3')]=_0x31ee83[_0x2dfda9]['notetag1']||new RegExp(_0x57d9d[_0x52ad06('0x34')](_0x12a1c6,_0x4fdbb0,_0x24fbf8),'i'),_0x31ee83[_0x2dfda9][_0x52ad06('0xc4')]=_0x31ee83[_0x2dfda9][_0x52ad06('0xc4')]||new RegExp(_0x57d9d[_0x52ad06('0x34')](_0x45d4f8,_0x4fdbb0,_0x24fbf8),'i');const _0x21d514=DataManager[_0x52ad06('0xbb')](_0x105a9d);for(const _0x213967 of _0x21d514){const _0x1388c0=_0x52ad06('0x6c')[_0x52ad06('0x34')](_0x213967,_0x4fdbb0,_0x24fbf8);let _0x30c048=$dataSystem[_0x52ad06('0xd9')][Number(_0x213967)][_0x52ad06('0x4a')]()[_0x52ad06('0xdd')]();_0x30c048=_0x30c048[_0x52ad06('0x82')](/\x1I\[(\d+)\]/gi,''),_0x30c048=_0x30c048[_0x52ad06('0x82')](/\\I\[(\d+)\]/gi,''),_0x31ee83[_0x1388c0]=_0x31ee83[_0x1388c0]||{};const _0x40d5a4=_0x52ad06('0xc9');_0x31ee83[_0x1388c0][_0x52ad06('0xa3')]=_0x31ee83[_0x1388c0][_0x52ad06('0xa3')]||new RegExp(_0x40d5a4[_0x52ad06('0x34')](_0x213967,_0x4fdbb0,_0x24fbf8),'i'),_0x31ee83[_0x1388c0][_0x52ad06('0xc4')]=_0x31ee83[_0x1388c0]['notetag2']||new RegExp(_0x40d5a4['format'](_0x30c048,_0x4fdbb0,_0x24fbf8),'i');}const _0x523c2c=_0x52ad06('0xc'),_0x5f3ed1='Global_%1_%2'[_0x52ad06('0x34')](_0x4fdbb0,_0x24fbf8);_0x31ee83[_0x5f3ed1]=_0x31ee83[_0x5f3ed1]||new RegExp(_0x523c2c[_0x52ad06('0x34')](_0x4fdbb0,_0x24fbf8),'i');const _0x5c4698=(_0x18f390,_0x3d7a0f)=>{const _0x47920c=_0x52ad06;if(!_0x3d7a0f)return _0x18f390;const _0x2fa2a6=_0x3d7a0f[_0x47920c('0xb9')];if(_0x2fa2a6[_0x47920c('0x93')](_0x31ee83[_0x2dfda9][_0x47920c('0xa3')])){if('aSccJ'===_0x47920c('0xa7')){var _0x21e968=Number(RegExp['$1']);_0x18f390+=_0x21e968;}else{function _0x491281(){_0x5cb0c8=_0x234077(_0x43320a['$1']),_0xaa2118=_0x381783(_0x27bd21['$2']);}}}if(_0x2fa2a6[_0x47920c('0x93')](_0x31ee83[_0x2dfda9]['notetag2'])){if(_0x47920c('0xa2')===_0x47920c('0xa2')){var _0x21e968=Number(RegExp['$1']);_0x18f390+=_0x21e968;}else{function _0x5bfeca(){const _0x4999df=_0x47920c;_0x21b241(_0x4999df('0xc6')[_0x4999df('0x34')](_0x467c55,_0x9227c3,_0x36cd8d)),_0x5d7135[_0x4999df('0xb4')]();}}}for(const _0x1e4022 of _0x21d514){const _0x56ea4c='Stype_%1_%2_%3'['format'](_0x1e4022,_0x4fdbb0,_0x24fbf8);if(_0x2fa2a6[_0x47920c('0x93')](_0x31ee83[_0x56ea4c][_0x47920c('0xa3')])){if(_0x47920c('0x48')!=='XyKny'){var _0x21e968=Number(RegExp['$1']);_0x18f390+=_0x21e968;}else{function _0x2f7816(){_0x3b8078=_0xedb067(_0x231975['$1']),_0x2b50ca=_0x39ab40(_0xcffe55['$2']);}}}if(_0x2fa2a6[_0x47920c('0x93')](_0x31ee83[_0x56ea4c][_0x47920c('0xc4')])){if(_0x47920c('0x8')!==_0x47920c('0x6a')){var _0x21e968=Number(RegExp['$1']);_0x18f390+=_0x21e968;}else{function _0x84ed22(){const _0xa98fca=_0x47920c;_0x211e15[_0xa98fca('0xb2')][_0xa98fca('0x76')][_0x3b496e['id']][_0xa98fca('0x1c')](this,_0x405459);}}}}if(_0x2fa2a6[_0x47920c('0x93')](_0x31ee83[_0x5f3ed1])){var _0x21e968=Number(RegExp['$1']);_0x18f390+=_0x21e968;}return _0x18f390;};return this[_0x52ad06('0x72')]()[_0x52ad06('0x73')](_0x5c4698,0x0);},Game_BattlerBase[_0x19deae('0x9f')]['applyCDWUnotetagsRate']=function(_0x401abd,_0x24ad75,_0x4264f4){const _0x214a53=_0x19deae,_0xe76e2d=_0x401abd['id'],_0x366335=_0x401abd[_0x214a53('0xb3')][_0x214a53('0xdd')](),_0x8eb287=VisuMZ[_0x214a53('0xb2')][_0x214a53('0xab')],_0xea7cbb='(\x5cd+)([%％])',_0x529d03=_0x214a53('0x9c'),_0x100506=_0x214a53('0x55')['format'](_0xe76e2d,_0x24ad75,_0x4264f4);_0x8eb287[_0x100506]=_0x8eb287[_0x100506]||{};const _0x5d6c6c=_0x214a53('0xc2');_0x8eb287[_0x100506][_0x214a53('0xa3')]=_0x8eb287[_0x100506][_0x214a53('0xa3')]||new RegExp(_0x5d6c6c[_0x214a53('0x34')](_0xe76e2d,_0x24ad75,_0x4264f4,_0xea7cbb),'i'),_0x8eb287[_0x100506][_0x214a53('0xc4')]=_0x8eb287[_0x100506][_0x214a53('0xc4')]||new RegExp(_0x5d6c6c['format'](_0x366335,_0x24ad75,_0x4264f4,_0xea7cbb),'i'),_0x8eb287[_0x100506][_0x214a53('0x9e')]=_0x8eb287[_0x100506][_0x214a53('0x9e')]||new RegExp(_0x5d6c6c[_0x214a53('0x34')](_0xe76e2d,_0x24ad75,_0x4264f4,_0x529d03),'i'),_0x8eb287[_0x100506][_0x214a53('0xe8')]=_0x8eb287[_0x100506]['notetag4']||new RegExp(_0x5d6c6c[_0x214a53('0x34')](_0x366335,_0x24ad75,_0x4264f4,_0x529d03),'i');const _0x1515a6=DataManager['getSkillTypes'](_0x401abd);for(const _0x2a4ac8 of _0x1515a6){const _0x217113='Stype_%1_%2_%3'[_0x214a53('0x34')](_0x2a4ac8,_0x24ad75,_0x4264f4);let _0x4038a2=$dataSystem[_0x214a53('0xd9')][Number(_0x2a4ac8)][_0x214a53('0x4a')]()['trim']();_0x4038a2=_0x4038a2[_0x214a53('0x82')](/\x1I\[(\d+)\]/gi,''),_0x4038a2=_0x4038a2[_0x214a53('0x82')](/\\I\[(\d+)\]/gi,''),_0x8eb287[_0x217113]=_0x8eb287[_0x217113]||{};const _0x8b922f=_0x214a53('0x96');_0x8eb287[_0x217113][_0x214a53('0xa3')]=_0x8eb287[_0x217113]['notetag1']||new RegExp(_0x8b922f['format'](_0x2a4ac8,_0x24ad75,_0x4264f4,_0xea7cbb),'i'),_0x8eb287[_0x217113][_0x214a53('0xc4')]=_0x8eb287[_0x217113][_0x214a53('0xc4')]||new RegExp(_0x8b922f[_0x214a53('0x34')](_0x4038a2,_0x24ad75,_0x4264f4,_0xea7cbb),'i'),_0x8eb287[_0x217113][_0x214a53('0x9e')]=_0x8eb287[_0x217113]['notetag3']||new RegExp(_0x8b922f['format'](_0x2a4ac8,_0x24ad75,_0x4264f4,_0x529d03),'i'),_0x8eb287[_0x217113]['notetag4']=_0x8eb287[_0x217113][_0x214a53('0xe8')]||new RegExp(_0x8b922f[_0x214a53('0x34')](_0x4038a2,_0x24ad75,_0x4264f4,_0x529d03),'i');}const _0x25d401=_0x214a53('0x14'),_0xaa4e83=_0x214a53('0x3d')[_0x214a53('0x34')](_0x24ad75,_0x4264f4);_0x8eb287[_0xaa4e83]=_0x8eb287[_0xaa4e83]||{},_0x8eb287[_0xaa4e83][_0x214a53('0xa3')]=_0x8eb287[_0xaa4e83][_0x214a53('0xa3')]||new RegExp(_0x25d401[_0x214a53('0x34')](_0x24ad75,_0x4264f4,_0xea7cbb),'i'),_0x8eb287[_0xaa4e83][_0x214a53('0xc4')]=_0x8eb287[_0xaa4e83]['notetag2']||new RegExp(_0x25d401[_0x214a53('0x34')](_0x24ad75,_0x4264f4,_0x529d03),'i');const _0x3570c3=(_0x3de6ad,_0x40c44d)=>{const _0x31f20b=_0x214a53;if(!_0x40c44d)return _0x3de6ad;const _0x2d2ede=_0x40c44d[_0x31f20b('0xb9')];if(_0x2d2ede[_0x31f20b('0x93')](_0x8eb287[_0x100506][_0x31f20b('0xa3')])){if(_0x31f20b('0xf3')==='HKWJX'){function _0xbe4456(){const _0x327977=_0x31f20b;_0x15a123=_0xdecaad[_0x327977('0x2e')](_0xae33cf['$1']),_0x57ce0f=_0x480f1e(_0x4a9972['$2']);}}else{var _0x5b6c46=Number(RegExp['$1'])/0x64;_0x3de6ad*=_0x5b6c46;}}if(_0x2d2ede[_0x31f20b('0x93')](_0x8eb287[_0x100506][_0x31f20b('0xc4')])){var _0x5b6c46=Number(RegExp['$1'])/0x64;_0x3de6ad*=_0x5b6c46;}if(_0x2d2ede['match'](_0x8eb287[_0x100506]['notetag3'])){var _0x5b6c46=Number(RegExp['$1']);_0x3de6ad*=_0x5b6c46;}if(_0x2d2ede[_0x31f20b('0x93')](_0x8eb287[_0x100506][_0x31f20b('0xe8')])){if(_0x31f20b('0x45')===_0x31f20b('0x78')){function _0x3679b2(){const _0x278009=_0x31f20b,_0x51c774=_0x51a57d(_0x3da64e['$1']);for(const _0x5533be of _0x1cb52e['skills']()){_0x5533be&&_0x237e99[_0x278009('0xa5')](_0x5533be['id'],_0x51c774);}}}else{var _0x5b6c46=Number(RegExp['$1']);_0x3de6ad*=_0x5b6c46;}}for(const _0xc40ca7 of _0x1515a6){if(_0x31f20b('0x50')===_0x31f20b('0x50')){const _0x529caa=_0x31f20b('0x6c')[_0x31f20b('0x34')](_0xc40ca7,_0x24ad75,_0x4264f4);if(_0x2d2ede[_0x31f20b('0x93')](_0x8eb287[_0x529caa]['notetag1'])){var _0x5b6c46=Number(RegExp['$1'])/0x64;_0x3de6ad*=_0x5b6c46;}if(_0x2d2ede[_0x31f20b('0x93')](_0x8eb287[_0x529caa][_0x31f20b('0xc4')])){if('pMtYK'!=='pMtYK'){function _0x1b446f(){const _0x376874=_0x31f20b,_0x18f8c2=this['_skillWarmups'][_0x1f6f44]||0x0;this[_0x376874('0x11')][_0x445ea4]-=_0x3c6e4a;if(this['_skillWarmups'][_0x19aee6]<=0x0){if(_0x18f8c2>0x0)this['onWarmupReady'](_0x1782e0);delete this[_0x376874('0x11')][_0xa1641f];}}}else{var _0x5b6c46=Number(RegExp['$1'])/0x64;_0x3de6ad*=_0x5b6c46;}}if(_0x2d2ede['match'](_0x8eb287[_0x529caa][_0x31f20b('0x9e')])){var _0x5b6c46=Number(RegExp['$1']);_0x3de6ad*=_0x5b6c46;}if(_0x2d2ede[_0x31f20b('0x93')](_0x8eb287[_0x529caa][_0x31f20b('0xe8')])){var _0x5b6c46=Number(RegExp['$1']);_0x3de6ad*=_0x5b6c46;}}else{function _0x3dc734(){const _0x20699a=_0x31f20b,_0x551898=_0x1a6f12[_0x20699a('0xb2')][_0x20699a('0xb1')][_0x20699a('0x62')];let _0x5d4a66='';_0x5d4a66+=_0x20699a('0x53')[_0x20699a('0x34')](_0x551898['FontSize']);const _0x230e05=_0x551898[_0x20699a('0x43')];_0x230e05[_0x20699a('0x93')](/#(.*)/i)&&_0x4c2030[_0x20699a('0x2b')]?_0x5d4a66+=_0x20699a('0x8d')['format'](_0x511824(_0x142523['$1'])):_0x5d4a66+=_0x20699a('0x4f')[_0x20699a('0x34')](_0x230e05);const _0x146087=_0x14dc6b[_0x20699a('0x65')](_0x1031c3['id']),_0x57f5c3=_0x551898[_0x20699a('0x7f')]>0x0?_0x20699a('0x16')[_0x20699a('0x34')](_0x551898[_0x20699a('0x7f')]):'';_0x5d4a66+=_0x551898[_0x20699a('0x29')][_0x20699a('0x34')](_0x146087,_0x57f5c3);const _0x1937eb=this['textSizeEx'](_0x5d4a66,_0x5928b8,_0xf812bd,_0x4d653e),_0x7d2784=_0x10694a+_0x2cd9e4-_0x1937eb['width'];this[_0x20699a('0xd7')](_0x5d4a66,_0x7d2784,_0x32fb16,_0x5b6301),this[_0x20699a('0x97')]();}}}if(_0x2d2ede[_0x31f20b('0x93')](_0x8eb287[_0xaa4e83][_0x31f20b('0xa3')])){if(_0x31f20b('0x7e')==='QVLCN'){var _0x5b6c46=Number(RegExp['$1'])/0x64;_0x3de6ad*=_0x5b6c46;}else{function _0x29f040(){var _0x2e58c3=_0x4ee5e8(_0x51d1bf['$1']);_0x5a7c3+=_0x2e58c3;}}}if(_0x2d2ede[_0x31f20b('0x93')](_0x8eb287[_0xaa4e83]['notetag2'])){var _0x5b6c46=Number(RegExp['$1']);_0x3de6ad*=_0x5b6c46;}return _0x3de6ad;};return this[_0x214a53('0x72')]()['reduce'](_0x3570c3,0x1);},VisuMZ['SkillCooldowns'][_0x19deae('0xaf')]=Game_Battler[_0x19deae('0x9f')][_0x19deae('0xdf')],Game_Battler[_0x19deae('0x9f')]['onBattleStart']=function(_0x495152){const _0x354dc3=_0x19deae;VisuMZ['SkillCooldowns'][_0x354dc3('0xaf')][_0x354dc3('0x1c')](this,_0x495152),this[_0x354dc3('0x9b')](),this[_0x354dc3('0xdb')](),this[_0x354dc3('0x3a')](_0x495152);},Game_Battler[_0x19deae('0x9f')]['prepareSkillWarmups']=function(_0x11c251){const _0x7da7ba=_0x19deae;for(const _0x5eeac7 of this[_0x7da7ba('0x27')]()){if(!_0x5eeac7)continue;const _0x59310f=_0x5eeac7['id'],_0x5bb040=_0x5eeac7['note'];if(_0x5bb040[_0x7da7ba('0x93')](/<WARMUP:[ ](\d+)>/i)){if('EGwDZ'!==_0x7da7ba('0x6')){function _0xe30c85(){_0x5e76d5=_0x2ef603(_0x12d0d8['$1']),_0x2fca3b=_0x8e7c9d(_0x9d9818['$2']);}}else this[_0x7da7ba('0x75')](_0x59310f,Number(RegExp['$1']));}if(VisuMZ['SkillCooldowns'][_0x7da7ba('0x76')][_0x5eeac7['id']]){if(_0x7da7ba('0x1f')!==_0x7da7ba('0x9'))VisuMZ[_0x7da7ba('0xb2')][_0x7da7ba('0x76')][_0x5eeac7['id']][_0x7da7ba('0x1c')](this,_0x5eeac7);else{function _0x828571(){const _0x2bf977=_0x7da7ba;this[_0x2bf977('0x23')]()[_0x2bf977('0x3e')](_0x1e89fa['id'],_0x54a929);}}}}if(_0x11c251){if(_0x7da7ba('0x88')!==_0x7da7ba('0x88')){function _0x44778a(){const _0x1377fa=_0x7da7ba;for(const _0x359830 of this[_0x1377fa('0x27')]()){if(_0x359830){const _0x3752a7=_0xdb73a3[_0x1377fa('0xbb')](_0x359830);_0x3752a7[_0x1377fa('0xe1')](_0x3f8dc9)&&this[_0x1377fa('0x99')](_0x359830['id'],_0x3de998);}}}}else{const _0x1ecd95=VisuMZ[_0x7da7ba('0xb2')]['Settings'][_0x7da7ba('0x62')][_0x7da7ba('0xed')]||0x0;this[_0x7da7ba('0x58')](_0x1ecd95);}}},Game_Battler[_0x19deae('0x9f')][_0x19deae('0x5c')]=function(){const _0x3f43d4=_0x19deae;if(this[_0x3f43d4('0x8a')])return;if(this['_instantCast'])return;this[_0x3f43d4('0x8a')]=!![],this['updateCooldowns'](),this[_0x3f43d4('0x58')]();},VisuMZ[_0x19deae('0xb2')][_0x19deae('0xf2')]=Game_Battler[_0x19deae('0x9f')][_0x19deae('0x1')],Game_Battler[_0x19deae('0x9f')][_0x19deae('0x1')]=function(){const _0x304544=_0x19deae;this[_0x304544('0x8a')]=![],VisuMZ[_0x304544('0xb2')][_0x304544('0xf2')][_0x304544('0x1c')](this);},VisuMZ['SkillCooldowns'][_0x19deae('0x32')]=Game_Battler[_0x19deae('0x9f')][_0x19deae('0xac')],Game_Battler[_0x19deae('0x9f')]['onBattleEnd']=function(){const _0x2cf3ff=_0x19deae;VisuMZ[_0x2cf3ff('0xb2')]['Game_Battler_onBattleEnd'][_0x2cf3ff('0x1c')](this),this[_0x2cf3ff('0x9b')](),this[_0x2cf3ff('0xdb')]();},VisuMZ['SkillCooldowns'][_0x19deae('0xbf')]=Window_Base['prototype'][_0x19deae('0xe')],Window_Base[_0x19deae('0x9f')]['drawSkillCost']=function(_0x1687f3,_0xa98fc9,_0x24a3d9,_0x4a33ff,_0x2fac6e){const _0xa7ce9c=_0x19deae,_0x52d347=VisuMZ[_0xa7ce9c('0xb2')][_0xa7ce9c('0xb1')];if(_0x52d347[_0xa7ce9c('0x62')][_0xa7ce9c('0x52')]&&_0x1687f3[_0xa7ce9c('0x7')](_0xa98fc9['id'])>0x0)this[_0xa7ce9c('0xb6')](_0x1687f3,_0xa98fc9,_0x24a3d9,_0x4a33ff,_0x2fac6e);else{if(_0x52d347['Cooldown'][_0xa7ce9c('0x52')]&&_0x1687f3[_0xa7ce9c('0xc0')](_0xa98fc9['id'])>0x0){if(_0xa7ce9c('0x70')!==_0xa7ce9c('0x70')){function _0x1b8d0c(){const _0x1327ae=_0xa7ce9c,_0x1e97b1=_0x598799(_0x5d8e92['$1']);for(const _0x41f91b of _0x38d56c[_0x1327ae('0x27')]()){_0x41f91b&&_0xf14379[_0x1327ae('0x3e')](_0x41f91b['id'],_0x1e97b1);}}}else this[_0xa7ce9c('0x63')](_0x1687f3,_0xa98fc9,_0x24a3d9,_0x4a33ff,_0x2fac6e);}else VisuMZ[_0xa7ce9c('0xb2')]['Window_Base_drawSkillCost'][_0xa7ce9c('0x1c')](this,_0x1687f3,_0xa98fc9,_0x24a3d9,_0x4a33ff,_0x2fac6e);}},Window_Base[_0x19deae('0x9f')]['drawSkillWarmup']=function(_0x43a9e6,_0x168bbd,_0x3e3ae6,_0x41b3d2,_0x4cb2f0){const _0x26d06f=_0x19deae,_0x226754=VisuMZ['SkillCooldowns']['Settings']['Warmup'];let _0x2da613='';_0x2da613+=_0x26d06f('0x53')[_0x26d06f('0x34')](_0x226754[_0x26d06f('0x18')]);const _0x8fe33=_0x226754['FontColor'];if(_0x8fe33[_0x26d06f('0x93')](/#(.*)/i)&&Imported[_0x26d06f('0x2b')]){if('iPXGH'===_0x26d06f('0x8e'))_0x2da613+=_0x26d06f('0x8d')['format'](String(RegExp['$1']));else{function _0x5ef330(){this['subject']()['clearWarmups']();}}}else{if(_0x26d06f('0x98')===_0x26d06f('0x2a')){function _0x34c39b(){const _0x49807d=_0x26d06f;if(this['_skillCooldowns']===_0x16a16f)this[_0x49807d('0x1b')]();if(this[_0x49807d('0xc5')]())return 0x0;return this['_skillCooldowns'][_0x1372f6]||0x0;}}else _0x2da613+=_0x26d06f('0x4f')['format'](_0x8fe33);}const _0x2ae9cd=_0x43a9e6[_0x26d06f('0x65')](_0x168bbd['id']),_0x154195=_0x226754[_0x26d06f('0x7f')]>0x0?_0x26d06f('0x16')[_0x26d06f('0x34')](_0x226754[_0x26d06f('0x7f')]):'';_0x2da613+=_0x226754[_0x26d06f('0x29')][_0x26d06f('0x34')](_0x2ae9cd,_0x154195);const _0x1a08ca=this[_0x26d06f('0x38')](_0x2da613,_0x3e3ae6,_0x41b3d2,_0x4cb2f0),_0x5eec86=_0x3e3ae6+_0x4cb2f0-_0x1a08ca['width'];this[_0x26d06f('0xd7')](_0x2da613,_0x5eec86,_0x41b3d2,_0x4cb2f0),this['resetFontSettings']();},Window_Base['prototype'][_0x19deae('0x63')]=function(_0x3232fc,_0x10c659,_0x2325c9,_0x1f765c,_0x346671){const _0x1a09b9=_0x19deae,_0x52a99a=VisuMZ[_0x1a09b9('0xb2')][_0x1a09b9('0xb1')][_0x1a09b9('0x4e')];let _0x1469cd='';_0x1469cd+=_0x1a09b9('0x53')[_0x1a09b9('0x34')](_0x52a99a[_0x1a09b9('0x18')]);const _0x41ebeb=_0x52a99a[_0x1a09b9('0x43')];if(_0x41ebeb[_0x1a09b9('0x93')](/#(.*)/i)&&Imported[_0x1a09b9('0x2b')])_0x1469cd+=_0x1a09b9('0x8d')[_0x1a09b9('0x34')](String(RegExp['$1']));else{if(_0x1a09b9('0x2f')!==_0x1a09b9('0x2'))_0x1469cd+=_0x1a09b9('0x4f')[_0x1a09b9('0x34')](_0x41ebeb);else{function _0x512983(){const _0x18caec=_0x1a09b9,_0x3c3ebb=_0x41ae15[_0x2f07d1];if(!_0x3c3ebb)return _0x3de248;const _0x37113d=this[_0x18caec('0x81')](_0x3c3ebb,_0x13ad99,'PLUS'),_0x472fc9=this[_0x18caec('0x4')](_0x3c3ebb,_0x882a3c,'RATE'),_0x47fd25=this['applyCDWUnotetagsFlat'](_0x3c3ebb,_0x3de9d5,_0x18caec('0xdc'));return _0x2d63bc[_0x18caec('0x2c')]((_0x9d608c+_0x37113d)*_0x472fc9+_0x47fd25);}}}const _0x233860=_0x3232fc[_0x1a09b9('0xc0')](_0x10c659['id']),_0x3b72de=_0x52a99a[_0x1a09b9('0x7f')]>0x0?_0x1a09b9('0x16')[_0x1a09b9('0x34')](_0x52a99a[_0x1a09b9('0x7f')]):'';_0x1469cd+=_0x52a99a[_0x1a09b9('0x29')][_0x1a09b9('0x34')](_0x233860,_0x3b72de);const _0x5e993f=this[_0x1a09b9('0x38')](_0x1469cd,_0x2325c9,_0x1f765c,_0x346671),_0xb2f0ce=_0x2325c9+_0x346671-_0x5e993f['width'];this[_0x1a09b9('0xd7')](_0x1469cd,_0xb2f0ce,_0x1f765c,_0x346671),this[_0x1a09b9('0x97')]();};
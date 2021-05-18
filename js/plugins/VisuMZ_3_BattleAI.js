//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [BattleAI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_AI_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This Battle A.I. plugin changes up how enemies and any Auto Battle actors
 * behave by implementing many new key components to their decision making
 * process in battle. These new compotents are: A.I. Styles, A.I. Levels, 
 * Rating Variance, A.I. Conditions, and Influencing TGR Weight.
 *
 * With these new key components put together, you can transform RPG Maker MZ's
 * highly primitive A.I. into something more intelligent. Auto Battle actors
 * can also base their A.I. patterns off an enemy's A.I. in order to behave in
 * more desirable ways during battle as well.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Different A.I. Styles to allow for various ways to setup enemy A.I.
 * * Set A.I. Levels for enemies and Auto Battle actors.
 * * A.I. Levels can be set on a global scale or individual scale.
 * * Set rating variance levels to prioritize actions or randomize them.
 * * These include notetags to change them on a per individual basis.
 * * Create action conditions to make certain skills usable by the A.I. under
 *   specific circumstances.
 * * Action conditions are split between 'ALL' and 'ANY' types which require
 *   either all conditions to be met or at least one condition to be met.
 * * A large selection of condition notetags to use to help customize the best
 *   case situations on when to use a skill and which target to pick.
 * * Default condition settings can be made in the Plugin Parameters to make an
 *   entire database of skills become conditional for A.I. usage.
 * * Influence TGR weight to make certain targets more desirable for specific
 *   types of actions.
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
 * Auto Battle A.I. for Actors
 *
 * - With this plugin, there is an option to let certain classes reference
 * specific enemy A.I. patterns to decide which skills to use during battle.
 * If the reference option is not used, the actor will use default Auto Battle
 * evaluations to determine which skills to use instead.
 *
 * ---
 * 
 * A.I. Styles
 * 
 * - There are currently four different A.I. Styles. Actors and enemies can
 * default to a different one globally, or changed individually using notetags.
 * Read more about them in the A.I. Styles section.
 * 
 * ---
 *
 * A.I. Levels
 *
 * - Enemies and actors can be given different A.I. Levels. The higher one's
 * A.I. Level, the more they are to follow conditions. With Level 100 A.I.
 * Level, an A.I. will never disobey a condition. On the other hand, lower
 * A.I. Levels may possibly ignore certain conditions and act as if they are
 * fulfilled.
 *
 * ---
 *
 * A.I. Rating Variance
 *
 * - In the RPG Maker database editor, when deciding an enemy's Action Patterns
 * you can decide on the action's "rating". The rating is a value from 1 to 9
 * where 9 gets the highest priority and 1 gets the lowest. RPG Maker, by
 * default, will sometimes dip the rating a few levels lower to allow lower
 * ratings and bypass the priority system.
 *
 * - This plugin allows you to set the variance level through Plugin Parameters
 * on a global scale or notetags on an individual basis to allow for larger,
 * smaller, or no variance on ratings at all.
 *
 * ---
 *
 * A.I. Conditions for Skill Usage
 *
 * - Enemies and any actors that use Auto Battle A.I. with a reference can only
 * use certain skills as long as specific conditions have been met. These
 * conditions are split between 'ALL' condition sets and 'ANY' condition sets.
 *
 * - 'ALL' condition sets require all of the set's conditions to be met in
 * order for the skill to be used by the A.I.
 *
 * - 'ANY' condition sets require at least one of the set's conditions to be
 * met in order for the skill to be used by the A.I.
 *
 * - A variety of conditions can be inserted into each condition set to make
 * for some very specific usage conditions. These will also help filter out
 * which targets to pick from, too.
 *
 * ---
 *
 * TGR Weight on A.I. Target Selection
 *
 * - TGR is a special parameter in RPG Maker MZ that represents "Target Rate".
 * The higher one's TGR, the more likely they are to become the target of an
 * attack. This plugin allows various things to influence the TGR weight to
 * make certain targets more likely to be targets for attack.
 *
 * - Elemental influence rates on the TGR weight mean that if a target receives
 * more damage from an elemental attack, the TGR weight becomes higher for that
 * skill when determining a target. The higher the elemental damage received,
 * the more the TGR weight shifts upward.
 *
 * - Evasion and Magic Evasion rates do the opposite. The higher a potential
 * target's evasion and magic evasion rate is (for physical and magical skills)
 * the lower the TGR weight becomes for that potential target.
 *
 * - By default Plugin Parameter settings, TGR weight shifting requires the
 * enemy troop to have "knowledge" on the party's element rates, evasion, and
 * magic evasion properties. Enemy troops would have to hit actors with element
 * based attacks to learn the actor's resistance levels, physical attacks to
 * learn the actor's evasion, and magical attacks to learn the actor's magic
 * evasion levels.
 *
 * ---
 *
 * ============================================================================
 * A.I. Styles
 * ============================================================================
 * 
 * There are currently four different A.I. Styles. These determine how the
 * A.I. acts and behaves. You can change the A.I. Style used globally through
 * the Plugin Parameters or individually for classes and enemies through the
 * usage of notetags.
 * 
 * Read below to understand each style and its rules:
 * 
 * ---
 * 
 * Classic Style
 * 
 * "Classic" style is the traditional and default RPG Maker MZ A.I. style.
 * It puts emphasis on the Rating system, where skills with higher ratings are
 * given more priority than skills with lower ratings within variance.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions with higher Ratings.
 * - Rating variance will be determined by Plugin Parameters and/or notetags.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - After applying Ratings, Rating Variances, and A.I. Conditions, if there
 *   are still multiple actions to choose from, pick from the remaining actions
 *   randomly.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Gambit Style
 * 
 * - "Gambit" style is the style from Yanfly Engine Plugin's Battle A.I. Core.
 * It goes down the list of skills and uses them in order as long as they meet
 * the Action Pattern conditions and A.I. conditions. Ratings will be ignored.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions located higher on the list.
 * - Actions towards the bottom of the list will have lower priority.
 * - Ratings and Rating Variance has no bearing on whether or not an action
 *   will be picked.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Casual Style
 * 
 * - "Casual" style takes a lighter approach to A.I. It ignores the Ratings
 * system and doesn't care about the order of actions either. Instead, the
 * only thing this A.I. Style cares about are the A.I. Conditions. All valid
 * actions after that are randomly picked from.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Random Style
 * 
 * - "Random" style simply does not care about ratings or order. It only cares
 * if the skill's can be used (can pay for the cost) and Action Pattern
 * conditions. It does not care about A.I. Conditions, Ratings, or Order.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions are ignored.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
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
 * === General A.I. Settings Notetags ===
 *
 * These notetags set the general A.I. related settings for enemies and any
 * actors that use A.I. (requires Auto Battle and has a reference A.I.).
 *
 * ---
 * 
 * <AI Style: x>
 * 
 * - Used for: Class, Enemy Notetags
 * - Replace 'x' with 'Classic', 'Gambit', 'Casual', or 'Random' without the
 *   quotes. Example: <AI Style: Gambit>
 * - Determines the A.I. style used. Refer to the A.I. Styles section on the
 *   various types of styles.
 * - For actors, place this inside the associated class's notebox instead.
 * - For actors, this does not apply if there is no referenced enemy A.I. list.
 * - Setup the reference enemy through either the Plugin Parameters or by using
 *   the <Reference AI: Enemy id> notetag found below.
 * 
 * ---
 *
 * <AI Level: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Designates the unit's A.I. level if A.I. is to be used.
 * - Replace 'x' with a number from 0 to 100.
 * - Units with higher A.I. Levels will be more strict about conditions.
 * - Units with lower A.I. Levels will be more lax about conditions.
 *
 * ---
 *
 * <AI Rating Variance: x>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the variance amount when determining A.I. actions by rating.
 * - Replace 'x' with a number between 0 and 9.
 * - 0 for no variance.
 * - Lower numbers for less variance.
 * - Higher numbers for more variance.
 *
 * ---
 *
 * <Reference AI: Enemy id>
 * <Reference AI: name>
 *
 * - Used for: Class Notetags
 * - Causes any actor using this class that has the Auto Battle trait to use
 *   a specific enemy's attack pattern (ratings, conditions, etc.) to determine
 *   which skill to use in battle.
 * - Replace 'id' with a number representing the enemy's ID to reference.
 * - Replace 'name' with the name the enemy to reference.
 *
 * ---
 *
 * <No Reference AI>
 *
 * - Used for: Class Notetags
 * - Prevents the class from using any enemies as their reference A.I. pattern
 *   (including the one set in the Plugin Parameters).
 *
 * ---
 *
 * === Skill A.I. Condition Notetags ===
 *
 * Insert these notetags into the noteboxes of skills that you'd like to give
 * custom A.I. conditions for. The 'All' version of the notetags require every
 * condition to be met while the 'Any' version of the notetags require only one
 * of the conditions to be met. 
 *
 * If both are used together, then the 'All' conditions must be completely
 * fulfilled while the 'Any' conditions need only one to be fulfilled.
 *
 * ---
 *
 * <All AI Conditions>
 *  condition
 *  condition
 *  condition
 * </All AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - All conditions must be met in order for this to become a valid skill for
 *   the AI to use.
 * - This can be used together with <Any AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'All' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <Any AI Conditions>
 *  condition
 *  condition
 *  condition
 * </Any AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - As long as one condition is met, this becomes a valid skill for the AI
 *   to use. If none of them are met, this skill becomes invalid for AI use.
 * - This can be used together with <All AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'Any' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <No AI Conditions>
 * 
 * - Used for: Skill
 * - Removes any default 'All' and 'Any' conditions for this skill.
 * 
 * ---
 *
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 *
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 *
 * - Replace 'x' and 'y' with any of the following:
 *
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 *
 * - 'HP%', 'MP%', 'TP%' for HP, MP, and TP rates respectively.
 * - 'MaxHP', 'MaxMP', 'MaxTP' for the potential target's respective values.
 * - 'Level' for the potential target's level. Requires VisuMZ_0_CoreEngine for
 *   this to affect enemies.
 * - 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' for the potential target's total
 *   parameter value.
 *
 * - 'param Buff Stacks' for the potential target's current Buff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 * - 'param Debuff Stacks' for the potential target's current Debuff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * - 'param Buff Turns' for potential target's current buff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that buff.
 * - 'param Debuff Turns' for potential target's current debuff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that debuff.
 *
 * - 'State id Turns' or 'State name Turns' for potential target's current turn
 *   duration on that particular state.
 *   - Replace 'id' with a number representing the ID of the state.
 *   - Replace 'name' with the state's name.
 *   - Returns 0 if the potential target is not affected by that state.
 *   - Returns the max safe number value if the potential target is has that
 *     state as a passive state.
 *
 * - 'Element id Rate', 'Element name Rate', 'name Element Rate'
 *   - Returns a (float) value of the potential target's element's rate.
 *   - Replace 'id' with the ID of the element whose rate is to be checked.
 *   - Replace 'name' with the name of the element whose rate is to be checked.
 *     - Ignore any text codes in the element name.
 *
 * - 'Team Alive Members'
 *   - Returns a number value indicating how many alive members there are on
 *     the potential target's team.
 *
 * - 'Team Dead Members'
 *   - Returns a number value indicating how many dead members there are on
 *     the potential target's team.
 *
 *   *NOTE* To make any of these conditions base off of the user instead, add
 *   the word 'user' before the condition as such:
 *
 *   user hp% >= 0.50
 *   user atk buff stacks === 2
 *   user team alive members < 3
 *
 * ---
 *
 * Always
 *
 * - Going to be valid no matter what.
 *
 * ---
 *
 * x% Chance
 * 
 * - Replace 'x' with a number value representing the percent chance this skill
 *   would pass as valid.
 *
 * ---
 *
 * Switch x On
 * Switch x Off
 *
 * - Replace 'x' with the ID of the switch to check as ON/OFF.
 *
 * ---
 *
 * User is Actor
 * User is Enemy
 * Target is Actor
 * Target is Enemy
 *
 * - Requires the user or potential target to be an actor/enemy.
 *
 * ---
 *
 * User Has State id
 * User Has State name
 * Target Has State id
 * Target Has State name
 *
 * - Replace 'id' with the ID of the state the user or potential target needs
 *   to have.
 * - Replace 'name' with the name of the state the target needs to have.
 *
 * ---
 *
 * User Not State id
 * User Not State name
 * Target Not State id
 * Target Not State name
 *
 * - Replace 'id' with the ID of the state the user or potential target
 *   cannot have.
 * - Replace 'name' with the name of the state the target cannot have.
 *
 * ---
 *
 * User Has param Buff 
 * User Has param Debuff 
 * Target Has param Buff 
 * Target Has param Debuff 
 *
 * - Requires user or potential target to have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Has param Max Buff 
 * User Has param Max Debuff
 * Target Has param Max Buff 
 * Target Has param Max Debuff
 *
 * - Requires potential user or target to have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Buff 
 * User Not param Debuff 
 * Target Not param Buff 
 * Target Not param Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Max Buff 
 * User Not param Max Debuff 
 * Target Not param Max Buff 
 * Target Not param Max Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * === A.I. => TGR Weight Notetags ===
 *
 * You can set how much influence on TGR weights actors and enemies will place
 * when determining valid targets for their actions.
 *
 * ---
 *
 * <AI Element Rate Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the element rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI Element Rate Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in element rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI EVA Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the EVA rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI EVA Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in EVA rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MEV Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MEV rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MEV Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MEV rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. General Settings
 * ============================================================================
 *
 * These settings determine the global settings for general Battle A.I. usage.
 *
 * ---
 * 
 * A.I. Style
 * 
 *   Actor Style:
 *   - Which A.I. style do you want for referenced actors to use?
 *   - This does not apply to non-referenced actors.
 * 
 *   Enemy Style:
 *   - Which A.I. style do you want for enemies to use?
 * 
 *   Refer to the A.I. Styles list for a list of valid styles.
 * 
 * ---
 *
 * A.I. Level
 * 
 *   Actor A.I. Level:
 *   - Default A.I. level used for actor A.I.
 *   - Levels: 0-100. Higher is stricter.
 * 
 *   Enemy A.I. Level:
 *   - Default A.I. level used for enemy A.I.
 *   - Levels: 0-100. Higher is stricter.
 *
 * ---
 *
 * A.I. Ratings
 * 
 *   Actor Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 * 
 *   Enemy Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 *
 * ---
 *
 * Reference
 * 
 *   Actor => AI Reference:
 *   - Which enemy A.I. should the actor reference by default?
 *   - Use 0 for no references.
 *
 * ---
 *
 * Knowledge
 * 
 *   Learn Knowledge:
 *   - Requires enemies/actors to test the knowledge of the opponents before
 *     using specific conditions.
 * 
 *   Unknown Element Rate:
 *   - What should A.I. treat unknown element rates as?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. Default Conditions
 * ============================================================================
 *
 * You can set certain conditions to be used as defaults for all skills that
 * lack the <All AI Conditions> and <Any AI Conditions>. If either of those
 * notetags exist, none of these defaults will be used for those skills. These
 * settings will allow you to set both 'All' and 'Any' conditions for defaults.
 *
 * ---
 *
 * Enable?
 * 
 *   All Conditions:
 *   - Create default 'ALL' conditions for all skills without any AI notetags?
 * 
 *   Any Conditions:
 *   - Create default 'ANY' conditions for all skills without any AI notetags?
 *
 * ---
 *
 * HP Damage
 * MP Damage
 * HP Recover
 * MP Recover
 * HP Drain
 * MP Drain
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *
 * ---
 *
 * Add State
 * Remove State
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * Add Buff
 * Remove Buff
 * Add Debuff
 * Remove Debuff
 * 
 *   All Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie param's).
 * 
 *   Any Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. => TGR Weight Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to set whether or not you'd like for 
 * weight influence when deciding targets for actions and how much to influence
 * the TGR weight by.
 *
 * ---
 *
 * Weight
 * 
 *   Element Rate => TGR:
 *   - Makes all A.I. consider elemental rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence elemental rates have on
 *       TGR weight.
 * 
 *   EVA Rate => TGR:
 *   - Makes all A.I. consider EVA rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence EVA rates have on
 *       TGR weight.
 * 
 *   MEV Rate => TGR:
 *   - Makes all A.I. consider MEV rates when considering TGR weight
 *     by default?
 * 
 *   Influence Rate:
 *   - This determines the default level of influence MEV rates have on
 *     TGR weight.
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
 * ** <All AI Conditiosn> and <Any AI Conditions> notetags are now fixed and
 *    should work properly. Fix made by Yanfly.
 *
 * Version 1.00: September 30, 2020
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
 * @param BattleAI
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text A.I. General Settings
 * @type struct<General>
 * @desc General settings pertaining to A.I.
 * @default {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"}
 *
 * @param Default:struct
 * @text A.I. Default Conditions
 * @type struct<Default>
 * @desc Give certain types of skills default conditions.
 * @default {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP > 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP < Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP < Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP < User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP > 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns <= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns <= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns <= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""}
 *
 * @param Weight:struct
 * @text A.I. => TGR Weight
 * @type struct<Weight>
 * @desc How do certain properties translate to TGR weight?
 * @default {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"}
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
 * A.I. General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param AIStyle
 * @text A.I. Style
 *
 * @param ActorStyleAI:str
 * @text Actor Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for referenced actors to use?
 * This does not apply to non-referenced actors.
 * @default classic
 *
 * @param EnemyStyleAI:str
 * @text Enemy Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for enemies to use?
 * @default classic
 *
 * @param AILevel
 * @text A.I. Level
 *
 * @param ActorAILevel:num
 * @text Actor A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for actor A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param EnemyAILevel:num
 * @text Enemy A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for enemy A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param AIRating
 * @text A.I. Ratings
 *
 * @param ActorRatingVariance:num
 * @text Actor Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 1
 *
 * @param EnemyRatingVariance:num
 * @text Enemy Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 3
 *
 * @param Reference
 *
 * @param ActorAIReference:num
 * @text Actor => AI Reference
 * @parent Reference
 * @type enemy
 * @desc Which enemy A.I. should the actor reference by default?
 * Use 0 for no references.
 * @default 0
 *
 * @param Knowledge
 *
 * @param LearnKnowledge:eval
 * @text Learn Knowledge
 * @parent Knowledge
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Requires enemies/actors to test the knowledge of
 * the opponents before using specific conditions.
 * @default true
 *
 * @param UnknownElementRate:num
 * @text Unknown Element Rate
 * @parent LearnKnowledge:eval
 * @desc What should A.I. treat unknown element rates as?
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. Default Conditions
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Enable?
 *
 * @param EnableAllCon:eval
 * @text All Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ALL' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param EnableAnyCon:eval
 * @text Any Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ANY' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param HpDamage
 * @text HP Damage
 * 
 * @param HpDamageAll:json
 * @text All Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ALL' conditions used for HP damage skills.
 * @default ""
 * 
 * @param HpDamageAny:json
 * @text Any Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ANY' conditions used for HP damage skills.
 * @default "Always"
 *
 * @param MpDamage
 * @text MP Damage
 * 
 * @param MpDamageAll:json
 * @text All Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ALL' conditions used for MP damage skills.
 * @default "Target MP > 0"
 *
 * @param MpDamageAny:json
 * @text Any Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ANY' conditions used for MP damage skills.
 * @default ""
 *
 * @param HpRecover
 * @text HP Recover
 * 
 * @param HpRecoverAll:json
 * @text All Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ALL' conditions used for HP recovery skills.
 * @default ""
 *
 * @param HpRecoverAny:json
 * @text Any Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ANY' conditions used for HP recovery skills.
 * @default "Target HP < Target MaxHP"
 *
 * @param MpRecover
 * @text MP Recover
 * 
 * @param MpRecoverAll:json
 * @text All Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ALL' conditions used for MP recovery skills.
 * @default ""
 *
 * @param MpRecoverAny:json
 * @text Any Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ANY' conditions used for MP recovery skills.
 * @default "Target MP < Target MaxMP"
 *
 * @param HpDrain
 * @text HP Drain
 * 
 * @param HpDrainAll:json
 * @text All Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ALL' conditions used for HP drain skills.
 * @default ""
 *
 * @param HpDrainAny:json
 * @text Any Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ANY' conditions used for HP drain skills.
 * @default "User HP < User MaxHP"
 *
 * @param MpDrain
 * @text MP Drain
 * 
 * @param MpDrainAll:json
 * @text All Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ALL' conditions used for MP drain skills.
 * @default "Target MP > 0"
 *
 * @param MpDrainAny:json
 * @text Any Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ANY' conditions used for MP drain skills.
 * @default ""
 *
 * @param AddState
 * @text Add State
 * 
 * @param AddStateAll:json
 * @text All Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ALL' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddStateAny:json
 * @text Any Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ANY' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not State %1\nTarget State %1 Turns <= 1"
 *
 * @param RemoveState
 * @text Remove State
 * 
 * @param RemoveStateAll:json
 * @text All Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ALL' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveStateAny:json
 * @text Any Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ANY' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has State %1"
 *
 * @param AddBuff
 * @text Add Buff
 * 
 * @param AddBuffAll:json
 * @text All Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ALL' conditions used for adding buffs.
 * %1 - Dynamic values (ie param names).
 * @default ""
 *
 * @param AddBuffAny:json
 * @text Any Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ANY' conditions used for adding buffs.
 * %1 - Dynamic values (ie param's).
 * @default "Target Not %1 Max Buff\nTarget %1 Buff Turns <= 1"
 *
 * @param RemoveBuff
 * @text Remove Buff
 * 
 * @param RemoveBuffAll:json
 * @text All Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ALL' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveBuffAny:json
 * @text Any Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ANY' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Buff"
 *
 * @param AddDebuff
 * @text Add Debuff
 * 
 * @param AddDebuffAll:json
 * @text All Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ALL' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddDebuffAny:json
 * @text Any Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ANY' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not %1 Max Debuff\nTarget %1 Debuff Turns <= 1"
 *
 * @param RemoveDebuff
 * @text Remove Debuff
 * 
 * @param RemoveDebuffAll:json
 * @text All Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ALL' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveDebuffAny:json
 * @text Any Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ANY' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Debuff"
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. => TGR Weight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weight:
 *
 * @param ElementTgr:eval
 * @text Element Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider elemental rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param ElementTgrRate:num
 * @text Influence Rate
 * @parent ElementTgr:eval
 * @desc This determines the default level of influence elemental
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param EvaTgr:eval
 * @text EVA Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider EVA rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param EvaTgrRate:num
 * @text Influence Rate
 * @parent EvaTgr:eval
 * @desc This determines the default level of influence EVA
 * rates have on TGR weight.
 * @default 1.50
 *
 * @param MevTgr:eval
 * @text MEV Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MEV rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MevTgrRate:num
 * @text Influence Rate
 * @parent MevTgr:eval
 * @desc This determines the default level of influence MEV
 * rates have on TGR weight.
 * @default 2.00
 *
 */
//=============================================================================

const _0x123f=['toUpperCase','YAgLt','subject','FFTlm','LUdLQ','is%1Affected','General','pcoIa','RiZNw','addXParamAIKnowledge','anyCondition','value2','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','elementId','YDTAu','match','hasForcedTargets','SBeYd','MAT','LlYoq','evaInfluenceRate','ElementTgr','debuff','setSkill','OaSzf','isMagical','mpRate','%1\x20%2\x20%3','ConvertParams','EFFECT_REMOVE_BUFF','YIUih','dataId','doesTargetMeetCondition','HxlbI','RemoveState%1','length','JeFtb','getElementIdWithName','AmXGN','Game_Action_apply','AEPxm','OEIIE','actions','_stateTurns','_subject','aiMevTgr','HpDrain%1','elementInfluence','ATK','lVqNQ','Game_Actor_makeAutoBattleActions','tpRate','HTWpN','isDetermineActionByAI','isPhysical','clearAIKnowledge','COBsm','doesTargetMeetAnyConditions','EhUju','UHtms','trim','CzGHX','numActions','value','determineLineValue','_regexp','JgLgO','STRUCT','EFFECT_REMOVE_DEBUFF','includes','aiKnowledge','forceValidTargets','actor','casual','AjmyM','initialize','YHoNS','Settings','description','Game_Enemy_isActionValid','bypassEvaTgr','Any','IiLVx','allCondition','LWNgz','autoRemovalTiming','LUK','tnZFk','ZgtFS','selectAllActionsRandom','meetsTurnCondition','emwcB','AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1','isConditionalAI','_elementIDs','aiRatingVariance','actorId','referenceEnemyForAI','isEnemy','getDefaultAnyConditions','LKECE','Game_Unit_randomTarget','EFFECT_ADD_DEBUFF','ARRAYNUM','HpRecover%1','isActor','makeValidTargets','randomTarget','status','EFFECT_RECOVER_MP','ActorStyleAI','aAYii','maxTp','This\x20is\x20a\x20static\x20class','hMOFp','item','selectAllActionsClassic','BdVLU','ElementTgrRate','slice','Game_Temp_initialize','doesAIApplyMevTgrInfluence','YvhNR','isStateAffected','OyfBv','isDebuffAffected','ymBKz','WWWRw','OcanF','isForAliveFriend','getAnyConditions','getDefaultAllConditions','EnemyRatingVariance','getEnemyIdWithName','HpDamage%1','LearnKnowledge','applyBattleAI','selectAction','type','Game_BattlerBase_sparam','VisuMZ_4_AggroControl','afrnl','Weight','MDF','iEmGf','pJlIY','isForEveryone','pZpFg','meetsMpCondition','hasElementAIKnowledge','remove','oiSwQ','getAllConditions','moWHI','meetsHpCondition','RemoveDebuff%1','ziunb','vODmu','addElementAIKnowledge','push','skillId','EnemyAILevel','MgTsL','bFPpF','guxJx','setEnemyAction','aiApplyElementalTgrInfluenceRate','EFFECT_RECOVER_HP','EFFECT_ADD_BUFF','VisuMZ_1_ElementStatusCore','ActorAILevel','determineNewValidAIAction','noCondition','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','AddState%1','call','startAction','nvdsi','MAXMP','NyyyW','EFFECT_ADD_STATE','enemyId','rating','version','uvFsc','QWOBn','EvaTgrRate','pXvjW','FUNC','itemTargetCandidates','NAEZF','AddDebuff%1','isMax%1Affected','split','isAggroAffected','action','UejvG','log','doesTargetMeetAIConditions','parse','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ARRAYSTR','SxSrG','hasXParamAIKnowledge','FEedG','SzBAx','gfpel','evaRates','forcedTargets','random','jVrwh','aliveMembers','elementKnowledgeRate','lBHIj','aiApplyEvaTgrInfluenceRate','BattleAI','makeDefaultConditions','gYVgj','EnableAllCon','Game_Troop_setup','aiTgrInfluence','doesAIApplyElementalTgrInfluence','ARRAYEVAL','IuKRG','isBuffAffected','isSkill','MpDrain%1','aiEvaTgr','PwrNx','passesAILevel','MAX_SAFE_INTEGER','clearForcedTargets','Game_Action_itemTargetCandidates','BVhiP','Game_Action_makeTargets','BkzMj','_buffTurns','BattleManager_startAction','tFexP','indexOf','damage','egZkh','attackSkillId','isAutoBattle','determineActionByAIisStillValid','eva','XlFJB','opponentsUnit','AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1','MpRecover%1','max','enemy','IUDuu','EvaTgr','setAiTgrInfluences','xOTMA','MpDamage%1','canGuard','ActorAIReference','Game_Unit_initialize','sparam','zJFtq','charAt','elementInfluenceRate','EFFECT_REMOVE_STATE','setup','isForOpponent','makeAutoBattleActionsWithEnemyAI','hasValidTargets','_applyAIForcedTargetFilters','elementRates','mevInfluenceRate','STR','yZsLE','apply','ARRAYSTRUCT','aiApplyMevTgrInfluenceRate','mmp','doesAIApplyEvaTgrInfluence','hgstU','xrqEE','imAyp','AGI','elementIds','deadMembers','zaOPa','isPlaytest','friendsUnit','jnLXZ','UnknownElementRate','states','meetsPartyLevelCondition','selectAllActions','ZYQxJ','currentClass','elementRate','Default','ARRAYJSON','note','makeAutoBattleActions','guardSkillId','buff','bypassElementTgr','BdjwE','aiElementTgr','meetsSwitchCondition','RemoveBuff%1','selectAllActionsGambit','All','filter','bypassMevTgr','applyBattleAiTgrInfluences','clearAiTgrInfluence','initBattleAI','jNUfB','isForDeadFriend','format','concat','_forceValidTargets','aiStyle','isActionValid','ActorRatingVariance','DEF','map','meetsStateCondition','value1','mevRates','elements','toLowerCase','mev','vWjaU','exit','MAXHP','randomInt','getStateIdWithName','meetsCondition','jMEis','doesTargetMeetAllConditions','replace','_aiKnowledge','DFDOb','MQLTQ','aiLevel','clamp','usableSkills','makeTargets','_stateIDs','mhp','prototype'];(function(_0x1346d5,_0x123f58){const _0x122a09=function(_0x430d43){while(--_0x430d43){_0x1346d5['push'](_0x1346d5['shift']());}};_0x122a09(++_0x123f58);}(_0x123f,0x1ad));const _0x122a=function(_0x1346d5,_0x123f58){_0x1346d5=_0x1346d5-0x0;let _0x122a09=_0x123f[_0x1346d5];return _0x122a09;};const _0x44da21=_0x122a;var label=_0x44da21('0x87'),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x44da21('0xe5')](function(_0x4470ad){const _0x35a54d=_0x44da21;return _0x4470ad[_0x35a54d('0x1c')]&&_0x4470ad['description'][_0x35a54d('0x152')]('['+label+']');})[0x0];VisuMZ[label][_0x44da21('0x15a')]=VisuMZ[label][_0x44da21('0x15a')]||{},VisuMZ[_0x44da21('0x129')]=function(_0x3ec46f,_0x5e1de5){const _0x3fd110=_0x44da21;for(const _0x50bcce in _0x5e1de5){if(_0x3fd110('0x63')===_0x3fd110('0x63')){if(_0x50bcce[_0x3fd110('0x11c')](/(.*):(.*)/i)){const _0x58b617=String(RegExp['$1']),_0x201eb1=String(RegExp['$2'])[_0x3fd110('0x10d')]()['trim']();let _0x5583b8,_0x5ef300,_0x391e48;switch(_0x201eb1){case'NUM':_0x5583b8=_0x5e1de5[_0x50bcce]!==''?Number(_0x5e1de5[_0x50bcce]):0x0;break;case _0x3fd110('0x17'):_0x5ef300=_0x5e1de5[_0x50bcce]!==''?JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce]):[],_0x5583b8=_0x5ef300[_0x3fd110('0xf3')](_0xc06f86=>Number(_0xc06f86));break;case'EVAL':_0x5583b8=_0x5e1de5[_0x50bcce]!==''?eval(_0x5e1de5[_0x50bcce]):null;break;case _0x3fd110('0x8e'):_0x5ef300=_0x5e1de5[_0x50bcce]!==''?JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce]):[],_0x5583b8=_0x5ef300[_0x3fd110('0xf3')](_0x27869d=>eval(_0x27869d));break;case'JSON':_0x5583b8=_0x5e1de5[_0x50bcce]!==''?JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce]):'';break;case _0x3fd110('0xd9'):_0x5ef300=_0x5e1de5[_0x50bcce]!==''?JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce]):[],_0x5583b8=_0x5ef300[_0x3fd110('0xf3')](_0x3bc665=>JSON[_0x3fd110('0x77')](_0x3bc665));break;case _0x3fd110('0x6c'):_0x5583b8=_0x5e1de5[_0x50bcce]!==''?new Function(JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce])):new Function('return\x200');break;case'ARRAYFUNC':_0x5ef300=_0x5e1de5[_0x50bcce]!==''?JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce]):[],_0x5583b8=_0x5ef300[_0x3fd110('0xf3')](_0x5bd49d=>new Function(JSON[_0x3fd110('0x77')](_0x5bd49d)));break;case _0x3fd110('0xc0'):_0x5583b8=_0x5e1de5[_0x50bcce]!==''?String(_0x5e1de5[_0x50bcce]):'';break;case _0x3fd110('0x79'):_0x5ef300=_0x5e1de5[_0x50bcce]!==''?JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce]):[],_0x5583b8=_0x5ef300[_0x3fd110('0xf3')](_0x56efc3=>String(_0x56efc3));break;case _0x3fd110('0x150'):_0x391e48=_0x5e1de5[_0x50bcce]!==''?JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce]):{},_0x5583b8=VisuMZ['ConvertParams']({},_0x391e48);break;case _0x3fd110('0xc3'):_0x5ef300=_0x5e1de5[_0x50bcce]!==''?JSON[_0x3fd110('0x77')](_0x5e1de5[_0x50bcce]):[],_0x5583b8=_0x5ef300['map'](_0x1b0761=>VisuMZ['ConvertParams']({},JSON[_0x3fd110('0x77')](_0x1b0761)));break;default:continue;}_0x3ec46f[_0x58b617]=_0x5583b8;}}else{function _0x24878a(){const _0x2a0044=_0x3fd110;return _0x1d7511[_0x2a0044('0x87')][_0x2a0044('0x15a')][_0x2a0044('0x113')][_0x2a0044('0xd1')];}}}return _0x3ec46f;},(_0x501895=>{const _0x12869f=_0x44da21,_0x32b813=_0x501895['name'];for(const _0x167b9b of dependencies){if(_0x12869f('0xd0')!=='jnLXZ'){function _0x823afc(){const _0x86f81d=_0x12869f,_0x22ee51=this['isActor']()?this['actor']()[_0x86f81d('0xda')]:this['enemy']()[_0x86f81d('0xda')];if(_0x22ee51[_0x86f81d('0x11c')](_0x377a8e['_regexp'][_0x86f81d('0xe0')]))return _0x580223(_0x5d0baa['$1']);}}else{if(!Imported[_0x167b9b]){alert(_0x12869f('0x119')[_0x12869f('0xec')](_0x32b813,_0x167b9b)),SceneManager['exit']();break;}}}const _0xd8a859=_0x501895['description'];if(_0xd8a859['match'](/\[Version[ ](.*?)\]/i)){const _0x34c03b=Number(RegExp['$1']);_0x34c03b!==VisuMZ[label][_0x12869f('0x67')]&&(alert(_0x12869f('0x5d')[_0x12869f('0xec')](_0x32b813,_0x34c03b)),SceneManager[_0x12869f('0xfb')]());}if(_0xd8a859[_0x12869f('0x11c')](/\[Tier[ ](\d+)\]/i)){const _0x2589a1=Number(RegExp['$1']);_0x2589a1<tier?(alert(_0x12869f('0x78')[_0x12869f('0xec')](_0x32b813,_0x2589a1,tier)),SceneManager[_0x12869f('0xfb')]()):tier=Math[_0x12869f('0xaa')](_0x2589a1,tier);}VisuMZ[_0x12869f('0x129')](VisuMZ[label][_0x12869f('0x15a')],_0x501895['parameters']);})(pluginData);function AIManager(){const _0x43bfb9=_0x44da21;throw new Error(_0x43bfb9('0x21'));}AIManager[_0x44da21('0x14e')]={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager[_0x44da21('0xd')]=function(_0x5423fb){const _0x361ed8=_0x44da21;if(!_0x5423fb)return![];return this[_0x361ed8('0x48')](_0x5423fb)[_0x361ed8('0x130')]>0x0||this[_0x361ed8('0x32')](_0x5423fb)['length']>0x0;},AIManager[_0x44da21('0x48')]=function(_0x5adcf7){const _0x4d5a78=_0x44da21;if(_0x5adcf7[_0x4d5a78('0xda')]['match'](AIManager[_0x4d5a78('0x14e')][_0x4d5a78('0x5c')])){if(_0x4d5a78('0x68')!==_0x4d5a78('0x11e'))return[];else{function _0x3826ba(){const _0x43aafb=_0x4d5a78,_0x4cdecd=_0xac01b9(_0xb02ee0['$1'])*0.01;return _0x38d05f[_0x43aafb('0x81')]()<_0x4cdecd;}}}else{if(_0x5adcf7[_0x4d5a78('0xda')][_0x4d5a78('0x11c')](AIManager[_0x4d5a78('0x14e')][_0x4d5a78('0x3')])){if(_0x4d5a78('0x145')==='FBiLP'){function _0x2ce400(){const _0x573a4f=_0x4d5a78,_0xa19fde=_0x530dbc[_0x573a4f('0x9f')](_0x1a6160(_0x80be07['$2'])['toUpperCase']()[_0x573a4f('0x149')]()),_0x16167d=_0x5e1af8(_0x4cedb0['$3'])[_0x573a4f('0xf8')]()['trim'](),_0x187f75=_0x45fd64(_0x3ac04f['$1'])[_0x573a4f('0x11c')](/(?:USER|SUBJECT)/i)?_0x17c870:_0x377a8c,_0x17c989='isMax%1Affected'[_0x573a4f('0xec')](_0x16167d[_0x573a4f('0xb6')](0x0)[_0x573a4f('0x10d')]()+_0x16167d[_0x573a4f('0x27')](0x1));return!_0x187f75[_0x17c989](_0xa19fde);}}else return String(RegExp['$1'])['split'](/[\r\n]+/)[_0x4d5a78('0x46')]('');}else{if('HTWpN'===_0x4d5a78('0x141'))return this[_0x4d5a78('0x33')](_0x5adcf7);else{function _0xd82213(){const _0x5646b6=_0x4d5a78;if(this[_0x5646b6('0x19')]()||this[_0x5646b6('0x12')]()){const _0x3ecbe3=this[_0x5646b6('0x19')]()?this[_0x5646b6('0x155')]()[_0x5646b6('0xda')]:this[_0x5646b6('0xab')]()[_0x5646b6('0xda')];if(_0x3ecbe3[_0x5646b6('0x11c')](_0xf3624f[_0x5646b6('0x14e')]['aiEvaTgr']))return _0x404db7(_0x2b39e3['$1']);}return _0x35ec4[_0x5646b6('0x87')][_0x5646b6('0x15a')][_0x5646b6('0x3e')][_0x5646b6('0x6a')];}}}}},AIManager['getAnyConditions']=function(_0x21613f){const _0x564128=_0x44da21;if(_0x21613f[_0x564128('0xda')][_0x564128('0x11c')](AIManager[_0x564128('0x14e')][_0x564128('0x5c')])){if(_0x564128('0x10e')!==_0x564128('0x131'))return[];else{function _0x4c155d(){const _0x5a00be=_0x564128;return this[_0x5a00be('0x86')]()>0x0;}}}else{if(_0x21613f[_0x564128('0xda')]['match'](AIManager[_0x564128('0x14e')][_0x564128('0x117')])){if(_0x564128('0xfa')!==_0x564128('0xfa')){function _0x5b8a32(){const _0x39302d=_0x564128;return _0x516043[_0x39302d('0x96')];}}else return String(RegExp['$1'])[_0x564128('0x71')](/[\r\n]+/)[_0x564128('0x46')]('');}else return this['getDefaultAnyConditions'](_0x21613f);}},AIManager[_0x44da21('0x33')]=function(_0x18065a){const _0x371a9f=_0x44da21;if(!VisuMZ['BattleAI'][_0x371a9f('0x15a')][_0x371a9f('0xd8')][_0x371a9f('0x8a')])return[];if(_0x18065a['note'][_0x371a9f('0x11c')](AIManager[_0x371a9f('0x14e')][_0x371a9f('0x117')]))return[];return this[_0x371a9f('0x88')](_0x18065a,_0x371a9f('0xe4'));},AIManager[_0x44da21('0x13')]=function(_0x47eac0){const _0x51b037=_0x44da21;if(!VisuMZ[_0x51b037('0x87')][_0x51b037('0x15a')]['Default']['EnableAnyCon'])return[];if(_0x47eac0[_0x51b037('0xda')][_0x51b037('0x11c')](AIManager[_0x51b037('0x14e')][_0x51b037('0x3')]))return[];return this['makeDefaultConditions'](_0x47eac0,_0x51b037('0x1'));},AIManager[_0x44da21('0x88')]=function(_0x690a64,_0x48ff79){const _0x22210a=_0x44da21;if(!_0x690a64)return[];const _0x176fc9=VisuMZ[_0x22210a('0x87')][_0x22210a('0x15a')][_0x22210a('0xd8')],_0x459191=[_0x22210a('0xfc'),_0x22210a('0x62'),_0x22210a('0x13d'),_0x22210a('0xf2'),_0x22210a('0x11f'),_0x22210a('0x3f'),'AGI','LUK'],_0x492042=_0x690a64[_0x22210a('0xa0')][_0x22210a('0x3a')],_0x1c0329=_0x690a64['effects'];let _0xea9372=[],_0xa06aa5='',_0x59398='';switch(_0x492042){case 0x1:_0xa06aa5=_0x22210a('0x36')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)['remove'](''));break;case 0x2:_0xa06aa5=_0x22210a('0xb0')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372['concat'](_0x59398['split'](/[\r\n]+/)[_0x22210a('0x46')](''));break;case 0x3:_0xa06aa5=_0x22210a('0x18')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)[_0x22210a('0x46')](''));break;case 0x4:_0xa06aa5='MpRecover%1'['format'](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372['concat'](_0x59398['split'](/[\r\n]+/)[_0x22210a('0x46')](''));break;case 0x5:_0xa06aa5=_0x22210a('0x13b')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372['concat'](_0x59398[_0x22210a('0x71')](/[\r\n]+/)[_0x22210a('0x46')](''));break;case 0x6:_0xa06aa5=_0x22210a('0x92')['format'](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372['concat'](_0x59398[_0x22210a('0x71')](/[\r\n]+/)['remove'](''));break;}for(const _0x355383 of _0x1c0329){if('tTpLQ'===_0x22210a('0x133')){function _0x1683d2(){const _0x29a783=_0x22210a,_0xafbc2d=_0x27ac72[_0x29a783('0xaa')](..._0x2615c7[_0x29a783('0xf3')](_0x555920=>_0x555920[_0x29a783('0x66')])),_0x1842a9=_0xafbc2d-this['aiRatingVariance']();_0x1ff4d1=_0x3698bb[_0x29a783('0xe5')](_0x5617f0=>_0x5617f0[_0x29a783('0x66')]>=_0x1842a9);for(let _0x2f4c2d=0x0;_0x2f4c2d<this[_0x29a783('0x14b')]();_0x2f4c2d++){this['action'](_0x2f4c2d)['setEnemyAction'](this[_0x29a783('0x39')](_0xe1952,_0x1842a9));}}}else{if(!_0x355383)continue;switch(_0x355383['code']){case Game_Action[_0x22210a('0x57')]:if(_0x355383[_0x22210a('0xf5')]>0x0||_0x355383[_0x22210a('0x118')]>0x0){if('guxJx'!==_0x22210a('0x54')){function _0x2a427e(){const _0x2e218c=_0x22210a;return _0x2d25dd(_0x57145b['$1'])[_0x2e218c('0x71')](/[\r\n]+/)[_0x2e218c('0x46')]('');}}else _0xa06aa5=_0x22210a('0x18')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372['concat'](_0x59398[_0x22210a('0x71')](/[\r\n]+/)['remove'](''));}else(_0x355383[_0x22210a('0xf5')]<0x0||_0x355383['value2']<0x0)&&(_0xa06aa5='HpDamage%1'['format'](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)['remove']('')));break;case Game_Action[_0x22210a('0x1d')]:if(_0x355383[_0x22210a('0xf5')]>0x0||_0x355383[_0x22210a('0x118')]>0x0)_0xa06aa5=_0x22210a('0xa9')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)['remove'](''));else{if(_0x355383[_0x22210a('0xf5')]<0x0||_0x355383[_0x22210a('0x118')]<0x0){if(_0x22210a('0x99')!==_0x22210a('0xea'))_0xa06aa5=_0x22210a('0xb0')['format'](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5],_0xea9372=_0xea9372['concat'](_0x59398['split'](/[\r\n]+/)['remove'](''));else{function _0x503488(){const _0x500d99=_0x22210a;return _0x5762a8[_0x500d99('0xce')]()&&(_0x51b90e[_0x500d99('0x75')](_0x500d99('0xa8')['format'](_0x22bee8)),_0x14e88c[_0x500d99('0x75')](_0x6ba29a)),!![];}}}}break;case Game_Action[_0x22210a('0x64')]:if(_0x355383[_0x22210a('0x12c')]===0x0)continue;_0xa06aa5=_0x22210a('0x5e')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5][_0x22210a('0xec')](_0x355383['dataId']),_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x22210a('0xb8')]:_0xa06aa5=_0x22210a('0x12f')['format'](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5][_0x22210a('0xec')](_0x355383[_0x22210a('0x12c')]),_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)[_0x22210a('0x46')](''));break;case Game_Action[_0x22210a('0x58')]:_0xa06aa5='AddBuff%1'['format'](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5]['format'](_0x459191[_0x355383[_0x22210a('0x12c')]]),_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)[_0x22210a('0x46')](''));break;case Game_Action[_0x22210a('0x16')]:_0xa06aa5=_0x22210a('0x6f')['format'](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5][_0x22210a('0xec')](_0x459191[_0x355383[_0x22210a('0x12c')]]),_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x22210a('0x12a')]:_0xa06aa5=_0x22210a('0xe2')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5][_0x22210a('0xec')](_0x459191[_0x355383[_0x22210a('0x12c')]]),_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)[_0x22210a('0x46')](''));break;case Game_Action[_0x22210a('0x151')]:_0xa06aa5=_0x22210a('0x4b')[_0x22210a('0xec')](_0x48ff79),_0x59398=_0x176fc9[_0xa06aa5][_0x22210a('0xec')](_0x459191[_0x355383[_0x22210a('0x12c')]]),_0xea9372=_0xea9372[_0x22210a('0xed')](_0x59398[_0x22210a('0x71')](/[\r\n]+/)['remove'](''));break;}}}return _0xea9372;},AIManager['forceValidTargets']=function(_0x57130a,_0x3028d6){const _0x2378fa=_0x44da21;this[_0x2378fa('0xee')]=this[_0x2378fa('0x1a')](_0x57130a,_0x3028d6);},AIManager[_0x44da21('0x97')]=function(){const _0x447557=_0x44da21;this[_0x447557('0xee')]=[];},AIManager['forcedTargets']=function(){const _0x38756d=_0x44da21;return this[_0x38756d('0xee')]=this['_forceValidTargets']||[],this['_forceValidTargets'];},AIManager[_0x44da21('0x11d')]=function(){const _0x444865=_0x44da21;return this[_0x444865('0x80')]()[_0x444865('0x130')]>0x0;},AIManager[_0x44da21('0xbc')]=function(_0x26f70d,_0x15e4d3){const _0x1997b3=_0x44da21;if(!_0x26f70d)return![];if(!_0x15e4d3)return![];if(!DataManager[_0x1997b3('0x91')](_0x15e4d3))return;if(this[_0x1997b3('0xd')](_0x15e4d3)){if(_0x1997b3('0x2e')!=='ymBKz'){function _0x2e13f4(){return _0x39a432(_0x9202c7['$1']);}}else return this[_0x1997b3('0x1a')](_0x26f70d,_0x15e4d3)[_0x1997b3('0x130')]>=0x1;}else{if(_0x1997b3('0x110')!==_0x1997b3('0x110')){function _0x1c0928(){this['selectAllActionsClassic'](_0x103de5);}}else return!![];}},AIManager['makeValidTargets']=function(_0x16a440,_0x2578ff){const _0x460552=_0x44da21;let _0x440034=[];if(this[_0x460552('0xd')](_0x2578ff)){const _0x14a742=this[_0x460552('0x48')](_0x2578ff),_0x30b61e=this[_0x460552('0x32')](_0x2578ff),_0x4b84a5=new Game_Action(_0x16a440);_0x4b84a5[_0x460552('0x124')](_0x2578ff['id']);let _0x9352ce=[];if(_0x4b84a5[_0x460552('0x42')]()){if(_0x460552('0x11b')==='YDTAu')_0x9352ce=$gameParty[_0x460552('0x83')]()[_0x460552('0xed')]($gameTroop[_0x460552('0x83')]());else{function _0x59545f(){const _0x2acc92=_0x460552;_0x217731=_0x2a9d40[_0x2acc92('0x83')]()[_0x2acc92('0xed')](_0x36edbc['aliveMembers']());}}}else{if(_0x4b84a5[_0x460552('0xba')]()){if('LKECE'!==_0x460552('0x14')){function _0x566534(){const _0x26d564=_0x460552;return _0x4bbd54[_0x26d564('0x96')];}}else _0x9352ce=_0x16a440[_0x460552('0xa7')]()[_0x460552('0x83')]();}else{if(_0x4b84a5[_0x460552('0xeb')]()){if(_0x460552('0x2')!==_0x460552('0x2')){function _0x4b340e(){const _0x3785a6=_0x460552;for(let _0x5c2458=0x0;_0x5c2458<this[_0x3785a6('0x14b')]();_0x5c2458++){const _0x1ad3e0=_0x2b91cc[0x0];this[_0x3785a6('0x73')](_0x5c2458)['setEnemyAction'](_0x1ad3e0);}}}else _0x9352ce=_0x16a440[_0x460552('0xcf')]()[_0x460552('0xcc')]();}else{if(_0x4b84a5[_0x460552('0x31')]()){if('mfmCy'===_0x460552('0x2a')){function _0x2d33cf(){const _0x158331=_0x460552;return _0x369fd6(_0x16c6d9['$1'])['toLowerCase']()[_0x158331('0x149')]();}}else _0x9352ce=_0x16a440[_0x460552('0xcf')]()[_0x460552('0x83')]();}}}}_0x440034=_0x9352ce[_0x460552('0xe5')](_0x3535a3=>this[_0x460552('0x76')](_0x16a440,_0x3535a3,_0x2578ff,_0x14a742,_0x30b61e));}return _0x440034;},AIManager[_0x44da21('0x76')]=function(_0x2b3b70,_0x44b5a0,_0xc3c225,_0x569f5a,_0x4000b8){const _0x540063=_0x44da21;return this[_0x540063('0x101')](_0x2b3b70,_0x44b5a0,_0xc3c225,_0x569f5a)&&this[_0x540063('0x146')](_0x2b3b70,_0x44b5a0,_0xc3c225,_0x4000b8);},AIManager[_0x44da21('0x101')]=function(_0x590cdb,_0x36fad1,_0xddb3c7,_0xd65a8d){const _0x5ebb49=_0x44da21;if(_0xd65a8d[_0x5ebb49('0x130')]<=0x0)return!![];for(const _0x5b7166 of _0xd65a8d){if(_0x5ebb49('0x100')!==_0x5ebb49('0xdf')){if(!_0x5b7166)continue;if(_0x5b7166['length']<=0x0)continue;if(!this['passesAILevel'](_0x590cdb))return!![];if(!this[_0x5ebb49('0x12d')](_0x590cdb,_0x36fad1,_0xddb3c7,_0x5b7166))return![];}else{function _0xc2afe7(){const _0x2dd78b=_0x5ebb49;return _0x11b2a5[_0x2dd78b('0x10c')]['meetsMpCondition'][_0x2dd78b('0x5f')](this,_0x2bb82a,_0x350904);}}}return!![];},AIManager[_0x44da21('0x146')]=function(_0x3c362c,_0x163d23,_0x307854,_0x3d8f6e){const _0x48b3a9=_0x44da21;if(_0x3d8f6e[_0x48b3a9('0x130')]<=0x0)return!![];for(const _0x47c930 of _0x3d8f6e){if(_0x48b3a9('0x120')===_0x48b3a9('0x120')){if(!_0x47c930)continue;if(_0x47c930[_0x48b3a9('0x130')]<=0x0)continue;if(!this[_0x48b3a9('0x95')](_0x3c362c))return!![];if(this[_0x48b3a9('0x12d')](_0x3c362c,_0x163d23,_0x307854,_0x47c930))return!![];}else{function _0x25db07(){const _0x5effc1=_0x48b3a9;this[_0x5effc1('0x9')](_0x3bafad);}}}return![];},AIManager[_0x44da21('0x95')]=function(_0x22e9ae){const _0x218cf9=_0x44da21,_0x3ac3d4=_0x22e9ae[_0x218cf9('0x106')]();return Math[_0x218cf9('0xfd')](0x64)<_0x3ac3d4;},AIManager['doesTargetMeetCondition']=function(_0x1a0f2b,_0x51121e,_0xf7acc4,_0x42d689){const _0x5aa1ee=_0x44da21,_0x354766=[_0x5aa1ee('0xfc'),_0x5aa1ee('0x62'),'ATK','DEF',_0x5aa1ee('0x11f'),_0x5aa1ee('0x3f'),_0x5aa1ee('0xca'),_0x5aa1ee('0x6')];if(_0x42d689[_0x5aa1ee('0x10d')]()[_0x5aa1ee('0x149')]()==='ALWAYS')return!![];const _0x3e874f=_0x1a0f2b;if(_0x42d689[_0x5aa1ee('0x11c')](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){const _0x56b075=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x25e1a6=this[_0x5aa1ee('0x14d')](_0x1a0f2b,_0x51121e,_0xf7acc4,_0x56b075[0x0]),_0xb0012e=_0x56b075[0x1],_0x17c0ed=this[_0x5aa1ee('0x14d')](_0x1a0f2b,_0x51121e,_0xf7acc4,_0x56b075[0x2]),_0x2109ea=_0x5aa1ee('0x128')['format'](_0x25e1a6,_0xb0012e,_0x17c0ed);try{return eval(_0x2109ea);}catch(_0x4c1b33){if(_0x5aa1ee('0x7e')!==_0x5aa1ee('0x7e')){function _0x46a315(){const _0x229ee1=_0x5aa1ee;let _0x404a20=_0x548d8b[_0x229ee1('0x87')]['Game_BattlerBase_sparam'][_0x229ee1('0x5f')](this,_0x45cf17);return _0x547dc8===0x0&&(_0x404a20*=this[_0x229ee1('0xe7')]()),_0x404a20;}}else return $gameTemp[_0x5aa1ee('0xce')]()&&(console[_0x5aa1ee('0x75')](_0x5aa1ee('0xa8')[_0x5aa1ee('0xec')](_0x42d689)),console[_0x5aa1ee('0x75')](_0x4c1b33)),!![];}}else{if(_0x42d689[_0x5aa1ee('0x11c')](/(\d+\.?\d*)([%％]) CHANCE/i)){if(_0x5aa1ee('0x69')==='arjyT'){function _0x113cbe(){const _0x5e7e60=_0x5aa1ee;_0x37543e[_0x5e7e60('0x10c')][_0x5e7e60('0x5b')][_0x5e7e60('0x5f')](this);if(this[_0x5e7e60('0x14b')]()>0x0){const _0x2abf6f=this[_0x5e7e60('0xab')]()[_0x5e7e60('0x137')][_0x5e7e60('0xe5')](_0x43a151=>this['isActionValid'](_0x43a151));_0x2abf6f[_0x5e7e60('0x130')]>0x0&&this['selectAllActions'](_0x2abf6f);}}}else{const _0x3b82d1=Number(RegExp['$1'])*0.01;return Math[_0x5aa1ee('0x81')]()<_0x3b82d1;}}else{if(_0x42d689[_0x5aa1ee('0x11c')](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){if(_0x5aa1ee('0x7a')!==_0x5aa1ee('0x7a')){function _0x321fb7(){const _0x20c217=_0x5aa1ee;_0x5aaf3d=_0x20c217('0x36')['format'](_0x106924),_0xdf11dc=_0x29f3e7[_0x4b19c5],_0x444ace=_0x447d35[_0x20c217('0xed')](_0x110467['split'](/[\r\n]+/)[_0x20c217('0x46')](''));}}else{const _0x35a2ab=Number(RegExp['$1']),_0x3d1be0=String(RegExp['$2'])[_0x5aa1ee('0xf8')](),_0x5b3b41=_0x3d1be0[_0x5aa1ee('0x11c')](/ON|TRUE/i);return $gameSwitches[_0x5aa1ee('0x14c')](_0x35a2ab)===_0x5b3b41;}}else{if(_0x42d689[_0x5aa1ee('0x11c')](/(.*) IS ACTOR/i)){const _0x64391d=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e;return _0x64391d['isActor']();}else{if(_0x42d689[_0x5aa1ee('0x11c')](/(.*) IS ENEMY/i)){if(_0x5aa1ee('0xc1')!==_0x5aa1ee('0xc1')){function _0x20d72d(){const _0x5b919d=_0x5aa1ee;return this[_0x5b919d('0xc4')]()>0x0;}}else{const _0x9f39a8=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e;return _0x9f39a8['isEnemy']();}}else{if(_0x42d689[_0x5aa1ee('0x11c')](/(.*) HAS STATE (\d+)/i)){const _0x1dd1f2=$dataStates[Number(RegExp['$2'])],_0x383d81=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e;return _0x383d81[_0x5aa1ee('0xd2')]()['includes'](_0x1dd1f2);}else{if(_0x42d689[_0x5aa1ee('0x11c')](/(.*) HAS STATE (.*)/i)){const _0x148351=$dataStates[DataManager[_0x5aa1ee('0xfe')](RegExp['$2'])],_0x48e608=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e;return _0x48e608[_0x5aa1ee('0xd2')]()[_0x5aa1ee('0x152')](_0x148351);}else{if(_0x42d689['match'](/(.*) NOT STATE (\d+)/i)){if(_0x5aa1ee('0x125')!==_0x5aa1ee('0x53')){const _0x1e7d5c=$dataStates[Number(RegExp['$2'])],_0x1df2ae=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e;return!_0x1df2ae[_0x5aa1ee('0xd2')]()[_0x5aa1ee('0x152')](_0x1e7d5c);}else{function _0x5c13a8(){const _0x4d0bb7=_0x5aa1ee,_0x4e929e=_0x5acef8[_0x4d0bb7('0x9f')](_0x2f903d(_0xe53925['$1'])[_0x4d0bb7('0x10d')]()[_0x4d0bb7('0x149')]()),_0x149d56=_0x845f09(_0x5bae2b['$2'])[_0x4d0bb7('0xf8')]()[_0x4d0bb7('0x149')]();if(_0x149d56===_0x4d0bb7('0xdd')&&_0x437cf3[_0x4d0bb7('0x90')](_0x4e929e))return _0x41bc1a['_buffTurns'][_0x4e929e];else{if(_0x149d56==='debuff'&&_0x24c0ac[_0x4d0bb7('0x2d')](_0x4e929e))return _0x5f2d81[_0x4d0bb7('0x9c')][_0x4e929e];}return 0x0;}}}else{if(_0x42d689['match'](/(.*) NOT STATE (.*)/i)){const _0x33a589=$dataStates[DataManager[_0x5aa1ee('0xfe')](RegExp['$2'])],_0x5debb1=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e;return!_0x5debb1[_0x5aa1ee('0xd2')]()[_0x5aa1ee('0x152')](_0x33a589);}else{if(_0x42d689['match'](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x45b33f=_0x354766[_0x5aa1ee('0x9f')](String(RegExp['$2'])[_0x5aa1ee('0x10d')]()[_0x5aa1ee('0x149')]()),_0x1ab4fb=String(RegExp['$3'])[_0x5aa1ee('0xf8')]()['trim'](),_0x368486=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e,_0x8d0da3='is%1Affected'[_0x5aa1ee('0xec')](_0x1ab4fb['charAt'](0x0)[_0x5aa1ee('0x10d')]()+_0x1ab4fb[_0x5aa1ee('0x27')](0x1));return _0x368486[_0x8d0da3](_0x45b33f);}else{if(_0x42d689[_0x5aa1ee('0x11c')](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x1a0e13=_0x354766[_0x5aa1ee('0x9f')](String(RegExp['$2'])['toUpperCase']()[_0x5aa1ee('0x149')]()),_0x1df182=String(RegExp['$3'])['toLowerCase']()['trim'](),_0x235037=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e,_0x441f75=_0x5aa1ee('0x70')[_0x5aa1ee('0xec')](_0x1df182[_0x5aa1ee('0xb6')](0x0)['toUpperCase']()+_0x1df182[_0x5aa1ee('0x27')](0x1));return _0x235037[_0x441f75](_0x1a0e13);}else{if(_0x42d689[_0x5aa1ee('0x11c')](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x2d4d5b=_0x354766[_0x5aa1ee('0x9f')](String(RegExp['$2'])[_0x5aa1ee('0x10d')]()[_0x5aa1ee('0x149')]()),_0x407dca=String(RegExp['$3'])[_0x5aa1ee('0xf8')]()[_0x5aa1ee('0x149')](),_0x4be8de=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e,_0x51bae4=_0x5aa1ee('0x112')[_0x5aa1ee('0xec')](_0x407dca[_0x5aa1ee('0xb6')](0x0)['toUpperCase']()+_0x407dca[_0x5aa1ee('0x27')](0x1));return!_0x4be8de[_0x51bae4](_0x2d4d5b);}else{if(_0x42d689[_0x5aa1ee('0x11c')](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){if(_0x5aa1ee('0x85')!==_0x5aa1ee('0x85')){function _0x108f13(){const _0x3d1a5c=_0x5aa1ee;if(_0x3b96b3[_0x3d1a5c('0x73')]&&_0x44039e[_0x3d1a5c('0x73')][_0x3d1a5c('0x72')]())return 0x1;}}else{const _0x36a423=_0x354766[_0x5aa1ee('0x9f')](String(RegExp['$2'])[_0x5aa1ee('0x10d')]()[_0x5aa1ee('0x149')]()),_0x303f8d=String(RegExp['$3'])[_0x5aa1ee('0xf8')]()[_0x5aa1ee('0x149')](),_0x5e6d40=String(RegExp['$1'])[_0x5aa1ee('0x11c')](/(?:USER|SUBJECT)/i)?_0x3e874f:_0x51121e,_0x110f55=_0x5aa1ee('0x70')[_0x5aa1ee('0xec')](_0x303f8d[_0x5aa1ee('0xb6')](0x0)[_0x5aa1ee('0x10d')]()+_0x303f8d[_0x5aa1ee('0x27')](0x1));return!_0x5e6d40[_0x110f55](_0x36a423);}}}}}}}}}}}}}}return!![];},AIManager[_0x44da21('0x14d')]=function(_0x2e19f9,_0x3ceffb,_0x28ce41,_0x4b9447){const _0x9c7839=_0x44da21,_0x35c488=[_0x9c7839('0xfc'),_0x9c7839('0x62'),_0x9c7839('0x13d'),'DEF',_0x9c7839('0x11f'),_0x9c7839('0x3f'),_0x9c7839('0xca'),'LUK'],_0x23e101=_0x2e19f9,_0xb32830=_0x23e101,_0x57a20e=_0x3ceffb,_0x17f172=_0x4b9447,_0x2a979d=_0x23e101['opponentsUnit']();let _0xe5543f=_0x4b9447[_0x9c7839('0x11c')](/(?:USER|SUBJECT)/i)?_0x23e101:_0x3ceffb;_0x4b9447=_0x4b9447['replace'](/\b(\d+)([%％])/gi,(_0xe47c5a,_0x598689)=>Number(_0x598689)*0.01);if(_0x4b9447['match'](/(?:VAR|VARIABLE) (\d+)/i)){if(_0x9c7839('0x52')!=='MgTsL'){function _0x3793c3(){return![];}}else return $gameVariables[_0x9c7839('0x14c')](Number(RegExp['$1']));}if(_0x4b9447[_0x9c7839('0x11c')](/TEAM ALIVE MEMBERS/i))return _0xe5543f['friendsUnit']()[_0x9c7839('0x83')]()[_0x9c7839('0x130')];if(_0x4b9447[_0x9c7839('0x11c')](/TEAM DEAD MEMBERS/i)){if(_0x9c7839('0x49')!==_0x9c7839('0x49')){function _0x3f7880(){const _0x252d4c=_0x9c7839,_0x17ea69=_0x2da6c1(_0x19b054['$1']);return this[_0x252d4c('0x84')](_0xfdfebe,_0x27bd24,_0x11d77e,_0x17ea69);}}else return _0xe5543f[_0x9c7839('0xcf')]()[_0x9c7839('0xcc')]()['length'];}if(_0x4b9447[_0x9c7839('0x11c')](/ELEMENT (\d+) RATE/i)){const _0x263122=Number(RegExp['$1']);return this[_0x9c7839('0x84')](_0x2e19f9,_0x3ceffb,_0xe5543f,_0x263122);}else{if(_0x4b9447['match'](/ELEMENT (.*) RATE/i)){const _0x3f22b0=DataManager[_0x9c7839('0x132')](String(RegExp['$1']));return this['elementKnowledgeRate'](_0x2e19f9,_0x3ceffb,_0xe5543f,_0x3f22b0);}else{if(_0x4b9447[_0x9c7839('0x11c')](/(.*) ELEMENT RATE/i)){if(_0x9c7839('0xc9')!==_0x9c7839('0xc9')){function _0x55dd36(){return 0x0;}}else{const _0x479073=DataManager[_0x9c7839('0x132')](String(RegExp['$1']));return this[_0x9c7839('0x84')](_0x2e19f9,_0x3ceffb,_0xe5543f,_0x479073);}}}}if(_0x4b9447[_0x9c7839('0x11c')](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){if(_0x9c7839('0x148')===_0x9c7839('0x148')){const _0x4946da=_0x35c488[_0x9c7839('0x9f')](String(RegExp['$1'])[_0x9c7839('0x10d')]()[_0x9c7839('0x149')]()),_0x2612d7=String(RegExp['$2'])[_0x9c7839('0xf8')]()[_0x9c7839('0x149')]();return _0xe5543f[_0x9c7839('0xdd')](_0x4946da)*(_0x2612d7===_0x9c7839('0xdd')?0x1:-0x1);}else{function _0x286de9(){const _0x3ecbe4=_0x9c7839;if(!_0x1f28bd[_0x3ecbe4('0x87')][_0x3ecbe4('0x15a')][_0x3ecbe4('0x113')]['LearnKnowledge'])return!![];this[_0x3ecbe4('0x153')]()[_0x3ecbe4('0xbe')]=this[_0x3ecbe4('0x153')]()['elementRates']||{};const _0xeff874=this[_0x3ecbe4('0x153')]()[_0x3ecbe4('0xbe')];_0xeff874[_0x553999]=_0xeff874[_0x16aebf]||[];const _0x2694be=_0x1fbb06[_0x3ecbe4('0x19')]()?_0x404b31['actorId']():_0x33bef7[_0x3ecbe4('0x65')]();return _0xeff874[_0x221fd3][_0x3ecbe4('0x152')](_0x2694be);}}}if(_0x4b9447[_0x9c7839('0x11c')](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){if('Zyrle'!=='LPAgN'){const _0xfdae53=_0x35c488[_0x9c7839('0x9f')](String(RegExp['$1'])[_0x9c7839('0x10d')]()[_0x9c7839('0x149')]()),_0x2d3bff=String(RegExp['$2'])[_0x9c7839('0xf8')]()[_0x9c7839('0x149')]();if(_0x2d3bff==='buff'&&_0xe5543f['isBuffAffected'](_0xfdae53)){if(_0x9c7839('0x74')===_0x9c7839('0x12e')){function _0x3b1864(){return _0x1edc92['tpRate']();}}else return _0xe5543f[_0x9c7839('0x9c')][_0xfdae53];}else{if(_0x2d3bff===_0x9c7839('0x123')&&_0xe5543f[_0x9c7839('0x2d')](_0xfdae53))return _0xe5543f[_0x9c7839('0x9c')][_0xfdae53];}return 0x0;}else{function _0x44e937(){const _0xa3856=_0x9c7839;return _0x34fa10(_0x178181['$1'])[_0xa3856('0x71')](/[\r\n]+/)[_0xa3856('0x46')]('');}}}if(_0x4b9447[_0x9c7839('0x11c')](/STATE (\d+) (?:TURN|TURNS)/i)){const _0x43e649=Number(RegExp['$1']);if(_0xe5543f[_0x9c7839('0x2b')](_0x43e649)){const _0x72752e=$dataStates[_0x43e649];if(_0x72752e&&_0x72752e[_0x9c7839('0x5')]===0x0){if('ZCgns'===_0x9c7839('0xac')){function _0x7a97f(){const _0x28df12=_0x9c7839;return _0x1038e9[_0x28df12('0x51')];}}else return Number[_0x9c7839('0x96')];}else return _0xe5543f[_0x9c7839('0x138')][_0x43e649]||0x0;}else{if(_0xe5543f[_0x9c7839('0xd2')]()[_0x9c7839('0x152')]($dataStates[_0x43e649])){if('mMRnj'!==_0x9c7839('0xaf'))return Number[_0x9c7839('0x96')];else{function _0x40963f(){const _0x113e0d=_0x9c7839;_0x5f0998[_0x113e0d('0x10c')][_0x113e0d('0xd4')][_0x113e0d('0x5f')](this,_0x370c0d);}}}else return 0x0;}}else{if(_0x4b9447[_0x9c7839('0x11c')](/STATE (.*) (?:TURN|TURNS)/i)){if('qvKFw'!=='CwXrW'){const _0x13a4ca=DataManager[_0x9c7839('0xfe')](RegExp['$1']);if(_0xe5543f['isStateAffected'](_0x13a4ca)){const _0x3297b6=$dataStates[_0x13a4ca];if(_0x3297b6&&_0x3297b6[_0x9c7839('0x5')]===0x0)return Number['MAX_SAFE_INTEGER'];else{if(_0x9c7839('0x30')===_0x9c7839('0x30'))return _0xe5543f['_stateTurns'][_0x13a4ca]||0x0;else{function _0x5d3527(){const _0x2312d9=_0x9c7839,_0xd52451=_0x4f98fd['indexOf'](_0x237a8d(_0xcdae23['$2'])['toUpperCase']()[_0x2312d9('0x149')]()),_0x2a0b69=_0x397f7c(_0x198506['$3'])[_0x2312d9('0xf8')]()[_0x2312d9('0x149')](),_0x50dde3=_0x11c88b(_0x579a99['$1'])[_0x2312d9('0x11c')](/(?:USER|SUBJECT)/i)?_0x2b7048:_0x5efd93,_0x413ec3=_0x2312d9('0x112')[_0x2312d9('0xec')](_0x2a0b69[_0x2312d9('0xb6')](0x0)['toUpperCase']()+_0x2a0b69[_0x2312d9('0x27')](0x1));return!_0x50dde3[_0x413ec3](_0xd52451);}}}}else{if(_0xe5543f[_0x9c7839('0xd2')]()['includes']($dataStates[_0x13a4ca])){if(_0x9c7839('0x4c')!==_0x9c7839('0x41'))return Number[_0x9c7839('0x96')];else{function _0x8474e9(){const _0x152e67=_0x9c7839;_0xaafaa2[_0x152e67('0x75')](_0x152e67('0xc')['format'](_0x576d05)),_0x1a5540[_0x152e67('0x75')](_0x1ba384);}}}else{if('JPZsq'===_0x9c7839('0x6e')){function _0x37c9e3(){const _0x3df9a9=_0x9c7839;return _0x296644[_0x3df9a9('0x1c')]&&_0x317cac[_0x3df9a9('0x15b')][_0x3df9a9('0x152')]('['+_0x26f804+']');}}else return 0x0;}}}else{function _0x386c38(){const _0x133c18=_0x9c7839;_0x574514=_0x49343c[_0x133c18('0xcf')]()[_0x133c18('0xcc')]();}}}}if(_0x4b9447[_0x9c7839('0x11c')](/\bHP([%％])/i))return _0xe5543f['hpRate']();else{if(_0x4b9447['match'](/\bMP([%％])/i))return _0xe5543f[_0x9c7839('0x127')]();else{if(_0x4b9447[_0x9c7839('0x11c')](/\bTP([%％])/i))return _0xe5543f[_0x9c7839('0x140')]();else{if(_0x4b9447[_0x9c7839('0x11c')](/\b(?:MAXHP|MAX HP|MHP)\b/i))return _0xe5543f[_0x9c7839('0x10b')];else{if(_0x4b9447['match'](/\b(?:MAXMP|MAX MP|MMP)\b/i))return _0xe5543f[_0x9c7839('0xc5')];else{if(_0x4b9447[_0x9c7839('0x11c')](/\b(?:MAXTP|MAX TP|MTP)\b/i)){if(_0x9c7839('0xc7')!=='hgstU'){function _0x12a522(){return _0x3af176['_buffTurns'][_0x2d0d7d];}}else return _0xe5543f[_0x9c7839('0x20')]();}}}}}}if(_0x4b9447[_0x9c7839('0x11c')](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i))return _0xe5543f[String(RegExp['$1'])[_0x9c7839('0xf8')]()[_0x9c7839('0x149')]()];try{return eval(_0x4b9447);}catch(_0x36afc1){return $gameTemp[_0x9c7839('0xce')]()&&(console[_0x9c7839('0x75')](_0x9c7839('0xc')['format'](_0x17f172)),console[_0x9c7839('0x75')](_0x36afc1)),0x0;}},AIManager[_0x44da21('0x84')]=function(_0x565589,_0x30ab77,_0x181861,_0x1bcdba){const _0x24536f=_0x44da21;if(_0x565589['isActor']()===_0x181861['isActor']()){if(_0x24536f('0xd5')===_0x24536f('0xd5'))return _0x181861['elementRate'](_0x1bcdba);else{function _0x35303f(){const _0x399b12=_0x24536f;this[_0x399b12('0x73')](_0x25de46)[_0x399b12('0x55')](this[_0x399b12('0x39')](_0x5739e8,_0xa1e25d));}}}else return _0x181861[_0x24536f('0xa7')]()[_0x24536f('0x45')](_0x1bcdba,_0x181861)?_0x181861[_0x24536f('0xd7')](_0x1bcdba):VisuMZ[_0x24536f('0x87')][_0x24536f('0x15a')][_0x24536f('0x113')][_0x24536f('0xd1')];},DataManager[_0x44da21('0x132')]=function(_0x2e7b4e){const _0x5e455f=_0x44da21;_0x2e7b4e=_0x2e7b4e[_0x5e455f('0x10d')]()[_0x5e455f('0x149')](),this[_0x5e455f('0xe')]=this['_elementIDs']||{};if(this['_elementIDs'][_0x2e7b4e])return this[_0x5e455f('0xe')][_0x2e7b4e];let _0x3ace32=0x1;for(const _0x294d50 of $dataSystem[_0x5e455f('0xf7')]){if(_0x5e455f('0x7d')!==_0x5e455f('0x114')){if(!_0x294d50)continue;let _0x47da76=_0x294d50[_0x5e455f('0x10d')]();_0x47da76=_0x47da76['replace'](/\x1I\[(\d+)\]/gi,''),_0x47da76=_0x47da76[_0x5e455f('0x102')](/\\I\[(\d+)\]/gi,''),this[_0x5e455f('0xe')][_0x47da76]=_0x3ace32,_0x3ace32++;}else{function _0x33e452(){const _0x55a063=_0x5e455f,_0xce2b0a=_0x222f7b[_0x55a063('0x106')]();return _0xa00a11['randomInt'](0x64)<_0xce2b0a;}}}return this[_0x5e455f('0xe')][_0x2e7b4e]||0x0;},DataManager[_0x44da21('0xfe')]=function(_0x6d104e){const _0x4bd0f8=_0x44da21;_0x6d104e=_0x6d104e['toUpperCase']()[_0x4bd0f8('0x149')](),this[_0x4bd0f8('0x10a')]=this[_0x4bd0f8('0x10a')]||{};if(this[_0x4bd0f8('0x10a')][_0x6d104e])return this['_stateIDs'][_0x6d104e];for(const _0x594fc8 of $dataStates){if(!_0x594fc8)continue;this[_0x4bd0f8('0x10a')][_0x594fc8['name'][_0x4bd0f8('0x10d')]()[_0x4bd0f8('0x149')]()]=_0x594fc8['id'];}return this[_0x4bd0f8('0x10a')][_0x6d104e]||0x0;},VisuMZ[_0x44da21('0x87')][_0x44da21('0x9d')]=BattleManager[_0x44da21('0x60')],BattleManager['startAction']=function(){const _0x59089e=_0x44da21;this['determineActionByAIisStillValid'](),VisuMZ[_0x59089e('0x87')]['BattleManager_startAction']['call'](this);},BattleManager[_0x44da21('0xa4')]=function(){const _0x5f2eaa=_0x44da21,_0x254a1c=this[_0x5f2eaa('0x139')];if(_0x254a1c['aiStyle']()===_0x5f2eaa('0x81'))return;if(!_0x254a1c[_0x5f2eaa('0x142')]())return;const _0x4f7612=_0x254a1c['currentAction'](),_0x3559a9=_0x4f7612[_0x5f2eaa('0x23')]();if(AIManager['hasValidTargets'](_0x254a1c,_0x3559a9))return;_0x254a1c[_0x5f2eaa('0x5b')]();},VisuMZ[_0x44da21('0x87')][_0x44da21('0x28')]=Game_Temp[_0x44da21('0x10c')][_0x44da21('0x158')],Game_Temp[_0x44da21('0x10c')][_0x44da21('0x158')]=function(){const _0x57c0ec=_0x44da21;VisuMZ['BattleAI'][_0x57c0ec('0x28')][_0x57c0ec('0x5f')](this),this['clearAiTgrInfluence']();},Game_Temp[_0x44da21('0x10c')][_0x44da21('0xe8')]=function(){this['_aiTgrInfluence']={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0};},Game_Temp[_0x44da21('0x10c')][_0x44da21('0x8c')]=function(){const _0x30c56a=_0x44da21;if(this['_aiTgrInfluence']===undefined)this[_0x30c56a('0xe8')]();return this['_aiTgrInfluence'];},Game_Temp[_0x44da21('0x10c')]['setAiTgrInfluences']=function(_0x1a865e,_0x1c26ac){const _0x5bed7f=_0x44da21;this[_0x5bed7f('0xe8')]();const _0x51cc04=this[_0x5bed7f('0x8c')]();_0x51cc04['action']=_0x1c26ac;if(_0x1a865e[_0x5bed7f('0x8d')]()){if(_0x5bed7f('0x6b')===_0x5bed7f('0x47')){function _0x26614c(){const _0x54bbb4=_0x5bed7f;_0x53aad2=_0x54bbb4('0x18')['format'](_0x93b117),_0x5aa2a6=_0x55a123[_0x556d1b],_0x31b987=_0x110388['concat'](_0x429fbe[_0x54bbb4('0x71')](/[\r\n]+/)[_0x54bbb4('0x46')](''));}}else{_0x51cc04[_0x5bed7f('0x13c')]=!![],_0x51cc04[_0x5bed7f('0xb7')]=_0x1a865e['aiApplyElementalTgrInfluenceRate'](),_0x51cc04['elementIds']=[];if(Imported['VisuMZ_1_ElementStatusCore']){if('jUKIV'===_0x5bed7f('0xb5')){function _0x5bfdcb(){const _0x2915f0=_0x5bed7f,_0x5b66a3=_0xfdb57['getElementIdWithName'](_0x5ea887(_0x227659['$1']));return this[_0x2915f0('0x84')](_0x29369f,_0x347f33,_0xb40745,_0x5b66a3);}}else _0x51cc04[_0x5bed7f('0xcb')]=_0x51cc04['elementIds'][_0x5bed7f('0xed')](_0x1c26ac[_0x5bed7f('0xf7')]());}else{if(_0x1c26ac[_0x5bed7f('0x23')]()[_0x5bed7f('0xa0')][_0x5bed7f('0x11a')]<0x0){if(_0x5bed7f('0x82')===_0x5bed7f('0x7c')){function _0xca14ee(){const _0xbafd90=_0x5bed7f;_0x2876cc[_0xbafd90('0x75')]('AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1'[_0xbafd90('0xec')](_0x2b8699)),_0x449af2[_0xbafd90('0x75')](_0x3a06e4);}}else _0x51cc04['elementIds']=_0x51cc04[_0x5bed7f('0xcb')][_0x5bed7f('0xed')](_0x1a865e['attackElements']());}else _0x51cc04[_0x5bed7f('0xcb')]['push'](_0x1c26ac[_0x5bed7f('0x23')]()[_0x5bed7f('0xa0')][_0x5bed7f('0x11a')]);}}}if(_0x1c26ac[_0x5bed7f('0x143')]()&&_0x1a865e[_0x5bed7f('0xc6')]()){if('RiZNw'!==_0x5bed7f('0x115')){function _0x1886ee(){const _0x29dd94=_0x5bed7f;if(this[_0x29dd94('0x19')]()||this[_0x29dd94('0x12')]()){const _0x41e754=this[_0x29dd94('0x19')]()?this['actor']()['note']:this['enemy']()[_0x29dd94('0xda')];if(_0x41e754['match'](_0x19f3ff['_regexp'][_0x29dd94('0x0')]))return![];else{if(_0x41e754[_0x29dd94('0x11c')](_0x4ca928[_0x29dd94('0x14e')][_0x29dd94('0x93')]))return this[_0x29dd94('0x86')]()>0x0;}}return _0x80f7a9[_0x29dd94('0x87')][_0x29dd94('0x15a')][_0x29dd94('0x3e')]['EvaTgr'];}}else _0x51cc04['evaInfluenceRate']=_0x1a865e[_0x5bed7f('0x86')]();}_0x1c26ac[_0x5bed7f('0x126')]()&&_0x1a865e['doesAIApplyMevTgrInfluence']()&&(_0x51cc04[_0x5bed7f('0xbf')]=_0x1a865e['aiApplyMevTgrInfluenceRate']());},VisuMZ[_0x44da21('0x87')][_0x44da21('0x9a')]=Game_Action['prototype'][_0x44da21('0x109')],Game_Action[_0x44da21('0x10c')][_0x44da21('0x109')]=function(){const _0x440e22=_0x44da21;this[_0x440e22('0x10f')]()[_0x440e22('0x142')]()&&this['isSkill']()&&AIManager[_0x440e22('0x154')](this[_0x440e22('0x10f')](),this['item']());$gameTemp[_0x440e22('0xae')](this[_0x440e22('0x10f')](),this);const _0x4f2847=VisuMZ[_0x440e22('0x87')]['Game_Action_makeTargets']['call'](this);return $gameTemp['clearAiTgrInfluence'](),AIManager[_0x440e22('0x97')](),_0x4f2847;},VisuMZ[_0x44da21('0x87')][_0x44da21('0x98')]=Game_Action[_0x44da21('0x10c')][_0x44da21('0x6d')],Game_Action[_0x44da21('0x10c')][_0x44da21('0x6d')]=function(){const _0x5794c3=_0x44da21,_0x4e0430=this['subject'](),_0x4d1f47=this['item']();let _0x47e83f=VisuMZ[_0x5794c3('0x87')][_0x5794c3('0x98')][_0x5794c3('0x5f')](this);if(_0x4e0430['isDetermineActionByAI']()&&AIManager[_0x5794c3('0xbc')](_0x4e0430,_0x4d1f47)){let _0x47c70d=AIManager['makeValidTargets'](_0x4e0430,_0x4d1f47);_0x47e83f=_0x47e83f[_0x5794c3('0xe5')](_0x3baad0=>_0x47c70d[_0x5794c3('0x152')](_0x3baad0));}return _0x47e83f;},VisuMZ[_0x44da21('0x87')][_0x44da21('0x134')]=Game_Action[_0x44da21('0x10c')][_0x44da21('0xc2')],Game_Action[_0x44da21('0x10c')]['apply']=function(_0x152976){const _0x57a395=_0x44da21;VisuMZ['BattleAI'][_0x57a395('0x134')][_0x57a395('0x5f')](this,_0x152976),this[_0x57a395('0x38')](_0x152976);},Game_Action[_0x44da21('0x10c')]['applyBattleAI']=function(_0x28834d){const _0x2c17cf=_0x44da21;if(!_0x28834d)return;if(this['subject']()['isActor']()===_0x28834d[_0x2c17cf('0x19')]())return;let _0x21dac3=[];if(Imported[_0x2c17cf('0x59')])_0x21dac3=this[_0x2c17cf('0xf7')]();else{if(this['item']()[_0x2c17cf('0xa0')]['elementId']<0x0){if(_0x2c17cf('0x4d')!==_0x2c17cf('0x2f'))_0x21dac3=this[_0x2c17cf('0x10f')]()['attackElements']();else{function _0x152ca2(){const _0x1d8c1e=_0x2c17cf;if(!_0x50cc09['BattleAI'][_0x1d8c1e('0x15a')][_0x1d8c1e('0xd8')][_0x1d8c1e('0x8a')])return[];if(_0x3e4704[_0x1d8c1e('0xda')]['match'](_0x3269b5['_regexp'][_0x1d8c1e('0x117')]))return[];return this[_0x1d8c1e('0x88')](_0xf4af03,_0x1d8c1e('0xe4'));}}}else{if(_0x2c17cf('0x89')==='gYVgj')_0x21dac3=[this[_0x2c17cf('0x23')]()[_0x2c17cf('0xa0')][_0x2c17cf('0x11a')]];else{function _0x112aa6(){const _0x1485a2=_0x2c17cf;_0x42aee7(_0x1485a2('0x78')[_0x1485a2('0xec')](_0x1fedfd,_0x208409,_0x286d28)),_0x12e90a['exit']();}}}}_0x28834d['addAIKnowledge'](_0x21dac3,this[_0x2c17cf('0x143')](),this['isMagical']());},VisuMZ[_0x44da21('0x87')]['Game_BattlerBase_sparam']=Game_BattlerBase[_0x44da21('0x10c')][_0x44da21('0xb4')],Game_BattlerBase[_0x44da21('0x10c')][_0x44da21('0xb4')]=function(_0x3c5e31){const _0x3dc07a=_0x44da21;let _0x3ddebb=VisuMZ['BattleAI'][_0x3dc07a('0x3b')]['call'](this,_0x3c5e31);return _0x3c5e31===0x0&&(_0x3ddebb*=this[_0x3dc07a('0xe7')]()),_0x3ddebb;},Game_BattlerBase[_0x44da21('0x10c')]['applyBattleAiTgrInfluences']=function(){const _0x465735=_0x44da21,_0x3fc8e5=$gameTemp[_0x465735('0x8c')](),_0x5c3e67=this[_0x465735('0xa7')]();if(Imported[_0x465735('0x3c')]){if(_0x465735('0x14f')!==_0x465735('0x14f')){function _0x353e6f(){const _0x4dedf0=_0x465735;return _0x104ffe(_0x3ac0cf['$1'])[_0x4dedf0('0xf8')]()[_0x4dedf0('0x149')]();}}else{if(_0x3fc8e5['action']&&_0x3fc8e5['action'][_0x465735('0x72')]())return 0x1;}}let _0x33ac1f=0x1;if(_0x3fc8e5[_0x465735('0x13c')]){if(_0x465735('0x111')!==_0x465735('0x111')){function _0x8708e4(){const _0xc2383=_0x465735;let _0x5bf532=_0x3fae71['randomInt'](_0x339375);for(const _0xf3e155 of _0x4b5457){_0x5bf532-=_0xf3e155[_0xc2383('0x66')]-_0x1c9f82;if(_0x5bf532<=0x0)return _0xf3e155;}}}else for(const _0x1848f2 of _0x3fc8e5[_0x465735('0xcb')]){if(_0x465735('0x12b')===_0x465735('0x104')){function _0x4913e6(){return this['aiApplyElementalTgrInfluenceRate']()>0x0;}}else _0x5c3e67[_0x465735('0x45')](_0x1848f2,this)&&(_0x33ac1f*=this[_0x465735('0xd7')](_0x1848f2)*_0x3fc8e5['elementInfluenceRate']);}}return _0x5c3e67[_0x465735('0x7b')]('eva',this)&&(_0x33ac1f*=0x1-this[_0x465735('0xa5')]*_0x3fc8e5['evaInfluenceRate']),_0x5c3e67[_0x465735('0x7b')]('mev',this)&&(_0x33ac1f*=0x1-this[_0x465735('0xf9')]*_0x3fc8e5[_0x465735('0xbf')]),_0x33ac1f[_0x465735('0x107')](0.001,0x3e8);},Game_BattlerBase[_0x44da21('0x10c')]['aiStyle']=function(){return'classic';},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x142')]=function(){return!![];},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x5b')]=function(){},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x8d')]=function(){const _0x1887b8=_0x44da21;if(this['isActor']()||this[_0x1887b8('0x12')]()){if(_0x1887b8('0x8')===_0x1887b8('0x8')){const _0x464648=this['isActor']()?this['actor']()[_0x1887b8('0xda')]:this[_0x1887b8('0xab')]()['note'];if(_0x464648[_0x1887b8('0x11c')](AIManager[_0x1887b8('0x14e')][_0x1887b8('0xde')]))return![];else{if(_0x464648[_0x1887b8('0x11c')](AIManager[_0x1887b8('0x14e')][_0x1887b8('0xe0')])){if(_0x1887b8('0x2c')==='OyfBv')return this[_0x1887b8('0x56')]()>0x0;else{function _0x3facc7(){const _0xee221=_0x1887b8;return this[_0xee221('0xee')]=this[_0xee221('0xee')]||[],this[_0xee221('0xee')];}}}}}else{function _0x1d42bf(){const _0x540697=_0x1887b8;return this[_0x540697('0x80')]()[_0x540697('0x130')]>0x0;}}}return VisuMZ[_0x1887b8('0x87')][_0x1887b8('0x15a')][_0x1887b8('0x3e')][_0x1887b8('0x122')];},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x56')]=function(){const _0x2056f8=_0x44da21;if(this[_0x2056f8('0x19')]()||this[_0x2056f8('0x12')]()){if(_0x2056f8('0x135')===_0x2056f8('0x157')){function _0x5c52bb(){const _0x1c3131=_0x2056f8;for(const _0x358eef of _0x1c57a4){_0x172366[_0x1c3131('0x4e')](_0x358eef,this);}}}else{const _0x473061=this[_0x2056f8('0x19')]()?this[_0x2056f8('0x155')]()[_0x2056f8('0xda')]:this[_0x2056f8('0xab')]()['note'];if(_0x473061[_0x2056f8('0x11c')](AIManager[_0x2056f8('0x14e')][_0x2056f8('0xe0')])){if(_0x2056f8('0x40')===_0x2056f8('0x25')){function _0x229875(){const _0x5d9753=_0x2056f8;_0x447d0b[_0x5d9753('0x116')](_0x5d9753('0x7f'),this);}}else return eval(RegExp['$1']);}}}return VisuMZ[_0x2056f8('0x87')][_0x2056f8('0x15a')][_0x2056f8('0x3e')][_0x2056f8('0x26')];},Game_Battler[_0x44da21('0x10c')][_0x44da21('0xc6')]=function(){const _0x5635f8=_0x44da21;if(this['isActor']()||this[_0x5635f8('0x12')]()){if(_0x5635f8('0x9b')===_0x5635f8('0x9e')){function _0x172ad7(){const _0x59b0e0=_0x5635f8;_0x5d74d3(_0x59b0e0('0x5d')[_0x59b0e0('0xec')](_0x48fcad,_0xf84bcb)),_0x1d1fff['exit']();}}else{const _0x2a9883=this[_0x5635f8('0x19')]()?this[_0x5635f8('0x155')]()[_0x5635f8('0xda')]:this[_0x5635f8('0xab')]()[_0x5635f8('0xda')];if(_0x2a9883[_0x5635f8('0x11c')](AIManager[_0x5635f8('0x14e')]['bypassEvaTgr']))return![];else{if(_0x2a9883['match'](AIManager[_0x5635f8('0x14e')][_0x5635f8('0x93')]))return this[_0x5635f8('0x86')]()>0x0;}}}return VisuMZ['BattleAI'][_0x5635f8('0x15a')][_0x5635f8('0x3e')][_0x5635f8('0xad')];},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x86')]=function(){const _0x2dbe44=_0x44da21;if(this[_0x2dbe44('0x19')]()||this[_0x2dbe44('0x12')]()){if('SPAug'===_0x2dbe44('0x43')){function _0x3a52df(){return!![];}}else{const _0x2ffa01=this[_0x2dbe44('0x19')]()?this[_0x2dbe44('0x155')]()[_0x2dbe44('0xda')]:this[_0x2dbe44('0xab')]()[_0x2dbe44('0xda')];if(_0x2ffa01[_0x2dbe44('0x11c')](AIManager[_0x2dbe44('0x14e')]['aiEvaTgr']))return eval(RegExp['$1']);}}return VisuMZ[_0x2dbe44('0x87')]['Settings'][_0x2dbe44('0x3e')][_0x2dbe44('0x6a')];},Game_Battler['prototype'][_0x44da21('0x29')]=function(){const _0x374a6b=_0x44da21;if(this[_0x374a6b('0x19')]()||this['isEnemy']()){const _0x27098c=this[_0x374a6b('0x19')]()?this[_0x374a6b('0x155')]()[_0x374a6b('0xda')]:this[_0x374a6b('0xab')]()['note'];if(_0x27098c[_0x374a6b('0x11c')](AIManager['_regexp'][_0x374a6b('0xe6')]))return![];else{if(_0x27098c['match'](AIManager[_0x374a6b('0x14e')]['aiMevTgr'])){if('nvdsi'===_0x374a6b('0x61'))return this[_0x374a6b('0xc4')]()>0x0;else{function _0x4dc454(){const _0x39bc17=_0x22288d['getElementIdWithName'](_0x3779bd(_0x402900['$1']));return this['elementKnowledgeRate'](_0x45ed26,_0x58269a,_0x502342,_0x39bc17);}}}}}return VisuMZ['BattleAI']['Settings'][_0x374a6b('0x3e')][_0x374a6b('0xad')];},Game_Battler[_0x44da21('0x10c')][_0x44da21('0xc4')]=function(){const _0x5bfe94=_0x44da21;if(this['isActor']()||this['isEnemy']()){const _0x3b69aa=this['isActor']()?this[_0x5bfe94('0x155')]()[_0x5bfe94('0xda')]:this[_0x5bfe94('0xab')]()[_0x5bfe94('0xda')];if(_0x3b69aa[_0x5bfe94('0x11c')](AIManager[_0x5bfe94('0x14e')]['aiMevTgr'])){if('lVqNQ'!==_0x5bfe94('0x13e')){function _0x173345(){const _0xb5826d=_0x5bfe94,_0x1e3d7f=_0x551a74['forcedTargets']();_0x40bc6a=_0x7eb692[_0xb5826d('0xe5')](_0x40e93c=>_0x1e3d7f[_0xb5826d('0x152')](_0x40e93c));}}else return eval(RegExp['$1']);}}return VisuMZ[_0x5bfe94('0x87')][_0x5bfe94('0x15a')][_0x5bfe94('0x3e')][_0x5bfe94('0x6a')];},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x106')]=function(){const _0x52a448=_0x44da21,_0x3fc182=VisuMZ[_0x52a448('0x87')]['Settings'][_0x52a448('0x113')];if(this[_0x52a448('0x19')]()||this[_0x52a448('0x12')]()){if(_0x52a448('0x136')!==_0x52a448('0xb')){const _0x3fd5bd=this[_0x52a448('0x19')]()?this['actor']()['note']:this['enemy']()[_0x52a448('0xda')];if(_0x3fd5bd[_0x52a448('0x11c')](AIManager[_0x52a448('0x14e')][_0x52a448('0x106')])){if(_0x52a448('0x94')!==_0x52a448('0x94')){function _0x103cf1(){const _0x75aedd=_0x52a448,_0x64f5c3=_0x3a87a6(_0x5d1da2['$1']);_0x64f5c3<_0xa1acef?(_0x20bdbd('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x75aedd('0xec')](_0x495b0d,_0x64f5c3,_0x4cf47b)),_0x41d40c['exit']()):_0x4871a3=_0x55d979['max'](_0x64f5c3,_0xc92fad);}}else return Number(RegExp['$1'])[_0x52a448('0x107')](0x0,0x64);}else{if(this['isActor']()){if('SQgBy'==='FxMCp'){function _0x247096(){const _0x32074b=_0x52a448;return _0x319d38[_0x32074b('0x96')];}}else return _0x3fc182[_0x52a448('0x5a')];}else{if(this['isEnemy']())return _0x3fc182[_0x52a448('0x51')];}}}else{function _0x5aa318(){const _0xf336bb=_0x52a448;_0x38a9ac=_0x464b98[_0xf336bb('0xa7')]()[_0xf336bb('0x83')]();}}}return _0x3fc182[_0x52a448('0x51')];},Game_Battler[_0x44da21('0x10c')]['addAIKnowledge']=function(_0x16e1a2,_0x2b08a3,_0x2ed356){const _0x4094e4=_0x44da21,_0x1576e8=this[_0x4094e4('0xa7')]();if(_0x16e1a2&&_0x16e1a2[_0x4094e4('0x130')]>0x0)for(const _0x54c203 of _0x16e1a2){_0x1576e8[_0x4094e4('0x4e')](_0x54c203,this);}if(_0x2b08a3){if(_0x4094e4('0x14a')===_0x4094e4('0x7')){function _0x4f82df(){const _0x211fac=_0x4094e4;if(this[_0x211fac('0x19')]()||this['isEnemy']()){const _0x4fc490=this[_0x211fac('0x19')]()?this[_0x211fac('0x155')]()['note']:this[_0x211fac('0xab')]()[_0x211fac('0xda')];if(_0x4fc490[_0x211fac('0x11c')](_0x4a9800[_0x211fac('0x14e')][_0x211fac('0xe6')]))return![];else{if(_0x4fc490[_0x211fac('0x11c')](_0x150ab3[_0x211fac('0x14e')][_0x211fac('0x13a')]))return this[_0x211fac('0xc4')]()>0x0;}}return _0x3e0187[_0x211fac('0x87')][_0x211fac('0x15a')][_0x211fac('0x3e')][_0x211fac('0xad')];}}else _0x1576e8[_0x4094e4('0x116')](_0x4094e4('0x7f'),this);}_0x2ed356&&_0x1576e8[_0x4094e4('0x116')](_0x4094e4('0xf6'),this);},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x7b')]=function(_0x3e7a1e){const _0x4ff5ea=_0x44da21,_0x61c688=this[_0x4ff5ea('0xa7')]();return _0x61c688['hasXParamAIKnowledge'](_0x3e7a1e,this);},Game_Battler[_0x44da21('0x10c')][_0x44da21('0xf')]=function(){const _0x4978a0=_0x44da21,_0x1e4801=VisuMZ[_0x4978a0('0x87')][_0x4978a0('0x15a')][_0x4978a0('0x113')];if(this[_0x4978a0('0x19')]()||this['isEnemy']()){const _0x59afce=this[_0x4978a0('0x19')]()?this[_0x4978a0('0x155')]()[_0x4978a0('0xda')]:this[_0x4978a0('0xab')]()[_0x4978a0('0xda')];if(_0x59afce[_0x4978a0('0x11c')](AIManager[_0x4978a0('0x14e')][_0x4978a0('0xf')]))return Number(RegExp['$1'])[_0x4978a0('0x107')](0x0,0x9);else{if(this[_0x4978a0('0x19')]())return _0x1e4801[_0x4978a0('0xf1')][_0x4978a0('0x107')](0x0,0x9);else{if(this[_0x4978a0('0x12')]()){if(_0x4978a0('0x105')===_0x4978a0('0xa6')){function _0x5c68c5(){const _0x4e39ca=_0x4978a0;if(!_0x538587[_0x4e39ca('0x87')][_0x4e39ca('0x15a')][_0x4e39ca('0x113')][_0x4e39ca('0x37')])return!![];const _0x24ca37=_0x477297['match'](/EVA/i)?_0x4e39ca('0x7f'):_0x4e39ca('0xf6');this[_0x4e39ca('0x153')]()[_0x24ca37]=this['aiKnowledge']()[_0x24ca37]||[];const _0x1d620b=_0x32fc0c[_0x4e39ca('0x19')]()?_0x484e51['actorId']():_0x4dfa78['enemyId']();return this[_0x4e39ca('0x153')]()[_0x24ca37]['includes'](_0x1d620b);}}else return _0x1e4801['EnemyRatingVariance']['clamp'](0x0,0x9);}}}}return _0x1e4801[_0x4978a0('0x34')][_0x4978a0('0x107')](0x0,0x9);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0x142')]=function(){const _0x20f5a8=_0x44da21;return this[_0x20f5a8('0xa3')]()&&this['referenceEnemyForAI']();},Game_Actor[_0x44da21('0x10c')][_0x44da21('0x11')]=function(){const _0x4b4c65=_0x44da21,_0x57e784=this[_0x4b4c65('0xd6')]()[_0x4b4c65('0xda')];if(_0x57e784[_0x4b4c65('0x11c')](/<NO REFERENCE AI>/i))return null;else{if(_0x57e784[_0x4b4c65('0x11c')](/<REFERENCE AI: ENEMY (\d+)>/i))return $dataEnemies[Number(RegExp['$1'])];else{if(_0x57e784[_0x4b4c65('0x11c')](/<REFERENCE AI: (.*)>/i)){if('CojMi'===_0x4b4c65('0xa1')){function _0x35ecfe(){return![];}}else return $dataEnemies[DataManager[_0x4b4c65('0x35')](String(RegExp['$1']))];}}}return $dataEnemies[VisuMZ[_0x4b4c65('0x87')][_0x4b4c65('0x15a')][_0x4b4c65('0x113')][_0x4b4c65('0xb2')]];},Game_Actor[_0x44da21('0x10c')][_0x44da21('0xef')]=function(){const _0x1a6a4d=_0x44da21,_0x4de9fe=this[_0x1a6a4d('0xd6')]()['note'];if(_0x4de9fe[_0x1a6a4d('0x11c')](AIManager['_regexp'][_0x1a6a4d('0xef')]))return String(RegExp['$1'])['toLowerCase']()[_0x1a6a4d('0x149')]();return VisuMZ[_0x1a6a4d('0x87')][_0x1a6a4d('0x15a')][_0x1a6a4d('0x113')][_0x1a6a4d('0x1e')];},Game_Actor[_0x44da21('0x10c')][_0x44da21('0x5b')]=function(){const _0x526b67=_0x44da21;Game_Battler[_0x526b67('0x10c')]['determineNewValidAIAction'][_0x526b67('0x5f')](this),this[_0x526b67('0xdb')]();},VisuMZ['BattleAI'][_0x44da21('0x13f')]=Game_Actor[_0x44da21('0x10c')]['makeAutoBattleActions'],Game_Actor[_0x44da21('0x10c')][_0x44da21('0xdb')]=function(){const _0x1fa668=_0x44da21;if(this[_0x1fa668('0x142')]()){if(_0x1fa668('0x159')===_0x1fa668('0x159'))this[_0x1fa668('0xbb')]();else{function _0xe7564e(){this['_aiTgrInfluence']={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0};}}}else VisuMZ[_0x1fa668('0x87')][_0x1fa668('0x13f')][_0x1fa668('0x5f')](this);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0xbb')]=function(){const _0x3c6b37=_0x44da21;if(this[_0x3c6b37('0x14b')]()>0x0){if('xrqEE'!==_0x3c6b37('0xc8')){function _0x241774(){return[];}}else{const _0x4f3167=this[_0x3c6b37('0x108')]();if(this['canAttack']())_0x4f3167[_0x3c6b37('0x4f')]($dataSkills[this['attackSkillId']()]);if(this[_0x3c6b37('0xb1')]())_0x4f3167[_0x3c6b37('0x4f')]($dataSkills[this[_0x3c6b37('0xdc')]()]);const _0x529d8b=this[_0x3c6b37('0x11')](),_0x176abc=JsonEx['makeDeepCopy'](_0x529d8b[_0x3c6b37('0x137')]);for(const _0x49634c of _0x176abc){if(_0x49634c[_0x3c6b37('0x50')]===0x1)_0x49634c['skillId']=this[_0x3c6b37('0xa2')]();if(_0x49634c[_0x3c6b37('0x50')]===0x2)_0x49634c['skillId']=this[_0x3c6b37('0xdc')]();}const _0x18bb69=_0x176abc['filter'](_0x1ac1f8=>this[_0x3c6b37('0xf0')](_0x1ac1f8)&&_0x4f3167['includes']($dataSkills[_0x1ac1f8[_0x3c6b37('0x50')]]));if(_0x18bb69[_0x3c6b37('0x130')]>0x0){if(_0x3c6b37('0x1f')===_0x3c6b37('0x4')){function _0x190631(){const _0x5bab2e=_0x3c6b37;return _0x2e08a1[_0x5bab2e('0x5a')];}}else{this['selectAllActions'](_0x18bb69);return;}}}}VisuMZ['BattleAI'][_0x3c6b37('0x13f')]['call'](this);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0xff')]=function(_0x3bb31d){const _0x46daf4=_0x44da21;return Game_Enemy[_0x46daf4('0x10c')][_0x46daf4('0xff')][_0x46daf4('0x5f')](this,_0x3bb31d);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0xa')]=function(_0x2b3d4e,_0x4c915d){const _0x4f6fa5=_0x44da21;return Game_Enemy[_0x4f6fa5('0x10c')]['meetsTurnCondition'][_0x4f6fa5('0x5f')](this,_0x2b3d4e,_0x4c915d);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0x4a')]=function(_0x91677e,_0x49dbdf){const _0x1610f3=_0x44da21;return Game_Enemy[_0x1610f3('0x10c')][_0x1610f3('0x4a')][_0x1610f3('0x5f')](this,_0x91677e,_0x49dbdf);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0x44')]=function(_0x469ad9,_0x513371){const _0x52be1a=_0x44da21;return Game_Enemy[_0x52be1a('0x10c')]['meetsMpCondition'][_0x52be1a('0x5f')](this,_0x469ad9,_0x513371);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0xf4')]=function(_0x2a6c32){const _0x2cb6e7=_0x44da21;return Game_Enemy[_0x2cb6e7('0x10c')]['meetsStateCondition'][_0x2cb6e7('0x5f')](this,_0x2a6c32);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0xd3')]=function(_0x53cf9c){const _0x8c0a6c=_0x44da21;return Game_Enemy[_0x8c0a6c('0x10c')]['meetsPartyLevelCondition'][_0x8c0a6c('0x5f')](this,_0x53cf9c);},Game_Actor[_0x44da21('0x10c')][_0x44da21('0xe1')]=function(_0x58ea9b){const _0x229546=_0x44da21;return Game_Enemy['prototype']['meetsSwitchCondition'][_0x229546('0x5f')](this,_0x58ea9b);},Game_Enemy[_0x44da21('0x10c')][_0x44da21('0xef')]=function(){const _0x213665=_0x44da21,_0x531023=this['enemy']()[_0x213665('0xda')];if(_0x531023[_0x213665('0x11c')](AIManager[_0x213665('0x14e')][_0x213665('0xef')]))return String(RegExp['$1'])[_0x213665('0xf8')]()[_0x213665('0x149')]();return VisuMZ[_0x213665('0x87')][_0x213665('0x15a')][_0x213665('0x113')]['EnemyStyleAI'];},VisuMZ['BattleAI']['Game_Enemy_isActionValid']=Game_Enemy[_0x44da21('0x10c')][_0x44da21('0xf0')],Game_Enemy[_0x44da21('0x10c')][_0x44da21('0xf0')]=function(_0x39cf8f){const _0x144f61=_0x44da21;if(!VisuMZ[_0x144f61('0x87')][_0x144f61('0x15c')]['call'](this,_0x39cf8f))return![];if(this[_0x144f61('0xef')]()===_0x144f61('0x81'))return!![];return AIManager['hasValidTargets'](this,$dataSkills[_0x39cf8f[_0x144f61('0x50')]]);},Game_Actor['prototype']['isActionValid']=function(_0x2ea63f){const _0x27933a=_0x44da21;return Game_Enemy[_0x27933a('0x10c')]['isActionValid']['call'](this,_0x2ea63f);},Game_Enemy['prototype']['selectAction']=function(_0x14c1fe,_0x318955){const _0x5561fd=_0x44da21,_0x47f5de=_0x14c1fe['reduce']((_0x30921e,_0x3c8a48)=>_0x30921e+_0x3c8a48[_0x5561fd('0x66')]-_0x318955,0x0);if(_0x47f5de>=0x0){let _0x51e028=Math[_0x5561fd('0xfd')](_0x47f5de);for(const _0x1b4e75 of _0x14c1fe){if(_0x5561fd('0x3d')!==_0x5561fd('0x147')){_0x51e028-=_0x1b4e75[_0x5561fd('0x66')]-_0x318955;if(_0x51e028<=0x0)return _0x1b4e75;}else{function _0x9e1d3a(){const _0x3b5933=_0x5561fd;_0x399b38[_0x3b5933('0x4e')](_0x196359,this);}}}}else return null;},Game_Actor[_0x44da21('0x10c')][_0x44da21('0x39')]=function(_0x205166,_0x1efff7){const _0x51b1e8=_0x44da21;return Game_Enemy[_0x51b1e8('0x10c')]['selectAction'][_0x51b1e8('0x5f')](this,_0x205166,_0x1efff7);},Game_Enemy[_0x44da21('0x10c')][_0x44da21('0xd4')]=function(_0x5caf5b){const _0x8a257e=_0x44da21,_0x19fdee=String(this[_0x8a257e('0xef')]())[_0x8a257e('0xf8')]()[_0x8a257e('0x149')]();if([_0x8a257e('0x81'),_0x8a257e('0x156')]['includes'](_0x19fdee))this[_0x8a257e('0x9')](_0x5caf5b);else{if(_0x19fdee==='gambit')this[_0x8a257e('0xe3')](_0x5caf5b);else{if(_0x8a257e('0xcd')!=='zaOPa'){function _0x5d6554(){const _0x318273=_0x8a257e;_0x112436[_0x318273('0x121')]=_0x4efd81[_0x318273('0x86')]();}}else this[_0x8a257e('0x24')](_0x5caf5b);}}},Game_Actor[_0x44da21('0x10c')][_0x44da21('0xd4')]=function(_0x363950){const _0x387f63=_0x44da21;Game_Enemy['prototype'][_0x387f63('0xd4')][_0x387f63('0x5f')](this,_0x363950);},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x24')]=function(_0x1755c8){const _0x2b5496=_0x44da21,_0x1998e9=Math[_0x2b5496('0xaa')](..._0x1755c8[_0x2b5496('0xf3')](_0x5e366e=>_0x5e366e[_0x2b5496('0x66')])),_0x16fe1d=_0x1998e9-this[_0x2b5496('0xf')]();_0x1755c8=_0x1755c8[_0x2b5496('0xe5')](_0x2ed456=>_0x2ed456[_0x2b5496('0x66')]>=_0x16fe1d);for(let _0x219fc1=0x0;_0x219fc1<this[_0x2b5496('0x14b')]();_0x219fc1++){this['action'](_0x219fc1)['setEnemyAction'](this['selectAction'](_0x1755c8,_0x16fe1d));}},Game_Battler[_0x44da21('0x10c')][_0x44da21('0xe3')]=function(_0x4fd4b5){const _0x8b16dd=_0x44da21;for(let _0x1eec4c=0x0;_0x1eec4c<this[_0x8b16dd('0x14b')]();_0x1eec4c++){if('tLuoC'!=='tLuoC'){function _0x3802c1(){const _0x55bc05=_0x8b16dd;return _0x5382e4[_0x55bc05('0x127')]();}}else{const _0x124411=_0x4fd4b5[0x0];this[_0x8b16dd('0x73')](_0x1eec4c)[_0x8b16dd('0x55')](_0x124411);}}},Game_Battler[_0x44da21('0x10c')][_0x44da21('0x9')]=function(_0x4d0910){const _0x160a0d=_0x44da21;for(let _0x4ef239=0x0;_0x4ef239<this[_0x160a0d('0x14b')]();_0x4ef239++){if(_0x160a0d('0x8f')===_0x160a0d('0x22')){function _0xc389d2(){return![];}}else{const _0x250600=_0x4d0910[Math['randomInt'](_0x4d0910['length'])];this[_0x160a0d('0x73')](_0x4ef239)['setEnemyAction'](_0x250600);}}},Game_Enemy[_0x44da21('0x10c')][_0x44da21('0x5b')]=function(){const _0x27f944=_0x44da21;Game_Battler[_0x27f944('0x10c')][_0x27f944('0x5b')][_0x27f944('0x5f')](this);if(this[_0x27f944('0x14b')]()>0x0){const _0xfdec3e=this[_0x27f944('0xab')]()[_0x27f944('0x137')][_0x27f944('0xe5')](_0x5e364a=>this[_0x27f944('0xf0')](_0x5e364a));_0xfdec3e[_0x27f944('0x130')]>0x0&&this[_0x27f944('0xd4')](_0xfdec3e);}},VisuMZ['BattleAI']['Game_Unit_initialize']=Game_Unit[_0x44da21('0x10c')][_0x44da21('0x158')],Game_Unit[_0x44da21('0x10c')][_0x44da21('0x158')]=function(){const _0x1709ac=_0x44da21;VisuMZ[_0x1709ac('0x87')][_0x1709ac('0xb3')][_0x1709ac('0x5f')](this),this[_0x1709ac('0xe9')]();},Game_Unit[_0x44da21('0x10c')][_0x44da21('0xe9')]=function(){const _0x598c56=_0x44da21;this[_0x598c56('0xbd')]=![],this[_0x598c56('0x144')]();},VisuMZ[_0x44da21('0x87')]['Game_Unit_aliveMembers']=Game_Unit[_0x44da21('0x10c')][_0x44da21('0x83')],Game_Unit['prototype'][_0x44da21('0x83')]=function(){const _0x2525be=_0x44da21;let _0x1497bf=VisuMZ[_0x2525be('0x87')]['Game_Unit_aliveMembers']['call'](this);if(this[_0x2525be('0xbd')]){const _0x39da68=AIManager[_0x2525be('0x80')]();_0x1497bf=_0x1497bf[_0x2525be('0xe5')](_0x5b9db5=>_0x39da68[_0x2525be('0x152')](_0x5b9db5));}return _0x1497bf;},VisuMZ[_0x44da21('0x87')][_0x44da21('0x15')]=Game_Unit['prototype'][_0x44da21('0x1b')],Game_Unit[_0x44da21('0x10c')][_0x44da21('0x1b')]=function(){const _0x30c637=_0x44da21;AIManager[_0x30c637('0x11d')]()&&(this[_0x30c637('0xbd')]=!![]);const _0x4f5090=VisuMZ[_0x30c637('0x87')][_0x30c637('0x15')][_0x30c637('0x5f')](this);return this[_0x30c637('0xbd')]=![],_0x4f5090;},Game_Unit['prototype'][_0x44da21('0x144')]=function(){const _0x3b2ac0=_0x44da21;this[_0x3b2ac0('0x103')]={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit[_0x44da21('0x10c')]['aiKnowledge']=function(){const _0x36bbc3=_0x44da21;if(this[_0x36bbc3('0x103')]===undefined)this[_0x36bbc3('0x144')]();return this[_0x36bbc3('0x103')];},Game_Unit[_0x44da21('0x10c')][_0x44da21('0x116')]=function(_0x4465c5,_0x86261d){const _0x3ebebe=_0x44da21;this[_0x3ebebe('0x153')]()[_0x4465c5]=this[_0x3ebebe('0x153')]()[_0x4465c5]||[];const _0x348f63=_0x86261d[_0x3ebebe('0x19')]()?_0x86261d[_0x3ebebe('0x10')]():_0x86261d[_0x3ebebe('0x65')]();!this[_0x3ebebe('0x153')]()[_0x4465c5][_0x3ebebe('0x152')](_0x348f63)&&this[_0x3ebebe('0x153')]()[_0x4465c5][_0x3ebebe('0x4f')](_0x348f63);},Game_Unit[_0x44da21('0x10c')][_0x44da21('0x7b')]=function(_0x364caa,_0x3e31c0){const _0xc39730=_0x44da21;if(!VisuMZ[_0xc39730('0x87')]['Settings']['General'][_0xc39730('0x37')])return!![];const _0x192f8e=_0x364caa[_0xc39730('0x11c')](/EVA/i)?_0xc39730('0x7f'):_0xc39730('0xf6');this[_0xc39730('0x153')]()[_0x192f8e]=this[_0xc39730('0x153')]()[_0x192f8e]||[];const _0xa30c15=_0x3e31c0['isActor']()?_0x3e31c0[_0xc39730('0x10')]():_0x3e31c0[_0xc39730('0x65')]();return this['aiKnowledge']()[_0x192f8e][_0xc39730('0x152')](_0xa30c15);},Game_Unit['prototype']['addElementAIKnowledge']=function(_0x576728,_0x4bbb5e){const _0x2007bd=_0x44da21;this[_0x2007bd('0x153')]()[_0x2007bd('0xbe')]=this[_0x2007bd('0x153')]()[_0x2007bd('0xbe')]||{};const _0x125c7c=this['aiKnowledge']()['elementRates'];_0x125c7c[_0x576728]=_0x125c7c[_0x576728]||[];const _0x55a562=_0x4bbb5e[_0x2007bd('0x19')]()?_0x4bbb5e[_0x2007bd('0x10')]():_0x4bbb5e['enemyId']();!_0x125c7c[_0x576728]['includes'](_0x55a562)&&_0x125c7c[_0x576728][_0x2007bd('0x4f')](_0x55a562);},Game_Unit[_0x44da21('0x10c')][_0x44da21('0x45')]=function(_0xf8b874,_0x4c86dc){const _0x263a53=_0x44da21;if(!VisuMZ[_0x263a53('0x87')]['Settings'][_0x263a53('0x113')][_0x263a53('0x37')])return!![];this[_0x263a53('0x153')]()[_0x263a53('0xbe')]=this[_0x263a53('0x153')]()[_0x263a53('0xbe')]||{};const _0x583b84=this[_0x263a53('0x153')]()[_0x263a53('0xbe')];_0x583b84[_0xf8b874]=_0x583b84[_0xf8b874]||[];const _0x19da07=_0x4c86dc['isActor']()?_0x4c86dc[_0x263a53('0x10')]():_0x4c86dc[_0x263a53('0x65')]();return _0x583b84[_0xf8b874][_0x263a53('0x152')](_0x19da07);},VisuMZ[_0x44da21('0x87')][_0x44da21('0x8b')]=Game_Troop[_0x44da21('0x10c')]['setup'],Game_Troop[_0x44da21('0x10c')][_0x44da21('0xb9')]=function(_0x2816da){const _0x5436b8=_0x44da21;VisuMZ['BattleAI']['Game_Troop_setup']['call'](this,_0x2816da),this[_0x5436b8('0x144')]();};
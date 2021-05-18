//=============================================================================
// VisuStella MZ - Enemy Levels
// VisuMZ_3_EnemyLevels.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_EnemyLevels = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnemyLevel = VisuMZ.EnemyLevel || {};
VisuMZ.EnemyLevel.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [EnemyLevel]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enemy_Levels_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Enemies in RPG Maker MZ do not have levels by default, but instead are given
 * static parameters that do not change throughout the game. This plugin adds
 * the functionality to apply levels and level-based parameter changes to all
 * of your enemies, along with control over how their levels are handled.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assign levels to each enemy from exact values to dynamic values based on
 *   the party's levels, variables, etc.
 * * Level variance and and bonus modifiers to make enemies dynamically leveled
 *   even if they're in the same battle.
 * * Decide enemy levels based on the map the player is in.
 * * Have enemies use different images based on what level they are.
 * * Skill effects, item effects, and Plugin Commands that alter the levels
 *   of enemies mid-battle.
 * * Notetags to prevent certain skills from being used until the enemy reaches
 *   a specific level.
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
 * enemy.level
 *
 * - A new property, 'level' is defined for Game_Enemy and it used to determine
 * the enemy's current level. This allows you, the game dev, to use a.level or
 * b.level in damage formulas and other calculations.
 *
 * ---
 *
 * ============================================================================
 * Parameter Calculations
 * ============================================================================
 *
 * To understand how parameter calculations are made, refer to the formula
 * below for all base parameters, EXP, gold, and drop rate.
 *
 * ---
 *
 * base + (level * base * rate) + (level * flat)
 *
 * Where:
 * - 'base' is the original base value of the parameter found in the database.
 * - 'level' is the previous level of the enemy (minimum: 0).
 * - 'rate' is the rate of growth determined by notetags or Plugin Parameters.
 * - 'flat' is the flat growth value also determined by notetags/parameters.
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
 * === Setup Enemy Level Notetags ===
 *
 * These are the notetags that determine an enemy's level upon creation.
 *
 * ---
 *
 * <Show Level>
 * <Hide Level>
 *
 * - Used for: Enemy Notetags
 * - Lets you show or hide an enemy's level from their name.
 * - This will override the Plugin Parameters => General => Show Enemy Level?
 *   setting.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a static level of 'x' whenever it's created.
 * - Replace 'x' with a numeric value representing its level.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level: x to y>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a level between 'x' and 'y'  whenever the enemy
 *   is created.
 * - Replace 'x' and 'y' with a numeric values representing its level range.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level Variable: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a level represented by the value used inside
 *   Game Variable x.
 * - Replace 'x' with the ID of the Game Variable to reference its value.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level: Highest Actor Level>
 * <Level: Highest Party Level>
 *
 * <Level: Average Actor Level>
 * <Level: Average Party Level>
 *
 * <Level: Lowest Actor Level>
 * <Level: Lowest Party Level>
 *
 * - Used for: Enemy Notetags
 * - Sets the base level of this enemy equal to either (respectively:
 *   - The highest level of any actor in the player's party.
 *   - The highest level of any actor in the battling party.
 *   - The average level of any actor in the player's party.
 *   - The average level of any actor in the battling party.
 *   - The lowest level of any actor in the player's party.
 *   - The lowest level of any actor in the battling party.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level Bonus: +x>
 * <Level Bonus: -x>
 *
 * - Used for: Enemy
 * - This will add/subtrack the base level decided using the above notetags
 *   with a specific value.
 * - Replace 'x' with a numeric value on how much to adjust the base level by.
 *
 * ---
 *
 * <Level Variance: x>
 *
 * - Used for: Enemy Notetags
 * - This can allow the level range for the enemy to be anywhere from 'x' less
 *   than the base to 'x' more than the base.
 * - Replace 'x' with a numeric value indicating how much level variance there
 *   is from the base level.
 *
 * ---
 *
 * <Positive Level Variance: x>
 * <Negative Level Variance: x>
 *
 * - Used for: Enemy Notetags
 * - This specifies the positive and negative level variances applied to the
 *   base level, specifying a change anywhere between the negative and positive
 *   modifiers to the base level.
 * - Replace 'x' with a numeric value indicating how much level variance there
 *   is from the base level (negatively or positively).
 *
 * ---
 *
 * <Minimum Level: x>
 * <Maximum Level: x>
 *
 * - Used for: Enemy Notetags
 * - These notetags determine the absolute lowest and absolute highest level
 *   the enemy can be after all other modifiers.
 * - Even if the bonus, variance, and manual level changes are applied, the
 *   enemy's level cannot be less than the minimum or larger than the maximum.
 * - Replace 'x' with numeric values representing the limits of the enemy's
 *   level ranges.
 *
 * ---
 *
 * === JavaScript Notetags: Setup Enemy Level ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine dynamic enemy level setup notetags.
 *
 * ---
 *
 * <JS Level: code>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a static level determined by code whenever
 *   it's created.
 * - Replace 'code' with JavaScript code to determine the enemy's base level.
 *
 * ---
 *
 * <JS Level Bonus: code>
 *
 * - Used for: Enemy Notetags
 * - This will add/subtrack the base level decided using the above notetags
 *   by a value determined by JavaScript code.
 * - Replace 'code' with JavaScript code to determine the level bonus.
 *
 * ---
 *
 * <JS Level Variance: code>
 *
 * - Used for: Enemy Notetags
 * - This can allow the level range for the enemy determined by JavaScript code
 *   as variance.
 * - Replace 'code' with JavaScript code to determine the level variance.
 *
 * ---
 *
 * <JS Positive Level Variance: code>
 * <JS Negative Level Variance: code>
 *
 * - Used for: Enemy Notetags
 * - This specifies the positive and negative level variances applied to the
 *   base level, specifying a change anywhere between the negative and positive
 *   modifiers to the base level.
 * - Replace 'code' with JavaScript code to determine the level variance.
 *
 * ---
 * 
 * === Enemy Appearance-Related Notetags ===
 * 
 * These notetags allow you to adjust how enemies look based on their level.
 * These settings will always start with level 1 being the default appearance
 * while changing appearances once they reach a specific level.
 * 
 * ---
 * 
 * <Level x Image: filename>
 *
 * - Used for: Enemy Notetags
 * - Once the enemy reaches level 'x' and above, its image will change to
 *   whatever 'filename' is used until it reaches the next appearance setting.
 * - Replace 'x' with a number representing the level required to reach.
 * - Replace 'filename' with the filename of the enemy in the img/enemies/
 *   and/or img/sv_enemies folder.
 * - Insert multiples of these notetags to give them different image settings
 *   throughout various levels.
 * - If multiple notetags are used, the settings will be arranged from lowest
 *   to highest, giving priority to the highest met level.
 * 
 * ---
 * 
 * <Level Images>
 *  x: filename
 *  x: filename
 *  x: filename
 * </Level Images>
 *
 * - Used for: Enemy Notetags
 * - Once the enemy reaches level 'x' and above, its image will change to
 *   whatever 'filename' is used until it reaches the next appearance setting.
 * - Replace 'x' with a number representing the level required to reach.
 * - Replace 'filename' with the filename of the enemy in the img/enemies/
 *   and/or img/sv_enemies folder.
 * - Insert multiple lines of the 'x: filename' portion of the notetag to
 *   designate multiple settings.
 * - If multiple settings are used, the settings will be arranged from lowest
 *   to highest, giving priority to the highest met level.
 * 
 * ---
 *
 * === Map Notetags that Determine Enemy Levels ===
 *
 * The following are notetags that are placed inside of a map's notebox to
 * determine the levels of enemies fought on that map. These notetags cannot
 * bypass the <Level: x> notetags but will take priority over the default
 * Plugin Parameter settings.
 *
 * ---
 *
 * <Enemy Level: x>
 *
 * - Used for: Map Notetags
 * - Sets the levels of the map's enemies to a static level of 'x' whenever
 *   they're created.
 * - Replace 'x' with a numeric value representing its level.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Enemy Level: x to y>
 *
 * - Used for: Map Notetags
 * - Sets the map's enemy levels to a level between 'x' and 'y'  whenever they
 *   are created.
 * - Replace 'x' and 'y' with a numeric values representing its level range.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Enemy Level: Highest Actor Level>
 * <Enemy Level: Highest Party Level>
 *
 * <Enemy Level: Average Actor Level>
 * <Enemy Level: Average Party Level>
 *
 * <Enemy Level: Lowest Actor Level>
 * <Enemy Level: Lowest Party Level>
 *
 * - Used for: Map Notetags
 * - Sets the base level of this map's levels equal to either (respectively:
 *   - The highest level of any actor in the player's party.
 *   - The highest level of any actor in the battling party.
 *   - The average level of any actor in the player's party.
 *   - The average level of any actor in the battling party.
 *   - The lowest level of any actor in the player's party.
 *   - The lowest level of any actor in the battling party.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * === JavaScript Notetags: Map Notetags that Determine Enemy Levels ===
 *
 * The following are notetags made for users with JavaScript knowledge to make
 * map-related notetags that determine enemy levels. These notetags cannot
 * bypass the <Level: x> notetags but will take priority over the default
 * Plugin Parameter settings.
 *
 * ---
 *
 * <JS Enemy Level: code>
 *
 * - Used for: Map Notetags
 * - Sets the levels of the map enemies to a static level determined by code
 *   whenever it's created.
 * - Replace 'code' with JavaScript code to determine the enemy's base level.
 *
 * ---
 *
 * === Enemy Level Parameter Notetags ===
 *
 * The growth rate and flat growth amounts can be determined by default in
 * Plugin Parameters => Parameters Growth. However, if you wish for enemies to
 * have special or unique growth, use the following notetags.
 *
 * ---
 *
 * <Growth Rate Per Level>
 *  MaxHP: +x.x
 *  MaxMP: +x.x
 *  ATK: +x.x
 *  DEF: +x.x
 *  MAT: +x.x
 *  MDF: +x.x
 *  AGI: +x.x
 *  LUK: +x.x
 *  EXP: +x.x
 *  Gold: +x.x
 *  Drop: +x.x
 * </Growth Rate Per Level>
 *
 * - Used for: Enemy Notetags
 * - Changes the rate of growth per level for the enemy.
 * - Replace 'x.x' with a positive or negative value on how much to raise the
 *   parameter by for each level relative to the base value.
 *
 * ---
 *
 * <Growth Flat Per Level>
 *  MaxHP: +x.x
 *  MaxMP: +x.x
 *  ATK: +x.x
 *  DEF: +x.x
 *  MAT: +x.x
 *  MDF: +x.x
 *  AGI: +x.x
 *  LUK: +x.x
 *  EXP: +x.x
 *  Gold: +x.x
 *  Drop: +x.x
 * </Growth Flat Per Level>
 *
 * - Used for: Enemy Notetags
 * - Changes the flat growth value per level for the enemy.
 * - Replace 'x.x' with a positive or negative value on how much to raise the
 *   parameter by for each level as a flat value.
 *
 * ---
 *
 * <Static Level Parameters>
 *
 * - Used for: Enemy Notetags
 * - Insert this notetag if you do not wish for the growth modifiers to affect
 *   the enemy and just use the database's parameters as its current parameters
 *   no matter the level.
 *
 * ---
 * 
 * === Enemy Level Skill Requirement Notetags ===
 * 
 * ---
 * 
 * <Enemy Skill id Require Level: x>
 * <Enemy Skill name Require Level: x>
 *
 * - Used for: Enemy Notetags
 * - To make actions for enemies require specific levels, use the above notetag
 *   to define what level the enemy can use the identified skill at.
 * - Replace 'id' with the ID of the skill to assign a level to.
 * - Replace 'name' with the name of the skill to assign a level to.
 * - Insert multiples of this notetag to assign levels to multiple skills.
 * 
 * ---
 *
 * === Enemy Level Change Notetags ===
 *
 * These notetags affect mid-battle level changing effects for enemies.
 *
 * ---
 *
 * <Change Enemy Level: +x>
 * <Change Enemy Level: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the enemy's level by 'x' positively or negatively mid-battle.
 * - This will also alter the enemy's parameters.
 * - Replace 'x' with the amount to raise/drop the level by.
 *
 * ---
 *
 * <Reset Enemy Level>
 *
 * - Used for: Skill, Item Notetags
 * - Resets any level changes made to the enemy from the start of battle.
 *
 * ---
 *
 * <Resist Level Change>
 *
 * - Used for: Enemy, State Notetags
 * - Makes the affected enemy resist level changes.
 *
 * ---
 *
 * === JavaScript Notetags: Enemy Level Change ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * affect mid-battle level changing effects for enemies.
 *
 * ---
 *
 * <JS Change Enemy Level: code>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the enemy's level by a value determined by JavaScript code either
 *   positively or negatively mid-battle.
 * - This will also alter the enemy's parameters.
 * - Replace 'code' with JavaScript code to determine the amount to change the
 *   enemy's level by.
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
 * === Enemy-Related Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Level
 * - Change target enemy(ies) level by a value.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Level:
 *   - Changes level by this value.
 *   - You may use JavaScript code.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 *
 * Enemy: Reset Level
 * - Reset target enemy(ies) level to its original level.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 *
 * Enemy: Set Level
 * - Set target enemy(ies) level to a specific value.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Level:
 *   - Sets level to this value.
 *   - You may use JavaScript code.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 * 
 * === Debug-Related Plugin Commands ===
 * 
 * ---
 *
 * DEBUG: View Level Stats
 * - View the stats of specific enemies for each level.
 * - This will appear in the Debug Console.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to view.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that pertain to enemy levels, letting you
 * adjust the defaults to how some mechanics work as well as the vocabulary
 * shown for the enemy levels.
 *
 * ---
 *
 * Levels
 * 
 *   Level Type:
 *   - Choose the default level type for all enemies.
 *     - Highest Actor Level
 *     - Highest Party Level
 *     - Average Actor Level
 *     - Average Party Level
 *     - Lowest Actor Level
 *     - Lowest Party Level
 *     - Variable x
 *     - Static x
 *   - Replace 'x' with a number if present.
 * 
 *   Minimum Level:
 *   - Default minimum level for enemies.
 * 
 *   Maximum Level:
 *   - Default maximum level for enemies.
 * 
 *   Negative Variance:
 *   - Default negative level variance.
 * 
 *   Positive Variance:
 *   - Default positive level variance.
 *
 * ---
 *
 * Mechanics
 * 
 *   Preserve HP/MP Rates?:
 *   - If level changing, preserve the enemy's HP/MP rates?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Show Enemy Level?:
 *   - Show enemy levels by default? Use the notetags <Show Level> and
 *     <Hide Level> to determine otherwise.
 * 
 *   Enemy Name Format:
 *   - Text format used for enemy names in battle.
 *   - %1 - Level, %2 - Enemy's Name
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Growth Settings
 * ============================================================================
 *
 * Determine how much growth for each parameter enemies gain by default. These
 * growth settings can be relative to the enemy's base value or increases at a
 * flat amount each level. The formula for each increase is the following:
 *
 *   base + (level * base * rate) + (level * flat)
 *
 * Where:
 * - 'base' is the original base value of the parameter found in the database.
 * - 'level' is the previous level of the enemy (minimum: 0).
 * - 'rate' is the rate of growth determined by notetags or Plugin Parameters.
 * - 'flat' is the flat growth value also determined by notetags/parameters.
 *
 * Build around that formula for the best results.
 *
 * ---
 *
 * MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK, EXP, Gold, Drop Rate
 * 
 *   Growth Rate:
 *   - Default rate of growth relative to parameter base value.
 * 
 *   Flat Growth:
 *   - Default flat growth amount based on level.
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
 * * Documentation Update!
 * ** Added notetag information for <Enemy Skill id Require Level: x> which
 *    was previously left out by accident. Update made by Yanfly.
 *
 * Version 1.00 Official Release: October 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelChange
 * @text Enemy: Change Level
 * @desc Change target enemy(ies) level by a value.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg Level:eval
 * @text Level
 * @desc Changes level by this value.
 * You may use JavaScript code.
 * @default +1
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelReset
 * @text Enemy: Reset Level
 * @desc Reset target enemy(ies) level to its original level.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelSet
 * @text Enemy: Set Level
 * @desc Set target enemy(ies) level to a specific value.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg Level:eval
 * @text Level
 * @desc Sets level to this value.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugEnemyLevels
 * @text DEBUG: View Level Stats
 * @desc View the stats of specific enemies for each level.
 * This will appear in the Debug Console.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to view.
 * @default ["0"]
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
 * @param EnemyLevel
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
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding enemy levels.
 * @default {"Levels":"","DefaultLevelType:str":"Highest Actor Level","DefaultMinLevel:num":"1","DefaultMaxLevel:num":"99","DefaultNegLevelVariance:num":"2","DefaultPositiveVariance:num":"2","Mechanics":"","PreserveRates:eval":"true","Vocabulary":"","ShowEnemyLv:eval":"true","EnemyNameFmt:str":"Lv%1 %2"}
 *
 * @param Param:struct
 * @text Parameter Growth
 * @type struct<Param>
 * @desc The default parameter growth values for Enemy Levels.
 * @default {"MaxHP":"","MaxHP_Rate:num":"0.32","MaxHP_Flat:num":"0.00","MaxMP":"","MaxMP_Rate:num":"0.16","MaxMP_Flat:num":"0.00","ATK":"","ATK_Rate:num":"0.08","ATK_Flat:num":"0.00","DEF":"","DEF_Rate:num":"0.08","DEF_Flat:num":"0.00","MAT":"","MAT_Rate:num":"0.08","MAT_Flat:num":"0.00","MDF":"","MDF_Rate:num":"0.08","MDF_Flat:num":"0.00","AGI":"","AGI_Rate:num":"0.08","AGI_Flat:num":"0.00","LUK":"","LUK_Rate:num":"0.08","LUK_Flat:num":"0.00","EXP":"","EXP_Rate:num":"0.12","EXP_Flat:num":"0.00","Gold":"","Gold_Rate:num":"0.16","Gold_Flat:num":"0.00","Drop":"","Drop_Rate:num":"0.00","Drop_Flat:num":"0.008"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Levels
 *
 * @param DefaultLevelType:str
 * @text Level Type
 * @parent Levels
 * @type combo
 * @option Highest Actor Level
 * @option Highest Party Level
 * @option Average Actor Level
 * @option Average Party Level
 * @option Lowest Actor Level
 * @option Lowest Party Level
 * @option Variable x
 * @option Static x
 * @desc Choose the default level type for all enemies.
 * Replace 'x' with a number if present.
 * @default Highest Actor Level
 *
 * @param DefaultMinLevel:num
 * @text Minimum Level
 * @parent Levels
 * @desc Default minimum level for enemies.
 * @default 1
 *
 * @param DefaultMaxLevel:num
 * @text Maximum Level
 * @parent Levels
 * @desc Default maximum level for enemies.
 * @default 99
 *
 * @param DefaultNegLevelVariance:num
 * @text Negative Variance
 * @parent Levels
 * @desc Default negative level variance.
 * @default 2
 *
 * @param DefaultPositiveVariance:num
 * @text Positive Variance
 * @parent Levels
 * @desc Default positive level variance.
 * @default 2
 *
 * @param Mechanics
 *
 * @param PreserveRates:eval
 * @text Preserve HP/MP Rates?
 * @parent Mechanics
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If level changing, preserve the enemy's HP/MP rates?
 * @default true
 *
 * @param Vocabulary
 *
 * @param ShowEnemyLv:eval
 * @text Show Enemy Level?
 * @parent Vocabulary
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show enemy levels by default? Use the notetags
 * <Show Level> and <Hide Level> to determine otherwise.
 * @default true
 *
 * @param EnemyNameFmt:str
 * @text Enemy Name Format
 * @parent Vocabulary
 * @desc Text format used for enemy names in battle.
 * %1 - Level, %2 - Enemy's Name
 * @default Lv%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Growth Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param MaxHP
 *
 * @param MaxHP_Rate:num
 * @text Growth Rate
 * @parent MaxHP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.32
 *
 * @param MaxHP_Flat:num
 * @text Flat Growth
 * @parent MaxHP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MaxMP
 *
 * @param MaxMP_Rate:num
 * @text Growth Rate
 * @parent MaxMP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.16
 *
 * @param MaxMP_Flat:num
 * @text Flat Growth
 * @parent MaxMP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param ATK
 *
 * @param ATK_Rate:num
 * @text Growth Rate
 * @parent ATK
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param ATK_Flat:num
 * @text Flat Growth
 * @parent ATK
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param DEF
 *
 * @param DEF_Rate:num
 * @text Growth Rate
 * @parent DEF
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param DEF_Flat:num
 * @text Flat Growth
 * @parent DEF
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MAT
 *
 * @param MAT_Rate:num
 * @text Growth Rate
 * @parent MAT
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param MAT_Flat:num
 * @text Flat Growth
 * @parent MAT
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MDF
 *
 * @param MDF_Rate:num
 * @text Growth Rate
 * @parent MDF
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param MDF_Flat:num
 * @text Flat Growth
 * @parent MDF
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param AGI
 *
 * @param AGI_Rate:num
 * @text Growth Rate
 * @parent AGI
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param AGI_Flat:num
 * @text Flat Growth
 * @parent AGI
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param LUK
 *
 * @param LUK_Rate:num
 * @text Growth Rate
 * @parent LUK
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param LUK_Flat:num
 * @text Flat Growth
 * @parent LUK
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param EXP
 *
 * @param EXP_Rate:num
 * @text Growth Rate
 * @parent EXP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.12
 *
 * @param EXP_Flat:num
 * @text Flat Growth
 * @parent EXP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param Gold
 *
 * @param Gold_Rate:num
 * @text Growth Rate
 * @parent Gold
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.16
 *
 * @param Gold_Flat:num
 * @text Flat Growth
 * @parent Gold
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param Drop
 *
 * @param Drop_Rate:num
 * @text Growth Rate
 * @parent Drop
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.00
 *
 * @param Drop_Flat:num
 * @text Flat Growth
 * @parent Drop
 * @desc Default flat growth amount based on level.
 * @default 0.008
 *
 */
//=============================================================================

const _0x2973=['recoverAll','reduce','Settings','GOLD','createOriginalLevel','isShowEnemyLevel','parameters','_enemyLevelRequired_SkillID','process_VisuMZ_EnemyLevel_Notetags','log','min','kdcay','EVKZl','JSON','dropItemRateApplyEnemyLevel','level','clamp','Param','image','Actor-%1-%2','qnKcn','gjQxa','DEF_Rate','ARRAYEVAL','TjMJC','AQmOA','NxuQm','Armor-%1-%2','defaultEnemyLevel','NUM','Game_Enemy_gold','sort','ATK_Flat','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','toUpperCase','ARRAYSTR','bkXmC','Enemies','HIGHEST\x20ACTOR\x20LEVEL','max','paramBaseApplyEnemyLevel','LUK_Rate','EnemyLevelSet','split','clampLevel','MAXHP','mljEO','Enemy-%1-%2','mpRate','round','xzCUH','\x27s\x20Base\x20Parameters\x20for\x20Each\x20Level','wNKId','Gold_Rate','Game_Enemy_paramBase','MAT_Flat','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','status','ARRAYNUM','JkcrQ','Level','paramBase','Item-%1-%2','General','enemyLevel','Class-%1-%2','parse','dPyYb','IBphW','_enemyLevelRequired_SkillName','meetsSkillConditions','_levelImages','eSwmM','MDF_Flat','DebugEnemyLevels','Weapon-%1-%2','trim','MaxHP_Flat','Game_Enemy_transform','EpboS','createLevel','exp','inBattle','cAuRw','drop','STRUCT','DEF','pMEQW','_enemyLevel_GrowthFlat','description','ceil','version','XAQdm','prototype','parseLevelImageNotetags','setHp','Game_Enemy_battlerName','ARRAYFUNC','ICRZZ','Glddl','value','enemy','KZXOX','MAT_Rate','ShowEnemyLv','setLevel','jsLevel','ConvertParams','_levelMin','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x201;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','traitObjects','refreshLevelImages','applyItemUserEffectEnemyLevel','PICxQ','randomInt','nfYIL','enemyLevelNameFmt','_enemyLevel_GrowthRate','BypassResist','ATK_Rate','lhmIS','format','mhp','isPlaytest','Game_Enemy_setup','transform','registerCommand','_levelMax','refresh','gainLevel','Game_Enemy_exp','includes','ZMrhh','match','maxLevel','DefaultMinLevel','length','PreserveRates','goldApplyEnemyLevel','otherParamBaseModifiers','MAT','battlerName','DefaultLevelType','AGI_Flat','PoJbR','process_VisuMZ_EnemyLevel_JS','meetsSkillConditionsEnemyLevel','createKeyJS','note','IItsd','filter','members','lLykj','getLevelType','some','table','_levelBattlerName','lwwgZ','_level','RegExp','isStaticLevelParameters','params','mmp','ARRAYSTRUCT','nxpQs','indexOf','Scene_Boot_onDatabaseLoaded','isResistLevelChange','Skill-%1-%2','MDF','MaxHP_Rate','push','setupEnemyLevels','isEnemy','hasSetEnemyLevels','onDatabaseLoaded','MAXMP','State-%1-%2','floor','dqdMh','DROP','createEnemyLevelParamGrowth','remove','AGI','return\x200','EXP','setMp','MaxMP_Flat','map','Game_Enemy_name','Game_Enemy_dropItemRate','hpRate','gold','EnemyLevel','getLevel','FUNC','expApplyEnemyLevel','EnemyNameFmt','hEJSZ','Drop_Flat','GAjcM','createLevelImages','name','_originalLevel','setup','resetLevel','createLevelModifiers','createBaseLevel','createEnemyLevelSkillRequirements','call','ATK','exit','createLevelBonus','AVERAGE\x20PARTY\x20LEVEL','DefaultPositiveVariance','Trpum','minLevel','LUK','EnemyLevelReset','DefaultNegLevelVariance'];(function(_0x51989,_0x297379){const _0x1dbc7a=function(_0x2a00a1){while(--_0x2a00a1){_0x51989['push'](_0x51989['shift']());}};_0x1dbc7a(++_0x297379);}(_0x2973,0x1d8));const _0x1dbc=function(_0x51989,_0x297379){_0x51989=_0x51989-0x0;let _0x1dbc7a=_0x2973[_0x51989];return _0x1dbc7a;};const _0x53c60a=_0x1dbc;var label=_0x53c60a('0xa1'),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine'],pluginData=$plugins[_0x53c60a('0x76')](function(_0x357c03){const _0x590324=_0x53c60a;return _0x357c03[_0x590324('0x19')]&&_0x357c03['description'][_0x590324('0x63')]('['+label+']');})[0x0];VisuMZ[label][_0x53c60a('0xbe')]=VisuMZ[label][_0x53c60a('0xbe')]||{},VisuMZ[_0x53c60a('0x4b')]=function(_0x594ede,_0x117bc1){const _0x1f065c=_0x53c60a;for(const _0x5bce7e in _0x117bc1){if('cSzau'===_0x1f065c('0xc8')){function _0x2b3aaf(){return _0x5deaa3(_0x1dbbe7['$1'])||0x1;}}else{if(_0x5bce7e[_0x1f065c('0x65')](/(.*):(.*)/i)){if(_0x1f065c('0x93')!=='dqdMh'){function _0xa11849(){const _0x221c83=_0x1f065c;this[_0x221c83('0x55')][_0x221c83('0xa0')]=_0x14d6c9;}}else{const _0x174227=String(RegExp['$1']),_0x349868=String(RegExp['$2'])[_0x1f065c('0x2')]()[_0x1f065c('0x2c')]();let _0x57caef,_0x3673e0,_0x1d8db5;switch(_0x349868){case _0x1f065c('0xd9'):_0x57caef=_0x117bc1[_0x5bce7e]!==''?Number(_0x117bc1[_0x5bce7e]):0x0;break;case _0x1f065c('0x1a'):_0x3673e0=_0x117bc1[_0x5bce7e]!==''?JSON['parse'](_0x117bc1[_0x5bce7e]):[],_0x57caef=_0x3673e0[_0x1f065c('0x9c')](_0x4c764f=>Number(_0x4c764f));break;case'EVAL':_0x57caef=_0x117bc1[_0x5bce7e]!==''?eval(_0x117bc1[_0x5bce7e]):null;break;case _0x1f065c('0xd3'):_0x3673e0=_0x117bc1[_0x5bce7e]!==''?JSON[_0x1f065c('0x22')](_0x117bc1[_0x5bce7e]):[],_0x57caef=_0x3673e0[_0x1f065c('0x9c')](_0x3b9db1=>eval(_0x3b9db1));break;case _0x1f065c('0xc9'):_0x57caef=_0x117bc1[_0x5bce7e]!==''?JSON[_0x1f065c('0x22')](_0x117bc1[_0x5bce7e]):'';break;case'ARRAYJSON':_0x3673e0=_0x117bc1[_0x5bce7e]!==''?JSON[_0x1f065c('0x22')](_0x117bc1[_0x5bce7e]):[],_0x57caef=_0x3673e0[_0x1f065c('0x9c')](_0x191281=>JSON[_0x1f065c('0x22')](_0x191281));break;case _0x1f065c('0xa3'):_0x57caef=_0x117bc1[_0x5bce7e]!==''?new Function(JSON[_0x1f065c('0x22')](_0x117bc1[_0x5bce7e])):new Function(_0x1f065c('0x98'));break;case _0x1f065c('0x41'):_0x3673e0=_0x117bc1[_0x5bce7e]!==''?JSON[_0x1f065c('0x22')](_0x117bc1[_0x5bce7e]):[],_0x57caef=_0x3673e0[_0x1f065c('0x9c')](_0x828661=>new Function(JSON[_0x1f065c('0x22')](_0x828661)));break;case'STR':_0x57caef=_0x117bc1[_0x5bce7e]!==''?String(_0x117bc1[_0x5bce7e]):'';break;case _0x1f065c('0x3'):_0x3673e0=_0x117bc1[_0x5bce7e]!==''?JSON[_0x1f065c('0x22')](_0x117bc1[_0x5bce7e]):[],_0x57caef=_0x3673e0[_0x1f065c('0x9c')](_0xf30b23=>String(_0xf30b23));break;case _0x1f065c('0x35'):_0x1d8db5=_0x117bc1[_0x5bce7e]!==''?JSON[_0x1f065c('0x22')](_0x117bc1[_0x5bce7e]):{},_0x57caef=VisuMZ['ConvertParams']({},_0x1d8db5);break;case _0x1f065c('0x83'):_0x3673e0=_0x117bc1[_0x5bce7e]!==''?JSON[_0x1f065c('0x22')](_0x117bc1[_0x5bce7e]):[],_0x57caef=_0x3673e0[_0x1f065c('0x9c')](_0x49522f=>VisuMZ[_0x1f065c('0x4b')]({},JSON[_0x1f065c('0x22')](_0x49522f)));break;default:continue;}_0x594ede[_0x174227]=_0x57caef;}}}}return _0x594ede;},(_0x464917=>{const _0x21b2ba=_0x53c60a,_0x1044bf=_0x464917[_0x21b2ba('0xaa')];for(const _0x5e794a of dependencies){if('LazCu'!==_0x21b2ba('0x75')){if(!Imported[_0x5e794a]){if(_0x21b2ba('0x14')!==_0x21b2ba('0x14')){function _0x32765c(){const _0x18680e=_0x21b2ba;if(_0x538cd[_0x18680e('0x5b')]())_0x58e9b3[_0x18680e('0xc5')](_0x17cc3c);}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x1044bf,_0x5e794a)),SceneManager['exit']();break;}}}else{function _0x5da9f1(){const _0x469dc3=_0x21b2ba;return this[_0x469dc3('0x72')](_0x3f3994)&&_0x559f84[_0x469dc3('0xa1')]['Game_BattlerBase_meetsSkillConditions'][_0x469dc3('0xb1')](this,_0x3aef3d);}}}const _0x2ad6a7=_0x464917[_0x21b2ba('0x39')];if(_0x2ad6a7['match'](/\[Version[ ](.*?)\]/i)){const _0x382be8=Number(RegExp['$1']);_0x382be8!==VisuMZ[label][_0x21b2ba('0x3b')]&&(alert(_0x21b2ba('0x18')['format'](_0x1044bf,_0x382be8)),SceneManager[_0x21b2ba('0xb3')]());}if(_0x2ad6a7[_0x21b2ba('0x65')](/\[Tier[ ](\d+)\]/i)){if(_0x21b2ba('0x42')!==_0x21b2ba('0x42')){function _0x8edc12(){const _0x540592=_0x21b2ba;this[_0x540592('0x38')][_0x540592('0x31')]=_0x1646a3;}}else{const _0x3e0bb0=Number(RegExp['$1']);if(_0x3e0bb0<tier)alert(_0x21b2ba('0x1')['format'](_0x1044bf,_0x3e0bb0,tier)),SceneManager['exit']();else{if(_0x21b2ba('0x7d')!==_0x21b2ba('0x7d')){function _0x2c85eb(){const _0x35e328=_0x21b2ba;return this[_0x35e328('0xcb')]>=this[_0x35e328('0x25')][_0x52023e];}}else tier=Math[_0x21b2ba('0x7')](_0x3e0bb0,tier);}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x21b2ba('0xbe')],_0x464917[_0x21b2ba('0xc2')]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x53c60a('0xaa')],'EnemyLevelChange',_0xe7c345=>{const _0x314fb5=_0x53c60a;if(!$gameParty[_0x314fb5('0x32')]())return;VisuMZ[_0x314fb5('0x4b')](_0xe7c345,_0xe7c345);const _0x120aef=_0xe7c345[_0x314fb5('0x5')][_0x314fb5('0x9c')](_0x162be5=>$gameTroop[_0x314fb5('0x77')]()[_0x162be5])[_0x314fb5('0x96')](null),_0x2d7c5b=_0xe7c345[_0x314fb5('0x1c')],_0x19d6e6=_0xe7c345[_0x314fb5('0x56')];for(const _0x2cc807 of _0x120aef){if(!_0x2cc807)continue;if(!_0x19d6e6&&_0x2cc807[_0x314fb5('0x87')]())continue;_0x2cc807['gainLevel'](_0x2d7c5b);}}),PluginManager['registerCommand'](pluginData[_0x53c60a('0xaa')],_0x53c60a('0xba'),_0x4b2080=>{const _0x363b83=_0x53c60a;if(!$gameParty[_0x363b83('0x32')]())return;VisuMZ[_0x363b83('0x4b')](_0x4b2080,_0x4b2080);const _0x2707f5=_0x4b2080[_0x363b83('0x5')][_0x363b83('0x9c')](_0x44fd55=>$gameTroop[_0x363b83('0x77')]()[_0x44fd55])[_0x363b83('0x96')](null),_0x2af72d=_0x4b2080[_0x363b83('0x56')];for(const _0x1fa864 of _0x2707f5){if(_0x363b83('0xa6')!==_0x363b83('0xa6')){function _0x2c414b(){const _0x40e5c0=_0x363b83;this[_0x40e5c0('0x55')]['drop']=_0x766cf6;}}else{if(!_0x1fa864)continue;if(!_0x2af72d&&_0x1fa864[_0x363b83('0x87')]())continue;_0x1fa864['resetLevel']();}}}),PluginManager['registerCommand'](pluginData['name'],_0x53c60a('0xa'),_0x3f40d5=>{const _0x395118=_0x53c60a;if(!$gameParty[_0x395118('0x32')]())return;VisuMZ['ConvertParams'](_0x3f40d5,_0x3f40d5);const _0x309720=_0x3f40d5[_0x395118('0x5')][_0x395118('0x9c')](_0x95743a=>$gameTroop['members']()[_0x95743a])[_0x395118('0x96')](null),_0x1aed6c=_0x3f40d5[_0x395118('0x1c')],_0x13010b=_0x3f40d5[_0x395118('0x56')];for(const _0x536e53 of _0x309720){if(_0x395118('0x84')===_0x395118('0x84')){if(!_0x536e53)continue;if(!_0x13010b&&_0x536e53[_0x395118('0x87')]())continue;_0x536e53[_0x395118('0x49')](_0x1aed6c);}else{function _0x49286a(){const _0x105ec2=_0x395118;this[_0x105ec2('0xab')]=this['_level'];}}}}),PluginManager[_0x53c60a('0x5e')](pluginData[_0x53c60a('0xaa')],_0x53c60a('0x2a'),_0xb935d3=>{const _0xd405cd=_0x53c60a;if(!$gameParty[_0xd405cd('0x32')]())return;if(!$gameTemp[_0xd405cd('0x5b')]())return;VisuMZ[_0xd405cd('0x4b')](_0xb935d3,_0xb935d3);const _0x4307c4=_0xb935d3[_0xd405cd('0x5')]['map'](_0x513f05=>$gameTroop['members']()[_0x513f05])[_0xd405cd('0x96')](null);for(const _0x33b047 of _0x4307c4){if(!_0x33b047)continue;const _0x23e1bf=[];for(let _0xd6577b=_0x33b047[_0xd405cd('0xb8')]();_0xd6577b<=_0x33b047[_0xd405cd('0x66')]();_0xd6577b++){const _0x851eac=_0x33b047[_0xd405cd('0x45')](),_0x25a23b=_0xd6577b-0x1,_0xba3459={'MaxHP':Math[_0xd405cd('0x11')](_0x33b047['paramBaseApplyEnemyLevel'](0x0,_0x25a23b,_0x851eac['params'][0x0])),'MaxMP':Math[_0xd405cd('0x11')](_0x33b047[_0xd405cd('0x8')](0x1,_0x25a23b,_0x851eac[_0xd405cd('0x81')][0x1])),'ATK':Math[_0xd405cd('0x11')](_0x33b047[_0xd405cd('0x8')](0x2,_0x25a23b,_0x851eac[_0xd405cd('0x81')][0x2])),'DEF':Math['round'](_0x33b047['paramBaseApplyEnemyLevel'](0x3,_0x25a23b,_0x851eac['params'][0x3])),'MAT':Math[_0xd405cd('0x11')](_0x33b047[_0xd405cd('0x8')](0x4,_0x25a23b,_0x851eac[_0xd405cd('0x81')][0x4])),'MDF':Math['round'](_0x33b047['paramBaseApplyEnemyLevel'](0x5,_0x25a23b,_0x851eac[_0xd405cd('0x81')][0x5])),'AGI':Math[_0xd405cd('0x11')](_0x33b047[_0xd405cd('0x8')](0x6,_0x25a23b,_0x851eac[_0xd405cd('0x81')][0x6])),'LUK':Math[_0xd405cd('0x11')](_0x33b047['paramBaseApplyEnemyLevel'](0x7,_0x25a23b,_0x851eac[_0xd405cd('0x81')][0x7])),'Exp':Math[_0xd405cd('0x11')](_0x33b047['expApplyEnemyLevel'](_0x851eac['exp'],_0x25a23b)),'Gold':Math[_0xd405cd('0x11')](_0x33b047[_0xd405cd('0x6a')](_0x851eac[_0xd405cd('0xa0')],_0x25a23b)),'Drop':Math[_0xd405cd('0x11')](_0x33b047['dropItemRateApplyEnemyLevel'](0x1,_0x25a23b)*0x64)+'%'};_0x23e1bf[_0xd6577b]=_0xba3459;}console['log'](_0x33b047[_0xd405cd('0xaa')]()+_0xd405cd('0x13')),console[_0xd405cd('0x7b')](_0x23e1bf);}}),VisuMZ['EnemyLevel'][_0x53c60a('0x86')]=Scene_Boot['prototype'][_0x53c60a('0x8f')],Scene_Boot[_0x53c60a('0x3d')][_0x53c60a('0x8f')]=function(){const _0x13b600=_0x53c60a;VisuMZ[_0x13b600('0xa1')][_0x13b600('0x86')][_0x13b600('0xb1')](this),this[_0x13b600('0xc4')]();},Scene_Boot[_0x53c60a('0x3d')][_0x53c60a('0xc4')]=function(){const _0x58a23d=_0x53c60a;this[_0x58a23d('0x71')]();},VisuMZ['EnemyLevel']['RegExp']={'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i,'jsLevel':/<JS LEVEL: (.*)>/i},VisuMZ['EnemyLevel']['JS']={},Scene_Boot['prototype'][_0x53c60a('0x71')]=function(){const _0x2bb9de=_0x53c60a,_0x1a0c8d=$dataActors['concat']($dataClasses,$dataSkills,$dataItems,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x2d84a9 of _0x1a0c8d){if(!_0x2d84a9)continue;const _0x10e0e5=_0x2bb9de('0x4a'),_0x228775=VisuMZ[_0x2bb9de('0xa1')][_0x2bb9de('0x7f')]['jsLevel'];VisuMZ[_0x2bb9de('0xa1')]['createJS'](_0x2d84a9,_0x10e0e5,_0x228775);}},VisuMZ[_0x53c60a('0xa1')]['createJS']=function(_0x2fb041,_0x1ed244,_0x1070e2){const _0x29df66=_0x53c60a,_0x493ab0=_0x2fb041[_0x29df66('0x74')];if(_0x493ab0[_0x29df66('0x65')](_0x1070e2)){const _0x4ad4f7=String(RegExp['$1']),_0x4f260c=_0x29df66('0x4d')[_0x29df66('0x59')](_0x4ad4f7),_0x2d1f83=VisuMZ[_0x29df66('0xa1')][_0x29df66('0x73')](_0x2fb041,_0x1ed244);VisuMZ[_0x29df66('0xa1')]['JS'][_0x2d1f83]=new Function(_0x4f260c);}},VisuMZ[_0x53c60a('0xa1')]['createKeyJS']=function(_0x49deda,_0x83ee20){const _0x44b77f=_0x53c60a;let _0x34ddc0='';if($dataActors[_0x44b77f('0x63')](_0x49deda))_0x34ddc0=_0x44b77f('0xcf')[_0x44b77f('0x59')](_0x49deda['id'],_0x83ee20);if($dataClasses[_0x44b77f('0x63')](_0x49deda))_0x34ddc0=_0x44b77f('0x21')['format'](_0x49deda['id'],_0x83ee20);if($dataSkills[_0x44b77f('0x63')](_0x49deda))_0x34ddc0=_0x44b77f('0x88')['format'](_0x49deda['id'],_0x83ee20);if($dataItems[_0x44b77f('0x63')](_0x49deda))_0x34ddc0=_0x44b77f('0x1e')['format'](_0x49deda['id'],_0x83ee20);if($dataWeapons['includes'](_0x49deda))_0x34ddc0=_0x44b77f('0x2b')[_0x44b77f('0x59')](_0x49deda['id'],_0x83ee20);if($dataArmors[_0x44b77f('0x63')](_0x49deda))_0x34ddc0=_0x44b77f('0xd7')[_0x44b77f('0x59')](_0x49deda['id'],_0x83ee20);if($dataEnemies['includes'](_0x49deda))_0x34ddc0=_0x44b77f('0xf')['format'](_0x49deda['id'],_0x83ee20);if($dataStates[_0x44b77f('0x63')](_0x49deda))_0x34ddc0=_0x44b77f('0x91')[_0x44b77f('0x59')](_0x49deda['id'],_0x83ee20);return _0x34ddc0;},TextManager[_0x53c60a('0x54')]=VisuMZ[_0x53c60a('0xa1')][_0x53c60a('0xbe')]['General'][_0x53c60a('0xa5')],VisuMZ['EnemyLevel']['Game_Action_applyItemUserEffect']=Game_Action[_0x53c60a('0x3d')]['applyItemUserEffect'],Game_Action[_0x53c60a('0x3d')]['applyItemUserEffect']=function(_0x77a725){const _0x5571c1=_0x53c60a;VisuMZ['EnemyLevel']['Game_Action_applyItemUserEffect'][_0x5571c1('0xb1')](this,_0x77a725),this[_0x5571c1('0x50')](_0x77a725);},Game_Action[_0x53c60a('0x3d')][_0x53c60a('0x50')]=function(_0x44094e){const _0x59fe4f=_0x53c60a;if(!_0x44094e)return;if(!_0x44094e[_0x59fe4f('0x8d')]())return;if(_0x44094e[_0x59fe4f('0x87')]())return;const _0x21de44=this['item']()[_0x59fe4f('0x74')];if(_0x21de44[_0x59fe4f('0x65')](/<CHANGE ENEMY LEVEL: ([\+\-]\d+)>/i))_0x44094e[_0x59fe4f('0x61')](Number(RegExp['$1']));else{if(_0x21de44[_0x59fe4f('0x65')](/<JS CHANGE ENEMY LEVEL: (.*)>/i))try{if('qJwca'!=='jgEuM')_0x44094e['gainLevel'](eval(RegExp['$1'])||0x0);else{function _0x5dd452(){const _0x2432b4=_0x59fe4f,_0x5905e0=_0x1e9280(_0x5864cc['$1']),_0x32c2d9=_0x2a7835(_0x106e2c['$2']),_0x92aea2=_0x2f8e40['min'](_0x5905e0,_0x32c2d9),_0x59da55=_0x2302f5[_0x2432b4('0x7')](_0x5905e0,_0x32c2d9);this[_0x2432b4('0x7e')]=_0x1cc636[_0x2432b4('0x92')](_0x92aea2+_0x24e10f[_0x2432b4('0x52')](_0x59da55-_0x92aea2+0x1));}}}catch(_0x520a20){if(_0x59fe4f('0x70')!=='PoJbR'){function _0x2ec780(){const _0xaace14=_0x59fe4f,_0x3d2daa=_0x3ae0c5[_0xaace14('0xa1')]['Game_Enemy_name'][_0xaace14('0xb1')](this);if(!this[_0xaace14('0xc1')]())return _0x3d2daa;return _0x3f58f7[_0xaace14('0x54')][_0xaace14('0x59')](this[_0xaace14('0xcb')],_0x3d2daa);}}else{if($gameTemp[_0x59fe4f('0x5b')]())console[_0x59fe4f('0xc5')](_0x520a20);}}}_0x21de44['match'](/<RESET ENEMY LEVEL>/i)&&_0x44094e['resetLevel']();},VisuMZ[_0x53c60a('0xa1')]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x53c60a('0x3d')]['meetsSkillConditions'],Game_BattlerBase['prototype'][_0x53c60a('0x26')]=function(_0x1ec3d7){const _0x15df19=_0x53c60a;return this[_0x15df19('0x72')](_0x1ec3d7)&&VisuMZ['EnemyLevel']['Game_BattlerBase_meetsSkillConditions'][_0x15df19('0xb1')](this,_0x1ec3d7);},Game_BattlerBase[_0x53c60a('0x3d')][_0x53c60a('0x72')]=function(_0x5f3e3d){return!![];},Object['defineProperty'](Game_Enemy[_0x53c60a('0x3d')],'level',{'get':function(){const _0x47d81f=_0x53c60a;return this[_0x47d81f('0xa2')]();},'configurable':!![]}),Game_Enemy[_0x53c60a('0x3d')]['getLevel']=function(){const _0x326a35=_0x53c60a;return this['_level']=this['_level']||this[_0x326a35('0x30')](),this[_0x326a35('0xc')]();},VisuMZ['EnemyLevel'][_0x53c60a('0x5c')]=Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xac')],Game_Enemy['prototype'][_0x53c60a('0xac')]=function(_0x1e40c9,_0x5a4c90,_0x5eecdc){const _0x43f287=_0x53c60a;VisuMZ[_0x43f287('0xa1')][_0x43f287('0x5c')][_0x43f287('0xb1')](this,_0x1e40c9,_0x5a4c90,_0x5eecdc),this['setupEnemyLevels']();},Game_Enemy['prototype'][_0x53c60a('0x8c')]=function(){const _0x3a15d4=_0x53c60a;this[_0x3a15d4('0x30')](),this['createLevelImages'](),this[_0x3a15d4('0x95')](![]),this[_0x3a15d4('0xb0')](![]),this['refresh'](),this[_0x3a15d4('0xbc')]();},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x30')]=function(){const _0x1d508e=_0x53c60a;this[_0x1d508e('0xaf')](),this[_0x1d508e('0xb4')](),this['createLevelModifiers'](),this[_0x1d508e('0xc0')]();},Game_Enemy['prototype']['createBaseLevel']=function(){const _0x49d07b=_0x53c60a,_0x4ef5a4=this[_0x49d07b('0x45')]()[_0x49d07b('0x74')];this['_level']=this['defaultEnemyLevel']();const _0x47b711=VisuMZ['EnemyLevel']['createKeyJS'](this[_0x49d07b('0x45')](),_0x49d07b('0x4a'));if(_0x4ef5a4[_0x49d07b('0x65')](/<LEVEL: (\d+)>/i))this[_0x49d07b('0x7e')]=Number(RegExp['$1'])||0x1;else{if(_0x4ef5a4[_0x49d07b('0x65')](/<LEVEL: (\d+) TO (\d+)>/i)){if(_0x49d07b('0x23')===_0x49d07b('0x23')){const _0x2fa6cb=Number(RegExp['$1']),_0x1f949e=Number(RegExp['$2']),_0x3e9868=Math['min'](_0x2fa6cb,_0x1f949e),_0x142798=Math['max'](_0x2fa6cb,_0x1f949e);this[_0x49d07b('0x7e')]=Math[_0x49d07b('0x92')](_0x3e9868+Math['randomInt'](_0x142798-_0x3e9868+0x1));}else{function _0x3c1e20(){return _0x536173(_0x15e72e['$1'])||0x1;}}}else{if(_0x4ef5a4[_0x49d07b('0x65')](/LEVEL VARIABLE: (\d+)/i)){if(_0x49d07b('0xa8')===_0x49d07b('0xa8'))this[_0x49d07b('0x7e')]=$gameVariables['value'](Number(RegExp['$1'])||0x1);else{function _0x310bce(){const _0x37fae6=_0x49d07b;return this[_0x37fae6('0x7e')]=this[_0x37fae6('0x7e')]||this[_0x37fae6('0x30')](),this[_0x37fae6('0xc')]();}}}else{if(_0x4ef5a4[_0x49d07b('0x65')](/<LEVEL: (.*)>/i)){const _0x2d7aaa=String(RegExp['$1'])[_0x49d07b('0x2')]()[_0x49d07b('0x2c')]();this[_0x49d07b('0x7e')]=$gameParty[_0x49d07b('0x79')](_0x2d7aaa)||0x1;}else{if(VisuMZ['EnemyLevel']['JS'][_0x47b711])this[_0x49d07b('0x7e')]=Math[_0x49d07b('0x92')](VisuMZ[_0x49d07b('0xa1')]['JS'][_0x47b711][_0x49d07b('0xb1')](this,this,this))||0x1;else{if($gameMap&&$gameMap[_0x49d07b('0x8e')]()){if(_0x49d07b('0x33')===_0x49d07b('0x33'))this['_level']=$gameMap['enemyLevel']();else{function _0x14b650(){const _0x43ef6a=_0x49d07b;_0x3eb263=-0x1*_0x1adc7e[_0x43ef6a('0x92')](_0x4f3aa5(_0x5d95bc['$1'])||0x0);}}}}}}}}},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xd8')]=function(){const _0x1bcf6e=_0x53c60a,_0x564177=VisuMZ['EnemyLevel'][_0x1bcf6e('0xbe')][_0x1bcf6e('0x1f')][_0x1bcf6e('0x6e')]['toUpperCase']()[_0x1bcf6e('0x2c')]();if(_0x564177[_0x1bcf6e('0x65')](/STATIC (\d+)/i))return Number(RegExp['$1'])||0x1;else{if(_0x564177[_0x1bcf6e('0x65')](/VARIABLE (\d+)/i))return $gameVariables[_0x1bcf6e('0x44')](Number(RegExp['$1'])||0x1);else return _0x564177[_0x1bcf6e('0x65')](/(ACTOR|PARTY) LEVEL/i)?$gameParty['getLevelType'](_0x564177):0x1;}},Game_Enemy[_0x53c60a('0x3d')]['createLevelBonus']=function(){const _0x1fc47e=_0x53c60a,_0x519778=this['enemy']()[_0x1fc47e('0x74')];if(_0x519778[_0x1fc47e('0x65')](/<LEVEL BONUS: ([\+\-]\d+)>/i))this[_0x1fc47e('0x7e')]+=Number(RegExp['$1']);else{if(_0x519778[_0x1fc47e('0x65')](/<JS LEVEL BONUS: (.*)>/i))try{if(_0x1fc47e('0x2f')!==_0x1fc47e('0xb7'))this['_level']+=Math[_0x1fc47e('0x92')](Number(eval(RegExp['$1'])||0x0));else{function _0x207542(){const _0x52e4c7=_0x1fc47e;try{_0x4c0d8c=-0x1*_0x316a60[_0x52e4c7('0x92')](_0x14191d(_0x3809d9['$1'])||0x0);}catch(_0x163a80){if(_0x22bde3['isPlaytest']())_0x393870[_0x52e4c7('0xc5')](_0x163a80);}}}}catch(_0x489e52){if($gameTemp[_0x1fc47e('0x5b')]())console[_0x1fc47e('0xc5')](_0x489e52);}}},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xae')]=function(){const _0x406a73=_0x53c60a;let _0x39712d=VisuMZ[_0x406a73('0xa1')][_0x406a73('0xbe')]['General'][_0x406a73('0xbb')]*-0x1,_0x4170cb=VisuMZ[_0x406a73('0xa1')][_0x406a73('0xbe')][_0x406a73('0x1f')][_0x406a73('0xb6')];const _0xbdc863=this[_0x406a73('0x45')]()[_0x406a73('0x74')];if(_0xbdc863[_0x406a73('0x65')](/<LEVEL VARIANCE: (\d+)>/i))_0x39712d=-0x1*Number(RegExp['$1']),_0x4170cb=Number(RegExp['$1']);else{if(_0xbdc863[_0x406a73('0x65')](/<JS LEVEL VARIANCE: (.*)>/i)){let _0x5bb0cb=0x0;try{_0x5bb0cb=Math[_0x406a73('0x92')](eval(RegExp['$1'])||0x0);}catch(_0x14223f){if($gameTemp[_0x406a73('0x5b')]())console['log'](_0x14223f);}_0x39712d=-0x1*_0x5bb0cb,_0x4170cb=_0x5bb0cb;}}if(_0xbdc863[_0x406a73('0x65')](/<NEGATIVE LEVEL VARIANCE: (\d+)>/i)){if(_0x406a73('0xd4')==='xFEmv'){function _0x51ddb7(){const _0x495e50=_0x406a73;if(this[_0x495e50('0x80')]())return _0x15fa36;this[_0x495e50('0x95')](!![]);const _0x400cf0=this;let _0x39dd10=_0x99aeb6;const _0x268aea=this[_0x495e50('0x55')][_0x495e50('0x34')],_0x2750e0=this[_0x495e50('0x38')][_0x495e50('0x34')];return _0x39dd10=_0x4ec332+_0x2e6ad1*_0x52c56d*_0x268aea+_0x2540e2*_0x2750e0,_0x39dd10;}}else _0x39712d=-0x1*Number(RegExp['$1']);}else{if(_0xbdc863[_0x406a73('0x65')](/<JS NEGATIVE LEVEL VARIANCE: (.*)>/i))try{_0x39712d=-0x1*Math[_0x406a73('0x92')](eval(RegExp['$1'])||0x0);}catch(_0x1b6a28){if($gameTemp[_0x406a73('0x5b')]())console[_0x406a73('0xc5')](_0x1b6a28);}}if(_0xbdc863['match'](/<POSITIVE LEVEL VARIANCE: (\d+)>/i))_0x4170cb=Number(RegExp['$1']);else{if(_0xbdc863[_0x406a73('0x65')](/<JS POSITIVE LEVEL VARIANCE: (.*)>/i))try{_0x4170cb=Math[_0x406a73('0x92')](eval(RegExp['$1'])||0x0);}catch(_0x1e792d){if($gameTemp[_0x406a73('0x5b')]())console[_0x406a73('0xc5')](_0x1e792d);}}if(_0x39712d>_0x4170cb)_0x4170cb=_0x39712d;this['_level']+=Math[_0x406a73('0x92')](_0x39712d+Math[_0x406a73('0x52')](_0x4170cb-_0x39712d+0x1));},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xc0')]=function(){const _0x1bbc26=_0x53c60a;this[_0x1bbc26('0xab')]=this['_level'];},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xad')]=function(){const _0x415f59=_0x53c60a;this[_0x415f59('0x49')](this['_originalLevel']);},Game_Enemy['prototype']['clampLevel']=function(){const _0x20c520=_0x53c60a;if(this[_0x20c520('0x7e')]===undefined)this[_0x20c520('0x30')]();return this[_0x20c520('0x7e')]=this['_level'][_0x20c520('0xcc')](this[_0x20c520('0xb8')](),this[_0x20c520('0x66')]()),this[_0x20c520('0x7e')];},Game_Enemy['prototype'][_0x53c60a('0xb8')]=function(){const _0x19fc80=_0x53c60a;if(this[_0x19fc80('0x4c')]!==undefined)return this['_levelMin'];const _0x2d41bb=this['enemy']()[_0x19fc80('0x74')],_0x1fca86=this;this[_0x19fc80('0x4c')]=VisuMZ['EnemyLevel'][_0x19fc80('0xbe')][_0x19fc80('0x1f')][_0x19fc80('0x67')];if(_0x2d41bb[_0x19fc80('0x65')](/<MINIMUM LEVEL: (\d+)>/i)){if(_0x19fc80('0x78')!==_0x19fc80('0x64'))this[_0x19fc80('0x4c')]=Number(RegExp['$1'])||0x1;else{function _0x3602f1(){const _0x9cfbac=_0x19fc80;this[_0x9cfbac('0x5f')]=_0x370e3d[_0x9cfbac('0x92')](_0x1bdf71(_0x5eea06['$1'])||0x1);}}}else{if(_0x2d41bb[_0x19fc80('0x65')](/<JS MINIMUM LEVEL: (.*)>/i)){if(_0x19fc80('0x51')!=='PICxQ'){function _0x2c9215(){const _0x2f61af=_0x19fc80;_0x5eed95[_0x2f61af('0xa1')]['Game_Action_applyItemUserEffect'][_0x2f61af('0xb1')](this,_0x55d5d7),this[_0x2f61af('0x50')](_0x130d77);}}else try{if(_0x19fc80('0xc7')!==_0x19fc80('0xc7')){function _0x27f9a2(){const _0x445ff9=_0x19fc80;if(this['isStaticLevelParameters']())return _0x198be5;this[_0x445ff9('0x95')](!![]);const _0x3b2e1d=this;let _0x10fa6c=_0x5aa821;const _0x37ca05=this[_0x445ff9('0x55')][_0x5446c1],_0x2c6625=this[_0x445ff9('0x38')][_0x169f64];return _0x10fa6c=_0x59f617+_0x191e14*_0x652dcb*_0x37ca05+_0x99e479*_0x2c6625,_0x10fa6c;}}else this['_levelMin']=Math[_0x19fc80('0x92')](eval(RegExp['$1'])||0x1);}catch(_0x3d6cf7){if('gjQxa'!==_0x19fc80('0xd1')){function _0x2c50e7(){const _0x1fa087=_0x19fc80;_0x4bb28f[_0x1fa087('0x61')](_0x8e0b0b(_0x4be3ed['$1'])||0x0);}}else{if($gameTemp['isPlaytest']())console[_0x19fc80('0xc5')](_0x3d6cf7);}}}}return this[_0x19fc80('0x4c')];},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x66')]=function(){const _0x2d3012=_0x53c60a;if(this['_levelMax']!==undefined)return this['_levelMax'];const _0x5e77f2=this['enemy']()[_0x2d3012('0x74')],_0x74eb4d=this;this[_0x2d3012('0x5f')]=VisuMZ['EnemyLevel'][_0x2d3012('0xbe')][_0x2d3012('0x1f')]['DefaultMaxLevel'];if(_0x5e77f2[_0x2d3012('0x65')](/<MAXIMUM LEVEL: (\d+)>/i))this['_levelMax']=Number(RegExp['$1'])||0x1;else{if(_0x5e77f2['match'](/<JS MAXIMUM LEVEL: (.*)>/i)){if(_0x2d3012('0xd0')!==_0x2d3012('0xd0')){function _0x18a872(){const _0x1d7594=_0x2d3012;this[_0x1d7594('0x3f')](_0x20cf6c[_0x1d7594('0x3a')](this['mhp']*_0x1b27a4)),this[_0x1d7594('0x9a')](_0x22764e[_0x1d7594('0x3a')](this[_0x1d7594('0x82')]*_0x3af758));}}else try{if(_0x2d3012('0xe')===_0x2d3012('0xe'))this[_0x2d3012('0x5f')]=Math[_0x2d3012('0x92')](eval(RegExp['$1'])||0x1);else{function _0x14ecf7(){const _0xeb4298=_0x2d3012;try{this[_0xeb4298('0x5f')]=_0xf84134[_0xeb4298('0x92')](_0x4311c2(_0x50d5fd['$1'])||0x1);}catch(_0x456909){if(_0x15cac1[_0xeb4298('0x5b')]())_0xe1eaca[_0xeb4298('0xc5')](_0x456909);}}}}catch(_0x1ae941){if($gameTemp[_0x2d3012('0x5b')]())console[_0x2d3012('0xc5')](_0x1ae941);}}}return this[_0x2d3012('0x5f')];},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x49')]=function(_0x907b29){const _0xa30665=_0x53c60a;if(this['_level']===undefined)this[_0xa30665('0x30')]();const _0xbc0b68=this[_0xa30665('0x9f')](),_0x3fedd2=this[_0xa30665('0x10')]();this[_0xa30665('0x7e')]=_0x907b29,this[_0xa30665('0xc')](),this[_0xa30665('0x4f')](),VisuMZ[_0xa30665('0xa1')][_0xa30665('0xbe')][_0xa30665('0x1f')][_0xa30665('0x69')]?(this[_0xa30665('0x3f')](Math[_0xa30665('0x3a')](this[_0xa30665('0x5a')]*_0xbc0b68)),this[_0xa30665('0x9a')](Math[_0xa30665('0x3a')](this['mmp']*_0x3fedd2))):this[_0xa30665('0x60')]();},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x61')]=function(_0x1f4ef8){const _0xffc51=_0x53c60a;if(this[_0xffc51('0x7e')]===undefined)this[_0xffc51('0x30')]();this[_0xffc51('0x49')](this['_level']+_0x1f4ef8);},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x87')]=function(){const _0x11f4b3=_0x53c60a;return this[_0x11f4b3('0x4e')]()[_0x11f4b3('0x7a')](_0x1f8a20=>_0x1f8a20&&_0x1f8a20['note']['match'](/<RESIST LEVEL CHANGE>/i));},VisuMZ[_0x53c60a('0xa1')][_0x53c60a('0x9d')]=Game_Enemy['prototype']['name'],Game_Enemy['prototype'][_0x53c60a('0xaa')]=function(){const _0x258d99=_0x53c60a,_0x48b08d=VisuMZ['EnemyLevel']['Game_Enemy_name'][_0x258d99('0xb1')](this);if(!this[_0x258d99('0xc1')]())return _0x48b08d;return TextManager[_0x258d99('0x54')][_0x258d99('0x59')](this[_0x258d99('0xcb')],_0x48b08d);},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xc1')]=function(){const _0x24daa6=_0x53c60a,_0x9965d7=this['enemy']()[_0x24daa6('0x74')];if(_0x9965d7[_0x24daa6('0x65')](/<SHOW LEVEL>/i))return!![];else{if(_0x9965d7[_0x24daa6('0x65')](/<HIDE LEVEL>/i))return![];else{if(_0x24daa6('0x58')!=='lhmIS'){function _0x24c922(){const _0x5008a7=_0x24daa6;this[_0x5008a7('0x55')][_0x5d8185]=_0x3620fe;}}else return VisuMZ[_0x24daa6('0xa1')][_0x24daa6('0xbe')]['General'][_0x24daa6('0x48')];}}},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x80')]=function(){const _0x6f87ee=_0x53c60a;return this[_0x6f87ee('0x45')]()&&this[_0x6f87ee('0x45')]()['note'][_0x6f87ee('0x65')](/<STATIC LEVEL PARAMETERS>/i);},VisuMZ[_0x53c60a('0xa1')][_0x53c60a('0x16')]=Game_Enemy['prototype'][_0x53c60a('0x1d')],Game_Enemy['prototype'][_0x53c60a('0x1d')]=function(_0x17b96c){const _0x1ebff1=_0x53c60a,_0x1e51f4=VisuMZ[_0x1ebff1('0xa1')][_0x1ebff1('0x16')][_0x1ebff1('0xb1')](this,_0x17b96c),_0x56ccee=this[_0x1ebff1('0x6b')](),_0x131490=this[_0x1ebff1('0xcb')]-0x1;return this['paramBaseApplyEnemyLevel'](_0x17b96c,_0x131490,_0x1e51f4+_0x56ccee);},Game_Enemy[_0x53c60a('0x3d')]['otherParamBaseModifiers']=function(_0x2d03d8){return 0x0;},Game_Enemy[_0x53c60a('0x3d')]['createLevelImages']=function(){const _0x49f21e=_0x53c60a;this[_0x49f21e('0x27')]=[{'level':0x1,'image':this[_0x49f21e('0x45')]()[_0x49f21e('0x6d')]}],this[_0x49f21e('0x3e')](),this[_0x49f21e('0x27')][_0x49f21e('0xdb')]((_0x8c0060,_0x48f46e)=>_0x8c0060[_0x49f21e('0xcb')]-_0x48f46e[_0x49f21e('0xcb')]),this[_0x49f21e('0x4f')]();},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x3e')]=function(){const _0x141fac=_0x53c60a,_0xb6fdf0=this[_0x141fac('0x45')]()['note'],_0x53ab34=_0xb6fdf0[_0x141fac('0x65')](/<LEVEL[ ](\d+)[ ]IMAGE:[ ](.*)>/gi);if(_0x53ab34){if(_0x141fac('0x37')!=='pMEQW'){function _0x2c8463(){const _0x4c95aa=_0x141fac;this[_0x4c95aa('0x25')][_0x409ac0]=_0x295885;}}else for(const _0x116215 of _0x53ab34){if(!_0x116215)continue;_0x116215[_0x141fac('0x65')](/<LEVEL[ ](\d+)[ ]IMAGE:[ ](.*)>/i);const _0x380e12=Number(RegExp['$1'])||0x1,_0x54bb60=String(RegExp['$2']);this[_0x141fac('0x27')]['push']({'level':_0x380e12,'image':_0x54bb60});}}if(_0xb6fdf0[_0x141fac('0x65')](/<LEVEL (?:IMAGE|IMAGES)>\s*([\s\S]*)\s*<\/LEVEL (?:IMAGE|IMAGES)>/i)){const _0x3c176b=String(RegExp['$1'])[_0x141fac('0xb')](/[\r\n]+/);for(const _0x35ec78 of _0x3c176b){if('OhpWE'===_0x141fac('0x3c')){function _0xe11531(){const _0x1d9ff6=_0x141fac;if(_0x414493[_0x1d9ff6('0x5b')]())_0xc9276c[_0x1d9ff6('0xc5')](_0x44c755);}}else{if(!_0x35ec78)continue;if(_0x35ec78[_0x141fac('0x65')](/(\d+):[ ](.*)/i)){const _0x1408a9=Number(RegExp['$1'])||0x1,_0x2e9ce0=String(RegExp['$2']);this[_0x141fac('0x27')][_0x141fac('0x8b')]({'level':_0x1408a9,'image':_0x2e9ce0});}}}}},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x4f')]=function(){const _0x402b85=_0x53c60a;this[_0x402b85('0x7c')]=this[_0x402b85('0x45')]()[_0x402b85('0x6d')];for(const _0x58c21d of this[_0x402b85('0x27')]){if(_0x402b85('0x1b')===_0x402b85('0x24')){function _0x396031(){const _0x5c07bf=_0x402b85;if(_0x120623[_0x5c07bf('0x5b')]())_0x5dd7bc[_0x5c07bf('0xc5')](_0x2577ca);}}else{if(!_0x58c21d)continue;this['_level']>=_0x58c21d[_0x402b85('0xcb')]&&(this['_levelBattlerName']=_0x58c21d[_0x402b85('0xce')]);}}},VisuMZ[_0x53c60a('0xa1')][_0x53c60a('0x40')]=Game_Enemy[_0x53c60a('0x3d')]['battlerName'],Game_Enemy['prototype'][_0x53c60a('0x6d')]=function(){const _0x1f9909=_0x53c60a;return this[_0x1f9909('0x7c')]||VisuMZ[_0x1f9909('0xa1')]['Game_Enemy_battlerName'][_0x1f9909('0xb1')](this);},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x95')]=function(_0x283e14){const _0x5972dd=_0x53c60a;if(_0x283e14&&this[_0x5972dd('0x55')]&&this[_0x5972dd('0x38')])return;const _0xe8a9c7=VisuMZ[_0x5972dd('0xa1')][_0x5972dd('0xbe')][_0x5972dd('0xcd')];this[_0x5972dd('0x55')]={0x0:_0xe8a9c7[_0x5972dd('0x8a')],0x1:_0xe8a9c7['MaxMP_Rate'],0x2:_0xe8a9c7[_0x5972dd('0x57')],0x3:_0xe8a9c7[_0x5972dd('0xd2')],0x4:_0xe8a9c7[_0x5972dd('0x47')],0x5:_0xe8a9c7['MDF_Rate'],0x6:_0xe8a9c7['AGI_Rate'],0x7:_0xe8a9c7[_0x5972dd('0x9')],'exp':_0xe8a9c7['EXP_Rate'],'gold':_0xe8a9c7[_0x5972dd('0x15')],'drop':_0xe8a9c7['Drop_Rate']},this[_0x5972dd('0x38')]={0x0:_0xe8a9c7[_0x5972dd('0x2d')],0x1:_0xe8a9c7[_0x5972dd('0x9b')],0x2:_0xe8a9c7[_0x5972dd('0x0')],0x3:_0xe8a9c7['DEF_Flat'],0x4:_0xe8a9c7[_0x5972dd('0x17')],0x5:_0xe8a9c7[_0x5972dd('0x29')],0x6:_0xe8a9c7[_0x5972dd('0x6f')],0x7:_0xe8a9c7['LUK_Flat'],'exp':_0xe8a9c7['EXP_Flat'],'gold':_0xe8a9c7['Gold_Flat'],'drop':_0xe8a9c7[_0x5972dd('0xa7')]};const _0x14f017=[_0x5972dd('0xd'),_0x5972dd('0x90'),_0x5972dd('0xb2'),_0x5972dd('0x36'),_0x5972dd('0x6c'),_0x5972dd('0x89'),_0x5972dd('0x97'),_0x5972dd('0xb9'),_0x5972dd('0x99'),_0x5972dd('0xbf'),_0x5972dd('0x94')],_0xea8a78=this[_0x5972dd('0x45')]()[_0x5972dd('0x74')];if(_0xea8a78[_0x5972dd('0x65')](/<GROWTH RATE PER LEVEL>\s*([\s\S]*)\s*<\/GROWTH RATE PER LEVEL>/i)){const _0x3893e6=String(RegExp['$1'])[_0x5972dd('0xb')](/[\r\n]+/);for(const _0x2aa17e of _0x3893e6){if(_0x2aa17e[_0x5972dd('0x65')](/(.*): (.*)/i)){const _0x305aa1=String(RegExp['$1'])[_0x5972dd('0x2')]()[_0x5972dd('0x2c')](),_0x435c23=Number(eval(RegExp['$2'])||0x0),_0x476fe3=_0x14f017[_0x5972dd('0x85')](_0x305aa1);if(_0x476fe3<0x8){if(_0x5972dd('0x28')===_0x5972dd('0x28'))this[_0x5972dd('0x55')][_0x476fe3]=_0x435c23;else{function _0x3fa21e(){const _0x286953=_0x5972dd;this[_0x286953('0xaf')](),this[_0x286953('0xb4')](),this['createLevelModifiers'](),this[_0x286953('0xc0')]();}}}else{if(_0x476fe3===0x8)this[_0x5972dd('0x55')][_0x5972dd('0x31')]=_0x435c23;else{if(_0x476fe3===0x9)this[_0x5972dd('0x55')]['gold']=_0x435c23;else{if(_0x476fe3===0xa){if(_0x5972dd('0x4')!==_0x5972dd('0x4')){function _0x2bc8d0(){const _0x38ff2d=_0x5972dd;_0x578237['EnemyLevel'][_0x38ff2d('0x2e')]['call'](this,_0x28805a),this[_0x38ff2d('0xa9')](),this[_0x38ff2d('0x95')](![]),this[_0x38ff2d('0xb0')](![]);}}else this[_0x5972dd('0x55')][_0x5972dd('0x34')]=_0x435c23;}else continue;}}}}}}if(_0xea8a78[_0x5972dd('0x65')](/<GROWTH FLAT PER LEVEL>\s*([\s\S]*)\s*<\/GROWTH FLAT PER LEVEL>/i)){const _0x27067d=String(RegExp['$1'])[_0x5972dd('0xb')](/[\r\n]+/);for(const _0x5e75f8 of _0x27067d){if(_0x5e75f8[_0x5972dd('0x65')](/(.*): (.*)/i)){const _0x1f65ff=String(RegExp['$1'])[_0x5972dd('0x2')]()[_0x5972dd('0x2c')](),_0x35ecc2=Number(eval(RegExp['$2'])||0x0),_0x2ea77b=_0x14f017[_0x5972dd('0x85')](_0x1f65ff);if(_0x2ea77b<0x8){if(_0x5972dd('0x46')===_0x5972dd('0x46'))this['_enemyLevel_GrowthFlat'][_0x2ea77b]=_0x35ecc2;else{function _0x3d1e58(){const _0x34d5b3=_0x5972dd;if(!_0x6ca5cf)return![];this[_0x34d5b3('0xb0')](!![]);const _0x57349c=_0x33b791[_0x34d5b3('0xaa')][_0x34d5b3('0x2')]()[_0x34d5b3('0x2c')]();if(this[_0x34d5b3('0x25')][_0x57349c])return this[_0x34d5b3('0xcb')]>=this[_0x34d5b3('0x25')][_0x57349c];const _0x464655=_0x21d492['id'];if(this['_enemyLevelRequired_SkillID'][_0x464655])return this[_0x34d5b3('0xcb')]>=this[_0x34d5b3('0xc3')][_0x464655];return!![];}}}else{if(_0x2ea77b===0x8){if(_0x5972dd('0x12')===_0x5972dd('0x12'))this['_enemyLevel_GrowthFlat']['exp']=_0x35ecc2;else{function _0x3d2ed3(){return!![];}}}else{if(_0x2ea77b===0x9)this[_0x5972dd('0x38')]['gold']=_0x35ecc2;else{if(_0x2ea77b===0xa)this[_0x5972dd('0x38')][_0x5972dd('0x34')]=_0x35ecc2;else{if(_0x5972dd('0xd5')!==_0x5972dd('0x43'))continue;else{function _0x47dd69(){const _0x4e00c2=_0x5972dd,_0x2a70fb=_0x1cf8a9(_0x1ca8cb['$1']),_0x3958e9=_0x3f4543(_0x49c151['$2']),_0x4f95cd=_0x597893['min'](_0x2a70fb,_0x3958e9),_0x47ebdd=_0x3680cb[_0x4e00c2('0x7')](_0x2a70fb,_0x3958e9);return _0x3c6ae4['floor'](_0x4f95cd+_0x5f2566[_0x4e00c2('0x52')](_0x47ebdd-_0x4f95cd+0x1));}}}}}}}}}},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x8')]=function(_0x4ee6d0,_0x327bef,_0x41377b){const _0x5029c3=_0x53c60a;if(this[_0x5029c3('0x80')]())return _0x41377b;this['createEnemyLevelParamGrowth'](!![]);const _0x389084=this;let _0x28fb2c=_0x41377b;const _0x1583d5=this[_0x5029c3('0x55')][_0x4ee6d0],_0x2cf43f=this[_0x5029c3('0x38')][_0x4ee6d0];return _0x28fb2c=_0x41377b+_0x327bef*_0x41377b*_0x1583d5+_0x327bef*_0x2cf43f,_0x28fb2c;},VisuMZ['EnemyLevel']['Game_Enemy_exp']=Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x31')],Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x31')]=function(){const _0x14db77=_0x53c60a,_0x5e4616=VisuMZ[_0x14db77('0xa1')][_0x14db77('0x62')][_0x14db77('0xb1')](this),_0x48f608=this[_0x14db77('0xcb')]-0x1;return this[_0x14db77('0xa4')](_0x5e4616,_0x48f608);},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xa4')]=function(_0x5329fd,_0x46c431){const _0x35faea=_0x53c60a;if(this[_0x35faea('0x80')]())return _0x5329fd;this[_0x35faea('0x95')](!![]);const _0x288171=this;let _0x20bd43=_0x5329fd;const _0x160149=this['_enemyLevel_GrowthRate'][_0x35faea('0x31')],_0x2bb3d1=this[_0x35faea('0x38')][_0x35faea('0x31')];return _0x20bd43=_0x5329fd+_0x46c431*_0x5329fd*_0x160149+_0x46c431*_0x2bb3d1,Math[_0x35faea('0x11')](_0x20bd43);},VisuMZ[_0x53c60a('0xa1')][_0x53c60a('0xda')]=Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xa0')],Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xa0')]=function(){const _0x4a7263=_0x53c60a,_0x175a44=VisuMZ['EnemyLevel']['Game_Enemy_gold'][_0x4a7263('0xb1')](this),_0x397eb1=this[_0x4a7263('0xcb')]-0x1;return this['goldApplyEnemyLevel'](_0x175a44,_0x397eb1);},Game_Enemy['prototype']['goldApplyEnemyLevel']=function(_0x4f945b,_0x39076e){const _0x1c13a9=_0x53c60a;if(this[_0x1c13a9('0x80')]())return _0x4f945b;this[_0x1c13a9('0x95')](!![]);const _0x5add74=this;let _0x4b5e8f=_0x4f945b;const _0x2280d0=this[_0x1c13a9('0x55')]['gold'],_0x574edf=this[_0x1c13a9('0x38')][_0x1c13a9('0xa0')];return _0x4b5e8f=_0x4f945b+_0x39076e*_0x4f945b*_0x2280d0+_0x39076e*_0x574edf,Math[_0x1c13a9('0x11')](_0x4b5e8f);},VisuMZ['EnemyLevel'][_0x53c60a('0x9e')]=Game_Enemy[_0x53c60a('0x3d')]['dropItemRate'],Game_Enemy[_0x53c60a('0x3d')]['dropItemRate']=function(){const _0x3306b4=_0x53c60a,_0x1f3cb0=VisuMZ[_0x3306b4('0xa1')]['Game_Enemy_dropItemRate'][_0x3306b4('0xb1')](this),_0x42e0ca=this[_0x3306b4('0xcb')]-0x1;return this[_0x3306b4('0xca')](_0x1f3cb0,_0x42e0ca);},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xca')]=function(_0x46b404,_0x322c3a){const _0xa94c85=_0x53c60a;if(this[_0xa94c85('0x80')]())return _0x46b404;this[_0xa94c85('0x95')](!![]);const _0x183a9a=this;let _0x5c61c2=_0x46b404;const _0x549851=this[_0xa94c85('0x55')][_0xa94c85('0x34')],_0x2a6ae7=this[_0xa94c85('0x38')][_0xa94c85('0x34')];return _0x5c61c2=_0x46b404+_0x322c3a*_0x46b404*_0x549851+_0x322c3a*_0x2a6ae7,_0x5c61c2;},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x72')]=function(_0x1d9e26){const _0x20366e=_0x53c60a;if(!_0x1d9e26)return![];this[_0x20366e('0xb0')](!![]);const _0x3dd3cc=_0x1d9e26[_0x20366e('0xaa')][_0x20366e('0x2')]()[_0x20366e('0x2c')]();if(this[_0x20366e('0x25')][_0x3dd3cc])return this['level']>=this[_0x20366e('0x25')][_0x3dd3cc];const _0x8d0942=_0x1d9e26['id'];if(this[_0x20366e('0xc3')][_0x8d0942])return this[_0x20366e('0xcb')]>=this[_0x20366e('0xc3')][_0x8d0942];return!![];},Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0xb0')]=function(_0x151ddc){const _0x598342=_0x53c60a;if(_0x151ddc&&this[_0x598342('0x25')]&&this[_0x598342('0xc3')])return;this[_0x598342('0x25')]={},this[_0x598342('0xc3')]={};const _0x4b511f=this[_0x598342('0x45')]()[_0x598342('0x74')][_0x598342('0x65')](/<ENEMY SKILL (.*) REQUIRE LEVEL: (\d+)>/gi);if(_0x4b511f)for(const _0x1e0837 of _0x4b511f){_0x1e0837['match'](/<ENEMY SKILL (.*) REQUIRE LEVEL: (\d+)>/i);const _0x4f726d=String(RegExp['$1'])['toUpperCase']()[_0x598342('0x2c')](),_0x1eb3b5=Number(RegExp['$2']);if(_0x4f726d[_0x598342('0x65')](/\b(\d+)\b/i))this[_0x598342('0xc3')][_0x4f726d]=_0x1eb3b5;else{if('hESDh'==='brJIy'){function _0x436faf(){const _0x4bce23=_0x598342;this[_0x4bce23('0x49')](this[_0x4bce23('0xab')]);}}else this[_0x598342('0x25')][_0x4f726d]=_0x1eb3b5;}}},VisuMZ[_0x53c60a('0xa1')]['Game_Enemy_transform']=Game_Enemy[_0x53c60a('0x3d')][_0x53c60a('0x5d')],Game_Enemy['prototype']['transform']=function(_0x8f1653){const _0x585d5d=_0x53c60a;VisuMZ[_0x585d5d('0xa1')][_0x585d5d('0x2e')]['call'](this,_0x8f1653),this['createLevelImages'](),this[_0x585d5d('0x95')](![]),this[_0x585d5d('0xb0')](![]);},Game_Party[_0x53c60a('0x3d')][_0x53c60a('0x79')]=function(_0x5922b1){const _0x5bf099=_0x53c60a,_0x7212ea=this['allMembers'](),_0x58c0b8=this['battleMembers']();switch(_0x5922b1[_0x5bf099('0x2')]()[_0x5bf099('0x2c')]()){case _0x5bf099('0x6'):return Math[_0x5bf099('0x7')](..._0x7212ea[_0x5bf099('0x9c')](_0x31366c=>_0x31366c[_0x5bf099('0xcb')]));break;case'HIGHEST\x20PARTY\x20LEVEL':return Math[_0x5bf099('0x7')](..._0x58c0b8[_0x5bf099('0x9c')](_0x3bd2cf=>_0x3bd2cf[_0x5bf099('0xcb')]));break;case'AVERAGE\x20ACTOR\x20LEVEL':return Math['round'](_0x7212ea[_0x5bf099('0xbd')]((_0x33bb36,_0x21a495)=>_0x33bb36+_0x21a495)/_0x7212ea[_0x5bf099('0x68')]);break;case _0x5bf099('0xb5'):return Math[_0x5bf099('0x11')](_0x58c0b8[_0x5bf099('0xbd')]((_0x8a4d7e,_0x257fda)=>_0x8a4d7e+_0x257fda)/_0x58c0b8[_0x5bf099('0x68')]);break;case'LOWEST\x20ACTOR\x20LEVEL':return Math[_0x5bf099('0xc6')](..._0x7212ea[_0x5bf099('0x9c')](_0x5c0a77=>_0x5c0a77['level']));break;case'LOWEST\x20PARTY\x20LEVEL':return Math[_0x5bf099('0xc6')](..._0x58c0b8[_0x5bf099('0x9c')](_0x381647=>_0x381647[_0x5bf099('0xcb')]));break;default:return 0x1;break;}},Game_Map[_0x53c60a('0x3d')][_0x53c60a('0x8e')]=function(){const _0x1c8fc1=_0x53c60a;if(!$dataMap)return![];return!!this[_0x1c8fc1('0x20')]();},Game_Map['prototype'][_0x53c60a('0x20')]=function(){const _0x51b80e=_0x53c60a;if(!$dataMap)return 0x0;const _0x322a3c=$dataMap[_0x51b80e('0x74')];if(_0x322a3c[_0x51b80e('0x65')](/<ENEMY LEVEL: (\d+)>/i))return Number(RegExp['$1'])||0x1;else{if(_0x322a3c[_0x51b80e('0x65')](/<ENEMY LEVEL: (\d+) TO (\d+)>/i)){const _0x369546=Number(RegExp['$1']),_0x20649e=Number(RegExp['$2']),_0x50fe4b=Math[_0x51b80e('0xc6')](_0x369546,_0x20649e),_0x49e68f=Math[_0x51b80e('0x7')](_0x369546,_0x20649e);return Math[_0x51b80e('0x92')](_0x50fe4b+Math[_0x51b80e('0x52')](_0x49e68f-_0x50fe4b+0x1));}else{if(_0x322a3c['match'](/<ENEMY LEVEL: (.*)>/i)){const _0x1d52a7=String(RegExp['$1'])[_0x51b80e('0x2')]()[_0x51b80e('0x2c')]();this[_0x51b80e('0x7e')]=$gameParty[_0x51b80e('0x79')](_0x1d52a7)||0x1;}else{if(_0x322a3c[_0x51b80e('0x65')](/<JS ENEMY LEVEL: (.*)>/i))try{if(_0x51b80e('0x53')==='nfYIL')return Math[_0x51b80e('0x92')](eval(RegExp['$1'])||0x0);else{function _0x1b0aeb(){this['_levelMax']=_0x2f38da(_0x190ca4['$1'])||0x1;}}}catch(_0x149986){if($gameTemp[_0x51b80e('0x5b')]())console[_0x51b80e('0xc5')](_0x149986);return 0x0;}else{if(_0x51b80e('0xd6')===_0x51b80e('0xd6'))return 0x0;else{function _0x5a686c(){const _0x5582f7=_0x51b80e;if(this[_0x5582f7('0x80')]())return _0x3eaeec;this['createEnemyLevelParamGrowth'](!![]);const _0x4b868d=this;let _0x2be8a0=_0xa99da4;const _0x49a7f4=this[_0x5582f7('0x55')][_0x5582f7('0x31')],_0x312be3=this[_0x5582f7('0x38')][_0x5582f7('0x31')];return _0x2be8a0=_0x37cbdb+_0x3056de*_0x574275*_0x49a7f4+_0x52f3f3*_0x312be3,_0x5dceec[_0x5582f7('0x11')](_0x2be8a0);}}}}}}};
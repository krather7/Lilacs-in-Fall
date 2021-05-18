//=============================================================================
// VisuStella MZ - Extra Enemy Drops
// VisuMZ_4_ExtraEnemyDrops.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ExtraEnemyDrops = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ExtraEnemyDrops = VisuMZ.ExtraEnemyDrops || {};
VisuMZ.ExtraEnemyDrops.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [ExtraEnemyDrops]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Extra_Enemy_Drops_VisuStella_MZ
 * @base VisuMZ_4_ExtraEnemyDrops
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ limits enemies to only drop up to 3 items max and
 * at very limited drop rates. This plugin allows you to add more than 3 items
 * at drop and at custom rates that aren't limited to a demoninator value.
 * 
 * This plugin also gives the functionality to force specific drops or give any
 * additional bonus drops to make some battles give different rewards despite
 * having the same types of enemies encountered before.
 * 
 * And if you have the VisuStella Battle Core, drops can be visible on the
 * battlefield and spring out of the enemies as they collapse!
 *
 * Features include all (but not limited to) the following:
 * 
 * * More than 3 drops per enemy can be given.
 * * Drop probability is a percentile value and not a demoniator setting.
 * * Make Conditional Drops that only appear depending on the events that took
 *   place during the battle.
 * * JavaScript notetags that let you make conditional drops based on code.
 * * New plugin commands to allow for forced drops and/or bonus drops.
 * * Forced drops will override any existing drops made from the enemy troop.
 * * Bonus drops will be additional drops in addition to those dropped from the
 *   enemy troop.
 * * If you have the Battle Core, drops become visible on the battlefield.
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
 * Forced Enemy Drops
 * 
 * - If forced enemy drops are used (through a Plugin Command), then all other
 * drop-related functions will be ignored in favor of the forced enemy drops.
 * This is because all forced drops are made to favor a specific set of drops
 * ordered by the game developer.
 * 
 * - This will prevent visual drops from appearing, too. Any visual drops that
 * have already been made present will also disappear.
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
 * Visual Drops (Battle Core)
 *
 * - Drops become visible on the battlefield. Once an enemy is defeated, visual
 * drops will appear out of their former position. These drops are shown as
 * icons, representing the EXP, Gold, and Drop Items an enemy will yield if the
 * battle is won.
 * 
 * - This feature can be disabled.
 * 
 * - If this feature is enabled, there is a slight change to the drop system.
 * Previously, drops are determined at the end of battle. Now, to visibly
 * appear upon the defeat of an enemy, they are then determined at the moment
 * of their death.
 * 
 * - What this means is, if an EXP or Gold boost is applied after they've been
 * defeated, it will not be retroactive and apply to the drops that become
 * visible on the battlefield. As a result, the player has to be tactical in
 * when they defeat the enemies after applying the EXP and Gold buffs.
 * 
 * - Depending on the Plugin Parameter settings, if an enemy revives, their
 * drops can be reset. If the reset is allowed, the player can acquire a whole
 * different set of drops upon the enemy's subsequent defeats. This feature can
 * be turned off.
 * 
 * - A reviving enemy will cause its visual drops to disappear.
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
 * === General Drop-Related Notetags ===
 * 
 * The following notetags are related to giving enemies additional drops with
 * more control over probability rates.
 * 
 * ---
 *
 * <Item Drop id: x%>
 * <Item Drop name: x%>
 * 
 * <Weapon Drop id: x%>
 * <Weapon Drop name: x%>
 * 
 * <Armor Drop id: x%>
 * <Armor Drop name: x%>
 *
 * - Used for: Enemy Notetags
 * - Gives the enemy 'x' percent chance to drop the designated item, weapon,
 *   or armor.
 * - Replace 'id' with the ID of the item, weapon, or armor you wish to assign
 *   to the enemy as a potential drop.
 * - With the 'name' notetag variant, replace 'name' with the name of the item,
 *   weapon, or armor you wish to assign to the enemy as a potential drop.
 * - Replace 'x' with a number representing the percentile probability chance
 *   of successfully acquiring that item as a drop.
 * - Insert multiple copies of these notetags if you wish to include more drops
 *   for the enemies.
 * 
 * Examples:
 * 
 * <Item Drop 5: 20%>
 * <Item Drop Potion: 30%>
 * 
 * <Weapon Drop 27: 45%>
 * <Weapon Drop Blade of Reckoning: 55%>
 * 
 * <Armor Drop 19: 72%>
 * <Armor Drop Flame Shield: 90%>
 *
 * ---
 *
 * <Drops>
 *  Item id: x%
 *  Item name: x%
 *  Weapon id: x%
 *  Weapon name: x%
 *  Armor id: x%
 *  Armor name: x%
 * </Drops>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Creates a batch list of item, weapon, armor drops.
 * - This isn't any different than creating individual copies of the above
 *   notetags as far as results go, but some may prefer this approach to make
 *   the drop table look "cleaner".
 * - Replace 'id' with the ID of the item, weapon, or armor you wish to assign
 *   to the enemy as a potential drop.
 * - With the 'name' notetag variant, replace 'name' with the name of the item,
 *   weapon, or armor you wish to assign to the enemy as a potential drop.
 * - Replace 'x' with a number representing the percentile probability chance
 *   of successfully acquiring that item as a drop.
 * 
 * Example:
 *
 * <Drops>
 *  Item 5: 20%
 *  Item Potion: 30%
 *  Weapon 27: 45%
 *  Weapon Blade of Reckoning: 55%
 *  Armor 72: 72%
 *  Armor Flame Shield: 90%
 * </Drops>
 *
 * ---
 * 
 * === Conditional Drop-Related Notetags ===
 * 
 * Conditional drops are drops that only appear once specific conditions have
 * been met. For each condition met, their chances of dropping can be raised
 * higher or lower.
 * 
 * ---
 * 
 * <Conditional Item id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item id Drop>
 * 
 * <Conditional Item name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item name Drop>
 * 
 * <Conditional Weapon id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon id Drop>
 * 
 * <Conditional Weapon name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon name Drop>
 * 
 * <Conditional Armor id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor id Drop>
 * 
 * <Conditional Armor name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor name Drop>
 *
 * - Used for: Enemy Notetags
 * - Create conditional item, weapon, and/or armor drops for this enemy.
 * - Insert multiples of these notetags if you want more than one conditional
 *   drop for this enemy.
 * - Use the associated item, weapon, or armor type notetag for the type of
 *   conditional drop you want for the enemy.
 * - Replace 'id' with the ID number of the item, weapon, or armor to drop.
 * - Replace 'name' with the name of the item, weapon, or armor to drop.
 * - Replace 'condition' with any of the conditions listed in below section.
 * - Replace 'x' with the increase or decrease in percentage drop chance.
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
 * - 'Switch x' (replace 'x' with a number) for switch x's current state.
 * - 'TRUE', 'FALSE', 'ON', 'OFF' for the opposite x/y value.
 * - Using any of these boolean modifiers must be paired with '===' or '!=='
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 * 
 * - 'Item id Count' for the number of specific items the party owns.
 *   - Replace 'id' with the ID of the item.
 * - 'Item name Count' for the number of specific items the party owns.
 *   - Replace 'name' with the ID of the item.
 * 
 * - 'Weapon id Count' for the number of specific weapons the party owns.
 *   - Replace 'id' with the ID of the weapon.
 * - 'Weapon name Count' for the number of specific weapons the party owns.
 *   - Replace 'name' with the ID of the weapon.
 * 
 * - 'Armor id Count' for the number of specific armors the party owns.
 *   - Replace 'id' with the ID of the armor.
 * - 'Armor name Count' for the number of specific armors the party owns.
 *   - Replace 'name' with the ID of the armor.
 * 
 * - 'Alive Members' for the number of alive party members when drops are
 *   being determined.
 * 
 * - 'Battle Members' for the number of participating party members in battle.
 * 
 * - 'Battle Turns' for the number of turns passed in battle when drops are
 *   being determined.
 * 
 * - 'Dead Members' for the number of dead party members when drops are
 *   being determined.
 * 
 * - 'Death Turn' for the turn the enemy died. If an enemy was revived during
 *   battle, then take the most recent turn the enemy has died.
 * 
 * - 'Enemy Level' for the current level of the enemy if using the 'level'
 *   property for the Game_Enemy object.
 * 
 * - 'Party Gold' for the party's current gold value when drops are
 *   being determined.
 * 
 * - 'Party Members' for the number of total party members in battle.
 * 
 * - 'Times type id Struck' for the number of times the enemy was struck
 *   with 'type' 'id' during battle.
 * - Replace 'type' with 'Element' for the number of times the enemy was struck
 *   with specific elemental damage.
 * - Replace 'type' with 'Item' for the number of times the enemy was struck
 *   with a specific item.
 * - Replace 'type' with 'Skill' for the number of times the enemy was struck
 *   with a specific skill.
 * - Replace 'type' with 'SType' for the number of times the enemy was struck
 *   by any skill of a specifici skill type.
 * - Replace 'type' with 'State' for the number of times the enemy was struck
 *   with a specific state.
 * - Replace 'id' with the type's ID.
 * 
 * - 'Times type name Struck' for the number of times the enemy was struck
 *   with 'type' 'name' during battle.
 * - Replace 'type' with 'Element' for the number of times the enemy was struck
 *   with specific elemental damage.
 * - Replace 'type' with 'Item' for the number of times the enemy was struck
 *   with a specific item.
 * - Replace 'type' with 'Skill' for the number of times the enemy was struck
 *   with a specific skill.
 * - Replace 'type' with 'SType' for the number of times the enemy was struck
 *   by any skill of a specifici skill type.
 * - Replace 'type' with 'State' for the number of times the enemy was struck
 *   with a specific state.
 * - Replace 'name' with the type's name in the database.
 * 
 * ---
 * 
 * Always
 * 
 * - This condition is always met. Use this to set a base drop chance.
 * 
 * ---
 * 
 * Random x%
 * 
 * - Offers a random 'x' chance to increase/decrease drop chance.
 * 
 * ---
 * 
 * Last Strike type id
 * Last Strike type name
 * 
 * - Checks the condition to see if the last struck action against the enemy
 *   was done by a specific action.
 * - Replace 'type' with 'Element' for the last struck element.
 * - Replace 'type' with 'Item' for the last struck item if it was an item.
 *   This will override the 'Skill' and 'SType' types.
 * - Replace 'type' with 'Skill' for the last struck skill if it was a skill.
 *   This will override the 'Item' type.
 * - Replace 'type' with 'SType' for the last struck skill type if it was
 *   a skill. This will override the 'Item' type.
 * - Replace 'type' with 'State' for the last struck state.
 * 
 * ---
 * 
 * Examples:
 * 
 * The following are some examples on how these conditional drops are used:
 * 
 * ---
 * 
 * <Conditional Item Potion Drop>
 *  Always: +20%
 *  Death Turn <= 3: +50%
 * </Conditional Item Potion Drop>
 * 
 * - Conditional drop is the Potion item.
 * - It has a base chance of 20%.
 * - If the enemy was defeated during or before turn 3, increase the drop
 *   chance by another 50%.
 * 
 * ---
 * 
 * <Conditional Weapon Mithril Sword Drop>
 *  Always: +100%
 *  Times SType Magic Struck: -10%
 *  Times SType Spell Struck: -10%
 * </Conditional Weapon Mithril Sword Drop>
 * 
 * - Conditional drop is the Mithril Sword weapon.
 * - It starts off with a 100% chance of a drop.
 * - Each time the enemy is struck with 'Magic' or 'Spell' type attacks,
 *   the drop chance decreases by 10%.
 * 
 * ---
 * 
 * <Conditional Armor Elemental Cloak Drop>
 *  Times Element Fire Struck: +10%
 *  Times Element Ice Struck: +10%
 *  Times Element Thunder Struck: +10%
 *  Times Element Physical Struck: -20%
 *  Times Skill Element Force Struck: +50%
 * </Conditional Armor Elemental Cloak Drop>
 * 
 * - Conditional drop is the Elemental Cloak armor.
 * - Each time the enemy is struck by 'Fire', 'Ice', or 'Thunder' damage,
 *   increase the drop chance by 10%.
 * - Each time the enemy is struck by 'Physical' damage, decrease the drop
 *   chance by 10%.
 * - Each time the enemy is struck by the specific skill 'Element Force',
 *   increase the drop chance by +50%.
 * 
 * ---
 *
 * === JavaScript Notetags: Drops ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional enemy drop manipulation.
 *
 * ---
 *
 * <JS Drops>
 *  code
 *  code
 *  drops.push($dataItems[1]);
 *  drops.push($dataWeapons[2]);
 *  drops.push($dataArmors[3]);
 * </JS Drops>
 *
 * - Used for: Enemy Notetags
 * - Replace 'code' with JavaScript code to make conditional checks in order
 *   to determine which items, weapons, and/or armors would be added to the
 *   drop pool.
 * - The 'drops' variable is an array which contains all of the currently
 *   existing drops from the enemy this notetag is on. It will be returned as
 *   an array upon running the notetag's JavaScript code.
 * - Add to or remove from the 'drops' variable to change up its contents.
 *
 * ---
 * 
 * === Visual Drop-Related Notetags ===
 * 
 * For those who want to customize how some items, weapons, or armors appear as
 * visual drops, use the following notetags.
 * 
 * ---
 *
 * <Visual Drop Icon: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Forces the drop item, weapon, or armor to appear as a different icon.
 * - Replace 'x' with the ID of the icon you wish to show.
 *
 * ---
 *
 * <Visual Drop Rarity: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the item, weapon, or armor drop to be a specific rarity.
 * - Replace 'x' with a rarity value between 0 and 10. The settings applied to
 *   the visual drop will be based on their Plugin Parameter settings.
 * - This is mutually exclusive from the <Visual Drop Tint Color: r, g, b, k>
 *   and <Visual Drop Tint Duration: x> notetags.
 *
 * ---
 *
 * <Visual Drop Tint Color: r, g, b, k>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the tint of visual drop item when it's visible on the battlefield.
 * - Replace 'r' with a red value between -255 and 255.
 * - Replace 'g' with a green value between -255 and 255.
 * - Replace 'b' with a blue value between -255 and 255.
 * - Replace 'k' with a gray value between 0 and 255.
 * - This does not work with the <Visual Drop Rarity: x> notetag.
 *
 * ---
 *
 * <Visual Drop Tint Duration: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the duration of the tint effect.
 * - Replace 'x' with the number of frames to tint the visual drop. The lower
 *   the number, the faster the tint pulses. The higher the number, the slower
 *   the tint pulses.
 *
 * ---
 *
 * <Visual Drop Spawn SFX: filename>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When the item, weapon, or armor's visual drop spawns on the battlefield,
 *   play a sound effect.
 * - Replace 'filename' with the name of a sound effect from the game project's
 *   /audio/se/ folder. Do not include the file extension.
 * - Example: <Visual Drop Spawn SFX: Float1>
 *
 * ---
 *
 * <Visual Drop Bounce Height: x%>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Alters how bouncy this visual drop is as it spawns on the battlefield.
 * - Replace 'x' with a percentage value on how much higher the visual drop
 *   should bounce than normal (whatever is set in the Plugin Parameters).
 *
 * ---
 *
 * <Visual Drop Bounce SFX: filename>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When the item, weapon, or armor's visual drop bounces on the battlefield,
 *   play a sound effect.
 * - Replace 'filename' with the name of a sound effect from the game project's
 *   /audio/se/ folder. Do not include the file extension.
 * - Example: <Visual Drop Bounce SFX: Float1>
 *
 * ---
 *
 * <Visual Drop Flag: Rainbow>
 * <Visual Drop Flag: Additive>
 * <Visual Drop Flag: Multiply>
 * <Visual Drop Flag: Screen>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adds visual effects to visual drop when it's on the battlefield.
 * - The 'Rainbow' effect causes the icon's hue to constantly change.
 * - The 'Additive', 'Multiply', and 'Screen', effects are blend modes.
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
 * === Bonus Reward Plugin Commands ===
 * 
 * ---
 *
 * Bonus Rewards: Clear
 * - Clears all bonus drops.
 *
 * ---
 *
 * Bonus Rewards: Set EXP
 * - Determines additional EXP the player will get in battle by this value.
 *
 *   EXP:
 *   - Determines additional EXP the player will get in battle by this value.
 *
 * ---
 *
 * Bonus Rewards: Set Gold
 * - Determines additional Gold the player will get in battle by this value.
 *
 *   Gold:
 *   - Determines additional Gold the player will get in battle by this value.
 *
 * ---
 *
 * Bonus Rewards: Add Item
 * - Adds the bonus drop the player earns from this battle to have the
 *   following item given at a specific quantity.
 *
 *   Item ID:
 *   - Which item do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 *
 * Bonus Rewards: Add Weapon
 * - Adds the bonus drop the player earns from this battle to have the
 *   following weapon given at a specific quantity.
 *
 *   Weapon ID:
 *   - Which weapon do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 *
 * Bonus Rewards: Add Armor
 * - Adds the bonus drop the player earns from this battle to have the
 *   following armor given at a specific quantity.
 *
 *   Armor ID:
 *   - Which armor do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 * 
 * === Forced Reward Plugin Commands ===
 * 
 * ---
 *
 * Forced Rewards: Clear
 * - Clears all forced drops.
 *
 * ---
 *
 * Forced Rewards: Set EXP
 * - Change the amount of EXP the player will get in battle to this value.
 *
 *   EXP:
 *   - Change the amount of EXP the player will get in battle to this value.
 *
 * ---
 *
 * Forced Rewards: Set Gold
 * - Change the amount of Gold the player will get in battle to this value.
 *
 *   Gold:
 *   - Change the amount of Gold the player will get in battle to this value.
 *
 * ---
 *
 * Forced Rewards: Add Item
 * - Adds the forced drop the player earns from this battle to have the
 *   following item given at a specific quantity.
 *
 *   Item ID:
 *   - Which item do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 *
 * Forced Rewards: Add Weapon
 * - Adds the forced drop the player earns from this battle to have the
 *   following weapon given at a specific quantity.
 *
 *   Weapon ID:
 *   - Which weapon do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 *
 * Forced Rewards: Add Armor
 * - Adds the forced drop the player earns from this battle to have the
 *   following armor given at a specific quantity.
 *
 *   Armor ID:
 *   - Which armor do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 * 
 * === Visual Drop Plugin Commands ===
 * 
 * ---
 *
 * Visual Drops: Visibility
 * - Sets the visibility of visual drops during battle.
 *
 *   Visible:
 *   - Show visual drops during battle?
 *   - This will be reset at the start of next battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These settings govern the way Visual Drops are handled. These are global
 * rules that apply to all Visual Drops made through this plugin, from the
 * calculations made to determine their radius distance to the number of
 * bounces the drops make to whether or not the drops have shadows.
 *
 * ---
 *
 * General
 * 
 *   Enable?
 *   - Enable Visual Drops?
 *   - You know you want to.
 * 
 *   Reviving Resets Drops:
 *   - Do reviving enemies reset drops?
 *   - For more information, read the Extra Features section.
 *
 * ---
 *
 * Position
 * 
 *   Base Radius:
 *   - Base radius amount for drops.
 * 
 *   +Radius Per Drop:
 *   - Increase radius by this much per extra drop.
 * 
 *   Spin Degrees:
 *   - How many degrees do you want the icon to spin in its largest bounce?
 *   - Use 0 for no spin.
 * 
 *   Delay Between Drops:
 *   - How many milliseconds to delay the appearance of each visual drop?
 *   - Use 0 for no delay.
 * 
 *   Field of View Y:
 *   - What's the distortion rate for the field of view for the item
 *     positioning distribution.
 *
 * ---
 *
 * Bounce
 * 
 *   Bounce Duration:
 *   - Duration of the highest bounce.
 * 
 *   Bounce Total:
 *   - How many times do you want visual drops to bounce?
 *   - Use 0 for no bounces.
 * 
 *   Bounce Height:
 *   - The maximum height for the visual drops to fly out at.
 *   - This will decrease with each bounce.
 * 
 *   Bounce Reduction:
 *   - The rate at which each bounce reduces the duration and height by.
 *
 * ---
 *
 * Bounce SFX
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * Icons
 * 
 *   Offset Y Rate:
 *   - At which rate do you want to offset the visual drop icons off the
 *     ground by?
 * 
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Shadow
 * 
 *   Show Shadow:
 *   - Show the shadow sprite?
 * 
 *   Shadow Filename:
 *   - Filename used for the visual drop shadow.
 * 
 *   Shadow Offset X:
 *   - Offset the shadow sprite X by this amount.
 *   - Negative numbers go left. Positive numbers go right.
 * 
 *   Shadow Offset Y:
 *   - Offset the shadow sprite Y by this amount.
 *   - Negative numbers go up. Positive numbers go down.
 * 
 *   Shadow Opacity:
 *   - Opacity level of the shadow.
 *   - 0 for transparent. 255 for opaque.
 *
 * ---
 *
 * Opacity
 * 
 *   Fade After Bounce:
 *   - Fade out the visual drops after they finish bouncing?
 * 
 *   Fade After Delay:
 *   - How many milliseconds to delay the fading by if the above option is
 *     selected?
 * 
 *   Opacity Fade Speed:
 *   - What speed should the opacity level fade out by?
 *   - Higher numbers are faster.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: EXP Settings
 * ============================================================================
 *
 * EXP can be depicted as a visual drop from the enemy. Depending on how much
 * EXP the enemy would give, a different setting can be used, determining the
 * icon used and which rarity effect to apply.
 *
 * ---
 *
 * General
 * 
 *   Show EXP Drop:
 *   - Show visual drops for EXP?
 *
 * ---
 *
 * Settings 1 through 10
 * 
 *   EXP Value:
 *   - How much EXP minimum to use this setting?
 * 
 *   Icon:
 *   - Which icon to use for this setting?
 * 
 *   Rarity:
 *   - Which rarity to use for this setting?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold can be depicted as a visual drop from the enemy. Depending on how much
 * Gold the enemy would give, a different setting can be used, determining the
 * icon used and which rarity effect to apply.
 *
 * ---
 *
 * General
 * 
 *   Show Gold Drop:
 *   - Show visual drops for Gold?
 *
 * ---
 *
 * Settings 1 through 10
 * 
 *   Gold Value:
 *   - How much Gold minimum to use this setting?
 * 
 *   Icon:
 *   - Which icon to use for this setting?
 * 
 *   Rarity:
 *   - Which rarity to use for this setting?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Drops Settings
 * ============================================================================
 *
 * These are the usual enemy drops that you're used to. These will factor in
 * extra drops, conditional drops, and drops added through JavaScript as well.
 * You can choose to have the enemy drops reveal their real icons or keep it
 * a surprise for when the player finally access the Victory Aftermath screen.
 *
 * ---
 *
 * General
 * 
 *   Show Enemy Drops:
 *   - Show visual drops for enemy drops?
 * 
 *   Use Unique Icons:
 *   - Show the icons of the drops?
 *   - If not, use the ones below.
 *
 * ---
 *
 * Common Icons
 * 
 *   Common Item Icon:
 *   Common Weapon Icon:
 *   Common Armor Icon:
 *   - What icon do you want to use for common items, weapons, and armors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Rarity Settings
 * ============================================================================
 *
 * Visual Drop rarities are found in 11 tiers, No Rarity and Rarities 1 through
 * 10. How you use these rarities is up to you, the game dev. However, items of
 * a matching rarity level will display the same tints, durations, and flags.
 * Although more flags can be added later through notetags, matching rarities
 * will exhibit a common ground of flags.
 *
 * ---
 *
 * General
 * 
 *   Show Rarities:
 *   - Show visual effects for different rarities?
 *
 * ---
 *
 * No Rarity and Rarities 1 through 10
 * 
 *   Tint:
 *   - Tone settings for this rarity.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Duration:
 *   - What duration do you want for this rarity?
 * 
 *   Flags:
 *   - What flags do you want to apply to this rarity?
 *   - Flags:
 *     - Rainbow
 *     - Additive
 *     - Multiply
 *     - Screen
 *     - Bounce Height x%
 *     - Bounce SFX: filename 
 *     - Spawn SFX: filename
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
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 *
 * Version 1.00: October 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusRewardsClear
 * @text Bonus Rewards: Clear
 * @desc Clears all bonus drops.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusExpSet
 * @text Bonus Rewards: Set EXP
 * @desc Determines additional EXP the player will get in battle by this value.
 *
 * @arg value:eval
 * @text EXP
 * @desc Determines additional EXP the player will get in battle by this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusGoldSet
 * @text Bonus Rewards: Set Gold
 * @desc Determines additional Gold the player will get in battle by this value.
 *
 * @arg value:eval
 * @text Gold
 * @desc Determines additional Gold the player will get in battle by this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddItem
 * @text Bonus Rewards: Add Item
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following item given at a specific quantity.
 *
 * @arg id:num
 * @text Item ID
 * @type item
 * @desc Which item do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddWeapon
 * @text Bonus Rewards: Add Weapon
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following weapon given at a specific quantity.
 *
 * @arg id:num
 * @text Weapon ID
 * @type weapon
 * @desc Which weapon do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddArmor
 * @text Bonus Rewards: Add Armor
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following armor given at a specific quantity.
 *
 * @arg id:num
 * @text Armor ID
 * @type armor
 * @desc Which armor do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedRewardsClear
 * @text Forced Rewards: Clear
 * @desc Clears all forced drops.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedExpSet
 * @text Forced Rewards: Set EXP
 * @desc Change the amount of EXP the player will get in battle to this value.
 *
 * @arg value:eval
 * @text EXP
 * @desc Change the amount of EXP the player will get in battle to this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedGoldSet
 * @text Forced Rewards: Set Gold
 * @desc Change the amount of Gold the player will get in battle to this value.
 *
 * @arg value:eval
 * @text Gold
 * @desc Change the amount of Gold the player will get in battle to this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddItem
 * @text Forced Rewards: Add Item
 * @desc Adds the forced drop the player earns from this battle to have
 * the following item given at a specific quantity.
 *
 * @arg id:num
 * @text Item ID
 * @type item
 * @desc Which item do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddWeapon
 * @text Forced Rewards: Add Weapon
 * @desc Adds the forced drop the player earns from this battle to have
 * the following weapon given at a specific quantity.
 *
 * @arg id:num
 * @text Weapon ID
 * @type weapon
 * @desc Which weapon do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddArmor
 * @text Forced Rewards: Add Armor
 * @desc Adds the forced drop the player earns from this battle to have
 * the following armor given at a specific quantity.
 *
 * @arg id:num
 * @text Armor ID
 * @type armor
 * @desc Which armor do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VisualDropVisible
 * @text Visual Drops: Visibility
 * @desc Sets the visibility of visual drops during battle.
 *
 * @arg Visible:eval
 * @text Visible
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops during battle?
 * This will be reset at the start of next battle.
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
 * @param Template
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param VisualDrops
 * @text Visual Drops
 *
 * @param General:struct
 * @text General Settings
 * @parent VisualDrops
 * @type struct<General>
 * @desc General settings regarding Visual Drops.
 * @default {"General":"","Enable:eval":"true","resetOnRevive:eval":"true","Position":"","radius:num":"20","radiusPerIcon:num":"5","angle:num":"1800","msDelay:num":"250","yRateFoV:num":"0.44","Bounce":"","duration:num":"60","bounces:num":"10","height:num":"100","bounceReduction:num":"0.75","SFX":"","sfxFilename:str":"Coin","sfxVolume:num":"90","sfxPitch:num":"100","sfxPan:num":"0","Icons":"","iconOffsetRate:num":"-1.75","iconJumpEasing:str":"Linear","Shadow":"","showShadow:eval":"true","shadowFilename:str":"Shadow1","shadowOffsetX:num":"0","shadowOffsetY:num":"8","shadowOpacity:num":"255","Opacity":"","fadeAfterBounce:eval":"false","fadeAfterDelay:num":"2000","opacityFadeOut:num":"8"}
 *
 * @param Exp:struct
 * @text EXP Settings
 * @parent VisualDrops
 * @type struct<Exp>
 * @desc Settings regarding EXP for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting1":"","Value1:num":"1","Icon1:num":"73","Rarity1:num":"0","Setting2":"","Value2:num":"50","Icon2:num":"73","Rarity2:num":"1","Setting3":"","Value3:num":"100","Icon3:num":"89","Rarity3:num":"2","Setting4":"","Value4:num":"500","Icon4:num":"89","Rarity4:num":"3","Setting5":"","Value5:num":"1000","Icon5:num":"88","Rarity5:num":"4","Setting6":"","Value6:num":"2500","Icon6:num":"88","Rarity6:num":"5","Setting7":"","Value7:num":"5000","Icon7:num":"87","Rarity7:num":"6","Setting8":"","Value8:num":"10000","Icon8:num":"87","Rarity8:num":"7","Setting9":"","Value9:num":"25000","Icon9:num":"84","Rarity9:num":"8","Setting10":"","Value10:num":"50000","Icon10:num":"84","Rarity10:num":"9"}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @parent VisualDrops
 * @type struct<Gold>
 * @desc Settings regarding Gold for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting1":"","Value1:num":"1","Icon1:num":"314","Rarity1:num":"0","Setting2":"","Value2:num":"50","Icon2:num":"314","Rarity2:num":"1","Setting3":"","Value3:num":"100","Icon3:num":"196","Rarity3:num":"2","Setting4":"","Value4:num":"500","Icon4:num":"196","Rarity4:num":"3","Setting5":"","Value5:num":"1000","Icon5:num":"313","Rarity5:num":"4","Setting6":"","Value6:num":"5000","Icon6:num":"313","Rarity6:num":"5","Setting7":"","Value7:num":"10000","Icon7:num":"303","Rarity7:num":"6","Setting8":"","Value8:num":"50000","Icon8:num":"303","Rarity8:num":"7","Setting9":"","Value9:num":"100000","Icon9:num":"300","Rarity9:num":"8","Setting10":"","Value10:num":"500000","Icon10:num":"300","Rarity10:num":"9"}
 *
 * @param Drop:struct
 * @text Enemy Drops Settings
 * @parent VisualDrops
 * @type struct<Drop>
 * @desc Settings regarding enemy drops for Visual Drops.
 * @default {"General":"","show:eval":"true","uniqueIcons:eval":"true","CommonIcons":"","commonItemIcon:num":"208","commonWeaponIcon:num":"210","commonArmorsIcon:num":"210"}
 *
 * @param Rarity:struct
 * @text Rarity Settings
 * @parent VisualDrops
 * @type struct<Rarity>
 * @desc Settings regarding enemy drops for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting0":"","Tint0:eval":"[0, 0, 0, 0]","Duration0:num":"180","Flags0:arraystr":"[]","Setting1":"","Tint1:eval":"[0, 30, 60, 20]","Duration1:num":"180","Flags1:arraystr":"[]","Setting2":"","Tint2:eval":"[30, 60, 0, 40]","Duration2:num":"160","Flags2:arraystr":"[]","Setting3":"","Tint3:eval":"[60, 0, 30, 60]","Duration3:num":"140","Flags3:arraystr":"[]","Setting4":"","Tint4:eval":"[0, 60, 60, 80]","Duration4:num":"120","Flags4:arraystr":"[]","Setting5":"","Tint5:eval":"[60, 60, 0, 100]","Duration5:num":"100","Flags5:arraystr":"[]","Setting6":"","Tint6:eval":"[60, 0, 60, 120]","Duration6:num":"80","Flags6:arraystr":"[]","Setting7":"","Tint7:eval":"[0, 0, 60, 140]","Duration7:num":"70","Flags7:arraystr":"[]","Setting8":"","Tint8:eval":"[0, 60, 0, 160]","Duration8:num":"60","Flags8:arraystr":"[]","Setting9":"","Tint9:eval":"[60, 0, 0, 180]","Duration9:num":"50","Flags9:arraystr":"[]","Setting10":"","Tint10:eval":"[0, 0, 0, 0]","Duration10:num":"40","Flags10:arraystr":"[\"Rainbow\"]","SpecialEffects":"","RainbowHueSpeed:num":"4"}
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
 * @param General
 *
 * @param Enable:eval
 * @text Enable Visual Drops?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Visual Drops?
 * You know you want to.
 * @default true
 *
 * @param resetOnRevive:eval
 * @text Reviving Resets Drops 
 * @parent General
 * @type boolean
 * @on Resets
 * @off Already Set
 * @desc Do reviving enemies reset drops?
 * @default true
 * 
 * @param Position
 *
 * @param radius:num
 * @text Base Radius
 * @parent Position
 * @type number
 * @min 1
 * @desc Base radius amount for drops.
 * @default 20
 *
 * @param radiusPerIcon:num
 * @text +Radius Per Drop
 * @parent Position
 * @type number
 * @min 0
 * @desc Increase radius by this much per extra drop.
 * @default 5
 *
 * @param angle:num
 * @text Spin Degrees
 * @parent Position
 * @type number
 * @min 0
 * @desc How many degrees do you want the icon to spin in its
 * largest bounce? Use 0 for no spin.
 * @default 1800
 *
 * @param msDelay:num
 * @text Delay Between Drops
 * @parent Position
 * @type number
 * @min 0
 * @desc How many milliseconds to delay the appearance of each
 * visual drop? Use 0 for no delay.
 * @default 250
 *
 * @param yRateFoV:num
 * @text Field of View Y
 * @parent Position
 * @desc What's the distortion rate for the field of view
 * for the item positioning distribution.
 * @default 0.44
 * 
 * @param Bounce
 *
 * @param duration:num
 * @text Bounce Duration
 * @parent Bounce
 * @type number
 * @min 1
 * @desc Duration of the highest bounce.
 * @default 60
 *
 * @param bounces:num
 * @text Bounce Total
 * @parent Bounce
 * @type number
 * @min 0
 * @desc How many times do you want visual drops to bounce?
 * Use 0 for no bounces.
 * @default 10
 *
 * @param height:num
 * @text Bounce Height
 * @parent Bounce
 * @type number
 * @min 0
 * @desc The maximum height for the visual drops to fly out at.
 * This will decrease with each bounce.
 * @default 100
 *
 * @param bounceReduction:num
 * @text Bounce Reduction
 * @parent Bounce
 * @desc The rate at which each bounce reduces the duration
 * and height by.
 * @default 0.75
 * 
 * @param SFX
 * @text Bounce SFX
 *
 * @param sfxFilename:str
 * @text Filename
 * @parent SFX
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Coin
 *
 * @param sfxVolume:num
 * @text Volume
 * @parent SFX
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param sfxPitch:num
 * @text Pitch
 * @parent SFX
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param sfxPan:num
 * @text Pan
 * @parent SFX
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Icons
 *
 * @param iconOffsetRate:num
 * @text Offset Y Rate
 * @parent Icons
 * @desc At which rate do you want to offset the visual drop
 * icons off the ground by?
 * @default -1.75
 *
 * @param iconJumpEasing:str
 * @text Movement Easing
 * @parent Icons
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @param Shadow
 *
 * @param showShadow:eval
 * @text Show Shadow
 * @parent Shadow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the shadow sprite?
 * @default true
 *
 * @param shadowFilename:str
 * @text Shadow Filename
 * @parent Shadow
 * @type file
 * @dir img/system/
 * @desc Filename used for the visual drop shadow.
 * @default Shadow1
 *
 * @param shadowOffsetX:num
 * @text Shadow Offset X
 * @parent Shadow
 * @desc Offset the shadow sprite X by this amount.
 * Negative numbers go left. Positive numbers go right.
 * @default 0
 *
 * @param shadowOffsetY:num
 * @text Shadow Offset Y
 * @parent Shadow
 * @desc Offset the shadow sprite Y by this amount.
 * Negative numbers go up. Positive numbers go down.
 * @default 8
 *
 * @param shadowOpacity:num
 * @text Shadow Opacity
 * @parent Shadow
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity level of the shadow.
 * 0 for transparent. 255 for opaque.
 * @default 255
 * 
 * @param Opacity
 *
 * @param fadeAfterBounce:eval
 * @text Fade After Bounce
 * @parent Opacity
 * @type boolean
 * @on Fade
 * @off Keep
 * @desc Fade out the visual drops after they finish bouncing?
 * @default false
 *
 * @param fadeAfterDelay:num
 * @text Fade After Delay
 * @parent Opacity
 * @type number
 * @min 0
 * @desc How many milliseconds to delay the fading by if the
 * above option is selected?
 * @default 2000
 *
 * @param opacityFadeOut:num
 * @text Opacity Fade Speed
 * @parent Opacity
 * @type number
 * @max 1
 * @desc What speed should the opacity level fade out by?
 * Higher numbers are faster.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * EXP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exp:
 * 
 * @param General
 *
 * @param show:eval
 * @text Show EXP Drop
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for EXP?
 * @default true
 * 
 * @param Setting1
 * @text Setting 1
 *
 * @param Value1:num
 * @text EXP Value
 * @parent Setting1
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 1
 *
 * @param Icon1:num
 * @text Icon
 * @parent Setting1
 * @desc Which icon to use for this setting?
 * @default 73
 *
 * @param Rarity1:num
 * @text Rarity
 * @parent Setting1
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 0
 * 
 * @param Setting2
 * @text Setting 2
 *
 * @param Value2:num
 * @text EXP Value
 * @parent Setting2
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 50
 *
 * @param Icon2:num
 * @text Icon
 * @parent Setting2
 * @desc Which icon to use for this setting?
 * @default 73
 *
 * @param Rarity2:num
 * @text Rarity
 * @parent Setting2
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 1
 * 
 * @param Setting3
 * @text Setting 3
 *
 * @param Value3:num
 * @text EXP Value
 * @parent Setting3
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 100
 *
 * @param Icon3:num
 * @text Icon
 * @parent Setting3
 * @desc Which icon to use for this setting?
 * @default 89
 *
 * @param Rarity3:num
 * @text Rarity
 * @parent Setting3
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 2
 * 
 * @param Setting4
 * @text Setting 4
 *
 * @param Value4:num
 * @text EXP Value
 * @parent Setting4
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 500
 *
 * @param Icon4:num
 * @text Icon
 * @parent Setting4
 * @desc Which icon to use for this setting?
 * @default 89
 *
 * @param Rarity4:num
 * @text Rarity
 * @parent Setting4
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 3
 * 
 * @param Setting5
 * @text Setting 5
 *
 * @param Value5:num
 * @text EXP Value
 * @parent Setting5
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 1000
 *
 * @param Icon5:num
 * @text Icon
 * @parent Setting5
 * @desc Which icon to use for this setting?
 * @default 88
 *
 * @param Rarity5:num
 * @text Rarity
 * @parent Setting5
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 4
 * 
 * @param Setting6
 * @text Setting 6
 *
 * @param Value6:num
 * @text EXP Value
 * @parent Setting6
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 2500
 *
 * @param Icon6:num
 * @text Icon
 * @parent Setting6
 * @desc Which icon to use for this setting?
 * @default 88
 *
 * @param Rarity6:num
 * @text Rarity
 * @parent Setting6
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 5
 * 
 * @param Setting7
 * @text Setting 7
 *
 * @param Value7:num
 * @text EXP Value
 * @parent Setting7
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 5000
 *
 * @param Icon7:num
 * @text Icon
 * @parent Setting7
 * @desc Which icon to use for this setting?
 * @default 87
 *
 * @param Rarity7:num
 * @text Rarity
 * @parent Setting7
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 6
 * 
 * @param Setting8
 * @text Setting 8
 *
 * @param Value8:num
 * @text EXP Value
 * @parent Setting8
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 10000
 *
 * @param Icon8:num
 * @text Icon
 * @parent Setting8
 * @desc Which icon to use for this setting?
 * @default 87
 *
 * @param Rarity8:num
 * @text Rarity
 * @parent Setting8
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 7
 * 
 * @param Setting9
 * @text Setting 9
 *
 * @param Value9:num
 * @text EXP Value
 * @parent Setting9
 * @type number
 * @min 0
 * @desc How much EXP minimum to use this setting?
 * @default 25000
 *
 * @param Icon9:num
 * @text Icon
 * @parent Setting9
 * @desc Which icon to use for this setting?
 * @default 84
 *
 * @param Rarity9:num
 * @text Rarity
 * @parent Setting9
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 8
 * 
 * @param Setting10
 * @text Setting 10
 *
 * @param Value10:num
 * @text EXP Value
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc How much EXP minimum to use this setting?
 * @default 50000
 *
 * @param Icon10:num
 * @text Icon
 * @parent Setting10
 * @desc Which icon to use for this setting?
 * @default 84
 *
 * @param Rarity10:num
 * @text Rarity
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 9
 *
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Gold Drop
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for Gold?
 * @default true
 * 
 * @param Setting1
 * @text Setting 1
 *
 * @param Value1:num
 * @text Gold Value
 * @parent Setting1
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 1
 *
 * @param Icon1:num
 * @text Icon
 * @parent Setting1
 * @desc Which icon to use for this setting?
 * @default 314
 *
 * @param Rarity1:num
 * @text Rarity
 * @parent Setting1
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 0
 * 
 * @param Setting2
 * @text Setting 2
 *
 * @param Value2:num
 * @text Gold Value
 * @parent Setting2
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 50
 *
 * @param Icon2:num
 * @text Icon
 * @parent Setting2
 * @desc Which icon to use for this setting?
 * @default 314
 *
 * @param Rarity2:num
 * @text Rarity
 * @parent Setting2
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 1
 * 
 * @param Setting3
 * @text Setting 3
 *
 * @param Value3:num
 * @text Gold Value
 * @parent Setting3
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 100
 *
 * @param Icon3:num
 * @text Icon
 * @parent Setting3
 * @desc Which icon to use for this setting?
 * @default 196
 *
 * @param Rarity3:num
 * @text Rarity
 * @parent Setting3
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 2
 * 
 * @param Setting4
 * @text Setting 4
 *
 * @param Value4:num
 * @text Gold Value
 * @parent Setting4
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 500
 *
 * @param Icon4:num
 * @text Icon
 * @parent Setting4
 * @desc Which icon to use for this setting?
 * @default 196
 *
 * @param Rarity4:num
 * @text Rarity
 * @parent Setting4
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 3
 * 
 * @param Setting5
 * @text Setting 5
 *
 * @param Value5:num
 * @text Gold Value
 * @parent Setting5
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 1000
 *
 * @param Icon5:num
 * @text Icon
 * @parent Setting5
 * @desc Which icon to use for this setting?
 * @default 313
 *
 * @param Rarity5:num
 * @text Rarity
 * @parent Setting5
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 4
 * 
 * @param Setting6
 * @text Setting 6
 *
 * @param Value6:num
 * @text Gold Value
 * @parent Setting6
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 5000
 *
 * @param Icon6:num
 * @text Icon
 * @parent Setting6
 * @desc Which icon to use for this setting?
 * @default 313
 *
 * @param Rarity6:num
 * @text Rarity
 * @parent Setting6
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 5
 * 
 * @param Setting7
 * @text Setting 7
 *
 * @param Value7:num
 * @text Gold Value
 * @parent Setting7
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 10000
 *
 * @param Icon7:num
 * @text Icon
 * @parent Setting7
 * @desc Which icon to use for this setting?
 * @default 303
 *
 * @param Rarity7:num
 * @text Rarity
 * @parent Setting7
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 6
 * 
 * @param Setting8
 * @text Setting 8
 *
 * @param Value8:num
 * @text Gold Value
 * @parent Setting8
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 50000
 *
 * @param Icon8:num
 * @text Icon
 * @parent Setting8
 * @desc Which icon to use for this setting?
 * @default 303
 *
 * @param Rarity8:num
 * @text Rarity
 * @parent Setting8
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 7
 * 
 * @param Setting9
 * @text Setting 9
 *
 * @param Value9:num
 * @text Gold Value
 * @parent Setting9
 * @type number
 * @min 0
 * @desc How much Gold minimum to use this setting?
 * @default 100000
 *
 * @param Icon9:num
 * @text Icon
 * @parent Setting9
 * @desc Which icon to use for this setting?
 * @default 300
 *
 * @param Rarity9:num
 * @text Rarity
 * @parent Setting9
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 8
 * 
 * @param Setting10
 * @text Setting 10
 *
 * @param Value10:num
 * @text Gold Value
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc How much Gold minimum to use this setting?
 * @default 500000
 *
 * @param Icon10:num
 * @text Icon
 * @parent Setting10
 * @desc Which icon to use for this setting?
 * @default 300
 *
 * @param Rarity10:num
 * @text Rarity
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 9
 *
 */
/* ----------------------------------------------------------------------------
 * Drop Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Drop:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Enemy Drops
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for enemy drops?
 * @default true
 *
 * @param uniqueIcons:eval
 * @text Use Unique Icons
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the icons of the drops?
 * If not, use the ones below.
 * @default true
 *
 * @param CommonIcons
 * @text Common Icons
 *
 * @param commonItemIcon:num
 * @text Common Item Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common items?
 * @default 208
 *
 * @param commonWeaponIcon:num
 * @text Common Weapon Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common weapons?
 * @default 210
 *
 * @param commonArmorsIcon:num
 * @text Common Armor Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common armors?
 * @default 210
 *
 */
/* ----------------------------------------------------------------------------
 * Rarity Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rarity:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Rarities
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual effects for different rarities?
 * @default true
 * 
 * @param Setting0
 * @text No Rarity
 *
 * @param Tint0:eval
 * @text Tint
 * @parent Setting0
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Duration0:num
 * @text Duration
 * @parent Setting0
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 180
 *
 * @param Flags0:arraystr
 * @text Flags
 * @parent Setting0
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting1
 * @text Rarity 1
 *
 * @param Tint1:eval
 * @text Tint
 * @parent Setting1
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 30, 60, 20]
 *
 * @param Duration1:num
 * @text Duration
 * @parent Setting1
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 180
 *
 * @param Flags1:arraystr
 * @text Flags
 * @parent Setting1
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting2
 * @text Rarity 2
 *
 * @param Tint2:eval
 * @text Tint
 * @parent Setting2
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [30, 60, 0, 40]
 *
 * @param Duration2:num
 * @text Duration
 * @parent Setting2
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 160
 *
 * @param Flags2:arraystr
 * @text Flags
 * @parent Setting2
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting3
 * @text Rarity 3
 *
 * @param Tint3:eval
 * @text Tint
 * @parent Setting3
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 30, 60]
 *
 * @param Duration3:num
 * @text Duration
 * @parent Setting3
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 140
 *
 * @param Flags3:arraystr
 * @text Flags
 * @parent Setting3
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting4
 * @text Rarity 4
 *
 * @param Tint4:eval
 * @text Tint
 * @parent Setting4
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 60, 60, 80]
 *
 * @param Duration4:num
 * @text Duration
 * @parent Setting4
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 120
 *
 * @param Flags4:arraystr
 * @text Flags
 * @parent Setting4
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting5
 * @text Rarity 5
 *
 * @param Tint5:eval
 * @text Tint
 * @parent Setting5
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 60, 0, 100]
 *
 * @param Duration5:num
 * @text Duration
 * @parent Setting5
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 100
 *
 * @param Flags5:arraystr
 * @text Flags
 * @parent Setting5
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting6
 * @text Rarity 6
 *
 * @param Tint6:eval
 * @text Tint
 * @parent Setting6
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 60, 120]
 *
 * @param Duration6:num
 * @text Duration
 * @parent Setting6
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 80
 *
 * @param Flags6:arraystr
 * @text Flags
 * @parent Setting6
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting7
 * @text Rarity 7
 *
 * @param Tint7:eval
 * @text Tint
 * @parent Setting7
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 60, 140]
 *
 * @param Duration7:num
 * @text Duration
 * @parent Setting7
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 70
 *
 * @param Flags7:arraystr
 * @text Flags
 * @parent Setting7
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting8
 * @text Rarity 8
 *
 * @param Tint8:eval
 * @text Tint
 * @parent Setting8
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 60, 0, 160]
 *
 * @param Duration8:num
 * @text Duration
 * @parent Setting8
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 60
 *
 * @param Flags8:arraystr
 * @text Flags
 * @parent Setting8
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting9
 * @text Rarity 9
 *
 * @param Tint9:eval
 * @text Tint
 * @parent Setting9
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 0, 180]
 *
 * @param Duration9:num
 * @text Duration
 * @parent Setting9
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 50
 *
 * @param Flags9:arraystr
 * @text Flags
 * @parent Setting9
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting10
 * @text Rarity 10
 *
 * @param Tint10:eval
 * @text Tint
 * @parent Setting10
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Duration10:num
 * @text Duration
 * @parent Setting10
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 40
 *
 * @param Flags10:arraystr
 * @text Flags
 * @parent Setting10
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default ["Rainbow"]
 * 
 * @param SpecialEffects
 * @text Special Effects
 *
 * @param RainbowHueSpeed:num
 * @text Rainbow Hue Speed
 * @parent SpecialEffects
 * @type number
 * @min 1
 * @desc How fast do you want the Rainbow effect to change hue?
 * @default 4
 *
 */
//=============================================================================

const _0x5e1e=['Tint%1','targetY','GNARf','_elementIDs','map','_shadowSprite','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','sKqGR','ForcedAddArmor','isArmor','_rotationConstant','Skill','process_VisuMZ_ExtraEnemyDrops_Notetags','_bonusRewards','deathTurn','Value%1','updateDuration','restoreVisualDrops','VisualDropVisible','loadSystem','Rzvpu','concat','initialize','hasForcedDrops','_visualDropSprites','iconOffsetRate','max','shadowOffsetY','round','setForcedGold','_data','fUjWZ','applyItemUserEffect','iconIndex','addForcedWeaponDrop','setTintInformation','Settings','EVAL','addForcedItemDrop','deadMembers','skillTypes','xEhbI','Flags%1','ITEM','_forcedRewards','updatePosition','isWeapon','findTargetDropSprite','isStateAffected','Tint0','startSpecialSFX','PoJYW','elementId','goldTotal','setFlags','charAt','opacity','setRarity','trim','ForcedExpSet','Game_Battler_onBattleStart','dropItemRate','cos','lastStruckType','Gold','exp','isSceneBattle','Game_Enemy_gold','toUpperCase','WEAPONS','BOUNCE\x20SFX:\x20%1','ITEMS','baseY','getDatabaseItem','updateTint','Game_Action_applyItemUserEffect','Exp','uiXgx','ForcedGoldSet','HmbIn','sortDrops','level','setBonusExp','Game_BattlerBase_eraseState','targetOpacity','slice','name','setForcedExp','NUM','dJiPO','getExpGoldDropIcon','aliveMembers','ForcedRewardsClear','updateOpacity','getItemDropIcons','addChild','Igdml','drops','Game_Troop_clear','iconJumpEasing','opacityRate','commonArmorsIcon','clearForcedRewards','OcLiq','opacityFadeOut','elements','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','sin','GaDwf','_baseY','numItems','calculatePosition','WEAPON','addBonusArmorDrop','SPAWN\x20SFX:\x20%1','flags','ARMORS','duration','addExtraEnemyDropsJS','_baseX','Rarity','nIWtZ','oOLNp','STR','IOOlr','zsIni','STRUCT','gggmY','agZCb','split','hue','SKILLS','Game_Enemy_setup','getStateIdWithName','update','tPSRY','status','updateRotation','sgLHs','Spriteset_Battle_createLowerLayer','addNewState','vUpwd','enemy','parse','sfxVolume','Game_Troop_expTotal','calculateJumpHeight','exit','onBattleStart','IconSet','uniqueIcons','Flags0','getDeathTurn','ConvertParams','timesStruckElement','ApYcf','ApplyEasing','addExtraEnemyDropsSingles','MNmck','createLowerLayer','General','yRateFoV','bind','deathStateId','yrrZf','addForcedArmorDrop','ARMOR','shadowFilename','DMskY','radiusPerIcon','playSe','attackElements','zfMZZ','rarityTint','_battlerContainer','call','baseX','goldRate','STATES','pow','stypeId','isDead','BonusAddWeapon','commonWeaponIcon','isSkill','Qnxzy','description','FUNC','process_VisuMZ_ExtraEnemyDrops_JS_Notetags','timesStruck%1','removeVisualDrops','makeDropItems','onDatabaseLoaded','SCREEN','setColorTone','subject','_stypeIDs','rotationConstant','timesStruckElements','startFadeOut','getDatabase','lastStruck%1','TintDuration0','bounces','rarityDuration','ExtraEnemyDrops','initMembers','STYPE','ScYZU','fadeAfterBounce','value','Game_Enemy_makeDropItems','getStypeIdWithName','SType','_conditionalDropsTrackedData','note','viYME','BonusAddItem','BattleManager_initMembers','sfxFilename','addExtraEnemyDropsBatch','Item','ADDITIVE','Game_BattlerBase_addNewState','clamp','ELEMENT','format','constructor','prototype','_visualDropsVisible','getWeaponIdWithName','hKOmU','timesStruckStates','Linear','isItem','ARRAYFUNC','createIconSprite','_visualDrops','iconHeight','yKInF','parameters','Scene_Boot_onDatabaseLoaded','Game_Enemy_exp','timesStruckSTypes','find','createSprites','applyEasing','TPOoA','_itemIDs','blendMode','mkslO','ZVmlu','createShadowSprite','turnCount','setFrame','vPDtI','Rtwta','oyhZJ','BonusExpSet','registerDeathTurn','_skillIDs','_spriteset','battleMembers','BCzMs','damage','State','Drop','zTNoD','YZgxU','setBonusGold','random','resetVisualDrops','icmAT','lastStruckElement','updateJumpHeight','jumpHeight','sfxPitch','RAINBOW','isAlive','BonusRewardsClear','addExtraEnemyDropsConditional','timesStruckSkills','showShadow','HGhoi','QDSMG','SIXVY','createChildren','rarityFrames','timesStruckItem','ARRAYSTR','push','createInitialPosition','ASaVs','expTotal','ZHWPE','wpiLb','ZiQJI','addExtraEnemyDrops','timesStruckState','_weaponIDs','_stateIDs','match','RKYyy','MULTIPLY','opacityModifier','gold','lastStruckState','meetsExtraEnemyDropsCondition','addBonusWeaponDrop','targetX','getItemIdWithName','createVisualDrops','Duration%1','quantity','members','_scene','sort','replace','JmvgP','HYUUY','includes','SKILL','battler','setTargetDestination','getElementIdWithName','BonusAddArmor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ForcedAddWeapon','shadowOpacity','rWpNV','ARRAYJSON','getSkillIdWithName','Element','plVqy','Game_Troop_goldTotal','show','true','Game_Troop_makeDropItems','updateFlags','isEnemy','addTimesStruck','version','CBGZm','angle','VisuMZ_1_BattleCore','filter','return\x200','children','ForcedAddItem','VQmfT','jAPcu','lastStruckSkill','RkJsr','lastStruckSType','ARRAYNUM','Visible','_iconSprite','makeDeepCopy','ARRAYSTRUCT','getArmorIdWithName','convertConditionToCode','eraseState','Uqole','clearBonusRewards','anchor','ERpZT','_armorIDs','updateFlagData','VisualDrops','SduJN','OzOng','createJS','registerCommand','toLowerCase','ISaLC','setup','false','length','bounceReduction','msDelay','getConditionalDropsTrackedData','randomInt','bounceSFX','STATE','createConditionalDropsTrackedData','addBonusItemDrop','HyJtB','clear','dlGEp'];(function(_0x54b930,_0x5e1eab){const _0x23709f=function(_0x57c88d){while(--_0x57c88d){_0x54b930['push'](_0x54b930['shift']());}};_0x23709f(++_0x5e1eab);}(_0x5e1e,0x151));const _0x2370=function(_0x54b930,_0x5e1eab){_0x54b930=_0x54b930-0x0;let _0x23709f=_0x5e1e[_0x54b930];return _0x23709f;};const _0xa734c1=_0x2370;var label=_0xa734c1('0x101'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xa734c1('0x8')](function(_0x382a47){const _0x4585f5=_0xa734c1;return _0x382a47[_0x4585f5('0xbc')]&&_0x382a47[_0x4585f5('0xee')][_0x4585f5('0x174')]('['+label+']');})[0x0];VisuMZ[label][_0xa734c1('0x58')]=VisuMZ[label][_0xa734c1('0x58')]||{},VisuMZ[_0xa734c1('0xcd')]=function(_0xadb723,_0x2dc3e0){const _0x462ef1=_0xa734c1;for(const _0x423a13 in _0x2dc3e0){if(_0x423a13[_0x462ef1('0x161')](/(.*):(.*)/i)){const _0x4d4a20=String(RegExp['$1']),_0x21c800=String(RegExp['$2'])[_0x462ef1('0x78')]()[_0x462ef1('0x6e')]();let _0xc7e8b2,_0x4a48ac,_0x4b8151;switch(_0x21c800){case _0x462ef1('0x8c'):_0xc7e8b2=_0x2dc3e0[_0x423a13]!==''?Number(_0x2dc3e0[_0x423a13]):0x0;break;case _0x462ef1('0x11'):_0x4a48ac=_0x2dc3e0[_0x423a13]!==''?JSON[_0x462ef1('0xc3')](_0x2dc3e0[_0x423a13]):[],_0xc7e8b2=_0x4a48ac[_0x462ef1('0x38')](_0x4d9d0f=>Number(_0x4d9d0f));break;case _0x462ef1('0x59'):_0xc7e8b2=_0x2dc3e0[_0x423a13]!==''?eval(_0x2dc3e0[_0x423a13]):null;break;case'ARRAYEVAL':_0x4a48ac=_0x2dc3e0[_0x423a13]!==''?JSON['parse'](_0x2dc3e0[_0x423a13]):[],_0xc7e8b2=_0x4a48ac[_0x462ef1('0x38')](_0x477b23=>eval(_0x477b23));break;case'JSON':_0xc7e8b2=_0x2dc3e0[_0x423a13]!==''?JSON[_0x462ef1('0xc3')](_0x2dc3e0[_0x423a13]):'';break;case _0x462ef1('0x17e'):_0x4a48ac=_0x2dc3e0[_0x423a13]!==''?JSON[_0x462ef1('0xc3')](_0x2dc3e0[_0x423a13]):[],_0xc7e8b2=_0x4a48ac['map'](_0x406f49=>JSON['parse'](_0x406f49));break;case _0x462ef1('0xef'):_0xc7e8b2=_0x2dc3e0[_0x423a13]!==''?new Function(JSON[_0x462ef1('0xc3')](_0x2dc3e0[_0x423a13])):new Function(_0x462ef1('0x9'));break;case _0x462ef1('0x11f'):_0x4a48ac=_0x2dc3e0[_0x423a13]!==''?JSON[_0x462ef1('0xc3')](_0x2dc3e0[_0x423a13]):[],_0xc7e8b2=_0x4a48ac[_0x462ef1('0x38')](_0x24bbaf=>new Function(JSON[_0x462ef1('0xc3')](_0x24bbaf)));break;case _0x462ef1('0xaf'):_0xc7e8b2=_0x2dc3e0[_0x423a13]!==''?String(_0x2dc3e0[_0x423a13]):'';break;case _0x462ef1('0x155'):_0x4a48ac=_0x2dc3e0[_0x423a13]!==''?JSON['parse'](_0x2dc3e0[_0x423a13]):[],_0xc7e8b2=_0x4a48ac[_0x462ef1('0x38')](_0xeaf715=>String(_0xeaf715));break;case _0x462ef1('0xb2'):_0x4b8151=_0x2dc3e0[_0x423a13]!==''?JSON[_0x462ef1('0xc3')](_0x2dc3e0[_0x423a13]):{},_0xc7e8b2=VisuMZ['ConvertParams']({},_0x4b8151);break;case _0x462ef1('0x15'):_0x4a48ac=_0x2dc3e0[_0x423a13]!==''?JSON[_0x462ef1('0xc3')](_0x2dc3e0[_0x423a13]):[],_0xc7e8b2=_0x4a48ac[_0x462ef1('0x38')](_0x587b64=>VisuMZ['ConvertParams']({},JSON[_0x462ef1('0xc3')](_0x587b64)));break;default:continue;}_0xadb723[_0x4d4a20]=_0xc7e8b2;}}return _0xadb723;},(_0xbc5d4d=>{const _0x515d7b=_0xa734c1,_0x4dab48=_0xbc5d4d[_0x515d7b('0x8a')];for(const _0x54cc6f of dependencies){if(!Imported[_0x54cc6f]){alert(_0x515d7b('0x9e')[_0x515d7b('0x116')](_0x4dab48,_0x54cc6f)),SceneManager[_0x515d7b('0xc7')]();break;}}const _0x4de529=_0xbc5d4d[_0x515d7b('0xee')];if(_0x4de529['match'](/\[Version[ ](.*?)\]/i)){if(_0x515d7b('0x133')==='PcqDS'){function _0x2fa735(){const _0x5ddf32=_0x515d7b,_0x55ce1d=_0x2572c7[_0x5ddf32('0xd0')]((_0x6d6f8a-_0x49e3b2)/_0x299f70,_0x1ddd21||_0x5ddf32('0x11d')),_0x412db7=_0x4c0fa5['ApplyEasing']((_0x2197f0-_0x3567da+0x1)/_0x12f200,_0x2b124a||_0x5ddf32('0x11d')),_0x4bc9a0=(_0x2b9a97-_0x3233a2*_0x55ce1d)/(0x1-_0x55ce1d);return _0x4bc9a0+(_0x2d3523-_0x4bc9a0)*_0x412db7;}}else{const _0x4bce3f=Number(RegExp['$1']);_0x4bce3f!==VisuMZ[label][_0x515d7b('0x4')]&&(alert(_0x515d7b('0x3a')['format'](_0x4dab48,_0x4bce3f)),SceneManager['exit']());}}if(_0x4de529[_0x515d7b('0x161')](/\[Tier[ ](\d+)\]/i)){if('IQsVc'===_0x515d7b('0x3b')){function _0x27c34d(){const _0x46c0f0=_0x515d7b;_0x51cd1e[_0x46c0f0('0xf2')](this);if(_0x50ec9e[_0x46c0f0('0x101')][_0x46c0f0('0x58')][_0x46c0f0('0xd4')]['resetOnRevive'])this[_0x46c0f0('0x143')]();}}else{const _0x1c901e=Number(RegExp['$1']);if(_0x1c901e<tier)alert(_0x515d7b('0x17a')[_0x515d7b('0x116')](_0x4dab48,_0x1c901e,tier)),SceneManager[_0x515d7b('0xc7')]();else{if('hCcIY'!==_0x515d7b('0x162'))tier=Math['max'](_0x1c901e,tier);else{function _0x36ff19(){const _0x145543=_0x515d7b;return this[_0x145543('0x10a')]===_0x41c9cd&&this['createConditionalDropsTrackedData'](),this['_conditionalDropsTrackedData'];}}}}}VisuMZ[_0x515d7b('0xcd')](VisuMZ[label][_0x515d7b('0x58')],_0xbc5d4d[_0x515d7b('0x124')]);})(pluginData),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0x14b'),_0x44b612=>{VisuMZ['ConvertParams'](_0x44b612,_0x44b612),$gameTroop['clearBonusRewards']();}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0x136'),_0x3aa72d=>{const _0x36f18e=_0xa734c1;VisuMZ['ConvertParams'](_0x3aa72d,_0x3aa72d);const _0x2f0909=_0x3aa72d['value'];$gameTroop[_0x36f18e('0x86')](_0x2f0909);}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],'BonusGoldSet',_0x3d5dd1=>{const _0x4d49fa=_0xa734c1;VisuMZ['ConvertParams'](_0x3d5dd1,_0x3d5dd1);const _0x2c1748=_0x3d5dd1[_0x4d49fa('0x106')];$gameTroop[_0x4d49fa('0x141')](_0x2c1748);}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0x10d'),_0xd1ae6=>{const _0x16ddc8=_0xa734c1;VisuMZ['ConvertParams'](_0xd1ae6,_0xd1ae6);const _0x3fbd10=_0xd1ae6['id'],_0xcea53d=_0xd1ae6[_0x16ddc8('0x16d')];$gameTroop[_0x16ddc8('0x30')](_0x3fbd10,_0xcea53d);}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0xea'),_0x40582b=>{const _0x440b93=_0xa734c1;VisuMZ[_0x440b93('0xcd')](_0x40582b,_0x40582b);const _0x9347ef=_0x40582b['id'],_0x4460f5=_0x40582b[_0x440b93('0x16d')];$gameTroop[_0x440b93('0x168')](_0x9347ef,_0x4460f5);}),PluginManager['registerCommand'](pluginData['name'],_0xa734c1('0x179'),_0x419148=>{const _0x266911=_0xa734c1;VisuMZ[_0x266911('0xcd')](_0x419148,_0x419148);const _0x2e9b54=_0x419148['id'],_0x58f92c=_0x419148[_0x266911('0x16d')];$gameTroop[_0x266911('0xa5')](_0x2e9b54,_0x58f92c);}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0x90'),_0x2b16bc=>{const _0x1b2132=_0xa734c1;VisuMZ[_0x1b2132('0xcd')](_0x2b16bc,_0x2b16bc),$gameTroop[_0x1b2132('0x9a')]();}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0x6f'),_0x1d1a6e=>{const _0x51dfcf=_0xa734c1;VisuMZ[_0x51dfcf('0xcd')](_0x1d1a6e,_0x1d1a6e);const _0x41c263=_0x1d1a6e[_0x51dfcf('0x106')];$gameTroop['setForcedExp'](_0x41c263);}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0x82'),_0x3cf30d=>{const _0xe770fd=_0xa734c1;VisuMZ[_0xe770fd('0xcd')](_0x3cf30d,_0x3cf30d);const _0x59b9c6=_0x3cf30d[_0xe770fd('0x106')];$gameTroop[_0xe770fd('0x51')](_0x59b9c6);}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0xb'),_0xe15cb5=>{const _0x571bd4=_0xa734c1;VisuMZ[_0x571bd4('0xcd')](_0xe15cb5,_0xe15cb5);const _0x3b85a5=_0xe15cb5['id'],_0x3376c3=_0xe15cb5[_0x571bd4('0x16d')];$gameTroop[_0x571bd4('0x5a')](_0x3b85a5,_0x3376c3);}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0x17b'),_0x431674=>{const _0x2f3922=_0xa734c1;VisuMZ[_0x2f3922('0xcd')](_0x431674,_0x431674);const _0x476ffd=_0x431674['id'],_0xd28167=_0x431674['quantity'];$gameTroop[_0x2f3922('0x56')](_0x476ffd,_0xd28167);}),PluginManager['registerCommand'](pluginData['name'],_0xa734c1('0x3c'),_0x26e5a9=>{const _0x3c8fae=_0xa734c1;VisuMZ[_0x3c8fae('0xcd')](_0x26e5a9,_0x26e5a9);const _0x3a5394=_0x26e5a9['id'],_0x3b3cbc=_0x26e5a9['quantity'];$gameTroop['addForcedArmorDrop'](_0x3a5394,_0x3b3cbc);}),PluginManager[_0xa734c1('0x23')](pluginData[_0xa734c1('0x8a')],_0xa734c1('0x46'),_0x3a6ced=>{const _0x110195=_0xa734c1;VisuMZ['ConvertParams'](_0x3a6ced,_0x3a6ced);const _0x11ab0d=_0x3a6ced[_0x110195('0x12')];BattleManager['_visualDropsVisible']=_0x11ab0d;}),VisuMZ[_0xa734c1('0x101')]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0xa734c1('0x118')][_0xa734c1('0xf4')],Scene_Boot[_0xa734c1('0x118')][_0xa734c1('0xf4')]=function(){const _0x47e534=_0xa734c1;VisuMZ[_0x47e534('0x101')][_0x47e534('0x125')]['call'](this),this[_0x47e534('0x40')]();},Scene_Boot[_0xa734c1('0x118')]['process_VisuMZ_ExtraEnemyDrops_Notetags']=function(){this['process_VisuMZ_ExtraEnemyDrops_JS_Notetags']();},Scene_Boot[_0xa734c1('0x118')][_0xa734c1('0xf0')]=function(){const _0x38cba2=_0xa734c1;for(const _0x15473c of $dataEnemies){if(!_0x15473c)continue;if(_0x15473c[_0x38cba2('0x10b')][_0x38cba2('0x161')](/<JS DROPS>\s*([\s\S]*)\s*<\/JS DROPS>/i)){const _0x14ceb9=String(RegExp['$1']);VisuMZ[_0x38cba2('0x101')]['createJS'](_0x15473c,_0x14ceb9);}}},VisuMZ[_0xa734c1('0x101')]['JS']={},VisuMZ['ExtraEnemyDrops'][_0xa734c1('0x22')]=function(_0xca02e3,_0x14a822){const _0x21a9e3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20drops\x20=\x20arguments[0];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Array\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20drops;\x0a\x20\x20\x20\x20'['format'](_0x14a822),_0x5dc0b=_0xca02e3['id'];VisuMZ['ExtraEnemyDrops']['JS'][_0x5dc0b]=new Function(_0x21a9e3);},DataManager[_0xa734c1('0x16a')]=function(_0x1786c9){const _0x38e073=_0xa734c1;_0x1786c9=_0x1786c9[_0x38e073('0x78')]()[_0x38e073('0x6e')](),this[_0x38e073('0x12c')]=this[_0x38e073('0x12c')]||{};if(this[_0x38e073('0x12c')][_0x1786c9])return this['_itemIDs'][_0x1786c9];for(const _0x599d05 of $dataItems){if(!_0x599d05)continue;this['_itemIDs'][_0x599d05['name'][_0x38e073('0x78')]()[_0x38e073('0x6e')]()]=_0x599d05['id'];}return this[_0x38e073('0x12c')][_0x1786c9]||0x0;},DataManager[_0xa734c1('0x11a')]=function(_0x539f82){const _0x129487=_0xa734c1;_0x539f82=_0x539f82[_0x129487('0x78')]()[_0x129487('0x6e')](),this[_0x129487('0x15f')]=this[_0x129487('0x15f')]||{};if(this[_0x129487('0x15f')][_0x539f82])return this[_0x129487('0x15f')][_0x539f82];for(const _0x4a5831 of $dataWeapons){if('Rzvpu'!==_0x129487('0x48')){function _0x10261e(){const _0x5c6c2b=_0x129487;if(!_0x5caf12[_0x5c6c2b('0x76')]())return;this[_0x5c6c2b('0xe2')][_0x5c6c2b('0x93')](_0x5b113f),_0x3b5ac2[_0x5c6c2b('0x66')]();}}else{if(!_0x4a5831)continue;this[_0x129487('0x15f')][_0x4a5831[_0x129487('0x8a')]['toUpperCase']()[_0x129487('0x6e')]()]=_0x4a5831['id'];}}return this[_0x129487('0x15f')][_0x539f82]||0x0;},DataManager[_0xa734c1('0x16')]=function(_0xf011d9){const _0x5f3fab=_0xa734c1;_0xf011d9=_0xf011d9[_0x5f3fab('0x78')]()[_0x5f3fab('0x6e')](),this[_0x5f3fab('0x1d')]=this['_armorIDs']||{};if(this[_0x5f3fab('0x1d')][_0xf011d9])return this[_0x5f3fab('0x1d')][_0xf011d9];for(const _0x5c0084 of $dataArmors){if(!_0x5c0084)continue;this[_0x5f3fab('0x1d')][_0x5c0084[_0x5f3fab('0x8a')][_0x5f3fab('0x78')]()[_0x5f3fab('0x6e')]()]=_0x5c0084['id'];}return this[_0x5f3fab('0x1d')][_0xf011d9]||0x0;},DataManager[_0xa734c1('0x17f')]=function(_0x4c1e0c){const _0xa2df3f=_0xa734c1;_0x4c1e0c=_0x4c1e0c[_0xa2df3f('0x78')]()[_0xa2df3f('0x6e')](),this[_0xa2df3f('0x138')]=this[_0xa2df3f('0x138')]||{};if(this[_0xa2df3f('0x138')][_0x4c1e0c])return this['_skillIDs'][_0x4c1e0c];for(const _0x5c3e80 of $dataSkills){if(!_0x5c3e80)continue;this[_0xa2df3f('0x138')][_0x5c3e80['name'][_0xa2df3f('0x78')]()[_0xa2df3f('0x6e')]()]=_0x5c3e80['id'];}return this[_0xa2df3f('0x138')][_0x4c1e0c]||0x0;},DataManager['getStypeIdWithName']=function(_0x4ea4f1){const _0x2bb75d=_0xa734c1;_0x4ea4f1=_0x4ea4f1[_0x2bb75d('0x78')]()[_0x2bb75d('0x6e')](),this[_0x2bb75d('0xf8')]=this[_0x2bb75d('0xf8')]||{};if(this[_0x2bb75d('0xf8')][_0x4ea4f1])return this[_0x2bb75d('0xf8')][_0x4ea4f1];for(let _0x4ea6b5=0x1;_0x4ea6b5<0x64;_0x4ea6b5++){if(!$dataSystem[_0x2bb75d('0x5c')][_0x4ea6b5])continue;let _0x52a2c3=$dataSystem[_0x2bb75d('0x5c')][_0x4ea6b5][_0x2bb75d('0x78')]()[_0x2bb75d('0x6e')]();_0x52a2c3=_0x52a2c3[_0x2bb75d('0x171')](/\x1I\[(\d+)\]/gi,''),_0x52a2c3=_0x52a2c3['replace'](/\\I\[(\d+)\]/gi,''),this[_0x2bb75d('0xf8')][_0x52a2c3]=_0x4ea6b5;}return this[_0x2bb75d('0xf8')][_0x4ea4f1]||0x0;},DataManager[_0xa734c1('0xb9')]=function(_0xfd4fad){const _0x3b8401=_0xa734c1;_0xfd4fad=_0xfd4fad['toUpperCase']()[_0x3b8401('0x6e')](),this[_0x3b8401('0x160')]=this[_0x3b8401('0x160')]||{};if(this['_stateIDs'][_0xfd4fad])return this[_0x3b8401('0x160')][_0xfd4fad];for(const _0x25f15f of $dataStates){if(_0x3b8401('0x173')!==_0x3b8401('0x173')){function _0xfe3de2(){const _0x3ad890=_0x3b8401;this[_0x3ad890('0xab')]=(this['_baseX']*(_0x4d0cdf-0x1)+this['_data']['targetX'])/_0x38f1d5,this[_0x3ad890('0xa1')]=(this['_baseY']*(_0x11ff1d-0x1)+this['_data'][_0x3ad890('0x35')])/_0x419652;}}else{if(!_0x25f15f)continue;this[_0x3b8401('0x160')][_0x25f15f[_0x3b8401('0x8a')][_0x3b8401('0x78')]()['trim']()]=_0x25f15f['id'];}}return this[_0x3b8401('0x160')][_0xfd4fad]||0x0;},DataManager[_0xa734c1('0x178')]=function(_0x1540c6){const _0x1a3ac3=_0xa734c1;_0x1540c6=_0x1540c6[_0x1a3ac3('0x78')]()['trim'](),this[_0x1a3ac3('0x37')]=this[_0x1a3ac3('0x37')]||{};if(this[_0x1a3ac3('0x37')][_0x1540c6])return this[_0x1a3ac3('0x37')][_0x1540c6];let _0xe886a9=0x1;for(const _0x1ac18f of $dataSystem['elements']){if(!_0x1ac18f)continue;let _0x9b500a=_0x1ac18f[_0x1a3ac3('0x78')]();_0x9b500a=_0x9b500a['replace'](/\x1I\[(\d+)\]/gi,''),_0x9b500a=_0x9b500a['replace'](/\\I\[(\d+)\]/gi,''),this['_elementIDs'][_0x9b500a]=_0xe886a9,_0xe886a9++;}return this[_0x1a3ac3('0x37')][_0x1540c6]||0x0;},SceneManager[_0xa734c1('0x76')]=function(){const _0x168161=_0xa734c1;return this[_0x168161('0x16f')]&&this[_0x168161('0x16f')][_0x168161('0x117')]===Scene_Battle;},VisuMZ[_0xa734c1('0x101')][_0xa734c1('0x7f')]=Game_Action[_0xa734c1('0x118')][_0xa734c1('0x54')],Game_Action[_0xa734c1('0x118')][_0xa734c1('0x54')]=function(_0x195566){const _0x4a3949=_0xa734c1;_0x195566['applyTimesStruck'](this),VisuMZ[_0x4a3949('0x101')][_0x4a3949('0x7f')][_0x4a3949('0xe3')](this,_0x195566);},VisuMZ['ExtraEnemyDrops'][_0xa734c1('0x70')]=Game_Battler['prototype'][_0xa734c1('0xc8')],Game_Battler[_0xa734c1('0x118')][_0xa734c1('0xc8')]=function(_0x544113){const _0x383683=_0xa734c1;VisuMZ['ExtraEnemyDrops'][_0x383683('0x70')]['call'](this,_0x544113),this[_0x383683('0x2f')]();},Game_Battler[_0xa734c1('0x118')]['createConditionalDropsTrackedData']=function(){const _0x3455f7=_0xa734c1;this[_0x3455f7('0x10a')]={'deathTurn':0x0,'timesStruckSkills':{},'timesStruckSTypes':{},'timesStruckItems':{},'timesStruckStates':{},'timesStruckElements':{},'lastStruckType':'none','lastStruckSkill':0x0,'lastStruckSType':0x0,'lastStruckItem':0x0,'lastStruckState':0x0,'lastStruckElement':0x0};},Game_Battler[_0xa734c1('0x118')][_0xa734c1('0x2b')]=function(){const _0x462dba=_0xa734c1;return this[_0x462dba('0x10a')]===undefined&&this[_0x462dba('0x2f')](),this[_0x462dba('0x10a')];},Game_Battler[_0xa734c1('0x118')]['getDeathTurn']=function(){const _0x1133bf=_0xa734c1;return this[_0x1133bf('0x2b')]()[_0x1133bf('0x42')]||0x0;},Game_Battler[_0xa734c1('0x118')][_0xa734c1('0x3')]=function(_0x3661ff,_0x3aaaa2,_0x4e97bf){const _0x532a75=_0xa734c1,_0x5d5120=this['getConditionalDropsTrackedData']();_0x4e97bf=_0x4e97bf||0x1;const _0x140e0e='timesStruck%1s'[_0x532a75('0x116')](_0x3661ff);if(!_0x5d5120[_0x140e0e])return;_0x5d5120[_0x140e0e][_0x3aaaa2]=_0x5d5120[_0x140e0e][_0x3aaaa2]||0x0,_0x5d5120[_0x140e0e][_0x3aaaa2]+=_0x4e97bf;const _0x351932=_0x532a75('0xfd')[_0x532a75('0x116')](_0x3661ff);_0x5d5120[_0x351932]=_0x3aaaa2;if(['Item',_0x532a75('0x3f')][_0x532a75('0x174')](_0x3661ff)){if(_0x532a75('0x181')!==_0x532a75('0xd2'))_0x5d5120[_0x532a75('0x73')]=_0x3661ff;else{function _0x32b224(){const _0x35e454=_0x532a75,_0x4f4512=_0x1ef23e[_0x151de4];if(_0x4f4512)this[_0x35e454('0x60')][_0x35e454('0x95')][_0x35e454('0x156')](_0x4f4512);}}}},Game_Battler[_0xa734c1('0x118')]['timesStruckSkill']=function(_0x194b4b){const _0x5293f9=_0xa734c1,_0x2cd6d9=this['getConditionalDropsTrackedData']()[_0x5293f9('0x14d')];return _0x2cd6d9[_0x194b4b]||0x0;},Game_Battler[_0xa734c1('0x118')]['timesStruckSType']=function(_0x3cd90c){const _0x533bf1=_0xa734c1,_0x16571a=this[_0x533bf1('0x2b')]()[_0x533bf1('0x127')];return _0x16571a[_0x3cd90c]||0x0;},Game_Battler[_0xa734c1('0x118')][_0xa734c1('0x154')]=function(_0x3dd961){const _0x1ac85a=_0xa734c1,_0x5199f0=this[_0x1ac85a('0x2b')]()['timesStruckItems'];return _0x5199f0[_0x3dd961]||0x0;},Game_Battler['prototype'][_0xa734c1('0x15e')]=function(_0x23e768){const _0x2aaecb=_0xa734c1,_0x1334da=this['getConditionalDropsTrackedData']()[_0x2aaecb('0x11c')];return _0x1334da[_0x23e768]||0x0;},Game_Battler[_0xa734c1('0x118')][_0xa734c1('0xce')]=function(_0x3195c2){const _0x52ad62=_0xa734c1,_0x552147=this[_0x52ad62('0x2b')]()[_0x52ad62('0xfa')];return _0x552147[_0x3195c2]||0x0;},Game_Battler[_0xa734c1('0x118')]['applyTimesStruck']=function(_0x162bad){const _0x52f079=_0xa734c1,_0x51241d=_0x162bad['item']();if(!_0x51241d)return;if(_0x162bad['isItem']())this[_0x52f079('0x3')]('Item',_0x51241d['id']);else{if(_0x162bad[_0x52f079('0xec')]()){if(_0x52f079('0x104')!=='CjPcR')this[_0x52f079('0x3')](_0x52f079('0x3f'),_0x51241d['id']),this[_0x52f079('0x3')](_0x52f079('0x109'),_0x51241d['stypeId']);else{function _0x31008f(){const _0x5b1273=_0x52f079;this[_0x5b1273('0x52')][_0x5b1273('0xa9')]>0x0?this['_data'][_0x5b1273('0x147')]=this[_0x5b1273('0xc6')]():this['_data']['jumpHeight']=0x0,this[_0x5b1273('0x13')]['y']=this[_0x5b1273('0x13')]['baseY']-this['_data']['jumpHeight'];}}}else return;}let _0x46532=[];if(Imported['VisuMZ_1_ElementStatusCore'])_0x46532=_0x162bad[_0x52f079('0x9d')]();else _0x162bad['item']()[_0x52f079('0x13c')][_0x52f079('0x68')]<0x0?_0x46532=_0x162bad[_0x52f079('0xf7')]()[_0x52f079('0xdf')]():_0x46532=[_0x162bad['item']()[_0x52f079('0x13c')][_0x52f079('0x68')]];while(_0x46532['length']>0x0){const _0x237e01=_0x46532['shift']();if(_0x237e01>0x0)this[_0x52f079('0x3')](_0x52f079('0x180'),_0x237e01);}},Game_Battler[_0xa734c1('0x118')][_0xa734c1('0x137')]=function(){const _0x38c37c=_0xa734c1,_0x3987db=this[_0x38c37c('0x2b')]();_0x3987db['deathTurn']=this['turnCount']();},VisuMZ[_0xa734c1('0x101')]['Game_BattlerBase_addNewState']=Game_BattlerBase['prototype'][_0xa734c1('0xc0')],Game_BattlerBase[_0xa734c1('0x118')]['addNewState']=function(_0x16e3c2){const _0x3cf227=_0xa734c1,_0x20acda=this[_0x3cf227('0x64')](_0x16e3c2);VisuMZ[_0x3cf227('0x101')][_0x3cf227('0x113')][_0x3cf227('0xe3')](this,_0x16e3c2),this[_0x3cf227('0x64')](_0x16e3c2)&&(this[_0x3cf227('0x3')](_0x3cf227('0x13d'),_0x16e3c2),!_0x20acda&&_0x16e3c2===this[_0x3cf227('0xd7')]()&&this[_0x3cf227('0x137')]());},VisuMZ['ExtraEnemyDrops'][_0xa734c1('0x107')]=Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0xf3')],Game_Enemy[_0xa734c1('0x118')]['makeDropItems']=function(){const _0x193738=_0xa734c1;let _0x1fe3e9=VisuMZ[_0x193738('0x101')][_0x193738('0x107')]['call'](this);return _0x1fe3e9=this[_0x193738('0x15d')](_0x1fe3e9),VisuMZ[_0x193738('0x101')][_0x193738('0x84')](_0x1fe3e9);},Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0x15d')]=function(_0x4ca321){const _0xc6673a=_0xa734c1;return _0x4ca321=this[_0xc6673a('0xd1')](_0x4ca321),_0x4ca321=this[_0xc6673a('0x110')](_0x4ca321),_0x4ca321=this[_0xc6673a('0x14c')](_0x4ca321),_0x4ca321=this['addExtraEnemyDropsJS'](_0x4ca321),_0x4ca321;},Game_Enemy['prototype'][_0xa734c1('0xd1')]=function(_0x33db80){const _0x3c8210=_0xa734c1,_0x5c4485=this[_0x3c8210('0xc2')]()['note'],_0x370ee4=this[_0x3c8210('0x71')](),_0x5ce12b=_0x5c4485['match'](/<(.*?) DROP[ ](.*):[ ](\d+)([%％])>/gi);if(_0x5ce12b){if(_0x3c8210('0xd8')!=='UredQ')for(const _0x56719b of _0x5ce12b){let _0x32ab6d=$dataItems,_0x121b2f=null,_0x5333dd=0x0;if(_0x56719b[_0x3c8210('0x161')](/<(.*?) DROP[ ](\d+):[ ](\d+)([%％])>/i))_0x32ab6d=VisuMZ['ExtraEnemyDrops'][_0x3c8210('0xfc')](RegExp['$1']),_0x121b2f=_0x32ab6d[Number(RegExp['$2'])],_0x5333dd=Number(RegExp['$3'])*0.01;else{if(_0x56719b[_0x3c8210('0x161')](/<(.*?) DROP[ ](.*):[ ](\d+)([%％])>/i)){if(_0x3c8210('0xad')==='nIWtZ')_0x121b2f=VisuMZ[_0x3c8210('0x101')][_0x3c8210('0x7d')](RegExp['$1'],RegExp['$2']),_0x5333dd=Number(RegExp['$3'])*0.01;else{function _0x1946a3(){const _0x55e587=_0x3c8210;_0x58cfca[_0x55e587('0x1f')][_0x55e587('0xb8')][_0x55e587('0xe3')](this,_0x1b06f6,_0xca6fb7,_0x594f6e);}}}}if(_0x121b2f&&Math[_0x3c8210('0x142')]()<_0x5333dd*_0x370ee4){if(_0x3c8210('0x8d')!==_0x3c8210('0x8d')){function _0x2576d9(){const _0x3bc430=_0x3c8210;let _0x1e82d1=null,_0x3d6b47=0x0;if(_0xd8bf4[_0x3bc430('0x161')](/(.*?)[ ](\d+):[ ](\d+)([%％])/i))_0x3eb3ed=_0x369a3e[_0x3bc430('0x101')]['getDatabase'](_0x5e7328['$1']),_0x1e82d1=_0x399242[_0x508e79(_0x3554d7['$2'])],_0x3d6b47=_0x300856(_0x23417e['$3'])*0.01;else _0x34b497['match'](/(.*?)[ ](.*):[ ](\d+)([%％])/i)&&(_0x1e82d1=_0x211679['ExtraEnemyDrops']['getDatabaseItem'](_0xecadbe['$1'],_0x3a6f12['$2']),_0x3d6b47=_0x268b6f(_0x257347['$3'])*0.01);_0x1e82d1&&_0x3ec51a[_0x3bc430('0x142')]()<_0x3d6b47*_0x2a4268&&_0x599c14[_0x3bc430('0x156')](_0x1e82d1);}}else _0x33db80[_0x3c8210('0x156')](_0x121b2f);}}else{function _0x323c02(){const _0xbdd52a=_0x3c8210,_0x554866=_0x127a5e(_0x39a841['$1']);_0x554866!==_0x42db27[_0x2ad198]['version']&&(_0x56c5f3(_0xbdd52a('0x3a')[_0xbdd52a('0x116')](_0x280d4e,_0x554866)),_0x591cbb[_0xbdd52a('0xc7')]());}}}return _0x33db80;},Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0x110')]=function(_0x30368b){const _0x25d128=_0xa734c1,_0x2d4fe3=this['enemy']()[_0x25d128('0x10b')],_0x2634f4=this[_0x25d128('0x71')]();if(_0x2d4fe3[_0x25d128('0x161')](/<(?:DROP|DROPS)>\s*([\s\S]*)\s*<\/(?:DROP|DROPS)>/i)){if('ZVmlu'!==_0x25d128('0x12f')){function _0x4dce9d(){const _0x3e4888=_0x25d128;_0x5c2f10=_0x680893['ExtraEnemyDrops'][_0x3e4888('0x7d')](_0x531b4c['$1'],_0x34f701['$2']),_0x2b8be1=_0x19ff74(_0x38d2b4['$3'])*0.01;}}else{const _0x32505c=String(RegExp['$1']),_0xe7d836=_0x32505c[_0x25d128('0x161')](/(.*?)[ ](.*):[ ](\d+)([%％])/gi);if(_0xe7d836){if(_0x25d128('0xcf')!==_0x25d128('0x17d')){let _0x4565d6=$dataItems;for(const _0x377bfc of _0xe7d836){let _0x484f99=null,_0x507e17=0x0;if(_0x377bfc[_0x25d128('0x161')](/(.*?)[ ](\d+):[ ](\d+)([%％])/i))_0x4565d6=VisuMZ[_0x25d128('0x101')][_0x25d128('0xfc')](RegExp['$1']),_0x484f99=_0x4565d6[Number(RegExp['$2'])],_0x507e17=Number(RegExp['$3'])*0.01;else _0x377bfc['match'](/(.*?)[ ](.*):[ ](\d+)([%％])/i)&&(_0x484f99=VisuMZ[_0x25d128('0x101')][_0x25d128('0x7d')](RegExp['$1'],RegExp['$2']),_0x507e17=Number(RegExp['$3'])*0.01);_0x484f99&&Math[_0x25d128('0x142')]()<_0x507e17*_0x2634f4&&_0x30368b[_0x25d128('0x156')](_0x484f99);}}else{function _0x428f9e(){const _0x340423=_0x25d128,_0x2ca10a=this['isAlive']();_0x502e0d[_0x340423('0x1f')][_0x340423('0x113')][_0x340423('0xe3')](this,_0x24d658);if(!_0x263dc5['VisuMZ_1_BattleCore'])return;if(!this[_0x340423('0x2')]())return;if(!_0x2d0124[_0x340423('0x76')]())return;const _0xb1da45=_0x31c4b5[_0x340423('0x16f')]['_spriteset'];if(!_0xb1da45)return;_0x2ca10a&&this[_0x340423('0xe9')]()&&_0xb1da45[_0x340423('0x16b')](this);}}}}}return _0x30368b;},VisuMZ[_0xa734c1('0x101')]['getDatabase']=function(_0x528b3f){const _0x3cdbb5=_0xa734c1;_0x528b3f=_0x528b3f[_0x3cdbb5('0x78')]()[_0x3cdbb5('0x6e')]();if(['I',_0x3cdbb5('0x5f'),_0x3cdbb5('0x7b')][_0x3cdbb5('0x174')](_0x528b3f))return $dataItems;if(['W',_0x3cdbb5('0xa4'),_0x3cdbb5('0x79')][_0x3cdbb5('0x174')](_0x528b3f))return $dataWeapons;if(['A',_0x3cdbb5('0xda'),_0x3cdbb5('0xa8')][_0x3cdbb5('0x174')](_0x528b3f))return $dataArmors;if(['S',_0x3cdbb5('0x175'),_0x3cdbb5('0xb7')][_0x3cdbb5('0x174')](_0x528b3f))return $dataSkills;if(['T',_0x3cdbb5('0x2e'),'STATES']['includes'](_0x528b3f))return $dataStates;return $dataItems;},VisuMZ['ExtraEnemyDrops'][_0xa734c1('0x7d')]=function(_0x4a2f23,_0x17cc1b){const _0x4167f7=_0xa734c1;_0x4a2f23=_0x4a2f23[_0x4167f7('0x78')]()[_0x4167f7('0x6e')]();if(['I',_0x4167f7('0x5f'),_0x4167f7('0x7b')][_0x4167f7('0x174')](_0x4a2f23))return $dataItems[DataManager[_0x4167f7('0x16a')](_0x17cc1b)];if(['W','WEAPON',_0x4167f7('0x79')][_0x4167f7('0x174')](_0x4a2f23)){if(_0x4167f7('0x5d')===_0x4167f7('0x20')){function _0x5b7922(){const _0x5d2d04=_0x4167f7;_0x5d5117=_0x445a12['subject']()[_0x5d2d04('0xdf')]();}}else return $dataWeapons[DataManager[_0x4167f7('0x11a')](_0x17cc1b)];}if(['A',_0x4167f7('0xda'),'ARMORS'][_0x4167f7('0x174')](_0x4a2f23)){if('viYME'!==_0x4167f7('0x10c')){function _0x2f90d8(){const _0xaab77c=_0x4167f7;_0x355dc3[_0xaab77c('0x4c')]=[],_0x30df2c[_0xaab77c('0x119')]=!![],_0x574c82['VisualDrops'][_0xaab77c('0x10e')][_0xaab77c('0xe3')](this);}}else return $dataArmors[DataManager['getArmorIdWithName'](_0x17cc1b)];}if(['S',_0x4167f7('0x175'),_0x4167f7('0xb7')][_0x4167f7('0x174')](_0x4a2f23))return $dataSkills[DataManager['getSkillIdWithName'](_0x17cc1b)];if(['T','STATE',_0x4167f7('0xe6')][_0x4167f7('0x174')](_0x4a2f23)){if('zTNoD'===_0x4167f7('0x13f'))return $dataStates[DataManager[_0x4167f7('0xb9')](_0x17cc1b)];else{function _0x3126d7(){const _0x151ff0=_0x4167f7,_0x5d2615=_0x5b05e1[_0x151ff0('0x101')]['getDatabase'](_0x6181e5),_0x19cc8b=_0x5d2615[_0x45ecff(_0x1a17f4)]||null;return _0x19cc8b?_0x5989e3[_0x151ff0('0xa2')](_0x19cc8b):0x0;}}}return null;},VisuMZ[_0xa734c1('0x101')][_0xa734c1('0x84')]=function(_0x4a0ddc){const _0x44f4ac=_0xa734c1;_0x4a0ddc[_0x44f4ac('0x170')]((_0x15e099,_0x10baf9)=>_0x15e099['id']-_0x10baf9['id']);const _0x5b4101=_0x4a0ddc['filter'](_0x33d0d7=>DataManager[_0x44f4ac('0x11e')](_0x33d0d7)),_0x3dcd09=_0x4a0ddc[_0x44f4ac('0x8')](_0x2ab675=>DataManager[_0x44f4ac('0x62')](_0x2ab675)),_0x235967=_0x4a0ddc[_0x44f4ac('0x8')](_0xb18d01=>DataManager[_0x44f4ac('0x3d')](_0xb18d01));let _0x5388b5=_0x5b4101[_0x44f4ac('0x49')](_0x3dcd09)[_0x44f4ac('0x49')](_0x235967);return _0x5388b5;},Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0xaa')]=function(_0x477127){const _0xbe92bd=_0xa734c1,_0x4592bd=this['enemy']()['id'];if(!VisuMZ[_0xbe92bd('0x101')]['JS'][_0x4592bd])return _0x477127;return VisuMZ[_0xbe92bd('0x101')]['JS'][_0x4592bd][_0xbe92bd('0xe3')](this,_0x477127);},Game_Enemy[_0xa734c1('0x118')]['addExtraEnemyDropsConditional']=function(_0x23d45c){const _0x193e0b=_0xa734c1,_0xdb6913=this[_0x193e0b('0xc2')]()[_0x193e0b('0x10b')][_0x193e0b('0xb5')](/[\r\n]+/);let _0x4784ce=null,_0x329ed4=0x0;for(const _0x2f5d3f of _0xdb6913){if(_0x193e0b('0xbe')===_0x193e0b('0xbe')){if(!_0x2f5d3f)continue;if(!_0x4784ce&&_0x2f5d3f[_0x193e0b('0x161')](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+) DROP>/i)){if('ZdGuq'===_0x193e0b('0x15c')){function _0x77fe2(){const _0xa83b46=_0x193e0b,_0x1344e7=this[_0xa83b46('0x2b')]()['timesStruckSkills'];return _0x1344e7[_0x333a4e]||0x0;}}else{const _0x6feb59=VisuMZ[_0x193e0b('0x101')][_0x193e0b('0xfc')](RegExp['$1']);_0x4784ce=_0x6feb59[Number(RegExp['$2'])]||null,_0x329ed4=0x0;}}else{if(!_0x4784ce&&_0x2f5d3f[_0x193e0b('0x161')](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (.*) DROP>/i))_0x4784ce=VisuMZ['ExtraEnemyDrops']['getDatabaseItem'](RegExp['$1'],RegExp['$2']),_0x329ed4=0x0;else{if(_0x4784ce&&_0x2f5d3f[_0x193e0b('0x161')](/<\/CONDITIONAL (.*) DROP>/i)){if(_0x193e0b('0x5')==='KdaCF'){function _0x3dc407(){const _0x1b2188=_0x193e0b;_0x198e5b=_0x26fe40[_0x1b2188('0x78')]()[_0x1b2188('0x6e')]();if(['I',_0x1b2188('0x5f'),'ITEMS']['includes'](_0x2d5e64))return _0x8dc608;if(['W',_0x1b2188('0xa4'),_0x1b2188('0x79')][_0x1b2188('0x174')](_0x4d6b7b))return _0x26534c;if(['A',_0x1b2188('0xda'),'ARMORS'][_0x1b2188('0x174')](_0x2a7033))return _0xf47160;if(['S',_0x1b2188('0x175'),'SKILLS'][_0x1b2188('0x174')](_0x368e6a))return _0x3b227;if(['T',_0x1b2188('0x2e'),_0x1b2188('0xe6')][_0x1b2188('0x174')](_0x1df9f6))return _0xaabf37;return _0xf7530b;}}else{if(Math['random']()<_0x329ed4)_0x23d45c[_0x193e0b('0x156')](_0x4784ce);_0x4784ce=null,_0x329ed4=0x0;}}else{if(_0x4784ce&&_0x2f5d3f['match'](/(.*):[ ]([\+\-]\d+)([%％])/i)){const _0x4dcded=String(RegExp['$1']),_0x4a1e37=Number(RegExp['$2'])*0.01;if(this[_0x193e0b('0x167')](_0x4dcded)){if(_0x193e0b('0xed')===_0x193e0b('0xed'))_0x329ed4+=_0x4a1e37;else{function _0xffabec(){const _0x2d325d=_0x193e0b;let _0x14d0ed=_0x44b6e0(_0x15f2c0['$1'])[_0x2d325d('0x24')]();const _0x4c1437=_0x512b7(_0x3fa8fc['$2']);_0x14d0ed=_0x14d0ed[_0x2d325d('0x6b')](0x0)['toUpperCase']()+_0x14d0ed[_0x2d325d('0x89')](0x1);if(_0x14d0ed[_0x2d325d('0x161')](/STYPE/i))_0x14d0ed='SType';const _0x54e381=this['getConditionalDropsTrackedData']();if(_0x14d0ed===_0x2d325d('0x111')&&_0x54e381[_0x2d325d('0x73')]!==_0x2d325d('0x111'))return![];if(_0x14d0ed==='Skill'&&_0x54e381['lastStruckType']!=='Skill')return![];if(_0x14d0ed===_0x2d325d('0x109')&&_0x54e381[_0x2d325d('0x73')]!==_0x2d325d('0x3f'))return![];const _0x89f65e='lastStruck%1'[_0x2d325d('0x116')](_0x14d0ed);return _0x54e381[_0x89f65e]===_0x4c1437;}}}}}}}}else{function _0x29652e(){const _0x4aa01c=_0x193e0b;this[_0x4aa01c('0x52')][_0x4aa01c('0xa9')]>0x0?this[_0x4aa01c('0x13')][_0x4aa01c('0x6')]-=this[_0x4aa01c('0xf9')]():this[_0x4aa01c('0x13')][_0x4aa01c('0x6')]=0x0;}}}return _0x23d45c;},Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0x167')]=function(_0x4ec47d){const _0x284fe1=_0xa734c1;if(_0x4ec47d[_0x284fe1('0x161')](/\bALWAYS\b/i))return!![];else{if(_0x4ec47d[_0x284fe1('0x161')](/\bRANDOM[ ](\d+)([%％])\b/i)){const _0x5ef4c5=Number(RegExp['$1'])*0.01;return Math[_0x284fe1('0x142')]()<_0x5ef4c5;}else{if(_0x4ec47d[_0x284fe1('0x161')](/\bLAST (?:STRIKE|STRUCK)[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](\d+)\b/i)){if('Uqole'===_0x284fe1('0x19')){let _0x2604f0=String(RegExp['$1'])[_0x284fe1('0x24')]();const _0x27d178=Number(RegExp['$2']);_0x2604f0=_0x2604f0['charAt'](0x0)[_0x284fe1('0x78')]()+_0x2604f0[_0x284fe1('0x89')](0x1);if(_0x2604f0['match'](/STYPE/i))_0x2604f0='SType';const _0x39a31b=this[_0x284fe1('0x2b')]();if(_0x2604f0===_0x284fe1('0x111')&&_0x39a31b[_0x284fe1('0x73')]!==_0x284fe1('0x111'))return![];if(_0x2604f0==='Skill'&&_0x39a31b['lastStruckType']!=='Skill')return![];if(_0x2604f0===_0x284fe1('0x109')&&_0x39a31b[_0x284fe1('0x73')]!==_0x284fe1('0x3f'))return![];const _0x2e40a9=_0x284fe1('0xfd')[_0x284fe1('0x116')](_0x2604f0);return _0x39a31b[_0x2e40a9]===_0x27d178;}else{function _0x3dff70(){const _0x59dc48=_0x284fe1,_0x52ecc0=this[_0x59dc48('0x2b')]();_0x1cb980=_0x44d6f8||0x1;const _0x5eb757='timesStruck%1s'[_0x59dc48('0x116')](_0x47efde);if(!_0x52ecc0[_0x5eb757])return;_0x52ecc0[_0x5eb757][_0x2d1c11]=_0x52ecc0[_0x5eb757][_0x5cbb91]||0x0,_0x52ecc0[_0x5eb757][_0x3c8354]+=_0x29dcd0;const _0x14b316=_0x59dc48('0xfd')['format'](_0x381294);_0x52ecc0[_0x14b316]=_0x1c3560,[_0x59dc48('0x111'),_0x59dc48('0x3f')][_0x59dc48('0x174')](_0x1e3836)&&(_0x52ecc0['lastStruckType']=_0x322491);}}}else{if(_0x4ec47d[_0x284fe1('0x161')](/\bLAST (?:STRIKE|STRUCK)[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](.*)\b/i)){if(_0x284fe1('0x67')!==_0x284fe1('0x14f')){let _0x329976=String(RegExp['$1'])[_0x284fe1('0x24')]();const _0x5159f2=String(RegExp['$2']),_0x33f528=this['getConditionalDropsTrackedData']();let _0x2d186f=0x0;switch(_0x329976[_0x284fe1('0x78')]()['trim']()){case _0x284fe1('0x115'):_0x2d186f=DataManager[_0x284fe1('0x178')](_0x5159f2);return _0x33f528[_0x284fe1('0x145')]===_0x2d186f;case'ITEM':if(_0x33f528[_0x284fe1('0x73')]!==_0x284fe1('0x111'))return![];_0x2d186f=DataManager[_0x284fe1('0x16a')](_0x5159f2);return _0x33f528['lastStruckItem']===_0x2d186f;case _0x284fe1('0x175'):if(_0x33f528['lastStruckType']!=='Skill')return![];_0x2d186f=DataManager[_0x284fe1('0x17f')](_0x5159f2);return _0x33f528[_0x284fe1('0xe')]===_0x2d186f;case _0x284fe1('0x103'):if(_0x33f528[_0x284fe1('0x73')]!=='Skill')return![];_0x2d186f=DataManager[_0x284fe1('0x108')](_0x5159f2);return _0x33f528[_0x284fe1('0x10')]===_0x2d186f;case _0x284fe1('0x2e'):_0x2d186f=DataManager['getStateIdWithName'](_0x5159f2);return _0x33f528[_0x284fe1('0x166')]===_0x2d186f;default:return![];}}else{function _0x3b1217(){const _0x3b10f7=_0x284fe1;this[_0x3b10f7('0x4a')](...arguments);}}}else{let _0x307b43=VisuMZ['ExtraEnemyDrops'][_0x284fe1('0x17')](this,_0x4ec47d);try{return eval(_0x307b43);}catch(_0x23a716){return![];}}}}}},VisuMZ[_0xa734c1('0x101')][_0xa734c1('0x17')]=function(_0x11a5b9,_0x29d2f1){const _0x2912f0=_0xa734c1;while(_0x29d2f1[_0x2912f0('0x161')](/\b\\V\[(\d+)\]\b/gi)){_0x29d2f1=_0x29d2f1['replace'](/\b\\V\[(\d+)\]\b/gi,(_0x221f21,_0x214cea)=>$gameVariables[_0x2912f0('0x106')](parseInt(_0x214cea)));}while(_0x29d2f1[_0x2912f0('0x161')](/\bVARIABLE (\d+)\b/gi)){if('HdeXK'===_0x2912f0('0x25')){function _0x46884e(){const _0x5b4557=_0x2912f0;_0x4be760=_0x1dd543[_0x5b4557('0x49')](_0x1ce7b[_0x5b4557('0x1f')]['getItemDropIcons'](_0x16894d));}}else _0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bVARIABLE (\d+)\b/gi,(_0x35eb2a,_0x5359c6)=>$gameVariables['value'](parseInt(_0x5359c6)));}return _0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\\S\[(\d+)\] ON/gi,(_0x35722c,_0xd630c5)=>String($gameSwitches['value'](parseInt(_0xd630c5))===!![])),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\\S\[(\d+)\] OFF/gi,(_0x882022,_0x21da00)=>String($gameSwitches['value'](parseInt(_0x21da00))===![])),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\\S\[(\d+)\]/gi,(_0x441c18,_0x14c304)=>String($gameSwitches[_0x2912f0('0x106')](parseInt(_0x14c304)))),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/SWITCH (\d+) ON/gi,(_0xc4e10,_0x34a9be)=>String($gameSwitches[_0x2912f0('0x106')](parseInt(_0x34a9be))===!![])),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/SWITCH (\d+) OFF/gi,(_0xc64234,_0x447b23)=>String($gameSwitches[_0x2912f0('0x106')](parseInt(_0x447b23))===![])),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/SWITCH (\d+)/gi,(_0x134b55,_0x113e22)=>String($gameSwitches['value'](parseInt(_0x113e22)))),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bON\b/gi,_0x2912f0('0x184')),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bOFF\b/gi,_0x2912f0('0x27')),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bTRUE\b/gi,_0x2912f0('0x184')),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bFALSE\b/gi,'false'),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\b(ITEM|WEAPON|ARMOR)[ ](\d+)[ ]COUNT\b/gi,(_0x30714d,_0x5a5618,_0x67f334)=>{const _0x3dc383=_0x2912f0;if('yKInF'!==_0x3dc383('0x123')){function _0x512b92(){_0x50917a*=_0x33244f(_0x406822['$1'])/0x64;}}else{const _0x37ad60=VisuMZ[_0x3dc383('0x101')][_0x3dc383('0xfc')](_0x5a5618),_0x16ff5d=_0x37ad60[Number(_0x67f334)]||null;return _0x16ff5d?$gameParty[_0x3dc383('0xa2')](_0x16ff5d):0x0;}}),_0x29d2f1=_0x29d2f1['replace'](/\b(ITEM|WEAPON|ARMOR)[ ](.*)[ ]COUNT\b/gi,(_0x305d81,_0x4edf19,_0x24cdbe)=>{const _0x405af9=_0x2912f0;if(_0x405af9('0x140')!==_0x405af9('0x158')){const _0x138b38=VisuMZ[_0x405af9('0x101')][_0x405af9('0x7d')](_0x4edf19,_0x24cdbe);return _0x138b38?$gameParty[_0x405af9('0xa2')](_0x138b38):0x0;}else{function _0x9a382e(){const _0x15a357=_0x405af9;_0xd6c75e['sort']((_0x241030,_0x4b46cb)=>_0x241030['id']-_0x4b46cb['id']);const _0x3df1e5=_0x5d9b9a[_0x15a357('0x8')](_0x1a96ef=>_0x4b4b36[_0x15a357('0x11e')](_0x1a96ef)),_0x3636ab=_0x340b03[_0x15a357('0x8')](_0x3bcf9b=>_0x5bdb44[_0x15a357('0x62')](_0x3bcf9b)),_0x3df1b6=_0x2607ce[_0x15a357('0x8')](_0x371bb7=>_0x28453a[_0x15a357('0x3d')](_0x371bb7));let _0x3d0b38=_0x3df1e5['concat'](_0x3636ab)[_0x15a357('0x49')](_0x3df1b6);return _0x3d0b38;}}}),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bTIMES[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](\d+)[ ](?:STRIKE|STRUCK)\b/gi,(_0x3fb22a,_0x4f9e7f,_0x38cadd)=>{const _0x49d6d6=_0x2912f0;if(_0x49d6d6('0x1c')===_0x49d6d6('0x1c')){let _0x109c47=_0x4f9e7f;const _0x4635ba=_0x38cadd;_0x109c47=_0x109c47[_0x49d6d6('0x6b')](0x0)[_0x49d6d6('0x78')]()+_0x109c47[_0x49d6d6('0x89')](0x1);if(_0x109c47[_0x49d6d6('0x161')](/STYPE/i))_0x109c47=_0x49d6d6('0x109');const _0x50567d=_0x49d6d6('0xf1')[_0x49d6d6('0x116')](_0x109c47);if(_0x11a5b9[_0x50567d])return _0x11a5b9[_0x50567d](_0x4635ba);return 0x0;}else{function _0x4e71b9(){const _0x30d81b=_0x49d6d6;_0x399407[_0x30d81b('0x156')](_0x12fb12(_0xf5071c['$1'])||0x0);}}}),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bTIMES[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](.*)[ ](?:STRIKE|STRUCK)\b/gi,(_0x2d48ab,_0x2b9d2c,_0x2c1af0)=>{const _0x3d93e7=_0x2912f0;if(_0x3d93e7('0x36')==='ojAkO'){function _0x92a5f2(){const _0x2092e4=_0x3d93e7;if(this[_0x2092e4('0x60')]===_0xf6d290)this[_0x2092e4('0x9a')]();if(this[_0x2092e4('0x41')]===_0x4cb3a9)this[_0x2092e4('0x1a')]();let _0x586e60=this[_0x2092e4('0x60')][_0x2092e4('0x95')]===_0x57c144?_0x135a8f[_0x2092e4('0x101')][_0x2092e4('0x0')][_0x2092e4('0xe3')](this):this[_0x2092e4('0x60')][_0x2092e4('0x95')];return _0x586e60[_0x2092e4('0x49')](this['_bonusRewards'][_0x2092e4('0x95')]);}}else{let _0x2c87d8=_0x2b9d2c;const _0x287d22=_0x2c1af0;let _0x5084e8=0x0;switch(_0x2c87d8[_0x3d93e7('0x78')]()[_0x3d93e7('0x6e')]()){case _0x3d93e7('0x115'):_0x5084e8=DataManager['getElementIdWithName'](_0x287d22);break;case _0x3d93e7('0x5f'):_0x5084e8=DataManager[_0x3d93e7('0x16a')](_0x287d22);break;case _0x3d93e7('0x175'):_0x5084e8=DataManager[_0x3d93e7('0x17f')](_0x287d22);break;case _0x3d93e7('0x103'):_0x5084e8=DataManager['getStypeIdWithName'](_0x287d22);break;case _0x3d93e7('0x2e'):_0x5084e8=DataManager[_0x3d93e7('0xb9')](_0x287d22);break;default:return 0x0;}_0x2c87d8=_0x2c87d8['charAt'](0x0)[_0x3d93e7('0x78')]()+_0x2c87d8['slice'](0x1);if(_0x2c87d8[_0x3d93e7('0x161')](/STYPE/i))_0x2c87d8=_0x3d93e7('0x109');const _0x5320af=_0x3d93e7('0xf1')[_0x3d93e7('0x116')](_0x2c87d8);if(_0x11a5b9[_0x5320af])return _0x11a5b9[_0x5320af](_0x5084e8);return 0x0;}}),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bALIVE MEMBERS\b/gi,$gameParty[_0x2912f0('0x8f')]()[_0x2912f0('0x28')]),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bBATTLE MEMBERS\b/gi,$gameParty[_0x2912f0('0x13a')]()[_0x2912f0('0x28')]),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bBATTLE TURNS\b/gi,$gameTroop[_0x2912f0('0x131')]()),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bDEAD MEMBERS\b/gi,$gameParty[_0x2912f0('0x5b')]()[_0x2912f0('0x28')]),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bDEATH TURN\b/gi,_0x11a5b9[_0x2912f0('0xcc')]()||0x1),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bENEMY LEVEL\b/gi,_0x11a5b9[_0x2912f0('0x85')]||0x1),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bPARTY GOLD\b/gi,$gameParty[_0x2912f0('0x165')]()),_0x29d2f1=_0x29d2f1[_0x2912f0('0x171')](/\bPARTY MEMBERS\b/gi,$gameParty[_0x2912f0('0x16e')]()[_0x2912f0('0x28')]),_0x29d2f1;},VisuMZ[_0xa734c1('0x101')]['Game_Troop_clear']=Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x32')],Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x32')]=function(){const _0x437d14=_0xa734c1;VisuMZ[_0x437d14('0x101')][_0x437d14('0x96')]['call'](this),this['clearForcedRewards'](),this['clearBonusRewards']();},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x9a')]=function(){const _0x28927f=_0xa734c1;this[_0x28927f('0x60')]={'exp':undefined,'gold':undefined,'drops':undefined};},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x1a')]=function(){const _0x1a8bf4=_0xa734c1;this[_0x1a8bf4('0x41')]={'exp':0x0,'gold':0x0,'drops':[]};},VisuMZ[_0xa734c1('0x101')]['Game_Troop_expTotal']=Game_Troop['prototype']['expTotal'],Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x159')]=function(){const _0x47aab0=_0xa734c1;if(this[_0x47aab0('0x60')]===undefined)this['clearForcedRewards']();if(this[_0x47aab0('0x41')]===undefined)this[_0x47aab0('0x1a')]();let _0x55ed61=this['_forcedRewards'][_0x47aab0('0x75')]===undefined?VisuMZ['ExtraEnemyDrops']['Game_Troop_expTotal'][_0x47aab0('0xe3')](this):this[_0x47aab0('0x60')][_0x47aab0('0x75')];return Math[_0x47aab0('0x50')](Math[_0x47aab0('0x4e')](_0x55ed61+(this[_0x47aab0('0x41')][_0x47aab0('0x75')]||0x0),0x0));},VisuMZ['ExtraEnemyDrops'][_0xa734c1('0x182')]=Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x69')],Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x69')]=function(){const _0x226b27=_0xa734c1;if(this[_0x226b27('0x60')]===undefined)this['clearForcedRewards']();if(this[_0x226b27('0x41')]===undefined)this[_0x226b27('0x1a')]();let _0xb545df=this['_forcedRewards']['gold']===undefined?VisuMZ['ExtraEnemyDrops'][_0x226b27('0x182')][_0x226b27('0xe3')](this):this[_0x226b27('0x60')]['gold']*this[_0x226b27('0xe5')]();return Math[_0x226b27('0x50')](Math[_0x226b27('0x4e')](_0xb545df+(this[_0x226b27('0x41')][_0x226b27('0x165')]||0x0)*this[_0x226b27('0xe5')](),0x0));},VisuMZ['ExtraEnemyDrops'][_0xa734c1('0x0')]=Game_Troop['prototype'][_0xa734c1('0xf3')],Game_Troop[_0xa734c1('0x118')]['makeDropItems']=function(){const _0x1fd0b9=_0xa734c1;if(this[_0x1fd0b9('0x60')]===undefined)this[_0x1fd0b9('0x9a')]();if(this[_0x1fd0b9('0x41')]===undefined)this[_0x1fd0b9('0x1a')]();let _0x133d78=this[_0x1fd0b9('0x60')][_0x1fd0b9('0x95')]===undefined?VisuMZ['ExtraEnemyDrops'][_0x1fd0b9('0x0')][_0x1fd0b9('0xe3')](this):this[_0x1fd0b9('0x60')][_0x1fd0b9('0x95')];return _0x133d78[_0x1fd0b9('0x49')](this[_0x1fd0b9('0x41')]['drops']);},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x8b')]=function(_0x366a89){const _0x95c3c2=_0xa734c1;if(this[_0x95c3c2('0x60')]===undefined)this[_0x95c3c2('0x9a')]();if(this['_bonusRewards']===undefined)this[_0x95c3c2('0x1a')]();this[_0x95c3c2('0x60')][_0x95c3c2('0x75')]=Math[_0x95c3c2('0x4e')](0x0,Math[_0x95c3c2('0x50')](_0x366a89));},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x86')]=function(_0x18b16e){const _0x5cc9d4=_0xa734c1;if(this[_0x5cc9d4('0x60')]===undefined)this[_0x5cc9d4('0x9a')]();if(this['_bonusRewards']===undefined)this[_0x5cc9d4('0x1a')]();this[_0x5cc9d4('0x41')][_0x5cc9d4('0x75')]=Math[_0x5cc9d4('0x4e')](0x0,Math[_0x5cc9d4('0x50')](_0x18b16e));},Game_Troop['prototype'][_0xa734c1('0x51')]=function(_0x2a58d0){const _0x9b11a2=_0xa734c1;if(this[_0x9b11a2('0x60')]===undefined)this[_0x9b11a2('0x9a')]();if(this['_bonusRewards']===undefined)this[_0x9b11a2('0x1a')]();this[_0x9b11a2('0x60')][_0x9b11a2('0x165')]=Math['max'](0x0,Math[_0x9b11a2('0x50')](_0x2a58d0));},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x141')]=function(_0x34cca7){const _0x269053=_0xa734c1;if(this[_0x269053('0x60')]===undefined)this[_0x269053('0x9a')]();if(this['_bonusRewards']===undefined)this[_0x269053('0x1a')]();this[_0x269053('0x41')][_0x269053('0x165')]=Math[_0x269053('0x4e')](0x0,Math['round'](_0x34cca7));},Game_Troop[_0xa734c1('0x118')]['addForcedItemDrop']=function(_0x862bad,_0x1eed57){const _0x463185=_0xa734c1;if(this[_0x463185('0x60')]===undefined)this[_0x463185('0x9a')]();if(this[_0x463185('0x41')]===undefined)this['clearBonusRewards']();_0x1eed57=_0x1eed57||0x1,this['_forcedRewards'][_0x463185('0x95')]=this['_forcedRewards'][_0x463185('0x95')]||[];while(_0x1eed57--){const _0x293709=$dataItems[_0x862bad];if(_0x293709)this[_0x463185('0x60')][_0x463185('0x95')][_0x463185('0x156')](_0x293709);}},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x56')]=function(_0x196819,_0x5c8a35){const _0x5a986e=_0xa734c1;if(this[_0x5a986e('0x60')]===undefined)this['clearForcedRewards']();if(this[_0x5a986e('0x41')]===undefined)this[_0x5a986e('0x1a')]();_0x5c8a35=_0x5c8a35||0x1,this['_forcedRewards']['drops']=this[_0x5a986e('0x60')][_0x5a986e('0x95')]||[];while(_0x5c8a35--){const _0x1e437f=$dataWeapons[_0x196819];if(_0x1e437f)this[_0x5a986e('0x60')][_0x5a986e('0x95')][_0x5a986e('0x156')](_0x1e437f);}},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0xd9')]=function(_0x1f43c4,_0x462c75){const _0x1fdb8c=_0xa734c1;if(this['_forcedRewards']===undefined)this['clearForcedRewards']();if(this[_0x1fdb8c('0x41')]===undefined)this[_0x1fdb8c('0x1a')]();_0x462c75=_0x462c75||0x1,this[_0x1fdb8c('0x60')][_0x1fdb8c('0x95')]=this['_forcedRewards']['drops']||[];while(_0x462c75--){if('wpiLb'===_0x1fdb8c('0x15b')){const _0x4335cc=$dataArmors[_0x1f43c4];if(_0x4335cc)this[_0x1fdb8c('0x60')]['drops'][_0x1fdb8c('0x156')](_0x4335cc);}else{function _0x1cb85a(){const _0x199f06=_0x1fdb8c;_0x3d579b[_0x199f06('0x16b')](this);}}}},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0x30')]=function(_0x38c586,_0x2ef1ce){const _0x64251a=_0xa734c1;if(this[_0x64251a('0x60')]===undefined)this[_0x64251a('0x9a')]();if(this['_bonusRewards']===undefined)this[_0x64251a('0x1a')]();_0x2ef1ce=_0x2ef1ce||0x1;while(_0x2ef1ce--){if(_0x64251a('0x9b')===_0x64251a('0xf')){function _0x1500eb(){const _0x19feda=_0x64251a,_0x197a4b=_0x41f014(_0x331ea5['$1'])[_0x19feda('0x114')](0x0,0xa);_0x11cfae[_0x19feda('0x156')](_0x10d500[_0x19feda('0x34')[_0x19feda('0x116')](_0x197a4b)]||[0x0,0x0,0x0,0x0]),_0x47868d['push'](_0x58fbb3['Duration%1'[_0x19feda('0x116')](_0x197a4b)]||0xb4),_0x1ae0e8[_0x19feda('0x156')](_0x3ab393['Flags%1'['format'](_0x197a4b)]||[]);}}else{const _0xa718e=$dataItems[_0x38c586];if(_0xa718e)this[_0x64251a('0x41')]['drops']['push'](_0xa718e);}}},Game_Troop['prototype'][_0xa734c1('0x168')]=function(_0x1c9d20,_0x3caa2a){const _0x4be83c=_0xa734c1;if(this[_0x4be83c('0x60')]===undefined)this[_0x4be83c('0x9a')]();if(this['_bonusRewards']===undefined)this[_0x4be83c('0x1a')]();_0x3caa2a=_0x3caa2a||0x1;while(_0x3caa2a--){const _0x5a8ed2=$dataWeapons[_0x1c9d20];if(_0x5a8ed2)this['_bonusRewards'][_0x4be83c('0x95')][_0x4be83c('0x156')](_0x5a8ed2);}},Game_Troop[_0xa734c1('0x118')][_0xa734c1('0xa5')]=function(_0x2e4501,_0x2ecb16){const _0x5c8fab=_0xa734c1;if(this[_0x5c8fab('0x60')]===undefined)this['clearForcedRewards']();if(this[_0x5c8fab('0x41')]===undefined)this[_0x5c8fab('0x1a')]();_0x2ecb16=_0x2ecb16||0x1;while(_0x2ecb16--){if(_0x5c8fab('0x172')===_0x5c8fab('0x172')){const _0x226c96=$dataArmors[_0x2e4501];if(_0x226c96)this[_0x5c8fab('0x41')][_0x5c8fab('0x95')]['push'](_0x226c96);}else{function _0x26b2b6(){const _0x1c7e13=_0x5c8fab;if(this['_forcedRewards']===_0xaff364)this[_0x1c7e13('0x9a')]();if(this[_0x1c7e13('0x41')]===_0x24ea69)this['clearBonusRewards']();let _0x14c37c=this[_0x1c7e13('0x60')][_0x1c7e13('0x75')]===_0x49abdd?_0x362c7a[_0x1c7e13('0x101')][_0x1c7e13('0xc5')][_0x1c7e13('0xe3')](this):this[_0x1c7e13('0x60')][_0x1c7e13('0x75')];return _0x257023['round'](_0x193e96[_0x1c7e13('0x4e')](_0x14c37c+(this[_0x1c7e13('0x41')][_0x1c7e13('0x75')]||0x0),0x0));}}}},Game_Troop[_0xa734c1('0x118')]['hasForcedDrops']=function(){const _0x33cd1a=_0xa734c1;if(this['_forcedRewards']===undefined)this['clearForcedRewards']();return this[_0x33cd1a('0x60')][_0x33cd1a('0x95')]!==undefined;};if(Imported[_0xa734c1('0x7')]&&VisuMZ[_0xa734c1('0x101')][_0xa734c1('0x58')][_0xa734c1('0xd4')]['Enable']){VisuMZ['VisualDrops']=VisuMZ[_0xa734c1('0x1f')]||{},VisuMZ['VisualDrops'][_0xa734c1('0x10e')]=BattleManager[_0xa734c1('0x102')],BattleManager['initMembers']=function(){const _0x1fe720=_0xa734c1;$gameTemp[_0x1fe720('0x4c')]=[],BattleManager[_0x1fe720('0x119')]=!![],VisuMZ['VisualDrops'][_0x1fe720('0x10e')][_0x1fe720('0xe3')](this);},VisuMZ[_0xa734c1('0x1f')][_0xa734c1('0x113')]=Game_BattlerBase[_0xa734c1('0x118')][_0xa734c1('0xc0')],Game_BattlerBase[_0xa734c1('0x118')][_0xa734c1('0xc0')]=function(_0x8f9f10){const _0x588835=_0xa734c1,_0x21e743=this[_0x588835('0x14a')]();VisuMZ[_0x588835('0x1f')][_0x588835('0x113')][_0x588835('0xe3')](this,_0x8f9f10);if(!Imported[_0x588835('0x7')])return;if(!this[_0x588835('0x2')]())return;if(!SceneManager[_0x588835('0x76')]())return;const _0x136ca6=SceneManager['_scene'][_0x588835('0x139')];if(!_0x136ca6)return;if(_0x21e743&&this[_0x588835('0xe9')]()){if(_0x588835('0x15a')!==_0x588835('0x15a')){function _0x446e3b(){const _0x5e0d46=_0x588835;_0x56bc3f?(this['_data']=_0x40eaee,this[_0x5e0d46('0xab')]=this[_0x5e0d46('0x52')]['baseX'],this['_baseY']=this[_0x5e0d46('0x52')][_0x5e0d46('0x7c')]):this[_0x5e0d46('0x52')]=this[_0x5e0d46('0x157')](_0x4d06d8,_0x366b39),_0x106b8d[_0x5e0d46('0x118')][_0x5e0d46('0x4a')][_0x5e0d46('0xe3')](this),this[_0x5e0d46('0x152')]();}}else _0x136ca6[_0x588835('0x16b')](this);}},VisuMZ[_0xa734c1('0x1f')][_0xa734c1('0x87')]=Game_BattlerBase['prototype'][_0xa734c1('0x18')],Game_BattlerBase[_0xa734c1('0x118')][_0xa734c1('0x18')]=function(_0xf0ad02){const _0x3ab6fd=_0xa734c1,_0x4bf2cd=this[_0x3ab6fd('0xe9')]();VisuMZ[_0x3ab6fd('0x1f')]['Game_BattlerBase_eraseState'][_0x3ab6fd('0xe3')](this,_0xf0ad02);if(!Imported[_0x3ab6fd('0x7')])return;if(!this[_0x3ab6fd('0x2')]())return;if(!SceneManager['isSceneBattle']())return;const _0x10d4e6=SceneManager[_0x3ab6fd('0x16f')]['_spriteset'];if(!_0x10d4e6)return;if(_0x4bf2cd&&this[_0x3ab6fd('0x14a')]()){_0x10d4e6[_0x3ab6fd('0xf2')](this);if(VisuMZ[_0x3ab6fd('0x101')][_0x3ab6fd('0x58')][_0x3ab6fd('0xd4')]['resetOnRevive'])this[_0x3ab6fd('0x143')]();}},VisuMZ[_0xa734c1('0x1f')]['Game_Enemy_setup']=Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0x26')],Game_Enemy[_0xa734c1('0x118')]['setup']=function(_0x2b6528,_0x10bf01,_0x3f7221){const _0x2b0f2f=_0xa734c1;VisuMZ[_0x2b0f2f('0x1f')][_0x2b0f2f('0xb8')][_0x2b0f2f('0xe3')](this,_0x2b6528,_0x10bf01,_0x3f7221);},Game_Enemy[_0xa734c1('0x118')]['resetVisualDrops']=function(){const _0x5d1366=_0xa734c1;this[_0x5d1366('0x121')]={};},VisuMZ['VisualDrops'][_0xa734c1('0x126')]=Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0x75')],Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0x75')]=function(){const _0x33e47c=_0xa734c1;this[_0x33e47c('0x121')]=this['_visualDrops']||{};if(this[_0x33e47c('0x121')]['exp']!==undefined)return this[_0x33e47c('0x121')]['exp'];return this[_0x33e47c('0x121')][_0x33e47c('0x75')]=VisuMZ['VisualDrops'][_0x33e47c('0x126')][_0x33e47c('0xe3')](this),this[_0x33e47c('0x121')][_0x33e47c('0x75')];},VisuMZ[_0xa734c1('0x1f')][_0xa734c1('0x77')]=Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0x165')],Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0x165')]=function(){const _0x42d72b=_0xa734c1;this[_0x42d72b('0x121')]=this[_0x42d72b('0x121')]||{};if(this[_0x42d72b('0x121')][_0x42d72b('0x165')]!==undefined)return this['_visualDrops'][_0x42d72b('0x165')];return this[_0x42d72b('0x121')]['gold']=VisuMZ['VisualDrops'][_0x42d72b('0x77')][_0x42d72b('0xe3')](this),this['_visualDrops']['gold'];},VisuMZ[_0xa734c1('0x1f')]['Game_Enemy_makeDropItems']=Game_Enemy['prototype'][_0xa734c1('0xf3')],Game_Enemy[_0xa734c1('0x118')][_0xa734c1('0xf3')]=function(){const _0xecfa2c=_0xa734c1;this[_0xecfa2c('0x121')]=this[_0xecfa2c('0x121')]||{};if(this['_visualDrops'][_0xecfa2c('0x95')]!==undefined)return this[_0xecfa2c('0x121')][_0xecfa2c('0x95')];return this[_0xecfa2c('0x121')]['drops']=VisuMZ['VisualDrops'][_0xecfa2c('0x107')][_0xecfa2c('0xe3')](this),this['_visualDrops'][_0xecfa2c('0x95')];},Spriteset_Battle['prototype']['removeVisualDrops']=function(_0x1f98e1){const _0x131973=_0xa734c1;if(!_0x1f98e1)return;$gameTemp[_0x131973('0x4c')]=$gameTemp['_visualDropSprites']||[];const _0x592b18=[];for(const _0x2054c4 of $gameTemp[_0x131973('0x4c')]){if(!_0x2054c4)continue;if(_0x2054c4[_0x131973('0xc2')]!==_0x1f98e1)continue;const _0xfc04e3=this[_0x131973('0x63')](_0x2054c4);if(!_0xfc04e3)continue;_0xfc04e3['startFadeOut'](),_0x592b18[_0x131973('0x156')](_0x2054c4);}for(const _0x5a927b of _0x592b18){$gameTemp[_0x131973('0x4c')]['remove'](_0x5a927b);}},Spriteset_Battle['prototype'][_0xa734c1('0x63')]=function(_0x5f52c6){const _0x4b02fd=_0xa734c1;return this[_0x4b02fd('0xe2')][_0x4b02fd('0xa')][_0x4b02fd('0x128')](_0x5b9c3b=>_0x5b9c3b[_0x4b02fd('0x52')]===_0x5f52c6);},Spriteset_Battle['prototype']['createVisualDrops']=function(_0x30c4c2){const _0x1e781b=_0xa734c1,_0x4dfa59=VisuMZ[_0x1e781b('0x101')][_0x1e781b('0x58')];if(!_0x30c4c2)return;let _0x59da72=[];_0x4dfa59[_0x1e781b('0x80')][_0x1e781b('0x183')]&&_0x59da72['push'](VisuMZ['VisualDrops'][_0x1e781b('0x8e')](_0x30c4c2,_0x1e781b('0x80')));_0x4dfa59[_0x1e781b('0x74')][_0x1e781b('0x183')]&&_0x59da72[_0x1e781b('0x156')](VisuMZ['VisualDrops'][_0x1e781b('0x8e')](_0x30c4c2,'Gold'));_0x4dfa59[_0x1e781b('0x13e')][_0x1e781b('0x183')]&&(_0x59da72=_0x59da72['concat'](VisuMZ[_0x1e781b('0x1f')][_0x1e781b('0x92')](_0x30c4c2)));const _0x31b5f3=VisuMZ[_0x1e781b('0x1f')][_0x1e781b('0x129')](_0x30c4c2,_0x59da72);$gameTemp[_0x1e781b('0x4c')]=$gameTemp['_visualDropSprites']||[];let _0x151704=0x0;for(const _0x1f3109 of _0x31b5f3){if(!_0x1f3109)continue;$gameTemp[_0x1e781b('0x4c')][_0x1e781b('0x156')](_0x1f3109['_data']),setTimeout(this['addVisualDrops'][_0x1e781b('0xd6')](this,_0x1f3109),_0x151704),_0x151704+=_0x4dfa59[_0x1e781b('0xd4')][_0x1e781b('0x2a')];}},Spriteset_Battle[_0xa734c1('0x118')]['addVisualDrops']=function(_0x4f98c7){const _0x381411=_0xa734c1;if(!SceneManager['isSceneBattle']())return;this[_0x381411('0xe2')][_0x381411('0x93')](_0x4f98c7),_0x4f98c7[_0x381411('0x66')]();},VisuMZ[_0xa734c1('0x1f')][_0xa734c1('0x8e')]=function(_0x4bedab,_0x10ceb6){const _0x31a7f2=_0xa734c1;if(!_0x4bedab)return 0x0;const _0x977146=VisuMZ[_0x31a7f2('0x101')][_0x31a7f2('0x58')][_0x10ceb6],_0x380968=VisuMZ[_0x31a7f2('0x101')]['Settings'][_0x31a7f2('0xac')],_0x5a77fb=_0x10ceb6==='Exp'?_0x4bedab[_0x31a7f2('0x75')]():_0x4bedab[_0x31a7f2('0x165')]();let _0x434690=0x0,_0x14c3a5=0x0,_0x7320ff=_0x380968['Tint0'],_0x56729c=_0x380968['Duration0'],_0x45d198=JsonEx[_0x31a7f2('0x14')](_0x380968[_0x31a7f2('0xcb')]);for(let _0x2dd440=0x1;_0x2dd440<=0xa;_0x2dd440++){if(_0x31a7f2('0x21')===_0x31a7f2('0x21')){const _0x32bef2=_0x31a7f2('0x43')[_0x31a7f2('0x116')](_0x2dd440),_0x7fedee='Icon%1'[_0x31a7f2('0x116')](_0x2dd440),_0x864453='Rarity%1'[_0x31a7f2('0x116')](_0x2dd440);if(_0x977146[_0x32bef2]<_0x434690)continue;if(_0x5a77fb<_0x977146[_0x32bef2])continue;_0x434690=_0x977146[_0x32bef2],_0x14c3a5=_0x977146[_0x7fedee];const _0x59c345=_0x977146[_0x864453][_0x31a7f2('0x114')](0x0,0xa);_0x7320ff=_0x380968[_0x31a7f2('0x34')[_0x31a7f2('0x116')](_0x59c345)]||[0x0,0x0,0x0,0x0],_0x56729c=_0x380968['Duration%1'[_0x31a7f2('0x116')](_0x59c345)]||0x1,_0x45d198=_0x380968['Flags%1'['format'](_0x59c345)]||[];}else{function _0x188055(){const _0x1e29dd=_0x31a7f2;_0x7118d1['applyTimesStruck'](this),_0x454a39[_0x1e29dd('0x101')][_0x1e29dd('0x7f')][_0x1e29dd('0xe3')](this,_0x5be91f);}}}return[_0x14c3a5,_0x7320ff,_0x56729c,_0x45d198];},VisuMZ[_0xa734c1('0x1f')][_0xa734c1('0x92')]=function(_0x471f53){const _0x18cb23=_0xa734c1,_0x46928e=[],_0x5114d6=_0x471f53[_0x18cb23('0xf3')](),_0x458de3=VisuMZ['ExtraEnemyDrops'][_0x18cb23('0x58')][_0x18cb23('0x13e')],_0x37eed5=VisuMZ[_0x18cb23('0x101')]['Settings']['Rarity'];for(const _0x58438c of _0x5114d6){if(!_0x58438c)continue;const _0x1ee334=[];if(_0x58438c['note'][_0x18cb23('0x161')](/<VISUAL DROP ICON:[ ](\d+)>/i))_0x1ee334['push'](Number(RegExp['$1'])||0x0);else{if(_0x458de3[_0x18cb23('0xca')])_0x1ee334['push'](_0x58438c[_0x18cb23('0x55')]);else{if(DataManager['isItem'](_0x58438c)){if(_0x18cb23('0x134')===_0x18cb23('0x83')){function _0x2e49d2(){const _0x4fd102=_0x18cb23;this['createShadowSprite'](),this[_0x4fd102('0x120')](),this[_0x4fd102('0x91')](!![]);}}else _0x1ee334['push'](_0x458de3['commonItemIcon']);}else{if(DataManager[_0x18cb23('0x62')](_0x58438c))_0x1ee334[_0x18cb23('0x156')](_0x458de3['commonWeaponIcon']);else DataManager['isArmor'](_0x58438c)&&_0x1ee334[_0x18cb23('0x156')](_0x458de3[_0x18cb23('0x99')]);}}}if(_0x58438c[_0x18cb23('0x10b')][_0x18cb23('0x161')](/<VISUAL DROP RARITY:[ ](\d+)>/i)){if(_0x18cb23('0xe0')!==_0x18cb23('0xdc')){const _0x4c0ade=Number(RegExp['$1'])['clamp'](0x0,0xa);_0x1ee334[_0x18cb23('0x156')](_0x37eed5[_0x18cb23('0x34')[_0x18cb23('0x116')](_0x4c0ade)]||[0x0,0x0,0x0,0x0]),_0x1ee334[_0x18cb23('0x156')](_0x37eed5[_0x18cb23('0x16c')['format'](_0x4c0ade)]||0xb4),_0x1ee334[_0x18cb23('0x156')](_0x37eed5[_0x18cb23('0x5e')[_0x18cb23('0x116')](_0x4c0ade)]||[]);}else{function _0x25ab95(){const _0x11c251=_0x18cb23;return _0x4ac120[_0x576463[_0x11c251('0x16a')](_0x4545f9)];}}}else{if(_0x18cb23('0xbb')!=='nvOOx'){if(_0x58438c[_0x18cb23('0x10b')]['match'](/<VISUAL DROP TINT COLOR:[ ](.*)>/i)){if(_0x18cb23('0xa0')===_0x18cb23('0xa0')){let _0x17fbb5=String(RegExp['$1'])[_0x18cb23('0xb5')](',')[_0x18cb23('0x38')](_0x179da0=>Number(_0x179da0)[_0x18cb23('0x114')](-0xff,0xff));while(_0x17fbb5[_0x18cb23('0x28')]<0x4)_0x17fbb5['push'](0x0);_0x1ee334[_0x18cb23('0x156')](_0x17fbb5);}else{function _0x3b76e5(){const _0x239098=_0x18cb23;_0x565391[_0x239098('0x101')][_0x239098('0x125')][_0x239098('0xe3')](this),this[_0x239098('0x40')]();}}}else{if(_0x18cb23('0x144')===_0x18cb23('0xae')){function _0x403262(){const _0x675f65=_0x18cb23;_0xe93e8['ConvertParams'](_0x82f138,_0x274229);const _0x231e7f=_0x548f3b['Visible'];_0x792649[_0x675f65('0x119')]=_0x231e7f;}}else _0x1ee334[_0x18cb23('0x156')](_0x37eed5[_0x18cb23('0x65')]);}if(_0x58438c['note'][_0x18cb23('0x161')](/<VISUAL DROP TINT DURATION:[ ](\d+)>/i))_0x1ee334[_0x18cb23('0x156')](Number(RegExp['$1'])||0xb4);else{if(_0x18cb23('0x150')===_0x18cb23('0x150'))_0x1ee334['push'](_0x37eed5[_0x18cb23('0xfe')]);else{function _0x1428e6(){const _0x34696e=_0x18cb23;_0x568b41[_0x34696e('0x156')](_0x181f2f[_0x34696e('0xeb')]);}}}_0x1ee334[_0x18cb23('0x156')](JsonEx[_0x18cb23('0x14')](_0x37eed5[_0x18cb23('0xcb')]));}else{function _0x734f8e(){const _0x55fbc5=_0x18cb23;this['_data'][_0x55fbc5('0xa9')]=_0x2090ab['round'](_0x4a2157[_0x55fbc5('0xa9')]*_0x314f58);}}}const _0x51fd9f=_0x58438c[_0x18cb23('0x10b')]['match'](/<VISUAL DROP FLAG:[ ](.*)>/gi);if(_0x51fd9f){if(_0x18cb23('0xb1')==='lXumS'){function _0x5d1508(){const _0x320197=_0x18cb23;this['addTimesStruck'](_0x320197('0x111'),_0x2f1909['id']);}}else for(const _0x196238 of _0x51fd9f){_0x196238['match'](/<VISUAL DROP FLAG:[ ](.*)>/i);const _0x24d3c4=String(RegExp['$1']);_0x1ee334[_0x1ee334['length']-0x1][_0x18cb23('0x156')](_0x24d3c4);}}if(_0x58438c[_0x18cb23('0x10b')][_0x18cb23('0x161')](/<VISUAL DROP SFX:[ ](.*)>/i)){if('FyXZP'===_0x18cb23('0x151')){function _0x4542da(){const _0x287a6c=_0x18cb23;this[_0x287a6c('0x3')](_0x287a6c('0x3f'),_0x2787d0['id']),this[_0x287a6c('0x3')](_0x287a6c('0x109'),_0x40ae14[_0x287a6c('0xe8')]);}}else{const _0x4bb509=_0x18cb23('0xa6')[_0x18cb23('0x116')](String(RegExp['$1']));_0x1ee334[_0x1ee334[_0x18cb23('0x28')]-0x1][_0x18cb23('0x156')](_0x4bb509);}}if(_0x58438c[_0x18cb23('0x10b')][_0x18cb23('0x161')](/<VISUAL DROP SPAWN SFX:[ ](.*)>/i)){if(_0x18cb23('0xb3')!==_0x18cb23('0x53')){const _0x173bcf=_0x18cb23('0xa6')[_0x18cb23('0x116')](String(RegExp['$1']));_0x1ee334[_0x1ee334[_0x18cb23('0x28')]-0x1][_0x18cb23('0x156')](_0x173bcf);}else{function _0xd0b90d(){const _0x5d0f2a=_0x18cb23;this[_0x5d0f2a('0x60')]={'exp':_0x1cfb7d,'gold':_0x25e672,'drops':_0x509e8b};}}}if(_0x58438c[_0x18cb23('0x10b')][_0x18cb23('0x161')](/<VISUAL DROP BOUNCE HEIGHT:[ ](\d+)([%％])>/i)){if('VQmfT'===_0x18cb23('0xc')){const _0x31f4d7='BOUNCE\x20HEIGHT\x20%1%'[_0x18cb23('0x116')](Number(RegExp['$1']));_0x1ee334[_0x1ee334['length']-0x1][_0x18cb23('0x156')](_0x31f4d7);}else{function _0x124f95(){const _0x21d5a6=_0x18cb23;if(this[_0x21d5a6('0x60')]===_0x1d9fb9)this[_0x21d5a6('0x9a')]();if(this[_0x21d5a6('0x41')]===_0x38089c)this[_0x21d5a6('0x1a')]();this[_0x21d5a6('0x60')][_0x21d5a6('0x75')]=_0x2cba97[_0x21d5a6('0x4e')](0x0,_0x10b53b[_0x21d5a6('0x50')](_0x5d61fb));}}}if(_0x58438c['note'][_0x18cb23('0x161')](/<VISUAL DROP BOUNCE SFX:[ ](.*)>/i)){if(_0x18cb23('0x135')!=='tjXdx'){const _0x51bf93=_0x18cb23('0x7a')[_0x18cb23('0x116')](String(RegExp['$1']));_0x1ee334[_0x1ee334[_0x18cb23('0x28')]-0x1][_0x18cb23('0x156')](_0x51bf93);}else{function _0x103987(){const _0x497720=_0x18cb23;_0xb1ca9f=_0x47e488[_0x497720('0x4e')](_0x1d1e59,_0x3c4050);}}}_0x46928e[_0x18cb23('0x156')](_0x1ee334);}return _0x46928e;},VisuMZ['VisualDrops'][_0xa734c1('0x129')]=function(_0x359e00,_0x3b9f3a){const _0x4b5d25=_0xa734c1;_0x3b9f3a=_0x3b9f3a['filter'](_0x1937f9=>_0x1937f9[0x0]!==0x0);if(_0x3b9f3a['length']<=0x0)return[];const _0x548aaf=VisuMZ[_0x4b5d25('0x101')]['Settings'][_0x4b5d25('0xd4')],_0x5daae2=0x168/_0x3b9f3a[_0x4b5d25('0x28')],_0x559403=_0x359e00[_0x4b5d25('0x176')](),_0xcd3641=[];let _0x3fe3a1=Math[_0x4b5d25('0x2c')](0x168);for(const _0x4276a2 of _0x3b9f3a){if(_0x4276a2[0x0]<=0x0)continue;const _0x163248=new Sprite_VisualDrop(_0x359e00,_0x4276a2);_0xcd3641['push'](_0x163248);if(_0x559403&&_0x3b9f3a[_0x4b5d25('0x28')]>0x1){const _0x344929=_0x548aaf['radius']+_0x548aaf[_0x4b5d25('0xdd')]*_0x3b9f3a['length'],_0x29c802=_0x344929*Math[_0x4b5d25('0x72')](_0x3fe3a1*Math['PI']/0xb4),_0x131f08=_0x344929*(Math[_0x4b5d25('0x9f')](_0x3fe3a1*Math['PI']/0xb4)*_0x548aaf[_0x4b5d25('0xd5')]);_0x163248[_0x4b5d25('0x177')](_0x29c802+_0x559403[_0x4b5d25('0xab')],_0x131f08+_0x559403[_0x4b5d25('0xa1')]),_0x3fe3a1+=_0x5daae2;}}return _0xcd3641;},VisuMZ[_0xa734c1('0x1f')][_0xa734c1('0xbf')]=Spriteset_Battle['prototype'][_0xa734c1('0xd3')],Spriteset_Battle[_0xa734c1('0x118')][_0xa734c1('0xd3')]=function(){const _0x518a2b=_0xa734c1;VisuMZ[_0x518a2b('0x1f')]['Spriteset_Battle_createLowerLayer']['call'](this),this['restoreVisualDrops']();},Spriteset_Battle[_0xa734c1('0x118')][_0xa734c1('0x45')]=function(){const _0x1b7e48=_0xa734c1;$gameTemp[_0x1b7e48('0x4c')]=$gameTemp['_visualDropSprites']||[];for(const _0x598761 of $gameTemp[_0x1b7e48('0x4c')]){if(!_0x598761)continue;const _0x5b3b54=new Sprite_VisualDrop(_0x598761[_0x1b7e48('0xc2')],_0x598761[_0x1b7e48('0x55')],_0x598761);this[_0x1b7e48('0xe2')]['addChild'](_0x5b3b54);}};function Sprite_VisualDrop(){const _0x553839=_0xa734c1;this[_0x553839('0x4a')](...arguments);}Sprite_VisualDrop[_0xa734c1('0x118')]=Object['create'](Sprite[_0xa734c1('0x118')]),Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x117')]=Sprite_VisualDrop,Sprite_VisualDrop[_0xa734c1('0x118')]['initialize']=function(_0x4313ed,_0x4caa26,_0x3f11b7){const _0xaf346c=_0xa734c1;_0x3f11b7?(this[_0xaf346c('0x52')]=_0x3f11b7,this[_0xaf346c('0xab')]=this[_0xaf346c('0x52')][_0xaf346c('0xe4')],this['_baseY']=this[_0xaf346c('0x52')][_0xaf346c('0x7c')]):this[_0xaf346c('0x52')]=this[_0xaf346c('0x157')](_0x4313ed,_0x4caa26),Sprite[_0xaf346c('0x118')][_0xaf346c('0x4a')]['call'](this),this[_0xaf346c('0x152')]();},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x157')]=function(_0x299708,_0x1f54c4){const _0x4100e1=_0xa734c1,_0x24cba3=VisuMZ['ExtraEnemyDrops'][_0x4100e1('0x58')][_0x4100e1('0xd4')],_0xaa1e1d=_0x299708['battler']();_0x1f54c4=JsonEx[_0x4100e1('0x14')](_0x1f54c4);const _0x136d3c={'enemy':_0x299708,'iconIndex':_0x1f54c4[0x0],'duration':_0x24cba3[_0x4100e1('0xa9')],'angle':_0x24cba3['angle'],'jumpHeight':0x0,'bounces':_0x24cba3[_0x4100e1('0xff')],'bounceSFX':_0x24cba3['sfxFilename'],'targetX':_0xaa1e1d[_0x4100e1('0xab')],'targetY':_0xaa1e1d[_0x4100e1('0xa1')],'targetOpacity':0xff,'opacityModifier':0x1,'rarityFrames':0x0,'rarityTint':_0x1f54c4[0x1]||[0x0,0x0,0x0,0x0],'rarityDuration':_0x1f54c4[0x2]||0xb4,'flags':_0x1f54c4[0x3]||[]};this[_0x4100e1('0xab')]=_0xaa1e1d[_0x4100e1('0xab')],this[_0x4100e1('0xa1')]=_0xaa1e1d[_0x4100e1('0xa1')],_0x136d3c['baseX']=this[_0x4100e1('0xab')],_0x136d3c[_0x4100e1('0x7c')]=this[_0x4100e1('0xa1')],_0x136d3c[_0x4100e1('0xa7')]=_0x136d3c[_0x4100e1('0xa7')][_0x4100e1('0x38')](_0x544bb5=>String(_0x544bb5));for(const _0x23f1d1 of _0x136d3c[_0x4100e1('0xa7')]){if(!_0x23f1d1)continue;if(_0x23f1d1[_0x4100e1('0x161')](/BOUNCE SFX: (.*)/i)){if(_0x4100e1('0x94')===_0x4100e1('0x94')){const _0x7d156b=String(RegExp['$1']);_0x136d3c[_0x4100e1('0x2d')]=_0x7d156b;}else{function _0x710f93(){const _0x1c28fc=_0x4100e1;_0x383d4d[_0x1c28fc('0x156')](_0x476d33);}}}}return _0x136d3c;},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x152')]=function(){const _0x2d548c=_0xa734c1;this[_0x2d548c('0x130')](),this[_0x2d548c('0x120')](),this[_0x2d548c('0x91')](!![]);},Sprite_VisualDrop['prototype'][_0xa734c1('0x130')]=function(){const _0x2225aa=_0xa734c1,_0x465418=VisuMZ[_0x2225aa('0x101')][_0x2225aa('0x58')]['General'];if(!_0x465418[_0x2225aa('0x14e')])return;this[_0x2225aa('0x39')]=new Sprite(),this[_0x2225aa('0x39')]['bitmap']=ImageManager[_0x2225aa('0x47')](_0x465418[_0x2225aa('0xdb')]),this[_0x2225aa('0x39')][_0x2225aa('0x1b')]['x']=0.5,this[_0x2225aa('0x39')][_0x2225aa('0x1b')]['y']=0x1,this[_0x2225aa('0x39')]['x']=_0x465418['shadowOffsetX'],this['_shadowSprite']['y']=_0x465418[_0x2225aa('0x4f')],this['_shadowSprite'][_0x2225aa('0x6c')]=_0x465418[_0x2225aa('0x17c')],this[_0x2225aa('0x93')](this['_shadowSprite']);},Sprite_VisualDrop[_0xa734c1('0x118')]['createIconSprite']=function(){const _0x31460a=_0xa734c1,_0xe2ed35=VisuMZ[_0x31460a('0x101')][_0x31460a('0x58')]['General'];this[_0x31460a('0x13')]=new Sprite(),this[_0x31460a('0x13')]['bitmap']=ImageManager[_0x31460a('0x47')](_0x31460a('0xc9')),this['_iconSprite']['anchor']['x']=0.5,this[_0x31460a('0x13')]['anchor']['y']=0.5,this[_0x31460a('0x13')][_0x31460a('0x7c')]=Math[_0x31460a('0x50')](ImageManager[_0x31460a('0x122')]/_0xe2ed35[_0x31460a('0x4d')]),this[_0x31460a('0x13')]['y']=this[_0x31460a('0x13')]['baseY'];const _0x4fbca2=this[_0x31460a('0x52')][_0x31460a('0x55')],_0x313e98=ImageManager['iconWidth'],_0x333c5e=ImageManager[_0x31460a('0x122')],_0x3bf62d=_0x4fbca2%0x10*_0x313e98,_0x2e0df2=Math['floor'](_0x4fbca2/0x10)*_0x333c5e;this['_iconSprite'][_0x31460a('0x132')](_0x3bf62d,_0x2e0df2,_0x313e98,_0x333c5e),this[_0x31460a('0x93')](this['_iconSprite']);},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x177')]=function(_0x1225c4,_0x528f14){const _0x52586b=_0xa734c1;this['_data'][_0x52586b('0x169')]=Math['round'](_0x1225c4),this['_data']['targetY']=Math[_0x52586b('0x50')](_0x528f14);},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x6d')]=function(_0x3a99ba){const _0x1fade0=_0xa734c1,_0x57382b=VisuMZ[_0x1fade0('0x101')][_0x1fade0('0x58')]['Rarity'],_0x19ac8e=(_0x57382b[_0x1fade0('0x34')[_0x1fade0('0x116')](_0x3a99ba)]||[0x0,0x0,0x0,0x0])['map'](_0x274474=>Number(_0x274474)[_0x1fade0('0x114')](-0xff,0xff)),_0x31e5cb=_0x57382b[_0x1fade0('0x16c')['format'](_0x3a99ba)]||0x0;this[_0x1fade0('0x57')](_0x19ac8e,_0x31e5cb);},Sprite_VisualDrop['prototype']['setTintInformation']=function(_0x38cce6,_0x58a4ad){const _0x20f49a=_0xa734c1;this['_data']['rarityTint']=JsonEx[_0x20f49a('0x14')](_0x38cce6),this[_0x20f49a('0x52')]['rarityDuration']=_0x58a4ad;},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x6a')]=function(_0x3566f3){const _0x6bcbd=_0xa734c1;this[_0x6bcbd('0x52')][_0x6bcbd('0xa7')]=JsonEx['makeDeepCopy'](_0x3566f3)[_0x6bcbd('0x38')](_0x311012=>String(_0x311012));},Sprite_VisualDrop[_0xa734c1('0x118')]['startFadeOut']=function(){const _0x3a441e=_0xa734c1;this['_data'][_0x3a441e('0x88')]=0x0;},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x66')]=function(){const _0x140d3b=_0xa734c1;for(const _0x121a1e of this[_0x140d3b('0x52')][_0x140d3b('0xa7')]){if(!_0x121a1e)continue;if(_0x121a1e[_0x140d3b('0x161')](/\bSPAWN SFX:[ ](.*)\b/i)){if(_0x140d3b('0xb4')==='GreqP'){function _0x18aca9(){return!![];}}else{const _0x38075d={'name':String(RegExp['$1']),'volume':0x5a,'pitch':0x64,'pan':0x0};AudioManager[_0x140d3b('0xde')](_0x38075d);}}}},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0xba')]=function(){const _0x3a27d5=_0xa734c1;Sprite[_0x3a27d5('0x118')]['update'][_0x3a27d5('0xe3')](this),this[_0x3a27d5('0x91')]();if(this[_0x3a27d5('0x6c')]<=0x0)return;this[_0x3a27d5('0x1')](),this[_0x3a27d5('0xbd')](),this[_0x3a27d5('0x146')](),this[_0x3a27d5('0xa3')](),this[_0x3a27d5('0x61')](),this['updateTint'](),this[_0x3a27d5('0x44')]();},Sprite_VisualDrop['prototype'][_0xa734c1('0x1')]=function(){const _0x22e099=_0xa734c1;for(const _0x3cc796 of this[_0x22e099('0x52')][_0x22e099('0xa7')]){if(_0x22e099('0xc1')!==_0x22e099('0x12e')){if(!_0x3cc796)continue;this[_0x22e099('0x1e')](_0x3cc796);}else{function _0x415895(){const _0x46fbb7=_0x22e099;this[_0x46fbb7('0x52')]=_0x3fc075,this['_baseX']=this[_0x46fbb7('0x52')]['baseX'],this[_0x46fbb7('0xa1')]=this[_0x46fbb7('0x52')][_0x46fbb7('0x7c')];}}}},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x1e')]=function(_0x389b14){const _0x11644c=_0xa734c1,_0xb32a44=VisuMZ[_0x11644c('0x101')][_0x11644c('0x58')][_0x11644c('0xac')];switch(_0x389b14[_0x11644c('0x78')]()[_0x11644c('0x6e')]()){case _0x11644c('0x149'):this['_data']['hue']=this[_0x11644c('0x52')][_0x11644c('0xb6')]||0x0,this[_0x11644c('0x52')][_0x11644c('0xb6')]+=_0xb32a44['RainbowHueSpeed'],this[_0x11644c('0x13')]['setHue'](this[_0x11644c('0x52')]['hue']);break;case _0x11644c('0x112'):this[_0x11644c('0x13')][_0x11644c('0x12d')]=0x1;break;case _0x11644c('0x163'):this[_0x11644c('0x13')][_0x11644c('0x12d')]=0x2;break;case _0x11644c('0xf5'):this['_iconSprite']['blendMode']=0x3;break;};},Sprite_VisualDrop['prototype']['updateOpacity']=function(_0x44e374){const _0xbc11f2=_0xa734c1,_0x2d21f2=VisuMZ['ExtraEnemyDrops'][_0xbc11f2('0x58')][_0xbc11f2('0xd4')],_0x4c102c=this[_0xbc11f2('0x52')][_0xbc11f2('0x88')][_0xbc11f2('0x114')](0x0,0xff)*this[_0xbc11f2('0x98')]();if(this[_0xbc11f2('0x6c')]>_0x4c102c)this[_0xbc11f2('0x6c')]=Math['max'](this['opacity']-_0x2d21f2[_0xbc11f2('0x9c')],_0x4c102c);else this['opacity']<_0x4c102c&&(this[_0xbc11f2('0x6c')]=Math['min'](this[_0xbc11f2('0x6c')]+_0x2d21f2[_0xbc11f2('0x9c')],_0x4c102c));if(_0x44e374)this[_0xbc11f2('0x6c')]=_0x4c102c;},Sprite_VisualDrop['prototype'][_0xa734c1('0x98')]=function(){const _0xd46d84=_0xa734c1;if(!BattleManager[_0xd46d84('0x119')])return 0x0;if($gameTroop[_0xd46d84('0x4b')]())return 0x0;return this[_0xd46d84('0x52')][_0xd46d84('0x164')];},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0xbd')]=function(){const _0x3aa7e4=_0xa734c1;this[_0x3aa7e4('0x52')]['duration']>0x0?this[_0x3aa7e4('0x13')][_0x3aa7e4('0x6')]-=this[_0x3aa7e4('0xf9')]():this[_0x3aa7e4('0x13')][_0x3aa7e4('0x6')]=0x0;},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0xf9')]=function(){const _0x362591=_0xa734c1;if(this[_0x362591('0x3e')]!==undefined)return this[_0x362591('0x3e')];const _0x2aacb7=VisuMZ[_0x362591('0x101')][_0x362591('0x58')]['General'];return this[_0x362591('0x3e')]=_0x2aacb7[_0x362591('0x6')]/_0x2aacb7['duration'],this[_0x362591('0x3e')];},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x146')]=function(){const _0x46fdad=_0xa734c1;this[_0x46fdad('0x52')]['duration']>0x0?this['_data'][_0x46fdad('0x147')]=this[_0x46fdad('0xc6')]():this[_0x46fdad('0x52')][_0x46fdad('0x147')]=0x0,this['_iconSprite']['y']=this[_0x46fdad('0x13')][_0x46fdad('0x7c')]-this[_0x46fdad('0x52')]['jumpHeight'];},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0xc6')]=function(){const _0x58ba46=_0xa734c1,_0x3411e6=VisuMZ[_0x58ba46('0x101')]['Settings']['General'],_0x2325a4=_0x3411e6['bounces'],_0x39117f=this[_0x58ba46('0x52')][_0x58ba46('0xff')],_0x37da52=Math[_0x58ba46('0xe7')](_0x3411e6['bounceReduction'],_0x2325a4-_0x39117f),_0x4490c6=Math[_0x58ba46('0x50')](_0x3411e6['height']*_0x37da52),_0xeb750b=Math[_0x58ba46('0x50')](_0x3411e6['duration']*_0x37da52),_0x4025b4=this[_0x58ba46('0x52')][_0x58ba46('0xa9')],_0x560cdc=_0x4025b4,_0x354d36=_0xeb750b-_0x560cdc,_0x458e09=_0xeb750b/0x2,_0x39cc05=_0x4490c6,_0x408e37=-_0x39cc05/Math[_0x58ba46('0xe7')](_0x458e09,0x2),_0x4940b8=_0x408e37*Math[_0x58ba46('0xe7')](_0x354d36-_0x458e09,0x2)+_0x39cc05;let _0xc44999=0x1;for(const _0x5b7080 of this[_0x58ba46('0x52')][_0x58ba46('0xa7')]){if('BCzMs'===_0x58ba46('0x13b')){if(!_0x5b7080)continue;if(_0x5b7080['match'](/BOUNCE HEIGHT (\d+)([%％])/i)){if(_0x58ba46('0x31')!==_0x58ba46('0x31')){function _0x8a3fe4(){const _0xc459e5=_0x58ba46,_0x38e86b=_0x25d59b[_0x31edf6];if(_0x38e86b)this[_0xc459e5('0x60')][_0xc459e5('0x95')][_0xc459e5('0x156')](_0x38e86b);}}else _0xc44999*=Number(RegExp['$1'])/0x64;}}else{function _0x34d7ab(){_0x17cd9b['push'](_0x2e98c9['TintDuration0']);}}}return _0x4940b8*_0xc44999;},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0xa3')]=function(){const _0xc77ddf=_0xa734c1;if(this[_0xc77ddf('0x52')]['duration']>0x0){if(_0xc77ddf('0x11b')!=='hKOmU'){function _0x3c4791(){const _0x588d2d=_0xc77ddf;_0x1c071f[_0x588d2d('0xcd')](_0x2dd70f,_0x3acce2);const _0x375dff=_0x409606[_0x588d2d('0x106')];_0x547838[_0x588d2d('0x8b')](_0x375dff);}}else{const _0x2b8aa7=VisuMZ[_0xc77ddf('0x101')][_0xc77ddf('0x58')][_0xc77ddf('0xd4')],_0x5b3625=this[_0xc77ddf('0x52')][_0xc77ddf('0xa9')],_0x3a6b1f=_0x2b8aa7[_0xc77ddf('0xa9')],_0x43cfec=_0x2b8aa7[_0xc77ddf('0x97')];if(Imported['VisuMZ_0_CoreEngine']){if(_0xc77ddf('0xb0')===_0xc77ddf('0x81')){function _0x17391e(){const _0x27eeb4=_0xc77ddf;_0x53a1f5['ExtraEnemyDrops']['Game_Battler_onBattleStart'][_0x27eeb4('0xe3')](this,_0x4b12f9),this[_0x27eeb4('0x2f')]();}}else this[_0xc77ddf('0xab')]=this['applyEasing'](this[_0xc77ddf('0xab')],this['_data'][_0xc77ddf('0x169')],_0x5b3625,_0x3a6b1f,_0x43cfec),this[_0xc77ddf('0xa1')]=this[_0xc77ddf('0x12a')](this[_0xc77ddf('0xa1')],this[_0xc77ddf('0x52')]['targetY'],_0x5b3625,_0x3a6b1f,_0x43cfec);}else{if(_0xc77ddf('0xd')!==_0xc77ddf('0xd')){function _0x3491fc(){const _0x525db2=_0xc77ddf;if(this[_0x525db2('0x60')]===_0x18423b)this['clearForcedRewards']();if(this[_0x525db2('0x41')]===_0x275f4e)this['clearBonusRewards']();let _0x429490=this['_forcedRewards'][_0x525db2('0x165')]===_0x1dfd9f?_0x161313[_0x525db2('0x101')]['Game_Troop_goldTotal'][_0x525db2('0xe3')](this):this['_forcedRewards'][_0x525db2('0x165')]*this[_0x525db2('0xe5')]();return _0x24b9e6['round'](_0x20a2f0['max'](_0x429490+(this[_0x525db2('0x41')][_0x525db2('0x165')]||0x0)*this[_0x525db2('0xe5')](),0x0));}}else this[_0xc77ddf('0xab')]=(this[_0xc77ddf('0xab')]*(_0x5b3625-0x1)+this[_0xc77ddf('0x52')]['targetX'])/_0x5b3625,this[_0xc77ddf('0xa1')]=(this['_baseY']*(_0x5b3625-0x1)+this['_data'][_0xc77ddf('0x35')])/_0x5b3625;}}}else this[_0xc77ddf('0xab')]=this['_data'][_0xc77ddf('0x169')],this['_baseY']=this[_0xc77ddf('0x52')][_0xc77ddf('0x35')];this[_0xc77ddf('0x52')]['baseX']=this[_0xc77ddf('0xab')],this[_0xc77ddf('0x52')][_0xc77ddf('0x7c')]=this['_baseY'];},Sprite_VisualDrop['prototype']['applyEasing']=function(_0x3df793,_0x140277,_0x2e54b1,_0x36b1f1,_0x3292df){const _0x4d4d3a=_0xa734c1,_0xb3e32e=VisuMZ['ApplyEasing']((_0x36b1f1-_0x2e54b1)/_0x36b1f1,_0x3292df||_0x4d4d3a('0x11d')),_0x331679=VisuMZ[_0x4d4d3a('0xd0')]((_0x36b1f1-_0x2e54b1+0x1)/_0x36b1f1,_0x3292df||_0x4d4d3a('0x11d')),_0x469fea=(_0x3df793-_0x140277*_0xb3e32e)/(0x1-_0xb3e32e);return _0x469fea+(_0x140277-_0x469fea)*_0x331679;},Sprite_VisualDrop[_0xa734c1('0x118')]['updatePosition']=function(){const _0x26e834=_0xa734c1;this['x']=this['_baseX'],this['y']=this[_0x26e834('0xa1')];},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x7e')]=function(){const _0x56f7b7=_0xa734c1;if(!VisuMZ[_0x56f7b7('0x101')][_0x56f7b7('0x58')][_0x56f7b7('0xac')][_0x56f7b7('0x183')])return;const _0x4622aa=this[_0x56f7b7('0x52')];_0x4622aa[_0x56f7b7('0x153')]++;const _0x2d6ec7=_0x4622aa['rarityFrames']%_0x4622aa[_0x56f7b7('0x100')],_0xbfcbc0=_0x4622aa[_0x56f7b7('0x100')]-_0x2d6ec7,_0x23f2ee=_0x4622aa[_0x56f7b7('0x100')]/0x2,_0x421074=0x1,_0x16e7d9=-_0x421074/Math['pow'](_0x23f2ee,0x2),_0x421389=_0x16e7d9*Math[_0x56f7b7('0xe7')](_0xbfcbc0-_0x23f2ee,0x2)+_0x421074,_0x3e57c9=_0x4622aa[_0x56f7b7('0xe1')][_0x56f7b7('0x38')](_0x155c72=>_0x155c72*_0x421389);this[_0x56f7b7('0x13')][_0x56f7b7('0xf6')](_0x3e57c9);},Sprite_VisualDrop[_0xa734c1('0x118')][_0xa734c1('0x44')]=function(){const _0x1bb959=_0xa734c1;this[_0x1bb959('0x52')][_0x1bb959('0xa9')]--;if(this[_0x1bb959('0x52')][_0x1bb959('0xa9')]===0x0&&this['_data'][_0x1bb959('0xff')]>=0x0){if(_0x1bb959('0x33')===_0x1bb959('0x12b')){function _0x53e8e2(){const _0x46e326=_0x1bb959;this['_data'][_0x46e326('0x147')]=0x0;}}else{this[_0x1bb959('0x52')][_0x1bb959('0xff')]-=0x1;const _0xa1f388=VisuMZ[_0x1bb959('0x101')][_0x1bb959('0x58')][_0x1bb959('0xd4')],_0x160907=_0xa1f388[_0x1bb959('0xff')],_0x2d2ea3=this[_0x1bb959('0x52')][_0x1bb959('0xff')],_0x21ba3c=Math[_0x1bb959('0xe7')](_0xa1f388[_0x1bb959('0x29')],_0x160907-_0x2d2ea3);if(this[_0x1bb959('0x52')]['bounces']>=0x0)this['_data']['duration']=Math[_0x1bb959('0x50')](_0xa1f388['duration']*_0x21ba3c);else _0xa1f388[_0x1bb959('0x105')]&&setTimeout(this[_0x1bb959('0xfb')][_0x1bb959('0xd6')](this),_0xa1f388['fadeAfterDelay']);if(_0xa1f388[_0x1bb959('0x10f')]){const _0x4d11ea={'name':this[_0x1bb959('0x52')][_0x1bb959('0x2d')],'volume':Math[_0x1bb959('0x50')](_0xa1f388[_0x1bb959('0xc4')]*_0x21ba3c),'pitch':_0xa1f388[_0x1bb959('0x148')],'pan':_0xa1f388['sfxPan']};AudioManager[_0x1bb959('0xde')](_0x4d11ea);}}}};};
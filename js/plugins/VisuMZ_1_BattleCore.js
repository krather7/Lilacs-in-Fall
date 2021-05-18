//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.08] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
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
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate Turn>
 *
 * <JS Post-Regenerate Turn>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
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
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events
 * 
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
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
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
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
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
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
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
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
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
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
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
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
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
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
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent SelectWindow
 * @desc Offset the enemy name's X position by this much.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent SelectWindow
 * @desc Offset the enemy name's Y position by this much.
 * @default 0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
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
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
//=============================================================================

const _0xc311=['ShowFacesListStyle','PeaSf','uYJnN','jmJot','SMixQ','makeEscapeRatio','inputtingAction','itemCri','_distortionSprite','ZAIlo','battleCameraData','match','_iconIndex','sSUNy','_actor','actorCommandWindowRect','wMtQv','Scene_Battle_startActorSelection','mainSpriteScaleY','canUseItemCommand','GroupDigits','BattleCmdList','mwHgR','prepareBorderActor','ActSeq_DB_DragonbonesTimeScale','STR','Sprite_Battler_isMoving','battleUIOffsetY','loadSystem','WaitForZoom','updatePhase','isAlive','performJump','AnimationID','ActSeq_Zoom_Reset','Window_BattleLog_performAction','-%1','FaceDirection','removeAnimation','QAnnI','Ddric','DistanceAdjust','oHlLY','endAction','Game_Action_itemHit','wnTOQ','isShownOnBattlePortrait','PortraitScaleBorderStyle','performMoveToTargets','VkTKE','_skewEasing','Game_BattlerBase_isStateResist','_animationSprites','%1EndActionJS','Window_Options_statusText','wnqWr','commandAutoBattle','isDead','StyleON','LUK','ActSeq_Movement_MoveToPoint','_attackAnimationId','autoBattleWindowRect','registerCommand','SvBattlerMass-%1-%2','Window_ItemList_maxCols','isSceneChanging','boxHeight','battleLayoutStyle','recoverAll','isSpriteVisible','eFhqI','ActSeq_Mechanics_AddBuffDebuff','BattleManager_selectNextCommand','battleZoom','CriticalDmgFlat','QSBcG','Scene_Battle_createHelpWindow','battleStatusWindowAnimationContainer','updateJump','isForAll','SkillItemBorderCols','evalDamageFormula','_isBattlerFlipped','VisuMZ_2_BattleSystemCTB','ScaleY','VcgmJ','BxYPX','ActSeq_Movement_WaitForScale','Oqrlw','applyCritical','Rate','ARRAYSTR','PrioritySortActors','CXLLY','createAnimationSprite','EscapeFail','calcWindowHeight','NlvyJ','setupRgbSplitImpactFilter','icon','partyCommandWindowRectDefaultStyle','xORWo','createMiss','displayRemovedStates','createBorderStylePortraitSprite','gzxJW','MotionAni','itemHit','MANUAL','_dragonbonesSpriteContainer','updateBattleProcess','Sprite_Battler_update','isBattleCoreTargetScope','Window_BattleLog_popupDamage','Window_BattleLog_displayTpDamage','map','freezeFrame','KLVuK','reverse','_enemy','updateBattlebackBitmap1','jIczR','Scene_Battle_updateStatusWindowPosition','IPLbR','_stypeIDs','SvWeaponSolo-%1-%2','CriticalDuration','list','drawTextEx','DamageStyleList','requestAnimation','HelpOptions','hue','Window_BattleLog_performRecovery','isForOpponentBattleCore','ShowCurrentState','requestFauxAnimation','atbInterrupt','ShowPopup','performAttack','ByTJL','removeActor','animationWait','gSvhg','forceMotion','result','jumpBattler','wzMoJ','WaitForFloat','_helpWindow','QDfYR','createActorCommandWindowBattleCore','command3011','JKUKc','Duration','Scene_Battle_partyCommandWindowRect','createHelpWindowBattleCore','Window_BattleLog_performReflection','addSingleSkillCommand','processRandomizedData','ActSeq_BattleLog_PopBaseLine','chant','update','BaseTroopIDs','StartName','getWtypeIdWithName','EnMkK','TlrXe','vbuWw','ActSeq_BattleLog_PushBaseLine','wBncF','actorCommandSingleSkill','createBattleUIOffsetX','max','BattleManager_startTurn','format','_pattern','Scene_Battle_logWindowRect','isSkipPartyCommandWindow','hHSxz','ActorCmd','inBattle','_battleCoreBattleStartEvent','nPIAc','active','battleOpacity','yXvsH','min','Game_Party_addActor','removedBuffs','requestDragonbonesAnimation','exit','applyDamageCaps','softDamageCap','drawItemStyleIconText','ytJgU','zlTrV','Game_Battler_performDamage','YKheG','Scene_Map_launchBattle','ActSeq_Animation_ActionAnimation','Game_Battler_performActionStart','subject','isSkillItemWindowsMiddle','SmoothImage','unshift','Scene_Battle_helpWindowRect','iWGya','applyVariance','canGuardBattleCore','cameraClamp','onActorOk','criticalHitFlat','BattleManager_onEscapeSuccess','oVJPI','aCxIG','Window_BattleLog_performActionStart','XvfRe','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','toUpperCase','Window_Options_addGeneralOptions','drawLineText','refreshStatusWindow','setMoveEasingType','BHiLN','_methods','DTB','evaded','CmdIconAutoBattle','ActSeq_Set_SetupAction','rowSpacing','getSkillTypes','Scene_Battle_onEnemyOk','ActSeq_Movement_Spin','duration','TolwJ','text','innerHeight','ActSeq_Impact_ZoomBlurPoint','ActSeq_Movement_HomeReset','isFlipped','weaponTypes','frontviewSpriteY','_offsetX','drawItemStatusListStyle','_growEasing','ShowCritical','lrWRY','BattleManager_initMembers','clearForcedGameTroopSettingsBattleCore','performMagicEvasion','lGGbe','uqsuv','LMfVx','GuardFormulaJS','refreshActorPortrait','hKzdk','eTUEG','spell','setup','hpHealingFmt','onSelectAction','selectNextCommand','WaitForSpin','random','CriticalColor','isAnyoneJumping','Game_Map_battleback1Name','Sprite_Battler_updateMain','Filename','startMove','Targets','ZTVMI','MaxLines','maxItems','svBattlerData','Sprite_Actor_setBattler','Window_BattleEnemy_show','emerge','adjustWeaponSpriteOffset','ArRedRate','isItemCommandEnabled','_homeY','rVXnq','alive\x20battlers\x20not\x20user','missed','opacity','isTurnBased','updateGrow','isActing','mainSpriteWidth','PopupOffsetY','ZCMKm','battleJump','SvBattlerSolo-%1-%2','createStateSprite','skillWindowRect','mpDamageFmt','displayBuffs','isCustomActionSequence','EnableSoftCap','OZRQb','FaceAway','JS\x20%1START\x20ACTION','YMTaQ','_damagePopupArray','invokeAction','isEffecting','createSeparateDamagePopups','DefaultSoftScaler','contents','setupWeaponAnimation','_motionCount','Sprite_Weapon_loadBitmap','Radius','onGrowEnd','Window_BattleLog_displayMpDamage','windowPadding','motionIdle','PopupShiftX','_multipliers','process_VisuMZ_BattleCore_Failsafes','performDamage','makeBattleCommand','FlinchDistanceY','createShadowSprite','_borderPortraitTargetX','portrait','JS\x20%1START\x20BATTLE','imchj','-%1\x20MP','NvVyn','_baseY','center','compareBattlerSprites','acKCQ','loadBitmap','changeAtbChargeTime','refreshDimmerBitmap','alive\x20enemies\x20not\x20user','victory','isNextSceneBattleTransitionable','kwzTY','getSkillIdWithName','waitCount','_opacityDuration','SkewX','startBattle','attackAnimationId2','tAKKe','isForFriendBattleCore','isOnCurrentMap','Elements','StepDistanceY','_enemyID','DisplayAction','bind','performCollapse','statusText','canMove','startOpacity','members','ActiveTpbOptionsMessage','setVisibleUI','ActSeq_Camera_Offset','wholeActionSet','clearBattleCoreData','eSIMy','isActor','checkTpbInputClose','_waitCount','Pre','_interpreter','updateVisibility','createHpGaugeSprite','ITEM','randomInt','setupIconTextPopup','teHuQ','itemEffectAddAttackState','getDamageStyle','isPreviousSceneBattleTransitionable','weapons','ActSeq_Movement_Scale','setupBattlebackBattleCore','drawIcon','refresh','_forcing','_list','children','partyCommandWindowRect','jHoac','Game_Enemy_setup','swapEnemyIDs','isDebuffAffected','Sprite_Battler_damageOffsetY','isJumping','evalDamageFormulaBattleCore','moveToStartPosition','actionBattleCoreJS','CommandAddAutoBattle','Sprite_Actor_setActorHome','updateEventMain','clearMotion','lAthC','ActSeq_Movement_Opacity','drawActorFace','Scene_Map_initialize','statusWindowRectXPStyle','kfRcE','loAHR','charging','ActSeq_Movement_WaitForSpin','_cache','Settings','abnormal','processForcedAction','ext','performActionEnd','_stateIconSprite','HP_Rate','AEste','vELyD','WaitForSkew','startFloat','onRegeneratePlayStateAnimation','Window_PartyCommand_initialize','actionEffect','setupChild','youKt','includes','updateHelp','makeCommandList','dNrZG','_jumpDuration','_createClientArea','padding','Window_BattleLog_refresh','ClearBattleLog','JWAfx','JS\x20BATTLE\x20VICTORY','transform','isPartyCommandWindowDisabled','nameY','updateSkew','qSfDA','Scene_Battle_onActorCancel','Game_Temp_requestAnimation','_dimmerSprite','_defeatedEnemies','messageSpeed','setImmortal','ActSeq_Target_PrevTarget','kHqrL','RNDvT','SkillsStatesCore','drawItemStatusXPStyle','displayReflectionPlayBack','GrKSP','arRedRate','stop','updateFloat','EboPv','createTargetsJS','SkipPartyCmd','ActSeq_Mechanics_AtbGauge','svBattlerAnchorX','ARRAYNUM','KFWEK','Text','initMembers','Ipmte','isForRandom','_skillIDs','StepDistanceX','ActSeq_Mechanics_TextPopup','ActSeq_Movement_Skew','Game_Map_battleback2Name','friendsUnit','createStateIconSprite','LqwYD','battleDisplayText','addAutoBattleCommand','NrZUL','_damages','TKrDT','skillTypes','getColor','faceRect','skewDuration','isQueueOptionsMenu','clearElementChanges','allowCollapse','Mechanics','yVqkk','_opacityEasing','clearWeaponAnimation','maxBattleMembers','anchorX','clamp','itemRect','statusWindowRectBorderStyle','drawSkillCost','removeDamageSprite','Sprite_Actor_initMembers','Point','helpWindowRect','_createCursorArea','_flashDuration','pages','_preemptive','rktLu','DisablePartyCmd','createBattleFieldBattleCore','attackMotions','hide','qPASw','ActSeq_BattleLog_WaitForNewLine','motionType','_allTargets','parseForcedGameTroopSettingsBattleCore','NuNUA','tmDXQ','float','substitute','isPlaytest','DistanceY','waitForMovement','isAnyoneMoving','processPostBattleCommonEvents','_forceAction','Game_BattlerBase_canAttack','findTargetSprite','DOQlc','wNikA','Sriqq','BattleManager_updatePhase','updateBorderStyle','selectPreviousCommand','command236','fLtEk','setSvBattlerSprite','_eventId','changeTurnOrderByCTB','_back1Sprite','_stateSprite','tdOJL','playReflection','ShowRemovedState','updateEffectContainers','AnchorX','skIaL','WwHRQ','Window_BattleLog_displayCurrentState','Window_BattleLog_clear','drawItemImagePortraitStyle','displayMpDamage','xeuou','fWcZw','displayType','qXsaP','BJgUF','createEnemyNameContainer','Game_Battler_performActionEnd','MiOVJ','GOiDM','makeData','Strength','MnInf','anchor','tiVCA','jBMeq','AutoMeleeSolo','skillId','JS\x20%1REGENERATE','onEncounterBattleCore','DefaultSoftCap','alive\x20opponents','mainSpriteHeight','PreDamageJS','ShowHpDmg','BattleStartEvent','collapseType','tyamY','_tpbState','requestMotion','front\x20center','Sprite_Enemy_loadBitmap','NUM','_updateFilterArea','isDeathStateAffected','Game_Map_setupBattleback','DistanceX','_effectsContainer','pRBPh','start','Window_BattleStatus_drawItemImage','parse','name','zceds','MotionFrameWait','gusfT','filterArea','tofUm','svShadow','ARRAYFUNC','autoBattleStyle','deadMembers','ActSeq_Movement_WaitForSkew','aSPwd','drawItemStatus','autoMeleeMultiTargetActionSet','SdVDr','regenerateAll','TextAlign','isMVAnimation','MmiWE','addBattleCoreAutoBattleStyleCommand','canAttackBattleCore','alive\x20enemies','TrRnx','BattleDefeatJS','Intensity','VisuMZ_1_ElementStatusCore','hfcCx','isOptionsCommandAdded','battleback1Name','updatePosition','BattleManager_endAction','ReflectAnimation','createAllWindows','ShowTpDmg','Window_BattleLog_performCollapse','alive\x20battlers\x20not\x20target','mainSpriteScaleX','changeBattlerOpacity','eGrFj','_armorPenetration','executeDamage','ShowPortraits','gESKA','JS\x20%1END\x20ACTION','dFPts','setSkill','BattleLayout','flashColor','getChildIndex','PreDamageAsTargetJS','ZFoeC','ShowRemovedBuff','createAnimationContainer','KELYF','addItemCommand','IOeCb','traitObjects','AllowRandomSpeed','HP_Flat','WaitForJump','QmEqY','shouldPopupDamage','addLoadListener','getEnemyIdWithName','kKrIy','HitRate','commandNameWindowDrawBackground','getLastPluginCommandInterpreter','startAction','BattleEndEvent','sleep','drawBackgroundRect','PerformAction','performReflection','setupZoomBlurImpactFilter','Spriteset_Battle_createBattleField','performEvasion','getItemDamageAmountTextOriginal','drawItemStyleIcon','TXjgP','selectNextActor','startWeaponAnimation','TP_Flat','YZvVd','svBattlerShadowVisible','changePaintOpacity','PKuyt','finishActionSet','Targets1','makeHpDamageText','setupCriticalEffect','isSideButtonLayout','Game_Action_isForRandom','hpAffected','showPortraits','wmIqU','isEnemy','zoomDuration','isImmortal','giaMm','dsteM','qzwMF','Game_Battler_onBattleStart','mIxEy','changeWeather','createChildSprite','statusWindowRectDefaultStyle','cNqQG','alive\x20friends\x20not\x20user','width','GUARD','_active','movement','addedDebuffs','FUNC','JsoQd','Jhckj','setHome','LCWTS','Defeat','clearFreezeMotionForWeapons','JuWCL','setBattleCameraPoint','basicGaugesY','_enemyIDs','attackSkillId','visible','measureTextWidth','battleUIOffsetX','IXEuh','ZcBjX','jvcsb','ActSeq_Impact_ShockwaveCenterTargets','odnno','ActSeq_ChangeAngle','ActSeq_BattleLog_AddText','setBattlerFacePoint','front\x20base','setBackgroundType','iconWidth','Fzefm','ESCAPE','isMagical','xNBAb','KTreP','updateBitmap','itfqq','updateForceAction','DamageRate','updateFlip','processRefresh','Game_Interpreter_updateWaitMode','isAnimationShownOnBattlePortrait','KTxGF','tWNJm','GVIlj','FlRSR','hZhdr','gDKUj','dying','ActSeq_DB_DragonbonesMotionAni','slrFb','_battlePortrait','fVEGJ','PopupDuration','commandEscape','PfCNG','_currentAngle','battleMove','PreEndTurnJS','_createDamageContainer','Window_BattleLog_displayFailure','performActionStart','ERkVl','isOpponent','isGuard','updateShadow','COooF','PreApplyAsTargetJS','isAtbChargingState','XPActorCommandLines','Game_Action_makeTargets','_regionBattleback2','clearFreezeMotion','_weather','process_VisuMZ_BattleCore_DamageStyles','_floatDuration','MtIiC','ActSeq_Skew_WaitForSkew','fKsTx','bGEEd','processEscape','oyapK','Scene_ItemBase_applyItem','commandSymbol','Uraam','isGrowing','auto','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','clearBattlerMotionTrailData','PostDamageAsUserJS','_handlers','Scene_Battle_stop','logActionList','QBBAG','getBattlePortrait','requestMotionRefresh','changeCtbChargeTime','SvMotionIdleMass-%1-%2','battlerSmoothImage','isMeleeMultiTargetAction','cgWhd','actor','uZmop','FlashDuration','pow','Window_BattleStatus_initialize','Scene_Battle_selectNextCommand','ActSeq_Camera_FocusTarget','_skewX','isChangingOpacity','setupBattleCoreData','kcyYr','FEuco','Game_Battler_regenerateAll','IconStypeMagic','_angleDuration','animation','fOYbO','isBusy','textSizeEx','_damageContainer','meXQZ','PostStartActionJS','_animationCount','PcYAn','ResetFocus','PreDamage%1JS','addSkillTypeCommand','chantStyle','Debuffs','setupTextPopup','addGuardCommand','message1','isRightInputMode','maSFi','setBattler','setLastPluginCommandInterpreter','_enemyWindow','reserveCommonEvent','setBattlerBattleCore','Sprite_Enemy_update','needsSelectionBattleCore','updateBattlebackBitmap','Scene_Battle_createActorCommandWindow','emwTh','Game_Action_apply','parent','command301','setupBattleCore','Window_BattleLog_performDamage','setupBattleback','BNKCL','fontSize','maxCols','forceAction','displayCounter','MAXMP','ActSeq_Target_RandTarget','MessageWait','_battlerName','cancel','MGhfm','JS\x20%1DAMAGE\x20%2','updateFrame','_duration','enemyId','create','_mainSprite','bossCollapse','_enemySprites','_immortal','CastAnimation','concat','_flashColor','Zpxaq','damageContainer','Spriteset_Battle_updateActors','toLowerCase','isEscapeCommandEnabled','setWaitMode','isFastForward','lineRect','redraw','OzKgW','placeBasicGauges','_angleEasing','actta','ALL\x20SKILLS','KumsZ','FnpeZ','resizeWindowBorderStyle','PopupOffsetX','ActSeq_Impact_ZoomBlurTargetCenter','message2','setBattleZoom','processAnimationRequests','turnCount','Targets2','initBattleCore','_surprise','isNonSubmenuCancel','displayCurrentState','cQOAo','_item','maxTp','resetFontSettings','message4','Scene_Battle_onEnemyCancel','_floatEasing','performFlinch','CreateActionSequenceTargets','process_VisuMZ_BattleCore_TraitObject_Notetags','NzFTd','isAnyoneGrowing','#ffffff','displayCritical','Formula','BattleLogRectJS','note','height','makeActionList','%1Event','BattleCore','createWeather','PARTY','extraHeight','TlHxd','ShowMissEvasion','_enemyNameContainer','updateCommandNameWindow','AijuO','wJQPq','OffsetAdjust','commandFight','SvWeaponMass-%1-%2','processDefeat','ActSeq_Set_FinishAction','createJS','MenWg','battleFloat','cPtCt','RepositionEnemies','_flinched','_weaponSprite','ActSeq_Mechanics_RemoveBuffDebuff','smooth','DamageStyles','Sprite_Battler_startMove','Game_Party_removeActor','critical','process_VisuMZ_BattleCore_Action_Notetags','_motionSpeed','Sprite_Actor_update','WaitForScale','move','ActSeq_Movement_Jump','ShowAddedDebuff','repositionEnemiesByResolution','clear','HZJAU','timeScale','ShowSubstitute','_cursorSprite','autoMeleeSingleTargetActionSet','Sprite_Battler_setBattler','commandStyle','physical','updateScale','targetObjects','AutoBattleBgType','border','WaitForNewLine','ArPenFlat','round','itemTextAlign','updateBossCollapse','VisuMZ_3_ActSeqCamera','onBattleStartBattleCore','command119','onOpacityEnd','AutoBattleRect','PostStartTurnJS','_partyCommandWindow','setBattleCameraTargets','Wfuou','setupMotionBlurImpactFilter','getItemDamageAmountLabelOriginal','createEffectActionSet','isDTB','debuffAdd','AGI','PtZcj','itemWindowRect','extraPositionX','Window_BattleLog_performActionEnd','iconText','iszhQ','Sprite_Actor_updateBitmap','isCustomBattleScope','refreshBattlerMotions','EmergeText','zpsIS','msIxi','_battlerContainer','KGqqO','cancelActorInput','%1RegenerateJS','Height','onDatabaseLoaded','isVisualHpGaugeDisplayed','FlinchDuration','drawText','PopupPosition','Palbm','gGcqW','Scene_Battle_updateBattleProcess','applyHardDamageCap','randomTargets','process_VisuMZ_BattleCore_CreateRegExp','EVAL','addOptionsCommand','placeActorName','ChantStyle','updateCancel','WlKFL','Scene_Battle_createAllWindows','CdiaM','Sprite_Actor_updateShadow','_appeared','isForFriend','PostDamageAsTargetJS','drawItem','ActSeq_Motion_ClearFreezeFrame','displaySubstitute','PreEndBattleJS','jDUTh','_enemies','item','EasingType','EscapeSuccessJS','Armor-%1-%2','actions','Width','damageRate','_forcedBattleLayout','StyleName','battleCamera','bHFxi','STYPES','ODwVF','_cursorArea','startSpin','VisuMZ_0_CoreEngine','pushBaseLine','pattern','putActiveBattlerOnTop','alive\x20actors\x20not\x20user','_opacityWholeDuration','jHZVj','isSkewing','isTriggered','extraPositionY','Cglgr','pVKHJ','opacityStart','Ytpil','isBorderStylePortraitShown','hIpWC','ActionItemMsg','_lines','weaponImageId','_back2Sprite','_battler','statusTextAutoBattleStyle','Victory','Sprite_Actor_updateFrame','changeBattlebacks','Spriteset_Battle_createLowerLayer','battleGrow','removeBuff','removeChild','Scale','guardSkillId','onTurnEnd','CriticalHitMultiplier','battleSpin','<CENTER>%1','ShowWeapon','updateCustomActionSequence','Game_BattlerBase_eraseState','VviOK','CriticalHitRate','validTargets','createString','rbgAD','displayTpDamage','_homeX','cFrHu','command301_PreBattleEvent','commandName','_emptyBitmap','ActSeq_Impact_MotionTrailCreate','command357','uiMenuStyle','ArzJp','pIfsL','opponentsUnit','EnableDamageCap','TP_Rate','makeActionListAutoAttack','ActSeq_Movement_MoveToTarget','Game_Action_itemEffectAddNormalState','fittingHeight','PXUzw','ZkgAD','CommandWidth','performMiss','battleCommandName','_text','ChargeRate','actionSplicePoint','BKmoW','isAttack','setFrame','isChanting','placeTimeGauge','Actor','_jumpWholeDuration','PaKFZ','getAttackWeaponAnimationId','addChild','JumpToLabel','setText','PreRegenerateJS','FTuTP','useDigitGrouping','ReflectPlayback','ConfigManager_makeData','CmdIconEscape','Gzcac','_colorType','mainSprite','MAT','khvIK','ShowActorGauge','lAjYd','_waitMode','splice','battleMembers','statusWindowRect','_createCursorSprite','addDamageSprite','helpAreaHeight','evade','Sprite_Battler_initMembers','HtlQG','Scene_Battle_selectPreviousCommand','isAnyoneFloating','_skewY','isNextScene','ActSeq_Zoom_Scale','displayFailure','MKHXh','custom','updateBorderSprite','hgddA','length','ActSeq_Impact_ColorBreak','AutoBattleMsg','isAnyoneSkewing','SkillItemMiddleLayout','param','BattleManager_startInput','gsryJ','currentExt','ljpBV','createBattleFieldContainer','right','_windowLayer','_targetSkewX','gainHp','JLpLn','changeInputWindow','CalcEscapeRatioJS','isBattleSys','ZukwU','isOptionsCommandEnabled','MNgtO','VisuMZ_1_MainMenuCore','_floatHeight','getDefeatedEnemies','terminate','fillRect','dnuMa','OnvKy','setBattlerFlip','makeDeepCopy','ActSeq_Impact_ShockwaveEachTargets','PreStartTurnJS','version','aliveMembers','trueRandomTarget','AYftE','createDigits','ActSeq_BattleLog_Refresh','SceneManager_isSceneChanging','toString','_jumpHeight','bJqyN','addBattleCoreAutoBattleStartupCommand','CommandVisible','Game_Action_needsSelection','isAnyoneSpinning','Scene_Battle_windowAreaHeight','arPenRate','kqoxQ','RequiresDefeat','RASQk','replace','repeatTargets','updateHpGaugePosition','default','Sprite_Battler_damageOffsetX','_lastPluginCommandInterpreter','MOTIONS','return\x200','displayActionResults','isMoving','isUndecided','EscapeFailureJS','_subject','PjOWU','dead\x20battlers','angle','_targetOpacity','user','YUYeS','preemptive','windowAreaHeight','removeAnimationFromContainer','startAttackWeaponAnimation','updatePositionBattleCore','Game_Battler_clearMotion','Shadow','DamageDisplay','JXdHR','_updateCursorArea','mCrhv','XSPvO','displayMiss','BattleManager_cancelActorInput','_shadowSprite','optDisplayTp','startSkew','magicReflection','action','startPartyCommandSelection','fKdlJ','Window_BattleLog_performEvasion','_growWholeDuration','performRecovery','%1Damage%2JS','HitFlat','OverallFormulaJS','Pxply','FVHWA','mmp','ActSeq_Movement_FaceDirection','_autoBattle','dead\x20opponents','stepForward','destroyDamageSprite','aDsgJ','addActor','PostEndTurnJS','isInputting','WaitForAngle','_skewDuration','StartTurnShow','PreDamageAsUserJS','PartyCmd','stepBack','dragonbonesData','actorCommandCancelTPB','addState','_borderPortraitDuration','_targetGrowX','CounterPlayback','_borderPortraitSprite','Sprite_Enemy_createStateIconSprite','counterAttack','launchBattle','_targetFloatHeight','POST-','createActorCommandWindow','zTdaR','KxSln','ForceRandom','wait','Scene_Battle_itemWindowRect','blt','_animation','forceEscapeSprite','updateInterpreter','ActSeq_Movement_FacePoint','currentSymbol','AddOption','Window_BattleLog_performMagicEvasion','retreat','ActSeq_Camera_Reset','zQJMn','BattleManager_endBattle','updateSpin','regionId','setBattlerMotionTrailData','makeTargetsBattleCore','ActSeq_Impact_MotionTrailRemove','ConvertParams','updateOpacity','setupShockwaveImpactFilter','performWeaponAnimation','_battleCoreForcedElements','WaitForEffect','uGwlM','parameters','ActionEffect','_padding','cdsZI','createMainSprite','createBattleUIOffsetY','isBattlerFlipped','DAGzy','addText','processBattleCoreJS','ActionStart','Ihrpq','JiAfa','addEscapeCommand','XFfsF','performMoveToPoint','deathStateId','AutoMeleeAoE','isTPB','finishActorInput','loadBattleback1','alive\x20opponents\x20not\x20target','waitForNewLine','processBorderActor','isDamagePopupRequested','IXZAW','_effectType','bgType','applySoftDamageCap','process_VisuMZ_BattleCore_BaseTroops','BattleManager_onEscapeFailure','zDuWs','zuWef','getNextSubject','battleCommandIcon','VisuMZ_3_ActSeqImpact','_commandNameWindow','Game_System_initialize','_motionType','callNextMethod','initVisibility','isCommandEnabled','Game_Action_itemEffectAddAttackState','missle','XCTbl','BattleManager_processDefeat','hpDamageFmt','_svBattlerData','EscapeSuccess','showNormalAnimation','Scene_Battle_startEnemySelection','destroy','TextColor','_effectDuration','zjfnA','createCommandNameWindow','addCommand','battlerSprites','lqWge','setHelpWindow','_preBattleCommonEvent','prototype','Game_BattlerBase_die','process_VisuMZ_BattleCore_Notetags','getNextDamagePopup','displayAddedStates','isItem','apply','autoBattleAtStart','ATTACK','czvEF','ldbvN','head','itemLineRect','spriteId','ActSeq_Mechanics_RemoveState','attack','UMQGf','EOYnp','_enemyId','ActSeq_Camera_Clamp','initMembersBattleCore','HelpAutoBattle','applyImmortal','Amp','battleCoreResumeLaunchBattle','isAutoBattle','CalcEscapeRaiseJS','getMenuImage','prepareCustomActionSequence','Scene_Battle_createCancelButton','_growY','MCaKP','popBaseLine','_targetIndex','Spriteset_Battle_update','DEF','iLbUE','cameraDuration','Scene_Battle_startPartyCommandSelection','ocfCR','updateMotionCount','worldTransform','BattleManager_onEncounter','rtEdG','XULng','KJtAj','AlphaFilter','alive\x20battlers','forceSelect','Index','ActSeq_Animation_ChangeBattlePortrait','Window_SkillList_maxCols','bottom','SideviewSelect','sgRcW','regenerateAllBattleCore','Window_BattleLog_update','startInput','not\x20focus','all\x20targets','updateShadowBattleCore','QoL','initElementStatusCore','addCustomCommands','index','_logWindow','kiXDW','refreshMotion','createCancelButton','ChangeOrderBy','Window_BattleLog_displayCritical','drain','Game_Interpreter_command283','poFFn','waitForAnimation','PreApply%1JS','loadEnemy','_actorCommandWindow','hasSkill','removeState','CheckSkillCommandShowSwitches','Dmoem','FlinchDistanceX','WaitForMovement','remove','currentClass','AnchorY','bXyHH','isSceneBattle','CmdIconFight','_actionBattlers','ActSeq_Movement_WaitForFloat','addBuff','setBattlePortrait','Sprite_Actor_createStateSprite','textColor','CmdIconItem','canAttack','moveBattlerToPoint','HInEO','isMeleeSingleTargetAction','isAnyoneChangingOpacity','AsUser','_escapeRatio','isAnimationPlaying','ActSeq_Camera_WaitForCamera','escape','okTargetSelectionVisibility','_actorWindow','FbalN','isPhysical','Scene_Battle_onActorOk','BKopx','_targetAngle','JS\x20ESCAPE\x20FAILURE','MLkRe','canAddSkillCommand','floor','autoBattleUseSkills','dead','Game_Battler_startTpbTurn','itemEffectAddNormalState','isPreviousScene','_battleCoreAddedElements','lzKzL','thrust','CriticalHitRateJS','ActionAnimation','callUpdateHelp','placeGauge','SkillItemStandardCols','Game_BattlerBase_canGuard','Game_Interpreter_PluginCommand','applyAngleChange','MDF','_autoBattleWindow','isHidden','canGuard','isTpb','DamageType%1','ActSeq_Mechanics_Multipliers','innerWidth','createLowerLayer','zCJCg','jump','jGUDC','criticalDmgRate','call','Sprite_Enemy_initVisibility','Wave','isBypassDamageCap','updateStateSpriteBattleCore','canEscape','Game_Action_clear','OffsetY','battleSkew','HelpEscape','ActSeq_Animation_AttackAnimation','push','itemHeight','ElementStatusCore','IilQw','LUDjL','onEscapeFailure','displayReflection','isFriendly','isGuardWaiting','loadPicture','NpqnP','updateWeather','_jumpMaxHeight','dead\x20friends','KTwNd','walk','description','updateShadowVisibility','MCMxD','makeTargetSelectionMoreVisible','zCyTm','Game_Actor_makeActionList','XrBPW','isAutoBattleCommandEnabled','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Skill-%1-%2','createContents','playEnemyDamage','setupHpGaugeSprite','OffsetX','_requestRefresh','ATK','FrontViewSelect','SKILLS','isSpinning','swing','JS\x20ESCAPE\x20SUCCESS','filters','PostStartBattleJS','performActionMotions','_motion','svAnchorX','ActSeq_Animation_WaitForAnimation','hasBeenDefeatedBefore','LFPdm','alive\x20actors','Prokz','reduce','ActSeq_Element_Clear','HelpFight','updateStatusWindowPosition','lCcJO','adjustFlippedBattlefield','_regionBattleback1','PreApplyJS','isForOpponent','Game_BattlerBase_initMembers','getNextSubjectFromPool','UNTITLED','skew','PreStartBattleJS','ZXdON','StartTurnWait','OHfbj','AZdui','vbYhB','scale','Setting','nXIEr','casting','battleback2Name','updateRefresh','kwoQL','actorCommandAutoBattle','tone','makeTargets','useItem','Scene_Battle_commandFight','clearDamagePopup','Mirror','addDebuff','origin','kDCyv','nKeYn','YVryE','ActSeq_Mechanics_CtbSpeed','BackColor','effect','isForRandomBattleCore','Weapon-%1-%2','constructor','show','CmdTextAlign','BNhtI','updateStateSprite','battlelog','gXcYN','INtFp','createActors','BtZyJ','updateTargetPosition','isDying','ActSeq_Element_AddElements','dataId','battleSpriteSkew','ShowAddedState','performCastAnimation','die','shadow','XSufJ','FqLvL','ActSeq_ChangeSkew','tMrKF','_updateClientArea','_action','MP_Flat','gainMp','hitRate','mhp','WaitCount1','isDisplayEmergedEnemies','updateBattlebackBitmap2','blockWidth','ActSeq_BattleLog_DisplayAction','endAnimation','DamageFlat','DkOHC','Turns','Buffs','MzONM','Qgnab','_baseLineStack','updateBattlerContainer','onSkewEnd','sort','startJump','_hpGaugeSprite','qJSFE','shift','ActSeq_Camera_FocusPoint','CICzs','Damage','yrADg','guard','singleSkill','isMagicSkill','centerFrontViewSprite','freezeMotion','onMoveEnd','sJCLD','UOgao','JSON','Scene_Boot_onDatabaseLoaded','some','WFojT','split','updateActors','ShowReflect','battleAnimation','createDamageContainer','PostRegenerateJS','States','oJBoU','softDamageCapRate','caXCH','HmxuN','isBattleMember','ActSeq_Movement_FaceTarget','cvvSC','DVFQa','setHue','Destination','BattleManager_startBattle','AutoBattle','process_VisuMZ_BattleCore_jsFunctions','uefQw','CsrSy','magicSkills','Window_BattleLog_displayMiss','sortDamageSprites','skills','VtSlJ','forceWeaponAnimation','commandStyleCheck','AS\x20USER','cancelTargetSelectionVisibility','_spriteset','mEWxo','_currentActor','base','_actorSprites','_actions','displayHpDamage','oNExY','onEncounter','updatePadding','left','ActSeq_BattleLog_Clear','waitForEffect','CastCertain','applyFreezeMotionFrames','MotionType','ActionSkillMsg1','getItemDamageAmountTextBattleCore','ConvertActionSequenceTarget','addImmortal','_flipScaleX','sortEnemies','_createEffectsContainer','value','battleEffect','XPActorDefaultHeight','ActSeq_BattleLog_WaitForBattleLog','Game_BattlerBase_refresh','displayItemMessage','Game_Action_executeDamage','uiInputPosition','uHOGF','startActorSelection','uMPhv','rmYvY','ActSeq_Element_ForceElements','changeCtbCastTime','Udjca','iconIndex','ActSeq_Zoom_WaitForZoom','CriticalHitFlat','PostDamage%1JS','OZPXJ','Game_Action_evalDamageFormula','addAttackCommand','AMRrj','DigitGroupingDamageSprites','autoBattle','anchorY','RSgFC','battler','buffRemove','%1EndBattleJS','isConfused','_additionalSprites','createBattleField','WaitCount','ActSeq_Motion_PerformAction','bXYqe','AddHpGaugeOption','_reflectionTarget','initialize','HJrXz','logWindowRect','PreApplyAsUserJS','partyCommandWindowRectBorderStyle','_growDuration','createHelpWindow','drawItemImageXPStyle','damageOffsetX','PortraitScale','%1Apply%2JS','getBattlePortraitFilename','snapForBackground','getInputButtonString','loadSvActor','zyNFq','gUSBn','BndEL','attachSpritesToDistortionSprite','canBattlerMove','isCharging','WaitForCamera','fight','ActSeq_Movement_Float','LkqfD','actor%1-portrait','ActionSequence','FDzPR','Sprite_Actor_moveToStartPosition','FocusY','_growX','enemy','drawItemImageListStyle','CcXmK','ARRAYEVAL','_freezeMotionData','JS\x20%1APPLY\x20%2','commandNameWindowCenter','_itemWindow','actorCommandEscape','qkkeE','addChildAt','addChildToBack','_battleCoreNoElement','Linear','applyItem','ActSeq_Mechanics_DamagePopup','OwJIt','arPenFlat','targetActionSet','allowRandomSpeed','canUse','BARE\x20HANDS','getTraitSetKeys','trim','alive\x20friends\x20not\x20target','PostApply%1JS','motionSpeed','performSubstitute','hasSvBattler','_forcedBattlers','makeDamageValue','callOptions','indexOf','BattleVictoryJS','DCGZg','makeActions','hpDamage','MAXHP','svAnchorY','FocusX','Window_BattleLog_performCounter','onJumpEnd','gradientFillRect','Mztwb','process_VisuMZ_BattleCore_PluginParams','Iqucv','cancelButtonText','Scene_Battle_skillWindowRect','applyBattleCoreJS','setBattleCameraOffset','zYuFS','doAJi','showHelpWindow','Post','createEmptyBitmap','repositionCancelButtonBorderStyle','createDamageSprite','Game_Actor_setup','QwbdO','PreStartActionJS','startGrow','Game_Action_isForFriend','faceWidth','TOthO','requestRefresh','close','NbwMa','processVictory','prev\x20target','okButtonText','_baseX','showAnimation','PostApplyAsTargetJS','slice','ActSeq_Motion_FreezeMotionFrame','boxWidth','Window_BattleLog_displayEvasion','svBattlerName','Bbkrd','Sprite_StateIcon_updateFrame','battleAngle','PostEndActionJS','mwPXo','_wtypeIDs','Class-%1-%2','isBattleFlipped','isCancelled','skillItemWindowRectBorderStyle','aBZjl','%1StartActionJS','activate','loadBattleback2','kZkvZ','updateCollapse','Game_Battler_onTurnEnd','ShowMpDmg','ActionSkillMsg2','RjYgS','partyCommandWindowRectXPStyle','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','Item-%1-%2','DOqBl','PZCZj','setupActionSet','jSLZX','SQNiH','onDisabledPartyCommandSelection','damageFlat','_battleLayoutStyle','kUcEr','_visualHpGauge_JustDied','_targetGrowY','_updateCursorFilterArea','frameVisible','wtypeId','JS\x20%1END\x20TURN','dead\x20enemies','Game_Interpreter_terminate','ActSeq_Mechanics_AddState','allBattleMembers','damage','growBattler','CmdStyle','displayAction','ZQNDZ','Xfqat','FjswE','_phase','onBattleStart','spinBattler','_executedValue','_skillWindow','YjXhN','kofPD','vWUjB','CastMagical','autoBattleStart','startDamagePopup','urRDD','UPOiD','PostApplyJS','Window_ActorCommand_initialize','Window_BattleLog_performMiss','CmdTextAutoBattle','Game_Battler_forceAction','StepDuration','jDoUP','AsTarget','AttackAnimation','mpDamage','Enemy','performCounter','bitmap','animationId','VisuMZ_1_SkillsStatesCore','applyEasing','uVYun','resizeWindowXPStyle','RevertAngle','PostEndBattleJS','addAutoBattleCommands','xSBNm','IconStypeNorm','QYtsl','OVYXq','addPartyCommand','applyData','gWbfu','refreshCursor','LUCoD','FlashColor','lineHeight','battleCommands','removeImmortal','SfhOq','criticalDmgFlat','PopupShiftY','_weaponImageId','startActorCommandSelection','PreEndActionJS','createPartyCommandWindowBattleCore','flashDuration','stepFlinch','contentsOpacity','mKOOJ','_skewWholeDuration','Window_ActorCommand_setup','getAttackMotion','setBattleAngle','stateMotionIndex','Name','isCertainHit','_checkOn','damageStyle','AutoBattleCancel','visualHpGauge','GeyLq','TargetLocation','_cancelButton','displayEvasion','EzjSO','pygHd','addFightCommand','ARRAYJSON','ActSeq_Element_NullElements','Angle','hqTyu','nVZme','LYyEK','collapse','surprise','checkCacheKey','PrioritySortActive','moveBattlerDistance','ActSeq_Angle_WaitForAngle','setBattleSkew','uTKGE','_angleRevertOnFinish','isActiveTpb','EnRse','ShowPortraitsBorderStyle','CFzRP','ActSeq_Target_NextTarget','Game_Interpreter_command301','nrVou','tontF','_statusWindow','initBattlePortrait','abs','VisuMZ_2_DragonbonesUnion','svBattlerAnchorY','_battlerHue','ActSeq_Mechanics_DeathBreak','Window_BattleLog_popBaseLine','afnEf','eraseState','battleCorePreBattleCommonEvent','_targets','autoSelect','StartTurnMsg','updateAngleCalculations','ZVhBM','pjBSs','_animationContainer','scope','drawGauge','BattleManager_startAction','NslLJ','_targetSkewY','_angleWholeDuration','ndsPr','currentAction','ActionEnd','animationNextDelay','type','ActSeq_Mechanics_HpMpTp','Window_BattleLog_pushBaseLine','enemyNames','SkewY','TjDaC','skillItemWindowRectMiddle','hardDamageCap','addGeneralOptions','isSideView','status','WaitForAnimation','createPartyCommandWindow','commandOptions','YsvoP','createKeyJS','damageOffsetY','Ewxjs','onActorCancel','options','WrJkt','Game_Action_isForOpponent','onAngleEnd','applyForcedGameTroopSettingsBattleCore','ActSeq_Motion_RefreshMotion','playCancel','popupDamage','attackAnimationId1','setHandler','_scene','top','filter','TrTPz','KLHvB','PostDamageJS','open','performAction','HpGauge','Sprite_Enemy_updateStateSprite','zNHvR','commandNameWindowDrawText','skill','startMotion','MeleeDistance','eTRfi','Sprite_Battler_updatePosition','setActorHome','TPB','setHelpWindowItem','floatBattler','Sprite_Enemy_setBattler','PostApplyAsUserJS','_totalValue','BattleLog','alive\x20actors\x20not\x20target','\x5cI[%1]%2','ActSeq_Movement_WaitForJump','command283','placeStateIcon','battleSys','startTurn','lXzVM','ActSeq_Motion_MotionType','updateStyleOpacity','jOVAr','_floatWholeDuration','StyleOFF','invokeMagicReflection','addShowHpGaugeCommand','playEnemyAttack','ceil','drawSingleSkillCost','BattleManager_processVictory','_target','getHardDamageCap','missile','addSkillCommands','WaitCount2','setupDamagePopup','delay','iconHeight','Game_Enemy_transform','onEnemyOk','text\x20target','_initialOffset','createCommandVisibleJS','updateShadowPosition','Direction','startTpbTurn','setupMotion','ArRedFlat','weatherPower','addSingleSkillCommands','ActSeq_Animation_CastAnimation','cKZtH','YZXXs','isFrameVisible','changeAtbCastTime','HelpItem','Scene_Battle_start','addedBuffs','log','_svBattlerSprite','NameFontSize','LIrXv','Game_BattlerBase_addNewState','maxCommands','_tpbNeedsPartyCommand','_callSceneOptions','RegExp','FuhHr','Opacity','_commonEventQueue','isLearnedSkill','resize','registerDefeatedEnemy','goOSy','ApplyImmortal','XjtGh','gGeko','isBattleTest','_battleField','ARRAYSTRUCT','gaugeX','applyArmorModifiers','drawItemImage','Game_Troop_setup'];(function(_0x1d2be1,_0xc311a6){const _0x3c6dd5=function(_0x1ce033){while(--_0x1ce033){_0x1d2be1['push'](_0x1d2be1['shift']());}};_0x3c6dd5(++_0xc311a6);}(_0xc311,0x1be));const _0x3c6d=function(_0x1d2be1,_0xc311a6){_0x1d2be1=_0x1d2be1-0x0;let _0x3c6dd5=_0xc311[_0x1d2be1];return _0x3c6dd5;};const _0x3219af=_0x3c6d;var label='BattleCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x59de4b){const _0x4543fc=_0x3c6d;return _0x59de4b[_0x4543fc('0x671')]&&_0x59de4b[_0x4543fc('0x463')][_0x4543fc('0x895')]('['+label+']');})[0x0];VisuMZ[label][_0x3219af('0x885')]=VisuMZ[label][_0x3219af('0x885')]||{},VisuMZ[_0x3219af('0x371')]=function(_0x3f0bb1,_0x5e015d){const _0x29db07=_0x3219af;for(const _0x3ad368 in _0x5e015d){if(_0x3ad368[_0x29db07('0x6f1')](/(.*):(.*)/i)){if(_0x29db07('0x646')!==_0x29db07('0x1bf')){const _0x1fb0ce=String(RegExp['$1']),_0xfe75c5=String(RegExp['$2'])[_0x29db07('0x7c2')]()[_0x29db07('0x580')]();let _0x21106d,_0x465de9,_0x70717f;switch(_0xfe75c5){case _0x29db07('0x8f'):_0x21106d=_0x5e015d[_0x3ad368]!==''?Number(_0x5e015d[_0x3ad368]):0x0;break;case _0x29db07('0x16'):_0x465de9=_0x5e015d[_0x3ad368]!==''?JSON[_0x29db07('0x98')](_0x5e015d[_0x3ad368]):[],_0x21106d=_0x465de9[_0x29db07('0x75a')](_0xf171f1=>Number(_0xf171f1));break;case _0x29db07('0x247'):_0x21106d=_0x5e015d[_0x3ad368]!==''?eval(_0x5e015d[_0x3ad368]):null;break;case _0x29db07('0x56c'):_0x465de9=_0x5e015d[_0x3ad368]!==''?JSON[_0x29db07('0x98')](_0x5e015d[_0x3ad368]):[],_0x21106d=_0x465de9[_0x29db07('0x75a')](_0x5af720=>eval(_0x5af720));break;case _0x29db07('0x4ea'):_0x21106d=_0x5e015d[_0x3ad368]!==''?JSON['parse'](_0x5e015d[_0x3ad368]):'';break;case _0x29db07('0x634'):_0x465de9=_0x5e015d[_0x3ad368]!==''?JSON['parse'](_0x5e015d[_0x3ad368]):[],_0x21106d=_0x465de9[_0x29db07('0x75a')](_0x95fef5=>JSON[_0x29db07('0x98')](_0x95fef5));break;case _0x29db07('0x10b'):_0x21106d=_0x5e015d[_0x3ad368]!==''?new Function(JSON[_0x29db07('0x98')](_0x5e015d[_0x3ad368])):new Function(_0x29db07('0x315'));break;case _0x29db07('0xa0'):_0x465de9=_0x5e015d[_0x3ad368]!==''?JSON[_0x29db07('0x98')](_0x5e015d[_0x3ad368]):[],_0x21106d=_0x465de9['map'](_0x3ee957=>new Function(JSON[_0x29db07('0x98')](_0x3ee957)));break;case _0x29db07('0x6ff'):_0x21106d=_0x5e015d[_0x3ad368]!==''?String(_0x5e015d[_0x3ad368]):'';break;case _0x29db07('0x742'):_0x465de9=_0x5e015d[_0x3ad368]!==''?JSON[_0x29db07('0x98')](_0x5e015d[_0x3ad368]):[],_0x21106d=_0x465de9[_0x29db07('0x75a')](_0xf4d538=>String(_0xf4d538));break;case'STRUCT':_0x70717f=_0x5e015d[_0x3ad368]!==''?JSON[_0x29db07('0x98')](_0x5e015d[_0x3ad368]):{},_0x3f0bb1[_0x1fb0ce]={},VisuMZ[_0x29db07('0x371')](_0x3f0bb1[_0x1fb0ce],_0x70717f);continue;case _0x29db07('0x6e1'):_0x465de9=_0x5e015d[_0x3ad368]!==''?JSON[_0x29db07('0x98')](_0x5e015d[_0x3ad368]):[],_0x21106d=_0x465de9[_0x29db07('0x75a')](_0x5f4b4a=>VisuMZ[_0x29db07('0x371')]({},JSON[_0x29db07('0x98')](_0x5f4b4a)));break;default:continue;}_0x3f0bb1[_0x1fb0ce]=_0x21106d;}else{function _0x5ef1bb(){const _0x1c800f=_0x29db07;_0x211029[_0x1c800f('0x1e6')][_0x1c800f('0x1ff')][_0x1c800f('0x448')](this,_0x411aa6,_0x2468c9,_0x38bb93);}}}}return _0x3f0bb1;},(_0x146202=>{const _0x8164a1=_0x3219af,_0xd5950a=_0x146202['name'];for(const _0x9f675c of dependencies){if(!Imported[_0x9f675c]){alert(_0x8164a1('0x7c1')[_0x8164a1('0x796')](_0xd5950a,_0x9f675c)),SceneManager[_0x8164a1('0x7a6')]();break;}}const _0x102f0f=_0x146202[_0x8164a1('0x463')];if(_0x102f0f[_0x8164a1('0x6f1')](/\[Version[ ](.*?)\]/i)){if(_0x8164a1('0x70e')===_0x8164a1('0x70e')){const _0x4e292b=Number(RegExp['$1']);_0x4e292b!==VisuMZ[label][_0x8164a1('0x2fb')]&&(alert(_0x8164a1('0x46b')[_0x8164a1('0x796')](_0xd5950a,_0x4e292b)),SceneManager['exit']());}else{function _0x20866f(){_0x22681b=_0x30a68e['CastPhysical'];}}}if(_0x102f0f[_0x8164a1('0x6f1')](/\[Tier[ ](\d+)\]/i)){const _0x4c4f4e=Number(RegExp['$1']);if(_0x4c4f4e<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x8164a1('0x796')](_0xd5950a,_0x4c4f4e,tier)),SceneManager[_0x8164a1('0x7a6')]();else{if(_0x8164a1('0x4c')!=='NuNUA'){function _0x564ae9(){const _0x5d0317=_0x8164a1,_0x216f0e=_0x29c84c['indexOf'](_0x903614[_0x5d0317('0x7c2')]()[_0x5d0317('0x580')]());_0x216f0e>=0x0&&_0x216f0e<=0x7&&_0x1ef2e0['isBuffAffected'](_0x216f0e)&&_0x5dcdc1[_0x5d0317('0x283')](_0x216f0e);}}else tier=Math[_0x8164a1('0x794')](_0x4c4f4e,tier);}}VisuMZ[_0x8164a1('0x371')](VisuMZ[label][_0x8164a1('0x885')],_0x146202[_0x8164a1('0x378')]);})(pluginData),VisuMZ[_0x3219af('0x1da')]=function(_0x42e798){const _0x1e7cb3=_0x3219af;let _0x5a2987=[];for(const _0xeffbf6 of _0x42e798){_0x5a2987=_0x5a2987['concat'](VisuMZ[_0x1e7cb3('0x51f')](_0xeffbf6));}return _0x5a2987['filter'](_0x5a3836=>_0x5a3836);},VisuMZ[_0x3219af('0x51f')]=function(_0x252e34){const _0x4f6ab3=_0x3219af,_0x314973=BattleManager['allBattleMembers'](),_0x541b3=BattleManager[_0x4f6ab3('0x31a')],_0x178b9a=BattleManager[_0x4f6ab3('0x6b0')],_0xf03a0c=BattleManager[_0x4f6ab3('0x4a')]?BattleManager[_0x4f6ab3('0x4a')][_0x4f6ab3('0x5b2')](0x0):_0x314973;_0x252e34=_0x252e34['toLowerCase']()[_0x4f6ab3('0x580')]();if(_0x252e34===_0x4f6ab3('0x31f')){if(_0x4f6ab3('0x5a8')!==_0x4f6ab3('0x5a8')){function _0x3dfd40(){const _0x2c91ce=_0x4f6ab3;this[_0x2c91ce('0x381')]('BattleDefeatJS'),_0x2a286b[_0x2c91ce('0x1e6')][_0x2c91ce('0x3a5')][_0x2c91ce('0x448')](this),this['processPostBattleCommonEvents'](_0x2c91ce('0x110'));}}else return[_0x541b3];}else{if(_0x252e34==='current\x20target')return[_0x178b9a];else{if(_0x252e34===_0x4f6ab3('0x5ad')){if(_0x4f6ab3('0x159')===_0x4f6ab3('0xef')){function _0x2f225d(){const _0x1d9e50=_0x4f6ab3,_0x142ade=_0x183ad9[_0x1d9e50('0x1e2')];if(_0x142ade[_0x1d9e50('0x6f1')](_0x1681d3[_0x1d9e50('0x1e6')][_0x1d9e50('0x6d4')][_0x30bcbf])){const _0x31f8af=_0x2206bd(_0x19fc92['$1']),_0x15d40d=_0x1d9e50('0x15f')[_0x1d9e50('0x796')](_0x31f8af),_0x4cfe35=_0x3974a8[_0x1d9e50('0x1e6')][_0x1d9e50('0x676')](_0x5cd4dd,_0x48a9c6);_0x5d9d19[_0x1d9e50('0x1e6')]['JS'][_0x4cfe35]=new _0xa6f9af(_0x15d40d);}}}else{if(_0x178b9a){if(_0x4f6ab3('0x88c')!==_0x4f6ab3('0x88c')){function _0x171b32(){const _0x4ec2ae=_0x4f6ab3;if(_0x42f185[_0x4ec2ae('0x667')]===0x0)this[_0x4ec2ae('0x8c')](_0x4ec2ae('0x432'));else{if(_0x38f610[_0x4ec2ae('0x667')]===0x1)this[_0x4ec2ae('0x8c')](_0x4ec2ae('0x476'));else _0x293867[_0x4ec2ae('0x667')]===0x2&&this[_0x4ec2ae('0x8c')](_0x4ec2ae('0x6b2'));}}}else{const _0x387a3c=_0xf03a0c[_0x4f6ab3('0x589')](_0x178b9a);return _0x387a3c>=0x0?[_0xf03a0c[_0x387a3c-0x1]||_0x178b9a]:[_0x178b9a];}}}}else{if(_0x252e34===_0x4f6ab3('0x6ba')){if(_0x4f6ab3('0x11b')!=='XWfyx'){if(_0x178b9a){const _0x5b03ac=_0xf03a0c[_0x4f6ab3('0x589')](_0x178b9a);return _0x5b03ac>=0x0?[_0xf03a0c[_0x5b03ac+0x1]||_0x178b9a]:[_0x178b9a];}}else{function _0x52700a(){const _0x5770c6=_0x4f6ab3,_0x4d1389=_0x174594[_0x5770c6('0x98')]('['+_0x41abaa['$1'][_0x5770c6('0x6f1')](/\d+/g)+']');for(const _0x22596d of _0x4d1389){if(_0x52241d[_0x5770c6('0x524')](_0x22596d))return!![];}return![];}}}else{if(_0x252e34===_0x4f6ab3('0x3f0'))return _0xf03a0c;else{if(_0x252e34==='focus')return[_0x541b3]['concat'](_0xf03a0c);else{if(_0x252e34===_0x4f6ab3('0x3ef')){if(_0x4f6ab3('0x1c2')===_0x4f6ab3('0x80b')){function _0x3df584(){this['placeGauge'](_0x2d187f,'tp',_0xb0af65+0x88*0x2,_0x2f6630);}}else return _0x314973['filter'](_0x4018cc=>_0x4018cc!==_0x541b3&&!_0xf03a0c[_0x4f6ab3('0x895')](_0x4018cc));}}}}}}}if(_0x541b3){if(_0x4f6ab3('0x5b7')!==_0x4f6ab3('0x649')){if(_0x252e34==='alive\x20friends')return _0x541b3[_0x4f6ab3('0x21')]()[_0x4f6ab3('0x2fc')]();else{if(_0x252e34===_0x4f6ab3('0x105')){if(_0x4f6ab3('0xd5')!==_0x4f6ab3('0x641'))return _0x541b3[_0x4f6ab3('0x21')]()[_0x4f6ab3('0x2fc')]()[_0x4f6ab3('0x686')](_0x95845b=>_0x95845b!==_0x541b3);else{function _0x377154(){const _0x270637=_0x4f6ab3;this['processBattleCoreJS']('EscapeSuccessJS'),_0x2fe6c4[_0x270637('0x50d')][_0x270637('0x158')](),_0x300137[_0x270637('0x1e6')]['BattleManager_onEscapeSuccess'][_0x270637('0x448')](this),this[_0x270637('0x54')](_0x270637('0x3a8'));}}}else{if(_0x252e34===_0x4f6ab3('0x581')){if(_0x4f6ab3('0x7e3')!=='uqsuv'){function _0x50a20d(){const _0x225bed=_0x4f6ab3,_0x55c860=this[_0x225bed('0x6ee')];_0x55c860&&(_0x55c860[_0x225bed('0x495')]['x']=this[_0x225bed('0xbd')](),_0x55c860[_0x225bed('0x495')]['y']=this[_0x225bed('0x6f8')]());}}else return _0x541b3[_0x4f6ab3('0x21')]()[_0x4f6ab3('0x2fc')]()[_0x4f6ab3('0x686')](_0x3e6dcd=>_0x3e6dcd!==_0x178b9a);}else{if(_0x252e34===_0x4f6ab3('0x460')){if(_0x4f6ab3('0x184')===_0x4f6ab3('0x16e')){function _0x16bba2(){const _0x361ff1=_0x4f6ab3;return this[_0x361ff1('0x757')]()&&!this[_0x361ff1('0x232')]()?this[_0x361ff1('0x195')]():_0x302441['BattleCore']['Game_Action_needsSelection'][_0x361ff1('0x448')](this);}}else return _0x541b3[_0x4f6ab3('0x21')]()[_0x4f6ab3('0xa2')]();}else{if(_0x252e34[_0x4f6ab3('0x6f1')](/FRIEND INDEX (\d+)/i)){if(_0x4f6ab3('0x844')===_0x4f6ab3('0x844')){const _0x31c6a9=Number(RegExp['$1']);return[_0x541b3['friendsUnit']()['members']()[_0x31c6a9]];}else{function _0x1ddf23(){const _0x390c09=_0x4f6ab3;this[_0x390c09('0x305')](),this[_0x390c09('0xac')]();}}}}}}}if(_0x252e34===_0x4f6ab3('0x84'))return _0x541b3['opponentsUnit']()[_0x4f6ab3('0x2fc')]();else{if(_0x252e34===_0x4f6ab3('0x38d')){if(_0x4f6ab3('0x1dc')!==_0x4f6ab3('0x748'))return _0x541b3['opponentsUnit']()[_0x4f6ab3('0x2fc')]()[_0x4f6ab3('0x686')](_0x35ca30=>_0x35ca30!==_0x178b9a);else{function _0x2a4282(){const _0x424c8f=_0x4f6ab3;return this[_0x424c8f('0x1b2')];}}}else{if(_0x252e34===_0x4f6ab3('0x341')){if('mIxEy'===_0x4f6ab3('0x100'))return _0x541b3[_0x4f6ab3('0x29e')]()[_0x4f6ab3('0xa2')]();else{function _0x2685b7(){const _0x213dda=_0x4f6ab3;_0xd89eaf[_0x213dda('0x101')](_0x372448[0x0],_0x5da3ab[0x1],_0x57d8eb[0x2]);if(_0x2d498e[0x3])this[_0x213dda('0x35e')](_0x32a57e[0x2]);return!![];}}}else{if(_0x252e34[_0x4f6ab3('0x6f1')](/OPPONENT INDEX (\d+)/i)){const _0x4ce2ff=Number(RegExp['$1']);return[_0x541b3[_0x4f6ab3('0x29e')]()['members']()[_0x4ce2ff]];}}}}}else{function _0xe5e036(){const _0x1e5a34=_0x4f6ab3;this[_0x1e5a34('0x3e')](),this['_createEffectsContainer'](),_0x2be582[_0x1e5a34('0x3b5')][_0x1e5a34('0x89a')][_0x1e5a34('0x448')](this),this[_0x1e5a34('0x143')]();}}}if(_0x252e34===_0x4f6ab3('0x480'))return $gameParty['aliveMembers']();else{if(_0x252e34===_0x4f6ab3('0x26c')){if(_0x4f6ab3('0x6ea')!==_0x4f6ab3('0x6ea')){function _0xef1ced(){const _0x263830=_0x4f6ab3;this['_animationContainer'][_0x263830('0x2b6')](_0x29bb61);}}else return $gameParty['aliveMembers']()[_0x4f6ab3('0x686')](_0x52bd96=>_0x52bd96!==_0x541b3);}else{if(_0x252e34===_0x4f6ab3('0x69d'))return $gameParty[_0x4f6ab3('0x2fc')]()[_0x4f6ab3('0x686')](_0x3fb05a=>_0x3fb05a!==_0x178b9a);else{if(_0x252e34==='dead\x20actors')return $gameParty[_0x4f6ab3('0xa2')]();else{if(_0x252e34[_0x4f6ab3('0x6f1')](/ACTOR INDEX (\d+)/i)){const _0x553468=Number(RegExp['$1']);return[$gameParty['members']()[_0x553468]];}else{if(_0x252e34['match'](/ACTOR ID (\d+)/i)){const _0x4a6bcb=Number(RegExp['$1']);return[$gameActors[_0x4f6ab3('0x16d')](_0x4a6bcb)];}}}}}}if(_0x252e34===_0x4f6ab3('0xae'))return $gameTroop[_0x4f6ab3('0x2fc')]();else{if(_0x252e34===_0x4f6ab3('0x83a'))return $gameTroop[_0x4f6ab3('0x2fc')]()[_0x4f6ab3('0x686')](_0x3e32d2=>_0x3e32d2!==_0x541b3);else{if(_0x252e34==='alive\x20enemies\x20not\x20target')return $gameTroop[_0x4f6ab3('0x2fc')]()['filter'](_0xb27b3e=>_0xb27b3e!==_0x178b9a);else{if(_0x252e34===_0x4f6ab3('0x5dd'))return $gameTroop['deadMembers']();else{if(_0x252e34['match'](/ENEMY INDEX (\d+)/i)){const _0x294b2e=Number(RegExp['$1']);return[$gameTroop[_0x4f6ab3('0x850')]()[_0x294b2e]];}else{if(_0x252e34[_0x4f6ab3('0x6f1')](/ENEMY ID (\d+)/i)){const _0x41c053=Number(RegExp['$1']);return $gameTroop[_0x4f6ab3('0x2fc')]()[_0x4f6ab3('0x686')](_0x4dd8a2=>_0x4dd8a2[_0x4f6ab3('0x1ad')]()===_0x41c053);}}}}}}if(_0x252e34===_0x4f6ab3('0x3e4'))return _0x314973[_0x4f6ab3('0x686')](_0x154d33=>_0x154d33[_0x4f6ab3('0x705')]());else{if(_0x252e34===_0x4f6ab3('0x803'))return _0x314973[_0x4f6ab3('0x686')](_0x4bc18d=>_0x4bc18d['isAlive']()&&_0x4bc18d!==_0x541b3);else{if(_0x252e34===_0x4f6ab3('0xbc'))return _0x314973['filter'](_0x3a98e3=>_0x3a98e3[_0x4f6ab3('0x705')]()&&_0x3a98e3!==_0x178b9a);else{if(_0x252e34===_0x4f6ab3('0x31c'))return _0x314973['filter'](_0x4066fd=>_0x4066fd[_0x4f6ab3('0x71f')]());}}}return[];},PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x7cc'),_0x3a2b75=>{const _0x922683=_0x3219af;if(!SceneManager[_0x922683('0x40d')]())return;VisuMZ[_0x922683('0x371')](_0x3a2b75,_0x3a2b75);const _0x2802ca=$gameTemp[_0x922683('0xdc')](),_0x74f889=BattleManager[_0x922683('0x4c5')],_0x58f07b=BattleManager[_0x922683('0x31a')],_0xd0b332=BattleManager[_0x922683('0x4a')]?BattleManager['_allTargets'][_0x922683('0x5b2')](0x0):[],_0x35e9ed=BattleManager[_0x922683('0x3f6')];if(!_0x2802ca||!_0x74f889||!_0x58f07b)return;if(!_0x74f889[_0x922683('0x259')]())return;if(_0x3a2b75[_0x922683('0x84a')])_0x35e9ed['displayAction'](_0x58f07b,_0x74f889['item']());if(_0x3a2b75[_0x922683('0x6dc')]){if('aBEYJ'!=='cbkVS')_0x35e9ed['push'](_0x922683('0x3cb'),_0x58f07b,_0xd0b332,!![]);else{function _0x1dce39(){const _0x364d16=_0x922683;_0x46f6ce['BattleCore'][_0x364d16('0xe4')][_0x364d16('0x448')](this),this['createBattleFieldBattleCore']();}}}if(_0x3a2b75[_0x922683('0x382')])_0x35e9ed[_0x922683('0x453')]('performActionStart',_0x58f07b,_0x74f889);if(_0x3a2b75['WaitForMovement'])_0x35e9ed[_0x922683('0x453')](_0x922683('0x52'));if(_0x3a2b75[_0x922683('0x1b3')])_0x35e9ed[_0x922683('0x453')]('performCastAnimation',_0x58f07b,_0x74f889);if(_0x3a2b75[_0x922683('0x672')])_0x35e9ed[_0x922683('0x453')](_0x922683('0x3ff'));_0x2802ca[_0x922683('0x1bb')](_0x922683('0x4b2'));}),PluginManager[_0x3219af('0x725')](pluginData['name'],'ActSeq_Set_WholeActionSet',_0x4e1c54=>{const _0x4d6f06=_0x3219af;if(!SceneManager[_0x4d6f06('0x40d')]())return;VisuMZ[_0x4d6f06('0x371')](_0x4e1c54,_0x4e1c54);const _0x29d2ba=$gameTemp[_0x4d6f06('0xdc')](),_0x2f5b4e=BattleManager[_0x4d6f06('0x4c5')],_0x1f2c3e=BattleManager[_0x4d6f06('0x31a')],_0x1ab346=BattleManager[_0x4d6f06('0x4a')]?BattleManager['_allTargets'][_0x4d6f06('0x5b2')](0x0):[],_0x2faff3=BattleManager[_0x4d6f06('0x3f6')];if(!_0x29d2ba||!_0x2f5b4e||!_0x1f2c3e)return;if(!_0x2f5b4e[_0x4d6f06('0x259')]())return;if(_0x4e1c54[_0x4d6f06('0xe1')])_0x2faff3['push'](_0x4d6f06('0x68b'),_0x1f2c3e,_0x2f5b4e);if(_0x4e1c54[_0x4d6f06('0x545')]>0x0)_0x2faff3[_0x4d6f06('0x453')]('waitCount',_0x4e1c54['WaitCount']);if(_0x4e1c54[_0x4d6f06('0x434')])_0x2faff3[_0x4d6f06('0x453')]('showAnimation',_0x1f2c3e,_0x1ab346,_0x2f5b4e[_0x4d6f06('0x259')]()[_0x4d6f06('0x602')]);if(_0x4e1c54['WaitForAnimation'])_0x2faff3['push'](_0x4d6f06('0x3ff'));for(const _0x289e6b of _0x1ab346){if(!_0x289e6b)continue;if(_0x4e1c54[_0x4d6f06('0x379')])_0x2faff3[_0x4d6f06('0x453')](_0x4d6f06('0x892'),_0x1f2c3e,_0x289e6b);}if(_0x4e1c54[_0x4d6f06('0x6dc')])_0x2faff3[_0x4d6f06('0x453')]('applyImmortal',_0x1f2c3e,_0x1ab346,![]);_0x29d2ba[_0x4d6f06('0x1bb')]('battlelog');}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Set_TargetActionSet',_0x53084c=>{const _0x2a3a37=_0x3219af;if(!SceneManager[_0x2a3a37('0x40d')]())return;VisuMZ[_0x2a3a37('0x371')](_0x53084c,_0x53084c);const _0x34761f=$gameTemp['getLastPluginCommandInterpreter'](),_0x50119d=BattleManager[_0x2a3a37('0x4c5')],_0x1f9d96=BattleManager[_0x2a3a37('0x31a')],_0x3012c2=BattleManager[_0x2a3a37('0x4a')]?BattleManager['_allTargets'][_0x2a3a37('0x5b2')](0x0):[],_0x34dc80=BattleManager[_0x2a3a37('0x3f6')];if(!_0x34761f||!_0x50119d||!_0x1f9d96)return;if(!_0x50119d[_0x2a3a37('0x259')]())return;for(const _0x3f660a of _0x3012c2){if(!_0x3f660a)continue;if(_0x53084c[_0x2a3a37('0xe1')])_0x34dc80[_0x2a3a37('0x453')](_0x2a3a37('0x68b'),_0x1f9d96,_0x50119d);if(_0x53084c['WaitCount1']>0x0)_0x34dc80[_0x2a3a37('0x453')](_0x2a3a37('0x83f'),_0x53084c[_0x2a3a37('0x4ca')]);if(_0x53084c[_0x2a3a37('0x434')])_0x34dc80[_0x2a3a37('0x453')]('showAnimation',_0x1f9d96,[_0x3f660a],_0x50119d[_0x2a3a37('0x259')]()['animationId']);if(_0x53084c[_0x2a3a37('0x6b4')]>0x0)_0x34dc80[_0x2a3a37('0x453')](_0x2a3a37('0x83f'),_0x53084c['WaitCount2']);if(_0x53084c[_0x2a3a37('0x379')])_0x34dc80[_0x2a3a37('0x453')](_0x2a3a37('0x892'),_0x1f9d96,_0x3f660a);}if(_0x53084c[_0x2a3a37('0x6dc')])_0x34dc80[_0x2a3a37('0x453')](_0x2a3a37('0x3cb'),_0x1f9d96,_0x3012c2,![]);_0x34761f[_0x2a3a37('0x1bb')](_0x2a3a37('0x4b2'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x1f4'),_0x37c3fa=>{const _0x5e3482=_0x3219af;if(!SceneManager[_0x5e3482('0x40d')]())return;VisuMZ[_0x5e3482('0x371')](_0x37c3fa,_0x37c3fa);const _0x5eaec9=$gameTemp['getLastPluginCommandInterpreter'](),_0x23dc17=BattleManager['_action'],_0x214827=BattleManager[_0x5e3482('0x31a')],_0x51e98b=BattleManager['_allTargets']?BattleManager[_0x5e3482('0x4a')][_0x5e3482('0x5b2')](0x0):[],_0x103e78=BattleManager[_0x5e3482('0x3f6')];if(!_0x5eaec9||!_0x23dc17||!_0x214827)return;if(!_0x23dc17[_0x5e3482('0x259')]())return;if(_0x37c3fa[_0x5e3482('0x6dc')])_0x103e78[_0x5e3482('0x453')](_0x5e3482('0x3cb'),_0x214827,_0x51e98b,![]);if(_0x37c3fa[_0x5e3482('0x217')])_0x103e78[_0x5e3482('0x453')](_0x5e3482('0x38e'));if(_0x37c3fa[_0x5e3482('0x376')])_0x103e78[_0x5e3482('0x453')](_0x5e3482('0x519'));if(_0x37c3fa[_0x5e3482('0x89d')])_0x103e78[_0x5e3482('0x453')](_0x5e3482('0x20a'));if(_0x37c3fa['ActionEnd'])_0x103e78[_0x5e3482('0x453')](_0x5e3482('0x889'),_0x214827);if(_0x37c3fa[_0x5e3482('0x408')])_0x103e78[_0x5e3482('0x453')](_0x5e3482('0x52'));_0x5eaec9[_0x5e3482('0x1bb')](_0x5e3482('0x4b2'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x11f'),_0x2c398e=>{const _0x223455=_0x3219af;if(!SceneManager[_0x223455('0x40d')]())return;if(!Imported[_0x223455('0x21c')])return;VisuMZ[_0x223455('0x371')](_0x2c398e,_0x2c398e);const _0x1fe09e=$gameTemp[_0x223455('0xdc')](),_0x13e723=_0x2c398e[_0x223455('0x348')];if(!_0x1fe09e)return;$gameScreen[_0x223455('0x625')](_0x2c398e[_0x223455('0x636')],_0x2c398e['Duration'],_0x2c398e[_0x223455('0x25a')]);if(_0x13e723)_0x1fe09e[_0x223455('0x1bb')](_0x223455('0x5b9'));}),PluginManager[_0x3219af('0x725')](pluginData['name'],'ActSeq_Angle_Reset',_0x2d3f83=>{const _0x3228b1=_0x3219af;if(!SceneManager[_0x3228b1('0x40d')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x3228b1('0x371')](_0x2d3f83,_0x2d3f83);const _0x141f6e=$gameTemp[_0x3228b1('0xdc')](),_0x4c0445=_0x2d3f83[_0x3228b1('0x348')];if(!_0x141f6e)return;$gameScreen['setBattleAngle'](0x0,_0x2d3f83[_0x3228b1('0x781')],_0x2d3f83['EasingType']);if(_0x4c0445)_0x141f6e['setWaitMode'](_0x3228b1('0x5b9'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x63f'),_0x3bdf6a=>{const _0x12270c=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x12270c('0x21c')])return;const _0x208630=$gameTemp[_0x12270c('0xdc')]();if(!_0x208630)return;_0x208630[_0x12270c('0x1bb')](_0x12270c('0x5b9'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x7af'),_0x551259=>{const _0x16c4ce=_0x3219af;if(!SceneManager[_0x16c4ce('0x40d')]())return;VisuMZ[_0x16c4ce('0x371')](_0x551259,_0x551259);const _0x1f1143=$gameTemp[_0x16c4ce('0xdc')](),_0x1c2630=BattleManager[_0x16c4ce('0x4c5')],_0x31f6c6=BattleManager[_0x16c4ce('0x31a')],_0x4d5eb9=VisuMZ[_0x16c4ce('0x1da')](_0x551259[_0x16c4ce('0x7f6')]),_0x3b0774=_0x551259[_0x16c4ce('0x4a2')],_0x3b1ce8=BattleManager['_logWindow'];if(!_0x1f1143||!_0x1c2630||!_0x31f6c6)return;if(!_0x1c2630[_0x16c4ce('0x259')]())return;let _0x36244e=_0x1c2630[_0x16c4ce('0x259')]()[_0x16c4ce('0x602')];if(_0x36244e<0x0)_0x36244e=_0x31f6c6[_0x16c4ce('0x682')]();$gameTemp[_0x16c4ce('0x769')](_0x4d5eb9,_0x36244e,_0x3b0774),_0x551259['WaitForAnimation']&&_0x1f1143[_0x16c4ce('0x1bb')]('battleAnimation');}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x452'),_0x488b89=>{const _0x384edd=_0x3219af;if(!SceneManager[_0x384edd('0x40d')]())return;VisuMZ[_0x384edd('0x371')](_0x488b89,_0x488b89);const _0x77ef1d=$gameTemp['getLastPluginCommandInterpreter'](),_0x1b88ec=BattleManager[_0x384edd('0x31a')],_0x5dc269=VisuMZ[_0x384edd('0x1da')](_0x488b89['Targets']),_0x2c103f=_0x488b89[_0x384edd('0x4a2')],_0x3c54cf=BattleManager['_logWindow'];if(!_0x77ef1d||!_0x1b88ec)return;const _0x3f0cf3=_0x1b88ec[_0x384edd('0x682')]();$gameTemp[_0x384edd('0x769')](_0x5dc269,_0x3f0cf3,_0x2c103f),_0x488b89['WaitForAnimation']&&_0x77ef1d[_0x384edd('0x1bb')](_0x384edd('0x4f1'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x6c4'),_0x32dcde=>{const _0x491652=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x491652('0x371')](_0x32dcde,_0x32dcde);const _0x1a15db=$gameTemp[_0x491652('0xdc')](),_0x513370=BattleManager[_0x491652('0x4c5')],_0x16ae3a=_0x32dcde[_0x491652('0x4a2')],_0x3e0d22=VisuMZ['CreateActionSequenceTargets'](_0x32dcde[_0x491652('0x7f6')]);if(!_0x1a15db||!_0x513370)return;if(!_0x513370[_0x491652('0x259')]())return;for(const _0x339d55 of _0x3e0d22){if(!_0x339d55)continue;_0x339d55[_0x491652('0x4bd')](_0x513370,_0x16ae3a);}if(_0x32dcde[_0x491652('0x672')])_0x1a15db['setWaitMode']('battleAnimation');}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x3e7'),_0x3ae4ce=>{const _0x7e8503=_0x3219af;VisuMZ['ConvertParams'](_0x3ae4ce,_0x3ae4ce);const _0x165a3c=$gameTemp[_0x7e8503('0xdc')](),_0xdb005e=VisuMZ[_0x7e8503('0x1da')](_0x3ae4ce['Targets']),_0x25b246=_0x3ae4ce[_0x7e8503('0x7f4')];if(!_0x25b246)return;for(const _0x44ec85 of _0xdb005e){if(!_0x44ec85)continue;if(!_0x44ec85[_0x7e8503('0x857')]())continue;_0x44ec85[_0x7e8503('0x412')](_0x25b246);}}),PluginManager[_0x3219af('0x725')](pluginData['name'],'ActSeq_Animation_ShowAnimation',_0x525ce7=>{const _0x2aa443=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x2aa443('0x371')](_0x525ce7,_0x525ce7);const _0x523d8a=$gameTemp[_0x2aa443('0xdc')](),_0x2f8937=VisuMZ[_0x2aa443('0x1da')](_0x525ce7['Targets']),_0x3f5919=_0x525ce7[_0x2aa443('0x707')],_0x1f8317=_0x525ce7[_0x2aa443('0x4a2')];if(!_0x523d8a)return;$gameTemp[_0x2aa443('0x769')](_0x2f8937,_0x3f5919,_0x1f8317);if(_0x525ce7[_0x2aa443('0x672')])_0x523d8a[_0x2aa443('0x1bb')](_0x2aa443('0x4f1'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x47d'),_0x147764=>{const _0x47a206=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0xa1c671=$gameTemp[_0x47a206('0xdc')]();if(!_0xa1c671)return;_0xa1c671[_0x47a206('0x1bb')](_0x47a206('0x4f1'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x120'),_0x236b21=>{const _0x1ccc50=_0x3219af;if(!SceneManager[_0x1ccc50('0x40d')]())return;VisuMZ[_0x1ccc50('0x371')](_0x236b21,_0x236b21);const _0x2fd185=BattleManager['_logWindow'];_0x2fd185[_0x1ccc50('0x380')](_0x236b21[_0x1ccc50('0x18')]);}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x518'),_0x29c2f3=>{const _0x27bdfa=_0x3219af;if(!SceneManager[_0x27bdfa('0x40d')]())return;const _0x41db62=BattleManager[_0x27bdfa('0x3f6')];_0x41db62[_0x27bdfa('0x20a')]();}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x4ce'),_0xc255f=>{const _0x1754fc=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0x2cac63=$gameTemp[_0x1754fc('0xdc')](),_0x3c3142=BattleManager[_0x1754fc('0x4c5')],_0x39ec21=BattleManager[_0x1754fc('0x31a')],_0x3dd26b=BattleManager[_0x1754fc('0x3f6')];if(!_0x2cac63||!_0x3c3142||!_0x39ec21)return;if(!_0x3c3142['item']())return;_0x3dd26b['displayAction'](_0x39ec21,_0x3c3142[_0x1754fc('0x259')]()),_0x2cac63[_0x1754fc('0x1bb')](_0x1754fc('0x4b2'));}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x787'),_0x40bf61=>{const _0x21d187=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0x54b6a3=BattleManager['_logWindow'];_0x54b6a3[_0x21d187('0x3d5')]();}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x790'),_0x19a951=>{const _0x3cbae9=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0x411ca6=BattleManager['_logWindow'];_0x411ca6[_0x3cbae9('0x269')]();}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x300'),_0x29afb7=>{const _0x4c89e4=_0x3219af;if(!SceneManager[_0x4c89e4('0x40d')]())return;const _0x5a1de3=BattleManager[_0x4c89e4('0x3f6')];_0x5a1de3[_0x4c89e4('0x869')]();}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_BattleLog_UI',_0x1a6836=>{const _0x3e664f=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3e664f('0x371')](_0x1a6836,_0x1a6836),SceneManager[_0x3e664f('0x684')][_0x3e664f('0x852')](_0x1a6836['ShowHide']);}),PluginManager[_0x3219af('0x725')](pluginData['name'],_0x3219af('0x527'),_0x4991da=>{const _0x4e9725=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0x165036=$gameTemp[_0x4e9725('0xdc')]();_0x165036[_0x4e9725('0x1bb')](_0x4e9725('0x4b2'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x48'),_0x5060a1=>{const _0x3a573=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0x4dfe4f=$gameTemp[_0x3a573('0xdc')](),_0x4db852=BattleManager['_logWindow'];_0x4db852[_0x3a573('0x38e')](),_0x4dfe4f[_0x3a573('0x1bb')](_0x3a573('0x4b2'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x3c8'),_0x1e6c1e=>{const _0x25248b=_0x3219af;if(!SceneManager[_0x25248b('0x40d')]())return;if(!Imported[_0x25248b('0x21c')])return;VisuMZ['ConvertParams'](_0x1e6c1e,_0x1e6c1e);const _0x475b37=$gameScreen[_0x25248b('0x6f0')]();_0x475b37[_0x25248b('0x7b9')]=_0x1e6c1e[_0x25248b('0x496')];}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x4de'),_0x24708f=>{const _0x184222=_0x3219af;if(!SceneManager[_0x184222('0x40d')]())return;if(!Imported[_0x184222('0x21c')])return;VisuMZ[_0x184222('0x371')](_0x24708f,_0x24708f);const _0x2b4b26=$gameTemp['getLastPluginCommandInterpreter'](),_0x4f6d7a=_0x24708f[_0x184222('0x55f')];$gameScreen[_0x184222('0x113')](_0x24708f[_0x184222('0x590')],_0x24708f[_0x184222('0x567')],_0x24708f[_0x184222('0x781')],_0x24708f['EasingType']);if(_0x4f6d7a)_0x2b4b26[_0x184222('0x1bb')](_0x184222('0x262'));}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x173'),_0x4f9c4f=>{const _0x4e9d29=_0x3219af;if(!SceneManager[_0x4e9d29('0x40d')]())return;if(!Imported[_0x4e9d29('0x21c')])return;VisuMZ[_0x4e9d29('0x371')](_0x4f9c4f,_0x4f9c4f);const _0x484614=$gameTemp[_0x4e9d29('0xdc')](),_0x2f6e3e=VisuMZ[_0x4e9d29('0x1da')](_0x4f9c4f[_0x4e9d29('0x7f6')]),_0x1bd16e=_0x4f9c4f[_0x4e9d29('0x55f')];$gameScreen[_0x4e9d29('0x223')](_0x2f6e3e,_0x4f9c4f[_0x4e9d29('0x781')],_0x4f9c4f['EasingType']);if(_0x1bd16e)_0x484614[_0x4e9d29('0x1bb')](_0x4e9d29('0x262'));}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x853'),_0x383126=>{const _0x4862a7=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4862a7('0x21c')])return;VisuMZ['ConvertParams'](_0x383126,_0x383126);const _0x5fb72c=$gameTemp['getLastPluginCommandInterpreter'](),_0x2b907c=_0x383126['WaitForCamera'];$gameScreen[_0x4862a7('0x59a')](_0x383126[_0x4862a7('0x470')],_0x383126[_0x4862a7('0x44f')],_0x383126[_0x4862a7('0x781')],_0x383126[_0x4862a7('0x25a')]);if(_0x2b907c)_0x5fb72c[_0x4862a7('0x1bb')](_0x4862a7('0x262'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x369'),_0x230a96=>{const _0x53ff23=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x53ff23('0x21c')])return;VisuMZ[_0x53ff23('0x371')](_0x230a96,_0x230a96);const _0x4d68c3=$gameTemp[_0x53ff23('0xdc')](),_0x3f4de4=_0x230a96[_0x53ff23('0x185')],_0x29d892=_0x230a96['ResetOffset'],_0x481ddd=_0x230a96[_0x53ff23('0x55f')];if(_0x3f4de4){if(_0x53ff23('0x2d6')==='HRyZF'){function _0x10360e(){const _0x33b60d=_0x53ff23,_0x36123b=this['_forcedBattlers'][_0x33b60d('0x4dd')](),_0x2c5f09=_0x36123b[0x0];return _0x2c5f09['_actions']=_0x2c5f09[_0x33b60d('0x512')]||[],_0x2c5f09[_0x33b60d('0x512')][0x0]=_0x36123b[0x1],_0x2c5f09;}}else{const _0x522a00=Math[_0x53ff23('0x219')](Graphics[_0x53ff23('0x106')]/0x2),_0x407842=Math[_0x53ff23('0x219')](Graphics[_0x53ff23('0x1e3')]/0x2);$gameScreen['setBattleCameraPoint'](_0x522a00,_0x407842,_0x230a96['Duration'],_0x230a96['EasingType']);}}if(_0x29d892){if(_0x53ff23('0xcb')!==_0x53ff23('0x64a'))$gameScreen[_0x53ff23('0x59a')](0x0,0x0,_0x230a96[_0x53ff23('0x781')],_0x230a96['EasingType']);else{function _0x1bef5d(){const _0x2a4db4=_0x53ff23,_0x592c80=_0x18b9bf['isImmortal']();this[_0x2a4db4('0x7b1')]()['attackStates']()['includes'](_0x3ad600[_0x2a4db4('0x388')]())&&_0x36775f[_0x2a4db4('0x6')](![]),_0x133a61[_0x2a4db4('0x1e6')][_0x2a4db4('0x3a2')][_0x2a4db4('0x448')](this,_0x16884d,_0x2c5920),_0x7d3543[_0x2a4db4('0x6')](_0x592c80);}}}if(_0x481ddd)_0x4d68c3['setWaitMode'](_0x53ff23('0x262'));}),PluginManager[_0x3219af('0x725')](pluginData['name'],_0x3219af('0x41e'),_0x288771=>{const _0x51a91b=_0x3219af;if(!SceneManager[_0x51a91b('0x40d')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x552ca0=$gameTemp[_0x51a91b('0xdc')]();if(!_0x552ca0)return;_0x552ca0[_0x51a91b('0x1bb')](_0x51a91b('0x262'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x139'),_0xcb39a2=>{const _0x40be0d=_0x3219af;if(!SceneManager[_0x40be0d('0x40d')]())return;if(!Imported[_0x40be0d('0x64e')])return;VisuMZ[_0x40be0d('0x371')](_0xcb39a2,_0xcb39a2);const _0x30510d=VisuMZ[_0x40be0d('0x1da')](_0xcb39a2[_0x40be0d('0x7f6')]),_0x5a0e9c=_0xcb39a2[_0x40be0d('0x751')][_0x40be0d('0x1b9')]()[_0x40be0d('0x580')]();for(const _0x130fcc of _0x30510d){if(_0x40be0d('0x6e8')===_0x40be0d('0x6e8')){if(!_0x130fcc)continue;_0x130fcc[_0x40be0d('0x7a5')](_0x5a0e9c);}else{function _0x4acad1(){return _0x347222[_0x4652d0];}}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x6fe'),_0x4d6419=>{const _0x1eb866=_0x3219af;if(!SceneManager[_0x1eb866('0x40d')]())return;if(!Imported[_0x1eb866('0x64e')])return;VisuMZ[_0x1eb866('0x371')](_0x4d6419,_0x4d6419);const _0x3d911d=VisuMZ[_0x1eb866('0x1da')](_0x4d6419[_0x1eb866('0x7f6')]),_0x401bcf=_0x4d6419['TimeScale'];for(const _0x28680a of _0x3d911d){if(!_0x28680a)continue;_0x28680a[_0x1eb866('0x34e')]()[_0x1eb866('0x20c')]=_0x401bcf;}}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x4b9'),_0x27670e=>{const _0x19316=_0x3219af;if(!SceneManager[_0x19316('0x40d')]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;VisuMZ['ConvertParams'](_0x27670e,_0x27670e);const _0x3b506a=BattleManager[_0x19316('0x4c5')],_0x2180ca=_0x27670e['Elements'];if(!_0x3b506a)return;_0x3b506a[_0x19316('0x430')]=_0x2180ca;}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x483'),_0x401dd9=>{const _0x2858a8=_0x3219af;if(!SceneManager[_0x2858a8('0x40d')]())return;if(!Imported[_0x2858a8('0xb2')])return;const _0x6f2620=BattleManager[_0x2858a8('0x4c5')];if(!_0x6f2620)return;_0x6f2620[_0x2858a8('0x2e')]();}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x530'),_0x4c7394=>{const _0x1575d6=_0x3219af;if(!SceneManager[_0x1575d6('0x40d')]())return;if(!Imported[_0x1575d6('0xb2')])return;VisuMZ[_0x1575d6('0x371')](_0x4c7394,_0x4c7394);const _0x18ba86=BattleManager[_0x1575d6('0x4c5')],_0x5127d8=_0x4c7394[_0x1575d6('0x847')];if(!_0x18ba86)return;_0x18ba86[_0x1575d6('0x375')]=_0x5127d8;}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x635'),_0x5ea05e=>{const _0x49f471=_0x3219af;if(!SceneManager[_0x49f471('0x40d')]())return;if(!Imported[_0x49f471('0xb2')])return;const _0x25b192=BattleManager[_0x49f471('0x4c5')];if(!_0x25b192)return;_0x25b192[_0x49f471('0x575')]=!![];}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x2db'),_0x36b4bd=>{const _0x57cd62=_0x3219af;if(!SceneManager[_0x57cd62('0x40d')]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x5e46f0=SceneManager[_0x57cd62('0x684')]['_spriteset'];if(!_0x5e46f0)return;VisuMZ[_0x57cd62('0x371')](_0x36b4bd,_0x36b4bd);const _0x1d5802=_0x36b4bd[_0x57cd62('0xb1')]||0x1,_0x35ef3b=_0x36b4bd[_0x57cd62('0x781')]||0x1,_0x44ae31=_0x36b4bd[_0x57cd62('0x25a')]||_0x57cd62('0x576');_0x5e46f0[_0x57cd62('0x749')](_0x1d5802,_0x35ef3b,_0x44ae31);}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Impact_MotionBlurScreen',_0x4b5f44=>{const _0x4c8e0f=_0x3219af;if(!SceneManager[_0x4c8e0f('0x40d')]())return;if(!Imported[_0x4c8e0f('0x39b')])return;const _0x1b2151=SceneManager[_0x4c8e0f('0x684')][_0x4c8e0f('0x50d')];if(!_0x1b2151)return;VisuMZ['ConvertParams'](_0x4b5f44,_0x4b5f44);const _0x26ed30=Number(_0x4b5f44['Angle'])||0x0,_0x159089=Number(_0x4b5f44[_0x4c8e0f('0x741')]),_0xb5e8e4=_0x4b5f44[_0x4c8e0f('0x781')]||0x1,_0x5d79e6=_0x4b5f44[_0x4c8e0f('0x25a')]||'Linear';_0x1b2151[_0x4c8e0f('0x225')](_0x26ed30,_0x159089,_0xb5e8e4,_0x5d79e6);}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Impact_MotionBlurTarget',_0x527b80=>{const _0x4a8c61=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4a8c61('0x39b')])return;const _0xab4513=SceneManager[_0x4a8c61('0x684')]['_spriteset'];if(!_0xab4513)return;VisuMZ[_0x4a8c61('0x371')](_0x527b80,_0x527b80);const _0x101bd0=Number(_0x527b80[_0x4a8c61('0x636')])||0x0,_0x594ffa=Number(_0x527b80[_0x4a8c61('0x741')]),_0x2514b2=_0x527b80[_0x4a8c61('0x781')]||0x1,_0x5d5a8e=_0x527b80[_0x4a8c61('0x25a')]||'Linear',_0x2dfcf6=VisuMZ['CreateActionSequenceTargets'](_0x527b80['Targets']);for(const _0x260b13 of _0x2dfcf6){if(_0x4a8c61('0x295')!==_0x4a8c61('0x295')){function _0x201445(){const _0x27322a=_0x4a8c61;if(this[_0x27322a('0x620')]>0x0)this[_0x27322a('0x620')]-=0x10;}}else{if(!_0x260b13)continue;if(!_0x260b13[_0x4a8c61('0x53f')]())continue;_0x260b13[_0x4a8c61('0x53f')]()[_0x4a8c61('0x225')](_0x101bd0,_0x594ffa,_0x2514b2,_0x5d5a8e);}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x299'),_0x22422d=>{const _0x42b791=_0x3219af;if(!SceneManager[_0x42b791('0x40d')]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ['ConvertParams'](_0x22422d,_0x22422d);const _0x252185={'delay':_0x22422d[_0x42b791('0x6b6')],'duration':_0x22422d[_0x42b791('0x7d1')],'hue':_0x22422d[_0x42b791('0x76b')],'opacityStart':_0x22422d[_0x42b791('0x274')],'tone':_0x22422d[_0x42b791('0x49d')],'visible':!![]},_0x2ece8d=VisuMZ[_0x42b791('0x1da')](_0x22422d[_0x42b791('0x7f6')]);for(const _0x4097b6 of _0x2ece8d){if(!_0x4097b6)continue;_0x4097b6[_0x42b791('0x36e')](_0x252185);}}),PluginManager['registerCommand'](pluginData['name'],_0x3219af('0x370'),_0x5c64c6=>{const _0x50f490=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x50f490('0x39b')])return;VisuMZ['ConvertParams'](_0x5c64c6,_0x5c64c6);const _0x1c8809=VisuMZ[_0x50f490('0x1da')](_0x5c64c6['Targets']);for(const _0x16238f of _0x1c8809){if(!_0x16238f)continue;_0x16238f[_0x50f490('0x160')]();}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Impact_ShockwavePoint',_0x1a45cd=>{const _0x1eda4a=_0x3219af;if(!Imported[_0x1eda4a('0x39b')])return;const _0x11342b=SceneManager[_0x1eda4a('0x684')][_0x1eda4a('0x50d')];if(!_0x11342b)return;VisuMZ[_0x1eda4a('0x371')](_0x1a45cd,_0x1a45cd);const _0x4a72d3=_0x1a45cd['X']||0x0,_0x1dfb37=_0x1a45cd['Y']||0x0,_0x2d5051=_0x1a45cd[_0x1eda4a('0x3cc')]||0x0,_0x427edf=_0x1a45cd[_0x1eda4a('0x44a')]||0x0,_0x52868a=_0x1a45cd[_0x1eda4a('0x781')]||0x1;_0x11342b[_0x1eda4a('0x373')](_0x4a72d3,_0x1dfb37,_0x2d5051,_0x427edf,_0x52868a);}),PluginManager['registerCommand'](pluginData['name'],_0x3219af('0x2f9'),_0x3dd3bd=>{const _0xa6d23e=_0x3219af;if(!SceneManager[_0xa6d23e('0x40d')]())return;if(!Imported[_0xa6d23e('0x39b')])return;const _0x360e64=SceneManager['_scene']['_spriteset'];if(!_0x360e64)return;VisuMZ[_0xa6d23e('0x371')](_0x3dd3bd,_0x3dd3bd);const _0x2365c9=VisuMZ[_0xa6d23e('0x1da')](_0x3dd3bd['Targets']),_0x58168d=_0x3dd3bd[_0xa6d23e('0x62e')],_0x3d5228=_0x3dd3bd[_0xa6d23e('0x3cc')]||0x0,_0x42ff86=_0x3dd3bd['Wave']||0x0,_0x441e23=_0x3dd3bd[_0xa6d23e('0x781')]||0x1;for(const _0x55d56c of _0x2365c9){if(_0xa6d23e('0x59c')!=='GKIeH'){if(!_0x55d56c)continue;if(!_0x55d56c[_0xa6d23e('0x53f')]())continue;const _0x55b19b=_0x55d56c[_0xa6d23e('0x53f')]();let _0x308f6c=_0x55b19b[_0xa6d23e('0x5af')],_0x595a9a=_0x55b19b[_0xa6d23e('0x833')];_0x308f6c+=(Graphics[_0xa6d23e('0x106')]-Graphics[_0xa6d23e('0x5b4')])/0x2,_0x595a9a+=(Graphics[_0xa6d23e('0x1e3')]-Graphics['boxHeight'])/0x2;if(_0x58168d[_0xa6d23e('0x6f1')](/front/i))_0x308f6c+=(_0x55d56c[_0xa6d23e('0xf9')]()?0x1:-0x1)*_0x55b19b[_0xa6d23e('0x809')]()/0x2;else _0x58168d['match'](/back/i)&&(_0x308f6c+=(_0x55d56c[_0xa6d23e('0xf9')]()?-0x1:0x1)*_0x55b19b[_0xa6d23e('0x809')]()/0x2);if(_0x58168d['match'](/head/i))_0x595a9a-=_0x55b19b['mainSpriteHeight']();else _0x58168d[_0xa6d23e('0x6f1')](/center/i)&&(_0x595a9a-=_0x55b19b[_0xa6d23e('0x85')]()/0x2);_0x360e64['setupShockwaveImpactFilter'](_0x308f6c,_0x595a9a,_0x3d5228,_0x42ff86,_0x441e23);}else{function _0x2250b9(){const _0x57dc3c=_0xa6d23e;if(!_0x2aff4f[_0x57dc3c('0x40d')]())return;_0x5a16d0[_0x57dc3c('0x371')](_0x1fafc6,_0x53a34b);const _0x21869e=_0x1f95fe[_0x57dc3c('0xdc')](),_0x3eb4f3=_0x42324a['JumpToLabel'];if(!_0x21869e)return;_0x2d653a[_0x57dc3c('0x3d6')]++,_0x4812a7[_0x57dc3c('0x6b0')]=_0x205dda['_allTargets'][_0x438b72[_0x57dc3c('0x3d6')]]||null,_0x23e962['_target']&&_0x3eb4f3[_0x57dc3c('0x7c2')]()[_0x57dc3c('0x580')]()!==_0x57dc3c('0x48d')&&_0x21869e[_0x57dc3c('0x21e')]([_0x3eb4f3]);}}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x11d'),_0x50f6ba=>{const _0x99c429=_0x3219af;if(!SceneManager[_0x99c429('0x40d')]())return;if(!Imported[_0x99c429('0x39b')])return;const _0x4909c7=SceneManager['_scene'][_0x99c429('0x50d')];if(!_0x4909c7)return;VisuMZ[_0x99c429('0x371')](_0x50f6ba,_0x50f6ba);const _0x459eb9=VisuMZ[_0x99c429('0x1da')](_0x50f6ba[_0x99c429('0x7f6')]),_0x5e867c=_0x50f6ba[_0x99c429('0x62e')],_0x1291ce=_0x50f6ba[_0x99c429('0x3cc')]||0x0,_0x46afea=_0x50f6ba[_0x99c429('0x44a')]||0x0,_0x362740=_0x50f6ba[_0x99c429('0x781')]||0x1,_0x1f1817=Math[_0x99c429('0x7a2')](..._0x459eb9['map'](_0x298510=>_0x298510['battler']()[_0x99c429('0x5af')]-_0x298510[_0x99c429('0x53f')]()[_0x99c429('0x809')]()/0x2)),_0x4aa486=Math['max'](..._0x459eb9[_0x99c429('0x75a')](_0x432f6e=>_0x432f6e[_0x99c429('0x53f')]()[_0x99c429('0x5af')]+_0x432f6e[_0x99c429('0x53f')]()[_0x99c429('0x809')]()/0x2)),_0x5f1731=Math['min'](..._0x459eb9[_0x99c429('0x75a')](_0x1f20dd=>_0x1f20dd[_0x99c429('0x53f')]()[_0x99c429('0x833')]-_0x1f20dd[_0x99c429('0x53f')]()[_0x99c429('0x85')]())),_0x1dcbc4=Math[_0x99c429('0x794')](..._0x459eb9[_0x99c429('0x75a')](_0x2f8ee6=>_0x2f8ee6['battler']()[_0x99c429('0x833')])),_0x2be042=_0x459eb9[_0x99c429('0x686')](_0x1c51c0=>_0x1c51c0[_0x99c429('0x857')]())[_0x99c429('0x2da')],_0x8c9aeb=_0x459eb9[_0x99c429('0x686')](_0x360734=>_0x360734[_0x99c429('0xf9')]())[_0x99c429('0x2da')];let _0x58b5d2=0x0,_0x56214c=0x0;if(_0x5e867c['match'](/front/i)){if(_0x99c429('0x2a6')!==_0x99c429('0x2a6')){function _0x58d442(){const _0x53aa69=_0x99c429;_0x13c1c7[_0x53aa69('0x1e6')][_0x53aa69('0x76c')][_0x53aa69('0x448')](this,_0x380d63),this[_0x53aa69('0x39f')]();}}else _0x58b5d2=_0x2be042>=_0x8c9aeb?_0x1f1817:_0x4aa486;}else{if(_0x5e867c[_0x99c429('0x6f1')](/middle/i))_0x58b5d2=(_0x1f1817+_0x4aa486)/0x2,melee=-0x1;else{if(_0x5e867c[_0x99c429('0x6f1')](/back/i)){if('HFJiL'!=='HFJiL'){function _0xfc3eca(){const _0x2fd319=_0x99c429;_0x53c445=_0x20eb9d[_0x2fd319('0x5f0')];}}else _0x58b5d2=_0x2be042>=_0x8c9aeb?_0x4aa486:_0x1f1817;}}}if(_0x5e867c[_0x99c429('0x6f1')](/head/i))_0x56214c=_0x5f1731;else{if(_0x5e867c[_0x99c429('0x6f1')](/center/i))_0x56214c=(_0x5f1731+_0x1dcbc4)/0x2;else _0x5e867c['match'](/base/i)&&(_0x56214c=_0x1dcbc4);}_0x58b5d2+=(Graphics[_0x99c429('0x106')]-Graphics[_0x99c429('0x5b4')])/0x2,_0x56214c+=(Graphics['height']-Graphics[_0x99c429('0x729')])/0x2,_0x4909c7[_0x99c429('0x373')](_0x58b5d2,_0x56214c,_0x1291ce,_0x46afea,_0x362740);}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x7d5'),_0x5469a7=>{const _0xeea9c=_0x3219af;if(!Imported[_0xeea9c('0x39b')])return;const _0x3a46c1=SceneManager[_0xeea9c('0x684')][_0xeea9c('0x50d')];if(!_0x3a46c1)return;VisuMZ[_0xeea9c('0x371')](_0x5469a7,_0x5469a7);const _0x55ab19=_0x5469a7['X']||0x0,_0x20f50c=_0x5469a7['Y']||0x0,_0x1e9084=_0x5469a7[_0xeea9c('0x7a')]||0x0,_0xad592b=_0x5469a7[_0xeea9c('0x821')]||0x0,_0x3c2862=_0x5469a7[_0xeea9c('0x781')]||0x1,_0x189993=_0x5469a7[_0xeea9c('0x25a')]||_0xeea9c('0x576');_0x3a46c1['setupZoomBlurImpactFilter'](_0x1e9084,_0x55ab19,_0x20f50c,_0xad592b,_0x3c2862,_0x189993);}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x1c8'),_0x364fe1=>{const _0x489ba7=_0x3219af;if(!Imported[_0x489ba7('0x39b')])return;const _0x50a64=SceneManager[_0x489ba7('0x684')][_0x489ba7('0x50d')];if(!_0x50a64)return;VisuMZ[_0x489ba7('0x371')](_0x364fe1,_0x364fe1);const _0x54e73e=VisuMZ['CreateActionSequenceTargets'](_0x364fe1[_0x489ba7('0x7f6')]),_0x18e541=_0x364fe1[_0x489ba7('0x62e')],_0x1a2ebc=_0x364fe1[_0x489ba7('0x7a')]||0x0,_0x18bd42=_0x364fe1['Radius']||0x0,_0x13a2af=_0x364fe1['Duration']||0x1,_0x1c312b=_0x364fe1[_0x489ba7('0x25a')]||_0x489ba7('0x576'),_0x1da05e=Math['min'](..._0x54e73e['map'](_0x3732f5=>_0x3732f5[_0x489ba7('0x53f')]()['_baseX']-_0x3732f5[_0x489ba7('0x53f')]()[_0x489ba7('0x809')]()/0x2)),_0x595baf=Math[_0x489ba7('0x794')](..._0x54e73e[_0x489ba7('0x75a')](_0x25519a=>_0x25519a[_0x489ba7('0x53f')]()[_0x489ba7('0x5af')]+_0x25519a[_0x489ba7('0x53f')]()[_0x489ba7('0x809')]()/0x2)),_0x53ddc8=Math[_0x489ba7('0x7a2')](..._0x54e73e['map'](_0x2158b4=>_0x2158b4[_0x489ba7('0x53f')]()[_0x489ba7('0x833')]-_0x2158b4[_0x489ba7('0x53f')]()[_0x489ba7('0x85')]())),_0x28713d=Math[_0x489ba7('0x794')](..._0x54e73e[_0x489ba7('0x75a')](_0x2d9e1c=>_0x2d9e1c[_0x489ba7('0x53f')]()[_0x489ba7('0x833')])),_0xdf9bd2=_0x54e73e['filter'](_0x3a1df6=>_0x3a1df6[_0x489ba7('0x857')]())[_0x489ba7('0x2da')],_0x4cc216=_0x54e73e[_0x489ba7('0x686')](_0x3b1cb3=>_0x3b1cb3[_0x489ba7('0xf9')]())[_0x489ba7('0x2da')];let _0x383deb=0x0,_0x14ddcd=0x0;if(_0x18e541[_0x489ba7('0x6f1')](/front/i)){if(_0x489ba7('0x4b4')!=='INtFp'){function _0x425e07(){const _0x1f6454=_0x489ba7;this[_0x1f6454('0x6d2')]=![];}}else _0x383deb=_0xdf9bd2>=_0x4cc216?_0x1da05e:_0x595baf;}else{if(_0x18e541[_0x489ba7('0x6f1')](/middle/i))_0x383deb=(_0x1da05e+_0x595baf)/0x2,melee=-0x1;else _0x18e541[_0x489ba7('0x6f1')](/back/i)&&(_0x383deb=_0xdf9bd2>=_0x4cc216?_0x595baf:_0x1da05e);}if(_0x18e541[_0x489ba7('0x6f1')](/head/i))_0x14ddcd=_0x53ddc8;else{if(_0x18e541[_0x489ba7('0x6f1')](/center/i))_0x14ddcd=(_0x53ddc8+_0x28713d)/0x2;else _0x18e541[_0x489ba7('0x6f1')](/base/i)&&(_0x14ddcd=_0x28713d);}_0x383deb+=(Graphics['width']-Graphics[_0x489ba7('0x5b4')])/0x2,_0x14ddcd+=(Graphics[_0x489ba7('0x1e3')]-Graphics[_0x489ba7('0x729')])/0x2,_0x50a64[_0x489ba7('0xe3')](_0x1a2ebc,_0x383deb,_0x14ddcd,_0x18bd42,_0x13a2af,_0x1c312b);}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],'ActSeq_Mechanics_ActionEffect',_0x520cd1=>{const _0x84f9c4=_0x3219af;if(!SceneManager[_0x84f9c4('0x40d')]())return;VisuMZ[_0x84f9c4('0x371')](_0x520cd1,_0x520cd1);const _0x3d7eaf=$gameTemp[_0x84f9c4('0xdc')](),_0x27a3b9=BattleManager[_0x84f9c4('0x4c5')],_0x4afa11=BattleManager[_0x84f9c4('0x31a')],_0x1308fb=BattleManager[_0x84f9c4('0x3f6')];if(!_0x3d7eaf||!_0x27a3b9||!_0x4afa11)return;if(!_0x27a3b9[_0x84f9c4('0x259')]())return;const _0x45fe21=VisuMZ[_0x84f9c4('0x1da')](_0x520cd1[_0x84f9c4('0x7f6')]);for(const _0x1136ba of _0x45fe21){if(_0x84f9c4('0x384')==='bqCCR'){function _0x50d2ca(){const _0x3fd9ab=_0x84f9c4;_0x3e4df7['result']()[_0x3fd9ab('0x58d')]>0x0&&!_0x1ec9af['result']()['drain']&&this['push'](_0x3fd9ab('0x829'),_0x4ff4aa),_0x4d712d[_0x3fd9ab('0x778')]()[_0x3fd9ab('0x58d')]<0x0&&this[_0x3fd9ab('0x453')](_0x3fd9ab('0x338'),_0x102df7),_0x3f43b8['BattleCore'][_0x3fd9ab('0x885')][_0x3fd9ab('0x69c')][_0x3fd9ab('0x87')]&&this[_0x3fd9ab('0x453')](_0x3fd9ab('0x380'),this[_0x3fd9ab('0xf2')](_0x144d84));}}else{if(!_0x1136ba)continue;_0x1308fb['push'](_0x84f9c4('0x892'),_0x4afa11,_0x1136ba);}}_0x3d7eaf[_0x84f9c4('0x1bb')](_0x84f9c4('0x4b2'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x72e'),_0x47d584=>{const _0x3a372d=_0x3219af;if(!SceneManager[_0x3a372d('0x40d')]())return;VisuMZ[_0x3a372d('0x371')](_0x47d584,_0x47d584);const _0x18356c=[_0x3a372d('0x58e'),_0x3a372d('0x1a4'),_0x3a372d('0x472'),_0x3a372d('0x3d8'),_0x3a372d('0x2c2'),_0x3a372d('0x43b'),'AGI',_0x3a372d('0x721')],_0x39b6f9=_0x47d584[_0x3a372d('0x4d3')],_0xc31417=_0x47d584[_0x3a372d('0x189')],_0xed7eeb=_0x47d584[_0x3a372d('0x4d2')],_0x124bce=VisuMZ[_0x3a372d('0x1da')](_0x47d584[_0x3a372d('0x7f6')]);for(const _0x56f42a of _0x124bce){if(!_0x56f42a)continue;for(const _0x235061 of _0x39b6f9){const _0x2bf20b=_0x18356c[_0x3a372d('0x589')](_0x235061[_0x3a372d('0x7c2')]()[_0x3a372d('0x580')]());_0x2bf20b>=0x0&&_0x2bf20b<=0x7&&_0x56f42a[_0x3a372d('0x411')](_0x2bf20b,_0xed7eeb);}for(const _0x3c86eb of _0xc31417){const _0x151eb3=_0x18356c[_0x3a372d('0x589')](_0x3c86eb[_0x3a372d('0x7c2')]()[_0x3a372d('0x580')]());_0x151eb3>=0x0&&_0x151eb3<=0x7&&_0x56f42a['addDebuff'](_0x151eb3,_0xed7eeb);}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x5df'),_0x2ba30c=>{const _0x3d7528=_0x3219af;if(!SceneManager[_0x3d7528('0x40d')]())return;VisuMZ[_0x3d7528('0x371')](_0x2ba30c,_0x2ba30c);const _0x316aaa=_0x2ba30c[_0x3d7528('0x4f4')],_0xe20da7=VisuMZ[_0x3d7528('0x1da')](_0x2ba30c[_0x3d7528('0x7f6')]);for(const _0x49cdb9 of _0xe20da7){if(!_0x49cdb9)continue;for(const _0x418980 of _0x316aaa){_0x49cdb9[_0x3d7528('0x350')](_0x418980);}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Mechanics_ArmorPenetration',_0x13c9ca=>{const _0x52f6e3=_0x3219af;if(!SceneManager[_0x52f6e3('0x40d')]())return;VisuMZ[_0x52f6e3('0x371')](_0x13c9ca,_0x13c9ca);const _0x43a36e=BattleManager[_0x52f6e3('0x4c5')],_0x434d86={'arPenRate':_0x13c9ca['ArPenRate'],'arPenFlat':_0x13c9ca[_0x52f6e3('0x218')],'arRedRate':_0x13c9ca[_0x52f6e3('0x7ff')],'arRedFlat':_0x13c9ca[_0x52f6e3('0x6c1')]};_0x43a36e[_0x52f6e3('0xc0')]=_0x434d86;}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x14'),_0x55206f=>{const _0x4afd87=_0x3219af;if(!SceneManager[_0x4afd87('0x40d')]())return;if(!Imported['VisuMZ_2_BattleSystemATB'])return;VisuMZ[_0x4afd87('0x371')](_0x55206f,_0x55206f);const _0x164e1c=VisuMZ[_0x4afd87('0x1da')](_0x55206f['Targets']),_0x7da4f4=_0x55206f[_0x4afd87('0x2ab')],_0x32f332=_0x55206f[_0x4afd87('0x2ab')],_0x5613af=_0x55206f['Interrupt'];for(const _0x148677 of _0x164e1c){if(!_0x148677)continue;if(_0x148677[_0x4afd87('0x14c')]())_0x148677[_0x4afd87('0x838')](_0x7da4f4);else{if(_0x148677['isAtbCastingState']()){_0x148677[_0x4afd87('0x6c8')](_0x32f332);if(_0x5613af)_0x148677[_0x4afd87('0x770')]();}}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Mechanics_Collapse',_0x5a5b96=>{const _0x227214=_0x3219af;if(!SceneManager[_0x227214('0x40d')]())return;VisuMZ['ConvertParams'](_0x5a5b96,_0x5a5b96);const _0x1c67e5=$gameTemp[_0x227214('0xdc')](),_0x57aacc=BattleManager[_0x227214('0x4c5')],_0x1b7146=BattleManager[_0x227214('0x31a')];if(!_0x1c67e5||!_0x57aacc||!_0x1b7146)return;if(!_0x57aacc[_0x227214('0x259')]())return;const _0x13982c=VisuMZ['CreateActionSequenceTargets'](_0x5a5b96[_0x227214('0x7f6')]);for(const _0xa11a48 of _0x13982c){if(!_0xa11a48)continue;_0x5a5b96['ForceDeath']&&(_0xa11a48[_0x227214('0x616')](),_0xa11a48[_0x227214('0x350')](_0xa11a48['deathStateId']())),_0xa11a48['isDeathStateAffected']()&&_0xa11a48[_0x227214('0x84c')]();}_0x1c67e5[_0x227214('0x1bb')](_0x227214('0x525'));}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_CtbOrder',_0x100832=>{const _0x3ccef8=_0x3219af;if(!SceneManager[_0x3ccef8('0x40d')]())return;if(!Imported[_0x3ccef8('0x73a')])return;VisuMZ[_0x3ccef8('0x371')](_0x100832,_0x100832);const _0x3c6fff=VisuMZ[_0x3ccef8('0x1da')](_0x100832['Targets']),_0x5b28ea=_0x100832[_0x3ccef8('0x3fa')];for(const _0x309a78 of _0x3c6fff){if(_0x3ccef8('0x24e')===_0x3ccef8('0x83d')){function _0xf65ecc(){const _0x45e5ae=_0x3ccef8;return this[_0x45e5ae('0x7f9')]();}}else{if(!_0x309a78)continue;_0x309a78[_0x3ccef8('0x62')](_0x5b28ea);}}}),PluginManager[_0x3219af('0x725')](pluginData['name'],_0x3219af('0x4a8'),_0x445d15=>{const _0x86c0f=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x86c0f('0x73a')])return;VisuMZ[_0x86c0f('0x371')](_0x445d15,_0x445d15);const _0x515ae2=VisuMZ['CreateActionSequenceTargets'](_0x445d15[_0x86c0f('0x7f6')]),_0x25ff8f=_0x445d15[_0x86c0f('0x2ab')],_0x30a3a8=_0x445d15[_0x86c0f('0x2ab')];for(const _0x599955 of _0x515ae2){if(!_0x599955)continue;if(_0x599955[_0x86c0f('0x8b')]===_0x86c0f('0x882'))_0x599955[_0x86c0f('0x168')](_0x25ff8f);else _0x599955[_0x86c0f('0x8b')]===_0x86c0f('0x498')&&_0x599955[_0x86c0f('0x531')](_0x30a3a8);}}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x578'),_0x29d10c=>{const _0x30ea31=_0x3219af;if(!SceneManager[_0x30ea31('0x40d')]())return;VisuMZ[_0x30ea31('0x371')](_0x29d10c,_0x29d10c);const _0x524027=VisuMZ[_0x30ea31('0x1da')](_0x29d10c[_0x30ea31('0x7f6')]);for(const _0xc1bdb5 of _0x524027){if(!_0xc1bdb5)continue;if(_0xc1bdb5[_0x30ea31('0xd6')]())_0xc1bdb5['startDamagePopup']();}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x651'),_0x21fe96=>{const _0x48221b=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x21fe96,_0x21fe96);const _0x2e91ee=$gameTemp[_0x48221b('0xdc')](),_0x6d54b6=BattleManager[_0x48221b('0x31a')],_0x316da7=_0x21fe96['JumpToLabel'];if(!_0x2e91ee)return;if(!_0x6d54b6)return;if(_0x6d54b6&&_0x6d54b6[_0x48221b('0x71f')]()&&_0x316da7[_0x48221b('0x7c2')]()[_0x48221b('0x580')]()!=='UNTITLED'){if(_0x48221b('0x14a')!==_0x48221b('0x660'))_0x2e91ee[_0x48221b('0x21e')]([_0x316da7]);else{function _0x2032bc(){const _0x1ac5fa=_0x48221b;this[_0x1ac5fa('0x62f')]['x']=_0x21c06b['width']-(_0x3adaf9[_0x1ac5fa('0x106')]-_0x24bb9a[_0x1ac5fa('0x5b4')])/0x2-this[_0x1ac5fa('0x62f')][_0x1ac5fa('0x106')]-0x4;}}}}),PluginManager['registerCommand'](pluginData['name'],_0x3219af('0x668'),_0x24f730=>{const _0x18bc96=_0x3219af;if(!SceneManager[_0x18bc96('0x40d')]())return;VisuMZ[_0x18bc96('0x371')](_0x24f730,_0x24f730);const _0x99c8f0=VisuMZ[_0x18bc96('0x1da')](_0x24f730[_0x18bc96('0x7f6')]),_0x3eb008=_0x24f730[_0x18bc96('0x88b')],_0x5428fb=_0x24f730[_0x18bc96('0xd3')],_0x158b24=_0x24f730['MP_Rate'],_0x1a9628=_0x24f730[_0x18bc96('0x4c6')],_0x319300=_0x24f730[_0x18bc96('0x2a0')],_0x698ac6=_0x24f730[_0x18bc96('0xeb')],_0x2736de=_0x24f730[_0x18bc96('0x771')];for(const _0x4a2091 of _0x99c8f0){if(!_0x4a2091)continue;const _0x2812f8=_0x4a2091[_0x18bc96('0x705')](),_0x1290b6=Math[_0x18bc96('0x219')](_0x3eb008*_0x4a2091[_0x18bc96('0x4c9')]+_0x5428fb),_0x35b12c=Math[_0x18bc96('0x219')](_0x158b24*_0x4a2091[_0x18bc96('0x33e')]+_0x1a9628),_0x5ca362=Math[_0x18bc96('0x219')](_0x319300*_0x4a2091[_0x18bc96('0x1d4')]()+_0x698ac6);if(_0x1290b6!==0x0)_0x4a2091[_0x18bc96('0x2e8')](_0x1290b6);if(_0x35b12c!==0x0)_0x4a2091[_0x18bc96('0x4c7')](_0x35b12c);if(_0x5ca362!==0x0)_0x4a2091['gainTp'](_0x5ca362);if(_0x2736de)_0x4a2091[_0x18bc96('0x5f2')]();if(_0x2812f8&&_0x4a2091['isDead']()){if(_0x18bc96('0x5d1')!==_0x18bc96('0x5d1')){function _0x3dac3f(){return![];}}else _0x4a2091['performCollapse']();}}}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],'ActSeq_Mechanics_Immortal',_0x10ae59=>{const _0xc2e366=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0xc2e366('0x371')](_0x10ae59,_0x10ae59);const _0x1a54fa=VisuMZ['CreateActionSequenceTargets'](_0x10ae59[_0xc2e366('0x7f6')]);for(const _0x367aa0 of _0x1a54fa){if(!_0x367aa0)continue;_0x367aa0['setImmortal'](_0x10ae59['Immortal']);}}),PluginManager['registerCommand'](pluginData['name'],_0x3219af('0x441'),_0x49e36e=>{const _0x899dcc=_0x3219af;if(!SceneManager[_0x899dcc('0x40d')]())return;VisuMZ[_0x899dcc('0x371')](_0x49e36e,_0x49e36e);const _0x64c3d1=BattleManager[_0x899dcc('0x4c5')],_0x20d8c9={'criticalHitRate':_0x49e36e[_0x899dcc('0x28f')],'criticalHitFlat':_0x49e36e[_0x899dcc('0x535')],'criticalDmgRate':_0x49e36e['CriticalDmgRate'],'criticalDmgFlat':_0x49e36e[_0x899dcc('0x731')],'damageRate':_0x49e36e[_0x899dcc('0x12d')],'damageFlat':_0x49e36e[_0x899dcc('0x4d0')],'hitRate':_0x49e36e[_0x899dcc('0xda')],'hitFlat':_0x49e36e[_0x899dcc('0x33a')]};_0x64c3d1[_0x899dcc('0x827')]=_0x20d8c9;}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x1fc'),_0xd3256=>{const _0x250bb8=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0xd3256,_0xd3256);const _0x3d93d0=[_0x250bb8('0x58e'),_0x250bb8('0x1a4'),_0x250bb8('0x472'),'DEF',_0x250bb8('0x2c2'),'MDF',_0x250bb8('0x22a'),_0x250bb8('0x721')],_0x51a200=_0xd3256[_0x250bb8('0x4d3')],_0x1e0bcf=_0xd3256[_0x250bb8('0x189')],_0x27fbdc=VisuMZ[_0x250bb8('0x1da')](_0xd3256[_0x250bb8('0x7f6')]);for(const _0x1f4387 of _0x27fbdc){if(_0x250bb8('0x4df')!==_0x250bb8('0x5cf')){if(!_0x1f4387)continue;for(const _0x50b21a of _0x51a200){const _0x55756e=_0x3d93d0['indexOf'](_0x50b21a[_0x250bb8('0x7c2')]()['trim']());if(_0x55756e>=0x0&&_0x55756e<=0x7&&_0x1f4387['isBuffAffected'](_0x55756e)){if(_0x250bb8('0x68e')!==_0x250bb8('0x68e')){function _0x16995c(){const _0x19fe35=_0x250bb8;if(this[_0x19fe35('0x884')][_0x19fe35('0x47c')]!==_0x2dee7c)return this[_0x19fe35('0x884')]['svAnchorX'];return this[_0x19fe35('0x16d')]()['note'][_0x19fe35('0x6f1')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x19fe35('0x884')][_0x19fe35('0x47c')]=_0xbfb9eb(_0x51d539['$1']),this[_0x19fe35('0x884')][_0x19fe35('0x58f')]=_0x104218(_0x312e83['$2'])):this[_0x19fe35('0x884')][_0x19fe35('0x47c')]=_0x401dfe['prototype'][_0x19fe35('0x15')]['call'](this),this[_0x19fe35('0x884')]['svAnchorX'];}}else _0x1f4387[_0x250bb8('0x283')](_0x55756e);}}for(const _0x11eb9a of _0x1e0bcf){const _0x262557=_0x3d93d0[_0x250bb8('0x589')](_0x11eb9a[_0x250bb8('0x7c2')]()['trim']());if(_0x262557>=0x0&&_0x262557<=0x7&&_0x1f4387[_0x250bb8('0x871')](_0x262557)){if(_0x250bb8('0x7b6')===_0x250bb8('0x7b6'))_0x1f4387[_0x250bb8('0x283')](_0x262557);else{function _0x34d783(){const _0x391ee7=_0x250bb8;this[_0x391ee7('0x1af')]['setHue'](_0xf85100);}}}}}else{function _0x85cb54(){const _0xb1b7ec=_0x250bb8;_0x3676d0[_0xb1b7ec('0x1e6')][_0xb1b7ec('0x709')]['call'](this,_0x10fc17,_0x107b15),this['callNextMethod']();}}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x3c3'),_0x4840ff=>{const _0x7e8cc8=_0x3219af;if(!SceneManager[_0x7e8cc8('0x40d')]())return;VisuMZ['ConvertParams'](_0x4840ff,_0x4840ff);const _0x59357b=_0x4840ff['States'],_0x2f5c06=VisuMZ[_0x7e8cc8('0x1da')](_0x4840ff['Targets']);for(const _0x4e75a2 of _0x2f5c06){if(_0x7e8cc8('0xe8')!=='WPSIw'){if(!_0x4e75a2)continue;for(const _0x328e3e of _0x59357b){_0x4e75a2[_0x7e8cc8('0x404')](_0x328e3e);}}else{function _0x367096(){const _0x3879d1=_0x7e8cc8;this[_0x3879d1('0x8c')](_0x3879d1('0x476'));}}}}),PluginManager[_0x3219af('0x725')](pluginData['name'],_0x3219af('0x1e'),_0x142bb1=>{const _0x3c3655=_0x3219af;if(!SceneManager[_0x3c3655('0x40d')]())return;VisuMZ[_0x3c3655('0x371')](_0x142bb1,_0x142bb1);const _0x32b9e1=VisuMZ['CreateActionSequenceTargets'](_0x142bb1['Targets']),_0x34f3db=_0x142bb1[_0x3c3655('0x18')],_0x4d2a21={'textColor':ColorManager[_0x3c3655('0x2a')](_0x142bb1[_0x3c3655('0x3ac')]),'flashColor':_0x142bb1[_0x3c3655('0x613')],'flashDuration':_0x142bb1[_0x3c3655('0x16f')]};for(const _0xee8fff of _0x32b9e1){if(!_0xee8fff)continue;_0xee8fff['setupTextPopup'](_0x34f3db,_0x4d2a21);}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_WaitForEffect',_0x583dd5=>{const _0x177396=_0x3219af;if(!SceneManager[_0x177396('0x40d')]())return;const _0x4c0875=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4c0875)return;_0x4c0875['setWaitMode'](_0x177396('0x525'));}),PluginManager[_0x3219af('0x725')](pluginData['name'],_0x3219af('0x254'),_0x4b328a=>{const _0x3759b3=_0x3219af;if(!SceneManager[_0x3759b3('0x40d')]())return;VisuMZ[_0x3759b3('0x371')](_0x4b328a,_0x4b328a);const _0x9a7400=VisuMZ['CreateActionSequenceTargets'](_0x4b328a[_0x3759b3('0x7f6')]);for(const _0x304848 of _0x9a7400){if(_0x3759b3('0x3c5')==='UMQGf'){if(!_0x304848)continue;_0x304848['clearFreezeMotion']();}else{function _0x1fb62e(){const _0x351f37=_0x3759b3;this[_0x351f37('0x6d3')]=![],this['_spriteset'][_0x351f37('0x789')](),this[_0x351f37('0x2e6')][_0x351f37('0x117')]=![];if(_0x2aefa7[_0x351f37('0x6df')]())(_0x49d5d4[_0x351f37('0xb5')]||_0x2baff7[_0x351f37('0x499')])&&_0x14ae30[_0x351f37('0x556')]();else(_0x3c0337[_0x351f37('0xb5')]()||_0x1c1819[_0x351f37('0x499')]())&&_0x127103[_0x351f37('0x556')]();_0x3573db[_0x351f37('0x453')](_0x5cfd90);}}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x5b3'),_0x273e9a=>{const _0x527faf=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x527faf('0x371')](_0x273e9a,_0x273e9a);const _0x1fd5ba=VisuMZ['CreateActionSequenceTargets'](_0x273e9a[_0x527faf('0x7f6')]),_0x3ee300=_0x273e9a[_0x527faf('0x51c')][_0x527faf('0x1b9')]()['trim'](),_0x9cc3f3=_0x273e9a['ShowWeapon'],_0x2d468e=_0x273e9a['Frame'];for(const _0x3370d5 of _0x1fd5ba){if(_0x527faf('0x37b')!==_0x527faf('0x37b')){function _0x2e2ebb(){const _0x42bc7b=_0x527faf;_0x214f88[_0x42bc7b('0x1e6')][_0x42bc7b('0x7df')][_0x42bc7b('0x448')](this),this['_forcedBattlers']=[];}}else{if(!_0x3370d5)continue;_0x3370d5['freezeMotion'](_0x3ee300,_0x9cc3f3,_0x2d468e);}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x6a5'),_0x5939ed=>{const _0x7606a8=_0x3219af;if(!SceneManager[_0x7606a8('0x40d')]())return;VisuMZ[_0x7606a8('0x371')](_0x5939ed,_0x5939ed);const _0xd45c35=VisuMZ[_0x7606a8('0x1da')](_0x5939ed[_0x7606a8('0x7f6')]),_0x31000e=_0x5939ed[_0x7606a8('0x51c')][_0x7606a8('0x1b9')]()[_0x7606a8('0x580')](),_0x8f6f89=_0x5939ed[_0x7606a8('0x28b')];for(const _0x32e5e6 of _0xd45c35){if(!_0x32e5e6)continue;if(_0x31000e===_0x7606a8('0x3c4'))_0x32e5e6['performAttack']();else{if(_0x7606a8('0x15c')!==_0x7606a8('0x304'))_0x32e5e6[_0x7606a8('0x8c')](_0x31000e);else{function _0x2fbca4(){const _0x2bb6d7=_0x7606a8;_0x5c99b7-=_0x47867e;const _0x560ffa=_0x1f2ba4['BattleCore'][_0x2bb6d7('0x885')][_0x2bb6d7('0x4e0')][_0x2bb6d7('0x81c')],_0x3acba0=_0x54fb74[_0x2bb6d7('0x794')](0x1-_0x4931fd/((_0xda9dd9-_0x274213)*_0x560ffa+_0x21b81d),0.01);_0x32830f*=_0x3acba0,_0x3c5493+=_0x548e01;}}}if(!_0x8f6f89){if(_0x7606a8('0x11e')!==_0x7606a8('0x11e')){function _0x4a4c57(){const _0x2ca27f=_0x7606a8;_0x316b8a[_0x2ca27f('0x3b5')][_0x2ca27f('0x253')]['call'](this,_0x4f0aaf);}}else _0x32e5e6[_0x7606a8('0xea')](0x0);}else{if(_0x8f6f89&&[_0x7606a8('0x432'),_0x7606a8('0x476'),_0x7606a8('0x3a3')][_0x7606a8('0x895')](_0x31000e)){}}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x546'),_0x3d1617=>{const _0x587729=_0x3219af;if(!SceneManager[_0x587729('0x40d')]())return;VisuMZ['ConvertParams'](_0x3d1617,_0x3d1617);const _0x3c83db=BattleManager[_0x587729('0x4c5')];if(!_0x3c83db)return;if(!_0x3c83db['item']())return;const _0x5e3d75=VisuMZ[_0x587729('0x1da')](_0x3d1617[_0x587729('0x7f6')]);for(const _0x11dd14 of _0x5e3d75){if(!_0x11dd14)continue;_0x11dd14['performAction'](_0x3c83db);}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x67f'),_0x3badd7=>{const _0x24477e=_0x3219af;if(!SceneManager[_0x24477e('0x40d')]())return;VisuMZ['ConvertParams'](_0x3badd7,_0x3badd7);const _0x3fd7f5=VisuMZ['CreateActionSequenceTargets'](_0x3badd7['Targets']);for(const _0x2f02f6 of _0x3fd7f5){if(!_0x2f02f6)continue;if(!_0x2f02f6[_0x24477e('0x53f')]())continue;_0x2f02f6['battler']()[_0x24477e('0x3f8')]();}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Motion_WaitMotionFrame',_0x381f00=>{const _0x81b08f=_0x3219af;if(!SceneManager[_0x81b08f('0x40d')]())return;VisuMZ[_0x81b08f('0x371')](_0x381f00,_0x381f00);const _0x30d9f9=$gameTemp[_0x81b08f('0xdc')](),_0x4ae6cb=_0x381f00[_0x81b08f('0x9b')]*Sprite_Battler[_0x81b08f('0x203')];_0x30d9f9[_0x81b08f('0x35e')](_0x4ae6cb);}),PluginManager[_0x3219af('0x725')](pluginData['name'],'ActSeq_Movement_BattleStep',_0x848303=>{const _0x15e4bd=_0x3219af;if(!SceneManager[_0x15e4bd('0x40d')]())return;VisuMZ[_0x15e4bd('0x371')](_0x848303,_0x848303);const _0xf72a54=$gameTemp['getLastPluginCommandInterpreter'](),_0x1c8e54=BattleManager['_action'];if(!_0xf72a54||!_0x1c8e54)return;if(!_0x1c8e54[_0x15e4bd('0x259')]())return;const _0x2b8827=VisuMZ[_0x15e4bd('0x1da')](_0x848303['Targets']);for(const _0x1e4096 of _0x2b8827){if(!_0x1e4096)continue;_0x1e4096[_0x15e4bd('0x145')](_0x1c8e54);}if(_0x848303[_0x15e4bd('0x408')])_0xf72a54['setWaitMode'](_0x15e4bd('0x141'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x33f'),_0xbe29c6=>{const _0x55077f=_0x3219af;if(!SceneManager[_0x55077f('0x40d')]())return;if(!$gameSystem[_0x55077f('0x670')]())return;VisuMZ[_0x55077f('0x371')](_0xbe29c6,_0xbe29c6);const _0x2bcb2d=VisuMZ[_0x55077f('0x1da')](_0xbe29c6[_0x55077f('0x7f6')]);let _0x101010=_0xbe29c6['Direction']['match'](/back/i);for(const _0x44105c of _0x2bcb2d){if(_0x55077f('0x687')===_0x55077f('0x4e1')){function _0x3de32e(){const _0x77e5fb=_0x55077f;_0x3e4e77[_0x77e5fb('0x35')]=_0x5381b5(_0x556094['$1']),_0x5dc6ba[_0x77e5fb('0x53d')]=_0x23c739(_0x4df8aa['$2']);}}else{if(!_0x44105c)continue;if(_0xbe29c6[_0x55077f('0x6be')]['match'](/rand/i))_0x101010=Math['randomInt'](0x2);_0x44105c[_0x55077f('0x2f7')](!!_0x101010);}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x364'),_0x5c3ff9=>{const _0x8164ba=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x8164ba('0x670')]())return;VisuMZ[_0x8164ba('0x371')](_0x5c3ff9,_0x5c3ff9);const _0xf9a25=VisuMZ['CreateActionSequenceTargets'](_0x5c3ff9['Targets']);let _0x3e0bfc=_0x5c3ff9[_0x8164ba('0x3c')];const _0x2ff6a3=_0x5c3ff9[_0x8164ba('0x815')];for(const _0x243d8b of _0xf9a25){if(_0x8164ba('0x74c')===_0x8164ba('0xab')){function _0x42b48f(){const _0x300056=_0x8164ba,_0x1c6124=this[_0x300056('0x705')](),_0x2b145d=this[_0x300056('0x626')]();_0xa232c2['BattleCore'][_0x300056('0x6d0')]['call'](this,_0x5f5c1f),this[_0x300056('0xf9')]()&&_0x1c6124&&this[_0x300056('0x71f')]()&&(this['_visualHpGauge_JustDied']=!this['hasBeenDefeatedBefore'](),_0x152aa5[_0x300056('0x6da')](this[_0x300056('0x1ad')]())),_0x1f58f9[_0x300056('0x40d')]()&&_0x2b145d!==this[_0x300056('0x626')]()&&(this['battler']()&&this['battler']()['refreshMotion']());}}else{if(!_0x243d8b)continue;let _0x5d57da=_0x243d8b[_0x8164ba('0x53f')]()[_0x8164ba('0x5af')],_0x1204b0=_0x243d8b[_0x8164ba('0x53f')]()[_0x8164ba('0x833')];if(_0x3e0bfc['match'](/home/i))_0x5d57da=_0x243d8b[_0x8164ba('0x53f')]()[_0x8164ba('0x294')],_0x1204b0=_0x243d8b[_0x8164ba('0x53f')]()[_0x8164ba('0x801')];else{if(_0x3e0bfc[_0x8164ba('0x6f1')](/center/i)){if(_0x8164ba('0x5d2')===_0x8164ba('0x5d2'))_0x5d57da=Graphics['boxWidth']/0x2,_0x1204b0=Graphics['boxHeight']/0x2;else{function _0x21032c(){const _0x4c7bf9=_0x8164ba,_0x1ba5fd=this['getNextSubjectFromPool']();if(!_0x1ba5fd)return null;if(_0x1ba5fd[_0x4c7bf9('0x4f9')]()&&_0x1ba5fd[_0x4c7bf9('0x705')]())return _0x1ba5fd;}}}else _0x3e0bfc[_0x8164ba('0x6f1')](/point (\d+), (\d+)/i)&&(_0x5d57da=Number(RegExp['$1']),_0x1204b0=Number(RegExp['$2']));}_0x243d8b[_0x8164ba('0x121')](Math[_0x8164ba('0x219')](_0x5d57da),Math[_0x8164ba('0x219')](_0x1204b0),!!_0x2ff6a3);}}}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x4fa'),_0xd2ec3b=>{const _0x292441=_0x3219af;if(!SceneManager[_0x292441('0x40d')]())return;if(!$gameSystem[_0x292441('0x670')]())return;VisuMZ[_0x292441('0x371')](_0xd2ec3b,_0xd2ec3b);const _0x341a53=VisuMZ['CreateActionSequenceTargets'](_0xd2ec3b[_0x292441('0xf1')]),_0xb03ecb=VisuMZ['CreateActionSequenceTargets'](_0xd2ec3b[_0x292441('0x1cd')]),_0x352310=_0xb03ecb['map'](_0xd52439=>_0xd52439&&_0xd52439['battler']()?_0xd52439[_0x292441('0x53f')]()[_0x292441('0x5af')]:0x0)/(_0xb03ecb[_0x292441('0x2da')]||0x1),_0x5c5211=_0xb03ecb[_0x292441('0x75a')](_0xd37932=>_0xd37932&&_0xd37932[_0x292441('0x53f')]()?_0xd37932['battler']()[_0x292441('0x833')]:0x0)/(_0xb03ecb['length']||0x1),_0x46a3a4=_0xd2ec3b[_0x292441('0x815')];for(const _0x170e8a of _0x341a53){if(!_0x170e8a)continue;_0x170e8a['setBattlerFacePoint'](Math[_0x292441('0x219')](_0x352310),Math[_0x292441('0x219')](_0x5c5211),!!_0x46a3a4);}}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x561'),_0x1fc2c2=>{const _0x43c3cc=_0x3219af;if(!SceneManager[_0x43c3cc('0x40d')]())return;VisuMZ[_0x43c3cc('0x371')](_0x1fc2c2,_0x1fc2c2);const _0x18e9d1=$gameTemp[_0x43c3cc('0xdc')](),_0x4dc25b=VisuMZ[_0x43c3cc('0x1da')](_0x1fc2c2['Targets']),_0x1771d2=_0x1fc2c2[_0x43c3cc('0x23b')],_0x174301=_0x1fc2c2[_0x43c3cc('0x781')],_0x173196=_0x1fc2c2['EasingType'],_0x4b23de=_0x1fc2c2[_0x43c3cc('0x77b')];if(!_0x18e9d1)return;for(const _0x16cb4f of _0x4dc25b){if(!_0x16cb4f)continue;_0x16cb4f[_0x43c3cc('0x698')](_0x1771d2,_0x174301,_0x173196);}if(_0x4b23de)_0x18e9d1[_0x43c3cc('0x1bb')](_0x43c3cc('0x1f7'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x7d6'),_0x4c48f8=>{const _0x4a88cc=_0x3219af;if(!SceneManager[_0x4a88cc('0x40d')]())return;VisuMZ[_0x4a88cc('0x371')](_0x4c48f8,_0x4c48f8);const _0x447d3e=$gameTemp[_0x4a88cc('0xdc')]();if(!_0x447d3e)return;const _0x2a42bc=VisuMZ['CreateActionSequenceTargets'](_0x4c48f8[_0x4a88cc('0x7f6')]);for(const _0x233ba6 of _0x2a42bc){if(!_0x233ba6)continue;_0x233ba6['performActionEnd']();}if(_0x4c48f8['WaitForMovement'])_0x447d3e['setWaitMode'](_0x4a88cc('0x141'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x207'),_0x57803c=>{const _0x3eb7fa=_0x3219af;if(!SceneManager[_0x3eb7fa('0x40d')]())return;VisuMZ[_0x3eb7fa('0x371')](_0x57803c,_0x57803c);const _0xcfd4c4=$gameTemp[_0x3eb7fa('0xdc')](),_0x5df36f=VisuMZ['CreateActionSequenceTargets'](_0x57803c[_0x3eb7fa('0x7f6')]),_0x272f6d=_0x57803c[_0x3eb7fa('0x23b')],_0x505cb6=_0x57803c['Duration'],_0x47fce7=_0x57803c[_0x3eb7fa('0xd4')];if(!_0xcfd4c4)return;for(const _0x3845b4 of _0x5df36f){if(!_0x3845b4)continue;_0x3845b4[_0x3eb7fa('0x779')](_0x272f6d,_0x505cb6);}if(_0x47fce7)_0xcfd4c4['setWaitMode'](_0x3eb7fa('0x80c'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Movement_MoveBy',_0x1faf97=>{const _0x338f88=_0x3219af;if(!SceneManager[_0x338f88('0x40d')]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x338f88('0x371')](_0x1faf97,_0x1faf97);const _0x5f2d1f=$gameTemp[_0x338f88('0xdc')](),_0x453ac4=VisuMZ[_0x338f88('0x1da')](_0x1faf97['Targets']),_0x1e55a5=_0x1faf97[_0x338f88('0x70f')],_0x321e7f=_0x1faf97[_0x338f88('0x93')],_0x29ee3b=_0x1faf97[_0x338f88('0x51')],_0x39f987=_0x1faf97['Duration'],_0x58de5d=_0x1faf97[_0x338f88('0x70b')],_0x7b226c=_0x1faf97[_0x338f88('0x25a')],_0x5cadb5=_0x1faf97[_0x338f88('0x51c')],_0x467e25=_0x1faf97[_0x338f88('0x408')];if(!_0x5f2d1f)return;for(const _0x5bef62 of _0x453ac4){if(!_0x5bef62)continue;let _0x563052=_0x321e7f,_0x36f58d=_0x29ee3b;if(_0x1e55a5[_0x338f88('0x6f1')](/horz/i))_0x563052*=_0x5bef62[_0x338f88('0x857')]()?-0x1:0x1;if(_0x1e55a5[_0x338f88('0x6f1')](/vert/i))_0x36f58d*=_0x5bef62['isActor']()?-0x1:0x1;_0x5bef62['moveBattlerDistance'](_0x563052,_0x36f58d,_0x39f987,_0x58de5d,_0x7b226c),_0x5bef62[_0x338f88('0x8c')](_0x5cadb5);}if(_0x467e25)_0x5f2d1f[_0x338f88('0x1bb')](_0x338f88('0x141'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x722'),_0x29c676=>{const _0x540a11=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x540a11('0x670')]())return;VisuMZ[_0x540a11('0x371')](_0x29c676,_0x29c676);const _0xb16ab5=$gameTemp[_0x540a11('0xdc')](),_0x95862a=VisuMZ['CreateActionSequenceTargets'](_0x29c676['Targets']),_0x1868d1=_0x29c676[_0x540a11('0x4fe')],_0x411426=_0x29c676[_0x540a11('0x1f0')],_0x4b3ae6=_0x29c676[_0x540a11('0x470')],_0x34f442=_0x29c676['OffsetY'],_0x58d904=_0x29c676[_0x540a11('0x781')],_0x43308a=_0x29c676[_0x540a11('0x70b')],_0x15b501=_0x29c676[_0x540a11('0x25a')],_0x4bd63e=_0x29c676[_0x540a11('0x51c')],_0xd10227=_0x29c676['WaitForMovement'];if(!_0xb16ab5)return;for(const _0x55e2d9 of _0x95862a){if(_0x540a11('0x493')!==_0x540a11('0x663')){if(!_0x55e2d9)continue;let _0x44e405=_0x55e2d9[_0x540a11('0x53f')]()['_baseX'],_0x2c6ba5=_0x55e2d9[_0x540a11('0x53f')]()['_baseY'];if(_0x1868d1[_0x540a11('0x6f1')](/home/i)){if(_0x540a11('0x4d')===_0x540a11('0x617')){function _0x2f1567(){const _0x2f6b73=_0x540a11;if(this[_0x2f6b73('0x5e8')]===_0x2f6b73('0x2d7'))this[_0x2f6b73('0x28c')]();else this[_0x2f6b73('0x5e8')]==='forceAction'?this[_0x2f6b73('0x12c')]():_0x12dad0[_0x2f6b73('0x1e6')][_0x2f6b73('0x5b')][_0x2f6b73('0x448')](this,_0x248e78);}}else _0x44e405=_0x55e2d9[_0x540a11('0x53f')]()['_homeX'],_0x2c6ba5=_0x55e2d9[_0x540a11('0x53f')]()[_0x540a11('0x801')];}else{if(_0x1868d1[_0x540a11('0x6f1')](/center/i))_0x44e405=Graphics[_0x540a11('0x5b4')]/0x2,_0x2c6ba5=Graphics['boxHeight']/0x2;else _0x1868d1[_0x540a11('0x6f1')](/point (\d+), (\d+)/i)&&(_0x44e405=Number(RegExp['$1']),_0x2c6ba5=Number(RegExp['$2']));}if(_0x411426[_0x540a11('0x6f1')](/horz/i))_0x44e405+=_0x55e2d9[_0x540a11('0x857')]()?-_0x4b3ae6:_0x4b3ae6;if(_0x411426[_0x540a11('0x6f1')](/vert/i))_0x2c6ba5+=_0x55e2d9['isActor']()?-_0x34f442:_0x34f442;_0x55e2d9['moveBattlerToPoint'](_0x44e405,_0x2c6ba5,_0x58d904,_0x43308a,_0x15b501,-0x1),_0x55e2d9[_0x540a11('0x8c')](_0x4bd63e);}else{function _0x199147(){const _0x231fdc=_0x540a11;return _0x4fee45['note'][_0x231fdc('0x6f1')](/<COMMAND ICON: (\d+)>/i)?_0x42cb46(_0x2ef46c['$1']):_0x4f604b['iconIndex'];}}}if(_0xd10227)_0xb16ab5[_0x540a11('0x1bb')]('battleMove');}),PluginManager[_0x3219af('0x725')](pluginData['name'],_0x3219af('0x2a2'),_0x3f8146=>{const _0x3839ab=_0x3219af;if(!SceneManager[_0x3839ab('0x40d')]())return;if(!$gameSystem[_0x3839ab('0x670')]())return;VisuMZ[_0x3839ab('0x371')](_0x3f8146,_0x3f8146);const _0x57d7d7=$gameTemp['getLastPluginCommandInterpreter'](),_0x3efa98=VisuMZ[_0x3839ab('0x1da')](_0x3f8146[_0x3839ab('0xf1')]),_0x18a763=VisuMZ[_0x3839ab('0x1da')](_0x3f8146[_0x3839ab('0x1cd')]),_0x44cb38=_0x3f8146[_0x3839ab('0x62e')];let _0x2f28b7=_0x3f8146[_0x3839ab('0x692')];const _0x40640b=_0x3f8146[_0x3839ab('0x1f0')],_0x451a6c=_0x3f8146[_0x3839ab('0x470')],_0x5c719a=_0x3f8146[_0x3839ab('0x44f')],_0x225910=_0x3f8146[_0x3839ab('0x781')],_0x311383=_0x3f8146[_0x3839ab('0x70b')],_0x2c873f=_0x3f8146['EasingType'],_0x2fc9aa=_0x3f8146[_0x3839ab('0x51c')],_0x1ee02d=_0x3f8146[_0x3839ab('0x408')],_0x4f1aad=Math[_0x3839ab('0x7a2')](..._0x18a763[_0x3839ab('0x75a')](_0x2a72ed=>_0x2a72ed['battler']()[_0x3839ab('0x5af')]-_0x2a72ed['battler']()[_0x3839ab('0x809')]()/0x2)),_0x2840eb=Math[_0x3839ab('0x794')](..._0x18a763[_0x3839ab('0x75a')](_0x32d5e3=>_0x32d5e3[_0x3839ab('0x53f')]()['_baseX']+_0x32d5e3[_0x3839ab('0x53f')]()[_0x3839ab('0x809')]()/0x2)),_0x13321b=Math[_0x3839ab('0x7a2')](..._0x18a763['map'](_0x42f3ed=>_0x42f3ed[_0x3839ab('0x53f')]()['_baseY']-_0x42f3ed['battler']()[_0x3839ab('0x85')]())),_0x5d58ce=Math[_0x3839ab('0x794')](..._0x18a763[_0x3839ab('0x75a')](_0x1cca2a=>_0x1cca2a[_0x3839ab('0x53f')]()[_0x3839ab('0x833')])),_0x36d57a=_0x18a763[_0x3839ab('0x686')](_0x5f21a6=>_0x5f21a6[_0x3839ab('0x857')]())[_0x3839ab('0x2da')],_0x4d715f=_0x18a763[_0x3839ab('0x686')](_0x53a232=>_0x53a232['isEnemy']())[_0x3839ab('0x2da')];let _0x49ecf1=0x0,_0x1bb52e=0x0;if(_0x44cb38[_0x3839ab('0x6f1')](/front/i)){if('xqUUP'===_0x3839ab('0x632')){function _0x322d1b(){const _0x5b0296=_0x3839ab;_0x2c691c[_0x5b0296('0x3d1')]();}}else _0x49ecf1=_0x36d57a>=_0x4d715f?_0x4f1aad:_0x2840eb;}else{if(_0x44cb38['match'](/middle/i)){if(_0x3839ab('0x73f')!==_0x3839ab('0x7de'))_0x49ecf1=(_0x4f1aad+_0x2840eb)/0x2,_0x2f28b7=-0x1;else{function _0x1cf11a(){const _0x2fa9b0=_0x3839ab;this[_0x2fa9b0('0x140')]=_0x39178c,this[_0x2fa9b0('0x642')]&&(this['_targetAngle']=0x0,this['_currentAngle']=0x0);}}}else _0x44cb38[_0x3839ab('0x6f1')](/back/i)&&(_0x49ecf1=_0x36d57a>=_0x4d715f?_0x2840eb:_0x4f1aad);}if(_0x44cb38['match'](/head/i))_0x1bb52e=_0x13321b;else{if(_0x44cb38['match'](/center/i)){if(_0x3839ab('0x1ea')!==_0x3839ab('0x502'))_0x1bb52e=(_0x13321b+_0x5d58ce)/0x2;else{function _0x184a39(){const _0x300575=_0x3839ab;_0x15091a[_0x300575('0x1e6')][_0x300575('0x7cf')][_0x300575('0x448')](this),this[_0x300575('0x420')]();}}}else _0x44cb38['match'](/base/i)&&(_0x1bb52e=_0x5d58ce);}if(!_0x57d7d7)return;for(const _0x1acc7d of _0x3efa98){if(!_0x1acc7d)continue;let _0x59f81b=_0x49ecf1,_0x2e0606=_0x1bb52e;if(_0x40640b[_0x3839ab('0x6f1')](/horz/i))_0x59f81b+=_0x1acc7d[_0x3839ab('0x857')]()?-_0x451a6c:_0x451a6c;if(_0x40640b[_0x3839ab('0x6f1')](/vert/i))_0x2e0606+=_0x1acc7d[_0x3839ab('0x857')]()?-_0x5c719a:_0x5c719a;_0x1acc7d[_0x3839ab('0x417')](_0x59f81b,_0x2e0606,_0x225910,_0x311383,_0x2c873f,_0x2f28b7),_0x1acc7d[_0x3839ab('0x8c')](_0x2fc9aa);}if(_0x1ee02d)_0x57d7d7[_0x3839ab('0x1bb')](_0x3839ab('0x141'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x87c'),_0x1b1864=>{const _0x5e607a=_0x3219af;if(!SceneManager[_0x5e607a('0x40d')]())return;VisuMZ['ConvertParams'](_0x1b1864,_0x1b1864);const _0x104e4d=$gameTemp[_0x5e607a('0xdc')](),_0x5ca389=VisuMZ[_0x5e607a('0x1da')](_0x1b1864[_0x5e607a('0x7f6')]),_0xfdc5c4=_0x1b1864[_0x5e607a('0x6d6')],_0xdf699a=_0x1b1864[_0x5e607a('0x781')],_0x491e8f=_0x1b1864['EasingType'],_0x27907c=_0x1b1864['WaitForOpacity'];if(!_0x104e4d)return;for(const _0x56ce1f of _0x5ca389){if(_0x5e607a('0x273')===_0x5e607a('0xa7')){function _0x13661c(){this['recoverAll']();}}else{if(!_0x56ce1f)continue;_0x56ce1f[_0x5e607a('0xbe')](_0xfdc5c4,_0xdf699a,_0x491e8f);}}if(_0x27907c)_0x104e4d[_0x5e607a('0x1bb')](_0x5e607a('0x7a0'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x866'),_0x239d36=>{const _0x5d250b=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x5d250b('0x371')](_0x239d36,_0x239d36);const _0x1c6487=$gameTemp['getLastPluginCommandInterpreter'](),_0x5617e7=VisuMZ[_0x5d250b('0x1da')](_0x239d36[_0x5d250b('0x7f6')]),_0x2539d3=_0x239d36['ScaleX'],_0x36f351=_0x239d36[_0x5d250b('0x73b')],_0x8613ab=_0x239d36[_0x5d250b('0x781')],_0xa4d3ba=_0x239d36['EasingType'],_0x2cd396=_0x239d36[_0x5d250b('0x205')];if(!_0x1c6487)return;for(const _0x3fbad3 of _0x5617e7){if('GSxtl'===_0x5d250b('0x1ee')){function _0x55ac80(){const _0x17ece9=_0x5d250b,_0x2cba1f=_0xa8ca13[_0x17ece9('0x1e6')][_0x17ece9('0x885')]['Mechanics'];_0x2cba1f[_0x17ece9('0x88')]&&(this[_0x17ece9('0x79d')]=!![],_0x233cbd[_0x17ece9('0x192')](_0x2cba1f[_0x17ece9('0x88')]),_0x29f3d6[_0x17ece9('0x363')](),_0xa25b58[_0x17ece9('0x85b')]['_preBattleCommonEvent']=!![]);}}else{if(!_0x3fbad3)continue;_0x3fbad3[_0x5d250b('0x5e2')](_0x2539d3,_0x36f351,_0x8613ab,_0xa4d3ba);}}if(_0x2cd396)_0x1c6487[_0x5d250b('0x1bb')](_0x5d250b('0x282'));}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x1f'),_0x539dfd=>{const _0x503871=_0x3219af;if(!SceneManager[_0x503871('0x40d')]())return;VisuMZ[_0x503871('0x371')](_0x539dfd,_0x539dfd);const _0x34ae9a=$gameTemp['getLastPluginCommandInterpreter'](),_0x36ddab=VisuMZ[_0x503871('0x1da')](_0x539dfd[_0x503871('0x7f6')]),_0x2e3b1e=_0x539dfd[_0x503871('0x841')],_0x5523e9=_0x539dfd['SkewY'],_0x52e1f8=_0x539dfd[_0x503871('0x781')],_0x7cde6=_0x539dfd[_0x503871('0x25a')],_0x1bc1ff=_0x539dfd[_0x503871('0x88e')];if(!_0x34ae9a)return;for(const _0x24687f of _0x36ddab){if(!_0x24687f)continue;_0x24687f['skewBattler'](_0x2e3b1e,_0x5523e9,_0x52e1f8,_0x7cde6);}if(_0x1bc1ff)_0x34ae9a[_0x503871('0x1bb')](_0x503871('0x4bb'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x7d0'),_0x5caf5e=>{const _0x4ae155=_0x3219af;if(!SceneManager[_0x4ae155('0x40d')]())return;VisuMZ[_0x4ae155('0x371')](_0x5caf5e,_0x5caf5e);const _0x4bafdd=$gameTemp[_0x4ae155('0xdc')](),_0x187190=VisuMZ[_0x4ae155('0x1da')](_0x5caf5e[_0x4ae155('0x7f6')]),_0x50390e=_0x5caf5e['Angle'],_0x266048=_0x5caf5e[_0x4ae155('0x781')],_0x1a19b5=_0x5caf5e[_0x4ae155('0x25a')],_0x32456a=_0x5caf5e[_0x4ae155('0x607')],_0x3772e4=_0x5caf5e[_0x4ae155('0x7ee')];if(!_0x4bafdd)return;for(const _0x3b9fd3 of _0x187190){if(!_0x3b9fd3)continue;_0x3b9fd3[_0x4ae155('0x5ea')](_0x50390e,_0x266048,_0x1a19b5,_0x32456a);}if(_0x3772e4)_0x4bafdd['setWaitMode']('battleSpin');}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x410'),_0x190a81=>{const _0x3557a0=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0x293d6b=$gameTemp[_0x3557a0('0xdc')]();if(!_0x293d6b)return;_0x293d6b[_0x3557a0('0x1bb')](_0x3557a0('0x1f7'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x69f'),_0x4d3c02=>{const _0x2f9b06=_0x3219af;if(!SceneManager[_0x2f9b06('0x40d')]())return;const _0x1258dd=$gameTemp[_0x2f9b06('0xdc')]();if(!_0x1258dd)return;_0x1258dd[_0x2f9b06('0x1bb')](_0x2f9b06('0x80c'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Movement_WaitForMovement',_0xc67412=>{const _0x32d84e=_0x3219af;if(!SceneManager[_0x32d84e('0x40d')]())return;const _0x2925cf=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x2925cf)return;_0x2925cf['setWaitMode'](_0x32d84e('0x141'));}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],'ActSeq_Movement_WaitForOpacity',_0x36e4af=>{const _0x303dc6=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0x46121f=$gameTemp[_0x303dc6('0xdc')]();if(!_0x46121f)return;_0x46121f[_0x303dc6('0x1bb')](_0x303dc6('0x7a0'));}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x73e'),_0xc84af4=>{const _0x31cb06=_0x3219af;if(!SceneManager[_0x31cb06('0x40d')]())return;const _0x1d15cc=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x1d15cc)return;_0x1d15cc['setWaitMode'](_0x31cb06('0x282'));}),PluginManager[_0x3219af('0x725')](pluginData['name'],_0x3219af('0xa3'),_0x11e9ec=>{const _0x1d3559=_0x3219af;if(!SceneManager[_0x1d3559('0x40d')]())return;const _0x34af62=$gameTemp[_0x1d3559('0xdc')]();if(!_0x34af62)return;_0x34af62[_0x1d3559('0x1bb')]('battleSpriteSkew');}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x883'),_0x11bb49=>{const _0x53a68c=_0x3219af;if(!SceneManager['isSceneBattle']())return;const _0x555c10=$gameTemp[_0x53a68c('0xdc')]();if(!_0x555c10)return;_0x555c10['setWaitMode'](_0x53a68c('0x289'));}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x4c2'),_0x362055=>{const _0x2bb002=_0x3219af;if(!SceneManager[_0x2bb002('0x40d')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x2bb002('0x371')](_0x362055,_0x362055);const _0x2c9bbd=$gameTemp[_0x2bb002('0xdc')](),_0x2d0e3c=_0x362055[_0x2bb002('0x88e')];if(!_0x2c9bbd)return;$gameScreen[_0x2bb002('0x640')](_0x362055[_0x2bb002('0x841')],_0x362055[_0x2bb002('0x66b')],_0x362055['Duration'],_0x362055[_0x2bb002('0x25a')]);if(_0x2d0e3c)_0x2c9bbd['setWaitMode'](_0x2bb002('0x450'));}),PluginManager[_0x3219af('0x725')](pluginData['name'],'ActSeq_Skew_Reset',_0x4b0b84=>{const _0x4bd5e5=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x4bd5e5('0x371')](_0x4b0b84,_0x4b0b84);const _0xcd14e6=$gameTemp[_0x4bd5e5('0xdc')](),_0x1afa07=_0x4b0b84[_0x4bd5e5('0x88e')];if(!_0xcd14e6)return;$gameScreen[_0x4bd5e5('0x640')](0x0,0x0,_0x4b0b84['Duration'],_0x4b0b84[_0x4bd5e5('0x25a')]);if(_0x1afa07)_0xcd14e6[_0x4bd5e5('0x1bb')](_0x4bd5e5('0x450'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x155'),_0x3a4a89=>{const _0x5c142a=_0x3219af;if(!SceneManager[_0x5c142a('0x40d')]())return;if(!Imported[_0x5c142a('0x21c')])return;const _0x2b3290=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x2b3290)return;_0x2b3290['setWaitMode']('battleSkew');}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],'ActSeq_Target_CurrentIndex',_0x3ec2c9=>{const _0xdf3eec=_0x3219af;if(!SceneManager[_0xdf3eec('0x40d')]())return;VisuMZ[_0xdf3eec('0x371')](_0x3ec2c9,_0x3ec2c9);const _0x497579=$gameTemp[_0xdf3eec('0xdc')](),_0xf366b1=_0x3ec2c9[_0xdf3eec('0x3e6')],_0x6922c3=_0x3ec2c9['JumpToLabel'];if(!_0x497579)return;BattleManager[_0xdf3eec('0x3d6')]=_0xf366b1,BattleManager[_0xdf3eec('0x6b0')]=BattleManager[_0xdf3eec('0x4a')]?BattleManager[_0xdf3eec('0x4a')][BattleManager[_0xdf3eec('0x3d6')]]||null:null,BattleManager[_0xdf3eec('0x6b0')]&&_0x6922c3['toUpperCase']()[_0xdf3eec('0x580')]()!==_0xdf3eec('0x48d')&&_0x497579[_0xdf3eec('0x21e')]([_0x6922c3]);}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x647'),_0x5a2402=>{const _0x1ac4ae=_0x3219af;if(!SceneManager[_0x1ac4ae('0x40d')]())return;VisuMZ[_0x1ac4ae('0x371')](_0x5a2402,_0x5a2402);const _0xe73b2=$gameTemp[_0x1ac4ae('0xdc')](),_0x1d56e4=_0x5a2402['JumpToLabel'];if(!_0xe73b2)return;BattleManager[_0x1ac4ae('0x3d6')]++,BattleManager['_target']=BattleManager[_0x1ac4ae('0x4a')][BattleManager[_0x1ac4ae('0x3d6')]]||null,BattleManager['_target']&&_0x1d56e4[_0x1ac4ae('0x7c2')]()[_0x1ac4ae('0x580')]()!=='UNTITLED'&&_0xe73b2[_0x1ac4ae('0x21e')]([_0x1d56e4]);}),PluginManager[_0x3219af('0x725')](pluginData['name'],_0x3219af('0x7'),_0x5f55c5=>{const _0x48a8c0=_0x3219af;if(!SceneManager[_0x48a8c0('0x40d')]())return;VisuMZ[_0x48a8c0('0x371')](_0x5f55c5,_0x5f55c5);const _0x253047=$gameTemp[_0x48a8c0('0xdc')](),_0x452524=_0x5f55c5[_0x48a8c0('0x2b7')];if(!_0x253047)return;BattleManager[_0x48a8c0('0x3d6')]--,BattleManager['_target']=BattleManager[_0x48a8c0('0x4a')][BattleManager[_0x48a8c0('0x3d6')]]||null,BattleManager[_0x48a8c0('0x6b0')]&&_0x452524['toUpperCase']()['trim']()!==_0x48a8c0('0x48d')&&_0x253047[_0x48a8c0('0x21e')]([_0x452524]);}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x1a5'),_0x1ef300=>{const _0x14cb47=_0x3219af;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x14cb47('0x371')](_0x1ef300,_0x1ef300);const _0x1b26fb=$gameTemp[_0x14cb47('0xdc')](),_0x3c6017=_0x1ef300[_0x14cb47('0x35d')],_0x2709ab=_0x1ef300['JumpToLabel'];if(!_0x1b26fb)return;const _0x262844=BattleManager['_targetIndex'];for(;;){if(_0x14cb47('0x31b')!==_0x14cb47('0x31b')){function _0x3e2cd9(){const _0x1853ea=_0x14cb47;return this[_0x1853ea('0x840')]>0x0;}}else{BattleManager[_0x14cb47('0x3d6')]=Math[_0x14cb47('0x85f')](BattleManager[_0x14cb47('0x4a')]['length']);if(!_0x3c6017)break;if(BattleManager[_0x14cb47('0x3d6')]!==_0x262844)break;if(BattleManager[_0x14cb47('0x4a')][_0x14cb47('0x2da')]<=0x1){BattleManager[_0x14cb47('0x3d6')]=0x0;break;}}}BattleManager['_target']=BattleManager['_allTargets'][BattleManager[_0x14cb47('0x3d6')]]||null,BattleManager[_0x14cb47('0x6b0')]&&_0x2709ab[_0x14cb47('0x7c2')]()[_0x14cb47('0x580')]()!==_0x14cb47('0x48d')&&_0x1b26fb[_0x14cb47('0x21e')]([_0x2709ab]);}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x2d4'),_0xce5b09=>{const _0x34b764=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x34b764('0x21c')])return;VisuMZ[_0x34b764('0x371')](_0xce5b09,_0xce5b09);const _0x562c83=$gameTemp[_0x34b764('0xdc')](),_0x100f2a=_0xce5b09[_0x34b764('0x703')];if(!_0x562c83)return;$gameScreen[_0x34b764('0x1ca')](_0xce5b09[_0x34b764('0x285')],_0xce5b09['Duration'],_0xce5b09[_0x34b764('0x25a')]);if(_0x100f2a)_0x562c83['setWaitMode'](_0x34b764('0x730'));}),PluginManager[_0x3219af('0x725')](pluginData[_0x3219af('0x99')],_0x3219af('0x708'),_0x2fdc39=>{const _0x196bd1=_0x3219af;if(!SceneManager[_0x196bd1('0x40d')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x196bd1('0x371')](_0x2fdc39,_0x2fdc39);const _0x46c662=$gameTemp[_0x196bd1('0xdc')](),_0x578e6f=_0x2fdc39[_0x196bd1('0x703')];if(!_0x46c662)return;$gameScreen['setBattleZoom'](0x1,_0x2fdc39['Duration'],_0x2fdc39[_0x196bd1('0x25a')]);if(_0x578e6f)_0x46c662['setWaitMode'](_0x196bd1('0x730'));}),PluginManager['registerCommand'](pluginData[_0x3219af('0x99')],_0x3219af('0x534'),_0x1d67d8=>{const _0x2d062c=_0x3219af;if(!SceneManager[_0x2d062c('0x40d')]())return;if(!Imported[_0x2d062c('0x21c')])return;const _0x2c83db=$gameTemp[_0x2d062c('0xdc')]();if(!_0x2c83db)return;_0x2c83db[_0x2d062c('0x1bb')](_0x2d062c('0x730'));}),VisuMZ['BattleCore'][_0x3219af('0x4eb')]=Scene_Boot['prototype'][_0x3219af('0x23c')],Scene_Boot[_0x3219af('0x3b5')][_0x3219af('0x23c')]=function(){const _0x294420=_0x3219af;VisuMZ[_0x294420('0x1e6')][_0x294420('0x4eb')][_0x294420('0x448')](this),this[_0x294420('0x3b7')]();},Scene_Boot[_0x3219af('0x3b5')][_0x3219af('0x3b7')]=function(){const _0x16f9e5=_0x3219af;this['process_VisuMZ_BattleCore_Failsafes'](),this[_0x16f9e5('0x595')](),this[_0x16f9e5('0x152')](),this[_0x16f9e5('0x246')](),this[_0x16f9e5('0x202')](),this[_0x16f9e5('0x1db')](),this[_0x16f9e5('0x395')](),this[_0x16f9e5('0x501')]();},Scene_Boot[_0x3219af('0x3b5')][_0x3219af('0x828')]=function(){const _0xa74752=_0x3219af,_0x1c1821=$dataSystem[_0xa74752('0x7d8')][_0xa74752('0x2da')];for(let _0x2adfb8=0x0;_0x2adfb8<_0x1c1821;_0x2adfb8++){const _0xff52a4=$dataSystem['attackMotions'][_0x2adfb8];if(_0xff52a4)continue;$dataSystem[_0xa74752('0x45')][_0x2adfb8]=JsonEx[_0xa74752('0x2f8')]($dataSystem['attackMotions'][0x0]);}},Scene_Boot[_0x3219af('0x3b5')][_0x3219af('0x595')]=function(){const _0xb5eb78=_0x3219af,_0x5cdfe4=VisuMZ[_0xb5eb78('0x1e6')]['Settings'];_0x5cdfe4['Damage'][_0xb5eb78('0x240')]===undefined&&(_0x5cdfe4[_0xb5eb78('0x4e0')][_0xb5eb78('0x240')]=_0xb5eb78('0x510'));_0x5cdfe4[_0xb5eb78('0x2b2')][_0xb5eb78('0x7b3')]===undefined&&(_0x5cdfe4[_0xb5eb78('0x2b2')][_0xb5eb78('0x7b3')]=![]);if(_0x5cdfe4[_0xb5eb78('0x5ff')]['SmoothImage']===undefined){if('ZozqJ'!=='ZozqJ'){function _0x136b76(){const _0x38ca94=_0xb5eb78;this['_mainSprite']=new _0x38e2c2(),this[_0x38ca94('0x1af')][_0x38ca94('0x7c')]['x']=0.5,this[_0x38ca94('0x1af')][_0x38ca94('0x7c')]['y']=0x1,this[_0x38ca94('0x2b6')](this[_0x38ca94('0x1af')]),this[_0x38ca94('0x55c')]();}}else _0x5cdfe4[_0xb5eb78('0x5ff')][_0xb5eb78('0x7b3')]=!![];}_0x5cdfe4[_0xb5eb78('0x2b2')]['PrioritySortActive']===undefined&&(_0x5cdfe4[_0xb5eb78('0x2b2')]['PrioritySortActive']=![]),_0x5cdfe4[_0xb5eb78('0x2b2')][_0xb5eb78('0x743')]===undefined&&(_0x5cdfe4[_0xb5eb78('0x2b2')][_0xb5eb78('0x743')]=!![]);},VisuMZ[_0x3219af('0x1fe')]={},Scene_Boot['prototype'][_0x3219af('0x152')]=function(){const _0x5e8733=_0x3219af;for(const _0x5e33d6 of VisuMZ[_0x5e8733('0x1e6')][_0x5e8733('0x885')][_0x5e8733('0x4e0')][_0x5e8733('0x768')]){if(!_0x5e33d6)continue;const _0x4b604b=_0x5e33d6[_0x5e8733('0x627')][_0x5e8733('0x7c2')]()[_0x5e8733('0x580')]();VisuMZ[_0x5e8733('0x1fe')][_0x4b604b]=_0x5e33d6;}},VisuMZ[_0x3219af('0x1e6')]['RegExp']={},Scene_Boot[_0x3219af('0x3b5')]['process_VisuMZ_BattleCore_CreateRegExp']=function(){const _0x3b143b=_0x3219af,_0x92e7d2=VisuMZ[_0x3b143b('0x1e6')][_0x3b143b('0x6d4')],_0x153255='<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>',_0x14772d=[[_0x3b143b('0x85a'),'PRE-'],[_0x3b143b('0x59e'),_0x3b143b('0x359')]],_0x2097a3=[[_0x3b143b('0x554'),_0x3b143b('0x56e')],[_0x3b143b('0x339'),_0x3b143b('0x1aa')]],_0x4e27fa=[['',''],['AsUser',_0x3b143b('0x50b')],[_0x3b143b('0x5fc'),'AS\x20TARGET']];for(const _0x288efa of _0x2097a3){if(_0x3b143b('0x7be')!==_0x3b143b('0x7be')){function _0x3d547f(){const _0x56cd51=_0x3b143b;this[_0x56cd51('0x151')]=new _0x3b1229(),this[_0x56cd51('0x6e0')][_0x56cd51('0x2b6')](this['_weather']);}}else for(const _0x502480 of _0x4e27fa){for(const _0x4359cc of _0x14772d){const _0x1794f3=_0x288efa[0x0][_0x3b143b('0x796')](_0x4359cc[0x0],_0x502480[0x0]),_0x5aa486=_0x288efa[0x1][_0x3b143b('0x796')](_0x4359cc[0x1],_0x502480[0x1])[_0x3b143b('0x580')](),_0x5abefc=new RegExp(_0x153255[_0x3b143b('0x796')](_0x5aa486),'i');_0x92e7d2[_0x1794f3]=_0x5abefc;}}}const _0x2ebab2=[[_0x3b143b('0x5c2'),_0x3b143b('0x816')],[_0x3b143b('0x71b'),_0x3b143b('0xc4')]];for(const _0x170573 of _0x2ebab2){for(const _0x2d444b of _0x14772d){const _0xf0993e=_0x170573[0x0]['format'](_0x2d444b[0x0]),_0x5ca886=_0x170573[0x1][_0x3b143b('0x796')](_0x2d444b[0x1]),_0x42c157=new RegExp(_0x153255[_0x3b143b('0x796')](_0x5ca886),'i');_0x92e7d2[_0xf0993e]=_0x42c157;}}const _0x3060c4=[['%1StartBattleJS',_0x3b143b('0x82f')],[_0x3b143b('0x541'),'JS\x20%1END\x20BATTLE'],[_0x3b143b('0x58a'),_0x3b143b('0x89f')],[_0x3b143b('0xb0'),'JS\x20BATTLE\x20DEFEAT'],[_0x3b143b('0x25b'),_0x3b143b('0x477')],[_0x3b143b('0x319'),_0x3b143b('0x427')],['%1StartTurnJS','JS\x20%1START\x20TURN'],['%1EndTurnJS',_0x3b143b('0x5dc')],[_0x3b143b('0x23a'),_0x3b143b('0x81')]];for(const _0x343b94 of _0x3060c4){if(_0x3b143b('0x7bd')===_0x3b143b('0x230')){function _0x58085b(){const _0x4a2e12=_0x3b143b;_0x166c5b['BattleCore'][_0x4a2e12('0x76')][_0x4a2e12('0x448')](this),this[_0x4a2e12('0x1fa')]=![];const _0x2d4ad1=this[_0x4a2e12('0x53f')]();if(_0x2d4ad1)_0x2d4ad1['stepBack']();this[_0x4a2e12('0x2f7')](![]),this[_0x4a2e12('0x167')]();}}else for(const _0x568dbe of _0x14772d){if(_0x3b143b('0x532')===_0x3b143b('0x688')){function _0x5d7e2b(){const _0x1a06a1=_0x3b143b,_0x261cb3=this[_0x1a06a1('0x32f')]['bitmap'];this['_shadowSprite']['setFrame'](0x0,0x0,_0x261cb3[_0x1a06a1('0x106')],_0x261cb3[_0x1a06a1('0x1e3')]);}}else{const _0x4b9e8d=_0x343b94[0x0][_0x3b143b('0x796')](_0x568dbe[0x0]),_0x12e4e3=_0x343b94[0x1][_0x3b143b('0x796')](_0x568dbe[0x1]),_0x26757b=new RegExp(_0x153255[_0x3b143b('0x796')](_0x12e4e3),'i');_0x92e7d2[_0x4b9e8d]=_0x26757b;}}}},Scene_Boot[_0x3219af('0x3b5')][_0x3219af('0x202')]=function(){const _0x5101b5=_0x3219af,_0x106a18=$dataSkills[_0x5101b5('0x1b4')]($dataItems),_0xb1543e=[_0x5101b5('0x489'),_0x5101b5('0x5f5'),_0x5101b5('0x86'),_0x5101b5('0x689'),_0x5101b5('0x5a4'),_0x5101b5('0x182'),'PreEndActionJS',_0x5101b5('0x5ba')];for(const _0x1a4c0b of _0x106a18){if(!_0x1a4c0b)continue;for(const _0x364df5 of _0xb1543e){VisuMZ[_0x5101b5('0x1e6')][_0x5101b5('0x1f5')](_0x1a4c0b,_0x364df5);}const _0x7e1b1b=_0x1a4c0b['note'];if(_0x7e1b1b[_0x5101b5('0x6f1')](/<ALWAYS CRITICAL/i)){if('emWpp'===_0x5101b5('0x6fc')){function _0x2088c5(){const _0x1083a6=_0x5101b5;return this['isBattleCoreTargetScope']()&&!this['isCustomBattleScope']()?this[_0x1083a6('0x76d')]():_0x439f31[_0x1083a6('0x1e6')][_0x1083a6('0x67c')][_0x1083a6('0x448')](this);}}else _0x1a4c0b[_0x5101b5('0x5e1')][_0x5101b5('0x201')]=!![];}if(_0x7e1b1b[_0x5101b5('0x6f1')](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)){if(_0x5101b5('0x814')===_0x5101b5('0x112')){function _0x269b56(){const _0x5cb0c4=_0x5101b5;this['_battlerContainer'][_0x5cb0c4('0x2b6')](_0x30d297);}}else _0x1a4c0b['repeats']=Math['max'](0x1,Number(RegExp['$1']));}if(_0x7e1b1b['match'](/<TARGET:[ ](.*)>/i)){if(_0x5101b5('0x32b')==='WrVJf'){function _0x4701ac(){const _0x925118=_0x5101b5;!_0x28f9a7[_0x925118('0x1e6')][_0x925118('0x885')][_0x925118('0x69c')]['ShowMissEvasion']?this['push'](_0x925118('0x2a8'),_0x2dd6fb):_0x107838[_0x925118('0x1e6')]['Window_BattleLog_displayMiss'][_0x925118('0x448')](this,_0x46df31);}}else _0x1a4c0b[_0x5101b5('0x65d')]=String(RegExp['$1'])[_0x5101b5('0x7c2')]()['trim']();}}},Scene_Boot[_0x3219af('0x3b5')][_0x3219af('0x1db')]=function(){const _0x498fd0=_0x3219af,_0x4b8801=$dataActors[_0x498fd0('0x1b4')]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates),_0x26f0b0=[_0x498fd0('0x54d'),_0x498fd0('0x69a'),_0x498fd0('0x34b'),_0x498fd0('0x161'),_0x498fd0('0x14b'),_0x498fd0('0x5b1'),_0x498fd0('0xca'),_0x498fd0('0x252'),_0x498fd0('0x5a4'),_0x498fd0('0x182'),_0x498fd0('0x61c'),_0x498fd0('0x5ba'),_0x498fd0('0x48f'),_0x498fd0('0x479'),'PreEndBattleJS',_0x498fd0('0x608'),_0x498fd0('0x58a'),_0x498fd0('0xb0'),_0x498fd0('0x25b'),_0x498fd0('0x319'),_0x498fd0('0x2fa'),_0x498fd0('0x221'),_0x498fd0('0x142'),_0x498fd0('0x346'),_0x498fd0('0x2b9'),_0x498fd0('0x4f3')];for(const _0x332585 of _0x4b8801){if(!_0x332585)continue;for(const _0x537d7b of _0x26f0b0){if(_0x498fd0('0x8a')===_0x498fd0('0xd9')){function _0x1e74ef(){const _0x423aa6=_0x498fd0;if(!this['isConfused']()&&_0x57ab27[_0x423aa6('0x340')])return!![];return _0x3d36e8[_0x423aa6('0x3b5')][_0x423aa6('0x3ce')]['call'](this);}}else VisuMZ[_0x498fd0('0x1e6')]['createJS'](_0x332585,_0x537d7b);}const _0x2505c4=_0x332585[_0x498fd0('0x1e2')];}},VisuMZ['BattleCore']['JS']={},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x1f5')]=function(_0x1aa629,_0x54e5e9){const _0x457703=_0x3219af,_0x3112d5=_0x1aa629[_0x457703('0x1e2')];if(_0x3112d5['match'](VisuMZ[_0x457703('0x1e6')][_0x457703('0x6d4')][_0x54e5e9])){const _0x536abd=String(RegExp['$1']),_0x17dee5=_0x457703('0x15f')[_0x457703('0x796')](_0x536abd),_0xd8d6b5=VisuMZ[_0x457703('0x1e6')]['createKeyJS'](_0x1aa629,_0x54e5e9);VisuMZ['BattleCore']['JS'][_0xd8d6b5]=new Function(_0x17dee5);}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x676')]=function(_0x2b46a8,_0x467167){const _0x2b4e35=_0x3219af;let _0x517758='';if($dataActors[_0x2b4e35('0x895')](_0x2b46a8))_0x517758='Actor-%1-%2'[_0x2b4e35('0x796')](_0x2b46a8['id'],_0x467167);if($dataClasses[_0x2b4e35('0x895')](_0x2b46a8))_0x517758=_0x2b4e35('0x5bd')[_0x2b4e35('0x796')](_0x2b46a8['id'],_0x467167);if($dataSkills[_0x2b4e35('0x895')](_0x2b46a8))_0x517758=_0x2b4e35('0x46c')[_0x2b4e35('0x796')](_0x2b46a8['id'],_0x467167);if($dataItems['includes'](_0x2b46a8))_0x517758=_0x2b4e35('0x5cd')['format'](_0x2b46a8['id'],_0x467167);if($dataWeapons[_0x2b4e35('0x895')](_0x2b46a8))_0x517758=_0x2b4e35('0x4ac')['format'](_0x2b46a8['id'],_0x467167);if($dataArmors['includes'](_0x2b46a8))_0x517758=_0x2b4e35('0x25c')['format'](_0x2b46a8['id'],_0x467167);if($dataEnemies['includes'](_0x2b46a8))_0x517758='Enemy-%1-%2'[_0x2b4e35('0x796')](_0x2b46a8['id'],_0x467167);if($dataStates[_0x2b4e35('0x895')](_0x2b46a8))_0x517758='State-%1-%2'[_0x2b4e35('0x796')](_0x2b46a8['id'],_0x467167);return _0x517758;},Scene_Boot[_0x3219af('0x3b5')][_0x3219af('0x395')]=function(){const _0x5ad061=_0x3219af,_0x1aa1bd=VisuMZ[_0x5ad061('0x1e6')]['Settings'][_0x5ad061('0x30')][_0x5ad061('0x78a')],_0x35143c=[];for(const _0x5c85b8 of _0x1aa1bd){const _0x4f496b=$dataTroops[_0x5c85b8];if(_0x4f496b)_0x35143c[_0x5ad061('0x453')](JsonEx['makeDeepCopy'](_0x4f496b));}for(const _0x181aa5 of $dataTroops){if(!_0x181aa5)continue;for(const _0x2d3281 of _0x35143c){if(_0x2d3281['id']===_0x181aa5['id'])continue;_0x181aa5['pages']=_0x181aa5['pages'][_0x5ad061('0x1b4')](_0x2d3281[_0x5ad061('0x40')]);}}},Scene_Boot[_0x3219af('0x3b5')][_0x3219af('0x501')]=function(){const _0x1d8e9c=_0x3219af,_0x82112=$dataSkills[_0x1d8e9c('0x1b4')]($dataItems);for(const _0x292ecf of _0x82112){if(_0x1d8e9c('0x4f7')===_0x1d8e9c('0x4f7')){if(!_0x292ecf)continue;const _0x184bec=_0x292ecf[_0x1d8e9c('0x1e2')];if(_0x292ecf[_0x1d8e9c('0x1e2')][_0x1d8e9c('0x6f1')](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){if(_0x1d8e9c('0x760')==='tnOeO'){function _0x231be8(){const _0x539e5c=_0x1d8e9c;this[_0x539e5c('0x374')]();}}else{const _0x275e5c=String(RegExp['$1']),_0x49d3fc=VisuMZ[_0x1d8e9c('0x1e6')][_0x1d8e9c('0x676')](_0x292ecf,_0x1d8e9c('0x7f6'));VisuMZ[_0x1d8e9c('0x1e6')][_0x1d8e9c('0x12')](_0x275e5c,_0x49d3fc);}}if(_0x292ecf[_0x1d8e9c('0x1e2')]['match'](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x543838=String(RegExp['$1']),_0x70b310=VisuMZ['BattleCore']['createKeyJS'](_0x292ecf,_0x1d8e9c('0x306'));VisuMZ['BattleCore']['createCommandVisibleJS'](_0x543838,_0x70b310);}}else{function _0x18699c(){const _0x1d41dd=_0x1d8e9c;this[_0x1d41dd('0x65c')][_0x1d41dd('0x284')](_0x3d363c);}}}},VisuMZ[_0x3219af('0x1e6')]['createTargetsJS']=function(_0x359b2d,_0x3dd11d){const _0x52930f=_0x3219af,_0x44c82a='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20'['format'](_0x359b2d);VisuMZ[_0x52930f('0x1e6')]['JS'][_0x3dd11d]=new Function(_0x44c82a);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x6bc')]=function(_0x49d0a1,_0x14b7d4){const _0x461f7e=_0x3219af,_0x2bef93=_0x461f7e('0x5cc')[_0x461f7e('0x796')](_0x49d0a1);VisuMZ['BattleCore']['JS'][_0x14b7d4]=new Function(_0x2bef93);},TextManager['autoBattle']=VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x885')][_0x3219af('0x34c')][_0x3219af('0x5f8')],TextManager[_0x3219af('0x5f1')]=VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x885')][_0x3219af('0x500')][_0x3219af('0x78b')],TextManager[_0x3219af('0xa1')]=VisuMZ[_0x3219af('0x1e6')]['Settings'][_0x3219af('0x500')][_0x3219af('0x261')],TextManager[_0x3219af('0x62c')]=VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x885')][_0x3219af('0x68c')][_0x3219af('0x627')],ColorManager[_0x3219af('0x2a')]=function(_0x2d6bc9){const _0x13c420=_0x3219af;return _0x2d6bc9=String(_0x2d6bc9),_0x2d6bc9[_0x13c420('0x6f1')](/#(.*)/i)?'#%1'['format'](String(RegExp['$1'])):this[_0x13c420('0x414')](Number(_0x2d6bc9));},DataManager[_0x3219af('0x863')]=function(_0x1fa051){const _0x45e2f5=_0x3219af;if(_0x1fa051[_0x45e2f5('0x1e2')]['match'](/<DAMAGE STYLE:[ ](.*)>/i)){if(_0x45e2f5('0x58')===_0x45e2f5('0x58')){const _0x51d1bf=String(RegExp['$1'])[_0x45e2f5('0x7c2')]()[_0x45e2f5('0x580')]();if(_0x51d1bf===_0x45e2f5('0x753'))return'MANUAL';if(VisuMZ[_0x45e2f5('0x1fe')][_0x51d1bf])return _0x51d1bf;}else{function _0x2123d2(){const _0x5e67fa=_0x45e2f5;for(const _0x438f36 of this[_0x5e67fa('0x850')]()){if(_0x438f36)_0x438f36[_0x5e67fa('0x381')](_0x411483);}}}}const _0xad5850=VisuMZ['BattleCore'][_0x45e2f5('0x885')][_0x45e2f5('0x4e0')]['DefaultDamageStyle'][_0x45e2f5('0x7c2')]()[_0x45e2f5('0x580')]();if(VisuMZ[_0x45e2f5('0x1fe')][_0xad5850])return _0xad5850;return _0x45e2f5('0x753');},DataManager['getStypeIdWithName']=function(_0x121ad0){const _0x32c15e=_0x3219af;_0x121ad0=_0x121ad0[_0x32c15e('0x7c2')]()[_0x32c15e('0x580')](),this['_stypeIDs']=this[_0x32c15e('0x763')]||{};if(this[_0x32c15e('0x763')][_0x121ad0])return this[_0x32c15e('0x763')][_0x121ad0];for(let _0x51b647=0x1;_0x51b647<0x64;_0x51b647++){if(!$dataSystem[_0x32c15e('0x29')][_0x51b647])continue;let _0x3dcb1c=$dataSystem[_0x32c15e('0x29')][_0x51b647][_0x32c15e('0x7c2')]()[_0x32c15e('0x580')]();_0x3dcb1c=_0x3dcb1c[_0x32c15e('0x30e')](/\x1I\[(\d+)\]/gi,''),_0x3dcb1c=_0x3dcb1c[_0x32c15e('0x30e')](/\\I\[(\d+)\]/gi,''),this[_0x32c15e('0x763')][_0x3dcb1c]=_0x51b647;}return this['_stypeIDs'][_0x121ad0]||0x0;},DataManager[_0x3219af('0x83e')]=function(_0x13e4d2){const _0x203d6e=_0x3219af;_0x13e4d2=_0x13e4d2[_0x203d6e('0x7c2')]()[_0x203d6e('0x580')](),this[_0x203d6e('0x1c')]=this[_0x203d6e('0x1c')]||{};if(this['_skillIDs'][_0x13e4d2])return this[_0x203d6e('0x1c')][_0x13e4d2];for(const _0x4954bf of $dataSkills){if(!_0x4954bf)continue;this[_0x203d6e('0x1c')][_0x4954bf[_0x203d6e('0x99')][_0x203d6e('0x7c2')]()[_0x203d6e('0x580')]()]=_0x4954bf['id'];}return this[_0x203d6e('0x1c')][_0x13e4d2]||0x0;},DataManager[_0x3219af('0xd8')]=function(_0x16fb4f){const _0x26ca26=_0x3219af;_0x16fb4f=_0x16fb4f[_0x26ca26('0x7c2')]()['trim'](),this[_0x26ca26('0x115')]=this[_0x26ca26('0x115')]||{};if(this[_0x26ca26('0x115')][_0x16fb4f])return this[_0x26ca26('0x115')][_0x16fb4f];for(const _0x33d8b1 of $dataEnemies){if(_0x26ca26('0x2e3')===_0x26ca26('0x836')){function _0xcb8b57(){_0x15d0f3=_0x39e88b['GroupDigits'](_0x43affd);}}else{if(!_0x33d8b1)continue;this['_enemyIDs'][_0x33d8b1['name'][_0x26ca26('0x7c2')]()[_0x26ca26('0x580')]()]=_0x33d8b1['id'];}}return this[_0x26ca26('0x115')][_0x16fb4f]||0x0;},DataManager[_0x3219af('0x78c')]=function(_0x2328de){const _0x5f200e=_0x3219af;_0x2328de=_0x2328de[_0x5f200e('0x7c2')]()[_0x5f200e('0x580')](),this[_0x5f200e('0x5bc')]=this[_0x5f200e('0x5bc')]||{};if(this['_wtypeIDs'][_0x2328de])return this[_0x5f200e('0x5bc')][_0x2328de];for(let _0x4851a7=0x1;_0x4851a7<0x64;_0x4851a7++){if(!$dataSystem['weaponTypes'][_0x4851a7])continue;let _0x43c621=$dataSystem['weaponTypes'][_0x4851a7][_0x5f200e('0x7c2')]()[_0x5f200e('0x580')]();_0x43c621=_0x43c621[_0x5f200e('0x30e')](/\x1I\[(\d+)\]/gi,''),_0x43c621=_0x43c621[_0x5f200e('0x30e')](/\\I\[(\d+)\]/gi,''),this['_wtypeIDs'][_0x43c621]=_0x4851a7;}return this['_wtypeIDs'][_0x5f200e('0x57e')]=0x0,this[_0x5f200e('0x5bc')][_0x2328de]||0x0;},DataManager[_0x3219af('0x24')]=function(_0x2b4b8b){const _0x560ce1=_0x3219af,_0x187361=_0x560ce1('0x69e');let _0x5983fe=_0x2b4b8b[_0x560ce1('0x533')],_0x4f0ffa=_0x2b4b8b[_0x560ce1('0x99')];const _0x173eaa=_0x2b4b8b[_0x560ce1('0x1e2')];if(_0x173eaa[_0x560ce1('0x6f1')](/<DISPLAY ICON: (\d+)>/i)){if(_0x560ce1('0x335')===_0x560ce1('0x71')){function _0x35d966(){const _0x3f595b=_0x560ce1;_0x1323ae=_0x307510['concat'](_0x1026cb[_0x3f595b('0x51f')](_0x2c9cbd));}}else _0x5983fe=Number(RegExp['$1']);}return _0x173eaa['match'](/<DISPLAY TEXT: (.*)>/i)&&(_0x4f0ffa=String(RegExp['$1'])),_0x187361['format'](_0x5983fe,_0x4f0ffa);},DataManager['battleCommandName']=function(_0x3be9e4){const _0x30e8a1=_0x3219af;if(_0x3be9e4['note']['match'](/<COMMAND TEXT: (.*)>/i)){if(_0x30e8a1('0x562')!==_0x30e8a1('0x562')){function _0x4d9055(){const _0x50c636=_0x30e8a1,_0x1766b1=_0x4d4e66(_0x162f86['$1']);return[_0x25fa2a[_0x50c636('0x850')]()[_0x1766b1]];}}else return String(RegExp['$1']);}else{if(_0x30e8a1('0x398')!==_0x30e8a1('0x398')){function _0xb8fc49(){const _0x3eb5b9=_0x30e8a1;if(!_0x2a7574)return;if(!this[_0x3eb5b9('0x429')](_0x26ace1))return;const _0x5ec35a=this[_0x3eb5b9('0x211')](),_0x46e410=_0x4cc1e7['battleCommandName'](_0x4cb44f),_0x49538f=_0x18b95e['battleCommandIcon'](_0x5e2a58),_0x34bbd8=_0x5ec35a==='text'?_0x46e410:_0x3eb5b9('0x69e')[_0x3eb5b9('0x796')](_0x49538f,_0x46e410),_0x2e008a=this[_0x3eb5b9('0x6f4')][_0x3eb5b9('0x57d')](_0x46c73a);this[_0x3eb5b9('0x3b0')](_0x34bbd8,_0x3eb5b9('0x4e3'),_0x2e008a,_0x26fe9f['id']);}}else return _0x3be9e4[_0x30e8a1('0x99')];}},DataManager[_0x3219af('0x39a')]=function(_0x133cbc){const _0x5226d5=_0x3219af;return _0x133cbc[_0x5226d5('0x1e2')][_0x5226d5('0x6f1')](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x133cbc[_0x5226d5('0x533')];},DataManager[_0x3219af('0x870')]=function(_0x14d824){const _0x59d1d0=_0x3219af,_0x462773=$dataEnemies[_0x14d824];if(_0x462773){if(_0x59d1d0('0x7e2')!==_0x59d1d0('0x639')){if(_0x462773[_0x59d1d0('0x1e2')][_0x59d1d0('0x6f1')](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){if('gusfT'!==_0x59d1d0('0x9c')){function _0x4e2f68(){const _0x2b38e0=_0x59d1d0;this['createBattleFieldContainer'](),this['createAnimationContainer'](),this['createDamageContainer'](),this[_0x2b38e0('0x487')]();}}else{const _0x641e15=String(RegExp['$1'])[_0x59d1d0('0x4ee')](/[\r\n]+/)[_0x59d1d0('0x409')](''),_0x97fda5=this[_0x59d1d0('0x786')](_0x641e15);_0x14d824=this[_0x59d1d0('0xd8')](_0x97fda5)||_0x14d824,_0x14d824=DataManager[_0x59d1d0('0x870')](_0x14d824);}}}else{function _0x4054fd(){const _0xeb6ebf=_0x59d1d0;if(this['collapseType']()>=0x1)return!![];return this[_0xeb6ebf('0x7fa')]()[_0xeb6ebf('0x63a')];}}}return _0x14d824;},DataManager[_0x3219af('0x786')]=function(_0x2ac232){const _0x593d15=_0x3219af;let _0x484bb1=0x0;const _0x295366={};for(const _0x32139e of _0x2ac232){if(_0x32139e['match'](/(.*):[ ](\d+)/i)){const _0x3b86d0=String(RegExp['$1'])[_0x593d15('0x580')](),_0x1f4efb=Number(RegExp['$2']);_0x295366[_0x3b86d0]=_0x1f4efb,_0x484bb1+=_0x1f4efb;}else{if(_0x32139e['match'](/(.*):[ ](\d+\.?\d+)/i)){const _0x18c453=String(RegExp['$1'])[_0x593d15('0x580')](),_0xcbc34a=Number(RegExp['$2']);_0x295366[_0x18c453]=_0xcbc34a,_0x484bb1+=_0xcbc34a;}else _0x32139e!==''&&(_0x295366[_0x32139e]=0x1,_0x484bb1++);}}if(_0x484bb1<=0x0)return'';let _0x39c782=Math[_0x593d15('0x7ef')]()*_0x484bb1;for(const _0x5de351 in _0x295366){if(_0x593d15('0x6de')!==_0x593d15('0x6de')){function _0x565f82(){const _0x3ee12a=_0x593d15;return _0x48ad5b[_0x3ee12a('0x686')](_0x551a04=>_0x551a04[_0x3ee12a('0x705')]());}}else{_0x39c782-=_0x295366[_0x5de351];if(_0x39c782<=0x0)return _0x5de351;}}return'';},ConfigManager['autoBattleAtStart']=![],ConfigManager[_0x3219af('0x42b')]=![],ConfigManager[_0x3219af('0x62c')]=!![],VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x2bd')]=ConfigManager[_0x3219af('0x79')],ConfigManager[_0x3219af('0x79')]=function(){const _0x244c7c=_0x3219af,_0x4660e7=VisuMZ[_0x244c7c('0x1e6')][_0x244c7c('0x2bd')][_0x244c7c('0x448')](this);return _0x4660e7[_0x244c7c('0x3bc')]=this['autoBattleAtStart'],_0x4660e7[_0x244c7c('0x42b')]=this[_0x244c7c('0x42b')],_0x4660e7[_0x244c7c('0x62c')]=this[_0x244c7c('0x62c')],_0x4660e7;},VisuMZ[_0x3219af('0x1e6')]['ConfigManager_applyData']=ConfigManager[_0x3219af('0x60f')],ConfigManager[_0x3219af('0x60f')]=function(_0x366dc5){const _0x4a1476=_0x3219af;VisuMZ['BattleCore']['ConfigManager_applyData'][_0x4a1476('0x448')](this,_0x366dc5);_0x4a1476('0x3bc')in _0x366dc5?this['autoBattleAtStart']=_0x366dc5['autoBattleAtStart']:this['autoBattleAtStart']=![];if(_0x4a1476('0x42b')in _0x366dc5){if(_0x4a1476('0x54b')==='HJrXz')this[_0x4a1476('0x42b')]=_0x366dc5['autoBattleUseSkills'];else{function _0x26e5a6(){const _0x4f7967=_0x4a1476;_0xabeeac&&_0x4b6aa7&&_0x8852bd[_0x4f7967('0x1e2')]&&this[_0x4f7967('0x4b')](_0x5535d4[_0x4f7967('0x1e2')]);const _0x374cb5=_0x582e94[_0xd79e27];_0x374cb5&&this[_0x4f7967('0x4b')](_0x374cb5[_0x4f7967('0x99')]);}}}else{if('NrfLz'===_0x4a1476('0x132')){function _0x181f95(){const _0x5dfecb=_0x4a1476;this[_0x5dfecb('0x340')]=![],this[_0x5dfecb('0x381')](_0x5dfecb('0x256')),_0x142a85[_0x5dfecb('0x1e6')][_0x5dfecb('0x36b')]['call'](this,_0xb1fb1c),this[_0x5dfecb('0x381')](_0x5dfecb('0x608'));}}else this['autoBattleUseSkills']=![];}if('visualHpGauge'in _0x366dc5)this[_0x4a1476('0x62c')]=_0x366dc5[_0x4a1476('0x62c')];else{if('YMTaQ'!==_0x4a1476('0x817')){function _0x13cd12(){const _0x473e4b=_0x4a1476;this[_0x473e4b('0x12c')]();}}else this['visualHpGauge']=!![];}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7df')]=BattleManager[_0x3219af('0x19')],BattleManager[_0x3219af('0x19')]=function(){const _0x338a59=_0x3219af;VisuMZ['BattleCore'][_0x338a59('0x7df')][_0x338a59('0x448')](this),this['_forcedBattlers']=[];},BattleManager[_0x3219af('0x7c5')]=function(){const _0x20e90c=_0x3219af;if(!SceneManager[_0x20e90c('0x40d')]())return;const _0x3e89bc=SceneManager[_0x20e90c('0x684')][_0x20e90c('0x64b')];if(_0x3e89bc)_0x3e89bc[_0x20e90c('0x5a9')]();},BattleManager['battleSys']=function(){const _0x3b4b42=_0x3219af;if(BattleManager[_0x3b4b42('0x43f')]())return _0x3b4b42('0x696');return _0x3b4b42('0x7c9');},BattleManager[_0x3219af('0x2ec')]=function(_0x1c0721){const _0x134fe5=_0x3219af;return _0x1c0721=_0x1c0721[_0x134fe5('0x7c2')]()[_0x134fe5('0x580')](),this[_0x134fe5('0x6a2')]()===_0x1c0721;},BattleManager[_0x3219af('0x38a')]=function(){const _0x269452=_0x3219af;return this[_0x269452('0x2ec')](_0x269452('0x696'));},BattleManager[_0x3219af('0x228')]=function(){const _0x481b62=_0x3219af;return this[_0x481b62('0x2ec')](_0x481b62('0x7c9'));},BattleManager[_0x3219af('0x806')]=function(){const _0x309588=_0x3219af;return this[_0x309588('0x228')]();},BattleManager['isTickBased']=function(){return!this['isTurnBased']();},BattleManager[_0x3219af('0x381')]=function(_0x108766){const _0x3bc80e=_0x3219af;$gameParty['processBattleCoreJS'](_0x108766),$gameTroop[_0x3bc80e('0x381')](_0x108766);},VisuMZ['BattleCore'][_0x3219af('0x4ff')]=BattleManager[_0x3219af('0x842')],BattleManager[_0x3219af('0x842')]=function(){const _0x338a3a=_0x3219af;this[_0x338a3a('0x340')]=ConfigManager[_0x338a3a('0x3bc')],this[_0x338a3a('0x381')]('PreStartBattleJS'),VisuMZ['BattleCore'][_0x338a3a('0x4ff')][_0x338a3a('0x448')](this),this[_0x338a3a('0x381')]('PostStartBattleJS');},BattleManager[_0x3219af('0x54')]=function(_0xe32796){const _0x178ac5=_0x3219af,_0xb10460=VisuMZ[_0x178ac5('0x1e6')][_0x178ac5('0x885')][_0x178ac5('0x30')];_0xb10460[_0x178ac5('0xde')]&&$gameTemp[_0x178ac5('0x192')](_0xb10460[_0x178ac5('0xde')]);const _0xfb6a50=_0x178ac5('0x1e5')['format'](_0xe32796);_0xb10460[_0xfb6a50]&&$gameTemp[_0x178ac5('0x192')](_0xb10460[_0xfb6a50]);},VisuMZ[_0x3219af('0x1e6')]['BattleManager_processVictory']=BattleManager[_0x3219af('0x5ac')],BattleManager[_0x3219af('0x5ac')]=function(){const _0x20c9eb=_0x3219af;this[_0x20c9eb('0x381')](_0x20c9eb('0x58a')),VisuMZ[_0x20c9eb('0x1e6')][_0x20c9eb('0x6af')][_0x20c9eb('0x448')](this),this['processPostBattleCommonEvents'](_0x20c9eb('0x27e'));},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x3a5')]=BattleManager[_0x3219af('0x1f3')],BattleManager[_0x3219af('0x1f3')]=function(){const _0xf6589=_0x3219af;this['processBattleCoreJS'](_0xf6589('0xb0')),VisuMZ[_0xf6589('0x1e6')][_0xf6589('0x3a5')][_0xf6589('0x448')](this),this[_0xf6589('0x54')]('Defeat');},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x36b')]=BattleManager['endBattle'],BattleManager['endBattle']=function(_0x5beee1){const _0x4a6832=_0x3219af;this['_autoBattle']=![],this['processBattleCoreJS'](_0x4a6832('0x256')),VisuMZ[_0x4a6832('0x1e6')][_0x4a6832('0x36b')][_0x4a6832('0x448')](this,_0x5beee1),this[_0x4a6832('0x381')](_0x4a6832('0x608'));},VisuMZ['BattleCore'][_0x3219af('0x795')]=BattleManager[_0x3219af('0x6a3')],BattleManager[_0x3219af('0x6a3')]=function(){const _0x203988=_0x3219af;if(this[_0x203988('0x806')]())this[_0x203988('0x381')](_0x203988('0x2fa'));VisuMZ[_0x203988('0x1e6')][_0x203988('0x795')][_0x203988('0x448')](this);if(this['isTurnBased']())this[_0x203988('0x381')](_0x203988('0x221'));},VisuMZ['BattleCore'][_0x3219af('0x65f')]=BattleManager['startAction'],BattleManager['startAction']=function(){const _0x43f578=_0x3219af,_0x34ab1d=this[_0x43f578('0x31a')]['currentAction']();if(_0x34ab1d)_0x34ab1d['actionBattleCoreJS'](_0x43f578('0x5a4'));VisuMZ[_0x43f578('0x1e6')][_0x43f578('0x65f')]['call'](this);if(_0x34ab1d)_0x34ab1d['actionBattleCoreJS'](_0x43f578('0x182'));},VisuMZ[_0x3219af('0x1e6')]['BattleManager_endAction']=BattleManager[_0x3219af('0x711')],BattleManager[_0x3219af('0x711')]=function(){const _0x42cc5f=_0x3219af,_0x1a067e=this[_0x42cc5f('0x4c5')];if(_0x1a067e)_0x1a067e[_0x42cc5f('0x876')](_0x42cc5f('0x61c'));VisuMZ[_0x42cc5f('0x1e6')][_0x42cc5f('0xb7')][_0x42cc5f('0x448')](this);if(_0x1a067e)_0x1a067e[_0x42cc5f('0x876')](_0x42cc5f('0x5ba'));this[_0x42cc5f('0x233')](this['allBattleMembers']());},BattleManager[_0x3219af('0x233')]=function(_0x39b990){const _0x5968e4=_0x3219af;for(const _0x428025 of _0x39b990){if(!_0x428025)continue;if(!_0x428025[_0x5968e4('0x53f')]())continue;_0x428025['battler']()['refreshMotion']();}},BattleManager['updateAction']=function(){const _0x210498=_0x3219af;!this[_0x210498('0x3f6')][_0x210498('0x17e')]()&&this[_0x210498('0x711')]();},BattleManager[_0x3219af('0x6eb')]=function(){const _0x3d9bcd=_0x3219af;this[_0x3d9bcd('0x41c')]=VisuMZ[_0x3d9bcd('0x1e6')][_0x3d9bcd('0x885')]['Mechanics'][_0x3d9bcd('0x2eb')][_0x3d9bcd('0x448')](this);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7bc')]=BattleManager['onEscapeSuccess'],BattleManager['onEscapeSuccess']=function(){const _0x19b656=_0x3219af;this['processBattleCoreJS'](_0x19b656('0x25b')),BattleManager['_spriteset'][_0x19b656('0x158')](),VisuMZ[_0x19b656('0x1e6')][_0x19b656('0x7bc')][_0x19b656('0x448')](this),this[_0x19b656('0x54')](_0x19b656('0x3a8'));},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x396')]=BattleManager['onEscapeFailure'],BattleManager[_0x3219af('0x458')]=function(){const _0x2e14e9=_0x3219af;this['processBattleCoreJS'](_0x2e14e9('0x319'));const _0xa2768f=this[_0x2e14e9('0x41c')];VisuMZ[_0x2e14e9('0x1e6')][_0x2e14e9('0x396')][_0x2e14e9('0x448')](this),this[_0x2e14e9('0x41c')]=_0xa2768f+VisuMZ[_0x2e14e9('0x1e6')][_0x2e14e9('0x885')]['Mechanics'][_0x2e14e9('0x3cf')][_0x2e14e9('0x448')](this),this['processPostBattleCommonEvents'](_0x2e14e9('0x746'));},BattleManager['displayStartMessages']=function(){const _0x10740a=_0x3219af;let _0x16eec5=![];if(this[_0x10740a('0x4cb')]())for(const _0x5f0d50 of $gameTroop[_0x10740a('0x66a')]()){if(_0x10740a('0x6db')===_0x10740a('0x6db'))this['_logWindow'][_0x10740a('0x453')](_0x10740a('0x380'),TextManager['emerge'][_0x10740a('0x796')](_0x5f0d50)),this['_logWindow']['push'](_0x10740a('0x35e')),_0x16eec5=!![];else{function _0x639989(){const _0x13c533=_0x10740a,_0x592c38=_0x3b463d[_0x13c533('0x684')][_0x13c533('0x54e')]();this[_0x13c533('0x206')](_0x592c38['x'],_0x592c38['y'],_0x592c38['width'],_0x592c38['height']),this[_0x13c533('0x46d')](),this['setBackgroundType'](0x0);}}}if(this[_0x10740a('0x41')])this['_logWindow'][_0x10740a('0x453')]('addText',TextManager[_0x10740a('0x321')][_0x10740a('0x796')]($gameParty[_0x10740a('0x99')]())),this[_0x10740a('0x3f6')]['push'](_0x10740a('0x35e'));else this[_0x10740a('0x1cf')]&&(this['_logWindow']['push'](_0x10740a('0x380'),TextManager[_0x10740a('0x63b')]['format']($gameParty[_0x10740a('0x99')]())),this['_logWindow'][_0x10740a('0x453')]('wait'));_0x16eec5&&(this['_logWindow'][_0x10740a('0x453')](_0x10740a('0x35e')),this[_0x10740a('0x3f6')][_0x10740a('0x453')](_0x10740a('0x20a'))),this[_0x10740a('0x43f')]()&&this[_0x10740a('0x799')]()&&(this[_0x10740a('0x6d2')]=![]);},BattleManager[_0x3219af('0x4cb')]=function(){const _0x52197b=_0x3219af;if(BattleManager[_0x52197b('0x340')])return![];return VisuMZ[_0x52197b('0x1e6')][_0x52197b('0x885')][_0x52197b('0x5ff')][_0x52197b('0x234')];},VisuMZ['BattleCore'][_0x3219af('0x2e0')]=BattleManager[_0x3219af('0x3ee')],BattleManager[_0x3219af('0x3ee')]=function(){const _0x35989b=_0x3219af;VisuMZ[_0x35989b('0x1e6')][_0x35989b('0x2e0')][_0x35989b('0x448')](this);if(this['isDTB']()&&this['isSkipPartyCommandWindow']()&&!this[_0x35989b('0x1cf')]&&$gameParty['canInput']()){if('yXvsH'!==_0x35989b('0x7a1')){function _0x5b5488(){const _0x44d953=_0x35989b;_0x31aecb[_0x44d953('0x684')][_0x44d953('0x755')]();}}else this[_0x35989b('0x7ed')]();}},BattleManager[_0x3219af('0x799')]=function(){const _0x2458fa=_0x3219af;return VisuMZ[_0x2458fa('0x1e6')][_0x2458fa('0x885')]['PartyCmd'][_0x2458fa('0x13')];},BattleManager[_0x3219af('0x6aa')]=function(_0x4cb920,_0x52ec27){const _0x592737=_0x3219af;this[_0x592737('0x4c5')][_0x592737('0x549')]=_0x52ec27,this['_logWindow'][_0x592737('0x459')](_0x52ec27),this['_logWindow'][_0x592737('0xc')](_0x4cb920,this['_action']),this[_0x592737('0x4c5')][_0x592737('0x3bb')](_0x4cb920),this[_0x592737('0x3f6')][_0x592737('0x316')](_0x4cb920,_0x4cb920);},VisuMZ['BattleCore'][_0x3219af('0x5b')]=BattleManager[_0x3219af('0x704')],BattleManager[_0x3219af('0x704')]=function(_0xfb6985){const _0x450260=_0x3219af;if(this[_0x450260('0x5e8')]===_0x450260('0x2d7')){if(_0x450260('0x88d')===_0x450260('0x5e5')){function _0x567eda(){const _0x2980f0=_0x450260;_0x25f38a[_0x2980f0('0x1e6')][_0x2980f0('0x6ca')][_0x2980f0('0x448')](this);}}else this[_0x450260('0x28c')]();}else{if(this[_0x450260('0x5e8')]===_0x450260('0x1a2')){if(_0x450260('0x42')===_0x450260('0x42'))this[_0x450260('0x12c')]();else{function _0x3970b6(){const _0xa7d4ce=_0x450260;_0x418ef3[_0xa7d4ce('0x1e6')]['JS'][_0x108587][_0xa7d4ce('0x448')](this,this,this,_0x255a0e,0x0);}}}else VisuMZ[_0x450260('0x1e6')][_0x450260('0x5b')][_0x450260('0x448')](this,_0xfb6985);}},BattleManager[_0x3219af('0x3d1')]=function(){const _0x16857a=_0x3219af;this[_0x16857a('0x4a')]=this[_0x16857a('0x656')]['slice'](0x0),this[_0x16857a('0x3d6')]=0x0,this[_0x16857a('0x6b0')]=this[_0x16857a('0x4a')][0x0]||null,this['_phase']='custom';},BattleManager[_0x3219af('0x28c')]=function(){const _0x7eb574=_0x3219af;!this[_0x7eb574('0x879')]()&&!this[_0x7eb574('0x3f6')]['isBusy']()&&(this['_phase']='action');},BattleManager[_0x3219af('0x1a2')]=function(_0x288d91){const _0x16433c=_0x3219af;this[_0x16433c('0x40f')][_0x16433c('0x409')](_0x288d91);const _0x216570=JsonEx['makeDeepCopy'](_0x288d91['currentAction']());this['_forcedBattlers'][_0x16433c('0x453')]([_0x288d91,_0x216570]);},BattleManager[_0x3219af('0x887')]=function(){},BattleManager['updateStart']=function(){const _0x2b3eac=_0x3219af;if(this[_0x2b3eac('0x43f')]())this['_phase']='turn';else{if(this['_forcedBattlers'][_0x2b3eac('0x2da')]>0x0)this[_0x2b3eac('0x5e8')]='turn';else{if(_0x2b3eac('0x894')!=='txbQV')this[_0x2b3eac('0x3ee')]();else{function _0x20dc35(){const _0x26938f=_0x2b3eac,_0x42f3e4=_0x10c9c5['makeDeepCopy'](_0x440e30);_0x42f3e4[_0x26938f('0xf6')]=![],_0x42f3e4[_0x26938f('0x5fe')]=0x0,this['_damagePopupArray'][_0x26938f('0x453')](_0x42f3e4);}}}}},BattleManager[_0x3219af('0x399')]=function(){const _0x21e0f9=_0x3219af;for(;;){const _0x5f0114=this['getNextSubjectFromPool']();if(!_0x5f0114){if(_0x21e0f9('0x60a')===_0x21e0f9('0x60a'))return null;else{function _0x4a70e4(){const _0x2835fa=_0x21e0f9;this[_0x2835fa('0x1af')][_0x2835fa('0x601')][_0x2835fa('0x1fd')]=this[_0x2835fa('0x27c')][_0x2835fa('0x16a')]();}}}if(_0x5f0114['isBattleMember']()&&_0x5f0114[_0x21e0f9('0x705')]())return _0x5f0114;}},BattleManager[_0x3219af('0x48c')]=function(){const _0x2836da=_0x3219af;if(this[_0x2836da('0x586')][_0x2836da('0x2da')]>0x0){const _0x27ef24=this[_0x2836da('0x586')]['shift'](),_0x19318e=_0x27ef24[0x0];return _0x19318e[_0x2836da('0x512')]=_0x19318e['_actions']||[],_0x19318e[_0x2836da('0x512')][0x0]=_0x27ef24[0x1],_0x19318e;}else return this[_0x2836da('0x40f')]['shift']();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x5f9')]=Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x1a2')],Game_Battler[_0x3219af('0x3b5')]['forceAction']=function(_0x230c54,_0x58cca2){const _0x3f8e=_0x3219af;VisuMZ['BattleCore']['Game_Battler_forceAction'][_0x3f8e('0x448')](this,_0x230c54,_0x58cca2),this[_0x3f8e('0x512')][this[_0x3f8e('0x512')][_0x3f8e('0x2da')]-0x1][_0x3f8e('0x55')]=!![];},Game_Interpreter[_0x3219af('0x3b5')]['command339']=function(_0x4350be){return this['iterateBattler'](_0x4350be[0x0],_0x4350be[0x1],_0x21f883=>{const _0x93e3ac=_0x3c6d;if(_0x93e3ac('0x134')===_0x93e3ac('0x134')){if(!_0x21f883[_0x93e3ac('0x91')]()){if('wnTOQ'!==_0x93e3ac('0x713')){function _0xe07327(){const _0x58576b=_0x93e3ac;_0x16cdd0[_0x58576b('0x99')]=_0x3fedb8(_0x14c9a0['$1']);}}else _0x21f883[_0x93e3ac('0x1a2')](_0x4350be[0x2],_0x4350be[0x3]),BattleManager[_0x93e3ac('0x1a2')](_0x21f883);}}else{function _0x2ce760(){const _0x4c7d34=_0x93e3ac,_0x2f7720=_0x4bed5c['indexOf'](_0x5ea9dc[_0x4c7d34('0x7c2')]()[_0x4c7d34('0x580')]());_0x2f7720>=0x0&&_0x2f7720<=0x7&&_0x268075[_0x4c7d34('0x4a3')](_0x2f7720,_0x59838c);}}}),!![];},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x72f')]=BattleManager[_0x3219af('0x7ed')],BattleManager['selectNextCommand']=function(){const _0x4f627d=_0x3219af;this[_0x4f627d('0x43f')]()?this['selectNextCommandTpb']():VisuMZ[_0x4f627d('0x1e6')][_0x4f627d('0x72f')][_0x4f627d('0x448')](this);},BattleManager['selectNextCommandTpb']=function(){const _0x16b29a=_0x3219af;if(this[_0x16b29a('0x50f')]){if(this[_0x16b29a('0x50f')]['selectNextCommand']())return;this['finishActorInput'](),this[_0x16b29a('0x858')]();if(!this[_0x16b29a('0x31a')]&&!this['_currentActor']){if(_0x16b29a('0x73d')==='tYwFJ'){function _0x3d025c(){const _0x35e1c8=_0x16b29a;return this[_0x35e1c8('0x313')];}}else SceneManager[_0x16b29a('0x684')][_0x16b29a('0x755')]();}}else{if(!this[_0x16b29a('0x31a')]){if(_0x16b29a('0x4b3')!==_0x16b29a('0x11a'))this['selectNextActor']();else{function _0x3959e7(){const _0x5ef595=_0x16b29a;this[_0x5ef595('0xea')](_0x133eab[_0x5ef595('0x27a')]);}}}}},VisuMZ['BattleCore'][_0x3219af('0x32e')]=BattleManager[_0x3219af('0x239')],BattleManager['cancelActorInput']=function(){const _0x4b5705=_0x3219af;this['isTpb']()&&this[_0x4b5705('0x5e8')]==='battleEnd'&&(this['_currentActor']=null),VisuMZ[_0x4b5705('0x1e6')][_0x4b5705('0x32e')][_0x4b5705('0x448')](this);},SceneManager[_0x3219af('0x40d')]=function(){const _0x50bb28=_0x3219af;return this[_0x50bb28('0x684')]&&this[_0x50bb28('0x684')][_0x50bb28('0x4ad')]===Scene_Battle;},SceneManager[_0x3219af('0x5be')]=function(){const _0x3d4259=_0x3219af;return Spriteset_Battle[_0x3d4259('0x3b5')][_0x3d4259('0x7d7')]();},SceneManager[_0x3219af('0x864')]=function(){const _0x361620=_0x3219af;if(SceneManager[_0x361620('0x42f')](Scene_Options))return!![];return![];},SceneManager[_0x3219af('0x83c')]=function(){const _0x4f4fa9=_0x3219af;if(SceneManager[_0x4f4fa9('0x2d3')](Scene_Options))return!![];return![];},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x2')]=Game_Temp[_0x3219af('0x3b5')][_0x3219af('0x769')],Game_Temp[_0x3219af('0x3b5')][_0x3219af('0x769')]=function(_0x31222f,_0x520021,_0x122993){const _0x1f4988=_0x3219af;_0x31222f=_0x31222f[_0x1f4988('0x686')]((_0x559f74,_0x739838,_0x2035d9)=>_0x2035d9[_0x1f4988('0x589')](_0x559f74)===_0x739838);if(SceneManager[_0x1f4988('0x40d')]()&&SceneManager[_0x1f4988('0x5be')]()){if(_0x1f4988('0x444')!==_0x1f4988('0x444')){function _0x2f2121(){const _0x3e120c=_0x1f4988;if(!_0x5e0970[_0x3e120c('0x40d')]())return;if(!_0x353c4b[_0x3e120c('0x21c')])return;_0x1f0efa[_0x3e120c('0x371')](_0x170214,_0x482ae6);const _0x45de3e=_0x1827ee[_0x3e120c('0xdc')](),_0x1c950e=_0x299f92[_0x3e120c('0x1da')](_0xc8e4f2[_0x3e120c('0x7f6')]),_0x43f65b=_0x411f9c['WaitForCamera'];_0xb539ef[_0x3e120c('0x223')](_0x1c950e,_0x5a71e4[_0x3e120c('0x781')],_0x307384[_0x3e120c('0x25a')]);if(_0x43f65b)_0x45de3e[_0x3e120c('0x1bb')](_0x3e120c('0x262'));}}else _0x122993=!_0x122993;}VisuMZ[_0x1f4988('0x1e6')][_0x1f4988('0x2')][_0x1f4988('0x448')](this,_0x31222f,_0x520021,_0x122993);if(SceneManager[_0x1f4988('0x40d')]()){if('cuKVa'!=='cuKVa'){function _0x471f92(){const _0x518a58=_0x1f4988;return this[_0x518a58('0x19a')];}}else BattleManager[_0x1f4988('0x50d')][_0x1f4988('0x1cb')]();}},Game_Temp[_0x3219af('0x3b5')][_0x3219af('0x190')]=function(_0x440396){const _0x15dbf6=_0x3219af;this[_0x15dbf6('0x313')]=_0x440396;},Game_Temp['prototype'][_0x3219af('0xdc')]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp['prototype'][_0x3219af('0x7e0')]=function(){const _0x337fd6=_0x3219af;this[_0x337fd6('0x260')]=undefined;},Game_Temp[_0x3219af('0x3b5')]['applyForcedGameTroopSettingsBattleCore']=function(_0x534158){const _0x4f0979=_0x3219af;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x4f0979('0x4b')]($dataMap[_0x4f0979('0x1e2')]);const _0x451b23=$dataTroops[_0x534158];_0x451b23&&this[_0x4f0979('0x4b')](_0x451b23['name']);},Game_Temp['prototype']['parseForcedGameTroopSettingsBattleCore']=function(_0x4328b7){const _0x18caf3=_0x3219af;if(!_0x4328b7)return;if(_0x4328b7[_0x18caf3('0x6f1')](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x34001b=String(RegExp['$1']);if(_0x34001b[_0x18caf3('0x6f1')](/DEFAULT/i))this[_0x18caf3('0x260')]=_0x18caf3('0x311');else{if(_0x34001b[_0x18caf3('0x6f1')](/LIST/i)){if('llYbm'!==_0x18caf3('0x55a'))this[_0x18caf3('0x260')]=_0x18caf3('0x766');else{function _0x266b5a(){const _0x3ec64d=_0x18caf3;this[_0x3ec64d('0x426')]=0x0,this[_0x3ec64d('0x140')]=0x0;}}}else{if(_0x34001b[_0x18caf3('0x6f1')](/XP/i)){if(_0x18caf3('0x1a9')===_0x18caf3('0x235')){function _0x3f0684(){return 0x1;}}else this['_forcedBattleLayout']='xp';}else{if(_0x34001b[_0x18caf3('0x6f1')](/PORTRAIT/i)){if('HEDzQ'===_0x18caf3('0x1f6')){function _0x5250ec(){_0x22ef73=_0x5e2082;}}else this[_0x18caf3('0x260')]=_0x18caf3('0x82e');}else{if(_0x34001b[_0x18caf3('0x6f1')](/BORDER/i)){if('oIqts'===_0x18caf3('0x6f3')){function _0x5b976b(){const _0x6bf9b6=_0x18caf3;_0x24cc6f['BattleCore']['Game_Battler_onBattleStart'][_0x6bf9b6('0x448')](this,_0x1167a7),this[_0x6bf9b6('0x21d')](_0x19cfe9);}}else this[_0x18caf3('0x260')]=_0x18caf3('0x216');}}}}}}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x39d')]=Game_System[_0x3219af('0x3b5')][_0x3219af('0x54a')],Game_System[_0x3219af('0x3b5')][_0x3219af('0x54a')]=function(){const _0x2fe9ed=_0x3219af;VisuMZ['BattleCore'][_0x2fe9ed('0x39d')][_0x2fe9ed('0x448')](this),this[_0x2fe9ed('0x1ce')]();},Game_System[_0x3219af('0x3b5')][_0x3219af('0x1ce')]=function(){this['_defeatedEnemies']=this['_defeatedEnemies']||[];},Game_System[_0x3219af('0x3b5')]['getDefeatedEnemies']=function(){const _0x541201=_0x3219af;if(this['_defeatedEnemies']===undefined)this[_0x541201('0x1ce')]();return this[_0x541201('0x4')];},Game_System['prototype'][_0x3219af('0x6da')]=function(_0x5a4d4a){const _0x4c3e95=_0x3219af;if(this['_defeatedEnemies']===undefined)this['initBattleCore']();if(!_0x5a4d4a)return;if(this[_0x4c3e95('0x4')]['includes'](_0x5a4d4a))return;this[_0x4c3e95('0x4')][_0x4c3e95('0x453')](_0x5a4d4a),this[_0x4c3e95('0x4')][_0x4c3e95('0x4d9')]((_0x1ad227,_0x49215f)=>_0x1ad227-_0x49215f);},VisuMZ['BattleCore'][_0x3219af('0x6d0')]=Game_BattlerBase[_0x3219af('0x3b5')]['addNewState'],Game_BattlerBase[_0x3219af('0x3b5')]['addNewState']=function(_0x5eec4d){const _0x3a1190=_0x3219af,_0x51557f=this[_0x3a1190('0x705')](),_0x20938f=this['stateMotionIndex']();VisuMZ[_0x3a1190('0x1e6')]['Game_BattlerBase_addNewState'][_0x3a1190('0x448')](this,_0x5eec4d);if(this[_0x3a1190('0xf9')]()&&_0x51557f&&this[_0x3a1190('0x71f')]()){if('jJBYE'!=='jJBYE'){function _0x274862(){const _0xc9ac15=_0x3a1190;_0x3be7bf[_0xc9ac15('0x6d7')]=[];}}else this[_0x3a1190('0x5d7')]=!this[_0x3a1190('0x47e')](),$gameSystem[_0x3a1190('0x6da')](this[_0x3a1190('0x1ad')]());}if(SceneManager[_0x3a1190('0x40d')]()&&_0x20938f!==this[_0x3a1190('0x626')]()){if(_0x3a1190('0x3eb')!==_0x3a1190('0xfc'))this[_0x3a1190('0x53f')]()&&this[_0x3a1190('0x53f')]()[_0x3a1190('0x3f8')]();else{function _0x165d79(){const _0x5b8673=_0x3a1190;for(const _0x372a05 of _0x4fec06){const _0x358b19=_0x362a18[0x0][_0x5b8673('0x796')](_0x372a05[0x0],_0x143ec3[0x0]),_0x24926a=_0xad9efc[0x1][_0x5b8673('0x796')](_0x372a05[0x1],_0xf38d12[0x1])[_0x5b8673('0x580')](),_0x24008d=new _0x53545e(_0x434677[_0x5b8673('0x796')](_0x24926a),'i');_0x3248ab[_0x358b19]=_0x24008d;}}}}},Game_Enemy[_0x3219af('0x3b5')]['hasBeenDefeatedBefore']=function(){const _0x450a69=_0x3219af;return $gameSystem[_0x450a69('0x2f2')]()['includes'](this[_0x450a69('0x3c7')]);},VisuMZ[_0x3219af('0x1e6')]['Game_BattlerBase_eraseState']=Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x654')],Game_BattlerBase['prototype']['eraseState']=function(_0x35684a){const _0x26d6e6=_0x3219af;VisuMZ[_0x26d6e6('0x1e6')][_0x26d6e6('0x28d')]['call'](this,_0x35684a),this[_0x26d6e6('0xf9')]()&&_0x35684a===this[_0x26d6e6('0x388')]()&&this[_0x26d6e6('0x705')]()&&(this[_0x26d6e6('0x5d7')]=![]),SceneManager[_0x26d6e6('0x40d')]()&&this['requestMotionRefresh']();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x44e')]=Game_Action[_0x3219af('0x3b5')][_0x3219af('0x20a')],Game_Action['prototype'][_0x3219af('0x20a')]=function(){const _0x1f1348=_0x3219af;VisuMZ[_0x1f1348('0x1e6')][_0x1f1348('0x44e')][_0x1f1348('0x448')](this),this['_armorPenetration']={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x1f1348('0x827')]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0};},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x587')]=function(_0x5e3919,_0x20d645){const _0xd8b402=_0x3219af;return VisuMZ[_0xd8b402('0x1e6')][_0xd8b402('0x885')][_0xd8b402('0x4e0')][_0xd8b402('0x33b')][_0xd8b402('0x448')](this,_0x5e3919,_0x20d645);},Game_Action['prototype'][_0x3219af('0x7b7')]=function(_0x542852,_0x22590a){const _0x158c5d=_0x3219af;return VisuMZ[_0x158c5d('0x1e6')]['Settings']['Damage']['VarianceFormulaJS']['call'](this,_0x542852,_0x22590a);},Game_Action[_0x3219af('0x3b5')]['applyGuard']=function(_0x573f74,_0x22b5b9){const _0x3172f9=_0x3219af;return VisuMZ[_0x3172f9('0x1e6')][_0x3172f9('0x885')][_0x3172f9('0x4e0')]['GuardFormulaJS']['call'](this,_0x573f74,_0x22b5b9);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x712')]=Game_Action[_0x3219af('0x3b5')]['itemHit'],Game_Action[_0x3219af('0x3b5')][_0x3219af('0x752')]=function(_0x139505){const _0x5f9066=_0x3219af,_0x1d5558=this[_0x5f9066('0x259')]()[_0x5f9066('0x1e2')];if(_0x1d5558[_0x5f9066('0x6f1')](/<ALWAYS HIT>/i))return 0x1;else{if(_0x1d5558['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{if(_0x5f9066('0x65b')!==_0x5f9066('0x65b')){function _0x3a911f(){const _0xf353e1=_0x5f9066;if(!this['canMove']())return;if(!this[_0xf353e1('0x6ee')])return;if(this[_0xf353e1('0x426')]===_0x1cd62a)return;this[_0xf353e1('0x426')]=_0x418248,this[_0xf353e1('0x17b')]=_0x541dd8,this[_0xf353e1('0x662')]=_0x5fabe5,this[_0xf353e1('0x1c1')]=_0x1c4653||_0xf353e1('0x576'),this[_0xf353e1('0x642')]=_0x409629,this['_angleRevertOnFinish']===_0x26509a&&(this['_angleRevertOnFinish']=!![]),_0x51580b<=0x0&&(this[_0xf353e1('0x140')]=_0x37b4f8,this[_0xf353e1('0x642')]&&(this[_0xf353e1('0x426')]=0x0,this[_0xf353e1('0x140')]=0x0));}}else{let _0x2f57e9=VisuMZ[_0x5f9066('0x1e6')][_0x5f9066('0x712')]['call'](this,_0x139505);return _0x2f57e9=this[_0x5f9066('0x827')][_0x5f9066('0x4c8')]*_0x2f57e9+this['_multipliers']['hitFlat'],_0x2f57e9;}}}},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x6ed')]=function(_0x586341){const _0x169e5b=_0x3219af;if(!this[_0x169e5b('0x259')]()[_0x169e5b('0x5e1')][_0x169e5b('0x201')])return 0x0;let _0x4ee68e=VisuMZ[_0x169e5b('0x1e6')][_0x169e5b('0x885')][_0x169e5b('0x4e0')][_0x169e5b('0x433')][_0x169e5b('0x448')](this,_0x586341);return _0x4ee68e=this['_multipliers']['criticalHitRate']*_0x4ee68e+this[_0x169e5b('0x827')][_0x169e5b('0x7bb')],_0x4ee68e;},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x740')]=function(_0x19b142){const _0x3be149=_0x3219af;return _0x19b142=VisuMZ['BattleCore'][_0x3be149('0x885')][_0x3be149('0x4e0')][_0x3be149('0x288')][_0x3be149('0x448')](this,_0x19b142),_0x19b142=this[_0x3be149('0x827')][_0x3be149('0x447')]*_0x19b142+this[_0x3be149('0x827')][_0x3be149('0x618')],_0x19b142;},VisuMZ[_0x3219af('0x1e6')]['Game_Action_evalDamageFormula']=Game_Action[_0x3219af('0x3b5')]['evalDamageFormula'],Game_Action[_0x3219af('0x3b5')][_0x3219af('0x738')]=function(_0x4584b0){const _0x53cfbf=_0x3219af,_0x4414c7=DataManager['getDamageStyle'](this[_0x53cfbf('0x259')]());return _0x4414c7===_0x53cfbf('0x753')?VisuMZ[_0x53cfbf('0x1e6')][_0x53cfbf('0x538')][_0x53cfbf('0x448')](this,_0x4584b0):this[_0x53cfbf('0x874')](_0x4584b0);},Game_Action['prototype'][_0x3219af('0x62a')]=function(){const _0x5a5e14=_0x3219af;if(this[_0x5a5e14('0x259')]()[_0x5a5e14('0x1e2')][_0x5a5e14('0x6f1')](/<DAMAGE STYLE:[ ](.*)>/i)){const _0xc5d134=String(RegExp['$1'])[_0x5a5e14('0x7c2')]()[_0x5a5e14('0x580')]();return _0xc5d134;}return _0x5a5e14('0x753');},Game_Action['prototype'][_0x3219af('0x874')]=function(_0x2ee956){const _0xa12566=_0x3219af,_0x2a7c23=DataManager[_0xa12566('0x863')](this[_0xa12566('0x259')]()),_0x41acd7=VisuMZ[_0xa12566('0x1fe')][_0x2a7c23];try{if(_0xa12566('0x2e1')===_0xa12566('0xa4')){function _0x5d5d72(){const _0x4083c5=_0xa12566;this[_0x4083c5('0xf3')]();}}else return _0x41acd7[_0xa12566('0x1e0')][_0xa12566('0x448')](this,_0x2ee956);}catch(_0xe132b4){if(_0xa12566('0x6ef')!==_0xa12566('0x6ef')){function _0x3e8fbb(){const _0x1d2fbb=_0xa12566;this[_0x1d2fbb('0x340')]=_0x3abc64[_0x1d2fbb('0x3bc')],this[_0x1d2fbb('0x381')](_0x1d2fbb('0x48f')),_0x503ea8[_0x1d2fbb('0x1e6')][_0x1d2fbb('0x4ff')][_0x1d2fbb('0x448')](this),this[_0x1d2fbb('0x381')](_0x1d2fbb('0x479'));}}else{if($gameTemp[_0xa12566('0x50')]())console['log'](_0xe132b4);return VisuMZ['BattleCore'][_0xa12566('0x538')]['call'](this);}}},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x6e3')]=function(_0x4b3b96,_0x2462e3){const _0x53a493=_0x3219af;if(this[_0x53a493('0x628')]())return _0x2462e3;const _0x45b296=this[_0x53a493('0x7b1')](),_0x33bf1c=_0x4b3b96;let _0x57b20a=[],_0x307ae6=[];_0x57b20a[_0x53a493('0x453')](this['_armorPenetration'][_0x53a493('0x57a')],this['_armorPenetration']['arRedFlat']),_0x307ae6[_0x53a493('0x453')](this[_0x53a493('0xc0')][_0x53a493('0x30a')],this[_0x53a493('0xc0')][_0x53a493('0xe')]);const _0x1bd3df=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x478cec=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x5a363c=this[_0x53a493('0x423')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x1a67ec=this[_0x53a493('0x423')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;_0x57b20a=_0x57b20a[_0x53a493('0x1b4')](_0x33bf1c['traitObjects']()['map'](_0x1656ba=>_0x1656ba&&_0x1656ba[_0x53a493('0x1e2')][_0x53a493('0x6f1')](_0x1bd3df)?Number(RegExp['$1']):0x0)),_0x307ae6=_0x307ae6['concat'](_0x33bf1c['traitObjects']()[_0x53a493('0x75a')](_0x2df99c=>_0x2df99c&&_0x2df99c[_0x53a493('0x1e2')][_0x53a493('0x6f1')](_0x478cec)?Number(RegExp['$1'])/0x64:0x0)),_0x57b20a=_0x57b20a[_0x53a493('0x1b4')](_0x45b296[_0x53a493('0xd1')]()[_0x53a493('0x75a')](_0x5a47a0=>_0x5a47a0&&_0x5a47a0[_0x53a493('0x1e2')][_0x53a493('0x6f1')](_0x5a363c)?Number(RegExp['$1']):0x0)),_0x307ae6=_0x307ae6['concat'](_0x45b296[_0x53a493('0xd1')]()[_0x53a493('0x75a')](_0xad28cc=>_0xad28cc&&_0xad28cc[_0x53a493('0x1e2')][_0x53a493('0x6f1')](_0x1a67ec)?Number(RegExp['$1'])/0x64:0x0));this[_0x53a493('0x259')]()[_0x53a493('0x1e2')][_0x53a493('0x6f1')](_0x5a363c)&&_0x57b20a['push'](Number(RegExp['$1']));if(this[_0x53a493('0x259')]()[_0x53a493('0x1e2')][_0x53a493('0x6f1')](_0x1a67ec)){if(_0x53a493('0xd')!=='GrKSP'){function _0x4ad237(){const _0x2ab9e5=_0x53a493;if(this[_0x2ab9e5('0xf9')]()&&!this[_0x2ab9e5('0x585')]())return;let _0x2d4436=0x0;if(this[_0x2ab9e5('0x857')]()){const _0x30ad59=this['weapons']();_0x2d4436=_0x30ad59[0x0]?_0x30ad59[0x0][_0x2ab9e5('0x5db')]:0x0;}else this[_0x2ab9e5('0xf9')]()&&(_0x2d4436=this[_0x2ab9e5('0x7fa')]()[_0x2ab9e5('0x5db')]||0x0);const _0x147603=_0x379103[_0x2ab9e5('0x45')][_0x2d4436];_0x59b025===_0x2ab9e5('0x3c4')&&(_0x2cbaf9=[_0x2ab9e5('0x432'),'swing',_0x2ab9e5('0x6b2')][_0x147603['type']]||_0x2ab9e5('0x476')),this[_0x2ab9e5('0x56d')]={'motionType':_0x2c6179,'weaponImageId':_0x2caa13?_0x147603['weaponImageId']:0x0,'pattern':_0x58b155};}}else _0x307ae6[_0x53a493('0x453')](Number(RegExp['$1']));}_0x2462e3=_0x57b20a[_0x53a493('0x482')]((_0x2cac02,_0x51fb64)=>_0x2cac02-_0x51fb64,_0x2462e3);if(_0x2462e3>0x0){if(_0x53a493('0x154')!==_0x53a493('0x78d'))_0x2462e3=_0x307ae6[_0x53a493('0x482')]((_0x3e58ef,_0x529e2c)=>_0x3e58ef*(0x1-_0x529e2c),_0x2462e3);else{function _0x4a15ff(){const _0x3b4067=_0x53a493;if(!this['canGuardBattleCore']())return![];return _0x514bc3['BattleCore'][_0x3b4067('0x438')]['call'](this);}}}return _0x2462e3;},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x52a')]=Game_Action['prototype'][_0x3219af('0xc1')],Game_Action[_0x3219af('0x3b5')]['executeDamage']=function(_0x34733f,_0x4e6797){const _0x1cfe26=_0x3219af;_0x4e6797=_0x4e6797*this[_0x1cfe26('0x827')][_0x1cfe26('0x25f')],_0x4e6797+=this['_multipliers'][_0x1cfe26('0x5d4')]*(_0x4e6797>=0x0?0x1:-0x1),_0x4e6797=this[_0x1cfe26('0x599')](_0x1cfe26('0x186'),_0x34733f,_0x4e6797,![]),_0x4e6797=this['applyDamageCaps'](_0x4e6797),_0x4e6797=Math[_0x1cfe26('0x219')](_0x4e6797),this[_0x1cfe26('0x5eb')]=_0x4e6797,this[_0x1cfe26('0x69b')]=this[_0x1cfe26('0x69b')]||0x0,this[_0x1cfe26('0x69b')]+=_0x4e6797,VisuMZ[_0x1cfe26('0x1e6')][_0x1cfe26('0x52a')][_0x1cfe26('0x448')](this,_0x34733f,_0x4e6797),this[_0x1cfe26('0x599')](_0x1cfe26('0x536'),_0x34733f,_0x4e6797,!![]);},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x7a7')]=function(_0x1b6bdd){const _0x197017=_0x3219af;if(this['isBypassDamageCap']())return _0x1b6bdd;return _0x1b6bdd=this[_0x197017('0x394')](_0x1b6bdd),_0x1b6bdd=this[_0x197017('0x244')](_0x1b6bdd),_0x1b6bdd;},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x44b')]=function(){const _0x14fc85=_0x3219af,_0x509993=/<BYPASS DAMAGE CAP>/i;if(this['item']()[_0x14fc85('0x1e2')][_0x14fc85('0x6f1')](_0x509993))return!![];if(this['subject']()[_0x14fc85('0xd1')]()['some'](_0x3586bb=>_0x3586bb&&_0x3586bb[_0x14fc85('0x1e2')][_0x14fc85('0x6f1')](_0x509993)))return!![];return!VisuMZ['BattleCore']['Settings']['Damage'][_0x14fc85('0x29f')];},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x394')]=function(_0x3e78d6){const _0x3bf2aa=_0x3219af;if(!VisuMZ['BattleCore'][_0x3bf2aa('0x885')]['Damage'][_0x3bf2aa('0x813')])return _0x3e78d6;const _0x5e89ac=/<BYPASS SOFT DAMAGE CAP>/i;if(this['item']()[_0x3bf2aa('0x1e2')]['match'](_0x5e89ac))return!![];if(this['subject']()[_0x3bf2aa('0xd1')]()['some'](_0x4b9786=>_0x4b9786&&_0x4b9786[_0x3bf2aa('0x1e2')]['match'](_0x5e89ac)))return!![];const _0x4fe1ae=_0x3e78d6<0x0?-0x1:0x1;_0x3e78d6=Math[_0x3bf2aa('0x64d')](_0x3e78d6);let _0x742e52=this[_0x3bf2aa('0x7b1')]()[_0x3bf2aa('0x4f6')]();if(this['item']()[_0x3bf2aa('0x1e2')][_0x3bf2aa('0x6f1')](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)){if(_0x3bf2aa('0x79e')!=='nPIAc'){function _0x509194(){const _0x57be2b=_0x3bf2aa;if(this[_0x57be2b('0x585')]())this[_0x57be2b('0x6cd')]['forceWeaponAnimation'](_0x347a6d);}}else _0x742e52+=Number(RegExp['$1'])/0x64;}_0x742e52=_0x742e52[_0x3bf2aa('0x36')](0.01,0x1);const _0xe8b02d=this[_0x3bf2aa('0x6b1')](),_0x17b7fc=_0x742e52*_0xe8b02d;if(_0x3e78d6>_0x17b7fc&&_0xe8b02d>_0x17b7fc){_0x3e78d6-=_0x17b7fc;const _0x3427fd=VisuMZ['BattleCore'][_0x3bf2aa('0x885')][_0x3bf2aa('0x4e0')][_0x3bf2aa('0x81c')],_0x1adc48=Math[_0x3bf2aa('0x794')](0x1-_0x3e78d6/((_0xe8b02d-_0x17b7fc)*_0x3427fd+_0x3e78d6),0.01);_0x3e78d6*=_0x1adc48,_0x3e78d6+=_0x17b7fc;}return _0x3e78d6*_0x4fe1ae;},Game_Action['prototype'][_0x3219af('0x6b1')]=function(){const _0x3f72e7=_0x3219af;if(this[_0x3f72e7('0x259')]()['note']['match'](/<DAMAGE CAP:[ ](\d+)>/i)){if(_0x3f72e7('0x3e1')==='lkZYg'){function _0x3b8073(){this['selectNextCommand']();}}else return Number(RegExp['$1']);}else{if(_0x3f72e7('0x156')===_0x3f72e7('0x156'))return this[_0x3f72e7('0x7b1')]()[_0x3f72e7('0x66e')]();else{function _0x3fa764(){const _0xff6349=_0x3f72e7;this['allowCollapse']()?_0x3fcb61[_0xff6349('0x1e6')][_0xff6349('0x449')][_0xff6349('0x448')](this):(this[_0xff6349('0x250')]=!this[_0xff6349('0x75e')][_0xff6349('0x43d')](),!this[_0xff6349('0x250')]&&(this['opacity']=0x0));}}}},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x244')]=function(_0x1c6781){const _0x57a8bf=_0x3219af;let _0x4c9f2e=this[_0x57a8bf('0x6b1')]();return _0x1c6781[_0x57a8bf('0x36')](-_0x4c9f2e,_0x4c9f2e);},VisuMZ[_0x3219af('0x1e6')]['Game_Action_apply']=Game_Action[_0x3219af('0x3b5')][_0x3219af('0x3bb')],Game_Action[_0x3219af('0x3b5')]['apply']=function(_0x2b0243){const _0x3356d5=_0x3219af;this[_0x3356d5('0x599')](_0x3356d5('0x400'),_0x2b0243,0x0,!![]),VisuMZ[_0x3356d5('0x1e6')][_0x3356d5('0x199')][_0x3356d5('0x448')](this,_0x2b0243),this['applyBattleCoreJS'](_0x3356d5('0x582'),_0x2b0243,this[_0x3356d5('0x5eb')]||0x0,!![]);},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x599')]=function(_0x5a6a81,_0x1f57d4,_0x564ef2,_0x5a6093){const _0x412cba=_0x3219af;_0x564ef2=_0x564ef2||0x0;const _0x5ef059=_0x564ef2,_0x1e84f=VisuMZ[_0x412cba('0x1e6')]['Settings']['Mechanics'],_0x5ba610=_0x5a6a81[_0x412cba('0x796')]('');if(_0x1e84f[_0x5ba610]){if(_0x412cba('0x7aa')!=='ytJgU'){function _0x5f7c15(){const _0xfb113=_0x412cba;this[_0xfb113('0x691')](_0xfb113('0x35e'));}}else{_0x564ef2=_0x1e84f[_0x5ba610][_0x412cba('0x448')](this,_0x564ef2,_0x1f57d4);if(_0x5a6093)_0x564ef2=_0x5ef059;}}let _0xf892a0=VisuMZ[_0x412cba('0x1e6')][_0x412cba('0x676')](this[_0x412cba('0x259')](),_0x5a6a81[_0x412cba('0x796')](''));if(VisuMZ[_0x412cba('0x1e6')]['JS'][_0xf892a0]){if('hqTyu'!==_0x412cba('0x637')){function _0x4dd5b9(){const _0x1141ef=_0x412cba;if(_0x13a127[_0x1141ef('0x340')]&&!_0x4762ba[_0x1141ef('0x42b')])return this['makeActionListAutoAttack']();else{return _0x4944af[_0x1141ef('0x1e6')][_0x1141ef('0x468')]['call'](this);;}}}else{_0x564ef2=VisuMZ[_0x412cba('0x1e6')]['JS'][_0xf892a0]['call'](this,this[_0x412cba('0x7b1')](),_0x1f57d4,this[_0x412cba('0x259')](),_0x564ef2);if(_0x5a6093)_0x564ef2=_0x5ef059;}}for(const _0xbf7a4 of this[_0x412cba('0x7b1')]()[_0x412cba('0xd1')]()){if(!_0xbf7a4)continue;_0xf892a0=VisuMZ[_0x412cba('0x1e6')][_0x412cba('0x676')](_0xbf7a4,_0x5a6a81['format'](_0x412cba('0x41b')));if(VisuMZ[_0x412cba('0x1e6')]['JS'][_0xf892a0]){_0x564ef2=VisuMZ['BattleCore']['JS'][_0xf892a0]['call'](this,this[_0x412cba('0x7b1')](),_0x1f57d4,_0xbf7a4,_0x564ef2);if(_0x5a6093)_0x564ef2=_0x5ef059;}}for(const _0x2dba58 of _0x1f57d4[_0x412cba('0xd1')]()){if(!_0x2dba58)continue;_0xf892a0=VisuMZ[_0x412cba('0x1e6')][_0x412cba('0x676')](_0x2dba58,_0x5a6a81['format'](_0x412cba('0x5fc')));if(VisuMZ['BattleCore']['JS'][_0xf892a0]){if(_0x412cba('0x610')==='gWbfu'){_0x564ef2=VisuMZ['BattleCore']['JS'][_0xf892a0]['call'](this,this[_0x412cba('0x7b1')](),_0x1f57d4,_0x2dba58,_0x564ef2);if(_0x5a6093)_0x564ef2=_0x5ef059;}else{function _0x31863e(){const _0x2f704c=_0x412cba,_0x387fd4=this['itemLineRect'](_0x49cd1a),_0x186166=this[_0x2f704c('0x297')](_0x37a45f),_0x236481=this[_0x2f704c('0x17f')](_0x186166)['width'];this[_0x2f704c('0xee')](this[_0x2f704c('0x3a1')](_0x378803));const _0x5a9baa=this[_0x2f704c('0x21a')]();if(_0x5a9baa===_0x2f704c('0x2e5'))this[_0x2f704c('0x767')](_0x186166,_0x387fd4['x']+_0x387fd4[_0x2f704c('0x106')]-_0x236481,_0x387fd4['y'],_0x236481);else{if(_0x5a9baa===_0x2f704c('0x834')){const _0x257d27=_0x387fd4['x']+_0x42fcc6[_0x2f704c('0x42a')]((_0x387fd4['width']-_0x236481)/0x2);this['drawTextEx'](_0x186166,_0x257d27,_0x387fd4['y'],_0x236481);}else this[_0x2f704c('0x767')](_0x186166,_0x387fd4['x'],_0x387fd4['y'],_0x236481);}}}}}return _0x564ef2;},Game_Action[_0x3219af('0x3b5')]['actionBattleCoreJS']=function(_0x497414){const _0x408781=_0x3219af,_0x356fb9=this['_totalValue']||0x0,_0x1218e7=VisuMZ[_0x408781('0x1e6')][_0x408781('0x885')][_0x408781('0x30')],_0x3aec61=_0x497414[_0x408781('0x796')]('');_0x1218e7[_0x3aec61]&&_0x1218e7[_0x3aec61]['call'](this,_0x356fb9);let _0x4e88f2=VisuMZ[_0x408781('0x1e6')][_0x408781('0x676')](this['item'](),_0x497414);if(VisuMZ['BattleCore']['JS'][_0x4e88f2]){if(_0x408781('0x5a')===_0x408781('0x2f6')){function _0x2d6c07(){const _0x53b068=_0x408781;_0x394a44[_0x53b068('0x1e6')]['Scene_Battle_updateBattleProcess'][_0x53b068('0x448')](this);if(this[_0x53b068('0x6d3')]&&!_0xe51507['_subject'])this[_0x53b068('0x588')]();}}else VisuMZ[_0x408781('0x1e6')]['JS'][_0x4e88f2][_0x408781('0x448')](this,this[_0x408781('0x7b1')](),this[_0x408781('0x7b1')](),this['item'](),_0x356fb9);}for(const _0x29fdbe of this[_0x408781('0x7b1')]()[_0x408781('0xd1')]()){if(!_0x29fdbe)continue;_0x4e88f2=VisuMZ[_0x408781('0x1e6')][_0x408781('0x676')](_0x29fdbe,_0x497414),VisuMZ[_0x408781('0x1e6')]['JS'][_0x4e88f2]&&VisuMZ[_0x408781('0x1e6')]['JS'][_0x4e88f2][_0x408781('0x448')](this,this[_0x408781('0x7b1')](),this[_0x408781('0x7b1')](),_0x29fdbe,_0x356fb9);}},Game_Action[_0x3219af('0x3b5')]['speed']=function(){const _0x303abd=_0x3219af;return VisuMZ['BattleCore'][_0x303abd('0x885')][_0x303abd('0x30')]['CalcActionSpeedJS'][_0x303abd('0x448')](this);},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x57c')]=function(){const _0x633dc7=_0x3219af;return VisuMZ['BattleCore'][_0x633dc7('0x885')][_0x633dc7('0x30')][_0x633dc7('0xd2')];},Game_Action[_0x3219af('0x3b5')]['isCustomBattleScope']=function(){const _0x388d8d=_0x3219af;return this['item']()[_0x388d8d('0x1e2')][_0x388d8d('0x6f1')](/<JS TARGETS>/i);},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x757')]=function(){const _0xefc5df=_0x3219af;if(!this[_0xefc5df('0x86a')]&&this[_0xefc5df('0x7b1')]()[_0xefc5df('0x542')]())return![];if(this[_0xefc5df('0x232')]())return!![];return typeof this['item']()[_0xefc5df('0x65d')]==='string';},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x67c')]=Game_Action[_0x3219af('0x3b5')][_0x3219af('0x48a')],Game_Action[_0x3219af('0x3b5')]['isForOpponent']=function(){const _0x323fd6=_0x3219af;return this[_0x323fd6('0x757')]()&&!this[_0x323fd6('0x232')]()?this[_0x323fd6('0x76d')]():VisuMZ[_0x323fd6('0x1e6')][_0x323fd6('0x67c')][_0x323fd6('0x448')](this);},Game_Action[_0x3219af('0x3b5')]['isForOpponentBattleCore']=function(){const _0x5aa839=_0x3219af,_0x2c55f2=this['item']()[_0x5aa839('0x65d')];return _0x2c55f2['match'](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x5a6')]=Game_Action[_0x3219af('0x3b5')][_0x3219af('0x251')],Game_Action[_0x3219af('0x3b5')][_0x3219af('0x251')]=function(){const _0x2d212c=_0x3219af;return this['isBattleCoreTargetScope']()&&!this['isCustomBattleScope']()?this[_0x2d212c('0x845')]():VisuMZ[_0x2d212c('0x1e6')][_0x2d212c('0x5a6')]['call'](this);},Game_Action[_0x3219af('0x3b5')]['isForFriendBattleCore']=function(){const _0x4bac39=_0x3219af,_0x5028fa=this[_0x4bac39('0x259')]()[_0x4bac39('0x65d')];return _0x5028fa[_0x4bac39('0x6f1')](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x3219af('0x1e6')]['Game_Action_isForRandom']=Game_Action[_0x3219af('0x3b5')][_0x3219af('0x1b')],Game_Action['prototype'][_0x3219af('0x1b')]=function(){const _0x17e980=_0x3219af;return this[_0x17e980('0x757')]()&&!this[_0x17e980('0x232')]()?this[_0x17e980('0x4ab')]():VisuMZ[_0x17e980('0x1e6')][_0x17e980('0xf5')][_0x17e980('0x448')](this);},Game_Action['prototype'][_0x3219af('0x4ab')]=function(){const _0x1770b5=_0x3219af,_0x4019fb=this[_0x1770b5('0x259')]()['scope'];return _0x4019fb[_0x1770b5('0x6f1')](/(?:RAND|RANDOM)/i);},VisuMZ[_0x3219af('0x1e6')]['Game_Action_needsSelection']=Game_Action[_0x3219af('0x3b5')]['needsSelection'],Game_Action[_0x3219af('0x3b5')]['needsSelection']=function(){const _0x31b5c5=_0x3219af;if(this[_0x31b5c5('0x757')]()&&!this[_0x31b5c5('0x232')]())return this[_0x31b5c5('0x195')]();else{if(_0x31b5c5('0x4c3')===_0x31b5c5('0x4c3'))return VisuMZ[_0x31b5c5('0x1e6')][_0x31b5c5('0x307')][_0x31b5c5('0x448')](this);else{function _0xb2ed2(){const _0x39d2af=_0x31b5c5;_0x261ae5[_0x39d2af('0x192')](_0x57a4e5[_0x39d2af('0xde')]);}}}},Game_Action['prototype'][_0x3219af('0x195')]=function(){const _0x224337=_0x3219af,_0x42dadc=this[_0x224337('0x259')]()[_0x224337('0x65d')];if(_0x42dadc[_0x224337('0x6f1')](/RANDOM/i))return![];return VisuMZ[_0x224337('0x1e6')][_0x224337('0x307')][_0x224337('0x448')](this);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x14e')]=Game_Action[_0x3219af('0x3b5')]['makeTargets'],Game_Action[_0x3219af('0x3b5')][_0x3219af('0x49e')]=function(){const _0x13fa76=_0x3219af;if(this[_0x13fa76('0x757')]()){if('qPASw'!==_0x13fa76('0x47')){function _0x1c2a09(){const _0x34f64d=_0x13fa76;return _0x4f0852[_0x34f64d('0x1e6')][_0x34f64d('0x885')][_0x34f64d('0x34c')][_0x34f64d('0x5e3')];}}else return this[_0x13fa76('0x36f')]();}else{if(_0x13fa76('0x20b')!=='okAzD')return VisuMZ['BattleCore'][_0x13fa76('0x14e')][_0x13fa76('0x448')](this);else{function _0x7bb107(){const _0x3057c6=_0x13fa76;_0x4a6d4a+=(_0x44f918[_0x3057c6('0xf9')]()?0x1:-0x1)*_0x5b2da9[_0x3057c6('0x809')]()/0x2;}}}},Game_Action['prototype'][_0x3219af('0x36f')]=function(){const _0x5531ba=_0x3219af;let _0xe75224=[];const _0x3538ee=String(this[_0x5531ba('0x259')]()['scope']),_0x54ad4b=VisuMZ[_0x5531ba('0x1e6')][_0x5531ba('0x676')](this[_0x5531ba('0x259')](),_0x5531ba('0x7f6'));if(VisuMZ[_0x5531ba('0x1e6')]['JS'][_0x54ad4b]){if('BNhtI'===_0x5531ba('0x4b0')){const _0x15800a=VisuMZ[_0x5531ba('0x1e6')][_0x5531ba('0x676')](this[_0x5531ba('0x259')](),_0x5531ba('0x7f6'));return _0xe75224=VisuMZ[_0x5531ba('0x1e6')]['JS'][_0x15800a][_0x5531ba('0x448')](this,this[_0x5531ba('0x7b1')](),_0xe75224),this[_0x5531ba('0x30f')](_0xe75224);}else{function _0x257968(){const _0x19dcb2=_0x5531ba;_0x4a235d[_0x19dcb2('0x601')]=_0x1dc217[_0x19dcb2('0x45c')](_0x24c8d5);}}}if(_0x3538ee['match'](/(\d+) RANDOM ANY/i)){if(_0x5531ba('0x62d')==='GeyLq'){let _0x24b88d=Number(RegExp['$1']);while(_0x24b88d--){const _0x210f94=Math[_0x5531ba('0x85f')](0x2)===0x0?this[_0x5531ba('0x29e')]():this[_0x5531ba('0x21')]();_0xe75224['push'](_0x210f94[_0x5531ba('0x2fd')]());}return this[_0x5531ba('0x30f')](_0xe75224);}else{function _0x1441e6(){const _0xb4f406=_0x5531ba;return _0x39271d[_0xb4f406('0x833')]-_0x318580[_0xb4f406('0x833')];}}}if(_0x3538ee['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if('keCgu'==='keCgu'){let _0x30f714=Number(RegExp['$1']);while(_0x30f714--){_0xe75224[_0x5531ba('0x453')](this[_0x5531ba('0x29e')]()[_0x5531ba('0x2fd')]());}return this[_0x5531ba('0x30f')](_0xe75224);}else{function _0x1c90fc(){const _0x16ea8b=_0x5531ba;this[_0x16ea8b('0x4db')][_0x16ea8b('0x117')]=![];}}}if(_0x3538ee[_0x5531ba('0x6f1')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x10b825=Number(RegExp['$1']);while(_0x10b825--){if(_0x5531ba('0x3e0')!=='rtEdG'){function _0xe7eb7e(){const _0x27e0a8=_0x5531ba;if(!_0x42094c[_0x27e0a8('0x40d')]())return;const _0x4b0263=_0x4af076[_0x27e0a8('0x3f6')];_0x4b0263[_0x27e0a8('0x20a')]();}}else _0xe75224['push'](this['friendsUnit']()['trueRandomTarget']());}return this['repeatTargets'](_0xe75224);}if(_0x3538ee[_0x5531ba('0x6f1')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0xe75224['push'](...this[_0x5531ba('0x21')]()['aliveMembers']()[_0x5531ba('0x686')](_0x18b9e3=>_0x18b9e3!==this[_0x5531ba('0x7b1')]())),this[_0x5531ba('0x30f')](_0xe75224);return VisuMZ[_0x5531ba('0x1e6')][_0x5531ba('0x14e')][_0x5531ba('0x448')](this);},Game_Action[_0x3219af('0x3b5')][_0x3219af('0x245')]=function(_0x48bd7b){const _0x72e21b=_0x3219af,_0x4224ae=[];for(let _0xf395d0=0x0;_0xf395d0<this['numTargets']();_0xf395d0++){_0x4224ae['push'](_0x48bd7b[_0x72e21b('0x2fd')]());}return _0x4224ae;},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x3a2')]=Game_Action[_0x3219af('0x3b5')][_0x3219af('0x862')],Game_Action[_0x3219af('0x3b5')][_0x3219af('0x862')]=function(_0x1b2423,_0x527506){const _0x59aeb5=_0x3219af,_0x1442f5=_0x1b2423[_0x59aeb5('0xfb')]();if(this[_0x59aeb5('0x7b1')]()['attackStates']()[_0x59aeb5('0x895')](_0x1b2423[_0x59aeb5('0x388')]())){if('orBGr'===_0x59aeb5('0x45d')){function _0x10466c(){const _0x38c94a=_0x59aeb5;_0x2b88a3[_0x38c94a('0x1e6')][_0x38c94a('0x891')][_0x38c94a('0x448')](this,_0x317644),this[_0x38c94a('0x3af')](_0x5bb3b1);}}else _0x1b2423['setImmortal'](![]);}VisuMZ[_0x59aeb5('0x1e6')][_0x59aeb5('0x3a2')][_0x59aeb5('0x448')](this,_0x1b2423,_0x527506),_0x1b2423[_0x59aeb5('0x6')](_0x1442f5);},VisuMZ['BattleCore'][_0x3219af('0x2a3')]=Game_Action['prototype'][_0x3219af('0x42e')],Game_Action['prototype'][_0x3219af('0x42e')]=function(_0x399a9a,_0x510348){const _0x16c1ec=_0x3219af,_0x3d98e6=_0x399a9a['isImmortal']();_0x510348[_0x16c1ec('0x4ba')]===_0x399a9a[_0x16c1ec('0x388')]()&&_0x399a9a[_0x16c1ec('0x6')](![]),VisuMZ[_0x16c1ec('0x1e6')]['Game_Action_itemEffectAddNormalState']['call'](this,_0x399a9a,_0x510348),_0x399a9a[_0x16c1ec('0x6')](_0x3d98e6);},VisuMZ['BattleCore'][_0x3219af('0x48b')]=Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x19')],Game_BattlerBase['prototype']['initMembers']=function(){const _0x47dcf7=_0x3219af;VisuMZ[_0x47dcf7('0x1e6')][_0x47dcf7('0x48b')][_0x47dcf7('0x448')](this),this['initMembersBattleCore']();},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x3c9')]=function(){const _0x4deab2=_0x3219af;this[_0x4deab2('0x1b2')]=![];},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x528')]=Game_BattlerBase[_0x3219af('0x3b5')]['refresh'],Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x869')]=function(){const _0x3be4f5=_0x3219af;this[_0x3be4f5('0x884')]={},VisuMZ[_0x3be4f5('0x1e6')]['Game_BattlerBase_refresh'][_0x3be4f5('0x448')](this);},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x63c')]=function(_0xff6d6a){const _0x334b45=_0x3219af;return this[_0x334b45('0x884')]=this[_0x334b45('0x884')]||{},this[_0x334b45('0x884')][_0xff6d6a]!==undefined;},Game_BattlerBase['prototype'][_0x3219af('0x66e')]=function(){const _0x48eb97=_0x3219af;if(this[_0x48eb97('0x884')][_0x48eb97('0x66e')]!==undefined)return this['_cache'][_0x48eb97('0x66e')];const _0x5e3f4e=/<DAMAGE CAP:[ ](\d+)>/i,_0x5911e8=this['traitObjects']()['map'](_0x504e04=>_0x504e04&&_0x504e04[_0x48eb97('0x1e2')][_0x48eb97('0x6f1')](_0x5e3f4e)?Number(RegExp['$1']):0x0);let _0x122283=_0x5911e8[_0x48eb97('0x2da')]>0x0?Math[_0x48eb97('0x794')](..._0x5911e8):0x0;if(_0x122283<=0x0)_0x122283=VisuMZ[_0x48eb97('0x1e6')][_0x48eb97('0x885')][_0x48eb97('0x4e0')]['DefaultHardCap'];return this[_0x48eb97('0x884')][_0x48eb97('0x66e')]=_0x122283,this[_0x48eb97('0x884')]['hardDamageCap'];},Game_BattlerBase[_0x3219af('0x3b5')]['softDamageCapRate']=function(){const _0x352f2d=_0x3219af;if(this['_cache'][_0x352f2d('0x7a8')]!==undefined)return this[_0x352f2d('0x884')][_0x352f2d('0x7a8')];let _0x1068e1=VisuMZ['BattleCore']['Settings'][_0x352f2d('0x4e0')][_0x352f2d('0x83')];const _0x43b0db=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x1de3f8=this[_0x352f2d('0xd1')]()[_0x352f2d('0x75a')](_0x19ffa5=>_0x19ffa5&&_0x19ffa5[_0x352f2d('0x1e2')][_0x352f2d('0x6f1')](_0x43b0db)?Number(RegExp['$1'])/0x64:0x0);return _0x1068e1=_0x1de3f8[_0x352f2d('0x482')]((_0x12058d,_0x5c2396)=>_0x12058d+_0x5c2396,_0x1068e1),this[_0x352f2d('0x884')]['softDamageCap']=_0x1068e1,this['_cache'][_0x352f2d('0x7a8')]['clamp'](0.01,0x1);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x3b6')]=Game_BattlerBase['prototype'][_0x3219af('0x4be')],Game_BattlerBase[_0x3219af('0x3b5')]['die']=function(){const _0x3633a5=_0x3219af;VisuMZ['BattleCore'][_0x3633a5('0x3b6')][_0x3633a5('0x448')](this),SceneManager[_0x3633a5('0x40d')]()&&this[_0x3633a5('0x8c')](_0x3633a5('0x42c'));},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x53f')]=function(){const _0x587237=_0x3219af;if(!SceneManager[_0x587237('0x40d')]())return null;if(!SceneManager[_0x587237('0x684')][_0x587237('0x50d')])return null;return SceneManager[_0x587237('0x684')][_0x587237('0x50d')][_0x587237('0x57')](this);},Game_BattlerBase['prototype'][_0x3219af('0x15')]=function(){const _0x403395=_0x3219af;return VisuMZ[_0x403395('0x1e6')][_0x403395('0x885')][_0x403395('0x2b2')]['AnchorX'];},Game_BattlerBase['prototype'][_0x3219af('0x64f')]=function(){return VisuMZ['BattleCore']['Settings']['Actor']['AnchorY'];},Game_BattlerBase['prototype'][_0x3219af('0xed')]=function(){const _0x46438d=_0x3219af;return this[_0x46438d('0x857')]&&this[_0x46438d('0x857')]()?VisuMZ[_0x46438d('0x1e6')]['Settings'][_0x46438d('0x2b2')]['Shadow']:VisuMZ['BattleCore'][_0x46438d('0x885')][_0x46438d('0x5ff')][_0x46438d('0x327')];},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x16a')]=function(){return!![];},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x119')]=function(){return 0x0;},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x701')]=function(){return 0x0;},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x793')]=function(_0x397614){const _0x3fd8f5=_0x3219af;if(!_0x397614)return 0x0;let _0x3968d3=0x0;const _0x13cc8c=_0x397614[_0x3fd8f5('0x1e2')];return _0x13cc8c[_0x3fd8f5('0x6f1')](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x3968d3+=Number(RegExp['$1'])),_0x13cc8c['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3968d3+=Number(RegExp['$1'])),_0x3968d3;},Game_BattlerBase['prototype'][_0x3219af('0x37d')]=function(_0x28b2cf){const _0x25c76f=_0x3219af;if(!_0x28b2cf)return 0x0;let _0x548495=0x0;const _0x281bc5=_0x28b2cf[_0x25c76f('0x1e2')];return _0x281bc5[_0x25c76f('0x6f1')](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x548495+=Number(RegExp['$1'])),_0x281bc5['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x548495+=Number(RegExp['$2'])),_0x548495;},VisuMZ['BattleCore'][_0x3219af('0x719')]=Game_BattlerBase[_0x3219af('0x3b5')]['isStateResist'],Game_BattlerBase['prototype']['isStateResist']=function(_0x56a96b){const _0x4b1448=_0x3219af;if(_0x56a96b===this[_0x4b1448('0x388')]()&&this[_0x4b1448('0xfb')]()){if('PcWHh'===_0x4b1448('0x5d6')){function _0x2d046a(){const _0x54cd3b=_0x4b1448;_0x1f6bb3[_0x54cd3b('0x683')](_0x54cd3b('0x1a8'),this[_0x54cd3b('0x34f')][_0x54cd3b('0x84b')](this));}}else return!![];}return VisuMZ[_0x4b1448('0x1e6')]['Game_BattlerBase_isStateResist']['call'](this,_0x56a96b);},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0xfb')]=function(){return this['_immortal'];},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x6')]=function(_0x175dcb){const _0xf78227=_0x3219af;if(_0x175dcb){if('QBBAG'===_0xf78227('0x165'))this['addImmortal']();else{function _0x56ce82(){const _0x34f9e3=_0xf78227;if(!_0x17c401[_0x34f9e3('0x1e6')][_0x34f9e3('0x885')][_0x34f9e3('0x69c')][_0x34f9e3('0xba')])return;_0x442b99[_0x34f9e3('0x1e6')][_0x34f9e3('0x759')][_0x34f9e3('0x448')](this,_0x117598);}}}else{if('VhkTf'!=='CKdwa')this[_0xf78227('0x616')]();else{function _0x3a227a(){const _0x23306c=_0xf78227,_0x46a84b=this[_0x23306c('0x75e')]['svBattlerData']();this[_0x23306c('0x601')]=new _0x44e136(_0x46a84b[_0x23306c('0x106')],_0x46a84b[_0x23306c('0x1e3')]);}}}},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x520')]=function(){const _0x19947=_0x3219af;if(this['isDead']())return;this[_0x19947('0x1b2')]=!![];},Game_BattlerBase['prototype'][_0x3219af('0x616')]=function(){const _0x31dea3=_0x3219af,_0x4c10d4=this[_0x31dea3('0x705')]();this[_0x31dea3('0x1b2')]=![],this['refresh'](),this['isDead']()&&_0x4c10d4&&(this[_0x31dea3('0x84c')](),this[_0x31dea3('0x167')]());},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x56')]=Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x416')],Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x416')]=function(){const _0x40aba2=_0x3219af;if(!this[_0x40aba2('0xad')]())return![];return VisuMZ[_0x40aba2('0x1e6')][_0x40aba2('0x56')][_0x40aba2('0x448')](this);},Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0xad')]=function(){const _0x4e6d99=_0x3219af;for(const _0x48f29e of this[_0x4e6d99('0xd1')]()){if('GbsyD'!=='DxYhO'){if(!_0x48f29e)continue;if(_0x48f29e['note']['match'](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}else{function _0x379f76(){return _0x2f40b1['aliveMembers']();}}}return!![];},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x438')]=Game_BattlerBase[_0x3219af('0x3b5')]['canGuard'],Game_BattlerBase[_0x3219af('0x3b5')][_0x3219af('0x43e')]=function(){const _0x10829e=_0x3219af;if(!this[_0x10829e('0x7b8')]())return![];return VisuMZ[_0x10829e('0x1e6')]['Game_BattlerBase_canGuard'][_0x10829e('0x448')](this);},Game_BattlerBase['prototype'][_0x3219af('0x7b8')]=function(){const _0x25300e=_0x3219af;for(const _0x52fb1f of this[_0x25300e('0xd1')]()){if(!_0x52fb1f)continue;if(_0x52fb1f['note'][_0x25300e('0x6f1')](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x3219af('0x3b5')]['canUseItemCommand']=function(){const _0x21325b=_0x3219af;for(const _0xcdf8e8 of this[_0x21325b('0xd1')]()){if(!_0xcdf8e8)continue;if(_0xcdf8e8['note'][_0x21325b('0x6f1')](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x179')]=Game_Battler[_0x3219af('0x3b5')][_0x3219af('0xa8')],Game_Battler['prototype'][_0x3219af('0xa8')]=function(){const _0x5da85b=_0x3219af;if(SceneManager[_0x5da85b('0x40d')]()&&$gameTroop[_0x5da85b('0x1cc')]()<=0x0)return;this['processBattleCoreJS'](_0x5da85b('0x2b9')),VisuMZ[_0x5da85b('0x1e6')][_0x5da85b('0x179')][_0x5da85b('0x448')](this),this['regenerateAllBattleCore'](),this[_0x5da85b('0x381')](_0x5da85b('0x4f3'));},Game_Battler['prototype'][_0x3219af('0x3ec')]=function(){const _0x385334=_0x3219af;if(SceneManager[_0x385334('0x40d')]())for(const _0x5b33af of this[_0x385334('0xd1')]()){if(!_0x5b33af)continue;this[_0x385334('0x890')](_0x5b33af);}},Game_Battler['prototype'][_0x3219af('0x890')]=function(_0x4a16d3){const _0x12833c=_0x3219af;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!SceneManager[_0x12833c('0x40d')]())return;if(this[_0x12833c('0x71f')]())return;if(this[_0x12833c('0x43d')]())return;if(_0x4a16d3['note']['match'](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0xe31470=Number(RegExp['$1']);$gameTemp[_0x12833c('0x76f')]([this],_0xe31470,![],![]);}},VisuMZ[_0x3219af('0x1e6')]['Game_Battler_startTpbTurn']=Game_Battler['prototype'][_0x3219af('0x6bf')],Game_Battler['prototype']['startTpbTurn']=function(){const _0x46b515=_0x3219af;this[_0x46b515('0x381')](_0x46b515('0x2fa')),VisuMZ[_0x46b515('0x1e6')][_0x46b515('0x42d')]['call'](this),this[_0x46b515('0x381')]('PostStartTurnJS');},VisuMZ[_0x3219af('0x1e6')]['Game_Battler_onTurnEnd']=Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x287')],Game_Battler['prototype'][_0x3219af('0x287')]=function(){const _0x44e4c5=_0x3219af;this[_0x44e4c5('0x381')](_0x44e4c5('0x142')),VisuMZ[_0x44e4c5('0x1e6')][_0x44e4c5('0x5c7')]['call'](this),this[_0x44e4c5('0x381')]('PostEndTurnJS');},Game_Battler['prototype'][_0x3219af('0x381')]=function(_0x583f42){const _0x338b7d=_0x3219af,_0x4211f9=VisuMZ[_0x338b7d('0x1e6')]['Settings'][_0x338b7d('0x30')];if(_0x4211f9[_0x583f42])_0x4211f9[_0x583f42][_0x338b7d('0x448')](this);for(const _0x4fce0a of this[_0x338b7d('0xd1')]()){if(!_0x4fce0a)continue;key=VisuMZ[_0x338b7d('0x1e6')][_0x338b7d('0x676')](_0x4fce0a,_0x583f42);if(VisuMZ['BattleCore']['JS'][key]){if(_0x338b7d('0x125')!==_0x338b7d('0x125')){function _0x48d6dd(){const _0x4fa4f4=_0x338b7d;if(!_0x5576d3[_0x4fa4f4('0x40d')]())return;_0x3428b1[_0x4fa4f4('0x371')](_0x2b2195,_0x4077b4);const _0x578b22=_0xc436e8[_0x4fa4f4('0xdc')](),_0xb712d0=_0x37a232[_0x4fa4f4('0x31a')],_0x35ff99=_0x121479[_0x4fa4f4('0x2b7')];if(!_0x578b22)return;if(!_0xb712d0)return;_0xb712d0&&_0xb712d0[_0x4fa4f4('0x71f')]()&&_0x35ff99[_0x4fa4f4('0x7c2')]()[_0x4fa4f4('0x580')]()!==_0x4fa4f4('0x48d')&&_0x578b22[_0x4fa4f4('0x21e')]([_0x35ff99]);}}else VisuMZ[_0x338b7d('0x1e6')]['JS'][key][_0x338b7d('0x448')](this,this,this,_0x4fce0a,0x0);}}},Game_Battler['prototype'][_0x3219af('0x188')]=function(){const _0x5a102f=_0x3219af;return VisuMZ[_0x5a102f('0x1e6')][_0x5a102f('0x885')][_0x5a102f('0x2b2')][_0x5a102f('0x24a')]||![];},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x2b0')]=function(){const _0x402f7e=_0x3219af;if(this['isWaiting']()){if(this[_0x402f7e('0x188')]()){if(this[_0x402f7e('0x512')]['some'](_0x2b86bb=>_0x2b86bb[_0x402f7e('0x259')]()&&_0x2b86bb['isMagical']()))return!![];}else{if(_0x402f7e('0x26e')==='jHZVj'){if(this[_0x402f7e('0x512')]['some'](_0x31e104=>_0x31e104[_0x402f7e('0x259')]()&&_0x31e104['isMagicSkill']())){if(_0x402f7e('0x494')!==_0x402f7e('0x5ed'))return!![];else{function _0x9e72f6(){const _0x13b4b1=_0x402f7e;this[_0x13b4b1('0x39f')]();}}}}else{function _0x9e3ec7(){const _0x6ab721=_0x402f7e;this[_0x6ab721('0x453')](_0x6ab721('0x3d5')),this['push'](_0x6ab721('0x269')),this[_0x6ab721('0x453')]('addText',_0x35f643[_0x6ab721('0x1d6')]['format'](_0x2fd252[_0x6ab721('0x99')]())),this['push'](_0x6ab721('0x35e'));}}}}if(BattleManager[_0x402f7e('0x43f')]()&&this['_tpbState']==='casting'){if(_0x402f7e('0x2a5')===_0x402f7e('0x73')){function _0x4c64f1(){const _0x1ef4f2=_0x402f7e;this[_0x1ef4f2('0x1a7')]=_0x52ce65,this['_mainSprite']['bitmap']=_0x1b8970[_0x1ef4f2('0x558')](_0x4f1486);}}else return this['chantStyle']()?this[_0x402f7e('0x664')]()&&this[_0x402f7e('0x664')]()[_0x402f7e('0x259')]()&&this[_0x402f7e('0x664')]()[_0x402f7e('0x127')]():this[_0x402f7e('0x664')]()&&this[_0x402f7e('0x664')]()[_0x402f7e('0x259')]()&&this[_0x402f7e('0x664')]()[_0x402f7e('0x4e4')]();}return![];},Game_Battler['prototype'][_0x3219af('0x55e')]=function(){const _0xbc879c=_0x3219af;if(BattleManager[_0xbc879c('0x43f')]()&&this[_0xbc879c('0x8b')]===_0xbc879c('0x498')){if(this[_0xbc879c('0x188')]()){if(_0xbc879c('0x6d5')!==_0xbc879c('0x6d5')){function _0x37dece(){const _0xfe4b22=_0xbc879c;_0x4f2d85('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xfe4b22('0x796')](_0x208c01,_0x450a35,_0xc18706)),_0x55b66c[_0xfe4b22('0x7a6')]();}}else return this[_0xbc879c('0x664')]()&&this[_0xbc879c('0x664')]()[_0xbc879c('0x259')]()&&!this[_0xbc879c('0x664')]()[_0xbc879c('0x127')]();}else return this['currentAction']()&&this[_0xbc879c('0x664')]()[_0xbc879c('0x259')]()&&!this[_0xbc879c('0x664')]()[_0xbc879c('0x4e4')]();}return![];},VisuMZ['BattleCore']['Game_Battler_clearDamagePopup']=Game_Battler['prototype'][_0x3219af('0x4a1')],Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x4a1')]=function(){const _0x5c18f8=_0x3219af;VisuMZ[_0x5c18f8('0x1e6')]['Game_Battler_clearDamagePopup']['call'](this),this[_0x5c18f8('0x818')]=[];},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x390')]=function(){const _0x3e895a=_0x3219af;if(!this['_damagePopupArray'])this[_0x3e895a('0x4a1')]();return this[_0x3e895a('0x818')]['length']>0x0;},Game_Battler['prototype'][_0x3219af('0x5f2')]=function(){const _0x1ca0b8=_0x3219af;if(!SceneManager[_0x1ca0b8('0x40d')]())return;if(!this[_0x1ca0b8('0x818')])this[_0x1ca0b8('0x4a1')]();this[_0x1ca0b8('0x81b')]();const _0x414afa=this[_0x1ca0b8('0x53f')]();if(_0x414afa)_0x414afa[_0x1ca0b8('0x6b5')]();},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x81b')]=function(){const _0x50bcb5=_0x3219af,_0x2f6ca9=this[_0x50bcb5('0x778')]();if(_0x2f6ca9[_0x50bcb5('0x804')]||_0x2f6ca9[_0x50bcb5('0x7ca')]){const _0x105162=JsonEx['makeDeepCopy'](_0x2f6ca9);_0x105162[_0x50bcb5('0xf6')]=![],_0x105162[_0x50bcb5('0x5fe')]=0x0,this[_0x50bcb5('0x818')][_0x50bcb5('0x453')](_0x105162);}if(_0x2f6ca9[_0x50bcb5('0xf6')]){const _0x5c4a6c=JsonEx['makeDeepCopy'](_0x2f6ca9);_0x5c4a6c[_0x50bcb5('0x804')]=![],_0x5c4a6c[_0x50bcb5('0x7ca')]=![],_0x5c4a6c[_0x50bcb5('0x5fe')]=0x0,this[_0x50bcb5('0x818')][_0x50bcb5('0x453')](_0x5c4a6c);}if(_0x2f6ca9[_0x50bcb5('0x5fe')]!==0x0){const _0x26cac4=JsonEx[_0x50bcb5('0x2f8')](_0x2f6ca9);_0x26cac4['missed']=![],_0x26cac4[_0x50bcb5('0x7ca')]=![],_0x26cac4[_0x50bcb5('0xf6')]=![],this[_0x50bcb5('0x818')][_0x50bcb5('0x453')](_0x26cac4);}},Game_Battler[_0x3219af('0x3b5')]['getNextDamagePopup']=function(){const _0x3d7ed7=_0x3219af;if(!this[_0x3d7ed7('0x818')])this['clearDamagePopup']();if(VisuMZ[_0x3d7ed7('0x1e6')][_0x3d7ed7('0x885')][_0x3d7ed7('0x4e0')]['NewPopupBottom']){if(_0x3d7ed7('0x644')!==_0x3d7ed7('0x776'))return this[_0x3d7ed7('0x818')][_0x3d7ed7('0x4dd')]();else{function _0x1fe16a(){const _0x3c4f59=_0x3d7ed7,_0x234dee=_0x35395d(_0xb9090b['$1'])['split'](/[\r\n]+/)['remove']('');_0xf2d42['motionIdle']=_0x4bd708[_0x3c4f59('0x786')](_0x234dee);}}}else{if(_0x3d7ed7('0x3b2')!==_0x3d7ed7('0x3b2')){function _0x4d98c0(){const _0x44f7ce=_0x3d7ed7;let _0x569127=_0x10cd0f(_0x306c35['$1']);while(_0x569127--){_0x5f1be1[_0x44f7ce('0x453')](this[_0x44f7ce('0x21')]()[_0x44f7ce('0x2fd')]());}return this[_0x44f7ce('0x30f')](_0x26f636);}}else return this[_0x3d7ed7('0x818')]['pop']();}},Game_Battler['prototype'][_0x3219af('0x18a')]=function(_0x2c5547,_0x38f826){const _0x1a1215=_0x3219af;if(!SceneManager[_0x1a1215('0x40d')]())return;if(!this[_0x1a1215('0x53f')]())return;if(_0x2c5547[_0x1a1215('0x2da')]<=0x0)return;_0x38f826=_0x38f826||{},_0x38f826[_0x1a1215('0x414')]=_0x38f826['textColor']||_0x1a1215('0x1de'),_0x38f826[_0x1a1215('0xc8')]=_0x38f826[_0x1a1215('0xc8')]||[0x0,0x0,0x0,0x0],_0x38f826[_0x1a1215('0x61e')]=_0x38f826[_0x1a1215('0x61e')]||0x0,this[_0x1a1215('0x53f')]()['setupTextPopup'](_0x2c5547,_0x38f826);},Game_Battler[_0x3219af('0x3b5')]['setupIconTextPopup']=function(_0x51eb54,_0x5eabd6,_0x190f86){const _0x33bb24=_0x3219af;if(!SceneManager['isSceneBattle']())return;if(!this[_0x33bb24('0x53f')]())return;if(_0x5eabd6[_0x33bb24('0x2da')]<=0x0)return;_0x190f86=_0x190f86||{},_0x190f86[_0x33bb24('0x414')]=_0x190f86[_0x33bb24('0x414')]||_0x33bb24('0x1de'),_0x190f86[_0x33bb24('0xc8')]=_0x190f86[_0x33bb24('0xc8')]||[0x0,0x0,0x0,0x0],_0x190f86['flashDuration']=_0x190f86[_0x33bb24('0x61e')]||0x0,this['battler']()['setupIconTextPopup'](_0x51eb54,_0x5eabd6,_0x190f86);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x326')]=Game_Battler[_0x3219af('0x3b5')]['clearMotion'],Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x87a')]=function(){const _0x4f1fba=_0x3219af;VisuMZ[_0x4f1fba('0x1e6')][_0x4f1fba('0x326')][_0x4f1fba('0x448')](this),this['clearFreezeMotion']();},Game_Battler['prototype'][_0x3219af('0x55d')]=function(){return!![];},VisuMZ['BattleCore'][_0x3219af('0xff')]=Game_Battler['prototype']['onBattleStart'],Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x5e9')]=function(_0x46a887){const _0xc7f751=_0x3219af;VisuMZ[_0xc7f751('0x1e6')][_0xc7f751('0xff')][_0xc7f751('0x448')](this,_0x46a887),this[_0xc7f751('0x21d')](_0x46a887);},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x21d')]=function(_0x2bfa2d){const _0x2dc407=_0x3219af;this[_0x2dc407('0x2f7')](![]);},VisuMZ['BattleCore'][_0x3219af('0x7b0')]=Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x145')],Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x145')]=function(_0x6b3b0d){const _0x2f9ebe=_0x3219af;VisuMZ[_0x2f9ebe('0x1e6')][_0x2f9ebe('0x7b0')][_0x2f9ebe('0x448')](this,_0x6b3b0d);if(!_0x6b3b0d[_0x2f9ebe('0x148')]()){if(_0x2f9ebe('0x6dd')!=='UHSZY'){const _0x1abb4e=this[_0x2f9ebe('0x53f')]();if(_0x1abb4e)_0x1abb4e[_0x2f9ebe('0x342')]();}else{function _0x3828ec(){const _0x40fe8b=_0x2f9ebe,_0x1bd6f6=_0x136770[_0x40fe8b('0x682')]();_0x1bd6f6<=0x0?_0x263a10[_0x40fe8b('0x6ac')]():this[_0x40fe8b('0x3a9')](_0x4ce158,_0x1bd6f6);}}}this[_0x2f9ebe('0x2f7')](![]);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x76')]=Game_Battler['prototype'][_0x3219af('0x889')],Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x889')]=function(){const _0x142f02=_0x3219af;VisuMZ['BattleCore'][_0x142f02('0x76')][_0x142f02('0x448')](this),this[_0x142f02('0x1fa')]=![];const _0x4acc92=this[_0x142f02('0x53f')]();if(_0x4acc92)_0x4acc92[_0x142f02('0x34d')]();this[_0x142f02('0x2f7')](![]),this[_0x142f02('0x167')]();},Game_Battler[_0x3219af('0x3b5')]['performActionMotions']=function(_0x143f09){const _0x53977f=_0x3219af;if(_0x143f09[_0x53977f('0x2ae')]()){if(_0x53977f('0x653')!==_0x53977f('0x653')){function _0x1c00b9(){const _0x32aa80=_0x53977f;return _0x564f4e[_0x32aa80('0x268')]?_0x526562[_0x32aa80('0x557')]('ok'):_0x499db7[_0x32aa80('0x1e6')][_0x32aa80('0x885')][_0x32aa80('0x500')]['AutoBattleOK'];}}else this[_0x53977f('0x772')]();}else{if(_0x143f09[_0x53977f('0x148')]())this['requestMotion'](_0x53977f('0x4e2'));else{if(_0x143f09[_0x53977f('0x127')]())this['requestMotion'](_0x53977f('0x7e9'));else{if(_0x143f09['isSkill']())_0x143f09[_0x53977f('0x259')]()[_0x53977f('0x5e1')][_0x53977f('0x667')]>0x0?this[_0x53977f('0x772')]():this[_0x53977f('0x8c')](_0x53977f('0x690'));else{if(_0x143f09[_0x53977f('0x3ba')]()){if(_0x53977f('0x55b')!==_0x53977f('0x55b')){function _0x23d39a(){const _0x140031=_0x53977f;this[_0x140031('0x3f6')]['push']('addText',_0x41ce5f[_0x140031('0x7fd')][_0x140031('0x796')](_0x41b865)),this[_0x140031('0x3f6')][_0x140031('0x453')](_0x140031('0x35e')),_0x141c54=!![];}}else this[_0x53977f('0x8c')]('item');}}}}}},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x624')]=function(){const _0x3984b1=_0x3219af;return $dataSystem[_0x3984b1('0x45')][0x0];},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x2b5')]=function(){const _0x493bd9=_0x3219af,_0xc827a5=this[_0x493bd9('0x624')]();return _0xc827a5?_0xc827a5[_0x493bd9('0x27a')]:0x0;},Game_Battler[_0x3219af('0x3b5')]['performSubstitute']=function(_0x394c26){const _0x2944cd=_0x3219af;if(!$gameSystem['isSideView']())return;const _0x5ed7ea=this['battler'](),_0x22ef72=_0x394c26['battler']();if(!_0x5ed7ea||!_0x22ef72)return;const _0xe203d1=_0x22ef72['_baseX'],_0x3b1898=_0x22ef72[_0x2944cd('0x833')];this['moveBattlerToPoint'](_0xe203d1,_0x3b1898,0x0,![],_0x2944cd('0x576'),-0x1),_0x5ed7ea[_0x2944cd('0xb6')]();const _0x1d180b=VisuMZ['BattleCore'][_0x2944cd('0x885')]['ActionSequence'];let _0x28a589=(_0x22ef72[_0x2944cd('0x106')]+_0x5ed7ea[_0x2944cd('0x106')])/0x2;_0x28a589*=this[_0x2944cd('0x857')]()?0x1:-0x1;let _0x5e00e2=_0x1d180b[_0x2944cd('0x848')]*(this[_0x2944cd('0x857')]()?0x1:-0x1);_0x394c26[_0x2944cd('0x63e')](_0x28a589,_0x5e00e2,0x0,![],'Linear'),_0x22ef72[_0x2944cd('0xb6')]();},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x8c')]=function(_0x47759b){const _0x26993b=_0x3219af;if(SceneManager[_0x26993b('0x40d')]()){const _0x43d4ea=this[_0x26993b('0x53f')]();if(_0x43d4ea){if('yHstn'!=='yHstn'){function _0x334d7c(){const _0x19f707=_0x26993b;return _0x2e2883[_0x19f707('0x2fc')]()['filter'](_0x132c3b=>_0x132c3b!==_0x53cb52);}}else{_0x43d4ea[_0x26993b('0x777')](_0x47759b);if(['swing',_0x26993b('0x432'),_0x26993b('0x6b2')][_0x26993b('0x895')](_0x47759b)){if('rmYvY'===_0x26993b('0x52f'))this[_0x26993b('0x374')]();else{function _0x27d05d(){const _0x261a78=_0x26993b;if(!_0x270a20[_0x261a78('0x40d')]())return;const _0x5e6cc4=_0x1c3039['getLastPluginCommandInterpreter']();if(!_0x5e6cc4)return;_0x5e6cc4['setWaitMode'](_0x261a78('0x141'));}}}}}}this['clearFreezeMotion']();},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x374')]=function(){},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0xea')]=function(_0x5de2a5){const _0x234974=_0x3219af;if(SceneManager['isSceneBattle']()){const _0x162521=this[_0x234974('0x53f')]();if(_0x162521)_0x162521[_0x234974('0x509')](_0x5de2a5);}},Game_Battler['prototype'][_0x3219af('0x324')]=function(){const _0x3ce147=_0x3219af;if(SceneManager[_0x3ce147('0x40d')]()){if(_0x3ce147('0x1c5')===_0x3ce147('0x329')){function _0x4a993f(){const _0x1c5d32=_0x3ce147;if(!_0x4c92a6[_0x1c5d32('0x524')](_0x70fb8a))return!![];}}else{const _0x57f51c=this[_0x3ce147('0x2b5')]();this['startWeaponAnimation'](_0x57f51c);}}},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x4bd')]=function(_0x3a3614,_0x3a9ec0){const _0x18905f=_0x3219af;if(!_0x3a3614)return;if(!_0x3a3614[_0x18905f('0x259')]())return;if(_0x3a3614[_0x18905f('0x2ae')]())return;if(_0x3a3614[_0x18905f('0x148')]())return;if(_0x3a3614['isItem']())return;let _0x25e823=0x0;const _0x6ca7b4=VisuMZ[_0x18905f('0x1e6')][_0x18905f('0x885')][_0x18905f('0x564')],_0x166132=_0x3a3614['item']()[_0x18905f('0x1e2')];if(_0x166132['match'](/<CAST ANIMATION: (\d+)>/i))_0x25e823=Number(RegExp['$1']);else{if(_0x166132['match'](/<NO CAST ANIMATION>/i)){if(_0x18905f('0x77a')===_0x18905f('0x77a'))return;else{function _0x5229e6(){const _0x90db99=_0x18905f;return _0x29b3bd[_0x90db99('0x21')]()['aliveMembers']()[_0x90db99('0x686')](_0x450977=>_0x450977!==_0x21d214);}}}else{if(_0x3a3614[_0x18905f('0x628')]())_0x25e823=_0x6ca7b4['CastCertain'];else{if(_0x3a3614[_0x18905f('0x423')]())_0x25e823=_0x6ca7b4['CastPhysical'];else _0x3a3614['isMagical']()&&(_0x25e823=_0x6ca7b4[_0x18905f('0x5f0')]);}}}if(_0x25e823>0x0){if(_0x18905f('0x3be')!=='kzAfj')$gameTemp[_0x18905f('0x769')]([this],_0x25e823,!!_0x3a9ec0);else{function _0x200326(){const _0x5bdd7d=_0x18905f;_0x286ca2=_0x37b2ac[_0x5bdd7d('0x5b4')]/0x2,_0x4a3df7=_0xce73a[_0x5bdd7d('0x729')]/0x2;}}}},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0xe2')]=function(){const _0x3dec60=_0x3219af;SoundManager[_0x3dec60('0x66')]();let _0x58182f=VisuMZ[_0x3dec60('0x1e6')][_0x3dec60('0x885')][_0x3dec60('0x564')][_0x3dec60('0xb8')];if(_0x58182f>0x0){if('ByTJL'===_0x3dec60('0x773'))$gameTemp[_0x3dec60('0x769')]([this],_0x58182f);else{function _0x13d9cf(){const _0x17cbc5=_0x3dec60;if(this[_0x17cbc5('0x349')]<=0x0)return;if(!this[_0x17cbc5('0x6ee')])return;const _0x2f5e25=this[_0x17cbc5('0x349')],_0x5035f4=this[_0x17cbc5('0x622')],_0x586f06=this[_0x17cbc5('0x718')],_0x264d9f=this[_0x17cbc5('0x6ee')];_0x17053f[_0x17cbc5('0x268')]?(_0x264d9f[_0x17cbc5('0x48e')]['x']=this[_0x17cbc5('0x604')](_0x264d9f[_0x17cbc5('0x48e')]['x'],this[_0x17cbc5('0x2e7')],_0x2f5e25,_0x5035f4,_0x586f06),_0x264d9f[_0x17cbc5('0x48e')]['y']=this[_0x17cbc5('0x604')](_0x264d9f[_0x17cbc5('0x48e')]['y'],this['_targetSkewY'],_0x2f5e25,_0x5035f4,_0x586f06)):(_0x264d9f['skew']['x']=(_0x264d9f[_0x17cbc5('0x48e')]['x']*(_0x2f5e25-0x1)+this[_0x17cbc5('0x2e7')])/_0x2f5e25,_0x264d9f[_0x17cbc5('0x48e')]['y']=(_0x264d9f[_0x17cbc5('0x48e')]['y']*(_0x2f5e25-0x1)+this[_0x17cbc5('0x661')])/_0x2f5e25);this[_0x17cbc5('0x349')]--;if(this[_0x17cbc5('0x349')]<=0x0)this[_0x17cbc5('0x4d8')]();}}}},VisuMZ['BattleCore']['Game_Battler_performDamage']=Game_Battler[_0x3219af('0x3b5')]['performDamage'],Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x829')]=function(){const _0x1f8b01=_0x3219af;VisuMZ[_0x1f8b01('0x1e6')][_0x1f8b01('0x7ac')][_0x1f8b01('0x448')](this),this[_0x1f8b01('0x1d9')]();},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x1d9')]=function(){const _0x444f90=_0x3219af;if(!$gameSystem[_0x444f90('0x670')]())return;if(this[_0x444f90('0x1fa')])return;this[_0x444f90('0x1fa')]=!![];const _0x139ab9=this[_0x444f90('0x53f')]();if(_0x139ab9)_0x139ab9[_0x444f90('0x61f')]();},Game_Battler['prototype'][_0x3219af('0x167')]=function(){const _0x52b698=_0x3219af;if(this[_0x52b698('0x71f')]()&&this[_0x52b698('0x39e')]!==_0x52b698('0x42c')){this[_0x52b698('0x8c')](_0x52b698('0x42c'));return;}if(this[_0x52b698('0x71f')]()&&this[_0x52b698('0x39e')]===_0x52b698('0x42c'))return;if(!!this[_0x52b698('0x56d')])return;if(this[_0x52b698('0xf9')]()){this[_0x52b698('0x53f')]()[_0x52b698('0x3f8')](),this[_0x52b698('0x150')]();return;}if(this[_0x52b698('0x39e')]===_0x52b698('0x83b'))return;if(this[_0x52b698('0x39e')]===_0x52b698('0x41f')&&!BattleManager[_0x52b698('0x347')]())return;if(this[_0x52b698('0x39e')]===_0x52b698('0x4e2')&&!BattleManager[_0x52b698('0x347')]())return;this['clearMotion']();if(this[_0x52b698('0x53f')]()&&BattleManager['isInputting']()){if(_0x52b698('0x344')===_0x52b698('0x344')){this['battler']()[_0x52b698('0x3f8')](),this[_0x52b698('0x150')]();return;}else{function _0x3c7356(){const _0x3a7921=_0x52b698,_0x13888b=_0x64ecd5[_0x3a7921('0x3b5')][_0x3a7921('0x5b2')]['call'](arguments,0x1),_0x554248={'name':_0x4e4a43,'params':_0x13888b},_0x1522a2=this[_0x3a7921('0x7c8')]['map'](_0x4897ae=>_0x4897ae['name'])[_0x3a7921('0x589')](_0x3a7921('0x2ac'));_0x1522a2>=0x0?this['_methods'][_0x3a7921('0x2c7')](_0x1522a2,0x0,_0x554248):this[_0x3a7921('0x7c8')][_0x3a7921('0x453')](_0x554248);}}}},Game_Battler['prototype'][_0x3219af('0x37e')]=function(){const _0x490830=_0x3219af;return this[_0x490830('0x739')];},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x2f7')]=function(_0x49b9f6){const _0x20f048=_0x3219af;if(!$gameSystem[_0x20f048('0x670')]())return;this[_0x20f048('0x739')]=_0x49b9f6;const _0xc2b8c1=this[_0x20f048('0x53f')]();if(_0xc2b8c1)_0xc2b8c1[_0x20f048('0x12e')]();},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x121')]=function(_0xe2a5db,_0xb04c9a,_0x493471){const _0x4518a1=_0x3219af;if(!$gameSystem[_0x4518a1('0x670')]())return;const _0x12e6ac=this['battler']();if(!_0x12e6ac)return;if(_0xe2a5db===_0x12e6ac[_0x4518a1('0x5af')])return;let _0x5330e2=![];if(this['isActor']()){if(_0xe2a5db>_0x12e6ac[_0x4518a1('0x5af')])_0x5330e2=!![];if(_0xe2a5db<_0x12e6ac[_0x4518a1('0x5af')])_0x5330e2=![];}else{if(this[_0x4518a1('0xf9')]()){if(_0xe2a5db>_0x12e6ac[_0x4518a1('0x5af')])_0x5330e2=![];if(_0xe2a5db<_0x12e6ac['_baseX'])_0x5330e2=!![];}};this[_0x4518a1('0x2f7')](_0x493471?!_0x5330e2:_0x5330e2),_0x12e6ac[_0x4518a1('0x12e')]();},Game_Battler['prototype'][_0x3219af('0x63e')]=function(_0x405d4e,_0x21d17e,_0x3bcd99,_0x31b450,_0x3ded97){const _0x479e87=_0x3219af;if(!$gameSystem[_0x479e87('0x670')]())return;const _0xfe3d21=this[_0x479e87('0x53f')]();if(!_0xfe3d21)return;if(_0x31b450)this[_0x479e87('0x121')](_0x405d4e+_0xfe3d21['_baseX'],_0x21d17e+_0xfe3d21[_0x479e87('0x833')],![]);_0x405d4e+=_0xfe3d21['_baseX']-_0xfe3d21['_homeX'],_0x21d17e+=_0xfe3d21[_0x479e87('0x833')]-_0xfe3d21[_0x479e87('0x801')],_0xfe3d21[_0x479e87('0x7f5')](_0x405d4e,_0x21d17e,_0x3bcd99);if(Imported[_0x479e87('0x268')])_0xfe3d21[_0x479e87('0x7c6')](_0x3ded97||_0x479e87('0x576'));},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x417')]=function(_0x4ed576,_0x2bcaee,_0x4aba16,_0x49c6a0,_0x23d7fe,_0x21d3a1){const _0x36e048=_0x3219af;if(!$gameSystem[_0x36e048('0x670')]())return;const _0x63bd34=this[_0x36e048('0x53f')]();if(!_0x63bd34)return;if(_0x21d3a1>=0x0){if(_0x36e048('0x717')===_0x36e048('0x2ed')){function _0x2e60c8(){const _0x5b280a=_0x36e048;_0x24a432=_0x512531[_0x5b280a('0x1e6')]['JS'][_0x165b35]['call'](this,this[_0x5b280a('0x7b1')](),_0x2ccd80,_0x150d01,_0x3ceebe);if(_0x1e9f9e)_0x3a85e1=_0x4e4055;}}else{if(_0x63bd34[_0x36e048('0x5af')]>_0x4ed576)_0x4ed576+=_0x63bd34['width']/0x2+_0x21d3a1;if(_0x63bd34[_0x36e048('0x5af')]<_0x4ed576)_0x4ed576-=_0x63bd34[_0x36e048('0x106')]/0x2+_0x21d3a1;}}if(_0x49c6a0)this[_0x36e048('0x121')](_0x4ed576,_0x2bcaee,![]);_0x4ed576-=_0x63bd34['_homeX'],_0x2bcaee-=_0x63bd34[_0x36e048('0x801')],_0x63bd34[_0x36e048('0x7f5')](_0x4ed576,_0x2bcaee,_0x4aba16);if(Imported[_0x36e048('0x268')])_0x63bd34[_0x36e048('0x7c6')](_0x23d7fe||_0x36e048('0x576'));},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x698')]=function(_0x508658,_0x40b9c0,_0x13682b){const _0x3a2cb3=_0x3219af;if(!$gameSystem[_0x3a2cb3('0x670')]())return;const _0x4f82e3=this[_0x3a2cb3('0x53f')]();if(!_0x4f82e3)return;_0x4f82e3[_0x3a2cb3('0x88f')](_0x508658,_0x40b9c0,_0x13682b);},Game_Battler['prototype'][_0x3219af('0x779')]=function(_0x2035bf,_0x185899){const _0x4a8e60=_0x3219af;if(!$gameSystem['isSideView']())return;const _0x218f06=this[_0x4a8e60('0x53f')]();if(!_0x218f06)return;_0x218f06[_0x4a8e60('0x4da')](_0x2035bf,_0x185899);},Game_Battler[_0x3219af('0x3b5')]['spinBattler']=function(_0x2ec266,_0x35bfe1,_0x29e5f4,_0x49abd3){const _0x44ef13=_0x3219af;if(!$gameSystem[_0x44ef13('0x670')]())return;const _0x1ebb5d=this[_0x44ef13('0x53f')]();if(!_0x1ebb5d)return;_0x1ebb5d[_0x44ef13('0x267')](_0x2ec266,_0x35bfe1,_0x29e5f4,_0x49abd3);},Game_Battler['prototype']['skewBattler']=function(_0x488cbe,_0x1717c4,_0x348c6e,_0x5aa8e5){const _0x944012=_0x3219af;if(!$gameSystem[_0x944012('0x670')]())return;const _0xdaf342=this['battler']();if(!_0xdaf342)return;if(this[_0x944012('0x857')]()){if(_0x944012('0x36a')===_0x944012('0x5e6')){function _0x32457a(){const _0x48da10=_0x944012;if(!_0xd59b2b[_0x48da10('0x40d')]())return;if(!_0x2539cf[_0x48da10('0x21c')])return;_0x14c61a['ConvertParams'](_0x547e48,_0x4f3fd3);const _0x47fd2f=_0x3519aa[_0x48da10('0xdc')](),_0x27bf2b=_0x30f2b7[_0x48da10('0x55f')];_0x6bf590[_0x48da10('0x59a')](_0x177e96['OffsetX'],_0x378039[_0x48da10('0x44f')],_0x2cf1b7[_0x48da10('0x781')],_0x3c5a90[_0x48da10('0x25a')]);if(_0x27bf2b)_0x47fd2f[_0x48da10('0x1bb')](_0x48da10('0x262'));}}else _0x488cbe*=-0x1,_0x1717c4*=-0x1;}_0xdaf342[_0x944012('0x331')](_0x488cbe,_0x1717c4,_0x348c6e,_0x5aa8e5);},Game_Battler[_0x3219af('0x3b5')]['growBattler']=function(_0x15d614,_0x49825d,_0x372348,_0x4662bf){const _0x29d71c=_0x3219af;if(!$gameSystem[_0x29d71c('0x670')]())return;const _0x3253c4=this['battler']();if(!_0x3253c4)return;_0x3253c4['startGrow'](_0x15d614,_0x49825d,_0x372348,_0x4662bf);},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0xbe')]=function(_0x3142b7,_0x537d58,_0x2d8016){const _0x144e66=_0x3219af;if(!$gameSystem['isSideView']())return;const _0x28cacd=this[_0x144e66('0x53f')]();if(!_0x28cacd)return;_0x28cacd[_0x144e66('0x84f')](_0x3142b7,_0x537d58,_0x2d8016);},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x150')]=function(){const _0xc83041=_0x3219af,_0xf5a52b=!!this[_0xc83041('0x56d')];this[_0xc83041('0x56d')]=undefined;if(_0xf5a52b){if(_0xc83041('0x780')===_0xc83041('0x446')){function _0x4916d1(){const _0x34f0fa=_0xc83041,_0x1e86b9=_0x17dae1[this[_0x34f0fa('0x6f4')][_0x34f0fa('0x286')]()];if(!_0x1e86b9)return;if(!this[_0x34f0fa('0x429')](_0x1e86b9))return;const _0x2b65e8=this[_0x34f0fa('0x211')](),_0x566a07=_0x12ff43[_0x34f0fa('0x2a9')](_0x1e86b9),_0x347ac0=_0x287864['battleCommandIcon'](_0x1e86b9),_0x5e538b=_0x2b65e8==='text'?_0x566a07:'\x5cI[%1]%2'[_0x34f0fa('0x796')](_0x347ac0,_0x566a07);this[_0x34f0fa('0x3b0')](_0x5e538b,_0x34f0fa('0x4e2'),this[_0x34f0fa('0x6f4')]['canGuard']());}}else this['requestMotionRefresh'](),this[_0xc83041('0x111')]();}},Game_Battler['prototype'][_0x3219af('0x111')]=function(){const _0x2e275a=_0x3219af;if(!SceneManager[_0x2e275a('0x40d')]())return;const _0xf6567e=this[_0x2e275a('0x53f')]();if(!_0xf6567e)return;let _0x224211=this[_0x2e275a('0x857')]()?_0xf6567e[_0x2e275a('0x1fb')]:_0xf6567e[_0x2e275a('0x6cd')][_0x2e275a('0x1fb')];if(_0x224211){if('KELYF'===_0x2e275a('0xce'))_0x224211['setup'](0x0);else{function _0x1bb574(){const _0x535f0d=_0x2e275a;_0x46ba57[_0x535f0d('0x21e')]([_0x1c7994]);}}}},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x4e6')]=function(_0x4f93a2,_0x36e4be,_0x3f7697){const _0x1ab147=_0x3219af;if(this[_0x1ab147('0xf9')]()&&!this['hasSvBattler']())return;let _0x135a51=0x0;if(this[_0x1ab147('0x857')]()){const _0xb55682=this[_0x1ab147('0x865')]();_0x135a51=_0xb55682[0x0]?_0xb55682[0x0]['wtypeId']:0x0;}else this[_0x1ab147('0xf9')]()&&(_0x135a51=this['svBattlerData']()[_0x1ab147('0x5db')]||0x0);const _0x51775f=$dataSystem['attackMotions'][_0x135a51];_0x4f93a2===_0x1ab147('0x3c4')&&(_0x4f93a2=['thrust',_0x1ab147('0x476'),_0x1ab147('0x6b2')][_0x51775f[_0x1ab147('0x667')]]||_0x1ab147('0x476')),this[_0x1ab147('0x56d')]={'motionType':_0x4f93a2,'weaponImageId':_0x36e4be?_0x51775f[_0x1ab147('0x27a')]:0x0,'pattern':_0x3f7697};},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x45a')]=function(_0x33dcd3){const _0x30e18c=_0x3219af;if(!_0x33dcd3)return![];return _0x33dcd3[_0x30e18c('0x21')]()===this[_0x30e18c('0x21')]();},Game_Battler[_0x3219af('0x3b5')][_0x3219af('0x147')]=function(_0x41b9d9){const _0x580804=_0x3219af;if(!_0x41b9d9)return![];return _0x41b9d9['opponentsUnit']()===this[_0x580804('0x21')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x5a2')]=Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x7ea')],Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x7ea')]=function(_0x1aeec8){const _0x8e4009=_0x3219af;VisuMZ[_0x8e4009('0x1e6')][_0x8e4009('0x5a2')]['call'](this,_0x1aeec8),this[_0x8e4009('0x64c')]();},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x64c')]=function(){const _0x99fc4a=_0x3219af;this[_0x99fc4a('0x13b')]='';if(this['actor']()&&this[_0x99fc4a('0x16d')]()[_0x99fc4a('0x1e2')]['match'](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x99fc4a('0x428')===_0x99fc4a('0x6a')){function _0x451ec6(){const _0x403e26=_0x99fc4a;_0x2eb830['BattleCore']['BattleManager_updatePhase'][_0x403e26('0x448')](this,_0x4127a0);}}else this[_0x99fc4a('0x13b')]=String(RegExp['$1']);}},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x555')]=function(){const _0x34e22c=_0x3219af;if(this[_0x34e22c('0x166')]()!==''){if(_0x34e22c('0x469')!==_0x34e22c('0x3fe'))return this[_0x34e22c('0x166')]();else{function _0x1d4310(){const _0x3f795f=_0x34e22c;if(!_0x4763b8[_0x3f795f('0x1e6')]['JS'][_0x4d491a][_0x3f795f('0x448')](this,this['_actor'],_0x365dc0))return![];}}}else{if(Imported[_0x34e22c('0x2f0')]&&this[_0x34e22c('0x3d0')]()!==''){if(_0x34e22c('0x75c')==='KLVuK')return this['getMenuImage']();else{function _0x2b9aa4(){const _0x1d2b05=_0x34e22c;this[_0x1d2b05('0x266')]=new _0x4029a8(),this[_0x1d2b05('0x266')][_0x1d2b05('0x478')]=[new _0xc95578[(_0x1d2b05('0x478'))][(_0x1d2b05('0x3e3'))]()],this[_0x1d2b05('0x266')][_0x1d2b05('0x9d')]=new _0x1a20cf(),this[_0x1d2b05('0x266')][_0x1d2b05('0x206')](this['_padding'],this[_0x1d2b05('0x37a')]),this['addChild'](this[_0x1d2b05('0x266')]);}}}}return'';},Game_Actor[_0x3219af('0x3b5')]['getBattlePortrait']=function(){const _0x16d067=_0x3219af;if(this['_battlePortrait']===undefined)this[_0x16d067('0x64c')]();return this['_battlePortrait'];},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x412')]=function(_0x58293b){const _0x2bb556=_0x3219af;if(this[_0x2bb556('0x13b')]===undefined)this[_0x2bb556('0x64c')]();this[_0x2bb556('0x13b')]=_0x58293b;if(SceneManager[_0x2bb556('0x40d')]()&&$gameParty[_0x2bb556('0x2c8')]()[_0x2bb556('0x895')](this)){const _0x253c1c=SceneManager[_0x2bb556('0x684')][_0x2bb556('0x64b')];if(_0x253c1c)_0x253c1c[_0x2bb556('0x7e6')](this);}},Game_Actor['prototype'][_0x3219af('0x72c')]=function(){return!![];},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x3ce')]=function(){const _0x556253=_0x3219af;if(!this[_0x556253('0x542')]()&&BattleManager[_0x556253('0x340')])return!![];return Game_Battler['prototype'][_0x556253('0x3ce')][_0x556253('0x448')](this);},VisuMZ['BattleCore']['Game_Actor_makeActionList']=Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x1e4')],Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x1e4')]=function(){const _0x33c1c9=_0x3219af;if(BattleManager[_0x33c1c9('0x340')]&&!ConfigManager[_0x33c1c9('0x42b')])return this[_0x33c1c9('0x2a1')]();else{return VisuMZ['BattleCore']['Game_Actor_makeActionList'][_0x33c1c9('0x448')](this);;}},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x2a1')]=function(){const _0x4328fd=_0x3219af,_0x3d4b33=[],_0x367fbc=new Game_Action(this);return _0x367fbc['setAttack'](),_0x3d4b33[_0x4328fd('0x453')](_0x367fbc),_0x3d4b33;},Game_Actor[_0x3219af('0x3b5')]['battleCommands']=function(){const _0x1d648e=_0x3219af;if(this[_0x1d648e('0x40a')]()['note']['match'](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i))return String(RegExp['$1'])[_0x1d648e('0x4ee')](/[\r\n]+/);else{if('PaKFZ'===_0x1d648e('0x2b4'))return VisuMZ[_0x1d648e('0x1e6')][_0x1d648e('0x885')][_0x1d648e('0x79b')][_0x1d648e('0x6fb')];else{function _0x3bd6ec(){const _0x19c7fa=_0x1d648e;!this[_0x19c7fa('0x6cd')]&&(this[_0x19c7fa('0x6cd')]=new _0x173e4f(_0x4d0ba0),this[_0x19c7fa('0x55c')]()),this[_0x19c7fa('0x6cd')]['setBattler'](_0x1f078a);}}}},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x15')]=function(){const _0x56d58c=_0x3219af;if(this[_0x56d58c('0x884')][_0x56d58c('0x47c')]!==undefined)return this[_0x56d58c('0x884')]['svAnchorX'];if(this['actor']()[_0x56d58c('0x1e2')][_0x56d58c('0x6f1')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)){if(_0x56d58c('0x5e7')===_0x56d58c('0x263')){function _0xa3087b(){const _0x22fb8b=_0x56d58c,_0x4a153d=this[_0x22fb8b('0x3c1')](this[_0x22fb8b('0x3f5')]());let _0x19e428=this[_0x22fb8b('0x297')](this['index']());_0x19e428=_0x19e428[_0x22fb8b('0x30e')](/\\I\[(\d+)\]/gi,''),_0xaf964a[_0x22fb8b('0x1d5')](),this[_0x22fb8b('0xdb')](_0x19e428,_0x4a153d),this[_0x22fb8b('0x68f')](_0x19e428,_0x4a153d),this[_0x22fb8b('0x56f')](_0x19e428,_0x4a153d);}}else this[_0x56d58c('0x884')]['svAnchorX']=eval(RegExp['$1']),this[_0x56d58c('0x884')][_0x56d58c('0x58f')]=eval(RegExp['$2']);}else this['_cache'][_0x56d58c('0x47c')]=Game_Battler['prototype'][_0x56d58c('0x15')][_0x56d58c('0x448')](this);return this[_0x56d58c('0x884')][_0x56d58c('0x47c')];},Game_Actor[_0x3219af('0x3b5')]['svBattlerAnchorY']=function(){const _0x2fab3e=_0x3219af;if(this['_cache'][_0x2fab3e('0x58f')]!==undefined)return this[_0x2fab3e('0x884')][_0x2fab3e('0x58f')];if(this[_0x2fab3e('0x16d')]()['note']['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)){if(_0x2fab3e('0x456')!=='IilQw'){function _0x228eed(){const _0x4f0d62=_0x2fab3e;this[_0x4f0d62('0x57b')](_0x52cbc1,_0x2b34fc,_0x15ab39);}}else this[_0x2fab3e('0x884')]['svAnchorX']=eval(RegExp['$1']),this[_0x2fab3e('0x884')][_0x2fab3e('0x58f')]=eval(RegExp['$2']);}else{if('YcBwg'===_0x2fab3e('0x53e')){function _0x1d46e9(){const _0x1c1801=_0x2fab3e;_0x123bf1[_0x1c1801('0x1e6')][_0x1c1801('0x5f7')]['call'](this,_0x5d4ee9),this[_0x1c1801('0x39f')]();}}else this[_0x2fab3e('0x884')][_0x2fab3e('0x58f')]=Game_Battler[_0x2fab3e('0x3b5')]['svBattlerAnchorY'][_0x2fab3e('0x448')](this);}return this['_cache'][_0x2fab3e('0x58f')];},Game_Actor['prototype'][_0x3219af('0xed')]=function(){const _0x352fb9=_0x3219af;if(this[_0x352fb9('0x884')][_0x352fb9('0x9f')]!==undefined)return this[_0x352fb9('0x884')][_0x352fb9('0x9f')];if(this['actor']()['note'][_0x352fb9('0x6f1')](/<SIDEVIEW SHOW SHADOW>/i))this[_0x352fb9('0x884')][_0x352fb9('0x9f')]=!![];else this[_0x352fb9('0x16d')]()['note']['match'](/<SIDEVIEW HIDE SHADOW>/i)?this['_cache'][_0x352fb9('0x9f')]=![]:this[_0x352fb9('0x884')]['svShadow']=Game_Battler[_0x352fb9('0x3b5')][_0x352fb9('0xed')]['call'](this);return this['_cache'][_0x352fb9('0x9f')];},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x16a')]=function(){const _0x1e2fb7=_0x3219af;return VisuMZ[_0x1e2fb7('0x1e6')][_0x1e2fb7('0x885')][_0x1e2fb7('0x2b2')][_0x1e2fb7('0x7b3')];},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x374')]=function(){const _0x8e2e7b=_0x3219af,_0x2025e6=this[_0x8e2e7b('0x865')](),_0x5c8858=_0x2025e6[0x0]?_0x2025e6[0x0]['wtypeId']:0x0,_0x4157df=$dataSystem[_0x8e2e7b('0x45')][_0x5c8858];if(_0x4157df){if('mKOOJ'!==_0x8e2e7b('0x621')){function _0x429d2f(){const _0x2575e0=_0x8e2e7b;this[_0x2575e0('0x767')](_0x340637,_0x4b11cc['x'],_0x5175f['y'],_0x5a4f3a);}}else this[_0x8e2e7b('0xea')](_0x4157df['weaponImageId']);}},Game_Actor['prototype'][_0x3219af('0x68b')]=function(_0x230543){const _0x14ecf4=_0x3219af;Game_Battler[_0x14ecf4('0x3b5')][_0x14ecf4('0x68b')][_0x14ecf4('0x448')](this,_0x230543),this[_0x14ecf4('0x47a')](_0x230543);},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x624')]=function(){const _0xca1742=_0x3219af,_0x59af92=this[_0xca1742('0x865')](),_0x93c886=_0x59af92[0x0]?_0x59af92[0x0][_0xca1742('0x5db')]:0x0;return $dataSystem[_0xca1742('0x45')][_0x93c886];},Game_Actor['prototype'][_0x3219af('0x119')]=function(){const _0x2d82c7=_0x3219af;let _0x320cd5=_0x2d82c7('0x119');if(this[_0x2d82c7('0x63c')](_0x320cd5))return this['_cache'][_0x320cd5];return this[_0x2d82c7('0x884')][_0x320cd5]=this[_0x2d82c7('0x793')](this[_0x2d82c7('0x16d')]()),this[_0x2d82c7('0x884')][_0x320cd5];},Game_Actor[_0x3219af('0x3b5')][_0x3219af('0x701')]=function(){const _0x20a0e9=_0x3219af;let _0x6ae666=_0x20a0e9('0x701');if(this[_0x20a0e9('0x63c')](_0x6ae666))return this[_0x20a0e9('0x884')][_0x6ae666];return this[_0x20a0e9('0x884')][_0x6ae666]=this[_0x20a0e9('0x37d')](this[_0x20a0e9('0x16d')]()),this[_0x20a0e9('0x884')][_0x6ae666];},VisuMZ[_0x3219af('0x1e6')]['Game_Enemy_setup']=Game_Enemy[_0x3219af('0x3b5')]['setup'],Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x7ea')]=function(_0x2ed5f4,_0x1c2634,_0x452032){const _0x4d1e35=_0x3219af;_0x2ed5f4=DataManager[_0x4d1e35('0x870')](_0x2ed5f4),VisuMZ['BattleCore'][_0x4d1e35('0x86f')][_0x4d1e35('0x448')](this,_0x2ed5f4,_0x1c2634,_0x452032);Imported[_0x4d1e35('0xb2')]&&this[_0x4d1e35('0x3f3')]();this[_0x4d1e35('0x855')](),this[_0x4d1e35('0x176')]();if(Imported[_0x4d1e35('0xb2')]){if(_0x4d1e35('0x135')===_0x4d1e35('0x605')){function _0x49c740(){const _0x343d64=_0x4d1e35;_0x41ed4f?(this[_0x343d64('0x2e6')]['x']=(_0x24daef[_0x343d64('0x106')]-_0x5e2c04[_0x343d64('0x5b4')])/0x2,this[_0x343d64('0x2e6')]['y']=(_0x1a3679[_0x343d64('0x1e3')]-_0x575df1['boxHeight'])/0x2):(this['_windowLayer']['x']=_0x39d935[_0x343d64('0x106')]*0xa,this['_windowLayer']['y']=_0xdf10bb[_0x343d64('0x1e3')]*0xa);}}else this[_0x4d1e35('0x72b')]();}},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x855')]=function(){const _0x15bf0a=_0x3219af,_0x7ef53f=VisuMZ[_0x15bf0a('0x1e6')][_0x15bf0a('0x885')][_0x15bf0a('0x5ff')];this[_0x15bf0a('0x723')]=_0x7ef53f[_0x15bf0a('0x5fd')],this[_0x15bf0a('0x3a7')]={};},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x176')]=function(){const _0x3c7ceb=_0x3219af,_0x5e595b=VisuMZ[_0x3c7ceb('0x1e6')]['Settings'][_0x3c7ceb('0x5ff')],_0x29785a=this[_0x3c7ceb('0x569')]()[_0x3c7ceb('0x1e2')];this['_svBattlerData']={'name':'','wtypeId':_0x5e595b['WtypeId'],'collapse':_0x5e595b['AllowCollapse'],'motionIdle':_0x5e595b['MotionIdle'],'width':_0x5e595b[_0x3c7ceb('0x25e')]||0x40,'height':_0x5e595b[_0x3c7ceb('0x23b')]||0x40,'anchorX':_0x5e595b[_0x3c7ceb('0x69')]||0x0,'anchorY':_0x5e595b['AnchorY']||0x0,'shadow':_0x5e595b[_0x3c7ceb('0x327')]};_0x29785a[_0x3c7ceb('0x6f1')](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x3c7ceb('0x723')]=Number(RegExp['$1']));const _0x1a22ac=this['_svBattlerData'];if(_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW BATTLER: (.*)>/i)){if('gzxJW'===_0x3c7ceb('0x750'))_0x1a22ac[_0x3c7ceb('0x99')]=String(RegExp['$1']);else{function _0x373d5b(){const _0x152e5f=_0x3c7ceb,_0x51bf40=new _0x349035(_0x5d9843);this[_0x152e5f('0x1ec')][_0x152e5f('0x2b6')](_0x51bf40);}}}else{if(_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x1e3737=String(RegExp['$1'])[_0x3c7ceb('0x4ee')](/[\r\n]+/)['remove']('');_0x1a22ac['name']=DataManager[_0x3c7ceb('0x786')](_0x1e3737);}}if(_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)){if('YZXXs'===_0x3c7ceb('0x6c6'))_0x1a22ac[_0x3c7ceb('0x35')]=eval(RegExp['$1']),_0x1a22ac['anchorY']=eval(RegExp['$2']);else{function _0x4ebb57(){const _0x29cf4c=_0x3c7ceb;return _0x3ed1bf[_0x29cf4c('0x1e6')][_0x29cf4c('0x885')][_0x29cf4c('0x500')][_0x29cf4c('0x215')];}}}if(_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW COLLAPSE>/i))_0x1a22ac[_0x3c7ceb('0x63a')]=!![];else{if(_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW NO COLLAPSE>/i)){if('rBICq'!==_0x3c7ceb('0xc3'))_0x1a22ac[_0x3c7ceb('0x63a')]=![];else{function _0x4a7d43(){const _0x50a46e=_0x3c7ceb;_0x3a9d60[_0x50a46e('0x1e6')][_0x50a46e('0x449')]['call'](this);}}}}if(_0x29785a['match'](/<SIDEVIEW SHOW SHADOW>/i)){if(_0x3c7ceb('0x79a')===_0x3c7ceb('0x35c')){function _0x2266c9(){const _0x4fef1e=_0x3c7ceb;_0x374958[_0x4fef1e('0x1e6')][_0x4fef1e('0x5a2')][_0x4fef1e('0x448')](this,_0x57bc86),this[_0x4fef1e('0x64c')]();}}else _0x1a22ac['shadow']=!![];}else _0x29785a['match'](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x1a22ac['shadow']=![]);if(_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW IDLE MOTION: (.*)>/i)){if(_0x3c7ceb('0xc5')!==_0x3c7ceb('0x13f'))_0x1a22ac['motionIdle']=String(RegExp['$1'])[_0x3c7ceb('0x1b9')]()[_0x3c7ceb('0x580')]();else{function _0x28f657(){const _0x23e3bc=_0x3c7ceb;_0x6b6f96[_0x23e3bc('0x1e6')][_0x23e3bc('0x5de')][_0x23e3bc('0x448')](this),this[_0x23e3bc('0x3b4')]&&(this[_0x23e3bc('0x3b4')]=_0x41a8b8,_0x2f8bb5[_0x23e3bc('0x684')][_0x23e3bc('0x3cd')]());}}}else{if(_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){if(_0x3c7ceb('0x5ce')!==_0x3c7ceb('0x5ce')){function _0xbb18d(){const _0x223f69=_0x3c7ceb;if(!_0x221978[_0x223f69('0x40d')]())return;_0xaef50b[_0x223f69('0x371')](_0x28e42,_0x554c0a);const _0x3d0f26=_0x5404a7['getLastPluginCommandInterpreter'](),_0x975180=_0x1abd27['_action'],_0x1bf655=_0x264d9c[_0x223f69('0x31a')],_0x2b0408=_0x28fdb0[_0x223f69('0x4a')]?_0x581d14[_0x223f69('0x4a')][_0x223f69('0x5b2')](0x0):[],_0x534875=_0x100f44[_0x223f69('0x3f6')];if(!_0x3d0f26||!_0x975180||!_0x1bf655)return;if(!_0x975180[_0x223f69('0x259')]())return;if(_0x305aef[_0x223f69('0x6dc')])_0x534875[_0x223f69('0x453')](_0x223f69('0x3cb'),_0x1bf655,_0x2b0408,![]);if(_0x199107[_0x223f69('0x217')])_0x534875[_0x223f69('0x453')](_0x223f69('0x38e'));if(_0x1243e3[_0x223f69('0x376')])_0x534875[_0x223f69('0x453')](_0x223f69('0x519'));if(_0x2ad85a[_0x223f69('0x89d')])_0x534875['push'](_0x223f69('0x20a'));if(_0x467cc9[_0x223f69('0x665')])_0x534875[_0x223f69('0x453')](_0x223f69('0x889'),_0x1bf655);if(_0x5ac5d9[_0x223f69('0x408')])_0x534875[_0x223f69('0x453')](_0x223f69('0x52'));_0x3d0f26[_0x223f69('0x1bb')]('battlelog');}}else{const _0x1e31a0=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x3c7ceb('0x409')]('');_0x1a22ac[_0x3c7ceb('0x825')]=DataManager[_0x3c7ceb('0x786')](_0x1e31a0);}}}_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x1a22ac['width']=Number(RegExp['$1']),_0x1a22ac[_0x3c7ceb('0x1e3')]=Number(RegExp['$2']));if(_0x29785a['match'](/<SIDEVIEW WEAPON: (.*)>/i))_0x1a22ac[_0x3c7ceb('0x5db')]=DataManager[_0x3c7ceb('0x78c')](RegExp['$1']);else{if(_0x29785a[_0x3c7ceb('0x6f1')](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){if(_0x3c7ceb('0x33d')!==_0x3c7ceb('0x33d')){function _0x3f8996(){const _0xfa611f=_0x3c7ceb,_0x4a5162=_0xe4dc11[_0xfa611f('0x36d')](_0x1d1b78['x'],_0x30b335['y']);if(this[_0xfa611f('0x488')]&&this[_0xfa611f('0x14f')][_0x4a5162])return this[_0xfa611f('0x14f')][_0x4a5162];}}else{const _0x36fe83=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x3c7ceb('0x409')](''),_0x5222b4=DataManager[_0x3c7ceb('0x786')](_0x36fe83);_0x1a22ac[_0x3c7ceb('0x5db')]=DataManager[_0x3c7ceb('0x78c')](_0x5222b4);}}}if(Imported[_0x3c7ceb('0xb2')]){const _0x4b2ff1=this[_0x3c7ceb('0x57f')]();for(const _0x1f3936 of _0x4b2ff1){if(_0x3c7ceb('0x265')==='ODwVF'){const _0x5b449d=this['traitSet'](_0x1f3936)['Name'][_0x3c7ceb('0x7c2')]()['trim'](),_0x4c08d4=_0x1f3936[_0x3c7ceb('0x7c2')]()[_0x3c7ceb('0x580')]();if(_0x29785a['match'](VisuMZ[_0x3c7ceb('0x455')]['RegExp'][_0x3c7ceb('0x80d')[_0x3c7ceb('0x796')](_0x4c08d4,_0x5b449d)]))_0x1a22ac[_0x3c7ceb('0x99')]=String(RegExp['$1']);else{if(_0x29785a['match'](VisuMZ[_0x3c7ceb('0x455')]['RegExp'][_0x3c7ceb('0x726')[_0x3c7ceb('0x796')](_0x4c08d4,_0x5b449d)])){if(_0x3c7ceb('0x3bf')===_0x3c7ceb('0x3bf')){const _0x1aabbd=String(RegExp['$1'])[_0x3c7ceb('0x4ee')](/[\r\n]+/)['remove']('');_0x1a22ac[_0x3c7ceb('0x99')]=DataManager[_0x3c7ceb('0x786')](_0x1aabbd);}else{function _0x4e02d5(){const _0x38e761=_0x3c7ceb;this[_0x38e761('0x1bb')](_0x38e761('0x4e'));}}}}if(_0x29785a[_0x3c7ceb('0x6f1')](VisuMZ[_0x3c7ceb('0x455')][_0x3c7ceb('0x6d4')][_0x3c7ceb('0x764')['format'](_0x4c08d4,_0x5b449d)]))_0x1a22ac[_0x3c7ceb('0x5db')]=DataManager['getWtypeIdWithName'](RegExp['$1']);else{if(_0x29785a[_0x3c7ceb('0x6f1')](VisuMZ[_0x3c7ceb('0x455')][_0x3c7ceb('0x6d4')][_0x3c7ceb('0x1f2')[_0x3c7ceb('0x796')](_0x4c08d4,_0x5b449d)])){const _0x4878d3=String(RegExp['$1'])[_0x3c7ceb('0x4ee')](/[\r\n]+/)[_0x3c7ceb('0x409')](''),_0x3c9da1=DataManager[_0x3c7ceb('0x786')](_0x4878d3);_0x1a22ac[_0x3c7ceb('0x5db')]=DataManager['getWtypeIdWithName'](_0x3c9da1);}}if(_0x29785a[_0x3c7ceb('0x6f1')](VisuMZ['ElementStatusCore'][_0x3c7ceb('0x6d4')]['SvMotionIdleSolo-%1-%2'[_0x3c7ceb('0x796')](_0x4c08d4,_0x5b449d)]))_0x1a22ac[_0x3c7ceb('0x825')]=String(RegExp['$1'])['toLowerCase']()['trim']();else{if(_0x29785a[_0x3c7ceb('0x6f1')](VisuMZ[_0x3c7ceb('0x455')][_0x3c7ceb('0x6d4')][_0x3c7ceb('0x169')[_0x3c7ceb('0x796')](_0x4c08d4,_0x5b449d)])){const _0x593c24=String(RegExp['$1'])[_0x3c7ceb('0x4ee')](/[\r\n]+/)[_0x3c7ceb('0x409')]('');_0x1a22ac['motionIdle']=DataManager[_0x3c7ceb('0x786')](_0x593c24);}}}else{function _0x2a47e6(){const _0x42e089=_0x3c7ceb;if(this[_0x42e089('0x5d5')])return this[_0x42e089('0x5d5')];return this[_0x42e089('0x5d5')]=_0x503da5[_0x42e089('0x684')][_0x42e089('0x72a')](),this[_0x42e089('0x5d5')];}}}}},Game_Enemy[_0x3219af('0x3b5')]['attackAnimationId1']=function(){const _0x2cec5e=_0x3219af;return this[_0x2cec5e('0x723')]||0x0;},Game_Enemy['prototype'][_0x3219af('0x843')]=function(){return 0x0;},Game_Enemy['prototype']['canBattlerMove']=function(){const _0x277167=_0x3219af;if(this[_0x277167('0x569')]()[_0x277167('0x1e2')]['match'](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler['prototype']['canBattlerMove'][_0x277167('0x448')](this);},Game_Enemy['prototype']['skills']=function(){const _0x2eb0b7=_0x3219af,_0x4c9765=[];for(const _0x1099f7 of this[_0x2eb0b7('0x569')]()[_0x2eb0b7('0x25d')]){const _0xc02c08=$dataSkills[_0x1099f7[_0x2eb0b7('0x80')]];if(_0xc02c08&&!_0x4c9765[_0x2eb0b7('0x895')](_0xc02c08))_0x4c9765[_0x2eb0b7('0x453')](_0xc02c08);}return _0x4c9765;},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x119')]=function(){const _0x29e200=_0x3219af;let _0x2313e5='battleUIOffsetX';if(this[_0x29e200('0x63c')](_0x2313e5))return this[_0x29e200('0x884')][_0x2313e5];return this['_cache'][_0x2313e5]=this[_0x29e200('0x793')](this[_0x29e200('0x569')]()),this['_cache'][_0x2313e5];},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x701')]=function(){const _0x255b04=_0x3219af;let _0x37f024=_0x255b04('0x701');if(this[_0x255b04('0x63c')](_0x37f024))return this[_0x255b04('0x884')][_0x37f024];return this[_0x255b04('0x884')][_0x37f024]=this[_0x255b04('0x37d')](this[_0x255b04('0x569')]()),this[_0x255b04('0x884')][_0x37f024];},Game_Enemy['prototype'][_0x3219af('0x7fa')]=function(){const _0x47c8b1=_0x3219af;if(this[_0x47c8b1('0x3a7')]!==undefined)return this[_0x47c8b1('0x3a7')];return this[_0x47c8b1('0x176')](),this['_svBattlerData'];},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x585')]=function(){const _0x1d8937=_0x3219af;return this[_0x1d8937('0x7fa')]()[_0x1d8937('0x99')]!=='';},Game_Enemy['prototype']['svBattlerName']=function(){const _0x24c91f=_0x3219af;return this[_0x24c91f('0x7fa')]()[_0x24c91f('0x99')];},Game_Enemy['prototype']['battlerSmoothImage']=function(){const _0x58815b=_0x3219af;if(this[_0x58815b('0x585')]()){if(_0x58815b('0x5f4')!==_0x58815b('0x5f4')){function _0x53c035(){const _0x48ea44=_0x58815b;return _0x11b5a3[_0x48ea44('0x1e6')][_0x48ea44('0x14e')]['call'](this);}}else return VisuMZ[_0x58815b('0x1e6')]['Settings']['Actor'][_0x58815b('0x7b3')];}else return VisuMZ[_0x58815b('0x1e6')][_0x58815b('0x885')][_0x58815b('0x5ff')][_0x58815b('0x7b3')];},Game_Enemy[_0x3219af('0x3b5')]['performAction']=function(_0x4974e5){const _0x5cb43b=_0x3219af;Game_Battler[_0x5cb43b('0x3b5')]['performAction'][_0x5cb43b('0x448')](this,_0x4974e5);if(this[_0x5cb43b('0x585')]())this[_0x5cb43b('0x47a')](_0x4974e5);},Game_Enemy['prototype']['performAttack']=function(){const _0x8c3cdf=_0x3219af,_0xbe8705=this[_0x8c3cdf('0x7fa')]()[_0x8c3cdf('0x5db')]||0x0,_0x9fddc6=$dataSystem[_0x8c3cdf('0x45')][_0xbe8705];if(_0x9fddc6){if(_0x9fddc6[_0x8c3cdf('0x667')]===0x0){if(_0x8c3cdf('0x2ef')===_0x8c3cdf('0x397')){function _0x2d9d81(){const _0x155dc8=_0x8c3cdf;return _0x30b1ee[_0x155dc8('0x1e6')]['Game_Action_isForRandom']['call'](this);}}else this[_0x8c3cdf('0x8c')](_0x8c3cdf('0x432'));}else{if(_0x9fddc6[_0x8c3cdf('0x667')]===0x1)this['requestMotion']('swing');else{if(_0x9fddc6[_0x8c3cdf('0x667')]===0x2){if(_0x8c3cdf('0x65')!==_0x8c3cdf('0x65')){function _0x500c75(){const _0x3a2777=_0x8c3cdf;this[_0x3a2777('0x354')][_0x3a2777('0x601')]=_0x26d3b1['_emptyBitmap'];return;}}else this[_0x8c3cdf('0x8c')](_0x8c3cdf('0x6b2'));}}}}},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x374')]=function(){const _0x35a0c3=_0x3219af,_0x5883ea=this[_0x35a0c3('0x7fa')]()[_0x35a0c3('0x5db')]||0x0,_0x18df6e=$dataSystem['attackMotions'][_0x5883ea];_0x18df6e&&this[_0x35a0c3('0xea')](_0x18df6e[_0x35a0c3('0x27a')]);},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x624')]=function(){const _0x356843=_0x3219af,_0x3cb918=this[_0x356843('0x7fa')]()['wtypeId']||0x0;return $dataSystem[_0x356843('0x45')][_0x3cb918];},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x829')]=function(){const _0x2b1298=_0x3219af;Game_Battler['prototype'][_0x2b1298('0x829')][_0x2b1298('0x448')](this),this['isSpriteVisible']()&&this[_0x2b1298('0x585')]()&&this[_0x2b1298('0x8c')](_0x2b1298('0x5e1')),SoundManager[_0x2b1298('0x46e')]();},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0xe5')]=function(){const _0x419c26=_0x3219af;Game_Battler['prototype'][_0x419c26('0xe5')][_0x419c26('0x448')](this),this[_0x419c26('0x8c')](_0x419c26('0x2cd'));},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x7e1')]=function(){const _0x26d66b=_0x3219af;Game_Battler['prototype'][_0x26d66b('0x7e1')][_0x26d66b('0x448')](this),this[_0x26d66b('0x8c')](_0x26d66b('0x2cd'));},Game_Enemy[_0x3219af('0x3b5')]['performCounter']=function(){const _0x167527=_0x3219af;Game_Battler['prototype']['performCounter'][_0x167527('0x448')](this),this['performAttack']();},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x2f')]=function(){const _0x7c6a45=_0x3219af;if(this[_0x7c6a45('0x585')]()){if(_0x7c6a45('0x133')===_0x7c6a45('0x24c')){function _0xc80d30(){_0x2b1032['push'](_0x1ea936(_0x3ed28a['$1']));}}else{if(this[_0x7c6a45('0x89')]()>=0x1)return!![];return this[_0x7c6a45('0x7fa')]()['collapse'];}}else return!![];},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0x15')]=function(){const _0xe6435f=_0x3219af;return this[_0xe6435f('0x7fa')]()[_0xe6435f('0x35')];},Game_Enemy['prototype']['svBattlerAnchorY']=function(){const _0x455568=_0x3219af;return this['svBattlerData']()[_0x455568('0x53d')];},Game_Enemy[_0x3219af('0x3b5')][_0x3219af('0xed')]=function(){const _0x18d03f=_0x3219af;return this[_0x18d03f('0x7fa')]()[_0x18d03f('0x4bf')];},VisuMZ['BattleCore'][_0x3219af('0x6b8')]=Game_Enemy['prototype'][_0x3219af('0x8a0')],Game_Enemy['prototype'][_0x3219af('0x8a0')]=function(_0x5323b0){const _0x2a5b55=_0x3219af;VisuMZ[_0x2a5b55('0x1e6')][_0x2a5b55('0x6b8')][_0x2a5b55('0x448')](this,_0x5323b0),this[_0x2a5b55('0x855')](),this[_0x2a5b55('0x176')]();const _0xc8d0e4=this[_0x2a5b55('0x53f')]();if(_0xc8d0e4)_0xc8d0e4[_0x2a5b55('0x18f')](this);},Game_Unit[_0x3219af('0x3b5')][_0x3219af('0x381')]=function(_0xc576c6){const _0x34b4d9=_0x3219af;for(const _0x5516dd of this[_0x34b4d9('0x850')]()){if('ekJWn'!=='ekJWn'){function _0x4a2b1c(){const _0x31a20f=_0x34b4d9;if(!_0x4427e9[_0x31a20f('0x1e6')]['Settings'][_0x31a20f('0x68c')][_0x31a20f('0x548')])return;const _0x1c0e95=_0x4ccc4d[_0x31a20f('0x62c')],_0x59aa34='visualHpGauge';this['addCommand'](_0x1c0e95,_0x59aa34);}}else{if(_0x5516dd)_0x5516dd['processBattleCoreJS'](_0xc576c6);}}},Game_Unit['prototype'][_0x3219af('0x2fd')]=function(){const _0x18947c=_0x3219af,_0x35b686=this[_0x18947c('0x2fc')]();return _0x35b686[Math[_0x18947c('0x85f')](_0x35b686[_0x18947c('0x2da')])];},VisuMZ[_0x3219af('0x1e6')]['Game_Party_addActor']=Game_Party['prototype'][_0x3219af('0x345')],Game_Party[_0x3219af('0x3b5')][_0x3219af('0x345')]=function(_0xa22212){const _0x25dfa3=_0x3219af;VisuMZ[_0x25dfa3('0x1e6')][_0x25dfa3('0x7a3')][_0x25dfa3('0x448')](this,_0xa22212),BattleManager[_0x25dfa3('0x7c5')]();},VisuMZ['BattleCore']['Game_Party_removeActor']=Game_Party[_0x3219af('0x3b5')][_0x3219af('0x774')],Game_Party[_0x3219af('0x3b5')]['removeActor']=function(_0x2e7a08){const _0x44b03d=_0x3219af;VisuMZ[_0x44b03d('0x1e6')][_0x44b03d('0x200')][_0x44b03d('0x448')](this,_0x2e7a08),BattleManager['refreshStatusWindow']();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x6e5')]=Game_Troop['prototype']['setup'],Game_Troop[_0x3219af('0x3b5')][_0x3219af('0x7ea')]=function(_0x2f8af1){const _0x516438=_0x3219af;$gameTemp[_0x516438('0x7e0')](),$gameTemp[_0x516438('0x67e')](_0x2f8af1),VisuMZ[_0x516438('0x1e6')][_0x516438('0x6e5')][_0x516438('0x448')](this,_0x2f8af1);},VisuMZ['BattleCore'][_0x3219af('0x92')]=Game_Map[_0x3219af('0x3b5')]['setupBattleback'],Game_Map[_0x3219af('0x3b5')][_0x3219af('0x19e')]=function(){const _0x51591e=_0x3219af;VisuMZ[_0x51591e('0x1e6')][_0x51591e('0x92')][_0x51591e('0x448')](this),this[_0x51591e('0x867')]();},Game_Map['prototype'][_0x3219af('0x867')]=function(){const _0x2e927a=_0x3219af;this[_0x2e927a('0x488')]={},this[_0x2e927a('0x14f')]={};if(!$dataMap)return;const _0x2c41a3=$dataMap['note'];if(!_0x2c41a3)return;const _0x414a8c=_0x2c41a3[_0x2e927a('0x6f1')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x414a8c){if(_0x2e927a('0xb3')===_0x2e927a('0xb3'))for(const _0x15c448 of _0x414a8c){_0x15c448['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x3f9b35=Number(RegExp['$1']),_0x100a8e=Number(RegExp['$2']),_0x371d8e=_0x100a8e===0x1?this[_0x2e927a('0x488')]:this[_0x2e927a('0x14f')],_0x3956d8=String(RegExp['$3']);_0x371d8e[_0x3f9b35]=_0x3956d8;}else{function _0x298433(){const _0x1237ec=_0x2e927a;if(!_0x15b38a[_0x1237ec('0x1e6')][_0x1237ec('0x885')][_0x1237ec('0x69c')][_0x1237ec('0x5c8')])return;_0x5cf493[_0x1237ec('0x1e6')][_0x1237ec('0x823')][_0x1237ec('0x448')](this,_0x1080ba);}}}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7f2')]=Game_Map['prototype'][_0x3219af('0xb5')],Game_Map[_0x3219af('0x3b5')][_0x3219af('0xb5')]=function(){const _0x2f1738=_0x3219af;if(!BattleManager[_0x2f1738('0x6df')]()){const _0x4b2b49=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this[_0x2f1738('0x488')][_0x4b2b49]){if(_0x2f1738('0x675')==='bvVvJ'){function _0x3d3ec3(){_0x454538+=_0x49d518(_0xb1dbd['$1']);}}else return this[_0x2f1738('0x488')][_0x4b2b49];}}return VisuMZ[_0x2f1738('0x1e6')]['Game_Map_battleback1Name'][_0x2f1738('0x448')](this);},VisuMZ['BattleCore'][_0x3219af('0x20')]=Game_Map[_0x3219af('0x3b5')][_0x3219af('0x499')],Game_Map[_0x3219af('0x3b5')][_0x3219af('0x499')]=function(){const _0x3f85cc=_0x3219af;if(!BattleManager[_0x3f85cc('0x6df')]()){if('bGEEd'!==_0x3f85cc('0x157')){function _0x241d48(){const _0x2c253f=_0x3f85cc;this[_0x2c253f('0x884')][_0x2c253f('0x47c')]=_0x4702cc[_0x2c253f('0x3b5')][_0x2c253f('0x15')]['call'](this);}}else{const _0x2dfc75=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this[_0x3f85cc('0x488')]&&this[_0x3f85cc('0x14f')][_0x2dfc75]){if(_0x3f85cc('0x28e')!==_0x3f85cc('0x565'))return this['_regionBattleback2'][_0x2dfc75];else{function _0x411eba(){const _0x4d11fa=_0x3f85cc;this[_0x4d11fa('0x40f')][_0x4d11fa('0x409')](_0x5d8f7c);const _0x4b26c0=_0xf07924[_0x4d11fa('0x2f8')](_0x1a605a[_0x4d11fa('0x664')]());this[_0x4d11fa('0x586')][_0x4d11fa('0x453')]([_0x1a4ae5,_0x4b26c0]);}}}}}return VisuMZ[_0x3f85cc('0x1e6')]['Game_Map_battleback2Name']['call'](this);},VisuMZ[_0x3219af('0x1e6')]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x3219af('0x3b5')][_0x3219af('0x29a')],Game_Interpreter['prototype'][_0x3219af('0x29a')]=function(_0x150a88){const _0x5c9993=_0x3219af;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x5c9993('0x1e6')][_0x5c9993('0x439')][_0x5c9993('0x448')](this,_0x150a88);},VisuMZ['BattleCore'][_0x3219af('0x130')]=Game_Interpreter[_0x3219af('0x3b5')]['updateWaitMode'],Game_Interpreter[_0x3219af('0x3b5')]['updateWaitMode']=function(){const _0x26733f=_0x3219af;if(SceneManager['isSceneBattle']()){if(_0x26733f('0xec')!==_0x26733f('0x17d'))switch(this['_waitMode']){case _0x26733f('0x5b9'):if(Imported[_0x26733f('0x21c')]){if($gameScreen['battleCameraData']()['angleDuration']>0x0)return!![];this[_0x26733f('0x2c6')]='';}break;case _0x26733f('0x4f1'):if(BattleManager[_0x26733f('0x50d')][_0x26733f('0x41d')]())return!![];this['_waitMode']='';break;case _0x26733f('0x262'):if(Imported[_0x26733f('0x21c')]){if(_0x26733f('0x74')===_0x26733f('0x74')){if($gameScreen['battleCameraData']()[_0x26733f('0x3da')]>0x0)return!![];if($gameScreen[_0x26733f('0x6f0')]()['cameraOffsetDuration']>0x0)return!![];this[_0x26733f('0x2c6')]='';}else{function _0x768ca5(){const _0xc0af4d=_0x26733f;_0x2e6074=_0x2346c6[_0xc0af4d('0x51a')];}}}break;case'battleEffect':if(BattleManager[_0x26733f('0x50d')][_0x26733f('0x81a')]())return!![];this[_0x26733f('0x2c6')]='';break;case _0x26733f('0x1f7'):if(BattleManager[_0x26733f('0x50d')][_0x26733f('0x2d1')]())return!![];this[_0x26733f('0x2c6')]='';break;case _0x26733f('0x80c'):if(BattleManager['_spriteset']['isAnyoneJumping']())return!![];this[_0x26733f('0x2c6')]='';break;case _0x26733f('0x4b2'):if(BattleManager[_0x26733f('0x3f6')][_0x26733f('0x17e')]())return!![];this[_0x26733f('0x2c6')]='';break;case _0x26733f('0x141'):if(BattleManager[_0x26733f('0x50d')][_0x26733f('0x53')]())return!![];this['_waitMode']='';break;case _0x26733f('0x7a0'):if(BattleManager[_0x26733f('0x50d')][_0x26733f('0x41a')]())return!![];this[_0x26733f('0x2c6')]='';break;case _0x26733f('0x282'):if(BattleManager['_spriteset'][_0x26733f('0x1dd')]())return!![];this[_0x26733f('0x2c6')]='';break;case _0x26733f('0x4bb'):if(BattleManager['_spriteset'][_0x26733f('0x2dd')]())return!![];this[_0x26733f('0x2c6')]='';break;case _0x26733f('0x450'):if(Imported[_0x26733f('0x21c')]){if($gameScreen[_0x26733f('0x6f0')]()[_0x26733f('0x2c')]>0x0)return!![];this['_waitMode']='';}break;case _0x26733f('0x289'):if(BattleManager[_0x26733f('0x50d')][_0x26733f('0x308')]())return!![];this[_0x26733f('0x2c6')]='';break;case'battleZoom':if(Imported['VisuMZ_3_ActSeqCamera']){if(_0x26733f('0x6c5')!==_0x26733f('0x6c5')){function _0x3909b3(){const _0x29f8f0=_0x26733f,_0x18e109=_0x226e98[_0x29f8f0('0x36d')](_0x3ca3bd['x'],_0x35251a['y']);if(this[_0x29f8f0('0x488')]&&this[_0x29f8f0('0x488')][_0x18e109])return this[_0x29f8f0('0x488')][_0x18e109];}}else{if($gameScreen['battleCameraData']()[_0x26733f('0xfa')]>0x0)return!![];this[_0x26733f('0x2c6')]='';}}break;}else{function _0x47cc7c(){const _0x1d8f69=_0x26733f;this['performCollapse'](),this[_0x1d8f69('0x167')]();}}}return VisuMZ['BattleCore'][_0x26733f('0x130')]['call'](this);},VisuMZ['BattleCore'][_0x3219af('0x648')]=Game_Interpreter['prototype']['command301'],Game_Interpreter[_0x3219af('0x3b5')][_0x3219af('0x19b')]=function(_0x367544){const _0x4c3a0a=_0x3219af;if(!$gameParty[_0x4c3a0a('0x79c')]())return this[_0x4c3a0a('0x296')](_0x367544);else{if(_0x4c3a0a('0x224')===_0x4c3a0a('0x1b6')){function _0x4a5fcd(){const _0x23e474=_0x4c3a0a;return this[_0x23e474('0x3d0')]();}}else return VisuMZ['BattleCore'][_0x4c3a0a('0x648')][_0x4c3a0a('0x448')](this,_0x367544);}},Game_Interpreter[_0x3219af('0x3b5')][_0x3219af('0x77f')]=function(_0x377245){const _0x2b4844=_0x3219af;return VisuMZ[_0x2b4844('0x1e6')]['Game_Interpreter_command301']['call'](this,_0x377245);},Game_Interpreter[_0x3219af('0x3b5')][_0x3219af('0x296')]=function(_0x836fb2){const _0xffc16b=_0x3219af,_0x3627b4=VisuMZ[_0xffc16b('0x1e6')][_0xffc16b('0x885')][_0xffc16b('0x30')],_0x485974=_0x3627b4[_0xffc16b('0x88')],_0x3d229e=$dataCommonEvents[_0x485974];if(_0x3d229e){const _0x54e505=this[_0xffc16b('0x846')]()?this[_0xffc16b('0x61')]:0x0,_0x4fa1b1=JsonEx[_0xffc16b('0x2f8')](_0x3d229e[_0xffc16b('0x766')]),_0x1a1a94=_0x4fa1b1[_0xffc16b('0x2da')]-0x1,_0x4f89f5={'code':0xbc3,'indent':0x0,'parameters':JsonEx[_0xffc16b('0x2f8')](_0x836fb2)};_0x4fa1b1['splice'](_0x1a1a94,0x0,_0x4f89f5),this[_0xffc16b('0x893')](_0x4fa1b1,_0x54e505);}else{if(_0xffc16b('0x5bb')!==_0xffc16b('0x137'))return VisuMZ[_0xffc16b('0x1e6')][_0xffc16b('0x648')][_0xffc16b('0x448')](this,_0x836fb2);else{function _0x6a4e66(){return _0x5f09b2['aliveMembers']()['filter'](_0x27bd3f=>_0x27bd3f!==_0x61f214);}}}return!![];},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x3df')]=BattleManager[_0x3219af('0x515')],BattleManager[_0x3219af('0x515')]=function(){const _0x20ff2d=_0x3219af;VisuMZ[_0x20ff2d('0x1e6')][_0x20ff2d('0x3df')][_0x20ff2d('0x448')](this),this['onEncounterBattleCore']();},BattleManager[_0x3219af('0x82')]=function(){const _0x5a1632=_0x3219af,_0x34ccb2=VisuMZ['BattleCore']['Settings'][_0x5a1632('0x30')];_0x34ccb2[_0x5a1632('0x88')]&&(this['_battleCoreBattleStartEvent']=!![],$gameTemp[_0x5a1632('0x192')](_0x34ccb2['BattleStartEvent']),$gameMap[_0x5a1632('0x363')](),$gameMap[_0x5a1632('0x85b')][_0x5a1632('0x3b4')]=!![]);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7ae')]=Scene_Map[_0x3219af('0x3b5')][_0x3219af('0x357')],Scene_Map[_0x3219af('0x3b5')][_0x3219af('0x357')]=function(){const _0xdd9939=_0x3219af;if(BattleManager['_battleCoreBattleStartEvent'])this[_0xdd9939('0x655')]();else{if(_0xdd9939('0x5a3')===_0xdd9939('0x5a3'))VisuMZ[_0xdd9939('0x1e6')]['Scene_Map_launchBattle'][_0xdd9939('0x448')](this);else{function _0x54aea2(){const _0x43a981=_0xdd9939;this[_0x43a981('0x7b4')]('actionSplicePoint'),_0x1f6f53[_0x43a981('0x819')](_0x26faac,_0x2d4062),this[_0x43a981('0x39f')]();}}}},Scene_Map['prototype']['battleCorePreBattleCommonEvent']=function(){const _0x91fc83=_0x3219af;this[_0x91fc83('0x108')]=!![];},VisuMZ[_0x3219af('0x1e6')]['SceneManager_isSceneChanging']=SceneManager[_0x3219af('0x728')],SceneManager[_0x3219af('0x728')]=function(){const _0x371824=_0x3219af;if(BattleManager['_battleCoreBattleStartEvent'])return![];return VisuMZ[_0x371824('0x1e6')][_0x371824('0x301')][_0x371824('0x448')](this);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x5de')]=Game_Interpreter['prototype'][_0x3219af('0x2f3')],Game_Interpreter['prototype'][_0x3219af('0x2f3')]=function(){const _0x182f19=_0x3219af;VisuMZ[_0x182f19('0x1e6')][_0x182f19('0x5de')]['call'](this),this[_0x182f19('0x3b4')]&&(this[_0x182f19('0x3b4')]=undefined,SceneManager['_scene'][_0x182f19('0x3cd')]());},Scene_Map[_0x3219af('0x3b5')][_0x3219af('0x3cd')]=function(){const _0x4e143b=_0x3219af;BattleManager[_0x4e143b('0x79d')]=undefined,this[_0x4e143b('0xf')]();},VisuMZ[_0x3219af('0x1e6')]['Scene_Map_initialize']=Scene_Map[_0x3219af('0x3b5')][_0x3219af('0x54a')],Scene_Map['prototype'][_0x3219af('0x54a')]=function(){const _0x6a1f45=_0x3219af;VisuMZ[_0x6a1f45('0x1e6')][_0x6a1f45('0x87e')]['call'](this),$gameTemp[_0x6a1f45('0x7e0')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x15a')]=Scene_ItemBase[_0x3219af('0x3b5')]['applyItem'],Scene_ItemBase['prototype'][_0x3219af('0x577')]=function(){const _0x10a348=_0x3219af;VisuMZ[_0x10a348('0x1e6')][_0x10a348('0x15a')][_0x10a348('0x448')](this),this[_0x10a348('0x259')]()[_0x10a348('0x1e2')][_0x10a348('0x6f1')](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp['_commonEventQueue']=[]);},VisuMZ[_0x3219af('0x1e6')]['Scene_Options_maxCommands']=Scene_Options[_0x3219af('0x3b5')]['maxCommands'],Scene_Options['prototype'][_0x3219af('0x6d1')]=function(){const _0x195d36=_0x3219af;let _0x316607=VisuMZ[_0x195d36('0x1e6')]['Scene_Options_maxCommands'][_0x195d36('0x448')](this);const _0x29ee5d=VisuMZ[_0x195d36('0x1e6')][_0x195d36('0x885')];if(_0x29ee5d[_0x195d36('0x500')][_0x195d36('0x366')]&&_0x29ee5d['AutoBattle']['AdjustRect'])_0x316607+=0x2;if(_0x29ee5d[_0x195d36('0x68c')][_0x195d36('0x366')]&&_0x29ee5d[_0x195d36('0x68c')]['AdjustRect'])_0x316607+=0x1;return _0x316607;},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x6ca')]=Scene_Battle['prototype'][_0x3219af('0x96')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x96')]=function(){const _0x25d46b=_0x3219af;SceneManager[_0x25d46b('0x864')]()?(Scene_Message['prototype']['start'][_0x25d46b('0x448')](this),this[_0x25d46b('0x50d')]&&this['_spriteset']['update']()):VisuMZ[_0x25d46b('0x1e6')]['Scene_Battle_start'][_0x25d46b('0x448')](this);},VisuMZ['BattleCore']['Scene_Battle_stop']=Scene_Battle['prototype'][_0x3219af('0xf')],Scene_Battle[_0x3219af('0x3b5')]['stop']=function(){const _0x454f40=_0x3219af;SceneManager[_0x454f40('0x83c')]()?Scene_Message[_0x454f40('0x3b5')][_0x454f40('0xf')][_0x454f40('0x448')](this):VisuMZ[_0x454f40('0x1e6')][_0x454f40('0x163')][_0x454f40('0x448')](this);},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_terminate']=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x2f3')],Scene_Battle[_0x3219af('0x3b5')]['terminate']=function(){const _0x483537=_0x3219af;if(SceneManager['isNextSceneBattleTransitionable']()){if(_0x483537('0x8')!==_0x483537('0x431'))Scene_Message[_0x483537('0x3b5')][_0x483537('0x2f3')]['call'](this);else{function _0x79a8bd(){const _0xd58f03=_0x483537;this[_0xd58f03('0x351')]=0x14,this['_borderPortraitSprite'][_0xd58f03('0x601')]=_0x269b00,_0x44ff79[_0xd58f03('0x684')][_0xd58f03('0x18d')]()?(this[_0xd58f03('0x354')]['x']=0x0,this[_0xd58f03('0x82d')]=_0x419f43[_0xd58f03('0x6ad')](_0xdf1d4e[_0xd58f03('0x106')]/0x2)):(this[_0xd58f03('0x354')]['x']=this['width'],this['_borderPortraitTargetX']=this[_0xd58f03('0x106')]*0x3/0x4),this['_borderPortraitSprite']['opacity']=0x0;}}}else{if(_0x483537('0x6cf')===_0x483537('0x78e')){function _0x1b4169(){const _0x30e1cb=_0x483537;return this[_0x30e1cb('0x40f')]['shift']();}}else VisuMZ[_0x483537('0x1e6')]['Scene_Battle_terminate']['call'](this);}},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x18d')]=function(){const _0x5d022f=_0x3219af;if(ConfigManager[_0x5d022f('0x29b')]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x5d022f('0x52b')];else{if(this[_0x5d022f('0x72a')]()===_0x5d022f('0x216')){if(_0x5d022f('0x5ef')!=='vWUjB'){function _0x32dcfc(){const _0x899ace=_0x452ffd(_0x1d2ab3['$1']);this['addSkillTypeCommand'](_0x899ace);}}else return![];}else{return Scene_Message['prototype'][_0x5d022f('0x18d')]['call'](this);;}}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x24d')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0xb9')],Scene_Battle['prototype'][_0x3219af('0xb9')]=function(){const _0x334be2=_0x3219af;this[_0x334be2('0x75')](),VisuMZ[_0x334be2('0x1e6')]['Scene_Battle_createAllWindows'][_0x334be2('0x448')](this),this['createAutoBattleWindow']();},VisuMZ['BattleCore'][_0x3219af('0x3d2')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x3f9')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x3f9')]=function(){const _0x16e6f3=_0x3219af;VisuMZ[_0x16e6f3('0x1e6')][_0x16e6f3('0x3d2')][_0x16e6f3('0x448')](this);if(this[_0x16e6f3('0x72a')]()===_0x16e6f3('0x216')){if(_0x16e6f3('0x3e2')!==_0x16e6f3('0x53a'))this[_0x16e6f3('0x5a0')]();else{function _0xf28fb3(){const _0x33249f=_0x16e6f3;return _0x5e43ce['prototype'][_0x33249f('0x7d7')]();}}}},Scene_Battle[_0x3219af('0x3b5')]['setVisibleUI']=function(_0x412b0e){const _0x4e7cd6=_0x3219af;if(_0x412b0e){if(_0x4e7cd6('0x26')===_0x4e7cd6('0x457')){function _0x16dcb5(){const _0x5a3e12=_0x4e7cd6;_0x26b042[_0x5a3e12('0x1e6')]['Scene_Map_launchBattle'][_0x5a3e12('0x448')](this);}}else this['_windowLayer']['x']=(Graphics['width']-Graphics['boxWidth'])/0x2,this[_0x4e7cd6('0x2e6')]['y']=(Graphics[_0x4e7cd6('0x1e3')]-Graphics['boxHeight'])/0x2;}else this[_0x4e7cd6('0x2e6')]['x']=Graphics[_0x4e7cd6('0x106')]*0xa,this['_windowLayer']['y']=Graphics[_0x4e7cd6('0x1e3')]*0xa;},VisuMZ['BattleCore'][_0x3219af('0x172')]=Scene_Battle['prototype']['selectNextCommand'],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x7ed')]=function(){const _0x4fb6e1=_0x3219af,_0x3c029f=BattleManager[_0x4fb6e1('0x16d')]();VisuMZ[_0x4fb6e1('0x1e6')][_0x4fb6e1('0x172')][_0x4fb6e1('0x448')](this);if(_0x3c029f){if(_0x4fb6e1('0x47f')===_0x4fb6e1('0x710')){function _0x151b00(){this['_defeatedEnemies']=this['_defeatedEnemies']||[];}}else{if(_0x3c029f===BattleManager[_0x4fb6e1('0x16d')]())return;if(_0x3c029f===BattleManager['_subject'])return;_0x3c029f[_0x4fb6e1('0x53f')]()[_0x4fb6e1('0x34d')]();}}},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_selectPreviousCommand']=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x5d')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x5d')]=function(){const _0x4fd77e=_0x3219af,_0x419bc0=BattleManager[_0x4fd77e('0x16d')]();if(_0x419bc0)_0x419bc0[_0x4fd77e('0x53f')]()[_0x4fd77e('0x34d')]();VisuMZ[_0x4fd77e('0x1e6')][_0x4fd77e('0x2d0')][_0x4fd77e('0x448')](this);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x798')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x54c')],Scene_Battle['prototype'][_0x3219af('0x54c')]=function(){const _0x10d282=_0x3219af;if(VisuMZ['BattleCore'][_0x10d282('0x885')][_0x10d282('0x69c')][_0x10d282('0x1e1')]){if(_0x10d282('0x418')!==_0x10d282('0x418')){function _0x5a767a(){const _0x11b91f=_0x10d282;this[_0x11b91f('0x60e')]();}}else return VisuMZ['BattleCore'][_0x10d282('0x885')]['BattleLog'][_0x10d282('0x1e1')][_0x10d282('0x448')](this);}return VisuMZ[_0x10d282('0x1e6')][_0x10d282('0x798')][_0x10d282('0x448')](this);},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_createPartyCommandWindow']=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x673')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x673')]=function(){const _0x3f3cc5=_0x3219af;VisuMZ['BattleCore']['Scene_Battle_createPartyCommandWindow'][_0x3f3cc5('0x448')](this),this['createPartyCommandWindowBattleCore']();},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x61d')]=function(){const _0x3f619e=_0x3219af,_0x28d4ae=this[_0x3f619e('0x222')];_0x28d4ae[_0x3f619e('0x683')]('autoBattle',this[_0x3f619e('0x71e')]['bind'](this)),_0x28d4ae['setHandler'](_0x3f619e('0x67a'),this[_0x3f619e('0x674')][_0x3f619e('0x84b')](this));const _0x1c012c=this['battleLayoutStyle']();switch(_0x1c012c){case'xp':case _0x3f619e('0x82e'):return this[_0x3f619e('0x222')]['setBackgroundType'](0x1);break;}},Scene_Battle[_0x3219af('0x3b5')]['commandAutoBattle']=function(){const _0x2932ec=_0x3219af;BattleManager[_0x2932ec('0x340')]=!![],$gameParty[_0x2932ec('0x58c')](),this[_0x2932ec('0x7ed')]();},Scene_Battle[_0x3219af('0x3b5')]['commandOptions']=function(){const _0x3b2348=_0x3219af;if(this[_0x3b2348('0x2d')]())this[_0x3b2348('0x6d3')]=!![],this[_0x3b2348('0x3f6')][_0x3b2348('0x453')](_0x3b2348('0x380'),VisuMZ[_0x3b2348('0x1e6')][_0x3b2348('0x885')][_0x3b2348('0x34c')]['ActiveTpbOptionsMessage']);else{if(_0x3b2348('0x1d2')===_0x3b2348('0x198')){function _0x21b86e(){const _0xf81c82=_0x3b2348;if(!_0x370992[_0xf81c82('0x40d')]())return;const _0x25b787=_0x12972d[_0xf81c82('0xdc')](),_0x332145=_0x305c5b[_0xf81c82('0x3f6')];_0x332145['waitForNewLine'](),_0x25b787[_0xf81c82('0x1bb')](_0xf81c82('0x4b2'));}}else this[_0x3b2348('0x588')]();}},Scene_Battle[_0x3219af('0x3b5')]['isQueueOptionsMenu']=function(){const _0x36b0f9=_0x3219af;return BattleManager[_0x36b0f9('0x643')]();},Scene_Battle[_0x3219af('0x3b5')]['callOptions']=function(){const _0x39da03=_0x3219af;this['_callSceneOptions']=![],this['_spriteset'][_0x39da03('0x789')](),this[_0x39da03('0x2e6')][_0x39da03('0x117')]=![];if(BattleManager['isBattleTest']())($dataSystem[_0x39da03('0xb5')]||$dataSystem[_0x39da03('0x499')])&&SceneManager[_0x39da03('0x556')]();else($gameMap[_0x39da03('0xb5')]()||$gameMap['battleback2Name']())&&SceneManager[_0x39da03('0x556')]();SceneManager[_0x39da03('0x453')](Scene_Options);},VisuMZ['BattleCore'][_0x3219af('0x243')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x755')],Scene_Battle[_0x3219af('0x3b5')]['updateBattleProcess']=function(){const _0x5871f6=_0x3219af;VisuMZ[_0x5871f6('0x1e6')]['Scene_Battle_updateBattleProcess'][_0x5871f6('0x448')](this);if(this['_callSceneOptions']&&!BattleManager[_0x5871f6('0x31a')])this[_0x5871f6('0x588')]();},Scene_Battle['prototype']['createAutoBattleWindow']=function(){const _0x32d268=_0x3219af,_0x189b09=this[_0x32d268('0x724')]();this['_autoBattleWindow']=new Window_AutoBattleCancel(_0x189b09),this[_0x32d268('0x43c')][_0x32d268('0x46')](),this[_0x32d268('0x2b6')](this[_0x32d268('0x43c')]);},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x724')]=function(){const _0x3842a1=_0x3219af;return VisuMZ[_0x3842a1('0x1e6')][_0x3842a1('0x885')][_0x3842a1('0x500')][_0x3842a1('0x220')]['call'](this);},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x8a1')]=function(){const _0x59ff15=_0x3219af;return VisuMZ[_0x59ff15('0x1e6')][_0x59ff15('0x885')][_0x59ff15('0x34c')][_0x59ff15('0x43')];},VisuMZ['BattleCore'][_0x3219af('0x3db')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x334')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x334')]=function(){const _0x6a69e=_0x3219af;this[_0x6a69e('0x8a1')]()?this['onDisabledPartyCommandSelection']():VisuMZ[_0x6a69e('0x1e6')][_0x6a69e('0x3db')]['call'](this);},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x5d3')]=function(){const _0x2673f0=_0x3219af;if(BattleManager[_0x2673f0('0x228')]())this[_0x2673f0('0x7ed')]();else BattleManager[_0x2673f0('0x38a')]()&&VisuMZ['BattleCore']['Scene_Battle_startPartyCommandSelection'][_0x2673f0('0x448')](this);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x4a0')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x1f1')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x1f1')]=function(){const _0x123b57=_0x3219af;BattleManager['isTPB']()?this[_0x123b57('0x61b')]():VisuMZ[_0x123b57('0x1e6')][_0x123b57('0x4a0')][_0x123b57('0x448')](this);},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x3219af('0x3b5')]['createActorCommandWindow'],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x35a')]=function(){const _0x3fb5a5=_0x3219af;VisuMZ['BattleCore'][_0x3fb5a5('0x197')][_0x3fb5a5('0x448')](this),this[_0x3fb5a5('0x77e')]();},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x77e')]=function(){const _0x48b7d1=_0x3219af,_0x4a2c2b=this['_actorCommandWindow'];_0x4a2c2b[_0x48b7d1('0x683')](_0x48b7d1('0x41f'),this[_0x48b7d1('0x571')][_0x48b7d1('0x84b')](this)),_0x4a2c2b[_0x48b7d1('0x683')](_0x48b7d1('0x53c'),this['actorCommandAutoBattle'][_0x48b7d1('0x84b')](this)),_0x4a2c2b[_0x48b7d1('0x683')](_0x48b7d1('0x4e3'),this[_0x48b7d1('0x792')][_0x48b7d1('0x84b')](this));if(BattleManager[_0x48b7d1('0x38a')]()){if('ZbjNJ'===_0x48b7d1('0x4a6')){function _0x8364ff(){const _0x59eb5a=_0x48b7d1;this[_0x59eb5a('0x5a1')]();}}else this[_0x48b7d1('0x8a1')]()?delete _0x4a2c2b[_0x48b7d1('0x162')][_0x48b7d1('0x1a8')]:_0x4a2c2b[_0x48b7d1('0x683')](_0x48b7d1('0x1a8'),this['actorCommandCancelTPB'][_0x48b7d1('0x84b')](this));}},Scene_Battle[_0x3219af('0x3b5')]['actorCommandEscape']=function(){const _0x9e2695=_0x3219af;this[_0x9e2695('0x13e')]();},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x49c')]=function(){const _0x1f30f5=_0x3219af;BattleManager[_0x1f30f5('0x16d')]()['makeAutoBattleActions'](),BattleManager[_0x1f30f5('0x38b')](),BattleManager[_0x1f30f5('0xe9')](),this[_0x1f30f5('0x2ea')]();},Scene_Battle['prototype'][_0x3219af('0x792')]=function(){const _0xc0da79=_0x3219af,_0x43f8d8=BattleManager[_0xc0da79('0x6ec')]();_0x43f8d8['setSkill'](this[_0xc0da79('0x402')][_0xc0da79('0x2e2')]()),this[_0xc0da79('0x7ec')]();},Scene_Battle['prototype'][_0x3219af('0x34f')]=function(){const _0x2eb01e=_0x3219af;this['_partyCommandWindow'][_0x2eb01e('0x7ea')](),this[_0x2eb01e('0x402')][_0x2eb01e('0x5aa')]();},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_createHelpWindow']=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x550')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x550')]=function(){const _0xcd3ff0=_0x3219af;VisuMZ[_0xcd3ff0('0x1e6')][_0xcd3ff0('0x733')][_0xcd3ff0('0x448')](this),this['createHelpWindowBattleCore']();},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x783')]=function(){const _0xde0883=_0x3219af;this[_0xde0883('0x402')]['setHelpWindow'](this[_0xde0883('0x77c')]),this[_0xde0883('0x222')]['setHelpWindow'](this['_helpWindow']);},Scene_Battle['prototype'][_0x3219af('0x72a')]=function(){const _0x13657e=_0x3219af;if($gameTemp[_0x13657e('0x260')]!==undefined)return $gameTemp[_0x13657e('0x260')];if(this[_0x13657e('0x5d5')])return this[_0x13657e('0x5d5')];return this[_0x13657e('0x5d5')]=VisuMZ['BattleCore']['Settings'][_0x13657e('0xc7')]['Style'][_0x13657e('0x1b9')]()[_0x13657e('0x580')](),this[_0x13657e('0x5d5')];},VisuMZ['BattleCore']['Scene_Battle_windowAreaHeight']=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x322')],Scene_Battle[_0x3219af('0x3b5')]['windowAreaHeight']=function(){const _0x146b9f=_0x3219af,_0x106a6a=this[_0x146b9f('0x72a')]();switch(_0x106a6a){case _0x146b9f('0x766'):return this[_0x146b9f('0x747')](Math[_0x146b9f('0x794')](0x1,$gameParty[_0x146b9f('0x34')]()),!![]);break;default:return VisuMZ[_0x146b9f('0x1e6')][_0x146b9f('0x309')]['call'](this);break;}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7b5')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x3d')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x3d')]=function(){const _0x4f504c=_0x3219af,_0x531672=this[_0x4f504c('0x72a')]();switch(_0x531672){case _0x4f504c('0x216'):return this['helpWindowRectBorderStyle']();break;case _0x4f504c('0x311'):case'list':case'xp':case _0x4f504c('0x82e'):default:return VisuMZ[_0x4f504c('0x1e6')][_0x4f504c('0x7b5')][_0x4f504c('0x448')](this);break;}},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x2c9')]=function(){const _0x257897=_0x3219af,_0x4c510a=this[_0x257897('0x72a')]();switch(_0x4c510a){case'xp':case _0x257897('0x82e'):return this[_0x257897('0x87f')]();break;case'border':return this[_0x257897('0x38')]();break;case'default':case'list':default:return this[_0x257897('0x103')]();break;}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x782')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x86d')],Scene_Battle[_0x3219af('0x3b5')]['partyCommandWindowRect']=function(){const _0x44b149=_0x3219af,_0x58f900=this[_0x44b149('0x72a')]();switch(_0x58f900){case'xp':case _0x44b149('0x82e'):return this[_0x44b149('0x5cb')]();break;case'border':return this['partyCommandWindowRectBorderStyle']();case _0x44b149('0x311'):case _0x44b149('0x766'):default:return this['partyCommandWindowRectDefaultStyle']();break;}},Scene_Battle['prototype'][_0x3219af('0x74b')]=function(){const _0x13edb0=_0x3219af,_0x386b53=VisuMZ[_0x13edb0('0x1e6')]['Settings'][_0x13edb0('0xc7')],_0x32d33d=_0x386b53[_0x13edb0('0x2a7')]||0xc0,_0x21e57c=this[_0x13edb0('0x322')](),_0x33e579=this[_0x13edb0('0x18d')]()?Graphics[_0x13edb0('0x5b4')]-_0x32d33d:0x0,_0x3ade1a=Graphics[_0x13edb0('0x729')]-_0x21e57c;return new Rectangle(_0x33e579,_0x3ade1a,_0x32d33d,_0x21e57c);},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x6f5')]=function(){return this['partyCommandWindowRect']();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x761')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x485')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x485')]=function(){const _0x294346=_0x3219af,_0x2f9d52=this['battleLayoutStyle']();switch(_0x2f9d52){case'xp':case _0x294346('0x82e'):case _0x294346('0x216'):break;case _0x294346('0x311'):case _0x294346('0x766'):default:VisuMZ['BattleCore']['Scene_Battle_updateStatusWindowPosition'][_0x294346('0x448')](this);break;}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x6f7')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x52d')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x52d')]=function(){const _0x179fe8=_0x3219af;VisuMZ['BattleCore'][_0x179fe8('0x6f7')]['call'](this),this[_0x179fe8('0x466')]();},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_startEnemySelection']=Scene_Battle[_0x3219af('0x3b5')]['startEnemySelection'],Scene_Battle['prototype']['startEnemySelection']=function(){const _0x1e4d03=_0x3219af;VisuMZ['BattleCore'][_0x1e4d03('0x3aa')][_0x1e4d03('0x448')](this),this[_0x1e4d03('0x191')]['autoSelect'](),this[_0x1e4d03('0x466')]();},Scene_Battle['prototype'][_0x3219af('0x466')]=function(){const _0x2415e9=_0x3219af,_0xc41c72=this['battleLayoutStyle']();['xp',_0x2415e9('0x82e'),_0x2415e9('0x216')][_0x2415e9('0x895')](_0xc41c72)&&this['_actorCommandWindow'][_0x2415e9('0x5aa')]();if(_0xc41c72===_0x2415e9('0x216')||this['isSkillItemWindowsMiddle']()){if('PeaSf'===_0x2415e9('0x6e7'))this['_skillWindow'][_0x2415e9('0x5aa')](),this[_0x2415e9('0x570')][_0x2415e9('0x5aa')]();else{function _0x2561b4(){const _0xd86376=_0x2415e9;this[_0xd86376('0x691')]('dying');}}}},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_onActorOk']=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x7ba')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x7ba')]=function(){const _0x532c0d=_0x3219af;VisuMZ[_0x532c0d('0x1e6')][_0x532c0d('0x424')][_0x532c0d('0x448')](this),this[_0x532c0d('0x420')]();},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x1d0')]=function(){const _0x139be1=_0x3219af;return[_0x139be1('0x3c4'),_0x139be1('0x4e2'),_0x139be1('0x4e3')][_0x139be1('0x895')](this[_0x139be1('0x402')][_0x139be1('0x365')]());},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_onActorCancel']=Scene_Battle['prototype'][_0x3219af('0x679')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x679')]=function(){const _0x3c976f=_0x3219af;if(this[_0x3c976f('0x1d0')]()){if(_0x3c976f('0x181')!==_0x3c976f('0x181')){function _0x3cb3fc(){const _0x18ecdf=_0x3c976f;_0x1abdd3['BattleCore']['Game_Enemy_transform'][_0x18ecdf('0x448')](this,_0x3476ad),this[_0x18ecdf('0x855')](),this['setupBattleCoreData']();const _0x965efa=this[_0x18ecdf('0x53f')]();if(_0x965efa)_0x965efa[_0x18ecdf('0x18f')](this);}}else this[_0x3c976f('0x64b')][_0x3c976f('0x4ae')](),this[_0x3c976f('0x421')]['hide'](),this[_0x3c976f('0x402')][_0x3c976f('0x5c3')]();}else{if(_0x3c976f('0x56b')!==_0x3c976f('0x56b')){function _0x378c40(){const _0x315c1f=_0x3c976f;if(this[_0x315c1f('0x351')]>0x0){const _0x38f6ff=this['_borderPortraitDuration'],_0x23f5ed=this['_borderPortraitSprite'];_0x23f5ed['x']=(_0x23f5ed['x']*(_0x38f6ff-0x1)+this['_borderPortraitTargetX'])/_0x38f6ff,_0x23f5ed['opacity']=(_0x23f5ed[_0x315c1f('0x805')]*(_0x38f6ff-0x1)+0xff)/_0x38f6ff,this['_borderPortraitDuration']--;}}}else VisuMZ[_0x3c976f('0x1e6')][_0x3c976f('0x1')][_0x3c976f('0x448')](this);}this[_0x3c976f('0x50c')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7cf')]=Scene_Battle[_0x3219af('0x3b5')]['onEnemyOk'],Scene_Battle['prototype'][_0x3219af('0x6b9')]=function(){const _0x14c614=_0x3219af;VisuMZ[_0x14c614('0x1e6')][_0x14c614('0x7cf')][_0x14c614('0x448')](this),this[_0x14c614('0x420')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x1d7')]=Scene_Battle[_0x3219af('0x3b5')]['onEnemyCancel'],Scene_Battle[_0x3219af('0x3b5')]['onEnemyCancel']=function(){const _0x1baa30=_0x3219af;if(this[_0x1baa30('0x1d0')]())this['_statusWindow'][_0x1baa30('0x4ae')](),this['_enemyWindow'][_0x1baa30('0x46')](),this[_0x1baa30('0x402')][_0x1baa30('0x5c3')]();else{if(_0x1baa30('0x391')==='IXZAW')VisuMZ['BattleCore'][_0x1baa30('0x1d7')][_0x1baa30('0x448')](this);else{function _0x4ef0d9(){const _0x31dc30=_0x1baa30;_0x51334f['BattleCore'][_0x31dc30('0x885')]['Actor']['HomePosJS'][_0x31dc30('0x448')](this,_0x564cd2);}}}this[_0x1baa30('0x50c')]();},Scene_Battle['prototype'][_0x3219af('0x420')]=function(){const _0x3fccda=_0x3219af,_0x3787a9=this[_0x3fccda('0x72a')]();if(_0x3787a9===_0x3fccda('0x216')||this['isSkillItemWindowsMiddle']()){this['_skillWindow'][_0x3fccda('0x68a')]();if(this[_0x3fccda('0x5ec')]['active']){if(_0x3fccda('0x89e')===_0x3fccda('0x89e'))this[_0x3fccda('0x5ec')]['show']();else{function _0x112307(){const _0xfc81a0=_0x3fccda;_0x5d5a81[_0xfc81a0('0x556')]();}}}this[_0x3fccda('0x570')][_0x3fccda('0x68a')](),this['_itemWindow'][_0x3fccda('0x79f')]&&this[_0x3fccda('0x570')][_0x3fccda('0x4ae')]();}},Scene_Battle[_0x3219af('0x3b5')]['cancelTargetSelectionVisibility']=function(){const _0x4e6dfe=_0x3219af,_0x5bae35=this[_0x4e6dfe('0x72a')]();['xp',_0x4e6dfe('0x82e'),_0x4e6dfe('0x216')]['includes'](_0x5bae35)&&this[_0x4e6dfe('0x402')][_0x4e6dfe('0x68a')](),this[_0x4e6dfe('0x420')]();},Scene_Battle['prototype'][_0x3219af('0x103')]=function(){const _0x4f91fb=_0x3219af,_0x4d5bd6=VisuMZ['BattleCore']['Settings'][_0x4f91fb('0xc7')],_0x11416e=Window_BattleStatus['prototype']['extraHeight'](),_0x3282de=Graphics[_0x4f91fb('0x5b4')]-(_0x4d5bd6['CommandWidth']||0xc0),_0x11c8ee=this[_0x4f91fb('0x322')]()+_0x11416e,_0xc70e9b=this[_0x4f91fb('0x18d')]()?0x0:Graphics[_0x4f91fb('0x5b4')]-_0x3282de,_0x3b4b5a=Graphics[_0x4f91fb('0x729')]-_0x11c8ee+_0x11416e;return new Rectangle(_0xc70e9b,_0x3b4b5a,_0x3282de,_0x11c8ee);},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x87f')]=function(){const _0x251659=_0x3219af,_0x43d8f9=Window_BattleStatus[_0x251659('0x3b5')][_0x251659('0x1e9')](),_0x123dc4=Graphics[_0x251659('0x5b4')],_0x3b1a9a=this['windowAreaHeight']()+_0x43d8f9,_0x2319cc=0x0,_0x3c2b0a=Graphics[_0x251659('0x729')]-_0x3b1a9a+_0x43d8f9;return new Rectangle(_0x2319cc,_0x3c2b0a,_0x123dc4,_0x3b1a9a);},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x5cb')]=function(){const _0x5e7f1d=_0x3219af,_0x1a5fe1=Graphics['boxWidth']/0x2,_0x7e229c=this[_0x5e7f1d('0x747')](VisuMZ[_0x5e7f1d('0x1e6')][_0x5e7f1d('0x885')][_0x5e7f1d('0xc7')][_0x5e7f1d('0x14d')],!![]),_0x592ae2=Math[_0x5e7f1d('0x219')]((Graphics['boxWidth']-_0x1a5fe1)/0x2),_0x2cc293=Graphics[_0x5e7f1d('0x729')]-_0x7e229c-this[_0x5e7f1d('0x87f')]()[_0x5e7f1d('0x1e3')];return new Rectangle(_0x592ae2,_0x2cc293,_0x1a5fe1,_0x7e229c);},Scene_Battle[_0x3219af('0x3b5')]['helpWindowRectBorderStyle']=function(){const _0x3fa883=_0x3219af,_0x1be8e5=Graphics[_0x3fa883('0x106')],_0x5bc9ba=Math[_0x3fa883('0x219')]((Graphics[_0x3fa883('0x5b4')]-_0x1be8e5)/0x2),_0xdc1bcc=this[_0x3fa883('0x2cc')](),_0x17bebc=(Graphics[_0x3fa883('0x1e3')]-Graphics[_0x3fa883('0x729')])/-0x2;return new Rectangle(_0x5bc9ba,_0x17bebc,_0x1be8e5,_0xdc1bcc);},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x38')]=function(){const _0x1d47d9=_0x3219af,_0x4570b4=Graphics[_0x1d47d9('0x106')],_0x3aadda=Math[_0x1d47d9('0x219')]((Graphics[_0x1d47d9('0x5b4')]-_0x4570b4)/0x2),_0x2b361b=this[_0x1d47d9('0x747')](0x4,!![]),_0x1bdb12=Graphics[_0x1d47d9('0x729')]-_0x2b361b+(Graphics[_0x1d47d9('0x1e3')]-Graphics[_0x1d47d9('0x729')])/0x2;return new Rectangle(_0x3aadda,_0x1bdb12,_0x4570b4,_0x2b361b);},Scene_Battle[_0x3219af('0x3b5')]['partyCommandWindowRectBorderStyle']=function(){const _0x4ec5ba=_0x3219af,_0x4f585f=Math[_0x4ec5ba('0x42a')](Graphics[_0x4ec5ba('0x106')]/0x3),_0x5be518=this[_0x4ec5ba('0x18d')]()?(Graphics[_0x4ec5ba('0x106')]+Graphics[_0x4ec5ba('0x5b4')])/0x2-_0x4f585f:(Graphics['width']-Graphics[_0x4ec5ba('0x5b4')])/-0x2,_0x583869=this['helpWindowRectBorderStyle'](),_0x4eeecb=_0x583869['y']+_0x583869[_0x4ec5ba('0x1e3')],_0x11b551=this[_0x4ec5ba('0x38')](),_0x51dd16=_0x11b551['y']-_0x4eeecb;return new Rectangle(_0x5be518,_0x4eeecb,_0x4f585f,_0x51dd16);},Scene_Battle[_0x3219af('0x3b5')]['skillItemWindowRectBorderStyle']=function(){const _0x2766ff=_0x3219af,_0x554041=Math[_0x2766ff('0x6ad')](Graphics[_0x2766ff('0x106')]/0x3),_0x542cb7=Math['round']((Graphics[_0x2766ff('0x5b4')]-_0x554041)/0x2),_0x199ff8=this[_0x2766ff('0x54e')](),_0x4cbabb=_0x199ff8['y'],_0x143482=_0x199ff8['height'];return new Rectangle(_0x542cb7,_0x4cbabb,_0x554041,_0x143482);},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x5a0')]=function(){const _0xde7158=_0x3219af;this[_0xde7158('0x62f')]['y']=this['_helpWindow']['y']+this[_0xde7158('0x77c')]['height'];if(this[_0xde7158('0x18d')]()){if(_0xde7158('0x5ab')===_0xde7158('0x5ab'))this[_0xde7158('0x62f')]['x']=-this[_0xde7158('0x62f')][_0xde7158('0x106')]-0x4;else{function _0x5b5b25(){const _0x4cd7ce=_0xde7158;_0x48269b[_0x4cd7ce('0x1e6')][_0x4cd7ce('0x505')]['call'](this,_0x3c6a0c);}}}else{if(_0xde7158('0x547')===_0xde7158('0x547'))this['_cancelButton']['x']=Graphics[_0xde7158('0x106')]-(Graphics[_0xde7158('0x106')]-Graphics[_0xde7158('0x5b4')])/0x2-this[_0xde7158('0x62f')][_0xde7158('0x106')]-0x4;else{function _0x445194(){const _0x103466=_0xde7158;if(!_0x95e48a['BattleCore'][_0x103466('0x885')][_0x103466('0xc7')][_0x103466('0xc2')])return![];if(_0x23dfdd['getBattlePortrait']())return!![];return _0x5df6bf[_0x103466('0x2f0')]&&_0x44b678[_0x103466('0x3d0')]();}}}},VisuMZ['BattleCore'][_0x3219af('0x598')]=Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x80f')],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x80f')]=function(){const _0x43d5aa=_0x3219af;if(this[_0x43d5aa('0x72a')]()==='border')return this[_0x43d5aa('0x5c0')]();else{if(this[_0x43d5aa('0x7b2')]())return this[_0x43d5aa('0x66d')]();else{if(_0x43d5aa('0x178')!=='FEuco'){function _0xe50619(){const _0x3118d2=_0x43d5aa;this[_0x3118d2('0x297')](_0x1403d8)[_0x3118d2('0x6f1')](/\\I\[(\d+)\]/i);const _0x34c40c=_0x51e8f7(_0x3c720b['$1'])||0x0,_0x57a346=this[_0x3118d2('0x3c1')](_0x365d84),_0x69c512=_0x57a346['x']+_0x434c5f['floor']((_0x57a346[_0x3118d2('0x106')]-_0x4e113d['iconWidth'])/0x2),_0x2a6404=_0x57a346['y']+(_0x57a346[_0x3118d2('0x1e3')]-_0x4c4ffe[_0x3118d2('0x6b7')])/0x2;this[_0x3118d2('0x868')](_0x34c40c,_0x69c512,_0x2a6404);}}else return VisuMZ['BattleCore'][_0x43d5aa('0x598')]['call'](this);}}},VisuMZ[_0x3219af('0x1e6')]['Scene_Battle_itemWindowRect']=Scene_Battle[_0x3219af('0x3b5')]['itemWindowRect'],Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x22c')]=function(){const _0x25921f=_0x3219af;if(this['battleLayoutStyle']()==='border')return this['skillItemWindowRectBorderStyle']();else{if(this[_0x25921f('0x7b2')]()){if(_0x25921f('0x5fb')!==_0x25921f('0x5fb')){function _0x2b7957(){const _0x48251c=_0x25921f;_0x30f8b7[_0x48251c('0x3b5')][_0x48251c('0x1d5')][_0x48251c('0x448')](this),this[_0x48251c('0x81d')][_0x48251c('0x1a0')]=_0x21636f[_0x48251c('0x1e6')]['Settings'][_0x48251c('0x5ff')]['NameFontSize'];}}else return this['skillItemWindowRectMiddle']();}else{if(_0x25921f('0x272')==='Cglgr')return VisuMZ[_0x25921f('0x1e6')][_0x25921f('0x35f')]['call'](this);else{function _0x1b006f(){const _0x1d0083=_0x25921f;return _0x278c9a[_0x1d0083('0x684')][_0x1d0083('0x50d')][_0x1d0083('0x280')](_0x42e7e2[0x0],_0xb7eb4b[0x1]),!![];}}}}},Scene_Battle[_0x3219af('0x3b5')][_0x3219af('0x7b2')]=function(){const _0x490238=_0x3219af;return VisuMZ[_0x490238('0x1e6')][_0x490238('0x885')][_0x490238('0xc7')][_0x490238('0x2de')];},Scene_Battle['prototype'][_0x3219af('0x66d')]=function(){const _0x3f0be2=_0x3219af,_0x1fa17a=Sprite_Button[_0x3f0be2('0x3b5')][_0x3f0be2('0x4cd')]()*0x2+0x4;let _0x319652=Graphics[_0x3f0be2('0x5b4')]-_0x1fa17a;Imported[_0x3f0be2('0x268')]&&SceneManager[_0x3f0be2('0xf4')]()&&(_0x319652+=_0x1fa17a);const _0x124d90=this['helpAreaBottom'](),_0x4a01dd=Graphics[_0x3f0be2('0x729')]-_0x124d90-this[_0x3f0be2('0x2c9')]()[_0x3f0be2('0x1e3')]+Window_BattleStatus[_0x3f0be2('0x3b5')]['extraHeight'](),_0x72d105=0x0;return new Rectangle(_0x72d105,_0x124d90,_0x319652,_0x4a01dd);},Scene_Battle['prototype'][_0x3219af('0x75')]=function(){const _0x17e508=_0x3219af;this[_0x17e508('0x1ec')]=new Sprite(),this[_0x17e508('0x1ec')]['x']=this[_0x17e508('0x2e6')]['x'],this['_enemyNameContainer']['y']=this[_0x17e508('0x2e6')]['y'];const _0x167edc=this[_0x17e508('0x86c')]['indexOf'](this[_0x17e508('0x2e6')]);this[_0x17e508('0x573')](this[_0x17e508('0x1ec')],_0x167edc);for(let _0x50f34f=0x0;_0x50f34f<0x8;_0x50f34f++){if(_0x17e508('0x30d')===_0x17e508('0x73c')){function _0x10d7fe(){_0x51e36c=_0x3450f4>=_0x322bb7?_0x3dd1be:_0x5b5bb8;}}else{const _0x2bc12e=new Window_EnemyName(_0x50f34f);this[_0x17e508('0x1ec')][_0x17e508('0x2b6')](_0x2bc12e);}}},Sprite_Battler['_motionSpeed']=VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x885')][_0x3219af('0x2b2')]['MotionSpeed'],VisuMZ['BattleCore']['Sprite_Battler_initMembers']=Sprite_Battler['prototype']['initMembers'],Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x19')]=function(){const _0x15f288=_0x3219af;VisuMZ[_0x15f288('0x1e6')][_0x15f288('0x2ce')][_0x15f288('0x448')](this),this[_0x15f288('0x3c9')]();if(this[_0x15f288('0x4ad')]===Sprite_Enemy)this[_0x15f288('0x82c')]();this['createDistortionSprite']();},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x3c9')]=function(){const _0x4fa1a2=_0x3219af;this[_0x4fa1a2('0x5af')]=0x0,this['_baseY']=0x0,this['_floatHeight']=0x0,this['_targetFloatHeight']=0x0,this[_0x4fa1a2('0x153')]=0x0,this[_0x4fa1a2('0x6a8')]=0x0,this[_0x4fa1a2('0x1d8')]='Linear',this[_0x4fa1a2('0x303')]=0x0,this[_0x4fa1a2('0x45f')]=0x0,this[_0x4fa1a2('0x899')]=0x0,this[_0x4fa1a2('0x2b3')]=0x0,this[_0x4fa1a2('0x31e')]=0xff,this['_opacityDuration']=0x0,this['_opacityWholeDuration']=0x0,this[_0x4fa1a2('0x32')]=_0x4fa1a2('0x576'),this['_currentAngle']=0x0,this['_targetAngle']=0x0,this[_0x4fa1a2('0x17b')]=0x0,this[_0x4fa1a2('0x662')]=0x0,this['_angleEasing']=_0x4fa1a2('0x576'),this[_0x4fa1a2('0x642')]=!![],this[_0x4fa1a2('0x174')]=0x0,this[_0x4fa1a2('0x2d2')]=0x0,this[_0x4fa1a2('0x2e7')]=0x0,this[_0x4fa1a2('0x661')]=0x0,this[_0x4fa1a2('0x349')]=0x0,this[_0x4fa1a2('0x622')]=0x0,this[_0x4fa1a2('0x718')]=_0x4fa1a2('0x576'),this[_0x4fa1a2('0x568')]=0x1,this[_0x4fa1a2('0x3d3')]=0x1,this[_0x4fa1a2('0x352')]=0x1,this[_0x4fa1a2('0x5d8')]=0x1,this['_growDuration']=0x0,this[_0x4fa1a2('0x337')]=0x0,this[_0x4fa1a2('0x7dc')]='Linear',this['_flipScaleX']=0x1;},Sprite_Battler[_0x3219af('0x3b5')]['createShadowSprite']=function(){const _0x2b77e9=_0x3219af;this[_0x2b77e9('0x32f')]=new Sprite(),this[_0x2b77e9('0x32f')][_0x2b77e9('0x601')]=ImageManager[_0x2b77e9('0x702')]('Shadow2'),this[_0x2b77e9('0x32f')][_0x2b77e9('0x601')][_0x2b77e9('0x1fd')]=VisuMZ[_0x2b77e9('0x1e6')][_0x2b77e9('0x885')]['Actor'][_0x2b77e9('0x7b3')],this[_0x2b77e9('0x32f')]['anchor']['x']=0.5,this[_0x2b77e9('0x32f')][_0x2b77e9('0x7c')]['y']=0.5,this['_shadowSprite']['y']=-0x2,this['_shadowSprite'][_0x2b77e9('0x117')]=![],this['addChild'](this['_shadowSprite']);},Sprite_Battler[_0x3219af('0x3b5')]['createDistortionSprite']=function(){const _0x1051c7=_0x3219af;this['_distortionSprite']=new Sprite(),this['_distortionSprite'][_0x1051c7('0x7c')]['x']=0.5,this[_0x1051c7('0x6ee')][_0x1051c7('0x7c')]['y']=0.5,this[_0x1051c7('0x2b6')](this['_distortionSprite']);},Sprite_Battler['prototype']['attachSpritesToDistortionSprite']=function(){const _0x423658=_0x3219af;if(!this[_0x423658('0x6ee')])return;if(this[_0x423658('0x32f')]){if(_0x423658('0x5f')!=='ycctx'){const _0x1ce476=this[_0x423658('0xc9')](this[_0x423658('0x6ee')]);this[_0x423658('0x573')](this[_0x423658('0x32f')],_0x1ce476),this[_0x423658('0x464')]();}else{function _0x7a2b93(){const _0x371fc2=_0x423658;if(_0x530af6===this[_0x371fc2('0x388')]()&&this[_0x371fc2('0xfb')]())return!![];return _0x4527f1[_0x371fc2('0x1e6')][_0x371fc2('0x719')]['call'](this,_0x1189d);}}}if(this[_0x423658('0x6cd')]){if(_0x423658('0x320')===_0x423658('0x320'))this['_distortionSprite'][_0x423658('0x2b6')](this['_svBattlerSprite']);else{function _0x18fd4c(){const _0x507911=_0x423658;if(!_0x48f639[_0x507911('0x40d')]())return;if(!_0x1ce7b6[_0x507911('0x21c')])return;_0x577659[_0x507911('0x371')](_0x582346,_0x29edfa);const _0x200d55=_0x41c776[_0x507911('0x6f0')]();_0x200d55[_0x507911('0x7b9')]=_0x5ca405['Setting'];}}}this['_weaponSprite']&&this['_distortionSprite'][_0x423658('0x2b6')](this[_0x423658('0x1fb')]);this['_mainSprite']&&this['_distortionSprite'][_0x423658('0x2b6')](this[_0x423658('0x1af')]);if(this[_0x423658('0x754')]){if(_0x423658('0xaf')!==_0x423658('0xd0'))this[_0x423658('0x6ee')]['addChild'](this[_0x423658('0x754')]);else{function _0x43def1(){const _0x406458=_0x423658;_0x30bebe+=_0x557379[_0x406458('0x106')]-_0x214308;}}}},Sprite_Battler['prototype'][_0x3219af('0x464')]=function(){const _0x285ad5=_0x3219af;if(!this['_shadowSprite'])return;if(this['_battler']&&this[_0x285ad5('0x27c')]['svBattlerShadowVisible']()){if(_0x285ad5('0x3c6')!=='EOYnp'){function _0x53283d(){const _0x3b013c=_0x285ad5;if(!_0x13ac3a[_0x3b013c('0x670')]())return;const _0x353ce5=this['battler']();if(!_0x353ce5)return;_0x353ce5[_0x3b013c('0x84f')](_0x278ff7,_0x47b655,_0x2355f4);}}else{const _0x2002c3=this['_shadowSprite'][_0x285ad5('0x601')];this['_shadowSprite'][_0x285ad5('0x2af')](0x0,0x0,_0x2002c3[_0x285ad5('0x106')],_0x2002c3[_0x285ad5('0x1e3')]);}}else this[_0x285ad5('0x32f')][_0x285ad5('0x2af')](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x1b7')]=function(){const _0x5ed343=_0x3219af;if(SceneManager[_0x5ed343('0x40d')]())return SceneManager[_0x5ed343('0x684')][_0x5ed343('0x50d')][_0x5ed343('0x180')];else{if('NBiZi'===_0x5ed343('0x86e')){function _0x43cb90(){const _0x32416b=_0x5ed343,_0x2d3d91=_0x31e5bd['makeDeepCopy'](_0x47c2ce);_0x2d3d91['missed']=![],_0x2d3d91['evaded']=![],_0x2d3d91[_0x32416b('0x5fe')]=0x0,this[_0x32416b('0x818')]['push'](_0x2d3d91);}}else return this[_0x5ed343('0x19a')];}},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x18a')]=function(_0x290b3d,_0x5ebe17){const _0x4e0b21=_0x3219af;if(!this[_0x4e0b21('0x27c')][_0x4e0b21('0x72c')]())return;const _0x3d590c=VisuMZ['BattleCore'][_0x4e0b21('0x885')][_0x4e0b21('0x4e0')],_0x12dc62=new Sprite_Damage();_0x12dc62[_0x4e0b21('0x1ac')]=_0x3d590c[_0x4e0b21('0x13d')],this[_0x4e0b21('0x506')](_0x12dc62),_0x12dc62[_0x4e0b21('0x18a')](_0x290b3d,_0x5ebe17),this[_0x4e0b21('0x2cb')](_0x12dc62);},Sprite_Battler['prototype'][_0x3219af('0x860')]=function(_0x33a1a6,_0x3e8b13,_0x39bd31){const _0x1f0748=_0x3219af;if(!this['_battler']['isSpriteVisible']())return;const _0x7bbc56=VisuMZ[_0x1f0748('0x1e6')]['Settings']['Damage'],_0x586543=new Sprite_Damage();_0x586543[_0x1f0748('0x1ac')]=_0x7bbc56[_0x1f0748('0x13d')],this[_0x1f0748('0x506')](_0x586543),_0x586543['setupIconTextPopup'](_0x33a1a6,_0x3e8b13,_0x39bd31),this[_0x1f0748('0x2cb')](_0x586543);},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x6b5')]=function(){const _0x5960d9=_0x3219af;if(!this['_battler'][_0x5960d9('0x390')]())return;while(this['_battler']['isDamagePopupRequested']()){this[_0x5960d9('0x27c')][_0x5960d9('0x72c')]()&&this[_0x5960d9('0x5a1')]();}this[_0x5960d9('0x27c')][_0x5960d9('0x4a1')](),this[_0x5960d9('0x27c')]['clearResult']();},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x5a1')]=function(){const _0x50db91=_0x3219af,_0x1fb575=VisuMZ[_0x50db91('0x1e6')][_0x50db91('0x885')][_0x50db91('0x4e0')],_0x4e1d0c=new Sprite_Damage();_0x4e1d0c[_0x50db91('0x1ac')]=_0x1fb575[_0x50db91('0x13d')],this[_0x50db91('0x506')](_0x4e1d0c),_0x4e1d0c[_0x50db91('0x7ea')](this[_0x50db91('0x27c')]),_0x4e1d0c[_0x50db91('0x19c')](this['_battler']),this[_0x50db91('0x2cb')](_0x4e1d0c);},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x2cb')]=function(_0x5ba857){const _0x5ec9a1=_0x3219af;this[_0x5ec9a1('0x27')][_0x5ec9a1('0x453')](_0x5ba857);if(this['isShownOnBattlePortrait']())SceneManager[_0x5ec9a1('0x684')][_0x5ec9a1('0x64b')][_0x5ec9a1('0x2cb')](_0x5ba857,this['_battler']);else{this[_0x5ec9a1('0x1b7')]()[_0x5ec9a1('0x2b6')](_0x5ba857);if(SceneManager[_0x5ec9a1('0x5be')]())_0x5ba857[_0x5ec9a1('0x495')]['x']=-0x1;}},Sprite_Battler['prototype'][_0x3219af('0x714')]=function(){const _0x438e51=_0x3219af;return!$gameSystem[_0x438e51('0x670')]()&&this[_0x438e51('0x27c')]&&this['_battler'][_0x438e51('0x857')]();},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x506')]=function(_0x433c30){const _0x3d1b95=_0x3219af,_0x149f33=VisuMZ[_0x3d1b95('0x1e6')][_0x3d1b95('0x885')][_0x3d1b95('0x4e0')],_0xe52f33=SceneManager[_0x3d1b95('0x5be')]()?-0x1:0x1;let _0x584632=this['x'],_0x19ed9d=this['y'];const _0xdc2d73=SceneManager[_0x3d1b95('0x684')][_0x3d1b95('0x64b')];if(_0xdc2d73&&this[_0x3d1b95('0x19a')]===_0xdc2d73){if(_0x3d1b95('0x802')===_0x3d1b95('0x802')){_0x584632+=_0xdc2d73['x']-this[_0x3d1b95('0x552')]();const _0x484e7b=_0xdc2d73[_0x3d1b95('0x614')]()*0x3/0x4;_0x19ed9d=_0xdc2d73['y']+_0x484e7b,_0x19ed9d=Math['min'](_0x19ed9d,_0xdc2d73['y']+this['y']-this[_0x3d1b95('0x1e3')]+_0x484e7b);}else{function _0x4669bc(){_0x486e1b=_0x33793e>=_0x52bcb9?_0x2cc78d:_0xc2645e;}}}_0x433c30['x']=Math[_0x3d1b95('0x219')](_0x584632+this[_0x3d1b95('0x552')]()*_0xe52f33),_0x433c30['y']=Math[_0x3d1b95('0x219')](_0x19ed9d+this['damageOffsetY']());if(_0x149f33['NewPopupBottom'])for(const _0x230149 of this['_damages']){if(_0x3d1b95('0x4e8')===_0x3d1b95('0x4e8'))_0x230149['x']+=_0x149f33['PopupShiftX']*_0xe52f33,_0x230149['y']+=_0x149f33[_0x3d1b95('0x619')];else{function _0x5ecd20(){const _0x2821a9=_0x3d1b95,_0x1a6241=_0xd4f873[_0x2821a9('0x259')]();this[_0x2821a9('0x453')](_0x2821a9('0x5b0'),_0x33e106,[_0x389889],_0x1a6241[_0x2821a9('0x602')]);}}}else{if(_0x3d1b95('0x3f7')===_0x3d1b95('0x6e9')){function _0x517f42(){const _0x2d51e0=_0x3d1b95;this[_0x2d51e0('0x601')]['smooth']=_0x1f95b5[_0x2d51e0('0x1e6')][_0x2d51e0('0x885')][_0x2d51e0('0x2b2')][_0x2d51e0('0x7b3')];}}else{const _0x35626d=this[_0x3d1b95('0x27')][this['_damages'][_0x3d1b95('0x2da')]-0x1];if(_0x35626d){if(_0x3d1b95('0x129')===_0x3d1b95('0x5c1')){function _0x351b43(){const _0x1d7514=_0x3d1b95;this[_0x1d7514('0x859')]=_0x49e8b4;}}else _0x433c30['x']=_0x35626d['x']+_0x149f33[_0x3d1b95('0x826')]*_0xe52f33,_0x433c30['y']=_0x35626d['y']+_0x149f33[_0x3d1b95('0x619')];}}}},VisuMZ['BattleCore'][_0x3219af('0x312')]=Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x552')],Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x552')]=function(){const _0x53c5bd=_0x3219af;let _0x13f872=VisuMZ[_0x53c5bd('0x1e6')][_0x53c5bd('0x312')]['call'](this),_0x32ecfe=VisuMZ[_0x53c5bd('0x1e6')]['Settings'][_0x53c5bd('0x4e0')][_0x53c5bd('0x1c7')]||0x0;return Math[_0x53c5bd('0x219')](_0x13f872+_0x32ecfe);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x872')]=Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x677')],Sprite_Battler[_0x3219af('0x3b5')]['damageOffsetY']=function(){const _0x5639c3=_0x3219af;let _0x2b27d9=VisuMZ[_0x5639c3('0x1e6')][_0x5639c3('0x872')][_0x5639c3('0x448')](this);switch(VisuMZ['BattleCore'][_0x5639c3('0x885')][_0x5639c3('0x4e0')][_0x5639c3('0x240')]){case _0x5639c3('0x3c0'):_0x2b27d9-=this['height']*this[_0x5639c3('0x495')]['y'];break;case _0x5639c3('0x834'):_0x2b27d9-=this[_0x5639c3('0x1e3')]*this[_0x5639c3('0x495')]['y']*0.5;break;}let _0x4f4fa7=VisuMZ[_0x5639c3('0x1e6')][_0x5639c3('0x885')][_0x5639c3('0x4e0')][_0x5639c3('0x80a')]||0x0;return Math[_0x5639c3('0x219')](_0x2b27d9+_0x4f4fa7);},Sprite_Battler['prototype'][_0x3219af('0x343')]=function(_0x2567c7){const _0x292c20=_0x3219af;if(this[_0x292c20('0x714')]()){if('kZkvZ'!==_0x292c20('0x5c5')){function _0x104103(){this['addItemCommand']();}}else SceneManager[_0x292c20('0x684')][_0x292c20('0x64b')][_0x292c20('0x3a')](_0x2567c7);}else this[_0x292c20('0x1b7')]()[_0x292c20('0x284')](_0x2567c7),this['_damages'][_0x292c20('0x409')](_0x2567c7),_0x2567c7[_0x292c20('0x3ab')]();},VisuMZ['BattleCore']['Sprite_Battler_setHome']=Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x10e')],Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x10e')]=function(_0x2d036c,_0x4fdd76){const _0x1090b5=_0x3219af;if(!this[_0x1090b5('0x6bb')]){this[_0x1090b5('0x6bb')]=!![];const _0x42c3ac=VisuMZ[_0x1090b5('0x1e6')][_0x1090b5('0x885')];if(this['constructor']===Sprite_Actor)_0x2d036c+=_0x42c3ac['Actor'][_0x1090b5('0x470')]||0x0,_0x4fdd76+=_0x42c3ac[_0x1090b5('0x2b2')][_0x1090b5('0x44f')]||0x0;else this[_0x1090b5('0x4ad')]===Sprite_Enemy&&(_0x2d036c+=_0x42c3ac['Enemy']['OffsetX']||0x0,_0x4fdd76+=_0x42c3ac[_0x1090b5('0x5ff')]['OffsetY']||0x0);}VisuMZ['BattleCore']['Sprite_Battler_setHome'][_0x1090b5('0x448')](this,_0x2d036c,_0x4fdd76);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x756')]=Sprite_Battler['prototype'][_0x3219af('0x789')],Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x789')]=function(){const _0x172acb=_0x3219af;VisuMZ['BattleCore'][_0x172acb('0x756')][_0x172acb('0x448')](this),!this[_0x172acb('0x27c')]&&this['_hpGaugeSprite']&&(this['_hpGaugeSprite']['visible']=![]);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7f3')]=Sprite_Battler[_0x3219af('0x3b5')]['updateMain'],Sprite_Battler[_0x3219af('0x3b5')]['updateMain']=function(){const _0x40c193=_0x3219af;this[_0x40c193('0x213')](),this[_0x40c193('0x8a3')](),this[_0x40c193('0x36c')](),this[_0x40c193('0x12e')](),this[_0x40c193('0x310')](),VisuMZ[_0x40c193('0x1e6')][_0x40c193('0x7f3')]['call'](this);if(this[_0x40c193('0x4ad')]===Sprite_Enemy)this[_0x40c193('0x149')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x694')]=Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0xb6')],Sprite_Battler['prototype'][_0x3219af('0xb6')]=function(){const _0x37b74d=_0x3219af;VisuMZ[_0x37b74d('0x1e6')][_0x37b74d('0x694')][_0x37b74d('0x448')](this),this['updatePositionBattleCore'](),this[_0x37b74d('0x372')]();},Sprite_Battler['prototype'][_0x3219af('0x325')]=function(){const _0x20a24b=_0x3219af;this['_baseX']=this['x'],this[_0x20a24b('0x833')]=this['y'],this[_0x20a24b('0x10')](),this[_0x20a24b('0x735')](),this['x']+=this['extraPositionX'](),this['y']+=this['extraPositionY'](),this['x']=Math[_0x20a24b('0x219')](this['x']),this['y']=Math['round'](this['y']);},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x22d')]=function(){let _0x4a0676=0x0;return _0x4a0676;},Sprite_Battler[_0x3219af('0x3b5')]['extraPositionY']=function(){const _0x4199a2=_0x3219af;let _0x19653e=0x0;_0x19653e-=this[_0x4199a2('0x2f1')],_0x19653e-=this['_jumpHeight'];if(this['_distortionSprite']&&this['constructor']!==Sprite_SvEnemy){const _0x324cda=this['_distortionSprite'][_0x4199a2('0x495')]['y'];_0x19653e-=(_0x324cda-0x1)*this[_0x4199a2('0x1e3')];}return _0x19653e;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x12e')]=function(){const _0x158ccf=_0x3219af,_0x147e62=this[_0x158ccf('0x27c')]&&this[_0x158ccf('0x27c')]['isBattlerFlipped']();this[_0x158ccf('0x521')]=(_0x147e62?-0x1:0x1)*Math[_0x158ccf('0x64d')](this['scale']['x']);},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x88f')]=function(_0xc6238b,_0x5741db,_0x29c38c){const _0x172e55=_0x3219af;if(!this[_0x172e55('0x84e')]())return;if(this[_0x172e55('0x358')]===_0xc6238b)return;this[_0x172e55('0x358')]=_0xc6238b,this[_0x172e55('0x153')]=_0x5741db,this[_0x172e55('0x6a8')]=_0x5741db,this[_0x172e55('0x1d8')]=_0x29c38c||'Linear';if(_0x5741db<=0x0)this[_0x172e55('0x2f1')]=_0xc6238b;},Sprite_Battler[_0x3219af('0x3b5')]['updateFloat']=function(){const _0xf25683=_0x3219af;if(this[_0xf25683('0x153')]<=0x0)return;const _0x25449a=this[_0xf25683('0x153')],_0x3adc20=this['_floatWholeDuration'],_0x45f4af=this[_0xf25683('0x1d8')];if(Imported['VisuMZ_0_CoreEngine']){if(_0xf25683('0x275')===_0xf25683('0x832')){function _0x1511fe(){const _0x32cfa5=_0xf25683;let _0x59f117=_0x4600b9[_0x32cfa5('0x29')][_0x4c474a];if(!_0x59f117)return;let _0x1ed572=_0x59f117;const _0x29efdc=this[_0x32cfa5('0x211')]();if(_0x29efdc===_0x32cfa5('0x7d3'))_0x1ed572=_0x1ed572[_0x32cfa5('0x30e')](/\x1I\[(\d+)\]/gi,''),_0x1ed572=_0x1ed572['replace'](/\\I\[(\d+)\]/gi,'');else{if(!_0x59f117[_0x32cfa5('0x6f1')](/\\I\[(\d+)\]/i)){const _0x3a5305=_0x12e8a7['VisuMZ_1_SkillsStatesCore']?_0x329f8e[_0x32cfa5('0xa')][_0x32cfa5('0x885')]['Skills']:_0x50e405[_0x32cfa5('0x1e6')][_0x32cfa5('0x885')][_0x32cfa5('0x79b')],_0x3526e8=_0xb595f8[_0x32cfa5('0x504')][_0x32cfa5('0x895')](_0x36eddf),_0x3a13e7=_0x3526e8?_0x3a5305[_0x32cfa5('0x17a')]:_0x3a5305['IconStypeNorm'];_0x1ed572=_0x32cfa5('0x69e')['format'](_0x3a13e7,_0x59f117);}}this[_0x32cfa5('0x3b0')](_0x1ed572,'skill',!![],_0x1cdb61);}}else this['_floatHeight']=this[_0xf25683('0x604')](this[_0xf25683('0x2f1')],this[_0xf25683('0x358')],_0x25449a,_0x3adc20,_0x45f4af);}else this[_0xf25683('0x2f1')]=(this[_0xf25683('0x2f1')]*(_0x25449a-0x1)+this[_0xf25683('0x358')])/_0x25449a;this['_floatDuration']--;if(this[_0xf25683('0x153')]<=0x0)this['onFloatEnd']();},Sprite_Battler[_0x3219af('0x3b5')]['onFloatEnd']=function(){const _0x21eb98=_0x3219af;this[_0x21eb98('0x2f1')]=this[_0x21eb98('0x358')];},Sprite_Battler[_0x3219af('0x3b5')]['isFloating']=function(){const _0x371dfa=_0x3219af;return this[_0x371dfa('0x153')]>0x0;},Sprite_Battler[_0x3219af('0x3b5')]['startJump']=function(_0x4f286e,_0x5c48d7){const _0x328113=_0x3219af;if(!this[_0x328113('0x84e')]())return;if(_0x5c48d7<=0x0)return;this[_0x328113('0x45f')]=_0x4f286e,this[_0x328113('0x899')]=_0x5c48d7,this[_0x328113('0x2b3')]=_0x5c48d7;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x735')]=function(){const _0x9aac0=_0x3219af;if(this[_0x9aac0('0x899')]<=0x0)return;const _0x1cbd01=this['_jumpWholeDuration']-this[_0x9aac0('0x899')],_0x508e0b=this[_0x9aac0('0x2b3')]/0x2,_0x45ed53=this['_jumpMaxHeight'],_0x341d23=-_0x45ed53/Math[_0x9aac0('0x170')](_0x508e0b,0x2);this['_jumpHeight']=_0x341d23*Math[_0x9aac0('0x170')](_0x1cbd01-_0x508e0b,0x2)+_0x45ed53,this[_0x9aac0('0x899')]--;if(this['_jumpDuration']<=0x0)return this[_0x9aac0('0x592')]();},Sprite_Battler[_0x3219af('0x3b5')]['onJumpEnd']=function(){this['_jumpHeight']=0x0;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x873')]=function(){return this['_jumpDuration']>0x0;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x84f')]=function(_0x331ef7,_0x2d4546,_0x1cb3c7){const _0x2fc690=_0x3219af;if(this[_0x2fc690('0x31e')]===_0x331ef7)return;this[_0x2fc690('0x31e')]=_0x331ef7,this['_opacityDuration']=_0x2d4546,this[_0x2fc690('0x26d')]=_0x2d4546,this['_opacityEasing']=_0x1cb3c7||_0x2fc690('0x576');if(_0x2d4546<=0x0)this[_0x2fc690('0x805')]=_0x331ef7;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x372')]=function(){const _0x485b19=_0x3219af;if(this[_0x485b19('0x840')]<=0x0)return;const _0x12ecd8=this[_0x485b19('0x840')],_0x3432ec=this['_opacityWholeDuration'],_0x4b8012=this[_0x485b19('0x32')];if(Imported[_0x485b19('0x268')]){if(_0x485b19('0x1c4')!==_0x485b19('0x1c4')){function _0x1a033a(){const _0x148936=_0x485b19;_0x5dcd2b['prototype'][_0x148936('0x829')][_0x148936('0x448')](this),this[_0x148936('0x72c')]()&&this[_0x148936('0x585')]()&&this['requestMotion'](_0x148936('0x5e1')),_0x4aff89[_0x148936('0x46e')]();}}else this[_0x485b19('0x805')]=this[_0x485b19('0x604')](this[_0x485b19('0x805')],this[_0x485b19('0x31e')],_0x12ecd8,_0x3432ec,_0x4b8012);}else this['opacity']=(this[_0x485b19('0x805')]*(_0x12ecd8-0x1)+this[_0x485b19('0x31e')])/_0x12ecd8;this[_0x485b19('0x840')]--;if(this[_0x485b19('0x840')]<=0x0)this['onOpacityEnd']();},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x21f')]=function(){const _0x38bc48=_0x3219af;this[_0x38bc48('0x805')]=this[_0x38bc48('0x31e')];},Sprite_Battler['prototype'][_0x3219af('0x175')]=function(){const _0x5400f2=_0x3219af;return this[_0x5400f2('0x840')]>0x0;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x149')]=function(){const _0xd5667a=_0x3219af;this[_0xd5667a('0x32f')]['visible']=this[_0xd5667a('0x27c')]['hasSvBattler'](),this[_0xd5667a('0x6bd')]();},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x6bd')]=function(){const _0x52ac05=_0x3219af;if(!this[_0x52ac05('0x32f')])return;this[_0x52ac05('0x32f')]['y']=Math[_0x52ac05('0x219')](-this[_0x52ac05('0x271')]()-0x2);},Sprite_Battler[_0x3219af('0x3b5')]['updateScale']=function(){const _0x48fd17=_0x3219af;if(this[_0x48fd17('0x4ad')]===Sprite_SvEnemy)return;this[_0x48fd17('0x807')](),this['finalizeScale']();},Sprite_Battler[_0x3219af('0x3b5')]['finalizeScale']=function(){const _0x32633d=_0x3219af,_0x163aef=this[_0x32633d('0x6ee')];_0x163aef&&(_0x163aef[_0x32633d('0x495')]['x']=this[_0x32633d('0xbd')](),_0x163aef[_0x32633d('0x495')]['y']=this[_0x32633d('0x6f8')]());},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0xbd')]=function(){const _0xbb2e7f=_0x3219af;let _0x5c1b00=0x1;return _0x5c1b00*=this['_flipScaleX'],_0x5c1b00*=this[_0xbb2e7f('0x568')],_0x5c1b00;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x6f8')]=function(){return 0x1*this['_growY'];},Sprite_Battler[_0x3219af('0x3b5')]['mainSpriteWidth']=function(){const _0x2e5eaf=_0x3219af;return this['width']*this[_0x2e5eaf('0xbd')]();},Sprite_Battler[_0x3219af('0x3b5')]['mainSpriteHeight']=function(){const _0x5f4183=_0x3219af;return this[_0x5f4183('0x1e3')]*this[_0x5f4183('0x6f8')]();},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x5a5')]=function(_0x5cb723,_0x540ebd,_0x4c7d69,_0x425055){const _0xfa6a8f=_0x3219af;if(!this[_0xfa6a8f('0x84e')]())return;if(!this[_0xfa6a8f('0x6ee')])return;if(this['_targetGrowX']===_0x5cb723&&this[_0xfa6a8f('0x5d8')]===_0x540ebd)return;this[_0xfa6a8f('0x352')]=_0x5cb723,this[_0xfa6a8f('0x5d8')]=_0x540ebd,this[_0xfa6a8f('0x54f')]=_0x4c7d69,this[_0xfa6a8f('0x337')]=_0x4c7d69,this[_0xfa6a8f('0x7dc')]=_0x425055||_0xfa6a8f('0x576'),_0x4c7d69<=0x0&&(this[_0xfa6a8f('0x568')]=this[_0xfa6a8f('0x352')],this['_growY']=this[_0xfa6a8f('0x5d8')]);},Sprite_Battler[_0x3219af('0x3b5')]['updateGrow']=function(){const _0x1fba09=_0x3219af;if(this[_0x1fba09('0x54f')]<=0x0)return;if(!this[_0x1fba09('0x6ee')])return;const _0x43d1fb=this[_0x1fba09('0x54f')],_0x16f2b4=this[_0x1fba09('0x337')],_0x41c938=this[_0x1fba09('0x7dc')];if(Imported[_0x1fba09('0x268')])this['_growX']=this[_0x1fba09('0x604')](this['_growX'],this[_0x1fba09('0x352')],_0x43d1fb,_0x16f2b4,_0x41c938),this[_0x1fba09('0x3d3')]=this[_0x1fba09('0x604')](this[_0x1fba09('0x3d3')],this['_targetGrowY'],_0x43d1fb,_0x16f2b4,_0x41c938);else{if(_0x1fba09('0x128')!==_0x1fba09('0x3d9'))this[_0x1fba09('0x568')]=(this['_growX']*(_0x43d1fb-0x1)+this[_0x1fba09('0x352')])/_0x43d1fb,this[_0x1fba09('0x3d3')]=(this[_0x1fba09('0x3d3')]*(_0x43d1fb-0x1)+this[_0x1fba09('0x5d8')])/_0x43d1fb;else{function _0x3e671c(){_0x5ab03f=(_0x2f6909+_0xcde217)/0x2,_0x376f6c=-0x1;}}}this['_growDuration']--;if(this[_0x1fba09('0x54f')]<=0x0)this['onGrowEnd']();},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x822')]=function(){const _0x575aca=_0x3219af;this['_growX']=this[_0x575aca('0x352')],this[_0x575aca('0x3d3')]=this['_targetGrowY'];},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x15d')]=function(){const _0x29bd72=_0x3219af;return this[_0x29bd72('0x54f')]>0x0;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x331')]=function(_0x455acf,_0x813f6d,_0xffb0d8,_0x6cc5a2){const _0x2fa8f9=_0x3219af;if(!this['canMove']())return;if(!this[_0x2fa8f9('0x6ee')])return;if(this[_0x2fa8f9('0x2e7')]===_0x455acf&&this[_0x2fa8f9('0x661')]===_0x813f6d)return;this[_0x2fa8f9('0x2e7')]=_0x455acf,this[_0x2fa8f9('0x661')]=_0x813f6d,this['_skewDuration']=_0xffb0d8,this[_0x2fa8f9('0x622')]=_0xffb0d8,this[_0x2fa8f9('0x718')]=_0x6cc5a2||_0x2fa8f9('0x576');if(_0xffb0d8<=0x0){if(_0x2fa8f9('0x6f6')===_0x2fa8f9('0x612')){function _0x498d81(){const _0x459a7a=_0x2fa8f9,_0x1bfbd0=this[_0x459a7a('0x39c')];_0x1bfbd0[_0x459a7a('0x23f')](_0x31fc94,0x0,_0x37f476['y'],_0x1bfbd0[_0x459a7a('0x442')],'center');}}else this[_0x2fa8f9('0x6ee')][_0x2fa8f9('0x48e')]['x']=this['_targetSkewX'],this[_0x2fa8f9('0x6ee')][_0x2fa8f9('0x48e')]['y']=this['_targetSkewY'];}},Sprite_Battler['prototype'][_0x3219af('0x8a3')]=function(){const _0x229e93=_0x3219af;if(this[_0x229e93('0x349')]<=0x0)return;if(!this['_distortionSprite'])return;const _0x472d9c=this['_skewDuration'],_0x481238=this[_0x229e93('0x622')],_0x5231ef=this[_0x229e93('0x718')],_0x453808=this[_0x229e93('0x6ee')];Imported[_0x229e93('0x268')]?(_0x453808[_0x229e93('0x48e')]['x']=this[_0x229e93('0x604')](_0x453808[_0x229e93('0x48e')]['x'],this[_0x229e93('0x2e7')],_0x472d9c,_0x481238,_0x5231ef),_0x453808['skew']['y']=this[_0x229e93('0x604')](_0x453808['skew']['y'],this['_targetSkewY'],_0x472d9c,_0x481238,_0x5231ef)):(_0x453808[_0x229e93('0x48e')]['x']=(_0x453808['skew']['x']*(_0x472d9c-0x1)+this[_0x229e93('0x2e7')])/_0x472d9c,_0x453808[_0x229e93('0x48e')]['y']=(_0x453808['skew']['y']*(_0x472d9c-0x1)+this[_0x229e93('0x661')])/_0x472d9c);this['_skewDuration']--;if(this[_0x229e93('0x349')]<=0x0)this[_0x229e93('0x4d8')]();},Sprite_Battler[_0x3219af('0x3b5')]['onSkewEnd']=function(){const _0x1da1b5=_0x3219af;this['_distortionSprite'][_0x1da1b5('0x48e')]['x']=this[_0x1da1b5('0x2e7')],this[_0x1da1b5('0x6ee')][_0x1da1b5('0x48e')]['y']=this[_0x1da1b5('0x661')];},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x26f')]=function(){return this['_skewDuration']>0x0;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x267')]=function(_0x2f0d9f,_0x555a6b,_0x2d1e77,_0x10df56){const _0x3faed4=_0x3219af;if(!this[_0x3faed4('0x84e')]())return;if(!this[_0x3faed4('0x6ee')])return;if(this['_targetAngle']===_0x2f0d9f)return;this[_0x3faed4('0x426')]=_0x2f0d9f,this[_0x3faed4('0x17b')]=_0x555a6b,this[_0x3faed4('0x662')]=_0x555a6b,this[_0x3faed4('0x1c1')]=_0x2d1e77||_0x3faed4('0x576'),this[_0x3faed4('0x642')]=_0x10df56,this[_0x3faed4('0x642')]===undefined&&(this[_0x3faed4('0x642')]=!![]),_0x555a6b<=0x0&&(this[_0x3faed4('0x140')]=_0x2f0d9f,this[_0x3faed4('0x642')]&&(this[_0x3faed4('0x426')]=0x0,this['_currentAngle']=0x0));},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x36c')]=function(){const _0x1ad1b1=_0x3219af;this[_0x1ad1b1('0x659')](),this[_0x1ad1b1('0x43a')]();},Sprite_Battler['prototype'][_0x3219af('0x659')]=function(){const _0x3d07ea=_0x3219af;if(this[_0x3d07ea('0x17b')]<=0x0)return;const _0xec7738=this[_0x3d07ea('0x17b')],_0x264c81=this[_0x3d07ea('0x662')],_0x2b1ae3=this[_0x3d07ea('0x1c1')];if(Imported[_0x3d07ea('0x268')]){if('ImDfI'===_0x3d07ea('0x60c')){function _0x567d80(){const _0x202650=_0x3d07ea;_0x44156a[_0x202650('0x3b5')][_0x202650('0x90')][_0x202650('0x448')](this),this[_0x202650('0x5d9')]();}}else this[_0x3d07ea('0x140')]=this['applyEasing'](this[_0x3d07ea('0x140')],this['_targetAngle'],_0xec7738,_0x264c81,_0x2b1ae3);}else this[_0x3d07ea('0x140')]=(this[_0x3d07ea('0x140')]*(_0xec7738-0x1)+this[_0x3d07ea('0x426')])/_0xec7738;this[_0x3d07ea('0x17b')]--;if(this[_0x3d07ea('0x17b')]<=0x0)this[_0x3d07ea('0x67d')]();},Sprite_Battler[_0x3219af('0x3b5')]['onAngleEnd']=function(){const _0x36e3f7=_0x3219af;this[_0x36e3f7('0x140')]=this[_0x36e3f7('0x426')],this[_0x36e3f7('0x642')]&&(this[_0x36e3f7('0x426')]=0x0,this['_currentAngle']=0x0);},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x475')]=function(){return this['_angleDuration']>0x0;},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x43a')]=function(){const _0xfe8f73=_0x3219af;if(!this[_0xfe8f73('0x6ee')])return;const _0x3c9ab4=this[_0xfe8f73('0x140')],_0x1823c2=this[_0xfe8f73('0x495')]['x'],_0xbe6500=this[_0xfe8f73('0x27c')][_0xfe8f73('0x857')]()?-0x1:0x1;this['_distortionSprite'][_0xfe8f73('0x31d')]=_0x3c9ab4*_0x1823c2*_0xbe6500;const _0x1b7565=this[_0xfe8f73('0x6ee')]['scale']['y'];this[_0xfe8f73('0x6ee')]['y']=this[_0xfe8f73('0x1e3')]*-0.5*(0x2-_0x1b7565);const _0x3bce8b=[this[_0xfe8f73('0x1af')],this['_svBattlerSprite'],this['_dragonbonesSpriteContainer']];for(const _0x44bbf3 of _0x3bce8b){if('vprPA'!==_0xfe8f73('0x242')){if(!_0x44bbf3)continue;_0x44bbf3['y']=this['height']*0.5;}else{function _0x249eb4(){const _0x32dd3d=_0xfe8f73;if(this[_0x32dd3d('0x620')]>0x0)this[_0x32dd3d('0x620')]-=0x10;}}}this['_shadowSprite']&&(this[_0xfe8f73('0x32f')][_0xfe8f73('0x495')]['x']=this[_0xfe8f73('0x6ee')]['scale']['x'],this[_0xfe8f73('0x32f')][_0xfe8f73('0x495')]['y']=this['_distortionSprite']['scale']['y']);},VisuMZ['BattleCore'][_0x3219af('0x413')]=Sprite_Actor['prototype']['createStateSprite'],Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x80e')]=function(){const _0x548e34=_0x3219af;VisuMZ[_0x548e34('0x1e6')]['Sprite_Actor_createStateSprite'][_0x548e34('0x448')](this),VisuMZ[_0x548e34('0x1e6')][_0x548e34('0x885')][_0x548e34('0x68c')][_0x548e34('0x2c4')]&&this[_0x548e34('0x85d')]();},VisuMZ['BattleCore'][_0x3219af('0x355')]=Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x22')],Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x22')]=function(){const _0x2d3bed=_0x3219af;if(VisuMZ[_0x2d3bed('0x1e6')]['Settings'][_0x2d3bed('0x68c')]['ShowEnemyGauge']){if('kDCyv'!==_0x2d3bed('0x4a5')){function _0x4fece1(){const _0x1f7c8a=_0x2d3bed;_0x5095ef[_0x1f7c8a('0x3b5')][_0x1f7c8a('0x2f3')][_0x1f7c8a('0x448')](this);}}else this[_0x2d3bed('0x85d')]();}VisuMZ['BattleCore']['Sprite_Enemy_createStateIconSprite'][_0x2d3bed('0x448')](this);},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x85d')]=function(){const _0x15c3c4=_0x3219af;if(!ConfigManager['visualHpGauge'])return;if(this[_0x15c3c4('0x4ad')]===Sprite_SvEnemy)return;const _0xefd9a7=VisuMZ[_0x15c3c4('0x1e6')][_0x15c3c4('0x885')]['HpGauge'],_0xed262=new Sprite_HpGauge();_0xed262[_0x15c3c4('0x7c')]['x']=_0xefd9a7[_0x15c3c4('0x69')],_0xed262['anchor']['y']=_0xefd9a7[_0x15c3c4('0x40b')],_0xed262['scale']['x']=_0xed262['scale']['y']=_0xefd9a7[_0x15c3c4('0x285')],this[_0x15c3c4('0x4db')]=_0xed262,this[_0x15c3c4('0x2b6')](this[_0x15c3c4('0x4db')]);},VisuMZ[_0x3219af('0x1e6')]['Sprite_Battler_setBattler']=Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x18f')],Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x18f')]=function(_0x26dd0b){const _0x962154=_0x3219af;VisuMZ[_0x962154('0x1e6')][_0x962154('0x210')][_0x962154('0x448')](this,_0x26dd0b),this['setupHpGaugeSprite'](_0x26dd0b);},Sprite_Battler['prototype'][_0x3219af('0x46f')]=function(_0x4ebd09){const _0x48ac5f=_0x3219af;if(!_0x4ebd09)return;if(!this['_hpGaugeSprite'])return;if(_0x4ebd09['isActor']()){}else{if(_0x4ebd09[_0x48ac5f('0xf9')]()){if(this[_0x48ac5f('0x4ad')]===Sprite_SvEnemy&&!_0x4ebd09[_0x48ac5f('0x585')]())return;}}this[_0x48ac5f('0x4db')][_0x48ac5f('0x7ea')](_0x4ebd09,'hp');},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x310')]=function(){const _0xc02938=_0x3219af;if(!this[_0xc02938('0x27c')])return;if(!this[_0xc02938('0x4db')])return;const _0x5375cb=VisuMZ[_0xc02938('0x1e6')][_0xc02938('0x885')][_0xc02938('0x68c')],_0x5f3159=this[_0xc02938('0x4db')];_0x5f3159[_0xc02938('0x117')]=this[_0xc02938('0x23d')]();const _0x175b38=_0x5375cb[_0xc02938('0x470')],_0x5d2f55=_0x5375cb[_0xc02938('0x44f')];_0x5f3159['x']=_0x175b38,_0x5f3159['x']+=this[_0xc02938('0x27c')]['battleUIOffsetX'](),_0x5f3159['y']=-this[_0xc02938('0x1e3')]+_0x5d2f55,_0x5f3159['y']+=this[_0xc02938('0x27c')][_0xc02938('0x701')]();},Sprite_Battler['prototype'][_0x3219af('0x23d')]=function(){const _0x2072dc=_0x3219af;if(!this['_battler'])return![];if(this[_0x2072dc('0x27c')][_0x2072dc('0x857')]())return!![];const _0x59850e=this[_0x2072dc('0x27c')][_0x2072dc('0x569')]()[_0x2072dc('0x1e2')];if(_0x59850e[_0x2072dc('0x6f1')](/<SHOW HP GAUGE>/i))return!![];if(_0x59850e['match'](/<HIDE HP GAUGE>/i))return![];const _0x200743=VisuMZ['BattleCore'][_0x2072dc('0x885')][_0x2072dc('0x68c')];if(_0x200743[_0x2072dc('0x30c')]){if(_0x2072dc('0x377')===_0x2072dc('0x377')){if(_0x200743['BTestBypass']&&BattleManager[_0x2072dc('0x6df')]())return!![];if(this[_0x2072dc('0x27c')][_0x2072dc('0x5d7')])return![];return this[_0x2072dc('0x27c')][_0x2072dc('0x47e')]();}else{function _0xddfd21(){const _0x315530=_0x2072dc;for(;;){const _0x486267=this[_0x315530('0x48c')]();if(!_0x486267)return null;if(_0x486267[_0x315530('0x4f9')]()&&_0x486267[_0x315530('0x705')]())return _0x486267;}}}}return!![];},VisuMZ['BattleCore'][_0x3219af('0x700')]=Sprite_Battler['prototype']['isMoving'],Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x317')]=function(){const _0x1216bb=_0x3219af;if(!this[_0x1216bb('0x27c')])return![];return VisuMZ[_0x1216bb('0x1e6')][_0x1216bb('0x700')][_0x1216bb('0x448')](this);},VisuMZ['BattleCore'][_0x3219af('0x1ff')]=Sprite_Battler['prototype'][_0x3219af('0x7f5')],Sprite_Battler['prototype'][_0x3219af('0x7f5')]=function(_0xcbd44a,_0x510af0,_0x204ba3){const _0x417e60=_0x3219af;this['canMove']()&&VisuMZ[_0x417e60('0x1e6')]['Sprite_Battler_startMove'][_0x417e60('0x448')](this,_0xcbd44a,_0x510af0,_0x204ba3);},Sprite_Battler['prototype'][_0x3219af('0x84e')]=function(){const _0x5d6766=_0x3219af;if(this[_0x5d6766('0x27c')]&&this['_battler'][_0x5d6766('0x71f')]())return![];if(this[_0x5d6766('0x27c')]&&!this['_battler'][_0x5d6766('0x55d')]())return![];return $gameSystem['isSideView']();},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x342')]=function(){},Sprite_Battler['prototype'][_0x3219af('0x34d')]=function(){const _0xc87069=_0x3219af;this[_0xc87069('0x7f5')](0x0,0x0,0xc);},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x368')]=function(){},Sprite_Battler[_0x3219af('0x3b5')][_0x3219af('0x61f')]=function(){const _0x4d961b=_0x3219af,_0xea9dd7=VisuMZ['BattleCore']['Settings'][_0x4d961b('0x2b2')],_0x3050a9=this[_0x4d961b('0x27c')]&&this[_0x4d961b('0x27c')][_0x4d961b('0x857')]()?0x1:-0x1,_0x14a4ed=this['_baseX']-this[_0x4d961b('0x294')]+_0x3050a9*_0xea9dd7[_0x4d961b('0x407')],_0x1c56d1=this[_0x4d961b('0x833')]-this[_0x4d961b('0x801')]+_0x3050a9*_0xea9dd7[_0x4d961b('0x82b')],_0x3ede09=_0xea9dd7[_0x4d961b('0x23e')];this['startMove'](_0x14a4ed,_0x1c56d1,_0x3ede09);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x3b')]=Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x19')],Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x19')]=function(){const _0x175d68=_0x3219af;VisuMZ[_0x175d68('0x1e6')][_0x175d68('0x3b')][_0x175d68('0x448')](this),this[_0x175d68('0x55c')]();},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x2c1')]=function(){const _0x414d19=_0x3219af;return this[_0x414d19('0x6ee')]||this[_0x414d19('0x1af')]||this;},VisuMZ['BattleCore']['Sprite_Actor_moveToStartPosition']=Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x875')],Sprite_Actor['prototype']['moveToStartPosition']=function(){const _0x514e82=_0x3219af;if(SceneManager[_0x514e82('0x864')]())return;},VisuMZ[_0x3219af('0x1e6')]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x3219af('0x3b5')]['setActorHome'],Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x695')]=function(_0x15540a){const _0x69f02f=_0x3219af;if(VisuMZ['BattleCore']['Settings']['Actor']['HomePosJS'])VisuMZ[_0x69f02f('0x1e6')][_0x69f02f('0x885')][_0x69f02f('0x2b2')]['HomePosJS'][_0x69f02f('0x448')](this,_0x15540a);else{if('xAMAk'==='Tvblb'){function _0x26ed5f(){const _0x123909=_0x69f02f;_0x13d74c[_0x123909('0x5e1')][_0x123909('0x201')]=!![];}}else VisuMZ['BattleCore'][_0x69f02f('0x878')][_0x69f02f('0x448')](this,_0x15540a);}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7fb')]=Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x18f')],Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x18f')]=function(_0x2a444e){const _0x539e01=_0x3219af;VisuMZ[_0x539e01('0x1e6')][_0x539e01('0x7fb')]['call'](this,_0x2a444e),this[_0x539e01('0x193')](_0x2a444e);},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x193')]=function(_0x14887a){const _0x26ec70=_0x3219af;if(!_0x14887a)return;if(!this['_mainSprite'])return;this[_0x26ec70('0x1af')]['anchor']['x']=this[_0x26ec70('0x6f4')][_0x26ec70('0x15')](),this['_mainSprite'][_0x26ec70('0x7c')]['y']=this[_0x26ec70('0x6f4')][_0x26ec70('0x64f')](),this[_0x26ec70('0x464')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x204')]=Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x789')],Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x789')]=function(){const _0x3c1300=_0x3219af;VisuMZ['BattleCore']['Sprite_Actor_update'][_0x3c1300('0x448')](this),this[_0x3c1300('0x6f4')]&&(this[_0x3c1300('0x4b1')](),this['updateStyleOpacity']());},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x231')]=Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x12a')],Sprite_Actor['prototype'][_0x3219af('0x12a')]=function(){const _0x3750c2=_0x3219af;VisuMZ[_0x3750c2('0x1e6')][_0x3750c2('0x231')][_0x3750c2('0x448')](this);if(this[_0x3750c2('0x1af')]&&this[_0x3750c2('0x1af')]['bitmap']&&this[_0x3750c2('0x27c')]){if(_0x3750c2('0x486')!==_0x3750c2('0x33c'))this[_0x3750c2('0x1af')][_0x3750c2('0x601')][_0x3750c2('0x1fd')]!==this[_0x3750c2('0x27c')][_0x3750c2('0x16a')]()&&(this[_0x3750c2('0x1af')][_0x3750c2('0x601')][_0x3750c2('0x1fd')]=this['_battler'][_0x3750c2('0x16a')]());else{function _0x204e93(){const _0x3c33e0=_0x3750c2;this[_0x3c33e0('0x3f6')][_0x3c33e0('0x453')]('addText',_0x2cf0b4['preemptive']['format'](_0x4d2701[_0x3c33e0('0x99')]())),this[_0x3c33e0('0x3f6')][_0x3c33e0('0x453')](_0x3c33e0('0x35e'));}}}},VisuMZ[_0x3219af('0x1e6')]['Sprite_Actor_updateShadow']=Sprite_Actor['prototype'][_0x3219af('0x149')],Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x149')]=function(){const _0x2f177b=_0x3219af;VisuMZ[_0x2f177b('0x1e6')][_0x2f177b('0x24f')][_0x2f177b('0x448')](this),this[_0x2f177b('0x3f1')]();},Sprite_Actor[_0x3219af('0x3b5')]['updateShadowBattleCore']=function(){const _0x106cfe=_0x3219af;if(!this[_0x106cfe('0x1af')])return;if(!this[_0x106cfe('0x32f')])return;this[_0x106cfe('0x464')](),this[_0x106cfe('0x6bd')]();},Sprite_Actor['prototype'][_0x3219af('0x4b1')]=function(){const _0x452458=_0x3219af;this[_0x452458('0x64')][_0x452458('0x495')]['x']=0x1/(this[_0x452458('0x495')]['x']||0.001),this[_0x452458('0x64')][_0x452458('0x495')]['y']=0x1/(this[_0x452458('0x495')]['y']||0.001);},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x6a6')]=function(){const _0xab96dd=_0x3219af;if(!$gameSystem[_0xab96dd('0x670')]()&&this[_0xab96dd('0x4ad')]===Sprite_Actor){if('ejzpu'===_0xab96dd('0x10f')){function _0x118616(){_0x2b8603=_0xd511fb['FrontViewSelect'];}}else{const _0x1cca63=Scene_Battle[_0xab96dd('0x3b5')][_0xab96dd('0x72a')]();if([_0xab96dd('0x311'),'list',_0xab96dd('0x82e'),'border']['includes'](_0x1cca63)){if(_0xab96dd('0x4d5')!==_0xab96dd('0x4d5')){function _0x264824(){const _0xabf126=_0xab96dd;return _0x32bc1b[_0xabf126('0x1e6')][_0xabf126('0x648')][_0xabf126('0x448')](this,_0x5285cc);}}else this[_0xab96dd('0x805')]=0x0;}}}},Sprite_Actor[_0x3219af('0x3b5')]['refreshMotion']=function(){const _0x5ab602=_0x3219af,_0x35a104=this['_actor'];if(_0x35a104){const _0xd5b0e4=_0x35a104[_0x5ab602('0x626')]();if(_0x35a104[_0x5ab602('0x347')]()||_0x35a104['isActing']()){if('VZktE'!=='BDObm')this['startMotion'](_0x5ab602('0x462'));else{function _0x3192f5(){const _0x3e88f9=_0x5ab602;_0x367947['BattleCore']['Scene_Battle_createActorCommandWindow'][_0x3e88f9('0x448')](this),this[_0x3e88f9('0x77e')]();}}}else{if(_0xd5b0e4===0x3)this[_0x5ab602('0x691')]('dead');else{if(_0xd5b0e4===0x2){if('Jhckj'!==_0x5ab602('0x10d')){function _0x2b3bf1(){const _0x20a073=_0x5ab602;_0x52454d[_0x20a073('0x8c')](_0x1772a8);}}else this[_0x5ab602('0x691')](_0x5ab602('0xdf'));}else{if(this[_0x5ab602('0x362')]){if(_0x5ab602('0x7ab')===_0x5ab602('0x7ab'))this['startMotion'](_0x5ab602('0x41f'));else{function _0x39f155(){const _0x66e5ad=_0x5ab602,_0x349623=this[_0x66e5ad('0x15b')](_0x3f1d48);return _0x349623===_0x66e5ad('0x42b')?this[_0x66e5ad('0x27d')]():_0x5ce78[_0x66e5ad('0x1e6')][_0x66e5ad('0x71c')][_0x66e5ad('0x448')](this,_0x5fdec2);}}}else{if(_0x35a104['isCharging']()){if(_0x5ab602('0x461')!==_0x5ab602('0x461')){function _0x2774a6(){const _0x47025a=_0x5ab602;return _0x3cac5e['getInputButtonString'](_0x47025a('0x1a8'));}}else this[_0x5ab602('0x691')]('wait');}else{if(_0x35a104[_0x5ab602('0x2b0')]()){if(_0x5ab602('0x7d2')!=='RkBAQ')this[_0x5ab602('0x691')](_0x5ab602('0x788'));else{function _0x2a7484(){const _0x302cb5=_0x5ab602;_0x371597[_0x302cb5('0xea')](0x0);}}}else{if(_0x35a104[_0x5ab602('0x148')]()||_0x35a104['isGuardWaiting']())this[_0x5ab602('0x691')]('guard');else{if(_0xd5b0e4===0x1)this[_0x5ab602('0x691')](_0x5ab602('0x886'));else{if(_0x35a104['isDying']())this[_0x5ab602('0x691')](_0x5ab602('0x138'));else{if(_0x35a104[_0x5ab602('0x318')]()){if(_0x5ab602('0x465')!==_0x5ab602('0x465')){function _0x210f41(){this['setCursorRect'](0x0,0x0,0x0,0x0);return;}}else this[_0x5ab602('0x691')]('walk');}else{if(_0x35a104[_0x5ab602('0x664')]())this[_0x5ab602('0x691')](_0x5ab602('0x35e'));else{if(_0x5ab602('0xfe')!==_0x5ab602('0xfe')){function _0xf4a190(){const _0x5a59d4=_0x5ab602;this[_0x5a59d4('0x588')]();}}else this[_0x5ab602('0x691')](_0x5ab602('0x462'));}}}}}}}}}}}}},Sprite_Actor['prototype'][_0x3219af('0x368')]=function(){const _0x5e56c2=_0x3219af,_0x5873ab=0xa,_0x3231f1=0x12c*_0x5873ab,_0x470fad=0x1e*_0x5873ab;this[_0x5e56c2('0x7f5')](_0x3231f1,0x0,_0x470fad);},Sprite_Actor['prototype']['onMoveEnd']=function(){const _0x17c843=_0x3219af;Sprite_Battler[_0x17c843('0x3b5')][_0x17c843('0x4e7')][_0x17c843('0x448')](this);},Sprite_Actor[_0x3219af('0x3b5')]['motionSpeed']=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Weapon[_0x3219af('0x3b5')][_0x3219af('0x775')]=function(){const _0x29907b=_0x3219af;return Sprite_Battler[_0x29907b('0x203')];},Sprite_Actor['prototype'][_0x3219af('0x6c0')]=function(){},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x81e')]=function(){},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x3dd')]=function(){const _0x528583=_0x3219af;if(this[_0x528583('0x47b')]&&++this['_motionCount']>=this[_0x528583('0x583')]()){if(_0x528583('0x0')!==_0x528583('0x386')){if(this[_0x528583('0x47b')]['loop']){if(_0x528583('0xbf')!==_0x528583('0x4f8'))this['_pattern']=(this['_pattern']+0x1)%0x4;else{function _0x12c0f8(){const _0x3d375d=_0x528583,_0x3f807e=this[_0x3d375d('0x402')];_0x3f807e[_0x3d375d('0x683')](_0x3d375d('0x41f'),this[_0x3d375d('0x571')][_0x3d375d('0x84b')](this)),_0x3f807e['setHandler']('autoBattle',this[_0x3d375d('0x49c')][_0x3d375d('0x84b')](this)),_0x3f807e[_0x3d375d('0x683')](_0x3d375d('0x4e3'),this[_0x3d375d('0x792')]['bind'](this)),_0x53afbc[_0x3d375d('0x38a')]()&&(this[_0x3d375d('0x8a1')]()?delete _0x3f807e[_0x3d375d('0x162')][_0x3d375d('0x1a8')]:_0x3f807e[_0x3d375d('0x683')](_0x3d375d('0x1a8'),this[_0x3d375d('0x34f')]['bind'](this)));}}}else this[_0x528583('0x797')]<0x2?this[_0x528583('0x797')]++:this[_0x528583('0x3f8')]();this['_motionCount']=0x0;}else{function _0x553e99(){const _0x50476f=_0x528583;this[_0x50476f('0x711')]();}}}},Sprite_Actor[_0x3219af('0x3b5')]['forceMotion']=function(_0x3b9873){const _0x42eb05=_0x3219af;if(_0x3b9873===_0x42eb05('0x83b'))this[_0x42eb05('0x629')]=!![];if(this[_0x42eb05('0x27c')]&&this[_0x42eb05('0x27c')][_0x42eb05('0x71f')]()){if(_0x42eb05('0x7ad')===_0x42eb05('0x70')){function _0x69fb02(){const _0x5900ca=_0x42eb05;_0xc57121=_0x2d1e38[this[_0x5900ca('0x86b')][_0x3ab7e8][_0x5900ca('0x888')]];}}else{this['_motion']=Sprite_Actor[_0x42eb05('0x314')]['dead'];return;}}const _0x321e58=Sprite_Actor['MOTIONS'][_0x3b9873];this[_0x42eb05('0x47b')]=_0x321e58,this[_0x42eb05('0x81f')]=0x0,this[_0x42eb05('0x797')]=0x0;},Sprite_Actor['prototype'][_0x3219af('0x509')]=function(_0x1ca0d7){const _0x1a1549=_0x3219af;this[_0x1a1549('0x7fe')](),this[_0x1a1549('0x1fb')][_0x1a1549('0x7ea')](_0x1ca0d7),this[_0x1a1549('0x6f4')][_0x1a1549('0x33')]();},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x7fe')]=function(){const _0x2bac25=_0x3219af;let _0x4e8f02=-0x10,_0x5efe8f=this[_0x2bac25('0x1e3')]*0.5;const _0x1362f7=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x5a4ae6=this[_0x2bac25('0x27c')][_0x2bac25('0xd1')]()[_0x2bac25('0x75a')](_0x4579d9=>_0x4579d9&&_0x4579d9[_0x2bac25('0x1e2')][_0x2bac25('0x6f1')](_0x1362f7)?Number(RegExp['$1']):0x0),_0x5d6b7b=this[_0x2bac25('0x27c')][_0x2bac25('0xd1')]()[_0x2bac25('0x75a')](_0x2ea7ed=>_0x2ea7ed&&_0x2ea7ed[_0x2bac25('0x1e2')]['match'](_0x1362f7)?Number(RegExp['$2']):0x0);_0x4e8f02=_0x5a4ae6[_0x2bac25('0x482')]((_0x2583a1,_0x52b281)=>_0x2583a1+_0x52b281,_0x4e8f02),_0x5efe8f=_0x5d6b7b['reduce']((_0x125f4e,_0xfb461a)=>_0x125f4e+_0xfb461a,_0x5efe8f),this[_0x2bac25('0x1fb')]['x']=_0x4e8f02,this[_0x2bac25('0x1fb')]['y']=_0x5efe8f,this[_0x2bac25('0x1fb')][_0x2bac25('0x789')]();},Sprite_Weapon[_0x3219af('0x3b5')][_0x3219af('0x7ea')]=function(_0x1ec747){const _0x13d463=_0x3219af;this[_0x13d463('0x61a')]=_0x1ec747,this[_0x13d463('0x183')]=-0x1,this[_0x13d463('0x797')]=0x0,this[_0x13d463('0x837')](),this[_0x13d463('0x1ab')]();},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x4b7')]=function(){},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x342')]=function(){const _0x3c4fce=_0x3219af,_0x1e5ad1=VisuMZ['BattleCore'][_0x3c4fce('0x885')]['ActionSequence'],_0xa49631=_0x1e5ad1['StepDistanceX'],_0x401db4=_0x1e5ad1[_0x3c4fce('0x848')],_0x633afe=_0x1e5ad1[_0x3c4fce('0x5fa')];this[_0x3c4fce('0x7f5')](-_0xa49631,-_0x401db4,_0x633afe);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x27f')]=Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x1ab')],Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x1ab')]=function(){const _0x3edfca=_0x3219af;this[_0x3edfca('0x51b')](),VisuMZ[_0x3edfca('0x1e6')]['Sprite_Actor_updateFrame'][_0x3edfca('0x448')](this);},Sprite_Actor[_0x3219af('0x3b5')][_0x3219af('0x51b')]=function(){const _0x3ae159=_0x3219af;if(this[_0x3ae159('0x27c')]&&this[_0x3ae159('0x27c')]['_freezeMotionData']){const _0x2b0324=this[_0x3ae159('0x27c')]['_freezeMotionData'];this['_motion']=Sprite_Actor[_0x3ae159('0x314')][_0x2b0324[_0x3ae159('0x49')]],this[_0x3ae159('0x797')]=_0x2b0324[_0x3ae159('0x26a')];const _0x377840=this[_0x3ae159('0x1fb')];_0x377840['freezeFrame'](_0x2b0324['weaponImageId'],_0x2b0324['pattern']),this[_0x3ae159('0x7fe')]();}},Sprite_Weapon['prototype'][_0x3219af('0x75b')]=function(_0x40ed60,_0x2e8cda){const _0xd25b16=_0x3219af;this[_0xd25b16('0x61a')]=_0x40ed60,this[_0xd25b16('0x183')]=-Infinity,this[_0xd25b16('0x797')]=_0x2e8cda,this[_0xd25b16('0x837')](),this[_0xd25b16('0x1ab')]();},Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x19')]=function(){const _0x2e3643=_0x3219af;Sprite_Battler[_0x2e3643('0x3b5')]['initMembers'][_0x2e3643('0x448')](this),this[_0x2e3643('0x75e')]=null,this[_0x2e3643('0x250')]=![],this[_0x2e3643('0x1a7')]='',this[_0x2e3643('0x650')]=0x0,this[_0x2e3643('0x392')]=null,this[_0x2e3643('0x3ad')]=0x0,this['_shake']=0x0,this[_0x2e3643('0x37c')](),this[_0x2e3643('0x22')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x194')]=Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x789')],Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x789')]=function(){const _0x55434d=_0x3219af;VisuMZ[_0x55434d('0x1e6')][_0x55434d('0x194')][_0x55434d('0x448')](this),this[_0x55434d('0x464')]();},Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x37c')]=function(){const _0x3fc1a1=_0x3219af;this[_0x3fc1a1('0x1af')]=new Sprite(),this[_0x3fc1a1('0x1af')][_0x3fc1a1('0x7c')]['x']=0.5,this['_mainSprite'][_0x3fc1a1('0x7c')]['y']=0x1,this['addChild'](this[_0x3fc1a1('0x1af')]),this[_0x3fc1a1('0x55c')]();},Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x2c1')]=function(){const _0x597899=_0x3219af;return this[_0x597899('0x6ee')]||this[_0x597899('0x1af')]||this;},Sprite_Enemy['prototype'][_0x3219af('0x837')]=function(_0x432325){const _0x3a31bf=_0x3219af;this['bitmap']=new Bitmap(0x1,0x1),$gameSystem['isSideView']()?this[_0x3a31bf('0x1af')][_0x3a31bf('0x601')]=ImageManager['loadSvEnemy'](_0x432325):this[_0x3a31bf('0x1af')][_0x3a31bf('0x601')]=ImageManager[_0x3a31bf('0x401')](_0x432325),this[_0x3a31bf('0x1af')][_0x3a31bf('0x601')][_0x3a31bf('0xd7')](this['createEmptyBitmap'][_0x3a31bf('0x84b')](this));},Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x59f')]=function(){const _0x4a4da3=_0x3219af,_0x499167=this[_0x4a4da3('0x1af')][_0x4a4da3('0x601')];_0x499167&&(this['bitmap']=new Bitmap(_0x499167[_0x4a4da3('0x106')],_0x499167[_0x4a4da3('0x1e3')]));},VisuMZ[_0x3219af('0x1e6')]['Sprite_Enemy_setHue']=Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x4fd')],Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x4fd')]=function(_0x40c9c5){this['_mainSprite']&&this['_mainSprite']['setHue'](_0x40c9c5);},VisuMZ[_0x3219af('0x1e6')]['Sprite_Enemy_initVisibility']=Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x3a0')],Sprite_Enemy[_0x3219af('0x3b5')]['initVisibility']=function(){const _0x5aed3c=_0x3219af;if(this[_0x5aed3c('0x2f')]()){if('QmdCM'!==_0x5aed3c('0x1a'))VisuMZ['BattleCore'][_0x5aed3c('0x449')][_0x5aed3c('0x448')](this);else{function _0x5f556d(){const _0x489bd9=_0x5aed3c;this[_0x489bd9('0x6d3')]=!![],this[_0x489bd9('0x3f6')][_0x489bd9('0x453')](_0x489bd9('0x380'),_0xda6dd9[_0x489bd9('0x1e6')]['Settings'][_0x489bd9('0x34c')][_0x489bd9('0x851')]);}}}else{if(_0x5aed3c('0x383')===_0x5aed3c('0x383')){this[_0x5aed3c('0x250')]=!this['_enemy'][_0x5aed3c('0x43d')]();if(!this[_0x5aed3c('0x250')]){if(_0x5aed3c('0x4fc')===_0x5aed3c('0x7c7')){function _0x2c5ab1(){const _0x3e2f91=_0x5aed3c;this['_stateIconSprite']['x']=0x0,this[_0x3e2f91('0x88a')]['x']+=this[_0x3e2f91('0x27c')][_0x3e2f91('0x119')](),this[_0x3e2f91('0x88a')]['y']=-this[_0x3e2f91('0x601')]['height']-this[_0x3e2f91('0x88a')][_0x3e2f91('0x1e3')],this[_0x3e2f91('0x88a')]['y']+=this[_0x3e2f91('0x27c')][_0x3e2f91('0x701')](),this[_0x3e2f91('0x88a')][_0x3e2f91('0x495')]['x']=0x1/(this['scale']['x']||0.001),this[_0x3e2f91('0x88a')][_0x3e2f91('0x495')]['y']=0x1/(this['scale']['y']||0.001),this[_0x3e2f91('0x585')]()&&(this[_0x3e2f91('0x6cd')][_0x3e2f91('0x64')]['scale']['x']=-0x1/(this['scale']['x']||0.001),this['_svBattlerSprite'][_0x3e2f91('0x64')][_0x3e2f91('0x495')]['y']=0x1/(this['scale']['y']||0.001));}}else this[_0x5aed3c('0x805')]=0x0;}}else{function _0x3f468a(){const _0x1c6ed0=_0x5aed3c;this[_0x1c6ed0('0x54a')](...arguments);}}}},VisuMZ[_0x3219af('0x1e6')]['Sprite_Enemy_updateCollapse']=Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x5c6')],Sprite_Enemy['prototype'][_0x3219af('0x5c6')]=function(){const _0x4ef62d=_0x3219af;if(this['allowCollapse']())VisuMZ['BattleCore']['Sprite_Enemy_updateCollapse'][_0x4ef62d('0x448')](this);},Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x1ab')]=function(){const _0x77b4bf=_0x3219af;Sprite_Battler[_0x77b4bf('0x3b5')]['updateFrame'][_0x77b4bf('0x448')](this);const _0x4d4d8c=this[_0x77b4bf('0x2c1')]()||this;if(!_0x4d4d8c)return;if(!_0x4d4d8c[_0x77b4bf('0x601')]){if(_0x77b4bf('0x7e7')!=='gradW')_0x4d4d8c[_0x77b4bf('0x601')]=new Bitmap(this['width'],this[_0x77b4bf('0x1e3')]);else{function _0x39df20(){const _0x339751=_0x77b4bf;_0x53a2dc[_0x339751('0x1e6')][_0x339751('0x15a')][_0x339751('0x448')](this),this[_0x339751('0x259')]()['note'][_0x339751('0x6f1')](/<CUSTOM ACTION SEQUENCE>/i)&&(_0x1b8c3a['_commonEventQueue']=[]);}}}if(this[_0x77b4bf('0x392')]===_0x77b4bf('0x1b0')){if(_0x77b4bf('0x693')!==_0x77b4bf('0x898'))this[_0x77b4bf('0x1af')]['setFrame'](0x0,0x0,this[_0x77b4bf('0x1af')][_0x77b4bf('0x106')],this[_0x77b4bf('0x3ad')]);else{function _0x4c03d5(){const _0x5b4698=_0x77b4bf;if(!_0x4d5f51[_0x5b4698('0x40d')]())return;const _0xad9706=_0x30f510[_0x5b4698('0xdc')]();if(!_0xad9706)return;_0xad9706['setWaitMode'](_0x5b4698('0x4bb'));}}}else{if(_0x77b4bf('0x70d')===_0x77b4bf('0x70d'))_0x4d4d8c['setFrame'](0x0,0x0,_0x4d4d8c[_0x77b4bf('0x601')][_0x77b4bf('0x106')],this[_0x77b4bf('0x601')][_0x77b4bf('0x1e3')]);else{function _0x48482d(){const _0x430d04=_0x77b4bf;_0x48f617[_0x430d04('0x1e6')]['Scene_Battle_startPartyCommandSelection']['call'](this);}}}},VisuMZ[_0x3219af('0x1e6')]['Sprite_Enemy_updateBossCollapse']=Sprite_Enemy[_0x3219af('0x3b5')]['updateBossCollapse'],Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x21b')]=function(){const _0x222cc0=_0x3219af;if(this[_0x222cc0('0x2f')]())VisuMZ[_0x222cc0('0x1e6')]['Sprite_Enemy_updateBossCollapse'][_0x222cc0('0x448')](this);},Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x317')]=function(){const _0x2917e4=_0x3219af;return Sprite_Battler['prototype'][_0x2917e4('0x317')][_0x2917e4('0x448')](this);},VisuMZ['BattleCore'][_0x3219af('0x68d')]=Sprite_Enemy[_0x3219af('0x3b5')]['updateStateSprite'],Sprite_Enemy[_0x3219af('0x3b5')]['updateStateSprite']=function(){const _0x5c83e9=_0x3219af;VisuMZ[_0x5c83e9('0x1e6')]['Sprite_Enemy_updateStateSprite']['call'](this),this[_0x5c83e9('0x44c')]();},Sprite_Enemy['prototype']['updateStateSpriteBattleCore']=function(){const _0x133208=_0x3219af;this['_stateIconSprite']['x']=0x0,this[_0x133208('0x88a')]['x']+=this['_battler'][_0x133208('0x119')](),this['_stateIconSprite']['y']=-this[_0x133208('0x601')]['height']-this[_0x133208('0x88a')][_0x133208('0x1e3')],this[_0x133208('0x88a')]['y']+=this[_0x133208('0x27c')]['battleUIOffsetY'](),this[_0x133208('0x88a')][_0x133208('0x495')]['x']=0x1/(this[_0x133208('0x495')]['x']||0.001),this[_0x133208('0x88a')][_0x133208('0x495')]['y']=0x1/(this[_0x133208('0x495')]['y']||0.001);if(this[_0x133208('0x585')]()){if(_0x133208('0x2d9')===_0x133208('0x2d9'))this[_0x133208('0x6cd')]['_stateSprite'][_0x133208('0x495')]['x']=-0x1/(this['scale']['x']||0.001),this[_0x133208('0x6cd')][_0x133208('0x64')]['scale']['y']=0x1/(this[_0x133208('0x495')]['y']||0.001);else{function _0x1e1c93(){const _0x5802c4=_0x133208;this[_0x5802c4('0x71a')][_0x5802c4('0x409')](_0x1146fc),this[_0x5802c4('0x131')](_0x5e4b99)?this[_0x5802c4('0x734')]()[_0x5802c4('0x284')](_0x5319f2):this[_0x5802c4('0x65c')]['removeChild'](_0x481033);}}}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x699')]=Sprite_Enemy['prototype'][_0x3219af('0x18f')],Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x18f')]=function(_0x54031b){const _0x5298da=_0x3219af;VisuMZ['BattleCore']['Sprite_Enemy_setBattler']['call'](this,_0x54031b),this[_0x5298da('0x60')](_0x54031b);},Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x60')]=function(_0x4d3cf3){const _0x4cc33b=_0x3219af;!this['_svBattlerSprite']&&(this[_0x4cc33b('0x6cd')]=new Sprite_SvEnemy(_0x4d3cf3),this['attachSpritesToDistortionSprite']()),this[_0x4cc33b('0x6cd')][_0x4cc33b('0x18f')](_0x4d3cf3);},Sprite_Enemy[_0x3219af('0x3b5')][_0x3219af('0x585')]=function(){const _0x5a7d46=_0x3219af;return this[_0x5a7d46('0x75e')]&&this[_0x5a7d46('0x75e')][_0x5a7d46('0x585')]();},VisuMZ['BattleCore'][_0x3219af('0x8e')]=Sprite_Enemy[_0x3219af('0x3b5')]['loadBitmap'],Sprite_Enemy['prototype'][_0x3219af('0x837')]=function(_0x6e4ea0){const _0x3c65e9=_0x3219af;if(this[_0x3c65e9('0x585')]()){if(_0x3c65e9('0x579')===_0x3c65e9('0x3dc')){function _0xb3e159(){const _0x4dadc7=_0x3c65e9;this[_0x4dadc7('0x1af')]['bitmap'][_0x4dadc7('0x1fd')]!==this[_0x4dadc7('0x27c')][_0x4dadc7('0x16a')]()&&(this[_0x4dadc7('0x1af')][_0x4dadc7('0x601')][_0x4dadc7('0x1fd')]=this[_0x4dadc7('0x27c')][_0x4dadc7('0x16a')]());}}else{const _0x279773=this[_0x3c65e9('0x75e')][_0x3c65e9('0x7fa')]();this[_0x3c65e9('0x601')]=new Bitmap(_0x279773[_0x3c65e9('0x106')],_0x279773['height']);}}else{if('AyfiQ'!=='AyfiQ'){function _0x5430dd(){const _0x374bac=_0x3c65e9;if(this[_0x374bac('0x166')]()!=='')return this[_0x374bac('0x166')]();else{if(_0x41d7c9[_0x374bac('0x2f0')]&&this[_0x374bac('0x3d0')]()!=='')return this[_0x374bac('0x3d0')]();}return'';}}else VisuMZ['BattleCore'][_0x3c65e9('0x8e')][_0x3c65e9('0x448')](this,_0x6e4ea0);}},Sprite_Enemy['prototype'][_0x3219af('0x2f')]=function(){const _0x44c278=_0x3219af;if(this['hasSvBattler']())return this['_enemy'][_0x44c278('0x2f')]();else{if(_0x44c278('0x4a7')==='YVryE')return!![];else{function _0x362a3f(){const _0x1db27d=_0x44c278;this[_0x1db27d('0x54a')](...arguments);}}}},Sprite_Enemy[_0x3219af('0x3b5')]['refreshMotion']=function(){const _0x93ff6f=_0x3219af;if(this[_0x93ff6f('0x585')]())this[_0x93ff6f('0x6cd')]['refreshMotion']();},Sprite_Enemy[_0x3219af('0x3b5')]['forceMotion']=function(_0x4f0585){const _0x234b53=_0x3219af;if(this[_0x234b53('0x585')]())this['_svBattlerSprite']['forceMotion'](_0x4f0585);},Sprite_Enemy[_0x3219af('0x3b5')]['forceWeaponAnimation']=function(_0x270017){const _0x5cbf6c=_0x3219af;if(this[_0x5cbf6c('0x585')]())this[_0x5cbf6c('0x6cd')]['forceWeaponAnimation'](_0x270017);},Sprite_Enemy['prototype']['stepForward']=function(){const _0x16c221=_0x3219af,_0x12a645=VisuMZ[_0x16c221('0x1e6')][_0x16c221('0x885')][_0x16c221('0x564')],_0x3352e6=_0x12a645[_0x16c221('0x1d')],_0x30fc96=_0x12a645['StepDistanceY'],_0x32c28f=_0x12a645['StepDuration'];this['startMove'](_0x3352e6,_0x30fc96,_0x32c28f);};function Sprite_SvEnemy(){const _0x3b8e2b=_0x3219af;this[_0x3b8e2b('0x54a')](...arguments);}Sprite_SvEnemy[_0x3219af('0x3b5')]=Object['create'](Sprite_Actor['prototype']),Sprite_SvEnemy[_0x3219af('0x3b5')]['constructor']=Sprite_SvEnemy,Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x54a')]=function(_0x44372c){const _0xc3b46c=_0x3219af;Sprite_Actor[_0xc3b46c('0x3b5')][_0xc3b46c('0x54a')][_0xc3b46c('0x448')](this,_0x44372c),this[_0xc3b46c('0x495')]['x']=-0x1,this['_stateSprite']['scale']['x']=-0x1;},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x82c')]=function(){},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x875')]=function(){},Sprite_SvEnemy['prototype'][_0x3219af('0x695')]=function(_0x57b1ff){},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x149')]=function(){},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x6bd')]=function(){},Sprite_SvEnemy['prototype']['updateStateSprite']=function(){const _0x29b72e=_0x3219af;this[_0x29b72e('0x64')][_0x29b72e('0x117')]=![];},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x12a')]=function(){const _0x57e4eb=_0x3219af;Sprite_Battler[_0x57e4eb('0x3b5')][_0x57e4eb('0x12a')][_0x57e4eb('0x448')](this);const _0x2980c6=this[_0x57e4eb('0x6f4')][_0x57e4eb('0x5b6')]();this[_0x57e4eb('0x1a7')]!==_0x2980c6&&(this[_0x57e4eb('0x1a7')]=_0x2980c6,this['_mainSprite'][_0x57e4eb('0x601')]=ImageManager['loadSvActor'](_0x2980c6));if(this[_0x57e4eb('0x1af')]&&this[_0x57e4eb('0x1af')]['bitmap']&&this[_0x57e4eb('0x27c')]){if(this[_0x57e4eb('0x1af')][_0x57e4eb('0x601')]['smooth']!==this[_0x57e4eb('0x27c')]['battlerSmoothImage']()){if('RIeXg'===_0x57e4eb('0x60d')){function _0x47860c(){return[_0x5ed894];}}else this[_0x57e4eb('0x1af')]['bitmap'][_0x57e4eb('0x1fd')]=this[_0x57e4eb('0x27c')]['battlerSmoothImage']();}}},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x368')]=function(){},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x7f5')]=function(_0x18d4e8,_0x3c15c8,_0x3044b7){const _0xf2e076=_0x3219af;if(this['parent'])this[_0xf2e076('0x19a')][_0xf2e076('0x7f5')](_0x18d4e8,_0x3c15c8,_0x3044b7);},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x3f8')]=function(){const _0x544011=_0x3219af,_0x5c2082=this[_0x544011('0x6f4')];if(_0x5c2082){const _0x1ac8a7=_0x5c2082[_0x544011('0x626')]();if(_0x5c2082['isInputting']()||_0x5c2082[_0x544011('0x808')]())this[_0x544011('0x691')](_0x544011('0x462'));else{if(_0x1ac8a7===0x3){if('LMfVx'!==_0x544011('0x7e4')){function _0xee97c5(){const _0x36ae8b=_0x544011;this[_0x36ae8b('0x714')]()?_0x2ae0e7[_0x36ae8b('0x684')][_0x36ae8b('0x64b')][_0x36ae8b('0x3a')](_0x3859a0):(this[_0x36ae8b('0x1b7')]()[_0x36ae8b('0x284')](_0x6babfc),this['_damages'][_0x36ae8b('0x409')](_0x258744),_0x312768[_0x36ae8b('0x3ab')]());}}else this[_0x544011('0x691')]('dead');}else{if(_0x1ac8a7===0x2)this['startMotion'](_0x544011('0xdf'));else{if(_0x5c2082[_0x544011('0x2b0')]())this[_0x544011('0x691')]('chant');else{if(_0x5c2082[_0x544011('0x148')]()||_0x5c2082[_0x544011('0x45b')]())this['startMotion'](_0x544011('0x4e2'));else{if(_0x1ac8a7===0x1)this[_0x544011('0x691')](_0x544011('0x886'));else{if(_0x5c2082[_0x544011('0x4b8')]()){if(_0x544011('0x59b')!=='zYuFS'){function _0x4d8e86(){_0x46629c=(_0x4303fd+_0x544bec)/0x2,_0x26eca4=-0x1;}}else this[_0x544011('0x691')](_0x544011('0x138'));}else _0x5c2082[_0x544011('0x318')]()?this['startMotion'](_0x544011('0x462')):this[_0x544011('0x691')](_0x5c2082[_0x544011('0x7fa')]()[_0x544011('0x825')]||_0x544011('0x462'));}}}}}}}},Sprite_SvEnemy[_0x3219af('0x3b5')]['inHomePosition']=function(){const _0x3688aa=_0x3219af;if(this[_0x3688aa('0x19a')]){if('msIxi'!==_0x3688aa('0x236')){function _0x34b9a5(){const _0x2cf01a=_0x3688aa;if(_0x4108fd[_0x2cf01a('0x43f')]())return'TPB';return _0x2cf01a('0x7c9');}}else return this['parent'][_0x3688aa('0x7da')]===0x0&&this[_0x3688aa('0x19a')]['_offsetY']===0x0;}else{if(_0x3688aa('0x29d')!=='yhGoZ')return!![];else{function _0x3845be(){const _0x5ad5f2=_0x3688aa,_0x55d0ee=_0x26c73b(_0x3ddd15['$1'])[_0x5ad5f2('0x4ee')](/[\r\n]+/)['remove']('');_0x43a8a5[_0x5ad5f2('0x99')]=_0x194233[_0x5ad5f2('0x786')](_0x55d0ee);}}}},Sprite_SvEnemy[_0x3219af('0x3b5')][_0x3219af('0x12e')]=function(){},Sprite_Damage[_0x3219af('0x3b5')][_0x3219af('0x19c')]=function(_0x59807e){const _0x4c14cd=_0x3219af,_0x546ce0=_0x59807e[_0x4c14cd('0x3b8')]()||_0x59807e['result']();if(_0x546ce0[_0x4c14cd('0x804')]||_0x546ce0[_0x4c14cd('0x7ca')]){if(_0x4c14cd('0x4dc')!==_0x4c14cd('0x4dc')){function _0x2f06ea(){const _0x43612b=_0x4c14cd;if(_0x2f118e[_0x43612b('0x43f')]()&&this[_0x43612b('0x8b')]===_0x43612b('0x498'))return this[_0x43612b('0x188')]()?this[_0x43612b('0x664')]()&&this['currentAction']()[_0x43612b('0x259')]()&&!this[_0x43612b('0x664')]()[_0x43612b('0x127')]():this[_0x43612b('0x664')]()&&this['currentAction']()['item']()&&!this[_0x43612b('0x664')]()[_0x43612b('0x4e4')]();return![];}}else this[_0x4c14cd('0x2c0')]=0x0,this[_0x4c14cd('0x74d')]();}else{if(_0x546ce0['hpAffected'])this[_0x4c14cd('0x2c0')]=_0x546ce0[_0x4c14cd('0x58d')]>=0x0?0x0:0x1,this[_0x4c14cd('0x2ff')](_0x546ce0[_0x4c14cd('0x58d')]);else{if(_0x59807e['isAlive']()&&_0x546ce0[_0x4c14cd('0x5fe')]!==0x0){if('oOFeh'!==_0x4c14cd('0x4e9'))this[_0x4c14cd('0x2c0')]=_0x546ce0[_0x4c14cd('0x5fe')]>=0x0?0x2:0x3,this[_0x4c14cd('0x2ff')](_0x546ce0['mpDamage']);else{function _0x3450e5(){const _0xcda613=_0x4c14cd;if(!_0x5abb35['isPhysical']())return![];if(!_0x1c9f76[_0xcda613('0x736')]())return![];if(!_0x592e87[_0xcda613('0x48a')]())return![];return _0x5da75c[_0xcda613('0x1e6')][_0xcda613('0x885')]['ActionSequence'][_0xcda613('0x389')];}}}}}_0x546ce0[_0x4c14cd('0x201')]&&this['setupCriticalEffect']();},Sprite_Damage[_0x3219af('0x3b5')][_0x3219af('0x7ea')]=function(_0x47e1d8){},Sprite_Damage[_0x3219af('0x3b5')][_0x3219af('0x2ff')]=function(_0x14b33c){const _0x4ae9a6=_0x3219af;let _0x2b2378=this[_0x4ae9a6('0x291')](_0x14b33c);const _0x2deeb8=this[_0x4ae9a6('0x1a0')](),_0x4e6323=Math[_0x4ae9a6('0x42a')](_0x2deeb8*0.75);for(let _0x25199f=0x0;_0x25199f<_0x2b2378[_0x4ae9a6('0x2da')];_0x25199f++){const _0x48a209=this[_0x4ae9a6('0x102')](_0x4e6323,_0x2deeb8);_0x48a209[_0x4ae9a6('0x601')][_0x4ae9a6('0x23f')](_0x2b2378[_0x25199f],0x0,0x0,_0x4e6323,_0x2deeb8,_0x4ae9a6('0x834')),_0x48a209['x']=(_0x25199f-(_0x2b2378[_0x4ae9a6('0x2da')]-0x1)/0x2)*_0x4e6323,_0x48a209['dy']=-_0x25199f;}},Sprite_Damage[_0x3219af('0x3b5')][_0x3219af('0x291')]=function(_0x45e63c){const _0x43c7d=_0x3219af;let _0xbebc2e=Math['abs'](_0x45e63c)[_0x43c7d('0x302')]();this['useDigitGrouping']()&&(_0xbebc2e=VisuMZ[_0x43c7d('0x6fa')](_0xbebc2e));const _0x2eb844=VisuMZ[_0x43c7d('0x1e6')]['Settings'][_0x43c7d('0x4e0')];let _0x5c43cc='',_0x39640b='';switch(this[_0x43c7d('0x2c0')]){case 0x0:_0x5c43cc=_0x2eb844[_0x43c7d('0x3a6')]||_0x43c7d('0x70a'),_0x39640b=TextManager['hp'];if(_0x45e63c===0x0)_0x5c43cc='%1';break;case 0x1:_0x5c43cc=_0x2eb844[_0x43c7d('0x7eb')]||'+%1',_0x39640b=TextManager['hp'];break;case 0x2:_0x5c43cc=_0x2eb844[_0x43c7d('0x810')]||_0x43c7d('0x831'),_0x39640b=TextManager['mp'];break;case 0x3:_0x5c43cc=_0x2eb844['mpHealingFmt']||'+%1\x20MP',_0x39640b=TextManager['mp'];break;}return _0x5c43cc[_0x43c7d('0x796')](_0xbebc2e,_0x39640b)[_0x43c7d('0x580')]();},Sprite_Damage[_0x3219af('0x3b5')][_0x3219af('0x2bb')]=function(){const _0x2c284b=_0x3219af;return Imported[_0x2c284b('0x268')]?VisuMZ['CoreEngine'][_0x2c284b('0x885')][_0x2c284b('0x3f2')][_0x2c284b('0x53b')]:![];},Sprite_Damage[_0x3219af('0x3b5')][_0x3219af('0xf3')]=function(){const _0x3382c8=_0x3219af,_0xadf9eb=VisuMZ[_0x3382c8('0x1e6')][_0x3382c8('0x885')][_0x3382c8('0x4e0')];this[_0x3382c8('0x1b5')]=_0xadf9eb[_0x3382c8('0x7f0')]['slice'](0x0),this[_0x3382c8('0x3f')]=_0xadf9eb['CriticalDuration'];},Sprite_Damage[_0x3219af('0x3b5')]['setupTextPopup']=function(_0x2fda97,_0x3fe3f7){const _0x297a4b=_0x3219af;this['_flashColor']=_0x3fe3f7[_0x297a4b('0xc8')]||[0x0,0x0,0x0,0x0],this[_0x297a4b('0x1b5')]=JsonEx[_0x297a4b('0x2f8')](this['_flashColor']),this['_flashDuration']=_0x3fe3f7[_0x297a4b('0x61e')]||0x0;const _0x342a8f=this[_0x297a4b('0x1a0')](),_0x47c0cc=Math[_0x297a4b('0x42a')](_0x342a8f*0x1e),_0x2cddb0=this[_0x297a4b('0x102')](_0x47c0cc,_0x342a8f);_0x2cddb0[_0x297a4b('0x601')]['textColor']=ColorManager['getColor'](_0x3fe3f7['textColor']),_0x2cddb0[_0x297a4b('0x601')][_0x297a4b('0x23f')](_0x2fda97,0x0,0x0,_0x47c0cc,_0x342a8f,'center'),_0x2cddb0['dy']=0x0;},Sprite_Damage[_0x3219af('0x3b5')][_0x3219af('0x860')]=function(_0x5bf5a1,_0x57c24c,_0xef9d8e){const _0xf199b5=_0x3219af,_0x4dd90a=Math['max'](this[_0xf199b5('0x1a0')](),ImageManager['iconHeight']),_0x541e6e=Math[_0xf199b5('0x42a')](_0x4dd90a*0x1e),_0x75385e=this[_0xf199b5('0x102')](_0x541e6e,_0x4dd90a),_0x433c77=ImageManager['iconWidth']/0x2,_0x20543e=_0x75385e[_0xf199b5('0x601')][_0xf199b5('0x118')](_0x57c24c+'\x20');_0x75385e[_0xf199b5('0x601')][_0xf199b5('0x414')]=ColorManager[_0xf199b5('0x2a')](_0xef9d8e[_0xf199b5('0x414')]),_0x75385e[_0xf199b5('0x601')][_0xf199b5('0x23f')](_0x57c24c,_0x433c77,0x0,_0x541e6e-_0x433c77,_0x4dd90a,_0xf199b5('0x834'));const _0x1927fa=Math[_0xf199b5('0x219')]((_0x4dd90a-ImageManager[_0xf199b5('0x6b7')])/0x2),_0x4f06bf=_0x541e6e/0x2-ImageManager[_0xf199b5('0x124')]-_0x20543e/0x2+_0x433c77/0x2,_0x56fd7a=ImageManager[_0xf199b5('0x702')]('IconSet'),_0x5e8d47=ImageManager[_0xf199b5('0x124')],_0x2d72c3=ImageManager['iconHeight'],_0x290e24=_0x5bf5a1%0x10*_0x5e8d47,_0x2347b7=Math[_0xf199b5('0x42a')](_0x5bf5a1/0x10)*_0x2d72c3;_0x75385e[_0xf199b5('0x601')][_0xf199b5('0x360')](_0x56fd7a,_0x290e24,_0x2347b7,_0x5e8d47,_0x2d72c3,_0x4f06bf,_0x1927fa),this[_0xf199b5('0x1b5')]=_0xef9d8e[_0xf199b5('0xc8')]||[0x0,0x0,0x0,0x0],this[_0xf199b5('0x1b5')]=JsonEx[_0xf199b5('0x2f8')](this[_0xf199b5('0x1b5')]),this[_0xf199b5('0x3f')]=_0xef9d8e[_0xf199b5('0x61e')]||0x0,_0x75385e['dy']=0x0;},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x5b8')]=Sprite_StateIcon[_0x3219af('0x3b5')][_0x3219af('0x1ab')],Sprite_StateIcon['prototype'][_0x3219af('0x1ab')]=function(){const _0x266a64=_0x3219af;VisuMZ[_0x266a64('0x1e6')][_0x266a64('0x5b8')][_0x266a64('0x448')](this),this[_0x266a64('0x117')]=this[_0x266a64('0x6f2')]>0x0?!![]:![];},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x820')]=Sprite_Weapon[_0x3219af('0x3b5')][_0x3219af('0x837')],Sprite_Weapon['prototype']['loadBitmap']=function(){const _0x1272fe=_0x3219af;VisuMZ[_0x1272fe('0x1e6')][_0x1272fe('0x820')][_0x1272fe('0x448')](this);if(this[_0x1272fe('0x601')]){if(_0x1272fe('0x422')===_0x1272fe('0x422'))this[_0x1272fe('0x601')][_0x1272fe('0x1fd')]=VisuMZ[_0x1272fe('0x1e6')][_0x1272fe('0x885')]['Actor'][_0x1272fe('0x7b3')];else{function _0x44c3b4(){const _0x30763f=_0x1272fe;for(const _0x1852c4 of _0x41ded8){const _0x23f70a=_0x5e2be8[0x0][_0x30763f('0x796')](_0x1852c4[0x0]),_0x3ed991=_0x3fe53a[0x1]['format'](_0x1852c4[0x1]),_0x40caa3=new _0x1475b8(_0x1175fc[_0x30763f('0x796')](_0x3ed991),'i');_0xcb5971[_0x23f70a]=_0x40caa3;}}}}};function Sprite_HpGauge(){const _0x1264b9=_0x3219af;this[_0x1264b9('0x54a')](...arguments);}Sprite_HpGauge['prototype']=Object['create'](Sprite_Gauge['prototype']),Sprite_HpGauge[_0x3219af('0x3b5')][_0x3219af('0x4ad')]=Sprite_HpGauge,Sprite_HpGauge[_0x3219af('0x3b5')][_0x3219af('0x54a')]=function(){const _0x49723a=_0x3219af;Sprite_Gauge[_0x49723a('0x3b5')][_0x49723a('0x54a')][_0x49723a('0x448')](this);},Sprite_HpGauge[_0x3219af('0x3b5')][_0x3219af('0x6e2')]=function(){return 0x0;},Sprite_HpGauge[_0x3219af('0x3b5')][_0x3219af('0x1be')]=function(){const _0x22a18c=_0x3219af;this[_0x22a18c('0x601')][_0x22a18c('0x20a')]();const _0x2df36f=this['currentValue']();!isNaN(_0x2df36f)&&this['drawGauge']();},Spriteset_Battle['prototype']['isFlipped']=function(){const _0x1a1b61=_0x3219af;if(!$gameSystem[_0x1a1b61('0x670')]())return![];return![];},Spriteset_Battle['prototype']['animationBaseDelay']=function(){return 0x0;},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x666')]=function(){return 0x0;},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x281')]=Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x443')],Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x443')]=function(){const _0x56f2ba=_0x3219af;VisuMZ['BattleCore'][_0x56f2ba('0x281')]['call'](this),this[_0x56f2ba('0x1e7')]();},VisuMZ[_0x3219af('0x1e6')]['Spriteset_Battle_update']=Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x789')],Spriteset_Battle[_0x3219af('0x3b5')]['update']=function(){const _0x4a9f72=_0x3219af;VisuMZ[_0x4a9f72('0x1e6')][_0x4a9f72('0x3d7')][_0x4a9f72('0x448')](this),this[_0x4a9f72('0x45e')]();},Spriteset_Battle['prototype'][_0x3219af('0x1e7')]=function(){const _0x640c80=_0x3219af;this[_0x640c80('0x151')]=new Weather(),this['_battleField']['addChild'](this[_0x640c80('0x151')]);},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x45e')]=function(){const _0x248009=_0x3219af;this[_0x248009('0x151')][_0x248009('0x667')]=$gameScreen['weatherType'](),this[_0x248009('0x151')]['power']=$gameScreen[_0x248009('0x6c2')]();},Game_Interpreter[_0x3219af('0x3b5')][_0x3219af('0x5e')]=function(_0x20e42d){const _0x2af1fa=_0x3219af;$gameScreen[_0x2af1fa('0x101')](_0x20e42d[0x0],_0x20e42d[0x1],_0x20e42d[0x2]);if(_0x20e42d[0x3])this['wait'](_0x20e42d[0x2]);return!![];},VisuMZ['BattleCore'][_0x3219af('0x3fd')]=Game_Interpreter[_0x3219af('0x3b5')][_0x3219af('0x6a0')],Game_Interpreter[_0x3219af('0x3b5')][_0x3219af('0x6a0')]=function(_0x3bfac7){const _0x3f9dc5=_0x3219af;if(SceneManager[_0x3f9dc5('0x40d')]()){if(_0x3f9dc5('0x7e')!==_0x3f9dc5('0x23'))return SceneManager[_0x3f9dc5('0x684')]['_spriteset'][_0x3f9dc5('0x280')](_0x3bfac7[0x0],_0x3bfac7[0x1]),!![];else{function _0x5a94d6(){const _0x59b0ca=_0x3f9dc5;this[_0x59b0ca('0xe9')]();}}}else return VisuMZ[_0x3f9dc5('0x1e6')]['Game_Interpreter_command283']['call'](this,_0x3bfac7);},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x196')]=function(_0x11b9cc,_0x450359){const _0x5cd310=_0x3219af;_0x11b9cc[_0x5cd310('0x601')]=_0x450359;},Spriteset_Battle['prototype'][_0x3219af('0x280')]=function(_0x280f0a,_0x5c724c){const _0x4229b0=_0x3219af;_0x280f0a=_0x280f0a||'',_0x5c724c=_0x5c724c||'';_0x280f0a===''&&_0x5c724c===''&&(_0x280f0a=this[_0x4229b0('0x63')][_0x4229b0('0xb5')](),_0x5c724c=this[_0x4229b0('0x27b')][_0x4229b0('0x499')]());const _0x4b08fb=ImageManager[_0x4229b0('0x38c')](_0x280f0a),_0x55359f=ImageManager[_0x4229b0('0x5c4')](_0x5c724c);_0x4b08fb[_0x4229b0('0xd7')](this[_0x4229b0('0x75f')][_0x4229b0('0x84b')](this,this['_back1Sprite'],this[_0x4229b0('0x27b')],_0x4b08fb,_0x55359f));},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x75f')]=function(_0xd4830f,_0x1417ee,_0x32c8a4,_0x1d63cc){const _0x36f4d5=_0x3219af;_0x1d63cc['addLoadListener'](this['updateBattlebackBitmap2'][_0x36f4d5('0x84b')](this,_0xd4830f,_0x1417ee,_0x32c8a4,_0x1d63cc));},Spriteset_Battle['prototype'][_0x3219af('0x4cc')]=function(_0x2b6424,_0x48dd50,_0x352ee6,_0x6bf0e1){const _0x156eeb=_0x3219af;_0x2b6424[_0x156eeb('0x601')]=_0x352ee6,_0x48dd50['bitmap']=_0x6bf0e1,_0x2b6424['adjustPosition'](),_0x48dd50['adjustPosition']();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0xe4')]=Spriteset_Battle[_0x3219af('0x3b5')]['createBattleField'],Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x544')]=function(){const _0x5622c6=_0x3219af;VisuMZ[_0x5622c6('0x1e6')][_0x5622c6('0xe4')][_0x5622c6('0x448')](this),this['createBattleFieldBattleCore']();},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x44')]=function(){const _0x2ae31e=_0x3219af;this[_0x2ae31e('0x2e4')](),this[_0x2ae31e('0xcd')](),this[_0x2ae31e('0x4f2')](),this[_0x2ae31e('0x487')]();},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x2e4')]=function(){const _0x2eee7a=_0x3219af;this['_battlerContainer']=new Sprite(),this[_0x2eee7a('0x6e0')][_0x2eee7a('0x2b6')](this[_0x2eee7a('0x237')]);},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0xcd')]=function(){const _0x13e863=_0x3219af;this[_0x13e863('0x65c')]=new Sprite(),this[_0x13e863('0x6e0')][_0x13e863('0x2b6')](this[_0x13e863('0x65c')]);},Spriteset_Battle['prototype']['createDamageContainer']=function(){const _0x493313=_0x3219af;this[_0x493313('0x180')]=new Sprite(),this['_damageContainer']['x']=this[_0x493313('0x6e0')]['x'],this[_0x493313('0x180')]['y']=this['_battleField']['y'],this[_0x493313('0x2b6')](this[_0x493313('0x180')]);},Spriteset_Battle[_0x3219af('0x3b5')]['adjustFlippedBattlefield']=function(){const _0x2ff737=_0x3219af;if(!this[_0x2ff737('0x7d7')]())return;this[_0x2ff737('0x237')]['scale']['x']=-0x1,this[_0x2ff737('0x237')]['x']=this[_0x2ff737('0x6e0')]['width'],this[_0x2ff737('0x65c')][_0x2ff737('0x495')]['x']=-0x1,this[_0x2ff737('0x65c')]['x']=this[_0x2ff737('0x6e0')][_0x2ff737('0x106')],this['_damageContainer'][_0x2ff737('0x495')]['x']=-0x1,this['_damageContainer']['x']=this['_battleField']['x']+this[_0x2ff737('0x6e0')][_0x2ff737('0x106')];},Spriteset_Battle[_0x3219af('0x3b5')]['createEnemies']=function(){const _0x202786=_0x3219af;if(Imported[_0x202786('0x268')]&&VisuMZ['CoreEngine'][_0x202786('0x885')]['UI'][_0x202786('0x1f9')]){if(_0x202786('0x4d1')!=='vvzky')this[_0x202786('0x209')]();else{function _0x3766d5(){const _0x39f1ca=_0x202786;this[_0x39f1ca('0x258')]=this[_0x39f1ca('0x290')](),this[_0x39f1ca('0x522')](),_0x3e0d28['prototype'][_0x39f1ca('0x869')][_0x39f1ca('0x448')](this);}}}const _0x2ecbd3=$gameTroop[_0x202786('0x850')](),_0x1c5ce6=[];for(const _0x1a5fe2 of _0x2ecbd3){_0x1c5ce6[_0x202786('0x453')](new Sprite_Enemy(_0x1a5fe2));}_0x1c5ce6[_0x202786('0x4d9')](this['compareEnemySprite'][_0x202786('0x84b')](this));for(const _0x87bf4f of _0x1c5ce6){this[_0x202786('0x237')][_0x202786('0x2b6')](_0x87bf4f);}this[_0x202786('0x1b1')]=_0x1c5ce6;},Spriteset_Battle['prototype'][_0x3219af('0x4b5')]=function(){const _0xfa32a8=_0x3219af;this['_actorSprites']=[];for(let _0x484e04=0x0;_0x484e04<$gameParty[_0xfa32a8('0x34')]();_0x484e04++){if(_0xfa32a8('0x11c')==='jvcsb'){const _0x4940af=$gameParty[_0xfa32a8('0x2c8')]()[_0x484e04],_0x1c8319=new Sprite_Actor();_0x4940af&&_0x4940af['canMove']()&&VisuMZ[_0xfa32a8('0x1e6')][_0xfa32a8('0x566')][_0xfa32a8('0x448')](_0x1c8319),_0x1c8319[_0xfa32a8('0x18f')](_0x4940af),this[_0xfa32a8('0x511')][_0xfa32a8('0x453')](_0x1c8319),this[_0xfa32a8('0x237')]['addChild'](_0x1c8319);}else{function _0xf4c045(){const _0x3cb6bf=_0xfa32a8,_0x5d3b55=_0x3bc62e[_0x3cb6bf('0x1e6')][_0x3cb6bf('0x885')][_0x3cb6bf('0x4e0')];this[_0x3cb6bf('0x1b5')]=_0x5d3b55[_0x3cb6bf('0x7f0')][_0x3cb6bf('0x5b2')](0x0),this[_0x3cb6bf('0x3f')]=_0x5d3b55[_0x3cb6bf('0x765')];}}}},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x745')]=function(_0x1aab7f,_0x3c96c8,_0x49e849,_0x4a58b9){const _0x46609a=_0x3219af,_0x38ea15=this[_0x46609a('0xaa')](_0x3c96c8),_0x4ccc3f=new(_0x38ea15?Sprite_AnimationMV:Sprite_Animation)(),_0x31fe0f=this['makeTargetSprites'](_0x1aab7f);this['animationShouldMirror'](_0x1aab7f[0x0])&&(_0x49e849=!_0x49e849),_0x4ccc3f[_0x46609a('0x214')]=_0x1aab7f,_0x4ccc3f[_0x46609a('0x7ea')](_0x31fe0f,_0x3c96c8,_0x49e849,_0x4a58b9),this['addAnimationSpriteToContainer'](_0x4ccc3f);},Spriteset_Battle[_0x3219af('0x3b5')]['addAnimationSpriteToContainer']=function(_0x17deaa){const _0x5a9193=_0x3219af;if(this['isAnimationShownOnBattlePortrait'](_0x17deaa)){if(_0x5a9193('0x277')===_0x5a9193('0x277'))this[_0x5a9193('0x734')]()['addChild'](_0x17deaa);else{function _0x410cbf(){const _0x3c6f60=_0x5a9193;_0x533a0e[_0x3c6f60('0x1e6')][_0x3c6f60('0x885')][_0x3c6f60('0x500')]['AddOption']&&(this[_0x3c6f60('0x305')](),this['addBattleCoreAutoBattleStyleCommand']());}}}else this[_0x5a9193('0x65c')]['addChild'](_0x17deaa);this[_0x5a9193('0x71a')]['push'](_0x17deaa);},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x131')]=function(_0x42e1de){const _0x50fac6=_0x3219af;if(!_0x42e1de)return![];if(!_0x42e1de[_0x50fac6('0x361')])return![];if(_0x42e1de[_0x50fac6('0x361')][_0x50fac6('0x72')]!==0x0)return![];if(!_0x42e1de[_0x50fac6('0x214')][0x0])return![];if(!_0x42e1de[_0x50fac6('0x214')][0x0][_0x50fac6('0x857')]())return![];if($gameSystem['isSideView']())return![];if(!this[_0x50fac6('0x734')]())return![];return Window_BattleStatus['prototype'][_0x50fac6('0x72a')]()==='portrait';},Spriteset_Battle['prototype']['battleStatusWindowAnimationContainer']=function(){const _0x12760a=_0x3219af;if(!SceneManager[_0x12760a('0x684')])return;if(!SceneManager[_0x12760a('0x684')][_0x12760a('0x64b')])return;if(!SceneManager[_0x12760a('0x684')][_0x12760a('0x64b')][_0x12760a('0x94')])return;return SceneManager[_0x12760a('0x684')][_0x12760a('0x64b')]['_effectsContainer'];},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x70c')]=function(_0x1fdf97){const _0x463211=_0x3219af;this[_0x463211('0x323')](_0x1fdf97);for(const _0x67f453 of _0x1fdf97[_0x463211('0x214')]){if(_0x67f453['endAnimation']){if(_0x463211('0x18e')==='tGUuG'){function _0x3927e7(){const _0x504859=_0x463211;if(!_0x54f69a[_0x504859('0x40d')]())return;_0x2e923c[_0x504859('0x371')](_0x57415e,_0x85815b);const _0x1495e5=_0x2eb8fa[_0x504859('0xdc')](),_0x342ac3=_0x44d297[_0x504859('0x31a')],_0x26a266=_0x4e43d2[_0x504859('0x1da')](_0xb6098c[_0x504859('0x7f6')]),_0x424bca=_0x5848f2[_0x504859('0x4a2')],_0x114283=_0x1183ec[_0x504859('0x3f6')];if(!_0x1495e5||!_0x342ac3)return;const _0x3d0438=_0x342ac3['attackAnimationId1']();_0x52e978['requestAnimation'](_0x26a266,_0x3d0438,_0x424bca),_0x4a0645[_0x504859('0x672')]&&_0x1495e5[_0x504859('0x1bb')](_0x504859('0x4f1'));}}else _0x67f453[_0x463211('0x4cf')]();}}_0x1fdf97[_0x463211('0x3ab')]();},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x323')]=function(_0x4a6464){const _0x572cbd=_0x3219af;this['_animationSprites'][_0x572cbd('0x409')](_0x4a6464),this['isAnimationShownOnBattlePortrait'](_0x4a6464)?this[_0x572cbd('0x734')]()[_0x572cbd('0x284')](_0x4a6464):this[_0x572cbd('0x65c')][_0x572cbd('0x284')](_0x4a6464);},VisuMZ['BattleCore']['Spriteset_Battle_updateActors']=Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x4ef')],Spriteset_Battle['prototype'][_0x3219af('0x4ef')]=function(){const _0x29991e=_0x3219af;VisuMZ[_0x29991e('0x1e6')][_0x29991e('0x1b8')][_0x29991e('0x448')](this),this['updateBattlerContainer']();},Spriteset_Battle['prototype'][_0x3219af('0x4d7')]=function(){this['_battlerContainer']['children']['sort'](this['compareBattlerSprites']['bind'](this)),this['putActiveBattlerOnTop']();},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x835')]=function(_0x40507d,_0x6da34f){const _0x4a7e73=_0x3219af;if(VisuMZ[_0x4a7e73('0x1e6')]['Settings'][_0x4a7e73('0x2b2')][_0x4a7e73('0x743')]){if(_0x4a7e73('0x514')==='iDQZK'){function _0x49f091(){const _0x5cc570=_0x4a7e73;return _0x140acd=_0x4f7df2[_0x5cc570('0x1e6')][_0x5cc570('0x885')][_0x5cc570('0x4e0')][_0x5cc570('0x288')][_0x5cc570('0x448')](this,_0x323ec6),_0x5d015d=this['_multipliers'][_0x5cc570('0x447')]*_0x49b211+this[_0x5cc570('0x827')][_0x5cc570('0x618')],_0x53da32;}}else{if(_0x40507d[_0x4a7e73('0x27c')]&&_0x6da34f[_0x4a7e73('0x27c')]){if(_0x4a7e73('0x49b')!=='kwoQL'){function _0x14ff33(){return 0x0;}}else{if(_0x40507d[_0x4a7e73('0x27c')]['isActor']()&&_0x6da34f[_0x4a7e73('0x27c')][_0x4a7e73('0xf9')]())return 0x1;else{if(_0x6da34f[_0x4a7e73('0x27c')][_0x4a7e73('0x857')]()&&_0x40507d[_0x4a7e73('0x27c')][_0x4a7e73('0xf9')]())return-0x1;}}}}}return _0x40507d[_0x4a7e73('0x833')]!==_0x6da34f[_0x4a7e73('0x833')]?_0x40507d[_0x4a7e73('0x833')]-_0x6da34f['_baseY']:_0x6da34f[_0x4a7e73('0x3c2')]-_0x40507d[_0x4a7e73('0x3c2')];},Spriteset_Battle['prototype'][_0x3219af('0x26b')]=function(){const _0x4673ed=_0x3219af;if(!VisuMZ[_0x4673ed('0x1e6')][_0x4673ed('0x885')][_0x4673ed('0x2b2')][_0x4673ed('0x63d')])return;const _0x12cd8b=BattleManager[_0x4673ed('0x31a')];if(_0x12cd8b){if(_0x12cd8b[_0x4673ed('0x857')]()&&!$gameSystem[_0x4673ed('0x670')]())return;const _0x27effe=_0x12cd8b[_0x4673ed('0x53f')]();if(_0x27effe&&_0x12cd8b['isActor']())this[_0x4673ed('0x237')][_0x4673ed('0x2b6')](_0x27effe);}},Spriteset_Battle['prototype'][_0x3219af('0x158')]=function(){const _0x170f84=_0x3219af;for(const _0x2b9541 of $gameParty[_0x170f84('0x2fc')]()){if(_0x170f84('0x880')!=='kfRcE'){function _0xe9abaa(){!this['_logWindow']['isBusy']()&&this['endAction']();}}else{if(!_0x2b9541)continue;if(!_0x2b9541[_0x170f84('0x53f')]())continue;_0x2b9541['battler']()[_0x170f84('0x362')]=!![],_0x2b9541[_0x170f84('0x53f')]()[_0x170f84('0x368')]();}}},Spriteset_Battle['prototype']['isBusy']=function(){return![];},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x2d1')]=function(){const _0x4479de=_0x3219af;return this[_0x4479de('0x3b1')]()[_0x4479de('0x4ec')](_0x195a12=>_0x195a12['isFloating']());},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x7f1')]=function(){const _0x4df3c6=_0x3219af;return this[_0x4df3c6('0x3b1')]()['some'](_0x5c7820=>_0x5c7820[_0x4df3c6('0x873')]());},Spriteset_Battle['prototype'][_0x3219af('0x1dd')]=function(){const _0x6f7145=_0x3219af;return this[_0x6f7145('0x3b1')]()[_0x6f7145('0x4ec')](_0x1a680c=>_0x1a680c[_0x6f7145('0x15d')]());},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x2dd')]=function(){const _0x5ec9b6=_0x3219af;return this[_0x5ec9b6('0x3b1')]()[_0x5ec9b6('0x4ec')](_0x85012e=>_0x85012e[_0x5ec9b6('0x26f')]());},Spriteset_Battle[_0x3219af('0x3b5')][_0x3219af('0x308')]=function(){const _0x13e032=_0x3219af;return this[_0x13e032('0x3b1')]()[_0x13e032('0x4ec')](_0x23c867=>_0x23c867[_0x13e032('0x475')]());},Spriteset_Battle['prototype'][_0x3219af('0x41a')]=function(){const _0x498ce3=_0x3219af;return this[_0x498ce3('0x3b1')]()[_0x498ce3('0x4ec')](_0x59af47=>_0x59af47[_0x498ce3('0x175')]());},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x727')]=Window_ItemList[_0x3219af('0x3b5')][_0x3219af('0x1a1')],Window_ItemList[_0x3219af('0x3b5')][_0x3219af('0x1a1')]=function(){const _0x44374b=_0x3219af;if(SceneManager['isSceneBattle']()){if(SceneManager[_0x44374b('0x684')]['battleLayoutStyle']()==='border'){if(_0x44374b('0x1ef')!=='wJQPq'){function _0x100dc7(){const _0x304c57=_0x44374b,_0x1c61db=_0x16b030(_0x3239a6['$1']);this[_0x304c57('0x785')](_0x21b93b[_0x1c61db]);}}else return VisuMZ['BattleCore'][_0x44374b('0x885')][_0x44374b('0xc7')][_0x44374b('0x737')];}else{if('wfHCi'!==_0x44374b('0xfd'))return VisuMZ[_0x44374b('0x1e6')][_0x44374b('0x885')][_0x44374b('0xc7')][_0x44374b('0x437')];else{function _0x49c85d(){const _0x2bec3b=_0x44374b;this['_lines'][_0x2bec3b('0x453')](_0x2642a8),this[_0x2bec3b('0x869')](),this['callNextMethod']();}}}}else return VisuMZ['BattleCore'][_0x44374b('0x727')][_0x44374b('0x448')](this);},VisuMZ['BattleCore'][_0x3219af('0x3e8')]=Window_SkillList[_0x3219af('0x3b5')][_0x3219af('0x1a1')],Window_SkillList['prototype'][_0x3219af('0x1a1')]=function(){const _0x54d873=_0x3219af;return SceneManager[_0x54d873('0x40d')]()?SceneManager[_0x54d873('0x684')]['battleLayoutStyle']()===_0x54d873('0x216')?VisuMZ['BattleCore']['Settings']['BattleLayout'][_0x54d873('0x737')]:VisuMZ[_0x54d873('0x1e6')][_0x54d873('0x885')][_0x54d873('0xc7')]['SkillItemStandardCols']:VisuMZ['BattleCore'][_0x54d873('0x3e8')][_0x54d873('0x448')](this);},VisuMZ['BattleCore'][_0x3219af('0x7c3')]=Window_Options[_0x3219af('0x3b5')][_0x3219af('0x66f')],Window_Options[_0x3219af('0x3b5')][_0x3219af('0x66f')]=function(){const _0x38b641=_0x3219af;VisuMZ[_0x38b641('0x1e6')][_0x38b641('0x7c3')][_0x38b641('0x448')](this),this['addAutoBattleCommands'](),this[_0x38b641('0x6ab')]();},Window_Options[_0x3219af('0x3b5')][_0x3219af('0x609')]=function(){const _0x551a52=_0x3219af;if(VisuMZ['BattleCore'][_0x551a52('0x885')]['AutoBattle']['AddOption']){if(_0x551a52('0x177')!=='kcyYr'){function _0x5cacfc(){const _0x2bd268=_0x551a52,_0x195630=this[_0x2bd268('0x865')]();_0x110213=_0x195630[0x0]?_0x195630[0x0][_0x2bd268('0x5db')]:0x0;}}else this[_0x551a52('0x305')](),this['addBattleCoreAutoBattleStyleCommand']();}},Window_Options[_0x3219af('0x3b5')][_0x3219af('0x6ab')]=function(){const _0x3dad6c=_0x3219af;if(!VisuMZ[_0x3dad6c('0x1e6')]['Settings'][_0x3dad6c('0x68c')]['AddHpGaugeOption'])return;const _0x4d83cb=TextManager[_0x3dad6c('0x62c')],_0x140b8a=_0x3dad6c('0x62c');this[_0x3dad6c('0x3b0')](_0x4d83cb,_0x140b8a);},Window_Options[_0x3219af('0x3b5')][_0x3219af('0x305')]=function(){const _0x2c74ad=_0x3219af,_0x280dda=TextManager[_0x2c74ad('0x5f1')],_0x4ded54='autoBattleAtStart';this[_0x2c74ad('0x3b0')](_0x280dda,_0x4ded54);},Window_Options[_0x3219af('0x3b5')][_0x3219af('0xac')]=function(){const _0x1bb960=_0x3219af,_0x21a483=TextManager[_0x1bb960('0xa1')],_0x57f2eb=_0x1bb960('0x42b');this[_0x1bb960('0x3b0')](_0x21a483,_0x57f2eb);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x71c')]=Window_Options[_0x3219af('0x3b5')][_0x3219af('0x84d')],Window_Options[_0x3219af('0x3b5')][_0x3219af('0x84d')]=function(_0x310cbe){const _0x3e6517=_0x3219af,_0x2bebe2=this[_0x3e6517('0x15b')](_0x310cbe);if(_0x2bebe2===_0x3e6517('0x42b')){if(_0x3e6517('0x2c3')===_0x3e6517('0x503')){function _0x4a2062(){const _0x10f080=_0x3e6517;this['opacity']=this[_0x10f080('0x31e')];}}else return this[_0x3e6517('0x27d')]();}else return VisuMZ['BattleCore'][_0x3e6517('0x71c')][_0x3e6517('0x448')](this,_0x310cbe);},Window_Options[_0x3219af('0x3b5')][_0x3219af('0x27d')]=function(){const _0x56c02e=_0x3219af,_0x332a42=VisuMZ[_0x56c02e('0x1e6')][_0x56c02e('0x885')][_0x56c02e('0x500')],_0x51e4a3=this['getConfigValue'](_0x56c02e('0x42b'));return _0x51e4a3?_0x332a42[_0x56c02e('0x720')]:_0x332a42[_0x56c02e('0x6a9')];},Window_ShopStatus[_0x3219af('0x3b5')]['getItemDamageAmountLabelBattleCore']=function(){const _0x4d0923=_0x3219af,_0x3d8337=DataManager[_0x4d0923('0x863')](this[_0x4d0923('0x1d3')]),_0x210664=VisuMZ[_0x4d0923('0x1fe')][_0x3d8337];if(!_0x210664)return this[_0x4d0923('0x226')]();const _0x2953df=_0x4d0923('0x440')[_0x4d0923('0x796')](this[_0x4d0923('0x1d3')][_0x4d0923('0x5e1')][_0x4d0923('0x667')]),_0x547f15=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x4d0923('0x1d3')][_0x4d0923('0x5e1')][_0x4d0923('0x667')]];return _0x210664[_0x2953df][_0x4d0923('0x796')](_0x547f15);},Window_ShopStatus['prototype'][_0x3219af('0x51e')]=function(){const _0x24e568=_0x3219af,_0x445438=DataManager['getDamageStyle'](this[_0x24e568('0x1d3')]),_0x275726=VisuMZ[_0x24e568('0x1fe')][_0x445438];if(!_0x275726)return this[_0x24e568('0xe6')]();return _0x275726[_0x24e568('0x328')][_0x24e568('0x448')](this);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x891')]=Window_PartyCommand[_0x3219af('0x3b5')]['initialize'],Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x54a')]=function(_0x5d81fa){const _0x43a7bb=_0x3219af;VisuMZ[_0x43a7bb('0x1e6')][_0x43a7bb('0x891')][_0x43a7bb('0x448')](this,_0x5d81fa),this[_0x43a7bb('0x3af')](_0x5d81fa);},Window_PartyCommand['prototype'][_0x3219af('0x3af')]=function(_0x5560a8){const _0xa9ab05=_0x3219af,_0x354d78=new Rectangle(0x0,0x0,_0x5560a8[_0xa9ab05('0x106')],_0x5560a8['height']);this[_0xa9ab05('0x39c')]=new Window_Base(_0x354d78),this['_commandNameWindow']['opacity']=0x0,this[_0xa9ab05('0x2b6')](this[_0xa9ab05('0x39c')]),this[_0xa9ab05('0x1ed')]();},Window_PartyCommand[_0x3219af('0x3b5')]['callUpdateHelp']=function(){const _0x2f756a=_0x3219af;Window_Command[_0x2f756a('0x3b5')][_0x2f756a('0x435')][_0x2f756a('0x448')](this);if(this[_0x2f756a('0x39c')])this['updateCommandNameWindow']();},Window_PartyCommand[_0x3219af('0x3b5')]['updateCommandNameWindow']=function(){const _0x41af50=_0x3219af,_0x37bc20=this[_0x41af50('0x39c')];_0x37bc20[_0x41af50('0x81d')][_0x41af50('0x20a')]();const _0x57873e=this['commandStyleCheck'](this[_0x41af50('0x3f5')]());if(_0x57873e===_0x41af50('0x74a')&&this[_0x41af50('0x7f9')]()>0x0){if(_0x41af50('0x4b6')!==_0x41af50('0x4b6')){function _0x127295(){_0x2c4e69+=_0x4e2069(_0x22fc66['$1'])/0x64;}}else{const _0x1631bf=this['itemLineRect'](this[_0x41af50('0x3f5')]());let _0x5d6a52=this['commandName'](this[_0x41af50('0x3f5')]());_0x5d6a52=_0x5d6a52['replace'](/\\I\[(\d+)\]/gi,''),_0x37bc20[_0x41af50('0x1d5')](),this[_0x41af50('0xdb')](_0x5d6a52,_0x1631bf),this['commandNameWindowDrawText'](_0x5d6a52,_0x1631bf),this[_0x41af50('0x56f')](_0x5d6a52,_0x1631bf);}}},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0xdb')]=function(_0x37eebf,_0x15edb0){},Window_PartyCommand['prototype'][_0x3219af('0x68f')]=function(_0x18cdac,_0x428aea){const _0x1a9517=_0x3219af,_0x5db7d6=this['_commandNameWindow'];_0x5db7d6[_0x1a9517('0x23f')](_0x18cdac,0x0,_0x428aea['y'],_0x5db7d6[_0x1a9517('0x442')],_0x1a9517('0x834'));},Window_PartyCommand[_0x3219af('0x3b5')]['commandNameWindowCenter']=function(_0x5d837f,_0x57a044){const _0x176aec=_0x3219af,_0x5b6de9=this[_0x176aec('0x39c')],_0x25afd5=$gameSystem[_0x176aec('0x824')](),_0x38f3c3=_0x57a044['x']+Math[_0x176aec('0x42a')](_0x57a044[_0x176aec('0x106')]/0x2)+_0x25afd5;_0x5b6de9['x']=_0x5b6de9[_0x176aec('0x106')]/-0x2+_0x38f3c3,_0x5b6de9['y']=Math[_0x176aec('0x42a')](_0x57a044['height']/0x2);},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x897')]=function(){const _0x6dd997=_0x3219af;this[_0x6dd997('0x633')](),this[_0x6dd997('0x25')](),this[_0x6dd997('0x3f4')](),this[_0x6dd997('0x248')](),this['addEscapeCommand']();},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x633')]=function(){const _0x213861=_0x3219af,_0x2eba2c=this[_0x213861('0x211')](),_0xec950b=VisuMZ[_0x213861('0x1e6')]['Settings'][_0x213861('0x34c')][_0x213861('0x40e')],_0x49dc51=_0x2eba2c===_0x213861('0x7d3')?TextManager['fight']:_0x213861('0x69e')['format'](_0xec950b,TextManager[_0x213861('0x560')]),_0x3336ff=this['isFightCommandEnabled']();this[_0x213861('0x3b0')](_0x49dc51,'fight',_0x3336ff);},Window_PartyCommand[_0x3219af('0x3b5')]['isFightCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x25')]=function(){const _0x22dffc=_0x3219af;if(!this['isAutoBattleCommandAdded']())return;const _0x276aae=this[_0x22dffc('0x211')](),_0x2dc927=VisuMZ[_0x22dffc('0x1e6')][_0x22dffc('0x885')][_0x22dffc('0x34c')][_0x22dffc('0x7cb')],_0x421c22=_0x276aae==='text'?TextManager[_0x22dffc('0x53c')]:'\x5cI[%1]%2'[_0x22dffc('0x796')](_0x2dc927,TextManager['autoBattle']),_0x1fb7d=this['isAutoBattleCommandEnabled']();this[_0x22dffc('0x3b0')](_0x421c22,_0x22dffc('0x53c'),_0x1fb7d);},Window_PartyCommand[_0x3219af('0x3b5')]['isAutoBattleCommandAdded']=function(){const _0x45cc71=_0x3219af;return VisuMZ[_0x45cc71('0x1e6')]['Settings'][_0x45cc71('0x34c')][_0x45cc71('0x877')];},Window_PartyCommand[_0x3219af('0x3b5')]['isAutoBattleCommandEnabled']=function(){return!![];},Window_PartyCommand['prototype'][_0x3219af('0x3f4')]=function(){},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x248')]=function(){const _0x18f271=_0x3219af;if(!this[_0x18f271('0xb4')]())return;const _0x2abac3=this[_0x18f271('0x211')](),_0x53ad03=VisuMZ[_0x18f271('0x1e6')][_0x18f271('0x885')]['PartyCmd']['CmdIconOptions'],_0xf7ba57=_0x2abac3===_0x18f271('0x7d3')?TextManager[_0x18f271('0x67a')]:_0x18f271('0x69e')[_0x18f271('0x796')](_0x53ad03,TextManager[_0x18f271('0x67a')]),_0x216c49=this[_0x18f271('0x2ee')]();this[_0x18f271('0x3b0')](_0xf7ba57,_0x18f271('0x67a'),_0x216c49);},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0xb4')]=function(){const _0x58ed57=_0x3219af;return VisuMZ['BattleCore'][_0x58ed57('0x885')][_0x58ed57('0x34c')]['CommandAddOptions'];},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x2ee')]=function(){return!![];},Window_PartyCommand['prototype'][_0x3219af('0x385')]=function(){const _0x2ece69=_0x3219af,_0x5ea4b3=this[_0x2ece69('0x211')](),_0x14bd22=VisuMZ[_0x2ece69('0x1e6')]['Settings'][_0x2ece69('0x34c')][_0x2ece69('0x2be')],_0x629d0c=_0x5ea4b3===_0x2ece69('0x7d3')?TextManager['escape']:_0x2ece69('0x69e')[_0x2ece69('0x796')](_0x14bd22,TextManager[_0x2ece69('0x41f')]),_0x216aeb=this[_0x2ece69('0x1ba')]();this['addCommand'](_0x629d0c,'escape',_0x216aeb);},Window_PartyCommand[_0x3219af('0x3b5')]['isEscapeCommandEnabled']=function(){const _0x47272e=_0x3219af;return BattleManager[_0x47272e('0x44d')]();},Window_PartyCommand[_0x3219af('0x3b5')]['itemTextAlign']=function(){const _0x52f7aa=_0x3219af;return VisuMZ[_0x52f7aa('0x1e6')][_0x52f7aa('0x885')][_0x52f7aa('0x34c')][_0x52f7aa('0x4af')];},Window_PartyCommand[_0x3219af('0x3b5')]['drawItem']=function(_0x46a602){const _0x56ca46=_0x3219af,_0x1cacd8=this[_0x56ca46('0x50a')](_0x46a602);if(_0x1cacd8===_0x56ca46('0x22f'))this[_0x56ca46('0x7a9')](_0x46a602);else _0x1cacd8===_0x56ca46('0x74a')?this[_0x56ca46('0xe7')](_0x46a602):Window_Command[_0x56ca46('0x3b5')]['drawItem']['call'](this,_0x46a602);},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x211')]=function(){const _0x1c1bd3=_0x3219af;return VisuMZ[_0x1c1bd3('0x1e6')]['Settings'][_0x1c1bd3('0x34c')][_0x1c1bd3('0x5e3')];},Window_PartyCommand[_0x3219af('0x3b5')]['commandStyleCheck']=function(_0xc47169){const _0x159b53=_0x3219af;if(_0xc47169<0x0)return _0x159b53('0x7d3');const _0x8c71a9=this['commandStyle']();if(_0x8c71a9!==_0x159b53('0x15e')){if(_0x159b53('0x19f')===_0x159b53('0x5ee')){function _0x5c80ea(){const _0x3ce5a3=_0x159b53,_0x361d65=_0x50d40c[_0x3ce5a3('0x98')]('['+_0x41fbf4['$1'][_0x3ce5a3('0x6f1')](/\d+/g)+']');for(const _0x28cce0 of _0x361d65){if(!_0x997d80[_0x3ce5a3('0x524')](_0x28cce0))return![];}return!![];}}else return _0x8c71a9;}else{if(this[_0x159b53('0x7f9')]()>0x0){const _0x1c2517=this[_0x159b53('0x297')](_0xc47169);if(_0x1c2517[_0x159b53('0x6f1')](/\\I\[(\d+)\]/i)){if(_0x159b53('0x481')!==_0x159b53('0x481')){function _0x5e1755(){const _0x430744=_0x159b53;this[_0x430744('0x6bb')]=!![];const _0x3b1533=_0x3d7e40[_0x430744('0x1e6')][_0x430744('0x885')];if(this[_0x430744('0x4ad')]===_0xe03af8)_0x2f5bb4+=_0x3b1533['Actor'][_0x430744('0x470')]||0x0,_0x3bff76+=_0x3b1533[_0x430744('0x2b2')][_0x430744('0x44f')]||0x0;else this[_0x430744('0x4ad')]===_0x1bc1da&&(_0x1c13c3+=_0x3b1533[_0x430744('0x5ff')]['OffsetX']||0x0,_0x27cb8d+=_0x3b1533['Enemy'][_0x430744('0x44f')]||0x0);}}else{const _0xb99e2=this[_0x159b53('0x3c1')](_0xc47169),_0x209db2=this[_0x159b53('0x17f')](_0x1c2517)[_0x159b53('0x106')];return _0x209db2<=_0xb99e2[_0x159b53('0x106')]?_0x159b53('0x22f'):_0x159b53('0x74a');}}}}return _0x159b53('0x7d3');},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x7a9')]=function(_0x5815ab){const _0x143c4c=_0x3219af,_0x3420ff=this[_0x143c4c('0x3c1')](_0x5815ab),_0x3d1851=this[_0x143c4c('0x297')](_0x5815ab),_0x5156f2=this[_0x143c4c('0x17f')](_0x3d1851)[_0x143c4c('0x106')];this['changePaintOpacity'](this[_0x143c4c('0x3a1')](_0x5815ab));const _0xd6c0f1=this[_0x143c4c('0x21a')]();if(_0xd6c0f1===_0x143c4c('0x2e5'))this[_0x143c4c('0x767')](_0x3d1851,_0x3420ff['x']+_0x3420ff[_0x143c4c('0x106')]-_0x5156f2,_0x3420ff['y'],_0x5156f2);else{if(_0xd6c0f1===_0x143c4c('0x834')){if(_0x143c4c('0x65a')!=='tGIQc'){const _0x2f9cb5=_0x3420ff['x']+Math[_0x143c4c('0x42a')]((_0x3420ff[_0x143c4c('0x106')]-_0x5156f2)/0x2);this[_0x143c4c('0x767')](_0x3d1851,_0x2f9cb5,_0x3420ff['y'],_0x5156f2);}else{function _0x118a2d(){const _0x311883=_0x143c4c;return this[_0x311883('0x86d')]();}}}else this[_0x143c4c('0x767')](_0x3d1851,_0x3420ff['x'],_0x3420ff['y'],_0x5156f2);}},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0xe7')]=function(_0x3600c2){const _0x4b67d1=_0x3219af;this[_0x4b67d1('0x297')](_0x3600c2)[_0x4b67d1('0x6f1')](/\\I\[(\d+)\]/i);const _0x164d95=Number(RegExp['$1'])||0x0,_0x327bd6=this[_0x4b67d1('0x3c1')](_0x3600c2),_0x162557=_0x327bd6['x']+Math[_0x4b67d1('0x42a')]((_0x327bd6[_0x4b67d1('0x106')]-ImageManager[_0x4b67d1('0x124')])/0x2),_0x21c46b=_0x327bd6['y']+(_0x327bd6[_0x4b67d1('0x1e3')]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x164d95,_0x162557,_0x21c46b);},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x46')]=function(){},Window_PartyCommand[_0x3219af('0x3b5')][_0x3219af('0x5c3')]=function(){const _0x17c6e6=_0x3219af;Window_Command[_0x17c6e6('0x3b5')][_0x17c6e6('0x5c3')]['call'](this);const _0x170b74=this[_0x17c6e6('0x72a')]();if(_0x170b74===_0x17c6e6('0x216')){if('VtSlJ'===_0x17c6e6('0x508'))this[_0x17c6e6('0x59d')]();else{function _0x5e59ed(){const _0x4e54e5=_0x17c6e6,_0x15c854=_0xcca60[_0x4e54e5('0x1e6')][_0x4e54e5('0x885')][_0x4e54e5('0x5ff')];this[_0x4e54e5('0x723')]=_0x15c854[_0x4e54e5('0x5fd')],this[_0x4e54e5('0x3a7')]={};}}}},Window_PartyCommand['prototype']['battleLayoutStyle']=function(){const _0x36834a=_0x3219af;if(this[_0x36834a('0x5d5')])return this[_0x36834a('0x5d5')];return this['_battleLayoutStyle']=SceneManager[_0x36834a('0x684')][_0x36834a('0x72a')](),this[_0x36834a('0x5d5')];},Window_PartyCommand[_0x3219af('0x3b5')]['updateHelp']=function(){const _0xd0002c=_0x3219af,_0x1e89c4=VisuMZ[_0xd0002c('0x1e6')][_0xd0002c('0x885')][_0xd0002c('0x34c')],_0x4aece1=this[_0xd0002c('0x365')]();switch(_0x4aece1){case'fight':this[_0xd0002c('0x77c')][_0xd0002c('0x2b8')](_0x1e89c4[_0xd0002c('0x484')]);break;case _0xd0002c('0x53c'):this[_0xd0002c('0x77c')][_0xd0002c('0x2b8')](_0x1e89c4[_0xd0002c('0x3ca')]);break;case _0xd0002c('0x67a'):this[_0xd0002c('0x77c')][_0xd0002c('0x2b8')](_0x1e89c4[_0xd0002c('0x76a')]);break;case _0xd0002c('0x41f'):this[_0xd0002c('0x77c')]['setText'](_0x1e89c4[_0xd0002c('0x451')]);break;default:this[_0xd0002c('0x77c')][_0xd0002c('0x2b8')]('');break;}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x5f6')]=Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x54a')],Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x54a')]=function(_0x3fe1eb){const _0x34079c=_0x3219af;VisuMZ[_0x34079c('0x1e6')][_0x34079c('0x5f6')][_0x34079c('0x448')](this,_0x3fe1eb),this[_0x34079c('0x3af')](_0x3fe1eb);},Window_ActorCommand['prototype'][_0x3219af('0x3af')]=function(_0x9c7212){const _0x17e634=_0x3219af,_0x9a9171=new Rectangle(0x0,0x0,_0x9c7212[_0x17e634('0x106')],_0x9c7212[_0x17e634('0x1e3')]);this['_commandNameWindow']=new Window_Base(_0x9a9171),this[_0x17e634('0x39c')][_0x17e634('0x805')]=0x0,this['addChild'](this[_0x17e634('0x39c')]),this[_0x17e634('0x1ed')]();},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x435')]=function(){const _0x4bb2c0=_0x3219af;Window_Command[_0x4bb2c0('0x3b5')][_0x4bb2c0('0x435')][_0x4bb2c0('0x448')](this);if(this[_0x4bb2c0('0x39c')])this[_0x4bb2c0('0x1ed')]();},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x1ed')]=function(){const _0x5057d7=_0x3219af,_0x49f385=this[_0x5057d7('0x39c')];_0x49f385[_0x5057d7('0x81d')][_0x5057d7('0x20a')]();const _0x16a1f5=this[_0x5057d7('0x50a')](this['index']());if(_0x16a1f5===_0x5057d7('0x74a')&&this[_0x5057d7('0x7f9')]()>0x0){const _0x2472c1=this[_0x5057d7('0x3c1')](this['index']());let _0x725927=this['commandName'](this['index']());_0x725927=_0x725927[_0x5057d7('0x30e')](/\\I\[(\d+)\]/gi,''),_0x49f385[_0x5057d7('0x1d5')](),this[_0x5057d7('0xdb')](_0x725927,_0x2472c1),this[_0x5057d7('0x68f')](_0x725927,_0x2472c1),this['commandNameWindowCenter'](_0x725927,_0x2472c1);}},Window_ActorCommand[_0x3219af('0x3b5')]['commandNameWindowDrawBackground']=function(_0x548f78,_0x2a3110){},Window_ActorCommand[_0x3219af('0x3b5')]['commandNameWindowDrawText']=function(_0x17e5c4,_0x36ec06){const _0x1dc6d3=_0x3219af,_0x5d7cf6=this[_0x1dc6d3('0x39c')];_0x5d7cf6[_0x1dc6d3('0x23f')](_0x17e5c4,0x0,_0x36ec06['y'],_0x5d7cf6['innerWidth'],'center');},Window_ActorCommand[_0x3219af('0x3b5')]['commandNameWindowCenter']=function(_0x76f339,_0x82ae7b){const _0x922d11=_0x3219af,_0xde34a6=this[_0x922d11('0x39c')],_0x5a3ab3=$gameSystem[_0x922d11('0x824')](),_0x1b4ec5=_0x82ae7b['x']+Math['floor'](_0x82ae7b[_0x922d11('0x106')]/0x2)+_0x5a3ab3;_0xde34a6['x']=_0xde34a6['width']/-0x2+_0x1b4ec5,_0xde34a6['y']=Math[_0x922d11('0x42a')](_0x82ae7b[_0x922d11('0x1e3')]/0x2);},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x897')]=function(){const _0x36aa55=_0x3219af;if(!this[_0x36aa55('0x6f4')])return;const _0x575cf1=this['_actor'][_0x36aa55('0x615')]();for(const _0x36ae45 of _0x575cf1){if(_0x36aa55('0xf8')!==_0x36aa55('0xf8')){function _0x4e161a(){const _0x3317ad=_0x36aa55;this[_0x3317ad('0x453')](_0x3317ad('0x3d5')),this[_0x3317ad('0x453')]('pushBaseLine'),this[_0x3317ad('0x453')](_0x3317ad('0x380'),_0x356f69['format'](_0x3a2479[_0x3317ad('0x99')]())),this[_0x3317ad('0x453')]('wait');}}else this[_0x36aa55('0x82a')](_0x36ae45[_0x36aa55('0x7c2')]()[_0x36aa55('0x580')]());}},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x82a')]=function(_0x5840fa){const _0x5619d2=_0x3219af;if(_0x5840fa===_0x5619d2('0x3bd')){if(_0x5619d2('0x6a4')===_0x5619d2('0x4d4')){function _0x1d9b80(){const _0x3b4112=_0x5619d2;this[_0x3b4112('0x13e')]();}}else this[_0x5619d2('0x539')]();}[_0x5619d2('0x264'),_0x5619d2('0x474')][_0x5619d2('0x895')](_0x5840fa)&&this['addSkillCommands']();if(_0x5840fa===_0x5619d2('0x107')){if(_0x5619d2('0x2ad')===_0x5619d2('0x2ad'))this[_0x5619d2('0x18b')]();else{function _0x4db768(){const _0x301738=_0x5619d2;_0x3a150f['prototype'][_0x301738('0x789')][_0x301738('0x448')](this),this['updateVisibility'](),this[_0x301738('0x24b')]();}}}_0x5840fa===_0x5619d2('0x85e')&&this[_0x5619d2('0xcf')]();_0x5840fa===_0x5619d2('0x126')&&this['addEscapeCommand']();_0x5840fa==='AUTO\x20BATTLE'&&this[_0x5619d2('0x25')]();if(_0x5840fa['match'](/STYPE: (\d+)/i)){const _0x55553f=Number(RegExp['$1']);this['addSkillTypeCommand'](_0x55553f);}else{if(_0x5840fa[_0x5619d2('0x6f1')](/STYPE: (.*)/i)){const _0x38d244=DataManager['getStypeIdWithName'](RegExp['$1']);this[_0x5619d2('0x187')](_0x38d244);}}_0x5840fa===_0x5619d2('0x1c3')&&this[_0x5619d2('0x6c3')]();if(_0x5840fa[_0x5619d2('0x6f1')](/SKILL: (\d+)/i)){const _0x48fcb8=Number(RegExp['$1']);this[_0x5619d2('0x785')]($dataSkills[_0x48fcb8]);}else{if(_0x5840fa[_0x5619d2('0x6f1')](/SKILL: (.*)/i)){if(_0x5619d2('0x9e')!=='tofUm'){function _0x6d29a1(){const _0x3e10ee=_0x5619d2;this[_0x3e10ee('0x8a1')]()?delete _0x2cc7e1[_0x3e10ee('0x162')][_0x3e10ee('0x1a8')]:_0xa90aa5['setHandler']('cancel',this['actorCommandCancelTPB'][_0x3e10ee('0x84b')](this));}}else{const _0x135f90=DataManager[_0x5619d2('0x83e')](RegExp['$1']);this['addSingleSkillCommand']($dataSkills[_0x135f90]);}}}_0x5840fa===_0x5619d2('0x1e8')&&Imported['VisuMZ_2_PartySystem']&&this[_0x5619d2('0x60e')]();},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x539')]=function(){const _0x125ac0=_0x3219af,_0x2647ef=$dataSkills[this[_0x125ac0('0x6f4')][_0x125ac0('0x116')]()];if(!_0x2647ef)return;if(!this[_0x125ac0('0x429')](_0x2647ef))return;const _0x3589a1=this[_0x125ac0('0x211')](),_0x47391b=DataManager[_0x125ac0('0x2a9')](_0x2647ef),_0x124861=DataManager[_0x125ac0('0x39a')](_0x2647ef),_0x57eb0b=_0x3589a1===_0x125ac0('0x7d3')?_0x47391b:_0x125ac0('0x69e')['format'](_0x124861,_0x47391b);this[_0x125ac0('0x3b0')](_0x57eb0b,_0x125ac0('0x3c4'),this[_0x125ac0('0x6f4')][_0x125ac0('0x416')]());},Window_ActorCommand[_0x3219af('0x3b5')]['addGuardCommand']=function(){const _0x4508ae=_0x3219af,_0x3e8497=$dataSkills[this[_0x4508ae('0x6f4')][_0x4508ae('0x286')]()];if(!_0x3e8497)return;if(!this[_0x4508ae('0x429')](_0x3e8497))return;const _0x1f047b=this[_0x4508ae('0x211')](),_0x477388=DataManager[_0x4508ae('0x2a9')](_0x3e8497),_0x3a5b47=DataManager[_0x4508ae('0x39a')](_0x3e8497),_0xdc1b4c=_0x1f047b===_0x4508ae('0x7d3')?_0x477388:_0x4508ae('0x69e')['format'](_0x3a5b47,_0x477388);this['addCommand'](_0xdc1b4c,_0x4508ae('0x4e2'),this[_0x4508ae('0x6f4')][_0x4508ae('0x43e')]());},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0xcf')]=function(){const _0x2299ab=_0x3219af,_0x47fc28=this[_0x2299ab('0x211')](),_0x271d06=VisuMZ[_0x2299ab('0x1e6')]['Settings'][_0x2299ab('0x79b')][_0x2299ab('0x415')],_0x123ca6=_0x47fc28===_0x2299ab('0x7d3')?TextManager[_0x2299ab('0x259')]:'\x5cI[%1]%2'[_0x2299ab('0x796')](_0x271d06,TextManager[_0x2299ab('0x259')]),_0x53c528=this[_0x2299ab('0x800')]();this[_0x2299ab('0x3b0')](_0x123ca6,_0x2299ab('0x259'),_0x53c528);},Window_ActorCommand[_0x3219af('0x3b5')]['isItemCommandEnabled']=function(){const _0x5459ea=_0x3219af;return this['_actor']&&this[_0x5459ea('0x6f4')][_0x5459ea('0x6f9')]();},Window_ActorCommand['prototype'][_0x3219af('0x6b3')]=function(){const _0x43a592=_0x3219af,_0x4e35bb=this[_0x43a592('0x6f4')][_0x43a592('0x29')]();for(const _0x4d0500 of _0x4e35bb){if(_0x43a592('0x732')!==_0x43a592('0x37f'))this['addSkillTypeCommand'](_0x4d0500);else{function _0x4f5116(){const _0x6eb8e7=_0x43a592,_0x477b8a=_0x3179ca[_0x6eb8e7('0x6ec')]();_0x477b8a[_0x6eb8e7('0xc6')](this[_0x6eb8e7('0x402')][_0x6eb8e7('0x2e2')]()),this[_0x6eb8e7('0x7ec')]();}}}},Window_ActorCommand['prototype'][_0x3219af('0x187')]=function(_0x4c3d55){const _0x3ea79d=_0x3219af;let _0x1d7dee=$dataSystem[_0x3ea79d('0x29')][_0x4c3d55];if(!_0x1d7dee)return;let _0x57f6c2=_0x1d7dee;const _0x41df15=this[_0x3ea79d('0x211')]();if(_0x41df15===_0x3ea79d('0x7d3')){if(_0x3ea79d('0x9a')===_0x3ea79d('0x4fb')){function _0x14a7d6(){const _0x4620f2=_0x3ea79d;this[_0x4620f2('0x601')]['clear']();const _0x28e208=this['currentValue']();!_0xb84e0b(_0x28e208)&&this[_0x4620f2('0x65e')]();}}else _0x57f6c2=_0x57f6c2[_0x3ea79d('0x30e')](/\x1I\[(\d+)\]/gi,''),_0x57f6c2=_0x57f6c2['replace'](/\\I\[(\d+)\]/gi,'');}else{if(!_0x1d7dee[_0x3ea79d('0x6f1')](/\\I\[(\d+)\]/i)){if(_0x3ea79d('0x66c')!=='Fwatn'){const _0x39ea52=Imported['VisuMZ_1_SkillsStatesCore']?VisuMZ[_0x3ea79d('0xa')][_0x3ea79d('0x885')]['Skills']:VisuMZ[_0x3ea79d('0x1e6')]['Settings'][_0x3ea79d('0x79b')],_0x5545e3=$dataSystem[_0x3ea79d('0x504')]['includes'](_0x4c3d55),_0x434561=_0x5545e3?_0x39ea52[_0x3ea79d('0x17a')]:_0x39ea52[_0x3ea79d('0x60b')];_0x57f6c2=_0x3ea79d('0x69e')[_0x3ea79d('0x796')](_0x434561,_0x1d7dee);}else{function _0x5ec9db(){const _0x33bbac=_0x3ea79d;return _0x4fa619[_0x33bbac('0x533')];}}}}this[_0x3ea79d('0x3b0')](_0x57f6c2,_0x3ea79d('0x690'),!![],_0x4c3d55);},Window_ActorCommand['prototype'][_0x3219af('0x6c3')]=function(){const _0x3d733d=_0x3219af,_0x38074c=this[_0x3d733d('0x6f4')][_0x3d733d('0x29')](),_0x30aade=this[_0x3d733d('0x6f4')][_0x3d733d('0x507')]();for(const _0x4c4e9c of _0x30aade){if(_0x3d733d('0x78f')!==_0x3d733d('0x77d')){if(!_0x4c4e9c)continue;if(Imported['VisuMZ_1_SkillsStatesCore']){const _0x46c7ab=_0x38074c[_0x3d733d('0x686')](_0xc74f29=>DataManager[_0x3d733d('0x7ce')](_0x4c4e9c)[_0x3d733d('0x895')](_0xc74f29));if(_0x46c7ab[_0x3d733d('0x2da')]<=0x0)continue;}else{if(!_0x38074c[_0x3d733d('0x895')](_0x4c4e9c['stypeId'])){if(_0x3d733d('0x59')===_0x3d733d('0x59'))continue;else{function _0xc77b52(){const _0x2ff202=_0x3d733d;_0x89d694[_0x2ff202('0x1e6')]['Window_BattleLog_performEvasion'][_0x2ff202('0x448')](this,_0x4308b5),this[_0x2ff202('0x39f')]();}}}}this[_0x3d733d('0x785')](_0x4c4e9c);}else{function _0x277237(){const _0x49901c=_0x3d733d;return this[_0x49901c('0x3b1')]()[_0x49901c('0x4ec')](_0x5d6463=>_0x5d6463[_0x49901c('0x15d')]());}}}},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x785')]=function(_0x533a05){const _0x51c427=_0x3219af;if(!_0x533a05)return;if(!this[_0x51c427('0x429')](_0x533a05))return;const _0x58a4da=this[_0x51c427('0x211')](),_0x39866e=DataManager[_0x51c427('0x2a9')](_0x533a05),_0x3a93d8=DataManager['battleCommandIcon'](_0x533a05),_0x4ffa5f=_0x58a4da==='text'?_0x39866e:_0x51c427('0x69e')['format'](_0x3a93d8,_0x39866e),_0x31ae81=this[_0x51c427('0x6f4')][_0x51c427('0x57d')](_0x533a05);this[_0x51c427('0x3b0')](_0x4ffa5f,_0x51c427('0x4e3'),_0x31ae81,_0x533a05['id']);},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x429')]=function(_0x355ca2){const _0x53c779=_0x3219af,_0x59439c=_0x355ca2[_0x53c779('0x1e2')];if(_0x59439c['match'](/<COMMAND REQUIRE LEARN>/i)){if(_0x53c779('0x4f5')===_0x53c779('0x4f5')){if(!this[_0x53c779('0x6f4')][_0x53c779('0x6d8')](_0x355ca2['id']))return![];}else{function _0x262ff0(){const _0x28af44=_0x53c779,_0xc9ff0b=_0x4e757e[0x0][_0x28af44('0x796')](_0x37fbc2[0x0],_0x12f312[0x0]),_0x3174b0=_0x140c04[0x1][_0x28af44('0x796')](_0x234bd1[0x1],_0x5be5e8[0x1])['trim'](),_0x51f1ad=new _0x15b152(_0x1d1cfc[_0x28af44('0x796')](_0x3174b0),'i');_0x568057[_0xc9ff0b]=_0x51f1ad;}}}if(_0x59439c[_0x53c779('0x6f1')](/<COMMAND REQUIRE ACCESS>/i)){if('wxjOZ'==='FrQeR'){function _0x4f750f(){const _0x3289a8=_0x53c779;if(this[_0x3289a8('0x4ad')]!==_0x5cf3e0)return![];if(!_0x8023ce[_0x3289a8('0x40d')]())return![];return _0x56d7ee[_0x3289a8('0x1e6')][_0x3289a8('0x885')][_0x3289a8('0xc7')][_0x3289a8('0x645')];}}else{if(!this[_0x53c779('0x6f4')][_0x53c779('0x403')](_0x355ca2['id']))return![];}}const _0x2979a2=VisuMZ[_0x53c779('0x1e6')][_0x53c779('0x676')](_0x355ca2,_0x53c779('0x306'));if(VisuMZ['BattleCore']['JS'][_0x2979a2]){if(!VisuMZ[_0x53c779('0x1e6')]['JS'][_0x2979a2][_0x53c779('0x448')](this,this[_0x53c779('0x6f4')],_0x355ca2))return![];}return VisuMZ['BattleCore'][_0x53c779('0x405')](_0x355ca2);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x405')]=function(_0x1ad4d1){const _0x4b413a=_0x3219af,_0x4542e5=_0x1ad4d1['note'];if(_0x4542e5[_0x4b413a('0x6f1')](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5025fd=JSON[_0x4b413a('0x98')]('['+RegExp['$1'][_0x4b413a('0x6f1')](/\d+/g)+']');for(const _0x147a5e of _0x5025fd){if(_0x4b413a('0x467')===_0x4b413a('0x678')){function _0x169a1a(){return 0x0;}}else{if(!$gameSwitches['value'](_0x147a5e))return![];}}return!![];}if(_0x4542e5[_0x4b413a('0x6f1')](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x109434=JSON[_0x4b413a('0x98')]('['+RegExp['$1'][_0x4b413a('0x6f1')](/\d+/g)+']');for(const _0x3a0351 of _0x109434){if(!$gameSwitches['value'](_0x3a0351))return![];}return!![];}if(_0x4542e5[_0x4b413a('0x6f1')](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41bb20=JSON['parse']('['+RegExp['$1'][_0x4b413a('0x6f1')](/\d+/g)+']');for(const _0x32f0be of _0x41bb20){if($gameSwitches[_0x4b413a('0x524')](_0x32f0be))return!![];}return![];}if(_0x4542e5['match'](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20b8a9=JSON[_0x4b413a('0x98')]('['+RegExp['$1'][_0x4b413a('0x6f1')](/\d+/g)+']');for(const _0x13860c of _0x20b8a9){if(!$gameSwitches[_0x4b413a('0x524')](_0x13860c))return!![];}return![];}if(_0x4542e5[_0x4b413a('0x6f1')](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a4abd=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x308433 of _0x1a4abd){if(_0x4b413a('0x406')!=='Dmoem'){function _0x583bf4(){const _0x3589fb=_0x4b413a;return _0x32c230['opponentsUnit']()[_0x3589fb('0x2fc')]()['filter'](_0x9fc5d7=>_0x9fc5d7!==_0xa03a6c);}}else{if(!$gameSwitches[_0x4b413a('0x524')](_0x308433))return!![];}}return![];}if(_0x4542e5['match'](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4b413a('0x638')===_0x4b413a('0x72d')){function _0x3e9134(){const _0x3006fb=_0x4b413a;let _0x103441=_0x550563(_0x8e1bf7['$1']);while(_0x103441--){_0xeef62c[_0x3006fb('0x453')](this[_0x3006fb('0x29e')]()['trueRandomTarget']());}return this['repeatTargets'](_0xb830ba);}}else{const _0x2e2b2a=JSON['parse']('['+RegExp['$1'][_0x4b413a('0x6f1')](/\d+/g)+']');for(const _0x3f9a69 of _0x2e2b2a){if('dnuMa'!==_0x4b413a('0x2f5')){function _0x47c1ee(){_0x34ffb8-=_0x7ece45[_0x4859db];if(_0x2e8145<=0x0)return _0x37879c;}}else{if($gameSwitches['value'](_0x3f9a69))return![];}}return!![];}}return!![];},Window_ActorCommand['prototype'][_0x3219af('0x385')]=function(){const _0x28f2e5=_0x3219af,_0x26b2dd=this[_0x28f2e5('0x211')](),_0x8d5d09=VisuMZ[_0x28f2e5('0x1e6')]['Settings'][_0x28f2e5('0x34c')]['CmdIconEscape'],_0x43bcef=_0x26b2dd==='text'?TextManager[_0x28f2e5('0x41f')]:_0x28f2e5('0x69e')['format'](_0x8d5d09,TextManager[_0x28f2e5('0x41f')]),_0x1f11d9=this['isEscapeCommandEnabled']();this[_0x28f2e5('0x3b0')](_0x43bcef,_0x28f2e5('0x41f'),_0x1f11d9);},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x1ba')]=function(){const _0x7dbe9f=_0x3219af;return BattleManager[_0x7dbe9f('0x44d')]();},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x25')]=function(){const _0x1c5dec=_0x3219af,_0x59de26=this[_0x1c5dec('0x211')](),_0x40f19a=VisuMZ[_0x1c5dec('0x1e6')][_0x1c5dec('0x885')]['PartyCmd'][_0x1c5dec('0x7cb')],_0x47b37b=_0x59de26===_0x1c5dec('0x7d3')?TextManager[_0x1c5dec('0x53c')]:'\x5cI[%1]%2'[_0x1c5dec('0x796')](_0x40f19a,TextManager['autoBattle']),_0xfe4f87=this[_0x1c5dec('0x46a')]();this[_0x1c5dec('0x3b0')](_0x47b37b,_0x1c5dec('0x53c'),_0xfe4f87);},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x46a')]=function(){return!![];},Window_ActorCommand['prototype'][_0x3219af('0x21a')]=function(){const _0x42aaa1=_0x3219af;return VisuMZ[_0x42aaa1('0x1e6')][_0x42aaa1('0x885')][_0x42aaa1('0x79b')]['CmdTextAlign'];},Window_ActorCommand[_0x3219af('0x3b5')]['drawItem']=function(_0x2bca0f){const _0x2b3d46=_0x3219af,_0x477226=this[_0x2b3d46('0x50a')](_0x2bca0f);if(_0x477226==='iconText'){if('ERkVl'!==_0x2b3d46('0x146')){function _0xef6eac(){const _0x3c1a04=_0x2b3d46;this['x']=_0x583b6c[_0x3c1a04('0x5b4')]-this['enemy']()[_0x3c1a04('0x53f')]()[_0x3c1a04('0x5af')];}}else this[_0x2b3d46('0x7a9')](_0x2bca0f);}else{if(_0x477226==='icon'){if(_0x2b3d46('0x30b')==='zKiJT'){function _0x59567b(){const _0x584c37=_0x2b3d46;this[_0x584c37('0x471')]=!![];}}else this[_0x2b3d46('0xe7')](_0x2bca0f);}else{if('gPLOw'!==_0x2b3d46('0x28'))Window_Command[_0x2b3d46('0x3b5')]['drawItem']['call'](this,_0x2bca0f);else{function _0x264d04(){const _0x39ccf9=_0x2b3d46;for(const _0x21f490 of _0x58235f){for(const _0x5ec549 of _0x3f56dc){const _0x262fde=_0x471804[0x0][_0x39ccf9('0x796')](_0x5ec549[0x0],_0x21f490[0x0]),_0x476e1f=_0x37fbd0[0x1]['format'](_0x5ec549[0x1],_0x21f490[0x1])[_0x39ccf9('0x580')](),_0x2ee96a=new _0x2d38e2(_0x353b63['format'](_0x476e1f),'i');_0x307ff0[_0x262fde]=_0x2ee96a;}}}}}}this['drawSingleSkillCost'](_0x2bca0f);},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x211')]=function(){const _0xd60865=_0x3219af;return VisuMZ[_0xd60865('0x1e6')][_0xd60865('0x885')][_0xd60865('0x79b')][_0xd60865('0x5e3')];},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x50a')]=function(_0x48951b){const _0x16b54d=_0x3219af;if(_0x48951b<0x0)return'text';const _0x12cdc9=this['commandStyle']();if(_0x12cdc9!==_0x16b54d('0x15e'))return _0x12cdc9;else{if(this[_0x16b54d('0x7f9')]()>0x0){const _0x46498b=this['commandName'](_0x48951b);if(_0x46498b[_0x16b54d('0x6f1')](/\\I\[(\d+)\]/i)){if('qkkeE'!==_0x16b54d('0x572')){function _0x3bef68(){return!![];}}else{const _0x1691e1=this[_0x16b54d('0x3c1')](_0x48951b),_0x269ebd=this['textSizeEx'](_0x46498b)['width'];return _0x269ebd<=_0x1691e1[_0x16b54d('0x106')]?_0x16b54d('0x22f'):_0x16b54d('0x74a');}}}}return _0x16b54d('0x7d3');},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x7a9')]=function(_0x4f078e){const _0x21e0d1=_0x3219af,_0x594454=this[_0x21e0d1('0x3c1')](_0x4f078e),_0x50edc7=this['commandName'](_0x4f078e),_0xbdd50e=this['textSizeEx'](_0x50edc7)[_0x21e0d1('0x106')];this[_0x21e0d1('0xee')](this[_0x21e0d1('0x3a1')](_0x4f078e));const _0x3e978e=this['itemTextAlign']();if(_0x3e978e===_0x21e0d1('0x2e5'))this[_0x21e0d1('0x767')](_0x50edc7,_0x594454['x']+_0x594454[_0x21e0d1('0x106')]-_0xbdd50e,_0x594454['y'],_0xbdd50e);else{if(_0x3e978e===_0x21e0d1('0x834')){const _0x39c7d2=_0x594454['x']+Math[_0x21e0d1('0x42a')]((_0x594454['width']-_0xbdd50e)/0x2);this['drawTextEx'](_0x50edc7,_0x39c7d2,_0x594454['y'],_0xbdd50e);}else{if(_0x21e0d1('0x2cf')==='HWDJX'){function _0x48cd26(){const _0x4cd6c0=_0x21e0d1;if(_0xeeb5cd[_0x4cd6c0('0x857')]()&&!_0x5b1e03[_0x4cd6c0('0x670')]())return;const _0x3a9b52=_0x1bbabd[_0x4cd6c0('0x53f')]();if(_0x3a9b52&&_0x35115b[_0x4cd6c0('0x857')]())this['_battlerContainer']['addChild'](_0x3a9b52);}}else this[_0x21e0d1('0x767')](_0x50edc7,_0x594454['x'],_0x594454['y'],_0xbdd50e);}}},Window_ActorCommand[_0x3219af('0x3b5')]['drawItemStyleIcon']=function(_0x3bdb61){const _0x29e013=_0x3219af;this[_0x29e013('0x297')](_0x3bdb61)['match'](/\\I\[(\d+)\]/i);const _0x188cb4=Number(RegExp['$1'])||0x0,_0x2fa631=this[_0x29e013('0x3c1')](_0x3bdb61),_0xffb62b=_0x2fa631['x']+Math[_0x29e013('0x42a')]((_0x2fa631['width']-ImageManager[_0x29e013('0x124')])/0x2),_0x12b957=_0x2fa631['y']+(_0x2fa631[_0x29e013('0x1e3')]-ImageManager[_0x29e013('0x6b7')])/0x2;this[_0x29e013('0x868')](_0x188cb4,_0xffb62b,_0x12b957);},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x6ae')]=function(_0x5759b2){const _0x2b5cf5=_0x3219af,_0x487c4d=this['commandSymbol'](_0x5759b2);if(![_0x2b5cf5('0x3c4'),_0x2b5cf5('0x4e2'),_0x2b5cf5('0x4e3')][_0x2b5cf5('0x895')](_0x487c4d))return;const _0x42316e=this[_0x2b5cf5('0x3c1')](_0x5759b2);let _0x3867e1=null;if(_0x487c4d===_0x2b5cf5('0x3c4'))_0x3867e1=$dataSkills[this['_actor'][_0x2b5cf5('0x116')]()];else{if(_0x487c4d===_0x2b5cf5('0x4e2')){if(_0x2b5cf5('0x6a7')===_0x2b5cf5('0x7b')){function _0x13262a(){const _0x489eb2=_0x2b5cf5;if(this[_0x489eb2('0x512')][_0x489eb2('0x4ec')](_0x2b6001=>_0x2b6001[_0x489eb2('0x259')]()&&_0x2b6001[_0x489eb2('0x127')]()))return!![];}}else _0x3867e1=$dataSkills[this[_0x2b5cf5('0x6f4')][_0x2b5cf5('0x286')]()];}else _0x3867e1=$dataSkills[this[_0x2b5cf5('0x86b')][_0x5759b2][_0x2b5cf5('0x888')]];}this[_0x2b5cf5('0x39')](this[_0x2b5cf5('0x6f4')],_0x3867e1,_0x42316e['x'],_0x42316e['y'],_0x42316e[_0x2b5cf5('0x106')]);},Window_ActorCommand['prototype'][_0x3219af('0x39')]=function(_0x2b4e75,_0x2e782c,_0x28bc65,_0x16eba7,_0x25b131){const _0x2b84c0=_0x3219af;if(!_0x2e782c)return;if(Imported[_0x2b84c0('0x603')]){if(_0x2b84c0('0x136')===_0x2b84c0('0x2c5')){function _0x521cae(){const _0x4beb76=_0x2b84c0;return _0x50feed[_0x4beb76('0x21')]()[_0x4beb76('0x2fc')]()[_0x4beb76('0x686')](_0x7eccea=>_0x7eccea!==_0x2ae71c);}}else Window_Command[_0x2b84c0('0x3b5')][_0x2b84c0('0x39')][_0x2b84c0('0x448')](this,_0x2b4e75,_0x2e782c,_0x28bc65,_0x16eba7,_0x25b131);}else Window_SkillList[_0x2b84c0('0x3b5')]['drawSkillCost'][_0x2b84c0('0x448')](this,_0x2e782c,_0x28bc65,_0x16eba7,_0x25b131);},Window_ActorCommand['prototype'][_0x3219af('0x46')]=function(){},Window_ActorCommand[_0x3219af('0x3b5')]['activate']=function(){const _0x140e59=_0x3219af;Window_Command[_0x140e59('0x3b5')]['activate'][_0x140e59('0x448')](this);const _0x510611=this[_0x140e59('0x72a')]();_0x510611==='border'&&this['showHelpWindow']();},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x72a')]=function(){const _0x17c18f=_0x3219af;if(this[_0x17c18f('0x5d5')])return this[_0x17c18f('0x5d5')];return this['_battleLayoutStyle']=SceneManager[_0x17c18f('0x684')][_0x17c18f('0x72a')](),this[_0x17c18f('0x5d5')];},VisuMZ['BattleCore'][_0x3219af('0x623')]=Window_ActorCommand['prototype']['setup'],Window_ActorCommand['prototype']['setup']=function(_0x472757){const _0x370435=_0x3219af,_0x5ab5e5=this[_0x370435('0x72a')]();if(_0x472757&&['xp',_0x370435('0x82e')][_0x370435('0x895')](_0x5ab5e5))this[_0x370435('0x606')](_0x472757);else _0x472757&&[_0x370435('0x216')][_0x370435('0x895')](_0x5ab5e5)&&(this[_0x370435('0x1c6')](_0x472757),this[_0x370435('0x59d')]());VisuMZ[_0x370435('0x1e6')]['Window_ActorCommand_setup']['call'](this,_0x472757);if(_0x472757&&$gameTroop['aliveMembers']()['length']>0x0){if(_0x370435('0x13c')===_0x370435('0x13c'))_0x472757[_0x370435('0x53f')]()[_0x370435('0x342')]();else{function _0x566e56(){const _0x5de90a=_0x370435;return _0x1f20a8[_0x5de90a('0x203')];}}}},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x606')]=function(_0x2354da){const _0x1d599c=_0x3219af,_0x5d45a9=Math[_0x1d599c('0x219')](Graphics['boxWidth']/0x3),_0x44264d=Math['round'](Graphics[_0x1d599c('0x5b4')]/$gameParty[_0x1d599c('0x2c8')]()[_0x1d599c('0x2da')]),_0x369bc1=Math['min'](_0x5d45a9,_0x44264d),_0xd877b9=this[_0x1d599c('0x2a4')](VisuMZ[_0x1d599c('0x1e6')][_0x1d599c('0x885')][_0x1d599c('0xc7')][_0x1d599c('0x14d')]),_0x3d1d60=_0x44264d*_0x2354da['index']()+(_0x44264d-_0x369bc1)/0x2,_0x332938=SceneManager[_0x1d599c('0x684')]['_statusWindow']['y']-_0xd877b9;this[_0x1d599c('0x206')](_0x3d1d60,_0x332938,_0x369bc1,_0xd877b9),this['createContents'](),this['setBackgroundType'](0x1);},Window_ActorCommand[_0x3219af('0x3b5')]['resizeWindowBorderStyle']=function(_0x40f6c0){const _0x3b6305=_0x3219af,_0x3a4693=SceneManager['_scene'][_0x3b6305('0x54e')]();this[_0x3b6305('0x206')](_0x3a4693['x'],_0x3a4693['y'],_0x3a4693[_0x3b6305('0x106')],_0x3a4693[_0x3b6305('0x1e3')]),this[_0x3b6305('0x46d')](),this[_0x3b6305('0x123')](0x0);},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x839')]=function(){const _0x523ae6=_0x3219af;if(this[_0x523ae6('0x3')]){if(_0x523ae6('0x830')!==_0x523ae6('0x830')){function _0x25da3a(){const _0x7d937d=_0x523ae6;this[_0x7d937d('0x854')](_0x18a501,_0x22a25d,_0x45e929);}}else{const _0x3b41ab=this[_0x523ae6('0x3')][_0x523ae6('0x601')],_0x2bbc0d=this[_0x523ae6('0x106')]-0x8,_0x1f3d9a=this['height'],_0x1f2de8=this[_0x523ae6('0x89b')],_0x1a55ef=ColorManager['dimColor1'](),_0x5f2132=ColorManager['dimColor2']();this[_0x523ae6('0x3')]['x']=0x4,_0x3b41ab[_0x523ae6('0x6d9')](_0x2bbc0d,_0x1f3d9a),_0x3b41ab['gradientFillRect'](0x0,0x0,_0x2bbc0d,_0x1f2de8,_0x5f2132,_0x1a55ef,!![]),_0x3b41ab[_0x523ae6('0x2f4')](0x0,_0x1f2de8,_0x2bbc0d,_0x1f3d9a-_0x1f2de8*0x2,_0x1a55ef),_0x3b41ab[_0x523ae6('0x593')](0x0,_0x1f3d9a-_0x1f2de8,_0x2bbc0d,_0x1f2de8,_0x1a55ef,_0x5f2132,!![]),this[_0x523ae6('0x3')][_0x523ae6('0x2af')](0x0,0x0,_0x2bbc0d,_0x1f3d9a);}}},Window_ActorCommand[_0x3219af('0x3b5')][_0x3219af('0x896')]=function(){const _0x515246=_0x3219af;if(!this[_0x515246('0x6f4')])return;const _0x3bf374=VisuMZ['BattleCore'][_0x515246('0x885')][_0x515246('0x79b')],_0x1490d0=this['currentSymbol']();switch(_0x1490d0){case _0x515246('0x3c4'):this['setHelpWindowItem']($dataSkills[this[_0x515246('0x6f4')][_0x515246('0x116')]()]);break;case'guard':this[_0x515246('0x697')]($dataSkills[this[_0x515246('0x6f4')][_0x515246('0x286')]()]);break;case _0x515246('0x690'):const _0x3f0bbe=_0x3bf374['HelpSkillType'],_0x34cac4=_0x3f0bbe[_0x515246('0x796')]($dataSystem[_0x515246('0x29')][this[_0x515246('0x2e2')]()]);this[_0x515246('0x77c')][_0x515246('0x2b8')](_0x34cac4);break;case _0x515246('0x4e3'):this['setHelpWindowItem']($dataSkills[this[_0x515246('0x2e2')]()]);break;case _0x515246('0x259'):this[_0x515246('0x77c')][_0x515246('0x2b8')](_0x3bf374[_0x515246('0x6c9')]);break;case _0x515246('0x41f'):this[_0x515246('0x77c')]['setText'](_0x3bf374['HelpEscape']);break;case _0x515246('0x53c'):this[_0x515246('0x77c')][_0x515246('0x2b8')](_0x3bf374[_0x515246('0x3ca')]);break;default:this[_0x515246('0x77c')][_0x515246('0x2b8')]('');break;}},VisuMZ['BattleCore'][_0x3219af('0x171')]=Window_BattleStatus[_0x3219af('0x3b5')]['initialize'],Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x54a')]=function(_0x16c2ba){const _0x2a3e42=_0x3219af;VisuMZ[_0x2a3e42('0x1e6')]['Window_BattleStatus_initialize']['call'](this,_0x16c2ba),this[_0x2a3e42('0x1ce')]();},Window_BattleStatus['prototype'][_0x3219af('0x1ce')]=function(){const _0x85c616=_0x3219af;this[_0x85c616('0x5da')]=this['isFrameVisible']();},Window_BattleStatus['prototype'][_0x3219af('0x72a')]=function(){const _0x1c12ef=_0x3219af;if(this[_0x1c12ef('0x5d5')])return this[_0x1c12ef('0x5d5')];return this['_battleLayoutStyle']=SceneManager['_scene'][_0x1c12ef('0x72a')](),this[_0x1c12ef('0x5d5')];},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x6c7')]=function(){const _0x2f9081=_0x3219af,_0x1c8dbf=this[_0x2f9081('0x72a')]();switch(_0x1c8dbf){case'list':case _0x2f9081('0x216'):return!![];break;case _0x2f9081('0x311'):case'xp':case'portrait':default:return![];break;}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x1e9')]=function(){const _0x504a5f=_0x3219af;if(this[_0x504a5f('0x6c7')]()){if('VcDln'==='VcDln')return 0x0;else{function _0x454704(){const _0x4dbfac=_0x504a5f;return _0x1de201['battler']()[_0x4dbfac('0x833')]-_0x433d42[_0x4dbfac('0x53f')]()['_baseY'];}}}else{if('gCzvN'===_0x504a5f('0x7d')){function _0x5eaf22(){this['drawItemStyleIconText'](_0x32a3ea);}}else return 0xa;}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x1a1')]=function(){const _0x4082d9=_0x3219af,_0x2f507d=this['battleLayoutStyle']();switch(_0x2f507d){case _0x4082d9('0x766'):return 0x1;break;case'xp':case'portrait':return $gameParty[_0x4082d9('0x2c8')]()[_0x4082d9('0x2da')];break;case _0x4082d9('0x311'):default:return $gameParty['maxBattleMembers']();break;}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x454')]=function(){const _0xb83053=_0x3219af,_0x4166cf=this[_0xb83053('0x72a')]();switch(_0x4166cf){case'list':return Window_StatusBase[_0xb83053('0x3b5')][_0xb83053('0x454')][_0xb83053('0x448')](this);break;case'default':case'xp':case _0xb83053('0x82e'):default:return this[_0xb83053('0x7d4')];break;}},Window_BattleStatus['prototype']['rowSpacing']=function(){const _0x4712db=_0x3219af,_0x181672=this[_0x4712db('0x72a')]();switch(_0x181672){case _0x4712db('0x766'):return Window_StatusBase['prototype'][_0x4712db('0x7cd')][_0x4712db('0x448')](this);break;case _0x4712db('0x311'):case'xp':case _0x4712db('0x82e'):default:return 0x0;break;}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x516')]=function(){const _0x531ce1=_0x3219af;if(this[_0x531ce1('0x6c7')]())Window_StatusBase[_0x531ce1('0x3b5')][_0x531ce1('0x516')]['call'](this);else{if('WwHRQ'!==_0x531ce1('0x6b')){function _0x420e8d(){const _0x1542c3=_0x531ce1;this['_colorType']=_0x535c61['mpDamage']>=0x0?0x2:0x3,this[_0x1542c3('0x2ff')](_0x111b47[_0x1542c3('0x5fe')]);}}else this['padding']=0x8;}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x5a9')]=function(){const _0x1fb89b=_0x3219af;this[_0x1fb89b('0x471')]=!![];},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x789')]=function(){const _0x5868c0=_0x3219af;Window_StatusBase[_0x5868c0('0x3b5')][_0x5868c0('0x789')][_0x5868c0('0x448')](this),this[_0x5868c0('0x49a')](),this[_0x5868c0('0x68')]();if(this[_0x5868c0('0x72a')]()===_0x5868c0('0x216'))this['updateBorderStyle']();},Window_BattleStatus[_0x3219af('0x3b5')]['updateRefresh']=function(){const _0x3d938b=_0x3219af;this[_0x3d938b('0x471')]&&(this['_requestRefresh']=![],this[_0x3d938b('0x869')]());},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x4ae')]=function(){const _0x2fe365=_0x3219af;Window_StatusBase[_0x2fe365('0x3b5')][_0x2fe365('0x4ae')][_0x2fe365('0x448')](this);if(!$gameSystem['isSideView']())this[_0x2fe365('0x869')]();},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x46')]=function(){const _0x46ca9=_0x3219af;if(this[_0x46ca9('0x4ad')]===Window_BattleStatus)return;Window_StatusBase['prototype'][_0x46ca9('0x46')]['call'](this);},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0xe0')]=function(_0x30bd82){const _0x212514=_0x3219af,_0x5025ef=this[_0x212514('0x72a')]();switch(_0x5025ef){case'xp':case _0x212514('0x82e'):break;case'default':case _0x212514('0x766'):default:return Window_StatusBase[_0x212514('0x3b5')][_0x212514('0xe0')][_0x212514('0x448')](this,_0x30bd82);break;}},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x97')]=Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x6e4')],Window_BattleStatus['prototype'][_0x3219af('0x6e4')]=function(_0x1736cc){const _0x3c7cf8=_0x3219af,_0x49301e=this[_0x3c7cf8('0x72a')]();switch(_0x49301e){case _0x3c7cf8('0x766'):this[_0x3c7cf8('0x56a')](_0x1736cc);break;case'xp':this['drawItemImageXPStyle'](_0x1736cc);break;case _0x3c7cf8('0x82e'):this['drawItemImagePortraitStyle'](_0x1736cc);break;case'default':case'border':default:VisuMZ[_0x3c7cf8('0x1e6')][_0x3c7cf8('0x97')][_0x3c7cf8('0x448')](this,_0x1736cc);break;}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0xa5')]=function(_0x2f0382){const _0x42f073=_0x3219af,_0x127a30=this[_0x42f073('0x72a')]();if(!$gameSystem['isSideView']())this[_0x42f073('0x4e5')](_0x2f0382);switch(_0x127a30){case'list':this[_0x42f073('0x7db')](_0x2f0382);break;case'xp':case'portrait':case'default':default:this[_0x42f073('0xb')](_0x2f0382);break;}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x611')]=function(){const _0x17448d=_0x3219af,_0x13d553=this[_0x17448d('0x72a')]();if(['xp'][_0x17448d('0x895')](_0x13d553)&&!$gameSystem[_0x17448d('0x670')]()){if(_0x17448d('0x594')!==_0x17448d('0x594')){function _0x223230(){const _0x1dfa98=_0x17448d;if(this[_0x1dfa98('0x569')]()[_0x1dfa98('0x1e2')]['match'](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return _0x2e30fb[_0x1dfa98('0x3b5')]['canBattlerMove'][_0x1dfa98('0x448')](this);}}else{this['setCursorRect'](0x0,0x0,0x0,0x0);return;}}Window_StatusBase[_0x17448d('0x3b5')]['refreshCursor']['call'](this);},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x4e5')]=function(_0x25457c){const _0x5230e0=_0x3219af,_0x11b69a=this[_0x5230e0('0x16d')](_0x25457c)['battler']();if(!_0x11b69a)return;const _0x3aee4e=this[_0x5230e0('0x72a')](),_0x84f813=this[_0x5230e0('0x37')](_0x25457c);let _0x51696f=Math[_0x5230e0('0x219')](_0x84f813['x']+_0x84f813[_0x5230e0('0x106')]/0x2);['list']['includes'](_0x3aee4e)&&(_0x51696f=_0x84f813['width']/$gameParty[_0x5230e0('0x2c8')]()[_0x5230e0('0x2da')],_0x51696f*=_0x25457c,_0x51696f+=_0x84f813['width']/$gameParty[_0x5230e0('0x2c8')]()[_0x5230e0('0x2da')]/0x2);let _0x1ca845=Math[_0x5230e0('0x219')](this[_0x5230e0('0x7d9')](_0x25457c,_0x11b69a,_0x84f813));_0x11b69a[_0x5230e0('0x10e')](_0x51696f,_0x1ca845),this[_0x5230e0('0x573')](_0x11b69a,0x1),_0x11b69a[_0x5230e0('0x4ae')]();},Window_BattleStatus[_0x3219af('0x3b5')]['frontviewSpriteY']=function(_0x31625f,_0x5ecdc2,_0x4b02d2){const _0x2dc0a4=_0x3219af,_0x5cea45=VisuMZ[_0x2dc0a4('0x1e6')]['Settings'][_0x2dc0a4('0xc7')],_0x3c033e=this[_0x2dc0a4('0x72a')]();if(_0x3c033e==='xp'){const _0x195005=_0x5cea45['XPSpriteYLocation'];switch(_0x195005[_0x2dc0a4('0x1b9')]()[_0x2dc0a4('0x580')]()){case _0x2dc0a4('0x3e9'):return _0x4b02d2[_0x2dc0a4('0x1e3')]-_0x5ecdc2['_shadowSprite']['height']/0x4;break;case'center':const _0x18967f=_0x5cea45[_0x2dc0a4('0x526')];return(_0x4b02d2[_0x2dc0a4('0x1e3')]+(_0x5ecdc2['height']||_0x18967f))/0x2;break;case _0x2dc0a4('0x685'):return 0x0;case _0x2dc0a4('0x99'):default:return this[_0x2dc0a4('0x8a2')](_0x4b02d2);break;}}else{if(_0x3c033e===_0x2dc0a4('0x82e')){}}return _0x5ecdc2[_0x2dc0a4('0x1e3')];},Window_BattleStatus['prototype']['drawItemImageListStyle']=function(_0x5d699a){const _0x36e7d9=_0x3219af;if(!VisuMZ[_0x36e7d9('0x1e6')][_0x36e7d9('0x885')][_0x36e7d9('0xc7')][_0x36e7d9('0x6e6')])return;const _0x1822ff=this[_0x36e7d9('0x16d')](_0x5d699a),_0xd9dcf9=this[_0x36e7d9('0x37')](_0x5d699a);_0xd9dcf9[_0x36e7d9('0x106')]=ImageManager[_0x36e7d9('0x5a7')],_0xd9dcf9[_0x36e7d9('0x1e3')]-=0x2,this[_0x36e7d9('0x87d')](_0x1822ff,_0xd9dcf9['x']+0x1,_0xd9dcf9['y']+0x1,_0xd9dcf9['width'],_0xd9dcf9[_0x36e7d9('0x1e3')]);},Window_BattleStatus['prototype'][_0x3219af('0x7db')]=function(_0x24ff53){const _0x3b0487=_0x3219af,_0x38ad88=$dataSystem[_0x3b0487('0x330')]?0x4:0x3,_0x2feee6=_0x38ad88*0x80+(_0x38ad88-0x1)*0x8+0x4,_0x437eb6=this['actor'](_0x24ff53),_0x33317b=this['itemRect'](_0x24ff53);let _0x1ee8eb=_0x33317b['x']+this['padding'];if(VisuMZ[_0x3b0487('0x1e6')][_0x3b0487('0x885')]['BattleLayout']['ShowFacesListStyle']){if(_0x3b0487('0x9')===_0x3b0487('0x537')){function _0x2ee552(){const _0x52cca4=_0x3b0487,_0x117649=_0x3a912c(_0x16e9a8['$1'])[_0x52cca4('0x580')](),_0x398524=_0x581f1d(_0x361c73['$2']);_0x53798a[_0x117649]=_0x398524,_0x5ef18b+=_0x398524;}}else _0x1ee8eb=_0x33317b['x']+ImageManager[_0x3b0487('0x5a7')]+0x8;}else{if('BKopx'!==_0x3b0487('0x425')){function _0xe115e9(){const _0x386632=_0x3b0487;return this[_0x386632('0x7fa')]()['name'];}}else _0x1ee8eb+=ImageManager[_0x3b0487('0x124')];}const _0x1a7db0=Math[_0x3b0487('0x219')](Math[_0x3b0487('0x7a2')](_0x33317b['x']+_0x33317b[_0x3b0487('0x106')]-_0x2feee6,_0x1ee8eb)),_0x2738e3=Math[_0x3b0487('0x219')](_0x33317b['y']+(_0x33317b['height']-Sprite_Name[_0x3b0487('0x3b5')]['bitmapHeight']())/0x2),_0x1fe7f1=Math[_0x3b0487('0x219')](_0x1a7db0-ImageManager['iconWidth']/0x2-0x4),_0x281c69=Math[_0x3b0487('0x219')](_0x33317b['y']+(_0x33317b[_0x3b0487('0x1e3')]-ImageManager[_0x3b0487('0x6b7')])/0x2+ImageManager['iconHeight']/0x2);let _0x4a4894=_0x1a7db0+0x88;const _0x5b61bb=_0x2738e3;this[_0x3b0487('0x2b1')](_0x437eb6,_0x1a7db0-0x4,_0x2738e3),this[_0x3b0487('0x249')](_0x437eb6,_0x1a7db0,_0x2738e3),this['placeStateIcon'](_0x437eb6,_0x1fe7f1,_0x281c69),this[_0x3b0487('0x436')](_0x437eb6,'hp',_0x4a4894+0x88*0x0,_0x5b61bb),this['placeGauge'](_0x437eb6,'mp',_0x4a4894+0x88*0x1,_0x5b61bb);if($dataSystem[_0x3b0487('0x330')]){if(_0x3b0487('0x3a4')!==_0x3b0487('0x17'))this['placeGauge'](_0x437eb6,'tp',_0x4a4894+0x88*0x2,_0x5b61bb);else{function _0x4e55fc(){const _0x3f8dd1=_0x3b0487;if(_0xadf571[_0x3f8dd1('0x524')](_0x2b9ff4))return!![];}}}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x551')]=function(_0x5da04a){const _0x570c31=_0x3219af;if(!$gameSystem[_0x570c31('0x670')]())return;VisuMZ['BattleCore'][_0x570c31('0x97')][_0x570c31('0x448')](this,_0x5da04a);},Window_BattleStatus[_0x3219af('0x3b5')]['drawItemStatusXPStyle']=function(_0x35034b){const _0x1c9d36=_0x3219af,_0x3af6f0=this[_0x1c9d36('0x16d')](_0x35034b),_0x1f0023=this['itemRect'](_0x35034b),_0x281b85=Math[_0x1c9d36('0x219')](_0x1f0023['x']+(_0x1f0023[_0x1c9d36('0x106')]-0x80)/0x2),_0x283b32=this['nameY'](_0x1f0023);let _0x2b3917=_0x281b85-ImageManager['iconWidth']/0x2-0x4,_0x210fd0=_0x283b32+ImageManager['iconHeight']/0x2;_0x2b3917-ImageManager['iconWidth']/0x2<_0x1f0023['x']&&(_0x2b3917=_0x281b85+ImageManager[_0x1c9d36('0x124')]/0x2-0x4,_0x210fd0=_0x283b32-ImageManager['iconHeight']/0x2);const _0x276bb6=_0x281b85,_0x1237b6=this[_0x1c9d36('0x114')](_0x1f0023);this[_0x1c9d36('0x2b1')](_0x3af6f0,_0x281b85,_0x283b32),this[_0x1c9d36('0x249')](_0x3af6f0,_0x281b85,_0x283b32),this[_0x1c9d36('0x6a1')](_0x3af6f0,_0x2b3917,_0x210fd0),this[_0x1c9d36('0x1c0')](_0x3af6f0,_0x276bb6,_0x1237b6);},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0xf7')]=function(_0x13500b){const _0xc34424=_0x3219af;if(!VisuMZ[_0xc34424('0x1e6')][_0xc34424('0x885')][_0xc34424('0xc7')]['ShowPortraits'])return![];if(_0x13500b['getBattlePortrait']())return!![];return Imported[_0xc34424('0x2f0')]&&_0x13500b[_0xc34424('0x3d0')]();},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x6e')]=function(_0x230c60){const _0x4a3c28=_0x3219af,_0x358eb2=this[_0x4a3c28('0x16d')](_0x230c60);if(this['showPortraits'](_0x358eb2)){if(_0x4a3c28('0x52e')!=='yaDdl'){const _0x4b0e55=_0x4a3c28('0x563')['format'](_0x358eb2['actorId']()),_0x1daa4b=this['createInnerPortrait'](_0x4b0e55,Sprite),_0x37eb74=_0x358eb2[_0x4a3c28('0x555')]();if(_0x37eb74!==''){if(_0x4a3c28('0x2fe')!==_0x4a3c28('0x2fe')){function _0x34b71a(){const _0x7d25b7=_0x4a3c28;if(!_0x1b5bc0[_0x7d25b7('0x40d')]())return;if(!_0x3a11cc[_0x7d25b7('0xb2')])return;const _0x5a9b3a=_0x4dc1a5[_0x7d25b7('0x4c5')];if(!_0x5a9b3a)return;_0x5a9b3a[_0x7d25b7('0x2e')]();}}else _0x1daa4b[_0x4a3c28('0x601')]=ImageManager[_0x4a3c28('0x45c')](_0x37eb74);}else _0x1daa4b[_0x4a3c28('0x601')]=ImageManager[_0x4a3c28('0x298')];const _0x3bd2a1=this[_0x4a3c28('0x37')](_0x230c60);_0x1daa4b[_0x4a3c28('0x7c')]['x']=0.5,_0x1daa4b[_0x4a3c28('0x7c')]['y']=0x1;const _0x202bbc=Math[_0x4a3c28('0x219')](_0x3bd2a1['x']+_0x3bd2a1[_0x4a3c28('0x106')]/0x2)+this[_0x4a3c28('0x89b')],_0x3ba5cf=Math[_0x4a3c28('0x219')](this[_0x4a3c28('0x1e3')]);_0x1daa4b[_0x4a3c28('0x206')](_0x202bbc,_0x3ba5cf);const _0x40edbe=VisuMZ[_0x4a3c28('0x1e6')][_0x4a3c28('0x885')][_0x4a3c28('0xc7')][_0x4a3c28('0x553')];_0x1daa4b[_0x4a3c28('0x495')]['x']=_0x40edbe,_0x1daa4b[_0x4a3c28('0x495')]['y']=_0x40edbe,_0x1daa4b['show']();}else{function _0x346684(){const _0x59d33c=_0x4a3c28,_0xb091d9=this['commandStyle'](),_0x3f941b=_0x4573d4[_0x59d33c('0x1e6')][_0x59d33c('0x885')][_0x59d33c('0x34c')][_0x59d33c('0x2be')],_0x533b2d=_0xb091d9===_0x59d33c('0x7d3')?_0x546dc7['escape']:_0x59d33c('0x69e')[_0x59d33c('0x796')](_0x3f941b,_0xc02722[_0x59d33c('0x41f')]),_0x50c349=this[_0x59d33c('0x1ba')]();this['addCommand'](_0x533b2d,_0x59d33c('0x41f'),_0x50c349);}}}else{if(_0x4a3c28('0x2e9')!=='JLpLn'){function _0x12e11b(){const _0x55ed6a=_0x4a3c28;_0x9b97d7[_0x55ed6a('0x825')]=_0x40cf72(_0x501cbc['$1'])['toLowerCase']()[_0x55ed6a('0x580')]();}}else{const _0xdabd7e=this[_0x4a3c28('0x2b')](_0x230c60);this['drawActorFace'](_0x358eb2,_0xdabd7e['x'],_0xdabd7e['y'],_0xdabd7e[_0x4a3c28('0x106')],_0xdabd7e[_0x4a3c28('0x1e3')]);}}},Window_BattleStatus[_0x3219af('0x3b5')]['createInnerPortrait']=function(_0x3ac6dd,_0x11ca85){const _0x4bcae8=_0x3219af,_0xcb6ab3=this[_0x4bcae8('0x543')];if(_0xcb6ab3[_0x3ac6dd])return _0xcb6ab3[_0x3ac6dd];else{if('XvfRe'!==_0x4bcae8('0x7c0')){function _0x210fc9(){const _0x1a967f=_0x4bcae8;!this['updateEventMain']()&&!this[_0x1a967f('0x3f6')][_0x1a967f('0x17e')]()&&(this[_0x1a967f('0x5e8')]=_0x1a967f('0x333'));}}else{const _0x25eb8f=new _0x11ca85();return _0xcb6ab3[_0x3ac6dd]=_0x25eb8f,this[_0x4bcae8('0x574')](_0x25eb8f),this[_0x4bcae8('0x574')](this[_0x4bcae8('0x266')]),_0x25eb8f;}}},Window_BattleStatus['prototype']['_createClientArea']=function(){const _0x38ee0e=_0x3219af;this[_0x38ee0e('0x3e')](),this[_0x38ee0e('0x523')](),Window_StatusBase['prototype']['_createClientArea'][_0x38ee0e('0x448')](this),this[_0x38ee0e('0x143')]();},Window_BattleStatus['prototype']['_createCursorArea']=function(){const _0xdaf2ff=_0x3219af;this['_cursorArea']=new Sprite(),this[_0xdaf2ff('0x266')][_0xdaf2ff('0x478')]=[new PIXI[(_0xdaf2ff('0x478'))][(_0xdaf2ff('0x3e3'))]()],this[_0xdaf2ff('0x266')][_0xdaf2ff('0x9d')]=new Rectangle(),this[_0xdaf2ff('0x266')]['move'](this[_0xdaf2ff('0x37a')],this[_0xdaf2ff('0x37a')]),this[_0xdaf2ff('0x2b6')](this[_0xdaf2ff('0x266')]);},Window_BattleStatus[_0x3219af('0x3b5')]['_createEffectsContainer']=function(){const _0x188f3b=_0x3219af;this[_0x188f3b('0x94')]=new Sprite(),this['addChild'](this[_0x188f3b('0x94')]);},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x143')]=function(){const _0x202e8c=_0x3219af;this[_0x202e8c('0x180')]=new Sprite(),this[_0x202e8c('0x2b6')](this[_0x202e8c('0x180')]);},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x2ca')]=function(){const _0x2f0a60=_0x3219af;this[_0x2f0a60('0x20e')]=new Sprite();for(let _0x35ccee=0x0;_0x35ccee<0x9;_0x35ccee++){if(_0x2f0a60('0x2ba')==='FTuTP')this['_cursorSprite']['addChild'](new Sprite());else{function _0x5de2cb(){const _0x513dfd=_0x2f0a60;return _0x534a1d[_0x513dfd('0x1e6')]['Settings'][_0x513dfd('0xc7')][_0x513dfd('0x437')];}}}this['_cursorArea'][_0x2f0a60('0x2b6')](this[_0x2f0a60('0x20e')]);},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x4c4')]=function(){const _0x8e888d=_0x3219af;Window_StatusBase[_0x8e888d('0x3b5')][_0x8e888d('0x4c4')]['call'](this),this[_0x8e888d('0x32a')]();},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x32a')]=function(){const _0x198ec8=_0x3219af,_0x28dba2=this['_padding'];this['_cursorArea'][_0x198ec8('0x206')](_0x28dba2,_0x28dba2),this[_0x198ec8('0x266')]['x']=_0x28dba2-this[_0x198ec8('0x4a4')]['x'],this['_cursorArea']['y']=_0x28dba2-this[_0x198ec8('0x4a4')]['y'];if(this['innerWidth']>0x0&&this[_0x198ec8('0x7d4')]>0x0){if(_0x198ec8('0x50e')!==_0x198ec8('0x50e')){function _0x258b92(){const _0x5d4767=_0x198ec8;if(this['_battlePortrait']===_0xaa4752)this[_0x5d4767('0x64c')]();return this[_0x5d4767('0x13b')];}}else this[_0x198ec8('0x266')][_0x198ec8('0x117')]=this['isOpen']();}else{if('Iqucv'!==_0x198ec8('0x596')){function _0x5b6194(){this['battleCorePreBattleCommonEvent']();}}else this[_0x198ec8('0x266')][_0x198ec8('0x117')]=![];}},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x90')]=function(){const _0x1e98fe=_0x3219af;Window_StatusBase[_0x1e98fe('0x3b5')][_0x1e98fe('0x90')]['call'](this),this[_0x1e98fe('0x5d9')]();},Window_BattleStatus['prototype'][_0x3219af('0x5d9')]=function(){const _0x5b98e6=_0x3219af,_0x503c52=this[_0x5b98e6('0x266')][_0x5b98e6('0x3de')][_0x5b98e6('0x3bb')](new Point(0x0,0x0)),_0x6ded12=this[_0x5b98e6('0x266')][_0x5b98e6('0x9d')];_0x6ded12['x']=_0x503c52['x']+this['origin']['x'],_0x6ded12['y']=_0x503c52['y']+this[_0x5b98e6('0x4a4')]['y'],_0x6ded12[_0x5b98e6('0x106')]=this['innerWidth'],_0x6ded12[_0x5b98e6('0x1e3')]=this[_0x5b98e6('0x7d4')];},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x7e6')]=function(_0x143816){const _0x38ed9a=_0x3219af;if(this['battleLayoutStyle']()!==_0x38ed9a('0x82e'))return;this[_0x38ed9a('0x6e')](_0x143816['index']());},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x2cb')]=function(_0x135d1c,_0x682a31){const _0x5e1e84=_0x3219af;if(!this[_0x5e1e84('0x180')])return;if(!_0x135d1c)return;if(!_0x682a31)return;const _0x17695b=this[_0x5e1e84('0x37')](_0x682a31[_0x5e1e84('0x3f5')]());_0x17695b['x']+=_0x17695b[_0x5e1e84('0x106')]/0x2+this[_0x5e1e84('0x89b')],_0x135d1c['x']=_0x17695b['x'],_0x135d1c['y']=_0x17695b['y'],this['_damageContainer'][_0x5e1e84('0x2b6')](_0x135d1c);},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x3a')]=function(_0x518282){const _0x3371bb=_0x3219af;if(!this[_0x3371bb('0x180')])return;if(!_0x518282)return;this[_0x3371bb('0x180')][_0x3371bb('0x284')](_0x518282);},Window_BattleStatus['prototype'][_0x3219af('0x5c')]=function(){const _0x4ec535=_0x3219af;if(!this[_0x4ec535('0x276')]())return;if(!this[_0x4ec535('0x354')])this[_0x4ec535('0x74f')]();this[_0x4ec535('0x6fd')](),this[_0x4ec535('0x2d8')]();},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x276')]=function(){const _0x4be393=_0x3219af;if(this['constructor']!==Window_BattleStatus)return![];if(!SceneManager[_0x4be393('0x40d')]())return![];return VisuMZ[_0x4be393('0x1e6')]['Settings'][_0x4be393('0xc7')]['ShowPortraitsBorderStyle'];},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x74f')]=function(){const _0x166df1=_0x3219af;this['_borderPortraitSprite']=new Sprite();const _0x34de02=SceneManager[_0x166df1('0x684')],_0x378cf9=_0x34de02[_0x166df1('0x86c')][_0x166df1('0x589')](_0x34de02[_0x166df1('0x2e6')]);_0x34de02['addChildAt'](this['_borderPortraitSprite'],_0x378cf9),this['_borderPortraitSprite']['anchor']['x']=0.5,this['_borderPortraitSprite'][_0x166df1('0x7c')]['y']=0x1;const _0x5deb05=VisuMZ['BattleCore'][_0x166df1('0x885')][_0x166df1('0xc7')][_0x166df1('0x715')];this[_0x166df1('0x354')][_0x166df1('0x495')]['x']=_0x5deb05,this[_0x166df1('0x354')][_0x166df1('0x495')]['y']=_0x5deb05,this[_0x166df1('0x354')]['y']=this['y']+this[_0x166df1('0x1e3')],this[_0x166df1('0x351')]=0x0;},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x6fd')]=function(){const _0x237402=_0x3219af;this[_0x237402('0x354')][_0x237402('0x117')]=BattleManager[_0x237402('0x347')]();const _0x1217d9=BattleManager[_0x237402('0x16d')]();if(_0x1217d9===this[_0x237402('0x354')][_0x237402('0x16d')])return;this['_borderPortraitSprite'][_0x237402('0x16d')]=_0x1217d9||this['_borderPortraitSprite']['actor'];if(!_0x1217d9)return;else{if(_0x1217d9['getBattlePortraitFilename']()===''){if(_0x237402('0x3d4')!==_0x237402('0x3d4')){function _0x4091ba(){const _0x5dcd6f=_0x237402;if(!this[_0x5dcd6f('0x276')]())return;if(!this[_0x5dcd6f('0x354')])this['createBorderStylePortraitSprite']();this[_0x5dcd6f('0x6fd')](),this[_0x5dcd6f('0x2d8')]();}}else{this[_0x237402('0x354')][_0x237402('0x601')]=ImageManager['_emptyBitmap'];return;}}else{const _0x11487d=ImageManager['loadPicture'](_0x1217d9[_0x237402('0x555')]());_0x11487d[_0x237402('0xd7')](this['processBorderActor'][_0x237402('0x84b')](this,_0x11487d));}}},Window_BattleStatus['prototype'][_0x3219af('0x38f')]=function(_0xb707a5){const _0x1a9e4d=_0x3219af;this[_0x1a9e4d('0x351')]=0x14,this[_0x1a9e4d('0x354')][_0x1a9e4d('0x601')]=_0xb707a5,SceneManager[_0x1a9e4d('0x684')][_0x1a9e4d('0x18d')]()?(this['_borderPortraitSprite']['x']=0x0,this[_0x1a9e4d('0x82d')]=Math[_0x1a9e4d('0x6ad')](_0xb707a5['width']/0x2)):(this['_borderPortraitSprite']['x']=this[_0x1a9e4d('0x106')],this[_0x1a9e4d('0x82d')]=this[_0x1a9e4d('0x106')]*0x3/0x4),this[_0x1a9e4d('0x354')][_0x1a9e4d('0x805')]=0x0;},Window_BattleStatus[_0x3219af('0x3b5')][_0x3219af('0x2d8')]=function(){const _0x420080=_0x3219af;if(this[_0x420080('0x351')]>0x0){const _0x4c3449=this[_0x420080('0x351')],_0x51aeeb=this['_borderPortraitSprite'];_0x51aeeb['x']=(_0x51aeeb['x']*(_0x4c3449-0x1)+this['_borderPortraitTargetX'])/_0x4c3449,_0x51aeeb[_0x420080('0x805')]=(_0x51aeeb[_0x420080('0x805')]*(_0x4c3449-0x1)+0xff)/_0x4c3449,this[_0x420080('0x351')]--;}},Window_BattleStatus['prototype'][_0x3219af('0x68')]=function(){const _0x1e296b=_0x3219af;return;this[_0x1e296b('0x94')]&&(this[_0x1e296b('0x94')]['x']=this['x'],this[_0x1e296b('0x94')]['y']=this['y']);if(this[_0x1e296b('0x180')]){if(_0x1e296b('0x856')===_0x1e296b('0x12b')){function _0x2fc1b1(){const _0x50f59b=_0x1e296b;return _0x30468a[_0x50f59b('0x1e6')]['Settings']['Damage'][_0x50f59b('0x7e5')][_0x50f59b('0x448')](this,_0x3a5e61,_0x336bdf);}}else this['_damageContainer']['x']=this['x'],this['_damageContainer']['y']=this['y'];}},Window_BattleEnemy['prototype'][_0x3219af('0x1a1')]=function(){const _0x3b2efd=_0x3219af;return this[_0x3b2efd('0x7f9')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x7fc')]=Window_BattleEnemy[_0x3219af('0x3b5')][_0x3219af('0x4ae')],Window_BattleEnemy[_0x3219af('0x3b5')]['show']=function(){const _0x1d05b1=_0x3219af;VisuMZ[_0x1d05b1('0x1e6')][_0x1d05b1('0x7fc')][_0x1d05b1('0x448')](this),this['y']=Graphics[_0x1d05b1('0x1e3')]*0xa;},Window_BattleEnemy[_0x3219af('0x3b5')]['validTargets']=function(){const _0x547df8=_0x3219af;return $gameTroop[_0x547df8('0x2fc')]()[_0x547df8('0x5b2')](0x0);},Window_BattleEnemy['prototype'][_0x3219af('0x869')]=function(){const _0x53f032=_0x3219af;this[_0x53f032('0x258')]=this[_0x53f032('0x290')](),this[_0x53f032('0x522')](),Window_Selectable[_0x53f032('0x3b5')][_0x53f032('0x869')][_0x53f032('0x448')](this);},Window_BattleEnemy[_0x3219af('0x3b5')]['sortEnemies']=function(){const _0x19fdc4=_0x3219af;this['_enemies'][_0x19fdc4('0x4d9')]((_0x4ebb2f,_0x14655e)=>{const _0x36d660=_0x19fdc4;if(_0x36d660('0x492')!==_0x36d660('0x492')){function _0x26db6a(){this['_forcedBattleLayout']=_0x549330;}}else{if(_0x4ebb2f[_0x36d660('0x53f')]()[_0x36d660('0x5af')]===_0x14655e[_0x36d660('0x53f')]()[_0x36d660('0x5af')])return _0x4ebb2f['battler']()['_baseY']-_0x14655e['battler']()[_0x36d660('0x833')];else{if(_0x36d660('0x861')===_0x36d660('0x71d')){function _0x1557a1(){const _0x3696a0=_0x36d660,_0x1d7c42=this[_0x3696a0('0x50a')](_0x254a84);if(_0x1d7c42===_0x3696a0('0x22f'))this[_0x3696a0('0x7a9')](_0x34f348);else _0x1d7c42===_0x3696a0('0x74a')?this[_0x3696a0('0xe7')](_0x30350e):_0xe5932f[_0x3696a0('0x3b5')]['drawItem']['call'](this,_0x1805c4);}}else return _0x4ebb2f[_0x36d660('0x53f')]()[_0x36d660('0x5af')]-_0x14655e['battler']()[_0x36d660('0x5af')];}}});if(SceneManager[_0x19fdc4('0x5be')]()){if(_0x19fdc4('0x22b')===_0x19fdc4('0x4c0')){function _0x198a99(){const _0x5a1b30=_0x19fdc4;return _0x5621a5[_0x5a1b30('0x1e6')]['Game_Interpreter_command283']['call'](this,_0x161f67);}}else this[_0x19fdc4('0x258')][_0x19fdc4('0x75d')]();}},Window_BattleEnemy['prototype'][_0x3219af('0x657')]=function(){const _0x3ab7ef=_0x3219af,_0x810582=VisuMZ['BattleCore'][_0x3ab7ef('0x885')][_0x3ab7ef('0x5ff')];let _0x247d5f=![];if($gameSystem[_0x3ab7ef('0x670')]()){if('DCGZg'===_0x3ab7ef('0x58b'))_0x247d5f=_0x810582[_0x3ab7ef('0x3ea')];else{function _0x492e08(){_0x27ce56=(_0x4f43b3+_0x3c2d83)/0x2;}}}else{if(_0x3ab7ef('0x241')===_0x3ab7ef('0x95')){function _0x21bc9a(){const _0x18e5d8=_0x3ab7ef;this[_0x18e5d8('0xe7')](_0x5aa45b);}}else _0x247d5f=_0x810582[_0x3ab7ef('0x473')];}this[_0x3ab7ef('0x3e5')](_0x247d5f?this[_0x3ab7ef('0x7f9')]()-0x1:0x0);};function Window_AutoBattleCancel(){const _0x5c2e2b=_0x3219af;this[_0x5c2e2b('0x54a')](...arguments);}Window_AutoBattleCancel[_0x3219af('0x3b5')]=Object[_0x3219af('0x1ae')](Window_Base['prototype']),Window_AutoBattleCancel['prototype'][_0x3219af('0x4ad')]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x3219af('0x3b5')][_0x3219af('0x54a')]=function(_0x375b0f){const _0x31f2af=_0x3219af;Window_Base[_0x31f2af('0x3b5')][_0x31f2af('0x54a')][_0x31f2af('0x448')](this,_0x375b0f),this[_0x31f2af('0x123')](this[_0x31f2af('0x393')]()),this['refresh']();},Window_AutoBattleCancel['prototype']['bgType']=function(){const _0x57a45c=_0x3219af;return VisuMZ[_0x57a45c('0x1e6')]['Settings'][_0x57a45c('0x500')][_0x57a45c('0x215')];},Window_AutoBattleCancel[_0x3219af('0x3b5')][_0x3219af('0x869')]=function(){const _0x10c6c5=_0x3219af;this['contents'][_0x10c6c5('0x20a')]();const _0x59a1b5=VisuMZ['BattleCore'][_0x10c6c5('0x885')][_0x10c6c5('0x500')][_0x10c6c5('0x2dc')],_0x277dda=_0x59a1b5[_0x10c6c5('0x796')](this['okButtonText'](),this['cancelButtonText']()),_0x2a765a=this[_0x10c6c5('0x17f')](_0x277dda)['width'],_0x3d3917=Math['floor']((this[_0x10c6c5('0x442')]-_0x2a765a)/0x2);this[_0x10c6c5('0x767')](_0x277dda,_0x3d3917,0x0,_0x2a765a);},Window_AutoBattleCancel[_0x3219af('0x3b5')][_0x3219af('0x5ae')]=function(){const _0xd58274=_0x3219af;return Imported[_0xd58274('0x268')]?TextManager[_0xd58274('0x557')]('ok'):VisuMZ[_0xd58274('0x1e6')][_0xd58274('0x885')]['AutoBattle']['AutoBattleOK'];},Window_AutoBattleCancel[_0x3219af('0x3b5')][_0x3219af('0x597')]=function(){const _0x4c1b07=_0x3219af;if(Imported[_0x4c1b07('0x268')]){if('tSDiX'!=='yZKMZ')return TextManager['getInputButtonString']('cancel');else{function _0x571480(){const _0x15bf40=_0x4c1b07;this[_0x15bf40('0x402')][_0x15bf40('0x3b3')](this[_0x15bf40('0x77c')]),this[_0x15bf40('0x222')][_0x15bf40('0x3b3')](this['_helpWindow']);}}}else return VisuMZ[_0x4c1b07('0x1e6')][_0x4c1b07('0x885')]['AutoBattle'][_0x4c1b07('0x62b')];},Window_AutoBattleCancel[_0x3219af('0x3b5')][_0x3219af('0x789')]=function(){const _0x13363d=_0x3219af;Window_Base[_0x13363d('0x3b5')]['update'][_0x13363d('0x448')](this),this[_0x13363d('0x85c')](),this[_0x13363d('0x24b')]();},Window_AutoBattleCancel[_0x3219af('0x3b5')][_0x3219af('0x85c')]=function(){const _0x52ed00=_0x3219af;this[_0x52ed00('0x117')]=BattleManager[_0x52ed00('0x340')];},Window_AutoBattleCancel['prototype'][_0x3219af('0x24b')]=function(){const _0x4dc0f8=_0x3219af;if(!BattleManager[_0x4dc0f8('0x340')])return;(Input[_0x4dc0f8('0x270')]('ok')||Input['isTriggered'](_0x4dc0f8('0x1a8'))||TouchInput['isClicked']()||TouchInput[_0x4dc0f8('0x5bf')]())&&(SoundManager[_0x4dc0f8('0x680')](),BattleManager[_0x4dc0f8('0x340')]=![],Input[_0x4dc0f8('0x20a')](),TouchInput[_0x4dc0f8('0x20a')]());};function Window_EnemyName(){const _0x5a97b6=_0x3219af;this[_0x5a97b6('0x54a')](...arguments);}Window_EnemyName[_0x3219af('0x3b5')]=Object['create'](Window_Base[_0x3219af('0x3b5')]),Window_EnemyName[_0x3219af('0x3b5')][_0x3219af('0x4ad')]=Window_EnemyName,Window_EnemyName[_0x3219af('0x3b5')][_0x3219af('0x54a')]=function(_0x33ea8b){const _0x27c404=_0x3219af;this[_0x27c404('0x849')]=_0x33ea8b,this[_0x27c404('0x2aa')]='';const _0x5a8c60=new Rectangle(0x0,0x0,Graphics[_0x27c404('0x5b4')],this['lineHeight']()*0x4);Window_Base[_0x27c404('0x3b5')]['initialize'][_0x27c404('0x448')](this,_0x5a8c60),this[_0x27c404('0x123')](0x2),this[_0x27c404('0x620')]=0x0;},Window_EnemyName[_0x3219af('0x3b5')][_0x3219af('0x516')]=function(){this['padding']=0x0;},Window_EnemyName[_0x3219af('0x3b5')][_0x3219af('0x569')]=function(){const _0x5084a2=_0x3219af;return $gameTroop[_0x5084a2('0x850')]()[this[_0x5084a2('0x849')]];},Window_EnemyName[_0x3219af('0x3b5')][_0x3219af('0x789')]=function(){const _0x5104d0=_0x3219af;Window_Base[_0x5104d0('0x3b5')][_0x5104d0('0x789')][_0x5104d0('0x448')](this);if(this[_0x5104d0('0x569')]()&&this[_0x5104d0('0x569')]()[_0x5104d0('0x99')]()!==this[_0x5104d0('0x2aa')])this[_0x5104d0('0x869')]();this[_0x5104d0('0x372')](),this['updatePosition']();},Window_EnemyName[_0x3219af('0x3b5')]['updateOpacity']=function(){const _0x38962e=_0x3219af;if(!this[_0x38962e('0x569')]()){if(this[_0x38962e('0x620')]>0x0)this[_0x38962e('0x620')]-=0x10;}else{if(this['enemy']()['isDead']()){if(this[_0x38962e('0x620')]>0x0)this[_0x38962e('0x620')]-=0x10;}else{if(SceneManager['_scene'][_0x38962e('0x191')]&&SceneManager[_0x38962e('0x684')]['_enemyWindow'][_0x38962e('0x79f')]&&SceneManager[_0x38962e('0x684')][_0x38962e('0x191')][_0x38962e('0x258')][_0x38962e('0x895')](this['enemy']())){if(this[_0x38962e('0x620')]<0xff)this[_0x38962e('0x620')]+=0x10;}else this['contentsOpacity']>0x0&&(this[_0x38962e('0x620')]-=0x10);}}},Window_EnemyName[_0x3219af('0x3b5')]['updatePosition']=function(){const _0x39383c=_0x3219af;if(!this['enemy']())return;SceneManager['isBattleFlipped']()?this['x']=Graphics[_0x39383c('0x5b4')]-this[_0x39383c('0x569')]()[_0x39383c('0x53f')]()['_baseX']:this['x']=this['enemy']()[_0x39383c('0x53f')]()[_0x39383c('0x5af')];this['x']-=Math['round'](this[_0x39383c('0x106')]/0x2),this['y']=this[_0x39383c('0x569')]()[_0x39383c('0x53f')]()['_baseY']-Math[_0x39383c('0x219')](this[_0x39383c('0x614')]()*1.5);const _0xab62c7=VisuMZ['BattleCore']['Settings'][_0x39383c('0x5ff')];this['x']+=_0xab62c7['NameOffsetX']||0x0,this['y']+=_0xab62c7['NameOffsetY']||0x0;},Window_EnemyName[_0x3219af('0x3b5')][_0x3219af('0x1d5')]=function(){const _0x5c7590=_0x3219af;Window_Base[_0x5c7590('0x3b5')][_0x5c7590('0x1d5')][_0x5c7590('0x448')](this),this[_0x5c7590('0x81d')]['fontSize']=VisuMZ[_0x5c7590('0x1e6')][_0x5c7590('0x885')][_0x5c7590('0x5ff')][_0x5c7590('0x6ce')];},Window_EnemyName['prototype'][_0x3219af('0x869')]=function(){const _0x4619ca=_0x3219af;this[_0x4619ca('0x81d')]['clear']();if(!this[_0x4619ca('0x569')]())return;this[_0x4619ca('0x2aa')]=this['enemy']()[_0x4619ca('0x99')]();const _0x4e8501=this[_0x4619ca('0x17f')](this[_0x4619ca('0x2aa')])[_0x4619ca('0x106')],_0x25799c=Math['round']((this[_0x4619ca('0x442')]-_0x4e8501)/0x2);this[_0x4619ca('0x767')](this['_text'],_0x25799c,0x0,_0x4e8501+0x8);},Window_BattleLog['prototype']['maxLines']=function(){const _0x307a48=_0x3219af;return VisuMZ[_0x307a48('0x1e6')][_0x307a48('0x885')][_0x307a48('0x69c')][_0x307a48('0x7f8')];},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x5')]=function(){const _0x5eed35=_0x3219af;return VisuMZ[_0x5eed35('0x1e6')]['Settings'][_0x5eed35('0x69c')][_0x5eed35('0x1a6')];},Window_BattleLog[_0x3219af('0x3b5')]['backColor']=function(){const _0x224fbb=_0x3219af;return VisuMZ[_0x224fbb('0x1e6')]['Settings'][_0x224fbb('0x69c')][_0x224fbb('0x4a9')];},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x1bc')]=function(){return![];},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x892')]=function(_0x254ef4,_0x3c24db){const _0x2a5812=_0x3219af;this[_0x2a5812('0x7b4')](_0x2a5812('0x2ac')),BattleManager[_0x2a5812('0x819')](_0x254ef4,_0x3c24db),this[_0x2a5812('0x39f')]();},Window_BattleLog[_0x3219af('0x3b5')]['actionSplicePoint']=function(){const _0x56a231=_0x3219af;this[_0x56a231('0x39f')]();},Window_BattleLog['prototype']['push']=function(_0x482bfd){const _0x2d6209=_0x3219af,_0x2e6cb2=Array[_0x2d6209('0x3b5')][_0x2d6209('0x5b2')][_0x2d6209('0x448')](arguments,0x1),_0xa08bfc={'name':_0x482bfd,'params':_0x2e6cb2},_0x47fc83=this[_0x2d6209('0x7c8')][_0x2d6209('0x75a')](_0xf8c1f8=>_0xf8c1f8['name'])[_0x2d6209('0x589')](_0x2d6209('0x2ac'));_0x47fc83>=0x0?this[_0x2d6209('0x7c8')][_0x2d6209('0x2c7')](_0x47fc83,0x0,_0xa08bfc):this['_methods'][_0x2d6209('0x453')](_0xa08bfc);},Window_BattleLog[_0x3219af('0x3b5')]['unshift']=function(_0x6e768a){const _0x45549f=_0x3219af,_0x38458d=Array[_0x45549f('0x3b5')][_0x45549f('0x5b2')][_0x45549f('0x448')](arguments,0x1);this[_0x45549f('0x7c8')][_0x45549f('0x7b4')]({'name':_0x6e768a,'params':_0x38458d});},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x164')]=function(){const _0x650b0d=_0x3219af;if(!$gameTemp[_0x650b0d('0x50')]())return;console[_0x650b0d('0x6cc')](this[_0x650b0d('0x7c8')][_0x650b0d('0x75a')](_0x34296d=>_0x34296d['name'])['join']('\x0a'));},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x89c')]=Window_BattleLog[_0x3219af('0x3b5')]['refresh'],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x869')]=function(){const _0x3c8886=_0x3219af;this[_0x3c8886('0x471')]=!![];},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x3ed')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x789')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x789')]=function(){const _0x1a6fea=_0x3219af;VisuMZ[_0x1a6fea('0x1e6')][_0x1a6fea('0x3ed')][_0x1a6fea('0x448')](this);if(this['_requestRefresh'])this[_0x1a6fea('0x12f')]();},Window_BattleLog[_0x3219af('0x3b5')]['processRefresh']=function(){const _0x3ec29b=_0x3219af;this[_0x3ec29b('0x471')]=![],VisuMZ[_0x3ec29b('0x1e6')]['Window_BattleLog_refresh'][_0x3ec29b('0x448')](this);},Window_BattleLog['prototype'][_0x3219af('0x7c4')]=function(_0x587fb5){const _0x240d59=_0x3219af;let _0x312354=VisuMZ[_0x240d59('0x1e6')][_0x240d59('0x885')][_0x240d59('0x69c')][_0x240d59('0xa9')][_0x240d59('0x1b9')]()[_0x240d59('0x580')](),_0x26e637=this['_lines'][_0x587fb5];if(_0x26e637['match'](/<LEFT>/i)){if('oJvxQ'!==_0x240d59('0x7f7'))_0x312354=_0x240d59('0x517');else{function _0x34692f(){const _0x54f596=_0x240d59;return this[_0x54f596('0x259')]()[_0x54f596('0x1e2')][_0x54f596('0x6f1')](/<JS TARGETS>/i);}}}else{if(_0x26e637[_0x240d59('0x6f1')](/<CENTER>/i))_0x312354=_0x240d59('0x834');else{if(_0x26e637[_0x240d59('0x6f1')](/<RIGHT>/i)){if(_0x240d59('0x16c')===_0x240d59('0x16c'))_0x312354=_0x240d59('0x2e5');else{function _0x3e3008(){const _0xc538c=_0x240d59;return _0x1160f9[_0xc538c('0x684')][_0xc538c('0x72a')]()==='border'?_0x54a392[_0xc538c('0x1e6')][_0xc538c('0x885')][_0xc538c('0xc7')][_0xc538c('0x737')]:_0x383d3f[_0xc538c('0x1e6')]['Settings'][_0xc538c('0xc7')][_0xc538c('0x437')];}}}}}_0x26e637=_0x26e637[_0x240d59('0x30e')](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x26e637=_0x26e637['replace'](/\\I\[0\]/gi,'');const _0x3a43a4=this[_0x240d59('0x1bd')](_0x587fb5);this[_0x240d59('0x81d')]['clearRect'](_0x3a43a4['x'],_0x3a43a4['y'],_0x3a43a4['width'],_0x3a43a4[_0x240d59('0x1e3')]);const _0x2ccbda=this['textSizeEx'](_0x26e637)[_0x240d59('0x106')];let _0x3982dc=_0x3a43a4['x'];if(_0x312354===_0x240d59('0x834'))_0x3982dc+=(_0x3a43a4[_0x240d59('0x106')]-_0x2ccbda)/0x2;else{if(_0x312354==='right'){if(_0x240d59('0x762')!==_0x240d59('0x5ca'))_0x3982dc+=_0x3a43a4['width']-_0x2ccbda;else{function _0x321c39(){const _0x30f02c=_0x240d59;this[_0x30f02c('0x734')]()[_0x30f02c('0x2b6')](_0x507df0);}}}}this[_0x240d59('0x767')](_0x26e637,_0x3982dc,_0x3a43a4['y'],_0x2ccbda+0x8);},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x380')]=function(_0x82cc35){const _0x38eb99=_0x3219af;this[_0x38eb99('0x279')][_0x38eb99('0x453')](_0x82cc35),this[_0x38eb99('0x869')](),this[_0x38eb99('0x39f')]();},Window_BattleLog['prototype']['updateWaitMode']=function(){const _0x2b60ef=_0x3219af;let _0x1a9ba3=![];switch(this[_0x2b60ef('0x2c6')]){case _0x2b60ef('0x4aa'):_0x1a9ba3=this[_0x2b60ef('0x50d')]['isEffecting']();break;case _0x2b60ef('0x109'):_0x1a9ba3=this[_0x2b60ef('0x50d')][_0x2b60ef('0x53')]();break;case _0x2b60ef('0x17c'):_0x1a9ba3=this[_0x2b60ef('0x50d')][_0x2b60ef('0x41d')]();break;case'float':_0x1a9ba3=this[_0x2b60ef('0x50d')][_0x2b60ef('0x2d1')]();break;case _0x2b60ef('0x445'):_0x1a9ba3=this[_0x2b60ef('0x50d')]['isAnyoneJumping']();break;case'opacity':_0x1a9ba3=this['_spriteset'][_0x2b60ef('0x41a')]();break;}if(!_0x1a9ba3){if('NMtOH'!==_0x2b60ef('0x11'))this['_waitMode']='';else{function _0x5b6ed7(){const _0x5c1730=_0x2b60ef;this['_allTargets']=this[_0x5c1730('0x656')][_0x5c1730('0x5b2')](0x0),this['_targetIndex']=0x0,this[_0x5c1730('0x6b0')]=this[_0x5c1730('0x4a')][0x0]||null,this['_phase']='custom';}}}return _0x1a9ba3;},Window_BattleLog['prototype'][_0x3219af('0x3ff')]=function(){const _0x3abcb3=_0x3219af;this[_0x3abcb3('0x1bb')](_0x3abcb3('0x17c'));},Window_BattleLog[_0x3219af('0x3b5')]['waitForFloat']=function(){this['setWaitMode']('float');},Window_BattleLog[_0x3219af('0x3b5')]['waitForJump']=function(){const _0x226553=_0x3219af;this[_0x226553('0x1bb')](_0x226553('0x445'));},Window_BattleLog[_0x3219af('0x3b5')]['waitForOpacity']=function(){const _0x22c943=_0x3219af;this[_0x22c943('0x1bb')](_0x22c943('0x805'));},Window_BattleLog['prototype']['startTurn']=function(){const _0x8f9074=_0x3219af,_0x2b1db7=VisuMZ['BattleCore']['Settings'][_0x8f9074('0x69c')];if(!_0x2b1db7[_0x8f9074('0x34a')])return;this[_0x8f9074('0x453')](_0x8f9074('0x380'),_0x2b1db7[_0x8f9074('0x658')]['format']($gameTroop[_0x8f9074('0x1cc')]())),this['push'](_0x8f9074('0x83f'),_0x2b1db7[_0x8f9074('0x491')]),this[_0x8f9074('0x453')](_0x8f9074('0x20a'));},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0xdd')]=function(_0x2bc10a,_0x229a0f,_0xfe094){const _0x373dfe=_0x3219af;if(this['isCustomActionSequence'](_0x229a0f)){if(_0x373dfe('0x292')==='rbgAD')BattleManager['prepareCustomActionSequence']();else{function _0x1a889e(){const _0x2b7a62=_0x373dfe;return this[_0x2b7a62('0x76d')]();}}}else this['usePremadeActionSequence'](_0x2bc10a,_0x229a0f,_0xfe094);},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x812')]=function(_0x3acfdd){const _0xd3ee23=_0x3219af;if(!SceneManager[_0xd3ee23('0x40d')]())return![];if(!_0x3acfdd)return![];if(!_0x3acfdd[_0xd3ee23('0x259')]())return![];if(_0x3acfdd['item']()[_0xd3ee23('0x1e2')]['match'](/<CUSTOM ACTION SEQUENCE>/i)){if(_0xd3ee23('0x7e8')===_0xd3ee23('0x7e8'))return!![];else{function _0x7c6069(){const _0x44df52=_0xd3ee23;if(this['_svBattlerData']!==_0x251046)return this[_0x44df52('0x3a7')];return this[_0x44df52('0x176')](),this[_0x44df52('0x3a7')];}}}return![];},Window_BattleLog[_0x3219af('0x3b5')]['usePremadeActionSequence']=function(_0xbf0eeb,_0x285281,_0x4f34a2){const _0xf0d52e=_0x3219af,_0x2ef314=_0x285281[_0xf0d52e('0x259')]();this[_0xf0d52e('0x5d0')](_0xbf0eeb,_0x285281,_0x4f34a2),this['createEffectActionSet'](_0xbf0eeb,_0x285281,_0x4f34a2),this[_0xf0d52e('0xf0')](_0xbf0eeb,_0x285281,_0x4f34a2);},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x5e4')]=function(_0xc03b3e,_0x399d5b){const _0x15d6a7=_0x3219af,_0x17a4d6=VisuMZ[_0x15d6a7('0x1e6')]['Settings']['BattleLog'];_0x17a4d6['ActionCenteredName']&&this[_0x15d6a7('0x453')](_0x15d6a7('0x380'),_0x15d6a7('0x28a')[_0x15d6a7('0x796')](DataManager[_0x15d6a7('0x24')](_0x399d5b)));if(DataManager['isSkill'](_0x399d5b)){if(_0x17a4d6[_0x15d6a7('0x51d')])this[_0x15d6a7('0x529')](_0x399d5b[_0x15d6a7('0x18c')],_0xc03b3e,_0x399d5b);if(_0x17a4d6[_0x15d6a7('0x5c9')])this[_0x15d6a7('0x529')](_0x399d5b[_0x15d6a7('0x1c9')],_0xc03b3e,_0x399d5b);}else{if(_0x17a4d6[_0x15d6a7('0x278')])this[_0x15d6a7('0x529')](TextManager[_0x15d6a7('0x49f')],_0xc03b3e,_0x399d5b);}},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x5d0')]=function(_0x4a6b2d,_0x10a8fe,_0x115ed2){const _0x470775=_0x3219af,_0x337152=_0x10a8fe[_0x470775('0x259')]();this[_0x470775('0x5e4')](_0x4a6b2d,_0x337152),this[_0x470775('0x453')](_0x470775('0x3cb'),_0x4a6b2d,_0x115ed2,!![]),this['push']('performActionStart',_0x4a6b2d,_0x10a8fe),this[_0x470775('0x453')](_0x470775('0x52')),this[_0x470775('0x453')]('performCastAnimation',_0x4a6b2d,_0x10a8fe),this[_0x470775('0x453')](_0x470775('0x3ff'));},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x227')]=function(_0x53ca59,_0x53018d,_0xa13730){const _0x18c17e=_0x3219af;if(this[_0x18c17e('0x419')](_0x53018d)){if(_0x18c17e('0x13a')!=='slrFb'){function _0x40fe0a(){const _0x5ec83e=_0x18c17e;return _0x5f16c0['BattleCore']['Settings'][_0x5ec83e('0x2b2')]['SmoothImage'];}}else this[_0x18c17e('0x20f')](_0x53ca59,_0x53018d,_0xa13730);}else{if(this[_0x18c17e('0x16b')](_0x53018d))this[_0x18c17e('0xa6')](_0x53ca59,_0x53018d,_0xa13730);else{if(_0x53018d[_0x18c17e('0x1b')]()){if(_0x18c17e('0x791')===_0x18c17e('0x791'))this[_0x18c17e('0x57b')](_0x53ca59,_0x53018d,_0xa13730);else{function _0xdd3546(){const _0x5e9989=_0x18c17e,_0x10e24c=this[_0x5e9989('0x72a')]();(_0x10e24c===_0x5e9989('0x216')||this[_0x5e9989('0x7b2')]())&&(this[_0x5e9989('0x5ec')]['open'](),this[_0x5e9989('0x5ec')][_0x5e9989('0x79f')]&&this[_0x5e9989('0x5ec')]['show'](),this[_0x5e9989('0x570')]['open'](),this['_itemWindow'][_0x5e9989('0x79f')]&&this['_itemWindow']['show']());}}}else{if(_0x18c17e('0x559')!==_0x18c17e('0x631'))this[_0x18c17e('0x854')](_0x53ca59,_0x53018d,_0xa13730);else{function _0x2aa30e(){const _0x4869b3=_0x18c17e;if(!_0x513e5b[_0x4869b3('0x40d')]())return;_0x1599a0['ConvertParams'](_0x53e548,_0x12a4c4);const _0x48d658=_0x1891b2['getLastPluginCommandInterpreter'](),_0x233779=_0x1a1fe0[_0x4869b3('0x1da')](_0x1ffafc[_0x4869b3('0x7f6')]),_0xd9c9e8=_0x1f24fb[_0x4869b3('0x707')],_0x1d9e30=_0x17a956[_0x4869b3('0x4a2')];if(!_0x48d658)return;_0x550b4f[_0x4869b3('0x769')](_0x233779,_0xd9c9e8,_0x1d9e30);if(_0x4e0373['WaitForAnimation'])_0x48d658[_0x4869b3('0x1bb')](_0x4869b3('0x4f1'));}}}}}},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x419')]=function(_0x439360){const _0x53bcc3=_0x3219af;if(!_0x439360['isPhysical']())return![];if(!_0x439360['isForOne']())return![];if(!_0x439360[_0x53bcc3('0x48a')]())return![];return VisuMZ[_0x53bcc3('0x1e6')]['Settings'][_0x53bcc3('0x564')][_0x53bcc3('0x7f')];},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x20f')]=function(_0x46a5f7,_0x439a62,_0x21572b){const _0x5d2581=_0x3219af,_0x52aa78=_0x46a5f7[_0x5d2581('0x624')]()[_0x5d2581('0x667')]<0x2,_0x38aa06=0x14,_0x407e39=0x30;if(_0x52aa78){if(_0x5d2581('0x881')!=='eVXpN')this['push'](_0x5d2581('0x706'),[_0x46a5f7],_0x407e39,_0x38aa06),this[_0x5d2581('0x453')](_0x5d2581('0x716'),_0x46a5f7,_0x21572b,_0x5d2581('0x122'),_0x38aa06,!![],_0x5d2581('0x576'),!![]),this[_0x5d2581('0x453')](_0x5d2581('0x8c'),[_0x46a5f7],_0x5d2581('0x462')),this[_0x5d2581('0x453')](_0x5d2581('0x52'));else{function _0x561440(){const _0x107453=_0x5d2581;if(!_0x3d9736['isSceneBattle']())return;if(!this[_0x107453('0x818')])this[_0x107453('0x4a1')]();this[_0x107453('0x81b')]();const _0x4e16d6=this[_0x107453('0x53f')]();if(_0x4e16d6)_0x4e16d6['setupDamagePopup']();}}}if(_0x439a62['item']()[_0x5d2581('0x602')]<0x0){if(_0x5d2581('0x104')===_0x5d2581('0x32c')){function _0x4006c2(){const _0x1cb48e=_0x5d2581;let _0x30c5be=this[_0x1cb48e('0x6b1')]();return _0x17f750[_0x1cb48e('0x36')](-_0x30c5be,_0x30c5be);}}else this[_0x5d2581('0x57b')](_0x46a5f7,_0x439a62,_0x21572b);}else this[_0x5d2581('0x854')](_0x46a5f7,_0x439a62,_0x21572b);if(_0x52aa78){if(_0x5d2581('0x77')!==_0x5d2581('0x77')){function _0x40124b(){const _0x5c3dd4=_0x5d2581;if(!_0x5cc9ca[_0x5c3dd4('0x1e6')][_0x5c3dd4('0x885')][_0x5c3dd4('0xc7')][_0x5c3dd4('0x6e6')])return;const _0x459b98=this['actor'](_0x4609fa),_0x5a8333=this[_0x5c3dd4('0x37')](_0x56a0f5);_0x5a8333[_0x5c3dd4('0x106')]=_0x55a7e6[_0x5c3dd4('0x5a7')],_0x5a8333[_0x5c3dd4('0x1e3')]-=0x2,this[_0x5c3dd4('0x87d')](_0x459b98,_0x5a8333['x']+0x1,_0x5a8333['y']+0x1,_0x5a8333[_0x5c3dd4('0x106')],_0x5a8333[_0x5c3dd4('0x1e3')]);}}else{const _0x86afcc=_0x46a5f7[_0x5d2581('0x53f')]();this['push']('performJump',[_0x46a5f7],_0x407e39,_0x38aa06),this[_0x5d2581('0x453')](_0x5d2581('0x387'),_0x46a5f7,_0x86afcc[_0x5d2581('0x294')],_0x86afcc[_0x5d2581('0x801')],_0x38aa06,![],_0x5d2581('0x576')),this[_0x5d2581('0x453')](_0x5d2581('0x8c'),[_0x46a5f7],_0x5d2581('0x2cd')),this[_0x5d2581('0x453')](_0x5d2581('0x52')),this[_0x5d2581('0x453')](_0x5d2581('0x8c'),[_0x46a5f7],_0x5d2581('0x462'));}}},Window_BattleLog[_0x3219af('0x3b5')]['isMeleeMultiTargetAction']=function(_0x1ebe85){const _0x20e64a=_0x3219af;if(!_0x1ebe85[_0x20e64a('0x423')]())return![];if(!_0x1ebe85[_0x20e64a('0x736')]())return![];if(!_0x1ebe85['isForOpponent']())return![];return VisuMZ[_0x20e64a('0x1e6')][_0x20e64a('0x885')][_0x20e64a('0x564')]['AutoMeleeAoE'];},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0xa6')]=function(_0x40611e,_0x3c7ddf,_0x264702){const _0x4f10e5=_0x3219af,_0x23ad57=_0x40611e[_0x4f10e5('0x624')]()[_0x4f10e5('0x667')]<0x2,_0x279848=0x14,_0x535f10=0x30;if(_0x23ad57){if(_0x4f10e5('0x29c')===_0x4f10e5('0x29c'))this[_0x4f10e5('0x453')](_0x4f10e5('0x706'),[_0x40611e],_0x535f10,_0x279848),this[_0x4f10e5('0x453')](_0x4f10e5('0x716'),_0x40611e,_0x264702,_0x4f10e5('0x8d'),_0x279848,!![],_0x4f10e5('0x576'),!![]),this[_0x4f10e5('0x453')](_0x4f10e5('0x8c'),[_0x40611e],'walk'),this[_0x4f10e5('0x453')](_0x4f10e5('0x52'));else{function _0x130971(){const _0x7ab187=_0x4f10e5;this['_statusWindow']['show'](),this['_actorWindow'][_0x7ab187('0x46')](),this[_0x7ab187('0x402')][_0x7ab187('0x5c3')]();}}}this[_0x4f10e5('0x854')](_0x40611e,_0x3c7ddf,_0x264702);if(_0x23ad57){const _0x46309d=_0x40611e[_0x4f10e5('0x53f')]();this[_0x4f10e5('0x453')]('performJump',[_0x40611e],_0x535f10,_0x279848),this[_0x4f10e5('0x453')]('performMoveToPoint',_0x40611e,_0x46309d[_0x4f10e5('0x294')],_0x46309d['_homeY'],_0x279848,![],_0x4f10e5('0x576')),this['push'](_0x4f10e5('0x8c'),[_0x40611e],'evade'),this[_0x4f10e5('0x453')](_0x4f10e5('0x52')),this['push'](_0x4f10e5('0x8c'),[_0x40611e],_0x4f10e5('0x462'));}},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x57b')]=function(_0x3ef898,_0x2ea18b,_0x31564a){const _0x3a55f3=_0x3219af,_0x648214=_0x2ea18b[_0x3a55f3('0x259')]();for(const _0x3881a3 of _0x31564a){if(!_0x3881a3)continue;this[_0x3a55f3('0x453')]('performAction',_0x3ef898,_0x2ea18b),this[_0x3a55f3('0x453')](_0x3a55f3('0x83f'),Sprite_Battler['_motionSpeed']),this[_0x3a55f3('0x453')]('showAnimation',_0x3ef898,[_0x3881a3],_0x648214[_0x3a55f3('0x602')]),this[_0x3a55f3('0x453')](_0x3a55f3('0x83f'),0x18),this['push'](_0x3a55f3('0x892'),_0x3ef898,_0x3881a3);}this[_0x3a55f3('0x453')](_0x3a55f3('0x3cb'),_0x3ef898,_0x31564a,![]);},Window_BattleLog[_0x3219af('0x3b5')]['wholeActionSet']=function(_0x52b9a3,_0x22cc66,_0x1a0985){const _0x4d050b=_0x3219af,_0x2d1241=_0x22cc66[_0x4d050b('0x259')]();this['push'](_0x4d050b('0x68b'),_0x52b9a3,_0x22cc66),this[_0x4d050b('0x453')](_0x4d050b('0x83f'),Sprite_Battler[_0x4d050b('0x203')]),this[_0x4d050b('0x453')](_0x4d050b('0x5b0'),_0x52b9a3,_0x1a0985['clone'](),_0x2d1241['animationId']),this[_0x4d050b('0x453')](_0x4d050b('0x3ff'));for(const _0x48f361 of _0x1a0985){if('cPtCt'===_0x4d050b('0x1f8')){if(!_0x48f361)continue;this[_0x4d050b('0x453')](_0x4d050b('0x892'),_0x52b9a3,_0x48f361);}else{function _0x2fb6f6(){const _0x3a6352=_0x4d050b;_0x99f588[_0x3a6352('0x3b5')]['show'][_0x3a6352('0x448')](this);if(!_0x568ead[_0x3a6352('0x670')]())this[_0x3a6352('0x869')]();}}}this[_0x4d050b('0x453')](_0x4d050b('0x3cb'),_0x52b9a3,_0x1a0985,![]);},Window_BattleLog[_0x3219af('0x3b5')]['finishActionSet']=function(_0x12951c,_0x129cf6,_0x35c96f){const _0x5042f0=_0x3219af,_0x3c7a57=_0x129cf6[_0x5042f0('0x259')]();this[_0x5042f0('0x453')]('applyImmortal',_0x12951c,_0x35c96f,![]),this[_0x5042f0('0x453')](_0x5042f0('0x38e')),this['push'](_0x5042f0('0x519')),this['push'](_0x5042f0('0x20a')),this[_0x5042f0('0x453')](_0x5042f0('0x889'),_0x12951c),this['push']('waitForMovement');},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x711')]=function(_0x1d2b22){},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x6c')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x1d1')],Window_BattleLog['prototype']['displayCurrentState']=function(_0x18cba0){const _0x254ff5=_0x3219af;if(!VisuMZ['BattleCore']['Settings'][_0x254ff5('0x69c')][_0x254ff5('0x76e')])return;VisuMZ[_0x254ff5('0x1e6')][_0x254ff5('0x6c')]['call'](this,_0x18cba0);},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x1a3')]=function(_0x51d525){const _0x5cbd82=_0x3219af;this[_0x5cbd82('0x453')](_0x5cbd82('0x600'),_0x51d525);if(VisuMZ['BattleCore'][_0x5cbd82('0x885')][_0x5cbd82('0x564')][_0x5cbd82('0x353')]){if('GDTOx'==='GDTOx')this['push']('showAnimation',_0x51d525,[BattleManager[_0x5cbd82('0x31a')]],-0x1);else{function _0x10af8a(){const _0x340e21=_0x5cbd82;if(_0x11ccc6){const _0x4c05dc=_0xd38a91[_0x340e21('0x589')](_0x546e39);return _0x4c05dc>=0x0?[_0x17fa85[_0x4c05dc-0x1]||_0x1f376a]:[_0x183800];}}}}if(!VisuMZ[_0x5cbd82('0x1e6')][_0x5cbd82('0x885')][_0x5cbd82('0x69c')]['ShowCounter'])return;this[_0x5cbd82('0x453')](_0x5cbd82('0x380'),TextManager[_0x5cbd82('0x356')][_0x5cbd82('0x796')](_0x51d525['name']()));},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x459')]=function(_0xa6a488){const _0x4d82e0=_0x3219af;this[_0x4d82e0('0x453')](_0x4d82e0('0xe2'),_0xa6a488);if(!VisuMZ[_0x4d82e0('0x1e6')][_0x4d82e0('0x885')][_0x4d82e0('0x69c')][_0x4d82e0('0x4f0')])return;this[_0x4d82e0('0x453')]('addText',TextManager[_0x4d82e0('0x332')]['format'](_0xa6a488[_0x4d82e0('0x99')]()));},Window_BattleLog[_0x3219af('0x3b5')]['displayReflectionPlayBack']=function(_0x2bef73,_0x44afe5){const _0x3da99e=_0x3219af;if(VisuMZ[_0x3da99e('0x1e6')][_0x3da99e('0x885')][_0x3da99e('0x564')][_0x3da99e('0x2bc')]){const _0x40b5e6=_0x44afe5[_0x3da99e('0x259')]();this[_0x3da99e('0x453')](_0x3da99e('0x5b0'),_0x2bef73,[_0x2bef73],_0x40b5e6[_0x3da99e('0x602')]);}},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x255')]=function(_0x36b209,_0x44b6be){const _0x3255ed=_0x3219af;this[_0x3255ed('0x453')](_0x3255ed('0x584'),_0x36b209,_0x44b6be);if(!VisuMZ[_0x3255ed('0x1e6')][_0x3255ed('0x885')][_0x3255ed('0x69c')][_0x3255ed('0x20d')])return;const _0x7fa221=_0x36b209[_0x3255ed('0x99')](),_0x46e3b2=TextManager[_0x3255ed('0x4f')][_0x3255ed('0x796')](_0x7fa221,_0x44b6be[_0x3255ed('0x99')]());this[_0x3255ed('0x453')]('addText',_0x46e3b2);},VisuMZ['BattleCore']['Window_BattleLog_displayFailure']=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x2d5')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x2d5')]=function(_0x4241fb){const _0x1e53ed=_0x3219af;if(!VisuMZ[_0x1e53ed('0x1e6')][_0x1e53ed('0x885')]['BattleLog']['ShowFailure'])return;VisuMZ[_0x1e53ed('0x1e6')][_0x1e53ed('0x144')][_0x1e53ed('0x448')](this,_0x4241fb);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x3fb')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x1df')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x1df')]=function(_0x63bcfa){const _0x5387f0=_0x3219af;if(!VisuMZ[_0x5387f0('0x1e6')][_0x5387f0('0x885')][_0x5387f0('0x69c')][_0x5387f0('0x7dd')])return;VisuMZ[_0x5387f0('0x1e6')][_0x5387f0('0x3fb')][_0x5387f0('0x448')](this,_0x63bcfa);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x505')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x32d')],Window_BattleLog[_0x3219af('0x3b5')]['displayMiss']=function(_0x4daea4){const _0x4dfd65=_0x3219af;!VisuMZ[_0x4dfd65('0x1e6')]['Settings'][_0x4dfd65('0x69c')][_0x4dfd65('0x1eb')]?this[_0x4dfd65('0x453')](_0x4dfd65('0x2a8'),_0x4daea4):VisuMZ[_0x4dfd65('0x1e6')][_0x4dfd65('0x505')][_0x4dfd65('0x448')](this,_0x4daea4);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x5b5')]=Window_BattleLog[_0x3219af('0x3b5')]['displayEvasion'],Window_BattleLog['prototype'][_0x3219af('0x630')]=function(_0x12f5c5){const _0x1ae9b4=_0x3219af;if(!VisuMZ['BattleCore'][_0x1ae9b4('0x885')][_0x1ae9b4('0x69c')][_0x1ae9b4('0x1eb')]){if(_0x1ae9b4('0x31')==='yVqkk')_0x12f5c5['result']()[_0x1ae9b4('0x212')]?this['push'](_0x1ae9b4('0xe5'),_0x12f5c5):this[_0x1ae9b4('0x453')](_0x1ae9b4('0x7e1'),_0x12f5c5);else{function _0x8b61f8(){_0x6c18c4=_0x2f3f6f>=_0x64c126?_0x2c23b6:_0x57781f;}}}else{if(_0x1ae9b4('0x490')!==_0x1ae9b4('0x52c'))VisuMZ[_0x1ae9b4('0x1e6')]['Window_BattleLog_displayEvasion'][_0x1ae9b4('0x448')](this,_0x12f5c5);else{function _0x351384(){const _0x161f9e=_0x1ae9b4;_0x276fea[_0x161f9e('0x1e6')][_0x161f9e('0x758')][_0x161f9e('0x448')](this,_0x413fc3),this[_0x161f9e('0x39f')]();}}}},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x513')]=function(_0x43f489){const _0x3a1093=_0x3219af;_0x43f489[_0x3a1093('0x778')]()[_0x3a1093('0xf6')]&&(_0x43f489['result']()[_0x3a1093('0x58d')]>0x0&&!_0x43f489[_0x3a1093('0x778')]()[_0x3a1093('0x3fc')]&&this[_0x3a1093('0x453')](_0x3a1093('0x829'),_0x43f489),_0x43f489[_0x3a1093('0x778')]()['hpDamage']<0x0&&this['push'](_0x3a1093('0x338'),_0x43f489),VisuMZ[_0x3a1093('0x1e6')][_0x3a1093('0x885')][_0x3a1093('0x69c')][_0x3a1093('0x87')]&&this[_0x3a1093('0x453')](_0x3a1093('0x380'),this[_0x3a1093('0xf2')](_0x43f489)));},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x823')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x6f')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x6f')]=function(_0x51c378){const _0x124b0c=_0x3219af;if(!VisuMZ[_0x124b0c('0x1e6')][_0x124b0c('0x885')][_0x124b0c('0x69c')][_0x124b0c('0x5c8')])return;VisuMZ[_0x124b0c('0x1e6')][_0x124b0c('0x823')][_0x124b0c('0x448')](this,_0x51c378);},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x759')]=Window_BattleLog['prototype'][_0x3219af('0x293')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x293')]=function(_0x40811b){const _0x227d6f=_0x3219af;if(!VisuMZ[_0x227d6f('0x1e6')][_0x227d6f('0x885')][_0x227d6f('0x69c')][_0x227d6f('0xba')])return;VisuMZ[_0x227d6f('0x1e6')][_0x227d6f('0x759')][_0x227d6f('0x448')](this,_0x40811b);},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x3b9')]=function(_0x333e69){const _0x31499d=_0x3219af,_0x4e98b6=_0x333e69[_0x31499d('0x778')](),_0x4c998f=_0x4e98b6['addedStateObjects']();for(const _0x2c8df4 of _0x4c998f){if(_0x31499d('0x5f3')===_0x31499d('0x497')){function _0x2bef0a(){const _0x4900e0=_0x31499d;this[_0x4900e0('0x354')]=new _0x370d02();const _0x2ae22c=_0x363f5a[_0x4900e0('0x684')],_0x1f1636=_0x2ae22c[_0x4900e0('0x86c')][_0x4900e0('0x589')](_0x2ae22c[_0x4900e0('0x2e6')]);_0x2ae22c[_0x4900e0('0x573')](this[_0x4900e0('0x354')],_0x1f1636),this[_0x4900e0('0x354')][_0x4900e0('0x7c')]['x']=0.5,this[_0x4900e0('0x354')][_0x4900e0('0x7c')]['y']=0x1;const _0x3d8abf=_0x708eec[_0x4900e0('0x1e6')][_0x4900e0('0x885')][_0x4900e0('0xc7')][_0x4900e0('0x715')];this['_borderPortraitSprite']['scale']['x']=_0x3d8abf,this['_borderPortraitSprite'][_0x4900e0('0x495')]['y']=_0x3d8abf,this[_0x4900e0('0x354')]['y']=this['y']+this['height'],this[_0x4900e0('0x351')]=0x0;}}else{const _0x73c099=_0x333e69['isActor']()?_0x2c8df4[_0x31499d('0x18c')]:_0x2c8df4[_0x31499d('0x1c9')];if(_0x73c099&&VisuMZ[_0x31499d('0x1e6')][_0x31499d('0x885')][_0x31499d('0x69c')][_0x31499d('0x4bc')]){if(_0x31499d('0x2bf')===_0x31499d('0x2bf'))this[_0x31499d('0x453')](_0x31499d('0x3d5')),this[_0x31499d('0x453')](_0x31499d('0x269')),this[_0x31499d('0x453')](_0x31499d('0x380'),_0x73c099[_0x31499d('0x796')](_0x333e69[_0x31499d('0x99')]())),this[_0x31499d('0x453')]('wait');else{function _0x2002b6(){const _0x9ba3a6=_0x31499d;_0x41697b[_0x9ba3a6('0x1e6')][_0x9ba3a6('0x591')][_0x9ba3a6('0x448')](this,_0x2f6ed9),this[_0x9ba3a6('0x39f')]();}}}_0x2c8df4['id']===_0x333e69[_0x31499d('0x388')]()&&this[_0x31499d('0x453')](_0x31499d('0x84c'),_0x333e69);}}},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x74e')]=function(_0x471908){const _0x46853e=_0x3219af;if(!VisuMZ[_0x46853e('0x1e6')][_0x46853e('0x885')]['BattleLog'][_0x46853e('0x67')])return;const _0x4c7b30=_0x471908[_0x46853e('0x778')](),_0x542a4e=_0x4c7b30['removedStateObjects']();for(const _0x9c08dc of _0x542a4e){if(_0x9c08dc['message4']){if(_0x46853e('0x67b')===_0x46853e('0x67b'))this['push'](_0x46853e('0x3d5')),this[_0x46853e('0x453')](_0x46853e('0x269')),this[_0x46853e('0x453')](_0x46853e('0x380'),_0x9c08dc[_0x46853e('0x1d6')][_0x46853e('0x796')](_0x471908[_0x46853e('0x99')]())),this['push'](_0x46853e('0x35e'));else{function _0x23353c(){const _0x269540=_0x46853e;if(this[_0x269540('0x512')][_0x269540('0x4ec')](_0x1ad9fb=>_0x1ad9fb[_0x269540('0x259')]()&&_0x1ad9fb['isMagicSkill']()))return!![];}}}}},Window_BattleLog[_0x3219af('0x3b5')]['displayChangedBuffs']=function(_0x619312){const _0x11215=_0x3219af,_0x5a4f1e=VisuMZ['BattleCore'][_0x11215('0x885')]['BattleLog'],_0x4a9094=_0x619312[_0x11215('0x778')]();if(_0x5a4f1e['ShowAddedBuff'])this[_0x11215('0x811')](_0x619312,_0x4a9094[_0x11215('0x6cb')],TextManager['buffAdd']);if(_0x5a4f1e[_0x11215('0x208')])this['displayBuffs'](_0x619312,_0x4a9094[_0x11215('0x10a')],TextManager[_0x11215('0x229')]);if(_0x5a4f1e[_0x11215('0xcc')])this[_0x11215('0x811')](_0x619312,_0x4a9094[_0x11215('0x7a4')],TextManager[_0x11215('0x540')]);},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x811')]=function(_0x3d7d93,_0x25daea,_0x4b8602){const _0x55bcd3=_0x3219af;for(const _0xf94f50 of _0x25daea){const _0x54e20c=_0x4b8602['format'](_0x3d7d93['name'](),TextManager[_0x55bcd3('0x2df')](_0xf94f50));this[_0x55bcd3('0x453')](_0x55bcd3('0x3d5')),this[_0x55bcd3('0x453')](_0x55bcd3('0x269')),this[_0x55bcd3('0x453')]('addText',_0x54e20c),this[_0x55bcd3('0x453')](_0x55bcd3('0x35e'));}},VisuMZ['BattleCore'][_0x3219af('0x6d')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x20a')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x20a')]=function(){const _0x528cbe=_0x3219af;VisuMZ[_0x528cbe('0x1e6')]['Window_BattleLog_clear'][_0x528cbe('0x448')](this),this[_0x528cbe('0x39f')]();},VisuMZ['BattleCore'][_0x3219af('0x669')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x269')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x269')]=function(){const _0x3c2ffe=_0x3219af;VisuMZ[_0x3c2ffe('0x1e6')][_0x3c2ffe('0x669')][_0x3c2ffe('0x448')](this),this[_0x3c2ffe('0x39f')]();},VisuMZ['BattleCore'][_0x3219af('0x652')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x3d5')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x3d5')]=function(){const _0x57a513=_0x3219af;VisuMZ['BattleCore'][_0x57a513('0x652')][_0x57a513('0x448')](this),this['refresh'](),this[_0x57a513('0x39f')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x758')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x681')],Window_BattleLog[_0x3219af('0x3b5')]['popupDamage']=function(_0x488ec2){const _0x5f208e=_0x3219af;VisuMZ[_0x5f208e('0x1e6')]['Window_BattleLog_popupDamage'][_0x5f208e('0x448')](this,_0x488ec2),this[_0x5f208e('0x39f')]();},Window_BattleLog['prototype'][_0x3219af('0x38e')]=function(){const _0x9270c3=_0x3219af;let _0xa78814=0x0;this[_0x9270c3('0x4d6')][_0x9270c3('0x2da')]>0x0&&(_0xa78814=this[_0x9270c3('0x4d6')][this[_0x9270c3('0x4d6')][_0x9270c3('0x2da')]-0x1]);if(this[_0x9270c3('0x279')][_0x9270c3('0x2da')]>_0xa78814){if('CXLLY'!==_0x9270c3('0x744')){function _0x2121a0(){const _0x5638cb=_0x9270c3,_0x4bb0ad=this[_0x5638cb('0x53f')]();_0x4bb0ad&&(_0x4bb0ad['forceMotion'](_0x47ac50),[_0x5638cb('0x476'),'thrust',_0x5638cb('0x6b2')][_0x5638cb('0x895')](_0x4f6b54)&&this[_0x5638cb('0x374')]());}}else this[_0x9270c3('0x35e')]();}else{if(_0x9270c3('0x10c')===_0x9270c3('0x10c'))this['callNextMethod']();else{function _0x14b983(){const _0x3c239b=_0x9270c3;return this[_0x3c239b('0x3b1')]()[_0x3c239b('0x4ec')](_0x4537a3=>_0x4537a3[_0x3c239b('0x475')]());}}}},VisuMZ['BattleCore']['Window_BattleLog_performActionStart']=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x145')],Window_BattleLog[_0x3219af('0x3b5')]['performActionStart']=function(_0x35b4de,_0x7f420d){const _0x2336dc=_0x3219af;VisuMZ['BattleCore'][_0x2336dc('0x7bf')][_0x2336dc('0x448')](this,_0x35b4de,_0x7f420d),this['callNextMethod']();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x709')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x68b')],Window_BattleLog['prototype'][_0x3219af('0x68b')]=function(_0x1ed898,_0x5d0255){const _0x2c1e19=_0x3219af;VisuMZ[_0x2c1e19('0x1e6')]['Window_BattleLog_performAction'][_0x2c1e19('0x448')](this,_0x1ed898,_0x5d0255),this[_0x2c1e19('0x39f')]();},VisuMZ['BattleCore'][_0x3219af('0x22e')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x889')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x889')]=function(_0x538879){const _0x443f6e=_0x3219af;for(const _0x1ed16e of BattleManager[_0x443f6e('0x5e0')]()){if(!_0x1ed16e)continue;if(_0x1ed16e[_0x443f6e('0x71f')]())continue;_0x1ed16e[_0x443f6e('0x889')]();}this[_0x443f6e('0x39f')]();},VisuMZ[_0x3219af('0x1e6')]['Window_BattleLog_performDamage']=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x829')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x829')]=function(_0x216992){const _0x2b5303=_0x3219af;VisuMZ['BattleCore'][_0x2b5303('0x19d')][_0x2b5303('0x448')](this,_0x216992),this[_0x2b5303('0x39f')]();},VisuMZ[_0x3219af('0x1e6')]['Window_BattleLog_performMiss']=Window_BattleLog['prototype'][_0x3219af('0x2a8')],Window_BattleLog['prototype'][_0x3219af('0x2a8')]=function(_0x5ea3d0){const _0x289e11=_0x3219af;VisuMZ['BattleCore'][_0x289e11('0x5f7')][_0x289e11('0x448')](this,_0x5ea3d0),this[_0x289e11('0x39f')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x76c')]=Window_BattleLog[_0x3219af('0x3b5')]['performRecovery'],Window_BattleLog[_0x3219af('0x3b5')]['performRecovery']=function(_0x26137d){const _0x11b4b8=_0x3219af;VisuMZ[_0x11b4b8('0x1e6')][_0x11b4b8('0x76c')][_0x11b4b8('0x448')](this,_0x26137d),this[_0x11b4b8('0x39f')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x336')]=Window_BattleLog['prototype'][_0x3219af('0xe5')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0xe5')]=function(_0x36b570){const _0xc8a2d0=_0x3219af;VisuMZ['BattleCore'][_0xc8a2d0('0x336')][_0xc8a2d0('0x448')](this,_0x36b570),this[_0xc8a2d0('0x39f')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x367')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x7e1')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x7e1')]=function(_0x413d9d){const _0x10f2af=_0x3219af;VisuMZ[_0x10f2af('0x1e6')][_0x10f2af('0x367')]['call'](this,_0x413d9d),this[_0x10f2af('0x39f')]();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0x591')]=Window_BattleLog['prototype'][_0x3219af('0x600')],Window_BattleLog['prototype']['performCounter']=function(_0x4c307d){const _0x5c507c=_0x3219af;VisuMZ[_0x5c507c('0x1e6')][_0x5c507c('0x591')]['call'](this,_0x4c307d),this[_0x5c507c('0x39f')]();},VisuMZ['BattleCore'][_0x3219af('0x784')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0xe2')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0xe2')]=function(_0x470b76){const _0x383093=_0x3219af;VisuMZ[_0x383093('0x1e6')]['Window_BattleLog_performReflection'][_0x383093('0x448')](this,_0x470b76),this['callNextMethod']();},VisuMZ[_0x3219af('0x1e6')]['Window_BattleLog_performSubstitute']=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x584')],Window_BattleLog['prototype']['performSubstitute']=function(_0x33fa02,_0x150036){const _0x4fef45=_0x3219af;VisuMZ['BattleCore']['Window_BattleLog_performSubstitute'][_0x4fef45('0x448')](this,_0x33fa02,_0x150036),this['callNextMethod']();},VisuMZ[_0x3219af('0x1e6')][_0x3219af('0xbb')]=Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x84c')],Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x84c')]=function(_0xfc25d4){const _0x32a34d=_0x3219af;VisuMZ['BattleCore'][_0x32a34d('0xbb')][_0x32a34d('0x448')](this,_0xfc25d4),this[_0x32a34d('0x39f')]();},Window_BattleLog[_0x3219af('0x3b5')]['performCastAnimation']=function(_0x148d9b,_0x3daf77){const _0x46ff0d=_0x3219af;_0x148d9b['performCastAnimation'](_0x3daf77),this[_0x46ff0d('0x39f')]();},Window_BattleLog[_0x3219af('0x3b5')]['showEnemyAttackAnimation']=function(_0x1f4619,_0x3a1b58){const _0x293f55=_0x3219af,_0x41c986=_0x1f4619[_0x293f55('0x682')]();if(_0x41c986<=0x0){if(_0x293f55('0x4ed')!==_0x293f55('0x78'))SoundManager['playEnemyAttack']();else{function _0x4090cc(){const _0x36e193=_0x293f55;_0x5496d6[_0x36e193('0x1e6')][_0x36e193('0x6d')][_0x36e193('0x448')](this),this['callNextMethod']();}}}else this['showNormalAnimation'](_0x3a1b58,_0x41c986);},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x3cb')]=function(_0x551c2e,_0x5a9da4,_0x361ba2){const _0x7e94e5=_0x3219af,_0x30fa7e=[_0x551c2e][_0x7e94e5('0x1b4')](_0x5a9da4);for(const _0x199bad of _0x30fa7e){if(!_0x199bad)continue;_0x199bad[_0x7e94e5('0x6')](_0x361ba2);}this[_0x7e94e5('0x39f')]();},Window_BattleLog['prototype'][_0x3219af('0x83f')]=function(_0x57e0d2){const _0x5d713d=_0x3219af;this[_0x5d713d('0x859')]=_0x57e0d2;},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x8c')]=function(_0x561899,_0x29564b){const _0xc4d169=_0x3219af;for(const _0x39f6ce of _0x561899){if(!_0x39f6ce)continue;_0x39f6ce['requestMotion'](_0x29564b);}this[_0xc4d169('0x39f')]();},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x387')]=function(_0x3cad1c,_0x37c86a,_0x1529d3,_0x102402,_0x5500e4,_0x5b7d67){const _0x4cf7eb=_0x3219af;_0x3cad1c[_0x4cf7eb('0x417')](_0x37c86a,_0x1529d3,_0x102402,_0x5500e4,_0x5b7d67,-0x1),this['callNextMethod']();},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x716')]=function(_0x520581,_0x5170e8,_0x79b5a1,_0x35ad59,_0x4c505c,_0xbd1821,_0x57db6d){const _0x4823ae=_0x3219af,_0x124d21=Math[_0x4823ae('0x7a2')](..._0x5170e8[_0x4823ae('0x75a')](_0x24ad98=>_0x24ad98[_0x4823ae('0x53f')]()[_0x4823ae('0x5af')]-_0x24ad98['battler']()[_0x4823ae('0x809')]()/0x2)),_0x270998=Math['max'](..._0x5170e8['map'](_0x2297ce=>_0x2297ce[_0x4823ae('0x53f')]()[_0x4823ae('0x5af')]+_0x2297ce['battler']()['mainSpriteWidth']()/0x2)),_0x1a8707=Math['min'](..._0x5170e8[_0x4823ae('0x75a')](_0x1b43d7=>_0x1b43d7['battler']()['_baseY']-_0x1b43d7[_0x4823ae('0x53f')]()['mainSpriteHeight']())),_0x26685a=Math[_0x4823ae('0x794')](..._0x5170e8[_0x4823ae('0x75a')](_0x2e3aa7=>_0x2e3aa7[_0x4823ae('0x53f')]()[_0x4823ae('0x833')])),_0x37552b=_0x5170e8[_0x4823ae('0x686')](_0x2fe0e3=>_0x2fe0e3[_0x4823ae('0x857')]())[_0x4823ae('0x2da')],_0x1532e4=_0x5170e8['filter'](_0x32eea1=>_0x32eea1[_0x4823ae('0xf9')]())['length'];let _0x31f40b=0x0,_0x486f18=0x0;if(_0x79b5a1[_0x4823ae('0x6f1')](/front/i))_0x31f40b=_0x37552b>=_0x1532e4?_0x124d21:_0x270998;else{if(_0x79b5a1['match'](/middle/i)){if(_0x4823ae('0x4c1')===_0x4823ae('0x87b')){function _0x351444(){const _0x430231=_0x4823ae;if(this[_0x430231('0x19a')])this[_0x430231('0x19a')][_0x430231('0x7f5')](_0x14f80e,_0x1bb7dd,_0x495205);}}else _0x31f40b=(_0x124d21+_0x270998)/0x2,_0x57db6d=-0x1;}else _0x79b5a1[_0x4823ae('0x6f1')](/back/i)&&(_0x31f40b=_0x37552b>=_0x1532e4?_0x270998:_0x124d21);}if(_0x79b5a1[_0x4823ae('0x6f1')](/head/i)){if(_0x4823ae('0x3ae')!==_0x4823ae('0x40c'))_0x486f18=_0x1a8707;else{function _0x4207f4(){const _0x4f86cd=_0x4823ae,_0x4186ea=_0x201eeb[_0x4f86cd('0x3b5')][_0x4f86cd('0x72a')]();['default',_0x4f86cd('0x766'),_0x4f86cd('0x82e'),_0x4f86cd('0x216')]['includes'](_0x4186ea)&&(this[_0x4f86cd('0x805')]=0x0);}}}else{if(_0x79b5a1[_0x4823ae('0x6f1')](/center/i)){if(_0x4823ae('0x35b')===_0x4823ae('0x238')){function _0x88f27a(){const _0x22e0aa=_0x4823ae;_0x47d9b1[_0x22e0aa('0x601')]=new _0x922357(this['width'],this[_0x22e0aa('0x1e3')]);}}else _0x486f18=(_0x1a8707+_0x26685a)/0x2;}else _0x79b5a1[_0x4823ae('0x6f1')](/base/i)&&(_0x486f18=_0x26685a);}_0x520581[_0x4823ae('0x417')](_0x31f40b,_0x486f18,_0x35ad59,_0x4c505c,_0xbd1821,_0x57db6d),this[_0x4823ae('0x39f')]();},Window_BattleLog[_0x3219af('0x3b5')][_0x3219af('0x706')]=function(_0x36becb,_0x39bd87,_0x453945){const _0x3d6c42=_0x3219af;for(const _0x5ac6f3 of _0x36becb){if(_0x3d6c42('0x257')!==_0x3d6c42('0x257')){function _0xf05047(){const _0x524b48=_0x3d6c42;this['resizeWindowBorderStyle'](_0x198b98),this[_0x524b48('0x59d')]();}}else{if(!_0x5ac6f3)continue;_0x5ac6f3[_0x3d6c42('0x779')](_0x39bd87,_0x453945);}}this[_0x3d6c42('0x39f')]();};
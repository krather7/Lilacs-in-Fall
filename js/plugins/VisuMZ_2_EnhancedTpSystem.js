//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [EnhancedTP]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enhanced_TP_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MZ users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * Features include all (but not limited to) the following:
 * 
 * * TP Modes that allow actors and enemies to have different ways of
 *   generating TP through battle.
 * * 30 pre-made TP Modes for you to use and/or learn from.
 * * Functionality for skills and items to change a target's TP Mode.
 * * The ability to teach actors new TP modes upon learning new skills.
 * * Unlock new TP Modes from becoming the target of skills and/or items.
 * * Trait Objects (like states) that will enforce a specific TP Mode when
 *   applied.
 * * TP Gauge can flash a variety of colors once a certain percentile range
 *   has been met.
 * * Integrated TP Mode changer for players within Scene_Skill.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * MaxTP Overwrite
 *
 * - There was nothing altering MaxTP before and this plugin offers TP Modes
 * that change up the MaxTP total. The function has been overwritten for more
 * plugin functionality.
 *
 * ---
 *
 * Preserve TP
 *
 * - Preserve TP function has been overwritten so it is no longer determined by
 * the presence of the Preserve TP trait, but instead, determined by whether or
 * not the current TP Mode has TP Preservation as its property. This is to keep
 * the consistency in the TP Modes and to give the game dev more control over
 * this aspect.
 *
 * ---
 * 
 * Initial TP Gain in Battle Reworked
 *
 * - If 'Preserve TP' was off, battlers would normally have a random amount of
 * TP given to them at the start of battle by default. However, there was no
 * place to control this value in the RPG Maker MZ editor itself so this has
 * been overwritten to give you, the game dev, full control over this aspect,
 * and whether or not it requires the 'Preserve TP' flag or not.
 *
 * ---
 *
 * On Damage TP Gain
 *
 * - The on Damage function has been overwritten to remove the default TP gain
 * aspect in favor of custom TP gain aspect granted by the current equipped TP
 * Mode to keep functionality under control.
 *
 * ---
 * 
 * Sprite_Gauge Changes
 * 
 * - The sprite gauge has been changed slightly to allow for flashing gauges.
 * They're separated into different layers now when it comes strictly to a TP
 * gauge. There shouldn't be any noticeable compatibility problems with them
 * unless there are plugins that alter the TP gauge completely.
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
 * === General TP Mode Notetags ===
 *
 * These are TP Mode-related notatags that affect both actors and enemies.
 *
 * ---
 *
 * <TP Mode: name>
 *
 * - Used for: Actor Enemy, State Notetags
 * - Sets the starting TP Mode for this actor/enemy to be 'name'.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Starting TP Modes>
 *  name
 *  name
 *  name
 *  name
 * </Starting TP Modes>
 *
 * - Used for: Actor Notetags
 * - Adds TP Modes to the actor's available list of TP Modes from the start.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Change Target TP Mode: name>
 *
 * <Change User TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target/user's TP Mode to the target TP Mode upon using this
 *   item/skill.
 * - For <Change Target TP Mode: name>, the action must successfully hit the
 *   target in order for the TP Mode to change.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * === Actor-Only TP Mode Notetags ===
 *
 * These are TP Mode-related notetags that only affect actors.
 *
 * ---
 *
 * <Learn TP Mode: name>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Insert multiple copies of this notetag to have the skill learn more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Keep in mind that learning the skill is required for the TP Mode to be
 *   learned. Adding the skill through a trait will not teach the TP Mode.
 *
 * ---
 *
 * <Learn TP Modes>
 *  name
 *  name
 *  name
 * </Learn TP Modes>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Unlock TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Insert multiple copies of this notetag to have the item/skill unlock more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Unlock TP Modes>
 *  name
 *  name
 *  name
 * </Unlock TP Modes>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Force TP Mode: name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the affected battler to use the specific named TP Mode in battle.
 * - Priority is given based the ordering of trait objects if multiple forced
 *   TP Mode effects are present.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
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
 * Actor: Change TP Mode
 * - Changes target actor(s) TP Mode.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock TP Mode
 * - Unlocks TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Modes:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock All TP Modes
 * - Unlocks all TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change TP Mode
 * - Changes target enemy(ies) TP Mode.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected enemy(ies).
 *
 * ---
 *
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Show/Hide TP Mode
 * - Shows/Hides TP Mode from Scene_Skill.
 *
 *   Show TP Mode?:
 *   - Shows/Hides TP Mode in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for the Enhanced TP System plugin. These
 * control the default settings for TP Modes and TP Mode option appearing in
 * Scene_Skill for the player.
 *
 * ---
 *
 * Defaults
 * 
 *   Default TP Mode:
 *   - Which TP mode should actors and enemies have by default?
 * 
 *   Global TP Modes:
 *   - TP Modes available to the all actors to pick from.
 *
 * ---
 *
 * Scene_Skill
 * 
 *   Show TP Mode?:
 *   - Show TP Mode in Scene_Skill by default?
 * 
 *   TP Mode Command:
 *   - The command name format shown in Scene_Skill.
 *   - %1 - TP Text
 * 
 *   TP Mode Icon:
 *   - Icon used for TP Mode shown in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP Modes
 * ============================================================================
 *
 * TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
 * how TP is earned as well as the maximum TP value the actor/enemy can have.
 * Players can switch between TP Modes if granted the option, too.
 *
 * TP Modes can be added, removed, and editted by you the game dev. Each TP
 * Mode will have the following Plugin Parameters for you to adjust:
 *
 * ---
 *
 * General
 * 
 *   TP Mode Name:
 *   - The name for this TP Mode.
 *   - Used for notetag reference.
 * 
 *   Icon:
 *   - Icon used for this TP Mode.
 * 
 *   Help:
 *   - Help description used for this TP Mode.
 *   - %1 - In-game TP vocabulary.
 * 
 *   MaxTP Formula:
 *   - What's the MaxTP for this TP Mode?
 * 
 *   TCR Multiplier:
 *   - Multiplier on how much TP is earned.
 *   - Stacks multiplicatively with TCR.
 * 
 *   Preserve TP?:
 *   - If preserved, carry TP to the next battle.
 *   - If not, TP resets each battle.
 *
 * ---
 * 
 * Gauge
 * 
 *   Flash Gauge?:
 *   - Let this gauge flash once it reaches a certain percentage value.
 *   - Requires VisuMZ_1_SkillsStatesCore!
 * 
 *   Required Rate:
 *   - What rate does this gauge need to be over in order for it to flash?
 * 
 *   Flash Speed:
 *   - How fast should the gauge flash different colors?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   Color Lightness:
 *   - How light should the flash color be?
 *   - Lower numbers are darker. Higher numbers are lighter.
 * 
 * ---
 *
 * TP Formulas > Generic
 * 
 *   Initial TP:
 *   - How much TP is gained at the start of battle?
 * 
 *   Critical Hit:
 *   - How much TP is gained when landing a critical hit?
 * 
 *   Evasion:
 *   - How much TP is gained when evading an action?
 * 
 *   Use Item:
 *   - How much TP is gained when using an item in battle?
 * 
 *   Use Skill:
 *   - How much TP is gained when using a skill in battle that isn't
 *     Attack or Guard?
 *
 * ---
 *
 * TP Formulas > During Regen
 * 
 *   TP Regen:
 *   - How much TP is gained each turn during regeneration?
 * 
 *   Critical HP:
 *   - How much TP is gained when user is in critical HP (25%)
 *     during regeneration.
 * 
 *   Full HP:
 *   - How much TP is gained when user has full HP
 *     during regeneration.
 * 
 *   Critical MP:
 *   - How much TP is gained when user is in critical MP (25%)
 *     during regeneration.
 * 
 *   Full MP:
 *   - How much TP is gained when user has full MP
 *     during regeneration.
 * 
 *   Only Member:
 *   - How much TP is gained when user is the only alive party member
 *     during regeneration.
 *
 * ---
 *
 * TP Formulas > HP Damage
 * 
 *   Take HP Damage:
 *   - How much TP is gained when receiving HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal HP Damage:
 *   - How much TP is gained when dealing HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally HP Damage:
 *   - How much TP is gained when an ally receives HP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > HP Heal
 * 
 *   Take HP Heal:
 *   - How much TP is gained when receiving HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal HP Heal:
 *   - How much TP is gained when dealing HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally HP Heal:
 *   - How much TP is gained when an ally receives HP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Damage
 * 
 *   Take MP Damage:
 *   - How much TP is gained when receiving MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal MP Damage:
 *   - How much TP is gained when dealing MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally MP Damage:
 *   - How much TP is gained when an ally receives MP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Heal
 * 
 *   Take MP Heal:
 *   - How much TP is gained when receiving MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal MP Heal:
 *   - How much TP is gained when dealing MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally MP Heal:
 *   - How much TP is gained when an ally receives MP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > Buffs
 * 
 *   Deal Ally Buff:
 *   - How much TP is gained when user inflicts a buff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Buff:
 *   - How much TP is gained when user inflicts a buff on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Buff:
 *   - How much TP is gained when user gains a buff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Buff:
 *   - How much TP is gained when user gains a buff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Debuffs
 * 
 *   Deal Ally Debuff:
 *   - How much TP is gained when user inflicts a debuff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Debuff:
 *   - How much TP is gained when user inflicts a debuff on an enemy through
 *     an Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Debuff:
 *   - How much TP is gained when user gains a debuff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Debuff:
 *   - How much TP is gained when user gains a debuff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > States
 * 
 *   Deal Ally State:
 *   - How much TP is gained when user inflicts a state on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy State:
 *   - How much TP is gained when user inflicts a state on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally State:
 *   - How much TP is gained when user gains a state from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy State:
 *   - How much TP is gained when user gains a state from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Death
 * 
 *   Ally Death:
 *   - How much TP is gained when an allied member dies.
 *   - Does not matter who the killer is.
 * 
 *   Enemy Death:
 *   - How much TP is gained when an enemy member dies.
 *   - Does not matter who the killer is.
 *
 * ---
 *
 * TP Formulas > Battle
 * 
 *   Win Battle:
 *   - How much TP is gained when the player wins a battle.
 * 
 *   Flee Battle:
 *   - How much TP is gained when the player escapes a battle.
 * 
 *   Lose Battle:
 *   - How much TP is gained when the player loses a battle.
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
 * Version 1.00: October 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTPMode
 * @text Actor: Change TP Mode
 * @desc Changes target actor(s) TP Mode.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected actor(s).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockTPMode
 * @text Actor: Unlock TP Mode
 * @desc Unlocks TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModes:arraystr
 * @text TP Modes
 * @type string[]
 * @desc Change to this TP Mode for selected actor(s).
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockAllTPModes
 * @text Actor: Unlock All TP Modes
 * @desc Unlocks all TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTPMode
 * @text Enemy: Change TP Mode
 * @desc Changes target enemy(ies) TP Mode.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected enemy(ies).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneSkillTpMode
 * @text System: Show/Hide TP Mode
 * @desc Shows/Hides TP Mode from Scene_Skill.
 *
 * @arg Show:eval
 * @text Show TP Mode?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/Hides TP Mode in Scene_Skill.
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
 * @param EnhancedTP
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
 * @desc General settings pertaining to TP.
 * @default {"Defaults":"","DefaultTpMode:str":"Stoic","GlobalTPModes:arraystr":"[\"Stoic\",\"Comrade\",\"Warrior\",\"Healer\"]","SceneSkill":"","ShowTpMode:eval":"true","TpModeCmdName:str":"%1 Mode","TpModeIcon:num":"164"}
 *
 * @param TpMode:arraystruct
 * @text TP Modes
 * @type struct<TpMode>[]
 * @desc TP Modes available in the game.
 * @default ["{\"Name:str\":\"Stoic\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 when receiving damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Comrade\",\"Icon:num\":\"76\",\"Help:json\":\"\\\"Raise %1 whenever allies take damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"20 * user.tcr\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Warrior\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Raise %1 by attacking and dealing HP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Healer\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Raise %1 by healing HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Breaker\",\"Icon:num\":\"171\",\"Help:json\":\"\\\"Raise %1 whenever user deals MP damage\\\\nor receives MP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"50 * (value / Math.max(1, this.mmp)) * user.tcr\",\"DealMpDmg:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Battery\",\"Icon:num\":\"165\",\"Help:json\":\"\\\"Raise %1 whenever use helps an ally restore MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Slayer\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Raise %1 whenever an enemy is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"25 * user.tcr\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Avenger\",\"Icon:num\":\"17\",\"Help:json\":\"\\\"Raise %1 whenever an ally is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"50 * user.tcr\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Winner\",\"Icon:num\":\"87\",\"Help:json\":\"\\\"Raise %1 whenever your party wins a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"20 * user.tcr\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Coward\",\"Icon:num\":\"89\",\"Help:json\":\"\\\"Raise %1 whenever your party escapes from battle\\\\nor loses a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"20 * user.tcr\",\"LoseBattle:str\":\"20 * user.tcr\"}","{\"Name:str\":\"Cautious\",\"Icon:num\":\"32\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"10 * user.tcr\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Thrifty\",\"Icon:num\":\"33\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"10 * user.tcr\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Daredevil\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"16 * user.tcr\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Splurger\",\"Icon:num\":\"49\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"16 * user.tcr\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Caster\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Raise %1 whenever user performs a skill.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"16 * user.tcr\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Alchemist\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Raise %1 whenever user uses an item.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"16 * user.tcr\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Enchanter\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a buff\\\\nor status effect to an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"16 * user.tcr\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"16 * user.tcr\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Tactician\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a debuff\\\\nor status effect to a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"16 * user.tcr\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"16 * user.tcr\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Boosted\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Raise %1 whenever user receives a buff or\\\\nstatus effect from an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"16 * user.tcr\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"16 * user.tcr\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Sufferer\",\"Icon:num\":\"2\",\"Help:json\":\"\\\"Raise %1 whenever user receives a debuff or\\\\nstatus effect from a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"16 * user.tcr\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"16 * user.tcr\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Striker\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 whenever user lands a critical hit.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"16 * user.tcr\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Dancer\",\"Icon:num\":\"82\",\"Help:json\":\"\\\"Raise %1 whenever user evades an attack.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"16 * user.tcr\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Loner\",\"Icon:num\":\"166\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn as the\\\\nlast remaining alive member.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"16 * user.tcr\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Initiator\",\"Icon:num\":\"164\",\"Help:json\":\"\\\"User gains %1 at the start of battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20 * user.tcr\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Charger\",\"Icon:num\":\"311\",\"Help:json\":\"\\\"User loses all %1 at the start of battle but\\\\ngains more each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"-1 * user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"2 ** user.turnCount() * user.tcr\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Berserker\",\"Icon:num\":\"5\",\"Help:json\":\"\\\"User starts with full %1 at the start of battle,\\\\nbut loses 20 %1 each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"-20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Maximizer\",\"Icon:num\":\"239\",\"Help:json\":\"\\\"User's Max%1 is raised to 300 gains %1 from\\\\ndealing/receiving HP damage at a slower rate.\\\"\",\"MaxFormula:str\":\"300\",\"MultiplierTCR:num\":\"0.5\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Minimizer\",\"Icon:num\":\"236\",\"Help:json\":\"\\\"User's Max%1 is lowered to 50 gains %1 from\\\\ndealing/receiving HP damage at a faster rate.\\\"\",\"MaxFormula:str\":\"50\",\"MultiplierTCR:num\":\"2.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Recycler\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"User's Max%1 becomes 20. User starts with 20 %1\\\\nand regenerates 20 %1 each turn.\\\"\",\"MaxFormula:str\":\"20\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Assassin\",\"Icon:num\":\"10\",\"Help:json\":\"\\\"User's Max%1 becomes 500. User starts with 500 %1,\\\\nbut receiving healing or damage halves user's %1.\\\"\",\"MaxFormula:str\":\"500\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"500\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"user.tp / -2\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"user.tp / -2\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}"]
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
 * @param Defaults
 *
 * @param DefaultTpMode:str
 * @text Default TP Mode
 * @parent Defaults
 * @desc Which TP mode should actors and enemies have by default?
 * @default Stoic
 *
 * @param GlobalTPModes:arraystr
 * @text Global TP Modes
 * @type string[]
 * @parent Defaults
 * @desc TP Modes available to the all actors to pick from.
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @param SceneSkill
 * @text Scene_Skill
 *
 * @param ShowTpMode:eval
 * @text Show TP Mode?
 * @parent SceneSkill
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show TP Mode in Scene_Skill by default?
 * @default true
 *
 * @param TpModeCmdName:str 
 * @text TP Mode Command
 * @parent SceneSkill
 * @desc The command name format shown in Scene_Skill.
 * %1 - TP Text
 * @default %1 Mode
 *
 * @param TpModeIcon:num
 * @text TP Mode Icon
 * @parent SceneSkill
 * @desc Icon used for TP Mode shown in Scene_Skill.
 * @default 164
 *
 */
/* ----------------------------------------------------------------------------
 * TP Modes
 * ----------------------------------------------------------------------------
 */
/*~struct~TpMode:
 *
 * @param Name:str 
 * @text TP Mode Name
 * @desc The name for this TP Mode.
 * Used for notetag reference.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent Name:str
 * @desc Icon used for this TP Mode.
 * @default 160
 *
 * @param Help:json
 * @text Help
 * @parent Name:str
 * @type note
 * @desc Help description used for this TP Mode.
 * %1 - In-game TP vocabulary.
 * @default "Help Line 1\nHelp Line 2"
 *
 * @param MaxFormula:str
 * @text MaxTP Formula
 * @parent Name:str
 * @desc What's the MaxTP for this TP Mode?
 * @default 100
 *
 * @param MultiplierTCR:num
 * @text TCR Multiplier
 * @parent Name:str
 * @desc Multiplier on how much TP is earned.
 * Stacks multiplicatively with TCR.
 * @default 1.0
 *
 * @param Preserve:eval
 * @text Preserve TP?
 * @parent Name:str
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If preserved, carry TP to the next battle.
 * If not, TP resets each battle.
 * @default true
 *
 * @param Gauge
 *
 * @param FlashGauge:eval
 * @text Flash Gauge?
 * @parent Gauge
 * @type boolean
 * @on Flash
 * @off Don't Flash
 * @desc Let this gauge flash once it reaches a certain percentage 
 * value. Requires VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param FlashRequirement:num
 * @text Required Rate
 * @parent Gauge
 * @desc What rate does this gauge need to be over in order for it to flash?
 * @default 1.0
 *
 * @param FlashSpeed:num
 * @text Flash Speed
 * @parent Gauge
 * @type number
 * @min 1
 * @max 255
 * @desc How fast should the gauge flash different colors?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param FlashLightness:num
 * @text Color Lightness
 * @parent Gauge
 * @type number
 * @min 0
 * @max 255
 * @desc How light should the flash color be?
 * Lower numbers are darker. Higher numbers are lighter.
 * @default 160
 *
 * @param Formulas
 * @text TP Formulas
 *
 * @param Generic
 * @parent Formulas
 *
 * @param Initial:str
 * @text Initial TP
 * @parent Generic
 * @desc How much TP is gained at the start of battle?
 * @default 0
 *
 * @param CriticalHit:str
 * @text Critical Hit
 * @parent Generic
 * @desc How much TP is gained when landing a critical hit?
 * @default 0
 *
 * @param Evasion:str
 * @text Evasion
 * @parent Generic
 * @desc How much TP is gained when evading an action?
 * @default 0
 *
 * @param UseItem:str
 * @text Use Item
 * @parent Generic
 * @desc How much TP is gained when using an item in battle?
 * @default 0
 *
 * @param UseSkill:str
 * @text Use Skill
 * @parent Generic
 * @desc How much TP is gained when using a skill in battle that isn't Attack or Guard?
 * @default 0
 *
 * @param Regen
 * @text During Regen
 * @parent Formulas
 *
 * @param TpRegen:str
 * @text TP Regen
 * @parent Regen
 * @desc How much TP is gained each turn during regeneration?
 * @default 0
 *
 * @param CriticalHp:str
 * @text Critical HP
 * @parent Regen
 * @desc How much TP is gained when user is in critical HP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullHp:str
 * @text Full HP
 * @parent Regen
 * @desc How much TP is gained when user has full HP
 * during regeneration.
 * @default 0
 *
 * @param CriticalMp:str
 * @text Critical MP
 * @parent Regen
 * @desc How much TP is gained when user is in critical MP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullMp:str
 * @text Full MP
 * @parent Regen
 * @desc How much TP is gained when user has full MP
 * during regeneration.
 * @default 0
 *
 * @param OnlyMember:str
 * @text Only Member
 * @parent Regen
 * @desc How much TP is gained when user is the only alive party member during regeneration.
 * @default 0
 *
 * @param HPDmg
 * @text HP Damage
 * @parent Formulas
 *
 * @param TakeHpDmg:str
 * @text Take HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when receiving HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpDmg:str
 * @text Deal HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when dealing HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpDmg:str
 * @text Ally HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when an ally receives HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param HPHeal
 * @text HP Heal
 * @parent Formulas
 *
 * @param TakeHpHeal:str
 * @text Take HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when receiving HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpHeal:str
 * @text Deal HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when dealing HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpHeal:str
 * @text Ally HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when an ally receives HP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPDmg
 * @text MP Damage
 * @parent Formulas
 *
 * @param TakeMpDmg:str
 * @text Take MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when receiving MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpDmg:str
 * @text Deal MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when dealing MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpDmg:str
 * @text Ally MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when an ally receives MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPHeal
 * @text MP Heal
 * @parent Formulas
 *
 * @param TakeMpHeal:str
 * @text Take MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when receiving MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpHeal:str
 * @text Deal MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when dealing MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpHeal:str
 * @text Ally MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when an ally receives MP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param Buffs
 * @parent Formulas
 *
 * @param DealAllyBuff:str
 * @text Deal Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyBuff:str
 * @text Deal Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyBuff:str
 * @text Gain Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyBuff:str
 * @text Gain Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Debuffs
 * @parent Formulas
 *
 * @param DealAllyDebuff:str
 * @text Deal Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyDebuff:str
 * @text Deal Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyDebuff:str
 * @text Gain Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyDebuff:str
 * @text Gain Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param States
 * @parent Formulas
 *
 * @param DealAllyState:str
 * @text Deal Ally State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyState:str
 * @text Deal Enemy State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyState:str
 * @text Gain Ally State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyState:str
 * @text Gain Enemy State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Death
 * @parent Formulas
 *
 * @param KillAlly:str
 * @text Ally Death
 * @parent Death
 * @desc How much TP is gained when an allied member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param KillEnemy:str
 * @text Enemy Death
 * @parent Death
 * @desc How much TP is gained when an enemy member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param Battle
 * @parent Formulas
 *
 * @param WinBattle:str
 * @text Win Battle
 * @parent Battle
 * @desc How much TP is gained when the player wins a battle.
 * @default 0
 *
 * @param FleeBattle:str
 * @text Flee Battle
 * @parent Battle
 * @desc How much TP is gained when the player escapes a battle.
 * @default 0
 *
 * @param LoseBattle:str
 * @text Lose Battle
 * @parent Battle
 * @desc How much TP is gained when the player loses a battle.
 * @default 0
 *
 */
//=============================================================================

const _0x4cd5=['Enemies','DealHpHeal','SBoJa','learnTpMode','guardSkillId','applyGlobal','mainAreaHeight','DealMpHeal','AllyMpDmg','TpModes','_tp','Game_System_initialize','Settings','_actor','TakeMpDmg','applyEnhancedTP','KYxMu','item','WinBattle','FullHp','EnemyChangeTPMode','_tpGaugeSprite','MultiplierTCR','skillIsNotAttackGuard','setBlendColor','zdonm','tpMode','exit','NUM','chargeTpByDamage','Game_Actor_learnSkill','XJpSw','trim','kdDmx','setHandler','FlashRequirement','tpRate','setStypeId','isTpModeCommandVisible','maxItems','Icon','xVfnJ','lomoz','refresh','regenerateTp','commandTpMode','includes','map','ActorUnlockTPMode','wrjHA','ActorChangeTPMode','_tpTextSprite','Sprite_Gauge_redraw','KillAlly','_tpGaugeBack','useItem','TakeHpDmg','learnAvailableActorTpModes','Sprite_Gauge_setup','_statusWindow','itemLineRect','tpModeValue','isSkill','DealHpDmg','fXsEy','selectLast','redraw','pOfOi','maxTp','missed','match','DealEnemyBuff','processDefeat','itemEffectAddDebuff','executeMpDamage','updateEnhancedTp','_tpModeWindow','Scene_Skill_createSkillTypeWindow','OnlyMember','EkqVy','name','gradientFillRect','GainAllyBuff','_data','UseItem','convertEnhancedTpFunctions','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','QNClO','GainEnemyDebuff','Sprite_Gauge_drawFullGauge','tpCostColor','applyItemUserEffect','drawItem','Scene_Skill_create','subject','setTpModeInSceneSkill','clamp','Game_Battler_regenerateTp','gaugeRate','availableTpModes','KillEnemy','push','JSON','_tpModes','drawText','onTpModeOk','tpGaugeFlashSpeed','Game_Action_apply','learnAvailablePartyTpModes','drawTpMode','deathStateId','enemy','Sprite_Gauge_update','onBattleStart','_skillTypeWindow','_hp','GlobalTPModes','sortTpModes','isTpGaugeFlashing','isPreserveTp','LoseBattle','shcrR','_statusType','iconHeight','toUpperCase','critical','onChangeTpMode','Game_Action_itemEffectAddState','BattleManager_processVictory','Name','setActor','CriticalHit','iconWidth','TakeMpHeal','itemAt','floor','target','gaugeColor2','drawGaugeRect','show','Actors','ARRAYNUM','TpModeCmdName','Game_Action_itemEffectAddDebuff','onEscapeSuccess','DealAllyDebuff','Scene_Boot_onDatabaseLoaded','DefaultTpMode','GainEnemyBuff','initTpModes','success','FlashLightness','EnhancedTP','apply','bind','gainSilentTp','learnSkillEnhancedTP','Game_BattlerBase_isPreserveTp','length','ARRAYJSON','DqCYC','Window_SkillType_makeCommandList','refreshActor','min','Game_Action_executeMpDamage','DealAllyState','defaultTpMode','Game_Party_initialize','eAiKM','opponentsUnit','resetTextColor','Game_Action_applyGlobal','createSkillTypeWindow','tpModeWindowRect','remove','UhENK','IxmNs','General','mmFfe','createTpGaugeBitmaps','forceSelect','Window_SkillList_setStypeId','SceneSkillTpMode','note','DealAllyBuff','executeHpDamage','_tpMode_SceneSkill','PahpK','changeTpMode','evkBa','addState','registerCommand','BattleManager_processDefeat','parse','max','FfvPf','itemEffectAddBuff','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','itemEffectAddState','redrawEnhancedTp','colSpacing','mhp','\x5cI[%1]%2','friendsUnit','create','Game_Action_executeHpDamage','onTpModeCancel','STR','Game_Battler_onBattleStart','makeCommandList','sparam','TPModeName','scrollTo','VisuMZ_1_SkillsStatesCore','setHelpWindow','AllyHpHeal','DealMpDmg','cpVtq','gaugeBackColor','leader','addCommand','NDSmA','ShowTpMode','hide','return\x200','CriticalHp','playOkSound','update','DealEnemyState','tpGaugeFlashLightness','status','BattleManager_onEscapeSuccess','DealEnemyDebuff','Show','GainAllyDebuff','FullMp','ARRAYSTR','initialize','ARRAYEVAL','height','initEnhancedTP','Game_Action_itemEffectAddBuff','Drxsp','AllyHpDmg','Scene_Skill_refreshActor','xEumI','GainAllyState','setFrame','Sprite_Gauge_drawGaugeRect','Game_Battler_addState','isActor','width','zptWz','ConvertParams','gainTpFromTpMode','FleeBattle','AllyMpHeal','applyItemEnhancedTPEffect','bitmap','Game_Action_applyItemUserEffect','Evasion','TpRegen','TPModes','kPBPM','parameters','tpModes','mPVXL','FlashSpeed','actor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Initial','traitObjects','fillRect','ActorUnlockAllTPModes','abs','MaxFormulaFunc','createTpModeWindow','clear','applyGlobalEnhancedTP','user','makeItemList','_scene','mmp','process_VisuMZ_EnhancedTP_Settings','%1Func','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Preserve','TakeHpHeal','TpModeOrder','call','addWindow','drawFullGauge','_tpMode','FUNC','activate','prototype','split','addChild','_cache','addTpModeCommand','index','aliveMembers','setHue','onDatabaseLoaded','_availableTpModes','tpModesCommandIcon','showTpModeInSceneSkill','drawFullGaugeEnhancedTp','changeTextColor','result','_mp','TDldo','Game_Actor_setup','processVictory','_battler','format','Game_BattlerBase_maxTp','STRUCT','setup','description','gaugeColor1','LnVGq','YtkSc','members','FlashGauge','Game_BattlerBase_sparam'];(function(_0x28a28d,_0x4cd5fe){const _0x5dc2f1=function(_0x5f52d6){while(--_0x5f52d6){_0x28a28d['push'](_0x28a28d['shift']());}};_0x5dc2f1(++_0x4cd5fe);}(_0x4cd5,0x1a3));const _0x5dc2=function(_0x28a28d,_0x4cd5fe){_0x28a28d=_0x28a28d-0x0;let _0x5dc2f1=_0x4cd5[_0x28a28d];return _0x5dc2f1;};const _0x5a9f05=_0x5dc2;var label=_0x5a9f05('0x3b'),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3091fe){const _0x3d41e3=_0x5a9f05;return _0x3091fe[_0x3d41e3('0x89')]&&_0x3091fe[_0x3d41e3('0xe2')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5a9f05('0xf5')]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5a9f05('0xa0')]=function(_0x35472c,_0x2e3230){const _0x526c63=_0x5a9f05;for(const _0x2e69c5 in _0x2e3230){if(_0x2e69c5[_0x526c63('0x12f')](/(.*):(.*)/i)){const _0x56b6b9=String(RegExp['$1']),_0x2f9e51=String(RegExp['$2'])[_0x526c63('0x1f')]()[_0x526c63('0x109')]();let _0xf2e54b,_0x4f1bde,_0x5318bc;switch(_0x2f9e51){case _0x526c63('0x105'):_0xf2e54b=_0x2e3230[_0x2e69c5]!==''?Number(_0x2e3230[_0x2e69c5]):0x0;break;case _0x526c63('0x30'):_0x4f1bde=_0x2e3230[_0x2e69c5]!==''?JSON[_0x526c63('0x64')](_0x2e3230[_0x2e69c5]):[],_0xf2e54b=_0x4f1bde[_0x526c63('0x118')](_0x3f8061=>Number(_0x3f8061));break;case'EVAL':_0xf2e54b=_0x2e3230[_0x2e69c5]!==''?eval(_0x2e3230[_0x2e69c5]):null;break;case _0x526c63('0x91'):_0x4f1bde=_0x2e3230[_0x2e69c5]!==''?JSON[_0x526c63('0x64')](_0x2e3230[_0x2e69c5]):[],_0xf2e54b=_0x4f1bde[_0x526c63('0x118')](_0x1d73d8=>eval(_0x1d73d8));break;case _0x526c63('0x9'):_0xf2e54b=_0x2e3230[_0x2e69c5]!==''?JSON[_0x526c63('0x64')](_0x2e3230[_0x2e69c5]):'';break;case _0x526c63('0x42'):_0x4f1bde=_0x2e3230[_0x2e69c5]!==''?JSON[_0x526c63('0x64')](_0x2e3230[_0x2e69c5]):[],_0xf2e54b=_0x4f1bde['map'](_0x591e7e=>JSON[_0x526c63('0x64')](_0x591e7e));break;case _0x526c63('0xc8'):_0xf2e54b=_0x2e3230[_0x2e69c5]!==''?new Function(JSON[_0x526c63('0x64')](_0x2e3230[_0x2e69c5])):new Function(_0x526c63('0x83'));break;case'ARRAYFUNC':_0x4f1bde=_0x2e3230[_0x2e69c5]!==''?JSON['parse'](_0x2e3230[_0x2e69c5]):[],_0xf2e54b=_0x4f1bde[_0x526c63('0x118')](_0xaa648f=>new Function(JSON[_0x526c63('0x64')](_0xaa648f)));break;case _0x526c63('0x72'):_0xf2e54b=_0x2e3230[_0x2e69c5]!==''?String(_0x2e3230[_0x2e69c5]):'';break;case _0x526c63('0x8f'):_0x4f1bde=_0x2e3230[_0x2e69c5]!==''?JSON[_0x526c63('0x64')](_0x2e3230[_0x2e69c5]):[],_0xf2e54b=_0x4f1bde[_0x526c63('0x118')](_0x28e5be=>String(_0x28e5be));break;case _0x526c63('0xe0'):_0x5318bc=_0x2e3230[_0x2e69c5]!==''?JSON[_0x526c63('0x64')](_0x2e3230[_0x2e69c5]):{},_0xf2e54b=VisuMZ[_0x526c63('0xa0')]({},_0x5318bc);break;case'ARRAYSTRUCT':_0x4f1bde=_0x2e3230[_0x2e69c5]!==''?JSON['parse'](_0x2e3230[_0x2e69c5]):[],_0xf2e54b=_0x4f1bde['map'](_0x5239ee=>VisuMZ[_0x526c63('0xa0')]({},JSON['parse'](_0x5239ee)));break;default:continue;}_0x35472c[_0x56b6b9]=_0xf2e54b;}}return _0x35472c;},(_0x422039=>{const _0x4c695e=_0x5a9f05,_0xad0ac7=_0x422039[_0x4c695e('0x139')];for(const _0x1d2b55 of dependencies){if(_0x4c695e('0x53')!=='wRZDG'){if(!Imported[_0x1d2b55]){if(_0x4c695e('0x129')==='fXsEy'){alert(_0x4c695e('0x13f')[_0x4c695e('0xde')](_0xad0ac7,_0x1d2b55)),SceneManager[_0x4c695e('0x104')]();break;}else{function _0x2b54ea(){const _0x2505c8=_0x4c695e;return this[_0x2505c8('0x13c')]&&_0x5279ac>=0x0?this['_data'][_0x8f1ed8]:null;}}}}else{function _0x50e371(){const _0x3fe5c2=_0x4c695e;_0x4cfaff[_0x3fe5c2('0x3b')]['Game_Actor_learnSkill']['call'](this,_0x273c8f),this[_0x3fe5c2('0x3f')](_0x241e95);}}}const _0x57a5e6=_0x422039[_0x4c695e('0xe2')];if(_0x57a5e6[_0x4c695e('0x12f')](/\[Version[ ](.*?)\]/i)){if('cpVtq'===_0x4c695e('0x7c')){const _0x51bb39=Number(RegExp['$1']);_0x51bb39!==VisuMZ[label]['version']&&(alert(_0x4c695e('0x68')[_0x4c695e('0xde')](_0xad0ac7,_0x51bb39)),SceneManager['exit']());}else{function _0x2fede7(){const _0x588d00=_0x4c695e;this[_0x588d00('0xa1')](_0x588d00('0x137'),this,0x0);}}}if(_0x57a5e6[_0x4c695e('0x12f')](/\[Tier[ ](\d+)\]/i)){if(_0x4c695e('0x11a')===_0x4c695e('0x102')){function _0x28979e(){const _0x5637ff=_0x4c695e;_0x3e6fd8=_0x205bae['abs'](_0x2508f9),_0x2fb800[_0x5637ff('0xa1')](_0x5637ff('0x28'),_0x4b3ee6,_0xf7980b),_0x48df57[_0x5637ff('0xa1')](_0x5637ff('0xf0'),_0x2a4684,_0x524a38),_0xe80e72['friendsUnit']()[_0x5637ff('0xa1')](_0x5637ff('0xa3'),_0x13d1b3,_0x597962);}}else{const _0x53e2d6=Number(RegExp['$1']);if(_0x53e2d6<tier){if('SBoJa'===_0x4c695e('0xeb'))alert(_0x4c695e('0xc0')[_0x4c695e('0xde')](_0xad0ac7,_0x53e2d6,tier)),SceneManager[_0x4c695e('0x104')]();else{function _0x1351c4(){const _0x237232=_0x4c695e;this[_0x237232('0x90')](...arguments);}}}else tier=Math[_0x4c695e('0x65')](_0x53e2d6,tier);}}VisuMZ[_0x4c695e('0xa0')](VisuMZ[label][_0x4c695e('0xf5')],_0x422039[_0x4c695e('0xab')]);})(pluginData),PluginManager[_0x5a9f05('0x62')](pluginData[_0x5a9f05('0x139')],_0x5a9f05('0x11b'),_0x50802a=>{const _0x55aba4=_0x5a9f05;VisuMZ[_0x55aba4('0xa0')](_0x50802a,_0x50802a);const _0x10230e=_0x50802a[_0x55aba4('0x2f')][_0x55aba4('0x118')](_0x5da9a4=>$gameActors[_0x55aba4('0xaf')](_0x5da9a4))[_0x55aba4('0x51')](null),_0x4b93b9=_0x50802a[_0x55aba4('0x76')];for(const _0x1366e5 of _0x10230e){if(!_0x1366e5)continue;_0x1366e5['changeTpMode'](_0x4b93b9);}}),PluginManager[_0x5a9f05('0x62')](pluginData[_0x5a9f05('0x139')],_0x5a9f05('0x119'),_0x1360a9=>{const _0x5d8679=_0x5a9f05;VisuMZ['ConvertParams'](_0x1360a9,_0x1360a9);const _0x3aa83d=_0x1360a9[_0x5d8679('0x2f')][_0x5d8679('0x118')](_0x1fed48=>$gameActors[_0x5d8679('0xaf')](_0x1fed48))['remove'](null),_0x58b5a3=_0x1360a9[_0x5d8679('0xa9')];for(const _0x5d8d70 of _0x3aa83d){if(!_0x5d8d70)continue;for(const _0x1149a6 of _0x58b5a3){_0x5d8d70['learnTpMode'](_0x1149a6);}}}),PluginManager[_0x5a9f05('0x62')](pluginData['name'],_0x5a9f05('0xb4'),_0x2f915b=>{const _0x34f337=_0x5a9f05;VisuMZ[_0x34f337('0xa0')](_0x2f915b,_0x2f915b);const _0x493d5d=_0x2f915b['Actors'][_0x34f337('0x118')](_0x3c31f6=>$gameActors[_0x34f337('0xaf')](_0x3c31f6))[_0x34f337('0x51')](null),_0x23716d=VisuMZ[_0x34f337('0x3b')][_0x34f337('0xc3')];for(const _0x2789c9 of _0x493d5d){if(!_0x2789c9)continue;for(const _0x4fe0bf of _0x23716d){_0x2789c9[_0x34f337('0xec')](_0x4fe0bf);}}}),PluginManager[_0x5a9f05('0x62')](pluginData['name'],_0x5a9f05('0xfd'),_0x4b8966=>{const _0x31196e=_0x5a9f05;VisuMZ['ConvertParams'](_0x4b8966,_0x4b8966);const _0x7a605b=_0x4b8966[_0x31196e('0xe9')][_0x31196e('0x118')](_0x122809=>$gameTroop[_0x31196e('0xe6')]()[_0x122809])['remove'](null),_0xe6c422=_0x4b8966[_0x31196e('0x76')];for(const _0x4297f6 of _0x7a605b){if(!_0x4297f6)continue;_0x4297f6[_0x31196e('0x5f')](_0xe6c422);}}),PluginManager['registerCommand'](pluginData[_0x5a9f05('0x139')],_0x5a9f05('0x59'),_0x2dc5bb=>{const _0x28b526=_0x5a9f05;VisuMZ[_0x28b526('0xa0')](_0x2dc5bb,_0x2dc5bb),$gameSystem[_0x28b526('0x2')](_0x2dc5bb[_0x28b526('0x8c')]);}),VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x35')]=Scene_Boot[_0x5a9f05('0xca')][_0x5a9f05('0xd2')],Scene_Boot['prototype'][_0x5a9f05('0xd2')]=function(){const _0x5f5379=_0x5a9f05;VisuMZ[_0x5f5379('0x3b')][_0x5f5379('0x35')]['call'](this),this['process_VisuMZ_EnhancedTP_Settings']();},Scene_Boot['prototype'][_0x5a9f05('0xbe')]=function(){const _0x5234dc=_0x5a9f05;VisuMZ[_0x5234dc('0x3b')][_0x5234dc('0xf2')]={},VisuMZ[_0x5234dc('0x3b')][_0x5234dc('0xc3')]=[];for(const _0x59536b of VisuMZ[_0x5234dc('0x3b')][_0x5234dc('0xf5')]['TpMode']){if(_0x5234dc('0xe4')==='hYMPu'){function _0x28eb5e(){const _0xf21e75=_0x5234dc;this['_tpTextSprite'][_0xf21e75('0xa5')]=this['bitmap'];}}else{if(!_0x59536b)continue;_0x59536b['description']=_0x59536b['Help'][_0x5234dc('0xde')](TextManager['tp']),this[_0x5234dc('0x13e')](_0x59536b);const _0x34ff84=_0x59536b[_0x5234dc('0x24')][_0x5234dc('0x1f')]()[_0x5234dc('0x109')]();VisuMZ['EnhancedTP']['TpModes'][_0x34ff84]=_0x59536b,VisuMZ[_0x5234dc('0x3b')]['TpModeOrder'][_0x5234dc('0x8')](_0x34ff84);}}},Scene_Boot[_0x5a9f05('0xca')][_0x5a9f05('0x13e')]=function(_0x2d179b){const _0x364afc=_0x5a9f05,_0x26c4fc=['MaxFormula','Initial',_0x364afc('0x26'),_0x364afc('0xa7'),'UseItem','UseSkill',_0x364afc('0xa8'),_0x364afc('0x84'),_0x364afc('0xfc'),'CriticalMp',_0x364afc('0x8e'),_0x364afc('0x137'),_0x364afc('0x121'),_0x364afc('0x128'),_0x364afc('0x96'),'TakeHpHeal',_0x364afc('0xea'),'AllyHpHeal',_0x364afc('0xf7'),_0x364afc('0x7b'),'AllyMpDmg',_0x364afc('0x28'),'DealMpHeal',_0x364afc('0xa3'),_0x364afc('0x5b'),_0x364afc('0x130'),_0x364afc('0x13b'),_0x364afc('0x37'),_0x364afc('0x34'),_0x364afc('0x8b'),_0x364afc('0x8d'),_0x364afc('0x141'),_0x364afc('0x48'),_0x364afc('0x87'),_0x364afc('0x99'),'GainEnemyState',_0x364afc('0x11e'),'KillEnemy',_0x364afc('0xfb'),_0x364afc('0xa2'),_0x364afc('0x1b')];for(const _0x1a89d5 of _0x26c4fc){const _0x296c7b=_0x364afc('0xb0')[_0x364afc('0xde')](_0x2d179b[_0x1a89d5]);_0x2d179b[_0x364afc('0xbf')[_0x364afc('0xde')](_0x1a89d5)]=new Function(_0x364afc('0xba'),_0x364afc('0x2b'),'value',_0x296c7b);}},TextManager['tpModesCommandText']=VisuMZ['EnhancedTP'][_0x5a9f05('0xf5')][_0x5a9f05('0x54')][_0x5a9f05('0x31')],ImageManager['tpModesCommandIcon']=VisuMZ['EnhancedTP'][_0x5a9f05('0xf5')]['General']['TpModeIcon'],VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x23')]=BattleManager[_0x5a9f05('0xdc')],BattleManager[_0x5a9f05('0xdc')]=function(){const _0x5dd9a1=_0x5a9f05;VisuMZ['EnhancedTP'][_0x5dd9a1('0x23')][_0x5dd9a1('0xc4')](this),$gameParty['gainTpFromTpMode'](_0x5dd9a1('0xfb'),$gameParty[_0x5dd9a1('0x7e')](),0x0);},VisuMZ[_0x5a9f05('0x3b')]['BattleManager_onEscapeSuccess']=BattleManager[_0x5a9f05('0x33')],BattleManager[_0x5a9f05('0x33')]=function(){const _0xaa5f8=_0x5a9f05;VisuMZ['EnhancedTP'][_0xaa5f8('0x8a')][_0xaa5f8('0xc4')](this),$gameParty['gainTpFromTpMode']('FleeBattle',$gameParty[_0xaa5f8('0x7e')](),0x0);},VisuMZ['EnhancedTP'][_0x5a9f05('0x63')]=BattleManager[_0x5a9f05('0x131')],BattleManager['processDefeat']=function(){const _0x111873=_0x5a9f05;VisuMZ[_0x111873('0x3b')][_0x111873('0x63')][_0x111873('0xc4')](this),$gameParty['gainTpFromTpMode']('LoseBattle',$gameParty[_0x111873('0x7e')](),0x0);},VisuMZ[_0x5a9f05('0x3b')]['Game_System_initialize']=Game_System[_0x5a9f05('0xca')][_0x5a9f05('0x90')],Game_System[_0x5a9f05('0xca')][_0x5a9f05('0x90')]=function(){const _0x5f229a=_0x5a9f05;VisuMZ[_0x5f229a('0x3b')][_0x5f229a('0xf4')][_0x5f229a('0xc4')](this),this[_0x5f229a('0x93')]();},Game_System[_0x5a9f05('0xca')][_0x5a9f05('0x93')]=function(){const _0x3ccaff=_0x5a9f05;this['_tpMode_SceneSkill']=VisuMZ[_0x3ccaff('0x3b')][_0x3ccaff('0xf5')][_0x3ccaff('0x54')][_0x3ccaff('0x81')];},Game_System[_0x5a9f05('0xca')][_0x5a9f05('0xd5')]=function(){const _0xeaf7b2=_0x5a9f05;if(this[_0xeaf7b2('0x5d')]===undefined)this[_0xeaf7b2('0x93')]();return this['_tpMode_SceneSkill'];},Game_System[_0x5a9f05('0xca')][_0x5a9f05('0x2')]=function(_0x56aca3){const _0x5d5d0c=_0x5a9f05;if(this[_0x5d5d0c('0x5d')]===undefined)this['initEnhancedTP']();this[_0x5d5d0c('0x5d')]=_0x56aca3;},VisuMZ['EnhancedTP'][_0x5a9f05('0xe')]=Game_Action[_0x5a9f05('0xca')]['apply'],Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0x3c')]=function(_0x2a0dd4){const _0x569bcf=_0x5a9f05;VisuMZ[_0x569bcf('0x3b')][_0x569bcf('0xe')][_0x569bcf('0xc4')](this,_0x2a0dd4),this[_0x569bcf('0xf8')](_0x2a0dd4);},Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0xf8')]=function(_0x21bb74){const _0x580ba0=_0x5a9f05,_0x299bca=_0x21bb74[_0x580ba0('0xd8')]();_0x299bca[_0x580ba0('0x20')]&&this[_0x580ba0('0x1')]()['gainTpFromTpMode'](_0x580ba0('0x26'),_0x21bb74,0x0),(_0x299bca['evaded']||_0x299bca[_0x580ba0('0x12e')])&&_0x21bb74[_0x580ba0('0xa1')]('Evasion',_0x21bb74,0x0);},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x70')]=Game_Action[_0x5a9f05('0xca')]['executeHpDamage'],Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0x5c')]=function(_0x3830ad,_0x4aa60b){const _0x4ebc1c=_0x5a9f05;VisuMZ[_0x4ebc1c('0x3b')]['Game_Action_executeHpDamage']['call'](this,_0x3830ad,_0x4aa60b);const _0x4e4615=this[_0x4ebc1c('0x1')]();if(_0x4aa60b>0x0)_0x3830ad[_0x4ebc1c('0xa1')](_0x4ebc1c('0x121'),_0x3830ad,_0x4aa60b),_0x4e4615[_0x4ebc1c('0xa1')]('DealHpDmg',_0x3830ad,_0x4aa60b),_0x3830ad['friendsUnit']()[_0x4ebc1c('0xa1')](_0x4ebc1c('0x96'),_0x3830ad,_0x4aa60b);else{if(_0x4ebc1c('0x80')!=='NDSmA'){function _0x26710f(){const _0x1f4afb=_0x4ebc1c;if(!_0x151dd0['VisuMZ_1_SkillsStatesCore'])return![];const _0x3295cb=this[_0x1f4afb('0x103')]();if(!_0x3295cb)return![];if(!_0x3295cb[_0x1f4afb('0xe7')])return![];const _0x44270e=_0x3295cb[_0x1f4afb('0x10c')]||0x0;return this[_0x1f4afb('0x10d')]()>=_0x44270e;}}else _0x4aa60b=Math[_0x4ebc1c('0xb5')](_0x4aa60b),_0x3830ad[_0x4ebc1c('0xa1')](_0x4ebc1c('0xc2'),_0x3830ad,_0x4aa60b),_0x4e4615[_0x4ebc1c('0xa1')](_0x4ebc1c('0xea'),_0x3830ad,_0x4aa60b),_0x3830ad['friendsUnit']()[_0x4ebc1c('0xa1')](_0x4ebc1c('0x7a'),_0x3830ad,_0x4aa60b);}},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x47')]=Game_Action['prototype']['executeMpDamage'],Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0x133')]=function(_0x58da5a,_0x5d018e){const _0x3c132e=_0x5a9f05;VisuMZ['EnhancedTP'][_0x3c132e('0x47')][_0x3c132e('0xc4')](this,_0x58da5a,_0x5d018e);const _0xcc651a=this['subject']();if(_0x5d018e>0x0)_0x58da5a[_0x3c132e('0xa1')](_0x3c132e('0xf7'),_0x58da5a,_0x5d018e),_0xcc651a[_0x3c132e('0xa1')](_0x3c132e('0x7b'),_0x58da5a,_0x5d018e),_0x58da5a['friendsUnit']()['gainTpFromTpMode']('AllyMpDmg',_0x58da5a,_0x5d018e);else{if(_0x3c132e('0x95')!==_0x3c132e('0x10a'))_0x5d018e=Math[_0x3c132e('0xb5')](_0x5d018e),_0x58da5a['gainTpFromTpMode'](_0x3c132e('0x28'),_0x58da5a,_0x5d018e),_0xcc651a[_0x3c132e('0xa1')](_0x3c132e('0xf0'),_0x58da5a,_0x5d018e),_0x58da5a[_0x3c132e('0x6e')]()[_0x3c132e('0xa1')](_0x3c132e('0xa3'),_0x58da5a,_0x5d018e);else{function _0x224de8(){const _0x19e5a7=_0x3c132e;_0x53bfdd[_0x19e5a7('0x3b')]['Sprite_Gauge_setup']['call'](this,_0xef7305,_0x78bb74),this[_0x19e5a7('0x1d')]==='tp'&&this['createEnhancedTpChildSprites']();}}}},VisuMZ[_0x5a9f05('0x3b')]['Game_Action_itemEffectAddBuff']=Game_Action[_0x5a9f05('0xca')]['itemEffectAddBuff'],Game_Action['prototype'][_0x5a9f05('0x67')]=function(_0x2b2513,_0x58598f){const _0x5c4300=_0x5a9f05;VisuMZ['EnhancedTP'][_0x5c4300('0x94')][_0x5c4300('0xc4')](this,_0x2b2513,_0x58598f);if(!_0x2b2513['result']()[_0x5c4300('0x39')])return;const _0x2d289e=this[_0x5c4300('0x1')]();if(_0x2d289e[_0x5c4300('0x9d')]()===_0x2b2513[_0x5c4300('0x9d')]()){if(_0x5c4300('0xaa')!=='DCCYU')_0x2d289e[_0x5c4300('0xa1')](_0x5c4300('0x5b'),_0x2b2513,0x0),_0x2b2513[_0x5c4300('0xa1')](_0x5c4300('0x13b'),_0x2b2513,0x0);else{function _0x8db246(){const _0x45cabc=_0x5c4300,_0x146076=0x0,_0x1d1a9e=this[_0x45cabc('0x124')]['y']+this[_0x45cabc('0x124')][_0x45cabc('0x92')],_0x150de6=_0x4f4399['boxWidth'],_0x229588=this[_0x45cabc('0xef')]()-this[_0x45cabc('0x124')][_0x45cabc('0x92')];return new _0x826510(_0x146076,_0x1d1a9e,_0x150de6,_0x229588);}}}else{if(_0x5c4300('0xf9')===_0x5c4300('0x1c')){function _0x58ae3a(){const _0x12d8f0=_0x5c4300;this[_0x12d8f0('0x11c')]&&(this[_0x12d8f0('0x11c')][_0x12d8f0('0xa5')]=this[_0x12d8f0('0xa5')]),this[_0x12d8f0('0x9a')](0x0,0x0,0x0,0x0);}}else _0x2d289e['gainTpFromTpMode'](_0x5c4300('0x130'),_0x2b2513,0x0),_0x2b2513[_0x5c4300('0xa1')](_0x5c4300('0x37'),_0x2b2513,0x0);}},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x32')]=Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0x132')],Game_Action['prototype'][_0x5a9f05('0x132')]=function(_0x353d66,_0x4ed52e){const _0x243ce3=_0x5a9f05;VisuMZ[_0x243ce3('0x3b')][_0x243ce3('0x32')][_0x243ce3('0xc4')](this,_0x353d66,_0x4ed52e);if(!_0x353d66['result']()[_0x243ce3('0x39')])return;const _0x5ef235=this[_0x243ce3('0x1')]();if(_0x5ef235[_0x243ce3('0x9d')]()===_0x353d66[_0x243ce3('0x9d')]())_0x5ef235[_0x243ce3('0xa1')](_0x243ce3('0x34'),_0x353d66,0x0),_0x353d66[_0x243ce3('0xa1')]('GainAllyDebuff',_0x353d66,0x0);else{if(_0x243ce3('0x113')!==_0x243ce3('0x112'))_0x5ef235[_0x243ce3('0xa1')]('DealEnemyDebuff',_0x353d66,0x0),_0x353d66['gainTpFromTpMode'](_0x243ce3('0x141'),_0x353d66,0x0);else{function _0x56a8ab(){const _0x19981b=_0x243ce3;this[_0x19981b('0x13c')]=[];}}}},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x22')]=Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0x69')],Game_Action['prototype'][_0x5a9f05('0x69')]=function(_0x5b7e1d,_0x16b6cd){const _0x4a6353=_0x5a9f05;VisuMZ[_0x4a6353('0x3b')][_0x4a6353('0x22')][_0x4a6353('0xc4')](this,_0x5b7e1d,_0x16b6cd);if(!_0x5b7e1d['result']()['success'])return;const _0x531038=this[_0x4a6353('0x1')]();_0x531038[_0x4a6353('0x9d')]()===_0x5b7e1d[_0x4a6353('0x9d')]()?(_0x531038[_0x4a6353('0xa1')](_0x4a6353('0x48'),_0x5b7e1d,0x0),_0x5b7e1d['gainTpFromTpMode'](_0x4a6353('0x99'),_0x5b7e1d,0x0)):(_0x531038['gainTpFromTpMode'](_0x4a6353('0x87'),_0x5b7e1d,0x0),_0x5b7e1d[_0x4a6353('0xa1')]('GainEnemyState',_0x5b7e1d,0x0));},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0xa6')]=Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0x144')],Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0x144')]=function(_0x5877b0){const _0x275378=_0x5a9f05;VisuMZ[_0x275378('0x3b')][_0x275378('0xa6')]['call'](this,_0x5877b0),this[_0x275378('0xa4')]();},Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0xa4')]=function(_0x3e80ea){const _0x4edf39=_0x5a9f05;if(!_0x3e80ea)return;const _0x23ecc2=this['item']()[_0x4edf39('0x5a')],_0x61d8ff=this[_0x4edf39('0x1')]();if(_0x23ecc2['match'](/<CHANGE TARGET TP MODE: (.*)>/i)){if('XKcsX'===_0x4edf39('0x5e')){function _0x47bbda(){const _0x189980=_0x4edf39;if(this['actor']()&&this[_0x189980('0xaf')]()[_0x189980('0x5a')][_0x189980('0x12f')](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){const _0x576f52=_0x5649c7(_0x3bd90a['$1'])[_0x189980('0xcb')](/[\r\n]+/);for(const _0x3e97b0 of _0x576f52){this[_0x189980('0xec')](_0x3e97b0[_0x189980('0x1f')]()[_0x189980('0x109')]());}}}}else _0x3e80ea['changeTpMode'](String(RegExp['$1']));}if(!_0x3e80ea['isActor']())return;const _0x10b8a7=_0x23ecc2[_0x4edf39('0x12f')](/<UNOCK TP MODE: (.*)>/gi);if(_0x10b8a7)for(const _0x5714fe of _0x10b8a7){if(_0x4edf39('0xe5')==='RqmaC'){function _0x3d91f4(){const _0x53a092=_0x4edf39;this['_tpGaugeSprite']=new _0x53673f(),this['addChild'](this[_0x53a092('0xfe')]);}}else _0x5714fe[_0x4edf39('0x12f')](/<UNOCK TP MODE: (.*)>/i),_0x3e80ea[_0x4edf39('0xec')](String(RegExp['$1']));}if(_0x23ecc2['match'](/<UNOCK TP MODES>\s*([\s\S]*)\s*<\/UNOCK TP MODES>/i)){const _0x5c50aa=String(RegExp['$1'])[_0x4edf39('0xcb')](/[\r\n]+/);for(const _0x56db7e of _0x5c50aa){_0x3e80ea[_0x4edf39('0xec')](_0x56db7e);}}},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x4e')]=Game_Action['prototype'][_0x5a9f05('0xee')],Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0xee')]=function(){const _0x5679fe=_0x5a9f05;VisuMZ[_0x5679fe('0x3b')][_0x5679fe('0x4e')][_0x5679fe('0xc4')](this),this['applyGlobalEnhancedTP']();},Game_Action[_0x5a9f05('0xca')][_0x5a9f05('0xb9')]=function(){const _0x3b91ce=_0x5a9f05,_0x575a37=this[_0x3b91ce('0xfa')]()[_0x3b91ce('0x5a')],_0x552481=this['subject']();if(_0x575a37['match'](/<CHANGE USER TP MODE: (.*)>/i)){if(_0x3b91ce('0x108')===_0x3b91ce('0x108'))_0x552481[_0x3b91ce('0x5f')](String(RegExp['$1']));else{function _0x363d96(){const _0x354ce1=_0x3b91ce;if(this['_tpMode_SceneSkill']===_0x38f75c)this['initEnhancedTP']();this[_0x354ce1('0x5d')]=_0x298272;}}}},Game_BattlerBase[_0x5a9f05('0xca')]['initEnhancedTP']=function(){const _0x1e3246=_0x5a9f05;this[_0x1e3246('0x5f')](this[_0x1e3246('0x49')]());},Game_BattlerBase[_0x5a9f05('0xca')][_0x5a9f05('0x5f')]=function(_0x17b64f){const _0x4f38ad=_0x5a9f05;_0x17b64f=_0x17b64f[_0x4f38ad('0x1f')]()['trim']();if(!VisuMZ[_0x4f38ad('0x3b')][_0x4f38ad('0xf2')][_0x17b64f])return;this[_0x4f38ad('0xc7')]=_0x17b64f,this[_0x4f38ad('0x21')](_0x17b64f);},Game_BattlerBase['prototype'][_0x5a9f05('0x49')]=function(){const _0x27fe96=_0x5a9f05;return VisuMZ[_0x27fe96('0x3b')][_0x27fe96('0xf5')]['General'][_0x27fe96('0x36')]['toUpperCase']()[_0x27fe96('0x109')]();},Game_BattlerBase[_0x5a9f05('0xca')][_0x5a9f05('0x103')]=function(){const _0x477e37=_0x5a9f05;if(this[_0x477e37('0xc7')]===undefined)this[_0x477e37('0x93')]();let _0x77d4f9=this[_0x477e37('0xc7')];if($gameParty['inBattle']())for(const _0xdb76ee of this[_0x477e37('0xb2')]()){if(!_0xdb76ee)continue;if(_0xdb76ee[_0x477e37('0x5a')][_0x477e37('0x12f')](/<FORCE TP MODE: (.*)>/i)){const _0x2e6105=String(RegExp['$1'])[_0x477e37('0x1f')]()[_0x477e37('0x109')]();if(!VisuMZ['EnhancedTP'][_0x477e37('0xf2')][_0x2e6105])continue;break;}}return VisuMZ[_0x477e37('0x3b')]['TpModes'][_0x77d4f9['toUpperCase']()['trim']()];},Game_BattlerBase['prototype']['tpModeValue']=function(_0x1f4da5,_0x162528,_0x3684ff){const _0x39edd0=_0x5a9f05,_0x5633be=this['tpMode']();if(!_0x5633be)return 0x0;_0x1f4da5=_0x39edd0('0xbf')[_0x39edd0('0xde')](_0x1f4da5);if(!_0x5633be[_0x1f4da5])return 0x0;return _0x5633be[_0x1f4da5](this,_0x162528,_0x3684ff);},Game_BattlerBase[_0x5a9f05('0xca')][_0x5a9f05('0xa1')]=function(_0x23009e,_0x3413bf,_0x356c2d){const _0x24969a=_0x5a9f05,_0xe8a460=Math[_0x24969a('0x2a')](this[_0x24969a('0x126')](_0x23009e,_0x3413bf,_0x356c2d));this[_0x24969a('0x3e')](_0xe8a460);},VisuMZ[_0x5a9f05('0x3b')]['Game_BattlerBase_maxTp']=Game_BattlerBase['prototype'][_0x5a9f05('0x12d')],Game_BattlerBase[_0x5a9f05('0xca')]['maxTp']=function(){const _0x6d5905=_0x5a9f05;if(this[_0x6d5905('0x103')]())return this[_0x6d5905('0x103')]()[_0x6d5905('0xb6')](this,this,0x0);return VisuMZ[_0x6d5905('0x3b')][_0x6d5905('0xdf')][_0x6d5905('0xc4')](this);},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x40')]=Game_BattlerBase['prototype'][_0x5a9f05('0x1a')],Game_BattlerBase[_0x5a9f05('0xca')][_0x5a9f05('0x1a')]=function(){const _0x48726f=_0x5a9f05;if(this[_0x48726f('0x103')]())return this[_0x48726f('0x103')]()[_0x48726f('0xc1')];return VisuMZ['EnhancedTP'][_0x48726f('0x40')][_0x48726f('0xc4')](this);},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0xe8')]=Game_BattlerBase['prototype'][_0x5a9f05('0x75')],Game_BattlerBase[_0x5a9f05('0xca')][_0x5a9f05('0x75')]=function(_0x25f3b9){const _0x108baa=_0x5a9f05;let _0x148598=VisuMZ[_0x108baa('0x3b')][_0x108baa('0xe8')]['call'](this,_0x25f3b9);return _0x25f3b9===0x5&&this[_0x108baa('0x103')]()&&(_0x148598*=this[_0x108baa('0x103')]()[_0x108baa('0xff')]),_0x148598;},Game_BattlerBase[_0x5a9f05('0xca')][_0x5a9f05('0x19')]=function(){const _0x3686b7=_0x5a9f05;if(!Imported[_0x3686b7('0x78')])return![];const _0x57fa70=this[_0x3686b7('0x103')]();if(!_0x57fa70)return![];if(!_0x57fa70[_0x3686b7('0xe7')])return![];const _0x172629=_0x57fa70[_0x3686b7('0x10c')]||0x0;return this[_0x3686b7('0x10d')]()>=_0x172629;},Game_BattlerBase[_0x5a9f05('0xca')][_0x5a9f05('0xd')]=function(){const _0x3c32b0=_0x5a9f05,_0x4fb62a=this['tpMode']();if(!_0x4fb62a)return![];return(_0x4fb62a[_0x3c32b0('0xae')]||0x1)['clamp'](0x1,0xff);},Game_BattlerBase['prototype']['tpGaugeFlashLightness']=function(){const _0x551835=_0x5a9f05,_0x563470=this[_0x551835('0x103')]();if(!_0x563470)return![];return(_0x563470[_0x551835('0x3a')]||0x0)[_0x551835('0x3')](0x0,0xff);},VisuMZ['EnhancedTP'][_0x5a9f05('0x73')]=Game_Battler[_0x5a9f05('0xca')]['onBattleStart'],Game_Battler[_0x5a9f05('0xca')][_0x5a9f05('0x14')]=function(_0x5b55e5){const _0x38cf50=_0x5a9f05;VisuMZ['EnhancedTP'][_0x38cf50('0x73')]['call'](this,_0x5b55e5),this[_0x38cf50('0xa1')](_0x38cf50('0xb1'),this,0x0);},VisuMZ[_0x5a9f05('0x3b')]['Game_Battler_useItem']=Game_Battler[_0x5a9f05('0xca')][_0x5a9f05('0x120')],Game_Battler[_0x5a9f05('0xca')][_0x5a9f05('0x120')]=function(_0x1040d1){const _0x4abff3=_0x5a9f05;VisuMZ['EnhancedTP']['Game_Battler_useItem']['call'](this,_0x1040d1);this[_0x4abff3('0x100')](_0x1040d1)&&this[_0x4abff3('0xa1')]('UseSkill',this,0x0);if(DataManager['isItem'](_0x1040d1)){if(_0x4abff3('0xad')!==_0x4abff3('0x9f'))this['gainTpFromTpMode'](_0x4abff3('0x13d'),this,0x0);else{function _0x267e89(){const _0x518518=_0x4abff3;_0x32a13b[_0x518518('0x3b')]['Game_Action_executeMpDamage']['call'](this,_0x136b18,_0x3cc35f);const _0x21d844=this[_0x518518('0x1')]();_0x3a9121>0x0?(_0x5eafd9[_0x518518('0xa1')](_0x518518('0xf7'),_0x3c5466,_0x97e76e),_0x21d844['gainTpFromTpMode'](_0x518518('0x7b'),_0x3afae2,_0x69e7b7),_0x5a19a4[_0x518518('0x6e')]()[_0x518518('0xa1')](_0x518518('0xf1'),_0x165039,_0x56482e)):(_0x42ac5c=_0x1260d3['abs'](_0x597bce),_0x1392f8['gainTpFromTpMode'](_0x518518('0x28'),_0x160a8e,_0x19af8c),_0x21d844['gainTpFromTpMode'](_0x518518('0xf0'),_0x25aa79,_0x2e3bce),_0x57c583[_0x518518('0x6e')]()[_0x518518('0xa1')](_0x518518('0xa3'),_0x31f617,_0x5ab4e3));}}}},Game_Battler[_0x5a9f05('0xca')][_0x5a9f05('0x100')]=function(_0xcaea1c){const _0x1d0e13=_0x5a9f05;if(!_0xcaea1c)return![];if(!DataManager[_0x1d0e13('0x127')](_0xcaea1c))return![];if(_0xcaea1c['id']===this['attackSkillId']())return![];if(_0xcaea1c['id']===this[_0x1d0e13('0xed')]())return![];return!![];},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x4')]=Game_Battler['prototype'][_0x5a9f05('0x115')],Game_Battler[_0x5a9f05('0xca')]['regenerateTp']=function(){const _0x4bc438=_0x5a9f05,_0x2ff56c=Math[_0x4bc438('0x2a')](this['maxTp']()*this['trg']);this[_0x4bc438('0x3e')](_0x2ff56c),this[_0x4bc438('0xa1')](_0x4bc438('0xa8'),this,0x0);if(this[_0x4bc438('0x16')]<this['mhp']/0x4){if('EkqVy'===_0x4bc438('0x138'))this[_0x4bc438('0xa1')](_0x4bc438('0x84'),this,0x0);else{function _0x16dca4(){const _0x4a4574=_0x4bc438;return _0x299572['prototype'][_0x4a4574('0x49')][_0x4a4574('0xc4')](this);}}}if(this[_0x4bc438('0x16')]>=this[_0x4bc438('0x6c')]){if('oYDuX'!==_0x4bc438('0x60'))this['gainTpFromTpMode'](_0x4bc438('0xfc'),this,0x0);else{function _0x458202(){const _0x98fe9d=_0x4bc438;this[_0x98fe9d('0xa1')](_0x98fe9d('0x13d'),this,0x0);}}}this[_0x4bc438('0xd9')]<this[_0x4bc438('0xbd')]/0x4&&this[_0x4bc438('0xa1')]('CriticalMp',this,0x0),this['_mp']>=this[_0x4bc438('0xbd')]&&this[_0x4bc438('0xa1')](_0x4bc438('0x8e'),this,0x0),this[_0x4bc438('0x6e')]()[_0x4bc438('0xd0')]()[_0x4bc438('0x41')]<=0x1&&this[_0x4bc438('0xa1')](_0x4bc438('0x137'),this,0x0);},Game_Battler[_0x5a9f05('0xca')][_0x5a9f05('0x106')]=function(_0x561e39){},VisuMZ['EnhancedTP'][_0x5a9f05('0x9c')]=Game_Battler['prototype'][_0x5a9f05('0x61')],Game_Battler[_0x5a9f05('0xca')][_0x5a9f05('0x61')]=function(_0x3a1dd0){const _0x17c306=_0x5a9f05;VisuMZ[_0x17c306('0x3b')]['Game_Battler_addState'][_0x17c306('0xc4')](this,_0x3a1dd0);if(_0x3a1dd0===this[_0x17c306('0x11')]()&&this['isDead']()){if('FfvPf'===_0x17c306('0x66'))this[_0x17c306('0x6e')]()[_0x17c306('0xa1')](_0x17c306('0x11e'),this,0x0),this[_0x17c306('0x4c')]()[_0x17c306('0xa1')](_0x17c306('0x7'),this,0x0);else{function _0x1f169a(){return _0x47c6d1['showTpModeInSceneSkill']();}}}},Game_Battler[_0x5a9f05('0xca')]['onChangeTpMode']=function(_0xac634d){const _0x3e7ce5=_0x5a9f05;this[_0x3e7ce5('0xcd')]={},this['_tp']=Math[_0x3e7ce5('0x46')](this[_0x3e7ce5('0xf3')],this[_0x3e7ce5('0x12d')]());},VisuMZ[_0x5a9f05('0x3b')]['Game_Actor_setup']=Game_Actor[_0x5a9f05('0xca')][_0x5a9f05('0xe1')],Game_Actor[_0x5a9f05('0xca')]['setup']=function(_0xe3fcf3){const _0x42d118=_0x5a9f05;VisuMZ['EnhancedTP'][_0x42d118('0xdb')]['call'](this,_0xe3fcf3),this[_0x42d118('0x93')]();},Game_Actor[_0x5a9f05('0xca')]['initEnhancedTP']=function(){const _0x2e0de3=_0x5a9f05;this[_0x2e0de3('0xd3')]=[],Game_Battler[_0x2e0de3('0xca')][_0x2e0de3('0x93')][_0x2e0de3('0xc4')](this),this[_0x2e0de3('0xf')](),this[_0x2e0de3('0x122')]();},Game_Actor[_0x5a9f05('0xca')]['defaultTpMode']=function(){const _0x555fe0=_0x5a9f05;if(this[_0x555fe0('0xaf')]()&&this['actor']()[_0x555fe0('0x5a')][_0x555fe0('0x12f')](/<TP MODE: (.*)>/i)){if(_0x555fe0('0x12c')===_0x555fe0('0x12c'))return String(RegExp['$1'])['toUpperCase']()[_0x555fe0('0x109')]();else{function _0xfb2611(){const _0x5d63f2=_0x555fe0;_0x20bc0b['gainTpFromTpMode']('DealAllyDebuff',_0x5823ac,0x0),_0x1aa4f7[_0x5d63f2('0xa1')](_0x5d63f2('0x8d'),_0x409730,0x0);}}}else return Game_Battler[_0x555fe0('0xca')][_0x555fe0('0x49')][_0x555fe0('0xc4')](this);},Game_Actor[_0x5a9f05('0xca')][_0x5a9f05('0x21')]=function(_0x30598b){const _0x145620=_0x5a9f05;_0x30598b=_0x30598b[_0x145620('0x1f')]()[_0x145620('0x109')](),Game_Battler[_0x145620('0xca')][_0x145620('0x21')]['call'](this,_0x30598b),this[_0x145620('0xec')](_0x30598b);},Game_Actor[_0x5a9f05('0xca')][_0x5a9f05('0xec')]=function(_0x138e0c){const _0x28aebe=_0x5a9f05;_0x138e0c=_0x138e0c['toUpperCase']()['trim']();if(!VisuMZ[_0x28aebe('0x3b')][_0x28aebe('0xf2')][_0x138e0c])return;this[_0x28aebe('0xd3')]=this[_0x28aebe('0xd3')]||[],!this[_0x28aebe('0xd3')][_0x28aebe('0x117')](_0x138e0c)&&(this[_0x28aebe('0xd3')][_0x28aebe('0x8')](_0x138e0c),this[_0x28aebe('0x18')]());},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x18')]=function(_0x5273da){const _0x271b56=_0x5a9f05,_0x2d9c35=[];for(const _0x3d967e of VisuMZ[_0x271b56('0x3b')]['TpModeOrder']){if(_0x271b56('0x4b')===_0x271b56('0x4b')){if(_0x5273da[_0x271b56('0x117')](_0x3d967e))_0x2d9c35[_0x271b56('0x8')](_0x3d967e);}else{function _0x1cb026(){const _0x43ff5f=_0x271b56;_0x1477b1[_0x43ff5f('0x3b')]['Scene_Skill_refreshActor']['call'](this);if(this['_tpModeWindow'])this[_0x43ff5f('0x135')]['setActor'](this[_0x43ff5f('0xaf')]());}}}return _0x2d9c35;},Game_Actor[_0x5a9f05('0xca')][_0x5a9f05('0x18')]=function(){const _0x102da7=_0x5a9f05;if(this[_0x102da7('0xd3')]===undefined)this[_0x102da7('0x93')]();this['_availableTpModes']=VisuMZ['EnhancedTP']['sortTpModes'](this[_0x102da7('0xd3')]);},Game_Actor[_0x5a9f05('0xca')][_0x5a9f05('0x6')]=function(){const _0x23a207=_0x5a9f05;if(this[_0x23a207('0xd3')]===undefined)this[_0x23a207('0x93')]();this[_0x23a207('0xf')]();let _0x3f43d5=this[_0x23a207('0xd3')]['map'](_0x309914=>VisuMZ[_0x23a207('0x3b')]['TpModes'][_0x309914]);return _0x3f43d5[_0x23a207('0x51')](null);},Game_Actor[_0x5a9f05('0xca')][_0x5a9f05('0xf')]=function(){const _0x2bf116=_0x5a9f05;for(const _0x717095 of $gameParty[_0x2bf116('0xac')]()){this[_0x2bf116('0xec')](_0x717095[_0x2bf116('0x1f')]()['trim']());}},Game_Actor[_0x5a9f05('0xca')][_0x5a9f05('0x122')]=function(){const _0x105788=_0x5a9f05;if(this[_0x105788('0xaf')]()&&this[_0x105788('0xaf')]()['note'][_0x105788('0x12f')](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){const _0x397f62=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x5851e2 of _0x397f62){this[_0x105788('0xec')](_0x5851e2['toUpperCase']()[_0x105788('0x109')]());}}},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x107')]=Game_Actor[_0x5a9f05('0xca')]['learnSkill'],Game_Actor[_0x5a9f05('0xca')]['learnSkill']=function(_0x3646e0){const _0x5a82d4=_0x5a9f05;VisuMZ['EnhancedTP']['Game_Actor_learnSkill'][_0x5a82d4('0xc4')](this,_0x3646e0),this[_0x5a82d4('0x3f')](_0x3646e0);},Game_Actor[_0x5a9f05('0xca')][_0x5a9f05('0x3f')]=function(_0x485797){const _0x310e7e=_0x5a9f05;if(!$dataSkills[_0x485797])return;const _0x4ec501=$dataSkills[_0x485797][_0x310e7e('0x5a')],_0x48801c=_0x4ec501[_0x310e7e('0x12f')](/<LEARN TP MODE: (.*)>/gi);if(_0x48801c)for(const _0x3ac961 of _0x48801c){_0x3ac961[_0x310e7e('0x12f')](/<LEARN TP MODE: (.*)>/i),this[_0x310e7e('0xec')](String(RegExp['$1']));}if(_0x4ec501['match'](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x1d6d56=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x47ed24 of _0x1d6d56){this[_0x310e7e('0xec')](_0x47ed24);}}},Game_Enemy[_0x5a9f05('0xca')][_0x5a9f05('0x49')]=function(){const _0x297c4a=_0x5a9f05;return this[_0x297c4a('0x12')]()[_0x297c4a('0x5a')][_0x297c4a('0x12f')](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x297c4a('0x1f')]()[_0x297c4a('0x109')]():Game_Battler[_0x297c4a('0xca')][_0x297c4a('0x49')][_0x297c4a('0xc4')](this);},Game_Unit[_0x5a9f05('0xca')][_0x5a9f05('0xa1')]=function(_0xd9a7ab,_0x421ea9,_0x532791){const _0x30c66a=_0x5a9f05;for(const _0x3124e3 of this[_0x30c66a('0xd0')]()){if(!_0x3124e3)continue;_0x3124e3[_0x30c66a('0xa1')](_0xd9a7ab,_0x421ea9,_0x532791);}},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x4a')]=Game_Party[_0x5a9f05('0xca')][_0x5a9f05('0x90')],Game_Party[_0x5a9f05('0xca')]['initialize']=function(){const _0x3e6e08=_0x5a9f05;VisuMZ[_0x3e6e08('0x3b')][_0x3e6e08('0x4a')][_0x3e6e08('0xc4')](this),this[_0x3e6e08('0x38')]();},Game_Party[_0x5a9f05('0xca')][_0x5a9f05('0x38')]=function(){const _0x2486e8=_0x5a9f05;this[_0x2486e8('0xa')]=[];for(const _0xaf6c60 of VisuMZ['EnhancedTP'][_0x2486e8('0xf5')][_0x2486e8('0x54')][_0x2486e8('0x17')]){this[_0x2486e8('0xa')][_0x2486e8('0x8')](_0xaf6c60['toUpperCase']()[_0x2486e8('0x109')]());}},Game_Party[_0x5a9f05('0xca')]['tpModes']=function(){const _0x1b3f8a=_0x5a9f05;if(this[_0x1b3f8a('0xa')]===undefined)this[_0x1b3f8a('0x38')]();return this[_0x1b3f8a('0xa')];},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x0')]=Scene_Skill[_0x5a9f05('0xca')][_0x5a9f05('0x6f')],Scene_Skill[_0x5a9f05('0xca')]['create']=function(){const _0x5befd9=_0x5a9f05;VisuMZ[_0x5befd9('0x3b')][_0x5befd9('0x0')][_0x5befd9('0xc4')](this),this['createTpModeWindow']();},VisuMZ['EnhancedTP']['Scene_Skill_createSkillTypeWindow']=Scene_Skill[_0x5a9f05('0xca')][_0x5a9f05('0x4f')],Scene_Skill[_0x5a9f05('0xca')][_0x5a9f05('0x4f')]=function(){const _0xf2559=_0x5a9f05;VisuMZ['EnhancedTP'][_0xf2559('0x136')]['call'](this),this[_0xf2559('0x15')][_0xf2559('0x10b')](_0xf2559('0x103'),this[_0xf2559('0x116')][_0xf2559('0x3d')](this));},Scene_Skill[_0x5a9f05('0xca')][_0x5a9f05('0xb7')]=function(){const _0x1291f2=_0x5a9f05,_0x17de3b=this['tpModeWindowRect']();this[_0x1291f2('0x135')]=new Window_TpModes(_0x17de3b),this[_0x1291f2('0x135')][_0x1291f2('0x79')](this['_helpWindow']),this[_0x1291f2('0x135')][_0x1291f2('0x10b')]('ok',this[_0x1291f2('0xc')][_0x1291f2('0x3d')](this)),this['_tpModeWindow'][_0x1291f2('0x10b')]('cancel',this[_0x1291f2('0x71')]['bind'](this)),this[_0x1291f2('0xc5')](this[_0x1291f2('0x135')]);},Scene_Skill[_0x5a9f05('0xca')][_0x5a9f05('0x50')]=function(){const _0x13f457=_0x5a9f05,_0x5d3360=0x0,_0x441b34=this[_0x13f457('0x124')]['y']+this['_statusWindow'][_0x13f457('0x92')],_0x183996=Graphics['boxWidth'],_0x284957=this['mainAreaHeight']()-this['_statusWindow'][_0x13f457('0x92')];return new Rectangle(_0x5d3360,_0x441b34,_0x183996,_0x284957);},Scene_Skill[_0x5a9f05('0xca')]['commandTpMode']=function(){const _0x4a9126=_0x5a9f05;this[_0x4a9126('0x135')][_0x4a9126('0xc9')](),this[_0x4a9126('0x135')][_0x4a9126('0x12a')]();},Scene_Skill[_0x5a9f05('0xca')][_0x5a9f05('0xc')]=function(){const _0x28c9b0=_0x5a9f05;this['_tpModeWindow'][_0x28c9b0('0xc9')]();const _0x5df64b=this[_0x28c9b0('0x135')]['item']();if(!_0x5df64b)return;this['actor']()[_0x28c9b0('0x5f')](_0x5df64b[_0x28c9b0('0x24')]),this[_0x28c9b0('0x135')][_0x28c9b0('0x114')](),this[_0x28c9b0('0x124')]['refresh']();},Scene_Skill[_0x5a9f05('0xca')]['onTpModeCancel']=function(){const _0x2ead18=_0x5a9f05;this[_0x2ead18('0x135')]['deselect'](),this[_0x2ead18('0x15')]['activate']();},VisuMZ['EnhancedTP'][_0x5a9f05('0x97')]=Scene_Skill[_0x5a9f05('0xca')][_0x5a9f05('0x45')],Scene_Skill[_0x5a9f05('0xca')][_0x5a9f05('0x45')]=function(){const _0xda4879=_0x5a9f05;VisuMZ[_0xda4879('0x3b')][_0xda4879('0x97')][_0xda4879('0xc4')](this);if(this[_0xda4879('0x135')])this['_tpModeWindow'][_0xda4879('0x25')](this[_0xda4879('0xaf')]());},VisuMZ['EnhancedTP'][_0x5a9f05('0x123')]=Sprite_Gauge[_0x5a9f05('0xca')][_0x5a9f05('0xe1')],Sprite_Gauge[_0x5a9f05('0xca')]['setup']=function(_0x586722,_0x1a34f6){const _0x4a34d6=_0x5a9f05;VisuMZ[_0x4a34d6('0x3b')][_0x4a34d6('0x123')]['call'](this,_0x586722,_0x1a34f6),this[_0x4a34d6('0x1d')]==='tp'&&this['createEnhancedTpChildSprites']();},Sprite_Gauge[_0x5a9f05('0xca')]['createEnhancedTpChildSprites']=function(){const _0x1d3de6=_0x5a9f05;!this[_0x1d3de6('0x11f')]&&(this['_tpGaugeBack']=new Sprite(),this[_0x1d3de6('0xcc')](this[_0x1d3de6('0x11f')])),!this[_0x1d3de6('0xfe')]&&(this['_tpGaugeSprite']=new Sprite(),this[_0x1d3de6('0xcc')](this[_0x1d3de6('0xfe')])),!this[_0x1d3de6('0x11c')]&&(this[_0x1d3de6('0x11c')]=new Sprite(),this[_0x1d3de6('0xcc')](this[_0x1d3de6('0x11c')]));},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x11d')]=Sprite_Gauge[_0x5a9f05('0xca')][_0x5a9f05('0x12b')],Sprite_Gauge[_0x5a9f05('0xca')]['redraw']=function(){const _0x3fd3b3=_0x5a9f05;VisuMZ[_0x3fd3b3('0x3b')][_0x3fd3b3('0x11d')]['call'](this),this[_0x3fd3b3('0x1d')]==='tp'&&this['redrawEnhancedTp']();},Sprite_Gauge[_0x5a9f05('0xca')][_0x5a9f05('0x6a')]=function(){const _0xa83fd1=_0x5a9f05;if(this[_0xa83fd1('0x11c')]){if(_0xa83fd1('0x52')===_0xa83fd1('0x52'))this[_0xa83fd1('0x11c')][_0xa83fd1('0xa5')]=this['bitmap'];else{function _0x3f8d54(){const _0x3c733c=_0xa83fd1;this[_0x3c733c('0xa1')](_0x3c733c('0xfc'),this,0x0);}}}this[_0xa83fd1('0x9a')](0x0,0x0,0x0,0x0);},VisuMZ['EnhancedTP'][_0x5a9f05('0x142')]=Sprite_Gauge[_0x5a9f05('0xca')][_0x5a9f05('0xc6')],Sprite_Gauge[_0x5a9f05('0xca')][_0x5a9f05('0xc6')]=function(_0x1fc2b1,_0x20da1a,_0x2dc5dc,_0xc3584c,_0x1e9662,_0x493bf2){const _0x584c03=_0x5a9f05;if(this['_statusType']==='tp'&&this[_0x584c03('0xfe')]){if(_0x584c03('0x55')===_0x584c03('0x55'))this['drawFullGaugeEnhancedTp'](_0x1fc2b1,_0x20da1a,_0x2dc5dc,_0xc3584c,_0x1e9662,_0x493bf2);else{function _0x130549(){const _0x167a32=_0x584c03;_0xbc895e['match'](/<UNOCK TP MODE: (.*)>/i),_0x2c4d8f[_0x167a32('0xec')](_0x85c6cc(_0x597ef7['$1']));}}}else VisuMZ[_0x584c03('0x3b')][_0x584c03('0x142')][_0x584c03('0xc4')](this,_0x1fc2b1,_0x20da1a,_0x2dc5dc,_0xc3584c,_0x1e9662,_0x493bf2);},Sprite_Gauge['prototype'][_0x5a9f05('0x56')]=function(_0x53c216){const _0x3ccae8=_0x5a9f05;!this['_tpGaugeBack'][_0x3ccae8('0xa5')]&&(this['_tpGaugeBack']['bitmap']=new Bitmap(this[_0x3ccae8('0xa5')][_0x3ccae8('0x9e')],this[_0x3ccae8('0xa5')]['height'])),!this['_tpGaugeSprite'][_0x3ccae8('0xa5')]&&(this[_0x3ccae8('0xfe')][_0x3ccae8('0xa5')]=new Bitmap(this[_0x3ccae8('0xa5')]['width'],this[_0x3ccae8('0xa5')][_0x3ccae8('0x92')])),_0x53c216&&(this[_0x3ccae8('0x11f')][_0x3ccae8('0xa5')][_0x3ccae8('0xb8')](),this['_tpGaugeSprite'][_0x3ccae8('0xa5')][_0x3ccae8('0xb8')]());},Sprite_Gauge['prototype'][_0x5a9f05('0xd6')]=function(_0x24a3fc,_0x5549c5,_0x3f63ca,_0x206382,_0x59977e,_0x1aedad){const _0x10ec74=_0x5a9f05;this[_0x10ec74('0x56')](!![]);const _0xc7a405=this[_0x10ec74('0x5')](),_0x72a3a7=Math[_0x10ec74('0x2a')]((_0x59977e-0x2)*_0xc7a405),_0x11b642=_0x1aedad-0x2,_0x5c4311=this[_0x10ec74('0x7d')]();this[_0x10ec74('0x11f')]['bitmap']['fillRect'](_0x3f63ca,_0x206382,_0x59977e,_0x1aedad,_0x5c4311),this[_0x10ec74('0xfe')]['bitmap'][_0x10ec74('0x13a')](_0x3f63ca+0x1,_0x206382+0x1,_0x72a3a7,_0x11b642,_0x24a3fc,_0x5549c5);},VisuMZ[_0x5a9f05('0x3b')]['Sprite_Gauge_drawGaugeRect']=Sprite_Gauge[_0x5a9f05('0xca')]['drawGaugeRect'],Sprite_Gauge[_0x5a9f05('0xca')][_0x5a9f05('0x2d')]=function(_0x8ad2af,_0x316274,_0x5734a0,_0x533c55){const _0x4f2092=_0x5a9f05;this[_0x4f2092('0x1d')]==='tp'&&this[_0x4f2092('0xfe')]?this['drawGaugeRectEnhancedTp'](_0x8ad2af,_0x316274,_0x5734a0,_0x533c55):VisuMZ[_0x4f2092('0x3b')][_0x4f2092('0x9b')][_0x4f2092('0xc4')](this,_0x8ad2af,_0x316274,_0x5734a0,_0x533c55);},Sprite_Gauge[_0x5a9f05('0xca')]['drawGaugeRectEnhancedTp']=function(_0x1700af,_0x4f891a,_0x22b2c4,_0x2d7694){const _0x2037af=_0x5a9f05;this[_0x2037af('0x56')](!![]);const _0x25dac3=this['gaugeRate'](),_0x53255c=Math[_0x2037af('0x2a')]((_0x22b2c4-0x2)*_0x25dac3),_0x43268b=_0x2d7694-0x2,_0x29a3bf=this[_0x2037af('0x7d')](),_0x58a5ed=this[_0x2037af('0xe3')](),_0xcde14b=this[_0x2037af('0x2c')]();this[_0x2037af('0x11f')][_0x2037af('0xb3')](_0x1700af,_0x4f891a,_0x22b2c4,_0x2d7694,_0x29a3bf),this['_tpGaugeSprite'][_0x2037af('0x13a')](_0x1700af+0x1,_0x4f891a+0x1,_0x53255c,_0x43268b,_0x58a5ed,_0xcde14b);},VisuMZ['EnhancedTP'][_0x5a9f05('0x13')]=Sprite_Gauge['prototype'][_0x5a9f05('0x86')],Sprite_Gauge['prototype'][_0x5a9f05('0x86')]=function(){const _0x2f0bc4=_0x5a9f05;VisuMZ[_0x2f0bc4('0x3b')][_0x2f0bc4('0x13')][_0x2f0bc4('0xc4')](this),this[_0x2f0bc4('0x134')]();},Sprite_Gauge[_0x5a9f05('0xca')]['updateEnhancedTp']=function(){const _0x374fce=_0x5a9f05;if(this[_0x374fce('0x1d')]!=='tp')return;if(!this['_tpGaugeSprite'])return;if(!this[_0x374fce('0xdd')])return;if(this[_0x374fce('0xdd')][_0x374fce('0x19')]()){if(_0x374fce('0x43')===_0x374fce('0x43')){const _0x1893e4=this[_0x374fce('0xdd')][_0x374fce('0xd')]();this[_0x374fce('0xfe')][_0x374fce('0xd1')](this['_tpGaugeSprite']['_hue']+_0x1893e4);const _0x248ba1=this[_0x374fce('0xdd')][_0x374fce('0x88')]();this[_0x374fce('0xfe')][_0x374fce('0x101')]([0xff,0xff,0xff,_0x248ba1]);}else{function _0x1ddfd4(){const _0x37c446=_0x374fce;if(this[_0x37c446('0x5d')]===_0x28ff70)this[_0x37c446('0x93')]();return this[_0x37c446('0x5d')];}}}else this['_tpGaugeSprite'][_0x374fce('0x101')]([0xff,0xff,0xff,0x0]),this[_0x374fce('0xfe')]['setHue'](0x0);},Window_Base[_0x5a9f05('0xca')][_0x5a9f05('0x10')]=function(_0xce9a46,_0x1dcc56,_0x2fb954,_0x3d364e,_0x500dca){const _0x16f80f=_0x5a9f05;if(!_0xce9a46)return;const _0x4628df=_0x2fb954+(this['lineHeight']()-ImageManager[_0x16f80f('0x1e')])/0x2,_0x4dd972=ImageManager[_0x16f80f('0x27')]+0x4,_0x91343f=Math[_0x16f80f('0x65')](0x0,_0x3d364e-_0x4dd972);this[_0x16f80f('0x4d')](),_0x500dca&&_0x500dca['tpMode']()===_0xce9a46&&this[_0x16f80f('0xd7')](ColorManager[_0x16f80f('0x143')]()),this['drawIcon'](_0xce9a46[_0x16f80f('0x111')],_0x1dcc56,_0x4628df),this[_0x16f80f('0xb')](_0xce9a46[_0x16f80f('0x24')],_0x1dcc56+_0x4dd972,_0x2fb954,_0x91343f);},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x44')]=Window_SkillType[_0x5a9f05('0xca')][_0x5a9f05('0x74')],Window_SkillType[_0x5a9f05('0xca')][_0x5a9f05('0x74')]=function(){const _0x4fa7fd=_0x5a9f05;VisuMZ['EnhancedTP'][_0x4fa7fd('0x44')][_0x4fa7fd('0xc4')](this),this['addTpModeCommand']();},Window_SkillType['prototype'][_0x5a9f05('0xce')]=function(){const _0xfc3401=_0x5a9f05;if(!this[_0xfc3401('0x10f')]())return;let _0x49dac2=TextManager['tpModesCommandText'][_0xfc3401('0xde')](TextManager['tp']);Imported[_0xfc3401('0x78')]&&(_0x49dac2=_0xfc3401('0x6d')[_0xfc3401('0xde')](ImageManager[_0xfc3401('0xd4')],_0x49dac2)),this[_0xfc3401('0x7f')](_0x49dac2,_0xfc3401('0x103'),!![],'tpMode');},Window_SkillType[_0x5a9f05('0xca')]['isTpModeCommandVisible']=function(){const _0x2bc78f=_0x5a9f05;return $gameSystem[_0x2bc78f('0xd5')]();},VisuMZ[_0x5a9f05('0x3b')][_0x5a9f05('0x58')]=Window_SkillList[_0x5a9f05('0xca')][_0x5a9f05('0x10e')],Window_SkillList[_0x5a9f05('0xca')][_0x5a9f05('0x10e')]=function(_0x906c35){const _0x1636f0=_0x5a9f05;this['show']();if(this[_0x1636f0('0x124')])this[_0x1636f0('0x124')][_0x1636f0('0x2e')]();VisuMZ[_0x1636f0('0x3b')][_0x1636f0('0x58')]['call'](this,_0x906c35);const _0xe7f6d2=SceneManager[_0x1636f0('0xbc')];if(!_0xe7f6d2[_0x1636f0('0x135')])return;if(_0x906c35==='tpMode'){_0xe7f6d2[_0x1636f0('0x135')][_0x1636f0('0x2e')](),this[_0x1636f0('0x82')]();if(this[_0x1636f0('0x124')])this['_statusWindow'][_0x1636f0('0x82')]();}else{if(_0x1636f0('0x140')!==_0x1636f0('0x140')){function _0x188a37(){const _0x47d44f=_0x1636f0;return this[_0x47d44f('0x29')](this[_0x47d44f('0xcf')]());}}else _0xe7f6d2['_tpModeWindow']['hide']();}};function Window_TpModes(){this['initialize'](...arguments);}Window_TpModes[_0x5a9f05('0xca')]=Object[_0x5a9f05('0x6f')](Window_Selectable[_0x5a9f05('0xca')]),Window_TpModes[_0x5a9f05('0xca')]['constructor']=Window_TpModes,Window_TpModes['prototype'][_0x5a9f05('0x90')]=function(_0x252075){const _0x5ad33b=_0x5a9f05;Window_Selectable[_0x5ad33b('0xca')][_0x5ad33b('0x90')][_0x5ad33b('0xc4')](this,_0x252075),this[_0x5ad33b('0xf6')]=null,this[_0x5ad33b('0x13c')]=[],this['hide']();},Window_TpModes['prototype'][_0x5a9f05('0x25')]=function(_0x4f43e8){const _0x23f68a=_0x5a9f05;if(this[_0x23f68a('0xf6')]!==_0x4f43e8){if(_0x23f68a('0x98')!==_0x23f68a('0x98')){function _0x481092(){const _0xd36a8e=_0x23f68a;this[_0xd36a8e('0xf6')]=_0xf8dce8,this['refresh'](),this['scrollTo'](0x0,0x0);}}else this[_0x23f68a('0xf6')]=_0x4f43e8,this[_0x23f68a('0x114')](),this[_0x23f68a('0x77')](0x0,0x0);}},Window_TpModes[_0x5a9f05('0xca')]['maxCols']=function(){return 0x2;},Window_TpModes[_0x5a9f05('0xca')][_0x5a9f05('0x6b')]=function(){return 0x10;},Window_TpModes[_0x5a9f05('0xca')][_0x5a9f05('0x110')]=function(){const _0x51a9d6=_0x5a9f05;return this[_0x51a9d6('0x13c')]?this['_data'][_0x51a9d6('0x41')]:0x1;},Window_TpModes[_0x5a9f05('0xca')]['item']=function(){const _0x334697=_0x5a9f05;return this[_0x334697('0x29')](this[_0x334697('0xcf')]());},Window_TpModes['prototype'][_0x5a9f05('0x29')]=function(_0x8c1ed5){const _0x4c031b=_0x5a9f05;return this[_0x4c031b('0x13c')]&&_0x8c1ed5>=0x0?this['_data'][_0x8c1ed5]:null;},Window_TpModes[_0x5a9f05('0xca')][_0x5a9f05('0xbb')]=function(){const _0x39cb20=_0x5a9f05;if(this['_actor'])this[_0x39cb20('0x13c')]=this[_0x39cb20('0xf6')][_0x39cb20('0x6')]();else{if(_0x39cb20('0xda')!==_0x39cb20('0xda')){function _0x13bfc6(){const _0x4f5a15=_0x39cb20;return _0x111015[_0x4f5a15('0x3b')][_0x4f5a15('0xf5')][_0x4f5a15('0x54')][_0x4f5a15('0x36')][_0x4f5a15('0x1f')]()[_0x4f5a15('0x109')]();}}else this['_data']=[];}},Window_TpModes[_0x5a9f05('0xca')][_0x5a9f05('0x12a')]=function(){const _0x19aa34=_0x5a9f05;this[_0x19aa34('0x57')](0x0);},Window_TpModes[_0x5a9f05('0xca')][_0x5a9f05('0x145')]=function(_0x305d98){const _0x5bb199=_0x5a9f05,_0x18b0f9=this['itemAt'](_0x305d98);if(!_0x18b0f9)return;const _0x3381f8=this[_0x5bb199('0x125')](_0x305d98);this[_0x5bb199('0x10')](_0x18b0f9,_0x3381f8['x'],_0x3381f8['y'],_0x3381f8[_0x5bb199('0x9e')],this[_0x5bb199('0xf6')]);},Window_TpModes[_0x5a9f05('0xca')]['updateHelp']=function(){this['setHelpWindowItem'](this['item']());},Window_TpModes[_0x5a9f05('0xca')][_0x5a9f05('0x114')]=function(){const _0x312c5d=_0x5a9f05;this[_0x312c5d('0xbb')](),Window_Selectable['prototype']['refresh'][_0x312c5d('0xc4')](this);},Window_TpModes[_0x5a9f05('0xca')][_0x5a9f05('0x85')]=function(){SoundManager['playEquip']();};
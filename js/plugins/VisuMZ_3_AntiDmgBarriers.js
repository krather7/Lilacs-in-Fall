//=============================================================================
// VisuStella MZ - Anti-Damage Barriers
// VisuMZ_3_AntiDmgBarriers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AntiDmgBarriers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AntiDmgBarriers = VisuMZ.AntiDmgBarriers || {};
VisuMZ.AntiDmgBarriers.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.00] [AntiDmgBarriers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Anti-Damage_Barriers_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @base VisuMZ_1_ElementStatusCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ElementStatusCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ does not have many options for damage mitigation. There are
 * only raw defensive parameters, elemental rates, and direct damage modifiers.
 * This plugin introduces six categories of Anti-Damage Barriers made in the
 * form of states to allow you to create more ways for the player's party to
 * defend themselves with.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Cancellation Barriers that can block out damage entirely if the damage is
 *   above or below a certain threshold.
 * * Nullification Barriers that block out damage entirely, but have a limited
 *   amount of times they can block damage for.
 * * Reduction Barriers that can stack additively with one another to provide
 *   percentile reduction values.
 * * Absorption Barriers which contain an exact number of points of damage that
 *   they can soak up.
 * * MP Barriers that disperses a percentage of the damage towards a battler's
 *   MP pool as long as they have enough MP.
 * * TP Barriers that function similarly to MP Barriers except they disperse
 *   the damage dealt instead to the TP pool.
 * * The ability to set barriers to block specific types of damage ranging from
 *   all, certain hits, physical hits, magical hits, and even elemental hits.
 * * Skill and trait effects that can bypass barriers.
 * * Make certain barrier types fragile and will break upon receiving specific
 *   types of damage (elemental, physical, magical, etc).
 * * Nullification and Absorption Barriers can regenerate themselves and/or
 *   decay over time.
 * * Playing specific animations whenever barriers tank a hit or break.
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
 * * VisuMZ_1_SkillsStatesCore
 * * VisuMZ_1_ElementStatusCore
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
 * How Barriers Work
 * ============================================================================
 *
 * When an action successfully hits an actor, damage is calculated. Barriers do
 * not block damage that comes directly from event commands, plugin commands,
 * script calls, percentile HP action effects, or damage over time states.
 * 
 * Instead, they must come directly from a damage formula source. Before that
 * damage is applied to a battler, the following series of events happen:
 *
 * ---
 * 
 * === HP Damage Check ===
 * 
 * Check to see if the action is dealing HP damage. This does not apply for MP
 * or TP damage. If no HP damage is being dealt, ignore the rest.
 * 
 * ---
 * 
 * === State Breakers ===
 * 
 * Some states can have the unique trait of dispersing upon receiving specific
 * kinds of damage using the notetags from this plugin. These range from
 * breaking under any kind of damage, certain hit damage, physical damage,
 * magical magical, and elemental damage. If the damage to be dealt is
 * affiliated with any of the listed and the state is vulnerable to that kind
 * of damage, immediately destroy the state before the damage calculations are
 * made. This will affect any of the states remaining.
 * 
 * ---
 * 
 * === Barrier Ignore ===
 * 
 * Check if the action itself (skill or item), if the attacking battler, or if
 * the defending battler has any notetags that would cause them to ignore any
 * barrier effects. If there are, ignore the rest.
 * 
 * ---
 * 
 * === Cancellation Barriers ===
 * 
 * Check for any Cancellation Barriers. Cancellation Barriers come in two
 * different types: Over and Under. The value listed for a Cancel Over Barrier
 * will cancel damage equal to or over a specific amount. The reverse is true
 * for a Cancel Under Barrier as it will cancel damage equal to or under a
 * specific amount. If damage is blocked here, it is blocked entirely and the
 * rest of the steps do not need any calculations made.
 * 
 * ---
 * 
 * === Nullification Barriers ===
 * 
 * Next, check for any Nullification Barriers. These Barriers have a charge to
 * them displayed separate from their turn count. Any matching damage dealt
 * while a Nullification Barrier is active will be reduced entirely to 0 at the
 * cost of one of the Nullification Barrier's charges. If the Nullification
 * Barrier's charges reach 0, that state is automatically removed. If damage
 * is blocked here, it is blocked entirely and the rest of the steps do not 
 * need any calculations made.
 * 
 * If a battler has multiple Nullification Barriers, then charges will be
 * removed from Nullification Barriers with the least amount of turns remaining
 * to the ones with the most amount of turns remaining (or indefinite). If two
 * Nullification Barriers have an equal amount of turns remaining, then the
 * charge will be deducted from the one with the higher priority. If both
 * priorities are the same, then the charge will be deducted will be the one
 * with a lower database ID.
 * 
 * Renewing a Nullification Barrier's state will recalculate its charge count.
 * 
 * ---
 * 
 * === Battle Core's Pre-Damage Step ===
 * 
 * Here, the Battle Core's Pre-Damage Step takes effect. This means any of the
 * <JS Pre-Damage> and related notetags will take effect and any damage
 * modifications made from them will be carried forward.
 * 
 * ---
 * 
 * === Reduction Barriers ===
 * 
 * After applying the Battle Core's Pre-Damage Step, the Reduction Barriers
 * will have their turn. Reduction Barriers can stack with each other and they
 * stack additively. This means if you have a Reduction Barrier state worth
 * 10% and another one that is worth 20% on the same battler, then a total of
 * 30% damage will be reduced. If damage reaches zero, skip the remaining
 * Barrier calculations.
 * 
 * ---
 * 
 * === Absorption Barriers ===
 * 
 * Absorption Barrier states have a set value that they can absorb. This value
 * can be a static number or it can be calculated by a formula. The barrier
 * value an Absorption Barrier has will trade damage 1 for 1. Once the
 * Absorption Barrier reaches 0, it will automatically remove itself. If damage
 * reaches zero, skip the remaining Barrier calculations.
 * 
 * If there is 500 incoming damage and an Absorption Barrier of 100 is present,
 * then 400 damage will go through and the Absorption Barrier is reduced to 0,
 * thus removing itself.
 * 
 * If there is 100 incoming damage and an Absorption Barrier of 500 is present,
 * then 0 damage will go through and the Absorption Barrier is reduced to 400.
 * The Absorption Barrier will remain.
 * 
 * If a battler has multiple Absorption Barriers, then barriers will be removed
 * from Absorption Barriers with the least amount of turns remaining to the
 * ones with the most amount of turns remaining (or indefinite). If two
 * Absorption Barriers have an equal amount of turns remaining, then the
 * barriers deducted from the one with the higher priority. If both priorities
 * are the same, then the barrier deducted from will be the one with a lower
 * database ID.
 * 
 * Renewing an Absorption Barrier's state will recalculate its barrier count.
 * 
 * ---
 * 
 * === MP-Dispersion Barriers ===
 * 
 * If any MP-Dispersion Barriers are present, then it's time for them to take
 * effect. MP Barriers can block a percentage of the damage using MP, trading
 * off 1 for 1. If an MP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to MP (or less if there's insufficient MP). If a battler
 * runs out of MP after this step, the MP-Dispersion Barrier will automatically
 * remove itself. If damage reaches zero, skip the remaining Barrier
 * calculations.
 * 
 * ---
 * 
 * === TP-Dispersion Barriers ===
 * 
 * If any TP-Dispersion Barriers are present, then it's time for them to take
 * effect. TP Barriers can block a percentage of the damage using TP, trading
 * off 1 for 1. If a TP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to TP (or less if there's insufficient TP). If a battler
 * runs out of TP after this step, the TP-Dispersion Barrier will automatically
 * remove itself.
 * 
 * Some battlers might gain TP upon being hit. This gained TP does not apply
 * to the TP-Dispersion Barrier as it is generated after being hit.
 * 
 * ---
 * 
 * === Final Damage ===
 * 
 * After a long, long journey, any remaining damage will be dealt to the target
 * battler (unless there's other plugins affecting damage further).
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
 * === Cancellation Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Barrier Cancel Damage Over: x>
 * <hitType Barrier Cancel Damage Over: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or over a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Over: 1000>
 *   <Physical Barrier Cancel Damage Over: 500>
 *   <Magical Barrier Cancel Damage Over: user.def + target.mdf>
 *   <Element Fire Cancel Damage Over: Math.randomInt(300)>
 *   <Element Wind, Ice Barrier Cancel Damage Over: $gameVariables.value(42)>
 *
 * ---
 *
 * <hitType Barrier Cancel Damage Under: x>
 * <hitType Barrier Cancel Damage Under: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or under a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Under: 100>
 *   <Physical Barrier Cancel Damage Under: 200>
 *   <Magical Barrier Cancel Damage Under: user.def + target.mdf>
 *   <Element Fire Barrier Cancel Damage Under: Math.randomInt(500)>
 *   <Element Wind, Ice Barrier Cancel Damage Under: $gameVariables.value(42)>
 *
 * ---
 * 
 * === Nullification Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Nullify Barrier: x>
 * <hitType Nullify Barrier: formula>
 *
 * - Used for: State Notetags
 * - Nullification Barriers block all damage at the cost of one charge.
 * - If a Nullification Barrier runs out of charges, it will automatically
 *   remove itself from the battler.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the number of charges the
 *   Nullification Barrier will have.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's charges.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Absorption Barrier effect and
 *   both cannot be placed on the same state. They can, however, be placed on
 *   two separate states.
 * 
 *   Examples:
 * 
 *   <All Nullify Barrier: 3>
 *   <Physical Nullify Barrier: 5>
 *   <Magical Nullify Barrier: user.level + target.level>
 *   <Element Fire Nullify Barrier: Math.randomInt(10)>
 *   <Element Wind, Ice Nullify Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Nullify Barrier Degen: x>
 * <Nullify Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will decay by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Degen: 1>
 *   <Nullify Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Nullify Barrier Regen: x>
 * <Nullify Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to raise by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will regen by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Regen: 1>
 *   <Nullify Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === Reduction Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Reduce Barrier: x%>
 * <hitType Reduce Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into a Reduction Barrier. Reduction Barriers reduce
 *   incoming damage by a percentile.
 * - If a battler has multiple Reduction Barriers, they stack additively.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage it
 *   will reduce by.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be reduced by.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Reduce Barrier: 20%>
 *   <Physical Reduce Barrier: 40%>
 *   <Magical Reduce Barrier: user.hpRate()>
 *   <Element Fire Reduce Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice Reduce Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Absorption Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Absorb Barrier: x>
 * <hitType Absorb Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into an Absorption Barrier which contains a visible
 *   barrier that will block damage 1 for 1.
 * - If the Absorption Barrier's value is reduced to 0, it will automatically
 *   remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the barrier value the
 *   Absorption Barrier state has upon being applied.
 * - Replace 'formula' with a calculation that determines what barrier value
 *   Absorption Barrier state has upon being applied.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Nullification Barrier effect
 *   and both cannot be placed on the same state. They can, however, be placed
 *   on two separate states.
 * 
 *   Examples:
 * 
 *   <All Absorb Barrier: 300>
 *   <Physical Absorb Barrier: 500>
 *   <Magical Absorb Barrier: user.def + target.mdf>
 *   <Element Fire Absorb Barrier: Math.randomInt(1000)>
 *   <Element Wind, Ice Absorb Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Absorb Barrier Degen: x>
 * <Absorb Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will decay by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Degen: 1>
 *   <Absorb Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Absorb Barrier Regen: x>
 * <Absorb Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to regen by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will regen by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Regen: 1>
 *   <Absorb Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === MP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType MP Barrier: x%>
 * <hitType MP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into an MP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's MP pool.
 * - Damage will be dispersed 1 for 1 with MP. If there is insufficient MP,
 *   the damage dispersion percentile will be reduced to account for MP.
 * - If MP reaches 0, the state will automatically remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's MP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the MP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All MP Barrier: 20%>
 *   <Physical MP Barrier: 40%>
 *   <Magical MP Barrier: user.hpRate()>
 *   <Element Fire MP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice MP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === TP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType TP Barrier: x%>
 * <hitType TP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a TP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's TP pool.
 * - Damage will be dispersed 1 for 1 with TP. If there is insufficient TP,
 *   the damage dispersion percentile will be reduced to account for TP.
 * - If TP reaches 0, the state will automatically remove itself.
 * - TP can be generated upon being hit. This gained TP does not apply to the
 *   TP-Dispersion Barrier as it is generated after being hit.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's TP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the TP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All TP Barrier: 20%>
 *   <Physical TP Barrier: 40%>
 *   <Magical TP Barrier: user.hpRate()>
 *   <Element Fire TP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice TP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Barrier Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Ignore Barriers>
 *
 * - Used for: Skill, Item Notetags
 * - Causes this skill or item to completely ignore any barriers on the target.
 *
 * ---
 *
 * <Ignore Barriers as User>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If an attacker with this notetag on any of its trait objects attacks a
 *   target with barriers, ignore the target's barriers.
 *
 * ---
 *
 * <Ignore Barriers as Target>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a target battler has this notetag on any of its trait objects receives
 *   an attack, any barriers on the target battler will be ignored.
 *
 * ---
 * 
 * === Break State-Related Notetags ===
 * 
 * ---
 *
 * <hitType Breaks State>
 *
 * - Used for: State Notetags
 * - If an attack hits a battler with this state and state's notetag, as long
 *   as the damage type matches, automatically remove the state.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - This can be used for states that aren't barriers.
 * - This occurs before most of the pre-damage phase.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Absorption Barriers
 * ============================================================================
 *
 * Settings for the Absorption Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much barrier was lost.
 *   - %1 - Barrier
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
 * Plugin Parameters: Cancellation Barriers
 * ============================================================================
 *
 * Settings for the Cancellation Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: MP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the MP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Nullification Barriers
 * ============================================================================
 *
 * Settings for the Nullificaton Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reduction Barriers
 * ============================================================================
 *
 * Settings for the Reduction Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the TP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much TP was lost.
 *   - %1 - TP Lost, %2 - TP Text
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
 * Version 1.00: November 4, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableAntiDmgBarriersMenu
 * @text System: Enable AntiDmgBarriers in Menu?
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowAntiDmgBarriersMenu
 * @text System: Show AntiDmgBarriers in Menu?
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
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
 * @param AntiDmgBarriers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Absorb:struct
 * @text Absorption Barriers
 * @type struct<Absorb>
 * @desc Settings for the Absorption Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"4","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"5","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1","TextColor:str":"27","FlashColor:eval":"[255, 0, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Cancel:struct
 * @text Cancellation Barriers
 * @type struct<Cancel>
 * @desc Settings for the Cancellation Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"119","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"15","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param MP:struct
 * @text MP-Dispersion Barriers
 * @type struct<MP>
 * @desc Settings for the MP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"62","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"81","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Nullify:struct
 * @text Nullification Barriers
 * @type struct<Nullify>
 * @desc Settings for the Nullificaton Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"58","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"11","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Reduce:struct
 * @text Reduction Barriers
 * @type struct<Reduce>
 * @desc Settings for the Reduction Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"53","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"14","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param TP:struct
 * @text TP-Dispersion Barriers
 * @type struct<TP>
 * @desc Settings for the TP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"91","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"45","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1 %2","TextColor:str":"29","FlashColor:eval":"[0, 255, 0, 160]","FlashDuration:num":"60"}
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
 * Absorption Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Absorb:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 4
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 5
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much barrier was lost.
 * %1 - Barrier
 * @default -%1
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Cancellation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cancel:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 119
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 15
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * MP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 62
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 61
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Nullify Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Nullify:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 58
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 11
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Reduction Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Reduce:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 53
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 14
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * TP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 91
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 45
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much TP was lost.
 * %1 - TP Lost, %2 - TP Text
 * @default -%1 %2
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x275d=['replace','filter','regenerateAntiDamageBarriers','Armor-%1-%2','matchesAntiDamageBarrierType','UWTeG','_antiDamageBarrierReduction','applyTpBarrier','parameters','matchesAntiDamageBarrierElementType','onAntiDamageCancelBarrier','sort','Skill-%1-%2','ceil','crWlL','split','CalculateCharges','onAntiDamageBarrierEffect','NullBarrier','jimTP','call','createJsTargets','VisuMZ_0_CoreEngine','states','parse','stateTurns','kGNvN','YITJc','displayAbsorptionBarrierPopup','vvFKL','%1AnimationID','applyPreAntiDamageBarriers','FlashColor','kalTr','Type8','getAntiDamageBarrierTp','clamp','Game_Battler_regenerateAll','VisuMZ_1_BattleCore','ouPNm','bjQJW','removeState','_subject','_antiDamageBarrierCancelUnder','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isSceneBattle','createJS','some','note','matchesAntiDamageBarrier','OYajX','TextColor','requestFauxAnimation','applyMpBarrier','IgnoreAllBarrierAsDefender','ARRAYJSON','min','%1Mute','isPlaytest','BarrierRegen','ignoreAllAntiDamageBarriers','Intact','onAntiDamageReductionBarrier','pmhyw','Game_Battler_addState','Absorb','initMembers','jzxuP','ConvertParams','_antiDamageBarrierCancelOver','applyCancelOverBarrier','onAntiDamageAbsorptionBarrier','GNvBQ','WWhON','Item-%1-%2','setAntiDamageBarrierMp','FKYJR','getStateDisplay','applyBattleCoreJS','PWupX','onDatabaseLoaded','applyReductionBarrier','displayTpBarrierPopup','ouzYz','addState','isAntiDamageBarrierIgnoredAsTarget','blah','format','CancelOver','setAntiDamageBarrierCancelUnder','Break','gJFuz','oVGLJ','IgnoreAllBarrier','prototype','name','ALL','autoRemovalTiming','onAntiDamageTpBarrier','status','VisuMZ_1_SkillsStatesCore','gainMp','AbsorbBarrier','getElementIdWithName','ARRAYSTR','subject','BarrierDegen','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','CndrW','KEnlL','PreDamage%1JS','ARRAYEVAL','user','pgmHh','YipGG','onAntiDamageMpBarrier','setStateDisplay','isCertainHit','Game_Action_applyBattleCoreJS','_antiDamageBarrierTp','nXXVo','isAntiDamageBarrierIgnored','getAntiDamageBarrierCancelUnder','applyNullificationBarrier','regenerateAll','State-%1-%2','applyPostAntiDamageBarriers','cGAmD','setupTextPopup','Cancel','process_VisuMZ_AntiDmgBarriers_Notetags','InsertKeyTypeHere','MAX_SAFE_INTEGER','exit','onAntiDamageNullificationBarrier','ARRAYNUM','applyBreakStateEffects','Reduce','TpBarrier','skills','fuDoC','PNNpY','setAntiDamageBarrierCancelOver','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','UFBVB','PopupText','MpBarrier','qxWkY','includes','MwtRj','_antiDamageBarrierMp','Settings','regenerateAntiDamageBarrierState','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','isAntiDamageBarrierIgnoredAsSubject','return\x200','getAntiDamageBarrierMp','description','match','createKeyJS','Weapon-%1-%2','version','AntiDmgBarriers','WAaBH','Class-%1-%2','trim','isPhysical','process_VisuMZ_AntiDmgBarriers_JS','clearJsTargets','gODoj','toUpperCase','target','Nullify','initAntiDamageBarriers','setAntiDamageBarrierReduction','CancelUnder','FUNC','FlashDuration','Pbqol','mSkRC','Scene_Boot_onDatabaseLoaded','ReduceBarrier','priority','ANY','mfsLR','EVAL','gainTp','Enemy-%1-%2','%1Mirror','setAntiDamageBarrierTp','JSON','isStateAffected','getAntiDamageBarrierStates','DAMAGE','StateMatchesBreakEffect','elements','applyCancelUnderBarrier','traitObjects','applyAbsorptionBarrier','XyPCJ','process_VisuMZ_AntiDmgBarriers','isHpEffect','processBreakStateEffect','map','wHWHa','isAlive','getAntiDamageBarrierReduction','ARRAYSTRUCT','rncUu','Game_BattlerBase_initMembers','tnWGP','getAntiDamageBarrierCancelOver','RegExp','sTYcF','item','STR'];(function(_0x370a23,_0x275d7a){const _0x281bc5=function(_0x3ec001){while(--_0x3ec001){_0x370a23['push'](_0x370a23['shift']());}};_0x281bc5(++_0x275d7a);}(_0x275d,0x73));const _0x281b=function(_0x370a23,_0x275d7a){_0x370a23=_0x370a23-0x0;let _0x281bc5=_0x275d[_0x370a23];return _0x281bc5;};const _0x2c2200=_0x281b;var label=_0x2c2200('0x2f'),tier=tier||0x0,dependencies=[_0x2c2200('0x7b'),_0x2c2200('0x8b'),_0x2c2200('0xc9'),'VisuMZ_1_ElementStatusCore'],pluginData=$plugins[_0x2c2200('0x66')](function(_0x26e4cb){const _0x174873=_0x2c2200;return _0x26e4cb[_0x174873('0xc8')]&&_0x26e4cb[_0x174873('0x2a')][_0x174873('0x21')]('['+label+']');})[0x0];VisuMZ[label][_0x2c2200('0x24')]=VisuMZ[label][_0x2c2200('0x24')]||{},VisuMZ[_0x2c2200('0xa9')]=function(_0x146478,_0x45b6c1){const _0x260353=_0x2c2200;for(const _0x2740ef in _0x45b6c1){if(_0x2740ef['match'](/(.*):(.*)/i)){const _0x4b0a10=String(RegExp['$1']),_0x176c88=String(RegExp['$2'])[_0x260353('0x37')]()[_0x260353('0x32')]();let _0x3bd949,_0x4732e9,_0x59e59a;switch(_0x176c88){case'NUM':_0x3bd949=_0x45b6c1[_0x2740ef]!==''?Number(_0x45b6c1[_0x2740ef]):0x0;break;case _0x260353('0x14'):_0x4732e9=_0x45b6c1[_0x2740ef]!==''?JSON[_0x260353('0x7d')](_0x45b6c1[_0x2740ef]):[],_0x3bd949=_0x4732e9[_0x260353('0x58')](_0xed6be0=>Number(_0xed6be0));break;case _0x260353('0x46'):_0x3bd949=_0x45b6c1[_0x2740ef]!==''?eval(_0x45b6c1[_0x2740ef]):null;break;case _0x260353('0xd4'):_0x4732e9=_0x45b6c1[_0x2740ef]!==''?JSON[_0x260353('0x7d')](_0x45b6c1[_0x2740ef]):[],_0x3bd949=_0x4732e9[_0x260353('0x58')](_0x6b6d32=>eval(_0x6b6d32));break;case _0x260353('0x4b'):_0x3bd949=_0x45b6c1[_0x2740ef]!==''?JSON['parse'](_0x45b6c1[_0x2740ef]):'';break;case _0x260353('0x9c'):_0x4732e9=_0x45b6c1[_0x2740ef]!==''?JSON[_0x260353('0x7d')](_0x45b6c1[_0x2740ef]):[],_0x3bd949=_0x4732e9['map'](_0x478294=>JSON[_0x260353('0x7d')](_0x478294));break;case _0x260353('0x3d'):_0x3bd949=_0x45b6c1[_0x2740ef]!==''?new Function(JSON[_0x260353('0x7d')](_0x45b6c1[_0x2740ef])):new Function(_0x260353('0x28'));break;case'ARRAYFUNC':_0x4732e9=_0x45b6c1[_0x2740ef]!==''?JSON[_0x260353('0x7d')](_0x45b6c1[_0x2740ef]):[],_0x3bd949=_0x4732e9[_0x260353('0x58')](_0x196318=>new Function(JSON[_0x260353('0x7d')](_0x196318)));break;case _0x260353('0x64'):_0x3bd949=_0x45b6c1[_0x2740ef]!==''?String(_0x45b6c1[_0x2740ef]):'';break;case _0x260353('0xcd'):_0x4732e9=_0x45b6c1[_0x2740ef]!==''?JSON[_0x260353('0x7d')](_0x45b6c1[_0x2740ef]):[],_0x3bd949=_0x4732e9[_0x260353('0x58')](_0x56fedd=>String(_0x56fedd));break;case'STRUCT':_0x59e59a=_0x45b6c1[_0x2740ef]!==''?JSON[_0x260353('0x7d')](_0x45b6c1[_0x2740ef]):{},_0x3bd949=VisuMZ[_0x260353('0xa9')]({},_0x59e59a);break;case _0x260353('0x5c'):_0x4732e9=_0x45b6c1[_0x2740ef]!==''?JSON['parse'](_0x45b6c1[_0x2740ef]):[],_0x3bd949=_0x4732e9[_0x260353('0x58')](_0x4a750e=>VisuMZ[_0x260353('0xa9')]({},JSON[_0x260353('0x7d')](_0x4a750e)));break;default:continue;}_0x146478[_0x4b0a10]=_0x3bd949;}}return _0x146478;},(_0x44a6d2=>{const _0x5bd880=_0x2c2200,_0x3328ac=_0x44a6d2[_0x5bd880('0xc4')];for(const _0x53e575 of dependencies){if(!Imported[_0x53e575]){alert(_0x5bd880('0x1c')['format'](_0x3328ac,_0x53e575)),SceneManager[_0x5bd880('0x12')]();break;}}const _0x5b3bf5=_0x44a6d2['description'];if(_0x5b3bf5[_0x5bd880('0x2b')](/\[Version[ ](.*?)\]/i)){const _0x4ed1e6=Number(RegExp['$1']);_0x4ed1e6!==VisuMZ[label][_0x5bd880('0x2e')]&&(alert(_0x5bd880('0x26')[_0x5bd880('0xbc')](_0x3328ac,_0x4ed1e6)),SceneManager['exit']());}if(_0x5b3bf5[_0x5bd880('0x2b')](/\[Tier[ ](\d+)\]/i)){const _0x54934d=Number(RegExp['$1']);_0x54934d<tier?(alert(_0x5bd880('0x91')['format'](_0x3328ac,_0x54934d,tier)),SceneManager[_0x5bd880('0x12')]()):tier=Math['max'](_0x54934d,tier);}VisuMZ[_0x5bd880('0xa9')](VisuMZ[label]['Settings'],_0x44a6d2[_0x5bd880('0x6d')]);})(pluginData),VisuMZ[_0x2c2200('0x2f')][_0x2c2200('0x41')]=Scene_Boot[_0x2c2200('0xc3')][_0x2c2200('0xb5')],Scene_Boot['prototype'][_0x2c2200('0xb5')]=function(){const _0x14e365=_0x2c2200;VisuMZ[_0x14e365('0x2f')][_0x14e365('0x41')][_0x14e365('0x79')](this),this['process_VisuMZ_AntiDmgBarriers']();},Scene_Boot[_0x2c2200('0xc3')][_0x2c2200('0x55')]=function(){const _0x19efae=_0x2c2200;this[_0x19efae('0xf')](),this[_0x19efae('0x34')]();},VisuMZ[_0x2c2200('0x2f')][_0x2c2200('0x61')]={'IgnoreAllBarrier':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS)>/gi,'IgnoreAllBarrierAsAttacker':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:ATTACKER|USER)>/gi,'IgnoreAllBarrierAsDefender':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:TARGET|DEFENDER)>/gi,'CancelOver':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG OVER|DAMAGE OVER|OVER):[ ](.*)>/gi,'CancelUnder':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG UNDER|DAMAGE UNDER|UNDER):[ ](.*)>/gi,'NullBarrier':/<(.*)[ ](?:NULLIFY|NULL|NULLIFICATION)[ ]BARRIER:[ ](.*)>/gi,'ReduceBarrier':/<(.*)[ ](?:CUT|REDUCE|REDUCTION)[ ]BARRIER:[ ](.*)>/gi,'AbsorbBarrier':/<(.*)[ ](?:ABSORB|ABSORPTION)[ ]BARRIER:[ ](.*)>/gi,'MpBarrier':/<(.*)[ ](?:MP|MAGIC|MANA)[ ]BARRIER:[ ](.*)>/gi,'TpBarrier':/<(.*)[ ](?:TP|TECH|LIMIT)[ ]BARRIER:[ ](.*)>/gi,'BreakState':/<(.*)[ ](?:BREAK|BREAKS)[ ]STATE>/gi,'BarrierDegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:DECAY|DEGEN):[ ](.*)>/gi,'BarrierRegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:REGENERATION|REGEN):[ ](.*)>/gi},Scene_Boot['prototype'][_0x2c2200('0xf')]=function(){const _0x4620b8=_0x2c2200;for(const _0x21a5a0 of $dataActors){if(!_0x21a5a0)continue;_0x21a5a0[_0x4620b8('0xbb')]=![];const _0x2925d4=_0x21a5a0[_0x4620b8('0x95')];if(_0x2925d4[_0x4620b8('0x2b')](/<NOTETAG:[ ](\d+)>/i)){if(_0x4620b8('0x36')!=='gODoj'){function _0x2f8852(){const _0x4ffd6b=_0x4620b8,_0x29f09b=_0x5e9122[_0x4ffd6b('0x52')](),_0x76d238=_0x4ba812[_0x4ffd6b('0x2f')][_0x4ffd6b('0x61')][_0x4ffd6b('0x9b')];return _0x29f09b[_0x4ffd6b('0x94')](_0x5c246d=>_0x5c246d&&_0x5c246d[_0x4ffd6b('0x95')]&&_0x5c246d[_0x4ffd6b('0x95')][_0x4ffd6b('0x2b')](_0x76d238));}}else _0x21a5a0[_0x4620b8('0xbb')]=Number(RegExp['$1']);}}},VisuMZ[_0x2c2200('0x2f')]['JS']={},Scene_Boot['prototype'][_0x2c2200('0x34')]=function(){const _0x24c1e0=_0x2c2200,_0x5c2ded=$dataActors['concat']($dataClasses,$dataSkills,$dataItems,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0xee664e of _0x5c2ded){if(!_0xee664e)continue;const _0x1a5d02=_0x24c1e0('0x10'),_0x82beef=VisuMZ[_0x24c1e0('0x2f')][_0x24c1e0('0x61')][_0x24c1e0('0x87')];VisuMZ[_0x24c1e0('0x2f')][_0x24c1e0('0x93')](_0xee664e,_0x1a5d02,_0x82beef);}},VisuMZ['AntiDmgBarriers']['createJS']=function(_0x280439,_0x2540f5,_0x17aeb8){const _0x4e1d7d=_0x2c2200,_0x30cde5=_0x280439['note'];if(_0x30cde5[_0x4e1d7d('0x2b')](_0x17aeb8)){const _0x2295c3=String(RegExp['$1']),_0x45fb6f=_0x4e1d7d('0xd0')[_0x4e1d7d('0xbc')](_0x2295c3),_0x55d6de=VisuMZ[_0x4e1d7d('0x2f')]['createKeyJS'](_0x280439,_0x2540f5);VisuMZ[_0x4e1d7d('0x2f')]['JS'][_0x55d6de]=new Function(_0x45fb6f);}},VisuMZ[_0x2c2200('0x2f')][_0x2c2200('0x2c')]=function(_0x50d5a7,_0x2d1aa2){const _0x58e692=_0x2c2200;let _0x5b02dc='';if($dataActors[_0x58e692('0x21')](_0x50d5a7))_0x5b02dc='Actor-%1-%2'['format'](_0x50d5a7['id'],_0x2d1aa2);if($dataClasses[_0x58e692('0x21')](_0x50d5a7))_0x5b02dc=_0x58e692('0x31')[_0x58e692('0xbc')](_0x50d5a7['id'],_0x2d1aa2);if($dataSkills[_0x58e692('0x21')](_0x50d5a7))_0x5b02dc=_0x58e692('0x71')['format'](_0x50d5a7['id'],_0x2d1aa2);if($dataItems['includes'](_0x50d5a7))_0x5b02dc=_0x58e692('0xaf')[_0x58e692('0xbc')](_0x50d5a7['id'],_0x2d1aa2);if($dataWeapons[_0x58e692('0x21')](_0x50d5a7))_0x5b02dc=_0x58e692('0x2d')[_0x58e692('0xbc')](_0x50d5a7['id'],_0x2d1aa2);if($dataArmors[_0x58e692('0x21')](_0x50d5a7))_0x5b02dc=_0x58e692('0x68')['format'](_0x50d5a7['id'],_0x2d1aa2);if($dataEnemies[_0x58e692('0x21')](_0x50d5a7))_0x5b02dc=_0x58e692('0x48')[_0x58e692('0xbc')](_0x50d5a7['id'],_0x2d1aa2);if($dataStates[_0x58e692('0x21')](_0x50d5a7))_0x5b02dc=_0x58e692('0xa')[_0x58e692('0xbc')](_0x50d5a7['id'],_0x2d1aa2);return _0x5b02dc;},VisuMZ[_0x2c2200('0x2f')][_0x2c2200('0x3')]=Game_Action[_0x2c2200('0xc3')][_0x2c2200('0xb3')],Game_Action[_0x2c2200('0xc3')][_0x2c2200('0xb3')]=function(_0x39ae53,_0x67ef09,_0x26cc91,_0x2f6c47){const _0x21f1d9=_0x2c2200,_0x3769f4=_0x39ae53===_0x21f1d9('0xd3')&&this[_0x21f1d9('0x56')]()&&_0x26cc91>0x0;if(_0x3769f4){if(_0x21f1d9('0x5d')===_0x21f1d9('0x1a')){function _0x18ba5d(){const _0x1e1de5=_0x21f1d9;return this[_0x1e1de5('0x6e')](_0x4fb50b);}}else _0x67ef09[_0x21f1d9('0x15')](this);}if(_0x3769f4){if(_0x21f1d9('0x73')!=='MjSqp')_0x26cc91=this[_0x21f1d9('0x84')](_0x67ef09,_0x26cc91);else{function _0x404d92(){const _0x285356=_0x21f1d9;_0xd2d036[_0x285356('0xbb')]=_0x1b28b0(_0x3e6956['$1']);}}}return _0x26cc91=VisuMZ[_0x21f1d9('0x2f')][_0x21f1d9('0x3')][_0x21f1d9('0x79')](this,_0x39ae53,_0x67ef09,_0x26cc91,_0x2f6c47),_0x3769f4&&(_0x26cc91=this['applyPostAntiDamageBarriers'](_0x67ef09,_0x26cc91)),_0x26cc91;},Game_Action[_0x2c2200('0xc3')][_0x2c2200('0x84')]=function(_0x1a458f,_0x36dddf){const _0x232108=_0x2c2200;if(this[_0x232108('0x6')](_0x1a458f))return _0x36dddf;if(this[_0x232108('0xab')](_0x1a458f,_0x36dddf))return 0x0;if(this[_0x232108('0x51')](_0x1a458f,_0x36dddf))return 0x0;if(this[_0x232108('0x8')](_0x1a458f))return 0x0;return _0x36dddf;},Game_Action[_0x2c2200('0xc3')][_0x2c2200('0xb')]=function(_0x496b8a,_0x3ffd2d){const _0x183c6a=_0x2c2200;if(this['isAntiDamageBarrierIgnored'](_0x496b8a))return _0x3ffd2d;if(_0x3ffd2d<=0x0)return _0x3ffd2d;return _0x3ffd2d=this['applyReductionBarrier'](_0x496b8a,_0x3ffd2d),_0x3ffd2d=this[_0x183c6a('0x53')](_0x496b8a,_0x3ffd2d),_0x3ffd2d=this[_0x183c6a('0x9a')](_0x496b8a,_0x3ffd2d),_0x3ffd2d=this[_0x183c6a('0x6c')](_0x496b8a,_0x3ffd2d),_0x3ffd2d;},Game_Action[_0x2c2200('0xc3')]['isAntiDamageBarrierIgnored']=function(_0x4e8980){const _0x59787d=_0x2c2200;if(this['item']()&&this['item']()[_0x59787d('0x95')][_0x59787d('0x2b')](VisuMZ[_0x59787d('0x2f')]['RegExp'][_0x59787d('0xc2')]))return!![];if(this[_0x59787d('0x27')]())return!![];if(this[_0x59787d('0xba')](_0x4e8980))return!![];return![];},Game_Action['prototype']['isAntiDamageBarrierIgnoredAsSubject']=function(){const _0x1354f1=_0x2c2200,_0xfa878f=this[_0x1354f1('0xce')]()[_0x1354f1('0x52')](),_0x253fb9=VisuMZ[_0x1354f1('0x2f')][_0x1354f1('0x61')]['IgnoreAllBarrierAsAttacker'];return _0xfa878f['some'](_0x28fbdc=>_0x28fbdc&&_0x28fbdc[_0x1354f1('0x95')]&&_0x28fbdc[_0x1354f1('0x95')][_0x1354f1('0x2b')](_0x253fb9));},Game_Action[_0x2c2200('0xc3')]['isAntiDamageBarrierIgnoredAsTarget']=function(_0x213ec2){const _0x2df770=_0x2c2200,_0x2fb1be=_0x213ec2[_0x2df770('0x52')](),_0x57d259=VisuMZ['AntiDmgBarriers'][_0x2df770('0x61')][_0x2df770('0x9b')];return _0x2fb1be['some'](_0x5d64e5=>_0x5d64e5&&_0x5d64e5[_0x2df770('0x95')]&&_0x5d64e5[_0x2df770('0x95')][_0x2df770('0x2b')](_0x57d259));},Game_Action[_0x2c2200('0xc3')][_0x2c2200('0x8')]=function(_0x5ccadb){const _0x35a6ef=_0x2c2200,_0x2691c3=_0x5ccadb['getAntiDamageBarrierStates']();for(const _0x1a26c4 of _0x2691c3){if(_0x35a6ef('0x40')!=='mSkRC'){function _0x55083c(){const _0x510f9c=_0x35a6ef;return this[_0x510f9c('0x2')]();}}else{if(!_0x1a26c4)continue;if(this[_0x35a6ef('0x96')](_0x1a26c4,_0x35a6ef('0x77')))return _0x5ccadb['onAntiDamageNullificationBarrier'](_0x1a26c4),!![];}}return![];},Game_Action['prototype'][_0x2c2200('0xab')]=function(_0x1f82d7,_0x1c9f9f){const _0x37577c=_0x2c2200,_0x591801=_0x1f82d7[_0x37577c('0x7c')]();for(const _0x591aab of _0x591801){if(_0x37577c('0xae')===_0x37577c('0x82')){function _0x151563(){const _0x3c4c36=_0x37577c;this['_antiDamageBarrierCancelUnder']===_0x4b1884&&this['initAntiDamageBarriers'](),this[_0x3c4c36('0x90')][_0x31677f]=_0x4df2a8;}}else{if(!_0x591aab)continue;if(_0x1c9f9f<_0x1f82d7[_0x37577c('0x60')](_0x591aab['id']))continue;if(this['matchesAntiDamageBarrier'](_0x591aab,'CancelOver')){if(_0x37577c('0xd2')===_0x37577c('0xd2'))return _0x1f82d7[_0x37577c('0x6f')](_0x591aab),!![];else{function _0x5de42e(){const _0x3f6d79=_0x37577c;_0x580449[_0x3f6d79('0x2f')][_0x3f6d79('0x41')][_0x3f6d79('0x79')](this),this[_0x3f6d79('0x55')]();}}}}}return![];},Game_Action[_0x2c2200('0xc3')][_0x2c2200('0x51')]=function(_0x53fb9c,_0x281c7c){const _0x3910c7=_0x2c2200,_0x9ccfd3=_0x53fb9c['states']();for(const _0x335714 of _0x9ccfd3){if(!_0x335714)continue;if(_0x281c7c>_0x53fb9c[_0x3910c7('0x7')](_0x335714['id']))continue;if(this[_0x3910c7('0x96')](_0x335714,_0x3910c7('0x3c'))){if(_0x3910c7('0xb1')==='IryYb'){function _0x42a374(){const _0x433833=_0x3910c7,_0x21ff49=_0x4b9b17['id'];let _0x257628=(_0x31b318(this['getStateDisplay'](_0x21ff49))||0x0)-0x1;this[_0x433833('0x1')](_0x21ff49,_0x257628),_0x257628<=0x0&&this[_0x433833('0x8e')](_0x21ff49),this[_0x433833('0x76')](_0x433833('0x39'),_0x257628>0x0);}}else return _0x53fb9c['onAntiDamageCancelBarrier'](_0x335714),!![];}}return![];},Game_Action[_0x2c2200('0xc3')][_0x2c2200('0xb6')]=function(_0x33cd4e,_0x52e024){const _0x5e96bc=_0x2c2200;if(_0x52e024<=0x0)return _0x52e024;const _0x148d88=_0x33cd4e[_0x5e96bc('0x7c')]();let _0x87485b=0x0;for(const _0x800772 of _0x148d88){if(!_0x800772)continue;this[_0x5e96bc('0x96')](_0x800772,'ReduceBarrier')&&(_0x87485b+=_0x33cd4e[_0x5e96bc('0x5b')](_0x800772['id']));}if(_0x87485b>0x0){if(_0x5e96bc('0x59')==='wHWHa')_0x52e024*=(0x1-_0x87485b)[_0x5e96bc('0x89')](0x0,0x1),_0x33cd4e[_0x5e96bc('0xa3')]();else{function _0x38d2c8(){this['initAntiDamageBarriers']();}}}return _0x52e024;},Game_Action[_0x2c2200('0xc3')][_0x2c2200('0x53')]=function(_0xd3a16f,_0x283c3e){const _0x114e33=_0x2c2200;if(_0x283c3e<=0x0)return _0x283c3e;const _0x106eb8=_0xd3a16f['getAntiDamageBarrierStates']();for(const _0x3c2e51 of _0x106eb8){if(!_0x3c2e51)continue;if(this[_0x114e33('0x96')](_0x3c2e51,'AbsorbBarrier')){if(_0x114e33('0x1d')!==_0x114e33('0xd7')){let _0x3d859a=Number(_0xd3a16f[_0x114e33('0xb2')](_0x3c2e51['id']))||0x0;const _0xa3afe1=Math[_0x114e33('0x9d')](_0x283c3e,_0x3d859a);_0x283c3e-=_0xa3afe1,_0x3d859a-=_0xa3afe1,_0xd3a16f[_0x114e33('0x1')](_0x3c2e51['id'],_0x3d859a);if(_0xa3afe1>0x0){if(_0x114e33('0x54')!==_0x114e33('0x8d'))_0xd3a16f[_0x114e33('0x81')](_0xa3afe1),_0xd3a16f[_0x114e33('0xac')](_0x3c2e51);else{function _0x13d6c5(){const _0x4b6b9c=_0x114e33,_0x2b7e81=_0x1ff945[_0x4b6b9c('0x7d')]('['+_0x139589['$1']['match'](/\d+/g)+']');return _0x51853a['some'](_0x4f9d47=>_0x2b7e81['includes'](_0x4f9d47));}}}if(_0x283c3e<=0x0)break;}else{function _0x3ccceb(){const _0x5a3386=_0x114e33;for(const _0x479266 of _0x20f618){_0x479266[_0x5a3386('0x2b')](_0x4e63f1);const _0x5a87f8=_0x19c5a9(_0x13c083['$1']);if(this['matchesAntiDamageBarrierType'](_0x5a87f8))return!![];}}}}}return _0x283c3e;},Game_Action[_0x2c2200('0xc3')][_0x2c2200('0x9a')]=function(_0x88eb39,_0x407b71){const _0x24df66=_0x2c2200;if(_0x407b71<=0x0)return _0x407b71;const _0x49b77b=_0x88eb39[_0x24df66('0x7c')]();let _0xab425f=_0x88eb39['mp'];for(const _0x5edbb0 of _0x49b77b){if(_0x24df66('0xc0')!==_0x24df66('0xc0')){function _0x1ae878(){const _0x30ed81=_0x24df66;this[_0x30ed81('0x3a')]();}}else{if(!_0x5edbb0)continue;if(this['matchesAntiDamageBarrier'](_0x5edbb0,_0x24df66('0x1f'))){const _0x5d2fea=_0x88eb39['getAntiDamageBarrierMp'](_0x5edbb0['id']),_0x57e17b=Math['min'](Math[_0x24df66('0x72')](_0x407b71*_0x5d2fea),_0x88eb39['mp']);_0x407b71-=_0x57e17b,_0x88eb39[_0x24df66('0xca')](-_0x57e17b);if(_0x57e17b>0x0){if(_0x24df66('0xc1')!=='oLlXw')_0x88eb39[_0x24df66('0x0')](_0x5edbb0);else{function _0x41fc7a(){const _0x59ea05=_0x24df66,_0x265719=_0x4fc2d3['AntiDmgBarriers'][_0x59ea05('0x75')](_0xe46c66['$2']);this['setAntiDamageBarrierMp'](_0x23accc,_0x265719||0x0);}}}if(_0x407b71<=0x0)break;}}}return _0x407b71;},Game_Action['prototype'][_0x2c2200('0x6c')]=function(_0x5e40d1,_0x23039a){const _0x1bfc4e=_0x2c2200;if(_0x23039a<=0x0)return _0x23039a;const _0x475d84=_0x5e40d1[_0x1bfc4e('0x7c')]();let _0x41c8bc=_0x5e40d1['mp'];for(const _0xa27919 of _0x475d84){if(!_0xa27919)continue;if(this[_0x1bfc4e('0x96')](_0xa27919,_0x1bfc4e('0x17'))){const _0x3a926f=_0x5e40d1[_0x1bfc4e('0x88')](_0xa27919['id']),_0x43f449=Math[_0x1bfc4e('0x9d')](Math[_0x1bfc4e('0x72')](_0x23039a*_0x3a926f),_0x5e40d1['tp']);_0x23039a-=_0x43f449,_0x5e40d1[_0x1bfc4e('0x47')](-_0x43f449);_0x43f449>0x0&&(_0x5e40d1[_0x1bfc4e('0xb7')](_0x43f449),_0x5e40d1[_0x1bfc4e('0xc7')](_0xa27919));if(_0x23039a<=0x0)break;}}return _0x23039a;},Game_Action['prototype'][_0x2c2200('0x96')]=function(_0x382407,_0xab6969){const _0x5e785b=_0x2c2200,_0x49d7dc=VisuMZ[_0x5e785b('0x2f')][_0x5e785b('0x61')][_0xab6969];if(!_0x49d7dc)return![];const _0x14e627=_0x382407['note'][_0x5e785b('0x2b')](_0x49d7dc);if(_0x14e627){if(_0x5e785b('0x22')!==_0x5e785b('0x45'))for(const _0x1f1207 of _0x14e627){_0x1f1207[_0x5e785b('0x2b')](_0x49d7dc);const _0x4eea0f=String(RegExp['$1']);if(this[_0x5e785b('0x69')](_0x4eea0f)){if(_0x5e785b('0x5')===_0x5e785b('0x5'))return!![];else{function _0x1556ac(){const _0x5c86e7=_0x5e785b;if(!_0x5735e3[_0x5c86e7('0x92')]())return![];const _0x3f2648=_0x4502ac[_0x5c86e7('0x2f')][_0x5c86e7('0x24')][_0x5c86e7('0xa6')];if(!_0x3f2648)return;if(_0x3f2648[_0x5c86e7('0x1e')]==='')return;const _0x5bcf3d=_0x3f2648[_0x5c86e7('0x1e')][_0x5c86e7('0xbc')](_0x5aab57),_0x4bfd0b={'textColor':_0x3f2648[_0x5c86e7('0x98')],'flashColor':_0x3f2648['FlashColor'],'flashDuration':_0x3f2648[_0x5c86e7('0x3e')]};this['setupTextPopup'](_0x5bcf3d,_0x4bfd0b);}}}}else{function _0x31cbe1(){const _0x2c755b=_0x5e785b;this[_0x2c755b('0xaa')]={},this[_0x2c755b('0x90')]={},this[_0x2c755b('0x6b')]={},this[_0x2c755b('0x23')]={},this[_0x2c755b('0x4')]={};}}}return![];},Game_Action['prototype']['matchesAntiDamageBarrierType']=function(_0x384889){const _0x53024e=_0x2c2200;_0x384889=_0x384889['toUpperCase']()[_0x53024e('0x32')]();if([_0x53024e('0xc5'),_0x53024e('0x44'),_0x53024e('0x4e')][_0x53024e('0x21')](_0x384889))return!![];else{if(_0x384889['match'](/ELEMENT/i))return this[_0x53024e('0x6e')](_0x384889);else{if(_0x384889[_0x53024e('0x2b')](/CERTAIN/i))return this['isCertainHit']();else{if(_0x384889[_0x53024e('0x2b')](/PHYSICAL/i))return this[_0x53024e('0x33')]();else{if(_0x384889[_0x53024e('0x2b')](/MAGICAL/i))return this['isMagical']();}}}}},Game_Action['prototype']['matchesAntiDamageBarrierElementType']=function(_0x4489c6){const _0x547340=_0x2c2200,_0x3a5ec3=this[_0x547340('0x50')]();if(_0x4489c6[_0x547340('0x2b')](/ELEMENT[ ]*(\d+(?:\s*,\s*\d+)*)/i)){const _0x17f032=JSON[_0x547340('0x7d')]('['+RegExp['$1'][_0x547340('0x2b')](/\d+/g)+']');return _0x3a5ec3['some'](_0x1365e9=>_0x17f032[_0x547340('0x21')](_0x1365e9));}else{if(_0x4489c6[_0x547340('0x2b')](/ELEMENT[ ](.*)/i)){if(_0x547340('0xb8')===_0x547340('0x62')){function _0x3509a1(){const _0x190e93=_0x547340;if(!_0x1716fc[_0x190e93('0x92')]())return![];const _0x57c96a=_0x4cefd8[_0x190e93('0x2f')][_0x190e93('0x24')]['TP'];if(!_0x57c96a)return;if(_0x57c96a['PopupText']==='')return;const _0x57b164=_0x57c96a[_0x190e93('0x1e')]['format'](_0x276103,_0x586550['tp']),_0x4d3af3={'textColor':_0x57c96a[_0x190e93('0x98')],'flashColor':_0x57c96a[_0x190e93('0x85')],'flashDuration':_0x57c96a[_0x190e93('0x3e')]};this[_0x190e93('0xd')](_0x57b164,_0x4d3af3);}}else{const _0x52b0e0=String(RegExp['$1'])[_0x547340('0x74')](','),_0x41899d=_0x52b0e0[_0x547340('0x58')](_0x4ec1d9=>DataManager[_0x547340('0xcc')](_0x4ec1d9));return _0x3a5ec3[_0x547340('0x94')](_0xff9e28=>_0x41899d[_0x547340('0x21')](_0xff9e28));}}}return![];},VisuMZ['AntiDmgBarriers'][_0x2c2200('0x5e')]=Game_BattlerBase['prototype'][_0x2c2200('0xa7')],Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0xa7')]=function(){const _0x49771a=_0x2c2200;VisuMZ[_0x49771a('0x2f')][_0x49771a('0x5e')]['call'](this),this[_0x49771a('0x3a')]();},Game_BattlerBase['prototype'][_0x2c2200('0x3a')]=function(){const _0x172712=_0x2c2200;this[_0x172712('0xaa')]={},this[_0x172712('0x90')]={},this[_0x172712('0x6b')]={},this[_0x172712('0x23')]={},this[_0x172712('0x4')]={};},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0x60')]=function(_0x160865){const _0x5e5941=_0x2c2200;if(!this[_0x5e5941('0x4c')](_0x160865))return 0x0;if(this[_0x5e5941('0xaa')]===undefined){if(_0x5e5941('0xc')!==_0x5e5941('0xc')){function _0x433923(){const _0x287a5e=_0x5e5941;this[_0x287a5e('0x76')](_0x287a5e('0xe'),![]);}}else this[_0x5e5941('0x3a')]();}return this[_0x5e5941('0xaa')][_0x160865]||0x0;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0x1b')]=function(_0x30769e,_0x106d07){const _0x228b88=_0x2c2200;this['_antiDamageBarrierCancelOver']===undefined&&this[_0x228b88('0x3a')](),this[_0x228b88('0xaa')][_0x30769e]=_0x106d07;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0x7')]=function(_0x10a8aa){const _0x1c848c=_0x2c2200;if(!this['isStateAffected'](_0x10a8aa))return 0x0;return this['_antiDamageBarrierCancelUnder']===undefined&&this[_0x1c848c('0x3a')](),this[_0x1c848c('0x90')][_0x10a8aa]||0x0;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0xbe')]=function(_0x4c04d9,_0x48cf78){const _0xecfdd6=_0x2c2200;this[_0xecfdd6('0x90')]===undefined&&this[_0xecfdd6('0x3a')](),this['_antiDamageBarrierCancelUnder'][_0x4c04d9]=_0x48cf78;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0x5b')]=function(_0x218849){const _0x2c999f=_0x2c2200;if(!this[_0x2c999f('0x4c')](_0x218849))return 0x0;return this[_0x2c999f('0x6b')]===undefined&&this[_0x2c999f('0x3a')](),this[_0x2c999f('0x6b')][_0x218849]||0x0;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0x3b')]=function(_0x587796,_0x4ff739){const _0x5a6327=_0x2c2200;this[_0x5a6327('0x6b')]===undefined&&this[_0x5a6327('0x3a')](),this[_0x5a6327('0x6b')][_0x587796]=_0x4ff739;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0x29')]=function(_0x2d8571){const _0x3534bd=_0x2c2200;if(!this[_0x3534bd('0x4c')](_0x2d8571))return 0x0;if(this[_0x3534bd('0x23')]===undefined){if(_0x3534bd('0xd1')===_0x3534bd('0x7f')){function _0x3dcfab(){const _0x3a91da=_0x3534bd;_0x46a6d5['match'](_0xf0f41);const _0x1d0ddb=_0x9cf1b5(_0x1bef43['$1']);if(this[_0x3a91da('0x69')](_0x1d0ddb))return!![];}}else this[_0x3534bd('0x3a')]();}return this[_0x3534bd('0x23')][_0x2d8571]||0x0;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0xb0')]=function(_0x461607,_0x213090){const _0x2b32eb=_0x2c2200;if(this[_0x2b32eb('0x23')]===undefined){if(_0x2b32eb('0x20')===_0x2b32eb('0x5f')){function _0x4855b8(){const _0xb9cc28=_0x2b32eb;_0x257ce0[_0xb9cc28('0x2f')][_0xb9cc28('0x8a')][_0xb9cc28('0x79')](this),this[_0xb9cc28('0x5a')]()&&this[_0xb9cc28('0x67')]();}}else this[_0x2b32eb('0x3a')]();}this[_0x2b32eb('0x23')][_0x461607]=_0x213090;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0x88')]=function(_0x3b03ae){const _0x3b5b2f=_0x2c2200;if(!this[_0x3b5b2f('0x4c')](_0x3b03ae))return 0x0;if(this[_0x3b5b2f('0x4')]===undefined){if(_0x3b5b2f('0xad')===_0x3b5b2f('0xad'))this[_0x3b5b2f('0x3a')]();else{function _0x5c1492(){const _0xf76bda=_0x3b5b2f;if(_0x2a560d[_0xf76bda('0x9f')]())_0x412832['log'](_0xf74532);return 0x0;}}}return this['_antiDamageBarrierTp'][_0x3b03ae]||0x0;},Game_BattlerBase['prototype'][_0x2c2200('0x4a')]=function(_0x58839d,_0x7788ab){const _0x598305=_0x2c2200;this[_0x598305('0x4')]===undefined&&this[_0x598305('0x3a')](),this[_0x598305('0x4')][_0x58839d]=_0x7788ab;},Game_BattlerBase[_0x2c2200('0xc3')][_0x2c2200('0xa1')]=function(){const _0x41edbf=_0x2c2200,_0x4bc4d1=this['traitObjects']()['concat'](this[_0x41edbf('0x18')]()),_0x3b869e=VisuMZ[_0x41edbf('0x2f')][_0x41edbf('0x61')][_0x41edbf('0xc2')];return _0x4bc4d1[_0x41edbf('0x94')](_0x16b59e=>_0x16b59e&&_0x16b59e['note']&&_0x16b59e[_0x41edbf('0x95')][_0x41edbf('0x2b')](_0x3b869e));},Game_BattlerBase['prototype'][_0x2c2200('0x4d')]=function(){const _0x28a60b=_0x2c2200,_0x28303c=Number[_0x28a60b('0x11')],_0x431149=this['states']()[_0x28a60b('0x70')]((_0x5399a6,_0x8f9bb2)=>{const _0x85b98d=_0x28a60b,_0x2b4a46=_0x5399a6[_0x85b98d('0xc6')]===0x0?_0x28303c:this[_0x85b98d('0x7e')](_0x5399a6['id']),_0x1121cc=_0x8f9bb2[_0x85b98d('0xc6')]===0x0?_0x28303c:this['stateTurns'](_0x8f9bb2['id']);if(_0x2b4a46!==_0x1121cc)return _0x2b4a46-_0x1121cc;const _0x482620=_0x5399a6[_0x85b98d('0x43')],_0x18c882=_0x8f9bb2[_0x85b98d('0x43')];if(_0x482620!==_0x18c882){if('isIXi'===_0x85b98d('0x86')){function _0x478a17(){const _0x545070=_0x85b98d,_0xe3bc4b=_0x562f9e[_0x545070('0x2f')][_0x545070('0x75')](_0x49a014['$2']);this[_0x545070('0x1')](_0x280333,_0xe3bc4b||0x1);}}else return _0x18c882-_0x482620;}return _0x5399a6['id']-_0x8f9bb2['id'];});return _0x431149;},VisuMZ[_0x2c2200('0x2f')][_0x2c2200('0x7a')]=function(_0xdfe0d6){const _0x286d3c=_0x2c2200;window[_0x286d3c('0xd5')]=BattleManager[_0x286d3c('0x8f')]||_0xdfe0d6,window[_0x286d3c('0x38')]=_0xdfe0d6,window['a']=window[_0x286d3c('0xd5')],window['b']=window[_0x286d3c('0x38')];},VisuMZ[_0x2c2200('0x2f')][_0x2c2200('0x35')]=function(){const _0x5a82ae=_0x2c2200;window['user']=undefined,window[_0x5a82ae('0x38')]=undefined,window['a']=undefined,window['b']=undefined;},VisuMZ['AntiDmgBarriers'][_0x2c2200('0x75')]=function(_0x4911d7){const _0x591934=_0x2c2200;_0x4911d7=_0x4911d7[_0x591934('0x65')](/\b(\d+)([%％])/gi,(_0x45e22a,_0x5cd0d4)=>(Number(_0x5cd0d4)||0x0)*0.01);try{if(_0x591934('0x3f')!==_0x591934('0xd6'))return eval(_0x4911d7);else{function _0x46196e(){const _0x14f704=_0x591934;if(!this['isStateAffected'](_0x296c29))return 0x0;return this['_antiDamageBarrierCancelOver']===_0x15fb6a&&this['initAntiDamageBarriers'](),this[_0x14f704('0xaa')][_0x2286ca]||0x0;}}}catch(_0x3407a9){if($gameTemp[_0x591934('0x9f')]())console['log'](_0x3407a9);return 0x0;}},VisuMZ[_0x2c2200('0x2f')][_0x2c2200('0xa5')]=Game_Battler['prototype'][_0x2c2200('0xb9')],Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0xb9')]=function(_0xecf4f9){const _0x1aa2d7=_0x2c2200;VisuMZ[_0x1aa2d7('0x2f')][_0x1aa2d7('0xa5')]['call'](this,_0xecf4f9),this['initAntiDamageBarrierDataForState'](_0xecf4f9);},Game_Battler[_0x2c2200('0xc3')]['initAntiDamageBarrierDataForState']=function(_0x568ee3){const _0x2ba979=_0x2c2200;if(!this[_0x2ba979('0x4c')](_0x568ee3))return;const _0x4b7574=$dataStates[_0x568ee3];if(!_0x4b7574)return;const _0x31c006=VisuMZ['AntiDmgBarriers']['RegExp'],_0x59da77=_0x4b7574['note'];VisuMZ[_0x2ba979('0x2f')]['createJsTargets'](this);if(_0x59da77[_0x2ba979('0x2b')](_0x31c006[_0x2ba979('0x77')])){const _0xfe68c7=VisuMZ['AntiDmgBarriers']['CalculateCharges'](RegExp['$2']);this[_0x2ba979('0x1')](_0x568ee3,_0xfe68c7||0x1);}if(_0x59da77[_0x2ba979('0x2b')](_0x31c006[_0x2ba979('0xbd')])){const _0x123733=VisuMZ['AntiDmgBarriers'][_0x2ba979('0x75')](RegExp['$2']);this[_0x2ba979('0x1b')](_0x568ee3,_0x123733||0x0);}if(_0x59da77[_0x2ba979('0x2b')](_0x31c006['CancelUnder'])){const _0x5e80e5=VisuMZ[_0x2ba979('0x2f')][_0x2ba979('0x75')](RegExp['$2']);this[_0x2ba979('0xbe')](_0x568ee3,_0x5e80e5||0x0);}if(_0x59da77['match'](_0x31c006[_0x2ba979('0x42')])){if(_0x2ba979('0x30')===_0x2ba979('0x30')){const _0xb325ad=VisuMZ[_0x2ba979('0x2f')][_0x2ba979('0x75')](RegExp['$2']);this['setAntiDamageBarrierReduction'](_0x568ee3,_0xb325ad||0x0);}else{function _0x4fff83(){const _0x39d809=_0x2ba979;if(!_0x6cc0e8[_0x39d809('0x92')]())return;const _0x4c95c3=_0x556d06[_0x39d809('0x2f')][_0x39d809('0x24')][_0x1048c3];if(!_0x4c95c3)return;const _0x32b831=_0x5308ac?'Intact':'Break';if(_0x4c95c3[_0x39d809('0x83')[_0x39d809('0xbc')](_0x32b831)]>0x0){const _0x5ccddc=[this],_0x226a64=_0x4c95c3[_0x39d809('0x83')['format'](_0x32b831)],_0xd7fa7f=_0x4c95c3[_0x39d809('0x49')[_0x39d809('0xbc')](_0x32b831)],_0x425523=_0x4c95c3[_0x39d809('0x9e')['format'](_0x32b831)];_0x51a907[_0x39d809('0x99')](_0x5ccddc,_0x226a64,_0xd7fa7f,_0x425523);}}}}if(_0x59da77[_0x2ba979('0x2b')](_0x31c006['AbsorbBarrier'])){const _0x1bef4c=VisuMZ[_0x2ba979('0x2f')]['CalculateCharges'](RegExp['$2']);this['setStateDisplay'](_0x568ee3,_0x1bef4c||0x0);}if(_0x59da77[_0x2ba979('0x2b')](_0x31c006[_0x2ba979('0x1f')])){const _0x257eb2=VisuMZ[_0x2ba979('0x2f')]['CalculateCharges'](RegExp['$2']);this[_0x2ba979('0xb0')](_0x568ee3,_0x257eb2||0x0);}if(_0x59da77[_0x2ba979('0x2b')](_0x31c006[_0x2ba979('0x17')])){if(_0x2ba979('0xa8')!=='BrUdR'){const _0x42fe23=VisuMZ[_0x2ba979('0x2f')][_0x2ba979('0x75')](RegExp['$2']);this[_0x2ba979('0x4a')](_0x568ee3,_0x42fe23||0x0);}else{function _0x398473(){const _0x210a21=_0x2ba979;let _0x5ce791='';if(_0x4ced4b[_0x210a21('0x21')](_0x1eb66f))_0x5ce791='Actor-%1-%2'[_0x210a21('0xbc')](_0x167b78['id'],_0x5f72f5);if(_0x250772['includes'](_0x4b9806))_0x5ce791=_0x210a21('0x31')[_0x210a21('0xbc')](_0x58cc56['id'],_0x118b21);if(_0x4c5637[_0x210a21('0x21')](_0x5bb3c5))_0x5ce791=_0x210a21('0x71')[_0x210a21('0xbc')](_0x5b7879['id'],_0x119db4);if(_0x4e1bef[_0x210a21('0x21')](_0x2eec46))_0x5ce791=_0x210a21('0xaf')['format'](_0x342506['id'],_0x2215a5);if(_0x94d624['includes'](_0x1a3704))_0x5ce791='Weapon-%1-%2'[_0x210a21('0xbc')](_0x19f4ff['id'],_0x19bf17);if(_0x59f8ec[_0x210a21('0x21')](_0x4a4fce))_0x5ce791=_0x210a21('0x68')['format'](_0x558b22['id'],_0x2cc6c4);if(_0x4fd48c[_0x210a21('0x21')](_0x511b1b))_0x5ce791=_0x210a21('0x48')[_0x210a21('0xbc')](_0x1ecb12['id'],_0x12fe56);if(_0x2f6ffe[_0x210a21('0x21')](_0x25c4d3))_0x5ce791=_0x210a21('0xa')['format'](_0x1941f3['id'],_0x4fa178);return _0x5ce791;}}}VisuMZ[_0x2ba979('0x2f')][_0x2ba979('0x35')]();},Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0x76')]=function(_0x314308,_0x43435d){const _0x5e74e5=_0x2c2200;if(!SceneManager[_0x5e74e5('0x92')]())return;const _0x3b4aac=VisuMZ[_0x5e74e5('0x2f')][_0x5e74e5('0x24')][_0x314308];if(!_0x3b4aac)return;const _0x489165=_0x43435d?_0x5e74e5('0xa2'):_0x5e74e5('0xbf');if(_0x3b4aac[_0x5e74e5('0x83')[_0x5e74e5('0xbc')](_0x489165)]>0x0){const _0x4c1958=[this],_0x2d5bc5=_0x3b4aac['%1AnimationID'[_0x5e74e5('0xbc')](_0x489165)],_0x2bbeb2=_0x3b4aac[_0x5e74e5('0x49')[_0x5e74e5('0xbc')](_0x489165)],_0x371d86=_0x3b4aac['%1Mute'['format'](_0x489165)];$gameTemp['requestFauxAnimation'](_0x4c1958,_0x2d5bc5,_0x2bbeb2,_0x371d86);}},Game_Battler[_0x2c2200('0xc3')]['processBreakStateEffect']=function(_0x3c217a){const _0x59f3af=_0x2c2200;if(!_0x3c217a)return;const _0x53051c=_0x3c217a['id'],_0x436e71=VisuMZ[_0x59f3af('0x2f')][_0x59f3af('0x61')],_0x3056f2=_0x3c217a[_0x59f3af('0x95')];this[_0x59f3af('0x8e')](_0x53051c);if(_0x3056f2[_0x59f3af('0x2b')](_0x436e71[_0x59f3af('0x77')]))this[_0x59f3af('0x76')](_0x59f3af('0x39'),![]);else{if(_0x3056f2[_0x59f3af('0x2b')](_0x436e71[_0x59f3af('0xbd')]))this[_0x59f3af('0x76')](_0x59f3af('0xe'),![]);else{if(_0x3056f2[_0x59f3af('0x2b')](_0x436e71[_0x59f3af('0x3c')]))this[_0x59f3af('0x76')](_0x59f3af('0xe'),![]);else{if(_0x3056f2[_0x59f3af('0x2b')](_0x436e71[_0x59f3af('0x42')]))this[_0x59f3af('0x76')]('Reduce',![]);else{if(_0x3056f2[_0x59f3af('0x2b')](_0x436e71[_0x59f3af('0xcb')]))this[_0x59f3af('0x76')](_0x59f3af('0xa6'),![]);else{if(_0x3056f2[_0x59f3af('0x2b')](_0x436e71[_0x59f3af('0x1f')]))this[_0x59f3af('0x76')]('MP',![]);else _0x3056f2[_0x59f3af('0x2b')](_0x436e71[_0x59f3af('0x17')])&&this[_0x59f3af('0x76')]('TP',![]);}}}}}},Game_Battler['prototype'][_0x2c2200('0x13')]=function(_0xc8fcd3){const _0x2be0fb=_0x2c2200,_0x83a3e8=_0xc8fcd3['id'];let _0xff8bc4=(Number(this['getStateDisplay'](_0x83a3e8))||0x0)-0x1;this[_0x2be0fb('0x1')](_0x83a3e8,_0xff8bc4),_0xff8bc4<=0x0&&this['removeState'](_0x83a3e8),this[_0x2be0fb('0x76')](_0x2be0fb('0x39'),_0xff8bc4>0x0);},Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0x6f')]=function(_0x353179){const _0x3c7216=_0x2c2200;this[_0x3c7216('0x76')]('Cancel',!![]);},Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0xa3')]=function(){const _0x3b1c2e=_0x2c2200;this[_0x3b1c2e('0x76')](_0x3b1c2e('0x16'),!![]);},Game_Battler[_0x2c2200('0xc3')]['displayAbsorptionBarrierPopup']=function(_0x5a01e4){const _0x2f9cc6=_0x2c2200;if(!SceneManager[_0x2f9cc6('0x92')]())return![];const _0x12c2e8=VisuMZ[_0x2f9cc6('0x2f')][_0x2f9cc6('0x24')][_0x2f9cc6('0xa6')];if(!_0x12c2e8)return;if(_0x12c2e8[_0x2f9cc6('0x1e')]==='')return;const _0x31363a=_0x12c2e8[_0x2f9cc6('0x1e')][_0x2f9cc6('0xbc')](_0x5a01e4),_0x363f91={'textColor':_0x12c2e8[_0x2f9cc6('0x98')],'flashColor':_0x12c2e8[_0x2f9cc6('0x85')],'flashDuration':_0x12c2e8[_0x2f9cc6('0x3e')]};this['setupTextPopup'](_0x31363a,_0x363f91);},Game_Battler[_0x2c2200('0xc3')]['onAntiDamageAbsorptionBarrier']=function(_0x1839b5){const _0x2e72bb=_0x2c2200,_0x305310=_0x1839b5['id'];let _0xe7bdd8=Number(this[_0x2e72bb('0xb2')](_0x305310))||0x0;_0xe7bdd8<=0x0&&this['removeState'](_0x305310),this[_0x2e72bb('0x76')](_0x2e72bb('0xa6'),_0xe7bdd8>0x0);},Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0x0')]=function(_0x18cafe){const _0x448795=_0x2c2200,_0xaf15ca=_0x18cafe['id'];this['mp']<=0x0&&this[_0x448795('0x8e')](_0xaf15ca),this[_0x448795('0x76')]('MP',this['mp']>0x0);},Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0xb7')]=function(_0x4da5a8){const _0x56db5e=_0x2c2200;if(!SceneManager[_0x56db5e('0x92')]())return![];const _0x3dd60b=VisuMZ['AntiDmgBarriers'][_0x56db5e('0x24')]['TP'];if(!_0x3dd60b)return;if(_0x3dd60b[_0x56db5e('0x1e')]==='')return;const _0x4cd675=_0x3dd60b[_0x56db5e('0x1e')][_0x56db5e('0xbc')](_0x4da5a8,TextManager['tp']),_0x42757c={'textColor':_0x3dd60b[_0x56db5e('0x98')],'flashColor':_0x3dd60b['FlashColor'],'flashDuration':_0x3dd60b[_0x56db5e('0x3e')]};this['setupTextPopup'](_0x4cd675,_0x42757c);},Game_Battler['prototype'][_0x2c2200('0xc7')]=function(_0x464871){const _0x5833cf=_0x2c2200,_0x2ba2b9=_0x464871['id'];this['tp']<=0x0&&this[_0x5833cf('0x8e')](_0x2ba2b9),this['onAntiDamageBarrierEffect']('TP',this['tp']>0x0);},Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0x15')]=function(_0x356dcf){const _0x1cd510=_0x2c2200;if(!_0x356dcf)return;if(!_0x356dcf[_0x1cd510('0x63')]())return;let _0x4ce7ab=[];for(const _0x5ef4b4 of this[_0x1cd510('0x7c')]()){if(!_0x5ef4b4)continue;if(!this[_0x1cd510('0x4c')](_0x5ef4b4['id']))continue;VisuMZ['AntiDmgBarriers']['StateMatchesBreakEffect'](_0x5ef4b4,_0x356dcf)&&_0x4ce7ab['push'](_0x5ef4b4['id']);}for(const _0x21ffba of _0x4ce7ab){if(_0x1cd510('0x97')===_0x1cd510('0x97')){const _0x168e9c=$dataStates[_0x21ffba];if(!_0x168e9c)continue;this[_0x1cd510('0x57')](_0x168e9c);}else{function _0x148351(){const _0x4eab41=_0x1cd510,_0x262376=_0x30b791['autoRemovalTiming']===0x0?_0x574a80:this[_0x4eab41('0x7e')](_0x44d9f3['id']),_0x3eacaf=_0xc1d8fd[_0x4eab41('0xc6')]===0x0?_0x3f403e:this['stateTurns'](_0x559bdb['id']);if(_0x262376!==_0x3eacaf)return _0x262376-_0x3eacaf;const _0x211207=_0xa345cb[_0x4eab41('0x43')],_0x4f24fb=_0x4e001a['priority'];if(_0x211207!==_0x4f24fb)return _0x4f24fb-_0x211207;return _0x3acdf3['id']-_0x44e12f['id'];}}}},VisuMZ[_0x2c2200('0x2f')][_0x2c2200('0x4f')]=function(_0x4e6433,_0x50e485){const _0x1fbd30=_0x2c2200,_0x230475=VisuMZ['AntiDmgBarriers'][_0x1fbd30('0x61')]['BreakState'],_0x58d2f3=_0x4e6433[_0x1fbd30('0x95')][_0x1fbd30('0x2b')](_0x230475);if(_0x58d2f3){if(_0x1fbd30('0x19')!=='fuDoC'){function _0x15a5c2(){const _0x469e16=_0x1fbd30;this['process_VisuMZ_AntiDmgBarriers_Notetags'](),this[_0x469e16('0x34')]();}}else for(const _0x9cf8b0 of _0x58d2f3){if(_0x1fbd30('0x80')!==_0x1fbd30('0xb4')){if(!_0x9cf8b0)continue;_0x9cf8b0[_0x1fbd30('0x2b')](_0x230475);const _0xc391ad=String(RegExp['$1']);if(_0x50e485[_0x1fbd30('0x69')](_0xc391ad)){if(_0x1fbd30('0x6a')!==_0x1fbd30('0x8c'))return!![];else{function _0x267695(){const _0x599f71=_0x1fbd30;if(this[_0x599f71('0x63')]()&&this[_0x599f71('0x63')]()[_0x599f71('0x95')][_0x599f71('0x2b')](_0x48297b[_0x599f71('0x2f')][_0x599f71('0x61')][_0x599f71('0xc2')]))return!![];if(this[_0x599f71('0x27')]())return!![];if(this[_0x599f71('0xba')](_0x80f039))return!![];return![];}}}}else{function _0x58f8e9(){const _0xe5078e=_0x1fbd30,_0x30f4b9=_0x538066[_0xe5078e('0x2f')][_0xe5078e('0x75')](_0x19f441['$2']);this[_0xe5078e('0xbe')](_0x3e1a02,_0x30f4b9||0x0);}}}}return![];},VisuMZ[_0x2c2200('0x2f')]['Game_Battler_regenerateAll']=Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0x9')],Game_Battler[_0x2c2200('0xc3')]['regenerateAll']=function(){const _0x1e3793=_0x2c2200;VisuMZ[_0x1e3793('0x2f')][_0x1e3793('0x8a')]['call'](this);if(this[_0x1e3793('0x5a')]()){if(_0x1e3793('0xa4')!=='LnNlZ')this['regenerateAntiDamageBarriers']();else{function _0x126d1(){const _0x35a3fc=_0x1e3793;_0x26a2a5[_0x35a3fc('0x2f')][_0x35a3fc('0x5e')][_0x35a3fc('0x79')](this),this[_0x35a3fc('0x3a')]();}}}},Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0x67')]=function(){const _0x469e03=_0x2c2200;VisuMZ[_0x469e03('0x2f')][_0x469e03('0x7a')](this);const _0x3979b8=VisuMZ[_0x469e03('0x2f')][_0x469e03('0x61')];for(const _0x3fe91b of this[_0x469e03('0x7c')]()){if(!_0x3fe91b)continue;const _0x3a4ce5=_0x3fe91b[_0x469e03('0x95')];(_0x3a4ce5['match'](_0x3979b8[_0x469e03('0x77')])||_0x3a4ce5[_0x469e03('0x2b')](_0x3979b8[_0x469e03('0xcb')]))&&this['regenerateAntiDamageBarrierState'](_0x3fe91b);}VisuMZ[_0x469e03('0x2f')]['clearJsTargets']();},Game_Battler[_0x2c2200('0xc3')][_0x2c2200('0x25')]=function(_0x40d451){const _0x4ddf13=_0x2c2200,_0x2ae86f=VisuMZ[_0x4ddf13('0x2f')][_0x4ddf13('0x61')],_0x5cfe3a=_0x40d451[_0x4ddf13('0x95')];let _0x28c2da=0x0;_0x5cfe3a[_0x4ddf13('0x2b')](_0x2ae86f[_0x4ddf13('0xcf')])&&(_0x28c2da-=VisuMZ[_0x4ddf13('0x2f')]['CalculateCharges'](RegExp['$1']));_0x5cfe3a[_0x4ddf13('0x2b')](_0x2ae86f[_0x4ddf13('0xa0')])&&(_0x28c2da+=VisuMZ[_0x4ddf13('0x2f')][_0x4ddf13('0x75')](RegExp['$1']));let _0x10fc9d=Number(this['getStateDisplay'](_0x40d451['id']));_0x10fc9d+=_0x28c2da;if(_0x10fc9d>0x0)this[_0x4ddf13('0x1')](_0x40d451['id'],_0x10fc9d);else{if(_0x4ddf13('0x78')!=='OljeZ')this['processBreakStateEffect'](_0x40d451);else{function _0x3adfbd(){const _0x11aa61=_0x4ddf13;_0x1b96e1+=_0x3dff27[_0x11aa61('0x5b')](_0x8fb67d['id']);}}}};
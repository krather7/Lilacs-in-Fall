//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
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
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Gauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Gauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * @default 2
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

const _0xbb33=['mKaFk','enemy','GaugeColor2','AdjustOptionsRect','%1Taunt','oqngh','isPlaytest','aggroGaugeX','tFDxW','createStateSprite','isProvokeAffected','_targetIndex','children','status','tgrMin','itemRect','ARRAYEVAL','bitmapWidth','Game_BattlerBase_sparam','sortEnemies','list','registerCommand','width','isTargetHighestTGR','_menuAggroType','FUNC','_homeY','currentMaxValueAggroControl','updateAggroControl','QxVxy','createProvokeSprite','addAggroControlSystemCommands','_colorCache','isCertainHit','isAggroGaugeShown','HITTYPE_PHYSICAL','_physicalTauntAnimation','_%1TauntAnimation','_tauntAnimationTimer','partsSize','mjvZx','Sprite_Gauge_gaugeX','getColorDataFromPluginParameters','LSBPu','abs','currentValue','ShowFacesListStyle','taunting','Sprite_Battler_initMembers','shift','prototype','battleUIOffsetY','gaugeX','scope','magical','boxWidth','format','heKtR','scale','MuteAnimations','OptionName','jbRSA','geScX','isBypassProvoke','vNlni','itemRectWithPadding','KAlSu','baRMb','Game_Action_applyItemUserEffect','AdLvA','members','convertStringToBattleTarget','aggro','_battler','WLxan','aggroGaugeY','vAJVj','updateSubPositions','currentMaxValue','makeData','ARRAYSTR','_scene','applySubjectAggro','_provokeBitmap','ShowLines','length','OZNDv','Sprite_Gauge_drawValue','battler','_tauntAnimationCycle','Sprite_Battler_update','_damageContainer','fHiSn','log','luxyD','Sprite_Gauge_update','highestTgrMember','faceWidth','physical','aggro-gauge-color-2','provoker','initAggroControl','randomTarget','random','lowestTgrMember','setAggro','anYPG','Window_Options_addGeneralOptions','updateChildrenOpacity','isMagical','opponentsUnit','Aggro','aggroMultiplier','executeHpDamageAggroControl','placeActorName','_animationCycleTime','Game_BattlerBase_refresh','lOlXN','pow','aggroGauge','Window_StatusBase_placeActorName','ARRAYFUNC','magicalTaunt','padding','create','DUqnS','AnchorX','gaugeColor1','Battle\x20Actor\x20%1','blendMode','isAggroAffected','parentContainer','certainHitTauntMembers','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','provoke-line-color','battleAggro','HITTYPE_MAGICAL','_aggro','Game_Action_applyGlobal','battleUIOffsetX','_spriteset','_battleField','_provokeSprite','_mirrorActorTauntAnimations','_mainSprite','UsoyQ','_homeX','#%1','map','checkCacheKey','max','EWzjB','leftwardAnimation','updateOpacityAggroControl','certainHit','PiiCr','makeProvokeTarget','Parts','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getNextTauntAnimation','updateTauntAnimations','_provokeContainer','_statusType','_enemies','actor%1-gauge-aggro','arcHeight','applyItemUserEffect','CycleTime','convertBattleTargetToString','gainAggro','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','return\x200','applyTauntFilters','clamp','kxOoD','ActorSetAggro','dFBpy','tgr','NUM','qhHEX','includes','matchTauntType','bypassProvoke','bypassTaunt','update','vdXnf','Sprite_Gauge_currentMaxValue','tauntTargetsForAlive','exit','_targetX','battleLayoutStyle','Sprite_Gauge_gaugeColor1','Spriteset_Battle_update','applyGlobal','sparam','bypassHighestAggro','boxHeight','provokeLineColor','updateAggroGaugeSprite','call','cUFkb','note','VisibleGauge','executeHpDamage','subject','height','actor','isBypassTaunt','ConfigManager_applyData','description','tgrMax','physicalTaunt','GaugeColor1','STRUCT','HeightOrigin','applyItemUserEffectAggroControl','clearAggro','aliveMembers','item','JaQRD','JSON','visible','VisuMZ_2_BattleSystemATB','_targetY','bitmapHeight','opacity','aUMqX','maxSprites','EnemyChangeAggro','clearProvokers','DHaPJ','isShowPriorityLines','time','_magicalTauntAnimation','parse','isTpb','aggroGaugeColor1','index','randomInt','addGeneralOptions','addCommand','friendsUnit','reduce','Battle\x20Enemy\x20%1','traitObjects','provokeHeightOrigin','states','Sprite_Gauge_currentValue','isAlive','_opacitySpeed','provokeBitmap','match','actorId','OffsetX','poAtB','HggpF','EnemyIndex','OffsetY','vAJwR','Game_Battler_onBattleStart','gaugeHeight','LQLUt','requestFauxAnimation','isBypassHighestAggro','ARRAYNUM','VisuMZ_1_BattleCore','EVAL','initTauntAnimations','isAggroGaugeVisible','refresh','addAggroControlSystemAggroCommand','isActor','gaugeRate','push','LineColor','createBattleFieldAggroControl','Window_BattleEnemy_refresh','EnemySetAggro','JqTQX','startNewTauntAnimation','AyXpD','some','Sprite_Gauge_gaugeRate','randomTauntTarget','AniMagical','inBattle','certainHitTaunt','ConfigManager_makeData','Scene_Options_maxCommands','VisuMZ_0_CoreEngine','name','physicalTauntMembers','addChild','awRRy','stateHasProvoke','Settings','AggroPerHeal','magicalTauntMembers','isAtbGaugeVisible','_aggroGaugeSprite','XaqkU','RNUGQ','GCtQt','vbRko','drawValue','isEnemy','bitmap','createInnerSprite','aqmJD','Game_Battler_addState','AddOption','Game_BattlerBase_initMembers','drawAggroGauge','Game_Action_executeHpDamage','toUpperCase','applyProvokeFilters','addState','OPHmV','_cache','lkVzs','BiErT','qfSFV','OpacitySpeed','yunyZ','nameY','ActorChangeAggro','VCida','round','initialize','Scale','CRrLc','hitType','filter','applyProvokeEffect','_certainHitTauntAnimation','createChildSprites','Opacity','provokeOrigin','Sprite_Gauge_gaugeColor2','updateBattlerPositions','baseAggro','aggroGaugeColor2','jiyAu','Taunt','StatusGauge','isAggroType','isSceneBattle','heightOrigin','_statusWindow','currentValueAggroControl','AnchorY','createAggroGauge','inputtingAction','textColor','isDead','anchor','IQYqe','isStateAffected','min','ArcHeight','isPhysical','AggroPerDmg','Sprite_Battler_setBattler','findTgrMember','setBattler','initMembers','_sprites','smoothTarget','updateOpacity','onBattleStart','pewBy','tPwXE','version','Sprite_Battler_initialize','optDisplayTp','ARRAYJSON','AggroControlSystem','alwaysTargetHighestAggro','Provoke','Spriteset_Battle_createBattleField','isTauntAffected','targetsForAlive','constructor','setup','indexOf','maxCommands','ConvertParams','eMSrO','Sprite_Actor_createStateSprite','_provoker','createProvokeHeightOrigin','addAggroControlSystemProvokeCommand','HITTYPE_CERTAIN'];(function(_0x2be848,_0xbb3329){const _0x3aa2d7=function(_0x4dd6df){while(--_0x4dd6df){_0x2be848['push'](_0x2be848['shift']());}};_0x3aa2d7(++_0xbb3329);}(_0xbb33,0xe4));const _0x3aa2=function(_0x2be848,_0xbb3329){_0x2be848=_0x2be848-0x0;let _0x3aa2d7=_0xbb33[_0x2be848];return _0x3aa2d7;};const _0x48d9d2=_0x3aa2;var label=_0x48d9d2('0x94'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x48d9d2('0x68')](function(_0x37bb48){const _0x590b7e=_0x48d9d2;return _0x37bb48[_0x590b7e('0xb2')]&&_0x37bb48[_0x590b7e('0x176')][_0x590b7e('0x159')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x48d9d2('0x43')]||{},VisuMZ[_0x48d9d2('0x9e')]=function(_0x435a40,_0x5897c5){const _0x25416a=_0x48d9d2;for(const _0x25fd27 in _0x5897c5){if(_0x25416a('0x1b')!==_0x25416a('0xad')){if(_0x25fd27[_0x25416a('0x17')](/(.*):(.*)/i)){const _0x5a1ebd=String(RegExp['$1']),_0x2d1b16=String(RegExp['$2'])[_0x25416a('0x56')]()['trim']();let _0x2a7e9c,_0x31244b,_0x4d1c32;switch(_0x2d1b16){case _0x25416a('0x157'):_0x2a7e9c=_0x5897c5[_0x25fd27]!==''?Number(_0x5897c5[_0x25fd27]):0x0;break;case _0x25416a('0x24'):_0x31244b=_0x5897c5[_0x25fd27]!==''?JSON[_0x25416a('0x6')](_0x5897c5[_0x25fd27]):[],_0x2a7e9c=_0x31244b[_0x25416a('0x139')](_0x93d059=>Number(_0x93d059));break;case _0x25416a('0x26'):_0x2a7e9c=_0x5897c5[_0x25fd27]!==''?eval(_0x5897c5[_0x25fd27]):null;break;case _0x25416a('0xb5'):_0x31244b=_0x5897c5[_0x25fd27]!==''?JSON['parse'](_0x5897c5[_0x25fd27]):[],_0x2a7e9c=_0x31244b[_0x25416a('0x139')](_0x2a9d5e=>eval(_0x2a9d5e));break;case _0x25416a('0x181'):_0x2a7e9c=_0x5897c5[_0x25fd27]!==''?JSON['parse'](_0x5897c5[_0x25fd27]):'';break;case _0x25416a('0x93'):_0x31244b=_0x5897c5[_0x25fd27]!==''?JSON['parse'](_0x5897c5[_0x25fd27]):[],_0x2a7e9c=_0x31244b[_0x25416a('0x139')](_0x7e3bb0=>JSON[_0x25416a('0x6')](_0x7e3bb0));break;case _0x25416a('0xbe'):_0x2a7e9c=_0x5897c5[_0x25fd27]!==''?new Function(JSON[_0x25416a('0x6')](_0x5897c5[_0x25fd27])):new Function(_0x25416a('0x150'));break;case _0x25416a('0x11e'):_0x31244b=_0x5897c5[_0x25fd27]!==''?JSON[_0x25416a('0x6')](_0x5897c5[_0x25fd27]):[],_0x2a7e9c=_0x31244b['map'](_0x5041b5=>new Function(JSON['parse'](_0x5041b5)));break;case'STR':_0x2a7e9c=_0x5897c5[_0x25fd27]!==''?String(_0x5897c5[_0x25fd27]):'';break;case _0x25416a('0xf5'):_0x31244b=_0x5897c5[_0x25fd27]!==''?JSON[_0x25416a('0x6')](_0x5897c5[_0x25fd27]):[],_0x2a7e9c=_0x31244b[_0x25416a('0x139')](_0x59c09a=>String(_0x59c09a));break;case _0x25416a('0x17a'):_0x4d1c32=_0x5897c5[_0x25fd27]!==''?JSON[_0x25416a('0x6')](_0x5897c5[_0x25fd27]):{},_0x2a7e9c=VisuMZ[_0x25416a('0x9e')]({},_0x4d1c32);break;case'ARRAYSTRUCT':_0x31244b=_0x5897c5[_0x25fd27]!==''?JSON[_0x25416a('0x6')](_0x5897c5[_0x25fd27]):[],_0x2a7e9c=_0x31244b['map'](_0x3c6d7a=>VisuMZ[_0x25416a('0x9e')]({},JSON[_0x25416a('0x6')](_0x3c6d7a)));break;default:continue;}_0x435a40[_0x5a1ebd]=_0x2a7e9c;}}else{function _0x58d859(){const _0x6df69a=_0x25416a;if(!_0x36a7f3[_0x6df69a('0x39')]())return;_0x5f0686[_0x6df69a('0x9e')](_0xf281b7,_0x5c4358);const _0xd0d750=_0x3d7303['members']()[_0x40c8ab['EnemyIndex']],_0x122d4a=_0x46004d[_0x6df69a('0x114')];if(_0xd0d750)_0xd0d750[_0x6df69a('0x14e')](_0x122d4a);}}}return _0x435a40;},(_0x2c0795=>{const _0x4c77a0=_0x48d9d2,_0xba50c9=_0x2c0795[_0x4c77a0('0x3e')];for(const _0x3277f8 of dependencies){if(!Imported[_0x3277f8]){if(_0x4c77a0('0x48')!==_0x4c77a0('0x48')){function _0x1e71e6(){const _0x5aa192=_0x4c77a0;return _0x5aa192('0x138')['format'](_0x75c58c(_0x1583ab['$1']));}}else{alert(_0x4c77a0('0x12a')[_0x4c77a0('0xdd')](_0xba50c9,_0x3277f8)),SceneManager['exit']();break;}}}const _0x59c478=_0x2c0795['description'];if(_0x59c478['match'](/\[Version[ ](.*?)\]/i)){if(_0x4c77a0('0xef')!==_0x4c77a0('0xef')){function _0x4f3c4e(){return[_0x58f297['highestTgrMember']()];}}else{const _0x122365=Number(RegExp['$1']);if(_0x122365!==VisuMZ[label][_0x4c77a0('0x90')]){if(_0x4c77a0('0xd0')!=='fxTUe')alert(_0x4c77a0('0x143')[_0x4c77a0('0xdd')](_0xba50c9,_0x122365)),SceneManager[_0x4c77a0('0x161')]();else{function _0x49c27b(){const _0x1e8cd5=_0x4c77a0,_0x3a34e0=_0x47c2b8[_0x1e8cd5('0x8b')](this[_0x1e8cd5('0xb0')]);return _0x3a34e0[_0x1e8cd5('0x15a')](this['item']()[_0x1e8cd5('0x67')])?[_0x3a34e0]:[_0x5c9df0[_0x1e8cd5('0x37')]()];}}}}}if(_0x59c478['match'](/\[Tier[ ](\d+)\]/i)){const _0x30dadd=Number(RegExp['$1']);if(_0x30dadd<tier)alert(_0x4c77a0('0x14f')[_0x4c77a0('0xdd')](_0xba50c9,_0x30dadd,tier)),SceneManager[_0x4c77a0('0x161')]();else{if('mjvZx'===_0x4c77a0('0xcd'))tier=Math[_0x4c77a0('0x13b')](_0x30dadd,tier);else{function _0x241cff(){const _0x18ba54=_0x4c77a0,_0xffffac=this[_0x18ba54('0x17e')]()[_0x18ba54('0x139')](_0x67c5c2=>_0x67c5c2[_0x18ba54('0x156')]);return _0x4c124d[_0x18ba54('0x82')](..._0xffffac);}}}}VisuMZ[_0x4c77a0('0x9e')](VisuMZ[label]['Settings'],_0x2c0795['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x48d9d2('0x3e')],_0x48d9d2('0x61'),_0x258d9f=>{const _0x3827b3=_0x48d9d2;if(!$gameParty[_0x3827b3('0x39')]())return;VisuMZ[_0x3827b3('0x9e')](_0x258d9f,_0x258d9f);const _0x4b123f=$gameActors[_0x3827b3('0x173')](_0x258d9f['ActorID']),_0x26f3df=_0x258d9f[_0x3827b3('0x114')];if(_0x4b123f)_0x4b123f[_0x3827b3('0x14e')](_0x26f3df);}),PluginManager[_0x48d9d2('0xba')](pluginData[_0x48d9d2('0x3e')],_0x48d9d2('0x154'),_0x390eb7=>{const _0xf2f396=_0x48d9d2;if(!$gameParty['inBattle']())return;VisuMZ[_0xf2f396('0x9e')](_0x390eb7,_0x390eb7);const _0x44beef=$gameActors[_0xf2f396('0x173')](_0x390eb7['ActorID']),_0x19514b=_0x390eb7[_0xf2f396('0x114')];if(_0x44beef)_0x44beef[_0xf2f396('0x10e')](_0x19514b);}),PluginManager[_0x48d9d2('0xba')](pluginData[_0x48d9d2('0x3e')],_0x48d9d2('0x0'),_0x3e71dc=>{const _0xeb0064=_0x48d9d2;if(!$gameParty['inBattle']())return;VisuMZ[_0xeb0064('0x9e')](_0x3e71dc,_0x3e71dc);const _0x1eec00=$gameTroop[_0xeb0064('0xeb')]()[_0x3e71dc[_0xeb0064('0x1c')]],_0x15c848=_0x3e71dc['Aggro'];if(_0x1eec00)_0x1eec00['gainAggro'](_0x15c848);}),PluginManager[_0x48d9d2('0xba')](pluginData[_0x48d9d2('0x3e')],_0x48d9d2('0x31'),_0x3d96dd=>{const _0x18cc4d=_0x48d9d2;if(!$gameParty[_0x18cc4d('0x39')]())return;VisuMZ[_0x18cc4d('0x9e')](_0x3d96dd,_0x3d96dd);const _0x7b32ae=$gameTroop[_0x18cc4d('0xeb')]()[_0x3d96dd[_0x18cc4d('0x1c')]],_0x2341fc=_0x3d96dd[_0x18cc4d('0x114')];if(_0x7b32ae)_0x7b32ae[_0x18cc4d('0x10e')](_0x2341fc);}),DataManager[_0x48d9d2('0x42')]=function(_0xc8c0d9){const _0x3b06c2=_0x48d9d2;if(!_0xc8c0d9)return![];return _0xc8c0d9[_0x3b06c2('0x16e')][_0x3b06c2('0x17')](/<PROVOKE>/i);},DataManager[_0x48d9d2('0xe4')]=function(_0xb0db80){if(!_0xb0db80)return![];return _0xb0db80['note']['match'](/<BYPASS PROVOKE>/i);},DataManager[_0x48d9d2('0x174')]=function(_0x11ba2e){const _0x4fdacf=_0x48d9d2;if(!_0x11ba2e)return![];return _0x11ba2e[_0x4fdacf('0x16e')]['match'](/<BYPASS TAUNT>/i);},DataManager[_0x48d9d2('0x23')]=function(_0x4f0f18){const _0x361017=_0x48d9d2;if(!_0x4f0f18)return![];return _0x4f0f18[_0x361017('0x16e')][_0x361017('0x17')](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager[_0x48d9d2('0x95')]=function(_0x3cd28a){const _0x5c8162=_0x48d9d2;if(!_0x3cd28a)return![];return _0x3cd28a['note'][_0x5c8162('0x17')](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x48d9d2('0x16')]=function(){const _0x59bff9=_0x48d9d2;if(this[_0x59bff9('0xf8')])return this['_provokeBitmap'];return this[_0x59bff9('0xf8')]=new Bitmap(0x64,0x64),this['_provokeBitmap']['drawCircle'](0x32,0x32,0x32,ColorManager[_0x59bff9('0x16a')]()),this[_0x59bff9('0xf8')];},ConfigManager[_0x48d9d2('0x11c')]=!![],ConfigManager[_0x48d9d2('0x6d')]=!![],VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x3b')]=ConfigManager[_0x48d9d2('0xf4')],ConfigManager['makeData']=function(){const _0x474aa9=_0x48d9d2,_0x19547b=VisuMZ[_0x474aa9('0x94')][_0x474aa9('0x3b')][_0x474aa9('0x16c')](this);return _0x19547b[_0x474aa9('0x11c')]=this['aggroGauge'],_0x19547b[_0x474aa9('0x6d')]=this[_0x474aa9('0x6d')],_0x19547b;},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x175')]=ConfigManager['applyData'],ConfigManager['applyData']=function(_0x2445ae){const _0x4b7770=_0x48d9d2;VisuMZ[_0x4b7770('0x94')][_0x4b7770('0x175')]['call'](this,_0x2445ae);_0x4b7770('0x11c')in _0x2445ae?this['aggroGauge']=_0x2445ae[_0x4b7770('0x11c')]:this[_0x4b7770('0x11c')]=!![];if(_0x4b7770('0x6d')in _0x2445ae)this['provokeOrigin']=_0x2445ae[_0x4b7770('0x6d')];else{if(_0x4b7770('0x13c')!=='oUzHx')this['provokeOrigin']=!![];else{function _0xce4290(){const _0x5d612b=_0x4b7770;if(!_0x1b40ac['inBattle']())return;_0x555d52[_0x5d612b('0x9e')](_0x3feb37,_0x480d3c);const _0x409681=_0x141603[_0x5d612b('0xeb')]()[_0x5f089f['EnemyIndex']],_0x35eaf6=_0x296744[_0x5d612b('0x114')];if(_0x409681)_0x409681[_0x5d612b('0x10e')](_0x35eaf6);}}}},TextManager[_0x48d9d2('0x11c')]=VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x43')][_0x48d9d2('0x114')][_0x48d9d2('0xe1')],TextManager['provokeOrigin']=VisuMZ['AggroControlSystem'][_0x48d9d2('0x43')][_0x48d9d2('0x96')][_0x48d9d2('0xe1')],ColorManager['getColorDataFromPluginParameters']=function(_0xd9b828,_0x443d09){const _0x317b84=_0x48d9d2;_0x443d09=String(_0x443d09),this['_colorCache']=this[_0x317b84('0xc5')]||{};if(_0x443d09['match'](/#(.*)/i)){if('aUMqX'===_0x317b84('0x187'))this[_0x317b84('0xc5')][_0xd9b828]=_0x317b84('0x138')['format'](String(RegExp['$1']));else{function _0xe8152b(){const _0x4c8f27=_0x317b84;return _0x11ccac[_0x4c8f27('0x94')][_0x4c8f27('0x43')][_0x4c8f27('0x96')][_0x4c8f27('0x17b')];}}}else this[_0x317b84('0xc5')][_0xd9b828]=this[_0x317b84('0x7d')](Number(_0x443d09));return this[_0x317b84('0xc5')][_0xd9b828];},ColorManager['getColor']=function(_0x29a943){const _0x5e8dc4=_0x48d9d2;_0x29a943=String(_0x29a943);if(_0x29a943[_0x5e8dc4('0x17')](/#(.*)/i))return _0x5e8dc4('0x138')[_0x5e8dc4('0xdd')](String(RegExp['$1']));else{if(_0x5e8dc4('0x4b')!==_0x5e8dc4('0x50'))return this[_0x5e8dc4('0x7d')](Number(_0x29a943));else{function _0x55468a(){const _0x42a589=_0x5e8dc4;return _0x4235e4[_0x42a589('0x94')][_0x42a589('0x15f')][_0x42a589('0x16c')](this);}}}},ColorManager[_0x48d9d2('0x16a')]=function(){const _0x1631dd=_0x48d9d2,_0x100bc5=_0x1631dd('0x12b');this[_0x1631dd('0xc5')]=this[_0x1631dd('0xc5')]||{};if(this['_colorCache'][_0x100bc5])return this['_colorCache'][_0x100bc5];const _0x1db838=VisuMZ['AggroControlSystem'][_0x1631dd('0x43')][_0x1631dd('0x96')][_0x1631dd('0x2e')];return this[_0x1631dd('0xcf')](_0x100bc5,_0x1db838);},ColorManager[_0x48d9d2('0x8')]=function(){const _0x475aa9=_0x48d9d2,_0x1e7426='aggro-gauge-color-1';this[_0x475aa9('0xc5')]=this['_colorCache']||{};if(this[_0x475aa9('0xc5')][_0x1e7426])return this[_0x475aa9('0xc5')][_0x1e7426];const _0x56c0c2=VisuMZ[_0x475aa9('0x94')][_0x475aa9('0x43')][_0x475aa9('0x114')][_0x475aa9('0x179')];return this['getColorDataFromPluginParameters'](_0x1e7426,_0x56c0c2);},ColorManager[_0x48d9d2('0x71')]=function(){const _0x936186=_0x48d9d2,_0x3cdc8b=_0x936186('0x108');this[_0x936186('0xc5')]=this['_colorCache']||{};if(this[_0x936186('0xc5')][_0x3cdc8b])return this[_0x936186('0xc5')][_0x3cdc8b];const _0x1589d9=VisuMZ['AggroControlSystem'][_0x936186('0x43')]['Aggro'][_0x936186('0xa7')];return this[_0x936186('0xcf')](_0x3cdc8b,_0x1589d9);},SceneManager['isSceneBattle']=function(){const _0x5db176=_0x48d9d2;return this[_0x5db176('0xf6')]&&this[_0x5db176('0xf6')]['constructor']===Scene_Battle;},BattleManager[_0x48d9d2('0x14d')]=function(_0x2ce9ff){const _0x65641f=_0x48d9d2,_0x5964e2=this['_subject'];if(!_0x5964e2){if(_0x65641f('0x21')===_0x65641f('0x21'))return null;else{function _0x12e4e8(){const _0x18dcc0=_0x65641f,_0x17aff8=this[_0x18dcc0('0xb3')](),_0x510f29=this['aliveMembers']()[_0x18dcc0('0x68')](_0x3b8874=>_0x3b8874['tgr']===_0x17aff8);return _0x510f29[_0x409e95['randomInt'](_0x510f29['length'])]||this[_0x18dcc0('0x10b')]();}}}if(_0x5964e2['isActor']()&&_0x2ce9ff['isEnemy']()){if(_0x65641f('0x136')==='UsoyQ')return _0x65641f('0x125')['format'](_0x5964e2[_0x65641f('0x18')]());else{function _0x5afd1d(){const _0x2f67e4=_0x65641f;if(this['_provoker']===_0x2bc421)this[_0x2f67e4('0x1')]();const _0x109060=_0x56496d[_0x2f67e4('0x14d')](this);this[_0x2f67e4('0xa1')][_0x529460]=_0x109060,!this['_provoker'][_0x5c8e57]&&delete this['_provoker'][_0x4012aa];}}}else{if(_0x5964e2[_0x65641f('0x4d')]()&&_0x2ce9ff[_0x65641f('0x2b')]())return _0x65641f('0xf')[_0x65641f('0xdd')](_0x5964e2[_0x65641f('0x9')]());}return null;},BattleManager[_0x48d9d2('0xec')]=function(_0x4dbbb4){const _0x489054=_0x48d9d2;if(!_0x4dbbb4)return null;if(_0x4dbbb4['match'](/BATTLE ACTOR (\d+)/i))return $gameActors[_0x489054('0x173')](Number(RegExp['$1']));else{if(_0x4dbbb4[_0x489054('0x17')](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x489054('0xeb')]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x48d9d2('0xbc')]=function(){const _0x9b2f6d=_0x48d9d2;return VisuMZ['AggroControlSystem'][_0x9b2f6d('0x43')][_0x9b2f6d('0x114')]['PriorityHighest'];},VisuMZ['AggroControlSystem']['Game_Action_targetsForAlive']=Game_Action['prototype'][_0x48d9d2('0x99')],Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0x99')]=function(_0x1735ba){const _0x1f61d3=_0x48d9d2;if(this[_0x1f61d3('0xaf')]())return this[_0x1f61d3('0x141')]();else{if(this['isTauntAffected']())return this[_0x1f61d3('0x160')](_0x1735ba);else{if(this[_0x1f61d3('0x127')]())return[_0x1735ba[_0x1f61d3('0x105')]()];else{if(_0x1f61d3('0x101')===_0x1f61d3('0x66')){function _0x4b49ea(){const _0x28d202=_0x1f61d3;_0x246c91[_0x28d202('0x94')][_0x28d202('0x104')][_0x28d202('0x16c')](this),this[_0x28d202('0x13e')]();}}else return VisuMZ['AggroControlSystem']['Game_Action_targetsForAlive'][_0x1f61d3('0x16c')](this,_0x1735ba);}}}},Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0xaf')]=function(){const _0x3f7ffc=_0x48d9d2;if(this['item']()[_0x3f7ffc('0xda')]!==0x1)return![];if(DataManager[_0x3f7ffc('0xe4')](this[_0x3f7ffc('0x17f')]()))return![];if(this[_0x3f7ffc('0x171')]()[_0x3f7ffc('0x15b')]())return![];return this[_0x3f7ffc('0x171')]()[_0x3f7ffc('0xaf')]();},Game_Action[_0x48d9d2('0xd7')]['makeProvokeTarget']=function(){const _0x516b08=_0x48d9d2;return[this[_0x516b08('0x171')]()[_0x516b08('0x109')]()];},Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0x98')]=function(){const _0x2d74f3=_0x48d9d2;if(this[_0x2d74f3('0x17f')]()[_0x2d74f3('0xda')]!==0x1)return![];if(DataManager['isBypassTaunt'](this['item']()))return![];if(this[_0x2d74f3('0x171')]()[_0x2d74f3('0x15c')]())return![];const _0x54d97d=this[_0x2d74f3('0x113')]();if(this[_0x2d74f3('0x84')]()&&_0x54d97d[_0x2d74f3('0x3f')]()['length']>0x0)return!![];if(this['isMagical']()&&_0x54d97d[_0x2d74f3('0x45')]()[_0x2d74f3('0xfa')]>0x0)return!![];if(this[_0x2d74f3('0xc6')]()&&_0x54d97d[_0x2d74f3('0x129')]()['length']>0x0)return!![];return![];},Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0x160')]=function(_0x544706){const _0x3ccb52=_0x48d9d2;if(this[_0x3ccb52('0xb0')]<0x0){if('QrMFV'!=='YyJMb')return[_0x544706[_0x3ccb52('0x37')](this[_0x3ccb52('0x17f')]()['hitType'])];else{function _0x531d4c(){const _0x2bb9b8=_0x3ccb52;_0x4de625[_0x2bb9b8('0x94')][_0x2bb9b8('0xd5')][_0x2bb9b8('0x16c')](this),this['initTauntAnimations']();}}}else{if(_0x3ccb52('0x158')==='tgasS'){function _0x171779(){_0x923fe0(_0x389010);}}else{const _0x20f151=_0x544706[_0x3ccb52('0x8b')](this[_0x3ccb52('0xb0')]);if(_0x20f151[_0x3ccb52('0x15a')](this['item']()['hitType']))return[_0x20f151];else{if(_0x3ccb52('0x4a')!=='GCtQt'){function _0x2f5d2b(){const _0x1fad1f=_0x3ccb52;return _0x45fad2[_0x1fad1f('0x94')]['Sprite_Gauge_gaugeX'][_0x1fad1f('0x16c')](this);}}else return[_0x544706[_0x3ccb52('0x37')]()];}}}},Game_Action['prototype'][_0x48d9d2('0x127')]=function(){const _0x3f43bf=_0x48d9d2;if(this[_0x3f43bf('0x17f')]()[_0x3f43bf('0xda')]!==0x1)return![];if(this[_0x3f43bf('0xb0')]>=0x0)return![];if(DataManager[_0x3f43bf('0x23')](this['item']()))return![];if(this[_0x3f43bf('0x171')]()[_0x3f43bf('0x168')]())return![];if(DataManager[_0x3f43bf('0x95')](this[_0x3f43bf('0x17f')]()))return!![];if(this[_0x3f43bf('0x171')]()[_0x3f43bf('0x95')]())return!![];return BattleManager[_0x3f43bf('0xbc')]();},VisuMZ['AggroControlSystem']['Game_Action_applyGlobal']=Game_Action['prototype']['applyGlobal'],Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0x166')]=function(){const _0x54ffa2=_0x48d9d2;VisuMZ[_0x54ffa2('0x94')][_0x54ffa2('0x12f')][_0x54ffa2('0x16c')](this),this[_0x54ffa2('0xf7')]();},Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0xf7')]=function(){const _0x2b612d=_0x48d9d2,_0x273fab=this[_0x2b612d('0x17f')]()['note'];if(_0x273fab[_0x2b612d('0x17')](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){if('TPyiR'!==_0x2b612d('0x5c')){const _0x17061e=Number(RegExp['$1']);this[_0x2b612d('0x171')]()[_0x2b612d('0x14e')](_0x17061e);}else{function _0x5a3402(){const _0x144b94=_0x2b612d;if(this[_0x144b94('0xa1')]===_0x294c25)this[_0x144b94('0x1')]();const _0x18810d=this[_0x144b94('0xa1')][_0x3520c8['id']],_0x41ae80=_0x449c71[_0x144b94('0xec')](_0x18810d);if(_0x41ae80&&_0x41ae80[_0x144b94('0x14')]())return _0x41ae80;}}}if(_0x273fab[_0x2b612d('0x17')](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0x3d3e02=String(RegExp['$1']),_0x11b69d=this[_0x2b612d('0x171')](),_0xa3d260=this['item'](),_0xfba917=this['subject'](),_0x29178e=_0xfba917;let _0x553814=_0x11b69d[_0x2b612d('0x12c')]();try{eval(_0x3d3e02);}catch(_0x9c4394){if('xWImB'!==_0x2b612d('0x16d')){if($gameTemp[_0x2b612d('0xab')]())console[_0x2b612d('0x102')](_0x9c4394);}else{function _0x1067de(){const _0x5da144=_0x2b612d;return _0x4500f4[_0x5da144('0xeb')]()[_0xed3bc9(_0x2955bf['$1'])];}}}_0x11b69d[_0x2b612d('0x10e')](_0x553814);}},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0xe9')]=Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0x14b')],Game_Action[_0x48d9d2('0xd7')]['applyItemUserEffect']=function(_0x4a5e53){const _0x6b6d68=_0x48d9d2;VisuMZ[_0x6b6d68('0x94')]['Game_Action_applyItemUserEffect'][_0x6b6d68('0x16c')](this,_0x4a5e53),this[_0x6b6d68('0x17c')](_0x4a5e53);},Game_Action['prototype']['applyItemUserEffectAggroControl']=function(_0x36d081){const _0x69abe1=_0x48d9d2;if(!this[_0x69abe1('0x17f')]())return;const _0x1c1f58=this[_0x69abe1('0x17f')]()[_0x69abe1('0x16e')];if(_0x1c1f58[_0x69abe1('0x17')](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){const _0x1263c6=Number(RegExp['$1']);_0x36d081['gainAggro'](_0x1263c6);}if(_0x1c1f58[_0x69abe1('0x17')](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){if(_0x69abe1('0x180')!==_0x69abe1('0x59')){const _0xae0d94=String(RegExp['$1']),_0x123e64=this['subject'](),_0x24dce1=this[_0x69abe1('0x17f')](),_0x3382db=this['subject'](),_0x186825=_0x36d081;let _0x58c8b4=_0x36d081['battleAggro']();try{eval(_0xae0d94);}catch(_0x2180ef){if($gameTemp[_0x69abe1('0xab')]())console[_0x69abe1('0x102')](_0x2180ef);}_0x36d081[_0x69abe1('0x10e')](_0x58c8b4);}else{function _0x419301(){const _0x296c57=_0x69abe1;this[_0x296c57('0x14e')](-_0x203b36);}}}},VisuMZ['AggroControlSystem']['Game_Action_executeHpDamage']=Game_Action[_0x48d9d2('0xd7')]['executeHpDamage'],Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0x170')]=function(_0x5a603c,_0x3b961a){const _0x104200=_0x48d9d2;VisuMZ[_0x104200('0x94')][_0x104200('0x55')][_0x104200('0x16c')](this,_0x5a603c,_0x3b961a),this[_0x104200('0x116')](_0x5a603c,_0x3b961a);},Game_Action[_0x48d9d2('0xd7')][_0x48d9d2('0x116')]=function(_0x5099c6,_0xc725e6){const _0xdaa014=_0x48d9d2,_0x550746=VisuMZ[_0xdaa014('0x94')]['Settings'][_0xdaa014('0x114')];if(_0xc725e6>0x0&&_0x5099c6[_0xdaa014('0x2b')]()!==this[_0xdaa014('0x171')]()[_0xdaa014('0x2b')]()){if(_0xdaa014('0x8f')==='tPwXE'){const _0x2e1d1e=_0x550746['AggroPerDmg'];this[_0xdaa014('0x171')]()[_0xdaa014('0x14e')](_0x2e1d1e*_0xc725e6);}else{function _0x5aa529(){const _0x2809b9=_0xdaa014,_0x30539c=_0x35b09d[_0x2809b9('0x44')];this[_0x2809b9('0x171')]()[_0x2809b9('0x14e')](_0x30539c*_0x308e4b[_0x2809b9('0xd1')](_0x4fb646));}}}if(_0xc725e6<0x0&&_0x5099c6[_0xdaa014('0x2b')]()===this['subject']()['isActor']()){if('IQYqe'!==_0xdaa014('0x80')){function _0x2383ff(){return[_0x17f58a];}}else{const _0x57957d=_0x550746[_0xdaa014('0x44')];this['subject']()['gainAggro'](_0x57957d*Math[_0xdaa014('0xd1')](_0xc725e6));}}},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x53')]=Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x89')],Game_BattlerBase[_0x48d9d2('0xd7')]['initMembers']=function(){const _0x2f8ccc=_0x48d9d2;this['_cache']={},VisuMZ[_0x2f8ccc('0x94')][_0x2f8ccc('0x53')]['call'](this),this[_0x2f8ccc('0x10a')]();},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x10a')]=function(){const _0x339e08=_0x48d9d2;this['clearProvokers'](),this[_0x339e08('0x17d')]();},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x1')]=function(){const _0x456453=_0x48d9d2;this[_0x456453('0xa1')]={};},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x119')]=Game_BattlerBase['prototype'][_0x48d9d2('0x29')],Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x29')]=function(){const _0x139b7d=_0x48d9d2;this['_cache']={},VisuMZ[_0x139b7d('0x94')][_0x139b7d('0x119')]['call'](this);},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x13a')]=function(_0xad6912){const _0x596a97=_0x48d9d2;return this[_0x596a97('0x5a')]=this[_0x596a97('0x5a')]||{},this['_cache'][_0xad6912]!==undefined;},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x109')]=function(){const _0x220026=_0x48d9d2;for(const _0x4b7bb2 of this[_0x220026('0x12')]()){if('pDmfz'!=='CgiKv'){if(DataManager[_0x220026('0x42')](_0x4b7bb2)){if(_0x220026('0x103')===_0x220026('0x103')){if(this[_0x220026('0xa1')]===undefined)this['clearProvokers']();const _0x2747c8=this[_0x220026('0xa1')][_0x4b7bb2['id']],_0x8eafa6=BattleManager[_0x220026('0xec')](_0x2747c8);if(_0x8eafa6&&_0x8eafa6[_0x220026('0x14')]())return _0x8eafa6;}else{function _0x4618bd(){const _0x40cedf=_0x220026;this[_0x40cedf('0x186')]=0xff;}}}}else{function _0x30c07f(){this['_aggro']=0x1;}}}return null;},Game_BattlerBase[_0x48d9d2('0xd7')]['isProvokeAffected']=function(){return!!this['provoker']();},Game_BattlerBase['prototype'][_0x48d9d2('0x15b')]=function(){const _0x387869=_0x48d9d2;return this[_0x387869('0x10')]()[_0x387869('0x35')](_0x3f03d3=>_0x3f03d3&&_0x3f03d3[_0x387869('0x16e')][_0x387869('0x17')](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x11')]=function(){const _0x2df922=_0x48d9d2;let _0x1396e4=_0x2df922('0x11');if(this[_0x2df922('0x13a')](_0x1396e4))return this[_0x2df922('0x5a')][_0x1396e4];return this[_0x2df922('0x5a')][_0x1396e4]=this['createProvokeHeightOrigin'](),this[_0x2df922('0x5a')][_0x1396e4];},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0xa2')]=function(){const _0x6faf8c=_0x48d9d2,_0x16644c=this[_0x6faf8c('0x2b')]()?this[_0x6faf8c('0x173')]()['note']:this[_0x6faf8c('0x4d')]()?this[_0x6faf8c('0xa6')]()['note']:'';if(_0x16644c[_0x6faf8c('0x17')](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ[_0x6faf8c('0x94')][_0x6faf8c('0x43')]['Provoke'][_0x6faf8c('0x17b')];},Game_BattlerBase[_0x48d9d2('0xd7')]['matchTauntType']=function(_0x350332){const _0x1b6028=_0x48d9d2;switch(_0x350332){case Game_Action[_0x1b6028('0xc8')]:return this[_0x1b6028('0x178')]();break;case Game_Action[_0x1b6028('0x12d')]:return this['magicalTaunt']();break;case Game_Action[_0x1b6028('0xa4')]:return this['certainHitTaunt']();break;}},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0xd4')]=function(){const _0x467e20=_0x48d9d2;return this[_0x467e20('0x178')]()||this[_0x467e20('0x11f')]()||this['certainHitTaunt']();},Game_BattlerBase[_0x48d9d2('0xd7')]['physicalTaunt']=function(){const _0x52254c=_0x48d9d2;return this[_0x52254c('0x10')]()['some'](_0x18e871=>_0x18e871&&_0x18e871['note'][_0x52254c('0x17')](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x11f')]=function(){const _0x523cb5=_0x48d9d2;return this[_0x523cb5('0x10')]()[_0x523cb5('0x35')](_0x1d2ba9=>_0x1d2ba9&&_0x1d2ba9[_0x523cb5('0x16e')][_0x523cb5('0x17')](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x48d9d2('0xd7')]['certainHitTaunt']=function(){const _0x5e9a85=_0x48d9d2;return this[_0x5e9a85('0x10')]()[_0x5e9a85('0x35')](_0x7d11fe=>_0x7d11fe&&_0x7d11fe[_0x5e9a85('0x16e')][_0x5e9a85('0x17')](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x48d9d2('0xd7')]['bypassTaunt']=function(){const _0x655717=_0x48d9d2;return this[_0x655717('0x10')]()['some'](_0x4c53b1=>_0x4c53b1&&_0x4c53b1[_0x655717('0x16e')][_0x655717('0x17')](/<BYPASS TAUNT>/i));},Game_BattlerBase[_0x48d9d2('0xd7')]['clearAggro']=function(){const _0x2c2f82=_0x48d9d2;this[_0x2c2f82('0x12e')]=0x1;},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0xb7')]=Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x167')],Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x167')]=function(_0x29c7e1){const _0x2479a9=_0x48d9d2;let _0x2a93a5=VisuMZ[_0x2479a9('0x94')][_0x2479a9('0xb7')][_0x2479a9('0x16c')](this,_0x29c7e1);if(_0x29c7e1===0x0){if(this[_0x2479a9('0x12e')]===undefined)this[_0x2479a9('0x17d')]();_0x2a93a5*=this[_0x2479a9('0xed')]();}return _0x2a93a5;},Game_BattlerBase['prototype'][_0x48d9d2('0x10e')]=function(_0x20a08a){const _0xb78c35=_0x48d9d2;if(this[_0xb78c35('0x12e')]===undefined)this[_0xb78c35('0x17d')]();this[_0xb78c35('0x12e')]=Math[_0xb78c35('0x13b')](0x1,Math[_0xb78c35('0x63')](this[_0xb78c35('0x12e')]));},Game_BattlerBase['prototype'][_0x48d9d2('0x14e')]=function(_0x1f7c72){const _0x4e5824=_0x48d9d2;if(this[_0x4e5824('0x12e')]===undefined)this[_0x4e5824('0x17d')]();this['_aggro']=Math[_0x4e5824('0x13b')](0x1,this['_aggro']+Math['round'](_0x1f7c72));},Game_BattlerBase[_0x48d9d2('0xd7')]['loseAggro']=function(_0x334645){const _0x5f5997=_0x48d9d2;this[_0x5f5997('0x14e')](-_0x334645);},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0xed')]=function(){const _0x5a2249=_0x48d9d2;if(this[_0x5a2249('0x7e')]())return 0x0;return this[_0x5a2249('0x70')]()*this[_0x5a2249('0x115')]();},Game_BattlerBase['prototype'][_0x48d9d2('0x12c')]=function(){const _0x33c164=_0x48d9d2;if(this[_0x33c164('0x12e')]===undefined){if('MOboJ'!=='MOboJ'){function _0x3c0512(){const _0x15290e=_0x33c164;if(!this[_0x15290e('0x135')][_0x15290e('0xee')])return;if(!this[_0x15290e('0x135')][_0x15290e('0xee')][_0x15290e('0x109')]())return;const _0xbe5c11=this[_0x15290e('0x135')][_0x15290e('0xee')][_0x15290e('0x109')]()[_0x15290e('0xfd')]();if(!_0xbe5c11)return;const _0xc64951=this[_0x15290e('0x135')][_0x15290e('0xee')][_0x15290e('0x11')](),_0x7c952d=this['_mainSprite'][_0x15290e('0xee')]['provoker']()['provokeHeightOrigin']();this[_0x15290e('0x137')]=this[_0x15290e('0x135')]['x'],this[_0x15290e('0xbf')]=this['_mainSprite']['y']-this[_0x15290e('0x135')][_0x15290e('0x172')]*_0xc64951,this[_0x15290e('0x162')]=_0xbe5c11['x'],this[_0x15290e('0x184')]=_0xbe5c11['y']-_0xbe5c11['height']*_0x7c952d,this['_homeX']+=_0x41fbdc['round']((_0x48b9b7['width']-_0x536da1[_0x15290e('0xdc')])/0x2),this['_homeY']+=_0x3909e3['round']((_0x595c60[_0x15290e('0x172')]-_0x598ca4[_0x15290e('0x169')])/0x2),this['_targetX']+=_0x466116['round']((_0x1e1d74[_0x15290e('0xbb')]-_0xceb3f2['boxWidth'])/0x2),this[_0x15290e('0x184')]+=_0x3152af[_0x15290e('0x63')]((_0x3d37c6[_0x15290e('0x172')]-_0x2c7f78[_0x15290e('0x169')])/0x2);if(!_0x35977b['isSideView']()){if(_0xbe5c11['_battler']['isActor']())_0x53b616=!![],this[_0x15290e('0x162')]+=_0x445aa5[_0x15290e('0xf6')][_0x15290e('0x78')]['x'],this[_0x15290e('0x184')]+=_0x2743dd[_0x15290e('0xf6')]['_statusWindow']['y'];else _0xbe5c11[_0x15290e('0xee')][_0x15290e('0x4d')]()&&(_0x329f07=!![],this['_homeX']+=_0x379233[_0x15290e('0xf6')][_0x15290e('0x78')]['x'],this['_homeY']+=_0xacbe26[_0x15290e('0xf6')][_0x15290e('0x78')]['y']);}}}else this['clearAggro']();}return this[_0x33c164('0x12e')];},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x70')]=function(){const _0x7fa9f0=_0x48d9d2;return this[_0x7fa9f0('0x10')]()[_0x7fa9f0('0xe')]((_0x486b46,_0x1ae42c)=>{const _0x5a7ca2=_0x7fa9f0;if(_0x5a7ca2('0xde')!==_0x5a7ca2('0xde')){function _0x3c7b8e(){if(_0x236d94['isPlaytest']())_0x125f15['log'](_0x2a839b);}}else{if(_0x1ae42c&&_0x1ae42c[_0x5a7ca2('0x16e')][_0x5a7ca2('0x17')](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i))return _0x486b46+Number(RegExp['$1'])/0x64;else{if(_0x5a7ca2('0x8e')==='pewBy')return _0x486b46;else{function _0x17c561(){const _0xceb930=_0x5a7ca2;_0x423eef[_0xceb930('0x25')]&&this['sortEnemies'](),_0x3ef211[_0xceb930('0xd7')][_0xceb930('0x29')][_0xceb930('0x16c')](this);}}}}},this['battleAggro']());},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x115')]=function(){const _0x23173f=_0x48d9d2;return this[_0x23173f('0x10')]()['reduce']((_0xafb6ca,_0x232214)=>{const _0x20ca55=_0x23173f;if(_0x20ca55('0xc2')==='qWaxJ'){function _0x18895c(){const _0x5f092a=_0x20ca55;return'Battle\x20Enemy\x20%1'[_0x5f092a('0xdd')](_0x3a9e07[_0x5f092a('0x9')]());}}else return _0x232214&&_0x232214['note'][_0x20ca55('0x17')](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0xafb6ca+Number(RegExp['$1'])/0x64:_0xafb6ca;},0x1);},Game_BattlerBase['prototype'][_0x48d9d2('0x168')]=function(){const _0x37edd8=_0x48d9d2;return this[_0x37edd8('0x10')]()[_0x37edd8('0x35')](_0x226732=>_0x226732&&_0x226732['note'][_0x37edd8('0x17')](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase[_0x48d9d2('0xd7')][_0x48d9d2('0x95')]=function(){const _0x5c9782=_0x48d9d2;return this[_0x5c9782('0x10')]()[_0x5c9782('0x35')](_0x24936c=>_0x24936c&&_0x24936c[_0x5c9782('0x16e')][_0x5c9782('0x17')](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x1f')]=Game_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x8d')],Game_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x8d')]=function(_0x43eac5){const _0x5326a8=_0x48d9d2;VisuMZ[_0x5326a8('0x94')][_0x5326a8('0x1f')][_0x5326a8('0x16c')](this,_0x43eac5),this[_0x5326a8('0x17d')]();},VisuMZ[_0x48d9d2('0x94')]['Game_Battler_addState']=Game_Battler[_0x48d9d2('0xd7')]['addState'],Game_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x58')]=function(_0x35349f){const _0x1fcaaf=_0x48d9d2;VisuMZ[_0x1fcaaf('0x94')][_0x1fcaaf('0x51')][_0x1fcaaf('0x16c')](this,_0x35349f),this[_0x1fcaaf('0x69')](_0x35349f);},Game_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x69')]=function(_0x4e532c){const _0x34b82b=_0x48d9d2;if(this[_0x34b82b('0x81')](_0x4e532c)){if(this['_provoker']===undefined)this[_0x34b82b('0x1')]();const _0x1f1b51=BattleManager[_0x34b82b('0x14d')](this);this[_0x34b82b('0xa1')][_0x4e532c]=_0x1f1b51,!this['_provoker'][_0x4e532c]&&delete this[_0x34b82b('0xa1')][_0x4e532c];}},Game_Unit[_0x48d9d2('0xd7')][_0x48d9d2('0x3f')]=function(){const _0x462770=_0x48d9d2;return this[_0x462770('0x17e')]()[_0x462770('0x68')](_0x19a2e2=>_0x19a2e2&&_0x19a2e2[_0x462770('0x178')]());},Game_Unit['prototype'][_0x48d9d2('0x45')]=function(){const _0x18f66f=_0x48d9d2;return this[_0x18f66f('0x17e')]()[_0x18f66f('0x68')](_0x374093=>_0x374093&&_0x374093[_0x18f66f('0x11f')]());},Game_Unit[_0x48d9d2('0xd7')][_0x48d9d2('0x129')]=function(){const _0x1e2472=_0x48d9d2;return this[_0x1e2472('0x17e')]()[_0x1e2472('0x68')](_0xf455c7=>_0xf455c7&&_0xf455c7[_0x1e2472('0x3a')]());},Game_Unit[_0x48d9d2('0xd7')][_0x48d9d2('0x37')]=function(_0x3c2c8b){const _0x21f63c=_0x48d9d2;let _0x2bfb38=[];switch(_0x3c2c8b){case Game_Action[_0x21f63c('0xc8')]:_0x2bfb38=this['physicalTauntMembers']();break;case Game_Action[_0x21f63c('0x12d')]:_0x2bfb38=this[_0x21f63c('0x45')]();break;case Game_Action[_0x21f63c('0xa4')]:_0x2bfb38=this[_0x21f63c('0x129')]();break;}let _0x5ae29b=Math[_0x21f63c('0x10c')]()*this['tgrSumFromGroup'](_0x2bfb38),_0x2b1a86=null;if(BattleManager[_0x21f63c('0xbc')]()){const _0x3eb5bd=!![];return this[_0x21f63c('0x87')](_0x2bfb38,_0x3eb5bd);}else{for(const _0x2db71b of _0x2bfb38){_0x5ae29b-=_0x2db71b[_0x21f63c('0x156')],_0x5ae29b<=0x0&&!_0x2b1a86&&(_0x2b1a86=_0x2db71b);}return _0x2b1a86||this[_0x21f63c('0x10b')]();}},Game_Unit[_0x48d9d2('0xd7')]['tgrSumFromGroup']=function(_0x3030c3){const _0x9540d5=_0x48d9d2;return _0x3030c3[_0x9540d5('0xe')]((_0xbb3f27,_0x4adf30)=>_0xbb3f27+_0x4adf30[_0x9540d5('0x156')],0x0);},Game_Unit[_0x48d9d2('0xd7')]['tgrMax']=function(){const _0x24fafa=_0x48d9d2,_0x2edb1f=this[_0x24fafa('0x17e')]()[_0x24fafa('0x139')](_0x154098=>_0x154098[_0x24fafa('0x156')]);return Math[_0x24fafa('0x13b')](..._0x2edb1f);},Game_Unit['prototype'][_0x48d9d2('0xb3')]=function(){const _0x3bf210=_0x48d9d2,_0x289c90=this[_0x3bf210('0x17e')]()['map'](_0x279a76=>_0x279a76[_0x3bf210('0x156')]);return Math[_0x3bf210('0x82')](..._0x289c90);},Game_Unit[_0x48d9d2('0xd7')][_0x48d9d2('0x105')]=function(){const _0x2df9f0=_0x48d9d2,_0x3de3fd=this['tgrMax'](),_0x5df42f=this['aliveMembers']()[_0x2df9f0('0x68')](_0x6c282f=>_0x6c282f['tgr']===_0x3de3fd);return _0x5df42f[Math[_0x2df9f0('0xa')](_0x5df42f[_0x2df9f0('0xfa')])]||this[_0x2df9f0('0x10b')]();},Game_Unit['prototype'][_0x48d9d2('0x10d')]=function(){const _0x57b41f=_0x48d9d2,_0x29cbff=this[_0x57b41f('0xb3')](),_0x3811a5=this[_0x57b41f('0x17e')]()['filter'](_0x60af76=>_0x60af76[_0x57b41f('0x156')]===_0x29cbff);return _0x3811a5[Math['randomInt'](_0x3811a5[_0x57b41f('0xfa')])]||this[_0x57b41f('0x10b')]();},Game_Unit['prototype'][_0x48d9d2('0x87')]=function(_0x5813ed,_0x57b2c6){const _0x1fa5ea=_0x48d9d2,_0x5eb3fb=_0x5813ed[_0x1fa5ea('0x139')](_0x37c8ef=>_0x37c8ef[_0x1fa5ea('0x156')]),_0x315c38=_0x57b2c6?Math[_0x1fa5ea('0x13b')](..._0x5eb3fb):Math['min'](..._0x5eb3fb),_0x48e19b=_0x5813ed[_0x1fa5ea('0x68')](_0x58fd39=>_0x58fd39[_0x1fa5ea('0x156')]===_0x315c38);return _0x48e19b[Math[_0x1fa5ea('0xa')](_0x48e19b[_0x1fa5ea('0xfa')])]||this[_0x1fa5ea('0x10b')]();},VisuMZ['AggroControlSystem'][_0x48d9d2('0x3c')]=Scene_Options[_0x48d9d2('0xd7')]['maxCommands'],Scene_Options[_0x48d9d2('0xd7')][_0x48d9d2('0x9d')]=function(){const _0x3b2b0c=_0x48d9d2;let _0x1f9020=VisuMZ[_0x3b2b0c('0x94')]['Scene_Options_maxCommands'][_0x3b2b0c('0x16c')](this);const _0xab9220=VisuMZ[_0x3b2b0c('0x94')][_0x3b2b0c('0x43')];if(_0xab9220['Provoke']['AddOption']&&_0xab9220[_0x3b2b0c('0x96')][_0x3b2b0c('0xa8')])_0x1f9020++;if(_0xab9220[_0x3b2b0c('0x114')][_0x3b2b0c('0x52')]&&_0xab9220[_0x3b2b0c('0x114')]['AdjustOptionsRect'])_0x1f9020++;return _0x1f9020;},Sprite_Battler[_0x48d9d2('0x118')]=VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x43')]['Taunt']['CycleTime'],Sprite_Battler[_0x48d9d2('0xc9')]=VisuMZ['AggroControlSystem'][_0x48d9d2('0x43')][_0x48d9d2('0x73')]['AniPhysical'],Sprite_Battler[_0x48d9d2('0x5')]=VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x43')][_0x48d9d2('0x73')][_0x48d9d2('0x38')],Sprite_Battler['_certainHitTauntAnimation']=VisuMZ['AggroControlSystem'][_0x48d9d2('0x43')][_0x48d9d2('0x73')]['AniCertain'],Sprite_Battler[_0x48d9d2('0x134')]=VisuMZ[_0x48d9d2('0x94')]['Settings']['Taunt']['MirrorActorAni'],Sprite_Battler['_muteTauntAnimations']=VisuMZ['AggroControlSystem']['Settings'][_0x48d9d2('0x73')][_0x48d9d2('0xe0')],VisuMZ[_0x48d9d2('0x94')]['Sprite_Battler_initialize']=Sprite_Battler[_0x48d9d2('0xd7')]['initialize'],Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x64')]=function(_0x5299ea){const _0x2ecd8e=_0x48d9d2;VisuMZ[_0x2ecd8e('0x94')][_0x2ecd8e('0x91')][_0x2ecd8e('0x16c')](this,_0x5299ea),this[_0x2ecd8e('0x3')]()&&setTimeout(this[_0x2ecd8e('0xc3')]['bind'](this),0x3e8);},VisuMZ[_0x48d9d2('0x94')]['Sprite_Battler_initMembers']=Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x89')],Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x89')]=function(){const _0x2338cf=_0x48d9d2;VisuMZ[_0x2338cf('0x94')][_0x2338cf('0xd5')][_0x2338cf('0x16c')](this),this[_0x2338cf('0x27')]();},Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x27')]=function(){const _0xbc5760=_0x48d9d2;this[_0xbc5760('0xcb')]=VisuMZ[_0xbc5760('0x94')]['Settings']['Taunt'][_0xbc5760('0x14c')],this[_0xbc5760('0xfe')]=[_0xbc5760('0x107'),_0xbc5760('0xdb'),_0xbc5760('0x13f')];},Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x3')]=function(){const _0x3f7c2d=_0x48d9d2;if(!Imported[_0x3f7c2d('0x25')])return![];if(![Sprite_Actor,Sprite_Enemy][_0x3f7c2d('0x159')](this[_0x3f7c2d('0x9a')]))return![];return ConfigManager[_0x3f7c2d('0x6d')]&&VisuMZ['AggroControlSystem'][_0x3f7c2d('0x43')][_0x3f7c2d('0x96')][_0x3f7c2d('0xf9')];},Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0xc3')]=function(){const _0x3d4301=_0x48d9d2;if(!SceneManager['isSceneBattle']())return;this['_provokeSprite']=new Sprite_ProvokeTrail(this),this[_0x3d4301('0x133')][_0x3d4301('0x128')]()[_0x3d4301('0x40')](this['_provokeSprite']);},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x86')]=Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x88')],Sprite_Battler['prototype']['setBattler']=function(_0xdb30){const _0x3bb995=_0x48d9d2;VisuMZ['AggroControlSystem'][_0x3bb995('0x86')][_0x3bb995('0x16c')](this,_0xdb30);if(this[_0x3bb995('0x47')])this['_aggroGaugeSprite'][_0x3bb995('0xee')]=_0xdb30;},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0xff')]=Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x15d')],Sprite_Battler['prototype'][_0x48d9d2('0x15d')]=function(){const _0x3025a2=_0x48d9d2;VisuMZ[_0x3025a2('0x94')][_0x3025a2('0xff')][_0x3025a2('0x16c')](this),this[_0x3025a2('0x145')]();},Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x145')]=function(){const _0x4cf766=_0x48d9d2;if(!Imported[_0x4cf766('0x3d')])return;if(!Imported['VisuMZ_1_BattleCore'])return;if(!VisuMZ[_0x4cf766('0x94')][_0x4cf766('0x43')][_0x4cf766('0x73')]['ShowAnimation'])return;if(!this[_0x4cf766('0xee')])return;this[_0x4cf766('0xcb')]--;if(this['_tauntAnimationTimer']<=0x0){if(_0x4cf766('0x155')===_0x4cf766('0x10f')){function _0x1172f5(){const _0x2ea99a=_0x4cf766;return this[_0x2ea99a('0x10')]()[_0x2ea99a('0x35')](_0x169345=>_0x169345&&_0x169345['note']['match'](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));}}else this['startNewTauntAnimation']();}},Sprite_Battler[_0x48d9d2('0xd7')][_0x48d9d2('0x33')]=function(){const _0x1bd5e0=_0x48d9d2;this[_0x1bd5e0('0xcb')]=Sprite_Battler[_0x1bd5e0('0x118')];if(!this['_battler'])return;if(!this[_0x1bd5e0('0xee')][_0x1bd5e0('0xd4')]())return;const _0x18d6c6=[this['_battler']],_0x33a7e4=this[_0x1bd5e0('0x144')](),_0x360f5e=this[_0x1bd5e0('0xee')][_0x1bd5e0('0x2b')]()&&Sprite_Battler[_0x1bd5e0('0x134')],_0xfc51f2=Sprite_Battler['_muteTauntAnimations'];$gameTemp[_0x1bd5e0('0x22')](_0x18d6c6,_0x33a7e4,_0x360f5e,_0xfc51f2);},Sprite_Battler['prototype']['getNextTauntAnimation']=function(){const _0x9ed1ec=_0x48d9d2;let _0x55021e=this[_0x9ed1ec('0xfe')][_0x9ed1ec('0xfa')];while(_0x55021e){if(_0x9ed1ec('0x5d')===_0x9ed1ec('0x5d')){const _0x470e37=this['_tauntAnimationCycle']['shift']();this['_tauntAnimationCycle'][_0x9ed1ec('0x2d')](_0x470e37);const _0x405c5e=_0x9ed1ec('0xa9')[_0x9ed1ec('0xdd')](_0x470e37);if(this[_0x9ed1ec('0xee')][_0x405c5e]()){if(_0x9ed1ec('0x49')!==_0x9ed1ec('0x49')){function _0x146193(){const _0x48c48b=_0x9ed1ec;_0x51986f[_0x48c48b('0x94')][_0x48c48b('0xff')][_0x48c48b('0x16c')](this),this[_0x48c48b('0x145')]();}}else{const _0x1e56a9=_0x9ed1ec('0xca')[_0x9ed1ec('0xdd')](_0x470e37),_0x411e8e=Sprite_Battler[_0x1e56a9];if(_0x411e8e)return _0x411e8e;}}_0x55021e--;}else{function _0xdc7b94(){const _0x44f44a=_0x9ed1ec;this[_0x44f44a('0xc5')][_0x26691c]='#%1'[_0x44f44a('0xdd')](_0x21c28f(_0xc7b405['$1']));}}}return Sprite_Battler[_0x9ed1ec('0x6a')];},VisuMZ['AggroControlSystem']['Sprite_Actor_createStateSprite']=Sprite_Actor['prototype'][_0x48d9d2('0xae')],Sprite_Actor['prototype'][_0x48d9d2('0xae')]=function(){const _0x367e74=_0x48d9d2;VisuMZ['AggroControlSystem'][_0x367e74('0xa0')][_0x367e74('0x16c')](this),this[_0x367e74('0x7b')]();},Sprite_Actor[_0x48d9d2('0xd7')][_0x48d9d2('0x7b')]=function(){const _0x378062=_0x48d9d2;if(this[_0x378062('0x9a')]!==Sprite_Actor)return;if(!this[_0x378062('0x28')]())return;if(!SceneManager[_0x378062('0x76')]())return;const _0x22daeb=VisuMZ[_0x378062('0x94')][_0x378062('0x43')][_0x378062('0x114')],_0xdb958b=new Sprite_Gauge();_0xdb958b['anchor']['x']=_0x22daeb[_0x378062('0x123')],_0xdb958b[_0x378062('0x7f')]['y']=_0x22daeb[_0x378062('0x7a')];const _0x44b333=Sprite_Gauge[_0x378062('0xd7')]['bitmapWidth']();_0xdb958b[_0x378062('0xdf')]['x']=_0xdb958b['scale']['y']=_0x22daeb[_0x378062('0x65')],this[_0x378062('0x47')]=_0xdb958b,this[_0x378062('0x40')](_0xdb958b);},Sprite_Actor[_0x48d9d2('0xd7')][_0x48d9d2('0x28')]=function(){const _0x41aeb7=_0x48d9d2;if(Imported[_0x41aeb7('0x25')]&&this[_0x41aeb7('0x9a')]===Sprite_SvEnemy)return![];return ConfigManager[_0x41aeb7('0x11c')]&&VisuMZ[_0x41aeb7('0x94')]['Settings'][_0x41aeb7('0x114')][_0x41aeb7('0x16f')];},VisuMZ[_0x48d9d2('0x94')]['Sprite_Actor_update']=Sprite_Actor['prototype'][_0x48d9d2('0x15d')],Sprite_Actor[_0x48d9d2('0xd7')][_0x48d9d2('0x15d')]=function(){const _0x35bcba=_0x48d9d2;VisuMZ['AggroControlSystem']['Sprite_Actor_update'][_0x35bcba('0x16c')](this),this[_0x35bcba('0x16b')]();},Sprite_Actor[_0x48d9d2('0xd7')][_0x48d9d2('0x16b')]=function(){const _0x3551a2=_0x48d9d2;if(!this[_0x3551a2('0xee')])return;if(!this[_0x3551a2('0x47')])return;const _0x167933=VisuMZ[_0x3551a2('0x94')][_0x3551a2('0x43')][_0x3551a2('0x114')],_0x262898=this[_0x3551a2('0x47')];let _0x2d59e0=_0x167933[_0x3551a2('0x19')];if(this[_0x3551a2('0xee')]['battleUIOffsetX']){if(_0x3551a2('0xf1')!=='vAJVj'){function _0x41610b(){const _0x2de7ae=_0x3551a2;this[_0x2de7ae('0x64')](...arguments);}}else _0x2d59e0+=this[_0x3551a2('0xee')][_0x3551a2('0x130')]();}let _0x1ca2a7=_0x167933[_0x3551a2('0x1d')];this['_battler'][_0x3551a2('0xd8')]&&(_0x1ca2a7+=this[_0x3551a2('0xee')][_0x3551a2('0xd8')]());_0x262898['x']=_0x2d59e0,_0x262898['y']=-this[_0x3551a2('0x172')]+_0x1ca2a7;if(this['_battler']&&_0x262898[_0x3551a2('0x147')]!==_0x3551a2('0xed')){if(_0x3551a2('0xe7')===_0x3551a2('0xe5')){function _0x4533b6(){const _0xf9627=_0x3551a2;_0x1ffc63(_0xf9627('0x14f')['format'](_0x18a95e,_0x1716af,_0x4c495e)),_0xbfc6b0[_0xf9627('0x161')]();}}else _0x262898[_0x3551a2('0x182')]=!![],_0x262898[_0x3551a2('0x9b')](this['_battler'],'aggro');}this[_0x3551a2('0xdf')]['x']<0x0&&(_0x262898[_0x3551a2('0xdf')]['x']=-Math[_0x3551a2('0xd1')](_0x262898[_0x3551a2('0xdf')]['x']));},Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x75')]=function(){const _0x363883=_0x48d9d2;return this[_0x363883('0xee')]&&this[_0x363883('0x147')]===_0x363883('0xed');},VisuMZ[_0x48d9d2('0x94')]['Sprite_Gauge_gaugeX']=Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0xd9')],Sprite_Gauge[_0x48d9d2('0xd7')]['gaugeX']=function(){const _0x165906=_0x48d9d2;if(this['isAggroType']()){if(_0x165906('0xe2')===_0x165906('0xe2'))return 0x0;else{function _0x5899c4(){const _0x2f13fb=_0x165906;this['_cache']={},_0x142742[_0x2f13fb('0x94')][_0x2f13fb('0x119')][_0x2f13fb('0x16c')](this);}}}else{if(_0x165906('0xa5')===_0x165906('0x11a')){function _0x5351cc(){const _0x1b24b8=_0x165906,_0x481f56=this['_tauntAnimationCycle'][_0x1b24b8('0xd6')]();this['_tauntAnimationCycle'][_0x1b24b8('0x2d')](_0x481f56);const _0x1566e4='%1Taunt'[_0x1b24b8('0xdd')](_0x481f56);if(this['_battler'][_0x1566e4]()){const _0x49f4ae=_0x1b24b8('0xca')[_0x1b24b8('0xdd')](_0x481f56),_0x3d0940=_0xc6088a[_0x49f4ae];if(_0x3d0940)return _0x3d0940;}_0x52417b--;}}else return VisuMZ[_0x165906('0x94')][_0x165906('0xce')][_0x165906('0x16c')](this);}},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x36')]=Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x2c')],Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x2c')]=function(){const _0x4d2f7d=_0x48d9d2;let _0x81d5b1=VisuMZ[_0x4d2f7d('0x94')][_0x4d2f7d('0x36')]['call'](this);if(this[_0x4d2f7d('0x75')]()&&this[_0x4d2f7d('0xee')]){if(_0x4d2f7d('0x1a')!=='pSSwY'){if(this[_0x4d2f7d('0xee')][_0x4d2f7d('0x7e')]())return 0x0;if(this[_0x4d2f7d('0xee')]['isAlive']()&&this[_0x4d2f7d('0xee')][_0x4d2f7d('0xd')]()[_0x4d2f7d('0x17e')]()[_0x4d2f7d('0xfa')]===0x1)return 0x1;}else{function _0x5ec663(){const _0x4c0c4c=_0x4d2f7d,_0x4cebb2=_0x21d252(_0x509194['$1']);_0x4cebb2<_0x1024ac?(_0xe10063(_0x4c0c4c('0x14f')[_0x4c0c4c('0xdd')](_0x320179,_0x4cebb2,_0x93b243)),_0x25bdbd['exit']()):_0x49cc88=_0x5bb59f[_0x4c0c4c('0x13b')](_0x4cebb2,_0x208f8c);}}}return _0x81d5b1[_0x4d2f7d('0x152')](0x0,0x1);},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x13')]=Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0xd2')],Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0xd2')]=function(){const _0x2a9c2f=_0x48d9d2;if(this['isAggroType']()){if(_0x2a9c2f('0xfb')!==_0x2a9c2f('0x34'))return this[_0x2a9c2f('0x79')]();else{function _0x242628(){const _0x112d2f=_0x2a9c2f;if(this['constructor']!==_0x5e9cd7)return;if(!this[_0x112d2f('0x28')]())return;if(!_0x36a369[_0x112d2f('0x76')]())return;const _0x53b29b=_0x31e459[_0x112d2f('0x94')][_0x112d2f('0x43')][_0x112d2f('0x114')],_0x229188=new _0x1e1f0f();_0x229188[_0x112d2f('0x7f')]['x']=_0x53b29b['AnchorX'],_0x229188[_0x112d2f('0x7f')]['y']=_0x53b29b[_0x112d2f('0x7a')];const _0xa49a65=_0x22ba4d[_0x112d2f('0xd7')][_0x112d2f('0xb6')]();_0x229188[_0x112d2f('0xdf')]['x']=_0x229188['scale']['y']=_0x53b29b['Scale'],this[_0x112d2f('0x47')]=_0x229188,this[_0x112d2f('0x40')](_0x229188);}}}else{if(_0x2a9c2f('0xe3')===_0x2a9c2f('0xe3'))return VisuMZ[_0x2a9c2f('0x94')]['Sprite_Gauge_currentValue'][_0x2a9c2f('0x16c')](this);else{function _0x527350(){const _0x3dbdd4=_0x2a9c2f;let _0x1bbf32=this['_tauntAnimationCycle'][_0x3dbdd4('0xfa')];while(_0x1bbf32){const _0x23f495=this[_0x3dbdd4('0xfe')]['shift']();this[_0x3dbdd4('0xfe')][_0x3dbdd4('0x2d')](_0x23f495);const _0x450854=_0x3dbdd4('0xa9')[_0x3dbdd4('0xdd')](_0x23f495);if(this[_0x3dbdd4('0xee')][_0x450854]()){const _0x254565=_0x3dbdd4('0xca')[_0x3dbdd4('0xdd')](_0x23f495),_0x2d55ac=_0x349c43[_0x254565];if(_0x2d55ac)return _0x2d55ac;}_0x1bbf32--;}return _0x1c0359['_certainHitTauntAnimation'];}}}},Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x79')]=function(){const _0x43e6c8=_0x48d9d2,_0x47d871=this[_0x43e6c8('0xee')]['friendsUnit'](),_0x22740b=this[_0x43e6c8('0xee')][_0x43e6c8('0x156')]-_0x47d871[_0x43e6c8('0xb3')](),_0xf3eb46=_0x47d871[_0x43e6c8('0x177')]()-_0x47d871[_0x43e6c8('0xb3')]();if(_0x22740b>=_0xf3eb46)return 0x64;return _0x22740b/Math[_0x43e6c8('0x13b')](_0xf3eb46,0x1)*0x64;},VisuMZ['AggroControlSystem'][_0x48d9d2('0x15f')]=Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0xf3')],Sprite_Gauge[_0x48d9d2('0xd7')]['currentMaxValue']=function(){const _0x3b7af7=_0x48d9d2;if(this[_0x3b7af7('0x75')]()){if(_0x3b7af7('0x122')===_0x3b7af7('0x9f')){function _0x300566(){const _0x118d6d=_0x3b7af7;this['aggroGauge']=_0x1b87be[_0x118d6d('0x11c')];}}else return this[_0x3b7af7('0xc0')]();}else{if(_0x3b7af7('0x1e')!==_0x3b7af7('0x1e')){function _0x3f91b3(){const _0x33f455=_0x3b7af7;_0x1e8091[_0x33f455('0x94')]['Sprite_Actor_update'][_0x33f455('0x16c')](this),this['updateAggroGaugeSprite']();}}else return VisuMZ[_0x3b7af7('0x94')][_0x3b7af7('0x15f')][_0x3b7af7('0x16c')](this);}},Sprite_Gauge[_0x48d9d2('0xd7')]['currentMaxValueAggroControl']=function(){return 0x64;},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x164')]=Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x124')],Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x124')]=function(){const _0x48ee36=_0x48d9d2;if(this[_0x48ee36('0x75')]())return ColorManager[_0x48ee36('0x8')]();else{if('RMJKz'!==_0x48ee36('0x15e'))return VisuMZ['AggroControlSystem'][_0x48ee36('0x164')][_0x48ee36('0x16c')](this);else{function _0x2fdb68(){const _0x53e89f=_0x48ee36;this['_mainSprite']=_0x326201,_0x1fb0b2[_0x53e89f('0xd7')][_0x53e89f('0x64')][_0x53e89f('0x16c')](this),this['initMembers'](),this[_0x53e89f('0x6b')]();}}}},VisuMZ['AggroControlSystem'][_0x48d9d2('0x6e')]=Sprite_Gauge[_0x48d9d2('0xd7')]['gaugeColor2'],Sprite_Gauge[_0x48d9d2('0xd7')]['gaugeColor2']=function(){const _0x275908=_0x48d9d2;if(this[_0x275908('0x75')]()){if('GmMmU'==='SaCXi'){function _0x4edaf3(){const _0x558aa2=_0x275908;this[_0x558aa2('0x17d')]();}}else return ColorManager[_0x275908('0x71')]();}else return VisuMZ['AggroControlSystem'][_0x275908('0x6e')][_0x275908('0x16c')](this);},VisuMZ[_0x48d9d2('0x94')]['Sprite_Gauge_update']=Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x15d')],Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x15d')]=function(){const _0x3ad075=_0x48d9d2;VisuMZ[_0x3ad075('0x94')][_0x3ad075('0x104')]['call'](this),this[_0x3ad075('0x13e')]();},Sprite_Gauge['prototype'][_0x48d9d2('0x13e')]=function(){const _0x93150f=_0x48d9d2;if(!this[_0x93150f('0x75')]())return;if(!Imported[_0x93150f('0x25')])return;const _0x536848=this[_0x93150f('0xee')]['battler']();if(this[_0x93150f('0xbd')]){if(_0x93150f('0x2')===_0x93150f('0x2'))this[_0x93150f('0x186')]=0xff;else{function _0x2d2a3(){const _0x4899b0=_0x93150f;delete this[_0x4899b0('0xa1')][_0x27e75a];}}}else{if(_0x536848&&_0x536848['opacity']>0x0){if(_0x93150f('0x140')===_0x93150f('0x140'))this[_0x93150f('0x186')]=0xff;else{function _0x348a65(){const _0x123bdb=_0x93150f;_0x45ce30=!![],this[_0x123bdb('0x137')]+=_0x305a67[_0x123bdb('0xf6')][_0x123bdb('0x78')]['x'],this[_0x123bdb('0xbf')]+=_0x47e1dd[_0x123bdb('0xf6')][_0x123bdb('0x78')]['y'];}}}else this[_0x93150f('0x186')]=0x0;}},VisuMZ[_0x48d9d2('0x94')]['Sprite_Gauge_drawValue']=Sprite_Gauge[_0x48d9d2('0xd7')]['drawValue'],Sprite_Gauge[_0x48d9d2('0xd7')][_0x48d9d2('0x4c')]=function(){const _0x4eabbb=_0x48d9d2;if(this['isAggroType']())return;VisuMZ[_0x4eabbb('0x94')][_0x4eabbb('0xfc')][_0x4eabbb('0x16c')](this);};function Sprite_ProvokeTrail(){this['initialize'](...arguments);}Sprite_ProvokeTrail['prototype']=Object[_0x48d9d2('0x121')](Sprite[_0x48d9d2('0xd7')]),Sprite_ProvokeTrail['prototype'][_0x48d9d2('0x9a')]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x64')]=function(_0x3be844){const _0x169d64=_0x48d9d2;this[_0x169d64('0x135')]=_0x3be844,Sprite[_0x169d64('0xd7')][_0x169d64('0x64')][_0x169d64('0x16c')](this),this[_0x169d64('0x89')](),this[_0x169d64('0x6b')]();},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x89')]=function(){const _0x4daaea=_0x48d9d2,_0x472831=VisuMZ[_0x4daaea('0x94')][_0x4daaea('0x43')]['Provoke'];this[_0x4daaea('0x7f')]['x']=0.5,this[_0x4daaea('0x7f')]['y']=0.5,this[_0x4daaea('0x137')]=0x0,this['_homeY']=0x0,this[_0x4daaea('0x162')]=0x0,this[_0x4daaea('0x184')]=0x0,this[_0x4daaea('0x186')]=0x0,this['_opacitySpeed']=_0x472831[_0x4daaea('0x5e')],this[_0x4daaea('0x126')]=_0x472831['BlendMode'];},Sprite_ProvokeTrail['prototype'][_0x48d9d2('0x188')]=function(){const _0x2af0bf=_0x48d9d2;return VisuMZ['AggroControlSystem'][_0x2af0bf('0x43')]['Provoke'][_0x2af0bf('0x142')];},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0xcc')]=function(){const _0x1c950f=_0x48d9d2;return VisuMZ[_0x1c950f('0x94')][_0x1c950f('0x43')][_0x1c950f('0x96')]['PartsSize']/0x64;},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x6b')]=function(){const _0x234462=_0x48d9d2;this[_0x234462('0x8a')]=[];let _0x51fc84=0x0;for(let _0x100a33=0x0;_0x100a33<=this[_0x234462('0x188')]();_0x100a33++){const _0x1f1bcd=new Sprite();_0x1f1bcd[_0x234462('0x4e')]=ImageManager[_0x234462('0x16')](),_0x1f1bcd['anchor']['x']=0.5,_0x1f1bcd[_0x234462('0x7f')]['y']=0.5,_0x1f1bcd['scale']['x']=_0x1f1bcd[_0x234462('0xdf')]['y']=this[_0x234462('0xcc')](),_0x1f1bcd['opacity']=_0x51fc84,_0x1f1bcd[_0x234462('0x126')]=this['blendMode'],this['addChild'](_0x1f1bcd),this['_sprites'][_0x234462('0x2d')](_0x1f1bcd),_0x51fc84+=this[_0x234462('0x15')];if(_0x51fc84>=0xff)_0x51fc84=0x0;}},Sprite_ProvokeTrail[_0x48d9d2('0xd7')]['leftwardAnimation']=function(){const _0xf20102=_0x48d9d2;return this[_0xf20102('0x135')][_0xf20102('0x9a')]===Sprite_Actor;},Sprite_ProvokeTrail['prototype'][_0x48d9d2('0x128')]=function(){const _0x4acb00=_0x48d9d2;return SceneManager[_0x4acb00('0xf6')][_0x4acb00('0x131')][_0x4acb00('0x146')];},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x15d')]=function(){const _0x4f41a1=_0x48d9d2;Sprite[_0x4f41a1('0xd7')][_0x4f41a1('0x15d')][_0x4f41a1('0x16c')](this),this[_0x4f41a1('0x6f')](),this[_0x4f41a1('0xf2')](),this['updateOpacity'](),this[_0x4f41a1('0x111')]();},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x77')]=function(){const _0x106b2a=_0x48d9d2;return VisuMZ['AggroControlSystem']['Settings'][_0x106b2a('0x96')][_0x106b2a('0x17b')];},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x6f')]=function(){const _0x3464fb=_0x48d9d2;if(!this[_0x3464fb('0x135')][_0x3464fb('0xee')])return;if(!this[_0x3464fb('0x135')][_0x3464fb('0xee')][_0x3464fb('0x109')]())return;const _0x4d6343=this[_0x3464fb('0x135')][_0x3464fb('0xee')][_0x3464fb('0x109')]()['battler']();if(!_0x4d6343)return;const _0x517b13=this[_0x3464fb('0x135')][_0x3464fb('0xee')][_0x3464fb('0x11')](),_0x1d10b1=this[_0x3464fb('0x135')][_0x3464fb('0xee')][_0x3464fb('0x109')]()['provokeHeightOrigin']();this['_homeX']=this[_0x3464fb('0x135')]['x'],this['_homeY']=this[_0x3464fb('0x135')]['y']-this['_mainSprite'][_0x3464fb('0x172')]*_0x517b13,this[_0x3464fb('0x162')]=_0x4d6343['x'],this[_0x3464fb('0x184')]=_0x4d6343['y']-_0x4d6343[_0x3464fb('0x172')]*_0x1d10b1,this[_0x3464fb('0x137')]+=Math['round']((Graphics[_0x3464fb('0xbb')]-Graphics['boxWidth'])/0x2),this['_homeY']+=Math[_0x3464fb('0x63')]((Graphics['height']-Graphics['boxHeight'])/0x2),this[_0x3464fb('0x162')]+=Math[_0x3464fb('0x63')]((Graphics[_0x3464fb('0xbb')]-Graphics[_0x3464fb('0xdc')])/0x2),this[_0x3464fb('0x184')]+=Math['round']((Graphics[_0x3464fb('0x172')]-Graphics[_0x3464fb('0x169')])/0x2);if(!$gameSystem['isSideView']()){if(_0x4d6343[_0x3464fb('0xee')][_0x3464fb('0x2b')]())visible=!![],this['_targetX']+=SceneManager[_0x3464fb('0xf6')]['_statusWindow']['x'],this[_0x3464fb('0x184')]+=SceneManager['_scene']['_statusWindow']['y'];else{if(_0x4d6343[_0x3464fb('0xee')][_0x3464fb('0x4d')]()){if('BiToz'!==_0x3464fb('0xe8'))visible=!![],this[_0x3464fb('0x137')]+=SceneManager[_0x3464fb('0xf6')][_0x3464fb('0x78')]['x'],this['_homeY']+=SceneManager[_0x3464fb('0xf6')][_0x3464fb('0x78')]['y'];else{function _0x12b313(){const _0xe220c5=_0x3464fb;if(this['isStateAffected'](_0x267ddc)){if(this['_provoker']===_0xcd6acb)this[_0xe220c5('0x1')]();const _0x1f28c4=_0x3679fc[_0xe220c5('0x14d')](this);this[_0xe220c5('0xa1')][_0x2eae07]=_0x1f28c4,!this[_0xe220c5('0xa1')][_0x56f140]&&delete this[_0xe220c5('0xa1')][_0x122bbd];}}}}}}},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x14a')]=function(){const _0x4780bf=_0x48d9d2;return VisuMZ[_0x4780bf('0x94')][_0x4780bf('0x43')]['Provoke'][_0x4780bf('0x83')];},Sprite_ProvokeTrail['prototype'][_0x48d9d2('0xf2')]=function(){const _0x459553=_0x48d9d2;if(!this[_0x459553('0x135')][_0x459553('0xee')])return;if(!this[_0x459553('0x135')][_0x459553('0xee')][_0x459553('0x109')]())return;if(!this[_0x459553('0x8a')])return;if(this[_0x459553('0x8a')][_0x459553('0xfa')]<=0x0)return;const _0x4f578c=(this[_0x459553('0x162')]-this['_homeX'])/this[_0x459553('0x188')](),_0x494989=(this[_0x459553('0x184')]-this[_0x459553('0xbf')])/this['maxSprites']();for(let _0xda7034=0x0;_0xda7034<=this[_0x459553('0x188')]();_0xda7034++){const _0x5bda90=this[_0x459553('0x8a')][_0xda7034];if(!_0x5bda90)continue;_0x5bda90['x']=this['_homeX']+_0x4f578c*_0xda7034;const _0x29e4ef=this[_0x459553('0x188')]()-_0xda7034,_0x41211d=this[_0x459553('0x188')]()/0x2,_0x2156c9=this[_0x459553('0x14a')](),_0x15c75c=-_0x2156c9/Math[_0x459553('0x11b')](_0x41211d,0x2),_0x510711=_0x15c75c*Math[_0x459553('0x11b')](_0x29e4ef-_0x41211d,0x2)+_0x2156c9;_0x5bda90['y']=this[_0x459553('0xbf')]+_0x494989*_0xda7034-_0x510711;}},Sprite_ProvokeTrail[_0x48d9d2('0xd7')]['maxOpacity']=function(){const _0x489e54=_0x48d9d2;return VisuMZ[_0x489e54('0x94')]['Settings'][_0x489e54('0x96')][_0x489e54('0x6c')];},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x8c')]=function(){const _0xe25663=_0x48d9d2,_0x30c79e=this[_0xe25663('0x135')][_0xe25663('0xee')];if(!_0x30c79e)this['opacity']=0x0;else{if(_0x30c79e[_0xe25663('0x14')]()&&_0x30c79e[_0xe25663('0x109')]()){if(_0xe25663('0x32')==='RklfS'){function _0x429481(){const _0x1525c4=_0xe25663;return this[_0x1525c4('0xf6')]&&this[_0x1525c4('0xf6')][_0x1525c4('0x9a')]===_0xe67a9f;}}else this['opacity']=0xff;}else this['opacity']=0x0;}},Sprite_ProvokeTrail[_0x48d9d2('0xd7')][_0x48d9d2('0x111')]=function(){const _0x4be2bf=_0x48d9d2;if(!this['_mainSprite'][_0x4be2bf('0xee')])return;if(!this[_0x4be2bf('0x135')][_0x4be2bf('0xee')][_0x4be2bf('0x109')]())return;if(!this[_0x4be2bf('0x8a')])return;if(this[_0x4be2bf('0x8a')][_0x4be2bf('0xfa')]<=0x0)return;for(let _0x2e617c=0x0;_0x2e617c<=this['maxSprites']();_0x2e617c++){const _0x3f2340=this['_sprites'][this[_0x4be2bf('0x13d')]()?this[_0x4be2bf('0x188')]()-_0x2e617c:_0x2e617c];if(!_0x3f2340)continue;_0x3f2340[_0x4be2bf('0x186')]-=this[_0x4be2bf('0x15')];if(_0x3f2340[_0x4be2bf('0x186')]<=0x0)_0x3f2340[_0x4be2bf('0x186')]=0xff;}},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x97')]=Spriteset_Battle[_0x48d9d2('0xd7')]['createBattleField'],Spriteset_Battle[_0x48d9d2('0xd7')]['createBattleField']=function(){const _0xf1be66=_0x48d9d2;VisuMZ[_0xf1be66('0x94')][_0xf1be66('0x97')][_0xf1be66('0x16c')](this),this['createBattleFieldAggroControl']();},Spriteset_Battle['prototype'][_0x48d9d2('0x2f')]=function(){const _0x560f6d=_0x48d9d2;if(!Imported[_0x560f6d('0x25')])return;const _0x5a6ae2=this[_0x560f6d('0x132')]['x'],_0x197138=this['_battleField']['y'],_0x377f93=this['_battleField'][_0x560f6d('0xbb')],_0x267721=this[_0x560f6d('0x132')][_0x560f6d('0x172')];this[_0x560f6d('0x146')]=new Sprite(),this['_provokeContainer']['setFrame'](0x0,0x0,_0x377f93,_0x267721),this[_0x560f6d('0x146')]['x']=_0x5a6ae2,this[_0x560f6d('0x146')]['y']=_0x197138;if(Imported['VisuMZ_1_BattleCore']){const _0x36ffa3=this[_0x560f6d('0xb1')][_0x560f6d('0x9c')](this[_0x560f6d('0x100')]);this['addChildAt'](this['_provokeContainer'],_0x36ffa3);}else{if(_0x560f6d('0xea')===_0x560f6d('0x153')){function _0x1bdfcb(){const _0x262409=_0x560f6d,_0x40d9a6=_0x3dd27b[_0x262409('0x85')];this[_0x262409('0x171')]()[_0x262409('0x14e')](_0x40d9a6*_0x4f469f);}}else this[_0x560f6d('0x40')](this[_0x560f6d('0x146')]);}},VisuMZ['AggroControlSystem'][_0x48d9d2('0x165')]=Spriteset_Battle[_0x48d9d2('0xd7')][_0x48d9d2('0x15d')],Spriteset_Battle[_0x48d9d2('0xd7')][_0x48d9d2('0x15d')]=function(){const _0x10497e=_0x48d9d2;VisuMZ[_0x10497e('0x94')][_0x10497e('0x165')][_0x10497e('0x16c')](this),this[_0x10497e('0xc1')]();},Spriteset_Battle['prototype'][_0x48d9d2('0xc1')]=function(){const _0x3d5cb9=_0x48d9d2;if(!this[_0x3d5cb9('0x146')])return;this['_provokeContainer']['x']=this[_0x3d5cb9('0x100')]['x'],this[_0x3d5cb9('0x146')]['y']=this['_damageContainer']['y'];},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x30')]=Window_BattleEnemy[_0x48d9d2('0xd7')][_0x48d9d2('0x29')],Window_BattleEnemy['prototype'][_0x48d9d2('0x29')]=function(){const _0x13bcfc=_0x48d9d2;if(this[_0x13bcfc('0x57')]()){if('HPakT'===_0x13bcfc('0x5b')){function _0x355015(){const _0x2f34fa=_0x13bcfc;if(!_0x4fa877)return![];return _0x2306be[_0x2f34fa('0x16e')]['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);}}else{if(Imported[_0x13bcfc('0x25')]){if(_0x13bcfc('0x5f')==='yunyZ')this[_0x13bcfc('0xb8')]();else{function _0xf24e8a(){const _0x3bb3e0=_0x13bcfc;_0x5414d7[_0x3bb3e0('0x94')][_0x3bb3e0('0x165')][_0x3bb3e0('0x16c')](this),this['updateAggroControl']();}}}Window_Selectable[_0x13bcfc('0xd7')][_0x13bcfc('0x29')][_0x13bcfc('0x16c')](this);}}else this[_0x13bcfc('0x151')]()?(Imported[_0x13bcfc('0x25')]&&this['sortEnemies'](),Window_Selectable[_0x13bcfc('0xd7')][_0x13bcfc('0x29')]['call'](this)):VisuMZ[_0x13bcfc('0x94')]['Window_BattleEnemy_refresh']['call'](this);},Window_BattleEnemy[_0x48d9d2('0xd7')][_0x48d9d2('0x57')]=function(){const _0x372007=_0x48d9d2,_0x472213=BattleManager[_0x372007('0x7c')](),_0x289a29=BattleManager[_0x372007('0x173')]();if(!_0x472213)return![];if(!_0x289a29)return![];if(DataManager[_0x372007('0xe4')](_0x472213[_0x372007('0x17f')]()))return![];if(_0x289a29[_0x372007('0x15b')]())return![];if(_0x289a29[_0x372007('0xaf')]())return this[_0x372007('0x148')]=[_0x289a29[_0x372007('0x109')]()],!![];else{if(_0x372007('0x41')!==_0x372007('0x41')){function _0x1f1cc9(){const _0xe4c5fa=_0x372007,_0x4e2d9a=this[_0xe4c5fa('0x2b')]()?this[_0xe4c5fa('0x173')]()[_0xe4c5fa('0x16e')]:this['isEnemy']()?this[_0xe4c5fa('0xa6')]()['note']:'';if(_0x4e2d9a['match'](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return _0x287af8(_0x4ac4e1['$1'])*0.01;return _0x498176[_0xe4c5fa('0x94')][_0xe4c5fa('0x43')][_0xe4c5fa('0x96')][_0xe4c5fa('0x17b')];}}else return![];}},Window_BattleEnemy[_0x48d9d2('0xd7')]['applyTauntFilters']=function(){const _0x3762df=_0x48d9d2,_0x55a6c3=BattleManager[_0x3762df('0x7c')](),_0x46737d=BattleManager[_0x3762df('0x173')](),_0x4eefc9=$gameTroop;if(!_0x55a6c3)return![];if(!_0x46737d)return![];if(!_0x55a6c3[_0x3762df('0x17f')]())return![];if(DataManager[_0x3762df('0x174')](_0x55a6c3['item']()))return![];if(_0x46737d[_0x3762df('0x15c')]())return![];if(_0x55a6c3[_0x3762df('0x84')]()&&_0x4eefc9[_0x3762df('0x3f')]()['length']>0x0){if(_0x3762df('0x62')==='NGGuH'){function _0x1cd984(){const _0x35b93d=_0x3762df;this[_0x35b93d('0xc5')][_0x59b16e]=this['textColor'](_0x4cd48d(_0x3b7a58));}}else this[_0x3762df('0x148')]=_0x4eefc9['physicalTauntMembers']();}else{if(_0x55a6c3[_0x3762df('0x112')]()&&_0x4eefc9[_0x3762df('0x45')]()[_0x3762df('0xfa')]>0x0)this['_enemies']=_0x4eefc9[_0x3762df('0x45')]();else{if(_0x55a6c3[_0x3762df('0xc6')]()&&_0x4eefc9[_0x3762df('0x129')]()[_0x3762df('0xfa')]>0x0){if(_0x3762df('0xaa')===_0x3762df('0xaa'))this[_0x3762df('0x148')]=_0x4eefc9[_0x3762df('0x129')]();else{function _0x5317ee(){const _0x527603=_0x3762df;this[_0x527603('0x148')]=_0x455dea[_0x527603('0x129')]();}}}else return![];}}return!![];},VisuMZ[_0x48d9d2('0x94')]['Window_Options_addGeneralOptions']=Window_Options['prototype'][_0x48d9d2('0xb')],Window_Options['prototype'][_0x48d9d2('0xb')]=function(){const _0x51fef3=_0x48d9d2;VisuMZ[_0x51fef3('0x94')][_0x51fef3('0x110')][_0x51fef3('0x16c')](this),this['addAggroControlSystemCommands']();},Window_Options[_0x48d9d2('0xd7')][_0x48d9d2('0xc4')]=function(){const _0x332462=_0x48d9d2;if(VisuMZ[_0x332462('0x94')]['Settings'][_0x332462('0x96')][_0x332462('0x52')]){if('jiyAu'!==_0x332462('0x72')){function _0x1034e1(){const _0x51030a=_0x332462;_0x33f301[_0x51030a('0x94')]['Window_Options_addGeneralOptions'][_0x51030a('0x16c')](this),this[_0x51030a('0xc4')]();}}else this[_0x332462('0xa3')]();}VisuMZ[_0x332462('0x94')][_0x332462('0x43')][_0x332462('0x114')]['AddOption']&&this[_0x332462('0x2a')]();},Window_Options[_0x48d9d2('0xd7')]['addAggroControlSystemProvokeCommand']=function(){const _0x38e963=_0x48d9d2,_0x304993=TextManager['provokeOrigin'],_0x1dea12=_0x38e963('0x6d');this[_0x38e963('0xc')](_0x304993,_0x1dea12);},Window_Options[_0x48d9d2('0xd7')][_0x48d9d2('0x2a')]=function(){const _0x7bf308=_0x48d9d2,_0x4e0853=TextManager[_0x7bf308('0x11c')],_0xb8bc52='aggroGauge';this[_0x7bf308('0xc')](_0x4e0853,_0xb8bc52);},VisuMZ[_0x48d9d2('0x94')][_0x48d9d2('0x11d')]=Window_StatusBase[_0x48d9d2('0xd7')][_0x48d9d2('0x117')],Window_StatusBase[_0x48d9d2('0xd7')][_0x48d9d2('0x117')]=function(_0x20e9b2,_0x3f22e5,_0x27ddc3){const _0x169367=_0x48d9d2;if(this[_0x169367('0xc7')]())this[_0x169367('0x54')](_0x20e9b2[_0x169367('0x9')]());VisuMZ['AggroControlSystem'][_0x169367('0x11d')][_0x169367('0x16c')](this,_0x20e9b2,_0x3f22e5,_0x27ddc3);},Window_StatusBase[_0x48d9d2('0xd7')][_0x48d9d2('0xc7')]=function(){const _0xf3b444=_0x48d9d2;if(![Window_BattleActor,Window_BattleStatus]['includes'](this[_0xf3b444('0x9a')]))return![];if(!SceneManager[_0xf3b444('0x76')]())return![];return ConfigManager[_0xf3b444('0x11c')]&&VisuMZ[_0xf3b444('0x94')]['Settings'][_0xf3b444('0x114')][_0xf3b444('0x74')];},Window_BattleStatus[_0x48d9d2('0xd7')][_0x48d9d2('0x54')]=function(_0x1b8c85){const _0x4d04c8=_0x48d9d2,_0x36bc09=this[_0x4d04c8('0x173')](_0x1b8c85),_0x578311=this[_0x4d04c8('0xac')](_0x1b8c85),_0x365da7=this[_0x4d04c8('0xf0')](_0x1b8c85),_0x250682=_0x4d04c8('0x149')[_0x4d04c8('0xdd')](_0x36bc09[_0x4d04c8('0x18')]()),_0x3a7f7=this[_0x4d04c8('0x4f')](_0x250682,Sprite_Gauge);_0x3a7f7['x']=_0x578311,_0x3a7f7['y']=_0x365da7,_0x3a7f7[_0x4d04c8('0xbd')]=!![],_0x3a7f7[_0x4d04c8('0x9b')](_0x36bc09,'aggro'),_0x3a7f7['visible']=!![];},Window_BattleStatus[_0x48d9d2('0xd7')][_0x48d9d2('0xac')]=function(_0x52e4f6){const _0x4de702=_0x48d9d2;let _0x27b14d=this[_0x4de702('0xe6')](_0x52e4f6),_0x4e6e44=this['nameX'](_0x27b14d);if(Imported[_0x4de702('0x25')]){let _0xa27897=this[_0x4de702('0xb4')](_0x52e4f6);if(this[_0x4de702('0x163')]()===_0x4de702('0xb9')){const _0x336cb3=$dataSystem[_0x4de702('0x92')]?0x4:0x3,_0x340eb1=_0x336cb3*0x80+(_0x336cb3-0x1)*0x8+0x4,_0x3391b1=this[_0x4de702('0x173')](_0x52e4f6);let _0x2bd967=_0xa27897['x']+this[_0x4de702('0x120')];VisuMZ['BattleCore'][_0x4de702('0x43')]['BattleLayout'][_0x4de702('0xd3')]&&(_0x2bd967=_0xa27897['x']+ImageManager[_0x4de702('0x106')]+0x8),_0x4e6e44=Math[_0x4de702('0x63')](Math['min'](_0xa27897['x']+_0xa27897['width']-_0x340eb1,_0x2bd967)),_0x4e6e44-=0x4;}else _0x4e6e44=Math[_0x4de702('0x63')](_0xa27897['x']+(_0xa27897['width']-0x80)/0x2);}return _0x4e6e44;},Window_BattleStatus[_0x48d9d2('0xd7')][_0x48d9d2('0xf0')]=function(_0xfeacda){const _0x5f1e9f=_0x48d9d2,_0x437eab=this[_0x5f1e9f('0xb4')](_0xfeacda);let _0x381d05=this[_0x5f1e9f('0x60')](_0x437eab);if(Imported['VisuMZ_1_BattleCore']){if(this[_0x5f1e9f('0x163')]()===_0x5f1e9f('0xb9')){let _0xf30146=this[_0x5f1e9f('0xb4')](_0xfeacda);_0x381d05=Math[_0x5f1e9f('0x63')](_0xf30146['y']+(_0xf30146[_0x5f1e9f('0x172')]-Sprite_Name['prototype'][_0x5f1e9f('0x185')]())/0x2);}}if(this['isAtbGaugeVisible']())_0x381d05-=Sprite_Gauge[_0x5f1e9f('0xd7')][_0x5f1e9f('0x20')]()-0x1;return _0x381d05;},Window_BattleStatus[_0x48d9d2('0xd7')][_0x48d9d2('0x46')]=function(){const _0x58208a=_0x48d9d2;if(!BattleManager[_0x58208a('0x7')]())return![];if(Imported[_0x58208a('0x183')])return this['showVisualAtbGauge'](_0x58208a('0x4'));return!![];};
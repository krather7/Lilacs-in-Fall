//=============================================================================
// VisuStella MZ - Battle System - FTB - Free Turn Battle
// VisuMZ_2_BattleSystemFTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemFTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemFTB = VisuMZ.BattleSystemFTB || {};
VisuMZ.BattleSystemFTB.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [BattleSystemFTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_FTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Free Turn Battle (FTB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. During each team's turns, an action count is given to them and they
 * can freely perform actions among their teammates as wanted (or if turned off
 * by the Plugin Parameters, in a cycle). When the action count is depleted or
 * if one team ran out of battler's that can act, the other team begins their
 * turn and so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ftb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Action counts are given to each team at the start of each turn to utilize
 *   actions for.
 * * If enabled, actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System FTB to your liking through the
 *   Plugin Parameters.
 * * An Action Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
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
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
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
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * However, because of the nature of team-based battle systems, agility and
 * speed have no impact on action speeds as action speeds are now instantly
 * performed.
 * 
 * Agility, however, can influence Action Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Action Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from left-to-right for the
 * front view or right-to-left for sideview. If there are actions left, the
 * enemy team will cycle back to the first acting enemy.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * If this is enabled (it's an optional feature) and it's the player's turn,
 * the player can freely switch between actors in his/her party by pressing the
 * left/right buttons or the page up/page down buttons. The Actor Command
 * Window will automatically update to the newly selected actor. This gives the
 * player complete control and freedom over the party and the party's actions.
 * 
 * For touch controls, instead of pressing left/right or page up/page down on
 * the keyboard, click on the Battle Status Window for the target actor to be
 * selected to perform an action. The Actor Command Window will automatically
 * update to the newly selected actor.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
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
 * === General FTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <FTB Help>
 *  description
 *  description
 * </FTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under FTB.
 * - This is primarily used if the skill behaves differently in FTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to FTB.
 *
 * ---
 * 
 * === Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <FTB Action Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the FTB action cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the action cost required to
 *   perform the skill.
 *
 * ---
 *
 * <FTB Hide Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item hidden.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <FTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <FTB Actions: +x>
 * <FTB Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: FTB Action Count Visibility
 * - Determine the visibility of the FTB Action Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the FTB Action Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the FTB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Action Counts
 * 
 *   Full Name:
 *   - What is the full name of "Action Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Action Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Action Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Action Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Action Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the FTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Enable Free Switch?:
 *   - Enable free range switching between actors?
 * 
 *   Maintain Same Actor?:
 *   - Maintain the same actor after an action?
 *   - Or move onto the next available actor?
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in value
 *     if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Action Costs
 * 
 *   Skills:
 *   - What is the default action cost for skills?
 * 
 *   Items:
 *   - What is the default action cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Action Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Action Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Action Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actor Action Picture:
 *   Enemy Action Picture:
 *   Empty Action Picture:
 *   - Optional. Place an image for an actor, enemy, or empty action instead of
 *     an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
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
 * Version 1.01: March 19, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: February 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: FTB Action Count Visibility
 * @desc Determine the visibility of the FTB Action Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the FTB Action Count Display.
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
 * @param BattleSystemFTB
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
 * @desc Determines the general settings of the FTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Fight Points","ActionCountAbbr:str":"FP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the FTB Battle System.
 * @default {"Main":"","FreeChange:eval":"true","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorActionPicture:str":"","EnemyActionPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
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
 * @param ActionCounts
 * @text Action Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Action Counts" in your game?
 * @default Fight Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Action Counts" in your game?
 * @default FP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Action Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Action Icon
 * @parent Icons
 * @desc What icon is used to represent actor actions?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Action Icon
 * @parent Icons
 * @desc What icon is used to represent enemy actions?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param FreeChange:eval
 * @text Enable Free Switch?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable free range switching between actors?
 * @default true
 *
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent Main
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Maintain the same actor after an action?
 * Or move onto the next available actor?
 * @default true
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default false
 *
 * @param DefaultCost
 * @text Default Action Costs
 *
 * @param DefaultCostSkill:num
 * @text Skills
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Action Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Action Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
 * @default true
 *
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 *
 * @param ActorActionPicture:str
 * @text Actor Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor action instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

const _0x56c1=['Game_BattlerBase_hide','Game_Battler_removeBuff','actors','Game_Enemy_transform','reduceActionsFTB','ConvertParams','addLoadListener','EmptyActionsIcon','makeActionOrdersFTB','ftbHighestAgility','maxCols','_surprise','_FTB_ACTION_AGI_DEBUFF','gainCurrentActionsFTB','setItem','Window_Selectable_cursorPagedown','Game_BattlerBase_appear','updatePosition','_ftbTurnAdvantageUnit','BattleManager_setup','Game_Action_applyGlobal','Enemy','innerHeight','ftbActionPointsFull','_FTB_COST_POSITION','useItem','BattleManager_battleSys','updateStateTurnsFTB','_actionBattlers','_FTB_RECALC_SUB_DIFF','Window_Base_makeAdditionalSkillCostText','sort','changeClass','makeActionOrders','processTurn','clear','PassTurn','unshift','_phase','endAction','speed','getCurrentActionsFTB','recalculateActionsFTB','EnemyActionPicture','width','Window_Selectable_cursorRight','changeEquipById','GenerateBase','_doubleTouch','note','%1ActionPicture','Game_Battler_removeState','turnCount','clearStates','ftbEnemyActionsIcon','1299152Uoogso','keepPrevSubjectFTB','Game_Battler_useItem','commandCancelFTB','trim','initialize','applyGlobalFTB','RegExp','screenX','Show_1_Action_Cost','shift','removeActionBattlersFTB','_bypassStateTurnUpdatesFTB','_forceAction','setText','_storedBitmaps','ActionPointTraitPlus','ActionCountFull','1856059XZOFAi','addText','applyGlobal','removeState','ARRAYEVAL','_statusWindow','ScreenBufferY','makeAdditionalCostTextFTB','JSON','reduce','agility','ftbCostFormat','blt','Game_Battler_addBuff','createActionsFTB','ARRAYSTR','ftbActionPointsAbbr','Game_Battler_addState','drawActionsRemaining','total\x20agi','center','General','repositionLogWindowFTB','removeBuff','makeActions','BattleManager_finishActorInput','canInput','drawBigIcon','MaxVisible','enemies','updateVisibility','KeepPrevActor','ftbLowestAgility','onTouchSelectFTB','random','_FTB_FREE_CHANGE','hide','_passedTurnFTB','_ftbTeamOdd','StateBuffUpdate','name','_FTB_COST_SHOW_ATTACK','BattleManager_isTpb','item','processTouch','Scene_Battle_commandCancel','Game_Actor_discardEquip','21998dwaTeP','Window_Selectable_cursorLeft','_logWindow','canActorBeSelectedFTB','isItem','max','getNextSubject','releaseUnequippableItems','_maxActions','Game_Actor_forceChangeEquip','ActorActionPicture','_handlers','DefaultCostItem','ARRAYFUNC','ftbActionCount','19ykgIiQ','some','Game_Battler_performCollapse','cancel','isDrawItemNumber','min','BattleManager_makeActionOrders','Game_Actor_changeClass','fontSize','RepositionTopHelpY','Game_BattlerBase_updateStateTurns','startTurnFTB','Current','performCollapse','startBattleFTB','isFTB','Game_BattlerBase_updateBuffTurns','isActiveTpb','_FTB_ACTION_OVERFLOW','constructor','1827478PuojCp','changeEquip','cursorRight','call','ftb%1ActionsIcon','transform','SystemActionCountVisibility','initMembersFTB','prototype','payActionCostFTB','EnemyActionsIcon','Scene_Battle_commandFight','_currentActor','updateBuffTurns','Scene_Battle_createAllWindows','canDrawActionsRemaining','Game_Actor_selectNextCommand','Game_BattlerBase_canUse','hitIndex','121681opqpka','endActionFTB','_ftbCurrentUnit','padding','_FTB_MAX_ACTIONS','battleMembers','createActionCountWindowsFTB','769461NRHGkO','textSizeEx','ActionsRemainingFontSize','IconSet','playCursorSound','_FTB_COST_SHOW_0','stepBack','toLowerCase','addChildAt','active','Game_BattlerBase_clearStates','startBattle','loadPicture','iconHeight','Window_Base_drawItemNumber','getActionCostFTB','Game_System_initialize','startInputFTB','_unit','isOpen','onTurnEnd','ftbFreeRangeSwitch','selectNextCommand','length','_windowLayer','visible','clamp','ScreenBufferX','createContentsArray','_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','includes','processTouchFTB','guardSkillId','canMove','map','filter','concat','friendsUnit','Scene_Battle_createActorCommandWindow','exit','ftbEmptyActionsIcon','getMaxActionsFTB','height','textWidth','members','innerWidth','commandCancel','Mechanics','BattleManager_startBattle','setUnit','_FTB_RECALC_ADD_DIFF','cursorPageup','iconWidth','traitObjects','_FTB_ACTION_AGI_BUFF','skillCostSeparator','updatePadding','ftbActorActionsIcon','HideActionPointCost','updateTurn','initMembers','index','randomInt','isTpb','DrawHorz','passTurnFTB','Nothing','ImageGapDistance','isTurnBased','_ftbActionsMax','PictureSmoothing','_forcedBattlers','round','_actorCommandWindow','refresh','updateStateTurns','BattleManager_selectNextActor','_helpWindow','_ftbTroopActionCountWindow','GainDiff','startActorCommandSelection','status','BattleManager_startTurn','indexOf','_scene','cursorPagedown','EmptyActionPicture','match','\x5cI[%1]','startDamagePopup','Settings','isSkill','Window_Selectable_cursorPageup','1WntZCa','clearPassTurnFTB','format','windowRect','agi','_preemptive','processTurnFTB','Game_Action_speed','forceChangeEquip','Game_Battler_addDebuff','waitCount','finishActorInput','isBattleSystemFTBActionCountVisible','create','68113LlAwnD','_ftbPartyActionCountWindow','meetEndTurnConditionsFTB','highest\x20agi','endTurn','_currentActions','BattleSystemFTB','addState','addDebuff','battleEnd','aliveMembers','commandFight','Actor','checkNeedsUpdate','drawItemNumber','bind','_FTB_MIN_ACTIONS','_ftbActionsCur','ftbPartyTeamShift','battler','_partyCommandWindow','ShowCostForGuard','toUpperCase','_inBattle','discardEquip','Game_Actor_releaseUnequippableItems','BottomPosition','isSceneBattle','startInput','startActorInput','canUse','selectNextActor','ActorOffsetX','_buffs','ActionsRemainingOffsetY','initBattleSystemFTB','_context','startTurn','ActorActionsIcon','_FTB_ACTION_BASE','BattleManager_endAction','_ftbActionCountVisible','createAllWindows','isPartyCommandWindowDisabled','parse','performTurnEndFTB','ftbSwitchActorDirection','setCurrentActionsFTB','Game_Actor_changeEquip','AllowOverflow','imageSmoothingEnabled','player','drawItemNumberFTB','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_FTB_COST_SHOW_GUARD','average\x20agi','contents','description','EnemyOffsetX','battleSys','canActFTB','ftbCreateTeamSwitchText','drawImage','subject','numItems','Show_0_Action_Cost','ftbTroopTeamShift','FTB','DrawActionsRemaining','isPassingTurnFTB','IconSmoothing','createActorCommandWindowFTB','ItemQuantityFontSize','ARRAYSTRUCT','resetFontSettings','_actor','cursorLeft','GuardPass','BattleManager_isTurnBased','processSwitchActors','BattleManager_endAllBattlersTurn','_subject','PartyTeamShiftFmt','ARRAYJSON','13ZHneed','_FTB_NEUTRAL_TURN_ADVANTAGE','setup','appear','push','stepForward','FUNC','update','createActorCommandWindow','BattleManager_isActiveTpb','currentAction','ftbTotalAgility','drawPicture','ImageSize','_FTB_GUARD_PASS','enemy','ActionCountDisplay','loseCurrentActionsFTB','_FTB_KEEP_PREV_ACTOR','Game_Battler_onTurnEnd','Game_Actor_changeEquipById','Visible','getBattleSystem','isActor','clearBuffs','parameters','BattleManager_processTurn','EVAL','makeAdditionalSkillCostText','Window_Help_setItem','_ftbTeamEven'];const _0x343d=function(_0x33b604,_0x13437c){_0x33b604=_0x33b604-0xcd;let _0x56c12d=_0x56c1[_0x33b604];return _0x56c12d;};const _0x25a065=_0x343d;(function(_0x4181a1,_0xd1095f){const _0x26b628=_0x343d;while(!![]){try{const _0x47a248=parseInt(_0x26b628(0x186))*parseInt(_0x26b628(0xef))+-parseInt(_0x26b628(0x1bc))+parseInt(_0x26b628(0x195))*-parseInt(_0x26b628(0x22e))+parseInt(_0x26b628(0x1c3))+-parseInt(_0x26b628(0x1a9))+parseInt(_0x26b628(0x145))+-parseInt(_0x26b628(0x220))*-parseInt(_0x26b628(0x157));if(_0x47a248===_0xd1095f)break;else _0x4181a1['push'](_0x4181a1['shift']());}catch(_0x2730dc){_0x4181a1['push'](_0x4181a1['shift']());}}}(_0x56c1,0xec2ac));var label=_0x25a065(0x234),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x25a065(0x1e6)](function(_0xcdc93a){const _0x532890=_0x25a065;return _0xcdc93a[_0x532890(0x214)]&&_0xcdc93a[_0x532890(0xd4)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x25a065(0x21d)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0xbb94fb,_0x93c5bd){const _0x5b09fa=_0x25a065;for(const _0x33dc43 in _0x93c5bd){if(_0x33dc43['match'](/(.*):(.*)/i)){const _0xdc3d76=String(RegExp['$1']),_0x481c2c=String(RegExp['$2'])[_0x5b09fa(0x244)]()[_0x5b09fa(0x149)]();let _0x413df5,_0x4fa398,_0x499e45;switch(_0x481c2c){case'NUM':_0x413df5=_0x93c5bd[_0x33dc43]!==''?Number(_0x93c5bd[_0x33dc43]):0x0;break;case'ARRAYNUM':_0x4fa398=_0x93c5bd[_0x33dc43]!==''?JSON[_0x5b09fa(0x25a)](_0x93c5bd[_0x33dc43]):[],_0x413df5=_0x4fa398[_0x5b09fa(0x1e5)](_0x25b3f7=>Number(_0x25b3f7));break;case _0x5b09fa(0x10a):_0x413df5=_0x93c5bd[_0x33dc43]!==''?eval(_0x93c5bd[_0x33dc43]):null;break;case _0x5b09fa(0x15b):_0x4fa398=_0x93c5bd[_0x33dc43]!==''?JSON[_0x5b09fa(0x25a)](_0x93c5bd[_0x33dc43]):[],_0x413df5=_0x4fa398[_0x5b09fa(0x1e5)](_0x13199a=>eval(_0x13199a));break;case _0x5b09fa(0x15f):_0x413df5=_0x93c5bd[_0x33dc43]!==''?JSON[_0x5b09fa(0x25a)](_0x93c5bd[_0x33dc43]):'';break;case _0x5b09fa(0xee):_0x4fa398=_0x93c5bd[_0x33dc43]!==''?JSON['parse'](_0x93c5bd[_0x33dc43]):[],_0x413df5=_0x4fa398[_0x5b09fa(0x1e5)](_0x14d4c2=>JSON['parse'](_0x14d4c2));break;case _0x5b09fa(0xf5):_0x413df5=_0x93c5bd[_0x33dc43]!==''?new Function(JSON['parse'](_0x93c5bd[_0x33dc43])):new Function('return\x200');break;case _0x5b09fa(0x193):_0x4fa398=_0x93c5bd[_0x33dc43]!==''?JSON[_0x5b09fa(0x25a)](_0x93c5bd[_0x33dc43]):[],_0x413df5=_0x4fa398[_0x5b09fa(0x1e5)](_0x4196d1=>new Function(JSON['parse'](_0x4196d1)));break;case'STR':_0x413df5=_0x93c5bd[_0x33dc43]!==''?String(_0x93c5bd[_0x33dc43]):'';break;case _0x5b09fa(0x166):_0x4fa398=_0x93c5bd[_0x33dc43]!==''?JSON[_0x5b09fa(0x25a)](_0x93c5bd[_0x33dc43]):[],_0x413df5=_0x4fa398[_0x5b09fa(0x1e5)](_0x113600=>String(_0x113600));break;case'STRUCT':_0x499e45=_0x93c5bd[_0x33dc43]!==''?JSON[_0x5b09fa(0x25a)](_0x93c5bd[_0x33dc43]):{},_0x413df5=VisuMZ[_0x5b09fa(0x113)]({},_0x499e45);break;case _0x5b09fa(0xe4):_0x4fa398=_0x93c5bd[_0x33dc43]!==''?JSON[_0x5b09fa(0x25a)](_0x93c5bd[_0x33dc43]):[],_0x413df5=_0x4fa398[_0x5b09fa(0x1e5)](_0x459740=>VisuMZ[_0x5b09fa(0x113)]({},JSON[_0x5b09fa(0x25a)](_0x459740)));break;default:continue;}_0xbb94fb[_0xdc3d76]=_0x413df5;}}return _0xbb94fb;},(_0x5d0c93=>{const _0x442577=_0x25a065,_0x43ed3c=_0x5d0c93[_0x442577(0x17f)];for(const _0x1e7e12 of dependencies){if(!Imported[_0x1e7e12]){alert(_0x442577(0xd0)[_0x442577(0x222)](_0x43ed3c,_0x1e7e12)),SceneManager[_0x442577(0x1ea)]();break;}}const _0x206c54=_0x5d0c93[_0x442577(0xd4)];if(_0x206c54[_0x442577(0x21a)](/\[Version[ ](.*?)\]/i)){const _0x259621=Number(RegExp['$1']);_0x259621!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x43ed3c,_0x259621)),SceneManager[_0x442577(0x1ea)]());}if(_0x206c54[_0x442577(0x21a)](/\[Tier[ ](\d+)\]/i)){const _0x38a7fe=Number(RegExp['$1']);_0x38a7fe<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x442577(0x222)](_0x43ed3c,_0x38a7fe,tier)),SceneManager['exit']()):tier=Math[_0x442577(0x18b)](_0x38a7fe,tier);}VisuMZ[_0x442577(0x113)](VisuMZ[label][_0x442577(0x21d)],_0x5d0c93[_0x442577(0x108)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x25a065(0x17f)],_0x25a065(0x1af),_0xa8c1fd=>{const _0x35811d=_0x25a065;VisuMZ[_0x35811d(0x113)](_0xa8c1fd,_0xa8c1fd);const _0x523a58=_0xa8c1fd[_0x35811d(0x104)];$gameSystem['setBattleSystemFTBActionCountVisible'](_0x523a58);}),VisuMZ['BattleSystemFTB']['RegExp']={'ActionPointCost':/<FTB (?:FP|ACTION) COST:[ ](\d+)>/i,'HideActionPointCost':/<FTB HIDE (?:FP|ACTION) COST>/i,'PassTurn':/<FTB PASS TURN>/i,'ActionPointTraitPlus':/<FTB (?:FP|ACTION|ACTIONS):[ ]([\+\-]\d+)>/i},DataManager[_0x25a065(0x1d2)]=function(_0x50c874){const _0x54135c=_0x25a065;if(!_0x50c874)return 0x0;const _0xae88a0=VisuMZ[_0x54135c(0x234)][_0x54135c(0x21d)][_0x54135c(0x1f2)],_0x1e4a3c=VisuMZ[_0x54135c(0x234)][_0x54135c(0x14c)],_0x556db6=_0x50c874['note'];if(_0x556db6[_0x54135c(0x21a)](_0x1e4a3c['ActionPointCost']))return Number(RegExp['$1']);else{if(DataManager['isSkill'](_0x50c874))return _0xae88a0['DefaultCostSkill'];else return DataManager[_0x54135c(0x18a)](_0x50c874)?_0xae88a0[_0x54135c(0x192)]:0x0;}},ImageManager[_0x25a065(0x1fc)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x16c)][_0x25a065(0x254)],ImageManager[_0x25a065(0x144)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)]['General'][_0x25a065(0x1b3)],ImageManager[_0x25a065(0x1eb)]=VisuMZ[_0x25a065(0x234)]['Settings'][_0x25a065(0x16c)][_0x25a065(0x115)],TextManager[_0x25a065(0x125)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x16c)][_0x25a065(0x156)],TextManager[_0x25a065(0x167)]=VisuMZ[_0x25a065(0x234)]['Settings'][_0x25a065(0x16c)]['ActionCountAbbr'],TextManager[_0x25a065(0x162)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x16c)]['ActionCountCostFmt'],TextManager[_0x25a065(0x240)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)]['General'][_0x25a065(0xed)],TextManager[_0x25a065(0xdd)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x16c)]['TroopTeamShiftFmt'],SceneManager[_0x25a065(0x249)]=function(){const _0x1d7af4=_0x25a065;return this[_0x1d7af4(0x217)]&&this[_0x1d7af4(0x217)]['constructor']===Scene_Battle;},BattleManager[_0x25a065(0x17a)]=VisuMZ[_0x25a065(0x234)]['Settings'][_0x25a065(0x1f2)]['FreeChange'],BattleManager['_FTB_KEEP_PREV_ACTOR']=VisuMZ['BattleSystemFTB'][_0x25a065(0x21d)][_0x25a065(0x1f2)][_0x25a065(0x176)],BattleManager[_0x25a065(0xfd)]=VisuMZ['BattleSystemFTB'][_0x25a065(0x21d)][_0x25a065(0x1f2)][_0x25a065(0xe8)],BattleManager[_0x25a065(0x1f5)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x1f2)][_0x25a065(0x212)],BattleManager['_FTB_RECALC_SUB_DIFF']=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x1f2)]['LoseDiff'],BattleManager[_0x25a065(0xf0)]=VisuMZ['BattleSystemFTB']['Settings'][_0x25a065(0x1f2)]['NeutralAdvantage'],BattleManager['_FTB_BETWEEN_TEAMS_WAIT']=VisuMZ['BattleSystemFTB'][_0x25a065(0x21d)][_0x25a065(0x16c)]['TeamShiftWait'],BattleManager[_0x25a065(0x1e0)]=VisuMZ['BattleSystemFTB']['Settings'][_0x25a065(0x1f2)][_0x25a065(0x17e)],VisuMZ['BattleSystemFTB'][_0x25a065(0x128)]=BattleManager[_0x25a065(0xd6)],BattleManager[_0x25a065(0xd6)]=function(){const _0x133564=_0x25a065;if(this[_0x133564(0x1a4)]())return _0x133564(0xde);return VisuMZ['BattleSystemFTB']['BattleManager_battleSys']['call'](this);},BattleManager[_0x25a065(0x1a4)]=function(){const _0x5a78a2=_0x25a065;return $gameSystem[_0x5a78a2(0x105)]()==='FTB';},VisuMZ[_0x25a065(0x234)]['BattleManager_isTpb']=BattleManager['isTpb'],BattleManager[_0x25a065(0x202)]=function(){const _0x117f96=_0x25a065;if(this[_0x117f96(0x1a4)]())return![];return VisuMZ['BattleSystemFTB'][_0x117f96(0x181)]['call'](this);},VisuMZ[_0x25a065(0x234)]['BattleManager_isActiveTpb']=BattleManager['isActiveTpb'],BattleManager[_0x25a065(0x1a6)]=function(){const _0x2a4e9a=_0x25a065;if(this[_0x2a4e9a(0x1a4)]())return![];return VisuMZ['BattleSystemFTB'][_0x2a4e9a(0xf8)][_0x2a4e9a(0x1ac)](this);},VisuMZ[_0x25a065(0x234)][_0x25a065(0xe9)]=BattleManager[_0x25a065(0x207)],BattleManager['isTurnBased']=function(){const _0x26e9d1=_0x25a065;if(this[_0x26e9d1(0x1a4)]())return!![];return VisuMZ[_0x26e9d1(0x234)][_0x26e9d1(0xe9)][_0x26e9d1(0x1ac)](this);},VisuMZ[_0x25a065(0x234)]['BattleManager_startInput']=BattleManager[_0x25a065(0x24a)],BattleManager[_0x25a065(0x24a)]=function(){const _0x2255fd=_0x25a065;if(this[_0x2255fd(0x1a4)]())this[_0x2255fd(0x119)]=![];VisuMZ['BattleSystemFTB']['BattleManager_startInput'][_0x2255fd(0x1ac)](this);if(this[_0x2255fd(0x1a4)]()&&$gameParty[_0x2255fd(0x171)]())this[_0x2255fd(0x1d4)]();},BattleManager[_0x25a065(0x1d4)]=function(){this['startTurn']();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x109)]=BattleManager[_0x25a065(0x130)],BattleManager[_0x25a065(0x130)]=function(){const _0x5f024c=_0x25a065;this[_0x5f024c(0x1a4)]()?this[_0x5f024c(0x226)]():VisuMZ[_0x5f024c(0x234)][_0x5f024c(0x109)]['call'](this);},BattleManager[_0x25a065(0x226)]=function(){const _0x4ced23=_0x25a065,_0x3fb796=this[_0x4ced23(0xec)];if(_0x3fb796&&!_0x3fb796[_0x4ced23(0x1e8)]()['canActFTB']())this[_0x4ced23(0x135)](),this[_0x4ced23(0xec)]=null,this[_0x4ced23(0x1fe)](![]);else{if(_0x3fb796&&_0x3fb796[_0x4ced23(0x106)]()&&_0x3fb796[_0x4ced23(0x171)]()){const _0x3e2ceb=_0x3fb796[_0x4ced23(0xf9)]();if(!_0x3e2ceb)VisuMZ[_0x4ced23(0x234)]['BattleManager_processTurn'][_0x4ced23(0x1ac)](this);else _0x3e2ceb[_0x4ced23(0x152)]?VisuMZ[_0x4ced23(0x234)]['BattleManager_processTurn'][_0x4ced23(0x1ac)](this):(this[_0x4ced23(0x1b5)]=_0x3fb796,this[_0x4ced23(0x24b)]());}else VisuMZ[_0x4ced23(0x234)][_0x4ced23(0x109)][_0x4ced23(0x1ac)](this);}},VisuMZ['BattleSystemFTB'][_0x25a065(0x170)]=BattleManager[_0x25a065(0x22b)],BattleManager[_0x25a065(0x22b)]=function(){const _0x1de326=_0x25a065;this['isFTB']()?VisuMZ[_0x1de326(0x234)][_0x1de326(0x109)][_0x1de326(0x1ac)](this):VisuMZ[_0x1de326(0x234)]['BattleManager_finishActorInput'][_0x1de326(0x1ac)](this);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x20f)]=BattleManager[_0x25a065(0x24d)],BattleManager[_0x25a065(0x24d)]=function(){const _0x1e5af9=_0x25a065;this[_0x1e5af9(0x1a4)]()?this['selectNextActorFTB']():VisuMZ['BattleSystemFTB'][_0x1e5af9(0x20f)]['call'](this);},BattleManager['selectNextActorFTB']=function(){this['_currentActor']=null,this['_inputting']=![];},VisuMZ[_0x25a065(0x234)][_0x25a065(0x256)]=BattleManager[_0x25a065(0x135)],BattleManager['endAction']=function(){const _0x21451b=_0x25a065,_0x5d87b4=this[_0x21451b(0xec)];VisuMZ[_0x21451b(0x234)][_0x21451b(0x256)][_0x21451b(0x1ac)](this),this[_0x21451b(0x1bd)](_0x5d87b4);},BattleManager['endActionFTB']=function(_0x1398ea){const _0x28aced=_0x25a065;if(!this[_0x28aced(0x1a4)]())return;_0x1398ea&&_0x1398ea['makeActions']();if(this[_0x28aced(0x20a)][_0x28aced(0x1da)]>0x0)this['_subject']&&(!this['_actionBattlers'][_0x28aced(0x1e1)](this[_0x28aced(0xec)])&&this[_0x28aced(0x12a)][_0x28aced(0x133)](this['_subject'])),this[_0x28aced(0xec)]=this[_0x28aced(0x18c)]();else this[_0x28aced(0x146)](_0x1398ea)&&(this['_subject']=_0x1398ea);},BattleManager[_0x25a065(0x146)]=function(_0x42ff52){const _0x502e5a=_0x25a065;if(!_0x42ff52)return![];if(!_0x42ff52['isActor']())return![];if(!_0x42ff52[_0x502e5a(0x1e4)]())return![];if(!_0x42ff52[_0x502e5a(0x171)]())return![];if(_0x42ff52['isPassingTurnFTB']())return![];return BattleManager[_0x502e5a(0x17a)]&&BattleManager[_0x502e5a(0x101)];},VisuMZ[_0x25a065(0x234)]['BattleManager_startBattle']=BattleManager['startBattle'],BattleManager[_0x25a065(0x1ce)]=function(){const _0x483264=_0x25a065;VisuMZ[_0x483264(0x234)][_0x483264(0x1f3)]['call'](this),this[_0x483264(0x1a3)]();},BattleManager['startBattleFTB']=function(){const _0x7e4a9a=_0x25a065;if(!this[_0x7e4a9a(0x1a4)]())return;if(this[_0x7e4a9a(0x225)])this[_0x7e4a9a(0x120)]=_0x7e4a9a(0x110);else this['_surprise']?this[_0x7e4a9a(0x120)]=_0x7e4a9a(0x174):this[_0x7e4a9a(0x120)]=BattleManager[_0x7e4a9a(0xf0)];this['_ftbTurnAdvantageUnit']=this[_0x7e4a9a(0x120)]||_0x7e4a9a(0x179);let _0x29e469=0x0,_0x15c66c=0x0;switch(this['_ftbTurnAdvantageUnit'][_0x7e4a9a(0x1ca)]()[_0x7e4a9a(0x149)]()){case _0x7e4a9a(0x179):let _0x55ca76=[_0x7e4a9a(0x110),_0x7e4a9a(0x174)];this[_0x7e4a9a(0x120)]=_0x55ca76[Math[_0x7e4a9a(0x201)](_0x55ca76[_0x7e4a9a(0x1da)])];break;case _0x7e4a9a(0xce):this['_ftbTurnAdvantageUnit']=_0x7e4a9a(0x110);break;case _0x7e4a9a(0xfe):this[_0x7e4a9a(0x120)]=_0x7e4a9a(0x174);break;case'lowest\x20agi':_0x29e469=$gameParty[_0x7e4a9a(0x177)](),_0x15c66c=$gameTroop[_0x7e4a9a(0x177)](),this['_ftbTurnAdvantageUnit']=_0x29e469>=_0x15c66c?_0x7e4a9a(0x110):_0x7e4a9a(0x174);break;case _0x7e4a9a(0xd2):_0x29e469=$gameParty[_0x7e4a9a(0x161)](),_0x15c66c=$gameTroop[_0x7e4a9a(0x161)](),this['_ftbTurnAdvantageUnit']=_0x29e469>=_0x15c66c?_0x7e4a9a(0x110):_0x7e4a9a(0x174);break;case _0x7e4a9a(0x231):_0x29e469=$gameParty[_0x7e4a9a(0x117)](),_0x15c66c=$gameTroop[_0x7e4a9a(0x117)](),this[_0x7e4a9a(0x120)]=_0x29e469>=_0x15c66c?'actors':'enemies';break;case _0x7e4a9a(0x16a):_0x29e469=$gameParty[_0x7e4a9a(0xfa)](),_0x15c66c=$gameTroop[_0x7e4a9a(0xfa)](),this[_0x7e4a9a(0x120)]=_0x29e469>=_0x15c66c?_0x7e4a9a(0x110):_0x7e4a9a(0x174);break;}this['_ftbTeamOdd']=this[_0x7e4a9a(0x120)]===_0x7e4a9a(0x110)?$gameParty:$gameTroop,this['_ftbTeamEven']=this[_0x7e4a9a(0x120)]===_0x7e4a9a(0x110)?$gameTroop:$gameParty;},VisuMZ['BattleSystemFTB'][_0x25a065(0x19b)]=BattleManager['makeActionOrders'],BattleManager[_0x25a065(0x12f)]=function(){const _0x2547a4=_0x25a065;this[_0x2547a4(0x1a4)]()?this[_0x2547a4(0x116)]():VisuMZ[_0x2547a4(0x234)]['BattleManager_makeActionOrders']['call'](this);},BattleManager[_0x25a065(0x116)]=function(){const _0xe5c078=_0x25a065;let _0x267077=[],_0x1ebcf4=[],_0x102983=0x0;const _0x47fb85=$gameTroop[_0xe5c078(0x142)]();let _0x99879c=_0x47fb85%0x2===0x0?this['_ftbTeamEven']:this[_0xe5c078(0x17d)];this[_0xe5c078(0x1be)]=_0x99879c;if(_0x99879c===$gameParty){let _0x4f8329=$gameParty[_0xe5c078(0x238)]()[_0xe5c078(0x1e6)](_0x28c3ce=>_0x28c3ce['canMove']()&&!_0x28c3ce[_0xe5c078(0x171)]()),_0x585540=$gameParty[_0xe5c078(0x238)]()[_0xe5c078(0x1e6)](_0x2a15d3=>_0x2a15d3[_0xe5c078(0x1e4)]()&&_0x2a15d3[_0xe5c078(0x171)]());_0x267077=_0x267077[_0xe5c078(0x1e7)](_0x4f8329),_0x102983=Game_Unit[_0xe5c078(0x1c0)];while(_0x102983--){_0x267077=_0x267077[_0xe5c078(0x1e7)](_0x585540);}_0x102983=Game_Unit[_0xe5c078(0x1c0)]-0x1;while(_0x102983--){_0x267077=_0x267077['concat'](_0x4f8329);}}if(_0x99879c===$gameTroop){let _0x49bca3=$gameTroop[_0xe5c078(0x238)]()[_0xe5c078(0x1e6)](_0x512e3f=>_0x512e3f[_0xe5c078(0x1e4)]());$gameSystem['isSideView']()?_0x49bca3[_0xe5c078(0x12d)]((_0x2bc8f2,_0xef70d2)=>_0xef70d2[_0xe5c078(0x14d)]()-_0x2bc8f2[_0xe5c078(0x14d)]()):_0x49bca3['sort']((_0x9043bb,_0x4f2b32)=>_0x9043bb[_0xe5c078(0x14d)]()-_0x4f2b32[_0xe5c078(0x14d)]());_0x102983=Game_Unit[_0xe5c078(0x1c0)];while(_0x102983--){_0x1ebcf4=_0x1ebcf4['concat'](_0x49bca3);}$gameTroop[_0xe5c078(0x16f)]();}this['_actionBattlers']=_0x267077['concat'](_0x1ebcf4);},BattleManager[_0x25a065(0x150)]=function(){const _0x4a524c=_0x25a065;if(!this[_0x4a524c(0x1a4)]())return;this[_0x4a524c(0x12a)]=this[_0x4a524c(0x12a)]||[],this[_0x4a524c(0x12a)]=this[_0x4a524c(0x12a)]['filter'](_0x23db82=>_0x23db82[_0x4a524c(0x1e4)]()&&!_0x23db82[_0x4a524c(0xe0)]());},VisuMZ['BattleSystemFTB'][_0x25a065(0x121)]=BattleManager[_0x25a065(0xf1)],BattleManager['setup']=function(_0x2c6302,_0x236cac,_0x202ef3){const _0x1e30c0=_0x25a065;VisuMZ[_0x1e30c0(0x234)][_0x1e30c0(0x121)][_0x1e30c0(0x1ac)](this,_0x2c6302,_0x236cac,_0x202ef3),this[_0x1e30c0(0x1b0)]();},BattleManager[_0x25a065(0x1b0)]=function(){const _0x3a0bc3=_0x25a065;if(!BattleManager['isFTB']())return;this['_ftbCurrentUnit']=undefined,$gameParty[_0x3a0bc3(0x1a0)](),$gameTroop[_0x3a0bc3(0x1a0)]();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x215)]=BattleManager[_0x25a065(0x253)],BattleManager[_0x25a065(0x253)]=function(){const _0x14400f=_0x25a065;this[_0x14400f(0x1a0)](),VisuMZ[_0x14400f(0x234)]['BattleManager_startTurn']['call'](this),this[_0x14400f(0xd8)]();},BattleManager['startTurnFTB']=function(){const _0x52db40=_0x25a065;if(!BattleManager[_0x52db40(0x1a4)]())return;$gameParty['clearPassTurnFTB'](),$gameTroop[_0x52db40(0x221)]();const _0xb1badb=$gameTroop[_0x52db40(0x142)]()+0x1;let _0xf0ed59=_0xb1badb%0x2===0x0?this[_0x52db40(0x10d)]:this[_0x52db40(0x17d)],_0x5b5ade=_0xb1badb%0x2===0x0?this['_ftbTeamOdd']:this[_0x52db40(0x10d)];_0xb1badb>0x1&&_0x5b5ade[_0x52db40(0x25b)](),_0xf0ed59[_0x52db40(0x129)](),_0xf0ed59[_0x52db40(0x1a0)]();},VisuMZ['BattleSystemFTB']['BattleManager_endTurn']=BattleManager[_0x25a065(0x232)],BattleManager[_0x25a065(0x232)]=function(){const _0x128599=_0x25a065;VisuMZ[_0x128599(0x234)]['BattleManager_endTurn'][_0x128599(0x1ac)](this),this['endTurnFTB']();},BattleManager['endTurnFTB']=function(){if(!BattleManager['isFTB']())return;},VisuMZ['BattleSystemFTB'][_0x25a065(0xeb)]=BattleManager['endAllBattlersTurn'],BattleManager['endAllBattlersTurn']=function(){const _0x2244e1=_0x25a065;if(this[_0x2244e1(0x1a4)]())return;VisuMZ[_0x2244e1(0x234)][_0x2244e1(0xeb)][_0x2244e1(0x1ac)](this);},BattleManager[_0x25a065(0xd8)]=function(){const _0xdd5acf=_0x25a065;if(!BattleManager[_0xdd5acf(0x1a4)]())return;let _0x195bc0='';if(this[_0xdd5acf(0x1be)]===$gameParty){let _0x162852=$gameParty[_0xdd5acf(0x17f)]();_0x195bc0=TextManager[_0xdd5acf(0x240)]['format'](_0x162852);}else _0x195bc0=TextManager[_0xdd5acf(0xdd)];if(_0x195bc0!==''){this[_0xdd5acf(0x188)]['push'](_0xdd5acf(0x158),_0x195bc0);const _0x13ee95=BattleManager['_FTB_BETWEEN_TEAMS_WAIT'];this[_0xdd5acf(0x188)][_0xdd5acf(0xf3)](_0xdd5acf(0x22a),_0x13ee95),this['_logWindow']['push'](_0xdd5acf(0x131));}},VisuMZ['BattleSystemFTB'][_0x25a065(0x1d3)]=Game_System[_0x25a065(0x1b1)][_0x25a065(0x14a)],Game_System[_0x25a065(0x1b1)][_0x25a065(0x14a)]=function(){const _0x49f595=_0x25a065;VisuMZ[_0x49f595(0x234)]['Game_System_initialize'][_0x49f595(0x1ac)](this),this[_0x49f595(0x251)]();},Game_System['prototype'][_0x25a065(0x251)]=function(){const _0xd86d81=_0x25a065;this[_0xd86d81(0x257)]=!![];},Game_System[_0x25a065(0x1b1)][_0x25a065(0x22c)]=function(){const _0x287b45=_0x25a065;if(BattleManager[_0x287b45(0x134)]===_0x287b45(0x237))return![];return this['_ftbActionCountVisible']===undefined&&this[_0x287b45(0x251)](),this[_0x287b45(0x257)];},Game_System[_0x25a065(0x1b1)]['setBattleSystemFTBActionCountVisible']=function(_0x4c5cd7){const _0x1edcf7=_0x25a065;this[_0x1edcf7(0x257)]===undefined&&this[_0x1edcf7(0x251)](),this[_0x1edcf7(0x257)]=_0x4c5cd7;},VisuMZ[_0x25a065(0x234)][_0x25a065(0x227)]=Game_Action[_0x25a065(0x1b1)][_0x25a065(0x136)],Game_Action[_0x25a065(0x1b1)][_0x25a065(0x136)]=function(){const _0x54adef=_0x25a065;return BattleManager[_0x54adef(0x1a4)]()?0x0:VisuMZ[_0x54adef(0x234)][_0x54adef(0x227)]['call'](this);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x122)]=Game_Action[_0x25a065(0x1b1)][_0x25a065(0x159)],Game_Action['prototype']['applyGlobal']=function(){const _0x1ae77b=_0x25a065;VisuMZ[_0x1ae77b(0x234)]['Game_Action_applyGlobal']['call'](this),this[_0x1ae77b(0x14b)]();},Game_Action['prototype'][_0x25a065(0x14b)]=function(){const _0x54164d=_0x25a065;if(!BattleManager['isFTB']())return;if(!this[_0x54164d(0xda)]())return;if(!this[_0x54164d(0x182)]())return;this[_0x54164d(0x21e)]()&&this[_0x54164d(0x182)]()['id']===this[_0x54164d(0xda)]()[_0x54164d(0x1e3)]()&&(BattleManager[_0x54164d(0xfd)]&&this[_0x54164d(0xda)]()[_0x54164d(0x204)]());const _0x47ef54=VisuMZ['BattleSystemFTB'][_0x54164d(0x14c)],_0xe7dc81=this['item']()['note'];_0xe7dc81[_0x54164d(0x21a)](_0x47ef54[_0x54164d(0x132)])&&this[_0x54164d(0xda)]()['passTurnFTB']();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x10e)]=Game_BattlerBase[_0x25a065(0x1b1)][_0x25a065(0x17b)],Game_BattlerBase[_0x25a065(0x1b1)][_0x25a065(0x17b)]=function(){const _0x56e402=_0x25a065;VisuMZ[_0x56e402(0x234)][_0x56e402(0x10e)][_0x56e402(0x1ac)](this),BattleManager['removeActionBattlersFTB'](),this[_0x56e402(0x1e8)]()['recalculateActionsFTB']();},VisuMZ['BattleSystemFTB'][_0x25a065(0x11e)]=Game_BattlerBase[_0x25a065(0x1b1)][_0x25a065(0xf2)],Game_BattlerBase[_0x25a065(0x1b1)][_0x25a065(0xf2)]=function(){const _0x14d492=_0x25a065;VisuMZ[_0x14d492(0x234)][_0x14d492(0x11e)][_0x14d492(0x1ac)](this),BattleManager[_0x14d492(0x150)](),this['friendsUnit']()['recalculateActionsFTB']();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x197)]=Game_Battler[_0x25a065(0x1b1)][_0x25a065(0x1a2)],Game_Battler['prototype'][_0x25a065(0x1a2)]=function(){const _0x81c68f=_0x25a065;VisuMZ[_0x81c68f(0x234)][_0x81c68f(0x197)]['call'](this),BattleManager[_0x81c68f(0x150)](),this[_0x81c68f(0x1e8)]()['recalculateActionsFTB']();},Game_BattlerBase['prototype']['passTurnFTB']=function(){const _0x1695d6=_0x25a065;this[_0x1695d6(0x17c)]=!![],BattleManager[_0x1695d6(0x150)]();},Game_BattlerBase[_0x25a065(0x1b1)][_0x25a065(0xe0)]=function(){const _0x37261f=_0x25a065;return!!this[_0x37261f(0x17c)];},Game_BattlerBase['_FTB_ACTION_BASE']=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)]['Mechanics'][_0x25a065(0x13d)],Game_BattlerBase[_0x25a065(0x1f9)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x1f2)]['AgiBuff'],Game_BattlerBase['_FTB_ACTION_AGI_DEBUFF']=VisuMZ[_0x25a065(0x234)]['Settings'][_0x25a065(0x1f2)]['AgiDebuff'],Game_BattlerBase['prototype'][_0x25a065(0x194)]=function(){const _0x5bac39=_0x25a065;let _0x35c5b9=Game_BattlerBase[_0x5bac39(0x255)];if(this['_buffs']===undefined)this[_0x5bac39(0x107)]();const _0x2a0707=this[_0x5bac39(0x24f)][0x6]||0x0;if(_0x2a0707>0x0&&Game_BattlerBase['_FTB_ACTION_AGI_BUFF'])_0x35c5b9+=_0x2a0707;else _0x2a0707<0x0&&Game_BattlerBase[_0x5bac39(0x11a)]&&(_0x35c5b9+=_0x2a0707);const _0x56c588=VisuMZ[_0x5bac39(0x234)][_0x5bac39(0x14c)],_0x52fa71=this[_0x5bac39(0x1f8)]();for(const _0x2b6caa of _0x52fa71){if(!_0x2b6caa)continue;const _0x340984=_0x2b6caa[_0x5bac39(0x13f)];_0x340984[_0x5bac39(0x21a)](_0x56c588[_0x5bac39(0x155)])&&(_0x35c5b9+=Number(RegExp['$1']));}return Math[_0x5bac39(0x18b)](0x0,_0x35c5b9);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x1cd)]=Game_BattlerBase['prototype'][_0x25a065(0x143)],Game_BattlerBase['prototype']['clearStates']=function(){const _0x42d45c=_0x25a065;VisuMZ[_0x42d45c(0x234)]['Game_BattlerBase_clearStates']['call'](this),this[_0x42d45c(0x1e8)]()[_0x42d45c(0x138)]();},VisuMZ[_0x25a065(0x234)]['Game_BattlerBase_canUse']=Game_BattlerBase['prototype']['canUse'],Game_BattlerBase[_0x25a065(0x1b1)][_0x25a065(0x24c)]=function(_0x44db7c){const _0x4a9edc=_0x25a065;if(BattleManager[_0x4a9edc(0x1a4)]()){const _0x3163d7=DataManager[_0x4a9edc(0x1d2)](_0x44db7c);if(_0x3163d7>this[_0x4a9edc(0x1e8)]()[_0x4a9edc(0x137)]())return![];}return VisuMZ['BattleSystemFTB'][_0x4a9edc(0x1ba)]['call'](this,_0x44db7c);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x147)]=Game_Battler[_0x25a065(0x1b1)][_0x25a065(0x127)],Game_Battler[_0x25a065(0x1b1)][_0x25a065(0x127)]=function(_0x2ea7c7){const _0x3436a1=_0x25a065;VisuMZ[_0x3436a1(0x234)][_0x3436a1(0x147)][_0x3436a1(0x1ac)](this,_0x2ea7c7),this[_0x3436a1(0x1b2)](_0x2ea7c7);},Game_Battler[_0x25a065(0x1b1)][_0x25a065(0x1b2)]=function(_0x17ba28){const _0xc60ace=_0x25a065;if(!_0x17ba28)return;if(!SceneManager[_0xc60ace(0x249)]())return;if(!BattleManager['isFTB']())return;const _0x568479=BattleManager['_action'];if(_0x568479&&_0x568479[_0xc60ace(0x152)])return;const _0x3d6a1c=DataManager[_0xc60ace(0x1d2)](_0x17ba28);this['friendsUnit']()[_0xc60ace(0x112)](_0x3d6a1c);},VisuMZ['BattleSystemFTB'][_0x25a065(0x102)]=Game_Battler[_0x25a065(0x1b1)][_0x25a065(0x1d7)],Game_Battler['prototype'][_0x25a065(0x1d7)]=function(){const _0x79b718=_0x25a065;this[_0x79b718(0x151)]=BattleManager['isFTB']()&&BattleManager[_0x79b718(0x1e0)],VisuMZ[_0x79b718(0x234)][_0x79b718(0x102)][_0x79b718(0x1ac)](this),delete this[_0x79b718(0x151)];},VisuMZ[_0x25a065(0x234)][_0x25a065(0x19f)]=Game_BattlerBase['prototype']['updateStateTurns'],Game_BattlerBase[_0x25a065(0x1b1)]['updateStateTurns']=function(){const _0x1166fc=_0x25a065;if(this[_0x1166fc(0x151)])return;VisuMZ[_0x1166fc(0x234)][_0x1166fc(0x19f)][_0x1166fc(0x1ac)](this);},VisuMZ[_0x25a065(0x234)]['Game_BattlerBase_updateBuffTurns']=Game_BattlerBase['prototype'][_0x25a065(0x1b6)],Game_BattlerBase[_0x25a065(0x1b1)]['updateBuffTurns']=function(){const _0x1a6759=_0x25a065;if(this[_0x1a6759(0x151)])return;VisuMZ[_0x1a6759(0x234)][_0x1a6759(0x1a5)][_0x1a6759(0x1ac)](this);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x168)]=Game_Battler[_0x25a065(0x1b1)][_0x25a065(0x235)],Game_Battler['prototype']['addState']=function(_0x3c4720){const _0x41621d=_0x25a065;VisuMZ[_0x41621d(0x234)]['Game_Battler_addState'][_0x41621d(0x1ac)](this,_0x3c4720),this[_0x41621d(0x1e8)]()[_0x41621d(0x138)]();},VisuMZ['BattleSystemFTB']['Game_Battler_removeState']=Game_Battler[_0x25a065(0x1b1)]['removeState'],Game_Battler[_0x25a065(0x1b1)][_0x25a065(0x15a)]=function(_0x5d19cf){const _0x2f20cf=_0x25a065;VisuMZ['BattleSystemFTB'][_0x2f20cf(0x141)][_0x2f20cf(0x1ac)](this,_0x5d19cf),this['friendsUnit']()[_0x2f20cf(0x138)]();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x164)]=Game_Battler[_0x25a065(0x1b1)]['addBuff'],Game_Battler[_0x25a065(0x1b1)]['addBuff']=function(_0x301a14,_0x581bcc){const _0xcd4a5=_0x25a065;VisuMZ[_0xcd4a5(0x234)][_0xcd4a5(0x164)][_0xcd4a5(0x1ac)](this,_0x301a14,_0x581bcc),this[_0xcd4a5(0x1e8)]()['recalculateActionsFTB']();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x229)]=Game_Battler[_0x25a065(0x1b1)]['addDebuff'],Game_Battler['prototype'][_0x25a065(0x236)]=function(_0x4f1eab,_0x5672bd){const _0x569c13=_0x25a065;VisuMZ[_0x569c13(0x234)][_0x569c13(0x229)][_0x569c13(0x1ac)](this,_0x4f1eab,_0x5672bd),this[_0x569c13(0x1e8)]()[_0x569c13(0x138)]();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x10f)]=Game_Battler['prototype'][_0x25a065(0x16e)],Game_Battler['prototype']['removeBuff']=function(_0x263ae5){const _0x2c52fc=_0x25a065;VisuMZ[_0x2c52fc(0x234)][_0x2c52fc(0x10f)][_0x2c52fc(0x1ac)](this,_0x263ae5),this[_0x2c52fc(0x1e8)]()[_0x2c52fc(0x138)]();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x1b9)]=Game_Actor[_0x25a065(0x1b1)]['selectNextCommand'],Game_Actor['prototype'][_0x25a065(0x1d9)]=function(){const _0x2641e9=_0x25a065;if(BattleManager[_0x2641e9(0x1a4)]()){if(this['battler']())this[_0x2641e9(0x241)]()[_0x2641e9(0xf4)]();return![];}return VisuMZ['BattleSystemFTB']['Game_Actor_selectNextCommand'][_0x2641e9(0x1ac)](this);},VisuMZ['BattleSystemFTB'][_0x25a065(0x25e)]=Game_Actor[_0x25a065(0x1b1)][_0x25a065(0x1aa)],Game_Actor[_0x25a065(0x1b1)][_0x25a065(0x1aa)]=function(_0x29c050,_0x44a044){const _0x501317=_0x25a065;VisuMZ[_0x501317(0x234)][_0x501317(0x25e)][_0x501317(0x1ac)](this,_0x29c050,_0x44a044),this[_0x501317(0x1e8)]()[_0x501317(0x138)]();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x18f)]=Game_Actor['prototype'][_0x25a065(0x228)],Game_Actor[_0x25a065(0x1b1)][_0x25a065(0x228)]=function(_0x579525,_0x230a4f){const _0x50abd1=_0x25a065;VisuMZ['BattleSystemFTB'][_0x50abd1(0x18f)][_0x50abd1(0x1ac)](this,_0x579525,_0x230a4f),this[_0x50abd1(0x1e8)]()[_0x50abd1(0x138)]();},VisuMZ['BattleSystemFTB'][_0x25a065(0x103)]=Game_Actor[_0x25a065(0x1b1)]['changeEquipById'],Game_Actor[_0x25a065(0x1b1)][_0x25a065(0x13c)]=function(_0x37711,_0x46c0be){const _0x2da11d=_0x25a065;VisuMZ[_0x2da11d(0x234)][_0x2da11d(0x103)][_0x2da11d(0x1ac)](this,_0x37711,_0x46c0be),this['friendsUnit']()['recalculateActionsFTB']();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x185)]=Game_Actor['prototype'][_0x25a065(0x246)],Game_Actor[_0x25a065(0x1b1)]['discardEquip']=function(_0x418c44){const _0x1205bf=_0x25a065;VisuMZ[_0x1205bf(0x234)][_0x1205bf(0x185)][_0x1205bf(0x1ac)](this,_0x418c44),this[_0x1205bf(0x1e8)]()[_0x1205bf(0x138)]();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x247)]=Game_Actor['prototype'][_0x25a065(0x18d)],Game_Actor[_0x25a065(0x1b1)]['releaseUnequippableItems']=function(_0x4a5eaf){const _0x24fed7=_0x25a065;VisuMZ[_0x24fed7(0x234)]['Game_Actor_releaseUnequippableItems'][_0x24fed7(0x1ac)](this,_0x4a5eaf),this[_0x24fed7(0x1e8)]()[_0x24fed7(0x138)]();},VisuMZ['BattleSystemFTB'][_0x25a065(0x19c)]=Game_Actor[_0x25a065(0x1b1)]['changeClass'],Game_Actor[_0x25a065(0x1b1)][_0x25a065(0x12e)]=function(_0x8114e2,_0x2d4eb0){const _0x18bad1=_0x25a065;VisuMZ[_0x18bad1(0x234)][_0x18bad1(0x19c)][_0x18bad1(0x1ac)](this,_0x8114e2,_0x2d4eb0),this['friendsUnit']()[_0x18bad1(0x138)]();},VisuMZ[_0x25a065(0x234)][_0x25a065(0x111)]=Game_Enemy[_0x25a065(0x1b1)]['transform'],Game_Enemy[_0x25a065(0x1b1)][_0x25a065(0x1ae)]=function(_0x4e4b59){const _0x57d909=_0x25a065;VisuMZ[_0x57d909(0x234)][_0x57d909(0x111)][_0x57d909(0x1ac)](this,_0x4e4b59),this[_0x57d909(0x1e8)]()[_0x57d909(0x138)]();},Game_Unit[_0x25a065(0x1c0)]=VisuMZ['BattleSystemFTB'][_0x25a065(0x21d)]['Mechanics']['MaxActions'],Game_Unit[_0x25a065(0x23e)]=VisuMZ[_0x25a065(0x234)]['Settings']['Mechanics']['MinActions'],Game_Unit['_FTB_ACTION_OVERFLOW']=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x1f2)][_0x25a065(0x25f)],Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x1a0)]=function(){const _0x595960=_0x25a065;this['createActionsFTB'](),this[_0x595960(0x25d)](this[_0x595960(0x1ec)]());},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x165)]=function(){const _0x315da7=_0x25a065;this[_0x315da7(0x245)]=!![];let _0x1ddffd=0x0,_0x5e426c=this['aliveMembers']()['filter'](_0x262426=>_0x262426['canMove']());_0x1ddffd=_0x5e426c[_0x315da7(0x160)]((_0x4daf51,_0x552c36)=>_0x4daf51+_0x552c36[_0x315da7(0x194)](),_0x1ddffd),_0x1ddffd=_0x1ddffd[_0x315da7(0x1dd)](Game_Unit[_0x315da7(0x23e)],Game_Unit['_FTB_MAX_ACTIONS']),this[_0x315da7(0x208)]=_0x1ddffd;},Game_Unit['prototype'][_0x25a065(0x138)]=function(){const _0x2c0ec2=_0x25a065;if(!BattleManager[_0x2c0ec2(0x1a4)]())return;if(!$gameParty['inBattle']())return;const _0x11d24d=this[_0x2c0ec2(0x1ec)]();this['createActionsFTB']();let _0x5544db=this[_0x2c0ec2(0x137)]();const _0xacfd9f=this[_0x2c0ec2(0x1ec)]()-_0x11d24d;if(BattleManager[_0x2c0ec2(0x1f5)]&&_0xacfd9f>0x0)_0x5544db+=_0xacfd9f;if(BattleManager[_0x2c0ec2(0x12b)]&&_0xacfd9f<0x0)_0x5544db+=_0xacfd9f;_0x5544db=Math[_0x2c0ec2(0x19a)](_0x5544db,Game_Unit[_0x2c0ec2(0x1c0)]),this[_0x2c0ec2(0x25d)](_0x5544db);},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x137)]=function(){return this['_ftbActionsCur']||0x0;},Game_Unit[_0x25a065(0x1b1)]['setCurrentActionsFTB']=function(_0x4ded3d){const _0x47c9d8=_0x25a065;this['_ftbActionsCur']=Math[_0x47c9d8(0x20b)](_0x4ded3d)['clamp'](0x0,Game_Unit[_0x47c9d8(0x1c0)]),!Game_Unit[_0x47c9d8(0x1a7)]&&(this[_0x47c9d8(0x23f)]=Math[_0x47c9d8(0x19a)](this['_ftbActionsCur'],this[_0x47c9d8(0x1ec)]()));},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x11b)]=function(_0x5919c2){const _0x401224=_0x25a065;this[_0x401224(0x25d)](this[_0x401224(0x137)]()+_0x5919c2);},Game_Unit['prototype'][_0x25a065(0x100)]=function(_0x4b0b74){this['gainCurrentActionsFTB'](-_0x4b0b74);},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x1ec)]=function(){const _0x17b83b=_0x25a065;return this[_0x17b83b(0x208)]||0x0;},Game_Unit[_0x25a065(0x1b1)]['setMaxActionsFTB']=function(_0x4eb1e9){const _0x4b7024=_0x25a065;this[_0x4b7024(0x208)]=_0x4eb1e9['clamp'](Game_Unit[_0x4b7024(0x23e)],Game_Unit[_0x4b7024(0x1c0)]);},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x112)]=function(_0x2216b2){const _0x5aec54=_0x25a065;this[_0x5aec54(0x100)](_0x2216b2);},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0xd7)]=function(){const _0x40b5a8=_0x25a065;return this[_0x40b5a8(0x23f)]=this['_ftbActionsCur']||0x0,this[_0x40b5a8(0x23f)]>0x0;},Game_Unit[_0x25a065(0x1b1)]['performTurnEndFTB']=function(){const _0x4ee652=_0x25a065;for(const _0x2ee4c1 of this[_0x4ee652(0x1ef)]()){if(!_0x2ee4c1)continue;_0x2ee4c1[_0x4ee652(0x1d7)](),_0x2ee4c1[_0x4ee652(0x21c)]();}},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x230)]=function(){const _0x35350f=_0x25a065;if(this[_0x35350f(0x137)]()<=0x0)return!![];if(!this[_0x35350f(0x238)]()[_0x35350f(0x196)](_0x3564b3=>_0x3564b3[_0x35350f(0x1e4)]()))return!![];return![];},Game_Unit['prototype']['updateStateTurnsFTB']=function(){const _0x5cfbbf=_0x25a065;for(const _0x1bbd2a of this['members']()){if(!_0x1bbd2a)continue;_0x1bbd2a[_0x5cfbbf(0x20e)](),_0x1bbd2a['removeStatesAuto'](0x2),_0x1bbd2a[_0x5cfbbf(0x1b6)](),_0x1bbd2a[_0x5cfbbf(0x21c)]();}},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x221)]=function(){const _0x431bfa=_0x25a065;for(const _0x4bd93f of this[_0x431bfa(0x1ef)]()){if(!_0x4bd93f)continue;_0x4bd93f['_passedTurnFTB']=![];}},Game_Unit['prototype'][_0x25a065(0x177)]=function(){const _0xc54c88=_0x25a065,_0x2385ad=this[_0xc54c88(0x1ef)]();return Math[_0xc54c88(0x19a)](..._0x2385ad['map'](_0x22e3b4=>_0x22e3b4[_0xc54c88(0x224)]));},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0x117)]=function(){const _0x133490=_0x25a065,_0x104905=this['members']();return Math['max'](..._0x104905['map'](_0x2e7a5a=>_0x2e7a5a[_0x133490(0x224)]));},Game_Unit[_0x25a065(0x1b1)][_0x25a065(0xfa)]=function(){const _0x518585=_0x25a065,_0x541352=this[_0x518585(0x1ef)]();return _0x541352[_0x518585(0x160)]((_0x2ef447,_0x2f2f14)=>_0x2ef447+_0x2f2f14[_0x518585(0x224)],0x0);},VisuMZ['BattleSystemFTB'][_0x25a065(0x1e9)]=Scene_Battle[_0x25a065(0x1b1)]['createActorCommandWindow'],Scene_Battle[_0x25a065(0x1b1)][_0x25a065(0xf7)]=function(){const _0x32ee5c=_0x25a065;VisuMZ['BattleSystemFTB'][_0x32ee5c(0x1e9)][_0x32ee5c(0x1ac)](this),BattleManager['isFTB']()&&this[_0x32ee5c(0xe2)]();},Scene_Battle[_0x25a065(0x1b1)][_0x25a065(0xe2)]=function(){const _0x2e3773=_0x25a065,_0x338b6a=this[_0x2e3773(0x20c)];this[_0x2e3773(0x259)]()&&delete _0x338b6a[_0x2e3773(0x191)][_0x2e3773(0x198)];},VisuMZ[_0x25a065(0x234)][_0x25a065(0x184)]=Scene_Battle['prototype'][_0x25a065(0x1f1)],Scene_Battle[_0x25a065(0x1b1)][_0x25a065(0x1f1)]=function(){const _0x430d68=_0x25a065;BattleManager['isFTB']()?this[_0x430d68(0x148)]():VisuMZ[_0x430d68(0x234)]['Scene_Battle_commandCancel'][_0x430d68(0x1ac)](this);},Scene_Battle['prototype']['commandCancelFTB']=function(){const _0x4e8d8a=_0x25a065;this[_0x4e8d8a(0x242)][_0x4e8d8a(0xf1)](),this[_0x4e8d8a(0x20c)]['close']();},VisuMZ[_0x25a065(0x234)]['Scene_Battle_commandFight']=Scene_Battle[_0x25a065(0x1b1)]['commandFight'],Scene_Battle[_0x25a065(0x1b1)][_0x25a065(0x239)]=function(){const _0x3e9484=_0x25a065;BattleManager[_0x3e9484(0x1a4)]()?this[_0x3e9484(0x213)]():VisuMZ['BattleSystemFTB'][_0x3e9484(0x1b4)][_0x3e9484(0x1ac)](this);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x1b7)]=Scene_Battle[_0x25a065(0x1b1)][_0x25a065(0x258)],Scene_Battle[_0x25a065(0x1b1)][_0x25a065(0x258)]=function(){const _0xfa9c3=_0x25a065;VisuMZ['BattleSystemFTB'][_0xfa9c3(0x1b7)]['call'](this),this[_0xfa9c3(0x1c2)]();},Scene_Battle[_0x25a065(0x1b1)][_0x25a065(0x1c2)]=function(){const _0x581d2a=_0x25a065;if(!BattleManager['isFTB']())return;const _0x33229d=this['getChildIndex'](this[_0x581d2a(0x1db)]);this[_0x581d2a(0x211)]=new Window_FTB_ActionCount(),this['_ftbTroopActionCountWindow'][_0x581d2a(0x1f4)]($gameTroop),this[_0x581d2a(0x1cb)](this[_0x581d2a(0x211)],_0x33229d),this[_0x581d2a(0x22f)]=new Window_FTB_ActionCount(),this[_0x581d2a(0x22f)][_0x581d2a(0x1f4)]($gameParty),this['addChildAt'](this[_0x581d2a(0x22f)],_0x33229d),this[_0x581d2a(0x16d)]();},Scene_Battle[_0x25a065(0x1b1)][_0x25a065(0x16d)]=function(){const _0x4a1b44=_0x25a065;if(!BattleManager[_0x4a1b44(0x1a4)]())return;if(!this[_0x4a1b44(0x188)])return;const _0x49d4b1=Window_FTB_ActionCount[_0x4a1b44(0x21d)];if(_0x49d4b1[_0x4a1b44(0x248)])return;this['_logWindow']['y']+=_0x49d4b1['LogWindowTopOffsetY'];},Window_Base[_0x25a065(0x126)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)]['General']['CostPosition'],Window_Base[_0x25a065(0x180)]=VisuMZ[_0x25a065(0x234)]['Settings'][_0x25a065(0x16c)]['ShowCostForAttack'],Window_Base['_FTB_COST_SHOW_GUARD']=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x16c)][_0x25a065(0x243)],Window_Base[_0x25a065(0x1c8)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)]['General'][_0x25a065(0xdc)],Window_Base['_FTB_COST_SHOW_1']=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0x16c)][_0x25a065(0x14e)],VisuMZ[_0x25a065(0x234)][_0x25a065(0x12c)]=Window_Base[_0x25a065(0x1b1)][_0x25a065(0x10b)],Window_Base[_0x25a065(0x1b1)]['makeAdditionalSkillCostText']=function(_0x2192fe,_0x9bb854,_0x3cfbe9){const _0x1ceff9=_0x25a065;return _0x3cfbe9=VisuMZ[_0x1ceff9(0x234)]['Window_Base_makeAdditionalSkillCostText'][_0x1ceff9(0x1ac)](this,_0x2192fe,_0x9bb854,_0x3cfbe9),_0x3cfbe9=this['makeAdditionalCostTextFTB'](_0x2192fe,_0x9bb854,_0x3cfbe9),_0x3cfbe9;},VisuMZ[_0x25a065(0x234)]['Window_Base_drawItemNumber']=Window_Base['prototype'][_0x25a065(0x23c)],Window_Base[_0x25a065(0x1b1)][_0x25a065(0x23c)]=function(_0x278cfd,_0x332924,_0x5096fd,_0x453c1f){const _0x305e59=_0x25a065;BattleManager[_0x305e59(0x1a4)]()&&this['constructor']===Window_BattleItem?this[_0x305e59(0xcf)](_0x278cfd,_0x332924,_0x5096fd,_0x453c1f):VisuMZ[_0x305e59(0x234)][_0x305e59(0x1d1)]['call'](this,_0x278cfd,_0x332924,_0x5096fd,_0x453c1f),this[_0x305e59(0xe5)]();},Window_Base[_0x25a065(0x1b1)][_0x25a065(0xcf)]=function(_0xd86e2d,_0x19ecb5,_0xead90f,_0x2df29a){const _0x49ca28=_0x25a065,_0x54e300=BattleManager[_0x49ca28(0xe6)]||$gameParty[_0x49ca28(0x1ef)]()[0x0],_0x43106b=this[_0x49ca28(0x15e)](_0x54e300,_0xd86e2d,''),_0x5c1bc3=this[_0x49ca28(0x1c4)](_0x43106b)[_0x49ca28(0x13a)],_0x5816c3=Window_Base['_FTB_COST_POSITION'];let _0x11670b=_0x19ecb5+_0x2df29a-_0x5c1bc3;if(_0x43106b==='')VisuMZ['BattleSystemFTB'][_0x49ca28(0x1d1)][_0x49ca28(0x1ac)](this,_0xd86e2d,_0x19ecb5,_0xead90f,_0x2df29a);else{if(this[_0x49ca28(0x199)](_0xd86e2d)){this['resetFontSettings']();const _0x295584=VisuMZ['ItemsEquipsCore'][_0x49ca28(0x21d)]['ItemScene'];this[_0x49ca28(0xd3)][_0x49ca28(0x19d)]=_0x295584[_0x49ca28(0xe3)];if(_0x5816c3){const _0x48be4d=_0x295584['ItemQuantityFmt'],_0x117fff=_0x48be4d['format']($gameParty[_0x49ca28(0xdb)](_0xd86e2d)),_0x241fdb=this[_0x49ca28(0x1ee)](_0x117fff+this[_0x49ca28(0x1fa)]());_0x11670b-=_0x241fdb;}else _0x2df29a-=this[_0x49ca28(0x1ee)](this[_0x49ca28(0x1fa)]())+_0x5c1bc3;VisuMZ[_0x49ca28(0x234)]['Window_Base_drawItemNumber'][_0x49ca28(0x1ac)](this,_0xd86e2d,_0x19ecb5,_0xead90f,_0x2df29a);}}this['drawTextEx'](_0x43106b,_0x11670b,_0xead90f);},Window_Base[_0x25a065(0x1b1)][_0x25a065(0x15e)]=function(_0x1d574b,_0x4b023e,_0xecfdad){const _0x546087=_0x25a065;if(!BattleManager[_0x546087(0x1a4)]())return _0xecfdad;if(!_0x1d574b)return _0xecfdad;if(!_0x4b023e)return _0xecfdad;if(_0x4b023e[_0x546087(0x13f)][_0x546087(0x21a)](VisuMZ['BattleSystemFTB'][_0x546087(0x14c)][_0x546087(0x1fd)]))return _0xecfdad;let _0x4ab947=DataManager[_0x546087(0x1d2)](_0x4b023e);const _0x1d2f93=Window_Base['_FTB_COST_POSITION'],_0x44dc2d=Window_Base['_FTB_COST_SHOW_ATTACK'],_0x1dfa5b=Window_Base[_0x546087(0xd1)],_0x3073cd=Window_Base[_0x546087(0x1c8)],_0x376030=Window_Base['_FTB_COST_SHOW_1'];if(DataManager[_0x546087(0x21e)](_0x4b023e)&&this[_0x546087(0x1a8)]===Window_ActorCommand){if(!_0x44dc2d&&_0x4b023e['id']===_0x1d574b['attackSkillId']())return _0xecfdad;if(!_0x1dfa5b&&_0x4b023e['id']===_0x1d574b[_0x546087(0x1e3)]())return _0xecfdad;}if(_0x4ab947<0x0)return _0xecfdad;if(!_0x3073cd&&_0x4ab947===0x0)return _0xecfdad;if(!_0x376030&&_0x4ab947===0x1)return _0xecfdad;const _0x465604=_0x546087(0x21b)['format'](ImageManager[_0x546087(0x1fc)]),_0x29f239=TextManager[_0x546087(0x167)];let _0x516914=TextManager[_0x546087(0x162)][_0x546087(0x222)](_0x4ab947,_0x29f239,_0x465604);if(_0xecfdad==='')_0xecfdad+=_0x516914;else _0x1d2f93?_0xecfdad=_0x516914+this['skillCostSeparator']()+_0xecfdad:_0xecfdad=_0xecfdad+this[_0x546087(0x1fa)]()+_0x516914;return _0xecfdad;},VisuMZ['BattleSystemFTB'][_0x25a065(0x10c)]=Window_Help[_0x25a065(0x1b1)]['setItem'],Window_Help['prototype'][_0x25a065(0x11c)]=function(_0x2d3bf8){const _0x181eb5=_0x25a065;BattleManager['isFTB']()&&_0x2d3bf8&&_0x2d3bf8[_0x181eb5(0x13f)]&&_0x2d3bf8['note'][_0x181eb5(0x21a)](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?this[_0x181eb5(0x153)](String(RegExp['$1'])):VisuMZ[_0x181eb5(0x234)]['Window_Help_setItem'][_0x181eb5(0x1ac)](this,_0x2d3bf8);},Window_Selectable[_0x25a065(0x1b1)][_0x25a065(0x1d8)]=function(){const _0x3f420e=_0x25a065;return this['constructor']===Window_ActorCommand&&BattleManager[_0x3f420e(0x1a4)]()&&BattleManager[_0x3f420e(0x17a)];},VisuMZ['BattleSystemFTB'][_0x25a065(0x13b)]=Window_Selectable['prototype'][_0x25a065(0x1ab)],Window_Selectable[_0x25a065(0x1b1)][_0x25a065(0x1ab)]=function(_0x1ffcb2){const _0x3ef87d=_0x25a065;this[_0x3ef87d(0x1d8)]()&&this['maxCols']()===0x1?this[_0x3ef87d(0x25c)](!![]):VisuMZ[_0x3ef87d(0x234)][_0x3ef87d(0x13b)][_0x3ef87d(0x1ac)](this,_0x1ffcb2);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x187)]=Window_Selectable[_0x25a065(0x1b1)][_0x25a065(0xe7)],Window_Selectable['prototype'][_0x25a065(0xe7)]=function(_0x33c1fb){const _0x3fd7d2=_0x25a065;this[_0x3fd7d2(0x1d8)]()&&this[_0x3fd7d2(0x118)]()===0x1?this[_0x3fd7d2(0x25c)](![]):VisuMZ[_0x3fd7d2(0x234)][_0x3fd7d2(0x187)][_0x3fd7d2(0x1ac)](this,_0x33c1fb);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x11d)]=Window_Selectable[_0x25a065(0x1b1)][_0x25a065(0x218)],Window_Selectable['prototype'][_0x25a065(0x218)]=function(){const _0x3e4d56=_0x25a065;this['ftbFreeRangeSwitch']()?this[_0x3e4d56(0x25c)](!![]):VisuMZ[_0x3e4d56(0x234)][_0x3e4d56(0x11d)]['call'](this);},VisuMZ[_0x25a065(0x234)][_0x25a065(0x21f)]=Window_Selectable[_0x25a065(0x1b1)]['cursorPageup'],Window_Selectable[_0x25a065(0x1b1)][_0x25a065(0x1f6)]=function(){const _0x5adea5=_0x25a065;this[_0x5adea5(0x1d8)]()?this[_0x5adea5(0x25c)](![]):VisuMZ[_0x5adea5(0x234)][_0x5adea5(0x21f)][_0x5adea5(0x1ac)](this);},Window_ActorCommand['prototype'][_0x25a065(0x25c)]=function(_0x47bb66){const _0x2ed784=_0x25a065,_0xad2439=BattleManager[_0x2ed784(0x1b5)];let _0x2f72b3=$gameParty[_0x2ed784(0x1c1)]()[_0x2ed784(0x216)](_0xad2439);const _0x414b9f=$gameParty[_0x2ed784(0x1c1)]()[_0x2ed784(0x1da)]-0x1;let _0x35b1e2=$gameParty[_0x2ed784(0x1c1)]()[_0x2f72b3];for(;;){_0x2f72b3+=_0x47bb66?0x1:-0x1;if(_0x2f72b3<0x0)_0x2f72b3=_0x414b9f;if(_0x2f72b3>_0x414b9f)_0x2f72b3=0x0;_0x35b1e2=$gameParty[_0x2ed784(0x1c1)]()[_0x2f72b3];if(_0x35b1e2&&_0x35b1e2[_0x2ed784(0x171)]()&&!_0x35b1e2[_0x2ed784(0xe0)]())break;if(_0x35b1e2===_0xad2439)break;}this[_0x2ed784(0xea)](_0xad2439,_0x35b1e2);},Window_ActorCommand[_0x25a065(0x1b1)][_0x25a065(0xea)]=function(_0x3d6c68,_0x4e6321){const _0x1281fd=_0x25a065;if(_0x3d6c68===_0x4e6321)return;if(_0x3d6c68[_0x1281fd(0x241)]())_0x3d6c68[_0x1281fd(0x241)]()[_0x1281fd(0x1c9)]();this[_0x1281fd(0x1c7)](),BattleManager[_0x1281fd(0xec)]=_0x4e6321,BattleManager[_0x1281fd(0x1b5)]=_0x4e6321,BattleManager['startActorInput'](),SceneManager['_scene'][_0x1281fd(0x213)]();},VisuMZ[_0x25a065(0x234)]['Window_Selectable_processTouch']=Window_Selectable['prototype'][_0x25a065(0x183)],Window_Selectable[_0x25a065(0x1b1)][_0x25a065(0x183)]=function(){const _0x13d616=_0x25a065;BattleManager[_0x13d616(0x1a4)]()&&BattleManager[_0x13d616(0x17a)]&&this['constructor']===Window_BattleStatus?this[_0x13d616(0x1e2)]():VisuMZ['BattleSystemFTB']['Window_Selectable_processTouch'][_0x13d616(0x1ac)](this);},Window_BattleStatus[_0x25a065(0x1b1)][_0x25a065(0x1e2)]=function(){const _0x45da4b=_0x25a065;this[_0x45da4b(0x1d6)]()&&(TouchInput['isTriggered']()&&this[_0x45da4b(0x178)](!![]));},Window_BattleStatus[_0x25a065(0x1b1)][_0x25a065(0x178)]=function(_0x219533){const _0xf89f03=_0x25a065,_0x287c5a=SceneManager[_0xf89f03(0x217)][_0xf89f03(0x20c)];if(!_0x287c5a)return;if(!_0x287c5a[_0xf89f03(0x1cc)])return;this['_doubleTouch']=![];const _0xe48d6a=this['index'](),_0x31db29=this[_0xf89f03(0x1bb)]();if(_0x31db29>=0x0){const _0xe0eccf=$gameParty[_0xf89f03(0x1c1)]()[_0xe48d6a],_0x3d7e3d=$gameParty[_0xf89f03(0x1c1)]()[_0x31db29];this[_0xf89f03(0x189)](_0x3d7e3d)&&(_0x31db29===this[_0xf89f03(0x200)]()&&(this[_0xf89f03(0x13e)]=!![]),this['select'](_0x31db29),_0x287c5a['processSwitchActors'](_0xe0eccf,_0x3d7e3d));}},Window_BattleStatus[_0x25a065(0x1b1)][_0x25a065(0x189)]=function(_0x4c414d){const _0x174915=_0x25a065;if(!_0x4c414d)return![];if(!_0x4c414d[_0x174915(0x1e4)]())return![];if(!_0x4c414d['canInput']())return![];if(_0x4c414d[_0x174915(0xe0)]())return![];return!![];};function Window_FTB_ActionCount(){this['initialize'](...arguments);}Window_FTB_ActionCount[_0x25a065(0x1b1)]=Object[_0x25a065(0x22d)](Window_Base['prototype']),Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0x1a8)]=Window_FTB_ActionCount,Window_FTB_ActionCount[_0x25a065(0x21d)]=VisuMZ[_0x25a065(0x234)][_0x25a065(0x21d)][_0x25a065(0xff)],Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0x14a)]=function(){const _0x1f18d6=_0x25a065,_0x14db3a=this[_0x1f18d6(0x223)]();Window_Base[_0x1f18d6(0x1b1)][_0x1f18d6(0x14a)][_0x1f18d6(0x1ac)](this,_0x14db3a),this['setBackgroundType'](0x0),this[_0x1f18d6(0x1ff)](),this['opacity']=0x0;},Window_FTB_ActionCount['prototype']['windowRect']=function(){const _0x374c28=_0x25a065;return new Rectangle(0x0,0x0,Graphics[_0x374c28(0x13a)],Graphics[_0x374c28(0x1ed)]);},Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0x1ff)]=function(){const _0xbe9fd4=_0x25a065;this[_0xbe9fd4(0x1d5)]=null,this[_0xbe9fd4(0x233)]=0x0,this['_maxActions']=0x0;const _0x50ec4b=Window_FTB_ActionCount[_0xbe9fd4(0x21d)];this[_0xbe9fd4(0x154)]={'ActorPicture':_0x50ec4b[_0xbe9fd4(0x190)]?ImageManager[_0xbe9fd4(0x1cf)](_0x50ec4b[_0xbe9fd4(0x190)]):'','EnemyPicture':_0x50ec4b[_0xbe9fd4(0x139)]?ImageManager[_0xbe9fd4(0x1cf)](_0x50ec4b['EnemyActionPicture']):'','EmptyPicture':_0x50ec4b[_0xbe9fd4(0x219)]?ImageManager[_0xbe9fd4(0x1cf)](_0x50ec4b['EmptyActionPicture']):''};},Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0x1fb)]=function(){const _0x316758=_0x25a065;this[_0x316758(0x1bf)]=0x0;},Window_FTB_ActionCount[_0x25a065(0x1b1)]['setUnit']=function(_0x45e30d){const _0x3aac3f=_0x25a065;this[_0x3aac3f(0x1d5)]=_0x45e30d,this[_0x3aac3f(0xf6)]();},Window_FTB_ActionCount['prototype'][_0x25a065(0xf6)]=function(){const _0x33e6cb=_0x25a065;Window_Base[_0x33e6cb(0x1b1)]['update'][_0x33e6cb(0x1ac)](this),this[_0x33e6cb(0x23b)](),this[_0x33e6cb(0x11f)](),this[_0x33e6cb(0x175)]();},Window_FTB_ActionCount['prototype'][_0x25a065(0x23b)]=function(){const _0x34f548=_0x25a065;if(!this[_0x34f548(0x1d5)])return;(this['_currentActions']!==this[_0x34f548(0x1d5)][_0x34f548(0x137)]()||this[_0x34f548(0x18e)]!==this['_unit'][_0x34f548(0x1ec)]())&&(this[_0x34f548(0x233)]=this[_0x34f548(0x1d5)]['getCurrentActionsFTB'](),this[_0x34f548(0x18e)]=this[_0x34f548(0x1d5)][_0x34f548(0x1ec)](),this[_0x34f548(0x20d)]());},Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0x175)]=function(){const _0x3bc5e8=_0x25a065;this[_0x3bc5e8(0x1dc)]=$gameSystem[_0x3bc5e8(0x22c)]();},Window_FTB_ActionCount[_0x25a065(0x1b1)]['refresh']=function(){const _0x411290=_0x25a065;this['contents'][_0x411290(0x131)]();if(!this[_0x411290(0x1d5)])return;const _0x44c791=Window_FTB_ActionCount[_0x411290(0x21d)];if(!_0x44c791)return;const _0x1baa8c=this['createStartingCoordinates'](),_0x28efcf=this[_0x411290(0x1df)](),_0x3bef7e=_0x44c791[_0x411290(0xfc)]+_0x44c791['ImageGapDistance'],_0x5ef164=_0x44c791[_0x411290(0x203)];let _0x1dc763=_0x1baa8c['x'],_0x5db108=_0x1baa8c['y'];while(_0x28efcf['length']>0x0){const _0x4640dc=_0x28efcf[_0x411290(0x14f)]();this[_0x411290(0xd9)](_0x4640dc,_0x1dc763,_0x5db108,_0x28efcf[_0x411290(0x1da)]),_0x5ef164?_0x1dc763+=_0x3bef7e:_0x5db108+=_0x3bef7e;}},Window_FTB_ActionCount['prototype']['createStartingCoordinates']=function(){const _0x4139df=_0x25a065,_0x1c78f4=Window_FTB_ActionCount[_0x4139df(0x21d)],_0x4e4334=this[_0x4139df(0x1d5)]===$gameParty,_0xae137d=_0x1c78f4[_0x4139df(0xfc)],_0x40a72e=_0xae137d*(_0x1c78f4['MaxVisible']-0x1)+_0x1c78f4[_0x4139df(0x206)]*(_0x1c78f4[_0x4139df(0x173)]-0x2),_0x5b6323=_0x1c78f4[_0x4139df(0x203)],_0x184539=SceneManager[_0x4139df(0x217)][_0x4139df(0x15c)][_0x4139df(0x1ed)];let _0x230faa=0x0,_0x3daa36=0x0;const _0x27c7f1=_0x1c78f4['BottomPosition'];if(_0x27c7f1){_0x3daa36=this[_0x4139df(0x124)]-_0x184539-_0x1c78f4['ScreenBufferY']-_0xae137d,_0x230faa=_0x4e4334?this['innerWidth']-_0x1c78f4['ScreenBufferX']-_0xae137d:_0x1c78f4[_0x4139df(0x1de)];if(_0x5b6323&&_0x4e4334)_0x230faa-=_0x40a72e;else!_0x5b6323&&(_0x3daa36-=_0x40a72e);}else _0x3daa36=_0x1c78f4[_0x4139df(0x15d)],_0x230faa=_0x4e4334?this[_0x4139df(0x1f0)]-_0x1c78f4['ScreenBufferX']-_0xae137d:_0x1c78f4[_0x4139df(0x1de)],_0x5b6323&&_0x4e4334&&(_0x230faa-=_0x40a72e);return _0x230faa+=_0x4e4334?_0x1c78f4[_0x4139df(0x24e)]:_0x1c78f4[_0x4139df(0xd5)],_0x3daa36+=_0x4e4334?_0x1c78f4['ActorOffsetX']:_0x1c78f4['EnemyOffsetY'],new Point(Math[_0x4139df(0x20b)](_0x230faa),Math['round'](_0x3daa36));},Window_FTB_ActionCount['prototype'][_0x25a065(0x1df)]=function(){const _0x372374=_0x25a065,_0x2a1d41=Window_FTB_ActionCount['Settings'];let _0x167fbd=!![];if(_0x2a1d41[_0x372374(0x203)]){if(this[_0x372374(0x1d5)]===$gameParty)_0x167fbd=!_0x167fbd;}else _0x167fbd=!_0x2a1d41['BottomPosition'];let _0x5004c6=this[_0x372374(0x1d5)][_0x372374(0x137)](),_0x3fa2b3=Math[_0x372374(0x18b)](0x0,this['_unit'][_0x372374(0x1ec)]()-_0x5004c6);const _0x370231=[];while(_0x5004c6--){const _0x3e0f19=_0x372374(0x1a1);_0x370231[_0x372374(0xf3)](_0x3e0f19);}while(_0x3fa2b3--){const _0x39ff77='Empty';_0x167fbd?_0x370231[_0x372374(0xf3)](_0x39ff77):_0x370231[_0x372374(0x133)](_0x39ff77);}while(_0x370231['length']<0xa){const _0x8e89a0=_0x372374(0x205);_0x167fbd?_0x370231[_0x372374(0xf3)](_0x8e89a0):_0x370231[_0x372374(0x133)](_0x8e89a0);}return _0x370231;},Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0xd9)]=function(_0xade24e,_0x23c918,_0x4f5160,_0x2b64ea){const _0x5e36c0=_0x25a065;if(_0xade24e===_0x5e36c0(0x205))return;if(_0xade24e==='Current')_0xade24e=this[_0x5e36c0(0x1d5)]===$gameParty?_0x5e36c0(0x23a):_0x5e36c0(0x123);const _0x114278=Window_FTB_ActionCount[_0x5e36c0(0x21d)];if(_0x114278[_0x5e36c0(0x140)['format'](_0xade24e)]){const _0x59c9dd=_0x114278[_0x5e36c0(0x140)[_0x5e36c0(0x222)](_0xade24e)],_0x540942=ImageManager['loadPicture'](_0x59c9dd);_0x540942[_0x5e36c0(0x114)](this[_0x5e36c0(0xfb)][_0x5e36c0(0x23d)](this,_0x540942,_0x23c918,_0x4f5160,_0x2b64ea));}else{const _0x37fcd7=ImageManager[_0x5e36c0(0x1ad)[_0x5e36c0(0x222)](_0xade24e)];this[_0x5e36c0(0x172)](_0x37fcd7,_0x23c918,_0x4f5160),this[_0x5e36c0(0x1b8)](_0x2b64ea)&&this[_0x5e36c0(0x169)](_0x23c918,_0x4f5160);}},Window_FTB_ActionCount[_0x25a065(0x1b1)]['drawPicture']=function(_0xd3307c,_0x3e380b,_0x30b00b,_0x286d84){const _0x5a2aa0=_0x25a065;if(!_0xd3307c)return;const _0x4deb1b=Window_FTB_ActionCount[_0x5a2aa0(0x21d)],_0x33ce88=_0x4deb1b['ImageSize'],_0x34053f=_0x33ce88/_0xd3307c['width'],_0x39e5e4=_0x33ce88/_0xd3307c['height'],_0x1f9963=Math[_0x5a2aa0(0x19a)](_0x34053f,_0x39e5e4,0x1),_0x509d98=_0xd3307c[_0x5a2aa0(0x1ed)],_0x1ce297=_0xd3307c['height'],_0x53c1e8=Math[_0x5a2aa0(0x20b)](_0x509d98*_0x1f9963),_0x195f40=Math[_0x5a2aa0(0x20b)](_0x1ce297*_0x1f9963),_0x23c4d7=Math[_0x5a2aa0(0x20b)](_0x3e380b+(_0x33ce88-_0x53c1e8)/0x2),_0x228476=Math[_0x5a2aa0(0x20b)](_0x30b00b+(_0x33ce88-_0x195f40)/0x2);this['contents'][_0x5a2aa0(0x252)][_0x5a2aa0(0xcd)]=_0x4deb1b[_0x5a2aa0(0x209)],this[_0x5a2aa0(0xd3)][_0x5a2aa0(0x163)](_0xd3307c,0x0,0x0,_0x509d98,_0x1ce297,_0x23c4d7,_0x228476,_0x53c1e8,_0x195f40),this[_0x5a2aa0(0xd3)][_0x5a2aa0(0x252)]['imageSmoothingEnabled']=!![],this[_0x5a2aa0(0x1b8)](_0x286d84)&&this[_0x5a2aa0(0x169)](_0x3e380b,_0x30b00b);},Window_FTB_ActionCount[_0x25a065(0x1b1)]['drawBigIcon']=function(_0x18f47d,_0xf7e8ef,_0x4c7489){const _0x21e3c2=_0x25a065,_0x27a4d1=Window_FTB_ActionCount[_0x21e3c2(0x21d)];let _0x1db003=_0x27a4d1[_0x21e3c2(0xfc)];const _0x105cfb=ImageManager['loadSystem'](_0x21e3c2(0x1c6)),_0x16a81f=ImageManager[_0x21e3c2(0x1f7)],_0x311410=ImageManager[_0x21e3c2(0x1d0)],_0x1a484f=_0x18f47d%0x10*_0x16a81f,_0x55e5db=Math['floor'](_0x18f47d/0x10)*_0x311410;this[_0x21e3c2(0xd3)][_0x21e3c2(0x252)]['imageSmoothingEnabled']=_0x27a4d1[_0x21e3c2(0xe1)],this[_0x21e3c2(0xd3)][_0x21e3c2(0x163)](_0x105cfb,_0x1a484f,_0x55e5db,_0x16a81f,_0x311410,_0xf7e8ef,_0x4c7489,_0x1db003,_0x1db003),this[_0x21e3c2(0xd3)][_0x21e3c2(0x252)]['imageSmoothingEnabled']=!![];},Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0x11f)]=function(){const _0x27e397=_0x25a065,_0x510b68=Window_FTB_ActionCount[_0x27e397(0x21d)];if(_0x510b68[_0x27e397(0x248)])return;if(!_0x510b68['RepositionTopForHelp'])return;const _0xf6a584=SceneManager[_0x27e397(0x217)][_0x27e397(0x210)];if(!_0xf6a584)return;_0xf6a584[_0x27e397(0x1dc)]?(this['x']=_0x510b68['RepositionTopHelpX']||0x0,this['y']=_0x510b68[_0x27e397(0x19e)]||0x0):(this['x']=0x0,this['y']=0x0);},Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0x1b8)]=function(_0x5dbedb){const _0x2dbf7f=_0x25a065,_0xeb565e=Window_FTB_ActionCount['Settings'];if(!_0xeb565e[_0x2dbf7f(0xdf)])return![];const _0x35c82a=_0xeb565e[_0x2dbf7f(0x248)],_0x118e11=_0xeb565e['DrawHorz'],_0x5759cb=this[_0x2dbf7f(0x1d5)]===$gameParty;if(_0x118e11)return _0x5759cb?_0x5dbedb===0x0:_0x5dbedb===_0xeb565e['MaxVisible']-0x1;else return _0x35c82a?_0x5dbedb===0x0:_0x5dbedb===_0xeb565e['MaxVisible']-0x1;},Window_FTB_ActionCount[_0x25a065(0x1b1)][_0x25a065(0x169)]=function(_0x55ad4c,_0x403c22){const _0x468d2e=_0x25a065;this[_0x468d2e(0xe5)]();const _0x505c41=Window_FTB_ActionCount[_0x468d2e(0x21d)],_0x1c2b21=new Rectangle(_0x55ad4c,_0x403c22,_0x505c41[_0x468d2e(0xfc)],_0x505c41[_0x468d2e(0xfc)]);_0x1c2b21['x']+=_0x505c41['ActionsRemainingOffsetX'],_0x1c2b21['y']+=_0x505c41[_0x468d2e(0x250)];const _0x2adffc=this[_0x468d2e(0x1d5)][_0x468d2e(0x137)]();this['contents']['fontSize']=_0x505c41[_0x468d2e(0x1c5)],this[_0x468d2e(0xd3)]['drawText'](_0x2adffc,_0x1c2b21['x'],_0x1c2b21['y'],_0x1c2b21['width'],_0x1c2b21[_0x468d2e(0x1ed)],_0x468d2e(0x16b)),this[_0x468d2e(0xe5)]();};
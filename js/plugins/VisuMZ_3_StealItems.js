//=============================================================================
// VisuStella MZ - Steal Items
// VisuMZ_3_StealItems.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StealItems = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StealItems = VisuMZ.StealItems || {};
VisuMZ.StealItems.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [StealItems]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Steal_Items_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Thieves with the ability to steal items from enemies aren't an uncommon
 * class in RPG's. This plugin lets you set up enemies with items that can be
 * stolen from with different types of effects that can occur upon stealing.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create a pool of stealable items for each enemy.
 * * Make skills or items that have stealing properties attached to them.
 * * Some skills/items can be dedicated towards stealing specific types of loot
 *   (Gold, Items, Weapons, and/or Armor).
 * * Have different success rates for skills and items.
 * * Actors can gain trait effects that increase or decrease success rates.
 * * Enemies can gain resistance towards stealing.
 * * JavaScript uses can enable special effects to occur upon successfully
 *   stealing, failing, or emptying out an enemy's loot.
 * * Automatically translate drop items from the database into stealable loot.
 * * If weapons or armors are stolen, they can debuff the enemy and lower their
 *   parameters by their base bonuses.
 * * Use a Snatch effect to directly target a specific item to be stolen from
 *   the enemy.
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
 * * VisuMZ_1_BattleCore
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
 * Gold and Item Drop Removals
 * 
 * This is an optional effect that can be enabled from the Plugin Parameters.
 * 
 * If you have enabled Automatic Gold Drop and Item Drop inclusions from the
 * plugin parameters as well as enabled their respective "Loot Removal" plugin
 * parameters, then once the gold/items have been stolen a target enemy, that
 * enemy will not drop the specific gold value or specific item drop during the
 * victory aftermath phase.
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
 * === Steal Action-Related Notetags ===
 * 
 * The following are notetags that are used to place on skills/items that you
 * want to have stealing properties for.
 * 
 * ---
 *
 * <Steal>
 * <Steal type>
 * <Steal type, type, type>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 *
 * ---
 *
 * <Steal type: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   multiplicative success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal type: +x%>
 * <Steal type: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   additive success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 * 
 * <Snatch>
 * <Targeting Steal>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the steal action from targeting a random item from the stealable
 *   types pool to a specific item that the player can select.
 * - If the snatch attempt fails, it will not attempt to steal other items.
 * - Both the <Snatch> and <Targeting Steal> notetags do the same thing.
 * - This does not work with abilities that target multiple enemies, random
 *   enemies, or actors.
 * - Use this in addition to the <Steal>, <Steal type>, or
 *   <Steal type, type, type> notetags as this does not have any steal
 *   properties on its own.
 * 
 * ---
 * 
 * === JavaScript Notetags: Steal Action-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * apply special effects for steal-related skills/items.
 * 
 * ---
 *
 * <JS Steal Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS On Steal Success>
 *  code
 *  code
 *  code
 * </JS On Steal Success>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon successfully stealing.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 * - The 'item' variable represents the item that was stolen if there is one.
 *   This will return a null value if gold was stolen instead.
 * - The 'gold' variable represents the gold quantity that was stolen if any.
 *   This will return a 0 value if there was no gold stolen.
 *
 * ---
 *
 * <JS On Steal Failure>
 *  code
 *  code
 *  code
 * </JS On Steal Failure>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon failing a stealth attempt.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 *
 * <JS On Steal Empty>
 *  code
 *  code
 *  code
 * </JS On Steal Empty>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code if there was nothing to steal.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 * 
 * === Steal Loot Setup-Related Notetags ===
 * 
 * The following notetags are made for enemies and used to set up the loot that
 * can be stolen.
 * 
 * ---
 *
 * <Steal Gold value: x%>
 * 
 * <Steal Item id: x%>
 * <Steal Item name: x%>
 * 
 * <Steal Weapon id: x%>
 * <Steal Weapon name: x%>
 * 
 * <Steal Armor id: x%>
 * <Steal Armor name: x%>
 *
 * - Used for: Enemy Notetags
 * - Sets up droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert multiple notetags for multiple loot entries to be stolen.
 *
 * ---
 *
 * <Steal>
 *  Gold value: x%
 * 
 *  Item id: x%
 *  Item name: x%
 * 
 *  Weapon id: x%
 *  Weapon name: x%
 * 
 *  Armor id: x%
 *  Armor name: x%
 * </Steal>
 *
 * - Used for: Enemy Notetags
 * - Sets up a batch setup of droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert/remove multiple copies of the loot entries inside the <Steal>
 *   notetags to add more or reduce entries.
 *
 * ---
 * 
 * === Steal Rate Traits-Related Notetags ===
 * 
 * The following notetags are made for trait objects that can alter the
 * success rates of steal skills/items.
 * 
 * ---
 *
 * <Steal Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal Rate: +x%>
 * <Steal Rate: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 *
 * <Steal Resist: +x%>
 * <Steal Resist: -x%>
 *
 * - Used for: Enemy Notetags
 * - Alters the steal resistance for enemies. Higher numbers mean higher steal
 *   resistance.
 * - Replace 'x' with a number representing the percent value to alter the
 *   steal resistance by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Settings
 * ============================================================================
 *
 * Automatic settings pertaining to the steal mechanics of the game.
 *
 * ---
 *
 * Settings
 * 
 *   Add Gold Drop?:
 *   - Automatically include enemy gold drop into stealable items?
 * 
 *     Success Rate:
 *     - If automatically include gold drop, what is the steal rate?
 *     - Use a number between 0 and 1.
 * 
 *     Loot Removal:
 *     - If using automatic gold, remove the rewards from the enemy gold
 *       when defeated?
 * 
 *   Add Item Drops?:
 *   - Automatically include enemy item drop into stealable items?
 * 
 *     Success Modifier:
 *     - If automatically include item drops, how much do you want to alter
 *       their drop modifiers by?
 * 
 *     Loot Removal:
 *     - If using automatic drops, remove the rewards from the enemy items
 *       when defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * Settings pertaining to the steal-related messages that appear in the Battle
 * Log Window.
 *
 * ---
 *
 * Settings
 * 
 *   Show Messages:
 *   - Show messages regarding stolen items in the Battle Log window?
 * 
 *   Steal Item:
 *   - Message displayed when stealing an item.
 *   - %1 - Item's Name, %2 - Item's Icon
 * 
 *   Steal Gold:
 *   - Message displayed when stealing gold.
 *   - %1 - Gold Name, %2 - Gold Amount
 * 
 *   Steal Fail:
 *   - Message displayed when a steal attempt fails.
 * 
 *   Steal Empty:
 *   - Message displayed when there is nothing to steal.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Special game mechanics related to stealing.
 *
 * ---
 *
 * General
 * 
 *   Equip Debuff:
 *   - When weapons/armors are stolen, decrease the enemy's parameters based
 *     on the weapon/armor parameters?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Bonus Steal %:
 *   - Code used to determine an additive bonus steal rate.
 * 
 *   JS: Steal Resist %:
 *   - Code used to determine an additive steal resistance.
 * 
 *   JS: On Steal Success:
 *   - What kind of code do you want to run when stealing succeeds?
 * 
 *   JS: On Steal Failure:
 *   - What kind of code do you want to run when stealing fails?
 * 
 *   JS: On Steal Empty:
 *   - What kind of code do you want to run when there is nothing to steal?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popup settings related to stealing.
 *
 * ---
 *
 * Success
 * 
 * Failure
 * 
 * Empty
 * 
 *   Text:
 *   - Text displayed upon stealing an item.
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
 * Plugin Parameters: Snatch Settings
 * ============================================================================
 *
 * These are the settings for the effect when used with the <Snatch> notetag.
 * When snatching an item, the player can target a specific item in the enemy's
 * loot to be stolen from. The success rates and lists of items will be visible
 * at the expense of only being able to steal just that item.
 *
 * ---
 *
 * Gold
 * 
 *   Icon:
 *   - Icon used to represent gold.
 *   - Ignore if VisuMZ_0_CoreEngine is present.
 * 
 *   Name Format:
 *   - Name format on how gold is displayed.
 *   - %1 - Icon, %2 - Quantity, %3 - Current Name
 * 
 *   Help Text:
 *   - Text that's displayed in the help window when gold is selected in the
 *     Snatch window.
 *
 * ---
 *
 * Success Rate
 * 
 *   Display Success Rate:
 *   - Display success rates in the Snatch window?
 * 
 *   Already Stolen:
 *   - Text displayed when an item has already been stolen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Determine the sound effects played related to stealing.
 *
 * ---
 *
 * Successful Gold Steal
 * 
 * Successful Item Steal
 * 
 * Successful Weapon Steal
 * 
 * Successful Armor Steal
 * 
 * Failure
 * 
 * Empty
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
 * Version 1.01: December 11, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: December 9, 2020
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
 * @param StealItems
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic Settings
 * @type struct<Auto>
 * @desc Automatic settings pertaining to the steal mechanics of the game.
 * @default {"AutoGold:eval":"true","GoldRate:num":"0.50","GoldRemoval:eval":"true","AutoItem:eval":"true","ItemRate:num":"1.50","ItemRemoval:eval":"true"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings pertaining to the steal-related messages that appear in the Battle Log Window.
 * @default {"ShowMessages:eval":"true","StealItem:str":"Stole %2%1!","StealGold:str":"Stole %2 \\C[16]%1\\C[0]!","StealFail:str":"Steal attempt unsuccessful!","StealEmpty:str":"Nothing to steal!"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Special game mechanics related to stealing.
 * @default {"General":"","EquipDebuff:eval":"true","JavaScript":"","JsBonusSteal:func":"\"// Declare Variables\\nconst user = this;\\nlet bonusRate = 0;\\n\\n// Calculate Bonus Rate\\nbonusRate = (user.luk / (512 + user.luk)) / 3;\\n\\n// Return Bonus Rate\\nreturn bonusRate;\"","JsStealResist:func":"\"// Declare Variables\\nconst user = this;\\nlet resistRate = 0;\\n\\n// Calculate Resist Rate\\nresistRate = (user.luk / (512 + user.luk)) / 8;\\n\\n// Return Resist Rate\\nreturn resistRate;\"","JsOnStealSuccess:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealFail:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealEmpty:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\""}
 *
 * @param Popup:struct
 * @text Popup Settings
 * @type struct<Popup>
 * @desc Popup settings related to stealing.
 * @default {"Success":"","SuccessPopupText:str":"STOLEN","SuccessItemName:eval":"true","SuccessTextColor:str":"0","SuccessFlashColor:eval":"[255, 255, 255, 0]","SuccessFlashDuration:num":"60","Failure":"","FailurePopupText:str":"FAILED","FailureTextColor:str":"8","FailureFlashColor:eval":"[255, 255, 255, 0]","FailureFlashDuration:num":"60","Empty":"","EmptyPopupText:str":"EMPTY","EmptyTextColor:str":"8","EmptyFlashColor:eval":"[255, 255, 255, 0]","EmptyFlashDuration:num":"60"}
 *
 * @param Snatch:struct
 * @text Snatch Settings
 * @type struct<Snatch>
 * @desc Settings related to the snatch mechanic.
 * @default {"Gold":"","GoldIcon:num":"314","GoldNameFmt:str":"%1%2\\C[16]%3\\C[0]","GoldHelp:json":"\"Steal gold from this target!\"","Success":"","DisplaySuccess:eval":"true","AlreadyStolen:str":"Stolen"}
 *
 * @param Sound:struct
 * @text Sound Settings
 * @type struct<Sound>
 * @desc Determine the sound effects played related to stealing.
 * @default {"Successful":"","SuccessGold":"","gold_name:str":"Shop2","gold_volume:num":"90","gold_pitch:num":"120","gold_pan:num":"0","SuccessItem":"","item_name:str":"Item1","item_volume:num":"90","item_pitch:num":"120","item_pan:num":"0","SuccessWeapon":"","weapon_name:str":"Equip1","weapon_volume:num":"90","weapon_pitch:num":"120","weapon_pan:num":"0","SuccessArmor":"","armor_name:str":"Equip2","armor_volume:num":"90","armor_pitch:num":"120","armor_pan:num":"0","Failure":"","fail_name:str":"Buzzer2","fail_volume:num":"90","fail_pitch:num":"120","fail_pan:num":"0","Empty":"","empty_name:str":"Evasion1","empty_volume:num":"90","empty_pitch:num":"120","empty_pan:num":"0"}
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
 * Auto Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoGold:eval
 * @text Add Gold Drop?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy gold drop into stealable items?
 * @default true
 *
 * @param GoldRate:num
 * @text Success Rate
 * @parent AutoGold:eval
 * @desc If automatically include gold drop, what is the steal rate?
 * Use a number between 0 and 1.
 * @default 0.50
 *
 * @param GoldRemoval:eval
 * @text Loot Removal
 * @parent AutoGold:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated?
 * @default true
 *
 * @param AutoItem:eval
 * @text Add Item Drops?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy item drop into stealable items?
 * @default true
 *
 * @param ItemRate:num
 * @text Success Modifier
 * @parent AutoItem:eval
 * @desc If automatically include item drops, how much do you want
 * to alter their drop modifiers by?
 * @default 1.50
 *
 * @param ItemRemoval:eval
 * @text Loot Removal
 * @parent AutoItem:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic drops, remove the rewards from the
 * enemy items when defeated?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param ShowMessages:eval
 * @text Show Messages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show messages regarding stolen items in the Battle Log window?
 * @default true
 * 
 * @param StealItem:str
 * @text Steal Item
 * @desc Message displayed when stealing an item.
 * %1 - Item's Name, %2 - Item's Icon
 * @default Stole %2%1!
 * 
 * @param StealGold:str
 * @text Steal Gold
 * @desc Message displayed when stealing gold.
 * %1 - Gold Name, %2 - Gold Amount
 * @default Stole %2 \C[16]%1\C[0]!
 * 
 * @param StealFail:str
 * @text Steal Fail
 * @desc Message displayed when a steal attempt fails.
 * @default Steal attempt unsuccessful!
 * 
 * @param StealEmpty:str
 * @text Steal Empty
 * @desc Message displayed when there is nothing to steal.
 * @default Nothing to steal!
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param EquipDebuff:eval
 * @text Equip Debuff
 * @parent General
 * @type boolean
 * @on Debuff
 * @off No Effects
 * @desc When weapons/armors are stolen, decrease the enemy's
 * parameters based on the weapon/armor parameters?
 * @default true
 *
 * @param JavaScript
 *
 * @param JsBonusSteal:func
 * @text JS: Bonus Steal %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive bonus steal rate.
 * @default "// Declare Variables\nconst user = this;\nlet bonusRate = 0;\n\n// Calculate Bonus Rate\nbonusRate = (user.luk / (512 + user.luk)) / 3;\n\n// Return Bonus Rate\nreturn bonusRate;"
 *
 * @param JsStealResist:func
 * @text JS: Steal Resist %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive steal resistance.
 * @default "// Declare Variables\nconst user = this;\nlet resistRate = 0;\n\n// Calculate Resist Rate\nresistRate = (user.luk / (512 + user.luk)) / 8;\n\n// Return Resist Rate\nreturn resistRate;"
 *
 * @param JsOnStealSuccess:func
 * @text JS: On Steal Success
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing succeeds?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealFail:func
 * @text JS: On Steal Failure
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing fails?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealEmpty:func
 * @text JS: On Steal Empty
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when there is nothing to steal?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param Success
 *
 * @param SuccessPopupText:str
 * @text Text
 * @parent Success
 * @desc Text displayed upon successfully stealing an item.
 * @default STOLEN
 *
 * @param SuccessItemName:eval
 * @text Show Item Name
 * @parent SuccessPopupText:str
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the name of the item that is stolen, too?
 * @default true
 *
 * @param SuccessTextColor:str
 * @text Text Color
 * @parent Success
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SuccessFlashColor:eval
 * @text Flash Color
 * @parent Success
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param SuccessFlashDuration:num
 * @text Flash Duration
 * @parent Success
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 *
 * @param FailurePopupText:str
 * @text Text
 * @parent Failure
 * @desc Text displayed upon failing a steal attempt.
 * @default FAILED
 *
 * @param FailureTextColor:str
 * @text Text Color
 * @parent Failure
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param FailureFlashColor:eval
 * @text Flash Color
 * @parent Failure
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param FailureFlashDuration:num
 * @text Flash Duration
 * @parent Failure
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Empty
 *
 * @param EmptyPopupText:str
 * @text Text
 * @parent Empty
 * @desc Text displayed upon there is nothing to steal.
 * @default EMPTY
 *
 * @param EmptyTextColor:str
 * @text Text Color
 * @parent Empty
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param EmptyFlashColor:eval
 * @text Flash Color
 * @parent Empty
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param EmptyFlashDuration:num
 * @text Flash Duration
 * @parent Empty
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Snatch Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Snatch:
 *
 * @param Gold
 *
 * @param GoldIcon:num
 * @text Icon
 * @parent Gold
 * @desc Icon used to represent gold.
 * Ignore if VisuMZ_0_CoreEngine is present.
 * @default 314
 *
 * @param GoldNameFmt:str
 * @text Name Format
 * @parent Gold
 * @desc Name format on how gold is displayed.
 * %1 - Icon, %2 - Quantity, %3 - Current Name
 * @default %1%2\C[16]%3\C[0]
 *
 * @param GoldHelp:json
 * @text Help Text
 * @type note
 * @parent Gold
 * @desc Text that's displayed in the help window when gold is selected in the Snatch window.
 * @default "Steal gold from this target!"
 *
 * @param Success
 * @text Success Rate
 *
 * @param DisplaySuccess:eval
 * @text Display Success Rate
 * @parent Success
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display success rates in the Snatch window?
 * @default true
 *
 * @param AlreadyStolen:str
 * @text Already Stolen
 * @parent Success
 * @desc Text displayed when an item has already been stolen.
 * @default Stolen
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param Successful
 * 
 * @param SuccessGold
 * @text Gold Steal
 * @parent Successful
 *
 * @param gold_name:str
 * @text Filename
 * @parent SuccessGold
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Shop2
 *
 * @param gold_volume:num
 * @text Volume
 * @parent SuccessGold
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param gold_pitch:num
 * @text Pitch
 * @parent SuccessGold
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param gold_pan:num
 * @text Pan
 * @parent SuccessGold
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessItem
 * @text Item Steal
 * @parent Successful
 *
 * @param item_name:str
 * @text Filename
 * @parent SuccessItem
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Item1
 *
 * @param item_volume:num
 * @text Volume
 * @parent SuccessItem
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param item_pitch:num
 * @text Pitch
 * @parent SuccessItem
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param item_pan:num
 * @text Pan
 * @parent SuccessItem
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessWeapon
 * @text Weapon Steal
 * @parent Successful
 *
 * @param weapon_name:str
 * @text Filename
 * @parent SuccessWeapon
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip1
 *
 * @param weapon_volume:num
 * @text Volume
 * @parent SuccessWeapon
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param weapon_pitch:num
 * @text Pitch
 * @parent SuccessWeapon
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param weapon_pan:num
 * @text Pan
 * @parent SuccessWeapon
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessArmor
 * @text Armor Steal
 * @parent Successful
 *
 * @param armor_name:str
 * @text Filename
 * @parent SuccessArmor
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param armor_volume:num
 * @text Volume
 * @parent SuccessArmor
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param armor_pitch:num
 * @text Pitch
 * @parent SuccessArmor
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param armor_pan:num
 * @text Pan
 * @parent SuccessArmor
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Failure
 *
 * @param fail_name:str
 * @text Filename
 * @parent Failure
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Buzzer2
 *
 * @param fail_volume:num
 * @text Volume
 * @parent Failure
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param fail_pitch:num
 * @text Pitch
 * @parent Failure
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param fail_pan:num
 * @text Pan
 * @parent Failure
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Empty
 *
 * @param empty_name:str
 * @text Filename
 * @parent Empty
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Evasion1
 *
 * @param empty_volume:num
 * @text Volume
 * @parent Empty
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param empty_pitch:num
 * @text Pitch
 * @parent Empty
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param empty_pan:num
 * @text Pan
 * @parent Empty
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
//=============================================================================

const _0x5715=['members','getItemIdWithName','checkCacheKey','DetermineStealData','GoldIcon','processStealItemsSuccess','setHandler','autoSelect','rPfHC','Parse_Notetags_JS','SHimZ','getSnatchTarget','split','_snatchEnemyIndex','StealGold','width','_data','createEnemyWindow','NUM','JiBtn','onStealSnatchCancel','toUpperCase','_cache','includes','_armorIDs','Game_Enemy_gold','BattleLog','push','JsStealRate','cpURk','deactivate','StealItem','kLJzT','activate','cZPoA','tLuNQ','bind','_action','indexOf','gainGold','processStealItemsNothing','process_VisuMZ_StealItems','processStealItemsFailureSFX','processStealItemsSuccessJS','LdZIP','GoldRate','dmvHx','StealableItemSingle','Scene_Battle_onEnemyOk','StealFail','STR','%1_volume','Scene_Battle_createEnemyWindow','zRtCG','_itemIDs','UDiQH','StealItems','stealPlus','_enemyWindow','needsSelection','Scene_Battle_hideSubInputWindows','AutoGold','\x5cI[%1]','BhRJZ','DiXWn','setupStealableItems','dataId','szshU','JsOnStealEmpty','FailureFlashDuration','initialize','88.88%','processStealItemsNothingLogWindow','addStealText','vCDpp','exit','Class-%1-%2','pldew','plus','setText','format','onldN','denominator','Item-%1-%2','ARRAYSTRUCT','makeItemList','types','createKeyJS','DisplaySuccess','armor','VisuMZ_0_CoreEngine','uwuif','JsOnStealNothing','stolen','_scene','ItemRate','refresh','filter','playSe','EmptyTextColor','none','JsOnStealFail','Mechanics','processStealItemsFailureLogWindow','FailurePopupText','%1_name','parameters','createStealRate','_helpWindow','index','yhxGL','CoreEngine','fail','Game_Action_applyItemUserEffect','%1_pitch','Settings','ARRAYJSON','log','JsStealResist','isAnyInputWindowActive','EmptyFlashDuration','createStealResist','params','Weapon-%1-%2','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','snatchGoldHelpText','StealableItems','ParseSkillNotetags','length','tHLPb','iEMjZ','ShuffleArray','JsBonusSteal','cancel','processStealItemsFailurePopup','hMmde','call','trim','StealResist','Snatch','parse','ekWIS','RegExp','type','fjVKz','toFixed','createStealSnatchWindow','constructor','processStealItemsSuccessLogWindow','StealAction1','match','_visualDrops','getWeaponIdWithName','onStealSnatchOk','GoldNameFmt','toLowerCase','item','oxlgD','AlreadyStolen','processStealItemsFailureJS','aRdRw','stealResist','createStealRateJS','numberWidth','HataH','EVAL','textSizeEx','ParseItemNotetags','Sound','SuccessPopupText','textWidth','StealPlus','setHelpWindowItem','rate','OBZQA','weapon','createOnStealJS','VqVoL','BMDeb','WEAPON','note','makeDeepCopy','snatchGoldNameFmt','drawItemName','State-%1-%2','drop','Auto','all','onDatabaseLoaded','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','inputtingAction','Game_BattlerBase_refresh','hvTpQ','SuccessTextColor','ARRAYFUNC','startStealItemsUserEffect','_snatchItemIndex','WgldM','iconIndex','Game_Enemy_makeDropItems','StealAction2','hBaxO','description','concat','stealRate','ConvertParams','SuccessItemName','name','Gold','VisuMZ_1_BattleCore','setupEnemyLevels','setup','JsOnStealSuccess','StealableItemBatch','StealEmpty','getArmorIdWithName','dropItems','DZbvz','processStealItemsSuccessEquipDebuff','glQqW','onEnemyOk','StealData','prototype','map','registerSnatchTarget','kind','processStealItemsNothingPopup','isSnatchEffect','isEnemy','Popup','Game_Enemy_setup','addWindow','ShowMessages','hideSubInputWindows','_stealableItems','_enemy','VisuMZ_3_EnemyLevels','GOLD','max','XukXa','setupTextPopup','gainItem','OHtVx','StealRate','ARMOR','clamp','processStealItemsNothingSFX','Enemy-%1-%2','makeDropItems','enemy','forceSelect','currencyUnit','snatchGoldIcon','gold','processStealItemsAttempt','Skill-%1-%2','ITEM','Scene_Battle_isAnyInputWindowActive','Armor-%1-%2','show','ARRAYEVAL','irhHH','ParseStealObject','Game_Enemy_setupEnemyLevels','empty','FyotB','GoldHelp','startStealSnatchSelection','_logWindow','FUNC','snatchAlreadyStolen','STRUCT','processStealItemsSuccessSFX','Scene_Boot_onDatabaseLoaded','applyItemUserEffect','zFHNu','_stealSnatchWindow','processStealItemsNothingJS','Actor-%1-%2','_numberWidth','processStealItemsFailure','_lines','process_VisuMZ_StealItems_JS','FailureTextColor','enemyIndex','setItem','drawTextEx','processStealItemsSuccessPopup','createStealPlus','_weaponIDs','hide','EDuaF','setupIconTextPopup','Gzesn','VisuMZ_4_ExtraEnemyDrops','%1_pan','QMrbY','random','version','getStealableItems','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','subject','traitObjects'];(function(_0x1541c7,_0x41da03){const _0x57158f=function(_0x10b025){while(--_0x10b025){_0x1541c7['push'](_0x1541c7['shift']());}};_0x57158f(++_0x41da03);}(_0x5715,0xf3));const _0x10b0=function(_0x1541c7,_0x41da03){_0x1541c7=_0x1541c7-0x90;let _0x57158f=_0x5715[_0x1541c7];return _0x57158f;};const _0x42ab40=_0x10b0;var label=_0x42ab40(0x104),tier=tier||0x0,dependencies=[_0x42ab40(0x19d)],pluginData=$plugins[_0x42ab40(0x12d)](function(_0x39aace){const _0x15ad35=_0x42ab40;return _0x39aace['status']&&_0x39aace[_0x15ad35(0x196)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x42ab40(0x13f)]=VisuMZ[label][_0x42ab40(0x13f)]||{},VisuMZ[_0x42ab40(0x199)]=function(_0x331461,_0x55a330){const _0x5b0325=_0x42ab40;for(const _0x33d2cc in _0x55a330){if(_0x33d2cc[_0x5b0325(0x162)](/(.*):(.*)/i)){if(_0x5b0325(0x13a)==='PABRE'){function _0x53b2b5(){const _0x5f29e9=_0x5b0325;_0xb22f7a[_0x5f29e9(0x15b)]=_0x5f29e9(0x9d),_0x2c6392['id']=_0x1697da[_0x5f29e9(0xcd)](_0x9145d7['$1']);}}else{const _0x506e39=String(RegExp['$1']),_0x49e1de=String(RegExp['$2'])[_0x5b0325(0xe1)]()[_0x5b0325(0x155)]();let _0x3b946b,_0x16c6f1,_0x1661d8;switch(_0x49e1de){case _0x5b0325(0xde):_0x3b946b=_0x55a330[_0x33d2cc]!==''?Number(_0x55a330[_0x33d2cc]):0x0;break;case'ARRAYNUM':_0x16c6f1=_0x55a330[_0x33d2cc]!==''?JSON[_0x5b0325(0x158)](_0x55a330[_0x33d2cc]):[],_0x3b946b=_0x16c6f1['map'](_0x4fc8a2=>Number(_0x4fc8a2));break;case _0x5b0325(0x171):_0x3b946b=_0x55a330[_0x33d2cc]!==''?eval(_0x55a330[_0x33d2cc]):null;break;case _0x5b0325(0xa1):_0x16c6f1=_0x55a330[_0x33d2cc]!==''?JSON['parse'](_0x55a330[_0x33d2cc]):[],_0x3b946b=_0x16c6f1[_0x5b0325(0x1ab)](_0x4c05f4=>eval(_0x4c05f4));break;case'JSON':_0x3b946b=_0x55a330[_0x33d2cc]!==''?JSON[_0x5b0325(0x158)](_0x55a330[_0x33d2cc]):'';break;case _0x5b0325(0x140):_0x16c6f1=_0x55a330[_0x33d2cc]!==''?JSON[_0x5b0325(0x158)](_0x55a330[_0x33d2cc]):[],_0x3b946b=_0x16c6f1[_0x5b0325(0x1ab)](_0x18c287=>JSON[_0x5b0325(0x158)](_0x18c287));break;case _0x5b0325(0xaa):_0x3b946b=_0x55a330[_0x33d2cc]!==''?new Function(JSON[_0x5b0325(0x158)](_0x55a330[_0x33d2cc])):new Function('return\x200');break;case _0x5b0325(0x18e):_0x16c6f1=_0x55a330[_0x33d2cc]!==''?JSON[_0x5b0325(0x158)](_0x55a330[_0x33d2cc]):[],_0x3b946b=_0x16c6f1['map'](_0x3e8ee3=>new Function(JSON[_0x5b0325(0x158)](_0x3e8ee3)));break;case _0x5b0325(0xfe):_0x3b946b=_0x55a330[_0x33d2cc]!==''?String(_0x55a330[_0x33d2cc]):'';break;case'ARRAYSTR':_0x16c6f1=_0x55a330[_0x33d2cc]!==''?JSON[_0x5b0325(0x158)](_0x55a330[_0x33d2cc]):[],_0x3b946b=_0x16c6f1[_0x5b0325(0x1ab)](_0x4f0895=>String(_0x4f0895));break;case _0x5b0325(0xac):_0x1661d8=_0x55a330[_0x33d2cc]!==''?JSON[_0x5b0325(0x158)](_0x55a330[_0x33d2cc]):{},_0x3b946b=VisuMZ[_0x5b0325(0x199)]({},_0x1661d8);break;case _0x5b0325(0x120):_0x16c6f1=_0x55a330[_0x33d2cc]!==''?JSON['parse'](_0x55a330[_0x33d2cc]):[],_0x3b946b=_0x16c6f1[_0x5b0325(0x1ab)](_0x3de795=>VisuMZ['ConvertParams']({},JSON['parse'](_0x3de795)));break;default:continue;}_0x331461[_0x506e39]=_0x3b946b;}}}return _0x331461;},(_0x454e10=>{const _0xed4623=_0x42ab40,_0xb7fe3c=_0x454e10[_0xed4623(0x19b)];for(const _0xa545d4 of dependencies){if(_0xed4623(0x170)===_0xed4623(0x170)){if(!Imported[_0xa545d4]){if('CaJLz'==='GlPII'){function _0x484083(){const _0x2015ea=_0xed4623;this[_0x2015ea(0x112)](...arguments);}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xed4623(0x11c)](_0xb7fe3c,_0xa545d4)),SceneManager[_0xed4623(0x117)]();break;}}}else{function _0x454b3e(){const _0x8b0acd=_0xed4623;_0x42d4ad=['GOLD',_0x8b0acd(0x9d),'WEAPON',_0x8b0acd(0x91)];if(_0x563c5f[_0x8b0acd(0x162)](/([\+\-]\d+)([%％])/i))_0x14829f[_0x8b0acd(0x187)]+=_0x23ee5e(_0x110eba['$1'])*0.01;else _0x47c30a[_0x8b0acd(0x162)](/(\d+)([%％])/i)&&(_0x36ea1e[_0x8b0acd(0x187)]*=_0x8ad257(_0x2c4d32['$1'])*0.01);}}}const _0x4ccc89=_0x454e10[_0xed4623(0x196)];if(_0x4ccc89[_0xed4623(0x162)](/\[Version[ ](.*?)\]/i)){if(_0xed4623(0x16c)==='hYpgH'){function _0x11f42e(){const _0x1395f5=_0xed4623;return this[_0x1395f5(0xd1)](_0x4b0869,_0x15cbd5);}}else{const _0x113c0f=Number(RegExp['$1']);_0x113c0f!==VisuMZ[label][_0xed4623(0xc7)]&&(alert(_0xed4623(0xc9)[_0xed4623(0x11c)](_0xb7fe3c,_0x113c0f)),SceneManager['exit']());}}if(_0x4ccc89['match'](/\[Tier[ ](\d+)\]/i)){const _0x162bd7=Number(RegExp['$1']);if(_0x162bd7<tier){if('szshU'===_0xed4623(0x10f))alert(_0xed4623(0x148)[_0xed4623(0x11c)](_0xb7fe3c,_0x162bd7,tier)),SceneManager['exit']();else{function _0x388075(){const _0x190d4a=_0xed4623;_0x440a16[_0x190d4a(0x104)][_0x190d4a(0xfc)][_0x190d4a(0x154)](this);}}}else tier=Math[_0xed4623(0x1ba)](_0x162bd7,tier);}VisuMZ[_0xed4623(0x199)](VisuMZ[label][_0xed4623(0x13f)],_0x454e10[_0xed4623(0x136)]);})(pluginData),VisuMZ[_0x42ab40(0x104)][_0x42ab40(0xae)]=Scene_Boot[_0x42ab40(0x1aa)][_0x42ab40(0x188)],Scene_Boot[_0x42ab40(0x1aa)]['onDatabaseLoaded']=function(){const _0x133810=_0x42ab40;VisuMZ[_0x133810(0x104)]['Scene_Boot_onDatabaseLoaded'][_0x133810(0x154)](this),this['process_VisuMZ_StealItems']();},Scene_Boot[_0x42ab40(0x1aa)][_0x42ab40(0xf5)]=function(){if(VisuMZ['ParseAllNotetags'])return;this['process_VisuMZ_StealItems_JS']();},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x15a)]={'StealAction1':/<STEAL>/i,'StealAction2':/<STEAL[ ](.*)>/gi,'Snatch':/<(?:SNATCH|TARGETING STEAL)>/i,'JsStealRate':/<JS STEAL RATE>\s*([\s\S]*)\s*<\/JS STEAL RATE>/i,'JsOnStealSuccess':/<JS ON STEAL SUCCESS>\s*([\s\S]*)\s*<\/JS ON STEAL SUCCESS>/i,'JsOnStealFail':/<JS ON STEAL FAILURE>\s*([\s\S]*)\s*<\/JS ON STEAL FAILURE>/i,'JsOnStealNothing':/<JS ON STEAL EMPTY>\s*([\s\S]*)\s*<\/JS ON STEAL EMPTY>/i,'StealableItemSingle':/<STEAL[ ](.*):[ ](.*)([%％])>/gi,'StealableItemBatch':/<STEAL>\s*([\s\S]*)\s*<\/STEAL>/i,'StealRate':/<STEAL RATE:[ ](\d+)([%％])>/i,'StealPlus':/<STEAL RATE:[ ]([\+\-]\d+)([%％])>/i,'StealResist':/<STEAL RESIST:[ ]([\+\-]\d+)([%％])>/i},Scene_Boot[_0x42ab40(0x1aa)][_0x42ab40(0xb7)]=function(){const _0x3f7daa=_0x42ab40,_0x587943=$dataSkills[_0x3f7daa(0x197)]($dataItems);for(const _0x3a8c33 of _0x587943){if(!_0x3a8c33)continue;VisuMZ['StealItems'][_0x3f7daa(0xd5)](_0x3a8c33);}},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x14b)]=VisuMZ[_0x42ab40(0x14b)],VisuMZ[_0x42ab40(0x14b)]=function(_0x4336f6){const _0x35e75f=_0x42ab40;VisuMZ[_0x35e75f(0x104)][_0x35e75f(0x14b)][_0x35e75f(0x154)](this,_0x4336f6),VisuMZ[_0x35e75f(0x104)]['Parse_Notetags_JS'](_0x4336f6);},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x173)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x42ab40(0x173)]=function(_0xc0132b){const _0x647517=_0x42ab40;VisuMZ[_0x647517(0x104)][_0x647517(0x173)][_0x647517(0x154)](this,_0xc0132b),VisuMZ['StealItems'][_0x647517(0xd5)](_0xc0132b);},VisuMZ['StealItems'][_0x42ab40(0xd5)]=function(_0x2eebdc){const _0xdc849e=_0x42ab40,_0x1ec837=VisuMZ[_0xdc849e(0x104)][_0xdc849e(0x15a)];let _0x4cf881=_0xdc849e(0xe8),_0x8dbcb3=_0x1ec837['JsStealRate'];VisuMZ[_0xdc849e(0x104)]['createStealRateJS'](_0x2eebdc,_0x4cf881,_0x8dbcb3),_0x4cf881=_0xdc849e(0x1a0),_0x8dbcb3=_0x1ec837[_0xdc849e(0x1a0)],VisuMZ['StealItems']['createOnStealJS'](_0x2eebdc,_0x4cf881,_0x8dbcb3),_0x4cf881=_0xdc849e(0x131),_0x8dbcb3=_0x1ec837[_0xdc849e(0x131)],VisuMZ[_0xdc849e(0x104)]['createOnStealJS'](_0x2eebdc,_0x4cf881,_0x8dbcb3),_0x4cf881=_0xdc849e(0x128),_0x8dbcb3=_0x1ec837[_0xdc849e(0x128)],VisuMZ[_0xdc849e(0x104)][_0xdc849e(0x17c)](_0x2eebdc,_0x4cf881,_0x8dbcb3);},VisuMZ[_0x42ab40(0x104)]['JS']={},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x16e)]=function(_0x43445b,_0x2adfbe,_0x132c21){const _0x55e0c3=_0x42ab40,_0x244d31=_0x43445b['note'];if(_0x244d31[_0x55e0c3(0x162)](_0x132c21)){const _0x307398=String(RegExp['$1']),_0x4002cb='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x55e0c3(0x11c)](_0x307398),_0x55d2d3=VisuMZ[_0x55e0c3(0x104)][_0x55e0c3(0x123)](_0x43445b,_0x2adfbe);console['log'](_0x55d2d3),VisuMZ[_0x55e0c3(0x104)]['JS'][_0x55d2d3]=new Function(_0x4002cb);}},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x17c)]=function(_0x1db2f5,_0x5ae930,_0x295823){const _0x5ddfd6=_0x42ab40,_0x37ab8f=_0x1db2f5[_0x5ddfd6(0x180)];if(_0x37ab8f['match'](_0x295823)){if('glQqW'===_0x5ddfd6(0x1a7)){const _0x29b3eb=String(RegExp['$1']),_0x3ec977='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20gold\x20=\x20arguments[3];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5ddfd6(0x11c)](_0x29b3eb),_0x5830d2=VisuMZ[_0x5ddfd6(0x104)][_0x5ddfd6(0x123)](_0x1db2f5,_0x5ae930);VisuMZ[_0x5ddfd6(0x104)]['JS'][_0x5830d2]=new Function(_0x3ec977);}else{function _0x98c3cd(){const _0x5d9497=_0x5ddfd6;_0x46fe1a[_0x5d9497(0x9a)]+=_0x438f8d(_0x83d00e['$1'])*0.01;}}}},VisuMZ['StealItems'][_0x42ab40(0x123)]=function(_0x243351,_0x51e0d8){const _0x5837ac=_0x42ab40;let _0x2a20a6='';if($dataActors['includes'](_0x243351))_0x2a20a6=_0x5837ac(0xb3)['format'](_0x243351['id'],_0x51e0d8);if($dataClasses[_0x5837ac(0xe3)](_0x243351))_0x2a20a6='Class-%1-%2'[_0x5837ac(0x11c)](_0x243351['id'],_0x51e0d8);if($dataSkills['includes'](_0x243351))_0x2a20a6=_0x5837ac(0x9c)[_0x5837ac(0x11c)](_0x243351['id'],_0x51e0d8);if($dataItems['includes'](_0x243351))_0x2a20a6=_0x5837ac(0x11f)[_0x5837ac(0x11c)](_0x243351['id'],_0x51e0d8);if($dataWeapons[_0x5837ac(0xe3)](_0x243351))_0x2a20a6=_0x5837ac(0x147)[_0x5837ac(0x11c)](_0x243351['id'],_0x51e0d8);if($dataArmors[_0x5837ac(0xe3)](_0x243351))_0x2a20a6=_0x5837ac(0x9f)[_0x5837ac(0x11c)](_0x243351['id'],_0x51e0d8);if($dataEnemies['includes'](_0x243351))_0x2a20a6='Enemy-%1-%2'[_0x5837ac(0x11c)](_0x243351['id'],_0x51e0d8);if($dataStates[_0x5837ac(0xe3)](_0x243351))_0x2a20a6=_0x5837ac(0x184)[_0x5837ac(0x11c)](_0x243351['id'],_0x51e0d8);return _0x2a20a6;},DataManager[_0x42ab40(0xcd)]=function(_0x565904){const _0x421437=_0x42ab40;_0x565904=_0x565904[_0x421437(0xe1)]()[_0x421437(0x155)](),this[_0x421437(0x102)]=this[_0x421437(0x102)]||{};if(this[_0x421437(0x102)][_0x565904])return this[_0x421437(0x102)][_0x565904];for(const _0x5741b0 of $dataItems){if(!_0x5741b0)continue;this['_itemIDs'][_0x5741b0[_0x421437(0x19b)][_0x421437(0xe1)]()['trim']()]=_0x5741b0['id'];}return this['_itemIDs'][_0x565904]||0x0;},DataManager[_0x42ab40(0x164)]=function(_0x49ced9){const _0x58cdcd=_0x42ab40;_0x49ced9=_0x49ced9['toUpperCase']()['trim'](),this['_weaponIDs']=this[_0x58cdcd(0xbe)]||{};if(this[_0x58cdcd(0xbe)][_0x49ced9])return this[_0x58cdcd(0xbe)][_0x49ced9];for(const _0x40bcf2 of $dataWeapons){if(!_0x40bcf2)continue;this[_0x58cdcd(0xbe)][_0x40bcf2['name'][_0x58cdcd(0xe1)]()[_0x58cdcd(0x155)]()]=_0x40bcf2['id'];}return this[_0x58cdcd(0xbe)][_0x49ced9]||0x0;},DataManager[_0x42ab40(0x1a3)]=function(_0x5a672e){const _0x48a797=_0x42ab40;_0x5a672e=_0x5a672e[_0x48a797(0xe1)]()[_0x48a797(0x155)](),this['_armorIDs']=this[_0x48a797(0xe4)]||{};if(this['_armorIDs'][_0x5a672e])return this[_0x48a797(0xe4)][_0x5a672e];for(const _0x30c5b2 of $dataArmors){if(!_0x30c5b2)continue;this['_armorIDs'][_0x30c5b2['name'][_0x48a797(0xe1)]()['trim']()]=_0x30c5b2['id'];}return this[_0x48a797(0xe4)][_0x5a672e]||0x0;},ImageManager[_0x42ab40(0x99)]=Imported[_0x42ab40(0x126)]?VisuMZ[_0x42ab40(0x13b)][_0x42ab40(0x13f)][_0x42ab40(0x19c)][_0x42ab40(0xd0)]:VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x13f)][_0x42ab40(0x157)]['GoldIcon'],TextManager[_0x42ab40(0x182)]=VisuMZ[_0x42ab40(0x104)]['Settings'][_0x42ab40(0x157)][_0x42ab40(0x166)],TextManager[_0x42ab40(0x149)]=VisuMZ['StealItems'][_0x42ab40(0x13f)][_0x42ab40(0x157)][_0x42ab40(0xa7)],TextManager['snatchAlreadyStolen']=VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x13f)][_0x42ab40(0x157)][_0x42ab40(0x16a)],VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x13d)]=Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0xaf)],Game_Action[_0x42ab40(0x1aa)]['applyItemUserEffect']=function(_0x466d99){const _0x3a6d1f=_0x42ab40;VisuMZ[_0x3a6d1f(0x104)]['Game_Action_applyItemUserEffect'][_0x3a6d1f(0x154)](this,_0x466d99),this[_0x3a6d1f(0x18f)](_0x466d99);},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x18f)]=function(_0x3e431e){const _0x1813aa=_0x42ab40;if(!this[_0x1813aa(0x168)]())return;if(!_0x3e431e[_0x1813aa(0x1b0)]())return;if(this[_0x1813aa(0xca)]()[_0x1813aa(0x1b0)]())return;const _0xbe56a=VisuMZ[_0x1813aa(0x104)][_0x1813aa(0xcf)](this,_0x3e431e);if(_0xbe56a[_0x1813aa(0x122)][_0x1813aa(0x14c)]<=0x0)return;const _0x3b26eb=_0x3e431e[_0x1813aa(0xc8)]();if(_0x3b26eb[_0x1813aa(0x14c)]<=0x0)return;let _0x57dd7e=[];if(this[_0x1813aa(0x1af)]())_0x57dd7e=this[_0x1813aa(0xd7)](_0x3e431e);else{if(_0x1813aa(0x15c)===_0x1813aa(0x119)){function _0x22a3c2(){const _0x4cf800=_0x1813aa,_0xd0c496={'type':_0x4cf800(0x1b9),'id':_0x3ca19d[_0x4cf800(0x9a)],'rate':_0xef5d60[_0x4cf800(0xf9)],'stolen':![],'drop':!![]};_0x410490[_0x4cf800(0x104)][_0x4cf800(0x1a9)][_0x4ab5d8['id']][_0x4cf800(0xe7)](_0xd0c496);}}else _0x57dd7e=_0x3b26eb[_0x1813aa(0x12d)](_0x674b21=>{const _0x58c9e8=_0x1813aa;return _0xbe56a[_0x58c9e8(0x122)]['includes'](_0x674b21[_0x58c9e8(0x15b)]);});}_0x57dd7e=_0x57dd7e[_0x1813aa(0x12d)](_0x30939e=>{const _0x15b445=_0x1813aa;return!_0x30939e[_0x15b445(0x129)];});if(_0x57dd7e[_0x1813aa(0x14c)]<=0x0){if(_0x1813aa(0xfa)===_0x1813aa(0x18c)){function _0x2f1a6d(){const _0x1e8bf9=_0x1813aa;_0x13452b+=_0x3d78ac[_0x1e8bf9(0x150)][_0x1e8bf9(0x154)](this);}}else return this[_0x1813aa(0xf4)](_0x3e431e);}this[_0x1813aa(0x9b)](_0x3e431e,_0xbe56a,_0x57dd7e);},VisuMZ['StealItems'][_0x42ab40(0xcf)]=function(_0x491dad,_0x1ae2ac){const _0x1aaf81=_0x42ab40,_0x3063d1=VisuMZ['StealItems'][_0x1aaf81(0x15a)],_0xa152d=_0x491dad[_0x1aaf81(0x168)]()[_0x1aaf81(0x180)];let _0x288c91=[],_0x47b265={'all':_0x491dad[_0x1aaf81(0xca)]()[_0x1aaf81(0x198)](),'gold':0x1,'item':0x1,'weapon':0x1,'armor':0x1},_0xa54354={'all':_0x491dad[_0x1aaf81(0xca)]()[_0x1aaf81(0x105)]()-_0x1ae2ac['stealResist'](),'gold':0x0,'item':0x0,'weapon':0x0,'armor':0x0};if(_0xa152d[_0x1aaf81(0x162)](_0x3063d1[_0x1aaf81(0x161)])){if('tLuNQ'===_0x1aaf81(0xef))_0x288c91=['GOLD','ITEM',_0x1aaf81(0x17f),_0x1aaf81(0x91)];else{function _0x1c416e(){const _0x6d27e9=_0x1aaf81,_0x1865ab=_0x4305b2[_0x6d27e9(0xfd)],_0x44c587=_0x57622d[_0x6d27e9(0x12a)]['_logWindow'];if(_0x44c587&&_0x1865ab!=='')_0x44c587[_0x6d27e9(0x115)](_0x1865ab);}}}const _0x10d629=_0xa152d[_0x1aaf81(0x162)](_0x3063d1[_0x1aaf81(0x194)]);if(_0x10d629)for(const _0xd38bed of _0x10d629){if(!_0xd38bed)continue;if(_0xd38bed[_0x1aaf81(0x162)](/ALL/i)){_0x288c91=[_0x1aaf81(0x1b9),_0x1aaf81(0x9d),'WEAPON',_0x1aaf81(0x91)];if(_0xd38bed[_0x1aaf81(0x162)](/([\+\-]\d+)([%％])/i))_0xa54354[_0x1aaf81(0x187)]+=Number(RegExp['$1'])*0.01;else _0xd38bed['match'](/(\d+)([%％])/i)&&(_0x47b265['all']*=Number(RegExp['$1'])*0.01);}if(_0xd38bed[_0x1aaf81(0x162)](/GOLD/i)){if(_0x1aaf81(0x17e)!==_0x1aaf81(0x17e)){function _0x59316a(){const _0x24a971=_0x1aaf81,_0x5e1b20=this[_0x24a971(0x96)]();if(!_0x5e1b20)return;this[_0x24a971(0x1b6)]=_0x20f24c[_0x24a971(0x104)][_0x24a971(0x14a)](this,_0x5e1b20);}}else{_0x288c91[_0x1aaf81(0xe7)](_0x1aaf81(0x1b9));if(_0xd38bed[_0x1aaf81(0x162)](/([\+\-]\d+)([%％])/i))_0xa54354[_0x1aaf81(0x9a)]+=Number(RegExp['$1'])*0.01;else _0xd38bed[_0x1aaf81(0x162)](/(\d+)([%％])/i)&&(_0x47b265[_0x1aaf81(0x9a)]*=Number(RegExp['$1'])*0.01);}}if(_0xd38bed[_0x1aaf81(0x162)](/ITEM/i)){if('zRtCG'!==_0x1aaf81(0x101)){function _0x2e8e20(){const _0x25e1db=_0x1aaf81,_0xd1b7e7=_0x4cde89[_0x25e1db(0x104)][_0x25e1db(0x15a)];let _0x53ab08=_0x25e1db(0xe8),_0x48fdf4=_0xd1b7e7['JsStealRate'];_0x54a3c9[_0x25e1db(0x104)]['createStealRateJS'](_0x2a0344,_0x53ab08,_0x48fdf4),_0x53ab08=_0x25e1db(0x1a0),_0x48fdf4=_0xd1b7e7[_0x25e1db(0x1a0)],_0x14bff5[_0x25e1db(0x104)][_0x25e1db(0x17c)](_0x5ab655,_0x53ab08,_0x48fdf4),_0x53ab08=_0x25e1db(0x131),_0x48fdf4=_0xd1b7e7[_0x25e1db(0x131)],_0x5045dc['StealItems'][_0x25e1db(0x17c)](_0xd614b0,_0x53ab08,_0x48fdf4),_0x53ab08=_0x25e1db(0x128),_0x48fdf4=_0xd1b7e7['JsOnStealNothing'],_0x2b566c[_0x25e1db(0x104)][_0x25e1db(0x17c)](_0x28d362,_0x53ab08,_0x48fdf4);}}else{_0x288c91[_0x1aaf81(0xe7)]('ITEM');if(_0xd38bed[_0x1aaf81(0x162)](/([\+\-]\d+)([%％])/i))_0xa54354['item']+=Number(RegExp['$1'])*0.01;else _0xd38bed[_0x1aaf81(0x162)](/(\d+)([%％])/i)&&(_0x47b265[_0x1aaf81(0x168)]*=Number(RegExp['$1'])*0.01);}}if(_0xd38bed[_0x1aaf81(0x162)](/WEAPON/i)){_0x288c91[_0x1aaf81(0xe7)](_0x1aaf81(0x17f));if(_0xd38bed[_0x1aaf81(0x162)](/([\+\-]\d+)([%％])/i)){if('WgldM'!==_0x1aaf81(0x191)){function _0x4004a0(){const _0x253e74=_0x1aaf81;_0x5ab738=_0x27a6ac[_0x253e74(0x12d)](_0x527de5=>{const _0x2768ab=_0x253e74;return _0x3b1257[_0x2768ab(0x122)][_0x2768ab(0xe3)](_0x527de5[_0x2768ab(0x15b)]);});}}else _0xa54354[_0x1aaf81(0x17b)]+=Number(RegExp['$1'])*0.01;}else{if(_0xd38bed[_0x1aaf81(0x162)](/(\d+)([%％])/i)){if(_0x1aaf81(0xa2)!==_0x1aaf81(0x127))_0x47b265[_0x1aaf81(0x17b)]*=Number(RegExp['$1'])*0.01;else{function _0x196276(){const _0x37d9ab=_0x1aaf81;_0x143291[_0x37d9ab(0x104)]['JS'][_0x341cfc]['call'](this,this[_0x37d9ab(0xca)](),_0x5075b3,_0x24637d,_0x7be325);}}}}}if(_0xd38bed[_0x1aaf81(0x162)](/ARMOR/i)){_0x288c91[_0x1aaf81(0xe7)]('ARMOR');if(_0xd38bed['match'](/([\+\-]\d+)([%％])/i)){if(_0x1aaf81(0x17a)==='bBiDn'){function _0x1765c6(){_0x169139=_0x396d00[_0x43afca['id']];}}else _0xa54354[_0x1aaf81(0x125)]+=Number(RegExp['$1'])*0.01;}else _0xd38bed['match'](/(\d+)([%％])/i)&&(_0x47b265[_0x1aaf81(0x125)]*=Number(RegExp['$1'])*0.01);}}return{'types':_0x288c91,'rate':_0x47b265,'plus':_0xa54354};},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x14f)]=function(_0x419d1f){const _0x26ee0f=_0x42ab40;var _0x19c85a,_0x36ecc6,_0x21b589;for(_0x21b589=_0x419d1f[_0x26ee0f(0x14c)]-0x1;_0x21b589>0x0;_0x21b589--){_0x19c85a=Math['floor'](Math[_0x26ee0f(0xc6)]()*(_0x21b589+0x1)),_0x36ecc6=_0x419d1f[_0x21b589],_0x419d1f[_0x21b589]=_0x419d1f[_0x19c85a],_0x419d1f[_0x19c85a]=_0x36ecc6;}return _0x419d1f;},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x9b)]=function(_0x1b40aa,_0x1a0816,_0x1e1d86){const _0xcbcc1=_0x42ab40;VisuMZ[_0xcbcc1(0x104)][_0xcbcc1(0x14f)](_0x1e1d86),this['makeSuccess'](_0x1b40aa);for(const _0x51a4cf of _0x1e1d86){if(!_0x51a4cf)continue;let _0x8b29d7=_0x1a0816[_0xcbcc1(0x179)][_0xcbcc1(0x187)]*_0x51a4cf[_0xcbcc1(0x179)],_0x108cde=_0x1a0816['plus'][_0xcbcc1(0x187)];_0x8b29d7*=_0x1a0816[_0xcbcc1(0x179)][_0x51a4cf['type'][_0xcbcc1(0x167)]()],_0x108cde+=_0x1a0816[_0xcbcc1(0x11a)][_0x51a4cf[_0xcbcc1(0x15b)][_0xcbcc1(0x167)]()];const _0x2d3324=_0x8b29d7+_0x108cde;if(Math[_0xcbcc1(0xc6)]()<_0x2d3324)return this[_0xcbcc1(0xd1)](_0x1b40aa,_0x51a4cf);}this[_0xcbcc1(0xb5)](_0x1b40aa);},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x1af)]=function(){const _0x1a27c3=_0x42ab40;if(!this['isForOne']())return![];if(!this['isForOpponent']())return![];if(!this[_0x1a27c3(0x107)]())return![];const _0xaaaf5b=VisuMZ[_0x1a27c3(0x104)][_0x1a27c3(0x15a)],_0x2152db=this[_0x1a27c3(0x168)]()['note'];return _0x2152db[_0x1a27c3(0x162)](_0xaaaf5b['Snatch'])&&(_0x2152db['match'](_0xaaaf5b[_0x1a27c3(0x161)])||_0x2152db[_0x1a27c3(0x162)](_0xaaaf5b[_0x1a27c3(0x194)]));},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x1ac)]=function(_0x51ced1,_0x49fa9c){const _0x347cb8=_0x42ab40;this[_0x347cb8(0xd9)]=_0x51ced1[_0x347cb8(0x139)]();const _0x15dea9=_0x51ced1[_0x347cb8(0xc8)]();this[_0x347cb8(0x190)]=_0x15dea9[_0x347cb8(0xf2)](_0x49fa9c);},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0xd7)]=function(_0x745c15){const _0xb3cbd1=_0x42ab40;if(_0x745c15[_0xb3cbd1(0x139)]()!==this[_0xb3cbd1(0xd9)])return[];this['_snatchItemIndex']=this['_snatchItemIndex']||0x0;const _0x472bba=_0x745c15['getStealableItems']();return[_0x472bba[this['_snatchItemIndex']]];},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0xd1)]=function(_0x38d26e,_0x334acb){const _0x201279=_0x42ab40;_0x334acb[_0x201279(0x129)]=!![],this['processStealItemsSuccessLogWindow'](_0x38d26e,_0x334acb),this[_0x201279(0xad)](_0x334acb),this[_0x201279(0xbc)](_0x38d26e,_0x334acb),this['processStealItemsSuccessEquipDebuff'](_0x38d26e,_0x334acb),this[_0x201279(0xf7)](_0x38d26e,_0x334acb);},Game_Action['prototype'][_0x42ab40(0x160)]=function(_0x260d16,_0x198d2d){const _0x259fd2=_0x42ab40,_0x161d66=VisuMZ[_0x259fd2(0x104)][_0x259fd2(0x13f)][_0x259fd2(0xe6)];if(_0x161d66['ShowMessages']){let _0x456aa0=_0x161d66[_0x259fd2(0xeb)],_0xb96127='';if(_0x198d2d[_0x259fd2(0x15b)]===_0x259fd2(0x1b9))$gameParty[_0x259fd2(0xf3)](_0x198d2d['id']),_0x456aa0=_0x161d66[_0x259fd2(0xda)],_0xb96127=_0x456aa0[_0x259fd2(0x11c)](TextManager[_0x259fd2(0x98)],_0x198d2d['id']),Imported[_0x259fd2(0xc3)]&&(_0x260d16[_0x259fd2(0x163)]=_0x260d16[_0x259fd2(0x163)]||{},_0x260d16['_visualDrops'][_0x259fd2(0x9a)]=0x0);else{if(_0x198d2d['type']===_0x259fd2(0x9d)){if('WIBzI'!=='LrTNK'){const _0x17dafd=$dataItems[_0x198d2d['id']];if(!_0x17dafd)return;$gameParty[_0x259fd2(0x1bd)](_0x17dafd,0x1);const _0x391212=_0x259fd2(0x10a)[_0x259fd2(0x11c)](_0x17dafd['iconIndex']);_0xb96127=_0x456aa0[_0x259fd2(0x11c)](_0x17dafd[_0x259fd2(0x19b)],_0x391212);}else{function _0x1885c0(){const _0x3ce5d5=_0x259fd2;return this[_0x3ce5d5(0xf4)](_0x370719);}}}else{if(_0x198d2d[_0x259fd2(0x15b)]==='WEAPON'){if(_0x259fd2(0x1bb)==='XukXa'){const _0x25f6ca=$dataWeapons[_0x198d2d['id']];if(!_0x25f6ca)return;$gameParty[_0x259fd2(0x1bd)](_0x25f6ca,0x1);const _0x5a719f=_0x259fd2(0x10a)[_0x259fd2(0x11c)](_0x25f6ca['iconIndex']);_0xb96127=_0x456aa0[_0x259fd2(0x11c)](_0x25f6ca[_0x259fd2(0x19b)],_0x5a719f);}else{function _0x330820(){_0x5c6af5=_0x287bfd[_0x3ef3ef['id']];}}}else{if(_0x198d2d[_0x259fd2(0x15b)]===_0x259fd2(0x91)){const _0x5abc8a=$dataArmors[_0x198d2d['id']];if(!_0x5abc8a)return;$gameParty[_0x259fd2(0x1bd)](_0x5abc8a,0x1);const _0x5edfbf=_0x259fd2(0x10a)[_0x259fd2(0x11c)](_0x5abc8a[_0x259fd2(0x192)]);_0xb96127=_0x456aa0[_0x259fd2(0x11c)](_0x5abc8a[_0x259fd2(0x19b)],_0x5edfbf);}}}}const _0x37f2f1=SceneManager[_0x259fd2(0x12a)]['_logWindow'];if(_0x37f2f1&&_0xb96127!=='')_0x37f2f1[_0x259fd2(0x115)](_0xb96127);}},Game_Action[_0x42ab40(0x1aa)]['processStealItemsSuccessSFX']=function(_0x56ff31){const _0x3022cc=_0x42ab40,_0x2a763c=VisuMZ[_0x3022cc(0x104)][_0x3022cc(0x13f)][_0x3022cc(0x174)];if(!_0x2a763c)return;const _0x4388b2=_0x56ff31[_0x3022cc(0x15b)][_0x3022cc(0x167)]()[_0x3022cc(0x155)](),_0x455240={'name':_0x2a763c[_0x3022cc(0x135)[_0x3022cc(0x11c)](_0x4388b2)]||'','volume':_0x2a763c[_0x3022cc(0xff)[_0x3022cc(0x11c)](_0x4388b2)]||0x0,'pitch':_0x2a763c[_0x3022cc(0x13e)['format'](_0x4388b2)]||0x0,'pan':_0x2a763c['%1_pan'[_0x3022cc(0x11c)](_0x4388b2)]||0x0};if(_0x455240[_0x3022cc(0x19b)]!=='')AudioManager['playSe'](_0x455240);},Game_Action[_0x42ab40(0x1aa)]['processStealItemsSuccessPopup']=function(_0xb51db9,_0x42b228){const _0xfc375b=_0x42ab40;if(!_0x42b228)return;if(!_0xb51db9)return;const _0x5775cf=VisuMZ['StealItems'][_0xfc375b(0x13f)][_0xfc375b(0x1b1)];if(!_0x5775cf)return;if(_0x5775cf[_0xfc375b(0x175)]==='')return;const _0x322093=_0x5775cf[_0xfc375b(0x175)],_0x23ea4a={'textColor':_0x5775cf[_0xfc375b(0x18d)]||0x0,'flashColor':_0x5775cf['SuccessFlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x5775cf['SuccessFlashDuration']||0x3c};_0xb51db9[_0xfc375b(0x1bc)](_0x322093,_0x23ea4a);if(_0x5775cf[_0xfc375b(0x19a)]&&_0x42b228[_0xfc375b(0x15b)]!==_0xfc375b(0x1b9)){let _0x200120=null;if(_0x42b228[_0xfc375b(0x15b)]===_0xfc375b(0x9d))_0x200120=$dataItems[_0x42b228['id']];else{if(_0x42b228[_0xfc375b(0x15b)]==='WEAPON')_0x200120=$dataWeapons[_0x42b228['id']];else{if(_0x42b228[_0xfc375b(0x15b)]===_0xfc375b(0x91)){if(_0xfc375b(0xdf)==='JiBtn')_0x200120=$dataArmors[_0x42b228['id']];else{function _0x2f739c(){const _0x614149=_0xfc375b,_0x275e29=_0xd92dfa[_0x614149(0x1a2)],_0x3ec25a=_0x5d8d1e[_0x614149(0x12a)][_0x614149(0xa9)];if(_0x3ec25a&&_0x275e29!=='')_0x3ec25a[_0x614149(0x115)](_0x275e29);}}}}}_0x200120&&_0xb51db9[_0xfc375b(0xc1)](_0x200120[_0xfc375b(0x192)],_0x200120[_0xfc375b(0x19b)],_0x23ea4a);}},Game_Action['prototype'][_0x42ab40(0x1a6)]=function(_0x300ae1,_0x1339fb){const _0x38ab6c=_0x42ab40;if(!_0x300ae1)return;const _0x4322e2=VisuMZ['StealItems']['Settings']['Mechanics'];if(!_0x4322e2)return;if(!_0x4322e2['EquipDebuff'])return;if(!['WEAPON',_0x38ab6c(0x91)]['includes'](_0x1339fb[_0x38ab6c(0x15b)]))return;let _0x1547f4=null;if(_0x1339fb[_0x38ab6c(0x15b)]==='WEAPON'){if(_0x38ab6c(0xc2)===_0x38ab6c(0xc2))_0x1547f4=$dataWeapons[_0x1339fb['id']];else{function _0x929bac(){const _0x45e50d=_0x38ab6c;var _0x5c8d20,_0x58f146,_0x145d4e;for(_0x145d4e=_0x5104f7[_0x45e50d(0x14c)]-0x1;_0x145d4e>0x0;_0x145d4e--){_0x5c8d20=_0x2dff7f['floor'](_0x53a242[_0x45e50d(0xc6)]()*(_0x145d4e+0x1)),_0x58f146=_0x3b046c[_0x145d4e],_0x240d74[_0x145d4e]=_0x51a1b1[_0x5c8d20],_0x3f1f5c[_0x5c8d20]=_0x58f146;}return _0x455db5;}}}else _0x1339fb['type']===_0x38ab6c(0x91)&&(_0x1547f4=$dataArmors[_0x1339fb['id']]);if(!_0x1547f4)return;for(let _0xd84da5=0x0;_0xd84da5<0x8;_0xd84da5++){if(_0x38ab6c(0xe9)!==_0x38ab6c(0xec)){const _0x412bd4=_0x1547f4[_0x38ab6c(0x146)][_0xd84da5];_0x300ae1['addParam'](_0xd84da5,-_0x412bd4);}else{function _0x3a0de7(){const _0x27e246=_0x38ab6c;_0x5a6efe[_0x27e246(0x104)][_0x27e246(0x1b2)][_0x27e246(0x154)](this,_0x10ff79,_0x55e34f,_0x43b623),!_0x264026[_0x27e246(0x1b8)]&&this[_0x27e246(0x10d)]();}}}},Game_Action[_0x42ab40(0x1aa)]['processStealItemsSuccessJS']=function(_0x4e2097,_0xde4911){const _0x5a1036=_0x42ab40;if(!_0x4e2097)return;let _0x39dde8=null,_0x18e04e=0x0;if(_0xde4911[_0x5a1036(0x15b)]===_0x5a1036(0x1b9))_0x18e04e=_0xde4911['id'];else{if(_0xde4911[_0x5a1036(0x15b)]===_0x5a1036(0x9d))_0x39dde8=$dataItems[_0xde4911['id']];else{if(_0xde4911[_0x5a1036(0x15b)]===_0x5a1036(0x17f))_0x39dde8=$dataWeapons[_0xde4911['id']];else _0xde4911['type']==='ARMOR'&&(_0x39dde8=$dataArmors[_0xde4911['id']]);}}const _0x1d0f89=VisuMZ[_0x5a1036(0x104)][_0x5a1036(0x13f)][_0x5a1036(0x132)];_0x1d0f89&&_0x1d0f89[_0x5a1036(0x1a0)]&&_0x1d0f89[_0x5a1036(0x1a0)][_0x5a1036(0x154)](this,this[_0x5a1036(0xca)](),_0x4e2097,_0x39dde8,_0x18e04e);const _0x431b6c=VisuMZ[_0x5a1036(0x104)][_0x5a1036(0x123)](this[_0x5a1036(0x168)](),'JsOnStealSuccess');VisuMZ[_0x5a1036(0x104)]['JS'][_0x431b6c]&&VisuMZ[_0x5a1036(0x104)]['JS'][_0x431b6c][_0x5a1036(0x154)](this,this[_0x5a1036(0xca)](),_0x4e2097,_0x39dde8,_0x18e04e);},Game_Action['prototype']['processStealItemsFailure']=function(_0x28ec36){const _0x18691c=_0x42ab40;this[_0x18691c(0x133)](_0x28ec36),this[_0x18691c(0xf6)](),this['processStealItemsFailurePopup'](_0x28ec36),this[_0x18691c(0x16b)](_0x28ec36);},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x133)]=function(_0x58c184){const _0x3bb175=_0x42ab40,_0x4d0017=VisuMZ['StealItems']['Settings'][_0x3bb175(0xe6)];if(_0x4d0017['ShowMessages']){if(_0x3bb175(0xf8)!==_0x3bb175(0x11d)){const _0x2f55d2=_0x4d0017[_0x3bb175(0xfd)],_0x2ad17b=SceneManager[_0x3bb175(0x12a)]['_logWindow'];if(_0x2ad17b&&_0x2f55d2!=='')_0x2ad17b[_0x3bb175(0x115)](_0x2f55d2);}else{function _0x248e29(){const _0x21ba1a=_0x3bb175;this[_0x21ba1a(0xb6)][_0x21ba1a(0xe7)](_0xe69045),this[_0x21ba1a(0x12c)]();}}}},Game_Action[_0x42ab40(0x1aa)]['processStealItemsFailureSFX']=function(){const _0x206a58=_0x42ab40,_0x2f8bdc=VisuMZ[_0x206a58(0x104)][_0x206a58(0x13f)][_0x206a58(0x174)];if(!_0x2f8bdc)return;const _0x3b94a7=_0x206a58(0x13c),_0x4a39c1={'name':_0x2f8bdc[_0x206a58(0x135)['format'](_0x3b94a7)]||'','volume':_0x2f8bdc[_0x206a58(0xff)[_0x206a58(0x11c)](_0x3b94a7)]||0x0,'pitch':_0x2f8bdc[_0x206a58(0x13e)[_0x206a58(0x11c)](_0x3b94a7)]||0x0,'pan':_0x2f8bdc[_0x206a58(0xc4)[_0x206a58(0x11c)](_0x3b94a7)]||0x0};if(_0x4a39c1[_0x206a58(0x19b)]!=='')AudioManager[_0x206a58(0x12e)](_0x4a39c1);},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x152)]=function(_0x4b1fa2){const _0x595f76=_0x42ab40;if(!_0x4b1fa2)return;const _0xface79=VisuMZ[_0x595f76(0x104)][_0x595f76(0x13f)][_0x595f76(0x1b1)];if(!_0xface79)return;if(_0xface79[_0x595f76(0x134)]==='')return;const _0x5e60b8=_0xface79[_0x595f76(0x134)],_0x4008fc={'textColor':_0xface79[_0x595f76(0xb8)]||0x0,'flashColor':_0xface79['FailureFlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0xface79[_0x595f76(0x111)]||0x3c};_0x4b1fa2[_0x595f76(0x1bc)](_0x5e60b8,_0x4008fc);},Game_Action[_0x42ab40(0x1aa)]['processStealItemsFailureJS']=function(_0x310d6c){const _0x1f77b5=_0x42ab40;if(!_0x310d6c)return;const _0x4de3a6=VisuMZ[_0x1f77b5(0x104)][_0x1f77b5(0x13f)][_0x1f77b5(0x132)];if(_0x4de3a6&&_0x4de3a6[_0x1f77b5(0x131)]){if(_0x1f77b5(0xc5)===_0x1f77b5(0xc5))_0x4de3a6[_0x1f77b5(0x131)][_0x1f77b5(0x154)](this,this['subject'](),_0x310d6c);else{function _0x4a8429(){const _0xdc891c=_0x1f77b5;_0x416d70[_0xdc891c(0xe7)](_0xdc891c(0x17f));if(_0x1d48ea[_0xdc891c(0x162)](/([\+\-]\d+)([%％])/i))_0x2c4bb0['weapon']+=_0x543d0a(_0x3940f9['$1'])*0.01;else _0x2d518d[_0xdc891c(0x162)](/(\d+)([%％])/i)&&(_0x18a45d[_0xdc891c(0x17b)]*=_0x32e2fd(_0x2b70a4['$1'])*0.01);}}}const _0x44b5f5=VisuMZ['StealItems']['createKeyJS'](this['item'](),_0x1f77b5(0x131));VisuMZ[_0x1f77b5(0x104)]['JS'][_0x44b5f5]&&VisuMZ[_0x1f77b5(0x104)]['JS'][_0x44b5f5][_0x1f77b5(0x154)](this,this[_0x1f77b5(0xca)](),_0x310d6c);},Game_Action['prototype'][_0x42ab40(0xf4)]=function(_0x5c02ce){const _0x2206f2=_0x42ab40;this['processStealItemsNothingLogWindow'](_0x5c02ce),this[_0x2206f2(0x93)](),this[_0x2206f2(0x1ae)](_0x5c02ce),this[_0x2206f2(0xb2)](_0x5c02ce);},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x114)]=function(_0x3edf3c){const _0x470341=_0x42ab40,_0x30b31d=VisuMZ[_0x470341(0x104)][_0x470341(0x13f)][_0x470341(0xe6)];if(_0x30b31d[_0x470341(0x1b4)]){const _0x413999=_0x30b31d[_0x470341(0x1a2)],_0x24c289=SceneManager[_0x470341(0x12a)][_0x470341(0xa9)];if(_0x24c289&&_0x413999!=='')_0x24c289[_0x470341(0x115)](_0x413999);}},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x93)]=function(){const _0x348878=_0x42ab40,_0x4d6530=VisuMZ['StealItems'][_0x348878(0x13f)][_0x348878(0x174)];if(!_0x4d6530)return;const _0x36ef50=_0x348878(0xa5),_0x2d4eda={'name':_0x4d6530[_0x348878(0x135)[_0x348878(0x11c)](_0x36ef50)]||'','volume':_0x4d6530[_0x348878(0xff)[_0x348878(0x11c)](_0x36ef50)]||0x0,'pitch':_0x4d6530[_0x348878(0x13e)[_0x348878(0x11c)](_0x36ef50)]||0x0,'pan':_0x4d6530[_0x348878(0xc4)[_0x348878(0x11c)](_0x36ef50)]||0x0};if(_0x2d4eda[_0x348878(0x19b)]!=='')AudioManager[_0x348878(0x12e)](_0x2d4eda);},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0x1ae)]=function(_0x44d502){const _0x585278=_0x42ab40;if(!_0x44d502)return;const _0x790d17=VisuMZ[_0x585278(0x104)][_0x585278(0x13f)][_0x585278(0x1b1)];if(!_0x790d17)return;if(_0x790d17[_0x585278(0x134)]==='')return;const _0x3dd643=_0x790d17['EmptyPopupText'],_0x5ab12a={'textColor':_0x790d17[_0x585278(0x12f)]||0x0,'flashColor':_0x790d17['EmptyFlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x790d17[_0x585278(0x144)]||0x3c};_0x44d502['setupTextPopup'](_0x3dd643,_0x5ab12a);},Game_Action[_0x42ab40(0x1aa)][_0x42ab40(0xb2)]=function(_0x5c007c){const _0x1f33ee=_0x42ab40;if(!_0x5c007c)return;const _0x2c1343=VisuMZ[_0x1f33ee(0x104)]['Settings']['Mechanics'];if(_0x2c1343&&_0x2c1343[_0x1f33ee(0x110)]){if(_0x1f33ee(0xd6)===_0x1f33ee(0xd6))_0x2c1343[_0x1f33ee(0x110)][_0x1f33ee(0x154)](this,this[_0x1f33ee(0xca)](),_0x5c007c);else{function _0xb35733(){const _0x943579=_0x1f33ee,_0x1b028d=_0x4c851a[_0x1b5f25['id']];if(!_0x1b028d)return;_0x4efacd[_0x943579(0x1bd)](_0x1b028d,0x1);const _0x4d322b=_0x943579(0x10a)[_0x943579(0x11c)](_0x1b028d[_0x943579(0x192)]);_0x8d7160=_0x6934de[_0x943579(0x11c)](_0x1b028d[_0x943579(0x19b)],_0x4d322b);}}}const _0x36faa7=VisuMZ[_0x1f33ee(0x104)][_0x1f33ee(0x123)](this['item'](),_0x1f33ee(0x128));VisuMZ[_0x1f33ee(0x104)]['JS'][_0x36faa7]&&VisuMZ['StealItems']['JS'][_0x36faa7][_0x1f33ee(0x154)](this,this[_0x1f33ee(0xca)](),_0x5c007c);},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x18b)]=Game_BattlerBase[_0x42ab40(0x1aa)][_0x42ab40(0x12c)],Game_BattlerBase['prototype'][_0x42ab40(0x12c)]=function(){const _0x2d28f0=_0x42ab40;this['_cache']={},VisuMZ[_0x2d28f0(0x104)]['Game_BattlerBase_refresh'][_0x2d28f0(0x154)](this);},Game_BattlerBase[_0x42ab40(0x1aa)][_0x42ab40(0xce)]=function(_0x5f40c0){const _0x43b03a=_0x42ab40;return this[_0x43b03a(0xe2)]=this[_0x43b03a(0xe2)]||{},this['_cache'][_0x5f40c0]!==undefined;},Game_BattlerBase[_0x42ab40(0x1aa)][_0x42ab40(0x198)]=function(){const _0x4809f3=_0x42ab40;let _0x4b0127=_0x4809f3(0x198);if(this[_0x4809f3(0xce)](_0x4b0127))return this['_cache'][_0x4b0127];return this[_0x4809f3(0xe2)][_0x4b0127]=this[_0x4809f3(0x137)](),this['_cache'][_0x4b0127];},Game_BattlerBase[_0x42ab40(0x1aa)][_0x42ab40(0x137)]=function(){const _0x4369c0=_0x42ab40,_0x3092cf=VisuMZ['StealItems'][_0x4369c0(0x15a)];let _0x28b472=0x1;for(const _0x4015fd of this[_0x4369c0(0xcb)]()){if(!_0x4015fd)continue;const _0x16a253=_0x4015fd['note'];_0x16a253[_0x4369c0(0x162)](_0x3092cf[_0x4369c0(0x90)])&&(_0x28b472*=Number(RegExp['$1'])*0.01);}return Math[_0x4369c0(0x1ba)](0x0,_0x28b472);},Game_BattlerBase['prototype'][_0x42ab40(0x105)]=function(){const _0x429068=_0x42ab40;let _0x265fbf='stealPlus';if(this[_0x429068(0xce)](_0x265fbf))return this[_0x429068(0xe2)][_0x265fbf];return this[_0x429068(0xe2)][_0x265fbf]=this[_0x429068(0xbd)](),this['_cache'][_0x265fbf];},Game_BattlerBase[_0x42ab40(0x1aa)][_0x42ab40(0xbd)]=function(){const _0x5a90c3=_0x42ab40,_0x2badfe=VisuMZ['StealItems'][_0x5a90c3(0x15a)];let _0x1be34b=0x0;const _0x487a59=VisuMZ['StealItems'][_0x5a90c3(0x13f)][_0x5a90c3(0x132)];_0x487a59&&_0x487a59[_0x5a90c3(0x150)]&&(_0x1be34b+=_0x487a59[_0x5a90c3(0x150)][_0x5a90c3(0x154)](this));for(const _0x590e37 of this['traitObjects']()){if('ToSHZ'!=='ToSHZ'){function _0x375641(){const _0x520c72=_0x5a90c3;_0x41ba99[_0x520c72(0x125)]*=_0x5de952(_0x331011['$1'])*0.01;}}else{if(!_0x590e37)continue;const _0x76a87e=_0x590e37[_0x5a90c3(0x180)];_0x76a87e[_0x5a90c3(0x162)](_0x2badfe[_0x5a90c3(0x177)])&&(_0x1be34b+=Number(RegExp['$1'])*0.01);}}return _0x1be34b;},Game_BattlerBase[_0x42ab40(0x1aa)]['stealResist']=function(){const _0x3c4597=_0x42ab40;let _0x5dcef7=_0x3c4597(0x16d);if(this['checkCacheKey'](_0x5dcef7))return this[_0x3c4597(0xe2)][_0x5dcef7];return this[_0x3c4597(0xe2)][_0x5dcef7]=this[_0x3c4597(0x145)](),this[_0x3c4597(0xe2)][_0x5dcef7];},Game_BattlerBase[_0x42ab40(0x1aa)][_0x42ab40(0x145)]=function(){const _0x9ab8c5=_0x42ab40,_0x1a395d=VisuMZ[_0x9ab8c5(0x104)][_0x9ab8c5(0x15a)];let _0x238b7d=0x0;const _0x3444f5=VisuMZ[_0x9ab8c5(0x104)][_0x9ab8c5(0x13f)][_0x9ab8c5(0x132)];_0x3444f5&&_0x3444f5['JsStealResist']&&(_0x238b7d+=_0x3444f5[_0x9ab8c5(0x142)][_0x9ab8c5(0x154)](this));for(const _0xee94c5 of this['traitObjects']()){if(!_0xee94c5)continue;const _0x3e69ca=_0xee94c5[_0x9ab8c5(0x180)];_0x3e69ca[_0x9ab8c5(0x162)](_0x1a395d[_0x9ab8c5(0x156)])&&(_0x238b7d+=Number(RegExp['$1'])*0.01);}return _0x238b7d;},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x1b2)]=Game_Enemy[_0x42ab40(0x1aa)][_0x42ab40(0x19f)],Game_Enemy[_0x42ab40(0x1aa)]['setup']=function(_0x580f96,_0x5a877f,_0x233f46){const _0x823e0b=_0x42ab40;VisuMZ[_0x823e0b(0x104)][_0x823e0b(0x1b2)]['call'](this,_0x580f96,_0x5a877f,_0x233f46),!Imported['VisuMZ_3_EnemyLevels']&&this['setupStealableItems']();},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0xa4)]=Game_Enemy[_0x42ab40(0x1aa)][_0x42ab40(0x19e)],Game_Enemy['prototype'][_0x42ab40(0x19e)]=function(){const _0x2583cf=_0x42ab40;VisuMZ[_0x2583cf(0x104)]['Game_Enemy_setupEnemyLevels'][_0x2583cf(0x154)](this),this[_0x2583cf(0x10d)]();},Game_Enemy[_0x42ab40(0x1aa)][_0x42ab40(0xc8)]=function(){const _0x92aa52=_0x42ab40;if(this['_stealableItems']===undefined)this['setupStealableItems']();return this[_0x92aa52(0x1b6)];},Game_Enemy['prototype']['setupStealableItems']=function(){const _0x146050=_0x42ab40,_0x3a5b59=this[_0x146050(0x96)]();if(!_0x3a5b59)return;this['_stealableItems']=VisuMZ[_0x146050(0x104)]['StealableItems'](this,_0x3a5b59);},VisuMZ['StealItems'][_0x42ab40(0x1a9)]={},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x14a)]=function(_0x57c5ff,_0x312637){const _0x2f0cad=_0x42ab40;if(!_0x312637)return[];if(VisuMZ['StealItems'][_0x2f0cad(0x1a9)][_0x312637['id']]){if(_0x2f0cad(0x159)==='IiPmz'){function _0x41d3c5(){const _0x10b6ac=_0x2f0cad,_0x1f5261=_0x32a5c7(_0x194981['$1']);_0x1f5261<_0x27d6a5?(_0x23aa16('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x581695,_0x1f5261,_0x5ba568)),_0x5c32fb[_0x10b6ac(0x117)]()):_0x408d65=_0x315e1e['max'](_0x1f5261,_0x54f0ea);}}else return JsonEx[_0x2f0cad(0x181)](VisuMZ[_0x2f0cad(0x104)]['StealData'][_0x312637['id']]);}VisuMZ[_0x2f0cad(0x104)][_0x2f0cad(0x1a9)][_0x312637['id']]=[];const _0x15c056=VisuMZ[_0x2f0cad(0x104)][_0x2f0cad(0x13f)][_0x2f0cad(0x186)],_0x374318=VisuMZ['StealItems'][_0x2f0cad(0x15a)],_0x2fbfce=_0x312637['note'];if(_0x15c056[_0x2f0cad(0x109)]&&_0x312637[_0x2f0cad(0x9a)]>0x0){const _0x323f49={'type':_0x2f0cad(0x1b9),'id':_0x312637[_0x2f0cad(0x9a)],'rate':_0x15c056['GoldRate'],'stolen':![],'drop':!![]};VisuMZ[_0x2f0cad(0x104)]['StealData'][_0x312637['id']][_0x2f0cad(0xe7)](_0x323f49);}if(_0x15c056['AutoItem']){const _0x1de875=_0x312637['dropItems'];for(const _0x5f5c2c of _0x1de875){if(_0x5f5c2c){if('mmAkN'!=='qyoXv'){const _0x21e645={'type':_0x2f0cad(0x130),'id':_0x5f5c2c[_0x2f0cad(0x10e)],'rate':0x1/Math[_0x2f0cad(0x1ba)](0x1,_0x5f5c2c[_0x2f0cad(0x11e)])*_0x15c056[_0x2f0cad(0x12b)],'stolen':![],'drop':!![],'dropIndex':_0x1de875[_0x2f0cad(0xf2)](_0x5f5c2c)};_0x21e645['type']=[_0x2f0cad(0x130),_0x2f0cad(0x9d),_0x2f0cad(0x17f),_0x2f0cad(0x91)][_0x5f5c2c[_0x2f0cad(0x1ad)]];if(_0x21e645[_0x2f0cad(0x15b)]===_0x2f0cad(0x130))continue;VisuMZ[_0x2f0cad(0x104)][_0x2f0cad(0x1a9)][_0x312637['id']][_0x2f0cad(0xe7)](_0x21e645);}else{function _0xbc7f7f(){_0x1c4d82=_0x16bcee['id'];}}}}}const _0x4a54dd=_0x2fbfce['match'](_0x374318[_0x2f0cad(0xfb)]);if(_0x4a54dd){if('uXLGw'==='uXLGw')for(const _0x30bded of _0x4a54dd){if(_0x2f0cad(0x116)===_0x2f0cad(0x195)){function _0x408b88(){_0x1b354d=_0x13177c[_0x332fde['id']];}}else{if(!_0x30bded)continue;_0x30bded['match'](_0x374318[_0x2f0cad(0xfb)]);const _0x1317b9=String(RegExp['$1'])[_0x2f0cad(0x155)](),_0x20e9f0=Number(RegExp['$2'])*0.01,_0x3df702=VisuMZ[_0x2f0cad(0x104)][_0x2f0cad(0xa3)](_0x1317b9,_0x20e9f0);if(!!_0x3df702)VisuMZ[_0x2f0cad(0x104)][_0x2f0cad(0x1a9)][_0x312637['id']][_0x2f0cad(0xe7)](_0x3df702);}}else{function _0x219f93(){const _0x24dcdd=_0x2f0cad,_0x6cf77b=_0x1afc8f(_0x24f390['$1']),_0xdbd34e=_0x24dcdd(0x189)[_0x24dcdd(0x11c)](_0x6cf77b),_0x3305d5=_0x4786dc[_0x24dcdd(0x104)][_0x24dcdd(0x123)](_0x53060a,_0x5294f2);_0x26c4c2[_0x24dcdd(0x141)](_0x3305d5),_0x1c3577[_0x24dcdd(0x104)]['JS'][_0x3305d5]=new _0x4a27bd(_0xdbd34e);}}}if(_0x2fbfce[_0x2f0cad(0x162)](_0x374318[_0x2f0cad(0x1a1)])){const _0x17c831=String(RegExp['$1'])[_0x2f0cad(0xd8)](/[\r\n]+/);for(const _0x3287d7 of _0x17c831){if(_0x2f0cad(0x169)==='oxlgD'){if(_0x3287d7['match'](/(.*):[ ](.*)([%％])/i)){const _0x1d9619=String(RegExp['$1'])['trim'](),_0x59ef0d=Number(RegExp['$2'])*0.01,_0x3eb160=VisuMZ[_0x2f0cad(0x104)][_0x2f0cad(0xa3)](_0x1d9619,_0x59ef0d);if(!!_0x3eb160)VisuMZ['StealItems'][_0x2f0cad(0x1a9)][_0x312637['id']][_0x2f0cad(0xe7)](_0x3eb160);}}else{function _0x3dd471(){_0x5e8ea5=_0x353f2a[_0x6376b8['id']];}}}}return JsonEx[_0x2f0cad(0x181)](VisuMZ[_0x2f0cad(0x104)][_0x2f0cad(0x1a9)][_0x312637['id']]);},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0xa3)]=function(_0x53ea9f,_0x118b1f){const _0x517ff9=_0x42ab40,_0x5dd6ba={'type':_0x517ff9(0x130),'id':0x0,'rate':_0x118b1f,'stolen':![],'drop':![]};if(_0x53ea9f['match'](/GOLD[ ](\d+)/i)){if(_0x517ff9(0x1a5)!==_0x517ff9(0x1a5)){function _0x5d05c2(){const _0x1475af=_0x517ff9;let _0x3994cb=_0x1475af(0x16d);if(this[_0x1475af(0xce)](_0x3994cb))return this[_0x1475af(0xe2)][_0x3994cb];return this['_cache'][_0x3994cb]=this[_0x1475af(0x145)](),this[_0x1475af(0xe2)][_0x3994cb];}}else _0x5dd6ba[_0x517ff9(0x15b)]=_0x517ff9(0x1b9),_0x5dd6ba['id']=Number(RegExp['$1']);}if(_0x53ea9f[_0x517ff9(0x162)](/ITEM[ ](\d+)/i))_0x5dd6ba['type']=_0x517ff9(0x9d),_0x5dd6ba['id']=Number(RegExp['$1']);else{if(_0x53ea9f[_0x517ff9(0x162)](/ITEM[ ](.*)/i)){if('iEMjZ'===_0x517ff9(0x14e))_0x5dd6ba[_0x517ff9(0x15b)]=_0x517ff9(0x9d),_0x5dd6ba['id']=DataManager[_0x517ff9(0xcd)](RegExp['$1']);else{function _0x1cf950(){const _0x7ade0=_0x517ff9;_0xa6e49e[_0x7ade0(0x104)]['JS'][_0x4a8b0e][_0x7ade0(0x154)](this,this[_0x7ade0(0xca)](),_0x2f947d);}}}}if(_0x53ea9f[_0x517ff9(0x162)](/WEAPON[ ](\d+)/i))_0x5dd6ba['type']=_0x517ff9(0x17f),_0x5dd6ba['id']=Number(RegExp['$1']);else _0x53ea9f[_0x517ff9(0x162)](/WEAPON[ ](.*)/i)&&(_0x5dd6ba['type']=_0x517ff9(0x17f),_0x5dd6ba['id']=DataManager['getWeaponIdWithName'](RegExp['$1']));if(_0x53ea9f[_0x517ff9(0x162)](/ARMOR[ ](\d+)/i)){if('bUYsR'!==_0x517ff9(0xd4))_0x5dd6ba[_0x517ff9(0x15b)]=_0x517ff9(0x91),_0x5dd6ba['id']=Number(RegExp['$1']);else{function _0x2c7a20(){const _0x238c8a=_0x517ff9;this[_0x238c8a(0x1b7)]=_0xcf5ce4,this[_0x238c8a(0xf1)]=_0x5a2f8e,this[_0x238c8a(0x12c)](),this['show'](),this[_0x238c8a(0x97)](0x0);}}}else _0x53ea9f['match'](/ARMOR[ ](.*)/i)&&(_0x5dd6ba[_0x517ff9(0x15b)]=_0x517ff9(0x91),_0x5dd6ba['id']=DataManager[_0x517ff9(0x1a3)](RegExp['$1']));return _0x5dd6ba;},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0xe5)]=Game_Enemy[_0x42ab40(0x1aa)]['gold'],Game_Enemy[_0x42ab40(0x1aa)]['gold']=function(){const _0x4156bf=_0x42ab40,_0x5e2c01=VisuMZ['StealItems']['Settings'][_0x4156bf(0x186)];if(_0x5e2c01[_0x4156bf(0x109)]&&_0x5e2c01['GoldRemoval']){if(_0x4156bf(0x17d)!==_0x4156bf(0xc0)){const _0xb84350=this[_0x4156bf(0xc8)]();for(const _0x48edb9 of _0xb84350){if(!_0x48edb9)continue;if(_0x48edb9[_0x4156bf(0x185)]&&_0x48edb9[_0x4156bf(0x15b)]===_0x4156bf(0x1b9)){if(_0x4156bf(0x103)===_0x4156bf(0x10c)){function _0x472023(){const _0x218a30=_0x4156bf;_0x1e1a49(_0x218a30(0xc9)['format'](_0x58849b,_0x47d726)),_0x42e221[_0x218a30(0x117)]();}}else{if(_0x48edb9[_0x4156bf(0x129)])return 0x0;}}}}else{function _0x2dacf5(){const _0x5199b4=_0x4156bf;_0x226907[_0x5199b4(0x168)]+=_0x2363b4(_0x47570f['$1'])*0.01;}}}return VisuMZ[_0x4156bf(0x104)][_0x4156bf(0xe5)][_0x4156bf(0x154)](this);},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x193)]=Game_Enemy[_0x42ab40(0x1aa)][_0x42ab40(0x95)],Game_Enemy['prototype'][_0x42ab40(0x95)]=function(){const _0xcaa29d=_0x42ab40,_0x3f7d7f=JsonEx[_0xcaa29d(0x181)](this[_0xcaa29d(0x96)]()[_0xcaa29d(0x1a4)]),_0x5ca471=VisuMZ[_0xcaa29d(0x104)]['Settings'][_0xcaa29d(0x186)];if(_0x5ca471['AutoItem']&&_0x5ca471['ItemRemoval']){const _0x4cc94f=this[_0xcaa29d(0xc8)]();for(const _0x153604 of _0x4cc94f){if(_0xcaa29d(0x10b)===_0xcaa29d(0x10b)){if(!_0x153604)continue;if(_0x153604[_0xcaa29d(0x185)]&&_0x153604[_0xcaa29d(0x15b)]!==_0xcaa29d(0x1b9)){if(_0xcaa29d(0xee)!=='KbhjZ'){if(!_0x153604[_0xcaa29d(0x129)])continue;const _0x528763=_0x153604['dropIndex'],_0x243db1=this[_0xcaa29d(0x96)]()[_0xcaa29d(0x1a4)][_0x528763];_0x243db1[_0xcaa29d(0x1ad)]=0x0;}else{function _0x14a1fc(){const _0x560d49=_0xcaa29d;this[_0x560d49(0xdc)]=[];if(!this['_enemy'])return;const _0x3c4120=_0x30743e['StealItems'][_0x560d49(0xcf)](this['_action'],this[_0x560d49(0x1b7)]);if(_0x3c4120[_0x560d49(0x122)]['length']<=0x0)return;this[_0x560d49(0xdc)]=this[_0x560d49(0x1b7)][_0x560d49(0xc8)]()[_0x560d49(0x12d)](_0x2a9278=>{const _0x46258d=_0x560d49;return _0x3c4120[_0x46258d(0x122)][_0x46258d(0xe3)](_0x2a9278[_0x46258d(0x15b)]);});}}}}else{function _0x5f31ed(){const _0x500f18=_0xcaa29d,_0x37d1e7=_0x55a897[_0x500f18(0x104)][_0x500f18(0x13f)][_0x500f18(0x174)];if(!_0x37d1e7)return;const _0x43fa9b=_0x500f18(0xa5),_0x2a9e2b={'name':_0x37d1e7[_0x500f18(0x135)[_0x500f18(0x11c)](_0x43fa9b)]||'','volume':_0x37d1e7[_0x500f18(0xff)[_0x500f18(0x11c)](_0x43fa9b)]||0x0,'pitch':_0x37d1e7[_0x500f18(0x13e)[_0x500f18(0x11c)](_0x43fa9b)]||0x0,'pan':_0x37d1e7[_0x500f18(0xc4)[_0x500f18(0x11c)](_0x43fa9b)]||0x0};if(_0x2a9e2b['name']!=='')_0x707601[_0x500f18(0x12e)](_0x2a9e2b);}}}}let _0x523a9d=VisuMZ['StealItems'][_0xcaa29d(0x193)]['call'](this);return this['enemy']()[_0xcaa29d(0x1a4)]=_0x3f7d7f,_0x523a9d;},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x100)]=Scene_Battle[_0x42ab40(0x1aa)][_0x42ab40(0xdd)],Scene_Battle[_0x42ab40(0x1aa)][_0x42ab40(0xdd)]=function(){const _0x13a3f9=_0x42ab40;VisuMZ[_0x13a3f9(0x104)][_0x13a3f9(0x100)][_0x13a3f9(0x154)](this),this[_0x13a3f9(0x15e)]();},Scene_Battle[_0x42ab40(0x1aa)]['createStealSnatchWindow']=function(){const _0xab31d0=_0x42ab40,_0x5ea111=this['itemWindowRect']();this['_stealSnatchWindow']=new Window_StealSnatch(_0x5ea111),this[_0xab31d0(0xb1)]['setHelpWindow'](this[_0xab31d0(0x138)]),this['_stealSnatchWindow'][_0xab31d0(0xd2)]('ok',this[_0xab31d0(0x165)][_0xab31d0(0xf0)](this)),this[_0xab31d0(0xb1)]['setHandler'](_0xab31d0(0x151),this[_0xab31d0(0xe0)]['bind'](this)),this[_0xab31d0(0x1b3)](this['_stealSnatchWindow']);},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x9e)]=Scene_Battle[_0x42ab40(0x1aa)][_0x42ab40(0x143)],Scene_Battle['prototype'][_0x42ab40(0x143)]=function(){const _0x362e08=_0x42ab40;if(this[_0x362e08(0xb1)]&&this[_0x362e08(0xb1)]['active'])return!![];return VisuMZ[_0x362e08(0x104)][_0x362e08(0x9e)][_0x362e08(0x154)](this);},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0x108)]=Scene_Battle['prototype'][_0x42ab40(0x1b5)],Scene_Battle['prototype']['hideSubInputWindows']=function(){const _0x53b5d6=_0x42ab40;VisuMZ['StealItems'][_0x53b5d6(0x108)][_0x53b5d6(0x154)](this),this[_0x53b5d6(0xb1)]&&(this['_stealSnatchWindow']['deactivate'](),this[_0x53b5d6(0xb1)][_0x53b5d6(0xbf)]());},VisuMZ[_0x42ab40(0x104)][_0x42ab40(0xfc)]=Scene_Battle[_0x42ab40(0x1aa)][_0x42ab40(0x1a8)],Scene_Battle['prototype'][_0x42ab40(0x1a8)]=function(){const _0x161f0c=_0x42ab40,_0x578653=BattleManager[_0x161f0c(0x18a)]();if(this['_stealSnatchWindow']&&_0x578653[_0x161f0c(0x1af)]()){if(_0x161f0c(0xa6)===_0x161f0c(0xb0)){function _0x506183(){const _0x199d15=_0x161f0c;let _0x1b9786='';if(_0x60cbca[_0x199d15(0xe3)](_0x3c622e))_0x1b9786=_0x199d15(0xb3)[_0x199d15(0x11c)](_0x5394a3['id'],_0x5df6b9);if(_0x5ec9ac[_0x199d15(0xe3)](_0x44597a))_0x1b9786=_0x199d15(0x118)['format'](_0x79c6c9['id'],_0x27705a);if(_0x2b4dac[_0x199d15(0xe3)](_0xc39b6a))_0x1b9786=_0x199d15(0x9c)[_0x199d15(0x11c)](_0x17b9d8['id'],_0x2f6177);if(_0x466f3d[_0x199d15(0xe3)](_0x22bc5c))_0x1b9786='Item-%1-%2'[_0x199d15(0x11c)](_0x38df2a['id'],_0x56ec5c);if(_0x54d1bd[_0x199d15(0xe3)](_0x3a3713))_0x1b9786='Weapon-%1-%2'[_0x199d15(0x11c)](_0x5a3a90['id'],_0x521a80);if(_0x417108[_0x199d15(0xe3)](_0x18c209))_0x1b9786=_0x199d15(0x9f)[_0x199d15(0x11c)](_0xe149bc['id'],_0x9f9ee8);if(_0x5e89ba['includes'](_0x49053f))_0x1b9786=_0x199d15(0x94)[_0x199d15(0x11c)](_0x984e4b['id'],_0x53f9f3);if(_0x5d0d9e[_0x199d15(0xe3)](_0x3b9e1))_0x1b9786='State-%1-%2'[_0x199d15(0x11c)](_0x29df87['id'],_0x39d767);return _0x1b9786;}}else this[_0x161f0c(0xa8)]();}else{if(_0x161f0c(0x1be)!=='OHtVx'){function _0x5f2978(){const _0x9e4ba=_0x161f0c;_0x368d58[_0x9e4ba(0x104)][_0x9e4ba(0x100)][_0x9e4ba(0x154)](this),this['createStealSnatchWindow']();}}else VisuMZ[_0x161f0c(0x104)][_0x161f0c(0xfc)]['call'](this);}},Scene_Battle[_0x42ab40(0x1aa)][_0x42ab40(0xa8)]=function(){const _0x1ad3e1=_0x42ab40,_0x6afe36=$gameTroop[_0x1ad3e1(0xcc)]()[this[_0x1ad3e1(0x106)][_0x1ad3e1(0xb9)]()],_0x44d9c7=BattleManager['inputtingAction']();this['_stealSnatchWindow']['setDetails'](_0x6afe36,_0x44d9c7),this[_0x1ad3e1(0xb1)][_0x1ad3e1(0x12c)](),this[_0x1ad3e1(0xb1)][_0x1ad3e1(0xa0)](),this[_0x1ad3e1(0xb1)][_0x1ad3e1(0xed)]();},Scene_Battle[_0x42ab40(0x1aa)][_0x42ab40(0x165)]=function(){const _0x3ae669=_0x42ab40,_0x42dae5=BattleManager[_0x3ae669(0x18a)](),_0x19a141=$gameTroop[_0x3ae669(0xcc)]()[this[_0x3ae669(0x106)][_0x3ae669(0xb9)]()],_0x54a3f3=this[_0x3ae669(0xb1)][_0x3ae669(0x168)]();_0x42dae5[_0x3ae669(0x1ac)](_0x19a141,_0x54a3f3),VisuMZ[_0x3ae669(0x104)][_0x3ae669(0xfc)]['call'](this);},Scene_Battle[_0x42ab40(0x1aa)]['onStealSnatchCancel']=function(){const _0x5639d7=_0x42ab40;this[_0x5639d7(0xb1)][_0x5639d7(0xbf)](),this[_0x5639d7(0xb1)][_0x5639d7(0xea)](),this[_0x5639d7(0x106)][_0x5639d7(0xa0)](),this['_enemyWindow'][_0x5639d7(0xed)](),Imported[_0x5639d7(0x19d)]&&this['_enemyWindow'][_0x5639d7(0xd3)]();},Window_BattleLog['prototype'][_0x42ab40(0x115)]=function(_0x310e98){const _0x4b6d6b=_0x42ab40;this['_lines']['push'](_0x310e98),this[_0x4b6d6b(0x12c)]();};function Window_StealSnatch(){const _0x497bbf=_0x42ab40;this[_0x497bbf(0x112)](...arguments);}Window_StealSnatch['prototype']=Object['create'](Window_ItemList['prototype']),Window_StealSnatch[_0x42ab40(0x1aa)][_0x42ab40(0x15f)]=Window_StealSnatch,Window_StealSnatch[_0x42ab40(0x1aa)]['initialize']=function(_0xa90dc){const _0x1e7e66=_0x42ab40;Window_ItemList['prototype'][_0x1e7e66(0x112)][_0x1e7e66(0x154)](this,_0xa90dc),this[_0x1e7e66(0xbf)](),this[_0x1e7e66(0x1b7)]=null,this[_0x1e7e66(0xf1)]=null;},Window_StealSnatch[_0x42ab40(0x1aa)]['setDetails']=function(_0x4ca47f,_0x94d8b2){const _0x12ce55=_0x42ab40;this[_0x12ce55(0x1b7)]=_0x4ca47f,this[_0x12ce55(0xf1)]=_0x94d8b2,this['refresh'](),this['show'](),this['forceSelect'](0x0);},Window_StealSnatch[_0x42ab40(0x1aa)][_0x42ab40(0x121)]=function(){const _0x282c70=_0x42ab40;this['_data']=[];if(!this['_enemy'])return;const _0x61632c=VisuMZ[_0x282c70(0x104)][_0x282c70(0xcf)](this[_0x282c70(0xf1)],this[_0x282c70(0x1b7)]);if(_0x61632c['types']['length']<=0x0)return;this[_0x282c70(0xdc)]=this[_0x282c70(0x1b7)]['getStealableItems']()[_0x282c70(0x12d)](_0x1e9b0e=>{const _0x3e6459=_0x282c70;return _0x61632c['types']['includes'](_0x1e9b0e[_0x3e6459(0x15b)]);});},Window_StealSnatch[_0x42ab40(0x1aa)]['isEnabled']=function(_0x1528ec){const _0x97badf=_0x42ab40;return _0x1528ec&&!_0x1528ec[_0x97badf(0x129)];},Window_StealSnatch[_0x42ab40(0x1aa)][_0x42ab40(0x16f)]=function(){const _0x13422b=_0x42ab40;if(this[_0x13422b(0xb4)])return this[_0x13422b(0xb4)];return this[_0x13422b(0xb4)]=this[_0x13422b(0x176)](_0x13422b(0x113)),this[_0x13422b(0xb4)]=Math[_0x13422b(0x1ba)](this[_0x13422b(0xb4)],this[_0x13422b(0x172)](TextManager['snatchAlreadyStolen'])['width']),this['_numberWidth'];},Window_StealSnatch['prototype']['drawItemName']=function(_0xd8f3c3,_0x16eeb3,_0x3b019e,_0x2bdbe4){const _0x1eae6e=_0x42ab40;if(!_0xd8f3c3)return;switch(_0xd8f3c3[_0x1eae6e(0x15b)][_0x1eae6e(0xe1)]()[_0x1eae6e(0x155)]()){case _0x1eae6e(0x1b9):const _0x51162f=TextManager[_0x1eae6e(0x182)][_0x1eae6e(0x11c)](_0x1eae6e(0x10a)['format'](ImageManager[_0x1eae6e(0x99)]),_0xd8f3c3['id'],TextManager[_0x1eae6e(0x98)]);this[_0x1eae6e(0xbb)](_0x51162f,_0x16eeb3,_0x3b019e);break;case _0x1eae6e(0x9d):Window_Base[_0x1eae6e(0x1aa)][_0x1eae6e(0x183)][_0x1eae6e(0x154)](this,$dataItems[_0xd8f3c3['id']],_0x16eeb3,_0x3b019e,_0x2bdbe4);break;case _0x1eae6e(0x17f):Window_Base['prototype'][_0x1eae6e(0x183)]['call'](this,$dataWeapons[_0xd8f3c3['id']],_0x16eeb3,_0x3b019e,_0x2bdbe4);break;case _0x1eae6e(0x91):Window_Base['prototype'][_0x1eae6e(0x183)]['call'](this,$dataArmors[_0xd8f3c3['id']],_0x16eeb3,_0x3b019e,_0x2bdbe4);break;}},Window_StealSnatch[_0x42ab40(0x1aa)]['drawItemNumber']=function(_0x429a6a,_0xfdf6e4,_0x4c283e,_0x49b267){const _0x53db66=_0x42ab40;if(_0x429a6a[_0x53db66(0x129)]){if(_0x53db66(0x153)!==_0x53db66(0x153)){function _0xd1f4b6(){const _0x243122=_0x53db66,_0x2200c7=_0x664426[_0x243122(0x180)];if(_0x2200c7[_0x243122(0x162)](_0x3fbee0)){const _0x445ee3=_0xbf520b(_0x42a438['$1']),_0x394764=_0x243122(0x189)[_0x243122(0x11c)](_0x445ee3),_0x50317e=_0x3121d8[_0x243122(0x104)][_0x243122(0x123)](_0x4f1c8c,_0x3bf555);_0x2e321e[_0x243122(0x141)](_0x50317e),_0x4faca9[_0x243122(0x104)]['JS'][_0x50317e]=new _0x26ad4f(_0x394764);}}}else{const _0x22a7c4=TextManager[_0x53db66(0xab)];_0xfdf6e4+=_0x49b267-this[_0x53db66(0x172)](_0x22a7c4)[_0x53db66(0xdb)],this[_0x53db66(0xbb)](_0x22a7c4,_0xfdf6e4,_0x4c283e);}}else{if(VisuMZ[_0x53db66(0x104)]['Settings'][_0x53db66(0x157)][_0x53db66(0x124)]){const _0x526db5=VisuMZ[_0x53db66(0x104)][_0x53db66(0xcf)](this[_0x53db66(0xf1)],this[_0x53db66(0x1b7)]);let _0x195950=_0x526db5[_0x53db66(0x179)]['all']*_0x429a6a[_0x53db66(0x179)],_0xf191e=_0x526db5[_0x53db66(0x11a)][_0x53db66(0x187)];_0x195950*=_0x526db5[_0x53db66(0x179)][_0x429a6a[_0x53db66(0x15b)]['toLowerCase']()],_0xf191e+=_0x526db5['plus'][_0x429a6a[_0x53db66(0x15b)][_0x53db66(0x167)]()];let _0x28f1d0=(_0x195950+_0xf191e)[_0x53db66(0x92)](0x0,0x1)*0x64;_0x28f1d0>0x0&&_0x28f1d0<0x64&&(_0x28f1d0=_0x28f1d0[_0x53db66(0x15d)](0x2)),_0x28f1d0=String(_0x28f1d0)+'%',_0xfdf6e4+=_0x49b267-this[_0x53db66(0x172)](_0x28f1d0)['width'],this[_0x53db66(0xbb)](_0x28f1d0,_0xfdf6e4,_0x4c283e);}}},Window_StealSnatch[_0x42ab40(0x1aa)][_0x42ab40(0x178)]=function(_0x33755){const _0x4652b0=_0x42ab40;if(this['_helpWindow']){if('tHLPb'===_0x4652b0(0x14d))switch(_0x33755['type'][_0x4652b0(0xe1)]()['trim']()){case'GOLD':this['_helpWindow'][_0x4652b0(0x11b)](TextManager[_0x4652b0(0x149)]);break;case _0x4652b0(0x9d):this['_helpWindow'][_0x4652b0(0xba)]($dataItems[_0x33755['id']]);break;case _0x4652b0(0x17f):this[_0x4652b0(0x138)][_0x4652b0(0xba)]($dataWeapons[_0x33755['id']]);break;case _0x4652b0(0x91):this[_0x4652b0(0x138)][_0x4652b0(0xba)]($dataArmors[_0x33755['id']]);break;}else{function _0x414b5d(){const _0x51d10d=_0x4652b0;this[_0x51d10d(0x106)][_0x51d10d(0xd3)]();}}}};
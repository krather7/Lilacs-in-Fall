//=============================================================================
// VisuStella MZ - Equipment Set Bonuses
// VisuMZ_2_EquipSetBonuses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EquipSetBonuses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EquipSetBonuses = VisuMZ.EquipSetBonuses || {};
VisuMZ.EquipSetBonuses.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [EquipSetBonuses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Equipment_Set_Bonuses_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that allows you to set equipment to be a part
 * of various sets. When multiple pieces of the set are equipped, (for example:
 * Warrior Shield, Warrior Helm, Warrior Armor), then bonuses are applied.
 * Bonuses can be applied at different stages, too, depending on how many set
 * pieces are being currently equipped. The art (faces, map sprites, battler,
 * and various portraits for other plugins) for an actor can also change based
 * on the number of equipment sets worn.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create an unlimited amount of Equipment Sets to apply to actors when
 *   wearing matching sets of weapons and/or armor.
 * * Each equipment set can apply bonuses at various stages depending on the
 *   number of set pieces equipped up to a total of 20 per Equipment Set.
 * * A tooltip window to show extra data to show the player what bonuses are
 *   applied when different numbers of set pieces are equipped.
 * * Apply different appearances to actor graphics (face, map sprites, battler,
 *   and portraits) depending on the number of equipment pieces equipped for
 *   certain sets.
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
 * Equipment Set Graphics
 * 
 * If an actor has equipment set graphics defined, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The equipment set
 * graphics will take priority over the default graphics.
 * 
 * If an actor has multiple equipment sets on at the same time, each with their
 * own set graphics, the set with the highest number of pieces that has defined
 * graphics will be given priority.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Equipment Set Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Equipment
 * Set Graphics also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever Equipment Sets are equipped.
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
 * === Equipment Set Declaration-Related Notetags ===
 * 
 * ---
 *
 * <Equip Set: name>
 *
 * - Used for: Weapon, Armor Notetags
 * - This assigns this item to an equipment set.
 * - Replace 'name' with the set name you're going to associate this equip
 *   with. Names must equal the Equipment Set names declared in the Plugin
 *   Parameters or else they will not have any effect.
 * - If you want to make a piece of equipment be a part of two different
 *   equipment sets, use multiple copies of this notetag.
 *
 * ---
 * 
 * === Equipment Set Graphics-Related Notetags ===
 * 
 * ---
 *
 * <name Set, x Pieces Face: filename, index>
 * <name Set, x+ Pieces Face: filename, index>
 * <name Set, x to y Pieces Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Character: filename, index>
 * <name Set, x+ Pieces Character: filename, index>
 * <name Set, x to y Pieces Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battler: filename>
 * <name Set, x+ Pieces Battler: filename>
 * <name Set, x to y Pieces Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Menu Portrait: filename>
 * <name Set, x+ Pieces Menu Portrait: filename>
 * <name Set, x to y Pieces Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battle Portrait: filename>
 * <name Set, x+ Pieces Battle Portrait: filename>
 * <name Set, x to y Pieces Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equipment Sets Settings
 * ============================================================================
 *
 * This is where you put all your equipment sets used in the game.
 * Adjust their settings here.
 *
 * ---
 *
 * Equipment Set
 * 
 *   Equipment Set Name:
 *   - This set's name used for databasing and in-game.
 *   - Register equips to sets using <Equip Set: x> notetag.
 * 
 *   Icon:
 *   - This is the icon used to repesent the set name.
 *   - Use 0 to not show an icon.
 * 
 *   Bonuses:
 * 
 *   1 Piece Bonus:
 *   2 Pieces Bonus:
 *   3 Pieces Bonus:
 *   4 Pieces Bonus:
 *   5 Pieces Bonus:
 *   6 Pieces Bonus:
 *   7 Pieces Bonus:
 *   8 Pieces Bonus:
 *   9 Pieces Bonus:
 *   10 Pieces Bonus:
 *   11 Pieces Bonus:
 *   12 Pieces Bonus:
 *   13 Pieces Bonus:
 *   14 Pieces Bonus:
 *   15 Pieces Bonus:
 *   16 Pieces Bonus:
 *   17 Pieces Bonus:
 *   18 Pieces Bonus:
 *   19 Pieces Bonus:
 *   20 Pieces Bonus:
 *   - Bonuses applied for having this number of pieces equipped.
 *   - These settings stack with later bonuses in the same set.
 *
 * ---
 *
 * 1-20 Piece(s) Bonus
 * 
 *   Text:
 *   - Text that appears next to each piece in the tooltip window.
 *   - Use 'auto' if you want this to be done automatically.
 * 
 *     Show in Tooltip?:
 *     - Show this in the tooltip?
 * 
 *   Bonuses:
 * 
 *     Passive States:
 *     - States that will be given out as passives when the required piece
 *       count is equipped.
 * 
 *     Basic Parameters:
 *     - Bonuses applied to the Basic Parameters when the required piece count
 *       is equipped.
 * 
 *     X Parameters:
 *     - Bonuses applied to the X Parameters when the required piece count is
 *       equipped.
 * 
 *     S Parameters:
 *     - Bonuses applied to the S Parameters when the required piece count is
 *       equipped.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0 is +0.
 *
 * ---
 *
 * X Parameters
 * 
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * S Parameters
 * 
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings for Equipment Set Bonuses.
 *
 * ---
 *
 * Settings
 * 
 *   Base Parameter Add:
 *   X Parameter Add:
 *   S Parameter Add:
 *   - When do you wish to apply the "Add" bonus parameters?
 *   - Typical Formula: (base + plus) * rate + flat
 *     - Plus - Apply Before Rate
 *     - Flat - Apply After Rate
 *   - For the purpose of keeping the bonuses consistent without confusing any
 *     players, there will be no notetags to shift between the two settings as
 *     an exception for an equip bonus.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * Tooltip settings for Equipment Set Bonuses. The tooltip window will appear
 * when selecting equipment with the <Equip Set: name> notetag.
 * 
 * By default, it will by anchored towards the upper left. However, if the
 * position of the tooltip would extend past the bottom of the screen, then the
 * tooltip window will change its anchor towards the bottom left as to not
 * cover the name of the item it is displaying information for.
 *
 * ---
 *
 * Appearance
 * 
 *   Show Tooltip?:
 *   - Show tooltips for Equipment Set Bonuses?
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down. 
 *   - Inversed when low on screen.
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
 * Version 1.00 Official Release Date: March 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
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
 * @param EquipSetBonuses
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EquipSets:arraystruct
 * @text Equipment Sets
 * @type struct<EquipSet>[]
 * @desc This is where you put all your equipment sets used in the
 * game. Adjust their settings here.
 * @default ["{\"SetName:str\":\"Hearty\",\"Icon:num\":\"84\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+50\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+25\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Sorcery\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Power\",\"Icon:num\":\"77\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+15\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.20\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Guardian\",\"Icon:num\":\"81\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+40\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Wizard\",\"Icon:num\":\"78\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Alchemist\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.10\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Speedy\",\"Icon:num\":\"82\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Fortuna\",\"Icon:num\":\"87\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.25\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.50\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}"]
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for Equipment Set Bonuses.
 * @default {"BaseParamAdd:str":"flat","XParamAdd:str":"flat","SParamAdd:str":"flat"}
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc Tooltip settings for Equipment Set Bonuses.
 * @default {"Appearance":"","Show:eval":"true","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+24","OffsetY:num":"+40","Vocabulary":"","SetTitleFmt:str":"%2\\C[5]%1 Set Bonuses\\C[0]","SetPieceFmt:str":"\\C[5]∙%1 Set Effect:\\C[0] %2","SeparatorFmt:str":"%1, %2","StateFmt:str":"%2%1","RateFmt:str":"%1:%2","AddPosFmt:str":"%1+%2","AddNegFmt:str":"%1-%2"}
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
/*~struct~EquipSet:
 *
 * @param SetName:str
 * @text Equipment Set Name
 * @desc This set's name used for databasing and in-game.
 * Register equips to sets using <Equip Set: x> notetag.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent SetName:str
 * @desc This is the icon used to repesent the set name.
 * Use 0 to not show an icon.
 * @default 160
 *
 * @param Bonuses
 *
 * @param Piece1:struct
 * @text 1 Piece Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece2:struct
 * @text 2 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece3:struct
 * @text 3 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece4:struct
 * @text 4 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece5:struct
 * @text 5 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece6:struct
 * @text 6 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece7:struct
 * @text 7 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece8:struct
 * @text 8 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece9:struct
 * @text 9 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece10:struct
 * @text 10 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece11:struct
 * @text 11 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece12:struct
 * @text 12 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece13:struct
 * @text 13 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece14:struct
 * @text 14 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece15:struct
 * @text 15 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece16:struct
 * @text 16 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece17:struct
 * @text 17 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece18:struct
 * @text 18 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece19:struct
 * @text 19 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece20:struct
 * @text 20 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Set Pieces Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipSetPieces:
 *
 * @param Text:str
 * @text Text
 * @desc Text that appears next to each piece in the tooltip window.
 * Use 'auto' if you want this to be done automatically.
 * @default auto
 *
 * @param ShowText:eval
 * @text Show in Tooltip?
 * @parent Text
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this in the tooltip?
 * @default true
 * 
 * @param Bonuses
 * 
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Bonuses
 * @type state[]
 * @desc States that will be given out as passives when the
 * required piece count is equipped.
 * @default []
 *
 * @param Param:struct
 * @text Basic Parameters
 * @parent Bonuses
 * @type struct<Param>
 * @desc Bonuses applied to the Basic Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param XParam:struct
 * @text X Parameters
 * @parent Bonuses
 * @type struct<XParam>
 * @desc Bonuses applied to the X Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param SParam:struct
 * @text S Parameters
 * @parent Bonuses
 * @type struct<SParam>
 * @desc Bonuses applied to the S Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Param Bonuses Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param MaxHP
 * @default Maximum Hit Points
 *
 * @param Rate0:num
 * @text Rate
 * @parent MaxHP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent MaxHP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MaxMP
 * @default Maximum Magic Points
 *
 * @param Rate1:num
 * @text Rate
 * @parent MaxMP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent MaxMP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param ATK
 * @default Attack
 *
 * @param Rate2:num
 * @text Rate
 * @parent ATK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent ATK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param DEF
 * @default Defense
 *
 * @param Rate3:num
 * @text Rate
 * @parent DEF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent DEF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MAT
 * @default Magic Attack
 *
 * @param Rate4:num
 * @text Rate
 * @parent MAT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MAT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MDF
 * @default Magic Defense
 *
 * @param Rate5:num
 * @text Rate
 * @parent MDF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MDF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param AGI
 * @default Agility
 *
 * @param Rate6:num
 * @text Rate
 * @parent AGI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent AGI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param LUK
 * @default Luck
 *
 * @param Rate7:num
 * @text Rate
 * @parent LUK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent LUK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * X Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~XParam:
 *
 * @param HIT
 * @default Hit Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent HIT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent HIT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EVA
 * @default Evasion Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent EVA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent EVA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CRI
 * @default Critical Hit
 *
 * @param Rate2:num
 * @text Rate
 * @parent CRI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent CRI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CEV
 * @default Critical Evasion
 *
 * @param Rate3:num
 * @text Rate
 * @parent CEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent CEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MEV
 * @default Magic Evasion
 *
 * @param Rate4:num
 * @text Rate
 * @parent MEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRF
 * @default Magic Reflect
 *
 * @param Rate5:num
 * @text Rate
 * @parent MRF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MRF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CNT
 * @default Counter Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent CNT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent CNT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param HRG
 * @default HP Regen Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent HRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent HRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRG
 * @default Magic Regen Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent MRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent MRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TRG
 * @default TP Regen Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent TRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent TRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * S Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SParam:
 *
 * @param TGR
 * @default Target Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent TGR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent TGR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param GRD
 * @default Guard Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent GRD
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent GRD
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param REC
 * @default Recovery Rate
 *
 * @param Rate2:num
 * @text Rate
 * @parent REC
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent REC
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PHA
 * @default Pharmacology Rate
 *
 * @param Rate3:num
 * @text Rate
 * @parent PHA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent PHA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MCR
 * @default MP Cost Rate
 *
 * @param Rate4:num
 * @text Rate
 * @parent MCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TCR
 * @default TP Charge Rate
 *
 * @param Rate5:num
 * @text Rate
 * @parent TCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent TCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PDR
 * @default Physical Damage Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent PDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent PDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MDR
 * @default Magical Damage Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent MDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent MDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param FDR
 * @default Floor Damage Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent FDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent FDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EXR
 * @default Experience Gain Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent EXR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent EXR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BaseParamAdd:str
 * @text Base Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param XParamAdd:str
 * @text X Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param SParamAdd:str
 * @text S Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 */
/* ----------------------------------------------------------------------------
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Show:eval
 * @text Show Tooltip?
 * @parent Appearance
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips for Equipment Set Bonuses?
 * @default true
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +24
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down. Inversed when low on screen.
 * @default +40
 *
 * @param Vocabulary
 *
 * @param SetTitleFmt:str
 * @text Set Title Format
 * @parent Vocabulary
 * @desc How does the set title appear?
 * %1 - Set Name, %2 - Icon
 * @default %2\C[5]%1 Set Bonuses\C[0]
 *
 * @param SetPieceFmt:str
 * @text Set Piece Format
 * @parent Vocabulary
 * @desc How do the set pieces appear?
 * %1 - Set Name, %2 - Effects
 * @default \C[5]∙%1 Set Effect:\C[0] %2
 *
 * @param SeparatorFmt:str
 * @text Separator Format
 * @parent Vocabulary
 * @desc How do you wish to separate effects?
 * %1 - Previous Effect, %2 - Next Effect
 * @default %1, %2
 *
 * @param StateFmt:str
 * @text Passive State Format
 * @parent Vocabulary
 * @desc How are passive state effects displayed?
 * %1 - State Name, %2 - Icon
 * @default %2%1
 *
 * @param RateFmt:str
 * @text Param Rate Format
 * @parent Vocabulary
 * @desc How are Parameter Rate effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1:%2
 *
 * @param AddPosFmt:str
 * @text Add(+) Format
 * @parent Vocabulary
 * @desc How are positive Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1+%2
 *
 * @param AddNegFmt:str
 * @text Add(-) Format
 * @parent Vocabulary
 * @desc How are negative Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1-%2
 *
 */
//=============================================================================

const _0x17ff=['STRUCT','Scene_Equip','MDR','Scene_Shop_onSellOk','SetMenuPortraitPlus','Scene_Shop_onNumberOk','MAXHP','xparamRate','equipSetBonusParamRate','SetFaceName','_item','faceIndex','paramRate','MRG','iconIndex','582877OdJqgG','ParseActorNotetags','CRI','clamp','getBattlePortraitFilename','UNTITLED','Game_Actor_getBattlePortraitFilename','_equipSetBonusSets','OffsetX','_priorityFaceIndex','Game_Actor_setBattlerImage','releaseUnequippableItems','ARRAYSTR','filter','requestRefresh','Game_Actor_setCharacterImage','RateFmt','EVA','registerEquipSetBonusTooltipWindow','map','Game_Actor_setup','_armorEquipSets','GRD','process_VisuMZ_Template_Notetags','trim','SetBattlerName','equipSetBonusParamPlus','onNumberCancel','Scene_Boot_onDatabaseLoaded','resizeWindow','_priorityCharacterName','constructor','clone','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','equipSetPlusPos','Tooltip','baseTextRect','setBattlePortrait','equipSetTitleFmt','exit','passiveStates','Window_ShopSell','round','_scene','_priorityBattlerName','actor','parameters','showEquipSetBonusTooltipWindow','return\x200','_equipSetBonusCount','ParseAllNotetags','Window_ItemList','527243frsHBz','EQUIP_SET_X_PARAM_PLUS_FLAT','createEquipSetBonusTooltipWindow','Game_BattlerBase_sparamRate','WindowSkin','backOpacity','Game_Actor_setBattlePortrait','MAT','battleMembers','length','updatePosition','plus','refreshEquipSetBonuses','Set','PHA','Game_BattlerBase_sparamPlus','Game_Actor_releaseUnequippableItems','updateBackOpacity','SetMenuPortrait','changePaintOpacity','characterIndex','applyEquipSetBonuses','getActorEquipSetCharacterIndex','FUNC','xparamFlatBonus','checkRefreshEquipSetBonuses','WindowOpacity','Scale','getMenuImage','EquipSetBonuses','_priorityMenuImage','getActorEquipSetMenuPortrait','sparamPlus','_windowLayer','SetBattlerNameRange','_statusWindow','paramPlus','_priorityBattlePortrait','Game_BattlerBase_sparamFlatBonus','paramFlatBonus','width','setup','_equipSets','_cache','EQUIP_SET_BASE_PARAM_PLUS_FLAT','createAutoPieceText','onBuyOk','Icon','item','refreshActorPortrait','hasEquipSetBonusTooltipWindow','drawing','SetMenuPortraitRange','SetCharaName','Mechanics','actorEquipSetMenuPortrait','Game_BattlerBase_xparamPlus','3933vfLRTc','XParam','7Aaayxz','WINDOW_SCALE','_lineOpacity','_requestRefresh','index','createAutoParamText','28GmOmhk','parse','Param','push','VisuMZ_1_SkillsStatesCore','SetPieceFmt','auto','Rate%1','Game_Actor_faceIndex','Scene_Shop_onNumberCancel','call','ShowText','getEquipSetsSortedByMostPieces','FDR','Game_BattlerBase_xparamRate','ARRAYFUNC','MEV','padding','WINDOW_SKIN_OPACITY','SetName','ConvertParams','initialize','DEF','Window_EquipSlot','textSizeEx','name','actorEquipSetCharacterName','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_priorityFaceName','Game_BattlerBase_paramFlatBonus','battlerName','Actor-%1-SetName-%2-Pieces-%3','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','onNumberOk','show','Window_ShopBuy','resetFontSettings','status','scale','sort','ATK','visible','onSellOk','characterName','equipSetRate','Settings','EVAL','hideEquipSetBonusTooltipWindow','refreshEquipSetTooltip','SetBattlePortrait','isArmor','StateFmt','paramName','_text','EXR','_activeWindow','Game_Actor_faceName','toUpperCase','138558zdsXkl','685sJPKtd','TGR','Game_Actor_getMenuImage','addPassiveStatesFromOtherPlugins','update','Text','clampPosition','isWeapon','getActorEquipSetBattlePortrait','addPassiveStatesFromEquipSetBonuses','getActorEquipSetBattlerName','Piece%1','actorEquipSetFaceName','equipSetPieceSeparator','Game_Actor_setFaceImage','actorEquipSetCharacterIndex','VisuMZ_0_CoreEngine','Plus%1','setFaceImage','onDatabaseLoaded','ParseEquipSets','drawTextEx','AddPosFmt','equipSetState','Game_BattlerBase_xparamFlatBonus','actorEquipSetBattlePortrait','sparamFlatBonus','active','Game_BattlerBase_paramPlus','Window_Selectable_initialize','flat','HIT','EQUIP_SET_S_PARAM_PLUS_FLAT','getActiveWindow','includes','SetFaceNameRange','updateEquipSetBonusTooltip','registerActorEquipSetImages','SHOW_TOOLTIP','contents','getActorEquipSetFaceName','faceName','MRF','refresh','xparamPlus','Game_Actor_battlerName','VisuMZ_1_ItemsEquipsCore','Game_BattlerBase_addPassiveStatesFromOtherPlugins','MOUSE_OFFSET_Y','shift','Game_Actor_characterIndex','actorEquipSetFaceIndex','getActorEquipSetCharacterName','ARRAYNUM','floor','description','Scene_Shop_onBuyOk','height','SetBattlerNamePlus','SetFaceNamePlus','match','CNT','setupText','\x5cI[%1]','equips','loadWindowskin','abs','1667vudBxe','757VpaGZw','PassiveStates','Window_EquipItem','getActorEquipSetFaceIndex','pushLineOpacity','TCR','max','sparamRate','LUK','SParam','11657EHDajY','MCR','ARRAYEVAL','equipSetPlusNeg','actorId','equipSetPieceFmt','createWindowLayer','Show','STR','Window_Selectable_callUpdateHelp','MDF','addSetDataText','_priorityCharacterIndex','_weaponEquipSets','addChild','setItem','callUpdateHelp','setMenuImage','ARRAYJSON','RegExp','MOUSE_OFFSET_X','getEquipSetPieces','AGI','390OHnGDP','setCharacterImage','hide','getEquipSets','WINDOW_SKIN_FILENAME','prototype','setActiveWindow','setBattlerImage','Game_BattlerBase_paramRate','TRG','format','getEquipSetData','SeparatorFmt','_equipSetBonusTooltipWindow','actorEquipSetBattlerName','Game_Actor_setMenuImage'];const _0x6aee=function(_0xdefb39,_0x4a0b7c){_0xdefb39=_0xdefb39-0x1e7;let _0x17ff82=_0x17ff[_0xdefb39];return _0x17ff82;};const _0x1ca737=_0x6aee;(function(_0x2af434,_0x5631d9){const _0x370ef5=_0x6aee;while(!![]){try{const _0x58783a=-parseInt(_0x370ef5(0x282))*parseInt(_0x370ef5(0x30b))+-parseInt(_0x370ef5(0x27a))+parseInt(_0x370ef5(0x20d))+parseInt(_0x370ef5(0x241))+-parseInt(_0x370ef5(0x1ee))*-parseInt(_0x370ef5(0x2bd))+parseInt(_0x370ef5(0x300))*-parseInt(_0x370ef5(0x301))+parseInt(_0x370ef5(0x27c))*parseInt(_0x370ef5(0x2bc));if(_0x58783a===_0x5631d9)break;else _0x2af434['push'](_0x2af434['shift']());}catch(_0x199bdc){_0x2af434['push'](_0x2af434['shift']());}}}(_0x17ff,0xb84f0));var label='EquipSetBonuses',tier=tier||0x0,dependencies=[_0x1ca737(0x2cd),_0x1ca737(0x2eb),_0x1ca737(0x286)],pluginData=$plugins[_0x1ca737(0x21a)](function(_0x56f104){const _0x224bca=_0x1ca737;return _0x56f104[_0x224bca(0x2a7)]&&_0x56f104[_0x224bca(0x2f4)][_0x224bca(0x2df)]('['+label+']');})[0x0];VisuMZ[label][_0x1ca737(0x2af)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1ca737(0x296)]=function(_0xa2d1e,_0x23fa84){const _0x3e4408=_0x1ca737;for(const _0x271811 in _0x23fa84){if(_0x271811[_0x3e4408(0x2f9)](/(.*):(.*)/i)){const _0x23312a=String(RegExp['$1']),_0x1374c2=String(RegExp['$2'])[_0x3e4408(0x2bb)]()[_0x3e4408(0x225)]();let _0x43eab0,_0x3d4a19,_0x482edc;switch(_0x1374c2){case'NUM':_0x43eab0=_0x23fa84[_0x271811]!==''?Number(_0x23fa84[_0x271811]):0x0;break;case _0x3e4408(0x2f2):_0x3d4a19=_0x23fa84[_0x271811]!==''?JSON[_0x3e4408(0x283)](_0x23fa84[_0x271811]):[],_0x43eab0=_0x3d4a19[_0x3e4408(0x220)](_0x384cdf=>Number(_0x384cdf));break;case _0x3e4408(0x2b0):_0x43eab0=_0x23fa84[_0x271811]!==''?eval(_0x23fa84[_0x271811]):null;break;case _0x3e4408(0x30d):_0x3d4a19=_0x23fa84[_0x271811]!==''?JSON[_0x3e4408(0x283)](_0x23fa84[_0x271811]):[],_0x43eab0=_0x3d4a19[_0x3e4408(0x220)](_0x496044=>eval(_0x496044));break;case'JSON':_0x43eab0=_0x23fa84[_0x271811]!==''?JSON['parse'](_0x23fa84[_0x271811]):'';break;case _0x3e4408(0x1e9):_0x3d4a19=_0x23fa84[_0x271811]!==''?JSON[_0x3e4408(0x283)](_0x23fa84[_0x271811]):[],_0x43eab0=_0x3d4a19['map'](_0x56e001=>JSON['parse'](_0x56e001));break;case _0x3e4408(0x258):_0x43eab0=_0x23fa84[_0x271811]!==''?new Function(JSON[_0x3e4408(0x283)](_0x23fa84[_0x271811])):new Function(_0x3e4408(0x23d));break;case _0x3e4408(0x291):_0x3d4a19=_0x23fa84[_0x271811]!==''?JSON[_0x3e4408(0x283)](_0x23fa84[_0x271811]):[],_0x43eab0=_0x3d4a19[_0x3e4408(0x220)](_0xaec4c5=>new Function(JSON[_0x3e4408(0x283)](_0xaec4c5)));break;case _0x3e4408(0x313):_0x43eab0=_0x23fa84[_0x271811]!==''?String(_0x23fa84[_0x271811]):'';break;case _0x3e4408(0x219):_0x3d4a19=_0x23fa84[_0x271811]!==''?JSON[_0x3e4408(0x283)](_0x23fa84[_0x271811]):[],_0x43eab0=_0x3d4a19['map'](_0xa54b2e=>String(_0xa54b2e));break;case _0x3e4408(0x1fe):_0x482edc=_0x23fa84[_0x271811]!==''?JSON[_0x3e4408(0x283)](_0x23fa84[_0x271811]):{},_0x43eab0=VisuMZ[_0x3e4408(0x296)]({},_0x482edc);break;case'ARRAYSTRUCT':_0x3d4a19=_0x23fa84[_0x271811]!==''?JSON['parse'](_0x23fa84[_0x271811]):[],_0x43eab0=_0x3d4a19[_0x3e4408(0x220)](_0x40ba28=>VisuMZ[_0x3e4408(0x296)]({},JSON[_0x3e4408(0x283)](_0x40ba28)));break;default:continue;}_0xa2d1e[_0x23312a]=_0x43eab0;}}return _0xa2d1e;},(_0x48e618=>{const _0x594b7e=_0x1ca737,_0x293e1b=_0x48e618[_0x594b7e(0x29b)];for(const _0x48cbfe of dependencies){if(!Imported[_0x48cbfe]){alert(_0x594b7e(0x2a2)[_0x594b7e(0x1f8)](_0x293e1b,_0x48cbfe)),SceneManager[_0x594b7e(0x234)]();break;}}const _0x2e114e=_0x48e618['description'];if(_0x2e114e[_0x594b7e(0x2f9)](/\[Version[ ](.*?)\]/i)){const _0x142363=Number(RegExp['$1']);_0x142363!==VisuMZ[label]['version']&&(alert(_0x594b7e(0x29d)['format'](_0x293e1b,_0x142363)),SceneManager[_0x594b7e(0x234)]());}if(_0x2e114e[_0x594b7e(0x2f9)](/\[Tier[ ](\d+)\]/i)){const _0xd99cf5=Number(RegExp['$1']);_0xd99cf5<tier?(alert(_0x594b7e(0x22e)[_0x594b7e(0x1f8)](_0x293e1b,_0xd99cf5,tier)),SceneManager['exit']()):tier=Math[_0x594b7e(0x307)](_0xd99cf5,tier);}VisuMZ[_0x594b7e(0x296)](VisuMZ[label][_0x594b7e(0x2af)],_0x48e618[_0x594b7e(0x23b)]);})(pluginData),VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x1ea)]={'Set':/<(?:EQUIP|EQUIPMENT) SET:[ ](.*)>/gi,'SetFaceName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetCharaName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetBattlerName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetMenuPortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x229)]=Scene_Boot['prototype'][_0x1ca737(0x2d0)],Scene_Boot[_0x1ca737(0x1f3)]['onDatabaseLoaded']=function(){const _0x56b2cf=_0x1ca737;VisuMZ[_0x56b2cf(0x25e)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x56b2cf(0x224)]();},Scene_Boot[_0x1ca737(0x1f3)][_0x1ca737(0x224)]=function(){const _0x5c6a5e=_0x1ca737;if(VisuMZ[_0x5c6a5e(0x23f)])return;for(const _0x312c27 of $dataActors){if(!_0x312c27)continue;ImageManager['registerActorEquipSetImages'](_0x312c27);}},VisuMZ['EquipSetBonuses'][_0x1ca737(0x20e)]=VisuMZ[_0x1ca737(0x20e)],VisuMZ['ParseActorNotetags']=function(_0x4ca744){const _0x2487d6=_0x1ca737;VisuMZ[_0x2487d6(0x25e)][_0x2487d6(0x20e)]['call'](this,_0x4ca744),ImageManager[_0x2487d6(0x2e2)](_0x4ca744);},DataManager['getEquipSets']=function(_0x1c4b54){const _0x2b5575=_0x1ca737;if(this[_0x2b5575(0x2c4)](_0x1c4b54))return this[_0x2b5575(0x318)]=this[_0x2b5575(0x318)]||{},!this[_0x2b5575(0x318)][_0x1c4b54['id']]&&(this[_0x2b5575(0x318)][_0x1c4b54['id']]=VisuMZ[_0x2b5575(0x25e)]['ParseEquipSets'](_0x1c4b54)),this[_0x2b5575(0x318)][_0x1c4b54['id']];else return this[_0x2b5575(0x2b4)](_0x1c4b54)?(this['_armorEquipSets']=this[_0x2b5575(0x222)]||{},!this[_0x2b5575(0x222)][_0x1c4b54['id']]&&(this[_0x2b5575(0x222)][_0x1c4b54['id']]=VisuMZ[_0x2b5575(0x25e)][_0x2b5575(0x2d1)](_0x1c4b54)),this[_0x2b5575(0x222)][_0x1c4b54['id']]):[];},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2d1)]=function(_0x551d26){const _0xd4400=_0x1ca737,_0x2bbbbf=VisuMZ[_0xd4400(0x25e)]['RegExp'],_0x35ad34=_0x551d26['note'],_0x4d4d4e=[],_0x336ec0=_0x35ad34[_0xd4400(0x2f9)](_0x2bbbbf[_0xd4400(0x24e)]);if(_0x336ec0)for(const _0x1bff3b of _0x336ec0){_0x1bff3b[_0xd4400(0x2f9)](_0x2bbbbf[_0xd4400(0x24e)]);const _0x3d4557=String(RegExp['$1'])[_0xd4400(0x2bb)]()[_0xd4400(0x225)]();!!DataManager['getEquipSetData'](_0x3d4557)&&_0x4d4d4e[_0xd4400(0x285)](_0x3d4557);}return _0x4d4d4e;},DataManager['getEquipSetData']=function(_0x327306){const _0x23d3ac=_0x1ca737;_0x327306=_0x327306[_0x23d3ac(0x2bb)]()[_0x23d3ac(0x225)]();if(this[_0x23d3ac(0x26b)]===undefined){this['_equipSets']={};const _0x265a7c=VisuMZ[_0x23d3ac(0x25e)][_0x23d3ac(0x2af)]['EquipSets'];for(const _0x5c6fe9 of _0x265a7c){const _0x1984f6=_0x5c6fe9[_0x23d3ac(0x295)][_0x23d3ac(0x2bb)]()[_0x23d3ac(0x225)]();if(_0x1984f6==='')continue;if(_0x1984f6===_0x23d3ac(0x212))continue;this[_0x23d3ac(0x26b)][_0x1984f6]=_0x5c6fe9;}}return this[_0x23d3ac(0x26b)][_0x327306]||null;},ImageManager[_0x1ca737(0x2c9)]={},ImageManager[_0x1ca737(0x2f0)]={},ImageManager[_0x1ca737(0x29c)]={},ImageManager[_0x1ca737(0x2cc)]={},ImageManager['actorEquipSetBattlerName']={},ImageManager[_0x1ca737(0x278)]={},ImageManager[_0x1ca737(0x2d6)]={},ImageManager['registerActorEquipSetImages']=function(_0x1cdbe0){const _0x179934=_0x1ca737;if(!_0x1cdbe0)return;const _0x208294=VisuMZ['EquipSetBonuses'][_0x179934(0x1ea)],_0x309e6f=_0x1cdbe0['note'],_0x5ea02a=_0x1cdbe0['id'],_0xe45aa=_0x309e6f[_0x179934(0x2f9)](_0x208294['SetFaceName']);if(_0xe45aa)for(const _0x5c91cb of _0xe45aa){if(!_0x5c91cb)continue;_0x5c91cb[_0x179934(0x2f9)](_0x208294[_0x179934(0x207)]);const _0x2b9bbe=String(RegExp['$1'])[_0x179934(0x2bb)]()[_0x179934(0x225)](),_0x591c74=Number(RegExp['$2'])||0x1,_0x30bf70=String(RegExp['$3'])['trim'](),_0x455a9c=Number(RegExp['$4']);if(!DataManager[_0x179934(0x1f9)](_0x2b9bbe))continue;const _0x34fbde=_0x179934(0x2a1)['format'](_0x5ea02a,_0x2b9bbe,_0x591c74);ImageManager[_0x179934(0x2c9)][_0x34fbde]=_0x30bf70,ImageManager[_0x179934(0x2f0)][_0x34fbde]=_0x455a9c;}const _0x5c9bf8=_0x309e6f[_0x179934(0x2f9)](_0x208294[_0x179934(0x2f8)]);if(_0x5c9bf8)for(const _0x2bdf3f of _0x5c9bf8){if(!_0x2bdf3f)continue;_0x2bdf3f[_0x179934(0x2f9)](_0x208294[_0x179934(0x2f8)]);const _0x177de6=String(RegExp['$1'])['toUpperCase']()[_0x179934(0x225)](),_0x2a20b4=Number(RegExp['$2'])||0x1,_0x49d9af=0x14,_0x281add=String(RegExp['$3'])[_0x179934(0x225)](),_0x40c9b3=Number(RegExp['$4']);if(!DataManager[_0x179934(0x1f9)](_0x177de6))continue;for(let _0x224ea8=_0x2a20b4;_0x224ea8<=_0x49d9af;_0x224ea8++){const _0x3cd376='Actor-%1-SetName-%2-Pieces-%3'[_0x179934(0x1f8)](_0x5ea02a,_0x177de6,_0x224ea8);ImageManager[_0x179934(0x2c9)][_0x3cd376]=_0x281add,ImageManager[_0x179934(0x2f0)][_0x3cd376]=_0x40c9b3;}}const _0x55e67e=_0x309e6f['match'](_0x208294[_0x179934(0x2e0)]);if(_0x55e67e)for(const _0x214b40 of _0x55e67e){if(!_0x214b40)continue;_0x214b40[_0x179934(0x2f9)](_0x208294[_0x179934(0x2e0)]);const _0x416130=String(RegExp['$1'])[_0x179934(0x2bb)]()['trim'](),_0x178cd9=Number(RegExp['$2'])||0x1,_0x2a503f=Number(RegExp['$3'])||0x1,_0x2ca8b6=String(RegExp['$4'])[_0x179934(0x225)](),_0x3e9e7a=Number(RegExp['$5']);if(!DataManager[_0x179934(0x1f9)](_0x416130))continue;for(let _0x24194e=_0x178cd9;_0x24194e<=_0x2a503f;_0x24194e++){const _0x217083=_0x179934(0x2a1)[_0x179934(0x1f8)](_0x5ea02a,_0x416130,_0x24194e);ImageManager['actorEquipSetFaceName'][_0x217083]=_0x2ca8b6,ImageManager['actorEquipSetFaceIndex'][_0x217083]=_0x3e9e7a;}}const _0x53f7c2=_0x309e6f['match'](_0x208294[_0x179934(0x276)]);if(_0x53f7c2)for(const _0x46751e of _0x53f7c2){if(!_0x46751e)continue;_0x46751e[_0x179934(0x2f9)](_0x208294[_0x179934(0x276)]);const _0x37118b=String(RegExp['$1'])[_0x179934(0x2bb)]()['trim'](),_0x281b64=Number(RegExp['$2'])||0x1,_0x3ed5a3=String(RegExp['$3'])[_0x179934(0x225)](),_0x2d395c=Number(RegExp['$4']);if(!DataManager[_0x179934(0x1f9)](_0x37118b))continue;const _0x54a99d='Actor-%1-SetName-%2-Pieces-%3'[_0x179934(0x1f8)](_0x5ea02a,_0x37118b,_0x281b64);ImageManager[_0x179934(0x29c)][_0x54a99d]=_0x3ed5a3,ImageManager['actorEquipSetCharacterIndex'][_0x54a99d]=_0x2d395c;}const _0x5d6bb8=_0x309e6f[_0x179934(0x2f9)](_0x208294['SetCharaNamePlus']);if(_0x5d6bb8)for(const _0x12d8bc of _0x5d6bb8){if(!_0x12d8bc)continue;_0x12d8bc[_0x179934(0x2f9)](_0x208294['SetCharaNamePlus']);const _0x17d5f9=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x3ea20d=Number(RegExp['$2'])||0x1,_0x4a5143=0x14,_0x4f6809=String(RegExp['$3'])[_0x179934(0x225)](),_0x2dc09e=Number(RegExp['$4']);if(!DataManager['getEquipSetData'](_0x17d5f9))continue;for(let _0x51d9ca=_0x3ea20d;_0x51d9ca<=_0x4a5143;_0x51d9ca++){const _0x4e6a12=_0x179934(0x2a1)[_0x179934(0x1f8)](_0x5ea02a,_0x17d5f9,_0x51d9ca);ImageManager['actorEquipSetCharacterName'][_0x4e6a12]=_0x4f6809,ImageManager[_0x179934(0x2cc)][_0x4e6a12]=_0x2dc09e;}}const _0x5519d4=_0x309e6f[_0x179934(0x2f9)](_0x208294['SetCharaNameRange']);if(_0x5519d4)for(const _0x197839 of _0x5519d4){if(!_0x197839)continue;_0x197839[_0x179934(0x2f9)](_0x208294['SetCharaNameRange']);const _0x1d8d87=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x28be40=Number(RegExp['$2'])||0x1,_0x54510d=Number(RegExp['$3'])||0x1,_0x2fcab9=String(RegExp['$4'])[_0x179934(0x225)](),_0xce9326=Number(RegExp['$5']);if(!DataManager[_0x179934(0x1f9)](_0x1d8d87))continue;for(let _0x16384a=_0x28be40;_0x16384a<=_0x54510d;_0x16384a++){const _0x2f32f5='Actor-%1-SetName-%2-Pieces-%3'[_0x179934(0x1f8)](_0x5ea02a,_0x1d8d87,_0x16384a);ImageManager[_0x179934(0x29c)][_0x2f32f5]=_0x2fcab9,ImageManager[_0x179934(0x2cc)][_0x2f32f5]=_0xce9326;}}const _0x221bdb=_0x309e6f[_0x179934(0x2f9)](_0x208294[_0x179934(0x226)]);if(_0x221bdb)for(const _0x4784a3 of _0x221bdb){if(!_0x4784a3)continue;_0x4784a3[_0x179934(0x2f9)](_0x208294[_0x179934(0x226)]);const _0x5d5733=String(RegExp['$1'])[_0x179934(0x2bb)]()[_0x179934(0x225)](),_0x29a047=Number(RegExp['$2'])||0x1,_0x31d1ff=String(RegExp['$3'])['trim']();if(!DataManager[_0x179934(0x1f9)](_0x5d5733))continue;const _0x252327=_0x179934(0x2a1)[_0x179934(0x1f8)](_0x5ea02a,_0x5d5733,_0x29a047);ImageManager[_0x179934(0x1fc)][_0x252327]=_0x31d1ff;}const _0x21c9cb=_0x309e6f[_0x179934(0x2f9)](_0x208294[_0x179934(0x2f7)]);if(_0x21c9cb)for(const _0x259184 of _0x21c9cb){if(!_0x259184)continue;_0x259184[_0x179934(0x2f9)](_0x208294[_0x179934(0x2f7)]);const _0x201bd2=String(RegExp['$1'])['toUpperCase']()[_0x179934(0x225)](),_0x183573=Number(RegExp['$2'])||0x1,_0x71ea8=0x14,_0x417f4e=String(RegExp['$3'])[_0x179934(0x225)]();if(!DataManager[_0x179934(0x1f9)](_0x201bd2))continue;for(let _0x1830f5=_0x183573;_0x1830f5<=_0x71ea8;_0x1830f5++){const _0x5a7a43='Actor-%1-SetName-%2-Pieces-%3'[_0x179934(0x1f8)](_0x5ea02a,_0x201bd2,_0x1830f5);ImageManager['actorEquipSetBattlerName'][_0x5a7a43]=_0x417f4e;}}const _0x723b4c=_0x309e6f[_0x179934(0x2f9)](_0x208294[_0x179934(0x263)]);if(_0x723b4c)for(const _0x3b74c3 of _0x723b4c){if(!_0x3b74c3)continue;_0x3b74c3[_0x179934(0x2f9)](_0x208294['SetBattlerNameRange']);const _0x1674e0=String(RegExp['$1'])[_0x179934(0x2bb)]()[_0x179934(0x225)](),_0x1bdd45=Number(RegExp['$2'])||0x1,_0x59fe40=Number(RegExp['$3'])||0x1,_0x966e4f=String(RegExp['$4'])[_0x179934(0x225)]();if(!DataManager[_0x179934(0x1f9)](_0x1674e0))continue;for(let _0x1af0eb=_0x1bdd45;_0x1af0eb<=_0x59fe40;_0x1af0eb++){const _0x4ea618=_0x179934(0x2a1)[_0x179934(0x1f8)](_0x5ea02a,_0x1674e0,_0x1af0eb);ImageManager['actorEquipSetBattlerName'][_0x4ea618]=_0x966e4f;}}const _0x42bc73=_0x309e6f['match'](_0x208294[_0x179934(0x253)]);if(_0x42bc73)for(const _0x246a3d of _0x42bc73){if(!_0x246a3d)continue;_0x246a3d[_0x179934(0x2f9)](_0x208294[_0x179934(0x253)]);const _0x4ab963=String(RegExp['$1'])[_0x179934(0x2bb)]()[_0x179934(0x225)](),_0x243d3b=Number(RegExp['$2'])||0x1,_0x1aff5c=String(RegExp['$3'])[_0x179934(0x225)]();if(!DataManager[_0x179934(0x1f9)](_0x4ab963))continue;const _0x1796c7='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x5ea02a,_0x4ab963,_0x243d3b);ImageManager['actorEquipSetMenuPortrait'][_0x1796c7]=_0x1aff5c;}const _0x59e6f4=_0x309e6f[_0x179934(0x2f9)](_0x208294['SetMenuPortraitPlus']);if(_0x59e6f4)for(const _0x39427e of _0x59e6f4){if(!_0x39427e)continue;_0x39427e[_0x179934(0x2f9)](_0x208294[_0x179934(0x202)]);const _0x4df59a=String(RegExp['$1'])['toUpperCase']()[_0x179934(0x225)](),_0x54fe7f=Number(RegExp['$2'])||0x1,_0x2122f5=0x14,_0xe800b1=String(RegExp['$3'])[_0x179934(0x225)]();if(!DataManager['getEquipSetData'](_0x4df59a))continue;for(let _0x34cfca=_0x54fe7f;_0x34cfca<=_0x2122f5;_0x34cfca++){const _0x5e5597=_0x179934(0x2a1)['format'](_0x5ea02a,_0x4df59a,_0x34cfca);ImageManager[_0x179934(0x278)][_0x5e5597]=_0xe800b1;}}const _0x2dacba=_0x309e6f['match'](_0x208294[_0x179934(0x275)]);if(_0x2dacba)for(const _0x5dc826 of _0x2dacba){if(!_0x5dc826)continue;_0x5dc826[_0x179934(0x2f9)](_0x208294['SetMenuPortraitRange']);const _0x136f4c=String(RegExp['$1'])[_0x179934(0x2bb)]()[_0x179934(0x225)](),_0x1f8e70=Number(RegExp['$2'])||0x1,_0x1f5d1f=Number(RegExp['$3'])||0x1,_0x157f20=String(RegExp['$4'])[_0x179934(0x225)]();if(!DataManager[_0x179934(0x1f9)](_0x136f4c))continue;for(let _0x33f0b7=_0x1f8e70;_0x33f0b7<=_0x1f5d1f;_0x33f0b7++){const _0x947a83=_0x179934(0x2a1)['format'](_0x5ea02a,_0x136f4c,_0x33f0b7);ImageManager[_0x179934(0x278)][_0x947a83]=_0x157f20;}}const _0x459ec7=_0x309e6f[_0x179934(0x2f9)](_0x208294[_0x179934(0x2b3)]);if(_0x459ec7)for(const _0x5b5ce9 of _0x459ec7){if(!_0x5b5ce9)continue;_0x5b5ce9[_0x179934(0x2f9)](_0x208294[_0x179934(0x2b3)]);const _0x5bbaae=String(RegExp['$1'])[_0x179934(0x2bb)]()[_0x179934(0x225)](),_0x94a913=Number(RegExp['$2'])||0x1,_0x33b7c4=String(RegExp['$3'])[_0x179934(0x225)]();if(!DataManager[_0x179934(0x1f9)](_0x5bbaae))continue;const _0x3f5cb8=_0x179934(0x2a1)['format'](_0x5ea02a,_0x5bbaae,_0x94a913);ImageManager[_0x179934(0x2d6)][_0x3f5cb8]=_0x33b7c4;}const _0x4b2247=_0x309e6f[_0x179934(0x2f9)](_0x208294[_0x179934(0x2b3)]);if(_0x4b2247)for(const _0x2baa79 of _0x4b2247){if(!_0x2baa79)continue;_0x2baa79[_0x179934(0x2f9)](_0x208294[_0x179934(0x2b3)]);const _0x1e2573=String(RegExp['$1'])[_0x179934(0x2bb)]()['trim'](),_0x3c202f=Number(RegExp['$2'])||0x1,_0x9da0bf=0x14,_0x269e86=String(RegExp['$3'])[_0x179934(0x225)]();if(!DataManager[_0x179934(0x1f9)](_0x1e2573))continue;for(let _0x2283b7=_0x3c202f;_0x2283b7<=_0x9da0bf;_0x2283b7++){const _0x345b27=_0x179934(0x2a1)['format'](_0x5ea02a,_0x1e2573,_0x2283b7);ImageManager[_0x179934(0x2d6)][_0x345b27]=_0x269e86;}}const _0x12032a=_0x309e6f['match'](_0x208294['SetBattlePortraitRange']);if(_0x12032a)for(const _0x39ddae of _0x12032a){if(!_0x39ddae)continue;_0x39ddae[_0x179934(0x2f9)](_0x208294['SetBattlePortraitRange']);const _0x278b8f=String(RegExp['$1'])[_0x179934(0x2bb)]()[_0x179934(0x225)](),_0x38ebc6=Number(RegExp['$2'])||0x1,_0x1ed593=Number(RegExp['$3'])||0x1,_0x13bf24=String(RegExp['$4'])['trim']();if(!DataManager['getEquipSetData'](_0x278b8f))continue;for(let _0xf1560e=_0x38ebc6;_0xf1560e<=_0x1ed593;_0xf1560e++){const _0x28f993=_0x179934(0x2a1)[_0x179934(0x1f8)](_0x5ea02a,_0x278b8f,_0xf1560e);ImageManager[_0x179934(0x2d6)][_0x28f993]=_0x13bf24;}}},ImageManager[_0x1ca737(0x2e5)]=function(_0x269e9e,_0x2b61ee,_0x28ac4f){const _0x556fcb=_0x1ca737;if(!_0x269e9e||!_0x2b61ee||!_0x28ac4f)return'';const _0x2fb5d9=_0x556fcb(0x2a1)[_0x556fcb(0x1f8)](_0x269e9e[_0x556fcb(0x30f)](),_0x2b61ee['toUpperCase']()['trim'](),_0x28ac4f);return ImageManager['actorEquipSetFaceName'][_0x2fb5d9]||'';},ImageManager[_0x1ca737(0x304)]=function(_0x3ae156,_0x357435,_0x63e14e){const _0x86ad18=_0x1ca737;if(!_0x3ae156||!_0x357435||!_0x63e14e)return undefined;const _0x3bd98c=_0x86ad18(0x2a1)[_0x86ad18(0x1f8)](_0x3ae156[_0x86ad18(0x30f)](),_0x357435[_0x86ad18(0x2bb)]()[_0x86ad18(0x225)](),_0x63e14e);return ImageManager[_0x86ad18(0x2f0)][_0x3bd98c]||undefined;},ImageManager[_0x1ca737(0x2f1)]=function(_0xbd501,_0x360c1d,_0x3efd9a){const _0x5b5a16=_0x1ca737;if(!_0xbd501||!_0x360c1d||!_0x3efd9a)return'';const _0x6b60ca=_0x5b5a16(0x2a1)[_0x5b5a16(0x1f8)](_0xbd501[_0x5b5a16(0x30f)](),_0x360c1d[_0x5b5a16(0x2bb)]()[_0x5b5a16(0x225)](),_0x3efd9a);return ImageManager[_0x5b5a16(0x29c)][_0x6b60ca]||'';},ImageManager[_0x1ca737(0x257)]=function(_0xd3e5fb,_0xcc6978,_0x19afb2){const _0xfe8f55=_0x1ca737;if(!_0xd3e5fb||!_0xcc6978||!_0x19afb2)return undefined;const _0x58e005=_0xfe8f55(0x2a1)['format'](_0xd3e5fb[_0xfe8f55(0x30f)](),_0xcc6978['toUpperCase']()[_0xfe8f55(0x225)](),_0x19afb2);return ImageManager[_0xfe8f55(0x2cc)][_0x58e005]||undefined;},ImageManager['getActorEquipSetBattlerName']=function(_0x93af94,_0x219d0f,_0x12ec80){const _0x245c58=_0x1ca737;if(!_0x93af94||!_0x219d0f||!_0x12ec80)return'';const _0x3daafa=_0x245c58(0x2a1)[_0x245c58(0x1f8)](_0x93af94['actorId'](),_0x219d0f['toUpperCase']()[_0x245c58(0x225)](),_0x12ec80);return ImageManager[_0x245c58(0x1fc)][_0x3daafa]||'';},ImageManager[_0x1ca737(0x260)]=function(_0x1cc3f2,_0x5548d2,_0x2a33cf){const _0x5ef8a8=_0x1ca737;if(!_0x1cc3f2||!_0x5548d2||!_0x2a33cf)return'';const _0x56b832=_0x5ef8a8(0x2a1)[_0x5ef8a8(0x1f8)](_0x1cc3f2[_0x5ef8a8(0x30f)](),_0x5548d2[_0x5ef8a8(0x2bb)]()['trim'](),_0x2a33cf);return ImageManager[_0x5ef8a8(0x278)][_0x56b832]||'';},ImageManager[_0x1ca737(0x2c5)]=function(_0x133c08,_0x2f5cd4,_0x43dd05){const _0x40d1be=_0x1ca737;if(!_0x133c08||!_0x2f5cd4||!_0x43dd05)return'';const _0xec0198=_0x40d1be(0x2a1)[_0x40d1be(0x1f8)](_0x133c08[_0x40d1be(0x30f)](),_0x2f5cd4['toUpperCase']()[_0x40d1be(0x225)](),_0x43dd05);return ImageManager[_0x40d1be(0x2d6)][_0xec0198]||'';},TextManager[_0x1ca737(0x233)]=VisuMZ['EquipSetBonuses']['Settings'][_0x1ca737(0x230)]['SetTitleFmt'],TextManager['equipSetPieceFmt']=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)][_0x1ca737(0x230)][_0x1ca737(0x287)],TextManager['equipSetPieceSeparator']=VisuMZ['EquipSetBonuses'][_0x1ca737(0x2af)][_0x1ca737(0x230)][_0x1ca737(0x1fa)],TextManager[_0x1ca737(0x2d4)]=VisuMZ['EquipSetBonuses'][_0x1ca737(0x2af)][_0x1ca737(0x230)][_0x1ca737(0x2b5)],TextManager['equipSetRate']=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)][_0x1ca737(0x230)][_0x1ca737(0x21d)],TextManager['equipSetPlusPos']=VisuMZ['EquipSetBonuses']['Settings'][_0x1ca737(0x230)][_0x1ca737(0x2d3)],TextManager['equipSetPlusNeg']=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)][_0x1ca737(0x230)]['AddNegFmt'],SceneManager[_0x1ca737(0x2b2)]=function(){const _0x1d186d=_0x1ca737,_0x546d22=this[_0x1d186d(0x238)];if(!_0x546d22)return;const _0x258153=_0x546d22['_equipSetBonusTooltipWindow'];if(_0x258153)_0x258153[_0x1d186d(0x21b)]();},Game_BattlerBase[_0x1ca737(0x26d)]=VisuMZ[_0x1ca737(0x25e)]['Settings'][_0x1ca737(0x277)]['BaseParamAdd'],Game_BattlerBase[_0x1ca737(0x242)]=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)][_0x1ca737(0x277)]['XParamAdd'],Game_BattlerBase[_0x1ca737(0x2dd)]=VisuMZ['EquipSetBonuses'][_0x1ca737(0x2af)][_0x1ca737(0x277)]['SParamAdd'],Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x227)]=function(_0x33d2d3,_0x475128){return 0x0;},Game_BattlerBase[_0x1ca737(0x1f3)]['equipSetBonusParamRate']=function(_0xee8c91,_0x2a6bf3){return 0x1;},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2d9)]=Game_BattlerBase[_0x1ca737(0x1f3)]['paramPlus'],Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x265)]=function(_0x79e7e6){const _0x21b9a4=_0x1ca737;let _0x4615e5=VisuMZ[_0x21b9a4(0x25e)][_0x21b9a4(0x2d9)][_0x21b9a4(0x28c)](this,_0x79e7e6);return Game_BattlerBase[_0x21b9a4(0x26d)]===_0x21b9a4(0x24c)&&(_0x4615e5+=this['equipSetBonusParamPlus'](_0x21b9a4(0x284),_0x79e7e6)),_0x4615e5;},VisuMZ[_0x1ca737(0x25e)]['Game_BattlerBase_paramRate']=Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x20a)],Game_BattlerBase['prototype']['paramRate']=function(_0x2a2ac1){const _0x4f5e63=_0x1ca737;let _0x34c828=VisuMZ['EquipSetBonuses'][_0x4f5e63(0x1f6)][_0x4f5e63(0x28c)](this,_0x2a2ac1);return _0x34c828*this[_0x4f5e63(0x206)]('Param',_0x2a2ac1);},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x29f)]=Game_BattlerBase[_0x1ca737(0x1f3)]['paramFlatBonus'],Game_BattlerBase['prototype'][_0x1ca737(0x268)]=function(_0x2f230d){const _0x5c8aed=_0x1ca737;let _0x422f14=VisuMZ['EquipSetBonuses'][_0x5c8aed(0x29f)]['call'](this,_0x2f230d);return Game_BattlerBase[_0x5c8aed(0x26d)]===_0x5c8aed(0x2db)&&(_0x422f14+=this[_0x5c8aed(0x227)](_0x5c8aed(0x284),_0x2f230d)),_0x422f14;},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x279)]=Game_BattlerBase['prototype']['xparamPlus'],Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x2e9)]=function(_0x43a732){const _0x1bd4eb=_0x1ca737;let _0x10a10e=VisuMZ[_0x1bd4eb(0x25e)][_0x1bd4eb(0x279)][_0x1bd4eb(0x28c)](this,_0x43a732);return Game_BattlerBase[_0x1bd4eb(0x242)]===_0x1bd4eb(0x24c)&&(_0x10a10e+=this['equipSetBonusParamPlus'](_0x1bd4eb(0x27b),_0x43a732)),_0x10a10e;},VisuMZ['EquipSetBonuses'][_0x1ca737(0x290)]=Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x205)],Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x205)]=function(_0xb9de76){const _0x3632d0=_0x1ca737;let _0x52e3d7=VisuMZ[_0x3632d0(0x25e)][_0x3632d0(0x290)][_0x3632d0(0x28c)](this,_0xb9de76);return _0x52e3d7*this[_0x3632d0(0x206)]('XParam',_0xb9de76);},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2d5)]=Game_BattlerBase['prototype'][_0x1ca737(0x259)],Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x259)]=function(_0x1927cc){const _0x478b12=_0x1ca737;let _0x549556=VisuMZ[_0x478b12(0x25e)][_0x478b12(0x2d5)]['call'](this,_0x1927cc);return Game_BattlerBase[_0x478b12(0x242)]===_0x478b12(0x2db)&&(_0x549556+=this[_0x478b12(0x227)]('XParam',_0x1927cc)),_0x549556;},VisuMZ['EquipSetBonuses']['Game_BattlerBase_sparamPlus']=Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x261)],Game_BattlerBase[_0x1ca737(0x1f3)]['sparamPlus']=function(_0x10867c){const _0x29980e=_0x1ca737;let _0xf4041e=VisuMZ['EquipSetBonuses'][_0x29980e(0x250)][_0x29980e(0x28c)](this,_0x10867c);return Game_BattlerBase[_0x29980e(0x2dd)]===_0x29980e(0x24c)&&(_0xf4041e+=this['equipSetBonusParamPlus'](_0x29980e(0x30a),_0x10867c)),_0xf4041e;},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x244)]=Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x308)],Game_BattlerBase['prototype'][_0x1ca737(0x308)]=function(_0x987409){const _0x3a128d=_0x1ca737;let _0x34a88b=VisuMZ[_0x3a128d(0x25e)][_0x3a128d(0x244)][_0x3a128d(0x28c)](this,_0x987409);return _0x34a88b*this[_0x3a128d(0x206)](_0x3a128d(0x30a),_0x987409);},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x267)]=Game_BattlerBase['prototype'][_0x1ca737(0x2d7)],Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x2d7)]=function(_0x531365){const _0x5ebeee=_0x1ca737;let _0x2a7ed4=VisuMZ['EquipSetBonuses'][_0x5ebeee(0x267)][_0x5ebeee(0x28c)](this,_0x531365);return Game_BattlerBase['EQUIP_SET_S_PARAM_PLUS_FLAT']===_0x5ebeee(0x2db)&&(_0x2a7ed4+=this['equipSetBonusParamPlus'](_0x5ebeee(0x30a),_0x531365)),_0x2a7ed4;},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2ec)]=Game_BattlerBase[_0x1ca737(0x1f3)][_0x1ca737(0x2c0)],Game_BattlerBase['prototype']['addPassiveStatesFromOtherPlugins']=function(){const _0x3412d6=_0x1ca737;VisuMZ[_0x3412d6(0x25e)][_0x3412d6(0x2ec)][_0x3412d6(0x28c)](this),this[_0x3412d6(0x2c6)]();},Game_BattlerBase['prototype']['addPassiveStatesFromEquipSetBonuses']=function(){},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x221)]=Game_Actor[_0x1ca737(0x1f3)]['setup'],Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x26a)]=function(_0x6591c7){const _0x119bea=_0x1ca737;VisuMZ[_0x119bea(0x25e)]['Game_Actor_setup'][_0x119bea(0x28c)](this,_0x6591c7),this[_0x119bea(0x24d)]();},VisuMZ['EquipSetBonuses']['Game_Actor_releaseUnequippableItems']=Game_Actor[_0x1ca737(0x1f3)]['releaseUnequippableItems'],Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x218)]=function(_0x7f351b){const _0x18589a=_0x1ca737;VisuMZ[_0x18589a(0x25e)][_0x18589a(0x251)][_0x18589a(0x28c)](this,_0x7f351b),this['refreshEquipSetBonuses']();},Game_Actor[_0x1ca737(0x1f3)]['checkRefreshEquipSetBonuses']=function(_0x3a5e6b){const _0xa592b8=_0x1ca737;(this[_0xa592b8(0x214)]===undefined||this[_0xa592b8(0x23e)]===undefined)&&this[_0xa592b8(0x24d)]();},Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x24d)]=function(){const _0x2653c1=_0x1ca737;this['clearEquipSetBonusCache'](),this[_0x2653c1(0x256)]();if(this['_tempActor'])return;SceneManager[_0x2653c1(0x2b2)]();},Game_Actor[_0x1ca737(0x1f3)]['clearEquipSetBonusCache']=function(){this['_equipSetBonusSets']=[],this['_equipSetBonusCount']={};},Game_Actor[_0x1ca737(0x1f3)]['applyEquipSetBonuses']=function(){const _0x1d6596=_0x1ca737;for(const _0x4eedb7 of this[_0x1d6596(0x2fd)]()){if(!_0x4eedb7)continue;const _0x3174f1=DataManager[_0x1d6596(0x1f1)](_0x4eedb7);for(const _0x3d702f of _0x3174f1){!this[_0x1d6596(0x214)]['includes'](_0x3d702f)&&this[_0x1d6596(0x214)][_0x1d6596(0x285)](_0x3d702f),this['_equipSetBonusCount'][_0x3d702f]=this[_0x1d6596(0x23e)][_0x3d702f]||0x0,this[_0x1d6596(0x23e)][_0x3d702f]++;}}},Game_Actor[_0x1ca737(0x1f3)]['getEquipSets']=function(){const _0x247313=_0x1ca737;return this[_0x247313(0x25a)](),this[_0x247313(0x214)];},Game_Actor['prototype'][_0x1ca737(0x1ec)]=function(_0x29ecf3){const _0xbfc09d=_0x1ca737;return this['checkRefreshEquipSetBonuses'](),_0x29ecf3=_0x29ecf3[_0xbfc09d(0x2bb)]()[_0xbfc09d(0x225)](),(this[_0xbfc09d(0x23e)][_0x29ecf3]||0x0)[_0xbfc09d(0x210)](0x0,0x14);},Game_Actor[_0x1ca737(0x1f3)]['getEquipSetsSortedByMostPieces']=function(){const _0x2676ee=_0x1ca737;let _0x5d8182=this[_0x2676ee(0x1f1)]()[_0x2676ee(0x22d)]();return _0x5d8182[_0x2676ee(0x2a9)]((_0x1938cc,_0x44a3e6)=>{const _0x43e0d5=_0x2676ee,_0x42e2bb=this[_0x43e0d5(0x1ec)](_0x1938cc),_0x28eaa2=this[_0x43e0d5(0x1ec)](_0x44a3e6);if(_0x42e2bb!==_0x28eaa2)return _0x28eaa2-_0x42e2bb;return 0x0;}),_0x5d8182;},Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x227)]=function(_0x200a36,_0xef513b){const _0x59bb70=_0x1ca737;this[_0x59bb70(0x25a)]();let _0x440d1a=0x0;for(const _0x37a52a of this[_0x59bb70(0x1f1)]()){const _0x53e66f=DataManager['getEquipSetData'](_0x37a52a);if(!_0x53e66f)continue;const _0x12e02e=this[_0x59bb70(0x1ec)](_0x37a52a);for(let _0x4019b9=0x1;_0x4019b9<=_0x12e02e;_0x4019b9++){const _0x390e35=_0x59bb70(0x2c8)[_0x59bb70(0x1f8)](_0x4019b9);if(_0x53e66f[_0x390e35]&&_0x53e66f[_0x390e35][_0x200a36]){const _0x4d264a=_0x59bb70(0x2ce)[_0x59bb70(0x1f8)](_0xef513b);_0x440d1a+=_0x53e66f[_0x390e35][_0x200a36][_0x4d264a]||0x0;}}}return _0x440d1a;},Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x206)]=function(_0x5618d0,_0x4c6829){const _0xc9ee32=_0x1ca737;this[_0xc9ee32(0x25a)]();let _0x5dccbe=0x1;for(const _0x2b9889 of this[_0xc9ee32(0x1f1)]()){const _0x20968c=DataManager['getEquipSetData'](_0x2b9889);if(!_0x20968c)continue;const _0x4efc31=this['getEquipSetPieces'](_0x2b9889);for(let _0x5a3f51=0x1;_0x5a3f51<=_0x4efc31;_0x5a3f51++){const _0x5815ac=_0xc9ee32(0x2c8)[_0xc9ee32(0x1f8)](_0x5a3f51);if(_0x20968c[_0x5815ac]&&_0x20968c[_0x5815ac][_0x5618d0]){const _0x198adc=_0xc9ee32(0x289)[_0xc9ee32(0x1f8)](_0x4c6829);_0x5dccbe*=Math[_0xc9ee32(0x2ff)](_0x20968c[_0x5815ac][_0x5618d0][_0x198adc]||0x1);}}}return _0x5dccbe;},Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x2c6)]=function(){const _0x4994a0=_0x1ca737;this[_0x4994a0(0x25a)]();const _0x2bce6a=this[_0x4994a0(0x26c)][_0x4994a0(0x235)];for(const _0x7ce3b3 of this[_0x4994a0(0x1f1)]()){const _0x539551=DataManager[_0x4994a0(0x1f9)](_0x7ce3b3);if(!_0x539551)continue;const _0x51a2ea=this[_0x4994a0(0x1ec)](_0x7ce3b3);for(let _0x33bd11=0x1;_0x33bd11<=_0x51a2ea;_0x33bd11++){const _0x29aa1b=_0x4994a0(0x2c8)[_0x4994a0(0x1f8)](_0x33bd11);if(_0x539551[_0x29aa1b]&&_0x539551[_0x29aa1b]['PassiveStates'])for(const _0x586caa of _0x539551[_0x29aa1b][_0x4994a0(0x302)]){_0x2bce6a[_0x4994a0(0x285)](_0x586caa);}}}},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2cb)]=Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x2cf)],Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x2cf)]=function(_0x4deb34,_0x18b2b1){const _0x5f0ddb=_0x1ca737;_0x4deb34!==''?(this[_0x5f0ddb(0x29e)]=_0x4deb34,this[_0x5f0ddb(0x216)]=_0x18b2b1):(this[_0x5f0ddb(0x29e)]=undefined,this['_priorityFaceIndex']=undefined);},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2ba)]=Game_Actor[_0x1ca737(0x1f3)]['faceName'],Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x2e6)]=function(){const _0x2dbf66=_0x1ca737;if(this[_0x2dbf66(0x29e)]!==undefined)return this[_0x2dbf66(0x29e)];const _0x523c5a=this[_0x2dbf66(0x28e)]();for(const _0x2c47d3 of _0x523c5a){const _0x298ad5=this['getEquipSetPieces'](_0x2c47d3),_0x8270e1=ImageManager[_0x2dbf66(0x2e5)](this,_0x2c47d3,_0x298ad5);if(_0x8270e1)return _0x8270e1;}return VisuMZ[_0x2dbf66(0x25e)]['Game_Actor_faceName'][_0x2dbf66(0x28c)](this);},VisuMZ[_0x1ca737(0x25e)]['Game_Actor_faceIndex']=Game_Actor['prototype'][_0x1ca737(0x209)],Game_Actor['prototype'][_0x1ca737(0x209)]=function(){const _0x2f21b6=_0x1ca737;if(this['_priorityFaceIndex']!==undefined)return this[_0x2f21b6(0x216)];const _0x51855a=this[_0x2f21b6(0x28e)]();for(const _0x39358c of _0x51855a){const _0x22cd65=this[_0x2f21b6(0x1ec)](_0x39358c),_0x2165f5=ImageManager[_0x2f21b6(0x304)](this,_0x39358c,_0x22cd65);if(_0x2165f5!==undefined)return _0x2165f5;}return VisuMZ[_0x2f21b6(0x25e)][_0x2f21b6(0x28a)][_0x2f21b6(0x28c)](this);},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x21c)]=Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x1ef)],Game_Actor[_0x1ca737(0x1f3)]['setCharacterImage']=function(_0x193a31,_0x442ea8){const _0x270499=_0x1ca737;_0x193a31!==''?(this['_priorityCharacterName']=_0x193a31,this[_0x270499(0x317)]=_0x442ea8):(this[_0x270499(0x22b)]=undefined,this[_0x270499(0x317)]=undefined);},VisuMZ[_0x1ca737(0x25e)]['Game_Actor_characterName']=Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x2ad)],Game_Actor[_0x1ca737(0x1f3)]['characterName']=function(){const _0x548a41=_0x1ca737;if(this[_0x548a41(0x22b)]!==undefined)return this['_priorityCharacterName'];const _0x552cde=this[_0x548a41(0x28e)]();for(const _0x4364fd of _0x552cde){const _0x53b27a=this[_0x548a41(0x1ec)](_0x4364fd),_0x120d48=ImageManager['getActorEquipSetCharacterName'](this,_0x4364fd,_0x53b27a);if(_0x120d48)return _0x120d48;}return VisuMZ[_0x548a41(0x25e)]['Game_Actor_characterName'][_0x548a41(0x28c)](this);},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2ef)]=Game_Actor['prototype'][_0x1ca737(0x255)],Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x255)]=function(){const _0x41ee80=_0x1ca737;if(this[_0x41ee80(0x317)]!==undefined)return this[_0x41ee80(0x317)];const _0x416439=this[_0x41ee80(0x28e)]();for(const _0x1ecdb0 of _0x416439){const _0x4bd764=this['getEquipSetPieces'](_0x1ecdb0),_0x227339=ImageManager[_0x41ee80(0x257)](this,_0x1ecdb0,_0x4bd764);if(_0x227339!==undefined)return _0x227339;}return VisuMZ[_0x41ee80(0x25e)][_0x41ee80(0x2ef)][_0x41ee80(0x28c)](this);},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x217)]=Game_Actor['prototype'][_0x1ca737(0x1f5)],Game_Actor['prototype'][_0x1ca737(0x1f5)]=function(_0xcf7a3a){const _0x363aaa=_0x1ca737;_0xcf7a3a!==''?this[_0x363aaa(0x239)]=_0xcf7a3a:this['_priorityBattlerName']=undefined;},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2ea)]=Game_Actor['prototype'][_0x1ca737(0x2a0)],Game_Actor['prototype'][_0x1ca737(0x2a0)]=function(){const _0x535ccf=_0x1ca737;if(this[_0x535ccf(0x239)]!==undefined)return this[_0x535ccf(0x239)];const _0x5dcba9=this['getEquipSetsSortedByMostPieces']();for(const _0x448755 of _0x5dcba9){const _0x51a604=this[_0x535ccf(0x1ec)](_0x448755),_0x4ac337=ImageManager[_0x535ccf(0x2c7)](this,_0x448755,_0x51a604);if(_0x4ac337)return _0x4ac337;}return VisuMZ[_0x535ccf(0x25e)][_0x535ccf(0x2ea)][_0x535ccf(0x28c)](this);;},VisuMZ['EquipSetBonuses'][_0x1ca737(0x1fd)]=Game_Actor['prototype']['setMenuImage'],Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x1e8)]=function(_0x41b0eb){const _0x59c4cd=_0x1ca737;_0x41b0eb!==''?this[_0x59c4cd(0x25f)]=_0x41b0eb:this['_priorityMenuImage']=undefined;},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2bf)]=Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x25d)],Game_Actor['prototype'][_0x1ca737(0x25d)]=function(){const _0x1cf397=_0x1ca737;if(this[_0x1cf397(0x25f)]!==undefined)return this[_0x1cf397(0x25f)];const _0xb7a33c=this['getEquipSetsSortedByMostPieces']();for(const _0x2ab036 of _0xb7a33c){const _0x31e6f1=this['getEquipSetPieces'](_0x2ab036),_0x119fb3=ImageManager['getActorEquipSetMenuPortrait'](this,_0x2ab036,_0x31e6f1);if(_0x119fb3)return _0x119fb3;}return VisuMZ[_0x1cf397(0x25e)][_0x1cf397(0x2bf)][_0x1cf397(0x28c)](this);;},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x247)]=Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x232)],Game_Actor[_0x1ca737(0x1f3)]['setBattlePortrait']=function(_0x66ad0a){const _0x48082f=_0x1ca737;_0x66ad0a!==''?this[_0x48082f(0x266)]=_0x66ad0a:this[_0x48082f(0x266)]=undefined;if(SceneManager['isSceneBattle']()&&$gameParty[_0x48082f(0x249)]()[_0x48082f(0x2df)](this)){const _0x345a70=SceneManager['_scene'][_0x48082f(0x264)];if(_0x345a70)_0x345a70[_0x48082f(0x272)](this);}},VisuMZ[_0x1ca737(0x25e)]['Game_Actor_getBattlePortraitFilename']=Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x211)],Game_Actor[_0x1ca737(0x1f3)][_0x1ca737(0x211)]=function(){const _0x59ab40=_0x1ca737;if(this[_0x59ab40(0x266)]!==undefined)return this['_priorityBattlePortrait'];const _0x1016e4=this['getEquipSetsSortedByMostPieces']();for(const _0x3ae023 of _0x1016e4){const _0x20c485=this[_0x59ab40(0x1ec)](_0x3ae023),_0x5d09e0=ImageManager[_0x59ab40(0x2c5)](this,_0x3ae023,_0x20c485);if(_0x5d09e0)return _0x5d09e0;}return VisuMZ[_0x59ab40(0x25e)][_0x59ab40(0x213)][_0x59ab40(0x28c)](this);;},VisuMZ[_0x1ca737(0x25e)]['Scene_Base_createWindowLayer']=Scene_Base['prototype'][_0x1ca737(0x311)],Scene_Base[_0x1ca737(0x1f3)][_0x1ca737(0x311)]=function(){const _0x5d4302=_0x1ca737;VisuMZ['EquipSetBonuses']['Scene_Base_createWindowLayer'][_0x5d4302(0x28c)](this),this[_0x5d4302(0x243)]();},Scene_Base[_0x1ca737(0x1f3)][_0x1ca737(0x243)]=function(){const _0x492cc6=_0x1ca737;if(!Window_EquipSetBonusTooltip[_0x492cc6(0x2e3)])return;this['_equipSetBonusTooltipWindow']=new Window_EquipSetBonusTooltip(),this[_0x492cc6(0x319)](this[_0x492cc6(0x1fb)]);},Scene_Base[_0x1ca737(0x1f3)]['hideEquipSetBonusTooltipWindow']=function(){const _0x44a83c=_0x1ca737;this[_0x44a83c(0x1fb)]&&this[_0x44a83c(0x1fb)][_0x44a83c(0x1f0)]();},Scene_Base[_0x1ca737(0x1f3)][_0x1ca737(0x23c)]=function(){const _0x3fbedb=_0x1ca737;this['_equipSetBonusTooltipWindow']&&this[_0x3fbedb(0x1fb)][_0x3fbedb(0x2e8)]();},VisuMZ['EquipSetBonuses'][_0x1ca737(0x2f5)]=Scene_Shop[_0x1ca737(0x1f3)][_0x1ca737(0x26f)],Scene_Shop[_0x1ca737(0x1f3)][_0x1ca737(0x26f)]=function(){const _0x3cc521=_0x1ca737;VisuMZ[_0x3cc521(0x25e)]['Scene_Shop_onBuyOk']['call'](this),this[_0x3cc521(0x2b1)]();},VisuMZ['EquipSetBonuses'][_0x1ca737(0x201)]=Scene_Shop['prototype'][_0x1ca737(0x2ac)],Scene_Shop[_0x1ca737(0x1f3)][_0x1ca737(0x2ac)]=function(){const _0x5d3fe1=_0x1ca737;VisuMZ['EquipSetBonuses'][_0x5d3fe1(0x201)][_0x5d3fe1(0x28c)](this),this[_0x5d3fe1(0x2b1)]();},VisuMZ[_0x1ca737(0x25e)]['Scene_Shop_onNumberOk']=Scene_Shop[_0x1ca737(0x1f3)][_0x1ca737(0x2a3)],Scene_Shop['prototype'][_0x1ca737(0x2a3)]=function(){const _0x37eac7=_0x1ca737;VisuMZ[_0x37eac7(0x25e)][_0x37eac7(0x203)][_0x37eac7(0x28c)](this),this[_0x37eac7(0x23c)]();},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x28b)]=Scene_Shop[_0x1ca737(0x1f3)][_0x1ca737(0x228)],Scene_Shop['prototype'][_0x1ca737(0x228)]=function(){const _0x3cf4e8=_0x1ca737;VisuMZ[_0x3cf4e8(0x25e)][_0x3cf4e8(0x28b)][_0x3cf4e8(0x28c)](this),this['showEquipSetBonusTooltipWindow']();},Window_Selectable['EQUIP_SET_BONUS_WINDOWS']=['Window_BattleItem',_0x1ca737(0x240),_0x1ca737(0x303),_0x1ca737(0x299),_0x1ca737(0x2a5),_0x1ca737(0x236)],VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2da)]=Window_Selectable[_0x1ca737(0x1f3)]['initialize'],Window_Selectable[_0x1ca737(0x1f3)]['initialize']=function(_0x34428c){const _0x19b25b=_0x1ca737;VisuMZ[_0x19b25b(0x25e)][_0x19b25b(0x2da)][_0x19b25b(0x28c)](this,_0x34428c),this['registerEquipSetBonusTooltipWindow']();},Window_Selectable[_0x1ca737(0x1f3)][_0x1ca737(0x21f)]=function(){const _0xc75f17=_0x1ca737;if(!this[_0xc75f17(0x273)]())return;const _0x5e72a3=SceneManager['_scene'];if(!_0x5e72a3)return;this[_0xc75f17(0x1fb)]=_0x5e72a3[_0xc75f17(0x1fb)]||null,this['callUpdateHelp']();},Window_Selectable[_0x1ca737(0x1f3)][_0x1ca737(0x273)]=function(){const _0x13861d=_0x1ca737;if(!Window_EquipSetBonusTooltip['SHOW_TOOLTIP'])return![];return Window_Selectable['EQUIP_SET_BONUS_WINDOWS'][_0x13861d(0x2df)](this['constructor']['name']);},VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x314)]=Window_Selectable[_0x1ca737(0x1f3)][_0x1ca737(0x1e7)],Window_Selectable[_0x1ca737(0x1f3)][_0x1ca737(0x1e7)]=function(){const _0x1ed394=_0x1ca737;VisuMZ['EquipSetBonuses']['Window_Selectable_callUpdateHelp'][_0x1ed394(0x28c)](this),this['updateEquipSetBonusTooltip']();},Window_Selectable[_0x1ca737(0x1f3)][_0x1ca737(0x2e1)]=function(){const _0x316e80=_0x1ca737,_0x20cd1a=this[_0x316e80(0x1fb)];if(_0x20cd1a&&this[_0x316e80(0x271)]){_0x20cd1a[_0x316e80(0x1f4)](this);const _0x58b0b8=_0x20cd1a[_0x316e80(0x2de)]();_0x58b0b8===this&&_0x20cd1a[_0x316e80(0x31a)](this[_0x316e80(0x271)]());}};function Window_EquipSetBonusTooltip(){const _0x4fded0=_0x1ca737;this[_0x4fded0(0x297)](...arguments);}Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)]=Object['create'](Window_Base['prototype']),Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x22c)]=Window_EquipSetBonusTooltip,Window_EquipSetBonusTooltip[_0x1ca737(0x2e3)]=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)][_0x1ca737(0x230)][_0x1ca737(0x312)],Window_EquipSetBonusTooltip[_0x1ca737(0x27d)]=VisuMZ['EquipSetBonuses'][_0x1ca737(0x2af)][_0x1ca737(0x230)][_0x1ca737(0x25c)],Window_EquipSetBonusTooltip['WINDOW_SKIN_FILENAME']=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)]['Tooltip'][_0x1ca737(0x245)],Window_EquipSetBonusTooltip[_0x1ca737(0x294)]=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)][_0x1ca737(0x230)][_0x1ca737(0x25b)],Window_EquipSetBonusTooltip[_0x1ca737(0x1eb)]=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)][_0x1ca737(0x230)][_0x1ca737(0x215)],Window_EquipSetBonusTooltip['MOUSE_OFFSET_Y']=VisuMZ[_0x1ca737(0x25e)][_0x1ca737(0x2af)]['Tooltip']['OffsetY'],Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x297)]=function(){const _0x389347=_0x1ca737,_0x25d186=new Rectangle(0x0,0x0,Graphics['width'],Graphics['height']);Window_Base[_0x389347(0x1f3)]['initialize'][_0x389347(0x28c)](this,_0x25d186),this['scale']['x']=this[_0x389347(0x2a8)]['y']=Window_EquipSetBonusTooltip[_0x389347(0x27d)],this[_0x389347(0x1f0)](),this['_item']=null,this[_0x389347(0x2b9)]=null;},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x2fe)]=function(){const _0x59caf3=_0x1ca737;this['windowskin']=ImageManager['loadSystem'](Window_EquipSetBonusTooltip[_0x59caf3(0x1f2)]);},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x252)]=function(){const _0x1ff068=_0x1ca737;this[_0x1ff068(0x246)]=Window_EquipSetBonusTooltip[_0x1ff068(0x294)];},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x31a)]=function(_0xfef182){const _0x395f78=_0x1ca737;if(this['_item']===_0xfef182)return;this[_0x395f78(0x208)]=_0xfef182,this[_0x395f78(0x208)]?this[_0x395f78(0x21b)]():this[_0x395f78(0x1f0)]();},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)]['getActiveWindow']=function(){return this['_activeWindow']||null;},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x1f4)]=function(_0x2e8232){const _0x584406=_0x1ca737;if(!_0x2e8232['active'])return;this['_activeWindow']=_0x2e8232,this[_0x584406(0x24b)]();},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x2e8)]=function(){const _0x18c650=_0x1ca737;this[_0x18c650(0x2e4)]['clear'](),this[_0x18c650(0x2fb)]();if(this['_text']['length']>0x0){this[_0x18c650(0x22a)]();const _0x4e47e9=this[_0x18c650(0x231)]();this['resetFontSettings'](),this[_0x18c650(0x254)](this[_0x18c650(0x27e)][_0x18c650(0x2ee)]()),this[_0x18c650(0x2d2)](this[_0x18c650(0x2b7)],_0x4e47e9['x'],_0x4e47e9['y'],_0x4e47e9[_0x18c650(0x269)]),this[_0x18c650(0x2a4)]();}else this[_0x18c650(0x1f0)]();},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)]['processNewLine']=function(_0x567635){const _0x3b2301=_0x1ca737;Window_Base[_0x3b2301(0x1f3)]['processNewLine']['call'](this,_0x567635),_0x567635[_0x3b2301(0x274)]&&this['changePaintOpacity'](this['_lineOpacity'][_0x3b2301(0x2ee)]());},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)]['setupText']=function(){const _0x489d92=_0x1ca737;this[_0x489d92(0x2b7)]='',this['_lineOpacity']=[];if(!this['_item'])return;for(const _0xc0ed64 of DataManager['getEquipSets'](this[_0x489d92(0x208)])){const _0x14baa5=DataManager[_0x489d92(0x1f9)](_0xc0ed64);if(!_0x14baa5)continue;this[_0x489d92(0x316)](_0x14baa5);}this['_text']=this[_0x489d92(0x2b7)][_0x489d92(0x225)]();},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)]['addSetDataText']=function(_0x38dbb6){const _0x4c00d9=_0x1ca737;if(!_0x38dbb6)return;const _0xa3725f=_0x38dbb6[_0x4c00d9(0x295)],_0x179cdd=_0x38dbb6[_0x4c00d9(0x270)]?_0x4c00d9(0x2fc)[_0x4c00d9(0x1f8)](_0x38dbb6[_0x4c00d9(0x270)]):'';this[_0x4c00d9(0x2b7)]+=TextManager[_0x4c00d9(0x233)][_0x4c00d9(0x1f8)](_0xa3725f,_0x179cdd)+'\x0a',this[_0x4c00d9(0x27e)]['push'](!![]);for(let _0x1084cd=0x1;_0x1084cd<=0x14;_0x1084cd++){const _0x2d7448=_0x38dbb6[_0x4c00d9(0x2c8)[_0x4c00d9(0x1f8)](_0x1084cd)];this['addPieceDataText'](_0x38dbb6,_0x2d7448,_0x1084cd);}},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)]['addPieceDataText']=function(_0x4bf167,_0x57e21a,_0x4a684c){const _0x29db33=_0x1ca737;if(!_0x57e21a)return;if(_0x57e21a[_0x29db33(0x2c2)]===undefined)return;if(!_0x57e21a[_0x29db33(0x28d)])return;let _0x1526e2='';_0x57e21a['Text']['toLowerCase']()['trim']()!==_0x29db33(0x288)?_0x1526e2=_0x57e21a[_0x29db33(0x2c2)]+'\x0a':_0x1526e2=this[_0x29db33(0x26e)](_0x57e21a),_0x1526e2['trim']()!==''&&(this['_text']+=TextManager[_0x29db33(0x310)]['format'](_0x4a684c,_0x1526e2)+'\x0a',this[_0x29db33(0x305)](_0x4bf167,_0x4a684c));},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)]['createAutoPieceText']=function(_0x3d884b){const _0x140021=_0x1ca737;let _0x31ffd6='';const _0x323aa6=[];if(_0x3d884b[_0x140021(0x302)])for(const _0x1eab39 of _0x3d884b[_0x140021(0x302)]){const _0x43a610=$dataStates[_0x1eab39];if(!_0x43a610)continue;if(_0x43a610[_0x140021(0x20c)]<=0x0)continue;if(_0x43a610['name'][_0x140021(0x225)]()==='')continue;if(_0x43a610[_0x140021(0x29b)][_0x140021(0x2f9)](/-----/i))continue;const _0x3a8832='\x5cI[%1]'[_0x140021(0x1f8)](_0x43a610['iconIndex']),_0x142c3e=TextManager[_0x140021(0x2d4)][_0x140021(0x1f8)](_0x43a610[_0x140021(0x29b)],_0x3a8832);_0x323aa6[_0x140021(0x285)](_0x142c3e);}if(_0x3d884b[_0x140021(0x284)]){const _0x2c7700=[_0x140021(0x204),'MAXMP',_0x140021(0x2aa),_0x140021(0x298),_0x140021(0x248),_0x140021(0x315),_0x140021(0x1ed),_0x140021(0x309)],_0x5de65d=this['createAutoParamText'](_0x3d884b,_0x140021(0x284),_0x2c7700);while(_0x5de65d[_0x140021(0x24a)]>0x0)_0x323aa6[_0x140021(0x285)](_0x5de65d[_0x140021(0x2ee)]());}if(_0x3d884b['XParam']){const _0x21df32=[_0x140021(0x2dc),_0x140021(0x21e),_0x140021(0x20f),'CEV',_0x140021(0x292),_0x140021(0x2e7),_0x140021(0x2fa),'HRG',_0x140021(0x20b),_0x140021(0x1f7)],_0x8980f4=this[_0x140021(0x281)](_0x3d884b,_0x140021(0x27b),_0x21df32);while(_0x8980f4['length']>0x0)_0x323aa6[_0x140021(0x285)](_0x8980f4[_0x140021(0x2ee)]());}if(_0x3d884b[_0x140021(0x30a)]){const _0x647e9f=[_0x140021(0x2be),_0x140021(0x223),'REC',_0x140021(0x24f),_0x140021(0x30c),_0x140021(0x306),'PDR',_0x140021(0x200),_0x140021(0x28f),_0x140021(0x2b8)],_0x129583=this[_0x140021(0x281)](_0x3d884b,'SParam',_0x647e9f);while(_0x129583['length']>0x0)_0x323aa6[_0x140021(0x285)](_0x129583['shift']());}for(const _0x44862a of _0x323aa6){if(_0x44862a[_0x140021(0x24a)]<=0x0)continue;_0x31ffd6[_0x140021(0x24a)]<=0x0?_0x31ffd6+=_0x44862a:_0x31ffd6=TextManager[_0x140021(0x2ca)][_0x140021(0x1f8)](_0x31ffd6,_0x44862a);}return _0x31ffd6['trim']();},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x281)]=function(_0x3e8c6a,_0x1f1a55,_0x155ad3){const _0x1b88e9=_0x1ca737,_0x215564=[],_0x3f0f23=_0x155ad3['length'];for(let _0x321b3d=0x0;_0x321b3d<_0x3f0f23;_0x321b3d++){const _0x595499=TextManager[_0x1b88e9(0x2b6)](_0x155ad3[_0x321b3d]),_0x31d696=Number(_0x3e8c6a[_0x1f1a55]['Rate%1'[_0x1b88e9(0x1f8)](_0x321b3d)]||0x1),_0x4ab79a=Number(_0x3e8c6a[_0x1f1a55][_0x1b88e9(0x2ce)[_0x1b88e9(0x1f8)](_0x321b3d)]||0x0);if(_0x31d696!==0x1){const _0x54d0e8=TextManager[_0x1b88e9(0x2ae)],_0x93a902=Math[_0x1b88e9(0x2f3)](_0x31d696*0x64)+'%',_0xe889fb=_0x54d0e8[_0x1b88e9(0x1f8)](_0x595499,_0x93a902);_0x215564['push'](_0xe889fb);}if(_0x4ab79a!==0x0){const _0x16ed69=_0x4ab79a>0x0?TextManager[_0x1b88e9(0x22f)]:TextManager[_0x1b88e9(0x30e)];let _0x1d7f12=Math['abs'](_0x4ab79a);_0x1f1a55!==_0x1b88e9(0x284)&&(_0x1d7f12=Math[_0x1b88e9(0x2f3)](_0x1d7f12*0x64)+'%');const _0x2f640f=_0x16ed69[_0x1b88e9(0x1f8)](_0x595499,_0x1d7f12);_0x215564[_0x1b88e9(0x285)](_0x2f640f);}}return _0x215564;},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)]['pushLineOpacity']=function(_0xedcb11,_0x306489){const _0x2f5cd1=_0x1ca737,_0x51c1aa=SceneManager[_0x2f5cd1(0x238)];if([_0x2f5cd1(0x1ff)][_0x2f5cd1(0x2df)](_0x51c1aa[_0x2f5cd1(0x22c)][_0x2f5cd1(0x29b)])){const _0x276b5e=_0x51c1aa[_0x2f5cd1(0x23a)](),_0x1ad95c=_0xedcb11[_0x2f5cd1(0x295)][_0x2f5cd1(0x2bb)]()['trim'](),_0x28fe48=_0x276b5e[_0x2f5cd1(0x1ec)](_0x1ad95c);this[_0x2f5cd1(0x27e)][_0x2f5cd1(0x285)](_0x28fe48>=_0x306489);}else this[_0x2f5cd1(0x27e)]['push'](!![]);},Window_EquipSetBonusTooltip['prototype'][_0x1ca737(0x22a)]=function(){const _0x2aff75=_0x1ca737,_0x13d382=this[_0x2aff75(0x29a)](this[_0x2aff75(0x2b7)]);this[_0x2aff75(0x269)]=_0x13d382[_0x2aff75(0x269)]+(this['itemPadding']()+this[_0x2aff75(0x293)])*0x2,this[_0x2aff75(0x2f6)]=_0x13d382[_0x2aff75(0x2f6)]+this[_0x2aff75(0x293)]*0x2,this['createContents'](),this[_0x2aff75(0x2a6)]();},Window_EquipSetBonusTooltip['prototype'][_0x1ca737(0x2c1)]=function(){const _0x1e6c8b=_0x1ca737;Window_Base[_0x1e6c8b(0x1f3)][_0x1e6c8b(0x2c1)][_0x1e6c8b(0x28c)](this),this['_requestRefresh']&&(this[_0x1e6c8b(0x27f)]=![],this['refresh']()),this[_0x1e6c8b(0x24b)]();},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x21b)]=function(){const _0x40f8a9=_0x1ca737;this[_0x40f8a9(0x27f)]=!![];},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x24b)]=function(){const _0x2190de=_0x1ca737;if(!this[_0x2190de(0x2ab)])return;if(!this[_0x2190de(0x2b9)])return;if(!this[_0x2190de(0x2b9)][_0x2190de(0x2d8)])return;const _0x2b4f8a=SceneManager[_0x2190de(0x238)][_0x2190de(0x262)],_0x5dc732=this[_0x2190de(0x2b9)]['itemRect'](this[_0x2190de(0x2b9)][_0x2190de(0x280)]()),_0x57d826=this[_0x2190de(0x2b9)][_0x2190de(0x293)],_0x4324a6=this[_0x2190de(0x2f6)]*(Window_EquipSetBonusTooltip[_0x2190de(0x27d)]||0.01);this['x']=this['_activeWindow']['x']+_0x2b4f8a['x']+_0x5dc732['x']+_0x57d826+Window_EquipSetBonusTooltip[_0x2190de(0x1eb)],this['y']=this['_activeWindow']['y']+_0x2b4f8a['y']+_0x5dc732['y']+Math[_0x2190de(0x237)](_0x5dc732['height']/0x2)+_0x57d826+Window_EquipSetBonusTooltip[_0x2190de(0x2ed)],this['y']+_0x4324a6>Graphics[_0x2190de(0x2f6)]&&(this['y']=this['_activeWindow']['y']+_0x2b4f8a['y']+_0x5dc732['y']+Math[_0x2190de(0x237)](_0x5dc732[_0x2190de(0x2f6)]/0x2)-_0x4324a6-Window_EquipSetBonusTooltip['MOUSE_OFFSET_Y']),this[_0x2190de(0x2c3)]();},Window_EquipSetBonusTooltip[_0x1ca737(0x1f3)][_0x1ca737(0x2c3)]=function(){const _0x1d6401=_0x1ca737,_0x3d8d9e=this[_0x1d6401(0x269)]*(Window_EquipSetBonusTooltip[_0x1d6401(0x27d)]||0.01),_0x22e10d=this['height']*(Window_EquipSetBonusTooltip[_0x1d6401(0x27d)]||0.01);this['x']=Math[_0x1d6401(0x237)](this['x'][_0x1d6401(0x210)](0x0,Graphics['width']-_0x3d8d9e)),this['y']=Math[_0x1d6401(0x237)](this['y']['clamp'](0x0,Graphics['height']-_0x22e10d));};
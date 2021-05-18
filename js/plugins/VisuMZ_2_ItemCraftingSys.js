//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
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
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
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
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
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
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General will is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
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
 * @param ItemCraftingSys
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
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0"}
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
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 */
//=============================================================================

const _0xb75a=['armors','initItemCraftingSys','setMainMenuItemCraftingVisible','drawTooltipBackground','craftableWeapons','IngredientTitle','Sound','createAnimationIDs','ZFTgv','drawCurrentItemName','_commandWindow','gold','clear','setBackgroundOpacity','_itemSprite','loseItem','emkBf','jlDbT','_goldWindow','show','ARRAYSTR','AnySwitches','fJiDx','_allCraftableWeapons','allowCreateStatusWindow','deactivate','match','Items','buyWindowRectItemsEquipsCore','_itemIDs','destroyItemSprite','applyInverse','_allCraftableItems','craftableArmors','height','refresh','textColor','helpWindowRectItemsEquipsCore','BjCMz','return\x200','setHelpWindow','drawItem','_scene','TGCsb','SYTdw','updateTooltipWindow','floor','changeTextColor','createCommandWindow','changeOkButtonEnable','GoldIcon','lIaPk','pYebg','NoMask','Afacj','map','exit','anchor','drawIngredientItem','all','ShowMainMenu','createIngredientSelectionList','sOxZF','maxCols','Window_ItemCategory_needsSelection','isItem','allCraftableItems','MaskItalics','BgSettings','playItemCrafting','isUseModernControls','_ingredientAmounts','join','setClickHandler','trim','isCraftItemListed','_clickHandler','CKMuN','createJS','isPlaying','CoreEngine','updateAnimationSprite','getInputMultiButtonStrings','customCraftingOnly','itemLineRect','drawIcon','jsGlobalListing','onNumberCancel','processItemCrafting','changePaintOpacity','wuwdz','CraftedIcon','isFinishedAnimating','clearCustomItemCraftingSettings','ItemCraftingMenuCommand','ychMS','isShowNew','checkItemCraftingResultsValid','min','drawTotalPrice','Settings','_text','destroyAnimationSprite','hsjyT','addItemCraftingCommandAutomatically','setup','_ingredientIndex','number','BVqGT','isArmor','pzGkA','goldWindowRect','hNoHB','_armorIDs','onIngredientListOk','drawIngredientGold','setCustomItemCraftingSettings','Gold','center','parse','Window_ItemCategory_makeCommandList','OnSwitches','isItemCraftingCommandVisible','wHrnN','OffSwitches','category','visible','setItemSpriteOpacity','PGLWq','MvUGv','setHelpWindowItem','doesItemHaveOpenCategories','toLowerCase','isSceneItemCrafting','SelectedText','_maxIngredientsSize','status','zLDCe','_animationWait','_backSprite1','_digitGrouping','weapons','#%1','MNrKZ','CategoryTitle','maskItemName','statusWindowRectItemsEquipsCore','SelectedColor','pOQul','getCustomItemCraftingSettings','addOriginalCommands','dimColor1','tooltipSkin','finishAnimation','toUpperCase','buttonAssistText1','setWindowBackgroundTypes','drawCraftingItemName','call','IconSet','contents','loseGold','ItemCraftingNoCategory','IHnFd','loadTitle2','getColor','onItemCancel','_alreadySelected','ARRAYFUNC','_buttons','_category','_animationIDs','_ingredientSelectTitle','drawText','setItemWindow','centerSprite','hasCustomWindowSkin','getItemCraftedTimes','placeButtons','drawHorzLine','ItemCraftingSceneOpen','BypassMasks','setupNumberWindow','addItemCategory','createCustomBackgroundImages','name','itemHeight','VisuMZ_1_MainMenuCore','qDkHD','resetFontSettings','version','yQIJJ','loadTitle1','setTooltipWindowText','fontItalic','BypassSwitches','_buttonAssistWindow','addItemCraftingCommand','allItems','makeCommandList','isItemCraftingCommandEnabled','_max','max','_ingredientSelectList','Ingredients','MaskLetter','constructor','IngredientList','systemColor','iconHeight','left','initItemCraftingMainMenu','STRUCT','lgeLu','string','_categoryWindow','Type','_itemsCrafted','onNumberOk','_statusWindow','needsSelection','animationIDs','_helpWindow','getItemIdWithName','AiaHo','tooltipFrameCheckRequirements','Name','updateCraftingAnimation','smoothSelect','width','remove','Game_System_initialize','refreshCursor','setHandler','General','addUncategorizedItemCategory','contains','ARRAYSTRUCT','setItem','PBfAH','iconIndex','Mjasz','qoRAr','itemRectWithPadding','totalPriceY','boxHeight','_number','_nonCategoryItemCraftingItems','_craftingIngredients','addLoadListener','updateHelp','statusWindowRect','createItemWindowBase','filter','_itemSpriteOpacitySpeed','scrollTo','addWindow','worldTransform','opacity','drawItemBackground','category:\x20%1','_customItemCraftingSettings','ELlWQ','split','fontSize','CvVDY','buttonAssistCategory','SnapshotOpacity','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','removeChild','TurnSwitches','BgFilename1','down','vzAbH','helpWindowRect','currentCraftableItems','processFinishAnimation','QrsvZ','buttonAssistText2','updateItemSpriteOpacity','create','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_animationSprite','JUATh','_itemWindow','drawItemName','createNumberWindow','fillRect','activate','_item','CadXD','push','playStaticSe','_windowLayer','innerHeight','setItemSpriteFrame','startAnimation','\x5cI[%1]%2','TAUhi','Scale','createUncategorizedItemCategory','isMainMenuItemCraftingVisible','value','_data','innerWidth','boxWidth','commandItemCrafting','qktDK','OwYmA','loadSystem','items','drawCraftedIcon','setValue','cancel','GoldOverlap','isMVAnimation','kmjDK','drawTotalGold','includes','categories','VisuMZ_0_CoreEngine','_context','onCategoryOk','windowskin','itemCraftingMask','_ItemCrafting_MainMenu','jsOnCraft','terminate','loadWindowskin','qTjsp','process_VisuMZ_ItemCraftingSys_Notetags','CVZyk','drawMultiplicationSign','isTouchOkEnabled','buttonAssistLargeIncrement','active','note','BDWhh','YYrdh','uWbkA','callUpdateHelp','imageSmoothingEnabled','createGoldWindow','commandWindowRectItemsEquipsCore','StatusBgType','VisuMZ_1_ItemsEquipsCore','iconWidth','%1/%2','createStatusWindow','shown','Icon','fSqZF','smooth','maskItalics','format','shift','PZUZz','ShowAnimations','yKtGr','itemNameY','addCommand','isTriggered','item','ConvertParams','xlFhg','SuOvr','parseCraftingIngredientsData','Window','parameters','drawIngredientCategory','vbQhA','zrgNb','FqSAj','setItemSpriteBitmap','onDatabaseLoaded','isDIT','weapon','createIngredientSelectionTitle','yHmdk','dimColor2','_backSprite2','ShopScene','NvdRz','getBackgroundOpacity','Item','resetTextColor','qyfwN','SfLSi','lPRLR','ListBgType','drawCraftingIngredients','drawNumber','itemCrafting','registerCommand','GoldFontSize','setupSelectIngredientWindow','kgPIB','STR','gainItem','makeItemList','_animationPlaying','EnableMainMenu','isCraftingItemMasked','onIngredientListCancel','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','CraftAssistButton','round','createTooltipWindow','enabled','AOlob','_allCraftableArmors','drawCurrencyValue','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BgFilename2','numItems','drawTextEx','onItemCrafted','RrEcp','playCancel','ARRAYNUM','lwCWz','addChild','pXnpe','_numberWindow','hide','isEnabled','onButtonOk','setStatusWindow','buttonAssistText4','setItemSpritePosition','getArmorIdWithName','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','JSON','getWeaponIdWithName','UaxiD','isOkEnabled','getCraftingIngredients','lineHeight','_amount','_tooltipWindow','XgdSk','rLTri','Show','createAnimation','clearUserSelectedIngredients','update','itemCraftingNumberWindowOk','RegExp','epywb','Animation','Scene_Menu_createCommandWindow','buttonAssistKey2','MaskText','bitmap','craftableItems','currencyUnit','pHsYX','Window_ItemCategory_addItemCategory','EVAL','selectedIngredientList','index','powerDownColor','itemCraftingIngredientsBridge','JkVFE','multiplicationSignX','ZQkVQ','armor','CheckAnySwitches','textWidth','categoryList','hitIndex','Scene_Boot_onDatabaseLoaded','ToolTips','fittingHeight','isTouchedInsideFrame','adjustSprite','description','ZoxqA','buttonAssistItemListRequirement','buttonY','quantityFontSize','setText','itemPadding','MainMenu','CheckAllSwitches','createItemSprite','createCraftingItemKey','setMainMenuItemCraftingEnabled','bind','ReqQuantityFontSize','itemCraftedIcon','gradientFillRect','isReleased','AllSwitches','itemAt','CategoryBgType','FUNC','ItemQuantityFmt','selectLast','prototype','ItemCraftingSys','drawBigItemIcon','itemWindowRect','concat','VfAVM','createContents','drawFadedItemBackground','buttonAssistKey1','right','psFki','ShowWindows','_ingredientsList','SystemShowItemCraftingMenu','setBackgroundType','scale','bANVZ','Window_MenuCommand_addOriginalCommands','pAfKt','Uncategorized','determineMax','Enable','isWeapon','onItemOk','isItemCrafted','NoCategoryIcon','ItemScene','ItemsEquipsCore','isSceneBattle','cJkBK','_ingredientCategories','allCraftableArmors','_weaponIDs','createBackground','AaMvX','length','vUctC','activateItemWindow','Animations','categoryWindowRect','CategoryIcon','Mask','registerCraftedItem','initialize'];(function(_0x5827ab,_0xb75a28){const _0x19e231=function(_0x506a1c){while(--_0x506a1c){_0x5827ab['push'](_0x5827ab['shift']());}};_0x19e231(++_0xb75a28);}(_0xb75a,0x1ed));const _0x19e2=function(_0x5827ab,_0xb75a28){_0x5827ab=_0x5827ab-0x0;let _0x19e231=_0xb75a[_0x5827ab];return _0x19e231;};const _0x3fec7a=_0x19e2;var label=_0x3fec7a('0x7'),tier=tier||0x0,dependencies=[_0x3fec7a('0x18b')],pluginData=$plugins[_0x3fec7a('0x12f')](function(_0x512302){const _0x4ccc02=_0x3fec7a;return _0x512302[_0x4ccc02('0xba')]&&_0x512302[_0x4ccc02('0x20e')][_0x4ccc02('0x170')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3fec7a('0x96')]||{},VisuMZ[_0x3fec7a('0x19d')]=function(_0xb2eb06,_0x374b18){const _0x894c1a=_0x3fec7a;for(const _0x152fc5 in _0x374b18){if('RrEcp'!==_0x894c1a('0x1d3')){function _0x2d14ca(){const _0x9e342d=_0x894c1a;if(!_0x501f62)return![];if(_0xeae84[_0x9e342d('0x1e6')](_0x1431b3)[_0x9e342d('0x29')]<=0x0)return![];if(_0x723778['note'][_0x9e342d('0x4c')](_0x53b957['ItemCraftingSys'][_0x9e342d('0x1f1')][_0x9e342d('0x85')])){if(!_0x192df5[_0x9e342d('0xc7')]())return![];}if(!_0x55e62a[_0x9e342d('0x7')][_0x9e342d('0x96')][_0x9e342d('0x11c')][_0x9e342d('0x88')]['call'](this,_0x10f77b))return![];if(!_0x518ff2['ItemCraftingSys'][_0x9e342d('0x216')](_0x5ca71a))return![];if(!_0x2cbc78[_0x9e342d('0x7')]['CheckAnySwitches'](_0x2baad7))return![];return!![];}}else{if(_0x152fc5['match'](/(.*):(.*)/i)){if('ZSQbp'!==_0x894c1a('0x20f')){const _0x20656f=String(RegExp['$1']),_0x1effc6=String(RegExp['$2'])[_0x894c1a('0xcc')]()[_0x894c1a('0x7c')]();let _0x9c8318,_0x4ee2f4,_0x2575cf;switch(_0x1effc6){case'NUM':_0x9c8318=_0x374b18[_0x152fc5]!==''?Number(_0x374b18[_0x152fc5]):0x0;break;case _0x894c1a('0x1d5'):_0x4ee2f4=_0x374b18[_0x152fc5]!==''?JSON[_0x894c1a('0xa9')](_0x374b18[_0x152fc5]):[],_0x9c8318=_0x4ee2f4['map'](_0x2e07da=>Number(_0x2e07da));break;case _0x894c1a('0x1fc'):_0x9c8318=_0x374b18[_0x152fc5]!==''?eval(_0x374b18[_0x152fc5]):null;break;case'ARRAYEVAL':_0x4ee2f4=_0x374b18[_0x152fc5]!==''?JSON['parse'](_0x374b18[_0x152fc5]):[],_0x9c8318=_0x4ee2f4[_0x894c1a('0x69')](_0x1f2212=>eval(_0x1f2212));break;case _0x894c1a('0x1e2'):_0x9c8318=_0x374b18[_0x152fc5]!==''?JSON[_0x894c1a('0xa9')](_0x374b18[_0x152fc5]):'';break;case'ARRAYJSON':_0x4ee2f4=_0x374b18[_0x152fc5]!==''?JSON[_0x894c1a('0xa9')](_0x374b18[_0x152fc5]):[],_0x9c8318=_0x4ee2f4[_0x894c1a('0x69')](_0x18f263=>JSON['parse'](_0x18f263));break;case _0x894c1a('0x3'):_0x9c8318=_0x374b18[_0x152fc5]!==''?new Function(JSON[_0x894c1a('0xa9')](_0x374b18[_0x152fc5])):new Function(_0x894c1a('0x59'));break;case _0x894c1a('0xda'):_0x4ee2f4=_0x374b18[_0x152fc5]!==''?JSON[_0x894c1a('0xa9')](_0x374b18[_0x152fc5]):[],_0x9c8318=_0x4ee2f4['map'](_0xdcc353=>new Function(JSON[_0x894c1a('0xa9')](_0xdcc353)));break;case _0x894c1a('0x1bf'):_0x9c8318=_0x374b18[_0x152fc5]!==''?String(_0x374b18[_0x152fc5]):'';break;case _0x894c1a('0x46'):_0x4ee2f4=_0x374b18[_0x152fc5]!==''?JSON[_0x894c1a('0xa9')](_0x374b18[_0x152fc5]):[],_0x9c8318=_0x4ee2f4[_0x894c1a('0x69')](_0x35a443=>String(_0x35a443));break;case _0x894c1a('0x106'):_0x2575cf=_0x374b18[_0x152fc5]!==''?JSON[_0x894c1a('0xa9')](_0x374b18[_0x152fc5]):{},_0x9c8318=VisuMZ[_0x894c1a('0x19d')]({},_0x2575cf);break;case _0x894c1a('0x11f'):_0x4ee2f4=_0x374b18[_0x152fc5]!==''?JSON[_0x894c1a('0xa9')](_0x374b18[_0x152fc5]):[],_0x9c8318=_0x4ee2f4[_0x894c1a('0x69')](_0x57bb31=>VisuMZ[_0x894c1a('0x19d')]({},JSON[_0x894c1a('0xa9')](_0x57bb31)));break;default:continue;}_0xb2eb06[_0x20656f]=_0x9c8318;}else{function _0x420602(){const _0x41ea43=_0x894c1a;typeof _0x85eb06===_0x41ea43('0x108')&&_0x428d37['match'](/CATEGORY/i)&&(_0x28915f=this[_0x41ea43('0x12')][_0x478e0a],_0xbc03b9+=0x1),_0x1346df[_0x41ea43('0x41')](_0x15e40a,_0x59aa90,![]);}}}}}return _0xb2eb06;},(_0x5b51ab=>{const _0x2ca3c=_0x3fec7a,_0x47e712=_0x5b51ab[_0x2ca3c('0xeb')];for(const _0x1df042 of dependencies){if(!Imported[_0x1df042]){if(_0x2ca3c('0x1d6')===_0x2ca3c('0x1d6')){alert(_0x2ca3c('0x13e')[_0x2ca3c('0x194')](_0x47e712,_0x1df042)),SceneManager[_0x2ca3c('0x6a')]();break;}else{function _0x4fb300(){const _0x19d36e=_0x2ca3c;_0xc89e8e[_0x19d36e('0x155')](_0x2724b6);}}}}const _0x47ee7f=_0x5b51ab[_0x2ca3c('0x20e')];if(_0x47ee7f['match'](/\[Version[ ](.*?)\]/i)){const _0x320ee5=Number(RegExp['$1']);_0x320ee5!==VisuMZ[label][_0x2ca3c('0xf0')]&&(alert(_0x2ca3c('0x1e1')[_0x2ca3c('0x194')](_0x47e712,_0x320ee5)),SceneManager[_0x2ca3c('0x6a')]());}if(_0x47ee7f[_0x2ca3c('0x4c')](/\[Tier[ ](\d+)\]/i)){if('FdXhe'==='FdXhe'){const _0x1c8f8c=Number(RegExp['$1']);if(_0x1c8f8c<tier)alert(_0x2ca3c('0x1ce')[_0x2ca3c('0x194')](_0x47e712,_0x1c8f8c,tier)),SceneManager['exit']();else{if(_0x2ca3c('0x42')!==_0x2ca3c('0xee'))tier=Math[_0x2ca3c('0xfc')](_0x1c8f8c,tier);else{function _0x35eff0(){const _0x4739af=_0x2ca3c;if(!this[_0x4739af('0x181')])return![];if(!this['item']())return![];if(!this[_0x4739af('0x20c')]())return![];if(this[_0x4739af('0x208')]()!==this['index']())return![];return!![];}}}}else{function _0x5dca81(){const _0x1acc54=_0x2ca3c,_0x2c1fe1=this['itemWindowRect'](),_0x24a22b=new _0x394487(_0x2c1fe1);_0x24a22b[_0x1acc54('0x1da')](),_0x24a22b[_0x1acc54('0x5a')](this[_0x1acc54('0x110')]),_0x24a22b[_0x1acc54('0x1dd')](this[_0x1acc54('0x10d')]),_0x24a22b[_0x1acc54('0x11b')]('ok',this[_0x1acc54('0xa4')]['bind'](this)),_0x24a22b[_0x1acc54('0x11b')](_0x1acc54('0x16b'),this[_0x1acc54('0x1c5')][_0x1acc54('0x21a')](this)),this['_ingredientSelectList']=_0x24a22b,this[_0x1acc54('0x132')](this['_ingredientSelectList']);}}}VisuMZ[_0x2ca3c('0x19d')](VisuMZ[label][_0x2ca3c('0x96')],_0x5b51ab[_0x2ca3c('0x1a2')]);})(pluginData),PluginManager[_0x3fec7a('0x1bb')](pluginData['name'],_0x3fec7a('0xe6'),_0x1f0f43=>{const _0x4178f7=_0x3fec7a;if(SceneManager['isSceneBattle']())return;if(SceneManager[_0x4178f7('0xb7')]())return;SceneManager['push'](Scene_ItemCrafting);}),PluginManager[_0x3fec7a('0x1bb')](pluginData[_0x3fec7a('0xeb')],'CustomItemCraftingSceneOpen',_0x4757ea=>{const _0x5be731=_0x3fec7a;if(SceneManager[_0x5be731('0x22')]())return;if(SceneManager['isSceneItemCrafting']())return;VisuMZ[_0x5be731('0x19d')](_0x4757ea,_0x4757ea);const _0x16be8a={'items':_0x4757ea[_0x5be731('0x4d')]['map'](_0x365569=>$dataItems[_0x365569])[_0x5be731('0x12f')](_0x598b95=>DataManager[_0x5be731('0x74')]()[_0x5be731('0x170')](_0x598b95)),'weapons':_0x4757ea['Weapons'][_0x5be731('0x69')](_0x4a622e=>$dataWeapons[_0x4a622e])[_0x5be731('0x12f')](_0xeaa838=>DataManager['allCraftableWeapons']()[_0x5be731('0x170')](_0xeaa838)),'armors':_0x4757ea['Armors']['map'](_0x3d981c=>$dataArmors[_0x3d981c])['filter'](_0x1fd7b8=>DataManager[_0x5be731('0x25')]()['includes'](_0x1fd7b8)),'BypassSwitches':_0x4757ea[_0x5be731('0xf5')],'BypassMasks':_0x4757ea[_0x5be731('0xe7')]};_0x16be8a[_0x5be731('0x6d')]=_0x16be8a[_0x5be731('0x168')][_0x5be731('0xa')](_0x16be8a['weapons'],_0x16be8a['armors']),$gameTemp[_0x5be731('0xa6')](_0x16be8a),SceneManager['push'](Scene_ItemCrafting);}),PluginManager[_0x3fec7a('0x1bb')](pluginData[_0x3fec7a('0xeb')],'SystemEnableItemCraftingMenu',_0x2c7672=>{const _0x408032=_0x3fec7a;VisuMZ['ConvertParams'](_0x2c7672,_0x2c7672),$gameSystem[_0x408032('0x219')](_0x2c7672[_0x408032('0x1b')]);}),PluginManager[_0x3fec7a('0x1bb')](pluginData[_0x3fec7a('0xeb')],_0x3fec7a('0x13'),_0x1dd854=>{const _0x2cec19=_0x3fec7a;VisuMZ[_0x2cec19('0x19d')](_0x1dd854,_0x1dd854),$gameSystem[_0x2cec19('0x34')](_0x1dd854[_0x2cec19('0x1ec')]);}),VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x209')]=Scene_Boot[_0x3fec7a('0x6')][_0x3fec7a('0x1a8')],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x5db188=_0x3fec7a;VisuMZ[_0x5db188('0x7')][_0x5db188('0x209')][_0x5db188('0xd0')](this),this[_0x5db188('0x17c')]();},Scene_Boot[_0x3fec7a('0x6')][_0x3fec7a('0x17c')]=function(){this['process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags']();},VisuMZ[_0x3fec7a('0x7')]['RegExp']={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i},Scene_Boot[_0x3fec7a('0x6')][_0x3fec7a('0x1c6')]=function(){const _0x37ccf6=_0x3fec7a,_0x29c13c=$dataItems[_0x37ccf6('0xa')]($dataWeapons,$dataArmors);for(const _0x5f2f6b of _0x29c13c){if(!_0x5f2f6b)continue;_0x5f2f6b[_0x37ccf6('0x182')]['match'](VisuMZ['ItemCraftingSys'][_0x37ccf6('0x1f1')][_0x37ccf6('0x178')])&&VisuMZ['ItemCraftingSys']['createJS'](_0x5f2f6b,RegExp['$1']);}},VisuMZ[_0x3fec7a('0x7')]['JS']={},VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x80')]=function(_0x30b629,_0x52122a){const _0x58686d=_0x3fec7a,_0x345b9c=_0x58686d('0x14b')[_0x58686d('0x194')](_0x52122a),_0x3e4bce=DataManager['createCraftingItemKey'](_0x30b629);VisuMZ['ItemCraftingSys']['JS'][_0x3e4bce]=new Function(_0x345b9c);},DataManager['isCraftItemListed']=function(_0x1118d5){const _0x1a31a4=_0x3fec7a;if(!_0x1118d5)return![];if(DataManager[_0x1a31a4('0x1e6')](_0x1118d5)[_0x1a31a4('0x29')]<=0x0)return![];if(_0x1118d5[_0x1a31a4('0x182')][_0x1a31a4('0x4c')](VisuMZ[_0x1a31a4('0x7')]['RegExp'][_0x1a31a4('0x85')])){if(_0x1a31a4('0x5d')!==_0x1a31a4('0x5d')){function _0xac7c0c(){this['_customItemCraftingSettings']=_0x2961c7;}}else{if(!$gameTemp['getCustomItemCraftingSettings']())return![];}}if(!VisuMZ['ItemCraftingSys'][_0x1a31a4('0x96')]['General']['jsGlobalListing'][_0x1a31a4('0xd0')](this,_0x1118d5))return![];if(!VisuMZ[_0x1a31a4('0x7')]['CheckAllSwitches'](_0x1118d5))return![];if(!VisuMZ[_0x1a31a4('0x7')][_0x1a31a4('0x205')](_0x1118d5))return![];return!![];},VisuMZ[_0x3fec7a('0x7')]['CheckAllSwitches']=function(_0x47e7ec){const _0x2059b7=_0x3fec7a,_0x127ddd=$gameTemp[_0x2059b7('0xc7')]();if(_0x127ddd&&_0x127ddd['BypassSwitches'])return!![];const _0x1616e0=VisuMZ[_0x2059b7('0x7')][_0x2059b7('0x1f1')][_0x2059b7('0x0')],_0x4434cc=_0x47e7ec['note'][_0x2059b7('0x4c')](_0x1616e0);if(_0x4434cc)for(const _0x37e74c of _0x4434cc){if(!_0x37e74c)continue;_0x37e74c[_0x2059b7('0x4c')](_0x1616e0);const _0x451a5d=JSON[_0x2059b7('0xa9')]('['+RegExp['$1'][_0x2059b7('0x4c')](/\d+/g)+']');for(const _0x395eac of _0x451a5d){if(_0x2059b7('0xb3')==='MvUGv'){if(!$gameSwitches[_0x2059b7('0x160')](_0x395eac))return![];}else{function _0x3f4a52(){const _0x1694e5=_0x2059b7;_0x293096[_0x1694e5('0x7')][_0x1694e5('0x17')]['call'](this),this[_0x1694e5('0xf7')]();}}}}return!![];},VisuMZ[_0x3fec7a('0x7')]['CheckAnySwitches']=function(_0x1e1f62){const _0x4a5839=_0x3fec7a,_0x4388b6=$gameTemp[_0x4a5839('0xc7')]();if(_0x4388b6&&_0x4388b6[_0x4a5839('0xf5')])return!![];const _0x1ef142=VisuMZ[_0x4a5839('0x7')][_0x4a5839('0x1f1')][_0x4a5839('0x47')],_0x4f0ada=_0x1e1f62[_0x4a5839('0x182')][_0x4a5839('0x4c')](_0x1ef142);if(_0x4f0ada){if(_0x4a5839('0x123')===_0x4a5839('0x13b')){function _0xc5182(){const _0x300fe9=_0x4a5839;_0x2b1b6b[_0x300fe9('0x156')](_0x56b49f['ItemCraftingSys']['Settings'][_0x300fe9('0x38')]);}}else{for(const _0x5d204b of _0x4f0ada){if(_0x4a5839('0x17b')===_0x4a5839('0x166')){function _0x39d7ce(){const _0x31ffe2=_0x4a5839,_0x3c8aa0=this[_0x31ffe2('0x19c')]()&&_0x248e94[_0x31ffe2('0x1c4')](this['item']())?null:this[_0x31ffe2('0x19c')]();this[_0x31ffe2('0xb4')](_0x3c8aa0),this['_statusWindow']&&this[_0x31ffe2('0x10d')][_0x31ffe2('0x100')]===_0x2f1a6f&&this[_0x31ffe2('0x10d')][_0x31ffe2('0x120')](_0x3c8aa0);}}else{if(!_0x5d204b)continue;_0x5d204b[_0x4a5839('0x4c')](_0x1ef142);const _0x3b7ef9=JSON[_0x4a5839('0xa9')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xf4c9ed of _0x3b7ef9){if($gameSwitches[_0x4a5839('0x160')](_0xf4c9ed))return!![];}}}return![];}}return!![];},DataManager['currentCraftableItems']=function(){const _0xcaa626=_0x3fec7a,_0x263a81=$gameTemp[_0xcaa626('0xc7')]();if(_0x263a81)return _0x263a81['all'][_0xcaa626('0x12f')](_0x3ccaf2=>this[_0xcaa626('0x7d')](_0x3ccaf2));const _0x1ebe7e=this[_0xcaa626('0x1f8')](),_0x10c09f=this[_0xcaa626('0x36')](),_0x4e30bf=this[_0xcaa626('0x53')]();return _0x1ebe7e[_0xcaa626('0xa')](_0x10c09f,_0x4e30bf);},DataManager['craftableItems']=function(){const _0x2bb3f2=_0x3fec7a;return this[_0x2bb3f2('0x74')]()['filter'](_0x285d7d=>this['isCraftItemListed'](_0x285d7d));},DataManager['allCraftableItems']=function(){const _0xd4dd2c=_0x3fec7a;if(this['_allCraftableItems']!==undefined)return this[_0xd4dd2c('0x52')];this[_0xd4dd2c('0x52')]=[];for(const _0x2d0d11 of $dataItems){if(!_0x2d0d11)continue;_0x2d0d11['note'][_0xd4dd2c('0x4c')](VisuMZ[_0xd4dd2c('0x7')]['RegExp'][_0xd4dd2c('0xfe')])&&this['_allCraftableItems']['push'](_0x2d0d11);}return this[_0xd4dd2c('0x52')];},DataManager[_0x3fec7a('0x36')]=function(){const _0x48329=_0x3fec7a;return this['allCraftableWeapons']()['filter'](_0x124070=>this[_0x48329('0x7d')](_0x124070));},DataManager['allCraftableWeapons']=function(){const _0x265895=_0x3fec7a;if(this[_0x265895('0x49')]!==undefined)return this[_0x265895('0x49')];this['_allCraftableWeapons']=[];for(const _0x4cb7c3 of $dataWeapons){if(_0x265895('0x91')!==_0x265895('0x8c')){if(!_0x4cb7c3)continue;_0x4cb7c3['note'][_0x265895('0x4c')](VisuMZ[_0x265895('0x7')][_0x265895('0x1f1')]['Ingredients'])&&this[_0x265895('0x49')]['push'](_0x4cb7c3);}else{function _0x227d6f(){const _0x37144f=_0x265895,_0x51596={'BgFilename1':_0x205bbd[_0x37144f('0x7')][_0x37144f('0x96')][_0x37144f('0x76')]['BgFilename1'],'BgFilename2':_0x2b3201[_0x37144f('0x7')][_0x37144f('0x96')][_0x37144f('0x76')][_0x37144f('0x1cf')]};_0x51596&&(_0x51596[_0x37144f('0x141')]!==''||_0x51596[_0x37144f('0x1cf')]!=='')&&(this[_0x37144f('0xbd')]=new _0x16d492(_0x2ee1d4['loadTitle1'](_0x51596[_0x37144f('0x141')])),this[_0x37144f('0x1ae')]=new _0x1c6d51(_0x5419cb[_0x37144f('0xd6')](_0x51596[_0x37144f('0x1cf')])),this['addChild'](this[_0x37144f('0xbd')]),this['addChild'](this['_backSprite2']),this[_0x37144f('0xbd')][_0x37144f('0x1f7')][_0x37144f('0x12b')](this[_0x37144f('0x20d')]['bind'](this,this[_0x37144f('0xbd')])),this[_0x37144f('0x1ae')][_0x37144f('0x1f7')][_0x37144f('0x12b')](this['adjustSprite'][_0x37144f('0x21a')](this,this[_0x37144f('0x1ae')])));}}}return this[_0x265895('0x49')];},DataManager[_0x3fec7a('0x53')]=function(){const _0x10e1c4=_0x3fec7a;return this[_0x10e1c4('0x25')]()[_0x10e1c4('0x12f')](_0x19b727=>this[_0x10e1c4('0x7d')](_0x19b727));},DataManager[_0x3fec7a('0x25')]=function(){const _0x254980=_0x3fec7a;if(this[_0x254980('0x1cc')]!==undefined)return this[_0x254980('0x1cc')];this['_allCraftableArmors']=[];for(const _0x155e6c of $dataArmors){if('PGLWq'===_0x254980('0xb2')){if(!_0x155e6c)continue;if(_0x155e6c[_0x254980('0x182')][_0x254980('0x4c')](VisuMZ[_0x254980('0x7')][_0x254980('0x1f1')][_0x254980('0xfe')])){if('lnnMf'==='dkodC'){function _0x2bfee9(){const _0x3b37ad=_0x254980;_0x44c33b[_0x3b37ad('0xca')]!==''?this[_0x3b37ad('0x175')]=_0x5c92c3[_0x3b37ad('0x167')](_0x56e2b2['tooltipSkin']):_0x4ef42b[_0x3b37ad('0x6')][_0x3b37ad('0x17a')][_0x3b37ad('0xd0')](this);}}else this[_0x254980('0x1cc')][_0x254980('0x155')](_0x155e6c);}}else{function _0x7962cb(){const _0x12b5a4=_0x254980;let _0x1556fc=_0x45d970[0x0],_0x4c5724='';if(_0x1556fc===_0x12b5a4('0x3d'))_0x4c5724=_0x5a278e[_0x12b5a4('0x1f9')];else typeof _0x1556fc===_0x12b5a4('0x108')&&_0x1556fc[_0x12b5a4('0x4c')](/CATEGORY/i)?(_0x1556fc['match'](/CATEGORY: (.*)/i),_0x4c5724=_0x52c7b1(_0x1fc518['$1'])[_0x12b5a4('0x7c')]()):_0x4c5724=_0x1556fc['name'];this[_0x12b5a4('0x1e9')][_0x12b5a4('0x213')](_0x4c5724['trim']());return;}}}return this['_allCraftableArmors'];},DataManager[_0x3fec7a('0x1e6')]=function(_0x117284){const _0x2f2f30=_0x3fec7a;if(!_0x117284)return[];const _0x2b4c36=this[_0x2f2f30('0x218')](_0x117284);if(this[_0x2f2f30('0x12a')]===undefined){if(_0x2f2f30('0x1ac')===_0x2f2f30('0x1b5')){function _0x442ede(){const _0x4a25e3=_0x2f2f30;this[_0x4a25e3('0x97')]=_0x29e51b,this['refresh']();}}else this['createCraftingIngredientsLists']();}return this['_craftingIngredients'][_0x2b4c36]||[];},DataManager[_0x3fec7a('0x218')]=function(_0x36d6b7){const _0x19c9ad=_0x3fec7a;let _0x319f2f='%1%2';if(this['isItem'](_0x36d6b7))return _0x319f2f['format'](_0x19c9ad('0x1b2'),_0x36d6b7['id']);if(this[_0x19c9ad('0x1c')](_0x36d6b7))return _0x319f2f[_0x19c9ad('0x194')]('Weapon',_0x36d6b7['id']);if(this['isArmor'](_0x36d6b7))return _0x319f2f[_0x19c9ad('0x194')]('Armor',_0x36d6b7['id']);return'';},DataManager['createCraftingIngredientsLists']=function(){const _0x5e41e4=_0x3fec7a;this['_craftingIngredients']={};const _0xc99614=$dataItems[_0x5e41e4('0xa')]($dataWeapons,$dataArmors);for(const _0x3672aa of _0xc99614){if(!_0x3672aa)continue;if(_0x3672aa[_0x5e41e4('0x182')][_0x5e41e4('0x4c')](VisuMZ['ItemCraftingSys']['RegExp']['Ingredients'])){const _0xa1c6ce=String(RegExp['$1'])[_0x5e41e4('0x139')](/[\r\n]+/),_0x42be55=this['parseCraftingIngredientsData'](_0x3672aa,_0xa1c6ce);if(_0x42be55['length']<=0x0)continue;const _0x5d4f91=this[_0x5e41e4('0x218')](_0x3672aa);this[_0x5e41e4('0x12a')][_0x5d4f91]=_0x42be55;}}},DataManager[_0x3fec7a('0x1a0')]=function(_0x50ce9c,_0x54cc34){const _0x4f6b9e=_0x3fec7a;let _0x22a340=[];for(const _0xd3eb72 of _0x54cc34){if(_0xd3eb72[_0x4f6b9e('0x4c')](/GOLD:[ ](\d+)/i))_0x22a340[_0x4f6b9e('0x155')](['gold',Number(RegExp['$1'])]);else{if(_0xd3eb72[_0x4f6b9e('0x4c')](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x1ad4fc=String(RegExp['$1'])[_0x4f6b9e('0x7c')](),_0x1ac65d=Number(RegExp['$2'])||0x1,_0x5c2b86=_0x4f6b9e('0x136')[_0x4f6b9e('0x194')](_0x1ad4fc);_0x22a340[_0x4f6b9e('0x155')]([_0x5c2b86,_0x1ac65d]);}else{if(_0xd3eb72[_0x4f6b9e('0x4c')](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x201395=RegExp['$1'][_0x4f6b9e('0xb6')]()[_0x4f6b9e('0x7c')](),_0x858949=Number(RegExp['$2'])||0x0,_0x4b0165=Number(RegExp['$3'])||0x1;let _0x3436a6=null;if([_0x4f6b9e('0x19c'),_0x4f6b9e('0x168')][_0x4f6b9e('0x170')](_0x201395))_0x3436a6=$dataItems;if([_0x4f6b9e('0x1aa'),'weapons'][_0x4f6b9e('0x170')](_0x201395))_0x3436a6=$dataWeapons;if([_0x4f6b9e('0x204'),_0x4f6b9e('0x32')][_0x4f6b9e('0x170')](_0x201395))_0x3436a6=$dataArmors;if(this['checkItemCraftingResultsValid'](_0x50ce9c,_0x3436a6,_0x858949,_0x22a340)){if(_0x4f6b9e('0x107')!==_0x4f6b9e('0x1a9'))_0x22a340['push']([_0x3436a6[_0x858949],_0x4b0165]);else{function _0x46b69b(){const _0x585b86=_0x4f6b9e;_0x53e302[_0x585b86('0x118')](_0x4ac75a);}}}}else{if(_0xd3eb72[_0x4f6b9e('0x4c')](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x4fd0a9=RegExp['$1']['toLowerCase']()[_0x4f6b9e('0x7c')](),_0x3aa30f=RegExp['$2'][_0x4f6b9e('0x7c')](),_0x55b542=Number(RegExp['$3'])||0x1;let _0x4d53f7=null,_0x48aca4=0x0;if([_0x4f6b9e('0x19c'),'items']['includes'](_0x4fd0a9)){if(_0x4f6b9e('0x19e')===_0x4f6b9e('0x7f')){function _0x594bfb(){const _0x386923=_0x4f6b9e;if(!this[_0x386923('0x1c2')])return;this[_0x386923('0x149')](),this['updateAnimationSprite'](),this['isFinishedAnimating']()&&this['processFinishAnimation']();}}else _0x4d53f7=$dataItems,_0x48aca4=this[_0x4f6b9e('0x111')](_0x3aa30f);}[_0x4f6b9e('0x1aa'),_0x4f6b9e('0xbf')][_0x4f6b9e('0x170')](_0x4fd0a9)&&(_0x4d53f7=$dataWeapons,_0x48aca4=this[_0x4f6b9e('0x1e3')](_0x3aa30f)),[_0x4f6b9e('0x204'),_0x4f6b9e('0x32')][_0x4f6b9e('0x170')](_0x4fd0a9)&&(_0x4d53f7=$dataArmors,_0x48aca4=this[_0x4f6b9e('0x1e0')](_0x3aa30f)),this['checkItemCraftingResultsValid'](_0x50ce9c,_0x4d53f7,_0x48aca4,_0x22a340)&&_0x22a340[_0x4f6b9e('0x155')]([_0x4d53f7[_0x48aca4],_0x55b542]);}}}}}return _0x22a340;},DataManager[_0x3fec7a('0x93')]=function(_0xfe8206,_0x3783dd,_0x19d0fe,_0x4385f5){const _0x3e4c63=_0x3fec7a;if(!_0x3783dd)return![];if(!_0x3783dd[_0x19d0fe])return![];const _0x4a7503=_0x3783dd[_0x19d0fe];if(_0x4a7503===_0xfe8206)return![];for(const _0x2f6e30 of _0x4385f5){if(_0x3e4c63('0x16')==='bANVZ'){if(!_0x2f6e30)continue;if(_0x2f6e30[0x0]===_0x4a7503)return![];}else{function _0x31904b(){const _0x5dc1b8=_0x3e4c63,_0x39b58d=_0x11eb50[_0x5dc1b8('0x7')][_0x5dc1b8('0x96')]['General'];let _0x213bef=_0x39b58d[_0x5dc1b8('0x19')]||_0x5dc1b8('0x19'),_0xcb8944=_0x39b58d['NoCategoryIcon']||0xa0;_0x213bef=_0x5dc1b8('0x15b')[_0x5dc1b8('0x194')](_0xcb8944,_0x213bef),this['addCommand'](_0x213bef,_0x5dc1b8('0xaf'),!![],_0x5dc1b8('0xd4'));}}}return!![];},DataManager[_0x3fec7a('0x111')]=function(_0x39e1b0){const _0x26ab45=_0x3fec7a;_0x39e1b0=_0x39e1b0['toUpperCase']()[_0x26ab45('0x7c')](),this[_0x26ab45('0x4f')]=this[_0x26ab45('0x4f')]||{};if(this[_0x26ab45('0x4f')][_0x39e1b0])return this[_0x26ab45('0x4f')][_0x39e1b0];for(const _0x4e0482 of $dataItems){if(!_0x4e0482)continue;this[_0x26ab45('0x4f')][_0x4e0482['name'][_0x26ab45('0xcc')]()[_0x26ab45('0x7c')]()]=_0x4e0482['id'];}return this[_0x26ab45('0x4f')][_0x39e1b0]||0x0;},DataManager[_0x3fec7a('0x1e3')]=function(_0x3f4e9c){const _0x37b5ac=_0x3fec7a;_0x3f4e9c=_0x3f4e9c[_0x37b5ac('0xcc')]()['trim'](),this['_weaponIDs']=this['_weaponIDs']||{};if(this[_0x37b5ac('0x26')][_0x3f4e9c])return this[_0x37b5ac('0x26')][_0x3f4e9c];for(const _0x56fc63 of $dataWeapons){if(!_0x56fc63)continue;this[_0x37b5ac('0x26')][_0x56fc63[_0x37b5ac('0xeb')][_0x37b5ac('0xcc')]()[_0x37b5ac('0x7c')]()]=_0x56fc63['id'];}return this[_0x37b5ac('0x26')][_0x3f4e9c]||0x0;},DataManager['getArmorIdWithName']=function(_0xf74135){const _0x7ec020=_0x3fec7a;_0xf74135=_0xf74135[_0x7ec020('0xcc')]()[_0x7ec020('0x7c')](),this['_armorIDs']=this[_0x7ec020('0xa3')]||{};if(this['_armorIDs'][_0xf74135])return this[_0x7ec020('0xa3')][_0xf74135];for(const _0x51611c of $dataArmors){if(!_0x51611c)continue;this[_0x7ec020('0xa3')][_0x51611c[_0x7ec020('0xeb')]['toUpperCase']()[_0x7ec020('0x7c')]()]=_0x51611c['id'];}return this[_0x7ec020('0xa3')][_0xf74135]||0x0;},DataManager['isCraftingItemMasked']=function(_0x288938){const _0x81970=_0x3fec7a;if(!_0x288938)return![];if(!VisuMZ[_0x81970('0x7')]['Settings']['Mask']['Enable'])return![];const _0x21ba7e=$gameTemp[_0x81970('0xc7')]();if(_0x21ba7e&&_0x21ba7e[_0x81970('0xe7')])return![];if(_0x288938['note']['match'](VisuMZ['ItemCraftingSys']['RegExp'][_0x81970('0x67')]))return![];return!$gameSystem[_0x81970('0x1e')](_0x288938);},ImageManager['itemCraftedIcon']=VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x96')]['General'][_0x3fec7a('0x8d')],SoundManager[_0x3fec7a('0x77')]=function(_0xcfd83a){const _0x54bf7a=_0x3fec7a;AudioManager[_0x54bf7a('0x156')](VisuMZ['ItemCraftingSys'][_0x54bf7a('0x96')][_0x54bf7a('0x38')]);},TextManager[_0x3fec7a('0x200')]=VisuMZ['ItemCraftingSys'][_0x3fec7a('0x96')]['General']['IngredientBridge'],TextManager[_0x3fec7a('0x1f0')]=VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x96')][_0x3fec7a('0x11c')][_0x3fec7a('0x1c7')],TextManager[_0x3fec7a('0x176')]=VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x96')][_0x3fec7a('0x2f')][_0x3fec7a('0xff')],TextManager[_0x3fec7a('0x90')]=VisuMZ['ItemCraftingSys'][_0x3fec7a('0x96')][_0x3fec7a('0x215')][_0x3fec7a('0x114')],ColorManager[_0x3fec7a('0xd7')]=function(_0x424393){const _0x2d17b8=_0x3fec7a;_0x424393=String(_0x424393);if(_0x424393[_0x2d17b8('0x4c')](/#(.*)/i))return _0x2d17b8('0xc0')['format'](String(RegExp['$1']));else{if(_0x2d17b8('0x65')!==_0x2d17b8('0x65')){function _0x263a9c(){const _0x2467a0=_0x2d17b8;this[_0x2467a0('0x1a3')](_0x54d333,_0x563027,_0x47fe62,_0xe28930,_0x3b984c);}}else return this['textColor'](Number(_0x424393));}},SceneManager[_0x3fec7a('0x22')]=function(){const _0x3a053c=_0x3fec7a;return this[_0x3a053c('0x5c')]&&this[_0x3a053c('0x5c')][_0x3a053c('0x100')]===Scene_Battle;},SceneManager[_0x3fec7a('0xb7')]=function(){const _0x2d4cae=_0x3fec7a;return this['_scene']&&this[_0x2d4cae('0x5c')][_0x2d4cae('0x100')]===Scene_ItemCrafting;},Game_Temp[_0x3fec7a('0x6')][_0x3fec7a('0xc7')]=function(){return this['_customItemCraftingSettings'];},Game_Temp[_0x3fec7a('0x6')][_0x3fec7a('0x8f')]=function(){this['_customItemCraftingSettings']=undefined;},Game_Temp[_0x3fec7a('0x6')]['setCustomItemCraftingSettings']=function(_0x3233ca){const _0x25088a=_0x3fec7a;this[_0x25088a('0x137')]=_0x3233ca;},VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x119')]=Game_System['prototype'][_0x3fec7a('0x31')],Game_System[_0x3fec7a('0x6')][_0x3fec7a('0x31')]=function(){const _0xb2bd8d=_0x3fec7a;VisuMZ[_0xb2bd8d('0x7')][_0xb2bd8d('0x119')][_0xb2bd8d('0xd0')](this),this['initItemCraftingMainMenu'](),this[_0xb2bd8d('0x33')]();},Game_System['prototype'][_0x3fec7a('0x105')]=function(){const _0x1ef8fc=_0x3fec7a;this[_0x1ef8fc('0x177')]={'shown':VisuMZ['ItemCraftingSys'][_0x1ef8fc('0x96')][_0x1ef8fc('0x215')][_0x1ef8fc('0x6e')],'enabled':VisuMZ[_0x1ef8fc('0x7')]['Settings'][_0x1ef8fc('0x215')][_0x1ef8fc('0x1c3')]};},Game_System['prototype']['isMainMenuItemCraftingVisible']=function(){const _0x36dbd4=_0x3fec7a;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x36dbd4('0x105')]();return this[_0x36dbd4('0x177')][_0x36dbd4('0x18f')];},Game_System['prototype'][_0x3fec7a('0x34')]=function(_0x2d2d78){const _0x194bcb=_0x3fec7a;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x194bcb('0x105')]();this[_0x194bcb('0x177')]['shown']=_0x2d2d78;},Game_System[_0x3fec7a('0x6')]['isMainMenuItemCraftingEnabled']=function(){const _0xae967=_0x3fec7a;if(this[_0xae967('0x177')]===undefined)this[_0xae967('0x105')]();return this[_0xae967('0x177')][_0xae967('0x1ca')];},Game_System[_0x3fec7a('0x6')][_0x3fec7a('0x219')]=function(_0x4a8613){const _0xaab2f4=_0x3fec7a;if(this[_0xaab2f4('0x177')]===undefined)this[_0xaab2f4('0x105')]();this[_0xaab2f4('0x177')]['enabled']=_0x4a8613;},Game_System[_0x3fec7a('0x6')][_0x3fec7a('0x33')]=function(){const _0xb6ab45=_0x3fec7a;this[_0xb6ab45('0x10b')]={'items':{},'weapons':{},'armors':{}};},Game_System[_0x3fec7a('0x6')][_0x3fec7a('0x1e')]=function(_0x23bf80){const _0x1f5137=_0x3fec7a;return!!this[_0x1f5137('0xe3')](_0x23bf80);},Game_System[_0x3fec7a('0x6')]['getItemCraftedTimes']=function(_0x550fd6){const _0x510931=_0x3fec7a;if(!_0x550fd6)return![];if(this['_itemsCrafted']===undefined)this[_0x510931('0x33')]();let _0x3e8d64={};if(DataManager[_0x510931('0x73')](_0x550fd6))_0x3e8d64=this[_0x510931('0x10b')][_0x510931('0x168')];if(DataManager['isWeapon'](_0x550fd6))_0x3e8d64=this[_0x510931('0x10b')][_0x510931('0xbf')];if(DataManager[_0x510931('0x9f')](_0x550fd6))_0x3e8d64=this[_0x510931('0x10b')][_0x510931('0x32')];return _0x3e8d64[_0x550fd6['id']]||0x0;},Game_System[_0x3fec7a('0x6')][_0x3fec7a('0x30')]=function(_0x333edf,_0x3fd14d){const _0x36322e=_0x3fec7a;if(!_0x333edf)return![];if(this[_0x36322e('0x10b')]===undefined)this['initItemCraftingSys']();_0x3fd14d=_0x3fd14d||0x1;let _0x49650b={};if(DataManager[_0x36322e('0x73')](_0x333edf))_0x49650b=this[_0x36322e('0x10b')]['items'];if(DataManager[_0x36322e('0x1c')](_0x333edf))_0x49650b=this['_itemsCrafted'][_0x36322e('0xbf')];if(DataManager[_0x36322e('0x9f')](_0x333edf))_0x49650b=this[_0x36322e('0x10b')][_0x36322e('0x32')];_0x49650b[_0x333edf['id']]=_0x49650b[_0x333edf['id']]||0x0,_0x49650b[_0x333edf['id']]+=_0x3fd14d;},VisuMZ['ItemCraftingSys'][_0x3fec7a('0x1f4')]=Scene_Menu['prototype'][_0x3fec7a('0x62')],Scene_Menu['prototype'][_0x3fec7a('0x62')]=function(){const _0x6b6054=_0x3fec7a;VisuMZ[_0x6b6054('0x7')]['Scene_Menu_createCommandWindow'][_0x6b6054('0xd0')](this);const _0xa90956=this[_0x6b6054('0x3c')];_0xa90956['setHandler'](_0x6b6054('0x1ba'),this['commandItemCrafting'][_0x6b6054('0x21a')](this));},Scene_Menu[_0x3fec7a('0x6')][_0x3fec7a('0x164')]=function(){const _0x2262f8=_0x3fec7a;SceneManager[_0x2262f8('0x155')](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x503fe4=_0x3fec7a;this[_0x503fe4('0x31')](...arguments);}Scene_ItemCrafting['prototype']=Object[_0x3fec7a('0x14a')](Scene_Item['prototype']),Scene_ItemCrafting['prototype'][_0x3fec7a('0x100')]=Scene_ItemCrafting,Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x31')]=function(){const _0x444372=_0x3fec7a;Scene_Item[_0x444372('0x6')][_0x444372('0x31')][_0x444372('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x1ef')]=function(){const _0x4713b9=_0x3fec7a;Scene_Item[_0x4713b9('0x6')]['update']['call'](this),this[_0x4713b9('0x115')]();},Scene_ItemCrafting['prototype'][_0x3fec7a('0x14a')]=function(){const _0x51aa79=_0x3fec7a;Scene_Item[_0x51aa79('0x6')][_0x51aa79('0x14a')][_0x51aa79('0xd0')](this),this[_0x51aa79('0x188')](),this['createNumberWindow'](),this[_0x51aa79('0x1ab')](),this[_0x51aa79('0x6f')]();if(this[_0x51aa79('0x78')]()){if(_0x51aa79('0xc6')!==_0x51aa79('0xc6')){function _0x2ef665(){const _0x168833=_0x51aa79;_0x458941[_0x168833('0x155')]([_0x168833('0x3d'),_0x3382fb(_0x160d3d['$1'])]);}}else this['onCategoryOk']();}this['setWindowBackgroundTypes']();},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0xce')]=function(){const _0x514c1f=_0x3fec7a,_0x3443f9=VisuMZ[_0x514c1f('0x7')][_0x514c1f('0x96')][_0x514c1f('0x1a1')];this[_0x514c1f('0x110')]&&this[_0x514c1f('0x110')][_0x514c1f('0x14')](_0x3443f9['HelpBgType']);this[_0x514c1f('0x109')]&&this['_categoryWindow'][_0x514c1f('0x14')](_0x3443f9[_0x514c1f('0x2')]);if(this[_0x514c1f('0x44')]){if(_0x514c1f('0x138')===_0x514c1f('0x203')){function _0x54946f(){const _0xabbcee=_0x514c1f;this[_0xabbcee('0x24')]=[],this['_ingredientAmounts']=[],this[_0xabbcee('0x12')]=[],this['_ingredientIndex']=0x0;}}else this[_0x514c1f('0x44')][_0x514c1f('0x14')](_0x3443f9['GoldBgType']);}this[_0x514c1f('0x14e')]&&this[_0x514c1f('0x14e')][_0x514c1f('0x14')](_0x3443f9[_0x514c1f('0x1b7')]);this['_statusWindow']&&this['_statusWindow'][_0x514c1f('0x14')](_0x3443f9[_0x514c1f('0x18a')]);if(this[_0x514c1f('0xde')]){if(_0x514c1f('0x14d')!==_0x514c1f('0x14d')){function _0x55d6dc(){const _0x27e898=_0x514c1f;return _0x58700e['prototype'][_0x27e898('0x57')]['call'](this);}}else this[_0x514c1f('0xde')][_0x514c1f('0x14')](_0x3443f9[_0x514c1f('0x37')]);}this['_ingredientSelectList']&&this[_0x514c1f('0xfd')][_0x514c1f('0x14')](_0x3443f9[_0x514c1f('0x101')]);if(this['_numberWindow']){if(_0x514c1f('0xad')===_0x514c1f('0xa2')){function _0xcae80(){const _0x55a073=_0x514c1f,_0x10576a=_0x5da779['$1'][_0x55a073('0xb6')]()['trim'](),_0x4125a4=_0x4930b3(_0x593ac5['$2'])||0x0,_0x4faf65=_0x5429fe(_0x2a17bc['$3'])||0x1;let _0x3c96e8=null;if([_0x55a073('0x19c'),_0x55a073('0x168')]['includes'](_0x10576a))_0x3c96e8=_0x1c0e9c;if([_0x55a073('0x1aa'),_0x55a073('0xbf')]['includes'](_0x10576a))_0x3c96e8=_0x452f5f;if([_0x55a073('0x204'),_0x55a073('0x32')]['includes'](_0x10576a))_0x3c96e8=_0x57197;this[_0x55a073('0x93')](_0x4d2ef4,_0x3c96e8,_0x4125a4,_0x35724a)&&_0x490e93[_0x55a073('0x155')]([_0x3c96e8[_0x4125a4],_0x4faf65]);}}else this[_0x514c1f('0x1d9')][_0x514c1f('0x14')](_0x3443f9['NumberBgType']);}this[_0x514c1f('0xf6')]&&this[_0x514c1f('0xf6')]['setBackgroundType'](_0x3443f9['ButtonAssistBgType']);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x144')]=function(){const _0x67eb4a=_0x3fec7a;return Scene_Shop[_0x67eb4a('0x6')][_0x67eb4a('0x57')][_0x67eb4a('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x188')]=function(){const _0x38050f=_0x3fec7a,_0x330852=this[_0x38050f('0xa1')]();this['_goldWindow']=new Window_Gold(_0x330852),this[_0x38050f('0x132')](this['_goldWindow']);},Scene_ItemCrafting[_0x3fec7a('0x6')]['goldWindowRect']=function(){const _0x2d84e2=_0x3fec7a;return Scene_Shop[_0x2d84e2('0x6')]['goldWindowRectItemsEquipsCore'][_0x2d84e2('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x2d')]=function(){const _0x30961c=_0x3fec7a;return Scene_Shop['prototype']['commandWindowRectItemsEquipsCore'][_0x30961c('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')]['createItemWindow']=function(){const _0x5f0c41=_0x3fec7a;this[_0x5f0c41('0x12e')](),this[_0x5f0c41('0x78')]()&&this['postCreateItemWindowModernControls'](),this[_0x5f0c41('0x4a')]()&&(this[_0x5f0c41('0x18e')](),this[_0x5f0c41('0x132')](this[_0x5f0c41('0x14e')]));},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x12e')]=function(){const _0x47ce8b=_0x3fec7a,_0x508017=this[_0x47ce8b('0x9')]();this[_0x47ce8b('0x14e')]=new Window_ItemCraftingList(_0x508017),this[_0x47ce8b('0x14e')][_0x47ce8b('0x5a')](this['_helpWindow']),this[_0x47ce8b('0x14e')][_0x47ce8b('0x11b')]('ok',this[_0x47ce8b('0x1d')][_0x47ce8b('0x21a')](this)),this[_0x47ce8b('0x14e')][_0x47ce8b('0x11b')](_0x47ce8b('0x16b'),this[_0x47ce8b('0xd8')][_0x47ce8b('0x21a')](this)),this[_0x47ce8b('0x132')](this[_0x47ce8b('0x14e')]),this['_categoryWindow'][_0x47ce8b('0xe0')](this[_0x47ce8b('0x14e')]),!this[_0x47ce8b('0x109')][_0x47ce8b('0x10e')]()&&(this[_0x47ce8b('0x14e')]['y']-=this[_0x47ce8b('0x109')]['height'],this[_0x47ce8b('0x14e')][_0x47ce8b('0x54')]+=this[_0x47ce8b('0x109')][_0x47ce8b('0x54')],this[_0x47ce8b('0x109')][_0x47ce8b('0x1da')](),this[_0x47ce8b('0x109')][_0x47ce8b('0x4b')](),this[_0x47ce8b('0x174')]());},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x9')]=function(){const _0x14450a=_0x3fec7a;return this[_0x14450a('0x3c')]=this[_0x14450a('0x109')],Scene_Shop[_0x14450a('0x6')][_0x14450a('0x4e')][_0x14450a('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x12d')]=function(){const _0x44c0c1=_0x3fec7a;return Scene_Shop[_0x44c0c1('0x6')][_0x44c0c1('0xc4')]['call'](this);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x150')]=function(){const _0x38ecec=_0x3fec7a,_0x432be7=this[_0x38ecec('0x9')]();this['_numberWindow']=new Window_ItemCraftingNumber(_0x432be7),this[_0x38ecec('0x1d9')][_0x38ecec('0x1da')](),this[_0x38ecec('0x1d9')][_0x38ecec('0x11b')]('ok',this[_0x38ecec('0x10c')][_0x38ecec('0x21a')](this)),this[_0x38ecec('0x1d9')][_0x38ecec('0x11b')]('cancel',this[_0x38ecec('0x89')][_0x38ecec('0x21a')](this)),this[_0x38ecec('0x132')](this[_0x38ecec('0x1d9')]);},Scene_ItemCrafting[_0x3fec7a('0x6')]['createIngredientSelectionTitle']=function(){const _0x22aa29=_0x3fec7a,_0x15e483=this[_0x22aa29('0x2d')]();this['_ingredientSelectTitle']=new Window_Selectable(_0x15e483),this[_0x22aa29('0xde')]['hide'](),this['addWindow'](this[_0x22aa29('0xde')]);},Scene_ItemCrafting['prototype'][_0x3fec7a('0x6f')]=function(){const _0x1e6557=_0x3fec7a,_0x483359=this['itemWindowRect'](),_0x21e7f5=new Window_ItemCraftingIngredient(_0x483359);_0x21e7f5[_0x1e6557('0x1da')](),_0x21e7f5[_0x1e6557('0x5a')](this[_0x1e6557('0x110')]),_0x21e7f5[_0x1e6557('0x1dd')](this[_0x1e6557('0x10d')]),_0x21e7f5['setHandler']('ok',this[_0x1e6557('0xa4')][_0x1e6557('0x21a')](this)),_0x21e7f5[_0x1e6557('0x11b')]('cancel',this[_0x1e6557('0x1c5')][_0x1e6557('0x21a')](this)),this[_0x1e6557('0xfd')]=_0x21e7f5,this[_0x1e6557('0x132')](this[_0x1e6557('0xfd')]);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x174')]=function(){const _0x5bb95b=_0x3fec7a;this[_0x5bb95b('0x14e')][_0x5bb95b('0x152')](),this[_0x5bb95b('0x14e')]['smoothSelect'](0x0);},Scene_ItemCrafting['prototype']['onItemOk']=function(){const _0x3eded7=_0x3fec7a;this[_0x3eded7('0x153')]=this[_0x3eded7('0x14e')][_0x3eded7('0x19c')](),this[_0x3eded7('0x14e')][_0x3eded7('0x1da')](),this['clearUserSelectedIngredients']();if(this[_0x3eded7('0xb5')]()){if(_0x3eded7('0x1ea')!==_0x3eded7('0x19f'))this[_0x3eded7('0x1bd')]();else{function _0x49cf8e(){const _0x262ca9=_0x3eded7;_0x38ebcf[_0x262ca9('0x19d')](_0xd99307,_0x37e9dd),_0x27a509[_0x262ca9('0x219')](_0xe11050[_0x262ca9('0x1b')]);}}}else this[_0x3eded7('0xe8')]();},Scene_ItemCrafting['prototype']['setupNumberWindow']=function(){const _0x9d411b=_0x3fec7a;this[_0x9d411b('0xde')][_0x9d411b('0x1da')](),this['_ingredientSelectList'][_0x9d411b('0x1da')](),this[_0x9d411b('0x109')][_0x9d411b('0x45')](),this[_0x9d411b('0x1d9')][_0x9d411b('0x9b')](this['_item']),this[_0x9d411b('0x1d9')]['show'](),this[_0x9d411b('0x1d9')]['activate']();},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x2b')]=function(){const _0x3a6b2f=_0x3fec7a;this['_numberWindow'][_0x3a6b2f('0x1da')](),this[_0x3a6b2f('0xde')][_0x3a6b2f('0x1da')](),this[_0x3a6b2f('0xfd')][_0x3a6b2f('0x1da')](),this[_0x3a6b2f('0x109')][_0x3a6b2f('0x45')](),this[_0x3a6b2f('0x14e')][_0x3a6b2f('0x45')](),this[_0x3a6b2f('0x14e')][_0x3a6b2f('0x152')]();},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x10c')]=function(){const _0x3f77d5=_0x3fec7a;if(VisuMZ[_0x3f77d5('0x7')][_0x3f77d5('0x96')][_0x3f77d5('0x1f3')][_0x3f77d5('0x197')])this['startAnimation']();else{if(_0x3f77d5('0x154')===_0x3f77d5('0x154'))this[_0x3f77d5('0xcb')]();else{function _0x52eb63(){const _0xe7a9b7=_0x3f77d5;_0x1a8d68[_0xe7a9b7('0x6')]['terminate'][_0xe7a9b7('0xd0')](this),_0x25c918['clearCustomItemCraftingSettings']();}}}},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0xcb')]=function(){const _0x460e45=_0x3fec7a;this['_windowLayer'][_0x460e45('0xb0')]=!![],this['_animationPlaying']=![],this[_0x460e45('0x8a')](),this[_0x460e45('0x1d2')](),this['activateItemWindow'](),this[_0x460e45('0x14e')][_0x460e45('0x55')](),this[_0x460e45('0x109')]['refresh'](),this['_categoryWindow'][_0x460e45('0x11a')](),this[_0x460e45('0x109')][_0x460e45('0x186')](),this[_0x460e45('0x44')][_0x460e45('0x55')](),this[_0x460e45('0x14e')][_0x460e45('0x12c')]();},Scene_ItemCrafting['prototype'][_0x3fec7a('0x8a')]=function(){const _0x2b11c9=_0x3fec7a,_0x333529=this['_item'],_0x361552=this['_numberWindow'][_0x2b11c9('0x9d')](),_0x12467d=DataManager['getCraftingIngredients'](_0x333529);let _0x22c015=0x0;for(const _0xcd4ed of _0x12467d){if(!_0xcd4ed)continue;let _0x49f1c8=_0xcd4ed[0x0];const _0x524272=_0xcd4ed[0x1]*_0x361552;if(_0x49f1c8===_0x2b11c9('0x3d'))$gameParty[_0x2b11c9('0xd3')](_0x524272);else{if('YYrdh'!==_0x2b11c9('0x184')){function _0x4f1d5a(){const _0x1d753c=_0x2b11c9;return _0x2376cf['prototype'][_0x1d753c('0xc4')]['call'](this);}}else typeof _0x49f1c8==='string'&&_0x49f1c8[_0x2b11c9('0x4c')](/CATEGORY/i)&&(_0x49f1c8=this[_0x2b11c9('0x12')][_0x22c015],_0x22c015+=0x1),$gameParty[_0x2b11c9('0x41')](_0x49f1c8,_0x524272,![]);}}$gameParty[_0x2b11c9('0x1c0')](_0x333529,_0x361552);if(this['_numberWindow']['number']()>0x0){if('aKeAe'===_0x2b11c9('0x124')){function _0x82141f(){const _0x860447=_0x2b11c9,_0x4f171b=_0x860447('0x14b')['format'](_0x44d65c),_0x208b22=_0x24b1cd[_0x860447('0x218')](_0x22c692);_0x4c4704[_0x860447('0x7')]['JS'][_0x208b22]=new _0x3a4ddf(_0x4f171b);}}else SoundManager[_0x2b11c9('0x77')]();}else{if(_0x2b11c9('0x183')!=='FEnMC')SoundManager[_0x2b11c9('0x1d4')]();else{function _0x2ac646(){const _0x2c38fa=_0x2b11c9;if(!_0xfe9891)return![];if(this[_0x2c38fa('0x10b')]===_0x44449b)this[_0x2c38fa('0x33')]();let _0x2d6b9f={};if(_0x4ecbbe[_0x2c38fa('0x73')](_0x7ea027))_0x2d6b9f=this['_itemsCrafted'][_0x2c38fa('0x168')];if(_0x1051af[_0x2c38fa('0x1c')](_0x3602b0))_0x2d6b9f=this[_0x2c38fa('0x10b')][_0x2c38fa('0xbf')];if(_0x5ae2c2[_0x2c38fa('0x9f')](_0x3a442f))_0x2d6b9f=this[_0x2c38fa('0x10b')][_0x2c38fa('0x32')];return _0x2d6b9f[_0x552a87['id']]||0x0;}}}$gameSystem[_0x2b11c9('0x30')](_0x333529,_0x361552);},Scene_ItemCrafting['prototype']['onItemCrafted']=function(){const _0x29a328=_0x3fec7a,_0x38dbc9=this[_0x29a328('0x153')],_0x1346a4=this[_0x29a328('0x1d9')][_0x29a328('0x9d')]();VisuMZ['ItemCraftingSys'][_0x29a328('0x140')](_0x38dbc9,!![]),VisuMZ['ItemCraftingSys']['TurnSwitches'](_0x38dbc9,![]);const _0x41f3a=DataManager[_0x29a328('0x218')](_0x38dbc9);VisuMZ[_0x29a328('0x7')]['JS'][_0x41f3a]&&VisuMZ[_0x29a328('0x7')]['JS'][_0x41f3a][_0x29a328('0xd0')](this,_0x38dbc9,_0x1346a4),VisuMZ[_0x29a328('0x7')][_0x29a328('0x96')][_0x29a328('0x11c')]['jsGlobalCraftEffect'][_0x29a328('0xd0')](this,_0x38dbc9,_0x1346a4);},VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x140')]=function(_0x221de9,_0x2ba558){const _0x18b265=_0x3fec7a,_0x26329f=_0x2ba558?VisuMZ[_0x18b265('0x7')]['RegExp'][_0x18b265('0xab')]:VisuMZ[_0x18b265('0x7')][_0x18b265('0x1f1')][_0x18b265('0xae')],_0x146f30=_0x221de9[_0x18b265('0x182')][_0x18b265('0x4c')](_0x26329f);if(_0x146f30)for(const _0x3d2ac5 of _0x146f30){if(!_0x3d2ac5)continue;_0x3d2ac5[_0x18b265('0x4c')](_0x26329f);const _0x3b33d1=JSON['parse']('['+RegExp['$1'][_0x18b265('0x4c')](/\d+/g)+']');for(const _0x2e3c86 of _0x3b33d1){$gameSwitches[_0x18b265('0x16a')](_0x2e3c86,_0x2ba558);}}},Scene_ItemCrafting['prototype'][_0x3fec7a('0x89')]=function(){const _0xa7c4c6=_0x3fec7a;SoundManager[_0xa7c4c6('0x1d4')](),this[_0xa7c4c6('0x1c5')]();},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0xa4')]=function(){const _0x4d02e0=_0x3fec7a,_0x1b7b21=this[_0x4d02e0('0xfd')][_0x4d02e0('0x19c')]();this[_0x4d02e0('0x12')][this[_0x4d02e0('0x9c')]]=_0x1b7b21,this['_ingredientIndex']++,this[_0x4d02e0('0x1bd')]();},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x1c5')]=function(){const _0x33534a=_0x3fec7a;this[_0x33534a('0x12')]['pop'](),this[_0x33534a('0x9c')]--;if(this[_0x33534a('0x9c')]<0x0){if('gzPvJ'==='gzPvJ')this['activateItemWindow']();else{function _0x330f2f(){const _0x3afcde=_0x33534a;return this[_0x3afcde('0xdc')]=null,!![];}}}else{if(_0x33534a('0x16e')!==_0x33534a('0x68'))this['setupSelectIngredientWindow']();else{function _0x4f6e42(){const _0x18e15e=_0x33534a;_0x414721[_0x18e15e('0x6')]['loadWindowskin'][_0x18e15e('0xd0')](this);}}}},Scene_ItemCrafting['prototype'][_0x3fec7a('0x1ee')]=function(){const _0x4e19dc=_0x3fec7a;this['_ingredientCategories']=[],this['_ingredientAmounts']=[],this[_0x4e19dc('0x12')]=[],this[_0x4e19dc('0x9c')]=0x0;},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0xb5')]=function(){const _0x31ee15=_0x3fec7a;if(!this['_item'])return![];const _0x444e58=DataManager[_0x31ee15('0x1e6')](this[_0x31ee15('0x153')]);for(const _0x33556f of _0x444e58){if(_0x31ee15('0x43')===_0x31ee15('0x43')){if(!_0x33556f)continue;const _0x4004f5=_0x33556f[0x0];if(!_0x4004f5)continue;if(typeof _0x4004f5===_0x31ee15('0x108')&&_0x4004f5[_0x31ee15('0x4c')](/CATEGORY/i)){_0x4004f5[_0x31ee15('0x4c')](/CATEGORY: (.*)/i);const _0x3eeff7=String(RegExp['$1'])[_0x31ee15('0x7c')]();this['_ingredientCategories'][_0x31ee15('0x155')](_0x3eeff7),this['_ingredientAmounts'][_0x31ee15('0x155')](_0x33556f[0x1]||0x1);}}else{function _0x32ef0f(){const _0x432396=_0x31ee15,_0x22f1ea=this[_0x432396('0xdb')][0x4];this[_0x432396('0x1e5')]()?_0x22f1ea[_0x432396('0x7b')](this[_0x432396('0x1dc')][_0x432396('0x21a')](this)):_0x22f1ea['_clickHandler']=null;}}}return this[_0x31ee15('0x24')]['length']>0x0;},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x1bd')]=function(){const _0x57ce3d=_0x3fec7a;if(this['_ingredientIndex']>=this['_ingredientCategories']['length'])return this[_0x57ce3d('0xe8')]();this[_0x57ce3d('0x109')][_0x57ce3d('0x1da')](),this['_numberWindow']['hide']();const _0x41b800=this[_0x57ce3d('0x24')][this['_ingredientIndex']],_0x318e0e=this[_0x57ce3d('0x79')][this[_0x57ce3d('0x9c')]];this[_0x57ce3d('0xde')]['show'](),this[_0x57ce3d('0xfd')][_0x57ce3d('0x45')](),this['_ingredientSelectTitle'][_0x57ce3d('0xd2')]['clear']();const _0x3e1bd1=VisuMZ[_0x57ce3d('0x7')]['Settings'][_0x57ce3d('0x11c')][_0x57ce3d('0xc2')],_0x56f03d=VisuMZ[_0x57ce3d('0x21')][_0x57ce3d('0x96')][_0x57ce3d('0x20')][_0x57ce3d('0x4')],_0x429cac=_0x3e1bd1['format'](_0x41b800,_0x56f03d[_0x57ce3d('0x194')](_0x318e0e)),_0x28f3f0=this[_0x57ce3d('0xde')][_0x57ce3d('0x86')](0x0);this['_ingredientSelectTitle'][_0x57ce3d('0x1d1')](_0x429cac,_0x28f3f0['x'],_0x28f3f0['y']),this['_ingredientSelectList'][_0x57ce3d('0x9b')](_0x41b800,_0x318e0e);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0xe')]=function(){const _0x355921=_0x3fec7a;if(this[_0x355921('0x1d9')]&&this[_0x355921('0x1d9')][_0x355921('0x181')]){if(_0x355921('0xc1')!==_0x355921('0xc1')){function _0x952291(){const _0x3a5050=_0x355921;this[_0x3a5050('0x1c6')]();}}else return TextManager[_0x355921('0x84')](_0x355921('0x104'),_0x355921('0xf'));}return Scene_Item['prototype'][_0x355921('0xe')][_0x355921('0xd0')](this);},Scene_ItemCrafting['prototype'][_0x3fec7a('0x1f5')]=function(){const _0x21dc8a=_0x3fec7a;if(this[_0x21dc8a('0x1d9')]&&this[_0x21dc8a('0x1d9')][_0x21dc8a('0x181')])return TextManager['getInputMultiButtonStrings']('up',_0x21dc8a('0x142'));return Scene_Item[_0x21dc8a('0x6')][_0x21dc8a('0x1f5')][_0x21dc8a('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0xcd')]=function(){const _0x55bb9d=_0x3fec7a;if(this[_0x55bb9d('0x210')]()){if(_0x55bb9d('0x185')!==_0x55bb9d('0x48'))return VisuMZ[_0x55bb9d('0x21')][_0x55bb9d('0x96')][_0x55bb9d('0x20')][_0x55bb9d('0x13c')];else{function _0x187ee4(){const _0x180e2d=_0x55bb9d;return _0x5c035c[_0x180e2d('0xed')]?![]:!![];}}}else{if(this['_numberWindow']&&this[_0x55bb9d('0x1d9')]['active']){if('vidbX'!==_0x55bb9d('0xbb'))return VisuMZ[_0x55bb9d('0x21')][_0x55bb9d('0x96')][_0x55bb9d('0x1af')]['buttonAssistSmallIncrement'];else{function _0x1ebb20(){const _0x68a638=_0x55bb9d,_0x169ac9=_0x10f8a2[_0x68a638('0x7')][_0x68a638('0x96')][_0x68a638('0x11c')];this[_0x68a638('0xd2')][_0x68a638('0x56')]=_0x1ce409[_0x68a638('0xd7')](_0x169ac9[_0x68a638('0xc5')]),_0x308aa4+=_0x169ac9[_0x68a638('0xb8')];}}}}return Scene_Item['prototype'][_0x55bb9d('0xcd')][_0x55bb9d('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')]['buttonAssistText2']=function(){const _0x20a727=_0x3fec7a;if(this[_0x20a727('0x1d9')]&&this['_numberWindow'][_0x20a727('0x181')])return VisuMZ[_0x20a727('0x21')][_0x20a727('0x96')][_0x20a727('0x1af')][_0x20a727('0x180')];return Scene_Item[_0x20a727('0x6')][_0x20a727('0x148')][_0x20a727('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')]['buttonAssistText4']=function(){const _0xe7099b=_0x3fec7a;if(this[_0xe7099b('0x1d9')]&&this[_0xe7099b('0x1d9')][_0xe7099b('0x181')]){if(_0xe7099b('0x1a5')!=='fEMwA')return TextManager[_0xe7099b('0x1f0')];else{function _0x654505(){const _0x10931e=_0xe7099b;this[_0x10931e('0x31')](...arguments);}}}else return Scene_Item[_0xe7099b('0x6')][_0xe7099b('0x1de')][_0xe7099b('0xd0')](this);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x27')]=function(){const _0x3a514e=_0x3fec7a;Scene_MenuBase[_0x3a514e('0x6')]['createBackground'][_0x3a514e('0xd0')](this),this[_0x3a514e('0x3f')](this[_0x3a514e('0x1b1')]()),this['createCustomBackgroundImages']();},Scene_ItemCrafting['prototype'][_0x3fec7a('0x1b1')]=function(){const _0x2bf7a0=_0x3fec7a;return VisuMZ[_0x2bf7a0('0x7')][_0x2bf7a0('0x96')]['BgSettings'][_0x2bf7a0('0x13d')];},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0xea')]=function(){const _0x45a603=_0x3fec7a,_0x33bb50={'BgFilename1':VisuMZ[_0x45a603('0x7')][_0x45a603('0x96')][_0x45a603('0x76')][_0x45a603('0x141')],'BgFilename2':VisuMZ[_0x45a603('0x7')][_0x45a603('0x96')][_0x45a603('0x76')][_0x45a603('0x1cf')]};if(_0x33bb50&&(_0x33bb50[_0x45a603('0x141')]!==''||_0x33bb50[_0x45a603('0x1cf')]!=='')){if(_0x45a603('0xf1')===_0x45a603('0xf1'))this['_backSprite1']=new Sprite(ImageManager[_0x45a603('0xf2')](_0x33bb50[_0x45a603('0x141')])),this['_backSprite2']=new Sprite(ImageManager[_0x45a603('0xd6')](_0x33bb50[_0x45a603('0x1cf')])),this[_0x45a603('0x1d7')](this[_0x45a603('0xbd')]),this[_0x45a603('0x1d7')](this[_0x45a603('0x1ae')]),this[_0x45a603('0xbd')][_0x45a603('0x1f7')][_0x45a603('0x12b')](this[_0x45a603('0x20d')]['bind'](this,this[_0x45a603('0xbd')])),this[_0x45a603('0x1ae')][_0x45a603('0x1f7')][_0x45a603('0x12b')](this[_0x45a603('0x20d')]['bind'](this,this['_backSprite2']));else{function _0x25a23b(){const _0x4cbe01=_0x45a603;return _0x23342e[_0x4cbe01('0x60')](this[_0x4cbe01('0x199')]()+this[_0x4cbe01('0x1e7')]()*0x2);}}}},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x20d')]=function(_0x38b2bd){const _0x7d4974=_0x3fec7a;this['scaleSprite'](_0x38b2bd),this[_0x7d4974('0xe1')](_0x38b2bd);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x15a')]=function(){const _0x553e69=_0x3fec7a;this[_0x553e69('0x1c2')]=!![],this[_0x553e69('0xbc')]=0x14,this[_0x553e69('0x157')][_0x553e69('0xb0')]=VisuMZ[_0x553e69('0x7')][_0x553e69('0x96')][_0x553e69('0x1f3')][_0x553e69('0x11')]||![],this[_0x553e69('0x217')]();},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x217')]=function(){const _0xf311ae=_0x3fec7a;this['_itemSprite']=new Sprite(),this[_0xf311ae('0x1d7')](this[_0xf311ae('0x40')]),this['setItemSpriteBitmap'](),this['setItemSpriteFrame'](),this[_0xf311ae('0x1df')](),this[_0xf311ae('0xb1')](),this[_0xf311ae('0x39')](),this[_0xf311ae('0x1ed')](this[_0xf311ae('0xdd')][_0xf311ae('0x195')]());},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x1a7')]=function(){const _0x4cdab9=_0x3fec7a;this['_itemSprite'][_0x4cdab9('0x1f7')]=ImageManager[_0x4cdab9('0x167')](_0x4cdab9('0xd1')),this[_0x4cdab9('0x40')][_0x4cdab9('0x1f7')][_0x4cdab9('0x192')]=![],this['_itemSprite'][_0x4cdab9('0x6b')]['x']=0.5,this[_0x4cdab9('0x40')][_0x4cdab9('0x6b')]['y']=0x1;const _0x13b825=VisuMZ[_0x4cdab9('0x7')][_0x4cdab9('0x96')][_0x4cdab9('0x1f3')][_0x4cdab9('0x15d')]||0x8;this[_0x4cdab9('0x40')]['scale']['x']=_0x13b825,this[_0x4cdab9('0x40')][_0x4cdab9('0x15')]['y']=_0x13b825;},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x159')]=function(){const _0x349304=_0x3fec7a,_0x521296=this[_0x349304('0x153')],_0x20d545=_0x521296[_0x349304('0x122')],_0x4d9730=ImageManager[_0x349304('0x18c')],_0x35fffa=ImageManager[_0x349304('0x103')],_0x5ccaac=_0x20d545%0x10*_0x4d9730,_0x4abf23=Math[_0x349304('0x60')](_0x20d545/0x10)*_0x35fffa;this[_0x349304('0x40')]['setFrame'](_0x5ccaac,_0x4abf23,_0x4d9730,_0x35fffa);},Scene_ItemCrafting['prototype']['setItemSpritePosition']=function(){const _0x376929=_0x3fec7a;this[_0x376929('0x40')]['x']=Math[_0x376929('0x1c8')](Graphics[_0x376929('0x117')]/0x2);const _0x2ee993=Math[_0x376929('0x1c8')](ImageManager['iconHeight']*this[_0x376929('0x40')][_0x376929('0x15')]['y']);this[_0x376929('0x40')]['y']=Math[_0x376929('0x1c8')]((Graphics[_0x376929('0x54')]+_0x2ee993)/0x2);},Scene_ItemCrafting['prototype'][_0x3fec7a('0xb1')]=function(){const _0x1c30c5=_0x3fec7a;this[_0x1c30c5('0x130')]=VisuMZ[_0x1c30c5('0x7')]['Settings'][_0x1c30c5('0x1f3')]['FadeSpeed']||0x1;if(this[_0x1c30c5('0x153')][_0x1c30c5('0x182')][_0x1c30c5('0x4c')](VisuMZ[_0x1c30c5('0x7')][_0x1c30c5('0x1f1')]['opacitySpeed'])){if(_0x1c30c5('0x201')===_0x1c30c5('0x201'))this['_itemSpriteOpacitySpeed']=Math[_0x1c30c5('0xfc')](Number(RegExp['$1']),0x1);else{function _0x1e536b(){const _0x784399=_0x1c30c5;this[_0x784399('0xdf')](_0x1b2e0f,_0x510035,_0x404862,_0x454355,_0x784399('0xf'));}}}this[_0x1c30c5('0x40')][_0x1c30c5('0x134')]=0x0;},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x39')]=function(){const _0x21caef=_0x3fec7a;this[_0x21caef('0xdd')]=[];if(this['_item'][_0x21caef('0x182')][_0x21caef('0x4c')](VisuMZ[_0x21caef('0x7')][_0x21caef('0x1f1')][_0x21caef('0x10f')])){if(_0x21caef('0xb')!==_0x21caef('0xb')){function _0x1f9e7b(){const _0x107785=_0x21caef;this[_0x107785('0x14e')][_0x107785('0x14')](_0xe3fb87['ListBgType']);}}else this['_animationIDs']=RegExp['$1'][_0x21caef('0x139')](',')[_0x21caef('0x69')](_0x2b8ffa=>Number(_0x2b8ffa));}else this[_0x21caef('0xdd')]=this['_animationIDs'][_0x21caef('0xa')](VisuMZ[_0x21caef('0x7')][_0x21caef('0x96')][_0x21caef('0x1f3')][_0x21caef('0x2c')]);},Scene_ItemCrafting['prototype'][_0x3fec7a('0x1ed')]=function(_0x43bd8b){const _0x58ebd8=_0x3fec7a,_0x41bf20=$dataAnimations[_0x43bd8b];if(!_0x41bf20)return;const _0x217daa=this[_0x58ebd8('0x16d')](_0x41bf20);this[_0x58ebd8('0x14c')]=new(_0x217daa?Sprite_AnimationMV:Sprite_Animation)();const _0x28b544=[this[_0x58ebd8('0x40')]],_0x1adf64=0x0;this[_0x58ebd8('0x14c')][_0x58ebd8('0x9b')](_0x28b544,_0x41bf20,![],_0x1adf64,null),this[_0x58ebd8('0x1d7')](this['_animationSprite']);},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x16d')]=function(_0x6e548e){return!!_0x6e548e['frames'];},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x115')]=function(){const _0x354fe1=_0x3fec7a;if(!this[_0x354fe1('0x1c2')])return;this[_0x354fe1('0x149')](),this[_0x354fe1('0x83')](),this[_0x354fe1('0x8e')]()&&this[_0x354fe1('0x146')]();},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x149')]=function(){const _0x866727=_0x3fec7a;this[_0x866727('0x40')][_0x866727('0x134')]+=this[_0x866727('0x130')];},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x83')]=function(){const _0x1556b4=_0x3fec7a;if(!this[_0x1556b4('0x14c')])return;if(this[_0x1556b4('0x14c')][_0x1556b4('0x81')]())return;this[_0x1556b4('0x98')](),this[_0x1556b4('0x1ed')](this[_0x1556b4('0xdd')]['shift']());},Scene_ItemCrafting['prototype'][_0x3fec7a('0x98')]=function(){const _0x379dde=_0x3fec7a;if(!this[_0x379dde('0x14c')])return;this[_0x379dde('0x13f')](this[_0x379dde('0x14c')]),this[_0x379dde('0x14c')]['destroy'](),this[_0x379dde('0x14c')]=undefined;},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x50')]=function(){const _0x46cb6e=_0x3fec7a;if(!this[_0x46cb6e('0x40')])return;this['removeChild'](this[_0x46cb6e('0x40')]),this[_0x46cb6e('0x40')]['destroy'](),this[_0x46cb6e('0x40')]=undefined;},Scene_ItemCrafting[_0x3fec7a('0x6')]['isFinishedAnimating']=function(){const _0xa50138=_0x3fec7a;if(TouchInput[_0xa50138('0x21e')]())return!![];if(Input['isTriggered']('ok'))return!![];if(Input[_0xa50138('0x19b')](_0xa50138('0x16b')))return!![];if(this[_0xa50138('0x40')][_0xa50138('0x134')]<0xff)return![];if(this['_animationSprite'])return![];return this[_0xa50138('0xbc')]--<=0x0;},Scene_ItemCrafting['prototype']['processFinishAnimation']=function(){const _0x5c8684=_0x3fec7a;this[_0x5c8684('0x98')](),this['destroyItemSprite'](),this[_0x5c8684('0xcb')](),TouchInput['clear'](),Input[_0x5c8684('0x3e')]();},Scene_ItemCrafting[_0x3fec7a('0x6')][_0x3fec7a('0x179')]=function(){const _0xf617f2=_0x3fec7a;Scene_Item[_0xf617f2('0x6')][_0xf617f2('0x179')]['call'](this),$gameTemp[_0xf617f2('0x8f')]();},VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x17')]=Window_MenuCommand[_0x3fec7a('0x6')][_0x3fec7a('0xc8')],Window_MenuCommand[_0x3fec7a('0x6')][_0x3fec7a('0xc8')]=function(){const _0xbf80af=_0x3fec7a;VisuMZ[_0xbf80af('0x7')]['Window_MenuCommand_addOriginalCommands'][_0xbf80af('0xd0')](this),this['addItemCraftingCommand']();},Window_MenuCommand['prototype'][_0x3fec7a('0xf7')]=function(){const _0x1b159f=_0x3fec7a;if(!this[_0x1b159f('0x9a')]())return;if(!this[_0x1b159f('0xac')]())return;const _0x31bea3=TextManager[_0x1b159f('0x90')],_0x5f46cb=this['isItemCraftingCommandEnabled']();this['addCommand'](_0x31bea3,'itemCrafting',_0x5f46cb);},Window_MenuCommand[_0x3fec7a('0x6')]['addItemCraftingCommandAutomatically']=function(){const _0x2a3d2a=_0x3fec7a;return Imported[_0x2a3d2a('0xed')]?![]:!![];},Window_MenuCommand[_0x3fec7a('0x6')]['isItemCraftingCommandVisible']=function(){const _0x32690f=_0x3fec7a;return $gameSystem[_0x32690f('0x15f')]();},Window_MenuCommand['prototype'][_0x3fec7a('0xfa')]=function(){const _0x10a4ec=_0x3fec7a;if(DataManager[_0x10a4ec('0x145')]()[_0x10a4ec('0x29')]<=0x0)return![];return $gameSystem['isMainMenuItemCraftingEnabled']();},VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0xaa')]=Window_ItemCategory[_0x3fec7a('0x6')]['makeCommandList'],Window_ItemCategory[_0x3fec7a('0x6')][_0x3fec7a('0xf9')]=function(){const _0x47c029=_0x3fec7a;VisuMZ[_0x47c029('0x7')][_0x47c029('0xaa')][_0x47c029('0xd0')](this);if(SceneManager['isSceneItemCrafting']()){if(_0x47c029('0x28')!==_0x47c029('0x28')){function _0x5748a2(){const _0x7901e5=_0x47c029;return _0x43dcac[_0x7901e5('0x6')][_0x7901e5('0xec')]['call'](this)*0x3+0x8;}}else this[_0x47c029('0x15e')]();}},Window_ItemCategory[_0x3fec7a('0x6')][_0x3fec7a('0x15e')]=function(){const _0x39afe8=_0x3fec7a,_0x45b415=Window_ItemCategory[_0x39afe8('0x207')],_0x1250c7=DataManager[_0x39afe8('0x145')]()['clone'](),_0x32bef4=[];for(const _0x2ba870 of _0x45b415){if(_0x39afe8('0x196')===_0x39afe8('0x112')){function _0x49bd7b(){const _0x2852fc=_0x39afe8;return _0x43f94a['ItemCraftingSys'][_0x2852fc('0x96')][_0x2852fc('0x76')]['SnapshotOpacity'];}}else{this[_0x39afe8('0xdc')]=_0x2ba870['Type'];for(const _0x22c834 of _0x1250c7){if(_0x39afe8('0x147')===_0x39afe8('0x10')){function _0x504d8d(){const _0x467170=_0x39afe8;return _0x3179e2[_0x467170('0x6')][_0x467170('0x189')][_0x467170('0xd0')](this);}}else Window_ItemList[_0x39afe8('0x6')][_0x39afe8('0x170')][_0x39afe8('0xd0')](this,_0x22c834)&&_0x32bef4['push'](_0x22c834);}}}this['_category']=null;for(const _0x2fc299 of _0x32bef4){_0x1250c7['remove'](_0x2fc299);}_0x1250c7[_0x39afe8('0x29')]>0x0&&this[_0x39afe8('0x11d')](),this[_0x39afe8('0x129')]=_0x1250c7;},Window_ItemCategory[_0x3fec7a('0x6')][_0x3fec7a('0x11d')]=function(){const _0x83592e=_0x3fec7a,_0x5448f2=VisuMZ['ItemCraftingSys'][_0x83592e('0x96')][_0x83592e('0x11c')];let _0x39fca2=_0x5448f2[_0x83592e('0x19')]||_0x83592e('0x19'),_0x4a7ed7=_0x5448f2[_0x83592e('0x1f')]||0xa0;_0x39fca2=_0x83592e('0x15b')[_0x83592e('0x194')](_0x4a7ed7,_0x39fca2),this[_0x83592e('0x19a')](_0x39fca2,_0x83592e('0xaf'),!![],'ItemCraftingNoCategory');},VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x1fb')]=Window_ItemCategory[_0x3fec7a('0x6')]['addItemCategory'],Window_ItemCategory['prototype'][_0x3fec7a('0xe9')]=function(_0x16c7cb){const _0xb1060c=_0x3fec7a;if(SceneManager[_0xb1060c('0xb7')]()&&!this['isItemCraftingCategoryValid'](_0x16c7cb))return;VisuMZ[_0xb1060c('0x7')][_0xb1060c('0x1fb')]['call'](this,_0x16c7cb);},Window_ItemCategory['prototype']['isItemCraftingCategoryValid']=function(_0x36f8ed){const _0x5e280d=_0x3fec7a,_0x37859f=DataManager[_0x5e280d('0x145')](),_0x19f99f=_0x36f8ed[_0x5e280d('0x10a')],_0x3d3a86=_0x36f8ed[_0x5e280d('0x190')];this[_0x5e280d('0xdc')]=_0x19f99f;for(const _0x283a42 of _0x37859f){if('uKOZu'===_0x5e280d('0x70')){function _0x275917(){const _0x587dff=_0x5e280d;this[_0x587dff('0xd2')][_0x587dff('0x3e')](),this[_0x587dff('0x117')]=0x0;}}else{if(!_0x283a42)continue;if(Window_ItemList['prototype'][_0x5e280d('0x170')]['call'](this,_0x283a42))return this['_category']=null,!![];}}return this[_0x5e280d('0xdc')]=null,![];},VisuMZ['ItemCraftingSys'][_0x3fec7a('0x72')]=Window_ItemCategory['prototype']['needsSelection'],Window_ItemCategory['prototype'][_0x3fec7a('0x10e')]=function(){const _0x1ed5d2=_0x3fec7a;if(SceneManager[_0x1ed5d2('0xb7')]())return!![];return VisuMZ['ItemCraftingSys'][_0x1ed5d2('0x72')][_0x1ed5d2('0xd0')](this);};function Window_ItemCraftingList(){const _0x44f9eb=_0x3fec7a;this[_0x44f9eb('0x31')](...arguments);}Window_ItemCraftingList[_0x3fec7a('0x6')]=Object[_0x3fec7a('0x14a')](Window_ItemList[_0x3fec7a('0x6')]),Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x100')]=Window_ItemCraftingList,Window_ItemCraftingList[_0x3fec7a('0x212')]=VisuMZ['ItemCraftingSys'][_0x3fec7a('0x96')][_0x3fec7a('0x1a1')][_0x3fec7a('0x21b')],Window_ItemCraftingList['maskItalics']=VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0x96')][_0x3fec7a('0x2f')][_0x3fec7a('0x75')],Window_ItemCraftingList['prototype'][_0x3fec7a('0x31')]=function(_0x52e383){const _0x14ffba=_0x3fec7a;Window_ItemList[_0x14ffba('0x6')]['initialize'][_0x14ffba('0xd0')](this,_0x52e383),this[_0x14ffba('0x1c9')]();},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x71')]=function(){return 0x1;},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0xec')]=function(){const _0xadc1b2=_0x3fec7a;return Window_Scrollable['prototype'][_0xadc1b2('0xec')][_0xadc1b2('0xd0')](this)*0x3+0x8;},Window_ItemCraftingList['prototype'][_0x3fec7a('0x1db')]=function(_0x29705c){return!![];},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x1c1')]=function(){const _0x2e46f5=_0x3fec7a;this[_0x2e46f5('0x161')]=DataManager[_0x2e46f5('0x145')]()['filter'](_0x48ab37=>this[_0x2e46f5('0x170')](_0x48ab37));const _0x169db6=this['_data'][_0x2e46f5('0x69')](_0x4064c6=>DataManager['getCraftingIngredients'](_0x4064c6)[_0x2e46f5('0x29')]);this[_0x2e46f5('0xb9')]=Math[_0x2e46f5('0xfc')](..._0x169db6)+0x1;},Window_ItemCraftingList['prototype'][_0x3fec7a('0x170')]=function(_0x54286b){const _0xe6988e=_0x3fec7a;if(this[_0xe6988e('0xdc')]===_0xe6988e('0xd4')){const _0x541f85=SceneManager[_0xe6988e('0x5c')];if(_0x541f85&&_0x541f85['_categoryWindow']&&_0x541f85[_0xe6988e('0x109')][_0xe6988e('0x129')])return _0x541f85['_categoryWindow'][_0xe6988e('0x129')][_0xe6988e('0x170')](_0x54286b);}return Window_ItemList[_0xe6988e('0x6')][_0xe6988e('0x170')][_0xe6988e('0xd0')](this,_0x54286b);},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x5')]=function(){},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x5b')]=function(_0x266c9d){const _0x107f02=_0x3fec7a,_0x1831cc=this[_0x107f02('0x1')](_0x266c9d);if(!_0x1831cc)return;const _0x2648ad=this[_0x107f02('0x125')](_0x266c9d);this['resetFontSettings'](),this[_0x107f02('0xd')](_0x2648ad,0x2),this[_0x107f02('0x8')](_0x1831cc,_0x2648ad),this[_0x107f02('0x169')](_0x1831cc,_0x2648ad),this[_0x107f02('0xcf')](_0x1831cc,_0x2648ad),this[_0x107f02('0x1b8')](_0x1831cc,_0x2648ad);},Window_ItemCraftingList[_0x3fec7a('0x6')]['drawFadedItemBackground']=function(_0x982a27,_0x41b815){const _0x29c96f=_0x3fec7a;_0x41b815=_0x41b815||0x1,this['changePaintOpacity'](![]);const _0x452a54=ColorManager[_0x29c96f('0xc9')](),_0x1c8a30=ColorManager[_0x29c96f('0x1ad')](),_0x50c465=_0x982a27['width']/0x2,_0x879816=this['lineHeight']();while(_0x41b815--){this['contents'][_0x29c96f('0x21d')](_0x982a27['x'],_0x982a27['y'],_0x50c465,_0x879816,_0x1c8a30,_0x452a54),this[_0x29c96f('0xd2')][_0x29c96f('0x21d')](_0x982a27['x']+_0x50c465,_0x982a27['y'],_0x50c465,_0x879816,_0x452a54,_0x1c8a30);}this[_0x29c96f('0x8b')](!![]);},Window_ItemCraftingList[_0x3fec7a('0x6')]['drawCraftingItemName']=function(_0xadd8,_0x2a84e9){const _0x50b0cc=_0x3fec7a;let _0x3f723c=_0xadd8['name'],_0x40a1d9=_0x2a84e9['height']+this['itemPadding']()*0x2,_0x5759f1=_0x2a84e9['y'],_0x25978e=_0x2a84e9[_0x50b0cc('0x117')]-_0x40a1d9-this[_0x50b0cc('0x214')]()-ImageManager[_0x50b0cc('0x18c')];DataManager[_0x50b0cc('0x1c4')](_0xadd8)&&(_0x3f723c=VisuMZ[_0x50b0cc('0x7')][_0x50b0cc('0xc3')](_0xadd8),this['contents']['fontItalic']=Window_ItemCraftingList[_0x50b0cc('0x193')]),this[_0x50b0cc('0xdf')](_0x3f723c,_0x40a1d9,_0x5759f1,_0x25978e,_0x50b0cc('0x104')),this[_0x50b0cc('0xd2')][_0x50b0cc('0xf4')]=![];},VisuMZ[_0x3fec7a('0x7')][_0x3fec7a('0xc3')]=function(_0x20dee7){const _0x3fdc0c=_0x3fec7a;if(_0x20dee7[_0x3fdc0c('0x182')][_0x3fdc0c('0x4c')](VisuMZ[_0x3fdc0c('0x7')][_0x3fdc0c('0x1f1')][_0x3fdc0c('0x1f6')])){if(_0x3fdc0c('0x1fa')!==_0x3fdc0c('0x1fa')){function _0x3b7caf(){const _0x5c3cf1=_0x3fdc0c;_0x35a9c7[_0x5c3cf1('0x6')]['update'][_0x5c3cf1('0xd0')](this),this['updateTooltipWindow']();}}else return String(RegExp['$1']);}else{if(_0x3fdc0c('0x1a6')!==_0x3fdc0c('0xa0')){const _0x396493=TextManager[_0x3fdc0c('0x176')];return Array(_0x20dee7[_0x3fdc0c('0xeb')]['length']+0x1)[_0x3fdc0c('0x7a')](_0x396493);}else{function _0x4af8c3(){const _0xee9e7d=_0x3fdc0c;this[_0xee9e7d('0xbd')]=new _0x339acf(_0x3a1c36[_0xee9e7d('0xf2')](_0x3931f5[_0xee9e7d('0x141')])),this[_0xee9e7d('0x1ae')]=new _0x1795ea(_0x570865[_0xee9e7d('0xd6')](_0x42c49c['BgFilename2'])),this[_0xee9e7d('0x1d7')](this[_0xee9e7d('0xbd')]),this[_0xee9e7d('0x1d7')](this[_0xee9e7d('0x1ae')]),this[_0xee9e7d('0xbd')][_0xee9e7d('0x1f7')][_0xee9e7d('0x12b')](this[_0xee9e7d('0x20d')][_0xee9e7d('0x21a')](this,this[_0xee9e7d('0xbd')])),this[_0xee9e7d('0x1ae')]['bitmap'][_0xee9e7d('0x12b')](this['adjustSprite']['bind'](this,this[_0xee9e7d('0x1ae')]));}}}},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x8')]=function(_0x35be87,_0x4fd199){const _0x41478f=_0x3fec7a,_0x260725=_0x35be87['iconIndex'];let _0x393829=_0x4fd199['x']+this[_0x41478f('0x214')](),_0x5062af=_0x4fd199['y']+0x4,_0x27ad0a=_0x4fd199[_0x41478f('0x117')]-this['itemPadding']()*0x2,_0x22ab8c=_0x4fd199[_0x41478f('0x54')]-0x8,_0x4a69ad=Math[_0x41478f('0x94')](_0x27ad0a,_0x22ab8c);_0x4a69ad=Math[_0x41478f('0x60')](_0x4a69ad/ImageManager[_0x41478f('0x18c')])*ImageManager[_0x41478f('0x18c')],_0x5062af+=(_0x22ab8c-_0x4a69ad)/0x2;const _0x131d9d=ImageManager[_0x41478f('0x167')](_0x41478f('0xd1')),_0x2c3988=ImageManager[_0x41478f('0x18c')],_0x4582bb=ImageManager[_0x41478f('0x103')],_0x4e62f9=_0x260725%0x10*_0x2c3988,_0x1fe4a5=Math[_0x41478f('0x60')](_0x260725/0x10)*_0x4582bb;this['contents']['_context'][_0x41478f('0x187')]=![],this[_0x41478f('0xd2')]['blt'](_0x131d9d,_0x4e62f9,_0x1fe4a5,_0x2c3988,_0x4582bb,_0x393829,_0x5062af,_0x4a69ad,_0x4a69ad),this['contents'][_0x41478f('0x173')][_0x41478f('0x187')]=!![];},Window_ItemCraftingList[_0x3fec7a('0x6')]['drawCraftedIcon']=function(_0x50149c,_0x2a89e6){const _0x2f2853=_0x3fec7a;if(!$gameSystem[_0x2f2853('0x1e')](_0x50149c))return;const _0x417a40=ImageManager[_0x2f2853('0x21c')];let _0x5104f6=_0x2a89e6['x']+_0x2a89e6[_0x2f2853('0x117')]-ImageManager[_0x2f2853('0x18c')],_0x5c224f=_0x2a89e6['y']+0x2;this['drawIcon'](_0x417a40,_0x5104f6,_0x5c224f);},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x1b8')]=function(_0x1c63b3,_0x1b8ba7){const _0x499979=_0x3fec7a,_0x5f5bdf=DataManager[_0x499979('0x1e6')](_0x1c63b3);let _0x440d0d=_0x1b8ba7['height']+this[_0x499979('0x214')]()*0x2,_0x4f1fcd=_0x1b8ba7['y']+Math[_0x499979('0x1c8')](this[_0x499979('0x1e7')]()*1.2),_0xf0ceb2=_0x1b8ba7[_0x499979('0x117')]-_0x440d0d-this['itemPadding'](),_0x177415=Math[_0x499979('0x60')](_0xf0ceb2/this['_maxIngredientsSize']),_0x3840ef=!![];for(const _0x2ef63c of _0x5f5bdf){if(_0x499979('0x66')!==_0x499979('0x165')){if(!_0x3840ef){let _0x123237=TextManager['itemCraftingIngredientsBridge'],_0xfe5b74=_0x1b8ba7['y']+(_0x1b8ba7[_0x499979('0x54')]-this[_0x499979('0x1e7')]()*1.5);this[_0x499979('0xdf')](_0x123237,_0x440d0d,_0xfe5b74,_0x177415,'center');}_0x440d0d+=_0x177415;const _0x515f01=_0x2ef63c[0x0],_0x1dd745=_0x2ef63c[0x1],_0x5b05b3=_0x515f01===_0x499979('0x3d')?$gameParty[_0x499979('0x3d')]():$gameParty[_0x499979('0x1d0')](_0x515f01);if(_0x515f01==='gold'){if(_0x499979('0xd5')===_0x499979('0x1b6')){function _0x401dcf(){const _0x1549f5=_0x499979;this[_0x1549f5('0x49')][_0x1549f5('0x155')](_0x45e833);}}else this[_0x499979('0xa5')](_0x1dd745,_0x5b05b3,_0x440d0d,_0x4f1fcd,_0x177415);}else{if(typeof _0x515f01===_0x499979('0x108')&&_0x515f01[_0x499979('0x4c')](/CATEGORY/i)){if(_0x499979('0x198')!=='bbyyl')this[_0x499979('0x1a3')](_0x515f01,_0x1dd745,_0x440d0d,_0x4f1fcd,_0x177415);else{function _0x118a9a(){const _0x2b11ed=_0x499979;this['_data']=_0xa6c673[_0x2b11ed('0x145')]()[_0x2b11ed('0x12f')](_0x15f849=>this[_0x2b11ed('0x170')](_0x15f849));const _0x213afa=this['_data']['map'](_0x21aae7=>_0x55bd94['getCraftingIngredients'](_0x21aae7)[_0x2b11ed('0x29')]);this[_0x2b11ed('0xb9')]=_0x23ad83[_0x2b11ed('0xfc')](..._0x213afa)+0x1;}}}else{if(_0x499979('0x1b4')===_0x499979('0x1e4')){function _0x44e5f0(){const _0x1053c9=_0x499979;this[_0x1053c9('0x157')][_0x1053c9('0xb0')]=!![],this['_animationPlaying']=![],this['processItemCrafting'](),this['onItemCrafted'](),this[_0x1053c9('0x2b')](),this['_itemWindow']['refresh'](),this['_categoryWindow']['refresh'](),this['_categoryWindow'][_0x1053c9('0x11a')](),this[_0x1053c9('0x109')][_0x1053c9('0x186')](),this['_goldWindow'][_0x1053c9('0x55')](),this['_itemWindow'][_0x1053c9('0x12c')]();}}else this[_0x499979('0x6c')](_0x515f01,_0x1dd745,_0x5b05b3,_0x440d0d,_0x4f1fcd,_0x177415);}}this[_0x499979('0xef')](),_0x3840ef=![];}else{function _0x47dece(){const _0x5a7566=_0x499979,_0xc1738a=_0x1cbcde(_0x34360e['$1']);_0xc1738a!==_0x2a42c8[_0x84a9f1][_0x5a7566('0xf0')]&&(_0x579fa6(_0x5a7566('0x1e1')[_0x5a7566('0x194')](_0x43e734,_0xc1738a)),_0x526f3d[_0x5a7566('0x6a')]());}}}},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0xa5')]=function(_0x44c04c,_0x26db8c,_0x408f29,_0x17544c,_0x3864ad){const _0x52ac85=_0x3fec7a;if(Imported[_0x52ac85('0x172')]){let _0x1eff43=_0x408f29-Math[_0x52ac85('0x1c8')](ImageManager[_0x52ac85('0x18c')]/0x2),_0x3753bc=_0x17544c+Math[_0x52ac85('0x1c8')]((this['lineHeight']()-ImageManager[_0x52ac85('0x103')])/0x2);const _0x491091=VisuMZ[_0x52ac85('0x82')][_0x52ac85('0x96')]['Gold'][_0x52ac85('0x64')];this[_0x52ac85('0x87')](_0x491091,_0x1eff43,_0x3753bc);}else{if(_0x52ac85('0x1cb')===_0x52ac85('0x1cb')){let _0x5859be=_0x408f29-Math[_0x52ac85('0x1c8')](_0x3864ad/0x2),_0x128098=_0x17544c+Math['round']((this['lineHeight']()-ImageManager[_0x52ac85('0x103')])/0x2);this[_0x52ac85('0x61')](ColorManager[_0x52ac85('0x102')]()),this['makeFontBigger'](),this[_0x52ac85('0xdf')](TextManager['currencyUnit'],_0x5859be,_0x128098,_0x3864ad,'center'),this['resetFontSettings']();}else{function _0x5b12ab(){const _0xcff049=_0x52ac85;if(_0x40bf56['note'][_0xcff049('0x4c')](_0x514e92[_0xcff049('0x7')][_0xcff049('0x1f1')][_0xcff049('0x1f6')]))return _0x57da50(_0x5a1d88['$1']);else{const _0x13820f=_0x16cd27[_0xcff049('0x176')];return _0x524a3f(_0x57de04[_0xcff049('0xeb')][_0xcff049('0x29')]+0x1)[_0xcff049('0x7a')](_0x13820f);}}}}let _0x2d9532=_0x408f29-Math[_0x52ac85('0x1c8')](_0x3864ad/0x2),_0x102bff=_0x17544c+this['lineHeight']();const _0x534fb3=VisuMZ[_0x52ac85('0x21')][_0x52ac85('0x96')][_0x52ac85('0x20')][_0x52ac85('0x4')];let _0x11dc04=_0x534fb3[_0x52ac85('0x194')](_0x44c04c);_0x44c04c>_0x26db8c&&this['changeTextColor'](ColorManager[_0x52ac85('0x1ff')]()),this['contents'][_0x52ac85('0x13a')]=Window_ItemCraftingList[_0x52ac85('0x212')],this[_0x52ac85('0xdf')](_0x11dc04,_0x2d9532,_0x102bff,_0x3864ad,_0x52ac85('0xa8'));},Window_ItemCraftingList[_0x3fec7a('0x6')]['drawIngredientCategory']=function(_0x5f4161,_0x37ffa5,_0x560cff,_0x3a32b8,_0x5be573){const _0x31ea74=_0x3fec7a,_0x2afabf=VisuMZ[_0x31ea74('0x7')][_0x31ea74('0x96')][_0x31ea74('0x11c')];let _0x693873=_0x560cff-Math[_0x31ea74('0x1c8')](ImageManager[_0x31ea74('0x18c')]/0x2),_0xb17266=_0x3a32b8+Math[_0x31ea74('0x1c8')]((this[_0x31ea74('0x1e7')]()-ImageManager['iconHeight'])/0x2);this['drawIcon'](_0x2afabf[_0x31ea74('0x2e')],_0x693873,_0xb17266),_0x5f4161[_0x31ea74('0x4c')](/CATEGORY: (.*)/i);const _0x16b500=String(RegExp['$1'])[_0x31ea74('0x7c')]();let _0x906b92=_0x560cff-Math[_0x31ea74('0x1c8')](_0x5be573/0x2),_0x2df0c8=_0x3a32b8;this[_0x31ea74('0xd2')][_0x31ea74('0x13a')]=Window_ItemCraftingList[_0x31ea74('0x212')],this[_0x31ea74('0xdf')](_0x16b500,_0x906b92,_0x2df0c8,_0x5be573,_0x31ea74('0xa8'));let _0x5d723e=_0x560cff-Math[_0x31ea74('0x1c8')](_0x5be573/0x2),_0x26e146=_0x3a32b8+this['lineHeight']();const _0x4a81d=VisuMZ[_0x31ea74('0x21')][_0x31ea74('0x96')][_0x31ea74('0x20')][_0x31ea74('0x4')];let _0x1c21b1=_0x4a81d[_0x31ea74('0x194')](_0x37ffa5);this[_0x31ea74('0xd2')][_0x31ea74('0x13a')]=Window_ItemCraftingList[_0x31ea74('0x212')],this[_0x31ea74('0xdf')](_0x1c21b1,_0x5d723e,_0x26e146,_0x5be573,_0x31ea74('0xa8'));},Window_ItemCraftingList['prototype']['drawIngredientItem']=function(_0x4dfd0e,_0x56691e,_0x19e0c6,_0x5ce4e5,_0x1aa495,_0x13e2dd){const _0x4b9587=_0x3fec7a;let _0x388e9b=_0x5ce4e5-Math['round'](ImageManager[_0x4b9587('0x18c')]/0x2),_0x43887e=_0x1aa495+Math['round']((this[_0x4b9587('0x1e7')]()-ImageManager[_0x4b9587('0x103')])/0x2);this[_0x4b9587('0x87')](_0x4dfd0e['iconIndex'],_0x388e9b,_0x43887e);let _0x3b623b=_0x5ce4e5-Math[_0x4b9587('0x1c8')](_0x13e2dd/0x2),_0x2b1161=_0x1aa495+this[_0x4b9587('0x1e7')]();const _0x4c27a1=VisuMZ[_0x4b9587('0x21')]['Settings'][_0x4b9587('0x20')][_0x4b9587('0x4')];let _0x4eb45d=_0x4c27a1[_0x4b9587('0x194')](_0x4b9587('0x18d')[_0x4b9587('0x194')](_0x19e0c6,_0x56691e));_0x56691e>_0x19e0c6&&this[_0x4b9587('0x61')](ColorManager['powerDownColor']()),this[_0x4b9587('0xd2')]['fontSize']=Window_ItemCraftingList[_0x4b9587('0x212')],this[_0x4b9587('0xdf')](_0x4eb45d,_0x3b623b,_0x2b1161,_0x13e2dd,_0x4b9587('0xa8'));},Window_ItemCraftingList['prototype'][_0x3fec7a('0x1c9')]=function(){const _0x4f1d96=_0x3fec7a;if(!VisuMZ[_0x4f1d96('0x7')][_0x4f1d96('0x96')][_0x4f1d96('0x1a1')][_0x4f1d96('0x20a')])return;const _0xfd264c=new Rectangle(0x0,0x0,Graphics[_0x4f1d96('0x163')],Window_Base[_0x4f1d96('0x6')][_0x4f1d96('0x20b')](0x1));this[_0x4f1d96('0x1e9')]=new Window_ItemCraftingTooltip(_0xfd264c),this[_0x4f1d96('0x1d7')](this[_0x4f1d96('0x1e9')]);},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x1ef')]=function(){const _0x35c630=_0x3fec7a;Window_ItemList[_0x35c630('0x6')][_0x35c630('0x1ef')][_0x35c630('0xd0')](this),this['updateTooltipWindow']();},Window_ItemCraftingList['prototype'][_0x3fec7a('0x5f')]=function(){const _0x1c91eb=_0x3fec7a;if(!this[_0x1c91eb('0x1e9')])return;if(this[_0x1c91eb('0x113')]()){if(_0x1c91eb('0x2a')==='vUctC')this[_0x1c91eb('0xf3')]();else{function _0x112dde(){const _0x2ffa35=_0x1c91eb;_0x5d259f=_0x238434[_0x2ffa35('0xeb')];}}}else this[_0x1c91eb('0x1e9')][_0x1c91eb('0x213')]('');const _0x400d60=new Point(TouchInput['x'],TouchInput['y']),_0x2c8658=this[_0x1c91eb('0x133')][_0x1c91eb('0x51')](_0x400d60);this[_0x1c91eb('0x1e9')]['x']=_0x2c8658['x']-this[_0x1c91eb('0x1e9')]['width']/0x2,this[_0x1c91eb('0x1e9')]['y']=_0x2c8658['y']-this[_0x1c91eb('0x1e9')][_0x1c91eb('0x54')];},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x113')]=function(){const _0x286c02=_0x3fec7a;if(!this[_0x286c02('0x181')])return![];if(!this['item']())return![];if(!this[_0x286c02('0x20c')]())return![];if(this[_0x286c02('0x208')]()!==this[_0x286c02('0x1fe')]())return![];return!![];},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0xf3')]=function(){const _0x1f4ddd=_0x3fec7a,_0x1e999f=this['itemRectWithPadding'](this[_0x1f4ddd('0x1fe')]()),_0x4fb766=DataManager['getCraftingIngredients'](this[_0x1f4ddd('0x19c')]()),_0x28605f=new Point(TouchInput['x'],TouchInput['y']),_0x3f716e=this[_0x1f4ddd('0x133')][_0x1f4ddd('0x51')](_0x28605f);let _0x29d93b=_0x1e999f[_0x1f4ddd('0x54')]+this[_0x1f4ddd('0x214')]()*0x2,_0x1e9879=_0x1e999f['y']+this[_0x1f4ddd('0x1e7')](),_0x2caffd=_0x1e999f[_0x1f4ddd('0x117')]-_0x29d93b-this[_0x1f4ddd('0x214')](),_0x4c3262=Math[_0x1f4ddd('0x60')](_0x2caffd/this[_0x1f4ddd('0xb9')]);for(const _0x4f9dd2 of _0x4fb766){if(_0x1f4ddd('0x15c')!==_0x1f4ddd('0x1f2')){_0x29d93b+=_0x4c3262;const _0x1a7ab2=new Rectangle(_0x29d93b-ImageManager[_0x1f4ddd('0x18c')],0x0,ImageManager[_0x1f4ddd('0x18c')]*0x2,Graphics[_0x1f4ddd('0x127')]);if(_0x1a7ab2[_0x1f4ddd('0x11e')](_0x3f716e['x'],_0x3f716e['y'])){let _0x2304c7=_0x4f9dd2[0x0],_0x70a60a='';if(_0x2304c7==='gold')_0x70a60a=TextManager[_0x1f4ddd('0x1f9')];else{if(typeof _0x2304c7==='string'&&_0x2304c7[_0x1f4ddd('0x4c')](/CATEGORY/i)){if(_0x1f4ddd('0x1d8')!==_0x1f4ddd('0x1eb'))_0x2304c7[_0x1f4ddd('0x4c')](/CATEGORY: (.*)/i),_0x70a60a=String(RegExp['$1'])['trim']();else{function _0x2fbeb1(){return!!this['getItemCraftedTimes'](_0x3f560e);}}}else _0x70a60a=_0x2304c7[_0x1f4ddd('0xeb')];}this['_tooltipWindow'][_0x1f4ddd('0x213')](_0x70a60a['trim']());return;}}else{function _0x787797(){const _0x5bda94=_0x1f4ddd;_0x274cf2=_0xdfa429['_scene'][_0x5bda94('0x12')][_0xabaaa],_0x3cca29+=0x1;}}}this['_tooltipWindow'][_0x1f4ddd('0x213')]('');},Window_ItemCraftingList[_0x3fec7a('0x6')][_0x3fec7a('0x12c')]=function(){const _0x4edecd=_0x3fec7a,_0x47a901=this['item']()&&DataManager['isCraftingItemMasked'](this['item']())?null:this[_0x4edecd('0x19c')]();this[_0x4edecd('0xb4')](_0x47a901),this[_0x4edecd('0x10d')]&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x4edecd('0x10d')][_0x4edecd('0x120')](_0x47a901);};function Window_ItemCraftingTooltip(){const _0x37272f=_0x3fec7a;this[_0x37272f('0x31')](...arguments);}Window_ItemCraftingTooltip[_0x3fec7a('0x6')]=Object[_0x3fec7a('0x14a')](Window_Base[_0x3fec7a('0x6')]),Window_ItemCraftingTooltip['prototype'][_0x3fec7a('0x100')]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x3fec7a('0xca')]=VisuMZ['ItemCraftingSys'][_0x3fec7a('0x96')][_0x3fec7a('0x1a1')][_0x3fec7a('0xeb')],Window_ItemCraftingTooltip[_0x3fec7a('0x6')][_0x3fec7a('0x31')]=function(_0x4f7a3a){const _0x37c49a=_0x3fec7a;Window_Base['prototype'][_0x37c49a('0x31')][_0x37c49a('0xd0')](this,_0x4f7a3a),this[_0x37c49a('0x14')](this['hasCustomWindowSkin']()?0x0:0x2),this[_0x37c49a('0x213')]('');},Window_ItemCraftingTooltip[_0x3fec7a('0x6')][_0x3fec7a('0xe2')]=function(){const _0x5ef30e=_0x3fec7a;return Window_ItemCraftingTooltip[_0x5ef30e('0xca')]!=='';},Window_ItemCraftingTooltip['prototype'][_0x3fec7a('0x17a')]=function(){const _0x514b79=_0x3fec7a;if(Window_ItemCraftingTooltip[_0x514b79('0xca')]!==''){if('vzAbH'===_0x514b79('0x143'))this[_0x514b79('0x175')]=ImageManager[_0x514b79('0x167')](Window_ItemCraftingTooltip[_0x514b79('0xca')]);else{function _0x8fd57e(){const _0x3b27cd=_0x514b79;return _0x21a106['ItemsEquipsCore'][_0x3b27cd('0x96')][_0x3b27cd('0x1af')]['buttonAssistSmallIncrement'];}}}else Window_Base['prototype']['loadWindowskin'][_0x514b79('0xd0')](this);},Window_ItemCraftingTooltip[_0x3fec7a('0x6')][_0x3fec7a('0x213')]=function(_0x175685){const _0x162e20=_0x3fec7a;if(this['_text']!==_0x175685){if(_0x162e20('0x191')===_0x162e20('0x5e')){function _0x1d6526(){const _0x2c1620=_0x162e20;this['_itemWindow'][_0x2c1620('0x152')](),this['_itemWindow'][_0x2c1620('0x116')](0x0);}}else this[_0x162e20('0x97')]=_0x175685,this[_0x162e20('0x55')]();}},Window_ItemCraftingTooltip[_0x3fec7a('0x6')][_0x3fec7a('0x3e')]=function(){const _0x23dfa1=_0x3fec7a;this[_0x23dfa1('0x213')]('');},Window_ItemCraftingTooltip[_0x3fec7a('0x6')]['setItem']=function(_0x432e26){const _0x4b3d4e=_0x3fec7a;this[_0x4b3d4e('0x213')](_0x432e26?_0x432e26[_0x4b3d4e('0xeb')]:'');},Window_ItemCraftingTooltip[_0x3fec7a('0x6')][_0x3fec7a('0x55')]=function(){const _0x3ec4a9=_0x3fec7a,_0x415281=this['baseTextRect']();this[_0x3ec4a9('0x35')](),this[_0x3ec4a9('0xdf')](this['_text'],0x0,0x0,this[_0x3ec4a9('0x162')],_0x3ec4a9('0xa8'));},Window_ItemCraftingTooltip[_0x3fec7a('0x6')][_0x3fec7a('0x35')]=function(){const _0x459dfc=_0x3fec7a;if(this['_text']==='')this['contents'][_0x459dfc('0x3e')](),this[_0x459dfc('0x117')]=0x0;else{let _0x1e2d6a=this[_0x459dfc('0x206')](this['_text'])+this[_0x459dfc('0x214')]()*0x4;this['width']=_0x1e2d6a+$gameSystem['windowPadding']()*0x2,this[_0x459dfc('0xc')]();if(this[_0x459dfc('0xe2')]())return;const _0x2bf0e9=ColorManager[_0x459dfc('0xc9')]();this[_0x459dfc('0xd2')][_0x459dfc('0x151')](0x0,0x0,this[_0x459dfc('0x162')],this['innerHeight'],_0x2bf0e9);}};function Window_ItemCraftingNumber(){const _0x124f1e=_0x3fec7a;this[_0x124f1e('0x31')](...arguments);}Window_ItemCraftingNumber[_0x3fec7a('0x6')]=Object['create'](Window_ShopNumber['prototype']),Window_ItemCraftingNumber[_0x3fec7a('0x6')]['constructor']=Window_ItemCraftingNumber,Window_ItemCraftingNumber['prototype'][_0x3fec7a('0x31')]=function(_0x5ddbc9){const _0x21b6ea=_0x3fec7a;Window_ShopNumber['prototype']['initialize'][_0x21b6ea('0xd0')](this,_0x5ddbc9);},Window_ItemCraftingNumber['prototype'][_0x3fec7a('0x9b')]=function(_0x4d6766){const _0x1deb17=_0x3fec7a;this[_0x1deb17('0x153')]=_0x4d6766,this[_0x1deb17('0xfb')]=this['determineMax'](),this[_0x1deb17('0x128')]=Math[_0x1deb17('0x94')](0x1,this[_0x1deb17('0xfb')]),this[_0x1deb17('0xe4')](),this[_0x1deb17('0x55')]();},Window_ItemCraftingNumber[_0x3fec7a('0x6')][_0x3fec7a('0x1a')]=function(){const _0x2c7067=_0x3fec7a,_0x4f0f4a=[],_0x4ba4fe=this[_0x2c7067('0x153')],_0x3c25ad=DataManager[_0x2c7067('0x1e6')](_0x4ba4fe);let _0x5ae5a9=0x0;for(const _0xacc428 of _0x3c25ad){if(_0x2c7067('0x9e')!==_0x2c7067('0x9e')){function _0x54fe22(){const _0x15726f=_0x2c7067;if(_0xf8b4a7[_0x15726f('0x22')]())return;if(_0x18c9a4[_0x15726f('0xb7')]())return;_0x158e3f[_0x15726f('0x155')](_0x240f05);}}else{if(!_0xacc428)continue;let _0x520958=_0xacc428[0x0];const _0x300f29=_0xacc428[0x1];if(_0x520958===_0x2c7067('0x3d'))_0x4f0f4a[_0x2c7067('0x155')](Math[_0x2c7067('0x60')]($gameParty[_0x2c7067('0x3d')]()/_0x300f29));else{if(_0x2c7067('0x58')===_0x2c7067('0x18')){function _0x59817c(){const _0x590dd9=_0x2c7067;_0x1277c7[_0x590dd9('0x77')]();}}else typeof _0x520958===_0x2c7067('0x108')&&_0x520958[_0x2c7067('0x4c')](/CATEGORY/i)&&(_0x520958=SceneManager[_0x2c7067('0x5c')][_0x2c7067('0x12')][_0x5ae5a9],_0x5ae5a9+=0x1),_0x4f0f4a[_0x2c7067('0x155')](Math[_0x2c7067('0x60')]($gameParty[_0x2c7067('0x1d0')](_0x520958)/_0x300f29));}}}if(_0x4f0f4a[_0x2c7067('0x29')]<=0x0)_0x4f0f4a[_0x2c7067('0x155')](0x0);return _0x4f0f4a[_0x2c7067('0x155')]($gameParty['maxItems'](_0x4ba4fe)-$gameParty[_0x2c7067('0x1d0')](_0x4ba4fe)),Math['min'](..._0x4f0f4a);},Window_ItemCraftingNumber[_0x3fec7a('0x6')][_0x3fec7a('0x55')]=function(){const _0x5ca187=_0x3fec7a;Window_Selectable[_0x5ca187('0x6')][_0x5ca187('0x55')][_0x5ca187('0xd0')](this),this[_0x5ca187('0x63')](),this[_0x5ca187('0x135')](0x0),this['drawTotalPrice'](),this[_0x5ca187('0xe5')](),this[_0x5ca187('0x3b')](),this[_0x5ca187('0x17e')](),this[_0x5ca187('0x1b9')]();},Window_ItemCraftingNumber['prototype']['changeOkButtonEnable']=function(){const _0x53c48b=_0x3fec7a,_0x17bb36=this[_0x53c48b('0xdb')][0x4];this[_0x53c48b('0x1e5')]()?_0x17bb36[_0x53c48b('0x7b')](this[_0x53c48b('0x1dc')][_0x53c48b('0x21a')](this)):_0x17bb36[_0x53c48b('0x7e')]=null;},Window_ItemCraftingNumber[_0x3fec7a('0x6')][_0x3fec7a('0x199')]=function(){const _0x3d3774=_0x3fec7a;return Math[_0x3d3774('0x60')](this[_0x3d3774('0x126')]()+this[_0x3d3774('0x1e7')]()*0x2);},Window_ItemCraftingNumber[_0x3fec7a('0x6')]['totalPriceY']=function(){const _0x2033bb=_0x3fec7a;return Math[_0x2033bb('0x60')](this[_0x2033bb('0x158')]-this['lineHeight']()*6.5);},Window_ItemCraftingNumber[_0x3fec7a('0x6')][_0x3fec7a('0x211')]=function(){const _0x1d2a63=_0x3fec7a;return Math[_0x1d2a63('0x60')](this[_0x1d2a63('0x199')]()+this[_0x1d2a63('0x1e7')]()*0x2);},Window_ItemCraftingNumber['prototype'][_0x3fec7a('0x95')]=function(){const _0x531308=_0x3fec7a,_0x35d078=DataManager[_0x531308('0x1e6')](this[_0x531308('0x153')]),_0x49b05=this[_0x531308('0x214')](),_0x128e01=_0x49b05*0x2;let _0xd52c4f=this['totalPriceY']();_0xd52c4f-=this[_0x531308('0x1e7')]()*_0x35d078['length'];const _0x3d9b5f=this[_0x531308('0x162')]-_0x128e01-_0x49b05*0x2;let _0xccd20=0x0;for(const _0xc6fd79 of _0x35d078){_0xd52c4f+=this[_0x531308('0x1e7')]();if(!_0xc6fd79)continue;let _0x460846=_0xc6fd79[0x0];const _0x1f9aae=_0xc6fd79[0x1]*(this[_0x531308('0x128')]||0x1);if(_0x460846===_0x531308('0x3d'))Imported[_0x531308('0x172')]?this[_0x531308('0x16f')](_0x1f9aae,_0x128e01,_0xd52c4f,_0x3d9b5f):this[_0x531308('0x1cd')](_0x1f9aae,TextManager['currencyUnit'],0x0,_0xd52c4f,_0x3d9b5f+_0x49b05*0x2);else{if(typeof _0x460846===_0x531308('0x108')&&_0x460846[_0x531308('0x4c')](/CATEGORY/i)){if(_0x531308('0x3a')!==_0x531308('0x1be'))_0x460846=SceneManager['_scene'][_0x531308('0x12')][_0xccd20],_0xccd20+=0x1;else{function _0x2a35e6(){const _0x17990c=_0x531308;this[_0x17990c('0x61')](_0x510172[_0x17990c('0x1ff')]());}}}this['drawItemName'](_0x460846,_0x128e01,_0xd52c4f,_0x3d9b5f),this[_0x531308('0xdf')](_0x1f9aae,_0x128e01,_0xd52c4f,_0x3d9b5f-_0x49b05,_0x531308('0xf'));const _0x4b30af=this['multiplicationSign'](),_0x59f6d3=this['textWidth'](_0x4b30af),_0x1ffdc5=this[_0x531308('0x202')]();this[_0x531308('0x1b3')](),this[_0x531308('0xdf')](_0x4b30af,_0x1ffdc5,_0xd52c4f,_0x59f6d3);}}},Window_ItemCraftingNumber[_0x3fec7a('0x6')][_0x3fec7a('0x16f')]=function(_0x32d4bc,_0x276072,_0x1f1f52,_0x446c1b){const _0x1bc46b=_0x3fec7a;this['resetFontSettings'](),this[_0x1bc46b('0xd2')][_0x1bc46b('0x13a')]=VisuMZ[_0x1bc46b('0x82')]['Settings'][_0x1bc46b('0xa7')][_0x1bc46b('0x1bc')];const _0x3337e1=VisuMZ[_0x1bc46b('0x82')][_0x1bc46b('0x96')]['Gold']['GoldIcon'];if(_0x3337e1>0x0){if(_0x1bc46b('0x1a4')===_0x1bc46b('0x1b0')){function _0x4ef85a(){const _0x452764=_0x1bc46b;if(!this[_0x452764('0x14c')])return;if(this['_animationSprite']['isPlaying']())return;this[_0x452764('0x98')](),this[_0x452764('0x1ed')](this[_0x452764('0xdd')][_0x452764('0x195')]());}}else{const _0xfc480a=_0x1f1f52+(this[_0x1bc46b('0x1e7')]()-ImageManager[_0x1bc46b('0x103')])/0x2;this[_0x1bc46b('0x87')](_0x3337e1,_0x276072,_0xfc480a);const _0xa3fd08=ImageManager['iconWidth']+0x4;_0x276072+=_0xa3fd08,_0x446c1b-=_0xa3fd08;}}this['changeTextColor'](ColorManager[_0x1bc46b('0x102')]()),this[_0x1bc46b('0xdf')](TextManager['currencyUnit'],_0x276072,_0x1f1f52,_0x446c1b,_0x1bc46b('0x104')),this['resetTextColor']();const _0x35e134=VisuMZ[_0x1bc46b('0x21')][_0x1bc46b('0x96')][_0x1bc46b('0x20')]['ItemQuantityFmt'],_0x5219d6=_0x35e134[_0x1bc46b('0x194')](_0x32d4bc),_0x52dd1f=this[_0x1bc46b('0x206')](this[_0x1bc46b('0xbe')]?VisuMZ['GroupDigits'](_0x5219d6):_0x5219d6);_0x446c1b-=this[_0x1bc46b('0x214')]();if(_0x52dd1f>_0x446c1b)this[_0x1bc46b('0xdf')](VisuMZ[_0x1bc46b('0x82')][_0x1bc46b('0x96')]['Gold'][_0x1bc46b('0x16c')],_0x276072,_0x1f1f52,_0x446c1b,_0x1bc46b('0xf'));else{if(_0x1bc46b('0x17d')!==_0x1bc46b('0x17d')){function _0xb4fad2(){const _0x449dde=_0x1bc46b;this[_0x449dde('0xdf')](_0xcfbb95[_0x449dde('0x82')][_0x449dde('0x96')][_0x449dde('0xa7')]['GoldOverlap'],_0x4c5529,_0xfabcb,_0x499bb4,_0x449dde('0xf'));}}else this[_0x1bc46b('0xdf')](_0x5219d6,_0x276072,_0x1f1f52,_0x446c1b,_0x1bc46b('0xf'));}this[_0x1bc46b('0xef')]();},Window_ItemCraftingNumber['prototype']['isOkEnabled']=function(){const _0x19e547=_0x3fec7a;if((this[_0x19e547('0x128')]||0x0)<=0x0)return![];return Window_ShopNumber[_0x19e547('0x6')]['isOkEnabled'][_0x19e547('0xd0')](this);},Window_ItemCraftingNumber['prototype'][_0x3fec7a('0x17f')]=function(){return this['isOkEnabled']();};function Window_ItemCraftingIngredient(){const _0x208901=_0x3fec7a;this[_0x208901('0x31')](...arguments);}Window_ItemCraftingIngredient[_0x3fec7a('0x6')]=Object[_0x3fec7a('0x14a')](Window_ItemList[_0x3fec7a('0x6')]),Window_ItemCraftingIngredient[_0x3fec7a('0x6')][_0x3fec7a('0x100')]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient[_0x3fec7a('0x6')]['initialize']=function(_0x392b75){const _0x4353a2=_0x3fec7a;Window_Selectable[_0x4353a2('0x6')]['initialize']['call'](this,_0x392b75),this['_amount']=0x0;},Window_ItemCraftingIngredient['prototype'][_0x3fec7a('0x92')]=function(){return![];},Window_ItemCraftingIngredient['prototype'][_0x3fec7a('0x9b')]=function(_0x2aac7a,_0x227a1e){const _0x8ba80e=_0x3fec7a;this[_0x8ba80e('0xdc')]=_0x2aac7a,this['_amount']=_0x227a1e||0x1,this[_0x8ba80e('0x55')](),this[_0x8ba80e('0x131')](0x0,0x0),this['activate'](),this[_0x8ba80e('0x116')](0x0);},Window_ItemCraftingIngredient[_0x3fec7a('0x6')]['makeItemList']=function(){const _0x4242d6=_0x3fec7a;this[_0x4242d6('0x161')]=$gameParty[_0x4242d6('0xf8')]()[_0x4242d6('0x12f')](_0xd01073=>this[_0x4242d6('0x170')](_0xd01073));},Window_ItemCraftingIngredient[_0x3fec7a('0x6')][_0x3fec7a('0x170')]=function(_0x533d00){const _0x26f3b9=_0x3fec7a;if(!_0x533d00)return![];if(_0x533d00===SceneManager[_0x26f3b9('0x5c')]['_item'])return![];return _0x533d00[_0x26f3b9('0x171')]['includes'](this[_0x26f3b9('0xdc')]['toUpperCase']()[_0x26f3b9('0x7c')]());},Window_ItemCraftingIngredient['prototype']['isEnabled']=function(_0x130496){const _0x53e8f9=_0x3fec7a;if(!_0x130496)return![];if(this[_0x53e8f9('0x1fd')]()['includes'](_0x130496))return![];return $gameParty[_0x53e8f9('0x1d0')](_0x130496)>=this[_0x53e8f9('0x1e8')];},Window_ItemCraftingIngredient[_0x3fec7a('0x6')][_0x3fec7a('0x1fd')]=function(){const _0x19999a=_0x3fec7a,_0x532d1b=[],_0x37b9e8=DataManager[_0x19999a('0x1e6')](SceneManager[_0x19999a('0x5c')][_0x19999a('0x153')]);for(const _0x3cf3ff of _0x37b9e8){if(!_0x3cf3ff)continue;const _0x17b647=_0x3cf3ff[0x0];if(DataManager[_0x19999a('0x73')](_0x17b647)||DataManager['isWeapon'](_0x17b647)||DataManager[_0x19999a('0x9f')](_0x17b647)){if(_0x19999a('0x99')===_0x19999a('0x121')){function _0x6810f6(){const _0x3d9e77=_0x19999a;return this[_0x3d9e77('0x137')];}}else _0x532d1b[_0x19999a('0x155')](_0x17b647);}}return _0x532d1b[_0x19999a('0xa')](SceneManager[_0x19999a('0x5c')]['_ingredientsList']);},Window_ItemCraftingIngredient['prototype'][_0x3fec7a('0x14f')]=function(_0x2f17c9,_0x228fa2,_0x1d7702,_0x13682d){const _0x23506d=_0x3fec7a;_0x2f17c9&&this[_0x23506d('0x1fd')]()[_0x23506d('0x170')](_0x2f17c9)&&(this[_0x23506d('0xd9')]=!![]),Window_ItemList[_0x23506d('0x6')][_0x23506d('0x14f')][_0x23506d('0xd0')](this,_0x2f17c9,_0x228fa2,_0x1d7702,_0x13682d),this['_alreadySelected']=![];},Window_ItemCraftingIngredient['prototype'][_0x3fec7a('0xdf')]=function(_0x290498,_0x3d1366,_0x2e6a80,_0x21a3c6,_0x179929){const _0x7dd69c=_0x3fec7a;if(this[_0x7dd69c('0xd9')]){if(_0x7dd69c('0x23')===_0x7dd69c('0x23')){const _0x4ed64d=VisuMZ['ItemCraftingSys'][_0x7dd69c('0x96')][_0x7dd69c('0x11c')];this[_0x7dd69c('0xd2')]['textColor']=ColorManager[_0x7dd69c('0xd7')](_0x4ed64d[_0x7dd69c('0xc5')]),_0x290498+=_0x4ed64d[_0x7dd69c('0xb8')];}else{function _0x3b4540(){const _0x4cabec=_0x7dd69c,_0x42c340=_0x2dec66(_0x41639f['$1']);_0x42c340<_0xb1f31b?(_0x352d48(_0x4cabec('0x1ce')['format'](_0x1d618a,_0x42c340,_0x340128)),_0x32faca[_0x4cabec('0x6a')]()):_0x2e3a32=_0x1f99ad['max'](_0x42c340,_0x51de18);}}}Window_Base[_0x7dd69c('0x6')]['drawText'][_0x7dd69c('0xd0')](this,_0x290498,_0x3d1366,_0x2e6a80,_0x21a3c6,_0x179929);};
//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.07] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  visible = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @textm Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x4cdb=['Blacklist','kUZDE','_newLabelSprites','Step2Start','Gmtue','calcWindowHeight','Window_ItemList_updateHelp','ZLlKN','Scene_Equip_commandWindowRect','getItemEffectsMpDamageText','equip','previousActor','xjQqA','kouOz','buttonAssistSlotWindowShift','hitIndex','TextAlign','round','drawItemName','nonRemovableEtypes','DRxzP','ItemSceneAdjustItemList','drawItemKeyData','makeDeepCopy','commandBuy','buttonAssistItemListRequirement','_dummyWindow','zUcpy','processHandling','buttonAssistText1','NeverUsable','RemoveEquipText','wzilb','xyFjF','isKeyItem','clearNewLabelFromItem','goldWindowRectItemsEquipsCore','drawParamsItemsEquipsCore','version','LabelElement','width','drawNewLabelIcon','FCYVC','isEquipCommandEnabled','drawItemDarkRect','windowPadding','ListWindowCols','fillRect','EFFECT_GAIN_TP','auto','reloadMapIfUpdated','Scene_Shop_onBuyCancel','HyyYQ','getInputMultiButtonStrings','getItemEffectsAddedStatesBuffsText','BorderRegExp','CFGtA','damage','getItemEffectsTpDamageText','optimize','BVxXJ','getTextColor','newLabelEnabled','buttonAssistRemove','Zgrms','jgZOH','makeCommandList','MaxArmors','isNewItem','isOpenAndActive','setTempActor','onCategoryCancelItemsEquipsCore','equipAdjustHpMp','setupItemDamageTempActors','dataId','UJQyG','playOkSound','QrSTB','uxMsP','drawItemEffectsMpRecovery','SjJgA','Speed0','setHelpWindowItem','CmdIconBuy','_actor','commandNameWindowDrawBackground','Scene_Item_itemWindowRect','faUxw','setObject','callUpdateHelp','removeDebuff','LpcTJ','isShowNew','canConsumeItem','addState','optKeyItemsNumber','onDatabaseLoaded','isHandled','CziQg','NoChangeMarker','_handlers','cJhng','drawParamName','rtfDI','GNXmo','kqqrw','ztrrB','isGoodShown','isClearEquipOk','isClicked','commandNameWindowDrawText','ScopeAlliesButUser','sellWindowRect','LabelConsume','max','omeka','ParamValueFontSize','parse','DABrv','getItemSpeedText','_purchaseOnly','CannotEquipMarker','drawItemDamage','addInnerChild','HlaaA','paramPlus','A%1','MAT','gainTP','nextActor','LayoutStyle','show','tbOQQ','createItemWindow','LabelRepeats','bGGFs','statusWindowRect','DEF','MRqGi','clearNewItem','refreshCursor','weaponTypes','aGaew','postCreateItemWindowModernControls','REMOVED\x20EFFECTS','NUM','gaugeBackColor','ezGfz','FzKfp','blt','createCommandNameWindow','LWIJM','aNvWO','Game_BattlerBase_meetsItemConditions','ARRAYFUNC','Step1End','contents','setItem','SCOPE','ShowShopStatus','Window_Selectable_update','commandWindowRectItemsEquipsCore','BrNyj','Scene_Shop_sellWindowRect','onSlotOkAutoSelect','index','equips','getItemQuantityText','StatusWindowWidth','call','paramchangeTextColor','clamp','ByngK','UuuXL','setMp','drawNewLabelText','ScopeRandomEnemies','isTriggered','getItemEffectsRemovedStatesBuffsText','VisuMZ_0_CoreEngine','addCancelCommand','HiddenItemB','zwaoj','drawItemDamageAmount','MANUAL','drawParamText','ENIKy','isOptimizeCommandAdded','AExPM','processCursorHomeEndTrigger','right','itemEnableJS','innerWidth','IpqaH','buyWindowRectItemsEquipsCore','nIuPm','eLiIi','refreshActorEquipSlotsIfUpdated','_buttonAssistWindow','onTouchSelect','%1-%2','Settings','characterName','isShiftRemoveShortcutEnabled','QdKLt','checkShiftRemoveShortcut','Window_EquipStatus_refresh','_doubleTouch','PZhbu','getItemDamageAmountLabel','EquipAdjustHpMp','hRfPc','W%1','_newLabelOpacityUpperLimit','LabelRecoverHP','LrQuF','uiInputPosition','fontFace','Game_Party_gainItem','visible','addClearCommand','trim','isEquipped','getItemHitTypeText','drawItemDamageElement','getColor','MVocI','_resetFontColor','qoJOy','placeNewLabel','MaxItems','commandNameWindowCenter','ihXtj','getItemEffectsMpRecoveryText','EFFECT_RECOVER_HP','ItemQuantityFmt','itemDataFontSize','processTouchModernControls','UzfDU','Window_ItemList_drawItem','prepareItemCustomData','drawItemCustomEntryLine','DvgLz','_commandNameWindow','modifiedBuyPriceItemsEquipsCore','ZTkYw','parameters','CmdIconClear','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','HP\x20RECOVERY','processCursorMoveModernControls','uiHelpPosition','height','gDumW','numberWindowRectItemsEquipsCore','rRPVO','LzHMe','iDGxX','gvyyC','categoryNameWindowDrawText','itemPadding','textColor','pagedown','EFFECT_ADD_DEBUFF','SxzvW','CxOOm','Scene_Equip_commandEquip','xEhSE','FOjta','floor','fYSBB','NGuRy','BbenW','TP\x20DAMAGE','Scene_Equip_statusWindowRect','auUNm','onActorChange','Scene_Equip_createSlotWindow','Scene_Shop_createCategoryWindow','categoryItemTypes','initEquips','commandStyle','createNewLabelSprite','Scene_Shop_create','categoryNameWindowCenter','paramJS','eBAle','ujXCH','removeStateBuffChanges','EiydM','onBuyCancelItemsEquipsCore','processShiftRemoveShortcut','mzDKW','getItemConsumableLabel','ItemsEquipsCore','DrawIcons','type','colSpacing','opacity','HP\x20DAMAGE','numItems','selfTP','ARRAYSTR','deactivate','buttonAssistText2','removeState','Scene_Shop_prepare','_tempActorB','SpeedNeg2000','addBuyCommand','mainAreaTop','_shopStatusMenuAlly','commandSell','discardEquip','qNPif','Window_ShopSell_isEnabled','itemWindowRect','contentsBack','removeBuff','itemAt','ceil','MaxIcons','REMqw','rateHP','possession','Scene_Shop_categoryWindowRect','onCategoryCancel','refresh','hideNewLabelSprites','paramId','loadFaceImages','members','drawItemEffectsTpRecovery','getItemEffectsHpRecoveryText','toUpperCase','cursorRight','_commandWindow','ConvertNumberToString','HkFDB','bind','ZeXXY','placeItemNewLabel','Scene_Shop_activateSellWindow','Thtxd','format','tjccn','drawItemConsumable','actorParams','buy','DFehk','value','tIQLG','maxVisibleItems','isHovered','drawItemHitType','mainFontFace','fontSize','isUseModernControls','StatusWindow','_goodsCount','Crvch','_customItemInfo','isDrawItemNumber','Esxot','getItemEffectsRemovedStatesBuffsLabel','FadeLimit','convertInitEquipsToItems','damageColor','AzZer','Scene_ItemBase_activateItemWindow','postCreateCategoryWindowItemsEquipsCore','ATK','CmdStyle','WCzNv','CmdIconSell','_resetFontSize','lzKQI','Scene_Shop_commandSell','mainCommandWidth','drawing','createCategoryNameWindow','center','LHjEp','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','drawItemEffectsHpDamage','prototype','adjustItemWidthByStatus','Game_Actor_tradeItemWithParty','drawItemData','process_VisuMZ_ItemsEquipsCore_ParamValues','PQGZG','AllArmors','scope','param','Window_Selectable_initialize','getItemHitTypeLabel','buttonAssistCategory','Scene_Shop_commandBuy','processCursorMove','zvuRq','activateSellWindow','select','Scene_Equip_slotWindowRect','drawUpdatedParamName','dlRdZ','TLWKb','deselect','ZPGKB','GPqVI','+%1','woUgL','ADDED\x20EFFECTS','meetsItemConditions','cvhME','KeyItems','drawItemStyleIcon','getItemsEquipsCoreBackColor2','onTouchCancel','getItemDamageAmountText','makeItemData','createSlotWindow','constructor','fQoCq','Window_ShopCommand_initialize','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','uKwbs','drawActorParamDifference','OffsetY','UrOJl','cursorPageup','drawItemEffectsHpRecovery','CoreEngine','addCommand','\x5cI[%1]','buttonAssistSmallIncrement','myXBG','create','lineHeight','hitType','Ucsaa','elements','paramValueFontSize','pdlPQ','fill','HaUyH','Clizl','helpWindowRect','rCrYF','_newLabelOpacity','prepare','getItemRepeatsText','isOptimizeCommandEnabled','Scene_Item_create','isRepeated','SeyUJ','TlKHk','mpRate','WajKE','getItemEffectsSelfTpGainText','KceRw','tpGain','Enable','XfWMq','ARRAYEVAL','mainFontSize','helpAreaTop','BatchShop','YpTDt','getInputButtonString','currentEquippedItem','paramPlusItemsEquipsCoreCustomJS','LabelApply','DqLzX','atk','pQBBh','_category','params','puLfY','allowCommandWindowCursorUp','changeEquip','clear','afeiz','onTouchOk','itemWindowRectItemsEquipsCore','RemoveEquipIcon','RsHcA','Game_Actor_changeEquip','gosjQ','CmdCancelRename','MaxMP','description','Window_ShopBuy_price','wVsvR','LabelHitType','statusWindowRectItemsEquipsCore','DrawItemData','DXvea','uJuRT','_scene','KccUB','smallParamFontSize','addSellCommand','fpUoQ','createCategoryWindow','itemLineRect','speed','qEiiI','bEJze','postCreateSlotWindowItemsEquipsCore','tbqXr','EFFECT_ADD_STATE','_categoryNameWindow','createStatusWindow','Type','split','playCursorSound','cursorLeft','limitedPageUpDownSceneCheck','drawItemEquipType','isPageChangeRequested','DOhiu','hideDisabledCommands','iconIndex','onBuyCancel','commandEquip','VisuMZ_1_MainMenuCore','dIbvq','processCursorSpecialCheckModernControls','defaultItemMax','consumable','getItemEffectsHpRecoveryLabel','onSlotOk','_slotId','gdkWP','fSaXC','categoryStyleCheck','clearEquipments','ShiftShortcutKey','process_VisuMZ_ItemsEquipsCore_ParamJS','EVAL','hAIJx','allowCreateStatusWindow','shift','cyCVt','LabelRecoverTP','hide','HIT\x20TYPE','ElementWeapon','_itemData','pVcth','LWMbU','ShopScene','nonOptimizeEtypes','oHafV','paintOpacity','weapon-%1','ClWaO','isWeapon','sellPriceRate','Window_Selectable_setHelpWindowItem','EFFECT_REMOVE_STATE','tOzTm','FontColor','DrawParamJS','onSellOk','AlwaysUsable','ItemQuantityFontSize','drawUpdatedAfterParamValue','Window_ItemList_colSpacing','isEquipChangeOk','DrawEquipData','prepareNewEquipSlotsOnLoad','optimizeEquipments','isShiftShortcutKeyForRemove','nIJSx','Scene_Shop_onSellOk','DamageType%1','DNtlz','ElementNone','LEwmz','maxItemAmount','slotWindowRect','JSON','addItemCategory','powerDownColor','GZTXU','popScene','formula','Scene_Equip_onSlotCancel','boxWidth','TEGuT','rmeQT','CMwbv','pageup','drawItemActorMenuImage','shouldCommandWindowExist','NonOptimizeETypes','process_VisuMZ_ItemsEquipsCore_Category','setShopStatusWindowMode','smoothScrollTo','ChrvI','_list','NMGME','tHxOL','fPCwl','addEquipCommand','ScopeRandomAllies','FadeSpeed','SpeedNeg999','loadSystem','STR','indexOf','registerCommand','itemTextAlign','Scene_Shop_onSellCancel','FCCLM','drawItemSuccessRate','REPEAT','price','getItemEffectsMpRecoveryLabel','EquipScene','xdSHn','update','SSOvi','Window_EquipItem_isEnabled','money','0000','value2','setHandler','oMgCH','slotWindowRectItemsEquipsCore','getItemScopeText','addStateBuffChanges','USER\x20TP\x20GAIN','RegExp','_tempActorA','Scene_Shop_commandWindowRect','Consumable','refreshItemsEquipsCoreNoMenuImage','Scene_Shop_numberWindowRect','jlYJg','getItemEffectsHpDamageLabel','FiPyr','categoryStyle','Window_ShopBuy_refresh','zGMqg','Window_ItemCategory_initialize','AGI','changeEquipById','updateMoneyAmount','getItemEffectsHpDamageText','isClearCommandEnabled','_equips','JFMpZ','onTouchSelectModernControls','initNewItemsList','Scope%1','isBuyCommandEnabled','Window_ItemList_maxCols','cancel','KOdRw','%1%','Nzqws','Scene_Equip_onActorChange','replace','isPlaytest','hKrAR','bitmap','Rtaot','textSizeEx','List','eCbdm','drawItemEffects','commandName','drawTextEx','TlbxP','_newItemsList','drawItemEffectsTpDamage','playBuzzerSound','getMatchingInitEquip','AllWeapons','FieldUsable','bestEquipItem','IconSet','LUK','Window_EquipItem_includes','_data','sellingPrice','LabelRemove','isOpen','CommandAddClear','equip2','aXoFC','_bypassNewLabel','(%1)','fontSizeRatio','statusWidth','IFLIn','ZxCRm','Scene_Shop_createSellWindow','ycDmS','buttonAssistKey2','armor-%1','EYwbF','drawEquipData','canShiftRemoveEquipment','PCvGe','CmdIconEquip','getNextAvailableEtypeId','suyon','includes','GRYty','QwPUZ','process_VisuMZ_ItemsEquipsCore_RegExp','lDQLW','EnableLayout','isClearCommandAdded','nkdWB','YGVYz','Translucent','postCreateSellWindowItemsEquipsCore','MenuPortraits','sMAHS','QUANTITY','ExtDisplayedParams','onSellOkItemsEquipsCore','Cuhgt','HmHSe','categoryWindowRect','values','buffIconIndex','occasion','setNewItem','getItemColor','meetsItemConditionsNotetags','item-%1','ConvertParams','hfkse','HXWiu','isHoverEnabled','QoL','isEquipCommandAdded','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','asAKt','EFFECT_RECOVER_MP','prepareRefreshItemsEquipsCoreLayout','_slotWindow','buttonAssistKey1','getItemEffectsTpRecoveryText','mcSGS','Scene_Boot_onDatabaseLoaded','zGKKn','addOptimizeCommand','ShopMenuStatusStandard','tIeZv','helpWindowRectItemsEquipsCore','uGKoE','Scene_Equip_create','ptqjV','isArmor','drawItemEffectsAddedStatesBuffs','gAJWs','getItemEffectsAddedStatesBuffsLabel','ScopeRandomAny','_itemWindow','ewSmY','onTouchSelectModern','USqie','elementId','CeigO','SellPriceRate','setStatusWindow','SdgTg','tuGQq','filter','isEnabled','maxItems','FUANc','sell','Scene_Equip_onSlotOk','versionId','canEquip','changePaintOpacity','qRyKV','isEquipItem','Step3Start','BMBXK','isDualWield','OffsetX','kVwkd','xwWOg','currentClass','activate','isCancelled','iconHeight','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','cursorUp','+%1%','BuyPriceJS','LabelDamageHP','_numberWindow','STRUCT','lnzPN','_categoryWindow','ZWhGm','active','JrhNW','IDvQg','powerUpColor','setItemWindow','Scene_Equip_itemWindowRect','ohMpc','tyxVB','onSlotCancel','ItemMenuStatusRect','getItemDamageElementLabel','changeTextColor','isItem','setHp','xrReA','isPressed','Nwdtl','lvGYY','process_VisuMZ_ItemsEquipsCore_EnableJS','Scene_Shop_buyWindowRect','forceChangeEquip','getMenuImage','drawItem','LabelSelfGainTP','postCreateItemsEquipsCore','ELEMENT','match','sellWindowRectItemsEquipsCore','commandStyleCheck','zFVYh','bFYrR','SPEED','maxQi','Speed2000','oFRaM','gainItem','EFFECT_REMOVE_DEBUFF','status','changeBuff','HiddenItemA','IncludeShopItem','updateCategoryNameWindow','drawItemEffectsSelfTpGain','Categories','initialize','Scene_Shop_statusWindowRect','New','currentSymbol','FsUep','drawItemEffectsMpDamage','activateItemWindow','length','PDMzV','process_VisuMZ_ItemsEquipsCore_Prices','KeyItemProtect','currentExt','Scene_Shop_onCategoryCancel','_sellWindow','categoryList','EFFECT_ADD_BUFF','_buyWindow','GQRJj','categoryNameWindowDrawBackground','Damage\x20Formula\x20Error\x20for\x20%1','NonRemoveETypes','keyItem','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','nUwNu','Scene_Item_createCategoryWindow','xtdEV','repeats','isCursorMovable','armorTypes','releaseUnequippableItems','NUWAK','LvsHS','_money','log','drawUpdatedBeforeParamValue','Nonconsumable','_tempActor','zuxuD','cursorPagedown','UmSAK','loadPicture','wtypeId','_shopStatusMenuMode','getItemEffectsTpDamageLabel','revertGlobalNamespaceVariables','value1','adjustHiddenShownGoods','JydQo','KlUcD','buttonAssistLargeIncrement','Scene_Item_categoryWindowRect','HJeZS','Game_BattlerBase_param','cMYdD','dLhEm','Scene_Load_reloadMapIfUpdated','BWTuO','FUNC','xNFBE','getItemDamageAmountLabelOriginal','rateMP','beXDs','Param','helpAreaHeight','LqGAh','(+%1)','etypeId','getItemDamageAmountLabelBattleCore','numberWindowRect','ItemScene','LabelRecoverMP','×%1','uqeSA','iconWidth','_calculatingJSParameters','FhzNz','hoxLS','isUseItemsEquipsCoreUpdatedLayout','updateCommandNameWindow','Scene_Shop_goldWindowRect','MultiplierStandard','OVAsr','systemColor','VisuMZ_1_BattleCore','CmdTextAlign','cwdAB','map','nysxE','uiMenuStyle','qDapA','AKJtB','addWindow','DAMAGE\x20MULTIPLIER','equipSlots','MaxWeapons','OVDTJ','_item','sIVqH','NLDsZ','drawRemoveItem','currencyUnit','SellPriceJS','ISiOs','name','PurchaseOnly','AllItems','NotConsumable','jrFZT','drawItemNumber','updatedLayoutStyle','armor','_buyWindowLastIndex','OCCASION','categories','move','checkItemConditionsSwitchNotetags','HRaTa','HIbLD','tradeItemWithParty','textWidth','text','loadCharacter','gWXgw','Step3End','tkmGt','setCategory','isOptimizeEquipOk','commandSellItemsEquipsCore','mainAreaBottom','flatHP','yMrRR','EquipParams','addChild','onMenuImageLoad','Game_Actor_forceChangeEquip','iconText','initNewLabelSprites','MDF','Step1Start','TP\x20RECOVERY','note','\x5cb%1\x5cb','equipTypes','paramValueByName','SUCCESS\x20RATE','wiGEX','NWDGN','bCBkK','Style','hpRate','MP\x20DAMAGE','HwMCs','Window_EquipCommand_initialize','icon','left','cursorDown','FontSize','Speed1000','getDamageStyle','xlQhX','PRPsm','drawIcon','LabelSuccessRate','BattleUsable','Game_Actor_discardEquip','maxCols','buttonAssistOffset3','geUpdatedLayoutStatusWidth','getItemSpeedLabel','lDrbX','isRightInputMode','updateHelp','?????','Window_ItemCategory_setItemWindow','dmSDJ','itypeId','buttonAssistText3','drawItemStyleIconText','Game_Party_initialize','getItemDamageAmountTextBattleCore','onCategoryOk','_statusWindow','Oylpn','mainAreaHeight','BackRectColor','DrawBackRect','categoryWindowRectItemsEquipsCore','Step2End','successRate','process_VisuMZ_ItemsEquipsCore_Notetags','item','CmdHideDisabled','\x5cI[%1]%2','Icon','getItemEffectsSelfTpGainLabel','flatMP','oAVBP','qMZGl','YEScl','onSellCancel','goldWindowRect','inIhE','XdyaC','getItemDamageAmountTextOriginal','Scene_Item_createItemWindow','getItemConsumableText','drawText','determineBaseSellingPrice','SpeedNeg1999','push','Cysoc','CommandAddOptimize','AToPe','commandBuyItemsEquipsCore','down','mhp','eKsmh','isCommandEnabled','isMainMenuCoreMenuImageOptionAvailable','IxPSD','isBottomHelpMode','LabelDamageTP','MP\x20RECOVERY','Occasion%1','_newLabelOpacityChange','createBitmap','nAESD','commandWindowRect','WWMXt','mmp','updateNewLabelOpacity','hideAdditionalSprites','smoothSelect','normalColor','resetFontSettings','FnLPr','ARRAYSTRUCT','resetTextColor','METvJ'];(function(_0x339f24,_0x4cdbd8){const _0x13b5e3=function(_0x562a5b){while(--_0x562a5b){_0x339f24['push'](_0x339f24['shift']());}};_0x13b5e3(++_0x4cdbd8);}(_0x4cdb,0x15a));const _0x13b5=function(_0x339f24,_0x4cdbd8){_0x339f24=_0x339f24-0x0;let _0x13b5e3=_0x4cdb[_0x339f24];return _0x13b5e3;};const _0x4ca968=_0x13b5;var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4ca968('0x1ac')](function(_0x4017fe){const _0x2b9694=_0x4ca968;return _0x4017fe[_0x2b9694('0x1f0')]&&_0x4017fe[_0x2b9694('0x90')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4ca968('0x3af')]=VisuMZ[label][_0x4ca968('0x3af')]||{},VisuMZ[_0x4ca968('0x186')]=function(_0x30e6cb,_0x292f2d){const _0x3c2538=_0x4ca968;for(const _0x469f8e in _0x292f2d){if(_0x3c2538('0x262')!=='jrFZT'){function _0x9fe58(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}else{if(_0x469f8e[_0x3c2538('0x1e5')](/(.*):(.*)/i)){if('qwzUv'==='EVULF'){function _0x30c62a(){const _0x33da47=_0x3c2538;if(!_0x23d4c2[_0x33da47('0x4')](_0x112d3e))return![];}}else{const _0x46b39d=String(RegExp['$1']),_0x1288a4=String(RegExp['$2'])[_0x3c2538('0x434')]()[_0x3c2538('0x3c3')]();let _0x40488c,_0x240691,_0x2a2369;switch(_0x1288a4){case _0x3c2538('0x377'):_0x40488c=_0x292f2d[_0x469f8e]!==''?Number(_0x292f2d[_0x469f8e]):0x0;break;case'ARRAYNUM':_0x240691=_0x292f2d[_0x469f8e]!==''?JSON[_0x3c2538('0x35b')](_0x292f2d[_0x469f8e]):[],_0x40488c=_0x240691['map'](_0x1c9bd9=>Number(_0x1c9bd9));break;case _0x3c2538('0xc1'):_0x40488c=_0x292f2d[_0x469f8e]!==''?eval(_0x292f2d[_0x469f8e]):null;break;case _0x3c2538('0x75'):_0x240691=_0x292f2d[_0x469f8e]!==''?JSON['parse'](_0x292f2d[_0x469f8e]):[],_0x40488c=_0x240691[_0x3c2538('0x24d')](_0x41f4a6=>eval(_0x41f4a6));break;case _0x3c2538('0xec'):_0x40488c=_0x292f2d[_0x469f8e]!==''?JSON['parse'](_0x292f2d[_0x469f8e]):'';break;case'ARRAYJSON':_0x240691=_0x292f2d[_0x469f8e]!==''?JSON[_0x3c2538('0x35b')](_0x292f2d[_0x469f8e]):[],_0x40488c=_0x240691[_0x3c2538('0x24d')](_0x4f9622=>JSON[_0x3c2538('0x35b')](_0x4f9622));break;case _0x3c2538('0x230'):_0x40488c=_0x292f2d[_0x469f8e]!==''?new Function(JSON[_0x3c2538('0x35b')](_0x292f2d[_0x469f8e])):new Function('return\x200');break;case _0x3c2538('0x380'):_0x240691=_0x292f2d[_0x469f8e]!==''?JSON['parse'](_0x292f2d[_0x469f8e]):[],_0x40488c=_0x240691[_0x3c2538('0x24d')](_0x2d3ee5=>new Function(JSON[_0x3c2538('0x35b')](_0x2d3ee5)));break;case _0x3c2538('0x108'):_0x40488c=_0x292f2d[_0x469f8e]!==''?String(_0x292f2d[_0x469f8e]):'';break;case _0x3c2538('0x414'):_0x240691=_0x292f2d[_0x469f8e]!==''?JSON[_0x3c2538('0x35b')](_0x292f2d[_0x469f8e]):[],_0x40488c=_0x240691[_0x3c2538('0x24d')](_0x322d7e=>String(_0x322d7e));break;case _0x3c2538('0x1c7'):_0x2a2369=_0x292f2d[_0x469f8e]!==''?JSON['parse'](_0x292f2d[_0x469f8e]):{},_0x30e6cb[_0x46b39d]={},VisuMZ[_0x3c2538('0x186')](_0x30e6cb[_0x46b39d],_0x2a2369);continue;case _0x3c2538('0x2e3'):_0x240691=_0x292f2d[_0x469f8e]!==''?JSON[_0x3c2538('0x35b')](_0x292f2d[_0x469f8e]):[],_0x40488c=_0x240691[_0x3c2538('0x24d')](_0x35d5c2=>VisuMZ['ConvertParams']({},JSON[_0x3c2538('0x35b')](_0x35d5c2)));break;default:continue;}_0x30e6cb[_0x46b39d]=_0x40488c;}}}}return _0x30e6cb;},(_0x7c7065=>{const _0x551051=_0x4ca968,_0x19cb3d=_0x7c7065[_0x551051('0x25e')];for(const _0x2eaa62 of dependencies){if(!Imported[_0x2eaa62]){alert(_0x551051('0x25')[_0x551051('0x43e')](_0x19cb3d,_0x2eaa62)),SceneManager['exit']();break;}}const _0x376865=_0x7c7065['description'];if(_0x376865[_0x551051('0x1e5')](/\[Version[ ](.*?)\]/i)){if(_0x551051('0x1e9')==='bFYrR'){const _0x15f431=Number(RegExp['$1']);if(_0x15f431!==VisuMZ[label][_0x551051('0x30c')]){if('OaSlo'!==_0x551051('0x438'))alert(_0x551051('0x20d')[_0x551051('0x43e')](_0x19cb3d,_0x15f431)),SceneManager['exit']();else{function _0x4c5469(){const _0x3b5518=_0x551051;_0x45304b[_0x3b5518('0x283')][_0x3b5518('0x1e5')](/<PRICE:[ ](\d+)>/i)&&(_0x5077c6[_0x3b5518('0x110')]=_0x52b595(_0x2e9572['$1']));}}}}else{function _0x28992d(){const _0x2abfcd=_0x551051;return _0x111417[_0x2abfcd('0x27')][_0x2abfcd('0x15e')]();}}}if(_0x376865[_0x551051('0x1e5')](/\[Tier[ ](\d+)\]/i)){if(_0x551051('0x341')!==_0x551051('0x43')){const _0x1a74d2=Number(RegExp['$1']);_0x1a74d2<tier?(alert(_0x551051('0x3de')[_0x551051('0x43e')](_0x19cb3d,_0x1a74d2,tier)),SceneManager['exit']()):tier=Math[_0x551051('0x358')](_0x1a74d2,tier);}else{function _0x2b7bff(){const _0x3747ea=_0x551051,_0x23b14d=_0x4fbdc8[_0x3747ea('0x2fd')](this);_0x23b14d[_0x3747ea('0x21b')]=!![],_0x53eae4[_0x3747ea('0x40c')][_0x3747ea('0x29b')][_0x3747ea('0x38f')](this,_0x3f7f56),this[_0x3747ea('0x32e')](_0x23b14d);}}}VisuMZ[_0x551051('0x186')](VisuMZ[label][_0x551051('0x3af')],_0x7c7065[_0x551051('0x3dc')]);})(pluginData),PluginManager[_0x4ca968('0x10a')](pluginData[_0x4ca968('0x25e')],_0x4ca968('0x78'),_0xf1f0b4=>{const _0x466b01=_0x4ca968;VisuMZ[_0x466b01('0x186')](_0xf1f0b4,_0xf1f0b4);const _0x3d9525=[],_0x2c9aa4=_0xf1f0b4[_0x466b01('0x2e6')]['map'](_0x36fcd7=>_0x36fcd7[_0x466b01('0x434')]()[_0x466b01('0x3c3')]()),_0x24ec1d=_0xf1f0b4['Whitelist'][_0x466b01('0x24d')](_0x9b73bb=>_0x9b73bb[_0x466b01('0x434')]()['trim']()),_0x50a584=_0xf1f0b4['Step1End']>=_0xf1f0b4['Step1Start']?_0xf1f0b4[_0x466b01('0x281')]:_0xf1f0b4[_0x466b01('0x381')],_0x174666=_0xf1f0b4['Step1End']>=_0xf1f0b4[_0x466b01('0x281')]?_0xf1f0b4[_0x466b01('0x381')]:_0xf1f0b4[_0x466b01('0x281')],_0x1ed40e=Array(_0x174666-_0x50a584+0x1)[_0x466b01('0x61')]()[_0x466b01('0x24d')]((_0x56d5bd,_0x3a44ae)=>_0x50a584+_0x3a44ae);for(const _0x2af791 of _0x1ed40e){const _0x4d857a=$dataItems[_0x2af791];if(!_0x4d857a)continue;if(!VisuMZ[_0x466b01('0x40c')][_0x466b01('0x1f3')](_0x4d857a,_0x2c9aa4,_0x24ec1d))continue;_0x3d9525[_0x466b01('0x2c8')]([0x0,_0x2af791,0x0,_0x4d857a[_0x466b01('0x110')]]);}const _0x4d5ef6=_0xf1f0b4['Step2End']>=_0xf1f0b4[_0x466b01('0x2e9')]?_0xf1f0b4[_0x466b01('0x2e9')]:_0xf1f0b4['Step2End'],_0x3fd70a=_0xf1f0b4['Step2End']>=_0xf1f0b4[_0x466b01('0x2e9')]?_0xf1f0b4[_0x466b01('0x2b2')]:_0xf1f0b4[_0x466b01('0x2e9')],_0x4db574=Array(_0x3fd70a-_0x4d5ef6+0x1)['fill']()[_0x466b01('0x24d')]((_0x27ed36,_0x289ec3)=>_0x4d5ef6+_0x289ec3);for(const _0x10af15 of _0x4db574){if(_0x466b01('0x6c')===_0x466b01('0x6c')){const _0x3a8b8c=$dataWeapons[_0x10af15];if(!_0x3a8b8c)continue;if(!VisuMZ[_0x466b01('0x40c')][_0x466b01('0x1f3')](_0x3a8b8c,_0x2c9aa4,_0x24ec1d))continue;_0x3d9525['push']([0x1,_0x10af15,0x0,_0x3a8b8c['price']]);}else{function _0x9d6c74(){const _0x3b2025=_0x466b01,_0x1bcf52=_0x1a4f30(_0x1b92f2['$1']);_0x1bcf52!==_0x1a0092[_0x32101f][_0x3b2025('0x30c')]&&(_0x3830a3(_0x3b2025('0x20d')[_0x3b2025('0x43e')](_0x1ff9c4,_0x1bcf52)),_0x309d41['exit']());}}}const _0x136dc1=_0xf1f0b4['Step3End']>=_0xf1f0b4[_0x466b01('0x1b7')]?_0xf1f0b4[_0x466b01('0x1b7')]:_0xf1f0b4['Step3End'],_0x35b6ef=_0xf1f0b4[_0x466b01('0x272')]>=_0xf1f0b4[_0x466b01('0x1b7')]?_0xf1f0b4[_0x466b01('0x272')]:_0xf1f0b4['Step3Start'],_0xfca345=Array(_0x35b6ef-_0x136dc1+0x1)[_0x466b01('0x61')]()[_0x466b01('0x24d')]((_0x2a6f7b,_0x18cc40)=>_0x136dc1+_0x18cc40);for(const _0x508afb of _0xfca345){if(_0x466b01('0x16d')===_0x466b01('0x208')){function _0x1ecc79(){const _0x2fc935=_0x466b01;this['updateMoneyAmount'](),_0x44603e[_0x2fc935('0x40c')]['Window_ShopBuy_refresh'][_0x2fc935('0x38f')](this);}}else{const _0xd9f20b=$dataArmors[_0x508afb];if(!_0xd9f20b)continue;if(!VisuMZ[_0x466b01('0x40c')][_0x466b01('0x1f3')](_0xd9f20b,_0x2c9aa4,_0x24ec1d))continue;_0x3d9525[_0x466b01('0x2c8')]([0x2,_0x508afb,0x0,_0xd9f20b[_0x466b01('0x110')]]);}}SceneManager['push'](Scene_Shop),SceneManager['prepareNextScene'](_0x3d9525,_0xf1f0b4[_0x466b01('0x25f')]);}),VisuMZ[_0x4ca968('0x40c')]['IncludeShopItem']=function(_0x4c3684,_0x28f66d,_0x27f47c){const _0x49257d=_0x4ca968;if(_0x4c3684[_0x49257d('0x25e')]['trim']()==='')return![];if(_0x4c3684['name'][_0x49257d('0x1e5')](/-----/i))return![];const _0xbb6737=_0x4c3684[_0x49257d('0x268')];if(_0x28f66d['length']>0x0)for(const _0x5d9dd8 of _0x28f66d){if(!_0x5d9dd8)continue;if(_0xbb6737[_0x49257d('0x16c')](_0x5d9dd8))return![];}if(_0x27f47c[_0x49257d('0x1fe')]>0x0){for(const _0x1483e2 of _0x27f47c){if(!_0x1483e2)continue;if(_0xbb6737['includes'](_0x1483e2))return!![];}return![];}return!![];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x194')]=Scene_Boot[_0x4ca968('0x27')][_0x4ca968('0x346')],Scene_Boot['prototype'][_0x4ca968('0x346')]=function(){const _0x259ec8=_0x4ca968;VisuMZ[_0x259ec8('0x40c')][_0x259ec8('0x194')][_0x259ec8('0x38f')](this),this[_0x259ec8('0x16f')](),this[_0x259ec8('0x2b4')]();},Scene_Boot[_0x4ca968('0x27')][_0x4ca968('0x16f')]=function(){const _0x2fc802=_0x4ca968;VisuMZ['ItemsEquipsCore']['RegExp']={},VisuMZ[_0x2fc802('0x40c')][_0x2fc802('0x120')]['EquipParams']=[],VisuMZ[_0x2fc802('0x40c')][_0x2fc802('0x120')][_0x2fc802('0x31d')]=[];const _0x3a1541=['MaxHP',_0x2fc802('0x8f'),_0x2fc802('0x19'),_0x2fc802('0x36f'),_0x2fc802('0x365'),_0x2fc802('0x280'),_0x2fc802('0x12d'),_0x2fc802('0x152')];for(const _0x8ab490 of _0x3a1541){if(_0x2fc802('0x3e')===_0x2fc802('0x3e')){const _0x4744f8=_0x2fc802('0x4e')['format'](_0x8ab490);VisuMZ[_0x2fc802('0x40c')]['RegExp']['EquipParams'][_0x2fc802('0x2c8')](new RegExp(_0x4744f8,'i'));const _0x9e44af=_0x2fc802('0x284')[_0x2fc802('0x43e')](_0x8ab490);VisuMZ['ItemsEquipsCore']['RegExp'][_0x2fc802('0x31d')][_0x2fc802('0x2c8')](new RegExp(_0x9e44af,'g'));}else{function _0x41681c(){const _0xbdf9f1=_0x2fc802;_0x549df3[_0xbdf9f1('0x40c')][_0xbdf9f1('0x319')][_0xbdf9f1('0x38f')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['onBuyCancelItemsEquipsCore']();}}}},Scene_Boot[_0x4ca968('0x27')][_0x4ca968('0x2b4')]=function(){const _0x3903a1=_0x4ca968;this['process_VisuMZ_ItemsEquipsCore_EquipSlots']();const _0x3b12d0=[$dataItems,$dataWeapons,$dataArmors];for(const _0x4a6617 of _0x3b12d0){for(const _0x34c793 of _0x4a6617){if(_0x3903a1('0x145')===_0x3903a1('0x145')){if(!_0x34c793)continue;this[_0x3903a1('0xfb')](_0x34c793,_0x4a6617),this[_0x3903a1('0x200')](_0x34c793,_0x4a6617),this[_0x3903a1('0x2b')](_0x34c793,_0x4a6617),this[_0x3903a1('0xc0')](_0x34c793,_0x4a6617),this[_0x3903a1('0x1dd')](_0x34c793,_0x4a6617);}else{function _0x1b94b3(){const _0xc2419=this['getNextAvailableEtypeId'](_0x58faac);if(_0xc2419<0x0)return;const _0x27352d=_0x3b07b9===0x1?_0x39b20c[_0x1f639b]:_0x807a9f[_0x3c8d28];this['changeEquip'](_0xc2419,_0x27352d);}}}}},Scene_Boot[_0x4ca968('0x27')]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x3007cb=_0x4ca968;for(const _0x350aff of $dataClasses){if(_0x3007cb('0x40a')===_0x3007cb('0x40a')){if(!_0x350aff)continue;_0x350aff[_0x3007cb('0x254')]=[];if(_0x350aff['note'][_0x3007cb('0x1e5')](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if(_0x3007cb('0x16b')!=='tZxnP'){const _0x30f31c=String(RegExp['$1'])[_0x3007cb('0xa8')](/[\r\n]+/);for(const _0x9810cc of _0x30f31c){if(_0x3007cb('0x173')!==_0x3007cb('0x173')){function _0x3e7b0a(){const _0x1280cf=_0x3007cb;return this[_0x1280cf('0x244')]()?this[_0x1280cf('0x1e6')]():_0x497c08[_0x1280cf('0x40c')]['Scene_Shop_sellWindowRect'][_0x1280cf('0x38f')](this);}}else{const _0x5cc5a1=$dataSystem[_0x3007cb('0x285')]['indexOf'](_0x9810cc[_0x3007cb('0x3c3')]());if(_0x5cc5a1>0x0)_0x350aff[_0x3007cb('0x254')]['push'](_0x5cc5a1);}}}else{function _0x1fb8a5(){const _0x5832f9=_0x3007cb;return this[_0x5832f9('0x3eb')](_0x111382(_0x2aafda['$1'])[_0x5832f9('0x391')](0x0,0x1f));}}}else for(const _0x1b1c77 of $dataSystem[_0x3007cb('0x285')]){const _0x15b4cc=$dataSystem[_0x3007cb('0x285')][_0x3007cb('0x109')](_0x1b1c77['trim']());if(_0x15b4cc>0x0)_0x350aff[_0x3007cb('0x254')]['push'](_0x15b4cc);}}else{function _0x33c63d(){const _0x3b85e2=_0x3007cb;this[_0x3b85e2('0x221')]=!![],this['_shopStatusMenuAlly']=_0x40e8e9;}}}},Scene_Boot[_0x4ca968('0x27')][_0x4ca968('0xfb')]=function(_0x289c8b,_0x5c2895){const _0x24db11=_0x4ca968;_0x289c8b[_0x24db11('0x268')]=[];const _0x3b465e=_0x289c8b['note'],_0x38f9d8=_0x3b465e[_0x24db11('0x1e5')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x38f9d8){if(_0x24db11('0x1bb')!=='kVwkd'){function _0xe749e(){const _0x4a8ad9=_0x24db11;return!!_0x5c61a6&&_0x498218[_0x4a8ad9('0x239')]===_0x1c44fd(_0x27497e['$1']);}}else for(const _0x5e5161 of _0x38f9d8){if('wHtlT'===_0x24db11('0x1a5')){function _0x3dfb39(){const _0x27819b=_0x24db11,_0x38a617=this[_0x27819b('0x9e')](_0x56c744),_0x40f9fc=this[_0x27819b('0x143')](_0x34a292)[_0x27819b('0x30e')];return _0x40f9fc<=_0x38a617[_0x27819b('0x30e')]?'iconText':'icon';}}else{_0x5e5161[_0x24db11('0x1e5')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x32fc69=String(RegExp['$1'])[_0x24db11('0x434')]()[_0x24db11('0x3c3')]()[_0x24db11('0xa8')](',');for(const _0x34fd0c of _0x32fc69){if('GWrbx'==='OvCmM'){function _0x6dfe78(){_0x3aaf3f=_0x53c4fe+_0x1db02c-_0x1be217['width'];}}else _0x289c8b['categories'][_0x24db11('0x2c8')](_0x34fd0c[_0x24db11('0x3c3')]());}}}}if(_0x3b465e[_0x24db11('0x1e5')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x64a99a=RegExp['$1'][_0x24db11('0xa8')](/[\r\n]+/);for(const _0x38c850 of _0x64a99a){_0x289c8b[_0x24db11('0x268')][_0x24db11('0x2c8')](_0x38c850[_0x24db11('0x434')]()[_0x24db11('0x3c3')]());}}},Scene_Boot[_0x4ca968('0x27')][_0x4ca968('0x200')]=function(_0x171cd9,_0x261671){const _0x594ff2=_0x4ca968;if(_0x171cd9[_0x594ff2('0x283')]['match'](/<PRICE:[ ](\d+)>/i)){if(_0x594ff2('0x128')!==_0x594ff2('0x407'))_0x171cd9['price']=Number(RegExp['$1']);else{function _0x398925(){const _0x2332ca=_0x594ff2;_0xa86c20[_0x2332ca('0x40c')]['Settings'][_0x2332ca('0xc')]['DrawEquipData'][_0x2332ca('0x38f')](this);}}}},Scene_Boot[_0x4ca968('0x27')]['process_VisuMZ_ItemsEquipsCore_ParamValues']=function(_0x2e8f7b,_0x21a831){const _0x1628c7=_0x4ca968;if(_0x21a831===$dataItems)return;for(let _0x1427f5=0x0;_0x1427f5<0x8;_0x1427f5++){if(_0x1628c7('0x59')===_0x1628c7('0x242')){function _0x38a29c(){const _0x4e1bf3=_0x1628c7;_0x2e248a=_0x15ad1f[_0x4e1bf3('0x373')][_0x5521ff(_0x369fb3['$1'])]||'';}}else{const _0x2c375b=VisuMZ['ItemsEquipsCore'][_0x1628c7('0x120')][_0x1628c7('0x27a')][_0x1427f5];if(_0x2e8f7b[_0x1628c7('0x283')][_0x1628c7('0x1e5')](_0x2c375b)){if(_0x1628c7('0x379')!==_0x1628c7('0x379')){function _0x10473c(){const _0x152f9a=_0x1628c7;return _0x14e4bb[_0x152f9a('0x40c')][_0x152f9a('0x3af')][_0x152f9a('0x23c')][_0x152f9a('0x2fb')];}}else _0x2e8f7b['params'][_0x1427f5]=parseInt(RegExp['$1']);}}}},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x403')]={},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_ParamJS']=function(_0x9c5cb8,_0x370ce1){const _0x2bbb82=_0x4ca968;if(_0x370ce1===$dataItems)return;if(_0x9c5cb8[_0x2bbb82('0x283')]['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if(_0x2bbb82('0xd2')===_0x2bbb82('0x35')){function _0x16f33f(){const _0x2bf820=_0x2bbb82,_0x57ce87=_0x384a86(_0x312d6c['$1'])[_0x2bf820('0x434')]()[_0x2bf820('0x3c3')](),_0x49f005=_0x38d30e(_0x46d278['$2'])[_0x2bf820('0x3c3')]();this[_0x2bf820('0xf')][_0x57ce87]=_0x49f005;}}else{const _0x285a22=String(RegExp['$1']),_0xdc03b5=(_0x370ce1===$dataWeapons?_0x2bbb82('0x3ba'):'A%1')[_0x2bbb82('0x43e')](_0x9c5cb8['id']),_0x4e5f96=_0x2bbb82('0x1c1')[_0x2bbb82('0x43e')](_0x285a22);for(let _0x294d6a=0x0;_0x294d6a<0x8;_0x294d6a++){if(_0x285a22[_0x2bbb82('0x1e5')](VisuMZ[_0x2bbb82('0x40c')]['RegExp']['BorderRegExp'][_0x294d6a])){if('vhewS'!=='vhewS'){function _0x589e6e(){return'#'+_0x258b05(_0x30dd3c['$1']);}}else{const _0x519037=_0x2bbb82('0x3ae')['format'](_0xdc03b5,_0x294d6a);VisuMZ[_0x2bbb82('0x40c')][_0x2bbb82('0x403')][_0x519037]=new Function(_0x2bbb82('0x2b5'),_0x2bbb82('0x42f'),_0x4e5f96);}}}}}},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x3a5')]={},Scene_Boot[_0x4ca968('0x27')][_0x4ca968('0x1dd')]=function(_0x2ff90c,_0xe5106c){const _0x2ac9ca=_0x4ca968;if(_0xe5106c!==$dataItems)return;if(_0x2ff90c[_0x2ac9ca('0x283')][_0x2ac9ca('0x1e5')](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x2c5ad7=String(RegExp['$1']),_0x5ba93a=_0x2ac9ca('0x18c')[_0x2ac9ca('0x43e')](_0x2c5ad7);VisuMZ['ItemsEquipsCore'][_0x2ac9ca('0x3a5')][_0x2ff90c['id']]=new Function(_0x2ac9ca('0x2b5'),_0x5ba93a);}},DataManager[_0x4ca968('0x308')]=function(_0x2d3de8){const _0x37f031=_0x4ca968;return this[_0x37f031('0x1d7')](_0x2d3de8)&&_0x2d3de8[_0x37f031('0x2a6')]===0x2;},DataManager[_0x4ca968('0xea')]=function(_0x15c68e){const _0x45b4ea=_0x4ca968;if(!_0x15c68e)return 0x63;else return _0x15c68e[_0x45b4ea('0x283')][_0x45b4ea('0x1e5')](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this['defaultItemMax'](_0x15c68e);},DataManager[_0x4ca968('0xb6')]=function(_0x165243){const _0x4a4615=_0x4ca968;if(this[_0x4a4615('0x1d7')](_0x165243))return VisuMZ[_0x4a4615('0x40c')][_0x4a4615('0x3af')][_0x4a4615('0x23c')][_0x4a4615('0x3cc')];else{if(this[_0x4a4615('0xd3')](_0x165243)){if('jIXza'===_0x4a4615('0x1ab')){function _0x18a3e2(){const _0x32e83e=_0x4a4615;this[_0x32e83e('0x1c9')][_0x32e83e('0x2df')](0x0),this[_0x32e83e('0x2ab')]();}}else return VisuMZ[_0x4a4615('0x40c')][_0x4a4615('0x3af')]['ItemScene'][_0x4a4615('0x255')];}else{if(this[_0x4a4615('0x19d')](_0x165243)){if(_0x4a4615('0x39c')!==_0x4a4615('0x39c')){function _0x235852(){const _0x4463a7=_0x4a4615;return _0x501911[_0x4463a7('0x31b')](_0x4463a7('0xf7'),_0x4463a7('0x3ec'));}}else return VisuMZ['ItemsEquipsCore'][_0x4a4615('0x3af')][_0x4a4615('0x23c')][_0x4a4615('0x329')];}}}},ColorManager[_0x4ca968('0x183')]=function(_0x38b166){const _0x1e74e8=_0x4ca968;if(!_0x38b166){if(_0x1e74e8('0x289')==='NWDGN')return this[_0x1e74e8('0x2e0')]();else{function _0x4e5d19(){const _0x3fecc1=_0x1e74e8;this[_0x3fecc1('0x134')](!![]);}}}else{if(_0x38b166[_0x1e74e8('0x283')][_0x1e74e8('0x1e5')](/<COLOR:[ ](\d+)>/i))return this[_0x1e74e8('0x3eb')](Number(RegExp['$1'])[_0x1e74e8('0x391')](0x0,0x1f));else{if(_0x38b166[_0x1e74e8('0x283')]['match'](/<COLOR:[ ]#(.*)>/i)){if('EBRXf'==='UStbq'){function _0x2a439b(){const _0x36ed7d=_0x1e74e8;this[_0x36ed7d('0xca')][_0x36ed7d('0x413')]=this[_0x36ed7d('0x257')][_0x36ed7d('0x72')],_0x5f4fc5=!![];}}else return'#'+String(RegExp['$1']);}else return this['normalColor']();}}},ColorManager[_0x4ca968('0x3c7')]=function(_0x2c2d36){const _0x292243=_0x4ca968;if(_0x2c2d36[_0x292243('0x1e5')](/#(.*)/i)){if(_0x292243('0x21c')===_0x292243('0x3f6')){function _0x571877(){const _0x17a3ca=_0x292243;return this[_0x17a3ca('0x11c')]();}}else return'#%1'[_0x292243('0x43e')](String(RegExp['$1']));}else return this[_0x292243('0x3eb')](Number(_0x2c2d36));},Game_Temp['prototype'][_0x4ca968('0x324')]=function(){const _0x2e651b=_0x4ca968;if(this['_bypassNewLabel'])return![];return VisuMZ[_0x2e651b('0x40c')][_0x2e651b('0x3af')][_0x2e651b('0x1f9')][_0x2e651b('0x73')];},VisuMZ['ShopMenuStatusStandard']=VisuMZ['ItemsEquipsCore'][_0x4ca968('0x3af')][_0x4ca968('0xc')][_0x4ca968('0x247')],VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x22b')]=Game_BattlerBase[_0x4ca968('0x27')]['param'],Game_BattlerBase[_0x4ca968('0x27')][_0x4ca968('0x2f')]=function(_0x227c29){const _0x3778e1=_0x4ca968;return this[_0x3778e1('0x221')]?this[_0x3778e1('0x41d')]?VisuMZ[_0x3778e1('0x197')]:0x1:VisuMZ[_0x3778e1('0x40c')][_0x3778e1('0x22b')][_0x3778e1('0x38f')](this,_0x227c29);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x37f')]=Game_BattlerBase[_0x4ca968('0x27')][_0x4ca968('0x42')],Game_BattlerBase[_0x4ca968('0x27')]['meetsItemConditions']=function(_0x323f6a){const _0x4375d1=_0x4ca968;if(!_0x323f6a)return![];if(!VisuMZ[_0x4375d1('0x40c')][_0x4375d1('0x37f')]['call'](this,_0x323f6a))return![];if(!this[_0x4375d1('0x184')](_0x323f6a))return![];if(!this['meetsItemConditionsJS'](_0x323f6a))return![];return!![];},Game_BattlerBase[_0x4ca968('0x27')][_0x4ca968('0x184')]=function(_0x369897){const _0xcd97e3=_0x4ca968;if(!this[_0xcd97e3('0x26a')](_0x369897))return![];return!![];},Game_BattlerBase['prototype'][_0x4ca968('0x26a')]=function(_0x429da4){const _0x1c8be1=_0x4ca968,_0x54902a=_0x429da4['note'];if(_0x54902a[_0x1c8be1('0x1e5')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ca1c8=JSON[_0x1c8be1('0x35b')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x26199a of _0x3ca1c8){if(!$gameSwitches[_0x1c8be1('0x4')](_0x26199a))return![];}return!![];}if(_0x54902a['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c8be1('0x24e')===_0x1c8be1('0x3e3')){function _0x2b1d18(){const _0x17afd3=_0x1c8be1;return this[_0x17afd3('0x1e6')]();}}else{const _0x529937=JSON[_0x1c8be1('0x35b')]('['+RegExp['$1'][_0x1c8be1('0x1e5')](/\d+/g)+']');for(const _0x3b41dc of _0x529937){if(!$gameSwitches['value'](_0x3b41dc))return![];}return!![];}}if(_0x54902a[_0x1c8be1('0x1e5')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('Dqnwg'!==_0x1c8be1('0x393')){const _0x3b880d=JSON[_0x1c8be1('0x35b')]('['+RegExp['$1'][_0x1c8be1('0x1e5')](/\d+/g)+']');for(const _0xf1662 of _0x3b880d){if('yVoem'===_0x1c8be1('0x331')){function _0x1b7e5b(){const _0x408eb2=_0x1c8be1;if(!_0x589ef3)return 0x0;const _0x3bda69=_0x2e34a3['ItemsEquipsCore'][_0x408eb2('0x91')][_0x408eb2('0x38f')](this,_0x466012);return this['modifiedBuyPriceItemsEquipsCore'](_0x189585,_0x3bda69);}}else{if($gameSwitches['value'](_0xf1662))return!![];}}return![];}else{function _0xb84d01(){const _0x19d567=_0x1c8be1;return _0x2232c5[_0x19d567('0x40c')][_0x19d567('0x3af')][_0x19d567('0x112')][_0x19d567('0x38e')];}}}if(_0x54902a[_0x1c8be1('0x1e5')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c8be1('0x3d')!==_0x1c8be1('0x2ea')){const _0x1cb5b5=JSON['parse']('['+RegExp['$1'][_0x1c8be1('0x1e5')](/\d+/g)+']');for(const _0x3a7369 of _0x1cb5b5){if(!$gameSwitches[_0x1c8be1('0x4')](_0x3a7369))return!![];}return![];}else{function _0x200912(){const _0x567151=_0x1c8be1;this[_0x567151('0x435')](_0x86ac18[_0x567151('0x397')](_0x567151('0x3a4')));}}}if(_0x54902a[_0x1c8be1('0x1e5')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c8be1('0x188')!==_0x1c8be1('0x1db')){const _0x2c3f02=JSON[_0x1c8be1('0x35b')]('['+RegExp['$1'][_0x1c8be1('0x1e5')](/\d+/g)+']');for(const _0x4363ed of _0x2c3f02){if(!$gameSwitches[_0x1c8be1('0x4')](_0x4363ed))return!![];}return![];}else{function _0x26c9ac(){const _0x3c3a40=_0x1c8be1;_0x3619a5[_0x3c3a40('0x397')]()&&this[_0x3c3a40('0x3ad')](!![]);if(_0x2a210a[_0x3c3a40('0x353')]())this[_0x3c3a40('0x88')]();else _0x131eda[_0x3c3a40('0x1bf')]()&&this['onTouchCancel']();}}}if(_0x54902a['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c8be1('0x19c')!==_0x1c8be1('0x19c')){function _0x3cff29(){const _0x237139=_0x1c8be1;this[_0x237139('0x190')][_0x237139('0x38b')]()>=0x0?(_0x3ff9f6[_0x237139('0x40c')]['Scene_Equip_onSlotOk']['call'](this),this[_0x237139('0x38a')]()):(this[_0x237139('0x190')][_0x237139('0x2df')](0x0),this[_0x237139('0x190')][_0x237139('0x1be')]());}}else{const _0x2bf695=JSON[_0x1c8be1('0x35b')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x132cc9 of _0x2bf695){if(_0x1c8be1('0x388')!==_0x1c8be1('0x388')){function _0x45ec7b(){const _0x792031=_0x1c8be1;return _0x483c26[_0x792031('0x40c')]['Settings'][_0x792031('0xc')][_0x792031('0x2c7')];}}else{if($gameSwitches[_0x1c8be1('0x4')](_0x132cc9))return![];}}return!![];}}return!![];},Game_BattlerBase[_0x4ca968('0x27')]['meetsItemConditionsJS']=function(_0x1b1707){const _0x384a66=_0x4ca968,_0x1a2bd3=_0x1b1707[_0x384a66('0x283')],_0x5ae522=VisuMZ['ItemsEquipsCore'][_0x384a66('0x3a5')];if(_0x5ae522[_0x1b1707['id']]){if(_0x384a66('0x2a0')===_0x384a66('0x79')){function _0x1a3694(){const _0xaa07a2=_0x384a66;_0x18e341=_0xaa07a2('0xd1')[_0xaa07a2('0x43e')](_0x1bcea0['id']);}}else return _0x5ae522[_0x1b1707['id']]['call'](this,_0x1b1707);}else{if(_0x384a66('0x83')===_0x384a66('0x162')){function _0x337737(){const _0x43d0f2=_0x384a66;return this[_0x43d0f2('0x2f9')]()[_0x43d0f2('0x16c')](this[_0x43d0f2('0x254')]()[_0x4f0b60])?![]:this[_0x43d0f2('0xdf')](_0x1b8e55);}}else return!![];}},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x3fe')]=function(_0x5d6359){const _0x256b9f=_0x4ca968;_0x5d6359=this['convertInitEquipsToItems'](_0x5d6359);const _0x422d9a=this[_0x256b9f('0x254')]();this[_0x256b9f('0x132')]=[];for(let _0x1be269=0x0;_0x1be269<_0x422d9a[_0x256b9f('0x1fe')];_0x1be269++){this[_0x256b9f('0x132')][_0x1be269]=new Game_Item();}for(let _0x43e708=0x0;_0x43e708<_0x422d9a['length'];_0x43e708++){const _0x2c2231=_0x422d9a[_0x43e708],_0xa83275=this[_0x256b9f('0x14d')](_0x5d6359,_0x2c2231);if(this[_0x256b9f('0x1b3')](_0xa83275))this[_0x256b9f('0x132')][_0x43e708][_0x256b9f('0x33e')](_0xa83275);}this['releaseUnequippableItems'](!![]),this['refresh']();},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x14')]=function(_0x43ef74){const _0x444a5a=_0x4ca968,_0x14299f=[];for(let _0x2c04b3=0x0;_0x2c04b3<_0x43ef74['length'];_0x2c04b3++){const _0x6761d3=_0x43ef74[_0x2c04b3];if(_0x6761d3<=0x0)continue;const _0x5dc1ee=$dataSystem[_0x444a5a('0x285')][_0x2c04b3+0x1];if(_0x5dc1ee===$dataSystem[_0x444a5a('0x285')][0x1]||_0x2c04b3===0x1&&this[_0x444a5a('0x1b9')]()){if(_0x444a5a('0xb4')!==_0x444a5a('0xb4')){function _0x2286bb(){const _0x19ab72=_0x444a5a;return _0x48154d[_0x19ab72('0x40c')][_0x19ab72('0x3af')]['EquipScene'][_0x19ab72('0x2ca')];}}else _0x14299f[_0x444a5a('0x2c8')]($dataWeapons[_0x6761d3]);}else _0x14299f[_0x444a5a('0x2c8')]($dataArmors[_0x6761d3]);}return _0x14299f;},Game_Actor[_0x4ca968('0x27')]['getMatchingInitEquip']=function(_0x241774,_0x313c77){const _0x299496=_0x4ca968;for(const _0x4a8d35 of _0x241774){if(!_0x4a8d35)continue;if(_0x4a8d35[_0x299496('0x239')]===_0x313c77){if(_0x299496('0x3e5')===_0x299496('0x3ef')){function _0x1ea5cb(){const _0x1ef02f=_0x299496;this[_0x1ef02f('0x408')]();}}else return _0x241774['splice'](_0x241774[_0x299496('0x109')](_0x4a8d35),0x1),_0x4a8d35;}}return null;},Game_Actor['prototype'][_0x4ca968('0x254')]=function(){const _0x3a1e88=_0x4ca968,_0x9a3aa1=JsonEx['makeDeepCopy'](this['currentClass']()[_0x3a1e88('0x254')]);if(_0x9a3aa1['length']>=0x2&&this['isDualWield']())_0x9a3aa1[0x1]=0x1;return _0x9a3aa1;},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0xe1')]=function(){const _0x56cad4=_0x4ca968,_0x9d2ede=this[_0x56cad4('0x254')]();for(let _0x382c14=0x0;_0x382c14<_0x9d2ede[_0x56cad4('0x1fe')];_0x382c14++){if(_0x56cad4('0x374')!==_0x56cad4('0x348')){if(!this[_0x56cad4('0x132')][_0x382c14])this[_0x56cad4('0x132')][_0x382c14]=new Game_Item();}else{function _0x497be6(){const _0x3a6203=_0x56cad4;_0x3654c4['ItemsEquipsCore'][_0x3a6203('0x2ec')][_0x3a6203('0x38f')](this),this[_0x3a6203('0x2ac')]&&this[_0x3a6203('0x2ac')][_0x3a6203('0x4b')]===_0x1415ad&&this[_0x3a6203('0x2ac')][_0x3a6203('0x383')](this['item']());}}}this[_0x56cad4('0x214')](![]),this[_0x56cad4('0x42d')]();},VisuMZ[_0x4ca968('0x40c')]['Game_Actor_changeEquip']=Game_Actor[_0x4ca968('0x27')]['changeEquip'],Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x85')]=function(_0x92b100,_0x40c369){const _0x5e41c5=_0x4ca968;if(this['_tempActor']){const _0x14976e=JsonEx[_0x5e41c5('0x2fd')](this);_0x14976e[_0x5e41c5('0x21b')]=!![],VisuMZ[_0x5e41c5('0x40c')][_0x5e41c5('0x8c')]['call'](this,_0x92b100,_0x40c369),this[_0x5e41c5('0x32e')](_0x14976e);}else VisuMZ[_0x5e41c5('0x40c')]['Game_Actor_changeEquip'][_0x5e41c5('0x38f')](this,_0x92b100,_0x40c369);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x27d')]=Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x1df')],Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x1df')]=function(_0x3e9f67,_0x5c246d){const _0x4e1bb0=_0x4ca968;if(this['_tempActor']){const _0x2da43d=JsonEx[_0x4e1bb0('0x2fd')](this);_0x2da43d[_0x4e1bb0('0x21b')]=!![],VisuMZ['ItemsEquipsCore'][_0x4e1bb0('0x27d')][_0x4e1bb0('0x38f')](this,_0x3e9f67,_0x5c246d),this[_0x4e1bb0('0x32e')](_0x2da43d);}else VisuMZ[_0x4e1bb0('0x40c')][_0x4e1bb0('0x27d')]['call'](this,_0x3e9f67,_0x5c246d);},VisuMZ[_0x4ca968('0x40c')]['Game_Actor_discardEquip']=Game_Actor[_0x4ca968('0x27')]['discardEquip'],Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x41f')]=function(_0x5ce12c){const _0x19a4cb=_0x4ca968;if(!this[_0x19a4cb('0x21b')]){const _0x47f476=JsonEx['makeDeepCopy'](this);_0x47f476[_0x19a4cb('0x21b')]=!![],VisuMZ[_0x19a4cb('0x40c')][_0x19a4cb('0x29b')][_0x19a4cb('0x38f')](this,_0x5ce12c),this[_0x19a4cb('0x32e')](_0x47f476);}else{if(_0x19a4cb('0x3a')!==_0x19a4cb('0x3a')){function _0xd01a3c(){const _0x41f823=_0x19a4cb,_0x311123=_0xe1278a(_0x1ef50e['$1']),_0x448eee=(_0x134793===_0x252f08?_0x41f823('0x3ba'):_0x41f823('0x364'))[_0x41f823('0x43e')](_0x1ce427['id']),_0x336cc8=_0x41f823('0x1c1')['format'](_0x311123);for(let _0x55e6cb=0x0;_0x55e6cb<0x8;_0x55e6cb++){if(_0x311123[_0x41f823('0x1e5')](_0x447af3['ItemsEquipsCore']['RegExp'][_0x41f823('0x31d')][_0x55e6cb])){const _0x26e099=_0x41f823('0x3ae')[_0x41f823('0x43e')](_0x448eee,_0x55e6cb);_0x21c3b3[_0x41f823('0x40c')][_0x41f823('0x403')][_0x26e099]=new _0x3db631(_0x41f823('0x2b5'),_0x41f823('0x42f'),_0x336cc8);}}}}else VisuMZ['ItemsEquipsCore'][_0x19a4cb('0x29b')]['call'](this,_0x5ce12c);}},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x214')]=function(_0xd92370){const _0x3f26e5=_0x4ca968;for(;;){if('jQpuT'===_0x3f26e5('0x3f5')){function _0x3f6bde(){const _0x4b56a5=_0x3f26e5;this[_0x4b56a5('0x1d6')](_0x949dd5[_0x4b56a5('0x249')]()),this[_0x4b56a5('0x2c5')](_0x439fed[_0x4b56a5('0x2f')](_0x1cc027),_0x4aaf50,_0x5cc06a,_0x25adbb);}}else{const _0x5ac0b9=this[_0x3f26e5('0x254')](),_0x5b9b39=this[_0x3f26e5('0x38c')]();let _0xe45b35=![];for(let _0xa4351c=0x0;_0xa4351c<_0x5b9b39['length'];_0xa4351c++){const _0x4e839b=_0x5b9b39[_0xa4351c];if(_0x4e839b&&(!this[_0x3f26e5('0x1b3')](_0x4e839b)||_0x4e839b['etypeId']!==_0x5ac0b9[_0xa4351c])){if(_0x3f26e5('0x2db')===_0x3f26e5('0x20e')){function _0xd07a1c(){const _0x50a877=_0x3f26e5,_0x434888=_0x54358a['x']+_0x12768b[_0x50a877('0x3f3')]((_0x172d43[_0x50a877('0x30e')]-_0x408c5f)/0x2);this[_0x50a877('0x148')](_0x4ecf60,_0x434888,_0x28bf76['y'],_0x1cd2fb);}}else{if(!_0xd92370){if(_0x3f26e5('0xa1')!==_0x3f26e5('0x160'))this['tradeItemWithParty'](null,_0x4e839b);else{function _0x5a8a62(){const _0x35a103=_0x3f26e5;return this[_0x35a103('0x89')]();}}}if(!this[_0x3f26e5('0x21b')]){if(_0x3f26e5('0x1af')===_0x3f26e5('0x1af')){const _0x487c96=JsonEx[_0x3f26e5('0x2fd')](this);_0x487c96['_tempActor']=!![],this[_0x3f26e5('0x132')][_0xa4351c][_0x3f26e5('0x33e')](null),this[_0x3f26e5('0x32e')](_0x487c96);}else{function _0xd93349(){const _0x10d83c=_0x3f26e5;_0xca9c83[_0x10d83c('0x410')]=this[_0x10d83c('0x66')];}}}else{if(_0x3f26e5('0x195')==='zGKKn')this['_equips'][_0xa4351c][_0x3f26e5('0x33e')](null);else{function _0x480188(){const _0xfd626c=_0x3f26e5;return _0x57bb83[_0xfd626c('0x98')]['constructor']===_0xc5ce37?_0x325de4[_0xfd626c('0x98')][_0xfd626c('0xd')]>0x0:!![];}}}_0xe45b35=!![];}}}if(!_0xe45b35){if(_0x3f26e5('0x2cb')==='HSAST'){function _0x12c13b(){const _0x5c4214=_0x3f26e5;if(_0x33c1b8[_0x5c4214('0x24f')]&&_0x301ac2[_0x5c4214('0x3e1')]!==_0x3fd82a)return _0x5dddc1['uiHelpPosition'];else{if(this[_0x5c4214('0x244')]())return this[_0x5c4214('0x264')]()[_0x5c4214('0x1e5')](/LOWER/i);else _0x411dbe[_0x5c4214('0x27')][_0x5c4214('0x2a1')][_0x5c4214('0x38f')](this);}}}else break;}}}},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x32e')]=function(_0x32b499){const _0x569a35=_0x4ca968;if(this[_0x569a35('0x21b')])return;if(!VisuMZ['ItemsEquipsCore'][_0x569a35('0x3af')]['EquipScene'][_0x569a35('0x3b8')])return;const _0x238c2e=Math['round'](_0x32b499[_0x569a35('0x28c')]()*this[_0x569a35('0x2ce')]),_0x5a686b=Math[_0x569a35('0x2f7')](_0x32b499[_0x569a35('0x6e')]()*this[_0x569a35('0x2dc')]);if(this['hp']>0x0)this[_0x569a35('0x1d8')](_0x238c2e);if(this['mp']>0x0)this[_0x569a35('0x394')](_0x5a686b);},Game_Actor['prototype'][_0x4ca968('0xbe')]=function(){const _0x4cd832=_0x4ca968,_0x5c3f0c=this[_0x4cd832('0x254')]()['length'];for(let _0x4c7f54=0x0;_0x4c7f54<_0x5c3f0c;_0x4c7f54++){if(_0x4cd832('0x327')==='gYgfo'){function _0x4a0b0c(){const _0x5ca42b=_0x4cd832,_0x248628=_0x5ca42b('0x267');if(this['_customItemInfo'][_0x248628])return this['_customItemInfo'][_0x248628];const _0x14b1ce=_0x33cb5e[_0x5ca42b('0x40c')][_0x5ca42b('0x3af')][_0x5ca42b('0xc')],_0x95c177=_0x5ca42b('0x2d6')[_0x5ca42b('0x43e')](this['_item'][_0x5ca42b('0x181')]);return _0x14b1ce[_0x95c177];}}else{if(this[_0x4cd832('0x352')](_0x4c7f54))this[_0x4cd832('0x85')](_0x4c7f54,null);}}},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x352')]=function(_0x7e0c10){const _0x4e804b=_0x4ca968;if(this[_0x4e804b('0x2f9')]()[_0x4e804b('0x16c')](this[_0x4e804b('0x254')]()[_0x7e0c10]))return![];else{if('ujXCH'!==_0x4e804b('0x405')){function _0x3c2b8e(){const _0x148bc9=_0x4e804b;return _0x148bc9('0x27e');}}else return this[_0x4e804b('0xdf')](_0x7e0c10);}},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x2f9')]=function(){const _0x50fdc1=_0x4ca968;return VisuMZ['ItemsEquipsCore'][_0x50fdc1('0x3af')][_0x50fdc1('0x112')][_0x50fdc1('0x20b')];},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0xe2')]=function(){const _0x3d52cf=_0x4ca968,_0x3d91a4=this[_0x3d52cf('0x254')]()[_0x3d52cf('0x1fe')];for(let _0xd0ba2e=0x0;_0xd0ba2e<_0x3d91a4;_0xd0ba2e++){if(_0x3d52cf('0x1cd')!=='IDvQg'){function _0x1cec74(){const _0x132305=_0x3d52cf;return _0x57cf26[_0x132305('0x40c')][_0x132305('0x3af')][_0x132305('0xc')][_0x132305('0x337')];}}else{if(this['isOptimizeEquipOk'](_0xd0ba2e))this[_0x3d52cf('0x85')](_0xd0ba2e,null);}}for(let _0x465edc=0x0;_0x465edc<_0x3d91a4;_0x465edc++){if(this[_0x3d52cf('0x275')](_0x465edc))this[_0x3d52cf('0x85')](_0x465edc,this[_0x3d52cf('0x150')](_0x465edc));}},Game_Actor[_0x4ca968('0x27')]['isOptimizeEquipOk']=function(_0x34f776){const _0x4bd6c1=_0x4ca968;if(this[_0x4bd6c1('0xce')]()[_0x4bd6c1('0x16c')](this['equipSlots']()[_0x34f776])){if(_0x4bd6c1('0x2bd')!=='szfks')return![];else{function _0x3788ae(){const _0x35cc29=_0x4bd6c1;!this['processCursorSpecialCheckModernControls']()&&_0xac1ffd[_0x35cc29('0x27')][_0x35cc29('0x3e0')][_0x35cc29('0x38f')](this);}}}else return this[_0x4bd6c1('0xdf')](_0x34f776);},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0xce')]=function(){const _0x5d2333=_0x4ca968;return VisuMZ['ItemsEquipsCore'][_0x5d2333('0x3af')][_0x5d2333('0x112')][_0x5d2333('0xfa')];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x29')]=Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x26d')],Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x26d')]=function(_0x8eb299,_0x43cb52){const _0xe1fa38=_0x4ca968;$gameTemp[_0xe1fa38('0x15b')]=!![];const _0x1b4ca4=VisuMZ['ItemsEquipsCore'][_0xe1fa38('0x29')][_0xe1fa38('0x38f')](this,_0x8eb299,_0x43cb52);return $gameTemp[_0xe1fa38('0x15b')]=![],_0x1b4ca4;},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x12e')]=function(_0x6cd1bb,_0x1d1ef3){const _0x28067f=_0x4ca968,_0x3c0823=this[_0x28067f('0x16a')](_0x6cd1bb);if(_0x3c0823<0x0)return;const _0x4f7793=_0x6cd1bb===0x1?$dataWeapons[_0x1d1ef3]:$dataArmors[_0x1d1ef3];this[_0x28067f('0x85')](_0x3c0823,_0x4f7793);},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x16a')]=function(_0x266ad5){const _0x358ccd=_0x4ca968;let _0x5cb4d6=0x0;const _0xbb7190=this['equipSlots'](),_0x4c4bf3=this[_0x358ccd('0x38c')]();for(let _0x39525d=0x0;_0x39525d<_0xbb7190[_0x358ccd('0x1fe')];_0x39525d++){if(_0xbb7190[_0x39525d]===_0x266ad5){_0x5cb4d6=_0x39525d;if(!_0x4c4bf3[_0x39525d])return _0x5cb4d6;}}return _0x5cb4d6;},VisuMZ[_0x4ca968('0x40c')]['Game_Actor_paramPlus']=Game_Actor['prototype']['paramPlus'],Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x363')]=function(_0x577476){const _0x307dca=_0x4ca968;let _0x2730c5=VisuMZ[_0x307dca('0x40c')]['Game_Actor_paramPlus']['call'](this,_0x577476);for(const _0x174189 of this[_0x307dca('0x38c')]()){if(_0x174189)_0x2730c5+=this['paramPlusItemsEquipsCoreCustomJS'](_0x174189,_0x577476);}return _0x2730c5;},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0x7c')]=function(_0x2d6179,_0x5dcbfc){const _0xe4dfa5=_0x4ca968;if(this[_0xe4dfa5('0x241')])return 0x0;const _0x4d248c=(DataManager[_0xe4dfa5('0xd3')](_0x2d6179)?'W%1':'A%1')[_0xe4dfa5('0x43e')](_0x2d6179['id']),_0x218e88=_0xe4dfa5('0x3ae')[_0xe4dfa5('0x43e')](_0x4d248c,_0x5dcbfc);if(VisuMZ[_0xe4dfa5('0x40c')]['paramJS'][_0x218e88]){if(_0xe4dfa5('0x16')!==_0xe4dfa5('0x16')){function _0x4dba29(){const _0x157d43=_0xe4dfa5;if(_0x2a0ac4>=0x0)_0x15c416===this[_0x157d43('0x38b')]()&&(this['_doubleTouch']=!![]),this[_0x157d43('0x1be')](),this[_0x157d43('0x37')](_0x301897);else _0x51fca5[_0x157d43('0x2f5')]()>=0x0&&(this['deactivate'](),this[_0x157d43('0x3c')]());}}else{this['_calculatingJSParameters']=!![];const _0x257ac3=VisuMZ[_0xe4dfa5('0x40c')][_0xe4dfa5('0x403')][_0x218e88][_0xe4dfa5('0x38f')](this,_0x2d6179,_0x5dcbfc);return this['_calculatingJSParameters']=![],_0x257ac3;}}else return 0x0;},Game_Actor[_0x4ca968('0x27')][_0x4ca968('0xfc')]=function(_0x53b3c8){const _0x52e9d9=_0x4ca968;this[_0x52e9d9('0x221')]=!![],this[_0x52e9d9('0x41d')]=_0x53b3c8;},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x2a9')]=Game_Party[_0x4ca968('0x27')]['initialize'],Game_Party['prototype'][_0x4ca968('0x1f7')]=function(){const _0x341122=_0x4ca968;VisuMZ[_0x341122('0x40c')][_0x341122('0x2a9')][_0x341122('0x38f')](this),this[_0x341122('0x135')]();},Game_Party['prototype'][_0x4ca968('0x135')]=function(){this['_newItemsList']=[];},Game_Party[_0x4ca968('0x27')]['isNewItem']=function(_0x563d8e){const _0x3c8c4f=_0x4ca968;if(!$gameTemp[_0x3c8c4f('0x324')]())return![];if(this[_0x3c8c4f('0x14a')]===undefined)this[_0x3c8c4f('0x135')]();let _0x248765='';if(DataManager[_0x3c8c4f('0x1d7')](_0x563d8e))_0x248765=_0x3c8c4f('0x185')[_0x3c8c4f('0x43e')](_0x563d8e['id']);else{if(DataManager['isWeapon'](_0x563d8e)){if(_0x3c8c4f('0x3c8')===_0x3c8c4f('0x28e')){function _0x2e2b98(){const _0x4bdaaf=_0x3c8c4f;return this[_0x4bdaaf('0x244')]()?this[_0x4bdaaf('0x94')]():_0x368a73[_0x4bdaaf('0x40c')][_0x4bdaaf('0x3f8')]['call'](this);}}else _0x248765=_0x3c8c4f('0xd1')['format'](_0x563d8e['id']);}else{if(DataManager['isArmor'](_0x563d8e))_0x248765=_0x3c8c4f('0x164')['format'](_0x563d8e['id']);else return;}}return this[_0x3c8c4f('0x14a')][_0x3c8c4f('0x16c')](_0x248765);},Game_Party[_0x4ca968('0x27')][_0x4ca968('0x182')]=function(_0x5030df){const _0x2b29e7=_0x4ca968;if(!$gameTemp[_0x2b29e7('0x324')]())return;if(this[_0x2b29e7('0x14a')]===undefined)this['initNewItemsList']();let _0x235ec5='';if(DataManager[_0x2b29e7('0x1d7')](_0x5030df)){if(_0x2b29e7('0x26c')!==_0x2b29e7('0x1cc'))_0x235ec5=_0x2b29e7('0x185')[_0x2b29e7('0x43e')](_0x5030df['id']);else{function _0x32a2e3(){const _0x324c7a=_0x2b29e7;this[_0x324c7a('0x134')](![]);}}}else{if(DataManager['isWeapon'](_0x5030df)){if(_0x2b29e7('0x17d')===_0x2b29e7('0x17d'))_0x235ec5=_0x2b29e7('0xd1')['format'](_0x5030df['id']);else{function _0x4a8366(){const _0x158b6c=_0x2b29e7,_0x55beb1='ELEMENT';if(this[_0x158b6c('0xf')][_0x55beb1])return this['_customItemInfo'][_0x55beb1];if(this['_item'][_0x158b6c('0x31f')][_0x158b6c('0x1a6')]<=-0x1)return _0x216960[_0x158b6c('0x40c')]['Settings'][_0x158b6c('0xc')][_0x158b6c('0xc9')];else return this[_0x158b6c('0x257')][_0x158b6c('0x31f')]['elementId']===0x0?_0x3ede28[_0x158b6c('0x40c')][_0x158b6c('0x3af')][_0x158b6c('0xc')]['ElementNone']:_0xd3e4cb[_0x158b6c('0x5e')][this[_0x158b6c('0x257')]['damage']['elementId']];}}}else{if(DataManager['isArmor'](_0x5030df))_0x235ec5=_0x2b29e7('0x164')[_0x2b29e7('0x43e')](_0x5030df['id']);else return;}}if(!this[_0x2b29e7('0x14a')]['includes'](_0x235ec5))this[_0x2b29e7('0x14a')][_0x2b29e7('0x2c8')](_0x235ec5);},Game_Party[_0x4ca968('0x27')][_0x4ca968('0x371')]=function(_0x4ccb36){const _0x4bfae9=_0x4ca968;if(!$gameTemp[_0x4bfae9('0x324')]())return;if(this[_0x4bfae9('0x14a')]===undefined)this[_0x4bfae9('0x135')]();let _0x48454d='';if(DataManager[_0x4bfae9('0x1d7')](_0x4ccb36))_0x48454d=_0x4bfae9('0x185')[_0x4bfae9('0x43e')](_0x4ccb36['id']);else{if(DataManager[_0x4bfae9('0xd3')](_0x4ccb36))_0x48454d=_0x4bfae9('0xd1')[_0x4bfae9('0x43e')](_0x4ccb36['id']);else{if(DataManager['isArmor'](_0x4ccb36)){if(_0x4bfae9('0x310')===_0x4bfae9('0x310'))_0x48454d=_0x4bfae9('0x164')['format'](_0x4ccb36['id']);else{function _0x7d607d(){const _0x8f7960=_0x4bfae9,_0x4cfc22=this[_0x8f7960('0x36e')]();this['_statusWindow']=new _0x341f92(_0x4cfc22),this['addWindow'](this[_0x8f7960('0x2ac')]),this[_0x8f7960('0x1a2')][_0x8f7960('0x1a9')](this['_statusWindow']);}}}else return;}}if(this[_0x4bfae9('0x14a')][_0x4bfae9('0x16c')](_0x48454d)){if(_0x4bfae9('0x11')!==_0x4bfae9('0x11')){function _0x27019b(){const _0x4b78be=_0x4bfae9;if(!_0x2b6d56[_0x4b78be('0x4')](_0x437898))return![];}}else this[_0x4bfae9('0x14a')]['splice'](this[_0x4bfae9('0x14a')][_0x4bfae9('0x109')](_0x48454d),0x1);}},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x3c0')]=Game_Party[_0x4ca968('0x27')][_0x4ca968('0x1ee')],Game_Party[_0x4ca968('0x27')][_0x4ca968('0x1ee')]=function(_0x517fa0,_0x3bdf50,_0x1dd11e){const _0x18ea47=_0x4ca968,_0x3160d9=this[_0x18ea47('0x412')](_0x517fa0);VisuMZ['ItemsEquipsCore'][_0x18ea47('0x3c0')][_0x18ea47('0x38f')](this,_0x517fa0,_0x3bdf50,_0x1dd11e);if(this['numItems'](_0x517fa0)>_0x3160d9)this['setNewItem'](_0x517fa0);},Game_Party[_0x4ca968('0x27')]['maxItems']=function(_0x1c8b1f){const _0x18993e=_0x4ca968;return DataManager[_0x18993e('0xea')](_0x1c8b1f);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x17')]=Scene_ItemBase[_0x4ca968('0x27')][_0x4ca968('0x1fd')],Scene_ItemBase['prototype'][_0x4ca968('0x1fd')]=function(){const _0x4a0a9e=_0x4ca968;VisuMZ[_0x4a0a9e('0x40c')][_0x4a0a9e('0x17')]['call'](this),this[_0x4a0a9e('0x1a2')][_0x4a0a9e('0x33f')]();},Scene_Item[_0x4ca968('0x27')]['isBottomHelpMode']=function(){const _0x44d843=_0x4ca968;if(ConfigManager[_0x44d843('0x24f')]&&ConfigManager[_0x44d843('0x3e1')]!==undefined)return ConfigManager[_0x44d843('0x3e1')];else{if(this[_0x44d843('0x244')]()){if(_0x44d843('0x3b6')!==_0x44d843('0x3b6')){function _0x5b3feb(){const _0x43ab93=_0x44d843,_0x10eb44=_0x56eac9+(this['lineHeight']()-_0x1cef0c[_0x43ab93('0x1c0')])/0x2,_0x17c154=_0x4fab41[_0x43ab93('0x240')]+0x4,_0x36b580=_0x45fdcb['max'](0x0,_0x2e44dd-_0x17c154);this[_0x43ab93('0x1d6')](_0x272300['getItemColor'](_0x5a4edb)),this[_0x43ab93('0x298')](_0x361c1d[_0x43ab93('0xb0')],_0x5411c5,_0x10eb44),this['drawText'](_0x2f35da[_0x43ab93('0x25e')],_0x5c3f42+_0x17c154,_0x12edbc,_0x36b580),this['resetTextColor']();}}else return this['updatedLayoutStyle']()[_0x44d843('0x1e5')](/LOWER/i);}else Scene_ItemBase[_0x44d843('0x27')][_0x44d843('0x2a1')][_0x44d843('0x38f')](this);}},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x2a1')]=function(){const _0x4f4f36=_0x4ca968;if(ConfigManager[_0x4f4f36('0x24f')]&&ConfigManager[_0x4f4f36('0x3be')]!==undefined){if('fYSBB'!==_0x4f4f36('0x3f4')){function _0x42f93c(){const _0x3a27f7=_0x4f4f36;return this['_list']?this[_0x3a27f7('0x1ae')]():0x4;}}else return ConfigManager[_0x4f4f36('0x3be')];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x4f4f36('0x1e5')](/RIGHT/i);else Scene_ItemBase[_0x4f4f36('0x27')][_0x4f4f36('0x2a1')][_0x4f4f36('0x38f')](this);}},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x264')]=function(){const _0x1e0fd8=_0x4ca968;return VisuMZ[_0x1e0fd8('0x40c')]['Settings'][_0x1e0fd8('0x23c')][_0x1e0fd8('0x368')];},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0xb')]=function(){const _0x25cda7=_0x4ca968;return this[_0x25cda7('0x1c9')]&&this['_categoryWindow']['isUseModernControls']();},Scene_Item[_0x4ca968('0x27')]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x1dbb06=_0x4ca968;return VisuMZ[_0x1dbb06('0x40c')]['Settings'][_0x1dbb06('0x23c')][_0x1dbb06('0x171')];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x6a')]=Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x5a')],Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x5a')]=function(){const _0x1bf9ac=_0x4ca968;VisuMZ['ItemsEquipsCore'][_0x1bf9ac('0x6a')][_0x1bf9ac('0x38f')](this),this[_0x1bf9ac('0xb')]()&&this['onCategoryOk']();},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x64')]=function(){const _0x5eeefd=_0x4ca968;return this[_0x5eeefd('0x244')]()?this[_0x5eeefd('0x199')]():Scene_ItemBase[_0x5eeefd('0x27')][_0x5eeefd('0x64')][_0x5eeefd('0x38f')](this);},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x199')]=function(){const _0x55d95b=_0x4ca968,_0xa0ceed=0x0,_0x22cb97=this[_0x55d95b('0x77')](),_0x3fd48a=Graphics[_0x55d95b('0xf3')],_0x2b270a=this[_0x55d95b('0x236')]();return new Rectangle(_0xa0ceed,_0x22cb97,_0x3fd48a,_0x2b270a);},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x20f')]=Scene_Item[_0x4ca968('0x27')]['createCategoryWindow'],Scene_Item['prototype'][_0x4ca968('0x9d')]=function(){const _0x251c59=_0x4ca968;VisuMZ[_0x251c59('0x40c')]['Scene_Item_createCategoryWindow'][_0x251c59('0x38f')](this),this[_0x251c59('0xb')]()&&this[_0x251c59('0x18')]();},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x18')]=function(){const _0x319b3f=_0x4ca968;delete this[_0x319b3f('0x1c9')][_0x319b3f('0x34a')]['ok'],delete this[_0x319b3f('0x1c9')]['_handlers'][_0x319b3f('0x139')];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x229')]=Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x17e')],Scene_Item[_0x4ca968('0x27')]['categoryWindowRect']=function(){const _0x263694=_0x4ca968;if(this[_0x263694('0x244')]()){if('faUxw'!==_0x263694('0x33d')){function _0x343c30(){const _0x20d4b8=_0x263694;this[_0x20d4b8('0x435')](_0x12b536[_0x20d4b8('0x397')](_0x20d4b8('0x3a4')));}}else return this[_0x263694('0x2b1')]();}else{if(_0x263694('0xbb')!==_0x263694('0x1d1'))return VisuMZ[_0x263694('0x40c')][_0x263694('0x229')][_0x263694('0x38f')](this);else{function _0x3b58cd(){const _0x255d81=_0x263694,_0x3b12c4=_0x5a3246(_0x2c1641['$1'])[_0x255d81('0xa8')](/[\r\n]+/);for(const _0x4c8d6d of _0x3b12c4){if(_0x4c8d6d[_0x255d81('0x1e5')](/(.*):[ ](.*)/i)){const _0x556e72=_0x274341(_0x13e4c5['$1'])[_0x255d81('0x3c3')](),_0x436412=_0x4946c0(_0x291bb2['$2'])[_0x255d81('0x3c3')]();this[_0x255d81('0x3d7')](_0x556e72,_0x436412,_0x5bc439,_0x382701,_0x230151),_0x4e460b+=this[_0x255d81('0x5b')]();}}}}}},Scene_Item['prototype'][_0x4ca968('0x2b1')]=function(){const _0x2f8178=_0x4ca968,_0xfe957a=0x0,_0x42025a=this[_0x2f8178('0x41c')](),_0x22a19e=Graphics[_0x2f8178('0xf3')],_0x4c17a9=this[_0x2f8178('0x2eb')](0x1,!![]);return new Rectangle(_0xfe957a,_0x42025a,_0x22a19e,_0x4c17a9);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x2c3')]=Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x36b')],Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x36b')]=function(){const _0x3d3171=_0x4ca968;VisuMZ[_0x3d3171('0x40c')][_0x3d3171('0x2c3')][_0x3d3171('0x38f')](this);this[_0x3d3171('0xb')]()&&this[_0x3d3171('0x375')]();if(this[_0x3d3171('0xc3')]()){if(_0x3d3171('0x2bc')===_0x3d3171('0x13a')){function _0x2ff1ba(){const _0xe55185=_0x3d3171;this[_0xe55185('0x132')][_0x454b66]=new _0x1d23a4();}}else this[_0x3d3171('0xa6')]();}},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x33c')]=Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x422')],Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x422')]=function(){const _0x23961c=_0x4ca968;if(this[_0x23961c('0x244')]())return this['itemWindowRectItemsEquipsCore']();else{if(_0x23961c('0xe')===_0x23961c('0xe')){const _0x5dab01=VisuMZ[_0x23961c('0x40c')]['Scene_Item_itemWindowRect']['call'](this);return this[_0x23961c('0xc3')]()&&this[_0x23961c('0x28')]()&&(_0x5dab01[_0x23961c('0x30e')]-=this[_0x23961c('0x15e')]()),_0x5dab01;}else{function _0x45aeb0(){const _0x2a7120=_0x23961c,_0x2ae0d3=this[_0x2a7120('0xa5')];_0x2ae0d3['contents'][_0x2a7120('0x86')]();const _0x3c781c=this[_0x2a7120('0xbd')](this[_0x2a7120('0x38b')]());if(_0x3c781c==='icon'){const _0x307062=this[_0x2a7120('0x9e')](this[_0x2a7120('0x38b')]());let _0x1e639e=this[_0x2a7120('0x147')](this[_0x2a7120('0x38b')]());_0x1e639e=_0x1e639e['replace'](/\\I\[(\d+)\]/gi,''),_0x2ae0d3['resetFontSettings'](),this[_0x2a7120('0x209')](_0x1e639e,_0x307062),this['categoryNameWindowDrawText'](_0x1e639e,_0x307062),this[_0x2a7120('0x402')](_0x1e639e,_0x307062);}}}}},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x89')]=function(){const _0x48eb9d=_0x4ca968,_0x33e83b=this[_0x48eb9d('0x2a1')]()?this[_0x48eb9d('0x15e')]():0x0,_0x1de833=this[_0x48eb9d('0x1c9')]['y']+this[_0x48eb9d('0x1c9')][_0x48eb9d('0x3e2')],_0x3398ed=Graphics[_0x48eb9d('0xf3')]-this[_0x48eb9d('0x15e')](),_0x592981=this[_0x48eb9d('0x277')]()-_0x1de833;return new Rectangle(_0x33e83b,_0x1de833,_0x3398ed,_0x592981);},Scene_Item['prototype']['postCreateItemWindowModernControls']=function(){const _0x247af9=_0x4ca968;this['_itemWindow']['setHandler'](_0x247af9('0x139'),this[_0x247af9('0xf0')][_0x247af9('0x439')](this));},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0xc3')]=function(){const _0x125bcd=_0x4ca968;if(this['isUseItemsEquipsCoreUpdatedLayout']())return!![];else{if('VpUkl'!==_0x125bcd('0x3a0'))return VisuMZ[_0x125bcd('0x40c')][_0x125bcd('0x3af')]['ItemScene'][_0x125bcd('0x385')];else{function _0xc0c0e4(){const _0x29807b=_0x125bcd;this[_0x29807b('0x3b5')]=!![];}}}},Scene_Item['prototype'][_0x4ca968('0x28')]=function(){const _0x227eb4=_0x4ca968;return VisuMZ['ItemsEquipsCore'][_0x227eb4('0x3af')][_0x227eb4('0x23c')][_0x227eb4('0x2fb')];},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0xa6')]=function(){const _0x4e29cb=_0x4ca968,_0x27cc6b=this[_0x4e29cb('0x36e')]();this['_statusWindow']=new Window_ShopStatus(_0x27cc6b),this[_0x4e29cb('0x252')](this[_0x4e29cb('0x2ac')]),this['_itemWindow'][_0x4e29cb('0x1a9')](this[_0x4e29cb('0x2ac')]);},Scene_Item[_0x4ca968('0x27')]['statusWindowRect']=function(){const _0xcaa46b=_0x4ca968;return this[_0xcaa46b('0x244')]()?this[_0xcaa46b('0x94')]():VisuMZ['ItemsEquipsCore'][_0xcaa46b('0x3af')][_0xcaa46b('0x23c')][_0xcaa46b('0x1d4')][_0xcaa46b('0x38f')](this);},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x94')]=function(){const _0xcbc053=_0x4ca968,_0x4bc2c5=this['statusWidth'](),_0x22a154=this[_0xcbc053('0x1a2')][_0xcbc053('0x3e2')],_0xae17da=this[_0xcbc053('0x2a1')]()?0x0:Graphics[_0xcbc053('0xf3')]-this[_0xcbc053('0x15e')](),_0x17b730=this[_0xcbc053('0x1a2')]['y'];return new Rectangle(_0xae17da,_0x17b730,_0x4bc2c5,_0x22a154);},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x15e')]=function(){const _0x570426=_0x4ca968;return Scene_Shop['prototype'][_0x570426('0x15e')]();},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x2ff')]=function(){const _0x6b90a0=_0x4ca968;if(!this['updatedLayoutStyle']())return![];if(!this[_0x6b90a0('0xb')]())return![];if(!this[_0x6b90a0('0x1a2')])return![];if(!this[_0x6b90a0('0x1a2')]['active'])return![];return this[_0x6b90a0('0x264')]()&&this[_0x6b90a0('0xb')]();},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x191')]=function(){const _0x2a127d=_0x4ca968;if(this[_0x2a127d('0x2ff')]()){if(this['_itemWindow'][_0x2a127d('0x29c')]()===0x1){if(_0x2a127d('0x1ca')!==_0x2a127d('0x226'))return TextManager['getInputMultiButtonStrings'](_0x2a127d('0x291'),_0x2a127d('0x3a4'));else{function _0x3441b8(){const _0x3a2916=_0x2a127d,_0x2343cb=this[_0x3a2916('0xf9')](),_0x522652=this[_0x3a2916('0x2a1')]()?this[_0x3a2916('0x15e')]():0x0,_0x141454=this['mainAreaTop'](),_0x896613=_0x1096fd[_0x3a2916('0xf3')]-this[_0x3a2916('0x15e')](),_0x26d6ac=_0x2343cb?this['calcWindowHeight'](0x1,!![]):0x0;return new _0x551095(_0x522652,_0x141454,_0x896613,_0x26d6ac);}}}else return TextManager['getInputMultiButtonStrings']('pageup',_0x2a127d('0x3ec'));}return Scene_ItemBase[_0x2a127d('0x27')][_0x2a127d('0x191')]['call'](this);},Scene_Item[_0x4ca968('0x27')][_0x4ca968('0x303')]=function(){const _0x333776=_0x4ca968;if(this[_0x333776('0x2ff')]())return VisuMZ[_0x333776('0x40c')][_0x333776('0x3af')][_0x333776('0x23c')][_0x333776('0x32')];return Scene_ItemBase['prototype'][_0x333776('0x303')][_0x333776('0x38f')](this);},Scene_Equip[_0x4ca968('0x27')]['isBottomHelpMode']=function(){const _0x39e32d=_0x4ca968;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x39e32d('0x3e1')]!==undefined)return ConfigManager[_0x39e32d('0x3e1')];else{if(this[_0x39e32d('0x244')]()){if(_0x39e32d('0x3a2')===_0x39e32d('0x326')){function _0x34a867(){const _0x2b0bed=_0x39e32d;_0xd53f7c['prototype'][_0x2b0bed('0x1f7')][_0x2b0bed('0x38f')](this),this[_0x2b0bed('0x2d8')]();}}else return this[_0x39e32d('0x264')]()[_0x39e32d('0x1e5')](/LOWER/i);}else Scene_MenuBase['prototype'][_0x39e32d('0x2a1')]['call'](this);}},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x2a1')]=function(){const _0x354460=_0x4ca968;if(ConfigManager[_0x354460('0x24f')]&&ConfigManager[_0x354460('0x3be')]!==undefined)return ConfigManager[_0x354460('0x3be')];else{if(this[_0x354460('0x244')]()){if(_0x354460('0x26b')===_0x354460('0x21e')){function _0x2f6e16(){const _0x10ecb2=_0x354460,_0x460d45=this['_commandWindow']['y']+this[_0x10ecb2('0x436')]['height'],_0x35cb57=_0x471005['boxWidth']-this[_0x10ecb2('0x15e')](),_0x4c3e4a=this[_0x10ecb2('0x2a1')]()?_0x39fc84[_0x10ecb2('0xf3')]-_0x35cb57:0x0,_0xe7d1b2=this[_0x10ecb2('0x2ae')]()-this[_0x10ecb2('0x436')][_0x10ecb2('0x3e2')];return new _0x1898d(_0x4c3e4a,_0x460d45,_0x35cb57,_0xe7d1b2);}}else return this['updatedLayoutStyle']()[_0x354460('0x1e5')](/RIGHT/i);}else{if(_0x354460('0x307')==='pdlCO'){function _0x3d1f64(){const _0x3c752f=_0x354460,_0x102fa8=this[_0x3c752f('0x9e')](_0x25ddd9),_0x6a41d1=this['commandName'](_0x17d221),_0x8e497b=this[_0x3c752f('0x143')](_0x6a41d1)[_0x3c752f('0x30e')];this['changePaintOpacity'](this[_0x3c752f('0x2d0')](_0x1a3cf8));const _0x3ec01=this[_0x3c752f('0x10b')]();if(_0x3ec01===_0x3c752f('0x3a4'))this[_0x3c752f('0x148')](_0x6a41d1,_0x102fa8['x']+_0x102fa8[_0x3c752f('0x30e')]-_0x8e497b,_0x102fa8['y'],_0x8e497b);else{if(_0x3ec01===_0x3c752f('0x23')){const _0x4ca6fd=_0x102fa8['x']+_0x369d78[_0x3c752f('0x3f3')]((_0x102fa8[_0x3c752f('0x30e')]-_0x8e497b)/0x2);this['drawTextEx'](_0x6a41d1,_0x4ca6fd,_0x102fa8['y'],_0x8e497b);}else this[_0x3c752f('0x148')](_0x6a41d1,_0x102fa8['x'],_0x102fa8['y'],_0x8e497b);}}}else Scene_MenuBase[_0x354460('0x27')][_0x354460('0x2a1')]['call'](this);}}},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x264')]=function(){const _0x4cf4a8=_0x4ca968;return VisuMZ[_0x4cf4a8('0x40c')][_0x4cf4a8('0x3af')][_0x4cf4a8('0x112')]['LayoutStyle'];},Scene_Equip['prototype']['isUseModernControls']=function(){const _0x51e137=_0x4ca968;return this[_0x51e137('0x436')]&&this['_commandWindow']['isUseModernControls']();},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x244')]=function(){const _0x8ea3fb=_0x4ca968;return VisuMZ[_0x8ea3fb('0x40c')]['Settings'][_0x8ea3fb('0x112')]['EnableLayout'];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x19b')]=Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x5a')],Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x5a')]=function(){const _0xfde3ac=_0x4ca968;VisuMZ['ItemsEquipsCore']['Scene_Equip_create'][_0xfde3ac('0x38f')](this);if(this[_0xfde3ac('0xb')]()){if(_0xfde3ac('0xd7')!==_0xfde3ac('0x1b8'))this[_0xfde3ac('0xb2')]();else{function _0x420fad(){const _0x280745=_0xfde3ac;this[_0x280745('0x148')](_0x2b0e3e,_0x3421dc['x']+_0x4127cc['width']-_0x4b6af0,_0x1abbbd['y'],_0x488b68);}}}},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x64')]=function(){const _0xfaed7a=_0x4ca968;if(this[_0xfaed7a('0x244')]())return this[_0xfaed7a('0x199')]();else{if(_0xfaed7a('0x71')!==_0xfaed7a('0x210'))return Scene_MenuBase['prototype'][_0xfaed7a('0x64')][_0xfaed7a('0x38f')](this);else{function _0x581589(){const _0x416cf8=_0xfaed7a;if(this[_0x416cf8('0x21b')])return;if(!_0x599340[_0x416cf8('0x40c')][_0x416cf8('0x3af')]['EquipScene'][_0x416cf8('0x3b8')])return;const _0x58e459=_0x2fbef7['round'](_0x38f7db[_0x416cf8('0x28c')]()*this[_0x416cf8('0x2ce')]),_0x2b8959=_0x279b2c[_0x416cf8('0x2f7')](_0x24b158[_0x416cf8('0x6e')]()*this[_0x416cf8('0x2dc')]);if(this['hp']>0x0)this[_0x416cf8('0x1d8')](_0x58e459);if(this['mp']>0x0)this[_0x416cf8('0x394')](_0x2b8959);}}}},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x199')]=function(){const _0x6bbda5=_0x4ca968,_0x246e5d=0x0,_0x552f55=this[_0x6bbda5('0x77')](),_0x9f93b9=Graphics[_0x6bbda5('0xf3')],_0x546d32=this[_0x6bbda5('0x236')]();return new Rectangle(_0x246e5d,_0x552f55,_0x9f93b9,_0x546d32);},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x3f8')]=Scene_Equip[_0x4ca968('0x27')]['statusWindowRect'],Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x36e')]=function(){const _0x28d5da=_0x4ca968;if(this[_0x28d5da('0x244')]())return this[_0x28d5da('0x94')]();else{if(_0x28d5da('0x231')!==_0x28d5da('0x231')){function _0x34c2c9(){return![];}}else return VisuMZ[_0x28d5da('0x40c')][_0x28d5da('0x3f8')][_0x28d5da('0x38f')](this);}},Scene_Equip[_0x4ca968('0x27')]['statusWindowRectItemsEquipsCore']=function(){const _0x30ef87=_0x4ca968,_0x5a5236=this[_0x30ef87('0x2a1')]()?0x0:Graphics[_0x30ef87('0xf3')]-this['statusWidth'](),_0x5199bf=this[_0x30ef87('0x41c')](),_0x328835=this[_0x30ef87('0x15e')](),_0x3adc93=this[_0x30ef87('0x2ae')]();return new Rectangle(_0x5a5236,_0x5199bf,_0x328835,_0x3adc93);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x2ee')]=Scene_Equip[_0x4ca968('0x27')]['commandWindowRect'],Scene_Equip[_0x4ca968('0x27')]['commandWindowRect']=function(){const _0x3c6376=_0x4ca968;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x3c6376('0x3a7')!==_0x3c6376('0x37e'))return this[_0x3c6376('0x387')]();else{function _0x12d7c7(){_0x59352f+='\x5cI[%1]'['format'](_0x490107),_0x100756++;if(_0x3ec388>=_0x4e1507)return _0x3b0484;}}}else{if(_0x3c6376('0x3f2')===_0x3c6376('0x3b')){function _0x110cc3(){const _0x112d30=_0x3c6376;return _0x97b3d[_0x112d30('0x399')]&&_0x492019[_0x112d30('0x27')][_0x112d30('0xb')][_0x112d30('0x38f')](this);}}else return VisuMZ['ItemsEquipsCore']['Scene_Equip_commandWindowRect']['call'](this);}},Scene_Equip['prototype'][_0x4ca968('0xf9')]=function(){const _0xa1daf6=_0x4ca968,_0x3002be=VisuMZ[_0xa1daf6('0x40c')]['Settings'][_0xa1daf6('0x112')];return _0x3002be[_0xa1daf6('0x2ca')]||_0x3002be[_0xa1daf6('0x158')];},Scene_Equip[_0x4ca968('0x27')]['commandWindowRectItemsEquipsCore']=function(){const _0x4b42b3=_0x4ca968,_0x2fcbd6=this[_0x4b42b3('0xf9')](),_0x4838ce=this[_0x4b42b3('0x2a1')]()?this[_0x4b42b3('0x15e')]():0x0,_0x18a2c5=this['mainAreaTop'](),_0x2ec9cd=Graphics['boxWidth']-this['statusWidth'](),_0x6fc280=_0x2fcbd6?this[_0x4b42b3('0x2eb')](0x1,!![]):0x0;return new Rectangle(_0x4838ce,_0x18a2c5,_0x2ec9cd,_0x6fc280);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x3fb')]=Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x4a')],Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x4a')]=function(){const _0x289b92=_0x4ca968;VisuMZ[_0x289b92('0x40c')]['Scene_Equip_createSlotWindow']['call'](this);if(this['isUseModernControls']()){if('dFgHk'===_0x289b92('0x168')){function _0x36c925(){_0x461131(_0x451986);}}else this[_0x289b92('0xa2')]();}},VisuMZ['ItemsEquipsCore']['Scene_Equip_slotWindowRect']=Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0xeb')],Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0xeb')]=function(){const _0x484461=_0x4ca968;return this[_0x484461('0x244')]()?this['slotWindowRectItemsEquipsCore']():VisuMZ[_0x484461('0x40c')][_0x484461('0x38')][_0x484461('0x38f')](this);},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x11c')]=function(){const _0x3c8c4e=_0x4ca968,_0x21b965=this[_0x3c8c4e('0x2da')](),_0x44a5e9=this[_0x3c8c4e('0x2a1')]()?this[_0x3c8c4e('0x15e')]():0x0,_0x29485b=_0x21b965['y']+_0x21b965[_0x3c8c4e('0x3e2')],_0x5be367=Graphics[_0x3c8c4e('0xf3')]-this['statusWidth'](),_0x50c49f=this[_0x3c8c4e('0x2ae')]()-_0x21b965[_0x3c8c4e('0x3e2')];return new Rectangle(_0x44a5e9,_0x29485b,_0x5be367,_0x50c49f);},VisuMZ[_0x4ca968('0x40c')]['Scene_Equip_itemWindowRect']=Scene_Equip['prototype']['itemWindowRect'],Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x422')]=function(){const _0x1b523e=_0x4ca968;if(this[_0x1b523e('0x244')]()){if(_0x1b523e('0x8d')===_0x1b523e('0x1e')){function _0x3af4b5(){const _0x5529dd=_0x1b523e;return this[_0x5529dd('0x23a')]();}}else return this[_0x1b523e('0xeb')]();}else{if(_0x1b523e('0x4c')!==_0x1b523e('0x2a5'))return VisuMZ['ItemsEquipsCore'][_0x1b523e('0x1d0')][_0x1b523e('0x38f')](this);else{function _0x4f7593(){const _0x1bdde0=_0x1b523e;_0x4cdf85['ItemsEquipsCore']['Window_ItemCategory_setItemWindow'][_0x1bdde0('0x38f')](this,_0x5bd558),_0x46d72[_0x1bdde0('0x1c9')]=this;}}}},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x15e')]=function(){const _0x19db89=_0x4ca968;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x19db89('0x29e')]():VisuMZ[_0x19db89('0x40c')][_0x19db89('0x3af')][_0x19db89('0x112')]['StatusWindowWidth'];},Scene_Equip['prototype'][_0x4ca968('0x29e')]=function(){const _0x60119c=_0x4ca968;return Math[_0x60119c('0x3f3')](Graphics[_0x60119c('0xf3')]/0x2);},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0xa2')]=function(){const _0x4a5f86=_0x4ca968;this[_0x4a5f86('0x190')][_0x4a5f86('0x11a')](_0x4a5f86('0x139'),this['popScene'][_0x4a5f86('0x439')](this)),this['_slotWindow'][_0x4a5f86('0x11a')](_0x4a5f86('0x3ec'),this[_0x4a5f86('0x367')][_0x4a5f86('0x439')](this)),this[_0x4a5f86('0x190')][_0x4a5f86('0x11a')](_0x4a5f86('0xf7'),this[_0x4a5f86('0x2f1')][_0x4a5f86('0x439')](this));},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x3f0')]=Scene_Equip['prototype']['commandEquip'],Scene_Equip['prototype'][_0x4ca968('0xb2')]=function(){const _0x554df6=_0x4ca968;this[_0x554df6('0xb')]()&&(this[_0x554df6('0x436')][_0x554df6('0x3c')](),this['_commandWindow']['deactivate']()),VisuMZ['ItemsEquipsCore'][_0x554df6('0x3f0')][_0x554df6('0x38f')](this);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x1b1')]=Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0xb9')],Scene_Equip['prototype'][_0x4ca968('0xb9')]=function(){const _0x160b4b=_0x4ca968;if(this[_0x160b4b('0x190')][_0x160b4b('0x38b')]()>=0x0)VisuMZ[_0x160b4b('0x40c')][_0x160b4b('0x1b1')]['call'](this),this[_0x160b4b('0x38a')]();else{if(_0x160b4b('0x113')===_0x160b4b('0xa0')){function _0x29f33b(){const _0x28dfce=_0x160b4b;this['_buyWindowLastIndex']=this[_0x28dfce('0x207')][_0x28dfce('0x38b')](),this['_buyWindow'][_0x28dfce('0x369')](),this['_buyWindow'][_0x28dfce('0x3c')](),this[_0x28dfce('0x207')][_0x28dfce('0xfd')](0x0,0x0),this[_0x28dfce('0x2ac')][_0x28dfce('0x369')](),this[_0x28dfce('0x300')]['hide']();}}else this['_slotWindow']['smoothSelect'](0x0),this[_0x160b4b('0x190')][_0x160b4b('0x1be')]();}},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x38a')]=function(){const _0xfd05b8=_0x4ca968,_0x2dbe6f=this['_slotWindow'][_0xfd05b8('0x2b5')](),_0x2e9c5d=this[_0xfd05b8('0x1a2')][_0xfd05b8('0x154')][_0xfd05b8('0x109')](_0x2dbe6f),_0xd8415=Math[_0xfd05b8('0x3f3')](this[_0xfd05b8('0x1a2')][_0xfd05b8('0x6')]()/0x2)-0x1;this[_0xfd05b8('0x1a2')]['smoothSelect'](_0x2e9c5d>=0x0?_0x2e9c5d:0x0),this[_0xfd05b8('0x1a2')]['setTopRow'](this[_0xfd05b8('0x1a2')]['index']()-_0xd8415);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0xf2')]=Scene_Equip[_0x4ca968('0x27')]['onSlotCancel'],Scene_Equip['prototype'][_0x4ca968('0x1d3')]=function(){const _0x39269a=_0x4ca968;VisuMZ[_0x39269a('0x40c')]['Scene_Equip_onSlotCancel'][_0x39269a('0x38f')](this);if(this[_0x39269a('0xb')]()){if(_0x39269a('0xe7')!=='DNtlz'){function _0x554841(){const _0xd6fbcd=_0x39269a;_0x594815=_0x31b648||this['lineHeight'](),this['contentsBack'][_0xd6fbcd('0xd0')]=0xa0;const _0x2d3d1d=_0xb61b6c['gaugeBackColor']();this[_0xd6fbcd('0x423')][_0xd6fbcd('0x315')](_0x40d7bd+0x1,_0x171023+0x1,_0x215458-0x2,_0x3423a9-0x2,_0x2d3d1d),this[_0xd6fbcd('0x423')][_0xd6fbcd('0xd0')]=0xff;}}else this[_0x39269a('0x436')][_0x39269a('0x2df')](0x0),this[_0x39269a('0x190')][_0x39269a('0x415')]();}},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x13d')]=Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x3fa')],Scene_Equip['prototype']['onActorChange']=function(){const _0x50f692=_0x4ca968;VisuMZ['ItemsEquipsCore'][_0x50f692('0x13d')]['call'](this),this[_0x50f692('0xb')]()&&(this[_0x50f692('0x436')][_0x50f692('0x415')](),this[_0x50f692('0x436')][_0x50f692('0x3c')](),this[_0x50f692('0x190')][_0x50f692('0x2df')](0x0),this['_slotWindow'][_0x50f692('0x1be')]());},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x2f4')]=function(){const _0x4e9acc=_0x4ca968;if(!this['_slotWindow'])return![];if(!this[_0x4e9acc('0x190')]['active'])return![];return this['_slotWindow'][_0x4e9acc('0x3b1')]();},Scene_Equip[_0x4ca968('0x27')]['buttonAssistKey3']=function(){const _0x2c41d2=_0x4ca968;if(this['buttonAssistSlotWindowShift']())return TextManager[_0x2c41d2('0x7a')](_0x2c41d2('0xc4'));return Scene_MenuBase[_0x2c41d2('0x27')]['buttonAssistKey3'][_0x2c41d2('0x38f')](this);},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x2a7')]=function(){const _0x93e2fb=_0x4ca968;if(this[_0x93e2fb('0x2f4')]()){if(_0x93e2fb('0x1e8')===_0x93e2fb('0x1e8'))return VisuMZ['ItemsEquipsCore'][_0x93e2fb('0x3af')]['EquipScene'][_0x93e2fb('0x325')];else{function _0x598eaf(){const _0x25432=_0x93e2fb;_0x4b06e5['prototype'][_0x25432('0x3e0')]['call'](this);}}}return Scene_MenuBase[_0x93e2fb('0x27')][_0x93e2fb('0x2a7')][_0x93e2fb('0x38f')](this);},Scene_Equip[_0x4ca968('0x27')][_0x4ca968('0x29d')]=function(){const _0x133aca=_0x4ca968;if(this[_0x133aca('0x2f4')]()){if(_0x133aca('0x19a')!==_0x133aca('0x237'))return this[_0x133aca('0x3ac')][_0x133aca('0x30e')]/0x5/-0x3;else{function _0x126da0(){const _0x55eaed=_0x133aca;return _0x13dc6c[_0x55eaed('0x40c')][_0x55eaed('0x42b')][_0x55eaed('0x38f')](this);}}}return Scene_MenuBase['prototype']['buttonAssistOffset3'][_0x133aca('0x38f')](this);},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x22e')]=Scene_Load['prototype'][_0x4ca968('0x318')],Scene_Load[_0x4ca968('0x27')][_0x4ca968('0x318')]=function(){const _0x8b750c=_0x4ca968;VisuMZ[_0x8b750c('0x40c')][_0x8b750c('0x22e')][_0x8b750c('0x38f')](this),this[_0x8b750c('0x3ab')]();},Scene_Load['prototype'][_0x4ca968('0x3ab')]=function(){const _0x3f9948=_0x4ca968;if($gameSystem[_0x3f9948('0x1b2')]()!==$dataSystem[_0x3f9948('0x1b2')])for(const _0x1aeaaa of $gameActors[_0x3f9948('0x154')]){if(_0x1aeaaa)_0x1aeaaa['prepareNewEquipSlotsOnLoad']();}},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x2d3')]=function(){const _0x11e9ac=_0x4ca968;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x11e9ac('0x3e1')]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('FZHZd'===_0x11e9ac('0x22c')){function _0x11aed3(){const _0x2a26c4=_0x11e9ac;if(!this[_0x2a26c4('0x26a')](_0x371483))return![];return!![];}}else return this[_0x11e9ac('0x264')]()['match'](/LOWER/i);}else{if(_0x11e9ac('0x3a9')==='nIuPm')Scene_MenuBase[_0x11e9ac('0x27')]['isRightInputMode'][_0x11e9ac('0x38f')](this);else{function _0x40537b(){const _0x17cbea=_0x11e9ac;return this['contents'][_0x17cbea('0xa')]/_0x5e9de3[_0x17cbea('0x76')]();}}}}},Scene_Shop['prototype'][_0x4ca968('0x2a1')]=function(){const _0x265731=_0x4ca968;if(ConfigManager[_0x265731('0x24f')]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x265731('0x3be')];else{if(this[_0x265731('0x244')]()){if('oFRaM'===_0x265731('0x1ed'))return this['updatedLayoutStyle']()[_0x265731('0x1e5')](/RIGHT/i);else{function _0x32fe84(){const _0x378a9e=_0x265731;this[_0x378a9e('0x204')]['setStatusWindow'](this[_0x378a9e('0x2ac')]);}}}else Scene_MenuBase[_0x265731('0x27')][_0x265731('0x2a1')]['call'](this);}},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x264')]=function(){const _0x11f691=_0x4ca968;return VisuMZ[_0x11f691('0x40c')][_0x11f691('0x3af')][_0x11f691('0xcd')][_0x11f691('0x368')];},Scene_Shop['prototype'][_0x4ca968('0xb')]=function(){const _0x3138cc=_0x4ca968;return this[_0x3138cc('0x1c9')]&&this[_0x3138cc('0x1c9')][_0x3138cc('0xb')]();},Scene_Shop['prototype'][_0x4ca968('0x244')]=function(){const _0x5d0553=_0x4ca968;return VisuMZ[_0x5d0553('0x40c')][_0x5d0553('0x3af')]['ShopScene'][_0x5d0553('0x171')];},VisuMZ[_0x4ca968('0x40c')]['Scene_Shop_prepare']=Scene_Shop['prototype'][_0x4ca968('0x67')],Scene_Shop['prototype'][_0x4ca968('0x67')]=function(_0x7896fc,_0x226ea2){const _0x3aee9a=_0x4ca968;_0x7896fc=JsonEx[_0x3aee9a('0x2fd')](_0x7896fc),VisuMZ['ItemsEquipsCore']['Scene_Shop_prepare'][_0x3aee9a('0x38f')](this,_0x7896fc,_0x226ea2),this['adjustHiddenShownGoods']();},Scene_Shop[_0x4ca968('0x27')]['adjustHiddenShownGoods']=function(){const _0x163346=_0x4ca968;this[_0x163346('0xd')]=0x0;for(const _0x201234 of this['_goods']){if(this[_0x163346('0x351')](_0x201234)){if('HherR'===_0x163346('0x3f1')){function _0x1555d4(){const _0x18f582=_0x163346;return _0x500b8e[_0x18f582('0x40c')][_0x18f582('0x3af')][_0x18f582('0xcd')][_0x18f582('0x58')];}}else this[_0x163346('0xd')]++;}else _0x201234[0x0]=-0x1;}},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x351')]=function(_0x191d48){const _0x3eb345=_0x4ca968;if(_0x191d48[0x0]>0x2||_0x191d48[0x0]<0x0)return![];const _0x5ac18f=[$dataItems,$dataWeapons,$dataArmors][_0x191d48[0x0]][_0x191d48[0x1]];if(!_0x5ac18f)return![];const _0x41fccd=_0x5ac18f['note']||'';if(_0x41fccd['match'](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32f632=JSON['parse']('['+RegExp['$1'][_0x3eb345('0x1e5')](/\d+/g)+']');for(const _0x5d783c of _0x32f632){if(!$gameSwitches[_0x3eb345('0x4')](_0x5d783c))return![];}return!![];}if(_0x41fccd[_0x3eb345('0x1e5')](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3eb345('0x2f3')!==_0x3eb345('0x1bc')){const _0x2b4ead=JSON[_0x3eb345('0x35b')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x310829 of _0x2b4ead){if(!$gameSwitches[_0x3eb345('0x4')](_0x310829))return![];}return!![];}else{function _0x3ca8e0(){const _0x500af7=_0x3eb345;if(!_0x55d552[_0x500af7('0x4')](_0x3340f4))return!![];}}}if(_0x41fccd[_0x3eb345('0x1e5')](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('FkHfb'==='EdCXK'){function _0x3acf1b(){const _0x48c19d=_0x3eb345;_0x3bcb9f[_0x48c19d('0x40c')][_0x48c19d('0x28f')][_0x48c19d('0x38f')](this,_0x264a54),this['createCommandNameWindow'](_0x4121a8);}}else{const _0x516418=JSON[_0x3eb345('0x35b')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xed7e09 of _0x516418){if($gameSwitches[_0x3eb345('0x4')](_0xed7e09))return!![];}return![];}}if(_0x41fccd['match'](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3eb345('0xf5')!==_0x3eb345('0xf5')){function _0x1ae278(){const _0x12a7c7=_0x3eb345,_0x2f1ed7=_0x2f3c40[_0x12a7c7('0x35b')]('['+_0x58d6fb['$1'][_0x12a7c7('0x1e5')](/\d+/g)+']');for(const _0x234a89 of _0x2f1ed7){if(_0x255236['value'](_0x234a89))return![];}return!![];}}else{const _0x18a18d=JSON[_0x3eb345('0x35b')]('['+RegExp['$1'][_0x3eb345('0x1e5')](/\d+/g)+']');for(const _0x297abe of _0x18a18d){if(!$gameSwitches[_0x3eb345('0x4')](_0x297abe))return!![];}return![];}}if(_0x41fccd[_0x3eb345('0x1e5')](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3eb345('0x25d')===_0x3eb345('0x2c9')){function _0x206e2f(){const _0x58bacc=_0x3eb345;return this['maxCols']()<=0x1?_0x366fee[_0x58bacc('0x27')]['colSpacing']['call'](this):_0x4bff5b[_0x58bacc('0x40c')][_0x58bacc('0xde')][_0x58bacc('0x38f')](this);}}else{const _0x32fdde=JSON[_0x3eb345('0x35b')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x916b42 of _0x32fdde){if(_0x3eb345('0x1eb')!=='wswVp'){if(!$gameSwitches[_0x3eb345('0x4')](_0x916b42))return!![];}else{function _0x4b930e(){const _0x1d0a3c=_0x3eb345,_0x1aab3f=this[_0x1d0a3c('0x7b')](_0x3c999e,this[_0x1d0a3c('0x257')][_0x1d0a3c('0x239')]),_0x10768b=_0x4ed86a['makeDeepCopy'](_0x385204);_0x10768b['_tempActor']=!![];const _0x23c981=_0x10768b[_0x1d0a3c('0x254')]()[_0x1d0a3c('0x109')](this[_0x1d0a3c('0x257')][_0x1d0a3c('0x239')]);if(_0x23c981>=0x0)_0x10768b['forceChangeEquip'](_0x23c981,this[_0x1d0a3c('0x257')]);let _0x5bf2a5=0x0,_0x1e69be=0x0,_0x365be5=0x0;_0x1b94c1[_0x1d0a3c('0x399')]?(_0x5bf2a5=_0x10768b[_0x1d0a3c('0x286')](_0xe8c0d3),_0x1e69be=_0x5bf2a5-_0x4c04bf[_0x1d0a3c('0x286')](_0x38e842),this[_0x1d0a3c('0x1d6')](_0x4287f9[_0x1d0a3c('0x390')](_0x1e69be)),_0x365be5=(_0x1e69be>=0x0?'+':'')+_0x443df[_0x1d0a3c('0x437')](_0x1e69be,0x0)):(_0x5bf2a5=_0x10768b[_0x1d0a3c('0x2f')](_0x34cba3),_0x1e69be=_0x5bf2a5-_0x104a45[_0x1d0a3c('0x2f')](_0x764ae1),this[_0x1d0a3c('0x1d6')](_0x2809ee[_0x1d0a3c('0x390')](_0x1e69be)),_0x365be5=(_0x1e69be>=0x0?'+':'')+_0x1e69be);if(_0x365be5==='+0')_0x365be5=_0x3f355e[_0x1d0a3c('0x349')];this[_0x1d0a3c('0x2c5')](_0x365be5,_0x55b2fb,_0xd06e4c,_0x31ea4c,_0x1d0a3c('0x23'));}}}return![];}}if(_0x41fccd['match'](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3edd97=JSON['parse']('['+RegExp['$1'][_0x3eb345('0x1e5')](/\d+/g)+']');for(const _0x3c2dd8 of _0x3edd97){if(_0x3eb345('0x37a')!==_0x3eb345('0x37a')){function _0x2ccfca(){return this['helpWindowRectItemsEquipsCore']();}}else{if($gameSwitches['value'](_0x3c2dd8))return![];}}return!![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x401')]=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x5a')],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x5a')]=function(){const _0x5cd914=_0x4ca968;VisuMZ[_0x5cd914('0x40c')][_0x5cd914('0x401')]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5cd914('0x1e3')]();},Scene_Shop[_0x4ca968('0x27')]['postCreateItemsEquipsCore']=function(){const _0x10ab2c=_0x4ca968;this['_dummyWindow']['hide'](),this[_0x10ab2c('0x207')]['show'](),this['_buyWindow'][_0x10ab2c('0x3c')](),this[_0x10ab2c('0x2ac')][_0x10ab2c('0x369')]();},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x64')]=function(){const _0x1b584d=_0x4ca968;return this[_0x1b584d('0x244')]()?this[_0x1b584d('0x199')]():Scene_MenuBase[_0x1b584d('0x27')][_0x1b584d('0x64')]['call'](this);},Scene_Shop[_0x4ca968('0x27')]['helpWindowRectItemsEquipsCore']=function(){const _0x978685=_0x4ca968,_0x45ec0b=0x0,_0x32fee4=this[_0x978685('0x77')](),_0x356950=Graphics[_0x978685('0xf3')],_0x147a8f=this[_0x978685('0x236')]();return new Rectangle(_0x45ec0b,_0x32fee4,_0x356950,_0x147a8f);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x246')]=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x2bf')],Scene_Shop[_0x4ca968('0x27')]['goldWindowRect']=function(){const _0x5d0c18=_0x4ca968;if(this[_0x5d0c18('0x244')]()){if(_0x5d0c18('0x2fa')==='sCkFv'){function _0x276bbc(){const _0x1a7506=_0x5d0c18;_0x2d84c1[_0x1a7506('0x27')]['drawItem'][_0x1a7506('0x38f')](this,_0x31d87f);}}else return this['goldWindowRectItemsEquipsCore']();}else return VisuMZ[_0x5d0c18('0x40c')][_0x5d0c18('0x246')][_0x5d0c18('0x38f')](this);},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x30a')]=function(){const _0x71bb76=_0x4ca968,_0x2c34b0=this['mainCommandWidth'](),_0x258e83=this[_0x71bb76('0x2eb')](0x1,!![]),_0x520692=this[_0x71bb76('0x2a1')]()?0x0:Graphics[_0x71bb76('0xf3')]-_0x2c34b0,_0x1a37a0=this[_0x71bb76('0x41c')]();return new Rectangle(_0x520692,_0x1a37a0,_0x2c34b0,_0x258e83);},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x122')]=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x2da')],Scene_Shop[_0x4ca968('0x27')]['commandWindowRect']=function(){const _0x42ae61=_0x4ca968;if(this[_0x42ae61('0x244')]()){if(_0x42ae61('0x142')!==_0x42ae61('0x428'))return this[_0x42ae61('0x387')]();else{function _0x3a97a0(){const _0x172884=_0x42ae61;_0x6a0d2a='armor-%1'[_0x172884('0x43e')](_0x35fe15['id']);}}}else{if(_0x42ae61('0xef')===_0x42ae61('0xef'))return VisuMZ[_0x42ae61('0x40c')][_0x42ae61('0x122')][_0x42ae61('0x38f')](this);else{function _0x2b2ae0(){const _0x43931b=_0x42ae61;this[_0x43931b('0x1a2')][_0x43931b('0x274')](this[_0x43931b('0x202')]());}}}},Scene_Shop[_0x4ca968('0x27')]['commandWindowRectItemsEquipsCore']=function(){const _0x168754=_0x4ca968,_0x23a78e=this[_0x168754('0x2a1')]()?this[_0x168754('0x20')]():0x0,_0x49c4fc=this[_0x168754('0x41c')](),_0x413aed=Graphics['boxWidth']-this[_0x168754('0x20')](),_0x320cc4=this[_0x168754('0x2eb')](0x1,!![]);return new Rectangle(_0x23a78e,_0x49c4fc,_0x413aed,_0x320cc4);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x125')]=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x23b')],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x23b')]=function(){const _0x4118b4=_0x4ca968;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['numberWindowRectItemsEquipsCore']():VisuMZ[_0x4118b4('0x40c')][_0x4118b4('0x125')][_0x4118b4('0x38f')](this);},Scene_Shop['prototype'][_0x4ca968('0x3e4')]=function(){const _0xb0c4f4=_0x4ca968,_0x8b2ad4=this[_0xb0c4f4('0x436')]['y']+this['_commandWindow'][_0xb0c4f4('0x3e2')],_0xbd93a9=Graphics[_0xb0c4f4('0xf3')]-this[_0xb0c4f4('0x15e')](),_0x26bda6=this[_0xb0c4f4('0x2a1')]()?Graphics[_0xb0c4f4('0xf3')]-_0xbd93a9:0x0,_0x2654cf=this[_0xb0c4f4('0x2ae')]()-this[_0xb0c4f4('0x436')][_0xb0c4f4('0x3e2')];return new Rectangle(_0x26bda6,_0x8b2ad4,_0xbd93a9,_0x2654cf);},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x1f8')]=Scene_Shop['prototype']['statusWindowRect'],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x36e')]=function(){const _0x388490=_0x4ca968;if(this[_0x388490('0x244')]())return this[_0x388490('0x94')]();else{if(_0x388490('0x359')==='XoLmW'){function _0x772c33(){this['drawTextEx'](_0x1e182b,_0xa24e2e['x'],_0x370648['y'],_0x18429a);}}else return VisuMZ[_0x388490('0x40c')]['Scene_Shop_statusWindowRect'][_0x388490('0x38f')](this);}},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x94')]=function(){const _0x5364fa=_0x4ca968,_0x2eea45=this['statusWidth'](),_0xe7612e=this['mainAreaHeight']()-this['_commandWindow']['height'],_0x21ffa8=this['isRightInputMode']()?0x0:Graphics[_0x5364fa('0xf3')]-_0x2eea45,_0x38383b=this['_commandWindow']['y']+this[_0x5364fa('0x436')][_0x5364fa('0x3e2')];return new Rectangle(_0x21ffa8,_0x38383b,_0x2eea45,_0xe7612e);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x1de')]=Scene_Shop[_0x4ca968('0x27')]['buyWindowRect'],Scene_Shop['prototype']['buyWindowRect']=function(){const _0x14cc73=_0x4ca968;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x14cc73('0x43d')!==_0x14cc73('0x43d')){function _0x375a1b(){const _0x4fe2d8=_0x14cc73;_0x5ac782=_0x4fe2d8('0x2b7')[_0x4fe2d8('0x43e')](_0x4d13da,_0x248bd1);}}else return this[_0x14cc73('0x3a8')]();}else return VisuMZ[_0x14cc73('0x40c')]['Scene_Shop_buyWindowRect'][_0x14cc73('0x38f')](this);},Scene_Shop[_0x4ca968('0x27')]['buyWindowRectItemsEquipsCore']=function(){const _0xfc272f=_0x4ca968,_0x2c7abb=this[_0xfc272f('0x436')]['y']+this[_0xfc272f('0x436')]['height'],_0x48d08e=Graphics[_0xfc272f('0xf3')]-this['statusWidth'](),_0x4c1e7d=this['mainAreaHeight']()-this[_0xfc272f('0x436')]['height'],_0x20f07b=this[_0xfc272f('0x2a1')]()?Graphics[_0xfc272f('0xf3')]-_0x48d08e:0x0;return new Rectangle(_0x20f07b,_0x2c7abb,_0x48d08e,_0x4c1e7d);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x3fc')]=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x9d')],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x9d')]=function(){const _0x19737d=_0x4ca968;VisuMZ['ItemsEquipsCore'][_0x19737d('0x3fc')][_0x19737d('0x38f')](this);if(this[_0x19737d('0xb')]()){if(_0x19737d('0x251')!=='toBlp')this[_0x19737d('0x18')]();else{function _0x17ae86(){const _0x19e469=_0x19737d,_0x2d624e=this[_0x19e469('0xca')][_0x19e469('0x1f1')][_0x52fe14],_0x8303e9=_0x468dd9['prototype'][_0x19e469('0x180')](_0x2d624e,_0x2737ba);if(_0x8303e9>0x0){_0x18c278+='\x5cI[%1]'['format'](_0x8303e9),_0xb7d1e3++;if(_0x30ab15>=_0x1376eb)return _0x3966e8;}}}}},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x42b')]=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x17e')],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x17e')]=function(){const _0x5cc59d=_0x4ca968;if(this[_0x5cc59d('0x244')]()){if(_0x5cc59d('0x1ff')!=='PDMzV'){function _0x5c3e73(){const _0x436b88=_0x5cc59d;this[_0x436b88('0x2fc')](_0x33b0b0,_0x14782b,_0xac628b,_0x2dcda7,!![]),this[_0x436b88('0x2fc')](_0x568546,_0x5477ec,_0xb191c4,_0x1fb96b,![],_0x436b88('0x3a4')),this[_0x436b88('0x312')](_0x4b97e0,_0x411761,_0x556baf),this['resetFontSettings']();}}else return this[_0x5cc59d('0x2b1')]();}else return VisuMZ['ItemsEquipsCore'][_0x5cc59d('0x42b')]['call'](this);},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x2b1')]=function(){const _0x31f797=_0x4ca968,_0x3620ec=this[_0x31f797('0x436')]['y'],_0x630a04=this[_0x31f797('0x436')][_0x31f797('0x30e')],_0x338293=this[_0x31f797('0x2eb')](0x1,!![]),_0x5807ea=this[_0x31f797('0x2a1')]()?Graphics['boxWidth']-_0x630a04:0x0;return new Rectangle(_0x5807ea,_0x3620ec,_0x630a04,_0x338293);},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x18')]=function(){const _0x5615e6=_0x4ca968;delete this['_categoryWindow'][_0x5615e6('0x34a')]['ok'],delete this[_0x5615e6('0x1c9')][_0x5615e6('0x34a')]['cancel'];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x161')]=Scene_Shop[_0x4ca968('0x27')]['createSellWindow'],Scene_Shop[_0x4ca968('0x27')]['createSellWindow']=function(){const _0x1e473d=_0x4ca968;VisuMZ[_0x1e473d('0x40c')][_0x1e473d('0x161')][_0x1e473d('0x38f')](this),this[_0x1e473d('0x244')]()&&this[_0x1e473d('0x176')]();},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x389')]=Scene_Shop['prototype'][_0x4ca968('0x356')],Scene_Shop['prototype']['sellWindowRect']=function(){const _0x40eff0=_0x4ca968;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['sellWindowRectItemsEquipsCore']();else{if('HJeZS'===_0x40eff0('0x22a'))return VisuMZ[_0x40eff0('0x40c')][_0x40eff0('0x389')][_0x40eff0('0x38f')](this);else{function _0x153a04(){const _0x48f328=_0x40eff0;return _0x48f328('0x290');}}}},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x1e6')]=function(){const _0x1662bb=_0x4ca968,_0x8a13b3=this['_categoryWindow']['y']+this[_0x1662bb('0x1c9')][_0x1662bb('0x3e2')],_0x243ac2=Graphics[_0x1662bb('0xf3')]-this['statusWidth'](),_0x3fb506=this['mainAreaHeight']()-this[_0x1662bb('0x1c9')]['height'],_0x5cbddd=this[_0x1662bb('0x2a1')]()?Graphics[_0x1662bb('0xf3')]-_0x243ac2:0x0;return new Rectangle(_0x5cbddd,_0x8a13b3,_0x243ac2,_0x3fb506);},Scene_Shop[_0x4ca968('0x27')]['postCreateSellWindowItemsEquipsCore']=function(){const _0x3170dd=_0x4ca968;this[_0x3170dd('0x204')][_0x3170dd('0x1a9')](this[_0x3170dd('0x2ac')]);},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x15e')]=function(){const _0x22a48f=_0x4ca968;return VisuMZ[_0x22a48f('0x40c')][_0x22a48f('0x3af')]['StatusWindow']['Width'];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x43c')]=Scene_Shop['prototype'][_0x4ca968('0x36')],Scene_Shop[_0x4ca968('0x27')]['activateSellWindow']=function(){const _0x496f40=_0x4ca968;VisuMZ[_0x496f40('0x40c')][_0x496f40('0x43c')][_0x496f40('0x38f')](this);if(this[_0x496f40('0x244')]()){if(_0x496f40('0x258')!==_0x496f40('0x258')){function _0x15d4fc(){const _0x517749=_0x496f40;this[_0x517749('0x17b')]();}}else this[_0x496f40('0x2ac')][_0x496f40('0x369')]();}},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x33')]=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x2fe')],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x2fe')]=function(){const _0x4b7834=_0x4ca968;VisuMZ[_0x4b7834('0x40c')][_0x4b7834('0x33')][_0x4b7834('0x38f')](this);if(this[_0x4b7834('0x244')]()){if(_0x4b7834('0xfe')===_0x4b7834('0xfe'))this[_0x4b7834('0x2cc')]();else{function _0x4a06fd(){const _0x2e9ef4=_0x4b7834;if(_0x3889f8[_0x2e9ef4('0x1e5')](/(.*):[ ](.*)/i)){const _0x2a78f4=_0x1fda3d(_0xedc69a['$1'])[_0x2e9ef4('0x3c3')](),_0x3f96ef=_0x29a2cf(_0x4851ec['$2'])[_0x2e9ef4('0x3c3')]();this[_0x2e9ef4('0x3d7')](_0x2a78f4,_0x3f96ef,_0x59f9ec,_0x58d563,_0x330e50),_0x3ef89b+=this[_0x2e9ef4('0x5b')]();}}}}},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x2cc')]=function(){const _0x2b9e31=_0x4ca968;this['_buyWindowLastIndex']=this[_0x2b9e31('0x266')]||0x0,this[_0x2b9e31('0x207')][_0x2b9e31('0x2df')](this[_0x2b9e31('0x266')]);},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x1f')]=Scene_Shop[_0x4ca968('0x27')]['commandSell'],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x41e')]=function(){const _0x5c2cb4=_0x4ca968;VisuMZ[_0x5c2cb4('0x40c')][_0x5c2cb4('0x1f')][_0x5c2cb4('0x38f')](this);this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5c2cb4('0x276')]();if(this[_0x5c2cb4('0xb')]()){if(_0x5c2cb4('0x2e2')===_0x5c2cb4('0x2e2'))this[_0x5c2cb4('0x1c9')][_0x5c2cb4('0x2df')](0x0),this[_0x5c2cb4('0x2ab')]();else{function _0x5442db(){const _0x35329d=_0x5c2cb4;return this[_0x35329d('0x3a8')]();}}}},Scene_Shop['prototype'][_0x4ca968('0x276')]=function(){const _0x13f30b=_0x4ca968;this[_0x13f30b('0x207')][_0x13f30b('0xc7')](),this[_0x13f30b('0x436')][_0x13f30b('0xc7')]();},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x319')]=Scene_Shop[_0x4ca968('0x27')]['onBuyCancel'],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0xb1')]=function(){const _0x5b528d=_0x4ca968;VisuMZ[_0x5b528d('0x40c')]['Scene_Shop_onBuyCancel'][_0x5b528d('0x38f')](this),this[_0x5b528d('0x244')]()&&this['onBuyCancelItemsEquipsCore']();},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x408')]=function(){const _0x4d0a85=_0x4ca968;this[_0x4d0a85('0x266')]=this[_0x4d0a85('0x207')][_0x4d0a85('0x38b')](),this['_buyWindow']['show'](),this[_0x4d0a85('0x207')][_0x4d0a85('0x3c')](),this[_0x4d0a85('0x207')][_0x4d0a85('0xfd')](0x0,0x0),this[_0x4d0a85('0x2ac')]['show'](),this[_0x4d0a85('0x300')][_0x4d0a85('0xc7')]();},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x203')]=Scene_Shop['prototype'][_0x4ca968('0x42c')],Scene_Shop[_0x4ca968('0x27')]['onCategoryCancel']=function(){const _0x9c3403=_0x4ca968;VisuMZ[_0x9c3403('0x40c')]['Scene_Shop_onCategoryCancel'][_0x9c3403('0x38f')](this);if(this[_0x9c3403('0x244')]()){if(_0x9c3403('0x288')===_0x9c3403('0x350')){function _0x4ca1ce(){return this['getItemDamageAmountLabelOriginal']();}}else this[_0x9c3403('0x32d')]();}},Scene_Shop[_0x4ca968('0x27')]['onCategoryCancelItemsEquipsCore']=function(){const _0x57d655=_0x4ca968;this[_0x57d655('0x207')][_0x57d655('0x369')](),this['_commandWindow']['show']();},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0xe5')]=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0xda')],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0xda')]=function(){const _0x1e1739=_0x4ca968;VisuMZ[_0x1e1739('0x40c')]['Scene_Shop_onSellOk']['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['onSellOkItemsEquipsCore']();},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x17b')]=function(){const _0x454a73=_0x4ca968;this[_0x454a73('0x1c9')][_0x454a73('0x369')]();},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x10c')]=Scene_Shop['prototype'][_0x4ca968('0x2be')],Scene_Shop[_0x4ca968('0x27')]['onSellCancel']=function(){const _0x2df6d4=_0x4ca968;VisuMZ[_0x2df6d4('0x40c')][_0x2df6d4('0x10c')][_0x2df6d4('0x38f')](this),this[_0x2df6d4('0xb')]()&&this['onCategoryCancel'](),this[_0x2df6d4('0x244')]()&&this[_0x2df6d4('0x300')][_0x2df6d4('0xc7')]();},VisuMZ[_0x4ca968('0x40c')]['Scene_Shop_sellingPrice']=Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x155')],Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x155')]=function(){const _0xa315bb=_0x4ca968;let _0x53bc77=this['determineBaseSellingPrice']();const _0x3a56d5=this[_0xa315bb('0x257')];return _0x53bc77=VisuMZ[_0xa315bb('0x40c')][_0xa315bb('0x3af')]['ShopScene'][_0xa315bb('0x25c')][_0xa315bb('0x38f')](this,_0x3a56d5,_0x53bc77),_0x53bc77;},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0x2c6')]=function(){const _0x220275=_0x4ca968;if(!this[_0x220275('0x257')])return 0x0;else{if(this[_0x220275('0x257')][_0x220275('0x283')][_0x220275('0x1e5')](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x30bebb=String(RegExp['$1']);let _0x62becd=this[_0x220275('0x257')],_0x522244=_0x62becd[_0x220275('0x110')]*this[_0x220275('0xd4')]();try{if('qoPhe'===_0x220275('0x187')){function _0x57eeb0(){const _0x57e3da=_0x220275,_0x4c6641=_0x773731[_0x57e3da('0x35b')]('['+_0x49d3d0['$1'][_0x57e3da('0x1e5')](/\d+/g)+']');for(const _0x5ebb75 of _0x4c6641){if(!_0x2fb591['value'](_0x5ebb75))return![];}return!![];}}else eval(_0x30bebb);}catch(_0x120999){if($gameTemp[_0x220275('0x13f')]())console[_0x220275('0x218')](_0x120999);}if(isNaN(_0x522244))_0x522244=0x0;return Math[_0x220275('0x3f3')](_0x522244);}else return this[_0x220275('0x257')]['note'][_0x220275('0x1e5')](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math['floor'](this[_0x220275('0x257')][_0x220275('0x110')]*this[_0x220275('0xd4')]());}},Scene_Shop[_0x4ca968('0x27')][_0x4ca968('0xd4')]=function(){const _0x283d3c=_0x4ca968;return VisuMZ[_0x283d3c('0x40c')][_0x283d3c('0x3af')][_0x283d3c('0xcd')][_0x283d3c('0x1a8')];},Scene_Shop[_0x4ca968('0x27')]['buttonAssistItemListRequirement']=function(){const _0x5ac1fb=_0x4ca968;if(!this['updatedLayoutStyle']())return![];if(!this[_0x5ac1fb('0xb')]())return![];if(!this[_0x5ac1fb('0x204')])return![];if(!this[_0x5ac1fb('0x204')][_0x5ac1fb('0x1cb')])return![];return this[_0x5ac1fb('0x264')]()&&this[_0x5ac1fb('0xb')]();},Scene_Shop[_0x4ca968('0x27')]['buttonAssistKey1']=function(){const _0x5693c0=_0x4ca968;if(this[_0x5693c0('0x2ff')]()){if(this['_sellWindow'][_0x5693c0('0x29c')]()===0x1){if(_0x5693c0('0x1c8')===_0x5693c0('0x1c8'))return TextManager['getInputMultiButtonStrings'](_0x5693c0('0x291'),'right');else{function _0x1f00e7(){const _0x3c2972=_0x5693c0;return _0x4bc297[_0x3c2972('0xea')](_0x1377ca);}}}else{if(_0x5693c0('0x36a')!==_0x5693c0('0x2f2'))return TextManager[_0x5693c0('0x31b')](_0x5693c0('0xf7'),_0x5693c0('0x3ec'));else{function _0x209bd5(){const _0x53e712=_0x5693c0;_0xbcad1c[_0x53e712('0x40c')][_0x53e712('0x194')]['call'](this),this['process_VisuMZ_ItemsEquipsCore_RegExp'](),this[_0x53e712('0x2b4')]();}}}}else{if(this[_0x5693c0('0x1c6')]&&this[_0x5693c0('0x1c6')]['active'])return TextManager['getInputMultiButtonStrings']('left',_0x5693c0('0x3a4'));}return Scene_MenuBase[_0x5693c0('0x27')]['buttonAssistKey1'][_0x5693c0('0x38f')](this);},Scene_Shop[_0x4ca968('0x27')]['buttonAssistKey2']=function(){const _0x373cc1=_0x4ca968;if(this['_numberWindow']&&this['_numberWindow'][_0x373cc1('0x1cb')])return TextManager[_0x373cc1('0x31b')]('up',_0x373cc1('0x2cd'));return Scene_MenuBase[_0x373cc1('0x27')][_0x373cc1('0x163')][_0x373cc1('0x38f')](this);},Scene_Shop[_0x4ca968('0x27')]['buttonAssistText1']=function(){const _0x4fc8e0=_0x4ca968;if(this['buttonAssistItemListRequirement']()){if(_0x4fc8e0('0x99')===_0x4fc8e0('0x1b')){function _0x106f36(){const _0x21f511=_0x4fc8e0;return _0xc8d7a9['prototype']['colSpacing'][_0x21f511('0x38f')](this);}}else return VisuMZ[_0x4fc8e0('0x40c')][_0x4fc8e0('0x3af')]['ItemScene']['buttonAssistCategory'];}else{if(this[_0x4fc8e0('0x1c6')]&&this[_0x4fc8e0('0x1c6')][_0x4fc8e0('0x1cb')]){if(_0x4fc8e0('0x24')===_0x4fc8e0('0x216')){function _0xe165a8(){const _0x5c91ab=_0x4fc8e0;_0x5dba0e[_0x5c91ab('0x1e5')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0xcc8c56=_0x11b542(_0x2d4dcc['$1'])[_0x5c91ab('0x434')]()[_0x5c91ab('0x3c3')]()[_0x5c91ab('0xa8')](',');for(const _0x31d4db of _0xcc8c56){_0x3d618e['categories'][_0x5c91ab('0x2c8')](_0x31d4db[_0x5c91ab('0x3c3')]());}}}else return VisuMZ[_0x4fc8e0('0x40c')][_0x4fc8e0('0x3af')]['ShopScene']['buttonAssistSmallIncrement'];}}return Scene_MenuBase[_0x4fc8e0('0x27')]['buttonAssistText1']['call'](this);},Scene_Shop['prototype'][_0x4ca968('0x416')]=function(){const _0x1740ed=_0x4ca968;if(this[_0x1740ed('0x1c6')]&&this[_0x1740ed('0x1c6')]['active']){if(_0x1740ed('0x87')===_0x1740ed('0x36d')){function _0x4fad94(){const _0x3082ed=_0x1740ed;this[_0x3082ed('0xa6')]();}}else return VisuMZ['ItemsEquipsCore'][_0x1740ed('0x3af')][_0x1740ed('0xcd')][_0x1740ed('0x228')];}return Scene_MenuBase[_0x1740ed('0x27')][_0x1740ed('0x416')]['call'](this);};function Sprite_NewLabel(){const _0x2cca27=_0x4ca968;this[_0x2cca27('0x1f7')](...arguments);}Sprite_NewLabel[_0x4ca968('0x27')]=Object['create'](Sprite['prototype']),Sprite_NewLabel[_0x4ca968('0x27')]['constructor']=Sprite_NewLabel,Sprite_NewLabel[_0x4ca968('0x27')]['initialize']=function(){const _0x1a86d8=_0x4ca968;Sprite[_0x1a86d8('0x27')]['initialize']['call'](this),this[_0x1a86d8('0x2d8')]();},Sprite_NewLabel[_0x4ca968('0x27')][_0x4ca968('0x2d8')]=function(){const _0x4f3fe8=_0x4ca968,_0x31cc52=ImageManager[_0x4f3fe8('0x240')],_0x530892=ImageManager[_0x4f3fe8('0x1c0')];this[_0x4f3fe8('0x141')]=new Bitmap(_0x31cc52,_0x530892),this[_0x4f3fe8('0x30f')](),this[_0x4f3fe8('0x395')]();},Sprite_NewLabel[_0x4ca968('0x27')][_0x4ca968('0x30f')]=function(){const _0x22ef1f=_0x4ca968,_0x2db8e4=VisuMZ['ItemsEquipsCore']['Settings']['New'][_0x22ef1f('0x2b8')];if(_0x2db8e4<=0x0)return;const _0x55a175=ImageManager[_0x22ef1f('0x107')](_0x22ef1f('0x151')),_0x1c0f2e=ImageManager['iconWidth'],_0x4a68cc=ImageManager['iconHeight'],_0x382d88=_0x2db8e4%0x10*_0x1c0f2e,_0x4fc1e8=Math['floor'](_0x2db8e4/0x10)*_0x4a68cc;this[_0x22ef1f('0x141')]['blt'](_0x55a175,_0x382d88,_0x4fc1e8,_0x1c0f2e,_0x4a68cc,0x0,0x0);},Sprite_NewLabel[_0x4ca968('0x27')][_0x4ca968('0x395')]=function(){const _0x40aeae=_0x4ca968,_0x61bb67=VisuMZ[_0x40aeae('0x40c')][_0x40aeae('0x3af')][_0x40aeae('0x1f9')],_0x3635b6=_0x61bb67['Text'];if(_0x3635b6==='')return;const _0x430df5=ImageManager['iconWidth'],_0x48f550=ImageManager[_0x40aeae('0x1c0')];this[_0x40aeae('0x141')][_0x40aeae('0x3bf')]=_0x61bb67['FontFace']||$gameSystem[_0x40aeae('0x9')](),this['bitmap'][_0x40aeae('0x3eb')]=this[_0x40aeae('0x323')](),this[_0x40aeae('0x141')][_0x40aeae('0xa')]=_0x61bb67[_0x40aeae('0x293')],this[_0x40aeae('0x141')][_0x40aeae('0x2c5')](_0x3635b6,0x0,_0x48f550/0x2,_0x430df5,_0x48f550/0x2,_0x40aeae('0x23'));},Sprite_NewLabel[_0x4ca968('0x27')][_0x4ca968('0x323')]=function(){const _0x291dbb=_0x4ca968,_0x2ee27b=VisuMZ[_0x291dbb('0x40c')][_0x291dbb('0x3af')][_0x291dbb('0x1f9')][_0x291dbb('0xd8')];return _0x2ee27b[_0x291dbb('0x1e5')](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x291dbb('0x3eb')](_0x2ee27b);},Window_Base[_0x4ca968('0x27')][_0x4ca968('0x2f8')]=function(_0x2dcbdb,_0x1aa2ef,_0x214568,_0xf73c0e){const _0x102f85=_0x4ca968;if(_0x2dcbdb){const _0x313f3c=_0x214568+(this[_0x102f85('0x5b')]()-ImageManager[_0x102f85('0x1c0')])/0x2,_0x5d4a12=ImageManager[_0x102f85('0x240')]+0x4,_0x30a15b=Math[_0x102f85('0x358')](0x0,_0xf73c0e-_0x5d4a12);this[_0x102f85('0x1d6')](ColorManager[_0x102f85('0x183')](_0x2dcbdb)),this[_0x102f85('0x298')](_0x2dcbdb['iconIndex'],_0x1aa2ef,_0x313f3c),this[_0x102f85('0x2c5')](_0x2dcbdb[_0x102f85('0x25e')],_0x1aa2ef+_0x5d4a12,_0x214568,_0x30a15b),this['resetTextColor']();}},Window_Base[_0x4ca968('0x27')]['drawItemNumber']=function(_0xf34bc4,_0x38dca9,_0x305c8c,_0x4afecb){const _0x4206c5=_0x4ca968;if(this[_0x4206c5('0x10')](_0xf34bc4)){this[_0x4206c5('0x2e1')]();const _0x27cffa=VisuMZ[_0x4206c5('0x40c')][_0x4206c5('0x3af')][_0x4206c5('0x23c')],_0x158b76=_0x27cffa[_0x4206c5('0x3d1')],_0x3b5531=_0x158b76[_0x4206c5('0x43e')]($gameParty['numItems'](_0xf34bc4));this[_0x4206c5('0x382')][_0x4206c5('0xa')]=_0x27cffa[_0x4206c5('0xdc')],this[_0x4206c5('0x2c5')](_0x3b5531,_0x38dca9,_0x305c8c,_0x4afecb,_0x4206c5('0x3a4')),this[_0x4206c5('0x2e1')]();}},Window_Base[_0x4ca968('0x27')][_0x4ca968('0x10')]=function(_0x2717f1){const _0x20512b=_0x4ca968;if(DataManager['isKeyItem'](_0x2717f1))return $dataSystem[_0x20512b('0x345')];return!![];},Window_Base[_0x4ca968('0x27')][_0x4ca968('0x312')]=function(_0x14b326,_0x3e41af,_0x207ce0,_0x2246b5,_0x4f0f0c){const _0x311b8b=_0x4ca968;_0x4f0f0c=Math[_0x311b8b('0x358')](_0x4f0f0c||0x1,0x1);while(_0x4f0f0c--){_0x2246b5=_0x2246b5||this[_0x311b8b('0x5b')](),this['contentsBack']['paintOpacity']=0xa0;const _0x5ef78a=ColorManager[_0x311b8b('0x378')]();this['contentsBack'][_0x311b8b('0x315')](_0x14b326+0x1,_0x3e41af+0x1,_0x207ce0-0x2,_0x2246b5-0x2,_0x5ef78a),this['contentsBack']['paintOpacity']=0xff;}},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x30')]=Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x1f7')],Window_Selectable[_0x4ca968('0x27')]['initialize']=function(_0x34c1d0){const _0x13e303=_0x4ca968;this[_0x13e303('0x27f')](),VisuMZ[_0x13e303('0x40c')]['Window_Selectable_initialize'][_0x13e303('0x38f')](this,_0x34c1d0);},Window_Selectable[_0x4ca968('0x27')]['initNewLabelSprites']=function(){const _0xeb054=_0x4ca968;this[_0xeb054('0x2e8')]={},this[_0xeb054('0x66')]=0xff,this[_0xeb054('0x2d7')]=VisuMZ['ItemsEquipsCore'][_0xeb054('0x3af')][_0xeb054('0x1f9')][_0xeb054('0x105')],this[_0xeb054('0x3bb')]=VisuMZ[_0xeb054('0x40c')][_0xeb054('0x3af')]['New'][_0xeb054('0x13')];},Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x342')]=function(){return![];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0xd5')]=Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x338')],Window_Selectable[_0x4ca968('0x27')]['setHelpWindowItem']=function(_0x2d07ce){const _0x211328=_0x4ca968;VisuMZ[_0x211328('0x40c')][_0x211328('0xd5')]['call'](this,_0x2d07ce);if(this[_0x211328('0x342')]())this[_0x211328('0x309')](_0x2d07ce);},Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x309')]=function(_0x2427d6){const _0x3d8a25=_0x4ca968;if(!_0x2427d6)return;$gameParty[_0x3d8a25('0x371')](_0x2427d6);let _0x566391='';if(DataManager[_0x3d8a25('0x1d7')](_0x2427d6)){if(_0x3d8a25('0x31a')===_0x3d8a25('0x31a'))_0x566391=_0x3d8a25('0x185')[_0x3d8a25('0x43e')](_0x2427d6['id']);else{function _0x5d375e(){const _0x475dd0=_0x3d8a25;this[_0x475dd0('0x2ac')][_0x475dd0('0x369')]();}}}else{if(DataManager[_0x3d8a25('0xd3')](_0x2427d6)){if(_0x3d8a25('0xf6')!=='EKWaB')_0x566391=_0x3d8a25('0xd1')[_0x3d8a25('0x43e')](_0x2427d6['id']);else{function _0x1ee297(){const _0x49273f=_0x3d8a25;this[_0x49273f('0x1c9')]['deactivate']();}}}else{if(DataManager[_0x3d8a25('0x19d')](_0x2427d6)){if(_0x3d8a25('0x178')===_0x3d8a25('0x2cf')){function _0x1969e2(){return 0x0;}}else _0x566391=_0x3d8a25('0x164')[_0x3d8a25('0x43e')](_0x2427d6['id']);}else return;}}const _0x524708=this['_newLabelSprites'][_0x566391];if(_0x524708)_0x524708['hide']();},VisuMZ[_0x4ca968('0x40c')]['Window_Selectable_refresh']=Window_Selectable[_0x4ca968('0x27')]['refresh'],Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x42d')]=function(){const _0x21c4ff=_0x4ca968;this[_0x21c4ff('0x42e')](),VisuMZ[_0x21c4ff('0x40c')]['Window_Selectable_refresh'][_0x21c4ff('0x38f')](this);},Window_Selectable[_0x4ca968('0x27')]['hideNewLabelSprites']=function(){const _0x268629=_0x4ca968;for(const _0x259a4f of Object[_0x268629('0x17f')](this[_0x268629('0x2e8')])){_0x259a4f[_0x268629('0xc7')]();}},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x386')]=Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x114')],Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x114')]=function(){const _0x4bd4e2=_0x4ca968;this[_0x4bd4e2('0x2dd')](),VisuMZ[_0x4bd4e2('0x40c')]['Window_Selectable_update'][_0x4bd4e2('0x38f')](this);},Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x2dd')]=function(){const _0x6cd53a=_0x4ca968;if(!this[_0x6cd53a('0x342')]())return;const _0x5f3ec4=this[_0x6cd53a('0x3bb')];this[_0x6cd53a('0x66')]+=this[_0x6cd53a('0x2d7')];if(this[_0x6cd53a('0x66')]>=_0x5f3ec4||this[_0x6cd53a('0x66')]<=0x0){if(_0x6cd53a('0x80')==='vtQrA'){function _0x209594(){const _0x4f2c1e=_0x6cd53a;_0x494deb[_0x4f2c1e('0x40c')][_0x4f2c1e('0x22e')][_0x4f2c1e('0x38f')](this),this[_0x4f2c1e('0x3ab')]();}}else this['_newLabelOpacityChange']*=-0x1;}this['_newLabelOpacity']=this[_0x6cd53a('0x66')][_0x6cd53a('0x391')](0x0,_0x5f3ec4);for(const _0x1164a2 of Object[_0x6cd53a('0x17f')](this[_0x6cd53a('0x2e8')])){_0x1164a2['opacity']=this['_newLabelOpacity'];}},Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x400')]=function(_0x48d7bd){const _0x1e17c0=_0x4ca968,_0x5becdd=this[_0x1e17c0('0x2e8')];if(_0x5becdd[_0x48d7bd])return _0x5becdd[_0x48d7bd];else{if('cexgG'==='kdqgd'){function _0x371f72(){const _0x144da4=_0x1e17c0;return _0xc46dc8[_0x144da4('0x40c')][_0x144da4('0x3af')]['StatusWindow']['SpeedNeg2000'];}}else{const _0x463ed3=new Sprite_NewLabel();return _0x5becdd[_0x48d7bd]=_0x463ed3,this[_0x1e17c0('0x361')](_0x463ed3),_0x463ed3;}}},Window_Selectable[_0x4ca968('0x27')][_0x4ca968('0x3cb')]=function(_0x34bc2b,_0x2806e5,_0x22345b){const _0x5e25c7=_0x4ca968;let _0x2ec07d='';if(DataManager[_0x5e25c7('0x1d7')](_0x34bc2b))_0x2ec07d='item-%1'[_0x5e25c7('0x43e')](_0x34bc2b['id']);else{if(DataManager[_0x5e25c7('0xd3')](_0x34bc2b)){if(_0x5e25c7('0x101')===_0x5e25c7('0x17c')){function _0x180052(){return!![];}}else _0x2ec07d='weapon-%1'[_0x5e25c7('0x43e')](_0x34bc2b['id']);}else{if(DataManager['isArmor'](_0x34bc2b))_0x2ec07d=_0x5e25c7('0x164')[_0x5e25c7('0x43e')](_0x34bc2b['id']);else return;}}const _0x127fc5=this[_0x5e25c7('0x400')](_0x2ec07d);_0x127fc5[_0x5e25c7('0x269')](_0x2806e5,_0x22345b),_0x127fc5[_0x5e25c7('0x369')](),_0x127fc5[_0x5e25c7('0x410')]=this[_0x5e25c7('0x66')];},Window_ItemCategory['categoryList']=VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x3af')]['Categories'][_0x4ca968('0x144')],Window_ItemCategory[_0x4ca968('0x3fd')]=[_0x4ca968('0x260'),_0x4ca968('0x1f2'),_0x4ca968('0x39b'),_0x4ca968('0x21a'),'Consumable','AlwaysUsable','BattleUsable',_0x4ca968('0x14f'),_0x4ca968('0x304')],VisuMZ['ItemsEquipsCore'][_0x4ca968('0x12c')]=Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x1f7')],Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x1f7')]=function(_0xd369bf){const _0x4e9601=_0x4ca968;VisuMZ[_0x4e9601('0x40c')][_0x4e9601('0x12c')][_0x4e9601('0x38f')](this,_0xd369bf),this[_0x4e9601('0x22')](_0xd369bf);},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x22')]=function(_0x35fb29){const _0x265943=_0x4ca968,_0x14c2f9=new Rectangle(0x0,0x0,_0x35fb29['width'],_0x35fb29[_0x265943('0x3e2')]);this[_0x265943('0xa5')]=new Window_Base(_0x14c2f9),this[_0x265943('0xa5')][_0x265943('0x410')]=0x0,this['addChild'](this['_categoryNameWindow']),this[_0x265943('0x1f4')]();},Window_ItemCategory[_0x4ca968('0x27')]['isUseModernControls']=function(){const _0x2e89de=_0x4ca968;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype'][_0x2e89de('0xb')][_0x2e89de('0x38f')](this);},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x332')]=function(){const _0x2f8e93=_0x4ca968;if(!this[_0x2f8e93('0xb')]())Window_HorzCommand[_0x2f8e93('0x27')][_0x2f8e93('0x332')][_0x2f8e93('0x38f')](this);},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x29c')]=function(){const _0x47f007=_0x4ca968;return this[_0x47f007('0xff')]?this[_0x47f007('0x1ae')]():0x4;},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x114')]=function(){const _0x1a8bc9=_0x4ca968;Window_HorzCommand[_0x1a8bc9('0x27')]['update'][_0x1a8bc9('0x38f')](this),this['_itemWindow']&&this[_0x1a8bc9('0x1a2')][_0x1a8bc9('0x274')](this[_0x1a8bc9('0x202')]());},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x3e0')]=function(){const _0x4a7d4e=_0x4ca968;if(this['isCursorMovable']()){if(_0x4a7d4e('0x1fb')!=='JCSVd'){const _0x4f90d7=this[_0x4a7d4e('0x38b')]();if(this[_0x4a7d4e('0x1a2')]&&this['_itemWindow']['maxCols']()<=0x1)Input[_0x4a7d4e('0x6b')]('right')&&this[_0x4a7d4e('0x435')](Input[_0x4a7d4e('0x397')](_0x4a7d4e('0x3a4'))),Input['isRepeated'](_0x4a7d4e('0x291'))&&this[_0x4a7d4e('0xaa')](Input[_0x4a7d4e('0x397')](_0x4a7d4e('0x291')));else{if(this[_0x4a7d4e('0x1a2')]&&this['_itemWindow'][_0x4a7d4e('0x29c')]()>0x1){if('dmEce'!=='DzTpr'){if(Input[_0x4a7d4e('0x6b')](_0x4a7d4e('0x3ec'))&&!Input[_0x4a7d4e('0x1da')](_0x4a7d4e('0xc4'))){if(_0x4a7d4e('0x28a')===_0x4a7d4e('0x15f')){function _0x209d14(){const _0x344353=_0x4a7d4e;if(this[_0x344353('0x1c6')]&&this['_numberWindow'][_0x344353('0x1cb')])return _0x2a4153[_0x344353('0x31b')]('up',_0x344353('0x2cd'));return _0x498d65[_0x344353('0x27')][_0x344353('0x163')][_0x344353('0x38f')](this);}}else this[_0x4a7d4e('0x435')](Input[_0x4a7d4e('0x397')]('pagedown'));}Input[_0x4a7d4e('0x6b')](_0x4a7d4e('0xf7'))&&!Input[_0x4a7d4e('0x1da')](_0x4a7d4e('0xc4'))&&this[_0x4a7d4e('0xaa')](Input['isTriggered'](_0x4a7d4e('0xf7')));}else{function _0xa40ab4(){const _0xf67081=_0x4a7d4e,_0x2dd858=_0x38b665[_0x3233f1];if(_0x2dd858&&_0x2dd858[_0xf67081('0xb0')]>0x0){_0x28d31c+=_0xf67081('0x57')[_0xf67081('0x43e')](_0x2dd858[_0xf67081('0xb0')]),_0x2a9a1d++;if(_0x25341f>=_0x17f89c)return _0x42777f;}}}}}this[_0x4a7d4e('0x38b')]()!==_0x4f90d7&&this[_0x4a7d4e('0xa9')]();}else{function _0x190ec6(){const _0x60189b=_0x4a7d4e;_0x2e3def[_0x60189b('0x27')][_0x60189b('0x263')][_0x60189b('0x38f')](this,_0xe97bdb,_0x46581a,_0xcb4111,_0x4c7762);}}}},Window_ItemCategory[_0x4ca968('0x27')]['processHandling']=function(){const _0x2a2dc7=_0x4ca968;if(this[_0x2a2dc7('0xb')]())return;Window_HorzCommand[_0x2a2dc7('0x27')][_0x2a2dc7('0x302')]['call'](this);},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x189')]=function(){const _0x3824f9=_0x4ca968;return this['isUseModernControls']()?![]:Window_HorzCommand[_0x3824f9('0x27')]['isHoverEnabled'][_0x3824f9('0x38f')](this);},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x3d3')]=function(){const _0x3f4831=_0x4ca968;if(this[_0x3f4831('0x32b')]()){if(_0x3f4831('0x1a7')!==_0x3f4831('0x1a7')){function _0x5a05fe(){const _0x2d5c68=_0x3f4831;_0x10f006['ItemsEquipsCore'][_0x2d5c68('0x13d')]['call'](this),this['isUseModernControls']()&&(this['_commandWindow'][_0x2d5c68('0x415')](),this[_0x2d5c68('0x436')][_0x2d5c68('0x3c')](),this['_slotWindow'][_0x2d5c68('0x2df')](0x0),this[_0x2d5c68('0x190')][_0x2d5c68('0x1be')]());}}else{if(TouchInput[_0x3f4831('0x397')]()){if('gBUAQ'===_0x3f4831('0x62')){function _0x147060(){const _0x5f3044=_0x3f4831,_0x218757=this[_0x5f3044('0x15e')](),_0x5eb9c3=this['_itemWindow'][_0x5f3044('0x3e2')],_0x3bc485=this[_0x5f3044('0x2a1')]()?0x0:_0x417a6b['boxWidth']-this[_0x5f3044('0x15e')](),_0xbc2346=this[_0x5f3044('0x1a2')]['y'];return new _0x4b43e8(_0x3bc485,_0xbc2346,_0x218757,_0x5eb9c3);}}else this[_0x3f4831('0x3ad')](!![]);}if(TouchInput[_0x3f4831('0x353')]()){if('wmoqS'!==_0x3f4831('0x273'))this[_0x3f4831('0x88')]();else{function _0x2cb619(){return 0x16;}}}else TouchInput[_0x3f4831('0x1bf')]()&&this[_0x3f4831('0x47')]();}}},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x3ad')]=function(_0x74ab30){const _0x10557f=_0x4ca968;if(this['isUseModernControls']())this[_0x10557f('0x1a4')](!![]);else{if(_0x10557f('0xbc')===_0x10557f('0xbc'))Window_HorzCommand[_0x10557f('0x27')][_0x10557f('0x3ad')]['call'](this,_0x74ab30);else{function _0x3cfbc3(){const _0x28a4fe=_0x10557f;if(_0x5a9ea6===_0x3a0567)return;if(_0x36427e[_0x28a4fe('0x283')][_0x28a4fe('0x1e5')](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x2dcf38=_0x225d66(_0x1acb7d['$1']),_0x8e106d=(_0x1fd675===_0x2b5a56?_0x28a4fe('0x3ba'):_0x28a4fe('0x364'))['format'](_0x159b9a['id']),_0x673bc3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'[_0x28a4fe('0x43e')](_0x2dcf38);for(let _0x497402=0x0;_0x497402<0x8;_0x497402++){if(_0x2dcf38['match'](_0x3e221d['ItemsEquipsCore'][_0x28a4fe('0x120')][_0x28a4fe('0x31d')][_0x497402])){const _0x354bd8=_0x28a4fe('0x3ae')[_0x28a4fe('0x43e')](_0x8e106d,_0x497402);_0x2901da[_0x28a4fe('0x40c')]['paramJS'][_0x354bd8]=new _0xf0104b(_0x28a4fe('0x2b5'),'paramId',_0x673bc3);}}}}}}},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x1a4')]=function(_0x3eb3a8){const _0x7666e9=_0x4ca968;this[_0x7666e9('0x3b5')]=![];if(this[_0x7666e9('0x212')]()){const _0x188566=this[_0x7666e9('0x38b')](),_0x8fb12a=this['hitIndex']();if(_0x8fb12a>=0x0&&_0x8fb12a!==this[_0x7666e9('0x38b')]()){if(_0x7666e9('0x34d')===_0x7666e9('0x34d'))this[_0x7666e9('0x37')](_0x8fb12a);else{function _0x1dcbe7(){const _0x538b0c=_0x7666e9;_0x39d28b['isPressed']('shift')?this[_0x538b0c('0x53')]():this[_0x538b0c('0x1c2')](_0x439dd5[_0x538b0c('0x397')]('up'));}}}_0x3eb3a8&&this[_0x7666e9('0x38b')]()!==_0x188566&&this[_0x7666e9('0xa9')]();}},Window_ItemCategory['prototype']['makeCommandList']=function(){const _0x3b8d02=_0x4ca968;for(const _0x5cd640 of Window_ItemCategory[_0x3b8d02('0x205')]){if(_0x3b8d02('0x31e')===_0x3b8d02('0xc2')){function _0x21578e(){const _0x3794b3=_0x3b8d02;for(const _0x18396c of _0x3b25c4['categoryList']){this[_0x3794b3('0xed')](_0x18396c);}this[_0x3794b3('0x37')](this[_0x3794b3('0x38b')]());}}else this[_0x3b8d02('0xed')](_0x5cd640);}this['select'](this[_0x3b8d02('0x38b')]());},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0xed')]=function(_0x33c562){const _0x5e12c3=_0x4ca968,_0x13bb6c=_0x33c562[_0x5e12c3('0xa7')],_0x19a5fd=_0x33c562[_0x5e12c3('0x2b8')];let _0x5bacde='',_0x434c66='category',_0x1c5998=_0x13bb6c;if(_0x13bb6c[_0x5e12c3('0x1e5')](/Category:(.*)/i))_0x5bacde=String(RegExp['$1'])[_0x5e12c3('0x3c3')]();else{if(Window_ItemCategory[_0x5e12c3('0x3fd')][_0x5e12c3('0x16c')](_0x13bb6c))_0x5bacde=VisuMZ[_0x5e12c3('0x40c')]['Settings'][_0x5e12c3('0x1f6')][_0x13bb6c];else{if([_0x5e12c3('0x260'),'RegularItems'][_0x5e12c3('0x16c')](_0x13bb6c))_0x5bacde=TextManager['item'];else{if(_0x13bb6c===_0x5e12c3('0x44'))_0x5bacde=TextManager[_0x5e12c3('0x20c')];else{if(_0x13bb6c===_0x5e12c3('0x14e'))_0x5bacde=TextManager['weapon'];else{if(_0x13bb6c===_0x5e12c3('0x2d'))_0x5bacde=TextManager[_0x5e12c3('0x265')];else{if(_0x13bb6c[_0x5e12c3('0x1e5')](/WTYPE:(\d+)/i))_0x5bacde=$dataSystem['weaponTypes'][Number(RegExp['$1'])]||'';else{if(_0x13bb6c[_0x5e12c3('0x1e5')](/ATYPE:(\d+)/i))_0x5bacde=$dataSystem[_0x5e12c3('0x213')][Number(RegExp['$1'])]||'';else _0x13bb6c[_0x5e12c3('0x1e5')](/ETYPE:(\d+)/i)&&(_0x5bacde=$dataSystem[_0x5e12c3('0x285')][Number(RegExp['$1'])]||'');}}}}}}}if(_0x19a5fd>0x0&&this[_0x5e12c3('0x129')]()!==_0x5e12c3('0x26f')){if(_0x5e12c3('0x165')!==_0x5e12c3('0x165')){function _0x2541cc(){const _0x29e937=_0x5e12c3;return this[_0x29e937('0x264')]()[_0x29e937('0x1e5')](/RIGHT/i);}}else _0x5bacde=_0x5e12c3('0x2b7')[_0x5e12c3('0x43e')](_0x19a5fd,_0x5bacde);}this[_0x5e12c3('0x56')](_0x5bacde,_0x434c66,!![],_0x1c5998);},Window_ItemCategory['prototype'][_0x4ca968('0x10b')]=function(){const _0x38afc8=_0x4ca968;return VisuMZ[_0x38afc8('0x40c')]['Settings'][_0x38afc8('0x1f6')][_0x38afc8('0x2f6')];},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x1e1')]=function(_0x2105c3){const _0x2701d8=_0x4ca968,_0x2d103f=this[_0x2701d8('0xbd')](_0x2105c3);if(_0x2d103f==='iconText'){if(_0x2701d8('0x149')!==_0x2701d8('0x2bb'))this[_0x2701d8('0x2a8')](_0x2105c3);else{function _0x417032(){const _0x217c0b=_0x2701d8,_0x2d450d=_0x33d52a[_0x217c0b('0x40c')]['Settings']['StatusWindow'][_0x217c0b('0xc6')];return _0x2d450d[_0x217c0b('0x43e')](_0xc52bae['tp']);}}}else{if(_0x2d103f===_0x2701d8('0x290'))this['drawItemStyleIcon'](_0x2105c3);else{if(_0x2701d8('0x227')!==_0x2701d8('0x3b9'))Window_HorzCommand[_0x2701d8('0x27')][_0x2701d8('0x1e1')][_0x2701d8('0x38f')](this,_0x2105c3);else{function _0x47a320(){const _0x89fda8=_0x2701d8,_0x2d869c=this['itemLineRect'](_0x3e0ce6),_0xbf0f1a=this[_0x89fda8('0x147')](_0x25f088),_0x341d44=this[_0x89fda8('0x143')](_0xbf0f1a)['width'];this[_0x89fda8('0x1b4')](this[_0x89fda8('0x2d0')](_0x17a083));const _0x48c6d9=this[_0x89fda8('0x10b')]();if(_0x48c6d9===_0x89fda8('0x3a4'))this['drawTextEx'](_0xbf0f1a,_0x2d869c['x']+_0x2d869c[_0x89fda8('0x30e')]-_0x341d44,_0x2d869c['y'],_0x341d44);else{if(_0x48c6d9===_0x89fda8('0x23')){const _0x1398d3=_0x2d869c['x']+_0x2c6b7b[_0x89fda8('0x3f3')]((_0x2d869c['width']-_0x341d44)/0x2);this[_0x89fda8('0x148')](_0xbf0f1a,_0x1398d3,_0x2d869c['y'],_0x341d44);}else this['drawTextEx'](_0xbf0f1a,_0x2d869c['x'],_0x2d869c['y'],_0x341d44);}}}}}},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x129')]=function(){const _0x329e69=_0x4ca968;return VisuMZ[_0x329e69('0x40c')][_0x329e69('0x3af')][_0x329e69('0x1f6')][_0x329e69('0x28b')];},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0xbd')]=function(_0x4eb986){const _0x16d1e8=_0x4ca968;if(_0x4eb986<0x0)return _0x16d1e8('0x26f');const _0x462949=this['categoryStyle']();if(_0x462949!==_0x16d1e8('0x317'))return _0x462949;else{const _0x19bdac=this[_0x16d1e8('0x147')](_0x4eb986);if(_0x19bdac['match'](/\\I\[(\d+)\]/i)){const _0x5df4ed=this['itemLineRect'](_0x4eb986),_0x4e78bb=this[_0x16d1e8('0x143')](_0x19bdac)[_0x16d1e8('0x30e')];return _0x4e78bb<=_0x5df4ed[_0x16d1e8('0x30e')]?'iconText':_0x16d1e8('0x290');}else{if(_0x16d1e8('0x35c')===_0x16d1e8('0x1d2')){function _0x356c2e(){const _0x583ce9=_0x16d1e8;return _0x35a84a[_0x583ce9('0x40c')]['Settings'][_0x583ce9('0xc')][_0x583ce9('0x175')];}}else return _0x16d1e8('0x26f');}}},Window_ItemCategory['prototype'][_0x4ca968('0x2a8')]=function(_0x15a695){const _0x55c62d=_0x4ca968,_0x312d58=this[_0x55c62d('0x9e')](_0x15a695),_0x2e18bf=this[_0x55c62d('0x147')](_0x15a695),_0x5a3e32=this[_0x55c62d('0x143')](_0x2e18bf)[_0x55c62d('0x30e')];this[_0x55c62d('0x1b4')](this['isCommandEnabled'](_0x15a695));const _0x5aa14b=this['itemTextAlign']();if(_0x5aa14b===_0x55c62d('0x3a4'))this[_0x55c62d('0x148')](_0x2e18bf,_0x312d58['x']+_0x312d58['width']-_0x5a3e32,_0x312d58['y'],_0x5a3e32);else{if(_0x5aa14b===_0x55c62d('0x23')){const _0x2259c6=_0x312d58['x']+Math[_0x55c62d('0x3f3')]((_0x312d58[_0x55c62d('0x30e')]-_0x5a3e32)/0x2);this['drawTextEx'](_0x2e18bf,_0x2259c6,_0x312d58['y'],_0x5a3e32);}else this[_0x55c62d('0x148')](_0x2e18bf,_0x312d58['x'],_0x312d58['y'],_0x5a3e32);}},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x45')]=function(_0x1d8220){const _0x4a8a1d=_0x4ca968;this['commandName'](_0x1d8220)['match'](/\\I\[(\d+)\]/i);const _0x5e260d=Number(RegExp['$1'])||0x0,_0x1ce20a=this[_0x4a8a1d('0x9e')](_0x1d8220),_0x136203=_0x1ce20a['x']+Math[_0x4a8a1d('0x3f3')]((_0x1ce20a['width']-ImageManager[_0x4a8a1d('0x240')])/0x2),_0x7b050f=_0x1ce20a['y']+(_0x1ce20a['height']-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x5e260d,_0x136203,_0x7b050f);},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x2a4')]=Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x1cf')],Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x1cf')]=function(_0x183ac4){const _0x91cbcb=_0x4ca968;VisuMZ['ItemsEquipsCore'][_0x91cbcb('0x2a4')][_0x91cbcb('0x38f')](this,_0x183ac4),_0x183ac4[_0x91cbcb('0x1c9')]=this;},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x33f')]=function(){const _0x4102ed=_0x4ca968;Window_HorzCommand[_0x4102ed('0x27')][_0x4102ed('0x33f')][_0x4102ed('0x38f')](this);if(this[_0x4102ed('0xa5')])this[_0x4102ed('0x1f4')]();},Window_ItemCategory[_0x4ca968('0x27')]['updateCategoryNameWindow']=function(){const _0x1f3178=_0x4ca968,_0x4af32d=this[_0x1f3178('0xa5')];_0x4af32d[_0x1f3178('0x382')][_0x1f3178('0x86')]();const _0x17a0c2=this[_0x1f3178('0xbd')](this['index']());if(_0x17a0c2===_0x1f3178('0x290')){const _0x1632ae=this[_0x1f3178('0x9e')](this[_0x1f3178('0x38b')]());let _0x2e8bba=this[_0x1f3178('0x147')](this[_0x1f3178('0x38b')]());_0x2e8bba=_0x2e8bba[_0x1f3178('0x13e')](/\\I\[(\d+)\]/gi,''),_0x4af32d[_0x1f3178('0x2e1')](),this['categoryNameWindowDrawBackground'](_0x2e8bba,_0x1632ae),this[_0x1f3178('0x3e9')](_0x2e8bba,_0x1632ae),this[_0x1f3178('0x402')](_0x2e8bba,_0x1632ae);}},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x209')]=function(_0x277629,_0x13053f){},Window_ItemCategory[_0x4ca968('0x27')][_0x4ca968('0x3e9')]=function(_0x46b0db,_0x345116){const _0xd7bb0b=_0x4ca968,_0x3ce13f=this[_0xd7bb0b('0xa5')];_0x3ce13f[_0xd7bb0b('0x2c5')](_0x46b0db,0x0,_0x345116['y'],_0x3ce13f[_0xd7bb0b('0x3a6')],_0xd7bb0b('0x23'));},Window_ItemCategory[_0x4ca968('0x27')]['categoryNameWindowCenter']=function(_0x478437,_0x324a52){const _0xe0bf35=_0x4ca968,_0x8ef719=this[_0xe0bf35('0xa5')],_0x538db2=$gameSystem[_0xe0bf35('0x313')](),_0x9e4bd6=_0x324a52['x']+Math[_0xe0bf35('0x3f3')](_0x324a52[_0xe0bf35('0x30e')]/0x2)+_0x538db2;_0x8ef719['x']=_0x8ef719[_0xe0bf35('0x30e')]/-0x2+_0x9e4bd6,_0x8ef719['y']=Math[_0xe0bf35('0x3f3')](_0x324a52[_0xe0bf35('0x3e2')]/0x2);},Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x3e0')]=function(){const _0x403c0d=_0x4ca968;if(this['isCursorMovable']()){const _0x1ce0dd=this['index']();if(this[_0x403c0d('0x29c')]()<=0x1){if(_0x403c0d('0x6f')!==_0x403c0d('0x6f')){function _0x321b8c(){const _0x218f44=_0x403c0d;this[_0x218f44('0x436')][_0x218f44('0x3c')](),this[_0x218f44('0x436')][_0x218f44('0x415')]();}}else!this[_0x403c0d('0x347')]('pagedown')&&Input[_0x403c0d('0x397')](_0x403c0d('0x3ec'))&&this[_0x403c0d('0x21d')](),!this[_0x403c0d('0x347')](_0x403c0d('0xf7'))&&Input[_0x403c0d('0x397')](_0x403c0d('0xf7'))&&this[_0x403c0d('0x53')]();}else{if(this[_0x403c0d('0x29c')]()>0x1){if(_0x403c0d('0x3bd')===_0x403c0d('0x3bd')){Input['isRepeated'](_0x403c0d('0x3a4'))&&this[_0x403c0d('0x435')](Input['isTriggered'](_0x403c0d('0x3a4')));Input[_0x403c0d('0x6b')](_0x403c0d('0x291'))&&this[_0x403c0d('0xaa')](Input[_0x403c0d('0x397')](_0x403c0d('0x291')));if(this[_0x403c0d('0xab')]()){if(_0x403c0d('0x4f')===_0x403c0d('0x4f')){Input[_0x403c0d('0x397')](_0x403c0d('0x3ec'))&&Input[_0x403c0d('0x1da')](_0x403c0d('0xc4'))&&this[_0x403c0d('0x21d')]();if(Input[_0x403c0d('0x397')](_0x403c0d('0xf7'))&&Input[_0x403c0d('0x1da')](_0x403c0d('0xc4'))){if(_0x403c0d('0x296')!==_0x403c0d('0x126'))this[_0x403c0d('0x53')]();else{function _0x22557e(){const _0x2fa4c3=_0x403c0d;if(!this[_0x2fa4c3('0x1b6')]()&&!_0x4273af['isItem'](this[_0x2fa4c3('0x257')]))return;const _0x22cd1a=this['innerWidth']-this['itemPadding']()-_0x30a9f5,_0xe19a82=this[_0x2fa4c3('0x26e')](_0x2fa4c3('0x118'));this[_0x2fa4c3('0x1d6')](_0x40721e[_0x2fa4c3('0x249')]()),this[_0x2fa4c3('0x2c5')](_0x45ebbb[_0x2fa4c3('0x42a')],_0x51e6f0+this['itemPadding'](),_0x10b1dd,_0x22cd1a-_0xe19a82),this['resetTextColor'](),this[_0x2fa4c3('0x263')](this[_0x2fa4c3('0x257')],_0x3279eb,_0x434be4,_0x22cd1a);}}}}else{function _0xb710bd(){const _0x946e8b=_0x403c0d,_0x10f5a0=_0x55ec6f[_0x946e8b('0x35b')]('['+_0x4fc246['$1']['match'](/\d+/g)+']');for(const _0x1f13f6 of _0x10f5a0){if(_0x163e5a['value'](_0x1f13f6))return![];}return!![];}}}else{if(_0x403c0d('0x193')===_0x403c0d('0x193')){Input[_0x403c0d('0x397')](_0x403c0d('0x3ec'))&&this[_0x403c0d('0x21d')]();if(Input[_0x403c0d('0x397')](_0x403c0d('0xf7'))){if('ohAnf'!==_0x403c0d('0xe4'))this['cursorPageup']();else{function _0x7e0d28(){const _0xb7eb9f=_0x403c0d;if(!this[_0xb7eb9f('0x3a1')]())return;const _0x289d55=this[_0xb7eb9f('0x3ff')](),_0x2d14e3=_0x1a5142[_0xb7eb9f('0x40c')][_0xb7eb9f('0x3af')][_0xb7eb9f('0x112')]['CmdIconOptimize'],_0x3ca7eb=_0x289d55===_0xb7eb9f('0x26f')?_0x2369d7[_0xb7eb9f('0x321')]:'\x5cI[%1]%2'['format'](_0x2d14e3,_0x47663e['optimize']),_0x285c9a=this[_0xb7eb9f('0x69')]();this[_0xb7eb9f('0x56')](_0x3ca7eb,_0xb7eb9f('0x321'),_0x285c9a);}}}}else{function _0xbfa37e(){const _0x54e64a=_0x403c0d;_0x262ed4['isRepeated'](_0x54e64a('0x3ec'))&&!_0x345b59[_0x54e64a('0x1da')](_0x54e64a('0xc4'))&&this['cursorRight'](_0x4102a0['isTriggered'](_0x54e64a('0x3ec'))),_0x18f92b[_0x54e64a('0x6b')]('pageup')&&!_0x26f667[_0x54e64a('0x1da')](_0x54e64a('0xc4'))&&this['cursorLeft'](_0x1a728d[_0x54e64a('0x397')](_0x54e64a('0xf7')));}}}}else{function _0x3a92af(){const _0x525d04=_0x403c0d,_0x13fc87=_0x3250d4[_0x525d04('0x283')];if(_0x13fc87['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x3d5a25=_0x4c6646(_0x24db54['$1']);try{_0x51d035(_0x3d5a25);}catch(_0xd63b68){if(_0x373f97[_0x525d04('0x13f')]())_0x13cda5['log'](_0xd63b68);}}_0x298c68=_0x387fae['ItemsEquipsCore'][_0x525d04('0x3af')][_0x525d04('0xcd')][_0x525d04('0x1c4')][_0x525d04('0x38f')](this,_0x3eb66c,_0x37ab35);if(_0x13562e(_0x4fc664))_0x4b7f69=0x0;return _0x6e5af6[_0x525d04('0x3f3')](_0x292ce6);}}}}if(Input[_0x403c0d('0x6b')](_0x403c0d('0x2cd'))){if(Input[_0x403c0d('0x1da')](_0x403c0d('0xc4'))){if(_0x403c0d('0xe9')===_0x403c0d('0xcc')){function _0xcb2e00(){const _0x2b87c8=_0x403c0d;if(_0x4dd36d){const _0x32a904=_0x5840e7+(this[_0x2b87c8('0x5b')]()-_0xf57fd1[_0x2b87c8('0x1c0')])/0x2,_0xfb79be=_0x34698a['iconWidth']+0x4,_0x43ac04=_0x18e583[_0x2b87c8('0x358')](0x0,_0x4503ee-_0xfb79be);this[_0x2b87c8('0x1d6')](_0x3e6bbb[_0x2b87c8('0x183')](_0x32634e)),this[_0x2b87c8('0x298')](_0x4eefde[_0x2b87c8('0xb0')],_0x5b0189,_0x32a904),this[_0x2b87c8('0x2c5')](_0x20a09d[_0x2b87c8('0x25e')],_0x20bd53+_0xfb79be,_0x33a4bd,_0x43ac04),this[_0x2b87c8('0x2e4')]();}}}else this[_0x403c0d('0x21d')]();}else this['cursorDown'](Input[_0x403c0d('0x397')](_0x403c0d('0x2cd')));}if(Input['isRepeated']('up')){if(Input['isPressed'](_0x403c0d('0xc4'))){if(_0x403c0d('0x243')==='hoxLS')this[_0x403c0d('0x53')]();else{function _0x53ff19(){const _0x220b0f=_0x403c0d;return _0x1eb164[_0x220b0f('0x3e1')];}}}else this[_0x403c0d('0x1c2')](Input[_0x403c0d('0x397')]('up'));}if(Imported[_0x403c0d('0x399')]){if(_0x403c0d('0x34e')===_0x403c0d('0x23f')){function _0x590bd4(){const _0x247f72=_0x403c0d;this[_0x247f72('0x148')](_0x25275e,_0x1e9cc4['x']+_0x57c4e7[_0x247f72('0x30e')]-_0x3cc33b,_0x2f207d['y'],_0x4da2c2);}}else this[_0x403c0d('0x3a3')]();}if(this[_0x403c0d('0x38b')]()!==_0x1ce0dd){if(_0x403c0d('0x63')!==_0x403c0d('0x63')){function _0x47a928(){if(_0x4eccb7)_0x3693eb+=this['paramPlusItemsEquipsCoreCustomJS'](_0x2900c5,_0x17dcee);}}else this['playCursorSound']();}}},Window_ItemList[_0x4ca968('0x27')]['limitedPageUpDownSceneCheck']=function(){const _0x156681=_0x4ca968,_0x1d269d=SceneManager[_0x156681('0x98')],_0x2a4cb3=[Scene_Item,Scene_Shop];return _0x2a4cb3[_0x156681('0x16c')](_0x1d269d[_0x156681('0x4b')]);},Window_ItemList['prototype'][_0x4ca968('0x1be')]=function(){const _0x29aafe=_0x4ca968;Window_Selectable[_0x29aafe('0x27')]['activate'][_0x29aafe('0x38f')](this);if(this[_0x29aafe('0x1c9')]&&this[_0x29aafe('0x1c9')]['isUseModernControls']()){if(_0x29aafe('0x2e5')!==_0x29aafe('0x2e5')){function _0x34848d(){const _0x26ad92=_0x29aafe;if(!this[_0x26ad92('0x264')]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x26ad92('0x1a2')])return![];if(!this[_0x26ad92('0x1a2')][_0x26ad92('0x1cb')])return![];return this[_0x26ad92('0x264')]()&&this['isUseModernControls']();}}else this[_0x29aafe('0x1c9')][_0x29aafe('0x1be')]();}},Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x415')]=function(){const _0x128fb2=_0x4ca968;Window_Selectable[_0x128fb2('0x27')][_0x128fb2('0x415')][_0x128fb2('0x38f')](this);if(this[_0x128fb2('0x1c9')]&&this[_0x128fb2('0x1c9')][_0x128fb2('0xb')]()){if(_0x128fb2('0x43a')===_0x128fb2('0x43f')){function _0x44b3bf(){const _0x127219=_0x128fb2;this[_0x127219('0x2c5')](_0x45d249[_0x127219('0x2f')](_0x512743),_0x1628fc+_0x1f591a,_0x286fd3,_0x101b27);}}else this[_0x128fb2('0x1c9')][_0x128fb2('0x415')]();}},Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x274')]=function(_0x510cc7){const _0x1b5ea6=_0x4ca968;this['_category']!==_0x510cc7&&(this[_0x1b5ea6('0x81')]=_0x510cc7,this[_0x1b5ea6('0x42d')](),this[_0x1b5ea6('0x1c9')]&&this[_0x1b5ea6('0x1c9')][_0x1b5ea6('0xb')]()?this[_0x1b5ea6('0x2df')](0x0):this['scrollTo'](0x0,0x0));},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x138')]=Window_ItemList[_0x4ca968('0x27')]['maxCols'],Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x29c')]=function(){const _0xa1d8f2=_0x4ca968;if(SceneManager[_0xa1d8f2('0x98')][_0xa1d8f2('0x4b')]===Scene_Battle)return VisuMZ[_0xa1d8f2('0x40c')][_0xa1d8f2('0x138')][_0xa1d8f2('0x38f')](this);else return SceneManager[_0xa1d8f2('0x98')][_0xa1d8f2('0x4b')]===Scene_Map?VisuMZ['ItemsEquipsCore'][_0xa1d8f2('0x138')][_0xa1d8f2('0x38f')](this):VisuMZ[_0xa1d8f2('0x40c')]['Settings']['ItemScene'][_0xa1d8f2('0x314')];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0xde')]=Window_ItemList['prototype'][_0x4ca968('0x40f')],Window_ItemList['prototype'][_0x4ca968('0x40f')]=function(){const _0x45e1de=_0x4ca968;if(this['maxCols']()<=0x1)return Window_Selectable[_0x45e1de('0x27')][_0x45e1de('0x40f')][_0x45e1de('0x38f')](this);else{if(_0x45e1de('0x2c')===_0x45e1de('0x1a3')){function _0x481422(){const _0x565e78=_0x45e1de;return this[_0x565e78('0x244')]()?this[_0x565e78('0x29e')]():_0x7f6605[_0x565e78('0x40c')]['Settings'][_0x565e78('0x112')][_0x565e78('0x38e')];}}else return VisuMZ['ItemsEquipsCore'][_0x45e1de('0xde')]['call'](this);}},Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x16c')]=function(_0x34ff05){const _0x25cf81=_0x4ca968;switch(this['_category']){case'AllItems':return DataManager[_0x25cf81('0x1d7')](_0x34ff05);case'RegularItems':return DataManager[_0x25cf81('0x1d7')](_0x34ff05)&&_0x34ff05['itypeId']===0x1;case _0x25cf81('0x44'):return DataManager[_0x25cf81('0x1d7')](_0x34ff05)&&_0x34ff05[_0x25cf81('0x2a6')]===0x2;case _0x25cf81('0x1f2'):return DataManager[_0x25cf81('0x1d7')](_0x34ff05)&&_0x34ff05[_0x25cf81('0x2a6')]===0x3;case'HiddenItemB':return DataManager[_0x25cf81('0x1d7')](_0x34ff05)&&_0x34ff05[_0x25cf81('0x2a6')]===0x4;case'Consumable':return DataManager[_0x25cf81('0x1d7')](_0x34ff05)&&_0x34ff05[_0x25cf81('0xb7')];case _0x25cf81('0x21a'):return DataManager['isItem'](_0x34ff05)&&!_0x34ff05['consumable'];case _0x25cf81('0xdb'):return DataManager['isItem'](_0x34ff05)&&[0x0][_0x25cf81('0x16c')](_0x34ff05[_0x25cf81('0x181')]);case _0x25cf81('0x29a'):return DataManager[_0x25cf81('0x1d7')](_0x34ff05)&&[0x0,0x1]['includes'](_0x34ff05[_0x25cf81('0x181')]);case _0x25cf81('0x14f'):return DataManager[_0x25cf81('0x1d7')](_0x34ff05)&&[0x0,0x2][_0x25cf81('0x16c')](_0x34ff05[_0x25cf81('0x181')]);case _0x25cf81('0x304'):return DataManager[_0x25cf81('0x1d7')](_0x34ff05)&&[0x3][_0x25cf81('0x16c')](_0x34ff05[_0x25cf81('0x181')]);case _0x25cf81('0x14e'):return DataManager[_0x25cf81('0xd3')](_0x34ff05);case'AllArmors':return DataManager[_0x25cf81('0x19d')](_0x34ff05);default:if(this[_0x25cf81('0x81')][_0x25cf81('0x1e5')](/WTYPE:(\d+)/i)){if(_0x25cf81('0x404')==='eBAle')return DataManager[_0x25cf81('0xd3')](_0x34ff05)&&_0x34ff05[_0x25cf81('0x220')]===Number(RegExp['$1']);else{function _0x1e6a48(){const _0xcaa968=_0x25cf81,_0x1f3755=_0x1199fc[_0xcaa968('0x2fd')](this[_0xcaa968('0x1bd')]()['equipSlots']);if(_0x1f3755[_0xcaa968('0x1fe')]>=0x2&&this[_0xcaa968('0x1b9')]())_0x1f3755[0x1]=0x1;return _0x1f3755;}}}else{if(this['_category'][_0x25cf81('0x1e5')](/ATYPE:(\d+)/i))return DataManager[_0x25cf81('0x19d')](_0x34ff05)&&_0x34ff05[_0x25cf81('0x239')]===Number(RegExp['$1']);else{if(this[_0x25cf81('0x81')]['match'](/ETYPE:(\d+)/i)){if('mIncn'!==_0x25cf81('0x140'))return!!_0x34ff05&&_0x34ff05['etypeId']===Number(RegExp['$1']);else{function _0x48036f(){const _0x23aacc=_0x25cf81;_0x2a23a7=_0x18106a[_0x23aacc('0x2fd')](_0x32fd0a),_0x40bf49[_0x23aacc('0x40c')][_0x23aacc('0x418')][_0x23aacc('0x38f')](this,_0x3e0c32,_0x40f42d),this[_0x23aacc('0x225')]();}}}else{if(this[_0x25cf81('0x81')][_0x25cf81('0x1e5')](/Category:(.*)/i))return!!_0x34ff05&&_0x34ff05[_0x25cf81('0x268')][_0x25cf81('0x16c')](String(RegExp['$1'])[_0x25cf81('0x434')]()['trim']());}}}}return![];},Window_ItemList[_0x4ca968('0x27')]['isShowNew']=function(){return!![];},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x3d5')]=Window_ItemList['prototype']['drawItem'],Window_ItemList['prototype'][_0x4ca968('0x1e1')]=function(_0x32a7c0){const _0x29054d=_0x4ca968;VisuMZ[_0x29054d('0x40c')][_0x29054d('0x3d5')][_0x29054d('0x38f')](this,_0x32a7c0),this[_0x29054d('0x43b')](_0x32a7c0);},Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x263')]=function(_0x43b4fc,_0x578a5a,_0x3bfdb9,_0x23d6a3){const _0x365112=_0x4ca968;Window_Selectable['prototype'][_0x365112('0x263')][_0x365112('0x38f')](this,_0x43b4fc,_0x578a5a,_0x3bfdb9,_0x23d6a3);},Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x43b')]=function(_0x141af7){const _0x128642=_0x4ca968,_0x34d98f=this[_0x128642('0x425')](_0x141af7);if(!_0x34d98f||!this[_0x128642('0x342')]())return;if(!$gameParty[_0x128642('0x32a')](_0x34d98f))return;const _0x380225=this['itemLineRect'](_0x141af7),_0x1dddf1=_0x380225['x'],_0x35bd97=_0x380225['y']+(this[_0x128642('0x5b')]()-ImageManager['iconHeight'])/0x2,_0x49cc0c=VisuMZ[_0x128642('0x40c')][_0x128642('0x3af')][_0x128642('0x1f9')][_0x128642('0x1ba')],_0x5c4acc=VisuMZ[_0x128642('0x40c')][_0x128642('0x3af')][_0x128642('0x1f9')][_0x128642('0x51')];this[_0x128642('0x3cb')](_0x34d98f,_0x1dddf1+_0x49cc0c,_0x35bd97+_0x5c4acc);},Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x1a9')]=function(_0x19a4c0){const _0x4163bb=_0x4ca968;this[_0x4163bb('0x2ac')]=_0x19a4c0,this[_0x4163bb('0x33f')]();},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x2ec')]=Window_ItemList[_0x4ca968('0x27')]['updateHelp'],Window_ItemList[_0x4ca968('0x27')][_0x4ca968('0x2a2')]=function(){const _0x32103d=_0x4ca968;VisuMZ[_0x32103d('0x40c')][_0x32103d('0x2ec')][_0x32103d('0x38f')](this),this[_0x32103d('0x2ac')]&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x32103d('0x2ac')]['setItem'](this[_0x32103d('0x2b5')]());},Window_EventItem['prototype']['isShowNew']=function(){return![];},Window_EquipStatus[_0x4ca968('0x27')][_0x4ca968('0x244')]=function(){const _0x4702e9=_0x4ca968;return VisuMZ['ItemsEquipsCore'][_0x4702e9('0x3af')][_0x4702e9('0x112')]['EnableLayout'];},VisuMZ['ItemsEquipsCore']['Window_EquipStatus_refresh']=Window_EquipStatus[_0x4ca968('0x27')]['refresh'],Window_EquipStatus['prototype']['refresh']=function(){const _0x5c8de=_0x4ca968;this[_0x5c8de('0x2de')](),this[_0x5c8de('0x2e1')]();if(this[_0x5c8de('0x33a')])this[_0x5c8de('0x33a')][_0x5c8de('0x42d')]();if(this[_0x5c8de('0x244')]())this[_0x5c8de('0x18f')]();else{if(_0x5c8de('0x3e6')!==_0x5c8de('0x3e8'))VisuMZ['ItemsEquipsCore'][_0x5c8de('0x3b4')][_0x5c8de('0x38f')](this);else{function _0x2ddab4(){const _0xd2b1d1=_0x5c8de,_0x660eb3=_0x491482[_0xd2b1d1('0x35b')]('['+_0xf6256f['$1'][_0xd2b1d1('0x1e5')](/\d+/g)+']');for(const _0x4b525e of _0x660eb3){if(_0x19fac6[_0xd2b1d1('0x4')](_0x4b525e))return![];}}}}},Window_EquipStatus[_0x4ca968('0x27')][_0x4ca968('0x18f')]=function(){const _0x5d4f0f=_0x4ca968;this['contents'][_0x5d4f0f('0x86')]();if(!this[_0x5d4f0f('0x33a')])return;if(this[_0x5d4f0f('0x2d1')]()){const _0x4aa62d=ImageManager[_0x5d4f0f('0x21f')](this[_0x5d4f0f('0x33a')][_0x5d4f0f('0x1e0')]());_0x4aa62d['addLoadListener'](this['onMenuImageLoad'][_0x5d4f0f('0x439')](this));}else{if(_0x5d4f0f('0x1d9')===_0x5d4f0f('0xcb')){function _0x2db234(){return _0x54da25(_0x24ad23['$1']);}}else this['refreshItemsEquipsCoreNoMenuImage']();}},Window_EquipStatus[_0x4ca968('0x27')]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x1a5a96=_0x4ca968;return Imported[_0x1a5a96('0xb3')]&&this['_actor'][_0x1a5a96('0x1e0')]()!==''&&VisuMZ['ItemsEquipsCore'][_0x1a5a96('0x3af')][_0x1a5a96('0x112')][_0x1a5a96('0x177')];},Window_EquipStatus['prototype']['onMenuImageLoad']=function(){const _0x1940bf=_0x4ca968;VisuMZ[_0x1940bf('0x40c')][_0x1940bf('0x3af')][_0x1940bf('0x112')]['DrawPortraitJS']['call'](this),this[_0x1940bf('0x30b')]();},Window_EquipStatus['prototype'][_0x4ca968('0x124')]=function(){const _0x4bc3bc=_0x4ca968;VisuMZ[_0x4bc3bc('0x40c')][_0x4bc3bc('0x3af')][_0x4bc3bc('0x112')]['DrawFaceJS'][_0x4bc3bc('0x38f')](this),this[_0x4bc3bc('0x30b')]();},Window_EquipStatus[_0x4ca968('0x27')][_0x4ca968('0x30b')]=function(){const _0x19db30=_0x4ca968;this[_0x19db30('0x2e1')](),VisuMZ[_0x19db30('0x40c')][_0x19db30('0x3af')][_0x19db30('0x112')][_0x19db30('0xd9')][_0x19db30('0x38f')](this);},Window_EquipStatus[_0x4ca968('0x27')]['drawItemActorMenuImage']=function(_0x4f252c,_0x572b9f,_0x29ac28,_0x3e6863,_0x98f3dc){const _0xbb9020=_0x4ca968,_0x4d16b5=ImageManager['loadPicture'](_0x4f252c[_0xbb9020('0x1e0')]()),_0x54f737=this['innerWidth']-_0x4d16b5[_0xbb9020('0x30e')];_0x572b9f+=_0x54f737/0x2;if(_0x54f737<0x0)_0x3e6863-=_0x54f737;Window_StatusBase[_0xbb9020('0x27')][_0xbb9020('0xf8')][_0xbb9020('0x38f')](this,_0x4f252c,_0x572b9f,_0x29ac28,_0x3e6863,_0x98f3dc);},Window_EquipStatus[_0x4ca968('0x27')][_0x4ca968('0x1')]=function(){const _0x484b95=_0x4ca968;if(Imported[_0x484b95('0x399')])return VisuMZ[_0x484b95('0x55')][_0x484b95('0x3af')][_0x484b95('0x235')][_0x484b95('0x17a')];else{if('uzvyG'!==_0x484b95('0x96'))return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];else{function _0x4551bf(){const _0x328bc2=_0x484b95,_0x1e56b4=_0x5a729c['loadPicture'](_0x2526dc[_0x328bc2('0x1e0')]()),_0x182d30=this[_0x328bc2('0x3a6')]-_0x1e56b4[_0x328bc2('0x30e')];_0x5a243f+=_0x182d30/0x2;if(_0x182d30<0x0)_0x387272-=_0x182d30;_0x515c03[_0x328bc2('0x27')][_0x328bc2('0xf8')][_0x328bc2('0x38f')](this,_0x2c2082,_0x26d3da,_0x1e1fc1,_0x5ce31d,_0x18a2b8);}}}},Window_EquipStatus[_0x4ca968('0x27')][_0x4ca968('0x5f')]=function(){const _0x192453=_0x4ca968;return VisuMZ[_0x192453('0x40c')][_0x192453('0x3af')][_0x192453('0x112')][_0x192453('0x35a')];},Window_EquipStatus[_0x4ca968('0x27')]['isUseParamNamesWithIcons']=function(){const _0x2365af=_0x4ca968;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ['CoreEngine'][_0x2365af('0x3af')][_0x2365af('0x235')][_0x2365af('0x40d')];},Window_EquipStatus[_0x4ca968('0x27')][_0x4ca968('0x39')]=function(_0x120b72,_0x34a3b0,_0x5980ab,_0x2959ae){const _0x363df1=_0x4ca968,_0x35fd14=this[_0x363df1('0x3ea')]();if(Imported['VisuMZ_0_CoreEngine'])this[_0x363df1('0x39f')](_0x34a3b0+_0x35fd14,_0x5980ab,_0x2959ae,_0x120b72,![]);else{if('gGwNR'===_0x363df1('0x420')){function _0xfb489b(){const _0x3164fc=_0x363df1;_0x2efbb7[_0x3164fc('0x40c')][_0x3164fc('0x3af')][_0x3164fc('0xc')][_0x3164fc('0x95')][_0x3164fc('0x38f')](this);}}else this[_0x363df1('0x2c5')](TextManager[_0x363df1('0x2f')](_0x120b72),_0x34a3b0+_0x35fd14,_0x5980ab,_0x2959ae);}},Window_EquipStatus['prototype'][_0x4ca968('0x219')]=function(_0x5c0167,_0x40154b,_0xb8fb9,_0x2a4bcd){const _0x26e594=_0x4ca968,_0x41b05=this[_0x26e594('0x3ea')]();let _0x2ae855=0x0;Imported['VisuMZ_0_CoreEngine']?_0x2ae855=this[_0x26e594('0x33a')]['paramValueByName'](_0x5c0167,!![]):_0x2ae855=this[_0x26e594('0x33a')][_0x26e594('0x2f')](_0x5c0167);const _0x4232ff=_0x2ae855;this['drawText'](_0x2ae855,_0x40154b,_0xb8fb9,_0x2a4bcd-_0x41b05,_0x26e594('0x3a4'));},Window_EquipStatus[_0x4ca968('0x27')][_0x4ca968('0xdd')]=function(_0x458f29,_0x3b1727,_0x3c4527,_0x1e5370){const _0xb508cf=_0x4ca968,_0x2b4aa9=this[_0xb508cf('0x3ea')]();let _0x3b1875=0x0,_0x4b562a=0x0,_0x550db1='';if(this['_tempActor']){Imported['VisuMZ_0_CoreEngine']?(_0x3b1875=this[_0xb508cf('0x33a')]['paramValueByName'](_0x458f29,![]),_0x4b562a=this[_0xb508cf('0x21b')]['paramValueByName'](_0x458f29,![]),_0x550db1=this[_0xb508cf('0x21b')][_0xb508cf('0x286')](_0x458f29,!![])):(_0x3b1875=this[_0xb508cf('0x33a')][_0xb508cf('0x2f')](_0x458f29),_0x4b562a=this['_tempActor'][_0xb508cf('0x2f')](_0x458f29),_0x550db1=this[_0xb508cf('0x21b')][_0xb508cf('0x2f')](_0x458f29));const _0x2cbb30=_0x3b1875,_0x45e201=_0x4b562a;diffValue=_0x45e201-_0x2cbb30,this[_0xb508cf('0x1d6')](ColorManager[_0xb508cf('0x390')](diffValue)),this['drawText'](_0x550db1,_0x3b1727,_0x3c4527,_0x1e5370-_0x2b4aa9,_0xb508cf('0x3a4'));}},Window_EquipStatus[_0x4ca968('0x27')]['drawUpdatedParamValueDiff']=function(_0x358e71,_0x2760bb,_0x592e16,_0x5428cd){const _0x4d32f0=_0x4ca968,_0xc6746b=this[_0x4d32f0('0x3ea')]();let _0x3ebea0=0x0,_0x2977e9=0x0,_0x576100=![];if(this[_0x4d32f0('0x21b')]){Imported[_0x4d32f0('0x399')]?(_0x3ebea0=this['_actor'][_0x4d32f0('0x286')](_0x358e71,![]),_0x2977e9=this[_0x4d32f0('0x21b')][_0x4d32f0('0x286')](_0x358e71,![]),_0x576100=String(this[_0x4d32f0('0x33a')][_0x4d32f0('0x286')](_0x358e71,!![]))[_0x4d32f0('0x1e5')](/([%％])/i)):(_0x3ebea0=this['_actor']['param'](_0x358e71),_0x2977e9=this['_tempActor'][_0x4d32f0('0x2f')](_0x358e71),_0x576100=_0x3ebea0%0x1!==0x0||_0x2977e9%0x1!==0x0);const _0x1e2ffe=_0x3ebea0,_0x584582=_0x2977e9,_0x4252ad=_0x584582-_0x1e2ffe;let _0x26c1c4=_0x4252ad;if(_0x576100)_0x26c1c4=Math[_0x4d32f0('0x2f7')](_0x4252ad*0x64)+'%';_0x4252ad!==0x0&&(this[_0x4d32f0('0x1d6')](ColorManager[_0x4d32f0('0x390')](_0x4252ad)),_0x26c1c4=(_0x4252ad>0x0?_0x4d32f0('0x238'):_0x4d32f0('0x15c'))[_0x4d32f0('0x43e')](_0x26c1c4),this[_0x4d32f0('0x2c5')](_0x26c1c4,_0x2760bb+_0xc6746b,_0x592e16,_0x5428cd,_0x4d32f0('0x291')));}},Window_EquipStatus[_0x4ca968('0x27')][_0x4ca968('0x312')]=function(_0x3e8977,_0x5cdab0,_0x4b7cb6,_0x49cfa1,_0x104b30){const _0x292619=_0x4ca968;if(VisuMZ['ItemsEquipsCore'][_0x292619('0x3af')]['EquipScene']['DrawBackRect']===![])return;_0x104b30=Math[_0x292619('0x358')](_0x104b30||0x1,0x1);while(_0x104b30--){if(_0x292619('0xc5')!==_0x292619('0xc5')){function _0x56ae6c(){const _0xa7eea3=_0x292619,_0x456aa7=this[_0xa7eea3('0x2e8')];if(_0x456aa7[_0x391612])return _0x456aa7[_0x30553e];else{const _0x466712=new _0x4832cc();return _0x456aa7[_0x28c740]=_0x466712,this[_0xa7eea3('0x361')](_0x466712),_0x466712;}}}else{_0x49cfa1=_0x49cfa1||this['lineHeight'](),this[_0x292619('0x382')][_0x292619('0xd0')]=0xa0;const _0x40080d=ColorManager[_0x292619('0x46')]();this[_0x292619('0x382')][_0x292619('0x315')](_0x3e8977+0x1,_0x5cdab0+0x1,_0x4b7cb6-0x2,_0x49cfa1-0x2,_0x40080d),this[_0x292619('0x382')][_0x292619('0xd0')]=0xff;}}},ColorManager[_0x4ca968('0x46')]=function(){const _0x4661e5=_0x4ca968,_0x88b2fa=VisuMZ[_0x4661e5('0x40c')][_0x4661e5('0x3af')]['EquipScene'];let _0x18a7b8=_0x88b2fa['BackRectColor']!==undefined?_0x88b2fa[_0x4661e5('0x2af')]:0x13;return ColorManager['getColor'](_0x18a7b8);},VisuMZ[_0x4ca968('0x40c')]['Window_EquipCommand_initialize']=Window_EquipCommand[_0x4ca968('0x27')]['initialize'],Window_EquipCommand[_0x4ca968('0x27')]['initialize']=function(_0x565566){const _0x3bb064=_0x4ca968;VisuMZ['ItemsEquipsCore'][_0x3bb064('0x28f')]['call'](this,_0x565566),this[_0x3bb064('0x37c')](_0x565566);},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x37c')]=function(_0x5bb127){const _0x3fca9b=_0x4ca968,_0x39ebb0=new Rectangle(0x0,0x0,_0x5bb127['width'],_0x5bb127[_0x3fca9b('0x3e2')]);this[_0x3fca9b('0x3d9')]=new Window_Base(_0x39ebb0),this['_commandNameWindow'][_0x3fca9b('0x410')]=0x0,this[_0x3fca9b('0x27b')](this[_0x3fca9b('0x3d9')]),this[_0x3fca9b('0x245')]();},Window_EquipCommand[_0x4ca968('0x27')]['callUpdateHelp']=function(){const _0x40c836=_0x4ca968;Window_HorzCommand['prototype'][_0x40c836('0x33f')]['call'](this);if(this[_0x40c836('0x3d9')])this['updateCommandNameWindow']();},Window_EquipCommand['prototype'][_0x4ca968('0x245')]=function(){const _0x3b7d69=_0x4ca968,_0x39887f=this[_0x3b7d69('0x3d9')];_0x39887f[_0x3b7d69('0x382')][_0x3b7d69('0x86')]();const _0x39d9c5=this['commandStyleCheck'](this[_0x3b7d69('0x38b')]());if(_0x39d9c5===_0x3b7d69('0x290')){const _0x55d499=this[_0x3b7d69('0x9e')](this[_0x3b7d69('0x38b')]());let _0x4664ea=this[_0x3b7d69('0x147')](this[_0x3b7d69('0x38b')]());_0x4664ea=_0x4664ea[_0x3b7d69('0x13e')](/\\I\[(\d+)\]/gi,''),_0x39887f['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x4664ea,_0x55d499),this[_0x3b7d69('0x354')](_0x4664ea,_0x55d499),this['commandNameWindowCenter'](_0x4664ea,_0x55d499);}},Window_EquipCommand['prototype']['commandNameWindowDrawBackground']=function(_0x121166,_0x3695b0){},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x354')]=function(_0x2667db,_0x5ea540){const _0x223092=_0x4ca968,_0x568ee4=this[_0x223092('0x3d9')];_0x568ee4['drawText'](_0x2667db,0x0,_0x5ea540['y'],_0x568ee4[_0x223092('0x3a6')],_0x223092('0x23'));},Window_EquipCommand[_0x4ca968('0x27')]['commandNameWindowCenter']=function(_0x22c712,_0x963771){const _0x56a490=_0x4ca968,_0x283922=this[_0x56a490('0x3d9')],_0x5cc48b=$gameSystem[_0x56a490('0x313')](),_0x4e215d=_0x963771['x']+Math[_0x56a490('0x3f3')](_0x963771[_0x56a490('0x30e')]/0x2)+_0x5cc48b;_0x283922['x']=_0x283922[_0x56a490('0x30e')]/-0x2+_0x4e215d,_0x283922['y']=Math[_0x56a490('0x3f3')](_0x963771[_0x56a490('0x3e2')]/0x2);},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0xb')]=function(){const _0x4b9300=_0x4ca968;return Imported[_0x4b9300('0x399')]&&Window_HorzCommand['prototype'][_0x4b9300('0xb')][_0x4b9300('0x38f')](this);},Window_EquipCommand[_0x4ca968('0x27')]['playOkSound']=function(){const _0x2e24a0=_0x4ca968;if(this[_0x2e24a0('0x1fa')]()===_0x2e24a0('0x2f0'))Window_HorzCommand['prototype'][_0x2e24a0('0x332')][_0x2e24a0('0x38f')](this);},Window_EquipCommand['prototype'][_0x4ca968('0x3e0')]=function(){const _0x28a00b=_0x4ca968;if(!this[_0x28a00b('0xb5')]()){if(_0x28a00b('0x13c')===_0x28a00b('0x13c'))Window_HorzCommand['prototype'][_0x28a00b('0x3e0')][_0x28a00b('0x38f')](this);else{function _0x50430a(){const _0x1034f2=_0x28a00b;return this[_0x1034f2('0x244')]()?this[_0x1034f2('0x11c')]():_0x1f97f6[_0x1034f2('0x40c')]['Scene_Equip_slotWindowRect'][_0x1034f2('0x38f')](this);}}}},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0xb5')]=function(){const _0x1bbe3e=_0x4ca968;if(!this[_0x1bbe3e('0x212')]())return![];if(SceneManager['_scene'][_0x1bbe3e('0x4b')]!==Scene_Equip)return![];if(Input[_0x1bbe3e('0x397')]('down')){if(_0x1bbe3e('0x60')!==_0x1bbe3e('0x1b5'))this[_0x1bbe3e('0xa9')](),SceneManager[_0x1bbe3e('0x98')][_0x1bbe3e('0xb2')](),SceneManager[_0x1bbe3e('0x98')][_0x1bbe3e('0x190')][_0x1bbe3e('0x2df')](-0x1);else{function _0x3151d7(){return![];}}}return![];},Window_EquipCommand[_0x4ca968('0x27')]['maxCols']=function(){const _0x2ab59c=_0x4ca968;return this[_0x2ab59c('0xff')]?this[_0x2ab59c('0xff')][_0x2ab59c('0x1fe')]:0x3;},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x3d3')]=function(){const _0x54ec91=_0x4ca968;if(this[_0x54ec91('0x157')]()&&this[_0x54ec91('0x3c1')]&&SceneManager[_0x54ec91('0x98')][_0x54ec91('0x4b')]===Scene_Equip){if(this[_0x54ec91('0x189')]()&&TouchInput[_0x54ec91('0x7')]()){if(_0x54ec91('0x22f')!=='BWTuO'){function _0x2cb000(){const _0x17e383=_0x54ec91,_0x3347c4=this[_0x17e383('0xa5')];_0x3347c4[_0x17e383('0x2c5')](_0x117cde,0x0,_0x57a3e1['y'],_0x3347c4[_0x17e383('0x3a6')],_0x17e383('0x23'));}}else this[_0x54ec91('0x134')](![]);}else{if(TouchInput[_0x54ec91('0x397')]()){if('TEGuT'!==_0x54ec91('0xf4')){function _0xd8602e(){const _0x2f04f1=_0x54ec91;this[_0x2f04f1('0x176')]();}}else this[_0x54ec91('0x134')](!![]);}}if(TouchInput['isClicked']())this['onTouchOk']();else{if(TouchInput['isCancelled']()){if(_0x54ec91('0x259')===_0x54ec91('0x259'))this[_0x54ec91('0x47')]();else{function _0xf16b3a(){return;}}}}}},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x134')]=function(_0x2bda06){const _0x4be1a0=_0x4ca968;this[_0x4be1a0('0x3b5')]=![];const _0x4baa70=this[_0x4be1a0('0x38b')](),_0x125df2=this[_0x4be1a0('0x2f5')](),_0x3f101d=SceneManager[_0x4be1a0('0x98')][_0x4be1a0('0x190')];if(_0x3f101d[_0x4be1a0('0x157')]()&&_0x3f101d[_0x4be1a0('0x3c1')]){if(_0x125df2>=0x0){if(_0x4be1a0('0x5')!==_0x4be1a0('0x5')){function _0x39b324(){const _0x7dfc95=_0x4be1a0,_0x2b71d6=_0x15409e(_0x5a8d83['$1'])[_0x7dfc95('0xa8')](/[\r\n]+/);for(const _0x55fdbb of _0x2b71d6){if(_0x55fdbb[_0x7dfc95('0x1e5')](/(.*):[ ](.*)/i)){const _0x6f7f4a=_0x3db546(_0x3a5175['$1'])[_0x7dfc95('0x434')]()[_0x7dfc95('0x3c3')](),_0x5ab790=_0x49ea8b(_0x5cf303['$2'])[_0x7dfc95('0x3c3')]();this[_0x7dfc95('0xf')][_0x6f7f4a]=_0x5ab790;}}}}else _0x125df2===this[_0x4be1a0('0x38b')]()&&(this[_0x4be1a0('0x3b5')]=!![]),this[_0x4be1a0('0x1be')](),this['select'](_0x125df2);}else{if(_0x3f101d[_0x4be1a0('0x2f5')]()>=0x0){if(_0x4be1a0('0x133')!==_0x4be1a0('0x133')){function _0x2e7254(){_0x40a6a7='armor-%1'['format'](_0x3ce382['id']);}}else this[_0x4be1a0('0x415')](),this[_0x4be1a0('0x3c')]();}}}_0x2bda06&&this[_0x4be1a0('0x38b')]()!==_0x4baa70&&this[_0x4be1a0('0xa9')]();},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x328')]=function(){const _0x2fb047=_0x4ca968;this[_0x2fb047('0x103')](),this[_0x2fb047('0x196')](),this[_0x2fb047('0x3c2')]();},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x42d')]=function(){const _0x4fe763=_0x4ca968;Window_HorzCommand[_0x4fe763('0x27')][_0x4fe763('0x42d')][_0x4fe763('0x38f')](this),this['refreshCursor']();},Window_EquipCommand['prototype'][_0x4ca968('0x103')]=function(){const _0x476895=_0x4ca968;if(!this['isEquipCommandAdded']())return;const _0x19903e=this[_0x476895('0x3ff')](),_0xf59eee=VisuMZ[_0x476895('0x40c')][_0x476895('0x3af')][_0x476895('0x112')][_0x476895('0x169')],_0x176b0a=_0x19903e==='text'?TextManager[_0x476895('0x159')]:'\x5cI[%1]%2'[_0x476895('0x43e')](_0xf59eee,TextManager['equip2']),_0x1fe035=this[_0x476895('0x311')]();this[_0x476895('0x56')](_0x176b0a,'equip',_0x1fe035);},Window_EquipCommand['prototype'][_0x4ca968('0x18b')]=function(){const _0x25b97b=_0x4ca968;return!this[_0x25b97b('0xb')]();},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x311')]=function(){return!![];},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x196')]=function(){const _0x2d606f=_0x4ca968;if(!this[_0x2d606f('0x3a1')]())return;const _0x1b18a4=this[_0x2d606f('0x3ff')](),_0x14c1de=VisuMZ[_0x2d606f('0x40c')][_0x2d606f('0x3af')][_0x2d606f('0x112')]['CmdIconOptimize'],_0x37a3c2=_0x1b18a4===_0x2d606f('0x26f')?TextManager[_0x2d606f('0x321')]:_0x2d606f('0x2b7')[_0x2d606f('0x43e')](_0x14c1de,TextManager[_0x2d606f('0x321')]),_0x5ea7a1=this['isOptimizeCommandEnabled']();this[_0x2d606f('0x56')](_0x37a3c2,_0x2d606f('0x321'),_0x5ea7a1);},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x3a1')]=function(){const _0x2242d3=_0x4ca968;return VisuMZ['ItemsEquipsCore'][_0x2242d3('0x3af')][_0x2242d3('0x112')][_0x2242d3('0x2ca')];},Window_EquipCommand[_0x4ca968('0x27')]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x4ca968('0x27')]['addClearCommand']=function(){const _0x42b976=_0x4ca968;if(!this[_0x42b976('0x172')]())return;const _0x275822=this[_0x42b976('0x3ff')](),_0x274676=VisuMZ[_0x42b976('0x40c')][_0x42b976('0x3af')][_0x42b976('0x112')][_0x42b976('0x3dd')],_0x242896=_0x275822===_0x42b976('0x26f')?TextManager[_0x42b976('0x86')]:'\x5cI[%1]%2'['format'](_0x274676,TextManager['clear']),_0xdc0342=this[_0x42b976('0x131')]();this[_0x42b976('0x56')](_0x242896,'clear',_0xdc0342);},Window_EquipCommand['prototype']['isClearCommandAdded']=function(){const _0xd2ba96=_0x4ca968;return VisuMZ['ItemsEquipsCore'][_0xd2ba96('0x3af')]['EquipScene'][_0xd2ba96('0x158')];},Window_EquipCommand[_0x4ca968('0x27')]['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand['prototype'][_0x4ca968('0x10b')]=function(){const _0x192fcf=_0x4ca968;return VisuMZ[_0x192fcf('0x40c')][_0x192fcf('0x3af')][_0x192fcf('0x112')][_0x192fcf('0x24b')];},Window_EquipCommand['prototype'][_0x4ca968('0x1e1')]=function(_0x399d12){const _0x454c42=_0x4ca968,_0x5b0759=this[_0x454c42('0x1e7')](_0x399d12);if(_0x5b0759===_0x454c42('0x27e')){if('iQsdN'!==_0x454c42('0x1dc'))this[_0x454c42('0x2a8')](_0x399d12);else{function _0x13b629(){const _0x24b35d=_0x454c42,_0x1503b8=_0x24b35d('0x282');if(this[_0x24b35d('0xca')][_0x24b35d('0x366')]<=0x0&&!this['_customItemInfo'][_0x1503b8])return![];const _0x5ad379=this['getItemEffectsTpRecoveryLabel']();this[_0x24b35d('0x2fc')](_0x5ad379,_0x5a8598,_0x1c0574,_0x3acf3d,!![]);const _0x16be0c=this['getItemEffectsTpRecoveryText']();return this[_0x24b35d('0x1d6')](_0x322f3a[_0x24b35d('0x1ce')]()),this[_0x24b35d('0x2fc')](_0x16be0c,_0x9970d9,_0x5eba94,_0x5962b7,![],'right'),this['drawItemDarkRect'](_0x17858d,_0x3d2545,_0x19130b),this[_0x24b35d('0x2e1')](),!![];}}}else{if(_0x5b0759===_0x454c42('0x290')){if(_0x454c42('0x115')==='YjPUl'){function _0x1f00ff(){const _0x38bf0f=_0x454c42;this[_0x38bf0f('0x134')](![]);}}else this[_0x454c42('0x45')](_0x399d12);}else Window_HorzCommand[_0x454c42('0x27')]['drawItem'][_0x454c42('0x38f')](this,_0x399d12);}},Window_EquipCommand['prototype'][_0x4ca968('0x3ff')]=function(){const _0x1c54e6=_0x4ca968;return VisuMZ['ItemsEquipsCore'][_0x1c54e6('0x3af')][_0x1c54e6('0x112')][_0x1c54e6('0x1a')];},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x1e7')]=function(_0x44ff2a){const _0x208ada=_0x4ca968;if(_0x44ff2a<0x0)return _0x208ada('0x26f');const _0xec4c27=this[_0x208ada('0x3ff')]();if(_0xec4c27!=='auto')return _0xec4c27;else{if(this[_0x208ada('0x1ae')]()>0x0){const _0x4f334b=this[_0x208ada('0x147')](_0x44ff2a);if(_0x4f334b[_0x208ada('0x1e5')](/\\I\[(\d+)\]/i)){const _0x397665=this['itemLineRect'](_0x44ff2a),_0x88b483=this[_0x208ada('0x143')](_0x4f334b)['width'];if(_0x88b483<=_0x397665[_0x208ada('0x30e')]){if(_0x208ada('0x334')===_0x208ada('0xa3')){function _0x115551(){const _0x19e816=_0x208ada;if(!this[_0x19e816('0x132')][_0x3a18bd])this[_0x19e816('0x132')][_0x49d81e]=new _0x3670f4();}}else return _0x208ada('0x27e');}else return'icon';}}}return _0x208ada('0x26f');},Window_EquipCommand['prototype'][_0x4ca968('0x2a8')]=function(_0x526d47){const _0x4871db=_0x4ca968,_0x4ff6c6=this[_0x4871db('0x9e')](_0x526d47),_0x1af482=this[_0x4871db('0x147')](_0x526d47),_0x2313d6=this['textSizeEx'](_0x1af482)['width'];this[_0x4871db('0x1b4')](this['isCommandEnabled'](_0x526d47));const _0x4ada92=this[_0x4871db('0x10b')]();if(_0x4ada92===_0x4871db('0x3a4'))this['drawTextEx'](_0x1af482,_0x4ff6c6['x']+_0x4ff6c6[_0x4871db('0x30e')]-_0x2313d6,_0x4ff6c6['y'],_0x2313d6);else{if(_0x4ada92===_0x4871db('0x23')){const _0x4bed4c=_0x4ff6c6['x']+Math[_0x4871db('0x3f3')]((_0x4ff6c6[_0x4871db('0x30e')]-_0x2313d6)/0x2);this[_0x4871db('0x148')](_0x1af482,_0x4bed4c,_0x4ff6c6['y'],_0x2313d6);}else this[_0x4871db('0x148')](_0x1af482,_0x4ff6c6['x'],_0x4ff6c6['y'],_0x2313d6);}},Window_EquipCommand[_0x4ca968('0x27')][_0x4ca968('0x45')]=function(_0x847cba){const _0x3d60cd=_0x4ca968;this[_0x3d60cd('0x147')](_0x847cba)[_0x3d60cd('0x1e5')](/\\I\[(\d+)\]/i);const _0x5d0398=Number(RegExp['$1'])||0x0,_0x208000=this[_0x3d60cd('0x9e')](_0x847cba),_0x25f6eb=_0x208000['x']+Math[_0x3d60cd('0x3f3')]((_0x208000[_0x3d60cd('0x30e')]-ImageManager[_0x3d60cd('0x240')])/0x2),_0x3205e7=_0x208000['y']+(_0x208000[_0x3d60cd('0x3e2')]-ImageManager[_0x3d60cd('0x1c0')])/0x2;this[_0x3d60cd('0x298')](_0x5d0398,_0x25f6eb,_0x3205e7);},Window_EquipSlot['prototype'][_0x4ca968('0xb')]=function(){const _0x4b1345=_0x4ca968;return Imported[_0x4b1345('0x399')]&&Window_HorzCommand['prototype'][_0x4b1345('0xb')]['call'](this);},Window_EquipSlot[_0x4ca968('0x27')][_0x4ca968('0x1be')]=function(){const _0x574688=_0x4ca968;Window_StatusBase['prototype'][_0x574688('0x1be')]['call'](this),this['callUpdateHelp']();},Window_EquipSlot['prototype'][_0x4ca968('0x34')]=function(){const _0x282a76=_0x4ca968;Window_StatusBase[_0x282a76('0x27')]['processCursorMove'][_0x282a76('0x38f')](this),this['checkShiftRemoveShortcut']();},Window_EquipSlot[_0x4ca968('0x27')][_0x4ca968('0x3b3')]=function(){const _0x1f7568=_0x4ca968;if(!this[_0x1f7568('0x3b1')]())return;if(Input[_0x1f7568('0x397')](_0x1f7568('0xc4'))&&this['item']()){const _0x130ca7=SceneManager['_scene']['_actor'];_0x130ca7&&(this[_0x1f7568('0x167')](this[_0x1f7568('0x38b')]())?(this[_0x1f7568('0x409')](),this['updateHelp']()):this[_0x1f7568('0x14c')]());}},Window_EquipSlot[_0x4ca968('0x27')][_0x4ca968('0x167')]=function(_0xad51c1){const _0x2bf29c=_0x4ca968,_0x429aac=SceneManager[_0x2bf29c('0x98')][_0x2bf29c('0x33a')];if(!_0x429aac)return;if(!_0x429aac[_0x2bf29c('0xdf')](this[_0x2bf29c('0x38b')]()))return![];const _0xfdcc81=_0x429aac[_0x2bf29c('0x254')]()[this['index']()];if(_0x429aac[_0x2bf29c('0x2f9')]()[_0x2bf29c('0x16c')](_0xfdcc81))return![];return!![];;},Window_EquipSlot[_0x4ca968('0x27')]['processShiftRemoveShortcut']=function(){const _0x8f0848=_0x4ca968;SoundManager['playEquip']();const _0x252f1b=SceneManager[_0x8f0848('0x98')][_0x8f0848('0x33a')];_0x252f1b[_0x8f0848('0x85')](this['index'](),null),this['refresh'](),this[_0x8f0848('0x1a2')][_0x8f0848('0x42d')]();},Window_EquipSlot[_0x4ca968('0x27')]['isShiftRemoveShortcutEnabled']=function(){const _0x4f8a95=_0x4ca968;if(!this[_0x4f8a95('0x1cb')])return![];if(!VisuMZ[_0x4f8a95('0x40c')][_0x4f8a95('0x3af')][_0x4f8a95('0x112')][_0x4f8a95('0xbf')])return![];return!![];},Window_EquipSlot[_0x4ca968('0x27')][_0x4ca968('0x3e0')]=function(){const _0x1836f2=_0x4ca968;if(!this[_0x1836f2('0xb5')]()){if('uOvAs'==='pdJXm'){function _0x58e6ef(){const _0x4651f7=_0x1836f2,_0x46147b=this[_0x4651f7('0x2a1')]()?0x0:_0x28057b[_0x4651f7('0xf3')]-this[_0x4651f7('0x15e')](),_0x3bed55=this['mainAreaTop'](),_0x5737eb=this[_0x4651f7('0x15e')](),_0x33e1eb=this[_0x4651f7('0x2ae')]();return new _0x21dfd7(_0x46147b,_0x3bed55,_0x5737eb,_0x33e1eb);}}else Window_StatusBase[_0x1836f2('0x27')]['processCursorMoveModernControls'][_0x1836f2('0x38f')](this);}},Window_EquipSlot[_0x4ca968('0x27')][_0x4ca968('0xb5')]=function(){const _0x4b8c78=_0x4ca968;if(!this[_0x4b8c78('0x212')]())return![];if(SceneManager['_scene'][_0x4b8c78('0x4b')]!==Scene_Equip)return![];if(this[_0x4b8c78('0x84')]())return this[_0x4b8c78('0xa9')](),Input['clear'](),SceneManager[_0x4b8c78('0x98')][_0x4b8c78('0x1d3')](),![];else{if(Input['isRepeated'](_0x4b8c78('0x2cd'))){const _0x3f3e67=this[_0x4b8c78('0x38b')]();if(Input['isPressed']('shift')){if(_0x4b8c78('0x3b2')===_0x4b8c78('0x3b2'))this['cursorPagedown']();else{function _0x100eb8(){this['onTouchSelectModernControls'](!![]);}}}else{if(_0x4b8c78('0x174')!==_0x4b8c78('0x174')){function _0x209620(){const _0x16e62b=_0x4b8c78;return _0x135e99[_0x16e62b('0x27')][_0x16e62b('0x189')][_0x16e62b('0x38f')](this);}}else this[_0x4b8c78('0x292')](Input[_0x4b8c78('0x397')]('down'));}return this[_0x4b8c78('0x38b')]()!==_0x3f3e67&&this[_0x4b8c78('0xa9')](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x4b8c78('0x397')]('shift'))return!![];}}return![];},Window_EquipSlot[_0x4ca968('0x27')][_0x4ca968('0x84')]=function(){const _0x4e8d3f=_0x4ca968;if(this[_0x4e8d3f('0x38b')]()!==0x0)return![];const _0x1e3763=VisuMZ[_0x4e8d3f('0x40c')][_0x4e8d3f('0x3af')][_0x4e8d3f('0x112')];if(!_0x1e3763['CommandAddOptimize']&&!_0x1e3763[_0x4e8d3f('0x158')])return![];return Input['isTriggered']('up');},Window_EquipSlot[_0x4ca968('0x27')][_0x4ca968('0xe3')]=function(){const _0x5c2b87=_0x4ca968;return VisuMZ[_0x5c2b87('0x40c')][_0x5c2b87('0x3af')]['EquipScene']['ShiftShortcutKey'];},Window_EquipSlot[_0x4ca968('0x27')][_0x4ca968('0x3d3')]=function(){const _0x1a5dfe=_0x4ca968;if(this[_0x1a5dfe('0x157')]()&&this[_0x1a5dfe('0x3c1')]&&SceneManager['_scene'][_0x1a5dfe('0x4b')]===Scene_Equip){if(_0x1a5dfe('0x271')!==_0x1a5dfe('0x271')){function _0x5191f1(){this['onCategoryCancelItemsEquipsCore']();}}else{if(this[_0x1a5dfe('0x189')]()&&TouchInput[_0x1a5dfe('0x7')]())this['onTouchSelectModernControls'](![]);else{if(TouchInput[_0x1a5dfe('0x397')]()){if(_0x1a5dfe('0x12b')===_0x1a5dfe('0x297')){function _0x1c56cf(){this['drawParamText'](_0x1ab85f+_0xdc6f60,_0x102199,_0x129247,_0x5d05fa,![]);}}else this['onTouchSelectModernControls'](!![]);}}if(TouchInput['isClicked']())this[_0x1a5dfe('0x88')]();else TouchInput[_0x1a5dfe('0x1bf')]()&&this[_0x1a5dfe('0x47')]();}}},Window_EquipSlot['prototype'][_0x4ca968('0x134')]=function(_0x4c6fe0){const _0x467bd9=_0x4ca968;this[_0x467bd9('0x3b5')]=![];const _0x442e0b=this[_0x467bd9('0x38b')](),_0x3c2570=this['hitIndex'](),_0x9ac8cd=SceneManager[_0x467bd9('0x98')][_0x467bd9('0x436')];if(_0x9ac8cd['isOpen']()&&_0x9ac8cd[_0x467bd9('0x3c1')]){if(_0x467bd9('0x362')===_0x467bd9('0x362')){if(_0x3c2570>=0x0){if(_0x3c2570===this[_0x467bd9('0x38b')]()){if(_0x467bd9('0x215')!==_0x467bd9('0x215')){function _0x16118e(){const _0x1110ac=_0x467bd9;_0x537529[_0x1110ac('0x40c')][_0x1110ac('0x12c')]['call'](this,_0x570f3e),this[_0x1110ac('0x22')](_0x5618d8);}}else this[_0x467bd9('0x3b5')]=!![];}this['activate'](),this[_0x467bd9('0x37')](_0x3c2570);}else{if(_0x9ac8cd[_0x467bd9('0x2f5')]()>=0x0){if('kNtbd'!=='klABp')this[_0x467bd9('0x415')](),this[_0x467bd9('0x3c')]();else{function _0x118528(){const _0x3396b4=_0x467bd9;_0x5cdcea=_0x3396b4('0xd1')[_0x3396b4('0x43e')](_0x5d5960['id']);}}}}}else{function _0x453615(){const _0x265a18=_0x467bd9;this[_0x265a18('0xa2')]();}}}_0x4c6fe0&&this['index']()!==_0x442e0b&&this[_0x467bd9('0xa9')]();},VisuMZ[_0x4ca968('0x40c')][_0x4ca968('0x153')]=Window_EquipItem[_0x4ca968('0x27')][_0x4ca968('0x16c')],Window_EquipItem[_0x4ca968('0x27')][_0x4ca968('0x16c')]=function(_0x52f74b){const _0x4b5f8e=_0x4ca968;if(_0x52f74b===null&&this[_0x4b5f8e('0x2f9')]()['includes'](this['etypeId']()))return this[_0x4b5f8e('0x154')][_0x4b5f8e('0x1fe')]>0x0?![]:!![];else{if('HHfkf'!=='HHfkf'){function _0x329940(){const _0x43180f=_0x4b5f8e;return _0x14993b[_0x43180f('0x40c')]['Settings'][_0x43180f('0xcd')][_0x43180f('0x24b')];}}else return VisuMZ['ItemsEquipsCore'][_0x4b5f8e('0x153')][_0x4b5f8e('0x38f')](this,_0x52f74b);}},VisuMZ[_0x4ca968('0x40c')]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x4ca968('0x27')][_0x4ca968('0x1ad')],Window_EquipItem[_0x4ca968('0x27')]['isEnabled']=function(_0x1d7620){const _0x33100c=_0x4ca968;if(!_0x1d7620&&this[_0x33100c('0x2f9')]()[_0x33100c('0x16c')](this[_0x33100c('0x239')]())){if(_0x33100c('0x11b')===_0x33100c('0x11b'))return![];else{function _0x3ffc98(){const _0x535a11=_0x33100c;if(this[_0x535a11('0x2f4')]())return this[_0x535a11('0x3ac')][_0x535a11('0x30e')]/0x5/-0x3;return _0x46713a[_0x535a11('0x27')]['buttonAssistOffset3']['call'](this);}}}else return VisuMZ[_0x33100c('0x40c')][_0x33100c('0x116')]['call'](this,_0x1d7620);},Window_EquipItem[_0x4ca968('0x27')][_0x4ca968('0x2f9')]=function(){const _0x4afecf=_0x4ca968;return VisuMZ[_0x4afecf('0x40c')][_0x4afecf('0x3af')][_0x4afecf('0x112')]['NonRemoveETypes'];},Window_EquipItem['prototype'][_0x4ca968('0x1e1')]=function(_0x15d91f){const _0x1f7b4f=_0x4ca968,_0x1dd4eb=this[_0x1f7b4f('0x425')](_0x15d91f);if(_0x1dd4eb){if('AjjkL'===_0x1f7b4f('0x306')){function _0x4e0778(){const _0xf2c533=_0x1f7b4f;_0x1783dd=_0x2d9bc9+_0x48a7f9['floor']((_0x1f398c-_0x2ee39f[_0xf2c533('0x30e')])/0x2);}}else Window_ItemList[_0x1f7b4f('0x27')][_0x1f7b4f('0x1e1')][_0x1f7b4f('0x38f')](this,_0x15d91f);}else this[_0x1f7b4f('0x25a')](_0x15d91f);},Window_EquipItem[_0x4ca968('0x27')][_0x4ca968('0x25a')]=function(_0x3a75e1){const _0x302ff7=_0x4ca968;this[_0x302ff7('0x1b4')](this['isEnabled'](null));const _0x39c9eb=VisuMZ[_0x302ff7('0x40c')][_0x302ff7('0x3af')][_0x302ff7('0x112')],_0x355768=this[_0x302ff7('0x9e')](_0x3a75e1),_0x5e6818=_0x355768['y']+(this[_0x302ff7('0x5b')]()-ImageManager[_0x302ff7('0x1c0')])/0x2,_0x489b10=ImageManager['iconWidth']+0x4,_0x38ee06=Math[_0x302ff7('0x358')](0x0,_0x355768['width']-_0x489b10);this[_0x302ff7('0x2e4')](),this[_0x302ff7('0x298')](_0x39c9eb[_0x302ff7('0x8a')],_0x355768['x'],_0x5e6818),this[_0x302ff7('0x2c5')](_0x39c9eb[_0x302ff7('0x305')],_0x355768['x']+_0x489b10,_0x355768['y'],_0x38ee06),this[_0x302ff7('0x1b4')](!![]);},Window_EquipItem['prototype']['updateHelp']=function(){const _0x2bf672=_0x4ca968;Window_ItemList[_0x2bf672('0x27')]['updateHelp']['call'](this);if(this[_0x2bf672('0x33a')]&&this[_0x2bf672('0x2ac')]&&this[_0x2bf672('0xba')]>=0x0){if(_0x2bf672('0x2c1')!=='JnaxZ'){const _0x3d6aed=JsonEx['makeDeepCopy'](this[_0x2bf672('0x33a')]);_0x3d6aed[_0x2bf672('0x21b')]=!![],_0x3d6aed[_0x2bf672('0x1df')](this[_0x2bf672('0xba')],this['item']()),this[_0x2bf672('0x2ac')][_0x2bf672('0x32c')](_0x3d6aed);}else{function _0x85804a(){const _0x670165=_0x2bf672;_0x497f7c=_0x670165('0x185')[_0x670165('0x43e')](_0x18578f['id']);}}}},VisuMZ[_0x4ca968('0x40c')]['Window_ShopCommand_initialize']=Window_ShopCommand['prototype'][_0x4ca968('0x1f7')],Window_ShopCommand['prototype'][_0x4ca968('0x1f7')]=function(_0x3a8201){const _0x4154fe=_0x4ca968;VisuMZ[_0x4154fe('0x40c')][_0x4154fe('0x4d')][_0x4154fe('0x38f')](this,_0x3a8201),this[_0x4154fe('0x37c')](_0x3a8201);},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x37c')]=function(_0x393d67){const _0x500a5e=_0x4ca968,_0x59fad3=new Rectangle(0x0,0x0,_0x393d67[_0x500a5e('0x30e')],_0x393d67[_0x500a5e('0x3e2')]);this['_commandNameWindow']=new Window_Base(_0x59fad3),this[_0x500a5e('0x3d9')][_0x500a5e('0x410')]=0x0,this[_0x500a5e('0x27b')](this[_0x500a5e('0x3d9')]),this[_0x500a5e('0x245')]();},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x33f')]=function(){const _0x3c95b6=_0x4ca968;Window_HorzCommand[_0x3c95b6('0x27')][_0x3c95b6('0x33f')][_0x3c95b6('0x38f')](this);if(this['_commandNameWindow'])this[_0x3c95b6('0x245')]();},Window_ShopCommand['prototype'][_0x4ca968('0x245')]=function(){const _0x6c164a=_0x4ca968,_0x4fed69=this[_0x6c164a('0x3d9')];_0x4fed69['contents']['clear']();const _0x4d65e4=this[_0x6c164a('0x1e7')](this[_0x6c164a('0x38b')]());if(_0x4d65e4===_0x6c164a('0x290')){const _0x3f167b=this['itemLineRect'](this[_0x6c164a('0x38b')]());let _0x37185b=this[_0x6c164a('0x147')](this[_0x6c164a('0x38b')]());_0x37185b=_0x37185b[_0x6c164a('0x13e')](/\\I\[(\d+)\]/gi,''),_0x4fed69[_0x6c164a('0x2e1')](),this[_0x6c164a('0x33b')](_0x37185b,_0x3f167b),this['commandNameWindowDrawText'](_0x37185b,_0x3f167b),this[_0x6c164a('0x3cd')](_0x37185b,_0x3f167b);}},Window_ShopCommand['prototype'][_0x4ca968('0x33b')]=function(_0x5b6331,_0x28a3a8){},Window_ShopCommand[_0x4ca968('0x27')]['commandNameWindowDrawText']=function(_0x478ac7,_0x2f2d11){const _0x1cb664=_0x4ca968,_0xad42ad=this[_0x1cb664('0x3d9')];_0xad42ad[_0x1cb664('0x2c5')](_0x478ac7,0x0,_0x2f2d11['y'],_0xad42ad[_0x1cb664('0x3a6')],_0x1cb664('0x23'));},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x3cd')]=function(_0x1bf62d,_0x2d11b6){const _0x1ead23=_0x4ca968,_0x3c8894=this[_0x1ead23('0x3d9')],_0x30e428=$gameSystem['windowPadding'](),_0x2dae55=_0x2d11b6['x']+Math['floor'](_0x2d11b6[_0x1ead23('0x30e')]/0x2)+_0x30e428;_0x3c8894['x']=_0x3c8894[_0x1ead23('0x30e')]/-0x2+_0x2dae55,_0x3c8894['y']=Math[_0x1ead23('0x3f3')](_0x2d11b6['height']/0x2);},Window_ShopCommand[_0x4ca968('0x27')]['maxCols']=function(){const _0x223751=_0x4ca968;return this[_0x223751('0xff')]?this[_0x223751('0xff')]['length']:0x3;},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0xaf')]=function(){const _0x6e0df7=_0x4ca968;return VisuMZ[_0x6e0df7('0x40c')][_0x6e0df7('0x3af')]['ShopScene'][_0x6e0df7('0x2b6')];},Window_ShopCommand['prototype']['makeCommandList']=function(){const _0x36cb7d=_0x4ca968;this[_0x36cb7d('0x41b')](),this[_0x36cb7d('0x9b')](),this['addCancelCommand']();},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x42d')]=function(){const _0x197eb7=_0x4ca968;Window_HorzCommand[_0x197eb7('0x27')][_0x197eb7('0x42d')][_0x197eb7('0x38f')](this),this[_0x197eb7('0x372')]();},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x41b')]=function(){const _0x294c9f=_0x4ca968,_0xf81e27=this[_0x294c9f('0x3ff')](),_0x16cc3b=VisuMZ[_0x294c9f('0x40c')][_0x294c9f('0x3af')]['ShopScene'][_0x294c9f('0x339')],_0x27d3d8=_0xf81e27===_0x294c9f('0x26f')?TextManager[_0x294c9f('0x2')]:_0x294c9f('0x2b7')[_0x294c9f('0x43e')](_0x16cc3b,TextManager[_0x294c9f('0x2')]),_0x395bda=this[_0x294c9f('0x137')]();if(this['hideDisabledCommands']()&&!_0x395bda)return;this[_0x294c9f('0x56')](_0x27d3d8,_0x294c9f('0x2'),_0x395bda);},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x137')]=function(){const _0x54bc65=_0x4ca968;if(SceneManager[_0x54bc65('0x98')][_0x54bc65('0x4b')]===Scene_Shop)return SceneManager[_0x54bc65('0x98')][_0x54bc65('0xd')]>0x0;else{if(_0x54bc65('0x18d')!==_0x54bc65('0x65'))return!![];else{function _0x394316(){return;}}}},Window_ShopCommand['prototype'][_0x4ca968('0x9b')]=function(){const _0x736b42=_0x4ca968,_0xfb60b2=this['commandStyle'](),_0x176639=VisuMZ[_0x736b42('0x40c')][_0x736b42('0x3af')]['ShopScene'][_0x736b42('0x1c')],_0xcabe85=_0xfb60b2===_0x736b42('0x26f')?TextManager[_0x736b42('0x1b0')]:'\x5cI[%1]%2'[_0x736b42('0x43e')](_0x176639,TextManager[_0x736b42('0x1b0')]),_0x123f15=this['isSellCommandEnabled']();if(this[_0x736b42('0xaf')]()&&!_0x123f15)return;this[_0x736b42('0x56')](_0xcabe85,_0x736b42('0x1b0'),_0x123f15);},Window_ShopCommand[_0x4ca968('0x27')]['isSellCommandEnabled']=function(){const _0x54b241=_0x4ca968;return!this[_0x54b241('0x35e')];},Window_ShopCommand['prototype'][_0x4ca968('0x39a')]=function(){const _0x4546be=_0x4ca968,_0x43f5b4=this[_0x4546be('0x3ff')](),_0x2509ff=VisuMZ[_0x4546be('0x40c')]['Settings'][_0x4546be('0xcd')]['CmdIconCancel'],_0x19b4ef=VisuMZ[_0x4546be('0x40c')][_0x4546be('0x3af')][_0x4546be('0xcd')][_0x4546be('0x8e')],_0x1e38b0=_0x43f5b4===_0x4546be('0x26f')?_0x19b4ef:_0x4546be('0x2b7')[_0x4546be('0x43e')](_0x2509ff,_0x19b4ef);this['addCommand'](_0x1e38b0,_0x4546be('0x139'));},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x10b')]=function(){const _0x3b6c54=_0x4ca968;return VisuMZ[_0x3b6c54('0x40c')][_0x3b6c54('0x3af')][_0x3b6c54('0xcd')]['CmdTextAlign'];},Window_ShopCommand[_0x4ca968('0x27')]['drawItem']=function(_0xa3aa46){const _0x1e7a0f=_0x4ca968,_0x120458=this[_0x1e7a0f('0x1e7')](_0xa3aa46);if(_0x120458===_0x1e7a0f('0x27e'))this[_0x1e7a0f('0x2a8')](_0xa3aa46);else _0x120458===_0x1e7a0f('0x290')?this[_0x1e7a0f('0x45')](_0xa3aa46):Window_HorzCommand['prototype'][_0x1e7a0f('0x1e1')][_0x1e7a0f('0x38f')](this,_0xa3aa46);},Window_ShopCommand['prototype'][_0x4ca968('0x3ff')]=function(){const _0x5a81d0=_0x4ca968;return VisuMZ[_0x5a81d0('0x40c')][_0x5a81d0('0x3af')]['ShopScene']['CmdStyle'];},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x1e7')]=function(_0x1538f7){const _0x22f894=_0x4ca968;if(_0x1538f7<0x0)return _0x22f894('0x26f');const _0x538ac1=this[_0x22f894('0x3ff')]();if(_0x538ac1!==_0x22f894('0x317'))return _0x538ac1;else{if(this[_0x22f894('0x1ae')]()>0x0){const _0x105519=this[_0x22f894('0x147')](_0x1538f7);if(_0x105519['match'](/\\I\[(\d+)\]/i)){const _0x541946=this[_0x22f894('0x9e')](_0x1538f7),_0x236181=this['textSizeEx'](_0x105519)[_0x22f894('0x30e')];return _0x236181<=_0x541946[_0x22f894('0x30e')]?_0x22f894('0x27e'):_0x22f894('0x290');}}}return'text';},Window_ShopCommand[_0x4ca968('0x27')][_0x4ca968('0x2a8')]=function(_0x5d20c9){const _0x272507=_0x4ca968,_0x9e783b=this[_0x272507('0x9e')](_0x5d20c9),_0x1add6c=this[_0x272507('0x147')](_0x5d20c9),_0x5e8d54=this['textSizeEx'](_0x1add6c)[_0x272507('0x30e')];this[_0x272507('0x1b4')](this['isCommandEnabled'](_0x5d20c9));const _0x596c37=this[_0x272507('0x10b')]();if(_0x596c37===_0x272507('0x3a4'))this[_0x272507('0x148')](_0x1add6c,_0x9e783b['x']+_0x9e783b[_0x272507('0x30e')]-_0x5e8d54,_0x9e783b['y'],_0x5e8d54);else{if(_0x596c37===_0x272507('0x23')){if('MgraW'!==_0x272507('0x234')){const _0x5d89c4=_0x9e783b['x']+Math[_0x272507('0x3f3')]((_0x9e783b[_0x272507('0x30e')]-_0x5e8d54)/0x2);this['drawTextEx'](_0x1add6c,_0x5d89c4,_0x9e783b['y'],_0x5e8d54);}else{function _0x467b27(){const _0x1a46d7=_0x272507,_0x497da2=_0x58e29d[_0x1a46d7('0x21f')](this[_0x1a46d7('0x33a')][_0x1a46d7('0x1e0')]());_0x497da2['addLoadListener'](this[_0x1a46d7('0x27c')][_0x1a46d7('0x439')](this));}}}else{if(_0x272507('0x3e7')==='iDGxX')this[_0x272507('0x148')](_0x1add6c,_0x9e783b['x'],_0x9e783b['y'],_0x5e8d54);else{function _0x13c5d5(){const _0x417fa3=_0x272507;this[_0x417fa3('0x2d7')]*=-0x1;}}}}},Window_ShopCommand[_0x4ca968('0x27')]['drawItemStyleIcon']=function(_0x4ab59b){const _0x318669=_0x4ca968;this[_0x318669('0x147')](_0x4ab59b)['match'](/\\I\[(\d+)\]/i);const _0x507077=Number(RegExp['$1'])||0x0,_0x117624=this[_0x318669('0x9e')](_0x4ab59b),_0x2ea8a7=_0x117624['x']+Math[_0x318669('0x3f3')]((_0x117624['width']-ImageManager[_0x318669('0x240')])/0x2),_0x2b656d=_0x117624['y']+(_0x117624[_0x318669('0x3e2')]-ImageManager[_0x318669('0x1c0')])/0x2;this['drawIcon'](_0x507077,_0x2ea8a7,_0x2b656d);},VisuMZ['ItemsEquipsCore']['Window_ShopBuy_refresh']=Window_ShopBuy['prototype'][_0x4ca968('0x42d')],Window_ShopBuy['prototype'][_0x4ca968('0x42d')]=function(){const _0x1a14b5=_0x4ca968;this[_0x1a14b5('0x12f')](),VisuMZ[_0x1a14b5('0x40c')][_0x1a14b5('0x12a')][_0x1a14b5('0x38f')](this);},Window_ShopBuy[_0x4ca968('0x27')][_0x4ca968('0x12f')]=function(){const _0x70f3d=_0x4ca968;SceneManager[_0x70f3d('0x98')][_0x70f3d('0x4b')]===Scene_Shop&&(this['_money']=SceneManager[_0x70f3d('0x98')][_0x70f3d('0x117')]());},VisuMZ[_0x4ca968('0x40c')]['Window_ShopBuy_price']=Window_ShopBuy[_0x4ca968('0x27')]['price'],Window_ShopBuy[_0x4ca968('0x27')][_0x4ca968('0x110')]=function(_0x3eb06c){const _0x150fab=_0x4ca968;if(!_0x3eb06c)return 0x0;const _0xb86a46=VisuMZ[_0x150fab('0x40c')]['Window_ShopBuy_price'][_0x150fab('0x38f')](this,_0x3eb06c);return this[_0x150fab('0x3da')](_0x3eb06c,_0xb86a46);},Window_ShopBuy[_0x4ca968('0x27')][_0x4ca968('0x3da')]=function(_0x25eb4c,_0x783e47){const _0x2fcc9b=_0x4ca968,_0x1916da=_0x25eb4c['note'];if(_0x1916da[_0x2fcc9b('0x1e5')](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x2b0e72=String(RegExp['$1']);try{if('vAWfn'!=='hrQle')eval(_0x2b0e72);else{function _0x35f765(){const _0x2c6591=_0x2fcc9b;return _0x293385[_0x2c6591('0x40c')][_0x2c6591('0x1f8')][_0x2c6591('0x38f')](this);}}}catch(_0x528740){if(_0x2fcc9b('0x7e')!==_0x2fcc9b('0x7e')){function _0x137ca6(){const _0x5ae628=_0x2fcc9b;if(!this[_0x5ae628('0x18b')]())return;const _0x4c77c5=this['commandStyle'](),_0x390654=_0x2673bb[_0x5ae628('0x40c')][_0x5ae628('0x3af')][_0x5ae628('0x112')]['CmdIconEquip'],_0x135e9d=_0x4c77c5===_0x5ae628('0x26f')?_0x26c187['equip2']:_0x5ae628('0x2b7')[_0x5ae628('0x43e')](_0x390654,_0x39d68f['equip2']),_0x42aa0a=this[_0x5ae628('0x311')]();this[_0x5ae628('0x56')](_0x135e9d,_0x5ae628('0x2f0'),_0x42aa0a);}}else{if($gameTemp[_0x2fcc9b('0x13f')]())console[_0x2fcc9b('0x218')](_0x528740);}}}_0x783e47=VisuMZ[_0x2fcc9b('0x40c')][_0x2fcc9b('0x3af')][_0x2fcc9b('0xcd')]['BuyPriceJS'][_0x2fcc9b('0x38f')](this,_0x25eb4c,_0x783e47);if(isNaN(_0x783e47))_0x783e47=0x0;return Math[_0x2fcc9b('0x3f3')](_0x783e47);},Window_ShopBuy['prototype'][_0x4ca968('0x1e1')]=function(_0x3b5477){const _0x3c8cbf=_0x4ca968;this['resetFontSettings']();const _0x3c70df=this[_0x3c8cbf('0x425')](_0x3b5477),_0x4af8b3=this[_0x3c8cbf('0x110')](_0x3c70df),_0x15df12=TextManager[_0x3c8cbf('0x25b')],_0x2c7d21=this[_0x3c8cbf('0x9e')](_0x3b5477),_0x2663c0=this['priceWidth'](),_0x6f0a85=this[_0x3c8cbf('0x26e')](_0x15df12),_0x37587e=_0x2c7d21['x']+_0x2c7d21[_0x3c8cbf('0x30e')]-_0x2663c0-_0x6f0a85,_0x24cd7e=_0x2c7d21[_0x3c8cbf('0x30e')]-_0x2663c0-_0x6f0a85;this[_0x3c8cbf('0x1b4')](this[_0x3c8cbf('0x1ad')](_0x3c70df)),this['drawItemName'](_0x3c70df,_0x2c7d21['x'],_0x2c7d21['y'],_0x24cd7e),this[_0x3c8cbf('0x2c5')](_0x4af8b3,_0x37587e,_0x2c7d21['y'],_0x2663c0,_0x3c8cbf('0x3a4')),this[_0x3c8cbf('0x1d6')](ColorManager[_0x3c8cbf('0x249')]()),this['drawText'](_0x15df12,_0x2c7d21['x'],_0x2c7d21['y'],_0x2c7d21[_0x3c8cbf('0x30e')],_0x3c8cbf('0x3a4')),this[_0x3c8cbf('0x1b4')](!![]);},Window_ShopSell[_0x4ca968('0x27')][_0x4ca968('0x29c')]=function(){const _0x4be579=_0x4ca968;return SceneManager[_0x4be579('0x98')][_0x4be579('0x244')]()?0x1:0x2;},VisuMZ['ItemsEquipsCore'][_0x4ca968('0x421')]=Window_ShopSell[_0x4ca968('0x27')][_0x4ca968('0x1ad')],Window_ShopSell['prototype'][_0x4ca968('0x1ad')]=function(_0x2f7849){const _0x19cdd0=_0x4ca968;if(!_0x2f7849)return![];const _0x4008d3=_0x2f7849[_0x19cdd0('0x283')];if(_0x4008d3[_0x19cdd0('0x1e5')](/<CANNOT SELL>/i))return![];if(_0x4008d3[_0x19cdd0('0x1e5')](/<CAN SELL>/i))return!![];if(_0x4008d3[_0x19cdd0('0x1e5')](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2dda9a=JSON[_0x19cdd0('0x35b')]('['+RegExp['$1'][_0x19cdd0('0x1e5')](/\d+/g)+']');for(const _0x176c75 of _0x2dda9a){if(!$gameSwitches[_0x19cdd0('0x4')](_0x176c75))return![];}}if(_0x4008d3[_0x19cdd0('0x1e5')](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x19cdd0('0x74')===_0x19cdd0('0x52')){function _0x233bf7(){const _0x3aff6c=_0x19cdd0,_0x57c91d=_0x4b1497[_0x3aff6c('0x285')]['indexOf'](_0x2eed3d['trim']());if(_0x57c91d>0x0)_0x4761b2[_0x3aff6c('0x254')][_0x3aff6c('0x2c8')](_0x57c91d);}}else{const _0x318259=JSON[_0x19cdd0('0x35b')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1c22ff of _0x318259){if(!$gameSwitches[_0x19cdd0('0x4')](_0x1c22ff))return![];}}}if(_0x4008d3[_0x19cdd0('0x1e5')](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x19cdd0('0x392')!==_0x19cdd0('0x392')){function _0x5b9e8e(){const _0x3c5206=_0x19cdd0;_0x39d9bc[_0x3c5206('0x27')][_0x3c5206('0x3ad')][_0x3c5206('0x38f')](this,_0x3cf8c9);}}else{const _0x3abca9=JSON[_0x19cdd0('0x35b')]('['+RegExp['$1'][_0x19cdd0('0x1e5')](/\d+/g)+']');for(const _0xe83675 of _0x3abca9){if($gameSwitches[_0x19cdd0('0x4')](_0xe83675))return![];}}}return VisuMZ[_0x19cdd0('0x40c')][_0x19cdd0('0x421')][_0x19cdd0('0x38f')](this,_0x2f7849);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0xad')]=function(){return![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x430')]=function(){const _0x565b2c=_0x4ca968;Window_StatusBase['prototype'][_0x565b2c('0x430')][_0x565b2c('0x38f')](this);for(const _0x14ca4f of $gameParty[_0x565b2c('0x431')]()){ImageManager[_0x565b2c('0x270')](_0x14ca4f[_0x565b2c('0x3b0')]());}},Window_ShopStatus[_0x4ca968('0x27')]['translucentOpacity']=function(){const _0x51cce3=_0x4ca968;return VisuMZ[_0x51cce3('0x40c')][_0x51cce3('0x3af')][_0x51cce3('0xc')][_0x51cce3('0x175')];},Window_ShopStatus[_0x4ca968('0x27')]['refresh']=function(){const _0x184e7e=_0x4ca968;this[_0x184e7e('0x382')][_0x184e7e('0x86')](),this[_0x184e7e('0x423')]['clear']();if(this[_0x184e7e('0x257')]){this['resetFontSettings'](),this[_0x184e7e('0x1b4')](!![]),this[_0x184e7e('0x3d6')]();if(this['isEquipItem']())this[_0x184e7e('0x166')]();else{if(_0x184e7e('0x333')!==_0x184e7e('0xae'))this[_0x184e7e('0x2a')]();else{function _0x43f53f(){const _0x115ac2=_0x184e7e;this[_0x115ac2('0x217')]=_0x70156b['_scene'][_0x115ac2('0x117')]();}}}}},Window_ShopStatus[_0x4ca968('0x27')]['drawPossession']=function(_0x59c1f9,_0x122887){const _0x570b78=_0x4ca968;if(!this[_0x570b78('0x1b6')]()&&!DataManager[_0x570b78('0x1d7')](this[_0x570b78('0x257')]))return;const _0x7b812e=this[_0x570b78('0x3a6')]-this[_0x570b78('0x3ea')]()-_0x59c1f9,_0x139ff2=this[_0x570b78('0x26e')](_0x570b78('0x118'));this['changeTextColor'](ColorManager[_0x570b78('0x249')]()),this[_0x570b78('0x2c5')](TextManager['possession'],_0x59c1f9+this[_0x570b78('0x3ea')](),_0x122887,_0x7b812e-_0x139ff2),this['resetTextColor'](),this[_0x570b78('0x263')](this[_0x570b78('0x257')],_0x59c1f9,_0x122887,_0x7b812e);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x312')]=function(_0x39b3a5,_0x2a01ab,_0x5fca6a,_0x5cef72,_0x47718c){const _0x184724=_0x4ca968;if(VisuMZ[_0x184724('0x40c')][_0x184724('0x3af')][_0x184724('0xc')][_0x184724('0x2b0')]===![])return;_0x47718c=Math[_0x184724('0x358')](_0x47718c||0x1,0x1);while(_0x47718c--){_0x5cef72=_0x5cef72||this[_0x184724('0x5b')](),this[_0x184724('0x423')][_0x184724('0xd0')]=0xa0;const _0xd47ae8=ColorManager['getItemsEquipsCoreBackColor1']();this[_0x184724('0x423')][_0x184724('0x315')](_0x39b3a5+0x1,_0x2a01ab+0x1,_0x5fca6a-0x2,_0x5cef72-0x2,_0xd47ae8),this[_0x184724('0x423')]['paintOpacity']=0xff;}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x540ef7=_0x4ca968,_0x3a72f3=VisuMZ['ItemsEquipsCore'][_0x540ef7('0x3af')][_0x540ef7('0xc')];let _0x1392a1=_0x3a72f3[_0x540ef7('0x2af')]!==undefined?_0x3a72f3[_0x540ef7('0x2af')]:0x13;return ColorManager[_0x540ef7('0x3c7')](_0x1392a1);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x166')]=function(){const _0x22091d=_0x4ca968;VisuMZ[_0x22091d('0x40c')][_0x22091d('0x3af')][_0x22091d('0xc')][_0x22091d('0xe0')][_0x22091d('0x38f')](this);},Window_ShopStatus['prototype'][_0x4ca968('0xac')]=function(_0x2e09bf,_0x1a4458,_0x22a988){const _0x4ce0e5=_0x4ca968;if(!this[_0x4ce0e5('0x1b6')]())return![];const _0x125480=$dataSystem[_0x4ce0e5('0x285')][this[_0x4ce0e5('0x257')][_0x4ce0e5('0x239')]];return this[_0x4ce0e5('0x2fc')](_0x125480,_0x2e09bf,_0x1a4458,_0x22a988,!![]),this[_0x4ce0e5('0x312')](_0x2e09bf,_0x1a4458,_0x22a988),this[_0x4ce0e5('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x38d')]=function(){const _0xc9955d=_0x4ca968,_0xdd1c23=VisuMZ['ItemsEquipsCore'][_0xc9955d('0x3af')][_0xc9955d('0x23c')][_0xc9955d('0x3d1')];return _0xdd1c23[_0xc9955d('0x43e')]($gameParty['numItems'](this[_0xc9955d('0x257')]));},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x1')]=function(){const _0x12ca13=_0x4ca968;if(Imported[_0x12ca13('0x399')])return VisuMZ['CoreEngine'][_0x12ca13('0x3af')][_0x12ca13('0x235')][_0x12ca13('0x17a')];else{if('AUMSJ'!=='AUMSJ'){function _0x4c513d(){const _0x202855=_0x12ca13;return _0x1a158c['ItemsEquipsCore'][_0x202855('0x3af')][_0x202855('0xcd')][_0x202855('0x171')];}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_ShopStatus['prototype'][_0x4ca968('0x9a')]=function(){const _0x24a9da=_0x4ca968;return VisuMZ[_0x24a9da('0x40c')][_0x24a9da('0x3af')][_0x24a9da('0xc')]['ParamChangeFontSize'];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x34c')]=function(_0x4e890f,_0x37577a,_0x548d0b,_0x34c3c3){const _0xe36eb=_0x4ca968;this[_0xe36eb('0x2e1')](),this[_0xe36eb('0x382')][_0xe36eb('0xa')]=this[_0xe36eb('0x9a')]();let _0x4fb132=this[_0xe36eb('0x26e')](TextManager['param'](_0x4e890f))+0x4+_0x37577a;return Imported['VisuMZ_0_CoreEngine']?(this[_0xe36eb('0x39f')](_0x37577a,_0x548d0b,_0x34c3c3,_0x4e890f,!![]),VisuMZ[_0xe36eb('0x55')][_0xe36eb('0x3af')]['Param'][_0xe36eb('0x40d')]&&(_0x4fb132+=ImageManager[_0xe36eb('0x240')]+0x4)):(this[_0xe36eb('0x1d6')](ColorManager[_0xe36eb('0x249')]()),this[_0xe36eb('0x2c5')](TextManager[_0xe36eb('0x2f')](_0x4e890f),_0x37577a,_0x548d0b,_0x34c3c3)),this[_0xe36eb('0x2e1')](),_0x4fb132;},Window_ShopStatus['prototype'][_0x4ca968('0x50')]=function(_0x78e740,_0x4cf7d0,_0x4c0cd5,_0x5514da,_0x1baa10){const _0x54d13a=_0x4ca968;_0x4c0cd5+=this[_0x54d13a('0x3ea')](),_0x1baa10-=this[_0x54d13a('0x3ea')]()*0x2;const _0x55e464=VisuMZ[_0x54d13a('0x40c')]['Settings']['StatusWindow'];this['contents']['fontSize']=_0x55e464['ParamChangeFontSize'],this['changePaintOpacity'](_0x78e740[_0x54d13a('0x1b3')](this[_0x54d13a('0x257')]));if(_0x78e740[_0x54d13a('0x3c4')](this[_0x54d13a('0x257')])){if(_0x54d13a('0x2d9')===_0x54d13a('0x2d9')){const _0x19d63c=_0x55e464['AlreadyEquipMarker'];this[_0x54d13a('0x2c5')](_0x19d63c,_0x4c0cd5,_0x5514da,_0x1baa10,_0x54d13a('0x23'));}else{function _0x423bd0(){const _0x42adb3=_0x54d13a;_0x3352eb[_0x42adb3('0x40c')][_0x42adb3('0x27d')][_0x42adb3('0x38f')](this,_0x2a2732,_0x2fe8ec);}}}else{if(_0x78e740[_0x54d13a('0x1b3')](this['_item'])){const _0x173520=this[_0x54d13a('0x7b')](_0x78e740,this['_item'][_0x54d13a('0x239')]),_0x37b72a=JsonEx[_0x54d13a('0x2fd')](_0x78e740);_0x37b72a[_0x54d13a('0x21b')]=!![];const _0x14fdcf=_0x37b72a[_0x54d13a('0x254')]()[_0x54d13a('0x109')](this['_item'][_0x54d13a('0x239')]);if(_0x14fdcf>=0x0)_0x37b72a[_0x54d13a('0x1df')](_0x14fdcf,this[_0x54d13a('0x257')]);let _0x16b153=0x0,_0x38c25b=0x0,_0x2ee802=0x0;if(Imported[_0x54d13a('0x399')]){if('FLiEb'!==_0x54d13a('0x19f'))_0x16b153=_0x37b72a[_0x54d13a('0x286')](_0x4cf7d0),_0x38c25b=_0x16b153-_0x78e740[_0x54d13a('0x286')](_0x4cf7d0),this['changeTextColor'](ColorManager[_0x54d13a('0x390')](_0x38c25b)),_0x2ee802=(_0x38c25b>=0x0?'+':'')+VisuMZ[_0x54d13a('0x437')](_0x38c25b,0x0);else{function _0x25822a(){this['_categoryWindow']['show']();}}}else _0x16b153=_0x37b72a[_0x54d13a('0x2f')](_0x4cf7d0),_0x38c25b=_0x16b153-_0x78e740['param'](_0x4cf7d0),this['changeTextColor'](ColorManager[_0x54d13a('0x390')](_0x38c25b)),_0x2ee802=(_0x38c25b>=0x0?'+':'')+_0x38c25b;if(_0x2ee802==='+0')_0x2ee802=_0x55e464[_0x54d13a('0x349')];this[_0x54d13a('0x2c5')](_0x2ee802,_0x4c0cd5,_0x5514da,_0x1baa10,_0x54d13a('0x23'));}else{if('deZje'!==_0x54d13a('0x3aa')){const _0x5c4953=_0x55e464[_0x54d13a('0x35f')];this[_0x54d13a('0x2c5')](_0x5c4953,_0x4c0cd5,_0x5514da,_0x1baa10,_0x54d13a('0x23'));}else{function _0xd46724(){const _0x6ed216=_0x54d13a,_0x40f164=_0x32e2d0[_0x6ed216('0x240')],_0x218138=_0x45a3c0[_0x6ed216('0x1c0')];this[_0x6ed216('0x141')]=new _0x424caf(_0x40f164,_0x218138),this['drawNewLabelIcon'](),this['drawNewLabelText']();}}}}this['resetFontSettings'](),this[_0x54d13a('0x1b4')](!![]);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x2a')]=function(){const _0x5b067e=_0x4ca968;VisuMZ[_0x5b067e('0x40c')][_0x5b067e('0x3af')][_0x5b067e('0xc')][_0x5b067e('0x95')]['call'](this);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x3d6')]=function(){const _0x3bb177=_0x4ca968;this[_0x3bb177('0xf')]={};if(!this[_0x3bb177('0x257')])return;const _0x781de1=this[_0x3bb177('0x257')][_0x3bb177('0x283')];if(_0x781de1[_0x3bb177('0x1e5')](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){if(_0x3bb177('0x256')!=='OdlcF'){const _0x458798=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x2bbc70 of _0x458798){if(_0x3bb177('0x2ed')!==_0x3bb177('0x2ed')){function _0x3031b2(){const _0x258f41=_0x3bb177,_0x10d15a=_0x1323c9[_0x258f41('0x40c')][_0x258f41('0x3af')][_0x258f41('0x1f9')][_0x258f41('0xd8')];return _0x10d15a[_0x258f41('0x1e5')](/#(.*)/i)?'#'+_0x7375d8(_0x2b7665['$1']):_0x26d264[_0x258f41('0x3eb')](_0x10d15a);}}else{if(_0x2bbc70[_0x3bb177('0x1e5')](/(.*):[ ](.*)/i)){const _0x197a34=String(RegExp['$1'])[_0x3bb177('0x434')]()[_0x3bb177('0x3c3')](),_0x366b42=String(RegExp['$2'])[_0x3bb177('0x3c3')]();this['_customItemInfo'][_0x197a34]=_0x366b42;}}}}else{function _0x28f136(){const _0xc069d2=_0x3bb177;this[_0xc069d2('0x2a8')](_0x578fd5);}}}},Window_ShopStatus['prototype'][_0x4ca968('0x3d2')]=function(){return 0x16;},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x2e1')]=function(){const _0x2e6b45=_0x4ca968;Window_StatusBase[_0x2e6b45('0x27')][_0x2e6b45('0x2e1')][_0x2e6b45('0x38f')](this),this[_0x2e6b45('0x382')][_0x2e6b45('0xa')]=this[_0x2e6b45('0x1d')]||this['contents'][_0x2e6b45('0xa')],this[_0x2e6b45('0x382')][_0x2e6b45('0x3eb')]=this[_0x2e6b45('0x3c9')]||this['contents'][_0x2e6b45('0x3eb')];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x15d')]=function(){const _0x3d86b2=_0x4ca968;return this[_0x3d86b2('0x382')][_0x3d86b2('0xa')]/$gameSystem['mainFontSize']();},Window_ShopStatus[_0x4ca968('0x27')]['drawIcon']=function(_0x22568e,_0x4aa4b4,_0x34882c){const _0x87b139=_0x4ca968,_0x225bbe=ImageManager[_0x87b139('0x107')]('IconSet'),_0x5199c2=ImageManager[_0x87b139('0x240')],_0xdf8128=ImageManager[_0x87b139('0x1c0')],_0x14bb6e=_0x22568e%0x10*_0x5199c2,_0x42b666=Math[_0x87b139('0x3f3')](_0x22568e/0x10)*_0xdf8128,_0x4b58ee=Math[_0x87b139('0x426')](_0x5199c2*this['fontSizeRatio']()),_0x35f963=Math[_0x87b139('0x426')](_0xdf8128*this['fontSizeRatio']());this[_0x87b139('0x382')][_0x87b139('0x37b')](_0x225bbe,_0x14bb6e,_0x42b666,_0x5199c2,_0xdf8128,_0x4aa4b4,_0x34882c,_0x4b58ee,_0x35f963);},Window_ShopStatus[_0x4ca968('0x27')]['processDrawIcon']=function(_0x27efc9,_0xaa83b9){const _0x54dbf1=_0x4ca968;if(_0xaa83b9[_0x54dbf1('0x21')]){if('QpGko'===_0x54dbf1('0x40')){function _0x123b4d(){const _0x29f910=_0x54dbf1;_0x4fea84[_0x29f910('0x27')]['activate']['call'](this),this[_0x29f910('0x33f')]();}}else this[_0x54dbf1('0x298')](_0x27efc9,_0xaa83b9['x'],_0xaa83b9['y']+0x2);}_0xaa83b9['x']+=Math['ceil'](ImageManager[_0x54dbf1('0x240')]*this[_0x54dbf1('0x15d')]());if(this['fontSizeRatio']()===0x1)_0xaa83b9['x']+=0x4;},Window_ShopStatus['prototype'][_0x4ca968('0x2fc')]=function(_0x4aa809,_0x51bc13,_0x3858c4,_0x5a7530,_0x210f3e,_0xf3ed09){const _0xb577bf=_0x4ca968;_0x4aa809=_0x4aa809||'',_0xf3ed09=_0xf3ed09||_0xb577bf('0x291'),this[_0xb577bf('0x1d')]=this[_0xb577bf('0x3d2')](),this[_0xb577bf('0x3c9')]=_0x210f3e?ColorManager[_0xb577bf('0x249')]():this[_0xb577bf('0x382')][_0xb577bf('0x3eb')],_0x51bc13+=this[_0xb577bf('0x3ea')](),_0x5a7530-=this['itemPadding']()*0x2;const _0x400b1c=this[_0xb577bf('0x143')](_0x4aa809);if(_0xf3ed09===_0xb577bf('0x23')){if('TcSqr'!==_0xb577bf('0x2ad'))_0x51bc13=_0x51bc13+Math[_0xb577bf('0x3f3')]((_0x5a7530-_0x400b1c[_0xb577bf('0x30e')])/0x2);else{function _0x4e2f4b(){const _0x3c966a=_0xb577bf;return _0x3de7f7['ItemsEquipsCore'][_0x3c966a('0x3af')]['StatusWindow'][_0x3c966a('0x36c')];}}}else{if(_0xf3ed09===_0xb577bf('0x3a4')){if(_0xb577bf('0x16e')===_0xb577bf('0x16e'))_0x51bc13=_0x51bc13+_0x5a7530-_0x400b1c[_0xb577bf('0x30e')];else{function _0xbebaf7(){const _0x2403f3=_0xb577bf;return _0x16f0be[_0x2403f3('0x40c')][_0x2403f3('0x125')][_0x2403f3('0x38f')](this);}}}}_0x3858c4+=(this[_0xb577bf('0x5b')]()-_0x400b1c[_0xb577bf('0x3e2')])/0x2,this[_0xb577bf('0x148')](_0x4aa809,_0x51bc13,_0x3858c4,_0x5a7530),this[_0xb577bf('0x1d')]=undefined,this[_0xb577bf('0x3c9')]=undefined,this[_0xb577bf('0x2e1')]();},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x0')]=function(_0x495a4f,_0x3adb60,_0x297cc0){const _0x5abd83=_0x4ca968;if(!DataManager[_0x5abd83('0x1d7')](this[_0x5abd83('0x257')]))return![];const _0xcbf41b=this['getItemConsumableLabel']();this[_0x5abd83('0x2fc')](_0xcbf41b,_0x495a4f,_0x3adb60,_0x297cc0,!![]);const _0x1404ba=this[_0x5abd83('0x2c4')]();return this[_0x5abd83('0x2fc')](_0x1404ba,_0x495a4f,_0x3adb60,_0x297cc0,![],_0x5abd83('0x3a4')),this[_0x5abd83('0x312')](_0x495a4f,_0x3adb60,_0x297cc0),this[_0x5abd83('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x40b')]=function(){const _0x4b5bdf=_0x4ca968;return VisuMZ[_0x4b5bdf('0x40c')][_0x4b5bdf('0x3af')][_0x4b5bdf('0xc')][_0x4b5bdf('0x357')];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x2c4')]=function(){const _0x5f406a=_0x4ca968,_0x213ec6='CONSUMABLE';if(this[_0x5f406a('0xf')][_0x213ec6])return this[_0x5f406a('0xf')][_0x213ec6];if(this[_0x5f406a('0x343')]()){if(_0x5f406a('0x2d2')===_0x5f406a('0x3f9')){function _0x159f25(){const _0x49db4d=_0x5f406a;if(this[_0x49db4d('0x21b')]){const _0x554e13=_0x5e2786[_0x49db4d('0x2fd')](this);_0x554e13[_0x49db4d('0x21b')]=!![],_0x221506[_0x49db4d('0x40c')]['Game_Actor_changeEquip'][_0x49db4d('0x38f')](this,_0x561f9f,_0x2dfcb0),this['equipAdjustHpMp'](_0x554e13);}else _0x22395d[_0x49db4d('0x40c')][_0x49db4d('0x8c')][_0x49db4d('0x38f')](this,_0x168c66,_0x11509c);}}else return VisuMZ['ItemsEquipsCore'][_0x5f406a('0x3af')][_0x5f406a('0xc')][_0x5f406a('0x123')];}else{if(_0x5f406a('0x34f')===_0x5f406a('0x92')){function _0x2164e9(){const _0x4df19d=_0x5f406a,_0x149548=this[_0x4df19d('0x3d9')];_0x149548['drawText'](_0x34ce68,0x0,_0x5070cc['y'],_0x149548[_0x4df19d('0x3a6')],_0x4df19d('0x23'));}}else return VisuMZ[_0x5f406a('0x40c')][_0x5f406a('0x3af')][_0x5f406a('0xc')][_0x5f406a('0x261')];}},Window_ShopStatus[_0x4ca968('0x27')]['canConsumeItem']=function(){const _0x210cee=_0x4ca968;if(VisuMZ['CoreEngine']&&VisuMZ[_0x210cee('0x55')][_0x210cee('0x3af')][_0x210cee('0x18a')][_0x210cee('0x201')]&&DataManager[_0x210cee('0x308')](this[_0x210cee('0x257')]))return![];else{if(_0x210cee('0x198')===_0x210cee('0x198'))return this[_0x210cee('0x257')]['consumable'];else{function _0x31f94e(){const _0x5b47b6=_0x210cee,_0x851b74=_0x47568b['ItemsEquipsCore'][_0x5b47b6('0x3af')]['EquipScene'];return _0x851b74[_0x5b47b6('0x2ca')]||_0x851b74[_0x5b47b6('0x158')];}}}},Window_ShopStatus[_0x4ca968('0x27')]['drawItemQuantity']=function(_0x452887,_0xf2a37b,_0x291ff8){const _0x38e00b=_0x4ca968;if(!this[_0x38e00b('0x1b6')]()&&!DataManager[_0x38e00b('0x1d7')](this[_0x38e00b('0x257')]))return![];if(DataManager['isKeyItem'](this[_0x38e00b('0x257')])&&!$dataSystem[_0x38e00b('0x345')]){const _0x32250d=TextManager[_0x38e00b('0x20c')];this[_0x38e00b('0x2fc')](_0x32250d,_0x452887,_0xf2a37b,_0x291ff8,!![],_0x38e00b('0x23'));}else{const _0x18d30b=TextManager[_0x38e00b('0x42a')];this[_0x38e00b('0x2fc')](_0x18d30b,_0x452887,_0xf2a37b,_0x291ff8,!![]);const _0x3c6ad=this[_0x38e00b('0x38d')]();this[_0x38e00b('0x2fc')](_0x3c6ad,_0x452887,_0xf2a37b,_0x291ff8,![],_0x38e00b('0x3a4'));}return this[_0x38e00b('0x312')](_0x452887,_0xf2a37b,_0x291ff8),this[_0x38e00b('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')]['getItemQuantityText']=function(){const _0x26f0c3=_0x4ca968,_0x46d4c5=_0x26f0c3('0x179');if(this[_0x26f0c3('0xf')][_0x46d4c5])return this[_0x26f0c3('0xf')][_0x46d4c5];const _0x523f7b=VisuMZ[_0x26f0c3('0x40c')][_0x26f0c3('0x3af')][_0x26f0c3('0x23c')][_0x26f0c3('0x3d1')];return _0x523f7b[_0x26f0c3('0x43e')]($gameParty[_0x26f0c3('0x412')](this[_0x26f0c3('0x257')]));},Window_ShopStatus[_0x4ca968('0x27')]['drawItemOccasion']=function(_0xdba5d2,_0x181b14,_0x4760f2){const _0x275ec3=_0x4ca968,_0x5c22a3=this['getItemOccasionText']();return this[_0x275ec3('0x2fc')](_0x5c22a3,_0xdba5d2,_0x181b14,_0x4760f2,![],_0x275ec3('0x23')),this['drawItemDarkRect'](_0xdba5d2,_0x181b14,_0x4760f2),this[_0x275ec3('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')]['getItemOccasionText']=function(){const _0x451395=_0x4ca968,_0x375d26=_0x451395('0x267');if(this['_customItemInfo'][_0x375d26])return this['_customItemInfo'][_0x375d26];const _0x3830f8=VisuMZ['ItemsEquipsCore'][_0x451395('0x3af')][_0x451395('0xc')],_0x438c16='Occasion%1'['format'](this['_item'][_0x451395('0x181')]);return _0x3830f8[_0x438c16];},Window_ShopStatus[_0x4ca968('0x27')]['drawItemScope']=function(_0x576807,_0x24f3c7,_0x389f72){const _0x4d9ff5=_0x4ca968,_0x36c58e=this['getItemScopeText']();return this[_0x4d9ff5('0x2fc')](_0x36c58e,_0x576807,_0x24f3c7,_0x389f72,![],_0x4d9ff5('0x23')),this[_0x4d9ff5('0x312')](_0x576807,_0x24f3c7,_0x389f72),this[_0x4d9ff5('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x11d')]=function(){const _0x108f92=_0x4ca968,_0x4c2ba2=_0x108f92('0x384');if(this[_0x108f92('0xf')][_0x4c2ba2])return this[_0x108f92('0xf')][_0x4c2ba2];const _0x41d50b=VisuMZ[_0x108f92('0x40c')][_0x108f92('0x3af')][_0x108f92('0xc')];if(Imported[_0x108f92('0x24a')]){const _0x32617a=this['_item'][_0x108f92('0x283')];if(_0x32617a['match'](/<TARGET:[ ](.*)>/i)){const _0x36d0db=String(RegExp['$1']);if(_0x36d0db[_0x108f92('0x1e5')](/(\d+) RANDOM ANY/i)){if(_0x108f92('0x8b')!==_0x108f92('0x8b')){function _0x5030d8(){const _0x26d996=_0x108f92;_0x99c117=_0x26d996('0x164')[_0x26d996('0x43e')](_0x4db91b['id']);}}else return _0x41d50b[_0x108f92('0x1a1')][_0x108f92('0x43e')](Number(RegExp['$1']));}else{if(_0x36d0db[_0x108f92('0x1e5')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x41d50b[_0x108f92('0x396')]['format'](Number(RegExp['$1']));else{if(_0x36d0db[_0x108f92('0x1e5')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if(_0x108f92('0x322')===_0x108f92('0x322'))return _0x41d50b[_0x108f92('0x104')][_0x108f92('0x43e')](Number(RegExp['$1']));else{function _0x3d4d99(){return 0x63;}}}else{if(_0x36d0db['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x108f92('0x2c0')===_0x108f92('0x2c0'))return _0x41d50b[_0x108f92('0x355')];else{function _0x3e5fa9(){const _0x3f29f3=_0x108f92;return _0x3a9331[_0x3f29f3('0x31b')](_0x3f29f3('0x291'),_0x3f29f3('0x3a4'));}}}}}}}}const _0x84b1cb=_0x108f92('0x136')[_0x108f92('0x43e')](this['_item'][_0x108f92('0x2e')]);return _0x41d50b[_0x84b1cb];},Window_ShopStatus[_0x4ca968('0x27')]['drawItemSpeed']=function(_0x4f3d0b,_0x1195ef,_0x50723d){const _0x2e400d=_0x4ca968,_0x37485e=this[_0x2e400d('0x29f')]();this[_0x2e400d('0x2fc')](_0x37485e,_0x4f3d0b,_0x1195ef,_0x50723d,!![]);const _0x27015b=this[_0x2e400d('0x35d')]();return this[_0x2e400d('0x2fc')](_0x27015b,_0x4f3d0b,_0x1195ef,_0x50723d,![],_0x2e400d('0x3a4')),this[_0x2e400d('0x312')](_0x4f3d0b,_0x1195ef,_0x50723d),this[_0x2e400d('0x2e1')](),!![];},Window_ShopStatus['prototype'][_0x4ca968('0x29f')]=function(){const _0x40cf9a=_0x4ca968;return VisuMZ[_0x40cf9a('0x40c')]['Settings'][_0x40cf9a('0xc')]['LabelSpeed'];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x35d')]=function(){const _0xb8b149=_0x4ca968,_0x4928bd=_0xb8b149('0x1ea');if(this[_0xb8b149('0xf')][_0x4928bd])return this[_0xb8b149('0xf')][_0x4928bd];const _0x4e628e=this[_0xb8b149('0x257')][_0xb8b149('0x9f')];if(_0x4e628e>=0x7d0)return VisuMZ['ItemsEquipsCore'][_0xb8b149('0x3af')][_0xb8b149('0xc')][_0xb8b149('0x1ec')];else{if(_0x4e628e>=0x3e8)return VisuMZ[_0xb8b149('0x40c')][_0xb8b149('0x3af')]['StatusWindow'][_0xb8b149('0x294')];else{if(_0x4e628e>0x0)return VisuMZ[_0xb8b149('0x40c')][_0xb8b149('0x3af')][_0xb8b149('0xc')]['Speed1'];else{if(_0x4e628e===0x0){if(_0xb8b149('0x6d')===_0xb8b149('0x6d'))return VisuMZ[_0xb8b149('0x40c')][_0xb8b149('0x3af')]['StatusWindow'][_0xb8b149('0x337')];else{function _0x29e5d9(){const _0x1493da=_0xb8b149,_0xcc299d=_0x1efe0d[_0x1493da('0x98')],_0x1235f9=[_0x503833,_0x4be50e];return _0x1235f9['includes'](_0xcc299d[_0x1493da('0x4b')]);}}}else{if(_0x4e628e>-0x3e8){if(_0xb8b149('0x170')!==_0xb8b149('0x170')){function _0x32b2a2(){const _0x59d55d=_0xb8b149;for(const _0x56b9cd of _0x58f432){_0x56b9cd[_0x59d55d('0x1e5')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x40a24c=_0x2757d4(_0x235ac4['$1'])[_0x59d55d('0x434')]()[_0x59d55d('0x3c3')]()[_0x59d55d('0xa8')](',');for(const _0x7224bd of _0x40a24c){_0x3a7a25['categories']['push'](_0x7224bd[_0x59d55d('0x3c3')]());}}}}else return VisuMZ[_0xb8b149('0x40c')]['Settings'][_0xb8b149('0xc')][_0xb8b149('0x106')];}else{if(_0x4e628e>-0x7d0){if(_0xb8b149('0x100')===_0xb8b149('0x100'))return VisuMZ[_0xb8b149('0x40c')][_0xb8b149('0x3af')]['StatusWindow'][_0xb8b149('0x2c7')];else{function _0xe05e0d(){const _0x6da348=_0xb8b149,_0x20464c=_0x3445e1[_0x6da348('0x98')][_0x6da348('0x33a')];if(!_0x20464c)return;if(!_0x20464c[_0x6da348('0xdf')](this[_0x6da348('0x38b')]()))return![];const _0x5700b7=_0x20464c[_0x6da348('0x254')]()[this[_0x6da348('0x38b')]()];if(_0x20464c[_0x6da348('0x2f9')]()[_0x6da348('0x16c')](_0x5700b7))return![];return!![];;}}}else{if(_0x4e628e<=-0x7d0){if(_0xb8b149('0x5d')!=='Ucsaa'){function _0x3ac374(){this['cursorPageup']();}}else return VisuMZ['ItemsEquipsCore'][_0xb8b149('0x3af')]['StatusWindow'][_0xb8b149('0x41a')];}else return _0xb8b149('0x2a3');}}}}}}},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x10e')]=function(_0x199905,_0x479cfb,_0x5a8d0c){const _0x3c562b=_0x4ca968,_0x20aaf6=this['getItemSuccessRateLabel']();this[_0x3c562b('0x2fc')](_0x20aaf6,_0x199905,_0x479cfb,_0x5a8d0c,!![]);const _0x16b717=this['getItemSuccessRateText']();return this[_0x3c562b('0x2fc')](_0x16b717,_0x199905,_0x479cfb,_0x5a8d0c,![],_0x3c562b('0x3a4')),this[_0x3c562b('0x312')](_0x199905,_0x479cfb,_0x5a8d0c),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ca968('0x27')]['getItemSuccessRateLabel']=function(){const _0x20f7db=_0x4ca968;return VisuMZ[_0x20f7db('0x40c')]['Settings'][_0x20f7db('0xc')][_0x20f7db('0x299')];},Window_ShopStatus[_0x4ca968('0x27')]['getItemSuccessRateText']=function(){const _0x20d5ec=_0x4ca968,_0x29a55b=_0x20d5ec('0x287');if(this[_0x20d5ec('0xf')][_0x29a55b])return this[_0x20d5ec('0xf')][_0x29a55b];if(Imported['VisuMZ_1_BattleCore']){if(_0x20d5ec('0x3db')!==_0x20d5ec('0x102')){const _0x4c180e=this[_0x20d5ec('0x257')][_0x20d5ec('0x283')];if(_0x4c180e['match'](/<ALWAYS HIT>/i)){if(_0x20d5ec('0x1aa')==='MBxVc'){function _0x5cc3d2(){const _0x46faa4=_0x20d5ec;_0x4ba417[_0x46faa4('0xc7')]();}}else return'100%';}else{if(_0x4c180e['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x20d5ec('0x37d')!=='PVODe')return _0x20d5ec('0x13b')['format'](Number(RegExp['$1']));else{function _0x5799f1(){const _0x5821b8=_0x20d5ec,_0x2ba896=_0x5821b8('0x11f');if(this['_customItemInfo'][_0x2ba896])return this['_customItemInfo'][_0x2ba896];let _0x5ae9dc='';return this[_0x5821b8('0xca')][_0x5821b8('0x413')]>0x0?_0x5ae9dc+='+%1'[_0x5821b8('0x43e')](this[_0x5821b8('0xca')]['selfTP']):_0x5ae9dc+='%1'['format'](this['_itemData'][_0x5821b8('0x413')]),_0x5ae9dc;}}}}}else{function _0x45917a(){const _0x3fa17a=_0x20d5ec;return this[_0x3fa17a('0x3eb')](_0x55a3ee(_0x29287e));}}}return'%1%'[_0x20d5ec('0x43e')](this[_0x20d5ec('0x257')][_0x20d5ec('0x2b3')]);},Window_ShopStatus['prototype']['drawItemRepeats']=function(_0x633bd5,_0x4d4a5a,_0x27498d){const _0x5c3fd6=_0x4ca968,_0x593faf=this['getItemRepeatsLabel']();this[_0x5c3fd6('0x2fc')](_0x593faf,_0x633bd5,_0x4d4a5a,_0x27498d,!![]);const _0xc70068=this[_0x5c3fd6('0x68')]();return this['drawItemKeyData'](_0xc70068,_0x633bd5,_0x4d4a5a,_0x27498d,![],_0x5c3fd6('0x3a4')),this[_0x5c3fd6('0x312')](_0x633bd5,_0x4d4a5a,_0x27498d),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ca968('0x27')]['getItemRepeatsLabel']=function(){const _0x2de24e=_0x4ca968;return VisuMZ[_0x2de24e('0x40c')][_0x2de24e('0x3af')][_0x2de24e('0xc')][_0x2de24e('0x36c')];},Window_ShopStatus['prototype'][_0x4ca968('0x68')]=function(){const _0x3730e2=_0x4ca968,_0x40206a=_0x3730e2('0x10f');if(this[_0x3730e2('0xf')][_0x40206a])return this['_customItemInfo'][_0x40206a];const _0x4d1c38=_0x3730e2('0x23e');return _0x4d1c38['format'](this[_0x3730e2('0x257')][_0x3730e2('0x211')]);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x8')]=function(_0x16c0b0,_0x15033d,_0x21529c){const _0x57adce=_0x4ca968,_0xe7f43c=this[_0x57adce('0x31')]();this[_0x57adce('0x2fc')](_0xe7f43c,_0x16c0b0,_0x15033d,_0x21529c,!![]);const _0x38cc8a=this[_0x57adce('0x3c5')]();return this[_0x57adce('0x2fc')](_0x38cc8a,_0x16c0b0,_0x15033d,_0x21529c,![],_0x57adce('0x3a4')),this['drawItemDarkRect'](_0x16c0b0,_0x15033d,_0x21529c),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ca968('0x27')]['getItemHitTypeLabel']=function(){const _0x54bcc5=_0x4ca968;return VisuMZ[_0x54bcc5('0x40c')][_0x54bcc5('0x3af')][_0x54bcc5('0xc')][_0x54bcc5('0x93')];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x3c5')]=function(){const _0x7464ba=_0x4ca968,_0x488cba=_0x7464ba('0xc8');if(this[_0x7464ba('0xf')][_0x488cba])return this[_0x7464ba('0xf')][_0x488cba];const _0x5490ad=VisuMZ[_0x7464ba('0x40c')][_0x7464ba('0x3af')][_0x7464ba('0xc')],_0x58fef6='HitType%1'[_0x7464ba('0x43e')](this[_0x7464ba('0x257')][_0x7464ba('0x5c')]);return _0x5490ad[_0x58fef6];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x360')]=function(_0x21468e,_0x5ad567,_0x584837){const _0x5c29aa=_0x4ca968;if(this[_0x5c29aa('0x257')][_0x5c29aa('0x31f')][_0x5c29aa('0x40e')]<=0x0)return _0x5ad567;if(this[_0x5c29aa('0x3c6')](_0x21468e,_0x5ad567,_0x584837))_0x5ad567+=this[_0x5c29aa('0x5b')]();if(this[_0x5c29aa('0x39d')](_0x21468e,_0x5ad567,_0x584837))_0x5ad567+=this[_0x5c29aa('0x5b')]();return this['resetFontSettings'](),_0x5ad567;},Window_ShopStatus['prototype'][_0x4ca968('0x3c6')]=function(_0x5ae0cc,_0x5d460f,_0x136b97){const _0x313ce7=_0x4ca968,_0xd6c0a0=this[_0x313ce7('0x1d5')]();this[_0x313ce7('0x2fc')](_0xd6c0a0,_0x5ae0cc,_0x5d460f,_0x136b97,!![]);const _0x4ad443=this['getItemDamageElementText']();return this['drawItemKeyData'](_0x4ad443,_0x5ae0cc,_0x5d460f,_0x136b97,![],_0x313ce7('0x3a4')),this[_0x313ce7('0x312')](_0x5ae0cc,_0x5d460f,_0x136b97),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x1d5')]=function(){const _0x54928a=_0x4ca968;return VisuMZ[_0x54928a('0x40c')]['Settings']['StatusWindow'][_0x54928a('0x30d')];},Window_ShopStatus['prototype']['getItemDamageElementText']=function(){const _0x24204e=_0x4ca968,_0x1a28a6=_0x24204e('0x1e4');if(this['_customItemInfo'][_0x1a28a6])return this[_0x24204e('0xf')][_0x1a28a6];if(this[_0x24204e('0x257')]['damage'][_0x24204e('0x1a6')]<=-0x1){if('grVUc'==='aIrOO'){function _0x22a4b0(){const _0x1e36f6=_0x24204e;if(_0x18685c===_0x5a06a3)return;for(let _0x4c6097=0x0;_0x4c6097<0x8;_0x4c6097++){const _0xfdb917=_0x3bb85f['ItemsEquipsCore'][_0x1e36f6('0x120')]['EquipParams'][_0x4c6097];_0x41a05f[_0x1e36f6('0x283')]['match'](_0xfdb917)&&(_0x495af0[_0x1e36f6('0x82')][_0x4c6097]=_0x481a34(_0x4b02ba['$1']));}}}else return VisuMZ[_0x24204e('0x40c')][_0x24204e('0x3af')][_0x24204e('0xc')]['ElementWeapon'];}else return this[_0x24204e('0x257')][_0x24204e('0x31f')][_0x24204e('0x1a6')]===0x0?VisuMZ['ItemsEquipsCore'][_0x24204e('0x3af')][_0x24204e('0xc')][_0x24204e('0xe8')]:$dataSystem[_0x24204e('0x5e')][this['_item']['damage'][_0x24204e('0x1a6')]];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x39d')]=function(_0x17fa9b,_0x213efa,_0x3a9a5f){const _0x473450=_0x4ca968,_0xb74cd2=this[_0x473450('0x3b7')]();this[_0x473450('0x2fc')](_0xb74cd2,_0x17fa9b,_0x213efa,_0x3a9a5f,!![]),this[_0x473450('0x32f')]();const _0x50feec=this[_0x473450('0x48')](),_0x10048d=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this['_item']['damage'][_0x473450('0x40e')]]);return this[_0x473450('0x1d6')](_0x10048d),this[_0x473450('0x2fc')](_0x50feec,_0x17fa9b,_0x213efa,_0x3a9a5f,![],_0x473450('0x3a4')),this[_0x473450('0x312')](_0x17fa9b,_0x213efa,_0x3a9a5f),this[_0x473450('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x3b7')]=function(){const _0x216c2e=_0x4ca968;if(Imported[_0x216c2e('0x24a')]&&DataManager['getDamageStyle'](this[_0x216c2e('0x257')])!=='MANUAL')return this[_0x216c2e('0x23a')]();else{if(_0x216c2e('0x248')!==_0x216c2e('0x248')){function _0x1f307e(){const _0x22a2f5=_0x216c2e,_0x2d1905=this['itemPadding']();let _0x127d5a=0x0;_0x5ab4f0[_0x22a2f5('0x399')]?_0x127d5a=this['_actor'][_0x22a2f5('0x286')](_0x262527,!![]):_0x127d5a=this[_0x22a2f5('0x33a')][_0x22a2f5('0x2f')](_0x3885d4);const _0x4de43d=_0x127d5a;this[_0x22a2f5('0x2c5')](_0x127d5a,_0x1405f1,_0x104812,_0x5d8b73-_0x2d1905,_0x22a2f5('0x3a4'));}}else return this[_0x216c2e('0x232')]();}},Window_ShopStatus[_0x4ca968('0x27')]['getItemDamageAmountLabelOriginal']=function(){const _0x21644e=_0x4ca968,_0xd6b32a=VisuMZ[_0x21644e('0x40c')][_0x21644e('0x3af')][_0x21644e('0xc')],_0x10fb86=_0x21644e('0xe6')[_0x21644e('0x43e')](this[_0x21644e('0x257')][_0x21644e('0x31f')][_0x21644e('0x40e')]),_0x48bb85=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x21644e('0x31f')][_0x21644e('0x40e')]];return _0xd6b32a[_0x10fb86][_0x21644e('0x43e')](_0x48bb85);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x32f')]=function(){const _0x2bb7ee=_0x4ca968,_0x2b2554=$gameActors['actor'](0x1);this[_0x2bb7ee('0x121')]=JsonEx[_0x2bb7ee('0x2fd')](_0x2b2554),this[_0x2bb7ee('0x419')]=JsonEx['makeDeepCopy'](_0x2b2554);},Window_ShopStatus['prototype'][_0x4ca968('0x48')]=function(){const _0x58ad59=_0x4ca968,_0xa3310a=_0x58ad59('0x253');if(this[_0x58ad59('0xf')][_0xa3310a])return this[_0x58ad59('0xf')][_0xa3310a];if(Imported['VisuMZ_1_BattleCore']&&DataManager[_0x58ad59('0x295')](this['_item'])!==_0x58ad59('0x39e')){if('yMrRR'===_0x58ad59('0x279'))return this[_0x58ad59('0x2aa')]();else{function _0x4adfc4(){const _0x1f9c44=_0x58ad59;if(this[_0x1f9c44('0x2f4')]())return _0x3a93cb[_0x1f9c44('0x40c')][_0x1f9c44('0x3af')]['EquipScene']['buttonAssistRemove'];return _0x579f3b[_0x1f9c44('0x27')][_0x1f9c44('0x2a7')][_0x1f9c44('0x38f')](this);}}}else return this[_0x58ad59('0x2c2')]();},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x2c2')]=function(){const _0x17061e=_0x4ca968;window['a']=this[_0x17061e('0x121')],window['b']=this[_0x17061e('0x419')],this[_0x17061e('0x121')]['setShopStatusWindowMode'](!![]),this[_0x17061e('0x419')]['setShopStatusWindowMode']([0x3,0x4][_0x17061e('0x16c')](this[_0x17061e('0x257')][_0x17061e('0x31f')][_0x17061e('0x40e')]));let _0x3724c1=this[_0x17061e('0x257')][_0x17061e('0x31f')][_0x17061e('0xf1')];try{const _0x48ddb0=Math[_0x17061e('0x358')](eval(_0x3724c1),0x0)/window['a'][_0x17061e('0x7f')];this[_0x17061e('0x223')]();if(isNaN(_0x48ddb0))return _0x17061e('0x2a3');else{if('kcYfm'!==_0x17061e('0x10d'))return _0x17061e('0x13b')[_0x17061e('0x43e')](Math['round'](_0x48ddb0*0x64));else{function _0x41f032(){const _0x53ab73=_0x17061e;return!_0x24a5ee&&this['nonRemovableEtypes']()[_0x53ab73('0x16c')](this[_0x53ab73('0x239')]())?![]:_0x356ad7['ItemsEquipsCore'][_0x53ab73('0x116')][_0x53ab73('0x38f')](this,_0x47adfa);}}}}catch(_0x54d0e9){if($gameTemp[_0x17061e('0x13f')]()){if(_0x17061e('0x2e7')===_0x17061e('0x3ce')){function _0x1d0127(){this['drawTextEx'](_0x35e183,_0x2ddd7a['x'],_0x1b8fc5['y'],_0xd38fa8);}}else console['log'](_0x17061e('0x20a')[_0x17061e('0x43e')](this[_0x17061e('0x257')][_0x17061e('0x25e')])),console['log'](_0x54d0e9);}return this[_0x17061e('0x223')](),_0x17061e('0x2a3');}},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x223')]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x146')]=function(_0x2684b0,_0x55dd24,_0x6644e0){const _0x497db5=_0x4ca968;if(!this[_0x497db5('0x49')]())return _0x55dd24;if(this[_0x497db5('0x54')](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this[_0x497db5('0x5b')]();if(this[_0x497db5('0x335')](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this[_0x497db5('0x5b')]();if(this['drawItemEffectsTpRecovery'](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this[_0x497db5('0x5b')]();if(this[_0x497db5('0x26')](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this[_0x497db5('0x5b')]();if(this[_0x497db5('0x1fc')](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this['lineHeight']();if(this[_0x497db5('0x14b')](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this[_0x497db5('0x5b')]();if(this[_0x497db5('0x1f5')](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this[_0x497db5('0x5b')]();if(this[_0x497db5('0x19e')](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this[_0x497db5('0x5b')]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x2684b0,_0x55dd24,_0x6644e0))_0x55dd24+=this[_0x497db5('0x5b')]();return this[_0x497db5('0x2e1')](),_0x55dd24;},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x49')]=function(){const _0x443ca0=_0x4ca968;let _0x2ebec5=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0xc25c of this['_item']['effects']){switch(_0xc25c['code']){case Game_Action[_0x443ca0('0x3d0')]:this[_0x443ca0('0xca')]['rateHP']+=_0xc25c[_0x443ca0('0x224')],this[_0x443ca0('0xca')]['flatHP']+=_0xc25c[_0x443ca0('0x119')],_0x2ebec5=!![];break;case Game_Action[_0x443ca0('0x18e')]:this[_0x443ca0('0xca')]['rateMP']+=_0xc25c['value1'],this[_0x443ca0('0xca')][_0x443ca0('0x2ba')]+=_0xc25c[_0x443ca0('0x119')],_0x2ebec5=!![];break;case Game_Action[_0x443ca0('0x316')]:this[_0x443ca0('0xca')]['gainTP']+=_0xc25c[_0x443ca0('0x224')],_0x2ebec5=!![];break;case Game_Action[_0x443ca0('0xa4')]:this[_0x443ca0('0xca')]['addState'][_0x443ca0('0x2c8')](_0xc25c[_0x443ca0('0x330')]),_0x2ebec5=!![];break;case Game_Action[_0x443ca0('0xd6')]:this[_0x443ca0('0xca')][_0x443ca0('0x417')]['push'](_0xc25c[_0x443ca0('0x330')]),this['_itemData']['removeStateBuffChanges']=!![],_0x2ebec5=!![];break;case Game_Action[_0x443ca0('0x206')]:this[_0x443ca0('0xca')][_0x443ca0('0x1f1')][_0xc25c[_0x443ca0('0x330')]]+=0x1,_0x2ebec5=!![];break;case Game_Action[_0x443ca0('0x3ed')]:this['_itemData'][_0x443ca0('0x1f1')][_0xc25c[_0x443ca0('0x330')]]-=0x1,_0x2ebec5=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x443ca0('0xca')][_0x443ca0('0x424')][_0x443ca0('0x2c8')](_0xc25c[_0x443ca0('0x330')]),this[_0x443ca0('0xca')][_0x443ca0('0x406')]=!![],_0x2ebec5=!![];break;case Game_Action[_0x443ca0('0x1ef')]:this[_0x443ca0('0xca')][_0x443ca0('0x340')]['push'](_0xc25c[_0x443ca0('0x330')]),this['_itemData'][_0x443ca0('0x406')]=!![],_0x2ebec5=!![];break;}}if(this[_0x443ca0('0xca')][_0x443ca0('0x344')][_0x443ca0('0x1fe')]>0x0)this[_0x443ca0('0xca')][_0x443ca0('0x11e')]=!![];for(let _0x4002a5=0x0;_0x4002a5<this[_0x443ca0('0xca')][_0x443ca0('0x1f1')][_0x443ca0('0x1fe')];_0x4002a5++){if(_0x443ca0('0x34b')!==_0x443ca0('0x3d4')){if(this['_itemData']['changeBuff'][_0x4002a5]!==0x0)this[_0x443ca0('0xca')][_0x443ca0('0x11e')]=!![];}else{function _0x560226(){const _0x85f9a1=_0x443ca0,_0x316324=0x0,_0x574425=this['helpAreaTop'](),_0x43eec3=_0x5de2b9[_0x85f9a1('0xf3')],_0x3fbcde=this[_0x85f9a1('0x236')]();return new _0x3e3a77(_0x316324,_0x574425,_0x43eec3,_0x3fbcde);}}}this[_0x443ca0('0x257')]['tpGain']!==0x0&&(this['_itemData'][_0x443ca0('0x413')]=this[_0x443ca0('0x257')][_0x443ca0('0x72')],_0x2ebec5=!![]);const _0x252d76=[_0x443ca0('0x3df'),_0x443ca0('0x2d5'),_0x443ca0('0x282'),_0x443ca0('0x411'),'MP\x20DAMAGE',_0x443ca0('0x3f7'),'USER\x20TP\x20GAIN',_0x443ca0('0x41'),_0x443ca0('0x376')];for(const _0x18a7ed of _0x252d76){if(_0x443ca0('0x15a')===_0x443ca0('0x15a')){if(this[_0x443ca0('0xf')][_0x18a7ed]){if('cwdAB'!==_0x443ca0('0x24c')){function _0x68a378(){const _0x46a274=_0x443ca0;return _0x4955db[_0x46a274('0x40c')][_0x46a274('0x3af')]['StatusWindow'][_0x46a274('0xc9')];}}else{_0x2ebec5=!![];break;}}}else{function _0x40a5c9(){const _0xbeec0e=_0x443ca0;_0x5816c1['ItemsEquipsCore'][_0xbeec0e('0x2a9')][_0xbeec0e('0x38f')](this),this[_0xbeec0e('0x135')]();}}}return _0x2ebec5;},Window_ShopStatus[_0x4ca968('0x27')]['drawItemEffectsHpRecovery']=function(_0x3aa5af,_0x156114,_0x559afe){const _0x494b59=_0x4ca968,_0x349b9c=_0x494b59('0x3df');if(this['_itemData'][_0x494b59('0x429')]<=0x0&&this[_0x494b59('0xca')]['flatHP']<=0x0&&!this[_0x494b59('0xf')][_0x349b9c])return![];const _0x1066ff=this['getItemEffectsHpRecoveryLabel']();this[_0x494b59('0x2fc')](_0x1066ff,_0x3aa5af,_0x156114,_0x559afe,!![]);const _0xb6f039=this[_0x494b59('0x433')]();return this['changeTextColor'](ColorManager[_0x494b59('0x15')](0x1)),this[_0x494b59('0x2fc')](_0xb6f039,_0x3aa5af,_0x156114,_0x559afe,![],_0x494b59('0x3a4')),this[_0x494b59('0x312')](_0x3aa5af,_0x156114,_0x559afe),this[_0x494b59('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0xb8')]=function(){const _0x4d453c=_0x4ca968,_0x319488=VisuMZ[_0x4d453c('0x40c')][_0x4d453c('0x3af')][_0x4d453c('0xc')][_0x4d453c('0x3bc')];return _0x319488['format'](TextManager['hp']);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x433')]=function(){const _0x4c262a=_0x4ca968,_0x502afb=_0x4c262a('0x3df');if(this[_0x4c262a('0xf')][_0x502afb])return this[_0x4c262a('0xf')][_0x502afb];let _0x2ed923='';if(this[_0x4c262a('0xca')][_0x4c262a('0x429')]>0x0)_0x2ed923+=_0x4c262a('0x1c3')['format'](Math[_0x4c262a('0x3f3')](this[_0x4c262a('0xca')]['rateHP']*0x64));if(this[_0x4c262a('0xca')][_0x4c262a('0x429')]>0x0&&this[_0x4c262a('0xca')][_0x4c262a('0x278')]>0x0)_0x2ed923+='\x20';if(this[_0x4c262a('0xca')]['flatHP']>0x0)_0x2ed923+=_0x4c262a('0x3f')[_0x4c262a('0x43e')](this['_itemData'][_0x4c262a('0x278')]);return _0x2ed923;},Window_ShopStatus['prototype'][_0x4ca968('0x335')]=function(_0x2236dd,_0x26879d,_0x55356e){const _0x1f7b42=_0x4ca968,_0xc165df=_0x1f7b42('0x2d5');if(this[_0x1f7b42('0xca')][_0x1f7b42('0x233')]<=0x0&&this[_0x1f7b42('0xca')][_0x1f7b42('0x2ba')]<=0x0&&!this[_0x1f7b42('0xf')][_0xc165df])return![];const _0x753e3f=this[_0x1f7b42('0x111')]();this[_0x1f7b42('0x2fc')](_0x753e3f,_0x2236dd,_0x26879d,_0x55356e,!![]);const _0x195afb=this[_0x1f7b42('0x3cf')]();return this[_0x1f7b42('0x1d6')](ColorManager[_0x1f7b42('0x15')](0x3)),this[_0x1f7b42('0x2fc')](_0x195afb,_0x2236dd,_0x26879d,_0x55356e,![],_0x1f7b42('0x3a4')),this['drawItemDarkRect'](_0x2236dd,_0x26879d,_0x55356e),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x111')]=function(){const _0x3c9d45=_0x4ca968,_0x1f7ed6=VisuMZ[_0x3c9d45('0x40c')][_0x3c9d45('0x3af')][_0x3c9d45('0xc')][_0x3c9d45('0x23d')];return _0x1f7ed6['format'](TextManager['mp']);},Window_ShopStatus[_0x4ca968('0x27')]['getItemEffectsMpRecoveryText']=function(){const _0x6baf5d=_0x4ca968,_0x21201c=_0x6baf5d('0x2d5');if(this[_0x6baf5d('0xf')][_0x21201c])return this['_customItemInfo'][_0x21201c];let _0x2b63c0='';if(this['_itemData'][_0x6baf5d('0x233')]>0x0)_0x2b63c0+=_0x6baf5d('0x1c3')['format'](Math[_0x6baf5d('0x3f3')](this[_0x6baf5d('0xca')][_0x6baf5d('0x233')]*0x64));if(this[_0x6baf5d('0xca')][_0x6baf5d('0x233')]>0x0&&this[_0x6baf5d('0xca')][_0x6baf5d('0x2ba')]>0x0)_0x2b63c0+='\x20';if(this[_0x6baf5d('0xca')][_0x6baf5d('0x2ba')]>0x0)_0x2b63c0+=_0x6baf5d('0x3f')[_0x6baf5d('0x43e')](this[_0x6baf5d('0xca')][_0x6baf5d('0x2ba')]);return _0x2b63c0;},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x432')]=function(_0x397cff,_0x4f52a1,_0x5319b2){const _0x4be370=_0x4ca968,_0x336c24=_0x4be370('0x282');if(this[_0x4be370('0xca')][_0x4be370('0x366')]<=0x0&&!this['_customItemInfo'][_0x336c24])return![];const _0x22e143=this['getItemEffectsTpRecoveryLabel']();this[_0x4be370('0x2fc')](_0x22e143,_0x397cff,_0x4f52a1,_0x5319b2,!![]);const _0xd3c467=this[_0x4be370('0x192')]();return this[_0x4be370('0x1d6')](ColorManager['powerUpColor']()),this[_0x4be370('0x2fc')](_0xd3c467,_0x397cff,_0x4f52a1,_0x5319b2,![],_0x4be370('0x3a4')),this[_0x4be370('0x312')](_0x397cff,_0x4f52a1,_0x5319b2),this[_0x4be370('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')]['getItemEffectsTpRecoveryLabel']=function(){const _0x1df387=_0x4ca968,_0x2e8c20=VisuMZ[_0x1df387('0x40c')][_0x1df387('0x3af')][_0x1df387('0xc')][_0x1df387('0xc6')];return _0x2e8c20[_0x1df387('0x43e')](TextManager['tp']);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x192')]=function(){const _0x5943e1=_0x4ca968,_0x2dbb5e=_0x5943e1('0x282');if(this[_0x5943e1('0xf')][_0x2dbb5e])return this[_0x5943e1('0xf')][_0x2dbb5e];let _0x134cb9='';return _0x134cb9+=_0x5943e1('0x3f')[_0x5943e1('0x43e')](this[_0x5943e1('0xca')][_0x5943e1('0x366')]),_0x134cb9;},Window_ShopStatus['prototype'][_0x4ca968('0x1f5')]=function(_0x23933d,_0x2d49e3,_0x5453e8){const _0x35923d=_0x4ca968,_0x214195=_0x35923d('0x11f');if(this['_itemData'][_0x35923d('0x413')]===0x0&&!this['_customItemInfo'][_0x214195])return![];const _0x5b8e1b=this[_0x35923d('0x2b9')]();this[_0x35923d('0x2fc')](_0x5b8e1b,_0x23933d,_0x2d49e3,_0x5453e8,!![]);const _0x37182f=this[_0x35923d('0x70')]();if(this[_0x35923d('0xca')][_0x35923d('0x413')]>0x0)this[_0x35923d('0x1d6')](ColorManager[_0x35923d('0x1ce')]());else{if(_0x35923d('0x250')===_0x35923d('0x250'))this[_0x35923d('0x1d6')](ColorManager[_0x35923d('0xee')]());else{function _0x4ad55d(){const _0x3232c2=_0x35923d,_0x17b0d9=_0x537869['note'],_0x77ca64=_0x1c7735[_0x3232c2('0x40c')]['itemEnableJS'];return _0x77ca64[_0x318681['id']]?_0x77ca64[_0x1e240f['id']][_0x3232c2('0x38f')](this,_0x2095d4):!![];}}}return this[_0x35923d('0x2fc')](_0x37182f,_0x23933d,_0x2d49e3,_0x5453e8,![],_0x35923d('0x3a4')),this[_0x35923d('0x312')](_0x23933d,_0x2d49e3,_0x5453e8),this[_0x35923d('0x2e1')](),!![];},Window_ShopStatus['prototype'][_0x4ca968('0x2b9')]=function(){const _0x3ea534=_0x4ca968,_0x121309=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x3ea534('0x1e2')];return _0x121309[_0x3ea534('0x43e')](TextManager['tp']);},Window_ShopStatus[_0x4ca968('0x27')]['getItemEffectsSelfTpGainText']=function(){const _0x405265=_0x4ca968,_0x183d9b=_0x405265('0x11f');if(this['_customItemInfo'][_0x183d9b])return this[_0x405265('0xf')][_0x183d9b];let _0xa69b52='';if(this[_0x405265('0xca')]['selfTP']>0x0)_0xa69b52+=_0x405265('0x3f')[_0x405265('0x43e')](this[_0x405265('0xca')][_0x405265('0x413')]);else{if(_0x405265('0x22d')===_0x405265('0x22d'))_0xa69b52+='%1'[_0x405265('0x43e')](this[_0x405265('0xca')][_0x405265('0x413')]);else{function _0x3d7b08(){return this['helpWindowRectItemsEquipsCore']();}}}return _0xa69b52;},Window_ShopStatus['prototype'][_0x4ca968('0x26')]=function(_0x55f02b,_0x59a4df,_0x3708a3){const _0x5f4a6d=_0x4ca968,_0x1812a2=_0x5f4a6d('0x411');if(this[_0x5f4a6d('0xca')]['rateHP']>=0x0&&this[_0x5f4a6d('0xca')][_0x5f4a6d('0x278')]>=0x0&&!this[_0x5f4a6d('0xf')][_0x1812a2])return![];const _0x3784a0=this['getItemEffectsHpDamageLabel']();this[_0x5f4a6d('0x2fc')](_0x3784a0,_0x55f02b,_0x59a4df,_0x3708a3,!![]);const _0x3c0a7f=this['getItemEffectsHpDamageText']();return this[_0x5f4a6d('0x1d6')](ColorManager['damageColor'](0x0)),this[_0x5f4a6d('0x2fc')](_0x3c0a7f,_0x55f02b,_0x59a4df,_0x3708a3,![],_0x5f4a6d('0x3a4')),this[_0x5f4a6d('0x312')](_0x55f02b,_0x59a4df,_0x3708a3),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x127')]=function(){const _0x2004b7=_0x4ca968,_0x849cf7=VisuMZ[_0x2004b7('0x40c')][_0x2004b7('0x3af')][_0x2004b7('0xc')][_0x2004b7('0x1c5')];return _0x849cf7[_0x2004b7('0x43e')](TextManager['hp']);},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x130')]=function(){const _0x5ab592=_0x4ca968,_0x7196f5=_0x5ab592('0x411');if(this['_customItemInfo'][_0x7196f5])return this[_0x5ab592('0xf')][_0x7196f5];let _0xf1036='';if(this['_itemData'][_0x5ab592('0x429')]<0x0)_0xf1036+=_0x5ab592('0x13b')[_0x5ab592('0x43e')](Math['floor'](this[_0x5ab592('0xca')][_0x5ab592('0x429')]*0x64));if(this[_0x5ab592('0xca')][_0x5ab592('0x429')]<0x0&&this[_0x5ab592('0xca')][_0x5ab592('0x278')]<0x0)_0xf1036+='\x20';if(this[_0x5ab592('0xca')][_0x5ab592('0x278')]<0x0)_0xf1036+='%1'['format'](this[_0x5ab592('0xca')]['flatHP']);return _0xf1036;},Window_ShopStatus['prototype']['drawItemEffectsMpDamage']=function(_0x12c995,_0x235f81,_0x18d18d){const _0x1526aa=_0x4ca968,_0x4a51ba=_0x1526aa('0x28d');if(this['_itemData'][_0x1526aa('0x233')]>=0x0&&this[_0x1526aa('0xca')][_0x1526aa('0x2ba')]>=0x0&&!this[_0x1526aa('0xf')][_0x4a51ba])return![];const _0x2ab75e=this['getItemEffectsMpDamageLabel']();this['drawItemKeyData'](_0x2ab75e,_0x12c995,_0x235f81,_0x18d18d,!![]);const _0x1350c2=this[_0x1526aa('0x2ef')]();return this['changeTextColor'](ColorManager[_0x1526aa('0x15')](0x2)),this[_0x1526aa('0x2fc')](_0x1350c2,_0x12c995,_0x235f81,_0x18d18d,![],'right'),this[_0x1526aa('0x312')](_0x12c995,_0x235f81,_0x18d18d),this[_0x1526aa('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')]['getItemEffectsMpDamageLabel']=function(){const _0x11f7be=_0x4ca968,_0x4bbbac=VisuMZ[_0x11f7be('0x40c')][_0x11f7be('0x3af')][_0x11f7be('0xc')]['LabelDamageMP'];return _0x4bbbac['format'](TextManager['mp']);},Window_ShopStatus[_0x4ca968('0x27')]['getItemEffectsMpDamageText']=function(){const _0x155735=_0x4ca968,_0x39946f=_0x155735('0x28d');if(this[_0x155735('0xf')][_0x39946f])return this[_0x155735('0xf')][_0x39946f];let _0x39303b='';if(this[_0x155735('0xca')][_0x155735('0x233')]<0x0)_0x39303b+='%1%'[_0x155735('0x43e')](Math[_0x155735('0x3f3')](this[_0x155735('0xca')][_0x155735('0x233')]*0x64));if(this[_0x155735('0xca')][_0x155735('0x233')]<0x0&&this[_0x155735('0xca')][_0x155735('0x2ba')]<0x0)_0x39303b+='\x20';if(this[_0x155735('0xca')]['flatMP']<0x0)_0x39303b+='%1'['format'](this['_itemData'][_0x155735('0x2ba')]);return _0x39303b;},Window_ShopStatus[_0x4ca968('0x27')]['drawItemEffectsTpDamage']=function(_0x3893a9,_0x1ecd0e,_0x58068f){const _0x3cf08e=_0x4ca968,_0x5574e7=_0x3cf08e('0x3f7');if(this[_0x3cf08e('0xca')][_0x3cf08e('0x366')]>=0x0&&!this[_0x3cf08e('0xf')][_0x5574e7])return![];const _0x2963ea=this[_0x3cf08e('0x222')]();this[_0x3cf08e('0x2fc')](_0x2963ea,_0x3893a9,_0x1ecd0e,_0x58068f,!![]);const _0x18661d=this[_0x3cf08e('0x320')]();return this['changeTextColor'](ColorManager[_0x3cf08e('0xee')]()),this[_0x3cf08e('0x2fc')](_0x18661d,_0x3893a9,_0x1ecd0e,_0x58068f,![],'right'),this['drawItemDarkRect'](_0x3893a9,_0x1ecd0e,_0x58068f),this[_0x3cf08e('0x2e1')](),!![];},Window_ShopStatus['prototype'][_0x4ca968('0x222')]=function(){const _0x4e47ce=_0x4ca968,_0x29c8b7=VisuMZ[_0x4e47ce('0x40c')][_0x4e47ce('0x3af')]['StatusWindow'][_0x4e47ce('0x2d4')];return _0x29c8b7['format'](TextManager['tp']);},Window_ShopStatus[_0x4ca968('0x27')]['getItemEffectsTpDamageText']=function(){const _0xe20454=_0x4ca968,_0x1d6954='TP\x20DAMAGE';if(this[_0xe20454('0xf')][_0x1d6954])return this[_0xe20454('0xf')][_0x1d6954];let _0x102201='';return _0x102201+='%1'['format'](this[_0xe20454('0xca')][_0xe20454('0x366')]),_0x102201;},Window_ShopStatus[_0x4ca968('0x27')]['drawItemEffectsAddedStatesBuffs']=function(_0x39d9b0,_0xfee24b,_0x3b9b36){const _0x478c7a=_0x4ca968,_0x3f1f73='ADDED\x20EFFECTS';if(!this['_itemData'][_0x478c7a('0x11e')]&&!this[_0x478c7a('0xf')][_0x3f1f73])return![];const _0x51467c=this[_0x478c7a('0x1a0')]();this['drawItemKeyData'](_0x51467c,_0x39d9b0,_0xfee24b,_0x3b9b36,!![]);const _0x2db55c=this[_0x478c7a('0x31c')]();return this['drawItemKeyData'](_0x2db55c,_0x39d9b0,_0xfee24b,_0x3b9b36,![],'right'),this[_0x478c7a('0x312')](_0x39d9b0,_0xfee24b,_0x3b9b36),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x1a0')]=function(){const _0x21f731=_0x4ca968;return VisuMZ[_0x21f731('0x40c')][_0x21f731('0x3af')][_0x21f731('0xc')][_0x21f731('0x7d')];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x31c')]=function(){const _0x51fbd5=_0x4ca968,_0xaf2e04=_0x51fbd5('0x41');if(this[_0x51fbd5('0xf')][_0xaf2e04])return this[_0x51fbd5('0xf')][_0xaf2e04];let _0xa1b89c='',_0x571604=0x0;const _0x339bbe=0x8;for(const _0x21b84f of this['_itemData'][_0x51fbd5('0x344')]){if(_0x51fbd5('0x97')===_0x51fbd5('0x97')){const _0x2e0020=$dataStates[_0x21b84f];if(_0x2e0020&&_0x2e0020[_0x51fbd5('0xb0')]>0x0){if(_0x51fbd5('0x3')!==_0x51fbd5('0x301')){_0xa1b89c+=_0x51fbd5('0x57')[_0x51fbd5('0x43e')](_0x2e0020[_0x51fbd5('0xb0')]),_0x571604++;if(_0x571604>=_0x339bbe)return _0xa1b89c;}else{function _0x1c95c6(){const _0x27f559=_0x51fbd5;return _0xf58894[_0x27f559('0x3f3')](_0x4efb70['boxWidth']/0x2);}}}}else{function _0x503658(){const _0x3df15b=_0x51fbd5;return _0x1c9fc9[_0x3df15b('0x40c')][_0x3df15b('0x3af')][_0x3df15b('0x112')][_0x3df15b('0x20b')];}}}for(let _0x3ecc42=0x0;_0x3ecc42<this[_0x51fbd5('0xca')][_0x51fbd5('0x1f1')][_0x51fbd5('0x1fe')];_0x3ecc42++){if('FfrVG'==='FfrVG'){const _0x5427f3=this[_0x51fbd5('0xca')]['changeBuff'][_0x3ecc42],_0x3dbb11=Game_BattlerBase[_0x51fbd5('0x27')][_0x51fbd5('0x180')](_0x5427f3,_0x3ecc42);if(_0x3dbb11>0x0){if(_0x51fbd5('0x336')==='SjJgA'){_0xa1b89c+='\x5cI[%1]'['format'](_0x3dbb11),_0x571604++;if(_0x571604>=_0x339bbe)return _0xa1b89c;}else{function _0x41ff39(){const _0x21c90d=_0x51fbd5;_0x4e212f[_0x21c90d('0x27')][_0x21c90d('0x2a1')][_0x21c90d('0x38f')](this);}}}}else{function _0x443320(){const _0x277c15=_0x51fbd5;return this[_0x277c15('0xdf')](_0x54770d);}}}return _0xa1b89c;},Window_ShopStatus[_0x4ca968('0x27')]['drawItemEffectsRemovedStatesBuffs']=function(_0x59c59b,_0x42f67d,_0x1c1eca){const _0x188d7d=_0x4ca968,_0x37957c=_0x188d7d('0x376');if(!this[_0x188d7d('0xca')][_0x188d7d('0x406')]&&!this['_customItemInfo'][_0x37957c])return![];const _0x403f71=this[_0x188d7d('0x12')]();this[_0x188d7d('0x2fc')](_0x403f71,_0x59c59b,_0x42f67d,_0x1c1eca,!![]);const _0x28c8cb=this['getItemEffectsRemovedStatesBuffsText']();return this[_0x188d7d('0x2fc')](_0x28c8cb,_0x59c59b,_0x42f67d,_0x1c1eca,![],'right'),this[_0x188d7d('0x312')](_0x59c59b,_0x42f67d,_0x1c1eca),this[_0x188d7d('0x2e1')](),!![];},Window_ShopStatus[_0x4ca968('0x27')]['getItemEffectsRemovedStatesBuffsLabel']=function(){const _0x3d0575=_0x4ca968;return VisuMZ['ItemsEquipsCore'][_0x3d0575('0x3af')][_0x3d0575('0xc')][_0x3d0575('0x156')];},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x398')]=function(){const _0x54ccb6=_0x4ca968,_0x359c95='REMOVED\x20EFFECTS';if(this[_0x54ccb6('0xf')][_0x359c95])return this[_0x54ccb6('0xf')][_0x359c95];let _0x4554d9='',_0x46c611=0x0;const _0x38d739=VisuMZ[_0x54ccb6('0x40c')][_0x54ccb6('0x3af')][_0x54ccb6('0xc')][_0x54ccb6('0x427')];for(const _0x1c45d4 of this[_0x54ccb6('0xca')][_0x54ccb6('0x417')]){if(_0x54ccb6('0x370')===_0x54ccb6('0x370')){const _0x112745=$dataStates[_0x1c45d4];if(_0x112745&&_0x112745[_0x54ccb6('0xb0')]>0x0){if(_0x54ccb6('0x3ca')!=='ZKTNd'){_0x4554d9+='\x5cI[%1]'[_0x54ccb6('0x43e')](_0x112745[_0x54ccb6('0xb0')]),_0x46c611++;if(_0x46c611>=_0x38d739)return _0x4554d9;}else{function _0x1a337f(){const _0x21d317=_0x54ccb6;return _0x44f0ef['ItemsEquipsCore'][_0x21d317('0x3af')][_0x21d317('0xcd')]['SellPriceRate'];}}}}else{function _0x2fb27f(){const _0x301a55=_0x54ccb6;return _0x284759[_0x301a55('0x355')];}}}for(let _0x2ef677=0x0;_0x2ef677<this[_0x54ccb6('0xca')]['removeBuff']['length'];_0x2ef677++){const _0x25e045=Game_BattlerBase[_0x54ccb6('0x27')][_0x54ccb6('0x180')](0x1,_0x2ef677);if(_0x25e045>0x0){if(_0x54ccb6('0xcf')!==_0x54ccb6('0x3d8')){_0x4554d9+=_0x54ccb6('0x57')[_0x54ccb6('0x43e')](_0x25e045),_0x46c611++;if(_0x46c611>=_0x38d739)return _0x4554d9;}else{function _0x46d925(){const _0x4377cd=_0x54ccb6;this[_0x4377cd('0x375')]();}}}}for(let _0x2e9a86=0x0;_0x2e9a86<this[_0x54ccb6('0xca')][_0x54ccb6('0x340')]['length'];_0x2e9a86++){const _0x2f8532=Game_BattlerBase[_0x54ccb6('0x27')][_0x54ccb6('0x180')](-0x1,_0x2e9a86);if(_0x2f8532>0x0){_0x4554d9+=_0x54ccb6('0x57')[_0x54ccb6('0x43e')](_0x2f8532),_0x46c611++;if(_0x46c611>=_0x38d739)return _0x4554d9;}}return _0x4554d9;},Window_ShopStatus[_0x4ca968('0x27')]['drawItemCustomEntries']=function(_0x7c5648,_0x5378a2,_0x485558){const _0x23260c=_0x4ca968;if(this[_0x23260c('0x257')][_0x23260c('0x283')][_0x23260c('0x1e5')](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if(_0x23260c('0x3ee')===_0x23260c('0x9c')){function _0x1771b7(){const _0x4bc73b=_0x23260c;_0x50d647[_0x4bc73b('0x40c')][_0x4bc73b('0x29b')][_0x4bc73b('0x38f')](this,_0x232055);}}else{const _0x511137=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x4d086b of _0x511137){if(_0x4d086b[_0x23260c('0x1e5')](/(.*):[ ](.*)/i)){const _0x11d599=String(RegExp['$1'])['trim'](),_0x345e92=String(RegExp['$2'])[_0x23260c('0x3c3')]();this[_0x23260c('0x3d7')](_0x11d599,_0x345e92,_0x7c5648,_0x5378a2,_0x485558),_0x5378a2+=this[_0x23260c('0x5b')]();}}}}return this[_0x23260c('0x2e1')](),_0x5378a2;},Window_ShopStatus[_0x4ca968('0x27')][_0x4ca968('0x3d7')]=function(_0xa3737e,_0x19dd92,_0x2d0ffc,_0x1a31ad,_0x484fb7){const _0x518e74=_0x4ca968;this[_0x518e74('0x2fc')](_0xa3737e,_0x2d0ffc,_0x1a31ad,_0x484fb7,!![]),this[_0x518e74('0x2fc')](_0x19dd92,_0x2d0ffc,_0x1a31ad,_0x484fb7,![],_0x518e74('0x3a4')),this[_0x518e74('0x312')](_0x2d0ffc,_0x1a31ad,_0x484fb7),this[_0x518e74('0x2e1')]();};
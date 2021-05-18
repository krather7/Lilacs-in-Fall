//=============================================================================
// VisuStella MZ - Common Event Menu
// VisuMZ_2_CommonEventMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_CommonEventMenu = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CommonEventMenu = VisuMZ.CommonEventMenu || {};
VisuMZ.CommonEventMenu.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [CommonEventMenu]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Common_Event_Menu_VisuStella_MZ
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Common Event Menu allows you to create your own custom menu setups all
 * through a simple Plugin Command. When using it, you can list whatever Common
 * Events you so wish and generate a menu that when selecting the menu command,
 * it will run the Common Event. This Common Event Menu setup allows you to
 * utilize a help window, a picture window, and a subtext window to allow for
 * your own personal touch when using the Common Event list window.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Launch a Common Event Menu with the Common Events that you want, in the
 *   layout that you prefer, with the options you desire by just using a simple
 *   Plugin Command.
 * * Pick from over 100+ different premade layouts for the Common Event Menu.
 * * JavaScript users can create their own custom layouts, alongside 10 extra
 *   windows to help them show any extra data they may need.
 * * The picture window can show different images whenever a specific Common
 *   Event is selected in the List Window.
 * * A help window will show information on the selected Common Event.
 * * A subtext window can display additional information about any selected
 *   Common Event.
 * * Use switches to enable, disable, show, or hide Common Events for the
 *   Common Event Menu to make it something more dynamic.
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
 * * VisuMZ_1_EventsMoveCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_OptionsCore
 *
 * When selecting pre-made Layouts for the Common Event Menu, depending on the
 * settings for the Help Window Position and Input Window Position, the four
 * main windows for the Common Event Menu will be positioned differently to
 * account for these main settings.
 * 
 * Right Input would put the List Window towards the right side of the screen.
 * If it is off, then the List Window would appear towards the left side of the
 * screen. When a layout with "Mirror" is in place, these settings are reversed
 * to apply the mirror effect.
 * 
 * Bottom Help would put the Help Window towards the bottom of the screen and
 * the Subtext would go towards the top. If the Bottom Help position is turned
 * off, then the Help Window would appear at the top while the Subtext would
 * appear at the bottom. When a layout with "Inverse" is in place, these
 * settings are reversed to apply the inverse effect.
 * 
 * When viewing the previews on the Yanfly.moe wiki, the previews will be
 * displayed with the Help Window towards the top and the input towards the
 * right side of the screen (ie the Recommended Settings).
 * 
 * !! WARNING !!
 * 
 * These settings do NOT apply to Custom Layouts in order to reduce confusion
 * for the game dev. If the game dev wishes to implement them in, then utilize
 * Scene_Base's "isBottomHelpMode" and "isRightInputMode" functions when
 * inserting the JavaScript code needed.
 * 
 * !! WARNING !!
 * 
 * Not all pre-made layouts work with all screen resolutions as this is very
 * much so the case if you plan on using a smaller-than-normal screen
 * resolution. If a specific layout does not work with a resolution you want,
 * pick another layout that works. These layouts are made under the industry
 * standard of a 16:9, 1280x720 screen resolution.
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
 * === Common Event Menu Plugin Command ===
 * 
 * This is the Plugin Command that lets you create the Common Event Menu. The
 * Common Event Menu is inaccessible from any other way.
 * 
 * ---
 *
 * Common Event Menu: Start
 * - Start a Common Event Menu with the below settings.
 *
 *   Common Events:
 *   - Select the Common Events you want shown in the menu.
 *
 *     Cancel Event:
 *     - Runs this Common Event when Cancel is pressed.
 *     - Insert 0 to disable Cancel.
 *
 *   Layout:
 *   - Pick a layout to use for the Common Event Menu.
 *   - Select "Custom" to position windows via JavaScript.
 *   - Picking '-' will not create any Common Event Menus.
 *   - Look on Yanfly.moe for a visual list of all the layouts.
 *
 *     Custom Layout:
 *     - Modify the settings for a Custom layout.
 *     - Requires the above parameter to be "Custom".
 *
 *   Optional Settings:
 *   - Optional settings for the Common Event Menu.
 * 
 * !! WARNING !!
 * 
 * Not all pre-made layouts work with all screen resolutions as this is very
 * much so the case if you plan on using a smaller-than-normal screen
 * resolution. If a specific layout does not work with a resolution you want,
 * pick another layout that works. These layouts are made under the industry
 * standard of a 16:9, 1280x720 screen resolution.
 *
 * ---
 *
 * Common Events (Sub Settings)
 * - Select the Common Events you want shown in the menu.
 * 
 *   Specific ID's:
 *
 *     ID(s):
 *     - Select the Common Events you want displayed in the menu based on their
 *       exact ID's.
 *
 *   ID Range:
 * 
 *     Range Start:
 *     - Select the Common Event ID range to start from.
 *     - This will select all the ID's up to the end range.
 * 
 *     Range End:
 *     - Select the Common Event ID range to end with.
 *     - This will select all the ID's from the start range.
 * 
 *   JS:
 *
 *     Custom JS:
 *     - Create a list of Common Event ID's with JavaScript.
 * 
 *   Filters:
 *
 *     Empty Name:
 *     - Apply filter for Common Events without a name?
 *
 *     ----- Name:
 *     - Apply filter for Common Events with ----- in their name?
 *
 * ---
 *
 * Custom Layout (Sub Settings)
 * - Modify the settings for a Custom layout.
 * - Requires the above parameter to be "Custom".
 * 
 *   Main Windows:
 * 
 *     JS: List Window:
 *     JS: Picture Window:
 *     JS: Help Window:
 *     JS: Sub Window:
 *     - Determine how this Window is positioned.
 *     - Only applies with Custom layouts.
 * 
 *   Extra Windows:
 *
 *     JS: Extra Window 1:
 *     JS: Extra Window 2:
 *     JS: Extra Window 3:
 *     JS: Extra Window 4:
 *     JS: Extra Window 5:
 *     JS: Extra Window 6:
 *     JS: Extra Window 7:
 *     JS: Extra Window 8:
 *     JS: Extra Window 9:
 *     JS: Extra Window 10:
 *     - Determine how this Extra Window is positioned.
 *     - Only applies with Custom layouts.
 * 
 * !! WARNING !!
 * 
 * These settings do NOT apply to Custom Layouts in order to reduce confusion
 * for the game dev. If the game dev wishes to implement them in, then utilize
 * Scene_Base's "isBottomHelpMode" and "isRightInputMode" functions when
 * inserting the JavaScript code needed.
 *
 * ---
 *
 * Optional Settings (Sub Settings)
 * - Optional settings for the Common Event Menu.
 * 
 *   All Windows:
 *
 *     Background Type:
 *     - Select the background type for all of the Common Event Menu windows.
 *       - 0 - Window
 *       - 1 - Dim
 *       - 2 - Transparent
 *
 *     Boundary Size:
 *     - Pick the boundary size for the layout.
 *     - Does NOT apply to Custom Layouts.
 *       - Full      (Game Screen)
 *       - UI Size   (UI Resolution)
 *       - Padded    (16 px Border)
 *       - Huge      (32 px Border)
 *       - Large     (48 px Border)
 *       - Medium    (64 px Border)
 *       - Small     (96 px Border)
 *       - Tiny      (128 px Border)
 *       - Micro     (160 px Border)
 *       - Wut       (192 px Border)
 * 
 *   List Window:
 *
 *     List Columns:
 *     - The number of columns the List Window has.
 *     - Use 'auto' to determine it automatically.
 *     - You may use JavaScript.
 *
 *     Auto Select:
 *     - Which Common Event should be selected at the start?
 *     - Use 'last' for last picked ID.
 *     - You may use JavaScript.
 *
 *     Text Alignment:
 *     - How do you want the text to be aligned for the List Window?
 * 
 *   Cancel Button:
 *
 *     Show Cancel Button:
 *     - Show the Cancel Button?
 *     - Requires a Cancel Common Event.
 *
 *     Button Scale:
 *     - Scale the button size by this much.
 *
 *     Button Position:
 *     - Select where the button appears.
 *
 *     Button Offset X:
 *     - Offset the Cancel Button X position by this much.
 *
 *     Button Offset Y:
 *     - Offset the Cancel Button Y position by this much.
 * 
 *   Picture Window:
 *
 *     Auto-Fit Image:
 *     - Automatically fit the picture to the size of the Picture Window if the
 *       picture is larger than the window?
 *
 *     Image Anchor X:
 *     - Pick how the picture is anchored horizontally in the Picture Window.
 *
 *     Image Anchor Y:
 *     - Pick how the picture is anchored vertically in the Picture Window.
 *
 * ---
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * The following are comment tags that have been added through this plugin.
 * These comment tags will not work with your game if this plugin is OFF or not
 * present. To make a comment tag, create a comment inside of the Common Event
 * and type in any of the comment tags seen below for their effects.
 *
 * ---
 * 
 * === Basic-Related Comment Tags ===
 * 
 * ---
 *
 * <Name: text>
 *
 * - Used for: Common Event Comment Tag
 * - Replaces the text that appears in the Common Event Menu List with this
 *   instead of the Common Event's name found in the database.
 * - Replace 'text' with the name you want to be displayed in the List Window.
 * - If this comment tag is not used, default to the Common Event's name.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Common Event Comment Tag
 * - Sets the icon shown next to this Common Event.
 * - Replace 'x' with a number representing the icon index used for this
 *   Common Event.
 * - If this comment tag is not used, default to the Plugin Parameters.
 *
 * ---
 *
 * <Indent: x>
 *
 * - Used for: Common Event Comment Tag
 * - Indents the name when it appears in the Common Event List.
 * - Replace 'x' with the number of times to indent the name.
 * - Each indent is equal to an icon width.
 * - Indents do not apply if there are more than 1 column for the event list.
 *
 * ---
 *
 * <Picture: filename>
 *
 * - Used for: Common Event Comment Tag
 * - Description
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 *
 * ---
 * 
 * === Description-Related Comment Tags ===
 * 
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Help Window.
 * - Replace 'text' with the text you want to display in the Help Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 *
 * <Subtext Description>
 *  text
 *  text
 * </Subtext Description>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Sub Window.
 * - Replace 'text' with the text you want to display in the Sub Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 *
 * <Extra Description x>
 *  text
 *  text
 * </Extra Description x>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Extra Window.
 * - Replace 'x' with a number from 1 to 10 to determine which Extra Window to
 *   display the text in.
 * - Replace 'text' with the text you want to display in the Extra Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 * 
 * === Visibility-Related Comment Tags ===
 * 
 * ---
 *
 * <Show Switch: x>
 * 
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine the Common Event's visibility.
 * - If 'All' notetag variant is used, the Common Event will be hidden until
 *   all switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, the Common Event will be shown if any
 *   of the switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 * 
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine the Common Event's visibility.
 * - If 'All' notetag variant is used, the Common Event will be shown until
 *   all switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, the Common Event will be hidden if any
 *   of the switches are ON. Otherwise, it would be shown.
 *
 * ---
 * 
 * === JavaScript Comment Tag: Visibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a Common Event is visible in the menu by code.
 * 
 * ---
 *
 * <JS Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Visible>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on JavaScript
 *   code.
 * - Replace 'code' to determine the type visible status of the Common Event.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of code.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   Common Event will be visible or not.
 * - All other Common Event conditions must be met in order for this to code to
 *   count.
 *
 * ---
 * 
 * === Enable-Related Comment Tags ===
 * 
 * ---
 *
 * <Enable Switch: x>
 * 
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine if the Common Event's enabled.
 * - If 'All' notetag variant is used, the Common Event will be disabled until
 *   all switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, the Common Event will be enabled if any
 *   of the switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 * 
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine if the Common Event's enabled.
 * - If 'All' notetag variant is used, the Common Event will be enabled until
 *   all switches are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, the Common Event will be disabled if any
 *   of the switches are ON. Otherwise, it would be enabled.
 *
 * ---
 * 
 * === JavaScript Comment Tag: Enable ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a Common Event can be selectable by code.
 * 
 * ---
 *
 * <JS Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Enable>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on JavaScript
 *   code.
 * - Replace 'code' to determine the type enabled status of the Common Event.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of code.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   Common Event will be enabled or not.
 * - All other Common Event conditions must be met in order for this to code to
 *   count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * There's only a single plugin parameter for the default settings and that's
 * to define the default icon displayed for the Common Event Menu when a Common
 * Event does not have the <Icon: x> comment tag.
 *
 * ---
 *
 * Settings
 * 
 *   Default Icon:
 *   - Select what icon will be the default Common Event entry icon.
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
 * * Irina
 * * V.Aero
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.00 Official Release Date: March 1, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CommonEventMenu
 * @text Common Event Menu: Start
 * @desc Start a Common Event Menu with the below settings.
 *
 * @arg CommonEvents:struct
 * @text Common Events
 * @type struct<CommonEvents>
 * @desc Select the Common Events you want shown in the menu.
 * @default {"Specific":"","ID:arraynum":"[]","Range":"","RangeStart:num":"0","RangeEnd:num":"0","JS":"","CustomJS:func":"\"// Declare Variables\\nlet list = [];\\n\\n// Add Common Event ID's\\n\\n\\n// Return List\\nreturn list;\"","Filters":"","FilterEmptyName:eval":"true","FilterLine:eval":"true"}
 *
 * @arg CancelEvent:num
 * @text Cancel Event
 * @parent CommonEvents:struct
 * @type common_event
 * @desc Runs this Common Event when Cancel is pressed.
 * Insert 0 to disable Cancel.
 * @default 0
 *
 * @arg Layout:str
 * @text Layout
 * @type select
 * @option -
 * @option Custom
 * @option -
 * @option Full-Screen
 * @option -
 * @option Gallery 1-Row-List
 * @option Gallery 2-Row-List
 * @option Gallery 3-Row-List
 * @option Gallery 4-Row-List
 * @option Gallery 5-Row-List
 * @option Gallery 6-Row-List
 * @option -
 * @option Gallery 1-Row-List Inverse
 * @option Gallery 2-Row-List Inverse
 * @option Gallery 3-Row-List Inverse
 * @option Gallery 4-Row-List Inverse
 * @option Gallery 5-Row-List Inverse
 * @option Gallery 6-Row-List Inverse
 * @option -
 * @option Gallery 1-Row-List No-Sub
 * @option Gallery 2-Row-List No-Sub
 * @option Gallery 3-Row-List No-Sub
 * @option Gallery 4-Row-List No-Sub
 * @option Gallery 5-Row-List No-Sub
 * @option Gallery 6-Row-List No-Sub
 * @option -
 * @option Gallery 1-Row-List No-Sub Inverse
 * @option Gallery 2-Row-List No-Sub Inverse
 * @option Gallery 3-Row-List No-Sub Inverse
 * @option Gallery 4-Row-List No-Sub Inverse
 * @option Gallery 5-Row-List No-Sub Inverse
 * @option Gallery 6-Row-List No-Sub Inverse
 * @option -
 * @option Gallery 1-Row-List Thick-Sub
 * @option Gallery 2-Row-List Thick-Sub
 * @option Gallery 3-Row-List Thick-Sub
 * @option Gallery 4-Row-List Thick-Sub
 * @option Gallery 5-Row-List Thick-Sub
 * @option Gallery 6-Row-List Thick-Sub
 * @option -
 * @option Gallery 1-Row-List Thick-Sub Inverse
 * @option Gallery 2-Row-List Thick-Sub Inverse
 * @option Gallery 3-Row-List Thick-Sub Inverse
 * @option Gallery 4-Row-List Thick-Sub Inverse
 * @option Gallery 5-Row-List Thick-Sub Inverse
 * @option Gallery 6-Row-List Thick-Sub Inverse
 * @option -
 * @option Side-Sub
 * @option Side-Sub Inverse
 * @option Side-Sub Mirror
 * @option Side-Sub Mirror Inverse
 * @option -
 * @option Side-Sub Firm-List
 * @option Side-Sub Firm-List Inverse
 * @option Side-Sub Firm-List Mirror
 * @option Side-Sub Firm-List Mirror Inverse
 * @option -
 * @option Side-Sub Half-Base-Pict
 * @option Side-Sub Half-Base-Pict Inverse
 * @option Side-Sub Half-Base-Pict Mirror
 * @option Side-Sub Half-Base-Pict Mirror Inverse
 * @option -
 * @option Side-Sub Lite-List
 * @option Side-Sub Lite-List Inverse
 * @option Side-Sub Lite-List Mirror
 * @option Side-Sub Lite-List Mirror Inverse
 * @option -
 * @option Standard
 * @option Standard Inverse
 * @option Standard Mirror
 * @option Standard Mirror Inverse
 * @option -
 * @option Standard No-Sub
 * @option Standard No-Sub Inverse
 * @option Standard No-Sub Mirror
 * @option Standard No-Sub Mirror Inverse
 * @option -
 * @option Standard Sub-Corner-List
 * @option Standard Sub-Corner-List Inverse
 * @option Standard Sub-Corner-List Mirror
 * @option Standard Sub-Corner-List Mirror Inverse
 * @option -
 * @option Standard Sub-Corner-Pict
 * @option Standard Sub-Corner-Pict Inverse
 * @option Standard Sub-Corner-Pict Mirror
 * @option Standard Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Standard Thick-Sub
 * @option Standard Thick-Sub Inverse
 * @option Standard Thick-Sub Mirror
 * @option Standard Thick-Sub Mirror Inverse
 * @option -
 * @option Standard Thick-Sub-Corner-List
 * @option Standard Thick-Sub-Corner-List Inverse
 * @option Standard Thick-Sub-Corner-List Mirror
 * @option Standard Thick-Sub-Corner-List Mirror Inverse
 * @option -
 * @option Standard Thick-Sub-Corner-Pict
 * @option Standard Thick-Sub-Corner-Pict Inverse
 * @option Standard Thick-Sub-Corner-Pict Mirror
 * @option Standard Thick-Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Tall
 * @option Tall Inverse
 * @option Tall Mirror
 * @option Tall Mirror Inverse
 * @option -
 * @option Tall Half-Base-Pict
 * @option Tall Half-Base-Pict Inverse
 * @option Tall Half-Base-Pict Mirror
 * @option Tall Half-Base-Pict Mirror Inverse
 * @option -
 * @option Tall No-Sub
 * @option Tall No-Sub Inverse
 * @option Tall No-Sub Mirror
 * @option Tall No-Sub Mirror Inverse
 * @option -
 * @option Tall Thick-Sub
 * @option Tall Thick-Sub Inverse
 * @option Tall Thick-Sub Mirror
 * @option Tall Thick-Sub Mirror Inverse
 * @option -
 * @option Wide-List
 * @option Wide-List Inverse
 * @option -
 * @option Wide-List Base-Pict
 * @option Wide-List Base-Pict Inverse
 * @option -
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Inverse
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Mirror
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Wide-List No-Sub
 * @option Wide-List No-Sub Inverse
 * @option -
 * @option Wide-List Thick-Sub
 * @option Wide-List Thick-Sub Inverse
 * @option -
 * @option Custom
 * @option -
 * @desc Pick a layout to use for the Common Event Menu.
 * Select "Custom" to position windows via JavaScript.
 * @default Standard
 *
 * @arg CustomLayout:struct
 * @text Custom Layout
 * @parent Layout:str
 * @type struct<CustomLayout>
 * @desc Modify the settings for a Custom layout.
 * Requires the above parameter to be "Custom".
 * @default 
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings for the Common Event Menu.
 * @default 
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
 * @param CommonEventMenu
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultIcon:num
 * @text Default Icon
 * @desc Select what icon will be the default Common Event entry icon.
 * @default 160
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
 * Common Events Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CommonEvents:
 *
 * @param Specific
 * @text Specific ID's
 *
 * @param ID:arraynum
 * @text ID(s)
 * @parent Specific
 * @type common_event[]
 * @desc Select the Common Events you want displayed in the menu
 * based on their exact ID's.
 * @default []
 *
 * @param Range
 * @text ID Range
 *
 * @param RangeStart:num
 * @text Range Start
 * @parent Range
 * @type common_event
 * @desc Select the Common Event ID range to start from.
 * This will select all the ID's up to the end range.
 * @default 0
 *
 * @param RangeEnd:num
 * @text Range End
 * @parent Range
 * @type common_event
 * @desc Select the Common Event ID range to end with.
 * This will select all the ID's from the start range.
 * @default 0
 *
 * @param JS
 *
 * @param CustomJS:func
 * @text Custom JS
 * @parent JS
 * @type note
 * @desc Create a list of Common Event ID's with JavaScript.
 * @default "// Declare Variables\nlet list = [];\n\n// Add Common Event ID's\n\n\n// Return List\nreturn list;"
 *
 * @param Filters
 *
 * @param FilterEmptyName:eval
 * @text Empty Name
 * @parent Filters
 * @type boolean
 * @on Apply Filter
 * @off No Filter
 * @desc Apply filter for Common Events without a name?
 * @default true
 *
 * @param FilterLine:eval
 * @text ----- Name
 * @parent Filters
 * @type boolean
 * @on Apply Filter
 * @off No Filter
 * @desc Apply filter for Common Events with ----- in their name?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * CustomLayout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomLayout:
 *
 * @param Main
 * @text Main Windows
 *
 * @param List_Window_JS:func
 * @text JS: List Window
 * @parent Main
 * @type note
 * @desc Determine how the List Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = Math.floor(Graphics.width / 2);\nlet y = this.calcWindowHeight(2, false);\nlet width = Math.ceil(Graphics.width / 2);\nlet height = Graphics.height - this.calcWindowHeight(2, false) * 2;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Picture_Window_JS:func
 * @text JS: Picture Window
 * @parent Main
 * @type note
 * @desc Determine how the Picture Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = this.calcWindowHeight(2, false);\nlet width = Math.floor(Graphics.width / 2);\nlet height = Graphics.height - this.calcWindowHeight(2, false) * 2;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Help_Window_JS:func
 * @text JS: Help Window
 * @parent Main
 * @type note
 * @desc Determine how the Help Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = Graphics.width;\nlet height = this.calcWindowHeight(2, false);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Sub_Window_JS:func
 * @text JS: Sub Window
 * @parent Main
 * @type note
 * @desc Determine how the Sub Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = Graphics.height - this.calcWindowHeight(2, false);\nlet width = Graphics.width;\nlet height = this.calcWindowHeight(2, false);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 * 
 * @param Extra
 * @text Extra Windows
 *
 * @param Extra_Window_1_JS:func
 * @text JS: Extra Window 1
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 1 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_2_JS:func
 * @text JS: Extra Window 2
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 2 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_3_JS:func
 * @text JS: Extra Window 3
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 3 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_4_JS:func
 * @text JS: Extra Window 4
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 4 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_5_JS:func
 * @text JS: Extra Window 5
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 5 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_6_JS:func
 * @text JS: Extra Window 6
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 6 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_7_JS:func
 * @text JS: Extra Window 7
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 7 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_8_JS:func
 * @text JS: Extra Window 8
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 8 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_9_JS:func
 * @text JS: Extra Window 9
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 9 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_10_JS:func
 * @text JS: Extra Window 10
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 10 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 *
 * @param AllWindows
 * @text All Windows
 *
 * @param WindowBgType:num
 * @text Background Type
 * @parent AllWindows
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select the background type for all of the Common Event Menu windows.
 * @default 0
 *
 * @param BoundarySize:str
 * @text Boundary Size
 * @parent AllWindows
 * @type select
 * @option Full      (Game Screen)
 * @option UI Size   (UI Resolution)
 * @option -         -
 * @option Padded    (16 px Border)
 * @option Huge      (32 px Border)
 * @option Large     (48 px Border)
 * @option Medium    (64 px Border)
 * @option Small     (96 px Border)
 * @option Tiny      (128 px Border)
 * @option Micro     (160 px Border)
 * @option Wut       (192 px Border)
 * @desc Pick the boundary size for the layout.
 * Does NOT apply to Custom Layouts.
 * @default UI Size   (UI Resolution)
 *
 * @param ListWindow
 * @text List Window
 * 
 * @param ListColumns:str
 * @text List Columns
 * @parent ListWindow
 * @desc The number of columns the List Window has. Use 'auto'
 * to determine it automatically. You may use JavaScript.
 * @default auto
 * 
 * @param AutoSelect:str
 * @text Auto Select
 * @parent ListWindow
 * @desc Which Common Event should be selected at the start?
 * Use 'last' for last picked ID. You may use JavaScript.
 * @default 0
 *
 * @param ListTextAlign:str
 * @text Text Alignment
 * @parent ListWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the text to be aligned for the List Window?
 * @default left
 *
 * @param CancelButton
 * @text Cancel Button
 *
 * @param ShowCancelButton:eval
 * @text Show Cancel Button
 * @parent CancelButton
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Cancel Button?
 * Requires a Cancel Common Event.
 * @default true
 *
 * @param CancelButtonScale:eval
 * @text Button Scale
 * @parent CancelButton
 * @desc Scale the button size by this much.
 * @default 0.8
 *
 * @param CancelButtonPosition:str
 * @text Button Position
 * @parent CancelButton
 * @type combo
 * @option upper left
 * @option upper center
 * @option upper right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Select where the button appears.
 * @default upper right
 *
 * @param CancelOffsetX:eval
 * @text Button Offset X
 * @parent CancelButton
 * @desc Offset the Cancel Button X position by this much.
 * @default -18
 *
 * @param CancelOffsetY:eval
 * @text Button Offset Y
 * @parent CancelButton
 * @desc Offset the Cancel Button Y position by this much.
 * @default 15
 *
 * @param PictureWindow
 * @text Picture Window
 *
 * @param PictureAutoFit:eval
 * @text Auto-Fit Image
 * @parent PictureWindow
 * @type boolean
 * @on Auto-Fit
 * @off Real Size
 * @desc Automatically fit the picture to the size of the Picture
 * Window if the picture is larger than the window?
 * @default true
 *
 * @param PictureAnchorX:str
 * @text Image Anchor X
 * @parent PictureWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Pick how the picture is anchored horizontally in the Picture Window.
 * @default center
 *
 * @param PictureAnchorY:str
 * @text Image Anchor Y
 * @parent PictureWindow
 * @type combo
 * @option top
 * @option middle
 * @option bottom
 * @desc Pick how the picture is anchored vertically in the Picture Window.
 * @default middle
 *
 */
//=============================================================================

const _0x527d=['_commonEventMenuNote','push','JSON','commonEventMenuSubWindowRect','_columns','makeCommandList','addChild','commonEventMenuPictureWindowRect','commonEventMenuBoundary','boxHeight','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','FUNC','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','name','bind','_commonEventMenuNameIndent','launchCommonEventMenu','addCommonEventMenuWindow','log','registerCommonEventMenuAidWindows','list','HideAll','RegExp','Extra_Window_%1_JS','_lastPickedCommonEventMenuID','_textAlign','_commonEventMenu_ShowLayoutName','Settings','exit','EnableJS','itemLineRect','UI\x20Size','ARRAYSTRUCT','height','toLowerCase','innerWidth','close','ARRAYFUNC','commonEventMenuName','_cancelButton','_commonEventMenu_ShowDimensions','drawItem','#%1','commonEventMenuNote','createCommonEventMenuSubWindow','version','loadPicture','process_VisuMZ_CommonEventMenu_JS','_active','forceSelect','remove','isBottomHelpMode','filter','pictureWindow','createCancelButton','List\x20Window:','eventId','VisibleJS','Subt\x20Window:','isPressed','isCommandEnabled','closeCommonEventMenu','_anchorX','Icon','createCommonEventMenuLayer','commonEventMenuDescription','middle','commonEventMenuRectangle','isSceneBattle','createCommonEventMenuHelpWindow','map','blt','openness','innerHeight','_commonEventMenuWindows','FilterLine','CommonEvent-%1-Enable-JS','createCommonEventMenuListWindow','178gWSnMF','Custom\x20Layout\x20Settings\x20not\x20defined!','ConvertParams','parameters','Scene_Base_createWindowLayer','closeCommonEventMenuDelay','CancelEvent','Game_System_initialize','commonEventMenuHelpWindowRect','toUpperCase','_interpreter','BoundarySize','34evkwPX','_settings','sort','createCommonEventMenuPictureWindow','calcWindowHeight','round','Scene_Battle','listWindow','bottom','registerAidWindow','value','_windowLayer','isPlaytest','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','commonEventMenuListWindowRect','parse','touchUI','_commonEventMenuName','ARRAYSTR','HideAny','isEnabled','concat','last','clear','EnableAny','isRightInputMode','scale','drawTextEx','PictureAnchorY','DefaultIcon','top','ARRAYNUM','center','commandName','updateOpen','RangeEnd','_aidWindows','DisableAny','295191ihEuDP','canCreateCommonEventMenu','auto','_autoFit','CancelOffsetY','maxCols','addCommand','left','setLastPickedCommonEventMenuID','constructor','ListTextAlign','CustomLayout','createWindowLayer','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','open','Layout','Scene_Map','isSceneMap','ARRAYJSON','autoSelect','description','registerCommand','setBackgroundType','call','_commonEventMenuDesc','commonEvent','contents','_commonEventMenuPicture','padZero','helpWindow','541RjcWqj','_autoSelect','281568fqqWor','ListColumns','Scene_Boot_onDatabaseLoaded','List_Window_JS','addLoadListener','_filename','CommonEvents','ShowAny','FilterEmptyName','initMembers','visible','status','Indent','onDatabaseLoaded','2dDzlpl','Picture','trim','CommonEvent-%1-Visible-JS','findExt','min','DisableAll','onCommonEventMenuCancel','410932SoNkpM','631QiJUGq','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','prototype','initialize','setPicture','match','CommonEventMenu','Help\x20Window:','CancelButtonScale','create','subWindow','itemTextAlign','Sub','_commonEventMenuLayer','floor','length','createCommonEventMenuExtraWindows','179763zZNVqh','VisuMZ_1_EventsMoveCore','ceil','Optional','AutoSelect','537620ZpPRrZ','Help_Window_JS','makeDeepCopy','max','getLastPickedCommonEventMenuID','upper\x20right','setText','setHandler','STRUCT','_scene','right','startCommonEventMenu','Picture_Window_JS','clamp','extraWindow_%1','_anchorY','wait','format','return\x200','includes','CreateCommonEventList','code','createCommonEventMenuExtraWindow','EVAL','PictureAutoFit','Custom','callUpdateHelp','children','drawPicture','_opening','width','commonEventMenu_defaultIcon','cancel','ARRAYEVAL'];const _0xa610=function(_0x3b44b3,_0xff1170){_0x3b44b3=_0x3b44b3-0x98;let _0x527de3=_0x527d[_0x3b44b3];return _0x527de3;};const _0x136307=_0xa610;(function(_0x5fecd9,_0x250f91){const _0x3def74=_0xa610;while(!![]){try{const _0x20a74b=-parseInt(_0x3def74(0x183))+parseInt(_0x3def74(0x151))*parseInt(_0x3def74(0x15d))+parseInt(_0x3def74(0xcb))*parseInt(_0x3def74(0xb2))+parseInt(_0x3def74(0xe1))+-parseInt(_0x3def74(0xb4))+-parseInt(_0x3def74(0xc2))*parseInt(_0x3def74(0xdc))+parseInt(_0x3def74(0xca));if(_0x20a74b===_0x250f91)break;else _0x5fecd9['push'](_0x5fecd9['shift']());}catch(_0x4b5d8d){_0x5fecd9['push'](_0x5fecd9['shift']());}}}(_0x527d,0x57d0a));var label=_0x136307(0xd1),tier=tier||0x0,dependencies=[_0x136307(0xdd)],pluginData=$plugins[_0x136307(0x137)](function(_0x3005d7){const _0x4be1bd=_0x136307;return _0x3005d7[_0x4be1bd(0xbf)]&&_0x3005d7[_0x4be1bd(0xa8)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x136307(0x11e)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x136307(0x153)]=function(_0x45622e,_0x228deb){const _0x4ec5aa=_0x136307;for(const _0x41b801 in _0x228deb){if(_0x41b801[_0x4ec5aa(0xd0)](/(.*):(.*)/i)){const _0x452815=String(RegExp['$1']),_0x17d1a8=String(RegExp['$2'])[_0x4ec5aa(0x15a)]()[_0x4ec5aa(0xc4)]();let _0xb430c1,_0x2d3572,_0x18d97d;switch(_0x17d1a8){case'NUM':_0xb430c1=_0x228deb[_0x41b801]!==''?Number(_0x228deb[_0x41b801]):0x0;break;case _0x4ec5aa(0x17c):_0x2d3572=_0x228deb[_0x41b801]!==''?JSON['parse'](_0x228deb[_0x41b801]):[],_0xb430c1=_0x2d3572['map'](_0x2ee275=>Number(_0x2ee275));break;case _0x4ec5aa(0xf8):_0xb430c1=_0x228deb[_0x41b801]!==''?eval(_0x228deb[_0x41b801]):null;break;case _0x4ec5aa(0x102):_0x2d3572=_0x228deb[_0x41b801]!==''?JSON[_0x4ec5aa(0x16c)](_0x228deb[_0x41b801]):[],_0xb430c1=_0x2d3572[_0x4ec5aa(0x149)](_0x80b3af=>eval(_0x80b3af));break;case _0x4ec5aa(0x105):_0xb430c1=_0x228deb[_0x41b801]!==''?JSON[_0x4ec5aa(0x16c)](_0x228deb[_0x41b801]):'';break;case _0x4ec5aa(0xa6):_0x2d3572=_0x228deb[_0x41b801]!==''?JSON[_0x4ec5aa(0x16c)](_0x228deb[_0x41b801]):[],_0xb430c1=_0x2d3572[_0x4ec5aa(0x149)](_0x195c5e=>JSON['parse'](_0x195c5e));break;case _0x4ec5aa(0x10e):_0xb430c1=_0x228deb[_0x41b801]!==''?new Function(JSON[_0x4ec5aa(0x16c)](_0x228deb[_0x41b801])):new Function(_0x4ec5aa(0xf3));break;case _0x4ec5aa(0x128):_0x2d3572=_0x228deb[_0x41b801]!==''?JSON[_0x4ec5aa(0x16c)](_0x228deb[_0x41b801]):[],_0xb430c1=_0x2d3572[_0x4ec5aa(0x149)](_0x4b2c27=>new Function(JSON[_0x4ec5aa(0x16c)](_0x4b2c27)));break;case'STR':_0xb430c1=_0x228deb[_0x41b801]!==''?String(_0x228deb[_0x41b801]):'';break;case _0x4ec5aa(0x16f):_0x2d3572=_0x228deb[_0x41b801]!==''?JSON[_0x4ec5aa(0x16c)](_0x228deb[_0x41b801]):[],_0xb430c1=_0x2d3572[_0x4ec5aa(0x149)](_0xf4c242=>String(_0xf4c242));break;case _0x4ec5aa(0xe9):_0x18d97d=_0x228deb[_0x41b801]!==''?JSON[_0x4ec5aa(0x16c)](_0x228deb[_0x41b801]):{},_0xb430c1=VisuMZ[_0x4ec5aa(0x153)]({},_0x18d97d);break;case _0x4ec5aa(0x123):_0x2d3572=_0x228deb[_0x41b801]!==''?JSON[_0x4ec5aa(0x16c)](_0x228deb[_0x41b801]):[],_0xb430c1=_0x2d3572[_0x4ec5aa(0x149)](_0x224446=>VisuMZ[_0x4ec5aa(0x153)]({},JSON[_0x4ec5aa(0x16c)](_0x224446)));break;default:continue;}_0x45622e[_0x452815]=_0xb430c1;}}return _0x45622e;},(_0x475785=>{const _0x1b247f=_0x136307,_0x4a162e=_0x475785[_0x1b247f(0x110)];for(const _0x414d4f of dependencies){if(!Imported[_0x414d4f]){alert(_0x1b247f(0x10f)['format'](_0x4a162e,_0x414d4f)),SceneManager[_0x1b247f(0x11f)]();break;}}const _0x342330=_0x475785[_0x1b247f(0xa8)];if(_0x342330['match'](/\[Version[ ](.*?)\]/i)){const _0x4704b4=Number(RegExp['$1']);_0x4704b4!==VisuMZ[label][_0x1b247f(0x130)]&&(alert(_0x1b247f(0xcc)['format'](_0x4a162e,_0x4704b4)),SceneManager[_0x1b247f(0x11f)]());}if(_0x342330[_0x1b247f(0xd0)](/\[Tier[ ](\d+)\]/i)){const _0x39f94a=Number(RegExp['$1']);_0x39f94a<tier?(alert(_0x1b247f(0x10d)['format'](_0x4a162e,_0x39f94a,tier)),SceneManager[_0x1b247f(0x11f)]()):tier=Math[_0x1b247f(0xe4)](_0x39f94a,tier);}VisuMZ[_0x1b247f(0x153)](VisuMZ[label][_0x1b247f(0x11e)],_0x475785[_0x1b247f(0x154)]);})(pluginData),PluginManager[_0x136307(0xa9)](pluginData[_0x136307(0x110)],_0x136307(0xd1),_0x58d0ee=>{const _0x1567cb=_0x136307;if(!SceneManager[_0x1567cb(0x147)]()&&!SceneManager[_0x1567cb(0xa5)]())return;_0x58d0ee=JsonEx[_0x1567cb(0xe3)](_0x58d0ee),VisuMZ[_0x1567cb(0x153)](_0x58d0ee,_0x58d0ee);const _0x1cbec7=$gameTemp['getLastPluginCommandInterpreter'](),_0x4a5368=VisuMZ[_0x1567cb(0xd1)]['CreateCommonEventList'](_0x58d0ee[_0x1567cb(0xba)]);if(_0x58d0ee[_0x1567cb(0xa3)]==='-'){if($gameTemp[_0x1567cb(0x169)]())alert('Please\x20pick\x20a\x20proper\x20layout!');return;}if(_0x4a5368[_0x1567cb(0xda)]<=0x0){if($gameTemp[_0x1567cb(0x169)]())alert('No\x20Common\x20Events\x20have\x20been\x20defined!');return;}if(_0x58d0ee[_0x1567cb(0xa3)]===_0x1567cb(0xfa)&&_0x58d0ee['CustomLayout'][_0x1567cb(0xb7)]===undefined){if($gameTemp[_0x1567cb(0x169)]())alert(_0x1567cb(0x152));return;}$gameTemp['_commonEventMenu_ShowLayoutName']!==undefined&&($gameTemp[_0x1567cb(0x11d)]++,console[_0x1567cb(0x115)](_0x1567cb(0x12d)['format']($gameTemp[_0x1567cb(0x11d)][_0x1567cb(0xb0)](0x3)),_0x58d0ee[_0x1567cb(0xa3)])),_0x58d0ee['list']=_0x4a5368,SceneManager[_0x1567cb(0xea)]['startCommonEventMenu'](_0x58d0ee,_0x1cbec7),_0x1cbec7[_0x1567cb(0xf1)](0xa);}),VisuMZ[_0x136307(0xd1)][_0x136307(0xf5)]=function(_0x2c836d){const _0x45a111=_0x136307;let _0x5c339a=[];_0x5c339a=_0x5c339a['concat'](_0x2c836d['ID']);for(let _0x3d9f9b=_0x2c836d['RangeStart'];_0x3d9f9b<=_0x2c836d[_0x45a111(0x180)];_0x3d9f9b++){const _0x1fc118=$dataCommonEvents[_0x3d9f9b];if(!_0x1fc118)continue;_0x5c339a[_0x45a111(0x104)](_0x3d9f9b);}const _0x3241e1=_0x2c836d['CustomJS']()||[];return _0x5c339a=_0x5c339a[_0x45a111(0x172)](_0x3241e1),_0x5c339a=_0x5c339a[_0x45a111(0x15f)]((_0x2aa3c0,_0x442c78)=>_0x2aa3c0-_0x442c78),_0x5c339a=_0x5c339a[_0x45a111(0x137)]((_0x49c434,_0x17fe17,_0x1310a6)=>_0x1310a6['indexOf'](_0x49c434)===_0x17fe17),_0x5c339a=_0x5c339a[_0x45a111(0x135)](0x0),_0x5c339a=_0x5c339a[_0x45a111(0x137)](_0x2ff42d=>!!$dataCommonEvents[_0x2ff42d]),_0x2c836d[_0x45a111(0xbc)]&&(_0x5c339a=_0x5c339a['filter'](_0x10e9be=>$dataCommonEvents[_0x10e9be][_0x45a111(0x110)]!=='')),_0x2c836d[_0x45a111(0x14e)]&&(_0x5c339a=_0x5c339a[_0x45a111(0x137)](_0x12a718=>!$dataCommonEvents[_0x12a718][_0x45a111(0x110)][_0x45a111(0xd0)](/-----/i))),_0x5c339a;},VisuMZ['CommonEventMenu'][_0x136307(0x119)]={'Name':/<NAME:[ ](.*)>/i,'Icon':/<ICON:[ ](\d+)>/i,'Indent':/<INDENT:[ ](\d+)>/i,'Picture':/<PICTURE:[ ](.*)>/i,'Help':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'Sub':/<(?:SUB|SUBTEXT|SUB DESCRIPTION|SUBTEXT DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:SUB|SUBTEXT|SUB DESCRIPTION|SUBTEXT DESCRIPTION)>/i,'Extra1':/<(?:EXTRA|EXTRA DESCRIPTION) 1>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 1>/i,'Extra2':/<(?:EXTRA|EXTRA DESCRIPTION) 2>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 2>/i,'Extra3':/<(?:EXTRA|EXTRA DESCRIPTION) 3>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 3>/i,'Extra4':/<(?:EXTRA|EXTRA DESCRIPTION) 4>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 4>/i,'Extra5':/<(?:EXTRA|EXTRA DESCRIPTION) 5>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 5>/i,'Extra6':/<(?:EXTRA|EXTRA DESCRIPTION) 6>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 6>/i,'Extra7':/<(?:EXTRA|EXTRA DESCRIPTION) 7>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 7>/i,'Extra8':/<(?:EXTRA|EXTRA DESCRIPTION) 8>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 8>/i,'Extra9':/<(?:EXTRA|EXTRA DESCRIPTION) 9>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 9>/i,'Extra10':/<(?:EXTRA|EXTRA DESCRIPTION) 10>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 10>/i,'ShowAll':/<(?:SHOW|SHOW ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'ShowAny':/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'HideAll':/<(?:HIDE|HIDE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'HideAny':/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'VisibleJS':/<JS (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS (?:VISIBLE|SHOW|HIDE)>/i,'EnableAll':/<(?:ENABLE|ENABLE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'EnableAny':/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'DisableAll':/<(?:DISABLE|DISABLE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'DisableAny':/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'EnableJS':/<JS (?:ENABLE|DISABLE)>\s*([\s\S]*)\s*<\/JS (?:ENABLE|DISABLE)>/i},VisuMZ[_0x136307(0xd1)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x136307(0xcd)][_0x136307(0xc1)],Scene_Boot[_0x136307(0xcd)][_0x136307(0xc1)]=function(){const _0x5aa996=_0x136307;VisuMZ[_0x5aa996(0xd1)][_0x5aa996(0xb6)]['call'](this),this[_0x5aa996(0x132)]();},VisuMZ[_0x136307(0xd1)]['JS']={},Scene_Boot[_0x136307(0xcd)][_0x136307(0x132)]=function(){const _0x565c14=_0x136307,_0x423de4=VisuMZ[_0x565c14(0xd1)][_0x565c14(0x119)];for(const _0x1371a3 of $dataCommonEvents){if(!_0x1371a3)continue;const _0xa22015=DataManager[_0x565c14(0x12e)](_0x1371a3['id']);if(_0xa22015[_0x565c14(0xd0)](_0x423de4[_0x565c14(0x13c)])){const _0x409a73=String(RegExp['$1']),_0x1dbec6='CommonEvent-%1-Visible-JS'['format'](_0x1371a3['id']),_0x5e6867=_0x565c14(0xa1)[_0x565c14(0xf2)](_0x409a73);VisuMZ['CommonEventMenu']['JS'][_0x1dbec6]=new Function(_0x5e6867);}if(_0xa22015[_0x565c14(0xd0)](_0x423de4[_0x565c14(0x120)])){const _0x159307=String(RegExp['$1']),_0x51e8d5=_0x565c14(0x14f)['format'](_0x1371a3['id']),_0x517b1a=_0x565c14(0x16a)[_0x565c14(0xf2)](_0x159307);VisuMZ[_0x565c14(0xd1)]['JS'][_0x51e8d5]=new Function(_0x517b1a);}}},DataManager['commonEventMenuNote']=function(_0x12f36d){const _0x6c7e2a=_0x136307;this[_0x6c7e2a(0x103)]=this[_0x6c7e2a(0x103)]||[];if(this[_0x6c7e2a(0x103)][_0x12f36d]!==undefined)return this[_0x6c7e2a(0x103)][_0x12f36d];const _0x474b9a=$dataCommonEvents[_0x12f36d];if(!_0x474b9a)return'';let _0x585e45='';for(const _0x82e26b of _0x474b9a['list']){[0x6c,0x198][_0x6c7e2a(0xf4)](_0x82e26b[_0x6c7e2a(0xf6)])&&(_0x585e45+=_0x82e26b[_0x6c7e2a(0x154)][0x0]+'\x0a');}return this[_0x6c7e2a(0x103)][_0x12f36d]=_0x585e45[_0x6c7e2a(0xc4)](),this[_0x6c7e2a(0x103)][_0x12f36d];},DataManager[_0x136307(0x129)]=function(_0x52411a,_0x5ac619){const _0x2aa4d3=_0x136307;if(_0x5ac619){this[_0x2aa4d3(0x112)]=this[_0x2aa4d3(0x112)]||[];if(this['_commonEventMenuNameIndent'][_0x52411a]!==undefined)return this[_0x2aa4d3(0x112)][_0x52411a];}else{this[_0x2aa4d3(0x16e)]=this[_0x2aa4d3(0x16e)]||[];if(this['_commonEventMenuName'][_0x52411a]!==undefined)return this[_0x2aa4d3(0x16e)][_0x52411a];}const _0x36a5fb=$dataCommonEvents[_0x52411a];if(!_0x36a5fb)return'';let _0x197ea8=_0x36a5fb[_0x2aa4d3(0x110)],_0x1da90c=0x0;const _0x28025c=VisuMZ[_0x2aa4d3(0xd1)]['RegExp'],_0x417e8b=DataManager[_0x2aa4d3(0x12e)](_0x52411a);_0x417e8b['match'](_0x28025c['Name'])&&(_0x197ea8=String(RegExp['$1'])[_0x2aa4d3(0xc4)]());_0x417e8b[_0x2aa4d3(0xd0)](_0x28025c[_0x2aa4d3(0x142)])?_0x1da90c=Number(RegExp['$1']):_0x1da90c=ImageManager[_0x2aa4d3(0x100)];if(_0x1da90c)_0x197ea8='\x5cI[%1]%2'[_0x2aa4d3(0xf2)](_0x1da90c,_0x197ea8);if(_0x5ac619&&_0x417e8b[_0x2aa4d3(0xd0)](_0x28025c[_0x2aa4d3(0xc0)])){let _0x5a097e=Number(RegExp['$1']);while(_0x5a097e--){_0x197ea8='\x5cI[0]%1'['format'](_0x197ea8);}}return _0x5ac619?(this[_0x2aa4d3(0x112)][_0x52411a]=_0x197ea8,this['_commonEventMenuNameIndent'][_0x52411a]):(this['_commonEventMenuName'][_0x52411a]=_0x197ea8,this[_0x2aa4d3(0x16e)][_0x52411a]);},DataManager['commonEventMenuPicture']=function(_0x5e84bf){const _0x5c4376=_0x136307;this['_commonEventMenuPicture']=this[_0x5c4376(0xaf)]||[];if(this[_0x5c4376(0xaf)][_0x5e84bf]!==undefined)return this[_0x5c4376(0xaf)][_0x5e84bf];const _0x3b6244=$dataCommonEvents[_0x5e84bf];if(!_0x3b6244)return'';let _0x1cc441='';const _0x1556a4=VisuMZ[_0x5c4376(0xd1)]['RegExp'],_0x38891a=DataManager[_0x5c4376(0x12e)](_0x5e84bf);return _0x38891a[_0x5c4376(0xd0)](_0x1556a4[_0x5c4376(0xc3)])&&(_0x1cc441=String(RegExp['$1'])[_0x5c4376(0xc4)]()),this[_0x5c4376(0xaf)][_0x5e84bf]=_0x1cc441,this[_0x5c4376(0xaf)][_0x5e84bf];},DataManager[_0x136307(0x144)]=function(_0xe4f996,_0x1c0d61){const _0x20d109=_0x136307;this[_0x20d109(0xac)]=this[_0x20d109(0xac)]||[],this[_0x20d109(0xac)][_0x1c0d61]=this[_0x20d109(0xac)][_0x1c0d61]||{};if(this[_0x20d109(0xac)][_0x1c0d61][_0xe4f996]!==undefined)return this['_commonEventMenuDesc'][_0x1c0d61][_0xe4f996];const _0x2d2034=$dataCommonEvents[_0xe4f996];if(!_0x2d2034)return'';let _0x567abb='';const _0x3db659=VisuMZ[_0x20d109(0xd1)][_0x20d109(0x119)],_0x39ab57=DataManager[_0x20d109(0x12e)](_0xe4f996);return _0x39ab57[_0x20d109(0xd0)](_0x3db659[_0x1c0d61])&&(_0x567abb=String(RegExp['$1'])[_0x20d109(0xc4)]()),this[_0x20d109(0xac)][_0x1c0d61][_0xe4f996]=_0x567abb,this[_0x20d109(0xac)][_0x1c0d61][_0xe4f996];},ImageManager[_0x136307(0x100)]=VisuMZ[_0x136307(0xd1)][_0x136307(0x11e)][_0x136307(0x17a)]||0x0,SceneManager['isSceneBattle']=function(){const _0x479fbc=_0x136307;return this[_0x479fbc(0xea)]&&this[_0x479fbc(0xea)]['constructor']===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x54a979=_0x136307;return this[_0x54a979(0xea)]&&this[_0x54a979(0xea)]['constructor']===Scene_Map;},VisuMZ[_0x136307(0xd1)][_0x136307(0x158)]=Game_System['prototype'][_0x136307(0xce)],Game_System[_0x136307(0xcd)][_0x136307(0xce)]=function(){const _0x25ff6b=_0x136307;VisuMZ['CommonEventMenu'][_0x25ff6b(0x158)][_0x25ff6b(0xab)](this),this[_0x25ff6b(0x11b)]=0x0;},Game_System[_0x136307(0xcd)]['getLastPickedCommonEventMenuID']=function(){const _0x48b93b=_0x136307;return this[_0x48b93b(0x11b)]=this[_0x48b93b(0x11b)]||0x0,this[_0x48b93b(0x11b)];},Game_System[_0x136307(0xcd)][_0x136307(0x9c)]=function(_0x234b68){const _0x20e31d=_0x136307;this[_0x20e31d(0x11b)]=_0x234b68;},VisuMZ[_0x136307(0xd1)][_0x136307(0x155)]=Scene_Base[_0x136307(0xcd)][_0x136307(0xa0)],Scene_Base[_0x136307(0xcd)][_0x136307(0xa0)]=function(){const _0x2af15e=_0x136307;VisuMZ[_0x2af15e(0xd1)][_0x2af15e(0x155)][_0x2af15e(0xab)](this),this[_0x2af15e(0x143)]();},Scene_Base[_0x136307(0xcd)][_0x136307(0x143)]=function(){if(!this['canCreateCommonEventMenu']())return;this['_commonEventMenuLayer']=new Sprite(),this['addChild'](this['_commonEventMenuLayer']);},Scene_Base[_0x136307(0xcd)][_0x136307(0x184)]=function(){const _0x50fc79=_0x136307;return[_0x50fc79(0xa4),_0x50fc79(0x163)][_0x50fc79(0xf4)](this['constructor']['name']);},Scene_Base[_0x136307(0xcd)]['addCommonEventMenuWindow']=function(_0x42d8a9){const _0x2372fe=_0x136307;if(!this[_0x2372fe(0xd8)])return;this[_0x2372fe(0xd8)][_0x2372fe(0x109)](_0x42d8a9);},Scene_Base[_0x136307(0xcd)][_0x136307(0xec)]=function(_0x3a284c,_0x551728){const _0xbdec3=_0x136307;if(!this['_commonEventMenuLayer'])return;this[_0xbdec3(0x14d)]=this[_0xbdec3(0x14d)]||{},this['createCommonEventMenuPictureWindow'](_0x3a284c),this[_0xbdec3(0x148)](_0x3a284c),this['createCommonEventMenuSubWindow'](_0x3a284c),this['createCommonEventMenuExtraWindows'](_0x3a284c),this[_0xbdec3(0x150)](_0x3a284c,_0x551728),this[_0xbdec3(0x116)]();for(const _0x56e254 of this['_commonEventMenuLayer'][_0xbdec3(0xfc)]){if(!_0x56e254)continue;_0x56e254[_0xbdec3(0xaa)]&&_0x56e254[_0xbdec3(0xaa)](_0x3a284c[_0xbdec3(0xdf)]['WindowBgType']??0x0),_0x56e254['open']&&_0x56e254[_0xbdec3(0xa2)]();}this[_0xbdec3(0x133)]=![];},Scene_Base[_0x136307(0xcd)][_0x136307(0x10b)]=function(_0x49e858){const _0x326704=_0x136307,_0x44fe66=_0x49e858[_0x326704(0xdf)][_0x326704(0x15c)]??_0x326704(0x122);let _0x46a86c=new Rectangle(0x0,0x0,Graphics[_0x326704(0xff)],Graphics['height']),_0x3f41c5=0x0;if(_0x44fe66['match'](/(?:PADDED)/i))_0x3f41c5=0x10;else{if(_0x44fe66[_0x326704(0xd0)](/(?:HUGE)/i))_0x3f41c5=0x20;else{if(_0x44fe66['match'](/(?:LARGE)/i))_0x3f41c5=0x30;else{if(_0x44fe66[_0x326704(0xd0)](/(?:MEDIUM)/i))_0x3f41c5=0x40;else{if(_0x44fe66[_0x326704(0xd0)](/(?:SMALL)/i))_0x3f41c5=0x60;else{if(_0x44fe66[_0x326704(0xd0)](/(?:TINY)/i))_0x3f41c5=0x80;else{if(_0x44fe66['match'](/(?:MICRO)/i))_0x3f41c5=0xa0;else _0x44fe66['match'](/(?:WUT)/i)&&(_0x3f41c5=0xc0);}}}}}}if(_0x44fe66[_0x326704(0xd0)](/(?:UI)/i))_0x46a86c['x']=this[_0x326704(0x168)]['x'],_0x46a86c['y']=this[_0x326704(0x168)]['y'],_0x46a86c[_0x326704(0xff)]=Graphics['boxWidth'],_0x46a86c['height']=Graphics[_0x326704(0x10c)];else _0x3f41c5&&(_0x46a86c['x']+=_0x3f41c5,_0x46a86c['y']+=_0x3f41c5,_0x46a86c[_0x326704(0xff)]-=_0x3f41c5*0x2,_0x46a86c[_0x326704(0x124)]-=_0x3f41c5*0x2);return _0x46a86c[_0x326704(0xff)]=_0x46a86c[_0x326704(0xff)][_0x326704(0xee)](0x0,Graphics[_0x326704(0xff)]),_0x46a86c[_0x326704(0x124)]=_0x46a86c['height']['clamp'](0x0,Graphics['height']),_0x46a86c;},Scene_Base['prototype'][_0x136307(0x146)]=function(_0x412498,_0x31f7df,_0x587a47,_0x4ec11c){const _0x183d79=_0x136307;return _0x412498=Math['round'](_0x412498),_0x31f7df=Math['round'](_0x31f7df),_0x587a47=Math[_0x183d79(0xe4)](0x0,Math[_0x183d79(0x162)](_0x587a47)),_0x4ec11c=Math[_0x183d79(0xe4)](0x0,Math[_0x183d79(0x162)](_0x4ec11c)),new Rectangle(_0x412498,_0x31f7df,_0x587a47,_0x4ec11c);},Scene_Base['prototype'][_0x136307(0x160)]=function(_0x353409){const _0x54ee0a=_0x136307,_0x236f0a=this['commonEventMenuPictureWindowRect'](_0x353409),_0x30b532=new Window_CommonEventMenuPicture(_0x353409,_0x236f0a);_0x30b532['openness']=0x0,this['addCommonEventMenuWindow'](_0x30b532),this[_0x54ee0a(0x14d)][_0x54ee0a(0x138)]=_0x30b532;},Scene_Base[_0x136307(0xcd)][_0x136307(0x10a)]=function(_0x5d4169){const _0x1d4732=_0x136307,_0x585aad=_0x5d4169[_0x1d4732(0xa3)],_0x46bd4d=this[_0x1d4732(0x176)](),_0x565036=this[_0x1d4732(0x136)]();if(_0x585aad===_0x1d4732(0xfa))return _0x5d4169[_0x1d4732(0x9f)][_0x1d4732(0xed)][_0x1d4732(0xab)](this);const _0x494702=this[_0x1d4732(0x10b)](_0x5d4169);let _0x569894=_0x494702['x'],_0x4f0f08=_0x494702['y'],_0x5da4d6=_0x494702[_0x1d4732(0xff)],_0x443f80=_0x494702[_0x1d4732(0x124)];if(_0x585aad[_0x1d4732(0xd0)](/(?:STANDARD|FIRM-LIST)/i))_0x5da4d6=Math[_0x1d4732(0xd9)](_0x5da4d6/0x2);else{if(_0x585aad['match'](/(?:HALF-BASE-PICT|LITE-LIST)/i))_0x5da4d6=Math['ceil'](_0x5da4d6/0x2);else{if(_0x585aad[_0x1d4732(0xd0)](/(?:BASE-PICT|GALLERY)/i))_0x5da4d6=_0x494702['width'];else _0x585aad[_0x1d4732(0xd0)](/(?:WIDE-LIST|FULL-SCREEN|SIDE-SUB|TALL)/i)&&(_0x5da4d6=0x0);}}if(_0x585aad[_0x1d4732(0xd0)](/(?:GALLERY)/i)){_0x443f80-=this[_0x1d4732(0x161)](0x2),_0x585aad[_0x1d4732(0xd0)](/(\d+)-ROW-LIST/i);const _0x530bad=Number(RegExp['$1'])||0x0;_0x443f80-=this['calcWindowHeight'](_0x530bad,!![]);if(_0x585aad[_0x1d4732(0xd0)](/(?:NO-SUB)/i))_0x443f80-=0x0;else _0x585aad[_0x1d4732(0xd0)](/(?:THICK-SUB)/i)?_0x443f80-=this[_0x1d4732(0x161)](0x4):_0x443f80-=this[_0x1d4732(0x161)](0x2);}else{if(_0x585aad[_0x1d4732(0xd0)](/(?:LITE-LIST)/i))_0x443f80-=this[_0x1d4732(0x161)](0x2)+this[_0x1d4732(0x161)](0x4,!![]);else{if(_0x585aad[_0x1d4732(0xd0)](/(?:NO-SUB|SUB-CORNER-LIST|FIRM-LIST)/i))_0x443f80-=this[_0x1d4732(0x161)](0x2);else{if(_0x585aad[_0x1d4732(0xd0)](/(?:BASE-PICT)/i))_0x443f80=this[_0x1d4732(0x161)](0x4);else{if(_0x585aad['match'](/(?:THICK-SUB)/i))_0x443f80-=this[_0x1d4732(0x161)](0x2)+this[_0x1d4732(0x161)](0x4);else _0x585aad[_0x1d4732(0xd0)](/(?:FULL-SCREEN|SIDE-SUB)/i)?_0x443f80=0x0:_0x443f80-=this['calcWindowHeight'](0x2)*0x2;}}}}_0x585aad[_0x1d4732(0xd0)](/(?:BASE-PICT|LITE-LIST)/i)?_0x585aad[_0x1d4732(0xd0)](/(?:MIRROR)/i)?_0x569894+=_0x46bd4d?0x0:_0x494702[_0x1d4732(0xff)]-_0x5da4d6:_0x569894+=_0x46bd4d?_0x494702[_0x1d4732(0xff)]-_0x5da4d6:0x0:_0x585aad['match'](/(?:MIRROR)/i)?_0x569894+=_0x46bd4d?_0x494702[_0x1d4732(0xff)]-_0x5da4d6:0x0:_0x569894+=_0x46bd4d?0x0:_0x494702[_0x1d4732(0xff)]-_0x5da4d6;if(_0x585aad[_0x1d4732(0xd0)](/(?:NO-SUB|SUB-CORNER-LIST|FIRM-LIST)/i))_0x585aad[_0x1d4732(0xd0)](/(?:INVERSE)/i)?_0x4f0f08+=_0x565036?this['calcWindowHeight'](0x2):0x0:_0x4f0f08+=_0x565036?0x0:this[_0x1d4732(0x161)](0x2);else{if(_0x585aad[_0x1d4732(0xd0)](/(?:BASE-PICT|LITE-LIST)/i))_0x585aad[_0x1d4732(0xd0)](/(?:INVERSE)/i)?_0x4f0f08+=_0x565036?_0x494702['height']-_0x443f80:0x0:_0x4f0f08+=_0x565036?0x0:_0x494702['height']-_0x443f80;else _0x585aad[_0x1d4732(0xd0)](/(?:THICK-SUB)/i)?_0x585aad['match'](/(?:INVERSE)/i)?_0x4f0f08+=this[_0x1d4732(0x161)](_0x565036?0x2:0x4):_0x4f0f08+=this[_0x1d4732(0x161)](_0x565036?0x4:0x2):_0x4f0f08+=this[_0x1d4732(0x161)](0x2);}return $gameTemp[_0x1d4732(0x12b)]&&console[_0x1d4732(0x115)]('Pict\x20Window:',_0x569894,_0x4f0f08,_0x5da4d6,_0x443f80),this[_0x1d4732(0x146)](_0x569894,_0x4f0f08,_0x5da4d6,_0x443f80);},Scene_Base[_0x136307(0xcd)][_0x136307(0x148)]=function(_0x4ca389){const _0x3da4b5=_0x136307,_0x42c5c9=this[_0x3da4b5(0x159)](_0x4ca389),_0xb0e424=new Window_Help(_0x42c5c9);_0xb0e424[_0x3da4b5(0x14b)]=0x0,this[_0x3da4b5(0x114)](_0xb0e424),this[_0x3da4b5(0x14d)][_0x3da4b5(0xb1)]=_0xb0e424;},Scene_Base[_0x136307(0xcd)][_0x136307(0x159)]=function(_0xe7476a){const _0x45ba76=_0x136307,_0xca8a35=_0xe7476a['Layout'],_0x41356f=this[_0x45ba76(0x176)](),_0x4feb46=this['isBottomHelpMode']();if(_0xca8a35==='Custom')return _0xe7476a[_0x45ba76(0x9f)][_0x45ba76(0xe2)][_0x45ba76(0xab)](this);const _0x378955=this[_0x45ba76(0x10b)](_0xe7476a);let _0x39f0ac=_0x378955['x'],_0x46897d=_0x378955['y'],_0x2c305d=_0x378955['width'],_0x202f12=this[_0x45ba76(0x161)](0x2);if(_0xca8a35[_0x45ba76(0xd0)](/(?:NO-HELP|FULL-SCREEN)/i))_0x2c305d=0x0;else _0xca8a35['match'](/(?:TALL)/i)&&(_0x2c305d=Math[_0x45ba76(0xde)](_0x378955[_0x45ba76(0xff)]/0x2));return _0xca8a35[_0x45ba76(0xd0)](/(?:NO-HELP|FULL-SCREEN)/i)&&(_0x202f12=0x0),_0xca8a35[_0x45ba76(0xd0)](/(?:MIRROR)/i)?_0x39f0ac+=_0x41356f?0x0:_0x378955[_0x45ba76(0xff)]-_0x2c305d:_0x39f0ac+=_0x41356f?_0x378955[_0x45ba76(0xff)]-_0x2c305d:0x0,_0xca8a35[_0x45ba76(0xd0)](/(?:INVERSE)/i)?_0x46897d+=_0x4feb46?0x0:_0x378955[_0x45ba76(0x124)]-_0x202f12:_0x46897d+=_0x4feb46?_0x378955[_0x45ba76(0x124)]-_0x202f12:0x0,$gameTemp[_0x45ba76(0x12b)]&&console[_0x45ba76(0x115)](_0x45ba76(0xd2),_0x39f0ac,_0x46897d,_0x2c305d,_0x202f12),this[_0x45ba76(0x146)](_0x39f0ac,_0x46897d,_0x2c305d,_0x202f12);},Scene_Base['prototype'][_0x136307(0x12f)]=function(_0x368f33){const _0x43ad32=_0x136307,_0x16de0b=this[_0x43ad32(0x106)](_0x368f33),_0x53f8c4=new Window_Help(_0x16de0b);_0x53f8c4[_0x43ad32(0x14b)]=0x0,this['addCommonEventMenuWindow'](_0x53f8c4),this[_0x43ad32(0x14d)]['subWindow']=_0x53f8c4;},Scene_Base[_0x136307(0xcd)][_0x136307(0x106)]=function(_0x4580c4){const _0x2e02ce=_0x136307,_0x4246aa=_0x4580c4[_0x2e02ce(0xa3)],_0x1c86a5=this[_0x2e02ce(0x176)](),_0xf0668f=this['isBottomHelpMode']();if(_0x4246aa==='Custom')return _0x4580c4[_0x2e02ce(0x9f)]['Sub_Window_JS'][_0x2e02ce(0xab)](this);const _0x266c7e=this[_0x2e02ce(0x10b)](_0x4580c4);let _0x8f6e08=_0x266c7e['x'],_0x21b5c8=_0x266c7e['y'],_0x78330e=_0x266c7e['width'],_0x4b2d8c=this[_0x2e02ce(0x161)](0x2);if(_0x4246aa[_0x2e02ce(0xd0)](/(?:FIRM-LIST)/i))_0x78330e=Math[_0x2e02ce(0xde)](_0x266c7e[_0x2e02ce(0xff)]/0x2);else{if(_0x4246aa[_0x2e02ce(0xd0)](/(?:SIDE-SUB)/i))_0x78330e=Math['floor'](_0x266c7e[_0x2e02ce(0xff)]/0x2);else{if(_0x4246aa[_0x2e02ce(0xd0)](/(?:SUB-CORNER|TALL)/i)){if(_0x4246aa['match'](/(?:SUB-CORNER-LIST|TALL)/i))_0x78330e=Math[_0x2e02ce(0xde)](_0x266c7e['width']/0x2);else _0x4246aa[_0x2e02ce(0xd0)](/(?:SUB-CORNER-PICT)/i)&&(_0x78330e=Math[_0x2e02ce(0xd9)](_0x266c7e[_0x2e02ce(0xff)]/0x2));}else _0x4246aa['match'](/(?:NO-SUB|FULL-SCREEN|BASE-PICT)/i)&&(_0x78330e=0x0);}}if(_0x4246aa[_0x2e02ce(0xd0)](/(?:SIDE-SUB)/i))_0x4b2d8c=_0x266c7e[_0x2e02ce(0x124)],_0x4b2d8c-=this[_0x2e02ce(0x161)](0x2),_0x4246aa['match'](/(?:FIRM-LIST)/i)&&(_0x4b2d8c-=this[_0x2e02ce(0x161)](0x4,!![]));else{if(_0x4246aa[_0x2e02ce(0xd0)](/(?:THICK-SUB)/i))_0x4b2d8c=this[_0x2e02ce(0x161)](0x4);else _0x4246aa[_0x2e02ce(0xd0)](/(?:NO-SUB|FULL-SCREEN|BASE-PICT)/i)&&(_0x4b2d8c=0x0);}if(_0x4246aa[_0x2e02ce(0xd0)](/(?:SIDE-SUB)/i)&&!_0x4246aa[_0x2e02ce(0xd0)](/(?:FIRM-LIST)/i))_0x4246aa['match'](/(?:MIRROR)/i)?_0x8f6e08+=_0x1c86a5?_0x266c7e[_0x2e02ce(0xff)]-_0x78330e:0x0:_0x8f6e08+=_0x1c86a5?0x0:_0x266c7e[_0x2e02ce(0xff)]-_0x78330e;else{if(_0x4246aa['match'](/(?:SUB-CORNER-LIST|FIRM-LIST|TALL)/i))_0x4246aa[_0x2e02ce(0xd0)](/(?:MIRROR)/i)?_0x8f6e08+=_0x1c86a5?0x0:_0x266c7e[_0x2e02ce(0xff)]-_0x78330e:_0x8f6e08+=_0x1c86a5?_0x266c7e[_0x2e02ce(0xff)]-_0x78330e:0x0;else _0x4246aa[_0x2e02ce(0xd0)](/(?:SUB-CORNER-PICT)/i)&&(_0x4246aa[_0x2e02ce(0xd0)](/(?:MIRROR)/i)?_0x8f6e08+=_0x1c86a5?_0x266c7e[_0x2e02ce(0xff)]-_0x78330e:0x0:_0x8f6e08+=_0x1c86a5?0x0:_0x266c7e[_0x2e02ce(0xff)]-_0x78330e);}return _0x4246aa[_0x2e02ce(0xd0)](/(?:SIDE-SUB)/i)&&!_0x4246aa[_0x2e02ce(0xd0)](/(?:FIRM-LIST)/i)?_0x4246aa[_0x2e02ce(0xd0)](/(?:INVERSE)/i)?_0x21b5c8+=_0xf0668f?this[_0x2e02ce(0x161)](0x2):0x0:_0x21b5c8+=_0xf0668f?0x0:this[_0x2e02ce(0x161)](0x2):_0x4246aa['match'](/(?:INVERSE)/i)?_0x21b5c8+=_0xf0668f?_0x266c7e[_0x2e02ce(0x124)]-_0x4b2d8c:0x0:_0x21b5c8+=_0xf0668f?0x0:_0x266c7e['height']-_0x4b2d8c,$gameTemp[_0x2e02ce(0x12b)]&&console[_0x2e02ce(0x115)](_0x2e02ce(0x13d),_0x8f6e08,_0x21b5c8,_0x78330e,_0x4b2d8c),this[_0x2e02ce(0x146)](_0x8f6e08,_0x21b5c8,_0x78330e,_0x4b2d8c);},Scene_Base['prototype'][_0x136307(0xdb)]=function(_0x41e0c3){const _0x5b5b69=_0x136307;if(_0x41e0c3[_0x5b5b69(0xa3)]!==_0x5b5b69(0xfa))return;for(let _0x4e945a=0x1;_0x4e945a<=0xa;_0x4e945a++){this['createCommonEventMenuExtraWindow'](_0x41e0c3,_0x4e945a);}},Scene_Base[_0x136307(0xcd)][_0x136307(0xf7)]=function(_0x451067,_0x3fc79b){const _0x25e7ca=_0x136307;if(!_0x451067[_0x25e7ca(0x9f)][_0x25e7ca(0x11a)[_0x25e7ca(0xf2)](_0x3fc79b)])return;const _0x8863af=_0x451067[_0x25e7ca(0x9f)][_0x25e7ca(0x11a)['format'](_0x3fc79b)]['call'](this),_0x440c09=new Window_Help(_0x8863af);_0x440c09[_0x25e7ca(0x14b)]=0x0,this[_0x25e7ca(0x114)](_0x440c09),this[_0x25e7ca(0x14d)][_0x25e7ca(0xef)[_0x25e7ca(0xf2)](_0x3fc79b)]=_0x440c09;},Scene_Base['prototype'][_0x136307(0x150)]=function(_0x35298d,_0x51abea){const _0x50c5a1=_0x136307,_0x382361=this[_0x50c5a1(0x16b)](_0x35298d),_0x11894f=new Window_CommonEventMenuList(_0x35298d,_0x51abea,_0x382361);_0x11894f[_0x50c5a1(0x14b)]=0x0,this[_0x50c5a1(0x114)](_0x11894f),this[_0x50c5a1(0x14d)][_0x50c5a1(0x164)]=_0x11894f,_0x11894f[_0x50c5a1(0xe8)](_0x50c5a1(0xad),this['onCommonEventMenuOk']['bind'](this)),_0x35298d[_0x50c5a1(0x157)]&&$dataCommonEvents[_0x35298d[_0x50c5a1(0x157)]]&&_0x11894f[_0x50c5a1(0xe8)]('cancel',this['onCommonEventMenuCancel']['bind'](this));},Scene_Base[_0x136307(0xcd)][_0x136307(0x16b)]=function(_0x107995){const _0x4e27b9=_0x136307,_0x1089b4=_0x107995[_0x4e27b9(0xa3)],_0x2022aa=this[_0x4e27b9(0x176)](),_0x4d260f=this[_0x4e27b9(0x136)]();if(_0x1089b4==='Custom')return _0x107995[_0x4e27b9(0x9f)][_0x4e27b9(0xb7)][_0x4e27b9(0xab)](this);const _0x5f1572=this[_0x4e27b9(0x10b)](_0x107995);let _0x243475=_0x5f1572['x'],_0x5580e8=_0x5f1572['y'],_0x3eb7b0=_0x5f1572[_0x4e27b9(0xff)],_0x4e2d2a=_0x5f1572[_0x4e27b9(0x124)];_0x1089b4[_0x4e27b9(0xd0)](/(?:STANDARD|SIDE-SUB|TALL)/i)&&(_0x3eb7b0=Math['ceil'](_0x5f1572['width']/0x2));if(_0x1089b4[_0x4e27b9(0xd0)](/(?:GALLERY)/i)){_0x1089b4[_0x4e27b9(0xd0)](/(\d+)-ROW-LIST/i);const _0x100b95=Number(RegExp['$1'])||0x1;_0x4e2d2a=this[_0x4e27b9(0x161)](_0x100b95,!![]);}else{if(_0x1089b4[_0x4e27b9(0xd0)](/(?:LITE-LIST|FIRM-LIST)/i))_0x4e2d2a=this['calcWindowHeight'](0x4,!![]);else{if(_0x1089b4['match'](/(?:HALF-BASE-PICT)/i))_0x4e2d2a-=this['calcWindowHeight'](0x2)+this['calcWindowHeight'](0x4);else{if(_0x1089b4[_0x4e27b9(0xd0)](/(?:NO-SUB|SUB-CORNER-PICT|SIDE-SUB)/i))_0x4e2d2a-=this['calcWindowHeight'](0x2);else{if(_0x1089b4[_0x4e27b9(0xd0)](/(?:THICK-SUB|BASE-PICT)/i))_0x4e2d2a-=this[_0x4e27b9(0x161)](0x2)+this['calcWindowHeight'](0x4);else _0x1089b4['match'](/(?:FULL-SCREEN)/i)?_0x4e2d2a=_0x5f1572['height']:_0x4e2d2a-=this[_0x4e27b9(0x161)](0x2)*0x2;}}}}_0x1089b4[_0x4e27b9(0xd0)](/(?:MIRROR)/i)?_0x243475+=_0x2022aa?0x0:_0x5f1572['width']-_0x3eb7b0:_0x243475+=_0x2022aa?_0x5f1572[_0x4e27b9(0xff)]-_0x3eb7b0:0x0;if(_0x1089b4[_0x4e27b9(0xd0)](/(?:GALLERY)/i)){const _0x38b1f3=this[_0x4e27b9(0x161)](0x2);let _0x567b7b=this['calcWindowHeight'](0x2);if(_0x1089b4[_0x4e27b9(0xd0)](/(?:NO-SUB)/i))_0x567b7b=0x0;else _0x1089b4[_0x4e27b9(0xd0)](/(?:THICK-SUB)/i)&&(_0x567b7b=this['calcWindowHeight'](0x4));_0x5580e8+=_0x5f1572['height']-_0x4e2d2a,_0x1089b4[_0x4e27b9(0xd0)](/(?:INVERSE)/i)?_0x5580e8-=_0x4d260f?_0x567b7b:_0x38b1f3:_0x5580e8-=_0x4d260f?_0x38b1f3:_0x567b7b;}else{if(_0x1089b4[_0x4e27b9(0xd0)](/(?:LITE-LIST|FIRM-LIST)/i)){const _0x17c17e=this[_0x4e27b9(0x161)](0x2),_0x2d65c2=_0x5f1572[_0x4e27b9(0x124)]-_0x17c17e-_0x4e2d2a;_0x1089b4[_0x4e27b9(0xd0)](/(?:INVERSE)/i)?_0x5580e8+=_0x4d260f?_0x17c17e:_0x2d65c2:_0x5580e8+=_0x4d260f?_0x2d65c2:_0x17c17e;}else{if(_0x1089b4[_0x4e27b9(0xd0)](/(?:HALF-BASE-PICT)/i))_0x1089b4[_0x4e27b9(0xd0)](/(?:INVERSE)/i)?_0x5580e8+=this['calcWindowHeight'](_0x4d260f?0x2:0x4):_0x5580e8+=this[_0x4e27b9(0x161)](_0x4d260f?0x4:0x2);else{if(_0x1089b4[_0x4e27b9(0xd0)](/(?:NO-SUB|SUB-CORNER-PICT|SIDE-SUB)/i))_0x1089b4[_0x4e27b9(0xd0)](/(?:INVERSE)/i)?_0x5580e8+=_0x4d260f?this[_0x4e27b9(0x161)](0x2):0x0:_0x5580e8+=_0x4d260f?0x0:this[_0x4e27b9(0x161)](0x2);else{if(_0x1089b4['match'](/(?:THICK-SUB|BASE-PICT)/i))_0x1089b4[_0x4e27b9(0xd0)](/(?:INVERSE)/i)?_0x5580e8+=this[_0x4e27b9(0x161)](_0x4d260f?0x2:0x4):_0x5580e8+=this[_0x4e27b9(0x161)](_0x4d260f?0x4:0x2);else _0x1089b4[_0x4e27b9(0xd0)](/(?:FULL-SCREEN)/i)?_0x5580e8=_0x5f1572['y']:_0x5580e8+=this[_0x4e27b9(0x161)](0x2);}}}}return $gameTemp[_0x4e27b9(0x12b)]&&console[_0x4e27b9(0x115)](_0x4e27b9(0x13a),_0x243475,_0x5580e8,_0x3eb7b0,_0x4e2d2a),this[_0x4e27b9(0x146)](_0x243475,_0x5580e8,_0x3eb7b0,_0x4e2d2a);},Scene_Base[_0x136307(0xcd)][_0x136307(0x116)]=function(){const _0xfc77e1=_0x136307,_0x4e5bde=this[_0xfc77e1(0x14d)]['listWindow'];for(const _0x35da6 in this['_commonEventMenuWindows']){if(_0x35da6===_0xfc77e1(0x164))continue;_0x4e5bde[_0xfc77e1(0x166)](this[_0xfc77e1(0x14d)][_0x35da6],_0x35da6);}_0x4e5bde['callUpdateHelp']();},Scene_Base[_0x136307(0xcd)]['onCommonEventMenuOk']=function(){const _0x5cb8be=_0x136307,_0x50ac73=this['_commonEventMenuWindows'][_0x5cb8be(0x164)],_0x43ca74=_0x50ac73['currentExt']();$gameSystem[_0x5cb8be(0x9c)](_0x43ca74),this[_0x5cb8be(0x113)](_0x43ca74);},Scene_Base['prototype'][_0x136307(0xc9)]=function(){const _0x9f415f=_0x136307,_0x22d7d4=this[_0x9f415f(0x14d)]['listWindow'],_0x236fc8=_0x22d7d4[_0x9f415f(0x15e)][_0x9f415f(0x157)];this[_0x9f415f(0x113)](_0x236fc8);},Scene_Base['prototype'][_0x136307(0x113)]=function(_0x120e82){const _0x70ff3f=_0x136307,_0x2da527=this[_0x70ff3f(0x14d)][_0x70ff3f(0x164)],_0x477e19=$dataCommonEvents[_0x120e82],_0x24f77d=_0x2da527[_0x70ff3f(0x15b)];_0x24f77d['setupChild'](_0x477e19['list'],_0x24f77d[_0x70ff3f(0x13b)]()),this['closeCommonEventMenu']();},Scene_Base[_0x136307(0xcd)][_0x136307(0x140)]=function(){const _0x1813ac=_0x136307;for(const _0x42ba95 of this[_0x1813ac(0xd8)][_0x1813ac(0xfc)]){if(_0x42ba95&&_0x42ba95[_0x1813ac(0x127)])_0x42ba95[_0x1813ac(0x127)]();}setTimeout(this[_0x1813ac(0x156)][_0x1813ac(0x111)](this),0xc8);},Scene_Base[_0x136307(0xcd)][_0x136307(0x156)]=function(){const _0x5f006c=_0x136307;this['_commonEventMenuWindows']={};while(this['_commonEventMenuLayer'][_0x5f006c(0xfc)][_0x5f006c(0xda)]>0x0){this[_0x5f006c(0xd8)]['children']['shift']();}this[_0x5f006c(0x133)]=!![];};function Window_CommonEventMenuPicture(){const _0x1b3809=_0x136307;this[_0x1b3809(0xce)](...arguments);}Window_CommonEventMenuPicture['prototype']=Object[_0x136307(0xd4)](Window_Base[_0x136307(0xcd)]),Window_CommonEventMenuPicture['prototype'][_0x136307(0x9d)]=Window_CommonEventMenuPicture,Window_CommonEventMenuPicture[_0x136307(0xcd)][_0x136307(0xce)]=function(_0x53a449,_0x11c447){const _0x23139d=_0x136307;this[_0x23139d(0x15e)]=_0x53a449,this['_filename']='',Window_Base[_0x23139d(0xcd)][_0x23139d(0xce)][_0x23139d(0xab)](this,_0x11c447),this[_0x23139d(0xbd)]();},Window_CommonEventMenuPicture[_0x136307(0xcd)]['initMembers']=function(){const _0x323df1=_0x136307;this[_0x323df1(0x141)]=this['_settings'][_0x323df1(0xdf)]['PictureAnchorX']??_0x323df1(0x17d),this[_0x323df1(0xf0)]=this[_0x323df1(0x15e)]['Optional'][_0x323df1(0x179)]??_0x323df1(0x145),this[_0x323df1(0x186)]=this['_settings']['Optional'][_0x323df1(0xf9)]??!![];},Window_CommonEventMenuPicture[_0x136307(0xcd)]['setPicture']=function(_0x54a97d){const _0x1f39cd=_0x136307;_0x54a97d=_0x54a97d[_0x1f39cd(0xc4)]();if(this[_0x1f39cd(0xb9)]===_0x54a97d)return;this[_0x1f39cd(0xb9)]=_0x54a97d;if(_0x54a97d==='')this[_0x1f39cd(0xae)]['clear']();else{const _0x1f95c0=ImageManager[_0x1f39cd(0x131)](_0x54a97d);_0x1f95c0[_0x1f39cd(0xb8)](this[_0x1f39cd(0xfd)][_0x1f39cd(0x111)](this,_0x54a97d,_0x1f95c0));}},Window_CommonEventMenuPicture[_0x136307(0xcd)]['drawPicture']=function(_0x1630c7,_0x28437b){const _0x162418=_0x136307;if(this[_0x162418(0xb9)]!==_0x1630c7)return;if(this[_0x162418(0x126)]<=0x0)return;this['contents'][_0x162418(0x174)]();const _0xea38c3=_0x28437b[_0x162418(0xff)],_0x560fcf=_0x28437b[_0x162418(0x124)];let _0x947c56=0x0,_0x4a01a6=0x0,_0x25b341=_0xea38c3,_0x15033c=_0x560fcf;if(this[_0x162418(0x186)]){const _0x4aaf03=this[_0x162418(0x126)]/_0xea38c3,_0x43fe79=this['innerHeight']/_0x560fcf,_0x2c3a00=Math[_0x162418(0xc7)](_0x4aaf03,_0x43fe79,0x1);_0x25b341=Math['round'](_0x2c3a00*_0x25b341),_0x15033c=Math[_0x162418(0x162)](_0x2c3a00*_0x15033c);}if(this[_0x162418(0x141)]==='left')_0x947c56=0x0;else{if(this[_0x162418(0x141)]===_0x162418(0x17d))_0x947c56=Math[_0x162418(0xe4)](0x0,Math[_0x162418(0x162)]((this[_0x162418(0x126)]-_0x25b341)/0x2));else this[_0x162418(0x141)]===_0x162418(0xeb)&&(_0x947c56=this[_0x162418(0x126)]-_0x25b341);}if(this['_anchorY']===_0x162418(0x17b))_0x4a01a6=0x0;else{if(this[_0x162418(0xf0)]==='middle')_0x4a01a6=Math[_0x162418(0xe4)](0x0,Math[_0x162418(0x162)]((this[_0x162418(0x14c)]-_0x15033c)/0x2));else this[_0x162418(0xf0)]===_0x162418(0x165)&&(_0x4a01a6=this[_0x162418(0x14c)]-_0x15033c);}this['contents'][_0x162418(0x14a)](_0x28437b,0x0,0x0,_0xea38c3,_0x560fcf,_0x947c56,_0x4a01a6,_0x25b341,_0x15033c);};function Window_CommonEventMenuList(){const _0x2c8c9f=_0x136307;this[_0x2c8c9f(0xce)](...arguments);}Window_CommonEventMenuList[_0x136307(0xcd)]=Object['create'](Window_Command[_0x136307(0xcd)]),Window_CommonEventMenuList[_0x136307(0xcd)][_0x136307(0x9d)]=Window_CommonEventMenuList,Window_CommonEventMenuList['prototype']['initialize']=function(_0x15d72e,_0x46357c,_0x1bbd8c){const _0x208fbb=_0x136307;this[_0x208fbb(0x15e)]=_0x15d72e,this[_0x208fbb(0x15b)]=_0x46357c,this[_0x208fbb(0xbd)](_0x1bbd8c),Window_Command[_0x208fbb(0xcd)][_0x208fbb(0xce)][_0x208fbb(0xab)](this,_0x1bbd8c),this[_0x208fbb(0x139)](),this['autoSelect']();},Window_CommonEventMenuList['prototype'][_0x136307(0xbd)]=function(_0x29d8de){const _0x57da4b=_0x136307;this[_0x57da4b(0x107)]=this[_0x57da4b(0x15e)][_0x57da4b(0xdf)][_0x57da4b(0xb5)]??_0x57da4b(0x185),this['_columns']==='auto'?this['_columns']=_0x29d8de['width']>=Graphics['width']*0x2/0x3?0x2:0x1:this['_columns']=eval(this['_columns'])||0x1,this['_textAlign']=this[_0x57da4b(0x15e)][_0x57da4b(0xdf)][_0x57da4b(0x9e)]??_0x57da4b(0x9b),this['_autoSelect']=this[_0x57da4b(0x15e)][_0x57da4b(0xdf)][_0x57da4b(0xe0)]??'0';},Window_CommonEventMenuList[_0x136307(0xcd)]['createCancelButton']=function(){const _0x3f5471=_0x136307;if(this[_0x3f5471(0x15e)][_0x3f5471(0x157)]<=0x0)return;if(!$dataCommonEvents[this[_0x3f5471(0x15e)]['CancelEvent']])return;if(!ConfigManager[_0x3f5471(0x16d)])return;if(this[_0x3f5471(0x15e)]['Optional'][_0x3f5471(0x157)]===![])return;this[_0x3f5471(0x12a)]=new Sprite_Button(_0x3f5471(0x101)),this[_0x3f5471(0x12a)][_0x3f5471(0xbe)]=![],this[_0x3f5471(0x109)](this[_0x3f5471(0x12a)]);const _0x2a2632=this[_0x3f5471(0x15e)][_0x3f5471(0xdf)][_0x3f5471(0xd3)]??0.8;this[_0x3f5471(0x12a)][_0x3f5471(0x177)]['x']=this[_0x3f5471(0x12a)][_0x3f5471(0x177)]['y']=_0x2a2632;const _0x34786e=this[_0x3f5471(0x12a)]['width']*_0x2a2632,_0x5b0c00=this[_0x3f5471(0x12a)][_0x3f5471(0x124)]*_0x2a2632,_0xa9cabf=(this[_0x3f5471(0x15e)][_0x3f5471(0xdf)]['CancelButtonPosition']??_0x3f5471(0xe6))[_0x3f5471(0x125)]()[_0x3f5471(0xc4)]();if(_0xa9cabf[_0x3f5471(0xd0)](/LEFT/i))this['_cancelButton']['x']=0x0;else{if(_0xa9cabf[_0x3f5471(0xd0)](/CENTER/i))this['_cancelButton']['x']=Math[_0x3f5471(0x162)]((this[_0x3f5471(0xff)]-_0x34786e)/0x2);else _0xa9cabf['match'](/RIGHT/i)&&(this['_cancelButton']['x']=this[_0x3f5471(0xff)]-_0x34786e);}if(_0xa9cabf[_0x3f5471(0xd0)](/UPPER/i))this[_0x3f5471(0x12a)]['y']=0x0;else{if(_0xa9cabf[_0x3f5471(0xd0)](/MIDDLE/i))this['_cancelButton']['y']=Math[_0x3f5471(0x162)]((this[_0x3f5471(0x124)]-_0x5b0c00)/0x2);else _0xa9cabf[_0x3f5471(0xd0)](/BOTTOM/i)&&(this[_0x3f5471(0x12a)]['y']=this[_0x3f5471(0x124)]-_0x5b0c00);}this[_0x3f5471(0x12a)]['x']+=this[_0x3f5471(0x15e)][_0x3f5471(0xdf)]['CancelOffsetX']??-0x12,this[_0x3f5471(0x12a)]['y']+=this[_0x3f5471(0x15e)]['Optional'][_0x3f5471(0x98)]??0xf;},Window_CommonEventMenuList[_0x136307(0xcd)][_0x136307(0xa7)]=function(){const _0x29173b=_0x136307;let _0x1f6b92=0x0;this['_autoSelect']['toLowerCase']()[_0x29173b(0xc4)]()===_0x29173b(0x173)?_0x1f6b92=$gameSystem[_0x29173b(0xe5)]():_0x1f6b92=eval(this[_0x29173b(0xb3)]);const _0x451c88=Math['max'](0x0,this[_0x29173b(0xc6)](_0x1f6b92));this[_0x29173b(0x134)](_0x451c88);},Window_CommonEventMenuList[_0x136307(0xcd)]['hitIndex']=function(){const _0x357b26=_0x136307;if(this['_cancelButton']&&this['_cancelButton'][_0x357b26(0x13e)]())return-0x1;return Window_Command[_0x357b26(0xcd)]['hitIndex'][_0x357b26(0xab)](this);},Window_CommonEventMenuList[_0x136307(0xcd)][_0x136307(0x17f)]=function(){const _0x97a290=_0x136307;this[_0x97a290(0xfe)]&&(this[_0x97a290(0x14b)]+=0x20,this['isOpen']()&&(this[_0x97a290(0xfe)]=![],this[_0x97a290(0x12a)]&&(this[_0x97a290(0x12a)][_0x97a290(0xbe)]=!![])));},Window_CommonEventMenuList['prototype'][_0x136307(0x127)]=function(){const _0x5e0ae5=_0x136307;this['_cancelButton']&&(this[_0x5e0ae5(0x12a)][_0x5e0ae5(0xbe)]=![]),Window_Command[_0x5e0ae5(0xcd)]['close']['call'](this);},Window_CommonEventMenuList[_0x136307(0xcd)]['maxCols']=function(){return this['_columns']||0x1;},Window_CommonEventMenuList[_0x136307(0xcd)][_0x136307(0xd6)]=function(){const _0x42f9cf=_0x136307;return this[_0x42f9cf(0x11c)];},Window_CommonEventMenuList['prototype'][_0x136307(0x166)]=function(_0x7d809,_0x57e31a){const _0x3fb395=_0x136307;if(!_0x7d809)return;this[_0x3fb395(0x181)]=this['_aidWindows']||{},this['_aidWindows'][_0x57e31a]=_0x7d809;},Window_CommonEventMenuList['prototype'][_0x136307(0x108)]=function(){const _0x313f45=_0x136307;for(const _0x5864aa of this[_0x313f45(0x15e)][_0x313f45(0x117)]){const _0x40d9a7=$dataCommonEvents[_0x5864aa];if(!this['includes'](_0x40d9a7))continue;const _0x3082d4=DataManager[_0x313f45(0x129)](_0x5864aa,this[_0x313f45(0x99)]()<=0x1),_0x157e6b=this[_0x313f45(0x171)](_0x40d9a7);this[_0x313f45(0x9a)](_0x3082d4,_0x313f45(0xad),_0x157e6b,_0x5864aa);}},Window_CommonEventMenuList['prototype'][_0x136307(0xf4)]=function(_0x31013b){const _0x21c5b9=_0x136307;if(!_0x31013b)return![];const _0x575dc1=_0x21c5b9(0xc5)['format'](_0x31013b['id']);if(VisuMZ[_0x21c5b9(0xd1)]['JS'][_0x575dc1]){if(!VisuMZ['CommonEventMenu']['JS'][_0x575dc1][_0x21c5b9(0xab)](this))return![];}const _0x338284=VisuMZ[_0x21c5b9(0xd1)][_0x21c5b9(0x119)],_0x4e5d28=DataManager[_0x21c5b9(0x12e)](_0x31013b['id']);if(_0x4e5d28[_0x21c5b9(0xd0)](_0x338284['ShowAll'])){const _0x89394=JSON[_0x21c5b9(0x16c)]('['+RegExp['$1'][_0x21c5b9(0xd0)](/\d+/g)+']');for(const _0x327d72 of _0x89394){if(!$gameSwitches['value'](_0x327d72))return![];}return!![];}if(_0x4e5d28[_0x21c5b9(0xd0)](_0x338284[_0x21c5b9(0xbb)])){const _0xcd970c=JSON[_0x21c5b9(0x16c)]('['+RegExp['$1'][_0x21c5b9(0xd0)](/\d+/g)+']');for(const _0x379a03 of _0xcd970c){if($gameSwitches['value'](_0x379a03))return!![];}return![];}if(_0x4e5d28['match'](_0x338284[_0x21c5b9(0x118)])){const _0x10a7e9=JSON[_0x21c5b9(0x16c)]('['+RegExp['$1'][_0x21c5b9(0xd0)](/\d+/g)+']');for(const _0x2fe594 of _0x10a7e9){if(!$gameSwitches[_0x21c5b9(0x167)](_0x2fe594))return!![];}return![];}if(_0x4e5d28[_0x21c5b9(0xd0)](_0x338284[_0x21c5b9(0x170)])){const _0xd4b6b2=JSON[_0x21c5b9(0x16c)]('['+RegExp['$1'][_0x21c5b9(0xd0)](/\d+/g)+']');for(const _0x312004 of _0xd4b6b2){if($gameSwitches[_0x21c5b9(0x167)](_0x312004))return![];}return!![];}return!![];},Window_CommonEventMenuList['prototype']['isEnabled']=function(_0xfe3431){const _0x3c94a0=_0x136307;if(!_0xfe3431)return![];const _0x623bee=_0x3c94a0(0x14f)[_0x3c94a0(0xf2)](_0xfe3431['id']);if(VisuMZ['CommonEventMenu']['JS'][_0x623bee]){if(!VisuMZ[_0x3c94a0(0xd1)]['JS'][_0x623bee]['call'](this))return![];}const _0x1bbe1a=VisuMZ['CommonEventMenu'][_0x3c94a0(0x119)],_0x2b0a8d=DataManager[_0x3c94a0(0x12e)](_0xfe3431['id']);if(_0x2b0a8d[_0x3c94a0(0xd0)](_0x1bbe1a['EnableAll'])){const _0x29cce2=JSON['parse']('['+RegExp['$1'][_0x3c94a0(0xd0)](/\d+/g)+']');for(const _0xd8131d of _0x29cce2){if(!$gameSwitches['value'](_0xd8131d))return![];}return!![];}if(_0x2b0a8d[_0x3c94a0(0xd0)](_0x1bbe1a[_0x3c94a0(0x175)])){const _0x12d8f9=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x14f3e1 of _0x12d8f9){if($gameSwitches[_0x3c94a0(0x167)](_0x14f3e1))return!![];}return![];}if(_0x2b0a8d[_0x3c94a0(0xd0)](_0x1bbe1a[_0x3c94a0(0xc8)])){const _0x3b9d70=JSON[_0x3c94a0(0x16c)]('['+RegExp['$1'][_0x3c94a0(0xd0)](/\d+/g)+']');for(const _0x3eebe1 of _0x3b9d70){if(!$gameSwitches[_0x3c94a0(0x167)](_0x3eebe1))return!![];}return![];}if(_0x2b0a8d[_0x3c94a0(0xd0)](_0x1bbe1a[_0x3c94a0(0x182)])){const _0x1946fd=JSON[_0x3c94a0(0x16c)]('['+RegExp['$1'][_0x3c94a0(0xd0)](/\d+/g)+']');for(const _0xbb6449 of _0x1946fd){if($gameSwitches['value'](_0xbb6449))return![];}return!![];}return!![];},Window_CommonEventMenuList['prototype'][_0x136307(0x12c)]=function(_0x56026c){const _0x115010=_0x136307,_0x37ce45=this[_0x115010(0x121)](_0x56026c),_0x3e9c0f=this[_0x115010(0x17e)](_0x56026c),_0x119cc8=this['textSizeEx'](_0x3e9c0f)[_0x115010(0xff)];this['changePaintOpacity'](this[_0x115010(0x13f)](_0x56026c));const _0x4397cc=this[_0x115010(0xd6)]();if(_0x4397cc===_0x115010(0xeb))this['drawTextEx'](_0x3e9c0f,_0x37ce45['x']+_0x37ce45[_0x115010(0xff)]-_0x119cc8,_0x37ce45['y'],_0x119cc8);else{if(_0x4397cc==='center'){const _0xe53b5d=_0x37ce45['x']+Math['floor']((_0x37ce45[_0x115010(0xff)]-_0x119cc8)/0x2);this[_0x115010(0x178)](_0x3e9c0f,_0xe53b5d,_0x37ce45['y'],_0x119cc8);}else this[_0x115010(0x178)](_0x3e9c0f,_0x37ce45['x'],_0x37ce45['y'],_0x119cc8);}},Window_CommonEventMenuList['prototype'][_0x136307(0xfb)]=function(){const _0x2ea202=_0x136307;Window_Command[_0x2ea202(0xcd)][_0x2ea202(0xfb)]['call'](this);if(!this[_0x2ea202(0x181)])return;const _0x4b2430=this['currentExt']();if(this[_0x2ea202(0x181)][_0x2ea202(0x138)]){const _0x338890=DataManager['commonEventMenuPicture'](_0x4b2430);this[_0x2ea202(0x181)][_0x2ea202(0x138)][_0x2ea202(0xcf)](_0x338890);}if(this[_0x2ea202(0x181)][_0x2ea202(0xb1)]){const _0x5404fe=DataManager[_0x2ea202(0x144)](_0x4b2430,'Help');this['_aidWindows'][_0x2ea202(0xb1)][_0x2ea202(0xe7)](_0x5404fe);}if(this[_0x2ea202(0x181)][_0x2ea202(0xd5)]){const _0x1dc7fb=DataManager[_0x2ea202(0x144)](_0x4b2430,_0x2ea202(0xd7));this[_0x2ea202(0x181)][_0x2ea202(0xd5)][_0x2ea202(0xe7)](_0x1dc7fb);}for(let _0x33fd61=0x1;_0x33fd61<=0xa;_0x33fd61++){const _0x5da141=this['_aidWindows']['extraWindow_%1'[_0x2ea202(0xf2)](_0x33fd61)];if(_0x5da141){const _0x216f76=DataManager[_0x2ea202(0x144)](_0x4b2430,'Extra%1'[_0x2ea202(0xf2)](_0x33fd61));_0x5da141[_0x2ea202(0xe7)](_0x216f76);}}};
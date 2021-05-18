//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.02] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * * Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * * Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * * Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * * Global Switches and Variables that span across all saves and new games.
 * * Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * * Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * * Change up how the Save Menu appears with various save styles.
 * * Add descriptions and pictures to the save files.
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
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
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
 * === Autosave Plugin Commands ===
 * 
 * ---
 *
 * Autosave: Enable/Disable
 * - Enable or Disable Autosave
 * - Requires Database => System 1 => [x] Enable Autosave
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 * 
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *   - \V[x], \N[x], \P[x] are save local.
 *   - Other text codes will draw data from the currently active game.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 * 
 *   Start Enabled?:
 *   - Start with autosave enabled?
 *   - Requires Database => System 1 => [x] Enable Autosave
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   * Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
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
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * * Documentation Update!
 * ** The Plugin Command 'Save: Set Description' now has updated documentation
 *    for the text codes that are parsed on the local level.
 * * Feature Update!
 * ** The Plugin Command 'Save: Set Description' will now parse text code
 *    data for \V[x], \N[x], \P[x] on a local save file level. Feature updated
 *    by Yanfly.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixes!
 * ** Disabling confirmation windows no longer cause crashes.
 *    Fix made by Yanfly.
 * ** Plugin Commands for for setting descriptions and save images work despite
 *    save settings found in the database. Fix made by Yanfly.
 * ** Save Core no longer crashes when going to the Save/Load scenes without
 *    the Core Engine enabled.
 * ** Single and Locked save styles no longer crash the game when loading.
 *    Fix made by Olivia.
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
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or Disable Autosave
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here. 
 * Text codes supported. \V[x], \N[x], \P[x] are save local.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
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
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:num":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
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
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param StartEnabled:eval
 * @text Start Enabled?
 * @parent General
 * @type boolean
 * @on Start Enabled
 * @off Start Disabled
 * @desc Start with autosave enabled?
 * Requires Database => System 1 => [x] Enable Autosave
 * @default true
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x469e=['Autosave','LatestText','globalValue','isBattleTest','drawCenteredPicture','drawTimestamp','Scene_Boot_onDatabaseLoaded','VertContentsJS','forceAutosave','setGlobalValue','Game_Variables_setValue','face','call','max','saveMenuSpriteWidth','autosaveOption','callMenu','isSaveEnabled','_stored_latestSavefile','Fjbwk','length','battlerName','Game_Switches_value','ConfigManager_applyData','UfDbR','box','determineAutosaveBypass','autosaveEnabled','onAfterLoad','forageTestKey','Game_Switches_setValue','format','Scene_Menu_create','SaveStyle','Scene_Map_onMapLoaded','qbmns','parameters','AddOption','autosaveFailure','inBattle','Scene_Save_helpWindowText','getColorDataFromPluginParameters','ARRAYSTR','Game_Variables_value','menuStyle','Scene_Map_onTransferEnd','removeChild','EVAL','StartEnabled','MakeSavefileInfoJS','drawActorSprites','DjZNy','timestamp','calcWindowHeight','number','version','commandNewGame','onLoadSuccess','ConfirmRect','SzvJf','VisuMZ_1_MessageCore','loadPicture','shouldAutosave','round','commandSave','contentsOpacity','commandNewGameSaveCoreLocked','VertFileDataJS','VertCols','LargeContentsJS','VFFFR','drawContentsLoaded','OnLoadFailureJS','activate','ceil','LargeCols','AutosaveExecute','setSavefileId','_success','process_VisuMZ_SaveCore_Switches_Variables','addSaveCoreAutosaveCommand','openAutosaveConfirmationWindow','Game_System_savefileId','fadeIn','ListRows','onMapLoaded','ListFileDataJS','Text','svbattlers','drawBackground','NUM','_autosaveConfirmWindow','exit','drawActorFaces','loadGame','_SaveCoreSettings','autosaveType','isAutosaveCompatible','resetWordWrap','updateFade','drawText','then','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','uHYhP','popScene','makeSavefileInfo','map','TgxEo','log','Duration','changeTextColor','Name','addGeneralOptions','STRUCT','blwGN','addSaveCoreCommands','setSaveDescription','latestSave','ListCols','name','picture','padStart','vertical','ZaLgN','Window_Options_addGeneralOptions','ARRAYEVAL','drawTextEx','clear','match','onSaveFailure','registerCommand','optAutosave','_commandWindow','XPtzq','width','includes','changePaintOpacity','_saveConfirmWindow','createSaveConfirmationWindow','setWordWrap','autosave','saveStyle','drawPlaytime','SaveMenu','drawDescription','drawPicture','value','VocabLoadFailure','Scene_Save_executeSave','Scene_Options_maxCommands','helpWindowText','BoxCols','initSaveCore','update','_bypassAutosave','VocabLockedSaveSlot','join','AutosaveConfirm','IybAe','MaxSaveFiles','makeSavename','Scene_Menu_commandSave','maxCols','right','GlobalSwitches','AutosaveEnable','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','faceWidth','single','isNwjs','kLNmR','onTransferEnd','UdmEq','onSaveSuccess','variables','setFadeSpeed','svActorVertCells','blt','Scene_Base_onAutosaveSuccess','AutosaveOption','locked','SaveMenuStyle','transfer','partyMemberName','AfterMenuCall','drawFace','setValue','commandContinue','uNfSh','_colorCache','Scene_Save_onSaveFailure','indexToSavefileId','drawSvActor','BoxRows','onSaveCoreSaveSuccess','goto','loadSvActor','isPreviousScene','Settings','mainCommandWidth','floor','latestSavefile','drawLatestMarker','drawBoxStyleContents','onLoadFailure','create','_loadSuccess','svActorHorzCells','drawCurrencyValue','ScreenPosition','SaveDescription','SaveConfirm','getSaveDescription','actorName','AutosaveType','smoothSelect','pickLockedSaveSlot','actorStyle','drawLargeStyleContents','Save','prototype','latestSavefileId','filePath','both','Filename','commandSaveLocked','contents','uDDvT','pKQoh','setSavePicture','push','saveMenuSvBattlerWidth','drawCharacter','ARRAYSTRUCT','bind','FilenameFmt','executeAutosave','savePicture','savefileIdToIndex','process_VisuMZ_SaveCore_Settings','_pickLockedSaveSlot','Azyau','maxSavefiles','autosaveSuccess','min','STR','aaCpP','globalSwitches','getScreenPosition','AutosaveForce','iWOpi','drawListStyleContents','large','closeSaveConfirmationWindow','KeyFmt','onAutosaveFailure','drawTitle','dimColor2','closeAutosaveConfirmationWindow','LargeFileDataJS','battle','advanced','openSaveConfirmationWindow','ParseTextCodes','_savefileId','split','windowPadding','exitMenu','getHours','terminate','catch','maxBattleMembers','ynPxA','refresh','WiKfP','forageKey','addCommand','AutosaveRequest','openness','faces','innerWidth','addLoadListener','ODUZW','kCecl','contentsBack','gameId','ConvertParams','saveSuccess','RequestsRequireSaveEnable','ARRAYJSON','saveDescription','getTimestamp','updatePosition','playLoad','playSave','OnSaveFailureJS','ARRAYFUNC','Scene_Load_onLoadSuccess','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','dWZof','Enable','Default','ListContentsJS','characters','bXcfS','innerHeight','addChild','BoxContentsJS','commandContinueSaveCoreSingle','fadeOut','onSaveCoreSaveFailure','svbattlersForSaveFile','SaveCurrentSlot','startNewGameLockedSave','createAutosaveConfirmationWindow','resetFontSettings','isAutosaveEnabled','drawFileData','onSaveCoreLoadSuccess','filter','onAutosaveSuccess','SaveCore','drawLargeStyleFileData','toUpperCase','constructor','FUNC','drawSvBattlerSprites','dimColor1','isEventTest','getMinutes','wncCn','saveGame','ActorGraphic','_fadeSpeed','Scene_Title_initialize','VocabSaveFailure','isGlobal','loadFailure','gold','drawContents','lTQzN','saveFailure','hifqs','AORTZ','applyData','savefileId','SpriteWidth','getMonth','drawVerticalStyleFileData','activateListWindow','requestAutosave','isSaveConfirmWindowEnabled','getDate','_processingAutosave','saveConfirmationWindowRect','center','Scene_Title_terminate','GlobalVariables','ExtensionFmt','VocabAutosaveSuccess','fileDirectoryPath','_scene','textSizeEx','parse','executeSave','loadFailureConfirmationWindow','playtime','svbattler','onBeforeSave','current','fadeOutAll','drawBoxStyleFileData','sprite','AfterExitMenu','OnSaveSuccessJS','sacZS','setSetSuccess','SvBattlerWidth','LocalMode','AdjustRect','setMode','LatestColor','numVisibleRows','drawListStyleFileData','Game_System_initialize','OnLoadSuccessJS','switches','VertRows','autosaveConfirmationWindowRect','Scene_Title_commandContinue','replace','KQOVq','beyTY','Scene_Base_requestAutosave','DataManager_makeSavefileInfo','isAutosaveConfirmWindowEnabled','drawVerticalStyleContents','left','save','selectSavefile','savefileInfo','height','globalVariables','OnAutosaveSuccessJS','Scene_Title_commandNewGame','ConfigManager_makeData','enableAutosave','reloadMapIfUpdated','maxCommands','onDatabaseLoaded','zQHBr','AfterTransfer','status','makeData','#%1','_active','battleMembers','close','Scene_Base_onAutosaveFailure','description','getFullYear','TestKey','gradientFillRect','initialize','saveCurrentSlot','playBuzzer','drawItem','ydACM','currencyUnit','mkUfZ'];(function(_0x308236,_0x469ed0){const _0x5c90f8=function(_0x5bbc47){while(--_0x5bbc47){_0x308236['push'](_0x308236['shift']());}};_0x5c90f8(++_0x469ed0);}(_0x469e,0x12f));const _0x5c90=function(_0x308236,_0x469ed0){_0x308236=_0x308236-0x0;let _0x5c90f8=_0x469e[_0x308236];return _0x5c90f8;};var label=_0x5c90('0x12'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5c90('0x10')](function(_0x28ff33){return _0x28ff33[_0x5c90('0x6d')]&&_0x28ff33[_0x5c90('0x74')][_0x5c90('0x106')]('['+label+']');})[0x0];VisuMZ[label][_0x5c90('0x145')]=VisuMZ[label][_0x5c90('0x145')]||{},VisuMZ[_0x5c90('0x19d')]=function(_0x26589c,_0x578795){for(const _0x38b490 in _0x578795){if(_0x5c90('0xe6')===_0x5c90('0x7e')){function _0x1baa3c(){_0x509f65['SaveCore']['Window_Options_addGeneralOptions'][_0x5c90('0x8b')](this),this[_0x5c90('0xf2')]();}}else{if(_0x38b490[_0x5c90('0xff')](/(.*):(.*)/i)){if(_0x5c90('0xa2')!==_0x5c90('0x7c')){const _0x22fd43=String(RegExp['$1']),_0x62fa25=String(RegExp['$2'])[_0x5c90('0x14')]()['trim']();let _0x557320,_0x6500a2,_0x2b845c;switch(_0x62fa25){case _0x5c90('0xd9'):_0x557320=_0x578795[_0x38b490]!==''?Number(_0x578795[_0x38b490]):0x0;break;case'ARRAYNUM':_0x6500a2=_0x578795[_0x38b490]!==''?JSON[_0x5c90('0x3c')](_0x578795[_0x38b490]):[],_0x557320=_0x6500a2[_0x5c90('0xe9')](_0x4c313e=>Number(_0x4c313e));break;case _0x5c90('0xae'):_0x557320=_0x578795[_0x38b490]!==''?eval(_0x578795[_0x38b490]):null;break;case _0x5c90('0xfc'):_0x6500a2=_0x578795[_0x38b490]!==''?JSON[_0x5c90('0x3c')](_0x578795[_0x38b490]):[],_0x557320=_0x6500a2[_0x5c90('0xe9')](_0x74e54b=>eval(_0x74e54b));break;case'JSON':_0x557320=_0x578795[_0x38b490]!==''?JSON['parse'](_0x578795[_0x38b490]):'';break;case _0x5c90('0x1a0'):_0x6500a2=_0x578795[_0x38b490]!==''?JSON[_0x5c90('0x3c')](_0x578795[_0x38b490]):[],_0x557320=_0x6500a2[_0x5c90('0xe9')](_0x556ee4=>JSON[_0x5c90('0x3c')](_0x556ee4));break;case _0x5c90('0x16'):_0x557320=_0x578795[_0x38b490]!==''?new Function(JSON[_0x5c90('0x3c')](_0x578795[_0x38b490])):new Function('return\x200');break;case _0x5c90('0x1a7'):_0x6500a2=_0x578795[_0x38b490]!==''?JSON[_0x5c90('0x3c')](_0x578795[_0x38b490]):[],_0x557320=_0x6500a2[_0x5c90('0xe9')](_0x1b8ba7=>new Function(JSON[_0x5c90('0x3c')](_0x1b8ba7)));break;case _0x5c90('0x174'):_0x557320=_0x578795[_0x38b490]!==''?String(_0x578795[_0x38b490]):'';break;case _0x5c90('0xa9'):_0x6500a2=_0x578795[_0x38b490]!==''?JSON[_0x5c90('0x3c')](_0x578795[_0x38b490]):[],_0x557320=_0x6500a2[_0x5c90('0xe9')](_0x126517=>String(_0x126517));break;case _0x5c90('0xf0'):_0x2b845c=_0x578795[_0x38b490]!==''?JSON[_0x5c90('0x3c')](_0x578795[_0x38b490]):{},_0x26589c[_0x22fd43]={},VisuMZ[_0x5c90('0x19d')](_0x26589c[_0x22fd43],_0x2b845c);continue;case _0x5c90('0x168'):_0x6500a2=_0x578795[_0x38b490]!==''?JSON['parse'](_0x578795[_0x38b490]):[],_0x557320=_0x6500a2[_0x5c90('0xe9')](_0x44a5a1=>VisuMZ[_0x5c90('0x19d')]({},JSON[_0x5c90('0x3c')](_0x44a5a1)));break;default:continue;}_0x26589c[_0x22fd43]=_0x557320;}else{function _0x1d4b81(){if(_0x2ea109===0x0||_0x4aae8a[_0x5c90('0x15c')]()!==_0x2b46fe)return;const _0x245459=_0x400cf6[_0x5c90('0xf4')];this[_0x5c90('0xed')](_0x3a63fe[_0x5c90('0x148')]()),this[_0x5c90('0xe3')](_0x245459,_0x13f8b8,_0x522e4a,0xb4);}}}}}return _0x26589c;},(_0x2adc9f=>{const _0xcfe0a6=_0x2adc9f[_0x5c90('0xf6')];for(const _0x38a54a of dependencies){if(!Imported[_0x38a54a]){alert(_0x5c90('0x1a9')[_0x5c90('0x9e')](_0xcfe0a6,_0x38a54a)),SceneManager['exit']();break;}}const _0x35f6b5=_0x2adc9f[_0x5c90('0x74')];if(_0x35f6b5['match'](/\[Version[ ](.*?)\]/i)){const _0x234306=Number(RegExp['$1']);if(_0x234306!==VisuMZ[label][_0x5c90('0xb6')]){if(_0x5c90('0xb2')===_0x5c90('0x6b')){function _0x1d864a(){if(_0x19a8e2>0x0&&_0x5b3822<_0x196da2['variables']['length']){_0x2dd5ef[_0x5c90('0x63')]=_0x548980[_0x5c90('0x63')]||[];if(typeof _0x21475c===_0x5c90('0xb5'))_0x2dee59=_0x507a71[_0x5c90('0x147')](_0x192c19);_0x3d4ceb['globalVariables'][_0x332dc9]=_0x5ed93e,_0x3db475[_0x5c90('0x5f')]();}}}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5c90('0x9e')](_0xcfe0a6,_0x234306)),SceneManager['exit']();}}if(_0x35f6b5['match'](/\[Tier[ ](\d+)\]/i)){if(_0x5c90('0xf1')===_0x5c90('0xf1')){const _0x1a0393=Number(RegExp['$1']);if(_0x1a0393<tier)alert(_0x5c90('0x125')['format'](_0xcfe0a6,_0x1a0393,tier)),SceneManager[_0x5c90('0xdb')]();else{if(_0x5c90('0x1b')===_0x5c90('0x1b'))tier=Math[_0x5c90('0x8c')](_0x1a0393,tier);else{function _0x2537d8(){_0x20aa1b['_pickLockedSaveSlot']?this[_0x5c90('0xa')](_0x495f23):_0x371b44[_0x5c90('0x12')]['Scene_Save_executeSave'][_0x5c90('0x8b')](this,_0x12c7b9);}}}}else{function _0x590fd3(){_0x3805dc[_0x5c90('0x12')][_0x5c90('0x35')][_0x5c90('0x8b')](this);if(this[_0x5c90('0x14d')])_0x661fc4[_0x5c90('0x9b')]();}}}VisuMZ[_0x5c90('0x19d')](VisuMZ[label][_0x5c90('0x145')],_0x2adc9f[_0x5c90('0xa3')]);})(pluginData),PluginManager[_0x5c90('0x101')](pluginData[_0x5c90('0xf6')],_0x5c90('0x124'),_0x8e6cbb=>{if(!DataManager[_0x5c90('0xe0')]())return;VisuMZ[_0x5c90('0x19d')](_0x8e6cbb,_0x8e6cbb);if($gameSystem)$gameSystem[_0x5c90('0x67')](_0x8e6cbb[_0x5c90('0x1ab')]);}),PluginManager[_0x5c90('0x101')](pluginData[_0x5c90('0xf6')],_0x5c90('0x194'),_0x53fa91=>{if(!DataManager[_0x5c90('0xe0')]()||$gameParty['inBattle']())return;SceneManager[_0x5c90('0x3a')][_0x5c90('0x2f')]();}),PluginManager['registerCommand'](pluginData['name'],_0x5c90('0xcb'),_0x4d5663=>{if(!DataManager[_0x5c90('0xe0')]()||$gameParty[_0x5c90('0xa6')]())return;SceneManager[_0x5c90('0x3a')][_0x5c90('0x16b')]();}),PluginManager['registerCommand'](pluginData['name'],_0x5c90('0x178'),_0x2812ac=>{if(!DataManager[_0x5c90('0xe0')]()||$gameParty[_0x5c90('0xa6')]())return;SceneManager[_0x5c90('0x3a')][_0x5c90('0x87')]();}),PluginManager[_0x5c90('0x101')](pluginData[_0x5c90('0xf6')],_0x5c90('0x9'),_0xc91794=>{SceneManager[_0x5c90('0x3a')]['saveCurrentSlot']();}),PluginManager[_0x5c90('0x101')](pluginData[_0x5c90('0xf6')],_0x5c90('0x151'),_0x12fdb7=>{VisuMZ['ConvertParams'](_0x12fdb7,_0x12fdb7);if($gameSystem)$gameSystem[_0x5c90('0xf3')](_0x12fdb7[_0x5c90('0xd6')]);}),PluginManager['registerCommand'](pluginData[_0x5c90('0xf6')],'SavePicture',_0x228217=>{VisuMZ[_0x5c90('0x19d')](_0x228217,_0x228217);if($gameSystem)$gameSystem[_0x5c90('0x164')](_0x228217[_0x5c90('0x15f')]);}),VisuMZ['SaveCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x5c90('0x6a')],Scene_Boot[_0x5c90('0x15b')][_0x5c90('0x6a')]=function(){VisuMZ[_0x5c90('0x12')][_0x5c90('0x85')][_0x5c90('0x8b')](this),this[_0x5c90('0x16e')](),this[_0x5c90('0xce')]();},Scene_Boot['prototype'][_0x5c90('0x16e')]=function(){if(StorageManager[_0x5c90('0x10c')]()==='single')$dataSystem[_0x5c90('0x102')]=!![];},VisuMZ[_0x5c90('0x123')]=[],VisuMZ['GlobalVariables']=[],Scene_Boot['prototype'][_0x5c90('0xce')]=function(){for(let _0x4ff2a5=0x1;_0x4ff2a5<$dataSystem[_0x5c90('0x53')][_0x5c90('0x93')];_0x4ff2a5++){if($dataSystem[_0x5c90('0x53')][_0x4ff2a5][_0x5c90('0xff')](/<GLOBAL>/i))VisuMZ[_0x5c90('0x123')][_0x5c90('0x165')](_0x4ff2a5);}for(let _0x218d31=0x1;_0x218d31<$dataSystem[_0x5c90('0x12d')][_0x5c90('0x93')];_0x218d31++){if($dataSystem[_0x5c90('0x12d')][_0x218d31][_0x5c90('0xff')](/<GLOBAL>/i))VisuMZ[_0x5c90('0x36')][_0x5c90('0x165')](_0x218d31);}},DataManager['isAutosaveCompatible']=function(){return!DataManager[_0x5c90('0x82')]()&&!DataManager[_0x5c90('0x19')]()&&$dataSystem[_0x5c90('0x102')];},DataManager[_0x5c90('0x171')]=function(){if(StorageManager['saveStyle']()==='single')return 0x1;let _0x369a9a=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')]['AutosaveMaxCount']?0x0:0x1;return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0x11e')]+_0x369a9a;},DataManager[_0x5c90('0x11f')]=function(_0xb59937){const _0xe22561=VisuMZ['SaveCore']['Settings'][_0x5c90('0x15a')][_0x5c90('0x16a')];return _0xe22561['format'](_0xb59937);},VisuMZ[_0x5c90('0x12')]['DataManager_makeSavefileInfo']=DataManager['makeSavefileInfo'],DataManager[_0x5c90('0xe8')]=function(){const _0x593d43=VisuMZ['SaveCore'][_0x5c90('0x5b')][_0x5c90('0x8b')](this);return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')]['SaveMenu'][_0x5c90('0xb0')][_0x5c90('0x8b')](this,_0x593d43);},ConfigManager[_0x5c90('0x10b')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')]['AutosaveOption'][_0x5c90('0x1ac')],ConfigManager[_0x5c90('0x176')]=[],ConfigManager[_0x5c90('0x63')]=[],VisuMZ['SaveCore'][_0x5c90('0x66')]=ConfigManager[_0x5c90('0x6e')],ConfigManager[_0x5c90('0x6e')]=function(){const _0x4eab94=VisuMZ[_0x5c90('0x12')][_0x5c90('0x66')][_0x5c90('0x8b')](this);return _0x4eab94[_0x5c90('0x10b')]=this[_0x5c90('0x10b')]||VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x132')][_0x5c90('0x1ac')],_0x4eab94[_0x5c90('0x176')]=this[_0x5c90('0x176')]||[],_0x4eab94[_0x5c90('0x63')]=this[_0x5c90('0x63')]||[],_0x4eab94;},VisuMZ[_0x5c90('0x12')][_0x5c90('0x96')]=ConfigManager['applyData'],ConfigManager[_0x5c90('0x29')]=function(_0x1c9b2f){VisuMZ[_0x5c90('0x12')][_0x5c90('0x96')][_0x5c90('0x8b')](this,_0x1c9b2f),this[_0x5c90('0x10b')]=_0x1c9b2f[_0x5c90('0x10b')]!==undefined?_0x1c9b2f[_0x5c90('0x10b')]:VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')]['AutosaveOption']['Default'],this[_0x5c90('0x176')]=_0x1c9b2f[_0x5c90('0x176')]||[],this[_0x5c90('0x63')]=_0x1c9b2f[_0x5c90('0x63')]||[];},StorageManager['isLocalMode']=function(){if(Utils[_0x5c90('0x128')]()){if(_0x5c90('0x27')!==_0x5c90('0x18f'))return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0x4b')];else{function _0x40970f(){_0xb56d8b['SaveCore']['Settings'][_0x5c90('0x10e')][_0x5c90('0xd5')][_0x5c90('0x8b')](this,_0x3315d7,_0x2076ab);}}}else return![];},StorageManager[_0x5c90('0x15d')]=function(_0x2488f7){const _0x10805d=this[_0x5c90('0x39')](),_0x32be64=VisuMZ['SaveCore'][_0x5c90('0x145')]['Save'][_0x5c90('0x37')];return _0x10805d+_0x32be64[_0x5c90('0x9e')](_0x2488f7);},StorageManager[_0x5c90('0x192')]=function(_0xab452e){const _0x409c10=$dataSystem[_0x5c90('0x184')][_0x5c90('0x19c')],_0x29adde=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0x17d')];return _0x29adde['format'](_0x409c10,_0xab452e);},StorageManager[_0x5c90('0x9c')]=function(){return VisuMZ['SaveCore']['Settings'][_0x5c90('0x15a')][_0x5c90('0x76')];},StorageManager[_0x5c90('0x10c')]=function(){return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0xa0')];},StorageManager[_0x5c90('0xdf')]=function(){if(this[_0x5c90('0x10c')]()===_0x5c90('0x127'))return'file0';else{if('YviDG'===_0x5c90('0x163')){function _0x1fb936(){const _0x269e4c=_0x3ce39c[_0x5c90('0x173')](_0x50f259[_0x5c90('0x0')][_0x5c90('0x93')],_0x72d832[_0x5c90('0x18e')]()),_0x227c1e=_0x676f3a[_0x5c90('0x8d')];_0x163847=_0x49fd28+_0x256397['round']((_0x248b2c-_0x269e4c*_0x227c1e)/0x2)+_0x227c1e/0x2,_0x497485=_0x3cc0a2+_0x1c8b42-0x8;for(const _0x16a852 of _0x56eaa0[_0x5c90('0x0')]){this[_0x5c90('0x167')](_0x16a852[0x0],_0x16a852[0x1],_0x15873b,_0x38fcd2),_0x20e631+=_0x227c1e;}}}else return VisuMZ['SaveCore'][_0x5c90('0x145')][_0x5c90('0x7f')][_0x5c90('0x155')];}},TextManager[_0x5c90('0x157')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0x11a')],TextManager[_0x5c90('0x19e')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x152')]['VocabSaveSuccess'],TextManager[_0x5c90('0x26')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x152')][_0x5c90('0x20')],TextManager[_0x5c90('0x22')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x152')][_0x5c90('0x112')],TextManager[_0x5c90('0x8e')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x132')][_0x5c90('0xee')],TextManager[_0x5c90('0x172')]=VisuMZ[_0x5c90('0x12')]['Settings']['AutosaveConfirm'][_0x5c90('0x38')],TextManager[_0x5c90('0xa5')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x11c')]['VocabAutosaveFailure'],TextManager[_0x5c90('0xf4')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')]['SaveMenu'][_0x5c90('0x80')],ColorManager[_0x5c90('0x148')]=function(){const _0x9354ad=_0x5c90('0x91');this[_0x5c90('0x13c')]=this[_0x5c90('0x13c')]||{};if(this[_0x5c90('0x13c')][_0x9354ad])return this[_0x5c90('0x13c')][_0x9354ad];const _0x43c476=VisuMZ[_0x5c90('0x12')]['Settings'][_0x5c90('0x10e')][_0x5c90('0x4e')];return this[_0x5c90('0xa8')](_0x9354ad,_0x43c476);},ColorManager[_0x5c90('0xa8')]=function(_0x2f1110,_0x264523){_0x264523=String(_0x264523),this[_0x5c90('0x13c')]=this[_0x5c90('0x13c')]||{};if(_0x264523[_0x5c90('0xff')](/#(.*)/i))this[_0x5c90('0x13c')][_0x2f1110]=_0x5c90('0x6f')[_0x5c90('0x9e')](String(RegExp['$1']));else{if(_0x5c90('0x11d')!==_0x5c90('0x11d')){function _0x1396c5(){return _0x23653e=_0x3114d9(_0x1ecc21),this[_0x5c90('0x13c')]=this[_0x5c90('0x13c')]||{},_0x567510[_0x5c90('0xff')](/#(.*)/i)?this[_0x5c90('0x13c')][_0x8f7ff8]=_0x5c90('0x6f')[_0x5c90('0x9e')](_0x1a4919(_0x484380['$1'])):this[_0x5c90('0x13c')][_0x386aa2]=this['textColor'](_0x1afed9(_0x525c92)),this['_colorCache'][_0x272193];}}else this[_0x5c90('0x13c')][_0x2f1110]=this['textColor'](Number(_0x264523));}return this[_0x5c90('0x13c')][_0x2f1110];},VisuMZ[_0x5c90('0x12')][_0x5c90('0x51')]=Game_System[_0x5c90('0x15b')][_0x5c90('0x78')],Game_System[_0x5c90('0x15b')][_0x5c90('0x78')]=function(){VisuMZ[_0x5c90('0x12')][_0x5c90('0x51')][_0x5c90('0x8b')](this),this['initSaveCore']();},Game_System[_0x5c90('0x15b')][_0x5c90('0x117')]=function(){this[_0x5c90('0xde')]={'autosaveEnabled':VisuMZ['SaveCore'][_0x5c90('0x145')][_0x5c90('0x7f')][_0x5c90('0xaf')],'saveDescription':'','savePicture':''};},Game_System[_0x5c90('0x15b')][_0x5c90('0xd')]=function(){if(!$dataSystem[_0x5c90('0x102')])return![];if(this['_SaveCoreSettings']===undefined)this['initSaveCore']();if(this[_0x5c90('0xde')][_0x5c90('0x9a')]===undefined)this[_0x5c90('0x117')]();return this[_0x5c90('0xde')][_0x5c90('0x9a')];},Game_System[_0x5c90('0x15b')][_0x5c90('0x67')]=function(_0xc51f0a){if(!$dataSystem[_0x5c90('0x102')])return;if(this[_0x5c90('0xde')]===undefined)this[_0x5c90('0x117')]();if(this[_0x5c90('0xde')][_0x5c90('0x9a')]===undefined)this[_0x5c90('0x117')]();this[_0x5c90('0xde')][_0x5c90('0x9a')]=_0xc51f0a;},Game_System['prototype'][_0x5c90('0x153')]=function(){if(this[_0x5c90('0xde')]===undefined)this[_0x5c90('0x117')]();if(this[_0x5c90('0xde')][_0x5c90('0x1a1')]===undefined)this['initSaveCore']();return this[_0x5c90('0xde')][_0x5c90('0x1a1')];},Game_System[_0x5c90('0x15b')]['setSaveDescription']=function(_0x4bb494){if(this[_0x5c90('0xde')]===undefined)this['initSaveCore']();if(this[_0x5c90('0xde')][_0x5c90('0x1a1')]===undefined)this['initSaveCore']();this[_0x5c90('0xde')]['saveDescription']=VisuMZ[_0x5c90('0x12')][_0x5c90('0x186')](_0x4bb494);},VisuMZ['SaveCore'][_0x5c90('0x186')]=function(_0x1d397a){while(_0x1d397a[_0x5c90('0xff')](/\\V\[(\d+)\]/gi)){_0x1d397a=_0x1d397a[_0x5c90('0x57')](/\\V\[(\d+)\]/gi,(_0x3a2a08,_0x5c74b3)=>$gameVariables[_0x5c90('0x111')](parseInt(_0x5c74b3)));}while(_0x1d397a[_0x5c90('0xff')](/\\N\[(\d+)\]/gi)){_0x1d397a=_0x1d397a['replace'](/\\N\[(\d+)\]/gi,(_0x1b3abe,_0x4a4d4e)=>Window_Base['prototype'][_0x5c90('0x154')](parseInt(_0x4a4d4e)));}while(_0x1d397a[_0x5c90('0xff')](/\\P\[(\d+)\]/gi)){_0x1d397a=_0x1d397a[_0x5c90('0x57')](/\\P\[(\d+)\]/gi,(_0x6ff1c4,_0x4724b4)=>Window_Base[_0x5c90('0x15b')][_0x5c90('0x136')](parseInt(_0x4724b4)));}return _0x1d397a;},Game_System[_0x5c90('0x15b')]['getSavePicture']=function(){if(this[_0x5c90('0xde')]===undefined)this[_0x5c90('0x117')]();if(this[_0x5c90('0xde')][_0x5c90('0x16c')]===undefined)this['initSaveCore']();return this[_0x5c90('0xde')][_0x5c90('0x16c')];},Game_System['prototype'][_0x5c90('0x164')]=function(_0x19549e){if(this[_0x5c90('0xde')]===undefined)this[_0x5c90('0x117')]();if(this[_0x5c90('0xde')][_0x5c90('0x16c')]===undefined)this[_0x5c90('0x117')]();this[_0x5c90('0xde')][_0x5c90('0x16c')]=_0x19549e;},VisuMZ[_0x5c90('0x12')][_0x5c90('0xd1')]=Game_System[_0x5c90('0x15b')]['savefileId'],Game_System[_0x5c90('0x15b')][_0x5c90('0x2a')]=function(){const _0x1a5d2c=StorageManager['saveStyle']();switch(_0x1a5d2c){case _0x5c90('0x133'):return VisuMZ[_0x5c90('0x12')][_0x5c90('0xd1')]['call'](this)||0x1;break;case _0x5c90('0x127'):return 0x0;break;default:return VisuMZ[_0x5c90('0x12')]['Game_System_savefileId'][_0x5c90('0x8b')](this);break;}},Game_Switches[_0x5c90('0x15b')][_0x5c90('0x21')]=function(_0x41792a){return $dataSystem[_0x5c90('0x53')][_0x41792a]&&VisuMZ[_0x5c90('0x123')][_0x5c90('0x106')](_0x41792a);},VisuMZ[_0x5c90('0x12')]['Game_Switches_value']=Game_Switches[_0x5c90('0x15b')][_0x5c90('0x111')],Game_Switches[_0x5c90('0x15b')]['value']=function(_0x38461d){if(this[_0x5c90('0x21')](_0x38461d)){if('xnGkT'!==_0x5c90('0x19a'))return this[_0x5c90('0x81')](_0x38461d);else{function _0x4b8f6b(){return this[_0x5c90('0x81')](_0x396517);}}}else return VisuMZ[_0x5c90('0x12')][_0x5c90('0x95')][_0x5c90('0x8b')](this,_0x38461d);},Game_Switches[_0x5c90('0x15b')]['globalValue']=function(_0x4da2ae){return ConfigManager[_0x5c90('0x176')]=ConfigManager[_0x5c90('0x176')]||[],!!ConfigManager[_0x5c90('0x176')][_0x4da2ae];},VisuMZ[_0x5c90('0x12')][_0x5c90('0x9d')]=Game_Switches[_0x5c90('0x15b')][_0x5c90('0x139')],Game_Switches[_0x5c90('0x15b')][_0x5c90('0x139')]=function(_0x152010,_0x5089eb){if(this[_0x5c90('0x21')](_0x152010))this[_0x5c90('0x88')](_0x152010,_0x5089eb);VisuMZ[_0x5c90('0x12')]['Game_Switches_setValue']['call'](this,_0x152010,_0x5089eb);},Game_Switches[_0x5c90('0x15b')][_0x5c90('0x88')]=function(_0x12a2c3,_0x4635bc){_0x12a2c3>0x0&&_0x12a2c3<$dataSystem[_0x5c90('0x53')][_0x5c90('0x93')]&&(ConfigManager[_0x5c90('0x176')]=ConfigManager[_0x5c90('0x176')]||[],ConfigManager[_0x5c90('0x176')][_0x12a2c3]=_0x4635bc,ConfigManager['save']());},Game_Variables[_0x5c90('0x15b')]['isGlobal']=function(_0x3664f6){return $dataSystem[_0x5c90('0x12d')][_0x3664f6]&&VisuMZ['GlobalVariables']['includes'](_0x3664f6);},VisuMZ[_0x5c90('0x12')][_0x5c90('0xaa')]=Game_Variables[_0x5c90('0x15b')][_0x5c90('0x111')],Game_Variables[_0x5c90('0x15b')][_0x5c90('0x111')]=function(_0x58dea7){if(this['isGlobal'](_0x58dea7))return this[_0x5c90('0x81')](_0x58dea7);else{if(_0x5c90('0xba')!==_0x5c90('0x191'))return VisuMZ['SaveCore'][_0x5c90('0xaa')][_0x5c90('0x8b')](this,_0x58dea7);else{function _0x4492e1(){const _0x394cd5=this[_0x5c90('0x39')](),_0x42ea18=_0x4d5cac[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')]['ExtensionFmt'];return _0x394cd5+_0x42ea18[_0x5c90('0x9e')](_0x1aeb52);}}}},Game_Variables[_0x5c90('0x15b')][_0x5c90('0x81')]=function(_0x472531){ConfigManager[_0x5c90('0x63')]=ConfigManager[_0x5c90('0x63')]||[];if(ConfigManager[_0x5c90('0x63')][_0x472531]===undefined){if('BzkpP'==='BzkpP')ConfigManager[_0x5c90('0x63')][_0x472531]=0x0;else{function _0x517368(){_0x3a1e49=_0x5ee01f[_0x5c90('0x57')](/\\V\[(\d+)\]/gi,(_0x399df3,_0x61f781)=>_0x58806a['value'](_0x5f0e4a(_0x61f781)));}}}return ConfigManager[_0x5c90('0x63')][_0x472531];},VisuMZ[_0x5c90('0x12')][_0x5c90('0x89')]=Game_Variables[_0x5c90('0x15b')][_0x5c90('0x139')],Game_Variables[_0x5c90('0x15b')][_0x5c90('0x139')]=function(_0x2cf589,_0x52ab96){if(this[_0x5c90('0x21')](_0x2cf589))this[_0x5c90('0x88')](_0x2cf589,_0x52ab96);VisuMZ[_0x5c90('0x12')][_0x5c90('0x89')]['call'](this,_0x2cf589,_0x52ab96);},Game_Variables[_0x5c90('0x15b')][_0x5c90('0x88')]=function(_0x4d7205,_0x229f0d){if(_0x4d7205>0x0&&_0x4d7205<$dataSystem['variables'][_0x5c90('0x93')]){if(_0x5c90('0x58')!==_0x5c90('0x48')){ConfigManager[_0x5c90('0x63')]=ConfigManager[_0x5c90('0x63')]||[];if(typeof _0x229f0d===_0x5c90('0xb5'))_0x229f0d=Math[_0x5c90('0x147')](_0x229f0d);ConfigManager[_0x5c90('0x63')][_0x4d7205]=_0x229f0d,ConfigManager[_0x5c90('0x5f')]();}else{function _0x388c89(){this['determineAutosaveBypass'](_0x5c90('0x135'));}}}},Game_Party[_0x5c90('0x15b')][_0x5c90('0x8')]=function(){return this[_0x5c90('0x71')]()[_0x5c90('0xe9')](_0x358e1f=>_0x358e1f[_0x5c90('0x94')]());},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x99')]=function(_0x1127e8){const _0x520d09=VisuMZ[_0x5c90('0x12')]['Settings'][_0x5c90('0x7f')];switch(_0x1127e8){case _0x5c90('0x183'):this[_0x5c90('0x119')]=!_0x520d09['AfterBattle'];break;case _0x5c90('0x135'):if(!this['shouldAutosave']())return;this['_bypassAutosave']=!_0x520d09[_0x5c90('0x6c')];break;case _0x5c90('0x8f'):this[_0x5c90('0x119')]=!_0x520d09[_0x5c90('0x137')];break;case _0x5c90('0x18a'):this[_0x5c90('0x119')]=!_0x520d09[_0x5c90('0x46')];break;}},VisuMZ[_0x5c90('0x12')][_0x5c90('0x5a')]=Scene_Base[_0x5c90('0x15b')][_0x5c90('0x2f')],Scene_Base[_0x5c90('0x15b')][_0x5c90('0x2f')]=function(){if(!this[_0x5c90('0x119')]){if(_0x5c90('0x162')!==_0x5c90('0x12b'))VisuMZ[_0x5c90('0x12')][_0x5c90('0x5a')]['call'](this);else{function _0x3e6abf(){if(_0x442de9[_0x5c90('0x74')]){const _0x40b33b=this[_0x5c90('0x3b')](_0x37c659[_0x5c90('0x74')])[_0x5c90('0x105')];_0x213e60=_0x259784||'left';if(_0x48069d===_0x5c90('0x122'))_0x189cff=_0x478999+_0x46285f-_0x40b33b;else _0x3d0d66===_0x5c90('0x34')&&(_0x26ee41=_0x36c7d9+(_0x2f9850-_0x40b33b)/0x2);this[_0x5c90('0xfd')](_0x358b43[_0x5c90('0x74')],_0xee71e0,_0x3f5a6f,_0x42f1e6);}}}}this[_0x5c90('0x119')]=![];},Scene_Base[_0x5c90('0x15b')][_0x5c90('0xd')]=function(){return!DataManager['isBattleTest']()&&!DataManager[_0x5c90('0x19')]()&&$gameSystem[_0x5c90('0xd')]()&&(VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x7f')][_0x5c90('0x19f')]?$gameSystem[_0x5c90('0x90')]():!![]);},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x16b')]=function(){if(!ConfigManager['autosave'])return;this[_0x5c90('0x87')]();},Scene_Base['prototype'][_0x5c90('0x87')]=function(){$gameSystem[_0x5c90('0x41')](),this[_0x5c90('0x32')]=![];const _0x4c5559=StorageManager[_0x5c90('0xdf')]();['file0',_0x5c90('0x15e')][_0x5c90('0x106')](_0x4c5559)&&DataManager['saveGame'](0x0)[_0x5c90('0xe4')](()=>this[_0x5c90('0x11')]())[_0x5c90('0x18d')](()=>this[_0x5c90('0x17e')]());if(['current',_0x5c90('0x15e')][_0x5c90('0x106')](_0x4c5559)){if('beyTY'===_0x5c90('0x59')){const _0x39581f=$gameSystem[_0x5c90('0x2a')]();_0x39581f>0x0&&DataManager[_0x5c90('0x1c')](_0x39581f)[_0x5c90('0xe4')](()=>this[_0x5c90('0x11')]())[_0x5c90('0x18d')](()=>this[_0x5c90('0x17e')]());}else{function _0x22a04a(){return _0x15221a['SaveCore']['Settings'][_0x5c90('0x15a')][_0x5c90('0x76')];}}}this[_0x5c90('0x32')]=![];},VisuMZ[_0x5c90('0x12')][_0x5c90('0x131')]=Scene_Base[_0x5c90('0x15b')][_0x5c90('0x11')],Scene_Base[_0x5c90('0x15b')][_0x5c90('0x11')]=function(){if(this[_0x5c90('0x32')])return;VisuMZ[_0x5c90('0x12')][_0x5c90('0x131')]['call'](this),VisuMZ['SaveCore'][_0x5c90('0x145')]['Autosave'][_0x5c90('0x64')][_0x5c90('0x8b')](this),this[_0x5c90('0xd0')](!![]),this[_0x5c90('0x32')]=!![];},VisuMZ[_0x5c90('0x12')][_0x5c90('0x73')]=Scene_Base['prototype'][_0x5c90('0x17e')],Scene_Base[_0x5c90('0x15b')][_0x5c90('0x17e')]=function(){if(this[_0x5c90('0x32')])return;VisuMZ[_0x5c90('0x12')][_0x5c90('0x73')][_0x5c90('0x8b')](this),VisuMZ['SaveCore'][_0x5c90('0x145')][_0x5c90('0x7f')]['OnAutosaveFailureJS'][_0x5c90('0x8b')](this),this['openAutosaveConfirmationWindow'](![]);},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x109')]=function(){if(this['_saveConfirmWindow'])return;const _0x10a5ba=this[_0x5c90('0x33')]();this[_0x5c90('0x108')]=new Window_Base(_0x10a5ba),this[_0x5c90('0x108')][_0x5c90('0x195')]=0x0;},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x33')]=function(){return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x152')][_0x5c90('0xb9')][_0x5c90('0x8b')](this);},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x30')]=function(){return VisuMZ['SaveCore'][_0x5c90('0x145')]['SaveConfirm'][_0x5c90('0x1ab')];},Scene_Base['prototype'][_0x5c90('0x185')]=function(_0x246f78,_0x322dcf){if(!this[_0x5c90('0x30')]())return this['closeSaveConfirmationWindow'](_0x246f78);if(!this[_0x5c90('0x108')])this[_0x5c90('0x109')]();const _0x909a47=this[_0x5c90('0x108')];this[_0x5c90('0xad')](_0x909a47),this[_0x5c90('0x3')](_0x909a47),_0x909a47['open'](),_0x909a47[_0x5c90('0xc')](),_0x909a47[_0x5c90('0x161')][_0x5c90('0xfe')]();let _0x12082d='';_0x322dcf?_0x12082d=TextManager['loadFailure']:_0x12082d=_0x246f78?TextManager['saveSuccess']:TextManager[_0x5c90('0x26')];const _0x3fead7=_0x909a47['textSizeEx'](_0x12082d)[_0x5c90('0x105')],_0x2d265a=(_0x909a47['innerWidth']-_0x3fead7)/0x2;_0x909a47[_0x5c90('0xfd')](_0x12082d,_0x2d265a,0x0,_0x3fead7);const _0x228e27=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x152')][_0x5c90('0xec')];setTimeout(this['closeSaveConfirmationWindow'][_0x5c90('0x169')](this,_0x246f78),_0x228e27);},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x3e')]=function(){this[_0x5c90('0x185')](![],!![]);},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x17c')]=function(_0x304dc1){if(this[_0x5c90('0x108')])this[_0x5c90('0x108')][_0x5c90('0x72')]();},Scene_Base[_0x5c90('0x15b')][_0x5c90('0xb')]=function(){if(this[_0x5c90('0xda')])return;const _0x24af73=this[_0x5c90('0x55')]();this[_0x5c90('0xda')]=new Window_AutosaveConfirm(_0x24af73);},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x55')]=function(){const _0x1d0c53=this[_0x5c90('0x146')](),_0x2589dc=this[_0x5c90('0xb4')](0x1,![]),_0x536422=Graphics['width']-_0x1d0c53,_0x2c1655=Graphics[_0x5c90('0x62')]-_0x2589dc;return new Rectangle(_0x536422,_0x2c1655,_0x1d0c53,_0x2589dc);},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x5c')]=function(){return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x11c')][_0x5c90('0x1ab')];},Scene_Base['prototype'][_0x5c90('0xd0')]=function(_0x17e02a){if(!this[_0x5c90('0x5c')]())return this[_0x5c90('0x181')](_0x17e02a);if(!this[_0x5c90('0xda')])this[_0x5c90('0xb')]();const _0x55588b=this[_0x5c90('0xda')];this[_0x5c90('0xad')](_0x55588b),this[_0x5c90('0x3')](_0x55588b),_0x55588b[_0x5c90('0x49')](_0x17e02a),_0x55588b[_0x5c90('0xd2')]();const _0xa329b0=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x152')][_0x5c90('0xec')];setTimeout(this['closeAutosaveConfirmationWindow'][_0x5c90('0x169')](this,_0x17e02a),_0xa329b0);},Scene_Base[_0x5c90('0x15b')][_0x5c90('0x181')]=function(_0x194ed9){if(this[_0x5c90('0xda')])this[_0x5c90('0xda')][_0x5c90('0x6')]();},Scene_Base['prototype'][_0x5c90('0x79')]=function(){},VisuMZ['SaveCore'][_0x5c90('0x1f')]=Scene_Title[_0x5c90('0x15b')][_0x5c90('0x78')],Scene_Title['prototype'][_0x5c90('0x78')]=function(){VisuMZ[_0x5c90('0x12')][_0x5c90('0x1f')]['call'](this),this[_0x5c90('0x14d')]=![];},VisuMZ[_0x5c90('0x12')][_0x5c90('0x35')]=Scene_Title[_0x5c90('0x15b')][_0x5c90('0x18c')],Scene_Title[_0x5c90('0x15b')]['terminate']=function(){VisuMZ[_0x5c90('0x12')]['Scene_Title_terminate'][_0x5c90('0x8b')](this);if(this[_0x5c90('0x14d')])$gameSystem[_0x5c90('0x9b')]();},VisuMZ[_0x5c90('0x12')][_0x5c90('0x65')]=Scene_Title[_0x5c90('0x15b')][_0x5c90('0xb7')],Scene_Title[_0x5c90('0x15b')][_0x5c90('0xb7')]=function(){StorageManager['saveStyle']()===_0x5c90('0x133')?this['commandNewGameSaveCoreLocked']():VisuMZ[_0x5c90('0x12')][_0x5c90('0x65')][_0x5c90('0x8b')](this);},Scene_Title[_0x5c90('0x15b')][_0x5c90('0xc1')]=function(){DataManager['setupNewGame'](),$gameTemp[_0x5c90('0x16f')]=!![],this['_commandWindow'][_0x5c90('0x72')](),SceneManager[_0x5c90('0x165')](Scene_Save);},VisuMZ[_0x5c90('0x12')][_0x5c90('0x56')]=Scene_Title[_0x5c90('0x15b')][_0x5c90('0x13a')],Scene_Title[_0x5c90('0x15b')][_0x5c90('0x13a')]=function(){if(StorageManager[_0x5c90('0x10c')]()===_0x5c90('0x127')){if('ZYdDs'==='QlXnA'){function _0x541ad7(){const _0x543a6c=_0x1c91da[_0x5c90('0x2a')]();_0x5e6337[_0x5c90('0xeb')](_0x543a6c);if(_0xd9786f[_0x5c90('0x10c')]()!=='single'&&_0x543a6c<=0x0)return;this[_0x5c90('0x70')]=![],_0x516282[_0x5c90('0x1c')](_0x543a6c)[_0x5c90('0xe4')](()=>this['onSaveSuccess']())['catch'](()=>this[_0x5c90('0x100')]());}}else this[_0x5c90('0x5')]();}else{if(_0x5c90('0x175')!=='aaCpP'){function _0x4eabab(){const _0x4e42b6=this[_0x5c90('0x146')](),_0x1fddd1=this['calcWindowHeight'](0x1,![]),_0x287ece=_0x1ad70e['width']-_0x4e42b6,_0x53c855=_0x16c109[_0x5c90('0x62')]-_0x1fddd1;return new _0x398120(_0x287ece,_0x53c855,_0x4e42b6,_0x1fddd1);}}else VisuMZ[_0x5c90('0x12')][_0x5c90('0x56')][_0x5c90('0x8b')](this);}},Scene_Title[_0x5c90('0x15b')]['commandContinueSaveCoreSingle']=function(){DataManager[_0x5c90('0xdd')](0x0)[_0x5c90('0xe4')](()=>this[_0x5c90('0xf')]())[_0x5c90('0x18d')](()=>this['onSaveCoreLoadFailure']());},Scene_Title[_0x5c90('0x15b')][_0x5c90('0xf')]=function(){this[_0x5c90('0x103')][_0x5c90('0x72')](),SoundManager[_0x5c90('0x1a4')](),this[_0x5c90('0x43')](),Scene_Load[_0x5c90('0x15b')][_0x5c90('0x68')](),SceneManager[_0x5c90('0x142')](Scene_Map),this[_0x5c90('0x14d')]=!![],VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0x52')][_0x5c90('0x8b')](this);},Scene_Title[_0x5c90('0x15b')]['onSaveCoreLoadFailure']=function(){SoundManager[_0x5c90('0x7a')](),VisuMZ[_0x5c90('0x12')]['Settings'][_0x5c90('0x15a')][_0x5c90('0xc7')][_0x5c90('0x8b')](this),this['loadFailureConfirmationWindow']();},Scene_Title[_0x5c90('0x15b')][_0x5c90('0x17c')]=function(_0x488497){Scene_Base[_0x5c90('0x15b')][_0x5c90('0x17c')][_0x5c90('0x8b')](this,_0x488497),this[_0x5c90('0x103')]['open'](),this['_commandWindow'][_0x5c90('0xc8')]();},VisuMZ['SaveCore'][_0x5c90('0xa1')]=Scene_Map[_0x5c90('0x15b')][_0x5c90('0xd4')],Scene_Map[_0x5c90('0x15b')][_0x5c90('0xd4')]=function(){VisuMZ[_0x5c90('0x12')][_0x5c90('0xa1')]['call'](this);if(SceneManager[_0x5c90('0x144')](Scene_Menu))this[_0x5c90('0x99')](_0x5c90('0x18a')),this[_0x5c90('0x2f')]();else SceneManager['isPreviousScene'](Scene_Battle)&&(this[_0x5c90('0x99')]('battle'),this['requestAutosave']());},VisuMZ[_0x5c90('0x12')][_0x5c90('0xac')]=Scene_Map[_0x5c90('0x15b')][_0x5c90('0x12a')],Scene_Map[_0x5c90('0x15b')]['onTransferEnd']=function(){this[_0x5c90('0xbd')]()&&this[_0x5c90('0x99')](_0x5c90('0x135')),VisuMZ[_0x5c90('0x12')][_0x5c90('0xac')][_0x5c90('0x8b')](this);},Scene_Map[_0x5c90('0x15b')][_0x5c90('0x79')]=function(){const _0x519cfb=$gameSystem[_0x5c90('0x2a')]();console[_0x5c90('0xeb')](_0x519cfb);if(StorageManager[_0x5c90('0x10c')]()!=='single'&&_0x519cfb<=0x0)return;this[_0x5c90('0x70')]=![],DataManager[_0x5c90('0x1c')](_0x519cfb)[_0x5c90('0xe4')](()=>this[_0x5c90('0x12c')]())[_0x5c90('0x18d')](()=>this['onSaveFailure']());},Scene_Map[_0x5c90('0x15b')][_0x5c90('0x12c')]=function(){SoundManager[_0x5c90('0x1a5')](),VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')]['OnSaveSuccessJS'][_0x5c90('0x8b')](this),this[_0x5c90('0x185')](!![]);},Scene_Map[_0x5c90('0x15b')][_0x5c90('0x100')]=function(){SoundManager[_0x5c90('0x7a')](),VisuMZ[_0x5c90('0x12')]['Settings']['Save'][_0x5c90('0x1a6')][_0x5c90('0x8b')](this),this['openSaveConfirmationWindow'](![]);},Scene_Map[_0x5c90('0x15b')]['closeSaveConfirmationWindow']=function(_0x145503){Scene_Message[_0x5c90('0x15b')][_0x5c90('0x17c')][_0x5c90('0x8b')](this,_0x145503),this[_0x5c90('0x70')]=!![];},VisuMZ[_0x5c90('0x12')][_0x5c90('0x9f')]=Scene_Menu[_0x5c90('0x15b')][_0x5c90('0x14c')],Scene_Menu[_0x5c90('0x15b')][_0x5c90('0x14c')]=function(){VisuMZ[_0x5c90('0x12')][_0x5c90('0x9f')][_0x5c90('0x8b')](this);if(SceneManager[_0x5c90('0x144')](Scene_Map)){if('VFFFR'!==_0x5c90('0xc5')){function _0x264ed4(){_0x10882d=_0x204ac5[_0x5c90('0x57')](/\\P\[(\d+)\]/gi,(_0x298caf,_0x2d4def)=>_0x2d9950[_0x5c90('0x15b')][_0x5c90('0x136')](_0x53a5f8(_0x2d4def)));}}else this['determineAutosaveBypass']('callMenu'),this[_0x5c90('0x2f')]();}},VisuMZ[_0x5c90('0x12')][_0x5c90('0x120')]=Scene_Menu[_0x5c90('0x15b')]['commandSave'],Scene_Menu[_0x5c90('0x15b')][_0x5c90('0xbf')]=function(){const _0x27fba1=StorageManager['saveStyle']();switch(_0x27fba1){case _0x5c90('0x133'):case _0x5c90('0x127'):this[_0x5c90('0x160')]();break;default:VisuMZ[_0x5c90('0x12')][_0x5c90('0x120')]['call'](this);break;}},Scene_Menu[_0x5c90('0x15b')][_0x5c90('0x160')]=function(){const _0x43aef0=$gameSystem[_0x5c90('0x2a')]();$gameSystem[_0x5c90('0xcc')](_0x43aef0),$gameSystem[_0x5c90('0x41')](),DataManager[_0x5c90('0x1c')](_0x43aef0)[_0x5c90('0xe4')](()=>this['onSaveCoreSaveSuccess']())[_0x5c90('0x18d')](()=>this[_0x5c90('0x7')]());},Scene_Menu[_0x5c90('0x15b')][_0x5c90('0x141')]=function(){SoundManager[_0x5c90('0x1a5')](),VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')]['OnSaveSuccessJS'][_0x5c90('0x8b')](this),this[_0x5c90('0x185')](!![]);},Scene_Menu[_0x5c90('0x15b')][_0x5c90('0x7')]=function(){SoundManager[_0x5c90('0x7a')](),VisuMZ[_0x5c90('0x12')]['Settings'][_0x5c90('0x15a')][_0x5c90('0x1a6')]['call'](this),this['openSaveConfirmationWindow'](![]);},Scene_Menu[_0x5c90('0x15b')]['closeSaveConfirmationWindow']=function(_0x57adce){Scene_MenuBase['prototype'][_0x5c90('0x17c')][_0x5c90('0x8b')](this,_0x57adce),this[_0x5c90('0x103')][_0x5c90('0xc8')]();},Scene_Battle[_0x5c90('0x15b')][_0x5c90('0x2f')]=function(){},VisuMZ[_0x5c90('0x12')][_0x5c90('0x114')]=Scene_Options['prototype'][_0x5c90('0x69')],Scene_Options[_0x5c90('0x15b')][_0x5c90('0x69')]=function(){let _0xf18c9f=VisuMZ['SaveCore'][_0x5c90('0x114')][_0x5c90('0x8b')](this);const _0x2c32ce=VisuMZ[_0x5c90('0x12')]['Settings'];if(_0x2c32ce['AutosaveOption'][_0x5c90('0xa4')]&&_0x2c32ce[_0x5c90('0x132')][_0x5c90('0x4c')])_0xf18c9f++;return _0xf18c9f;},Scene_Save[_0x5c90('0x15b')][_0x5c90('0x12c')]=function(){SoundManager['playSave'](),VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')]['Save'][_0x5c90('0x47')][_0x5c90('0x8b')](this),this['_listWindow'][_0x5c90('0x190')](),this[_0x5c90('0x185')](!![]);},VisuMZ[_0x5c90('0x12')][_0x5c90('0x13d')]=Scene_Save[_0x5c90('0x15b')][_0x5c90('0x100')],Scene_Save['prototype']['onSaveFailure']=function(){SoundManager[_0x5c90('0x7a')](),VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0x1a6')]['call'](this),this[_0x5c90('0x185')](![]);},Scene_Save[_0x5c90('0x15b')][_0x5c90('0x17c')]=function(_0x1b9693){Scene_File[_0x5c90('0x15b')][_0x5c90('0x17c')][_0x5c90('0x8b')](this,_0x1b9693),_0x1b9693?this[_0x5c90('0x2e')]():this[_0x5c90('0x2e')]();},Scene_Save[_0x5c90('0x15b')][_0x5c90('0xe7')]=function(){$gameTemp[_0x5c90('0x16f')]=![],Scene_File[_0x5c90('0x15b')]['popScene'][_0x5c90('0x8b')](this);},VisuMZ['SaveCore'][_0x5c90('0xa7')]=Scene_Save[_0x5c90('0x15b')][_0x5c90('0x115')],Scene_Save[_0x5c90('0x15b')]['helpWindowText']=function(){if($gameTemp[_0x5c90('0x16f')]){if(_0x5c90('0x13b')==='uNfSh')return TextManager[_0x5c90('0x157')];else{function _0x46ea3a(){this[_0x5c90('0x99')](_0x5c90('0x8f')),this[_0x5c90('0x2f')]();}}}else return VisuMZ[_0x5c90('0x12')]['Scene_Save_helpWindowText'][_0x5c90('0x8b')](this);},VisuMZ['SaveCore'][_0x5c90('0x113')]=Scene_Save[_0x5c90('0x15b')][_0x5c90('0x3d')],Scene_Save[_0x5c90('0x15b')]['executeSave']=function(_0xed18ff){if($gameTemp[_0x5c90('0x16f')])this[_0x5c90('0xa')](_0xed18ff);else{if(_0x5c90('0x170')!==_0x5c90('0x170')){function _0x167dc6(){_0x20441a[_0x5c90('0x1c')](_0x404646)[_0x5c90('0xe4')](()=>this[_0x5c90('0x11')]())[_0x5c90('0x18d')](()=>this[_0x5c90('0x17e')]());}}else VisuMZ[_0x5c90('0x12')][_0x5c90('0x113')][_0x5c90('0x8b')](this,_0xed18ff);}},Scene_Save[_0x5c90('0x15b')][_0x5c90('0xa')]=function(_0x4a4098){$gameTemp[_0x5c90('0x16f')]=![],SoundManager[_0x5c90('0x1a4')](),$gameSystem[_0x5c90('0xcc')](_0x4a4098),this[_0x5c90('0x43')](),SceneManager['goto'](Scene_Map);},VisuMZ[_0x5c90('0x12')][_0x5c90('0x1a8')]=Scene_Load['prototype'][_0x5c90('0xb8')],Scene_Load[_0x5c90('0x15b')][_0x5c90('0xb8')]=function(){VisuMZ[_0x5c90('0x12')][_0x5c90('0x1a8')][_0x5c90('0x8b')](this),VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0x52')]['call'](this);},Scene_Load['prototype'][_0x5c90('0x14b')]=function(){SoundManager[_0x5c90('0x7a')](),VisuMZ['SaveCore'][_0x5c90('0x145')][_0x5c90('0x15a')][_0x5c90('0xc7')][_0x5c90('0x8b')](this),this[_0x5c90('0x3e')]();},Scene_Load[_0x5c90('0x15b')]['closeSaveConfirmationWindow']=function(_0x300502){Scene_File[_0x5c90('0x15b')][_0x5c90('0x17c')][_0x5c90('0x8b')](this,_0x300502),this[_0x5c90('0x2e')]();},ImageManager[_0x5c90('0x14e')]=ImageManager[_0x5c90('0x14e')]||0x9,ImageManager[_0x5c90('0x12f')]=ImageManager[_0x5c90('0x12f')]||0x6,Window_Base[_0x5c90('0x15b')][_0x5c90('0x13f')]=function(_0x217be4,_0x3c7547,_0x4e2cd6){const _0x58e393=ImageManager[_0x5c90('0x143')](_0x217be4),_0x512f40=_0x58e393[_0x5c90('0x105')]/ImageManager[_0x5c90('0x14e')],_0x4e49f6=_0x58e393[_0x5c90('0x62')]/ImageManager[_0x5c90('0x12f')],_0x43e919=0x0,_0x89b66e=0x0;this['contents']['blt'](_0x58e393,_0x43e919,_0x89b66e,_0x512f40,_0x4e49f6,_0x3c7547-_0x512f40/0x2,_0x4e2cd6-_0x4e49f6);},VisuMZ[_0x5c90('0x12')][_0x5c90('0xfb')]=Window_Options['prototype'][_0x5c90('0xef')],Window_Options['prototype']['addGeneralOptions']=function(){VisuMZ[_0x5c90('0x12')][_0x5c90('0xfb')]['call'](this),this[_0x5c90('0xf2')]();},Window_Options['prototype'][_0x5c90('0xf2')]=function(){if(VisuMZ[_0x5c90('0x12')]['Settings'][_0x5c90('0x132')]['AddOption']){if(_0x5c90('0x92')!==_0x5c90('0xea'))this[_0x5c90('0xcf')]();else{function _0x2c5e0d(){this[_0x5c90('0xcf')]();}}}},Window_Options['prototype'][_0x5c90('0xcf')]=function(){const _0x4ee205=TextManager[_0x5c90('0x8e')],_0x15f19b=_0x5c90('0x10b');this[_0x5c90('0x193')](_0x4ee205,_0x15f19b);};function Window_AutosaveConfirm(){this[_0x5c90('0x78')](...arguments);}Window_AutosaveConfirm[_0x5c90('0x15b')]=Object['create'](Window_Base[_0x5c90('0x15b')]),Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0x15')]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0x78')]=function(_0x17f519){this[_0x5c90('0x1e')]=0x0,Window_Base['prototype'][_0x5c90('0x78')][_0x5c90('0x8b')](this,_0x17f519),this['opacity']=0x0,this[_0x5c90('0xc0')]=0x0;},Window_AutosaveConfirm[_0x5c90('0x15b')]['drawBackground']=function(){const _0x183f9a=0x0,_0x3b193d=0x0,_0x48c576=this[_0x5c90('0x197')],_0x25ca64=this['innerHeight'],_0x4f2253=ColorManager[_0x5c90('0x18')](),_0xd329b8=ColorManager[_0x5c90('0x180')](),_0x5ede6c=_0x48c576/0x2;this['contents']['gradientFillRect'](_0x183f9a,_0x3b193d,_0x5ede6c,_0x25ca64,_0xd329b8,_0x4f2253),this[_0x5c90('0x161')][_0x5c90('0x77')](_0x183f9a+_0x5ede6c,_0x3b193d,_0x5ede6c,_0x25ca64,_0x4f2253,_0xd329b8);},Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0x49')]=function(_0x28d26e){this[_0x5c90('0xcd')]=_0x28d26e,this[_0x5c90('0x190')]();},Window_AutosaveConfirm['prototype'][_0x5c90('0x190')]=function(){this[_0x5c90('0x161')]['clear']();const _0xe5215f=this['_success']?TextManager[_0x5c90('0x172')]:TextManager[_0x5c90('0xa5')],_0x102ba5=this[_0x5c90('0x3b')](_0xe5215f)[_0x5c90('0x105')];this[_0x5c90('0x105')]=_0x102ba5+($gameSystem[_0x5c90('0x189')]()+this['itemPadding']())*0x2,this[_0x5c90('0x1a3')](),this['createContents']();const _0x2c89e3=(this['innerWidth']-_0x102ba5)/0x2;this[_0x5c90('0xd8')](),this[_0x5c90('0xfd')](_0xe5215f,_0x2c89e3,0x0,_0x102ba5);},Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0x177')]=function(){return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x11c')][_0x5c90('0x150')];},Window_AutosaveConfirm['prototype']['updatePosition']=function(){const _0x3c58cb=this[_0x5c90('0x177')]();if(_0x3c58cb[_0x5c90('0xff')](/upper/i)){if(_0x5c90('0x1')===_0x5c90('0x1'))this['y']=-0x1*$gameSystem[_0x5c90('0x189')]();else{function _0x141eeb(){this['_SaveCoreSettings']={'autosaveEnabled':_0x275efc[_0x5c90('0x12')]['Settings'][_0x5c90('0x7f')][_0x5c90('0xaf')],'saveDescription':'','savePicture':''};}}}else _0x3c58cb[_0x5c90('0xff')](/lower/i)?this['y']=Graphics[_0x5c90('0x62')]-this[_0x5c90('0x62')]+$gameSystem[_0x5c90('0x189')]():this['y']=(Graphics[_0x5c90('0x62')]-this['height'])/0x2;if(_0x3c58cb[_0x5c90('0xff')](/left/i)){if(_0x5c90('0x28')===_0x5c90('0x1aa')){function _0x40c0a5(){this[_0x5c90('0x2e')]();}}else this['x']=-0x1*$gameSystem[_0x5c90('0x189')]();}else{if(_0x3c58cb[_0x5c90('0xff')](/right/i)){if(_0x5c90('0x97')!==_0x5c90('0x97')){function _0xfa49fc(){if(!_0x75d666['svbattlers'])return this[_0x5c90('0xb1')](_0x1c6cf1,_0x5eed07,_0x2ada7d,_0x219132,_0x192204);const _0x358d00=_0x2f01eb['min'](_0x13b001['svbattlers'][_0x5c90('0x93')],_0x5c8668[_0x5c90('0x18e')]()),_0x455af6=_0x13db83[_0x5c90('0x166')];_0x42f773=_0xdf76c8+_0x331ba4[_0x5c90('0xbe')]((_0x5b9f45-_0x358d00*_0x455af6)/0x2)+_0x455af6/0x2,_0x10b5e7=_0x4a5080+_0x3d8a2d-0x8;for(const _0x19e775 of _0x5b2213['svbattlers']){this[_0x5c90('0x13f')](_0x19e775,_0x599574,_0x5a234d),_0x5dd232+=_0x455af6;}}}else this['x']=Graphics['width']-this[_0x5c90('0x105')]+$gameSystem[_0x5c90('0x189')]();}else this['x']=(Graphics[_0x5c90('0x105')]-this[_0x5c90('0x105')])/0x2;}},Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0x118')]=function(){Window_Base['prototype'][_0x5c90('0x118')]['call'](this);if(this[_0x5c90('0x1e')]!==0x0)this[_0x5c90('0xe2')]();},Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0xe2')]=function(){this[_0x5c90('0xc0')]+=this[_0x5c90('0x1e')];if(this['contentsOpacity']>=0xff||this[_0x5c90('0xc0')]<=0x0)this[_0x5c90('0x12e')](0x0);},Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0x12e')]=function(_0x282246){this['_fadeSpeed']=_0x282246;},Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0xd2')]=function(){this[_0x5c90('0x12e')](0x10);},Window_AutosaveConfirm[_0x5c90('0x15b')][_0x5c90('0x6')]=function(){this[_0x5c90('0x12e')](-0x10);},VisuMZ['SaveCore']['Window_SavefileList_setMode']=Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x4d')],Window_SavefileList[_0x5c90('0x15b')]['setMode']=function(_0x26a5f4,_0xd2a438){if(StorageManager[_0x5c90('0xdf')]()===_0x5c90('0x42'))_0xd2a438=![];if($gameTemp[_0x5c90('0x16f')])_0xd2a438=![];VisuMZ[_0x5c90('0x12')]['Window_SavefileList_setMode'][_0x5c90('0x8b')](this,_0x26a5f4,_0xd2a438);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x4f')]=function(){const _0x3270fc=VisuMZ[_0x5c90('0x12')]['Settings'][_0x5c90('0x10e')],_0x35a2cc=this[_0x5c90('0xab')]();switch(_0x35a2cc){case _0x5c90('0xf9'):return _0x3270fc[_0x5c90('0x54')];break;case'box':return _0x3270fc[_0x5c90('0x140')];break;case'large':return _0x3270fc['LargeRows'];break;default:return _0x3270fc[_0x5c90('0xd3')];break;}},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x121')]=function(){const _0x1d3288=VisuMZ[_0x5c90('0x12')]['Settings'][_0x5c90('0x10e')],_0x3deaf5=this['menuStyle']();switch(_0x3deaf5){case'vertical':return _0x1d3288[_0x5c90('0xc3')];break;case _0x5c90('0x98'):return _0x1d3288[_0x5c90('0x116')];break;case _0x5c90('0x17b'):return _0x1d3288[_0x5c90('0xca')];break;default:return _0x1d3288[_0x5c90('0xf5')];break;}},Window_SavefileList['prototype']['resetWordWrap']=function(){if(Imported[_0x5c90('0xbb')]){if(_0x5c90('0x104')===_0x5c90('0x104'))Window_Selectable[_0x5c90('0x15b')][_0x5c90('0xe1')][_0x5c90('0x8b')](this);else{function _0x1b98a8(){return'';}}}},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x10a')]=function(_0x44edfd){if(Imported[_0x5c90('0xbb')])return Window_Selectable[_0x5c90('0x15b')][_0x5c90('0x10a')]['call'](this,_0x44edfd);else{if(_0x5c90('0x129')!=='kLNmR'){function _0x6d7a01(){const _0xecffb6=_0x36250f['SaveCore'][_0x5c90('0x66')][_0x5c90('0x8b')](this);return _0xecffb6[_0x5c90('0x10b')]=this[_0x5c90('0x10b')]||_0x161678[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x132')][_0x5c90('0x1ac')],_0xecffb6[_0x5c90('0x176')]=this[_0x5c90('0x176')]||[],_0xecffb6[_0x5c90('0x63')]=this[_0x5c90('0x63')]||[],_0xecffb6;}}else return'';}},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x158')]=function(){return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x1d')];},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0xab')]=function(){return VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x134')];},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x60')]=function(_0x5d2c98){const _0x4b1908=Math['max'](0x0,this[_0x5c90('0x16d')](_0x5d2c98));this[_0x5c90('0x156')](_0x4b1908);},Window_SavefileList['prototype'][_0x5c90('0x7b')]=function(_0x4c563c){const _0x585186=this[_0x5c90('0x13e')](_0x4c563c),_0x1fa6ae=DataManager[_0x5c90('0x61')](_0x585186);if(_0x1fa6ae)_0x1fa6ae[_0x5c90('0x2a')]=_0x585186;this[_0x5c90('0x187')]=_0x585186;const _0x14d38b=this['itemRect'](_0x4c563c);this[_0x5c90('0xc')](),this[_0x5c90('0x107')](this['isEnabled'](_0x585186)),this[_0x5c90('0x24')](_0x1fa6ae,_0x14d38b);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x17f')]=function(_0x14c4e4,_0x186a4b,_0x95ff06){if(_0x14c4e4===0x0){if(_0x5c90('0x25')!=='lTQzN'){function _0x1d354c(){const _0x1bf223=0x0,_0x41dfd1=0x0,_0x41dcf7=this[_0x5c90('0x197')],_0xc659cb=this[_0x5c90('0x2')],_0xa5f2f1=_0x2fa7a1[_0x5c90('0x18')](),_0x1b56da=_0x197036[_0x5c90('0x180')](),_0x2431d5=_0x41dcf7/0x2;this[_0x5c90('0x161')][_0x5c90('0x77')](_0x1bf223,_0x41dfd1,_0x2431d5,_0xc659cb,_0x1b56da,_0xa5f2f1),this[_0x5c90('0x161')][_0x5c90('0x77')](_0x1bf223+_0x2431d5,_0x41dfd1,_0x2431d5,_0xc659cb,_0xa5f2f1,_0x1b56da);}}else this[_0x5c90('0xe3')](TextManager[_0x5c90('0x10b')],_0x186a4b,_0x95ff06,0xb4);}else this[_0x5c90('0xe3')](TextManager['file']+'\x20'+_0x14c4e4,_0x186a4b,_0x95ff06,0xb4);},Window_SavefileList['prototype'][_0x5c90('0x149')]=function(_0x2f73a6,_0x59b66d,_0x4c99d1){if(_0x2f73a6===0x0||DataManager[_0x5c90('0x15c')]()!==_0x2f73a6)return;const _0x4dc511=TextManager['latestSave'];this[_0x5c90('0xed')](ColorManager[_0x5c90('0x148')]()),this[_0x5c90('0xe3')](_0x4dc511,_0x59b66d,_0x4c99d1,0xb4);},Window_SavefileList['prototype']['drawActors']=function(_0x4a6bc2,_0x137d6f,_0x52920c,_0x45ad9f,_0x281306){if(!_0x4a6bc2['characters'])return;const _0x59f06d=this[_0x5c90('0x158')]();switch(_0x59f06d){case _0x5c90('0x8a'):this[_0x5c90('0xdc')](_0x4a6bc2,_0x137d6f,_0x52920c,_0x45ad9f,_0x281306);break;case _0x5c90('0x45'):this[_0x5c90('0xb1')](_0x4a6bc2,_0x137d6f,_0x52920c,_0x45ad9f,_0x281306);break;case _0x5c90('0x40'):this[_0x5c90('0x17')](_0x4a6bc2,_0x137d6f,_0x52920c,_0x45ad9f,_0x281306);break;default:break;}},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0xdc')]=function(_0x1c7b93,_0x34e6e1,_0x57db15,_0x30552e,_0x4d8c0d){const _0x130974=Math[_0x5c90('0x173')](_0x1c7b93['faces'][_0x5c90('0x93')],$gameParty[_0x5c90('0x18e')]()),_0xf8c205=Math[_0x5c90('0x173')](ImageManager[_0x5c90('0x126')],Math[_0x5c90('0x147')](_0x30552e/_0x130974));_0x34e6e1=_0x34e6e1+Math[_0x5c90('0xbe')]((_0x30552e-_0x130974*_0xf8c205)/0x2);for(const _0xa79d6e of _0x1c7b93[_0x5c90('0x196')]){if('uOpqP'!==_0x5c90('0x179'))this[_0x5c90('0x138')](_0xa79d6e[0x0],_0xa79d6e[0x1],_0x34e6e1,_0x57db15+0x1,_0xf8c205,_0x4d8c0d-0x2),_0x34e6e1+=_0xf8c205;else{function _0x4fe2f3(){const _0x25e3c5=_0x198d01['max'](0x0,this[_0x5c90('0x16d')](_0x21188b));this['smoothSelect'](_0x25e3c5);}}}},ImageManager[_0x5c90('0x8d')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x10e')][_0x5c90('0x2b')],ImageManager[_0x5c90('0x166')]=VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x10e')][_0x5c90('0x4a')],Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0xb1')]=function(_0x12983c,_0x30092a,_0x187d5c,_0x4065b6,_0x3dd7c0){const _0x5ab783=Math[_0x5c90('0x173')](_0x12983c[_0x5c90('0x0')][_0x5c90('0x93')],$gameParty['maxBattleMembers']()),_0x19d835=ImageManager[_0x5c90('0x8d')];_0x30092a=_0x30092a+Math[_0x5c90('0xbe')]((_0x4065b6-_0x5ab783*_0x19d835)/0x2)+_0x19d835/0x2,_0x187d5c=_0x187d5c+_0x3dd7c0-0x8;for(const _0x21e3e5 of _0x12983c[_0x5c90('0x0')]){this[_0x5c90('0x167')](_0x21e3e5[0x0],_0x21e3e5[0x1],_0x30092a,_0x187d5c),_0x30092a+=_0x19d835;}},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x17')]=function(_0x163672,_0x3175b2,_0x3ab4c8,_0x527dce,_0x3c3a81){if(!_0x163672['svbattlers'])return this[_0x5c90('0xb1')](_0x163672,_0x3175b2,_0x3ab4c8,_0x527dce,_0x3c3a81);const _0x4af6f9=Math[_0x5c90('0x173')](_0x163672[_0x5c90('0xd7')][_0x5c90('0x93')],$gameParty[_0x5c90('0x18e')]()),_0x21a108=ImageManager[_0x5c90('0x166')];_0x3175b2=_0x3175b2+Math[_0x5c90('0xbe')]((_0x527dce-_0x4af6f9*_0x21a108)/0x2)+_0x21a108/0x2,_0x3ab4c8=_0x3ab4c8+_0x3c3a81-0x8;for(const _0x334fed of _0x163672['svbattlers']){this[_0x5c90('0x13f')](_0x334fed,_0x3175b2,_0x3ab4c8),_0x3175b2+=_0x21a108;}},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x110')]=function(_0x463740,_0x32011a,_0x1a327c,_0xe05329,_0x336d38,_0x55af35){if(_0x463740==='')return;_0x32011a+=0x2,_0x1a327c+=0x2,_0xe05329-=0x4,_0x336d38-=0x4;const _0x5bccb2=ImageManager['loadPicture'](_0x463740),_0x14485a=_0x5bccb2[_0x5c90('0x105')],_0x22b99b=_0x5bccb2[_0x5c90('0x62')],_0xf0aafb=Math[_0x5c90('0x173')](_0xe05329/_0x14485a,_0x336d38/_0x22b99b,_0x55af35?0x1:0x3e8),_0x513085=Math[_0x5c90('0xc9')](_0x5bccb2[_0x5c90('0x105')]*_0xf0aafb),_0x3d8d2c=Math['ceil'](_0x5bccb2[_0x5c90('0x62')]*_0xf0aafb);this[_0x5c90('0x19b')]['blt'](_0x5bccb2,0x0,0x0,_0x14485a,_0x22b99b,_0x32011a,_0x1a327c,_0x513085,_0x3d8d2c);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x83')]=function(_0x6a9688,_0x9b59f1,_0x139734,_0x5e278b,_0x5ae0ff,_0x6d4d1a){if(_0x6a9688==='')return;_0x9b59f1+=0x2,_0x139734+=0x2,_0x5e278b-=0x4,_0x5ae0ff-=0x4;const _0x27db45=ImageManager[_0x5c90('0xbc')](_0x6a9688),_0x5573cf=_0x27db45[_0x5c90('0x105')],_0x23a2f2=_0x27db45[_0x5c90('0x62')],_0x5f15a0=Math[_0x5c90('0x173')](_0x5e278b/_0x5573cf,_0x5ae0ff/_0x23a2f2,_0x6d4d1a?0x1:0x3e8),_0x23820a=Math[_0x5c90('0xc9')](_0x27db45[_0x5c90('0x105')]*_0x5f15a0),_0x456f84=Math[_0x5c90('0xc9')](_0x27db45[_0x5c90('0x62')]*_0x5f15a0);_0x9b59f1+=(_0x5e278b-_0x23820a)/0x2,_0x139734+=(_0x5ae0ff-_0x456f84)/0x2,this['contentsBack'][_0x5c90('0x130')](_0x27db45,0x0,0x0,_0x5573cf,_0x23a2f2,_0x9b59f1,_0x139734,_0x23820a,_0x456f84);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x10d')]=function(_0x269df9,_0x18384f,_0xa5ce04,_0x3a554e,_0xfc11b5){_0x269df9[_0x5c90('0x3f')]&&(_0xfc11b5=_0xfc11b5||_0x5c90('0x5e'),this[_0x5c90('0xe3')](_0x269df9[_0x5c90('0x3f')],_0x18384f,_0xa5ce04,_0x3a554e,_0xfc11b5));},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x84')]=function(_0x7cd692,_0x21b57a,_0x47d3ec,_0x394a3e,_0x54ae00){if(_0x7cd692['timestamp']){_0x54ae00=_0x54ae00||_0x5c90('0x5e');const _0x495ffb=this[_0x5c90('0x1a2')](_0x7cd692);this[_0x5c90('0xe3')](_0x495ffb,_0x21b57a,_0x47d3ec,_0x394a3e,_0x54ae00);}},Window_SavefileList[_0x5c90('0x15b')]['getTimestamp']=function(_0x3bbf36){const _0x31ce3a=_0x3bbf36[_0x5c90('0xb3')],_0x2892ca=new Date(_0x31ce3a);let _0x50f749=_0x5c90('0xe5');_0x50f749=_0x50f749[_0x5c90('0x57')](/\[YEAR\]/gi,'%1'),_0x50f749=_0x50f749[_0x5c90('0x57')](/\[MONTH\]/gi,'%2'),_0x50f749=_0x50f749[_0x5c90('0x57')](/\[DATE\]/gi,'%3'),_0x50f749=_0x50f749[_0x5c90('0x57')](/\[HOUR\]/gi,'%4'),_0x50f749=_0x50f749['replace'](/\[MINUTE\]/gi,'%5'),_0x50f749=_0x50f749[_0x5c90('0x57')](/\[SECOND\]/gi,'%6');let _0x2c4d72=String(_0x2892ca[_0x5c90('0x75')]())[_0x5c90('0x188')]('')[_0x5c90('0x11b')]('​');return _0x50f749[_0x5c90('0x9e')](_0x2c4d72[_0x5c90('0xf8')](0x4,'0'),String(_0x2892ca[_0x5c90('0x2c')]())[_0x5c90('0xf8')](0x2,'0'),String(_0x2892ca[_0x5c90('0x31')]())[_0x5c90('0xf8')](0x2,'0'),String(_0x2892ca[_0x5c90('0x18b')]())[_0x5c90('0xf8')](0x2,'0'),String(_0x2892ca[_0x5c90('0x1a')]())['padStart'](0x2,'0'),String(_0x2892ca['getSeconds']())[_0x5c90('0xf8')](0x2,'0'));},Window_SavefileList[_0x5c90('0x15b')]['drawCurrency']=function(_0x58788f,_0x47f77e,_0x3c3159,_0x4bc1ec){if(_0x58788f[_0x5c90('0x23')]===undefined)return;const _0xa1ac53=_0x58788f[_0x5c90('0x23')],_0x3c047f=TextManager[_0x5c90('0x7d')];Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x14f')][_0x5c90('0x8b')](this,_0xa1ac53,_0x3c047f,_0x47f77e,_0x3c3159,_0x4bc1ec);},Window_SavefileList['prototype'][_0x5c90('0x10f')]=function(_0x5e6d84,_0x2feb6d,_0x54d8d8,_0x393e04,_0x2a59e5){if(_0x5e6d84[_0x5c90('0x74')]){const _0x539596=this[_0x5c90('0x3b')](_0x5e6d84[_0x5c90('0x74')])[_0x5c90('0x105')];_0x2a59e5=_0x2a59e5||_0x5c90('0x5e');if(_0x2a59e5===_0x5c90('0x122')){if(_0x5c90('0xfa')!==_0x5c90('0xfa')){function _0x483e75(){if(!_0x130cdc['optAutosave'])return;if(this[_0x5c90('0xde')]===_0x5273dc)this[_0x5c90('0x117')]();if(this['_SaveCoreSettings']['autosaveEnabled']===_0x3f85c0)this['initSaveCore']();this[_0x5c90('0xde')][_0x5c90('0x9a')]=_0x21c3fc;}}else _0x2feb6d=_0x2feb6d+_0x393e04-_0x539596;}else{if(_0x2a59e5===_0x5c90('0x34')){if(_0x5c90('0x199')!==_0x5c90('0x199')){function _0x1a05ff(){this[_0x5c90('0x12e')](-0x10);}}else _0x2feb6d=_0x2feb6d+(_0x393e04-_0x539596)/0x2;}}this[_0x5c90('0xfd')](_0x5e6d84[_0x5c90('0x74')],_0x2feb6d,_0x54d8d8,_0x393e04);}},Window_SavefileList['prototype'][_0x5c90('0x24')]=function(_0x2a857b,_0x8180){if(_0x2a857b){const _0x16aae7=ImageManager[_0x5c90('0xbc')](_0x2a857b[_0x5c90('0xf7')]||'');_0x16aae7[_0x5c90('0x198')](this[_0x5c90('0xc6')][_0x5c90('0x169')](this,_0x2a857b,_0x8180));}else this[_0x5c90('0xe')](this[_0x5c90('0x187')],_0x8180);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0xc6')]=function(_0x12cbb2,_0x131086){const _0x52746d=this[_0x5c90('0xab')]();switch(_0x52746d){case _0x5c90('0xf9'):this[_0x5c90('0x5d')](_0x12cbb2,_0x131086);break;case _0x5c90('0x98'):this['drawBoxStyleContents'](_0x12cbb2,_0x131086);break;case'large':this[_0x5c90('0x159')](_0x12cbb2,_0x131086);break;default:this['drawListStyleContents'](_0x12cbb2,_0x131086);break;}this[_0x5c90('0xc')]();const _0x131bc2=_0x12cbb2[_0x5c90('0x2a')];this[_0x5c90('0xe')](_0x131bc2,_0x131086);},Window_SavefileList[_0x5c90('0x15b')]['drawFileData']=function(_0x586cea,_0x5d7dc7){const _0x22121f=this[_0x5c90('0xab')]();switch(_0x22121f){case _0x5c90('0xf9'):this[_0x5c90('0x2d')](_0x586cea,_0x5d7dc7);break;case _0x5c90('0x98'):this[_0x5c90('0x44')](_0x586cea,_0x5d7dc7);break;case _0x5c90('0x17b'):this[_0x5c90('0x13')](_0x586cea,_0x5d7dc7);break;default:this[_0x5c90('0x50')](_0x586cea,_0x5d7dc7);break;}},Window_SavefileList['prototype'][_0x5c90('0x17a')]=function(_0x5ac35b,_0x9265c8){VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x10e')][_0x5c90('0x1ad')]['call'](this,_0x5ac35b,_0x9265c8);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x5d')]=function(_0x20a2bb,_0x1af187){VisuMZ['SaveCore'][_0x5c90('0x145')][_0x5c90('0x10e')][_0x5c90('0x86')][_0x5c90('0x8b')](this,_0x20a2bb,_0x1af187);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x14a')]=function(_0x36d44b,_0x4f7ae3){VisuMZ['SaveCore'][_0x5c90('0x145')][_0x5c90('0x10e')][_0x5c90('0x4')][_0x5c90('0x8b')](this,_0x36d44b,_0x4f7ae3);},Window_SavefileList['prototype'][_0x5c90('0x159')]=function(_0x2c0be1,_0x3b1e35){VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x10e')][_0x5c90('0xc4')]['call'](this,_0x2c0be1,_0x3b1e35);},Window_SavefileList['prototype'][_0x5c90('0x50')]=function(_0x44afbe,_0x164353){VisuMZ['SaveCore'][_0x5c90('0x145')]['SaveMenu'][_0x5c90('0xd5')][_0x5c90('0x8b')](this,_0x44afbe,_0x164353);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x2d')]=function(_0x5b7f49,_0x238c44){VisuMZ['SaveCore'][_0x5c90('0x145')][_0x5c90('0x10e')][_0x5c90('0xc2')][_0x5c90('0x8b')](this,_0x5b7f49,_0x238c44);},Window_SavefileList['prototype'][_0x5c90('0x44')]=function(_0xcc85e1,_0x346f25){VisuMZ[_0x5c90('0x12')][_0x5c90('0x145')][_0x5c90('0x10e')]['BoxFileDataJS'][_0x5c90('0x8b')](this,_0xcc85e1,_0x346f25);},Window_SavefileList[_0x5c90('0x15b')][_0x5c90('0x13')]=function(_0x5b25d8,_0x5cd7b1){VisuMZ['SaveCore'][_0x5c90('0x145')][_0x5c90('0x10e')][_0x5c90('0x182')][_0x5c90('0x8b')](this,_0x5b25d8,_0x5cd7b1);};
//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.06] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"shift","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"6","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"6","Classes:str":"4","Skills:str":"4","Items:str":"4","Weapons:str":"4","Armors:str":"4","Enemies:str":"2","States:str":"4","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default shift
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type num
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 6
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 6
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 2
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
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
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x5d06=['SbxGO','victory','openness','TqKOQ','startY','COMMONEVENT','ARRAYNUM','fontItalic','split','processCustomWait','onNewPageMessageCore','convertMessageCoreEscapeReplacements','registerCommand','updateMove','filter','Asbkd','_lastGainedItemData','setup','Scene_Options_maxCommands','stretchDimmerSprite','_textColorStack','levelUp','processPreviousColor','QEtJm','code','States','Actors','eRQtn','eUZez','Window_Help_refresh','preConvertEscapeCharacters','clearActorNameAutoColor','makeFontSmaller','AhtWF','startX','_moveTargetX','windowX','battle\x20actor','paintOpacity','prototype','TextAlign','getConfigValue','initialize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','parameters','cYDVU','bind','TextCodeActions','_commonEventId','process_VisuMZ_MessageCore_TextCodes_Action','_autoSizeCheck','selectDefault','initMessageCore','MVFtY','Game_Party_gainItem','Type','changePaintOpacity','text','HmSjc','clear','CreateAutoColorRegExpLists','max','process_VisuMZ_MessageCore_TextMacros','_moveDuration','updateOverlappingY','includes','RKANn','TextCodeReplace','convertLockColorsEscapeCharacters','Settings','min','Game_Map_setupEvents','bWglj','initTextAlignement','isHelpWindowWordWrap','addMessageCommonEvent','databaseObjectName','shift','UgLib','lfenG','Width','messageCoreTextSpeed','WjBpR','ActionJS','textCodeResult','mlqdM','processDrawCenteredPicture','update','makeFontBigger','Window_Base_initialize','\x1bBOLD[0]','resetPositionX','applyMoveEasing','DFdbw','ConvertParams','_texts','processFontChangeItalic','CPwXT','rkJxd','Window_NameBox_updatePlacement','VSYji','surprise','FXwud','isBreakShowTextCommands','resetTextColor','default','AutoColorBypassList','close','boxWidth','TOFdG','isPressed','textColor','isMessageWindowWordWrap','Wlmpw','actor','faceWidth','toUpperCase','isChoiceEnabled','NYFqn','HIDE','Armors','AGHRt','_scene','MessageWidth','KGNHk','ChoiceWindowMaxRows','textSpeed','process_VisuMZ_MessageCore_TextCodes_Replace','outlineWidth','\x1bITALIC[0]','_dimmerSprite','setMessageWindowWidth','LjSen','processFsTextCode','kPMXu','raMmn','QvTqL','xjTOo','choiceTextAlign','loadPicture','kGzro','MessageRows','</LEFT>','updateOffsetPosition','RzFnj','ZNtEz','aMNAa','Classes','AHRLP','ConvertTextAutoColorRegExpFriendly','prepareShowTextFollowups','itemRectWithPadding','NameBoxWindowOffsetY','setColorLock','Instant','JUmqX','setHelpWindowWordWrap','name','getChoiceListLineHeight','indexOf','Window_Message_newPage','General','TxyyF','JSON','updateEvents','updatePlacement','maxCols','moveTo','\x1bTEXTALIGNMENT[3]','preemptive','_wholeMoveDuration','map\x20player','lineHeight','currencyUnit','</B>','messageRows','PyGzQ','updateDimensions','<B>','returnPreservedFontSettings','_textDelayCount','afQtD','UmdXT','activate','OLhkK','</COLORLOCK>','Weapons','ARRAYEVAL','URFkB','<LEFT>','TextSpeed','easeOut','adjustShowChoiceDefault','open','Window_Base_changeTextColor','TightWrap','getMessageWindowWidth','list','processAutoSize','convertBackslashCharacters','vTfiQ','drawBackPicture','fontSize','applyDatabaseAutoColor','textSpeedStatusText','Window_Base_processEscapeCharacter','obtainEscapeString','Rows','convertBaseEscapeCharacters','_textAlignment','updateBackground','Game_Map_initialize','Enemies','\x1bi[%1]%2','quantity','maxFontSizeInLine','convertFontSettingsEscapeCharacters','Match','makeDeepCopy','_autoPosRegExp','PICTURE','getChoiceListTextAlign','MessageWindowProperties','refresh','currentExt','VisuMZ_0_CoreEngine','contents','</WORDWRAP>','map\x20actor','onChoice','setLastGainedItemData','Game_Party_initialize','_centerMessageWindow','ChoiceWindowMaxCols','MessageWindow','<BR>','contentsBack','textSizeExWordWrap','FontBiggerCap','TextJS','calcWindowHeight','convertTextAlignmentEscapeCharacters','SortObjectByKeyLength','processAutoColorWords','processTextAlignmentX','addCommand','convertVariableEscapeCharacters','setupEvents','\x1bC[%1]%2\x1bPREVCOLOR[0]','map','HelpWindow','_autoColorActorNames','onProcessCharacter','processMessageCoreEscapeActions','ztCok','commandSymbol','ezjKT','findTargetSprite','index','PREVCOLOR','isWordWrapEnabled','itemPadding','nextEventCode','WordWrap','format','clamp','_messageWindow','convertShowChoiceEscapeCodes','unshift','addMessageCoreTextSpeedCommand','xtHYO','Window_ChoiceList_windowX','drawTextEx','drawing','Gedhb','setMessageWindowRows','type','obtainGold','actorName','_spriteset','isVolumeSymbol','processAutoPosition','updateNameBoxMove','AdjustRect','STR','setRelativePosition','return\x20\x27','pEjGx','isContinuePrepareShowTextCommands','newPage','setChoiceListTextAlign','join','Window_Message_clearFlags','changeValue','defeat','ChoiceWindowTextAlign','escapeStart','width','_moveTargetY','launchMessageCommonEvent','innerWidth','match','ANY','addWrapBreakAfterPunctuation','floor','moveBy','QnjrY','updateMessageCommonEvents','easeIn','setMessageWindowWordWrap','FUNC','gblum','Window_Message_terminateMessage','Items','TextMacros','xHylH','messagePositionReset','MessageCore','_moveTargetHeight','setFaceImage','outLineColor','isSceneBattle','ceil','zPMtx','getMessageWindowRows','center','FastForwardKey','isArmor','StretchDimmedBg','CSvxF','_moveTargetWidth','wVdFN','dmDyt','boxHeight','OpwGE','isTriggered','Znjmx','textSizeExTextAlignment',')))','_relativePosition','lastGainedObjectQuantity','Window_Options_addGeneralOptions','XkpoQ','getChoiceListMaxRows','length','AutoColor','sort','innerHeight','substring','BCPQt','<WORDWRAP>','Window_ChoiceList_updatePlacement','isAutoColorAffected','changeTextColor','qcIwC','setWaitMode','isRunning','processNewLine','gainItem','convertEscapeCharacters','call','choice','</CENTER>','LineHeight','partyMemberName','numVisibleRows','toLowerCase','ZEwDC','setTextDelay','iconIndex','_autoPositionTarget','obtainEscapeParam','DISABLE','choicePositionType','_index','instantTextSpeed','messageWindowRect','setupItemChoice','version','FeZML','messageWidth','MaxCols','Undefined','isRTL','add','choices','processDrawPicture','addLoadListener','exit','trim','changeVolume','NameBoxWindowDefaultColor','<COLORLOCK>','onDatabaseLoaded','adjustShowChoiceCancel','drawItem','ahbev','startWait','textWidth','placeCancelButton','outlineColor','NKFSY','textCodeCheck','OscNW','getChoiceListMaxColumns','normalColor','JTQwz','anchor','obtainExp','_autoSizeRegexp','CreateAutoColorRegExpListEntries','ARRAYSTRUCT','yqYEJ','Center','isCommandEnabled','ejRrA','OELhu','SWITCHES','messageCoreWindowX','defaultColor','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','UrzYZ','round','Window_Message_updatePlacement','setWordWrap','fontFace','choiceRows','nJSdn','Window_Message_synchronizeNameBox','statusText','event','Window_Message_processEscapeCharacter','TextColor','_interpreter','createContents','registerActorNameAutoColorChanges','colSpacing','Window_Base_processControlCharacter','applyData','YkEKg','processPyTextCode','inBattle','TEXTALIGNMENT','createTextState','emerge','left','isColorLocked','_textDelay','resetRect','prepareShowTextCommand','_resetRect','maxLines','\x1bTEXTALIGNMENT[1]','FontChangeValue','MKdok','value','\x1bBOLD[1]','Window_Base_processAllText','Window_Options_statusText','[0]','constructor','height','start','outputHeight','ALL','members','lastGainedObjectName','qgGWb','gksvG','_moveEasingType','gSbTI','<LINE\x20BREAK>','_indent','return\x200','addExtraShowChoices','Window_Base_update','WBOEF','choiceLineHeight','Name','MaxRows','BOLD','jtYuN','ChoiceWindowLineHeight','</RIGHT>','_nameBoxWindow','blt','_wordWrap','CENTERPICTURE','outputWidth','isSceneMap','makeCommandList','\x1bWrapBreak[0]','processCommonEvent','getTextAlignment','PebGR','changeOutlineColor','maxChoiceWidth','right','calcMoveEasing','Window_NameBox_refresh','clearFlags','helpWordWrap','adjustShowChoiceExtension','setupChoices','registerResetRect','Window_Options_isVolumeSymbol','addContinuousShowTextCommands','RelativePXPY','vmwlZ','ITALIC','NameBoxWindowOffsetX','UiWfn','Game_Map_updateEvents','processColorLock','choiceCols','indent','clearCommandList','\x1bTEXTALIGNMENT[0]','WRAPBREAK','remove','_MessageCoreSettings','updateRelativePosition','synchronizeNameBox','processControlCharacter','\x1bTEXTALIGNMENT[2]','Window_Base_processNewLine','processActorNameAutoColorChanges','addGeneralOptions','updateAutoSizePosition','terminateMessage','TZTqq','isWeapon','prepareWordWrapEscapeCharacters','faceName','itemHeight','getLastGainedItemData','replace','\x1bCOLORLOCK[0]','map\x20event','Default','makeData','prepareAutoSizeEscapeCharacters','SWITCH','changeTextSpeed','pSkfh','resetWordWrap','dDEeV','\x5c%1','AddAutoColor','processPxTextCode','refreshDimmerBitmap','\x1bTEXTALIGNMENT','AddOption','\x1bCOLORLOCK[1]','processTextAlignmentChange','postConvertEscapeCharacters','mainSprite','addContinuousShowChoices','convertTextMacros','updateAutoPosition','setupNumInput','slice','parse','battle\x20enemy','currentCommand','rtl','status','ARRAYJSON','Window_Message_isTriggered','followers','Window_Options_changeVolume','OvbqB','TextColor%1','amYVS','ENABLE','AutoColorRegExp','KEyUR','TextManager_message','setChoiceListLineHeight','EVAL','process_VisuMZ_MessageCore_AutoColor','gEdcq','SEBQp','_showFast','fontBold','WAIT','_list','eXMfy','_positionType','message','convertMessageCoreEscapeActions','mainFontSize','setChoiceListMaxColumns','_colorLock','ConfigManager_applyData','battle\x20party','setChoiceListMaxRows','maxCommands','TextStr','Game_Interpreter_setupChoices','Game_System_initialize','processWrapBreak','messageWordWrap','scale','getPreservedFontSettings','EhBtj','processEscapeCharacter','processStoredAutoColorChanges','exec','description','zULZj','processAllText','addMessageCoreCommands','windowWidth','ARRAYSTR','none','Skills','</I>','Scene_Boot_onDatabaseLoaded','SHOW','COLORLOCK','Uvwqz','processFontChangeBold','map\x20party','CommonEvent','canMove','isChoiceVisible','processCharacter','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','scWaH','_cancelButton','(((','isItem','push','MtVYR','AMltZ','FontSmallerCap','\x1bITALIC[1]','_messageCommonEvents','yjqpv','itemLineRect','setTextAlignment','<RIGHT>','_messagePositionReset','clampPlacementPosition','<CENTER>','commandName','_eventId'];(function(_0x1fc857,_0x5d0671){const _0x4ddf3a=function(_0x1c84a9){while(--_0x1c84a9){_0x1fc857['push'](_0x1fc857['shift']());}};_0x4ddf3a(++_0x5d0671);}(_0x5d06,0xae));const _0x4ddf=function(_0x1fc857,_0x5d0671){_0x1fc857=_0x1fc857-0x0;let _0x4ddf3a=_0x5d06[_0x1fc857];return _0x4ddf3a;};const _0x59e1cb=_0x4ddf;var label=_0x59e1cb('0x8f'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x59e1cb('0x1e8')](function(_0x50b277){const _0x8ddd43=_0x59e1cb;return _0x50b277[_0x8ddd43('0x188')]&&_0x50b277[_0x8ddd43('0x1b3')][_0x8ddd43('0x21b')]('['+label+']');})[0x0];VisuMZ[label][_0x59e1cb('0x21f')]=VisuMZ[label][_0x59e1cb('0x21f')]||{},VisuMZ[_0x59e1cb('0x238')]=function(_0x1dd04e,_0x5559b8){const _0x410ac2=_0x59e1cb;for(const _0x371d82 in _0x5559b8){if(_0x371d82[_0x410ac2('0x7f')](/(.*):(.*)/i)){if(_0x410ac2('0x192')===_0x410ac2('0x192')){const _0x3059ee=String(RegExp['$1']),_0x359ddf=String(RegExp['$2'])[_0x410ac2('0x24e')]()[_0x410ac2('0xd7')]();let _0x435d48,_0x189a3c,_0x333f9b;switch(_0x359ddf){case'NUM':_0x435d48=_0x5559b8[_0x371d82]!==''?Number(_0x5559b8[_0x371d82]):0x0;break;case _0x410ac2('0x1e0'):_0x189a3c=_0x5559b8[_0x371d82]!==''?JSON['parse'](_0x5559b8[_0x371d82]):[],_0x435d48=_0x189a3c['map'](_0x1cf0cd=>Number(_0x1cf0cd));break;case _0x410ac2('0x195'):_0x435d48=_0x5559b8[_0x371d82]!==''?eval(_0x5559b8[_0x371d82]):null;break;case _0x410ac2('0xd'):_0x189a3c=_0x5559b8[_0x371d82]!==''?JSON[_0x410ac2('0x184')](_0x5559b8[_0x371d82]):[],_0x435d48=_0x189a3c[_0x410ac2('0x4b')](_0x135e90=>eval(_0x135e90));break;case _0x410ac2('0x27d'):_0x435d48=_0x5559b8[_0x371d82]!==''?JSON[_0x410ac2('0x184')](_0x5559b8[_0x371d82]):'';break;case _0x410ac2('0x189'):_0x189a3c=_0x5559b8[_0x371d82]!==''?JSON['parse'](_0x5559b8[_0x371d82]):[],_0x435d48=_0x189a3c[_0x410ac2('0x4b')](_0x35975f=>JSON['parse'](_0x35975f));break;case _0x410ac2('0x88'):_0x435d48=_0x5559b8[_0x371d82]!==''?new Function(JSON[_0x410ac2('0x184')](_0x5559b8[_0x371d82])):new Function(_0x410ac2('0x12b'));break;case'ARRAYFUNC':_0x189a3c=_0x5559b8[_0x371d82]!==''?JSON[_0x410ac2('0x184')](_0x5559b8[_0x371d82]):[],_0x435d48=_0x189a3c[_0x410ac2('0x4b')](_0x541e52=>new Function(JSON['parse'](_0x541e52)));break;case _0x410ac2('0x6e'):_0x435d48=_0x5559b8[_0x371d82]!==''?String(_0x5559b8[_0x371d82]):'';break;case _0x410ac2('0x1b8'):_0x189a3c=_0x5559b8[_0x371d82]!==''?JSON[_0x410ac2('0x184')](_0x5559b8[_0x371d82]):[],_0x435d48=_0x189a3c[_0x410ac2('0x4b')](_0x178d85=>String(_0x178d85));break;case'STRUCT':_0x333f9b=_0x5559b8[_0x371d82]!==''?JSON[_0x410ac2('0x184')](_0x5559b8[_0x371d82]):{},_0x1dd04e[_0x3059ee]={},VisuMZ['ConvertParams'](_0x1dd04e[_0x3059ee],_0x333f9b);continue;case _0x410ac2('0xed'):_0x189a3c=_0x5559b8[_0x371d82]!==''?JSON[_0x410ac2('0x184')](_0x5559b8[_0x371d82]):[],_0x435d48=_0x189a3c[_0x410ac2('0x4b')](_0x4019d6=>VisuMZ[_0x410ac2('0x238')]({},JSON['parse'](_0x4019d6)));break;default:continue;}_0x1dd04e[_0x3059ee]=_0x435d48;}else{function _0x11030a(){const _0x15e396=_0x410ac2;if(this[_0x15e396('0x15a')]===_0x453134)this[_0x15e396('0x20e')]();if(this['_MessageCoreSettings']['choiceRows']===_0x2325b1)this[_0x15e396('0x20e')]();this[_0x15e396('0x15a')]['choiceRows']=_0x486edc||0x1;}}}}return _0x1dd04e;},(_0x3a244e=>{const _0x19783a=_0x59e1cb,_0x159ba5=_0x3a244e[_0x19783a('0x277')];for(const _0x564bf0 of dependencies){if(!Imported[_0x564bf0]){if('zPMtx'===_0x19783a('0x95')){alert(_0x19783a('0xf6')[_0x19783a('0x5a')](_0x159ba5,_0x564bf0)),SceneManager[_0x19783a('0xd6')]();break;}else{function _0x3925dc(){const _0x10fae0=_0x19783a;if(_0x152a36[_0x10fae0('0x206')][0x2]<0x0)return;const _0xc382=_0x4da45b[_0x10fae0('0x206')][0x2]+_0x4a3642;this[_0x10fae0('0x19c')][_0x28bf7a][_0x10fae0('0x206')][0x2]=_0xc382;}}}}const _0x35e8ef=_0x3a244e[_0x19783a('0x1b3')];if(_0x35e8ef[_0x19783a('0x7f')](/\[Version[ ](.*?)\]/i)){const _0x2b7487=Number(RegExp['$1']);if(_0x2b7487!==VisuMZ[label][_0x19783a('0xcc')]){if(_0x19783a('0x1e9')===_0x19783a('0x222')){function _0x3c010b(){const _0x8a64b3=_0x19783a;return _0x20f780[_0x8a64b3('0x54')]+=_0x51830f[0x0][_0x8a64b3('0xaa')],_0x36c17d(_0x130aa7[0x0][_0x8a64b3('0x183')](0x1,_0x152bd5[0x0][_0x8a64b3('0xaa')]-0x1));}}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x159ba5,_0x2b7487)),SceneManager[_0x19783a('0xd6')]();}}if(_0x35e8ef[_0x19783a('0x7f')](/\[Tier[ ](\d+)\]/i)){if(_0x19783a('0x109')!==_0x19783a('0x133')){const _0x3f0b78=Number(RegExp['$1']);if(_0x3f0b78<tier){if(_0x19783a('0x229')===_0x19783a('0xa8')){function _0x27f088(){const _0x3eba21=_0x19783a,_0x32961d=_0x1cf723(_0x4e3e63['$1']);_0x32961d<_0x2f3882?(_0x8e112(_0x3eba21('0x205')[_0x3eba21('0x5a')](_0x225234,_0x32961d,_0xd89857)),_0x55f0e5[_0x3eba21('0xd6')]()):_0x1d8a57=_0x8260a4[_0x3eba21('0x217')](_0x32961d,_0x5e77e6);}}else alert(_0x19783a('0x205')[_0x19783a('0x5a')](_0x159ba5,_0x3f0b78,tier)),SceneManager['exit']();}else{if('Znjmx'!==_0x19783a('0xa2')){function _0x246853(){const _0x520eff=_0x19783a;_0x2f8074[_0x520eff('0x8f')][_0x520eff('0xa7')][_0x520eff('0xba')](this),this['addMessageCoreCommands']();}}else tier=Math['max'](_0x3f0b78,tier);}}else{function _0x381cc6(){const _0x4bce54=_0x19783a;if(this[_0x4bce54('0x1ea')]===_0x189e08)this[_0x4bce54('0x20e')]();if(!_0x29efb2)return;if(_0x56937e[_0x4bce54('0x1ca')](_0x8b6af2))this[_0x4bce54('0x1ea')][_0x4bce54('0x66')]=0x0;else{if(_0x5343ba[_0x4bce54('0x165')](_0x3fb132))this[_0x4bce54('0x1ea')][_0x4bce54('0x66')]=0x1;else _0x1dc409['isArmor'](_0x27e0ba)&&(this[_0x4bce54('0x1ea')][_0x4bce54('0x66')]=0x2);}this[_0x4bce54('0x1ea')]['id']=_0x3aee0d['id'],this[_0x4bce54('0x1ea')][_0x4bce54('0x28')]=_0x37c915;}}}VisuMZ[_0x19783a('0x238')](VisuMZ[label][_0x19783a('0x21f')],_0x3a244e['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x59e1cb('0x277')],'ChoiceWindowProperties',_0x577d2d=>{const _0x35bb2a=_0x59e1cb;VisuMZ[_0x35bb2a('0x238')](_0x577d2d,_0x577d2d);const _0x4f641b=_0x577d2d[_0x35bb2a('0xbd')]||$gameSystem[_0x35bb2a('0x278')]()||0x1,_0x289b23=_0x577d2d[_0x35bb2a('0x131')]||$gameSystem[_0x35bb2a('0xa9')]()||0x1,_0x3110de=_0x577d2d['MaxCols']||$gameSystem[_0x35bb2a('0xe6')]()||0x1,_0x1fc091=_0x577d2d[_0x35bb2a('0x202')][_0x35bb2a('0xc0')]()||_0x35bb2a('0x243');$gameSystem['setChoiceListLineHeight'](_0x4f641b),$gameSystem[_0x35bb2a('0x1a6')](_0x289b23),$gameSystem[_0x35bb2a('0x1a2')](_0x3110de),$gameSystem[_0x35bb2a('0x74')](_0x1fc091);}),PluginManager[_0x59e1cb('0x1e6')](pluginData[_0x59e1cb('0x277')],_0x59e1cb('0x30'),_0x506810=>{const _0x33597a=_0x59e1cb;VisuMZ[_0x33597a('0x238')](_0x506810,_0x506810);const _0x2fb9a9=_0x506810[_0x33597a('0x21')]||$gameSystem[_0x33597a('0x96')]()||0x1,_0x499f75=_0x506810[_0x33597a('0x22a')]||$gameSystem[_0x33597a('0x16')]()||0x1;$gameTemp[_0x33597a('0x3a')]=_0x506810[_0x33597a('0xef')]||![];const _0x345b71=_0x506810[_0x33597a('0x59')][_0x33597a('0xc0')]();$gameSystem[_0x33597a('0x65')](_0x2fb9a9),$gameSystem['setMessageWindowWidth'](_0x499f75);if(['true','false'][_0x33597a('0x21b')](_0x345b71)){if(_0x33597a('0x23e')!==_0x33597a('0xe3'))$gameSystem[_0x33597a('0x87')](eval(_0x345b71));else{function _0x2d43c1(){const _0x989511=_0x33597a;this[_0x989511('0x27f')](),this[_0x989511('0xe1')]();}}}const _0x27ce97=SceneManager[_0x33597a('0x254')][_0x33597a('0x5c')];if(_0x27ce97){if(_0x33597a('0x52')===_0x33597a('0x52'))_0x27ce97[_0x33597a('0x173')](),_0x27ce97[_0x33597a('0x3')](),_0x27ce97[_0x33597a('0x104')]();else{function _0x5560a1(){const _0x2fe02c=_0x33597a;if(this[_0x2fe02c('0x1c4')](_0x105e9e)){const _0x364fea=_0x31d591,_0x2a581c=this[_0x2fe02c('0x24f')](_0x2032f3);this[_0x2fe02c('0x47')](_0x364fea,_0x2fe02c('0xbb'),_0x2a581c,_0x27f081);}_0x5e0846++;}}}}),VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x1bc')]=Scene_Boot[_0x59e1cb('0x201')][_0x59e1cb('0xdb')],Scene_Boot[_0x59e1cb('0x201')][_0x59e1cb('0xdb')]=function(){const _0x3f89f3=_0x59e1cb;VisuMZ[_0x3f89f3('0x8f')][_0x3f89f3('0x1bc')][_0x3f89f3('0xba')](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x3f89f3('0x259')](),this[_0x3f89f3('0x218')](),this['process_VisuMZ_MessageCore_AutoColor']();},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x44')]=function(_0x4181cc){const _0x1c5183=_0x59e1cb,_0x29cf15=VisuMZ['MessageCore'][_0x1c5183('0x21f')][_0x4181cc];_0x29cf15[_0x1c5183('0xac')]((_0x3c6048,_0x229658)=>{const _0xe06e15=_0x1c5183;if(!_0x3c6048||!_0x229658)return-0x1;return _0x229658[_0xe06e15('0x2b')][_0xe06e15('0xaa')]-_0x3c6048[_0xe06e15('0x2b')]['length'];});},Scene_Boot[_0x59e1cb('0x201')][_0x59e1cb('0x20b')]=function(){const _0x5bdd7b=_0x59e1cb;VisuMZ[_0x5bdd7b('0x8f')][_0x5bdd7b('0x44')](_0x5bdd7b('0x209'));for(const _0x14b3e0 of VisuMZ[_0x5bdd7b('0x8f')][_0x5bdd7b('0x21f')]['TextCodeActions']){_0x14b3e0['Match']=_0x14b3e0[_0x5bdd7b('0x2b')][_0x5bdd7b('0x24e')](),_0x14b3e0[_0x5bdd7b('0xe4')]=new RegExp('\x1b'+_0x14b3e0[_0x5bdd7b('0x2b')],'gi'),_0x14b3e0['textCodeResult']='\x1b'+_0x14b3e0[_0x5bdd7b('0x2b')];if(_0x14b3e0['Type']==='')_0x14b3e0[_0x5bdd7b('0x22e')]+=_0x5bdd7b('0x11d');}},Scene_Boot[_0x59e1cb('0x201')][_0x59e1cb('0x259')]=function(){const _0x24ad8e=_0x59e1cb;VisuMZ[_0x24ad8e('0x8f')][_0x24ad8e('0x44')](_0x24ad8e('0x21d'));for(const _0x56d261 of VisuMZ[_0x24ad8e('0x8f')][_0x24ad8e('0x21f')][_0x24ad8e('0x21d')]){if(_0x24ad8e('0xe5')!=='LptQe'){_0x56d261['textCodeCheck']=new RegExp('\x1b'+_0x56d261[_0x24ad8e('0x2b')]+_0x56d261[_0x24ad8e('0x211')],'gi');if(_0x56d261[_0x24ad8e('0x1a8')]!==''&&_0x56d261['TextStr']!=='Undefined'){if(_0x24ad8e('0x1f5')==='NtUqU'){function _0x3b0627(){const _0x4515a3=_0x24ad8e;if(this[_0x4515a3('0x15a')]===_0x45e142)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x4515a3('0x12f')]===_0x3cf383)this[_0x4515a3('0x20e')]();this['_MessageCoreSettings']['choiceLineHeight']=_0x5af3e8||0x1;}}else _0x56d261['textCodeResult']=new Function(_0x24ad8e('0x70')+_0x56d261[_0x24ad8e('0x1a8')][_0x24ad8e('0x16a')](/\\/g,'\x1b')+'\x27');}else _0x56d261[_0x24ad8e('0x22e')]=_0x56d261[_0x24ad8e('0x41')];}else{function _0x212c5e(){const _0x44c5e7=_0x24ad8e;_0x28898b['MessageCore'][_0x44c5e7('0x1f')][_0x44c5e7('0xba')](this,_0x347ced,_0x1d1756);}}}},Scene_Boot['prototype'][_0x59e1cb('0x218')]=function(){const _0xe192ae=_0x59e1cb;for(const _0x41aaed of VisuMZ['MessageCore'][_0xe192ae('0x21f')][_0xe192ae('0x8c')]){if(_0xe192ae('0x261')===_0xe192ae('0x261')){_0x41aaed[_0xe192ae('0xe4')]=new RegExp('\x5c['+_0x41aaed[_0xe192ae('0x2b')]+'\x5c]','gi');if(_0x41aaed[_0xe192ae('0x1a8')]!==''&&_0x41aaed[_0xe192ae('0x1a8')]!=='Undefined')_0x41aaed[_0xe192ae('0x22e')]=new Function(_0xe192ae('0x70')+_0x41aaed[_0xe192ae('0x1a8')][_0xe192ae('0x16a')](/\\/g,'\x1b')+'\x27');else{if(_0xe192ae('0x18d')!=='eTtwl')_0x41aaed[_0xe192ae('0x22e')]=_0x41aaed[_0xe192ae('0x41')];else{function _0x449cb1(){return![];}}}}else{function _0x10dd9e(){const _0x17306e=_0xe192ae,_0x4f0dcc=_0x2e484c['messageCoreTextSpeed'],_0x581120=_0x17306e('0x258');this['addCommand'](_0x4f0dcc,_0x581120);}}}},Scene_Boot[_0x59e1cb('0x201')][_0x59e1cb('0x196')]=function(){const _0x422e8b=_0x59e1cb,_0xb5f699=VisuMZ[_0x422e8b('0x8f')][_0x422e8b('0x21f')][_0x422e8b('0xab')];VisuMZ[_0x422e8b('0x8f')][_0x422e8b('0x176')]($dataClasses,_0xb5f699[_0x422e8b('0x26d')]),VisuMZ[_0x422e8b('0x8f')]['AddAutoColor']($dataSkills,_0xb5f699[_0x422e8b('0x1ba')]),VisuMZ[_0x422e8b('0x8f')][_0x422e8b('0x176')]($dataItems,_0xb5f699[_0x422e8b('0x8b')]),VisuMZ['MessageCore']['AddAutoColor']($dataWeapons,_0xb5f699[_0x422e8b('0xc')]),VisuMZ[_0x422e8b('0x8f')]['AddAutoColor']($dataArmors,_0xb5f699[_0x422e8b('0x252')]),VisuMZ[_0x422e8b('0x8f')][_0x422e8b('0x176')]($dataEnemies,_0xb5f699['Enemies']),VisuMZ[_0x422e8b('0x8f')][_0x422e8b('0x176')]($dataStates,_0xb5f699[_0x422e8b('0x1f3')]),VisuMZ[_0x422e8b('0x8f')][_0x422e8b('0x216')]();},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x244')]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x59e1cb('0x4'),_0x59e1cb('0x0'),'<I>',_0x59e1cb('0x1bb'),_0x59e1cb('0xf'),_0x59e1cb('0x268'),_0x59e1cb('0x1d7'),_0x59e1cb('0xbc'),_0x59e1cb('0x1d4'),_0x59e1cb('0x135'),_0x59e1cb('0xda'),_0x59e1cb('0xb'),_0x59e1cb('0x1c9'),_0x59e1cb('0xa4'),_0x59e1cb('0xb0'),_0x59e1cb('0x35'),_0x59e1cb('0x3d'),_0x59e1cb('0x129'),_0x59e1cb('0x2e'),_0x59e1cb('0x139'),_0x59e1cb('0x1df'),_0x59e1cb('0x19b'),_0x59e1cb('0x1bd'),_0x59e1cb('0x251'),_0x59e1cb('0x190'),_0x59e1cb('0xc6'),_0x59e1cb('0x170'),_0x59e1cb('0xf3'),_0x59e1cb('0x122'),_0x59e1cb('0x80')],VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x176')]=function(_0xccca4a,_0x226813){const _0x2fe782=_0x59e1cb;if(_0x226813<=0x0)return;const _0x13edaf=VisuMZ[_0x2fe782('0x8f')][_0x2fe782('0x21f')][_0x2fe782('0xab')][_0x2fe782('0x102')+_0x226813],_0x4fe528=JsonEx['makeDeepCopy'](_0xccca4a);for(const _0x300558 of _0x4fe528){if(!_0x300558)continue;let _0x12bc26=_0x300558['name']['trim']();if(VisuMZ[_0x2fe782('0x8f')][_0x2fe782('0x244')][_0x2fe782('0x21b')](_0x12bc26['toUpperCase']()))continue;_0x12bc26=_0x12bc26[_0x2fe782('0x16a')](/\\I\[(\d+)\]/gi,''),_0x12bc26=_0x12bc26['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x12bc26['length']<=0x0)continue;if(_0x12bc26[_0x2fe782('0x7f')](/-----/i))continue;_0x13edaf['push'](_0x12bc26);}},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x216')]=function(){const _0x315277=_0x59e1cb;VisuMZ[_0x315277('0x8f')][_0x315277('0x191')]=[];for(let _0x280a39=0x1;_0x280a39<=0x1f;_0x280a39++){if(_0x315277('0xe')===_0x315277('0x1f6')){function _0x4dec0a(){const _0x3e0953=_0x315277,_0xc26b99=this[_0x3e0953('0x51')](_0x3aad6a);if(_0xc26b99===_0x3e0953('0x258'))return this[_0x3e0953('0x1e')]();return _0x3684c0[_0x3e0953('0x8f')][_0x3e0953('0x11c')]['call'](this,_0x32dd2f);}}else{const _0x45f494=_0x315277('0x18e')[_0x315277('0x5a')](_0x280a39),_0xfe65ca=VisuMZ[_0x315277('0x8f')][_0x315277('0x21f')][_0x315277('0xab')][_0x45f494];_0xfe65ca['sort']((_0x3406c4,_0x4588fb)=>{const _0x463fe9=_0x315277;if(_0x463fe9('0x214')!==_0x463fe9('0x214')){function _0x4847c5(){const _0x7cf907=_0x463fe9,_0x4ce7a2=_0x41df6f[_0x7cf907('0x94')](_0x2e17fd[_0x7cf907('0xd3')]()[_0x7cf907('0xaa')]/this[_0x7cf907('0x280')]());return _0x796de2[_0x7cf907('0x220')](_0x4ce7a2,this[_0x7cf907('0x115')]());}}else{if(!_0x3406c4||!_0x4588fb)return-0x1;return _0x4588fb['length']-_0x3406c4[_0x463fe9('0xaa')];}}),this[_0x315277('0xec')](_0xfe65ca,_0x280a39);}}},VisuMZ['MessageCore'][_0x59e1cb('0xec')]=function(_0x594105,_0x4ca8c5){const _0x383f85=_0x59e1cb;for(const _0x23b25b of _0x594105){if(_0x23b25b[_0x383f85('0xaa')]<=0x0)continue;let _0x5854a8=VisuMZ[_0x383f85('0x8f')][_0x383f85('0x26f')](_0x23b25b);if(_0x23b25b[_0x383f85('0x7f')](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x34dda2=new RegExp(_0x5854a8,'i');else var _0x34dda2=new RegExp('\x5cb'+_0x5854a8+'\x5cb','g');VisuMZ[_0x383f85('0x8f')][_0x383f85('0x191')][_0x383f85('0x1cb')]([_0x34dda2,_0x383f85('0x4a')[_0x383f85('0x5a')](_0x4ca8c5,_0x23b25b)]);}},VisuMZ[_0x59e1cb('0x8f')]['ConvertTextAutoColorRegExpFriendly']=function(_0x2d0da8){const _0x7d7e20=_0x59e1cb;return _0x2d0da8=_0x2d0da8[_0x7d7e20('0x16a')](/(\W)/gi,(_0x25d3ab,_0x4ee889)=>_0x7d7e20('0x175')[_0x7d7e20('0x5a')](_0x4ee889)),_0x2d0da8;},SceneManager[_0x59e1cb('0x93')]=function(){const _0x4f97b5=_0x59e1cb;return this['_scene']&&this[_0x4f97b5('0x254')][_0x4f97b5('0x11e')]===Scene_Battle;},SceneManager[_0x59e1cb('0x13b')]=function(){const _0x43fb48=_0x59e1cb;return this[_0x43fb48('0x254')]&&this[_0x43fb48('0x254')][_0x43fb48('0x11e')]===Scene_Map;},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x193')]=TextManager[_0x59e1cb('0x19f')],TextManager[_0x59e1cb('0x19f')]=function(_0x39cd49){const _0x4ef5e0=_0x59e1cb,_0x5aa6de=[_0x4ef5e0('0x1ef'),_0x4ef5e0('0x10e'),_0x4ef5e0('0x283'),_0x4ef5e0('0x23f'),_0x4ef5e0('0x1db'),_0x4ef5e0('0x78'),_0x4ef5e0('0x7a'),_0x4ef5e0('0xea'),_0x4ef5e0('0x67'),'obtainItem'];let _0x59682a=VisuMZ[_0x4ef5e0('0x8f')][_0x4ef5e0('0x193')][_0x4ef5e0('0xba')](this,_0x39cd49);return _0x5aa6de['includes'](_0x39cd49)&&(_0x59682a=_0x4ef5e0('0x35')+_0x59682a),_0x59682a;},ConfigManager[_0x59e1cb('0x258')]=VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x21f')][_0x59e1cb('0x10')][_0x59e1cb('0x16d')],VisuMZ[_0x59e1cb('0x8f')]['ConfigManager_makeData']=ConfigManager['makeData'],ConfigManager[_0x59e1cb('0x16e')]=function(){const _0x4f539c=_0x59e1cb,_0x46ca3d=VisuMZ[_0x4f539c('0x8f')]['ConfigManager_makeData']['call'](this);return _0x46ca3d[_0x4f539c('0x258')]=this[_0x4f539c('0x258')],_0x46ca3d;},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x1a4')]=ConfigManager[_0x59e1cb('0x108')],ConfigManager[_0x59e1cb('0x108')]=function(_0x1bb1dd){const _0x124efc=_0x59e1cb;VisuMZ[_0x124efc('0x8f')][_0x124efc('0x1a4')][_0x124efc('0xba')](this,_0x1bb1dd),_0x124efc('0x258')in _0x1bb1dd?this['textSpeed']=Number(_0x1bb1dd[_0x124efc('0x258')])[_0x124efc('0x5b')](0x1,0xb):this[_0x124efc('0x258')]=VisuMZ[_0x124efc('0x8f')][_0x124efc('0x21f')][_0x124efc('0x10')]['Default'];},TextManager[_0x59e1cb('0x22b')]=VisuMZ['MessageCore']['Settings'][_0x59e1cb('0x10')][_0x59e1cb('0x130')],TextManager[_0x59e1cb('0xc9')]=VisuMZ['MessageCore'][_0x59e1cb('0x21f')][_0x59e1cb('0x10')][_0x59e1cb('0x274')],VisuMZ['MessageCore'][_0x59e1cb('0x1aa')]=Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x204')],Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x204')]=function(){const _0x1b7b83=_0x59e1cb;VisuMZ[_0x1b7b83('0x8f')][_0x1b7b83('0x1aa')][_0x1b7b83('0xba')](this),this[_0x1b7b83('0x20e')]();},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x20e')]=function(){const _0x1e98cc=_0x59e1cb,_0x1e4eac=VisuMZ[_0x1e98cc('0x8f')][_0x1e98cc('0x21f')][_0x1e98cc('0x27b')],_0x2339a6=VisuMZ[_0x1e98cc('0x8f')][_0x1e98cc('0x21f')][_0x1e98cc('0x59')];this[_0x1e98cc('0x15a')]={'messageRows':_0x1e4eac[_0x1e98cc('0x267')],'messageWidth':_0x1e4eac[_0x1e98cc('0x255')],'messageWordWrap':_0x2339a6[_0x1e98cc('0x3c')],'helpWordWrap':_0x2339a6['HelpWindow'],'choiceLineHeight':_0x1e4eac[_0x1e98cc('0x134')],'choiceRows':_0x1e4eac[_0x1e98cc('0x257')],'choiceCols':_0x1e4eac[_0x1e98cc('0x3b')],'choiceTextAlign':_0x1e4eac[_0x1e98cc('0x79')]};},Game_System['prototype'][_0x59e1cb('0x96')]=function(){const _0x3acd1c=_0x59e1cb;if(this[_0x3acd1c('0x15a')]===undefined)this[_0x3acd1c('0x20e')]();if(this[_0x3acd1c('0x15a')][_0x3acd1c('0x1')]===undefined)this[_0x3acd1c('0x20e')]();return this[_0x3acd1c('0x15a')][_0x3acd1c('0x1')];},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x65')]=function(_0x2d231a){const _0x52339e=_0x59e1cb;if(this['_MessageCoreSettings']===undefined)this[_0x52339e('0x20e')]();if(this[_0x52339e('0x15a')][_0x52339e('0x1')]===undefined)this[_0x52339e('0x20e')]();this[_0x52339e('0x15a')][_0x52339e('0x1')]=_0x2d231a||0x1;},Game_System['prototype'][_0x59e1cb('0x16')]=function(){const _0x48b146=_0x59e1cb;if(this[_0x48b146('0x15a')]===undefined)this[_0x48b146('0x20e')]();if(this[_0x48b146('0x15a')][_0x48b146('0xce')]===undefined)this[_0x48b146('0x20e')]();return this[_0x48b146('0x15a')][_0x48b146('0xce')];},Game_System['prototype'][_0x59e1cb('0x25d')]=function(_0x4c0a31){const _0xa296bd=_0x59e1cb;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0xa296bd('0x15a')][_0xa296bd('0xce')]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0xa296bd('0xce')]=_0x4c0a31||0x1;},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x24a')]=function(){const _0x3a262d=_0x59e1cb;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x3a262d('0x15a')][_0x3a262d('0x1ac')]===undefined)this[_0x3a262d('0x20e')]();return this['_MessageCoreSettings'][_0x3a262d('0x1ac')];},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x87')]=function(_0x12848c){const _0x4d80d3=_0x59e1cb;if(this[_0x4d80d3('0x15a')]===undefined)this[_0x4d80d3('0x20e')]();if(this[_0x4d80d3('0x15a')][_0x4d80d3('0x1ac')]===undefined)this[_0x4d80d3('0x20e')]();this[_0x4d80d3('0x15a')][_0x4d80d3('0x1ac')]=_0x12848c;},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x224')]=function(){const _0x2e0673=_0x59e1cb;if(this[_0x2e0673('0x15a')]===undefined)this[_0x2e0673('0x20e')]();if(this[_0x2e0673('0x15a')][_0x2e0673('0x147')]===undefined)this[_0x2e0673('0x20e')]();return this['_MessageCoreSettings'][_0x2e0673('0x147')];},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x276')]=function(_0x382a04){const _0x520682=_0x59e1cb;if(this[_0x520682('0x15a')]===undefined)this[_0x520682('0x20e')]();if(this[_0x520682('0x15a')]['helpWordWrap']===undefined)this[_0x520682('0x20e')]();this[_0x520682('0x15a')][_0x520682('0x147')]=_0x382a04;},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x278')]=function(){const _0x1dd362=_0x59e1cb;if(this[_0x1dd362('0x15a')]===undefined)this[_0x1dd362('0x20e')]();if(this[_0x1dd362('0x15a')]['choiceLineHeight']===undefined)this[_0x1dd362('0x20e')]();return this[_0x1dd362('0x15a')]['choiceLineHeight'];},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x194')]=function(_0x12fb80){const _0xdd533c=_0x59e1cb;if(this[_0xdd533c('0x15a')]===undefined)this[_0xdd533c('0x20e')]();if(this[_0xdd533c('0x15a')][_0xdd533c('0x12f')]===undefined)this[_0xdd533c('0x20e')]();this[_0xdd533c('0x15a')]['choiceLineHeight']=_0x12fb80||0x1;},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0xa9')]=function(){const _0xdea3b3=_0x59e1cb;if(this[_0xdea3b3('0x15a')]===undefined)this[_0xdea3b3('0x20e')]();if(this[_0xdea3b3('0x15a')][_0xdea3b3('0xfc')]===undefined)this[_0xdea3b3('0x20e')]();return this[_0xdea3b3('0x15a')][_0xdea3b3('0xfc')];},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x1a6')]=function(_0x3a4077){const _0x3a6e02=_0x59e1cb;if(this[_0x3a6e02('0x15a')]===undefined)this[_0x3a6e02('0x20e')]();if(this[_0x3a6e02('0x15a')][_0x3a6e02('0xfc')]===undefined)this[_0x3a6e02('0x20e')]();this[_0x3a6e02('0x15a')][_0x3a6e02('0xfc')]=_0x3a4077||0x1;},Game_System[_0x59e1cb('0x201')]['getChoiceListMaxColumns']=function(){const _0x5a2eef=_0x59e1cb;if(this[_0x5a2eef('0x15a')]===undefined)this[_0x5a2eef('0x20e')]();if(this[_0x5a2eef('0x15a')][_0x5a2eef('0x154')]===undefined)this['initMessageCore']();return this[_0x5a2eef('0x15a')][_0x5a2eef('0x154')];},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x1a2')]=function(_0x8730f8){const _0x4f1cee=_0x59e1cb;if(this['_MessageCoreSettings']===undefined)this[_0x4f1cee('0x20e')]();if(this['_MessageCoreSettings'][_0x4f1cee('0x154')]===undefined)this['initMessageCore']();this[_0x4f1cee('0x15a')]['choiceCols']=_0x8730f8||0x1;},Game_System[_0x59e1cb('0x201')]['getChoiceListTextAlign']=function(){const _0xd0645=_0x59e1cb;if(this[_0xd0645('0x15a')]===undefined)this[_0xd0645('0x20e')]();if(this[_0xd0645('0x15a')][_0xd0645('0x264')]===undefined)this[_0xd0645('0x20e')]();return this[_0xd0645('0x15a')][_0xd0645('0x264')];},Game_System[_0x59e1cb('0x201')][_0x59e1cb('0x74')]=function(_0x29ebfe){const _0x458cc6=_0x59e1cb;if(this[_0x458cc6('0x15a')]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x458cc6('0x264')]===undefined)this[_0x458cc6('0x20e')]();this[_0x458cc6('0x15a')][_0x458cc6('0x264')]=_0x29ebfe[_0x458cc6('0xc0')]();},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x39')]=Game_Party[_0x59e1cb('0x201')][_0x59e1cb('0x204')],Game_Party[_0x59e1cb('0x201')][_0x59e1cb('0x204')]=function(){const _0xb7aea5=_0x59e1cb;VisuMZ[_0xb7aea5('0x8f')][_0xb7aea5('0x39')][_0xb7aea5('0xba')](this),this[_0xb7aea5('0x20e')]();},Game_Party[_0x59e1cb('0x201')]['initMessageCore']=function(){const _0x478f74=_0x59e1cb;this[_0x478f74('0x1ea')]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype']['getLastGainedItemData']=function(){const _0x2e76a5=_0x59e1cb;if(this[_0x2e76a5('0x1ea')]===undefined)this[_0x2e76a5('0x20e')]();return this[_0x2e76a5('0x1ea')];},Game_Party[_0x59e1cb('0x201')][_0x59e1cb('0x38')]=function(_0x281b31,_0x49c1b7){const _0x204629=_0x59e1cb;if(this[_0x204629('0x1ea')]===undefined)this[_0x204629('0x20e')]();if(!_0x281b31)return;if(DataManager['isItem'](_0x281b31)){if(_0x204629('0x8')===_0x204629('0x237')){function _0x3db784(){const _0x4afc90=_0x204629;if(_0x24d8ec[_0x4afc90('0x119')](_0x2f438a))return![];}}else this[_0x204629('0x1ea')][_0x204629('0x66')]=0x0;}else{if(DataManager[_0x204629('0x165')](_0x281b31)){if(_0x204629('0x1cd')!==_0x204629('0x262'))this[_0x204629('0x1ea')][_0x204629('0x66')]=0x1;else{function _0x44fd64(){const _0x38dd35=_0x204629;this[_0x38dd35('0x20e')](_0x107513),_0x35f780[_0x38dd35('0x8f')]['Window_Base_initialize'][_0x38dd35('0xba')](this,_0x5f3451);}}}else DataManager[_0x204629('0x99')](_0x281b31)&&(this[_0x204629('0x1ea')][_0x204629('0x66')]=0x2);}this[_0x204629('0x1ea')]['id']=_0x281b31['id'],this['_lastGainedItemData'][_0x204629('0x28')]=_0x49c1b7;},VisuMZ['MessageCore'][_0x59e1cb('0x210')]=Game_Party[_0x59e1cb('0x201')]['gainItem'],Game_Party[_0x59e1cb('0x201')][_0x59e1cb('0xb8')]=function(_0x238c9b,_0x451345,_0x56294f){const _0x44bbe1=_0x59e1cb;VisuMZ['MessageCore']['Game_Party_gainItem'][_0x44bbe1('0xba')](this,_0x238c9b,_0x451345,_0x56294f),_0x451345>0x0&&this[_0x44bbe1('0x38')](_0x238c9b,_0x451345);},VisuMZ['MessageCore'][_0x59e1cb('0x25')]=Game_Map[_0x59e1cb('0x201')]['initialize'],Game_Map[_0x59e1cb('0x201')][_0x59e1cb('0x204')]=function(){const _0x441a2d=_0x59e1cb;VisuMZ[_0x441a2d('0x8f')][_0x441a2d('0x25')][_0x441a2d('0xba')](this),this[_0x441a2d('0x1d0')]=[];},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x221')]=Game_Map[_0x59e1cb('0x201')][_0x59e1cb('0x49')],Game_Map[_0x59e1cb('0x201')][_0x59e1cb('0x49')]=function(){const _0x57b56f=_0x59e1cb;VisuMZ[_0x57b56f('0x8f')][_0x57b56f('0x221')]['call'](this),this['_messageCommonEvents']=[];},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x152')]=Game_Map[_0x59e1cb('0x201')][_0x59e1cb('0x27e')],Game_Map[_0x59e1cb('0x201')][_0x59e1cb('0x27e')]=function(){const _0x1777bd=_0x59e1cb;VisuMZ['MessageCore']['Game_Map_updateEvents']['call'](this),this[_0x1777bd('0x85')]();},Game_Map[_0x59e1cb('0x201')][_0x59e1cb('0x225')]=function(_0x2f3d18){const _0x372939=_0x59e1cb;this[_0x372939('0x1d0')]=this[_0x372939('0x1d0')]||[];const _0xe40388=this[_0x372939('0x103')][_0x372939('0x1d9')],_0x57124d=new Game_MessageCommonEvent(_0x2f3d18,_0xe40388);this[_0x372939('0x1d0')][_0x372939('0x1cb')](_0x57124d);},Game_Map[_0x59e1cb('0x201')][_0x59e1cb('0x85')]=function(){const _0x35f11d=_0x59e1cb;this['_messageCommonEvents']=this[_0x35f11d('0x1d0')]||[];for(const _0x33cb1d of this[_0x35f11d('0x1d0')]){!_0x33cb1d[_0x35f11d('0x103')]?this[_0x35f11d('0x1d0')][_0x35f11d('0x159')](_0x33cb1d):_0x33cb1d[_0x35f11d('0x231')]();}},Game_Interpreter[_0x59e1cb('0x201')]['command101']=function(_0x332978){const _0x59ac0a=_0x59e1cb;if($gameMessage['isBusy']())return![];return this[_0x59ac0a('0x113')](_0x332978),this[_0x59ac0a('0x14c')](_0x332978),this[_0x59ac0a('0x270')](_0x332978),this[_0x59ac0a('0xb5')](_0x59ac0a('0x19f')),!![];},Game_Interpreter[_0x59e1cb('0x201')][_0x59e1cb('0x113')]=function(_0x2f9fb7){const _0x291669=_0x59e1cb;$gameMessage[_0x291669('0x91')](_0x2f9fb7[0x0],_0x2f9fb7[0x1]),$gameMessage['setBackground'](_0x2f9fb7[0x2]),$gameMessage['setPositionType'](_0x2f9fb7[0x3]),$gameMessage['setSpeakerName'](_0x2f9fb7[0x4]);},Game_Interpreter[_0x59e1cb('0x201')][_0x59e1cb('0x14c')]=function(_0x5eb282){const _0x595650=_0x59e1cb;while(this[_0x595650('0x72')]()){if(_0x595650('0x174')===_0x595650('0x174')){this[_0x595650('0xc8')]++;this[_0x595650('0x186')]()[_0x595650('0x1f2')]===0x191&&$gameMessage[_0x595650('0xd2')](this[_0x595650('0x186')]()[_0x595650('0x206')][0x0]);if(this[_0x595650('0x241')]())break;}else{function _0x3a53ff(){const _0x5f0504=_0x595650;this[_0x5f0504('0x1d5')]=![],this[_0x5f0504('0xc4')]=_0x211894,_0x2cf6ef[_0x5f0504('0x20e')](),this['updateAutoSizePosition'](),this[_0x5f0504('0x1dc')]=0x0;}}}},Game_Interpreter[_0x59e1cb('0x201')]['isContinuePrepareShowTextCommands']=function(){const _0x58d98e=_0x59e1cb;if(this[_0x58d98e('0x58')]()===0x65&&$gameSystem[_0x58d98e('0x96')]()>0x4){if(_0x58d98e('0xee')===_0x58d98e('0xee'))return!![];else{function _0x434c9f(){const _0x356575=_0x58d98e,_0x3686d0=_0x1cee61(_0x4b77c8['$1']);_0x3686d0!==_0x3aedfe[_0x203df2][_0x356575('0xcc')]&&(_0x268f94(_0x356575('0x1c6')[_0x356575('0x5a')](_0x2fe8ed,_0x3686d0)),_0xf5c9c5[_0x356575('0xd6')]());}}}else return this[_0x58d98e('0x58')]()===0x191;},Game_Interpreter[_0x59e1cb('0x201')][_0x59e1cb('0x241')]=function(){const _0x4e93cf=_0x59e1cb;return $gameMessage[_0x4e93cf('0x239')][_0x4e93cf('0xaa')]>=$gameSystem[_0x4e93cf('0x96')]()&&this['nextEventCode']()!==0x191;},Game_Interpreter[_0x59e1cb('0x201')][_0x59e1cb('0x270')]=function(_0x2b300b){const _0x7102aa=_0x59e1cb;switch(this[_0x7102aa('0x58')]()){case 0x66:this[_0x7102aa('0xc8')]++,this[_0x7102aa('0x149')](this[_0x7102aa('0x186')]()[_0x7102aa('0x206')]);break;case 0x67:this[_0x7102aa('0xc8')]++,this[_0x7102aa('0x182')](this[_0x7102aa('0x186')]()[_0x7102aa('0x206')]);break;case 0x68:this[_0x7102aa('0xc8')]++,this[_0x7102aa('0xcb')](this[_0x7102aa('0x186')]()['parameters']);break;}},VisuMZ['MessageCore'][_0x59e1cb('0x1a9')]=Game_Interpreter[_0x59e1cb('0x201')][_0x59e1cb('0x149')],Game_Interpreter['prototype']['setupChoices']=function(_0x19c684){const _0x205f5e=_0x59e1cb;_0x19c684=this[_0x205f5e('0x17f')](),VisuMZ[_0x205f5e('0x8f')][_0x205f5e('0x1a9')][_0x205f5e('0xba')](this,_0x19c684);},Game_Interpreter[_0x59e1cb('0x201')][_0x59e1cb('0x17f')]=function(){const _0x436d40=_0x59e1cb,_0x3d39b2=this[_0x436d40('0xc8')],_0x17c006=[];let _0xf032ac=0x0;this[_0x436d40('0xc8')]++;while(this[_0x436d40('0xc8')]<this['_list'][_0x436d40('0xaa')]){if(this[_0x436d40('0x186')]()[_0x436d40('0x155')]===this[_0x436d40('0x12a')]){if(_0x436d40('0x23c')===_0x436d40('0x23c')){if(this[_0x436d40('0x186')]()[_0x436d40('0x1f2')]===0x194&&this['nextEventCode']()!==0x66)break;else{if(this[_0x436d40('0x186')]()[_0x436d40('0x1f2')]===0x66){if(_0x436d40('0x140')===_0x436d40('0x140'))this[_0x436d40('0x148')](_0xf032ac,this[_0x436d40('0x186')](),_0x3d39b2),this[_0x436d40('0xc8')]-=0x2;else{function _0x27597e(){const _0x2fc89d=_0x436d40,_0x223ca8=this[_0x2fc89d('0xc5')](_0x4e6afa);this[_0x2fc89d('0x34')]['fontSize']=_0x223ca8[_0x2fc89d('0x5b')](_0x375b56[_0x2fc89d('0x8f')][_0x2fc89d('0x21f')]['General'][_0x2fc89d('0x1ce')],_0x5c4a29[_0x2fc89d('0x8f')]['Settings'][_0x2fc89d('0x27b')][_0x2fc89d('0x40')]);}}}else this[_0x436d40('0x186')]()[_0x436d40('0x1f2')]===0x192&&(this[_0x436d40('0x186')]()[_0x436d40('0x206')][0x0]=_0xf032ac,_0xf032ac++);}}else{function _0x1de57e(){const _0x2f4c06=_0x436d40;_0x585f2d=this[_0x2f4c06('0x17f')](),_0x4ec9fa[_0x2f4c06('0x8f')]['Game_Interpreter_setupChoices'][_0x2f4c06('0xba')](this,_0x4860eb);}}}this[_0x436d40('0xc8')]++;}return this[_0x436d40('0xc8')]=_0x3d39b2,this['currentCommand']()['parameters'];},Game_Interpreter[_0x59e1cb('0x201')]['adjustShowChoiceExtension']=function(_0x2e92a4,_0x3cdfee,_0x145b5a){const _0x33e426=_0x59e1cb;this[_0x33e426('0x12')](_0x2e92a4,_0x3cdfee,_0x145b5a),this[_0x33e426('0xdc')](_0x2e92a4,_0x3cdfee,_0x145b5a),this['addExtraShowChoices'](_0x3cdfee,_0x145b5a);},Game_Interpreter[_0x59e1cb('0x201')][_0x59e1cb('0x12')]=function(_0x2ab2b8,_0x45c825,_0x22ff84){const _0x56c4a8=_0x59e1cb;if(_0x45c825[_0x56c4a8('0x206')][0x2]<0x0)return;const _0xee8c50=_0x45c825[_0x56c4a8('0x206')][0x2]+_0x2ab2b8;this[_0x56c4a8('0x19c')][_0x22ff84][_0x56c4a8('0x206')][0x2]=_0xee8c50;},Game_Interpreter[_0x59e1cb('0x201')][_0x59e1cb('0xdc')]=function(_0x139e99,_0x2a81a2,_0x58481e){const _0x40ee27=_0x59e1cb;if(_0x2a81a2[_0x40ee27('0x206')][0x1]>=0x0){var _0x2ea68b=_0x2a81a2[_0x40ee27('0x206')][0x1]+_0x139e99;this[_0x40ee27('0x19c')][_0x58481e]['parameters'][0x1]=_0x2ea68b;}else _0x2a81a2[_0x40ee27('0x206')][0x1]===-0x2&&(this['_list'][_0x58481e]['parameters'][0x1]=_0x2a81a2['parameters'][0x1]);},Game_Interpreter['prototype'][_0x59e1cb('0x12c')]=function(_0x2b544b,_0x49ae82){const _0x599366=_0x59e1cb;for(const _0x5047bc of _0x2b544b[_0x599366('0x206')][0x0]){this[_0x599366('0x19c')][_0x49ae82][_0x599366('0x206')][0x0][_0x599366('0x1cb')](_0x5047bc);}this[_0x599366('0x19c')]['splice'](this[_0x599366('0xc8')]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x580a6a=_0x59e1cb;this[_0x580a6a('0x204')](...arguments);}Game_MessageCommonEvent['prototype']['initialize']=function(_0x3eb097,_0x330598){const _0x1122ae=_0x59e1cb;this[_0x1122ae('0x20a')]=_0x3eb097,this[_0x1122ae('0x1d9')]=_0x330598||0x0,this[_0x1122ae('0x31')]();},Game_MessageCommonEvent[_0x59e1cb('0x201')][_0x59e1cb('0x100')]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent['prototype'][_0x59e1cb('0x17')]=function(){const _0x14a7c7=_0x59e1cb;return this[_0x14a7c7('0x100')]()[_0x14a7c7('0x17')];},Game_MessageCommonEvent[_0x59e1cb('0x201')][_0x59e1cb('0x31')]=function(){const _0x3700a8=_0x59e1cb;this['_interpreter']=new Game_Interpreter(),this['_interpreter'][_0x3700a8('0x1eb')](this[_0x3700a8('0x17')](),this[_0x3700a8('0x1d9')]);},Game_MessageCommonEvent[_0x59e1cb('0x201')][_0x59e1cb('0x231')]=function(){const _0x54292b=_0x59e1cb;if(this[_0x54292b('0x103')]){if(_0x54292b('0x260')!==_0x54292b('0xcd'))this[_0x54292b('0x103')][_0x54292b('0xb6')]()?this[_0x54292b('0x103')][_0x54292b('0x231')]():this['clear']();else{function _0x82bfb8(){const _0x3807c6=_0x54292b;if(this[_0x3807c6('0x15a')]===_0x360ef6)this['initMessageCore']();if(this[_0x3807c6('0x15a')][_0x3807c6('0xce')]===_0x124d7b)this[_0x3807c6('0x20e')]();return this[_0x3807c6('0x15a')][_0x3807c6('0xce')];}}}},Game_MessageCommonEvent[_0x59e1cb('0x201')][_0x59e1cb('0x215')]=function(){const _0x290227=_0x59e1cb;this[_0x290227('0x103')]=null;},Scene_Message[_0x59e1cb('0x201')][_0x59e1cb('0xca')]=function(){const _0x1794c5=_0x59e1cb,_0x7b038=Math[_0x1794c5('0x220')](Graphics[_0x1794c5('0x7b')],$gameSystem[_0x1794c5('0x16')]()),_0x29bb69=$gameSystem[_0x1794c5('0x96')](),_0x3cac5e=this[_0x1794c5('0x42')](_0x29bb69,![]),_0x54cbba=(Graphics[_0x1794c5('0x246')]-_0x7b038)/0x2,_0x59e71f=0x0;return new Rectangle(_0x54cbba,_0x59e71f,_0x7b038,_0x3cac5e);},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x1ec')]=Scene_Options[_0x59e1cb('0x201')][_0x59e1cb('0x1a7')],Scene_Options['prototype']['maxCommands']=function(){const _0x346a3e=_0x59e1cb;let _0x5ab4d5=VisuMZ[_0x346a3e('0x8f')][_0x346a3e('0x1ec')][_0x346a3e('0xba')](this);const _0xc864e8=VisuMZ['MessageCore'][_0x346a3e('0x21f')];if(_0xc864e8[_0x346a3e('0x10')][_0x346a3e('0x17a')]&&_0xc864e8[_0x346a3e('0x10')][_0x346a3e('0x6d')])_0x5ab4d5++;return _0x5ab4d5;},VisuMZ[_0x59e1cb('0x8f')]['Window_Base_initialize']=Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x204')],Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x204')]=function(_0x25d664){const _0x118448=_0x59e1cb;this[_0x118448('0x20e')](_0x25d664),VisuMZ[_0x118448('0x8f')][_0x118448('0x233')][_0x118448('0xba')](this,_0x25d664);},Window_Base['prototype'][_0x59e1cb('0x20e')]=function(_0x51b591){const _0x1d3821=_0x59e1cb;this[_0x1d3821('0x223')](),this[_0x1d3821('0x173')](),this['registerResetRect'](_0x51b591);},Window_Base['prototype']['initTextAlignement']=function(){const _0xd919cf=_0x59e1cb;this[_0xd919cf('0x1d3')](_0xd919cf('0x243'));},Window_Base[_0x59e1cb('0x201')]['setTextAlignment']=function(_0x47b080){const _0x2b6d4d=_0x59e1cb;this[_0x2b6d4d('0x23')]=_0x47b080;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x13f')]=function(){const _0x4245fc=_0x59e1cb;return this[_0x4245fc('0x23')];},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x11b')]=Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1b5')],Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1b5')]=function(_0x113528){const _0x511409=_0x59e1cb;VisuMZ[_0x511409('0x8f')][_0x511409('0x11b')]['call'](this,_0x113528);if(_0x113528[_0x511409('0x63')])this['setTextAlignment']('default');},Window_Base['prototype'][_0x59e1cb('0x173')]=function(){const _0x467383=_0x59e1cb;this[_0x467383('0xfa')](![]);},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x56')]=function(){return this['_wordWrap'];},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0xfa')]=function(_0x5cb8ea){const _0x12fa7c=_0x59e1cb;return this[_0x12fa7c('0x138')]=_0x5cb8ea,'';},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x14a')]=function(_0xf789d7){const _0x1e666d=_0x59e1cb;this[_0x1e666d('0x114')]=JsonEx[_0x1e666d('0x2c')](_0xf789d7);},Window_Base[_0x59e1cb('0x201')]['resetFontSettings']=function(){const _0x5bf1d5=_0x59e1cb;this[_0x5bf1d5('0x34')][_0x5bf1d5('0xfb')]=$gameSystem['mainFontFace'](),this[_0x5bf1d5('0x34')]['fontSize']=$gameSystem[_0x5bf1d5('0x1a1')](),this[_0x5bf1d5('0x34')][_0x5bf1d5('0x19a')]=![],this[_0x5bf1d5('0x34')]['fontItalic']=![],this[_0x5bf1d5('0x242')]();},Window_Base[_0x59e1cb('0x201')]['resetTextColor']=function(){const _0x5abf0b=_0x59e1cb;this[_0x5abf0b('0xb3')](ColorManager[_0x5abf0b('0xe7')]()),this[_0x5abf0b('0x141')](ColorManager[_0x5abf0b('0xe2')]()),this[_0x5abf0b('0x34')][_0x5abf0b('0x25a')]=0x3,this[_0x5abf0b('0x273')](![]);},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x273')]=function(_0x10176b){const _0x57f97b=_0x59e1cb;this[_0x57f97b('0x1a3')]=_0x10176b;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x110')]=function(){const _0x4e552d=_0x59e1cb;return this[_0x4e552d('0x1a3')];},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0xb2')]=function(){return![];},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1ae')]=function(){const _0x30b728=_0x59e1cb,_0x3fd88b=['fontFace',_0x30b728('0x1c'),_0x30b728('0x19a'),_0x30b728('0x1e1'),_0x30b728('0x249'),_0x30b728('0x92'),_0x30b728('0x25a'),_0x30b728('0x200')];let _0x33b2a5={};for(const _0x1d75e8 of _0x3fd88b){_0x33b2a5[_0x1d75e8]=this[_0x30b728('0x34')][_0x1d75e8];}return _0x33b2a5;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x5')]=function(_0x3dd502){const _0x54ceb0=_0x59e1cb;for(const _0x44aa3a in _0x3dd502){this[_0x54ceb0('0x34')][_0x44aa3a]=_0x3dd502[_0x44aa3a];}},VisuMZ[_0x59e1cb('0x8f')]['Window_Base_update']=Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x231')],Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x231')]=function(){const _0x5bb2d6=_0x59e1cb;VisuMZ[_0x5bb2d6('0x8f')][_0x5bb2d6('0x12d')][_0x5bb2d6('0xba')](this),this[_0x5bb2d6('0x1e7')]();},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1c3')]=function(){return![];},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1e7')]=function(){const _0x269a46=_0x59e1cb;if(this[_0x269a46('0x219')]>0x0){if(this[_0x269a46('0x1c3')]()){if(_0x269a46('0x1d1')===_0x269a46('0x1d1'))this['x']=this[_0x269a46('0x236')](this['x'],this[_0x269a46('0x1fd')]),this['y']=this[_0x269a46('0x236')](this['y'],this[_0x269a46('0x7c')]),this[_0x269a46('0x7b')]=this[_0x269a46('0x236')](this[_0x269a46('0x7b')],this[_0x269a46('0x9c')]),this[_0x269a46('0x11f')]=this[_0x269a46('0x236')](this[_0x269a46('0x11f')],this['_moveTargetHeight']),this[_0x269a46('0x1d6')]();else{function _0x302e01(){const _0x2ffaa5=_0x269a46,_0x13e9da=_0x358974['MessageCore'][_0x2ffaa5('0x21f')][_0x2ffaa5('0x27b')],_0x3f606d=_0x4593c8[_0x2ffaa5('0x8f')][_0x2ffaa5('0x21f')][_0x2ffaa5('0x59')];this['_MessageCoreSettings']={'messageRows':_0x13e9da[_0x2ffaa5('0x267')],'messageWidth':_0x13e9da[_0x2ffaa5('0x255')],'messageWordWrap':_0x3f606d['MessageWindow'],'helpWordWrap':_0x3f606d[_0x2ffaa5('0x4c')],'choiceLineHeight':_0x13e9da[_0x2ffaa5('0x134')],'choiceRows':_0x13e9da[_0x2ffaa5('0x257')],'choiceCols':_0x13e9da[_0x2ffaa5('0x3b')],'choiceTextAlign':_0x13e9da[_0x2ffaa5('0x79')]};}}}this[_0x269a46('0x219')]--;}},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1d6')]=function(){const _0x42058e=_0x59e1cb;this[_0x42058e('0x7b')]=Math[_0x42058e('0x220')](this['width'],Graphics[_0x42058e('0x7b')]),this['height']=Math[_0x42058e('0x220')](this[_0x42058e('0x11f')],Graphics[_0x42058e('0x11f')]);const _0xc0ac3d=-(Math[_0x42058e('0x82')](Graphics[_0x42058e('0x7b')]-Graphics[_0x42058e('0x246')])/0x2),_0x3dce98=_0xc0ac3d+Graphics[_0x42058e('0x7b')]-this[_0x42058e('0x7b')],_0x1ea302=-(Math[_0x42058e('0x82')](Graphics[_0x42058e('0x11f')]-Graphics[_0x42058e('0x9f')])/0x2),_0x2a965f=_0x1ea302+Graphics[_0x42058e('0x11f')]-this[_0x42058e('0x11f')];this['x']=this['x'][_0x42058e('0x5b')](_0xc0ac3d,_0x3dce98),this['y']=this['y'][_0x42058e('0x5b')](_0x1ea302,_0x2a965f);},Window_Base[_0x59e1cb('0x201')]['applyMoveEasing']=function(_0xb82a86,_0x31d2cb){const _0x3f028d=_0x59e1cb,_0x562716=this[_0x3f028d('0x219')],_0x21620e=this[_0x3f028d('0x284')],_0x419299=this[_0x3f028d('0x144')]((_0x21620e-_0x562716)/_0x21620e),_0x644eef=this[_0x3f028d('0x144')]((_0x21620e-_0x562716+0x1)/_0x21620e),_0x5d90ee=(_0xb82a86-_0x31d2cb*_0x419299)/(0x1-_0x419299);return _0x5d90ee+(_0x31d2cb-_0x5d90ee)*_0x644eef;},Window_Base['prototype'][_0x59e1cb('0x144')]=function(_0x27bc5d){const _0x18ae7f=_0x59e1cb,_0x176972=0x2;switch(this[_0x18ae7f('0x127')]){case 0x0:return _0x27bc5d;case 0x1:return this[_0x18ae7f('0x86')](_0x27bc5d,_0x176972);case 0x2:return this[_0x18ae7f('0x11')](_0x27bc5d,_0x176972);case 0x3:return this['easeInOut'](_0x27bc5d,_0x176972);default:if(Imported[_0x18ae7f('0x33')])return VisuMZ[_0x18ae7f('0x236')](_0x27bc5d,this[_0x18ae7f('0x127')]);else{if(_0x18ae7f('0x118')==='MUPqh'){function _0x1c3617(){const _0x51b99b=_0x18ae7f;return _0x23a54b=_0x35bd25[_0x51b99b('0x16a')](/\\/g,'\x1b'),_0x2458b6=_0x387c2a[_0x51b99b('0x16a')](/\x1b\x1b/g,'\x5c'),_0x106094;}}else return _0x27bc5d;}}},Window_Base['prototype'][_0x59e1cb('0x281')]=function(_0x298eac,_0x89a6f9,_0x46dab9,_0x3043a7,_0x31354c,_0x521fa0){const _0x4290ed=_0x59e1cb;this[_0x4290ed('0x1fd')]=_0x298eac,this[_0x4290ed('0x7c')]=_0x89a6f9,this[_0x4290ed('0x9c')]=_0x46dab9||this[_0x4290ed('0x7b')],this[_0x4290ed('0x90')]=_0x3043a7||this[_0x4290ed('0x11f')],this[_0x4290ed('0x219')]=_0x31354c||0x1;if(this[_0x4290ed('0x219')]<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this[_0x4290ed('0x219')],this[_0x4290ed('0x127')]=_0x521fa0||0x0;},Window_Base['prototype'][_0x59e1cb('0x83')]=function(_0x319ecc,_0x578993,_0x182912,_0x164a5e,_0x5e2903,_0x1a323a){const _0x18a8d4=_0x59e1cb;this[_0x18a8d4('0x1fd')]=this['x']+_0x319ecc,this[_0x18a8d4('0x7c')]=this['y']+_0x578993,this[_0x18a8d4('0x9c')]=this[_0x18a8d4('0x7b')]+(_0x182912||0x0),this['_moveTargetHeight']=this[_0x18a8d4('0x11f')]+(_0x164a5e||0x0),this[_0x18a8d4('0x219')]=_0x5e2903||0x1;if(this[_0x18a8d4('0x219')]<=0x0)this[_0x18a8d4('0x219')]=0x1;this[_0x18a8d4('0x284')]=this[_0x18a8d4('0x219')],this[_0x18a8d4('0x127')]=_0x1a323a||0x0;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x112')]=function(_0x50ba12,_0x1d16a3){const _0x438c51=_0x59e1cb;this[_0x438c51('0x281')](this[_0x438c51('0x114')]['x'],this[_0x438c51('0x114')]['y'],this['_resetRect'][_0x438c51('0x7b')],this[_0x438c51('0x114')][_0x438c51('0x11f')],_0x50ba12,_0x1d16a3);},VisuMZ['MessageCore'][_0x59e1cb('0x14')]=Window_Base['prototype'][_0x59e1cb('0xb3')],Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0xb3')]=function(_0xe76fc4){const _0x38d2ac=_0x59e1cb;if(this[_0x38d2ac('0x110')]())return;_0xe76fc4=_0xe76fc4[_0x38d2ac('0x16a')](/\,/g,''),this['_textColorStack']=this['_textColorStack']||[],this[_0x38d2ac('0x1ee')][_0x38d2ac('0x5e')](this[_0x38d2ac('0x34')][_0x38d2ac('0x249')]),VisuMZ[_0x38d2ac('0x8f')][_0x38d2ac('0x14')][_0x38d2ac('0xba')](this,_0xe76fc4);},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1f0')]=function(_0x36dbe3){const _0x2912ef=_0x59e1cb;this[_0x2912ef('0xc5')](_0x36dbe3);if(this['isColorLocked']())return;if(_0x36dbe3[_0x2912ef('0x63')]){if('jtQrc'===_0x2912ef('0x24b')){function _0x5b1731(){const _0x58a600=_0x2912ef,_0x18dc97=_0x4e2d27[_0x58a600('0xc7')]();if(_0x18dc97===0x1)return(_0x1aa463[_0x58a600('0x246')]-this[_0x58a600('0x1b7')]())/0x2;else return _0x18dc97===0x2?this['_messageWindow']['x']+this[_0x58a600('0x5c')][_0x58a600('0x7b')]-this[_0x58a600('0x1b7')]():this[_0x58a600('0x5c')]['x'];}}else this['_textColorStack']=this['_textColorStack']||[],this[_0x2912ef('0x34')]['textColor']=this['_textColorStack'][_0x2912ef('0x227')]()||ColorManager['normalColor']();}},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0xb9')]=function(_0x2f05c4){const _0x16367a=_0x59e1cb;return _0x2f05c4=this[_0x16367a('0x180')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x19')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x48')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x1f8')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x5d')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x2a')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x43')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x21e')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x22')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x1a0')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x1e5')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x17d')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x48')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x45')](_0x2f05c4),_0x2f05c4=this[_0x16367a('0x166')](_0x2f05c4),_0x2f05c4;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x180')]=function(_0x2373b0){const _0x2c8ba7=_0x59e1cb;for(const _0xa8a165 of VisuMZ['MessageCore'][_0x2c8ba7('0x21f')][_0x2c8ba7('0x8c')]){if(_0x2c8ba7('0x128')!==_0x2c8ba7('0x128')){function _0xab83fc(){const _0x50e968=_0x2c8ba7;_0x30ce20['MessageCore']['Window_Base_processAllText']['call'](this,_0x22c96b);if(_0x22dc2e['drawing'])this[_0x50e968('0x1d3')](_0x50e968('0x243'));}}else{if(_0x2373b0[_0x2c8ba7('0x7f')](_0xa8a165[_0x2c8ba7('0xe4')])){if(_0x2c8ba7('0x19d')!==_0x2c8ba7('0x19d')){function _0x3b3731(){const _0x414b7d=_0x2c8ba7,_0x578556=this[_0x414b7d('0x10d')](_0x511e14,0x0,0x0,0x0),_0x26a608=this[_0x414b7d('0x1ae')]();return _0x578556['drawing']=![],this[_0x414b7d('0xfa')](![]),this['processAllText'](_0x578556),this[_0x414b7d('0xfa')](!![]),this['returnPreservedFontSettings'](_0x26a608),{'width':_0x578556[_0x414b7d('0x13a')],'height':_0x578556[_0x414b7d('0x121')]};}}else _0x2373b0=_0x2373b0[_0x2c8ba7('0x16a')](_0xa8a165[_0x2c8ba7('0xe4')],_0xa8a165[_0x2c8ba7('0x22e')][_0x2c8ba7('0x208')](this));}}}return _0x2373b0;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x19')]=function(_0x3e3c41){const _0x38dfd8=_0x59e1cb;return _0x3e3c41=_0x3e3c41[_0x38dfd8('0x16a')](/\\/g,'\x1b'),_0x3e3c41=_0x3e3c41[_0x38dfd8('0x16a')](/\x1b\x1b/g,'\x5c'),_0x3e3c41;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x48')]=function(_0x477590){const _0x3292b1=_0x59e1cb;for(;;){if(_0x3292b1('0x50')!=='rXcMQ'){if(_0x477590[_0x3292b1('0x7f')](/\\V\[(\d+)\]/gi)){if(_0x3292b1('0x71')!=='pEjGx'){function _0x2e121b(){const _0x58b2e9=_0x3292b1;return _0x55b441[_0x58b2e9('0x239')][_0x58b2e9('0xaa')]>=_0x32daa2[_0x58b2e9('0x96')]()&&this[_0x58b2e9('0x58')]()!==0x191;}}else _0x477590=_0x477590[_0x3292b1('0x16a')](/\\V\[(\d+)\]/gi,(_0x3d231e,_0x56792a)=>this[_0x3292b1('0x19')](String($gameVariables[_0x3292b1('0x119')](parseInt(_0x56792a)))));}else{if(_0x477590[_0x3292b1('0x7f')](/\x1bV\[(\d+)\]/gi)){if('OELhu'!==_0x3292b1('0xf2')){function _0x5dca13(){const _0x4359d8=_0x3292b1;if(this[_0x4359d8('0x15a')]===_0x4b6348)this[_0x4359d8('0x20e')]();if(this[_0x4359d8('0x15a')][_0x4359d8('0x264')]===_0x20f4f8)this[_0x4359d8('0x20e')]();this[_0x4359d8('0x15a')][_0x4359d8('0x264')]=_0x2af3cb['toLowerCase']();}}else _0x477590=_0x477590[_0x3292b1('0x16a')](/\x1bV\[(\d+)\]/gi,(_0x221438,_0x14bb95)=>this[_0x3292b1('0x19')](String($gameVariables[_0x3292b1('0x119')](parseInt(_0x14bb95)))));}else break;}}else{function _0x44ffdd(){const _0x362eae=_0x3292b1;this[_0x362eae('0xb3')](_0x2e8af5[_0x362eae('0xe7')]()),this[_0x362eae('0x141')](_0x5444a2[_0x362eae('0xe2')]()),this[_0x362eae('0x34')][_0x362eae('0x25a')]=0x3,this['setColorLock'](![]);}}}return _0x477590;},Window_Base[_0x59e1cb('0x201')]['preConvertEscapeCharacters']=function(_0x4423e6){const _0x3632b0=_0x59e1cb;return this[_0x3632b0('0x105')](),_0x4423e6;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x17d')]=function(_0x23220c){return _0x23220c;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x5d')]=function(_0x4b2754){const _0x492d6c=_0x59e1cb;return _0x4b2754=_0x4b2754[_0x492d6c('0x16a')](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x4b2754=_0x4b2754['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x4b2754=_0x4b2754[_0x492d6c('0x16a')](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x4b2754;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x2a')]=function(_0x2d47bf){const _0x28a059=_0x59e1cb;return _0x2d47bf=_0x2d47bf[_0x28a059('0x16a')](/<B>/gi,_0x28a059('0x11a')),_0x2d47bf=_0x2d47bf[_0x28a059('0x16a')](/<\/B>/gi,_0x28a059('0x234')),_0x2d47bf=_0x2d47bf[_0x28a059('0x16a')](/<I>/gi,_0x28a059('0x1cf')),_0x2d47bf=_0x2d47bf[_0x28a059('0x16a')](/<\/I>/gi,_0x28a059('0x25b')),_0x2d47bf;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x43')]=function(_0x409904){const _0x431915=_0x59e1cb;return _0x409904=_0x409904[_0x431915('0x16a')](/<LEFT>/gi,_0x431915('0x116')),_0x409904=_0x409904['replace'](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x409904=_0x409904[_0x431915('0x16a')](/<CENTER>/gi,_0x431915('0x15e')),_0x409904=_0x409904[_0x431915('0x16a')](/<\/CENTER>/gi,_0x431915('0x157')),_0x409904=_0x409904[_0x431915('0x16a')](/<RIGHT>/gi,_0x431915('0x282')),_0x409904=_0x409904[_0x431915('0x16a')](/<\/RIGHT>/gi,_0x431915('0x157')),_0x409904;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x21e')]=function(_0x37be83){const _0x1846d0=_0x59e1cb;return _0x37be83=_0x37be83[_0x1846d0('0x16a')](/<COLORLOCK>/gi,_0x1846d0('0x17b')),_0x37be83=_0x37be83[_0x1846d0('0x16a')](/<\/COLORLOCK>/gi,_0x1846d0('0x16b')),_0x37be83=_0x37be83[_0x1846d0('0x16a')](/\(\(\(/gi,_0x1846d0('0x17b')),_0x37be83=_0x37be83[_0x1846d0('0x16a')](/\)\)\)/gi,_0x1846d0('0x16b')),_0x37be83;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x22')]=function(_0x5318d2){const _0x3781ef=_0x59e1cb;return _0x5318d2=_0x5318d2[_0x3781ef('0x16a')](/\x1bN\[(\d+)\]/gi,(_0x3b8255,_0x224198)=>this[_0x3781ef('0x68')](parseInt(_0x224198))),_0x5318d2=_0x5318d2[_0x3781ef('0x16a')](/\x1bP\[(\d+)\]/gi,(_0xac6d2c,_0xdff72d)=>this[_0x3781ef('0xbe')](parseInt(_0xdff72d))),_0x5318d2=_0x5318d2['replace'](/\x1bG/gi,TextManager[_0x3781ef('0x287')]),_0x5318d2;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1a0')]=function(_0x3bc5a4){const _0x2836dd=_0x59e1cb;for(const _0x187bb2 of VisuMZ[_0x2836dd('0x8f')][_0x2836dd('0x21f')]['TextCodeActions']){_0x3bc5a4[_0x2836dd('0x7f')](_0x187bb2['textCodeCheck'])&&(_0x3bc5a4=_0x3bc5a4[_0x2836dd('0x16a')](_0x187bb2[_0x2836dd('0xe4')],_0x187bb2[_0x2836dd('0x22e')]),_0x3bc5a4=this[_0x2836dd('0x48')](_0x3bc5a4));}return _0x3bc5a4;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1e5')]=function(_0x2e0fc1){const _0x17f831=_0x59e1cb;for(const _0x2230ba of VisuMZ[_0x17f831('0x8f')][_0x17f831('0x21f')][_0x17f831('0x21d')]){if('QsoXQ'!==_0x17f831('0x12e')){if(_0x2e0fc1[_0x17f831('0x7f')](_0x2230ba[_0x17f831('0xe4')])){if('LuLUd'!=='bpcUa')_0x2e0fc1=_0x2e0fc1[_0x17f831('0x16a')](_0x2230ba[_0x17f831('0xe4')],_0x2230ba['textCodeResult'][_0x17f831('0x208')](this)),_0x2e0fc1=this[_0x17f831('0x48')](_0x2e0fc1);else{function _0x1cc96a(){const _0x23e28a=_0x17f831;if(this[_0x23e28a('0x15a')]===_0x5c1f4a)this[_0x23e28a('0x20e')]();if(this[_0x23e28a('0x15a')][_0x23e28a('0x12f')]===_0xfa6a71)this[_0x23e28a('0x20e')]();return this[_0x23e28a('0x15a')][_0x23e28a('0x12f')];}}}}else{function _0x3b6b8f(){const _0x314691=_0x17f831;_0x1ff6f6[_0x314691('0x22e')]=new _0x3da187('return\x20\x27'+_0x234785[_0x314691('0x1a8')]['replace'](/\\/g,'\x1b')+'\x27');}}}return _0x2e0fc1;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x68')]=function(_0x2a7dd3){const _0x815a9a=_0x59e1cb,_0x4dd55f=_0x2a7dd3>=0x1?$gameActors['actor'](_0x2a7dd3):null,_0x657273=_0x4dd55f?_0x4dd55f[_0x815a9a('0x277')]():'',_0x4afe28=Number(VisuMZ[_0x815a9a('0x8f')][_0x815a9a('0x21f')][_0x815a9a('0xab')][_0x815a9a('0x1f4')]);return this[_0x815a9a('0xb2')]()&&_0x4afe28!==0x0?_0x815a9a('0x4a')[_0x815a9a('0x5a')](_0x4afe28,_0x657273):_0x657273;},Window_Base['prototype'][_0x59e1cb('0xbe')]=function(_0x5b42c6){const _0x10ea55=_0x59e1cb,_0x17d8de=_0x5b42c6>=0x1?$gameParty[_0x10ea55('0x123')]()[_0x5b42c6-0x1]:null,_0x2d28d4=_0x17d8de?_0x17d8de[_0x10ea55('0x277')]():'',_0x1baf97=Number(VisuMZ[_0x10ea55('0x8f')]['Settings'][_0x10ea55('0xab')][_0x10ea55('0x1f4')]);return this[_0x10ea55('0xb2')]()&&_0x1baf97!==0x0?_0x10ea55('0x4a')['format'](_0x1baf97,_0x2d28d4):_0x2d28d4;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x45')]=function(_0x39500c){const _0x5503ec=_0x59e1cb;if(this[_0x5503ec('0xb2')]()){if(_0x5503ec('0x25e')===_0x5503ec('0x25e'))_0x39500c=this[_0x5503ec('0x1b1')](_0x39500c),_0x39500c=this[_0x5503ec('0x160')](_0x39500c);else{function _0x252015(){const _0x56b921=_0x5503ec;_0x3fa49f[_0x56b921('0x8f')][_0x56b921('0x44')](_0x56b921('0x209'));for(const _0x5e465d of _0x469843[_0x56b921('0x8f')][_0x56b921('0x21f')][_0x56b921('0x209')]){_0x5e465d[_0x56b921('0x2b')]=_0x5e465d[_0x56b921('0x2b')]['toUpperCase'](),_0x5e465d[_0x56b921('0xe4')]=new _0x496a84('\x1b'+_0x5e465d[_0x56b921('0x2b')],'gi'),_0x5e465d[_0x56b921('0x22e')]='\x1b'+_0x5e465d[_0x56b921('0x2b')];if(_0x5e465d[_0x56b921('0x211')]==='')_0x5e465d[_0x56b921('0x22e')]+=_0x56b921('0x11d');}}}}return _0x39500c;},Window_Base['prototype'][_0x59e1cb('0x1b1')]=function(_0x4c4a8d){const _0x1a8d54=_0x59e1cb;for(autoColor of VisuMZ[_0x1a8d54('0x8f')]['AutoColorRegExp']){if(_0x1a8d54('0x8d')!==_0x1a8d54('0x8d')){function _0x1d6d88(){const _0x4a7a59=_0x1a8d54;for(const _0x2f8f68 of _0xec899c[_0x4a7a59('0x8f')]['Settings'][_0x4a7a59('0x21d')]){_0x113372[_0x4a7a59('0x7f')](_0x2f8f68[_0x4a7a59('0xe4')])&&(_0x3ae1b3=_0x5a06f2['replace'](_0x2f8f68[_0x4a7a59('0xe4')],_0x2f8f68[_0x4a7a59('0x22e')][_0x4a7a59('0x208')](this)),_0x2de0f7=this[_0x4a7a59('0x48')](_0x5d45ae));}return _0x74f935;}}else _0x4c4a8d=_0x4c4a8d[_0x1a8d54('0x16a')](autoColor[0x0],autoColor[0x1]);}return _0x4c4a8d;},Window_Base['prototype']['clearActorNameAutoColor']=function(){const _0x5c8cac=_0x59e1cb;this[_0x5c8cac('0x4d')]=[];},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x105')]=function(){const _0x122e67=_0x59e1cb;this[_0x122e67('0x1f9')]();const _0x24d6a6=VisuMZ['MessageCore'][_0x122e67('0x21f')][_0x122e67('0xab')],_0x12e40b=_0x24d6a6[_0x122e67('0x1f4')];if(_0x12e40b<=0x0)return;for(const _0x405b99 of $gameActors['_data']){if(!_0x405b99)continue;const _0x119860=_0x405b99[_0x122e67('0x277')]();if(_0x119860[_0x122e67('0xd7')]()['length']<=0x0)continue;if(_0x119860[_0x122e67('0x7f')](/-----/i))continue;let _0xa06152=VisuMZ[_0x122e67('0x8f')][_0x122e67('0x26f')](_0x119860);const _0x12f396=new RegExp('\x5cb'+_0xa06152+'\x5cb','g'),_0x258a6a=_0x122e67('0x4a')[_0x122e67('0x5a')](_0x12e40b,_0x119860);this[_0x122e67('0x4d')][_0x122e67('0x1cb')]([_0x12f396,_0x258a6a]);}},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x160')]=function(_0x3b2548){const _0x113a70=_0x59e1cb;this['_autoColorActorNames']===undefined&&this[_0x113a70('0x105')]();for(autoColor of this[_0x113a70('0x4d')]){_0x3b2548=_0x3b2548[_0x113a70('0x16a')](autoColor[0x0],autoColor[0x1]);}return _0x3b2548;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x226')]=function(_0x19e5aa,_0x228644,_0x325174){const _0x587a3e=_0x59e1cb;if(!_0x19e5aa)return'';const _0x35c2e7=_0x19e5aa[_0x228644];let _0x19f13d='';if(_0x35c2e7&&_0x325174&&_0x35c2e7[_0x587a3e('0xc3')]){const _0x1fd4d8=_0x587a3e('0x27');_0x19f13d=_0x1fd4d8[_0x587a3e('0x5a')](_0x35c2e7[_0x587a3e('0xc3')],_0x35c2e7[_0x587a3e('0x277')]);}else _0x35c2e7?_0x19f13d=_0x35c2e7[_0x587a3e('0x277')]:_0x19f13d='';return this[_0x587a3e('0xb2')]()&&(_0x19f13d=this[_0x587a3e('0x1d')](_0x19f13d,_0x19e5aa)),_0x19f13d;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x124')]=function(_0x23a104){const _0x9921c8=_0x59e1cb,_0x233769=$gameParty[_0x9921c8('0x169')]();if(_0x233769['id']<0x0)return'';let _0xb39c4=null;if(_0x233769['type']===0x0)_0xb39c4=$dataItems[_0x233769['id']];if(_0x233769['type']===0x1)_0xb39c4=$dataWeapons[_0x233769['id']];if(_0x233769['type']===0x2)_0xb39c4=$dataArmors[_0x233769['id']];if(!_0xb39c4)return'';return _0x23a104?_0x9921c8('0x27')['format'](_0xb39c4[_0x9921c8('0xc3')],_0xb39c4[_0x9921c8('0x277')]):_0xb39c4['name'];},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0xa6')]=function(){const _0x198b17=_0x59e1cb,_0x38545d=$gameParty['getLastGainedItemData']();if(_0x38545d['id']<=0x0)return'';return _0x38545d[_0x198b17('0x28')];},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1d')]=function(_0x21ad63,_0x1df0ce){const _0x5a1705=_0x59e1cb,_0x1fb41a=VisuMZ['MessageCore'][_0x5a1705('0x21f')][_0x5a1705('0xab')];let _0x35b7e3=0x0;if(_0x1df0ce===$dataActors)_0x35b7e3=_0x1fb41a[_0x5a1705('0x1f4')];if(_0x1df0ce===$dataClasses)_0x35b7e3=_0x1fb41a[_0x5a1705('0x26d')];if(_0x1df0ce===$dataSkills)_0x35b7e3=_0x1fb41a['Skills'];if(_0x1df0ce===$dataItems)_0x35b7e3=_0x1fb41a[_0x5a1705('0x8b')];if(_0x1df0ce===$dataWeapons)_0x35b7e3=_0x1fb41a[_0x5a1705('0xc')];if(_0x1df0ce===$dataArmors)_0x35b7e3=_0x1fb41a[_0x5a1705('0x252')];if(_0x1df0ce===$dataEnemies)_0x35b7e3=_0x1fb41a[_0x5a1705('0x26')];if(_0x1df0ce===$dataStates)_0x35b7e3=_0x1fb41a[_0x5a1705('0x1f3')];if(_0x35b7e3>0x0){if(_0x5a1705('0x9e')===_0x5a1705('0x1cc')){function _0x10383b(){const _0x1a716e=_0x5a1705;_0x4bb1a0[_0x1a716e('0xe4')]=new _0x12bdbd('\x1b'+_0x32a981[_0x1a716e('0x2b')]+_0x312941[_0x1a716e('0x211')],'gi'),_0x407a9d[_0x1a716e('0x1a8')]!==''&&_0x231bcc['TextStr']!==_0x1a716e('0xd0')?_0xd1605e[_0x1a716e('0x22e')]=new _0x42fa78(_0x1a716e('0x70')+_0x27fc44[_0x1a716e('0x1a8')][_0x1a716e('0x16a')](/\\/g,'\x1b')+'\x27'):_0x58cd38[_0x1a716e('0x22e')]=_0xeb84a9[_0x1a716e('0x41')];}}else _0x21ad63=_0x5a1705('0x4a')[_0x5a1705('0x5a')](_0x35b7e3,_0x21ad63);}return _0x21ad63;},Window_Base['prototype']['prepareWordWrapEscapeCharacters']=function(_0x34c0e5){const _0x354972=_0x59e1cb;_0x34c0e5=_0x34c0e5['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x2736e0,_0x5e0275)=>this[_0x354972('0xfa')](!![])),_0x34c0e5=_0x34c0e5[_0x354972('0x16a')](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x1ee2eb,_0x1eb436)=>this[_0x354972('0xfa')](![])),_0x34c0e5=_0x34c0e5[_0x354972('0x16a')](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x38aa72,_0x3e5b58)=>this[_0x354972('0xfa')](![]));if(_0x34c0e5[_0x354972('0x7f')](Window_Message['_autoSizeRegexp']))this[_0x354972('0xfa')](![]);else{if(_0x34c0e5[_0x354972('0x7f')](Window_Message[_0x354972('0x2d')])){if('lIZQj'===_0x354972('0x26a')){function _0x28486e(){const _0x1840dc=_0x354972;return this[_0x1840dc('0x23')];}}else this[_0x354972('0xfa')](![]);}}if(!this['isWordWrapEnabled']())return _0x34c0e5;if(_0x34c0e5[_0x354972('0xaa')]<=0x0)return _0x34c0e5;if(VisuMZ[_0x354972('0x8f')][_0x354972('0x21f')][_0x354972('0x59')]['LineBreakSpace']){if(_0x354972('0x228')===_0x354972('0x256')){function _0x15e909(){const _0x80f7a7=_0x354972;if(_0x342e80[_0x80f7a7('0x211')]==='')this['obtainEscapeParam'](_0x177a40);_0x506073[_0x80f7a7('0x22d')][_0x80f7a7('0xba')](this,_0x119a09);if(this[_0x80f7a7('0x11e')]===_0x121f4c){const _0x35328b=_0x64ce47[_0x80f7a7('0x1c2')]||0x0;if(_0x35328b>0x0)this[_0x80f7a7('0x7d')](_0x35328b);}}}else _0x34c0e5=_0x34c0e5[_0x354972('0x16a')](/[\n\r]+/g,'\x20'),_0x34c0e5=_0x34c0e5[_0x354972('0x16a')](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');}else{if('cYDVU'!==_0x354972('0x207')){function _0x549f6f(){const _0xab1d7b=_0x354972;this[_0xab1d7b('0x7b')]=_0x394313[_0xab1d7b('0x16')](),this[_0xab1d7b('0x7b')]=_0x295c44[_0xab1d7b('0x220')](_0x31498f['width'],this[_0xab1d7b('0x7b')]);const _0x254b71=_0x1d227d[_0xab1d7b('0x96')]();this[_0xab1d7b('0x11f')]=_0x149950[_0xab1d7b('0x254')][_0xab1d7b('0x42')](_0x254b71,![]),this[_0xab1d7b('0x11f')]=_0x3d4dd4[_0xab1d7b('0x220')](_0x53f59e[_0xab1d7b('0x11f')],this[_0xab1d7b('0x11f')]);if(_0x174174[_0xab1d7b('0x3a')])this[_0xab1d7b('0x235')]();}}else _0x34c0e5=_0x34c0e5[_0x354972('0x16a')](/[\n\r]+/g,''),_0x34c0e5=_0x34c0e5[_0x354972('0x16a')](/<(?:BR|LINEBREAK)>/gi,'\x0a');}return _0x34c0e5=this[_0x354972('0x81')](_0x34c0e5),_0x34c0e5=_0x34c0e5['split']('\x20')[_0x354972('0x75')](_0x354972('0x13d')),_0x34c0e5=_0x34c0e5[_0x354972('0x16a')](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x34c0e5=_0x34c0e5[_0x354972('0x16a')](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x34c0e5;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x81')]=function(_0x4467d9){return _0x4467d9;},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x15f')]=Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0xb7')],Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0xb7')]=function(_0x2a568b){const _0x8f45db=_0x59e1cb;VisuMZ[_0x8f45db('0x8f')][_0x8f45db('0x15f')][_0x8f45db('0xba')](this,_0x2a568b),this[_0x8f45db('0x46')](_0x2a568b);},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x107')]=Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x15d')],Window_Base[_0x59e1cb('0x201')]['processControlCharacter']=function(_0x3e02c6,_0x1c648c){const _0x542c71=_0x59e1cb;VisuMZ[_0x542c71('0x8f')][_0x542c71('0x107')][_0x542c71('0xba')](this,_0x3e02c6,_0x1c648c);if(_0x1c648c===_0x542c71('0x13d')){if(_0x542c71('0x22c')===_0x542c71('0x22c'))this[_0x542c71('0x1ab')](_0x3e02c6);else{function _0x156928(){const _0x1202a9=_0x542c71;this[_0x1202a9('0x5f')]();}}}},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x20')]=function(_0x33e9d4){const _0x1f0bc6=_0x59e1cb;var _0x27d2bc=/^\<(.*?)\>/[_0x1f0bc6('0x1b2')](_0x33e9d4[_0x1f0bc6('0x213')][_0x1f0bc6('0x183')](_0x33e9d4[_0x1f0bc6('0x54')]));return _0x27d2bc?(_0x33e9d4[_0x1f0bc6('0x54')]+=_0x27d2bc[0x0][_0x1f0bc6('0xaa')],String(_0x27d2bc[0x0][_0x1f0bc6('0x183')](0x1,_0x27d2bc[0x0][_0x1f0bc6('0xaa')]-0x1))):'';},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x1f')]=Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1b0')],Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1b0')]=function(_0x106759,_0x412ba6){const _0x1de4b9=_0x59e1cb;switch(_0x106759){case'C':if(_0x412ba6[_0x1de4b9('0x63')]){if(_0x1de4b9('0xa0')!==_0x1de4b9('0x1b4'))VisuMZ[_0x1de4b9('0x8f')][_0x1de4b9('0x1f')][_0x1de4b9('0xba')](this,_0x106759,_0x412ba6);else{function _0x243700(){const _0x931661=_0x1de4b9;_0x1a86fc=_0x156e4e[_0x931661('0x16a')](/[\n\r]+/g,''),_0x27c879=_0x5c2677['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a');}}}else this[_0x1de4b9('0xc5')](_0x412ba6);break;case'I':case'{':case'}':VisuMZ[_0x1de4b9('0x8f')][_0x1de4b9('0x1f')][_0x1de4b9('0xba')](this,_0x106759,_0x412ba6);break;case'FS':this[_0x1de4b9('0x25f')](_0x412ba6);break;case'PX':this[_0x1de4b9('0x177')](_0x412ba6);break;case'PY':this[_0x1de4b9('0x10a')](_0x412ba6);break;case _0x1de4b9('0x132'):this[_0x1de4b9('0x1c0')](this[_0x1de4b9('0xc5')](_0x412ba6));break;case _0x1de4b9('0x139'):this['processDrawCenteredPicture'](_0x412ba6);break;case _0x1de4b9('0x1be'):this[_0x1de4b9('0x153')](_0x412ba6);break;case _0x1de4b9('0x1df'):this[_0x1de4b9('0x13e')](_0x412ba6);break;case _0x1de4b9('0x14f'):this['processFontChangeItalic'](this[_0x1de4b9('0xc5')](_0x412ba6));break;case _0x1de4b9('0x2e'):this['processDrawPicture'](_0x412ba6);break;case _0x1de4b9('0x55'):this[_0x1de4b9('0x1f0')](_0x412ba6);break;case _0x1de4b9('0x10c'):this[_0x1de4b9('0x17c')](_0x412ba6);break;case _0x1de4b9('0x19b'):this[_0x1de4b9('0x1e3')](_0x412ba6);break;case _0x1de4b9('0x158'):this[_0x1de4b9('0x1ab')](_0x412ba6);break;default:this[_0x1de4b9('0x4f')](_0x106759,_0x412ba6);}},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x4f')]=function(_0xba4c15,_0x44c11b){const _0x376d00=_0x59e1cb;for(const _0x21b2c2 of VisuMZ['MessageCore'][_0x376d00('0x21f')][_0x376d00('0x209')]){if(_0x21b2c2[_0x376d00('0x2b')]===_0xba4c15){if(_0x21b2c2[_0x376d00('0x211')]==='')this[_0x376d00('0xc5')](_0x44c11b);_0x21b2c2[_0x376d00('0x22d')][_0x376d00('0xba')](this,_0x44c11b);if(this[_0x376d00('0x11e')]===Window_Message){if(_0x376d00('0xde')===_0x376d00('0xfd')){function _0x32d045(){const _0x5b8899=_0x376d00;this[_0x5b8899('0x34')][_0x5b8899('0x1c')]+=_0x2dd26e[_0x5b8899('0x8f')][_0x5b8899('0x21f')][_0x5b8899('0x27b')][_0x5b8899('0x117')],this[_0x5b8899('0x34')][_0x5b8899('0x1c')]=_0x57497c[_0x5b8899('0x220')](this[_0x5b8899('0x34')]['fontSize'],_0x485399[_0x5b8899('0x8f')][_0x5b8899('0x21f')]['General'][_0x5b8899('0x40')]);}}else{const _0x37d952=_0x21b2c2[_0x376d00('0x1c2')]||0x0;if(_0x37d952>0x0)this[_0x376d00('0x7d')](_0x37d952);}}}}},Window_Base[_0x59e1cb('0x201')]['makeFontBigger']=function(){const _0x3249aa=_0x59e1cb;this[_0x3249aa('0x34')][_0x3249aa('0x1c')]+=VisuMZ[_0x3249aa('0x8f')][_0x3249aa('0x21f')][_0x3249aa('0x27b')]['FontChangeValue'],this['contents'][_0x3249aa('0x1c')]=Math['min'](this[_0x3249aa('0x34')][_0x3249aa('0x1c')],VisuMZ[_0x3249aa('0x8f')][_0x3249aa('0x21f')][_0x3249aa('0x27b')]['FontBiggerCap']);},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1fa')]=function(){const _0x1e5294=_0x59e1cb;this[_0x1e5294('0x34')][_0x1e5294('0x1c')]-=VisuMZ[_0x1e5294('0x8f')][_0x1e5294('0x21f')][_0x1e5294('0x27b')]['FontChangeValue'],this[_0x1e5294('0x34')][_0x1e5294('0x1c')]=Math[_0x1e5294('0x217')](this[_0x1e5294('0x34')]['fontSize'],VisuMZ[_0x1e5294('0x8f')][_0x1e5294('0x21f')][_0x1e5294('0x27b')][_0x1e5294('0x1ce')]);},Window_Base[_0x59e1cb('0x201')]['processFsTextCode']=function(_0x1e7e54){const _0x54bca5=_0x59e1cb,_0x340106=this[_0x54bca5('0xc5')](_0x1e7e54);this[_0x54bca5('0x34')][_0x54bca5('0x1c')]=_0x340106['clamp'](VisuMZ[_0x54bca5('0x8f')][_0x54bca5('0x21f')][_0x54bca5('0x27b')][_0x54bca5('0x1ce')],VisuMZ[_0x54bca5('0x8f')][_0x54bca5('0x21f')][_0x54bca5('0x27b')][_0x54bca5('0x40')]);},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x29')]=function(_0x3a655e){const _0x589fd7=_0x59e1cb;let _0x297b2f=this['contents'][_0x589fd7('0x1c')];const _0x3ae77a=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if(_0x589fd7('0x1c7')!==_0x589fd7('0x1da')){const _0x1c0c68=_0x3ae77a[_0x589fd7('0x1b2')](_0x3a655e);if(!_0x1c0c68)break;const _0x52dfe0=String(_0x1c0c68[0x1])[_0x589fd7('0x24e')]();if(_0x52dfe0==='{'){if(_0x589fd7('0x64')==='Gedhb')this[_0x589fd7('0x232')]();else{function _0x4e41b5(){return _0x4cbbaa;}}}else{if(_0x52dfe0==='}')this[_0x589fd7('0x1fa')]();else{if(_0x52dfe0==='FS'){if(_0x589fd7('0xf7')==='nUkbm'){function _0x3ea870(){const _0x2d59f4=_0x589fd7;this['onProcessCharacter'](_0x3bd919),_0xef5f81[_0x2d59f4('0x201')][_0x2d59f4('0x1c5')]['call'](this,_0x33ecef);}}else this[_0x589fd7('0x34')]['fontSize']=parseInt(_0x1c0c68[0x3])[_0x589fd7('0x5b')](VisuMZ[_0x589fd7('0x8f')][_0x589fd7('0x21f')][_0x589fd7('0x27b')][_0x589fd7('0x1ce')],VisuMZ[_0x589fd7('0x8f')][_0x589fd7('0x21f')][_0x589fd7('0x27b')][_0x589fd7('0x40')]);}}}this[_0x589fd7('0x34')][_0x589fd7('0x1c')]>_0x297b2f&&(_0x297b2f=this[_0x589fd7('0x34')][_0x589fd7('0x1c')]);}else{function _0x856e28(){return 0x4;}}}return _0x297b2f;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x177')]=function(_0x1bd33b){const _0x571856=_0x59e1cb;_0x1bd33b['x']=this[_0x571856('0xc5')](_0x1bd33b),VisuMZ[_0x571856('0x8f')]['Settings'][_0x571856('0x27b')][_0x571856('0x14d')]&&(_0x1bd33b['x']+=_0x1bd33b[_0x571856('0x1fc')]);},Window_Base['prototype'][_0x59e1cb('0x10a')]=function(_0x2e321b){const _0x58936c=_0x59e1cb;_0x2e321b['y']=this[_0x58936c('0xc5')](_0x2e321b),VisuMZ[_0x58936c('0x8f')][_0x58936c('0x21f')]['General'][_0x58936c('0x14d')]&&(_0x2e321b['y']+=_0x2e321b[_0x58936c('0x1de')]);},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1c0')]=function(_0x2fd87f){const _0xcbf58d=_0x59e1cb;this['contents'][_0xcbf58d('0x19a')]=!!_0x2fd87f;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x23a')]=function(_0x14797f){const _0x1229a4=_0x59e1cb;this['contents'][_0x1229a4('0x1e1')]=!!_0x14797f;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x17c')]=function(_0x4ef446){const _0xa6d8f3=_0x59e1cb,_0x5111cb=this['obtainEscapeParam'](_0x4ef446);if(!_0x4ef446['drawing'])return;switch(_0x5111cb){case 0x0:this[_0xa6d8f3('0x1d3')](_0xa6d8f3('0x243'));return;case 0x1:this[_0xa6d8f3('0x1d3')](_0xa6d8f3('0x10f'));break;case 0x2:this[_0xa6d8f3('0x1d3')](_0xa6d8f3('0x97'));break;case 0x3:this[_0xa6d8f3('0x1d3')](_0xa6d8f3('0x143'));break;}this[_0xa6d8f3('0x46')](_0x4ef446);},Window_Base[_0x59e1cb('0x201')]['processTextAlignmentX']=function(_0x4f9c92){const _0x2d7b6d=_0x59e1cb;if(!_0x4f9c92[_0x2d7b6d('0x63')])return;if(_0x4f9c92['rtl'])return;if(this[_0x2d7b6d('0x13f')]()===_0x2d7b6d('0x243'))return;let _0x3c99da=_0x4f9c92['text'][_0x2d7b6d('0x279')](_0x2d7b6d('0x179'),_0x4f9c92['index']+0x1),_0x7ab980=_0x4f9c92[_0x2d7b6d('0x213')][_0x2d7b6d('0x279')]('\x0a',_0x4f9c92[_0x2d7b6d('0x54')]+0x1);if(_0x3c99da<0x0)_0x3c99da=_0x4f9c92[_0x2d7b6d('0x213')][_0x2d7b6d('0xaa')]+0x1;if(_0x7ab980>0x0)_0x3c99da=Math[_0x2d7b6d('0x220')](_0x3c99da,_0x7ab980);const _0x575d92=_0x4f9c92[_0x2d7b6d('0x213')][_0x2d7b6d('0xae')](_0x4f9c92[_0x2d7b6d('0x54')],_0x3c99da),_0x5a7512=this[_0x2d7b6d('0xa3')](_0x575d92)[_0x2d7b6d('0x7b')],_0x46f593=_0x4f9c92['width']||this[_0x2d7b6d('0x7e')],_0x3acad4=this['constructor']===Window_Message&&$gameMessage[_0x2d7b6d('0x167')]()!=='';switch(this[_0x2d7b6d('0x13f')]()){case _0x2d7b6d('0x10f'):_0x4f9c92['x']=_0x4f9c92[_0x2d7b6d('0x1fc')];break;case _0x2d7b6d('0x97'):_0x4f9c92['x']=_0x4f9c92[_0x2d7b6d('0x1fc')],_0x4f9c92['x']+=Math['floor']((_0x46f593-_0x5a7512)/0x2);if(_0x3acad4){if(_0x2d7b6d('0x7')===_0x2d7b6d('0x7'))_0x4f9c92['x']-=_0x4f9c92[_0x2d7b6d('0x1fc')]/0x2;else{function _0x370615(){const _0xed1d48=_0x2d7b6d;if(this[_0xed1d48('0x15a')]===_0x265d93)this[_0xed1d48('0x20e')]();if(this[_0xed1d48('0x15a')][_0xed1d48('0x147')]===_0x40912a)this['initMessageCore']();this[_0xed1d48('0x15a')][_0xed1d48('0x147')]=_0x129b83;}}}break;case'right':_0x4f9c92['x']=_0x46f593-_0x5a7512+_0x4f9c92[_0x2d7b6d('0x1fc')];if(_0x3acad4){if(_0x2d7b6d('0x89')===_0x2d7b6d('0x89'))_0x4f9c92['x']-=_0x4f9c92[_0x2d7b6d('0x1fc')];else{function _0x4df081(){const _0x530a98=_0x2d7b6d;return this[_0x530a98('0xb2')]()&&(_0x4a477f=this[_0x530a98('0x1b1')](_0x44a279),_0x3a9f66=this[_0x530a98('0x160')](_0x28b4ce)),_0x21a56e;}}}break;}},Window_Base[_0x59e1cb('0x201')]['textSizeExTextAlignment']=function(_0xbd5b18){const _0x534e7c=_0x59e1cb;_0xbd5b18=_0xbd5b18[_0x534e7c('0x16a')](/\x1b!/g,''),_0xbd5b18=_0xbd5b18[_0x534e7c('0x16a')](/\x1b\|/g,''),_0xbd5b18=_0xbd5b18[_0x534e7c('0x16a')](/\x1b\./g,'');const _0x33398d=this[_0x534e7c('0x10d')](_0xbd5b18,0x0,0x0,0x0),_0xf3b849=this[_0x534e7c('0x1ae')]();return _0x33398d[_0x534e7c('0x63')]=![],this[_0x534e7c('0x1b5')](_0x33398d),this['returnPreservedFontSettings'](_0xf3b849),{'width':_0x33398d['outputWidth'],'height':_0x33398d['outputHeight']};},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1ab')]=function(_0x207710){const _0x4f400b=_0x59e1cb,_0x484d6f=(_0x207710[_0x4f400b('0x187')]?-0x1:0x1)*this[_0x4f400b('0xe0')]('\x20');_0x207710['x']+=_0x484d6f;if(this[_0x4f400b('0xc5')](_0x207710)>0x0)_0x207710['x']+=_0x484d6f;if(_0x207710['rtl'])return;let _0x336e0c=_0x207710[_0x4f400b('0x213')][_0x4f400b('0x279')](_0x4f400b('0x13d'),_0x207710[_0x4f400b('0x54')]+0x1),_0x27ee68=_0x207710[_0x4f400b('0x213')][_0x4f400b('0x279')]('\x0a',_0x207710[_0x4f400b('0x54')]+0x1);if(_0x336e0c<0x0)_0x336e0c=_0x207710[_0x4f400b('0x213')]['length']+0x1;if(_0x27ee68>0x0)_0x336e0c=Math[_0x4f400b('0x220')](_0x336e0c,_0x27ee68);const _0x135313=_0x207710[_0x4f400b('0x213')][_0x4f400b('0xae')](_0x207710[_0x4f400b('0x54')],_0x336e0c),_0xe191e5=this[_0x4f400b('0x3f')](_0x135313)['width'];let _0x5c188b=_0x207710[_0x4f400b('0x7b')]||this[_0x4f400b('0x7e')];if(this[_0x4f400b('0x11e')]===Window_Message){const _0x363bdf=$gameMessage[_0x4f400b('0x167')]()===''?0x0:ImageManager[_0x4f400b('0x24d')]+0x14;_0x5c188b-=_0x363bdf;if(VisuMZ[_0x4f400b('0x8f')][_0x4f400b('0x21f')][_0x4f400b('0x59')][_0x4f400b('0x15')]){if(_0x4f400b('0x26b')===_0x4f400b('0xe8')){function _0x2b3604(){const _0x54d6f5=_0x4f400b,_0x578466=_0x379b22[_0x54d6f5('0x184')]('['+_0x2c7752['$1']['match'](/\d+/g)+']');for(const _0x285746 of _0x578466){if(_0x5ae882[_0x54d6f5('0x119')](_0x285746))return!![];}return![];}}else _0x5c188b-=_0x363bdf;}}let _0x87ade4=![];if(_0x207710['x']+_0xe191e5>_0x207710[_0x4f400b('0x1fc')]+_0x5c188b)_0x87ade4=!![];if(_0xe191e5===0x0)_0x87ade4=!![];if(_0x87ade4){if(_0x4f400b('0x1a')===_0x4f400b('0x1a'))_0x207710[_0x4f400b('0x213')]=_0x207710[_0x4f400b('0x213')][_0x4f400b('0x183')](0x0,_0x207710[_0x4f400b('0x54')])+'\x0a'+_0x207710[_0x4f400b('0x213')]['substr'](_0x207710['index']);else{function _0xe6c716(){const _0xe980ce=_0x4f400b;if(_0xbebcaf===_0xe980ce('0x258'))return this[_0xe980ce('0x171')](_0x24e19b,_0x1c3bfd,_0x25364d);_0x1b4526[_0xe980ce('0x8f')][_0xe980ce('0x18c')][_0xe980ce('0xba')](this,_0x2a7ead,_0x4dcd52,_0xea04e3);}}}},Window_Base[_0x59e1cb('0x201')]['textSizeExWordWrap']=function(_0x28c762){const _0x14ffe2=_0x59e1cb,_0x5e74f8=this['createTextState'](_0x28c762,0x0,0x0,0x0),_0x30adb3=this[_0x14ffe2('0x1ae')]();return _0x5e74f8[_0x14ffe2('0x63')]=![],this['setWordWrap'](![]),this[_0x14ffe2('0x1b5')](_0x5e74f8),this[_0x14ffe2('0xfa')](!![]),this[_0x14ffe2('0x5')](_0x30adb3),{'width':_0x5e74f8['outputWidth'],'height':_0x5e74f8['outputHeight']};},Window_Base['prototype'][_0x59e1cb('0x13e')]=function(_0x51b2e3){const _0x5909c7=_0x59e1cb;return this[_0x5909c7('0xc5')](_0x51b2e3);},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0xd4')]=function(_0x5712d5){const _0x11cc98=_0x59e1cb,_0x514bfc=this[_0x11cc98('0x20')](_0x5712d5)[_0x11cc98('0x1e2')](',');if(!_0x5712d5[_0x11cc98('0x63')])return;const _0x2b7af6=_0x514bfc[0x0][_0x11cc98('0xd7')](),_0x271bfd=_0x514bfc[0x1]||0x0,_0x130b7a=_0x514bfc[0x2]||0x0,_0x19f168=ImageManager['loadPicture'](_0x2b7af6),_0x59a836=this[_0x11cc98('0x34')][_0x11cc98('0x200')];_0x19f168[_0x11cc98('0xd5')](this[_0x11cc98('0x1b')][_0x11cc98('0x208')](this,_0x19f168,_0x5712d5['x'],_0x5712d5['y'],_0x271bfd,_0x130b7a,_0x59a836));},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x1b')]=function(_0x52193c,_0x52521d,_0x4bc571,_0x56010b,_0x1aea5e,_0x43021b){const _0x2f6c51=_0x59e1cb;_0x56010b=_0x56010b||_0x52193c[_0x2f6c51('0x7b')],_0x1aea5e=_0x1aea5e||_0x52193c[_0x2f6c51('0x11f')],this['contentsBack'][_0x2f6c51('0x200')]=_0x43021b,this[_0x2f6c51('0x3e')][_0x2f6c51('0x137')](_0x52193c,0x0,0x0,_0x52193c[_0x2f6c51('0x7b')],_0x52193c['height'],_0x52521d,_0x4bc571,_0x56010b,_0x1aea5e),this[_0x2f6c51('0x3e')]['paintOpacity']=0xff;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x230')]=function(_0x9026de){const _0x3144a7=_0x59e1cb,_0x2521bc=this[_0x3144a7('0x20')](_0x9026de)[_0x3144a7('0x1e2')](',');if(!_0x9026de[_0x3144a7('0x63')])return;const _0xe706ce=_0x2521bc[0x0][_0x3144a7('0xd7')](),_0x1c271a=ImageManager[_0x3144a7('0x265')](_0xe706ce),_0x4e87f6=JsonEx[_0x3144a7('0x2c')](_0x9026de),_0x44b301=this[_0x3144a7('0x34')][_0x3144a7('0x200')];_0x1c271a[_0x3144a7('0xd5')](this['drawBackCenteredPicture']['bind'](this,_0x1c271a,_0x4e87f6,_0x44b301));},Window_Base['prototype']['drawBackCenteredPicture']=function(_0x5665ca,_0x26dba3,_0x355b17){const _0x1bc72b=_0x59e1cb,_0x15e9dc=_0x26dba3['width']||this['innerWidth'],_0x1b0555=this[_0x1bc72b('0xc8')]!==undefined?this[_0x1bc72b('0x168')]():this[_0x1bc72b('0xad')],_0x56fb81=_0x15e9dc/_0x5665ca[_0x1bc72b('0x7b')],_0x38d815=_0x1b0555/_0x5665ca[_0x1bc72b('0x11f')],_0x29e136=Math['min'](_0x56fb81,_0x38d815,0x1),_0x1c5278=this[_0x1bc72b('0xc8')]!==undefined?(this[_0x1bc72b('0x271')](0x0)[_0x1bc72b('0x11f')]-this[_0x1bc72b('0x286')]())/0x2:0x0,_0x12f766=_0x5665ca[_0x1bc72b('0x7b')]*_0x29e136,_0xdab6e4=_0x5665ca['height']*_0x29e136,_0xe78965=Math['floor']((_0x15e9dc-_0x12f766)/0x2)+_0x26dba3[_0x1bc72b('0x1fc')],_0x3ad4fa=Math[_0x1bc72b('0x82')]((_0x1b0555-_0xdab6e4)/0x2)+_0x26dba3[_0x1bc72b('0x1de')]-_0x1c5278*0x2;this[_0x1bc72b('0x3e')][_0x1bc72b('0x200')]=_0x355b17,this[_0x1bc72b('0x3e')][_0x1bc72b('0x137')](_0x5665ca,0x0,0x0,_0x5665ca[_0x1bc72b('0x7b')],_0x5665ca[_0x1bc72b('0x11f')],_0xe78965,_0x3ad4fa,_0x12f766,_0xdab6e4),this[_0x1bc72b('0x3e')]['paintOpacity']=0xff;},Window_Base[_0x59e1cb('0x201')][_0x59e1cb('0x153')]=function(_0x3b907d){const _0x4854d2=_0x59e1cb,_0x518397=this[_0x4854d2('0xc5')](_0x3b907d);if(_0x3b907d[_0x4854d2('0x63')])this[_0x4854d2('0x273')](_0x518397>0x0);},Window_Base['prototype'][_0x59e1cb('0x1e3')]=function(_0x446351){const _0x2fccdb=_0x59e1cb,_0x2eb422=this[_0x2fccdb('0xc5')](_0x446351);this['constructor']===Window_Message&&_0x446351[_0x2fccdb('0x63')]&&this[_0x2fccdb('0xdf')](_0x2eb422);},Window_Help['prototype'][_0x59e1cb('0x173')]=function(){const _0x570fd8=_0x59e1cb;this['setWordWrap']($gameSystem[_0x570fd8('0x224')]());},Window_Help['prototype']['isAutoColorAffected']=function(){return!![];},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x1f7')]=Window_Help[_0x59e1cb('0x201')][_0x59e1cb('0x31')],Window_Help[_0x59e1cb('0x201')][_0x59e1cb('0x31')]=function(){const _0x3f2bf6=_0x59e1cb;this[_0x3f2bf6('0x1f9')](),VisuMZ[_0x3f2bf6('0x8f')][_0x3f2bf6('0x1f7')][_0x3f2bf6('0xba')](this),this[_0x3f2bf6('0x173')]();},VisuMZ[_0x59e1cb('0x8f')]['Window_Options_addGeneralOptions']=Window_Options['prototype'][_0x59e1cb('0x161')],Window_Options[_0x59e1cb('0x201')][_0x59e1cb('0x161')]=function(){const _0x27beb7=_0x59e1cb;VisuMZ[_0x27beb7('0x8f')][_0x27beb7('0xa7')][_0x27beb7('0xba')](this),this['addMessageCoreCommands']();},Window_Options['prototype'][_0x59e1cb('0x1b6')]=function(){const _0x5541f6=_0x59e1cb;if(VisuMZ[_0x5541f6('0x8f')][_0x5541f6('0x21f')]['TextSpeed'][_0x5541f6('0x17a')]){if(_0x5541f6('0x126')===_0x5541f6('0x14e')){function _0xf90a60(){const _0x2a163f=_0x5541f6;this[_0x2a163f('0x34')][_0x2a163f('0x19a')]=!!_0x220e1f;}}else this['addMessageCoreTextSpeedCommand']();}},Window_Options[_0x59e1cb('0x201')][_0x59e1cb('0x5f')]=function(){const _0x3a3466=_0x59e1cb,_0x1b735b=TextManager[_0x3a3466('0x22b')],_0x5cd125=_0x3a3466('0x258');this['addCommand'](_0x1b735b,_0x5cd125);},VisuMZ['MessageCore'][_0x59e1cb('0x11c')]=Window_Options[_0x59e1cb('0x201')][_0x59e1cb('0xff')],Window_Options[_0x59e1cb('0x201')][_0x59e1cb('0xff')]=function(_0x38e9a0){const _0x2e1614=_0x59e1cb,_0x578aa6=this[_0x2e1614('0x51')](_0x38e9a0);if(_0x578aa6==='textSpeed')return this[_0x2e1614('0x1e')]();return VisuMZ[_0x2e1614('0x8f')]['Window_Options_statusText'][_0x2e1614('0xba')](this,_0x38e9a0);},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x14b')]=Window_Options[_0x59e1cb('0x201')][_0x59e1cb('0x6a')],Window_Options['prototype'][_0x59e1cb('0x6a')]=function(_0x1647e9){const _0x261a6b=_0x59e1cb;if(_0x1647e9==='textSpeed')return!![];return VisuMZ[_0x261a6b('0x8f')][_0x261a6b('0x14b')][_0x261a6b('0xba')](this,_0x1647e9);},Window_Options[_0x59e1cb('0x201')]['textSpeedStatusText']=function(){const _0x889486=_0x59e1cb,_0x4dae36=this[_0x889486('0x203')](_0x889486('0x258'));return _0x4dae36>0xa?TextManager[_0x889486('0xc9')]:_0x4dae36;},VisuMZ['MessageCore'][_0x59e1cb('0x18c')]=Window_Options['prototype'][_0x59e1cb('0xd8')],Window_Options[_0x59e1cb('0x201')][_0x59e1cb('0xd8')]=function(_0x661656,_0x6411a8,_0x60ae6b){const _0x171697=_0x59e1cb;if(_0x661656===_0x171697('0x258'))return this[_0x171697('0x171')](_0x661656,_0x6411a8,_0x60ae6b);VisuMZ['MessageCore']['Window_Options_changeVolume'][_0x171697('0xba')](this,_0x661656,_0x6411a8,_0x60ae6b);},Window_Options[_0x59e1cb('0x201')][_0x59e1cb('0x171')]=function(_0x495c49,_0x23b75c,_0x5ccc10){const _0x1b1c2b=_0x59e1cb,_0x1b6f5f=this[_0x1b1c2b('0x203')](_0x495c49),_0x462c0e=0x1,_0x1ddfdd=_0x1b6f5f+(_0x23b75c?_0x462c0e:-_0x462c0e);if(_0x1ddfdd>0xb&&_0x5ccc10){if(_0x1b1c2b('0xb4')!==_0x1b1c2b('0x275'))this[_0x1b1c2b('0x77')](_0x495c49,0x1);else{function _0x33245f(){const _0x273c21=_0x1b1c2b;_0x45cc2f['x']-=_0x23817e[_0x273c21('0x1fc')];}}}else this['changeValue'](_0x495c49,_0x1ddfdd[_0x1b1c2b('0x5b')](0x1,0xb));},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x178')]=function(){const _0x46e0e8=_0x59e1cb;Window_Base[_0x46e0e8('0x201')][_0x46e0e8('0x178')][_0x46e0e8('0xba')](this),VisuMZ[_0x46e0e8('0x8f')][_0x46e0e8('0x21f')][_0x46e0e8('0x27b')][_0x46e0e8('0x9a')]&&this[_0x46e0e8('0x1ed')]();},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x1ed')]=function(){const _0x3d8977=_0x59e1cb;this[_0x3d8977('0x25c')]['x']=Math[_0x3d8977('0xf8')](this[_0x3d8977('0x7b')]/0x2),this[_0x3d8977('0x25c')][_0x3d8977('0xe9')]['x']=0.5,this[_0x3d8977('0x25c')][_0x3d8977('0x1ad')]['x']=Graphics[_0x3d8977('0x7b')];},VisuMZ[_0x59e1cb('0x8f')]['Window_Message_clearFlags']=Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x146')],Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x146')]=function(){const _0x15f190=_0x59e1cb;VisuMZ[_0x15f190('0x8f')][_0x15f190('0x76')][_0x15f190('0xba')](this),this[_0x15f190('0x1f9')](),this[_0x15f190('0x173')](),this[_0x15f190('0x273')](![]),this[_0x15f190('0x1d3')](_0x15f190('0x243')),this[_0x15f190('0xc2')](VisuMZ[_0x15f190('0x8f')][_0x15f190('0x21f')]['General']['MessageTextDelay']);},Window_Message['prototype'][_0x59e1cb('0x173')]=function(){const _0x4358e0=_0x59e1cb;this[_0x4358e0('0xfa')]($gameSystem[_0x4358e0('0x24a')]());},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0xb2')]=function(){return!![];},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0xc2')]=function(_0x46f065){const _0x2ca293=_0x59e1cb,_0x39871b=0xb-ConfigManager['textSpeed'];_0x46f065=Math[_0x2ca293('0xf8')](_0x46f065*_0x39871b),this[_0x2ca293('0x6')]=_0x46f065,this['_textDelay']=_0x46f065;},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x18a')]=Window_Message['prototype']['isTriggered'],Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0xa1')]=function(){const _0x5323c9=_0x59e1cb;return VisuMZ['MessageCore'][_0x5323c9('0x18a')]['call'](this)||Input[_0x5323c9('0x248')](VisuMZ[_0x5323c9('0x8f')][_0x5323c9('0x21f')][_0x5323c9('0x27b')][_0x5323c9('0x98')]);},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0xf9')]=Window_Message['prototype'][_0x59e1cb('0x27f')],Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x27f')]=function(){const _0x2d00fc=_0x59e1cb;let _0x56eec2=this['y'];VisuMZ[_0x2d00fc('0x8f')][_0x2d00fc('0xf9')]['call'](this);if(this[_0x2d00fc('0xc4')])this['y']=_0x56eec2;this[_0x2d00fc('0x1d6')]();},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x27a')]=Window_Message[_0x59e1cb('0x201')]['newPage'],Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x73')]=function(_0x32913a){const _0x200ae2=_0x59e1cb;this[_0x200ae2('0x1e4')](_0x32913a),VisuMZ[_0x200ae2('0x8f')][_0x200ae2('0x27a')]['call'](this,_0x32913a),this[_0x200ae2('0x104')]();},Window_Message[_0x59e1cb('0x201')]['onNewPageMessageCore']=function(_0x27e63f){const _0x303bab=_0x59e1cb;this[_0x303bab('0x16f')](_0x27e63f),this['updateDimensions']();},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x8a')]=Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x163')],Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x163')]=function(){const _0x5bf587=_0x59e1cb;VisuMZ[_0x5bf587('0x8f')][_0x5bf587('0x8a')]['call'](this),this[_0x5bf587('0x146')]();if(this[_0x5bf587('0x1d5')])this[_0x5bf587('0x8e')]();},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x3')]=function(){const _0x3629e5=_0x59e1cb;this[_0x3629e5('0x7b')]=$gameSystem[_0x3629e5('0x16')](),this[_0x3629e5('0x7b')]=Math[_0x3629e5('0x220')](Graphics['width'],this[_0x3629e5('0x7b')]);const _0x35bea3=$gameSystem[_0x3629e5('0x96')]();this[_0x3629e5('0x11f')]=SceneManager[_0x3629e5('0x254')][_0x3629e5('0x42')](_0x35bea3,![]),this[_0x3629e5('0x11f')]=Math[_0x3629e5('0x220')](Graphics[_0x3629e5('0x11f')],this[_0x3629e5('0x11f')]);if($gameTemp[_0x3629e5('0x3a')])this[_0x3629e5('0x235')]();},Window_Message['prototype'][_0x59e1cb('0x235')]=function(){const _0x31be2e=_0x59e1cb;this['x']=(Graphics[_0x31be2e('0x246')]-this[_0x31be2e('0x7b')])/0x2,$gameTemp[_0x31be2e('0x3a')]=undefined,this[_0x31be2e('0x1d6')]();},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x1e7')]=function(){const _0x5d89e5=_0x59e1cb,_0xb27c87={'x':this['x'],'y':this['y']};Window_Base['prototype'][_0x5d89e5('0x1e7')]['call'](this),this[_0x5d89e5('0x6c')](_0xb27c87);},Window_Message[_0x59e1cb('0x201')]['canMove']=function(){return!![];},Window_Message[_0x59e1cb('0x201')]['updateNameBoxMove']=function(_0x2511f0){const _0x3aab74=_0x59e1cb;this['_nameBoxWindow']&&(this[_0x3aab74('0x136')]['x']+=this['x']-_0x2511f0['x'],this[_0x3aab74('0x136')]['y']+=this['y']-_0x2511f0['y']);},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x112')]=function(_0xbe4dd,_0x498559){const _0x341ecb=_0x59e1cb;this[_0x341ecb('0x281')](this[_0x341ecb('0x114')]['x'],this[_0x341ecb('0x19e')]*(Graphics[_0x341ecb('0x9f')]-this[_0x341ecb('0x11f')])/0x2,this[_0x341ecb('0x114')][_0x341ecb('0x7b')],this[_0x341ecb('0x114')][_0x341ecb('0x11f')],_0xbe4dd,_0x498559);},Window_Message['prototype'][_0x59e1cb('0x13e')]=function(_0x1c625d){const _0x1235ac=_0x59e1cb,_0x48b653=Window_Base[_0x1235ac('0x201')][_0x1235ac('0x13e')]['call'](this,_0x1c625d);this['launchMessageCommonEvent'](_0x48b653);},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x7d')]=function(_0x29c247){const _0x2af4e9=_0x59e1cb;if($gameParty[_0x2af4e9('0x10b')]()){}else $gameMap[_0x2af4e9('0x225')](_0x29c247);},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x1c5')]=function(_0x3bea61){const _0x4fe608=_0x59e1cb;this[_0x4fe608('0x6')]--,this['_textDelayCount']<=0x0&&(this[_0x4fe608('0x4e')](_0x3bea61),Window_Base[_0x4fe608('0x201')][_0x4fe608('0x1c5')]['call'](this,_0x3bea61));},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x4e')]=function(_0x2a9625){const _0x26abfe=_0x59e1cb;this['_textDelayCount']=this[_0x26abfe('0x111')];if(this[_0x26abfe('0x111')]<=0x0)this[_0x26abfe('0x199')]=!![];},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x101')]=Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x1b0')],Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x1b0')]=function(_0x563e4f,_0x1fd51d){const _0xb4ff6c=_0x59e1cb;if(!_0x1fd51d['drawing']){if('QEtJm'===_0xb4ff6c('0x1f1'))Window_Base[_0xb4ff6c('0x201')][_0xb4ff6c('0x1b0')][_0xb4ff6c('0xba')](this,_0x563e4f,_0x1fd51d);else{function _0x2fb184(){const _0x14842a=_0xb4ff6c;if(!_0x3f95cf[_0x14842a('0x119')](_0x884959))return![];}}}else VisuMZ[_0xb4ff6c('0x8f')][_0xb4ff6c('0x101')][_0xb4ff6c('0xba')](this,_0x563e4f,_0x1fd51d);},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x16f')]=function(_0x64fd40){const _0x38bfc7=_0x59e1cb;let _0x36ea3c=_0x64fd40[_0x38bfc7('0x213')];_0x36ea3c=_0x36ea3c[_0x38bfc7('0x16a')](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x14e126=_0x38bfc7;return this[_0x14e126('0x18')](_0x36ea3c,!![],!![]),this['processAutoPosition'](_0x14e126('0x1b9')),'';}),_0x36ea3c=_0x36ea3c['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x5ab240=_0x38bfc7;if(_0x5ab240('0x21c')===_0x5ab240('0x250')){function _0x40ab3e(){const _0x3e034a=_0x5ab240;_0x24f876(_0x3e034a('0x1c6')['format'](_0x57ec86,_0x2f1299)),_0x26a018[_0x3e034a('0xd6')]();}}else return this[_0x5ab240('0x18')](_0x36ea3c,!![],![]),this[_0x5ab240('0x6b')](_0x5ab240('0x1b9')),'';}),_0x36ea3c=_0x36ea3c[_0x38bfc7('0x16a')](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x2f146a=_0x38bfc7;return this['processAutoSize'](_0x36ea3c,![],!![]),this[_0x2f146a('0x6b')]('none'),'';});if(SceneManager[_0x38bfc7('0x93')]())_0x36ea3c=_0x36ea3c['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x593023,_0x4374f8)=>{const _0x28d097=_0x38bfc7;return this[_0x28d097('0x18')](_0x36ea3c,!![],!![]),this[_0x28d097('0x6b')](_0x28d097('0x1ff'),Number(_0x4374f8)||0x1),'';}),_0x36ea3c=_0x36ea3c[_0x38bfc7('0x16a')](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x2961f5,_0x430ef4)=>{const _0x5567b1=_0x38bfc7;if(_0x5567b1('0x84')!==_0x5567b1('0x84')){function _0x5d8225(){const _0x2b186b=_0x5567b1;return this['_scene']&&this[_0x2b186b('0x254')][_0x2b186b('0x11e')]===_0x325c37;}}else return this['processAutoSize'](_0x36ea3c,!![],!![]),this['processAutoPosition'](_0x5567b1('0x1a5'),Number(_0x430ef4)||0x0),'';}),_0x36ea3c=_0x36ea3c[_0x38bfc7('0x16a')](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x3fa0d9,_0x13991d)=>{const _0x2d7ce1=_0x38bfc7;if(_0x2d7ce1('0x2')!=='hFbcM')return this[_0x2d7ce1('0x18')](_0x36ea3c,!![],!![]),this[_0x2d7ce1('0x6b')](_0x2d7ce1('0x185'),Number(_0x13991d)||0x0),'';else{function _0x205dc9(){const _0x156c73=_0x2d7ce1;return this[_0x156c73('0x1a3')];}}});else SceneManager[_0x38bfc7('0x13b')]()&&(_0x36ea3c=_0x36ea3c[_0x38bfc7('0x16a')](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x92fd8d,_0x103629)=>{const _0x3fbd7c=_0x38bfc7;if(_0x3fbd7c('0x240')===_0x3fbd7c('0x198')){function _0x537c9f(){const _0xf358d7=_0x3fbd7c;return _0x20ced4[_0xf358d7('0xc9')];}}else return this[_0x3fbd7c('0x18')](_0x36ea3c,!![],!![]),this[_0x3fbd7c('0x6b')](_0x3fbd7c('0x285'),0x0),'';}),_0x36ea3c=_0x36ea3c[_0x38bfc7('0x16a')](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x36e053,_0xc7085d)=>{const _0x4da560=_0x38bfc7;if(_0x4da560('0x1af')!==_0x4da560('0x18f'))return this[_0x4da560('0x18')](_0x36ea3c,!![],!![]),this[_0x4da560('0x6b')](_0x4da560('0x36'),Number(_0xc7085d)||0x1),'';else{function _0x3850cf(){const _0x20b54b=_0x4da560;if(!this[_0x20b54b('0xc4')])return;const _0x3555d2=_0x271816[_0x20b54b('0x254')];if(!_0x3555d2)return;if(!_0x3555d2[_0x20b54b('0x69')])return;const _0x2115a3=_0x3555d2[_0x20b54b('0x69')][_0x20b54b('0x53')](this['_autoPositionTarget']);if(!_0x2115a3)return;let _0x2ebf77=_0x2115a3['x'];_0x2ebf77-=this[_0x20b54b('0x7b')]/0x2,_0x2ebf77-=(_0x302adf[_0x20b54b('0x7b')]-_0x3cfb8d[_0x20b54b('0x246')])/0x2;let _0x79e99a=_0x2115a3['y'];_0x79e99a-=this[_0x20b54b('0x11f')],_0x79e99a-=(_0x1f57e3[_0x20b54b('0x11f')]-_0x22a160[_0x20b54b('0x9f')])/0x2,_0x2115a3[_0x20b54b('0x17e')]?_0x79e99a-=_0x2115a3[_0x20b54b('0x17e')]()['height']+0x18:_0x79e99a-=_0x2115a3[_0x20b54b('0x11f')]+0x8,this['x']=_0x523309[_0x20b54b('0xf8')](_0x2ebf77),this['y']=_0x2e962d[_0x20b54b('0xf8')](_0x79e99a),this[_0x20b54b('0x1d6')](),this[_0x20b54b('0x136')][_0x20b54b('0x27f')]();}}}),_0x36ea3c=_0x36ea3c[_0x38bfc7('0x16a')](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x26f250,_0xb41894)=>{const _0x46a33e=_0x38bfc7;return this[_0x46a33e('0x18')](_0x36ea3c,!![],!![]),this[_0x46a33e('0x6b')]('map\x20party',Number(_0xb41894)||0x0),'';}),_0x36ea3c=_0x36ea3c[_0x38bfc7('0x16a')](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x332052,_0x12e5fc)=>{const _0x68c34=_0x38bfc7;return this[_0x68c34('0x18')](_0x36ea3c,!![],!![]),this[_0x68c34('0x6b')](_0x68c34('0x16c'),Number(_0x12e5fc)||0x0),'';}));_0x64fd40[_0x38bfc7('0x213')]=_0x36ea3c;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x59e1cb('0x2d')]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x59e1cb('0x201')]['processAutoSize']=function(_0x3268b4,_0x5cf3de,_0x1f05ad){const _0x1a5347=_0x59e1cb;_0x3268b4=_0x3268b4[_0x1a5347('0x16a')](Window_Message[_0x1a5347('0xeb')],''),_0x3268b4=_0x3268b4[_0x1a5347('0x16a')](Window_Message['_autoPosRegExp'],''),this['_autoSizeCheck']=!![];const _0x4c62cb=this['textSizeEx'](_0x3268b4);if(_0x5cf3de){let _0x48341a=_0x4c62cb[_0x1a5347('0x7b')]+$gameSystem['windowPadding']()*0x2+0x6;const _0x2abc68=$gameMessage['faceName']()!=='',_0x11977c=ImageManager['faceWidth'],_0x2d52ba=0x14;_0x48341a+=_0x2abc68?_0x11977c+_0x2d52ba:0x4,$gameSystem[_0x1a5347('0x25d')](_0x48341a);}if(_0x1f05ad){if(_0x1a5347('0xf1')===_0x1a5347('0x253')){function _0x49e693(){const _0x3e1683=_0x1a5347;if(!this[_0x3e1683('0x1c8')])return;const _0x151640=0x8,_0x17da6f=this[_0x3e1683('0x1c8')],_0x2fb74d=this['x']+this['width'],_0x11d5f5=_0x280131[_0x3e1683('0x82')]((_0xbd9b1e[_0x3e1683('0x7b')]-_0xfceb03[_0x3e1683('0x246')])/0x2);_0x2fb74d>=_0x2b681f[_0x3e1683('0x246')]+_0x11d5f5-_0x17da6f[_0x3e1683('0x7b')]+_0x151640?_0x17da6f['x']=-_0x17da6f[_0x3e1683('0x7b')]-_0x151640:_0x17da6f['x']=this[_0x3e1683('0x7b')]+_0x151640,_0x17da6f['y']=this['height']/0x2-_0x17da6f[_0x3e1683('0x11f')]/0x2;}}else{let _0x3eff22=Math[_0x1a5347('0x94')](_0x4c62cb['height']/this[_0x1a5347('0x286')]());$gameSystem[_0x1a5347('0x65')](_0x3eff22);}}this[_0x1a5347('0x162')](),this[_0x1a5347('0x20c')]=![],this['_messagePositionReset']=!![];},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x162')]=function(){const _0xe90940=_0x59e1cb;this[_0xe90940('0x3')](),this[_0xe90940('0x27f')](),this['resetPositionX'](),this[_0xe90940('0x34')][_0xe90940('0x215')](),this['createContents']();},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x6b')]=function(_0x5e8ea6,_0x24cf89){const _0x25f28a=_0x59e1cb;switch(_0x5e8ea6[_0x25f28a('0xc0')]()[_0x25f28a('0xd7')]()){case _0x25f28a('0x1ff'):this[_0x25f28a('0xc4')]=$gameActors[_0x25f28a('0x24c')](_0x24cf89);break;case _0x25f28a('0x1a5'):this[_0x25f28a('0xc4')]=$gameParty[_0x25f28a('0x123')]()[_0x24cf89-0x1];break;case _0x25f28a('0x185'):this[_0x25f28a('0xc4')]=$gameTroop['members']()[_0x24cf89-0x1];break;case _0x25f28a('0x285'):this[_0x25f28a('0xc4')]=$gamePlayer;break;case _0x25f28a('0x36'):const _0x591aa3=$gameActors[_0x25f28a('0x24c')](_0x24cf89)[_0x25f28a('0x54')]();_0x591aa3===0x0?this[_0x25f28a('0xc4')]=$gamePlayer:this[_0x25f28a('0xc4')]=$gamePlayer[_0x25f28a('0x18b')]()[_0x591aa3-0x1];break;case _0x25f28a('0x1c1'):this[_0x25f28a('0xc4')]=$gamePlayer[_0x25f28a('0x18b')]()[_0x24cf89-0x1];break;case _0x25f28a('0x16c'):this[_0x25f28a('0xc4')]=$gameMap[_0x25f28a('0x100')](_0x24cf89);break;}if(this[_0x25f28a('0xc4')]){if(_0x25f28a('0x20f')!==_0x25f28a('0x1bf'))this[_0x25f28a('0x181')]();else{function _0x37f4ac(){const _0x1502db=_0x25f28a,_0x3fd197=_0x227301>=0x1?_0x218f6e['members']()[_0x139cfc-0x1]:null,_0x1cf00c=_0x3fd197?_0x3fd197['name']():'',_0x463509=_0x15c4ff(_0x3d410c[_0x1502db('0x8f')][_0x1502db('0x21f')][_0x1502db('0xab')][_0x1502db('0x1f4')]);return this[_0x1502db('0xb2')]()&&_0x463509!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x1502db('0x5a')](_0x463509,_0x1cf00c):_0x1cf00c;}}}},VisuMZ['MessageCore'][_0x59e1cb('0xfe')]=Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x15c')],Window_Message['prototype'][_0x59e1cb('0x15c')]=function(){const _0x5b08d3=_0x59e1cb;this[_0x5b08d3('0x181')](),VisuMZ[_0x5b08d3('0x8f')][_0x5b08d3('0xfe')]['call'](this);},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x181')]=function(){const _0x2ffd14=_0x59e1cb;if(!this[_0x2ffd14('0xc4')])return;const _0x5eecf8=SceneManager[_0x2ffd14('0x254')];if(!_0x5eecf8)return;if(!_0x5eecf8[_0x2ffd14('0x69')])return;const _0x5655f1=_0x5eecf8['_spriteset'][_0x2ffd14('0x53')](this[_0x2ffd14('0xc4')]);if(!_0x5655f1)return;let _0x3c842c=_0x5655f1['x'];_0x3c842c-=this['width']/0x2,_0x3c842c-=(Graphics[_0x2ffd14('0x7b')]-Graphics[_0x2ffd14('0x246')])/0x2;let _0x556e1a=_0x5655f1['y'];_0x556e1a-=this['height'],_0x556e1a-=(Graphics['height']-Graphics[_0x2ffd14('0x9f')])/0x2,_0x5655f1[_0x2ffd14('0x17e')]?_0x556e1a-=_0x5655f1[_0x2ffd14('0x17e')]()['height']+0x18:_0x556e1a-=_0x5655f1[_0x2ffd14('0x11f')]+0x8,this['x']=Math[_0x2ffd14('0xf8')](_0x3c842c),this['y']=Math[_0x2ffd14('0xf8')](_0x556e1a),this[_0x2ffd14('0x1d6')](),this['_nameBoxWindow'][_0x2ffd14('0x27f')]();},Window_Message[_0x59e1cb('0x201')][_0x59e1cb('0x8e')]=function(){const _0x2657e7=_0x59e1cb;this['_messagePositionReset']=![],this[_0x2657e7('0xc4')]=undefined,$gameSystem[_0x2657e7('0x20e')](),this[_0x2657e7('0x162')](),this[_0x2657e7('0x1dc')]=0x0;},Window_NameBox[_0x59e1cb('0x201')][_0x59e1cb('0xb2')]=function(){return![];},Window_NameBox[_0x59e1cb('0x201')]['resetTextColor']=function(){const _0x26d483=_0x59e1cb;Window_Base[_0x26d483('0x201')][_0x26d483('0x242')][_0x26d483('0xba')](this),this[_0x26d483('0xb3')](this[_0x26d483('0xf5')]());},Window_NameBox[_0x59e1cb('0x201')][_0x59e1cb('0xf5')]=function(){const _0x322930=_0x59e1cb,_0x43e412=VisuMZ[_0x322930('0x8f')][_0x322930('0x21f')][_0x322930('0x27b')][_0x322930('0xd9')];return ColorManager[_0x322930('0x249')](_0x43e412);},VisuMZ['MessageCore'][_0x59e1cb('0x23d')]=Window_NameBox[_0x59e1cb('0x201')]['updatePlacement'],Window_NameBox[_0x59e1cb('0x201')][_0x59e1cb('0x27f')]=function(){const _0x35430d=_0x59e1cb;VisuMZ[_0x35430d('0x8f')]['Window_NameBox_updatePlacement'][_0x35430d('0xba')](this),this[_0x35430d('0x15b')](),this['updateOffsetPosition'](),this[_0x35430d('0x1d6')](),this[_0x35430d('0x21a')]();},Window_NameBox['prototype'][_0x59e1cb('0x1f8')]=function(_0x2c9315){const _0x15cb87=_0x59e1cb;return _0x2c9315=_0x2c9315[_0x15cb87('0x16a')](/<LEFT>/gi,this[_0x15cb87('0x6f')][_0x15cb87('0x208')](this,0x0)),_0x2c9315=_0x2c9315['replace'](/<CENTER>/gi,this[_0x15cb87('0x6f')]['bind'](this,0x5)),_0x2c9315=_0x2c9315[_0x15cb87('0x16a')](/<RIGHT>/gi,this[_0x15cb87('0x6f')][_0x15cb87('0x208')](this,0xa)),_0x2c9315=_0x2c9315[_0x15cb87('0x16a')](/<POSITION:[ ](\d+)>/gi,(_0x3530d8,_0x3a7862)=>this['setRelativePosition'](parseInt(_0x3a7862))),_0x2c9315=_0x2c9315[_0x15cb87('0x16a')](/<\/LEFT>/gi,''),_0x2c9315=_0x2c9315['replace'](/<\/CENTER>/gi,''),_0x2c9315=_0x2c9315[_0x15cb87('0x16a')](/<\/RIGHT>/gi,''),Window_Base[_0x15cb87('0x201')][_0x15cb87('0x1f8')]['call'](this,_0x2c9315);},Window_NameBox[_0x59e1cb('0x201')][_0x59e1cb('0x6f')]=function(_0x515bab){const _0x4a09b1=_0x59e1cb;return this[_0x4a09b1('0xa5')]=_0x515bab,'';},Window_NameBox[_0x59e1cb('0x201')][_0x59e1cb('0x15b')]=function(){const _0x2b03e0=_0x59e1cb;if($gameMessage[_0x2b03e0('0xd1')]())return;this[_0x2b03e0('0xa5')]=this['_relativePosition']||0x0;const _0x4510aa=this[_0x2b03e0('0x5c')],_0x3c619e=Math[_0x2b03e0('0x82')](_0x4510aa[_0x2b03e0('0x7b')]*this[_0x2b03e0('0xa5')]/0xa);this['x']=_0x4510aa['x']+_0x3c619e-Math['floor'](this[_0x2b03e0('0x7b')]/0x2),this['x']=this['x'][_0x2b03e0('0x5b')](_0x4510aa['x'],_0x4510aa['x']+_0x4510aa['width']-this[_0x2b03e0('0x7b')]);},Window_NameBox['prototype'][_0x59e1cb('0x269')]=function(){const _0xbe763c=_0x59e1cb;if($gameMessage[_0xbe763c('0xd1')]())return;this[_0xbe763c('0xa5')]=this[_0xbe763c('0xa5')]||0x0;const _0x1125c7=VisuMZ[_0xbe763c('0x8f')][_0xbe763c('0x21f')][_0xbe763c('0x27b')][_0xbe763c('0x150')],_0x1ba29c=VisuMZ[_0xbe763c('0x8f')][_0xbe763c('0x21f')][_0xbe763c('0x27b')][_0xbe763c('0x272')],_0x44162e=(0x5-this[_0xbe763c('0xa5')])/0x5;this['x']+=Math[_0xbe763c('0x82')](_0x1125c7*_0x44162e),this['y']+=_0x1ba29c;},Window_NameBox[_0x59e1cb('0x201')]['updateOverlappingY']=function(){const _0x2d2fba=_0x59e1cb,_0x39603d=this[_0x2d2fba('0x5c')],_0x4b5f63=_0x39603d['y'],_0x52625a=VisuMZ[_0x2d2fba('0x8f')][_0x2d2fba('0x21f')][_0x2d2fba('0x27b')][_0x2d2fba('0x272')];if(_0x4b5f63>this['y']&&_0x4b5f63<this['y']+this[_0x2d2fba('0x11f')]-_0x52625a){if(_0x2d2fba('0x125')!==_0x2d2fba('0x125')){function _0x32ba89(){return'';}}else this['y']=_0x39603d['y']+_0x39603d['height'];}},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x145')]=Window_NameBox['prototype']['refresh'],Window_NameBox['prototype'][_0x59e1cb('0x31')]=function(){const _0x2334c2=_0x59e1cb;this[_0x2334c2('0xa5')]=0x0,VisuMZ[_0x2334c2('0x8f')][_0x2334c2('0x145')][_0x2334c2('0xba')](this);},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x56')]=function(){return![];},Window_ChoiceList['prototype'][_0x59e1cb('0xb2')]=function(){return!![];},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x286')]=function(){const _0x350236=_0x59e1cb;return $gameSystem[_0x350236('0x278')]();},Window_ChoiceList[_0x59e1cb('0x201')]['maxCols']=function(){const _0x4acf9b=_0x59e1cb;return $gameSystem[_0x4acf9b('0xe6')]();},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x120')]=function(){const _0x54f168=_0x59e1cb;this[_0x54f168('0x24')](),this[_0x54f168('0x31')](),this[_0x54f168('0x20d')](),this[_0x54f168('0x13')](),this[_0x54f168('0x9')]();},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x31')]=function(){const _0x5ba13c=_0x59e1cb;this[_0x5ba13c('0x156')](),this[_0x5ba13c('0x13c')](),this['_messageWindow']&&(this[_0x5ba13c('0x27f')](),this[_0x5ba13c('0xe1')]()),this['createContents'](),Window_Selectable['prototype'][_0x5ba13c('0x31')][_0x5ba13c('0xba')](this);},Window_ChoiceList['prototype'][_0x59e1cb('0x13c')]=function(){const _0x3b60a6=_0x59e1cb,_0xff0067=$gameMessage['choices']();let _0x113bfa=0x0;for(const _0x19ab53 of _0xff0067){if(_0x3b60a6('0x27c')!==_0x3b60a6('0x27c')){function _0x4a820c(){const _0xe8d94d=_0x3b60a6,_0x4f7d0c=_0x4954e7['parse']('['+_0x657e87['$1'][_0xe8d94d('0x7f')](/\d+/g)+']');for(const _0x30a722 of _0x4f7d0c){if(_0x6e4e96['value'](_0x30a722))return!![];}return![];}}else{if(this[_0x3b60a6('0x1c4')](_0x19ab53)){const _0x440f26=_0x19ab53,_0x386ed0=this['isChoiceEnabled'](_0x19ab53);this[_0x3b60a6('0x47')](_0x440f26,_0x3b60a6('0xbb'),_0x386ed0,_0x113bfa);}_0x113bfa++;}}},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x1c4')]=function(_0x46d485){const _0x418c22=_0x59e1cb;if(_0x46d485['match'](/<HIDE>/i))return![];if(_0x46d485[_0x418c22('0x7f')](/<SHOW>/i))return!![];if(_0x46d485[_0x418c22('0x7f')](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x145383=JSON['parse']('['+RegExp['$1'][_0x418c22('0x7f')](/\d+/g)+']');for(const _0x41dbd5 of _0x145383){if(_0x418c22('0x23b')===_0x418c22('0x23b')){if(!$gameSwitches[_0x418c22('0x119')](_0x41dbd5))return![];}else{function _0x523c05(){const _0xfc21e2=_0x418c22;_0x1e2785=_0x2e1327[_0xfc21e2('0x16a')](/\x1bV\[(\d+)\]/gi,(_0x4e1d41,_0x3899ef)=>this[_0xfc21e2('0x19')](_0x1b71eb(_0x324763[_0xfc21e2('0x119')](_0x25e378(_0x3899ef)))));}}}return!![];}if(_0x46d485['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16211f=JSON[_0x418c22('0x184')]('['+RegExp['$1'][_0x418c22('0x7f')](/\d+/g)+']');for(const _0x1cc925 of _0x16211f){if(!$gameSwitches[_0x418c22('0x119')](_0x1cc925))return![];}return!![];}if(_0x46d485[_0x418c22('0x7f')](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x50232e=JSON[_0x418c22('0x184')]('['+RegExp['$1'][_0x418c22('0x7f')](/\d+/g)+']');for(const _0x2f19cb of _0x50232e){if(_0x418c22('0xc1')==='ZEwDC'){if($gameSwitches[_0x418c22('0x119')](_0x2f19cb))return!![];}else{function _0x2f166e(){const _0x49d94f=_0x418c22;return this[_0x49d94f('0xf4')]();}}}return![];}if(_0x46d485[_0x418c22('0x7f')](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x352c7f=JSON[_0x418c22('0x184')]('['+RegExp['$1'][_0x418c22('0x7f')](/\d+/g)+']');for(const _0x3e4d25 of _0x352c7f){if(!$gameSwitches[_0x418c22('0x119')](_0x3e4d25))return!![];}return![];}if(_0x46d485[_0x418c22('0x7f')](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ae396=JSON[_0x418c22('0x184')]('['+RegExp['$1'][_0x418c22('0x7f')](/\d+/g)+']');for(const _0x2418e9 of _0x4ae396){if(_0x418c22('0x197')===_0x418c22('0x22f')){function _0x1963f9(){const _0xde0f=_0x418c22;return _0x5af92e[_0xde0f('0x236')](_0x282c82,this[_0xde0f('0x127')]);}}else{if(!$gameSwitches[_0x418c22('0x119')](_0x2418e9))return!![];}}return![];}if(_0x46d485[_0x418c22('0x7f')](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x52c9e9=JSON['parse']('['+RegExp['$1'][_0x418c22('0x7f')](/\d+/g)+']');for(const _0x116cbc of _0x52c9e9){if($gameSwitches[_0x418c22('0x119')](_0x116cbc))return![];}return!![];}return!![];},Window_ChoiceList['prototype'][_0x59e1cb('0x24f')]=function(_0x55029d){const _0x179847=_0x59e1cb;if(_0x55029d['match'](/<DISABLE>/i))return![];if(_0x55029d['match'](/<ENABLE>/i))return!![];if(_0x55029d[_0x179847('0x7f')](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x179847('0x26c')===_0x179847('0x172')){function _0x2618e3(){const _0x12abce=_0x179847;this[_0x12abce('0x181')]();}}else{const _0x5e9907=JSON[_0x179847('0x184')]('['+RegExp['$1'][_0x179847('0x7f')](/\d+/g)+']');for(const _0x3f387d of _0x5e9907){if(_0x179847('0x247')!==_0x179847('0x26e')){if(!$gameSwitches[_0x179847('0x119')](_0x3f387d))return![];}else{function _0x24f694(){const _0x5b566c=_0x179847;_0x4024d3[_0x4297e9]=this[_0x5b566c('0x34')][_0x37116e];}}}return!![];}}if(_0x55029d[_0x179847('0x7f')](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x433f2c=JSON[_0x179847('0x184')]('['+RegExp['$1'][_0x179847('0x7f')](/\d+/g)+']');for(const _0x302f4e of _0x433f2c){if(_0x179847('0x151')===_0x179847('0xaf')){function _0x3c23c3(){const _0xacf4b8=_0x179847;this[_0xacf4b8('0xc4')]=_0x1951e1[_0xacf4b8('0x18b')]()[_0x53e0fe-0x1];}}else{if(!$gameSwitches[_0x179847('0x119')](_0x302f4e))return![];}}return!![];}if(_0x55029d[_0x179847('0x7f')](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2636d1=JSON[_0x179847('0x184')]('['+RegExp['$1'][_0x179847('0x7f')](/\d+/g)+']');for(const _0x206a64 of _0x2636d1){if(_0x179847('0x9d')!==_0x179847('0x1dd')){if($gameSwitches[_0x179847('0x119')](_0x206a64))return!![];}else{function _0x4a8df6(){this['_interpreter']=null;}}}return![];}if(_0x55029d[_0x179847('0x7f')](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3cc176=JSON[_0x179847('0x184')]('['+RegExp['$1'][_0x179847('0x7f')](/\d+/g)+']');for(const _0x25e0ca of _0x3cc176){if(_0x179847('0x164')===_0x179847('0x164')){if(!$gameSwitches[_0x179847('0x119')](_0x25e0ca))return!![];}else{function _0x11fc8b(){const _0x38c470=_0x179847;_0x17a492[_0x38c470('0x238')](_0x47e0a1,_0x2f68bd);const _0x2ca9e4=_0x56ddca[_0x38c470('0xbd')]||_0x3d0b22[_0x38c470('0x278')]()||0x1,_0x136210=_0x32e125[_0x38c470('0x131')]||_0x27e3f6[_0x38c470('0xa9')]()||0x1,_0x2a96fe=_0x414109[_0x38c470('0xcf')]||_0x5f53f7[_0x38c470('0xe6')]()||0x1,_0x2d4823=_0x44b29c[_0x38c470('0x202')][_0x38c470('0xc0')]()||'default';_0x164ba1[_0x38c470('0x194')](_0x2ca9e4),_0x17ffaf[_0x38c470('0x1a6')](_0x136210),_0xee33c9['setChoiceListMaxColumns'](_0x2a96fe),_0x5a52d5['setChoiceListTextAlign'](_0x2d4823);}}}return![];}if(_0x55029d[_0x179847('0x7f')](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d1084=JSON[_0x179847('0x184')]('['+RegExp['$1'][_0x179847('0x7f')](/\d+/g)+']');for(const _0x25fae0 of _0x5d1084){if(_0x179847('0xa')===_0x179847('0xa')){if(!$gameSwitches[_0x179847('0x119')](_0x25fae0))return!![];}else{function _0x25184e(){const _0x448fe3=_0x179847;this[_0x448fe3('0x1fa')]();}}}return![];}if(_0x55029d[_0x179847('0x7f')](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe205e9=JSON[_0x179847('0x184')]('['+RegExp['$1'][_0x179847('0x7f')](/\d+/g)+']');for(const _0x5393a2 of _0xe205e9){if($gameSwitches[_0x179847('0x119')](_0x5393a2))return![];}return!![];}return!![];},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0xb1')]=Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x27f')],Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x27f')]=function(){const _0x4d06ca=_0x59e1cb;VisuMZ[_0x4d06ca('0x8f')][_0x4d06ca('0xb1')][_0x4d06ca('0xba')](this),this[_0x4d06ca('0x1d6')]();},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0xe1')]=function(){const _0x3493bf=_0x59e1cb;if(!this[_0x3493bf('0x1c8')])return;const _0x29e5f0=0x8,_0x35af5d=this[_0x3493bf('0x1c8')],_0x5e4789=this['x']+this[_0x3493bf('0x7b')],_0xc8be51=Math['floor']((Graphics[_0x3493bf('0x7b')]-Graphics[_0x3493bf('0x246')])/0x2);if(_0x5e4789>=Graphics[_0x3493bf('0x246')]+_0xc8be51-_0x35af5d[_0x3493bf('0x7b')]+_0x29e5f0)_0x35af5d['x']=-_0x35af5d[_0x3493bf('0x7b')]-_0x29e5f0;else{if(_0x3493bf('0x263')==='lptCj'){function _0x12b968(){const _0xf93e2e=_0x3493bf;this['_moveDuration']>0x0&&(this[_0xf93e2e('0x1c3')]()&&(this['x']=this[_0xf93e2e('0x236')](this['x'],this[_0xf93e2e('0x1fd')]),this['y']=this[_0xf93e2e('0x236')](this['y'],this['_moveTargetY']),this[_0xf93e2e('0x7b')]=this[_0xf93e2e('0x236')](this[_0xf93e2e('0x7b')],this[_0xf93e2e('0x9c')]),this[_0xf93e2e('0x11f')]=this['applyMoveEasing'](this['height'],this['_moveTargetHeight']),this[_0xf93e2e('0x1d6')]()),this[_0xf93e2e('0x219')]--);}}else _0x35af5d['x']=this['width']+_0x29e5f0;}_0x35af5d['y']=this[_0x3493bf('0x11f')]/0x2-_0x35af5d[_0x3493bf('0x11f')]/0x2;},VisuMZ[_0x59e1cb('0x8f')][_0x59e1cb('0x61')]=Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x1fe')],Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x1fe')]=function(){const _0x40e56b=_0x59e1cb;return this['_messageWindow']?this[_0x40e56b('0xf4')]():VisuMZ[_0x40e56b('0x8f')][_0x40e56b('0x61')][_0x40e56b('0xba')](this);},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0xf4')]=function(){const _0x49810f=_0x59e1cb,_0xb2f863=$gameMessage[_0x49810f('0xc7')]();if(_0xb2f863===0x1){if(_0x49810f('0x266')!=='kGzro'){function _0x52d6ff(){const _0x312bfa=_0x49810f;this[_0x312bfa('0x223')](),this[_0x312bfa('0x173')](),this[_0x312bfa('0x14a')](_0x3a9a6d);}}else return(Graphics['boxWidth']-this[_0x49810f('0x1b7')]())/0x2;}else{if(_0xb2f863===0x2){if(_0x49810f('0x1fb')!==_0x49810f('0x60'))return this[_0x49810f('0x5c')]['x']+this[_0x49810f('0x5c')][_0x49810f('0x7b')]-this['windowWidth']();else{function _0xd5d424(){const _0x1dbaca=_0x49810f;_0x2487b8[_0x1dbaca('0x37')](this[_0x1dbaca('0x32')]()),this[_0x1dbaca('0x5c')][_0x1dbaca('0x163')](),this[_0x1dbaca('0x245')]();}}}else return this['_messageWindow']['x'];}},Window_ChoiceList[_0x59e1cb('0x201')]['windowWidth']=function(){const _0x4cdca1=_0x59e1cb,_0x402989=(this['maxChoiceWidth']()+this[_0x4cdca1('0x106')]())*this[_0x4cdca1('0x280')]()+this['padding']*0x2;return Math[_0x4cdca1('0x220')](_0x402989,Graphics['width']);},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0xbf')]=function(){const _0x440889=_0x59e1cb,_0x57cabd=Math[_0x440889('0x94')]($gameMessage[_0x440889('0xd3')]()[_0x440889('0xaa')]/this[_0x440889('0x280')]());return Math['min'](_0x57cabd,this[_0x440889('0x115')]());},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x115')]=function(){const _0x31313b=_0x59e1cb,_0x13627d=this[_0x31313b('0x5c')],_0x40b230=_0x13627d?_0x13627d['y']:0x0,_0x50edaa=_0x13627d?_0x13627d[_0x31313b('0x11f')]:0x0,_0x5d4819=Graphics[_0x31313b('0x9f')]/0x2;return _0x40b230<_0x5d4819&&_0x40b230+_0x50edaa>_0x5d4819?0x4:$gameSystem[_0x31313b('0xa9')]();},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0x142')]=function(){const _0x5a07ce=_0x59e1cb;let _0xe4e590=0x60;for(const _0x2c4a9a of this[_0x5a07ce('0x19c')]){const _0x28941d=_0x2c4a9a['name'],_0x2f2eea=this['textSizeEx'](_0x28941d)['width'],_0x4d6f1c=Math[_0x5a07ce('0x94')](_0x2f2eea)+this[_0x5a07ce('0x57')]()*0x2;if(_0xe4e590<_0x4d6f1c){if('JoFBO'===_0x5a07ce('0x9b')){function _0x5b9047(){const _0x369ee7=_0x5a07ce;return _0x1bf31e[this[_0x369ee7('0x20a')]];}}else _0xe4e590=_0x4d6f1c;}}return _0xe4e590;},Window_ChoiceList[_0x59e1cb('0x201')][_0x59e1cb('0xdd')]=function(_0x1d9101){const _0x2aa14b=_0x59e1cb,_0x26b6a9=this[_0x2aa14b('0x1d2')](_0x1d9101),_0x388100=$gameSystem[_0x2aa14b('0x2f')]()!=='default'?'<%1>'[_0x2aa14b('0x5a')]($gameSystem[_0x2aa14b('0x2f')]()):'',_0x33613c=_0x388100+this[_0x2aa14b('0x1d8')](_0x1d9101);this[_0x2aa14b('0x212')](this[_0x2aa14b('0xf0')](_0x1d9101)),this[_0x2aa14b('0x62')](_0x33613c,_0x26b6a9['x'],_0x26b6a9['y'],_0x26b6a9[_0x2aa14b('0x7b')]);},Window_ChoiceList['prototype']['callOkHandler']=function(){const _0x91f962=_0x59e1cb;$gameMessage[_0x91f962('0x37')](this[_0x91f962('0x32')]()),this[_0x91f962('0x5c')][_0x91f962('0x163')](),this[_0x91f962('0x245')]();};
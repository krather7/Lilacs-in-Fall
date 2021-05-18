//=============================================================================
// VisuStella MZ - Button Common Events
// VisuMZ_4_ButtonCmnEvts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ButtonCmnEvts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ButtonCommonEvents = VisuMZ.ButtonCommonEvents || {};
VisuMZ.ButtonCommonEvents.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [ButtonCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Button_Common_Events_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, there's only a few keys on your keyboard that perform any kind
 * of action when pressed on the map screen. This plugin allows you to bind
 * Common Events to various other keys to expand the keyboard's functionality.
 * Plugin Commands can be used during the middle of a playthrough to change up
 * which Common Events are bound to each key as well, allowing you, the game
 * dev, to have full control over which keys can be used during the map screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to bind Common Events to the number keys, alphabet keys,
 *   symbols, numpad, and more.
 * * Change which Common Events run during a playthrough.
 * * Clear Common Events from keys to remove any bindings.
 * * Show visible buttons on the screen to indicate which buttons can be
 *   pressed on the keyboard (or with the mouse on the screen).
 * * Apply icons to the visible buttons and change them over time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * alters keystrokes or makes use of them through a different manner. If you
 * are using another plugin that does something with keystrokes on the map
 * screen, the likelihood of clashing can occur if these plugins utilize the
 * same keystrokes and we will not be held accountable for that as it is
 * something within your power to change by simply picking different keys.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the Plugin Parameters, you will see a list of all the keys that you can
 * bind to a Common Event. If that number is something other than 0, then the
 * number associated with it will be the Common Event that will run. If you
 * assign it to a Common Event ID that does not exist, you will get an error so
 * please be wary of that.
 *
 * You may also notice that some of the keys have in parenthesis a word like
 * (OK) or (Cancel) next to them. What this means is that those keys already
 * have a function assigned to them by the game. If you assign a Common Event
 * to these keys and the 'Forbid Default Bound Keys?' Plugin Parameter is set
 * to 'false', then the native function of the key will be removed in favor of
 * the Common Event you've assigned.
 *
 * Here is a list of the keys that already have a command assigned:
 *
 * Key - What they're assigned to
 *   - Q         - Assigned to PageUp
 *   - W         - Assigned to PageDown
 *   - Shift     - Assigned to Dash
 *   - Z         - Assigned to OK
 *   - X         - Assigned to Cancel
 *   - Space     - Assigned to OK
 *   - Left      - Assigned to moving left
 *   - Up        - Assigned to moving up
 *   - Right     - Assigned to moving right
 *   - Down      - Assigned to moving down
 *   - Insert    - Assigned to Cancel
 *   - Page Up   - Assigned to PageUp
 *   - Page Down - Assigned to PageDown
 *   - Numpad 0  - Assigned to Cancel
 *   - Numpad 2  - Assigned to moving down
 *   - Numpad 4  - Assigned to moving left
 *   - Numpad 6  - Assigned to moving right
 *   - Numpad 8  - Assigned to moving up
 *
 * Once again, if you assign Common Events to these keys, the Common Event will
 * removing the binding the key had natively. However, this will only apply
 * while the player is in the field map and if the 'Forbid Default Bound Keys?'
 * Plugin Parameter is set to 'false'. Being inside of a menu or battle system
 * will restore the previously native functions.
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
 * System: Change Button Common Event
 * - Change the Common Event bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to change.
 *
 *   Common Event ID:
 *   - Change the Common Event bound to specific key(s).
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 *
 * ---
 * 
 * System: Change Visibility
 * - Determines whether or not buttons are shown on screen.
 * 
 *   Visible?
 *   - Show or hide the visible Button Common Events on the screen?
 * 
 * ---
 *
 * System: Clear All Button Common Events
 * - Clears Common Events from all keys.
 *
 * ---
 *
 * System: Clear Button Common Event
 * - Clears any Common Events bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to clear.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the Plugin Parameters for this plugin. They manage all the key
 * bindings and which Common Events are linked by default to which keys. These
 * links are not permanent as they can be changed/cleared with Plugin Commands.
 *
 * ---
 *
 * Restriction
 * 
 *   Forbid Default Bound Keys?:
 *   - Forbid already bound input keys?
 *   - Allowing them may cause clashes.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show On Screen?:
 *   - Show buttons on screen by default?
 * 
 *   Change Tone on Hover?:
 *   - Change the tone of the button on hover?
 * 
 *   Hover Tone:
 *   - Tone settings upon hovering.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Button Width:
 *   - The width of the visible button on screen.
 * 
 *   Button Height:
 *   - The height of the visible button on screen.
 * 
 *   Picture Filename:
 *   - Picture used as a button background.
 *   - If left empty, ignore drawing a picture.
 * 
 *   Undeclared Icons:
 *   - If a Button Common Event doesn't have an assigned icon,
 *     use one of these instead.
 * 
 *   JS: Draw Data:
 *   - JavaScript code that determines how to draw the visible button.
 *
 * ---
 * 
 * Button Positions
 * 
 *   JS: Bottom Point:
 *   JS: Above Point:
 *   JS: Left Point:
 *   JS: Right Point:
 *   - The X and Y coordinates for where the specific side buttons start.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Key Settings
 * ============================================================================
 *
 * The Key Settings allow you to adjust the Common Event you want to bind to
 * each keyboard key along with whether or not you want the said key to appear
 * visibly on the screen.
 *
 * ---
 *
 * Key Settings
 * 
 *   Common Event ID:
 *   - The default common event tied to this key.
 *   - Leave it at 0 for no common event.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show Button?:
 *   - Show the button visibly on the screen?
 * 
 *   Requires Bind?:
 *   - If the button is shown, does it require a Common Event to be shown?
 * 
 *   Button Label:
 *   - What text do you want to display as the button label?
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 * 
 *   JS: Position:
 *   - The X and Y coordinates for where this button is positioned.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeButtonCommonEvent
 * @text System: Change Button Common Event
 * @desc Change the Common Event bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to change.
 * @default []
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Change the Common Event bound to specific key(s).
 * @default 0
 *
 * @arg Icon:num
 * @text Button Icon
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ButtonCommonEventsVisibility
 * @text System: Change Visibility
 * @desc Determines whether or not buttons are shown on screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the visible Button Common Events on the screen?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearAllButtonCommonEvents
 * @text System: Clear All Button Common Events
 * @desc Clears Common Events from all keys.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEvent
 * @text System: Clear Button Common Event
 * @desc Clears any Common Events bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to clear.
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
 * @param ButtonCommonEvents
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
 * @desc Adjust the general settings for this plugin.
 * @default {"ForbidInputKeys:eval":"true","Buttons":"","ShowButtonsOnScreen:eval":"true","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","ButtonWidth:num":"60","ButtonHeight:num":"60","ButtonFilename:str":"","IconsUsed:arraynum":"[\"160\",\"161\",\"162\",\"163\",\"164\",\"165\"]","DrawJS:func":"\"// Declare Constants\\nconst w = this.width;\\nconst h = this.height;\\n\\n// Draw Background\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\\n\\n// Draw Picture\\nif (this.pictureBitmap()) {\\n    const picBitmap = this.pictureBitmap();\\n    const pw = picBitmap.width;\\n    const ph = picBitmap.height;\\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\\n}\\n\\n// Draw Icon\\nconst iconIndex = this.buttonIcon();\\nconst iconBitmap = ImageManager.loadSystem(\\\"IconSet\\\");\\nconst iw = ImageManager.iconWidth;\\nconst ih = ImageManager.iconHeight;\\nconst ix = (iconIndex % 16) * iw;\\nconst iy = Math.floor(iconIndex / 16) * ih;\\nconst jw = Math.floor(this.width / iw) * iw;\\nconst jh = Math.floor(this.height / ih) * ih;\\nconst jx = Math.floor((this.width - jw) / 2);\\nconst jy = Math.floor((this.height - jh) / 2);\\nthis.bitmap._context.imageSmoothingEnabled = false;\\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\\nthis.bitmap._context.imageSmoothingEnabled = true;\\n\\n// Draw Button Label\\nconst text = this.buttonLabel();\\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');\"","Positions":"","BottomPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\\nlet y = container.height - buttonHeight;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","AbovePointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\\nlet y = container.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","LeftPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","RightPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.width;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param NumberKeys
 * @text Number Keys
 *
 * @param KeyCode49:struct
 * @text Key: 1
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 0;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode50:struct
 * @text Key: 2
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode51:struct
 * @text Key: 3
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 2;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode52:struct
 * @text Key: 4
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 3;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode53:struct
 * @text Key: 5
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 4;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode54:struct
 * @text Key: 6
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 5;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode55:struct
 * @text Key: 7
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 6;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode56:struct
 * @text Key: 8
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 7;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode57:struct
 * @text Key: 9
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 8;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode48:struct
 * @text Key: 0
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 9;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param LetterKeys
 * @text Letter Keys
 *
 * @param KeyCode65:struct
 * @text Key: A
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"A","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode66:struct
 * @text Key: B
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"B","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode67:struct
 * @text Key: C
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"C","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode68:struct
 * @text Key: D
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"D","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode69:struct
 * @text Key: E
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"E","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode70:struct
 * @text Key: F
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"F","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode71:struct
 * @text Key: G
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"G","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode72:struct
 * @text Key: H
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"H","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode73:struct
 * @text Key: I
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"I","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode74:struct
 * @text Key: J
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"J","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode75:struct
 * @text Key: K
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"K","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode76:struct
 * @text Key: L
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"L","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode77:struct
 * @text Key: M
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"M","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode78:struct
 * @text Key: N
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"N","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode79:struct
 * @text Key: O
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"O","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode80:struct
 * @text Key: P
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"P","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode81:struct
 * @text Key: Q (PgUp)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Q","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode82:struct
 * @text Key: R
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"R","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode83:struct
 * @text Key: S
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"S","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode84:struct
 * @text Key: T
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"T","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode85:struct
 * @text Key: U
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"U","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode86:struct
 * @text Key: V
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"V","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode87:struct
 * @text Key: W (PgDn)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"W","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode88:struct
 * @text Key: X (Cancel)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"X","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode89:struct
 * @text Key: Y
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Y","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode90:struct
 * @text Key: Z (OK)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Z","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param SymbolKeys
 * @text Symbol Keys
 *
 * @param KeyCode192:struct
 * @text Key: ` ~
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"~","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x - buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode189:struct
 * @text Key: - _
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 10;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode187:struct
 * @text Key: = +
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 11;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode219:struct
 * @text Key: [ {
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"[","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode221:struct
 * @text Key: ] }
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"]","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 11;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode220:struct
 * @text Key: \ |
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\\","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 12;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode186:struct
 * @text Key: ; :
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":";","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode222:struct
 * @text Key: ' "
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\"","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode188:struct
 * @text Key: , <
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode190:struct
 * @text Key: . >
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode191:struct
 * @text Key: / ?
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"?","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param MiscKeys
 * @text Misc Keys
 *
 * @param KeyCode32:struct
 * @text Key: Space (OK)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Space","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode37:struct
 * @text Key: Left (Left)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 3;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode38:struct
 * @text Key: Up (Up)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"^","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode39:struct
 * @text Key: Right (Right)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">>","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 1;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode40:struct
 * @text Key: Down (Down)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"v","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode45:struct
 * @text Key: Insert
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Ins","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode46:struct
 * @text Key: Delete
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Del","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode36:struct
 * @text Key: Home
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Home","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode35:struct
 * @text Key: End
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"End","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode33:struct
 * @text Key: Page Up (PgUp)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgUp","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode34:struct
 * @text Key: Page Down (PgDn)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgDn","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param NumPadKeys
 * @text NumPad Keys
 *
 * @param KeyCode96:struct
 * @text Key: NumPad 0 (Cancel)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode97:struct
 * @text Key: NumPad 1
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode98:struct
 * @text Key: NumPad 2 (Down)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode99:struct
 * @text Key: NumPad 3
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode100:struct
 * @text Key: NumPad 4 (Left)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode101:struct
 * @text Key: NumPad 5
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode102:struct
 * @text Key: NumPad 6 (Right)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode103:struct
 * @text Key: NumPad 7
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode104:struct
 * @text Key: NumPad 8 (Up)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode105:struct
 * @text Key: NumPad 9
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode110:struct
 * @text Key: NumPad .
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":".","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode107:struct
 * @text Key: NumPad +
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode109:struct
 * @text Key: NumPad -
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode106:struct
 * @text Key: NumPad *
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"*","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode111:struct
 * @text Key: NumPad /
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"/","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
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
 * @param ForbidInputKeys:eval
 * @text Forbid Default Keys?
 * @parent Forbidden
 * @type boolean
 * @on Forbid
 * @off Allow
 * @desc Forbid already bound input keys?
 * Allowing them may cause clashes.
 * @default true
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButtonsOnScreen:eval
 * @text Show On Screen?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show buttons on screen by default?
 * @default true
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Buttons
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the button on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param ButtonWidth:num
 * @text Button Width
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The width of the visible button on screen.
 * @default 80
 *
 * @param ButtonHeight:num
 * @text Button Height
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The height of the visible button on screen.
 * @default 80
 *
 * @param ButtonFilename:str
 * @text Picture Filename
 * @parent Buttons
 * @type file
 * @dir img/pictures/
 * @desc Picture used as a button background.
 * If left empty, ignore drawing a picture.
 * @default 
 *
 * @param IconsUsed:arraynum
 * @text Undeclared Icons
 * @parent Buttons
 * @type string[]
 * @desc If a Button Common Event doesn't have an assigned icon, use one of these instead.
 * @default ["160","161","162","163","164","165"]
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @parent Buttons
 * @type note
 * @desc JavaScript code that determines how to draw the visible button.
 * @default "// Declare Constants\nconst w = this.width;\nconst h = this.height;\n\n// Draw Background\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\n\n// Draw Picture\nif (this.pictureBitmap()) {\n    const picBitmap = this.pictureBitmap();\n    const pw = picBitmap.width;\n    const ph = picBitmap.height;\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\n}\n\n// Draw Icon\nconst iconIndex = this.buttonIcon();\nconst iconBitmap = ImageManager.loadSystem(\"IconSet\");\nconst iw = ImageManager.iconWidth;\nconst ih = ImageManager.iconHeight;\nconst ix = (iconIndex % 16) * iw;\nconst iy = Math.floor(iconIndex / 16) * ih;\nconst jw = Math.floor(this.width / iw) * iw;\nconst jh = Math.floor(this.height / ih) * ih;\nconst jx = Math.floor((this.width - jw) / 2);\nconst jy = Math.floor((this.height - jh) / 2);\nthis.bitmap._context.imageSmoothingEnabled = false;\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\nthis.bitmap._context.imageSmoothingEnabled = true;\n\n// Draw Button Label\nconst text = this.buttonLabel();\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');"
 * 
 * @param Positions
 * @text Button Positions
 *
 * @param BottomPointJS:func
 * @text JS: Bottom Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the bottom buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\nlet y = container.height - buttonHeight;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param AbovePointJS:func
 * @text JS: Above Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the uppoer buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\nlet y = container.y;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param LeftPointJS:func
 * @text JS: Left Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the left-side buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.x;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param RightPointJS:func
 * @text JS: Right Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the right-side buttons end.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.width;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Key Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeySettings:
 *
 * @param CommonEventID:num
 * @text Common Event ID
 * @parent NeededData
 * @type common_event
 * @desc The default common event tied to this key.
 * Leave it at 0 for no common event.
 * @default 0
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButton:eval
 * @text Show Button?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the button visibly on the screen?
 * @default false
 *
 * @param ShowOnlyIfCePresent:eval
 * @text Requires Bind?
 * @parent ShowButton:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If the button is shown, does it require a Common Event to be shown?
 * @default true
 *
 * @param ButtonText:str
 * @text Button Label
 * @parent Buttons
 * @desc What text do you want to display as the button label?
 * @default Untitled
 *
 * @param ButtonIcon:num
 * @text Button Icon
 * @parent Buttons
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @param PositionJS:func
 * @text JS: Position
 * @parent Buttons
 * @type note
 * @desc The X and Y coordinates for where this button is positioned.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\nconst bottomPoint = this.bottomPoint();\nconst abovePoint = this.abovePoint();\nconst leftPoint = this.leftPoint();\nconst rightPoint = this.rightPoint();\n\n// Calculate Coordinates\nlet x = 0;\nlet y = 0;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 */
//=============================================================================

const _0x40f9=['TAB','length','_context','Scene_Map_isAnyButtonPressed','Scene_Map_createSpriteset','SEMICOLON','KeysArray','processButtonCommonEvent','DOWN','replace','initButtonCommonEvents','makeDefaultButtonCommonEvents','CIRCUMFLEX','CLOSE_BRACKET','QUESTION_MARK','ChangeTone','WxMBL','QUOTE','AnceM','IconSet','format','WIN_OEM_CLEAR','NUMPAD5','setColorTone','F13','DOLLAR','WIN_OEM_PA1','isEventRunning','SPACE','createBitmap','NUM_LOCK','WIN_OEM_PA3','Game_System_initialize','gradientFillRect','FUNC','opacity','F12','AMPERSAND','NUM','rFdGK','filter','WIN_OEM_ENLW','CAPSLOCK','PA1','General','STR','PLUS','SCROLL_LOCK','WIN_OEM_BACKTAB','createButtonCommonEventsSpriteContainer','onMouseEnter','strokeRect','LtUYh','iconHeight','ENTER','toUpperCase','ARRAYFUNC','DECIMAL','drawText','max','WIN_OEM_RESET','PAUSE','VOLUME_UP','WIN_OEM_COPY','HANJA','GGRCE','ENTER_SPECIAL','PERCENT','_buttonCommonEventIcons','SEPARATOR','JUNJA','setShowButtonCommonEventButtons','onDatabaseLoaded','JYnfW','clearButtonCommonEventIcon','_buttonCommonEventKeyCodes','initialize','IconsUsed','stringKeyMap','fontFace','isPressed','WIN_OEM_FJ_LOYA','trim','BACKSPACE','KeyCode%1','OPEN_PAREN','NUMPAD1','HELP','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','F21','NUMPAD9','ARRAYNUM','bitmap','xQuvF','height','WIN_ICO_CLEAR','PRINTSCREEN','process_VisuMZ_ButtonCommonEvents_Parameters','fontSize','isBusy','ARRAYEVAL','isButtonCommonEventForbidden','some','NUMPAD0','createSpriteset','reserveCommonEvent','TILDE','OS_KEY','OPEN_BRACKET','onClick','CANCEL','ConvertParams','_scene','ESC','WIN_OEM_JUMP','setButtonCommonEventIcon','MINUS','return\x200','ShowButton','PositionJS','WIN_OEM_FJ_MASSHOU','sZMsB','itemBackColor1','update','buttonLabel','keyCode','push','MODECHANGE','indexOf','rightPoint','ForbidInputKeys','ButtonCommonEvents','EXSEL','parameters','F17','BACK_QUOTE','ButtonFilename','getButtonCommonEventIcon','_key','mainFontSize','UNDERSCORE','DIVIDE','map','F22','ShowButtonsOnScreen','WIN_OEM_FJ_ROYA','F23','ZOOM','CONVERT','!!\x20ERROR\x20VisuMZ_4_ButtonCmnEvts\x20ERROR\x20!!\x0aKey\x20%1\x20cannot\x20be\x20bound!\x0aIt\x20is\x20a\x20forbidden\x20keybased\x20on\x0ayour\x20Plugin\x20Parameter\x20settings!','onKeyDown','registerCommand','isSceneMap','KANA','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','xrwSj','match','exit','OPEN_CURLY_BRACKET','ARRAYSTRUCT','log','VnyaU','settings','NUMPAD2','CommonEventID','LeftPointJS','floor','addChild','_buttonCommonEventsSpriteContainer','COMMA','F10','SLASH','PLAY','iconWidth','HASH','commonEventID','center','CONTEXT_MENU','Scene_Boot_onDatabaseLoaded','getButtonCommonEvent','pictureBitmap','CTRL','setButtonCommonEvent','JSON','CRSEL','WIN_OEM_WSCTRL','onMouseExit','MULTIPLY','ADD','parse','NUMPAD3','LEFT','buttonHeight','updateOpacity','GREATER_THAN','WIN_ICO_00','F14','clear','CLOSE_PAREN','NWAyR','itemBackColor2','ACCEPT','F20','PGUP','BottomPointJS','EVAL','loadPicture','blt','_icon','Icon','DrawJS','EQUALS','SUBTRACT','ButtonIcon','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','loadButtomCommonEventImage','isButtonCommonEventOk','name','SLEEP','constructor','AbovePointJS','META','INSERT','description','Keys','euBiK','STRUCT','call','bottomPoint','refresh','F15','WIN_OEM_FJ_TOUROKU','keyMapper','imageSmoothingEnabled','VOLUME_MUTE','RightPointJS','WIN_OEM_FJ_JISHO','END','ClearAllButtonCommonEvents','Visible','_buttonCommonEventShowButtons','buttonIcon','SELECT','RIGHT','isPlaytest','EXECUTE','callCommonEvent','DOUBLE_QUOTE','targetOpacity','WIN_OEM_CUSEL','ARRAYSTR','abovePoint','create','isSceneChanging','WIN_ICO_HELP','F19','CLEAR','isAnyButtonPressed','ALTGR','ButtonCommonEventsVisibility','drawData','width','updateIcon','isCommonEventPressed','EREOF','isKeyButtonCommonEventValid','NUMPAD7','_buttomCommonEventImage','SceneManager_onKeyDown','F16','ButtonText','createButtonSprites','isShowButtonCommonEventButtons','prototype','PGDN','PIPE','version','ButtonHeight','numberFontFace','ButtonWidth','initMembers','BACK_SLASH','F24','Settings','HoverTone','NUMPAD6'];(function(_0x1ce5be,_0x40f940){const _0x54dfa0=function(_0x2bf8d5){while(--_0x2bf8d5){_0x1ce5be['push'](_0x1ce5be['shift']());}};_0x54dfa0(++_0x40f940);}(_0x40f9,0xdd));const _0x54df=function(_0x1ce5be,_0x40f940){_0x1ce5be=_0x1ce5be-0x0;let _0x54dfa0=_0x40f9[_0x1ce5be];return _0x54dfa0;};var label='ButtonCommonEvents',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x54df('0x69')](function(_0x5b363d){return _0x5b363d['status']&&_0x5b363d['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x54df('0x3e')]=VisuMZ[label][_0x54df('0x3e')]||{},VisuMZ[_0x54df('0xb0')]=function(_0x1147eb,_0x382385){for(const _0x202fd1 in _0x382385){if(_0x202fd1[_0x54df('0xdd')](/(.*):(.*)/i)){const _0x177885=String(RegExp['$1']),_0x2f45bb=String(RegExp['$2'])[_0x54df('0x78')]()[_0x54df('0x93')]();let _0x2ffe64,_0x539b12,_0x572869;switch(_0x2f45bb){case _0x54df('0x67'):_0x2ffe64=_0x382385[_0x202fd1]!==''?Number(_0x382385[_0x202fd1]):0x0;break;case _0x54df('0x9c'):_0x539b12=_0x382385[_0x202fd1]!==''?JSON[_0x54df('0xfe')](_0x382385[_0x202fd1]):[],_0x2ffe64=_0x539b12[_0x54df('0xcf')](_0x1d5e36=>Number(_0x1d5e36));break;case _0x54df('0x10e'):_0x2ffe64=_0x382385[_0x202fd1]!==''?eval(_0x382385[_0x202fd1]):null;break;case _0x54df('0xa5'):_0x539b12=_0x382385[_0x202fd1]!==''?JSON[_0x54df('0xfe')](_0x382385[_0x202fd1]):[],_0x2ffe64=_0x539b12[_0x54df('0xcf')](_0x3e0afb=>eval(_0x3e0afb));break;case _0x54df('0xf8'):_0x2ffe64=_0x382385[_0x202fd1]!==''?JSON[_0x54df('0xfe')](_0x382385[_0x202fd1]):'';break;case'ARRAYJSON':_0x539b12=_0x382385[_0x202fd1]!==''?JSON[_0x54df('0xfe')](_0x382385[_0x202fd1]):[],_0x2ffe64=_0x539b12[_0x54df('0xcf')](_0x214598=>JSON[_0x54df('0xfe')](_0x214598));break;case _0x54df('0x63'):_0x2ffe64=_0x382385[_0x202fd1]!==''?new Function(JSON[_0x54df('0xfe')](_0x382385[_0x202fd1])):new Function(_0x54df('0xb6'));break;case _0x54df('0x79'):_0x539b12=_0x382385[_0x202fd1]!==''?JSON[_0x54df('0xfe')](_0x382385[_0x202fd1]):[],_0x2ffe64=_0x539b12['map'](_0x554803=>new Function(JSON[_0x54df('0xfe')](_0x554803)));break;case _0x54df('0x6e'):_0x2ffe64=_0x382385[_0x202fd1]!==''?String(_0x382385[_0x202fd1]):'';break;case _0x54df('0x1d'):_0x539b12=_0x382385[_0x202fd1]!==''?JSON[_0x54df('0xfe')](_0x382385[_0x202fd1]):[],_0x2ffe64=_0x539b12[_0x54df('0xcf')](_0x59ee5f=>String(_0x59ee5f));break;case _0x54df('0x5'):_0x572869=_0x382385[_0x202fd1]!==''?JSON[_0x54df('0xfe')](_0x382385[_0x202fd1]):{},_0x2ffe64=VisuMZ[_0x54df('0xb0')]({},_0x572869);break;case _0x54df('0xe0'):_0x539b12=_0x382385[_0x202fd1]!==''?JSON[_0x54df('0xfe')](_0x382385[_0x202fd1]):[],_0x2ffe64=_0x539b12['map'](_0x235dc8=>VisuMZ[_0x54df('0xb0')]({},JSON[_0x54df('0xfe')](_0x235dc8)));break;default:continue;}_0x1147eb[_0x177885]=_0x2ffe64;}}return _0x1147eb;},(_0x5d3c9b=>{const _0x590ae1=_0x5d3c9b[_0x54df('0x11a')];for(const _0x16e452 of dependencies){if(!Imported[_0x16e452]){if('rFdGK'===_0x54df('0x68')){alert(_0x54df('0x117')[_0x54df('0x55')](_0x590ae1,_0x16e452)),SceneManager['exit']();break;}else{function _0x546334(){_0x39c096=_0xa65440[_0x54df('0x7c')](_0x27c86d,_0x4b9e08);}}}}const _0x469b9d=_0x5d3c9b[_0x54df('0x2')];if(_0x469b9d[_0x54df('0xdd')](/\[Version[ ](.*?)\]/i)){const _0x1c38a1=Number(RegExp['$1']);if(_0x1c38a1!==VisuMZ[label][_0x54df('0x37')]){if('ipdaD'==='ipdaD')alert(_0x54df('0x99')[_0x54df('0x55')](_0x590ae1,_0x1c38a1)),SceneManager[_0x54df('0xde')]();else{function _0x4a7eaf(){return _0x4a9cec[_0x54df('0xc4')]['Settings'][_0x54df('0x6d')]['BottomPointJS'][_0x54df('0x6')](this);}}}}if(_0x469b9d[_0x54df('0xdd')](/\[Tier[ ](\d+)\]/i)){if(_0x54df('0x9e')===_0x54df('0x9e')){const _0x5104fe=Number(RegExp['$1']);_0x5104fe<tier?(alert(_0x54df('0xdb')[_0x54df('0x55')](_0x590ae1,_0x5104fe,tier)),SceneManager[_0x54df('0xde')]()):tier=Math[_0x54df('0x7c')](_0x5104fe,tier);}else{function _0x252450(){const _0x2d7da0=this[_0x54df('0x1b')]();if(this[_0x54df('0x64')]>_0x2d7da0)this[_0x54df('0x64')]-=0x10;else this[_0x54df('0x64')]<_0x2d7da0&&(this[_0x54df('0x64')]+=0x10);}}}VisuMZ[_0x54df('0xb0')](VisuMZ[label]['Settings'],_0x5d3c9b[_0x54df('0xc6')]);})(pluginData),PluginManager[_0x54df('0xd8')](pluginData[_0x54df('0x11a')],'ChangeButtonCommonEvent',_0x1915dd=>{VisuMZ['ConvertParams'](_0x1915dd,_0x1915dd);const _0x46c31a=_0x1915dd['Keys'],_0x539261=_0x1915dd[_0x54df('0xe5')],_0x48cb45=_0x1915dd[_0x54df('0x112')];for(let _0x483a28 of _0x46c31a){if(_0x54df('0x4')!==_0x54df('0x4')){function _0x212510(){if(!_0x7107ee[_0x54df('0xc4')]['Settings'][_0x54df('0x6d')][_0x54df('0xc3')])return![];return!!_0x3b81e5[_0x54df('0xb')][_0x536959];}}else{_0x483a28=_0x483a28[_0x54df('0x4a')](/\s*\(.*?\)\s*/g,'')[_0x54df('0x78')]()[_0x54df('0x93')]();const _0xec123e=TextManager[_0x54df('0x8f')]['indexOf'](_0x483a28);_0xec123e>0x0&&($gameSystem[_0x54df('0xf7')](_0xec123e,_0x539261),$gameSystem['setButtonCommonEventIcon'](_0xec123e,_0x48cb45));}}}),PluginManager[_0x54df('0xd8')](pluginData['name'],_0x54df('0x26'),_0x1bb07d=>{VisuMZ['ConvertParams'](_0x1bb07d,_0x1bb07d);const _0x35c322=_0x1bb07d[_0x54df('0x12')];$gameSystem[_0x54df('0x88')](_0x35c322);}),PluginManager[_0x54df('0xd8')](pluginData[_0x54df('0x11a')],'ClearButtonCommonEvent',_0x41f8d=>{VisuMZ[_0x54df('0xb0')](_0x41f8d,_0x41f8d);const _0x1b7d81=_0x41f8d[_0x54df('0x3')];for(let _0x471e8b of _0x1b7d81){if(_0x54df('0xdc')!==_0x54df('0x75')){_0x471e8b=_0x471e8b[_0x54df('0x4a')](/\s*\(.*?\)\s*/g,'')['toUpperCase']()[_0x54df('0x93')]();const _0x2bab65=TextManager['stringKeyMap'][_0x54df('0xc1')](_0x471e8b);if(_0x2bab65>0x0)$gameSystem[_0x54df('0xf7')](_0x2bab65,0x0);}else{function _0x38accd(){_0x229344=_0x3fa32e[_0x54df('0x4a')](/\s*\(.*?\)\s*/g,'')[_0x54df('0x78')]()[_0x54df('0x93')]();const _0x1b8b6c=_0x9f4719[_0x54df('0x8f')][_0x54df('0xc1')](_0x5cbc53);_0x1b8b6c>0x0&&(_0x116207[_0x54df('0xf7')](_0x1b8b6c,_0x26f8b4),_0x1f833a[_0x54df('0xb4')](_0x1b8b6c,_0x235314));}}}}),PluginManager['registerCommand'](pluginData[_0x54df('0x11a')],_0x54df('0x11'),_0x445d19=>{$gameSystem[_0x54df('0x8c')]={};}),VisuMZ[_0x54df('0xc4')][_0x54df('0xf3')]=Scene_Boot[_0x54df('0x34')][_0x54df('0x89')],Scene_Boot['prototype'][_0x54df('0x89')]=function(){VisuMZ[_0x54df('0xc4')][_0x54df('0xf3')][_0x54df('0x6')](this),this[_0x54df('0xa2')](),ImageManager[_0x54df('0x118')]();},Scene_Boot[_0x54df('0x34')]['process_VisuMZ_ButtonCommonEvents_Parameters']=function(){const _0x10cd77=[];for(let _0x2e32de=0x30;_0x2e32de<=0x39;_0x2e32de++){_0x10cd77['push'](_0x2e32de);}for(let _0x20f198=0x41;_0x20f198<=0x5a;_0x20f198++){_0x10cd77[_0x54df('0xbf')](_0x20f198);}for(let _0xc20f4c=0xba;_0xc20f4c<=0xc0;_0xc20f4c++){_0x10cd77[_0x54df('0xbf')](_0xc20f4c);}for(let _0x298e9f=0xdb;_0x298e9f<=0xde;_0x298e9f++){_0x10cd77[_0x54df('0xbf')](_0x298e9f);}for(let _0xaa361b=0x20;_0xaa361b<=0x28;_0xaa361b++){_0x10cd77[_0x54df('0xbf')](_0xaa361b);}for(let _0x44393c=0x2d;_0x44393c<=0x2e;_0x44393c++){_0x10cd77[_0x54df('0xbf')](_0x44393c);}for(let _0x491b26=0x60;_0x491b26<=0x6f;_0x491b26++){_0x10cd77[_0x54df('0xbf')](_0x491b26);}VisuMZ[_0x54df('0xc4')][_0x54df('0x47')]=_0x10cd77;},Input['isButtonCommonEventForbidden']=function(_0x48f77e){if(!VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')][_0x54df('0x6d')][_0x54df('0xc3')])return![];return!!Input[_0x54df('0xb')][_0x48f77e];},ImageManager[_0x54df('0x118')]=function(){const _0x1cdfaf=VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')][_0x54df('0x6d')][_0x54df('0xc9')];this[_0x54df('0x2e')]=_0x1cdfaf?ImageManager[_0x54df('0x10f')](_0x1cdfaf):new Bitmap(0x1,0x1);},TextManager['stringKeyMap']=['','','',_0x54df('0xaf'),'','',_0x54df('0x98'),'',_0x54df('0x94'),_0x54df('0x41'),'','',_0x54df('0x23'),_0x54df('0x77'),_0x54df('0x83'),'','SHIFT',_0x54df('0xf6'),'ALT',_0x54df('0x7e'),_0x54df('0x6b'),_0x54df('0xda'),'EISU',_0x54df('0x87'),'FINAL',_0x54df('0x81'),'',_0x54df('0xb2'),_0x54df('0xd5'),'NONCONVERT',_0x54df('0x10a'),_0x54df('0xc0'),_0x54df('0x5d'),_0x54df('0x10c'),_0x54df('0x35'),_0x54df('0x10'),'HOME',_0x54df('0x100'),'UP',_0x54df('0x16'),_0x54df('0x49'),_0x54df('0x15'),'PRINT',_0x54df('0x18'),_0x54df('0xa1'),_0x54df('0x1'),'DELETE','','0','1','2','3','4','5','6','7','8','9','COLON','SEMICOLON','LESS_THAN','EQUALS',_0x54df('0x103'),_0x54df('0x4f'),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x54df('0xac'),'',_0x54df('0xf2'),'',_0x54df('0x11b'),_0x54df('0xa8'),_0x54df('0x97'),_0x54df('0xe4'),_0x54df('0xff'),'NUMPAD4',_0x54df('0x57'),_0x54df('0x40'),_0x54df('0x2d'),'NUMPAD8',_0x54df('0x9b'),_0x54df('0xfc'),_0x54df('0xfd'),_0x54df('0x86'),_0x54df('0x115'),_0x54df('0x7a'),_0x54df('0xce'),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x54df('0xeb'),'F11',_0x54df('0x65'),_0x54df('0x59'),_0x54df('0x105'),_0x54df('0x9'),_0x54df('0x30'),_0x54df('0xc7'),'F18',_0x54df('0x22'),_0x54df('0x10b'),_0x54df('0x9a'),_0x54df('0xd0'),_0x54df('0xd3'),_0x54df('0x3d'),'','','','','','','','',_0x54df('0x5f'),_0x54df('0x70'),_0x54df('0xf'),_0x54df('0xb9'),_0x54df('0xa'),_0x54df('0x92'),_0x54df('0xd2'),'','','','','','','','','',_0x54df('0x4d'),'EXCLAMATION',_0x54df('0x1a'),_0x54df('0xef'),_0x54df('0x5a'),_0x54df('0x84'),_0x54df('0x66'),_0x54df('0xcd'),_0x54df('0x96'),_0x54df('0x107'),'ASTERISK',_0x54df('0x6f'),_0x54df('0x36'),'HYPHEN_MINUS',_0x54df('0xdf'),'CLOSE_CURLY_BRACKET',_0x54df('0xab'),'','','','',_0x54df('0xd'),'VOLUME_DOWN',_0x54df('0x7f'),'','',_0x54df('0x46'),_0x54df('0x114'),_0x54df('0xea'),_0x54df('0xb5'),'PERIOD',_0x54df('0xec'),_0x54df('0xc8'),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x54df('0xad'),_0x54df('0x3c'),_0x54df('0x4e'),_0x54df('0x52'),'',_0x54df('0x0'),_0x54df('0x25'),'',_0x54df('0x21'),_0x54df('0x104'),'',_0x54df('0xa0'),'','',_0x54df('0x7d'),_0x54df('0xb3'),_0x54df('0x5b'),'WIN_OEM_PA2',_0x54df('0x60'),_0x54df('0xfa'),_0x54df('0x1c'),'WIN_OEM_ATTN','WIN_OEM_FINISH',_0x54df('0x80'),'WIN_OEM_AUTO',_0x54df('0x6a'),_0x54df('0x71'),'ATTN',_0x54df('0xf9'),_0x54df('0xc5'),_0x54df('0x2b'),_0x54df('0xed'),_0x54df('0xd4'),'',_0x54df('0x6c'),_0x54df('0x56'),''],VisuMZ[_0x54df('0xc4')][_0x54df('0x2f')]=SceneManager[_0x54df('0xd7')],SceneManager[_0x54df('0xd7')]=function(_0x528a74){this[_0x54df('0xd9')]()&&this[_0x54df('0x2c')](_0x528a74)&&this['_scene'][_0x54df('0x48')](_0x528a74[_0x54df('0xbe')]),VisuMZ['ButtonCommonEvents'][_0x54df('0x2f')][_0x54df('0x6')](this,_0x528a74);},SceneManager[_0x54df('0xd9')]=function(){return this[_0x54df('0xb1')]&&this['_scene'][_0x54df('0x11c')]===Scene_Map;},SceneManager[_0x54df('0x2c')]=function(_0x59d25f){return!Input[_0x54df('0xa6')](_0x59d25f[_0x54df('0xbe')]);},VisuMZ[_0x54df('0xc4')][_0x54df('0x61')]=Game_System['prototype'][_0x54df('0x8d')],Game_System[_0x54df('0x34')][_0x54df('0x8d')]=function(){VisuMZ[_0x54df('0xc4')][_0x54df('0x61')][_0x54df('0x6')](this),this[_0x54df('0x4b')]();},Game_System[_0x54df('0x34')][_0x54df('0x4b')]=function(){this[_0x54df('0x8c')]={},this[_0x54df('0x85')]={},this[_0x54df('0x13')]=VisuMZ['ButtonCommonEvents'][_0x54df('0x3e')][_0x54df('0x6d')][_0x54df('0xd1')],this['makeDefaultButtonCommonEvents']();},Game_System['prototype'][_0x54df('0x4c')]=function(){const _0x2385a3=VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')],_0x536939=_0x54df('0x95');for(const _0x4416a6 of VisuMZ[_0x54df('0xc4')][_0x54df('0x47')]){const _0x1ce1a5=_0x536939['format'](_0x4416a6);if(!!_0x2385a3[_0x1ce1a5]){if(_0x54df('0xba')!==_0x54df('0xba')){function _0x204c13(){_0x169526[_0x54df('0xc4')]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x54df('0xa2')](),_0x3e8543[_0x54df('0x118')]();}}else this[_0x54df('0xf7')](_0x4416a6,_0x2385a3[_0x1ce1a5][_0x54df('0xe5')]),this[_0x54df('0xb4')](_0x4416a6,_0x2385a3[_0x1ce1a5][_0x54df('0x116')]);}}},Game_System[_0x54df('0x34')]['getButtonCommonEvent']=function(_0x1ac7ca){if(this['_buttonCommonEventKeyCodes']===undefined)this[_0x54df('0x4b')]();return this['_buttonCommonEventKeyCodes'][_0x1ac7ca]||0x0;},Game_System[_0x54df('0x34')]['setButtonCommonEvent']=function(_0x4ab68c,_0x4d2ef0){if(this[_0x54df('0x8c')]===undefined)this['initButtonCommonEvents']();if($gameTemp['isPlaytest']()&&Input[_0x54df('0xa6')](_0x4ab68c)&&_0x4d2ef0!==0x0){const _0x44fc69=_0x54df('0xd6')[_0x54df('0x55')](TextManager['stringKeyMap'][_0x4ab68c]);alert(_0x44fc69);return;}this[_0x54df('0x8c')][_0x4ab68c]=_0x4d2ef0;},Game_System[_0x54df('0x34')]['clearButtonCommonEvent']=function(_0x7534d){if(this[_0x54df('0x8c')]===undefined)this[_0x54df('0x4b')]();delete this[_0x54df('0x8c')][_0x7534d];},Game_System[_0x54df('0x34')][_0x54df('0xca')]=function(_0x1ab24c){if(this[_0x54df('0x85')]===undefined)this[_0x54df('0x4b')]();return this[_0x54df('0x85')][_0x1ab24c]||0x0;},Game_System[_0x54df('0x34')]['setButtonCommonEventIcon']=function(_0x236994,_0x44b9b0){if(this[_0x54df('0x85')]===undefined)this[_0x54df('0x4b')]();this[_0x54df('0x85')][_0x236994]=_0x44b9b0;},Game_System[_0x54df('0x34')][_0x54df('0x8b')]=function(_0x334a18){if(this[_0x54df('0x85')]===undefined)this[_0x54df('0x4b')]();delete this['_buttonCommonEventIcons'][_0x334a18];},Game_System[_0x54df('0x34')][_0x54df('0x33')]=function(){if(this[_0x54df('0x13')]===undefined)this[_0x54df('0x4b')]();return this['_buttonCommonEventShowButtons'];},Game_System[_0x54df('0x34')]['setShowButtonCommonEventButtons']=function(_0x2520fd){if(this['_buttonCommonEventShowButtons']===undefined)this[_0x54df('0x4b')]();this[_0x54df('0x13')]=_0x2520fd;},VisuMZ[_0x54df('0xc4')][_0x54df('0x45')]=Scene_Map[_0x54df('0x34')][_0x54df('0xa9')],Scene_Map[_0x54df('0x34')][_0x54df('0xa9')]=function(){VisuMZ[_0x54df('0xc4')][_0x54df('0x45')][_0x54df('0x6')](this),this[_0x54df('0x72')]();},Scene_Map['prototype'][_0x54df('0x72')]=function(){if(this[_0x54df('0x11c')]!==Scene_Map)return;this[_0x54df('0xe9')]=new Sprite_ButtonCommonEventsContainer(),this[_0x54df('0xe8')](this[_0x54df('0xe9')]);},Scene_Map['prototype'][_0x54df('0x48')]=function(_0x318b64){if(!this[_0x54df('0x119')]())return;if($gameMap&&$gameMap[_0x54df('0x5c')]())return;const _0x5c8d46=$gameSystem[_0x54df('0xf4')](_0x318b64)||0x0;if(_0x5c8d46>0x0&&$dataCommonEvents[_0x5c8d46])$gameTemp['reserveCommonEvent'](_0x5c8d46);},Scene_Map[_0x54df('0x34')][_0x54df('0x119')]=function(){if(!this['isActive']())return![];if($gameMessage['isBusy']())return![];if(SceneManager[_0x54df('0x20')]())return![];return!![];},VisuMZ[_0x54df('0xc4')][_0x54df('0x44')]=Scene_Map[_0x54df('0x34')][_0x54df('0x24')],Scene_Map[_0x54df('0x34')][_0x54df('0x24')]=function(){return VisuMZ['ButtonCommonEvents']['Scene_Map_isAnyButtonPressed'][_0x54df('0x6')](this)||this[_0x54df('0xe9')]?.[_0x54df('0x24')]();};function Sprite_ButtonCommonEventsContainer(){this[_0x54df('0x8d')](...arguments);}Sprite_ButtonCommonEventsContainer['prototype']=Object[_0x54df('0x1f')](Sprite[_0x54df('0x34')]),Sprite_ButtonCommonEventsContainer['prototype'][_0x54df('0x11c')]=Sprite_ButtonCommonEventsContainer,Sprite_ButtonCommonEventsContainer['prototype'][_0x54df('0x8d')]=function(){Sprite[_0x54df('0x34')][_0x54df('0x8d')]['call'](this),this['initMembers'](),this[_0x54df('0x32')]();},Sprite_ButtonCommonEventsContainer[_0x54df('0x34')][_0x54df('0x3b')]=function(){this[_0x54df('0x28')]=Graphics[_0x54df('0x28')],this[_0x54df('0x9f')]=Graphics[_0x54df('0x9f')];},Sprite_ButtonCommonEventsContainer[_0x54df('0x34')]['buttonWidth']=function(){return VisuMZ['ButtonCommonEvents'][_0x54df('0x3e')][_0x54df('0x6d')][_0x54df('0x3a')];},Sprite_ButtonCommonEventsContainer[_0x54df('0x34')][_0x54df('0x101')]=function(){return VisuMZ[_0x54df('0xc4')]['Settings'][_0x54df('0x6d')]['ButtonHeight'];},Sprite_ButtonCommonEventsContainer[_0x54df('0x34')][_0x54df('0x7')]=function(){try{if('SHtwz'===_0x54df('0x108')){function _0x4131b3(){this[_0x54df('0x8c')]={},this['_buttonCommonEventIcons']={},this[_0x54df('0x13')]=_0x2d8dc1[_0x54df('0xc4')][_0x54df('0x3e')][_0x54df('0x6d')][_0x54df('0xd1')],this[_0x54df('0x4c')]();}}else return VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')][_0x54df('0x6d')][_0x54df('0x10d')][_0x54df('0x6')](this);}catch(_0x2c27a8){if($gameTemp[_0x54df('0x17')]())console[_0x54df('0xe1')](_0x2c27a8);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer['prototype']['leftPoint']=function(){try{if('AnceM'!==_0x54df('0x53')){function _0x2a265a(){if(!this['settings']())return'';return this[_0x54df('0xe3')]()[_0x54df('0x31')];}}else return VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')]['General'][_0x54df('0xe6')][_0x54df('0x6')](this);}catch(_0x554798){if($gameTemp['isPlaytest']())console[_0x54df('0xe1')](_0x554798);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x54df('0x34')][_0x54df('0xc2')]=function(){try{return VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')]['General'][_0x54df('0xe')][_0x54df('0x6')](this);}catch(_0x3e7dbc){if(_0x54df('0x51')!=='OgKOP'){if($gameTemp['isPlaytest']())console[_0x54df('0xe1')](_0x3e7dbc);return new Point(0x0,0x0);}else{function _0x5f4148(){const _0x548c98='KeyCode%1'[_0x54df('0x55')](this['_key']);return _0x37d3ba['ButtonCommonEvents'][_0x54df('0x3e')][_0x548c98]||{};}}}},Sprite_ButtonCommonEventsContainer[_0x54df('0x34')][_0x54df('0x1e')]=function(){try{return VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')]['General'][_0x54df('0x11d')]['call'](this);}catch(_0x1e120f){if($gameTemp[_0x54df('0x17')]())console['log'](_0x1e120f);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x54df('0x34')][_0x54df('0x32')]=function(){const _0x2e39af=VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')],_0x2b45d7='KeyCode%1';for(const _0x39a102 of VisuMZ['ButtonCommonEvents'][_0x54df('0x47')]){if(_0x54df('0x82')!==_0x54df('0xe2')){const _0x200300=_0x2b45d7[_0x54df('0x55')](_0x39a102);if(!_0x2e39af[_0x200300])continue;if(!_0x2e39af[_0x200300][_0x54df('0xb7')])continue;const _0x34a26f=new Sprite_ButtonCommonEvent(_0x39a102);this[_0x54df('0xe8')](_0x34a26f);const _0x359bfd=_0x34a26f[_0x54df('0xe3')]()[_0x54df('0xb8')][_0x54df('0x6')](this)||new Point(0x0,0x0);_0x34a26f['x']=_0x359bfd['x'],_0x34a26f['y']=_0x359bfd['y'];}else{function _0x4c88a2(){_0x32deae[_0x54df('0x34')][_0x54df('0x73')][_0x54df('0x6')](this);const _0x929784=_0x536c94[_0x54df('0xc4')][_0x54df('0x3e')][_0x54df('0x6d')];_0x929784['ChangeTone']&&this[_0x54df('0x58')](_0x929784[_0x54df('0x3f')]);}}}},Sprite_ButtonCommonEventsContainer['prototype'][_0x54df('0x24')]=function(){return this['children'][_0x54df('0xa7')](_0x38f460=>_0x38f460[_0x54df('0x2a')]());};function Sprite_ButtonCommonEvent(){this[_0x54df('0x8d')](...arguments);}Sprite_ButtonCommonEvent[_0x54df('0x34')]=Object[_0x54df('0x1f')](Sprite_Clickable[_0x54df('0x34')]),Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0x11c')]=Sprite_ButtonCommonEvent,Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0x8d')]=function(_0x90c3bf){this[_0x54df('0xcb')]=_0x90c3bf,Sprite_Clickable[_0x54df('0x34')][_0x54df('0x8d')][_0x54df('0x6')](this),this[_0x54df('0x5e')](),this[_0x54df('0x64')]=this[_0x54df('0x1b')]();},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0xe3')]=function(){const _0x13e8a8=_0x54df('0x95')[_0x54df('0x55')](this[_0x54df('0xcb')]);return VisuMZ[_0x54df('0xc4')]['Settings'][_0x13e8a8]||{};},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0x5e')]=function(){const _0x52ea61=VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')][_0x54df('0x6d')];this['bitmap']=new Bitmap(_0x52ea61[_0x54df('0x3a')],_0x52ea61[_0x54df('0x38')]),this['_icon']=this[_0x54df('0x14')](),this[_0x54df('0x8')]();},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0xf5')]=function(){return ImageManager[_0x54df('0x2e')];},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0xf0')]=function(){return $gameSystem[_0x54df('0xf4')](this[_0x54df('0xcb')]);},Sprite_ButtonCommonEvent[_0x54df('0x34')]['buttonLabel']=function(){if(!this[_0x54df('0xe3')]())return'';return this[_0x54df('0xe3')]()['ButtonText'];},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0x14')]=function(){if(!this[_0x54df('0xf0')]())return 0x0;const _0x1d3fee=$gameSystem[_0x54df('0xca')](this[_0x54df('0xcb')]);if(_0x1d3fee!==0x0)return _0x1d3fee;const _0x20b5e9=VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')]['General'],_0x2b752a=_0x20b5e9[_0x54df('0x8e')],_0x126e8a=Math[_0x54df('0x7c')](_0x2b752a[_0x54df('0x42')],0x1);let _0x5223f0=_0x2b752a[this['_key']%_0x126e8a]||0x0;return _0x5223f0;},Sprite_ButtonCommonEvent[_0x54df('0x34')]['refresh']=function(){this[_0x54df('0x9d')][_0x54df('0x106')]();const _0x183943=VisuMZ[_0x54df('0xc4')]['Settings'][_0x54df('0x6d')];_0x183943[_0x54df('0x113')][_0x54df('0x6')](this);},Sprite_ButtonCommonEvent['prototype']['isClickEnabled']=function(){if(this[_0x54df('0x64')]<0xff)return![];return this[_0x54df('0xf0')]()>0x0;},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0x73')]=function(){Sprite_Clickable[_0x54df('0x34')][_0x54df('0x73')][_0x54df('0x6')](this);const _0x1e0d81=VisuMZ[_0x54df('0xc4')][_0x54df('0x3e')]['General'];if(_0x1e0d81[_0x54df('0x50')]){if(_0x54df('0x8a')===_0x54df('0x8a'))this['setColorTone'](_0x1e0d81[_0x54df('0x3f')]);else{function _0x1b6180(){const _0x58c06d=_0x7dce8e(_0x33d042['$1']);_0x58c06d<_0x169026?(_0x380784(_0x54df('0xdb')['format'](_0x4ccea6,_0x58c06d,_0x113e1f)),_0x3a7316[_0x54df('0xde')]()):_0x5c2dea=_0x5dbee7[_0x54df('0x7c')](_0x58c06d,_0x2189b4);}}}},Sprite_ButtonCommonEvent[_0x54df('0x34')]['onMouseExit']=function(){Sprite_Clickable[_0x54df('0x34')][_0x54df('0xfb')][_0x54df('0x6')](this),this[_0x54df('0x58')]([0x0,0x0,0x0,0x0]);},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0xae')]=function(){Sprite_Clickable[_0x54df('0x34')][_0x54df('0xae')][_0x54df('0x6')](this),this['callCommonEvent'](),this[_0x54df('0xfb')]();},Sprite_ButtonCommonEvent[_0x54df('0x34')]['callCommonEvent']=function(){if(!SceneManager['_scene']['isButtonCommonEventOk']())return;if($gameMap&&$gameMap[_0x54df('0x5c')]())return;const _0x57aacb=this['commonEventID']();$gameTemp[_0x54df('0xaa')](_0x57aacb),this[_0x54df('0xfb')]();},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0x2a')]=function(){if(!this[_0x54df('0x91')]())return![];if(this[_0x54df('0x19')]()<=0x0)return![];return!![];},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0xbc')]=function(){Sprite_Clickable[_0x54df('0x34')][_0x54df('0xbc')][_0x54df('0x6')](this),this[_0x54df('0x102')](),this[_0x54df('0x29')]();},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0x102')]=function(){const _0x1651e2=this[_0x54df('0x1b')]();if(this[_0x54df('0x64')]>_0x1651e2)this[_0x54df('0x64')]-=0x10;else this[_0x54df('0x64')]<_0x1651e2&&(this[_0x54df('0x64')]+=0x10);},Sprite_ButtonCommonEvent[_0x54df('0x34')]['targetOpacity']=function(){if($gameMessage&&$gameMessage[_0x54df('0xa4')]())return 0x0;if(!$gameSystem[_0x54df('0x33')]())return 0x0;if(this[_0x54df('0xe3')]()['ShowOnlyIfCePresent']){const _0x462739=this[_0x54df('0xf0')]();if(!$dataCommonEvents[_0x462739])return 0x0;}return 0xff;},Sprite_ButtonCommonEvent[_0x54df('0x34')][_0x54df('0x29')]=function(){if(this[_0x54df('0x111')]===this[_0x54df('0x14')]())return;this[_0x54df('0x111')]=this['buttonIcon'](),this[_0x54df('0x8')]();},VisuMZ[_0x54df('0xc4')][_0x54df('0x27')]=function(){const _0x3e76cf=this[_0x54df('0x28')],_0x20479b=this['height'],_0xfd9f42=ColorManager[_0x54df('0xbb')](),_0x206891=ColorManager[_0x54df('0x109')]();this[_0x54df('0x9d')][_0x54df('0x62')](0x1,0x1,_0x3e76cf-0x2,_0x20479b-0x2,_0xfd9f42,_0x206891,!![]),this['bitmap'][_0x54df('0x74')](0x1,0x1,_0x3e76cf-0x2,_0x20479b-0x2,_0xfd9f42);if(this[_0x54df('0xf5')]()){const _0x511d57=this[_0x54df('0xf5')](),_0x55e4d2=_0x511d57['width'],_0xfc2459=_0x511d57['height'];this[_0x54df('0x9d')][_0x54df('0x110')](_0x511d57,0x0,0x0,_0x55e4d2,_0xfc2459,0x0,0x0,_0x3e76cf,_0x20479b);}const _0x516fff=this[_0x54df('0x14')](),_0x4ab81f=ImageManager['loadSystem'](_0x54df('0x54')),_0x3c3c6d=ImageManager[_0x54df('0xee')],_0x2067c4=ImageManager[_0x54df('0x76')],_0x3fe68a=_0x516fff%0x10*_0x3c3c6d,_0x3c1447=Math[_0x54df('0xe7')](_0x516fff/0x10)*_0x2067c4,_0x5e5bb9=Math[_0x54df('0xe7')](this[_0x54df('0x28')]/_0x3c3c6d)*_0x3c3c6d,_0x348de6=Math[_0x54df('0xe7')](this[_0x54df('0x9f')]/_0x2067c4)*_0x2067c4,_0x1e12d2=Math['floor']((this[_0x54df('0x28')]-_0x5e5bb9)/0x2),_0x95453b=Math[_0x54df('0xe7')]((this[_0x54df('0x9f')]-_0x348de6)/0x2);this[_0x54df('0x9d')][_0x54df('0x43')][_0x54df('0xc')]=![],this[_0x54df('0x9d')][_0x54df('0x110')](_0x4ab81f,_0x3fe68a,_0x3c1447,_0x3c3c6d,_0x2067c4,_0x1e12d2,_0x95453b,_0x5e5bb9,_0x348de6),this[_0x54df('0x9d')][_0x54df('0x43')][_0x54df('0xc')]=!![];const _0x408e91=this[_0x54df('0xbd')]();this[_0x54df('0x9d')][_0x54df('0x90')]=$gameSystem[_0x54df('0x39')](),this[_0x54df('0x9d')][_0x54df('0xa3')]=$gameSystem[_0x54df('0xcc')](),this[_0x54df('0x9d')][_0x54df('0x7b')](_0x408e91,0x0,0x0,_0x3e76cf,this[_0x54df('0x9d')]['fontSize']+0x4,_0x54df('0xf1'));};
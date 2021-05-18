//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.08] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 *
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s).
 *
 *   Region ID(s)
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remotely run.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x3fb2=['hasCPCs','prototype','_counter','registerCommand','initMembers','_comments','KdRWs','USER-DEFINED\x202','SIgzh','ANGER','processMoveRouteStepFrom','setSelfValue','characterPatternY','bufferY','frameCount','%1Dock','_isObjectCharacter','_PlayerDiagonalSetting','KonWN','shadowY','espzZ','CuLzn','Visible','SelfSwitchID','clearDestination','_lastPluginCommandInterpreter','startCallEvent','RegionOkTarget','jGeiy','anchor','VisuMZ_Setup_Preload_Map','FRUSTRATION','turnAwayFromPoint','isMoving','checkValidEventerMap','wxEek','Game_Temp_setDestination','TargetSwitchId','ptMfE','none','setupEventsMoveCoreEffects','kHdQa','parse','PreloadMaps','ZZZ','switch1Id','StrictCollision','setEventIconDataKey','clearEventCache','despawnEventId','processMoveRouteAnimation','addLoadListener','MdpBl','variableValid','MUSICNOTE','UEySH','setupDiagonalSupport','PreCopyJS','meetsCPC','RIGHT','USER-DEFINED\x205','processMoveRouteStepToPlayer','startEncounterEffect','UPPER\x20RIGHT','Game_Map_parallelCommonEvents','_stopCount','$preloadedMap_%1','map','deltaX','isDashingEnabled','NeJKn','CuRoN','frontY','opacitySpeed','iOHto','updatePatternEventsMoveCore','AutoMoveEvents','getPlayerDiagonalSetting','RegionOk','PlayerMovementChange','_needsPeriodicRefresh','vXRmv','foPqU','_spawnPreserved','TurnInPlaceDelay','NUM','Game_SelfSwitches_setValue','row','processMoveSynchAway','AllAllow','Game_Vehicle_isLandOk','VmCTT','isPosing','_interpreter','Sprite_Character_characterPatternY','isLandOk','exToP','UDioU','UfEWO','Game_System_initialize','hkGVT','KWTaa','IconBlendMode','$callEventMap','PlayerIconDelete','isEventRunning','pIWZE','locate','PreloadedMaps','FGHBz','uoYVJ','EPsyQ','abs','setBackgroundType','getEventIconData','isBoat','rTqQp','horz\x20mirror','moveTowardCharacter','CPCsMet','BNDXd','IconBufferY','isRunning','jumpHeight','createShadows','vehicle','hideShadows','length','STRUCT','iconHeight','deleteIconsOnEventsDataKey','JWhCY','Ship','executeMoveDir8','onChange','morphIntoTemplate','resizeWindow','getPreservedMorphEventData','updateVS8BalloonOffsets','_pageIndex','drawIcon','BufferY','jFYrq','fZcdf','bRvgE','clearDashing','Player','initMembersEventsMoveCore','updateShadow','deltaXFrom','increaseSteps','isShip','turnLeft90','CustomPageConditions','pos','column','LIGHTBULB','SwitchGetSelfSwitchID','Game_Map_event','deleteSavedEventLocationKey','switches','SWEAT','setImage','sHwLH','setupChild','Name','vaIms','round','ship','Sprite_Character_setCharacterBitmap','command357','erase','return\x20%1','isDestinationValid','processMoveRoutePatternLock','roundX','_trigger','setDashingEnabled','isSmartEventCollisionOn','isJumping','processMoveRouteMoveTo','setEventIconData','isEventTest','clearPageSettings','PreMorphJS','updateParallel','Game_Message_add','QCwqq','moveTowardPoint','Scene_Map_startEncounterEffect','processMoveRouteTeleportTo','Game_Vehicle_initMoveSpeed','characterIndex','parent','makeDeepCopy','canPass','pPzSS','PlayerIconChange','EventID','SPIN\x20CW','_EventsMoveCoreSettings','setupSpawn','isAdvancedVariable','DashEnableToggle','ukATK','cUyLj','VariableGetSelfVariableID','Walk','startMessage','POFzZ','tzlTG','isAllowEventAutoMovement','canMove','updateMove','Scene_Boot_onDatabaseLoaded','hHXke','processOk','lineHeight','metCPC','checkEventTriggerEventsMoveCore','Game_CharacterBase_screenX','Game_Vehicle_isMapPassable','QUESTION','createSpawnedEventWithData','code','pTxCx','QtJzB','ELkec','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_lastMovedDirection','PKIgG','_eventId','activationRegionList','_saveEventLocation','SPIN\x20CLOCKWISE','processMoveRouteStepTo','isAdvancedSwitch','TiltRight','SILENCE','updatePattern','_poseDuration','RIGHT\x20TO\x20LEFT','TiltLeft','destinationY','Spriteset_Map_createLowerLayer','_text','initEventsMoveCore','processMoveSynchMimic','_scene','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','ARRAYFUNC','match','concat','hoino','standing','Game_Switches_value','vsqVn','loadSystem','activationProximityDistance','setFrame','_advancedSwitchVariable','Game_Event_initialize','ShipSpeed','processMoveRouteSetIndex','_target','boat','NXozq','TRUE','_moveSynch','_spriteset','isRegionAllowPass','VICTORY','isPassableByAnyDirection','blendMode','isPreventSelfMovement','version','replace','restoreSavedEventPosition','PageId','BuVHZ','XrVXy','width','Game_CharacterBase_updatePattern','Game_Event_updateSelfMovement','_regionRules','advancedValue','smooth','rotation','meetsConditions','shadowX','moveAwayFromPoint','CallEvent','GwcYi','TynZG','Game_CharacterBase_isDashing','_periodicRefreshTimer','USER-DEFINED\x204','Game_SelfSwitches_value','useCarryPoseForIcons','OaNRy','setupRegionRestrictions','roundXWithDirection','WalkAllow','_pattern','vbfin','reserveCommonEvent','PostMorphJS','_shadowOpacity','CAIaE','toLowerCase','iconWidth','deletePreservedMorphEventDataKey','FlVWI','Game_Player_checkEventTriggerHere','radius','eventLabelsVisible','Toggle','Map%1-Event%2','gANSC','EventAutoMovement','front','initEventsMoveCoreSettings','isTargetEventValidForLabelWindow','Allow','Game_Switches_setValue','approach','EventLocationCreate','wJhaK','setPlayerDiagonalSetting','_eventOverloadThreshold','isDiagonalDirection','posNt','setCharacterBitmap','innerWidth','updateEventIconSprite','bufferX','BitmapSmoothing','_PreservedEventMorphData','jmzEd','determineEventOverload','BKBKb','autosaveEventLocation','Game_Character_processMoveCommand','text','labelWindowText','left','SlowerSpeed','despawnAtXY','moveByInput','checkSmartEventCollision','BnpTO','_dragonbones','kJqUu','checkEventTriggerThere','BkYKA','getMapSpawnedEventData','_type','_transparent','isTile','Sprite_Balloon_updatePosition','FOsmt','LOWER\x20RIGHT','_DisablePlayerControl','initMoveSpeed','constructor','shiftY','createCharacterShadow','clamp','add','StopAutoMoveEvents','_opacity','IAOGM','getDirectionToPoint','setupSpawnedEvents','RegionTouch','removeMorph','Game_Player_executeMove','cZnRU','Game_CharacterBase_update','getSavedEventLocation','processMoveSynchCustom','Jwjtz','removeChild','SelfSwitchABCD','characterName','UUeMr','onOk','cAvdt','EnableTurnInPlace','RuUfV','pattern','Game_CharacterBase_hasStepAnime','setDiagonalDirection','MUSIC','UNTITLED','forceMoveRoute','Sprite_Character_update','_moveRouteIndex','filename','screenY','setMovementSuccess','onCancel','selfValue','Step1MapId','ZPcJM','ARRAYNUM','Game_Variables_setValue','isPlaytest','DiagonalSpeedMultiplier','findDiagonalDirectionTo','GolTT','setOpacity','lUfek','name','VehicleDock','_saveEventLocations','FXtGE','_character','Game_Message_setItemChoice','vert\x20mirror','General','Game_Player_increaseSteps','meetsSwitchCondition','updateScale','Game_Player_getInputDirection','LineHeight','OCMOw','trim','PlayerAllow','qfIlu','_addedHitbox','Acfzd','setupCopyEvent','eventId','okDGw','Step2MapId','zvtyJ','OlRrc','setWaitMode','MIRst','meetActivationProximityConditions','getEventIconIndex','VRcYs','frontX','moveStraight','ZgqwZ','despawnRegions','EventId','isTriggerIn','...','searchLimit','_eventCopyData','log','qQovY','adjustDir8MovementSpeed','processMoveSynchRandom','MULTIPLY','Settings','SpawnEventAtXY','list','mOmbj','GetMoveSynchTarget','moveForward','_spriteOffsetX','visibleRange','VisibleRange','regionList','processMoveRouteTeleportToCharacter','textSizeEx','forceCarrying','BJutV','Game_Event_event','ApYPI','FALSE','region','event','_SavedEventLocations','execute','isEventClickTriggered','OperateValues','right','nXcGh','Label','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','PgbwC','charAt','Spriteset_Map_createShadow','Game_CharacterBase_moveDiagonally','createLabelWindows','isAutoBufferIcon','OffsetY','KjpTn','Game_Event_checkEventTriggerAuto','Game_CharacterBase_direction','updateOpacity','eeHhi','processMoveSynchApproach','Game_Character_forceMoveRoute','findDirectionTo','updateShadowChanges','key','_forceDashing','Passability','splice','push','VeFQC','processMoveRouteHugWall','opacity','turnTowardPoint','hasClickTrigger','hasStepAnime','_shadowSprite','FcKXt','processMoveSynchReverseMimic','CWaGw','diUov','findProperPageIndex','QfkGd','lEccT','ADDITIVE','processMoveRouteSelfVariable','forceDashing','call','slice','FavorHorz','Stop','hasMoveOnlyRegions','isTurnInPlace','processMoveSynch','lXWoq','_commonEventId','processMoveRouteJumpTo','Game_Event_findProperPageIndex','SLEEP','mirror\x20horz','toUpperCase','EventTemplates','regionId','processMoveRouteMoveRepeat','Game_Event_updateParallel','NrOso','deltaYFrom','Hidden','Game_CharacterBase_initMembers','filter','initialize','activationProximityType','addChild','All','IconIndex','isSupportDiagonalMovement','nJPUD','setDirection','_diagonalSupport','nUPNN','setPlayerControlDisable','note','Game_Enemy_meetsSwitchCondition','wbNXC','_MapSpawnedEventData','bind','_spawnData','Game_Troop_meetsConditions','AdvancedSwitches','eoWFU','BalloonOffsetY','pQkwY','LOWER\x20LEFT','isSaveEventLocation','isPlayerControlDisabled','isShadowShrink','characterIndexVS8','isOnRope','onLoadSuccess','Game_Event_start','LEFT','LOVE','parallelCommonEvents','isSelfVariable','type','ANNOYED','SpawnEventAtRegion','Game_Event_refresh','setup','Letter','TemplateName','isSaveEventLocations','VnraM','Visibility','pageId','_eventOverload','target','offsetY','reverseDir','AdvancedVariables','OXGRQ','CPC','isPressed','JdYdT','Game_Player_checkEventTriggerThere','process_VisuMZ_EventsMoveCore_Switches_Variables','checkEventTriggerHere','hBBTi','deltaY','Self\x20Switch\x20%1','moveDiagonally','UPPER\x20LEFT','hasEventIcon','updateText','turnAwayFromCharacter','EVAL','KTagK','VariableId','setupEventsMoveCoreNotetags','pageIndex','_tilemap','posEventsMoveCore','contents','removeTemporaryMapSpawnedEvents','roundYWithDirection','updateBitmapSmoothing','visible','_duration','ZytvD','PosY','value','eHaJL','Game_Map_update','meetActivationRegionConditions','zoomScale','SpawnEventDespawnAtXY','getDirectionFromPoint','gtoQe','Game_CommonEvent_isActive','contentsOpacity','_shadowGraphic','remove','checkEventsMoveCoreStringTags','Game_Variables_value','EXCLAMATION','processMoveRouteMoveToCharacter','getSelfTarget','%1Forbid','prepareSpawnedEventAtXY','isBattleTest','wdLeH','_hidden','isInVehicle','OSNgm','findTargetSprite','Game_CharacterBase_realMoveSpeed','vSFau','events','Region','bitmap','JOtFk','drawTextEx','Game_Event_meetsConditions','apply','_patternLocked','processMoveRouteFadeOut','loadCPC','ibhkI','isShadowVisible','deleteEventLocation','parameters','moveAwayFromCharacter','floor','AfTFJ','fMSDZ','yKsXL','setAllowEventAutoMovement','ARRAYSTR','EventLabelVisible','JmopI','fittingHeight','advancedFunc','isValid','start','moveSynchType','setBalloonPose','Window_NumberInput_processOk','isAllowCharacterTilt','ddUZE','updatePose','XZjEB','_labelWindows','firstSpawnedEventID','TiltVert','deleteIconsOnEventsData','_labelWindow','defaultFontSize','_moveSpeed','isDashingAndMoving','setValue','isAirshipPassable','setupSaveEventLocations','isRegionForbidPass','min','OpacitySpeed','xvSAY','getPosingCharacterIndex','isDashing','destinationX','eventsXyNt','clear','_selfTargetItemChoice','_characterName','dashSpeedModifier','_needsRefresh','YWWEl','cPSvl','vCego','registerSelfEvent','delay','Step2EventId','Game_Interpreter_executeCommand','checkEventTriggerAuto','custom','Template','LIGHT-BULB','_characterSprites','_moveOnlyRegions','hasAdvancedSwitchVariable','turnTowardCharacter','eventsXy','random','randomInt','setDestination','_commonEvents','terrainTag','_spawnedEvents','_eventMorphData','_mapId','getLastPluginCommandInterpreter','isSpawnedEvent','setupMorphEvent','Sprite_Character_setTileBitmap','AutoBalloon','_stepPattern','string','LIGHT','_waitMode','setupPageSettings','despawnEverything','pXVbD','registerSelfTarget','directionOnLadderSpriteVS8dir','xMOpZ','EventForbid','Game_Interpreter_updateWaitMode','processMoveRouteJumpToCharacter','AirshipSpeed','Game_CharacterBase_pattern','QyFdD','Game_Troop_meetsConditionsCPC','updateWaitMode','resetFontSettings','scale','Window_Message_startMessage','Rope','VS8','shadowFilename','Direction','VisibleEventLabels','USER-DEFINED\x203','setEventLabelsVisible','initEventsMoveCoreEffects','setupEventsMoveCoreCommentTags','TerrainTag','Game_CharacterBase_canPass','lastMovedDirection','stvrK','ITEM','status','DashingEnable','_CPCs','_cpc','ltgNk','boxWidth','MorphEventRemove','_encounterEffectDuration','Game_Event_meetsConditionsCPC','Window_NumberInput_start','setItemChoice','_clickTrigger','getInputDirection','some','_selfTarget','isNearTheScreen','swLcf','ksiBt','variables','SelfVariableID','startMapCommonEventOnOK','timer','_activationProximityAutoTriggerBypass','_erased','Game_Message_setNumberInput','Game_Map_setupEvents','pcylN','pickE','MorphEventTo','SPIN\x20ANTICLOCKWISE','canStartLocalEvents','checkActivationProximity','_data','mapId','List','setupEvents','Game_Character_setMoveRoute','airship','morphInto','_moveRoute','NtVci','checkNeedForPeriodicRefresh','NpcCm','isActive','clearPose','FastForwardKey','iKCha','WOglV','NOTE','mirror\x20vertical','createShadow','Game_CharacterBase_setDirection','processMoveRouteStepToCharacter','SPIN\x20CCW','uqdtU','DPVgf','enable','EnableDashTilt','gRHjo','createSpawnedEvent','return\x200','isEventOverloaded','HURT','isPassable','padZero','getInputDir8','reverse\x20mimic','isMoveOnlyRegionPassable','loadDataFile','ConvertParams','VisuMZ_0_CoreEngine','ojlcS','isRegionDockable','isCollidedWithEvents','refresh','variableId','IconSize','NORMAL','horizontal\x20mirror','getPosingCharacterDirection','PosX','setPose','kSgrE','eraseEvent','setMoveSpeed','_spriteOffsetY','checkAdvancedSwitchVariablePresent','FyGhi','clearStepPattern','_event','OBefM','canPassDiagonally','HMRCE','psJCn','Game_Map_events','requestAnimation','SpawnEventDespawnEventID','DefaultShadow','_EventIcons','startMapCommonEventOnOKTarget','_characterIndex','dwUMp','isMapPassable','PreSpawnJS','SwitchId','Xctyf','EventIconDelete','prepareSpawnedEventAtRegion','convertVariableValuesInScriptCall','MUSIC-NOTE','saveEventLocation','_callEventMap','processMoveRouteFadeIn','clearSelfTarget','processMoveCommand','HEART','executeCommand','rLthT','Self\x20Variable\x20%1','processDrawIcon','indexOf','dVKAS','pUDoN','AokVi','KiLoq','startMapCommonEventOnTouch','COLLAPSE','includes','_callEventData','mirror\x20horizontal','isBusy','autoEventIconBuffer','moveRouteIndex','getPose','iconIndex','SelfVariables','znUQp','processMoveCommandEventsMoveCore','onDatabaseLoaded','absDistance','split','Movement','Game_Player_isDashing','switch2Valid','KnQBH','pluginCommandCallEvent','_eventSpawnData','AYqmo','BULB','Wdgit','isBigCharacter','format','WalkForbid','_inputTime','SwitchGetSelfSwitchABCD','Scene_Load_onLoadSuccess','isAnyEventStarting','Sprite_Balloon_setup','esFaW','Uqzyk','_selfEvent','XAnoL','BalloonOffsetX','VisuMZ_2_DragonbonesUnion','updateSelfMovement','SelfSwitches','switch2Id','PlayerMovementDiagonal','isSelfSwitch','Operation','createLowerLayer','determineCommonEventsWithCPC','setLastPluginCommandInterpreter','ytDgv','_alwaysUpdateMove','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','iconSize','updatePosition','RemovePreserve','EventsMoveCore','IoOwp','createSaveEventLocationData','page','LIGHT\x20BULB','direction','zoFIZ','_activationProximity','EnableDir8','Collision','SCREEN','Game_Event_clearPageSettings','vertical\x20mirror','isOnLadder','Game_Player_isMapPassable','_eventIconSprite','MessageCore','labelWindowRange','processMoveRouteSelfSwitch','switch1Valid','Window_EventItem_onOk','createContents','_eventCache','savePreservedMorphEventDataKey','turnRight90','createLabelWindowForTarget','player','Vehicle','correctFacingDirection','updateTilt','Game_Map_refresh','Value','MoveAllSynchTargets','isSpriteVS8dir','OFF','COzWD','IconSet','MapId','SjXBw','PostSpawnJS','DKNOs','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Window_EventItem_onCancel','offsetX','mirror\x20vert','switchId','updateRoutineMove','BlendMode','_eventIcon','hasDragonbones','OwweN','PostCopyJS','height','OffsetX','max','clearSpriteOffsets','%1%2','yfTmv','updateMoveSynch','IconBufferX','WqwMN','HMPH','CAmdv','Icon','characterPatternYVS8','requestRefresh','Game_Event_setupPageSettings','lastSpawnedEvent','BQWwI','Game_CharacterBase_increaseSteps','Pgtaq','_vehicleType','processMoveSynchMirrorVert','_selfTargetNumberInput','createIconSprite','updateEventsMoveCoreTagChanges','Airship','hcosx','screenX','copy','getPosingCharacterPattern','MoveRouteIndex','vqvMt','BufferX','qJRAl','processMoveRouteMoveUntilStop','yYMdk','Game_Map_setup','updatePeriodicRefresh','DashModifier','_filename','onClickTrigger','jump','TargetVariableId','Window_ScrollText_startMessage','iLEaG','moveSynchTarget','windowPadding','update','GvbJF','distance','ywcvY','convertSelfVariableValuesInScriptCall','setPattern','Game_CharacterBase_moveStraight','down','VehicleForbid','setNumberInput','sItuf','Disable','setTileBitmap','Forbid','MUSIC\x20NOTE','pages','checkRegionEventTrigger','deleteSavedEventLocation','exit','command108','Game_Map_isDashDisabled','_pose','LfGfP','processMoveRouteBalloon','processMoveRouteJumpForward','DNrsz','iiIHw','QazrS','BWlUP','realMoveSpeed','MapID','COBWEB','itemPadding'];(function(_0x5462b3,_0x3fb2d1){const _0x4abbee=function(_0x2d93cd){while(--_0x2d93cd){_0x5462b3['push'](_0x5462b3['shift']());}};_0x4abbee(++_0x3fb2d1);}(_0x3fb2,0x1a0));const _0x4abb=function(_0x5462b3,_0x3fb2d1){_0x5462b3=_0x5462b3-0x0;let _0x4abbee=_0x3fb2[_0x5462b3];return _0x4abbee;};const _0x34cbd8=_0x4abb;var label=_0x34cbd8('0x219'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x34cbd8('0x80')](function(_0x1c3c8f){const _0x39988b=_0x34cbd8;return _0x1c3c8f[_0x39988b('0x166')]&&_0x1c3c8f['description'][_0x39988b('0x1e5')]('['+label+']');})[0x0];VisuMZ[label][_0x34cbd8('0x29')]=VisuMZ[label][_0x34cbd8('0x29')]||{},VisuMZ['ConvertParams']=function(_0x29e7aa,_0x179f12){const _0x111bd2=_0x34cbd8;for(const _0x35147e in _0x179f12){if(_0x111bd2('0x296')===_0x111bd2('0x204')){function _0x66abfc(){const _0x2c0e6a=_0x111bd2;this[_0x2c0e6a('0x53')]();}}else{if(_0x35147e[_0x111bd2('0x397')](/(.*):(.*)/i)){if(_0x111bd2('0x294')!==_0x111bd2('0x294')){function _0x5edae7(){const _0xa5e9b8=_0x111bd2;return this[_0xa5e9b8('0x11e')]();}}else{const _0x1b4a57=String(RegExp['$1']),_0x50b6e0=String(RegExp['$2'])[_0x111bd2('0x77')]()[_0x111bd2('0xb')]();let _0x21d134,_0x1dfa9b,_0xd53325;switch(_0x50b6e0){case _0x111bd2('0x2f1'):_0x21d134=_0x179f12[_0x35147e]!==''?Number(_0x179f12[_0x35147e]):0x0;break;case _0x111bd2('0x431'):_0x1dfa9b=_0x179f12[_0x35147e]!==''?JSON['parse'](_0x179f12[_0x35147e]):[],_0x21d134=_0x1dfa9b['map'](_0x435dd8=>Number(_0x435dd8));break;case _0x111bd2('0xc2'):_0x21d134=_0x179f12[_0x35147e]!==''?eval(_0x179f12[_0x35147e]):null;break;case'ARRAYEVAL':_0x1dfa9b=_0x179f12[_0x35147e]!==''?JSON[_0x111bd2('0x2c6')](_0x179f12[_0x35147e]):[],_0x21d134=_0x1dfa9b[_0x111bd2('0x2df')](_0x4540e4=>eval(_0x4540e4));break;case'JSON':_0x21d134=_0x179f12[_0x35147e]!==''?JSON[_0x111bd2('0x2c6')](_0x179f12[_0x35147e]):'';break;case'ARRAYJSON':_0x1dfa9b=_0x179f12[_0x35147e]!==''?JSON['parse'](_0x179f12[_0x35147e]):[],_0x21d134=_0x1dfa9b[_0x111bd2('0x2df')](_0x1c03ad=>JSON['parse'](_0x1c03ad));break;case'FUNC':_0x21d134=_0x179f12[_0x35147e]!==''?new Function(JSON['parse'](_0x179f12[_0x35147e])):new Function(_0x111bd2('0x1a2'));break;case _0x111bd2('0x396'):_0x1dfa9b=_0x179f12[_0x35147e]!==''?JSON[_0x111bd2('0x2c6')](_0x179f12[_0x35147e]):[],_0x21d134=_0x1dfa9b[_0x111bd2('0x2df')](_0x1b1ade=>new Function(JSON[_0x111bd2('0x2c6')](_0x1b1ade)));break;case'STR':_0x21d134=_0x179f12[_0x35147e]!==''?String(_0x179f12[_0x35147e]):'';break;case _0x111bd2('0x100'):_0x1dfa9b=_0x179f12[_0x35147e]!==''?JSON['parse'](_0x179f12[_0x35147e]):[],_0x21d134=_0x1dfa9b[_0x111bd2('0x2df')](_0x35638d=>String(_0x35638d));break;case _0x111bd2('0x31c'):_0xd53325=_0x179f12[_0x35147e]!==''?JSON[_0x111bd2('0x2c6')](_0x179f12[_0x35147e]):{},_0x29e7aa[_0x1b4a57]={},VisuMZ['ConvertParams'](_0x29e7aa[_0x1b4a57],_0xd53325);continue;case'ARRAYSTRUCT':_0x1dfa9b=_0x179f12[_0x35147e]!==''?JSON['parse'](_0x179f12[_0x35147e]):[],_0x21d134=_0x1dfa9b[_0x111bd2('0x2df')](_0xf87af8=>VisuMZ[_0x111bd2('0x1ab')]({},JSON[_0x111bd2('0x2c6')](_0xf87af8)));break;default:continue;}_0x29e7aa[_0x1b4a57]=_0x21d134;}}}}return _0x29e7aa;},(_0x1cc073=>{const _0x2e95e3=_0x34cbd8,_0x15470f=_0x1cc073[_0x2e95e3('0x439')];for(const _0x4772da of dependencies){if(!Imported[_0x4772da]){alert(_0x2e95e3('0x380')[_0x2e95e3('0x1fd')](_0x15470f,_0x4772da)),SceneManager[_0x2e95e3('0x28d')]();break;}}const _0x4f67af=_0x1cc073['description'];if(_0x4f67af[_0x2e95e3('0x397')](/\[Version[ ](.*?)\]/i)){const _0x305e2f=Number(RegExp['$1']);if(_0x305e2f!==VisuMZ[label][_0x2e95e3('0x3af')]){if(_0x2e95e3('0x430')!==_0x2e95e3('0x430')){function _0x39ea0b(){if(_0x46386b>0x0&&_0x58e3cd<0x0)return 0x9;if(_0x2ec3d3<0x0&&_0x143944<0x0)return 0x7;if(_0x3e796c>0x0&&_0x3a8caf>0x0)return 0x3;if(_0x1b6054<0x0&&_0x214b7a>0x0)return 0x1;}}else alert(_0x2e95e3('0x242')[_0x2e95e3('0x1fd')](_0x15470f,_0x305e2f)),SceneManager[_0x2e95e3('0x28d')]();}}if(_0x4f67af[_0x2e95e3('0x397')](/\[Tier[ ](\d+)\]/i)){const _0x3157ab=Number(RegExp['$1']);if(_0x3157ab<tier){if(_0x2e95e3('0x2b8')===_0x2e95e3('0x2b8'))alert(_0x2e95e3('0x43')[_0x2e95e3('0x1fd')](_0x15470f,_0x3157ab,tier)),SceneManager[_0x2e95e3('0x28d')]();else{function _0x12fa86(){const _0x2cb2e7=_0x2e95e3;if(this[_0x2cb2e7('0x23a')]())return this[_0x2cb2e7('0x9b')]();return _0x106788[_0x2cb2e7('0x219')]['Game_CharacterBase_characterIndex'][_0x2cb2e7('0x6a')](this);}}}else tier=Math[_0x2e95e3('0x24f')](_0x3157ab,tier);}VisuMZ[_0x2e95e3('0x1ab')](VisuMZ[label][_0x2e95e3('0x29')],_0x1cc073[_0x2e95e3('0xf9')]);})(pluginData),VisuMZ[_0x34cbd8('0x3f')]=function(_0xbce791,_0x470ec2,_0x28b66e){switch(_0x28b66e){case'=':return _0x470ec2;break;case'+':return _0xbce791+_0x470ec2;break;case'-':return _0xbce791-_0x470ec2;break;case'*':return _0xbce791*_0x470ec2;break;case'/':return _0xbce791/_0x470ec2;break;case'%':return _0xbce791%_0x470ec2;break;}return _0xbce791;},PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x2e8'),_0x5cb2fc=>{const _0x4700c7=_0x34cbd8;VisuMZ[_0x4700c7('0x1ab')](_0x5cb2fc,_0x5cb2fc);switch(_0x5cb2fc['Value']){case _0x4700c7('0x3df'):$gameSystem['setAllowEventAutoMovement'](!![]);break;case _0x4700c7('0x6d'):$gameSystem[_0x4700c7('0xff')](![]);break;case'Toggle':$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x4700c7('0x36f')]());break;}}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x3bf'),_0x306338=>{const _0x128c74=_0x34cbd8;VisuMZ[_0x128c74('0x1ab')](_0x306338,_0x306338);const _0x59e396={'mapId':_0x306338['MapId'],'eventId':_0x306338['EventId'],'pageId':_0x306338[_0x128c74('0x3b2')]};if(_0x59e396[_0x128c74('0x187')]<=0x0)_0x59e396[_0x128c74('0x187')]=$gameMap?$gameMap[_0x128c74('0x187')]():0x1;$gameTemp[_0x128c74('0x13e')]()[_0x128c74('0x1f7')](_0x59e396);}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x367'),_0x3d3992=>{const _0x4fb08f=_0x34cbd8;VisuMZ[_0x4fb08f('0x1ab')](_0x3d3992,_0x3d3992);switch(_0x3d3992[_0x4fb08f('0x238')]){case'Enable':$gameSystem[_0x4fb08f('0x34d')](!![]);break;case _0x4fb08f('0x286'):$gameSystem['setDashingEnabled'](![]);break;case _0x4fb08f('0x3d8'):$gameSystem['setDashingEnabled'](!$gameSystem['isDashingEnabled']());break;}}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],'EventIconChange',_0x2af2e7=>{const _0x2de07b=_0x34cbd8;VisuMZ[_0x2de07b('0x1ab')](_0x2af2e7,_0x2af2e7),_0x2af2e7[_0x2de07b('0x23e')]=_0x2af2e7[_0x2de07b('0x23e')]||$gameMap['mapId'](),$gameSystem['setEventIconDataKey'](_0x2af2e7[_0x2de07b('0x23e')],_0x2af2e7[_0x2de07b('0x1f')],_0x2af2e7['IconIndex'],_0x2af2e7[_0x2de07b('0x254')],_0x2af2e7[_0x2de07b('0x315')],_0x2af2e7['IconBlendMode']);}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x1d0'),_0x544bf4=>{const _0x5604c7=_0x34cbd8;VisuMZ[_0x5604c7('0x1ab')](_0x544bf4,_0x544bf4),_0x544bf4['MapId']=_0x544bf4[_0x5604c7('0x23e')]||$gameMap['mapId'](),$gameSystem['deleteIconsOnEventsDataKey'](_0x544bf4[_0x5604c7('0x23e')],_0x544bf4[_0x5604c7('0x1f')]);}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],'EventLabelRefresh',_0x407a8e=>{const _0x5926df=_0x34cbd8;if($gameMap){if(_0x5926df('0x37d')!==_0x5926df('0x1bd'))for(const _0x2acaa5 of $gameMap[_0x5926df('0xec')]()){if(_0x5926df('0x23f')===_0x5926df('0x4b')){function _0x4c0fd5(){const _0x682129=_0x5926df;return this[_0x682129('0x1c')](_0x115c50);}}else _0x2acaa5[_0x5926df('0x1b0')]();}else{function _0xc06b60(){const _0x3ed5e2=_0x5926df;_0x577e3f=_0x4cbc23[_0x3ed5e2('0x3b0')](_0x2e1830,(_0xf9fe52,_0x5e547e)=>_0x778959[_0x3ed5e2('0xd1')](_0x3d01ea(_0x5e547e)));}}}}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x101'),_0x447d97=>{const _0x26f81c=_0x34cbd8;VisuMZ[_0x26f81c('0x1ab')](_0x447d97,_0x447d97);switch(_0x447d97[_0x26f81c('0xac')]){case _0x26f81c('0x2b2'):$gameSystem[_0x26f81c('0x15e')](!![]);break;case _0x26f81c('0x7e'):$gameSystem[_0x26f81c('0x15e')](![]);break;case _0x26f81c('0x3d8'):$gameSystem[_0x26f81c('0x15e')](!$gameSystem['eventLabelsVisible']());break;}}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],'EventLocationSave',_0x7b76ce=>{const _0x76d0b1=_0x34cbd8;VisuMZ['ConvertParams'](_0x7b76ce,_0x7b76ce);if(!$gameMap)return;const _0x3223e1=$gameMap[_0x76d0b1('0x3b')](_0x7b76ce[_0x76d0b1('0x1f')]);if(_0x3223e1)_0x3223e1[_0x76d0b1('0x1d4')]();}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],'EventLocationDelete',_0x2d802a=>{const _0xbea789=_0x34cbd8;VisuMZ[_0xbea789('0x1ab')](_0x2d802a,_0x2d802a);const _0x25911e=_0x2d802a[_0xbea789('0x23e')]||$gameMap[_0xbea789('0x187')](),_0x21cd58=_0x2d802a[_0xbea789('0x1f')];$gameSystem['deleteSavedEventLocationKey'](_0x25911e,_0x21cd58);}),PluginManager[_0x34cbd8('0x29f')](pluginData['name'],_0x34cbd8('0x3e2'),_0x2c5f75=>{const _0x7f645f=_0x34cbd8;VisuMZ['ConvertParams'](_0x2c5f75,_0x2c5f75);const _0x3241be=_0x2c5f75[_0x7f645f('0x23e')]||$gameMap['mapId'](),_0x2dbd74=_0x2c5f75[_0x7f645f('0x1f')]||0x1,_0x2b71c3=_0x2c5f75['PosX']||0x0,_0x1d1fe9=_0x2c5f75['PosY']||0x0,_0x3c7a2a=_0x2c5f75[_0x7f645f('0x15b')]||0x2,_0x3f5620=((_0x2c5f75[_0x7f645f('0x3b2')]||0x1)-0x1)[_0x7f645f('0x40b')](0x0,0x13),_0x60da84=_0x2c5f75[_0x7f645f('0x26a')]||0x0;$gameSystem[_0x7f645f('0x21b')](_0x3241be,_0x2dbd74,_0x2b71c3,_0x1d1fe9,_0x3c7a2a,_0x3f5620,_0x60da84);}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x200'),_0x28bbdc=>{const _0x3e7f83=_0x34cbd8;VisuMZ[_0x3e7f83('0x1ab')](_0x28bbdc,_0x28bbdc),_0x28bbdc['MapId']=_0x28bbdc[_0x3e7f83('0x23e')]||$gameMap[_0x3e7f83('0x187')]();const _0x149058=[_0x28bbdc['MapId'],_0x28bbdc[_0x3e7f83('0x1f')],_0x28bbdc['Letter']],_0x8b10d3=_0x28bbdc['TargetSwitchId'],_0xefcf70=$gameSelfSwitches[_0x3e7f83('0xd1')](_0x149058)||![];$gameSwitches[_0x3e7f83('0x116')](_0x8b10d3,_0xefcf70);}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x339'),_0x196960=>{const _0x55bb83=_0x34cbd8;VisuMZ[_0x55bb83('0x1ab')](_0x196960,_0x196960),_0x196960[_0x55bb83('0x23e')]=_0x196960['MapId']||$gameMap[_0x55bb83('0x187')]();const _0x47dcc0=[_0x196960['MapId'],_0x196960[_0x55bb83('0x1f')],_0x55bb83('0xbc')[_0x55bb83('0x1fd')](_0x196960[_0x55bb83('0x1ce')])],_0x357de9=_0x196960['TargetSwitchId'],_0x3dcfe3=$gameSelfSwitches[_0x55bb83('0xd1')](_0x47dcc0)||![];$gameSwitches['setValue'](_0x357de9,_0x3dcfe3);}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x36a'),_0x64ee52=>{const _0x3e2116=_0x34cbd8;VisuMZ[_0x3e2116('0x1ab')](_0x64ee52,_0x64ee52),_0x64ee52[_0x3e2116('0x23e')]=_0x64ee52[_0x3e2116('0x23e')]||$gameMap['mapId']();const _0x15af59=[_0x64ee52['MapId'],_0x64ee52[_0x3e2116('0x1f')],_0x3e2116('0x1dc')[_0x3e2116('0x1fd')](_0x64ee52[_0x3e2116('0xc4')])],_0x15693a=_0x64ee52[_0x3e2116('0x276')],_0x4e0d3b=$gameSelfSwitches[_0x3e2116('0xd1')](_0x15af59)||![];$gameVariables['setValue'](_0x15693a,_0x4e0d3b);}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x182'),_0x2443a5=>{const _0x200ba4=_0x34cbd8;VisuMZ['ConvertParams'](_0x2443a5,_0x2443a5);if(!$gameMap)return;const _0x25907a=_0x2443a5['Step2Preserve'];_0x2443a5[_0x200ba4('0x42f')]=_0x2443a5[_0x200ba4('0x42f')]||$gameMap[_0x200ba4('0x187')](),_0x2443a5[_0x200ba4('0x13')]=_0x2443a5['Step2MapId']||$gameMap[_0x200ba4('0x187')](),_0x2443a5[_0x200ba4('0xa9')]=_0x2443a5['TemplateName'][_0x200ba4('0x77')]()[_0x200ba4('0xb')]();if(!_0x25907a&&_0x2443a5[_0x200ba4('0x42f')]!==$gameMap[_0x200ba4('0x187')]())return;if($gameMap[_0x200ba4('0x187')]()===_0x2443a5['Step1MapId']){if(_0x200ba4('0x3b3')===_0x200ba4('0x3b3')){const _0x3830f3=$gameMap[_0x200ba4('0x3b')](_0x2443a5['Step1EventId']);if(!_0x3830f3)return;if(_0x2443a5[_0x200ba4('0xa9')]!=='UNTITLED')_0x3830f3[_0x200ba4('0x323')](_0x2443a5[_0x200ba4('0xa9')]);else{if('BWlUP'!==_0x200ba4('0x297')){function _0x1982ef(){const _0xed32ff=_0x200ba4;if(this[_0xed32ff('0x364')]===_0x5e6a25)this['initEventsMoveCore']();if(this[_0xed32ff('0x364')]['VisibleEventLabels']===_0x5098fc)this['initEventsMoveCore']();return this[_0xed32ff('0x364')][_0xed32ff('0x15c')];}}else _0x3830f3[_0x200ba4('0x18c')](_0x2443a5[_0x200ba4('0x13')],_0x2443a5[_0x200ba4('0x12b')]);}}else{function _0x49f606(){const _0x3eb109=_0x200ba4;this[_0x3eb109('0x89')]=_0x577d1[_0x3eb109('0x219')][_0x3eb109('0x29')][_0x3eb109('0x1f3')][_0x3eb109('0x221')];const _0x9fff1f=_0x2ddb7c['note']||'';if(_0x9fff1f['match'](/<DIAGONAL MOVEMENT: ON>/i))this[_0x3eb109('0x89')]=!![];else _0x9fff1f['match'](/<DIAGONAL MOVEMENT: OFF>/i)&&(this['_diagonalSupport']=![]);}}}_0x25907a&&$gameSystem[_0x200ba4('0x230')](_0x2443a5[_0x200ba4('0x42f')],_0x2443a5['Step1EventId'],_0x2443a5[_0x200ba4('0xa9')],_0x2443a5[_0x200ba4('0x13')],_0x2443a5[_0x200ba4('0x12b')]);}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x16c'),_0x33935b=>{const _0x1b6ee8=_0x34cbd8;VisuMZ[_0x1b6ee8('0x1ab')](_0x33935b,_0x33935b);if(!$gameMap)return;_0x33935b[_0x1b6ee8('0x23e')]=_0x33935b[_0x1b6ee8('0x23e')]||$gameMap[_0x1b6ee8('0x187')]();if($gameMap[_0x1b6ee8('0x187')]()===_0x33935b[_0x1b6ee8('0x23e')]){const _0xace7b5=$gameMap[_0x1b6ee8('0x3b')](_0x33935b[_0x1b6ee8('0x1f')]);_0xace7b5[_0x1b6ee8('0x413')]();}_0x33935b[_0x1b6ee8('0x218')]&&$gameSystem[_0x1b6ee8('0x3d3')](_0x33935b[_0x1b6ee8('0x23e')],_0x33935b[_0x1b6ee8('0x1f')]);}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x2eb'),_0x5ce150=>{const _0x389c96=_0x34cbd8;VisuMZ[_0x389c96('0x1ab')](_0x5ce150,_0x5ce150),$gameSystem['setPlayerControlDisable'](!_0x5ce150['Enable']);}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x20d'),_0x3c7973=>{const _0x4c4e13=_0x34cbd8;VisuMZ[_0x4c4e13('0x1ab')](_0x3c7973,_0x3c7973),$gameSystem[_0x4c4e13('0x3e4')](_0x3c7973['Setting']);}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x361'),_0x1ec7bc=>{const _0x10abb2=_0x34cbd8;VisuMZ[_0x10abb2('0x1ab')](_0x1ec7bc,_0x1ec7bc),$gameSystem[_0x10abb2('0x351')]($gamePlayer,_0x1ec7bc[_0x10abb2('0x85')],_0x1ec7bc['IconBufferX'],_0x1ec7bc['IconBufferY'],_0x1ec7bc[_0x10abb2('0x302')]);}),PluginManager['registerCommand'](pluginData['name'],_0x34cbd8('0x304'),_0x569502=>{const _0x16835a=_0x34cbd8;VisuMZ[_0x16835a('0x1ab')](_0x569502,_0x569502),$gameSystem[_0x16835a('0x111')]($gamePlayer);}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x41b'),_0x552fcd=>{const _0x12f0cc=_0x34cbd8;VisuMZ[_0x12f0cc('0x1ab')](_0x552fcd,_0x552fcd),_0x552fcd[_0x12f0cc('0x23e')]=_0x552fcd[_0x12f0cc('0x23e')]||$gameMap[_0x12f0cc('0x187')]();const _0x297799=[_0x552fcd[_0x12f0cc('0x23e')],_0x552fcd[_0x12f0cc('0x1f')],_0x552fcd[_0x12f0cc('0xa8')]];switch(_0x552fcd[_0x12f0cc('0x238')]){case'ON':$gameSelfSwitches[_0x12f0cc('0x116')](_0x297799,!![]);break;case'OFF':$gameSelfSwitches[_0x12f0cc('0x116')](_0x297799,![]);break;case'Toggle':$gameSelfSwitches[_0x12f0cc('0x116')](_0x297799,!$gameSelfSwitches[_0x12f0cc('0xd1')](_0x297799));break;}}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x2b3'),_0x5614f6=>{const _0x2ad8cd=_0x34cbd8;VisuMZ[_0x2ad8cd('0x1ab')](_0x5614f6,_0x5614f6),_0x5614f6['MapId']=_0x5614f6[_0x2ad8cd('0x23e')]||$gameMap['mapId']();const _0x298f71=[_0x5614f6[_0x2ad8cd('0x23e')],_0x5614f6[_0x2ad8cd('0x1f')],'Self\x20Switch\x20%1'['format'](_0x5614f6[_0x2ad8cd('0x1ce')])];switch(_0x5614f6[_0x2ad8cd('0x238')]){case'ON':$gameSelfSwitches[_0x2ad8cd('0x116')](_0x298f71,!![]);break;case _0x2ad8cd('0x23b'):$gameSelfSwitches[_0x2ad8cd('0x116')](_0x298f71,![]);break;case _0x2ad8cd('0x3d8'):$gameSelfSwitches[_0x2ad8cd('0x116')](_0x298f71,!$gameSelfSwitches[_0x2ad8cd('0xd1')](_0x298f71));break;}}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x179'),_0x250008=>{const _0x4ba721=_0x34cbd8;VisuMZ[_0x4ba721('0x1ab')](_0x250008,_0x250008);const _0x4f34fb=[_0x250008[_0x4ba721('0x23e')],_0x250008[_0x4ba721('0x1f')],_0x4ba721('0x1dc')[_0x4ba721('0x1fd')](_0x250008[_0x4ba721('0xc4')])];_0x250008[_0x4ba721('0x23e')]=_0x250008['MapId']||$gameMap[_0x4ba721('0x187')]();const _0x2e496d=VisuMZ[_0x4ba721('0x3f')]($gameSelfSwitches[_0x4ba721('0xd1')](_0x4f34fb),_0x250008[_0x4ba721('0x238')],_0x250008[_0x4ba721('0x20f')]);$gameSelfSwitches[_0x4ba721('0x116')](_0x4f34fb,_0x2e496d);}),PluginManager[_0x34cbd8('0x29f')](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x2a'),_0x567541=>{const _0x461a35=_0x34cbd8;VisuMZ[_0x461a35('0x1ab')](_0x567541,_0x567541);const _0x100fb9={'template':_0x567541[_0x461a35('0xa9')],'mapId':_0x567541[_0x461a35('0x23e')],'eventId':_0x567541[_0x461a35('0x1f')],'x':_0x567541['PosX'],'y':_0x567541[_0x461a35('0xd0')],'spawnPreserved':_0x567541[_0x461a35('0x54')],'spawnEventId':$gameMap['_spawnedEvents'][_0x461a35('0x31b')]+0x3e8};$gameMap[_0x461a35('0xe3')](_0x100fb9,_0x567541[_0x461a35('0x222')],_0x567541[_0x461a35('0x56')]);}),PluginManager[_0x34cbd8('0x29f')](pluginData['name'],_0x34cbd8('0xa5'),_0x5c2fd2=>{const _0x57ec1b=_0x34cbd8;VisuMZ[_0x57ec1b('0x1ab')](_0x5c2fd2,_0x5c2fd2);const _0x5acb56={'template':_0x5c2fd2[_0x57ec1b('0xa9')],'mapId':_0x5c2fd2['MapId'],'eventId':_0x5c2fd2['EventId'],'x':-0x1,'y':-0x1,'spawnPreserved':_0x5c2fd2[_0x57ec1b('0x54')],'spawnEventId':$gameMap[_0x57ec1b('0x13b')][_0x57ec1b('0x31b')]+0x3e8};$gameMap[_0x57ec1b('0x1d1')](_0x5acb56,_0x5c2fd2['Region'],_0x5c2fd2[_0x57ec1b('0x222')],_0x5c2fd2['Passability']);}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0x1c6'),_0x2e92c8=>{const _0x284974=_0x34cbd8;VisuMZ[_0x284974('0x1ab')](_0x2e92c8,_0x2e92c8),$gameMap['despawnEventId'](_0x2e92c8[_0x284974('0x362')]);}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],_0x34cbd8('0xd6'),_0x3eb9f8=>{const _0x39b23f=_0x34cbd8;VisuMZ[_0x39b23f('0x1ab')](_0x3eb9f8,_0x3eb9f8);const _0xb01078=_0x3eb9f8[_0x39b23f('0x1b6')],_0x21cd75=_0x3eb9f8['PosY'];$gameMap[_0x39b23f('0x3f7')](_0xb01078,_0x21cd75);}),PluginManager['registerCommand'](pluginData[_0x34cbd8('0x439')],'SpawnEventDespawnRegions',_0x48ea05=>{const _0x31bd27=_0x34cbd8;VisuMZ[_0x31bd27('0x1ab')](_0x48ea05,_0x48ea05),$gameMap[_0x31bd27('0x1e')](_0x48ea05[_0x31bd27('0xed')]);}),PluginManager[_0x34cbd8('0x29f')](pluginData['name'],'SpawnEventDespawnEverything',_0x4caf10=>{const _0x3a2194=_0x34cbd8;VisuMZ['ConvertParams'](_0x4caf10,_0x4caf10),$gameMap[_0x3a2194('0x148')]();}),VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x372')]=Scene_Boot[_0x34cbd8('0x29d')][_0x34cbd8('0x1f0')],Scene_Boot[_0x34cbd8('0x29d')][_0x34cbd8('0x1f0')]=function(){const _0x3ae25c=_0x34cbd8;VisuMZ[_0x3ae25c('0x219')][_0x3ae25c('0x372')][_0x3ae25c('0x6a')](this),this[_0x3ae25c('0x215')](),this[_0x3ae25c('0xb8')]();if(VisuMZ[_0x3ae25c('0x219')]['CustomPageConditions'])VisuMZ['EventsMoveCore'][_0x3ae25c('0x335')][_0x3ae25c('0x81')]();},VisuMZ[_0x34cbd8('0x308')]=[],VisuMZ[_0x34cbd8('0x78')]={},Scene_Boot[_0x34cbd8('0x29d')]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x5f0537=_0x34cbd8;if(DataManager[_0x5f0537('0xe4')]()||DataManager[_0x5f0537('0x352')]())return;const _0x2c1177=VisuMZ[_0x5f0537('0x219')]['Settings']['Template'],_0x25dbcb=_0x2c1177[_0x5f0537('0x2c7')][_0x5f0537('0x6b')](0x0);for(const _0x2a9408 of _0x2c1177[_0x5f0537('0x188')]){if(_0x5f0537('0xc3')!==_0x5f0537('0x436')){_0x2a9408[_0x5f0537('0x341')]=_0x2a9408['Name'][_0x5f0537('0x77')]()['trim'](),VisuMZ['EventTemplates'][_0x2a9408['Name']]=_0x2a9408;if(!_0x25dbcb[_0x5f0537('0x1e5')](_0x2a9408[_0x5f0537('0x299')]))_0x25dbcb[_0x5f0537('0x58')](_0x2a9408[_0x5f0537('0x299')]);}else{function _0x788785(){const _0x108943=_0x5f0537,_0x39e935=_0x132eed(_0x1bfdbb['$1'])[_0x108943('0x77')]()[_0x108943('0xb')](),_0x3dc8c6=['NORMAL',_0x108943('0x67'),_0x108943('0x28'),_0x108943('0x223')];this[_0x108943('0x249')]['blendMode']=_0x3dc8c6[_0x108943('0x1de')](_0x39e935)['clamp'](0x0,0x3);}}}for(const _0xa65cde of _0x25dbcb){if(_0x5f0537('0x11c')!==_0x5f0537('0x2fc')){if(VisuMZ[_0x5f0537('0x308')][_0xa65cde])continue;const _0x5aba8b='Map%1.json'['format'](_0xa65cde[_0x5f0537('0x1a6')](0x3)),_0x4dab53=_0x5f0537('0x2de')[_0x5f0537('0x1fd')](_0xa65cde);DataManager[_0x5f0537('0x1aa')](_0x4dab53,_0x5aba8b),setTimeout(this[_0x5f0537('0x2ba')][_0x5f0537('0x90')](this,_0xa65cde,_0x4dab53),0x64);}else{function _0x29f761(){const _0x21d816=_0x5f0537,_0xa3265a=this[_0x21d816('0x331')](_0x18b533),_0x3d4e02=this[_0x21d816('0x7d')](_0xc7d644);}}}},Scene_Boot['prototype'][_0x34cbd8('0x2ba')]=function(_0x5e18e3,_0x5af92c){const _0x4e4b02=_0x34cbd8;window[_0x5af92c]?(VisuMZ['PreloadedMaps'][_0x5e18e3]=window[_0x5af92c],window[_0x5af92c]=undefined):setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x4e4b02('0x90')](this,_0x5e18e3,_0x5af92c),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x34cbd8('0x20b')]=[],VisuMZ[_0x34cbd8('0xb2')]=[],VisuMZ[_0x34cbd8('0x1ed')]=[],Scene_Boot['prototype'][_0x34cbd8('0xb8')]=function(){const _0x543c4c=_0x34cbd8;for(let _0x4619f0=0x1;_0x4619f0<$dataSystem['switches']['length'];_0x4619f0++){if(_0x543c4c('0x382')!==_0x543c4c('0x373')){if($dataSystem['switches'][_0x4619f0][_0x543c4c('0x397')](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x543c4c('0x93')]['push'](_0x4619f0);if($dataSystem[_0x543c4c('0x33c')][_0x4619f0][_0x543c4c('0x397')](/<SELF>/i))VisuMZ[_0x543c4c('0x20b')][_0x543c4c('0x58')](_0x4619f0);}else{function _0x265692(){const _0x1d9ecb=_0x543c4c,_0x21346c=_0x59e667(_0x4a077e['$1'])[_0x1d9ecb('0x77')]()[_0x1d9ecb('0xb')]();return this[_0x1d9ecb('0x1b7')](_0x21346c);}}}for(let _0x42a0b9=0x1;_0x42a0b9<$dataSystem['variables'][_0x543c4c('0x31b')];_0x42a0b9++){if($dataSystem[_0x543c4c('0x178')][_0x42a0b9][_0x543c4c('0x397')](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x543c4c('0xb2')][_0x543c4c('0x58')](_0x42a0b9);if($dataSystem[_0x543c4c('0x178')][_0x42a0b9][_0x543c4c('0x397')](/<SELF>/i))VisuMZ[_0x543c4c('0x1ed')][_0x543c4c('0x58')](_0x42a0b9);}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x335')]={},VisuMZ[_0x34cbd8('0x219')]['CustomPageConditions']['initialize']=function(){const _0x5b4c64=_0x34cbd8;this[_0x5b4c64('0x2f9')]=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x335')][_0x34cbd8('0x211')]=function(){const _0x39d60a=_0x34cbd8;this[_0x39d60a('0x139')]=[];for(const _0x2f2cdd of $dataCommonEvents){if(!_0x2f2cdd)continue;VisuMZ[_0x39d60a('0x219')][_0x39d60a('0x335')][_0x39d60a('0xf5')](_0x2f2cdd);if(_0x2f2cdd['CPC'][_0x39d60a('0x31b')]>0x0)this[_0x39d60a('0x139')][_0x39d60a('0x58')](_0x2f2cdd['id']);}},VisuMZ['EventsMoveCore']['CustomPageConditions']['metCPC']=function(_0x4fff88,_0x14b179){const _0x1e778f=_0x34cbd8;return this['_interpreter'][_0x1e778f('0xa7')](_0x4fff88,_0x14b179),this[_0x1e778f('0x2f9')][_0x1e778f('0x3d')](),this[_0x1e778f('0x2f9')][_0x1e778f('0x169')];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x335')][_0x34cbd8('0xf5')]=function(_0x567821){const _0x75e5b=_0x34cbd8;let _0x4587f0=![];_0x567821[_0x75e5b('0xb4')]=[];for(const _0x10a7e6 of _0x567821[_0x75e5b('0x2b')]){if([0x6c,0x198][_0x75e5b('0x1e5')](_0x10a7e6[_0x75e5b('0x37c')])){const _0x48645d=_0x10a7e6[_0x75e5b('0xf9')][0x0];if(_0x48645d[_0x75e5b('0x397')](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x75e5b('0x241')===_0x75e5b('0x2b0')){function _0x216a29(){const _0x20e460=_0x75e5b,_0x126645=this[_0x20e460('0x410')](_0x1b822c,_0x41b94c,!![]);if(_0x126645)this[_0x20e460('0x321')](_0x126645);}}else _0x4587f0=!![];}else{if(_0x48645d['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x75e5b('0x152')==='QyFdD')_0x4587f0=![];else{function _0x5a49ec(){const _0x56bc7d=_0x75e5b;_0x48ae5a[_0x56bc7d('0x1ab')](_0x58eb67,_0x33569e),_0x52ae22[_0x56bc7d('0x23e')]=_0x306287[_0x56bc7d('0x23e')]||_0x4b0aa1[_0x56bc7d('0x187')]();const _0x64325e=[_0x1e0fa4[_0x56bc7d('0x23e')],_0x9e09fd[_0x56bc7d('0x1f')],_0x17e886['Letter']],_0x355f5f=_0x1dd18f[_0x56bc7d('0x2c1')],_0x47ccc6=_0x1e830f[_0x56bc7d('0xd1')](_0x64325e)||![];_0x4fb666['setValue'](_0x355f5f,_0x47ccc6);}}}}}_0x4587f0&&_0x567821[_0x75e5b('0xb4')][_0x75e5b('0x58')](_0x10a7e6);}},getSelfSwitchValue=function(_0x4af8ef,_0x1cfcc8,_0x2d0261){const _0x4a5dfb=_0x34cbd8;let _0x43f7c9=[_0x4af8ef,_0x1cfcc8,_0x4a5dfb('0xbc')[_0x4a5dfb('0x1fd')](_0x2d0261)];return typeof _0x2d0261==='string'&&(_0x43f7c9=[_0x4af8ef,_0x1cfcc8,_0x2d0261[_0x4a5dfb('0x77')]()[_0x4a5dfb('0xb')]()]),$gameSelfSwitches[_0x4a5dfb('0xd1')](_0x43f7c9);},getSelfVariableValue=function(_0x2700f0,_0x1997d2,_0x47c735){const _0x34f5af=_0x34cbd8,_0x19337e=[_0x2700f0,_0x1997d2,_0x34f5af('0x1dc')[_0x34f5af('0x1fd')](_0x47c735)];return $gameSelfSwitches[_0x34f5af('0xd1')](_0x19337e);},setSelfSwitchValue=function(_0x200137,_0x18fd57,_0x319228,_0x210df9){const _0xf418a2=_0x34cbd8;let _0x4a2d86=[_0x200137,_0x18fd57,_0xf418a2('0xbc')[_0xf418a2('0x1fd')](_0x319228)];if(typeof _0x319228===_0xf418a2('0x144')){if('AfTFJ'===_0xf418a2('0xfc'))_0x4a2d86=[_0x200137,_0x18fd57,_0x319228[_0xf418a2('0x77')]()['trim']()];else{function _0x4e08a3(){const _0x241c4d=_0xf418a2;return _0x2a5982[_0x241c4d('0x24f')](_0x295335[_0x241c4d('0x30c')](this['deltaX'](_0x2608bd,_0x4ce073)),_0x152877[_0x241c4d('0x30c')](this[_0x241c4d('0xbb')](_0x4fbbfa,_0x4d909c)));}}}},setSelfVariableValue=function(_0x29e143,_0x1c2a65,_0x4b2f6a,_0x587bf7){const _0x178668=_0x34cbd8,_0x17d71d=[_0x29e143,_0x1c2a65,'Self\x20Variable\x20%1'[_0x178668('0x1fd')](_0x4b2f6a)];},DataManager['isAdvancedSwitch']=function(_0xfcd394){const _0xd85f2f=_0x34cbd8;if(SceneManager[_0xd85f2f('0x394')][_0xd85f2f('0x408')]===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0xd85f2f('0x1e5')](_0xfcd394);},DataManager[_0x34cbd8('0x366')]=function(_0x3ec3ce){const _0xc56f8f=_0x34cbd8;if(SceneManager[_0xc56f8f('0x394')][_0xc56f8f('0x408')]===Scene_Debug)return![];return VisuMZ['AdvancedVariables'][_0xc56f8f('0x1e5')](_0x3ec3ce);},DataManager[_0x34cbd8('0x20e')]=function(_0x4e1779){const _0x5a2436=_0x34cbd8;if(SceneManager[_0x5a2436('0x394')][_0x5a2436('0x408')]===Scene_Debug)return![];return VisuMZ[_0x5a2436('0x20b')][_0x5a2436('0x1e5')](_0x4e1779);},DataManager[_0x34cbd8('0xa2')]=function(_0x4c9fdb){const _0x40b642=_0x34cbd8;if(SceneManager['_scene'][_0x40b642('0x408')]===Scene_Debug)return![];return VisuMZ[_0x40b642('0x1ed')][_0x40b642('0x1e5')](_0x4c9fdb);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x2c0')]=Game_Temp['prototype'][_0x34cbd8('0x138')],Game_Temp[_0x34cbd8('0x29d')][_0x34cbd8('0x138')]=function(_0x163bdd,_0x333e3c){const _0x2b20c1=_0x34cbd8;if(this[_0x2b20c1('0x3e')](_0x163bdd,_0x333e3c))return;VisuMZ[_0x2b20c1('0x219')][_0x2b20c1('0x2c0')][_0x2b20c1('0x6a')](this,_0x163bdd,_0x333e3c);},Game_Temp[_0x34cbd8('0x29d')][_0x34cbd8('0x3e')]=function(_0x5234b8,_0x28e1cf){const _0x13ed6e=_0x34cbd8,_0x566abb=$gameMap['eventsXy'](_0x5234b8,_0x28e1cf);for(const _0x5c7939 of _0x566abb){if(_0x5c7939&&_0x5c7939[_0x13ed6e('0x5d')]())return _0x5c7939[_0x13ed6e('0x274')](),!![];}return![];},Game_Temp[_0x34cbd8('0x29d')]['setLastPluginCommandInterpreter']=function(_0x11da0b){this['_lastPluginCommandInterpreter']=_0x11da0b;},Game_Temp[_0x34cbd8('0x29d')][_0x34cbd8('0x13e')]=function(){const _0x2d5b26=_0x34cbd8;return this[_0x2d5b26('0x2b5')];},Game_Temp[_0x34cbd8('0x29d')][_0x34cbd8('0x14a')]=function(_0x34de2c){const _0x374738=_0x34cbd8;this[_0x374738('0x174')]=_0x34de2c;},Game_Temp[_0x34cbd8('0x29d')][_0x34cbd8('0x1d7')]=function(){this['_selfTarget']=undefined;},Game_Temp['prototype'][_0x34cbd8('0xe1')]=function(){const _0x2aadc6=_0x34cbd8;return this[_0x2aadc6('0x174')];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x2ff')]=Game_System[_0x34cbd8('0x29d')]['initialize'],Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x81')]=function(){const _0x28105f=_0x34cbd8;VisuMZ[_0x28105f('0x219')][_0x28105f('0x2ff')]['call'](this),this[_0x28105f('0x392')]();},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x392')]=function(){const _0x4452d0=_0x34cbd8;this[_0x4452d0('0x364')]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x4452d0('0x1c8')]={},this['_MapSpawnedEventData']=[],this['_PreservedEventMorphData']={},this[_0x4452d0('0x3c')]={},this['_DisablePlayerControl']=![],this['_PlayerDiagonalSetting']='default';},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x2e1')]=function(){const _0xd99dff=_0x34cbd8;if(this['_EventsMoveCoreSettings']===undefined)this[_0xd99dff('0x392')]();if(this['_EventsMoveCoreSettings'][_0xd99dff('0x167')]===undefined)this[_0xd99dff('0x392')]();return this['_EventsMoveCoreSettings'][_0xd99dff('0x167')];},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x34d')]=function(_0x221963){const _0x58cdb4=_0x34cbd8;if(this[_0x58cdb4('0x364')]===undefined)this[_0x58cdb4('0x392')]();if(this[_0x58cdb4('0x364')][_0x58cdb4('0x167')]===undefined)this['initEventsMoveCore']();this[_0x58cdb4('0x364')][_0x58cdb4('0x167')]=_0x221963;},Game_System['prototype'][_0x34cbd8('0x36f')]=function(){const _0x29d9d3=_0x34cbd8;if(this[_0x29d9d3('0x364')]===undefined)this[_0x29d9d3('0x392')]();if(this[_0x29d9d3('0x364')][_0x29d9d3('0x3db')]===undefined)this['initEventsMoveCore']();return this[_0x29d9d3('0x364')][_0x29d9d3('0x3db')];},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0xff')]=function(_0x4da75c){const _0x3cceee=_0x34cbd8;if(this[_0x3cceee('0x364')]===undefined)this[_0x3cceee('0x392')]();if(this['_EventsMoveCoreSettings'][_0x3cceee('0x3db')]===undefined)this['initEventsMoveCore']();this[_0x3cceee('0x364')][_0x3cceee('0x3db')]=_0x4da75c;},Game_System[_0x34cbd8('0x29d')]['eventLabelsVisible']=function(){const _0x180c75=_0x34cbd8;if(this['_EventsMoveCoreSettings']===undefined)this[_0x180c75('0x392')]();if(this[_0x180c75('0x364')][_0x180c75('0x15c')]===undefined)this['initEventsMoveCore']();return this[_0x180c75('0x364')][_0x180c75('0x15c')];},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x15e')]=function(_0x130a79){const _0x3bcccd=_0x34cbd8;if(this[_0x3bcccd('0x364')]===undefined)this[_0x3bcccd('0x392')]();if(this[_0x3bcccd('0x364')][_0x3bcccd('0x15c')]===undefined)this[_0x3bcccd('0x392')]();this[_0x3bcccd('0x364')][_0x3bcccd('0x15c')]=_0x130a79;},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x99')]=function(){const _0x4fff46=_0x34cbd8;if(this[_0x4fff46('0x406')]===undefined){if(_0x4fff46('0x18e')!==_0x4fff46('0x62'))this[_0x4fff46('0x406')]=![];else{function _0x4e6a77(){const _0x50d941=_0x4fff46;_0x1ddca2['EventsMoveCore'][_0x50d941('0x372')]['call'](this),this[_0x50d941('0x215')](),this[_0x50d941('0xb8')]();if(_0x42e681[_0x50d941('0x219')][_0x50d941('0x335')])_0x1cc9f3['EventsMoveCore']['CustomPageConditions']['initialize']();}}}return this[_0x4fff46('0x406')];},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x8b')]=function(_0x1a0ee6){this['_DisablePlayerControl']=_0x1a0ee6;},Game_System['prototype'][_0x34cbd8('0x2e9')]=function(){const _0x171e6e=_0x34cbd8;return this[_0x171e6e('0x2ad')];},Game_System[_0x34cbd8('0x29d')]['setPlayerDiagonalSetting']=function(_0x3c1ff1){const _0x2beddd=_0x34cbd8;this[_0x2beddd('0x2ad')]=String(_0x3c1ff1)[_0x2beddd('0x3d1')]()[_0x2beddd('0xb')]();},Game_System[_0x34cbd8('0x29d')]['getEventIconData']=function(_0x1b019b){const _0x476e9d=_0x34cbd8;if(this[_0x476e9d('0x1c8')]===undefined)this[_0x476e9d('0x392')]();if(!_0x1b019b)return null;if(_0x1b019b===$gamePlayer){if('HzPPq'!=='HzPPq'){function _0x5de6ec(){const _0xbbdee6=_0x476e9d;return this[_0xbbdee6('0x292')](_0x41c0c6(_0x16cab1['$1']));}}else return this[_0x476e9d('0x1c8')][_0x476e9d('0x32e')];}else{if('QfkGd'!==_0x476e9d('0x65')){function _0x1d4bf4(){const _0x30b305=_0x476e9d;if(!_0x4696ac[_0x30b305('0x104')][_0x618748]){_0x5b847a['switches'][_0x51ee98][_0x30b305('0x397')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x92d730=_0x30b305('0x348')[_0x30b305('0x1fd')](_0x5d15b2(_0x197231['$1']));_0x2cb2d5[_0x30b305('0x104')][_0x2c0137]=new _0x2a9855('switchId',_0x92d730);}const _0x158fe4=_0x163a88[_0x30b305('0xe1')]()||this;return _0x3365f1[_0x30b305('0x104')][_0x132d13][_0x30b305('0x6a')](_0x158fe4,_0x450220);}}else{const _0x3f080f=_0x476e9d('0x3d9')['format'](_0x1b019b[_0x476e9d('0x13d')],_0x1b019b[_0x476e9d('0x383')]);return this[_0x476e9d('0x1c8')][_0x3f080f];}}},Game_System[_0x34cbd8('0x29d')]['setEventIconData']=function(_0x2f8a38,_0x447442,_0x6fc005,_0x18dd9c,_0x58ffa3){const _0x3d2150=_0x34cbd8;if(this[_0x3d2150('0x1c8')]===undefined)this[_0x3d2150('0x392')]();const _0x512d8c=_0x2f8a38===$gamePlayer?_0x3d2150('0x32e'):_0x3d2150('0x3d9')['format'](_0x2f8a38[_0x3d2150('0x13d')],_0x2f8a38[_0x3d2150('0x383')]);this[_0x3d2150('0x1c8')][_0x512d8c]={'iconIndex':_0x447442,'bufferX':_0x6fc005,'bufferY':_0x18dd9c,'blendMode':_0x58ffa3};},Game_System['prototype'][_0x34cbd8('0x2cb')]=function(_0x33b256,_0x181305,_0x52cfe4,_0xa94af2,_0x37e460,_0x36eaef){const _0x1b30e8=_0x34cbd8;if(this['_EventIcons']===undefined)this[_0x1b30e8('0x392')]();const _0x2c7ec6=_0x1b30e8('0x3d9')[_0x1b30e8('0x1fd')](_0x33b256,_0x181305);this[_0x1b30e8('0x1c8')][_0x2c7ec6]={'iconIndex':_0x52cfe4,'bufferX':_0xa94af2,'bufferY':_0x37e460,'blendMode':_0x36eaef};},Game_System['prototype'][_0x34cbd8('0x111')]=function(_0x474a95){const _0x224688=_0x34cbd8;if(this[_0x224688('0x1c8')]===undefined)this['initEventsMoveCore']();if(!_0x474a95)return null;_0x474a95===$gamePlayer?delete this[_0x224688('0x1c8')]['Player']:this[_0x224688('0x31e')](_0x474a95[_0x224688('0x13d')],_0x474a95['_eventId']);},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x31e')]=function(_0x2c6bdc,_0x14a710){const _0x480295=_0x34cbd8;if(this[_0x480295('0x1c8')]===undefined)this[_0x480295('0x392')]();const _0x2e3fea=_0x480295('0x3d9')[_0x480295('0x1fd')](_0x2c6bdc,_0x14a710);delete this[_0x480295('0x1c8')][_0x2e3fea];},Game_System[_0x34cbd8('0x29d')]['getSavedEventLocation']=function(_0x3f3584){const _0xb8fef6=_0x34cbd8;if(this[_0xb8fef6('0x3c')]===undefined)this[_0xb8fef6('0x392')]();if(!_0x3f3584)return null;const _0x17ae6e='Map%1-Event%2'[_0xb8fef6('0x1fd')](_0x3f3584[_0xb8fef6('0x13d')],_0x3f3584['_eventId']);return this['_SavedEventLocations'][_0x17ae6e];},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x1d4')]=function(_0x1df223){const _0x4941f9=_0x34cbd8;if(this[_0x4941f9('0x3c')]===undefined)this[_0x4941f9('0x392')]();if(!_0x1df223)return;const _0x375daa=_0x4941f9('0x3d9')[_0x4941f9('0x1fd')](_0x1df223[_0x4941f9('0x13d')],_0x1df223[_0x4941f9('0x383')]);this['_SavedEventLocations'][_0x375daa]={'direction':_0x1df223[_0x4941f9('0x21e')](),'x':Math[_0x4941f9('0x343')](_0x1df223['x']),'y':Math['round'](_0x1df223['y']),'pageIndex':_0x1df223[_0x4941f9('0x327')],'moveRouteIndex':_0x1df223[_0x4941f9('0x429')]};},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x28c')]=function(_0x24925b){const _0xd24cfe=_0x34cbd8;if(this[_0xd24cfe('0x3c')]===undefined)this['initEventsMoveCore']();if(!_0x24925b)return;this[_0xd24cfe('0x33b')](_0x24925b[_0xd24cfe('0x13d')],_0x24925b[_0xd24cfe('0x383')]);},Game_System['prototype'][_0x34cbd8('0x33b')]=function(_0x444f1a,_0x3a03c6){const _0xe4122c=_0x34cbd8;if(this[_0xe4122c('0x3c')]===undefined)this[_0xe4122c('0x392')]();const _0xb9e5ef='Map%1-Event%2'['format'](_0x444f1a,_0x3a03c6);delete this[_0xe4122c('0x3c')][_0xb9e5ef];},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x21b')]=function(_0x399e3d,_0x3feb35,_0x3b8a4f,_0x3c4d55,_0x32cad8,_0x51b71a,_0xa01524){const _0x433765=_0x34cbd8;if(this[_0x433765('0x3c')]===undefined)this[_0x433765('0x392')]();const _0x1351a8=_0x433765('0x3d9')[_0x433765('0x1fd')](_0x399e3d,_0x3feb35);this[_0x433765('0x3c')][_0x1351a8]={'direction':_0x32cad8,'x':Math['round'](_0x3b8a4f),'y':Math[_0x433765('0x343')](_0x3c4d55),'pageIndex':_0x51b71a,'moveRouteIndex':_0xa01524};},Game_System[_0x34cbd8('0x29d')]['getPreservedMorphEventData']=function(_0x301314){const _0x3f700c=_0x34cbd8;if(this[_0x3f700c('0x3ed')]===undefined)this['initEventsMoveCore']();if(!_0x301314)return;const _0x1d4f9c='Map%1-Event%2'[_0x3f700c('0x1fd')](_0x301314['_mapId'],_0x301314[_0x3f700c('0x383')]);return this[_0x3f700c('0x3ed')][_0x1d4f9c];},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x230')]=function(_0x3a2ab8,_0x4f24a1,_0x58de19,_0x5922e4,_0x31c610){const _0x4475ce=_0x34cbd8;if(this[_0x4475ce('0x3ed')]===undefined)this[_0x4475ce('0x392')]();const _0x50ed5b=_0x4475ce('0x3d9')[_0x4475ce('0x1fd')](_0x3a2ab8,_0x4f24a1);this['_PreservedEventMorphData'][_0x50ed5b]={'template':_0x58de19,'mapId':_0x5922e4,'eventId':_0x31c610};},Game_System[_0x34cbd8('0x29d')][_0x34cbd8('0x3d3')]=function(_0x5a391c,_0x549566){const _0x2e864e=_0x34cbd8;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0xae46ee=_0x2e864e('0x3d9')[_0x2e864e('0x1fd')](_0x5a391c,_0x549566);delete this['_PreservedEventMorphData'][_0xae46ee];},Game_System['prototype'][_0x34cbd8('0x3ff')]=function(_0x59fbfd){const _0x31f814=_0x34cbd8;if(this[_0x31f814('0x8f')]===undefined)this[_0x31f814('0x392')]();return this[_0x31f814('0x8f')][_0x59fbfd]=this['_MapSpawnedEventData'][_0x59fbfd]||[],this['_MapSpawnedEventData'][_0x59fbfd];},Game_System['prototype']['removeTemporaryMapSpawnedEvents']=function(_0x59045f){const _0x123678=_0x34cbd8,_0x5f5672=this[_0x123678('0x3ff')](_0x59045f);for(const _0x1a7f28 of _0x5f5672){if(!_0x1a7f28)continue;if(_0x1a7f28['_spawnPreserved'])continue;const _0xa2e63c=_0x5f5672[_0x123678('0x1de')](_0x1a7f28);_0x5f5672[_0xa2e63c]=null;}},VisuMZ['EventsMoveCore'][_0x34cbd8('0x356')]=Game_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x40c')],Game_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x40c')]=function(_0x268875){const _0x4595ab=_0x34cbd8;VisuMZ[_0x4595ab('0x219')]['Game_Message_add'][_0x4595ab('0x6a')](this,_0x268875),this[_0x4595ab('0x206')]=$gameTemp[_0x4595ab('0xe1')]();},Game_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x129')]=function(){const _0x51dffc=_0x34cbd8;$gameTemp[_0x51dffc('0x14a')](this['_selfEvent']);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x39b')]=Game_Switches[_0x34cbd8('0x29d')][_0x34cbd8('0xd1')],Game_Switches[_0x34cbd8('0x29d')]['value']=function(_0x508585){const _0x585bd5=_0x34cbd8;if(DataManager[_0x585bd5('0x388')](_0x508585))return!!this[_0x585bd5('0x3b9')](_0x508585);else return DataManager[_0x585bd5('0x20e')](_0x508585)?!!this[_0x585bd5('0x42e')](_0x508585):VisuMZ[_0x585bd5('0x219')][_0x585bd5('0x39b')]['call'](this,_0x508585);},Game_Switches[_0x34cbd8('0x104')]={},Game_Switches[_0x34cbd8('0x29d')][_0x34cbd8('0x3b9')]=function(_0xe6a397){const _0x33d324=_0x34cbd8;if(!Game_Switches[_0x33d324('0x104')][_0xe6a397]){$dataSystem[_0x33d324('0x33c')][_0xe6a397][_0x33d324('0x397')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5f2795='return\x20%1'[_0x33d324('0x1fd')](String(RegExp['$1']));Game_Switches[_0x33d324('0x104')][_0xe6a397]=new Function(_0x33d324('0x246'),_0x5f2795);}const _0x3ae0e4=$gameTemp[_0x33d324('0xe1')]()||this;return Game_Switches['advancedFunc'][_0xe6a397][_0x33d324('0x6a')](_0x3ae0e4,_0xe6a397);},Game_Switches[_0x34cbd8('0x29d')][_0x34cbd8('0x42e')]=function(_0x2f699b){const _0x1422ad=_0x34cbd8,_0x22ce9a=$gameTemp['getSelfTarget']()||this;if(_0x22ce9a['constructor']!==Game_Event)return VisuMZ[_0x1422ad('0x219')][_0x1422ad('0x39b')]['call'](this,_0x2f699b);else{if(_0x1422ad('0x2c5')===_0x1422ad('0x94')){function _0x3d238a(){const _0x421686=_0x1422ad,_0x49dadd=_0x346a4a(_0x4de1e6['$1']);if(_0x49dadd[_0x421686('0x397')](/PLAYER/i))this[_0x421686('0x3a8')][_0x421686('0xaf')]=0x0;else _0x49dadd[_0x421686('0x397')](/EVENT[ ](\d+)/i)&&(this[_0x421686('0x3a8')][_0x421686('0xaf')]=_0x41d53b(_0x29082c['$1']));}}else{const _0x1ccee4=[_0x22ce9a[_0x1422ad('0x13d')],_0x22ce9a[_0x1422ad('0x383')],_0x1422ad('0xbc')[_0x1422ad('0x1fd')](_0x2f699b)];return $gameSelfSwitches[_0x1422ad('0xd1')](_0x1ccee4);}}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x3e0')]=Game_Switches[_0x34cbd8('0x29d')][_0x34cbd8('0x116')],Game_Switches['prototype']['setValue']=function(_0x2da8fb,_0x349b20){const _0x3eee01=_0x34cbd8;if(DataManager[_0x3eee01('0x20e')](_0x2da8fb))this['setSelfValue'](_0x2da8fb,_0x349b20);else{if(_0x3eee01('0x301')!=='WIziC')VisuMZ[_0x3eee01('0x219')]['Game_Switches_setValue']['call'](this,_0x2da8fb,_0x349b20);else{function _0x39e80b(){const _0x4eed60=_0x3eee01;if(this[_0x4eed60('0x1a5')](_0x33a9fb,_0x244061,0x2))return!![];if(this['isPassable'](_0x231f6e,_0x5d9b13,0x4))return!![];if(this['isPassable'](_0x308fe6,_0x3ad293,0x6))return!![];if(this[_0x4eed60('0x1a5')](_0x54af6e,_0x3fda71,0x8))return!![];return![];}}}},Game_Switches['prototype'][_0x34cbd8('0x2a7')]=function(_0x1be673,_0x5d4128){const _0x50af3f=_0x34cbd8,_0xd6aeba=$gameTemp[_0x50af3f('0xe1')]()||this;if(_0xd6aeba['constructor']!==Game_Event){if(_0x50af3f('0x309')!==_0x50af3f('0x2d0'))VisuMZ[_0x50af3f('0x219')][_0x50af3f('0x3e0')][_0x50af3f('0x6a')](this,_0x1be673,_0x5d4128);else{function _0x2e3809(){const _0x280080=_0x50af3f;return this[_0x280080('0x34a')](_0xe4c176(_0xcda154['$1']));}}}else{const _0x350e5f=[_0xd6aeba['_mapId'],_0xd6aeba[_0x50af3f('0x383')],_0x50af3f('0xbc')[_0x50af3f('0x1fd')](_0x1be673)];$gameSelfSwitches[_0x50af3f('0x116')](_0x350e5f,_0x5d4128);}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0xde')]=Game_Variables['prototype']['value'],Game_Variables[_0x34cbd8('0x29d')][_0x34cbd8('0xd1')]=function(_0x278aa3){const _0x34a5bf=_0x34cbd8;if(DataManager['isAdvancedVariable'](_0x278aa3))return this[_0x34a5bf('0x3b9')](_0x278aa3);else{if(DataManager[_0x34a5bf('0xa2')](_0x278aa3))return this[_0x34a5bf('0x42e')](_0x278aa3);else{if('ROjCG'==='HwkAL'){function _0x351e76(){const _0x26db6d=_0x34a5bf;return _0x34f665['EventsMoveCore'][_0x26db6d('0x29')][_0x26db6d('0x2b7')];}}else return VisuMZ[_0x34a5bf('0x219')][_0x34a5bf('0xde')][_0x34a5bf('0x6a')](this,_0x278aa3);}}},Game_Variables[_0x34cbd8('0x104')]={},Game_Variables[_0x34cbd8('0x29d')][_0x34cbd8('0x3b9')]=function(_0x49c66d){const _0x131fc3=_0x34cbd8;if(!Game_Variables[_0x131fc3('0x104')][_0x49c66d]){$dataSystem[_0x131fc3('0x178')][_0x49c66d][_0x131fc3('0x397')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2abcdf=_0x131fc3('0x348')[_0x131fc3('0x1fd')](String(RegExp['$1']));Game_Variables[_0x131fc3('0x104')][_0x49c66d]=new Function(_0x131fc3('0x1b1'),_0x2abcdf);}const _0x10b0db=$gameTemp['getSelfTarget']()||this;return Game_Variables[_0x131fc3('0x104')][_0x49c66d][_0x131fc3('0x6a')](_0x10b0db,_0x49c66d);},Game_Variables[_0x34cbd8('0x29d')][_0x34cbd8('0x42e')]=function(_0x24a21e){const _0x149456=_0x34cbd8,_0x195e04=$gameTemp['getSelfTarget']()||this;if(_0x195e04[_0x149456('0x408')]!==Game_Event){if(_0x149456('0x19c')!==_0x149456('0x66'))return VisuMZ[_0x149456('0x219')][_0x149456('0xde')][_0x149456('0x6a')](this,_0x24a21e);else{function _0x278f39(){const _0x4a015a=_0x149456;this[_0x4a015a('0x174')]=_0x319bb1;}}}else{const _0x176f80=[_0x195e04[_0x149456('0x13d')],_0x195e04['_eventId'],_0x149456('0x1dc')[_0x149456('0x1fd')](_0x24a21e)];return $gameSelfSwitches[_0x149456('0xd1')](_0x176f80);}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x432')]=Game_Variables[_0x34cbd8('0x29d')][_0x34cbd8('0x116')],Game_Variables[_0x34cbd8('0x29d')][_0x34cbd8('0x116')]=function(_0x1316d9,_0x4c9cb2){const _0x2d7ae4=_0x34cbd8;if(DataManager['isSelfVariable'](_0x1316d9)){if(_0x2d7ae4('0x40f')!==_0x2d7ae4('0x3b4'))this['setSelfValue'](_0x1316d9,_0x4c9cb2);else{function _0xd90558(){const _0x316458=_0x2d7ae4;return this[_0x316458('0x123')]&&this[_0x316458('0x123')]['match'](/\[VS8\]/i);}}}else VisuMZ[_0x2d7ae4('0x219')]['Game_Variables_setValue']['call'](this,_0x1316d9,_0x4c9cb2);},Game_Variables[_0x34cbd8('0x29d')][_0x34cbd8('0x2a7')]=function(_0x47eb5e,_0x3f4a29){const _0x4c407d=_0x34cbd8,_0x53e32f=$gameTemp[_0x4c407d('0xe1')]()||this;if(_0x53e32f[_0x4c407d('0x408')]!==Game_Event)VisuMZ[_0x4c407d('0x219')][_0x4c407d('0x432')][_0x4c407d('0x6a')](this,_0x47eb5e,_0x3f4a29);else{if(_0x4c407d('0x59')==='RZeFq'){function _0x330949(){const _0x4f8d8e=_0x4c407d;_0x4e3bc0[_0x4f8d8e('0x219')][_0x4f8d8e('0x359')][_0x4f8d8e('0x6a')](this),this['_spriteset']['hideShadows']();}}else{const _0x378149=[_0x53e32f['_mapId'],_0x53e32f[_0x4c407d('0x383')],_0x4c407d('0x1dc')[_0x4c407d('0x1fd')](_0x47eb5e)];$gameSelfSwitches[_0x4c407d('0x116')](_0x378149,_0x3f4a29);}}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x3c5')]=Game_SelfSwitches[_0x34cbd8('0x29d')][_0x34cbd8('0xd1')],Game_SelfSwitches['prototype'][_0x34cbd8('0xd1')]=function(_0xbc515c){const _0xd3b978=_0x34cbd8;if(_0xbc515c[0x2][_0xd3b978('0x397')](/SELF/i))return this[_0xd3b978('0x42e')](_0xbc515c);else{return VisuMZ[_0xd3b978('0x219')][_0xd3b978('0x3c5')][_0xd3b978('0x6a')](this,_0xbc515c);;}},Game_SelfSwitches[_0x34cbd8('0x29d')]['selfValue']=function(_0x29d387){const _0x4dd73e=_0x34cbd8;return _0x29d387[0x2][_0x4dd73e('0x397')](/VAR/i)?this['_data'][_0x29d387]||0x0:!!this[_0x4dd73e('0x186')][_0x29d387];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x2f2')]=Game_SelfSwitches[_0x34cbd8('0x29d')]['setValue'],Game_SelfSwitches[_0x34cbd8('0x29d')][_0x34cbd8('0x116')]=function(_0x499433,_0x5568f4){const _0x18c0ae=_0x34cbd8;if(_0x499433[0x2][_0x18c0ae('0x397')](/SELF/i))this[_0x18c0ae('0x2a7')](_0x499433,_0x5568f4);else{if('OrqQO'==='hfAdU'){function _0xaef7b2(){return _0x5a5fdf>0x0?0x6:0x4;}}else VisuMZ[_0x18c0ae('0x219')][_0x18c0ae('0x2f2')][_0x18c0ae('0x6a')](this,_0x499433,_0x5568f4);}},Game_SelfSwitches[_0x34cbd8('0x29d')]['setSelfValue']=function(_0x31d737,_0x31a395){const _0x1fed34=_0x34cbd8;this['_data'][_0x31d737]=_0x31d737[0x2][_0x1fed34('0x397')](/VAR/i)?_0x31a395:!!_0x31a395,this[_0x1fed34('0x322')]();},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x8d')]=Game_Enemy[_0x34cbd8('0x29d')][_0x34cbd8('0x6')],Game_Enemy['prototype'][_0x34cbd8('0x6')]=function(_0x309a07){const _0x4ef7aa=_0x34cbd8;$gameTemp['registerSelfTarget'](this);const _0x35abb9=VisuMZ['EventsMoveCore'][_0x4ef7aa('0x8d')][_0x4ef7aa('0x6a')](this,_0x309a07);return $gameTemp[_0x4ef7aa('0x1d7')](),_0x35abb9;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x92')]=Game_Troop[_0x34cbd8('0x29d')][_0x34cbd8('0x3bc')],Game_Troop[_0x34cbd8('0x29d')][_0x34cbd8('0x3bc')]=function(_0xb0bef6){const _0x55885c=_0x34cbd8;$gameTemp[_0x55885c('0x14a')](this);const _0x33ab34=VisuMZ[_0x55885c('0x219')][_0x55885c('0x92')]['call'](this,_0xb0bef6);return $gameTemp[_0x55885c('0x1d7')](),_0x33ab34;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x270')]=Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0xa7')],Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0xa7')]=function(_0x591fe1){const _0x1c4ddf=_0x34cbd8;this[_0x1c4ddf('0xca')](_0x591fe1),this[_0x1c4ddf('0x2cc')](),VisuMZ[_0x1c4ddf('0x219')]['Game_Map_setup'][_0x1c4ddf('0x6a')](this,_0x591fe1),this[_0x1c4ddf('0x2cc')](),this[_0x1c4ddf('0x3ef')](),this[_0x1c4ddf('0x2d4')](),this[_0x1c4ddf('0x3c8')](),this[_0x1c4ddf('0x118')](),this['setupSpawnedEvents']();},VisuMZ['EventsMoveCore'][_0x34cbd8('0x17f')]=Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x189')],Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x189')]=function(){const _0x2f6c5b=_0x34cbd8;VisuMZ[_0x2f6c5b('0x219')][_0x2f6c5b('0x17f')][_0x2f6c5b('0x6a')](this),this['refreshIfNeeded']();},Game_Map[_0x34cbd8('0x3e5')]=0xc8,Game_Map['prototype'][_0x34cbd8('0x3ef')]=function(){const _0x1368d3=_0x34cbd8,_0x16639d=Game_Map['_eventOverloadThreshold'];this[_0x1368d3('0xae')]=this['events']()[_0x1368d3('0x31b')]>_0x16639d;if(this[_0x1368d3('0xae')]&&$gameTemp['isPlaytest']()){}},Game_Map['prototype'][_0x34cbd8('0x1a3')]=function(){return this['_eventOverload'];},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x2cc')]=function(){const _0x1e9061=_0x34cbd8;this[_0x1e9061('0x22f')]=undefined;},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x2d4')]=function(){const _0x237dce=_0x34cbd8;this[_0x237dce('0x89')]=VisuMZ[_0x237dce('0x219')][_0x237dce('0x29')][_0x237dce('0x1f3')]['EnableDir8'];const _0x6a4232=$dataMap[_0x237dce('0x8c')]||'';if(_0x6a4232['match'](/<DIAGONAL MOVEMENT: ON>/i)){if(_0x237dce('0x87')==='nJPUD')this[_0x237dce('0x89')]=!![];else{function _0x44dab7(){const _0x165f9f=_0x237dce,_0x31b280=_0x108335[_0x165f9f('0x325')](this);if(!_0x31b280)return;const _0x101223=_0x31b280['template'][_0x165f9f('0x77')]()[_0x165f9f('0xb')]();_0x101223!==_0x165f9f('0x426')?this[_0x165f9f('0x323')](_0x101223,!![]):this[_0x165f9f('0x18c')](_0x31b280['mapId'],_0x31b280[_0x165f9f('0x11')],!![]);}}}else _0x6a4232[_0x237dce('0x397')](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x237dce('0x89')]=![]);},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x86')]=function(){const _0x2ebd0f=_0x34cbd8,_0x61f1fa=$gameSystem[_0x2ebd0f('0x2e9')]();if(_0x61f1fa===_0x2ebd0f('0x19e'))return!![];if(_0x61f1fa==='disable')return![];if(this[_0x2ebd0f('0x89')]===undefined)this['setupDiagonalSupport']();return this[_0x2ebd0f('0x89')];},Game_Map[_0x34cbd8('0x29d')]['roundXWithDirection']=function(_0x1f4e50,_0x2cf099){const _0x2d6dcc=_0x34cbd8;if([0x1,0x4,0x7]['includes'](_0x2cf099))_0x1f4e50-=0x1;if([0x3,0x6,0x9]['includes'](_0x2cf099))_0x1f4e50+=0x1;return this[_0x2d6dcc('0x34b')](_0x1f4e50);},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0xcb')]=function(_0x5d2a3a,_0x709995){const _0x218933=_0x34cbd8;if([0x1,0x2,0x3]['includes'](_0x709995))_0x5d2a3a+=0x1;if([0x7,0x8,0x9][_0x218933('0x1e5')](_0x709995))_0x5d2a3a-=0x1;return this['roundY'](_0x5d2a3a);},Game_Map[_0x34cbd8('0x29d')]['absDistance']=function(_0x31a499,_0x48eda6,_0x4be852,_0x4c8a7b){const _0x4d9f69=_0x34cbd8;return Math[_0x4d9f69('0x24f')](Math[_0x4d9f69('0x30c')](this[_0x4d9f69('0x2e0')](_0x31a499,_0x4be852)),Math[_0x4d9f69('0x30c')](this[_0x4d9f69('0xbb')](_0x48eda6,_0x4c8a7b)));},Game_Map['prototype'][_0x34cbd8('0x3c8')]=function(){const _0x3e13cd=_0x34cbd8,_0x1c79e3=VisuMZ[_0x3e13cd('0x219')][_0x3e13cd('0x29')]['Region'],_0x3a2451={},_0x211a99=[_0x3e13cd('0x3df'),_0x3e13cd('0x288'),'Dock'],_0x282dae=[_0x3e13cd('0x84'),_0x3e13cd('0x36b'),_0x3e13cd('0x32e'),'Event',_0x3e13cd('0x234'),'Boat',_0x3e13cd('0x320'),_0x3e13cd('0x265')];for(const _0x41ea67 of _0x211a99){for(const _0x191f58 of _0x282dae){const _0x16409a=_0x3e13cd('0x251')[_0x3e13cd('0x1fd')](_0x191f58,_0x41ea67);_0x1c79e3[_0x16409a]&&(_0x3a2451[_0x16409a]=_0x1c79e3[_0x16409a][_0x3e13cd('0x6b')](0x0));}}const _0x3118c7=$dataMap[_0x3e13cd('0x8c')]||'',_0x4ddbfd=_0x3118c7[_0x3e13cd('0x397')](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x4ddbfd)for(const _0x11d98b of _0x4ddbfd){_0x11d98b['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x2d9211=String(RegExp['$1'])[_0x3e13cd('0x3d1')]()[_0x3e13cd('0xb')](),_0x4cd39d=String(RegExp['$2'])[_0x3e13cd('0x3d1')]()['trim']();const _0x1c3e64=JSON[_0x3e13cd('0x2c6')]('['+RegExp['$3'][_0x3e13cd('0x397')](/\d+/g)+']');_0x2d9211=_0x2d9211[_0x3e13cd('0x45')](0x0)['toUpperCase']()+_0x2d9211[_0x3e13cd('0x6b')](0x1),_0x4cd39d=_0x4cd39d[_0x3e13cd('0x45')](0x0)[_0x3e13cd('0x77')]()+_0x4cd39d[_0x3e13cd('0x6b')](0x1);const _0x2aba9f=_0x3e13cd('0x251')['format'](_0x2d9211,_0x4cd39d);if(_0x3a2451[_0x2aba9f])_0x3a2451[_0x2aba9f]=_0x3a2451[_0x2aba9f][_0x3e13cd('0x398')](_0x1c3e64);}this[_0x3e13cd('0x3b8')]=_0x3a2451;},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x3aa')]=function(_0x209044,_0x18bcee,_0x234968,_0x462cba){const _0x3e4786=_0x34cbd8,_0x4cd2bb=this[_0x3e4786('0x3c9')](_0x209044,_0x234968),_0x2d0acd=this[_0x3e4786('0xcb')](_0x18bcee,_0x234968),_0x23d179=this['regionId'](_0x4cd2bb,_0x2d0acd),_0x5d7e52=this[_0x3e4786('0x3b8')];if(_0x5d7e52[_0x3e4786('0x2f5')]['includes'](_0x23d179))return!![];else{if(_0x462cba==='player'){if('lXWoq'===_0x3e4786('0x71'))return _0x5d7e52[_0x3e4786('0xc')][_0x3e4786('0x1e5')](_0x23d179)||_0x5d7e52['WalkAllow'][_0x3e4786('0x1e5')](_0x23d179);else{function _0x1b3dff(){_0x313829['morphIntoTemplate'](_0x5add7e['TemplateName']);}}}else{if(_0x462cba===_0x3e4786('0x3b')){if('pPzSS'!==_0x3e4786('0x360')){function _0x225e6e(){const _0x10d3fc=_0x3e4786;_0x29cf28[_0x10d3fc('0x1ab')](_0x2f93e0,_0x16c23b),_0x401213[_0x10d3fc('0x23e')]=_0xff9387['MapId']||_0x5c4b38[_0x10d3fc('0x187')](),_0x59d6ab[_0x10d3fc('0x2cb')](_0x5cdd4b[_0x10d3fc('0x23e')],_0x381ce0[_0x10d3fc('0x1f')],_0x2afd36[_0x10d3fc('0x85')],_0x45127e['IconBufferX'],_0xa75d3a[_0x10d3fc('0x315')],_0x6c3cef[_0x10d3fc('0x302')]);}}else return _0x5d7e52['EventAllow'][_0x3e4786('0x1e5')](_0x23d179)||_0x5d7e52[_0x3e4786('0x3ca')][_0x3e4786('0x1e5')](_0x23d179);}else{if(_0x5d7e52['VehicleAllow'][_0x3e4786('0x1e5')](_0x23d179)){if(_0x3e4786('0x342')==='uJsgJ'){function _0x116f75(){const _0x3f34c2=_0x3e4786,_0x45f53c=_0x29cd61['conditions'];if(_0x45f53c[_0x3f34c2('0x22c')]&&_0x490855[_0x3f34c2('0x388')](_0x45f53c['switch1Id']))this[_0x3f34c2('0x3a0')]=!![];else{if(_0x45f53c[_0x3f34c2('0x1f5')]&&_0x319ffc[_0x3f34c2('0x388')](_0x45f53c[_0x3f34c2('0x20c')]))this[_0x3f34c2('0x3a0')]=!![];else _0x45f53c[_0x3f34c2('0x2d1')]&&_0x14b289[_0x3f34c2('0x366')](_0x45f53c[_0x3f34c2('0x1b1')])&&(this['_advancedSwitchVariable']=!![]);}}}else return!![];}else{const _0x9b6a4='%1Allow'[_0x3e4786('0x1fd')](_0x462cba[_0x3e4786('0x45')](0x0)[_0x3e4786('0x77')]()+_0x462cba[_0x3e4786('0x6b')](0x1));if(_0x5d7e52[_0x9b6a4])return _0x5d7e52[_0x9b6a4][_0x3e4786('0x1e5')](_0x23d179);}}}}return![];},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x119')]=function(_0xb64032,_0x39e542,_0x40c935,_0x402c4c){const _0x3aff3c=_0x34cbd8,_0x38c877=this[_0x3aff3c('0x3c9')](_0xb64032,_0x40c935),_0xf2016=this[_0x3aff3c('0xcb')](_0x39e542,_0x40c935),_0x37f50b=this[_0x3aff3c('0x79')](_0x38c877,_0xf2016),_0x34e602=this[_0x3aff3c('0x3b8')];if(_0x34e602['AllForbid'][_0x3aff3c('0x1e5')](_0x37f50b))return!![];else{if(_0x402c4c===_0x3aff3c('0x233'))return _0x34e602['PlayerForbid']['includes'](_0x37f50b)||_0x34e602[_0x3aff3c('0x1fe')]['includes'](_0x37f50b);else{if(_0x402c4c===_0x3aff3c('0x3b'))return _0x34e602[_0x3aff3c('0x14d')][_0x3aff3c('0x1e5')](_0x37f50b)||_0x34e602[_0x3aff3c('0x1fe')][_0x3aff3c('0x1e5')](_0x37f50b);else{if(_0x34e602[_0x3aff3c('0x283')][_0x3aff3c('0x1e5')](_0x37f50b))return!![];else{if(_0x3aff3c('0xba')!==_0x3aff3c('0x14')){const _0x5efd22=_0x3aff3c('0xe2')[_0x3aff3c('0x1fd')](_0x402c4c['charAt'](0x0)[_0x3aff3c('0x77')]()+_0x402c4c[_0x3aff3c('0x6b')](0x1));if(_0x34e602[_0x5efd22])return _0x34e602[_0x5efd22][_0x3aff3c('0x1e5')](_0x37f50b);}else{function _0x7a7f95(){const _0x69dc19=_0x3aff3c;return this[_0x69dc19('0x14b')]();}}}}}}return![];},Game_Map[_0x34cbd8('0x29d')]['isRegionDockable']=function(_0x2a8b25,_0x346516,_0x443d60,_0x33ab67){const _0x1493a2=_0x34cbd8;_0x443d60=_0x33ab67===_0x1493a2('0x18b')?0x5:_0x443d60;const _0x27df3a=this[_0x1493a2('0x3c9')](_0x2a8b25,_0x443d60),_0x2cced5=this[_0x1493a2('0xcb')](_0x346516,_0x443d60),_0x2eb3e6=this[_0x1493a2('0x79')](_0x27df3a,_0x2cced5),_0x4f4b1f=this[_0x1493a2('0x3b8')];if(_0x4f4b1f[_0x1493a2('0x43a')][_0x1493a2('0x1e5')](_0x2eb3e6))return!![];else{const _0x116b98=_0x1493a2('0x2ab')[_0x1493a2('0x1fd')](_0x33ab67[_0x1493a2('0x45')](0x0)[_0x1493a2('0x77')]()+_0x33ab67[_0x1493a2('0x6b')](0x1));if(_0x4f4b1f[_0x116b98])return _0x4f4b1f[_0x116b98]['includes'](_0x2eb3e6);}return![];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x237')]=Game_Map['prototype'][_0x34cbd8('0x1b0')],Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x1b0')]=function(){const _0x1168f5=_0x34cbd8;VisuMZ[_0x1168f5('0x219')][_0x1168f5('0x237')][_0x1168f5('0x6a')](this),this[_0x1168f5('0x18f')]();},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x18f')]=function(){const _0x1e4ebe=_0x34cbd8;this[_0x1e4ebe('0x2ec')]=![];if(this['events']()['some'](_0x35b773=>_0x35b773[_0x1e4ebe('0x133')]())){if(_0x1e4ebe('0xeb')===_0x1e4ebe('0xeb')){this[_0x1e4ebe('0x2ec')]=!![];return;}else{function _0x5ced10(){const _0x22ceb5=_0x1e4ebe;return this[_0x22ceb5('0x226')]()&&this[_0x22ceb5('0x13a')]()===_0x4cc17c[_0x22ceb5('0x219')][_0x22ceb5('0x29')][_0x22ceb5('0x161')][_0x22ceb5('0x158')];}}}if(this[_0x1e4ebe('0xec')]()[_0x1e4ebe('0x173')](_0x2a6ea3=>_0x2a6ea3[_0x1e4ebe('0x29c')]())){this[_0x1e4ebe('0x2ec')]=!![];return;}if(this['_commonEvents'][_0x1e4ebe('0x173')](_0x28e592=>_0x28e592[_0x1e4ebe('0x133')]())){this[_0x1e4ebe('0x2ec')]=!![];return;}if(this[_0x1e4ebe('0x139')][_0x1e4ebe('0x173')](_0x83d554=>_0x83d554[_0x1e4ebe('0x29c')]())){this['_needsPeriodicRefresh']=!![];return;}},VisuMZ['EventsMoveCore']['Game_Map_update']=Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x27b')],Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x27b')]=function(_0x2dcab1){const _0x3d5724=_0x34cbd8;this[_0x3d5724('0x271')](),VisuMZ[_0x3d5724('0x219')][_0x3d5724('0xd3')][_0x3d5724('0x6a')](this,_0x2dcab1);},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x271')]=function(){const _0x47672a=_0x34cbd8;if(!this['_needsPeriodicRefresh'])return;this[_0x47672a('0x3c3')]=this[_0x47672a('0x3c3')]||0x3c,this[_0x47672a('0x3c3')]--,this[_0x47672a('0x3c3')]<=0x0&&(this['requestRefresh'](),this[_0x47672a('0x3c3')]=0x3c);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x28f')]=Game_Map[_0x34cbd8('0x29d')]['isDashDisabled'],Game_Map[_0x34cbd8('0x29d')]['isDashDisabled']=function(){const _0x34ff48=_0x34cbd8;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ['EventsMoveCore'][_0x34ff48('0x28f')][_0x34ff48('0x6a')](this);},Game_Map[_0x34cbd8('0x29d')]['setupSaveEventLocations']=function(){const _0x35ef6b=_0x34cbd8;this[_0x35ef6b('0x43b')]=![];const _0x2a575b=$dataMap[_0x35ef6b('0x8c')]||'';_0x2a575b[_0x35ef6b('0x397')](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x35ef6b('0x43b')]=!![]);},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0xaa')]=function(){const _0x3d5698=_0x34cbd8;if(this[_0x3d5698('0x43b')]===undefined)this[_0x3d5698('0x118')]();return this[_0x3d5698('0x43b')];},Game_Map['prototype'][_0x34cbd8('0xca')]=function(_0x3f7d2d){_0x3f7d2d!==this['mapId']()&&$gamePlayer&&$gameSystem['removeTemporaryMapSpawnedEvents'](_0x3f7d2d);},Game_Map[_0x34cbd8('0x29d')]['setupSpawnedEvents']=function(){const _0x39ff5b=_0x34cbd8;this['_spawnedEvents']=$gameSystem[_0x39ff5b('0x3ff')](this[_0x39ff5b('0x187')]()),this[_0x39ff5b('0x125')]=!![];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x1c4')]=Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0xec')],Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0xec')]=function(){const _0x1c32d4=_0x34cbd8;if(this[_0x1c32d4('0x22f')])return this[_0x1c32d4('0x22f')];const _0x721e35=VisuMZ['EventsMoveCore']['Game_Map_events'][_0x1c32d4('0x6a')](this),_0x4b23ce=_0x721e35[_0x1c32d4('0x398')](this['_spawnedEvents']||[]);return this[_0x1c32d4('0x22f')]=_0x4b23ce[_0x1c32d4('0x80')](_0x190ee0=>!!_0x190ee0),this[_0x1c32d4('0x22f')];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x33a')]=Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x3b')],Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x3b')]=function(_0x37941b){const _0x4c8c9b=_0x34cbd8;return _0x37941b>=0x3e8?(_0x37941b-=0x3e8,this[_0x4c8c9b('0x13b')][_0x37941b]):VisuMZ[_0x4c8c9b('0x219')]['Game_Map_event'][_0x4c8c9b('0x6a')](this,_0x37941b);},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x1b9')]=function(_0x10d1c3){const _0x36fc1d=_0x34cbd8,_0x128726=this[_0x36fc1d('0x3b')](_0x10d1c3);if(_0x128726)_0x128726[_0x36fc1d('0x347')]();},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x37b')]=function(_0x5a4fcb){const _0x4c17d4=_0x34cbd8;$gameTemp['_spawnData']=_0x5a4fcb;const _0x554601=new Game_Event(_0x5a4fcb[_0x4c17d4('0x187')],_0x5a4fcb[_0x4c17d4('0x11')]);$gameTemp['_spawnData']=undefined,this[_0x4c17d4('0x13b')][_0x4c17d4('0x58')](_0x554601),_0x554601[_0x4c17d4('0x365')](_0x5a4fcb),this[_0x4c17d4('0x2cc')]();},Game_Map[_0x34cbd8('0x29d')]['prepareSpawnedEventAtXY']=function(_0x3a110b,_0x49470f,_0x57cb54){const _0x18da2b=_0x34cbd8,_0x3054b3=_0x3a110b['x'],_0x4d3b43=_0x3a110b['y'];if(!this[_0x18da2b('0x105')](_0x3054b3,_0x4d3b43))return;if(_0x49470f){if('mwzoM'===_0x18da2b('0x7c')){function _0x37ece8(){const _0x37cab7=_0x18da2b;if([0x2,0x4,0x6,0x8]['includes'](_0x5d09ff))return 0x2;if([0x1,0x3,0x7,0x9][_0x37cab7('0x1e5')](_0x4c1857))return 0x3;}}else{if(this[_0x18da2b('0x135')](_0x3054b3,_0x4d3b43)[_0x18da2b('0x31b')]>0x0)return;if($gamePlayer['x']===_0x3054b3&&$gamePlayer['y']===_0x4d3b43)return;if(this[_0x18da2b('0x3a5')]()[_0x18da2b('0x3e7')](_0x3054b3,_0x4d3b43))return;if(this[_0x18da2b('0x344')]()[_0x18da2b('0x3e7')](_0x3054b3,_0x4d3b43))return;}}if(_0x57cb54){if(!this[_0x18da2b('0x3ac')](_0x3054b3,_0x4d3b43))return;}this[_0x18da2b('0x37b')](_0x3a110b);},Game_Map[_0x34cbd8('0x29d')]['prepareSpawnedEventAtRegion']=function(_0x2f5245,_0x413e2a,_0xc7be92,_0x536c3c){const _0x1ac313=_0x34cbd8,_0x5395a2=[],_0x5e9c31=this[_0x1ac313('0x3b5')](),_0x2d2766=this['height']();for(let _0x4c52d0=0x0;_0x4c52d0<_0x5e9c31;_0x4c52d0++){for(let _0x54572f=0x0;_0x54572f<_0x2d2766;_0x54572f++){if(!_0x413e2a[_0x1ac313('0x1e5')](this[_0x1ac313('0x79')](_0x4c52d0,_0x54572f)))continue;if(!this['isValid'](_0x4c52d0,_0x54572f))continue;if(_0xc7be92){if(this['eventsXy'](_0x4c52d0,_0x54572f)[_0x1ac313('0x31b')]>0x0)continue;if($gamePlayer['x']===_0x4c52d0&&$gamePlayer['y']===_0x54572f)continue;if(this['boat']()[_0x1ac313('0x3e7')](_0x4c52d0,_0x54572f))continue;if(this['ship']()[_0x1ac313('0x3e7')](_0x4c52d0,_0x54572f))continue;}if(_0x536c3c){if(_0x1ac313('0x2c')!==_0x1ac313('0x2c')){function _0x122096(){const _0x349ba1=_0x1ac313,_0x4066b0=_0x39a844[_0x349ba1('0xe1')]()||this;if(_0x4066b0[_0x349ba1('0x408')]!==_0x3a5662)return _0x532bdf[_0x349ba1('0x219')][_0x349ba1('0x39b')]['call'](this,_0x3e276f);else{const _0x56bad8=[_0x4066b0[_0x349ba1('0x13d')],_0x4066b0[_0x349ba1('0x383')],_0x349ba1('0xbc')[_0x349ba1('0x1fd')](_0x14375e)];return _0x72944f[_0x349ba1('0xd1')](_0x56bad8);}}}else{if(!this[_0x1ac313('0x3ac')](_0x4c52d0,_0x54572f))continue;}}_0x5395a2[_0x1ac313('0x58')]([_0x4c52d0,_0x54572f]);}}if(_0x5395a2[_0x1ac313('0x31b')]>0x0){if(_0x1ac313('0x30b')==='EPsyQ'){const _0x3cc790=_0x5395a2[Math['randomInt'](_0x5395a2[_0x1ac313('0x31b')])];_0x2f5245['x']=_0x3cc790[0x0],_0x2f5245['y']=_0x3cc790[0x1],this[_0x1ac313('0x37b')](_0x2f5245);}else{function _0x452e38(){_0x573a1d!==this['mapId']()&&_0x2aecf8&&_0x21e440['removeTemporaryMapSpawnedEvents'](_0x50cbfb);}}}},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x3ac')]=function(_0x55ddf9,_0x2b58f6){const _0x3f75a9=_0x34cbd8;if(this[_0x3f75a9('0x1a5')](_0x55ddf9,_0x2b58f6,0x2))return!![];if(this['isPassable'](_0x55ddf9,_0x2b58f6,0x4))return!![];if(this['isPassable'](_0x55ddf9,_0x2b58f6,0x6))return!![];if(this[_0x3f75a9('0x1a5')](_0x55ddf9,_0x2b58f6,0x8))return!![];return![];},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x2cd')]=function(_0x2ebac2){const _0x1abae5=_0x34cbd8;if(_0x2ebac2<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x4e441b=this[_0x1abae5('0x3b')](_0x2ebac2);_0x4e441b[_0x1abae5('0x307')](-0x1,-0x1),_0x4e441b['erase'](),this['_spawnedEvents'][_0x2ebac2-0x3e8]=null,this[_0x1abae5('0x2cc')]();},Game_Map[_0x34cbd8('0x29d')]['firstSpawnedEvent']=function(){for(const _0x5d3b9d of this['_spawnedEvents']){if(_0x5d3b9d)return _0x5d3b9d;}return null;},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x10f')]=function(){const _0x3e8563=_0x34cbd8,_0x9a3053=this['firstSpawnedEvent']();return _0x9a3053?_0x9a3053[_0x3e8563('0x383')]:0x0;},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x25c')]=function(){const _0x357bf8=_0x34cbd8,_0x3428b3=this[_0x357bf8('0x13b')][_0x357bf8('0x6b')](0x0)['reverse']();for(const _0x1c2eab of _0x3428b3){if(_0x357bf8('0x127')!==_0x357bf8('0x181')){if(_0x1c2eab)return _0x1c2eab;}else{function _0x13e72f(){const _0x5f2d95=_0x357bf8,_0x5c6b43=_0x30436c[_0x5f2d95('0xe1')]()||this;if(_0x5c6b43[_0x5f2d95('0x408')]!==_0x92f9d7)_0x512877['EventsMoveCore'][_0x5f2d95('0x3e0')][_0x5f2d95('0x6a')](this,_0x3bbe4f,_0x373bd5);else{const _0xaeab66=[_0x5c6b43['_mapId'],_0x5c6b43[_0x5f2d95('0x383')],'Self\x20Switch\x20%1'[_0x5f2d95('0x1fd')](_0x154b28)];_0x12fd99[_0x5f2d95('0x116')](_0xaeab66,_0xc0a40a);}}}}return null;},Game_Map[_0x34cbd8('0x29d')]['lastSpawnedEventID']=function(){const _0x143c05=_0x34cbd8,_0x3bfede=this[_0x143c05('0x25c')]();return _0x3bfede?_0x3bfede['_eventId']:0x0;},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x3f7')]=function(_0x28a4ab,_0x20cf10){const _0x1eea56=_0x34cbd8,_0x50bfd3=this[_0x1eea56('0x135')](_0x28a4ab,_0x20cf10);for(const _0x5a9c06 of _0x50bfd3){if(!_0x5a9c06)continue;if(_0x5a9c06['isSpawnedEvent']())this[_0x1eea56('0x2cd')](_0x5a9c06[_0x1eea56('0x383')]);}},Game_Map['prototype'][_0x34cbd8('0x1e')]=function(_0x1f57fd){const _0x412243=_0x34cbd8;for(const _0xbc9f70 of this[_0x412243('0x13b')]){if(!_0xbc9f70)continue;if(_0x1f57fd[_0x412243('0x1e5')](_0xbc9f70[_0x412243('0x79')]())){if(_0x412243('0x1ad')!==_0x412243('0x1ad')){function _0x2d2024(){_0x1ebf1b=_0x1c9922;}}else this[_0x412243('0x2cd')](_0xbc9f70[_0x412243('0x383')]);}}},Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x148')]=function(){const _0x7811b3=_0x34cbd8;for(const _0x5dd98e of this[_0x7811b3('0x13b')]){if(!_0x5dd98e)continue;this[_0x7811b3('0x2cd')](_0x5dd98e[_0x7811b3('0x383')]);}},Game_CommonEvent['prototype'][_0x34cbd8('0x133')]=function(){const _0x1214e8=_0x34cbd8,_0x4008e4=this[_0x1214e8('0x3b')]();return this['isActive']()&&_0x4008e4['trigger']>=0x1&&DataManager[_0x1214e8('0x388')](_0x4008e4[_0x1214e8('0x246')]);},Game_CommonEvent[_0x34cbd8('0x29d')][_0x34cbd8('0x29c')]=function(){const _0x4ebabe=_0x34cbd8;return VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x4ebabe('0x139')][_0x4ebabe('0x1e5')](this[_0x4ebabe('0x72')]);},VisuMZ[_0x34cbd8('0x219')]['Game_CommonEvent_isActive']=Game_CommonEvent['prototype'][_0x34cbd8('0x191')],Game_CommonEvent['prototype']['isActive']=function(){const _0x40cbc0=_0x34cbd8;if(VisuMZ[_0x40cbc0('0x219')][_0x40cbc0('0xd9')]['call'](this)){if(_0x40cbc0('0xfd')!=='fMSDZ'){function _0x3a56b4(){const _0xb2fb56=_0x40cbc0;this['_labelWindows']=[];for(const _0x8219ca of _0x4097bf['events']()){this[_0xb2fb56('0x232')](_0x8219ca);}}}else return!![];}else return VisuMZ['EventsMoveCore'][_0x40cbc0('0x335')][_0x40cbc0('0x376')](this['event']()[_0x40cbc0('0xb4')],this[_0x40cbc0('0x72')]);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x2dc')]=Game_Map[_0x34cbd8('0x29d')][_0x34cbd8('0xa1')],Game_Map['prototype']['parallelCommonEvents']=function(){const _0x140e3c=_0x34cbd8,_0x520e76=VisuMZ['EventsMoveCore'][_0x140e3c('0x2dc')]['call'](this),_0x1f3408=VisuMZ[_0x140e3c('0x219')][_0x140e3c('0x335')][_0x140e3c('0x139')][_0x140e3c('0x2df')](_0x2d2dca=>$dataCommonEvents[_0x2d2dca]);return _0x520e76[_0x140e3c('0x398')](_0x1f3408)[_0x140e3c('0x80')]((_0x32ddd2,_0x518afc,_0x3c2c3b)=>_0x3c2c3b[_0x140e3c('0x1de')](_0x32ddd2)===_0x518afc);},VisuMZ[_0x34cbd8('0x219')]['Game_CharacterBase_initMembers']=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x2a0')],Game_CharacterBase['prototype'][_0x34cbd8('0x2a0')]=function(){const _0x12aa2c=_0x34cbd8;VisuMZ[_0x12aa2c('0x219')][_0x12aa2c('0x7f')][_0x12aa2c('0x6a')](this),this[_0x12aa2c('0x3dd')]();},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x3dd')]=function(){const _0x27c48b=_0x34cbd8;this['_patternLocked']=![],this[_0x27c48b('0x192')](),this[_0x27c48b('0x32d')](),this[_0x27c48b('0x250')](),this['clearStepPattern']();},Game_CharacterBase['prototype'][_0x34cbd8('0x23a')]=function(){const _0x24ade4=_0x34cbd8;if(this[_0x24ade4('0x408')]===Game_Player&&this[_0x24ade4('0xe7')]())return this[_0x24ade4('0x319')]()['characterName']()['match'](/\[VS8\]/i);else{if(Imported[_0x24ade4('0x209')]&&this[_0x24ade4('0x24a')]()){if('pcDVe'===_0x24ade4('0x25d')){function _0x264eed(){const _0x2dcc0e=_0x24ade4;this[_0x2dcc0e('0x146')]='',this['startCallEvent']();}}else return!![];}else return this[_0x24ade4('0x41c')]()[_0x24ade4('0x397')](/\[VS8\]/i);}},VisuMZ['EventsMoveCore'][_0x34cbd8('0x4d')]=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x21e')],Game_CharacterBase[_0x34cbd8('0x29d')]['direction']=function(){const _0x3eb197=_0x34cbd8;if(this[_0x3eb197('0x226')]()&&!this[_0x3eb197('0x34f')]()&&this[_0x3eb197('0x23a')]()){if('JvjNw'!=='xMUnK')return this[_0x3eb197('0x14b')]();else{function _0x295440(){const _0x50a05e=_0x3eb197;this[_0x50a05e('0xca')](_0x303e84),this['clearEventCache'](),_0x14e0ea[_0x50a05e('0x219')][_0x50a05e('0x270')]['call'](this,_0x187b32),this['clearEventCache'](),this[_0x50a05e('0x3ef')](),this[_0x50a05e('0x2d4')](),this[_0x50a05e('0x3c8')](),this[_0x50a05e('0x118')](),this[_0x50a05e('0x411')]();}}}else{if(this[_0x3eb197('0x226')]()&&!this[_0x3eb197('0x34f')]()){if(_0x3eb197('0x213')!=='ytDgv'){function _0x3877af(){_0xe29992=_0x596b70[_0x2dd653];}}else return 0x8;}else{if(this[_0x3eb197('0x2f8')]()&&this[_0x3eb197('0x23a')]())return this[_0x3eb197('0x1b5')]();else{if('zFsWp'!=='TbDQr')return VisuMZ[_0x3eb197('0x219')][_0x3eb197('0x4d')][_0x3eb197('0x6a')](this);else{function _0x5d5ff2(){const _0x524693=_0x3eb197;return this[_0x524693('0x5a')]('right');}}}}}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x199')]=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x88')],Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x88')]=function(_0x2f9d0d){const _0x37b835=_0x34cbd8;if(!this['isSpriteVS8dir']())_0x2f9d0d=this[_0x37b835('0x235')](_0x2f9d0d);VisuMZ[_0x37b835('0x219')][_0x37b835('0x199')][_0x37b835('0x6a')](this,_0x2f9d0d);},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x235')]=function(_0x422b67){const _0xca4be8=_0x34cbd8;if(_0x422b67===0x1)return this[_0xca4be8('0x35f')](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x422b67===0x3)return this[_0xca4be8('0x35f')](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x422b67===0x7)return this[_0xca4be8('0x35f')](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x422b67===0x9)return this[_0xca4be8('0x35f')](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x422b67;},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x3e6')]=function(_0x4510b8){const _0x3c1a13=_0x34cbd8;return[0x1,0x3,0x5,0x7,0x9][_0x3c1a13('0x1e5')](_0x4510b8);},Game_CharacterBase['prototype']['lastMovedDirection']=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x281')]=Game_CharacterBase[_0x34cbd8('0x29d')]['moveStraight'],Game_CharacterBase['prototype'][_0x34cbd8('0x1c')]=function(_0x597f34){const _0xe35c3e=_0x34cbd8;this[_0xe35c3e('0x381')]=_0x597f34,VisuMZ['EventsMoveCore'][_0xe35c3e('0x281')]['call'](this,_0x597f34);},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x321')]=function(_0x159d6b){const _0x402bf3=_0x34cbd8;if(!this[_0x402bf3('0x3e6')](_0x159d6b))return this[_0x402bf3('0x1c')](_0x159d6b);let _0x56faa1=0x0,_0x275cf8=0x0;switch(_0x159d6b){case 0x1:_0x56faa1=0x4,_0x275cf8=0x2;break;case 0x3:_0x56faa1=0x6,_0x275cf8=0x2;break;case 0x7:_0x56faa1=0x4,_0x275cf8=0x8;break;case 0x9:_0x56faa1=0x6,_0x275cf8=0x8;break;}if(VisuMZ['EventsMoveCore'][_0x402bf3('0x29')][_0x402bf3('0x1f3')][_0x402bf3('0x2ca')]){if(_0x402bf3('0x2e6')!==_0x402bf3('0x2e6')){function _0x390773(){const _0x5d1ebf=_0x402bf3;this[_0x5d1ebf('0x429')]=_0xc23577[_0x5d1ebf('0x1ea')];}}else{if(!this['canPass'](this['_x'],this['_y'],_0x56faa1))return this['moveStraight'](_0x275cf8);if(!this[_0x402bf3('0x35f')](this['_x'],this['_y'],_0x275cf8))return this[_0x402bf3('0x1c')](_0x56faa1);if(!this[_0x402bf3('0x1c1')](this['_x'],this['_y'],_0x56faa1,_0x275cf8)){let _0x5092e1=VisuMZ['EventsMoveCore'][_0x402bf3('0x29')][_0x402bf3('0x1f3')][_0x402bf3('0x6c')]?_0x56faa1:_0x275cf8;return this['moveStraight'](_0x5092e1);}}}this[_0x402bf3('0x381')]=_0x159d6b,this[_0x402bf3('0xbd')](_0x56faa1,_0x275cf8);},VisuMZ['EventsMoveCore'][_0x34cbd8('0xea')]=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x298')],Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x298')]=function(){const _0x1a58ac=_0x34cbd8;let _0x40f53f=this[_0x1a58ac('0x114')];if(this[_0x1a58ac('0x11e')]()){if(_0x1a58ac('0x41')!==_0x1a58ac('0x41')){function _0x315da2(){return this['_activationProximity']['distance']||0x0;}}else _0x40f53f+=this[_0x1a58ac('0x124')]();}return this[_0x1a58ac('0x26')](_0x40f53f);},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x124')]=function(){const _0x5153c9=_0x34cbd8,_0x387a04=VisuMZ[_0x5153c9('0x219')][_0x5153c9('0x29')][_0x5153c9('0x1f3')];if(_0x387a04[_0x5153c9('0x272')]!==undefined)return _0x387a04[_0x5153c9('0x272')];else{if(_0x5153c9('0x369')===_0x5153c9('0x369'))return VisuMZ[_0x5153c9('0x219')][_0x5153c9('0xea')][_0x5153c9('0x6a')](this)-this[_0x5153c9('0x114')];else{function _0x279718(){const _0x44c419=_0x5153c9;if(_0x3e2f22)_0x3b3d9a['clearEventCache']();_0x44d736['EventsMoveCore'][_0x44c419('0x201')][_0x44c419('0x6a')](this);}}}},Game_CharacterBase[_0x34cbd8('0x29d')]['adjustDir8MovementSpeed']=function(_0x5dffdc){const _0x52964c=_0x34cbd8,_0x305138=VisuMZ[_0x52964c('0x219')][_0x52964c('0x29')]['Movement'];if(!_0x305138['SlowerSpeed'])return _0x5dffdc;return[0x1,0x3,0x7,0x9][_0x52964c('0x1e5')](this[_0x52964c('0x381')])&&(_0x5dffdc*=_0x305138[_0x52964c('0x434')]||0.01),_0x5dffdc;},VisuMZ['EventsMoveCore']['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x11e')],Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x11e')]=function(){const _0x38e5c1=_0x34cbd8;if(this['_forceDashing'])return!![];return VisuMZ['EventsMoveCore'][_0x38e5c1('0x3c2')]['call'](this);},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x115')]=function(){const _0x3294b8=_0x34cbd8;return this[_0x3294b8('0x11e')]();},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x151')]=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x422')],Game_CharacterBase['prototype'][_0x34cbd8('0x422')]=function(){const _0x4f199a=_0x34cbd8;if(this['isPosing']()){if(_0x4f199a('0x1cb')===_0x4f199a('0x1cb'))return this[_0x4f199a('0x269')]();else{function _0xf8f786(){this['_shadowGraphic']['visible']=![];}}}else return VisuMZ[_0x4f199a('0x219')][_0x4f199a('0x151')]['call'](this);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x25e')]=Game_CharacterBase['prototype']['increaseSteps'],Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x332')]=function(){const _0x21fdcd=_0x34cbd8;VisuMZ[_0x21fdcd('0x219')][_0x21fdcd('0x25e')][_0x21fdcd('0x6a')](this),this[_0x21fdcd('0x192')]();},VisuMZ[_0x34cbd8('0x219')]['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x35c')],Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x35c')]=function(){const _0x6a3eb4=_0x34cbd8;if(this[_0x6a3eb4('0x23a')]())return this[_0x6a3eb4('0x9b')]();return VisuMZ[_0x6a3eb4('0x219')]['Game_CharacterBase_characterIndex'][_0x6a3eb4('0x6a')](this);},Game_CharacterBase['prototype'][_0x34cbd8('0x9b')]=function(){const _0x46991f=_0x34cbd8,_0x288da3=this[_0x46991f('0x21e')]();if(this[_0x46991f('0x34f')]()){if([0x2,0x4,0x6,0x8][_0x46991f('0x1e5')](_0x288da3))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x288da3))return 0x5;}else{if(this[_0x46991f('0x226')]()){if(_0x46991f('0x266')===_0x46991f('0xe8')){function _0x4988b1(){const _0x14f79c=_0x46991f;return _0xb22ebb[_0x14f79c('0x30e')](this);}}else return 0x6;}else{if(this['isPosing']())return this[_0x46991f('0x11d')]();else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x46991f('0x1e5')](_0x288da3))return 0x4;if([0x1,0x3,0x7,0x9][_0x46991f('0x1e5')](_0x288da3))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x46991f('0x3c6')]()){if(_0x46991f('0x1cf')==='yWKOr'){function _0x5f1a00(){const _0x5754d4=_0x46991f;_0x4b32c9[_0x5754d4('0x219')][_0x5754d4('0x335')][_0x5754d4('0xf5')](_0x19e978);}}else{if([0x2,0x4,0x6,0x8][_0x46991f('0x1e5')](_0x288da3))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x288da3))return 0x5;}}else{if(this[_0x46991f('0x115')]()){if([0x2,0x4,0x6,0x8][_0x46991f('0x1e5')](_0x288da3))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x288da3))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x46991f('0x1e5')](_0x288da3))return 0x0;if([0x1,0x3,0x7,0x9][_0x46991f('0x1e5')](_0x288da3))return 0x1;}}}}}}},Game_CharacterBase['prototype'][_0x34cbd8('0x3c6')]=function(){const _0x5582cc=_0x34cbd8;return VisuMZ[_0x5582cc('0x219')]['Settings']['VS8']['CarryPose'];},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x9c')]=function(){const _0xaf4b6e=_0x34cbd8;return this[_0xaf4b6e('0x226')]()&&this[_0xaf4b6e('0x13a')]()===VisuMZ[_0xaf4b6e('0x219')][_0xaf4b6e('0x29')]['TerrainTag'][_0xaf4b6e('0x158')];},Game_CharacterBase['prototype'][_0x34cbd8('0x14b')]=function(){const _0x4b4853=_0x34cbd8;if(this[_0x4b4853('0x9c')]()){if(_0x4b4853('0x32c')!==_0x4b4853('0x314'))return 0x4;else{function _0x4a822d(){const _0x448ba0=_0x4b4853;if(this[_0x448ba0('0x364')]===_0x497294)this[_0x448ba0('0x392')]();if(this['_EventsMoveCoreSettings'][_0x448ba0('0x15c')]===_0x58f590)this['initEventsMoveCore']();this[_0x448ba0('0x364')][_0x448ba0('0x15c')]=_0x41607b;}}}else return 0x2;},VisuMZ['EventsMoveCore'][_0x34cbd8('0x416')]=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x27b')],Game_CharacterBase[_0x34cbd8('0x29d')]['update']=function(){const _0x2f445f=_0x34cbd8;VisuMZ[_0x2f445f('0x219')][_0x2f445f('0x416')]['call'](this),this[_0x2f445f('0x10c')]();},Game_CharacterBase[_0x34cbd8('0x29d')]['updatePose']=function(){const _0x3d54bc=_0x34cbd8;this[_0x3d54bc('0x38c')]=this[_0x3d54bc('0x38c')]||0x0;if(this['_poseDuration']>0x0){this[_0x3d54bc('0x38c')]--;if(this[_0x3d54bc('0x38c')]<=0x0&&this[_0x3d54bc('0x290')]!=='ZZZ')this[_0x3d54bc('0x192')]();}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x47')]=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0xbd')],Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0xbd')]=function(_0x5d6a0d,_0x12bbcc){const _0x29166d=_0x34cbd8;VisuMZ[_0x29166d('0x219')][_0x29166d('0x47')][_0x29166d('0x6a')](this,_0x5d6a0d,_0x12bbcc);if(this[_0x29166d('0x23a')]())this['setDiagonalDirection'](_0x5d6a0d,_0x12bbcc);},Game_CharacterBase[_0x34cbd8('0x29d')]['setDiagonalDirection']=function(_0x52f0f8,_0x7b36ca){const _0x25df52=_0x34cbd8;if(_0x52f0f8===0x4&&_0x7b36ca===0x2)this['setDirection'](0x1);if(_0x52f0f8===0x6&&_0x7b36ca===0x2)this['setDirection'](0x3);if(_0x52f0f8===0x4&&_0x7b36ca===0x8)this['setDirection'](0x7);if(_0x52f0f8===0x6&&_0x7b36ca===0x8)this[_0x25df52('0x88')](0x9);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x423')]=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x5e')],Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x5e')]=function(){const _0x4333e5=_0x34cbd8;if(this[_0x4333e5('0x2f8')]()&&this[_0x4333e5('0x1eb')]()==='ZZZ')return!![];return VisuMZ[_0x4333e5('0x219')][_0x4333e5('0x423')]['call'](this);},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x1b7')]=function(_0x454f83,_0x1398f5){const _0x5b6d96=_0x34cbd8;if(_0x454f83[_0x5b6d96('0x397')](/Z/i))_0x454f83='ZZZ';if(_0x454f83[_0x5b6d96('0x397')](/SLEEP/i))_0x454f83='ZZZ';if(this[_0x5b6d96('0x23a')]()){if(_0x5b6d96('0x24b')===_0x5b6d96('0x24b'))this[_0x5b6d96('0x290')]=_0x454f83[_0x5b6d96('0x77')]()[_0x5b6d96('0xb')](),this[_0x5b6d96('0x38c')]=_0x1398f5||Infinity;else{function _0x2d71f0(){const _0x25f3f=_0x5b6d96;return this[_0x25f3f('0x2bc')](_0x5cd72f(_0x21a804['$1']),_0x15b634(_0x4584d6['$2']));}}}},Game_CharacterBase['prototype'][_0x34cbd8('0x1eb')]=function(){const _0xe3239d=_0x34cbd8;if(this[_0xe3239d('0x23a')]()){if('oXxAJ'===_0xe3239d('0x21a')){function _0x778b54(){const _0x3e8047=_0xe3239d;this[_0x3e8047('0x174')]=_0x2021fe;}}else return(this['_pose']||'')['toUpperCase']()[_0xe3239d('0xb')]();}else{if(_0xe3239d('0x1fb')!==_0xe3239d('0x3c0'))return''[_0xe3239d('0x77')]()[_0xe3239d('0xb')]();else{function _0x2190cf(){const _0x3e3b08=_0xe3239d;return this[_0x3e3b08('0x35')]();}}}},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x108')]=function(_0x4f3280,_0x58353f){const _0x18a70f=_0x34cbd8;if(this['isSpriteVS8dir']()){const _0x32b272=['',_0x18a70f('0xdf'),_0x18a70f('0x37a'),_0x18a70f('0x289'),_0x18a70f('0x1d9'),_0x18a70f('0x2a5'),_0x18a70f('0x33d'),_0x18a70f('0x29a'),_0x18a70f('0x38a'),_0x18a70f('0x21d'),'ZZZ','','','','',''][_0x4f3280];this[_0x18a70f('0x1b7')](_0x32b272,_0x58353f);}},Game_CharacterBase['prototype'][_0x34cbd8('0x192')]=function(){const _0xcad104=_0x34cbd8;this[_0xcad104('0x290')]='',this[_0xcad104('0x38c')]=0x0;},Game_CharacterBase[_0x34cbd8('0x29d')]['isPosing']=function(){const _0x17e659=_0x34cbd8;return this[_0x17e659('0x23a')]()&&!!this['_pose'];},Game_CharacterBase[_0x34cbd8('0x29d')]['getPosingCharacterIndex']=function(){const _0x4dd7d1=_0x34cbd8,_0x1eab7c=this[_0x4dd7d1('0x290')][_0x4dd7d1('0x77')]();switch(this[_0x4dd7d1('0x290')]['toUpperCase']()['trim']()){case'ITEM':case _0x4dd7d1('0x256'):case _0x4dd7d1('0x3ab'):case _0x4dd7d1('0x1a4'):case'KNEEL':case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x1b5')]=function(){const _0x432f2b=_0x34cbd8;switch(this['_pose'][_0x432f2b('0x77')]()){case'EXCLAMATION':case _0x432f2b('0x37a'):case _0x432f2b('0x289'):return 0x2;break;case _0x432f2b('0x1d9'):case'ANGER':case _0x432f2b('0x33d'):return 0x4;break;case _0x432f2b('0x165'):case _0x432f2b('0x256'):case _0x432f2b('0x3ab'):case _0x432f2b('0x29a'):case _0x432f2b('0x38a'):case'LIGHT\x20BULB':return 0x6;break;case _0x432f2b('0x1a4'):case'KNEEL':case _0x432f2b('0x1e4'):case _0x432f2b('0x2c8'):case _0x432f2b('0x75'):return 0x8;break;default:return VisuMZ[_0x432f2b('0x219')]['Game_CharacterBase_setDirection'][_0x432f2b('0x6a')](this);break;}},Game_CharacterBase['prototype'][_0x34cbd8('0x269')]=function(){const _0x437502=_0x34cbd8;switch(this[_0x437502('0x290')][_0x437502('0x77')]()){case'ITEM':case'HURT':case _0x437502('0xdf'):case _0x437502('0x1d9'):case'COBWEB':return 0x0;break;case _0x437502('0x256'):case'KNEEL':case _0x437502('0x37a'):case _0x437502('0x2a5'):case _0x437502('0x38a'):return 0x1;break;case'VICTORY':case _0x437502('0x1e4'):case'MUSIC\x20NOTE':case _0x437502('0x33d'):case _0x437502('0x21d'):return 0x2;break;default:return VisuMZ[_0x437502('0x219')][_0x437502('0x151')][_0x437502('0x6a')](this);break;}},Game_CharacterBase[_0x34cbd8('0x29d')]['forceCarrying']=function(){this['_forceCarrying']=!![];},Game_CharacterBase['prototype']['clearCarrying']=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x69')]=function(){this['_forceDashing']=!![];},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x32d')]=function(){const _0x1a0748=_0x34cbd8;this[_0x1a0748('0x55')]=![];},Game_CharacterBase[_0x34cbd8('0x29d')]['isShadowVisible']=function(){const _0x12c9a5=_0x34cbd8;if(this[_0x12c9a5('0x402')]())return![];if(this[_0x12c9a5('0x2ac')])return![];if(this[_0x12c9a5('0x401')])return![];if(this[_0x12c9a5('0x123')]==='')return![];if(this[_0x12c9a5('0x408')]===Game_Vehicle)return![];return!![];},Game_CharacterBase[_0x34cbd8('0x29d')]['isShadowShrink']=function(){const _0x3cd19f=_0x34cbd8;if(this[_0x3cd19f('0x226')]())return!![];if(this['constructor']===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase['prototype']['shadowFilename']=function(){const _0x15c0cd=_0x34cbd8;return VisuMZ[_0x15c0cd('0x219')]['Settings'][_0x15c0cd('0x1f3')][_0x15c0cd('0x1c7')];},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x3bd')]=function(){return this['screenX']();},Game_CharacterBase[_0x34cbd8('0x29d')]['shadowY']=function(){const _0x395738=_0x34cbd8;return this[_0x395738('0x42b')]()+this[_0x395738('0x409')]()+this[_0x395738('0x317')]();},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x435')]=function(_0x80a62a,_0x50a605){const _0x3ae4fc=_0x34cbd8,_0x108137=this[_0x3ae4fc('0x22')](),_0x2807f0=$gameMap[_0x3ae4fc('0x3b5')](),_0x1d4686=[],_0x2e9cda=[],_0x48e8d4=[],_0x421c38={};let _0xcb5dcc=_0x421c38;if(this['x']===_0x80a62a&&this['y']===_0x50a605)return 0x0;_0x421c38[_0x3ae4fc('0x35d')]=null,_0x421c38['x']=this['x'],_0x421c38['y']=this['y'],_0x421c38['g']=0x0,_0x421c38['f']=$gameMap[_0x3ae4fc('0x27d')](_0x421c38['x'],_0x421c38['y'],_0x80a62a,_0x50a605),_0x1d4686['push'](_0x421c38),_0x2e9cda[_0x3ae4fc('0x58')](_0x421c38['y']*_0x2807f0+_0x421c38['x']);while(_0x1d4686[_0x3ae4fc('0x31b')]>0x0){let _0x2015b3=0x0;for(let _0x14a83d=0x0;_0x14a83d<_0x1d4686['length'];_0x14a83d++){if(_0x3ae4fc('0x16a')===_0x3ae4fc('0x1e1')){function _0x5ce094(){const _0x5d4c43=_0x3ae4fc;_0x4d4045===_0x5d4c43('0x3f5')?this[_0x5d4c43('0x334')]():this[_0x5d4c43('0x231')]();}}else{if(_0x1d4686[_0x14a83d]['f']<_0x1d4686[_0x2015b3]['f']){if('psJCn'===_0x3ae4fc('0x1c3'))_0x2015b3=_0x14a83d;else{function _0x5d794d(){const _0x442cd7=_0x3ae4fc;this[_0x442cd7('0x169')]=!![];}}}}}const _0x543f62=_0x1d4686[_0x2015b3],_0xb029d0=_0x543f62['x'],_0x1816cb=_0x543f62['y'],_0x343dbb=_0x1816cb*_0x2807f0+_0xb029d0,_0x387c82=_0x543f62['g'];_0x1d4686[_0x3ae4fc('0x57')](_0x2015b3,0x1),_0x2e9cda[_0x3ae4fc('0x57')](_0x2e9cda[_0x3ae4fc('0x1de')](_0x343dbb),0x1),_0x48e8d4['push'](_0x343dbb);if(_0x543f62['x']===_0x80a62a&&_0x543f62['y']===_0x50a605){_0xcb5dcc=_0x543f62;break;}if(_0x387c82>=_0x108137){if(_0x3ae4fc('0xd8')!=='gtoQe'){function _0x13073f(){const _0x5a5c54=_0x3ae4fc;_0x263e70[_0x5a5c54('0x86')]()?this[_0x5a5c54('0x321')](_0x33fb74):_0x2dda71[_0x5a5c54('0x219')][_0x5a5c54('0x414')][_0x5a5c54('0x6a')](this,_0x928ba9);}}else continue;}for(let _0x40de9e=0x1;_0x40de9e<0xa;_0x40de9e++){if(_0x40de9e===0x5)continue;const _0x55b3c1=_0x40de9e,_0x19acbd=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6][_0x40de9e],_0x23e4bd=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8][_0x40de9e],_0x293557=$gameMap[_0x3ae4fc('0x3c9')](_0xb029d0,_0x55b3c1),_0x2aa870=$gameMap['roundYWithDirection'](_0x1816cb,_0x55b3c1),_0x41ba5e=_0x2aa870*_0x2807f0+_0x293557;if(_0x48e8d4[_0x3ae4fc('0x1e5')](_0x41ba5e))continue;if(this[_0x3ae4fc('0x408')]===Game_Player&&VisuMZ[_0x3ae4fc('0x219')]['Settings']['Movement'][_0x3ae4fc('0x2ca')]){if(_0x3ae4fc('0x1b8')!==_0x3ae4fc('0x1b8')){function _0x4411b0(){const _0x141587=_0x3ae4fc;_0xb7be49=this[_0x141587('0x52')](_0x58532f,_0xba0240);}}else{if(!this[_0x3ae4fc('0x35f')](_0xb029d0,_0x1816cb,_0x19acbd))continue;if(!this[_0x3ae4fc('0x35f')](_0xb029d0,_0x1816cb,_0x23e4bd))continue;}}if(!this[_0x3ae4fc('0x1c1')](_0xb029d0,_0x1816cb,_0x19acbd,_0x23e4bd))continue;const _0x56770b=_0x387c82+0x1,_0x4fbce3=_0x2e9cda['indexOf'](_0x41ba5e);if(_0x4fbce3<0x0||_0x56770b<_0x1d4686[_0x4fbce3]['g']){if('zqqde'!=='zqqde'){function _0x190e5b(){const _0x1b7334=_0x3ae4fc;if(this['_PreservedEventMorphData']===_0x576400)this['initEventsMoveCore']();const _0x8725fb=_0x1b7334('0x3d9')[_0x1b7334('0x1fd')](_0x1991b7,_0x338a07);delete this['_PreservedEventMorphData'][_0x8725fb];}}else{let _0x827de6={};_0x4fbce3>=0x0?_0x827de6=_0x1d4686[_0x4fbce3]:(_0x1d4686[_0x3ae4fc('0x58')](_0x827de6),_0x2e9cda['push'](_0x41ba5e));_0x827de6['parent']=_0x543f62,_0x827de6['x']=_0x293557,_0x827de6['y']=_0x2aa870,_0x827de6['g']=_0x56770b,_0x827de6['f']=_0x56770b+$gameMap[_0x3ae4fc('0x27d')](_0x293557,_0x2aa870,_0x80a62a,_0x50a605);if(!_0xcb5dcc||_0x827de6['f']-_0x827de6['g']<_0xcb5dcc['f']-_0xcb5dcc['g']){if('JClkp'===_0x3ae4fc('0xd')){function _0x15e4ef(){const _0x34fa5f=_0x3ae4fc;this[_0x34fa5f('0x387')](_0x49e3d4,_0x15f58a);if(this['x']!==_0x3f13f4||this['y']!==_0x283dd8)this[_0x34fa5f('0x429')]--;}}else _0xcb5dcc=_0x827de6;}}}}}let _0x50a2cd=_0xcb5dcc;while(_0x50a2cd[_0x3ae4fc('0x35d')]&&_0x50a2cd[_0x3ae4fc('0x35d')]!==_0x421c38){if(_0x3ae4fc('0x419')==='aMRwY'){function _0x3b0d3f(){const _0x2ef7e8=_0x3ae4fc;this[_0x2ef7e8('0x2f9')]=new _0x2e52ec(),this[_0x2ef7e8('0x211')]();}}else _0x50a2cd=_0x50a2cd[_0x3ae4fc('0x35d')];}const _0x384b83=$gameMap[_0x3ae4fc('0x2e0')](_0x50a2cd['x'],_0x421c38['x']),_0x4f39b1=$gameMap[_0x3ae4fc('0xbb')](_0x50a2cd['y'],_0x421c38['y']);if(_0x384b83<0x0&&_0x4f39b1>0x0)return 0x1;if(_0x384b83>0x0&&_0x4f39b1>0x0)return 0x3;if(_0x384b83<0x0&&_0x4f39b1<0x0)return 0x7;if(_0x384b83>0x0&&_0x4f39b1<0x0)return 0x9;if(_0x4f39b1>0x0)return 0x2;if(_0x384b83<0x0)return 0x4;if(_0x384b83>0x0)return 0x6;if(_0x4f39b1<0x0)return 0x8;const _0x488b23=this['deltaXFrom'](_0x80a62a),_0x53fc3b=this[_0x3ae4fc('0x7d')](_0x50a605);if(Math[_0x3ae4fc('0x30c')](_0x488b23)>Math['abs'](_0x53fc3b)){if('okDGw'===_0x3ae4fc('0x12'))return _0x488b23>0x0?0x4:0x6;else{function _0x33b6fd(){const _0x20c744=_0x3ae4fc;_0x42adcc['EventsMoveCore'][_0x20c744('0x432')]['call'](this,_0x94a0fa,_0x264af9);}}}else{if(_0x53fc3b!==0x0)return _0x53fc3b>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x162')]=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x35f')],Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x35f')]=function(_0x4cc8a9,_0x590554,_0x56efbd){const _0x56f489=_0x34cbd8;if(this[_0x56f489('0x260')]===_0x56f489('0x18b')){if('POFzZ'===_0x56f489('0x36d'))return this[_0x56f489('0x319')]()[_0x56f489('0x117')](_0x4cc8a9,_0x590554,_0x56efbd);else{function _0x4be977(){const _0x1b68cd=_0x56f489;_0xa999a1['ConvertParams'](_0x47789d,_0x537255);const _0x46ca11=_0x113767[_0x1b68cd('0x23e')]||_0x277d1a[_0x1b68cd('0x187')](),_0x26a376=_0x5566b8[_0x1b68cd('0x1f')];_0x4baff1['deleteSavedEventLocationKey'](_0x46ca11,_0x26a376);}}}else return VisuMZ[_0x56f489('0x219')][_0x56f489('0x162')]['call'](this,_0x4cc8a9,_0x590554,_0x56efbd);},Game_CharacterBase[_0x34cbd8('0x29d')]['clearSpriteOffsets']=function(){const _0x2d29f0=_0x34cbd8;this[_0x2d29f0('0x2f')]=0x0,this[_0x2d29f0('0x1bb')]=0x0;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x378')]=Game_CharacterBase[_0x34cbd8('0x29d')]['screenX'],Game_CharacterBase['prototype'][_0x34cbd8('0x267')]=function(){const _0x51b7b6=_0x34cbd8;return VisuMZ[_0x51b7b6('0x219')][_0x51b7b6('0x378')]['call'](this)+(this[_0x51b7b6('0x2f')]||0x0);},VisuMZ[_0x34cbd8('0x219')]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x42b')],Game_CharacterBase['prototype']['screenY']=function(){const _0x5a857e=_0x34cbd8;return VisuMZ['EventsMoveCore']['Game_CharacterBase_screenY'][_0x5a857e('0x6a')](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase['prototype'][_0x34cbd8('0x1be')]=function(){const _0x32fd2e=_0x34cbd8;this[_0x32fd2e('0x143')]='';},VisuMZ[_0x34cbd8('0x219')]['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x38b')],Game_CharacterBase['prototype'][_0x34cbd8('0x38b')]=function(){const _0x20d589=_0x34cbd8;if(this[_0x20d589('0xf3')])return;if(this[_0x20d589('0x2e7')]())return;VisuMZ[_0x20d589('0x219')][_0x20d589('0x3b6')][_0x20d589('0x6a')](this);},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x2e7')]=function(){const _0x317728=_0x34cbd8;if(!this['hasStepAnime']()&&this[_0x317728('0x2dd')]>0x0)return![];switch(String(this[_0x317728('0x143')])[_0x317728('0x77')]()[_0x317728('0xb')]()){case'LEFT\x20TO\x20RIGHT':this[_0x317728('0x3cb')]+=0x1;if(this['_pattern']>0x2)this[_0x317728('0x280')](0x0);break;case _0x317728('0x38d'):this['_pattern']-=0x1;if(this[_0x317728('0x3cb')]<0x0)this[_0x317728('0x280')](0x2);break;case _0x317728('0x386'):case _0x317728('0x363'):this[_0x317728('0x231')]();break;case'SPIN\x20COUNTERCLOCKWISE':case _0x317728('0x19b'):case _0x317728('0x183'):case'SPIN\x20ACW':this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x34cbd8('0x29d')]['getEventIconData']=function(){const _0x4b587c=_0x34cbd8;return $gameSystem[_0x4b587c('0x30e')](this);},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0xbf')]=function(){const _0x55f19a=_0x34cbd8,_0x74d429=this[_0x55f19a('0x30e')]();if(!_0x74d429)return![];return _0x74d429['iconIndex']>0x0;},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x1b')]=function(){const _0x33e734=_0x34cbd8,_0x275ec3=this[_0x33e734('0x21e')]();return $gameMap[_0x33e734('0x3c9')](this['x'],_0x275ec3);},Game_CharacterBase[_0x34cbd8('0x29d')][_0x34cbd8('0x2e4')]=function(){const _0x31d85f=_0x34cbd8,_0x476829=this['direction']();return $gameMap[_0x31d85f('0xcb')](this['y'],_0x476829);},Game_CharacterBase[_0x34cbd8('0x29d')]['backX']=function(){const _0x482add=_0x34cbd8,_0x2607e1=this[_0x482add('0xb1')](this[_0x482add('0x21e')]());return $gameMap[_0x482add('0x3c9')](this['x'],_0x2607e1);},Game_CharacterBase['prototype']['backY']=function(){const _0x76b315=_0x34cbd8,_0x343cfd=this[_0x76b315('0xb1')](this[_0x76b315('0x21e')]());return $gameMap[_0x76b315('0xcb')](this['y'],_0x343cfd);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x18a')]=Game_Character[_0x34cbd8('0x29d')]['setMoveRoute'],Game_Character[_0x34cbd8('0x29d')]['setMoveRoute']=function(_0x3b4784){const _0x5d2ab0=_0x34cbd8;route=JsonEx[_0x5d2ab0('0x35e')](_0x3b4784),VisuMZ[_0x5d2ab0('0x219')][_0x5d2ab0('0x18a')][_0x5d2ab0('0x6a')](this,route);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x51')]=Game_Character[_0x34cbd8('0x29d')]['forceMoveRoute'],Game_Character['prototype'][_0x34cbd8('0x427')]=function(_0x373c64){const _0x46d4c6=_0x34cbd8;route=JsonEx[_0x46d4c6('0x35e')](_0x373c64),VisuMZ['EventsMoveCore'][_0x46d4c6('0x51')][_0x46d4c6('0x6a')](this,route);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x3f2')]=Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x1d8')],Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x1d8')]=function(_0xec2269){const _0x38c663=_0x34cbd8,_0x21960e=Game_Character,_0xc02d07=_0xec2269[_0x38c663('0xf9')];if(_0xec2269[_0x38c663('0x37c')]===_0x21960e['ROUTE_SCRIPT']){let _0x2b02ec=_0xec2269[_0x38c663('0xf9')][0x0];_0x2b02ec=this[_0x38c663('0x1d2')](_0x2b02ec),_0x2b02ec=this[_0x38c663('0x27f')](_0x2b02ec),this[_0x38c663('0x1ef')](_0xec2269,_0x2b02ec);}else{if(_0x38c663('0x3fe')!=='BkYKA'){function _0x5c8f21(){const _0x6e761f=_0x38c663;this[_0x6e761f('0x381')]=_0x4f1088,_0x482eaf[_0x6e761f('0x219')]['Game_CharacterBase_moveStraight'][_0x6e761f('0x6a')](this,_0x59fd91);}}else VisuMZ[_0x38c663('0x219')]['Game_Character_processMoveCommand'][_0x38c663('0x6a')](this,_0xec2269);}},Game_Character['prototype']['convertVariableValuesInScriptCall']=function(_0x32ecfe){const _0x50b6fb=_0x34cbd8,_0x18ea19=/\$gameVariables\.value\((\d+)\)/gi,_0x1f1235=/\\V\[(\d+)\]/gi;while(_0x32ecfe[_0x50b6fb('0x397')](_0x18ea19)){if(_0x50b6fb('0x2ed')!==_0x50b6fb('0x2bf'))_0x32ecfe=_0x32ecfe[_0x50b6fb('0x3b0')](_0x18ea19,(_0x4e8a51,_0x2a7fe5)=>$gameVariables['value'](parseInt(_0x2a7fe5)));else{function _0x5def93(){const _0x2fb696=_0x50b6fb;this[_0x2fb696('0x228')]=new _0x12512e(),this['_eventIconSprite'][_0x2fb696('0xee')]=_0x55fd7d[_0x2fb696('0x39d')]('IconSet'),this[_0x2fb696('0x228')][_0x2fb696('0x39f')](0x0,0x0,0x0,0x0),this[_0x2fb696('0x228')][_0x2fb696('0x2b9')]['x']=0.5,this[_0x2fb696('0x228')]['anchor']['y']=0x1,this[_0x2fb696('0x83')](this[_0x2fb696('0x228')]);}}}while(_0x32ecfe[_0x50b6fb('0x397')](_0x1f1235)){_0x32ecfe=_0x32ecfe['replace'](_0x1f1235,(_0x5e62cb,_0x1865ff)=>$gameVariables[_0x50b6fb('0xd1')](parseInt(_0x1865ff)));}return _0x32ecfe;},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x27f')]=function(_0x2019f9){const _0x9cde4d=_0x34cbd8,_0x432be8=/\\SELFVAR\[(\d+)\]/gi;while(_0x2019f9[_0x9cde4d('0x397')](_0x432be8)){if(_0x9cde4d('0xb3')!=='wHPcq')_0x2019f9=_0x2019f9[_0x9cde4d('0x3b0')](_0x432be8,(_0x30effa,_0xd92481)=>getSelfVariableValue(this['_mapId'],this[_0x9cde4d('0x383')],parseInt(_0xd92481)));else{function _0xc4258b(){const _0x2139d1=_0x9cde4d,_0x1a1748=_0x13e7a1['EventsMoveCore'][_0x2139d1('0x29')][_0x2139d1('0x1f3')];if(!_0x1a1748[_0x2139d1('0x3f6')])return _0x5e3e7b;return[0x1,0x3,0x7,0x9][_0x2139d1('0x1e5')](this[_0x2139d1('0x381')])&&(_0x41e5dd*=_0x1a1748[_0x2139d1('0x434')]||0.01),_0x31d8c1;}}}return _0x2019f9;},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x1ef')]=function(_0x3e8645,_0x405a9c){const _0x802e07=_0x34cbd8;if(_0x405a9c[_0x802e07('0x397')](/ANIMATION:[ ](\d+)/i))return this[_0x802e07('0x2ce')](Number(RegExp['$1']));if(_0x405a9c[_0x802e07('0x397')](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x405a9c[_0x802e07('0x397')](/FADE IN:[ ](\d+)/i))return this[_0x802e07('0x1d6')](Number(RegExp['$1']));if(_0x405a9c[_0x802e07('0x397')](/FADE OUT:[ ](\d+)/i))return this['processMoveRouteFadeOut'](Number(RegExp['$1']));if(_0x405a9c[_0x802e07('0x397')](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x802e07('0x17')==='xGSqS'){function _0x1d4899(){const _0x19d585=_0x802e07;this[_0x19d585('0x1e6')]=_0x1f21a1;const _0x5d8219='Map%1.json'[_0x19d585('0x1fd')](_0x505856['mapId'][_0x19d585('0x1a6')](0x3));this[_0x19d585('0x1d5')]=_0x19d585('0x303')+_0x357f43[_0x19d585('0x2aa')]+'_'+this[_0x19d585('0x11')](),_0x33b966[_0x19d585('0x1aa')](this[_0x19d585('0x1d5')],_0x5d8219),_0x4dbfcd[this[_0x19d585('0x1d5')]]?this['startCallEvent']():this[_0x19d585('0x16')](_0x19d585('0x3bf'));}}else return this[_0x802e07('0x35')]();}if(_0x405a9c['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this['clearCarrying']();if(_0x405a9c[_0x802e07('0x397')](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)){if(_0x802e07('0x1f6')===_0x802e07('0x1f6'))return this['forceDashing']();else{function _0x1dee4a(){const _0x312af3=_0x802e07,_0xdd1f77=_0x3be42d[_0x312af3('0x78')][_0x473623];_0xdd1f77[_0x312af3('0x1cd')][_0x312af3('0x6a')](this,_0x4f0fb1,_0x5796e8,this);}}}if(_0x405a9c[_0x802e07('0x397')](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x802e07('0x32d')]();if(_0x405a9c['match'](/HUG:[ ]LEFT/i)){if(_0x802e07('0x3ee')===_0x802e07('0x3ee'))return this[_0x802e07('0x5a')](_0x802e07('0x3f5'));else{function _0xe9b1df(){const _0x214276=_0x802e07;if([0x2,0x4,0x6,0x8][_0x214276('0x1e5')](_0x361a73))return 0x4;if([0x1,0x3,0x7,0x9][_0x214276('0x1e5')](_0x544be2))return 0x5;}}}if(_0x405a9c[_0x802e07('0x397')](/HUG:[ ]RIGHT/i))return this[_0x802e07('0x5a')](_0x802e07('0x40'));if(_0x405a9c[_0x802e07('0x397')](/INDEX:[ ](\d+)/i))return this[_0x802e07('0x3a3')](Number(RegExp['$1']));if(_0x405a9c['match'](/INDEX:[ ]([\+\-]\d+)/i)){if(_0x802e07('0x36')!==_0x802e07('0x36')){function _0x4364ae(){const _0x2793d1=_0x802e07;return _0x1af7ee[_0x2793d1('0x11e')]();}}else{const _0x1c9c00=this[_0x802e07('0x1ca')]+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0x1c9c00);}}if(_0x405a9c[_0x802e07('0x397')](/JUMP FORWARD:[ ](\d+)/i)){if('NXozq'===_0x802e07('0x3a6'))return this['processMoveRouteJumpForward'](Number(RegExp['$1']));else{function _0x3697ea(){const _0x298b1d=_0x802e07,_0x143324=this[_0x298b1d('0x410')](_0x23f3a6,_0x1ca6a5,![]);if(_0x143324)this[_0x298b1d('0x88')](_0x143324);}}}if(_0x405a9c[_0x802e07('0x397')](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x802e07('0x96')==='pQkwY')return this[_0x802e07('0x73')](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x591ffd(){const _0x2bf146=_0x802e07;if(!this[_0x2bf146('0x21c')]())return;const _0x2b5737=this[_0x2bf146('0x2b')]();let _0x1e8262='';for(const _0x163f07 of _0x2b5737){if([0x6c,0x198][_0x2bf146('0x1e5')](_0x163f07['code'])){if(_0x1e8262!=='')_0x1e8262+='\x0a';_0x1e8262+=_0x163f07[_0x2bf146('0xf9')][0x0];}}this['checkEventsMoveCoreStringTags'](_0x1e8262);}}}if(_0x405a9c[_0x802e07('0x397')](/JUMP TO EVENT:[ ](\d+)/i)){if(_0x802e07('0x1a')!=='VRcYs'){function _0x1177e5(){const _0xd198b0=_0x802e07;_0xb7ffc8[_0xd198b0('0x129')](),_0x1efcdd[_0xd198b0('0x219')][_0xd198b0('0x157')][_0xd198b0('0x6a')](this),_0xb2c88a[_0xd198b0('0x1d7')]();}}else{const _0x5663a1=$gameMap[_0x802e07('0x3b')](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x5663a1);}}if(_0x405a9c['match'](/JUMP TO PLAYER/i))return this[_0x802e07('0x14f')]($gamePlayer);if(_0x405a9c[_0x802e07('0x397')](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if(_0x802e07('0x10d')===_0x802e07('0x27c')){function _0x1919e4(){const _0x336560=_0x802e07;return this[_0x336560('0x23a')]()?this[_0x336560('0x259')]():_0x3565d5[_0x336560('0x219')]['Sprite_Character_characterPatternY'][_0x336560('0x6a')](this);}}else{const _0x168c34=String(RegExp['$1']);return this[_0x802e07('0x26e')](_0x168c34);}}if(_0x405a9c['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x802e07('0x399')===_0x802e07('0x3d4')){function _0x192c61(){const _0x3e7293=_0x802e07;_0x361e89[_0x3e7293('0xb4')]===_0x3448b5&&_0x34666e[_0x3e7293('0x219')]['CustomPageConditions'][_0x3e7293('0xf5')](_0x13eb80);if(_0x409f77[_0x3e7293('0xb4')]['length']>0x0)return _0x54a752[_0x3e7293('0x219')][_0x3e7293('0x335')][_0x3e7293('0x376')](_0x48e646[_0x3e7293('0xb4')],0x0);return!![];}}else{const _0x1c7c9f=Number(RegExp['$1']),_0x177aa9=Number(RegExp['$2']);return this[_0x802e07('0x350')](_0x1c7c9f,_0x177aa9);}}if(_0x405a9c['match'](/MOVE TO EVENT:[ ](\d+)/i)){if(_0x802e07('0x3da')!==_0x802e07('0x3da')){function _0x406022(){return!![];}}else{const _0x559ca7=$gameMap[_0x802e07('0x3b')](Number(RegExp['$1']));return this[_0x802e07('0xe0')](_0x559ca7);}}if(_0x405a9c[_0x802e07('0x397')](/MOVE TO PLAYER/i))return this[_0x802e07('0xe0')]($gamePlayer);if(_0x405a9c[_0x802e07('0x397')](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x802e07('0x7a')](0x1,Number(RegExp['$1']));if(_0x405a9c[_0x802e07('0x397')](/MOVE DOWN:[ ](\d+)/i)){if('fdQQP'!==_0x802e07('0x0'))return this['processMoveRouteMoveRepeat'](0x2,Number(RegExp['$1']));else{function _0x5704d9(){const _0x5a1a9d=_0x802e07;if(_0x42e3d9[_0x5a1a9d('0x1fc')](this['_characterName']))return;_0x4d27ba=_0x3646d1[_0x5a1a9d('0x40b')](0x0,0x7),this[_0x5a1a9d('0x33e')](this[_0x5a1a9d('0x123')],_0x4eb4b7);}}}if(_0x405a9c['match'](/MOVE LOWER RIGHT:[ ](\d+)/i)){if(_0x802e07('0x438')===_0x802e07('0x1d')){function _0x333708(){const _0x1cf133=_0x802e07,_0x581c5f=_0x516e92[_0x1cf133('0x219')]['Settings'];this[_0x1cf133('0x220')]={'type':_0x1cf133('0x2c3'),'distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x1cf133('0x171')]=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x1cf133('0x249')]={'iconIndex':0x0,'bufferX':_0x581c5f[_0x1cf133('0x258')][_0x1cf133('0x26c')],'bufferY':_0x581c5f[_0x1cf133('0x258')][_0x1cf133('0x329')],'blendMode':_0x581c5f[_0x1cf133('0x258')][_0x1cf133('0x248')]},this[_0x1cf133('0x112')]={'text':'','visibleRange':_0x581c5f[_0x1cf133('0x42')][_0x1cf133('0x31')],'offsetX':_0x581c5f[_0x1cf133('0x42')][_0x1cf133('0x24e')],'offsetY':_0x581c5f[_0x1cf133('0x42')]['OffsetY']},this['_moveOnlyRegions']=[],this[_0x1cf133('0x3a8')]={'target':-0x1,'type':'random','delay':0x1},this[_0x1cf133('0x385')]=![],this[_0x1cf133('0xdb')]={'visible':!![],'filename':_0x581c5f[_0x1cf133('0x1f3')][_0x1cf133('0x1c7')]},this[_0x1cf133('0x250')](),this[_0x1cf133('0x1be')]();}}else return this[_0x802e07('0x7a')](0x3,Number(RegExp['$1']));}if(_0x405a9c['match'](/MOVE LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x4,Number(RegExp['$1']));if(_0x405a9c[_0x802e07('0x397')](/MOVE RIGHT:[ ](\d+)/i)){if(_0x802e07('0x1f9')!=='aDMAd')return this[_0x802e07('0x7a')](0x6,Number(RegExp['$1']));else{function _0x57afb6(){const _0x4d1da9=_0x802e07,_0x90f360=this[_0x4d1da9('0x21e')](),_0xc7f0af=_0x4fce22[_0x4d1da9('0x3c9')](this['x'],_0x90f360),_0x363d80=_0x319030[_0x4d1da9('0xcb')](this['y'],_0x90f360);this['startMapCommonEventOnOK'](_0xc7f0af,_0x363d80);}}}if(_0x405a9c[_0x802e07('0x397')](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x802e07('0x7a')](0x7,Number(RegExp['$1']));if(_0x405a9c[_0x802e07('0x397')](/MOVE UP:[ ](\d+)/i)){if('iLEaG'!==_0x802e07('0x278')){function _0x16937a(){const _0x15fbef=_0x802e07;this[_0x15fbef('0x2ec')]=!![];return;}}else return this[_0x802e07('0x7a')](0x8,Number(RegExp['$1']));}if(_0x405a9c[_0x802e07('0x397')](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x405a9c[_0x802e07('0x397')](/OPACITY:[ ](\d+)([%％])/i)){const _0x4599ce=Math[_0x802e07('0x343')](Number(RegExp['$1'])/0x64*0xff);return this[_0x802e07('0x437')](_0x4599ce[_0x802e07('0x40b')](0x0,0xff));}if(_0x405a9c['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0xe5f3ee=this['_opacity']+Math[_0x802e07('0x343')](Number(RegExp['$1'])/0x64*0xff);return this[_0x802e07('0x437')](_0xe5f3ee[_0x802e07('0x40b')](0x0,0xff));}if(_0x405a9c['match'](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x3cce9e=this[_0x802e07('0x40e')]+Number(RegExp['$1']);return this[_0x802e07('0x437')](_0x3cce9e[_0x802e07('0x40b')](0x0,0xff));}if(_0x405a9c['match'](/PATTERN LOCK:[ ](\d+)/i)){if(_0x802e07('0x1e0')===_0x802e07('0x14c')){function _0x2cec4d(){const _0x4752ae=_0x802e07;return _0x58add5[_0x4752ae('0x29d')]['getEventIconData']['call'](this);}}else return this['processMoveRoutePatternLock'](Number(RegExp['$1']));}if(_0x405a9c[_0x802e07('0x397')](/PATTERN UNLOCK/i))return this[_0x802e07('0xf3')]=![];if(_0x405a9c['match'](/POSE:[ ](.*)/i)){const _0x3fa405=String(RegExp['$1'])['toUpperCase']()[_0x802e07('0xb')]();return this[_0x802e07('0x1b7')](_0x3fa405);}if(_0x405a9c[_0x802e07('0x397')](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x497f49=Number(RegExp['$1']),_0x5b89b9=Number(RegExp['$2']);return this[_0x802e07('0x387')](_0x497f49,_0x5b89b9);}if(_0x405a9c[_0x802e07('0x397')](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x2edf60=$gameMap[_0x802e07('0x3b')](Number(RegExp['$1']));return this[_0x802e07('0x19a')](_0x2edf60);}if(_0x405a9c[_0x802e07('0x397')](/STEP TOWARD PLAYER/i)){if(_0x802e07('0x3fc')===_0x802e07('0x291')){function _0x40b458(){const _0x18a618=_0x802e07;_0x2eefa2['ConvertParams'](_0x505b7f,_0x3a8e78),_0x247461[_0x18a618('0x351')](_0xa84085,_0x2cedf0[_0x18a618('0x85')],_0x4597f5[_0x18a618('0x254')],_0x15edb1[_0x18a618('0x315')],_0x152c13[_0x18a618('0x302')]);}}else return this[_0x802e07('0x2d9')]($gamePlayer);}if(_0x405a9c['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x802e07('0x3be')](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x405a9c[_0x802e07('0x397')](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if(_0x802e07('0x3cc')!=='vbfin'){function _0x45d3dd(){const _0x4d9881=_0x802e07;_0x11e802=_0x47cf30===_0x4d9881('0x18b')?0x5:_0x4acfde;const _0x115680=this[_0x4d9881('0x3c9')](_0x4ca1b7,_0x366530),_0x1d58fd=this[_0x4d9881('0xcb')](_0x485348,_0x3e21b6),_0x59e5d4=this['regionId'](_0x115680,_0x1d58fd),_0x42c18b=this['_regionRules'];if(_0x42c18b['VehicleDock'][_0x4d9881('0x1e5')](_0x59e5d4))return!![];else{const _0xb595df=_0x4d9881('0x2ab')['format'](_0x468ec0['charAt'](0x0)['toUpperCase']()+_0x51263b['slice'](0x1));if(_0x42c18b[_0xb595df])return _0x42c18b[_0xb595df][_0x4d9881('0x1e5')](_0x59e5d4);}return![];}}else{const _0x40468e=$gameMap[_0x802e07('0x3b')](Number(RegExp['$1']));return this[_0x802e07('0xfa')](_0x40468e);}}if(_0x405a9c[_0x802e07('0x397')](/STEP AWAY FROM PLAYER/i))return this['moveAwayFromCharacter']($gamePlayer);if(_0x405a9c['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x802e07('0x149')==='pXVbD')return this[_0x802e07('0x358')](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x13295d(){return this['processMoveRouteMoveToCharacter'](_0xee9571);}}}if(_0x405a9c[_0x802e07('0x397')](/TURN TO EVENT:[ ](\d+)/i)){if(_0x802e07('0xf6')!==_0x802e07('0xf6')){function _0x768bf3(){return this['getPosingCharacterDirection']();}}else{const _0x29702a=$gameMap[_0x802e07('0x3b')](Number(RegExp['$1']));return this[_0x802e07('0x134')](_0x29702a);}}if(_0x405a9c[_0x802e07('0x397')](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x405a9c[_0x802e07('0x397')](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x802e07('0x2ae')==='KonWN')return this[_0x802e07('0x2bc')](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x3c95bf(){const _0x3f7d60=_0x802e07;let _0x1fd982=[_0x58fb6a,_0x4bbac1,_0x3f7d60('0xbc')['format'](_0x3c299d)];typeof _0x135dbe===_0x3f7d60('0x144')&&(_0x1fd982=[_0x34cbd9,_0x292b8e,_0x5656ed['toUpperCase']()[_0x3f7d60('0xb')]()]);}}}if(_0x405a9c[_0x802e07('0x397')](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x224230=$gameMap[_0x802e07('0x3b')](Number(RegExp['$1']));return this[_0x802e07('0xc1')](_0x224230);}if(_0x405a9c[_0x802e07('0x397')](/TURN AWAY FROM PLAYER/i))return this['turnAwayFromCharacter']($gamePlayer);if(_0x405a9c[_0x802e07('0x397')](/TURN LOWER LEFT/i)){if(_0x802e07('0x60')==='FcKXt')return this[_0x802e07('0x88')](0x1);else{function _0x50225f(){const _0x425e54=_0x802e07;this[_0x425e54('0x220')][_0x425e54('0x32')]=_0x553761[_0x425e54('0x2c6')]('['+_0x36336c['$1'][_0x425e54('0x397')](/\d+/g)+']'),this['_activationProximity'][_0x425e54('0xa3')]=_0x425e54('0x3a');}}}if(_0x405a9c['match'](/TURN LOWER RIGHT/i)){if(_0x802e07('0x2f7')===_0x802e07('0x2f7'))return this[_0x802e07('0x88')](0x3);else{function _0xdc4c1c(){const _0x32b097=_0x802e07;_0x3fa719=_0x381597[_0x32b097('0x35e')](_0x2823eb),_0x43f0cc['EventsMoveCore']['Game_Character_setMoveRoute'][_0x32b097('0x6a')](this,_0x308fd8);}}}if(_0x405a9c['match'](/TURN UPPER LEFT/i))return this[_0x802e07('0x88')](0x7);if(_0x405a9c[_0x802e07('0x397')](/TURN UPPER RIGHT/i)){if(_0x802e07('0x3fa')==='BhKNw'){function _0x1cfc9c(){const _0x48c3e0=_0x802e07;return this[_0x48c3e0('0x3a0')]=![],this['_CPCs']=![],this[_0x48c3e0('0x3b')]()?_0x45da51[_0x48c3e0('0x219')][_0x48c3e0('0x74')][_0x48c3e0('0x6a')](this):-0x1;}}else return this[_0x802e07('0x88')](0x9);}if(_0x405a9c['match'](/Self Switch[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);if(_0x405a9c[_0x802e07('0x397')](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x802e07('0x68')](RegExp['$1'],RegExp['$2']);if(_0x405a9c[_0x802e07('0x397')](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x802e07('0x102')===_0x802e07('0x37f')){function _0xde485d(){const _0x7549cc=_0x802e07;if(_0x24d51f===0x0)return _0x80fb69;return _0x3d7716[_0x7549cc('0x3b')](_0x3e2f61);}}else return this[_0x802e07('0x35a')](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x405a9c['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x802e07('0x2c2')===_0x802e07('0x2c2')){const _0xddfaae=$gameMap[_0x802e07('0x3b')](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0xddfaae);}else{function _0x41bda5(){const _0x33ae72=_0x802e07;return this[_0x33ae72('0x23a')]()&&!!this['_pose'];}}}if(_0x405a9c[_0x802e07('0x397')](/TELEPORT TO PLAYER/i)){if(_0x802e07('0x2fe')==='BAdBs'){function _0x490205(){const _0x95d42d=_0x802e07;return _0x215bad[_0x95d42d('0x219')][_0x95d42d('0x335')][_0x95d42d('0x376')](_0x3a0a3c[_0x95d42d('0xb4')],0x0);}}else return this[_0x802e07('0x33')]($gamePlayer);}try{if(_0x802e07('0x1c2')!==_0x802e07('0x1c2')){function _0xa55335(){const _0x2e99d5=_0x802e07;return _0x90ee5c>=0x3e8?(_0x132f47-=0x3e8,this[_0x2e99d5('0x13b')][_0x3cc950]):_0x10222e[_0x2e99d5('0x219')][_0x2e99d5('0x33a')][_0x2e99d5('0x6a')](this,_0x287219);}}else VisuMZ[_0x802e07('0x219')]['Game_Character_processMoveCommand']['call'](this,_0x3e8645);}catch(_0x310bb9){if($gameTemp[_0x802e07('0x433')]())console[_0x802e07('0x24')](_0x310bb9);}},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x2ce')]=function(_0x4dad3b){const _0x4aafa2=_0x34cbd8;$gameTemp[_0x4aafa2('0x1c5')]([this],_0x4dad3b);},Game_Character['prototype'][_0x34cbd8('0x292')]=function(_0xfbdae2){const _0x1b96ee=_0x34cbd8;let _0x354ca7=0x0;switch(_0xfbdae2[_0x1b96ee('0x77')]()[_0x1b96ee('0xb')]()){case'!':case _0x1b96ee('0xdf'):_0x354ca7=0x1;break;case'?':case _0x1b96ee('0x37a'):_0x354ca7=0x2;break;case _0x1b96ee('0x425'):case _0x1b96ee('0x196'):case _0x1b96ee('0x289'):case _0x1b96ee('0x1d3'):case _0x1b96ee('0x2d2'):_0x354ca7=0x3;break;case'HEART':case _0x1b96ee('0xa0'):_0x354ca7=0x4;break;case _0x1b96ee('0x2a5'):_0x354ca7=0x5;break;case _0x1b96ee('0x33d'):_0x354ca7=0x6;break;case _0x1b96ee('0x29a'):case _0x1b96ee('0xa4'):case _0x1b96ee('0x2bb'):_0x354ca7=0x7;break;case'SILENCE':case _0x1b96ee('0x21'):_0x354ca7=0x8;break;case _0x1b96ee('0x145'):case _0x1b96ee('0x1fa'):case _0x1b96ee('0x21d'):case _0x1b96ee('0x130'):case _0x1b96ee('0x338'):_0x354ca7=0x9;break;case'Z':case'ZZ':case _0x1b96ee('0x2c8'):case _0x1b96ee('0x75'):_0x354ca7=0xa;break;case'USER-DEFINED\x201':_0x354ca7=0xb;break;case _0x1b96ee('0x2a3'):_0x354ca7=0xc;break;case _0x1b96ee('0x15d'):_0x354ca7=0xd;break;case _0x1b96ee('0x3c4'):_0x354ca7=0xe;break;case _0x1b96ee('0x2d8'):_0x354ca7=0xf;break;}$gameTemp['requestBalloon'](this,_0x354ca7);},Game_Character[_0x34cbd8('0x29d')]['processMoveRouteFadeIn']=function(_0x1173c8){const _0x4230fb=_0x34cbd8;_0x1173c8+=this[_0x4230fb('0x40e')],this[_0x4230fb('0x437')](_0x1173c8[_0x4230fb('0x40b')](0x0,0xff));if(this['_opacity']<0xff)this[_0x4230fb('0x429')]--;},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0xf4')]=function(_0x384edb){const _0xdfcde3=_0x34cbd8;_0x384edb=this[_0xdfcde3('0x40e')]-_0x384edb,this['setOpacity'](_0x384edb[_0xdfcde3('0x40b')](0x0,0xff));if(this[_0xdfcde3('0x40e')]>0x0)this['_moveRouteIndex']--;},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x5a')]=function(_0x29bae9){const _0x27a75d=_0x34cbd8,_0x2bebc2=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0xa8cb00=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0xd145f6=this[_0x27a75d('0x21e')](),_0x452199=(_0x29bae9===_0x27a75d('0x3f5')?_0x2bebc2:_0xa8cb00)[_0xd145f6],_0x4c8890=(_0x29bae9===_0x27a75d('0x3f5')?_0xa8cb00:_0x2bebc2)[_0xd145f6];if(this[_0x27a75d('0x35f')](this['x'],this['y'],_0x452199))_0x29bae9===_0x27a75d('0x3f5')?this[_0x27a75d('0x334')]():this['turnRight90']();else{if(!this[_0x27a75d('0x35f')](this['x'],this['y'],this[_0x27a75d('0x21e')]())){if(_0x27a75d('0x21f')===_0x27a75d('0x21f')){if(this[_0x27a75d('0x35f')](this['x'],this['y'],_0x4c8890)){if(_0x29bae9===_0x27a75d('0x3f5'))this[_0x27a75d('0x231')]();else{if(_0x27a75d('0x23c')===_0x27a75d('0x195')){function _0xe27881(){const _0x4cb143=_0x27a75d;_0x193988[_0x4cb143('0x3cd')](_0x3f1df0[_0x355a5f]);}}else this[_0x27a75d('0x334')]();}}else{if(_0x27a75d('0x194')!=='iKCha'){function _0x55728b(){const _0x5c1461=_0x27a75d;if(_0xabda30===0x0||_0x7ee1ed===0x0)return![];if(!_0x3fd198[_0x5c1461('0x308')][_0x292818])return _0x341b37['isPlaytest']()&&_0x518be7[_0x5c1461('0x24')](_0x5c1461('0x395')[_0x5c1461('0x1fd')](_0x3364ab)),![];return!![];}}else this['turn180']();}}else{function _0x1cef39(){const _0x1ffc25=_0x27a75d,_0x2a14c9=_0x2cf576[_0x1ffc25('0x394')]['_spriteset'];if(_0x2a14c9){const _0x289b63=_0x2a14c9[_0x1ffc25('0xe9')](this);_0x289b63&&_0x289b63[_0x1ffc25('0x5f')]&&_0x289b63[_0x1ffc25('0x5f')][_0x1ffc25('0x273')]!==this[_0x1ffc25('0x15a')]()&&(_0x289b63[_0x1ffc25('0x5f')]['_filename']=this[_0x1ffc25('0x15a')](),_0x289b63[_0x1ffc25('0x5f')][_0x1ffc25('0xee')]=_0x6c8d7f[_0x1ffc25('0x39d')](_0x289b63['_shadowSprite'][_0x1ffc25('0x273')]));}}}}}this[_0x27a75d('0x35f')](this['x'],this['y'],this['direction']())&&this[_0x27a75d('0x2e')]();},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x3a3')]=function(_0x1e8193){const _0xc68972=_0x34cbd8;if(ImageManager[_0xc68972('0x1fc')](this[_0xc68972('0x123')]))return;_0x1e8193=_0x1e8193[_0xc68972('0x40b')](0x0,0x7),this[_0xc68972('0x33e')](this['_characterName'],_0x1e8193);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x293')]=function(_0x945028){const _0x286eed=_0x34cbd8;switch(this['direction']()){case 0x1:this[_0x286eed('0x275')](-_0x945028,_0x945028);break;case 0x2:this[_0x286eed('0x275')](0x0,_0x945028);break;case 0x3:this[_0x286eed('0x275')](_0x945028,_0x945028);break;case 0x4:this[_0x286eed('0x275')](-_0x945028,0x0);break;case 0x6:this[_0x286eed('0x275')](_0x945028,0x0);break;case 0x7:this[_0x286eed('0x275')](-_0x945028,-_0x945028);break;case 0x8:this['jump'](0x0,-_0x945028);break;case 0x9:this[_0x286eed('0x275')](_0x945028,-_0x945028);break;}},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x73')]=function(_0x398851,_0xc0e34){const _0x1c900b=_0x34cbd8,_0x51e291=Math['round'](_0x398851-this['x']),_0xe1b089=Math['round'](_0xc0e34-this['y']);this[_0x1c900b('0x275')](_0x51e291,_0xe1b089);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x14f')]=function(_0x4d45f4){if(_0x4d45f4)this['processMoveRouteJumpTo'](_0x4d45f4['x'],_0x4d45f4['y']);},Game_Character['prototype'][_0x34cbd8('0x387')]=function(_0x4f2bb1,_0x2c9df6){const _0xe9c566=_0x34cbd8;let _0x509166=0x0;$gameMap[_0xe9c566('0x86')]()?_0x509166=this[_0xe9c566('0x435')](_0x4f2bb1,_0x2c9df6):_0x509166=this[_0xe9c566('0x52')](_0x4f2bb1,_0x2c9df6),this[_0xe9c566('0x321')](_0x509166),this[_0xe9c566('0x42c')](!![]);},Game_Character[_0x34cbd8('0x29d')]['processMoveRouteStepToCharacter']=function(_0x5953a7){const _0x1c3b0b=_0x34cbd8;if(_0x5953a7)this[_0x1c3b0b('0x387')](_0x5953a7['x'],_0x5953a7['y']);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x2a6')]=function(_0x4a9870,_0x476855){const _0x369158=_0x34cbd8,_0x36f531=this[_0x369158('0x331')](_0x4a9870),_0x229440=this[_0x369158('0x7d')](_0x476855);},Game_Character['prototype'][_0x34cbd8('0x26e')]=function(_0xa3ff1b){const _0x4e2bc4=_0x34cbd8,_0x10cc50=['',_0x4e2bc4('0x97'),'DOWN',_0x4e2bc4('0x405'),_0x4e2bc4('0x9f'),'',_0x4e2bc4('0x2d7'),_0x4e2bc4('0xbe'),'UP',_0x4e2bc4('0x2db')],_0x225a00=_0x10cc50['indexOf'](_0xa3ff1b[_0x4e2bc4('0x77')]()[_0x4e2bc4('0xb')]());if(directioin<=0x0)return;this['canPass'](this['x'],this['y'],_0x225a00)&&(this[_0x4e2bc4('0x321')](_0x225a00),this[_0x4e2bc4('0x429')]-=0x1);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x350')]=function(_0x5cdadb,_0x2acf4f){const _0x46875f=_0x34cbd8;this[_0x46875f('0x387')](_0x5cdadb,_0x2acf4f);if(this['x']!==_0x5cdadb||this['y']!==_0x2acf4f)this['_moveRouteIndex']--;},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0xe0')]=function(_0x37a865){const _0x4591bc=_0x34cbd8;if(_0x37a865)this[_0x4591bc('0x350')](_0x37a865['x'],_0x37a865['y']);},Game_Character[_0x34cbd8('0x29d')]['processMoveRouteMoveRepeat']=function(_0x59646c,_0x19f122){const _0x422c7a=_0x34cbd8;_0x19f122=_0x19f122||0x0;const _0x46bbaa={'code':0x1,'indent':null,'parameters':[]};_0x46bbaa['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x59646c],this[_0x422c7a('0x18d')][_0x422c7a('0x2b')][this['_moveRouteIndex']][_0x422c7a('0xf9')][0x0]='';while(_0x19f122--){if(_0x422c7a('0x8e')!=='wbNXC'){function _0x26f9dd(){const _0x103ae7=_0x422c7a;_0x1487b1['EventsMoveCore']['Game_Event_clearPageSettings'][_0x103ae7('0x6a')](this),this['initEventsMoveCoreEffects']();}}else this[_0x422c7a('0x18d')][_0x422c7a('0x2b')][_0x422c7a('0x57')](this[_0x422c7a('0x429')]+0x1,0x0,_0x46bbaa);}},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x34a')]=function(_0x1511b6){const _0x590151=_0x34cbd8;this['_patternLocked']=!![],this[_0x590151('0x280')](_0x1511b6);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x22b')]=function(_0x502f85,_0xe97e69){const _0x3d0ab6=_0x34cbd8;if(this===$gamePlayer)return;const _0x45b8bb=[this[_0x3d0ab6('0x13d')],this['_eventId'],'A'];if(_0x502f85[_0x3d0ab6('0x397')](/\b[ABCD]\b/i)){if('jFYrq'===_0x3d0ab6('0x32a'))_0x45b8bb[0x2]=String(_0x502f85)['charAt'](0x0)[_0x3d0ab6('0x77')]()[_0x3d0ab6('0xb')]();else{function _0x2605e5(){const _0x3cf012=_0x3d0ab6;_0x31bf5b[_0x3cf012('0x219')]['Sprite_Character_setCharacterBitmap'][_0x3cf012('0x6a')](this),this['bitmap'][_0x3cf012('0x2cf')](this['updateBitmapSmoothing'][_0x3cf012('0x90')](this));}}}else{if(_0x3d0ab6('0x8a')===_0x3d0ab6('0x8a'))_0x45b8bb[0x2]=_0x3d0ab6('0xbc')['format'](_0x502f85);else{function _0x173b49(){const _0x3eeae6=_0x3d0ab6;this[_0x3eeae6('0x186')][_0x5f4116]=_0xea6e2e[0x2][_0x3eeae6('0x397')](/VAR/i)?_0x3ba88f:!!_0x22700a,this[_0x3eeae6('0x322')]();}}}switch(_0xe97e69[_0x3d0ab6('0x77')]()['trim']()){case'ON':case _0x3d0ab6('0x3a7'):$gameSelfSwitches[_0x3d0ab6('0x116')](_0x45b8bb,!![]);break;case _0x3d0ab6('0x23b'):case _0x3d0ab6('0x39'):$gameSelfSwitches[_0x3d0ab6('0x116')](_0x45b8bb,![]);break;case _0x3d0ab6('0x3d8'):$gameSelfSwitches['setValue'](_0x45b8bb,!$gameSelfSwitches[_0x3d0ab6('0xd1')](_0x45b8bb));break;}},Game_Character['prototype'][_0x34cbd8('0x68')]=function(_0x3bfb32,_0x5a810c){const _0x52a9d3=_0x34cbd8;if(this===$gamePlayer)return;const _0x27150a=[this[_0x52a9d3('0x13d')],this[_0x52a9d3('0x383')],_0x52a9d3('0x1dc')[_0x52a9d3('0x1fd')](switchId)];$gameSelfSwitches[_0x52a9d3('0x116')](_0x27150a,Number(_0x5a810c));},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x35a')]=function(_0x5645e3,_0x28e603){const _0x42a0ee=_0x34cbd8;this[_0x42a0ee('0x307')](_0x5645e3,_0x28e603);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x33')]=function(_0x3c40f4){if(_0x3c40f4)this['processMoveRouteTeleportTo'](_0x3c40f4['x'],_0x3c40f4['y']);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x231')]=function(){const _0x447520=_0x34cbd8;switch(this['direction']()){case 0x1:this[_0x447520('0x88')](0x7);break;case 0x2:this[_0x447520('0x88')](0x4);break;case 0x3:this[_0x447520('0x88')](0x1);break;case 0x4:this['setDirection'](0x8);break;case 0x6:this[_0x447520('0x88')](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this[_0x447520('0x88')](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x334')]=function(){const _0x2d2e1a=_0x34cbd8;switch(this[_0x2d2e1a('0x21e')]()){case 0x1:this['setDirection'](0x3);break;case 0x2:this[_0x2d2e1a('0x88')](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0x2d2e1a('0x88')](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this[_0x2d2e1a('0x88')](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character[_0x34cbd8('0x29d')]['getDirectionToPoint']=function(_0x22e215,_0x60c848,_0x4d2a68){const _0x3aa3d3=_0x34cbd8,_0x141850=this['deltaXFrom'](_0x22e215),_0x21f9a3=this[_0x3aa3d3('0x7d')](_0x60c848);if($gameMap[_0x3aa3d3('0x86')]()){if(_0x3aa3d3('0x4f')!==_0x3aa3d3('0x25f')){if(_0x4d2a68||this[_0x3aa3d3('0x23a')]()){if(_0x141850>0x0&&_0x21f9a3<0x0)return 0x1;if(_0x141850<0x0&&_0x21f9a3<0x0)return 0x3;if(_0x141850>0x0&&_0x21f9a3>0x0)return 0x7;if(_0x141850<0x0&&_0x21f9a3>0x0)return 0x9;}}else{function _0x18802e(){const _0x432dcb=_0x3aa3d3;return _0x1ab249[_0x432dcb('0x86')]()?this[_0x432dcb('0x1a7')]():_0x19ec1e[_0x432dcb('0x219')][_0x432dcb('0x8')]['call'](this);}}}if(Math['abs'](_0x141850)>Math[_0x3aa3d3('0x30c')](_0x21f9a3))return _0x141850>0x0?0x4:0x6;else{if(_0x21f9a3!==0x0)return _0x21f9a3>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0xd7')]=function(_0x50fc55,_0x43806a,_0x3a5cb7){const _0x5527d0=_0x34cbd8,_0x26ec9c=this['deltaXFrom'](_0x50fc55),_0x31fb52=this[_0x5527d0('0x7d')](_0x43806a);if($gameMap['isSupportDiagonalMovement']()){if('siyAE'!==_0x5527d0('0x310')){if(_0x3a5cb7||this[_0x5527d0('0x23a')]()){if(_0x5527d0('0x126')===_0x5527d0('0x126')){if(_0x26ec9c>0x0&&_0x31fb52<0x0)return 0x9;if(_0x26ec9c<0x0&&_0x31fb52<0x0)return 0x7;if(_0x26ec9c>0x0&&_0x31fb52>0x0)return 0x3;if(_0x26ec9c<0x0&&_0x31fb52>0x0)return 0x1;}else{function _0x40f518(){const _0x17126b=_0x5527d0;return _0x7597ec['EventsMoveCore']['CustomPageConditions'][_0x17126b('0x376')](this['event']()['CPC'],this[_0x17126b('0x72')]);}}}}else{function _0x127b6e(){const _0x2307a2=_0x5527d0;var _0x47976b=this['x']-this['_addedHitbox'][_0x2307a2('0x3f5')],_0x5905c1=this['x']+this[_0x2307a2('0xe')]['right'],_0x1415b3=this['y']-this[_0x2307a2('0xe')]['up'],_0x2b67a1=this['y']+this['_addedHitbox'][_0x2307a2('0x282')];return _0x47976b<=_0x5652ca&&_0x4c8a42<=_0x5905c1&&_0x1415b3<=_0x2816f3&&_0x43521<=_0x2b67a1;}}}if(Math[_0x5527d0('0x30c')](_0x26ec9c)>Math['abs'](_0x31fb52)){if(_0x5527d0('0xef')==='JOtFk')return _0x26ec9c>0x0?0x6:0x4;else{function _0x318a0e(){const _0x499d81=_0x5527d0;_0x4b9d60=_0x485ff5||0x0;const _0x4234b7={'code':0x1,'indent':null,'parameters':[]};_0x4234b7[_0x499d81('0x37c')]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x5b1ab3],this['_moveRoute'][_0x499d81('0x2b')][this[_0x499d81('0x429')]][_0x499d81('0xf9')][0x0]='';while(_0x5c5faa--){this[_0x499d81('0x18d')][_0x499d81('0x2b')][_0x499d81('0x57')](this[_0x499d81('0x429')]+0x1,0x0,_0x4234b7);}}}}else{if(_0x31fb52!==0x0){if('BJByo'!=='BJByo'){function _0x588b2d(){const _0x24686a=_0x5527d0;if(_0x59683e!=='')_0x3c79cc+='\x0a';_0x586e59+=_0x3481b9[_0x24686a('0xf9')][0x0];}}else return _0x31fb52>0x0?0x2:0x8;}}return 0x0;},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x358')]=function(_0x4d18ad,_0x57bedb){const _0x2c5039=_0x34cbd8,_0x4128f7=this[_0x2c5039('0x410')](_0x4d18ad,_0x57bedb,!![]);if(_0x4128f7)this['executeMoveDir8'](_0x4128f7);},Game_Character['prototype'][_0x34cbd8('0x3be')]=function(_0x167757,_0x404dfe){const _0x1e983c=_0x34cbd8,_0x5a5dca=this[_0x1e983c('0xd7')](_0x167757,_0x404dfe,!![]);if(_0x5a5dca)this[_0x1e983c('0x321')](_0x5a5dca);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x5c')]=function(_0x92324b,_0x3d4c72){const _0x1d7dce=_0x34cbd8,_0x5744d4=this[_0x1d7dce('0x410')](_0x92324b,_0x3d4c72,![]);if(_0x5744d4)this[_0x1d7dce('0x88')](_0x5744d4);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x2bc')]=function(_0x378397,_0x4a936a){const _0x48a1cf=_0x34cbd8,_0x6b39be=this['getDirectionFromPoint'](_0x378397,_0x4a936a,![]);if(_0x6b39be)this[_0x48a1cf('0x88')](_0x6b39be);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x312')]=function(_0x38931b){const _0x302865=_0x34cbd8;if(_0x38931b)this[_0x302865('0x358')](_0x38931b['x'],_0x38931b['y']);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0xfa')]=function(_0x241f7d){const _0x139c9e=_0x34cbd8;if(_0x241f7d)this[_0x139c9e('0x3be')](_0x241f7d['x'],_0x241f7d['y']);},Game_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x134')]=function(_0x384dfc){const _0x55a307=_0x34cbd8;if(_0x384dfc)this[_0x55a307('0x5c')](_0x384dfc['x'],_0x384dfc['y']);},Game_Character[_0x34cbd8('0x29d')]['turnAwayFromCharacter']=function(_0x70e62f){if(_0x70e62f)this['turnAwayFromPoint'](_0x70e62f['x'],_0x70e62f['y']);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x1f4')]=Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x11e')],Game_Player['prototype']['isDashing']=function(){const _0x4bd38c=_0x34cbd8;if(this[_0x4bd38c('0x55')])return!![];return VisuMZ[_0x4bd38c('0x219')][_0x4bd38c('0x1f4')][_0x4bd38c('0x6a')](this);},Game_Player[_0x34cbd8('0x29d')]['isDashingAndMoving']=function(){const _0x3e202e=_0x34cbd8;return this[_0x3e202e('0x11e')]()&&(this[_0x3e202e('0x2bd')]()||this[_0x3e202e('0x172')]()!==0x0&&this[_0x3e202e('0x35f')](this['_x'],this['_y'],this[_0x3e202e('0x172')]())||$gameTemp[_0x3e202e('0x349')]());},VisuMZ['EventsMoveCore'][_0x34cbd8('0x8')]=Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x172')],Game_Player[_0x34cbd8('0x29d')]['getInputDirection']=function(){const _0x146451=_0x34cbd8;if($gameMap[_0x146451('0x86')]()){if(_0x146451('0x41d')!=='QyUyV')return this['getInputDir8']();else{function _0x49187e(){const _0xe37baf=_0x146451;_0x39ec6e(this[_0xe37baf('0x2ba')]['bind'](this,_0x10ced2,_0x50224c),0x64);}}}else return VisuMZ['EventsMoveCore'][_0x146451('0x8')]['call'](this);},Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x1a7')]=function(){return Input['dir8'];},Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x3f8')]=function(){const _0x49c186=_0x34cbd8;if($gameSystem[_0x49c186('0x99')]())return 0x0;if(!this[_0x49c186('0x2bd')]()&&this[_0x49c186('0x370')]()){let _0x406883=this[_0x49c186('0x172')]();if(_0x406883>0x0){if('eceas'===_0x49c186('0x30a')){function _0x3ab8dc(){const _0x4150f7=_0x49c186;if(this[_0x4150f7('0x1c8')]===_0x3dd4cc)this['initEventsMoveCore']();const _0x3123c9='Map%1-Event%2'[_0x4150f7('0x1fd')](_0x3a1000,_0x56ee27);this[_0x4150f7('0x1c8')][_0x3123c9]={'iconIndex':_0x560f7b,'bufferX':_0x71fe9d,'bufferY':_0x4a3bf9,'blendMode':_0x42762c};}}else $gameTemp[_0x49c186('0x2b4')]();}else{if($gameTemp[_0x49c186('0x349')]()){if(_0x49c186('0x295')===_0x49c186('0x295')){const _0x22938f=$gameTemp[_0x49c186('0x11f')](),_0x250b71=$gameTemp[_0x49c186('0x38f')]();$gameMap[_0x49c186('0x86')]()?_0x406883=this['findDiagonalDirectionTo'](_0x22938f,_0x250b71):_0x406883=this[_0x49c186('0x52')](_0x22938f,_0x250b71);}else{function _0x36a644(){const _0x591a4b=_0x49c186;if(_0x3312a6[_0x591a4b('0x3a2')])this[_0x591a4b('0x1ba')](_0x53dd98['ShipSpeed']);}}}}if(_0x406883>0x0){if(_0x49c186('0x1a0')!==_0x49c186('0x368'))this[_0x49c186('0x1ff')]=this[_0x49c186('0x1ff')]||0x0,this['isTurnInPlace']()?this['setDirection'](_0x406883):this['executeMove'](_0x406883),this[_0x49c186('0x1ff')]++;else{function _0x3bb3a3(){const _0x198e57=_0x49c186,_0x1b4baf=_0x4aac7d[_0x198e57('0x219')][_0x198e57('0x29')][_0x198e57('0x1f3')];return _0x1b4baf['DashModifier']!==_0x2bb789?_0x1b4baf[_0x198e57('0x272')]:_0x137183['EventsMoveCore'][_0x198e57('0xea')]['call'](this)-this['_moveSpeed'];}}}else this[_0x49c186('0x1ff')]=0x0;}},Game_Player['prototype'][_0x34cbd8('0x6f')]=function(){const _0x5ae4d9=_0x34cbd8,_0x49f3fe=VisuMZ[_0x5ae4d9('0x219')]['Settings'][_0x5ae4d9('0x1f3')];if(!_0x49f3fe[_0x5ae4d9('0x420')])return![];if($gameTemp[_0x5ae4d9('0x349')]())return![];if(this[_0x5ae4d9('0x11e')]()||this[_0x5ae4d9('0x2bd')]()||this[_0x5ae4d9('0x226')]())return![];return this[_0x5ae4d9('0x1ff')]<_0x49f3fe[_0x5ae4d9('0x2f0')];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x414')]=Game_Player[_0x34cbd8('0x29d')]['executeMove'],Game_Player[_0x34cbd8('0x29d')]['executeMove']=function(_0x4b3bc0){const _0x1e343f=_0x34cbd8;if($gameMap['isSupportDiagonalMovement']()){if('yqvcP'!==_0x1e343f('0x41f'))this[_0x1e343f('0x321')](_0x4b3bc0);else{function _0x127f2e(){const _0x282180=_0x1e343f;if(this[_0x282180('0x408')]===_0x564448&&this[_0x282180('0xe7')]())return this[_0x282180('0x319')]()[_0x282180('0x41c')]()[_0x282180('0x397')](/\[VS8\]/i);else return _0x5bb3e3[_0x282180('0x209')]&&this[_0x282180('0x24a')]()?!![]:this[_0x282180('0x41c')]()[_0x282180('0x397')](/\[VS8\]/i);}}}else VisuMZ[_0x1e343f('0x219')][_0x1e343f('0x414')][_0x1e343f('0x6a')](this,_0x4b3bc0);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x227')]=Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x1cc')],Game_Player[_0x34cbd8('0x29d')]['isMapPassable']=function(_0x28e465,_0x4cc227,_0x371df2){const _0x40a2ed=_0x34cbd8;if($gameMap['isRegionAllowPass'](_0x28e465,_0x4cc227,_0x371df2,_0x40a2ed('0x233')))return!![];if($gameMap[_0x40a2ed('0x119')](_0x28e465,_0x4cc227,_0x371df2,'player'))return![];return VisuMZ[_0x40a2ed('0x219')][_0x40a2ed('0x227')][_0x40a2ed('0x6a')](this,_0x28e465,_0x4cc227,_0x371df2);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x3d5')]=Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0xb9')],Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0xb9')]=function(_0xc8ce26){const _0x2b7656=_0x34cbd8;VisuMZ['EventsMoveCore'][_0x2b7656('0x3d5')][_0x2b7656('0x6a')](this,_0xc8ce26);if(this[_0x2b7656('0x184')]()){this['checkEventTriggerEventsMoveCore'](_0xc8ce26);if(_0xc8ce26[_0x2b7656('0x1e5')](0x0)&&this[_0x2b7656('0x1c9')]()===_0x2b7656('0x39a'))this[_0x2b7656('0x17a')](this['x'],this['y']);else(_0xc8ce26[_0x2b7656('0x1e5')](0x1)||_0xc8ce26[_0x2b7656('0x1e5')](0x2))&&this[_0x2b7656('0x1e3')]();}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0xb7')]=Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x3fd')],Game_Player[_0x34cbd8('0x29d')]['checkEventTriggerThere']=function(_0x4ae4c9){const _0x4b460c=_0x34cbd8;VisuMZ[_0x4b460c('0x219')][_0x4b460c('0xb7')][_0x4b460c('0x6a')](this,_0x4ae4c9);if(this['canStartLocalEvents']()&&_0x4ae4c9[_0x4b460c('0x1e5')](0x0)&&this[_0x4b460c('0x1c9')]()===_0x4b460c('0x3dc')){const _0x25232b=this['direction'](),_0x1f757a=$gameMap[_0x4b460c('0x3c9')](this['x'],_0x25232b),_0x3d398b=$gameMap[_0x4b460c('0xcb')](this['y'],_0x25232b);this[_0x4b460c('0x17a')](_0x1f757a,_0x3d398b);}},Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x377')]=function(_0x49ae5b){const _0x22d7c5=_0x34cbd8;if($gameMap[_0x22d7c5('0x305')]())return;if($gameMap[_0x22d7c5('0x202')]())return;const _0x49737d=$gameMap[_0x22d7c5('0xec')]();for(const _0x4c08f0 of _0x49737d){if(_0x22d7c5('0x26d')!==_0x22d7c5('0x1e2')){if(!_0x4c08f0)continue;if(!_0x4c08f0[_0x22d7c5('0x20')](_0x49ae5b))continue;if(this[_0x22d7c5('0xd4')](_0x4c08f0))return _0x4c08f0[_0x22d7c5('0x106')]();if(this[_0x22d7c5('0x18')](_0x4c08f0))return _0x4c08f0[_0x22d7c5('0x106')]();}else{function _0x24167d(){const _0x4744a2=_0x22d7c5;if(!_0x943adc[_0x4744a2('0x2e1')]())return!![];return _0x597a6d[_0x4744a2('0x219')][_0x4744a2('0x28f')][_0x4744a2('0x6a')](this);}}}},Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0xd4')]=function(_0x288fb9){const _0x2f4b12=_0x34cbd8;if($gameMap[_0x2f4b12('0x305')]())return![];if($gameMap['isAnyEventStarting']())return![];return _0x288fb9[_0x2f4b12('0x384')]()[_0x2f4b12('0x1e5')](this['regionId']());},Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x18')]=function(_0x3d8222){const _0x3b8200=_0x34cbd8;if($gameMap['isEventRunning']())return![];if($gameMap[_0x3b8200('0x202')]())return![];if(['none',_0x3b8200('0x3a')]['includes'](_0x3d8222['activationProximityType']()))return![];const _0x5c9ea8=_0x3d8222[_0x3b8200('0x82')](),_0x43e91f=_0x3d8222[_0x3b8200('0x39e')]();switch(_0x5c9ea8){case _0x3b8200('0x3d6'):const _0x344976=$gameMap[_0x3b8200('0x27d')](this['x'],this['y'],_0x3d8222['x'],_0x3d8222['y']);return _0x3d8222[_0x3b8200('0x39e')]()>=_0x344976;break;case'square':return _0x43e91f>=Math[_0x3b8200('0x30c')](_0x3d8222['deltaXFrom'](this['x']))&&_0x43e91f>=Math[_0x3b8200('0x30c')](_0x3d8222[_0x3b8200('0x7d')](this['y']));break;case _0x3b8200('0x2f3'):return _0x43e91f>=Math[_0x3b8200('0x30c')](_0x3d8222[_0x3b8200('0x7d')](this['y']));break;case _0x3b8200('0x337'):return _0x43e91f>=Math[_0x3b8200('0x30c')](_0x3d8222[_0x3b8200('0x331')](this['x']));break;case'default':return![];break;}},Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x17a')]=function(_0x4a15cc,_0x1d6418){const _0x5d0022=_0x34cbd8;if($gameMap[_0x5d0022('0x305')]())return;if($gameMap['isAnyEventStarting']())return;let _0xed96e0=VisuMZ[_0x5d0022('0x219')][_0x5d0022('0x29')][_0x5d0022('0x2ea')],_0x5b7989=$gameMap[_0x5d0022('0x79')](_0x4a15cc,_0x1d6418);const _0x5c2acf='Region%1'[_0x5d0022('0x1fd')](_0x5b7989);if(_0xed96e0[_0x5c2acf]){if(_0x5d0022('0xb6')==='fDMfi'){function _0x29c6bf(){const _0x456c59=_0x5d0022;_0x2e7c88['EventsMoveCore'][_0x456c59('0x47')]['call'](this,_0x7acd47,_0x13e896);if(this['isSpriteVS8dir']())this[_0x456c59('0x424')](_0x19327a,_0x33de38);}}else $gameTemp[_0x5d0022('0x3cd')](_0xed96e0[_0x5c2acf]);}},Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x1c9')]=function(){const _0x401813=_0x34cbd8;return VisuMZ[_0x401813('0x219')]['Settings'][_0x401813('0x2b7')];},Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x1e3')]=function(){const _0x4000c2=_0x34cbd8;if($gameMap[_0x4000c2('0x305')]())return;if($gameMap[_0x4000c2('0x202')]())return;let _0x2db7d9=VisuMZ['EventsMoveCore'][_0x4000c2('0x29')][_0x4000c2('0x412')];const _0x2a907d='Region%1'[_0x4000c2('0x1fd')](this[_0x4000c2('0x79')]());_0x2db7d9[_0x2a907d]&&$gameTemp['reserveCommonEvent'](_0x2db7d9[_0x2a907d]);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x5')]=Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x332')],Game_Player[_0x34cbd8('0x29d')][_0x34cbd8('0x332')]=function(){const _0x31b155=_0x34cbd8;VisuMZ[_0x31b155('0x219')]['Game_Player_increaseSteps'][_0x31b155('0x6a')](this),VisuMZ[_0x31b155('0x239')](0x0);},Game_Follower['prototype'][_0x34cbd8('0x11e')]=function(){return $gamePlayer['isDashing']();},Game_Follower[_0x34cbd8('0x29d')]['isDashingAndMoving']=function(){const _0x507611=_0x34cbd8;return $gamePlayer[_0x507611('0x115')]();},Game_Follower[_0x34cbd8('0x29d')][_0x34cbd8('0x298')]=function(){const _0x5431ec=_0x34cbd8;return $gamePlayer[_0x5431ec('0x298')]();},VisuMZ['EventsMoveCore'][_0x34cbd8('0x379')]=Game_Vehicle[_0x34cbd8('0x29d')]['isMapPassable'],Game_Vehicle[_0x34cbd8('0x29d')][_0x34cbd8('0x1cc')]=function(_0x35f8e4,_0x9dbb50,_0x3a5295){const _0x5a1052=_0x34cbd8;if($gameMap[_0x5a1052('0x3aa')](_0x35f8e4,_0x9dbb50,_0x3a5295,this[_0x5a1052('0x400')]))return!![];if($gameMap['isRegionForbidPass'](_0x35f8e4,_0x9dbb50,_0x3a5295,this[_0x5a1052('0x400')]))return![];return VisuMZ[_0x5a1052('0x219')]['Game_Vehicle_isMapPassable'][_0x5a1052('0x6a')](this,_0x35f8e4,_0x9dbb50,_0x3a5295);},Game_Vehicle[_0x34cbd8('0x29d')][_0x34cbd8('0x117')]=function(_0x310d1f,_0x573c15,_0x2d94bb){const _0x765c3a=_0x34cbd8;if($gameMap['isRegionAllowPass'](_0x310d1f,_0x573c15,_0x2d94bb,this[_0x765c3a('0x400')]))return!![];if($gameMap[_0x765c3a('0x119')](_0x310d1f,_0x573c15,_0x2d94bb,this[_0x765c3a('0x400')]))return![];return VisuMZ[_0x765c3a('0x219')][_0x765c3a('0x162')][_0x765c3a('0x6a')]($gamePlayer,_0x310d1f,_0x573c15,_0x2d94bb);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x2f6')]=Game_Vehicle[_0x34cbd8('0x29d')][_0x34cbd8('0x2fb')],Game_Vehicle[_0x34cbd8('0x29d')][_0x34cbd8('0x2fb')]=function(_0x2f78a5,_0x533fe7,_0x343c3c){const _0x444420=_0x34cbd8;if($gameMap[_0x444420('0x1ae')](_0x2f78a5,_0x533fe7,_0x343c3c,this[_0x444420('0x400')]))return!![];const _0x1bc81f=this[_0x444420('0x400')][_0x444420('0x45')](0x0)[_0x444420('0x77')]()+this[_0x444420('0x400')]['slice'](0x1),_0x2441b4='%1DockRegionOnly'[_0x444420('0x1fd')](_0x1bc81f);return VisuMZ[_0x444420('0x219')][_0x444420('0x29')][_0x444420('0xed')][_0x2441b4]?![]:VisuMZ[_0x444420('0x219')][_0x444420('0x2f6')][_0x444420('0x6a')](this,_0x2f78a5,_0x533fe7,_0x343c3c);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x35b')]=Game_Vehicle['prototype'][_0x34cbd8('0x407')],Game_Vehicle[_0x34cbd8('0x29d')][_0x34cbd8('0x407')]=function(){const _0x2e1306=_0x34cbd8;VisuMZ[_0x2e1306('0x219')][_0x2e1306('0x35b')]['call'](this);const _0x445bd8=VisuMZ[_0x2e1306('0x219')]['Settings']['Movement'];if(this[_0x2e1306('0x30f')]()){if(_0x2e1306('0xab')==='yAmLI'){function _0x3d7914(){return _0x4d43f1['realMoveSpeed']();}}else{if(_0x445bd8['BoatSpeed'])this[_0x2e1306('0x1ba')](_0x445bd8['BoatSpeed']);}}else{if(this[_0x2e1306('0x333')]()){if(_0x445bd8[_0x2e1306('0x3a2')])this[_0x2e1306('0x1ba')](_0x445bd8[_0x2e1306('0x3a2')]);}else{if(this['isAirship']()){if(_0x445bd8[_0x2e1306('0x150')])this['setMoveSpeed'](_0x445bd8[_0x2e1306('0x150')]);}}}},VisuMZ[_0x34cbd8('0x219')]['Game_Event_initialize']=Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x81')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x81')]=function(_0x38b708,_0xcd2141){const _0x5c2bdc=_0x34cbd8;VisuMZ[_0x5c2bdc('0x219')][_0x5c2bdc('0x3a1')][_0x5c2bdc('0x6a')](this,_0x38b708,_0xcd2141),this[_0x5c2bdc('0x10')](),this['setupMorphEvent'](),this[_0x5c2bdc('0x3b1')]();},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x37')]=Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x3b')],Game_Event['prototype'][_0x34cbd8('0x3b')]=function(){const _0x16aa94=_0x34cbd8;if(this[_0x16aa94('0x13c')]!==undefined){const _0xedc879=this[_0x16aa94('0x13c')][_0x16aa94('0x187')],_0xbba2c7=this['_eventMorphData'][_0x16aa94('0x11')];return VisuMZ[_0x16aa94('0x308')][_0xedc879][_0x16aa94('0xec')][_0xbba2c7];}if(this[_0x16aa94('0x23')]!==undefined){const _0x243a70=this[_0x16aa94('0x23')][_0x16aa94('0x187')],_0x55475e=this[_0x16aa94('0x23')][_0x16aa94('0x11')];return VisuMZ[_0x16aa94('0x308')][_0x243a70][_0x16aa94('0xec')][_0x55475e];}if(this[_0x16aa94('0x1f8')]!==undefined){if('CAmdv'===_0x16aa94('0x257')){const _0x19cada=this[_0x16aa94('0x1f8')]['mapId'],_0x216685=this[_0x16aa94('0x1f8')][_0x16aa94('0x11')];return VisuMZ[_0x16aa94('0x308')][_0x19cada]['events'][_0x216685];}else{function _0x478d55(){const _0x5f3ff1=_0x16aa94;return _0x12b79d[_0x5f3ff1('0x433')]()&&_0x3e6b9c[_0x5f3ff1('0x24')](_0x5f3ff1('0x395')[_0x5f3ff1('0x1fd')](_0x12d180)),![];}}}if($gameTemp[_0x16aa94('0x91')]!==undefined){if(_0x16aa94('0x1ee')!==_0x16aa94('0x38')){const _0x1dbb55=$gameTemp['_spawnData']['mapId'],_0x3ac6c8=$gameTemp[_0x16aa94('0x91')][_0x16aa94('0x11')];return VisuMZ[_0x16aa94('0x308')][_0x1dbb55][_0x16aa94('0xec')][_0x3ac6c8];}else{function _0x442af6(){const _0x30ae46=_0x16aa94;_0x2ff4ee+=this[_0x30ae46('0x40e')],this[_0x30ae46('0x437')](_0x4a90a3['clamp'](0x0,0xff));if(this[_0x30ae46('0x40e')]<0xff)this['_moveRouteIndex']--;}}}return VisuMZ[_0x16aa94('0x219')][_0x16aa94('0x37')][_0x16aa94('0x6a')](this);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x2be')]=function(_0x55559e,_0x2e390a){const _0x585c2e=_0x34cbd8;if(_0x55559e===0x0||_0x2e390a===0x0)return![];if(!VisuMZ[_0x585c2e('0x308')][_0x55559e])return $gameTemp[_0x585c2e('0x433')]()&&console[_0x585c2e('0x24')](_0x585c2e('0x395')[_0x585c2e('0x1fd')](_0x55559e)),![];return!![];},VisuMZ[_0x34cbd8('0x219')]['Game_Event_start']=Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x106')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x106')]=function(){const _0x5670a5=_0x34cbd8;VisuMZ['EventsMoveCore'][_0x5670a5('0x9e')][_0x5670a5('0x6a')](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x5670a5('0xb5')](VisuMZ[_0x5670a5('0x229')][_0x5670a5('0x29')][_0x5670a5('0x4')][_0x5670a5('0x193')])&&Input[_0x5670a5('0x121')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x10')]=function(){const _0xdd40f2=_0x34cbd8,_0xff7f42=this[_0xdd40f2('0x3b')]()[_0xdd40f2('0x8c')];if(_0xff7f42==='')return;if(DataManager['isBattleTest']()||DataManager[_0xdd40f2('0x352')]())return;const _0x1ace79=VisuMZ[_0xdd40f2('0x219')][_0xdd40f2('0x29')][_0xdd40f2('0x12f')];let _0x49ad62=null,_0x286bd0=0x0,_0x153104=0x0;if(_0xff7f42[_0xdd40f2('0x397')](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){if('zgeIN'==='zgeIN')_0x286bd0=Number(RegExp['$1']),_0x153104=Number(RegExp['$2']);else{function _0x36f42e(){const _0x2eb30c=_0xdd40f2;return _0x2c18d9[_0x2eb30c('0xc')][_0x2eb30c('0x1e5')](_0x45a1da)||_0x466f4a[_0x2eb30c('0x3ca')][_0x2eb30c('0x1e5')](_0x384556);}}}else{if(_0xff7f42['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x286bd0=Number(RegExp['$1']),_0x153104=Number(RegExp['$2']);else{if(_0xff7f42['match'](/<COPY EVENT:[ ](.*?)>/i)){if(_0xdd40f2('0x190')==='NpcCm'){const _0x3375ef=String(RegExp['$1'])[_0xdd40f2('0x77')]()[_0xdd40f2('0xb')]();_0x49ad62=VisuMZ['EventTemplates'][_0x3375ef];if(!_0x49ad62)return;_0x286bd0=_0x49ad62[_0xdd40f2('0x299')],_0x153104=_0x49ad62[_0xdd40f2('0x362')];}else{function _0x1a6c2c(){const _0x5639f0=_0xdd40f2;if(!this[_0x5639f0('0x2ec')])return;this[_0x5639f0('0x3c3')]=this['_periodicRefreshTimer']||0x3c,this['_periodicRefreshTimer']--,this[_0x5639f0('0x3c3')]<=0x0&&(this[_0x5639f0('0x25a')](),this[_0x5639f0('0x3c3')]=0x3c);}}}}}if(!this[_0xdd40f2('0x2be')](_0x286bd0,_0x153104))return;_0x1ace79[_0xdd40f2('0x2d5')][_0xdd40f2('0x6a')](this,_0x286bd0,_0x153104,this);if(_0x49ad62)_0x49ad62[_0xdd40f2('0x2d5')][_0xdd40f2('0x6a')](this,_0x286bd0,_0x153104,this);this['_eventCopyData']={'mapId':_0x286bd0,'eventId':_0x153104},this[_0xdd40f2('0x327')]=-0x2,this['refresh'](),_0x1ace79[_0xdd40f2('0x24c')]['call'](this,_0x286bd0,_0x153104,this);if(_0x49ad62)_0x49ad62[_0xdd40f2('0x24c')]['call'](this,_0x286bd0,_0x153104,this);$gameMap[_0xdd40f2('0x2cc')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x140')]=function(){const _0x37dfb5=_0x34cbd8,_0x598351=$gameSystem[_0x37dfb5('0x325')](this);if(!_0x598351)return;const _0xcd684e=_0x598351['template']['toUpperCase']()[_0x37dfb5('0xb')]();if(_0xcd684e!==_0x37dfb5('0x426'))this['morphIntoTemplate'](_0xcd684e,!![]);else{if(_0x37dfb5('0x1c0')!==_0x37dfb5('0x1c0')){function _0x19db25(){const _0x187e7c=_0x37dfb5,_0x3befbd=_0x34c8de[_0x187e7c('0x120')](_0x438e2b,_0x287b3a)[_0x187e7c('0x80')](_0x55c423=>_0x55c423!==this);return _0x3befbd[_0x187e7c('0x31b')]>0x0;}}else this[_0x37dfb5('0x18c')](_0x598351['mapId'],_0x598351[_0x37dfb5('0x11')],!![]);}},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x18c')]=function(_0x2db5dd,_0x534770,_0x48db4c){const _0x31e96e=_0x34cbd8;if(!this['checkValidEventerMap'](_0x2db5dd,_0x534770))return;const _0x3764a1=VisuMZ[_0x31e96e('0x219')][_0x31e96e('0x29')]['Template'];if(!_0x48db4c)_0x3764a1[_0x31e96e('0x354')]['call'](this,_0x2db5dd,_0x534770,this);this[_0x31e96e('0x13c')]={'mapId':_0x2db5dd,'eventId':_0x534770},this['_pageIndex']=-0x2,this[_0x31e96e('0x1b0')]();if(!_0x48db4c)_0x3764a1[_0x31e96e('0x3ce')][_0x31e96e('0x6a')](this,_0x2db5dd,_0x534770,this);this['clearEventCache']();},Game_Event[_0x34cbd8('0x29d')]['morphIntoTemplate']=function(_0x4439ed,_0x16886c){const _0x4c4a70=_0x34cbd8;_0x4439ed=_0x4439ed['toUpperCase']()[_0x4c4a70('0xb')]();const _0x102638=VisuMZ[_0x4c4a70('0x78')][_0x4439ed];if(!_0x102638)return;const _0x4a40d7=_0x102638['MapID'],_0x3d5398=_0x102638[_0x4c4a70('0x362')];if(!this[_0x4c4a70('0x2be')](_0x4a40d7,_0x3d5398))return;if(!_0x16886c)_0x102638[_0x4c4a70('0x354')][_0x4c4a70('0x6a')](this,_0x4a40d7,_0x3d5398,this);this[_0x4c4a70('0x18c')](_0x4a40d7,_0x3d5398,_0x16886c);if(!_0x16886c)_0x102638[_0x4c4a70('0x3ce')][_0x4c4a70('0x6a')](this,_0x4a40d7,_0x3d5398,this);this[_0x4c4a70('0x2cc')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x413')]=function(){const _0x34cd0f=_0x34cbd8;this['_eventMorphData']=undefined,this['_pageIndex']=-0x2,this[_0x34cd0f('0x1b0')]();},Game_Event['prototype'][_0x34cbd8('0x365')]=function(_0x2ec006){const _0x24164b=_0x34cbd8,_0x1f2813=VisuMZ[_0x24164b('0x219')]['Settings'][_0x24164b('0x12f')],_0x558036=_0x2ec006['template'][_0x24164b('0x77')]()['trim'](),_0x5180d4=!['',_0x24164b('0x426')][_0x24164b('0x1e5')](_0x558036);let _0x267545=0x0,_0x56efad=0x0;if(_0x5180d4){if('GRuMV'==='epsmS'){function _0x1ef3ec(){const _0x5ca748=_0x24164b,_0x1da8e7=this[_0x5ca748('0x3b')]()['note'];if(_0x1da8e7==='')return;if(_0x41e7f6[_0x5ca748('0xe4')]()||_0x4ce969[_0x5ca748('0x352')]())return;const _0x39a9c8=_0x5eafc8[_0x5ca748('0x219')]['Settings'][_0x5ca748('0x12f')];let _0x236782=null,_0x4f2e53=0x0,_0x251864=0x0;if(_0x1da8e7[_0x5ca748('0x397')](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x4f2e53=_0x44971d(_0x1e2f46['$1']),_0x251864=_0xd1c058(_0x39eca5['$2']);else{if(_0x1da8e7['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x4f2e53=_0x3a56d1(_0x3c41a7['$1']),_0x251864=_0x5cf561(_0x296ade['$2']);else{if(_0x1da8e7['match'](/<COPY EVENT:[ ](.*?)>/i)){const _0x4c1d5c=_0x2ef6e7(_0x4e9877['$1'])[_0x5ca748('0x77')]()[_0x5ca748('0xb')]();_0x236782=_0x4deb56[_0x5ca748('0x78')][_0x4c1d5c];if(!_0x236782)return;_0x4f2e53=_0x236782[_0x5ca748('0x299')],_0x251864=_0x236782['EventID'];}}}if(!this[_0x5ca748('0x2be')](_0x4f2e53,_0x251864))return;_0x39a9c8[_0x5ca748('0x2d5')]['call'](this,_0x4f2e53,_0x251864,this);if(_0x236782)_0x236782[_0x5ca748('0x2d5')][_0x5ca748('0x6a')](this,_0x4f2e53,_0x251864,this);this[_0x5ca748('0x23')]={'mapId':_0x4f2e53,'eventId':_0x251864},this['_pageIndex']=-0x2,this[_0x5ca748('0x1b0')](),_0x39a9c8[_0x5ca748('0x24c')][_0x5ca748('0x6a')](this,_0x4f2e53,_0x251864,this);if(_0x236782)_0x236782[_0x5ca748('0x24c')][_0x5ca748('0x6a')](this,_0x4f2e53,_0x251864,this);_0x5e740c['clearEventCache']();}}else{const _0xe0e11=VisuMZ['EventTemplates'][_0x558036];if(!_0xe0e11)return;_0x267545=_0xe0e11[_0x24164b('0x299')],_0x56efad=_0xe0e11[_0x24164b('0x362')];}}else _0x267545=_0x2ec006[_0x24164b('0x187')],_0x56efad=_0x2ec006[_0x24164b('0x11')];if(!this[_0x24164b('0x2be')](_0x267545,_0x56efad))return;if(_0x5180d4){if('pMJDC'==='pMJDC'){const _0x153b05=VisuMZ[_0x24164b('0x78')][_0x558036];_0x153b05[_0x24164b('0x1cd')]['call'](this,_0x267545,_0x56efad,this);}else{function _0x366698(){const _0x3d761a=_0x24164b;return this[_0x3d761a('0xe')]?this[_0x3d761a('0xc8')](_0x27e708,_0x125b2e):_0x145716[_0x3d761a('0x29d')][_0x3d761a('0x336')]['call'](this,_0x5284c3,_0x3ddd74);}}}_0x1f2813[_0x24164b('0x1cd')][_0x24164b('0x6a')](this,_0x267545,_0x56efad,this),this[_0x24164b('0x1f8')]=_0x2ec006,this['_pageIndex']=-0x2,this[_0x24164b('0x13d')]=$gameMap['mapId'](),this[_0x24164b('0x383')]=_0x2ec006['spawnEventId'],this[_0x24164b('0x2ef')]=_0x2ec006['spawnPreserved'],this[_0x24164b('0x307')](_0x2ec006['x'],_0x2ec006['y']),this[_0x24164b('0x88')](_0x2ec006[_0x24164b('0x21e')]),this[_0x24164b('0x1b0')]();if(_0x5180d4){const _0x149a21=VisuMZ[_0x24164b('0x78')][_0x558036];if(!_0x149a21)return;_0x149a21[_0x24164b('0x240')][_0x24164b('0x6a')](this,_0x267545,_0x56efad,this);}_0x1f2813[_0x24164b('0x240')][_0x24164b('0x6a')](this,_0x267545,_0x56efad,this);const _0x5664f2=SceneManager[_0x24164b('0x394')];if(_0x5664f2&&_0x5664f2[_0x24164b('0x3a9')])_0x5664f2[_0x24164b('0x3a9')][_0x24164b('0x1a1')](this);},Game_Event['prototype'][_0x34cbd8('0x13f')]=function(){const _0x442c25=_0x34cbd8;return!!this[_0x442c25('0x1f8')];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0xa6')]=Game_Event['prototype'][_0x34cbd8('0x1b0')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x1b0')]=function(){const _0x3e6c29=_0x34cbd8;VisuMZ[_0x3e6c29('0x219')]['Game_Event_refresh']['call'](this),this[_0x3e6c29('0x2c4')]();},VisuMZ['EventsMoveCore']['Game_Event_clearPageSettings']=Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x353')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x353')]=function(){const _0x496ebc=_0x34cbd8;VisuMZ['EventsMoveCore'][_0x496ebc('0x224')][_0x496ebc('0x6a')](this),this['initEventsMoveCoreEffects']();},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x25b')]=Game_Event['prototype'][_0x34cbd8('0x147')],Game_Event[_0x34cbd8('0x29d')]['setupPageSettings']=function(){const _0x3f049c=_0x34cbd8;this['_activationProximityAutoTriggerBypass']=!![],VisuMZ[_0x3f049c('0x219')][_0x3f049c('0x25b')][_0x3f049c('0x6a')](this),this[_0x3f049c('0x2c4')](),this[_0x3f049c('0x17c')]=![];},Game_Event[_0x34cbd8('0x29d')]['setupEventsMoveCoreEffects']=function(){const _0x5abb41=_0x34cbd8;if(!this['event']())return;this[_0x5abb41('0x15f')](),this[_0x5abb41('0xc5')](),this[_0x5abb41('0x160')](),this['updateEventsMoveCoreTagChanges']();},Game_Event['prototype'][_0x34cbd8('0xc5')]=function(){const _0x2bdf1f=_0x34cbd8,_0x276017=this[_0x2bdf1f('0x3b')]()[_0x2bdf1f('0x8c')];if(_0x276017==='')return;this[_0x2bdf1f('0xdd')](_0x276017);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x160')]=function(){const _0x4d13a9=_0x34cbd8;if(!this['page']())return;const _0x3d5afd=this[_0x4d13a9('0x2b')]();let _0x12e5e9='';for(const _0x5bce05 of _0x3d5afd){if(_0x4d13a9('0x2e2')==='ruliV'){function _0x1bcdb7(){const _0x1eb018=_0x4d13a9,_0x517bef=_0x431456['GetMoveSynchTarget'](this['moveSynchTarget']());this['executeMoveDir8'](_0x517bef[_0x1eb018('0x163')]());}}else{if([0x6c,0x198]['includes'](_0x5bce05['code'])){if(_0x4d13a9('0x177')!=='YvVRe'){if(_0x12e5e9!=='')_0x12e5e9+='\x0a';_0x12e5e9+=_0x5bce05[_0x4d13a9('0xf9')][0x0];}else{function _0x1aa4b2(){const _0x3a512b=_0x4d13a9;return this[_0x3a512b('0x1c8')][_0x3a512b('0x32e')];}}}}}this['checkEventsMoveCoreStringTags'](_0x12e5e9);},Game_Event['prototype'][_0x34cbd8('0x15f')]=function(){const _0x1cfdce=_0x34cbd8,_0x4d4638=VisuMZ['EventsMoveCore'][_0x1cfdce('0x29')];this[_0x1cfdce('0x220')]={'type':'none','distance':0x0,'regionList':[]},this[_0x1cfdce('0x214')]=![],this['_clickTrigger']=![],this[_0x1cfdce('0xe')]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x1cfdce('0x249')]={'iconIndex':0x0,'bufferX':_0x4d4638[_0x1cfdce('0x258')]['BufferX'],'bufferY':_0x4d4638[_0x1cfdce('0x258')][_0x1cfdce('0x329')],'blendMode':_0x4d4638[_0x1cfdce('0x258')]['BlendMode']},this['_labelWindow']={'text':'','visibleRange':_0x4d4638['Label']['VisibleRange'],'offsetX':_0x4d4638[_0x1cfdce('0x42')][_0x1cfdce('0x24e')],'offsetY':_0x4d4638[_0x1cfdce('0x42')][_0x1cfdce('0x4a')]},this[_0x1cfdce('0x132')]=[],this['_moveSynch']={'target':-0x1,'type':_0x1cfdce('0x136'),'delay':0x1},this[_0x1cfdce('0x385')]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x4d4638[_0x1cfdce('0x1f3')][_0x1cfdce('0x1c7')]},this[_0x1cfdce('0x250')](),this[_0x1cfdce('0x1be')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0xdd')]=function(_0x5230c0){const _0x4b0809=_0x34cbd8;if(_0x5230c0[_0x4b0809('0x397')](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4b0809('0x404')!==_0x4b0809('0x404')){function _0x374e3c(){const _0x375815=_0x4b0809,_0x1661bb=_0x503b02['EventsMoveCore']['Settings'][_0x375815('0x1f3')];if(!_0x1661bb[_0x375815('0x420')])return![];if(_0x267839[_0x375815('0x349')]())return![];if(this['isDashing']()||this[_0x375815('0x2bd')]()||this[_0x375815('0x226')]())return![];return this[_0x375815('0x1ff')]<_0x1661bb[_0x375815('0x2f0')];}}else this[_0x4b0809('0x220')][_0x4b0809('0x32')]=JSON[_0x4b0809('0x2c6')]('['+RegExp['$1'][_0x4b0809('0x397')](/\d+/g)+']'),this[_0x4b0809('0x220')][_0x4b0809('0xa3')]='region';}else{if(_0x5230c0[_0x4b0809('0x397')](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x4b0809('0x255')!==_0x4b0809('0x2a2'))type=String(RegExp['$1'])[_0x4b0809('0x3d1')]()[_0x4b0809('0xb')](),this['_activationProximity'][_0x4b0809('0xa3')]=type,this[_0x4b0809('0x220')]['distance']=Number(RegExp['$2']);else{function _0x58004b(){const _0x3b896c=_0x4b0809;for(const _0x5e3b5d of _0x47fb43[_0x3b896c('0xec')]()){_0x5e3b5d[_0x3b896c('0x1b0')]();}}}}}if(_0x5230c0[_0x4b0809('0x397')](/<ALWAYS UPDATE MOVEMENT>/i)){if('vMlZD'===_0x4b0809('0x2b1')){function _0x585a22(){const _0x15c1d8=_0x4b0809;_0x1ee31b[_0x15c1d8('0x219')][_0x15c1d8('0x390')][_0x15c1d8('0x6a')](this),this['createLabelWindows']();}}else this[_0x4b0809('0x214')]=!![];}_0x5230c0['match'](/<CLICK TRIGGER>/i)&&(this['_clickTrigger']=!![]);const _0x1210f6=_0x5230c0['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x1210f6)for(const _0x5748f8 of _0x1210f6){if(_0x4b0809('0x36e')!=='tzlTG'){function _0x472d32(){const _0xd59be0=_0x4b0809;this[_0xd59be0('0x1bf')][_0xd59be0('0x3f4')]()!==this[_0xd59be0('0x391')]&&(this[_0xd59be0('0x391')]=this[_0xd59be0('0x1bf')][_0xd59be0('0x3f4')](),this[_0xd59be0('0x1b0')]());}}else{if(_0x5748f8['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if('QtJzB'===_0x4b0809('0x37e')){const _0x36f991=String(RegExp['$1'])[_0x4b0809('0x3d1')]()[_0x4b0809('0xb')](),_0x1bcb6d=Number(RegExp['$2']);this[_0x4b0809('0xe')][_0x36f991]=_0x1bcb6d;}else{function _0x233e46(){const _0x48603e=_0x4b0809;return _0x1f47be[_0x48603e('0x274')](),!![];}}}}}_0x5230c0['match'](/<ICON:[ ](\d+)>/i)&&(this[_0x4b0809('0x249')][_0x4b0809('0x1ec')]=Number(RegExp['$1']));_0x5230c0[_0x4b0809('0x397')](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x4b0809('0x249')]['bufferX']=Number(RegExp['$1']));if(_0x5230c0[_0x4b0809('0x397')](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x4b0809('0x3c1')==='PbWoO'){function _0x4cf61c(){const _0x5991c2=_0x4b0809;return this['isDashing']()&&(this[_0x5991c2('0x2bd')]()||this[_0x5991c2('0x172')]()!==0x0&&this['canPass'](this['_x'],this['_y'],this[_0x5991c2('0x172')]())||_0x5283a2['isDestinationValid']());}}else this[_0x4b0809('0x249')][_0x4b0809('0x2a9')]=Number(RegExp['$1']);}if(_0x5230c0['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x4b0809('0xf')==='Acfzd')this[_0x4b0809('0x249')][_0x4b0809('0x3eb')]=Number(RegExp['$1']),this[_0x4b0809('0x249')]['bufferY']=Number(RegExp['$2']);else{function _0x14473b(){const _0x14815d=_0x4b0809;if(!_0xf7b4d7['_scene'])return;if(!_0x50baa3[_0x14815d('0x394')][_0x14815d('0x3a9')])return;const _0x2553ac=_0x1c7778[_0x14815d('0x394')][_0x14815d('0x3a9')][_0x14815d('0xe9')](this['_event']);if(!_0x2553ac)return;this['x']=_0x40c7f5[_0x14815d('0x343')](this['_event']['screenX']()-_0x3d5209['floor'](this[_0x14815d('0x3b5')]*this['scale']['x']/0x2)),this['x']+=this['_event']['_labelWindow']['offsetX'],this['y']=this[_0x14815d('0x1bf')][_0x14815d('0x42b')]()-_0x2553ac[_0x14815d('0x24d')],this['y']+=_0x5af1f3[_0x14815d('0x343')](_0x194f59[_0x14815d('0x27a')]()*0.5),this['y']-=_0x4c8e4b[_0x14815d('0x343')](this['height']*this['scale']['y']),this['y']+=this[_0x14815d('0x1bf')][_0x14815d('0x112')][_0x14815d('0xb0')];}}}if(_0x5230c0[_0x4b0809('0x397')](/<ICON BLEND MODE:[ ](.*?)>/i)){if(_0x4b0809('0x205')===_0x4b0809('0x205')){const _0x53a07e=String(RegExp['$1'])[_0x4b0809('0x77')]()['trim'](),_0x28fbe4=[_0x4b0809('0x1b3'),'ADDITIVE','MULTIPLY',_0x4b0809('0x223')];this[_0x4b0809('0x249')][_0x4b0809('0x3ad')]=_0x28fbe4[_0x4b0809('0x1de')](_0x53a07e)[_0x4b0809('0x40b')](0x0,0x3);}else{function _0xe9155(){const _0x145220=_0x4b0809;return this['isSpriteVS8dir']()?(this[_0x145220('0x290')]||'')[_0x145220('0x77')]()['trim']():''[_0x145220('0x77')]()[_0x145220('0xb')]();}}}if(_0x5230c0[_0x4b0809('0x397')](/<LABEL:[ ](.*?)>/i)){if(_0x4b0809('0x2d3')!=='UEySH'){function _0x2bfc60(){const _0x21c7ec=_0x4b0809;if(this[_0x21c7ec('0x132')]===_0x5bb30a)this[_0x21c7ec('0x15f')]();return this[_0x21c7ec('0x132')]['length']>0x0;}}else this[_0x4b0809('0x112')]['text']=String(RegExp['$1'])[_0x4b0809('0xb')]();}_0x5230c0[_0x4b0809('0x397')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x4b0809('0x112')][_0x4b0809('0x3f3')]=String(RegExp['$1'])['trim']());_0x5230c0[_0x4b0809('0x397')](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x4b0809('0x244')]=Number(RegExp['$1']));_0x5230c0['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x4b0809('0x112')][_0x4b0809('0xb0')]=Number(RegExp['$1']));if(_0x5230c0['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x4b0809('0x2fd')!==_0x4b0809('0x15'))this[_0x4b0809('0x112')][_0x4b0809('0x244')]=Number(RegExp['$1']),this[_0x4b0809('0x112')][_0x4b0809('0xb0')]=Number(RegExp['$2']);else{function _0x521802(){const _0x41fb3f=_0x4b0809;_0x3affc2[_0x41fb3f('0x1ab')](_0x5be4ad,_0x2ad673),_0x33e381[_0x41fb3f('0x23e')]=_0x137d01[_0x41fb3f('0x23e')]||_0xeee059[_0x41fb3f('0x187')](),_0x246b1d[_0x41fb3f('0x31e')](_0x7581e6['MapId'],_0x47ce0e[_0x41fb3f('0x1f')]);}}}$gameTemp[_0x4b0809('0x14a')](this);for(;;){if(this[_0x4b0809('0x112')][_0x4b0809('0x3f3')][_0x4b0809('0x397')](/\\V\[(\d+)\]/gi))this[_0x4b0809('0x112')][_0x4b0809('0x3f3')]=this[_0x4b0809('0x112')][_0x4b0809('0x3f3')][_0x4b0809('0x3b0')](/\\V\[(\d+)\]/gi,(_0x5da997,_0x4b61a6)=>$gameVariables['value'](parseInt(_0x4b61a6)));else{if(_0x4b0809('0x421')===_0x4b0809('0x2e3')){function _0x5a7fe7(){const _0x52152e=_0x4b0809;return this['_moveSynch'][_0x52152e('0xa3')];}}else break;}}$gameTemp[_0x4b0809('0x1d7')]();if(_0x5230c0['match'](/<LABEL RANGE:[ ](\d+)>/i)){if(_0x4b0809('0xcf')!==_0x4b0809('0x39c'))this[_0x4b0809('0x112')][_0x4b0809('0x30')]=Number(RegExp['$1']);else{function _0x35126f(){const _0x1db0d9=_0x4b0809,_0x22fc41=this[_0x1db0d9('0x1ca')]+_0x13f6ba(_0x3a197f['$1']);return this['processMoveRouteSetIndex'](_0x22fc41);}}}if(_0x5230c0[_0x4b0809('0x397')](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x4491ab=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x4b0809('0x132')]=this[_0x4b0809('0x132')][_0x4b0809('0x398')](_0x4491ab),this[_0x4b0809('0x132')][_0x4b0809('0xdc')](0x0);}if(_0x5230c0[_0x4b0809('0x397')](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if(_0x4b0809('0x3e3')!==_0x4b0809('0x3e3')){function _0x383fb7(){const _0x511e5c=_0x4b0809;if(this['_forceDashing'])return!![];return _0x3d04e3['EventsMoveCore'][_0x511e5c('0x1f4')][_0x511e5c('0x6a')](this);}}else{const _0xfd0692=String(RegExp['$1']);if(_0xfd0692[_0x4b0809('0x397')](/PLAYER/i))this[_0x4b0809('0x3a8')][_0x4b0809('0xaf')]=0x0;else _0xfd0692['match'](/EVENT[ ](\d+)/i)&&(this[_0x4b0809('0x3a8')][_0x4b0809('0xaf')]=Number(RegExp['$1']));}}_0x5230c0[_0x4b0809('0x397')](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x4b0809('0x3a8')][_0x4b0809('0xa3')]=String(RegExp['$1'])[_0x4b0809('0x3d1')]()[_0x4b0809('0xb')]());_0x5230c0['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x4b0809('0x3a8')][_0x4b0809('0x12a')]=Number(RegExp['$1']));_0x5230c0[_0x4b0809('0x397')](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x4b0809('0x385')]=!![]);if(_0x5230c0[_0x4b0809('0x397')](/<HIDE SHADOW>/i)){if(_0x4b0809('0x33f')!=='FjYVF')this[_0x4b0809('0xdb')][_0x4b0809('0xcd')]=![];else{function _0x58952e(){const _0x2c650d=_0x4b0809;return this[_0x2c650d('0x7a')](0x7,_0x361354(_0x37cead['$1']));}}}if(_0x5230c0[_0x4b0809('0x397')](/<SHADOW FILENAME:[ ](.*?)>/i)){if(_0x4b0809('0x25')!==_0x4b0809('0x1db'))this[_0x4b0809('0xdb')][_0x4b0809('0x42a')]=String(RegExp['$1']);else{function _0x179965(){const _0x1e6ce9=_0x4b0809;if([0x2,0x4,0x6,0x8][_0x1e6ce9('0x1e5')](_0x28feff))return 0x0;if([0x1,0x3,0x7,0x9][_0x1e6ce9('0x1e5')](_0x14ccb4))return 0x1;}}}if(_0x5230c0['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if('SfSTo'==='SfSTo')this['_spriteOffsetX']=Number(RegExp['$1']);else{function _0xe8c747(){this['_spriteOffsetY']=_0x1f85bb(_0x391c5a['$1']);}}}if(_0x5230c0['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x4b0809('0x252')==='BaYpI'){function _0x395f3e(){const _0x28c11c=_0x4b0809;if(_0x104eb3||this[_0x28c11c('0x23a')]()){if(_0x538f61>0x0&&_0x1c10fd<0x0)return 0x1;if(_0x42353e<0x0&&_0x479fd6<0x0)return 0x3;if(_0x58ca62>0x0&&_0x37b99b>0x0)return 0x7;if(_0x181f2c<0x0&&_0xc4b599>0x0)return 0x9;}}}else this[_0x4b0809('0x1bb')]=Number(RegExp['$1']);}if(_0x5230c0[_0x4b0809('0x397')](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('PgbwC'===_0x4b0809('0x44'))this[_0x4b0809('0x2f')]=Number(RegExp['$1']),this[_0x4b0809('0x1bb')]=Number(RegExp['$2']);else{function _0xc23890(){const _0x11f2a3=_0x4b0809;this[_0x11f2a3('0x290')]='',this[_0x11f2a3('0x38c')]=0x0;}}}_0x5230c0[_0x4b0809('0x397')](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x4b0809('0x143')]=String(RegExp['$1'])[_0x4b0809('0x77')]()[_0x4b0809('0xb')]());},Game_Event['prototype'][_0x34cbd8('0x264')]=function(){const _0x36690a=_0x34cbd8;this[_0x36690a('0x53')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x175')]=function(){const _0x33ea15=_0x34cbd8;if(this[_0x33ea15('0x214')])return!![];return Game_Character[_0x33ea15('0x29d')]['isNearTheScreen'][_0x33ea15('0x6a')](this);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x3b7')]=Game_Event['prototype'][_0x34cbd8('0x20a')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x20a')]=function(){const _0x1af79b=_0x34cbd8;if(this[_0x1af79b('0x3ae')]())return;VisuMZ[_0x1af79b('0x219')][_0x1af79b('0x3b7')][_0x1af79b('0x6a')](this),this[_0x1af79b('0x2bd')]()&&VisuMZ[_0x1af79b('0x239')](this[_0x1af79b('0x383')]);},Game_Event['prototype'][_0x34cbd8('0x3ae')]=function(){const _0xf52682=_0x34cbd8,_0x23252b=VisuMZ['EventsMoveCore'][_0xf52682('0x29')][_0xf52682('0x1f3')];if($gameMap[_0xf52682('0x305')]()&&_0x23252b[_0xf52682('0x40d')])return!![];if($gameMessage[_0xf52682('0x1e8')]()&&_0x23252b['StopAutoMoveMessages'])return!![];if(!$gameSystem[_0xf52682('0x36f')]())return!![];if(this[_0xf52682('0x279')]()>=0x0)return!![];return![];},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x53')]=function(){const _0x2a0fdc=_0x34cbd8,_0x2eee85=SceneManager[_0x2a0fdc('0x394')]['_spriteset'];if(_0x2eee85){if(_0x2a0fdc('0x207')===_0x2a0fdc('0x207')){const _0x65b808=_0x2eee85[_0x2a0fdc('0xe9')](this);_0x65b808&&_0x65b808['_shadowSprite']&&_0x65b808[_0x2a0fdc('0x5f')][_0x2a0fdc('0x273')]!==this[_0x2a0fdc('0x15a')]()&&(_0x65b808[_0x2a0fdc('0x5f')]['_filename']=this[_0x2a0fdc('0x15a')](),_0x65b808['_shadowSprite']['bitmap']=ImageManager[_0x2a0fdc('0x39d')](_0x65b808[_0x2a0fdc('0x5f')][_0x2a0fdc('0x273')]));}else{function _0x1efe88(){const _0x5afebb=_0x2a0fdc;if(this[_0x5afebb('0x6e')]())return this[_0x5afebb('0x1a9')](_0x4d3ceb,_0x17cdb7,_0x290af6);if(_0x1c30ec[_0x5afebb('0x3aa')](_0xac91e9,_0x2d10b0,_0x206ecb,_0x5afebb('0x3b')))return!![];if(_0x2082db['isRegionForbidPass'](_0x337115,_0x51f8d7,_0x5db6ce,_0x5afebb('0x3b')))return![];return _0x597299[_0x5afebb('0x29d')][_0x5afebb('0x1cc')][_0x5afebb('0x6a')](this,_0x193734,_0x50c8ab,_0x52673d);}}}},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x15a')]=function(){const _0x514de5=_0x34cbd8;return this[_0x514de5('0xdb')][_0x514de5('0x42a')];},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0xf7')]=function(){const _0x310fbf=_0x34cbd8;if(!this[_0x310fbf('0xdb')][_0x310fbf('0xcd')])return![];return Game_CharacterBase['prototype'][_0x310fbf('0xf7')]['call'](this);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x3f4')]=function(){const _0x3f6858=_0x34cbd8;return this[_0x3f6858('0x112')][_0x3f6858('0x3f3')];},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x22a')]=function(){const _0x3ca121=_0x34cbd8;return this[_0x3ca121('0x112')][_0x3ca121('0x30')];},Game_Event['prototype']['isMapPassable']=function(_0x396b0f,_0x2855aa,_0x4041ea){const _0x1d9477=_0x34cbd8;if(this['hasMoveOnlyRegions']())return this[_0x1d9477('0x1a9')](_0x396b0f,_0x2855aa,_0x4041ea);if($gameMap[_0x1d9477('0x3aa')](_0x396b0f,_0x2855aa,_0x4041ea,_0x1d9477('0x3b')))return!![];if($gameMap[_0x1d9477('0x119')](_0x396b0f,_0x2855aa,_0x4041ea,_0x1d9477('0x3b')))return![];return Game_Character[_0x1d9477('0x29d')][_0x1d9477('0x1cc')][_0x1d9477('0x6a')](this,_0x396b0f,_0x2855aa,_0x4041ea);},Game_Event[_0x34cbd8('0x29d')]['hasMoveOnlyRegions']=function(){const _0xd4c23d=_0x34cbd8;if(this['_moveOnlyRegions']===undefined)this['initEventsMoveCoreEffects']();return this[_0xd4c23d('0x132')][_0xd4c23d('0x31b')]>0x0;},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x1a9')]=function(_0x1aedb3,_0x212603,_0x2d0dd7){const _0x42d590=_0x34cbd8,_0x2115f6=$gameMap['roundXWithDirection'](_0x1aedb3,_0x2d0dd7),_0x1f67af=$gameMap[_0x42d590('0xcb')](_0x212603,_0x2d0dd7),_0xf39cff=$gameMap[_0x42d590('0x79')](_0x2115f6,_0x1f67af);return this['_moveOnlyRegions']['includes'](_0xf39cff);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x74')]=Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x64')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x64')]=function(){const _0x350f20=_0x34cbd8;return this[_0x350f20('0x3a0')]=![],this[_0x350f20('0x168')]=![],this[_0x350f20('0x3b')]()?VisuMZ['EventsMoveCore'][_0x350f20('0x74')]['call'](this):-0x1;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0xf1')]=Game_Event['prototype']['meetsConditions'],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x3bc')]=function(_0x46df0e){const _0x2d8459=_0x34cbd8;this[_0x2d8459('0x1bc')](_0x46df0e),$gameTemp[_0x2d8459('0x14a')](this);const _0x1675f0=VisuMZ[_0x2d8459('0x219')]['Game_Event_meetsConditions'][_0x2d8459('0x6a')](this,_0x46df0e);return $gameTemp[_0x2d8459('0x1d7')](),_0x1675f0;},Game_Event['prototype'][_0x34cbd8('0x133')]=function(){return this['_advancedSwitchVariable'];},Game_Event['prototype'][_0x34cbd8('0x1bc')]=function(_0x5e33f7){const _0x4509c3=_0x34cbd8,_0x179ae6=_0x5e33f7['conditions'];if(_0x179ae6['switch1Valid']&&DataManager[_0x4509c3('0x388')](_0x179ae6[_0x4509c3('0x2c9')])){if(_0x4509c3('0x1df')===_0x4509c3('0xfe')){function _0x271615(){const _0x4dee78=_0x4509c3,_0x447118=/\$gameVariables\.value\((\d+)\)/gi,_0x291bd9=/\\V\[(\d+)\]/gi;while(_0x4e07a8['match'](_0x447118)){_0x2f3f31=_0x3c94ae[_0x4dee78('0x3b0')](_0x447118,(_0x205734,_0x36d115)=>_0x157e90[_0x4dee78('0xd1')](_0x4c9771(_0x36d115)));}while(_0x1eb660['match'](_0x291bd9)){_0x1499c2=_0x592fa2[_0x4dee78('0x3b0')](_0x291bd9,(_0x5f51fa,_0x32f201)=>_0x4d3f1b[_0x4dee78('0xd1')](_0x571b42(_0x32f201)));}return _0x47f12c;}}else this[_0x4509c3('0x3a0')]=!![];}else{if(_0x179ae6[_0x4509c3('0x1f5')]&&DataManager['isAdvancedSwitch'](_0x179ae6['switch2Id']))this['_advancedSwitchVariable']=!![];else _0x179ae6[_0x4509c3('0x2d1')]&&DataManager['isAdvancedVariable'](_0x179ae6[_0x4509c3('0x1b1')])&&(this[_0x4509c3('0x3a0')]=!![]);}},Game_Event['prototype'][_0x34cbd8('0x5d')]=function(){return this['_clickTrigger'];},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x274')]=function(){const _0x23d6b3=_0x34cbd8;$gameTemp[_0x23d6b3('0x2b4')](),this[_0x23d6b3('0x106')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x336')]=function(_0x2acab8,_0x2bb400){const _0x3ad88b=_0x34cbd8;return this[_0x3ad88b('0xe')]?this[_0x3ad88b('0xc8')](_0x2acab8,_0x2bb400):Game_Character[_0x3ad88b('0x29d')][_0x3ad88b('0x336')][_0x3ad88b('0x6a')](this,_0x2acab8,_0x2bb400);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0xc8')]=function(_0x451be9,_0x3c1bc1){const _0x4b049b=_0x34cbd8;var _0x5251f9=this['x']-this[_0x4b049b('0xe')][_0x4b049b('0x3f5')],_0x4f6cb5=this['x']+this[_0x4b049b('0xe')][_0x4b049b('0x40')],_0x22bcbd=this['y']-this[_0x4b049b('0xe')]['up'],_0x150367=this['y']+this[_0x4b049b('0xe')][_0x4b049b('0x282')];return _0x5251f9<=_0x451be9&&_0x451be9<=_0x4f6cb5&&_0x22bcbd<=_0x3c1bc1&&_0x3c1bc1<=_0x150367;},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x35f')]=function(_0x12bad2,_0x5a9ad6,_0x526e66){const _0x32f710=_0x34cbd8;for(let _0x3f8dd8=-this['_addedHitbox']['left'];_0x3f8dd8<=this['_addedHitbox'][_0x32f710('0x40')];_0x3f8dd8++){if(_0x32f710('0x3c7')===_0x32f710('0x3c7'))for(let _0x57262a=-this[_0x32f710('0xe')]['up'];_0x57262a<=this[_0x32f710('0xe')]['down'];_0x57262a++){if(_0x32f710('0xa')!==_0x32f710('0x128')){if(!Game_Character[_0x32f710('0x29d')]['canPass'][_0x32f710('0x6a')](this,_0x12bad2+_0x3f8dd8,_0x5a9ad6+_0x57262a,_0x526e66))return![];}else{function _0x1a31a9(){const _0xbc37c3=_0x32f710;_0x17fc85=[_0x3a8a26,_0x4793e7,_0xe7e465['toUpperCase']()[_0xbc37c3('0xb')]()];}}}else{function _0x3be601(){const _0xad5be1=_0x32f710;_0xf34c89[_0xad5be1('0x219')]['CustomPageConditions']['loadCPC'](_0x277757);}}}return!![];},Game_Event['prototype'][_0x34cbd8('0x1af')]=function(_0x44c75f,_0x2b529f){const _0x5c46d8=_0x34cbd8;if(Imported[_0x5c46d8('0x1ac')]&&this[_0x5c46d8('0x34e')]())return this[_0x5c46d8('0x3f9')](_0x44c75f,_0x2b529f);else{if(_0x5c46d8('0x26f')!==_0x5c46d8('0x26f')){function _0x28da1b(){const _0x3f39c0=_0x5c46d8;_0x44b49f=_0x5bc32b[_0x3f39c0('0x35d')];}}else{const _0x3f1363=$gameMap['eventsXyNt'](_0x44c75f,_0x2b529f)[_0x5c46d8('0x80')](_0x40d2fd=>_0x40d2fd!==this);return _0x3f1363[_0x5c46d8('0x31b')]>0x0;}}},Game_Event[_0x34cbd8('0x29d')]['checkSmartEventCollision']=function(_0x453392,_0x5d84d1){const _0x29e93c=_0x34cbd8;if(!this['isNormalPriority']()){if('CCvJo'!==_0x29e93c('0x357'))return![];else{function _0x26dabb(){return this['screenX']();}}}else{const _0x2a8cef=$gameMap[_0x29e93c('0x120')](_0x453392,_0x5d84d1)[_0x29e93c('0x80')](_0x24492b=>_0x24492b!==this&&_0x24492b['isNormalPriority']());return _0x2a8cef[_0x29e93c('0x31b')]>0x0;}},Game_Event['prototype'][_0x34cbd8('0x82')]=function(){const _0x23b4db=_0x34cbd8;return this[_0x23b4db('0x220')][_0x23b4db('0xa3')]||_0x23b4db('0x2c3');},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x39e')]=function(){const _0x545454=_0x34cbd8;return this[_0x545454('0x220')][_0x545454('0x27d')]||0x0;},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x384')]=function(){const _0x193440=_0x34cbd8;return this[_0x193440('0x220')][_0x193440('0x32')]||[];},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x332')]=function(){const _0x2193d1=_0x34cbd8;Game_Character[_0x2193d1('0x29d')][_0x2193d1('0x332')]['call'](this);if(['none',_0x2193d1('0x3a')][_0x2193d1('0x1e5')](this[_0x2193d1('0x82')]()))return;$gamePlayer[_0x2193d1('0x377')]([0x2]);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x4c')]=Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x12d')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x12d')]=function(){const _0x2736a4=_0x34cbd8;if(this[_0x2736a4('0x34c')]!==0x3)return;if(this[_0x2736a4('0x17c')])return;if(!this[_0x2736a4('0x28b')](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ[_0x2736a4('0x219')][_0x2736a4('0x4c')][_0x2736a4('0x6a')](this);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x7b')]=Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x355')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x355')]=function(){const _0x4a405a=_0x34cbd8;if(!this[_0x4a405a('0x2f9')])return;if(!this[_0x4a405a('0x28b')](!![]))return;if(!this[_0x4a405a('0x185')](!![]))return;VisuMZ[_0x4a405a('0x219')][_0x4a405a('0x7b')][_0x4a405a('0x6a')](this);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x28b')]=function(_0x5beeeb){const _0x6ce188=_0x34cbd8;if(!_0x5beeeb&&$gameMap[_0x6ce188('0x305')]())return![];if(!_0x5beeeb&&$gameMap[_0x6ce188('0x202')]())return![];if(this[_0x6ce188('0x384')]()<=0x0)return!![];return $gamePlayer[_0x6ce188('0xd4')](this);},Game_Event['prototype'][_0x34cbd8('0x185')]=function(_0xaa12eb){const _0x4c62f2=_0x34cbd8;if(!_0xaa12eb&&$gameMap['isEventRunning']())return![];if(!_0xaa12eb&&$gameMap[_0x4c62f2('0x202')]())return![];if([_0x4c62f2('0x2c3'),_0x4c62f2('0x3a')][_0x4c62f2('0x1e5')](this[_0x4c62f2('0x82')]()))return!![];return $gamePlayer['meetActivationProximityConditions'](this);},VisuMZ[_0x34cbd8('0x239')]=function(_0x281e56){const _0x1462e5=_0x34cbd8;for(const _0x426265 of $gameMap['events']()){if(_0x1462e5('0x32b')===_0x1462e5('0x32b')){if(!_0x426265)continue;_0x426265[_0x1462e5('0x279')]()===_0x281e56&&_0x426265[_0x1462e5('0x253')]();}else{function _0x1027dc(){return this['_PlayerDiagonalSetting'];}}}},VisuMZ['GetMoveSynchTarget']=function(_0x2e9622){const _0x5cf545=_0x34cbd8;if(_0x2e9622===0x0)return $gamePlayer;return $gameMap[_0x5cf545('0x3b')](_0x2e9622);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x279')]=function(){const _0x1ee97b=_0x34cbd8;return this[_0x1ee97b('0x3a8')][_0x1ee97b('0xaf')];},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x107')]=function(){const _0xf58e96=_0x34cbd8;return this[_0xf58e96('0x3a8')][_0xf58e96('0xa3')];},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x298')]=function(){const _0x5b45bd=_0x34cbd8;if(this[_0x5b45bd('0x279')]()>=0x0){if('nsITU'!=='nsITU'){function _0x25a79c(){const _0x1097bd=_0x5b45bd;_0x22b8bd['ConvertParams'](_0x3e1b81,_0x3f4cb8);const _0x2faeee={'mapId':_0x587593[_0x1097bd('0x23e')],'eventId':_0x5750cb[_0x1097bd('0x1f')],'pageId':_0x4f75df['PageId']};if(_0x2faeee[_0x1097bd('0x187')]<=0x0)_0x2faeee[_0x1097bd('0x187')]=_0x1f1618?_0x333485['mapId']():0x1;_0x1fc41e[_0x1097bd('0x13e')]()['pluginCommandCallEvent'](_0x2faeee);}}else{const _0x44ac84=VisuMZ[_0x5b45bd('0x2d')](this['moveSynchTarget']());if(_0x44ac84)return _0x44ac84[_0x5b45bd('0x298')]();}}return Game_Character[_0x5b45bd('0x29d')][_0x5b45bd('0x298')][_0x5b45bd('0x6a')](this);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x253')]=function(){const _0x4b19e8=_0x34cbd8;this[_0x4b19e8('0x3a8')][_0x4b19e8('0x17b')]=this[_0x4b19e8('0x3a8')][_0x4b19e8('0x17b')]||0x0,this[_0x4b19e8('0x3a8')]['timer']--;if(this[_0x4b19e8('0x3a8')]['timer']>0x0)return;this['_moveSynch']['timer']=this[_0x4b19e8('0x3a8')][_0x4b19e8('0x12a')],this[_0x4b19e8('0x70')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x70')]=function(){const _0x11a46c=_0x34cbd8;switch(this['moveSynchType']()){case'random':this[_0x11a46c('0x27')]();break;case _0x11a46c('0x3e1'):this['processMoveSynchApproach']();break;case'away':this[_0x11a46c('0x2f4')]();break;case _0x11a46c('0x12e'):this[_0x11a46c('0x418')]();break;case'mimic':case _0x11a46c('0x268'):this[_0x11a46c('0x393')]();break;case _0x11a46c('0x1a8'):case'reverse\x20copy':this['processMoveSynchReverseMimic']();break;case _0x11a46c('0x1e7'):case _0x11a46c('0x1b4'):case _0x11a46c('0x76'):case _0x11a46c('0x311'):this['processMoveSynchMirrorHorz']();break;case _0x11a46c('0x197'):case _0x11a46c('0x225'):case _0x11a46c('0x245'):case _0x11a46c('0x3'):this[_0x11a46c('0x261')]();break;default:this[_0x11a46c('0x27')]();break;}this[_0x11a46c('0x27b')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x27')]=function(){const _0x401cef=_0x34cbd8,_0x5aceab=[0x2,0x4,0x6,0x8];$gameMap[_0x401cef('0x86')]()&&_0x5aceab[_0x401cef('0x58')](0x1,0x3,0x7,0x9);const _0xaf3453=[];for(const _0x3a5e72 of _0x5aceab){if(this[_0x401cef('0x35f')](this['x'],this['y'],_0x3a5e72))_0xaf3453[_0x401cef('0x58')](_0x3a5e72);}if(_0xaf3453[_0x401cef('0x31b')]>0x0){const _0x1150b7=_0xaf3453[Math[_0x401cef('0x137')](_0xaf3453['length'])];this[_0x401cef('0x321')](_0x1150b7);}},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x50')]=function(){const _0x3ab9b1=_0x34cbd8,_0x4e0acc=VisuMZ[_0x3ab9b1('0x2d')](this[_0x3ab9b1('0x279')]());this[_0x3ab9b1('0x312')](_0x4e0acc);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x2f4')]=function(){const _0x20f461=_0x34cbd8,_0x28f081=VisuMZ[_0x20f461('0x2d')](this['moveSynchTarget']());this[_0x20f461('0xfa')](_0x28f081);},Game_Event[_0x34cbd8('0x29d')]['processMoveSynchCustom']=function(){const _0x37d3bb=_0x34cbd8;this[_0x37d3bb('0x247')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x393')]=function(){const _0x1c3308=_0x34cbd8,_0x3ce677=VisuMZ[_0x1c3308('0x2d')](this[_0x1c3308('0x279')]());this['executeMoveDir8'](_0x3ce677[_0x1c3308('0x163')]());},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x61')]=function(){const _0x282a1b=_0x34cbd8,_0x21e760=VisuMZ['GetMoveSynchTarget'](this[_0x282a1b('0x279')]()),_0x138a71=this[_0x282a1b('0xb1')](_0x21e760[_0x282a1b('0x163')]());this[_0x282a1b('0x321')](this[_0x282a1b('0xb1')](_0x21e760[_0x282a1b('0x21e')]()));},Game_Event[_0x34cbd8('0x29d')]['processMoveSynchMirrorHorz']=function(){const _0x578b75=_0x34cbd8,_0x3e0ae6=VisuMZ['GetMoveSynchTarget'](this[_0x578b75('0x279')]()),_0x33afde=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x3e0ae6[_0x578b75('0x163')]()];this[_0x578b75('0x321')](_0x33afde);},Game_Event['prototype'][_0x34cbd8('0x261')]=function(){const _0x147844=_0x34cbd8,_0x1ee382=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']()),_0x3a675b=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x1ee382[_0x147844('0x163')]()];this['executeMoveDir8'](_0x3a675b);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x3b1')]=function(){const _0x522c9d=_0x34cbd8,_0x383293=$gameSystem[_0x522c9d('0x417')](this);if(!_0x383293)return;this[_0x522c9d('0x307')](_0x383293['x'],_0x383293['y']),this[_0x522c9d('0x88')](_0x383293[_0x522c9d('0x21e')]);if(this[_0x522c9d('0x327')]===_0x383293[_0x522c9d('0xc6')]){if(_0x522c9d('0x3d0')===_0x522c9d('0x164')){function _0x3d6f03(){_0x557349[0x2]=_0x25e35e(_0x3dbda4)['charAt'](0x0)['toUpperCase']()['trim']();}}else this['_moveRouteIndex']=_0x383293[_0x522c9d('0x1ea')];}},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x371')]=function(){const _0x2b3466=_0x34cbd8;Game_Character['prototype'][_0x2b3466('0x371')]['call'](this),this[_0x2b3466('0x3f1')]();},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x98')]=function(){const _0x5ef369=_0x34cbd8;if($gameMap[_0x5ef369('0xaa')]())return!![];return this['_saveEventLocation'];},Game_Event[_0x34cbd8('0x29d')]['autosaveEventLocation']=function(){const _0x3736b6=_0x34cbd8;if(!this[_0x3736b6('0x98')]())return;this[_0x3736b6('0x1d4')]();},Game_Event[_0x34cbd8('0x29d')]['saveEventLocation']=function(){$gameSystem['saveEventLocation'](this);},Game_Event['prototype'][_0x34cbd8('0xf8')]=function(){$gameSystem['deleteSavedEventLocation'](this);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x30e')]=function(){const _0xd4d901=_0x34cbd8;if($gameSystem['getEventIconData']()){if('VmtXf'!==_0xd4d901('0x306'))return Game_Character[_0xd4d901('0x29d')][_0xd4d901('0x30e')]['call'](this);else{function _0x55d88c(){const _0x39217a=_0xd4d901;_0x86f051=this[_0x39217a('0x52')](_0x1ebf44,_0x25fe48);}}}else return this['_eventIcon'];},Game_Event[_0x34cbd8('0x29d')]['hasCPCs']=function(){const _0x1113e3=_0x34cbd8;return this[_0x1113e3('0x168')];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x16e')]=Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x3bc')],Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x3bc')]=function(_0x1d60bc){const _0xb81079=_0x34cbd8,_0x2d83d2=VisuMZ['EventsMoveCore'][_0xb81079('0x16e')][_0xb81079('0x6a')](this,_0x1d60bc);if(!_0x2d83d2)return![];return this[_0xb81079('0x2d6')](_0x1d60bc);},Game_Event[_0x34cbd8('0x29d')][_0x34cbd8('0x2d6')]=function(_0x3f5bf6){const _0x43aa81=_0x34cbd8;VisuMZ['EventsMoveCore'][_0x43aa81('0x335')][_0x43aa81('0xf5')](_0x3f5bf6),this['_CPCs']=_0x3f5bf6[_0x43aa81('0xb4')]['length']>0x0;_0x3f5bf6['CPC']===undefined&&VisuMZ['EventsMoveCore'][_0x43aa81('0x335')][_0x43aa81('0xf5')](_0x3f5bf6);if(_0x3f5bf6['CPC']['length']>0x0){if('sItuf'===_0x43aa81('0x285'))return $gameMap['event'](this[_0x43aa81('0x383')])&&VisuMZ[_0x43aa81('0x219')]['CustomPageConditions'][_0x43aa81('0x376')](_0x3f5bf6[_0x43aa81('0xb4')],this[_0x43aa81('0x383')]);else{function _0x11521c(){const _0x23422f=_0x43aa81;_0x5d1e93[_0x23422f('0x219')][_0x23422f('0x3f2')][_0x23422f('0x6a')](this,_0x280540);}}}return!![];},VisuMZ['EventsMoveCore'][_0x34cbd8('0x153')]=Game_Troop[_0x34cbd8('0x29d')][_0x34cbd8('0x3bc')],Game_Troop['prototype'][_0x34cbd8('0x3bc')]=function(_0x316e45){const _0x4a4fd5=_0x34cbd8;var _0x3c0213=VisuMZ['EventsMoveCore'][_0x4a4fd5('0x153')][_0x4a4fd5('0x6a')](this,_0x316e45);return _0x3c0213&&this['CPCsMet'](_0x316e45);},Game_Troop[_0x34cbd8('0x29d')][_0x34cbd8('0x313')]=function(_0x2b1c93){const _0x56895f=_0x34cbd8;_0x2b1c93[_0x56895f('0xb4')]===undefined&&VisuMZ[_0x56895f('0x219')]['CustomPageConditions'][_0x56895f('0xf5')](_0x2b1c93);if(_0x2b1c93[_0x56895f('0xb4')][_0x56895f('0x31b')]>0x0)return VisuMZ[_0x56895f('0x219')][_0x56895f('0x335')][_0x56895f('0x376')](_0x2b1c93[_0x56895f('0xb4')],0x0);return!![];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x14e')]=Game_Interpreter[_0x34cbd8('0x29d')][_0x34cbd8('0x154')],Game_Interpreter['prototype'][_0x34cbd8('0x154')]=function(){const _0x27bc31=_0x34cbd8;if(this[_0x27bc31('0x146')]===_0x27bc31('0x3bf')){if(window[this[_0x27bc31('0x1d5')]]){if(_0x27bc31('0x31f')!=='JWhCY'){function _0x46afc6(){const _0xf2a9a6=_0x27bc31;if(this['_trigger']!==0x3)return;if(this[_0xf2a9a6('0x17c')])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this[_0xf2a9a6('0x185')](![]))return;_0x1e41e8['EventsMoveCore'][_0xf2a9a6('0x4c')][_0xf2a9a6('0x6a')](this);}}else this['_waitMode']='',this['startCallEvent']();}else return!![];}else return VisuMZ[_0x27bc31('0x219')]['Game_Interpreter_updateWaitMode'][_0x27bc31('0x6a')](this);},VisuMZ[_0x34cbd8('0x219')]['Game_Interpreter_executeCommand']=Game_Interpreter[_0x34cbd8('0x29d')][_0x34cbd8('0x1da')],Game_Interpreter[_0x34cbd8('0x29d')][_0x34cbd8('0x1da')]=function(){const _0x4b0c6a=_0x34cbd8,_0x5cc29f=$gameMap&&this[_0x4b0c6a('0x383')]?$gameMap[_0x4b0c6a('0x3b')](this[_0x4b0c6a('0x383')]):null;$gameTemp[_0x4b0c6a('0x14a')](_0x5cc29f);const _0x172230=VisuMZ[_0x4b0c6a('0x219')][_0x4b0c6a('0x12c')][_0x4b0c6a('0x6a')](this);return $gameTemp['clearSelfTarget'](),_0x172230;},VisuMZ['EventsMoveCore']['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x34cbd8('0x29d')][_0x34cbd8('0x346')],Game_Interpreter[_0x34cbd8('0x29d')][_0x34cbd8('0x346')]=function(_0x50f4b1){const _0x1e8aad=_0x34cbd8;return $gameTemp[_0x1e8aad('0x212')](this),VisuMZ['EventsMoveCore']['Game_Interpreter_PluginCommand']['call'](this,_0x50f4b1);},Game_Interpreter[_0x34cbd8('0x29d')][_0x34cbd8('0x1f7')]=function(_0x23cf42){const _0x5c6789=_0x34cbd8;this[_0x5c6789('0x1e6')]=_0x23cf42;const _0x5ab420='Map%1.json'['format'](_0x23cf42['mapId'][_0x5c6789('0x1a6')](0x3));this[_0x5c6789('0x1d5')]=_0x5c6789('0x303')+Graphics['frameCount']+'_'+this[_0x5c6789('0x11')](),DataManager[_0x5c6789('0x1aa')](this[_0x5c6789('0x1d5')],_0x5ab420);if(window[this[_0x5c6789('0x1d5')]]){if(_0x5c6789('0xe5')!=='gAilz')this['startCallEvent']();else{function _0x13a6cc(){const _0x420978=_0x5c6789;for(let _0x4c2ddd=-this[_0x420978('0xe')]['up'];_0x4c2ddd<=this[_0x420978('0xe')][_0x420978('0x282')];_0x4c2ddd++){if(!_0x3303d6[_0x420978('0x29d')][_0x420978('0x35f')][_0x420978('0x6a')](this,_0x4b7cb8+_0x25c752,_0x1ceac6+_0x4c2ddd,_0x41c0e5))return![];}}}}else{if(_0x5c6789('0x3f0')===_0x5c6789('0xd2')){function _0x1d3a7e(){const _0x57e06c=_0x5c6789;_0x126590[_0x57e06c('0x341')]=_0x53aed5[_0x57e06c('0x341')][_0x57e06c('0x77')]()[_0x57e06c('0xb')](),_0x580905[_0x57e06c('0x78')][_0x51adc3[_0x57e06c('0x341')]]=_0x54def2;if(!_0x5f0b5e[_0x57e06c('0x1e5')](_0x22f70d[_0x57e06c('0x299')]))_0x3ebb66[_0x57e06c('0x58')](_0xaa7e28[_0x57e06c('0x299')]);}}else this[_0x5c6789('0x16')](_0x5c6789('0x3bf'));}},Game_Interpreter['prototype'][_0x34cbd8('0x2b6')]=function(){const _0x186c48=_0x34cbd8,_0x4641c5=this['_callEventData'],_0x3125d4=window[this[_0x186c48('0x1d5')]],_0x452184=_0x3125d4[_0x186c48('0xec')][_0x4641c5[_0x186c48('0x11')]];if(_0x452184&&_0x452184[_0x186c48('0x28a')][_0x4641c5[_0x186c48('0xad')]-0x1]){const _0x229f21=_0x452184[_0x186c48('0x28a')][_0x4641c5['pageId']-0x1][_0x186c48('0x2b')];this[_0x186c48('0x340')](_0x229f21,this[_0x186c48('0x11')]());}window[this[_0x186c48('0x1d5')]]=undefined,this['_callEventMap']=undefined,this[_0x186c48('0x1e6')]=undefined;};function Game_CPCInterpreter(){const _0x36a537=_0x34cbd8;this[_0x36a537('0x81')][_0x36a537('0xf2')](this,arguments);};Game_CPCInterpreter[_0x34cbd8('0x29d')]=Object['create'](Game_Interpreter[_0x34cbd8('0x29d')]),Game_CPCInterpreter['prototype']['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x34cbd8('0x29d')]['clear']=function(){const _0x180afc=_0x34cbd8;Game_Interpreter[_0x180afc('0x29d')][_0x180afc('0x121')][_0x180afc('0x6a')](this),this['_cpc']=![];},Game_CPCInterpreter[_0x34cbd8('0x29d')][_0x34cbd8('0x3d')]=function(){const _0xb56fa4=_0x34cbd8;while(this[_0xb56fa4('0x316')]()){this[_0xb56fa4('0x1da')]();}},Game_CPCInterpreter[_0x34cbd8('0x29d')][_0x34cbd8('0x28e')]=function(_0x261914){const _0x3b97b8=_0x34cbd8;Game_Interpreter[_0x3b97b8('0x29d')][_0x3b97b8('0x28e')][_0x3b97b8('0x6a')](this,_0x261914);if(this[_0x3b97b8('0x2a1')][_0x3b97b8('0x173')](_0x4d1fef=>_0x4d1fef[_0x3b97b8('0x397')](/<(?:CONDITION|CONDITIONS) MET>/i))){if(_0x3b97b8('0x176')!=='EHvAT')this[_0x3b97b8('0x169')]=!![];else{function _0x1b80cb(){const _0x337d17=_0x3b97b8;return _0x566868[_0x337d17('0x219')]['Game_Player_getInputDirection'][_0x337d17('0x6a')](this);}}}return!![];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x359')]=Scene_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x2da')],Scene_Map['prototype'][_0x34cbd8('0x2da')]=function(){const _0x4f135b=_0x34cbd8;VisuMZ['EventsMoveCore'][_0x4f135b('0x359')][_0x4f135b('0x6a')](this),this['_spriteset'][_0x4f135b('0x31a')]();},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x201')]=Scene_Load['prototype'][_0x34cbd8('0x9d')],Scene_Load[_0x34cbd8('0x29d')]['onLoadSuccess']=function(){const _0x58192d=_0x34cbd8;if($gameMap)$gameMap[_0x58192d('0x2cc')]();VisuMZ[_0x58192d('0x219')][_0x58192d('0x201')][_0x58192d('0x6a')](this);},VisuMZ[_0x34cbd8('0x219')]['Sprite_Character_initMembers']=Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x2a0')],Sprite_Character['prototype'][_0x34cbd8('0x2a0')]=function(){const _0x333d07=_0x34cbd8;VisuMZ[_0x333d07('0x219')]['Sprite_Character_initMembers'][_0x333d07('0x6a')](this),this[_0x333d07('0x32f')](),this[_0x333d07('0x263')]();},Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x32f')]=function(){const _0x3c7a14=_0x34cbd8;this[_0x3c7a14('0x3cf')]=0xff;},Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x263')]=function(){const _0x318d8b=_0x34cbd8;this[_0x318d8b('0x228')]=new Sprite(),this['_eventIconSprite'][_0x318d8b('0xee')]=ImageManager['loadSystem'](_0x318d8b('0x23d')),this[_0x318d8b('0x228')][_0x318d8b('0x39f')](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x318d8b('0x2b9')]['x']=0.5,this[_0x318d8b('0x228')][_0x318d8b('0x2b9')]['y']=0x1,this[_0x318d8b('0x83')](this['_eventIconSprite']);},Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x23a')]=function(){const _0x2aada3=_0x34cbd8;return this[_0x2aada3('0x123')]&&this['_characterName'][_0x2aada3('0x397')](/\[VS8\]/i);},Sprite_Character[_0x34cbd8('0x29d')]['isAutoBufferIcon']=function(){const _0x545156=_0x34cbd8;return this['isSpriteVS8dir']()&&VisuMZ[_0x545156('0x219')][_0x545156('0x29')][_0x545156('0x159')]['AutoBuffer'];},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x428')]=Sprite_Character['prototype'][_0x34cbd8('0x27b')],Sprite_Character[_0x34cbd8('0x29d')]['update']=function(){const _0x4c023c=_0x34cbd8;VisuMZ[_0x4c023c('0x219')][_0x4c023c('0x428')][_0x4c023c('0x6a')](this);if(VisuMZ[_0x4c023c('0x219')]['Settings'][_0x4c023c('0x1f3')][_0x4c023c('0x19f')]){if(_0x4c023c('0x27e')===_0x4c023c('0x19d')){function _0x228588(){const _0x27f6e5=_0x4c023c;if(!this[_0x27f6e5('0x3b')]())return;this['initEventsMoveCoreEffects'](),this[_0x27f6e5('0xc5')](),this[_0x27f6e5('0x160')](),this[_0x27f6e5('0x264')]();}}else this[_0x4c023c('0x236')]();}this['_shadowSprite']&&this[_0x4c023c('0x330')]();if(this[_0x4c023c('0x228')]){if(_0x4c023c('0x2a4')!==_0x4c023c('0x2a4')){function _0x4d3a4c(){const _0x1082ca=_0x4c023c,_0x37b3af=this['textSizeEx'](this[_0x1082ca('0x391')]);this[_0x1082ca('0x3b5')]=_0x37b3af[_0x1082ca('0x3b5')]+(_0x2d1e46[_0x1082ca('0x27a')]()+this['itemPadding']())*0x2,this[_0x1082ca('0x24d')]=_0xe43fdc[_0x1082ca('0x24f')](this[_0x1082ca('0x375')](),_0x37b3af[_0x1082ca('0x24d')])+_0x20490c[_0x1082ca('0x27a')]()*0x2,this[_0x1082ca('0x22e')]();}}else this['updateEventIconSprite']();}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x141')]=Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x287')],Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x287')]=function(){const _0x1cc798=_0x34cbd8;VisuMZ[_0x1cc798('0x219')][_0x1cc798('0x141')][_0x1cc798('0x6a')](this),this[_0x1cc798('0xee')][_0x1cc798('0x2cf')](this[_0x1cc798('0xcc')][_0x1cc798('0x90')](this));},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x345')]=Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x3e8')],Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x3e8')]=function(){const _0x1e9c30=_0x34cbd8;VisuMZ['EventsMoveCore'][_0x1e9c30('0x345')][_0x1e9c30('0x6a')](this),this['bitmap'][_0x1e9c30('0x2cf')](this[_0x1e9c30('0xcc')][_0x1e9c30('0x90')](this));},Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0xcc')]=function(){const _0x17b53e=_0x34cbd8;if(!this['bitmap'])return;this[_0x17b53e('0xee')][_0x17b53e('0x3ba')]=!!VisuMZ[_0x17b53e('0x219')][_0x17b53e('0x29')][_0x17b53e('0x1f3')][_0x17b53e('0x3ec')];},VisuMZ['EventsMoveCore'][_0x34cbd8('0x2fa')]=Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x2a8')],Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x2a8')]=function(){const _0x1bc4b1=_0x34cbd8;if(this[_0x1bc4b1('0x23a')]()){if('ddUZE'===_0x1bc4b1('0x10b'))return this[_0x1bc4b1('0x259')]();else{function _0x54c26f(){const _0x489e20=_0x1bc4b1;return this[_0x489e20('0x7a')](0x9,_0x4add60(_0xb3afa8['$1']));}}}else return VisuMZ[_0x1bc4b1('0x219')][_0x1bc4b1('0x2fa')][_0x1bc4b1('0x6a')](this);},Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x259')]=function(){const _0x42b669=_0x34cbd8,_0x161c6d=this['_character'][_0x42b669('0x21e')](),_0xce1eba=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0xce1eba[_0x161c6d]-0x2)/0x2;},Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x236')]=function(){const _0x547c51=_0x34cbd8;this[_0x547c51('0x3bb')]=0x0;if(this['isAllowCharacterTilt']()){if(_0x547c51('0x2ee')==='HnSiZ'){function _0x127d7a(){const _0x2517d3=_0x547c51;return _0x14b878['EventsMoveCore']['Game_CharacterBase_canPass'][_0x2517d3('0x6a')](this,_0x13887d,_0x216320,_0x3cc563);}}else{const _0x34d795=VisuMZ[_0x547c51('0x219')][_0x547c51('0x29')][_0x547c51('0x1f3')],_0x4a9b58=this[_0x547c51('0x1')][_0x547c51('0x21e')]();if([0x1,0x4,0x7][_0x547c51('0x1e5')](_0x4a9b58))this[_0x547c51('0x3bb')]=_0x34d795[_0x547c51('0x38e')];if([0x3,0x6,0x9]['includes'](_0x4a9b58))this['rotation']=_0x34d795[_0x547c51('0x389')];[0x2,0x8][_0x547c51('0x1e5')](_0x4a9b58)&&(this['rotation']=[-_0x34d795[_0x547c51('0x110')],0x0,_0x34d795[_0x547c51('0x110')]][this[_0x547c51('0x1')][_0x547c51('0x422')]()]);}}},Sprite_Character['prototype'][_0x34cbd8('0x10a')]=function(){const _0x1778eb=_0x34cbd8;if(this[_0x1778eb('0x3fb')])return![];return this['_character']['isDashingAndMoving']()&&!this[_0x1778eb('0x1')][_0x1778eb('0x226')]()&&!this[_0x1778eb('0x1')][_0x1778eb('0x2f8')]()&&this[_0x1778eb('0x19')]()===0x0;},Sprite_Character['prototype']['updateShadow']=function(){const _0xb0d97c=_0x34cbd8;this[_0xb0d97c('0x5f')]['x']=this[_0xb0d97c('0x1')][_0xb0d97c('0x3bd')](),this['_shadowSprite']['y']=this[_0xb0d97c('0x1')][_0xb0d97c('0x2af')](),this[_0xb0d97c('0x5f')][_0xb0d97c('0x5b')]=this['opacity'],this[_0xb0d97c('0x5f')][_0xb0d97c('0xcd')]=this[_0xb0d97c('0x1')][_0xb0d97c('0xf7')](),this[_0xb0d97c('0x5f')][_0xb0d97c('0xe6')]=this[_0xb0d97c('0xe6')],!this['_character'][_0xb0d97c('0x9a')]()?(this[_0xb0d97c('0x5f')][_0xb0d97c('0x156')]['x']=Math['min'](0x1,this['_shadowSprite'][_0xb0d97c('0x156')]['x']+0.1),this[_0xb0d97c('0x5f')][_0xb0d97c('0x156')]['y']=Math['min'](0x1,this[_0xb0d97c('0x5f')]['scale']['y']+0.1)):(this['_shadowSprite'][_0xb0d97c('0x156')]['x']=Math[_0xb0d97c('0x24f')](0x0,this[_0xb0d97c('0x5f')]['scale']['x']-0.1),this[_0xb0d97c('0x5f')][_0xb0d97c('0x156')]['y']=Math[_0xb0d97c('0x24f')](0x0,this[_0xb0d97c('0x5f')][_0xb0d97c('0x156')]['y']-0.1));},Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x3ea')]=function(){const _0x37c2b1=_0x34cbd8,_0x596a97=this['_eventIconSprite'],_0x517e10=this[_0x37c2b1('0x19')]();if(_0x517e10<=0x0)return _0x596a97[_0x37c2b1('0x39f')](0x0,0x0,0x0,0x0);else{const _0x5d294c=ImageManager[_0x37c2b1('0x3d2')],_0x49aa6c=ImageManager['iconHeight'],_0x871da6=_0x517e10%0x10*_0x5d294c,_0x1e4a94=Math[_0x37c2b1('0xfb')](_0x517e10/0x10)*_0x49aa6c;_0x596a97[_0x37c2b1('0x39f')](_0x871da6,_0x1e4a94,_0x5d294c,_0x49aa6c),this['visible']=!![];}const _0x103452=this['_character']['getEventIconData']();if(this[_0x37c2b1('0x49')]()){if('uDVjI'==='aavAs'){function _0x405bf4(){const _0x3e7679=_0x37c2b1;_0x1cfa5c['ConvertParams'](_0x51cb63,_0x24d125);const _0x361a97=[_0x599768[_0x3e7679('0x23e')],_0x2fee5f['EventId'],_0x3e7679('0x1dc')[_0x3e7679('0x1fd')](_0x404d8a[_0x3e7679('0xc4')])];_0x2d3246[_0x3e7679('0x23e')]=_0x51b4b6[_0x3e7679('0x23e')]||_0x340b0c[_0x3e7679('0x187')]();const _0x4ad791=_0x3679ee[_0x3e7679('0x3f')](_0x17976f['value'](_0x361a97),_0x109088[_0x3e7679('0x238')],_0x2a2c0e[_0x3e7679('0x20f')]);_0x5e6bbc[_0x3e7679('0x116')](_0x361a97,_0x4ad791);}}else this[_0x37c2b1('0x1e9')](_0x596a97);}else _0x596a97['x']=_0x103452?_0x103452[_0x37c2b1('0x3eb')]:0x0,_0x596a97['y']=_0x103452?-this['height']+_0x103452[_0x37c2b1('0x2a9')]:0x0;_0x596a97[_0x37c2b1('0x3ad')]=_0x103452?_0x103452[_0x37c2b1('0x3ad')]:0x0,this['removeChild'](_0x596a97),this['addChild'](_0x596a97),_0x596a97[_0x37c2b1('0x3bb')]=-this[_0x37c2b1('0x3bb')];},Sprite_Character[_0x34cbd8('0x29d')][_0x34cbd8('0x1e9')]=function(_0x4b5ff4){const _0x2e5b42=_0x34cbd8;_0x4b5ff4['x']=0x0,_0x4b5ff4['y']=-this[_0x2e5b42('0x24d')]+this[_0x2e5b42('0x24d')]*0x2/0x5;if(this['_character'][_0x2e5b42('0x422')]()!==0x1){if(_0x2e5b42('0x63')!=='diUov'){function _0x42f90c(){_0x343a22=_0x427ff3(_0x11eed3['$1']),_0x1bed8c=_0x26808b(_0x998f1b['$2']);}}else _0x4b5ff4['y']+=0x1;}},Sprite_Character['prototype'][_0x34cbd8('0x19')]=function(){const _0x21bf40=_0x34cbd8;if(!this[_0x21bf40('0x1')])return 0x0;const _0xeaa075=this[_0x21bf40('0x1')]['getEventIconData']();return _0xeaa075?_0xeaa075[_0x21bf40('0x1ec')]||0x0:0x0;},VisuMZ['EventsMoveCore']['Sprite_Balloon_setup']=Sprite_Balloon[_0x34cbd8('0x29d')][_0x34cbd8('0xa7')],Sprite_Balloon['prototype'][_0x34cbd8('0xa7')]=function(_0x1be3a2,_0x453f20){const _0x9f639a=_0x34cbd8;VisuMZ[_0x9f639a('0x219')][_0x9f639a('0x203')]['call'](this,_0x1be3a2,_0x453f20);if(VisuMZ[_0x9f639a('0x219')][_0x9f639a('0x29')][_0x9f639a('0x159')][_0x9f639a('0x142')]){if(_0x9f639a('0x300')==='NtrQm'){function _0x2f46b0(){const _0x2f41f5=_0x9f639a;this[_0x2f41f5('0x1e9')](_0x7fdfad);}}else this[_0x9f639a('0x3a4')][_0x9f639a('0x1')]['setBalloonPose'](_0x453f20,this[_0x9f639a('0xce')]);}},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x403')]=Sprite_Balloon[_0x34cbd8('0x29d')]['updatePosition'],Sprite_Balloon['prototype'][_0x34cbd8('0x217')]=function(){const _0x413284=_0x34cbd8;VisuMZ['EventsMoveCore']['Sprite_Balloon_updatePosition'][_0x413284('0x6a')](this),this[_0x413284('0x326')]();},Sprite_Balloon['prototype']['updateVS8BalloonOffsets']=function(){const _0x289587=_0x34cbd8;this[_0x289587('0x3a4')][_0x289587('0x1')]['isSpriteVS8dir']()&&(this['x']+=VisuMZ[_0x289587('0x219')]['Settings'][_0x289587('0x159')][_0x289587('0x208')],this['y']+=VisuMZ[_0x289587('0x219')][_0x289587('0x29')][_0x289587('0x159')][_0x289587('0x95')]);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x390')]=Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x210')],Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x210')]=function(){const _0x3f7439=_0x34cbd8;VisuMZ[_0x3f7439('0x219')][_0x3f7439('0x390')][_0x3f7439('0x6a')](this),this[_0x3f7439('0x48')]();},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x46')]=Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x198')],Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x198')]=function(){const _0x4e1824=_0x34cbd8;VisuMZ[_0x4e1824('0x219')]['Spriteset_Map_createShadow'][_0x4e1824('0x6a')](this),this[_0x4e1824('0x318')]();},Spriteset_Map['prototype'][_0x34cbd8('0x318')]=function(){const _0x4cc626=_0x34cbd8;if(!VisuMZ[_0x4cc626('0x219')][_0x4cc626('0x29')][_0x4cc626('0x1f3')]['ShowShadows'])return;for(const _0x2ffcde of this[_0x4cc626('0x131')]){if(_0x4cc626('0x180')!==_0x4cc626('0x180')){function _0x4d7a2c(){const _0x2c6b6a=_0x4cc626,_0x275e1b=_0x3bd4c2[_0x2c6b6a('0x219')][_0x2c6b6a('0x29')][_0x2c6b6a('0x1f3')],_0x4b6eb1=this[_0x2c6b6a('0x1')]['direction']();if([0x1,0x4,0x7][_0x2c6b6a('0x1e5')](_0x4b6eb1))this[_0x2c6b6a('0x3bb')]=_0x275e1b[_0x2c6b6a('0x38e')];if([0x3,0x6,0x9][_0x2c6b6a('0x1e5')](_0x4b6eb1))this[_0x2c6b6a('0x3bb')]=_0x275e1b['TiltRight'];[0x2,0x8][_0x2c6b6a('0x1e5')](_0x4b6eb1)&&(this[_0x2c6b6a('0x3bb')]=[-_0x275e1b[_0x2c6b6a('0x110')],0x0,_0x275e1b[_0x2c6b6a('0x110')]][this[_0x2c6b6a('0x1')][_0x2c6b6a('0x422')]()]);}}else this[_0x4cc626('0x40a')](_0x2ffcde);}},Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x40a')]=function(_0x5b1d3c){const _0x52921b=_0x34cbd8;_0x5b1d3c[_0x52921b('0x5f')]=new Sprite(),_0x5b1d3c[_0x52921b('0x5f')][_0x52921b('0x273')]=_0x5b1d3c[_0x52921b('0x1')][_0x52921b('0x15a')](),_0x5b1d3c[_0x52921b('0x5f')][_0x52921b('0xee')]=ImageManager[_0x52921b('0x39d')](_0x5b1d3c['_shadowSprite'][_0x52921b('0x273')]),_0x5b1d3c[_0x52921b('0x5f')][_0x52921b('0x2b9')]['x']=0.5,_0x5b1d3c[_0x52921b('0x5f')][_0x52921b('0x2b9')]['y']=0x1,_0x5b1d3c[_0x52921b('0x5f')]['z']=0x0,this[_0x52921b('0xc7')][_0x52921b('0x83')](_0x5b1d3c[_0x52921b('0x5f')]);},Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x31a')]=function(){const _0x3f5873=_0x34cbd8;if(!VisuMZ['EventsMoveCore'][_0x3f5873('0x29')][_0x3f5873('0x1f3')]['ShowShadows'])return;for(const _0xd0d71d of this[_0x3f5873('0x131')]){this[_0x3f5873('0xc7')][_0x3f5873('0x41a')](_0xd0d71d[_0x3f5873('0x5f')]);}},Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x48')]=function(){const _0x3dea59=_0x34cbd8;this[_0x3dea59('0x10e')]=[];for(const _0x572fe3 of $gameMap[_0x3dea59('0xec')]()){if(_0x3dea59('0x26b')==='vqvMt')this['createLabelWindowForTarget'](_0x572fe3);else{function _0x2e5d97(){this['_diagonalSupport']=![];}}}},Spriteset_Map[_0x34cbd8('0x29d')]['createLabelWindowForTarget']=function(_0x443755){const _0x306ba4=_0x34cbd8;if(!this[_0x306ba4('0x3de')](_0x443755))return;const _0x542737=new Window_EventLabel(_0x443755);_0x542737['z']=0x8,_0x542737['spriteId']=Sprite[_0x306ba4('0x29e')]++,this[_0x306ba4('0xc7')]['addChild'](_0x542737),this[_0x306ba4('0x10e')][_0x306ba4('0x58')](_0x542737);},Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x3de')]=function(_0x32e023){const _0x486e19=_0x34cbd8,_0x739af9=_0x32e023[_0x486e19('0x3b')]();if(_0x739af9['note']['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x739af9[_0x486e19('0x8c')]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x1fb1a6 of _0x739af9[_0x486e19('0x28a')]){let _0x5166c5='';for(const _0x234fa6 of _0x1fb1a6[_0x486e19('0x2b')]){[0x6c,0x198][_0x486e19('0x1e5')](_0x234fa6[_0x486e19('0x37c')])&&(_0x5166c5+=_0x234fa6[_0x486e19('0xf9')][0x0]);}if(_0x5166c5[_0x486e19('0x397')](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5166c5['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x34cbd8('0x29d')][_0x34cbd8('0x1a1')]=function(_0x307a99){const _0x567422=_0x34cbd8;this['_characterSprites']=this['_characterSprites']||[];const _0x35d4bd=new Sprite_Character(_0x307a99);this['_characterSprites'][_0x567422('0x58')](_0x35d4bd),this[_0x567422('0xc7')][_0x567422('0x83')](_0x35d4bd),this[_0x567422('0x40a')](_0x35d4bd),this[_0x567422('0x232')](_0x307a99),_0x35d4bd['update']();},VisuMZ['EventsMoveCore']['Game_Message_setNumberInput']=Game_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x284')],Game_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x284')]=function(_0x5cb2d5,_0x45820a){const _0x9f6c72=_0x34cbd8;this[_0x9f6c72('0x262')]=$gameTemp[_0x9f6c72('0xe1')](),VisuMZ['EventsMoveCore'][_0x9f6c72('0x17e')]['call'](this,_0x5cb2d5,_0x45820a);},VisuMZ['EventsMoveCore'][_0x34cbd8('0x16f')]=Window_NumberInput[_0x34cbd8('0x29d')]['start'],Window_NumberInput[_0x34cbd8('0x29d')][_0x34cbd8('0x106')]=function(){const _0x105994=_0x34cbd8;$gameTemp[_0x105994('0x14a')]($gameMessage[_0x105994('0x262')]),VisuMZ[_0x105994('0x219')][_0x105994('0x16f')][_0x105994('0x6a')](this),$gameTemp['clearSelfTarget']();},VisuMZ['EventsMoveCore'][_0x34cbd8('0x109')]=Window_NumberInput[_0x34cbd8('0x29d')][_0x34cbd8('0x374')],Window_NumberInput[_0x34cbd8('0x29d')][_0x34cbd8('0x374')]=function(){const _0x563096=_0x34cbd8;$gameTemp[_0x563096('0x14a')]($gameMessage[_0x563096('0x262')]),VisuMZ[_0x563096('0x219')][_0x563096('0x109')]['call'](this),$gameTemp[_0x563096('0x1d7')](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x2')]=Game_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x170')],Game_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x170')]=function(_0x41ae6b,_0x28cb40){const _0xc8251=_0x34cbd8;this['_selfTargetItemChoice']=$gameTemp[_0xc8251('0xe1')](),VisuMZ[_0xc8251('0x219')][_0xc8251('0x2')]['call'](this,_0x41ae6b,_0x28cb40);},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x22d')]=Window_EventItem[_0x34cbd8('0x29d')][_0x34cbd8('0x41e')],Window_EventItem[_0x34cbd8('0x29d')][_0x34cbd8('0x41e')]=function(){const _0x52a763=_0x34cbd8;$gameTemp[_0x52a763('0x14a')]($gameMessage[_0x52a763('0x122')]),VisuMZ[_0x52a763('0x219')][_0x52a763('0x22d')][_0x52a763('0x6a')](this),$gameTemp[_0x52a763('0x1d7')](),$gameMessage[_0x52a763('0x122')]=undefined;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x243')]=Window_EventItem['prototype'][_0x34cbd8('0x42d')],Window_EventItem['prototype']['onCancel']=function(){const _0xc65e28=_0x34cbd8;$gameTemp[_0xc65e28('0x14a')]($gameMessage[_0xc65e28('0x122')]),VisuMZ[_0xc65e28('0x219')]['Window_EventItem_onCancel'][_0xc65e28('0x6a')](this),$gameTemp['clearSelfTarget'](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x157')]=Window_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x36c')],Window_Message[_0x34cbd8('0x29d')][_0x34cbd8('0x36c')]=function(){const _0x35d4b8=_0x34cbd8;$gameMessage[_0x35d4b8('0x129')](),VisuMZ[_0x35d4b8('0x219')][_0x35d4b8('0x157')]['call'](this),$gameTemp[_0x35d4b8('0x1d7')]();},VisuMZ[_0x34cbd8('0x219')][_0x34cbd8('0x277')]=Window_ScrollText[_0x34cbd8('0x29d')][_0x34cbd8('0x36c')],Window_ScrollText[_0x34cbd8('0x29d')][_0x34cbd8('0x36c')]=function(){const _0xa80033=_0x34cbd8;$gameMessage[_0xa80033('0x129')](),VisuMZ[_0xa80033('0x219')][_0xa80033('0x277')][_0xa80033('0x6a')](this),$gameTemp[_0xa80033('0x1d7')]();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel['prototype']=Object['create'](Window_Base[_0x34cbd8('0x29d')]),Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x408')]=Window_EventLabel,Window_EventLabel[_0x34cbd8('0x29d')]['initialize']=function(_0x1f5f88){const _0x3cb18d=_0x34cbd8;this[_0x3cb18d('0x1bf')]=_0x1f5f88;const _0x56c616=new Rectangle(0x0,0x0,Graphics[_0x3cb18d('0x16b')]/0x4,this[_0x3cb18d('0x103')](0x1));Window_Base['prototype']['initialize'][_0x3cb18d('0x6a')](this,_0x56c616),this[_0x3cb18d('0x30d')](0x2),this['_text']='';},Window_EventLabel[_0x34cbd8('0x29d')]['update']=function(){const _0x460af1=_0x34cbd8;Window_Base[_0x460af1('0x29d')][_0x460af1('0x27b')][_0x460af1('0x6a')](this),this[_0x460af1('0xc0')](),this[_0x460af1('0x7')](),this['updatePosition'](),this[_0x460af1('0x4e')]();},Window_EventLabel[_0x34cbd8('0x29d')]['updateText']=function(){const _0x38eb57=_0x34cbd8;this[_0x38eb57('0x1bf')][_0x38eb57('0x3f4')]()!==this[_0x38eb57('0x391')]&&(this[_0x38eb57('0x391')]=this['_event']['labelWindowText'](),this['refresh']());},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x7')]=function(){const _0x29fbee=_0x34cbd8;this['scale']['x']=0x1/$gameScreen['zoomScale'](),this[_0x29fbee('0x156')]['y']=0x1/$gameScreen[_0x29fbee('0xd5')]();},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x217')]=function(){const _0x49af84=_0x34cbd8;if(!SceneManager['_scene'])return;if(!SceneManager['_scene'][_0x49af84('0x3a9')])return;const _0x2abdfe=SceneManager[_0x49af84('0x394')][_0x49af84('0x3a9')][_0x49af84('0xe9')](this[_0x49af84('0x1bf')]);if(!_0x2abdfe)return;this['x']=Math[_0x49af84('0x343')](this[_0x49af84('0x1bf')][_0x49af84('0x267')]()-Math[_0x49af84('0xfb')](this[_0x49af84('0x3b5')]*this['scale']['x']/0x2)),this['x']+=this[_0x49af84('0x1bf')][_0x49af84('0x112')]['offsetX'],this['y']=this[_0x49af84('0x1bf')][_0x49af84('0x42b')]()-_0x2abdfe[_0x49af84('0x24d')],this['y']+=Math[_0x49af84('0x343')]($gameSystem[_0x49af84('0x27a')]()*0.5),this['y']-=Math[_0x49af84('0x343')](this[_0x49af84('0x24d')]*this[_0x49af84('0x156')]['y']),this['y']+=this['_event']['_labelWindow'][_0x49af84('0xb0')];},Window_EventLabel['prototype'][_0x34cbd8('0x4e')]=function(){const _0xd98795=_0x34cbd8;if(this['isLabelVisible']())this[_0xd98795('0xda')]+=this['opacitySpeed']();else{if(SceneManager[_0xd98795('0x394')][_0xd98795('0x16d')]>0x0)this[_0xd98795('0xda')]=0x0;else{if(_0xd98795('0x415')!==_0xd98795('0x415')){function _0x83f6f2(){const _0x2e4469=_0xd98795;return _0x10d80c[_0x2e4469('0x219')]['Game_Vehicle_isLandOk'][_0x2e4469('0x6a')](this,_0x4ddcd4,_0x5efadb,_0xfe0ae0);}}else this['contentsOpacity']-=this[_0xd98795('0x2e5')]();}}},Window_EventLabel['prototype']['isLabelVisible']=function(){const _0x2a55a0=_0x34cbd8;if(!$gameSystem[_0x2a55a0('0x3d7')]())return![];if(this[_0x2a55a0('0x1bf')]?.[_0x2a55a0('0x17d')])return![];if(SceneManager[_0x2a55a0('0x394')][_0x2a55a0('0x16d')]>0x0)return![];const _0x6634fb=$gamePlayer['x'],_0x2cf637=$gamePlayer['y'],_0x34395e=this[_0x2a55a0('0x1bf')]['x'],_0x353eb5=this[_0x2a55a0('0x1bf')]['y'];if($gameMap[_0x2a55a0('0x1f1')](_0x6634fb,_0x2cf637,_0x34395e,_0x353eb5)>this[_0x2a55a0('0x1bf')][_0x2a55a0('0x22a')]())return![];return!![];},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x2e5')]=function(){const _0x453134=_0x34cbd8;return VisuMZ[_0x453134('0x219')][_0x453134('0x29')][_0x453134('0x42')][_0x453134('0x11b')];},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x324')]=function(){const _0x406abb=_0x34cbd8,_0x464ee4=this[_0x406abb('0x34')](this['_text']);this[_0x406abb('0x3b5')]=_0x464ee4[_0x406abb('0x3b5')]+($gameSystem[_0x406abb('0x27a')]()+this[_0x406abb('0x29b')]())*0x2,this['height']=Math[_0x406abb('0x24f')](this[_0x406abb('0x375')](),_0x464ee4[_0x406abb('0x24d')])+$gameSystem[_0x406abb('0x27a')]()*0x2,this['createContents']();},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x375')]=function(){const _0x4a95d7=_0x34cbd8;return VisuMZ['EventsMoveCore'][_0x4a95d7('0x29')][_0x4a95d7('0x42')][_0x4a95d7('0x9')];},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x155')]=function(){const _0x502f56=_0x34cbd8;Window_Base[_0x502f56('0x29d')][_0x502f56('0x155')]['call'](this),this[_0x502f56('0xc9')]['fontSize']=this['defaultFontSize']();},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x113')]=function(){const _0x41c946=_0x34cbd8;return VisuMZ[_0x41c946('0x219')][_0x41c946('0x29')][_0x41c946('0x42')]['FontSize'];},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x1b0')]=function(){const _0x304a3e=_0x34cbd8;this['resizeWindow'](),this['contents'][_0x304a3e('0x121')]();const _0x44403d=this[_0x304a3e('0x391')][_0x304a3e('0x1f2')](/[\r\n]+/);let _0xa08733=0x0;for(const _0x3e817e of _0x44403d){const _0x285b69=this[_0x304a3e('0x34')](_0x3e817e),_0x440e40=Math[_0x304a3e('0xfb')]((this[_0x304a3e('0x3e9')]-_0x285b69[_0x304a3e('0x3b5')])/0x2);this[_0x304a3e('0xf0')](_0x3e817e,_0x440e40,_0xa08733),_0xa08733+=_0x285b69['height'];}},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x1dd')]=function(_0x41d6a,_0x13069a){const _0xae695d=_0x34cbd8;_0x13069a['drawing']&&this['drawIcon'](_0x41d6a,_0x13069a['x']+0x2,_0x13069a['y']),_0x13069a['x']+=Math['min'](this[_0xae695d('0x216')](),ImageManager[_0xae695d('0x3d2')])+0x4;},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x328')]=function(_0x5b0517,_0x389f36,_0x22d658){const _0x26f915=_0x34cbd8,_0x5c7c77=ImageManager['loadSystem'](_0x26f915('0x23d')),_0x64d97b=ImageManager[_0x26f915('0x3d2')],_0x39afd0=ImageManager[_0x26f915('0x31d')],_0xa55503=_0x5b0517%0x10*_0x64d97b,_0x3e17f9=Math[_0x26f915('0xfb')](_0x5b0517/0x10)*_0x39afd0,_0x525709=Math[_0x26f915('0x11a')](this[_0x26f915('0x216')]()),_0x43b6dd=Math[_0x26f915('0x11a')](this['iconSize']());this[_0x26f915('0xc9')]['blt'](_0x5c7c77,_0xa55503,_0x3e17f9,_0x64d97b,_0x39afd0,_0x389f36,_0x22d658,_0x525709,_0x43b6dd);},Window_EventLabel[_0x34cbd8('0x29d')][_0x34cbd8('0x216')]=function(){const _0x44f1f5=_0x34cbd8;return VisuMZ[_0x44f1f5('0x219')][_0x44f1f5('0x29')][_0x44f1f5('0x42')][_0x44f1f5('0x1b2')];};
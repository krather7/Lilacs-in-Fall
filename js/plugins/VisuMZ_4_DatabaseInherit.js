//=============================================================================
// VisuStella MZ - Database Inheritance
// VisuMZ_4_DatabaseInherit.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_DatabaseInherit = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DatabaseInherit = VisuMZ.DatabaseInherit || {};
VisuMZ.DatabaseInherit.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.02] [DatabaseInherit]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Database_Inheritance_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Populating a database can be extremely time consuming regardless of how much
 * you plan for it. One of the biggest offenders to making the process so time
 * consuming is the lack of inheritance features. By default, RPG Maker MZ is
 * unable to have objects directly inherit properties from parent objects,
 * meaning that each and every database object has to be created from scratch
 * or be the result of a copy/paste template before going forward.
 * 
 * This plugin allows you to mark specific database objects with inheritance
 * notetags, making it more efficient to carry over properties. Each database
 * object is able to inherit notetags, traits, effects, parameters, and more.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Inherit properties from database objects through notetags.
 * * Carry over notetags, properties, damage formulas, parameters, enemy action
 *   patterns, traits, and effects.
 * * Define the properties you don't want inherited through plugin parameters.
 * * 64 different notetags to give you full control over what is inherited on
 *   an object to object basis.
 * * Use plugin parameters to determine how damage formulas and parameters are
 *   extended from one to another.
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
 * Understanding Inheritance
 * ============================================================================
 *
 * This section will explain how inheritance works through this plugin.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 *
 * ---
 * 
 * 1. Use notetags (mentioned in the Notetags section) to determine which
 * database object properties you want carried over to an object. The notetags
 * will determine the parent object (where the properties are coming from).
 * The child object (the target object that will receive the parent's various
 * properties) is the one with the notetag itself.
 * 
 * ---
 *
 * 2. When all database JSON data is finished loading, the inheritance starts
 * by first loading up notetags. These will include the meta data that is
 * automatically parsed through RPG Maker MZ's default parser. The note box
 * itself will then be extended by the parent object's notetags AFTER the child
 * object's notes.
 * 
 * The meta settings can be changed in the Plugin Parameters.
 *
 * ---
 * 
 * 3. Once the notetags are parsed, the parent's properties are then carried
 * over, too. These properties range from the generic prices of items, MP costs
 * of skills, to the priority settings of states. The plugin parameters will
 * determine which object properties will overwrite the child object's settings
 * or extend them. When a property is extended, it is added upon.
 * 
 * These settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 4. If there are damage formulas present, the damage formula will be extended
 * upon from the parent object to the child object additively while containing
 * their own separate subsets for the damage formula. The damage
 * formula for the child object will be added on at the end. In other words:
 * 
 *   Parent Damage Formula: a.atk * 4 - b.def * 2
 *   Child Damage Formula: a.atk * 2 - b.def * 1
 * 
 *   Parent Damage Formula + Child Damage Formula
 * 
 *   (a.atk * 4 - b.def * 2) + (a.atk * 2 - b.def * 1)
 * 
 * The extension settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 5. If a database object has parameters (weapons, armors, enemies), their
 * parameters can be inherited from a parent object and extended. By default,
 * the extension will be adding from the parent's parameter value to the child
 * object's parameter value.
 * 
 *   Parent MaxHP: 500
 *   Child MaxHP: 100
 * 
 *   Parent MaxHP + Child MaxHP
 * 
 *   (500) + (100)
 * 
 * The extension settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 6. Next, we go to Enemy Action Patterns if the objects are enemies. These
 * action patterns will be extended upon each other. The parent object's action
 * patterns will be created first while the child object's action patterns will
 * be added on afterwards. Keep this in mind as you create the the action lists
 * in case the order of the action patterns matter.
 * 
 * ---
 * 
 * 7. Traits and Effects are extended at the final step. The database objects
 * that use traits are Actors, Classes, Weapons, Armors, Skills, and States.
 * The database objects that use effects are Skills and Items. These properties
 * will not overwrite the existing ones, but instead, be added on. The parent
 * object's properties will be made first with the child properties sorted
 * after. Keep this in mind as you create the traits and effects in case the
 * order of the traits and effects matter.
 * 
 * ---
 *
 * ============================================================================
 * WARNING! Inheritance Order Matters!
 * ============================================================================
 * 
 * Due to the flexible nature of the notetags allow you to inherit objects that
 * are listed before and after an object's position in the database, you must
 * be wary of when the inheritance occurs or else you may not acquire al the
 * desired inherited properties.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 * 
 * ---
 * 
 * The plugin will go through each database object one by one, from lowest ID
 * to highest ID, and applying inheritance. This means, if a child inherits
 * properties from a parent object with a higher ID, that child will only
 * inherit the properties of the parent BEFORE inheritance is applied to the
 * parent.
 *
 * ---
 * 
 * So what does this mean? Let's use a few items as an example.
 * 
 * Item ID 5 has an original price of 400. Inherits from Item ID 20.
 * Item ID 10 has an original price of 200.
 * Item ID 20 has an original price of 100. Inherits from Item ID 10.
 * 
 * ---
 * 
 * If Item ID 5 inherits the price of Item ID 20, its price becomes 500,
 * because it's 400 + 100.
 * 
 * ---
 * 
 * This will be true even if Item ID 20 will inherit properties from elsewhere
 * because its ID is larger than the child's. For example, if Item ID 20 is to
 * inherit the price from Item ID 10, its price becomes 300. However, Item ID 5
 * will have its price remain at 500 because of 400 + 100. It does NOT become
 * 400 + 200 + 100.
 * 
 * ---
 * 
 * Order matters.
 * 
 * If you're unsure of what this means, then follow this golden rule to make
 * sure objects will always have their data inherited properly:
 * 
 *   Inherit from Lower ID's
 * 
 * Follow that and you can trace how properties are inherited.
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
 * === Everything-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Everything From: id>
 * <Inherit Everything From: id, id, id>
 *
 * <Inherit Everything From: name>
 * <Inherit Everything From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Notetag Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Notetags From: id>
 * <Inherit Notetags From: id, id, id>
 *
 * <Inherit Notetags From: name>
 * <Inherit Notetags From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Basic Property Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Properties From: id>
 * <Inherit Properties From: id, id, id>
 *
 * <Inherit Properties From: name>
 * <Inherit Properties From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit First Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Last Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Previous Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Next Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 * 
 * === Damage Formula Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Damage Formula From: id>
 * <Inherit Properties From: id, id, id>
 *
 * <Inherit Damage Formula From: name>
 * <Inherit Damage Formula From: name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Parameters Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Parameters From: id>
 * <Inherit Parameters From: id, id, id>
 *
 * <Inherit Parameters From: name>
 * <Inherit Parameters From: name, name, name>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Enemy Action Patterns-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Action Patterns From: id>
 * <Inherit Action Patterns From: id, id, id>
 *
 * <Inherit Action Patterns From: name>
 * <Inherit Action Patterns From: name, name, name>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Trait Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Traits From: id>
 * <Inherit Traits From: id, id, id>
 *
 * <Inherit Traits From: name>
 * <Inherit Traits From: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Effects Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Effects From: id>
 * <Inherit Effects From: id, id, id>
 *
 * <Inherit Effects From: name>
 * <Inherit Effects From: name, name, name>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Inheritance Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control which properties will inherit
 * in what way, and how they're extended.
 *
 * ---
 *
 * Notetags
 * 
 *   Inherit Meta Flags:
 *   - Inherit meta flags added by notetags?
 *
 * ---
 *
 * Properties
 * 
 *   JS: Overwritten:
 *   - A list of JavaScript object keys containing data that will be
 *     overwritten when inherited.
 * 
 *   JS: Extended:
 *   - A list of JavaScript object keys containing data that will be
 *     extended/added to when inherited.
 *
 * ---
 *
 * Damage Formulas
 * 
 *   Damage Format:
 *   - How are damage formulas extended?
 *   - %1 - Parent Damage Formula, %2 - Child Damage Formula
 *
 * ---
 *
 * Parameters Formulas
 * 
 *   Parameter Format:
 *   - How are parameters extended?
 *   - %1 - Parent Parameter Value, %2 - Child Parameter Value
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
 * Version 1.02: December 18, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.01: December 11, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00: December 4, 2020
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
 * @param DatabaseInherit
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Notetags
 *
 * @param MetaNotetags:eval
 * @text Inherit Meta Flags
 * @parent Notetags
 * @type boolean
 * @on Inherit Meta
 * @off Ignore Meta
 * @desc Inherit meta flags added by notetags?
 * @default true
 * 
 * @param Properties
 *
 * @param OverwriteProperties:arraystr
 * @text JS: Overwritten
 * @parent Properties
 * @type string[]
 * @desc A list of JavaScript object keys containing data that
 * will be overwritten when inherited.
 * @default ["-----General-----","scope","occasion","hitType","etypeId","","-----Skills-----","stypeId","requiredWtypeId1","requiredWtypeId2","","-----Items-----","consumable","itypeId","","-----Weapons-----","wtypeId","","-----Armors-----","atypeId","","-----Enemies-----","dropItems","","-----States-----","restriction","motion","overlay","removeAtBattleEnd","removeByRestriction","autoRemovalTiming","removeByDamage","removeByWalking","","-----Tilesets-----","flags","mode",""]
 *
 * @param ExtendedProperties:arraystr
 * @text JS: Extended
 * @parent Properties
 * @type string[]
 * @desc A list of JavaScript object keys containing data that
 * will be extended/added to when inherited.
 * @default ["-----General-----","speed","tpGain","price","","-----Skills-----","mpCost","tpCost","","-----Enemies-----","exp","gold","","-----States-----","priority","minTurns","maxTurns","chanceByDamage","stepsToRemove",""]
 * 
 * @param Damage
 * @text Damage Formulas
 *
 * @param DamageFmt:str
 * @text Damage Format
 * @parent Damage
 * @desc How are damage formulas extended?
 * %1 - Parent Damage Formula, %2 - Child Damage Formula
 * @default (%1) + (%2)
 * 
 * @param Parameters
 * @text Parameters Formulas
 *
 * @param ParameterFmt:str
 * @text Parameter Format
 * @parent Parameters
 * @desc How are parameters extended?
 * %1 - Parent Parameter Value, %2 - Child Parameter Value
 * @default (%1) + (%2)
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
//=============================================================================

const _0x25a1=['ZNoZK','ngNly','CheckLoop','length','BUkAQ','getItemIdWithName','ARRAYSTRUCT','getArmorIdWithName','prototype','params','concat','_skillIDs','toUpperCase','mlcXr','HjCba','actions','isPlaytest','includes','trim','vwuJh','vDDYX','HaZRT','qTbyg','getSkillIdWithName','match','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','getWeaponIdWithName','DamageFmt','ARRAYFUNC','ARRAYNUM','status','InheritTraits','VRjXm','max','return\x200','_classIDs','Wbrmb','ARRAYSTR','_stateIDs','getEnemyIdWithName','replace','meta','parse','InheritEffects','EVAL','InheritPrev','ZTYCv','_enemyIDs','hdsFp','getParentObjIndex','InheritDamageFormula','format','UlKxj','getStateIdWithName','vJvhP','Gyoju','VUKXE','MGTtG','BqXCY','note','_itemIDs','getActorIdWithName','tBeUa','process_VisuMZ_DatabaseInherit_Notetags','InheritActionPatterns','onDatabaseLoaded','InheritTarget','exit','YQzkD','qbEQT','parameters','Settings','SZgyb','NUM','jddDH','_weaponIDs','JSON','InheritNext','ConvertParams','_armorIDs','getClassIdWithName','DatabaseInherit','MetaNotetags','effects','Jdkju','RegExp','map','formula','description','iukIu','hMTRj','name','_tilesetIDs','orldA','log','ParameterFmt','traits','STRUCT','_actorIDs','damage','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','EFvXR','filter','Scene_Boot_onDatabaseLoaded','ARRAYJSON','InheritParameters','makeDeepCopy','process_VisuMZ_DatabaseInherit','InheritProperties','InheritLast','ExtendedProperties','InheritNotetags','InheritFirst'];(function(_0x232b16,_0x21876f){const _0x25a14d=function(_0xe6d59c){while(--_0xe6d59c){_0x232b16['push'](_0x232b16['shift']());}};_0x25a14d(++_0x21876f);}(_0x25a1,0x16a));const _0xe6d5=function(_0x232b16,_0x21876f){_0x232b16=_0x232b16-0xf6;let _0x25a14d=_0x25a1[_0x232b16];return _0x25a14d;};const _0x38e903=_0xe6d5;var label=_0x38e903(0x130),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x38e903(0x145)](function(_0x4ebd2d){const _0x3cbd87=_0x38e903;return _0x4ebd2d[_0x3cbd87(0xfd)]&&_0x4ebd2d['description'][_0x3cbd87(0x161)]('['+label+']');})[0x0];VisuMZ[label][_0x38e903(0x126)]=VisuMZ[label][_0x38e903(0x126)]||{},VisuMZ[_0x38e903(0x12d)]=function(_0x2fd0e7,_0x9df565){const _0x5bffce=_0x38e903;for(const _0x466cc4 in _0x9df565){if(_0x466cc4[_0x5bffce(0xf7)](/(.*):(.*)/i)){const _0x54b5cd=String(RegExp['$1']),_0x3b46fa=String(RegExp['$2'])[_0x5bffce(0x15c)]()[_0x5bffce(0x162)]();let _0x573d18,_0x214e1f,_0x47377c;switch(_0x3b46fa){case _0x5bffce(0x128):_0x573d18=_0x9df565[_0x466cc4]!==''?Number(_0x9df565[_0x466cc4]):0x0;break;case _0x5bffce(0xfc):_0x214e1f=_0x9df565[_0x466cc4]!==''?JSON['parse'](_0x9df565[_0x466cc4]):[],_0x573d18=_0x214e1f[_0x5bffce(0x135)](_0x36353f=>Number(_0x36353f));break;case _0x5bffce(0x10b):_0x573d18=_0x9df565[_0x466cc4]!==''?eval(_0x9df565[_0x466cc4]):null;break;case'ARRAYEVAL':_0x214e1f=_0x9df565[_0x466cc4]!==''?JSON[_0x5bffce(0x109)](_0x9df565[_0x466cc4]):[],_0x573d18=_0x214e1f[_0x5bffce(0x135)](_0x29adfd=>eval(_0x29adfd));break;case _0x5bffce(0x12b):_0x573d18=_0x9df565[_0x466cc4]!==''?JSON[_0x5bffce(0x109)](_0x9df565[_0x466cc4]):'';break;case _0x5bffce(0x147):_0x214e1f=_0x9df565[_0x466cc4]!==''?JSON[_0x5bffce(0x109)](_0x9df565[_0x466cc4]):[],_0x573d18=_0x214e1f[_0x5bffce(0x135)](_0x28717c=>JSON[_0x5bffce(0x109)](_0x28717c));break;case'FUNC':_0x573d18=_0x9df565[_0x466cc4]!==''?new Function(JSON['parse'](_0x9df565[_0x466cc4])):new Function(_0x5bffce(0x101));break;case _0x5bffce(0xfb):_0x214e1f=_0x9df565[_0x466cc4]!==''?JSON[_0x5bffce(0x109)](_0x9df565[_0x466cc4]):[],_0x573d18=_0x214e1f[_0x5bffce(0x135)](_0x34e2d9=>new Function(JSON['parse'](_0x34e2d9)));break;case'STR':_0x573d18=_0x9df565[_0x466cc4]!==''?String(_0x9df565[_0x466cc4]):'';break;case _0x5bffce(0x104):_0x214e1f=_0x9df565[_0x466cc4]!==''?JSON[_0x5bffce(0x109)](_0x9df565[_0x466cc4]):[],_0x573d18=_0x214e1f[_0x5bffce(0x135)](_0x151847=>String(_0x151847));break;case _0x5bffce(0x140):_0x47377c=_0x9df565[_0x466cc4]!==''?JSON[_0x5bffce(0x109)](_0x9df565[_0x466cc4]):{},_0x573d18=VisuMZ['ConvertParams']({},_0x47377c);break;case _0x5bffce(0x156):_0x214e1f=_0x9df565[_0x466cc4]!==''?JSON[_0x5bffce(0x109)](_0x9df565[_0x466cc4]):[],_0x573d18=_0x214e1f[_0x5bffce(0x135)](_0x490781=>VisuMZ[_0x5bffce(0x12d)]({},JSON['parse'](_0x490781)));break;default:continue;}_0x2fd0e7[_0x54b5cd]=_0x573d18;}}return _0x2fd0e7;},(_0x5ed63c=>{const _0x3c285c=_0x38e903,_0x5b835d=_0x5ed63c[_0x3c285c(0x13a)];for(const _0x15d0f2 of dependencies){if(_0x3c285c(0x144)!==_0x3c285c(0x10f)){if(!Imported[_0x15d0f2]){alert(_0x3c285c(0x143)[_0x3c285c(0x112)](_0x5b835d,_0x15d0f2)),SceneManager[_0x3c285c(0x122)]();break;}}else{function _0x54c4b7(){const _0xc3b7ea=_0x3c285c;return _0x5b79cb[_0xc3b7ea(0x106)](_0x5378fa)||_0x474f24;}}}const _0x379d51=_0x5ed63c[_0x3c285c(0x137)];if(_0x379d51[_0x3c285c(0xf7)](/\[Version[ ](.*?)\]/i)){const _0xb3d00=Number(RegExp['$1']);_0xb3d00!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3c285c(0x112)](_0x5b835d,_0xb3d00)),SceneManager[_0x3c285c(0x122)]());}if(_0x379d51[_0x3c285c(0xf7)](/\[Tier[ ](\d+)\]/i)){const _0x4f7c80=Number(RegExp['$1']);_0x4f7c80<tier?(alert(_0x3c285c(0xf8)[_0x3c285c(0x112)](_0x5b835d,_0x4f7c80,tier)),SceneManager[_0x3c285c(0x122)]()):tier=Math[_0x3c285c(0x100)](_0x4f7c80,tier);}VisuMZ[_0x3c285c(0x12d)](VisuMZ[label][_0x3c285c(0x126)],_0x5ed63c[_0x3c285c(0x125)]);})(pluginData),VisuMZ[_0x38e903(0x130)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x38e903(0x158)][_0x38e903(0x120)],Scene_Boot[_0x38e903(0x158)][_0x38e903(0x120)]=function(){const _0x33abb7=_0x38e903;this[_0x33abb7(0x14a)](),VisuMZ[_0x33abb7(0x130)][_0x33abb7(0x146)]['call'](this);},Scene_Boot[_0x38e903(0x158)][_0x38e903(0x14a)]=function(){const _0x3f51e6=_0x38e903;this[_0x3f51e6(0x11e)](!![]),this[_0x3f51e6(0x11e)](![]);},VisuMZ[_0x38e903(0x130)][_0x38e903(0x134)]={'InheritTarget':/<INHERIT (.*) FROM:[ ](.*)>/gi,'InheritFirst':/<INHERIT (?:FIRST|INITIAL) (.*)>/gi,'InheritLast':/<INHERIT (?:LAST|FINAL) (.*)>/gi,'InheritPrev':/<INHERIT (?:PREV|PREVIOUS) (.*)>/gi,'InheritNext':/<INHERIT (?:NEXT|FOLLOWING) (.*)>/gi},Scene_Boot[_0x38e903(0x158)][_0x38e903(0x11e)]=function(_0x48fe12){const _0x39e792=_0x38e903,_0xbe0dda=[$dataActors,$dataClasses,$dataSkills,$dataItems,$dataWeapons,$dataArmors,$dataEnemies,$dataStates,$dataTilesets],_0x571eb1=VisuMZ[_0x39e792(0x130)][_0x39e792(0x134)],_0x432bc2=[_0x571eb1[_0x39e792(0x121)],_0x571eb1[_0x39e792(0x14f)],_0x571eb1[_0x39e792(0x14c)],_0x571eb1['InheritPrev'],_0x571eb1[_0x39e792(0x12c)]];for(const _0x4fd1ea of _0xbe0dda){if(_0x39e792(0x129)===_0x39e792(0x129)){if(!_0x4fd1ea)continue;for(const _0x45136f of _0x4fd1ea){if(!_0x45136f)continue;const _0x2ad3b8=_0x45136f['note'];for(const _0x402445 of _0x432bc2){if(_0x39e792(0x139)!==_0x39e792(0x139)){function _0x2a101e(){const _0x64c6f3=_0x39e792;_0x172085(_0x64c6f3(0xf8)['format'](_0x3838d3,_0x486e4b,_0x2bcd88)),_0x259388[_0x64c6f3(0x122)]();}}else{const _0xe7be9e=_0x2ad3b8['match'](_0x402445);if(_0xe7be9e){if('VRjXm'===_0x39e792(0xff))for(const _0x11fab1 of _0xe7be9e){VisuMZ[_0x39e792(0x130)]['CheckLoop'](_0x11fab1,_0x402445,_0x45136f,_0x4fd1ea,_0x48fe12);}else{function _0x664c71(){const _0x4fd302=_0x39e792;_0x3f4b68['DatabaseInherit'][_0x4fd302(0x10a)](_0x34540a,_0x55b513);}}}}}}}else{function _0x3fe8c5(){const _0x2c3060=_0x39e792;_0x229ffe['DatabaseInherit'][_0x2c3060(0x14e)](_0x170f96,_0x205e06);}}}},VisuMZ[_0x38e903(0x130)]['CheckLoop']=function(_0x1ebf0d,_0x691f1d,_0x5cc46a,_0xf84b53,_0x349f3b){const _0x33d2ec=_0x38e903,_0x3ff906=VisuMZ['DatabaseInherit'][_0x33d2ec(0x134)];let _0x9bc8f6='',_0x7fd70f=[0x0];_0x1ebf0d[_0x33d2ec(0xf7)](_0x691f1d);if(_0x691f1d===_0x3ff906[_0x33d2ec(0x121)])_0x9bc8f6=String(RegExp['$1']),_0x7fd70f=String(RegExp['$2'])['split'](',');else{if(_0x691f1d===_0x3ff906[_0x33d2ec(0x14f)]){if(_0x33d2ec(0x15e)!==_0x33d2ec(0x123))_0x9bc8f6=String(RegExp['$1']),_0x7fd70f=['1'];else{function _0x5ccb26(){return _0x3328be['getSkillIdWithName'](_0x3d3fcf)||_0x35758f;}}}else{if(_0x691f1d===_0x3ff906[_0x33d2ec(0x14c)]){if('OvicD'==='OvicD')_0x9bc8f6=String(RegExp['$1']),_0x7fd70f=[_0xf84b53[_0xf84b53['length']-0x1]['id']];else{function _0x123cb6(){return _0x4776ae['getArmorIdWithName'](_0x5a4909)||_0x21da04;}}}else{if(_0x691f1d===_0x3ff906[_0x33d2ec(0x10c)])_0x9bc8f6=String(RegExp['$1']),_0x7fd70f=[_0xf84b53[_0x5cc46a['id']-0x1]['id']];else{if(_0x691f1d===_0x3ff906[_0x33d2ec(0x12c)]){if(_0x33d2ec(0x164)===_0x33d2ec(0x11d)){function _0x3a83f9(){const _0x46c662=_0x33d2ec;for(const _0x1e6584 of _0x411299){_0x5a9b0c[_0x46c662(0x130)][_0x46c662(0x152)](_0x1e6584,_0x37dc38,_0x382f8f,_0x13658b,_0x182f5c);}}}else _0x9bc8f6=String(RegExp['$1']),_0x7fd70f=[_0xf84b53[_0x5cc46a['id']+0x1]['id']];}else{if(_0x33d2ec(0x124)===_0x33d2ec(0x150)){function _0x26a7d0(){const _0x1d2f99=_0x33d2ec;return _0x2b2610[_0x1d2f99(0x12f)](_0x3c008d)||_0xb8e0a7;}}else return;}}}}}for(const _0x3d63e4 of _0x7fd70f){const _0x3dc4e0=VisuMZ['DatabaseInherit'][_0x33d2ec(0x110)](_0x3d63e4,_0xf84b53);if(_0x3dc4e0<=0x0)return;const _0x26caed=_0xf84b53[_0x3dc4e0];if(!_0x26caed)return;if(_0x26caed===_0x5cc46a)return;if(_0x349f3b){if(_0x33d2ec(0x166)!==_0x33d2ec(0x165))_0x9bc8f6[_0x33d2ec(0xf7)](/(?:NOTETAG|NOTETAGS|ALL|EVERYTHING)/i)&&VisuMZ[_0x33d2ec(0x130)][_0x33d2ec(0x14e)](_0x5cc46a,_0x26caed);else{function _0x38e78a(){const _0x4be45b=_0x33d2ec,_0x5482fc=_0xb8704f[_0x4be45b(0x112)](_0x3b5c47[_0x4be45b(0x159)][_0x3e0b43]||0x0,_0x37bd80[_0x4be45b(0x159)][_0x2fb32c]||0x0);try{_0xbcafdf[_0x4be45b(0x159)][_0x18e417]=_0x34b9f9(_0x5482fc);}catch(_0x567f2d){if(_0x300d6d[_0x4be45b(0x160)]())_0xa64b78[_0x4be45b(0x13d)](_0x567f2d);_0x160f99['params'][_0x4a9a5f]+=_0x426582['params'][_0x499b9f];}}}}else{if(_0x33d2ec(0x119)!=='TSSnS'){_0x9bc8f6[_0x33d2ec(0xf7)](/(?:PROPERTY|PROPERTIES|ALL|EVERYTHING)/i)&&VisuMZ[_0x33d2ec(0x130)][_0x33d2ec(0x14b)](_0x5cc46a,_0x26caed);if(_0x9bc8f6[_0x33d2ec(0xf7)](/(?:DAMAGE FORMULA|DAMAGEFORMULA|DAMAGE|ALL|EVERYTHING)/i)){if(_0x33d2ec(0x117)===_0x33d2ec(0x154)){function _0x448bb4(){const _0x352b93=_0x33d2ec;return _0x166df9[_0x352b93(0x11c)](_0x40b4cb)||_0x31feb6;}}else VisuMZ[_0x33d2ec(0x130)][_0x33d2ec(0x111)](_0x5cc46a,_0x26caed);}_0x9bc8f6[_0x33d2ec(0xf7)](/(?:PARAMETERS|PARAMS|STATS|ALL|EVERYTHING)/i)&&VisuMZ[_0x33d2ec(0x130)]['InheritParameters'](_0x5cc46a,_0x26caed);_0x9bc8f6[_0x33d2ec(0xf7)](/(?:ACTIONS|PATTERNS|ACTION PATTERNS|ALL|EVERYTHING)/i)&&VisuMZ[_0x33d2ec(0x130)][_0x33d2ec(0x11f)](_0x5cc46a,_0x26caed);if(_0x9bc8f6[_0x33d2ec(0xf7)](/(?:TRAIT|TRAITS|ALL|EVERYTHING)/i)){if(_0x33d2ec(0x115)!==_0x33d2ec(0x115)){function _0x88bcb2(){_0x36c41f=_0xad2f8a(_0x3fb546['$1']),_0x572208=['1'];}}else VisuMZ['DatabaseInherit'][_0x33d2ec(0xfe)](_0x5cc46a,_0x26caed);}_0x9bc8f6[_0x33d2ec(0xf7)](/(?:EFFECT|EFFECTS|ALL|EVERYTHING)/i)&&VisuMZ[_0x33d2ec(0x130)]['InheritEffects'](_0x5cc46a,_0x26caed);}else{function _0x16ab3e(){const _0x37cee1=_0x33d2ec;_0x422a9b[_0x37cee1(0x130)][_0x37cee1(0x148)](_0x2c4fb1,_0x152de9);}}}}},VisuMZ['DatabaseInherit'][_0x38e903(0x110)]=function(_0x34d9f5,_0x19b59e){const _0x32adbc=_0x38e903,_0x22d22b=Number(_0x34d9f5)||0x0;_0x34d9f5=String(_0x34d9f5);if(_0x19b59e===$dataActors)return DataManager[_0x32adbc(0x11c)](_0x34d9f5)||_0x22d22b;else{if(_0x19b59e===$dataClasses)return DataManager['getClassIdWithName'](_0x34d9f5)||_0x22d22b;else{if(_0x19b59e===$dataSkills){if(_0x32adbc(0x113)!==_0x32adbc(0x113)){function _0x1b0d0d(){_0x2a1483=_0x4061ce(_0x44d707['$1']),_0x1c18b5=[_0x3dec10[_0x379795['id']-0x1]['id']];}}else return DataManager[_0x32adbc(0xf6)](_0x34d9f5)||_0x22d22b;}else{if(_0x19b59e===$dataItems){if(_0x32adbc(0x116)===_0x32adbc(0x116))return DataManager[_0x32adbc(0x155)](_0x34d9f5)||_0x22d22b;else{function _0x54af6d(){const _0x2fb428=_0x32adbc;return _0x4b74bd[_0x2fb428(0xf9)](_0x449737)||_0x1f934e;}}}else{if(_0x19b59e===$dataWeapons)return DataManager[_0x32adbc(0xf9)](_0x34d9f5)||_0x22d22b;else{if(_0x19b59e===$dataArmors)return DataManager[_0x32adbc(0x157)](_0x34d9f5)||_0x22d22b;else{if(_0x19b59e===$dataEnemies){if('ZTYCv'!==_0x32adbc(0x10d)){function _0x2ab0ea(){const _0x52ca77=_0x32adbc;_0x198b48['match'](/(?:NOTETAG|NOTETAGS|ALL|EVERYTHING)/i)&&_0x360a3b[_0x52ca77(0x130)][_0x52ca77(0x14e)](_0x13156d,_0x579833);}}else return DataManager[_0x32adbc(0x106)](_0x34d9f5)||_0x22d22b;}else{if(_0x19b59e===$dataStates)return DataManager[_0x32adbc(0x114)](_0x34d9f5)||_0x22d22b;else return _0x19b59e===$dataTilesets?DataManager['getTilesetIdWithName'](_0x34d9f5)||_0x22d22b:_0x22d22b;}}}}}}}},VisuMZ[_0x38e903(0x130)][_0x38e903(0x14e)]=function(_0xad0c56,_0xa09a08){const _0x50ae6a=_0x38e903;if(_0xa09a08[_0x50ae6a(0x108)]&&VisuMZ[_0x50ae6a(0x130)][_0x50ae6a(0x126)][_0x50ae6a(0x131)])for(const _0x2fad54 in _0xa09a08[_0x50ae6a(0x108)]){if(_0x50ae6a(0x133)===_0x50ae6a(0x138)){function _0x2c3136(){const _0xf23d14=_0x50ae6a;_0xf6144[_0xf23d14(0x130)][_0xf23d14(0x152)](_0x243eaf,_0x220fb3,_0x327ae1,_0x2036a5,_0x1d80fc);}}else{if(_0xad0c56['meta'][_0x2fad54])continue;_0xad0c56[_0x50ae6a(0x108)][_0x2fad54]=JsonEx['makeDeepCopy'](_0xa09a08['meta'][_0x2fad54]);}}let _0x57d40b=_0xa09a08['note']||'';_0x57d40b=_0x57d40b[_0x50ae6a(0x107)](/<INHERIT (.*)(.*)>/gi,''),_0xad0c56[_0x50ae6a(0x11a)]=(_0xad0c56[_0x50ae6a(0x11a)]||'')+'\x0a'+_0x57d40b;},VisuMZ[_0x38e903(0x130)][_0x38e903(0x14b)]=function(_0x1c275d,_0x4df884){const _0x192339=_0x38e903,_0x2ab1d4=VisuMZ[_0x192339(0x130)][_0x192339(0x126)],_0x497dfc=_0x2ab1d4['OverwriteProperties'],_0x568030=_0x2ab1d4[_0x192339(0x14d)];for(const _0x3e368d of _0x497dfc){if(_0x1c275d[_0x3e368d]!==undefined&&_0x4df884[_0x3e368d]!==undefined){if(_0x192339(0x13c)!==_0x192339(0x163))_0x1c275d[_0x3e368d]=JsonEx[_0x192339(0x149)](_0x4df884[_0x3e368d]);else{function _0x24f1f4(){const _0x5c5d24=_0x192339;if(_0x3cfceb[_0x5c5d24(0x13f)]===_0xc76dc)return;if(_0x2a92fd[_0x5c5d24(0x13f)]===_0x415f9e)return;if(_0xe87e93[_0x5c5d24(0x142)]!==_0x5fea11&&_0x205f53[_0x5c5d24(0x142)]!==_0x530c3b){const _0x4d8b10=_0x3413be[_0x5c5d24(0x130)][_0x5c5d24(0x126)][_0x5c5d24(0xfa)];_0x23fc81[_0x5c5d24(0x142)]['formula']=_0x4d8b10[_0x5c5d24(0x112)](_0x36f0f1['damage'][_0x5c5d24(0x136)]||'0',_0x53e7e4['damage']['formula']||'0');}}}}}for(const _0x322180 of _0x568030){if(_0x1c275d[_0x322180]!==undefined&&_0x4df884[_0x322180]!==undefined)try{if(_0x192339(0x151)!==_0x192339(0x103))_0x1c275d[_0x322180]+=_0x4df884[_0x322180];else{function _0x4010db(){const _0x11c6ef=_0x192339;_0x3703f1[_0x11c6ef(0x130)]['InheritProperties'](_0x3d716b,_0x526e8d);}}}catch(_0x20cc96){if(_0x192339(0x15d)===_0x192339(0x15d)){if($gameTemp[_0x192339(0x160)]())console[_0x192339(0x13d)](_0x20cc96);_0x1c275d[_0x322180]=JsonEx[_0x192339(0x149)](_0x4df884[_0x322180]);}else{function _0x11a1b0(){return;}}}}},VisuMZ['DatabaseInherit']['InheritDamageFormula']=function(_0x55c277,_0xd179eb){const _0x34ec77=_0x38e903;if(_0x55c277[_0x34ec77(0x13f)]===undefined)return;if(_0xd179eb[_0x34ec77(0x13f)]===undefined)return;if(_0x55c277[_0x34ec77(0x142)]!==undefined&&_0xd179eb[_0x34ec77(0x142)]!==undefined){const _0x50250e=VisuMZ[_0x34ec77(0x130)][_0x34ec77(0x126)]['DamageFmt'];_0x55c277[_0x34ec77(0x142)][_0x34ec77(0x136)]=_0x50250e[_0x34ec77(0x112)](_0xd179eb[_0x34ec77(0x142)]['formula']||'0',_0x55c277[_0x34ec77(0x142)][_0x34ec77(0x136)]||'0');}},VisuMZ[_0x38e903(0x130)]['InheritParameters']=function(_0x3c9295,_0x39440c){const _0x380947=_0x38e903;if(_0x3c9295[_0x380947(0x13f)]===undefined)return;if(_0x39440c['traits']===undefined)return;if(_0x3c9295[_0x380947(0x159)]!==undefined&&_0x39440c[_0x380947(0x159)]!==undefined){const _0x292008=VisuMZ['DatabaseInherit'][_0x380947(0x126)][_0x380947(0x13e)],_0x28d986=_0x3c9295[_0x380947(0x159)][_0x380947(0x153)];for(let _0x1f83fa=0x0;_0x1f83fa<_0x28d986;_0x1f83fa++){const _0x4f2f0d=_0x292008[_0x380947(0x112)](_0x39440c[_0x380947(0x159)][_0x1f83fa]||0x0,_0x3c9295[_0x380947(0x159)][_0x1f83fa]||0x0);try{_0x3c9295['params'][_0x1f83fa]=eval(_0x4f2f0d);}catch(_0x1a6b7e){if($gameTemp['isPlaytest']())console[_0x380947(0x13d)](_0x1a6b7e);_0x3c9295[_0x380947(0x159)][_0x1f83fa]+=_0x39440c['params'][_0x1f83fa];}}}},VisuMZ[_0x38e903(0x130)][_0x38e903(0x11f)]=function(_0x5de223,_0x3e7979){const _0x51a857=_0x38e903;if(_0x5de223[_0x51a857(0x15f)]===undefined)return;if(_0x3e7979[_0x51a857(0x15f)]===undefined)return;_0x5de223['actions']=_0x3e7979[_0x51a857(0x15f)]['concat'](_0x5de223[_0x51a857(0x15f)]);},VisuMZ[_0x38e903(0x130)][_0x38e903(0xfe)]=function(_0x30b850,_0x4beed3){const _0x32af14=_0x38e903;if(_0x30b850[_0x32af14(0x13f)]===undefined)return;if(_0x4beed3[_0x32af14(0x13f)]===undefined)return;_0x30b850[_0x32af14(0x13f)]=_0x4beed3[_0x32af14(0x13f)][_0x32af14(0x15a)](_0x30b850['traits']);},VisuMZ[_0x38e903(0x130)][_0x38e903(0x10a)]=function(_0x3eadfb,_0x31e8c8){const _0xe8fa6a=_0x38e903;if(_0x3eadfb['effects']===undefined)return;if(_0x31e8c8[_0xe8fa6a(0x132)]===undefined)return;_0x3eadfb[_0xe8fa6a(0x132)]=_0x31e8c8[_0xe8fa6a(0x132)][_0xe8fa6a(0x15a)](_0x3eadfb['effects']);},DataManager[_0x38e903(0x11c)]=function(_0x3e09b3){const _0x41288a=_0x38e903;_0x3e09b3=_0x3e09b3[_0x41288a(0x15c)]()[_0x41288a(0x162)](),this[_0x41288a(0x141)]=this[_0x41288a(0x141)]||{};if(this[_0x41288a(0x141)][_0x3e09b3])return this[_0x41288a(0x141)][_0x3e09b3];for(const _0x23d0d7 of $dataActors){if(!_0x23d0d7)continue;this[_0x41288a(0x141)][_0x23d0d7[_0x41288a(0x13a)][_0x41288a(0x15c)]()[_0x41288a(0x162)]()]=_0x23d0d7['id'];}return this[_0x41288a(0x141)][_0x3e09b3]||0x0;},DataManager[_0x38e903(0x12f)]=function(_0x2e735a){const _0x55e8c2=_0x38e903;_0x2e735a=_0x2e735a[_0x55e8c2(0x15c)]()['trim'](),this[_0x55e8c2(0x102)]=this[_0x55e8c2(0x102)]||{};if(this[_0x55e8c2(0x102)][_0x2e735a])return this['_classIDs'][_0x2e735a];for(const _0x46c576 of $dataClasses){if(!_0x46c576)continue;let _0x58ee0e=_0x46c576[_0x55e8c2(0x13a)];_0x58ee0e=_0x58ee0e['replace'](/\x1I\[(\d+)\]/gi,''),_0x58ee0e=_0x58ee0e[_0x55e8c2(0x107)](/\\I\[(\d+)\]/gi,''),this[_0x55e8c2(0x102)][_0x58ee0e['toUpperCase']()[_0x55e8c2(0x162)]()]=_0x46c576['id'];}return this[_0x55e8c2(0x102)][_0x2e735a]||0x0;},DataManager[_0x38e903(0xf6)]=function(_0x513290){const _0x48db38=_0x38e903;_0x513290=_0x513290[_0x48db38(0x15c)]()[_0x48db38(0x162)](),this[_0x48db38(0x15b)]=this[_0x48db38(0x15b)]||{};if(this['_skillIDs'][_0x513290])return this['_skillIDs'][_0x513290];for(const _0x35a08d of $dataSkills){if(!_0x35a08d)continue;this[_0x48db38(0x15b)][_0x35a08d[_0x48db38(0x13a)]['toUpperCase']()['trim']()]=_0x35a08d['id'];}return this[_0x48db38(0x15b)][_0x513290]||0x0;},DataManager[_0x38e903(0x155)]=function(_0x4253a7){const _0x4a6510=_0x38e903;_0x4253a7=_0x4253a7[_0x4a6510(0x15c)]()['trim'](),this[_0x4a6510(0x11b)]=this['_itemIDs']||{};if(this[_0x4a6510(0x11b)][_0x4253a7])return this['_itemIDs'][_0x4253a7];for(const _0xead52c of $dataItems){if(!_0xead52c)continue;this[_0x4a6510(0x11b)][_0xead52c[_0x4a6510(0x13a)][_0x4a6510(0x15c)]()[_0x4a6510(0x162)]()]=_0xead52c['id'];}return this[_0x4a6510(0x11b)][_0x4253a7]||0x0;},DataManager[_0x38e903(0xf9)]=function(_0x287c38){const _0x2e9e35=_0x38e903;_0x287c38=_0x287c38[_0x2e9e35(0x15c)]()[_0x2e9e35(0x162)](),this[_0x2e9e35(0x12a)]=this[_0x2e9e35(0x12a)]||{};if(this['_weaponIDs'][_0x287c38])return this[_0x2e9e35(0x12a)][_0x287c38];for(const _0xf527e7 of $dataWeapons){if(_0x2e9e35(0x127)===_0x2e9e35(0x127)){if(!_0xf527e7)continue;this[_0x2e9e35(0x12a)][_0xf527e7[_0x2e9e35(0x13a)][_0x2e9e35(0x15c)]()[_0x2e9e35(0x162)]()]=_0xf527e7['id'];}else{function _0x105144(){const _0x3024c2=_0x2e9e35,_0x2a66ef=_0x5cc331[_0x3024c2(0xf7)](_0xfa01fa);if(_0x2a66ef)for(const _0x362429 of _0x2a66ef){_0x1829b5[_0x3024c2(0x130)]['CheckLoop'](_0x362429,_0xa59179,_0x22780a,_0x2f345a,_0x16766f);}}}}return this[_0x2e9e35(0x12a)][_0x287c38]||0x0;},DataManager[_0x38e903(0x157)]=function(_0x398516){const _0x51680b=_0x38e903;_0x398516=_0x398516[_0x51680b(0x15c)]()[_0x51680b(0x162)](),this[_0x51680b(0x12e)]=this[_0x51680b(0x12e)]||{};if(this[_0x51680b(0x12e)][_0x398516])return this[_0x51680b(0x12e)][_0x398516];for(const _0x6350f of $dataArmors){if(!_0x6350f)continue;this[_0x51680b(0x12e)][_0x6350f['name']['toUpperCase']()[_0x51680b(0x162)]()]=_0x6350f['id'];}return this[_0x51680b(0x12e)][_0x398516]||0x0;},DataManager[_0x38e903(0x106)]=function(_0x5b9123){const _0x59afcd=_0x38e903;_0x5b9123=_0x5b9123['toUpperCase']()[_0x59afcd(0x162)](),this[_0x59afcd(0x10e)]=this[_0x59afcd(0x10e)]||{};if(this[_0x59afcd(0x10e)][_0x5b9123])return this['_enemyIDs'][_0x5b9123];for(const _0x159810 of $dataEnemies){if(!_0x159810)continue;this[_0x59afcd(0x10e)][_0x159810[_0x59afcd(0x13a)][_0x59afcd(0x15c)]()[_0x59afcd(0x162)]()]=_0x159810['id'];}return this['_enemyIDs'][_0x5b9123]||0x0;},DataManager[_0x38e903(0x114)]=function(_0x314e5b){const _0x18cdb=_0x38e903;_0x314e5b=_0x314e5b[_0x18cdb(0x15c)]()[_0x18cdb(0x162)](),this['_stateIDs']=this[_0x18cdb(0x105)]||{};if(this[_0x18cdb(0x105)][_0x314e5b])return this[_0x18cdb(0x105)][_0x314e5b];for(const _0xffeeee of $dataStates){if(!_0xffeeee)continue;this[_0x18cdb(0x105)][_0xffeeee[_0x18cdb(0x13a)][_0x18cdb(0x15c)]()[_0x18cdb(0x162)]()]=_0xffeeee['id'];}return this[_0x18cdb(0x105)][_0x314e5b]||0x0;},DataManager['getTilesetIdWithName']=function(_0x44b35c){const _0x1f7212=_0x38e903;_0x44b35c=_0x44b35c[_0x1f7212(0x15c)]()[_0x1f7212(0x162)](),this[_0x1f7212(0x13b)]=this[_0x1f7212(0x13b)]||{};if(this[_0x1f7212(0x13b)][_0x44b35c])return this['_tilesetIDs'][_0x44b35c];for(const _0xc8f139 of $dataTilesets){if(_0x1f7212(0x118)===_0x1f7212(0x118)){if(!_0xc8f139)continue;this[_0x1f7212(0x13b)][_0xc8f139[_0x1f7212(0x13a)][_0x1f7212(0x15c)]()['trim']()]=_0xc8f139['id'];}else{function _0x36e349(){const _0x3fc8ad=_0x1f7212;if(_0x1be5fb[_0x3fc8ad(0x160)]())_0x176dd5[_0x3fc8ad(0x13d)](_0x49bfb5);_0x423593[_0x3fc8ad(0x159)][_0x776991]+=_0x409d1d[_0x3fc8ad(0x159)][_0x5f2fa5];}}}return this[_0x1f7212(0x13b)][_0x44b35c]||0x0;};
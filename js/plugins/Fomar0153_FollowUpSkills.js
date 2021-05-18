//=============================================================================
// RPG Maker MZ - Follow Up Skills - Version 1.1
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allows you to customise the HP/MP bars etc.
 * @author Fomar0153
 *
 * @help Fomar0153_FollowUpSkills.js
 *
 * Use the following notetag on skills:
 * <followup: x>
 * Will always follow up the current skill with skill x
 *
 * If you'd like a more nuanced follow up then you can enter code like this:
 * <followup: if (Math.randomInt(2) == 0){1} else {2}>
 * Which will be eval'd and parsed as an int at run time.
 * The example above has a 50% chance of following up with Attack and a 50%
 * chance of following up with Guard.
 *
 * If you would like to have a skill only have a chance of following up then you
 * could do something like:
 * <followup: if (Math.randomInt(10) == 0){1} else {0}>
 * Which would have a 10% chance of following up with Attack and 90% chance of
 * not doing a follow up skill.
 * A result of 0 will mean no follow up skill.
 *
 * Version 1.0 -> 1.1
 * Follow up skills now use the same target index as the previous skill.
 *
 */

var Fomar = Fomar || {};
Fomar.FollowUpSkills = {};

(() => {

  Fomar.FollowUpSkills.BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    Fomar.FollowUpSkills.BattleManager_startAction.call(this);
    var item = this._subject.currentAction().item();
    if (DataManager.isSkill(item) && item.meta["followup"]) {
      var skillId = parseInt(eval(item.meta["followup"]));
      if (skillId > 0) {
        var action = new Game_Action(this._subject);
        action._targetIndex = this._subject.currentAction()._targetIndex;
        action.setSkill(skillId);
        this._subject._actions.push(action);
      }
    }
  };

})();

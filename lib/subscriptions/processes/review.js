const async = require('async');
const assert = require('assert');

const MissionControl = require('../models/mission_control');
const Assignment = require('../models/assignment');

const ReviewProcess = function (args) {
  assert(args.application, 'Need an application to review');
  assert(args.db, 'Need a database instance');

  const app = args.application;
  const missionControl = new MissionControl({
    db: args.db
  });
  let assignment, mission;

  // make suere the app is valid
  this.ensureAppValid = (next) => {
    if (app.isValid()) {
      next(null, true);
    } else {
      next(app.validationMessage(), null);
    }
  };

  // find the next mission
  this.findNextMission = (next) => {
    // grab the current mission from mission control
    missionControl.currentMission((err, res) => {
      if (err) {
        next(err, null);
      } else {
        mission = res;
        next(null, mission);
      }
    });
  };

  // make sure role selected is available
  this.roleIsAvailable = (next) => {
    assignment = new Assignment({
      passenger: app,
      role: app.role,
      mission: mission
    });
    next(null, assignment.passengerIsCompatible);
  };

  this.ensureRoleCompatible = (next) => {
    // TODO: find out about roles and height/weight etc
    next(null, true);
  };

  this.approveApplication = (next) => {
    // send the assignment to disk
    db.saveAssignment({assignemnt: assignment}, next);
  };

  /**
   * Main entry point
   * @param next
   */
  this.processApplication = (next) => {
    async.series({
      validated: this.ensureAppValid,
      mission: this.findNextMission,
      roleAvailable: this.roleIsAvailable,
      roleCompatible: this.ensureRoleCompatible,
      assignment: this.approveApplication
    }, (err, result) => {
      if (err) {
        next(null, {
          success: false,
          message: err
        });
      } else {
        // console.log(result);
        result.success = true;
        result.message = 'Welcome to the Mars Program!';
        next(null, result);
      }
    })
  };

};

module.exports = ReviewProcess;

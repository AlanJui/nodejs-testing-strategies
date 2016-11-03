const async = require('async');
const assert = require('assert');

const ReviewProcess = function (args) {
  assert(args.application, 'Need an application to review');
  const app = args.application;

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
    const mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };
    next(null, mission);
  };

  // make sure role selected is available
  this.roleIsAvailable = (next) => {
    // we have no concept of role selection just yet
    // TODO: What about a role? Need more info
    // make sure height/weight/age is right for role
    next(null, true);
  };

  this.ensureRoleCompatible = (next) => {
    // TODO: find out about roles and height/weight etc
    next(null, true);
  };

  this.approveApplication = (next) => {
    next(null ,{
      success: true,
      message: 'Welcome to the Mars Program!'
    });
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
      success: this.approveApplication
    }, (err, result) => {
      if (err) {
        next(null, {
          success: false,
          message: err
        });
      } else {
        console.log(result);
        next(null, result);
      }
    })
  };

};

module.exports = ReviewProcess;

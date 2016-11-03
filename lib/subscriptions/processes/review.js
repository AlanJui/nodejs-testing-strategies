const Emitter = require('events').EventEmitter;
const util = require('util');

const ReviewProcess = function (args) {
  const self = this;
  let callback;

  // make suere the app is valid
  this.ensureAppValid = (app) => {
    if (app.isValid()) {
      self.emit('validated', app);
    } else {
      self.emit('invalid', app.validationMessage);
    }
  };

  // find the next mission
  this.findNextMission = (app) => {
    // stub this out for now
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };
    self.emit('mission-selected', app);
  };

  // make sure role selected is available
  this.roleIsAvailable = (app) => {
    // we have no concept of role selection just yet
    // TODO: What about a role? Need more info
    self.emit('role-available', app);
  };

  // make sure height/weight/age is right for role
  this.ensureRoleCompatible = (app) => {
    // TODO: find out about roles and height/weight etc
    self.emit('role-compatible', app);
  };

  // accept the app with a message
  this.acceptApplication = (app) => {
    callback(null, {
      success: true,
      message: 'Welcome to the Mars program!'
    });
  };

  // deny the app with a message
  this.denyApplication = (message) => {
    callback(null, {
      success: false,
      message: message
    });
  };

  // Main entry point
  this.processApplication = (app, next) => {
    callback = next;
    self.emit('application-received', app);
  };

  // event path
  this.on('application-received', this.ensureAppValid);
  this.on('validated', this.findNextMission);
  this.on('mission-selected', this.roleIsAvailable);
  this.on('role-available', this.ensureRoleCompatible);
  this.on('role-compatible', this.acceptApplication);

  // sad path
  this.on('invalid', this.denyApplication);
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;

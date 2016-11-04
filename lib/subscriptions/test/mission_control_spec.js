const assert = require('assert');
const moment = require('moment');

const Mission = require('../models/mission');
const MissionControl = require('../models/mission_control');

const db = require('../db');
const sinon = require('sinon');
sinon.stub(db, 'getCurrentMissionByLaunchDate').yields(null, null);
sinon.stub(db, 'createNextMission').yields(null, new Mission());
const missionControl = new MissionControl({db: db});

describe.only('Mission Control', () => {

  describe('The Current Mission', () => {
    let currentMission;

    before((done) => {
      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      });
    });

    it('is created if none exit', () => {
      assert(currentMission);
    });
  });

});

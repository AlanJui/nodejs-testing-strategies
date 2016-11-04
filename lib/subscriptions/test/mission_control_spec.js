const assert = require('assert');
const moment = require('moment');

const Mission = require('../models/mission');
const MissionControl = require('../models/mission_control');

const db = require('../db');
const sinon = require('sinon');
const missionControl = new MissionControl({db: db});

describe.only('Mission Planning', () => {

  describe('No Current Mission', () => {
    let currentMission;

    before((done) => {
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
      sinon.stub(db, 'createNextMission').yields(null, new Mission());

      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      });
    });

    it('is created if none exit', () => {
      assert(currentMission);
      assert(db.getMissionByLaunchDate.called);
      assert(db.createNextMission.called);
    });
  });

  describe('Current Mission Exists', () => {
    let currentMission;

    before((done) => {
      db.getMissionByLaunchDate.restore();
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, {id: 1000});

      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      });
    });

    it('is created if none exit', () => {
      assert.equal(currentMission.status, 'open');
      assert(db.getMissionByLaunchDate.called);
    });
  });

});

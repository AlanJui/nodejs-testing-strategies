const moment = require('moment');
const sinon = require('sinon');
const DB = require('../../db');

const MembershipApplication = require('../../models/membership_application');
const Mission = require('../../models/mission');

const validDate = moment().add(1, 'days');

exports.validApplication = new MembershipApplication({
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  age: 30,
  height: 66,
  weight: 180,
  validUntil: validDate,
  role: 'commander'
});

exports.stubDb = (args) => {
  args || (args = {});

  const mission = args.mission || new Mission();

  db = new DB();
  sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
  sinon.stub(db, 'createNextMission').yields(null, mission);

  return db;
};

const moment = require('moment');

const MembershipApplication = require('../../models/membership_application');

const validDate = moment().add(1, 'days');

exports.validApplication = new MembershipApplication({
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  age: 30,
  height: 66,
  weight: 180,
  validUntil: validDate
});

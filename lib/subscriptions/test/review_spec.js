const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe.only('The Reivew Process', () => {

  describe('Receiving a valid application', () => {
    let decision;

    before((done) => {
      const validApp = new MembershipApplication({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        age: 30,
        height: 66,
        weight: 180
      });

      let review = new ReviewProcess();
      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

  });

});

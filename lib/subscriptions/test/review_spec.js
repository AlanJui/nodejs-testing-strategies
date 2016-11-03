const assert = require('assert');
var sinon = require('sinon');

const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe.only('The Reivew Process', () => {

  describe('Receiving a valid application', () => {

    const validApp = new MembershipApplication({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });

    let decision;
    let review = new ReviewProcess();
    const spy = sinon.spy(validApp, 'emailIsValid');

    before((done) => {
      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

    it('validates email', () => {
      assert(spy.called);
    });

  });

});

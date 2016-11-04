const assert = require('assert');
const sinon = require('sinon');
const Helpers = require('./helpers');

const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe('The Reivew Process', () => {

  describe('Receiving a valid application', () => {

    const validApp = Helpers.validApplication;

    let decision;
    let review = new ReviewProcess({
      application: validApp
    });
    sinon.spy(review, 'ensureAppValid');
    sinon.spy(review, 'findNextMission');
    sinon.spy(review, 'roleIsAvailable');
    sinon.spy(review, 'ensureRoleCompatible');

    before((done) => {
      review.processApplication((err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

    it('ensures the application is valid', () => {
      assert(review.ensureAppValid.called);
    });

    it('selects a mission', () => {
      assert(review.findNextMission.called);
    });

    it('ensures a role exists', () => {
      assert(review.roleIsAvailable.called);
    });

    it('ensures role compatibility', () => {
      assert(review.ensureRoleCompatible.called);
    });

  });

});

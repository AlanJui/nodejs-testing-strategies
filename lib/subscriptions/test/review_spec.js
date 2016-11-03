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
      assert(validApp.emailIsValid.called);
    });

  });

  describe('All of event path is go through', () => {

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
    const validationSpy = sinon.spy();
    const missionSpy = sinon.spy();
    const roleAvailableSpy = sinon.spy();
    const roleCompatibleSpy = sinon.spy();

    before((done) => {
      review.on('validated', validationSpy);
      review.on('mission-selected', missionSpy);
      review.on('role-available', roleAvailableSpy);
      review.on('role-compatible', roleCompatibleSpy);

      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

    it('ensures the application is valid', () => {
      assert(validationSpy.called);
    });

    it('selects a mission', () => {
      assert(missionSpy.called);
    });

    it('ensures a role exists', () => {
      assert(roleAvailableSpy.called);
    });

    it('ensures role compatibility', () => {
      assert(roleCompatibleSpy.called);
    });

  });

});

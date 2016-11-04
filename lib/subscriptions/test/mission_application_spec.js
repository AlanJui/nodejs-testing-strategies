const assert = require('assert');
const moment = require('moment');
const Helpers = require('./helpers');

const MembershipApplication = require('../models/membership_application');

describe('Membership application requirements', () => {
  let validApp;

  before(() => {
    // arrage the data here
    validApp = Helpers.validApplication;
  });

  describe('Application valid if ...', () => {

    it('all validators successful', () => {
      assert(validApp.isValid(), 'Not valid');
    });

    // it.skip('email is 4 or mor chars and contains an @', () => {
    //   assert(validApp.emailIsValid(), 'Not valid');
    // });
    //
    // it.skip('age is between 15 and 100', () => {
    //   assert(validApp.ageIsValid(), 'Not valid');
    // });
    //
    // it.skip('height is between 60 and 75', () => {
    //   assert(validApp.heightIsValid(), 'Not valid');
    // });
    //
    // it.skip('weight is between 100 and 300', () => {
    //   assert(validApp.weightIsValid(), 'Not valid');
    // });
    //
    // it.skip('first and last name are provided', () => {
    //   assert(validApp.nameIsValid(), 'Not valid');
    // });
  });

  describe('Application ivalid if ...', () => {

    it('is expired', () => {
      // it past the validUntil date
      const app = new MembershipApplication({
        validUntil: Date.parse('2010/1/1')
      });
      assert(app.expired());
    });

    it('first name is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.nameIsValid());
    });

    it('last name is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.nameIsValid());
    });

    it('email is 4 characters of less', () => {
      const app = new MembershipApplication({email: "dd"});
      assert(!app.emailIsValid());
    });

    it('email does not contain an @', () => {
      const app = new MembershipApplication({email: "www.test.com"});
      assert(!app.emailIsValid());
    });

    it('email is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.emailIsValid());
    });

    it('age is less than 15 inches', () => {
      const app = new MembershipApplication({height: 14});
      assert(!app.ageIsValid());
    });

    it('age is more than 100 inches', () => {
      const app = new MembershipApplication({height: 101});
      assert(!app.ageIsValid());
    });

    it('age is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.ageIsValid());
    });

    it('height is less than 60 inches', () => {
      const app = new MembershipApplication({height: 10});
      assert(!app.heightIsValid());
    });

    it('height is more than 75 inches', () => {
      const app = new MembershipApplication({height: 80});
      assert(!app.heightIsValid());
    });

    it('height is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.heightIsValid());
    });

    it('weight is less than 100 inches', () => {
      const app = new MembershipApplication({height: 9});
      assert(!app.weightIsValid());
    });

    it('weight is more than 300 inches', () => {
      const app = new MembershipApplication({height: 301});
      assert(!app.weightIsValid());
    });

    it('weight is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.weightIsValid());
    });

  });
});

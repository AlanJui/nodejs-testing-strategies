const _ = require('underscore')._;
const moment = require('moment');


const MembershipApplication = function (args) {
  args || (args = {});  // 未傳入 args 時，令 args 為一「空物件」
  _.extend(this, args);

  this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, 'days');

  this.expired = () => {
    return this.validUntil.isBefore(moment());
  };

  this.nameIsValid = () => {
    return this.firstName && this.lastName;
  };

  this.emailIsValid = () => {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
  };

  this.ageIsValid = () => {
    return this.age && this.age > 15 && this.age < 100;
  };

  this.heightIsValid = () => {
    return this.height && this.height > 60 && this.height < 75;
  };

  this.weightIsValid = () => {
    return this.weight && this.weight > 100 && this.weight < 300;
  };

  this.validationMessage = () => {
    if (this.isValid()) {
      return 'Application is valid'
    } else if (!this.emailIsValid()) {
      return 'Email is invalid';
    } else if (!this.ageIsValid()) {
      return 'Age is outside our limits of 15 and 100 years';
    } else if (!this.heightIsValid()) {
      return 'Height is outside our limits of 60 and 75 inches';
    } else if (!this.weightIsValid()) {
      return 'Weight is outside our limits of 100 and 300 pounds';
    } else if (!this.nameIsValid()) {
      return 'A first and last name is required';
    } else if (this.expired()) {
      return 'This application is expired';
    }
  };

  this.isValid = () => {
    return this.emailIsValid() &&
            this.nameIsValid() &&
            this.ageIsValid() &&
            this.weightIsValid() &&
            this.heightIsValid() &&
            !this.expired();
  }

};

module.exports = MembershipApplication;

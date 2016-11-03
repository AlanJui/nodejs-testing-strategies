const assert = require('assert');
const moment = require('moment');

const MembershipApplication = require('./models/membership_application');
const ReviewProcess = require('./processes/review');

let decision;
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
  assert(decision.success, decision.message);
});



// let app = new MembershipApplication({
//   validUntil: Date.parse('2016/11/7')
// });
// // assert(!app.expired());
// assert(!app.expired(), '過期了！');
//
// app = new MembershipApplication({
//   validUntil: Date.parse('2016/10/31')
// });
// assert(app.expired(), '過期了！');
//
// app = new MembershipApplication({
//   validUntil: moment()
// });
// console.log(moment().toString());
// assert(app.expired(), '過期了！');
//
// console.log(new Date())


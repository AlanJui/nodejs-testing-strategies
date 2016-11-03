const moment = require('moment');
const MembershipApplication = require('./models/membership_application');

const assert = require('assert');


let app = new MembershipApplication({
  validUntil: Date.parse('2016/11/7')
});
// assert(!app.expired());
assert(!app.expired(), '過期了！');

app = new MembershipApplication({
  validUntil: Date.parse('2016/10/31')
});
assert(app.expired(), '過期了！');

app = new MembershipApplication({
  validUntil: moment()
});
console.log(moment().toString());
assert(app.expired(), '過期了！');

console.log(new Date())

const chai = require('chai');
const { Email } = require('../src/ValidationKeys');
const ValidationContext = require('../src/ValidationContext');
const EmailRule = require('../src/Email');

const { expect } = chai;

describe('EmailRule', () => {
  let target;
  let context;
  let rule;

  beforeEach(() => {
    target = {};
    context = new ValidationContext('email', target);
    rule = new EmailRule();
  });

  const isEmailValid = (value) => {
    target.email = value;
    rule.validate(context);
    return context.notification.isValid();
  };

  it('Valid emails', () => {
    expect(isEmailValid('user@test.com')).to.be.true;
    expect(isEmailValid('user@subdomain.test.com')).to.be.true;
    expect(isEmailValid('user@test.org')).to.be.true;
    expect(isEmailValid('user@test.net')).to.be.true;
    expect(isEmailValid('user@test.io')).to.be.true;
    expect(isEmailValid('gmail+style@gmail.com')).to.be.true;
  });

  it('Invalid emails', () => {
    expect(isEmailValid('user@com')).to.be.false;
    expect(isEmailValid('user@stest...')).to.be.false;
    expect(isEmailValid('4t3#$Ttest.org')).to.be.false;
    expect(isEmailValid('#$T#$T@test.net')).to.be.false;
  });
});

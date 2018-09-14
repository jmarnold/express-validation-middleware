const chai = require('chai');
const { MinimumLength } = require('../src/ValidationKeys');
const ValidationContext = require('../src/ValidationContext');
const MinLength = require('../src/MinLength');

const { expect } = chai;

describe('IsDefinedRule', () => {
  let target;
  let context;
  let rule;

  beforeEach(() => {
    target = {};
    context = new ValidationContext('title', target);
    rule = new MinLength(10);
  });

  it('Registers message value is too short', () => {
    target.title = '12345';
    rule.validate(context);
    const messages = context.notification.allMessages();
    expect(messages.length).to.equal(1);

    expect(messages[0].field).to.equal('title');
    expect(messages[0].token).to.equal(MinimumLength);
  });

  it('Does not register message when value is equal to the length', () => {
    target.title = '1234567890';
    rule.validate(context);
    const messages = context.notification.allMessages();
    expect(messages.length).to.equal(0);
  });

  it('Does not register message when value is greater than the length', () => {
    target.title = 'Test Test Test Test';
    rule.validate(context);
    const messages = context.notification.allMessages();
    expect(messages.length).to.equal(0);
  });
});

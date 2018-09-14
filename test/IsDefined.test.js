const chai = require('chai');
const { Required } = require('../src/ValidationKeys');
const ValidationContext = require('../src/ValidationContext');
const IsDefined = require('../src/IsDefined');

const { expect } = chai;

describe('IsDefinedRule', () => {
  let target;
  let context;
  let rule;

  beforeEach(() => {
    target = {};
    context = new ValidationContext('title', target);
    rule = new IsDefined();
  });

  it('Registers message when is not set', () => {
    rule.validate(context);
    const messages = context.notification.allMessages();
    expect(messages.length).to.equal(1);

    expect(messages[0].field).to.equal('title');
    expect(messages[0].token).to.equal(Required);
  });

  it('Does not register message when field is set', () => {
    target.title = 'Test';
    rule.validate(context);
    const messages = context.notification.allMessages();
    expect(messages.length).to.equal(0);
  });

  it('Does not register message when field is string and only whitespace', () => {
    target.title = '   ';
    rule.validate(context);
    const messages = context.notification.allMessages();
    expect(messages.length).to.equal(0);
  });
});

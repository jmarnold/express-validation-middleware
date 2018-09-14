const chai = require('chai');
const { Required } = require('../src/ValidationKeys');
const { StringToken } = require('../src/Localization');
const ValidationMessage = require('../src/ValidationMessage');

const { expect } = chai;

describe('ValidationMessage', () => {
  it('Hash is repeatable', () => {
    const context = {};
    const msg1 = new ValidationMessage('title', new StringToken('title', 'Title'), Required, context);
    const msg2 = new ValidationMessage('title', new StringToken('title', 'Title'), Required, context);
    const msg3 = new ValidationMessage('title2', new StringToken('title2', 'Title 2'), Required, context);

    expect(msg1.toHash()).to.equal(msg2.toHash());
    expect(msg1.toHash()).to.not.equal(msg3.toHash());
  });

  it('Creates the payload', () => {
    const context = {};
    const msg = new ValidationMessage('title', new StringToken('title', 'Title'), Required, context);

    const payload = msg.toPayload();
    expect(payload.field).to.equal('title');
    expect(payload.label).to.equal('Title');
    expect(payload.message).to.equal(Required.toString());
  });

  it('Simple toString()', () => {
    const msg = new ValidationMessage('title', new StringToken('title', 'Title'), Required, context);
    expect(msg.toString()).to.equal(Required.toString());
  });

  it('toString() with substitutions', () => {
    const token = new StringToken('TEST', '"{field}" is a required field');
    const msg = new ValidationMessage('title', new StringToken('title', 'Title'), token, context);
    expect(msg.toString()).to.equal('"Title" is a required field');
  });
});

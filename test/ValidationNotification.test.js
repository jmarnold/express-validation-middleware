const chai = require('chai');
const { Required, Email } = require('../src/ValidationKeys');
const { StringToken } = require('../src/Localization');
const ValidationMessage = require('../src/ValidationMessage');
const ValidationNotification = require('../src/ValidationNotification');

const { expect } = chai;

describe('ValidationNotification', () => {
  it('Registers and retrieves messages', () => {
    const context = {};
    const notification = new ValidationNotification();
    notification.registerMessage('email', Required, context);
    notification.registerMessage('email', Email, context);
    notification.registerMessage('priority', Required, context);

    const messages = notification.messagesFor('email');

    expect(messages.length).to.equal(2);
    expect(messages[0].token.key).to.equal(Required.key);
    expect(messages[1].token.key).to.equal(Email.key);
  });

  it('Registers the message with the label', () => {
    const context = {};
    const notification = new ValidationNotification();
    notification.registerMessage('title', Required, context);

    expect(notification.allMessages()[0].label.toString()).to.equal('Title');
  });

  it('Does not register the same message twice', () => {
    const notification = new ValidationNotification();
    notification.registerMessage('title', Required, {});
    notification.registerMessage('title', Required, {});

    expect(notification.allMessages().length).to.equal(1);
  });

  it('isValid (true)', () => {
    const notification = new ValidationNotification();
    expect(notification.isValid()).to.be.true;
  });

  it('isValid (false)', () => {
    const notification = new ValidationNotification();
    notification.registerMessage('title', Required, {});

    expect(notification.isValid()).to.be.false;
  });
  it('Imports the notification', () => {
    const notification = new ValidationNotification();
    notification.registerMessage('email', Required, {});

    const child = new ValidationNotification();
    child.registerMessage('email', Email, {});

    notification.importForField('email', child);

    const messages = notification.messagesFor('email');
    expect(messages.length).to.equal(2);
    expect(messages[0].token.key).to.equal(Required.key);
    expect(messages[1].token.key).to.equal(Email.key);
  });
});

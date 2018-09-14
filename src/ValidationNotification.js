const ValidationMessage = require('./ValidationMessage');
const { Provider } = require('./Localization');

class ValidationNotification {
  constructor() {
    this.messages = {};
  }

  messagesFor(field) {
    let messages = this.messages[field];
    if (typeof (messages) === 'undefined') {
      messages = [];
      this.messages[field] = messages;
    }

    return messages;
  }

  registerMessage(field, token, context) {
    const label = Provider.createLabelToken(field);
    const message = new ValidationMessage(field, label, token, context);
    let existing = null;
    this.eachMessage((msg) => {
      if (message.toHash() === msg.toHash()) {
        existing = msg;
      }
    });

    if (existing != null) return existing;

    const messages = this.messagesFor(field);
    messages.push(message);

    return message;
  }

  allMessages() {
    const messages = [];

    this.eachMessage((msg) => { messages.push(msg); });

    return messages;
  }

  eachMessage(action) {
    const keys = Object.keys(this.messages);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const values = this.messages[key];
      values.forEach((value) => {
        action(value);
      });
    }
  }

  isValid() {
    return this.allMessages().length === 0;
  }

  importForField(field, notification) {
    const current = this.messagesFor(field);
    notification.messagesFor(field).forEach(_ => current.push(_));
  }
}

module.exports = ValidationNotification;

const Notification = require('./ValidationNotification');

class ValidationContext {
  constructor(field, target, notification, store) {
    this.field = field;
    this.target = target;
    this.notification = notification || new Notification();
    this.store = store;
  }

  registerMessage(token) {
    this.notification.registerMessage(this.field, token, this.target);
  }

  get(key) {
    return this.target[key];
  }

  value() {
    return this.get(this.field);
  }

  set(key, value) {
    this.store[key] = value;
  }

  isSet(key) {
    const value = this.get(key);
    return typeof (value) !== 'undefined' && value != null && value.length !== 0;
  }

  isEmpty() {
    const value = this.value();
    if (typeof (value) === 'undefined' || !value) {
      return true;
    }

    if (typeof (value) === 'string') {
      return value.length === 0 || value.trim().length === 0;
    }

    return value === 0;
  }
}

module.exports = ValidationContext;

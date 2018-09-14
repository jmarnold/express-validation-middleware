const { Required } = require('./ValidationKeys');

class IsDefined {
  validate(context) {
    const value = context.value();
    if (typeof (value) === 'undefined') {
      context.registerMessage(Required);
    }
  }
}

module.exports = IsDefined;

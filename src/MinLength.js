const { MinimumLength } = require('./ValidationKeys');

class MinLengthRule {
  constructor(length) {
    this.length = length;
  }

  validate(context) {
    if (context.isEmpty()) {
      return;
    }

    const value = context.value();
    if (value.length < this.length) {
      context.registerMessage(MinimumLength);
    }
  }
}

module.exports = MinLengthRule;

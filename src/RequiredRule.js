const { Required } = require('./ValidationKeys');

class RequiredRule {
  validate(context) {
    if (context.isEmpty()) {
      context.registerMessage(Required);
    }
  }
}

module.exports = RequiredRule;

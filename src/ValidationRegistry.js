const IsDefined = require('./IsDefined');
const Required = require('./Required');

class PropertyExpression {
  constructor(field, label, rules) {
    this.field = field;
    this.label = label;
    this.rules = rules;
  }

  addRule(rule) {
    this.rules.push({
      field: this.field,
      label: this.label,
      rule,
    });

    return this;
  }

  isDefined() {
    return this.addRule(new IsDefined());
  }

  required() {
    return this.addRule(new Required());
  }
}

class ValidationRegistry {
  constructor() {
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push({
      rule,
    });
  }

  property(field, label) {
    return new PropertyExpression(field, label, this.rules);
  }
}

module.exports = ValidationRegistry;

const Required = require('./RequiredRule');
const Email = require('./Email');
const MinLength = require('./MinLength');

const ruleMapping = {
  required: Required,
  email: Email,
  minLength: MinLength,
};

const customKey = 'custom';

module.exports.parseRules = (schema) => {
  const rules = [];

  Object.keys(schema).forEach((field) => {
    const fieldSchema = schema[field];
    if (typeof (fieldSchema) !== 'object') {
      throw Error(`Rules must be configured as an object (${field})`);
    }

    Object.keys(fieldSchema).forEach((key) => {
      const MappedRule = ruleMapping[key];
      if (typeof (MappedRule) !== 'undefined') {
        const configuredValue = fieldSchema[key];
        rules.push({
          field,
          rule: new MappedRule(configuredValue),
        });
        return;
      }

      if (key !== customKey) {
        throw Error(`Unrecognized rule configuration: ${key}`);
      }

      const customRules = fieldSchema[key];
      if (!Array.isArray(customRules)) {
        throw Error('Value passed to custom rules must be an array');
      }

      customRules.forEach(_ => rules.push({
        field,
        rule: _,
      }));
    });
  });

  return rules;
};

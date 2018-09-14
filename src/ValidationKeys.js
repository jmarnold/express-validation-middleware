const { StringToken } = require('./Localization');

module.exports = {
  Required: new StringToken('Required', 'This field is required'),
  Email: new StringToken('Email', 'Please enter a valid email address'),
  MinimumLength: new StringToken('MinimumLength', 'Please enter at least {length} characters'),
};

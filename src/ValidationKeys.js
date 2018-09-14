const { StringToken } = require('./Localization');

module.exports = {
  Required: new StringToken('Required', 'This field is required'),
  Email: new StringToken('Email', 'Please enter a valid email address.'),
  Date: new StringToken('Date', 'Please enter a valid date (e.g., 01/01/2012).'),
  Number: new StringToken('Number', 'Please enter a valid number.'),
  MinimumLength: new StringToken('MinimumLength', 'Please enter at least {length} characters.'),
  MaximumLength: new StringToken('MaximumLength', 'Please enter no more than {{length}} characters.'),
  RangeLength: new StringToken('RangeLength', 'Please enter a value between {min} and {max} characters.'),
  MinValue: new StringToken('MinValue', 'Please enter a value less than or equal to {bounds}.'),
  MaxValue: new StringToken('MaxValue', 'Please enter a value greater than or equal to {bounds}.'),
  RegularExpression: new StringToken('RegularExpression', 'The data is in an invalid format.'),
  FieldEquality: new StringToken('FieldEquality', '{field1} must equal {field2}'),
};

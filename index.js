const { StringToken, Provider } = require('./src/Localization');

module.exports.StringToken = StringToken;
module.exports.Localization = Provider;
module.exports.Validate = require('./src/ValidationMiddleware');

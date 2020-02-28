const StringValidation = require('@mike/validations/String');
const RuntimeValidation = require('@mike/validations/Runtime');

module.exports = RuntimeValidation(
  StringValidation(
    'parsers can only parse string input'
  )
);
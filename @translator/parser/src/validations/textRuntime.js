const StringValidation = require('@core/validations/String');
const RuntimeValidation = require('@core/validations/Runtime');

module.exports = RuntimeValidation(
  StringValidation(
    'parsers can only parse string input'
  )
);
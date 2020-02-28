const StringValidation = require('@mike/validations/String');
const RuntimeValidation = require('@mike/validations/Runtime');

module.exports = RuntimeValidation(
  StringValidation(
    'lexerFactory requires a string input'
  )
);
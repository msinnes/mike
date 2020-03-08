const BooleanValidation = require('@mike/validations/Boolean');
const RuntimeValidation = require('@mike/validations/Runtime');

module.exports = RuntimeValidation(
  BooleanValidation(
    'Check functions should return a boolean value'
  )
);
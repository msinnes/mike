const BooleanValidation = require('@core/validations/Boolean');
const RuntimeValidation = require('@core/validations/Runtime');

module.exports = RuntimeValidation(
  BooleanValidation(
    'Check functions should return a boolean value'
  )
);
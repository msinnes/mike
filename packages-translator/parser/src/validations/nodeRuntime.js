const isNode = require('@mike/utils/isNode');
const Validation = require('@mike/validations/Validation');
const RuntimeValidation = require('@mike/validations/Runtime');

module.exports = RuntimeValidation(
  Validation(
    isNode,
    'Check functions should return a boolean value'
  )
);
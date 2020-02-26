const isNode = require('../../../../@core/utils/isNode');
const Validation = require('@core/validations/Validation');
const RuntimeValidation = require('@core/validations/Runtime');

module.exports = RuntimeValidation(
  Validation(
    isNode,
    'Check functions should return a boolean value'
  )
);
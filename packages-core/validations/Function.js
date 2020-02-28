const isFunction = require('@mike/utils/isFunction');

const Validation = require('./Validation');

const EXPECTED_A_FUNCTION = 'Expected a Ftring';

function FunctionValidation(message, config) {
  return Validation(isFunction, message || EXPECTED_A_FUNCTION, config);
}

module.exports = FunctionValidation;

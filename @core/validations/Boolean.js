const isBoolean = require('@core/utils/isBoolean');

const Validation = require('./Validation');

const EXPECTED_A_BOOLEAN = 'Expected a Boolean';

function BooleanValidation(message, config) {
  return Validation(isBoolean, message || EXPECTED_A_BOOLEAN, config);
}

module.exports = BooleanValidation;

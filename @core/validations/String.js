const isString = require('@core/utils/isString');

const Validation = require('./Validation');

const EXPECTED_A_STRING = 'Expected a String';

function StringValidation(message, config) {
  return Validation(isString, message || EXPECTED_A_STRING, config);
}

module.exports = StringValidation;

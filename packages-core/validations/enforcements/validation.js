const getEnforcement = require('@mike/utils/getEnforcement');
const isValidation = require('../lib/isValidation');

module.exports = getEnforcement(
  isValidation,
  'the validation must be a validation instance'
);

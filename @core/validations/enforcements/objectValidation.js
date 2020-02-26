const isObject = require('@core/utils/isObject');
const getEnforcement = require('@core/utils/getEnforcement');
const isValidation = require('../lib/isValidation');

module.exports = getEnforcement(
  v => isObject(v) && Object.keys(v).reduce((isValid, key) => {
    if (!isValidation(v[key])) {
      return false;
    }
    return isValid;
  }, true),
  'An Object Validation should be an object and all fields should be validations'
);

const getEnforcement = require('@mike/utils/getEnforcement');
const isObject = require('@mike/utils/isObject');
const isUndefined = require('@mike/utils/isUndefined');

const isValidation = require('../lib/isValidation');

module.exports = getEnforcement(
  config => isObject(config) && isValidation(config.values) && (
    isUndefined(config.keys) || isValidation(config.keys)
  ),
  'A Map Validation should be an object with keys and values validations',
);

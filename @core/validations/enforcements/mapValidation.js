const getEnforcement = require('@core/utils/getEnforcement');
const isObject = require('@core/utils/isObject');
const isUndefined = require('@core/utils/isUndefined');

const isValidation = require('../lib/isValidation');

module.exports = getEnforcement(
  config => isObject(config) && isValidation(config.values) && (
    isUndefined(config.keys) || isValidation(config.keys)
  ),
  'A Map Validation should be an object with keys and values validations',
);

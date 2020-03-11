const getEnforcement = require('@mike/utils/getEnforcement');
const isObject = require('@mike/utils/isObject');

const isType = require('../type/is');

module.exports = getEnforcement(
  value => isObject(value) && Object.keys(value).reduce((isValid, key) => {
    if (!isType(value[key])) {
      return false;
    }
    return isValid;
  }, true),
  'Expected a map of types'
);

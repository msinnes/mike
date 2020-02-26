const getEnforcement = require('@core/utils/getEnforcement');
const isObject = require('@core/utils/isObject');

const isType = require('../is/type');

module.exports = getEnforcement(
  value => isObject(value) && Object.keys(value).reduce((isValid, key) => {
    if (!isType(value[key])) {
      return false;
    }
    return isValid;
  }, true),
  'interface configs must be a map of types'
);

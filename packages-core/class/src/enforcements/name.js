const getEnforcement = require('@mike/utils/getEnforcement');
const isString = require('@mike/utils/isString');

module.exports = getEnforcement(
  value => isString(value),
  'name must be a string'
);

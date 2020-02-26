const getEnforcement = require('@core/utils/getEnforcement');
const isString = require('@core/utils/isString');

module.exports = getEnforcement(
  value => isString(value),
  'name must be a string'
);

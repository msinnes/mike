const getEnforcement = require('@core/utils/getEnforcement');
const isFunction = require('@core/utils/isFunction');

module.exports = errorText => getEnforcement(
  isFunction,
  errorText
);
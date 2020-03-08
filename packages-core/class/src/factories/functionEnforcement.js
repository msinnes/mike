const getEnforcement = require('@mike/utils/getEnforcement');
const isFunction = require('@mike/utils/isFunction');

module.exports = errorText => getEnforcement(
  isFunction,
  errorText
);
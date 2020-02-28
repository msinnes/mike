const isFunction = require('@mike/utils/isFunction');
const getEnforcement = require('@mike/utils/getEnforcement');

module.exports = getEnforcement(
  isFunction,
  'validateFn must be a function'
);

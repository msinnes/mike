const isFunction = require('@core/utils/isFunction');
const getEnforcement = require('@core/utils/getEnforcement');

module.exports = getEnforcement(
  isFunction,
  'validateFn must be a function'
);

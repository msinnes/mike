const isFunction = require('@core/utils/isFunction');
const isString = require('@core/utils/isString');
const getEnforcement = require('@core/utils/getEnforcement');

module.exports = getEnforcement(
  m => isString(m) || isFunction(m),
  'message must be a string or a function'
);

const isFunction = require('@mike/utils/isFunction');
const isString = require('@mike/utils/isString');
const getEnforcement = require('@mike/utils/getEnforcement');

module.exports = getEnforcement(
  m => isString(m) || isFunction(m),
  'message must be a string or a function'
);

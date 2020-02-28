const isArray = require('@mike/utils/isArray');
const isFunction = require('@mike/utils/isFunction');
const isNode = require('@mike/utils/isNode');

module.exports = checkFn => validation => {
  if (isFunction(validation)) {
    return validation;
  } else if (isArray(validation)) {
    return value => {
      if (!isNode(value)) return false;
      return checkFn(value, validation);
    };
  }
};

const isArray = require('../../../../@core/utils/isArray');
const isFunction = require('../../../../@core/utils/isFunction');
const isNode = require('../../../../@core/utils/isNode');

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

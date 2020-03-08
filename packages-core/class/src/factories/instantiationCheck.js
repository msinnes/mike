const throwClassError = require('../lib/throwClassError');

module.exports = errorText => (instance, _constructor) => {
  if (instance && instance.constructor === _constructor.prototype.constructor) {
    throwClassError(errorText);
  }
};

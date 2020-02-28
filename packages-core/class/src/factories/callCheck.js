const throwClassError = require('../lib/throwClassError');

module.exports = errorText => (instance, _constructor) => {
  if (!(instance instanceof _constructor)) {
    throwClassError(errorText);
  }
};

const InternalError = require('@mike/errors/InternalError');

module.exports = function getLocalEnforcement(check, message) {
  return function enforcement(value) {
    if (!check(value)) {
      throw new InternalError(message);
    }
  };
};

const InternalError = require('@core/errors/InternalError');

module.exports = function getLocalEnforcement(check, message) {
  return function enforcement(value) {
    if (!check(value)) {
      throw new InternalError(message);
    }
  };
};

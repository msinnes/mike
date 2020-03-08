const isInterface = require('./is');
const throwClassError = require('../lib/throwClassError');

module.exports = (_class, message) => {
  if (!isInterface(_class)) {
    throwClassError(message);
  }
};

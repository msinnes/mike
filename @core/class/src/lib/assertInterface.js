const isInterface = require('../is/interface');
const throwClassError = require('./throwClassError');

module.exports = (_class, message) => {
  if (!isInterface(_class)) {
    throwClassError(message);
  }
};

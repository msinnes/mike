const isClass = require('../is/class');
const throwClassError = require('./throwClassError');

module.exports = (_class, message) => {
  if (!isClass(_class)) {
    throwClassError(message);
  }
};

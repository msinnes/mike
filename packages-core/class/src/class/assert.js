const isClass = require('./is');
const throwClassError = require('../lib/throwClassError');

module.exports = (_class, message) => {
  if (!isClass(_class)) {
    throwClassError(message);
  }
};

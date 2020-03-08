const throwClassError = require('./throwClassError');

module.exports = (instance, _constructor) => {
  if (instance && instance.constructor === _constructor.prototype.constructor) {
    throwClassError('Abstract classes cannot be instantiated');
  }
};

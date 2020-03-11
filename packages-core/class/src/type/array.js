const isArray = require('@mike/utils/isArray');

const BaseType = require('./base');

function ArrayType() {
  BaseType.apply(this, arguments);
  this.message = `Expected Array<${this.name}>`;
}

ArrayType.prototype = Object.create(BaseType.prototype);
ArrayType.prototype.constructor = ArrayType;

ArrayType.prototype.is = function(value) {
  return isArray(value) && value.reduce((valid, val) => {
    if (!this.checkFn(val)) return false;
    return valid;
  }, true);
};

module.exports = ArrayType;

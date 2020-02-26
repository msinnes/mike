const isNull = require('@core/utils/isNull');

function BaseType(name, checkFn, nullable = false) {
  this.name = name;
  this.message = `Expected ${this.name}`;
  this._checkFn = checkFn;
  this._nullable = nullable;
}

BaseType.prototype.is = function(value) {
  if (this._nullable && isNull(value)) {
    return true;
  }
  return this._checkFn(value);
};

module.exports = BaseType;

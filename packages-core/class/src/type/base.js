const isNull = require('@mike/utils/isNull');

function BaseType(name, checkFn) {
  this.name = name;
  this.message = `Expected ${this.name}`;
  this.checkFn = checkFn;
}

BaseType.prototype.is = function(value) {
  return this.checkFn(value);
};

BaseType.prototype.nullable = function() {
  return new NullableType(this.name, this.checkFn);
};

function NullableType() {
  BaseType.apply(this, arguments);
}

NullableType.prototype = Object.create(BaseType.prototype);
NullableType.prototype.constructor = NullableType;

NullableType.prototype.is = function(value) {
  return isNull(value) || BaseType.prototype.is.call(this, value);
};

module.exports = BaseType;

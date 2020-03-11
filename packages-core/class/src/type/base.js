const isNull = require('@mike/utils/isNull');

function BaseType(name, checkFn) {
  this.name = name;
  this.message = `Expected ${this.name}`;
  this.checkFn = checkFn;
}

BaseType.prototype.extend = function(name, checkFn) {
  const _constructor = this.constructor;
  function ExtendingType() {
    _constructor.apply(this, arguments);
  }

  ExtendingType.prototype = Object.create(_constructor.prototype);
  ExtendingType.prototype.constructor = ExtendingType;

  ExtendingType.prototype.is = function(value) {
    return this.checkFn(value) && _constructor.prototype.is.call(this, value);
  };

  return new ExtendingType(name, checkFn);
};

BaseType.prototype.is = function(value) {
  return this.checkFn(value);
};

BaseType.prototype.nullable = function() {
  const _constructor = this.constructor;
  function NullableType() {
    _constructor.apply(this, arguments);
  }

  NullableType.prototype = Object.create(_constructor.prototype);
  NullableType.prototype.constructor = NullableType;

  NullableType.prototype.is = function(value) {
    return isNull(value) || _constructor.prototype.is.call(this, value);
  };

  return new NullableType(this.name, this.checkFn);
};


module.exports = BaseType;

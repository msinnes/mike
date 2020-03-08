function BaseType(name, checkFn) {
  this.name = name;
  this.message = `Expected ${this.name}`;
  this._checkFn = checkFn;
}

BaseType.prototype.is = function(value) {
  return this._checkFn(value);
};

module.exports = BaseType;

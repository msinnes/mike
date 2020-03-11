const isObject = require('@mike/utils/isObject');

const BaseType = require('./base');

function MapType() {
  BaseType.apply(this, arguments);
  this.message = `Expected Map<${this.name}>`;
}

MapType.prototype = Object.create(BaseType.prototype);
MapType.prototype.constructor = MapType;

MapType.prototype.is = function(value) {
  return isObject(value) && Object.values(value).reduce((valid, val) => {
    if (!this.checkFn(val)) return false;
    return valid;
  }, true);
};

module.exports = MapType;

const isObject = require('@mike/utils/isObject');

const BaseType = require('./base');

function ObjectType(name, config) {
  BaseType.apply(this, arguments);
  this.message = `Expected Object ${this.name}<{\n${Object.keys(config).reduce((acc, key) => {
    acc.push(`${key}: ${config[key].name}`);
    return acc;
  }, []).join('\n')}\n}>`;

  this.checkFn = value => Object.keys(config).reduce((valid, key) => {
    if (!config[key].is(value[key])) return false;
    return valid;
  }, true);
}

ObjectType.prototype = Object.create(BaseType.prototype);
ObjectType.prototype.constructor = ObjectType;

ObjectType.prototype.is = function(value) {
  return isObject(value) && this.checkFn(value);
};

module.exports = ObjectType;

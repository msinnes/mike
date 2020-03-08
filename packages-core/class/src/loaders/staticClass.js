const BaseClass = require('../class/base');
const composeClass = require('../class/compose');
const constructorEnforcement = require('../enforcements/constructor');
const throwClassError = require('../lib/throwClassError');

module.exports = _constructor => {
  function StaticClassConstructor() {
    BaseClass.apply(this, arguments);
    throwClassError('Static classes cannot be instantiated');
  }
  constructorEnforcement(_constructor);
  Object.assign(StaticClassConstructor, _constructor);

  return composeClass(StaticClassConstructor, StaticClassConstructor, false);
};
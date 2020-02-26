const BaseClass = require('../classes/BaseClass');

const throwClassError = require('../lib/throwClassError');
const composeClass = require('../lib/composeClass');
const constructorEnforcement = require('../enforcements/constructor');

module.exports = _constructor => {
  function StaticClassConstructor() {
    BaseClass.apply(this, arguments);
    throwClassError('Static classes cannot be instantiated');
  }
  constructorEnforcement(_constructor);
  Object.assign(StaticClassConstructor, _constructor);

  return composeClass(StaticClassConstructor, StaticClassConstructor, false);
};
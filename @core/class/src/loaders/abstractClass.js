const BaseClass = require('../classes/BaseClass');
const checkAbstractClass = require('../lib/checkAbstractClass');
const composeClass = require('../lib/composeClass');
const constructorEnforcement = require('../enforcements/constructor');

module.exports = (_constructor) => {
  function ClassConstructor() {
    BaseClass.apply(this, arguments);
    checkAbstractClass(this, ClassConstructor);
    _constructor.apply(this, arguments);
  }
  constructorEnforcement(_constructor);
  return composeClass(_constructor, ClassConstructor, true);
};
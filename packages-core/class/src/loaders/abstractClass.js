const BaseClass = require('../class/base');
const composeClass = require('../class/compose');
const constructorEnforcement = require('../enforcements/constructor');
const checkAbstractClass = require('../lib/checkAbstractClass');

module.exports = (_constructor) => {
  function ClassConstructor() {
    BaseClass.apply(this, arguments);
    checkAbstractClass(this, ClassConstructor);
    _constructor.apply(this, arguments);
  }
  constructorEnforcement(_constructor);
  return composeClass(_constructor, ClassConstructor, true);
};

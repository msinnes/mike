const BaseClass = require('../class/base');
const composeClass = require('../class/compose');
const constructorEnforcement = require('../enforcements/constructor');

module.exports = (_constructor) => {
  function ClassConstructor() {
    BaseClass.apply(this, arguments);
    _constructor.apply(this, arguments);
  }
  constructorEnforcement(_constructor);
  return composeClass(_constructor, ClassConstructor, false);
};

const BaseClass = require('../class/base');
const composeClass = require('../class/compose');
const constructorEnforcement = require('../enforcements/constructor');
const runEnsure = require('../lib/runEnsure');

module.exports = (_constructor) => {
  function ClassConstructor() {
    BaseClass.apply(this, arguments);
    _constructor.apply(this, arguments);
    runEnsure(this, ClassConstructor);
  }
  constructorEnforcement(_constructor);
  return composeClass(_constructor, ClassConstructor, false);
};

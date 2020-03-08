const privateVariable = require('@mike/utils/privateVariable');

const { CLASS } = require('../constants');

const inheritancePropFactory = require('../factories/inheritanceProp');
const checkAbstractClass = require('../lib/checkAbstractClass');
const runEnsure = require('../lib/runEnsure');

module.exports = (Class, Interface, abstract = false) => {
  function iConstructor() {
    abstract && checkAbstractClass(this, iConstructor);
    Class.Class._constructor.apply(this, arguments);
    runEnsure(this, iConstructor);
  }

  iConstructor.prototype = Object.create(Class.Class._prototype);
  iConstructor.prototype.constructor = iConstructor;

  Object.assign(iConstructor, Class);

  privateVariable(iConstructor, CLASS, inheritancePropFactory(CLASS, iConstructor, {
    interface: Interface,
    super: Class.Class,
  }));

  return iConstructor;
};

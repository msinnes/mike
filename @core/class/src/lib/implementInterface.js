const privateVariable = require('@core/utils/privateVariable');

const checkAbstractClass = require('./checkAbstractClass');
const runEnsure = require('./runEnsure');

const classPropFactory = require('../factories/inheritanceProp');

module.exports = (Class, Interface, abstract = false) => {
  function iConstructor() {
    Interface.Interface._constructor.apply(this, arguments);
    abstract && checkAbstractClass(this, iConstructor);
    Class.Class._constructor.apply(this, arguments);
    runEnsure(this, iConstructor);
  }

  iConstructor.prototype = Object.create(Interface.Interface._prototype);
  Object.assign(iConstructor.prototype, Class.Class._prototype);
  iConstructor.prototype.constructor = iConstructor;

  Object.assign(iConstructor, Interface);
  Object.assign(iConstructor, Class);

  privateVariable(iConstructor, 'Class', classPropFactory(iConstructor, {
    _implements: Interface,
    _super: Class.Class._super,
  }));

  return iConstructor;
};

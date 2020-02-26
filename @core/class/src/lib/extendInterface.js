const privateVariable = require('@core/utils/privateVariable');
const classPropFactory = require('../factories/inheritanceProp');
const checkInterface = require('./checkInterface');

module.exports = (iChild, iSuper) => {
  function ExtendedInterfaceConstructor() {
    iSuper.call(this, arguments);
    checkInterface(this, ExtendedInterfaceConstructor);
    iChild.call(this, arguments);
  }

  ExtendedInterfaceConstructor.prototype = Object.create(iSuper.Interface._prototype);
  Object.assign(ExtendedInterfaceConstructor.prototype, iChild.Interface._prototype);
  ExtendedInterfaceConstructor.prototype.constructor = ExtendedInterfaceConstructor;

  Object.assign(ExtendedInterfaceConstructor, iSuper);
  Object.assign(ExtendedInterfaceConstructor, iChild);

  privateVariable(ExtendedInterfaceConstructor, 'Interface', classPropFactory(ExtendedInterfaceConstructor, {
    _super: iSuper.Interface,
  }));

  return ExtendedInterfaceConstructor;
};
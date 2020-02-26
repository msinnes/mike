const privateVariables = require('@core/utils/privateVariables');

const extendClass = require('./extendClass');
const extendsClass = require('./extendsClass');
const implementInterface = require('./implementInterface');
const implementsInterface = require('./implementsInterface');
const assertClass = require('./assertClass');
const assertInterface = require('./assertInterface');

const getAssertClassMessage = method => `Class.${method} can only take a class as an argument.`;

const EXTEND_MESSAGE = getAssertClassMessage('extend');
const EXTENDS_MESSAGE = getAssertClassMessage('extends');

const getAssertInterfaceMessage = method => `Class.${method} can only take an interface as an argument.`;

const IMPLEMENT_MESSAGE = getAssertInterfaceMessage('implement');
const IMPLEMENTS_MESSAGE = getAssertInterfaceMessage('implements');

const BaseClass = require('../classes/BaseClass');
const inheritancePropFactory = require('../factories/inheritanceProp');

const getImplementPrivates = (ClassConstructor, abstract) => ({
  implement: function(Interface) {
    assertInterface(Interface, IMPLEMENT_MESSAGE);
    const ImplementedClass = implementInterface(ClassConstructor, Interface, abstract);

    const extendPrivates = getExtendPrivates(ImplementedClass, abstract);
    const implementPrivates = getImplementPrivates(ImplementedClass, abstract);

    privateVariables(ImplementedClass, {
      ...extendPrivates,
      ...implementPrivates,
    });

    return ImplementedClass;
  },
  implements: function(Interface) {
    assertInterface(Interface, IMPLEMENTS_MESSAGE);
    return implementsInterface(ClassConstructor, Interface);
  },
});

const getExtendPrivates = (ClassConstructor, abstract) => ({
  extend: function(SuperClass) {
    assertClass(SuperClass, EXTEND_MESSAGE);
    const ExtendedClass = extendClass(ClassConstructor, SuperClass, abstract);

    const extendPrivates = getExtendPrivates(ExtendedClass, abstract);
    const implementPrivates = getImplementPrivates(ExtendedClass, abstract);

    privateVariables(ExtendedClass, {
      extends: extendPrivates.extends,
      ...implementPrivates,
    });
    return ExtendedClass;
  },
  extends: function(SuperClass) {
    assertClass(SuperClass, EXTENDS_MESSAGE);
    return extendsClass(ClassConstructor, SuperClass);
  },
});

module.exports = (_constructor, ClassConstructor, abstract) => {
  ClassConstructor.prototype = Object.create(BaseClass.prototype);
  Object.assign(ClassConstructor.prototype, _constructor.prototype);
  ClassConstructor.prototype.constructor = ClassConstructor;
  Object.assign(ClassConstructor, _constructor);

  const privates = {
    ...getExtendPrivates(ClassConstructor, abstract),
    ...getImplementPrivates(ClassConstructor, abstract),
    Class: inheritancePropFactory(ClassConstructor, {
      _super: BaseClass.Class,
    }),
  };
  privateVariables(ClassConstructor, privates);
  return ClassConstructor;
};

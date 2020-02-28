const privateVariables = require('@mike/utils/privateVariables');

const assertClass = require('./assert');
const BaseClass = require('./base');
const extendClass = require('./extend');
const extendsClass = require('./extends');

const getAssertClassMessage = method => `Class.${method} can only take a class as an argument.`;

const EXTEND_MESSAGE = getAssertClassMessage('extend');
const EXTENDS_MESSAGE = getAssertClassMessage('extends');

const inheritancePropFactory = require('../factories/inheritanceProp');

const getExtendPrivates = (ClassConstructor, abstract) => ({
  extend: function(SuperClass) {
    assertClass(SuperClass, EXTEND_MESSAGE);
    const ExtendedClass = extendClass(ClassConstructor, SuperClass, abstract);

    const extendPrivates = getExtendPrivates(ExtendedClass, abstract);

    privateVariables(ExtendedClass, {
      extends: extendPrivates.extends,
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
    Class: inheritancePropFactory(ClassConstructor, {
      super: BaseClass.Class,
    }),
  };
  privateVariables(ClassConstructor, privates);
  return ClassConstructor;
};

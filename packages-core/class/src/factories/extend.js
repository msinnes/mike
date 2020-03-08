const privateVariable = require('@mike/utils/privateVariable');

const inheritancePropFactory = require('../factories/inheritanceProp');

module.exports = (type, constructorFn) => (Child, Super, abstract) => {
  const NewConstructor = constructorFn(Child, Super, abstract);

  NewConstructor.prototype = Object.create(Super[type]._prototype);
  Object.assign(NewConstructor.prototype, Child[type]._prototype);
  NewConstructor.prototype.constructor = NewConstructor;

  Object.assign(NewConstructor, Super);
  Object.assign(NewConstructor, Child);

  privateVariable(NewConstructor, type, inheritancePropFactory(type, NewConstructor, {
    super: Super[type],
  }));

  return NewConstructor;
};
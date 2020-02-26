const privateVariable = require('@core/utils/privateVariable');
const classPropFactory = require('../factories/inheritanceProp');
const checkAbstractClass = require('./checkAbstractClass');
const runEnsure = require('./runEnsure');

module.exports = (ChildClass, SuperClass, abstract) => {
  function NewConstructor() {
    SuperClass.Class._constructor.apply(this, arguments);
    abstract && checkAbstractClass(this, NewConstructor);
    ChildClass.Class._constructor.apply(this, arguments);
    runEnsure(this, NewConstructor);
  }

  NewConstructor.prototype = Object.create(SuperClass.Class._prototype);
  Object.assign(NewConstructor.prototype, ChildClass.Class._prototype);
  NewConstructor.prototype.constructor = NewConstructor;

  Object.assign(NewConstructor, SuperClass);
  Object.assign(NewConstructor, ChildClass);

  privateVariable(NewConstructor, 'Class', classPropFactory(NewConstructor, {
    _super: SuperClass.Class,
  }));

  return NewConstructor;
};

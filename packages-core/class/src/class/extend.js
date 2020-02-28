const privateVariable = require('@mike/utils/privateVariable');

const classPropFactory = require('../factories/inheritanceProp');
const checkAbstractClass = require('../lib/checkAbstractClass');

module.exports = (ChildClass, SuperClass, abstract) => {
  function NewConstructor() {
    SuperClass.Class.constructor.apply(this, arguments);
    abstract && checkAbstractClass(this, NewConstructor);
    ChildClass.Class.constructor.apply(this, arguments);
  }

  NewConstructor.prototype = Object.create(SuperClass.Class.prototype);
  Object.assign(NewConstructor.prototype, ChildClass.Class.prototype);
  NewConstructor.prototype.constructor = NewConstructor;

  Object.assign(NewConstructor, SuperClass);
  Object.assign(NewConstructor, ChildClass);

  privateVariable(NewConstructor, 'Class', classPropFactory(NewConstructor, {
    super: SuperClass.Class,
  }));

  return NewConstructor;
};

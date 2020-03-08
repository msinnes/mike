const { CLASS } = require('../constants');

const extendFactory = require('../factories/extend');
const checkAbstractClass = require('../lib/checkAbstractClass');


module.exports = extendFactory(CLASS, (Child, Super, abstract) => {
  function NewConstructor() {
    Super.Class._constructor.apply(this, arguments);
    abstract && checkAbstractClass(this, NewConstructor);
    Child.Class._constructor.apply(this, arguments);
  }
  return NewConstructor;
});

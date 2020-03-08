const { CLASS } = require('../constants');

const extendFactory = require('../factories/extend');
const checkAbstractClass = require('../lib/checkAbstractClass');
const runEnsure = require('../lib/runEnsure');

module.exports = extendFactory(CLASS, (Child, Super, abstract) => {
  function NewConstructor() {
    Super.Class._constructor.apply(this, arguments);
    abstract && checkAbstractClass(this, NewConstructor);
    Child.Class._constructor.apply(this, arguments);
    runEnsure(this, NewConstructor);
  }
  return NewConstructor;
});

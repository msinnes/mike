const { INTERFACE } = require('../constants');

const extendFactory = require('../factories/extend');

module.exports = extendFactory(INTERFACE, (Child, Super) => {
  function NewConstructor() {
    Super.apply(this, arguments);
    Child.apply(this, arguments);
  }
  return NewConstructor;
});

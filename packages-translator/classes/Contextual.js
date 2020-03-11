const { loadAbstractClass } = require('@mike/class');

const iContextual = require('@mike/translator-interfaces/iContextual');

function Contextual() {}

Contextual.prototype.createContext = function(...args) {
  const ClassConstructor = this.ContextClass;
  return new ClassConstructor(...args);
};

module.exports = loadAbstractClass(Contextual).implement(iContextual);

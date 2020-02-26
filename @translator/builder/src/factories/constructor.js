const { loadClass } = require('@core/class');
const BaseAstNode = require('@shared/classes/BaseAstNode');

module.exports = (name, properties, validations = {}) => {
  function AstNode(...args) {
    properties.forEach((prop, index) => {
      const value = args[index + 1];
      const validation = validations[prop];
      if(validation && !validation(value)) {
        throw new Error(`The property ${prop} on ${name} expected something else`);
      }
      this[prop] = value;
    });
  }

  return loadClass(AstNode).extend(BaseAstNode);
};

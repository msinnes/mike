const nodeRuntimeValidation = require('../validations/nodeRuntime');

module.exports = (syntaxRule, context) => () => {
  const node = syntaxRule(context);
  nodeRuntimeValidation.validate(node);
  return node;
};

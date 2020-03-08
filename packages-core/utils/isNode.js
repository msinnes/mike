const BaseAstNode = require('@mike/translator-classes/BaseAstNode');

const isNode = node => node instanceof BaseAstNode;

// TODO: this does not need to traverse the entire list if the node fails validation.
// Is that really a value added since it should be considered a fatal error?
module.exports = node => isNode(node) || (Array.isArray(node) && node.reduce((acc, node) => {
  if (!isNode(node)) {
    acc = false;
  }
  return acc;
}, true));
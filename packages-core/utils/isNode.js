const AstNode = require('@mike/translator-classes/AstNode');

const isNode = node => node instanceof AstNode;

// TODO: this should be in the translator packages
// TODO: this does not need to traverse the entire list if the node fails validation.
// Is that really a value added since it should be considered a fatal error?
module.exports = node => isNode(node) || (Array.isArray(node) && node.reduce((acc, node) => {
  if (!isNode(node)) {
    acc = false;
  }
  return acc;
}, true));

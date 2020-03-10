const isArray = require('@mike/utils/isArray');
const isNode = require('@mike/utils/isNode');

module.exports = visitors => {
  return function visit(node, ctx = {}) {
    let resolvedValues = {};
    Object.keys(node).forEach(key => {
      const value = node[key];
      if (isNode(value)) {
        if(isArray(value)) {
          resolvedValues[key] = value.map(item => visit(item, ctx));
        } else {
          resolvedValues[key] = visit(value, ctx);
        }
      } else {
        resolvedValues[key] = value;
      }
    });
    const visitor = visitors[node.type];
    if(visitor) {
      return visitor(node, { ...ctx, resolvedValues });
    }
  };
};
const { loadAbstractClass } = require('@mike/class');
const isArray = require('@mike/utils/isArray');
const isNode = require('@mike/utils/isNode');

const Contextual = require('./Contextual');

const createVisitor = visitors => {
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

function Visitor(visitorConfig) {
  this.visitor = createVisitor(visitorConfig);
}

Visitor.prototype.visit = function(node) {
  const ctx = this.createContext();
  return this.visitor(node, ctx);
};

module.exports = loadAbstractClass(Visitor).extend(Contextual);

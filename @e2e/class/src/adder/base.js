const { loadAbstractClass } = require('@mike/class');

function BaseAdder() {}

BaseAdder.prototype.add = function(x, y) {
  return x + y;
};

module.exports = loadAbstractClass(BaseAdder);

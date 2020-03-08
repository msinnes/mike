const { loadAbstractClass } = require('@mike/class');

const ValueAdder = require('./value');

function OffsetAdder() {}

OffsetAdder.prototype.add = function(value) {
  const offset = this.__class__.__constructor__.offset;
  return ValueAdder.prototype.add.call(this, offset + value);
};

module.exports = loadAbstractClass(OffsetAdder).extend(ValueAdder);

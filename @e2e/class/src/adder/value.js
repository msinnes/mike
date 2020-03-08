const { loadClass } = require('@mike/class');

const BaseAdder = require('./base');

function ValueAdder(value) {
  this.value = value;
}

ValueAdder.prototype.add = function(value) {
  return BaseAdder.prototype.add.call(this, this.value, value);
};

module.exports = loadClass(ValueAdder).extend(BaseAdder);

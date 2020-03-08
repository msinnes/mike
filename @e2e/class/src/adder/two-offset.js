const { loadClass } = require('@mike/class');

const OffsetAdder = require('./offset');

function TwoOffsetAdder() {
}

TwoOffsetAdder.offset = 2;

module.exports = loadClass(TwoOffsetAdder).extend(OffsetAdder);

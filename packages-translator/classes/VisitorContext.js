const { loadAbstractClass } = require('@mike/class');

const Context = require('./Context');

function VisitorContext() {}

module.exports = loadAbstractClass(VisitorContext).extend(Context);

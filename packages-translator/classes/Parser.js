const { loadAbstractClass } = require('@mike/class');

const iParser = require('@mike/translator-interfaces/iParser');

function Parser() {}

module.exports = loadAbstractClass(Parser).implement(iParser);

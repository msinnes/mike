const { loadType } = require('@mike/class');
const Context = require('@mike/translator-classes/Context');

module.exports = loadType('Context', value => value instanceof Context);

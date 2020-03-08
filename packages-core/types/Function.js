const { loadType } = require('@mike/class');
const isFunction = require('@mike/utils/isFunction');

module.exports = loadType('Function', isFunction);

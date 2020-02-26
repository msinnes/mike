const { loadType } = require('@core/class');
// const isObject = require('@core/utils');

module.exports = loadType('Object', check => !!check && check instanceof Object &&
!(
  check instanceof Function ||
  Array.isArray(check) ||
  check instanceof Date
));

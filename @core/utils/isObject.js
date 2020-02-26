/**
 * will test if input is explicitly an object literal
 * @param {*} argument
 *
 * @returns {Boolean}
 */
module.exports = check => !!check && check instanceof Object &&
!(
  check instanceof Function ||
  Array.isArray(check) ||
  check instanceof Date
);
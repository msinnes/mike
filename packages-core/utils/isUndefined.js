/**
 * will test if input is explicitly undefined
 * @param {*} argument
 *
 * @returns {Boolean}
 */
module.exports = value => value === undefined && typeof value === 'undefined';

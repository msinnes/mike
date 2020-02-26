/**
 * will test if input is explicitly null
 * @param {*} argument
 *
 * @returns {Boolean}
 */
module.exports = value => typeof value === 'object' && value === null;
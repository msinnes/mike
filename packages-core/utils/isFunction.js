/**
 * will test if input is explicitly a function
 * @param {*} argument
 *
 * @returns {Function}
 */
module.exports = value => !!value && (value instanceof Function || typeof value === 'function');

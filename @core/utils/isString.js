/**
 * will test if input is explicitly a string
 * @param {*} argument
 *
 * @returns {Boolean}
 */
module.exports = check => check === '' || (!!check && typeof check === 'string');

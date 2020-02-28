const { loadAbstractClass } = require('@mike/class');

const iValidation = require('../interfaces/iValidation');

/**
 * An abstract Validation class
 * @constructor
 */
function BaseValidation() {}

module.exports = loadAbstractClass(BaseValidation).implement(iValidation);

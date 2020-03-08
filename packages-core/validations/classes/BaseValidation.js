const ValidationError = require('@mike/errors/ValidationError');
const { loadAbstractClass } = require('@mike/class');
const isNull = require('@mike/utils/isNull');
const isUndefined = require('@mike/utils/isUndefined');

const ValidationResult = require('../lib/ValidationResult');

const iValidation = require('../interfaces/iValidation');
/**
 * An abstract Validation class
 * @constructor
 */
function BaseValidation() {}

BaseValidation.prototype.validate = function(value) {
  if (this.allowEmpty && (isUndefined(value) || isNull(value))) {
    return new ValidationResult(true);
  }
  const [valid, result] = this.validateFn(value);
  const validationResult = new ValidationResult(valid, result);

  if (!valid && this.throwOnInvalid) {
    throw new ValidationError(validationResult.getMessage());
  }
  return validationResult;
};

module.exports = loadAbstractClass(BaseValidation).implement(iValidation);

const ValidationError = require('@core/errors/ValidationError');
const { loadClass } = require('@core/class');
const isNull = require('@core/utils/isNull');
const isUndefined = require('@core/utils/isUndefined');

const ValidationResult = require('../lib/ValidationResult');
const BaseValidation = require('./BaseValidation');

function Validation(validateFn, config = {}) {
  this._validateFn = validateFn;
  this._allowEmpty = config.allowEmpty || false;
  this._throwOnInvalid = config.throwOnInvalid || false;
}

Validation.prototype.validate = function(value) {
  if (this._allowEmpty && (isUndefined(value) || isNull(value))) {
    return new ValidationResult(true);
  }
  const [valid, result] = this._validateFn(value);
  const validationResult = new ValidationResult(valid, result);

  if (!valid && this._throwOnInvalid) {
    throw new ValidationError(validationResult.getMessage());
  }
  return validationResult;
};

module.exports = loadClass(Validation).extend(BaseValidation);

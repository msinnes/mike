const { loadAbstractClass } = require('@mike/class');
const isNull = require('@mike/utils/isNull');
const isUndefined = require('@mike/utils/isUndefined');

const Validation = require('./Validation');

const ValidationResult = require('../lib/ValidationResult');

function TypedValidation() {}

TypedValidation.prototype.validate = function(value) {
  if(this._allowEmpty && (isUndefined(value) || isNull(value))) {
    return new ValidationResult(true);
  }
  if(!this._type.is(value)) {
    return new ValidationResult(false, this._type.message);
  }
  return Validation.prototype.validate.call(this, value);
};

module.exports = loadAbstractClass(TypedValidation).extend(Validation);
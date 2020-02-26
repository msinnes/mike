const { loadAbstractClass } = require('@core/class');
const isNull = require('@core/utils/isNull');
const isUndefined = require('@core/utils/isUndefined');

const Validation = require('./Validation');

// const iTyped = require('../interfaces/iTyped');
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
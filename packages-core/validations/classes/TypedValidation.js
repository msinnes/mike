const { loadAbstractClass } = require('@mike/class');
const isNull = require('@mike/utils/isNull');
const isUndefined = require('@mike/utils/isUndefined');

const Validation = require('./Validation');

const iTyped = require('../interfaces/iTyped');
const ValidationResult = require('../lib/ValidationResult');

function TypedValidation() {}

// TODO: see if you can get away from overriding it like this
// this checks allowEmpty twice
TypedValidation.prototype.validate = function(value) {
  if(this.allowEmpty && (isUndefined(value) || isNull(value))) {
    return new ValidationResult(true);
  }
  if(!this.type.is(value)) {
    return new ValidationResult(false, this.type.message);
  }
  return Validation.prototype.validate.call(this, value);
};

module.exports = loadAbstractClass(TypedValidation).extend(Validation).implement(iTyped);
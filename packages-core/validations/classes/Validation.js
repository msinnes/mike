const { loadClass } = require('@mike/class');
const BaseValidation = require('./BaseValidation');

function Validation(validateFn, config = {}) {
  this.validateFn = validateFn;
  this.allowEmpty = config.allowEmpty || false;
  this.throwOnInvalid = config.throwOnInvalid || false;
}

module.exports = loadClass(Validation).extend(BaseValidation);

const Class = require('@mike/class');
const RuntimeError = require('@mike/errors/RuntimeError');

const Validation = require('./Validation');

function RuntimeValidation(validation) {
  this.validateFn = value => {
    const result = validation.validate(value);
    if (result.invalid) {
      throw new RuntimeError(result.data);
    }
    return [result.valid, result.data];
  };
}

module.exports = Class.loadClass(RuntimeValidation).extend(Validation);

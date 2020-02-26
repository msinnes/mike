const Class = require('@core/class');
const RuntimeError = require('@core/errors/RuntimeError');

const Validation = require('./Validation');

function RuntimeValidation(validation) {
  this._validateFn = value => {
    const result = validation.validate(value);
    if (result.invalid) {
      throw new RuntimeError(result.data);
    }
    return [result.valid, result.data];
  };
}

module.exports = Class.loadClass(RuntimeValidation).extend(Validation);

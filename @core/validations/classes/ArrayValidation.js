const Class = require('@core/class');
const ArrayType = require('@core/types/Array');

const TypedValidation = require('./TypedValidation');

function ArrayValidation(validation) {
  this._type = ArrayType;
  this._validateFn = values => {
    let valid = true;
    const results = values.map(value => {
      const result = validation.validate(value);
      if(result.invalid) {
        valid = false;
      }
      return result;
    });
    return [valid, results];
  };
}

module.exports = Class.loadClass(ArrayValidation).extend(TypedValidation);

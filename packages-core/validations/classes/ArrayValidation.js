const Class = require('@mike/class');
const ArrayType = require('@mike/types/Array');

const TypedValidation = require('./TypedValidation');

function ArrayValidation(validation) {
  this.type = ArrayType;
  this.validateFn = values => {
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

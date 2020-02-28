const Class = require('@mike/class');

const ObjectTypedValidation = require('./ObjectTypedValidation');

function ObjectValidation(objectValidationConfig = {}) {
  const validationKeys = Object.keys(objectValidationConfig);

  this._validateFn = values => {
    let valid = true;
    const results = validationKeys.reduce((acc, key) => {
      const currentValidator = objectValidationConfig[key];
      const currentValue = values[key];
      const result = acc[key] = currentValidator.validate(currentValue);

      if (result.invalid) {
        valid = false;
      }
      return acc;
    }, {});
    return [valid, results];
  };
}

module.exports = Class.loadClass(ObjectValidation).extend(ObjectTypedValidation);

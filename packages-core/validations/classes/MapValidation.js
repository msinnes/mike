const Class = require('@mike/class');

const ObjectTypedValidation = require('./ObjectTypedValidation');

function MapValidation(mapValidationConfig = {}) {
  const valuesValidation = mapValidationConfig.values;
  const keysValidation = mapValidationConfig.keys;
  this._validateFn = values => {
    let valid = true;
    const results = Object.keys(values).reduce((acc, key) => {
      let keyResult;
      if (keysValidation) {
        keyResult = keysValidation.validate(key);
      }
      const valuesResult = valuesValidation.validate(values[key]);
      if((keyResult && keyResult.invalid) || valuesResult.invalid) {
        let combinedResult = {};
        if (keyResult && keyResult.invalid) combinedResult.key = keyResult;
        if (valuesResult.invalid) combinedResult.value = valuesResult;
        acc[key] = combinedResult;
        valid = false;
      }
      return acc;
    }, {});
    return [valid, results];
  };
}

module.exports = Class.loadClass(MapValidation).extend(ObjectTypedValidation);

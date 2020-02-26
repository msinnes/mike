const ObjectValidationClass = require('./classes/ObjectValidation');

const objectValidationEnforcement = require('./enforcements/objectValidation');
const configEnforcement = require('./enforcements/config');

function ObjectValidation(validation, config) {
  objectValidationEnforcement(validation);
  configEnforcement(config);

  return new ObjectValidationClass(validation, config);
}

module.exports = ObjectValidation;

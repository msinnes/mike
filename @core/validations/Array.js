const ArrayValidationClass = require('./classes/ArrayValidation');

const validationEnforcement = require('./enforcements/validation');
const configEnforcement = require('./enforcements/config');

function ArrayValidation(validation, config) {
  validationEnforcement(validation);
  configEnforcement(config);

  return new ArrayValidationClass(validation, config);
}

module.exports = ArrayValidation;

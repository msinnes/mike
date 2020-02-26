const RuntimeValidation = require('./classes/RuntimeValidation');

const validationEnforcement = require('./enforcements/validation');

module.exports = validation => {
  validationEnforcement(validation);
  return new RuntimeValidation(validation);
};
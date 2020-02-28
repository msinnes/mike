const ArrayValidation = require('@mike/validations/Array');
const StringValidation = require('@mike/validations/String');

module.exports = (fieldName, allowEmpty = false) => ArrayValidation(
  StringValidation(`${fieldName} expected a string`),
  { allowEmpty }
);

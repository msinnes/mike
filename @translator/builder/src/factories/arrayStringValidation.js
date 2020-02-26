const ArrayValidation = require('@core/validations/Array');
const StringValidation = require('@core/validations/String');

module.exports = (fieldName, allowEmpty = false) => ArrayValidation(
  StringValidation(`${fieldName} expected a string`),
  { allowEmpty }
);

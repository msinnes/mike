const ArrayValidation = require('@mike/validations/Array');
const StringValidation = require('@mike/validations/String');

module.exports = ArrayValidation(
  StringValidation(
    'reserved keywords must be strings'
  ),
  { allowEmpty: true }
);

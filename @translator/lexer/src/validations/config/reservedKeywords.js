const ArrayValidation = require('@core/validations/Array');
const StringValidation = require('@core/validations/String');

module.exports = ArrayValidation(
  StringValidation(
    'reserved keywords must be strings'
  ),
  { allowEmpty: true }
);

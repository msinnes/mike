const ArrayValidation = require('@core/validations/Array');
const ObjectValidation = require('@core/validations/Object');
const FunctionValidation = require('@core/validations/Function');

module.exports = (fieldName, allowEmpty = false) => ArrayValidation(
  ObjectValidation({
    check: FunctionValidation(`${fieldName} must have a check function`),
    exec: FunctionValidation(`${fieldName} must have an exec function`)
  }),
  { allowEmpty }
);

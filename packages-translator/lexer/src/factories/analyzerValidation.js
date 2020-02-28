const ArrayValidation = require('@mike/validations/Array');
const ObjectValidation = require('@mike/validations/Object');
const FunctionValidation = require('@mike/validations/Function');

module.exports = (fieldName, allowEmpty = false) => ArrayValidation(
  ObjectValidation({
    check: FunctionValidation(`${fieldName} must have a check function`),
    exec: FunctionValidation(`${fieldName} must have an exec function`)
  }),
  { allowEmpty }
);

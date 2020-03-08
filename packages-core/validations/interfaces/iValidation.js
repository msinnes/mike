const { loadInterface } = require('@mike/class');

const BooleanType = require('@mike/types/Boolean');
const FunctionType = require('@mike/types/Function');

const nullableBooleanType = BooleanType.nullable();

module.exports = loadInterface({
  allowEmpty: nullableBooleanType,
  throwOnInvalid: nullableBooleanType,
  validateFn: FunctionType,
});

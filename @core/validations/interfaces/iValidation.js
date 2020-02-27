const { loadInterface } = require('@core/class');
const BooleanType = require('@core/types/Boolean');
const FunctionType = require('@core/types/Function');

module.exports = loadInterface({
  _validateFn: FunctionType,
  _allowEmpty: BooleanType,
  _throwOnInvalid: BooleanType,
  validate: FunctionType,
});

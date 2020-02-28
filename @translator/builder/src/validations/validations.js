const MapValidation = require('@mike/validations/Map');
const Validation = require('@mike/validations/Validation');
const isArray = require('@mike/utils/isArray');
const isFunction = require('@mike/utils/isFunction');
const isString = require('@mike/utils/isString');

const fieldValidation = Validation(
  value => isFunction(value) || (
    isArray(value) && value.reduce((valid, val) => isString(val) ? valid : false, true)
  ),
  'validations must be a function or an array of strings'
);

module.exports = MapValidation(
  {
    values: fieldValidation,
  },
  { allowEmpty: true }
);

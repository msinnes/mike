const MapValidation = require('@core/validations/Map');
const Validation = require('@core/validations/Validation');
const isArray = require('../../../../@core/utils/isArray');
const isFunction = require('../../../../@core/utils/isFunction');
const isString = require('../../../../@core/utils/isString');

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

const { isClass } = require('@mike/class');
const Validation = require('@mike/validations/Validation');
const Builder = require('@mike/translator-classes/Builder');

module.exports = Validation(
  value => isClass(value) && value.extends(Builder),
  'Builders must extend Builder'
);

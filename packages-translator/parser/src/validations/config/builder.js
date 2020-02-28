const { isClass } = require('@mike/class');
const Validation = require('@mike/validations/Validation');
const BaseBuilder = require('@mike/translator-classes/BaseBuilder');

module.exports = Validation(
  value => isClass(value) && value.extends(BaseBuilder),
  'Builders must extend BaseBuilder'
);

const { isClass } = require('@core/class');
const Validation = require('@core/validations/Validation');
const BaseBuilder = require('@shared/classes/BaseBuilder');

module.exports = Validation(
  value => isClass(value) && value.extends(BaseBuilder),
  'Builders must extend BaseBuilder'
);

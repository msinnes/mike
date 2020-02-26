const { isClass } = require('@core/class');
const Validation = require('@core/validations/Validation');
const BaseLexer = require('@shared/classes/BaseLexer');

module.exports = Validation(
  value => isClass(value) && value.extends(BaseLexer),
  'Lexers must extend BaseLexer'
);

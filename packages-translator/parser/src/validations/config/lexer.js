const { isClass } = require('@mike/class');
const Validation = require('@mike/validations/Validation');
const BaseLexer = require('@mike/translator-classes/BaseLexer');

module.exports = Validation(
  value => isClass(value) && value.extends(BaseLexer),
  'Lexers must extend BaseLexer'
);

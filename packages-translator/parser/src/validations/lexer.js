const { isClass } = require('@mike/class');
const Validation = require('@mike/validations/Validation');
const Lexer = require('@mike/translator-classes/Lexer');

module.exports = Validation(
  value => isClass(value) && value.extends(Lexer),
  'Lexers must extend Lexer'
);

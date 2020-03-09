const { loadType } = require('@mike/class');
const Lexer = require('@mike/translator-classes/Lexer');

// TODO: consider a loadClassType
module.exports = loadType(
  'LexerClass',
  value => !!value && !!value.extends && value.extends(Lexer)
);

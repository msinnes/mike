const parserConstructor = require('@translator/parser');

const lexer = require('../lexer');
const builder = require('../builder');

const rules = require('./syntax-rules');

module.exports = parserConstructor({
  builder,
  lexer,
  syntaxRules: rules,
  rootSyntaxRule: ({ rules }) => rules.program(),
});

const configValidator = require('./validations/config');

const parserFactory = require('./factories/parser');

module.exports = config => {
  configValidator.validate(config);
  const {
    builder,
    lexer,
    rootSyntaxRule,
    syntaxRules,
  } = config;

  return parserFactory(builder, lexer, rootSyntaxRule, syntaxRules);
};
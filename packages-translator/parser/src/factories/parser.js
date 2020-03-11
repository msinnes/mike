const { loadClass } = require('@mike/class');

const Parser = require('@mike/translator-classes/Parser');

module.exports = (
  builder,
  lexer,
  rootSyntaxRule,
  syntaxRules
) => {
  function ExtendedParser() {
    this.builder = builder;
    this.lexer = lexer;
    this.rootSyntaxRule = rootSyntaxRule;
    this.syntaxRules = syntaxRules;
  }

  return loadClass(ExtendedParser).extend(Parser);
};

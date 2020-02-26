const { loadClass } = require('@core/class');

const Parser = require('../classes/Parser');

module.exports = (
  builder,
  lexer,
  rootSyntaxRule,
  syntaxRules
) => {
  function ExtendedParser() {
    this._builder = builder;
    this._lexer = lexer;
    this._rootSyntaxRule = rootSyntaxRule;
    this._syntaxRules = syntaxRules;
  }

  return loadClass(ExtendedParser).extend(Parser);
};

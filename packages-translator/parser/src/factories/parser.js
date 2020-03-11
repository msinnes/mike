const { loadClass } = require('@mike/class');

const Parser = require('@mike/translator-classes/Parser');

const ParserContext = require('@mike/translator-classes/ParserContext');

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

  Parser.prototype.createContext = function(text, syntaxRules) {
    return new ParserContext(
      this.lexer,
      text,
      this.builder,
      syntaxRules
    );
  };

  return loadClass(ExtendedParser).extend(Parser);
};

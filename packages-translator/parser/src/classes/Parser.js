const { loadAbstractClass } = require('@mike/class');
const BaseParser = require('@mike/translator-classes/Parser');

const contextFactory = require('../factories/context');
const textRuntimeValidation = require('../validations/textRuntime');
const wrapRule = require('../lib/wrapRule');

function Parser() {
  this.builder = {};
  this.lexer = {};
  this.rootSyntaxRule = function() {};
  this.syntaxRules = {};
}

Parser.prototype.createContext = function(text) {
  return contextFactory(
    this.builder,
    this.lexer,
    this.syntaxRules,
    text
  );
};

Parser.prototype.parse = function(text) {
  textRuntimeValidation.validate(text);
  const context = this.createContext(text);
  const wrappedRootSyntaxRule = wrapRule(this.rootSyntaxRule, context);
  return wrappedRootSyntaxRule(context);
};

module.exports = loadAbstractClass(Parser).extend(BaseParser);

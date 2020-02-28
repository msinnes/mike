const { loadAbstractClass } = require('@mike/class');
const BaseParser = require('@mike/translator-classes/BaseParser');

const contextFactory = require('../factories/context');
const textRuntimeValidation = require('../validations/textRuntime');
const wrapRule = require('../lib/wrapRule');

function Parser() {
  this._builder = {};
  this._lexer = {};
  this._rootSyntaxRule = function() {};
  this._syntaxRules = {};
}

Parser.prototype._createContext = function(text) {
  return contextFactory(
    this._builder,
    this._lexer,
    this._syntaxRules,
    text
  );
};

Parser.prototype.parse = function(text) {
  textRuntimeValidation.validate(text);
  const context = this._createContext(text);
  const wrappedRootSyntaxRule = wrapRule(this._rootSyntaxRule, context);
  return wrappedRootSyntaxRule(context);
};

module.exports = loadAbstractClass(Parser).extend(BaseParser);

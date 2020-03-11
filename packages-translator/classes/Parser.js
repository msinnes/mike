const { loadAbstractClass } = require('@mike/class');
const isNode = require('@mike/utils/isNode');
const RuntimeValidation = require('@mike/validations/Runtime');
const StringValidation = require('@mike/validations/String');
const Validation = require('@mike/validations/Validation');

const iParser = require('@mike/translator-interfaces/iParser');

const Contextual = require('./Contextual');
const ParserContext = require('./ParserContext');

const textRuntimeValidation = RuntimeValidation(
  StringValidation(
    'parsers can only parse string input'
  )
);

const nodeRuntimeValidation = RuntimeValidation(
  Validation(
    isNode,
    'Syntax Rules should return an instance of AstNode'
  )
);

function Parser() {
  this.ContextClass = ParserContext;
}

Parser.prototype.mapRules = function(rules, context) {
  return Object.keys(rules).reduce((acc, key) => ({
    ...acc,
    [key]: this.wrapRule(rules[key], context),
  }), {});
};

Parser.prototype.parse = function(text) {
  textRuntimeValidation.validate(text);

  const ctx = {};
  const wrappedSyntaxRules = this.mapRules(this.syntaxRules, ctx);
  const wrappedRootSyntaxRule = this.wrapRule(this.rootSyntaxRule, ctx);

  Object.assign({}, this.createContext(
    this.lexer,
    text,
    this.builder,
    wrappedSyntaxRules
  ));

  return wrappedRootSyntaxRule(ctx);
};

Parser.prototype.wrapRule = function(syntaxRule, context) {
  return function() {
    const node = syntaxRule(context);
    nodeRuntimeValidation.validate(node);
    return node;
  };
};

module.exports = loadAbstractClass(Parser).extend(Contextual).implement(iParser);

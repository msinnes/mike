const ObjectValidation = require('@mike/validations/Object');

const builder = require('./builder');
const lexer = require('./lexer');
const rootSyntaxRule = require('./rootSyntaxRule');
const syntaxRules = require('./syntaxRules');

module.exports = ObjectValidation(
  {
    builder,
    lexer,
    rootSyntaxRule,
    syntaxRules,
  },
  { throwOnInvalid: true}
);

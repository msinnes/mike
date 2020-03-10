const { loadInterface } = require('@mike/class');
const FunctionType = require('@mike/types/Function');

const BuilderClassType = require('@mike/translator-types/BuilderClass');
const LexerClassType = require('@mike/translator-types/LexerClass');
const SyntaxRulesType = require('@mike/translator-types/SyntaxRules');

module.exports = loadInterface({
  builder: BuilderClassType,
  createContext: FunctionType,
  lexer: LexerClassType,
  rootSyntaxRule: FunctionType,
  syntaxRules: SyntaxRulesType,
});

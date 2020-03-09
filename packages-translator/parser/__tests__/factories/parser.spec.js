const Parser = require('@mike/translator-classes/Parser');
const Builder = require('@mike/translator-classes/Builder');
const Lexer = require('@mike/translator-classes/Lexer');


const parserFactory = require('../../src/factories/parser');

describe('parserFactory', () => {
  it('should be a function', () => {
    expect(parserFactory).toBeDefined();
    expect(parserFactory).toBeInstanceOf(Function);
  });

  it('should return a class that extends Lexer', () => {
    expect(parserFactory().extends(Parser)).toBe(true);
  });

  describe('instance', () => {
    const builderRef = Builder;
    const lexerRef = Lexer;
    const rootSyntaxRuleRef = function() {};
    const syntaxRulesRef = {};
    const ExtendedParser = parserFactory(
      builderRef,
      lexerRef,
      rootSyntaxRuleRef,
      syntaxRulesRef
    );

    it('should assign tokenizers and skips', () => {
      const instance = new ExtendedParser('');
      expect(instance.builder).toEqual(builderRef);
      expect(instance.lexer).toEqual(lexerRef);
      expect(instance.rootSyntaxRule).toEqual(rootSyntaxRuleRef);
      expect(instance.syntaxRules).toEqual(syntaxRulesRef);
    });
  });
});

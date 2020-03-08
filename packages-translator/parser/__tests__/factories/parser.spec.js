const BaseParser = require('@mike/translator-classes/BaseParser');

const parserFactory = require('../../src/factories/parser');

describe('parserFactory', () => {
  it('should be a function', () => {
    expect(parserFactory).toBeDefined();
    expect(parserFactory).toBeInstanceOf(Function);
  });

  it('should return a class that extends Lexer', () => {
    expect(parserFactory().extends(BaseParser)).toBe(true);
  });

  describe('instance', () => {
    const builderRef = {};
    const lexerRef = {};
    const rootSyntaxRuleRef = {};
    const syntaxRulesRef = {};
    const ExtendedParser = parserFactory(
      builderRef,
      lexerRef,
      rootSyntaxRuleRef,
      syntaxRulesRef
    );

    it('should assign tokenizers and skips', () => {
      const instance = new ExtendedParser('');
      expect(instance._builder).toEqual(builderRef);
      expect(instance._lexer).toEqual(lexerRef);
      expect(instance._rootSyntaxRule).toEqual(rootSyntaxRuleRef);
      expect(instance._syntaxRules).toEqual(syntaxRulesRef);
    });
  });
});

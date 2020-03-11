const Lexer = require('@mike/translator-classes/Lexer');

const lexerFactory = require('../../src/factories/lexer');

const LexerContext = require('@mike/translator-classes/LexerContext');

describe('lexerFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(lexerFactory).toBeDefined();
    expect(lexerFactory).toBeInstanceOf(Function);
  });

  it('should return a class that extends Lexer', () => {
    expect(lexerFactory().extends(Lexer)).toBe(true);
  });

  describe('instance', () => {
    const tokenizersRef = [];
    const skipsRef = [];
    const reservedKeywordServiceRef = {};
    const ExtendedLexer = lexerFactory(tokenizersRef, skipsRef, reservedKeywordServiceRef);

    it('should assign tokenizers and skips', () => {
      const instance = new ExtendedLexer('');
      expect(instance.skips).toEqual(skipsRef);
      expect(instance.tokenizers).toEqual(tokenizersRef);
    });

    it('should call the contextFactory mock and assign the return to ctx', () => {
      const text = '';
      const instance = new ExtendedLexer(text);
      expect(instance.ctx).toBeInstanceOf(LexerContext);
    });
  });
});

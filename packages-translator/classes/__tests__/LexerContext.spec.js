const Token = require('@mike/translator-classes/Token');

const CharacterContext = require('../CharacterContext');
const LexerContext = require('../LexerContext');

describe('LexerContext', () => {
  const getReservedTokenRef = () => {};
  const isReservedKeywordRef = () => {};

  const testReservedKeywordService = {
    getReservedToken: getReservedTokenRef,
    isReservedKeyword: isReservedKeywordRef,
  };
  it('should be a function', () => {
    expect(LexerContext).toBeDefined();
    expect(LexerContext).toBeInstanceOf(Function);
  });

  it('should extend CharacterContext', () => {
    expect(LexerContext.extends(CharacterContext)).toBe(true);
  });

  describe('tokenFactory', () => {
    it('should be a function', () => {
      const ctx = new LexerContext('', testReservedKeywordService);
      expect(ctx.tokenFactory).toBeDefined();
      expect(ctx.tokenFactory).toBeInstanceOf(Function);
    });

    it('should return instances of Tokens', () => {
      const ctx = new LexerContext('', testReservedKeywordService);
      expect(ctx.tokenFactory('type')).toBeInstanceOf(Token);
    });
  });

  describe('reservedKeywordService', () => {
    it('should expose getReservedToken if a reservedKeywordService is passed into the factory', () => {
      const ctx = new LexerContext('', testReservedKeywordService);
      expect(ctx.getReservedToken).toBeDefined();
      expect(ctx.getReservedToken).toBeInstanceOf(Function);
      expect(ctx.getReservedToken).toEqual(getReservedTokenRef);
    });

    it('should expose isReservedKeyword if a reservedKeywordService is passed into the factory', () => {
      const ctx = new LexerContext('', testReservedKeywordService);
      expect(ctx.isReservedKeyword).toBeDefined();
      expect(ctx.isReservedKeyword).toBeInstanceOf(Function);
      expect(ctx.isReservedKeyword).toEqual(isReservedKeywordRef);
    });

    it('should not expose reservedKeywordServiceMethods if no service is passed in', () => {
      const ctx = new LexerContext('');
      expect(ctx.getReservedToken).not.toBeDefined();
      expect(ctx.isReservedKeyword).not.toBeDefined();
    });
  });
});
const Token = require('@mike/translator-classes/Token');

const contextFactory = require('../../src/factories/context');

jest.mock('../../src/factories/characterService');
const characterServiceFactoryMock = require('../../src/factories/characterService');

describe('contextFactory', () => {
  const advanceRef = () => {};
  const peekRef = () => {};

  beforeEach(() => {
    characterServiceFactoryMock.mockReturnValueOnce({
      advance: advanceRef,
      peek: peekRef,
      currentCharacter: 't',
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(contextFactory).toBeDefined();
    expect(contextFactory).toBeInstanceOf(Function);
  });

  it('should call the characterServiceFactoryMock with the text arg', () => {
    contextFactory('text');
    expect(characterServiceFactoryMock).toHaveBeenCalledTimes(1);
    expect(characterServiceFactoryMock.mock.calls[0][0]).toEqual('text');
  });

  it('should expose the characterService.advance method', () => {
    const ctx = contextFactory('text');
    expect(ctx.advance).toEqual(advanceRef);
  });

  it('should expose the characterService.peek method', () => {
    const ctx = contextFactory('text');
    expect(ctx.peek).toEqual(peekRef);
  });

  it('should expose characterService.currentCharacter as a read only variable', () => {
    const ctx = contextFactory('text');
    expect(ctx.currentCharacter).toEqual('t');

    expect(() => {
      ctx.currentCharacter = 'e';
    }).toThrowErrorMatchingSnapshot();
  });

  describe('tokenFactory', () => {
    it('should be a function', () => {
      const ctx = contextFactory('');
      expect(ctx.tokenFactory).toBeDefined();
      expect(ctx.tokenFactory).toBeInstanceOf(Function);
    });

    it('should return instances of Tokens', () => {
      const ctx = contextFactory('');
      expect(ctx.tokenFactory('type')).toBeInstanceOf(Token);
    });
  });

  describe('reservedKeywordService', () => {
    const getReservedTokenRef = () => {};
    const isReservedKeywordRef = () => {};

    const testReservedKeywordService = {
      getReservedToken: getReservedTokenRef,
      isReservedKeyword: isReservedKeywordRef,
    };

    it('should expose getReservedToken if a reservedKeywordService is passed into the factory', () => {
      const ctx = contextFactory('', testReservedKeywordService);
      expect(ctx.getReservedToken).toBeDefined();
      expect(ctx.getReservedToken).toBeInstanceOf(Function);
      expect(ctx.getReservedToken).toEqual(getReservedTokenRef);
    });

    it('should expose isReservedKeyword if a reservedKeywordService is passed into the factory', () => {
      const ctx = contextFactory('', testReservedKeywordService);
      expect(ctx.isReservedKeyword).toBeDefined();
      expect(ctx.isReservedKeyword).toBeInstanceOf(Function);
      expect(ctx.isReservedKeyword).toEqual(isReservedKeywordRef);
    });

    it('should not expose reservedKeywordServiceMethods if no service is passed in', () => {
      const ctx = contextFactory('');
      expect(ctx.getReservedToken).not.toBeDefined();
      expect(ctx.isReservedKeyword).not.toBeDefined();
    });
  });
});
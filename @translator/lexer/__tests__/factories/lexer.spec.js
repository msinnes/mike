const BaseLexer = require('@shared/classes/BaseLexer');

const lexerFactory = require('../../src/factories/lexer');

jest.mock('../../src/factories/context');
const contextFactoryMock = require('../../src/factories/context');

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
    expect(lexerFactory().extends(BaseLexer)).toBe(true);
  });

  describe('instance', () => {
    const tokenizersRef = [];
    const skipsRef = [];
    const reservedKeywordServiceRef = {};
    const contextRef = {};
    const ExtendedLexer = lexerFactory(tokenizersRef, skipsRef, reservedKeywordServiceRef);

    beforeEach(() => {
      contextFactoryMock.mockImplementation(() => contextRef);
    });

    it('should assign tokenizers and skips', () => {
      const instance = new ExtendedLexer('');
      expect(instance._skips).toEqual(skipsRef);
      expect(instance._tokenizers).toEqual(tokenizersRef);
    });

    it('should call the contextFactory mock and assign the return to ctx', () => {
      const text = '';
      const instance = new ExtendedLexer(text);
      expect(contextFactoryMock).toHaveBeenCalledTimes(1);
      expect(contextFactoryMock.mock.calls[0][0]).toEqual(text);
      expect(contextFactoryMock.mock.calls[0][1]).toEqual(reservedKeywordServiceRef);
      expect(instance._ctx).toEqual(contextRef);
    });
  });
});

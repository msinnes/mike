const lexer = require('../src');

const configValidatorMock = jest.fn();
const configModule = require('../src/validations/config');
configModule.validate = configValidatorMock;
jest.mock('../src/factories/reservedKeywordService');
const reservedKeywordServiceFactoryMock = require('../src/factories/reservedKeywordService');
jest.mock('../src/factories/lexer');
const lexerFactoryMock = require('../src/factories/lexer');


describe('lexer', () => {
  const ReservedKeywordServiceRef = {};
  beforeEach(() => {
    reservedKeywordServiceFactoryMock.mockImplementation(() => ReservedKeywordServiceRef);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(lexer).toBeDefined();
    expect(lexer).toBeInstanceOf(Function);
  });

  it('should call the configValidatorMock', () => {
    const configRef = {};
    lexer(configRef);
    expect(configValidatorMock).toHaveBeenCalledTimes(1);
    expect(configValidatorMock.mock.calls[0][0]).toEqual(configRef);
  });

  it('should not call the reserved keyword service if reservedKeywords is not in the config', () => {
    lexer({});
    expect(reservedKeywordServiceFactoryMock).not.toHaveBeenCalled();
  });

  it('should call the reserved keyword service if reservedKeywords is in the config', () => {
    const reservedKeywordsRef = [];
    const config = {
      reservedKeywords: reservedKeywordsRef,
    };
    lexer(config);
    expect(reservedKeywordServiceFactoryMock).toHaveBeenCalledTimes(1);
    expect(reservedKeywordServiceFactoryMock.mock.calls[0][0]).toEqual(reservedKeywordsRef);
  });

  it('should also pass caseSensitive to reservedKeywordServiceFactory if it is in the config', () => {
    const reservedKeywordsRef = [];
    const caseSensitiveRef = {};
    const config = {
      reservedKeywords: reservedKeywordsRef,
      caseSensitive: caseSensitiveRef,
    };
    lexer(config);
    expect(reservedKeywordServiceFactoryMock).toHaveBeenCalledTimes(1);
    expect(reservedKeywordServiceFactoryMock.mock.calls[0][0]).toEqual(reservedKeywordsRef);
    expect(reservedKeywordServiceFactoryMock.mock.calls[0][1]).toEqual(caseSensitiveRef);
  });

  it('should call lexerFactoryMock with tokenizers, skips, and reservedKeywordService', () => {
    const reservedKeywordsRef = [];
    const caseSensitiveRef = {};
    const skipsRef = [];
    const tokenizersRef = [];
    const config = {
      reservedKeywords: reservedKeywordsRef,
      caseSensitive: caseSensitiveRef,
      skips: skipsRef,
      tokenizers: tokenizersRef,
    };
    lexer(config);
    expect(lexerFactoryMock).toHaveBeenCalledTimes(1);
    expect(lexerFactoryMock.mock.calls[0][0]).toEqual(tokenizersRef);
    expect(lexerFactoryMock.mock.calls[0][1]).toEqual(skipsRef);
    expect(lexerFactoryMock.mock.calls[0][2]).toEqual(ReservedKeywordServiceRef);
  });

  it('should return the value of the lexerFactory', () => {
    const lexerClassRef = {};
    lexerFactoryMock.mockReturnValue(lexerClassRef);
    const result = lexer({});
    expect(result).toEqual(lexerClassRef);
  });
});
const caseSensitive = require('../../src/validations/caseSensitive');
const reservedKeywords = require('../../src/validations/reservedKeywords');
const skips = require('../../src/validations/skips');
const tokenizers = require('../../src/validations/tokenizers');

const caseSensitiveMock = jest.fn();
const reservedKeywordsMock = jest.fn();
const skipsMock = jest.fn();
const tokenizersMock = jest.fn();

caseSensitive.validate = caseSensitiveMock;
reservedKeywords.validate = reservedKeywordsMock;
skips.validate = skipsMock;
tokenizers.validate = tokenizersMock;

const configValidation = require('../../src/validations/config');

describe('config/index', () => {
  const caseSensitiveTestValue = {};
  const reservedKeywordsTestValue = {};
  const skipsTestValue = {};
  const tokenizersTestValue = {};

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be an Object', () => {
    expect(configValidation).toBeDefined();
    expect(configValidation).toBeInstanceOf(Object);
  });

  it('should call all of the mocks', () => {
    caseSensitiveMock.mockReturnValueOnce({ valid: true, invalid: false });
    reservedKeywordsMock.mockReturnValueOnce({ valid: true, invalid: false });
    skipsMock.mockReturnValueOnce({ valid: true, invalid: false });
    tokenizersMock.mockReturnValueOnce({ valid: true, invalid: false });

    configValidation.validate({
      caseSensitive: caseSensitiveTestValue,
      reservedKeywords: reservedKeywordsTestValue,
      skips: skipsTestValue,
      tokenizers: tokenizersTestValue,
    });

    expect(caseSensitiveMock).toHaveBeenCalledTimes(1);
    expect(caseSensitiveMock.mock.calls[0][0]).toEqual(caseSensitiveTestValue);
    expect(reservedKeywordsMock).toHaveBeenCalledTimes(1);
    expect(reservedKeywordsMock.mock.calls[0][0]).toEqual(reservedKeywordsTestValue);
    expect(skipsMock).toHaveBeenCalledTimes(1);
    expect(skipsMock.mock.calls[0][0]).toEqual(skipsTestValue);
    expect(tokenizersMock).toHaveBeenCalledTimes(1);
    expect(tokenizersMock.mock.calls[0][0]).toEqual(tokenizersTestValue);
  });

  it('should throw an error if any value is invalid', () => {
    caseSensitiveMock.mockReturnValueOnce({ valid: false, invalid: true, data: 'error message', });
    reservedKeywordsMock.mockReturnValueOnce({ valid: true, invalid: false });
    skipsMock.mockReturnValueOnce({ valid: true, invalid: false });
    tokenizersMock.mockReturnValueOnce({ valid: true, invalid: false });

    expect(() => {
      configValidation.validate({
        caseSensitive: caseSensitiveTestValue,
        reservedKeywords: reservedKeywordsTestValue,
        skips: skipsTestValue,
        tokenizers: tokenizersTestValue,
      });
    }).toThrowErrorMatchingSnapshot();
  });
});

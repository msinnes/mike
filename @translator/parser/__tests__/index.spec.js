const parser = require('../src');

const configValidatorMock = jest.fn();
const configModule = require('../src/validations/config');
configModule.validate = configValidatorMock;
jest.mock('../src/factories/parser');
const parserFactoryMock = require('../src/factories/parser');


describe('parser', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(parser).toBeDefined();
    expect(parser).toBeInstanceOf(Function);
  });

  it('should call the configValidatorMock', () => {
    const configRef = {};
    parser(configRef);
    expect(configValidatorMock).toHaveBeenCalledTimes(1);
    expect(configValidatorMock.mock.calls[0][0]).toEqual(configRef);
  });

  it('should call parserFactoryMock with tokenizers, skips, and reservedKeywordService', () => {
    const builderRef = {};
    const lexerRef = {};
    const rootSyntaxRuleRef = () => {};
    const syntaxRulesRef = {};
    const config = {
      builder: builderRef,
      lexer: lexerRef,
      rootSyntaxRule: rootSyntaxRuleRef,
      syntaxRules: syntaxRulesRef,
    };
    parser(config);
    expect(parserFactoryMock).toHaveBeenCalledTimes(1);
    expect(parserFactoryMock.mock.calls[0][0]).toEqual(builderRef);
    expect(parserFactoryMock.mock.calls[0][1]).toEqual(lexerRef);
    expect(parserFactoryMock.mock.calls[0][2]).toEqual(rootSyntaxRuleRef);
    expect(parserFactoryMock.mock.calls[0][3]).toEqual(syntaxRulesRef);
  });

  it('should return the value of the parserFactory', () => {
    const parserClassRef = {};
    parserFactoryMock.mockReturnValue(parserClassRef);
    const result = parser({});
    expect(result).toEqual(parserClassRef);
  });
});
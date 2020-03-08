const builder = require('../../../src/validations/config/builder');
const lexer = require('../../../src/validations/config/lexer');
const rootSyntaxRule = require('../../../src/validations/config/rootSyntaxRule');
const syntaxRules = require('../../../src/validations/config/syntaxRules');

const builderMock = jest.fn();
const lexerMock = jest.fn();
const rootSyntaxRuleMock = jest.fn();
const syntaxRulesMock = jest.fn();

builder.validate = builderMock;
lexer.validate = lexerMock;
rootSyntaxRule.validate = rootSyntaxRuleMock;
syntaxRules.validate = syntaxRulesMock;

const configValidation = require('../../../src/validations/config');

describe('config/index', () => {
  const builderTestValue = {};
  const lexerTestValue = {};
  const rootSyntaxRuleTestValue = function() {};
  const syntaxRulesTestValue = {};

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be an Object', () => {
    expect(configValidation).toBeDefined();
    expect(configValidation).toBeInstanceOf(Object);
  });

  it('should call all of the mocks', () => {
    builderMock.mockReturnValueOnce({ valid: true, invalid: false });
    lexerMock.mockReturnValueOnce({ valid: true, invalid: false });
    rootSyntaxRuleMock.mockReturnValueOnce({ valid: true, invalid: false });
    syntaxRulesMock.mockReturnValueOnce({ valid: true, invalid: false });

    configValidation.validate({
      builder: builderTestValue,
      lexer: lexerTestValue,
      rootSyntaxRule: rootSyntaxRuleTestValue,
      syntaxRules: syntaxRulesTestValue,
    });

    expect(builderMock).toHaveBeenCalledTimes(1);
    expect(builderMock.mock.calls[0][0]).toEqual(builderTestValue);
    expect(lexerMock).toHaveBeenCalledTimes(1);
    expect(lexerMock.mock.calls[0][0]).toEqual(lexerTestValue);
    expect(rootSyntaxRuleMock).toHaveBeenCalledTimes(1);
    expect(rootSyntaxRuleMock.mock.calls[0][0]).toEqual(rootSyntaxRuleTestValue);
    expect(syntaxRulesMock).toHaveBeenCalledTimes(1);
    expect(syntaxRulesMock.mock.calls[0][0]).toEqual(syntaxRulesTestValue);
  });

  it('should return an invalid response if any value is invalid', () => {
    builderMock.mockReturnValueOnce({ valid: true, invalid: false });
    lexerMock.mockReturnValueOnce({ valid: true, invalid: false });
    rootSyntaxRuleMock.mockReturnValueOnce({ valid: false, invalid: true, data: 'error' });
    syntaxRulesMock.mockReturnValueOnce({ valid: true, invalid: false });

    expect(() => {
      configValidation.validate({
        builder: builderTestValue,
        lexer: lexerTestValue,
        rootSyntaxRule: rootSyntaxRuleTestValue,
        syntaxRules: syntaxRulesTestValue,
      });
    }).toThrowErrorMatchingSnapshot();
  });
});

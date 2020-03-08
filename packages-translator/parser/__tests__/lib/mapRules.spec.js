jest.mock('../../src/lib/wrapRule');
const wrapRuleMock = require('../../src/lib/wrapRule');

const ruleOneRef = {};
const ruleTwoRef = {};
const rulesTestValue = {
  ruleOne: ruleOneRef,
  ruleTwo: ruleTwoRef,
};
const contextTestValue = {};

const mapRules = require('../../src/lib/mapRules');

describe('config/index', () => {
  it('should be a function', () => {
    expect(mapRules).toBeDefined();
    expect(mapRules).toBeInstanceOf(Function);
  });

  it('should return an object', () => {
    expect(mapRules({})).toBeDefined();
    expect(mapRules({})).toBeInstanceOf(Object);
  });

  it('should call the wrapRuleMock once for each rule', () => {
    const returnRef = {};
    wrapRuleMock.mockReturnValue(returnRef);

    const mappedRules = mapRules(rulesTestValue, contextTestValue);
    expect(wrapRuleMock).toHaveBeenCalledTimes(2);
    expect(wrapRuleMock.mock.calls[0][0]).toEqual(ruleOneRef);
    expect(wrapRuleMock.mock.calls[0][1]).toEqual(contextTestValue);
    expect(wrapRuleMock.mock.calls[1][0]).toEqual(ruleOneRef);
    expect(wrapRuleMock.mock.calls[1][1]).toEqual(contextTestValue);

    expect(mappedRules.ruleOne).toEqual(returnRef);
    expect(mappedRules.ruleTwo).toEqual(returnRef);
  });
});
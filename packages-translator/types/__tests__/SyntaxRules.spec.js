const { isType } = require('@mike/class');

const SyntaxRulesType = require('../SyntaxRules');

describe('SyntaxRulesType', () => {
  it('should be a type', () => {
    expect(SyntaxRulesType).toBeDefined();
    expect(isType(SyntaxRulesType)).toBe(true);
  });

  it('should return true if the input is a map of functions', () => {
    expect(SyntaxRulesType.is({
      field1: function() {},
    })).toBe(true);
  });

  it('should return false if the input is not a map of functions', () => {
    expect(SyntaxRulesType.is('some other value')).toBe(false);
  });
});

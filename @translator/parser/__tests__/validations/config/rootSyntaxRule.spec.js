const rootSyntaxRule = require('../../../src/validations/config/rootSyntaxRule');

describe('rootSyntaxRule', () => {
  it('should be an Object', () => {
    expect(rootSyntaxRule).toBeDefined();
    expect(rootSyntaxRule).toBeInstanceOf(Object);
  });

  it('is required', () => {
    expect(rootSyntaxRule.validate().valid).toBe(false);
  });

  it('should require a function', () => {
    expect(rootSyntaxRule.validate(function() {}).valid).toBe(true);
    expect(rootSyntaxRule.validate(false).valid).toBe(false);
    expect(rootSyntaxRule.validate({}).valid).toBe(false);
  });
});
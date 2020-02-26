const syntaxRules = require('../../../src/validations/config/syntaxRules');

describe('syntaxRules', () => {
  it('should be an Object', () => {
    expect(syntaxRules).toBeDefined();
    expect(syntaxRules).toBeInstanceOf(Object);
  });

  it('is required', () => {
    expect(syntaxRules.validate().valid).toBe(false);
  });

  it('should require a map of functions', () => {
    expect(syntaxRules.validate({ fieldOne: function() {} }).valid).toBe(true);
    expect(syntaxRules.validate({ fieldOne: function() {}, fieldTwo: function () {} }).valid).toBe(true);
    expect(syntaxRules.validate({ fieldOne: 'string', fieldTwo: () => {} }).valid).toBe(false);
    expect(syntaxRules.validate({ fieldOne: ['string'], fieldTwo: 1 }).valid).toBe(false);
    expect(syntaxRules.validate({field1: function() {}}).valid).toBe(false);
  });
});

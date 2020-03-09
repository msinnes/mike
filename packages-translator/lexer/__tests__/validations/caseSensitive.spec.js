const caseSensitive = require('../../src/validations/caseSensitive');

describe('caseSensitive', () => {
  it('should be an Object', () => {
    expect(caseSensitive).toBeDefined();
    expect(caseSensitive).toBeInstanceOf(Object);
  });

  it('is not required', () => {
    expect(caseSensitive.validate().valid).toBe(true);
  });

  it('should require a boolean', () => {
    expect(caseSensitive.validate(true).valid).toBe(true);
    expect(caseSensitive.validate(false).valid).toBe(true);
    expect(caseSensitive.validate({}).valid).toBe(false);
  });
});
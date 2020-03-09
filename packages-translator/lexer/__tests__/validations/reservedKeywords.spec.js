const reservedKeywords = require('../../src/validations/reservedKeywords');

describe('reservedKeywords', () => {
  it('should be an Object', () => {
    expect(reservedKeywords).toBeDefined();
    expect(reservedKeywords).toBeInstanceOf(Object);
  });

  it('is not required', () => {
    expect(reservedKeywords.validate().valid).toBe(true);
  });

  it('should require an array of strings', () => {
    expect(reservedKeywords.validate([]).valid).toBe(true);
    expect(reservedKeywords.validate(['string']).valid).toBe(true);
    expect(reservedKeywords.validate({}).valid).toBe(false);
  });
});
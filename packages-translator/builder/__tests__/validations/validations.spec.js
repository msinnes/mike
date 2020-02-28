const validationsValidation = require('../../src/validations/validations');

describe('validationsValidation', () => {
  it('should be an Object', () => {
    expect(validationsValidation).toBeDefined();
    expect(validationsValidation).toBeInstanceOf(Object);
  });

  it('is not required', () => {
    expect(validationsValidation.validate().valid).toBe(true);
  });

  it('should require an array of strings or a function', () => {
    expect(validationsValidation.validate({ field1: [] }).valid).toBe(true);
    expect(validationsValidation.validate({ field1: ['string'] }).valid).toBe(true);
    expect(validationsValidation.validate({ field1: () => {} }).valid).toBe(true);
    expect(validationsValidation.validate({ field1: ['string', () => {}] }).valid).toBe(false);
    expect(validationsValidation.validate({ field1: ['string'], field2: 1 }).valid).toBe(false);
  });
});

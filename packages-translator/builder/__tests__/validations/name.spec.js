const nameValidation = require('../../src/validations/name');

describe('nameValidation', () => {
  it('should be an Object', () => {
    expect(nameValidation).toBeDefined();
    expect(nameValidation).toBeInstanceOf(Object);
  });

  it('should require a string of all letters', () => {
    expect(nameValidation.validate('TitleCase').valid).toBe(true);
    expect(nameValidation.validate('camelCase').valid).toBe(true);
    expect(nameValidation.validate('snake_case').valid).toBe(false);
    expect(nameValidation.validate('number 1').valid).toBe(false);
  });
});
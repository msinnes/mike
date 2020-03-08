const isValidation = require('../../lib/isValidation');
const Validation = require('../../classes/Validation');
const ArrayValidation = require('../../classes/ArrayValidation');

describe('isValidation', () => {
  const validation = new Validation(() => {}, () => {});
  const arrayValidation = new ArrayValidation(validation);

  it('should be a function', () => {
    expect(isValidation).toBeDefined();
    expect(isValidation).toBeInstanceOf(Function);
  });

  it('should return true for Validation', () => {
    expect(isValidation(validation)).toBe(true);
  });

  it('should return true for ArrayValidation', () => {
    expect(isValidation(arrayValidation)).toBe(true);
  });
});

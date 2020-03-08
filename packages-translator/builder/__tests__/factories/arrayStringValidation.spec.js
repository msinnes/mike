const arrayStringValidationFactory = require('../../src/factories/arrayStringValidation');

describe('arrayStringValidationFactory', () => {
  it('should be a function', () => {
    expect(arrayStringValidationFactory).toBeDefined();
    expect(arrayStringValidationFactory).toBeInstanceOf(Function);
  });

  it('should be an array', () => {
    expect(arrayStringValidationFactory('fieldName').validate().getMessage()).toMatchSnapshot();
  });

  it('should put the field name in an error message', () => {
    expect(arrayStringValidationFactory('fieldName').validate([1]).getMessage()).toMatchSnapshot();
  });

  it('should require every item in the array to be a string', () => {
    expect(arrayStringValidationFactory('fieldName').validate(['some string']).valid).toBe(true);
    expect(arrayStringValidationFactory('fieldName').validate(['some string', 1]).valid).toBe(false);
  });

  it('should not be required if allowEmpty is true', () => {
    expect(arrayStringValidationFactory('fieldName', true).validate().valid).toBe(true);
  });
});
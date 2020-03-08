const StringValidation = require('../String');
const Validation = require('../classes/Validation');

describe('String', () => {
  it('should be a function', () => {
    expect(StringValidation).toBeDefined();
    expect(StringValidation).toBeInstanceOf(Function);
  });

  it('should take an optional message argument', () => {
    expect(() => {
      StringValidation();
    }).not.toThrow();

    expect(() => {
      StringValidation('string');
    }).not.toThrow();

    expect(() => {
      StringValidation(() => {});
    }).not.toThrow();

    expect(() => {
      StringValidation(1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should take an optional config argument', () => {
    expect(() => {
      StringValidation('stirng');
    }).not.toThrow();

    expect(() => {
      StringValidation('string', {});
    }).not.toThrow();

    expect(() => {
      StringValidation('string', 1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should return an instance of Validation', () => {
    expect(StringValidation()).toBeInstanceOf(Validation);
    expect(StringValidation().validate).toBeDefined();
  });

  it('should test if a value is a boolean', () => {
    const validation = StringValidation();
    const firstResult = validation.validate('');
    expect(firstResult.valid).toBeDefined();
    expect(firstResult.valid).toBe(true);

    const secondResult = validation.validate();
    expect(secondResult.invalid).toBeDefined();
    expect(secondResult.invalid).toBe(true);
  });
});
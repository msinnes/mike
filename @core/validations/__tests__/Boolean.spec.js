const BooleanValidation = require('../Boolean');
const Validation = require('../classes/Validation');

describe('Boolean', () => {
  it('should be a function', () => {
    expect(BooleanValidation).toBeDefined();
    expect(BooleanValidation).toBeInstanceOf(Function);
  });

  it('should take an optional message argument', () => {
    expect(() => {
      BooleanValidation();
    }).not.toThrow();

    expect(() => {
      BooleanValidation('Boolean');
    }).not.toThrow();

    expect(() => {
      BooleanValidation(() => {});
    }).not.toThrow();

    expect(() => {
      BooleanValidation(1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should take an optional config argument', () => {
    expect(() => {
      BooleanValidation('string');
    }).not.toThrow();

    expect(() => {
      BooleanValidation('string', {});
    }).not.toThrow();

    expect(() => {
      BooleanValidation('string', 1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should return an instance of Validation', () => {
    expect(BooleanValidation()).toBeInstanceOf(Validation);
    expect(BooleanValidation().validate).toBeDefined();
  });

  it('should test if a value is a boolean', () => {
    const validation = BooleanValidation();
    const firstResult = validation.validate(true);
    expect(firstResult.valid).toBeDefined();
    expect(firstResult.valid).toBe(true);

    const secondResult = validation.validate();
    expect(secondResult.invalid).toBeDefined();
    expect(secondResult.invalid).toBe(true);
  });
});
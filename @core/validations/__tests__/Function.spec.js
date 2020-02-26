const FunctionValidation = require('../Function');
const Validation = require('../classes/Validation');

describe('Function', () => {
  it('should be a function', () => {
    expect(FunctionValidation).toBeDefined();
    expect(FunctionValidation).toBeInstanceOf(Function);
  });

  it('should take an optional message argument', () => {
    expect(() => {
      FunctionValidation();
    }).not.toThrow();

    expect(() => {
      FunctionValidation('Function');
    }).not.toThrow();

    expect(() => {
      FunctionValidation(() => {});
    }).not.toThrow();

    expect(() => {
      FunctionValidation(1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should take an optional config argument', () => {
    expect(() => {
      FunctionValidation('string');
    }).not.toThrow();

    expect(() => {
      FunctionValidation('string', {});
    }).not.toThrow();

    expect(() => {
      FunctionValidation('string', 1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should return an instance of Validation', () => {
    expect(FunctionValidation()).toBeInstanceOf(Validation);
    expect(FunctionValidation().validate).toBeDefined();
  });

  it('should test if a value is a boolean', () => {
    const validation = FunctionValidation();
    const firstResult = validation.validate(() => {});
    expect(firstResult.valid).toBeDefined();
    expect(firstResult.valid).toBe(true);

    const secondResult = validation.validate();
    expect(secondResult.invalid).toBeDefined();
    expect(secondResult.invalid).toBe(true);
  });
});
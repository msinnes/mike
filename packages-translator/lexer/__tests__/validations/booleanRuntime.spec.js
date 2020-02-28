const booleanRuntimeValidation = require('../../src/validations/booleanRuntime');

describe('booleanRuntimeValidation', () => {
  function runTest(value, expected) {
    try {
      const result = booleanRuntimeValidation.validate(value);
      expect(result.valid).toBe(expected);
    } catch(e) {
      expect(e.name).toEqual('RuntimeError');
      expect(expected).toBe(false);
    }
  }

  it('should be an object', () => {
    expect(booleanRuntimeValidation).toBeDefined();
    expect(booleanRuntimeValidation).toBeInstanceOf(Object);
  });

  it('should throw an error if the value is not a boolean', () => {
    runTest(true, true);
    runTest(false, true);
    runTest(undefined, false);
    runTest(null, false);
    runTest(1, false);
    runTest({}, false);
  });
});
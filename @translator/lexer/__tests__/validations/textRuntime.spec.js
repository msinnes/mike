const textRuntimeValidation = require('../../src/validations/textRuntime');

describe('textRuntimeValidation', () => {
  function runTest(value, expected) {
    try {
      const result = textRuntimeValidation.validate(value);
      expect(result.valid).toBe(expected);
    } catch(e) {
      expect(e.name).toEqual('RuntimeError');
      expect(expected).toBe(false);
    }
  }

  it('should be an Object', () => {
    expect(textRuntimeValidation).toBeDefined();
    expect(textRuntimeValidation).toBeInstanceOf(Object);
  });

  it('should throw an error if the value is not text', () => {
    runTest('text', true);
    runTest(undefined, false);
    runTest(null, false);
    runTest(1, false);
    runTest({}, false);
  });
});
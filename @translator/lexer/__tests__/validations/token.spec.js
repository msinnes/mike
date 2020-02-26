const tokenValidation = require('../../src/validations/token');
const Token = require('@shared/classes/Token');

describe('token', () => {
  function runTest(value, expected) {
    try {
      const result = tokenValidation.validate(value);
      expect(result.valid).toBe(expected);
    } catch(e) {
      expect(e.name).toEqual('RuntimeError');
      expect(expected).toBe(false);
    }
  }

  it('should be an Object', () => {
    expect(tokenValidation).toBeDefined();
    expect(tokenValidation).toBeInstanceOf(Object);
  });

  it('should throw an error if the value is not an instance of Token', () => {
    runTest(new Token('a', 'a'), true);
    runTest(undefined, false);
    runTest(null, false);
    runTest(1, false);
    runTest({}, false);
  });
});

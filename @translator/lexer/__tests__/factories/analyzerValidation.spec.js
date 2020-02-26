const analyzerValidationFactory = require('../../src/factories/analyzerValidation');

describe('analyzerValidationFactory', () => {
  it('should be a function', () => {
    expect(analyzerValidationFactory).toBeDefined();
    expect(analyzerValidationFactory).toBeInstanceOf(Function);
  });

  it('should be an array', () => {
    expect(analyzerValidationFactory('fieldName').validate().getMessage()).toMatchSnapshot();
  });

  it('should put the field name in an error message', () => {
    expect(analyzerValidationFactory('fieldName').validate([{}]).getMessage()).toMatchSnapshot();
  });

  it('should require every item in the array to have a check and an exec function', () => {
    expect(analyzerValidationFactory('fieldName').validate([{
      check: () => {},
    }]).valid).toBe(false);
    expect(analyzerValidationFactory('fieldName').validate([{
      exec: () => {},
    }]).valid).toBe(false);
    expect(analyzerValidationFactory('fieldName').validate([{
      check: () => {},
      exec: () => {},
    }]).valid).toBe(true);
  });

  it('should not be required if allowEmpty is true', () => {
    expect(analyzerValidationFactory('fieldName', true).validate().valid).toBe(true);
  });
});
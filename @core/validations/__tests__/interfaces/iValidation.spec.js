const { isInterface } = require('@core/class');

const iValidation = require('../../interfaces/iValidation');

describe('iValidation', () => {
  it('should be an interface', () => {
    expect(isInterface(iValidation)).toBe(true);
  });

  it('should accept a valid config', () => {
    expect(() => {
      iValidation.ensure({ 
        _validateFn: () => {},
        _allowEmpty: true,
        _throwOnInvalid: false,
        validate: () => {},
      });
    }).not.toThrow();
  });

  it('should throw an error if the config is invalid', () => {
    expect(() => {
      iValidation.ensure({});
    }).toThrowErrorMatchingSnapshot();
  });
});
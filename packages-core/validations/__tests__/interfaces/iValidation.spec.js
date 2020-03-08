const { isInterface } = require('@mike/class');

const iValidation = require('../../interfaces/iValidation');

describe('iValidation', () => {
  it('should be an interface', () => {
    expect(isInterface(iValidation)).toBe(true);
  });

  it('should accept a valid config', () => {
    expect(() => {
      iValidation.ensure({
        allowEmpty: true,
        throwOnInvalid: true,
        validateFn: function() {},
      });
    }).not.toThrow();
    expect(() => {
      iValidation.ensure({
        allowEmpty: null,
        throwOnInvalid: null,
        validateFn: function() {},
      });
    }).not.toThrow();
  });

  it('should throw an error if the config is invalid', () => {
    expect(() => {
      iValidation.ensure({});
    }).toThrowErrorMatchingSnapshot();
  });
});

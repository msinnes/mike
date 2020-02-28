const validateFnEnforcement = require('../../enforcements/validateFn');

describe('validateFnEnforcement', () => {
  it('should be a function', () => {
    expect(validateFnEnforcement).toBeDefined();
    expect(validateFnEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error', () => {
    expect(() => {
      validateFnEnforcement(function() {});
    }).not.toThrow();
  });

  it('should throw an error', () => {
    expect(() => {
      validateFnEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      validateFnEnforcement({});
    }).toThrowErrorMatchingSnapshot();
  });
});

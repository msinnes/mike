const checkFnEnforcement = require('../../src/enforcements/checkFn');

describe('checkFnEnforcement', () => {
  it('should be a function', () => {
    expect(checkFnEnforcement).toBeDefined();
    expect(checkFnEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error if input is a function', () => {
    expect(() => {
      checkFnEnforcement(() => {});
    }).not.toThrow();
  });

  it('should throw an error if an input is not a function', () => {
    expect(() => {
      checkFnEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      checkFnEnforcement({});
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      checkFnEnforcement();
    }).toThrowErrorMatchingSnapshot();
  });
});

const constructorEnforcement = require('../../src/enforcements/constructor');

describe('constructorEnforcement', () => {
  it('should be a function', () => {
    expect(constructorEnforcement).toBeDefined();
    expect(constructorEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error if input is a function', () => {
    expect(() => {
      constructorEnforcement(() => {});
    }).not.toThrow();
  });

  it('should throw an error if an input is not a function', () => {
    expect(() => {
      constructorEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      constructorEnforcement({});
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      constructorEnforcement();
    }).toThrowErrorMatchingSnapshot();
  });
});

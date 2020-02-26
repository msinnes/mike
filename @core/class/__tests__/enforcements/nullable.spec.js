const nullableEnforcement = require('../../src/enforcements/nullable');

describe('nullableEnforcement', () => {
  it('should be a function', () => {
    expect(nullableEnforcement).toBeDefined();
    expect(nullableEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error if input is a boolean or empty', () => {
    expect(() => {
      nullableEnforcement(true);
    }).not.toThrow();
    expect(() => {
      nullableEnforcement(false);
    }).not.toThrow();
    expect(() => {
      nullableEnforcement(null);
    }).not.toThrow();
    expect(() => {
      nullableEnforcement();
    }).not.toThrow();
  });

  it('should throw an error if an input is not a boolean', () => {
    expect(() => {
      nullableEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      nullableEnforcement({});
    }).toThrowErrorMatchingSnapshot();
  });
});

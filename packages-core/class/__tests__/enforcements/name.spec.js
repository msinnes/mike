const nameEnforcement = require('../../src/enforcements/name');

describe('nameEnforcement', () => {
  it('should be a function', () => {
    expect(nameEnforcement).toBeDefined();
    expect(nameEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error if input is a string', () => {
    expect(() => {
      nameEnforcement('name');
    }).not.toThrow();
  });

  it('should throw an error if an input is not a string', () => {
    expect(() => {
      nameEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      nameEnforcement({});
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      nameEnforcement();
    }).toThrowErrorMatchingSnapshot();
  });
});

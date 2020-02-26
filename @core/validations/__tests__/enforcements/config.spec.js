const configEnforcement = require('../../enforcements/config');

describe('configEnforcement', () => {
  it('should be a function', () => {
    expect(configEnforcement).toBeDefined();
    expect(configEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error', () => {
    expect(() => {
      configEnforcement();
    }).not.toThrow();
    expect(() => {
      configEnforcement({});
    }).not.toThrow();
    expect(() => {
      configEnforcement({ allowEmpty: true });
    }).not.toThrow();
    expect(() => {
      configEnforcement({ throwOnInvalid: true });
    }).not.toThrow();
    expect(() => {
      configEnforcement({ type: {
        is: () => {},
        message: 'message',
      } });
    }).not.toThrow();
    expect(() => {
      configEnforcement({ allowEmpty: true, throwOnInvalid: true, type: {
        is: () => {},
        message: 'message',
      } });
    }).not.toThrow();
  });

  it('should throw an error', () => {
    expect(() => {
      configEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      configEnforcement({ anyOtherKey: true });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      configEnforcement({ allowEmpty: 'not a boolean' });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      configEnforcement({ throwOnInvalid: 'not a boolean' });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      configEnforcement({ type: 'not an object' });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      configEnforcement({ type: {
        notAGoodKey: 'something else',
      } });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      configEnforcement({ type: {
        is: () => {},
      } });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      configEnforcement({ type: {
        message: 'message',
      } });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      configEnforcement({ type: {
        is: 'not a function',
        message: 'message',
      } });
    }).toThrowErrorMatchingSnapshot();
  });
});

const messageEnforcement = require('../../enforcements/message');

describe('messageEnforcement', () => {
  it('should be a function', () => {
    expect(messageEnforcement).toBeDefined();
    expect(messageEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error', () => {
    expect(() => {
      messageEnforcement('string');
    }).not.toThrow();
    expect(() => {
      messageEnforcement(function (){});
    }).not.toThrow();
  });

  it('should throw an error', () => {
    expect(() => {
      messageEnforcement();
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      messageEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      messageEnforcement({});
    }).toThrowErrorMatchingSnapshot();
  });
});

const BaseInterface = require('../../src/interface/base');

const assertInterface = require('../../src/interface/assert');

describe('assertInterface', () => {
  it('should be a function', () => {
    expect(assertInterface).toBeDefined();
    expect(assertInterface).toBeInstanceOf(Function);
  });

  it('should not throw an error if the input is an interface', () => {
    expect(() => {
      assertInterface(BaseInterface);
    }).not.toThrow();
  });

  it('should throw an error if input is not an interface', () => {
    expect(() => {
      assertInterface(undefined, 'message');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      assertInterface(null, 'message');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      assertInterface('', 'message');
    }).toThrowErrorMatchingSnapshot();
  });
});

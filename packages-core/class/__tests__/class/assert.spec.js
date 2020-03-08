const BaseClass = require('../../src/class/base');

const assertClass = require('../../src/class/assert');

describe('assertClass', () => {
  it('should be a function', () => {
    expect(assertClass).toBeDefined();
    expect(assertClass).toBeInstanceOf(Function);
  });

  it('should not throw an error if the input is a class', () => {
    expect(() => {
      assertClass(BaseClass);
    }).not.toThrow();
  });

  it('should throw an error if input is not a class', () => {
    expect(() => {
      assertClass(undefined, 'message');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      assertClass(null, 'message');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      assertClass('', 'message');
    }).toThrowErrorMatchingSnapshot();
  });
});

const isInterface = require('../../src/is/interface');

const iAdder = require('../../examples/interfaces/iAdder');
const iNamed = require('../../examples/interfaces/iNamed');

describe('isInterface', () => {
  it('should be a function', () => {
    expect(isInterface).toBeDefined();
    expect(isInterface).toBeInstanceOf(Function);
  });

  it('should return true if input is a class', () => {
    expect(isInterface(iAdder)).toBe(true);
    expect(isInterface(iNamed)).toBe(true);
  });

  it('should return false if input is not a class', () => {
    expect(isInterface()).toBe(false);
    expect(isInterface(null)).toBe(false);
    expect(isInterface('')).toBe(false);
  });
});

const isType = require('../../src/type/is');
const BaseType = require('../../src/type/base');

const instance = new BaseType('name', () => {});

describe('isType', () => {
  it('should be a function', () => {
    expect(isType).toBeDefined();
    expect(isType).toBeInstanceOf(Function);
  });

  it('should return true if input is a type', () => {
    expect(isType(instance)).toBe(true);
  });

  it('should return false if input is not a type', () => {
    expect(isType()).toBe(false);
    expect(isType(null)).toBe(false);
    expect(isType('')).toBe(false);
  });
});

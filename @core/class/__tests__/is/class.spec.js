const isClass = require('../../src/is/class');

const BareClass = require('../../examples/classes/BareClass');
const StaticClass = require('../../examples/classes/StaticClass');
const ProtoAndStaticClass = require('../../examples/classes/ProtoAndSaticClass');

describe('isClass', () => {
  it('should be a function', () => {
    expect(isClass).toBeDefined();
    expect(isClass).toBeInstanceOf(Function);
  });

  it('should return true if input is a class', () => {
    expect(isClass(BareClass)).toBe(true);
    expect(isClass(StaticClass)).toBe(true);
    expect(isClass(ProtoAndStaticClass)).toBe(true);
  });

  it('should return false if input is not a class', () => {
    expect(isClass()).toBe(false);
    expect(isClass(null)).toBe(false);
    expect(isClass('')).toBe(false);
  });
});

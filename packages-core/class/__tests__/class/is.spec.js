const BaseClass = require('../../src/class/base');
const isClass = require('../../src/class/is');

const inheritancePropFactory = require('../../src/factories/inheritanceProp');

function ExtendedClass() {}

ExtendedClass.Class = inheritancePropFactory('Class', ExtendedClass, {
  super: BaseClass.Class,
});

describe('isClass', () => {
  it('should be a function', () => {
    expect(isClass).toBeDefined();
    expect(isClass).toBeInstanceOf(Function);
  });

  it('should return true if input is a class', () => {
    expect(isClass(BaseClass)).toBe(true);
    expect(isClass(ExtendedClass)).toBe(true);
  });

  it('should return false if input is not a class', () => {
    expect(isClass()).toBe(false);
    expect(isClass(null)).toBe(false);
    expect(isClass('')).toBe(false);
  });
});

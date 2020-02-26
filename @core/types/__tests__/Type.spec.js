const { isType, loadType } = require('@core/class');

const TypeType = require('../Type');

describe('TypeType', () => {
  it('should be a type', () => {
    expect(TypeType).toBeDefined();
    expect(isType(TypeType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    const TestableType = loadType('name', () => {});
    expect(TypeType.is(TestableType)).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(TypeType.is('some other value')).toBe(false);
  });
});
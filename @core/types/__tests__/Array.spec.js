const { isType } = require('@core/class');

const ArrayType = require('../Array');

describe('ArrayType', () => {
  it('should be a type', () => {
    expect(ArrayType).toBeDefined();
    expect(isType(ArrayType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(ArrayType.is([])).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(ArrayType.is('some other value')).toBe(false);
  });
});

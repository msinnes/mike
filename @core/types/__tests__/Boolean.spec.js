const { isType } = require('@core/class');

const BooleanType = require('../Boolean');

describe('BooleanType', () => {
  it('should be a type', () => {
    expect(BooleanType).toBeDefined();
    expect(isType(BooleanType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(BooleanType.is(false)).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(BooleanType.is('some other value')).toBe(false);
  });
});

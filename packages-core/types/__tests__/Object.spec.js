const { isType } = require('@mike/class');

const ObjectType = require('../Object');

describe('ObjectType', () => {
  it('should be a type', () => {
    expect(ObjectType).toBeDefined();
    expect(isType(ObjectType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(ObjectType.is({})).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(ObjectType.is('some other value')).toBe(false);
  });
});
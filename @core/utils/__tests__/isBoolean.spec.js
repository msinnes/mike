const isBoolean = require('../isBoolean');

describe('isBoolean', () => {
  it('should be a function', () => {
    expect(isBoolean).toBeDefined();
    expect(isBoolean).toBeInstanceOf(Function);
  });

  it('should be return true for booleans', () => {
    expect(isBoolean(true)).toEqual(true);
    expect(isBoolean(false)).toEqual(true);
  });

  it('should return false if the check is not a boolean', ()=> {
    expect(isBoolean('string')).toEqual(false);
    expect(isBoolean(1e1)).toEqual(false);
    expect(isBoolean(NaN)).toEqual(false);
    expect(isBoolean(null)).toEqual(false);
    expect(isBoolean(undefined)).toEqual(false);
    expect(isBoolean(new Date())).toEqual(false);
    expect(isBoolean([])).toEqual(false);
    expect(isBoolean({})).toEqual(false);
  });
});
const isUndefined = require('../isUndefined');

describe('isUndefined', () => {
  it('should be a function', () => {
    expect(isUndefined).toBeDefined();
    expect(isUndefined).toBeInstanceOf(Function);
  });

  it('should be return true for undefined', () => {
    expect(isUndefined(undefined)).toEqual(true);
    expect(isUndefined()).toEqual(true);
  });

  it('should return false if the check is not undefined', ()=> {
    expect(isUndefined('')).toEqual(false);
    expect(isUndefined(1e1)).toEqual(false);
    expect(isUndefined(NaN)).toEqual(false);
    expect(isUndefined(null)).toEqual(false);
    expect(isUndefined(true)).toEqual(false);
    expect(isUndefined(() => {})).toEqual(false);
    expect(isUndefined({})).toEqual(false);
    expect(isUndefined([])).toEqual(false);
  });
});
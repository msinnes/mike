const isString = require('../isString');

describe('isString', () => {
  it('should be a function', () => {
    expect(isString).toBeDefined();
    expect(isString).toBeInstanceOf(Function);
  });

  it('should be return true for string literals', () => {
    expect(isString('')).toEqual(true);
    expect(isString('some string')).toEqual(true);
  });

  it('should return false if the check is not a string literal', ()=> {
    expect(isString()).toEqual(false);
    expect(isString(1e1)).toEqual(false);
    expect(isString(NaN)).toEqual(false);
    expect(isString(null)).toEqual(false);
    expect(isString(true)).toEqual(false);
    expect(isString(() => {})).toEqual(false);
    expect(isString({})).toEqual(false);
    expect(isString([])).toEqual(false);
  });
});
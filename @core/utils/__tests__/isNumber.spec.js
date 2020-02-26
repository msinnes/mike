const isNumber = require('../isNumber');

describe('isNumber', () => {
  it('should be a function', () => {
    expect(isNumber).toBeDefined();
    expect(isNumber).toBeInstanceOf(Function);
  });

  it('should be return true for numbers', () => {
    expect(isNumber(1)).toEqual(true);
    expect(isNumber(1e1)).toEqual(true);
    expect(isNumber(NaN)).toEqual(true);
    expect(isNumber(Infinity)).toEqual(true);
  });

  it('should return false if the check is not an object literal', ()=> {
    expect(isNumber('string')).toEqual(false);
    expect(isNumber(null)).toEqual(false);
    expect(isNumber(true)).toEqual(false);
    expect(isNumber(Function)).toEqual(false);
    expect(isNumber([])).toEqual(false);
    expect(isNumber(Date)).toEqual(false);
    expect(isNumber(new Function())).toEqual(false);
  });
});
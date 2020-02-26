const isNull = require('../isNull');

describe('isNull', () => {
  it('should be a function', () => {
    expect(isNull).toBeDefined();
    expect(isNull).toBeInstanceOf(Function);
  });

  it('should be return true for object literals', () => {
    expect(isNull(null)).toEqual(true);
  });

  it('should return false if the check is not an object literal', ()=> {
    expect(isNull('string')).toEqual(false);
    expect(isNull(1e1)).toEqual(false);
    expect(isNull(NaN)).toEqual(false);
    expect(isNull({})).toEqual(false);
    expect(isNull(true)).toEqual(false);
    expect(isNull(Function)).toEqual(false);
    expect(isNull([])).toEqual(false);
    expect(isNull(Date)).toEqual(false);
    expect(isNull(new Function())).toEqual(false);
  });
});
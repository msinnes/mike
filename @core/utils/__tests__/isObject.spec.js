const isObject = require('../isObject');

describe('isObject', () => {
  it('should be a function', () => {
    expect(isObject).toBeDefined();
    expect(isObject).toBeInstanceOf(Function);
  });

  it('should be return true for object literals', () => {
    expect(isObject({})).toEqual(true);
  });

  it('should return false if the check is not an object literal', ()=> {
    expect(isObject('string')).toEqual(false);
    expect(isObject(1e1)).toEqual(false);
    expect(isObject(NaN)).toEqual(false);
    expect(isObject(null)).toEqual(false);
    expect(isObject(true)).toEqual(false);
    expect(isObject(Function)).toEqual(false);
    expect(isObject([])).toEqual(false);
    expect(isObject(Date)).toEqual(false);
    expect(isObject(new Function())).toEqual(false);
  });
});
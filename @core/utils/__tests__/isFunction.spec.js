const isFunction = require('../isFunction');

describe('isFunction', () => {
  it('should be a function', () => {
    expect(isFunction).toBeDefined();
    expect(isFunction).toBeInstanceOf(Function);
  });

  it('should be return true for functions', () => {
    const func1 = new Function();

    expect(isFunction(() => {})).toEqual(true);
    expect(isFunction(func1)).toEqual(true);
  });

  it('should return false if the check is not a function', ()=> {
    expect(isFunction('string')).toEqual(false);
    expect(isFunction(1e1)).toEqual(false);
    expect(isFunction(NaN)).toEqual(false);
    expect(isFunction(null)).toEqual(false);
    expect(isFunction(undefined)).toEqual(false);
    expect(isFunction(new Date())).toEqual(false);
    expect(isFunction([])).toEqual(false);
    expect(isFunction({})).toEqual(false);
  });
});
const { isType } = require('@mike/class');

const FunctionType = require('../Function');

describe('FunctionType', () => {
  it('should be a type', () => {
    expect(FunctionType).toBeDefined();
    expect(isType(FunctionType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(FunctionType.is(function() {})).toBe(true);
    expect(FunctionType.is(() => {})).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(FunctionType.is('some other value')).toBe(false);
  });
});

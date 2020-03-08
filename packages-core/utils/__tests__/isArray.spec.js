const isArray = require('../isArray');

describe('isArray', () => {
  it('should be a function', () => {
    expect(isArray).toBeDefined();
    expect(isArray).toBeInstanceOf(Function);
  });

  it('should be Array.isArray', () => {
    expect(isArray).toEqual(Array.isArray);
  });
});
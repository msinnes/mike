const throwClassError = require('../../src/lib/throwClassError');

describe('throwClassError', () => {
  it('should be a function', () => {
    expect(throwClassError).toBeInstanceOf(Function);
  });

  it('should throw a class error', () => {
    expect(() => {
      throwClassError('some error text');
    }).toThrowErrorMatchingSnapshot();
  });
});

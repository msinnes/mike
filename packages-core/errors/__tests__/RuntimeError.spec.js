const RuntimeError = require('../RuntimeError');
const BaseError = require('../lib/BaseError');

describe('RuntimeError', () => {
  it('should be a function', () => {
    expect(RuntimeError).toBeDefined();
    expect(RuntimeError).toBeInstanceOf(Function);
  });

  it('should make instances of error', () => {
    expect(new RuntimeError()).toBeInstanceOf(Error);
    expect(new RuntimeError()).toBeInstanceOf(BaseError);
  });
});

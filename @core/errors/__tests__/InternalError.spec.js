const InternalError = require('../InternalError');
const BaseError = require('../lib/BaseError');

describe('InternalError', () => {
  it('should be a function', () => {
    expect(InternalError).toBeDefined();
    expect(InternalError).toBeInstanceOf(Function);
  });

  it('should make instances of error', () => {
    expect(new InternalError()).toBeInstanceOf(Error);
    expect(new InternalError()).toBeInstanceOf(BaseError);
  });
});

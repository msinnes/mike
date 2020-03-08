const ValidationError = require('../ValidationError');
const BaseError = require('../lib/BaseError');

describe('ValidationError', () => {
  it('should be a function', () => {
    expect(ValidationError).toBeDefined();
    expect(ValidationError).toBeInstanceOf(Function);
  });

  it('should make instances of error', () => {
    expect(new ValidationError()).toBeInstanceOf(Error);
    expect(new ValidationError()).toBeInstanceOf(BaseError);
  });
});

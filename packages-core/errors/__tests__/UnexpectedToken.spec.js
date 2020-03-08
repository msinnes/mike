const UnexpectedToken = require('../UnexpectedToken');
const BaseError = require('../lib/BaseError');

describe('UnexpectedToken', () => {
  it('should be a function', () => {
    expect(UnexpectedToken).toBeDefined();
    expect(UnexpectedToken).toBeInstanceOf(Function);
  });

  it('should make instances of error', () => {
    expect(new UnexpectedToken()).toBeInstanceOf(Error);
    expect(new UnexpectedToken()).toBeInstanceOf(BaseError);
  });
});

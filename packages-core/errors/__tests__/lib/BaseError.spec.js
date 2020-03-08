const BaseError = require('../../lib/BaseError');

describe('BaseError', () => {
  it('should be a function', () => {
    expect(BaseError).toBeDefined();
    expect(BaseError).toBeInstanceOf(Function);
  });

  it('should make instances of error', () => {
    expect(new BaseError()).toBeInstanceOf(Error);
  });

  it('should have a name property', () => {
    expect((new BaseError()).name).toEqual('BaseError');
  });

  it('should have a stack trace', () => {
    expect(typeof (new BaseError()).stack).toEqual('string');
  });

  it('the error message should prepend the error name', () => {
    expect((new BaseError('message')).message).toEqual('BaseError: message');
  });

  describe('BaseError.extend', () => {
    it('should be a function', () => {
      expect(BaseError.extend).toBeDefined();
      expect(BaseError.extend).toBeInstanceOf(Function);
    });

    it('should return an error', () => {
      function SomeError() {
        this.name = 'SomeError';
      }

      const SomeErrorExtended = BaseError.extend(SomeError);
      const error = new SomeErrorExtended('message');
      expect(error.name).toEqual('SomeError');
      expect(error.message).toEqual('SomeError: message');
    });
  });
});

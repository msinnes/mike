const ClassError = require('../ClassError');
const BaseError = require('../lib/BaseError');

describe('ClassError', () => {
  it('should be a function', () => {
    expect(ClassError).toBeDefined();
    expect(ClassError).toBeInstanceOf(Function);
  });

  it('should make instances of error', () => {
    expect(new ClassError()).toBeInstanceOf(Error);
    expect(new ClassError()).toBeInstanceOf(BaseError);
  });

  it('should express the correct error state', () => {
    try {
      throw new ClassError('message');
    } catch (e) {
      expect(e.name).toEqual('ClassError');
      expect(e.stack).toMatchSnapshot();
    }
  });
});

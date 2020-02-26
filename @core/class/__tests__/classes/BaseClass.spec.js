const BaseClass = require('../../src/classes/BaseClass');

jest.mock('../../src/lib/throwClassError');
const throwClassErrorMock = require('../../src/lib/throwClassError');

describe('BaseClass', () => {
  it('should be a function', () => {
    expect(BaseClass).toBeInstanceOf(Function);
  });

  it('should have an empty object on static BaseClass property', () => {
    expect(BaseClass.Class).toMatchObject({
      _constructor: BaseClass,
      _prototype: BaseClass.prototype,
    });
  });

  it('should not have any enumerable properties on its prototype', () => {
    expect(Object.keys(BaseClass.prototype).length).toEqual(0);
  });

  it('should prevent the constructor from being called like a function', () => {
    BaseClass();
    expect(throwClassErrorMock).toHaveBeenCalledTimes(1);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('Cannot call a class as a function');
  });
});

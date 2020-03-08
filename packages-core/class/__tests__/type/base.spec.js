const BaseType = require('../../src/type/base');

describe('BaseType', () => {
  const checkFnMock = jest.fn();
  let instance;
  beforeEach(() => {
    instance = new BaseType('name', checkFnMock);
  });

  it('should be a function', () => {
    expect(BaseType).toBeDefined();
    expect(BaseType).toBeInstanceOf(Function);
  });

  describe('instance', () => {
    it('should set instance._checkFn', () => {
      expect(instance._checkFn).toBeDefined();
      expect(instance._checkFn).toEqual(checkFnMock);
    });

    it('should have a name prop set to the constructor name', () => {
      expect(instance.name).toBeDefined();
      expect(instance.name).toEqual('name');
    });

    it('should have a message', () => {
      expect(instance.message).toBeDefined();
      expect(instance.message).toEqual('Expected name');
    });

    describe('instance', () => {
      describe('instance.is', () => {
        it('should have an is method', () => {
          expect(instance.is).toBeDefined();
          expect(instance.is).toBeInstanceOf(Function);
        });

        it('should call instance._checkFn and return the value', () => {
          const inputRef = {};
          const checkFnMockReturnRef = {};
          checkFnMock.mockReturnValue(checkFnMockReturnRef);
          const returnValue = instance.is(inputRef);
          expect(checkFnMock).toHaveBeenCalledTimes(1);
          expect(checkFnMock.mock.calls[0][0]).toEqual(inputRef);
          expect(returnValue).toEqual(checkFnMockReturnRef);
        });
      });
    });
  });
});
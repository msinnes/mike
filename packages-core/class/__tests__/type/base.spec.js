const BaseType = require('../../src/type/base');

describe('BaseType', () => {
  const checkFnMock = jest.fn();
  let instance;
  beforeEach(() => {
    instance = new BaseType('name', checkFnMock);
  });

  afterEach(jest.resetAllMocks);

  it('should be a function', () => {
    expect(BaseType).toBeDefined();
    expect(BaseType).toBeInstanceOf(Function);
  });

  describe('instance', () => {
    it('should set instance.checkFn', () => {
      expect(instance.checkFn).toBeDefined();
      expect(instance.checkFn).toEqual(checkFnMock);
    });

    it('should have a name prop set to the constructor name', () => {
      expect(instance.name).toBeDefined();
      expect(instance.name).toEqual('name');
    });

    it('should have a message', () => {
      expect(instance.message).toBeDefined();
      expect(instance.message).toEqual('Expected name');
    });

    describe('instance.extend', () => {
      it('should have an extend method', () => {
        expect(instance.extend).toBeDefined();
        expect(instance.extend).toBeInstanceOf(Function);
      });

      it('should call instance.checkFn and return the value', () => {
        const inputRef = {};
        checkFnMock.mockReturnValue(true);
        const newTypeInstance = instance.extend('new name', checkFnMock);
        expect(newTypeInstance).toBeInstanceOf(BaseType);
        const returnValue = newTypeInstance.is(inputRef);
        expect(checkFnMock).toHaveBeenCalledTimes(2);
        expect(checkFnMock.mock.calls[0][0]).toEqual(inputRef);
        expect(checkFnMock.mock.calls[1][0]).toEqual(inputRef);
        expect(returnValue).toEqual(true);
      });
    });

    describe('instance.is', () => {
      it('should have an is method', () => {
        expect(instance.is).toBeDefined();
        expect(instance.is).toBeInstanceOf(Function);
      });

      it('should call instance.checkFn and return the value', () => {
        const inputRef = {};
        const checkFnMockReturnRef = {};
        checkFnMock.mockReturnValue(checkFnMockReturnRef);
        const returnValue = instance.is(inputRef);
        expect(checkFnMock).toHaveBeenCalledTimes(1);
        expect(checkFnMock.mock.calls[0][0]).toEqual(inputRef);
        expect(returnValue).toEqual(checkFnMockReturnRef);
      });
    });

    describe('instance.nullable', () => {
      it('should have an nullable method', () => {
        expect(instance.nullable).toBeDefined();
        expect(instance.nullable).toBeInstanceOf(Function);
      });

      it('should return a new instance of BaseType', () => {
        const nullableType = instance.nullable();
        expect(nullableType).toBeInstanceOf(BaseType);
      });

      it('should return true if the input is null', () => {
        const nullableType = instance.nullable();
        expect(nullableType.is(null)).toBe(true);
        expect(checkFnMock).not.toHaveBeenCalled();
      });
    });
  });
});

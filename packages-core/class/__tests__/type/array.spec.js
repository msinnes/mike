const ArrayType = require('../../src/type/array');

jest.mock('@mike/utils/isArray');
const isArrayMock = require('@mike/utils/isArray');

describe('ArrayType', () => {
  const checkFnMock = jest.fn();
  let instance;
  beforeEach(() => {
    instance = new ArrayType('name', checkFnMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(ArrayType).toBeDefined();
    expect(ArrayType).toBeInstanceOf(Function);
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
      expect(instance.message).toEqual('Expected Array<name>');
    });

    describe('instance.is', () => {
      it('should have an is method', () => {
        expect(instance.is).toBeDefined();
        expect(instance.is).toBeInstanceOf(Function);
      });

      it('should call isArrayMock and instance.checkFn for each item in the input arry', () => {
        const itemRef = {};
        const inputRef = [itemRef, itemRef];
        isArrayMock.mockReturnValue(true);
        checkFnMock.mockReturnValue(true);
        const returnValue = instance.is(inputRef);
        expect(isArrayMock).toHaveBeenCalledTimes(1);
        expect(isArrayMock.mock.calls[0][0]).toEqual(inputRef);
        expect(checkFnMock).toHaveBeenCalledTimes(2);
        expect(checkFnMock.mock.calls[0][0]).toEqual(itemRef);
        expect(checkFnMock.mock.calls[1][0]).toEqual(itemRef);
        expect(returnValue).toBe(true);
      });
    });

    describe('instance.nullable', () => {
      it('should have an nullable method', () => {
        expect(instance.nullable).toBeDefined();
        expect(instance.nullable).toBeInstanceOf(Function);
      });

      it('should return a new instance of ArrayType', () => {
        const nullableType = instance.nullable();
        expect(nullableType).toBeInstanceOf(ArrayType);
      });

      it('should return true if the input is null', () => {
        const nullableType = instance.nullable();
        expect(nullableType.is(null)).toBe(true);
        expect(isArrayMock).not.toHaveBeenCalled();
        expect(checkFnMock).not.toHaveBeenCalled();
      });
    });
  });
});

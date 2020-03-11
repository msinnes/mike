const typeLoader = require('../../src/loaders/type');

const ObjectType = require('../../src/type/object');

jest.mock('@mike/utils/isObject');
const isObjectMock = require('@mike/utils/isObject');

describe('ObjectType', () => {
  const checkFnMock = jest.fn();
  const typeIsMock = jest.fn();
  let instance;
  beforeEach(() => {
    const field1Type = typeLoader('field1Type', function() {});
    const field2Type = typeLoader('field2Type', function() {});

    field1Type.is = typeIsMock;
    field2Type.is = typeIsMock;

    instance = new ObjectType('name', {
      field1: field1Type,
      field2: field2Type,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(ObjectType).toBeDefined();
    expect(ObjectType).toBeInstanceOf(Function);
  });

  describe('instance', () => {
    it('should set instance.checkFn', () => {
      expect(instance.checkFn).toBeDefined();
      expect(instance.checkFn).toBeInstanceOf(Function);
    });

    it('should have a name prop set to the constructor name', () => {
      expect(instance.name).toBeDefined();
      expect(instance.name).toEqual('name');
    });

    it('should have a message', () => {
      expect(instance.message).toBeDefined();
      expect(instance.message).toEqual('Expected Object name<{\nfield1: field1Type\nfield2: field2Type\n}>');
    });

    describe('instance.is', () => {
      it('should have an is method', () => {
        expect(instance.is).toBeDefined();
        expect(instance.is).toBeInstanceOf(Function);
      });

      it('should call isObjectMock and instance.checkFn for each item in the input arry', () => {
        const localInstance = new ObjectType('name', {});
        const inputRef = {};
        isObjectMock.mockReturnValue(true);
        checkFnMock.mockReturnValue(true);
        localInstance.checkFn = checkFnMock;
        const returnValue = localInstance.is(inputRef);
        expect(isObjectMock).toHaveBeenCalledTimes(1);
        expect(isObjectMock.mock.calls[0][0]).toEqual(inputRef);
        expect(checkFnMock).toHaveBeenCalledTimes(1);
        expect(checkFnMock.mock.calls[0][0]).toEqual(inputRef);
        expect(returnValue).toBe(true);
      });

      it('should call each type.is mock', () => {
        const field1Ref = {};
        const field2Ref = {};
        isObjectMock.mockReturnValue(true);
        instance.is({
          field1: field1Ref,
          field2: field2Ref,
        });
        typeIsMock.mockReturnValue(true);
        expect(typeIsMock).toHaveBeenCalledTimes(2);
        expect(typeIsMock.mock.calls[0][0]).toEqual(field1Ref);
        expect(typeIsMock.mock.calls[1][0]).toEqual(field2Ref);
      });
    });

    describe('instance.nullable', () => {
      it('should have an nullable method', () => {
        expect(instance.nullable).toBeDefined();
        expect(instance.nullable).toBeInstanceOf(Function);
      });

      it('should return a new instance of ObjectType', () => {
        const nullableType = instance.nullable();
        expect(nullableType).toBeInstanceOf(ObjectType);
      });

      it('should return true if the input is null', () => {
        const nullableType = instance.nullable();
        expect(nullableType.is(null)).toBe(true);
        expect(isObjectMock).not.toHaveBeenCalled();
        expect(checkFnMock).not.toHaveBeenCalled();
      });
    });
  });
});

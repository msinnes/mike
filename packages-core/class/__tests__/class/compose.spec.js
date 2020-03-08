const isFunction = require('@mike/utils/isFunction');
const isNumber = require('@mike/utils/isNumber');

const composeClass = require('../../src/class/compose');
const BaseClass = require('../../src/class/base');

const ObjectCreateMock = jest.fn();
const ObjectAssignMock = jest.fn();

const _constructorRef = function() {};
const ClassConstructorRef = function() {};

jest.mock('../../src/factories/inheritanceProp');
const inheritancePropFactoryMock = require('../../src/factories/inheritanceProp');
jest.mock('../../src/class/extend');
const extendClassMock = require('../../src/class/extend');
jest.mock('../../src/class/extends');
const extendsClassMock = require('../../src/class/extends');
jest.mock('../../src/class/assert');
const assertClassMock = require('../../src/class/assert');
jest.mock('../../src/class/implement');
const implementInterfaceMock = require('../../src/class/implement');
jest.mock('../../src/class/implements');
const implementsInterfaceMock = require('../../src/class/implements');
jest.mock('../../src/interface/assert');
const assertInterfaceMock = require('../../src/interface/assert');

const interfaceLoader = require('../../src/loaders/interface');
const typeLoader = require('../../src/loaders/type');

const FunctionType = typeLoader('Function', isFunction);
const NumberType = typeLoader('Number', isNumber);

const iAdder = interfaceLoader({
  value: NumberType,
  addOne: FunctionType,
  addTwo: FunctionType,
});

describe('composeClass', () => {
  const ObjectCreateOriginal = Object.create;
  const ObjectAssignOriginal = Object.assign;
  beforeEach(() => {
    Object.create = ObjectCreateMock;
    Object.assign = ObjectAssignMock;

    extendClassMock.mockReturnValue({});
    implementInterfaceMock.mockReturnValue({});
    ObjectCreateMock.mockImplementation(ObjectCreateOriginal);
    ObjectAssignMock.mockImplementation(ObjectAssignOriginal);
  });
  afterEach(() => {
    Object.create = ObjectCreateOriginal;
    Object.assign = ObjectAssignOriginal;
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(composeClass).toBeDefined();
    expect(composeClass).toBeInstanceOf(Function);
  });

  it('should call ObjectCreateMock with BaseClass.prototype', () => {
    composeClass(_constructorRef, ClassConstructorRef, BaseClass);
    expect(ObjectCreateMock).toHaveBeenCalledTimes(1);
    expect(ObjectCreateMock.mock.calls[0][0]).toEqual(BaseClass.prototype);
  });

  it('should call ObjectAssignMock twice', () => {
    composeClass(_constructorRef, ClassConstructorRef, BaseClass);
    expect(ObjectAssignMock).toHaveBeenCalledTimes(2);
    expect(ObjectAssignMock.mock.calls[0][0]).toEqual(ClassConstructorRef.prototype);
    expect(ObjectAssignMock.mock.calls[0][1]).toEqual(_constructorRef.prototype);
    expect(ObjectAssignMock.mock.calls[1][0]).toEqual(ClassConstructorRef);
    expect(ObjectAssignMock.mock.calls[1][1]).toEqual(_constructorRef);
  });

  it('should call the inheritancePropFactory', () => {
    composeClass(_constructorRef, ClassConstructorRef, BaseClass);
    expect(inheritancePropFactoryMock).toHaveBeenCalledTimes(1);
    expect(inheritancePropFactoryMock.mock.calls[0][0]).toEqual('Class');
    expect(inheritancePropFactoryMock.mock.calls[0][1]).toEqual(ClassConstructorRef);
    expect(inheritancePropFactoryMock.mock.calls[0][2]).toEqual({ _super: BaseClass.Class });
  });

  describe('returns', () => {
    const result = composeClass(_constructorRef, ClassConstructorRef, BaseClass);
    it('should return the ClassConstructorRef', () => {
      expect(result).toEqual(ClassConstructorRef);
    });

    it('should have an extends property', () => {
      expect(result.extends).toBeDefined();
    });

    it('extends should not be enumerable on the Class', () => {
      expect(Object.keys(result).indexOf('extends')).toEqual(-1);
    });

    it('extends should call the assertClass function', () => {
      result.extends(BaseClass);
      expect(assertClassMock).toHaveBeenCalledTimes(1);
      expect(assertClassMock.mock.calls[0][0]).toEqual(BaseClass);
    });

    it('should call the extendsClass function', () => {
      result.extends(BaseClass);
      expect(extendsClassMock).toHaveBeenCalledTimes(1);
      expect(extendsClassMock.mock.calls[0][0]).toEqual(ClassConstructorRef);
      expect(extendsClassMock.mock.calls[0][1]).toEqual(BaseClass);
    });

    it('should have an extend property', () => {
      expect(result.extend).toBeDefined();
    });

    it('extend should not be enumerable on the Class', () => {
      expect(Object.keys(result).indexOf('extend')).toEqual(-1);
    });

    it('extend should call the assertClass function', () => {
      result.extend(BaseClass);
      expect(assertClassMock).toHaveBeenCalledTimes(1);
      expect(assertClassMock.mock.calls[0][0]).toEqual(BaseClass);
    });

    it('extends should call the extendClass function', () => {
      result.extend(BaseClass);
      expect(extendClassMock).toHaveBeenCalled();
      expect(extendClassMock.mock.calls[0][0]).toEqual(ClassConstructorRef);
      expect(extendClassMock.mock.calls[0][1]).toEqual(BaseClass);
    });

    it('should have an implement property', () => {
      expect(result.implement).toBeDefined();
    });

    it('implement should not be enumerable on the Class', () => {
      expect(Object.keys(result).indexOf('implement')).toEqual(-1);
    });

    it('implement should call the assertClass function', () => {
      result.implement(iAdder);
      expect(assertInterfaceMock).toHaveBeenCalledTimes(1);
      expect(assertInterfaceMock.mock.calls[0][0]).toEqual(iAdder);
    });

    it('implements should call the implementInterfaceMock function', () => {
      result.implement(iAdder);
      expect(implementInterfaceMock).toHaveBeenCalled();
      expect(implementInterfaceMock.mock.calls[0][0]).toEqual(ClassConstructorRef);
      expect(implementInterfaceMock.mock.calls[0][1]).toEqual(iAdder);
    });

    it('should have an implements property', () => {
      expect(result.implements).toBeDefined();
    });

    it('implements should not be enumerable on the Class', () => {
      expect(Object.keys(result).indexOf('implements')).toEqual(-1);
    });

    it('implements should call the assertClass function', () => {
      result.implements(iAdder);
      expect(assertInterfaceMock).toHaveBeenCalledTimes(1);
      expect(assertInterfaceMock.mock.calls[0][0]).toEqual(iAdder);
    });

    it('implements should call the implementsInterfaceMock function', () => {
      result.implements(iAdder);
      expect(implementsInterfaceMock).toHaveBeenCalled();
      expect(implementsInterfaceMock.mock.calls[0][0]).toEqual(ClassConstructorRef);
      expect(implementsInterfaceMock.mock.calls[0][1]).toEqual(iAdder);
    });
  });
});
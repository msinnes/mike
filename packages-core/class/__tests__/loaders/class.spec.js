const classLoader = require('../../src/loaders/class');

const BaseClass = require('../../src/class/base');

const ObjectCreateMock = jest.fn();
const ObjectAssignMock = jest.fn();

const _constructorRef = function() {};

jest.mock('@mike/utils/privateVariable');
const privateVariableMock = require('@mike/utils/privateVariable');
const privateVariableActual = jest.requireActual('@mike/utils/privateVariable');
jest.mock('../../src/factories/inheritanceProp');
const inheritancePropFactoryMock = require('../../src/factories/inheritanceProp');
const inheritancePropFactoryActual = jest.requireActual('../../src/factories/inheritanceProp');
jest.mock('../../src/class/extend');
const extendMock = require('../../src/class/extend');
const extendActual = jest.requireActual('../../src/class/extend');
jest.mock('../../src/class/extends');
const extendsClassMock = require('../../src/class/extends');
const extendsClassActual = jest.requireActual('../../src/class/extends');
jest.mock('../../src/class/assert');
const assertClassMock = require('../../src/class/assert');
jest.mock('../../src/enforcements/constructor');
const constructorEnforcementMock = require('../../src/enforcements/constructor');

describe('classLoader', () => {
  const ObjectCreateOriginal = Object.create;
  const ObjectAssignOriginal = Object.assign;
  beforeEach(() => {
    jest.resetAllMocks();
    Object.create = ObjectCreateMock;
    Object.assign = ObjectAssignMock;

    ObjectCreateMock.mockImplementation(ObjectCreateOriginal);
    ObjectAssignMock.mockImplementation(ObjectAssignOriginal);
    privateVariableMock.mockImplementation(privateVariableActual);
    inheritancePropFactoryMock.mockImplementation(inheritancePropFactoryActual);
    extendMock.mockImplementation(extendActual);
    extendsClassMock.mockImplementation(extendsClassActual);
    BaseClass.Class = {};
  });

  afterEach(() => {
    Object.create = ObjectCreateOriginal;
    Object.assign = ObjectAssignOriginal;
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(classLoader).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const checkFnRef = {};
    const nullableRef = {};
    classLoader(checkFnRef, nullableRef);
    expect(constructorEnforcementMock).toHaveBeenCalledTimes(1);
    expect(constructorEnforcementMock.mock.calls[0][0]).toEqual(checkFnRef);
  });

  it('should call ObjectCreateMock with BaseClass.prototype', () => {
    classLoader(_constructorRef);
    expect(ObjectCreateMock).toHaveBeenCalledTimes(1);
    expect(ObjectCreateMock.mock.calls[0][0]).toEqual(BaseClass.prototype);
  });

  it('should call ObjectAssignMock twice', () => {
    const ClassConstructor = classLoader(_constructorRef);
    expect(ObjectAssignMock).toHaveBeenCalledTimes(2);
    expect(ObjectAssignMock.mock.calls[0][0]).toEqual(ClassConstructor.prototype);
    expect(ObjectAssignMock.mock.calls[0][1]).toEqual(_constructorRef.prototype);
    expect(ObjectAssignMock.mock.calls[1][0]).toEqual(ClassConstructor);
    expect(ObjectAssignMock.mock.calls[1][1]).toEqual(_constructorRef);
  });

  it('should call the classPropFactory', () => {
    const ClassConstructor = classLoader(_constructorRef);
    expect(inheritancePropFactoryMock).toHaveBeenCalledTimes(1);
    expect(inheritancePropFactoryMock.mock.calls[0][0]).toEqual('Class');
    expect(inheritancePropFactoryMock.mock.calls[0][1]).toEqual(ClassConstructor);
    expect(inheritancePropFactoryMock.mock.calls[0][2]).toEqual({ super: BaseClass.Class });
  });

  it('should call the extendsClass function', () => {
    const ClassConstructor = classLoader(_constructorRef);
    ClassConstructor.extends(BaseClass);
    expect(extendsClassMock).toHaveBeenCalledTimes(1);
    expect(extendsClassMock.mock.calls[0][0]).toEqual(ClassConstructor);
    expect(extendsClassMock.mock.calls[0][1]).toEqual(BaseClass);
  });

  it('should have an extend property', () => {
    const ClassConstructor = classLoader(_constructorRef);
    expect(ClassConstructor.extend).toBeDefined();
  });

  it('extend should not be enumerable on the Class', () => {
    const ClassConstructor = classLoader(_constructorRef);
    expect(Object.keys(ClassConstructor).indexOf('extend')).toEqual(-1);
  });

  it('extend should call the assertClass function', () => {
    const ClassConstructor = classLoader(_constructorRef);
    const SuperClass = classLoader(function() {});
    ClassConstructor.extend(SuperClass);
    expect(assertClassMock).toHaveBeenCalledTimes(1);
    expect(assertClassMock.mock.calls[0][0]).toEqual(SuperClass);
  });

  it('extends should call the extend function', () => {
    const ClassConstructor = classLoader(_constructorRef);
    const SuperClass = classLoader(function() {});
    ClassConstructor.extend(SuperClass);
    expect(extendMock).toHaveBeenCalled();
    expect(extendMock.mock.calls[0][0]).toEqual(ClassConstructor);
    expect(extendMock.mock.calls[0][1]).toEqual(SuperClass);
  });

  describe('loadClass output', () => {
    let LoadedBare, LoadedStatic, LoadedProtoAndStatic;
    beforeEach(() => {
      function Bare() {}

      function Static() {}
      Static.value = 'name';

      function ProtoAndStatic() {}

      ProtoAndStatic.value = 1;
      ProtoAndStatic.prototype.add = function(x, y) {
        return x + y;
      };

      LoadedBare = classLoader(Bare);
      LoadedStatic = classLoader(Static);
      LoadedProtoAndStatic = classLoader(ProtoAndStatic);
    });

    it('should not change the static props and add constructor to prototype', () => {
      expect(Object.keys(LoadedBare).length).toEqual(0);
      expect(Object.keys(LoadedBare.prototype).length).toEqual(1);
      expect(Object.keys(LoadedStatic).length).toEqual(1);
      expect(Object.keys(LoadedStatic.prototype).length).toEqual(1);
      expect(Object.keys(LoadedProtoAndStatic).length).toEqual(1);
      expect(Object.keys(LoadedProtoAndStatic.prototype).length).toEqual(2);
    });

    it('the class prop should not be enumerable on the class', () => {
      expect(Object.keys(LoadedBare).indexOf('Class')).toEqual(-1);
      expect(Object.keys(LoadedStatic).indexOf('Class')).toEqual(-1);
      expect(Object.keys(LoadedProtoAndStatic).indexOf('Class')).toEqual(-1);
    });

    it('should retain static properties', () => {
      expect(LoadedProtoAndStatic.value).toEqual(1);
    });

    it('should not be callable as a function', () => {
      expect(() => {
        LoadedBare();
      }).toThrowErrorMatchingSnapshot();
      expect(() => {
        LoadedStatic();
      }).toThrowErrorMatchingSnapshot();
      expect(() => {
        LoadedProtoAndStatic();
      }).toThrowErrorMatchingSnapshot();
    });

    describe('instances', () => {
      let instance;

      beforeEach(() => {
        instance = new LoadedProtoAndStatic();
      });

      it('should be an instance of BaseClass', () => {
        expect(instance).toBeInstanceOf(BaseClass);
      });

      it('should have the correct Class prop', () => {
        expect(LoadedProtoAndStatic.Class).toMatchObject({
          _constructor: LoadedProtoAndStatic,
          _prototype: LoadedProtoAndStatic.prototype,
          _super: BaseClass.Class,
        });
      });

      it('should get prototype properties on instances', () => {
        expect(instance.add).toBeInstanceOf(Function);
        expect(instance.add(1, 1)).toEqual(2);
      });

      it('should inherit prototype and static properties through extension', () => {
        const ExtendedProtoAndStatic = LoadedStatic.extend(LoadedProtoAndStatic);
        const BareExtendsAll = LoadedBare.extend(ExtendedProtoAndStatic);
        expect(BareExtendsAll.value).toEqual('name');
        const instance = new BareExtendsAll();
        expect(instance.add(1, 1)).toEqual(2);
        expect(instance).toBeInstanceOf(ExtendedProtoAndStatic);
        expect(instance).toBeInstanceOf(LoadedProtoAndStatic);
        expect(instance).toBeInstanceOf(BaseClass);
      });
    });
  });
});

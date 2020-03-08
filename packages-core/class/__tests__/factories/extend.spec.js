const extendFactory = require('../../src/factories/extend');

const BaseClass = require('../../src/class/base');

jest.mock('../../src/factories/inheritanceProp');
const inheritancePropFactoryMock = require('../../src/factories/inheritanceProp');
jest.mock('@mike/utils/privateVariable');
const privateVariableMock = require('@mike/utils/privateVariable');

describe('extendFactory', () => {
  const returnRef = function() {};
  const constructorFnMock = jest.fn();

  const childProtoRef = {};
  const superProtoRef = {};
  const childRef = {
    type: {
      _prototype: childProtoRef,
    },
  };
  const superRef = {
    type: {
      _prototype: superProtoRef,
    },
  };
  const abstractRef = {};

  let ObjectCreateMock;
  let ObjectCreateOriginal;
  let ObjectAssignMock;
  let ObjectAssignOriginal;

  beforeEach(() => {
    ObjectAssignOriginal = Object.assign;
    ObjectAssignMock = jest.fn();
    Object.assign = ObjectAssignMock;
    ObjectCreateOriginal = Object.create;
    ObjectCreateMock = jest.fn();
    Object.create = ObjectCreateMock;

    constructorFnMock.mockReturnValue(returnRef);
    ObjectAssignMock.mockImplementation(ObjectAssignOriginal);
    ObjectCreateMock.mockImplementation(ObjectCreateOriginal);
  });

  afterEach(() => {
    jest.resetAllMocks();
    Object.assign = ObjectAssignOriginal;
    Object.create = ObjectCreateOriginal;
  });

  it('should be a function', () => {
    expect(extendFactory).toBeDefined();
    expect(extendFactory).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const extendInstance = extendFactory('type', constructorFnMock);
    expect(extendInstance).toBeDefined();
    expect(extendInstance).toBeInstanceOf(Function);
  });

  it('should call the constructorFnMock', () => {
    const extendInstance = extendFactory('type', constructorFnMock);
    extendInstance(childRef, superRef, abstractRef);
    expect(constructorFnMock).toHaveBeenCalledTimes(1);
    expect(constructorFnMock).toHaveBeenCalledWith(childRef, superRef, abstractRef);
  });

  it('should return the mock return value', () => {
    const extendInstance = extendFactory('type', constructorFnMock);
    expect(extendInstance(childRef, superRef, abstractRef)).toEqual(returnRef);
  });

  it('should call the object assign and object create mocks', () => {
    const extendInstance = extendFactory('type', constructorFnMock);
    extendInstance(childRef, superRef, abstractRef);
    expect(ObjectCreateMock).toHaveBeenCalledTimes(1);
    expect(ObjectCreateMock.mock.calls[0][0]).toEqual(superProtoRef);
    expect(ObjectAssignMock).toHaveBeenCalledTimes(3);
    expect(ObjectAssignMock.mock.calls[0][0]).toEqual(returnRef.prototype);
    expect(ObjectAssignMock.mock.calls[0][1]).toEqual(childProtoRef);
    expect(ObjectAssignMock.mock.calls[1][0]).toEqual(returnRef);
    expect(ObjectAssignMock.mock.calls[1][1]).toEqual(superRef);
    expect(ObjectAssignMock.mock.calls[2][0]).toEqual(returnRef);
    expect(ObjectAssignMock.mock.calls[2][1]).toEqual(childRef);
  });

  it('should call the inheritancePropFactoryMock', () => {
    const extendInstance = extendFactory('type', constructorFnMock);
    extendInstance(childRef, superRef, abstractRef);
    expect(inheritancePropFactoryMock).toHaveBeenCalledTimes(1);
    expect(inheritancePropFactoryMock).toHaveBeenCalledWith('type', returnRef, {
      super: superRef.type,
    });
  });

  it('should call the privateVariableMock', () => {
    const inheritancePropReturnRef = {};
    const extendInstance = extendFactory('type', constructorFnMock);
    inheritancePropFactoryMock.mockReturnValue(inheritancePropReturnRef);
    extendInstance(childRef, superRef, abstractRef);
    expect(privateVariableMock).toHaveBeenCalledTimes(1);
    expect(privateVariableMock).toHaveBeenCalledWith(returnRef, 'type', inheritancePropReturnRef);
  });
});
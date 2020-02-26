const BaseType = require('../../src/classes/BaseType');

const typeLoader = require('../../src/loaders/type');

jest.mock('../../src/enforcements/name');
const nameEnforcementMock = require('../../src/enforcements/name');
jest.mock('../../src/enforcements/checkFn');
const checkFnEnforcementMock = require('../../src/enforcements/checkFn');
jest.mock('../../src/enforcements/nullable');
const nullableEnforcementMock = require('../../src/enforcements/nullable');

describe('typeLoader', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(typeLoader).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const checkFnRef = {};
    const nullableRef = {};
    const nameRef = {};
    typeLoader(nameRef, checkFnRef, nullableRef);
    expect(nameEnforcementMock).toHaveBeenCalledTimes(1);
    expect(nameEnforcementMock.mock.calls[0][0]).toEqual(nameRef);
    expect(checkFnEnforcementMock).toHaveBeenCalledTimes(1);
    expect(checkFnEnforcementMock.mock.calls[0][0]).toEqual(checkFnRef);
    expect(nullableEnforcementMock).toHaveBeenCalledTimes(1);
    expect(nullableEnforcementMock.mock.calls[0][0]).toEqual(nullableRef);
  });

  it('should return an instance of BaseType', () => {
    const instance = typeLoader('name', () => {});
    expect(instance).toBeInstanceOf(BaseType);
  });

  it('should pass the nullable arg', () => {
    const instance = typeLoader('name', () => {}, true);
    expect(instance._nullable).toBe(true);
  });

  it('should pass the name arg', () => {
    const instance = typeLoader('name', () => {}, true);
    expect(instance.name).toBe('name');
  });
});

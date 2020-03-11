const ArrayType = require('../../src/type/array');

const arrayTypeLoader = require('../../src/loaders/arrayType');

jest.mock('../../src/enforcements/name');
const nameEnforcementMock = require('../../src/enforcements/name');
jest.mock('../../src/enforcements/checkFn');
const checkFnEnforcementMock = require('../../src/enforcements/checkFn');

describe('arrayTypeLoader', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(arrayTypeLoader).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const checkFnRef = {};
    const nameRef = {};
    arrayTypeLoader(nameRef, checkFnRef);
    expect(nameEnforcementMock).toHaveBeenCalledTimes(1);
    expect(nameEnforcementMock.mock.calls[0][0]).toEqual(nameRef);
    expect(checkFnEnforcementMock).toHaveBeenCalledTimes(1);
    expect(checkFnEnforcementMock.mock.calls[0][0]).toEqual(checkFnRef);
  });

  it('should return an instance of ArrayType', () => {
    const instance = arrayTypeLoader('name', () => {});
    expect(instance).toBeInstanceOf(ArrayType);
  });

  it('should pass the name arg', () => {
    const instance = arrayTypeLoader('name', () => {});
    expect(instance.name).toBe('name');
  });
});

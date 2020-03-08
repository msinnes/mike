const BaseType = require('../../src/type/base');

const typeLoader = require('../../src/loaders/type');

jest.mock('../../src/enforcements/name');
const nameEnforcementMock = require('../../src/enforcements/name');
jest.mock('../../src/enforcements/checkFn');
const checkFnEnforcementMock = require('../../src/enforcements/checkFn');

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
    const nameRef = {};
    typeLoader(nameRef, checkFnRef);
    expect(nameEnforcementMock).toHaveBeenCalledTimes(1);
    expect(nameEnforcementMock.mock.calls[0][0]).toEqual(nameRef);
    expect(checkFnEnforcementMock).toHaveBeenCalledTimes(1);
    expect(checkFnEnforcementMock.mock.calls[0][0]).toEqual(checkFnRef);
  });

  it('should return an instance of BaseType', () => {
    const instance = typeLoader('name', () => {});
    expect(instance).toBeInstanceOf(BaseType);
  });

  it('should pass the name arg', () => {
    const instance = typeLoader('name', () => {});
    expect(instance.name).toBe('name');
  });
});

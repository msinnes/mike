const MapType = require('../../src/type/map');

const mapTypeLoader = require('../../src/loaders/mapType');

jest.mock('../../src/enforcements/name');
const nameEnforcementMock = require('../../src/enforcements/name');
jest.mock('../../src/enforcements/checkFn');
const checkFnEnforcementMock = require('../../src/enforcements/checkFn');

describe('mapTypeLoader', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(mapTypeLoader).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const checkFnRef = {};
    const nameRef = {};
    mapTypeLoader(nameRef, checkFnRef);
    expect(nameEnforcementMock).toHaveBeenCalledTimes(1);
    expect(nameEnforcementMock.mock.calls[0][0]).toEqual(nameRef);
    expect(checkFnEnforcementMock).toHaveBeenCalledTimes(1);
    expect(checkFnEnforcementMock.mock.calls[0][0]).toEqual(checkFnRef);
  });

  it('should return an instance of MapType', () => {
    const instance = mapTypeLoader('name', () => {});
    expect(instance).toBeInstanceOf(MapType);
  });

  it('should pass the name arg', () => {
    const instance = mapTypeLoader('name', () => {});
    expect(instance.name).toBe('name');
  });
});

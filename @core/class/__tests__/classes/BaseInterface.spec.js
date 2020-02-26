const BaseInterface = require('../../src/classes/BaseInterface');

jest.mock('../../src/lib/throwClassError');
const throwClassErrorMock = require('../../src/lib/throwClassError');
const throwClassErrorActual = jest.requireActual('../../src/lib/throwClassError');
jest.mock('../../src/lib/ensure');
const ensureMock = require('../../src/lib/ensure');

describe('BaseInterface', () => {
  beforeEach(() => {
    throwClassErrorMock.mockImplementation(throwClassErrorActual);
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(BaseInterface).toBeInstanceOf(Function);
  });

  it('should have an empty object on static BaseInterface property', () => {
    expect(BaseInterface.Interface).toBeDefined();
    expect(BaseInterface.Interface).toMatchObject({});
  });

  it('should not have any enumerable properties on its prototype', () => {
    expect(Object.keys(BaseInterface.prototype).length).toEqual(0);
  });

  it('should prevent the constructor from being called like a function', () => {
    expect(() => {
      BaseInterface();
    }).toThrowErrorMatchingSnapshot();
    expect(throwClassErrorMock).toHaveBeenCalledTimes(1);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('Cannot call an interface as a function');
  });

  it('should not be callable as a constructor', () => {
    expect(() => {
      new BaseInterface();
    }).toThrowErrorMatchingSnapshot();
    expect(throwClassErrorMock).toHaveBeenCalledTimes(1);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('Interfaces are not constructors');
  });

  describe('Interface.ensure', () => {
    it('should be a function', () => {
      expect(BaseInterface.ensure).toBeDefined();
      expect(BaseInterface.ensure).toBeInstanceOf(Function);
    });

    it('should call ensureMock with the args', () => {
      const instanceRef = {};
      const interfaceRef = {};
      BaseInterface.ensure(instanceRef, interfaceRef);
      expect(ensureMock).toHaveBeenCalledTimes(1);
      expect(ensureMock.mock.calls[0][0]).toEqual(instanceRef);
      expect(ensureMock.mock.calls[0][1]).toEqual(interfaceRef);
    });
  });
});

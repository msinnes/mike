const interfaceLoader = require('../../src/loaders/interface');

jest.mock('../../src/enforcements/interfaceConfig');
const interfaceConfigEnforcementMock = require('../../src/enforcements/interfaceConfig');
jest.mock('../../src/interface/compose');
const composeInterfaceMock = require('../../src/interface/compose');

describe('interfaceLoader', () => {
  let LoadedInterface;
  const field1Ref = {};
  const field2Ref = {};
  const interfaceConfigRef = {
    field1: field1Ref,
    field2: field2Ref,
  };

  beforeEach(() => {
    LoadedInterface = interfaceLoader(interfaceConfigRef);
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(interfaceLoader).toBeInstanceOf(Function);
  });

  it('should not be callable as a function', () => {
    expect(() => {
      LoadedInterface();
    }).toThrowErrorMatchingSnapshot();
  });

  it('should not be instantiable', () => {
    expect(() => {
      new LoadedInterface();
    }).toThrowErrorMatchingSnapshot();
  });

  it('should call the enforcement mocks', () => {
    jest.resetAllMocks();
    const interfaceConfigRef = {};
    interfaceLoader(interfaceConfigRef);
    expect(interfaceConfigEnforcementMock).toHaveBeenCalledTimes(1);
    expect(interfaceConfigEnforcementMock.mock.calls[0][0]).toEqual(interfaceConfigRef);
  });

  it('should call the composeInterfaceMock', () => {
    jest.resetAllMocks();
    const interfaceConfigRef = {};
    interfaceLoader(interfaceConfigRef);
    expect(composeInterfaceMock).toHaveBeenCalledTimes(1);
    expect(composeInterfaceMock.mock.calls[0][0]).toEqual(interfaceConfigRef);
  });
});
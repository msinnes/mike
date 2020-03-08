const composeInterface = require('../../src/interface/compose');
const extendsInterface = require('../../src/interface/extends');

const BaseInterfaceEnsureMock = jest.fn();
const BaseInterface = require('../../src/interface/base');
BaseInterface.ensure = BaseInterfaceEnsureMock;

jest.mock('../../src/interface/assert');
const assertInterfaceMock = require('../../src/interface/assert');

describe('composeInterface', () => {
  const iAdder = composeInterface({});
  const iNamed = composeInterface({});

  let LoadedInterface;
  const instanceRef = {};
  const field1Ref = { is: jest.fn().mockReturnValue(true) };
  const field2Ref = { is: jest.fn().mockReturnValue(true) };
  const interfaceConfigRef = {
    field1: field1Ref,
    field2: field2Ref,
  };

  beforeEach(() => {
    LoadedInterface = composeInterface(interfaceConfigRef);
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(composeInterface).toBeInstanceOf(Function);
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

  it('should be an interface', () => {
    expect(extendsInterface(LoadedInterface, BaseInterface)).toBe(true);
  });

  it('should have the correct Interface prop', () => {
    expect(LoadedInterface.Interface).toMatchObject({
      _constructor: LoadedInterface,
      _prototype: LoadedInterface.prototype,
      _super: BaseInterface.Interface,
    });
  });

  describe('interface.ensure', () => {
    it('should be a function', () => {
      expect(LoadedInterface.ensure).toBeInstanceOf(Function);
    });

    it('should call BaseInterface.ensureMock with the right args', () => {
      LoadedInterface.ensure(instanceRef);

      expect(BaseInterfaceEnsureMock).toHaveBeenCalledTimes(1);
      expect(BaseInterfaceEnsureMock.mock.calls[0][0]).toEqual(instanceRef);
      expect(BaseInterfaceEnsureMock.mock.calls[0][1]).toEqual(interfaceConfigRef);
    });
  });

  describe('interface._extendMyConfig', () => {
    it('should be a function', () => {
      expect(LoadedInterface._extendMyConfig).toBeInstanceOf(Function);
    });

    it('should return a new config with overwritten values', () => {
      const newField2Ref = {};
      const field3Ref = {};
      const testConfig = {
        field2: newField2Ref,
        field3: field3Ref,
      };
      const newConfig = LoadedInterface._extendMyConfig(testConfig);
      expect(newConfig).toMatchObject({
        field1: field1Ref,
        field2: newField2Ref,
        field3: field3Ref,
      });
    });
  });

  describe('interface.extend', () => {
    it('should be a function', () => {
      expect(LoadedInterface.extend).toBeInstanceOf(Function);
    });

    it('should call the assertInterfaceMock', () => {
      LoadedInterface.extend(iAdder);
      expect(assertInterfaceMock).toHaveBeenCalledTimes(1);
      expect(assertInterfaceMock.mock.calls[0][0]).toEqual(iAdder);
    });

    it('should extend an interface', () => {
      const extendedIAdder = LoadedInterface.extend(iAdder);
      const extendedINamed = LoadedInterface.extend(iNamed);
      expect(extendedIAdder.extends(iAdder)).toBe(true);
      expect(extendedIAdder.extends(BaseInterface)).toBe(true);
      expect(extendedINamed.extends(iNamed)).toBe(true);
      expect(extendedINamed.extends(BaseInterface)).toBe(true);
    });
  });

  describe('interface.extends', () => {
    it('should be a function', () => {
      expect(LoadedInterface.extends).toBeInstanceOf(Function);
    });

    it('should call the assertInterfaceMock', () => {
      LoadedInterface.extend(iAdder);
      expect(assertInterfaceMock).toHaveBeenCalledTimes(1);
      expect(assertInterfaceMock.mock.calls[0][0]).toEqual(iAdder);
    });
  });
});

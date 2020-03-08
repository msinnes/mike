const extendsInterface = require('../../src/interface/extends');

describe('extendsInterface', () => {
  const iRefInterfaceRef = {};
  const iRef = {
    Interface: iRefInterfaceRef,
  };

  const extendsMock = jest.fn();
  const goodCheck = { Interface: { extends: extendsMock } };

  afterEach(jest.resetAllMocks);

  it('should be a function', () => {
    expect(extendsInterface).toBeInstanceOf(Function);
  });

  it('should return false if the first arg is undefined', () => {
    expect(extendsInterface(undefined, iRef)).toBe(false);
  });

  it('should return false if the second arg is undefined', () => {
    expect(extendsInterface(goodCheck, undefined)).toBe(false);
  });

  it('should return false if the first arg does not have an Interface Prop', () => {
    expect(extendsInterface({}, iRef)).toBe(false);
  });

  it('should return false if the second arg does not have an Interface Prop', () => {
    expect(extendsInterface(goodCheck, {})).toBe(false);
  });

  it('should call the extendsMock', () => {
    extendsInterface(goodCheck, iRef);
    expect(extendsMock).toHaveBeenCalledTimes(1);
    expect(extendsMock).toHaveBeenCalledWith(iRefInterfaceRef);
  });
});

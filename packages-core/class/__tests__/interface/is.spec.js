const BaseInterface = require('../../src/interface/base');
const isInterface = require('../../src/interface/is');

const inheritancePropFactory = require('../../src/factories/inheritanceProp');

function ExtendedInterface() {}

ExtendedInterface.Interface = inheritancePropFactory('Interface', ExtendedInterface, {
  super: BaseInterface.Interface,
});

describe('isInterface', () => {
  it('should be a function', () => {
    expect(isInterface).toBeDefined();
    expect(isInterface).toBeInstanceOf(Function);
  });

  it('should return true if input is an interface', () => {
    expect(isInterface(BaseInterface)).toBe(true);
    expect(isInterface(ExtendedInterface)).toBe(true);
  });

  it('should return false if input is not an interface', () => {
    expect(isInterface()).toBe(false);
    expect(isInterface(null)).toBe(false);
    expect(isInterface('')).toBe(false);
  });
});

const BaseClass = require('../../src/class/base');

const BaseInterface = require('../../src/interface/base');

const extendInterface = require('../../src/interface/extend');
const extendsInterface = require('../../src/interface/extends');

describe('extendInterface', () => {
  const iNamedInterfaceRef = {
    _prototype: {},
  };
  const iNamed = function() {};
  iNamed.Interface = iNamedInterfaceRef;
  const iTypedInterfaceRef = {
    _prototype: {},
    _super: BaseInterface.Interface,
  };
  const iTyped = function() {};
  iTyped.Interface = iTypedInterfaceRef;

  let iNamedTyped;
  beforeEach(() => {
    iNamedTyped = extendInterface(iNamed, iTyped);
  });

  it('should be a function', () => {
    expect(extendInterface).toBeDefined();
    expect(extendInterface).toBeInstanceOf(Function);
  });

  it('should returned interfaces with extensions', () => {
    expect(extendsInterface(iNamedTyped, iTyped)).toBe(true);
    expect(extendsInterface(iNamedTyped, BaseInterface)).toBe(true);
    expect(extendsInterface(iNamedTyped, BaseClass)).toBe(false);
    expect(extendsInterface(iNamedTyped, {})).toBe(false);
  });
});
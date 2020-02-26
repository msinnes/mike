const extendClass = require('../../src/lib/extendClass');
const extendsFactory = require('../../src/factories/extends');

const BareClass = require('../../examples/classes/BareClass');
const StaticClass = require('../../examples/classes/StaticClass');
const ProtoAndStaticClass = require('../../examples/classes/ProtoAndSaticClass');

describe('extendsFactory', () => {
  let BareExtStatic, StaticExtPAS, BareExtStaticExtPAS;
  let extendz;

  beforeEach(() => {
    extendz = extendsFactory('Class');
    BareExtStatic = extendClass(BareClass, StaticClass);
    StaticExtPAS = extendClass(StaticClass, ProtoAndStaticClass);
    BareExtStaticExtPAS = extendClass(BareClass, StaticExtPAS);
  });

  it('should be a function', () => {
    expect(extendsFactory).toBeDefined();
    expect(extendsFactory).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(extendz).toBeDefined();
    expect(extendz).toBeInstanceOf(Function);
  });

  it('should extend one class deep', () => {
    expect(extendz(BareExtStatic, StaticClass)).toEqual(true);
    expect(extendz(StaticExtPAS, ProtoAndStaticClass)).toEqual(true);
    expect(extendz(BareExtStaticExtPAS, StaticExtPAS)).toEqual(true);
  });

  it('should extend two classes deep', () => {
    expect(extendz(BareExtStaticExtPAS, ProtoAndStaticClass)).toEqual(true);
  });

  it('should return false if the class does not extend the target', () => {
    expect(extendz(BareClass, ProtoAndStaticClass)).toEqual(false);
  });
});

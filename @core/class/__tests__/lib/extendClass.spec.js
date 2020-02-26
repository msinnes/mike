const extendClass = require('../../src/lib/extendClass');

const BareClass = require('../../examples/classes/BareClass');
const StaticClass = require('../../examples/classes/StaticClass');
const ProtoAndStaticClass = require('../../examples/classes/ProtoAndSaticClass');

describe('extendClass', () => {
  let BareExtProAndStatic, StaticExtProAndStatic;
  beforeEach(() => {
    BareExtProAndStatic = extendClass(BareClass, ProtoAndStaticClass);
    StaticExtProAndStatic = extendClass(StaticClass, ProtoAndStaticClass);
  });

  describe('setup', () => {
    it('should be a function', () => {
      expect(extendClass).toBeDefined();
      expect(extendClass).toBeInstanceOf(Function);
    });

    it('will not add static props and will set constructor', () => {
      expect(Object.keys(BareClass).length).toEqual(0);
      expect(Object.keys(BareClass.prototype).length).toEqual(1);
    });
  });

  describe('constructor', () => {
    it('will apply both constructors with same args if no getConstructor passed', () => {
      const instance = new BareExtProAndStatic();
      expect(instance.one).toEqual(1);
    });
  });

  describe('class properties', () => {
    it('should inherit methods from the superclass prototype', () => {
      expect(BareExtProAndStatic.prototype.addOne).toBeDefined();
    });

    it('should copy static properties', () => {
      expect(BareExtProAndStatic.addTwo(1)).toEqual(3);
    });

    it('should retain its own static properties', () => {
      expect(StaticExtProAndStatic.getText()).toEqual('some text');
    });
  });

  describe('instance properties', () => {
    let instance;

    beforeEach(() => {
      instance = new BareExtProAndStatic();
    });

    it('should inherit instance properties', () => {
      expect(instance.addOne(1)).toEqual(2);
    });

    it('should be an instance of the extendClassed class', () => {
      expect(instance).toBeInstanceOf(ProtoAndStaticClass);
    });
  });

  describe('NewClass.Class inheritance', () => {

    it('should have the right pojc props', () => {
      expect(BareExtProAndStatic.Class._constructor).toEqual(BareExtProAndStatic);
      expect(BareExtProAndStatic.Class._prototype).toEqual(BareExtProAndStatic.prototype);
    });

    it('should point to the correct _super', () => {
      expect(BareExtProAndStatic.Class._super).toEqual(ProtoAndStaticClass.Class);
    });
  });
});

const BaseClass = require('../../src/class/base');
const extendClass = require('../../src/class/extend');

const inheritancePropFactory = require('../../src/factories/inheritanceProp');

function BareClass() {}
function ProtoClass(value) {
  this.value = value;
}
ProtoClass.prototype.add = function(x) {
  return this.value + x;
};

function ProtoAndStaticClass() {

}

ProtoAndStaticClass.addTwo = function(x) {
  return x + 2;
};
ProtoAndStaticClass.value = 'name';

BareClass.Class = inheritancePropFactory('Class', BareClass, {
  super: BaseClass.Class,
});
ProtoClass.Class = inheritancePropFactory('Class', ProtoClass, {
  super: BaseClass.Class,
});
ProtoAndStaticClass.Class = inheritancePropFactory('Class', ProtoAndStaticClass, {
  super: BaseClass.Class,
});

describe('extendClass', () => {
  let BareExtendsProto, ProtoAndStaticExtendsBareExtendsProto;
  beforeEach(() => {
    BareExtendsProto = extendClass(BareClass, ProtoClass);
    ProtoAndStaticExtendsBareExtendsProto = extendClass(ProtoAndStaticClass, BareExtendsProto);
  });

  describe('setup', () => {
    it('should be a function', () => {
      expect(extendClass).toBeDefined();
      expect(extendClass).toBeInstanceOf(Function);
    });

    it('will not add static props and will set constructor', () => {
      expect(Object.keys(BareExtendsProto).length).toEqual(0);
      expect(Object.keys(BareExtendsProto.prototype).length).toEqual(1);
    });
  });

  describe('constructor', () => {
    it('will apply both constructors with same args if no getConstructor passed', () => {
      const instance = new BareExtendsProto(1);
      expect(instance.value).toEqual(1);
    });
  });

  describe('class properties', () => {
    it('should inherit methods from the superclass prototype', () => {
      expect(BareExtendsProto.prototype.add).toBeDefined();
    });

    it('should copy static properties', () => {
      expect(ProtoAndStaticExtendsBareExtendsProto.addTwo(1)).toEqual(3);
    });

    it('should retain its own static properties', () => {
      expect(ProtoAndStaticExtendsBareExtendsProto.value).toEqual('name');
    });
  });

  describe('instance properties', () => {
    let instance;

    beforeEach(() => {
      instance = new BareExtendsProto(1);
    });

    it('should inherit instance properties', () => {
      expect(instance.add(1)).toEqual(2);
    });

    it('should be an instance of the extendClassed class', () => {
      expect(instance).toBeInstanceOf(ProtoClass);
    });
  });

  describe('NewClass.Class inheritance', () => {

    it('should have the right pojc props', () => {
      expect(BareExtendsProto.Class._constructor).toEqual(BareExtendsProto);
      expect(BareExtendsProto.Class._prototype).toEqual(BareExtendsProto.prototype);
    });

    it('should point to the correct _super', () => {
      expect(BareExtendsProto.Class._super).toEqual(ProtoClass.Class);
    });
  });
});

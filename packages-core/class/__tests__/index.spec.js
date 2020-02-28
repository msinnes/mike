const BaseClass = require('../src/class/base');

const Class = require('../src');
const abstractClassLoader = require('../src/loaders/abstractClass');
const classLoader = require('../src/loaders/class');
const staticClassLoader = require('../src/loaders/staticClass');
const typeLoader = require('../src/loaders/type');
const isClass = require('../src/class/is');
const isType = require('../src/type/is');

function Bare() {

}

function Static() {

}

Static.getText = function() {
  return 'some text';
};

function ProtoAndStatic() {
  this.one = 1;
}

ProtoAndStatic.addTwo = function(x) {
  return x + 2;
};

ProtoAndStatic.prototype.addOne = function(x) {
  return x + 1;
};

describe('Class.loader', () => {
  let LoadedBare, LoadedStatic, LoadedProtoAndStatic;

  beforeEach(() => {
    LoadedBare = Class.loadClass(Bare);
    LoadedStatic = Class.loadClass(Static);
    LoadedProtoAndStatic = Class.loadClass(ProtoAndStatic);
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be an object literal with a loadClass prop and an isClass prop', () => {
    expect(Class).toBeInstanceOf(Object);
    expect(Class.loadAbstractClass).toBeDefined();
    expect(Class.loadAbstractClass).toEqual(abstractClassLoader);
    expect(Class.loadClass).toBeDefined();
    expect(Class.loadClass).toEqual(classLoader);
    expect(Class.loadStaticClass).toBeDefined();
    expect(Class.loadStaticClass).toEqual(staticClassLoader);
    expect(Class.loadType).toBeDefined();
    expect(Class.loadType).toEqual(typeLoader);
    expect(Class.isClass).toBeDefined();
    expect(Class.isClass).toEqual(isClass);
    expect(Class.isType).toBeDefined();
    expect(Class.isType).toEqual(isType);
  });

  describe('Class.Class', () => {
    it('should load the expected Class.Class objects', () => {
      expect(LoadedBare.Class).toMatchObject({
        constructor: LoadedBare,
        prototype: Bare.prototype,
        super: BaseClass.Class,
      });
      expect(LoadedStatic.Class).toMatchObject({
        constructor: LoadedStatic,
        prototype: Static.prototype,
        super: BaseClass.Class,
      });
      expect(LoadedProtoAndStatic.Class).toMatchObject({
        constructor: LoadedProtoAndStatic,
        prototype: ProtoAndStatic.prototype,
        super: BaseClass.Class,
      });
    });
  });
});

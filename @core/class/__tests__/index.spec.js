const BaseClass = require('../src/classes/BaseClass');

const Class = require('../src');
const abstractClassLoader = require('../src/loaders/abstractClass');
const classLoader = require('../src/loaders/class');
const interfaceLoader = require('../src/loaders/interface');
const staticClassLoader = require('../src/loaders/staticClass');
const typeLoader = require('../src/loaders/type');
const isClass = require('../src/is/class');
const isInterface = require('../src/is/interface');
const isType = require('../src/is/type');

const Bare = require('../examples/constructors/Bare');
const Static = require('../examples/constructors/Static');
const ProtoAndStatic = require('../examples/constructors/ProtoAndStatic');

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
    expect(Class.loadInterface).toBeDefined();
    expect(Class.loadInterface).toEqual(interfaceLoader);
    expect(Class.loadStaticClass).toBeDefined();
    expect(Class.loadStaticClass).toEqual(staticClassLoader);
    expect(Class.loadType).toBeDefined();
    expect(Class.loadType).toEqual(typeLoader);
    expect(Class.isClass).toBeDefined();
    expect(Class.isClass).toEqual(isClass);
    expect(Class.isInterface).toBeDefined();
    expect(Class.isInterface).toEqual(isInterface);
    expect(Class.isType).toBeDefined();
    expect(Class.isType).toEqual(isType);
  });

  describe('Class.Class', () => {
    it('should load the expected Class.Class objects', () => {
      expect(LoadedBare.Class).toMatchObject({
        _constructor: LoadedBare,
        _prototype: Bare.prototype,
        _super: BaseClass.Class,
      });
      expect(LoadedStatic.Class).toMatchObject({
        _constructor: LoadedStatic,
        _prototype: Static.prototype,
        _super: BaseClass.Class,
      });
      expect(LoadedProtoAndStatic.Class).toMatchObject({
        _constructor: LoadedProtoAndStatic,
        _prototype: ProtoAndStatic.prototype,
        _super: BaseClass.Class,
      });
    });
  });
});

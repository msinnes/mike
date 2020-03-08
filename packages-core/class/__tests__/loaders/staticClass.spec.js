const BaseClass = require('../../src/class/base');
const classFactory = require('../../src/loaders/class');
const staticClassLoader = require('../../src/loaders/staticClass');

jest.mock('../../src/enforcements/constructor');
const constructorEnforcementMock = require('../../src/enforcements/constructor');

describe('staticClassLoader', () => {
  function BaseAdder() {
  }
  BaseAdder.value = 1;
  BaseAdder.addOne = function() {
    return BaseAdder.value + 1;
  };
  BaseAdder.addTwo = function() {
    return BaseAdder.value + 2;
  };

  BaseAdder.prototype.method = function() {};

  const LoadedBaseAdder = staticClassLoader(BaseAdder);

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(staticClassLoader).toBeInstanceOf(Function);
  });

  it('should not be callable as a function', () => {
    expect(() => {
      LoadedBaseAdder();
    }).toThrowErrorMatchingSnapshot();
  });

  it('should not be instantiable', () => {
    expect(() => {
      new LoadedBaseAdder();
    }).toThrowErrorMatchingSnapshot();
  });

  it('should have the correct Class prop', () => {
    expect(LoadedBaseAdder.Class).toMatchObject({
      _constructor: LoadedBaseAdder,
      _prototype: LoadedBaseAdder.prototype,
      _super: BaseClass.Class,
    });
  });

  it('should call the enforcement mocks', () => {
    const checkFnRef = {};
    const nullableRef = {};
    staticClassLoader(checkFnRef, nullableRef);
    expect(constructorEnforcementMock).toHaveBeenCalledTimes(1);
    expect(constructorEnforcementMock.mock.calls[0][0]).toEqual(checkFnRef);
  });

  it('should have static props and methods', () => {
    expect(LoadedBaseAdder.value).toEqual(1);
    expect(LoadedBaseAdder.addOne).toBeDefined();
    expect(LoadedBaseAdder.addOne).toBeInstanceOf(Function);
    expect(LoadedBaseAdder.addTwo).toBeDefined();
    expect(LoadedBaseAdder.addTwo).toBeInstanceOf(Function);
  });

  it('should not get have any values on prototype', () => {
    expect(LoadedBaseAdder.prototype.method).toBeUndefined();
  });

  it('extensions of static classes should be static classes', () => {
    const ExtendedStaticClass = classFactory(function() {}).extend(LoadedBaseAdder);
    expect(ExtendedStaticClass.value).toEqual(1);
    expect(ExtendedStaticClass.addOne).toBeDefined();
    expect(ExtendedStaticClass.addOne).toBeInstanceOf(Function);
    expect(ExtendedStaticClass.addTwo).toBeDefined();
    expect(ExtendedStaticClass.addTwo).toBeInstanceOf(Function);
    expect(ExtendedStaticClass.addOne()).toEqual(2);
    expect(ExtendedStaticClass.addTwo()).toEqual(3);

    expect(() => {
      new ExtendedStaticClass();
    }).toThrowErrorMatchingSnapshot();
  });
});
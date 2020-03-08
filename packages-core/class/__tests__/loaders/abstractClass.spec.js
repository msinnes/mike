const classLoader = require('../../src/loaders/class');
const abstractClassLoader = require('../../src/loaders/abstractClass');

jest.mock('../../src/enforcements/constructor');
const constructorEnforcementMock = require('../../src/enforcements/constructor');

describe('abstractClassLoader', () => {
  function BaseAdder(value) {
    this.value = value;
  }
  BaseAdder.prototype.addOne = function() {
    return this.value + 1;
  };
  BaseAdder.prototype.addTwo = function() {
    return this.value + 2;
  };
  const LoadedBaseAdder = abstractClassLoader(BaseAdder);

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(abstractClassLoader).toBeInstanceOf(Function);
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

  it('should call the enforcement mocks', () => {
    const checkFnRef = {};
    const nullableRef = {};
    abstractClassLoader(checkFnRef, nullableRef);
    expect(constructorEnforcementMock).toHaveBeenCalledTimes(1);
    expect(constructorEnforcementMock.mock.calls[0][0]).toEqual(checkFnRef);
  });

  it('should inherit from the abstract class', () => {
    const TestableClass = classLoader(function() {}).extend(LoadedBaseAdder);
    const instance = new TestableClass(1);
    expect(instance.addOne()).toEqual(2);
    expect(instance.addTwo()).toEqual(3);
    expect(instance).toBeInstanceOf(LoadedBaseAdder);
  });

  it('should have the correct Class prop', () => {
    const TestableClass = classLoader(function() {}).extend(LoadedBaseAdder);
    expect(TestableClass.Class).toMatchObject({
      _constructor: TestableClass,
      _prototype: TestableClass.prototype,
      _super: LoadedBaseAdder.Class,
    });
  });

  it('should still not be instantiable if it extends a class', () => {
    const DeepAbstractClass = abstractClassLoader(function() {}).extend(LoadedBaseAdder);
    expect(() => {
      new DeepAbstractClass();
    }).toThrowErrorMatchingSnapshot();
  });
});

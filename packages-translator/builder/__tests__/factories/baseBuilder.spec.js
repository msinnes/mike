const baseBuilderFactory = require('../../src/factories/baseBuilder');

describe('baseBuilderFactory', () => {
  it('should be a function', () => {
    expect(baseBuilderFactory).toBeDefined();
    expect(baseBuilderFactory).toBeInstanceOf(Function);
  });

  it('should return an object', () => {
    const baseBuilder = baseBuilderFactory('name', function () {});
    expect(baseBuilder.name).toBeDefined();
    expect(baseBuilder.name).toBeInstanceOf(Function);
    expect(baseBuilder.isName).toBeDefined();
    expect(baseBuilder.isName).toBeInstanceOf(Function);
  });

  it('should return an instance', () => {
    function ClassConstructor(name, value) {
      this.name = name;
      this.value = value;
    }
    const testValue = {};
    const baseBuilder = baseBuilderFactory('name', ClassConstructor);
    expect(baseBuilder.name()).toBeInstanceOf(ClassConstructor);
    const instance = baseBuilder.name(testValue);
    expect(instance.name).toEqual('name');
    expect(instance.value).toEqual(testValue);
  });

  it('should check if something is an instance of the input constructor', () => {
    function ClassConstructor() {}
    const baseBuilder = baseBuilderFactory('name', ClassConstructor);
    expect(baseBuilder.isName(new ClassConstructor())).toBe(true);
    expect(baseBuilder.isName('something else')).toBe(false);
  });

  it('should assert if something is an instance of the input constructor', () => {
    function ClassConstructor() {}
    const baseBuilder = baseBuilderFactory('name', ClassConstructor);
    expect(() => {
      baseBuilder.assertName(new ClassConstructor());
    }).not.toThrow();
    expect(() => {
      baseBuilder.assertName('something else');
    }).toThrowErrorMatchingSnapshot();
  });
});
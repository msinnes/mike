const { loadClass } = require('@mike/class');

const Context = require('../Context');

describe('Context', () => {
  it('should be an abstract class', () => {
    expect(() => {
      Context('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Context('string');
    }).toThrowErrorMatchingSnapshot();
  });

  describe('expose', () => {
    it('should have an expose method', () => {
      expect(Context.expose).toBeInstanceOf(Function);
    });

    it('should assign a property onto an object', () => {
      const valueRef = {};
      const TestableContext = loadClass(function (value) {
        TestableContext.expose(this, 'fieldName', () => value);
      }).extend(Context);
      const instance = new TestableContext(valueRef);
      expect(instance.fieldName).toEqual(valueRef);
    });

    it('should not be writable', () => {
      const valueRef = {};
      const TestableContext = loadClass(function (value) {
        TestableContext.expose(this, 'fieldName', () => value);
      }).extend(Context);
      const instance = new TestableContext(valueRef);
      instance.fieldName = 'something else';
      expect(instance.fieldName).toEqual(valueRef);
    });
  });
});
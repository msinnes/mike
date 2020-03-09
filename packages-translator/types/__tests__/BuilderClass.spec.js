const { isType, loadClass } = require('@mike/class');
const Builder = require('@mike/translator-classes/Builder');

const BuilderClassType = require('../BuilderClass');

const TestableBuilder = loadClass(function() {}).extend(Builder);

describe('BuilderClassType', () => {
  it('should be a type', () => {
    expect(BuilderClassType).toBeDefined();
    expect(isType(BuilderClassType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(BuilderClassType.is(Builder)).toBe(true);
    expect(BuilderClassType.is(TestableBuilder)).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(BuilderClassType.is('some other value')).toBe(false);
  });
});

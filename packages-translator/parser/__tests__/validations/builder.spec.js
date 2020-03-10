const Builder = require('@mike/translator-classes/Builder');
const { loadClass } = require('@mike/class');

const builder = require('../../src/validations/builder');

const TestableBuilder = loadClass(function () {}).extend(Builder);

describe('builder', () => {
  it('should be an Object', () => {
    expect(builder).toBeDefined();
    expect(builder).toBeInstanceOf(Object);
  });

  it('is required', () => {
    expect(builder.validate().valid).toBe(false);
  });

  it('should require a class that extends Builder', () => {
    expect(builder.validate(TestableBuilder).valid).toBe(true);
    expect(builder.validate(false).valid).toBe(false);
    expect(builder.validate({}).valid).toBe(false);
  });
});
const BaseBuilder = require('@shared/classes/BaseBuilder');
const { loadClass } = require('@mike/class');

const builder = require('../../../src/validations/config/builder');

const TestableBuilder = loadClass(function () {}).extend(BaseBuilder);

describe('builder', () => {
  it('should be an Object', () => {
    expect(builder).toBeDefined();
    expect(builder).toBeInstanceOf(Object);
  });

  it('is required', () => {
    expect(builder.validate().valid).toBe(false);
  });

  it('should require a class that extends BaseBuilder', () => {
    expect(builder.validate(TestableBuilder).valid).toBe(true);
    expect(builder.validate(false).valid).toBe(false);
    expect(builder.validate({}).valid).toBe(false);
  });
});
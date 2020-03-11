const { isType, loadClass } = require('@mike/class');
const Context = require('@mike/translator-classes/Context');

const ContextClassType = require('../ContextClass');

const TestableContext = loadClass(function() {}).extend(Context);

describe('ContextClassType', () => {
  it('should be a type', () => {
    expect(ContextClassType).toBeDefined();
    expect(isType(ContextClassType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(ContextClassType.is(Context)).toBe(true);
    expect(ContextClassType.is(TestableContext)).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(ContextClassType.is('some other value')).toBe(false);
  });
});

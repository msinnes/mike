const { isType, loadClass } = require('@mike/class');
const Context = require('@mike/translator-classes/Context');

const ContextType = require('../Context');

const TestableContext = loadClass(function() {}).extend(Context);

describe('ContextType', () => {
  it('should be a type', () => {
    expect(ContextType).toBeDefined();
    expect(isType(ContextType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(ContextType.is(new TestableContext())).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(ContextType.is('some other value')).toBe(false);
  });
});

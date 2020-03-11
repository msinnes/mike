const { isInterface, loadClass } = require('@mike/class');
const Context = require('@mike/translator-classes/Context');

const iContextual = require('../iContextual');

const TestableContext = loadClass(function() {}).extend(Context);

describe('iContextual', () => {
  it('should be an interface', () => {
    expect(isInterface(iContextual)).toBe(true);
  });

  it('should accept a valid config', () => {
    expect(() => {
      iContextual.ensure({
        ContextClass: TestableContext,
      });
    }).not.toThrow();
  });

  it('should throw an error if the config is invalid', () => {
    expect(() => {
      iContextual.ensure({});
    }).toThrowErrorMatchingSnapshot();
  });
});

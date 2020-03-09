const { isInterface, loadClass } = require('@mike/class');
const Context = require('@mike/translator-classes/Context');

const iLexer = require('../iLexer');

const TestableContext = loadClass(function() {}).extend(Context);

describe('iLexer', () => {
  it('should be an interface', () => {
    expect(isInterface(iLexer)).toBe(true);
  });

  it('should accept a valid config', () => {
    expect(() => {
      iLexer.ensure({
        tokenizers: [],
        skips: [],
        ctx: new TestableContext(),
      });
    }).not.toThrow();
  });

  it('should throw an error if the config is invalid', () => {
    expect(() => {
      iLexer.ensure({});
    }).toThrowErrorMatchingSnapshot();
  });
});

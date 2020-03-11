const { isInterface, loadClass } = require('@mike/class');
const LexerContext = require('@mike/translator-classes/LexerContext');

const iLexer = require('../iLexer');

const TestableLexerContext = loadClass(function() {}).extend(LexerContext);

describe('iLexer', () => {
  it('should be an interface', () => {
    expect(isInterface(iLexer)).toBe(true);
  });

  it('should accept a valid config', () => {
    expect(() => {
      iLexer.ensure({
        tokenizers: [],
        skips: [],
        ctx: new TestableLexerContext(''),
      });
    }).not.toThrow();
  });

  it('should throw an error if the config is invalid', () => {
    expect(() => {
      iLexer.ensure({});
    }).toThrowErrorMatchingSnapshot();
  });
});

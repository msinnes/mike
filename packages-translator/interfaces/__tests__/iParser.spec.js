const { isInterface } = require('@mike/class');
const Builder = require('@mike/translator-classes/Builder');
const Lexer = require('@mike/translator-classes/Lexer');

const iParser = require('../iParser');

describe('iParser', () => {
  it('should be an interface', () => {
    expect(isInterface(iParser)).toBe(true);
  });

  it('should accept a valid config', () => {
    expect(() => {
      iParser.ensure({
        builder: Builder,
        lexer: Lexer,
        rootSyntaxRule: function() {},
        syntaxRules: {},
        createContext: function() {},
      });
    }).not.toThrow();
  });

  it('should throw an error if the config is invalid', () => {
    expect(() => {
      iParser.ensure({});
    }).toThrowErrorMatchingSnapshot();
  });
});

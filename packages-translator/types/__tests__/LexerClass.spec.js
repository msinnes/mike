const { isType, loadClass } = require('@mike/class');
const Lexer = require('@mike/translator-classes/Lexer');

const LexerClassType = require('../LexerClass');

const TestableLexer = loadClass(function() {}).extend(Lexer);

describe('LexerClassType', () => {
  it('should be a type', () => {
    expect(LexerClassType).toBeDefined();
    expect(isType(LexerClassType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(LexerClassType.is(Lexer)).toBe(true);
    expect(LexerClassType.is(TestableLexer)).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(LexerClassType.is('some other value')).toBe(false);
  });
});

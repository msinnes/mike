const { isType, loadClass } = require('@mike/class');
const LexerContext = require('@mike/translator-classes/LexerContext');

const LexerContextType = require('../LexerContext');

const TestableLexerContext = loadClass(function() {}).extend(LexerContext);

describe('LexerContextType', () => {
  it('should be a type', () => {
    expect(LexerContextType).toBeDefined();
    expect(isType(LexerContextType)).toBe(true);
  });

  it('should return true if the input is a type', () => {
    expect(LexerContextType.is(new TestableLexerContext(''))).toBe(true);
  });

  it('should return false if the input is not a type', () => {
    expect(LexerContextType.is('some other value')).toBe(false);
  });
});

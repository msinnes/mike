const BaseLexer = require('@shared/classes/BaseLexer');
const { loadClass } = require('@core/class');

const lexer = require('../../../src/validations/config/lexer');

const TestableLexer = loadClass(function () {}).extend(BaseLexer);

describe('lexer', () => {
  it('should be an Object', () => {
    expect(lexer).toBeDefined();
    expect(lexer).toBeInstanceOf(Object);
  });

  it('is required', () => {
    expect(lexer.validate().valid).toBe(false);
  });

  it('should require a class that extends BaseLexer', () => {
    expect(lexer.validate(TestableLexer).valid).toBe(true);
    expect(lexer.validate(false).valid).toBe(false);
    expect(lexer.validate({}).valid).toBe(false);
  });
});
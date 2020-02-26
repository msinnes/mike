const ParseError = require('../ParseError');
const BaseError = require('../lib/BaseError');

describe('ParseError', () => {
  it('should be a function', () => {
    expect(ParseError).toBeDefined();
    expect(ParseError).toBeInstanceOf(Function);
  });

  it('should make instances of error', () => {
    expect(new ParseError()).toBeInstanceOf(Error);
    expect(new ParseError()).toBeInstanceOf(BaseError);
  });
});

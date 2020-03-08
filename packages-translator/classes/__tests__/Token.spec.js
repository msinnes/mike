const Token = require('../Token');

describe('Token', () => {
  it('should be a class', () => {
    expect(() => {
      new Token('string');
    }).not.toThrow();

    expect(() => {
      Token('string');
    }).toThrowErrorMatchingSnapshot();
  });

  it('should require a type parameter', () => {
    expect(() => {
      new Token('type');
    }).not.toThrow();

    expect(() => {
      new Token();
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Token(1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should default value to null if none is provided', () => {
    const token = new Token('type');
    expect(token.value).toEqual(null);
  });

  it('should optionally take a value argument', () => {
    const ref = {};
    const token = new Token('type', ref);
    expect(token.value).toEqual(ref);
  });
});


const iParser = require('@mike/translator-interfaces/iParser');

const Parser = require('../Parser');

describe('Parser', () => {
  it('should be an abstract class', () => {
    expect(() => {
      Parser('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Parser('string');
    }).toThrowErrorMatchingSnapshot();
  });

  it('should implement iParser', () => {
    expect(Parser.implements(iParser)).toBe(true);
  });
});
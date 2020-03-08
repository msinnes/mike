const BaseParser = require('../BaseParser');

describe('BaseParser', () => {
  it('should be an abstract class', () => {
    expect(() => {
      BaseParser('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new BaseParser('string');
    }).toThrowErrorMatchingSnapshot();
  });
});
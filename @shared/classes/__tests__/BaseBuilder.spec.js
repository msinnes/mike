const BaseBuilder = require('../BaseBuilder');

describe('BaseBuilder', () => {
  it('should be a static class', () => {
    expect(() => {
      BaseBuilder('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new BaseBuilder('string');
    }).toThrowErrorMatchingSnapshot();
  });
});
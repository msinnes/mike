const Builder = require('../Builder');

describe('Builder', () => {
  it('should be a static class', () => {
    expect(() => {
      Builder('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Builder('string');
    }).toThrowErrorMatchingSnapshot();
  });
});
const { loadClass } = require('@core/class');

const BaseLexer = require('../BaseLexer');

describe('BaseLexer', () => {
  let TestableLexer;
  beforeEach(() => {
    TestableLexer = loadClass(function() {}).extend(BaseLexer);
  });
  it('should be an abstract class', () => {
    expect(() => {
      BaseLexer('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new BaseLexer('string');
    }).toThrowErrorMatchingSnapshot();
  });

  it('should require a text parameter', () => {
    expect(() => {
      new TestableLexer('type');
    }).not.toThrow();

    expect(() => {
      new TestableLexer();
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new TestableLexer(1);
    }).toThrowErrorMatchingSnapshot();
  });
});
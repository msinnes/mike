const Context = require('@mike/translator-classes/Context');

const VisitorContext = require('../VisitorContext');

describe('VisitorContext', () => {
  it('should be an abstract class', () => {
    expect(() => {
      VisitorContext();
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new VisitorContext();
    }).toThrowErrorMatchingSnapshot();
  });

  it('should extend context', () => {
    expect(VisitorContext.extends(Context)).toBe(true);
  });
});
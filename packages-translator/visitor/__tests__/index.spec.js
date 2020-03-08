const getVisitor = require('../src');

describe('index', () => {
  it('should be a function', () => {
    expect(getVisitor).toBeDefined();
    expect(getVisitor).toBeInstanceOf(Function);
  });
});

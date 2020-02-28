const { isClass, loadClass } = require('@mike/class');

const BaseAstNode = require('../BaseAstNode');

describe('BaseAstNode', () => {
  it('should be a class', () => {
    expect(isClass(BaseAstNode)).toBe(true);
  });

  it('should require a type parameter', () => {
    const TestNode = loadClass(function() {}).extend(BaseAstNode);
    expect(() => {
      new TestNode('type');
    }).not.toThrow();
    expect(() => {
      new TestNode();
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      new TestNode(1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should be a class', () => {
    expect(() => {
      BaseAstNode('type');
    }).toThrowErrorMatchingSnapshot();
  });
});


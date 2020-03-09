const { isClass, loadClass } = require('@mike/class');

const AstNode = require('../AstNode');

describe('AstNode', () => {
  it('should be a class', () => {
    expect(isClass(AstNode)).toBe(true);
  });

  it('should require a type parameter', () => {
    const TestNode = loadClass(function() {}).extend(AstNode);
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
      AstNode('type');
    }).toThrowErrorMatchingSnapshot();
  });
});


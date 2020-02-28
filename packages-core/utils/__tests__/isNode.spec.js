const BaseAstNode = require('@shared/classes/BaseAstNode');
const { loadClass } = require('@mike/class');
const isNode = require('../isNode');

function Node() {}
const TestableNode = loadClass(function() {}).extend(BaseAstNode);

const node1 = new TestableNode('Node');
const node2 = [node1];
const node3 = new Node('Node');

describe('isNode (extends BaseAstNode)', () => {
  it('should be a function', () => {
    expect(isNode).toBeDefined();
    expect(isNode).toBeInstanceOf(Function);
  });

  it('should return true for nodes and arrays of nodes', () => {
    expect(isNode(node1)).toBe(true);
    expect(isNode(node2)).toBe(true);
    expect(isNode(node3)).toBe(false);
  });
});


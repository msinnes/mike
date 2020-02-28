const { loadClass } = require('@mike/class');
const BaseAstNode = require('@shared/classes/BaseAstNode');

const nodeRuntimeValidation = require('../../src/validations/nodeRuntime');

const TestableNode = loadClass(function() {}).extend(BaseAstNode);

describe('nodeRuntimeValidation', () => {
  function runTest(value, expected) {
    try {
      const result = nodeRuntimeValidation.validate(value);
      expect(result.valid).toBe(expected);
    } catch(e) {
      expect(e.name).toEqual('RuntimeError');
      expect(expected).toBe(false);
    }
  }

  it('should be an object', () => {
    expect(nodeRuntimeValidation).toBeDefined();
    expect(nodeRuntimeValidation).toBeInstanceOf(Object);
  });

  it('should throw an error if the value is not an Syntax Node', () => {
    runTest(new TestableNode('name'), true);
    runTest([], true);
    runTest([new TestableNode('name'), new TestableNode('name')], true);
    runTest([new TestableNode('name'), 'name'], false);
    runTest(undefined, false);
    runTest(null, false);
    runTest(1, false);
    runTest({}, false);
  });
});
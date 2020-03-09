const BaseAstNode = require('@mike/translator-classes/AstNode');
const { isClass } = require('@mike/class');
const constructorFactory = require('../../src/factories/constructor');

describe('constructorFactory', () => {
  it('should be a function', () => {
    expect(constructorFactory).toBeDefined();
    expect(constructorFactory).toBeInstanceOf(Function);
  });

  it('should return a class that extends AstNode', () => {
    const AstNode = constructorFactory();
    expect(isClass(AstNode)).toBe(true);
    expect(AstNode.extends(BaseAstNode)).toBe(true);
  });

  it('should assign properties to instances', () => {
    const field1Ref = {};
    const field2Ref = {};
    const AstNode = constructorFactory('AstNode', ['field1', 'field2']);
    const instance = new AstNode('AstNode', field1Ref, field2Ref);
    expect(instance.type).toEqual('AstNode');
    expect(instance.field1).toEqual(field1Ref);
    expect(instance.field2).toEqual(field2Ref);
  });

  it('should validate properties', () => {
    const mockValidateFn = jest.fn();
    mockValidateFn.mockReturnValue(true);
    const field1Ref = {};
    const field2Ref = {};
    const AstNode = constructorFactory('AstNode', ['field1', 'field2'], { field1: mockValidateFn });

    new AstNode('AstNode', field1Ref, field2Ref);
    expect(mockValidateFn).toHaveBeenCalledTimes(1);
    expect(mockValidateFn.mock.calls[0][0]).toEqual(field1Ref);

    mockValidateFn.mockReturnValueOnce(false);

    expect(() => {
      new AstNode('AstNode', field1Ref, field2Ref);
    }).toThrowErrorMatchingSnapshot();
  });
});
const BaseAstNode = require('@shared/classes/BaseAstNode');
const { loadClass } = require('@mike/class');

const validateFnFactoryFactory = require('../../src/factories/validateFnFactory');
const TestableNode = loadClass(function() {}).extend(BaseAstNode);

describe('validateFnFactoryFactory', () => {
  const mockCheckFn = jest.fn();
  const mockValidationFn = jest.fn();
  const mockAliases = ['string'];

  it('should be a function', () => {
    expect(validateFnFactoryFactory).toBeDefined();
    expect(validateFnFactoryFactory).toBeInstanceOf(Function);
  });

  it('should return a validateFnFactory', () => {
    expect(validateFnFactoryFactory()).toBeDefined();
    expect(validateFnFactoryFactory()).toBeInstanceOf(Function);
  });

  it('a validateFnFactory should return a validateFn', () => {
    expect(validateFnFactoryFactory()(mockValidationFn)).toBeDefined();
    expect(validateFnFactoryFactory()(mockAliases)).toBeInstanceOf(Function);
  });

  describe('functionality', () => {
    it('should return the mockValidationFn if a function validation is used', () => {
      const validateFn = validateFnFactoryFactory(mockCheckFn)(mockValidationFn);
      expect(validateFn).toEqual(mockValidationFn);
    });

    it('should return a function that will return false if not passed an ast node', () => {
      const validateFn = validateFnFactoryFactory(mockCheckFn)(mockAliases);
      expect(validateFn).toBeInstanceOf(Function);
      expect(validateFn({})).toBe(false);
    });

    it('should not return anything if the validation argument is not a function or an array', () => {
      const validateFn = validateFnFactoryFactory(mockCheckFn)();
      expect(validateFn).not.toBeDefined();
    });

    it('will call the mockCheckFn if an ast node is passed to the alias validation', () => {
      const validateFn = validateFnFactoryFactory(mockCheckFn)(mockAliases);
      expect(validateFn).toBeInstanceOf(Function);
      const node = new TestableNode('');
      validateFn(node);
      expect(mockCheckFn).toHaveBeenCalledTimes(1);
      expect(mockCheckFn.mock.calls[0][0]).toEqual(node);
      expect(mockCheckFn.mock.calls[0][1]).toEqual(mockAliases);
    });
  });
});
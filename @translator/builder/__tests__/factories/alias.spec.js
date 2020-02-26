const { loadClass } = require('@core/class');
const BaseAstNode = require('@shared/classes/BaseAstNode');

const aliasFactory = require('../../src/factories/alias');
const TestableNode = loadClass(function() {}).extend(BaseAstNode);

const Name1 = new TestableNode('Name1');
const Name2 = new TestableNode('Name2');
const Name3 = new TestableNode('Name3');
const Name4 = new TestableNode('Name4');

describe('aliasFactory', () => {
  it('should be a function', () => {
    expect(aliasFactory).toBeDefined();
    expect(aliasFactory).toBeInstanceOf(Function);
  });

  describe('instance', () => {
    let instance;
    beforeEach(() => {
      instance = aliasFactory();
    });

    it('should return an object', () => {
      expect(instance.alias).toBeDefined();
      expect(instance.alias).toBeInstanceOf(Function);
      expect(instance.check).toBeDefined();
      expect(instance.check).toBeInstanceOf(Function);
    });

    it('should validate an instance based on type', () => {
      instance.alias('Name1', ['alias1', 'alias2', 'alias3']);
      instance.alias('Name2', ['alias1']);
      instance.alias('Name3', ['alias2']);
      instance.alias('Name4', ['alias3']);

      expect(instance.check(Name1, ['alias1'])).toEqual(true);
      expect(instance.check(Name1, ['alias2', 'alias3'])).toEqual(true);
      expect(instance.check(Name2, ['alias1'])).toEqual(true);
      expect(instance.check(Name2, ['alias2', 'alias3'])).toEqual(false);
      expect(instance.check(Name3, ['alias1'])).toEqual(false);
      expect(instance.check(Name1, ['alias2', 'alias3'])).toEqual(true);
      expect(instance.check(Name4, ['alias1', 'alias2'])).toEqual(false);
      expect(instance.check(Name4, ['alias3'])).toEqual(true);
    });

    it('should handle array types', () => {
      instance.alias('Name1', ['alias1', 'alias2', 'alias3']);
      instance.alias('Name2', ['alias1']);
      instance.alias('Name3', ['alias2']);
      instance.alias('Name4', ['alias3']);

      expect(instance.check([
        Name1
      ], ['Array<alias1>'])).toEqual(true);

      expect(instance.check([
        Name1,
        Name1,
        Name2,
        Name2,
      ], ['Array<alias1>'])).toEqual(true);

      expect(instance.check([
        Name1,
        Name1,
        Name2,
        Name3,
      ], ['Array<alias1>'])).toEqual(false);

      expect(instance.check([
        Name1,
        Name1,
        Name2,
        Name3,
      ], ['Array<alias2>'])).toEqual(false);

      expect(instance.check([
        Name3,
        Name3,
        Name3,
        Name3,
      ], ['Array<alias2>'])).toEqual(true);

      expect(instance.check([
        Name3,
        Name3,
        Name3,
        Name3,
      ], ['Array<alias2>', 'alias1'])).toEqual(true);
    });
  });
});

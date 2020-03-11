const typeLoader = require('../../src/loaders/type');

const typeMapEnforcement = require('../../src/enforcements/typeMap');

describe('typeMapEnforcement', () => {
  it('should be a function', () => {
    expect(typeMapEnforcement).toBeDefined();
    expect(typeMapEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error if input not a map of types', () => {
    expect(() => {
      typeMapEnforcement({
        field1: typeLoader('name1', () => {}),
      });
    }).not.toThrow();
  });

  it('should throw an error if an input is not a map of types', () => {
    expect(() => {
      typeMapEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      typeMapEnforcement({
        field1: 'string',
        field2: typeLoader('name1', () => {}),
      });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      typeMapEnforcement({
        field1: 'string',
      });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      typeMapEnforcement();
    }).toThrowErrorMatchingSnapshot();
  });
});

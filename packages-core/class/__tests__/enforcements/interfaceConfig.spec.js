const typeLoader = require('../../src/loaders/type');

const interfaceConfigEnforcement = require('../../src/enforcements/interfaceConfig');

describe('interfaceConfigEnforcement', () => {
  it('should be a function', () => {
    expect(interfaceConfigEnforcement).toBeDefined();
    expect(interfaceConfigEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error if input not a map of types', () => {
    expect(() => {
      interfaceConfigEnforcement({
        field1: typeLoader('name1', () => {}),
      });
    }).not.toThrow();
  });

  it('should throw an error if an input is not a string', () => {
    expect(() => {
      interfaceConfigEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      interfaceConfigEnforcement({
        field1: 'string',
        field2: typeLoader('name1', () => {}),
      });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      interfaceConfigEnforcement({
        field1: 'string',
      });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      interfaceConfigEnforcement();
    }).toThrowErrorMatchingSnapshot();
  });
});

const { isInterface, loadType } = require('@core/class');

const iTyped = require('../../interfaces/iTyped');

describe('iTyped', () => {
  it('should be an interface', () => {
    expect(isInterface(iTyped)).toBe(true);
  });

  it('should accept a valid config', () => {
    expect(() => {
      iTyped.ensure({ _type: loadType('name', () => {})});
    }).not.toThrow();
  });

  it('should throw an error if the config is invalid', () => {
    expect(() => {
      iTyped.ensure({});
    }).toThrowErrorMatchingSnapshot();
  });
});
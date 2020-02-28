const functionEnforcementFactory = require('../../src/factories/functionEnforcement');

const enforcement = functionEnforcementFactory('some text');

describe('functionEnforcementFactory', () => {
  it('should be a function', () => {
    expect(functionEnforcementFactory).toBeDefined();
    expect(functionEnforcementFactory).toBeInstanceOf(Function);
  });

  it('should return an enforcement', () => {
    expect(enforcement).toBeDefined();
    expect(enforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error if input is a function', () => {
    expect(() => {
      enforcement(() => {});
    }).not.toThrow();
  });

  it('should throw an error if an input is not a function', () => {
    expect(() => {
      enforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      enforcement({});
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      enforcement();
    }).toThrowErrorMatchingSnapshot();
  });
});

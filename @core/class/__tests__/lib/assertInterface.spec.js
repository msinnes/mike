const assertInterface = require('../../src/lib/assertInterface');

const iAdder = require('../../examples/interfaces/iAdder');
const iNamed = require('../../examples/interfaces/iNamed');

describe('assertInterface', () => {
  it('should be a function', () => {
    expect(assertInterface).toBeDefined();
    expect(assertInterface).toBeInstanceOf(Function);
  });

  it('should not throw an error if the input is a class', () => {
    expect(() => {
      assertInterface(iAdder);
      assertInterface(iNamed);
    }).not.toThrow();
  });

  it('should throw an error if input is not a class', () => {
    expect(() => {
      assertInterface(undefined, 'message');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      assertInterface(null, 'message');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      assertInterface('', 'message');
    }).toThrowErrorMatchingSnapshot();
  });
});

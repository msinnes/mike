const assertClass = require('../../src/lib/assertClass');

const BareClass = require('../../examples/classes/BareClass');
const StaticClass = require('../../examples/classes/StaticClass');
const ProtoAndStaticClass = require('../../examples/classes/ProtoAndSaticClass');

describe('assertClass', () => {
  it('should be a function', () => {
    expect(assertClass).toBeDefined();
    expect(assertClass).toBeInstanceOf(Function);
  });

  it('should not throw an error if the input is a class', () => {
    expect(() => {
      assertClass(BareClass);
      assertClass(StaticClass);
      assertClass(ProtoAndStaticClass);
    }).not.toThrow();
  });

  it('should throw an error if input is not a class', () => {
    expect(() => {
      assertClass(undefined, 'message');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      assertClass(null, 'message');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      assertClass('', 'message');
    }).toThrowErrorMatchingSnapshot();
  });
});

const BaseInterface = require('../../src/classes/BaseInterface');

const extendInterface = require('../../src/lib/extendInterface');
const extendsInterface = require('../../src/lib/extendsInterface');

const iAdder = require('../../examples/interfaces/iAdder');
const iNamed = require('../../examples/interfaces/iNamed');

describe('extendInterface', () => {
  let iNamedAdder;
  beforeEach(() => {
    iNamedAdder = extendInterface(iNamed, iAdder);
  });

  it('should be a function', () => {
    expect(extendInterface).toBeDefined();
    expect(extendInterface).toBeInstanceOf(Function);
  });

  it('should returned interfaces with extensions', () => {
    expect(extendsInterface(iNamedAdder, iAdder)).toBe(true);
    expect(extendsInterface(iNamedAdder, BaseInterface)).toBe(true);
  });
});
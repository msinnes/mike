const classLoader = require('../../src/loaders/class');

const implementInterface = require('../../src/lib/implementInterface');

const iAdder = require('../../examples/interfaces/iAdder');
const iNamed = require('../../examples/interfaces/iNamed');

const iNamedAdder = iAdder.extend(iNamed);

function NamedAdder() {
  this.name = 'NamedAdder';
  this.value = 1;
  this.addOne = function() {};
  this.addTwo = function() {};
}

function UnnamedAdder() {
  this.value = 1;
  this.addOne = function() {};
  this.addTwo = function() {};
}

const LoadedNamedAdder = classLoader(NamedAdder);
const ImplementsINamedAdder = implementInterface(LoadedNamedAdder, iNamedAdder);
const LoadedUnnamedAdder = classLoader(UnnamedAdder);
const ImplementsIAdder = implementInterface(LoadedUnnamedAdder, iAdder);
const FailsImplementsINamedAdder = implementInterface(LoadedUnnamedAdder, iNamedAdder);

describe('implementInterface', () => {
  it('should be a function', () => {
    expect(implementInterface).toBeDefined();
    expect(implementInterface).toBeInstanceOf(Function);
  });

  it('should implement an interface', () => {
    expect(() => {
      new ImplementsIAdder();
    }).not.toThrow();
    expect(() => {
      new ImplementsINamedAdder();
    }).not.toThrow();

    expect(() => {
      new FailsImplementsINamedAdder();
    }).toThrowErrorMatchingSnapshot();

    expect(ImplementsIAdder.Class._implements).toEqual(iAdder);
    expect(ImplementsINamedAdder.Class._implements).toEqual(iNamedAdder);
    expect(FailsImplementsINamedAdder.Class._implements).toEqual(iNamedAdder);
  });
});
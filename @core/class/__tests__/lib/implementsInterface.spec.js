const classLoader = require('../../src/loaders/class');

const implementsInterface = require('../../src/lib/implementsInterface');

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

describe('implementsInterface', () => {
  it('should be a function', () => {
    expect(implementsInterface).toBeDefined();
    expect(implementsInterface).toBeInstanceOf(Function);
  });

  it('should return true if a class implements an interface', () => {
    implementsInterface(ImplementsIAdder, iAdder);
    implementsInterface(ImplementsINamedAdder, iNamedAdder);
    implementsInterface(FailsImplementsINamedAdder, iNamedAdder);
  });
});

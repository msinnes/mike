const isFunction = require('@mike/utils/isFunction');
const isNumber = require('@mike/utils/isNumber');
const isString = require('@mike/utils/isString');

const classLoader = require('../../src/loaders/class');

const implementInterface = require('../../src/class/implement');

const interfaceLoader = require('../../src/loaders/interface');
const typeLoader = require('../../src/loaders/type');

const FunctionType = typeLoader('Function', isFunction);
const NumberType = typeLoader('Number', isNumber);
const StringType = typeLoader('String', isString);

const iAdder = interfaceLoader({
  value: NumberType,
  addOne: FunctionType,
  addTwo: FunctionType,
});

const iNamed = interfaceLoader({
  name: StringType,
});

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

    expect(ImplementsIAdder.Class._interface).toEqual(iAdder);
    expect(ImplementsINamedAdder.Class._interface).toEqual(iNamedAdder);
    expect(FailsImplementsINamedAdder.Class._interface).toEqual(iNamedAdder);
  });
});
const isString = require('@core/utils/isString');

const Class = require('../src');

const BaseClass = require('../src/classes/BaseClass');

jest.mock('../src/lib/ensure');
const ensureMock = require('../src/lib/ensure');
const ensureActual = jest.requireActual('../src/lib/ensure');

describe('e2e', () => {
  beforeEach(() => {
    ensureMock.mockImplementation(ensureActual);
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should load and extend classes', () => {
    function BaseAdder(val) {
      this.val = val;
    }

    BaseAdder.prototype.add = function(x) {
      return x + this.val;
    };

    function PlusTwoAdder() {}

    PlusTwoAdder.prototype.add = function(x) {
      return BaseAdder.prototype.add.call(this, x) + 2;
    };

    function PlusThreeAdder() {}

    PlusThreeAdder.prototype.add = function(x) {
      return PlusTwoAdder.prototype.add.call(this, x) + 1;
    };

    const BaseAdderClass = Class.loadClass(BaseAdder);
    const PlusTwoAdderClass = Class.loadClass(PlusTwoAdder);
    const PlusThreeAdderClass = Class.loadClass(PlusThreeAdder);

    const ExtendedPlusTwoAdder = PlusTwoAdderClass.extend(BaseAdderClass);
    const ExtendedPlusThreeAdder = PlusThreeAdderClass.extend(ExtendedPlusTwoAdder);

    expect(ExtendedPlusTwoAdder.extends(BaseClass)).toBe(true);
    expect(ExtendedPlusTwoAdder.extends(BaseAdderClass)).toBe(true);
    expect(ExtendedPlusThreeAdder.extends(BaseClass)).toBe(true);
    expect(ExtendedPlusThreeAdder.extends(BaseAdderClass)).toBe(true);
    expect(ExtendedPlusThreeAdder.extends(ExtendedPlusTwoAdder)).toBe(true);

    expect(() => {
      ExtendedPlusTwoAdder(1);
    }).toThrowErrorMatchingSnapshot();
    const instance1 = new ExtendedPlusTwoAdder(1);

    expect(instance1).toBeInstanceOf(BaseClass);
    expect(instance1).toBeInstanceOf(BaseAdderClass);
    expect(instance1).toBeInstanceOf(ExtendedPlusTwoAdder);

    expect(instance1.add(1)).toEqual(4);

    expect(() => {
      ExtendedPlusThreeAdder(1);
    }).toThrowErrorMatchingSnapshot();
    const instance2 = new ExtendedPlusThreeAdder(1);

    expect(instance2).toBeInstanceOf(BaseClass);
    expect(instance2).toBeInstanceOf(BaseAdderClass);
    expect(instance2).toBeInstanceOf(ExtendedPlusTwoAdder);

    expect(instance2.add(1)).toEqual(5);
  });

  it('an abstract class should inherit from a regular class', () => {
    function BaseAdder(val) {
      this.val = val;
    }
    BaseAdder.prototype.addOne = function() {
      return this.val + 1;
    };
    const LoadedBaseAdder = Class.loadClass(BaseAdder);
    function AbstractAdder() {}
    AbstractAdder.prototype.addTwo = function() {
      return this.val + 2;
    };
    const LoadedAbstractAdder = Class.loadClass(AbstractAdder).extend(LoadedBaseAdder);
    const TestableAbstractAdder = Class.loadClass(function() {}).extend(LoadedAbstractAdder);
    const instance = new TestableAbstractAdder(1);
    expect(instance.addOne()).toEqual(2);
    expect(instance.addTwo()).toEqual(3);
  });

  it('should build and inherit interfaces', () => {
    const iNamed = Class.loadInterface({
      name: Class.loadType('string', isString),
    });
    const BaseAbstract = Class.loadAbstractClass(function() {}).implement(iNamed);
    const NamedClass = Class.loadClass(function () {this.name = 'name';}).extend(BaseAbstract);
    expect(() => {
      new BaseAbstract();
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      new NamedClass();
    }).not.toThrow();
    expect(ensureMock).toHaveBeenCalledTimes(1);
  });
});
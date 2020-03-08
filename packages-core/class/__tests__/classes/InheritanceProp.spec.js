const InheritanceProp = require('../../src/classes/InheritanceProp');


describe('InheritanceProp', () => {
  let instance;
  const pojcRef = function() {};
  const superRef = function() {};
  const interfaceRef = function () {};
  const configRef = {
    super: superRef,
    implements: interfaceRef,
  };

  let one;
  let two;
  let three;
  let four;
  beforeEach(() => {
    // base test instance
    instance = new InheritanceProp(pojcRef, configRef);

    //classes
    one = new InheritanceProp(function() {});
    two = new InheritanceProp(function() {}, { super: one });
    three = new InheritanceProp(function() {}, { super: two });
    four = new InheritanceProp(function() {}, { super: three });
  });

  it('should be a function', () => {
    expect(InheritanceProp).toBeInstanceOf(Function);
  });

  describe('instance', () => {
    it('should set instance.constructor', () => {
      expect(instance._constructor).toBeDefined();
      expect(instance._constructor).toEqual(pojcRef);
    });

    it('should default instance.prototype to false', () => {
      expect(instance._prototype).toBeDefined();
      expect(instance._prototype).toEqual(pojcRef.prototype);
    });

    it('should have a super prop', () => {
      expect(instance._super).toBeDefined();
      expect(instance._super).toEqual(superRef);
    });

    describe('instance.extends', () => {
      it('should have an extends method', () => {
        expect(instance.extends).toBeDefined();
        expect(instance.extends).toBeInstanceOf(Function);
      });

      it('should should traverse the super props until a match is found', () => {
        expect(four.extends(three)).toBe(true);
        expect(four.extends(two)).toBe(true);
        expect(four.extends(one)).toBe(true);
        expect(four.extends(instance)).toBe(false);
      });
    });

    describe('instance.getInstanceProp', () => {
      it('should have a getInstanceProp method', () => {
        expect(instance.getInstanceProp).toBeDefined();
        expect(instance.getInstanceProp).toBeInstanceOf(Function);
      });

      it('should return an instance map', () => {
        expect(instance.getInstanceProp()).toBeDefined();
        expect(instance.getInstanceProp()).toBeInstanceOf(Object);
        expect(instance.getInstanceProp()).toMatchObject({
          __constructor__: pojcRef,
          __prototype__: pojcRef.prototype,
          __super__: superRef,
        });
        expect(four.getInstanceProp()).toMatchSnapshot();
      });
    });

    describe('instance.getIterator', () => {
      it('should have a getIterator method', () => {
        expect(instance.getIterator).toBeDefined();
        expect(instance.getIterator).toBeInstanceOf(Function);
      });

      it('should return an object', () => {
        const iterator = instance.getIterator();
        expect(iterator).toBeDefined();
        expect(iterator).toBeInstanceOf(Object);
        expect(iterator.next).toBeDefined();
        expect(iterator.next).toBeInstanceOf(Function);
      });

      it('should repeatedly return the next super', () => {
        const iterator = four.getIterator();
        expect(iterator.next()).toEqual(four);
        expect(iterator.next()).toEqual(three);
        expect(iterator.next()).toEqual(two);
        expect(iterator.next()).toEqual(one);
        expect(iterator.next()).toEqual(undefined);
        expect(iterator.next()).toEqual(undefined);
      });
    });

    describe('instance.while', () => {
      it('should have a while method', () => {
        expect(instance.while).toBeDefined();
        expect(instance.while).toBeInstanceOf(Function);
      });

      it('should return an object', () => {
        const doer = instance.while();
        expect(doer).toBeDefined();
        expect(doer).toBeInstanceOf(Object);
        expect(doer.do).toBeDefined();
        expect(doer.do).toBeInstanceOf(Function);
      });

      it('should call a callback while a condition is true', () => {
        const mockFn = jest.fn();
        let i = 0;
        four.while(() => i++ < 3).do(mockFn);
        expect(mockFn).toHaveBeenCalledTimes(3);
        expect(mockFn.mock.calls[0][0]).toEqual(four);
        expect(mockFn.mock.calls[1][0]).toEqual(three);
        expect(mockFn.mock.calls[2][0]).toEqual(two);
      });
    });
  });
});

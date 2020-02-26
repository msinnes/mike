const InheritanceProp = require('../../src/classes/InheritanceProp');


describe('InheritanceProp', () => {
  let instance;
  const pojcRef = function() {};
  const _superRef = function() {};
  const _implementsRef = function () {};
  const configRef = {
    _super: _superRef,
    _implements: _implementsRef,
  };

  let one;
  let two;
  let three;
  let four;
  beforeEach(() => {
    instance = new InheritanceProp(pojcRef, configRef);
    one = new InheritanceProp(function() {});
    two = new InheritanceProp(function() {}, { _super: one });
    three = new InheritanceProp(function() {}, { _super: two });
    four = new InheritanceProp(function() {}, { _super: three });
  });

  it('should be a function', () => {
    expect(InheritanceProp).toBeInstanceOf(Function);
  });

  describe('instance', () => {
    it('should set instance._constructor', () => {
      expect(instance._constructor).toBeDefined();
      expect(instance._constructor).toEqual(pojcRef);
    });

    it('should default instance._prototype to false', () => {
      expect(instance._prototype).toBeDefined();
      expect(instance._prototype).toEqual(pojcRef.prototype);
    });

    it('should have a _super prop', () => {
      expect(instance._super).toBeDefined();
      expect(instance._super).toEqual(_superRef);
    });

    it('should have a _implements', () => {
      expect(instance._implements).toBeDefined();
      expect(instance._implements).toEqual(_implementsRef);
    });

    describe('instance', () => {
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

        it('should repeatedly return the current _super', () => {
          const iterator = four.getIterator();
          expect(iterator.current()).toEqual(four);
          iterator.last();
          expect(iterator.current()).toEqual(one);
        });

        it('should repeatedly return the first _super', () => {
          const iterator = four.getIterator();
          expect(iterator.first()).toEqual(four);
          iterator.last();
          expect(iterator.first()).toEqual(four);
        });

        it('should repeatedly return the next _super', () => {
          const iterator = four.getIterator();
          expect(iterator.next()).toEqual(four);
          expect(iterator.next()).toEqual(three);
          expect(iterator.next()).toEqual(two);
          expect(iterator.next()).toEqual(one);
          expect(iterator.next()).toEqual(undefined);
          expect(iterator.next()).toEqual(undefined);
        });

        it('should repeatedly return the last _super', () => {
          const iterator = four.getIterator();
          expect(iterator.last()).toEqual(one);
          expect(iterator.last()).toEqual(one);
        });

        it('should repeatedly return the prev _super', () => {
          const iterator = four.getIterator();
          iterator.last();
          expect(iterator.prev()).toEqual(two);
          expect(iterator.prev()).toEqual(three);
          expect(iterator.prev()).toEqual(four);
          expect(iterator.prev()).toEqual(undefined);
          expect(iterator.prev()).toEqual(undefined);
        });
      });

      describe('instance.forEach', () => {
        it('should have an forEach method', () => {
          expect(instance.forEach).toBeDefined();
          expect(instance.forEach).toBeInstanceOf(Function);
        });

        it('run a callback on each _super', () => {
          const mockFn = jest.fn();
          four.forEach(mockFn);
          expect(mockFn).toHaveBeenCalledTimes(4);
          expect(mockFn.mock.calls[0][0]).toEqual(four);
          expect(mockFn.mock.calls[1][0]).toEqual(three);
          expect(mockFn.mock.calls[2][0]).toEqual(two);
          expect(mockFn.mock.calls[3][0]).toEqual(one);
        });
      });

      describe('instance.while', () => {
        it('should have an while method', () => {
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

      describe('instance.reduce', () => {
        it('should have an reduce method', () => {
          expect(instance.reduce).toBeDefined();
          expect(instance.reduce).toBeInstanceOf(Function);
        });

        it('should call a callback with an accumulator and return the final accumulator', () => {
          const supers = four.reduce((acc, Class) => {
            acc.push(Class._super);
            return acc;
          }, []);
          expect(supers[0]).toEqual(three);
          expect(supers[1]).toEqual(two);
          expect(supers[2]).toEqual(one);
          expect(supers[3]).toBeUndefined();
        });
      });
    });
  });
});
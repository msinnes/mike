const InheritanceProp = require('../../src/classes/InheritanceProp');

const ClassInheritanceProp = require('../../src/classes/ClassInheritanceProp');


describe('ClassInheritanceProp', () => {
  let instance;

  let iOne;
  let iTwo;
  let iThree;
  let iFour;

  let one;
  let two;

  const pojcRef = function() {};
  const superRef = function() {};
  const interfaceRef = function () {};
  const configRef = {
    super: superRef,
    interface: interfaceRef,
  };
  beforeEach(() => {
    // base test instance
    instance = new ClassInheritanceProp(pojcRef, configRef);

    iOne = new InheritanceProp(function() {});
    iTwo = new InheritanceProp(function () {}, { super: iOne });
    iThree = new InheritanceProp(function () {}, { super: iTwo });
    iFour = new InheritanceProp(function () {});

    one = new ClassInheritanceProp(function() {}, { interface: iThree });
    two = new ClassInheritanceProp(function() {}, { super: one, interface: iFour });
  });

  it('should be a function', () => {
    expect(InheritanceProp).toBeInstanceOf(Function);
  });

  describe('instance', () => {
    it('should be an InheritanceProp', () => {
      expect(instance).toBeInstanceOf(InheritanceProp);
    });

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

    it('should have an interface prop', () => {
      expect(instance._interface).toBeDefined();
      expect(instance._interface).toEqual(interfaceRef);
    });

    describe('instance.implements', () => {
      it('should have an implements method', () => {
        expect(instance.implements).toBeDefined();
        expect(instance.implements).toBeInstanceOf(Function);
      });

      it('should should traverse the interface props until a match is found', () => {
        expect(two.implements(iOne)).toBe(true);
        expect(two.implements(iTwo)).toBe(true);
        expect(two.implements(iThree)).toBe(true);
        expect(two.implements(iFour)).toBe(true);

        expect(one.implements(iOne)).toBe(true);
        expect(one.implements(iTwo)).toBe(true);
        expect(one.implements(iThree)).toBe(true);
        expect(one.implements(iFour)).toBe(false);
      });
    });
  });
});

const InheritanceProp = require('../../src/classes/InheritanceProp');
const classPropFactory = require('../../src/factories/inheritanceProp');

function SomeClass() {

}

SomeClass.prototype = {
  one: 1,
  two: 2,
};

describe('classPropFactory', () => {
  it('will assign default values if no super is passed', () => {
    const inheritanceProp = classPropFactory(SomeClass);

    expect(inheritanceProp.constructor).toEqual(SomeClass);
    expect(inheritanceProp.prototype).toEqual(SomeClass.prototype);
  });

  it('will assign a super if a super is passed to the factory', () => {
    function SuperClass() {}

    const inheritanceProp = classPropFactory(SomeClass, { super: SuperClass });

    expect(inheritanceProp.constructor).toEqual(SomeClass);
    expect(inheritanceProp.prototype).toEqual(SomeClass.prototype);
    expect(inheritanceProp.super).toEqual(SuperClass);
  });

  it('will assign an interface if an interface is passed to the factory', () => {
    function SuperClass() {}

    const inheritanceProp = classPropFactory(SomeClass, { interface: SuperClass });

    expect(inheritanceProp.constructor).toEqual(SomeClass);
    expect(inheritanceProp.prototype).toEqual(SomeClass.prototype);
  });

  it('will return an instance of InheritanceProp', () => {
    const inheritanceProp = classPropFactory(SomeClass);
    expect(inheritanceProp).toBeInstanceOf(InheritanceProp);
  });
});

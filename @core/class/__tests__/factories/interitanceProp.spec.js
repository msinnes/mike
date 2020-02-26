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

    expect(inheritanceProp._constructor).toEqual(SomeClass);
    expect(inheritanceProp._prototype).toEqual(SomeClass.prototype);
  });

  it('will assign a super if a super is passed to the factory', () => {
    function SuperClass() {}

    const inheritanceProp = classPropFactory(SomeClass, {_super: SuperClass });

    expect(inheritanceProp._constructor).toEqual(SomeClass);
    expect(inheritanceProp._prototype).toEqual(SomeClass.prototype);
    expect(inheritanceProp._super).toEqual(SuperClass);
  });

  it('will assign an implements if an implements is passed to the factory', () => {
    function SuperClass() {}

    const inheritanceProp = classPropFactory(SomeClass, {_implements: SuperClass });

    expect(inheritanceProp._constructor).toEqual(SomeClass);
    expect(inheritanceProp._prototype).toEqual(SomeClass.prototype);
    expect(inheritanceProp._implements).toEqual(SuperClass);
  });

  it('will return an instance of InheritanceProp', () => {
    const inheritanceProp = classPropFactory(SomeClass);
    expect(inheritanceProp).toBeInstanceOf(InheritanceProp);
  });
});
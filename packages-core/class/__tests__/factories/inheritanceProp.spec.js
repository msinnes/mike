const ClassInheritanceProp = require('../../src/classes/ClassInheritanceProp');
const InheritanceProp = require('../../src/classes/InheritanceProp');

const inheritancePropFactory = require('../../src/factories/inheritanceProp');

function SomeClass() {

}

SomeClass.prototype = {
  one: 1,
  two: 2,
};

describe('inheritancePropFactory', () => {
  it('will assign default values if no super is passed', () => {
    const inheritanceProp = inheritancePropFactory('Class', SomeClass);

    expect(inheritanceProp._constructor).toEqual(SomeClass);
    expect(inheritanceProp._prototype).toEqual(SomeClass.prototype);
  });

  it('will assign a super if a super is passed to the factory', () => {
    function SuperClass() {}

    const inheritanceProp = inheritancePropFactory('Class', SomeClass, { super: SuperClass });

    expect(inheritanceProp._constructor).toEqual(SomeClass);
    expect(inheritanceProp._prototype).toEqual(SomeClass.prototype);
    expect(inheritanceProp._super).toEqual(SuperClass);
  });

  it('will assign an interface if an interface is passed to the factory', () => {
    function SuperClass() {}

    const inheritanceProp = inheritancePropFactory('Class', SomeClass, { interface: SuperClass });

    expect(inheritanceProp._constructor).toEqual(SomeClass);
    expect(inheritanceProp._prototype).toEqual(SomeClass.prototype);
  });

  it('will return an instance of ClassInheritanceProp for type Class', () => {
    const inheritanceProp = inheritancePropFactory('Class', SomeClass);
    expect(inheritanceProp).toBeInstanceOf(ClassInheritanceProp);
  });

  it('will return an instance of InheritanceProp for other types', () => {
    const inheritanceProp = inheritancePropFactory('Interface', SomeClass);
    expect(inheritanceProp).toBeInstanceOf(InheritanceProp);
  });
});

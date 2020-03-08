const privateVariables = require('../privateVariables');

describe('privateVariables', () => {
  let testObj;

  beforeEach(() => {
    testObj = {};
    privateVariables(testObj, {
      valOne: 1,
      valTwo: 2,
    });
  });

  it('should add both values to the object', () => {
    expect(testObj.valOne).toEqual(1);
    expect(testObj.valTwo).toEqual(2);
  });

  it('should not make the added values enumerable on the object', () => {
    expect(Object.keys(testObj).length).toEqual(0);
  });
});
const extendsClass = require('../../src/class/extends');

const extendsMock = jest.fn();
function MockClass() {}

MockClass.Class = {
  extends: extendsMock,
};

describe('extendsClass', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be the return of the factory', () => {
    expect(extendsClass).toBeDefined();
    expect(extendsClass).toBeInstanceOf(Function);
  });

  it('should call the InheritanceProp.extends method on the Class prop', () => {
    const testRef = {};
    extendsClass(MockClass, { Class: testRef });
    expect(extendsMock).toHaveBeenCalledTimes(1);
    expect(extendsMock.mock.calls[0][0]).toEqual(testRef);
  });
});

const ObjectType = require('../../src/type/object');

const objectTypeLoader = require('../../src/loaders/objectType');

jest.mock('../../src/enforcements/typeMap');
const typeMapEnforcementMock = require('../../src/enforcements/typeMap');

describe('objectTypeLoader', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(objectTypeLoader).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const checkFnRef = {};
    const nameRef = {};
    objectTypeLoader(nameRef, checkFnRef);
    expect(typeMapEnforcementMock).toHaveBeenCalledTimes(1);
    expect(typeMapEnforcementMock.mock.calls[0][0]).toEqual(nameRef);
  });

  it('should return an instance of ObjectType', () => {
    const instance = objectTypeLoader('name', () => {});
    expect(instance).toBeInstanceOf(ObjectType);
  });

  it('should pass the name arg', () => {
    const instance = objectTypeLoader('name', () => {});
    expect(instance.name).toBe('name');
  });
});

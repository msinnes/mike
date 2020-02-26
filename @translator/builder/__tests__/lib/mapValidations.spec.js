const mapValidations = require('../../src/lib/mapValidations');

const validateFnFactoryMock = jest.fn();

describe('config/index', () => {
  const validateFnMockReturnRef = {};
  beforeEach(() => {
    validateFnFactoryMock.mockReturnValue(validateFnMockReturnRef);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be a Function', () => {
    expect(mapValidations).toBeDefined();
    expect(mapValidations).toBeInstanceOf(Function);
  });

  it('should call the mock once for each field on the input object', () => {
    const field1Ref =  {};
    const field2Ref =  {};
    mapValidations({
      field1: field1Ref,
      field2: field2Ref,
    }, validateFnFactoryMock);
    expect(validateFnFactoryMock).toHaveBeenCalledTimes(2);
    expect(validateFnFactoryMock.mock.calls[0][0]).toEqual(field1Ref);
    expect(validateFnFactoryMock.mock.calls[1][0]).toEqual(field2Ref);
  });

  it('should put the return values onto the mapped object', () => {
    const result = mapValidations({
      field1: {},
      field2: {},
    }, validateFnFactoryMock);
    expect(result.field1).toBeDefined();
    expect(result.field1).toEqual(validateFnMockReturnRef);
    expect(result.field2).toBeDefined();
    expect(result.field2).toEqual(validateFnMockReturnRef);
  });
});

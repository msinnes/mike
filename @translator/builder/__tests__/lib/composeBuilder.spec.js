const composeBuilder = require('../../src/lib/composeBuilder');

jest.mock('../../src/lib/mapValidations');
const mapValidationsMock = require('../../src/lib/mapValidations');
jest.mock('../../src/factories/validateFnFactory');
const validateFnFactoryFactoryMock = require('../../src/factories/validateFnFactory');
jest.mock('../../src/factories/constructor');
const constructorFactoryMock = require('../../src/factories/constructor');
jest.mock('../../src/factories/baseBuilder');
const baseBuilderFactoryMock = require('../../src/factories/baseBuilder');

const mapValidationsMockReturnRef = {};
const validateFnFactoryFactoryMockReturnRef = {};
const constructorFactoryMockReturnRef = {};
const baseBuilderFactoryMockReturnRef = {};

describe('config/index', () => {
  beforeEach(() => {
    mapValidationsMock.mockReturnValue(mapValidationsMockReturnRef);
    validateFnFactoryFactoryMock.mockReturnValue(validateFnFactoryFactoryMockReturnRef);
    constructorFactoryMock.mockReturnValue(constructorFactoryMockReturnRef);
    baseBuilderFactoryMock.mockReturnValue(baseBuilderFactoryMockReturnRef);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(composeBuilder).toBeDefined();
    expect(composeBuilder).toBeInstanceOf(Function);
  });

  it('should call all of the mocks with the expected args', () => {
    const nameRef = {};
    const configPropertiesRef = {};
    const configValidationsRef = {};
    const configRef = {
      properties: configPropertiesRef,
      validations: configValidationsRef,
    };
    const checkFnRef = {};
    composeBuilder(nameRef, configRef, checkFnRef);

    expect(validateFnFactoryFactoryMock).toHaveBeenCalledTimes(1);
    expect(validateFnFactoryFactoryMock.mock.calls[0][0]).toEqual(checkFnRef);

    expect(mapValidationsMock).toHaveBeenCalledTimes(1);
    expect(mapValidationsMock.mock.calls[0][0]).toEqual(configValidationsRef);
    expect(mapValidationsMock.mock.calls[0][1]).toEqual(validateFnFactoryFactoryMockReturnRef);

    expect(constructorFactoryMock).toHaveBeenCalledTimes(1);
    expect(constructorFactoryMock.mock.calls[0][0]).toEqual(nameRef);
    expect(constructorFactoryMock.mock.calls[0][1]).toEqual(configPropertiesRef);
    expect(constructorFactoryMock.mock.calls[0][2]).toEqual(mapValidationsMockReturnRef);

    expect(baseBuilderFactoryMock).toHaveBeenCalledTimes(1);
    expect(baseBuilderFactoryMock.mock.calls[0][0]).toEqual(nameRef);
    expect(baseBuilderFactoryMock.mock.calls[0][1]).toEqual(constructorFactoryMockReturnRef);
  });

  it('should return the value returned from baseBuilderFactory', () => {
    const nameRef = {};
    const configPropertiesRef = {};
    const configValidationsRef = {};
    const configRef = {
      properties: configPropertiesRef,
      validations: configValidationsRef,
    };
    const checkFnRef = {};
    const result = composeBuilder(nameRef, configRef, checkFnRef);
    expect(result).toEqual(baseBuilderFactoryMockReturnRef);
  });
});

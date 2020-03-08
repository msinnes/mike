const ObjectValidation = require('../Object');
const ObjectValidationClass = require('../classes/ObjectValidation');

jest.mock('../enforcements/objectValidation');
const objectValidationMock = require('../enforcements/objectValidation');

jest.mock('../enforcements/config');
const configMock = require('../enforcements/config');

describe('ObjectValidation', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(ObjectValidation).toBeDefined();
    expect(ObjectValidation).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const VALIDATION_REF = () => {};
    const CONFIG_REF = {};

    ObjectValidation(VALIDATION_REF, CONFIG_REF);

    expect(objectValidationMock).toHaveBeenCalledTimes(1);
    expect(objectValidationMock.mock.calls[0][0]).toEqual(VALIDATION_REF);
    expect(configMock).toHaveBeenCalledTimes(1);
    expect(configMock.mock.calls[0][0]).toEqual(CONFIG_REF);
  });

  it('should return an instance of ObjectValidation', () => {
    expect(ObjectValidation(() => {}, () => {})).toBeInstanceOf(ObjectValidationClass);
    expect(ObjectValidation(() => {}, () => {}).validate).toBeDefined();
  });
});
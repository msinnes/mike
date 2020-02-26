const ArrayValidation = require('../Array');
const ArrayValidationClass = require('../classes/ArrayValidation');

jest.mock('../enforcements/validation');
const validationMock = require('../enforcements/validation');

jest.mock('../enforcements/config');
const configMock = require('../enforcements/config');

describe('ArrayValidation', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(ArrayValidation).toBeDefined();
    expect(ArrayValidation).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const VALIDATION_REF = () => {};
    const CONFIG_REF = {};

    ArrayValidation(VALIDATION_REF, CONFIG_REF);

    expect(validationMock).toHaveBeenCalledTimes(1);
    expect(validationMock.mock.calls[0][0]).toEqual(VALIDATION_REF);
    expect(configMock).toHaveBeenCalledTimes(1);
    expect(configMock.mock.calls[0][0]).toEqual(CONFIG_REF);
  });

  it('should return an instance of ArrayValidation', () => {
    expect(ArrayValidation(() => {}, () => {})).toBeInstanceOf(ArrayValidationClass);
    expect(ArrayValidation(() => {}, () => {}).validate).toBeDefined();
  });
});
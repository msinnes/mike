const MapValidation = require('../Map');
const MapValidationClass = require('../classes/MapValidation');

jest.mock('../enforcements/mapValidation');
const mapValidationMock = require('../enforcements/mapValidation');

jest.mock('../enforcements/config');
const configMock = require('../enforcements/config');

describe('MapValidation', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(MapValidation).toBeDefined();
    expect(MapValidation).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const VALIDATION_REF = () => {};
    const CONFIG_REF = {};

    MapValidation(VALIDATION_REF, CONFIG_REF);

    expect(mapValidationMock).toHaveBeenCalledTimes(1);
    expect(mapValidationMock.mock.calls[0][0]).toEqual(VALIDATION_REF);
    expect(configMock).toHaveBeenCalledTimes(1);
    expect(configMock.mock.calls[0][0]).toEqual(CONFIG_REF);
  });

  it('should return an instance of MapValidation', () => {
    expect(MapValidation({})).toBeInstanceOf(MapValidationClass);
    expect(MapValidation({}).validate).toBeDefined();
  });
});
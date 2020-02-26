const aliases = require('../../src/validations/aliases');
const properties = require('../../src/validations/properties');
const validations = require('../../src/validations/validations');

const aliasesMock = jest.fn();
const propertiesMock = jest.fn();
const validationsMock = jest.fn();

aliases.validate = aliasesMock;
properties.validate = propertiesMock;
validations.validate = validationsMock;

const configValidation = require('../../src/validations/builder');

describe('config/index', () => {
  const aliasesTestValue = {};
  const propertiesTestValue = {};
  const validationsTestValue = {};

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be an Object', () => {
    expect(configValidation).toBeDefined();
    expect(configValidation).toBeInstanceOf(Object);
  });

  it('should call all of the mocks', () => {
    aliasesMock.mockReturnValueOnce({ valid: true, invalid: false });
    propertiesMock.mockReturnValueOnce({ valid: true, invalid: false });
    validationsMock.mockReturnValueOnce({ valid: true, invalid: false });

    configValidation.validate({
      aliases: aliasesTestValue,
      properties: propertiesTestValue,
      validations: validationsTestValue,
    });

    expect(aliasesMock).toHaveBeenCalledTimes(1);
    expect(aliasesMock.mock.calls[0][0]).toEqual(aliasesTestValue);
    expect(propertiesMock).toHaveBeenCalledTimes(1);
    expect(propertiesMock.mock.calls[0][0]).toEqual(propertiesTestValue);
    expect(validationsMock).toHaveBeenCalledTimes(1);
    expect(validationsMock.mock.calls[0][0]).toEqual(validationsTestValue);
  });

  it('should return an invalid response if any value is invalid', () => {
    aliasesMock.mockReturnValueOnce({ valid: false, invalid: true, data: 'error message', });
    propertiesMock.mockReturnValueOnce({ valid: true, invalid: false });
    validationsMock.mockReturnValueOnce({ valid: true, invalid: false });

    const result = configValidation.validate({
      aliases: aliasesTestValue,
      properties: propertiesTestValue,
      validations: validationsTestValue,
    });

    expect(result.invalid).toBe(true);
    expect(result.data.aliases.data).toEqual('error message');
  });
});

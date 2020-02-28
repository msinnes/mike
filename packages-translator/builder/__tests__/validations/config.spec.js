const builder = require('../../src/validations/builder');
const name = require('../../src/validations/name');

const builderMock = jest.fn();
const nameMock = jest.fn();

builder.validate = builderMock;
name.validate = nameMock;

const configValidation = require('../../src/validations/config');

describe('config/index', () => {
  const builderTestValue = {};

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be an Object', () => {
    expect(configValidation).toBeDefined();
    expect(configValidation).toBeInstanceOf(Object);
  });

  it('should call all of the mocks', () => {
    builderMock.mockReturnValueOnce({ valid: true, invalid: false });
    nameMock.mockReturnValueOnce({ valid: true, invalid: false });

    configValidation.validate({
      fieldName: builderTestValue,
    });

    expect(builderMock).toHaveBeenCalledTimes(1);
    expect(builderMock.mock.calls[0][0]).toEqual(builderTestValue);
    expect(nameMock).toHaveBeenCalledTimes(1);
    expect(nameMock.mock.calls[0][0]).toEqual('fieldName');
  });

  it('should return an invalid response if any value is invalid', () => {
    builderMock.mockReturnValueOnce({ valid: false, invalid: true, data: 'error message', });
    nameMock.mockReturnValueOnce({ valid: true, invalid: false });

    expect(() => {
      configValidation.validate({
        fieldName: builderTestValue,
      });
    }).toThrowErrorMatchingSnapshot();
  });
});

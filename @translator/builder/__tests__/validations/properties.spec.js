jest.mock('../../src/factories/arrayStringValidation');
const arrayStringValidationFactoryMock = require('../../src/factories/arrayStringValidation');

describe('properties', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should have called the getAnalyzerValidation factory', () => {
    require('../../src/validations/properties');
    expect(arrayStringValidationFactoryMock).toHaveBeenCalledTimes(1);
    expect(arrayStringValidationFactoryMock.mock.calls[0][0]).toEqual('properties');
    expect(arrayStringValidationFactoryMock.mock.calls[0][1]).toEqual(false);
  });
});

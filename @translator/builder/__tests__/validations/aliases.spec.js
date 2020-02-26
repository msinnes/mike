jest.mock('../../src/factories/arrayStringValidation');
const arrayStringValidationFactoryMock = require('../../src/factories/arrayStringValidation');

describe('aliases', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should have called the getAnalyzerValidation factory', () => {
    require('../../src/validations/aliases');
    expect(arrayStringValidationFactoryMock).toHaveBeenCalledTimes(1);
    expect(arrayStringValidationFactoryMock.mock.calls[0][0]).toEqual('aliases');
    expect(arrayStringValidationFactoryMock.mock.calls[0][1]).toEqual(true);
  });
});

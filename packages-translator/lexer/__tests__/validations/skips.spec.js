jest.mock('../../src/factories/analyzerValidation');
const analyzerValidationFactoryMock = require('../../src/factories/analyzerValidation');

describe('skips', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should have called the getAnalyzerValidation factory', () => {
    require('../../src/validations/skips');
    expect(analyzerValidationFactoryMock).toHaveBeenCalledTimes(1);
    expect(analyzerValidationFactoryMock.mock.calls[0][0]).toEqual('skips');
    expect(analyzerValidationFactoryMock.mock.calls[0][1]).toEqual(true);
  });
});

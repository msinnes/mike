jest.mock('../../../src/factories/analyzerValidation');
const analyzerValidationFactoryMock = require('../../../src/factories/analyzerValidation');

describe('tokenizers', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should have called the getAnalyzerValidation factory', () => {
    require('../../../src/validations/config/tokenizers');
    expect(analyzerValidationFactoryMock).toHaveBeenCalledTimes(1);
    expect(analyzerValidationFactoryMock.mock.calls[0][0]).toEqual('tokenizers');
    expect(analyzerValidationFactoryMock.mock.calls[0][1]).toEqual(false);
  });
});
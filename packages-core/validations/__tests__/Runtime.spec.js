const Runtime = require('../Runtime');
const RuntimeValidationClass = require('../classes/RuntimeValidation');

jest.mock('../enforcements/validation');
const validationMock = require('../enforcements/validation');

describe('Runtime', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(Runtime).toBeDefined();
    expect(Runtime).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const VALIDATION_REF = () => {};

    Runtime(VALIDATION_REF);

    expect(validationMock).toHaveBeenCalledTimes(1);
    expect(validationMock.mock.calls[0][0]).toEqual(VALIDATION_REF);
  });

  it('should return an instance of RuntimeValidation', () => {
    expect(Runtime(() => {}, () => {})).toBeInstanceOf(RuntimeValidationClass);
    expect(Runtime(() => {}, () => {}).validate).toBeDefined();
  });
});
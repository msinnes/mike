const Validation = require('../Validation');
const ValidationClass = require('../classes/Validation');

jest.mock('../enforcements/validateFn');
const validateFnMock = require('../enforcements/validateFn');

jest.mock('../enforcements/message');
const messageMock = require('../enforcements/message');

jest.mock('../enforcements/config');
const configMock = require('../enforcements/config');

describe('Validation', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(Validation).toBeDefined();
    expect(Validation).toBeInstanceOf(Function);
  });

  it('should call the enforcement mocks', () => {
    const VALIDATE_FN_REF = () => {};
    const MESSAGE_REF = () => {};
    const CONFIG_REF = {};

    Validation(VALIDATE_FN_REF, MESSAGE_REF, CONFIG_REF);

    expect(validateFnMock).toHaveBeenCalledTimes(1);
    expect(validateFnMock.mock.calls[0][0]).toEqual(VALIDATE_FN_REF);
    expect(messageMock).toHaveBeenCalledTimes(1);
    expect(messageMock.mock.calls[0][0]).toEqual(MESSAGE_REF);
    expect(configMock).toHaveBeenCalledTimes(1);
    expect(configMock.mock.calls[0][0]).toEqual(CONFIG_REF);
  });

  it('should return an instance of Validation', () => {
    expect(Validation(() => {}, () => {})).toBeInstanceOf(ValidationClass);
    expect(Validation(() => {}, () => {}).validate).toBeDefined();
  });

  it('should test a validation function', () => {
    const validation = Validation(value => value === '', 'message');
    const firstResult = validation.validate('');
    expect(firstResult.valid).toBeDefined();
    expect(firstResult.valid).toBe(true);
    expect(firstResult.data).toBeUndefined();

    const secondResult = validation.validate();
    expect(secondResult.invalid).toBeDefined();
    expect(secondResult.invalid).toBe(true);
    expect(secondResult.data).toEqual('message');
  });

  it('should pass the value to a message function if the validation fails', () => {
    const TEST_VALUE = {};
    const validation = Validation(() => false, value => value);
    const result = validation.validate(TEST_VALUE);
    expect(result.valid).toBe(false);
    expect(result.data).toEqual(TEST_VALUE);
  });
});
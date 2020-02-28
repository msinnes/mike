const { isClass } = require('@mike/class');

const RuntimeValidation = require('../../classes/RuntimeValidation');

const Validation = require('../../classes/Validation');

const mockValidateFn = jest.fn(() => {});
const mockMessage = jest.fn();

const testValidation = new Validation(mockValidateFn, mockMessage);

describe('RuntimeValidation', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be a class', () => {
    expect(isClass(RuntimeValidation)).toBe(true);

    expect(() => {
      new RuntimeValidation(testValidation);
    }).not.toThrow();

    expect(() => {
      RuntimeValidation(() => {});
    }).toThrowErrorMatchingSnapshot();
  });

  it('should extend Validation', () => {
    expect(RuntimeValidation.extends(Validation)).toBe(true);
  });

  it('should call the mockValidateFn', () => {
    const testValue = {};
    const runtimeValidation = new RuntimeValidation(testValidation);
    try {
      runtimeValidation.validate(testValue);
    // eslint-disable-next-line no-empty
    } catch (e) {}
    expect(mockValidateFn).toHaveBeenCalledTimes(1);
    expect(mockValidateFn.mock.calls[0][0]).toEqual(testValue);
  });

  it('should throw a runtime error with the validation message', () => {
    const runtimeValidation = new RuntimeValidation(testValidation);

    mockValidateFn.mockReturnValueOnce([false, 'error message']);
    mockMessage.mockReturnValueOnce('error message');
    expect(() => {
      runtimeValidation.validate();
    }).toThrowErrorMatchingSnapshot();
  });
});
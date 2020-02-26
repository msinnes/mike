const getEnforcement = require('@core/utils/getEnforcement');

describe('getEnforcement', () => {
  afterEach(() => jest.resetAllMocks);

  it('should be a function', () => {
    expect(getEnforcement).toBeDefined();
    expect(getEnforcement).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    const enforcement = getEnforcement();
    expect(enforcement).toBeDefined();
    expect(enforcement).toBeInstanceOf(Function);
  });

  it('should run a check function and throw an error if the check fails', () => {
    const checkMock = jest.fn();
    const ENFORCEMENT_STRING = 'string';
    const enforcement = getEnforcement(checkMock, ENFORCEMENT_STRING);
    checkMock.mockReturnValueOnce(true);
    expect(() => {
      enforcement();
    }).not.toThrow();

    checkMock.mockReturnValueOnce(false);
    expect(() => {
      enforcement();
    }).toThrowErrorMatchingSnapshot();
  });
});
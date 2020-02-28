const wrapRule = require('../../src/lib/wrapRule');
const nodeRuntimeValidation = require('../../src/validations/nodeRuntime');

const testRuleMock = jest.fn();
const nodeRuntimeValidationMock = jest.fn();
const contextTestValue = {};

describe('config/index', () => {
  beforeEach(() => {
    nodeRuntimeValidation.validate = nodeRuntimeValidationMock;
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(wrapRule).toBeDefined();
    expect(wrapRule).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(wrapRule()).toBeDefined();
    expect(wrapRule()).toBeInstanceOf(Function);
  });

  it('should call testRuleMock and pass contextTestValue', () => {
    wrapRule(testRuleMock, contextTestValue)();
    expect(testRuleMock).toHaveBeenCalledTimes(1);
    expect(testRuleMock.mock.calls[0][0]).toEqual(contextTestValue);
  });

  it('should call nodeRuntimeValidationMock with the return of testRuleMock', () => {
    const returnRef = {};
    testRuleMock.mockReturnValueOnce(returnRef);
    wrapRule(testRuleMock, contextTestValue)();
    expect(nodeRuntimeValidationMock).toHaveBeenCalledTimes(1);
    expect(nodeRuntimeValidationMock.mock.calls[0][0]).toEqual(returnRef);
  });
});
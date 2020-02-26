const ensure = require('../../src/lib/ensure');

const typeLoader = require('../../src/loaders/type');

const fieldOneCheckMock = jest.fn();
const fieldTwoCheckMock = jest.fn();

const mockInterface = {
  field1: typeLoader('name1', fieldOneCheckMock),
  field2: typeLoader('name2', fieldTwoCheckMock),
};

describe('ensure', () => {
  beforeEach(() => {
    fieldOneCheckMock.mockReturnValue(true);
    fieldTwoCheckMock.mockReturnValue(true);
  });
  it('should be a function', () => {
    expect(ensure).toBeInstanceOf(Function);
  });

  it('should iterate over a map of types and check it against an input object', () => {
    const field1Ref = {};
    const field2Ref = {};
    const mockInput = {
      field1: field1Ref,
      field2: field2Ref,
    };

    expect(() => {
      ensure(mockInput, mockInterface);
    }).not.toThrow();
    expect(fieldOneCheckMock).toHaveBeenCalledTimes(1);
    expect(fieldOneCheckMock.mock.calls[0][0]).toEqual(field1Ref);
    expect(fieldTwoCheckMock).toHaveBeenCalledTimes(1);
    expect(fieldTwoCheckMock.mock.calls[0][0]).toEqual(field2Ref);
  });

  it('should throw an error if all types are valid', () => {
    fieldOneCheckMock.mockReturnValueOnce(false);
    fieldTwoCheckMock.mockReturnValueOnce(false);
    const field1Ref = {};
    const field2Ref = {};
    const mockInput = {
      field1: field1Ref,
      field2: field2Ref,
    };

    expect(() => {
      ensure(mockInput, mockInterface);
    }).toThrowErrorMatchingSnapshot();
  });
});
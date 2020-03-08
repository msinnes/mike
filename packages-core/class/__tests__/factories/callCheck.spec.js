const callCheckFactory = require('../../src/factories/callCheck');

function ClassConstructor() {

}

const instance = new ClassConstructor();

jest.mock('../../src/lib/throwClassError');
const throwClassErrorMock = require('../../src/lib/throwClassError');

describe('callCheckFactory', () => {
  const callCheck = callCheckFactory('error text');
  afterEach(jest.resetAllMocks);

  it('should be a function', () => {
    expect(callCheckFactory).toBeDefined();
    expect(callCheckFactory).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(callCheck).toBeDefined();
    expect(callCheck).toBeInstanceOf(Function);
  });

  it('should throw an error if the first argument is not an instance of the second arguement', () => {
    callCheck(undefined, ClassConstructor);
    callCheck(null, Array);

    expect(throwClassErrorMock).toHaveBeenCalledTimes(2);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[1][0]).toEqual('error text');
  });

  it('should not throw an error if constructors are not the same', () => {
    callCheck(new Array(), ClassConstructor);
    callCheck(instance, Array);

    expect(throwClassErrorMock).toHaveBeenCalledTimes(2);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[1][0]).toEqual('error text');
  });

  it('should throw an error if the first argument is an instance of the second arguement', () => {
    callCheck(instance, ClassConstructor);
    callCheck([], Array);

    expect(throwClassErrorMock).not.toHaveBeenCalled();
  });
});

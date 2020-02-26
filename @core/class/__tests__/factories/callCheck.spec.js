const callCheckFactory = require('../../src/factories/callCheck');

const Bare = require('../../examples/constructors/Bare');
const Static = require('../../examples/constructors/Static');
const ProtoAndStatic = require('../../examples/constructors/ProtoAndStatic');

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
    callCheck(undefined, Bare);
    callCheck(null, Static);
    callCheck('', ProtoAndStatic);

    expect(throwClassErrorMock).toHaveBeenCalledTimes(3);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[1][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[2][0]).toEqual('error text');
  });

  it('should not throw an error if constructors are not the same', () => {
    callCheck(new Static(), Bare);
    callCheck(new ProtoAndStatic(), Static);
    callCheck(new Bare(), ProtoAndStatic);

    expect(throwClassErrorMock).toHaveBeenCalledTimes(3);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[1][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[2][0]).toEqual('error text');
  });

  it('should throw an error if the first argument is an instance of the second arguement', () => {
    callCheck(new Bare(), Bare);
    callCheck(new Static(), Static);
    callCheck(new ProtoAndStatic(), ProtoAndStatic);

    expect(throwClassErrorMock).not.toHaveBeenCalled();
  });
});

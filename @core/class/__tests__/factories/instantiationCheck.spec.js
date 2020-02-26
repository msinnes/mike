const instantiationCheckFactory = require('../../src/factories/instantiationCheck');

const Bare = require('../../examples/constructors/Bare');
const Static = require('../../examples/constructors/Static');
const ProtoAndStatic = require('../../examples/constructors/ProtoAndStatic');

jest.mock('../../src/lib/throwClassError');
const throwClassErrorMock = require('../../src/lib/throwClassError');

describe('instantiationCheckFactory', () => {
  const instantiationCheck = instantiationCheckFactory('error text');
  afterEach(jest.resetAllMocks);

  it('should be a function', () => {
    expect(instantiationCheckFactory).toBeDefined();
    expect(instantiationCheckFactory).toBeInstanceOf(Function);
  });

  it('should return a function', () => {
    expect(instantiationCheck).toBeDefined();
    expect(instantiationCheck).toBeInstanceOf(Function);
  });

  it('not throw an error if the first argument is not an instance of the second arguement', () => {
    instantiationCheck(undefined, Bare);
    expect(throwClassErrorMock).not.toHaveBeenCalled();
    instantiationCheck(null, Static);
    expect(throwClassErrorMock).not.toHaveBeenCalled();
    instantiationCheck('', ProtoAndStatic);
    expect(throwClassErrorMock).not.toHaveBeenCalled();
  });

  it('should not throw an error if constructors are not the same', () => {
    instantiationCheck(new Static(), Bare);
    instantiationCheck(new ProtoAndStatic(), Static);
    instantiationCheck(new Bare(), ProtoAndStatic);
    expect(throwClassErrorMock).not.toHaveBeenCalled();
  });

  it('should throw an error if the first argument is an instance of the second arguement', () => {
    instantiationCheck(new Bare(), Bare);
    instantiationCheck(new Static(), Static);
    instantiationCheck(new ProtoAndStatic(), ProtoAndStatic);

    expect(throwClassErrorMock).toHaveBeenCalledTimes(3);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[1][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[2][0]).toEqual('error text');
  });
});

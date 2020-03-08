const instantiationCheckFactory = require('../../src/factories/instantiationCheck');

function EmptyClass() {}
function AnotherClass() {}

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
    instantiationCheck(undefined, EmptyClass);
    expect(throwClassErrorMock).not.toHaveBeenCalled();
  });

  it('should not throw an error if constructors are not the same', () => {
    instantiationCheck(new EmptyClass(), AnotherClass);
    expect(throwClassErrorMock).not.toHaveBeenCalled();
  });

  it('should throw an error if the first argument is an instance of the second arguement', () => {
    instantiationCheck(new EmptyClass(), EmptyClass);
    instantiationCheck(new AnotherClass(), AnotherClass);

    expect(throwClassErrorMock).toHaveBeenCalledTimes(2);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('error text');
    expect(throwClassErrorMock.mock.calls[1][0]).toEqual('error text');
  });
});


const instantiationCheckFactoryMockReturnRef = () => {};
jest.mock('../../src/factories/instantiationCheck');
const instantiationCheckFactoryMock = require('../../src/factories/instantiationCheck');
instantiationCheckFactoryMock.mockReturnValue(instantiationCheckFactoryMockReturnRef);

const checkInterface = require('../../src/lib/checkInterface');

describe('checkInterface', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should call the instantiationCheckFactoryMock', () => {
    expect(instantiationCheckFactoryMock).toHaveBeenCalledTimes(1);
    expect(instantiationCheckFactoryMock.mock.calls[0][0]).toEqual('Interfaces are not constructors');
  });

  it('should be the return of the factory', () => {
    expect(checkInterface).toEqual(instantiationCheckFactoryMockReturnRef);
  });
});

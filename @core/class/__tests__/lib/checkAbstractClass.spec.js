
const instantiationCheckFactoryMockReturnRef = () => {};
jest.mock('../../src/factories/instantiationCheck');
const instantiationCheckFactoryMock = require('../../src/factories/instantiationCheck');
instantiationCheckFactoryMock.mockReturnValue(instantiationCheckFactoryMockReturnRef);

const checkAbstractClass = require('../../src/lib/checkAbstractClass');

describe('checkAbstractClass', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should call the instantiationCheckFactoryMock', () => {
    expect(instantiationCheckFactoryMock).toHaveBeenCalledTimes(1);
    expect(instantiationCheckFactoryMock.mock.calls[0][0]).toEqual('Abstract classes cannot be instantiated');
  });

  it('should be the return of the factory', () => {
    expect(checkAbstractClass).toEqual(instantiationCheckFactoryMockReturnRef);
  });
});

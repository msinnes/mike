const extendsFactoryMockReturnRef = {};

jest.mock('../../src/factories/extends');
const extendsFactoryMock = require('../../src/factories/extends');
extendsFactoryMock.mockReturnValue(extendsFactoryMockReturnRef);

const extendsInterface = require('../../src/lib/extendsInterface');

describe('extendsInterface', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should call the extendsFactoryMock', () => {
    expect(extendsFactoryMock).toHaveBeenCalledTimes(1);
    expect(extendsFactoryMock.mock.calls[0][0]).toEqual('Interface');
  });

  it('should be the return of the factory', () => {
    expect(extendsInterface).toEqual(extendsFactoryMockReturnRef);
  });
});

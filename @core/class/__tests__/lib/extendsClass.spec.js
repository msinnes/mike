const extendsFactoryMockReturnRef = {};

jest.mock('../../src/factories/extends');
const extendsFactoryMock = require('../../src/factories/extends');
extendsFactoryMock.mockReturnValue(extendsFactoryMockReturnRef);

const extendsClass = require('../../src/lib/extendsClass');

describe('extendsClass', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should call the extendsFactoryMock', () => {
    expect(extendsFactoryMock).toHaveBeenCalledTimes(1);
    expect(extendsFactoryMock.mock.calls[0][0]).toEqual('Class');
  });

  it('should be the return of the factory', () => {
    expect(extendsClass).toEqual(extendsFactoryMockReturnRef);
  });
});

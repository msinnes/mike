const checkAbstractClass = require('../../src/lib/checkAbstractClass');

const BaseClass = require('../../src/class/base');

function ExtendsBaseClass() {

}

ExtendsBaseClass.prototype = Object.create(BaseClass.prototype);
ExtendsBaseClass.prototype.constructor = ExtendsBaseClass;

jest.mock('../../src/lib/throwClassError');
const throwClassErrorMock = require('../../src/lib/throwClassError');

describe('checkAbstractClass', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('not throw an error if the first argument is not an instance of the second arguement', () => {
    checkAbstractClass(undefined, []);
    checkAbstractClass({}, Array);
    checkAbstractClass({}, Array);
    expect(throwClassErrorMock).not.toHaveBeenCalled();
  });

  it('should not throw an error if constructors are not the same', () => {
    checkAbstractClass(new ExtendsBaseClass(), BaseClass);
    expect(throwClassErrorMock).not.toHaveBeenCalled();
  });

  it('should throw an error if the first argument is an instance of the second arguement', () => {
    checkAbstractClass([], Array);
    checkAbstractClass({}, Object);
    checkAbstractClass(new ExtendsBaseClass(), ExtendsBaseClass);

    expect(throwClassErrorMock).toHaveBeenCalledTimes(3);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('Abstract classes cannot be instantiated');
    expect(throwClassErrorMock.mock.calls[1][0]).toEqual('Abstract classes cannot be instantiated');
    expect(throwClassErrorMock.mock.calls[2][0]).toEqual('Abstract classes cannot be instantiated');
  });
});

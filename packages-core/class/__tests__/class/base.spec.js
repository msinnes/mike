const BaseClass = require('../../src/class/base');
const inheritancePropFactory = require('../../src/factories/inheritanceProp');

jest.mock('../../src/lib/throwClassError');
const throwClassErrorMock = require('../../src/lib/throwClassError');
throwClassErrorMock.mockImplementation(jest.requireActual('../../src/lib/throwClassError'));

const privateVariable = require('@mike/utils/privateVariable');

describe('BaseClass', () => {
  it('should be a function', () => {
    expect(BaseClass).toBeInstanceOf(Function);
  });

  it('should have an empty object on static BaseClass property', () => {
    expect(BaseClass.Class).toMatchObject({
      _constructor: BaseClass,
      _prototype: BaseClass.prototype,
    });
  });

  it('should not have any enumerable properties on its prototype', () => {
    expect(Object.keys(BaseClass.prototype).length).toEqual(0);
  });

  it('should prevent the constructor from being called like a function', () => {
    expect(() => {
      BaseClass();
    }).toThrowErrorMatchingSnapshot();
    expect(throwClassErrorMock).toHaveBeenCalledTimes(1);
    expect(throwClassErrorMock.mock.calls[0][0]).toEqual('Cannot call a class as a function');
  });

  it('should assign the __class__ property on an instance', () => {
    function ExtendingClass() {
      BaseClass.call(this, arguments);
    }

    ExtendingClass.prototype = Object.create(BaseClass.prototype);
    ExtendingClass.prototype.constructor = ExtendingClass;

    privateVariable(ExtendingClass, 'Class', inheritancePropFactory('Class', ExtendingClass, {
      super: BaseClass.Class,
    }));
    const instance = new ExtendingClass();

    expect(instance.__class__).toMatchObject({
      __constructor__: ExtendingClass,
      __prototype__: ExtendingClass.prototype,
      __super__: BaseClass.Class.getInstanceProp(),
    });
  });
});

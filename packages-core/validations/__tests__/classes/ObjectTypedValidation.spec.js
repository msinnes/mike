const { loadClass, loadType } = require('@mike/class');

const ObjectTypedValidation = require('../../classes/ObjectTypedValidation');

const TypedValidation = require('../../classes/TypedValidation');

const validateFnMock = jest.fn();
const TestableValidation = loadClass(function() {
  this.type = loadType('name', validateFnMock);
}).extend(ObjectTypedValidation);


describe('ObjectTypedValidation', () => {
  let validation;

  beforeEach(() => {
    validation = new TestableValidation(() => {});
    validateFnMock.mockReturnValue([true]);
  });

  afterEach(jest.resetAllMocks);

  it('should be an abstract class', () => {
    expect(() => {
      new ObjectTypedValidation(() => {});
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      ObjectTypedValidation(() => {});
    }).toThrowErrorMatchingSnapshot();
  });

  it('should extend TypedValidation', () => {
    expect(ObjectTypedValidation.extends(TypedValidation)).toBe(true);
  });

  describe('type', () => {
    it('type.is should be the isObject utility', () => {
      expect(validation.type.is).toBeInstanceOf(Function);
    });

    it('type.message should be an expected array message', () => {
      expect(validation.type.message).toEqual('Expected name');
    });
  });
});
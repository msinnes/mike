const { loadClass, loadType, isClass } = require('@mike/class');
const isArray = require('@mike/utils/isArray');

const TypedValidation = require('../../classes/TypedValidation');
const Validation = require('../../classes/Validation');

const iTyped = require('../../interfaces/iTyped');

const validateFnMock = jest.fn();
const isMock = jest.fn();

const TestableValidation = loadClass(function() {
  this.type = loadType('name', isMock);
}).extend(TypedValidation);

const FailingValidation = loadClass(function() {}).extend(TypedValidation);

describe('TypedValidation', () => {
  beforeEach(() => {
    validateFnMock.mockReturnValue([true]);
    isMock.mockReturnValue(true);
  });

  afterEach(jest.resetAllMocks);

  it('should be an abstract class', () => {
    expect(isClass(TypedValidation)).toBe(true);

    expect(() => {
      new TypedValidation(() => {});
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      TypedValidation(() => {});
    }).toThrowErrorMatchingSnapshot();
  });

  it('should extend Validation', () => {
    expect(TypedValidation.extends(Validation)).toBe(true);
  });

  it('should implement iTyped', () => {
    expect(TypedValidation.implements(iTyped)).toBe(true);
    expect(() => {
      new FailingValidation(() => {});
    }).toThrowErrorMatchingSnapshot();
  });

  describe('config.type', () => {
    it('should set the unsafe, _type property', () => {
      const validation = new TestableValidation(() => {});
      expect(validation.type).toBeDefined();
    });

    it('should call type.is method', () => {
      const VALUE_REF = {};
      const validation = new TestableValidation(validateFnMock);
      validation.validate(VALUE_REF);
      expect(isMock).toHaveBeenCalledTimes(1);
      expect(isMock.mock.calls[0][0]).toEqual(VALUE_REF);
    });

    it('should call the super.validate if the type check passes', () => {
      const VALUE_REF = {};
      const validation = new TestableValidation(validateFnMock);
      validation.validate(VALUE_REF);
      expect(validateFnMock).toHaveBeenCalledTimes(1);
      expect(validateFnMock.mock.calls[0][0]).toEqual(VALUE_REF);
    });

    it('should return _type.message if _type.is returns false', () => {
      const validation = new TestableValidation(() => {});
      isMock.mockReturnValueOnce(false);
      const result = validation.validate();
      expect(result.valid).toBe(false);
      expect(result.data).toEqual('Expected name');
    });
  });

  describe('config', () => {
    it('should respect allowEmpty', () => {
      const validation = new TestableValidation(() => {}, { allowEmpty: true });
      isMock.mockImplementation(isArray);
      const result = validation.validate();
      expect(result.valid).toBe(true);
    });
  });
});
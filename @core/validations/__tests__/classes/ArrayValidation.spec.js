const ArrayValidation = require('../../classes/ArrayValidation');

const TypedValidation = require('../../classes/TypedValidation');
const Validation = require('../../classes/Validation');

const validateFnMock = jest.fn();

const testValidation = new Validation(validateFnMock);

describe('ArrayValidation', () => {
  let validation;

  beforeEach(() => {
    validation = new ArrayValidation(testValidation);
    validateFnMock.mockReturnValue([true]);
  });

  afterEach(jest.resetAllMocks);

  it('should be a class', () => {
    expect(() => {
      new ArrayValidation();
    }).not.toThrow();

    expect(() => {
      ArrayValidation(() => {});
    }).toThrowErrorMatchingSnapshot();
  });

  it('should extend TypedValidation', () => {
    expect(ArrayValidation.extends(TypedValidation)).toBe(true);
  });

  describe('_type', () => {
    it('_type.is should be the isArray utility', () => {
      expect(validation._type.is).toBeInstanceOf(Function);
    });

    it('_type.message should be an expected array message', () => {
      expect(validation._type.message).toEqual('Expected Array');
    });
  });

  describe('functionality', () => {
    const REF_1 = {}, REF_2 = {};
    const testArray = [REF_1, REF_2];

    it('should call the validation.validate function for each element in the input array', () => {
      validation.validate(testArray);

      expect(validateFnMock).toHaveBeenCalledTimes(2);
      expect(validateFnMock.mock.calls[0][0]).toEqual(REF_1);
      expect(validateFnMock.mock.calls[1][0]).toEqual(REF_2);
    });

    it('should return invalid if any of the elements are invalid', () => {
      validateFnMock.mockReturnValueOnce([false, 'error']);
      const results = validation.validate(testArray);
      expect(results.valid).toBe(false);
      expect(results.data[0].data).toEqual('error');
    });
  });
});
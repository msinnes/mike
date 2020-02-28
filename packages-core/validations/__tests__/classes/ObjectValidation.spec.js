const ObjectValidation = require('../../classes/ObjectValidation');

const ObjectTypedValidation = require('../../classes/ObjectTypedValidation');
const Validation = require('../../classes/Validation');

const validateFnMock = jest.fn();

const testValidation = new Validation(validateFnMock);

describe('ObjectValidation', () => {
  let validation;

  beforeEach(() => {
    validation = new ObjectValidation({
      field1: testValidation,
      field2: testValidation,
    });
    validateFnMock.mockReturnValue([true]);
  });

  afterEach(jest.resetAllMocks);

  it('should be a class', () => {
    expect(() => {
      new ObjectValidation();
    }).not.toThrow();

    expect(() => {
      ObjectValidation(() => {});
    }).toThrowErrorMatchingSnapshot();
  });


  it('should extend ObjectTypedValidation', () => {
    expect(ObjectValidation.extends(ObjectTypedValidation)).toBe(true);
  });

  describe('functionality', () => {
    const REF_1 = {}, REF_2 = {};
    const testObject = {
      field1: REF_1,
      field2: REF_2,
    };

    it('should call the validation.validate function for each enumerable property on the object', () => {
      validation.validate(testObject);

      expect(validateFnMock).toHaveBeenCalledTimes(2);
      expect(validateFnMock.mock.calls[0][0]).toEqual(REF_1);
      expect(validateFnMock.mock.calls[1][0]).toEqual(REF_2);
    });

    it('should return invalid if any of the properties are invalid', () => {
      validateFnMock.mockReturnValueOnce([false, 'error']);
      const results = validation.validate(testObject);
      expect(results.valid).toBe(false);
      expect(results.data.field1.data).toEqual('error');
    });
  });
});
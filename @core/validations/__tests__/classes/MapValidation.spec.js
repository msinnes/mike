const MapValidation = require('../../classes/MapValidation');

const ObjectTypedValidation = require('../../classes/ObjectTypedValidation');
const Validation = require('../../classes/Validation');

const keysValidateFnMock = jest.fn();
const testKeysValidation = new Validation(keysValidateFnMock);
const valuesValidateFnMock = jest.fn();
const testValuesValidation = new Validation(valuesValidateFnMock);

describe('MapValidation', () => {
  let validationWithoutKeys;
  let validationWithKeys;

  beforeEach(() => {
    valuesValidateFnMock.mockReturnValue([true]);
    keysValidateFnMock.mockReturnValue([true]);
    validationWithoutKeys = new MapValidation({
      values: testValuesValidation,
    });
    validationWithKeys = new MapValidation({
      keys: testKeysValidation,
      values: testValuesValidation,
    });
  });

  afterEach(jest.resetAllMocks);

  it('should be a class', () => {
    expect(() => {
      new MapValidation();
    }).not.toThrow();

    expect(() => {
      MapValidation(() => {});
    }).toThrowErrorMatchingSnapshot();
  });


  it('should extend ObjectTypedValidation', () => {
    expect(MapValidation.extends(ObjectTypedValidation)).toBe(true);
  });

  describe('functionality', () => {
    const REF_1 = {}, REF_2 = {};
    const testObject = {
      field1: REF_1,
      field2: REF_2,
    };

    it('should call the valuesValidation.validate function for each enumerable property on the object', () => {
      validationWithoutKeys.validate(testObject);

      expect(valuesValidateFnMock).toHaveBeenCalledTimes(2);
      expect(keysValidateFnMock).not.toHaveBeenCalled();
      expect(valuesValidateFnMock.mock.calls[0][0]).toEqual(REF_1);
      expect(valuesValidateFnMock.mock.calls[1][0]).toEqual(REF_2);
    });

    it('should call the keysValidation.validate function for each enumerable property on the object', () => {
      validationWithKeys.validate(testObject);

      expect(valuesValidateFnMock).toHaveBeenCalledTimes(2);
      expect(keysValidateFnMock).toHaveBeenCalledTimes(2);
      expect(keysValidateFnMock.mock.calls[0][0]).toEqual('field1');
      expect(keysValidateFnMock.mock.calls[1][0]).toEqual('field2');
    });

    it('should return invalid if any of the properties are invalid', () => {
      valuesValidateFnMock.mockReturnValueOnce([false, 'error']);
      const results = validationWithoutKeys.validate(testObject);
      expect(results.valid).toBe(false);
      expect(results.data.field1.value.data).toEqual('error');
    });
  });
});
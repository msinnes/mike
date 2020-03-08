const { loadClass } = require('@mike/class');

const BaseValidation = require('../../classes/BaseValidation');
const ValidationResult = require('../../lib/ValidationResult');

const iValidation = require('../../interfaces/iValidation');

const Validation = loadClass(function(validateFn, config = {}) {
  this.validateFn = validateFn;
  this.allowEmpty = config.allowEmpty || null;
  this.throwOnInvalid = config.throwOnInvalid || null;
}).extend(BaseValidation);

const VALUE_REF = {};
const MOCK_PASSING_RETURN_VALUE = [true];
const MOCK_RETURN_VALUE_REF = {};
const MOCK_FAILING_RETURN_VALUE = [false, MOCK_RETURN_VALUE_REF];

describe('BaseValidation', () => {
  let validateMock;
  let validateMockWrapper;

  beforeEach(() => {
    validateMock = jest.fn();

    validateMockWrapper = value => validateMock(value);
  });
  afterEach(jest.resetAllMocks);

  it('should be an abstract class', () => {
    expect(() => {
      new BaseValidation('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      BaseValidation('string');
    }).toThrowErrorMatchingSnapshot();
  });

  it('should implement iValidation', () => {
    expect(BaseValidation.implements(iValidation)).toBe(true);
  });
  describe('instance', () => {
    it('should set unsafe, internal variables', () => {
      const TEST_VALIDATE_FN = () => {};
      const instance1 = new Validation(TEST_VALIDATE_FN);
      expect(instance1.validateFn).toBeDefined();
      expect(instance1.validateFn).toEqual(TEST_VALIDATE_FN);
      expect(instance1.allowEmpty).toBeDefined();
      expect(instance1.allowEmpty).toEqual(null);
      expect(instance1.throwOnInvalid).toBeDefined();
      expect(instance1.throwOnInvalid).toEqual(null);

      const instance2 = new Validation(TEST_VALIDATE_FN, {
        allowEmpty: true,
        throwOnInvalid: true,
      });
      expect(instance2.validateFn).toBeDefined();
      expect(instance2.validateFn).toEqual(TEST_VALIDATE_FN);
      expect(instance2.allowEmpty).toBeDefined();
      expect(instance2.allowEmpty).toEqual(true);
      expect(instance2.throwOnInvalid).toBeDefined();
      expect(instance2.throwOnInvalid).toEqual(true);
    });

    describe('instance.validate', () => {
      it('should be a function', () => {
        const TEST_VALIDATE_FN = () => {};
        const instance = new Validation(TEST_VALIDATE_FN);
        expect(instance.validate).toBeDefined();
        expect(instance.validate).toBeInstanceOf(Function);
      });

      describe('passing validation', () => {
        it('should call the validateMock', () => {
          const instance = new Validation(validateMockWrapper);
          validateMock.mockReturnValueOnce(MOCK_PASSING_RETURN_VALUE);

          instance.validate(VALUE_REF);
          expect(validateMock).toHaveBeenCalledTimes(1);
          expect(validateMock.mock.calls[0][0]).toEqual(VALUE_REF);
        });

        it('should return an instance of ValidationResult', () => {
          const instance = new Validation(validateMockWrapper);
          validateMock.mockReturnValueOnce(MOCK_PASSING_RETURN_VALUE);
          const result = instance.validate();
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toEqual(true);
          expect(result.invalid).toEqual(false);
          expect(result.data).toBeUndefined();
        });
      });

      describe('failing validation', () => {
        describe('with a string message', () => {
          it('should call the validateFn mock', () => {
            const instance = new Validation(validateMockWrapper);
            validateMock.mockReturnValueOnce(MOCK_FAILING_RETURN_VALUE);

            instance.validate(VALUE_REF);
            expect(validateMock).toHaveBeenCalledTimes(1);
            expect(validateMock.mock.calls[0][0]).toEqual(VALUE_REF);
          });

          it('should return an instance of ValidationResult', () => {
            const instance = new Validation(validateMockWrapper);
            validateMock.mockReturnValueOnce(MOCK_FAILING_RETURN_VALUE);
            const result = instance.validate();
            expect(result).toBeInstanceOf(ValidationResult);
            expect(result.valid).toEqual(false);
            expect(result.invalid).toEqual(true);
            expect(result.data).toBeDefined();
            expect(result.data).toEqual(MOCK_RETURN_VALUE_REF);
          });
        });

        describe('with a function message', () => {
          it('should call both mocks', () => {
            const instance = new Validation(validateMockWrapper);
            const REF = {};
            validateMock.mockReturnValueOnce(MOCK_FAILING_RETURN_VALUE);

            instance.validate(REF);
            expect(validateMock).toHaveBeenCalledTimes(1);
            expect(validateMock.mock.calls[0][0]).toEqual(VALUE_REF);
          });

          it('should return an instance of ValidationResult', () => {
            const instance = new Validation(validateMockWrapper);
            validateMock.mockReturnValueOnce(MOCK_FAILING_RETURN_VALUE);

            const result = instance.validate();
            expect(result).toBeInstanceOf(ValidationResult);
            expect(result.valid).toEqual(false);
            expect(result.invalid).toEqual(true);
            expect(result.data).toBeDefined();
            expect(result.data).toEqual(MOCK_RETURN_VALUE_REF);
          });
        });
      });
    });
  });
});
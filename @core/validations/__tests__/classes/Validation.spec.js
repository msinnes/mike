const Validation = require('../../classes/Validation');
const ValidationResult = require('../../lib/ValidationResult');

const VALUE_REF = {};
const MOCK_PASSING_RETURN_VALUE = [true];
const MOCK_RETURN_VALUE_REF = {};
const MOCK_FAILING_RETURN_VALUE = [false, MOCK_RETURN_VALUE_REF];

describe('Validation', () => {
  let validateMock;
  let validateMockWrapper;

  beforeEach(() => {
    validateMock = jest.fn();

    validateMockWrapper = value => validateMock(value);
  });
  afterEach(jest.resetAllMocks);

  it('should be a class', () => {
    expect(() => {
      new Validation(() => {}, 'string');
    }).not.toThrow();

    expect(() => {
      Validation(() => {});
    }).toThrowErrorMatchingSnapshot();
  });

  describe('instance', () => {
    it('should set unsafe, internal variables', () => {
      const TEST_VALIDATE_FN = () => {};
      const instance1 = new Validation(TEST_VALIDATE_FN);
      expect(instance1._validateFn).toBeDefined();
      expect(instance1._validateFn).toEqual(TEST_VALIDATE_FN);
      expect(instance1._allowEmpty).toBeDefined();
      expect(instance1._allowEmpty).toEqual(false);
      expect(instance1._throwOnInvalid).toBeDefined();
      expect(instance1._throwOnInvalid).toEqual(false);

      const instance2 = new Validation(TEST_VALIDATE_FN, {
        allowEmpty: true,
        throwOnInvalid: true,
      });
      expect(instance2._validateFn).toBeDefined();
      expect(instance2._validateFn).toEqual(TEST_VALIDATE_FN);
      expect(instance2._allowEmpty).toBeDefined();
      expect(instance2._allowEmpty).toEqual(true);
      expect(instance2._throwOnInvalid).toBeDefined();
      expect(instance2._throwOnInvalid).toEqual(true);
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

  describe('config', () => {
    describe('allowEmpty', () => {
      it('should allow for null or undefined inputs and not call mocks', () => {
        const instance = new Validation(validateMockWrapper, {
          allowEmpty: true,
        });

        validateMock.mockReturnValueOnce(false);
        const firstResult = instance.validate();
        expect(firstResult.valid).toBe(true);
        expect(firstResult.invalid).toBe(false);
        expect(firstResult.data).toBeUndefined();

        const secondResult = instance.validate(null);
        expect(secondResult.valid).toBe(true);
        expect(secondResult.invalid).toBe(false);
        expect(secondResult.data).toBeUndefined();

        expect(validateMock).not.toHaveBeenCalled();
      });
    });

    describe('throwOnInvalid', () => {
      it('should throw a ValidationError if the validation fails', () => {
        const instance = new Validation(validateMockWrapper, {
          throwOnInvalid: true,
        });

        const ERROR_STRING = 'error string';
        validateMock.mockReturnValueOnce([false, ERROR_STRING]);

        expect(() => {
          instance.validate();
        }).toThrowErrorMatchingSnapshot();
      });
    });
  });
});
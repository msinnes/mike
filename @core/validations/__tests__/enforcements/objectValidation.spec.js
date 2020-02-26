const objectValidationEnforcement = require('../../enforcements/objectValidation');
const Validation = require('../../classes/Validation');
const ArrayValidation = require('../../classes/ArrayValidation');

const validation = new Validation(() => {}, () => {});
const arrayValidation = new ArrayValidation(validation);

describe('objectValidationEnforcement', () => {
  it('should be a function', () => {
    expect(objectValidationEnforcement).toBeDefined();
    expect(objectValidationEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error', () => {
    expect(() => {
      objectValidationEnforcement({});
    }).not.toThrow();
    expect(() => {
      objectValidationEnforcement({
        field1: validation,
      });
    }).not.toThrow();
    expect(() => {
      objectValidationEnforcement({
        field1: validation,
        field2: arrayValidation,
      });
    }).not.toThrow();
    // TODO: also should do an objet validation
  });

  it('should throw an error', () => {
    expect(() => {
      objectValidationEnforcement();
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      objectValidationEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      objectValidationEnforcement('string');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      objectValidationEnforcement(() => {});
    }).toThrowErrorMatchingSnapshot();
    // TODO: should also have validations on the fields of an object checked
  });
});

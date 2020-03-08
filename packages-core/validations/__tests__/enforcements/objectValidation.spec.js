const objectValidationEnforcement = require('../../enforcements/objectValidation');
const Validation = require('../../classes/Validation');
const ArrayValidation = require('../../classes/ArrayValidation');
const ObjectValidation = require('../../classes/ObjectValidation');
const MapValidation = require('../../classes/MapValidation');

const testValidation = new Validation(() => {});
const testArrayValidation = new ArrayValidation(testValidation);
const testObjectValidation = new ObjectValidation({
  fieldOne: testValidation,
});
const testMapValidation = new MapValidation({
  values: testValidation,
});

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
        field1: testValidation,
      });
    }).not.toThrow();
    expect(() => {
      objectValidationEnforcement({
        field1: testValidation,
        field2: testArrayValidation,
      });
    }).not.toThrow();
    expect(() => {
      objectValidationEnforcement({
        field1: testMapValidation,
        field2: testObjectValidation,
      });
    }).not.toThrow();
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
    expect(() => {
      objectValidationEnforcement(() => {
        objectValidationEnforcement({
          field1: () => {},
        });
      });
    }).toThrowErrorMatchingSnapshot();
  });
});

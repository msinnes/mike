const validationEnforcement = require('../../enforcements/validation');
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

describe('validationEnforcement', () => {
  it('should be a function', () => {
    expect(validationEnforcement).toBeDefined();
    expect(validationEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error', () => {
    expect(() => {
      validationEnforcement(testValidation);
    }).not.toThrow();
    expect(() => {
      validationEnforcement(testArrayValidation);
    }).not.toThrow();
    expect(() => {
      validationEnforcement(testObjectValidation);
    }).not.toThrow();
    expect(() => {
      validationEnforcement(testMapValidation);
    }).not.toThrow();
  });

  it('should throw an error', () => {
    expect(() => {
      validationEnforcement();
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      validationEnforcement([]);
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      validationEnforcement({});
    }).toThrowErrorMatchingSnapshot();
  });
});

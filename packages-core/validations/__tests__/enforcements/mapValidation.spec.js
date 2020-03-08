const mapValidationEnforcement = require('../../enforcements/mapValidation');
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


describe('mapValidationEnforcement', () => {
  it('should be a function', () => {
    expect(mapValidationEnforcement).toBeDefined();
    expect(mapValidationEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error', () => {
    expect(() => {
      mapValidationEnforcement({
        values: testValidation,
      });
    }).not.toThrow();
    expect(() => {
      mapValidationEnforcement({
        values: testArrayValidation,
        keys: testValidation,
      });
    }).not.toThrow();
    expect(() => {
      mapValidationEnforcement({
        values: testObjectValidation,
        keys: testValidation,
      });
    }).not.toThrow();
    expect(() => {
      mapValidationEnforcement({
        values: testMapValidation,
        keys: testValidation,
      });
    }).not.toThrow();
  });

  it('should throw an error', () => {
    expect(() => {
      mapValidationEnforcement();
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      mapValidationEnforcement({});
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      mapValidationEnforcement('string');
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      mapValidationEnforcement({
        values: testValidation,
        keys: 'string',
      });
    }).toThrowErrorMatchingSnapshot();
    expect(() => {
      mapValidationEnforcement({
        keys: testValidation,
        values: 'string',
      });
    }).toThrowErrorMatchingSnapshot();
  });
});

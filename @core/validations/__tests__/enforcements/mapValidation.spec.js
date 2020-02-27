const mapValidationEnforcement = require('../../enforcements/mapValidation');
const Validation = require('../../classes/Validation');

const testValidation = new Validation(() => {});

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
        values: testValidation,
        keys: testValidation,
      });
    }).not.toThrow();
    // TODO: also should do an objet validation
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

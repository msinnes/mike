const validationEnforcement = require('../../enforcements/validation');
const Validation = require('../../classes/Validation');
const ArrayValidation = require('../../classes/ArrayValidation');

describe('validationEnforcement', () => {
  it('should be a function', () => {
    expect(validationEnforcement).toBeDefined();
    expect(validationEnforcement).toBeInstanceOf(Function);
  });

  it('should not throw an error', () => {
    expect(() => {
      validationEnforcement(new Validation(() => {}, () => {}));
    }).not.toThrow();
    expect(() => {
      validationEnforcement(new ArrayValidation(new Validation(() => {}, () => {})));
    }).not.toThrow();
    // TODO: also should do an objet validation
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

const BaseValidation = require('../../classes/BaseValidation');

describe('BaseValidation', () => {
  it('should be an abstract class', () => {
    expect(() => {
      new BaseValidation('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      BaseValidation('string');
    }).toThrowErrorMatchingSnapshot();
  });
});
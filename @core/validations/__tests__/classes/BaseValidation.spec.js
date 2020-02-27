const BaseValidation = require('../../classes/BaseValidation');
const iValidation = require('../../interfaces/iValidation');

describe('BaseValidation', () => {
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
});
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

  // TODO: Add this back in
  // it('should implement iValidation', () => {
  //   expect(BaseValidation.implements(iValidation)).toBe(true);
  // });
});
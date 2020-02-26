const privateVariable = require('../privateVariable');

describe('privateVariable', () => {
  it('should be a function', () => {
    expect(privateVariable).toBeDefined();
    expect(privateVariable).toBeInstanceOf(Function);
  });

  it('should assign an non-enumerable keys', () => {
    const baseObject = {};
    privateVariable(baseObject, 'key', 'value');

    expect(Object.keys(baseObject).indexOf('key')).toEqual(-1);
    expect(baseObject.key).toBeDefined();
    expect(baseObject.key).toEqual('value');
  });
});
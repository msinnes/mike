const readOnlyVariable = require('../readOnlyVariable');

describe('readOnlyVariable', () => {
  it('should be a function', () => {
    expect(readOnlyVariable).toBeDefined();
    expect(readOnlyVariable).toBeInstanceOf(Function);
  });

  it('should add the value to the object', () => {
    const obj = {};
    readOnlyVariable(obj, 'prop', 'value');
    expect(obj.prop).toBeDefined();
    expect(obj.prop).toEqual('value');
  });

  it('should throw an error if someone tries to write to the variable', () => {
    const obj = {};
    readOnlyVariable(obj, 'prop', 'value');
    expect(() => {
      obj.prop = 'some new value';
    }).toThrowErrorMatchingSnapshot();
  });

  describe('config', () => {
    describe('get', () => {
      it('should allow for a custom get function', () => {
        let value = 0;
        const obj = {};
        readOnlyVariable(obj, 'prop', value, {
          get: () => value,
        });
        expect(obj.prop).toEqual(0);
        value++;
        expect(obj.prop).toEqual(1);
      });
    });
  });
});
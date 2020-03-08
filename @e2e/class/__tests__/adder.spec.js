const { isClass } = require('@mike/class');

const BaseAdder = require('../src/adder/base');
const ValueAdder = require('../src/adder/value');
const OffsetAdder = require('../src/adder/offset');
const TwoOffsetAdder = require('../src/adder/two-offset');

describe('adder', () => {
  describe('BaseAdder', () => {
    it('should be a class', () => {
      expect(isClass(BaseAdder)).toBe(true);
    });

    it('should be an abstract class', () => {
      expect(() => {
        new BaseAdder();
      }).toThrowErrorMatchingSnapshot();
    });

    it('should have an add method on its prototype', () => {
      expect(BaseAdder.prototype.add).toBeDefined();
      expect(BaseAdder.prototype.add).toBeInstanceOf(Function);
    });

    it('should be able to add 2 numbers together', () => {
      expect(BaseAdder.prototype.add(1, 2)).toEqual(3);
    });
  });

  describe('ValueAdder', () => {
    it('should be a class', () => {
      expect(isClass(ValueAdder)).toBe(true);
    });

    it('should extend BaseAdder', () => {
      expect(ValueAdder.extends(BaseAdder)).toBe(true);
    });

    it('should add an input value to an instance value', () => {
      const adder = new ValueAdder(1);
      expect(adder.value).toEqual(1);
      expect(adder.add(1)).toEqual(2);
    });

    it('should call BaseAdder.prototype.add to with this.value and the input value', () => {
      const addMock = jest.fn();
      const addOriginal = BaseAdder.prototype.add;
      BaseAdder.prototype.add = addMock;
      const thisDotValueRef = {};
      const adder = new ValueAdder(thisDotValueRef);
      const valueRef = {};
      adder.add(valueRef);
      expect(addMock).toHaveBeenCalledTimes(1);
      expect(addMock.mock.calls[0][0]).toEqual(thisDotValueRef);
      expect(addMock.mock.calls[0][1]).toEqual(valueRef);
      BaseAdder.prototype.add = addOriginal;
    });
  });

  describe('OffsetAdder', () => {
    it('should be a class', () => {
      expect(isClass(OffsetAdder)).toBe(true);
    });

    it('should be an abstract class', () => {
      expect(() => {
        new OffsetAdder();
      }).toThrowErrorMatchingSnapshot();
    });

    it('should extend ValueAdder', () => {
      expect(OffsetAdder.extends(ValueAdder)).toBe(true);
    });
  });

  describe('TwoOffsetAdder', () => {
    it('should be a class', () => {
      expect(isClass(TwoOffsetAdder)).toBe(true);
    });

    it('should extend BaseAdder', () => {
      expect(TwoOffsetAdder.extends(BaseAdder)).toBe(true);
    });

    it('should add an input value to an instance value', () => {
      const adder = new TwoOffsetAdder(1);
      expect(adder.value).toEqual(1);
      expect(adder.add(1)).toEqual(4);
    });

    it('should call BaseAdder.prototype.add to with this.value and the input value', () => {
      const addMock = jest.fn();
      const addOriginal = BaseAdder.prototype.add;
      BaseAdder.prototype.add = addMock;
      const adder = new TwoOffsetAdder(1);
      adder.add(3);
      expect(addMock).toHaveBeenCalledTimes(1);
      expect(addMock.mock.calls[0][0]).toEqual(1);
      expect(addMock.mock.calls[0][1]).toEqual(5);
      BaseAdder.prototype.add = addOriginal;
    });
  });
});

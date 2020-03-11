const { loadClass } = require('@mike/class');

const Context = require('@mike/translator-classes/Context');
const iContextual = require('@mike/translator-interfaces/iContextual');

const Contextual = require('../Contextual');

const TestableContext = loadClass(function() {
  this.constructor.expose(this, 'currentCharacter', () => 'a');
}).extend(Context);

describe('Contextual', () => {
  let instance;
  beforeEach(() => {
    const TestableContextual = loadClass(function() {
      this.ContextClass = TestableContext;
    }).extend(Contextual);
    instance = new TestableContextual();
  });

  it('should be an abstract class', () => {
    expect(() => {
      Contextual('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Contextual('string');
    }).toThrowErrorMatchingSnapshot();
  });

  it('should implement iLexer', () => {
    expect(Contextual.implements(iContextual)).toBe(true);
  });

  describe('instance', () => {
    it('should have a createContext method', () => {
      expect(instance.createContext).toBeInstanceOf(Function);
    });

    it('instance.createContext should call the constructor with the input args', () => {
      const constructorMock = jest.fn();
      const contextRef = {};
      constructorMock.mockReturnValue(contextRef);
      instance.ContextClass = constructorMock;

      const arg1Ref = {};
      const arg2Ref = {};

      const result = instance.createContext(arg1Ref, arg2Ref);
      expect(constructorMock).toHaveBeenCalledTimes(1);
      expect(constructorMock).toHaveBeenCalledWith(arg1Ref, arg2Ref);
      expect(result).toEqual(contextRef);
    });
  });
});
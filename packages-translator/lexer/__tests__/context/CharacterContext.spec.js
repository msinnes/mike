const Context = require('@mike/translator-classes/Context');

const CharacterContext = require('../../src/context/CharacterContext');

describe('CharacterContext', () => {
  let instance;

  beforeEach(() => {
    instance = new CharacterContext('abc');
  });

  it('should extend context', () => {
    expect(CharacterContext.extends(Context)).toBe(true);
  });

  it('should return an object', () => {
    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(Object);
  });

  describe('currentCharacter', () => {
    it('should be 0', () => {
      expect(instance.currentCharacter).toBeDefined();
      expect(instance.currentCharacter).toEqual('a');
    });
  });

  describe('advance', () => {
    it('should be a function', () => {
      expect(instance.advance).toBeDefined();
      expect(instance.advance).toBeInstanceOf(Function);
    });

    it('should return the next character', () => {
      let next = instance.advance();
      expect(next).toEqual('b');
      next = instance.advance();
      expect(next).toEqual('c');
    });

    it('should advance the currentCharacter', () => {
      instance.advance();
      expect(instance.currentCharacter).toEqual('b');
      instance.advance();
      expect(instance.currentCharacter).toEqual('c');
    });

    it('should return null if there if there are no more characters', () => {
      instance.advance();
      instance.advance();
      expect(instance.advance()).toEqual(null);
    });

    it('should set the position to null if there are no characters left', () => {
      instance.advance();
      instance.advance();
      instance.advance();
      expect(instance.currentCharacter).toEqual(null);
    });
  });

  describe('peek', () => {
    it('should be a function', () => {
      expect(instance.advance).toBeDefined();
      expect(instance.advance).toBeInstanceOf(Function);
    });

    it('should return a the correct character', () => {
      expect(instance.peek()).toEqual('b');
      instance.advance();
      expect(instance.peek()).toEqual('c');
    });

    it('should not advance the current character', () => {
      expect(instance.peek()).toEqual('b');
      expect(instance.currentCharacter).toEqual('a');
    });

    it('should take an optional peekLength param', () => {
      expect(instance.peek(2)).toEqual('c');
      expect(instance.peek(3)).toEqual(null);
    });

    it('should return null if there if there are no more characters', () => {
      instance.advance();
      instance.advance();
      instance.advance();
      expect(instance.peek()).toEqual(null);
    });
  });
});

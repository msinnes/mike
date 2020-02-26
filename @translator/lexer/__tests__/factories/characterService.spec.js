const characterServiceFactory = require('../../src/factories/characterService');

describe('characterServiceFactory', () => {
  let characterService;

  beforeEach(() => {
    characterService = characterServiceFactory('abc');
  });

  it('should be a function', () => {
    expect(characterServiceFactory).toBeDefined();
    expect(characterServiceFactory).toBeInstanceOf(Function);
  });

  it('should return an object', () => {
    expect(characterService).toBeDefined();
    expect(characterService).toBeInstanceOf(Object);
  });

  describe('currentCharacter', () => {
    it('should be 0', () => {
      expect(characterService.currentCharacter).toBeDefined();
      expect(characterService.currentCharacter).toEqual('a');
    });
  });

  describe('advance', () => {
    it('should be a function', () => {
      expect(characterService.advance).toBeDefined();
      expect(characterService.advance).toBeInstanceOf(Function);
    });

    it('should return the next character', () => {
      let next = characterService.advance();
      expect(next).toEqual('b');
      next = characterService.advance();
      expect(next).toEqual('c');
    });

    it('should advance the currentCharacter', () => {
      characterService.advance();
      expect(characterService.currentCharacter).toEqual('b');
      characterService.advance();
      expect(characterService.currentCharacter).toEqual('c');
    });

    it('should return null if there if there are no more characters', () => {
      characterService.advance();
      characterService.advance();
      expect(characterService.advance()).toEqual(null);
    });

    it('should set the position to null if there are no characters left', () => {
      characterService.advance();
      characterService.advance();
      characterService.advance();
      expect(characterService.currentCharacter).toEqual(null);
    });
  });

  describe('peek', () => {
    it('should be a function', () => {
      expect(characterService.advance).toBeDefined();
      expect(characterService.advance).toBeInstanceOf(Function);
    });

    it('should return a the correct character', () => {
      expect(characterService.peek()).toEqual('b');
      characterService.advance();
      expect(characterService.peek()).toEqual('c');
    });

    it('should not advance the current character', () => {
      expect(characterService.peek()).toEqual('b');
      expect(characterService.currentCharacter).toEqual('a');
    });

    it('should take an optional peekLength param', () => {
      expect(characterService.peek(2)).toEqual('c');
      expect(characterService.peek(3)).toEqual(null);
    });

    it('should return null if there if there are no more characters', () => {
      characterService.advance();
      characterService.advance();
      characterService.advance();
      expect(characterService.peek()).toEqual(null);
    });
  });
});

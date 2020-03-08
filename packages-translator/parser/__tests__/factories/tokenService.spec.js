const tokenServiceFactory = require('../../src/factories/tokenService');

const lexerConstructorMock = jest.fn();

describe('tokenServiceFactory', () => {
  let tokenService;

  beforeEach(() => {
    lexerConstructorMock.mockImplementation(() => {
      function* advance() {
        yield {
          type: 'type',
          value: 'abc',
        };
        yield {
          type: 'type',
          value: 'def',
        };
      }
      const gen = advance();
      return {
        getNextToken: () => gen.next().value,
      };
    });
    tokenService = tokenServiceFactory(lexerConstructorMock, 'abc');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(tokenServiceFactory).toBeDefined();
    expect(tokenServiceFactory).toBeInstanceOf(Function);
  });

  it('should return an object', () => {
    expect(tokenService).toBeDefined();
    expect(tokenService).toBeInstanceOf(Object);
  });

  it('should call the passed-in lexerConstructor', () => {
    expect(lexerConstructorMock).toHaveBeenCalledTimes(1);
    expect(lexerConstructorMock.mock.calls[0][0]).toEqual('abc');
  });

  describe('currentToken', () => {
    it('should have a currentToken prop returned from lexer.getNextToken', () => {
      expect(tokenService.currentToken).toMatchObject({
        type: 'type',
        value: 'abc',
      });
    });

    it('should not be writable', () => {
      expect(() => {
        tokenService.currentToken = 'some value';
      }).toThrowErrorMatchingSnapshot();
    });
  });

  describe('each', () => {
    it('should have an eat method', () => {
      expect(tokenService.eat).toBeDefined();
      expect(tokenService.eat).toBeInstanceOf(Function);
    });

    it('should advance the currentToken and return it', () => {
      const nextToken = tokenService.eat('type');
      expect(tokenService.currentToken).toEqual(nextToken);
      expect(nextToken).toMatchObject({
        type: 'type',
        value: 'def',
      });
    });

    it('should throw an error if an attempt is made to eat the wrong token', () => {
      expect(() => {
        tokenService.eat('other type');
      }).toThrowErrorMatchingSnapshot();
    });
  });
});
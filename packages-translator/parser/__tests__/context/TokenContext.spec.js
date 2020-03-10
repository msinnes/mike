const Context = require('@mike/translator-classes/Context');

const TokenContext = require('../../src/context/TokenContext');

const lexerConstructorMock = jest.fn();

describe('TokenContext', () => {
  let instance;

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
    instance = new TokenContext(lexerConstructorMock, 'abc');
  });

  afterEach(jest.resetAllMocks);

  it('should extend context', () => {
    expect(TokenContext.extends(Context)).toBe(true);
  });

  it('should call the passed-in lexerConstructor', () => {
    expect(lexerConstructorMock).toHaveBeenCalledTimes(1);
    expect(lexerConstructorMock.mock.calls[0][0]).toEqual('abc');
  });

  describe('currentToken', () => {
    it('should have a currentToken prop returned from lexer.getNextToken', () => {
      expect(instance.currentToken).toMatchObject({
        type: 'type',
        value: 'abc',
      });
    });

    it('should not be writable', () => {
      instance.currentToken = 'some value';
      expect(instance.currentToken).toMatchObject({
        type: 'type',
        value: 'abc',
      });
    });
  });

  describe('each', () => {
    it('should have an eat method', () => {
      expect(instance.eat).toBeDefined();
      expect(instance.eat).toBeInstanceOf(Function);
    });

    it('should advance the currentToken and return it', () => {
      const nextToken = instance.eat('type');
      expect(instance.currentToken).toEqual(nextToken);
      expect(nextToken).toMatchObject({
        type: 'type',
        value: 'def',
      });
    });

    it('should throw an error if an attempt is made to eat the wrong token', () => {
      expect(() => {
        instance.eat('other type');
      }).toThrowErrorMatchingSnapshot();
    });
  });
});
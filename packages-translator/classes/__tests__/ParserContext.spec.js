const Builder = require('@mike/translator-classes/Builder');

const TokenContext = require('../TokenContext');
const ParserContext = require('../ParserContext');

const lexerConstructorMock = jest.fn();

describe('ParserContext', () => {
  let instance;
  const rulesRef = {};

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
    instance = new ParserContext(lexerConstructorMock, 'abc', Builder, rulesRef);
  });

  afterEach(jest.resetAllMocks);

  it('should extend context', () => {
    expect(ParserContext.extends(TokenContext)).toBe(true);
  });

  describe('returns', () => {

    it('should have a builder prop', () => {
      expect(instance.builder).toBeDefined();
      expect(instance.builder.extends(Builder)).toBe(true);
    });

    it('should have an eat method', () => {
      expect(instance.eat).toBeDefined();
      expect(instance.eat).toBeInstanceOf(Function);
    });

    it('should have a rules prop', () => {
      expect(instance.rules).toBeDefined();
      expect(instance.rules).toEqual(rulesRef);
    });

    describe('currentToken', () => {
      it('should have a currentToken prop', () => {});

      it('should be read only', () => {
        instance.currentToken = {};
        expect(instance.currentToken).toMatchObject({
          type: 'type',
          value: 'abc',
        });
      });
    });
  });
});

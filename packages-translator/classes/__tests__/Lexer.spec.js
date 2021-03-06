const { loadClass } = require('@mike/class');

const { EOF } = require('@mike/translator-constants');
const iLexer = require('@mike/translator-interfaces/iLexer');

const LexerContext = require('../LexerContext');
const Contextual = require('../Contextual');
const Lexer = require('../Lexer');
const Token = require('../Token');

describe('Lexer', () => {
  let TestableLexer;
  beforeEach(() => {
    TestableLexer = loadClass(function() {
      this.skips = [];
      this.tokenizers = [];
      this.ctx = new LexerContext('a');
    }).extend(Lexer);
  });

  it('should be an abstract class', () => {
    expect(() => {
      Lexer('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Lexer('string');
    }).toThrowErrorMatchingSnapshot();
  });

  it('should require a text parameter', () => {
    expect(() => {
      new TestableLexer('type');
    }).not.toThrow();

    expect(() => {
      new TestableLexer();
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new TestableLexer(1);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should implement iLexer', () => {
    expect(TestableLexer.implements(iLexer)).toBe(true);
  });

  it('should extend Contextual', () => {
    expect(TestableLexer.extends(Contextual)).toBe(true);
  });

  describe('instance', () => {
    describe('BareLexer', () => {
      function LexerClass() {
        this.skips = [];
        this.tokenizers = [];
        this.ctx = new LexerContext('a');
      }
      let BareLexer, instance;
      beforeEach(() => {
        BareLexer = loadClass(LexerClass).extend(Lexer);
        instance = new BareLexer('some text');
      });

      it('should set the unsafe class props', () => {
        expect(instance.skips).toBeDefined();
        expect(instance.skips).toMatchObject([]);
        expect(instance.tokenizers).toBeDefined();
        expect(instance.tokenizers).toMatchObject([]);
        expect(instance.ctx).toBeDefined();
        expect(instance.ctx).toMatchObject({});
      });

      describe('checkAnalyzer', () => {
        const checkMock = jest.fn();
        const mockAnalyzer = { check: checkMock };
        beforeEach(() => {
          checkMock.mockImplementation(() => true);
        });

        it('should have a checkAnalyzer method', () => {
          expect(instance.checkAnalyzer).toBeDefined();
          expect(instance.checkAnalyzer).toBeInstanceOf(Function);
        });

        it('should call the check mock with ctx and return whatever the check method returns', () => {
          expect(instance.checkAnalyzer(mockAnalyzer)).toBe(true);
          expect(checkMock).toHaveBeenCalledTimes(1);
          expect(checkMock.mock.calls[0][0]).toEqual(instance.ctx);

          checkMock.mockImplementationOnce(() => false);

          expect(instance.checkAnalyzer(mockAnalyzer)).toBe(false);
          expect(checkMock).toHaveBeenCalledTimes(2);
          expect(checkMock.mock.calls[1][0]).toEqual(instance.ctx);
        });

        it('should throw an error if the analyzer.check method does not return a boolean', () => {
          checkMock.mockImplementationOnce(() => ({}));
          expect(() => {
            instance.checkAnalyzer(mockAnalyzer);
          }).toThrowErrorMatchingSnapshot();
        });
      });

      describe('getNextToken', () => {
        it('should have a getNextToken method', () => {
          expect(instance.getNextToken).toBeDefined();
          expect(instance.getNextToken).toBeInstanceOf(Function);
        });

        it('it should return an EOF token if there is no this.ctx.currentCharacter', () => {
          function LexerClass() {
            this.skips = [];
            this.tokenizers = [];
            this.ctx = new LexerContext('');
          }
          const TestableLexer = loadClass(LexerClass).extend(Lexer);
          const instance = new TestableLexer('test');
          const response = instance.getNextToken();
          expect(response).toBeInstanceOf(Token);
          expect(response.type).toEqual(EOF);
          expect(response.value).toEqual(null);
        });

        it('will throw an UnexpectedToken error if this.ctx.currentCharacter is defined, but there are no tokenizers or skips', () => {
          instance.ctx = { currentCharacter: 'a' };
          expect(() => {
            instance.getNextToken();
          }).toThrowErrorMatchingSnapshot();
        });
      });
    });

    describe('LexerWithTokenizers', () => {
      const checkMock = jest.fn();
      const execMock = jest.fn();
      const testTokenizer = {
        check: checkMock,
        exec: execMock,
      };
      const testToken = new Token('type', 'type');
      function WithTokenizers() {
        this.skips = [];
        this.tokenizers = [testTokenizer];
        this.ctx = new LexerContext('a');
      }
      let LexerWithTokenizers, instance;
      beforeEach(() => {
        LexerWithTokenizers = loadClass(WithTokenizers).extend(Lexer);
        instance = new LexerWithTokenizers('some text');
        checkMock.mockImplementation(() => true);
        execMock.mockImplementation(() => testToken);
      });

      describe('getNextToken', () => {
        it('should call the check and exec mocks if the tokenizer is supposed to run', () => {
          instance.getNextToken();
          expect(checkMock).toHaveBeenCalledTimes(1);
          expect(checkMock.mock.calls[0][0]).toEqual(instance.ctx);
          expect(execMock).toHaveBeenCalledTimes(1);
          expect(execMock.mock.calls[0][0]).toEqual(instance.ctx);
        });

        it('should pass out the return from tokenizer.exec', () => {
          expect(instance.getNextToken()).toEqual(testToken);
        });

        it('should throw an error if tokenizer.exec returns anything but a token', () => {
          execMock.mockImplementationOnce(() => 'not a token');
          expect(() => {
            instance.getNextToken();
          }).toThrowErrorMatchingSnapshot();
        });

        it('will throw an UnexpectedToken error if this.ctx.currentCharacter is defined, but there are no tokenizers or skips', () => {
          checkMock.mockImplementationOnce(() => false);
          instance.ctx = { currentCharacter: 'a' };
          expect(() => {
            instance.getNextToken();
          }).toThrowErrorMatchingSnapshot();
        });
      });
    });
  });

  describe('LexerWithSkips', () => {
    const skipCheckMock = jest.fn();
    const tokenizerCheckMock = jest.fn();
    const skipExecMock = jest.fn();
    const tokenizerExecMock = jest.fn();
    const testSkip = {
      check: skipCheckMock,
      exec: skipExecMock,
    };
    const testTokenizer = {
      check: tokenizerCheckMock,
      exec: tokenizerExecMock,
    };
    const testToken = new Token('type', 'type');
    function WithTokenizers() {
      this.skips = [testSkip];
      this.tokenizers = [testTokenizer];
      this.ctx = new LexerContext('a');
    }
    let LexerWithSkips, instance;
    beforeEach(() => {
      LexerWithSkips = loadClass(WithTokenizers).extend(Lexer);
      instance = new LexerWithSkips('some text');
      skipCheckMock.mockImplementation(() => false);
      tokenizerCheckMock.mockImplementation(() => true);
      tokenizerExecMock.mockImplementation(() => testToken);
    });

    describe('getNextToken', () => {
      it('should call the check and exec mocks if the tokenizer is supposed to run', () => {
        skipCheckMock.mockImplementationOnce(() => true);
        instance.getNextToken();
        expect(skipCheckMock).toHaveBeenCalledTimes(2);
        expect(skipCheckMock.mock.calls[0][0]).toEqual(instance.ctx);
        expect(skipExecMock).toHaveBeenCalledTimes(1);
        expect(skipExecMock.mock.calls[0][0]).toEqual(instance.ctx);
        expect(tokenizerCheckMock).toHaveBeenCalledTimes(1);
        expect(tokenizerCheckMock.mock.calls[0][0]).toEqual(instance.ctx);
        expect(tokenizerExecMock).toHaveBeenCalledTimes(1);
        expect(tokenizerExecMock.mock.calls[0][0]).toEqual(instance.ctx);
      });

      it('will throw an UnexpectedToken error if this.ctx.currentCharacter is defined, but there are no tokenizers or skips', () => {
        tokenizerCheckMock.mockImplementationOnce(() => false);
        instance.ctx = { currentCharacter: 'a' };
        expect(() => {
          instance.getNextToken();
        }).toThrowErrorMatchingSnapshot();
      });
    });
  });
});
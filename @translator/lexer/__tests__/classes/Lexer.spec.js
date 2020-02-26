const { loadClass, isClass } = require('@core/class');
const BaseLexer = require('@shared/classes/BaseLexer');
const Token = require('@shared/classes/Token');
const { EOF } = require('@shared/constants');

const Lexer = require('../../src/classes/Lexer');

describe('Lexer', () => {
  afterEach(jest.resetAllMocks);

  it('should be an abstract class', () => {
    expect(() => {
      new Lexer('some text');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      Lexer('some text');
    }).toThrowErrorMatchingSnapshot();
    expect(isClass(Lexer)).toBe(true);
  });

  it('should extend BaseLexer', () => {
    expect(Lexer.extends(BaseLexer)).toBe(true);
  });

  describe('instance', () => {
    describe('BareLexer', () => {
      function EmptyClass() {}
      let BareLexer, instance;
      beforeEach(() => {
        BareLexer = loadClass(EmptyClass).extend(Lexer);
        instance = new BareLexer('some text');
      });

      it('should set the unsafe class props', () => {
        expect(instance._skips).toBeDefined();
        expect(instance._skips).toMatchObject([]);
        expect(instance._tokenizers).toBeDefined();
        expect(instance._tokenizers).toMatchObject([]);
        expect(instance._ctx).toBeDefined();
        expect(instance._ctx).toMatchObject({});
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

        it('should call the check mock with _ctx and return whatever the check method returns', () => {
          expect(instance.checkAnalyzer(mockAnalyzer)).toBe(true);
          expect(checkMock).toHaveBeenCalledTimes(1);
          expect(checkMock.mock.calls[0][0]).toEqual(instance._ctx);

          checkMock.mockImplementationOnce(() => false);

          expect(instance.checkAnalyzer(mockAnalyzer)).toBe(false);
          expect(checkMock).toHaveBeenCalledTimes(2);
          expect(checkMock.mock.calls[1][0]).toEqual(instance._ctx);
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

        it('it should return an EOF token if there is no this._ctx.currentCharacter', () => {
          const response = instance.getNextToken();
          expect(response).toBeInstanceOf(Token);
          expect(response.type).toEqual(EOF);
          expect(response.value).toEqual(null);
        });

        it('will throw an UnexpectedToken error if this._ctx.currentCharacter is defined, but there are no tokenizers or skips', () => {
          instance._ctx = { currentCharacter: 'a' };
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
        this._tokenizers = [testTokenizer];
        this._ctx = {
          currentCharacter: 'a',
        };
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
          expect(checkMock.mock.calls[0][0]).toEqual(instance._ctx);
          expect(execMock).toHaveBeenCalledTimes(1);
          expect(execMock.mock.calls[0][0]).toEqual(instance._ctx);
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

        it('will throw an UnexpectedToken error if this._ctx.currentCharacter is defined, but there are no tokenizers or skips', () => {
          checkMock.mockImplementationOnce(() => false);
          instance._ctx = { currentCharacter: 'a' };
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
      this._skips = [testSkip];
      this._tokenizers = [testTokenizer];
      this._ctx = {
        currentCharacter: 'a',
      };
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
        expect(skipCheckMock.mock.calls[0][0]).toEqual(instance._ctx);
        expect(skipExecMock).toHaveBeenCalledTimes(1);
        expect(skipExecMock.mock.calls[0][0]).toEqual(instance._ctx);
        expect(tokenizerCheckMock).toHaveBeenCalledTimes(1);
        expect(tokenizerCheckMock.mock.calls[0][0]).toEqual(instance._ctx);
        expect(tokenizerExecMock).toHaveBeenCalledTimes(1);
        expect(tokenizerExecMock.mock.calls[0][0]).toEqual(instance._ctx);
      });

      it('will throw an UnexpectedToken error if this._ctx.currentCharacter is defined, but there are no tokenizers or skips', () => {
        tokenizerCheckMock.mockImplementationOnce(() => false);
        instance._ctx = { currentCharacter: 'a' };
        expect(() => {
          instance.getNextToken();
        }).toThrowErrorMatchingSnapshot();
      });
    });
  });
});

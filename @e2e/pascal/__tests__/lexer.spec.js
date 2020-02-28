const lexer = require('../src/lexer');
const {
  ASSIGN,
  BEGIN,
  DOT,
  END,
  FLOAT_DIV,
  ID,
  INTEGER,
  L_PAREN,
  MINUS,
  MULTIPLY,
  PLUS,
  R_PAREN,
  SEMI,
} = require('../src/constants');

describe('Lexer', () => {
  it('should return plus operators', () => {
    const text = '+';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: PLUS,
      value: '+',
    });
  });

  it('should return minus operators', () => {
    const text = '-';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: MINUS,
      value: '-',
    });
  });

  it('should return multiplication operators', () => {
    const text = '*';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: MULTIPLY,
      value: '*',
    });
  });

  it('should return divide operators', () => {
    const text = '/';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: FLOAT_DIV,
      value: '/',
    });
  });

  it('should return left parenthases', () => {
    const text = '(';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: L_PAREN,
      value: '(',
    });
  });

  it('should return right parenthases', () => {
    const text = ')';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: R_PAREN,
      value: ')',
    });
  });

  it('should return begin tokens', () => {
    const text = 'BEGIN';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: BEGIN,
      value: BEGIN,
    });
  });

  it('should return end tokens', () => {
    const text = 'END';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: END,
      value: END,
    });
  });

  it('should return id tokens', () => {
    const text = 'abc123';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: ID,
      value: 'abc123',
    });
  });

  it('should allow variables to start with _', () => {
    const text = '_abc123';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: ID,
      value: '_abc123',
    });
  });

  it('should return assign tokens', () => {
    const text = ':=';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: ASSIGN,
      value: '=',
    });
  });

  it('should return semi tokens', () => {
    const text = ';';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: SEMI,
      value: ';',
    });
  });

  it('should return dot tokens', () => {
    const text = '.';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: DOT,
      value: '.',
    });
  });

  it('should return integer tokens', () => {
    const text = '1234';
    const lexerInstance = new lexer(text);
    const token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: INTEGER,
      value: 1234,
    });
  });

  it('should ignore case with reserved words', () => {
    let text = 'begin';
    let lexerInstance = new lexer(text);
    let token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: BEGIN,
      value: BEGIN,
    });
    text = 'bEgin';
    lexerInstance = new lexer(text);
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: BEGIN,
      value: BEGIN,
    });
    text = 'EnD';
    lexerInstance = new lexer(text);
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: END,
      value: END,
    });
  });

  it('should return a stream of tokens', () => {
    const text = '1234+12-*23';
    const lexerInstance = new lexer(text);
    let token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: INTEGER,
      value: 1234,
    });
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: PLUS,
      value: '+',
    });
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: INTEGER,
      value: 12,
    });
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: MINUS,
      value: '-',
    });
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: MULTIPLY,
      value: '*',
    });
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: INTEGER,
      value: 23,
    });
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: 'EOF',
      value: null,
    });
  });

  it('should ignore spaces', () => {
    const text = '1234 +    12';
    const lexerInstance = new lexer(text);
    let token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: INTEGER,
      value: 1234,
    });
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: PLUS,
      value: '+',
    });
    token = lexerInstance.getNextToken();
    expect(token).toMatchObject({
      type: INTEGER,
      value: 12,
    });
  });
});

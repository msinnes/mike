const { loadClass } = require('@mike/class');
const ParseError = require('@mike/errors/ParseError');

const Context = require('@mike/translator-classes/Context');

function TokenContext(LexerClass, text) {
  const lexer = new LexerClass(text);
  let currentToken = lexer.getNextToken();

  function eat(type) {
    if (currentToken.type === type) {
      currentToken = lexer.getNextToken();
      return currentToken;
    } else {
      throw new ParseError('Unexpected Token');
    }
  }

  this.constructor.expose(this, 'eat', () => eat);
  this.constructor.expose(this, 'currentToken', () => currentToken);
}

module.exports = loadClass(TokenContext).extend(Context);

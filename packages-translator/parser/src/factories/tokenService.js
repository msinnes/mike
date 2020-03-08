const ParseError = require('@mike/errors/ParseError');
const readOnlyVariable = require('@mike/utils/readOnlyVariable');

module.exports = (lexerConstructor, text) => {
  const lexer = new lexerConstructor(text);
  let currentToken = lexer.getNextToken();
  const tokenService = {
    eat: type => {
      if (currentToken.type === type) {
        currentToken = lexer.getNextToken();
        return currentToken;
      } else {
        throw new ParseError('Unexpected Token');
      }
    },
  };

  readOnlyVariable(tokenService, 'currentToken', currentToken, {
    get: () => currentToken,
  });

  return tokenService;
};
const { loadClass } = require('@mike/class');
const Token = require('@mike/translator-classes/Token');

const CharacterContext = require('./CharacterContext');

function LexerContext(text, reservedKeywordService) {
  const tokenFactory = (type, value) => new Token(type, value);

  if (reservedKeywordService) {
    this.constructor.expose(
      this,
      'getReservedToken',
      () => reservedKeywordService.getReservedToken
    );
    this.constructor.expose(
      this,
      'isReservedKeyword',
      () => reservedKeywordService.isReservedKeyword
    );
  }
  this.constructor.expose(this, 'tokenFactory', () => tokenFactory);
}

module.exports = loadClass(LexerContext).extend(CharacterContext);

const configValidation = require('./validations/config');

const reservedKeywordServiceFactory = require('./factories/reservedKeywordService');
const lexerFactory = require('./factories/lexer');

module.exports = config => {
  configValidation.validate(config);
  let reservedKeywordService;
  const skips = config.skips || [];
  const tokenizers = config.tokenizers || [];
  const caseSensitive = config.caseSensitive || true;
  const reservedKeywords = config.reservedKeywords;

  if (reservedKeywords) {
    reservedKeywordService = reservedKeywordServiceFactory(reservedKeywords, caseSensitive);
  }

  return lexerFactory(tokenizers, skips, reservedKeywordService);
};

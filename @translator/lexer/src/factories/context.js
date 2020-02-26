const readOnlyVariable = require('../../../../@core/utils/readOnlyVariable');
const Token = require('@shared/classes/Token');

const characterServiceFactory = require('./characterService');

module.exports = (text, reservedKeywordService) => {
  const characterService = characterServiceFactory(text);
  const ctx = {
    advance: characterService.advance,
    peek: characterService.peek,
    tokenFactory: (type, value) => new Token(type, value),
  };

  if (reservedKeywordService) {
    ctx.getReservedToken = reservedKeywordService.getReservedToken;
    ctx.isReservedKeyword = reservedKeywordService.isReservedKeyword;
  }

  readOnlyVariable(ctx, 'currentCharacter', characterService.currentCharacter, {
    get: () => characterService.currentCharacter,
  });

  return ctx;
};

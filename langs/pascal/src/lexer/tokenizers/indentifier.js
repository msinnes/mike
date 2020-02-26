const { ID } = require('../../constants');

const isAlphabetical = value => !!value && /[a-zA-Z]/.test(value);
const isAlphanumeric = value => !!value && /[a-zA-Z0-9]/.test(value);

module.exports = {
  check: ctx => ctx.currentCharacter === '_' || isAlphabetical(ctx.currentCharacter),
  exec: ctx => {
    let character = ctx.currentCharacter;
    let identifier = '';
    while(character === '_' || isAlphanumeric(character)) {
      identifier += character;
      character = ctx.advance();
    }
    const upperIdentifier = identifier.toUpperCase();
    if (ctx.isReservedKeyword(upperIdentifier)) {
      return ctx.getReservedToken(upperIdentifier);
    }
    return ctx.tokenFactory(ID, identifier);
  },
};

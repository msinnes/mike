const isNewLine = character => /\n/.test(character);

module.exports = {
  check: ctx => isNewLine(ctx.currentCharacter),
  exec: ctx => {
    let character = ctx.currentCharacter;
    while(isNewLine(character)) {
      character = ctx.advance();
    }
  },
};
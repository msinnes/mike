const isSpace = character => / /.test(character);

module.exports = {
  check: ctx => isSpace(ctx.currentCharacter),
  exec: ctx => {
    let character = ctx.currentCharacter;
    while(isSpace(character)) {
      character = ctx.advance();
    }
  },
};
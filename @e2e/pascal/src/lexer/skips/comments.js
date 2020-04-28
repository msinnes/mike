module.exports = {
  check: ctx => ctx.currentCharacter === '{',
  exec: ctx => {
    let character = ctx.currentCharacter;
    do {
      character = ctx.advance();
    } while(character !== '}');
    ctx.advance();
  },
};

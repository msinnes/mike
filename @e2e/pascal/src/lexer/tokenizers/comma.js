const { COMMA } = require('../../constants');

module.exports = {
  check: ctx => ctx.currentCharacter === ',',
  exec: ctx =>  {
    ctx.advance();
    return ctx.tokenFactory(COMMA, ',');
  },
};

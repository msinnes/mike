const { ASSIGN } = require('../../constants');

module.exports = {
  check: ctx => ctx.currentCharacter === ':' && ctx.peek() === '=',
  exec: ctx =>  {
    ctx.advance();
    ctx.advance();
    return ctx.tokenFactory(ASSIGN, '=');
  },
};

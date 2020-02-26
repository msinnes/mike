const { FLOAT_DIV } = require('../../constants');

module.exports = {
  check: ctx => ctx.currentCharacter === '/',
  exec: ctx =>  {
    ctx.advance();
    return ctx.tokenFactory(FLOAT_DIV, '/');
  },
};

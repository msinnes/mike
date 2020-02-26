const { INTEGER_CONST, REAL_CONST } = require('../../constants');

const isDigit = character => /\d/.test(character);

module.exports = {
  check: ctx => isDigit(ctx.currentCharacter),
  exec: ctx => {
    let character = ctx.currentCharacter;
    function streamNumbers() {
      let num = '';
      while(isDigit(character)) {
        num += character;
        character = ctx.advance();
      }
      return num;
    }

    let number = streamNumbers();
    if (ctx.currentCharacter === '.') {
      number += ctx.currentCharacter;
      character = ctx.advance();
      number += streamNumbers();
      return ctx.tokenFactory(REAL_CONST, parseFloat(number));
    } else {
      return ctx.tokenFactory(INTEGER_CONST, parseInt(number));
    }

  },
};

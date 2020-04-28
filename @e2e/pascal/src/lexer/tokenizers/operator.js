const {
  FLOAT_DIV,
  L_PAREN,
  MINUS,
  MULTIPLY,
  PLUS,
  R_PAREN,
} = require('../../constants');

const isOperator = character => /[()+*/-]/.test(character);

module.exports = {
  check: ctx => isOperator(ctx.currentCharacter),
  exec: ctx => {
    const character = ctx.currentCharacter;
    let type;
    switch(character) {
    case '+':
      type = PLUS;
      break;
    case '-':
      type = MINUS;
      break;
    case '*':
      type = MULTIPLY;
      break;
    case '/':
      type = FLOAT_DIV;
      break;
    case '(':
      type = L_PAREN;
      break;
    case ')':
      type = R_PAREN;
      break;
    default:
      throw new Error(`unidentified operator ${character}`);
    }
    ctx.advance();
    return ctx.tokenFactory(type, character);
  },
};

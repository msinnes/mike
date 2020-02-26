const { INTEGER_CONST, L_PAREN, MINUS, PLUS, R_PAREN , REAL_CONST} = require('../../constants');

module.exports = ({ builder, currentToken, eat, rules }) => {
  const token = currentToken;
  let node;
  switch(token.type) {
  case PLUS:
    eat(PLUS);
    node = builder.unaryOperation(token.value, rules.factor());
    break;
  case MINUS:
    eat(MINUS);
    node = builder.unaryOperation(token.value, rules.factor());
    break;
  case INTEGER_CONST:
    eat(INTEGER_CONST);
    node = builder.numericLiteral(token.value);
    break;
  case REAL_CONST:
    eat(REAL_CONST);
    node = builder.numericLiteral(token.value);
    break;
  case L_PAREN:
    eat(L_PAREN);
    node = rules.expression();
    eat(R_PAREN);
    break;
  default:
    node = rules.identifier();
    break;
  }
  return node;
};

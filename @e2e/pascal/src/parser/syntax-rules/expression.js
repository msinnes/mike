const { MINUS, PLUS } = require('../../constants');

const EXPR_TOKENS = [MINUS, PLUS];

module.exports = ({ builder, currentToken, eat, rules }) => {
  let node = rules.term();
  let token = currentToken;
  while(EXPR_TOKENS.indexOf(token.type) >= 0) {
    if (token.type === PLUS) {
      eat(PLUS);
    } else {
      eat(MINUS);
    }
    node = builder.binaryOperation(token.value, node, rules.term());
    token = currentToken;
  }
  return node;
};

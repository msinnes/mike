const { FLOAT_DIV, INTEGER_DIV, MULTIPLY } = require('../../constants');

const TERM_TOKENS = [FLOAT_DIV, INTEGER_DIV, MULTIPLY];

module.exports = ({ builder, currentToken, eat, rules }) => {
  let node = rules.factor();
  let token = currentToken;

  while(TERM_TOKENS.indexOf(token.type) >= 0) {
    if (token.type === MULTIPLY) {
      eat(MULTIPLY);
    } else if (token.type === INTEGER_DIV) {
      eat(INTEGER_DIV);
    } else if (token.type === FLOAT_DIV) {
      eat(FLOAT_DIV);
    }
    node = builder.binaryOperation(token.value, node, rules.factor());
    token = currentToken;
  }
  return node;
};
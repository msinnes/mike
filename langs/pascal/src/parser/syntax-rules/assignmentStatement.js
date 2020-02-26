const { ASSIGN } = require('../../constants');

module.exports = ({ builder, currentToken, eat, rules }) => {
  const left = rules.identifier();
  const token = currentToken;
  eat(ASSIGN);
  const right = rules.expression();
  return builder.assignmentStatement(token.value, left.value, right);
};
const { INTEGER, REAL } = require('../../constants');

module.exports = ({ builder, currentToken, eat }) => {
  const token = currentToken;
  if (token.type === INTEGER) {
    eat(INTEGER);
  } else {
    eat(REAL);
  }
  return builder.type(token.value);
};
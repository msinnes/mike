const { ID } = require('../../constants');

module.exports = ({ builder, currentToken, eat }) => {
  const node = builder.identifier(currentToken.value);
  eat(ID);
  return node;
};
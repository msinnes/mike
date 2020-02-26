const { COLON, COMMA, ID } = require('../../constants');

module.exports = ({ builder, currentToken, eat, rules }) => {
  const vars = [builder.identifier(currentToken.value)];
  eat(ID);

  while(currentToken.type === COMMA) {
    eat(COMMA);
    vars.push(builder.identifier(currentToken.value));
    eat(ID);
  }

  eat(COLON);

  const typeNode = rules.type();
  return vars.map(v => builder.declaration(v, typeNode));
};
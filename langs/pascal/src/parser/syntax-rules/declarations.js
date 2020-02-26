const { ID, VAR, SEMI } = require('../../constants');

module.exports = ({ currentToken, eat, rules }) => {
  let declarations = [];

  if (currentToken.type === VAR) {
    eat(VAR);
    while(currentToken.type === ID) {
      declarations = declarations.concat(rules.variableDeclaration());
      eat(SEMI);
    }
  }
  return declarations;
};
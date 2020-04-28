const { ID, VAR, PROCEDURE, SEMI } = require('../../constants');

module.exports = ({ builder, currentToken, eat, rules }) => {
  let declarations = [];

  if (currentToken.type === VAR) {
    eat(VAR);
    while(currentToken.type === ID) {
      declarations = declarations.concat(rules.variableDeclaration());
      eat(SEMI);
    }
  }

  while(currentToken.type) {
    eat(PROCEDURE);
    const procedureName = currentToken.value;
    self.eat(ID);
    self.eat(SEMI);
    const blockNode = rules.block();
    const procedureDeclaration = builder.procedureDeclaration(
      procedureName,
      blockNode
    );
    declarations.push(procedureDeclaration);
    eat(SEMI);
  }
  return declarations;
};
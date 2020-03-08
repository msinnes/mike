const { BEGIN, ID } = require('../../constants');

module.exports = ({ currentToken, rules }) => {
  const token = currentToken;
  if (token.type === BEGIN) {
    return rules.compoundStatement();
  } else if (token.type === ID) {
    return rules.assignmentStatement();
  } else {
    return rules.empty();
  }
};
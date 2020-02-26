const { BEGIN, END } = require('../../constants');

module.exports = ({ builder, eat, rules }) => {
  eat(BEGIN);
  const children = rules.statementList();
  eat(END);
  return builder.compoundStatement(children);
};
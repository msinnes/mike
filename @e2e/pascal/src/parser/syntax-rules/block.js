module.exports = ({ builder, rules }) => {
  const declarations = rules.declarations();
  const body = rules.compoundStatement();
  return builder.block(declarations, body);
};
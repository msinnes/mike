const { DOT, PROGRAM, SEMI } = require('../../constants');

module.exports = ({ builder, eat, rules }) => {
  eat(PROGRAM);
  const programNameIdentifier = rules.identifier();
  eat(SEMI);
  const block = rules.block();
  const program = builder.program(programNameIdentifier.value, block);
  eat(DOT);
  return program;
};
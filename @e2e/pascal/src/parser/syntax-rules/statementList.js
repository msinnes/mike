const { ID, SEMI } = require('../../constants');

module.exports = ({ currentToken, eat, rules }) => {
  const node = rules.statement();
  const results = [node];

  while(currentToken.type === SEMI) {
    eat(SEMI);
    results.push(rules.statement());
  }

  if(currentToken === ID) {
    throw new Error('something went wrong');
  }
  return results;
};
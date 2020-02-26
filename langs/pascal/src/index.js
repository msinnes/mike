const Parser = require('./parser');

module.exports = program => {
  const parser = new Parser();
  return parser.parse(program);
};

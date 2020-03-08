const assignmentStatement = require('./assignmentStatement');
const block = require('./block');
const compoundStatement = require('./compoundStatement');
const declarations = require('./declarations');
const empty = require('./empty');
const expression = require('./expression');
const factor = require('./factor');
const identifier = require('./identifier');
const program = require('./program');
const statement = require('./statement');
const statementList = require('./statementList');
const term = require('./term');
const type = require('./type');
const variableDeclaration = require('./variableDeclaration');

module.exports = {
  assignmentStatement,
  block,
  compoundStatement,
  declarations,
  empty,
  expression,
  factor,
  identifier,
  program,
  statement,
  statementList,
  term,
  type,
  variableDeclaration,
};

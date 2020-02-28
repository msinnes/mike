const lexer = require('@mike/lexer');

const { BEGIN, DIV, END, ID, INTEGER, INTEGER_DIV, PROGRAM, REAL, VAR } = require('../constants');

const skipComments = require('./skips/comments');
const skipSpaces = require('./skips/spaces');
const skipNewline = require('./skips/newline');

const assign = require('./tokenizers/assign');
const colon = require('./tokenizers/colon');
const comma = require('./tokenizers/comma');
const dot = require('./tokenizers/dot');
const floatDiv = require('./tokenizers/floatDiv');
const identifier = require('./tokenizers/indentifier');
const number = require('./tokenizers/number');
const operator = require('./tokenizers/operator');
const semi = require('./tokenizers/semi');

module.exports = lexer({
  caseSensitive: false,
  reservedKeywords: [BEGIN, DIV, END, ID, INTEGER, INTEGER_DIV, PROGRAM, REAL, VAR],
  skips: [skipComments, skipSpaces, skipNewline],
  tokenizers: [
    assign,
    colon,
    comma,
    dot,
    floatDiv,
    identifier,
    number,
    operator,
    semi,
  ],
});

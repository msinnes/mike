const ObjectValidation = require('@core/validations/Object');

const caseSensitive = require('./caseSensitive');
const reservedKeywords = require('./reservedKeywords');
const skips = require('./skips');
const tokenizers = require('./tokenizers');

module.exports = ObjectValidation({
  caseSensitive,
  reservedKeywords,
  skips,
  tokenizers,
},
{ throwOnInvalid: true });

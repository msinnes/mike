const Token = require('@shared/classes/Token');

const Validation = require('@mike/validations/Validation');
const Runtime = require('@mike/validations/Runtime');

module.exports = Runtime(
  Validation(
    value => !!value && value instanceof Token,
    'tokenizer exec functions should return instances of tokens'
  )
);

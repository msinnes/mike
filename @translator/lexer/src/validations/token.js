const Token = require('@shared/classes/Token');

const Validation = require('@core/validations/Validation');
const Runtime = require('@core/validations/Runtime');

module.exports = Runtime(
  Validation(
    value => !!value && value instanceof Token,
    'tokenizer exec functions should return instances of tokens'
  )
);

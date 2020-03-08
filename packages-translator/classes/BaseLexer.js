const { loadAbstractClass } = require('@mike/class');
const UnexpectedToken = require('@mike/errors/UnexpectedToken');
const { EOF } = require('@mike/translator-constants');
const StringValidation = require('@mike/validations/String');
const BooleanValidation = require('@mike/validations/Boolean');
const RuntimeValidation = require('@mike/validations/Runtime');
const Validation = require('@mike/validations/Validation');

const Token = require('./Token');

const textValidation = StringValidation('text must be a string', { throwOnInvalid: true });

const booleanRuntimeValidation = RuntimeValidation(
  BooleanValidation(
    'Check functions should return a boolean value'
  )
);

const tokenValidation = RuntimeValidation(
  Validation(
    value => !!value && value instanceof Token,
    'tokenizer exec functions should return instances of tokens'
  )
);


function BaseLexer(text) {
  textValidation.validate(text);
  this.text = text;
}

BaseLexer.prototype.checkAnalyzer = function({ check }) {
  const found = check(this._ctx);
  booleanRuntimeValidation.validate(found);
  return found;
};

BaseLexer.prototype.getNextToken = function() {
  while(this._ctx.currentCharacter) {
    const skip = this._skips.find(a => this.checkAnalyzer(a));
    if (skip) {
      skip.exec(this._ctx);
      continue;
    }

    const tokenizer = this._tokenizers.find(a => this.checkAnalyzer(a));
    if (tokenizer) {
      const token = tokenizer.exec(this._ctx);
      tokenValidation.validate(token);
      return token;
    }

    throw new UnexpectedToken(this._ctx.currentCharacter);
  }
  return new Token(EOF);
};

module.exports = loadAbstractClass(BaseLexer);

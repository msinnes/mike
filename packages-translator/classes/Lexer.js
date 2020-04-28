const { loadAbstractClass } = require('@mike/class');
const UnexpectedToken = require('@mike/errors/UnexpectedToken');
const StringValidation = require('@mike/validations/String');
const BooleanValidation = require('@mike/validations/Boolean');
const RuntimeValidation = require('@mike/validations/Runtime');
const Validation = require('@mike/validations/Validation');

const { EOF } = require('@mike/translator-constants');
const iLexer = require('@mike/translator-interfaces/iLexer');

const Contextual = require('./Contextual');
const LexerContext = require('./LexerContext');
const Token = require('./Token');

// TODO: should be a runtime validation
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


function Lexer(text) {
  textValidation.validate(text);
  this.text = text;
  this.ContextClass = LexerContext;
}

Lexer.prototype.checkAnalyzer = function({ check }) {
  const found = check(this.ctx);
  booleanRuntimeValidation.validate(found);
  return found;
};

Lexer.prototype.getNextToken = function() {
  while(this.ctx.currentCharacter) {
    const skip = this.skips.find(a => this.checkAnalyzer(a));
    if (skip) {
      skip.exec(this.ctx);
      continue;
    }

    const tokenizer = this.tokenizers.find(a => this.checkAnalyzer(a));
    if (tokenizer) {
      const token = tokenizer.exec(this.ctx);
      tokenValidation.validate(token);
      return token;
    }

    throw new UnexpectedToken(this.ctx.currentCharacter);
  }
  return new Token(EOF);
};

module.exports = loadAbstractClass(Lexer).extend(Contextual).implement(iLexer);

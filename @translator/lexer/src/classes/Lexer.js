const { loadAbstractClass } = require('@mike/class');
const BaseLexer = require('@shared/classes/BaseLexer');
const Token = require('@shared/classes/Token');
const { EOF } = require('@shared/constants');
const UnexpectedToken = require('@mike/errors/UnexpectedToken');

const booleanRuntimeValidation = require('../validations/booleanRuntime');
const tokenValidation = require('../validations/token');

function Lexer() {
  this._skips = [];
  this._tokenizers = [];
  this._ctx = {};
}

Lexer.prototype.checkAnalyzer = function({ check }) {
  const found = check(this._ctx);
  booleanRuntimeValidation.validate(found);
  return found;
};

Lexer.prototype.getNextToken = function() {
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

module.exports = loadAbstractClass(Lexer).extend(BaseLexer);

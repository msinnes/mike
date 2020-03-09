const { loadClass } = require('@mike/class');
const Lexer = require('@mike/translator-classes/Lexer');

const LexerContext = require('../context/LexerContext');

module.exports = (tokenizers, skips, reseervedKeywordService) => {
  function ExtendedLexer(text) {
    this.tokenizers = tokenizers;
    this.skips = skips;
    this.ctx = new LexerContext(text, reseervedKeywordService);
  }

  return loadClass(ExtendedLexer).extend(Lexer);
};

const { loadClass } = require('@mike/class');
const Lexer = require('@mike/translator-classes/Lexer');

module.exports = (tokenizers, skips, reseervedKeywordService) => {
  function ExtendedLexer(text) {
    this.tokenizers = tokenizers;
    this.skips = skips;
    this.ctx = this.createContext(text, reseervedKeywordService);
  }

  return loadClass(ExtendedLexer).extend(Lexer);
};

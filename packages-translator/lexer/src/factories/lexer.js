const { loadClass } = require('@mike/class');

const Lexer = require('../classes/Lexer');

const contextFactory = require('./context');

module.exports = (tokenizers, skips, reseervedKeywordService) => {
  function ExtendedLexer(text) {
    this._tokenizers = tokenizers;
    this._skips = skips;
    this._ctx = contextFactory(text, reseervedKeywordService);
  }

  return loadClass(ExtendedLexer).extend(Lexer);
};

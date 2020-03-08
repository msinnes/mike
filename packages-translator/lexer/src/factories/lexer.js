const { loadClass } = require('@mike/class');
const BaseLexer = require('@mike/translator-classes/BaseLexer');

const contextFactory = require('./context');

module.exports = (tokenizers, skips, reseervedKeywordService) => {
  function ExtendedLexer(text) {
    this._tokenizers = tokenizers;
    this._skips = skips;
    this._ctx = contextFactory(text, reseervedKeywordService);
  }

  return loadClass(ExtendedLexer).extend(BaseLexer);
};

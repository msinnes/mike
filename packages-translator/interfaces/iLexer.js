const { loadInterface } = require('@mike/class');
const ArrayType = require('@mike/types/Array');

const LexerContextType = require('@mike/translator-types/LexerContext');

module.exports = loadInterface({
  tokenizers: ArrayType,
  skips: ArrayType,
  ctx: LexerContextType,
});

const { loadInterface } = require('@mike/class');
const ArrayType = require('@mike/types/Array');

const ContextType = require('@mike/translator-types/Context');

module.exports = loadInterface({
  tokenizers: ArrayType,
  skips: ArrayType,
  // TODO: this should probably be a LexerContextType
  ctx: ContextType,
});

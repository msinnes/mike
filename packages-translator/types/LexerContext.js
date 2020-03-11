const LexerContext = require('@mike/translator-classes/LexerContext');

const ContextType = require('./Context');

module.exports = ContextType.extend('LexerContext', value => value instanceof LexerContext);

const { loadClass } = require('@mike/class');

const TokenContext = require('./TokenContext');

function ParserContext(LexerClass, text, builder, rules) {
  this.constructor.expose(this, 'builder', () => builder);
  this.constructor.expose(this, 'rules', () => rules);
}

module.exports = loadClass(ParserContext).extend(TokenContext);

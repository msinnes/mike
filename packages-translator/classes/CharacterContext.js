const { loadClass } = require('@mike/class');

const Context = require('./Context');

function CharacterContext(text) {
  let position = 0;
  let currentCharacter = text[0];

  function advance() {
    position++;
    if (position < text.length) {
      currentCharacter = text[position];
      return currentCharacter;
    } else {
      currentCharacter = null;
      return null;
    }
  }

  function peek(peekLength) {
    const peekPosition = position + (peekLength || 1);
    if (peekPosition < text.length) {
      return text[peekPosition];
    } else {
      return null;
    }
  }

  this.constructor.expose(this, 'advance', () => advance);
  this.constructor.expose(this, 'peek', () => peek);
  this.constructor.expose(this, 'currentCharacter', () => currentCharacter);
}

module.exports = loadClass(CharacterContext).extend(Context);

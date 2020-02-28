module.exports = text => {
  let position = 0;
  let currentCharacter = text[0];

  const service = {
    advance: () => {
      position++;
      if (position < text.length) {
        currentCharacter = text[position];
        return currentCharacter;
      } else {
        currentCharacter = null;
        return null;
      }
    },
    peek: peekLength => {
      const peekPosition = position + (peekLength || 1);
      if (peekPosition < text.length) {
        return text[peekPosition];
      } else {
        return null;
      }
    },
  };

  Object.defineProperty(service, 'currentCharacter', {
    get: () => currentCharacter,
  });

  return service;
};

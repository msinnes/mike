const ClassError = require('@mike/errors/ClassError');

module.exports = errorText => {
  throw new ClassError(errorText);
};

const ClassError = require('@core/errors/ClassError');

module.exports = errorText => {
  throw new ClassError(errorText);
};

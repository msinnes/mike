const throwClassError = require('../lib/throwClassError');

module.exports = (value, i) => {
  const errors = {};
  const valid = Object.keys(i).reduce((valid, key) => {
    const type = i[key];
    if (!type.is(value[key])) {
      errors[key] = type.message;
      return false;
    }
    return valid;
  }, true);

  if (!valid) {
    const message = Object.keys(errors).reduce((stringBuilder, key) => {
      stringBuilder.push(`${key}: ${errors[key]}`);
      return stringBuilder;
    }, ['Runtime Interface Error']).join('\n');
    throwClassError(message);
  }
};
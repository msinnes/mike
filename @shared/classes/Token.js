const { loadClass } = require('@mike/class');

const StringValidation = require('@mike/validations/String');

const typeValidation = StringValidation('type must be a string', { throwOnInvalid: true });
/**
 * A token for lexical analysis
 *
 * @constructor
 * @param {String} type - as string that denotes the type of Token
 * @param {*} value
 */
function Token(type, value) {
  typeValidation.validate(type);
  this.type = type;
  this.value = value || null;
}

module.exports = loadClass(Token);

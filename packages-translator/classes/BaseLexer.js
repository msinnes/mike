const { loadAbstractClass } = require('@mike/class');

const StringValidation = require('@mike/validations/String');

const textValidation = StringValidation('text must be a string', { throwOnInvalid: true });
/**
 * A token for lexical analysis
 *
 * @constructor
 * @param {String} text - the text to be analyzed
 */
function BaseLexer(text) {
  textValidation.validate(text);
  this.text = text;
}

module.exports = loadAbstractClass(BaseLexer);

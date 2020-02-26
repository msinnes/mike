const { loadAbstractClass } = require('@core/class');

const StringValidation = require('@core/validations/String');

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

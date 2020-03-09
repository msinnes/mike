const { loadClass } = require('@mike/class');
const StringValidation = require('@mike/validations/String');

const typeValidation = StringValidation('type must be a string', { throwOnInvalid: true });

function AstNode(type) {
  typeValidation.validate(type);
  this.type = type;
}

module.exports = loadClass(AstNode);


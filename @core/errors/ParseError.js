const BaseError = require('./lib/BaseError');

function ParseError() {
  this.name = 'ParseError';
}

module.exports = BaseError.extend(ParseError);

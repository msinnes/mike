const BaseError = require('./lib/BaseError');

function UnexpectedToken(token) {
  this.name = 'UnexpectedToken';
  this.message = `Unexpected token ${token}`;
}

module.exports = BaseError.extend(UnexpectedToken);

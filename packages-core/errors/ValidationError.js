const BaseError = require('./lib/BaseError');

function ValidationError() {
  this.name = 'ValidationError';
}

module.exports = BaseError.extend(ValidationError);

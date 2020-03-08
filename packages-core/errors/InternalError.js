const BaseError = require('./lib/BaseError');

function InternalError() {
  this.name = 'InternalError';
}

module.exports = BaseError.extend(InternalError);

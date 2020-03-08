const BaseError = require('./lib/BaseError');

function RuntimeError() {
  this.name = 'RuntimeError';
}

module.exports = BaseError.extend(RuntimeError);

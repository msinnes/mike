const BaseError = require('./lib/BaseError');

function ClassError() {
  this.name = 'ClassError';
}

module.exports = BaseError.extend(ClassError);

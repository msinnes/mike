const BaseValidation = require('../classes/BaseValidation');

module.exports = value => !!value && value instanceof BaseValidation;

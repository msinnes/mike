const isNumber = require('@core/utils/isNumber');

const typeLoader = require('../../src/loaders/type');

module.exports = typeLoader('NumberType', isNumber);
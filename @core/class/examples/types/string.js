const isString = require('@core/utils/isString');

const typeLoader = require('../../src/loaders/type');

module.exports = typeLoader('StringType', isString);
const interfaceLoader = require('../../src/loaders/interface');

const NumberType = require('../types/number');
const FunctionType = require('../types/function');

module.exports = interfaceLoader({
  value: NumberType,
  addOne: FunctionType,
  addTwo: FunctionType,
});

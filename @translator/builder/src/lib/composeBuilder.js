const baseBuilderFactory = require('../factories/baseBuilder');
const constructorFactory = require('../factories/constructor');
const validateFnFactoryFactory = require('../factories/validateFnFactory');
const mapValidations = require('../lib/mapValidations');

module.exports = (name, config, checkFn) => {
  const validateFnFactory = validateFnFactoryFactory(checkFn);
  let mappedValidations = {};
  if (config.validations) {
    mappedValidations = mapValidations(config.validations, validateFnFactory);
  }
  const Class = constructorFactory(name, config.properties, mappedValidations);
  return baseBuilderFactory(name, Class);
};
const { loadClass } = require('@core/class');
const BaseBuilder = require('@shared/classes/BaseBuilder');

const configValidation = require('./validations/config');
const aliasFactory = require('./factories/alias');
const composeBuilder = require('./lib/composeBuilder');

module.exports = config => {
  configValidation.validate(config);
  const alias = aliasFactory();
  function BuilderClass() {}

  Object.keys(config).forEach(key => {
    const fieldConfig = config[key];
    alias.alias(key, fieldConfig.aliases);
    const builder = composeBuilder(key, fieldConfig, alias.check);
    Object.assign(BuilderClass, builder);
  });


  return loadClass(BuilderClass).extend(BaseBuilder);
};

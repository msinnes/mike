const { loadType } = require('@mike/class');
const Builder = require('@mike/translator-classes/Builder');

module.exports = loadType(
  'BuilderClass',
  value => !!value && !!value.extends && value.extends(Builder)
);

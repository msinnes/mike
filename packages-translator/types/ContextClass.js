const { loadType } = require('@mike/class');
const Context = require('@mike/translator-classes/Context');

module.exports = loadType(
  'ContextClass',
  value => !!value && !!value.extends && value.extends(Context)
);

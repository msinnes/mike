const ObjectValidation = require('@mike/validations/Object');

const aliases = require('./aliases');
const properties = require('./properties');
const validations = require('./validations');

module.exports = ObjectValidation({
  aliases,
  properties,
  validations,
});

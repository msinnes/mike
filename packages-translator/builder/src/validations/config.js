const MapValidation = require('@mike/validations/Map');

const name = require('./name');
const builder = require('./builder');

module.exports = MapValidation(
  {
    keys: name,
    values: builder,
  },
  { throwOnInvalid: true }
);

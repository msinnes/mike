const MapValidation = require('@mike/validations/Map');
const FunctionValidation = require('@mike/validations/Function');
const Validation = require('@mike/validations/Validation');

const regex = /^[a-zA-Z]+$/;

module.exports = MapValidation({
  keys: Validation(value => regex.test(value), 'Syntax Rules must be all characters'),
  values: FunctionValidation('Syntax rules must be functions'),
});

const MapValidation = require('@core/validations/Map');
const FunctionValidation = require('@core/validations/Function');
const Validation = require('@core/validations/Validation');

const regex = /^[a-zA-Z]+$/;

module.exports = MapValidation({
  keys: Validation(value => regex.test(value), 'Syntax Rules must be all characters'),
  values: FunctionValidation('Syntax rules must be functions'),
});

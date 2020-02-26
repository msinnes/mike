const MapValidationClass = require('./classes/MapValidation');

const mapValidationEnforcement = require('./enforcements/mapValidation');
const configEnforcement = require('./enforcements/config');

function MapValidation(validation, config) {
  mapValidationEnforcement(validation);
  configEnforcement(config);

  return new MapValidationClass(validation, config);
}

module.exports = MapValidation;

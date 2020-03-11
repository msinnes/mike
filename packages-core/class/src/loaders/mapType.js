const MapType = require('../type/map');
const checkFnEnforcement = require('../enforcements/checkFn');
const nameEnforcement = require('../enforcements/name');

module.exports = (name, checkFn) => {
  nameEnforcement(name);
  checkFnEnforcement(checkFn);

  return new MapType(name, checkFn);
};

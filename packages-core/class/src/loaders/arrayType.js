const ArrayType = require('../type/array');
const checkFnEnforcement = require('../enforcements/checkFn');
const nameEnforcement = require('../enforcements/name');

module.exports = (name, checkFn) => {
  nameEnforcement(name);
  checkFnEnforcement(checkFn);

  return new ArrayType(name, checkFn);
};

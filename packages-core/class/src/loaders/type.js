const BaseType = require('../type/base');
const checkFnEnforcement = require('../enforcements/checkFn');
const nameEnforcement = require('../enforcements/name');

module.exports = (name, checkFn) => {
  nameEnforcement(name);
  checkFnEnforcement(checkFn);

  return new BaseType(name, checkFn);
};

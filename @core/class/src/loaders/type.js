const BaseType = require('../classes/BaseType');
const checkFnEnforcement = require('../enforcements/checkFn');
const nameEnforcement = require('../enforcements/name');
const nullableEnforcement = require('../enforcements/nullable');

module.exports = (name, checkFn, nullable) => {
  nameEnforcement(name);
  checkFnEnforcement(checkFn);
  nullableEnforcement(nullable);

  return new BaseType(name, checkFn, nullable);
};

const ObjectType = require('../type/object');
const typeMapEnforcement = require('../enforcements/typeMap');

module.exports = (name, typeMap) => {
  typeMapEnforcement(typeMap);

  return new ObjectType(name, typeMap);
};

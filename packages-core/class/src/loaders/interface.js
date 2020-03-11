const typeMapEnforcement = require('../enforcements/typeMap');
const composeInterface = require('../interface/compose');

module.exports = config => {
  typeMapEnforcement(config);
  return composeInterface(config);
};

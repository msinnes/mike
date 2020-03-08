const interfaceConfigEnforcement = require('../enforcements/interfaceConfig');
const composeInterface = require('../interface/compose');

module.exports = config => {
  interfaceConfigEnforcement(config);
  return composeInterface(config);
};

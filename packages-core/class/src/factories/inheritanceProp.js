const ClassInheritanceProp = require('../classes/ClassInheritanceProp');
const InheritanceProp = require('../classes/InheritanceProp');

const { CLASS } = require('../constants');

module.exports = (type, pojc, config) => {
  if (type === CLASS) {
    return new ClassInheritanceProp(pojc, config);
  }
  return new InheritanceProp(pojc, config);
};

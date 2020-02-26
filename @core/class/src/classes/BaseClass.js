const privateVariable = require('@core/utils/privateVariable');

const inheritanceProp = require('../factories/inheritanceProp');
const callCheckFactory = require('../factories/callCheck');

const classFunctionCallCheck = callCheckFactory('Cannot call a class as a function');

function BaseClass() {
  classFunctionCallCheck(this, BaseClass);
}

privateVariable(BaseClass, 'Class', inheritanceProp(BaseClass));

module.exports = BaseClass;

const privateVariable = require('@mike/utils/privateVariable');

const inheritanceProp = require('../factories/inheritanceProp');
const callCheckFactory = require('../factories/callCheck');

const classFunctionCallCheck = callCheckFactory('Cannot call a class as a function');

function BaseClass() {
  classFunctionCallCheck(this, BaseClass);
  privateVariable(this, '__class__', this.constructor.Class.getInstanceProp());
}

privateVariable(BaseClass, 'Class', inheritanceProp(BaseClass));

module.exports = BaseClass;

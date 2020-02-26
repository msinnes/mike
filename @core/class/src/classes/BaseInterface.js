const privateVariable = require('@core/utils/privateVariable');

const inheritanceProp = require('../factories/inheritanceProp');
const checkInterface = require('../lib/checkInterface');
const ensure = require('../lib/ensure');
const callCheckFactory = require('../factories/callCheck');

const interfaceFunctionCallCheck = callCheckFactory('Cannot call an interface as a function');

function BaseInterface() {
  checkInterface(this, BaseInterface);
  interfaceFunctionCallCheck(this, BaseInterface);
}

BaseInterface.ensure = function(instance, i) {
  ensure(instance, i);
};

privateVariable(BaseInterface, 'Interface', inheritanceProp(BaseInterface));

module.exports = BaseInterface;

const privateVariable = require('@mike/utils/privateVariable');

const { INTERFACE } = require('../constants');

const ensure = require('./ensure');
const inheritanceProp = require('../factories/inheritanceProp');
const callCheckFactory = require('../factories/callCheck');
const checkInterface = require('../lib/checkInterface');

const interfaceFunctionCallCheck = callCheckFactory('Cannot call an interface as a function');

function BaseInterface() {
  checkInterface(this, BaseInterface);
  interfaceFunctionCallCheck(this, BaseInterface);
}

BaseInterface.ensure = function(instance, i) {
  ensure(instance, i);
};

privateVariable(BaseInterface, INTERFACE, inheritanceProp(INTERFACE, BaseInterface));

module.exports = BaseInterface;

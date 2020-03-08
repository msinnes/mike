const privateVariables = require('@mike/utils/privateVariables');

const { INTERFACE } = require('../constants');

const BaseInterface = require('../interface/base');
const assertInterface = require('../interface/assert');
const extendInterface = require('../interface/extend');
const extendsInterface = require('../interface/extends');
const inheritancePropFactory = require('../factories/inheritanceProp');
const checkInterface = require('../lib/checkInterface');

module.exports = config => {
  function InterfaceConstructor() {
    BaseInterface.call(this, arguments);
    checkInterface(this, InterfaceConstructor);
  }

  const myConfig = {...config};

  InterfaceConstructor.prototype = Object.create(BaseInterface.prototype);
  InterfaceConstructor.prototype.constructor = InterfaceConstructor;

  const privates = {
    _extendMyConfig: childConfig => ({
      ...myConfig,
      ...childConfig,
    }),
    ensure: instance => BaseInterface.ensure(instance, config),
    extend: SuperInterface => {
      assertInterface(SuperInterface);
      const iExtended = extendInterface(InterfaceConstructor, SuperInterface);
      const newExtends = _super => extendsInterface(iExtended, _super);
      const newConfig = SuperInterface._extendMyConfig(config);
      const newEnsure = instance => BaseInterface.ensure(instance, newConfig);
      privateVariables(iExtended, {
        extends: newExtends,
        ensure: newEnsure,
      });
      return iExtended;
    },
    extends: SuperInterface => {
      assertInterface(SuperInterface);
      return extendsInterface(InterfaceConstructor, SuperInterface);
    },
    Interface: inheritancePropFactory(INTERFACE, InterfaceConstructor, {
      super: BaseInterface.Interface,
    }),
  };

  privateVariables(InterfaceConstructor, privates);

  return InterfaceConstructor;
};

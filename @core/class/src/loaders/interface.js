const privateVariables = require('@core/utils/privateVariables');

const BaseInterface = require('../classes/BaseInterface');
const interfaceConfigEnforcement = require('../enforcements/interfaceConfig');
const assertInterface = require('../lib/assertInterface');
const checkInterface = require('../lib/checkInterface');
const extendInterface = require('../lib/extendInterface');
const extendsInterface = require('../lib/extendsInterface');
const classPropFactory = require('../factories/inheritanceProp');

module.exports = config => {
  function InterfaceConstructor() {
    BaseInterface.call(this, arguments);
    checkInterface(this, InterfaceConstructor);
  }

  interfaceConfigEnforcement(config);
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
    Interface: classPropFactory(InterfaceConstructor, {
      _super: BaseInterface.Interface,
    }),
  };

  privateVariables(InterfaceConstructor, privates);

  return InterfaceConstructor;
};

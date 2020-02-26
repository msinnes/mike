const BaseInterface = require('../classes/BaseInterface');
const extendsInterface = require('../lib/extendsInterface');
module.exports = _interface => !!_interface && !!_interface.Interface && extendsInterface(_interface, BaseInterface);

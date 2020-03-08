const BaseInterface = require('./base');
const extendsInterface = require('./extends');

module.exports = _interface => !!_interface
  && !!_interface.Interface
  && extendsInterface(_interface, BaseInterface);

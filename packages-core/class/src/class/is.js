const BaseClass = require('../class/base');
const extendsClass = require('../class/extends');
module.exports = _class => !!_class && !!_class.Class && extendsClass(_class, BaseClass);

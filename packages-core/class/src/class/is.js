const BaseClass = require('./base');
const extendsClass = require('./extends');

module.exports = _class => !!_class && !!_class.Class && extendsClass(_class, BaseClass);

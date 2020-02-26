const BaseClass = require('../classes/BaseClass');
const extendsClass = require('../lib/extendsClass');
module.exports = _class => !!_class && !!_class.Class && extendsClass(_class, BaseClass);

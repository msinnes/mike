const abstractClassLoader = require('./loaders/abstractClass');
const classLoader = require('./loaders/class');
const staticClassLoader = require('./loaders/staticClass');
const typeLoader = require('./loaders/type');
const isClass = require('./class/is');
const isType = require('./type/is');

module.exports = {
  loadAbstractClass: abstractClassLoader,
  loadClass: classLoader,
  loadStaticClass: staticClassLoader,
  loadType: typeLoader,
  isClass,
  isType
};

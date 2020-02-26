const abstractClassLoader = require('./loaders/abstractClass');
const classLoader = require('./loaders/class');
const interfaceLoader = require('./loaders/interface');
const staticClassLoader = require('./loaders/staticClass');
const typeLoader = require('./loaders/type');
const isClass = require('./is/class');
const isInterface = require('./is/interface');
const isType = require('./is/type');

module.exports = {
  loadAbstractClass: abstractClassLoader,
  loadClass: classLoader,
  loadInterface: interfaceLoader,
  loadStaticClass: staticClassLoader,
  loadType: typeLoader,
  isClass,
  isInterface,
  isType
};

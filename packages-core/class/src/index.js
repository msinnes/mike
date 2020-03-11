const abstractClassLoader = require('./loaders/abstractClass');
const arrayTypeLoader = require('./loaders/arrayType');
const classLoader = require('./loaders/class');
const interfaceLoader = require('./loaders/interface');
const staticClassLoader = require('./loaders/staticClass');
const typeLoader = require('./loaders/type');
const isClass = require('./class/is');
const isInterface = require('./interface/is');
const isType = require('./type/is');

module.exports = {
  loadAbstractClass: abstractClassLoader,
  loadArrayType: arrayTypeLoader,
  loadClass: classLoader,
  loadInterface: interfaceLoader,
  loadStaticClass: staticClassLoader,
  loadType: typeLoader,
  isClass,
  isInterface,
  isType
};

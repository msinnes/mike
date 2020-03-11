const abstractClassLoader = require('./loaders/abstractClass');
const arrayTypeLoader = require('./loaders/arrayType');
const classLoader = require('./loaders/class');
const interfaceLoader = require('./loaders/interface');
const mapTypeLoader = require('./loaders/mapType');
const objectTypeLoader = require('./loaders/objectType');
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
  loadMapType: mapTypeLoader,
  loadObjectType: objectTypeLoader,
  loadStaticClass: staticClassLoader,
  loadType: typeLoader,
  isClass,
  isInterface,
  isType
};

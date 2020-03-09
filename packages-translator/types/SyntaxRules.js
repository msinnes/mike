const { loadType } = require('@mike/class');
const isFunction = require('@mike/utils/isFunction');
const isObject = require('@mike/utils/isObject');

// TODO: consider a loadClassType
module.exports = loadType(
  'SyntaxRules',
  value => isObject(value) && Object.keys(value).reduce((acc, key) => {
    if (!isFunction(value[key])) return false;
    return acc;
  }, true)
);

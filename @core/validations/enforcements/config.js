const getEnforcement = require('@core/utils/getEnforcement');
const isBoolean = require('@core/utils/isBoolean');
const isFunction = require('@core/utils/isFunction');
const isObject = require('@core/utils/isObject');
const isString = require('@core/utils/isString');
const isUndefined = require('@core/utils/isUndefined');

const getObjectValidation = config => {
  const allowedKeys = Object.keys(config);
  return value => isObject(value) && Object.keys(value).reduce((isValid, key) => {
    if (allowedKeys.indexOf(key) < 0 || !config[key](value[key])) return false;
    return isValid;
  }, true);
};

const typeConfig = {
  is: isFunction,
  message: isString,
};

const requiredTypeConfigKeys = Object.keys(typeConfig);

const typeValidation = getObjectValidation(typeConfig);

const checkRequiredKeys = (reqd, has) => {
  return reqd.reduce((isValid, requiredKey) => {
    if (has.indexOf(requiredKey) < 0) return false;
    return isValid;
  }, true);
};

const configConfig = {
  allowEmpty: isBoolean,
  throwOnInvalid: isBoolean,
  type: value => checkRequiredKeys(requiredTypeConfigKeys, Object.keys(value)) && typeValidation(value),
};

const configValidation = getObjectValidation(configConfig);

module.exports = getEnforcement(
  c => isUndefined(c) || configValidation(c),
  'the configuration is invalid, allowed keys are allowEmpty, throwOnInvalid, and type'
);

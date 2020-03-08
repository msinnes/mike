const InternalError = require('@mike/errors/InternalError');

const setError = propName => {
  // TODO: This shouldn't be an internal error
  // This is going to be used to protect variables exposed to users
  // This would be similar to the runtime errors.
  throw new InternalError(`${propName} is read only`);
};

/**
 * will assign a read-only variable onto an object.
 * @param {Object} obj - the object that will be assigned the variable
 * @param {String} propName - the name of the property
 * @param {*} value - the value that will be assigned
 * @param {Object} config - the config object to assign a get override
 */
module.exports = (obj, propName, value, config) => {
  const get = config && config.get ? config.get : () => value;
  Object.defineProperty(obj, propName, {
    get,
    set: setError.bind(null, propName),
  });
};
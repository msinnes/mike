const isFunction = require('@core/utils/isFunction');

const validateFnEnforcement = require('./enforcements/validateFn');
const messageEnforcement = require('./enforcements/message');
const configEnforcement = require('./enforcements/config');

const Validation = require('./classes/Validation');

module.exports = (validateFn, message, config) => {
  validateFnEnforcement(validateFn);
  messageEnforcement(message);
  configEnforcement(config);

  const _validateFn = value => {
    let reducedMessage;
    const valid = validateFn(value);
    if (!valid) {
      reducedMessage = isFunction(message) ? message(value) : message;
    }
    return [valid, reducedMessage];
  };

  return new Validation(_validateFn, config);
};

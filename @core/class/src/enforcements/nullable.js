const getEnforcement = require('@core/utils/getEnforcement');
const isBoolean = require('@core/utils/isBoolean');
const isNull = require('@core/utils/isNull');
const isUndefined = require('@core/utils/isUndefined');

module.exports = getEnforcement(
  value => isNull(value) || isUndefined(value) || isBoolean(value),
  'nullable must be a boolean'
);

const wrapRule = require('./wrapRule');

module.exports = (rules, context) => Object.keys(rules).reduce((acc, key) => ({
  ...acc,
  [key]: wrapRule(rules[key], context),
}), {});

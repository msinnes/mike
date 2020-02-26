module.exports = (validations, validateFnFactory) =>
  Object.keys(validations).reduce((acc, key) => {
    acc[key] = validateFnFactory(validations[key]);
    return acc;
  }, {});
module.exports = (target, data) => {
  const privates = Object.keys(data).reduce(function(acc, item) {
    acc[item] = {
      configurable: true,
      enumerable: false,
      value: data[item],
    };
    return acc;
  }, {});

  Object.defineProperties(target, privates);
};
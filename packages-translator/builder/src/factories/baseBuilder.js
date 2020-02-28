module.exports = (name, Class) => {
  const factoryTypeName = `${name[0].toLowerCase()}${name.slice(1)}`;
  const ClassTypeName = `${name[0].toUpperCase()}${name.slice(1)}`;

  return {
    [factoryTypeName]: (...args) => new Class(...[name, ...args]),
    [`is${ClassTypeName}`]: value => (value instanceof Class),
    [`assert${ClassTypeName}`]: value => {
      if (!(value instanceof Class)) {
        // TODO: decide if you want to make a custom error
        throw new Error(`type assertion failed for type ${name}`);
      }
    },
  };
};

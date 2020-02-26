module.exports = (target, fieldName, value) => Object.defineProperty(
  target,
  fieldName,
  {
    writable: true,
    enumerable: false,
    value,
  }
);

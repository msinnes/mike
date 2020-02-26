module.exports = extensionFieldName => (check, target) => {
  let found = false;
  check[extensionFieldName].while(() =>!found).do(Class => {
    if(target[extensionFieldName] === Class) found = true;
  });
  return found;
};

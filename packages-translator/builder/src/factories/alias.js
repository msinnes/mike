module.exports = () => {
  const _cache = {};

  const test = (type, alias) => _cache[alias] && _cache[alias].indexOf(type) >= 0;

  function testAsArray(instances, alias) {
    const match = /Array<(.*)>/.exec(alias);
    const matchedAlias = match[1];
    if (!Array.isArray(instances)) {
      return false;
    }
    let allAreValid = true;
    instances.forEach(instance => {
      const valid = test(instance.type, matchedAlias);
      if (!valid) {
        allAreValid = false;
      }
    });
    return allAreValid;
  }

  return {
    alias: (name, aliases) => {
      aliases.forEach(alias => {
        if(_cache[alias]) {
          _cache[alias].push(name);
        } else {
          _cache[alias] = [name];
        }
      });
    },
    check: (instance, aliases) => {
      let validMatchFound = false;
      let i = 0;
      let len = aliases.length;
      while(i < len && !validMatchFound) {
        let valid;
        const alias = aliases[i++];
        if (/Array<.*>/.test(alias)) {
          valid = testAsArray(instance, alias);
        } else {
          valid = test(instance.type, alias);
        }
        if (valid) {
          validMatchFound = true;
        }
      }
      return validMatchFound;
    },
  };
};

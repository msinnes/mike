module.exports = (instance, Class) => {
  if(instance && instance.constructor === Class.prototype.constructor) {
    const interfaces = Class.Class.reduce((acc, _class) => {
      if (_class._implements) acc.push(_class._implements);
      return acc;
    }, []);
    interfaces.forEach(i => i.ensure(instance));
  }
};

module.exports = (instance, Class) => {
  if(instance && instance.constructor === Class.prototype.constructor) {
    const interfaces = Class.Class.reduce((acc, _class) => {
      if (_class._interface) acc.push(_class._interface);
      return acc;
    }, []);
    interfaces.forEach(i => i.ensure(instance));
  }
};

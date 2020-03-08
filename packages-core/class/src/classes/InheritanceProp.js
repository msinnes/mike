function InheritanceProp(pojc, config) {
  this._constructor = pojc;
  this._prototype = pojc.prototype;
  if (config && config.super) {
    this._super = config.super;
  }
}

InheritanceProp.prototype.extends = function(superCheck) {
  let found = false;
  this.while(() =>!found).do(_super => {
    if(superCheck === _super) found = true;
  });
  return found;
};

InheritanceProp.prototype.getInstanceProp = function() {
  const self = this;
  return Object.keys(self).reduce((acc, prop) => {
    const value = self[prop];
    if(value) {
      acc[`_${prop}__`] = value instanceof InheritanceProp
        ? value.getInstanceProp()
        : value;
    }
    return acc;
  }, {});
};

InheritanceProp.prototype.getIterator = function() {
  let current = this;

  function next() {
    if(current) {
      const returnValue = current;
      current = current._super;
      return returnValue;
    }
  }

  return {
    next,
  };
};

InheritanceProp.prototype.while = function(checkCb) {
  const iterator = this.getIterator();
  let current = iterator.next();
  return {
    do: cb => {
      while(checkCb() && current) {
        cb(current);
        current = iterator.next();
      }
    },
  };
};

module.exports = InheritanceProp;

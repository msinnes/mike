function ClassProp(pojc, config) {
  this._constructor = pojc;
  this._prototype = pojc.prototype;
  if (config && config._super) {
    this._super = config._super;
  }
  if (config && config._implements) {
    this._implements = config._implements;
  }
}

ClassProp.prototype.forEach = function(cb) {
  const iterator = this.getIterator();
  let current = iterator.next();
  do {
    cb(current);
    current = iterator.next();
  } while(current);
};

ClassProp.prototype.getIterator = function() {
  let current = this;
  const self = this;

  function first() {
    current = self;
    return current;
  }

  function next() {
    if(current) {
      const returnValue = current;
      current = current._super;
      return returnValue;
    }
  }

  return {
    current: () => current,
    first,
    next,
    last: () => {
      function advance(c) {
        const n = next();
        if(n) {
          return advance(n);
        } else {
          return c;
        }
      }
      const curr = next();
      current = advance(curr);
      return current;
    },
    prev: () => {
      const curr = current;
      let c = first();
      if(c === curr) {
        return undefined;
      }
      while(c && c._super !== curr) {
        c = next();
      }
      current = c;
      return c;
    },
  };
};

ClassProp.prototype.reduce = function(cb, acc) {
  let accumulator = acc;
  this.forEach(Class => {
    accumulator = cb(accumulator, Class);
  });
  return accumulator;
};

ClassProp.prototype.while = function(checkCb) {
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

module.exports = ClassProp;

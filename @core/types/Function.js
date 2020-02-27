

const { loadType } = require('@core/class');

module.exports = loadType('Function', value => 
  !!value && (
    value instanceof Function || typeof value === 'function'
  )
);

const { loadType } = require('@core/class');

module.exports = loadType('Boolean', value => typeof value === 'boolean');

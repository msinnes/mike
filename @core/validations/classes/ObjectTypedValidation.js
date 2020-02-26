const { loadAbstractClass } = require('@core/class');
const ObjectType = require('@core/types/Object');

const TypedValidation = require('./TypedValidation');

function ObjectTypedValidation() {
  this._type = ObjectType;
}

module.exports = loadAbstractClass(ObjectTypedValidation).extend(TypedValidation);

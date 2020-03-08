const { loadAbstractClass } = require('@mike/class');
const ObjectType = require('@mike/types/Object');

const TypedValidation = require('./TypedValidation');

function ObjectTypedValidation() {
  this._type = ObjectType;
}

module.exports = loadAbstractClass(ObjectTypedValidation).extend(TypedValidation);

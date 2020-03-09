const { loadAbstractClass } = require('@mike/class');

function Context() {

}

Context.expose = function(thisObject, fieldName, get) {
  Object.defineProperty(thisObject, fieldName,{ get });
};

module.exports = loadAbstractClass(Context);

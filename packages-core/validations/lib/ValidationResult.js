const isArray = require('@mike/utils/isArray');
const isBoolean = require('@mike/utils/isBoolean');
const isObject = require('@mike/utils/isObject');
const isString = require('@mike/utils/isString');
const isUndefined = require('@mike/utils/isUndefined');

const getEnforcement = require('@mike/utils/getEnforcement');

// move enforcements into their own files for testability
const dataEnforcement = getEnforcement(
  d => isUndefined(d) || isArray(d) || isObject(d) || isString(d),
  'the data must be a string, object, or array'
);

const validEnforcement = getEnforcement(
  isBoolean,
  'the valid arg must be a boolean'
);

// move visit into its own file for testability
function visitObject(nodes, address, acc) {
  Object.keys(nodes).forEach(key => {
    visit(nodes[key], `${address}${address ? '.' : ''}${key}`, acc);
  });
}

function visitArray(nodes, address, acc) {
  nodes.forEach((node, index) => {
    visit(node, `${address}[${index}]`, acc);
  });
}

function visit(node, address, acc) {
  let currentArrayOfStrings = acc || [];
  if (isObject(node.data) && node.invalid) {
    visitObject(node.data, address, currentArrayOfStrings);
  } else if (isArray(node.data) && node.invalid) {
    visitArray(node.data, address, currentArrayOfStrings);
  } else if (node.invalid){
    currentArrayOfStrings.push(`${address}${address ? ': ' : ''}${node.data}`);
  }

  return currentArrayOfStrings;
}

function ValidationResult(valid, data) {
  validEnforcement(valid);
  dataEnforcement(data);

  this.valid = valid;
  this.invalid = !valid;
  if (data) {
    this.data = data;
  }
}

ValidationResult.prototype.getMessage = function() {
  return this.invalid ? visit(this, '').join('\n') : null;
};

module.exports = ValidationResult;

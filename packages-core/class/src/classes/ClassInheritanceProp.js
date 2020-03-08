const InheritanceProp = require('./InheritanceProp');

function ClassInheritanceProp(pojc, config) {
  InheritanceProp.call(this, pojc, config);
  if (config && config.interface) {
    this._interface = config.interface;
  }
}

ClassInheritanceProp.prototype = Object.create(InheritanceProp.prototype);

ClassInheritanceProp.prototype.implements = function(iCheck){
  let found = false;
  this.while(() => !found).do(_super => {
    if (_super._interface && (
      _super._interface === iCheck || _super._interface.extends(iCheck))
    ) {
      found = true;
    }
  });
  return found;
};

module.exports = ClassInheritanceProp;

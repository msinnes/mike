function ProtoAndStaticClass() {
  this.one = 1;
}

ProtoAndStaticClass.addTwo = function(x) {
  return x + 2;
};

ProtoAndStaticClass.prototype.addOne = function(x) {
  return x + 1;
};

module.exports = ProtoAndStaticClass;

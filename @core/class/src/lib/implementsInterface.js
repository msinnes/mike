module.exports = (Class, Interface) => Class.Class && (function checkClass(_class) {
  if(_class._implements === Interface) {
    return true;
  }
  if(_class._super) {
    return checkClass(_class._super);
  }
})(Class.Class);
